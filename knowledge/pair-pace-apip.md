---
title: "pair_style pace/apip command"
category: "pair_style"
tags: ["pair_style", "pace/apip", "energy", "force", "EAM"]
commands: ["pair_style pace/apip"]
---
# pair_style pace/apip command

# pair_style pace/fast/apip command

# pair_style pace/precise/apip command

Constant precision variant: *pace*

## Syntax

```lammps
pair_style pace/apip ... keyword values ...
pair_style pace/fast/apip ... keyword values ...
pair_style pace/precise/apip ... keyword values ...
```
* one or more keyword/value pairs may be appended

```
keyword = keywords of [pair pace](pair_pace)
```
## Examples

```lammps
pair_style hybrid/overlay pace/fast/apip pace/precise/apip lambda/input/csp/apip fcc cutoff 5.0 lambda/zone/apip 12.0
pair_coeff * * pace/fast/apip Cu_fast.yace Cu
pair_coeff * * pace/precise/apip Cu_precise.yace Cu
pair_coeff * * lambda/input/csp/apip
pair_coeff * * lambda/zone/apip

pair_style hybrid/overlay eam/fs/apip pace/precise/apip lambda/input/csp/apip fcc cutoff 5.0 lambda/zone/apip 12.0
pair_coeff * * eam/fs/apip Cu.eam.fs Cu
pair_coeff * * pace/precise/apip Cu_precise.yace Cu
pair_coeff * * lambda/input/csp/apip
pair_coeff * * lambda/zone/apip
```
## Description

Pair style [pace](pair_pace) computes interactions using the Atomic
Cluster Expansion (ACE), which is a general expansion of the atomic energy in
multi-body basis functions [(Drautz19)](#Drautz2019_2).  The *pace*
pair style provides an efficient implementation that is described in
this paper [(Lysogorskiy21)](#Lysogorskiy20211_2).

The potential energy $E_i$ of an atom $i$ of an adaptive-precision
interatomic potential (APIP) according to
[(Immel25)](#Immel2025_7) is given by


$$
E_i^\text{APIP} = \lambda_i E_i^\text{(fast)} + (1-\lambda_i) E_i^\text{(precise)}\,,
$$

whereas the switching parameter $\lambda_i$ is computed
dynamically during a simulation by [fix lambda/apip](fix_lambda_apip)
or set prior to a simulation via [set](set).

The pair style *pace/precise/apip* computes the potential energy
$(1-\lambda_i) E_i^\text{(pace)}$ and the
corresponding force and should be combined
with a fast potential that computes the potential energy
$\lambda_i E_i^\text{(fast)}$ and the corresponding force
via [pair_style hybrid/overlay](pair_hybrid).

The pair style *pace/fast/apip* computes the potential energy
$\lambda_i E_i^\text{(pace)}$ and the
corresponding force and should be combined
with a precise potential that computes the potential energy
$(1-\lambda_i) E_i^\text{(precise)}$ and the corresponding force
via [pair_style hybrid/overlay](pair_hybrid).

The pair_styles *pace/fast/apip* and *pace/precise/apip*
commands may be followed by the optional keywords of
[pair_style pace](pair_pace), which are described
[here](pair_pace).

## Mixing, shift, table, tail correction, restart, rRESPA info

For atom type pairs I,J and I != J, where types I and J correspond to
two different element types, mixing is performed by LAMMPS with
user-specifiable parameters as described above.  You never need to
specify a pair_coeff command with I != J arguments for this style.

This pair styles does not support the [pair_modify](pair_modify)
shift, table, and tail options.

This pair styles does not write its information to [binary restart
files](restart), since it is stored in potential files.  Thus, you need
to re-specify the pair_style and pair_coeff commands in an input script
that reads a restart file.

This pair styles can only be used via the *pair* keyword of the
[run_style respa](run_style) command.  It does not support the
*inner*, *middle*, *outer* keywords.

----------

## Restrictions

This pair styles are part of the APIP package.  It is only enabled if
LAMMPS was built with that package.  See the [Build package](Build_package) page for more info.

## Related commands

[pair_style pace](pair_pace),
[pair_style hybrid/overlay](pair_hybrid),
[fix lambda/apip](fix_lambda_apip),
[fix lambda_thermostat/apip](fix_lambda_thermostat_apip),
[pair_style lambda/zone/apip](pair_lambda_zone_apip),
[pair_style lambda/input/apip](pair_lambda_input_apip),
[pair_style eam/apip](pair_eam_apip),
[fix atom_weight/apip](fix_atom_weight_apip)

## Default

See [pair_style pace](pair_pace).

----------


**(Drautz19)** Drautz, Phys Rev B, 99, 014104 (2019).


**(Lysogorskiy21)** Lysogorskiy, van der Oord, Bochkarev, Menon, Rinaldi, Hammerschmidt, Mrovec, Thompson, Csanyi, Ortner, Drautz, npj Comp Mat, 7, 97 (2021).


**(Immel25)** Immel, Drautz and Sutmann, J Chem Phys, 162, 114119 (2025)
