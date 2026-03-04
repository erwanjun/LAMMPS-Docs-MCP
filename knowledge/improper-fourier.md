---
title: "improper_style fourier command"
category: "improper_style"
tags: ["improper_style", "fourier", "MOLECULE", "energy", "force"]
commands: ["improper_style fourier"]
---
# improper_style fourier command

Accelerator Variants: *fourier/omp*

## Syntax

```lammps
improper_style fourier
```
## Examples

```lammps
improper_style fourier
improper_coeff 1 100.0 0.0 1.0 0.5 1
```
## Description

The *fourier* improper style uses the following potential:


$$
E = K [C_0 + C_1 \cos ( \omega) + C_2 \cos( 2 \omega) ]
$$

where K is the force constant, C0, C1, C2 are dimensionless coefficients,
and omega is the angle between the IL axis and the IJK plane:

![JPG/umbrella.jpg](JPG/umbrella.jpg)

If all parameter (see below) is not zero, the all the three possible angles will taken in account.

The following coefficients must be defined for each improper type via
the [improper_coeff](improper_coeff) command as in the example
above, or in the data file or restart files read by the
[read_data](read_data) or [read_restart](read_restart)
commands:

* $K$ (energy)
* $C_0$ (unitless)
* $C_1$ (unitless)
* $C_2$ (unitless)
* all  (0 or 1, optional)

----------

----------

## Symmetry convention

For the *fourier* improper style, the first and fourth atoms in the
quadruplet are atoms of symmetry; only the second and third atoms are
considered interchangeable.  This convention is relevant for operations
that require knowledge of how atoms are ordered, such as automatic
assignment of new improper types by [fix bond/react](fix_bond_react).

## Restrictions

This angle style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package)
doc page for more info.

## Related commands

[improper_coeff](improper_coeff)

## Default

none
