---
title: "dihedral_style cosine/shift/exp command"
category: "dihedral_style"
tags: ["dihedral_style", "cosine/shift/exp", "MOLECULE", "energy"]
commands: ["dihedral_style cosine/shift/exp"]
---
# dihedral_style cosine/shift/exp command

Accelerator Variants: *cosine/shift/exp/omp*

## Syntax

```lammps
dihedral_style cosine/shift/exp
```
## Examples

```lammps
dihedral_style cosine/shift/exp
dihedral_coeff 1 10.0 45.0 2.0
```
## Description

The *cosine/shift/exp* dihedral style uses the potential


$$
E = -U_{min}\frac{e^{-a U(\theta,\theta_0)}-1}{e^a-1} \quad\mbox{with}\quad U(\theta,\theta_0)=-0.5 \left(1+\cos(\theta-\theta_0) \right)
$$

where $U_{min}$, $\theta$, and $a$ are defined for
each dihedral type.

The potential is bounded between $\left[-U_{min}:0\right]$ and the minimum is located
at the angle $\theta_0$. The a parameter can be both positive or negative
and is used to control the spring constant at the equilibrium.

The spring constant is given by $k=a e^a \frac{U_{min}}{2 \left(e^a-1\right)}$.
For $a>3$ and  $\frac{k}{U_{min}} = \frac{a}{2}$ to better than 5% relative error. For negative
values of the a parameter, the spring constant is essentially zero,
and anharmonic terms takes over. The potential is furthermore well
behaved in the limit $a \rightarrow 0$, where it has been implemented to linear
order in $a$ for $a < 0.001$.

The following coefficients must be defined for each dihedral type via
the [dihedral_coeff](dihedral_coeff) command as in the example
above, or in the data file or restart files read by the
[read_data](read_data) or [read_restart](read_restart)
commands:

* $U_{min}$ (energy)
* $\theta$ (angle)
* $a$ (real number)

----------

----------

## Restrictions

This dihedral style can only be used if LAMMPS was built with the
MOLECULE package.  See the [Build package](Build_package) doc
page for more info.

## Related commands

[dihedral_coeff](dihedral_coeff),
[angle_style cosine/shift/exp](angle_cosine_shift_exp)

## Default

none
