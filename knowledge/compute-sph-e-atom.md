---
title: "compute sph/e/atom command"
category: "compute"
tags: ["compute", "sph/e/atom", "energy", "SPH"]
commands: ["compute sph/e/atom"]
---
# compute sph/e/atom command

## Syntax

```lammps
compute ID group-ID sph/e/atom
```
* ID, group-ID are documented in [compute](compute) command
* sph/e/atom = style name of this compute command

## Examples

```lammps
compute 1 all sph/e/atom
```
## Description

Define a computation that calculates the per-atom internal energy
for each atom in a group.

The internal energy is the energy associated with the internal degrees
of freedom of an SPH particle, i.e. a Smooth-Particle Hydrodynamics
particle.

See [this PDF guide](PDF/SPH_LAMMPS_userguide.pdf) to using SPH in
LAMMPS.


> **Note**
> Please note that the SPH PDF guide file has not been updated for
> many years and thus does not reflect the current *syntax* of the
> SPH package commands. For that please refer to the LAMMPS manual.

The value of the internal energy will be 0.0 for atoms not in the
specified compute group.

## Output info

This compute calculates a per-atom vector, which can be accessed by
any command that uses per-atom values from a compute as input.  See
the [Howto output](Howto_output) page for an overview of
LAMMPS output options.

The per-atom vector values will be in energy [units](units).

## Restrictions

This compute is part of the SPH package.  It is only enabled if
LAMMPS was built with that package.  See the [Build package](Build_package) page for more info.

## Related commands

[dump custom](dump)

## Default

none
