---
title: "angle_style cosine/squared command"
category: "angle_style"
tags: ["angle_style", "cosine/squared", "MOLECULE", "energy", "force"]
commands: ["angle_style cosine/squared"]
---
# angle_style cosine/squared command

Accelerator Variants: *cosine/squared/omp*

## Syntax

```lammps
angle_style cosine/squared
```
## Examples

```lammps
angle_style cosine/squared
angle_coeff 2*4 75.0 100.0
```
## Description

The *cosine/squared* angle style uses the potential


$$
E = K [\cos(\theta) - \cos(\theta_0)]^2
$$

, which is commonly used in the [DREIDING](Howto_bioFF) force field,
where $\theta_0$ is the equilibrium value of the angle, and $K$
is a prefactor.  Note that the usual 1/2 factor is included in $K$.

See [(Mayo)](#cosine-Mayo) for a description of the DREIDING force field.

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
MOLECULE package.  See the [Build package](Build_package) doc page
for more info.

## Related commands

[angle_coeff](angle_coeff)

## Default

none

----------


**(Mayo)** Mayo, Olfason, Goddard III, J Phys Chem, 94, 8897-8909
(1990).
