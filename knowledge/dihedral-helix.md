---
title: "dihedral_style helix command"
category: "dihedral_style"
tags: ["dihedral_style", "helix", "MOLECULE", "energy", "coarse-grain"]
commands: ["dihedral_style helix"]
---
# dihedral_style helix command

Accelerator Variants: *helix/omp*

## Syntax

```lammps
dihedral_style helix
```
## Examples

```lammps
dihedral_style helix
dihedral_coeff 1 80.0 100.0 40.0
```
## Description

The *helix* dihedral style uses the potential


$$
E = A [1 - \cos(\theta)] + B [1 + \cos(3 \theta)] +
    C [1 + \cos(\theta + \frac{\pi}{4})]
$$

This coarse-grain dihedral potential is described in [(Guo)](#Guo).
For dihedral angles in the helical region, the energy function is
represented by a standard potential consisting of three minima, one
corresponding to the trans (t) state and the other to gauche states
(g+ and g-).  The paper describes how the $A$, $B$ and,
$C$ parameters are chosen so as to balance secondary (largely
driven by local interactions) and
tertiary structure (driven by long-range interactions).

The following coefficients must be defined for each dihedral type via the
[dihedral_coeff](dihedral_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $A$ (energy)
* $B$ (energy)
* $C$ (energy)

----------

----------

## Restrictions

This dihedral style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package) doc page
for more info.

## Related commands

[dihedral_coeff](dihedral_coeff)

## Default

none

----------


**(Guo)** Guo and Thirumalai, Journal of Molecular Biology, 263, 323-43 (1996).
