---
title: "compute temp/deform/eff command"
category: "compute"
tags: ["compute", "temp/deform/eff", "thermostat", "temperature", "energy", "force"]
commands: ["compute temp/deform/eff"]
---
# compute temp/deform/eff command

## Syntax

```lammps
compute ID group-ID temp/deform/eff keyword value ...
```
* ID, group-ID are documented in [compute](compute) command
* temp/deform/eff = style name of this compute command
* zero or more keyword/value pairs may be appended
* keyword = *temp*

```
*temp* value = compute ID that calculates a temperature
```
## Examples

```lammps
compute myTemp all temp/deform/eff
```
## Description

Define a computation that calculates the temperature of a group of
nuclei and electrons in the [electron force field](pair_eff)
model, after subtracting out a streaming velocity induced by the
simulation box changing size and/or shape, for example in a
non-equilibrium MD (NEMD) simulation.  The size/shape change is
induced by use of the [fix deform](fix_deform) command.  A
compute of this style is created by the [fix nvt/sllod/eff](fix_nvt_sllod_eff) command to compute the thermal temperature of
atoms for thermostatting purposes.  A compute of this style can also
be used by any command that computes a temperature (e.g.,
[thermo_modify](thermo_modify), [fix npt/eff](fix_nh_eff)).

The calculation performed by this compute is exactly like that
described by the [compute temp/deform](compute_temp_deform)
command, except that the formulas for the temperature (scalar) and
diagonal components of the symmetric tensor (vector) include the
radial electron velocity contributions, as discussed by the
[compute temp/eff](compute_temp_eff) command.  Note that only
the translational degrees of freedom for each nuclei or electron are
affected by the streaming velocity adjustment.  The radial velocity
component of the electrons is not affected.

*Changed in version 11Feb2026*
By default, the internal temperature compute has the style
[compute temp/eff](compute_temp_eff).  If an internal
temperature compute is used which does not have the /eff suffix,
the contribution to the scalar and vector values due to the
radial electron velocity will be added in by this compute.

## Output info

This compute calculates a global scalar (the temperature) and a global
vector of length 6 (symmetric tensor), which can be accessed by
indices 1--6.  These values can be used by any command that uses
global scalar or vector values from a compute as input.  See the
[Howto output](Howto_output) page for an overview of LAMMPS
output options.

The scalar value calculated by this compute is "intensive".  The
vector values are "extensive".

The scalar value is in temperature [units](units).  The vector
values are in energy [units](units).

## Restrictions

This compute is part of the EFF package.  It is only enabled if
LAMMPS was built with that package.  See the
[Build package](Build_package) page for more info.

## Related commands

[compute temp/ramp](compute_temp_ramp), [fix deform](fix_deform),
[fix nvt/sllod/eff](fix_nvt_sllod_eff)

## Default

none
