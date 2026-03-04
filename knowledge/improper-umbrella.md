---
title: "improper_style umbrella command"
category: "improper_style"
tags: ["improper_style", "umbrella", "MOLECULE", "energy", "force"]
commands: ["improper_style umbrella"]
---
# improper_style umbrella command

Accelerator Variants: *umbrella/omp*

## Syntax

```lammps
improper_style umbrella
```
## Examples

```lammps
improper_style umbrella
improper_coeff 1 100.0 180.0
```
## Description

The *umbrella* improper style uses the following potential, which is
commonly referred to as a classic inversion and used in the
[DREIDING](Howto_bioFF) force field:


$$
E = & \frac{1}{2}K\left( \frac{1}{\sin\omega_0}\right) ^2 \left( \cos\omega - \cos\omega_0\right) ^2 \qquad \omega_0 \neq 0^o \\
E = & K\left( 1-cos\omega\right)  \qquad \omega_0 = 0^o
$$

where $K$ is the force constant and $\omega$ is the angle between the IL
axis and the IJK plane:

![JPG/umbrella.jpg](JPG/umbrella.jpg)

If $\omega_0 = 0$ the potential term has a minimum for the planar
structure.  Otherwise it has two minima at $\omega +/- \omega_0$,
with a barrier in between.

See [(Mayo)](#umbrella-Mayo) for a description of the DREIDING force field.

The following coefficients must be defined for each improper type via
the [improper_coeff](improper_coeff) command as in the example
above, or in the data file or restart files read by the
[read_data](read_data) or [read_restart](read_restart)
commands:

* $K$ (energy)
* $\omega_0$ (degrees)

----------

----------

## Symmetry convention

For the *umbrella* improper style, the first and fourth atoms in the
quadruplet are atoms of symmetry; only the second and third atoms are
considered interchangeable.  This convention is relevant for operations
that require knowledge of how atoms are ordered, such as automatic
assignment of new improper types by [fix bond/react](fix_bond_react).

## Restrictions

This improper style can only be used if LAMMPS was built with the
MOLECULE package.  See the [Build package](Build_package) doc page
for more info.

## Related commands

[improper_coeff](improper_coeff)

## Default

none

----------


**(Mayo)** Mayo, Olfason, Goddard III, J Phys Chem, 94, 8897-8909
(1990),
