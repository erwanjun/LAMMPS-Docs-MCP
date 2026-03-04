---
title: "fix enforce2d command"
category: "fix"
tags: ["fix", "enforce2d", "energy", "force"]
commands: ["fix enforce2d"]
---
# fix enforce2d command

Accelerator Variants: *enforce2d/kk*

## Syntax

```lammps
fix ID group-ID enforce2d
```
* ID, group-ID are documented in [fix](fix) command
* enforce2d = style name of this fix command

## Examples

```lammps
fix 5 all enforce2d
```
## Description

Zero out the z-dimension velocity and force on each atom in the group.
This is useful when running a 2d simulation to ensure that atoms do
not move from their initial z coordinate.

----------

.. include:: accel_styles.rst

----------

## Restart, fix_modify, output, run start/stop, minimize info

No information about this fix is written to [binary restart files](restart).  None of the [fix_modify](fix_modify) options
are relevant to this fix.  No global or per-atom quantities are stored
by this fix for access by various [output commands](Howto_output).
No parameter of this fix can be used with the *start/stop* keywords of
the [run](run) command.

The forces due to this fix are imposed during an energy minimization,
invoked by the [minimize](minimize) command.

## Restrictions
none

## Related commands

none


## Default

none
