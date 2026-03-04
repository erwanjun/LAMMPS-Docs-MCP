---
title: "angle_style cosine/squared/restricted command"
category: "angle_style"
tags: ["angle_style", "cosine/squared/restricted", "MOLECULE", "energy", "force"]
commands: ["angle_style cosine/squared/restricted"]
---
# angle_style cosine/squared/restricted command

Accelerator Variants: *cosine/squared/restricted/omp*

## Syntax

```lammps
angle_style cosine/squared/restricted
```
## Examples

```lammps
angle_style cosine/squared/restricted
angle_coeff 2*4 75.0 100.0
```
## Description

*Added in version 17Apr2024*
The *cosine/squared/restricted* angle style uses the potential


$$
E = K [\cos(\theta) - \cos(\theta_0)]^2 / \sin^2(\theta)
$$

, which is commonly used in the MARTINI force field,
where $\theta_0$ is the equilibrium value of the angle, and $K$
is a prefactor.  Note that the usual 1/2 factor is included in $K$.

See [(Bulacu)](#restricted-Bulacu) for a description of the restricted angle for the MARTINI force field.

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

[angle_coeff](angle_coeff)

## Default

none

----------


**(Bulacu)** Bulacu, Goga, Zhao, Rossi, Monticelli, Periole, Tieleman, Marrink, J Chem Theory Comput, 9, 3282-3292
(2013).
