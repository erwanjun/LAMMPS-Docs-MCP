---
title: "angle_style cosine/delta command"
category: "angle_style"
tags: ["angle_style", "cosine/delta", "MOLECULE", "energy"]
commands: ["angle_style cosine/delta"]
---
# angle_style cosine/delta command

Accelerator Variants: *cosine/delta/omp*

## Syntax

```lammps
angle_style cosine/delta
```
## Examples

```lammps
angle_style cosine/delta
angle_coeff 2*4 75.0 100.0
```
## Description

The *cosine/delta* angle style uses the potential


$$
E = K [1 - \cos(\theta - \theta_0)]
$$

where $\theta_0$ is the equilibrium value of the angle, and $K$ is a
prefactor.  Note that the usual 1/2 factor is included in $K$.

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy)
* $\theta_0$ (degrees)

$\theta_0$ is specified in degrees, but LAMMPS converts it to radians
internally.

----------

----------

## Restrictions

This angle style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package) doc page
for more info.

## Related commands

[angle_coeff](angle_coeff), [angle_style cosine/squared](angle_cosine_squared)

## Default

none
