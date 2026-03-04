---
title: "dihedral_style fourier command"
category: "dihedral_style"
tags: ["dihedral_style", "fourier", "INTEL", "MOLECULE", "energy"]
commands: ["dihedral_style fourier"]
---
# dihedral_style fourier command

Accelerator Variants: *fourier/intel*, *fourier/omp*

## Syntax

```lammps
dihedral_style fourier
```
## Examples

```lammps
dihedral_style fourier
dihedral_coeff 1 3 -0.846200 3 0.0 7.578800 1 0 0.138000 2 -180.0
```
## Description

The *fourier* dihedral style uses the potential:


$$
E = \sum_{i=1,m} K_i  [ 1.0 + \cos ( n_i \phi - d_i ) ]
$$

The following coefficients must be defined for each dihedral type via the
[dihedral_coeff](dihedral_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $m$ (integer >=1)
* $K_1$ (energy)
* $n_1$ (integer >= 0)
* $d_1$ (degrees)
* [...]
* $K_m$ (energy)
* $n_m$ (integer >= 0)
* $d_m$ (degrees)

----------

----------

## Restrictions

This dihedral style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package) doc
page for more info.

## Related commands

[dihedral_coeff](dihedral_coeff)

## Default

none
