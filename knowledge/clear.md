---
title: "clear command"
category: "command"
tags: ["clear"]
commands: ["clear"]
---
# clear command

## Syntax

```lammps
clear
```
## Examples

```lammps
# (commands for 1st simulation)
clear
# (commands for 2nd simulation)
```
## Description

This command deletes all atoms, restores all settings to their default
values, and frees all memory allocated by LAMMPS.  Once a clear command
has been executed, it is almost as if LAMMPS is completely reset, with
some exceptions noted below.  The command thus allows to run multiple
jobs sequentially from a single input script, often with a loop.

The following settings are not affected by a clear command:

  - working directory ([shell](shell) command)
  - log file status ([log](log) command)
  - echo status ([echo](echo) command)
  - input script variables except for *atomfile* style variables ([variable](variable) command).

## Restrictions

none

## Related commands

[label](label), [jump](jump), [next](next)

## Default

none
