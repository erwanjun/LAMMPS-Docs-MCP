---
title: "bond_style harmonic command"
category: "bond_style"
tags: ["bond_style", "harmonic", "INTEL", "MOLECULE", "energy"]
commands: ["bond_style harmonic"]
---
# bond_style harmonic command

Accelerator Variants: *harmonic/intel*, *harmonic/kk*, *harmonic/omp*

## Syntax

```lammps
bond_style harmonic
```
## Examples

```lammps
bond_style harmonic
bond_coeff 5 80.0 1.2
```
## Description

The *harmonic* bond style uses the potential


$$
E = K (r - r_0)^2
$$

where $r_0$ is the equilibrium bond distance.  Note that the usual 1/2
factor is included in $K$.

The following coefficients must be defined for each bond type via the
[bond_coeff](bond_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy/distance\^2)
* $r_0$ (distance)

----------

----------

## Restrictions

This bond style can only be used if LAMMPS was built with the MOLECULE
package.  See the [Build package](Build_package) page for more
info.

## Related commands

[bond_coeff](bond_coeff), [delete_bonds](delete_bonds)
[bond style harmonic/shift](bond_harmonic_shift),
[bond style harmonic/shift/cut](bond_harmonic_shift_cut)

## Default

none
