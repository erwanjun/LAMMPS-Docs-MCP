---
title: "pair_style lambda/input/apip command"
category: "pair_style"
tags: ["pair_style", "lambda/input/apip", "EAM"]
commands: ["pair_style lambda/input/apip"]
---
# pair_style lambda/input/apip command

## Syntax

```lammps
pair_style lambda/input/apip cutoff
```
* lambda/input/apip = style name of this pair style
* cutoff = global cutoff (distance units)

# pair_style lambda/input/csp/apip command

## Syntax

```lammps
pair_style lambda/input/csp/apip lattice keyword args
```
* lambda/input/csp/apip = style name of this pair style
* lattice = *fcc* or *bcc* or integer

```
*fcc* = use 12 nearest neighbors to calculate the CSP like in a perfect fcc lattice
*bcc* = use 8 nearest neighbors to calculate the CSP like in a perfect bcc lattice
integer = use N nearest neighbors to calculate the CSP
```
* zero or more keyword/args pairs may be appended
* keyword = *cutoff* or *N_buffer*

```
*cutoff* args = cutoff
  cutoff = distance in which neighboring atoms are considered (> 0)
*N_buffer* args = N_buffer
  N_buffer = number of additional neighbors, which are included in the j-j+N/2 calculation
```
## Examples

```lammps
pair_style lambda/input/csp/apip fcc
pair_style lambda/input/csp/apip fcc cutoff 5.0
pair_style lambda/input/csp/apip bcc cutoff 5.0 N_buffer 2
pair_style lambda/input/csp/apip 14
```
## Description

This pair_styles calculates $\lambda_i^\text{input}(t)$, which
is required for [fix lambda/apip](fix_lambda_apip).

The pair_style lambda_input sets $\lambda_i^\text{input}(t) = 0$.

The pair_style lambda_input/csp calculates
$\lambda_i^\text{input}(t) = \text{CSP}_i(t)$.
The centro-symmetry parameter (CSP) [(Kelchner)](#Kelchner_2) is described
in [compute centro/atom](compute_centro_atom).

The lattice argument is described in
[compute centro/atom](compute_centro_atom) and determines
the number of neighboring atoms that are used to compute the CSP.
The *N_buffer* argument allows to include more neighboring atoms in
the calculation of the contributions from the pair j,j+N/2 to the CSP as
discussed in [(Immel)](#Immel2025_6).

The computation of $\lambda_i^\text{input}(t)$ is done by this
pair_style instead of by [fix lambda/apip](fix_lambda_apip), as this computation
takes time and this pair_style can be included in the load-balancing via
[fix atom_weight/apip](fix_atom_weight_apip).

A code example for the calculation of the switching parameter for an adaptive-
precision potential is given in the following:
The adaptive-precision potential is created
by combining [pair_style eam/fs/apip](pair_eam_apip)
and [pair_style pace/precise/apip](pair_pace_apip).
The input, from which the switching parameter is calculated, is provided
by this pair_style.
The switching parameter is calculated by [fix lambda/apip](fix_lambda_apip),
whereas the spatial
transition zone of the switching parameter is calculated by
[pair_style lambda/zone/apip](pair_lambda_zone_apip).

```lammps
pair_style hybrid/overlay eam/fs/apip pace/precise/apip lambda/input/csp/apip fcc cutoff 5.0 lambda/zone/apip 12.0
pair_coeff * * eam/fs/apip Cu.eam.fs Cu
pair_coeff * * pace/precise/apip Cu_precise.yace Cu
pair_coeff * * lambda/input/csp/apip
pair_coeff * * lambda/zone/apip
fix 2 all lambda/apip 3.0 3.5 time_averaged_zone 4.0 12.0 110 110 min_delta_lambda 0.01
```
----------

## Mixing, shift, table, tail correction, restart, rRESPA info

The cutoff distance for this pair style can be mixed.  The default mix
value is *geometric*.  See the "pair_modify" command for details.

This pair style does not support the [pair_modify](pair_modify)
shift, table, and tail options.

This pair style writes no information to [binary restart files](restart), so pair_style and pair_coeff commands need
to be specified in an input script that reads a restart file.

This pair style does not support the use of the *inner*, *middle*,
and *outer* keywords of the [run_style respa](run_style) command.

----------

## Restrictions
This fix is part of the APIP package. It is only enabled if
LAMMPS was built with that package. See the [Build package](Build_package) page for more info.

## Related commands

[compute centro/atom](compute_centro_atom),
[fix lambda/apip](fix_lambda_apip),
[fix lambda_thermostat/apip](fix_lambda_thermostat_apip),
[pair_style lambda/zone/apip](pair_lambda_zone_apip),
[pair_style eam/apip](pair_eam_apip),
[pair_style pace/apip](pair_pace_apip),
[fix atom_weight/apip](fix_atom_weight_apip)

## Default

N_buffer=0, cutoff=5.0

----------


**(Kelchner)** Kelchner, Plimpton, Hamilton, Phys Rev B, 58, 11085 (1998).


**(Immel)** Immel, Drautz and Sutmann, J Chem Phys, 162, 114119 (2025)
