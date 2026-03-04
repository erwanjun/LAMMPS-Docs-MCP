---
title: "angle_style quartic command"
category: "angle_style"
tags: ["angle_style", "quartic", "MOLECULE", "energy"]
commands: ["angle_style quartic"]
---
# angle_style quartic command

Accelerator Variants: *quartic/omp*

## Syntax

```lammps
angle_style quartic
```
## Examples

```lammps
angle_style quartic
angle_coeff 1 129.1948 56.8726 -25.9442 -14.2221
```
## Description

The *quartic* angle style uses the potential


$$
E = K_2 (\theta - \theta_0)^2 + K_3 (\theta - \theta_0)^3 + K_4 (\theta - \theta_0)^4
$$

where $\theta_0$ is the equilibrium value of the angle, and $K$ is a
prefactor.  Note that the usual 1/2 factor is included in $K$.

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $\theta_0$ (degrees)
* $K_2$ (energy)
* $K_3$ (energy)
* $K_4$ (energy)

$\theta_0$ is specified in degrees, but LAMMPS converts it to
radians internally; hence the various $K$ are effectively energy
per radian\^2 or radian\^3 or radian\^4.

----------

----------

## Restrictions

This angle style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package) doc
page for more info.

## Related commands

[angle_coeff](angle_coeff)

## Default

none
