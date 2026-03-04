---
title: "compute temp command"
category: "compute"
tags: ["compute", "temp", "RIGID", "temperature", "pressure", "energy"]
commands: ["compute temp"]
---
# compute temp command

Accelerator Variants: *temp/kk*

## Syntax

```lammps
compute ID group-ID temp
```
* ID, group-ID are documented in [compute](compute) command
* temp = style name of this compute command

## Examples

```lammps
compute 1 all temp
compute myTemp mobile temp
```
## Description

Define a computation that calculates the temperature of a group of
atoms.  A compute of this style can be used by any command that
computes a temperature, e.g. [thermo_modify](thermo_modify),
[fix temp/rescale](fix_temp_rescale), [fix npt](fix_nh),
etc.

The temperature is calculated by the formula


$$
T  = \frac{2 E_\mathrm{kin}}{N_\mathrm{DOF} k_B} \quad \mathrm{with} \quad
E_\mathrm{kin} = \sum^{N_\mathrm{atoms}}_{i=1} \frac{1}{2} m_i v^2_i \quad \mathrm{and} \quad
N_\mathrm{DOF} = n_\mathrm{dim} N_\mathrm{atoms} - n_\mathrm{dim} - N_\mathrm{fix DOFs}
$$

where $E_\mathrm{kin}$ is the total kinetic energy of the group of
atoms, $n_\mathrm{dim}$ is the dimensionality of the simulation
(i.e. either 2 or 3), $N_\mathrm{atoms}$ is the number of atoms in
the group, $N_\mathrm{fix DOFs}$ is the number of degrees of
freedom removed by fix commands (see below), $k_B$ is the
Boltzmann constant, and $T$ is the resulting computed temperature.

A symmetric tensor, stored as a six-element vector, is also calculated
by this compute for use in the computation of a pressure tensor by the
[compute pressue](compute_pressure) command.  The formula for
the components of the tensor is the same as the above expression for
$E_\mathrm{kin}$, except that the 1/2 factor is NOT included and
the $v_i^2$ is replaced by $v_{i,x} v_{i,y}$ for the
$xy$ component, and so on.  Note that because it lacks the 1/2
factor, these tensor components are twice those of the traditional
kinetic energy tensor.  The six components of the vector are ordered
$xx$, $yy$, $zz$, $xy$, $xz$,
$yz$.

The number of atoms contributing to the temperature is assumed to be
constant for the duration of the run; use the *dynamic* option of the
[compute_modify](compute_modify) command if this is not the case.

This compute subtracts out degrees-of-freedom due to fixes that
constrain molecular motion, such as [fix shake](fix_shake) and
[fix rigid](fix_rigid).  This means the temperature of groups of
atoms that include these constraints will be computed correctly.  If
needed, the subtracted degrees-of-freedom can be altered using the
*extra* option of the [compute_modify](compute_modify) command.
By default this *extra* component is initialized to
$n_\mathrm{dim}$ (as shown in the formula above) to represent the
degrees of freedom removed from a system due to its translation
invariance due to periodic boundary conditions.

A compute of this style with the ID of "thermo_temp" is created when
LAMMPS starts up, as if this command were in the input script:

```lammps
compute thermo_temp all temp
```
See the "thermo_style" command for more details.

See the [Howto thermostat](Howto_thermostat) page for a
discussion of different ways to compute temperature and perform
thermostatting.

----------

----------

## Output info

This compute calculates a global scalar (the temperature) and a global
vector of length six (symmetric tensor), which can be accessed by
indices 1--6.  These values can be used by any command that uses
global scalar or vector values from a compute as input.  See the
[Howto output](Howto_output) page for an overview of LAMMPS
output options.

The scalar value calculated by this compute is "intensive".  The
vector values are "extensive".

The scalar value is in temperature [units](units).  The vector
values are in energy [units](units).

## Restrictions
none

## Related commands

[compute temp/partial](compute_temp_partial),
[compute temp/region](compute_temp_region),
[compute pressure](compute_pressure)

## Default

none
