---
title: "bond_style harmonic/shift command"
category: "bond_style"
tags: ["bond_style", "harmonic/shift", "MOLECULE", "energy"]
commands: ["bond_style harmonic/shift"]
---
# bond_style harmonic/shift command

Accelerator Variants: *harmonic/shift/omp*

## Syntax

```lammps
bond_style harmonic/shift
```
## Examples

```lammps
bond_style harmonic/shift
bond_coeff 5 10.0 0.5 1.0
```
## Description

The *harmonic/shift* bond style is a shifted harmonic bond that uses
the potential


$$
E = \frac{U_{\text{min}}}{(r_0-r_c)^2} \left[ (r-r_0)^2-(r_c-r_0)^2 \right]
$$

where $r_0$ is the equilibrium bond distance, and $r_c$ the
critical distance.  The potential energy has the value
$-U_{\text{min}}$ at $r_0$ and zero at $r_c$.  This
bond style differs from [bond_style harmonic](bond_harmonic)
by the value of the potential energy.

The equivalent spring constant value *K* for use with [bond_style
harmonic](bond_harmonic) can be computed using $K =
U_{\text{min}} / [(r_0-r_c)^2]$.

The following coefficients must be defined for each bond type via the
[bond_coeff](bond_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $U_{\text{min}}$ (energy)
* $r_0$ (distance)
* $r_c$ (distance)

----------

----------

## Restrictions

This bond style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package) doc
page for more info.

## Related commands

[bond_coeff](bond_coeff), [delete_bonds](delete_bonds),
[bond style harmonic](bond_harmonic),
[bond style harmonic/shift/cut](bond_harmonic_shift_cut)

## Default

none
