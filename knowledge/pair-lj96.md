---
title: "pair_style lj96/cut command"
category: "pair_style"
tags: ["pair_style", "lj96", "GPU", "pressure", "energy", "force", "lennard-jones"]
commands: ["pair_style lj96"]
---
# pair_style lj96/cut command

Accelerator Variants: *lj96/cut/gpu*, *lj96/cut/kk*, *lj96/cut/omp*

## Syntax

```lammps
pair_style lj96/cut cutoff
```
* cutoff = global cutoff for lj96/cut interactions (distance units)

## Examples

```lammps
pair_style lj96/cut 2.5
pair_coeff * * 1.0 1.0 4.0
pair_coeff 1 1 1.0 1.0
```
## Description

The *lj96/cut* style compute a 9/6 Lennard-Jones potential, instead
of the standard 12/6 potential, given by


$$
E = 4 \epsilon \left[ \left(\frac{\sigma}{r}\right)^{9} -
\left(\frac{\sigma}{r}\right)^6 \right]
                    \qquad r < r_c
$$

$r_c$ is the cutoff.

The following coefficients must be defined for each pair of atoms
types via the [pair_coeff](pair_coeff) command as in the examples
above, or in the data file or restart files read by the
[read_data](read_data) or [read_restart](read_restart)
commands, or by mixing as described below:

* $\epsilon$ (energy units)
* $\sigma$ (distance units)
* cutoff (distance units)

The last coefficient is optional.  If not specified, the global LJ
cutoff specified in the pair_style command is used.

----------

----------

## Mixing, shift, table, tail correction, restart, rRESPA info

For atom type pairs I,J and I != J, the epsilon and sigma coefficients
and cutoff distance for all of the lj/cut pair styles can be mixed.
The default mix value is *geometric*.  See the "pair_modify" command
for details.

This pair style supports the [pair_modify](pair_modify) shift
option for the energy of the pair interaction.

The [pair_modify](pair_modify) table option is not relevant
for this pair style.

This pair style supports the [pair_modify](pair_modify) tail
option for adding a long-range tail correction to the energy and
pressure of the pair interaction.

This pair style writes its information to [binary restart files](restart), so pair_style and pair_coeff commands do not need
to be specified in an input script that reads a restart file.

This pair style supports the use of the *inner*, *middle*, and *outer*
keywords of the [run_style respa](run_style) command, meaning the
pairwise forces can be partitioned by distance at different levels of
the rRESPA hierarchy.  See the [run_style](run_style) command for
details.

----------

## Restrictions

This pair style is part of the EXTRA-PAIR package.  It is only enabled if
LAMMPS was built with that package.  See the
[Build package](Build_package) page for more info.

## Related commands

[pair_coeff](pair_coeff)

## Default

none
