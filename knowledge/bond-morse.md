---
title: "bond_style morse command"
category: "bond_style"
tags: ["bond_style", "morse", "MOLECULE", "energy"]
commands: ["bond_style morse"]
---
# bond_style morse command

Accelerator Variants: *morse/omp*

## Syntax

```lammps
bond_style morse
```
## Examples

```lammps
bond_style morse
bond_coeff 5 1.0 2.0 1.2
```
## Description

The *morse* bond style uses the potential


$$
E = D \left[ 1 - e^{-\alpha (r - r_0)} \right]^2
$$

where $r_0$ is the equilibrium bond distance, $\alpha$ is a stiffness
parameter, and $D$ determines the depth of the potential well.

The following coefficients must be defined for each bond type via the
[bond_coeff](bond_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $D$ (energy)
* $\alpha$ (inverse distance)
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
