---
title: "angle_style charmm command"
category: "angle_style"
tags: ["angle_style", "charmm", "INTEL", "MOLECULE", "energy", "force", "lennard-jones"]
commands: ["angle_style charmm"]
---
# angle_style charmm command

Accelerator Variants: *charmm/intel*, *charmm/kk*, *charmm/omp*

## Syntax

```lammps
angle_style charmm
```
## Examples

```lammps
angle_style charmm
angle_coeff 1 300.0 107.0 50.0 3.0
```
## Description

The *charmm* angle style uses the potential


$$
E = K (\theta - \theta_0)^2 + K_{ub} (r - r_{ub})^2
$$

with an additional Urey_Bradley term based on the distance $r$ between
the first and third atoms in the angle.  $K$, $\theta_0$,
$K_{ub}$, and $R_{ub}$ are coefficients defined for each angle
type.

See [(MacKerell)](#angle-MacKerell) for a description of the CHARMM force
field.

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy)
* $\theta_0$ (degrees)
* $K_{ub}$ (energy/distance\^2)
* $r_{ub}$ (distance)

$\theta_0$ is specified in degrees, but LAMMPS converts it to
radians internally; hence $K$ is effectively energy per
radian\^2.

----------

----------

## Restrictions

This angle style can only be used if LAMMPS was built with the
MOLECULE package.  See the [Build package](Build_package) doc page
for more info.

## Related commands

[angle_coeff](angle_coeff), [pair_style lj/charmm variants](pair_charmm),
[dihedral_style charmm](dihedral_charmm),
[dihedral_style charmmfsw](dihedral_charmm), [fix cmap](fix_cmap)

## Default

none

----------


**(MacKerell)** MacKerell, Bashford, Bellott, Dunbrack, Evanseck, Field,
Fischer, Gao, Guo, Ha, et al, J Phys Chem, 102, 3586 (1998).
