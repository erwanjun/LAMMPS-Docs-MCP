---
title: "pair_style rheo/solid command"
category: "pair_style"
tags: ["pair_style", "rheo/solid", "force"]
commands: ["pair_style rheo/solid"]
---
# pair_style rheo/solid command

## Syntax

```lammps
pair_style rheo/solid
```
## Examples

```lammps
pair_style rheo/solid
pair_coeff * * 1.0 1.5 1.0
```
## Description

*Added in version 29Aug2024*
Style *rheo/solid* is effectively a copy of pair style
[bpm/spring](pair_bpm_spring) except it only applies forces
between solid RHEO particles, determined by checking the status of
each pair of neighboring particles before calculating forces.

The style computes pairwise forces with the formula


$$
F = k (r - r_c)
$$

where $k$ is a stiffness and $r_c$ is the cutoff length.
An additional damping force is also applied to interacting
particles. The force is proportional to the difference in the
normal velocity of particles


$$
F_D = - \gamma w (\hat{r} \bullet \vec{v})
$$

where $\gamma$ is the damping strength, $\hat{r}$ is the
displacement normal vector, $\vec{v}$ is the velocity difference
between the two particles, and $w$ is a smoothing factor.
This smoothing factor is constructed such that damping forces go to zero
as particles come out of contact to avoid discontinuities. It is
given by


$$
w = 1.0 - \left( \frac{r}{r_c} \right)^8 .
$$

The following coefficients must be defined for each pair of atom types
via the [pair_coeff](pair_coeff) command as in the examples
above, or in the data file or restart files read by the
[read_data](read_data) or [read_restart](read_restart)
commands, or by mixing as described below:

* $k$             (force/distance units)
* $r_c$           (distance units)
* $\gamma$        (force/velocity units)


----------

## Mixing, shift, table, tail correction, restart, rRESPA info

For atom type pairs I,J and I != J, the A coefficient and cutoff
distance for this pair style can be mixed.  A is always mixed via a
*geometric* rule.  The cutoff is mixed according to the pair_modify
mix value.  The default mix value is *geometric*.  See the
"pair_modify" command for details.

This pair style does not support the [pair_modify](pair_modify)
shift option, since the pair interaction goes to 0.0 at the cutoff.

The [pair_modify](pair_modify) table and tail options are not
relevant for this pair style.

This pair style writes its information to [binary restart files](restart), so pair_style and pair_coeff commands do not need to be
specified in an input script that reads a restart file.

This pair style can only be used via the *pair* keyword of the
[run_style respa](run_style) command.  It does not support the
*inner*, *middle*, *outer* keywords.

----------

## Restrictions

This pair style is part of the RHEO package.  It is only enabled if
LAMMPS was built with that package.  See the [Build package](Build_package) page for more info.

## Related commands

[fix rheo](fix_rheo),
[fix rheo/thermal](fix_rheo_thermal),
[pair bpm/spring](pair_bpm_spring)

## Default

none
