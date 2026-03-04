---
title: "pair_style beck command"
category: "pair_style"
tags: ["pair_style", "beck", "GPU", "energy"]
commands: ["pair_style beck"]
---
# pair_style beck command

Accelerator Variants: *beck/gpu*, *beck/omp*

## Syntax

```lammps
pair_style beck Rc
```
* Rc = cutoff for interactions (distance units)

## Examples

```lammps
pair_style beck 8.0
pair_coeff * * 399.671876712 0.0000867636112694 0.675 4.390 0.0003746
pair_coeff 1 1 399.671876712 0.0000867636112694 0.675 4.390 0.0003746 6.0
```
## Description

Style *beck* computes interactions based on the potential by
[(Beck)](#Beck), originally designed for simulation of Helium.  It
includes truncation at a cutoff distance $r_c$.


$$
E(r) &= A \exp\left[-\alpha r - \beta r^6\right] - \frac{B}{\left(r^2+a^2\right)^3} \left(1+\frac{2.709+3a^2}{r^2+a^2}\right) \qquad r < r_c \\
$$

The following coefficients must be defined for each pair of atoms
types via the [pair_coeff](pair_coeff) command as in the examples
above, or in the data file or restart files read by the
[read_data](read_data) or [read_restart](read_restart)
commands.

* $A$ (energy units)
* $B$ (energy-distance\^6 units)
* $a$ (distance units)
* $\alpha$ (1/distance units)
* $\beta$  (1/distance\^6 units)
* cutoff (distance units)

The last coefficient is optional.  If not specified, the global cutoff
$r_c$ is used.

----------

----------

## Mixing, shift, table, tail correction, restart, rRESPA info

For atom type pairs I,J and I != J, coefficients must be specified.
No default mixing rules are used.

This pair style does not support the [pair_modify](pair_modify) shift
option for the energy of the pair interaction.

The [pair_modify](pair_modify) table option is not relevant
for this pair style.

This pair style does not support the [pair_modify](pair_modify)
tail option for adding long-range tail corrections.

This pair style writes its information to [binary restart files](restart), so pair_style and pair_coeff commands do not need
to be specified in an input script that reads a restart file.

This pair style can only be used via the *pair* keyword of the
[run_style respa](run_style) command.  It does not support the
*inner*, *middle*, *outer* keywords.

----------

## Restrictions

This pair style is part of the EXTRA-PAIR package.  It is only enabled if
LAMMPS was built with that package.  See the
[Build package](Build_package) page for more info.

## Related commands

[pair_coeff](pair_coeff)

## Default

none

----------


**(Beck)** Beck, Molecular Physics, 14, 311 (1968).
