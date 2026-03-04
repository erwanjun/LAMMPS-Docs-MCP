---
title: "improper_style cossq command"
category: "improper_style"
tags: ["improper_style", "cossq", "MOLECULE", "energy"]
commands: ["improper_style cossq"]
---
# improper_style cossq command

Accelerator Variants: *cossq/omp*

## Syntax

```lammps
improper_style cossq
```
## Examples

```lammps
improper_style cossq
improper_coeff 1 4.0 0.0
```
## Description

The *cossq* improper style uses the potential


$$
E = \frac{1}{2} K \cos^2{\left(\chi - \chi_0\right)}
$$

where $\chi$ is the improper angle, $\chi_0$ is its
equilibrium value, and $K$ is a prefactor.

If the 4 atoms in an improper quadruplet (listed in the data file read
by the [read_data](read_data) command) are ordered I,J,K,L then
$\chi$ is the angle between the plane of I,J,K and the plane of J,K,L.
Alternatively, you can think of atoms J,K,L as being in a plane, and
atom I above the plane, and $\chi$ as a measure of how far
out-of-plane I is with respect to the other 3 atoms.

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
* $\chi_0$ (degrees)

----------

----------

## Symmetry convention

For the *cossq* improper style, the first atom in the quadruplet is the
atom of symmetry; all other atoms are considered interchangeable.  This
convention is relevant for operations that require knowledge of how atoms
are ordered, such as automatic assignment of new improper types by
[fix bond/react](fix_bond_react).

## Restrictions

This improper style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package)
doc page for more info.

## Related commands

[improper_coeff](improper_coeff)

## Default

none
