---
title: "pair_style spin/magelec command"
category: "pair_style"
tags: ["pair_style", "spin/magelec", "SPIN", "force", "EAM"]
commands: ["pair_style spin/magelec"]
---
# pair_style spin/magelec command

## Syntax

```lammps
pair_style spin/magelec cutoff
```
* cutoff = global cutoff pair (distance in metal units)

## Examples

```lammps
pair_style spin/magelec 4.5
pair_coeff * * magelec 4.5 0.00109 1.0 1.0 1.0
```
## Description

Style *spin/me* computes a magneto-electric interaction between
pairs of magnetic spins. According to the derivation reported in
[(Katsura)](#Katsura1), this interaction is defined as:


$$
\vec{\omega}_i & = -\frac{1}{\hbar} \sum_{j}^{Neighb} \vec{s}_{j}\times\vec{D}(r_{ij}) \\
\vec{F}_i & = -\sum_{j}^{Neighb} \frac{\partial D(r_{ij})}{\partial r_{ij}} \left(\vec{s}_{i}\times \vec{s}_{j} \right) \cdot \vec{r}_{ij}
$$

where $\vec{s}_i$ and $\vec{s}_j$ are neighboring magnetic
spins of two particles.

From this magneto-electric interaction, each spin i will be submitted
to a magnetic torque omega, and its associated atom can be submitted to a
force F for spin-lattice calculations (see [fix nve/spin](fix_nve_spin)),
such as:


$$
\vec{F}^{i} & = -\sum_{j}^{Neighbor} \left( \vec{s}_{i}\times \vec{s}_{j} \right) \times \vec{E} \\
\vec{\omega}^{i} = -\frac{1}{\hbar} \sum_{j}^{Neighbor} \vec{s}_j \times \left(\vec{E}\times r_{ij} \right)
$$

with h the Planck constant (in metal units) and $\vec{E}$ an
electric polarization vector.  The norm and direction of E are giving
the intensity and the direction of a screened dielectric atomic
polarization (in eV).

More details about the derivation of these torques/forces are reported in
[(Tranchida)](#Tranchida4).

----------

## Restrictions

All the *pair/spin* styles are part of the SPIN package.  These styles
are only enabled if LAMMPS was built with this package, and if the
atom_style "spin" was declared.  See the [Build package](Build_package) page for more info.

## Related commands

[atom_style spin](atom_style), [pair_coeff](pair_coeff),
[pair_style spin/exchange](pair_spin_exchange), [pair_eam](pair_eam),

## Default

none

----------


**(Katsura)** H. Katsura, N. Nagaosa, A.V. Balatsky. Phys. Rev. Lett., 95(5), 057205. (2005)


**(Tranchida)** Tranchida, Plimpton, Thibaudeau, and Thompson,
Journal of Computational Physics, 372, 406-425, (2018).
