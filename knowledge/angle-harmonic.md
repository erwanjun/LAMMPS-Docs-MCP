---
title: "angle_style harmonic command"
category: "angle_style"
tags: ["angle_style", "harmonic", "INTEL", "MOLECULE", "energy"]
commands: ["angle_style harmonic"]
---
# angle_style harmonic command

Accelerator Variants: *harmonic/intel*, *harmonic/kk*, *harmonic/omp*

## Syntax

```lammps
angle_style harmonic
```
## Examples

```lammps
angle_style harmonic
angle_coeff 1 300.0 107.0
```
## Description

The *harmonic* angle style uses the potential


$$
E = K (\theta - \theta_0)^2
$$

where $\theta_0$ is the equilibrium value of the angle, and $K$ is a
prefactor.  Note that the usual 1/2 factor is included in $K$.

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy)
* $\theta_0$ (degrees)

$\theta_0$ is specified in degrees, but LAMMPS converts it to
radians internally; hence $K$ is effectively energy per
radian\^2.

----------

----------

## Restrictions

This angle style can only be used if LAMMPS was built with the
MOLECULE package.  See the [Build package](Build_package) doc
page for more info.

## Related commands

[angle_coeff](angle_coeff)

## Default

none
