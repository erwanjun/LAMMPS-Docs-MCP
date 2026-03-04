---
title: "fix lambda_thermostat/apip command"
category: "fix"
tags: ["fix", "lambda/thermostat/apip", "thermostat", "temperature", "energy", "force", "EAM"]
commands: ["fix lambda/thermostat/apip"]
---
# fix lambda_thermostat/apip command

## Syntax

```lammps
fix ID group-ID lambda_thermostat/apip keyword values ...
```
* ID, group-ID are documented in [fix](fix) command
* lambda_thermostat/apip = style name of this fix command
* zero or more keyword/value pairs may be appended
* keyword = *seed* or *store_atomic_forces* or *N_rescaling*

```
*seed* value = integer
  integer = integer that is used as seed for the random number generator (> 0)
*store_atomic_forces* value = nevery
  nevery = provide per-atom output every this many steps
*N_rescaling* value = groupsize
  groupsize = rescale this many neighboring atoms (> 1)
```
## Examples

```lammps
fix 2 all lambda_thermostat/apip
fix 2 all lambda_thermostat/apip N_rescaling 100
fix 2 all lambda_thermostat/apip seed 42
fix 2 all lambda_thermostat/apip seed 42 store_atomic_forces 1000
```
## Description

This command applies the local thermostat described in
[(Immel)](#Immel2025_4)
to conserve the energy when the switching parameters of an
[adaptive-precision interatomic potential](Howto_apip) (APIP)
are updated while the gradient
of the switching parameter is neglected in the force calculation.


> **Warning**
> The temperature change caused by this fix is only the means to the end of
> conserving the energy. Thus, this fix is not a classical thermostat, that
> ensures a given temperature in the system.
> All available thermostats are listed [here](Howto_thermostat).

The potential energy $E_i$ of an atom $i$ is given by the formula from
[(Immel)](#Immel2025_4)


$$
E_i = \lambda_i E_i^\text{(fast)} + (1-\lambda_i) E_i^\text{(precise)},
$$

whereas $E_i^\text{(fast)}$ is the potential energy of atom $i$
according to a fast interatomic potential like EAM,
$E_i^\text{(precise)}$ is the potential energy according to a precise
interatomic potential such as ACE and $\lambda_i\in[0,1]$ is the
switching parameter that decides which potential energy is used.
This potential energy and the corresponding forces are conservative when
the switching parameter $\lambda_i$ is constant in time for all atoms
$i$.

For a conservative force calculation and dynamic switching parameters,
the atomic force on an atom is given by
$F_i = -\nabla_i \sum_j E_j$ and includes the derivative of the switching
parameter $\lambda_i$.
The force contribution of this gradient of the switching function can cause
large forces which are not similar to the forces of the fast or the precise
interatomic potential as discussed in [(Immel)](#Immel2025_4).
Thus, one can neglect the gradient of the switching parameter in the force
calculation and compensate for the violation of energy conservation by
the application of the local thermostat implemented in this fix.
One can compute the violation of the energy conservation $\Delta H_i$
for all atoms $i$ as discussed in [(Immel)](#Immel2025_4).
To locally correct this energy violation $\Delta H_i$, one
can rescale the velocity of atom $i$  and of neighboring atoms.
The rescaling is done relative to the center-of-mass velocity of the
group and, thus, conserves the momentum.


> **Note**
> This local thermostat provides the NVE ensemble rather than the NVT
> ensemble as
> the energy $\Delta H_i$ determines the rescaling factor rather than
> a temperature.

Velocities $v$ are updated by the integrator according to
$\Delta v_i = (F_i/m_i)\Delta t$, whereas `m` denotes the mass of atom
$i$ and $\Delta t$ is the time step.
One can interpret the velocity difference $\Delta v$ caused by the
rescaling as the application of an additional force which is given by
$F^\text{lt}_i = (v^\text{unscaled}_i - v^\text{rescaled}_i) m_i
/ \Delta t$ [(Immel)](#Immel2025_4).
This additional force is computed when the *store_atomic_forces* option
is used.

The local thermostat is not appropriate for simulations at a temperature of 0K.


> **Note**
> The maximum decrease of the kinetic energy is achieved with a rescaling
> factor of 0, i.e., the relative velocity of the group of rescaled atoms
> is set to zero. One cannot decrease the energy further. Thus, the
> local thermostat can fail, which is, however, reported by the returned
> vector.

----------

## Restart, fix_modify, output, run start/stop, minimize info

No information about this fix is written to
[binary restart files](restart).  None of the
[fix_modify](fix_modify) options are relevant to this fix.

If the *store_atomic_forces* option is used, this fix produces every
*nevery* time steps a per-atom array that contains the theoretical force
applied by the local thermostat in all three spatial dimensions in the first
three components. $\Delta H_i$ is the fourth component of the per-atom
array.
The per-atom array can only be accessed on timesteps that are multiples
of *nevery*.

Furthermore, this fix computes a global vector of length 6 with
information about the rescaling:

  #. number of atoms whose energy changed due to the last $\lambda$ update
  #. contribution of the potential energy to the last computed $\Delta H$
  #. contribution of the kinetic energy to the last computed $\Delta H$
  #. sum over all atoms of the absolute energy change caused by the last rescaling step
  #. energy change that could not be compensated accumulated over all timesteps
  #. number of atoms whose energy change could not be compensated accumulated over all timesteps

The vector and the per-atom vector can be accessed by various
[output commands](Howto_output).

No parameter of this fix can be used with the *start/stop* keywords of
the [run](run) command.  This fix is not invoked during
[energy minimization](minimize).

----------

## Restrictions

This fix is part of the APIP package. It is only enabled if
LAMMPS was built with that package. See the [Build package](Build_package) page for more info.

## Related commands

[fix lambda/apip](fix_lambda_apip),
[pair_style lambda/zone/apip](pair_lambda_zone_apip),
[pair_style lambda/input/apip](pair_lambda_input_apip),
[pair_style eam/apip](pair_eam_apip),
[pair_style pace/apip](pair_pace_apip),
[fix atom_weight/apip](fix_atom_weight_apip)

## Default

seed = 42, N_rescaling = 200, *store_atomic_forces* is not used

----------


**(Immel)** Immel, Drautz and Sutmann, J Chem Phys, 162, 114119 (2025)
