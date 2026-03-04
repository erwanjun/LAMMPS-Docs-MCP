---
title: "angle_style cosine/shift command"
category: "angle_style"
tags: ["angle_style", "cosine/shift", "MOLECULE", "energy"]
commands: ["angle_style cosine/shift"]
---
# angle_style cosine/shift command

Accelerator Variants: *cosine/shift/omp*

## Syntax

```lammps
angle_style cosine/shift
```
## Examples

```lammps
angle_style cosine/shift
angle_coeff * 10.0 45.0
```
## Description

The *cosine/shift* angle style uses the potential


$$
E = -\frac{U_{\text{min}}}{2} \left[ 1 + \cos(\theta-\theta_0) \right]
$$

where $\theta_0$ is the equilibrium angle. The potential is bounded
between $-U_{\text{min}}$ and zero. In the neighborhood of the minimum
$E = - U_{\text{min}} + U_{\text{min}}/4(\theta - \theta_0)^2$ hence
the spring constant is $\frac{U_{\text{min}}}{2}$.

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $U_{\text{min}}$ (energy)
* $\theta$ (angle)

----------

----------

## Restrictions

This angle style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package) doc
page for more info.

## Related commands

[angle_coeff](angle_coeff),
[angle_style cosine/shift/exp](angle_cosine_shift_exp)

## Default

none
