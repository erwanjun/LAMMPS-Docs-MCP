---
title: "unfix command"
category: "command"
tags: ["unfix"]
commands: ["unfix"]
---
# unfix command

## Syntax

```lammps
unfix fix-ID
```
* fix-ID = ID of a previously defined fix

## Examples

```lammps
unfix 2
unfix lower-boundary
```
## Description

Delete a fix that was previously defined with a [fix](fix)
command.  This also wipes out any additional changes made to the fix
via the [fix_modify](fix_modify) command.

## Restrictions
none

## Related commands

[fix](fix)

## Default

none
