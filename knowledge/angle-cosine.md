---
title: "angle_style cosine command"
category: "angle_style"
tags: ["angle_style", "cosine", "MOLECULE", "energy"]
commands: ["angle_style cosine"]
---
# angle_style cosine command

Accelerator Variants: *cosine/omp*, *cosine/kk*

## Syntax

```lammps
angle_style cosine
```
## Examples

```lammps
angle_style cosine
angle_coeff * 75.0
```
## Description

The *cosine* angle style uses the potential


$$
E = K [1 + \cos(\theta)]
$$

where $K$ is defined for each angle type.

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy)

----------

----------

## Restrictions

This angle style can only be used if LAMMPS was built with the
MOLECULE package.  See the [Build package](Build_package) doc page
for more info.

## Related commands

[angle_coeff](angle_coeff)

## Default

none
