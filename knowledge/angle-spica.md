---
title: "angle_style spica command"
category: "angle_style"
tags: ["angle_style", "spica", "energy", "lennard-jones", "coarse-grain"]
commands: ["angle_style spica"]
---
# angle_style spica command

Accelerator Variants: *spica/omp*, *spica/kk*

## Syntax

```lammps
angle_style spica

angle_style spica/omp
```
## Examples

```lammps
angle_style spica
angle_coeff 1 300.0 107.0
```
## Description

The *spica* angle style is a combination of the harmonic angle potential,


$$
E = K (\theta - \theta_0)^2
$$

where $\theta_0$ is the equilibrium value of the angle and
$K$ a prefactor, with the *repulsive* part of the non-bonded
*lj/spica* pair style between the atoms 1 and 3.  This angle potential is
intended for coarse grained MD simulations with the SPICA (formerly called SDK) parameterization
using the [pair_style lj/spica](pair_spica).  Relative to the
pair_style *lj/spica*, however, the energy is shifted by
$\epsilon$, to avoid sudden jumps.  Note that the usual 1/2 factor
is included in $K$.

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above:

* $K$ (energy)
* $\theta_0$ (degrees)

$\theta_0$ is specified in degrees, but LAMMPS converts it to
radians internally; hence $K$ is effectively energy per
radian\^2.

The required *lj/spica* parameters are extracted automatically from the
pair_style.

Style *sdk*, the original implementation of style *spica*, is available
for backward compatibility.

----------

----------

## Restrictions

This angle style can only be used if LAMMPS was built with the
CG-SPICA package.  See the [Build package](Build_package) doc
page for more info.

## Related commands

[angle_coeff](angle_coeff), [angle_style harmonic](angle_harmonic), [pair_style lj/spica](pair_spica),
[pair_style lj/spica/coul/long](pair_spica)

## Default

none
