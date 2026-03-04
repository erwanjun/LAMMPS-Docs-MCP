---
title: "fix settorque/atom command"
category: "fix"
tags: ["fix", "settorque/atom", "RIGID", "GRANULAR", "rigid-body"]
commands: ["fix settorque/atom"]
---
# fix settorque/atom command

## Syntax

```lammps
fix ID group-ID settorque/atom tx ty tz keyword value ...
```
* ID, group-ID are documented in [fix](fix) command
* settorque/atom = style name of this fix command
* tx,ty,tz = torque component values
* any of tx,ty,tz can be a variable (see below)
* zero or more keyword/value pairs may be appended to args
* keyword = *region*

```
*region* value = region-ID
  region-ID = ID of region atoms must be in to have added torque
```
## Examples

```lammps
fix freeze indenter settorque/atom 0.0 0.0 0.0
fix 2 edge settorque/atom NULL 0.0 0.0
fix 2 edge settorque/atom NULL 0.0 v_oscillate
```
## Description

*Added in version 10Dec2025*
This fix is intended to set the peratom torque of individual finite-size
atoms in the fix group to the specified values. Unlike [fix
addtorque/group](fix_addtorque_group), it does not set a collective
torque to a set of point particles.

Each component of torque on each atom in the group to the specified
values *tx*, *ty*, *tz*.  This erases all previously computed torques on
the atom, though additional fixes could add new torques.  This command
can be used to freeze the rotation of certain atoms in the simulation by
zeroing their torque, assuming their initial angular velocities are also
zero.

Freezing both rotational and translational degrees of freedom can
also be accomplished using [fix freeze](fix_freeze).

Any of the *tx*, *ty*, *tz* values can be specified as NULL which means
do not alter the torque component in that dimension.

Any of the 3 quantities defining the torque components can be specified
as an equal-style or atom-style [variable](variable), namely *tx*,
*ty*, *tz*.  If the value is a variable, it should be specified as
*v_name*, where *name* is the variable name.  In this case, the variable
will be evaluated each timestep, and its value used to determine the
torque component.

Equal-style variables can specify formulas with various mathematical
functions, and include [thermo_style](thermo_style) command
keywords for the simulation box parameters and timestep and elapsed
time.  Thus it is easy to specify a time-dependent torque field.

Atom-style variables can specify the same formulas as equal-style
variables but can also include per-atom values, such as atom
coordinates.  Thus it is easy to specify a spatially-dependent torque
field with optional time-dependence as well.

If the *region* keyword is used, the atom must also be in the
specified geometric [region](region) in order to have torque added
to it.


> **Note**
> This fix is not (currently) designed to be used with rigid fixes.
> While it will set the torque of all of the atoms in a rigid body as
> described above, there is not always an easy mapping between these
> peratom torques and the torque experienced by the body.  The exception
> may be when it is used in conjunction with
> [fix setforce](fix_setforce) to simultaneously zero forces and
> torques to freeze a rigid body.

----------

## Restart, fix_modify, output, run start/stop, minimize info

No information about this fix is written to [binary restart files](restart).

The [fix_modify](fix_modify) *respa* option is supported by
this fix. This allows to set at which level of the [r-RESPA](run_style)
integrator the fix is setting the torques to the desired values; on all
other levels, the torque is set to 0.0 for the atoms in the fix group,
so that settorque/atom values are not counted multiple times. Default is to
to override torques at the outermost level.

This fix computes a global 3-vector of torques, which can be accessed
by various [output commands](Howto_output).  This is the total
torque on the group of atoms before the torques on individual atoms are
changed by the fix.  The vector values calculated by this fix are
"extensive".

No parameter of this fix can be used with the *start/stop* keywords of
the [run](run) command.

## Restrictions

Fix *settorque/atom* is part of the GRANULAR package.  It is only
enabled if LAMMPS was built with that package.  See the [Build
package](Build_package) page for more info.

## Related commands

[fix addforce](fix_addforce), [fix addtorque/atom](fix_addtorque_atom),
[fix setforce](fix_setforce), [fix freeze](fix_freeze)

## Default

none
