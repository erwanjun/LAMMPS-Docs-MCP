---
title: "angle_style fourier command"
category: "angle_style"
tags: ["angle_style", "fourier", "MOLECULE", "energy"]
commands: ["angle_style fourier"]
---
# angle_style fourier command

Accelerator Variants: *fourier/omp*

## Syntax

```lammps
angle_style fourier
```
## Examples

```lammps
angle_style fourier
angle_coeff 75.0 1.0 1.0 1.0
```
## Description

The *fourier* angle style uses the potential


$$
E = K [C_0 + C_1 \cos ( \theta) + C_2 \cos( 2 \theta) ]
$$

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy)
* $C_0$ (real)
* $C_1$ (real)
* $C_2$ (real)

----------

----------

## Restrictions

This angle style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package) doc
page for more info.

## Related commands

[angle_coeff](angle_coeff)

## Default

none
