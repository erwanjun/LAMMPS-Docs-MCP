---
title: "pair_style eam/apip command"
category: "pair_style"
tags: ["pair_style", "eam/apip", "energy", "force", "EAM"]
commands: ["pair_style eam/apip"]
---
# pair_style eam/apip command

Constant precision variant: *eam*

# pair_style eam/fs/apip command

Constant precision variant: *eam/fs*

## Syntax

```lammps
pair_style eam/apip
pair_style eam/fs/apip
```
## Examples

```lammps
pair_style hybrid/overlay eam/fs/apip pace/precise/apip lambda/input/csp/apip fcc cutoff 5.0 lambda/zone/apip 12.0
pair_coeff * * eam/fs/apip Cu.eam.fs Cu
pair_coeff * * pace/precise/apip Cu_precise.yace Cu
pair_coeff * * lambda/input/csp/apip
pair_coeff * * lambda/zone/apip
```
## Description
Style *eam* computes pairwise interactions for metals and metal alloys
using embedded-atom method (EAM) potentials [(Daw)](#Daw2).  The total
energy $E_i$ of an atom $i$ is given by


$$
E_i^\text{EAM} = F_\alpha \left(\sum_{j \neq i}\rho_\beta (r_{ij})\right) +
      \frac{1}{2} \sum_{j \neq i} \phi_{\alpha\beta} (r_{ij})
$$

where $F$ is the embedding energy which is a function of the atomic
electron density $\rho$, $\phi$ is a pair potential interaction,
and $\alpha$ and $\beta$ are the element types of atoms
$i$ and $j$.  The multi-body nature of the EAM potential is a
result of the embedding energy term. Both summations in the formula are over
all neighbors $j$ of atom $i$ within the cutoff distance.
EAM is documented in detail in [pair_style eam](pair_eam).

The potential energy $E_i$ of an atom $i$ of an adaptive-precision
interatomic potential (APIP) according to [(Immel)](#Immel2025_5) is given by


$$
E_i^\text{APIP} = \lambda_i E_i^\text{(fast)} + (1-\lambda_i) E_i^\text{(precise)}\,,
$$

whereas the switching parameter $\lambda_i$ is computed
dynamically during a simulation by [fix lambda/apip](fix_lambda_apip)
or set prior to a simulation via [set](set).

The pair style *eam/fs/apip* computes the potential energy
$\lambda_i E_i^\text{EAM}$ and the
corresponding force and should be combined
with a precise potential like
[pair_style pace/precise/apip](pair_pace_apip) that computes the
potential energy $(1-\lambda_i) E_i^\text{(precise)}$ and the
corresponding force via [pair_style hybrid/overlay](pair_hybrid).

## Mixing, shift, table, tail correction, restart, rRESPA info

For atom type pairs I,J and I != J, where types I and J correspond to
two different element types, mixing is performed by LAMMPS as
described above with the individual styles.  You never need to specify
a pair_coeff command with I != J arguments for the eam/apip styles.

This pair style does not support the [pair_modify](pair_modify)
shift, table, and tail options.

The eam/apip pair styles do not write their information to [binary
restart files](restart), since it is stored in tabulated potential
files.  Thus, you need to re-specify the pair_style and pair_coeff
commands in an input script that reads a restart file.

The eam/apip pair styles can only be used via the *pair* keyword of the
[run_style respa](run_style) command.  They do not support the
*inner*, *middle*, *outer* keywords.

----------

## Restrictions

This pair styles are part of the APIP package.  It is only enabled if
LAMMPS was built with that package.  See the [Build package](Build_package) page for more info.

## Related commands

[pair_style eam](pair_eam),
[pair_style hybrid/overlay](pair_hybrid),
[fix lambda/apip](fix_lambda_apip),
[fix lambda_thermostat/apip](fix_lambda_thermostat_apip),
[pair_style lambda/zone/apip](pair_lambda_zone_apip),
[pair_style lambda/input/apip](pair_lambda_input_apip),
[pair_style pace/apip](pair_pace_apip),
[fix atom_weight/apip](fix_atom_weight_apip)

## Default

none

----------


**(Immel)** Immel, Drautz and Sutmann, J Chem Phys, 162, 114119 (2025)


**(Daw)** Daw, Baskes, Phys Rev Lett, 50, 1285 (1983).
Daw, Baskes, Phys Rev B, 29, 6443 (1984).
