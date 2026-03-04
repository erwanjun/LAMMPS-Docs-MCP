---
title: "pair_style brownian command"
category: "pair_style"
tags: ["pair_style", "brownian", "thermostat", "temperature", "force"]
commands: ["pair_style brownian"]
---
# pair_style brownian command

Accelerator Variants: *brownian/omp*, *brownian/kk*

# pair_style brownian/poly command

Accelerator Variants: *brownian/poly/omp*

## Syntax

```lammps
pair_style style mu flaglog flagfld cutinner cutoff t_target seed flagHI flagVF
```
* style = *brownian* or *brownian/poly*
* mu = dynamic viscosity (dynamic viscosity units)
* flaglog = 0/1 log terms in the lubrication approximation on/off
* flagfld = 0/1 to include/exclude Fast Lubrication Dynamics effects
* cutinner = inner cutoff distance (distance units)
* cutoff = outer cutoff for interactions (distance units)
* t_target = target temp of the system (temperature units)
* seed = seed for the random number generator (positive integer)
* flagHI (optional) = 0/1 to include/exclude 1/r hydrodynamic interactions
* flagVF (optional) = 0/1 to include/exclude volume fraction corrections in the long-range isotropic terms

## Examples

```lammps
pair_style brownian 1.5 1 1 2.01 2.5 2.0 5878567 # (assuming radius = 1)
pair_coeff 1 1 2.05 2.8
pair_coeff * *
```
## Description

Styles *brownian* and *brownian/poly* compute Brownian forces and
torques on finite-size spherical particles.  The former requires
monodisperse spherical particles; the latter allows for polydisperse
spherical particles.

These pair styles are designed to be used with either the
[pair_style lubricate](pair_lubricate) or [pair_style
lubricateU](pair_lubricateU) commands to provide thermostatting when
dissipative lubrication forces are acting.  Thus the parameters *mu*,
*flaglog*, *flagfld*, *cutinner*, and *cutoff* should be specified
consistent with the settings in the lubrication pair styles.  For
details, refer to either of the lubrication pair styles.

The *t_target* setting is used to specify the target temperature of
the system.  The random number *seed* is used to generate random
numbers for the thermostatting procedure.

The *flagHI* and *flagVF* settings are optional.  Neither should be
used, or both must be defined.

----------

The following coefficients must be defined for each pair of atoms
types via the [pair_coeff](pair_coeff) command as in the examples
above, or in the data file or restart files read by the
[read_data](read_data) or [read_restart](read_restart)
commands, or by mixing as described below:

* cutinner (distance units)
* cutoff (distance units)

The two coefficients are optional.  If neither is specified, the two
cutoffs specified in the pair_style command are used.  Otherwise both
must be specified.

----------

----------

## Mixing, shift, table, tail correction, restart, rRESPA info

For atom type pairs I,J and I != J, the two cutoff distances for these
pair styles can be mixed.  The default mix value is *geometric*.  See
the "pair_modify" command for details.

These pair styles do not support the [pair_modify](pair_modify)
shift option for the energy of the pair interaction.

The [pair_modify](pair_modify) table option is not relevant
for these pair styles.

These pair styles do not support the [pair_modify](pair_modify)
tail option for adding long-range tail corrections to energy and
pressure.

These pair styles write their information to [binary restart files](restart), so pair_style and pair_coeff commands do not need to be
specified in an input script that reads a restart file.

These pair styles can only be used via the *pair* keyword of the
[run_style respa](run_style) command.  They do not support the
*inner*, *middle*, *outer* keywords.

----------

## Restrictions

These styles are part of the COLLOID package.  They are only enabled if
LAMMPS was built with that package.  See the [Build package](Build_package) page for more info.

Only spherical monodisperse particles are allowed for pair_style
brownian.

Only spherical particles are allowed for pair_style brownian/poly.

These pair styles are only compatible with the following wall fixes:
doc:`fix wall/lj93, fix wall/lj126, fix wall/lj1043, fix wall/colloid,
fix wall/harmonic, fix wall/lepton, fix wall/morse, fix wall/table
<fix_wall>`.


## Related commands

[pair_coeff](pair_coeff), [pair_style lubricate](pair_lubricate), [pair_style lubricateU](pair_lubricateU)

## Default

The default settings for the optional args are flagHI = 1 and flagVF =
1.
