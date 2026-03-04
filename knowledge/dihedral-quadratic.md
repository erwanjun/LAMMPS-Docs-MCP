---
title: "dihedral_style quadratic command"
category: "dihedral_style"
tags: ["dihedral_style", "quadratic", "MOLECULE", "energy"]
commands: ["dihedral_style quadratic"]
---
# dihedral_style quadratic command

Accelerator Variants: *quadratic/omp*

## Syntax

```lammps
dihedral_style quadratic
```
## Examples

```lammps
dihedral_style quadratic
dihedral_coeff 100.0 80.0
```
## Description

The *quadratic* dihedral style uses the potential:


$$
E = K (\phi - \phi_0)^2
$$

This dihedral potential can be used to keep a dihedral in a predefined
value (cis=zero, right-hand convention is used).

The following coefficients must be defined for each dihedral type via
the [dihedral_coeff](dihedral_coeff) command as in the example
above, or in the data file or restart files read by the
[read_data](read_data) or [read_restart](read_restart)
commands:

* $K$ (energy)
* $\phi_0$ (degrees)

$\phi_0$ is specified in degrees, but LAMMPS converts it to
radians internally; hence $K$ is effectively energy per
radian\^2.

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
