---
title: "angle_style mwlc command"
category: "angle_style"
tags: ["angle_style", "mwlc", "MOLECULE", "temperature", "energy"]
commands: ["angle_style mwlc"]
---
# angle_style mwlc command

## Syntax

```lammps
angle_style mwlc
```
## Examples

```lammps
angle_style mwlc
angle_coeff * 25 1 10 1
```
## Description

*Added in version 4Feb2025*
The *mwlc* angle style models a meltable wormlike chain and can be used
to model non-linear bending elasticity of polymers, e.g. DNA.  *mwlc*
uses a potential that is a canonical-ensemble superposition of a
non-melted and a melted state [(Farrell)](#Farrell).  The potential
is


$$
E = -k_{B}T\,\log [q + q^{m}] + E_{0},
$$

where the non-melted and melted partition functions are


$$
q = \exp [-k_{1}(1+\cos{\theta})/k_{B}T]; \\
q^{m} = \exp [-(\mu+k_{2}(1+\cos{\theta}))/k_{B}T].
$$

$k_1$ is the bending elastic constant of the non-melted state,
$k_2$ is the bending elastic constant of the melted state,
$\mu$ is the melting energy, and
$T$ is the reference temperature.
The reference energy,


$$
E_{0} = -k_{B}T\,\log [1 + \exp[-\mu/k_{B}T]],
$$

ensures that E is zero for a fully extended chain.

This potential is a continuous version of the two-state potential
introduced by [(Yan)](#Yan).

The following coefficients must be defined for each angle type via the
[angle_coeff](angle_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $k_1$ (energy)
* $k_2$ (energy)
* $\mu$ (energy)
* $T$ (temperature)

----------


## Restrictions

This angle style can only be used if LAMMPS was built with the
EXTRA-MOLECULE package.  See the [Build package](Build_package)
doc page for more info.

## Related commands

[angle_coeff](angle_coeff)

## Default

none

----------


**(Farrell)** [Farrell, Dobnikar, Podgornik, Curk, Phys Rev Lett, 133, 148101 (2024).](https://doi.org/10.1103/PhysRevLett.133.148101)


**(Yan)** [Yan, Marko, Phys Rev Lett, 93, 108108 (2004).](https://doi.org/10.1103/PhysRevLett.93.108108)
