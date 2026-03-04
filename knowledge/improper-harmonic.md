---
title: "improper_style harmonic command"
category: "improper_style"
tags: ["improper_style", "harmonic", "INTEL", "MOLECULE", "energy"]
commands: ["improper_style harmonic"]
---
# improper_style harmonic command

Accelerator Variants: *harmonic/intel*, *harmonic/kk*, *harmonic/omp*

## Syntax

```lammps
improper_style harmonic
```
## Examples

```lammps
improper_style harmonic
improper_coeff 1 100.0 0
```
## Description

The *harmonic* improper style uses the potential


$$
E = K (\chi - \chi_0)^2
$$

where $\chi$ is the improper angle, $\chi_0$ is its equilibrium
value, and $K$ is a prefactor.  Note that the usual 1/2 factor is
included in $K$.

If the 4 atoms in an improper quadruplet (listed in the data file read
by the [read_data](read_data) command) are ordered I,J,K,L then
$\chi$
is the angle between the plane of I,J,K and the plane of J,K,L.
Alternatively, you can think of atoms J,K,L as being in a plane, and
atom I above the plane, and $\chi$ as a measure of how far out-of-plane
I is with respect to the other 3 atoms.

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

$\chi_0$ is specified in degrees, but LAMMPS converts it to
radians internally; hence $K$ is effectively energy per
radian\^2.

----------

----------

## Symmetry convention

For the *harmonic* improper style, the first atom in the quadruplet is the
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
