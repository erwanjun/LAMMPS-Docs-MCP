---
title: "pair_style pedone command"
category: "pair_style"
tags: ["pair_style", "pedone", "KSPACE", "pressure", "energy", "lennard-jones", "coulomb", "long-range"]
commands: ["pair_style pedone"]
---
# pair_style pedone command

Accelerator Variants: *pedone/omp*


## Syntax

```lammps
pair_style style args
```
* style = pedone*
* args = list of arguments for a particular style

```
*pedone* args = cutoff
  cutoff = global cutoff for Pedone interactions (distance units)
```
## Examples

```lammps
pair_style hybrid/overlay pedone 15.0 coul/long 15.0
kspace_style pppm 1.0e-5

pair_coeff * * coul/long
pair_coeff 1 2 pedone 0.030211 2.241334 2.923245 5.0
pair_coeff 2 2 pedone 0.042395 1.379316 3.618701 22.0
```
Used in input scripts:

```
examples/PACKAGES/pedone/in.pedone.relax
examples/PACKAGES/pedone/in.pedone.melt
```
## Description

*Added in version 17Apr2024*
Pair style *pedone* computes the **non-Coulomb** interactions of the Pedone
(or PMMCS) potential [(Pedone)](#Pedone) which combines Coulomb
interactions, Morse potential, and repulsive $r^{-12}$
Lennard-Jones terms (see below).  The *pedone* pair style is meant
to be used in addition to a [Coulomb pair style](pair_coul) via
pair style [hybrid/overlay](pair_hybrid) (see example above).
Using *coul/long* or *could/dsf* (for solids) is recommended.

The full Pedone potential function from [(Pedone)](#Pedone) for each
pair of atoms is:


$$
E =  \frac{C q_i q_j}{\epsilon  r}
    + D_0 \left[ e^{- 2 \alpha (r - r_0)} - 2 e^{- \alpha (r - r_0)} \right]
    + \frac{B_0}{r^{12}} \qquad r < r_c
$$

$r_c$ is the cutoff and $C$ is a conversion factor that is
specific to the choice of [units](units) so that the entire
Coulomb term is in energy units with $q_i$ and $q_j$ as the
assigned charges in multiples of the elementary charge.

The following coefficients must be defined for the selected pairs of
atom types via the [pair_coeff](pair_coeff) command as in the
example above:

* $D_0$ (energy units)
* $\alpha$ (1/distance units)
* $r_0$ (distance units)
* $C_0$ (energy units)
* cutoff (distance units)

The last coefficient is optional.  If not specified, the global *pedone*
cutoff is used.

----------

----------

## Mixing, shift, table, tail correction, restart, rRESPA info

This pair style does not support mixing.

This pair style support the [pair_modify](pair_modify) shift
option for the energy of the pair interaction.

This pair style does not support the [pair_modify](pair_modify)
tail option for adding long-range tail corrections to energy and
pressure.

This pair style writes its information to [binary restart files](restart),
so pair_style and pair_coeff commands does not need to be specified in an input
script that reads a restart file.

This pair style can only be used via the *pair* keyword of the
[run_style respa](run_style) command.  It does not support the
*inner*, *middle*, or *outer* keywords.

----------

## Restrictions

The *pedone* pair style is only enabled if LAMMPS was built with the
EXTRA-PAIR package.  See the [Build package](Build_package) page
for more info.

## Related commands

[pair_coeff](pair_coeff), [pair_style](pair_style),
[pair style coul/long and coul/dsf](pair_coul),
[pair style morse](pair_morse)

## Default

none

-------------


**(Pedone)** A. Pedone, G. Malavasi, M. C. Menziani, A. N. Cormack, and U. Segre, J. Phys. Chem. B, 110, 11780 (2006)
