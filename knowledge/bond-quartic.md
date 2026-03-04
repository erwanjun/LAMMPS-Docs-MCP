---
title: "bond_style quartic command"
category: "bond_style"
tags: ["bond_style", "quartic", "MOLECULE", "energy", "lennard-jones", "coarse-grain"]
commands: ["bond_style quartic"]
---
# bond_style quartic command

Accelerator Variants: *quartic/omp*

## Syntax

```lammps
bond_style quartic
```
## Examples

```lammps
bond_style quartic
bond_coeff 2 1200 -0.55 0.25 1.3 34.6878
```
## Description

The *quartic* bond style uses the potential


$$
E      & = E_q + E_{LJ} \\
E_q    & = K (r - R_c)^ 2 (r - R_c - B_1) (r - R_c - B_2) + U_0 \\
E_{LJ} & = \left\{ \begin{array} {l@{\quad:\quad}l}
4 \epsilon \left[ \left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^6 \right] + \epsilon & r < 2^{\frac{1}{6}}, \epsilon = 1, \sigma = 1 \\
                                               0 & r >= 2^{\frac{1}{6}}
                      \end{array} \right.
$$

to define a bond that can be broken as the simulation proceeds (e.g.
due to a polymer being stretched).  The $\sigma$ and
$\epsilon$ used in the LJ portion of the formula are both set
equal to 1.0 by LAMMPS and the LJ portion is cut off at its minimum,
i.e. at $r_c = 2^{\frac{1}{6}}$.

The following coefficients must be defined for each bond type via the
[bond_coeff](bond_coeff) command as in the example above, or in
the data file or restart files read by the [read_data](read_data)
or [read_restart](read_restart) commands:

* $K$ (energy/distance\^4)
* $B_1$ (distance)
* $B_2$ (distance)
* $R_c$ (distance)
* $U_0$ (energy)

This potential was constructed to mimic the FENE bond potential for
coarse-grained polymer chains.  When monomers with $\sigma =
\epsilon = 1.0$ are used, the following choice of parameters gives a
quartic potential that looks nearly like the FENE potential:


$$
K &= 1200 \\
B_1 &= -0.55 \\
B_2 &= 0.25 \\
R_c &= 1.3 \\
U_0 &= 34.6878
$$

Different parameters can be specified using the [bond_coeff](bond_coeff)
command, but you will need to choose them carefully so they form a suitable
bond potential.

$R_c$ is the cutoff length at which the bond potential goes smoothly to a
local maximum.  If a bond length ever becomes $> R_c$, LAMMPS "breaks"
the bond, which means two things.  First, the bond potential is turned
off by setting its type to 0, and is no longer computed.  Second, a
pairwise interaction between the two atoms is turned on, since they
are no longer bonded. See the [Howto](Howto_broken_bonds) page
on broken bonds for more information.

LAMMPS does the second task via a computational sleight-of-hand.  It
subtracts the pairwise interaction as part of the bond computation.
When the bond breaks, the subtraction stops.  For this to work, the
pairwise interaction must always be computed by the
[pair_style](pair_style) command, whether the bond is broken or
not.  This means that [special_bonds](special_bonds) must be set
to 1,1,1, as indicated as a restriction below.

Note that when bonds are dumped to a file via the [dump local](dump) command, bonds with type 0 are not included.  The
[delete_bonds](delete_bonds) command can also be used to query the
status of broken bonds or permanently delete them, e.g.:

```lammps
delete_bonds all stats
delete_bonds all bond 0 remove
### ```

----------

## Restrictions

This bond style can only be used if LAMMPS was built with the MOLECULE
package.  See the [Build package](Build_package) page for more
info.

The *quartic* style requires that [special_bonds](special_bonds)
parameters be set to 1,1,1.  Three- and four-body interactions (angle,
dihedral, etc) cannot be used with *quartic* bonds.

## Related commands

[bond_coeff](bond_coeff), [delete_bonds](delete_bonds)

## Default

none
