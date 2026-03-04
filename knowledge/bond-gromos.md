---
title: "bond_style gromos command"
category: "bond_style"
tags: ["bond_style", "gromos", "MOLECULE", "energy"]
commands: ["bond_style gromos"]
---
# bond_style gromos command

Accelerator Variants: *gromos/omp*

## Syntax

```lammps
bond_style gromos
```
## Examples

```lammps
bond_style gromos
bond_coeff 5 80.0 1.2
```
## Description

The *gromos* bond style uses the potential


$$
E = K (r^2 - r_0^2)^2
$$

where $r_0$ is the equilibrium bond distance.  Note that the usual 1/4
factor is included in $K$.

The following coefficients must be defined for each bond type via the
[bond_coeff](bond_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy/distance\^4)
* $r_0$ (distance)

----------

----------

## Restrictions

This bond style can only be used if LAMMPS was built with the MOLECULE
package.  See the [Build package](Build_package) page for more
info.

## Related commands

[bond_coeff](bond_coeff), [delete_bonds](delete_bonds)

## Default

none
