---
title: "dihedral_style harmonic command"
category: "dihedral_style"
tags: ["dihedral_style", "harmonic", "INTEL", "MOLECULE", "energy", "force"]
commands: ["dihedral_style harmonic"]
---
# dihedral_style harmonic command

Accelerator Variants: *harmonic/intel*, *harmonic/kk*, *harmonic/omp*

## Syntax

```lammps
dihedral_style harmonic
```
## Examples

```lammps
dihedral_style harmonic
dihedral_coeff 1 80.0 1 2
```
## Description

The *harmonic* dihedral style uses the potential


$$
E = K [ 1 + d  \cos (n \phi) ]
$$

The following coefficients must be defined for each dihedral type via the
[dihedral_coeff](dihedral_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy)
* $d$ (+1 or -1)
* $n$ (integer >= 0)


> **Note**
> Here are important points to take note of when defining LAMMPS
> dihedral coefficients for the harmonic style, so that they are
> compatible with how harmonic dihedrals are defined by other force
> fields:

* The LAMMPS convention is that the trans position = 180 degrees, while
  in some force fields trans = 0 degrees.
* Some force fields reverse the sign convention on $d$.
* Some force fields let $n$ be positive or negative which corresponds to
  $d = 1$ or $d = -1$ for the harmonic style.

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
