---
title: "fix nve/asphere command"
category: "fix"
tags: ["fix", "nve/asphere", "GPU", "INTEL", "energy"]
commands: ["fix nve/asphere"]
---
# fix nve/asphere command

Accelerator Variants: *nve/asphere/gpu*, *nve/asphere/intel*, *nve/asphere/kk*

## Syntax

```lammps
fix ID group-ID nve/asphere
```
* ID, group-ID are documented in [fix](fix) command
* nve/asphere = style name of this fix command

## Examples

```lammps
fix 1 all nve/asphere
```
## Description

Perform constant NVE integration to update position, velocity,
orientation, and angular velocity for aspherical particles in the
group each timestep.  V is volume; E is energy.  This creates a system
trajectory consistent with the microcanonical ensemble.

This fix differs from the [fix nve](fix_nve) command, which
assumes point particles and only updates their position and velocity.

## Restart, fix_modify, output, run start/stop, minimize info

No information about this fix is written to [binary restart files](restart).  None of the [fix_modify](fix_modify) options
are relevant to this fix.  No global or per-atom quantities are stored
by this fix for access by various [output commands](Howto_output).
No parameter of this fix can be used with the *start/stop* keywords of
the [run](run) command.  This fix is not invoked during [energy minimization](minimize).

----------

----------

## Restrictions

This fix is part of the ASPHERE package.  It is only enabled if LAMMPS
was built with that package.  See the [Build package](Build_package) page for more info.

This fix requires that atoms store torque and angular momentum and a
quaternion as defined by the [atom_style ellipsoid](atom_style)
command.

All particles in the group must be finite-size.  They cannot be point
particles, but they can be aspherical or spherical as defined by their
shape attribute.

## Related commands

[fix nve](fix_nve), [fix nve/sphere](fix_nve_sphere)

## Default

none
