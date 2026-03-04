---
title: "dihedral_style opls command"
category: "dihedral_style"
tags: ["dihedral_style", "opls", "INTEL", "MOLECULE", "energy", "force"]
commands: ["dihedral_style opls"]
---
# dihedral_style opls command

Accelerator Variants: *opls/intel*, *opls/kk*, *opls/omp*

## Syntax

```lammps
dihedral_style opls
```
## Examples

```lammps
dihedral_style opls
dihedral_coeff 1 1.740 -0.157 0.279 0.00   # CT-CT-CT-CT
dihedral_coeff 2 0.000 0.000 0.366 0.000   # CT-CT-CT-HC
dihedral_coeff 3 0.000 0.000 0.318 0.000   # HC-CT-CT-HC
```
## Description

The *opls* dihedral style uses the potential


$$
E = & \frac{1}{2} K_1 [1 + \cos(\phi)] + \frac{1}{2} K_2 [1 - \cos(2 \phi)] + \\
    & \frac{1}{2} K_3 [1 + \cos(3 \phi)] + \frac{1}{2} K_4 [1 - \cos(4 \phi)]
$$

Note that the usual 1/2 factor is not included in the K values.

This dihedral potential is used in the OPLS force field and is
described in [(Watkins)](#Watkins).

The following coefficients must be defined for each dihedral type via the
[dihedral_coeff](dihedral_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K_1$ (energy)
* $K_2$ (energy)
* $K_3$ (energy)
* $K_4$ (energy)

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

----------


**(Watkins)** Watkins and Jorgensen, J Phys Chem A, 105, 4118-4125 (2001).
