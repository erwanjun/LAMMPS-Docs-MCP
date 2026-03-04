---
title: "pair_style lj/expand command"
category: "pair_style"
tags: ["pair_style", "lj/expand", "GPU", "energy", "force", "lennard-jones", "coulomb"]
commands: ["pair_style lj/expand"]
---
# pair_style lj/expand command

Accelerator Variants: *lj/expand/gpu*, *lj/expand/kk*, *lj/expand/omp*

# pair_style lj/expand/coul/long command

Accelerator Variants: *lj/expand/coul/long/gpu*, *lj/expand/coul/long/kk*

## Syntax

```lammps
pair_style lj/expand cutoff
```
* cutoff = global cutoff for lj/expand interactions (distance units)

## Examples

```lammps
pair_style lj/expand 2.5
pair_coeff * * 1.0 1.0 0.5
pair_coeff 1 1 1.0 1.0 -0.2 2.0

pair_style lj/expand/coul/long 2.5
pair_style lj/expand/coul/long 2.5 4.0
pair_coeff * * 1.0 1.0 0.5
pair_coeff 1 1 1.0 1.0 -0.2 3.0
```
## Description

Style *lj/expand* computes a LJ interaction with a distance shifted by
delta which can be useful when particles are of different sizes, since
it is different that using different sigma values in a standard LJ
formula:


$$
E = 4 \epsilon \left[ \left(\frac{\sigma}{r - \Delta}\right)^{12} -
  \left(\frac{\sigma}{r - \Delta}\right)^6 \right]
  \qquad r < r_c + \Delta
$$

$r_c$ is the cutoff which does not include the $\Delta$
distance.  I.e. the actual force cutoff is the sum of $r_c +
\Delta$.

For all of the *lj/expand* pair styles, the following coefficients must
be defined for each pair of atoms types via the [pair_coeff](pair_coeff) command as in the examples above, or in the data file or
restart files read by the [read_data](read_data) or
[read_restart](read_restart) commands, or by mixing as described
below:

* $\epsilon$ (energy units)
* $\sigma$ (distance units)
* $\Delta$ (distance units)
* cutoff (distance units)

The $\Delta$ values can be positive or negative.  The last
coefficient is optional.  If not specified, the global LJ cutoff is
used.

For *lj/expand/coul/long* only the LJ cutoff can be specified since a
Coulombic cutoff cannot be specified for an individual I,J type pair.
All type pairs use the same global Coulombic cutoff specified in the
pair_style command.

----------

----------

## Mixing, shift, table, tail correction, restart, rRESPA info

For atom type pairs I,J and I != J, the epsilon, sigma, and shift
coefficients and cutoff distance for this pair style can be mixed.
Shift is always mixed via an *arithmetic* rule.  The other
coefficients are mixed according to the pair_modify mix value.  The
default mix value is *geometric*.  See the "pair_modify" command for
details.

This pair style supports the [pair_modify](pair_modify) shift
option for the energy of the pair interaction.

The [pair_modify](pair_modify) table option is not relevant
for this pair style.

This pair style supports the [pair_modify](pair_modify) tail
option for adding a long-range tail correction to the energy and
pressure of the pair interaction.

This pair style writes its information to [binary restart files](restart), so pair_style and pair_coeff commands do not need
to be specified in an input script that reads a restart file.

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
