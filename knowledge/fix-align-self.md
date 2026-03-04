---
title: "fix align/self command"
category: "fix"
tags: ["fix", "align/self", "RIGID", "force", "rigid-body"]
commands: ["fix align/self"]
---
# fix align/self command

## Syntax

```lammps
fix ID group-ID align/self mode magnitude keyword values
```
* ID, group-ID are documented in [fix](fix) command
* align/self = style name of this fix command
* mode = *dipole* or *quat*
* magnitude = magnitude of self-alignment torque
* zero or one keyword/value pairs may be appended
* keyword = *qvector*

```
*qvector* value = direction of self-propulsion force in ellipsoid frame
 *sx*, *sy*, *sz* = components of *qvector*
```
## Examples

```lammps
fix active all align/self dipole 40.0
fix active all align/self quat 15.7 qvector 1.0 0.0 0.0
```
## Description

*Added in version 10Dec2025*
Add a torque to each atom in the group which accounts for the
reorientation of each particle toward its own velocity, a generic
phenomenon called self-alignment (see [(Baconnier2025)](#Baconnier2025)). The torque is given by :


$$
\mathbf{\tau}_i = \zeta(\mathbf{e}_i \times \mathbf{v}_i)
$$

where *i* is the particle the torque is being applied to, $\zeta$
is the magnitude of the torque, $\mathbf{e}_i$ is the orientation
of the particle, and $\mathbf{v}_i$ is its velocity. The
self-alignment term, introduced in [(Shimoyama1996)](#Shimoyama1996) with the study of collective motion in systems of
self-propelled particles, is an effective torque arising from
differential drag in asymmetric rigid bodies.


For mode *dipole*, $e_i$ is just equal to the dipole vectors of
the atoms in the group. Therefore, if the dipoles are not unit vectors,
the $e_i$ will not be unit vectors.


> **Note**
> If another command changes the magnitude of the dipole, the applied
> torque will change accordingly and no warning will be provided by
> LAMMPS. This is almost never what you want, so ensure you are not
> changing dipole magnitudes with another LAMMPS fix or pair style.
> Furthermore, self-propulsion forces (almost) always set $e_i$
> to be a unit vector for all times, so it's best to set all the dipole
> magnitudes to 1.0 unless you have a good reason not to (see the
> [set](set) command on how to do this).

For mode *quat*, $e_i$ points in the direction of a unit vector,
oriented in the coordinate frame of the ellipsoidal particles, which
defaults to point along the x-direction. This default behavior can be
changed by via the *qvector* keyword.

The optional *qvector* keyword specifies the direction of
self-propulsion via a unit vector (sx,sy,sz). The arguments *sx*, *sy*,
and *sz*, are defined within the coordinate frame of the atom's
ellipsoid. For instance, for an ellipsoid with long axis along its
x-direction, if one wanted the self-propulsion force to also be along
this axis, set *sx* equal to 1 and *sy*, *sz* both equal to zero. This
keyword may only be specified for mode *quat*.


> **Note**
> In using keyword *qvector*, the three arguments *sx*, *sy*, and *sz*
> will be automatically normalized to components of a unit vector
> internally to avoid users having to explicitly do so
> themselves. Therefore, in mode *quat*, the vectors $e_i$ will
> always be of unit length.

----------

## Restart, fix_modify, output, run start/stop, minimize info

No information about this fix is written to [binary restart files](restart).  No global or per-atom quantities are stored by this fix for
access by various [output commands](Howto_output).

No parameter of this fix can be used with the *start/stop* keywords of
the [run](run) command.  This fix is not invoked during
[energy minimization](minimize).


## Restrictions

This fix is part of the BROWNIAN package.  It is only enabled if LAMMPS
was built with that package.  See the [Build package](Build_package) doc page for more info.

The keyword *dipole* requires that atoms store torque as defined by the
[atom_style sphere](atom_style) command, as well as a dipole
moment as defined by the [atom_style dipole](atom_style) command
which is part of the DIPOLE package.  The keyword *quat* requires that
atoms store torque and quaternions as defined by the [atom_style
ellipsoid](atom_style) command.

## Related commands

[fix propel/self](fix_propel_self),
[fix brownian](fix_brownian),
[fix addtorque/group](fix_addtorque_group)

## Default

none

----------


**(Baconnier2025)** P. Baconnier, O. Dauchot, V. Demery, G. Duering, S. Henkes, C. Huepe, and A. Shee, Self-aligning polar active matter, Rev. Mod. Phys. 97, 015007 (2025).


**(Shimoyama1996)** N. Shimoyama, K. Sugawara, T. Mizuguchi, Y. Hayakawa, and M. Sano, Collective Motion in a System of Motile Elements, Phys. Rev. Lett. 76, 3870 (1996).
