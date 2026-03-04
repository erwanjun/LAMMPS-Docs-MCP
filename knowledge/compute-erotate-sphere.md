---
title: "compute erotate/sphere command"
category: "compute"
tags: ["compute", "erotate/sphere", "energy"]
commands: ["compute erotate/sphere"]
---
# compute erotate/sphere command

Accelerator Variants: *erotate/sphere/kk*


## Syntax

```lammps
compute ID group-ID erotate/sphere
```
* ID, group-ID are documented in [compute](compute) command
* erotate/sphere = style name of this compute command

## Examples

```lammps
compute 1 all erotate/sphere
```
## Description

Define a computation that calculates the rotational kinetic energy of
a group of spherical particles.

The rotational energy is computed as $\frac12 I \omega^2$,
where $I$ is the moment of inertia for a sphere and $\omega$
is the particle's angular velocity.


> **Note**
> For [2d models](dimension), particles are treated as
> spheres, not disks, meaning their moment of inertia will be the same
> as in 3d.

----------

----------

## Output info

This compute calculates a global scalar (the KE).  This value can be
used by any command that uses a global scalar value from a compute as
input.  See the [Howto output](Howto_output) page for an
overview of LAMMPS output options.

The scalar value calculated by this compute is "extensive".  The
scalar value will be in energy [units](units).

## Restrictions

This compute requires that atoms store a radius and angular velocity
(omega) as defined by the [atom_style sphere](atom_style) command.

All particles in the group must be finite-size spheres or point
particles.  They cannot be aspherical.  Point particles will not
contribute to the rotational energy.

## Related commands

[compute erotate/asphere](compute_erotate_asphere)

## Default

none
