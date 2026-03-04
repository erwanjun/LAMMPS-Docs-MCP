---
title: "pair_style sph/taitwater command"
category: "pair_style"
tags: ["pair_style", "sph/taitwater", "GPU", "pressure", "force", "SPH"]
commands: ["pair_style sph/taitwater"]
---
# pair_style sph/taitwater command

Accelerator Variants: *sph/taitwater/gpu*

## Syntax

```lammps
pair_style sph/taitwater
```
## Examples

```lammps
pair_style sph/taitwater
pair_coeff * * 1000.0 1430.0 1.0 2.4
```
## Description

The sph/taitwater style computes pressure forces between SPH particles
according to Tait's equation of state:


$$
p = B \biggl[\left(\frac{\rho}{\rho_0}\right)^{\gamma} - 1\biggr]
$$

where $\gamma = 7$ and $B = c_0^2 \rho_0 / \gamma$, with
$\rho_0$ being the reference density and $c_0$ the reference
speed of sound.

This pair style also computes Monaghan's artificial viscosity to
prevent particles from interpenetrating [(Monaghan)](#Monaghan).

See [this PDF guide](PDF/SPH_LAMMPS_userguide.pdf) to using SPH in
LAMMPS.


> **Note**
> Please note that the SPH PDF guide file has not been updated for
> many years and thus does not reflect the current *syntax* of the
> SPH package commands. For that please refer to the LAMMPS manual.

The following coefficients must be defined for each pair of atoms
types via the [pair_coeff](pair_coeff) command as in the examples
above.

* $\rho_0$ reference density (mass/volume units)
* $c_0$ reference soundspeed (distance/time units)
* $\nu$ artificial viscosity (no units)
* h kernel function cutoff (distance units)

----------

----------

## Mixing, shift, table, tail correction, restart, rRESPA info

This style does not support mixing.  Thus, coefficients for all
I,J pairs must be specified explicitly.

This style does not support the [pair_modify](pair_modify)
shift, table, and tail options.

This style does not write information to [binary restart files](restart).  Thus, you need to re-specify the pair_style and
pair_coeff commands in an input script that reads a restart file.

This style can only be used via the *pair* keyword of the [run_style respa](run_style) command.  It does not support the *inner*,
*middle*, *outer* keywords.

## Restrictions

This pair style is part of the SPH package.  It is only enabled
if LAMMPS was built with that package.  See the [Build package](Build_package) page for more info.

## Related commands

[pair_coeff](pair_coeff), pair_sph/rhosum

## Default

none

----------


**(Monaghan)** Monaghan and Gingold, Journal of Computational Physics,
52, 374-389 (1983).
