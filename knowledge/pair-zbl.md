---
title: "pair_style zbl command"
category: "pair_style"
tags: ["pair_style", "zbl", "GPU", "energy", "force", "lennard-jones"]
commands: ["pair_style zbl"]
---
# pair_style zbl command

Accelerator Variants: *zbl/gpu*, *zbl/kk*, *zbl/omp*

## Syntax

```lammps
pair_style zbl inner outer
```
* inner = distance where switching function begins
* outer = global cutoff for ZBL interaction

## Examples

```lammps
pair_style zbl 3.0 4.0
pair_coeff * * 73.0 73.0
pair_coeff 1 1 14.0 14.0
```
## Description

Style *zbl* computes the Ziegler-Biersack-Littmark (ZBL) screened
nuclear repulsion for describing high-energy collisions between atoms.
[(Ziegler)](#Ziegler). It includes an additional switching function
that ramps the energy, force, and curvature smoothly to zero between an
inner and outer cutoff. The potential energy due to a pair of atoms at a
distance r_ij is given by:


$$
E^{ZBL}_{ij} & = \frac{1}{4\pi\epsilon_0} \frac{Z_i Z_j \,e^2}{r_{ij}} \phi(r_{ij}/a)+ S(r_{ij})\\
a & =  \frac{0.46850}{Z_{i}^{0.23} + Z_{j}^{0.23}}\\
\phi(x) & =  0.18175e^{-3.19980x} + 0.50986e^{-0.94229x} + 0.28022e^{-0.40290x} + 0.02817e^{-0.20162x}\\
$$

where *e* is the electron charge, $\epsilon_0$ is the electrical
permittivity of vacuum, and $Z_i$ and $Z_j$ are the nuclear
charges of the two atoms.  The switching function $S(r)$ is
identical to that used by [pair_style lj/gromacs](pair_gromacs).
Here, the inner and outer cutoff are the same for all pairs of atom
types.

The following coefficients must be defined for each pair of atom types
via the [pair_coeff](pair_coeff) command as in the examples above,
or in the LAMMPS data file.

* $Z_i$ (atomic number for first atom type, e.g. 13.0 for aluminum)

* $Z_j$ (ditto for second atom type)

The values of $Z_i$ and $Z_j$ are normally equal to the
atomic numbers of the two atom types. Thus, the user may optionally
specify only the coefficients for each $i==j$ pair, and rely on
the obvious mixing rule for cross interactions (see below).  Note that
when $i==j$ it is required that $Z_i == Z_j$.  When used
with [hybrid/overlay](pair_hybrid) and pairs are assigned to more
than one sub-style, the mixing rule is not used and each pair of types
interacting with the ZBL sub-style must be included in a pair_coeff
command.


> **Note**
> The numerical values of the exponential decay constants in the
> screening function depend on the unit of distance. In the above
> equation they are given for units of Angstroms. LAMMPS will
> automatically convert these values to the distance unit of the
> specified LAMMPS [units](units) setting.  The values of Z
> should always be given as multiples of a proton's charge, e.g. 29.0
> for copper.

----------

----------

## Mixing, shift, table, tail correction, restart, rRESPA info

For atom type pairs *i,j* and $i \neq j$, the $Z_i$ and
$Z_j$ coefficients can be mixed by taking $Z_a$ and
$Z_b$ from the values specified for the two cases where $i
== j$ and thus $Z_a = Z_i == Z_j$ and $Z_b = Z_i == Z_j$ for
different elements.  When used with [hybrid/overlay](pair_hybrid)
and pairs are assigned to more than one sub-style, the mixing rule is
not used and each pair of types interacting with the ZBL sub-style must
be included in a pair_coeff command.  The [pair_modify](pair_modify) mix option has no effect on the mixing behavior

The ZBL pair style does not support the [pair_modify](pair_modify)
shift option, since the ZBL interaction is already smoothed to 0.0 at
the cutoff.

The [pair_modify](pair_modify) table option is not relevant for
this pair style.

This pair style does not support the [pair_modify](pair_modify)
tail option for adding long-range tail corrections to energy and
pressure, since there are no corrections for a potential that goes to
0.0 at the cutoff.

This pair style does not write information to [binary restart files](restart), so pair_style and pair_coeff commands must be specified in
an input script that reads a restart file.

This pair style can only be used via the *pair* keyword of the
[run_style respa](run_style) command.  It does not support the
*inner*, *middle*, *outer* keywords.

----------

## Restrictions
none

## Related commands

[pair_coeff](pair_coeff)

## Default

none

----------


**(Ziegler)** J.F. Ziegler, J. P. Biersack and U. Littmark, "The
Stopping and Range of Ions in Matter", Volume 1, Pergamon, 1985.
