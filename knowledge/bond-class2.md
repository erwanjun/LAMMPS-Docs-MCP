---
title: "bond_style class2 command"
category: "bond_style"
tags: ["bond_style", "class2", "energy", "force"]
commands: ["bond_style class2"]
---
# bond_style class2 command

Accelerator Variants: *class2/omp*, *class2/kk*

## Syntax

```lammps
bond_style class2
```
## Examples

```lammps
bond_style class2
bond_coeff 1 1.0 100.0 80.0 80.0
```
## Description

The *class2* bond style uses the potential


$$
E = K_2 (r - r_0)^2 + K_3 (r - r_0)^3 + K_4 (r - r_0)^4
$$

where $r_0$ is the equilibrium bond distance.

See [(Sun)](#bond-Sun) for a description of the COMPASS class2 force field.

The following coefficients must be defined for each bond type via the
[bond_coeff](bond_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $r_0$ (distance)
* $K_2$ (energy/distance\^2)
* $K_3$ (energy/distance\^3)
* $K_4$ (energy/distance\^4)

----------

----------

## Restrictions

This bond style can only be used if LAMMPS was built with the CLASS2
package.  See the [Build package](Build_package) page for more
info.

## Related commands

[bond_coeff](bond_coeff), [delete_bonds](delete_bonds)

## Default

none

----------


**(Sun)** Sun, J Phys Chem B 102, 7338-7364 (1998).
