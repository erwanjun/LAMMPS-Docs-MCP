---
title: "bond_style nonlinear command"
category: "bond_style"
tags: ["bond_style", "nonlinear", "MOLECULE", "energy"]
commands: ["bond_style nonlinear"]
---
# bond_style nonlinear command

Accelerator Variants: *nonlinear/omp*

## Syntax

```lammps
bond_style nonlinear
```
## Examples

```lammps
bond_style nonlinear
bond_coeff 2 100.0 1.1 1.4
```
## Description

The *nonlinear* bond style uses the potential


$$
E = \frac{\epsilon (r - r_0)^2}{ [ \lambda^2 - (r - r_0)^2 ]}
$$

to define an anharmonic spring [(Rector)](#Rector) of equilibrium
length $r_0$ and maximum extension lamda.

The following coefficients must be defined for each bond type via the
[bond_coeff](bond_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $\epsilon$ (energy)
* $r_0$ (distance)
* $\lambda$ (distance)

----------

----------

## Restrictions

This bond style can only be used if LAMMPS was built with the EXTRA-MOLECULE
package.  See the [Build package](Build_package) page for more
info.

## Related commands

[bond_coeff](bond_coeff), [delete_bonds](delete_bonds)

## Default

none

----------


**(Rector)** Rector, Van Swol, Henderson, Molecular Physics, 82, 1009 (1994).
