---
title: "improper_style cvff command"
category: "improper_style"
tags: ["improper_style", "cvff", "INTEL", "MOLECULE", "energy"]
commands: ["improper_style cvff"]
---
# improper_style cvff command

Accelerator Variants: *cvff/intel*, *cvff/omp*

## Syntax

```lammps
improper_style cvff
```
## Examples

```lammps
improper_style cvff
improper_coeff 1 80.0 -1 4
```
## Description

The *cvff* improper style uses the potential


$$
E = K [1 + d  \cos (n \phi) ]
$$

where phi is the improper dihedral angle.

If the 4 atoms in an improper quadruplet (listed in the data file read
by the [read_data](read_data) command) are ordered I,J,K,L then
the improper dihedral angle is between the plane of I,J,K and the
plane of J,K,L.  Note that because this is effectively a dihedral
angle, the formula for this improper style is the same as for
[dihedral_style harmonic](dihedral_harmonic).

Note that defining 4 atoms to interact in this way, does not mean that
bonds necessarily exist between I-J, J-K, or K-L, as they would in a
linear dihedral.  Normally, the bonds I-J, I-K, I-L would exist for an
improper to be defined between the 4 atoms.

The following coefficients must be defined for each improper type via
the [improper_coeff](improper_coeff) command as in the example
above, or in the data file or restart files read by the
[read_data](read_data) or [read_restart](read_restart)
commands:

* $K$ (energy)
* $d$ (+1 or -1)
* $n$ (0,1,2,3,4,6)

----------

----------

## Symmetry convention

For the *cvff* improper style, the first atom in the quadruplet is the
atom of symmetry; all other atoms are considered interchangeable.  This
convention is relevant for operations that require knowledge of how atoms
are ordered, such as automatic assignment of new improper types by
[fix bond/react](fix_bond_react).

## Restrictions

This improper style can only be used if LAMMPS was built with the
MOLECULE package.  See the [Build package](Build_package) doc page
for more info.

## Related commands

[improper_coeff](improper_coeff)

## Default

none
