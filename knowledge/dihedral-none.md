---
title: "dihedral_style none command"
category: "dihedral_style"
tags: ["dihedral_style", "none", "force"]
commands: ["dihedral_style none"]
---
# dihedral_style none command

## Syntax

```lammps
dihedral_style none
```
## Examples

```lammps
dihedral_style none
```
## Description

Using a dihedral style of none means dihedral forces and energies are
not computed, even if quadruplets of dihedral atoms were listed in the
data file read by the [read_data](read_data) command.

See the [dihedral_style zero](dihedral_zero) command for a way to
calculate dihedral statistics, but compute no dihedral interactions.

## Restrictions
none

## Related commands

[dihedral_style zero](dihedral_zero)

## Default

none
