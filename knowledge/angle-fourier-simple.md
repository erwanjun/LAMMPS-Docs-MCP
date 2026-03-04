---
title: "angle_style fourier/simple command"
category: "angle_style"
tags: ["angle_style", "fourier/simple", "MOLECULE", "energy"]
commands: ["angle_style fourier/simple"]
---
# angle_style fourier/simple command

Accelerator Variants: *fourier/simple/omp*

## Syntax

```lammps
angle_style fourier/simple
```
## Examples

```lammps
angle_style fourier/simple
angle_coeff 100.0 -1.0 1.0
```
## Description

The *fourier/simple* angle style uses the potential


$$
E = K [ 1.0 + c \cos ( n \theta) ]
$$

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy)
* $c$ (real)
* $n$ (real)

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
