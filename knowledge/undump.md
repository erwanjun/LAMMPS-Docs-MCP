---
title: "undump command"
category: "command"
tags: ["undump"]
commands: ["undump"]
---
# undump command

## Syntax

```lammps
undump dump-ID
```
* dump-ID = ID of previously defined dump

## Examples

```lammps
undump mine
undump 2
```
## Description

Turn off a previously defined dump so that it is no longer active.
This closes the file associated with the dump.

## Restrictions
none

## Related commands

[dump](dump)

## Default

none
