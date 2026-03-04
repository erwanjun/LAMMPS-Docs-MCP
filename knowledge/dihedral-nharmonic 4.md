---
title: "dihedral_style nharmonic command"
category: "dihedral_style"
tags: ["dihedral_style", "nharmonic", "MOLECULE", "energy"]
commands: ["dihedral_style nharmonic"]
---
# dihedral_style nharmonic command

Accelerator Variants: *nharmonic/omp*

## Syntax

```lammps
dihedral_style nharmonic
```
## Examples

```lammps
dihedral_style nharmonic
dihedral_coeff * 3 10.0 20.0 30.0
```
## Description

The *nharmonic* dihedral style uses the potential:


$$
E = \sum_{i=1,n} A_i  \cos^{i-1}(\phi)
$$

The following coefficients must be defined for each dihedral type via the
[dihedral_coeff](dihedral_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $n$ (integer >=1)
* $A_1$ (energy)
* $A_2$ (energy)
* ...
* $A_n$ (energy)

----------

.. include:: accel_styles.rst

----------

## Restrictions

This dihedral style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package) doc
page for more info.

## Related commands

[dihedral_coeff](dihedral_coeff)

## Default

none
