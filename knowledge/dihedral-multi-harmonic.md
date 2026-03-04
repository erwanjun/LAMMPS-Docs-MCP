---
title: "dihedral_style multi/harmonic command"
category: "dihedral_style"
tags: ["dihedral_style", "multi/harmonic", "MOLECULE", "energy"]
commands: ["dihedral_style multi/harmonic"]
---
# dihedral_style multi/harmonic command

Accelerator Variants: *multi/harmonic/kk*, *multi/harmonic/omp*

## Syntax

```lammps
dihedral_style multi/harmonic
```
## Examples

```lammps
dihedral_style multi/harmonic
dihedral_coeff 1 20 20 20 20 20
```
## Description

The *multi/harmonic* dihedral style uses the potential


$$
E = \sum_{n=1,5} A_n  \cos^{n-1}(\phi)
$$

The following coefficients must be defined for each dihedral type via the
[dihedral_coeff](dihedral_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $A_1$ (energy)
* $A_2$ (energy)
* $A_3$ (energy)
* $A_4$ (energy)
* $A_5$ (energy)

----------

----------

## Restrictions

This dihedral style can only be used if LAMMPS was built with the
MOLECULE package.  See the [Build package](Build_package) doc page
for more info.

## Related commands

[dihedral_coeff](dihedral_coeff)

## Default

none
