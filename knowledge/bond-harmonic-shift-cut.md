---
title: "bond_style harmonic/shift/cut command"
category: "bond_style"
tags: ["bond_style", "harmonic/shift/cut", "MOLECULE", "energy", "force"]
commands: ["bond_style harmonic/shift/cut"]
---
# bond_style harmonic/shift/cut command

Accelerator Variants: *harmonic/shift/cut/omp*

## Syntax

```lammps
bond_style harmonic/shift/cut
```
## Examples

```lammps
bond_style harmonic/shift/cut
bond_coeff 5 10.0 0.5 1.0
```
## Description

The *harmonic/shift/cut* bond style is a shifted harmonic bond that
uses the potential


$$
E = \frac{U_{\text{min}}}{(r_0-r_c)^2} \left[ (r-r_0)^2-(r_c-r_0)^2 \right]
$$

where $r_0$ is the equilibrium bond distance, and $r_c$ the
critical distance.  The bond potential is zero and thus its force also
zero for distances $r > r_c$.  The potential energy has the value
$-U_{\text{min}}$ at $r_0$ and zero at $r_c$.

The equivalent spring constant value *K* for use with [bond_style
harmonic](bond_harmonic) for $r <= r_c$, can be computed using
$K = U_{\text{min}} / [(r_0-r_c)^2]$

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
[bond_harmonic](bond_harmonic),
[bond_style harmonic/shift](bond_harmonic_shift)

## Default

none
