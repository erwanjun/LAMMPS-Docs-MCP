---
title: "uncompute command"
category: "command"
tags: ["uncompute"]
commands: ["uncompute"]
---
# uncompute command

## Syntax

```lammps
uncompute compute-ID
```
* compute-ID = ID of a previously defined compute

## Examples

```lammps
uncompute 2
uncompute lower-boundary
```
## Description

Delete a compute that was previously defined with a [compute](compute)
command.  This also wipes out any additional changes made to the compute
via the [compute_modify](compute_modify) command.

## Restrictions
none

## Related commands

[compute](compute)

## Default

none
