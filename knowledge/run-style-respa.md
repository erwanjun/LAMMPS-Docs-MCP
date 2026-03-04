---
title: "Run Style rRESPA and Set Command"
description: "Multi-timescale integration (rRESPA) and set command for particle properties"
category: "command"
tags: ["run_style", "respa", "multi-timescale", "set"]
commands: ["run_style respa", "set"]
---
The inner and middle keywords take additional arguments for cutoffs that are used by the pairwise force computations. If the 2 cutoffs for inner are 5.0 and 6.0, this means that all pairs up to 6.0 apart are computed by the inner force. Those between 5.0 and 6.0 have their force go ramped to 0.0 so the overlap with the next regime (middle or outer) is smooth. The next regime (middle or outer) will compute forces for all pairs from 5.0 outward, with those from 5.0 to 6.0 having their value ramped in an inverse manner.  

Note that you can use inner and outer without using middle to split the pairwise computations into two portions instead of three. Unless you are using a very long pairwise cutoff, a 2-way split is often faster than a 3-way split, since it avoids too much duplicate computation of pairwise interactions near the intermediate cutoffs.  

Also note that only a few pair potentials support the use of the inner and middle and outer keywords. If not, only the pair keyword can be used with that pair style, meaning all pairwise forces are computed at the same rRESPA level. See the doc pages for individual pair styles for details.  

Another option for using pair potentials with rRESPA is with the hybrid keyword, which requires the use of the pair_style hybrid or hybrid/overlay command. In this scenario, different sub-styles of the hybrid pair style are evaluated at different rRESPA levels. This can be useful, for example, to set different timesteps for hybrid coarse-grained/all-atom models. The hybrid keyword requires as many level assignments as there are hybrid sub-styles, which assigns each sub-style to a rRESPA level, following their order of definition in the pair_style command. Since the hybrid keyword operates on pair style computations, it is mutually exclusive with either the pair or the inner/middle/outer keywords.  

When using rRESPA (or for any MD simulation) care must be taken to choose a timestep size(s) that ensures the Hamiltonian for the chosen ensemble is conserved. For the constant NVE ensemble, total energy must be conserved. Unfortunately, it is difficult to know a priori how well energy will be conserved, and a fairly long test simulation $\mathord{\left(\sim\right.}10$ ps) is usually necessary in order to verify that no long-term drift in energy occurs with the trial set of parameters.  

With that caveat, a few rules-of-thumb may be useful in selecting respa settings. The following applies mostly to biomolecular simulations using the CHARMM or a similar all-atom force field, but the concepts are adaptable to other problems. Without SHAKE, bonds involving hydrogen atoms exhibit high-frequency vibrations and require a timestep on the order of 0.5 fs in order to conserve energy. The relatively inexpensive force computations for the bonds, angles, impropers, and dihedrals can be computed on this innermost 0.5 fs step. The outermost timestep cannot be greater than 4.0 fs without risking energy drift. Smooth switching of forces between the levels of the rRESPA hierarchy is also necessary to avoid drift, and a 1-2 Angstrom “healing distance” (the distance between the outer and inner cutoffs) works reasonably well. We thus recommend the following settings for use of the respa style without SHAKE in biomolecular simulations:  

<html><body><table><tr><td>timestep 4.0</td></tr><tr><td>r'un style respa 4 2 2 2 inner 2 4.5 6.0 middle 3 8.0 10.0 outer 4</td></tr></table></body></html>  

With these settings, users can expect good energy conservation and roughly a 2.5 fold speedup over the verlet style with a 0.5 fs timestep.  

If SHAKE is used with the respa style, time reversibility is lost, but substantially longer time steps can be achieved. For biomolecular simulations using the CHARMM or similar all-atom force field, bonds involving hydrogen atoms exhibit high frequency vibrations and require a time step on the order of 0.5 fs in order to conserve energy. These high frequency modes also limit the outer time step sizes since the modes are coupled. It is therefore desirable to use SHAKE with respa in order to freeze out these high frequency motions and increase the size of the time steps in the respa hierarchy. The following settings can be used for biomolecular simulations with SHAKE and rRESPA:  

<html><body><table><tr><td>fix</td><td>2 all shake 0.000001 500 0 m 1.0 a 1</td></tr><tr><td>timestep</td><td>4.0</td></tr><tr><td>run style</td><td>respa 2 2 inner 1 4.0 5.0 outer 2</td></tr></table></body></html>  

With these settings, users can expect good energy conservation and roughly a 1.5 fold speedup over the verlet style with SHAKE and a 2.0 fs timestep.  

For non-biomolecular simulations, the respa style can be advantageous if there is a clear separation of time scales - fast and slow modes in the simulation. For example, a system of slowly-moving charged polymer chains could be setup as  

follows:  

<html><body><table><tr><td>timestep 4.0</td></tr><tr><td>run style respa 2 8</td></tr></table></body></html>  

This is two-level rRESPA with an $8\mathbf{x}$ difference between the short and long timesteps. The bonds, angles, dihedrals will be computed every 0.5 fs (assuming real units), while the pair and kspace interactions will be computed once every 4 fs. These are the default settings for each kind of interaction, so no additional keywords are necessary.  

Even a LJ system can benefit from rRESPA if the interactions are divided by the inner, middle and outer keywords. A 2-fold or more speedup can be obtained while maintaining good energy conservation. In real units, for a pure LJ fluid at liquid density, with a sigma of 3.0 Angstroms, and epsilon of 0.1 kcal/mol, the following settings seem to work well:  

timestep 36.0   
run_style respa 3 3 4 inner 1 3.0 4.0 middle 2 6.0 7.0 outer 3  

The respa/omp style is a variant of respa adapted for use with pair, bond, angle, dihedral, improper, or kspace styles with an omp suffix. It is functionally equivalent to respa but performs additional operations required for managing omp styles. For more on omp styles see the Speed omp doc page. Accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

You can specify respa/omp explicitly in your input script, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 1.95.4 Restrictions  

The verlet/split style can only be used if LAMMPS was built with the REPLICA package. Correspondingly the respa/omp style is available only if the OPENMP package was included. See the Build package page for more info.  

Run style verlet/split is not compatible with kspace styles from the INTEL package and it is not compatible with any tip4p, dipole, or spin kspace styles.  

Whenever using rRESPA, the user should experiment with trade-offs in speed and accuracy for their system, and verify that they are conserving energy to adequate precision.  

# 1.95.5 Related commands  

timestep, run  

# 1.95.6 Default  

# LAMMPS Documentation, Release 4Feb2025  

• kspace forces $=$ same level as pair forces • inner, middle, outer forces $=$ no default  

(Tuckerman) Tuckerman, Berne and Martyna, J Chem Phys, 97, p 1990 (1992).  

# 1.96 set command  

# 1.96.1 Syntax  

• style $=$ atom or type or mol or group or region • $\mathrm{ID}=$ depends on style  

for style $=$ atom, $\mathrm{ID}=\mathrm{a}$ range of atom IDs   
for $\mathrm{style}=\mathrm{type}$ , $\mathrm{ID}=\mathrm{a}$ range of numeric types or a single type label   
for $\mathrm{{3tyle}=m o l}$ , $\mathrm{ID}=\mathrm{a}$ range of molecule IDs   
for style $=$ group, $\mathrm{ID}=\mathrm{a}$ group ID   
for style $=$ region, $\mathrm{ID}=\mathrm{a}$ region ID  

• one or more keyword/value pairs may be appended  

• keyword $=t y p e$ or type/fraction or type/ratio or type/subset or mol or $x$ or $y$ or $z$ or $\nu x$ or vy or vz or charge or dipole or dipole/random or quat or spin/atom or spin/atom/random or spin/electron or radius/electron or quat or quat/random or diameter or shape or length or tri or theta or theta/random or angmom or omega or mass or density or density/disc or temperature or volume or image or bond or angle or dihedral or improper or sph/e or sph/cv or sph/rho or smd/contact/radius or smd/mass/density or dpd/theta or edpd/temp or edpd/cv or $c c$ or epsilon or i_name or d_name or i2_name or d2_name  

type value $=$ numeric atom type or type label value can be an atom-style variable (see below)   
type/fraction values $=$ type fraction seed type = numeric atom type or type label fraction = approximate fraction of selected atoms to set to new atom type seed = random # seed (positive integer)   
type/ratio values = type fraction seed type = numeric atom type or type label fraction = exact fraction of selected atoms to set to new atom type seed = random $\#$ seed (positive integer)   
type/subset values = type Nsubset seed type = numeric atom type or type label Nsubset = exact number of selected atoms to set to new atom type seed = random # seed (positive integer)   
mol value = molecule ID   
value can be an atom-style variable (see below)   
x,y,z value = atom coordinate (distance units) value can be an atom-style variable (see below)   
vx,vy,vz value $-$ atom velocity (velocity units) value can be an atom-style variable (see below)   
charge value = atomic charge (charge units) value can be an atom-style variable (see below)   
dipole values = x y z   
x,y,z = orientation of dipole moment vector any of x,y,z can be an atom-style variable (see below)   
dipole/random value = seed Dlen seed = random # seed (positive integer) for dipole moment orientations Dlen = magnitude of dipole moment (dipole units)   
spin/atom values = g x y z   
g = magnitude of magnetic spin vector (in Bohr magneton's unit) x,y,z = orientation of magnetic spin vector any of x,y,z can be an atom-style variable (see below)   
spin/atom/random value = seed Dlen seed = random $\#$ seed (positive integer) for magnetic spin orientations Dlen = magnitude of magnetic spin vector (in Bohr magneton's unit)   
radius/electron values $-$ eradius eradius = electron radius (or fixed-core radius) (distance units)   
spin/electron value = espin espin = electron spin (+1/-1), 0 = nuclei, 2 = fixed-core, 3 = pseudo-cores (i.e. ECP)   
quat values = a b c theta a,b,c = unit vector to rotate particle around via right-hand rule theta = rotation angle (degrees) any of a,b,c,theta can be an atom-style variable (see below)   
quat/random value = seed seed = random $\#$ seed (positive integer) for quaternion orientations   
diameter value = diameter of spherical particle (distance units) value can be an atom-style variable (see below)   
shape value = Sx Sy Sz Sx,Sy,Sz = 3 diameters of ellipsoid (distance units)   
length value = len len = length of line segment (distance units) len can be an atom-style variable (see below)   
tri value = side side = side length of equilateral triangle (distance units) side can be an atom-style variable (see below)   
theta value $-$ angle (degrees) angle = orientation of line segment with respect to x-axis angle can be an atom-style variable (see below)   
theta/random value = seed seed = random # seed (positive integer) for line segment orienations   
angmom values = Lx Ly Lz Lx,Ly,Lz = components of angular momentum vector (distance-mass-velocity units) any of Lx,Ly,Lz can be an atom-style variable (see below)   
omega values = Wx Wy Wz Wx,Wy,Wz = components of angular velocity vector (radians/time units) any of wx,wy,wz can be an atom-style variable (see below)   
mass value = per-atom mass (mass units) value can be an atom-style variable (see below)   
density value = particle density for a sphere or ellipsoid (mass/distance $\hat{\mathbf{\Omega}}$ 3 units), or for a $\hookrightarrow$ (mass/distance^2 units) or line (mass/distance units) particle value can be an atom-style variable (see below)   
density/disc value $-$ particle density for a 2d disc or ellipse (mass/distance^2 units) value can be an atom-style variable (see below)   
temperature value = temperature for finite-size particles (temperature units) value can be an atom-style variable (see below)   
volume value $=$ particle volume for Peridynamic particle (distance^3 units) value can be an atom-style variable (see below) nx,ny,nz $=$ which periodic image of the simulation box the atom is in any of nx,ny,nz can be an atom-style variable (see below)   
bond value = numeric bond type or bond type label, for all bonds between selected atoms   
angle value $=$ numeric angle type or angle type label, for all angles between selected atoms   
dihedral value $-$ numeric dihedral type or dihedral type label, for all dihedrals between selected␣   
$\hookrightarrow$ atoms   
improper value $-$ numeric improper type or improper type label, for all impropers between selecte   
$\hookrightarrow$ atoms   
rheo/rho value = density of RHEO particles (mass/distance^3)   
rheo/status value = status or phase of RHEO particles (unitless)   
sph/e value = energy of SPH particles (need units) value can be an atom-style variable (see below)   
sph/cv value = heat capacity of SPH particles (need units) value can be an atom-style variable (see below)   
sph/rho value = density of SPH particles (need units) value can be an atom-style variable (see below)   
smd/contact/radius = radius for short range interactions, i.e. contact and friction value can be an atom-style variable (see below)   
smd/mass/density = set particle mass based on volume by providing a mass density value can be an atom-style variable (see below)   
dpd/theta value = internal temperature of DPD particles (temperature units) value can be an atom-style variable (see below) value can be NULL which sets internal temp of each particle to KE temp   
edpd/temp value = temperature of eDPD particles (temperature units) value can be an atom-style variable (see below)   
edpd/cv value = volumetric heat capacity of eDPD particles (energy/temperature/volume units) value can be an atom-style variable (see below)   
cc values = index cc index = index of a chemical species (1 to Nspecies) cc = chemical concentration of tDPD particles for a species (mole/volume units)   
epsilon value = dielectric constant of the medium where the atoms reside   
i_name value = custom integer vector with name   
d_name value = custom floating-point vector with name   
i2_name value = column of a custom integer array with name column specified as i2_name[N] where N is 1 to Ncol   
d2_name value = column of a custom floating-point array with name column specified as d2_name[N] where N is 1 to Ncol  

# 1.96.2 Examples  

set group solvent type 2   
set group solvent type C   
set group solvent type/fraction 2 0.5 12393   
set group solvent type/fraction C 0.5 12393   
set group edge bond 4   
set region half charge 0.5   
set type 3 charge 0.5   
set type H charge 0.5   
set type $1^{*}3$ charge 0.5   
set atom \* charge v_atomfile   
set atom 100\*200 x 0.5 y 1.0   
set atom 100 vx 0.0 vy 0.0 vz -1.0   
set atom 1492 type 3  

(continued from previous page)  

<html><body><table><tr><td>set atom 1492 type H</td></tr><tr><td>set atom * i_myVal 5</td></tr><tr><td>set atom * d2_Sxyz[1] 6.4</td></tr><tr><td></td></tr></table></body></html>  

# 1.96.3 Description  

Set one or more properties of one or more atoms. Since atom properties are initially assigned by the read_data, read_restart or create_atoms commands, this command changes those assignments. This can be useful for overriding the default values assigned by the create_atoms command (e.g. charge $=0.0\AA.$ ). It can be useful for altering pairwise and molecular force interactions, since force-field coefficients are defined in terms of types. It can be used to change the labeling of atoms by atom type or molecule ID when they are output in dump files. It can also be useful for debugging purposes; i.e. positioning an atom at a precise location to compute subsequent forces or energy.  

Note that the style and $I D$ arguments determine which atoms have their properties reset. The remaining keywords specify which properties to reset and what the new values are. Some strings like type or mol can be used as a style and/or a keyword.  

This section describes how to select which atoms to change the properties of, via the style and $I D$ arguments.  

Changed in version 28Mar2023: Support for type labels was added for selecting atoms by type  

The style atom selects all the atoms in a range of atom IDs.  

The style type selects all the atoms in a range of types or type labels. The style type selects atoms in one of two ways. A range of numeric atom types can be specified. Or a single atom type label can be specified, e.g. “C”. The style mol selects all the atoms in a range of molecule IDs.  

In each of the range cases, the range can be specified as a single numeric value, or a wildcard asterisk can be used to specify a range of values. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $\mathbf{\tilde{\Sigma}}^{6}\mathbf{\tilde{n}}^{*}{\mathbf{\tilde{\Sigma}}}^{,*}$ or $\mathrm{^{6}m^{*}n^{,}}$ . For example, for the style type, if $\Nu=$ the number of atom types, then an asterisk with no numeric values means all types from 1 to N. A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to N (inclusive). A middle asterisk means all types from m to n (inclusive). For all the styles except mol, the lowest value for the wildcard is 1; for mol it is 0.  

The style group selects all the atoms in the specified group. The style region selects all the atoms in the specified geometric region. See the group and region commands for details of how to specify a group or region.  

This section describes the keyword options for which properties to change, for the selected atoms.  

Note that except where explicitly prohibited below, all of the keywords allow an atom-style or atomfile-style variable to be used as the specified value(s). If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated, and its resulting per-atom value used to determine the value assigned to each selected atom. Note that the per-atom value from the variable will be ignored for atoms that are not selected via the style and $I D$ settings explained above. A simple way to use per-atom values from the variable to reset a property for all atoms is to use style atom with $I D={}^{\sqrt{6};\because\gamma}$ ; this selects all atom IDs.  

Atom-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. They can also include per-atom values, such as atom coordinates. Thus it is easy to specify a time-dependent or spatially-dependent set of per-atom values. As explained on the variable doc page, atomfile-style variables can be used in place of atom-style variables, and thus as arguments to the set command. Atomfile-style variables read their per-atoms values from a file.  

# Note  

Atom-style and atomfile-style variables return floating point per-atom values. If the values are assigned to an integer variable, such as the molecule ID, then the floating point value is truncated to its integer portion, e.g. a value of 2.6 would become 2.  

Changed in version 28Mar2023: Support for type labels was added for setting atom, bond, angle, dihedral, and improper types  

Keyword type sets the atom type for all selected atoms. A specified value can be either a numeric atom type or an atom type label. When using a numeric type, the specified value must be from 1 to ntypes, where ntypes was set by the create_box command or the atom types field in the header of the data file read by the read_data command. When using a type label it must have been defined previously. See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

Keyword type/fraction sets the atom type for a fraction of the selected atoms. The actual number of atoms changed is not guaranteed to be exactly the specified fraction $(0<=f r a c t i o n<=1)$ , but should be statistically close. Random numbers are used in such a way that a particular atom is changed or not changed, regardless of how many processors are being used. This keyword does not allow use of an atom-style variable.  

Keywords type/ratio and type/subset also set the atom type for a fraction of the selected atoms. The actual number of atoms changed will be exactly the requested number. For type/ratio the specified fraction $0<=$ fraction $<=1,$ ) determines the number. For type/subset, the specified Nsubset is the number. An iterative algorithm is used which ensures the correct number of atoms are selected, in a perfectly random fashion. Which atoms are selected will change with the number of processors used. These keywords do not allow use of an atom-style variable.  

Keyword mol sets the molecule ID for all selected atoms. The atom style being used must support the use of molecule IDs.  

Keywords x, y, z, and charge set the coordinates or charge of all selected atoms. For charge, the atom style being used must support the use of atomic charge. Keywords vx, vy, and $\nu z$ set the velocities of all selected atoms.  

Keyword dipole uses the specified x,y,z values as components of a vector to set as the orientation of the dipole moment vectors of the selected atoms. The magnitude of the dipole moment is set by the length of this orientation vector.  

Keyword dipole/random randomizes the orientation of the dipole moment vectors for the selected atoms and sets the magnitude of each to the specified Dlen value. For 2d systems, the z component of the orientation is set to 0.0. Random numbers are used in such a way that the orientation of a particular atom is the same, regardless of how many processors are being used. This keyword does not allow use of an atom-style variable.  

Changed in version 15Sep2022.  

Keyword spin/atom uses the specified $\mathrm{g}$ value to set the magnitude of the magnetic spin vectors, and the x,y,z values as components of a vector to set as the orientation of the magnetic spin vectors of the selected atoms. This keyword was previously called spin.  

Changed in version 15Sep2022.  

Keyword spin/atom/random randomizes the orientation of the magnetic spin vectors for the selected atoms and sets the magnitude of each to the specified Dlen value. This keyword was previously called spin/random.  

Added in version 15Sep2022.  

Keyword radius/electron uses the specified value to set the radius of electrons or fixed cores.  

Added in version 15Sep2022.  

Keyword spin/electron sets the spin of an electron $(+/-1)$ or indicates nuclei $(=0)$ , fixed-cores $(=2)$ ), or pseudo-cores ( $\cong$ 3).  

Keyword quat uses the specified values to create a quaternion (4-vector) that represents the orientation of the selected atoms. The particles must define a quaternion for their orientation (e.g. ellipsoids, triangles, body particles) as defined by the atom_style command. Note that particles defined by atom_style ellipsoid have 3 shape parameters. The 3 values must be non-zero for each particle set by this command. They are used to specify the aspect ratios of an ellipsoidal particle, which is oriented by default with its $\mathbf{X}$ -axis along the simulation box’s x-axis, and similarly for y and $\mathbf{Z}$ . If this body is rotated (via the right-hand rule) by an angle theta around a unit rotation vector (a,b,c), then the quaternion that represents its new orientation is given by (cos(theta/2), a\*sin(theta/2), b\*sin(theta/2), c\*sin(theta/2)). The theta and a,b,c values are the arguments to the quat keyword. LAMMPS normalizes the quaternion in case (a,b,c) was not specified as a unit vector. For 2d systems, the a,b,c values are ignored, since a rotation vector of (0,0,1) is the only valid choice.  

Keyword quat/random randomizes the orientation of the quaternion for the selected atoms. The particles must define a quaternion for their orientation (e.g. ellipsoids, triangles, body particles) as defined by the atom_style command. Random numbers are used in such a way that the orientation of a particular atom is the same, regardless of how many processors are being used. For 2d systems, only orientations in the xy plane are generated. As with keyword quat, for ellipsoidal particles, the 3 shape values must be non-zero for each particle set by this command. This keyword does not allow use of an atom-style variable.  

Keyword diameter sets the size of the selected atoms. The particles must be finite-size spheres as defined by the atom_style sphere command. The diameter of a particle can be set to 0.0, which means they will be treated as point particles. Note that this command does not adjust the particle mass, even if it was defined with a density, e.g. via the read_data command.  

Keyword shape sets the size and shape of the selected atoms. The particles must be ellipsoids as defined by the atom_style ellipsoid command. The Sx, Sy, $S z$ settings are the 3 diameters of the ellipsoid in each direction. All 3 can be set to the same value, which means the ellipsoid is effectively a sphere. They can also all be set to 0.0 which means the particle will be treated as a point particle. Note that this command does not adjust the particle mass, even if it was defined with a density, e.g. via the read_data command.  

Keyword length sets the length of selected atoms. The particles must be line segments as defined by the atom_style line command. If the specified value is non-zero the line segment is (re)set to a length $=$ the specified value, centered around the particle position, with an orientation along the x-axis. If the specified value is 0.0, the particle will become a point particle. Note that this command does not adjust the particle mass, even if it was defined with a density, e.g. via the read_data command.  

Keyword tri sets the size of selected atoms. The particles must be triangles as defined by the atom_style tri command. If the specified value is non-zero the triangle is (re)set to be an equilateral triangle in the xy plane with side length $=$ the specified value, with a centroid at the particle position, with its base parallel to the x axis, and the y-axis running from the center of the base to the top point of the triangle. If the specified value is 0.0, the particle will become a point particle. Note that this command does not adjust the particle mass, even if it was defined with a density, e.g. via the read_data command.  

Keyword theta sets the orientation of selected atoms. The particles must be line segments as defined by the atom_style line command. The specified value is used to set the orientation angle of the line segments with respect to the $\mathbf{X}$ axis.  

Keyword theta/random randomizes the orientation of theta for the selected atoms. The particles must be line segments as defined by the atom_style line command. Random numbers are used in such a way that the orientation of a particular atom is the same, regardless of how many processors are being used. This keyword does not allow use of an atom-style variable.  

Keyword angmom sets the angular momentum of selected atoms. The particles must be ellipsoids as defined by the atom_style ellipsoid command or triangles as defined by the atom_style tri command. The angular momentum vector of the particles is set to the 3 specified components.  

Keyword omega sets the angular velocity of selected atoms. The particles must be spheres as defined by the atom_style sphere command. The angular velocity vector of the particles is set to the 3 specified components.  

Keyword mass sets the mass of all selected particles. The particles must have a per-atom mass attribute, as defined by the atom_style command. See the “mass” command for how to set mass values on a per-type basis.  

Keyword density or density/disc also sets the mass of all selected particles, but in a different way. The particles must have a per-atom mass attribute, as defined by the atom_style command. If the atom has a radius attribute (see atom_style sphere) and its radius is non-zero, its mass is set from the density and particle volume for 3d systems (the input density is assumed to be in mass/distance^3 units). For 2d, the default is for LAMMPS to model particles with a radius attribute as spheres. However, if the density/disc keyword is used, then they can be modeled as 2d discs (circles). Their mass is set from the density and particle area (the input density is assumed to be in mass/distance $\mathbf{\nabla}^{,\wedge}2$ units).  

If the atom has a shape attribute (see atom_style ellipsoid) and its 3 shape parameters are non-zero, then its mass is set from the density and particle volume (the input density is assumed to be in mass/distance^3 units). The density/disc keyword has no effect; it does not (yet) treat 3d ellipsoids as 2d ellipses.  

If the atom has a length attribute (see atom_style line) and its length is non-zero, then its mass is set from the density and line segment length (the input density is assumed to be in mass/distance units). If the atom has an area attribute (see atom_style tri) and its area is non-zero, then its mass is set from the density and triangle area (the input density is assumed to be in mass/distance^2 units).  

If none of these cases are valid, then the mass is set to the density value directly (the input density is assumed to be in mass units).  

Keyword temperature sets the temperature of a finite-size particle. Currently, only the GRANULAR package supports this attribute. The temperature must be added using an instance of fix property/atom The values for the temperature must be positive.  

Keyword volume sets the volume of all selected particles. Currently, only the atom_style peri command defines particle with a volume attribute. Note that this command does not adjust the particle mass.  

Keyword image sets which image of the simulation box the atom is considered to be in. An image of 0 means it is inside the box as defined. A value of 2 means add 2 box lengths to get the true value. A value of -1 means subtract 1 box length to get the true value. LAMMPS updates these flags as atoms cross periodic boundaries during the simulation. The flags can be output with atom snapshots via the dump command. If a value of NULL is specified for any of nx,ny,nz, then the current image value for that dimension is unchanged. For non-periodic dimensions only a value of 0 can be specified. This command can be useful after a system has been equilibrated and atoms have diffused one or more box lengths in various directions. This command can then reset the image values for atoms so that they are effectively inside the simulation box, e.g if a diffusion coefficient is about to be measured via the compute msd command. Care should be taken not to reset the image flags of two atoms in a bond to the same value if the bond straddles a periodic boundary (rather they should be different by $+/-1$ ). This will not affect the dynamics of a simulation, but may mess up analysis of the trajectories if a LAMMPS diagnostic or your own analysis relies on the image flags to unwrap a molecule which straddles the periodic box.  

Keywords bond, angle, dihedral, and improper, set the bond type (angle type, etc) of all bonds (angles, etc) of selected atoms to the specified value. The value can be a numeric type from 1 to nbondtypes (nangletypes, etc). Or it can be a type label (bond type label, angle type label, etc). See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used. All atoms in a particular bond (angle, etc) must be selected atoms in order for the change to be made. The value of nbondtypes (nangletypes, etc) was set by the bond types (angle types, etc) field in the header of the data file read by the read_data command. These keywords do not allow use of an atom-style variable.  

Keywords rheo/rho and rheo/status set the density and the status of rheo particles. In particular, one can only set the phase in the status as described by the RHEO howto page.  

Keywords sph/e, sph/cv, and sph/rho set the energy, heat capacity, and density of smoothed particle hydrodynamics (SPH) particles. See this PDF guide to using SPH in LAMMPS.  

![](images/6b2f22d0e9430635deca35c15cc976266a2afd955da6fcfb08e4d31229921aa8.jpg)  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

Keyword smd/mass/density sets the mass of all selected particles, but it is only applicable to the Smooth Mach Dynamics package MACHDYN. It assumes that the particle volume has already been correctly set and calculates particle mass from the provided mass density value.  

Keyword smd/contact/radius only applies to simulations with the Smooth Mach Dynamics package MACHDYN. Itsets an interaction radius for computing short-range interactions, e.g. repulsive forces to prevent different individual physical bodies from penetrating each other. Note that the SPH smoothing kernel diameter used for computing long range, nonlocal interactions, is set using the diameter keyword.  

Keyword dpd/theta sets the internal temperature of a DPD particle as defined by the DPD-REACT package. If the specified value is a number it must be $>=0.0$ . If the specified value is NULL, then the kinetic temperature Tkin of each particle is computed as $3/2\mathrm{~k~Tkin}=\mathrm{KE}=1/2\mathrm{~m~}\mathbf{v}^{\times}2=1/2\mathrm{~m~}(\mathbf{v}\mathbf{x}^{*}\mathbf{v}\mathbf{x}+\mathbf{v}\mathbf{y}^{*}\mathbf{v}\mathbf{y}+\mathbf{v}\mathbf{z}^{*}\mathbf{v}\mathbf{Z})$ . Each particle’s internal temperature is set to Tkin. If the specified value is an atom-style variable, then the variable is evaluated for each particle. If a value $>=0.0$ , the internal temperature is set to that value. If it is $<0.0$ , the computation of Tkin is performed and the internal temperature is set to that value.  

Keywords edpd/temp and edpd/cv set the temperature and volumetric heat capacity of an eDPD particle as defined by the DPD-MESO package. Currently, only atom_style edpd defines particles with these attributes. The values for the temperature and heat capacity must be positive.  

Keyword cc sets the chemical concentration of a tDPD particle for a specified species as defined by the DPD-MESO package. Currently, only atom_style tdpd defines particles with this attribute. An integer for “index” selects a chemical species (1 to Nspecies) where Nspecies is set by the atom_style command. The value for the chemical concentration must be $>=0.0$ .  

Keyword epsilon sets the dielectric constant of a particle, precisely of the medium where the particle resides as defined by the DIELECTRIC package. Currently, only atom_style dielectric defines particles with this attribute. The value for the dielectric constant must be $>=0.0$ . Note that the set command with this keyword will rescale the particle charge accordingly so that the real charge (e.g., as read from a data file) stays intact. To change the real charges, one needs to use the set command with the charge keyword. Care must be taken to ensure that the real and scaled charges, and dielectric constants are consistent.  

Keywords i_name, d_name, i2_name, d2_name refer to custom per-atom integer and floating-point vectors or arrays that have been added via the fix property/atom command. When that command is used specific names are given to each attribute which are the “name” portion of these keywords. For arrays i2_name and d2_name, the column of the array must also be included following the name in brackets: e.g. d2_xyz[2], i2_mySpin[3].  

# 1.96.4 Restrictions  

You cannot set an atom attribute (e.g. mol or $q$ or volume) if the atom_style does not have that attribute.  

This command requires inter-processor communication to coordinate the setting of bond types (angle types, etc). This means that your system must be ready to perform a simulation before using one of these keywords (force fields set, atom mass set, etc). This is not necessary for other keywords.  

Using the region style with the bond (angle, etc) keywords can give unpredictable results if there are bonds (angles, etc) that straddle periodic boundaries. This is because the region may only extend up to the boundary and partner atoms in the bond (angle, etc) may have coordinates outside the simulation box if they are ghost atoms.  

# 1.96.5 Related commands  

create_box, create_atoms, read_data  

# 1.96.6 Default  

none  

# 1.97 shell command  

# 1.97.1 Syntax  

• command $=c d$ or mkdir or mv or rm or rmdir or putenv or arbitrary command  

cd $\mathrm{arg}=\mathrm{dir}$ dir $=$ directory to change to   
mkdir args = dir1 dir2 ... dir1,dir2 = one or more directories to create   
mv args = old new old = old filename new = new filename or destination folder   
rm $\mathrm{args=\left\vert-f\right\vert}$ file1 file2 ... - $\mathrm{f}=\mathrm{turn}$ off warnings (optional) file1,file2 = one or more filenames to delete   
rmdir args = dir1 dir2 ... dir1,dir2 = one or more directories to delete   
putenv args $=$ var1 $=$ value1 var2 $\mathrel{\mathop:}=$ value2 va $^{\star}={}$ value $=$ one of more definitions of environment variables   
anything else is passed as a command to the shell for direct execution  

# 1.97.2 Examples  

shell cd sub1   
shell cd ..   
shell mkdir tmp1 tmp2/tmp3   
shell rmdir tmp1 tmp2   
shell mv log.lammps hold/log.1   
shell rm TMP/file1 TMP/file2   
shell putenv LAMMPS_POTENTIALS $=$ ../../potentials shell my_setup file1 10 file2   
shell my_post_process 100 dump.out  

# 1.97.3 Description  

Execute a shell command. A few simple file-based shell commands are supported directly, in Unix-style syntax. Any command not listed above is passed as-is to the C-library system() call, which invokes the command in a shell. To use the external executable instead of the built-in version one needs to use a full path, for example /bin/rm instead of rm. The built-in commands will also work on operating systems, that do not - by default - provide the corresponding external executables (like mkdir on Windows).  

This command provides a ways to invoke custom commands or executables from your input script. For example, you can move files around in preparation for the next section of the input script. Or you can run a program that pre-processes data for input into LAMMPS. Or you can run a program that post-processes LAMMPS output data.  

With the exception of cd, all commands, including ones invoked via a system() call, are executed by only a single processor, so that files/directories are not being manipulated by multiple processors concurrently which may result in unexpected errors or corrupted files.  

The cd command changes the current working directory similar to the cd command. All subsequent LAMMPS commands that read/write files will use the new directory. All processors execute this command.  

The mkdir command creates directories similar to the Unix mkdir -p command. That is, it will attempt to create the entire path of subdirectories if they do not exist yet.  

The mv command renames a file and/or moves it to a new directory. It cannot rename files across filesystem boundaries or between drives.  

The rm command deletes file similar to the Unix rm command.  

The rmdir command deletes directories similar to Unix rmdir command. If a directory is not empty, its contents are also removed recursively similar to the Unix rm -r command.  

The putenv command defines or updates an environment variable directly. Since this command does not pass through the shell, no shell variable expansion or globbing is performed, only the usual substitution for LAMMPS variables defined with the variable command is performed. The resulting string is then used literally.  

Any other command is passed as-is to the shell along with its arguments as one string, invoked by the C-library system() call. For example, these lines in your input script:  

variable n equal 10 variable foo string file2 shell my_setup file1 \$n \${foo} would be the same as invoking  

from a command-line prompt. The executable program “my_setup” is run with 3 arguments: file1 10 file2.  

# 1.97.4 Restrictions  

LAMMPS will do a best effort to detect errors and print suitable warnings, but due to the nature of delegating commands to the C-library system() call, this is not always reliable.  

# 1.97.5 Related commands  

none  

# 1.97.6 Default  

none  

# 1.98 special_bonds command  

# 1.98.1 Syntax  

special_bonds keyword values ...  

• one or more keyword/value pairs may be appended   
• keyword $=$ amber or charmm or dreiding or fene or lj/coul or $l j$ or coul or angle or dihedral or one/five amber values $=$ none charmm values $=$ none dreiding values $=$ none fene values $=$ none $\mathrm{ij/coul{values}=w1,w2,w3}$ $\mathrm{w1,w2,w3=}$ weights (0.0 to 1.0) on pairwise Lennard-Jones and Coulombic interactions  

# 1.98. special_bonds command  

lj $\mathrm{values}=\mathrm{w}1,\mathrm{w}2,\mathrm{w}3$ w1,w2,w3 $=$ weights (0.0 to 1.0) on pairwise Lennard-Jones interactions   
coul $\mathrm{values}=\mathrm{w}1,\mathrm{w}2,\mathrm{w}3$ w1,w2,w3 $=$ weights (0.0 to 1.0) on pairwise Coulombic interactions   
angle value $=$ yes or no   
dihedral value = yes or no   
one/five value $=$ yes or no  

# 1.98.2 Examples  

special_bonds amber   
special_bonds charmm   
special_bonds fene dihedral no   
special_bonds lj/coul 0.0 0.0 0.5 angle yes dihedral yes   
special_bonds lj 0.0 0.0 0.5 coul 0.0 0.0 0.0 dihedral yes  

# 1.98.3 Description  

Set weighting coefficients for pairwise energy and force contributions between pairs of atoms that are also permanently bonded to each other, either directly or via one or two intermediate bonds. These weighting factors are used by nearly all pair styles in LAMMPS that compute simple pairwise interactions. Permanent bonds between atoms are specified by defining the bond topology in the data file read by the read_data command. Typically a bond_style command is also used to define a bond potential. The rationale for using these weighting factors is that the interaction between a pair of bonded atoms is all (or mostly) specified by the bond, angle, dihedral potentials, and thus the non-bonded Lennard-Jones or Coulombic interaction between the pair of atoms should be excluded (or reduced by a weighting factor).  

# Note  

These weighting factors are NOT used by pair styles that compute many-body interactions, since the “bonds” that result from such interactions are not permanent, but are created and broken dynamically as atom conformations change. Examples of pair styles in this category are EAM, MEAM, Stillinger-Weber, Tersoff, COMB, AIREBO, and ReaxFF. In fact, it generally makes no sense to define permanent bonds between atoms that interact via these potentials, though such bonds may exist elsewhere in your system, e.g. when using the pair_style hybrid command. Thus LAMMPS ignores special_bonds settings when many-body potentials are calculated. Please note, that the existence of explicit bonds for atoms that are described by a many-body potential will alter the neighbor list and thus can render the computation of those interactions invalid, since those pairs are not only used to determine direct pairwise interactions but also neighbors of neighbors and more. The recommended course of action is to remove such bonds, or - if that is not possible - use a special bonds setting of 1.0 1.0 1.0.  

# Note  

Unlike some commands in LAMMPS, you cannot use this command multiple times in an incremental fashion: e.g. to first set the LJ settings and then the Coulombic ones. Each time you use this command it sets all the coefficients to default values and only overrides the one you specify, so you should set all the options you need each time you use it. See more details at the bottom of this page.  

The Coulomb factors are applied to any Coulomb (charge interaction) term that the potential calculates. The LJ factors are applied to the remaining terms that the potential calculates, whether they represent LJ interactions or not. The weighting factors are a scaling prefactor on the energy and force between the pair of atoms.  

A value of 1.0 means include the full interaction without flagging the pair as a “special pair”; a value of 0.0 means exclude the pair completely from the neighbor list, except for pair styles that require a kspace style and pair styles amoeba, hippo, thole, coul/exclude, and pair styles that include “coul/dsf” or “coul/wolf”.  

# Note  

To include pairs that would otherwise be excluded (so they are included in the neighbor list for certain analysis compute styles), you can use a very small but non-zero value like 1.0e-100 instead of 0.0. Due to using floatingpoint math, the computed force, energy, and virial contributions from the pairs will be too small to cause differences.  

The first of the 3 coefficients (LJ or Coulombic) is the weighting factor on 1-2 atom pairs, which are pairs of atoms directly bonded to each other. The second coefficient is the weighting factor on 1-3 atom pairs which are those separated by 2 bonds (e.g. the two H atoms in a water molecule). The third coefficient is the weighting factor on 1-4 atom pairs which are those separated by 3 bonds (e.g. the first and fourth atoms in a dihedral interaction). Thus if the 1-2 coefficient is set to 0.0, then the pairwise interaction is effectively turned off for all pairs of atoms bonded to each other. If it is set to 1.0, then that interaction will be at full strength.  

# Note  

For purposes of computing weighted pairwise interactions, 1-3 and 1-4 interactions are not defined from the list of angles or dihedrals used by the simulation. Rather, they are inferred topologically from the set of bonds specified when the simulation is defined from a data or restart file (see read_data or read_restart commands). Thus the set of 1-2,1-3,1-4 interactions that the weights apply to is the same whether angle and dihedral potentials are computed or not, and remains the same even if bonds are constrained, or turned off, or removed during a simulation.  

The two exceptions to this rule are (a) if the angle or dihedral keywords are set to yes (see below), or (b) if the delete_bonds command is used with the special option that re-computes the 1-2,1-3,1-4 topologies after bonds are deleted; see the delete_bonds command for more details.  

The amber keyword sets the 3 coefficients to 0.0, 0.0, 0.5 for LJ interactions and to 0.0, 0.0, 0.8333 for Coulombic interactions, which is the default for a commonly used version of the AMBER force field, where the last value is really 5/6. See (Cornell) for a description of the AMBER force field.  

The charmm keyword sets the 3 coefficients to 0.0, 0.0, 0.0 for both LJ and Coulombic interactions, which is the default for a commonly used version of the CHARMM force field. Note that in pair styles lj/charmm/coul/charmm and lj/charmm/coul/long the 1-4 coefficients are defined explicitly, and these pairwise contributions are computed as part of the charmm dihedral style - see the pair_coeff and dihedral_style commands for more information. See (MacKerell) for a description of the CHARMM force field.  

The dreiding keyword sets the 3 coefficients to 0.0, 0.0, 1.0 for both LJ and Coulombic interactions, which is the default for the Dreiding force field, as discussed in (Mayo).  

The fene keyword sets the 3 coefficients to 0.0, 1.0, 1.0 for both LJ and Coulombic interactions, which is consistent with a coarse-grained polymer model with FENE bonds. See (Kremer) for a description of FENE bonds.  

The lj/coul, $l j$ , and coul keywords allow the 3 coefficients to be set explicitly. The lj/coul keyword sets both the LJ and Coulombic coefficients to the same 3 values. The $l j$ and coul keywords only set either the LJ or Coulombic coefficients. Use both of them if you wish to set the LJ coefficients to different values than the Coulombic coefficients.  

The angle keyword allows the 1-3 weighting factor to be ignored for individual atom pairs if they are not listed as the first and last atoms in any angle defined in the simulation or as 1,3 or 2,4 atoms in any dihedral defined in the simulation. For example, imagine the 1-3 weighting factor is set to 0.5 and you have a linear molecule with 4 atoms and bonds as follows: 1-2-3-4. If your data file defines 1-2-3 as an angle, but does not define 2-3-4 as an angle or 1-2-3-4 as a dihedral, then the pairwise interaction between atoms 1 and 3 will always be weighted by 0.5, but different force fields use different rules for weighting the pairwise interaction between atoms 2 and 4. If the angle keyword is specified as yes, then the pairwise interaction between atoms 2 and 4 will be unaffected (full weighting of 1.0). If the angle keyword is specified as no which is the default, then the 2,4 interaction will also be weighted by 0.5.  

The dihedral keyword allows the 1-4 weighting factor to be ignored for individual atom pairs if they are not listed as the first and last atoms in any dihedral defined in the simulation. For example, imagine the 1-4 weighting factor is set to 0.5 and you have a linear molecule with 5 atoms and bonds as follows: 1-2-3-4-5. If your data file defines 1-2-3-4 as a dihedral, but does not define 2-3-4-5 as a dihedral, then the pairwise interaction between atoms 1 and 4 will always be weighted by 0.5, but different force fields use different rules for weighting the pairwise interaction between atoms 2 and 5. If the dihedral keyword is specified as yes, then the pairwise interaction between atoms 2 and 5 will be unaffected (full weighting of 1.0). If the dihedral keyword is specified as no which is the default, then the 2,5 interaction will also be weighted by 0.5.  

The one/five keyword enable calculation and storage of a list of 1-5 neighbors in the molecular topology for each atom.   
It is required by some pair styles, such as pair_style amoeba and pair_style hippo.  

# Note  

LAMMPS stores and maintains a data structure with a list of the first, second, and third neighbors of each atom (within the bond topology of the system). If new bonds are created (or molecules added containing atoms with more special neighbors), the size of this list needs to grow. Note that adding a single bond always adds a new first neighbor but may also induce \*many\* new second and third neighbors, depending on the molecular topology of your system. Using the extra/special/per/atom keyword to either read_data or create_box reserves empty space in the list for this N additional first, second, or third neighbors to be added. If you do not do this, you may get an error when bonds (or molecules) are added.  

# Note  

If you reuse this command in an input script, you should set all the options you need each time. This command cannot be used a second time incrementally. E.g. these two commands:  

<html><body><table><tr><td>special bonds lj 0.0 1.0 1.0 special bonds coul 0.0 0.0 1.0</td></tr></table></body></html>  

are not the same as  

<html><body><table><tr><td>special bonds lj 0.0 1.0 1.0 coul 0.0 0.0 1.0</td></tr></table></body></html>  

In the first case you end up with (after the second command):  

<html><body><table><tr><td>LJ: 0.0 0.0 0.0</td></tr><tr><td>Coul: 0.0 0.0 1.0</td></tr></table></body></html>  

while only in the second case do you get the desired settings of:  

<html><body><table><tr><td>LJ: 0.0 1.0 1.0</td></tr><tr><td>Coul: 0.0 0.0 1.0</td></tr></table></body></html>  

This happens because the LJ (and Coul) settings are reset to their default values before modifying them, each time the special_bonds command is issued.  

# 1.98.4 Restrictions  

none  

# 1.98.5 Related commands  

delete_bonds, fix bond/create  

# 1.98.6 Default  

All 3 Lennard-Jones and 3 Coulombic weighting coefficients $=0.0$ , angle $=$ no, dihedral $=$ no.  

(Cornell) Cornell, Cieplak, Bayly, Gould, Merz, Ferguson, Spellmeyer, Fox, Caldwell, Kollman, JACS 117, 5179-5197 (1995).   
(Kremer) Kremer, Grest, J Chem Phys, 92, 5057 (1990).   
(MacKerell) MacKerell, Bashford, Bellott, Dunbrack, Evanseck, Field, Fischer, Gao, Guo, Ha, et al, J Phys Chem, 102, 3586 (1998).   
(Mayo) Mayo, Olfason, Goddard III, J Phys Chem, 94, 8897-8909 (1990).  

# 1.99 suffix command  

# 1.99.1 Syntax  

• styl $\mathrm{\Omega}:=o f f$ or on or gpu or intel or kk or omp or opt or hybrid • args $=$ for hybrid style, default suffix to be used and alternative suffix  

# 1.99.2 Examples  

suffix off   
suffix on   
suffix gpu   
suffix intel   
suffix hybrid intel omp   
suffix kk  

# 1.99.3 Description  

This command allows you to use variants of various styles if they exist. In that respect it operates the same as the -suffix command-line switch. It also has options to turn off or back on any suffix setting made via the command-line.  

The specified style can be gpu, intel, kk, omp, opt or hybrid. These refer to optional packages that LAMMPS can be built with, as described on the Build package doc page. The “gpu” style corresponds to the GPU package, the “intel” style to the INTEL package, the “kk” style to the KOKKOS package, the “omp” style to the OPENMP package, and the “opt” style to the OPT package.  

These are the variants these packages provide:  

• $\mathrm{GPU}=\mathrm{a}$ handful of pair styles and the PPPM kspace_style, optimized to run on one or more GPUs or multicore CPU/GPU nodes  

# 1.99. suffix command  

• INTEL ${\mathbf{\lambda}}={\mathbf{a}}$ collection of pair styles and neighbor routines optimized to run in single, mixed, or double precision on CPUs and Intel(R) Xeon Phi(TM) co-processors.   
• ${\mathrm{KOKKOS}}={\mathrm{a}}$ collection of atom, pair, and fix styles optimized to run using the Kokkos library on various kinds of hardware, including GPUs via CUDA and many-core chips via OpenMP or threading.   
• $\mathrm{OPENMP=a}$ collection of pair, bond, angle, dihedral, improper, kspace, compute, and fix styles with support for OpenMP multi-threading   
• $\mathrm{OPT=a}$ handful of pair styles, cache-optimized for faster CPU performance   
• HYBRID ${\mathbf{\tau}}={\mathbf{a}}$ combination of two packages can be specified (see below)  

As an example, all of the packages provide a pair_style lj/cut variant, with style names lj/cut/opt, lj/cut/omp, lj/cut/gpu, lj/cut/intel, or lj/cut/kk. A variant styles can be specified explicitly in your input script, e.g. pair_style lj/cut/gpu. If the suffix command is used with the appropriate style, you do not need to modify your input script. The specified suffix (opt,omp,gpu,intel,kk) is automatically appended whenever your input script command creates a new atom, pair, bond, angle, dihedral, improper, kspace, fix, compute, or run style. If the variant version does not exist, the standard version is created.  

For “hybrid”, two packages are specified. The first is used whenever available. If a style with the first suffix is not available, the style with the suffix for the second package will be used if available. For example, “hybrid intel omp” will use styles from the INTEL package as a first choice and styles from the OPENMP package as a second choice if no INTEL variant is available.  

If the specified style is off, then any previously specified suffix is temporarily disabled, whether it was specified by a command-line switch or a previous suffix command. If the specified style is on, a disabled suffix is turned back on. The use of these 2 commands lets your input script use a standard LAMMPS style (i.e. a non-accelerated variant), which can be useful for testing or benchmarking purposes. Of course this is also possible by not using any suffix commands, and explicitly appending or not appending the suffix to the relevant commands in your input script.  

# Note  

The default run_style verlet is invoked prior to reading the input script and is therefore not affected by a suffix command in the input script. The KOKKOS package requires “run_style verlet/kk”, so when using the KOKKOS package it is necessary to either use the command line “-sf kk” command or add an explicit “run_style verlet” command to the input script.  

# 1.99.4 Restrictions  

none  

# 1.99.5 Related commands  

-suffix command-line switch  

# 1.99.6 Default  

none  

# 1.100 tad command  

# 1.100.1 Syntax  

tad N t_event T_lo T_hi delta tmax compute-ID keyword value ..  

• $\Nu=\#$ of timesteps to run (not including dephasing/quenching)   
• t_event $=$ timestep interval between event checks   
• $\mathrm{~T~}_{-}\mathrm{lo}=$ temperature at which event times are desired   
• T_hi $=$ temperature at which MD simulation is performed   
• delta $=$ desired confidence level for stopping criterion   
• tmax $=$ reciprocal of lowest expected pre-exponential factor (time units)   
• compute- $\mathrm{\cdotID}=\mathrm{ID}$ of the compute used for event detection   
• zero or more keyword/value pairs may be appended   
• keyword $=$ min or neb or neb_style or neb_step or neb_log min values $=$ etol ftol maxiter maxeval etol $=$ stopping tolerance for energy (energy units) ftol $=$ stopping tolerance for force (force units) maxiter $=$ max iterations of minimize maxeval $=$ max number of force/energy evaluations neb values = ftol N1 N2 Nevery etol = stopping tolerance for energy (energy units) ftol = stopping tolerance for force (force units) $\mathrm{{N1}=m a x\#}$ of iterations (timesteps) to run initial NEB $\mathrm{N2}=\operatorname*{max}\#$ of iterations (timesteps) to run barrier-climbing NEB Nevery = print NEB statistics every this many timesteps neb_style value $=$ quickmin or fire neb_step value = dtneb dtneb = timestep for NEB damped dynamics minimization neb_log value $=$ file where NEB statistics are printed  

# 1.100.2 Examples  

tad 2000 50 1800 2300 0.01 0.01 event   
tad 2000 50 1800 2300 0.01 0.01 event & min 1e-05 1e-05 100 100 & neb 0.0 0.01 200 200 20 & min_style cg & neb_style fire & neb_log log.neb  

# 1.100.3 Description  

Run a temperature accelerated dynamics (TAD) simulation. This method requires two or more partitions to perform NEB transition state searches.  

TAD is described in this paper by Art Voter. It is a method that uses accelerated dynamics at an elevated temperature to generate results at a specified lower temperature. A good overview of accelerated dynamics methods (AMD) for such systems is given in this review paper from the same group. To quote from the review paper: “The dynamical evolution is characterized by vibrational excursions within a potential basin, punctuated by occasional transitions between basins. The transition probability is characterized by $\mathrm{p(t)}=\mathrm{k^{*}e x p(-k t)}$ where $\mathbf{k}$ is the rate constant.”  

TAD is a suitable AMD method for infrequent-event systems, where in addition, the transition kinetics are wellapproximated by harmonic transition state theory (hTST). In hTST, the temperature dependence of transition rates follows the Arrhenius relation. As a consequence a set of event times generated in a high-temperature simulation can be mapped to a set of much longer estimated times in the low-temperature system. However, because this mapping involves the energy barrier of the transition event, which is different for each event, the first event at the high temperature may not be the earliest event at the low temperature. TAD handles this by first generating a set of possible events from the current basin. After each event, the simulation is reflected backwards into the current basin. This is repeated until the stopping criterion is satisfied, at which point the event with the earliest low-temperature occurrence time is selected. The stopping criterion is that the confidence measure be greater than 1-delta. The confidence measure is the probability that no earlier low-temperature event will occur at some later time in the high-temperature simulation. hTST provides an lower bound for this probability, based on the user-specified minimum pre-exponential factor (reciprocal of tmax).  

In order to estimate the energy barrier for each event, the TAD method invokes the NEB method. Each NEB replica runs on a partition of processors. The current NEB implementation in LAMMPS restricts you to having exactly one processor per replica. For more information, see the documentation for the neb command. In the current LAMMPS implementation of TAD, all the non-NEB TAD operations are performed on the first partition, while the other partitions remain idle. See the Howto replica doc page for further discussion of multi-replica simulations.  

A TAD run has several stages, which are repeated each time an event is performed. The logic for a TAD run is as follows:  

<html><body><table><tr><td>while (time remains):</td></tr><tr><td>while (time < tstop):</td></tr><tr><td>until (event occurs):</td></tr><tr><td>run dynamics for t_event steps</td></tr><tr><td>quench</td></tr><tr><td>run neb calculation using all replicas</td></tr><tr><td>compute tlo from energy barrier</td></tr><tr><td>update earliest event update tstop</td></tr><tr><td>reflect back into current basin</td></tr><tr><td>execute earliest event</td></tr></table></body></html>  

Before this outer loop begins, the initial potential energy basin is identified by quenching (an energy minimization, see below) the initial state and storing the resulting coordinates for reference.  

Inside the inner loop, dynamics is run continuously according to whatever integrator has been specified by the user, stopping every t_event steps to check if a transition event has occurred. This check is performed by quenching the system and comparing the resulting atom coordinates to the coordinates from the previous basin.  

A quench is an energy minimization and is performed by whichever algorithm has been defined by the min_style command; its default is the CG minimizer. The tolerances and limits for each quench can be set by the min keyword. Note that typically, you do not need to perform a highly-converged minimization to detect a transition event.  

The event check is performed by a compute with the specified compute-ID. Currently there is only one compute that works with the TAD command, which is the compute event/displace command. Other event-checking computes may be added. Compute event/displace checks whether any atom in the compute group has moved further than a specified threshold distance. If so, an “event” has occurred.  

The NEB calculation is similar to that invoked by the neb command, except that the final state is generated internally, instead of being read in from a file. The style of minimization performed by NEB is determined by the neb_style keyword and must be a damped dynamics minimizer. The tolerances and limits for each NEB calculation can be set by the neb keyword. As discussed on the neb, it is often advantageous to use a larger timestep for NEB than for normal dynamics. Since the size of the timestep set by the timestep command is used by TAD for performing dynamics, there is a neb_step keyword which can be used to set a larger timestep for each NEB calculation if desired.  

A key aspect of the TAD method is setting the stopping criterion appropriately. If this criterion is too conservative, then many events must be generated before one is finally executed. Conversely, if this criterion is too aggressive, highentropy high-barrier events will be over-sampled, while low-entropy low-barrier events will be under-sampled. If the lowest pre-exponential factor is known fairly accurately, then it can be used to estimate tmax, and the value of delta can be set to the desired confidence level e.g. delta $=0.05$ corresponds to $95\%$ confidence. However, for systems where the dynamics are not well characterized (the most common case), it will be necessary to experiment with the values of delta and tmax to get a good trade-off between accuracy and performance.  

A second key aspect is the choice of $t\_h i$ . A larger value greatly increases the rate at which new events are generated. However, too large a value introduces errors due to anharmonicity (not accounted for within hTST). Once again, for any given system, experimentation is necessary to determine the best value of $t\_h i$ .  

Five kinds of output can be generated during a TAD run: event statistics, NEB statistics, thermodynamic output by each replica, dump files, and restart files.  

Event statistics are printed to the screen and master log.lammps file each time an event is executed. The quantities are the timestep, CPU time, global event number $N$ , local event number $M$ , event status, energy barrier, time margin, $t\_l o$ and delt_lo. The timestep is the usual LAMMPS timestep, which corresponds to the high-temperature time at which the event was detected, in units of timestep. The CPU time is the total processor time since the start of the TAD run. The global event number $N$ is a counter that increments with each executed event. The local event number $M$ is a counter that resets to zero upon entering each new basin. The event status is $E$ when an event is executed, and is $D$ for an event that is detected, while $D F$ is for a detected event that is also the earliest (first) event at the low temperature.  

The time margin is the ratio of the high temperature time in the current basin to the stopping time. This last number can be used to judge whether the stopping time is too short or too long (see above).  

$t\_l o$ is the low-temperature event time when the current basin was entered, in units of timestep. $\mathrm{del^{*}t\_l o^{*}}$ is the time of each detected event, measured relative to t_lo. delt_lo is equal to the high-temperature time since entering the current basin, scaled by an exponential factor that depends on the hi/lo temperature ratio and the energy barrier for that event.  

On lines for executed events, with status $E$ , the global event number is incremented by one, the local event number and time margin are reset to zero, while the global event number, energy barrier, and delt_lo match the last event with status $D F$ in the immediately preceding block of detected events. The low-temperature event time $t\_l o$ is incremented by delt_lo.  

NEB statistics are written to the file specified by the neb_log keyword. If the keyword value is “none”, then no NEB statistics are printed out. The statistics are written every Nevery timesteps. See the neb command for a full description of the NEB statistics. When invoked from TAD, NEB statistics are never printed to the screen.  

Because the NEB calculation must run on multiple partitions, LAMMPS produces additional screen and log files for each partition, e.g. log.lammps.0, log.lammps.1, etc. For the TAD command, these contain the thermodynamic output of each NEB replica. In addition, the log file for the first partition, log.lammps.0, will contain thermodynamic output from short runs and minimizations corresponding to the dynamics and quench operations, as well as a line for each new detected event, as described above.  

After the TAD command completes, timing statistics for the TAD run are printed in each replica’s log file, giving a breakdown of how much CPU time was spent in each stage (NEB, dynamics, quenching, etc).  

Any dump files defined in the input script will be written to during a TAD run at timesteps when an event is executed. This means the requested dump frequency in the dump command is ignored. There will be one dump file (per dump command) created for all partitions. The atom coordinates of the dump snapshot are those of the minimum energy configuration resulting from quenching following the executed event. The timesteps written into the dump files correspond to the timestep at which the event occurred and NOT the clock. A dump snapshot corresponding to the initial minimum state used for event detection is written to the dump file at the beginning of each TAD run.  

If the restart command is used, a single restart file for all the partitions is generated, which allows a TAD run to be continued by a new input script in the usual manner. The restart file is generated after an event is executed. The restart file contains a snapshot of the system in the new quenched state, including the event number and the low-temperature time. The restart frequency specified in the restart command is interpreted differently when performing a TAD run. It does not mean the timestep interval between restart files. Instead it means an event interval for executed events. Thus a frequency of 1 means write a restart file every time an event is executed. A frequency of 10 means write a restart file every 10th executed event. When an input script reads a restart file from a previous TAD run, the new script can be run on a different number of replicas or processors.  

Note that within a single state, the dynamics will typically temporarily continue beyond the event that is ultimately chosen, until the stopping criterion is satisfied. When the event is eventually executed, the timestep counter is reset to the value when the event was detected. Similarly, after each quench and NEB minimization, the timestep counter is reset to the value at the start of the minimization. This means that the timesteps listed in the replica log files do not always increase monotonically. However, the timestep values printed to the master log file, dump files, and restart files are always monotonically increasing.  

# 1.100.4 Restrictions  

This command can only be used if LAMMPS was built with the REPLICA package. See the Build package doc page for more info.  

$N$ setting must be integer multiple of t_event.  

Runs restarted from restart files written during a TAD run will only produce identical results if the user-specified integrator supports exact restarts. So fix nvt will produce an exact restart, but fix langevin will not.  

This command cannot be used when any fixes are defined that keep track of elapsed time to perform time-dependent operations. Examples include the “ave” fixes such as fix ave/chunk. Also fix dt/reset and fix deposit.  

# 1.100.5 Related commands  

compute event/displace, min_modify, min_style, run_style, minimize, temper, neb, prd  

# 1.100.6 Default  

The option defaults are $m i n=0.10.14050,n e b=0.0110010010,n e b\_s t y l e=q u i c k m i n,n e b\_s t w o d e.T h e s e e n s i o n,s i n d s e e d t h e p r o v e r s e d t o t h e r,s i n d s e e d t h e c o n v a l u e s,p h a s e e d i n t h e c o n v a l u e s s e e d t h a t a s e d o p e r a t o r$ step $=$ the same timestep set by the timestep command, and neb_log $=$ “none”.  

(Voter2000) Sorensen and Voter, J Chem Phys, 112, 9599 (2000) (Voter2002) Voter, Montalenti, Germann, Annual Review of Materials Research 32, 321 (2002).  

# 1.101 temper command  

# 1.101.1 Syntax  

temper N M temp fix-ID seed1 seed2 index  

• $\Nu=$ total # of timesteps to run   
• $\mathbf{M}=$ attempt a tempering swap every this many steps   
• temp $=$ initial temperature for this ensemble   
• fix- $\mathrm{\cdotID}=\mathrm{ID}$ of the fix that will control temperature during the run   
• seed1 $=$ random # seed used to decide on adjacent temperature to partner with   
• seed2 $=$ random # seed for Boltzmann factor in Metropolis swap   
• index $=$ which temperature (0 to N-1) I am simulating (optional)  

# 1.101.2 Examples  

<html><body><table><tr><td>temper r 100000 100 $t tempfix 0 58728</td></tr><tr><td>temper 40000 100 $t tempfix 0 32285 $w</td></tr><tr><td></td></tr></table></body></html>  

# 1.101.3 Description  

Run a parallel tempering or replica exchange simulation using multiple replicas (ensembles) of a system. Two or more replicas must be used.  

Each replica runs on a partition of one or more processors. Processor partitions are defined at run-time using the - partition command-line switch. Note that if you have MPI installed, you can run a multi-replica simulation with more replicas (partitions) than you have physical processors, e.g you can run a 10-replica simulation on one or two processors. You will simply not get the performance speed-up you would see with one or more physical processors per replica. See the Howto replica doc page for further discussion.  

Each replica’s temperature is controlled at a different value by a fix with fix-ID that controls temperature. Most thermostat fix styles (with and without included time integration) are supported. The command will print an error message and abort, if the chosen fix is unsupported. The desired temperature is specified by temp, which is typically a variable previously set in the input script, so that each partition is assigned a different temperature. See the variable command for more details. For example:  

<html><body><table><tr><td>variable t world 300.0 310.0 320.0 330.0</td></tr><tr><td></td></tr><tr><td>fix myfix all nvt temp $t $t 100.0</td></tr><tr><td>temper r 100000 100 $t myfix 3847 58382</td></tr></table></body></html>  

would define 4 temperatures, and assign one of them to the thermostat used by each replica, and to the temper command.  

As the tempering simulation runs for $N$ timesteps, a temperature swap between adjacent ensembles will be attempted every M timesteps. If seed1 is 0, then the swap attempts will alternate between odd and even pairings. If seed1 is nonzero then it is used as a seed in a random number generator to randomly choose an odd or even pairing each time. Each attempted swap of temperatures is either accepted or rejected based on a Boltzmann-weighted Metropolis criterion which uses seed2 in the random number generator.  

As a tempering run proceeds, multiple log files and screen output files are created, one per replica. By default these files are named log.lammps.M and screen.M where M is the replica number from 0 to $_{\mathrm{N}-1}$ , with $\Nu=\#$ of replicas. See the -log and -screen command-line swiches for info on how to change these names.  

The main screen and log file (log.lammps) will list information about which temperature is assigned to each replica at each thermodynamic output timestep. E.g. for a simulation with 16 replicas:  

<html><body><table><tr><td>Running on 16 partitions of processors</td></tr><tr><td></td></tr><tr><td>10123456789101112131415</td></tr><tr><td>5001032546789101112131415</td></tr><tr><td>10002041536789101112141315</td></tr><tr><td>15002140536798101112141315</td></tr><tr><td></td></tr><tr><td>25002130645711891012141315</td></tr></table></body></html>  

The column headings T0 to TN-1 mean which temperature is currently assigned to the replica 0 to N-1. Thus the columns represent replicas and the value in each column is its temperature (also numbered 0 to N-1). For example, a 0 in the fourth column (column T3, step 2500) means that the fourth replica is assigned temperature 0, i.e. the lowest temperature. You can verify this time sequence of temperature assignments for the Nth replica by comparing the Nth column of screen output to the thermodynamic data in the corresponding log.lammps.N or screen.N files as time proceeds.  

You can have each replica create its own dump file in the following manner:  

variable rep world 0 1 2 3 4 5 6 7 dump 1 all atom 1000 dump.temper.\${rep}  

![](images/cbca6c1dbdfb6af560b50976f056985606c53a01f8a2370ccf2e31da8d732e92.jpg)  

# Note  

Each replica’s dump file will contain a continuous trajectory for its atoms where the temperature varies over time as swaps take place involving that replica. If you want a series of dump files, each with snapshots (from all replicas) that are all at a single temperature, then you will need to post-process the dump files using the information from the log.lammps file. E.g. you could produce one dump file with snapshots at 300K (from all replicas), another with snapshots at 310K, etc. Note that these new dump files will not contain “continuous trajectories” for individual atoms, because two successive snapshots (in time) may be from different replicas. The reorder_remd_traj python script can do the reordering for you (and additionally also calculated configurational log-weights of trajectory snapshots in the canonical ensemble). The script can be found in the tools/replica directory while instructions on how to use it is available in doc/Tools (in brief) and as a README file in tools/replica (in detail).  

The last argument index in the temper command is optional and is used when restarting a tempering run from a set of restart files (one for each replica) which had previously swapped to new temperatures. The index value (from 0 to N-1, where $\mathbf{N}$ is the # of replicas) identifies which temperature the replica was simulating on the timestep the restart files were written. Obviously, this argument must be a variable so that each partition has the correct value. Set the variable to the $N$ values listed in the log file for the previous run for the replica temperatures at that timestep. For example if the log file listed the following for a simulation with 5 replicas:  

then a setting of  

• $\Nu=$ total # of timesteps to run   
• $\mathbf{M}=$ attempt a tempering swap every this many steps   
• lambda $=$ initial lambda for this ensemble   
• fix- $\mathrm{\cdotID}=\mathrm{ID}$ of $f\boldsymbol{u}$ grem   
• thermostat- $\mathrm{{\cdot}I D=I D}$ of the thermostat that controls kinetic temperature   
• seed1 $=$ random # seed used to decide on adjacent temperature to partner with   
• seed2 $=$ random # seed for Boltzmann factor in Metropolis swap   
• index $=$ which temperature (0 to N-1) I am simulating (optional)  

# 1.102.2 Examples  

temper/grem 100000 1000 \${lambda} fxgREM fxnvt 0 58728 temper/grem 40000 100 \${lambda} fxgREM fxnpt 0 32285 \${walkers}  

# 1.102.3 Description  

Run a parallel tempering or replica exchange simulation in LAMMPS partition mode using multiple generalized replicas (ensembles) of a system defined by fix grem, which stands for the generalized replica exchange method $\mathrm{(gREM)}$ originally developed by (Kim). It uses non-Boltzmann ensembles to sample over first order phase transitions. The is done by defining replicas with an enthalpy dependent effective temperature  

Two or more replicas must be used. See the temper command for an explanation of how to run replicas on multiple partitions of one or more processors.  

This command is a modification of the temper command and has the same dependencies, restraints, and input variables which are discussed there in greater detail.  

Instead of temperature, this command performs replica exchanges in lambda as per the generalized ensemble enforced by fix grem. The desired lambda is specified by lambda, which is typically a variable previously set in the input script, so that each partition is assigned a different temperature. See the variable command for more details. For example:  

variable lambda world 400 420 440 460   
fix fxnvt all nvt temp 300.0 300.0 100.0   
fix fxgREM all grem \${lambda} -0.05 -50000 fxnvt   
temper/grem 100000 100 \${lambda} fxgREM fxnvt 3847 58382  

would define 4 lambdas with constant kinetic temperature but unique generalized temperature, and assign one of them to fix grem used by each replica, and to the grem command.  

As the gREM simulation runs for $N$ timesteps, a swap between adjacent ensembles will be attempted every $M$ timesteps. If seed1 is 0, then the swap attempts will alternate between odd and even pairings. If seed1 is non-zero then it is used as a seed in a random number generator to randomly choose an odd or even pairing each time. Each attempted swap of temperatures is either accepted or rejected based on a Metropolis criterion, derived for gREM by (Kim), which uses seed2 in the random number generator.  

File management works identical to the temper command. Dump files created by this fix contain continuous trajectories and require post-processing to obtain per-replica information.  

The last argument index in the grem command is optional and is used when restarting a run from a set of restart files (one for each replica) which had previously swapped to new lambda. This is done using a variable. For example if the log file listed the following for a simulation with 5 replicas:  

then a setting of  

would be used to restart the run with a grem command like the example above with $\$1$ {walkers} as the last argument.   
This functionality is identical to temper.  

# 1.102.4 Restrictions  

This command can only be used if LAMMPS was built with the REPLICA package. See the Build package doc page for more info.  

This command must be used with fix grem.  

# 1.102.5 Related commands  

fix grem, temper, variable  

# 1.102.6 Default  

none (Kim) Kim, Keyes, Straub, J Chem Phys, 132, 224107 (2010).  

# 1.103 temper/npt command  

# 1.103.1 Syntax  

temper/npt N M temp fix-ID seed1 seed2 pressure index  

• $\Nu=$ total # of timesteps to run   
• $\mathbf{M}=$ attempt a tempering swap every this many steps   
• temp $=$ initial temperature for this ensemble   
• $\mathrm{fix-ID=ID}$ of the fix that will control temperature and pressure during the run   
• seed1 $=$ random # seed used to decide on adjacent temperature to partner with   
• seed2 $=$ random # seed for Boltzmann factor in Metropolis swap   
• pressure $=$ setpoint pressure for the ensemble   
• index $=$ which temperature (0 to N-1) I am simulating (optional)  

# 1.103.2 Examples  

temper/npt 100000 100 \$t nptfix 0 58728 1 temper/npt 2500000 1000 300 nptfix 0 32285 \$p temper/npt 5000000 2000 \$t nptfix 0 12523 1 \$w  

# 1.103.3 Description  

Run a parallel tempering or replica exchange simulation using multiple replicas (ensembles) of a system in the isothermal-isobaric (NPT) ensemble. The command temper/npt works like temper but requires running replicas in the NPT ensemble instead of the canonical (NVT) ensemble and allows for pressure to be set in the ensembles. These multiple ensembles can run in parallel at different temperatures or different pressures. The acceptance criteria for temper/npt is specific to the NPT ensemble and can be found in references (Okabe) and (Mori).  

Apart from the difference in acceptance criteria and the specification of pressure, this command works much like the temper command. See the documentation on temper for information on how the parallel tempering is handled in general.  

# 1.103.4 Restrictions  

This command can only be used if LAMMPS was built with the REPLICA package. See the Build package page for more info.  

This command should be used with a fix that maintains the isothermal-isobaric (NPT) ensemble.  

# 1.103.5 Related commands  

temper, variable, fix_npt  

# 1.103.6 Default  

none   
(Okabe) T. Okabe, M. Kawata, Y. Okamoto, M. Masuhiro, Chem. Phys. Lett., 335, 435-439 (2001). (Mori) Y. Mori, Y. Okamoto, J. Phys. Soc. Jpn., 7, 074003 (2010).  

# 1.104 thermo command  

# 1.104.1 Syntax  

the next timestep, etc. Thus the variable should return timestep values. See the stagger() and logfreq() and stride() math functions for equal-style variables, as examples of useful functions to use in this context. Other similar math functions could easily be added as options for equal-style variables.  

For example, the following commands will output thermodynamic info at timesteps 0, 10, 20, 30, 100, 200, 300, 1000, 2000, etc:  

<html><body><table><tr><td>variable thermo</td><td>S equal logfreq(10,3,10) VS</td></tr></table></body></html>  

# 1.104.4 Restrictions  

none  

# 1.104.5 Related commands  

thermo_style, thermo_modify  

# 1.104.6 Default  

# 1.105 thermo_modify command  

# 1.105.1 Syntax  

thermo_modify keyword value ...  

• one or more keyword/value pairs may be listed   
• keyword $=$ lost or lost/bond or warn or norm or flush or line or colname or format or temp or press or triclinic/general   
lost value $=$ error or warn or ignore   
lost/bond value $=$ error or warn or ignore   
warn value $=$ ignore or reset or default or a number   
norm value $\mathrm{\Delta;=yes}$ or no   
flush value $=$ yes or no   
line value $-$ one or multi or yaml   
colname values $=$ ID string, or default string = new column header name ID = integer from 1 to N, or integer from -1 to -N, where N = # of quantities being output or a thermo keyword or reference to compute, fix, property or variable.   
format values $-$ line string, int string, float string, ID string, or none string = C-style format string ID = integer from 1 to N, or integer from -1 to -N, where N = # of quantities being output or an integer range such as $2^{*}6$ (negative values are not allowed) or a thermo keyword or reference to compute, fix, property or variable.   
temp value = compute ID that calculates a temperature   
press value = compute ID that calculates a pressure   
triclinic/general arg = yes or no  

# 1.105.2 Examples  

thermo_modify lost ignore flush yes   
thermo_modify temp myTemp format $3\mathrm{\%15.8g}$   
thermo_modify temp myTemp format line "%ld %g %g %15.8g"   
thermo_modify line multi format float $\%\mathrm{{g}}$   
thermo_modify line yaml format none   
thermo_modify colname 1 Timestep colname -2 Pressure colname f_1[1] AvgDensity  

# 1.105.3 Description  

Set options for how thermodynamic information is computed and printed by LAMMPS.  

![](images/29dcccfc1131d992a86f2446810d148987366b5f972b89d56054f6bdc065cb79.jpg)  

# Note  

These options apply to the currently defined thermo style. When you specify a thermo_style command, all thermodynamic settings are restored to their default values, including those previously reset by a thermo_modify command. Thus if your input script specifies a thermo_style command, you should use the thermo_modify command after it.  

The lost keyword determines whether LAMMPS checks for lost atoms each time it computes thermodynamics and what it does if atoms are lost. An atom can be “lost” if it moves across a non-periodic simulation box boundary or if it moves more than a box length outside the simulation domain (or more than a processor subdomain length) before reneighboring occurs. The latter case is typically due to bad dynamics (e.g., too large a time step and/or huge forces and velocities). If the value is ignore, LAMMPS does not check for lost atoms. If the value is error or warn, LAMMPS checks and either issues an error or warning. The simulation will exit with an error and continue with a warning. A warning will only be issued once, the first time an atom is lost. This can be a useful debugging option.  

The lost/bond keyword determines whether LAMMPS throws an error or not if an atom in a bonded interaction (bond, angle, etc) cannot be found when it creates bonded neighbor lists. By default this is a fatal error. However in some scenarios it may be desirable to only issue a warning or ignore it and skip the computation of the missing bond, angle, etc. An example would be when gas molecules in a vapor are drifting out of the box through a fixed boundary condition (see the boundary command). In this case one atom may be deleted before the rest of the molecule is, on a later timestep.  

The warn keyword allows you to control whether LAMMPS will print warning messages and how many of them. Most warning messages are only printed by MPI rank 0. They are usually pointing out important issues that should be investigated, but LAMMPS cannot determine for certain whether they are an indication of an error.  

Some warning messages are printed during a run (or immediately before) each time a specific MPI rank encounters the issue (e.g., bonds that are stretched too far or dihedrals in extreme configurations). These number of these can quickly blow up the size of the log file and screen output. Thus, a limit of 100 warning messages is applied by default. The warning count is applied to the entire input unless reset with a thermo_modify warn reset command. If there are more warnings than the limit, LAMMPS will print one final warning that it will not print any additional warning messages.  

# Note  

The warning limit is enforced on either the per-processor count or the total count across all processors. For efficiency reasons, however, the total count is only updated at steps with thermodynamic output. Thus when running on a large number of processors in parallel, the total number of warnings printed can be significantly larger than the given limit.  

Any number after the keyword warn will change the warning limit accordingly. With the value ignore all warnings will be suppressed, with the value always no limit will be applied and warnings will always be printed, with the value reset the internal warning counter will be reset to zero, and with the value default, the counter is reset and the limit set to 100. An example usage of either reset or default would be to re-enable warnings that were disabled or have reached the limit during equilibration, where the warnings would be acceptable while the system is still adjusting, but then change to all warnings for the production run, where they would indicate problems that would require a closer look at what is causing them.  

The norm keyword determines whether various thermodynamic output values are normalized by the number of atoms or not, depending on whether it is set to yes or no. Different unit styles have different defaults for this setting (see below). Even if norm is set to yes, a value is only normalized if it is an “extensive” quantity, meaning that it scales with the number of atoms in the system. For the thermo keywords described by the page for the thermo_style command, all energy-related keywords are extensive, such as $p e$ or ebond or enthalpy. Other keywords such as temp or press are “intensive” meaning their value is independent (in a statistical sense) of the number of atoms in the system and thus are never normalized. For thermodynamic output values extracted from fixes and computes in a thermo_style custom command, the page for the individual $f\alpha$ or compute lists whether the value is “extensive” or “intensive” and thus whether it is normalized. Thermodynamic output values calculated by a variable formula are assumed to be “intensive” and thus are never normalized. You can always include a divide by the number of atoms in the variable formula if this is not the case.  

The flush keyword invokes a flush operation after thermodynamic info is written to the screen and log file. This ensures the output is updated and not buffered (by the application) even if LAMMPS halts before the simulation completes. Please note that this does not affect buffering by the OS or devices, so you may still lose data in case the simulation stops due to a hardware failure.  

The line keyword determines whether thermodynamics will be output as a series of numeric values on one line (“one”), in a multi-line format with 3 quantities with text strings per line and a dashed-line header containing the timestep and CPU time (“multi”), or in a YAML format block (“yaml”). This modify option overrides the one, multi, or yaml thermo_style settings.  

Added in version 4May2022.  

The colname keyword can be used to change the default header keyword for a column or field of thermodynamic output. The setting for $I D$ string replaces the default text with the provided string. $I D$ can be a positive integer when it represents the column number counting from the left, a negative integer when it represents the column number from the right (i.e., $^{-1}$ is the last column/keyword), or a thermo keyword (or compute, fix, property, or variable reference) and then it replaces the string for that specific thermo keyword.  

The colname keyword can be used multiple times. If multiple colname settings refer to the same keyword, the last setting has precedence. A setting of default clears all previous settings, reverting all values to their default values.  

The format keyword can be used to change the default numeric format of any of quantities the thermo_style command outputs. All the specified format strings are C-style formats (i.e., as used by the $\mathrm{C/C++}$ printf() command). The line keyword takes a single argument which is the format string for the entire line of thermo output, with $N$ fields, which you must enclose in quotes if it is more than one field. The int and float keywords take a single format argument and are applied to all integer or floating-point quantities output. The setting for $I D$ string also takes a single format argument that is used for the indexed value in each line. The interpretation is the same as for colname (i.e., a positive integer is the n-th value corresponding to the n-th thermo keyword, a negative integer is counting backwards, and a string matches the entry with the thermo keyword). For example, the fifth column is output in high precision for “format $5\mathrm{{}}\mathrm{{}}^{\mathrm{{q}}}\mathrm{{}}_{0}\mathrm{{2}}0.15\mathrm{{g}}^{\prime\prime}$ , and the pair energy for “format epair $\%20.15\mathrm{g}^{,}$ . The $I D$ field can be a range, such as $^{\circ\circ}3^{\ast}6^{,}$ , “\*”, $^{\circ\circ}2^{\ast\circ}$ , or $\yen3$ ; in such cases, all fields in the range (inclusive) are set to the specified format string. Ranges containing negative numbers are not supported.  

The format keyword can be used multiple times. The precedence is that for each value in a line of output, the $I D$ format (if specified) is used, else the int or float setting (if specified) is used, else the line setting (if specified) for that value is used, else the default setting is used. A setting of none clears all previous settings, reverting all values to their default format.  

![](images/1120868d171379dd7bf2b5fec4a2fc20dce6ea6c6fa60a5d5a62e2ee0e591ca1.jpg)  

# Note  

The thermo output values step and atoms are stored internally as 8-byte signed integers, rather than the usual 4-byte signed integers. When specifying the format int option you can use a “%d”-style format identifier in the format string and LAMMPS will convert this to the corresponding 8-byte form when it is applied to those keywords. However, when specifying the line option or format ID string option for step and natoms, you should specify a format string appropriate for an 8-byte signed integer (i.e., one with “%ld” or “%lld”, depending on the platform).  

The temp keyword is used to determine how thermodynamic temperature is calculated, which is used by all thermo quantities that require a temperature (“temp”, “press”, “ke”, “etotal”, “enthalpy”, “pxx”, etc). The specified compute ID must have been previously defined by the user via the compute command and it must be a style of compute that calculates a temperature. As described in the thermo_style command, thermo output uses a default compute for temperature with $\mathrm{ID}=$ thermo_temp. This option allows the user to override the default.  

The press keyword is used to determine how thermodynamic pressure is calculated, which is used by all thermo quantities that require a pressure (“press”, “enthalpy”, “pxx”, etc). The specified compute ID must have been previously defined by the user via the compute command and it must be a style of compute that calculates a pressure. As described in the thermo_style command, thermo output uses a default compute for pressure with $\mathrm{ID}=$ thermo_press. This option allows the user to override the default.  

# Note  

If both the temp and press keywords are used in a single thermo_modify command (or in two separate commands), then the order in which the keywords are specified is important. Note that a pressure compute defines its own temperature compute as an argument when it is specified. The temp keyword will override this (for the pressure compute being used by thermodynamics), but only if the temp keyword comes after the press keyword. If the temp keyword comes before the press keyword, then the new pressure compute specified by the press keyword will be unaffected by the temp setting.  

The triclinic/general keyword can only be used with a value of yes if the simulation box was created as a general triclinic box. See the Howto_triclinic doc page for a detailed explanation of orthogonal, restricted triclinic, and general triclinic simulation boxes.  

If this keyword is yes, the output of the simulation box edge vectors and the pressure tensor components for the system are affected. These are specified by the avec,bvec,cvec and pxx,pyy,pzz,pxy,pxz,pyz keywords of the thermo_style command. See the thermo_style doc page for details.  

# 1.105.4 Restrictions  

none  

# 1.105.5 Related commands  

thermo, thermo_style  

# 1.105.6 Default  

The option defaults are lost $=$ error, warn $=100$ , norm $=$ yes for unit style of $l j$ , norm $\mathbf{\mu}=\mathbf{n}\mathbf{O}$ for unit style of real and metal, flush $\mathbf{\mu}=\mathbf{n}\mathbf{O}$ , temp/press $=$ compute IDs defined by thermo_style, and triclinic/general $\mathbf{\mu}=\mathbf{n}\mathbf{O}$ .  

The defaults for the line and format options depend on the thermo style. For styles “one” and “custom”, the line and format defaults are “one”, $\mathrm{\hbar}^{\left(60\mathrm{{q}}\right)}$ , and $\mathrm{{\bf{\hat{\Pi}}{\bf{0}}}}14.8\mathrm{g}^{,}$ . For style “multi”, the line and format defaults are “multi”, $\mathbf{\tilde{\rho}}^{66}\mathbf{\rho}_{/0}^{2}14\mathbf{d}^{5}\mathbf{\rho}$ , and ${\bf\tilde{\Sigma}}^{6}9_{0}14.4\mathrm{f}{\bf\Sigma}^{,}$ . For style “yaml”, the line and format defaults are $\mathrm{^{66}\mathrm{\%}d^{5}}$ and $\mathbf{\hat{\Pi}}^{\mathrm{o}\mathrm{f}}\mathrm{0}.15\mathrm{g}^{\mathfrak{,}\mathfrak{,}}$ .  

# 1.106 thermo_style command  

# 1.106.1 Syntax  

thermo_style style args style $=$ one or multi or yaml or custom a rgs $=$ list of arguments for a particular style ne args $=$ none multi $\mathrm{args}=\mathrm{none}$ aml args $=$ none ustom $\mathrm{args}=\mathrm{list}$ of keywords possible keywords $=$ step, elapsed, elaplong, dt, time, cpu, tpcpu, spcpu, cpuremain, part, timeremain, atoms, temp, press, pe, ke, etotal, evdwl, ecoul, epair, ebond, eangle, edihed, eimp, emol, elong, etail, enthalpy, ecouple, econserve, vol, density, xlo, xhi, ylo, yhi, zlo, zhi, xy, xz, yz, avecx, avecy, avecz, bvecx, bvecy, bvecz, cvecx, cvecy, cvecz, lx, ly, lz, xlat, ylat, zlat, cella, cellb, cellc, cellalpha, cellbeta, cellgamma, pxx, pyy, pzz, pxy, pxz, pyz, bonds, angles, dihedrals, impropers, fmax, fnorm, nbuild, ndanger, c_ID, c_ID[I], c_ID[I][J], f_ID, f_ID[I], f_ID[I][J], v_name, v_name[I] step = timestep elapsed = timesteps since start of this run elaplong = timesteps since start of initial run in a series of runs dt = timestep size time = simulation time cpu = elapsed CPU time in seconds since start of this run tpcpu = time per CPU second spcpu = timesteps per CPU second cpuremain = estimated CPU time remaining in run part = which partition (0 to Npartition-1) this is timeremain = remaining time in seconds on timer timeout. atoms $=\#$ of atoms temp = temperature press = pressure pe = total potential energy ke = kinetic energy etotal = total energy (pe + ke) evdwl = van der Waals pairwise energy (includes etail) ecoul = Coulombic pairwise energy epair = pairwise energy (evdwl + ecoul + elong)  

ebond $-$ bond energy   
eangle = angle energy   
edihed = dihedral energy   
eimp = improper energy   
emol = molecular energy (ebond $^+$ eangle $^+$ edihed + eimp)   
elong = long-range kspace energy   
etail = van der Waals energy long-range tail correction   
enthalpy = enthalpy (etotal + press\*vol)   
ecouple = cumulative energy change due to thermo/baro statting fixes   
${\mathrm{econserve}}={\mathrm{pe}}+{\mathrm{ke}}+{\mathrm{ecouple}}={\mathrm{etotal}}+{\mathrm{ec}}$ ouple   
vol = volume   
density $-$ mass density of system   
xlo,xhi,ylo,yhi,zlo,zhi = box boundaries   
$\mathrm{xy,xz,yz=box}$ tilt for restricted triclinic (non-orthogonal) simulation boxes   
avecx,avecy,avecz = components of edge vector A of the simulation box   
bvecx,bvecy,bvecz = components of edge vector B of the simulation box   
cvecx,cvecy,cvecz = components of edge vector C of the simulation box   
lx,ly,lz = box lengths in x,y,z   
xlat,ylat,zlat = lattice spacings as calculated by lattice command   
cella,cellb,cellc = periodic cell lattice constants a,b,c   
cellalpha, cellbeta, cellgamma $-$ periodic cell angles alpha,beta,gamma   
pxx,pyy,pzz,pxy,pxz,pyz = 6 components of pressure tensor   
bonds,angles,dihedrals,impropers = # of these interactions defined   
fmax = max component of force on any atom in any dimension   
fnorm = length of force vector for all atoms   
nbuild = # of neighbor list builds   
ndanger = # of dangerous neighbor list builds   
$\mathrm{c\_ID=global}$ scalar value calculated by a compute with ID   
c_ID[I] = Ith component of global vector calculated by a compute with ID, I can include␣   
wildcard (see below)   
$\mathrm{c\_ID[I||J]=I,J}$ component of global array calculated by a compute with ID   
f_ID = global scalar value calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ component of global vector calculated by a fix with ID, I can include wildcard (see   
below)   
$\mathrm{f\_ID[I][J]=I,}$ component of global array calculated by a fix with ID   
v_name = value calculated by an equal-style variable with name   
v_name[I] = value calculated by a vector-style variable with name, I can include wildcard (see␣   
below)  

# 1.106.2 Examples  

thermo_style multi   
thermo_style yaml   
thermo_style one   
thermo_style custom step temp pe etotal press vol   
thermo_style custom step temp etotal c_myTemp v_abc   
thermo_style custom step temp etotal c_myTemp[\*] v_abc  

# 1.106.3 Description  

Set the style and content for printing thermodynamic data to the screen and log files. The units for each column of output corresponding to the list of keywords is determined by the units command for the simulation. E.g. energies will be in energy units, temperature in temperature units, pressure in pressure units.  

Style one prints a single line of thermodynamic info that is the equivalent of “thermo_style custom step temp epair emol etotal press”. The line contains only numeric values.  

Style multi prints a multiple-line listing of thermodynamic info that is the equivalent of “thermo_style custom etotal ke temp pe ebond eangle edihed eimp evdwl ecoul elong press”. The listing contains numeric values and a string ID for each quantity.  

Added in version 24Mar2022.  

Style yaml is similar to style one but prints the output in YAML format which can be easily read by a variety of script languages and data handling packages. Since LAMMPS may print other output before, after, or in between thermodynamic output, the YAML format content needs to be separated from the rest. All YAML format thermodynamic output can be matched with a regular expression and can thus be extracted with commands like egrep as follows:  

$$
\begin{array}{r l}{\Big[\mathrm{egrep}^{\mathrm{~\tiny~1~-}}\big(\mathrm{keywords};|\mathrm{data};\mathfrak{G}|-\mathfrak{G}|\big\backslash.\bigvee.\bigvee.\mathfrak{G}|}&{-\backslash\big|\big)^{\prime}\log.\mathrm{lammps}>\log.\mathrm{yaml~}}\end{array}
$$  

Information about processing such YAML files is in the structured data output howto.  

Style custom is the most general setting and allows you to specify which of the keywords listed above you want printed on each thermodynamic timestep. Note that the keywords c_ID, f_ID, v_name are references to computes, fixes, and equal-style variables that have been defined elsewhere in the input script or can even be new styles which users have added to LAMMPS. See the Modify page for details on the latter. Thus the custom style provides a flexible means of outputting essentially any desired quantity as a simulation proceeds.  

All styles except custom have vol appended to their list of outputs if the simulation box volume changes during the simulation.  

The values printed by the various keywords are instantaneous values, calculated on the current timestep. Time-averaged quantities, which include values from previous timesteps, can be output by using the f_ID keyword and accessing a fix that does time-averaging such as the fix ave/time command.  

Options invoked by the thermo_modify command can be used to set the one- or multi-line format of the print-out, the normalization of thermodynamic output (total values versus per-atom values for extensive quantities (ones which scale with the number of atoms in the system), and the numeric precision of each printed value.  

![](images/6f2eaec3bb7c6dc9f36d863da2b24c766d9549e24ef511a6b8d4f8d49f5da767.jpg)  

# Note  

When you use a “thermo_style” command, all thermodynamic settings are restored to their default values, including those previously set by a thermo_modify command. Thus if your input script specifies a thermo_style command, you should use the thermo_modify command after it.  

Several of the thermodynamic quantities require a temperature to be computed: “temp”, “press”, “ke”, “etotal”, “enthalpy”, “pxx”, etc. By default this is done by using a temperature compute which is created when LAMMPS starts up, as if this command had been issued:  

See the compute pressure command for details. Note that the ID of this compute is thermo_press and the group is all. You can change the attributes of this pressure via the compute_modify command. Alternatively, you can directly assign a new compute (that calculates pressure) which you have defined, to be used for calculating any thermodynamic quantity that requires a pressure. This is done via the thermo_modify command.  

Several of the thermodynamic quantities require a potential energy to be computed: “pe”, “etotal”, “ebond”, etc. This is done by using a pe compute which is created when LAMMPS starts up, as if this command had been issued:  

compute thermo_pe all pe  

See the compute pe command for details. Note that the ID of this compute is thermo_pe and the group is all. You can change the attributes of this potential energy via the compute_modify command.  

The kinetic energy of the system $k e$ is inferred from the temperature of the system with ${\frac{1}{2}}k_{B}T$ of energy for each degree of freedom. Thus, using different compute commands for calculating temperature, via the thermo_modify temp command, may yield different kinetic energies, since different computes that calculate temperature can subtract out different non-thermal components of velocity and/or include different degrees of freedom (translational, rotational, etc).  

The potential energy of the system pe will include contributions from fixes if the fix_modify energy yes option is set for a fix that calculates such a contribution. For example, the fix wall/lj93 fix calculates the energy of atoms interacting with the wall. See the doc pages for “individual fixes” to see which ones contribute and whether their default fix_modify energy setting is yes or no.  

A long-range tail correction etail for the van der Waals pairwise energy will be non-zero only if the pair_modify tail option is turned on. The etail contribution is included in evdwl, epair, pe, and etotal, and the corresponding tail correction to the pressure is included in press and pxx, pyy, etc.  

Here is more information on other keywords whose meaning may not be clear.  

The step, elapsed, and elaplong keywords refer to timestep count. Step is the current timestep, or iteration count when a minimization is being performed. Elapsed is the number of timesteps elapsed since the beginning of this run. Elaplong is the number of timesteps elapsed since the beginning of an initial run in a series of runs. See the start and stop keywords for the run for info on how to invoke a series of runs that keep track of an initial starting time. If these keywords are not used, then elapsed and elaplong are the same value.  

The dt keyword is the current timestep size in time units. The time keyword is the current elapsed simulation time, also in time units, which is simply $(\mathrm{step}^{*}\mathrm{dt})$ if the timestep size has not changed and the timestep has not been reset. If the timestep has changed (e.g. via fix dt/reset) or the timestep has been reset (e.g. via the “reset_timestep” command), then the simulation time is effectively a cumulative value up to the current point.  

The cpu keyword is elapsed CPU seconds since the beginning of this run. The tpcpu and spcpu keywords are measures of how fast your simulation is currently running. The tpcpu keyword is simulation time per CPU second, where simulation time is in time units. E.g. for metal units, the tpcpu value would be picoseconds per CPU second. The spcpu keyword is the number of timesteps per CPU second. Both quantities are on-the-fly metrics, measured relative to the last time they were invoked. Thus if you are printing out thermodynamic output every 100 timesteps, the two keywords will continually output the time and timestep rate for the last 100 steps. The tpcpu keyword does not attempt to track any changes in timestep size, e.g. due to using the fix dt/reset command.  

The cpuremain keyword estimates the CPU time remaining in the current run, based on the time elapsed thus far. It will only be a good estimate if the CPU time/timestep for the rest of the run is similar to the preceding timesteps. On the initial timestep the value will be 0.0 since there is no history to estimate from. For a minimization run performed by the “minimize” command, the estimate is based on the maxiter parameter, assuming the minimization will proceed for the maximum number of allowed iterations.  

The part keyword is useful for multi-replica or multi-partition simulations to indicate which partition this output and this file corresponds to, or for use in a variable to append to a filename for output specific to this partition. See discussion of the -partition command-line switch for details on running in multi-partition mode.  

The timeremain keyword is the seconds remaining when a timeout has been configured via the timer timeout command. If the timeout timer is inactive, the value of this keyword is 0.0 and if the timer is expired, it is negative. This allows for example to exit loops cleanly, if the timeout is expired with:  

if "\$(timeremain) < 0.0" then "quit 0"  

The ecouple keyword is cumulative energy change in the system due to any thermostatting or barostatting fixes that are being used. A positive value means that energy has been subtracted from the system (added to the coupling reservoir). See the econserve keyword for an explanation of why this sign choice makes sense.  

The econserve keyword is the sum of the potential and kinetic energy of the system as well as the energy that has been transferred by thermostatting or barostatting to their coupling reservoirs – that is, econserve $=p e+k e+e c o u p l e$ . Ideally, for a simulation in the NVT, NPH, or NPT ensembles, the econserve quantity should remain constant over time even though etotal may change.  

In LAMMPS, the simulation box can be defined as orthogonal or triclinic (non-orthogonal). See the Howto_triclinic doc page for a detailed explanation of orthogonal, restricted triclinic, and general triclinic simulation boxes and how LAMMPS rotates a general triclinic box to be restricted triclinic internally.  

The $l x$ , ly, $l z$ keywords are the extent of the simulation box in each dimension. The xlo, xhi, ylo, yhi, zlo, zhi keywords are the lower and upper bounds of the simulation box in each dimension. I.e. $l x=x h i-x l o_{,}$ ). These 9 values are the same for all 3 kinds of boxes. I.e. for a restricted triclinic box, they are the values as if the box were not tilted. For a general triclinic box, they are the values after it is internally rotated to be a restricted triclinic box.  

The xy, xz, yz are the current tilt factors for a triclinic box. They are the same for restricted and general triclinic boxes.  

The avecx, avecy, avecz, bvecx, bvecy, bvecz, cvecx, cvecy, cvecz are the components of the 3 edge vectors of the current general simulation box. If it is an orthogonal box the vectors are along the x, y, z coordinate axes. If it is a restricted triclinic box, the A vector is along the $\mathbf{X}$ axis, the B vector is in the xy plane with a $+\mathrm{y}$ coordinate, and the C vector has a $+\mathbf{Z}$ coordinate, as explained on the Howto_triclinic doc page. If the thermo_modify triclinic/general option is set then they are the A, B, C vector which define the general triclinic box.  

The cella, cellb, cellc, cellalpha, cellbeta, cellgamma keywords correspond to the usual crystallographic quantities that define the periodic simulation box of a crystalline system. See the Howto triclinic page for a precise definition of these quantities in terms of the LAMMPS representation of a restricted triclinic simulation box via lx, ly, lz, yz, xz, xy.  

The pxx,pyy,pzz,pxy,pxz,pyz keywords are the 6 components of the symmetric pressure tensor for the system. See the compute pressure command doc page for details of how it is calculated.  

If the thermo_modify triclinic/general option is set then the 6 components will be output as values consistent with the orientation of the general triclinic box relative to the standard xyz coordinate axes. If this keyword is not used, the values will be consistent with the orientation of the restricted triclinic box (which aligns with the xyz coordinate axes). As explained on the Howto_triclinic doc page, even if the simulation box is created as a general triclinic box, internally LAMMPS uses a restricted triclinic box.  

Note that because the pressure tensor components are computed using force vectors and atom coordinates, both of which are rotated in the general versus restricted triclinic representation, the values will typically be different for the two cases.  

The fmax and fnorm keywords are useful for monitoring the progress of an energy minimization. The fmax keyword calculates the maximum force in any dimension on any atom in the system, or the infinity-norm of the force vector for the system. The fnorm keyword calculates the 2-norm or length of the force vector.  

The nbuild and ndanger keywords are useful for monitoring neighbor list builds during a run. Note that both these values are also printed with the end-of-run statistics. The nbuild keyword is the number of re-builds during the current run. The ndanger keyword is the number of re-builds that LAMMPS considered potentially “dangerous”. If atom movement triggered neighbor list rebuilding (see the neigh_modify command), then dangerous reneighborings are those that were triggered on the first timestep atom movement was checked for. If this count is non-zero you may wish to reduce the delay factor to ensure no force interactions are missed by atoms moving beyond the neighbor skin distance before a rebuild takes place.  

For output values from a compute or fix or variable, the bracketed index I used to index a vector, as in $c_{-}I D/I J$ or $f_{-}I D/I J$ or v_name[I], can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $\mathbf{\overline{{\rho}}}^{\mathbf{6}\mathbf{*}}\mathbf{\overline{{n}}}^{\mathbf{,}\mathbf{,}}$ or $\mathbf{\tilde{\Sigma}}^{66}\mathbf{n}^{*}{}^{,}$ or $\ '_{\mathrm{m}}\ast_{\mathrm{n}}\cdots$ . If $\Nu=$ the size of the vector, then an asterisk with no numeric values means all indices from 1 to N. A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from n to N (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual elements of the vector had been listed one by one. E.g. these 2 thermo_style commands are equivalent, since the compute temp command creates a global vector with 6 values.  

compute myTemp all temp   
thermo_style custom step temp etotal c_myTemp[\*]   
thermo_style custom step temp etotal & c_myTemp[1] c_myTemp[2] c_myTemp[3] & c_myTemp[4] c_myTemp[5] c_myTemp[6]  

![](images/7daf329411ecee0ac1bac417cffa0122dd55923b8429a700fda4c01c75ba7250.jpg)  

# Note  

For a vector-style variable, only the wildcard forms “\*n” or $\overline{{\mathbf{\omega}}}_{\mathrm{m}}^{*}\mathfrak{n}^{,}$ are allowed. You must specify the upper bound, because vector-style variable lengths are not determined until the variable is evaluated. If n is specified larger than the vector length turns out to be, zeroes are output for missing vector values.  

The $c_{-}I D$ and $c_{-}I D/I J$ and c_ID[I][J] keywords allow global values calculated by a compute to be output. As discussed on the compute doc page, computes can calculate global, per-atom, local, and per-grid values. Only global values can be referenced by this command. However, per-atom compute values for an individual atom can be referenced in a equal-style variable and the variable referenced by thermo_style custom, as discussed below. See the discussion above for how the I in $c_{-}I D/I J$ can be specified with a wildcard asterisk to effectively specify multiple values from a global compute vector.  

The ID in the keyword should be replaced by the actual ID of a compute that has been defined elsewhere in the input script. See the compute command for details. If the compute calculates a global scalar, vector, or array, then the keyword formats with 0, 1, or 2 brackets will reference a scalar value from the compute.  

Note that some computes calculate “intensive” global quantities like temperature; others calculate “extensive” global quantities like kinetic energy that are summed over all atoms in the compute group. Intensive quantities are printed directly without normalization by thermo_style custom. Extensive quantities may be normalized by the total number of atoms in the simulation (NOT the number of atoms in the compute group) when output, depending on the thermo_modify norm option being used.  

The $f_{-}I D$ and f_ID[I] and f_ID[I][J] keywords allow global values calculated by a fix to be output. As discussed on the $f\alpha$ doc page, fixes can calculate global, per-atom, local, and per-grid values. Only global values can be referenced by this command. However, per-atom fix values can be referenced for an individual atom in a equal-style variable and the variable referenced by thermo_style custom, as discussed below. See the discussion above for how the I in $f_{-}I D/I J$ can be specified with a wildcard asterisk to effectively specify multiple values from a global fix vector.  

The ID in the keyword should be replaced by the actual ID of a fix that has been defined elsewhere in the input script. See the $f\boldsymbol{a}\boldsymbol{x}$ command for details. If the fix calculates a global scalar, vector, or array, then the keyword formats with 0, 1, or 2 brackets will reference a scalar value from the fix.  

Note that some fixes calculate “intensive” global quantities like timestep size; others calculate “extensive” global quantities like energy that are summed over all atoms in the fix group. Intensive quantities are printed directly without normalization by thermo_style custom. Extensive quantities may be normalized by the total number of atoms in the simulation (NOT the number of atoms in the fix group) when output, depending on the thermo_modify norm option being used.  

The $\nu.$ _name keyword allow the current value of a variable to be output. The name in the keyword should be replaced by the variable name that has been defined elsewhere in the input script. Only equal-style and vector-style variables can be referenced; the latter requires a bracketed term to specify the Ith element of the vector calculated by the variable. However, an equal-style variable can use an atom-style variable in its formula indexed by the ID of an individual atom. This is a way to output a specific atom’s per-atom coordinates or other per-atom properties in thermo output. See the variable command for details. Note that variables of style equal and vector and atom define a formula which can reference per-atom properties or thermodynamic keywords, or they can invoke other computes, fixes, or variables when evaluated, so this is a very general means of creating thermodynamic output.  

Note that equal-style and vector-style variables are assumed to produce “intensive” global quantities, which are thus printed as-is, without normalization by thermo_style custom. You can include a division by “natoms” in the variable formula if this is not the case.  

# 1.106.4 Restrictions  

This command must come after the simulation box is defined by a read_data, read_restart, or create_box command.  

# 1.106.5 Related commands  

thermo, thermo_modify, fix_modify, compute temp, compute pressure  

# 1.106.6 Default  

# 1.107.2 Examples  

<html><body><table><tr><td>third</td><td>order 1 regular 0.000001</td><td></td></tr><tr><td>third</td><td>order</td><td>1 eskm 0.000001</td></tr><tr><td>third</td><td></td><td>order 3 regular 0.00004 file third_order.dat</td></tr><tr><td>third (</td><td>order</td><td>r 5 eskm 0.00000001 file third_order.dat binary yes</td></tr></table></body></html>  

# 1.107.3 Description  

Calculate the third order force constant tensor by finite difference of the selected group,  

$$
\Phi_{i j k}^{\alpha\beta\gamma}=\frac{\partial^{3}U}{\partial x_{i,\alpha}\partial x_{j,\beta}\partial x_{k,\gamma}}
$$  

where Phi is the third order force constant tensor.  

The output of the command is the tensor, three elements at a time. The three elements correspond to the three gamma elements for a specific i/alpha/j/beta/k. The initial five numbers are i, alpha, j, beta, and $\mathrm{k\Omega}$ respectively.  

If the style eskm is selected, the tensor will be using energy units of $10\mathrm{J/mol}$ . These units conform to eskm style from the dynamical_matrix command, which will simplify operations using dynamical matrices with third order tensors.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 1.107.4 Restrictions  

The command collects a 9 times the number of atoms in the group on every single MPI rank, so the memory requirements can be very significant for large systems.  

This command is part of the PHONON package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 1.107.5 Related commands  

fix phonon dynamical_matrix  

# 1.107.6 Default  

The default settings are file $=$ “third_order.dat”, binary $=$ no  

# 1.108 timer command  

# 1.108.1 Syntax  

• args $=$ one or more of off or loop or normal or full or sync or nosync or timeout or every off $\mathbf{\mu}=\mathrm{do}$ not collect or print any timing information $\mathrm{loop}=$ collect only the total time for the simulation loop normal $=$ collect timer information broken down by sections (default) ${\mathrm{full}}={\mathrm{like}}$ normal but also include CPU and thread utilization sync $=$ explicitly synchronize MPI tasks between sections nosync = do not synchronize MPI tasks between sections (default) timeout elapse $=$ set wall time limit to elapse every Ncheck $=$ perform timeout check every Ncheck steps  

# 1.108.2 Examples  

timer full sync   
timer timeout 2:00:00 every 100   
timer loop  

# 1.108.3 Description  

Select the level of detail at which LAMMPS performs its CPU timings. Multiple keywords can be specified with the timer command. For keywords that are mutually exclusive, the last one specified takes precedence.  

During a simulation run LAMMPS collects information about how much time is spent in different sections of the code and thus can provide information for determining performance and load imbalance problems. This can be done at different levels of detail and accuracy. For more information about the timing output, see the Run output doc page.  

The off setting will turn all time measurements off. The loop setting will only measure the total time for a run and not collect any detailed per section information. With the normal setting, timing information for portions of the timestep (pairwise calculations, neighbor list construction, output, etc) are collected as well as information about load imbalances for those sections across processors. The full setting adds information about CPU utilization and thread utilization, when multi-threading is enabled.  

With the sync setting, all MPI tasks are synchronized at each timer call which measures load imbalance for each section more accurately, though it can also slow down the simulation by prohibiting overlapping independent computations on different MPI ranks Using the nosync setting (which is the default) turns this synchronization off.  

With the timeout keyword a wall time limit can be imposed, that affects the run and minimize commands. This can be convenient when calculations have to comply with execution time limits, e.g. when running under a batch system when you want to maximize the utilization of the batch time slot, especially for runs where the time per timestep varies much and thus it becomes difficult to predict how many steps a simulation can perform for a given wall time limit. This also applies for difficult to converge minimizations. The timeout elapse value should be somewhat smaller than the maximum wall time requested from the batch system, as there is usually some overhead to launch jobs, and it is advisable to write out a restart after terminating a run due to a timeout.  

The timeout timer starts when the command is issued. When the time limit is reached, the run or energy minimization will exit on the next step or iteration that is a multiple of the Ncheck value which can be set with the every keyword. Default is checking every 10 steps. After the timer timeout has expired all subsequent run or minimize commands in the input script will be skipped. The remaining time or timer status can be accessed with the thermo variable timeremain, which will be zero, if the timeout is inactive (default setting), it will be negative, if the timeout time is expired and positive if there is time remaining and in this case the value of the variable are the number of seconds remaining.  

When the timeout key word is used a second time, the timer is restarted with a new time limit. The timeout elapse value can be specified as off or unlimited to impose a no timeout condition (which is the default). The elapse setting can be specified as a single number for seconds, two numbers separated by a colon (MM:SS) for minutes and seconds, or as three numbers separated by colons for hours, minutes, and seconds (H:MM:SS).  

The every keyword sets how frequently during a run or energy minimization the wall clock will be checked. This check count applies to the outer iterations or time steps during minimizations or r-RESPA runs, respectively. Checking for timeout too often, can slow a calculation down. Checking too infrequently can make the timeout measurement less accurate, with the run being stopped later than desired.  

![](images/057ad7684a86fcc8db462b5a58c24bc60e3739c405ebbdbac08d39f1d064c02c.jpg)  

# Note  

Using the full and sync options provides the most detailed and accurate timing information, but can also have a negative performance impact due to the overhead of the many required system calls. It is thus recommended to use these settings only when testing tests to identify performance bottlenecks. For calculations with few atoms or a very large number of processors, even the normal setting can have a measurable negative performance impact. In those cases you can just use the loop or off setting.  

# 1.108.4 Restrictions  

none  

# 1.108.5 Related commands  

run post no, kspace_modify fftbench  

# 1.108.6 Default  

timer normal nosync timer timeout off timer every 10  

# 1.109 timestep command  

# 1.109.1 Syntax  

When the run style is respa, dt is the timestep for the outer loop (largest) timestep.  

1.109.4 Restrictions none  

# 1.109.5 Related commands  

fix dt/reset, run, run_style respa, units  

# 1.109.6 Default  

<html><body><table><tr><td>choiceofunits</td><td>time units</td><td>default timestep size</td></tr><tr><td>lj</td><td>T</td><td>0.005 t</td></tr><tr><td>real</td><td>fs</td><td>1.0 fs</td></tr><tr><td>metal</td><td>ps</td><td>0.001 ps</td></tr><tr><td>si</td><td>S</td><td>1.0e-8 s (10 ns)</td></tr><tr><td>cgs</td><td>S</td><td>1.0e-8 s (10 ns)</td></tr><tr><td>electron</td><td>fs</td><td>0.001 fs</td></tr><tr><td>micro</td><td>us</td><td>2.0 μs</td></tr><tr><td>nano</td><td>ns</td><td>0.00045 ns</td></tr></table></body></html>  

# 1.110 uncompute command  

# 1.110.1 Syntax  

# 1.110.6 Default  

none  

# 1.111 undump command  

# 1.111.1 Syntax  

• dump- $\mathrm{{\cdot}I D=I D}$ of previously defined dump  

# 1.111.2 Examples  

undump mine undump 2  

# 1.111.3 Description  

Turn off a previously defined dump so that it is no longer active. This closes the file associated with the dump.  

1.111.4 Restrictions none  

1.111.5 Related commands dump  

# 1.111.6 Default  

none  

# 1.112 unfix command  

# 1.112.1 Syntax  

1.112.4 Restrictions none  

1.112.5 Related commands fix  

# 1.112.6 Default  

none  

# 1.113 units command  

# 1.113.1 Syntax  

• style $=l j$ or real or metal or si or cgs or electron or micro or nano  

# 1.113.2 Examples  

<html><body><table><tr><td>units metal</td></tr><tr><td>units 1j</td></tr><tr><td></td></tr></table></body></html>  

# 1.113.3 Description  

This command sets the style of units used for a simulation. It determines the units of all quantities specified in the input script and data file, as well as quantities output to the screen, log file, and dump files. Typically, this command is used at the very beginning of an input script.  

For all units except $l j$ , LAMMPS uses physical constants from www.physics.nist.gov. For the definition of kcal in real units, LAMMPS uses the thermochemical calorie $=4.184{\mathrm{~J}}$ .  

The choice you make for units simply sets some internal conversion factors within LAMMPS. This means that any simulation you perform for one choice of units can be duplicated with any other unit setting LAMMPS supports. In this context “duplicate” means the particles will have identical trajectories and all output generated by the simulation will be identical. This will be the case for some number of timesteps until round-off effects accumulate, since the conversion factors for two different unit systems are not identical to infinite precision.  

To perform the same simulation in a different set of units you must change all the unit-based input parameters in your input script and other input files (data file, potential files, etc) correctly to the new units. And you must correctly convert all output from the new units to the old units when comparing to the original results. That is often not simple to do.  

Potential or table files may have a UNITS: tag included in the first line indicating the unit style those files were created for. If the tag exists, its value will be compared to the chosen unit style and LAMMPS will stop with an error message if there is a mismatch. In some select cases and for specific combinations of unit styles, LAMMPS is capable of automatically converting potential parameters from a file. In those cases, a warning message signaling that an automatic conversion has happened is printed to the screen.  

For style $l j$ , all quantities are unitless. Without loss of generality, LAMMPS sets the fundamental quantities mass, $\sigma$ , $\varepsilon$ , and the Boltzmann constant $k_{B}=1$ . The masses, distances, energies you specify are multiples of these fundamental values. The formulas relating the reduced or unitless quantity (with an asterisk) to the same quantity with units is also given. Thus you can use the mass, $\sigma$ , and $\varepsilon$ values for a specific material and convert the results from a unitless LJ simulation into physical quantities. Please note that using these three properties as base, your unit of time has to conform to the relation $\begin{array}{r}{\varepsilon=\frac{m\sigma^{2}}{\tau^{2}}}\end{array}$ mτσ2 2 since energy is a derived unit (in SI units you equivalently have the relation 1J = 1 kgs·2m )  

• mass = mass or m, where M∗ = Mm   
• distance $=\sigma$ , where $\begin{array}{r}{x^{*}=\frac{x}{\sigma}}\end{array}$   
• time $=\tau$ , where $\begin{array}{r}{\tau^{*}=\tau\sqrt{\frac{\varepsilon}{m\sigma^{2}}}}\end{array}$   
• energy $=\varepsilon$ , where $\begin{array}{r}{E^{*}=\frac{E}{\varepsilon}}\end{array}$   
• velocity $=\frac{\sigma}{\tau}$ , where $\begin{array}{r}{\nu^{*}=\nu\frac{\tau}{\sigma}}\end{array}$   
• force $\begin{array}{r}{{}=\frac{\varepsilon}{\sigma}}\end{array}$ , where $\begin{array}{r}{f^{*}=f{\frac{\sigma}{\varepsilon}}}\end{array}$   
• torque $=\varepsilon$ , where $\begin{array}{r}{t^{*}=\frac{t}{\varepsilon}}\end{array}$   
• temperature $=$ reduced LJ temperature, where $\begin{array}{r}{T^{*}=\frac{T k_{B}}{\varepsilon}}\end{array}$   
• pressure $=$ reduced LJ pressure, where $\begin{array}{r}{p^{*}=p\frac{\sigma^{3}}{\varepsilon}}\end{array}$   
• dynamic viscosity $=$ reduced LJ viscosity, where $\begin{array}{r}{\eta^{\ast}=\eta{\frac{\sigma^{3}}{\varepsilon\tau}}}\end{array}$   
• charge = reduced LJ charge, where q∗ = q √4π1ε0σε   
• dipole $=$ reduced LJ dipole, moment where $\mu^{*}=\mu\frac{1}{\sqrt{4\pi\varepsilon_{0}\sigma^{3}\varepsilon}}$   
• electric field = force/charge, where E∗ = E 4πεε0σεσ   
• density $=$ mass/volume, where $\rho^{*}=\rho\frac{\sigma^{d i m}}{m}$  

Note that for LJ units, the default mode of thermodynamic output via the thermo_style command is to normalize all extensive quantities by the number of atoms. E.g. potential energy is extensive because it is summed over atoms, so it is output as energy/atom. Temperature is intensive since it is already normalized by the number of atoms, so it is output as-is. This behavior can be changed via the thermo_modify norm command.  

For style real, these are the units:  

• mass $=$ grams/mole   
• distance $=$ Angstroms   
• time $=$ femtoseconds   
• energy $=$ kcal/mol   
• velocity $=$ Angstroms/femtosecond   
• force $=\mathrm{(kcal/mol)}$ )/Angstrom   
• torque $=\mathrm{kcal/mol}$   
• temperature $=$ Kelvin   
• pressure $=$ atmospheres   
• dynamic viscosity $=$ Poise   
• charge $=$ multiple of electron charge (1.0 is a proton)   
• dipole $=$ charge\*Angstroms   
• electric field $=$ volts/Angstrom   
• density $={\mathrm{g}}/{\mathrm{cm}}^{\wedge}{\mathrm{dim}}$  

For style metal, these are the units:  

• mass $=$ grams/mole   
• distance $=$ Angstroms   
• time $=$ picoseconds   
• energy $\mathbf{\tau}=\operatorname{eV}$   
• velocity $=$ Angstroms/picosecond   
• force $=$ eV/Angstrom   
• torque $\mathbf{\Gamma}=\mathbf{eV}$   
• temperature $=$ Kelvin   
• pressure $=$ bars   
• dynamic viscosity $=$ Poise   
• charge $=$ multiple of electron charge (1.0 is a proton)   
• dipole $=$ charge\*Angstroms   
• electric field $=$ volts/Angstrom   
• density $=$ gram/cm^dim  

For style si, these are the units:  

• mass $=$ kilograms   
• distance $=$ meters   
• time $=$ seconds   
• energy $=$ Joules   
• velocity $=$ meters/second   
• force $=$ Newtons   
• torque $=$ Newton-meters   
• temperature $=$ Kelvin   
• pressure $=$ Pascals   
• dynamic viscosity $=$ Pascal\*second   
• charge $=$ Coulombs (1.6021765e-19 is a proton)   
• dipole $=$ Coulombs\*meters   
• electric field $=$ volts/meter   
• density $=$ kilograms/meter^dim  

For style cgs, these are the units:  

• mass $=$ grams   
• distance $=$ centimeters   
• time $=$ seconds   
• energy $=$ ergs   
• velocity $=$ centimeters/second   
• force $=$ dynes   
• torque $=$ dyne-centimeters   
• temperature $=$ Kelvin   
pressure $=\mathrm{dyne/cm}^{\wedge}2$ or barye $=1.0\mathrm{e}{-6}$ bars   
• dynamic viscosity $=$ Poise   
• charge $=$ statcoulombs or esu (4.8032044e-10 is a proton)   
• dipole $=$ statcoul- $\mathrm{cm}=10^{\wedge}18$ debye   
• electric field $=$ statvolt/cm or dyne/esu   
• density $={\mathrm{grams}}/{\mathrm{cm}}^{\wedge}{\mathrm{dim}}$  

For style electron, these are the units:  

• mass $=$ atomic mass units   
• distance $=$ Bohr   
• time $=$ femtoseconds   
• energy $=$ Hartrees   
• velocity $=$ Bohr/atomic time units [1.03275e-15 seconds]   
• force $=$ Hartrees/Bohr   
• temperature $=$ Kelvin   
• pressure $=$ Pascals   
• charge $=$ multiple of electron charge (1.0 is a proton)   
• dipole moment $=$ Debye   
• electric field $=$ volts/cm  

For style micro, these are the units:  

• mass $=$ picograms   
• distance $=$ micrometers   
• time $=$ microseconds   
• energy $=$ picogram-micrometer^2/microsecond^2   
• velocity $=$ micrometers/microsecond   
• force $=$ picogram-micrometer/microsecond^2   
• torque $=$ picogram-micrometer^2/microsecond^2   
• temperature $=$ Kelvin   
• pressure $=$ picogram/(micrometer-microsecond^2)   
• dynamic viscosity $=$ picogram/(micrometer-microsecond)   
• charge $=$ picocoulombs (1.6021765e-7 is a proton)   
• dipole $=$ picocoulomb-micrometer   
• electric field $=$ volt/micrometer   
• density $=$ picograms/micrometer^dim  

For style nano, these are the units:  

• mass $=$ attograms   
• distance $=$ nanometers   
• time $=$ nanoseconds   
• energy $=$ attogram-nanometer^2/nanosecond^2   
• velocity $=$ nanometers/nanosecond   
• force $=$ attogram-nanometer/nanosecond^2   
• torque $=$ attogram-nanometer^2/nanosecond^2   
• temperature $=$ Kelvin   
• pressure $=$ attogram/(nanometer-nanosecond^2)   
• dynamic viscosity $=$ attogram/(nanometer-nanosecond)   
• charge $=$ multiple of electron charge (1.0 is a proton)   
• dipole $=$ charge-nanometer   
• electric field $=$ volt/nanometer   
• density $=$ attograms/nanometer^dim  

The units command also sets the timestep size and neighbor skin distance to default values for each style:  

• For style $l j$ these are $\mathrm{dt}=0.005~\tau$ and skin $\phantom{}_{1}=0.3~\sigma$ .   
• For style real these are $\mathrm{dt}=1.0$ femtoseconds and $\mathrm{skin}=2.0$ Angstroms.   
• For style metal these are $\mathrm{dt}=0.001$ picoseconds and skin $=2.0$ Angstroms.   
• For style $_{s i}$ these are $\mathrm{{1t=1.0e.8}}$ seconds and skin $=0.001$ meters.   
• For style cgs these are $\mathrm{dt}=1.0\mathrm{e}{}{}{\cdot}8$ seconds and skin $=0.1$ centimeters.   
• For style electron these are $\mathrm{dt}=0.001$ femtoseconds and skin $=2.0$ Bohr.   
• For style micro these are $\mathrm{dt}=2.0$ microseconds and skin $=0.1$ micrometers.   
• For style nano these are $\mathrm{dt}=0.00045$ nanoseconds and skin $=0.1$ nanometers.  

# 1.113.4 Restrictions  

This command cannot be used after the simulation box is defined by a read_data or create_box command.  

# 1.113.5 Related commands  

none  

# 1.113.6 Default  

• name $=$ name of variable to define   
• style $=$ delete or atomfile or file or format or getenv or index or internal or loop or python or string or timer or uloop or universe or world or equal or vector or atom   
delete $=\mathrm{no}$ args   
atomfile arg $=$ filename   
file arg $=$ filename   
format args $=$ vname fstr vname $=$ name of equal-style variable to evaluate fstr = C-style format string   
getenv arg $=$ one string   
index args $-$ one or more strings   
internal arg = numeric value   
loop args = N N = integer size of loop, loop from 1 to N inclusive   
loop args = N pad N = integer size of loop, loop from 1 to N inclusive pad = all values will be same length, e.g. 001, 002, ..., 100   
loop args = N1 N2 N1,N2 = loop from N1 to N2 inclusive   
loop args = N1 N2 pad N1,N2 = loop from N1 to N2 inclusive pad = all values will be same length, e.g. 050, 051, ..., 100   
python arg = function   
string arg = one string   
timer arg = no arguments   
uloop args = N N = integer size of loop   
uloop args = N pad N = integer size of loop pad = all values will be same length, e.g. 001, 002, ..., 100   
universe args = one or more strings   
world args = one string for each partition of processors   
equal or vector or atom args = one formula containing numbers, thermo keywords, math o   
$\hookrightarrow$ built-in functions, atom values and vectors, compute/fix/variable references   
numbers $=0.0$ , 100, -5.4, 2.8e-4, etc   
constants = PI, version, on, off, true, false, yes, no   
thermo keywords = vol, ke, press, etc from thermo_style   
math operators = (), -x, x+y, x-y, x\*y, x/y, x^y, $\mathrm{_{x}\mathrm{_{/o}^{0}}\mathrm{_{y}}}$ , $\mathbf{x}==\mathbf{y}$ , $\mathrm{x}!=\mathrm{y}$ , $\mathrm{~x~}<\mathrm{~y~}$ , x <= y, $\mathbf{X}\supset\mathbf{y}$ , $\mathbf{x}>=\mathbf{y}$ , x && y, x || y, x |^ y, !x   
math functions = sqrt(x), exp(x), ln(x), log(x), abs(x), $\sin(\upnu)$ , cos(x), tan(x), asin(x), acos(x), atan(x), atan2(y,x), random(x,y,z), normal(x,y,z), ceil(x), floor(x), round(x), ternary(x,y,z), $\mathrm{{ramp}(\mathrm{{x},\mathrm{{y})}}}$ , stagger(x,y), logfreq(x,y,z), logfreq2(x,y,z), logfreq3(x,y,z), stride(x,y,z), stride2(x,y,z,a,b,c), vdisplace(x,y), swiggle(x,y,z), cwiggle(x,y,z), sign(x)   
group functions = count(group), mass(group), charge(group), xcm(group,dim), vcm(group,dim), fcm(group,dim), bound(group,dir), gyration(group), ke(group), angmom(group,dim), torque(group,dim), inertia(group,dimdim), omega(group,dim)   
region functions $=$ count(group,region), mass(group,region), charge(group,region), xcm(group,dim,region), vcm(group,dim,region), fcm(group,dim,region),  

bound(group,dir,region), gyration(group,region), ke(group,reigon), angmom(group,dim,region), torque(group,dim,region), inertia(group,dimdim,region), omega(group,dim,region) special functions = sum(x), min(x), max(x), ave(x), trap(x), slope(x), sort(x), rsort(x),␣ $\mathrm{{\ell\togmask(x)}}$ , rmask(x), grmask(x,y), next(x), is_file(name), is_os(name), extract_setting(name), $\mathrm{\Gamma_{\rightarrow}l a b e l{2t y p e(k i n d,l a b e l)}}$ , is_typelabel(kind,label), is_timeout() feature functions = is_available(category,feature), is_active(category,feature), is_defined(category, $\hookrightarrow$ id) atom value = id[i], mass[i], type[i], mol[i], x[i], y[i], z[i], vx[i], vy[i], vz[i], fx[i], fy[i], fz[i], q[i] atom vector = id, mass, type, mol, radius, q, x, y, z, vx, vy, vz, fx, fy, fz custom atom property = i_name, d_name, i_name[i], d_name[i], i2_name[i], d2_name[i], i2_ $\hookrightarrow$ name[i][j], d2_name[i][j] compute references = c_ID, c_ID[i], c_ID[i][j], C_ID, C_ID[i], C_ID[i][j] fix references = f_ID, f_ID[i], f_ID[i][j], F_ID, F_ID[i], F_ID[i][j] variable references $=\mathrm{~v~}$ _name, v_name[i] vector initialization $=$ [1,3,7,10] (for vector variables only)  

# 1.114.2 Examples  

variable x index run1 run2 run3 run4 run5 run6 run7 run8   
variable LoopVar loop $\$1$   
variable beta equal temp/3.0   
variable b1 equal $\mathrm{x}[234]+0.5^{*}\mathrm{vol}$   
variable b1 equal "x[234] + 0.5\*vol"   
variable b equal $\mathrm{{xcm}(\mathrm{{mol}1,x)/2.0}}$   
variable b equal c_myTemp   
variable b atom x\*y/vol   
variable foo string myfile   
variable foo internal 3.5   
variable myPy python increase   
variable f file values.txt   
variable temp world 300.0 310.0 320.0 \${Tfinal}   
variable x universe 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15   
variable x uloop 15 pad   
variable str format $\textbf{x}_{\mathrm{/0.6g}}^{\mathrm{07}}$   
variable myvec vector [1,3,7,10]   
variable x delete   
variable start timer   
other commands   
variable stop timer   
print "Elapsed time: \$(v_stop-v_start:%.6f)"  

# 1.114.3 Description  

This command assigns one or more strings to a variable name for evaluation later in the input script or during a simulation.  

Variables can thus be useful in several contexts. A variable can be defined and then referenced elsewhere in an input script to become part of a new input command. For variable styles that store multiple strings, the next command can be used to increment which string is assigned to the variable. Variables of style equal store a formula which when evaluated produces a single numeric value which can be output either directly (see the print, fix print, and run every commands) or as part of thermodynamic output (see the thermo_style command), or used as input to an averaging fix (see the fix ave/time command). Variables of style vector store a formula which produces a vector of such values which can be used as input to various averaging fixes, or elements of which can be part of thermodynamic output. Variables of style atom store a formula which when evaluated produces one numeric value per atom which can be output to a dump file (see the dump custom command) or used as input to an averaging fix (see the fix ave/chunk and fix ave/atom commands). Variables of style atomfile can be used anywhere in an input script that atom-style variables are used; they get their per-atom values from a file rather than from a formula. Variables of style python can be hooked to Python functions using code you provide, so that the variable gets its value from the evaluation of the Python code. Variables of style internal are used by a few commands which set their value directly.  

# Note  

As discussed on the Commands parse doc page, an input script can use “immediate” variables, specified as $\$1$ (formula) with parenthesis, where the numeric formula has the same syntax as equal-style variables described on this page. This is a convenient way to evaluate a formula immediately without using the variable command to define a named variable and then evaluate that variable. The formula can include a trailing colon and format string which determines the precision with which the numeric value is generated. This is also explained on the Commands parse doc page.  

In the discussion that follows, the “name” of the variable is the arbitrary string that is the first argument in the variable command. This name can only contain alphanumeric characters and underscores. The “string” is one or more of the subsequent arguments. The “string” can be simple text as in the first example above, it can contain other variables as in the second example, or it can be a formula as in the third example. The “value” is the numeric quantity resulting from evaluation of the string. Note that the same string can generate different values when it is evaluated at different times during a simulation.  

# Note  

When an input script line is encountered that defines a variable of style equal or vector or atom or python that contains a formula or Python code, the formula is NOT immediately evaluated. It will be evaluated every time when the variable is used instead. If you simply want to evaluate a formula in place you can use as so-called. See the section below about “Immediate Evaluation of Variables” for more details on the topic. This is also true of a format style variable since it evaluates another variable when it is invoked.  

Variables of style equal and vector and atom can be used as inputs to various other commands which evaluate their formulas as needed, e.g. at different timesteps during a run. In this context, variables of style timer or internal or python can be used in place of an equal-style variable, with the following two caveats.  

First, internal-style variables can be used except by commands that set the value stored by the internal variable. When the LAMMPS command evaluates the internal-style variable, it will use the value set (internally) by another command. Second, python-style variables can be used so long as the associated Python function, as defined by the python command, returns a numeric value. When the LAMMPS command evaluates the python-style variable, the Python function will be executed.  

![](images/0e55eb71df8c64e52c266ef747ca2006b36de4bfd79e37eacd67811db0853c95.jpg)  

# Note  

When a variable command is encountered in the input script and the variable name has already been specified, the command is ignored. This means variables can NOT be re-defined in an input script (with two exceptions, read further). This is to allow an input script to be processed multiple times without resetting the variables; see the jump or include commands. It also means that using the command-line switch -var will override a corresponding index variable setting in the input script.  

There are two exceptions to this rule. First, variables of style string, getenv, internal, equal, vector, atom, and python  

ARE redefined each time the command is encountered. This allows these style of variables to be redefined multiple times in an input script. In a loop, this means the formula associated with an equal or atom style variable can change if it contains a substitution for another variable, e.g. $\$1$ or $\mathbf{V}\_\mathbf{X}$ .  

Second, as described below, if a variable is iterated on to the end of its list of strings via the next command, it is removed from the list of active variables, and is thus available to be re-defined in a subsequent variable command. The delete style does the same thing.  

Variables are not deleted by the clear command with the exception of atomfile-style variables.  

The Commands parse page explains how occurrences of a variable name in an input script line are replaced by the variable’s string. The variable name can be referenced as $\$1$ if the name “x” is a single character, or as $\mathbb{S}\{\mathrm{LoopVar}\}$ if the name “LoopVar” is one or more characters.  

As described below, for variable styles index, loop, file, universe, and uloop, which string is assigned to a variable can be incremented via the next command. When there are no more strings to assign, the variable is exhausted and a flag is set that causes the next jump command encountered in the input script to be skipped. This enables the construction of simple loops in the input script that are iterated over and then exited from.  

As explained above, an exhausted variable can be re-used in an input script. The delete style also removes the variable, the same as if it were exhausted, allowing it to be redefined later in the input script or when the input script is looped over. This can be useful when breaking out of a loop via the $i f$ and jump commands before the variable would become exhausted. For example,  

label loop   
variable a loop 5   
print "A = \$a"   
if $^{11}\S\mathrm{a}>2^{11}$ then "jump in.script break"   
next a   
jump in.script loop   
label break   
variable a delete  

The next sections describe in how all the various variable styles are defined and what they store. The styles are listed alphabetically, except for the equal and vector and atom styles, which are explained together after all the others.  

Many of the styles store one or more strings. Note that a single string can contain spaces (multiple words), if it is enclosed in quotes in the variable command. When the variable is substituted for in another input script command, its returned string will then be interpreted as multiple arguments in the expanded command.  

For the atomfile style, a filename is provided which contains one or more sets of values, to assign on a per-atom basis to the variable. The format of the file is described below.  

When an atomfile-style variable is defined, the file is opened and the first set of per-atom values are read and stored with the variable. This means the variable can then be evaluated as many times as desired and will return those values. There are two ways to cause the next set of per-atom values from the file to be read: use the next command or the next() function in an atom-style variable, as discussed below. Unlike most variable styles, which remain defined, atomfile-style variables are deleted during a clear command.  

The rules for formatting the file are as follows. Each time a set of per-atom values is read, a non-blank line is searched for in the file. The file is read line by line but only up to 254 characters are used. The rest are ignored. A comment character “#” can be used anywhere on a line and all text following and the “#” character are ignored; text starting with the comment character is stripped. Blank lines are skipped. The first non-blank line is expected to contain a single integer number as the count $N$ of per-atom lines to follow. $N$ can be the total number of atoms in the system or less, indicating that data for a subset is read. The next N lines must consist of two numbers, the atom-ID of the atom for which a value is set followed by a floating point number with the value. The atom-IDs may be listed in any order.  

![](images/11dd348f7b0bb11a76cfef6607f4ea6f70cb0c0f8844a47025f3b2e84b1994a9.jpg)  

# Note  

Every time a set of per-atom lines is read, the value of the atomfile variable for all atoms is first initialized to 0.0.   
Thus values for atoms whose ID do not appear in the set in the file will remain at 0.0.  

Below is a small example for the atomfile variable file format:  

<html><body><table><tr><td># first set 4</td></tr><tr><td># atom-ID value</td></tr><tr><td>31</td></tr><tr><td>4 -4</td></tr><tr><td>1 0.5</td></tr><tr><td>2 -0.5</td></tr><tr><td># second set 2</td></tr><tr><td></td></tr><tr><td>21.0</td></tr><tr><td>4 -1.0</td></tr></table></body></html>  

For the file style, a filename is provided which contains a list of strings to assign to the variable, one per line. The strings can be numeric values if desired. See the discussion of the next() function below for equal-style variables, which will convert the string of a file-style variable into a numeric value in a formula.  

When a file-style variable is defined, the file is opened and the string on the first line is read and stored with the variable. This means the variable can then be evaluated as many times as desired and will return that string. There are two ways to cause the next string from the file to be read: use the next command or the next() function in an equal- or atom-style variable, as discussed below.  

The rules for formatting the file are as follows. A comment character “#” can be used anywhere on a line; text starting with the comment character is stripped. Blank lines are skipped. The first “word” of a non-blank line, delimited by white-space, is the “string” assigned to the variable.  

For the format style, an equal-style or compatible variable is specified along with a C-style format string, e.g. “%f” or $\mathrm{{\bf{\hat{\rho}}{\hat{\rho}}{\ q}}}.10\mathrm{{g}}^{\mathrm{{\pmb{\hat{\rho}}}\unboldmath}}$ , which must be appropriate for formatting a double-precision floating-point value and may not have extra characters. The default format is $\mathbf{\tilde{\rho}}^{66}\mathbf{\eta}^{9}\mathbf{\mathrm{.15g}}^{\bullet}\mathbf{\eta}$ . This variable style allows an equal-style variable to be formatted precisely when it is evaluated.  

Note that if you simply wish to print a variable value with desired precision to the screen or logfile via the print or fix print commands, you can also do this by specifying an “immediate” variable with a trailing colon and format string, as part of the string argument of those commands. This is explained on the Commands parse doc page.  

For the getenv style, a single string is assigned to the variable which should be the name of an environment variable. When the variable is evaluated, it returns the value of the environment variable, or an empty string if it not defined. This style of variable can be used to adapt the behavior of LAMMPS input scripts via environment variable settings, or to retrieve information that has been previously stored with the shell putenv command. Note that because environment variable settings are stored by the operating systems, they persist even if the corresponding getenv style variable is deleted, and also are set for sub-shells executed by the shell command.  

For the index style, one or more strings are specified. Initially, the first string is assigned to the variable. Each time a next command is used with the variable name, the next string is assigned. All processors assign the same string to the variable.  

Index-style variables with a single string value can also be set by using the command-line switch -var.  

For the internal style a numeric value is provided. This value will be assigned to the variable until a LAMMPS command sets it to a new value. There are currently only two LAMMPS commands that require internal variables as inputs, because they reset them: create_atoms and fix controller. As mentioned above, an internal-style variable can be used in place of an equal-style variable anywhere else in an input script, e.g. as an argument to another command that allows for equal-style variables.  

The loop style is identical to the index style except that the strings are the integers from 1 to N inclusive, if only one argument $\mathbf{N}$ is specified. This allows generation of a long list of runs (e.g. 1000) without having to list $\mathbf{N}$ strings in the input script. Initially, the string “1” is assigned to the variable. Each time a next command is used with the variable name, the next string (“2”, “3”, etc) is assigned. All processors assign the same string to the variable. The loop style can also be specified with two arguments N1 and N2. In this case the loop runs from N1 to N2 inclusive, and the string N1 is initially assigned to the variable. N1 <= N2 and N2 >= 0 is required.  

For the python style a Python function name is provided. This needs to match a function name specified in a python command which returns a value to this variable as defined by its return keyword. For example these two commands would be self-consistent:  

variable foo python myMultiply python myMultiply return v_foo format f file funcs.py  

The two commands can appear in either order so long as both are specified before the Python function is invoked for the first time.  

Each time the variable is evaluated, the associated Python function is invoked, and the value it returns is also returned by the variable. Since the Python function can use other LAMMPS variables as input, or query interal LAMMPS quantities to perform its computation, this means the variable can return a different value each time it is evaluated.  

The type of value stored in the variable is determined by the format keyword of the python command. It can be an integer (i), floating point (f), or string (s) value. As mentioned above, if it is a numeric value (integer or floating point), then the python-style variable can be used in place of an equal-style variable anywhere in an input script, e.g. as an argument to another command that allows for equal-style variables.  

For the string style, a single string is assigned to the variable. Two differences between this style and using the index style exist: a variable with string style can be redefined, e.g. by another command later in the input script, or if the script is read again in a loop. The other difference is that string performs variable substitution even if the string parameter is quoted.  

The uloop style is identical to the universe style except that the strings are the integers from 1 to N. This allows generation of long list of runs (e.g. 1000) without having to list $\mathbf{N}$ strings in the input script.  

For the universe style, one or more strings are specified. There must be at least as many strings as there are processor partitions or “worlds”. LAMMPS can be run with multiple partitions via the -partition command-line switch. This variable command initially assigns one string to each world. When a next command is encountered using this variable, the first processor partition to encounter it, is assigned the next available string. This continues until all the variable strings are consumed. Thus, this command can be used to run 50 simulations on 8 processor partitions. The simulations will be run one after the other on whatever partition becomes available, until they are all finished. Universe-style variables are incremented using the files “tmp.lammps.variable” and “tmp.lammps.variable.lock” which you will see in your directory during such a LAMMPS run.  

For the world style, one or more strings are specified. There must be one string for each processor partition or “world”. LAMMPS can be run with multiple partitions via the -partition command-line switch. This variable command assigns one string to each world. All processors in the world are assigned the same string. The next command cannot be used with equal-style variables, since there is only one value per world. This style of variable is useful when you wish to run different simulations on different partitions, or when performing a parallel tempering simulation (see the temper command), to assign different temperatures to different partitions.  

For the equal and vector and atom styles, a single string is specified which represents a formula that will be evaluated afresh each time the variable is used. If you want spaces in the string, enclose it in double quotes so the parser will treat it as a single argument. For equal-style variables the formula computes a scalar quantity, which becomes the value of the variable whenever it is evaluated. For vector-style variables the formula must compute a vector of quantities, which becomes the value of the variable whenever it is evaluated. The calculated vector can be of length one, but it cannot be a simple scalar value like that produced by an equal-style compute. I.e. the formula for a vector-style variable must have at least one quantity in it that refers to a global vector produced by a compute, fix, or other vector-style variable. For atom-style variables the formula computes one quantity for each atom whenever it is evaluated.  

Note that equal, vector, and atom variables can produce different values at different stages of the input script or at different times during a run. For example, if an equal variable is used in a fix print command, different values could be printed each timestep it was invoked. If you want a variable to be evaluated immediately, so that the result is stored by the variable instead of the string, see the section below on “Immediate Evaluation of Variables”.  

The next command cannot be used with equal or vector or atom style variables, since there is only one string.  

The formula for an equal, vector, or atom variable can contain a variety of quantities. The syntax for each kind of quantity is simple, but multiple quantities can be nested and combined in various ways to build up formulas of arbitrary complexity. For example, this is a valid (though strange) variable formula:  

variable x equal "pe + c_MyTemp / vol^(1/3)"  

Specifically, a formula can contain numbers, constants, thermo keywords, math operators, math functions, group functions, region functions, special functions, feature functions, atom values, atom vectors, custom atom properties, compute references, fix references, and references to other variables.  

<html><body><table><tr><td>Num- ber</td><td>0.2, 100, 1.0e20, -15.4, etc</td></tr><tr><td>Con- stant</td><td>PI, version, on, off, true, false, yes, no</td></tr><tr><td>Thermo key- words</td><td> vol, pe, ebond, etc</td></tr><tr><td>Math opera- tors</td><td>xj Kv x KII x   x K =< x^K < x K => x > x^K =i x  == x ^Kx Kx /x x-x K+x ‘x-“</td></tr><tr><td>Math func- tions</td><td>sqrt(x), exp(x), ln(x), log(x), abs(x), sin(x), cos(x), tan(x), asin(x), acos(x), atan(x), atan2(y,x), random(x,y,z), normal(x,y,z), ceil(x), floor(x), round(x), ternary(x,y,z), ramp(x,y), stagger(x,y), logfreq(x,y,z), logfreq2(x,y,z), logfreq3(x,y,z), stride(x,y,z), stride2(x,y,z,a,b,c), vdisplace(x,y), swig-</td></tr><tr><td>Group func- tions</td><td>gle(x,y,z), cwiggle(x,y,z), sign(x) count(ID), mass(ID), charge(ID), xcm(ID,dim), vcm(ID,dim), fcm(ID,dim), bound(ID,dir), gyration(ID), ke(ID), angmom(ID,dim), torque(ID,dim), inertia(ID,dimdim), omega(ID,dim)</td></tr><tr><td>Region func- tions</td><td>count(ID,IDR), mass(ID,IDR), charge(ID,IDR), xcm(ID,dim,IDR), vcm(ID,dim,IDR), fcm(ID,dim,IDR),  bound(ID,dir,IDR), gyration(ID,IDR),  ke(ID,IDR),  angmom(ID,dim,IDR), torque(ID,dim,IDR), inertia(ID,dimdim,IDR), omega(ID,dim,IDR)</td></tr><tr><td>Special func- tions</td><td>sum(x), min(x), max(x), ave(x), trap(x), slope(x), sort(x), rsort(x), gmask(x), rmask(x), gr- mask(x,y), next(x),  is_file(name), is_os(name),  extract_setting(name), label2type(kind,label), is_typelabel(kind,label), is_timeoutO)</td></tr><tr><td>Feature func-</td><td>is_available(category,feature), is_active(category,feature), is_defined(category,id)</td></tr><tr><td>tions Atom</td><td>[!]b “[！]zy “[！]<y [！]xy “[！]zA “[！]< “[！]x “[]z “[！] “[！]x “[！]ow “[！]d “[！]ssw “[！]p!</td></tr><tr><td>values Atom</td><td>id, mass, type, mol, x, y, z, vx, vy, vz, fx, fy, fz, q</td></tr><tr><td>vectors Cus- tom atom</td><td>i_name, d_name, i_name[i], d_name[i], i2_name[i], d2_name[i], i2_name[i][j], d_name[i][j]</td></tr><tr><td>proper- ties Com- pute refer-</td><td>c_ID, c_ID[i], c_ID[i][j], C_ID, C_ID[i]</td></tr><tr><td>ences Fix ref- erences</td><td>f_ID,f_ID[i],f_ID[i][j], F_ID, F_ID[i]</td></tr><tr><td>Other vari- ables</td><td>v_name, v_name[i]</td></tr></table></body></html>  

Most of the formula elements produce a scalar value. Some produce a global or per-atom vector of values. Global vectors can be produced by computes or fixes or by other vector-style variables. Per-atom vectors are produced by atom vectors, computes or fixes which output a per-atom vector or array, and variables that are atom-style variables. Math functions that operate on scalar values produce a scalar value; math function that operate on global or per-atom vectors do so element-by-element and produce a global or per-atom vector.  

A formula for equal-style variables cannot use any formula element that produces a global or per-atom vector. A formula for a vector-style variable can use formula elements that produce either a scalar value or a global vector value, but cannot use a formula element that produces a per-atom vector. A formula for an atom-style variable can use formula elements that produce either a scalar value or a per-atom vector, but not one that produces a global vector.  

Atom-style variables are evaluated by other commands that define a group on which they operate, e.g. a dump or compute or $f\boldsymbol{a}\boldsymbol{x}$ command. When they invoke the atom-style variable, only atoms in the group are included in the formula evaluation. The variable evaluates to 0.0 for atoms not in the group.  

# Numbers, constants, and thermo keywords  

Numbers can contain digits, scientific notation (3.0e20,3.0e-20,3.0E20,3.0E-20), and leading minus signs.  

Constants are set at compile time and cannot be changed. PI will return the number 3.14159265358979323846; on, true or yes will return 1.0; off, false or no will return 0.0; version will return a numeric version code of the current LAMMPS version (e.g. version 2 Sep 2015 will return the number 20150902). The corresponding value for newer versions of LAMMPS will be larger, for older versions of LAMMPS will be smaller. This can be used to have input scripts adapt automatically to LAMMPS versions, when non-backwards compatible syntax changes are introduced. Here is an illustrative example (which will not work, since the version has been introduced more recently):  

if \$(version<20140513) then "communicate vel yes" else "comm_modify vel yes"  

The thermo keywords allowed in a formula are those defined by the thermo_style custom command. Thermo keywords that require a compute to calculate their values such as “temp” or “press”, use computes stored and invoked by the thermo_style command. This means that you can only use those keywords in a variable if the style you are using with the thermo_style command (and the thermo keywords associated with that style) also define and use the needed compute. Note that some thermo keywords use a compute indirectly to calculate their value (e.g. the enthalpy keyword uses temp, pe, and pressure). If a variable is evaluated directly in an input script (not during a run), then the values accessed by the thermo keyword must be current. See the discussion below about “Variable Accuracy”.  

# Math Operators  

Math operators are written in the usual way, where the “x” and “y” in the examples can themselves be arbitrarily complex formulas, as in the examples above. In this syntax, “x” and “y” can be scalar values or per-atom vectors. For example, “ke/natoms” is the division of two scalars, where “vy+vz” is the element-by-element sum of two per-atom vectors of y and z velocities.  

Operators are evaluated left to right and have the usual C-style precedence: unary minus and unary logical NOT operator “!” have the highest precedence, exponentiation “^” is next; multiplication and division and the modulo operator $^{66}\%^{!}$ ” are next; addition and subtraction are next; the 4 relational operators “<”, $\mathbf{\hat{\mu}}<=\mathbf{\hat{\mu}}$ , “>”, and $^{\leftarrow}>=^{\cdot}$ are next; the two remaining relational operators $\mathbf{\Sigma}^{66}\mathbf{=}\overline{{\mathbf{\Sigma}}}^{9}$ and “! $!=^{\prime}$ are next; then the logical AND operator “&&”; and finally the logical OR operator “||” and logical XOR (exclusive or) operator “|^” have the lowest precedence. Parenthesis can be used to group one or more portions of a formula and/or enforce a different order of evaluation than what would occur with the default precedence.  

![](images/fa4fb6715ba80aa950e62a6a8b662ffb711aa86ee2b7ea407a4d417228c5ed96.jpg)  

# Note  

Because a unary minus is higher precedence than exponentiation, the formula $\begin{array}{r}{\leftarrow2\land2^{\bullet}{\rangle}}\ {-2\land2^{\bullet}{\rangle}}\end{array}$ will evaluate to 4, not -4. This convention is compatible with some programming languages, but not others. As mentioned, this behavior can be easily overridden with parenthesis; the formula “- $\cdot(2^{\wedge}2)^{,}$ will evaluate to $^{-4}$ .  

The 6 relational operators return either a 1.0 or 0.0 depending on whether the relationship between $\mathbf{X}$ and y is TRUE or FALSE. For example the expression $\mathbf{\chi}<10.0$ in an atom-style variable formula will return 1.0 for all atoms whose $\mathbf{X}$ -coordinate is less than 10.0, and 0.0 for the others. The logical AND operator will return 1.0 if both its arguments  

# 1.114. variable command  

are non-zero, else it returns 0.0. The logical OR operator will return 1.0 if either of its arguments is non-zero, else it returns 0.0. The logical XOR operator will return 1.0 if one of its arguments is zero and the other non-zero, else it returns 0.0. The logical NOT operator returns 1.0 if its argument is 0.0, else it returns 0.0.  

These relational and logical operators can be used as a masking or selection operation in a formula. For example, the number of atoms whose properties satisfy one or more criteria could be calculated by taking the returned per-atom vector of ones and zeroes and passing it to the compute reduce command.  

# Math Functions  

Math functions are specified as keywords followed by one or more parenthesized arguments “x”, “y”, “z”, each of which can themselves be arbitrarily complex formulas. In this syntax, the arguments can represent scalar values or global vectors or per-atom vectors. In the latter case, the math operation is performed on each element of the vector. For example, “sqrt(natoms)” is the sqrt() of a scalar, where “sqrt $\mathbf{\Sigma}(\mathbf{y}^{*}\mathbf{z})^{*}$ yields a per-atom vector with each element being the sqrt() of the product of one atom’s y and z coordinates.  

Most of the math functions perform obvious operations. The $\ln()$ is the natural log; log() is the base $10\log.$  

The random(x,y,z) function takes 3 arguments: $\mathbf{X}=10$ , $\mathbf{y}=\mathbf{h}\mathbf{i}$ , and $\mathbf{z}=\operatorname{seed}$ . It generates a uniform random number between lo and hi. The normal(x,y,z) function also takes 3 arguments: $\mathbf{X}={\mathrm{mu}}$ , $\mathrm{{y}=s i g m a}$ , and $\mathbf{z}=\operatorname{seed}$ . It generates a Gaussian variate centered on mu with variance sigma^2. In both cases the seed is used the first time the internal random number generator is invoked, to initialize it. For equal-style and vector-style variables, every processor uses the same seed so that they each generate the same sequence of random numbers. For atom-style variables, a unique seed is created for each processor, based on the specified seed. This effectively generates a different random number for each atom being looped over in the atom-style variable.  

![](images/f90da8e57fb3089a4593d8e76ccd9f90fe8c6132fcfb666d1e88a07c30cf6a2e.jpg)  

# Note  

Internally, there is just one random number generator for all equal-style and vector-style variables and another one for all atom-style variables. If you define multiple variables (of each style) which use the random() or normal() math functions, then the internal random number generators will only be initialized once, which means only one of the specified seeds will determine the sequence of generated random numbers.  

The ceil(), floor(), and round() functions are those in the C math library. Ceil() is the smallest integer not less than its argument. Floor() if the largest integer not greater than its argument. Round() is the nearest integer to its argument.  

Added in version 7Feb2024.  

The ternary(x,y,z) function is the equivalent of the ternary operator (? and :) in $\mathrm{^C}$ or $\mathrm{C}{+}{+}$ . It takes 3 arguments. The first argument is a conditional. The result of the function is y if $\mathbf{X}$ evaluates to true (non-zero). The result is $\mathbf{Z}$ if $\mathbf{X}$ evaluates to false (zero).  

The ramp(x,y) function uses the current timestep to generate a value linearly interpolated between the specified x,y values over the course of a run, according to this formula:  

value $=\bf{x}+\tau(\bf{y}-\bf{x})\tau^{*}$ (timestep-startstep) / (stopstep-startstep)  

The run begins on startstep and ends on stopstep. Startstep and stopstep can span multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this. If called in between runs or during a run $O$ command, the ramp(x,y) function will return the value of x.  

The stagger(x,y) function uses the current timestep to generate a new timestep. $\mathrm{X},\mathrm{y}>0$ and $\mathbf{X}>\mathbf{y}$ are required. The generated timesteps increase in a staggered fashion, as the sequence $\mathrm{x},\mathrm{x}+\mathrm{y},2\mathrm{x},2\mathrm{x}+\mathrm{y},3\mathrm{x},3\mathrm{x}+\mathrm{y},$ etc. For any current timestep, the next timestep in the sequence is returned. Thus if stagger(1000,100) is used in a variable by the dump_modify every command, it will generate the sequence of output timesteps:  

The logfreq(x,y,z) function uses the current timestep to generate a new timestep. $\mathrm{X},\mathrm{y},\mathrm{z}>0$ and $\textbf{y}<\textbf{z}$ are required. The generated timesteps are on a base-z logarithmic scale, starting with $\mathbf{X}$ , and the y value is how many of the ${\bf z}{\bf-1}$ possible timesteps within one logarithmic interval are generated. I.e. the timesteps follow the sequence $\mathrm{x},2\mathrm{x},3\mathrm{x},\hdots\mathrm{y}^{\ast}\mathrm{x},\mathrm{x}^{\ast}\mathrm{z},2\mathrm{x}^{\ast}\mathrm{z},3\mathrm{x}^{\ast}\mathrm{z},\hdots\mathrm{y}^{\ast}\mathrm{x}^{\ast}\mathrm{z},\mathrm{x}^{\ast}\mathrm{z}^{\wedge}2,2\mathrm{x}^{\ast}\mathrm{z}^{\wedge}2,$ ,etc. For any current timestep, the next timestep in the sequence is returned. Thus if logfreq(100,4,10) is used in a variable by the dump_modify every command, it will generate this sequence of output timesteps:  

100,200,300,400,1000,2000,3000,4000,10000,20000,etc  

The logfreq2(x,y,z) function is similar to logfreq, except a single logarithmic interval is divided into y equally-spaced timesteps and all of them are output. $\mathrm{~Y~}<\mathbf{Z}$ is not required. Thus, if logfreq2(100,18,10) is used in a variable by the dump_modify every command, then the interval between 100 and 1000 is divided as $900/18=50\$ steps, and it will generate the sequence of output timesteps:  

100,150,200,...950,1000,1500,2000,...9500,10000,15000,etc  

The logfreq3(x,y,z) function generates y points between x and $\mathbf{Z}$ (inclusive), that are separated by a multiplicative ratio: $(\mathrm{z/x})^{\wedge}(1/(\mathrm{y-1}))$ . Constraints are: $\mathbf{\sigma}_{\mathrm{X},\mathbf{Z}}>0$ , $\mathrm{y}>1$ , $\mathbf{Z}\mathbf{-}\mathbf{X}>=\mathbf{y}\mathbf{-}1$ . For eg., if logfreq3(10,25,1000) is used in a variable by the fix print command, then the interval between 10 and 1000 is divided into 24 parts with a multiplicative separation of ${\sim}1.21$ , and it will generate the following sequence of output timesteps:  

10, 13, 15, 18, 22, 27, 32,...384, 465, 563, 682, 826, 1000  

The stride(x,y,z) function uses the current timestep to generate a new timestep. $\mathrm{X},\mathrm{y}>=0$ and $\mathbf{z}>0$ and $\mathbf{X}<=\mathbf{y}$ are required. The generated timesteps increase in increments of $\mathbf{Z}$ , from x to y, i.e. it generates the sequence ${\bf{\sigma}}_{\bf{X}},{\bf{X}}+{\bf{Z}},{\bf{X}}+2{\bf{Z}}$ ,. . . ,y. If y-x is not a multiple of z, then similar to the way a for loop operates, the last value will be one that does not exceed y. For any current timestep, the next timestep in the sequence is returned. Thus if stride(1000,2000,100) is used in a variable by the dump_modify every command, it will generate the sequence of output timesteps:  

1000,1100,1200, ... ,1900,2000  

The stride2(x,y,z,a,b,c) function is similar to the stride() function except it generates two sets of strided timesteps, one at a coarser level and one at a finer level. Thus it is useful for debugging, e.g. to produce output every timestep at the point in simulation when a problem occurs. $\mathrm{X,y>=0}$ and $\mathbf{z}>0$ and $\mathbf{X}<=\mathbf{y}$ are required, as are $\mathrm{a},\mathrm{b}>=0$ and $\mathrm{c}>0$ and a $<\mathbf{b}$ . Also, a $>=\Chi$ and $\mathbf{b}<=\mathbf{y}$ are required so that the second stride is inside the first. The generated timesteps increase in increments of z, starting at x, until a is reached. At that point the timestep increases in increments of c, from a to $\mathbf{b}$ , then after b, increments by $\mathbf{Z}$ are resumed until y is reached. For any current timestep, the next timestep in the sequence is returned. Thus if stride2(1000,2000,100,1350,1360,1) is used in a variable by the dump_modify every command, it will generate the sequence of output timesteps:  

1000,1100,1200,1300,1350,1351,1352, ... 1359,1360,1400,1500, ... ,2000  

The vdisplace $\left(\mathbf{{X}},\mathbf{{y}}\right)$ function takes 2 arguments: $\mathbf{X}=$ value0 and $\mathrm{y}=$ velocity, and uses the elapsed time to change the value by a linear displacement due to the applied velocity over the course of a run, according to this formula:  

value $=$ value0 + velocity\*(timestep-startstep)\*dt where dt $=$ the timestep size.  

The run begins on startstep. Startstep can span multiple runs, using the start keyword of the run command. See the run command for details of how to do this. Note that the thermo_style keyword elaplong $=$ timestep-startstep. If used between runs this function will return the value according to the end of the last run or the value of $\mathbf{X}$ if used before any runs. This function assumes the length of the time step does not change and thus may not be used in combination with fix dt/reset.  

# 1.114. variable command  

The swiggle(x,y,z) and cwiggle(x,y,z) functions each take 3 arguments: $\mathbf{X}=$ value0, $\mathrm{y}=$ amplitude, ${\bf Z}=$ period. They use the elapsed time to oscillate the value by a $\sin()$ or cos() function over the course of a run, according to one of these formulas, where omega $=2$ PI / period:  

value $=$ value0 $^+$ Amplitude \* sin(omega\*(timestep-startstep)\*dt) value $=$ value0 + Amplitude \* (1 - cos(omega\*(timestep-startstep)\*dt))  

where dt $=$ the timestep size.  

The $\mathrm{sign}(\mathbf{x})$ function returns 1.0 if the value is greater than or equal to 0.0, and -1.0 otherwise.  

The run begins on startstep. Startstep can span multiple runs, using the start keyword of the run command. See the run command for details of how to do this. Note that the thermo_style keyword elaplong $=$ timestep-startstep. If used between runs these functions will return the value according to the end of the last run or the value of $\mathbf{X}$ if used before any runs. These functions assume the length of the time step does not change and thus may not be used in combination with fix dt/reset.  

# Group and Region Functions  

Group functions are specified as keywords followed by one or two parenthesized arguments. The first argument $I D$ is the group-ID. The dim argument, if it exists, is $x$ or $y$ or $z$ . The dir argument, if it exists, is xmin, xmax, ymin, ymax, zmin, or zmax. The dimdim argument, if it exists, is $x x$ or yy or $z z$ or $x y$ or yz or xz.  

The group function count() is the number of atoms in the group. The group functions mass() and charge() are the total mass and charge of the group. $\mathrm{Xcm()}$ and $\mathrm{{vcm}()}$ return components of the position and velocity of the center of mass of the group. Fcm() returns a component of the total force on the group of atoms. Bound() returns the min/max of a particular coordinate for all atoms in the group. Gyration() computes the radius-of-gyration of the group of atoms. See the compute gyration command for a definition of the formula. Angmom() returns components of the angular momentum of the group of atoms around its center of mass. Torque() returns components of the torque on the group of atoms around its center of mass, based on current forces on the atoms. Inertia() returns one of 6 components of the symmetric inertia tensor of the group of atoms around its center of mass, ordered as Ixx,Iyy,Izz,Ixy,Iyz,Ixz. Omega() returns components of the angular velocity of the group of atoms around its center of mass.  

Region functions are specified exactly the same way as group functions except they take an extra final argument IDR which is the region ID. The function is computed for all atoms that are in both the group and the region. If the group is “all”, then the only criteria for atom inclusion is that it be in the region.  

# Special Functions  

Special functions take specific kinds of arguments, meaning their arguments cannot be formulas themselves.  

The $\mathrm{{sum}}(\mathbf{x})$ , $\operatorname*{min}(\mathbf{x})$ , max(x), ave $\mathbf{\rho}(\mathbf{x})$ , trap $\mathbf{\rho}(\mathbf{x})$ , slope $\mathbf{\rho}(\mathbf{x})$ , sort(x), and rsort(x) functions each take 1 argument which is of the form $\mathrm{~\hat{~}{~c~}~}_{\mathrm{ID}},,$ or $\mathrm{{^{66}c}_{-}I D[N]{^{,}}}$ or “f_ID” or “f_ID[N]” or “v_name”. The first two are computes and the second two are fixes; the ID in the reference should be replaced by the ID of a compute or fix defined elsewhere in the input script. The compute or fix must produce either a global vector or array. If it produces a global vector, then the notation without “[N]” should be used. If it produces a global array, then the notation with “[N]” should be used, where N is an integer, to specify which column of the global array is being referenced. The last form of argument “v_name” is for a vector-style variable where “name” is replaced by the name of the variable.  

The sum $\mathbf{\rho}(\mathbf{x})$ , min(x), max(x), ave(x), trap(x), and slope(x) functions operate on a global vector of inputs and reduce it to a single scalar value. This is analogous to the operation of the compute reduce command, which performs similar operations on per-atom and local vectors.  

The sort $\mathbf{\rho}(\mathbf{x})$ and rsort $\mathbf{\rho}(\mathbf{x})$ functions operate on a global vector of inputs and return a global vector of the same length.  

The sum() function calculates the sum of all the vector elements. The min() and max() functions find the minimum and maximum element respectively. The ave() function is the same as sum() except that it divides the result by the length of the vector.  

The trap() function is the same as sum() except the first and last elements are multiplied by a weighting factor of 1/2 when performing the sum. This effectively implements an integration via the trapezoidal rule on the global vector of data. I.e. consider a set of points, equally spaced by 1 in their x coordinate: (1,V1), (2,V2), . . . , (N,VN), where the Vi are the values in the global vector of length N. The integral from 1 to N of these points is trap(). When appropriately normalized by the timestep size, this function is useful for calculating integrals of time-series data, like that generated by the fix ave/correlate command.  

The slope() function uses linear regression to fit a line to the set of points, equally spaced by 1 in their x coordinate: (1,V1), (2,V2), . . . , (N,VN), where the Vi are the values in the global vector of length N. The returned value is the slope of the line. If the line has a single point or is vertical, it returns 1.0e20.  

Added in version 27June2024.  

The sort(x) and rsort(x) functions sort the data of the input vector by their numeric value: sort(x) sorts in ascending order, rsort(x) sorts in descending order.  

The gmask $\mathbf{\rho}(\mathbf{x})$ function takes 1 argument which is a group ID. It can only be used in atom-style variables. It returns a 1 for atoms that are in the group, and a 0 for atoms that are not.  

The rmask $\mathbf{\rho}(\mathbf{x})$ function takes 1 argument which is a region ID. It can only be used in atom-style variables. It returns a 1 for atoms that are in the geometric region, and a 0 for atoms that are not.  

The grmask $\mathbf{\Psi}(\mathbf{x},\mathbf{y})$ function takes 2 arguments. The first is a group ID, and the second is a region ID. It can only be used in atom-style variables. It returns a 1 for atoms that are in both the group and region, and a 0 for atoms that are not in both.  

The next(x) function takes 1 argument which is a variable ID (not “v_foo”, just “foo”). It must be for a file-style or atomfile-style variable. Each time the next() function is invoked (i.e. each time the equal-style or atom-style variable is evaluated), the following steps occur.  

For file-style variables, the current string value stored by the file-style variable is converted to a numeric value and returned by the function. And the next string value in the file is read and stored. Note that if the line previously read from the file was not a numeric string, then it will typically evaluate to 0.0, which is likely not what you want.  

For atomfile-style variables, the current per-atom values stored by the atomfile-style variable are returned by the function. And the next set of per-atom values in the file is read and stored.  

Since file-style and atomfile-style variables read and store the first line of the file or first set of per-atoms values when they are defined in the input script, these are the value(s) that will be returned the first time the next() function is invoked. If next() is invoked more times than there are lines or sets of lines in the file, the variable is deleted, similar to how the next command operates.  

The is_file(name) function is a test whether name is a (readable) file and returns 1 in this case, otherwise it returns 0.   
For that name is taken as a literal string and must not have any blanks in it.  

The is_os(name) function is a test whether name is part of the OS information that LAMMPS collects and provides in the platform::os_info() function. The argument name is interpreted as a regular expression as documented for the utils::strmatch() function. This allows to adapt LAMMPS inputs to the OS it runs on:  

if \$(is_os(^Windows)) then & "shell copy \${input_dir}\some_file.txt ." & else & "shell cp \${input_dir}/some_file.txt ."  

The extract_setting(name) function enables access to basic settings for the LAMMPS executable and the running simulation via calling the lammps_extract_setting() library function. For example, the number of processors (MPI ranks) being used by the simulation or the MPI process ID (for this processor) can be queried, or the number of atom  

# 1.114. variable command  

types, bond types and so on. For the full list of available keywords name and their meaning, see the documentation for extract_setting() via the link in this paragraph.  

The label2type(kind,label) function converts type labels into numeric types, using label maps created by the labelmap or read_data commands. The first argument is the label map kind (atom, bond, angle, dihedral, or improper) and the second argument is the label. The function returns the corresponding numeric type or triggers an error if the queried label does not exist.  

Added in version 15Jun2023.  

The is_typelabel(kind,label) function has the same arguments as label2type(), but returns 1 if the type label has been assigned, otherwise it returns 0. This function can be used to check if a particular type label already exists in the simulation.  

Added in version 29Aug2024.  

The is_timeout() function returns 1 when the timer timeout has expired otherwise it returns 0. This function can be used to check inputs in combination with the if command to execute commands after the timer has expired. Example:  

variable timeout equal is_timeout() timer timeout 0:10:00 every 10 run 10000 if \${timeout} then "print 'Timer has expired'"  

# Feature Functions  

Feature functions allow probing of the running LAMMPS executable for whether specific features are available, active, or defined. All 3 of the functions take two arguments, a category and a category-specific second argument. Both are strings and thus cannot be formulas themselves; only $\$1$ -style immediate variable expansion is possible. The return value of the functions is either 1.0 or 0.0 depending on whether the function evaluates to true or false, respectively.  

The is_available(category,name) function queries whether a specific feature is available in the LAMMPS executable that is being run, i.e whether it was included or enabled at compile time.  

This supports the following categories: command, compute, $f(x_{:}$ , pair_style and feature. For all the categories except feature the name is a style name, e.g. nve for the $f\boldsymbol{n}\boldsymbol{x}$ category. Note that many LAMMPS input script commands such as create_atoms are actually instances of a command style which LAMMPS defines, as opposed to built-in commands. For all of these styles except command, appending of active suffixes is also tried before reporting failure.  

The feature category checks the availability of the following compile-time enabled features: GZIP support, PNG support, JPEG support, FFMPEG support, and $\mathrm{C}{+}{+}$ exceptions for error handling. Corresponding names are gzip, png, jpeg, ffmpeg and exceptions.  

Example: Only dump in a given format if the compiled binary supports it.  

if "\$(is_available(feature,png))" then "print 'PNG supported'" else "print 'PNG not supported'" if "\$(is_available(feature,ffmpeg)" then "dump 3 all movie 25 movie.mp4 type type zoom 1.6 adiam 1.0"  

The is_active(category,feature) function queries whether a specific feature is currently active within LAMMPS. The features are grouped by categories. Supported categories and features are:  

• package: features $=g p u$ or intel or kokkos or omp • newton: features $=$ pair or bond or any • pair: features $=$ single or respa or manybody or tail or shift • comm_style: features $=$ brick or tiled • min_style: features ${\mathbf{\tau}}={\mathbf{a}}$ minimizer style name  

• run_style: features $=$ a run style name • atom_style: features $=$ an atom style name pair_style: features ${\mathbf{\lambda}}={\mathbf{a}}$ pair style name • bond_style: features $=$ a bond style name • angle_style: features $=$ an angle style name • dihedral_style: features ${\mathbf{\lambda}}={\mathbf{a}}$ dihedral style name • improper_style: features $=$ an improper style name • kspace_style: features $=$ a kspace style name  

Most of the settings are self-explanatory. For the package category, a package may have been included in the LAMMPS build, but not have enabled by any input script command, and hence be inactive. The single feature in the pair category checks whether the currently defined pair style supports a Pair::single() function as needed by compute group/group and others features or LAMMPS. Similarly, the respa feature checks whether the inner/middle/outer mode of r-RESPA is supported by the current pair style.  

For the categories with style in their name, only a single instance of the style is ever active at any time in a LAMMPS simulation. Thus the check is whether the currently active style matches the specified name. This check is also done using suffix flags, if available and enabled.  

Example 1: Disable use of suffix for PPPM when using GPU package (i.e. run it on the CPU concurrently while running the pair style on the GPU), but do use the suffix otherwise (e.g. with OPENMP).  

pair_style lj/cut/coul/long 14.0 if \$(is_active(package,gpu)) then "suffix off" kspace_style pppm  

Example 2: Use r-RESPA with inner/outer cutoff, if supported by the current pair style, otherwise fall back to using r-RESPA with simply the pair keyword and reducing the outer time step.  

timestep \$(2.0\*(1.0+2.0\*is_active(pair,respa)))   
if $\$1$ (is_active(pair,respa)) then "run_style respa 4 3 2 2 improper 1 inner 2 5.5 7.0 outer 3 kspace $4^{11}$ else   
,→"run_style respa 3 3 2 improper 1 pair 2 kspace 3"  

The is_defined(category,id) function checks whether an instance of a style or variable with a specific ID or name is currently defined within LAMMPS. The supported categories are compute, dump, fix, group, region, and variable. Each of these styles (as well as the variable command) can be specified multiple times within LAMMPS, each with a unique id. This function checks whether the specified id exists. For category variable”, the \*id is the variable name.  

# Atom Values and Vectors  

Atom values take an integer argument I from 1 to N, where I is the atom-ID, e.g. x[243], which means use the x coordinate of the atom with $\mathrm{ID}=243$ . Or they can take a variable name, specified as v_name, where name is the name of the variable, like x[v_myIndex]. The variable can be of any style except vector or atom or atomfile variables. The variable is evaluated and the result is expected to be numeric and is cast to an integer (i.e. 3.4 becomes 3), to use an index, which must be a value from 1 to N. Note that a “formula” cannot be used as the argument between the brackets, e.g. $\mathbf{x}[243+10]$ or x[v_myIndex $+1$ ] are not allowed. To do this a single variable can be defined that contains the needed formula.  

Note that the $0<$ atom-ID $<=\mathbf{N}$ , where $\mathbf{N}$ is the largest atom ID in the system. If an ID is specified for an atom that does not currently exist, then the generated value is 0.0.  

# 1.114. variable command  

Atom vectors generate one value per atom, so that a reference like “vx” means the x-component of each atom’s velocity will be used when evaluating the variable.  

The meaning of the different atom values and vectors is mostly self-explanatory. Mol refers to the molecule ID of an atom, and is only defined if an atom_style is being used that defines molecule IDs.  

Note that many other atom attributes can be used as inputs to a variable by using the compute property/atom command and then referencing that compute.  

# Custom atom properties  

Added in version 7Feb2024.  

Custom atom properties refer to per-atom integer and floating point vectors or arrays that have been added via the fix property/atom command. When that command is used specific names are given to each attribute which are the “name” portion of these references. References beginning with $i$ and $d$ refer to integer and floating point properties respectively. Per-atom vectors are referenced by $i_{.}$ _name and $d_{\cdot}$ _name; per-atom arrays are referenced by $i2.$ _name and $d2.$ _name.  

The various allowed references to integer custom atom properties in the variable formulas for equal-, vector-, and atomstyle variables are listed in the following table. References to floating point custom atom properties are the same; just replace the leading “i” with “d”.  

<html><body><table><tr><td></td><td>i_name[I]</td><td>element of per-atom vector (I = atom ID)</td></tr><tr><td>equal</td><td>i2_name[I][J]</td><td>element of per-atom array (I = atom ID)</td></tr><tr><td></td><td></td><td>element of per-atom vector (I = atom ID)</td></tr><tr><td>vector vector</td><td>i_name[I]</td><td>element of per-atom array (I = atom ID)</td></tr><tr><td></td><td>i2_name[I][J]</td><td></td></tr><tr><td>atom</td><td>iname</td><td>per-atomvector</td></tr><tr><td>atom</td><td>i2_name[I]</td><td>columnofper-atomarray</td></tr><tr><td></td><td></td><td></td></tr></table></body></html>  

The I and J indices in these custom atom property references can be integers or can be a variable name, specified as v_name, where name is the name of the variable. The rules for this syntax are the same as for indices in the “Atom Values and Vectors” discussion above.  

# Compute References  

Compute references access quantities calculated by a compute. The ID in the reference should be replaced by the ID of a compute defined elsewhere in the input script.  

As discussed on the page for the compute command, computes can produce global, per-atom, local, and per-grid values. Only global and per-atom values can be used in a variable. Computes can also produce scalars (global only), vectors, and arrays. See the doc pages for individual computes to see what different kinds of data they produce.  

An equal-style variable can only use scalar values, either from global or per-atom data. In the case of per-atom data, this would be a value for a specific atom.  

A vector-style variable can use scalar values (same as for equal-style variables), or global vectors of values. The latte can also be a column of a global array.  

Atom-style variables can use scalar values (same as for equal-style variables), or per-atom vectors of values. The latter can also be a column of a per-atom array.  

The various allowed compute references in the variable formulas for equal-, vector-, and atom-style variables are listed in the following table:  

<html><body><table><tr><td>equal</td><td>c_ID</td><td>global scalar</td></tr><tr><td>equal</td><td>c_ID[I]</td><td>elementofglobalvector</td></tr><tr><td>equal</td><td>c_ID[I[J]</td><td>element of global array</td></tr><tr><td>equal</td><td>C_ID[I]</td><td>element of per-atom vector (I = atom ID)</td></tr><tr><td>equal</td><td>C_ID[I][J]</td><td>element of per-atom array (I = atom ID)</td></tr><tr><td>vector</td><td>c_ID</td><td>globalvector</td></tr><tr><td>vector</td><td>c_ID[1]</td><td>column of global array</td></tr><tr><td>atom</td><td>c_ID</td><td>per-atomvector</td></tr><tr><td>atom</td><td>c_ID[I]</td><td>column of per-atom array</td></tr></table></body></html>  

Note that if an equal-style variable formula wishes to access per-atom data from a compute, it must use capital “C” as the ID prefix and not lower-case “c”.  

Also note that if a vector- or atom-style variable formula needs to access a scalar value from a compute (i.e. the 5 kinds of values in the first 5 lines of the table), it can not do so directly. Instead, it can use a reference to an equal-style variable which stores the scalar value from the compute.  

The I and J indices in these compute references can be integers or can be a variable name, specified as v_name, where name is the name of the variable. The rules for this syntax are the same as for indices in the “Atom Values and Vectors” discussion above.  

If a variable containing a compute is evaluated directly in an input script (not during a run), then the values accessed by the compute should be current. See the discussion below about “Variable Accuracy”.  

# Fix References  

Fix references access quantities calculated by a fix. The ID in the reference should be replaced by the ID of a fix defined elsewhere in the input script.  

As discussed on the page for the $f\boldsymbol{a}\boldsymbol{x}$ command, fixes can produce global, per-atom, local, and per-grid values. Only global and per-atom values can be used in a variable. Fixes can also produce scalars (global only), vectors, and arrays. See the doc pages for individual fixes to see what different kinds of data they produce.  

An equal-style variable can only use scalar values, either from global or per-atom data. In the case of per-atom data, this would be a value for a specific atom.  

A vector-style variable can use scalar values (same as for equal-style variables), or global vectors of values. The latter can also be a column of a global array.  

Atom-style variables can use scalar values (same as for equal-style variables), or per-atom vectors of values. The latter can also be a column of a per-atom array.  

The allowed fix references in variable formulas for equal-, vector-, and atom-style variables are listed in the following table:  

<html><body><table><tr><td>equal</td><td>f_ID</td><td>global scalar</td></tr><tr><td>equal</td><td>f_ID[I]</td><td>elementofglobalvector</td></tr><tr><td>equal</td><td>f_ID[I[J]</td><td>element of global array</td></tr><tr><td>equal</td><td>F_ID[Ⅲ]</td><td>element of per-atom vector (I = atom ID)</td></tr><tr><td>equal</td><td>F_ID[I[]</td><td>element of per-atom array (I = atom ID)</td></tr><tr><td>vector</td><td>f_ID</td><td>global vector</td></tr><tr><td>vector</td><td>f_ID[I]</td><td>column of global array</td></tr><tr><td></td><td></td><td></td></tr><tr><td>atom atom</td><td>f_ID</td><td>per-atomvector</td></tr><tr><td></td><td>f_ID[I]</td><td>column of per-atom array</td></tr></table></body></html>  

Note that if an equal-style variable formula wishes to access per-atom data from a fix, it must use capital “F” as the ID prefix and not lower-case “f”.  

Also note that if a vector- or atom-style variable formula needs to access a scalar value from a fix (i.e. the 5 kinds of values in the first 5 lines of the table), it can not do so directly. Instead, it can use a reference to an equal-style variable which stores the scalar value from the fix.  

The I and J indices in these fix references can be integers or can be a variable name, specified as v_name, where name is the name of the variable. The rules for this syntax are the same as for indices in the “Atom Values and Vectors” discussion above.  

Note that some fixes only generate quantities on certain timesteps. If a variable attempts to access the fix on non-allowed timesteps, an error is generated. For example, the fix ave/time command may only generate averaged quantities every 100 steps. See the doc pages for individual fix commands for details.  

If a variable containing a fix is evaluated directly in an input script (not during a run), then the values accessed by the fix should be current. See the discussion below about “Variable Accuracy”.  

# Variable References  

Variable references access quantities stored or calculated by other variables, which will cause those variables to be evaluated. The name in the reference should be replaced by the name of a variable defined elsewhere in the input script.  

As discussed on this doc page, equal-style variables generate a single global numeric value, vector-style variables generate a vector of global numeric values, and atom-style and atomfile-style variables generate a per-atom vector of numeric values. All other variables store one or more strings.  

The formula for an equal-style variable can use any style of variable including a vector_style or atom-style or atomfilestyle. For these 3 styles, a subscript must be used to access a single value from the vector-, atom-, or atomfile-style variable. If a string-storing variable is used, the string is converted to a numeric value. Note that this will typically produce a 0.0 if the string is not a numeric string, which is likely not what you want.  

The formula for a vector-style variable can use any style of variable, including atom-style or atomfile-style variables.   
For these 2 styles, a subscript must be used to access a single value from the atom-, or atomfile-style variable.  

The formula for an atom-style variable can use any style of variable, including other atom-style or atomfile-style variables. If it uses a vector-style variable, a subscript must be used to access a single value from the vector-style variable.  

The allowed variable references in variable formulas for equal-, vector-, and atom-style variables are listed in the following table. Note that there is no ambiguity as to what a reference means, since referenced variables produce only a global scalar or global vector or per-atom vector.  

<html><body><table><tr><td>equal</td><td>v_name</td><td>global scalar from an equal-style variable</td></tr><tr><td>equal</td><td>V_name[I]</td><td>element of global vector from a vector-style variable</td></tr><tr><td>equal</td><td>V_name[I]</td><td>element of per-atom vector (I = atom ID) from an atom- or atomfile-style variable</td></tr><tr><td>vector</td><td>v_name</td><td>global scalar from an equal-style variable</td></tr><tr><td>vector</td><td>v_name</td><td>global vector from a vector-style variable</td></tr><tr><td>vector</td><td>V_name[I]</td><td>element of global vector from a vector-style variable</td></tr><tr><td>vector</td><td>V_name[I]</td><td>element of per-atom vector (I = atom ID) from an atom- or atomfile-style variable</td></tr><tr><td>atom</td><td></td><td>global scalarfrom an equal-stylevariable</td></tr><tr><td>atom</td><td>v_name v_name</td><td>per-atom vector from an atom-style or atomfile-style variable</td></tr><tr><td>atom</td><td>V_name[I]</td><td>element of global vectorfrom a vector-stylevariable</td></tr><tr><td>atom</td><td>v_name[]</td><td>element of per-atom vector (I = atom ID) from an atom- or atomfile-style variable</td></tr></table></body></html>  

For the I index, an integer can be specified or a variable name, specified as v_name, where name is the name of the variable. The rules for this syntax are the same as for indices in the “Atom Values and Vectors” discussion above.  

# Vector Initialization  

Added in version 15Jun2023.  

Vector-style variables only can be initialized with a special syntax, instead of using a formula. The syntax is a bracketed, comma-separated syntax like the following:  

variable myvec vector [1,3.5,7,10.2]  

The 3rd argument formula is replaced by the vector values in brackets, separated by commas. This example creates a 4-length vector with specific numeric values, each of which can be specified as an integer or floating point value. Note that while whitespace can be added before or after individual values, no other mathematical operations can be specified. E.g. $^{\circ}3^{\ast}10^{\circ}$ or ${}^{\circ}{}^{\circ}{}^{3}{}^{*}{\mathrm{v}}.$ _abc” are not valid vector elements, nor is $\cdot10^{*}[1,2,3,4]^{\cdot}$ valid for the entire vector.  

Unlike vector variables specified with formulas, this vector variable is static; its length and values never changes. Its values can be used in other commands (including vector-style variables specified with formulas) via the usual syntax for accessing individual vector elements or the entire vector.  

# 1.114.4 Immediate Evaluation of Variables  

If you want an equal-style variable to be evaluated immediately, it may be the case that you do not need to define a variable at all. See the Commands parse page for info on how to use “immediate” variables in an input script, specified as $\$1$ (formula) with parenthesis, where the formula has the same syntax as equal-style variables described on this page. This effectively evaluates a formula immediately without using the variable command to define a named variable.  

More generally, there is a difference between referencing a variable with a leading $\$1$ sign (e.g. $\$1$ or $\$\{\mathrm{abc}\}$ ) versus with a leading $\begin{array}{r}{\mathbf{\tilde{\Sigma}}^{6\leftarrow}\mathbf{V}_{-}^{\quad\mathbf{\Xi},\mathbf{\Xi},\mathbf{\Xi}}}\end{array}$ (e.g. v_x or v_abc). The former can be used in any input script command, including a variable command. The input script parser evaluates the reference variable immediately and substitutes its value into the command. As explained on the Commands parse doc page, you can also use un-named “immediate” variables for this purpose. For example, a string like this $\mathbb{S}((\mathrm{xlo}+\mathrm{xhi})/2+\mathrm{sqrt}(\mathrm{v}\_\mathrm{area}))$ in an input script command evaluates the string between the parenthesis as an equal-style variable formula.  

Referencing a variable with a leading “v_” is an optional or required kind of argument for some commands (e.g. the fix ave/chunk or dump custom or thermo_style commands) if you wish it to evaluate a variable periodically during a  

# 1.114. variable command  

run. It can also be used in a variable formula if you wish to reference a second variable. The second variable will be evaluated whenever the first variable is evaluated.  

As an example, suppose you use this command in your input script to define the variable “v” as  

variable v equal vol  

before a run where the simulation box size changes. You might think this will assign the initial volume to the variable “v”. That is not the case. Rather it assigns a formula which evaluates the volume (using the thermo_style keyword “vol”) to the variable “v”. If you use the variable “v” in some other command like fix ave/time then the current volume of the box will be evaluated continuously during the run.  

If you want to store the initial volume of the system, you can do it this way:  

<html><body><table><tr><td>variable v equal vol</td></tr><tr><td>variable v0 equal $v</td></tr><tr><td></td></tr></table></body></html>  

The second command will force “v” to be evaluated (yielding the initial volume) and assign that value to the variable “v0”. Thus the command  

thermo_style custom step v_v v_v0 would print out both the current and initial volume periodically during the run.  

Note that it is a mistake to enclose a variable formula in double quotes if it contains variables preceded by $\$1$ signs. For example,  

This is because the quotes prevent variable substitution (explained on the Commands parse doc page), and thus an error will occur when the formula for “vratio” is evaluated later.  

# 1.114.5 Variable Accuracy  

Obviously, LAMMPS attempts to evaluate variables which contain formulas (equal and vector and atom style variables) accurately whenever the evaluation is performed. Depending on what is included in the formula, this may require invoking a compute, either directly or indirectly via a thermo keyword, or accessing a value previously calculated by a compute, or accessing a value calculated and stored by a fix. If the compute is one that calculates the energy or pressure of the system, then the corresponding energy or virial quantities need to be tallied during the evaluation of the interatomic potentials (pair, bond, etc) on any timestep that the variable needs the tallies. An input script can also request variables be evaluated before or after or in between runs, e.g. by including them in a print command.  

LAMMPS keeps track of all of this as it performs a run or minimize simulation, as well as in between simulations. An error will be generated if you attempt to evaluate a variable when LAMMPS knows it cannot produce accurate values. For example, if a thermo_style custom command prints a variable which accesses values stored by a fix ave/time command and the timesteps on which thermo output is generated are not multiples of the averaging frequency used in the fix command, then an error will occur.  

However, there are two special cases to be aware when a variable requires invocation of a compute (directly or indirectly). The first is if the variable is evaluated before the first run or minimize command in the input script. In this case, LAMMPS will generate an error. This is because many computes require initializations which have not yet taken place. One example is the calculation of degrees of freedom for temperature computes. Another example are the computes mentioned above which require tallying of energy or virial quantities; these values are not tallied until the first simulation begins.  

The second special case is when a variable that depends on a compute is evaluated in between run or minimize commands. It is possible for other input script commands issued following the previous run, but before the variable is evaluated, to change the system. For example, the delete_atoms command could be used to remove atoms. Since the compute will not re-initialize itself until the next simulation or it may depend on energy/virial computations performed before the system was changed, it will potentially generate an incorrect answer when evaluated. Note that LAMMPS will not generate an error in this case; the evaluated variable may simply be incorrect.  

The way to get around both of these special cases is to perform a 0-timestep run before evaluating the variable. For example, these commands  

# delete_atoms random fraction 0.5 yes all NULL 49839   
# run 0 post no   
variable t equal temp # this thermo keyword invokes a temperature compute   
print "Temperature of system $\mathrm{\Omega}=\S\mathrm{t}^{\dag\parallel}$   
run 1000  

will generate an error if the “run $1000^{\ '}$ command is the first simulation in the input script. If there were a previous run, these commands will print the correct temperature of the system. But if the delete_atoms command is uncommented, the printed temperature will be incorrect, because information stored by temperature compute is no longer valid.  

Both these issues are resolved, if the “run $0^{\cdot\cdot}$ command is uncommented. This is because the “run $0^{\cdot\cdot}$ simulation will initialize (or re-initialize) the temperature compute correctly.  

# 1.114.6 Restrictions  

Indexing any formula element by global atom ID, such as an atom value, requires the atom style to use a global mapping in order to look up the vector indices. By default, only atom styles with molecular information create global maps. The atom_modify map command can override the default, e.g. for atomic-style atom styles.  

All universe- and uloop-style variables defined in an input script must have the same number of values.  

# 1.114.7 Related commands  

next, jump, include, temper, fix print, print  

# 1.114.8 Default  

none  

# 1.115 velocity command  

# 1.115.1 Syntax  

velocity group-ID style args keyword value ...  

• group-ID $=\mathrm{ID}$ of group of atoms whose velocity will be change   
• style $=$ create or set or scale or ramp or zero create args $=$ temp seed temp $=$ temperature value (temperature units) seed $=$ random # seed (positive integer) set $\mathrm{args}=\mathrm{vx}$ vy vz $\mathbf{VX},\mathbf{Vy},\mathbf{VZ}=$ velocity value or NULL (velocity units) any of vx,vy,vz can be a variable (see below) scale arg $=$ temp temp $=$ temperature value (temperature units)  

# 1.115. velocity command  

ramp args $=$ vdim vlo vhi dim clo chi $\operatorname{vdim}=\operatorname{vx}$ or vy or vz vlo,vhi $=$ lower and upper velocity value (velocity units) $\mathrm{{dim}=x}$ or y or z clo,chi $=$ lower and upper coordinate bound (distance units)   
zero arg $=$ linear or angular linear $=$ zero the linear momentum angular $=$ zero the angular momentum  

• zero or more keyword/value pairs may be appended • keyword $=$ dist or sum or mom or rot or temp or bias or loop or rigid or units  

dist value $=$ uniform or gaussian   
sum value $=\mathrm{no}$ or yes   
mom value $=$ no or yes   
rot value $=$ no or yes   
temp value $=$ temperature compute ID   
bias value $=$ no or yes   
loop value $=$ all or local or geom   
rigid value $=$ fix-ID fix-ID = ID of rigid body fix   
units value $=$ box or lattice  

# 1.115.2 Examples  

velocity all create 300.0 4928459 rot yes dist gaussian   
velocity border set NULL 4.0 v_vz sum yes units box   
velocity flow scale 300.0   
velocity flow ramp $\mathrm{vx0.05.0y525}$ temp mytemp   
velocity all zero linear  

# 1.115.3 Description  

Set or change the velocities of a group of atoms in one of several styles. For each style, there are required arguments and optional keyword/value parameters. Not all options are used by each style. Each option has a default as listed below.  

The create style generates an ensemble of velocities using a random number generator with the specified seed at the specified temperature.  

The set style sets the velocities of all atoms in the group to the specified values. If any component is specified as NULL, then it is not set. Any of the vx,vy,vz velocity components can be specified as an equal-style or atom-style variable. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated, and its value used to determine the velocity component. Note that if a variable is used, the velocity it calculates must be in box units, not lattice units; see the discussion of the units keyword below.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters or other parameters.  

Atom-style variables can specify the same formulas as equal-style variables but can also include per-atom values, such as atom coordinates. Thus it is easy to specify a spatially-dependent velocity field.  

The scale style computes the current temperature of the group of atoms and then rescales the velocities to the specified temperature.  

The ramp style is similar to that used by the compute temp/ramp command. Velocities ramped uniformly from vlo to vhi are applied to dimension vx, or vy, or vz. The value assigned to a particular atom depends on its relative coordinate value (in dim) from clo to chi. For the example above, an atom with y-coordinate of 10 (1/4 of the way from 5 to 25), would be assigned a x-velocity of 1.25 (1/4 of the way from 0.0 to 5.0). Atoms outside the coordinate bounds (less than 5 or greater than 25 in this case), are assigned velocities equal to vlo or vhi (0.0 or 5.0 in this case).  

The zero style adjusts the velocities of the group of atoms so that the aggregate linear or angular momentum is zero. No other changes are made to the velocities of the atoms. If the rigid option is specified (see below), then the zeroing is performed on individual rigid bodies, as defined by the fix rigid or fix rigid/small commands. In other words, zero linear will set the linear momentum of each rigid body to zero, and zero angular will set the angular momentum of each rigid body to zero. This is done by adjusting the velocities of the atoms in each rigid body.  

All temperatures specified in the velocity command are in temperature units; see the units command. The units o velocities and coordinates depend on whether the units keyword is set to box or lattice, as discussed below.  

For all styles, no atoms are assigned z-component velocities if the simulation is 2d; see the dimension command.  

The keyword/value options are used in the following ways by the various styles.  

The dist keyword is used by create. The ensemble of generated velocities can be a uniform distribution from some minimum to maximum value, scaled to produce the requested temperature. Or it can be a gaussian distribution with a mean of 0.0 and a sigma scaled to produce the requested temperature.  

The sum keyword is used by all styles, except zero. The new velocities will be added to the existing ones if $\mathrm{sum}=\mathrm{yes}.$ , or will replace them if sum $\mathbf{\tau}=\mathbf{n}\mathbf{O}$ .  

The mom and rot keywords are used by create. If mom $=$ yes, the linear momentum of the newly created ensemble of velocities is zeroed; if rot $=$ yes, the angular momentum is zeroed.  

If specified, the temp keyword is used by create and scale to specify a compute that calculates temperature in a desired way, e.g. by first subtracting out a velocity bias, as discussed on the Howto thermostat doc page. If this keyword is not specified, create and scale calculate temperature using a compute that is defined internally as follows:  

compute velocity_temp group-ID temp  

where group-ID is the same ID used in the velocity command. i.e. the group of atoms whose velocity is being altered. This compute is deleted when the velocity command is finished. See the compute temp command for details. If the calculated temperature should have degrees-of-freedom removed due to fix constraints (e.g. SHAKE or rigid-body constraints), then the appropriate fix command must be specified before the velocity command is issued.  

The bias keyword with a yes setting is used by create and scale, but only if the temp keyword is also used to specify a compute that calculates temperature in a desired way. If the temperature compute also calculates a velocity bias, the bias is subtracted from atom velocities before the create and scale operations are performed. After the operations, the bias is added back to the atom velocities. See the Howto thermostat page for more discussion of temperature computes with biases. Note that the velocity bias is only applied to atoms in the temperature compute specified with the temp keyword.  

As an example, assume atoms are currently streaming in a flow direction (which could be separately initialized with the ramp style), and you wish to initialize their thermal velocity to a desired temperature. In this context thermal velocity means the per-particle velocity that remains when the streaming velocity is subtracted. This can be done using the create style with the temp keyword specifying the ID of a compute temp/ramp or compute temp/profile command, and the bias keyword set to a yes value.  

The loop keyword is used by create in the following ways.  

If ${\mathrm{loop}}={\mathrm{all}}$ , then each processor loops over all atoms in the simulation to create velocities, but only stores velocities for atoms it owns. This can be a slow loop for a large simulation. If atoms were read from a data file, the velocity assigned  

# 1.115. velocity command  

to a particular atom will be the same, independent of how many processors are being used. This will not be the case if atoms were created using the create_atoms command, since atom IDs will likely be assigned to atoms differently.  

If loop $=$ local, then each processor loops over only its atoms to produce velocities. The random number seed is adjusted to give a different set of velocities on each processor. This is a fast loop, but the velocity assigned to a particular atom will depend on which processor owns it. Thus the results will always be different when a simulation is run on a different number of processors.  

If ${\mathrm{loop}}={\mathrm{geom}}$ , then each processor loops over only its atoms. For each atom a unique random number seed is created, based on the atom’s xyz coordinates. A velocity is generated using that seed. This is a fast loop and the velocity assigned to a particular atom will be the same, independent of how many processors are used. However, the set of generated velocities may be more correlated than if the all or local keywords are used.  

Note that the loop geom keyword will not necessarily assign identical velocities for two simulations run on different machines. This is because the computations based on xyz coordinates are sensitive to tiny differences in the doubleprecision value for a coordinate as stored on a particular machine.  

The rigid keyword only has meaning when used with the zero style. It allows specification of a fix-ID for one of the rigid-body fix variants which defines a set of rigid bodies. The zeroing of linear or angular momentum is then performed for each rigid body defined by the fix, as described above.  

The units keyword is used by set and ramp. If units $={\mathrm{box}}$ , the velocities and coordinates specified in the velocity command are in the standard units described by the units command (e.g. Angstroms/fs for real units). If units $=$ lattice, velocities are in units of lattice spacings per time (e.g. spacings/fs) and coordinates are in lattice spacings. The lattice command must have been previously used to define the lattice spacing.  

# 1.115.4 Restrictions  

Assigning a temperature via the create style to a system with rigid bodies or SHAKE constraints may not have the desired outcome for two reasons. First, the velocity command can be invoked before all of the relevant fixes are created and initialized and the number of adjusted degrees of freedom (DOFs) is known. Thus it is not possible to compute the target temperature correctly. Second, the assigned velocities may be partially canceled when constraints are first enforced, leading to a different temperature than desired. A workaround for this is to perform a run $O$ command, which ensures all DOFs are accounted for properly, and then rescale the temperature to the desired value before performing a simulation. For example:  

<html><body><table><tr><td colspan="2">velocity all create 300.0 12345</td></tr><tr><td>run O</td><td>temperature may not be 300K</td></tr><tr><td>velocity all scale 300.0</td><td>now it should be</td></tr></table></body></html>  

# 1.115.5 Related commands  

fix rigid, fix shake, lattice  

# 1.115.6 Default  

The keyword defaults are dist $=$ uniform, $\mathrm{sum}=\mathrm{no}$ , mom $=$ yes, rot $=$ no, bias $=$ no, loop $=$ all, and units $=$ lattice. The temp and rigid keywords are not defined by default.  

# 1.116 write_coeff command  

# 1.116.1 Syntax  

• file $=$ name of data file to write out  

# 1.116.2 Examples  

# 1.116.3 Description  

Write a text format file with the currently defined force field coefficients in a way, that it can be read by LAMMPS with the include command. In combination with the nocoeff option of write_data this can be used to move the Coeffs sections from a data file into a separate file.  

# Note  

The write_coeff command is not yet fully implemented as some pair styles do not output their coefficient information. This means you will need to add/copy this information manually.  

# 1.116.4 Restrictions  

none  

# 1.116.5 Related commands  

read_data, write_restart, write_data  

# 1.117 write_data command  

# 1.117.1 Syntax  

write_data file keyword value ...  

• file $=$ name of data file to write out   
• zero or more keyword/value pairs may be appended   
• keyword $=$ nocoeff or nofix or nolabelmap or triclinic/general or types or pair nocoeff $\mathbf{\mu}=\mathrm{do}$ not write out force field info nofix $\mathbf{\mu}=\mathrm{do}$ not write out extra sections read by fixes nolabelmap $\mathbf{\mu}=\mathrm{do}$ not write out type labels triclinic/general $=$ write data file in general triclinic format types value $=$ numeric or labels pair value $=$ ii or ij ii $=$ write one line of pair coefficient info per atom type ij = write one line of pair coefficient info per IJ atom type pair  

# 1.116. write_coeff command  

# 1.117.2 Examples  

write_data data.polymer write_data data.\* write_data data.solid triclinic/general  

# 1.117.3 Description  

Write a data file in text format of the current state of the simulation. Data files can be read by the read data command to begin a simulation. The read_data command also describes their format.  

Similar to dump files, the data filename can contain a “\*” wild-card character. The “\*” is replaced with the current timestep value.  

# $\Theta$ Data in Coeff sections  

The write_data command may not always write all coefficient settings to the corresponding Coeff sections of the data file. This can have one of multiple reasons. 1) The style may be a hybrid style. In that case no coeff information is written. 2) A few styles may be missing the code that would write those sections (This is rare these days, but if you come across one, please notify the LAMMPS developers). 3) Some pair styles require a single pair_coeff statement and those are not compatible with data files. 4) The default for write_data is to write a PairCoeff section, which has only entries for atom types $\mathrm{i}==\mathrm{j}$ . The remaining coefficients would be inferred through the currently selected mixing rule. If there has been a pair_coeff command with i $!=\mathrm{j}$ , this setting would be lost. LAMMPS will detect this and print a warning message unless pair $i j$ is appended to the write_data command. This will request writing a PairIJCoeff section which has information for all pairs of atom types. In cases where the coefficient data in the data file is incomplete, you will need to re-specify that information in your input script that reads the data file.  

Because a data file is in text format, if you use a data file written out by this command to restart a simulation, the initial state of the new run will be slightly different than the final state of the old run (when the file was written) which was represented internally by LAMMPS in binary format. A new simulation which reads the data file will thus typically diverge from a simulation that continued in the original input script.  

If you want to do more exact restarts, using binary files, see the restart, write_restart, and read_restart commands.   
You can also convert binary restart files to text data files, after a simulation has run, using the -r command-line switch.  

![](images/934a080de84e80732a7e702478193838f9b7e626ee4e66d4b959030d076579bf.jpg)  

# Note  

Only limited information about a simulation is stored in a data file. For example, no information about atom groups and fixes are stored. Binary restart files store more information.  

Bond interactions (angle, etc) that have been turned off by the fix shake or delete_bonds command will be written to a data file as if they are turned on. This means they will need to be turned off again in a new run after the data file is read.  

Bonds that are broken (e.g. by a bond-breaking potential) are not written to the data file. Thus these bonds will not exist when the data file is read.  

Use of the nocoeff keyword means no force field parameters are written to the data file. This can be helpful, for example, if you want to make significant changes to the force field or if the force field parameters are read in separately, e.g. from an include file.  

Use of the nofix keyword means no extra sections read by fixes are written to the data file (see the $f\boldsymbol{u}$ option of the read_data command for details). For example, this option excludes sections for user-created per-atom properties from fix property/atom.  

The nolabelmap and types keywords refer to type labels that may be defined for numeric atom types, bond types, angle types, etc. The label map can be defined in two ways, either by the labelmap command or in data files read by the read_data command which have sections for Atom Type Labels, Bond Type Labels, Angle Type Labels, etc. See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

Use of the nolabelmap keyword means that even if type labels exist for a given type-kind (Atoms, Bonds, Angles, etc.), type labels are not written to the data file. By default, they are written if they exist. A type label must be defined for every numeric type (within a given type-kind) to be written to the data file.  

Use of the triclinic/general keyword will output a data file which specifies a general triclinic simulation box as well as per-atom quantities consistent with the general triclinic box. The latter means that per-atom vectors, such as velocities and dipole moments will be oriented consistent with the 3d rotation implied by the general triclinic box (relative to the associated restricted triclinic box).  

This option can only be requested if the simulation box was initially defined to be general triclinic. If if was and the triclinic/general keyword is not used, then the data file will specify a restricted triclinic box, since that is the internal format LAMMPS uses for both general and restricted triclinic simulations. See the Howto triclinic doc page for more explanation of how general triclinic simulation boxes are supported by LAMMPS. And see the read_data doc page for details of how the format is altered for general triclinic data files.  

The types keyword determines how atom types, bond types, angle types, etc are written into these data file sections: Atoms, Bonds, Angles, etc. The default is the numeric setting, even if type label maps exist. If the labels setting is used, type labels will be written to the data file, if the corresponding label map exists. Note that when using types labels, the nolabelmap keyword cannot be used.  

The pair keyword lets you specify in what format the pair coefficient information is written into the data file. If the value is specified as $i i$ , then one line per atom type is written, to specify the coefficients for each of the ${\mathrm{I}}{=}{\mathrm{J}}$ interactions. This means that no cross-interactions for $\mathrm{I}!=\mathrm{J}$ will be specified in the data file and the pair style will apply its mixing rule, as documented on individual pair_style doc pages. Of course this behavior can be overridden in the input script after reading the data file, by specifying additional pair_coeff commands for any desired I,J pairs.  

If the value is specified as $i j$ , then one line of coefficients is written for all I,J pairs where $\ensuremath{\mathrm{I}}<=\ensuremath{\mathrm{J}}$ . These coefficients will include any specific settings made in the input script up to that point. The presence of these $\mathrm{I}!=\mathrm{J}$ coefficients in the data file will effectively turn off the default mixing rule for the pair style. Again, the coefficient values in the data file can be overridden in the input script after reading the data file, by specifying additional pair_coeff commands for any desired I,J pairs.  

# 1.117.4 Restrictions  

This command requires inter-processor communication to migrate atoms before the data file is written. This means that your system must be ready to perform a simulation before using this command (force fields setup, atom masses initialized, etc).  

# 1.117.5 Related commands  

read_data, write_restart  

# 1.117.6 Default  

The option defaults are pair $=$ ii and types $=$ numeric.  

# 1.118 write_dump command  

# 1.118.1 Syntax  

write_dump group-ID style file dump-args modify dump_modify-args  

• group- $\mathrm{{\cdot}I D=I D}$ of the group of atoms to be dumped   
• style $=$ any of the supported dump styles   
• file $=$ name of file to write dump info to   
• dump-args $=$ any additional args needed for a particular dump style   
• modify $=$ all args after this keyword are passed to dump_modify (optional)   
• dump-modify-args $=$ args for dump_modify (optional)  

# 1.118.2 Examples  

write_dump all atom dump.atom   
write_dump subgroup atom dump.run.bin   
write_dump all custom dump.myforce.\* id type x y vx fx   
write_dump flow custom dump. $\%$ .myforce id type c_myF[3] v_ke modify sort id   
write_dump all xyz system.xyz modify sort id element O H   
write_dump all image snap\*.jpg type type size 960 960 modify backcolor white   
write_dump all image snap\*.jpg element element & bond atom 0.3 shiny 0.1 ssao yes 6345 0.2 size 1600 1600 & modify backcolor white element C C O H N C C C O H H S O H   
write_dump all atom/gz dump.atom.gz modify compression_level 9   
write_dump flow custom/zstd dump. $\%$ .myforce.zst & id type c_myF[3] v_ke & modify sort id & compression_level 15  

# 1.118.3 Description  

Dump a single snapshot of atom quantities to one or more files for the current state of the system. This is a one-time immediate operation, in contrast to the dump command which will will set up a dump style to write out snapshots periodically during a running simulation.  

The syntax for this command is mostly identical to that of the dump and dump_modify commands as if they were concatenated together, with the following exceptions: There is no need for a dump ID or dump frequency and the keyword modify is added. The latter is so that the full range of dump_modify options can be specified for the single snapshot, just as they can be for multiple snapshots. The modify keyword separates the arguments that would normally be passed to the dump command from those that would be given the dump_modify. Both support optional arguments and thus LAMMPS needs to be able to cleanly separate the two sets of args.  

Note that if the specified filename uses wildcard characters “\*” or $^{66}\%^{3}$ ”, as supported by the dump command, they will operate in the same fashion to create the new filename(s). Normally, dump image files require a filename with a “\*” character for the timestep. That is not the case for the write_dump command; no wildcard “\*” character is necessary.  

# 1.118.4 Restrictions  

All restrictions for the dump and dump_modify commands apply to this command as well, with the exception of the dump image filename not requiring a wildcard “\*” character, as noted above.  

Since dumps are normally written during a run or energy minimization, the simulation has to be ready to run before this command can be used. Similarly, if the dump requires information from a compute, fix, or variable, the information needs to have been calculated for the current timestep (e.g. by a prior run), else LAMMPS will generate an error message.  

For example, it is not possible to dump per-atom energy with this command before a run has been performed, since no energies and forces have yet been calculated. See the variable doc page section on Variable Accuracy for more information on this topic.  

# 1.118.5 Related commands  

dump, dump image, dump_modify  

# 1.118.6 Default  

The defaults are listed on the doc pages for the dump and dump image and dump_modify commands.  

# 1.119 write_restart command  

# 1.119.1 Syntax  

write_restart file keyword value ...  

• file $=$ name of file to write restart information to   
• zero or more keyword/value pairs may be appended   
• keyword $=$ fileper or nfile fileper $\mathrm{arg}=\mathrm{Np}$ $\mathrm{Np}=$ write one file for every this many processors nfile $\mathrm{arg}=\mathrm{Nf}$ $\mathrm{Nf}=$ write this many files, one from each of Nf processors  

# 1.119.2 Examples  

<html><body><table><tr><td>write restart restart.equil</td></tr><tr><td>write t poly.%.* nfile 10</td></tr><tr><td>restart</td></tr></table></body></html>  

# 1.119.3 Description  

Write a binary restart file of the current state of the simulation.  

During a long simulation, the restart command is typically used to output restart files periodically. The write_restart command is useful after a minimization or whenever you wish to write out a single current restart file.  

Similar to dump files, the restart filename can contain two wild-card characters. If a “\*” appears in the filename, it is replaced with the current timestep value. If a $\mathbf{\hat{\mu}}^{\epsilon}\mathbf{C}\mathbf{\eta}_{0}^{\eta}$ character appears in the filename, then one file is written by each processor and the $^{66}\%^{,}$ character is replaced with the processor ID from 0 to P-1. An additional file with the “%” replaced by “base” is also written, which contains global information. For example, the files written for filename restart. $\%$ would be restart.base, restart.0, restart.1, . . . restart.P-1. This creates smaller files and can be a fast mode  

# 1.119. write_restart command  

of output and subsequent input on parallel machines that support parallel I/O. The optional fileper and nfile keywords discussed below can alter the number of files written.  

Restart files can be read by a read_restart command to restart a simulation from a particular state. Because the file is binary (to enable exact restarts), it may not be readable on another machine. In this case, you can use the -r commandline switch to convert a restart file to a data file.  

# $\Theta$ Note  

Although the purpose of restart files is to enable restarting a simulation from where it left off, not all information about a simulation is stored in the file. For example, the list of fixes that were specified during the initial run is not stored, which means the new input script must specify any fixes you want to use. Even when restart information is stored in the file, as it is for some fixes, commands may need to be re-specified in the new input script, in order to re-use that information. Details are usually given in the documentation of the respective command. Also, see the read_restart command for general information about what is stored in a restart file.  

The optional nfile or fileper keywords can be used in conjunction with the $^{66}\%$ ” wildcard character in the specified restart file name. As explained above, the $\mathbf{\hat{\mu}}^{\epsilon}\mathbf{C}\mathbf{\eta}_{0}^{\eta}$ character causes the restart file to be written in pieces, one piece for each of $\mathrm{\bfP}$ processors. By default $\mathrm{P}=$ the number of processors the simulation is running on. The nfile or fileper keyword can be used to set $\mathrm{\bfP}$ to a smaller value, which can be more efficient when running on a large number of processors.  

The nfile keyword sets $\mathrm{\bfP}$ to the specified Nf value. For example, if $\mathrm{Nf}=4$ , and the simulation is running on 100 processors, 4 files will be written, by processors 0,25,50,75. Each will collect information from itself and the next 24 processors and write it to a restart file.  

For the fileper keyword, the specified value of $\mathrm{Np}$ means write one file for every $\mathrm{Np}$ processors. For example, if ${\mathrm{Np}}=$ 4, every fourth processor (0,4,8,12,etc) will collect information from itself and the next 3 processors and write it to a restart file.  

# 1.119.4 Restrictions  

This command requires inter-processor communication to migrate atoms before the restart file is written. This means that your system must be ready to perform a simulation before using this command (force fields setup, atom masses initialized, etc).  

# 1.119.5 Related commands  

restart, read_restart, write_data  

# 1.119.6 Default  

none  

# FIX STYLES  

# 2.1 fix accelerate/cos command  

# 2.1.1 Syntax  

fix ID group-ID accelerate value  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • accelerate/cos $=$ style name of this fix command • value $=$ amplitude of acceleration (in unit of velocity/time)  

# 2.1.2 Examples  

fix 1 all accelerate/cos 2.0e-7  

# 2.1.3 Description  

Give each atom a acceleration in $\mathbf{X}$ -direction based on its $\mathbf{Z}$ coordinate. The acceleration is a periodic function along the $\mathbf{Z}$ -direction:  

$$
a_{x}(z)=A\cos\left(\frac{2\pi z}{l_{z}}\right)
$$  

where $A$ is the acceleration amplitude, $l_{z}$ is the $z$ -length of the simulation box. At steady state, the acceleration generates a velocity profile:  

$$
\nu_{x}(z)=V\cos\left(\frac{2\pi z}{l_{z}}\right)
$$  

The generated velocity amplitude $V$ is related to the shear viscosity $\eta$ by:  

$$
V=\frac{A\rho}{\eta}\left(\frac{l_{z}}{2\pi}\right)^{2}
$$  

and it can be obtained from ensemble average of the velocity profile:  

$$
V=\frac{\sum_{i}2m_{i}\nu_{i,x}\cos\left(\frac{2\pi z_{i}}{l_{z}}\right)}{\sum_{i}m_{i}},
$$  

where $m_{i},\nu_{i,x}$ , and $z_{i}$ are the mass, $x$ -component velocity, and $z$ -coordinate of a particle, respectively.  

The velocity amplitude $V$ can be calculated with compute viscosity/cos, which enables viscosity calculation with periodic perturbation method, as described by Hess. Because the applied acceleration drives the system away from equilibration, the calculated shear viscosity is lower than the intrinsic viscosity due to the shear-thinning effect. Extrapolation to zero acceleration should generally be performed to predict the zero-shear viscosity. As the shear stress decreases, the signal-to-noise ratio decreases rapidly, and the simulation time must be extended accordingly to get converged results.  

In order to get meaningful results, the group ID of this fix should be all.  

# 2.1.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is not invoked during energy minimization.  

# 2.1.5 Restrictions  

This fix is part of the MISC package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Since this fix depends on the $z$ -coordinate of atoms, it cannot be used in 2d simulations.  

# 2.1.6 Related commands  

compute viscosity/cos  

# 2.1.7 Default  

none  

(Hess) Hess, B. Journal of Chemical Physics 2002, 116 (1), 209–217.  

# 2.2 fix acks2/reaxff command  

Accelerator Variants: acks2/reaxff/kk  

# 2.2.1 Syntax  

fix ID group-ID acks2/reaxff Nevery cutlo cuthi tolerance params args  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• acks2/reaxf $=$ style name of this fix command   
• Nevery $=$ perform ACKS2 every this many steps   
• cutlo,cuthi $=$ lo and hi cutoff for Taper radius   
• tolerance $=$ precision to which charges will be equilibrated   
• params $=$ reaxff or a filename   
• one or more keywords or keyword/value pairs may be appended keyword $=$ maxiter maxiter $\mathrm{N}=$ limit the number of iterations to N  

# 2.2.2 Examples  

fix 1 all acks2/reaxff 1 0.0 10.0 1.0e-6 reaxff fix 1 all acks2/reaxff 1 0.0 10.0 1.0e-6 param.acks2 maxiter 500  

# 2.2.3 Description  

Perform the atom-condensed Kohn–Sham DFT to second order (ACKS2) charge equilibration method as described in (Verstraelen). ACKS2 impedes unphysical long-range charge transfer sometimes seen with QEq (e.g., for dissociation of molecules), at increased computational cost. It is typically used in conjunction with the ReaxFF force field model as implemented in the pair_style reaxff command, but it can be used with any potential in LAMMPS, so long as it defines and uses charges on each atom. For more technical details about the charge equilibration performed by fix acks2/reaxff, see the (O’Hearn) paper.  

The ACKS2 method minimizes the electrostatic energy of the system by adjusting the partial charge on individual atoms based on interactions with their neighbors. It requires some parameters for each atom type. If the params setting above is the word “reaxff”, then these are extracted from the pair_style reaxff command and the ReaxFF force field file it reads in. If a file name is specified for params, then the parameters are taken from the specified file and the file must contain one line for each atom type. The latter form must be used when performing QeQ with a non-ReaxFF potential. The lines should be formatted as follows:  

bond_softness itype chi eta gamma bcut  

where the first line is the global parameter bond_softness. The remaining 1 to Ntypes lines include itype, the atom type from 1 to Ntypes, chi, the electronegativity in eV, eta, the self-Coulomb potential in eV, gamma, the valence orbital exponent, and bcut, the bond cutoff distance. Note that these 4 quantities are also in the ReaxFF potential file, except that eta is defined here as twice the eta value in the ReaxFF file. Note that unlike the rest of LAMMPS, the units of this fix are hard-coded to be $\textrm{\AA}$ , eV, and electronic charge.  

The optional maxiter keyword allows changing the max number of iterations in the linear solver. The default value is 200.  

# Note  

In order to solve the self-consistent equations for electronegativity equalization, LAMMPS imposes the additional constraint that all the charges in the fix group must add up to zero. The initial charge assignments should also satisfy this constraint. LAMMPS will print a warning if that is not the case.  

# 2.2.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. This fix computes a global scalar (the number of iterations) for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is invoked during energy minimization.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

# 2.2. fix acks2/reaxff command  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.2.5 Restrictions  

This fix is part of the REAXFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix does not correctly handle interactions involving multiple periodic images of the same atom. Hence, it should not be used for periodic cell dimensions smaller than the non-bonded cutoff radius, which is typically $10\textup{\AA}$ for ReaxFF simulations.  

This fix may be used in combination with fix efield and will apply the external electric field during charge equilibration, but there may be only one fix efield instance used, it may only use a constant electric field, and the electric field vector may only have components in non-periodic directions.  

# 2.2.6 Related commands  

pair_style reaxff , fix qeq/reaxff , fix qtpi/reaxff  

# 2.2.7 Default  

maxiter 200  

(O’Hearn) O’Hearn, Alperen, Aktulga, SIAM J. Sci. Comput., 42(1), C1–C22 (2020).   
(Verstraelen) Verstraelen, Ayers, Speybroeck, Waroquier, J. Chem. Phys. 138, 074108 (2013).  

# 2.3 fix adapt command  

# 2.3.1 Syntax  

fix ID group-ID adapt N attribute args ... keyword value ...  

• ID, group-ID are documented in fix command   
• adapt $=$ style name of this fix command   
• $\Nu=$ adapt simulation settings every this many timesteps   
• one or more attribute/arg pairs may be appended   
• attribute $=p a i r$ or bond or angle or kspace or atom pair args $=$ pstyle pparam I J v_name pstyle $=$ pair style name (e.g., lj/cut) pparam $=$ parameter to adapt over time $\mathrm{I,J=typepair(s)}$ to set parameter for (integer or type label) v_name $=$ variable with name that calculates value of pparam bond args $=$ bstyle bparam I v_name bstyle $=$ bond style name (e.g., harmonic) bparam = parameter to adapt over time $1=\mathrm{type}$ bond to set parameter for (integer or type label) v_name $-$ variable with name that calculates value of bparam   
angle args = astyle aparam I v_name astyle = angle style name (e.g., harmonic) aparam = parameter to adapt over time I = type angle to set parameter for (integer or type label) v_name = variable with name that calculates value of aparam   
kspace arg = v_name   
v_name $=$ variable with name that calculates scale factor on $k$ -space terms   
atom args $=$ atomparam v_name atomparam $=$ charge or diameter or diameter/disc $=$ parameter to adapt over time v_name $=$ variable with name that calculates value of atomparam  

• zero or more keyword/value pairs may be appended  

# • keyword $=$ scale or reset or mass  

scale value $=\mathrm{no}$ or yes no $=$ the variable value is the new setting   
yes $=$ the variable value multiplies the original setting   
reset value $=\mathrm{no}$ or yes no $=$ values will remain altered at the end of a run   
yes = reset altered values to their original values at the end of a run   
mass value = no or yes no $-$ mass is not altered by changes in diameter yes $-$ mass is altered by changes in diameter  

# 2.3.2 Examples  

fix 1 all adapt 1 pair soft a $^\textrm{\scriptsize11}$ v_prefactor   
fix 1 all adapt 1 pair soft a $2^{*}3$ v_prefactor   
fix 1 all adapt 1 pair lj/cut epsilon $^{**}\mathrm{~v~}$ _scale1 pair coul/cut scale $^\textrm{\scriptsize33v}$ _scale2 scale yes reset yes   
fix 1 all adapt 10 atom diameter v_size   
variable ramp_up equal "ramp(0.01,0.5)"   
fix stretch all adapt 1 bond harmonic r0 1 v_ramp_up   
labelmap atom 1 c1   
fix 1 all adapt 1 pair soft a c1 c1 v_prefactor  

# 2.3.3 Description  

Change or adapt one or more specific simulation attributes or settings over time as a simulation runs. Pair potential and $k$ -space and atom attributes which can be varied by this fix are discussed below. Many other fixes can also be used to time-vary simulation parameters (e.g., the fix deform command will change the simulation box size/shape and the fix move command will change atom positions and velocities in a prescribed manner). Also note that many commands allow variables as arguments for specific parameters, if described in that manner on their doc pages. An equal-style variable can calculate a time-dependent quantity, so this is another way to vary a simulation parameter over time.  

If $N$ is specified as 0, the specified attributes are only changed once, before the simulation begins. This is all that is needed if the associated variables are not time-dependent. If $N>0$ , then changes are made every $N$ steps during the simulation, presumably with a variable that is time-dependent.  

Depending on the value of the reset keyword, attributes changed by this fix will or will not be reset back to their original values at the end of a simulation. Even if reset is specified as yes, a restart file written during a simulation will contain the modified settings.  

If the scale keyword is set to no, which is the default, then the value of the altered parameter will be whatever the variable generates. If the scale keyword is set to yes, then the value of the altered parameter will be the initial value of that parameter multiplied by whatever the variable generates (i.e., the variable is now a “scale factor” applied in (presumably) a time-varying fashion to the parameter).  

Note that whether scale is no or yes, internally, the parameters themselves are actually altered by this fix. Make sure you use the reset yes option if you want the parameters to be restored to their initial values after the run.  

The pair keyword enables various parameters of potentials defined by the pair_style command to be changed, if the pair style supports it. Note that the pair_style and pair_coeff commands must be used in the usual manner to specify these parameters initially; the fix adapt command simply overrides the parameters.  

![](images/16101af61b5394e0b3483bcc1108b95ce42de2357dceed7f2936c885d216cca4.jpg)  

# Note  

Pair_coeff settings must be made explicitly in order for fix adapt to be able to change them. Settings inferred from mixing are not suitable. If necessary all mixed settings can be output to a file using the write_coeff command and then the desired mixed pair_coeff settings copied from that file.  

The pstyle argument is the name of the pair style. If pair_style hybrid or hybrid/overlay is used, pstyle should be a sub-style name. If there are multiple sub-styles using the same pair style, then pstyle should be specified as “style:N”, where $N$ is which instance of the pair style you wish to adapt (e.g., the first or second). For example, pstyle could be specified as “soft” or “lubricate” or “lj/cut:1” or “lj/cut:2”. The pparam argument is the name of the parameter to change. This is the current list of pair styles and parameters that can be varied by this fix. See the doc pages for individual pair styles and their energy formulas for the meaning of these parameters:  

<html><body><table><tr><td>born</td><td>a,b,c</td><td>type pairs</td></tr><tr><td>born/coul/long,born/coul/msm</td><td>coulombic_cutoff</td><td>type global</td></tr><tr><td>born/gauss</td><td>biga0,biga1,r0</td><td>type pairs</td></tr><tr><td>buck,buck/coul/cut</td><td>a,c</td><td>type pairs</td></tr><tr><td>buck/coul/long,buck/coul/msm</td><td>a,c,coulombic_cutoff</td><td>type pairs</td></tr><tr><td>buck/mdf</td><td>a,c</td><td>type pairs</td></tr><tr><td>coul/cut, coul/cut/global</td><td>scale</td><td>type pairs</td></tr><tr><td>coul/cut/soft</td><td>lambda</td><td>type pairs</td></tr><tr><td>coul/debye</td><td>scale</td><td>type pairs</td></tr><tr><td>coul/dsf</td><td>coulombic_cutoff</td><td>type global</td></tr><tr><td>coul/long,coul/msm</td><td>coulombic_cutoff, scale</td><td>type pairs</td></tr><tr><td>coul/long/soft</td><td>scale, lambda, coulombic_cutoff</td><td>type pairs</td></tr><tr><td>coul/slater/long</td><td>scale</td><td>type pairs</td></tr><tr><td>coul/streitz</td><td>scale</td><td>type pairs</td></tr><tr><td>eam,eam/alloy,eam/fs</td><td>scale</td><td>type pairs</td></tr><tr><td>gauss</td><td>a</td><td>type pairs</td></tr><tr><td>harmonic/cut</td><td>k, cutoff</td><td>type pairs</td></tr><tr><td>kim</td><td>scale</td><td>type global</td></tr><tr><td>lennard/mdf</td><td>A,B</td><td>type pairs</td></tr><tr><td>lj/class2</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/class2/coul/cut, lj/class2/coul/long</td><td>epsilon,sigma,coulombic_cutoff</td><td>type pairs</td></tr><tr><td>lj/cut</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/cut/coul/cut,lj/cut/coul/long,lj/cut/coul/msm</td><td>epsilon,sigma,coulombic_cutoff</td><td>type pairs</td></tr><tr><td>lj/cut/coul/cut/soft,lj/cut/coul/long/soft</td><td>epsilon,sigma,lambda,coulombic_cutoff</td><td>type pairs</td></tr><tr><td>ljlcut/coul/dsf</td><td>cutoff</td><td>type global</td></tr><tr><td>lj/cut/tip4p/cut</td><td>epsilon,sigma,coulombic_cutoff</td><td>type pairs</td></tr></table></body></html>

continues on next page  

Table 1 – continued from previous page   


<html><body><table><tr><td>lj/cut/soft</td><td>epsilon,sigma,lambda</td><td>type pairs</td></tr><tr><td>lj/expand</td><td>epsilon,sigma,delta</td><td>type pairs</td></tr><tr><td>ljlmdf</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/sfldipolelsf</td><td>epsilon,sigma,scale</td><td>type pairs</td></tr><tr><td>lubricate</td><td>mu</td><td>global</td></tr><tr><td>meam</td><td>scale</td><td>type pairs</td></tr><tr><td>mie/cut</td><td>epsilon,sigma,gamma_repulsive,gamma_attractive</td><td>type pairs</td></tr><tr><td>morse,morse/smooth/inear</td><td>DO,RO,alpha</td><td>type pairs</td></tr><tr><td>morse/soft</td><td>D0,RO,alpha,lambda</td><td>type pairs</td></tr><tr><td>nm/cut</td><td>EO,RO,m,n</td><td>type pairs</td></tr><tr><td>nm/cut/coul/cut,nm/cut/coul/long</td><td>E0,RO,m,n,coulombic_cutoff</td><td>type pairs</td></tr><tr><td>pace,pace/extrapolation</td><td>scale</td><td>type pairs</td></tr><tr><td>quip</td><td>scale</td><td>type global</td></tr><tr><td>snap</td><td>scale</td><td>type pairs</td></tr><tr><td>spin/dmi</td><td>coulombic_cutoff</td><td>type global</td></tr><tr><td>spin/exchange</td><td>coulombic_cutoff</td><td>type global</td></tr><tr><td>spin/magelec</td><td>coulombic_cutoff</td><td>type global</td></tr><tr><td>spin/neel</td><td>coulombic_cutoff</td><td>type global</td></tr><tr><td>soft</td><td>a</td><td>type pairs</td></tr><tr><td>table</td><td>table_cutoff</td><td>type pairs</td></tr><tr><td>ufm</td><td>epsilon,sigma,scale</td><td>type pairs</td></tr><tr><td>wf/cut</td><td>epsilon,sigma,nu,mu</td><td>type pairs</td></tr></table></body></html>  

# Note  

It is easy to add new pairwise potentials and their parameters to this list. All it typically takes is adding an extract() method to the pair_\*.cpp file associated with the potential.  

Some parameters are global settings for the pair style (e.g., the viscosity setting “mu” for pair_style lubricate). Other parameters apply to atom type pairs within the pair style (e.g., the prefactor $a$ for pair_style soft).  

Note that for many of the potentials, the parameter that can be varied is effectively a prefactor on the entire energy expression for the potential (e.g., the lj/cut epsilon). The parameters listed as “scale” are exactly that, since the energy expression for the coul/cut potential (for example) has no labeled prefactor in its formula. To apply an effective prefactor to some potentials, multiple parameters need to be altered. For example, the Buckingham potential needs both the $A$ and $C$ terms altered together. To scale the Buckingham potential, you should thus list the pair style twice, once for $A$ and once for $C$ .  

If a type pair parameter is specified, the $I$ and $J$ settings should be specified to indicate which type pairs to apply it to.   
If a global parameter is specified, the $I$ and $J$ settings still need to be specified, but are ignored.  

Similar to the pair_coeff command, $I$ and $J$ can be specified in one of several ways. Explicit numeric values can be used for each, as in the first example above. Or, one or both of the types in the I,J pair can be a type label. LAMMPS sets the coefficients for the symmetric $J,I$ interaction to the same values.  

A wild-card asterisk can be used in place of or in conjunction with the $I,J$ arguments to set the coefficients for multiple pairs of atom types. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast\rightarrow}$ or $\ '_{\mathrm{m}}\ast_{\mathrm{n}}\cdots$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive). For the asterisk syntax, note that only type pairs with $I\leq J$ are considered; if asterisks imply type pairs where $J<I$ , they are ignored.  

IMPORTANT NOTE: If pair_style hybrid or hybrid/overlay is being used, then the pstyle will be a sub-style name.  

# 2.3. fix adapt command  

You must specify $I,J$ arguments that correspond to type pair values defined (via the pair_coeff command) for that sub-style.  

The $\nu.$ _name argument for keyword pair is the name of an equal-style variable which will be evaluated each time this fix is invoked to set the parameter to a new value. It should be specified as v_name, where name is the variable name. Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify parameters that change as a function of time or span consecutive runs in a continuous fashion. For the latter, see the start and stop keywords of the run command and the elaplong keyword of thermo_style custom for details.  

For example, these commands would change the prefactor coefficient of the pair_style soft potential from 10.0 to 30.0 in a linear fashion over the course of a simulation:  

variable prefactor equal ramp(10,30) fix 1 all adapt 1 pair soft a \* \* v_prefactor  

The bond keyword uses the specified variable to change the value of a bond coefficient over time, very similar to how the pair keyword operates. The only difference is that now a bond coefficient for a given bond type is adapted.  

A wild-card asterisk can be used in place of or in conjunction with the bond type argument to set the coefficients for multiple bond types. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\flat}$ or $\overline{{\mathbf{\omega}}}_{\mathrm{m}}^{*}\mathfrak{n}^{,}$ . If $N$ is the number of bond types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

If bond_style hybrid is used, bstyle should be a sub-style name. The bond styles that currently work with fix adapt are:  

<html><body><table><tr><td>class2</td><td>k2,k3,k4,r0 type bonds</td></tr><tr><td>fene</td><td>k,r0 type bonds</td></tr><tr><td>fenelexpand</td><td>k,r0,epsilon,sigma,shift type bonds</td></tr><tr><td>fene/nm</td><td>k,r0 type bonds</td></tr><tr><td>gaussian</td><td>alpha,width,r0 type bonds</td></tr><tr><td>gromos</td><td>k,r0 type bonds</td></tr><tr><td>harmonic</td><td>k,r0 type bonds</td></tr><tr><td>harmonic/restrain</td><td>k type bonds</td></tr><tr><td>harmonic/shift</td><td>k,r0,rl type bonds</td></tr><tr><td>harmonic/shift/cut</td><td>k,r0,rl type bonds</td></tr><tr><td>mm3</td><td>k,r0 type bonds</td></tr><tr><td>morse</td><td>d0,alpha,r0 type bonds</td></tr><tr><td>nonlinear</td><td>lamda,epsilon,r0 type bonds</td></tr></table></body></html>  

Added in version 4May2022.  

The angle keyword uses the specified variable to change the value of an angle coefficient over time, very similar to how the pair keyword operates. The only difference is that now an angle coefficient for a given angle type is adapted.  

A wild-card asterisk can be used in place of or in conjunction with the angle type argument to set the coefficients for multiple angle types. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\flat}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the number of angle types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

If angle_style hybrid is used, astyle should be a sub-style name. The angle styles that currently work with fix adapt are:  

<html><body><table><tr><td>harmonic</td><td>k,theta0</td><td>type angles</td></tr><tr><td>charmm</td><td>k,theta0</td><td>type angles</td></tr><tr><td>class2</td><td>k2,k3,k4,theta0</td><td>type angles</td></tr><tr><td>cosine</td><td>k</td><td>type angles</td></tr><tr><td>cosine/delta</td><td>k</td><td>type angles</td></tr><tr><td>cosine/periodic</td><td>k,b,n</td><td>type angles</td></tr><tr><td>cosine/squared</td><td>k,theta0</td><td>type angles</td></tr><tr><td>cosine/squared/restricted</td><td>k,theta0</td><td>type angles</td></tr><tr><td>dipole</td><td>k,gamma0</td><td>type angles</td></tr><tr><td>fourier</td><td>k,c0,c1,c2</td><td>type angles</td></tr><tr><td>fourier/simple</td><td>k,c,n</td><td>type angles</td></tr><tr><td>gaussian</td><td>alpha,width,theta0</td><td>type angles</td></tr><tr><td>mm3</td><td>k,theta0</td><td>type angles</td></tr><tr><td>mwlc</td><td>k1,k2,mu,T</td><td>type angles</td></tr><tr><td>quartic</td><td>k2,k3,k4,theta0</td><td>type angles</td></tr><tr><td>spica</td><td>k,theta0</td><td>type angles</td></tr></table></body></html>  

Note that internally, theta0 is stored in radians, so the variable this fix uses to reset theta0 needs to generate values in radians.  

The kspace keyword used the specified variable as a scale factor on the energy, forces, virial calculated by whatever $k$ -space solver is defined by the kspace_style command. If the variable has a value of 1.0, then the solver is unaltered.  

The kspace keyword works this way whether the scale keyword is set to no or yes.  

The atom keyword enables various atom properties to be changed. The aparam argument is the name of the parameter to change. This is the current list of atom parameters that can be varied by this fix:  

• charge $=$ charge on particle • diameter or diameter/disc $=$ diameter of particle  

The $\nu.$ _name argument of the atom keyword is the name of an equal-style variable which will be evaluated each time this fix is invoked to set, or scale the parameter to a new value. It should be specified as v_name, where name is the variable name. See the discussion above describing the formulas associated with equal-style variables. The new value is assigned to the corresponding attribute for all atoms in the fix group.  

If the atom parameter is diameter and per-atom density and per-atom mass are defined for particles (e.g., atom_style granular), then the mass of each particle is, by default, also changed when the diameter changes. The mass is set from the particle volume for 3d systems (density is assumed to stay constant). For 2d, the default is for LAMMPS to model particles with a radius attribute as spheres. However, if the atom parameter is diameter/disc, then the mass is set from the particle area (the density is assumed to be in mass/distance2 units). The mass of the particle may also be kept constant if the mass keyword is set to no. This can be useful to account for diameter changes that do not involve mass changes (e.g., thermal expansion).  

For example, these commands would shrink the diameter of all granular particles in the “center” group from 1.0 to 0.1 in a linear fashion over the course of a 1000-step simulation:  

variable size equal ramp(1.0,0.1) fix 1 center adapt 10 atom diameter v_size  

This fix can be used in long simulations which are restarted one or more times to continuously adapt simulation parameters, but it must be done carefully. There are two issues to consider. The first is how to adapt the parameters in  

# 2.3. fix adapt command  

a continuous manner from one simulation to the next. The second is how, if desired, to reset the parameters to their original values at the end of the last restarted run.  

Note that all the parameters changed by this fix are written into a restart file in their current changed state. A new restarted simulation does not know the original time ${=}0$ values, unless the input script explicitly resets the parameters (after the restart file is read) to the original values.  

Also note that the time-dependent variable(s) used in the restart script should typically be written as a function of time elapsed since the original simulation began.  

With this in mind, if the scale keyword is set to no (the default) in a restarted simulation, original parameters are not needed. The adapted parameters should seamlessly continue their variation relative to the preceding simulation.  

If the scale keyword is set to yes, then the input script should typically reset the parameters being adapted to their original values, so that the scaling formula specified by the variable will operate correctly. An exception is if the atom keyword is being used with scale yes. In this case, information is added to the restart file so that per-atom properties in the new run will automatically be scaled relative to their original values. This will only work if the fix adapt command specified in the restart script has the same ID as the one used in the original script.  

In a restarted run, if the reset keyword is set to yes, and the run ends in this script (as opposed to just writing more restart files), parameters will be restored to the values they were at the beginning of the run command in the restart script, which as explained above, may or may not be the original values of the parameters. Again, an exception is if the atom keyword is being used with reset yes (in all the runs). In that case, the original per-atom parameters are stored in the restart file, and will be restored when the restarted run finally completes.  

# 2.3.4 Restart, fix_modify, output, run start/stop, minimize info  

If the atom keyword is used and the scale or reset keyword is set to yes, then this fix writes information to a restart file so that in a restarted run scaling can continue in a seamless manner and/or the per-atom values can be restored, as explained above.  

None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

For rRESPA time integration, this fix changes parameters on the outermost rRESPA level.  

# 2.3.5 Restrictions  

none  

# 2.3.6 Related commands  

compute ti, fix adapt/fep  

# 2.3.7 Default  

The option defaults are scale $=$ no, reset $=$ no, mass $=$ yes.  

# 2.4 fix adapt/fep command  

# 2.4.1 Syntax  

fix ID group-ID adapt/fep N attribute args ... keyword value ...  

• ID, group-ID are documented in fix command • adapt/fep $=$ style name of this fix command • $\Nu=$ adapt simulation settings every this many timesteps • one or more attribute/arg pairs may be appended • attribute $=p a i r$ or kspace or atom  

pair args $=$ pstyle pparam I J v_name pstyle $=$ pair style name (e.g., lj/cut) pparam $=$ parameter to adapt over time $\mathrm{I,J=}$ type pair(s) to set parameter for (integer or type label) v_name $=$ variable with name that calculates value of pparam   
kspace arg = v_name v_name $=$ variable with name that calculates scale factor on K-space terms   
atom args $=$ aparam v_name aparam $=$ parameter to adapt over time $\mathbf{I}=\mathrm{type}(\mathbf{s})$ to set parameter for (integer or type label) v_name $=$ variable with name that calculates value of aparam  

• zero or more keyword/value pairs may be appended • keyword $=$ scale or reset or after  

scale value $=\mathrm{no}$ or yes no $=$ the variable value is the new setting yes $=$ the variable value multiplies the original setting   
reset value $=\mathrm{no}$ or yes no $=$ values will remain altered at the end of a run yes = reset altered values to their original values at the end of a run   
after value = no or yes no = parameters are adapted at timestep N yes $-$ parameters are adapted one timestep after N  

# 2.4.2 Examples  

fix 1 all adapt/fep 1 pair soft a 1 1 v_prefactor   
fix 1 all adapt/fep 1 pair soft a 2\* 3 v_prefactor   
fix 1 all adapt/fep 1 pair lj/cut epsilon \* \* v_scale1 coul/cut scale $^\textrm{\scriptsize33v}$ _scale2 scale yes reset yes   
fix 1 all adapt/fep 10 atom diameter 1 v_size  

labelmap atom 1 c1 fix 1 all adapt/fep 1 pair soft a c1 c1 v_prefactor  

Example input scripts available: examples/PACKAGES/fep  

# 2.4.3 Description  

Change or adapt one or more specific simulation attributes or settings over time as a simulation runs.  

This is an enhanced version of the fix adapt command with two differences: • It is possible to modify the charges of chosen atom types only, instead of scaling all the charges in the system. • There is a new option after for better compatibility with fix ave/time.   
This version is suited for free energy calculations using compute ti or compute fep.  

If $N$ is specified as 0, the specified attributes are only changed once, before the simulation begins. This is all that is needed if the associated variables are not time-dependent. If $N>0$ , then changes are made every $N$ steps during the simulation, presumably with a variable that is time-dependent.  

Depending on the value of the reset keyword, attributes changed by this fix will or will not be reset back to their original values at the end of a simulation. Even if reset is specified as yes, a restart file written during a simulation will contain the modified settings.  

If the scale keyword is set to no, then the value the parameter is set to will be whatever the variable generates. If the scale keyword is set to yes, then the value of the altered parameter will be the initial value of that parameter multiplied by whatever the variable generates (i.e., the variable is now a “scale factor” applied in (presumably) a time-varying fashion to the parameter). Internally, the parameters themselves are actually altered; make sure you use the reset yes option if you want the parameters to be restored to their initial values after the run.  

If the after keyword is set to yes, then the parameters are changed one timestep after the multiple of N. In this manner, if a fix such as “fix ave/time” is used to calculate averages at every N timesteps, all the contributions to the average will be obtained with the same values of the parameters.  

The pair keyword enables various parameters of potentials defined by the pair_style command to be changed, if the pair style supports it. Note that the pair_style and pair_coeff commands must be used in the usual manner to specify these parameters initially; the fix adapt command simply overrides the parameters.  

![](images/675a2f0f86fb5a664c7209093e2a7db3fa3d2faeac797e58afc98f231fb25be4.jpg)  

# Note  

Pair_coeff settings must be made explicitly in order for fix adapt/fep to be able to change them. Settings inferred from mixing are not suitable. If necessary all mixed settings can be output to a file using the write_coeff command and then the desired mixed pair_coeff settings copied from that file.  

The pstyle argument is the name of the pair style. If pair_style hybrid or hybrid/overlay is used, pstyle should be a sub-style name. For example, pstyle could be specified as “soft” or “lubricate”. The pparam argument is the name of the parameter to change. This is the current list of pair styles and parameters that can be varied by this fix. See the doc pages for individual pair styles and their energy formulas for the meaning of these parameters:  

<html><body><table><tr><td>born</td><td>a,b,c</td><td>type pairs</td></tr><tr><td>born/gauss</td><td>biga0,biga1,r0</td><td>type pairs</td></tr><tr><td>buck,buck/coul/cut,buck/coul/long,buck/coul/msm</td><td>a,c</td><td>type pairs</td></tr><tr><td>buck/mdf</td><td>a,c</td><td>type pairs</td></tr><tr><td>coul/cut,coul/cut/global</td><td>scale</td><td>type pairs</td></tr><tr><td>coul/cut/soft</td><td>lambda</td><td>type pairs</td></tr><tr><td>coul/debye</td><td>scale</td><td>type pairs</td></tr><tr><td>coul/long, coul/msm</td><td>scale</td><td>type pairs</td></tr><tr><td>coul/long/soft</td><td>scale, lambda</td><td>type pairs</td></tr><tr><td>coul/slater/long</td><td>scale</td><td>type pairs</td></tr><tr><td>coul/streitz</td><td>scale</td><td>type pairs</td></tr><tr><td>eam,eam/alloy,eam/fs</td><td>scale</td><td>type pairs</td></tr><tr><td>harmonic/cut</td><td>k</td><td>type pairs</td></tr><tr><td>gauss</td><td>a</td><td>type pairs</td></tr><tr><td>lennard/mdf</td><td>a,b</td><td>type pairs</td></tr><tr><td>lj/class2</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/class2/coul/cut,lj/class2/coul/long</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/cut</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/cut/soft</td><td>epsilon,sigma,lambda</td><td>type pairs</td></tr></table></body></html>

continues on next page  

Table 2 – continued from previous page   


<html><body><table><tr><td>lj/cut/coul/cut,lj/cut/coul/long,lj/cut/coul/msm</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/cut/coul/cut/soft,lj/cut/coul/long/soft</td><td>epsilon,sigma,lambda</td><td>type pairs</td></tr><tr><td>lj/cut/tip4p/cut,lj/cut/tip4p/long</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/cut/tip4p/long/soft</td><td>epsilon,sigma,lambda</td><td>type pairs</td></tr><tr><td>lj/expand</td><td>epsilon,sigma,delta</td><td>type pairs</td></tr><tr><td>lj/mdf</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/sf/dipole/sf</td><td>epsilon,sigma,scale</td><td>type pairs</td></tr><tr><td>meam</td><td>scale</td><td>type pairs</td></tr><tr><td>mie/cut</td><td>epsilon,sigma,gamR,gamA</td><td>type pairs</td></tr><tr><td>morse,morse/smooth/linear</td><td>d0,r0,alpha</td><td>type pairs</td></tr><tr><td>morse/soft</td><td>d0,r0,alpha,lambda</td><td>type pairs</td></tr><tr><td>nm/cut</td><td>e0,r0,nn,mm</td><td>type pairs</td></tr><tr><td>nm/cut/coul/cut,nm/cut/coul/long</td><td>e0,r0,nn,mm</td><td>type pairs</td></tr><tr><td>pace,pace/extrapolation</td><td>scale</td><td>type pairs</td></tr><tr><td>snap</td><td>scale</td><td>type pairs</td></tr><tr><td>soft</td><td>a</td><td>type pairs</td></tr><tr><td>ufm</td><td>epsilon,sigma,scale</td><td>type pairs</td></tr><tr><td>wf/cut</td><td>epsilon,sigma,nu,mu</td><td>type pairs</td></tr></table></body></html>  

# Note  

It is easy to add new potentials and their parameters to this list. All it typically takes is adding an extract() method to the pair_\*.cpp file associated with the potential.  

Note that for many of the potentials, the parameter that can be varied is effectively a prefactor on the entire energy expression for the potential (e.g., the lj/cut epsilon). The parameters listed as “scale” are exactly that, since the energy expression for the coul/cut potential (for example) has no labeled prefactor in its formula. To apply an effective prefactor to some potentials, multiple parameters need to be altered. For example, the Buckingham potential needs both the A and C terms altered together. To scale the Buckingham potential, you should thus list the pair style twice, once for A and once for C.  

If a type pair parameter is specified, the $I$ and $J$ settings should be specified to indicate which type pairs to apply it to.   
If a global parameter is specified, the $I$ and $J$ settings still need to be specified, but are ignored.  

Similar to the pair_coeff command, $I$ and $J$ can be specified in one of several ways. Explicit numeric values can be used for each, as in the first example above. Or, one or both of the types in the I,J pair can be a type label. LAMMPS sets the coefficients for the symmetric $J,I$ interaction to the same values.  

A wild-card asterisk can be used in place of or in conjunction with the $I,J$ arguments to set the coefficients for multiple pairs of atom types. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast\rightarrow}$ or $\ '_{\mathrm{m}}\ast_{\mathrm{n}}\cdots$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive). For the asterisk syntax, note that only type pairs with $I\leq J$ are considered; if asterisks imply type pairs where $J<I$ , they are ignored.  

IMPROTANT NOTE: If pair_style hybrid or hybrid/overlay is being used, then the pstyle will be a sub-style name. You must specify $I,J$ arguments that correspond to type pair values defined (via the pair_coeff command) for that sub-style.  

The $\nu.$ _name argument for keyword pair is the name of an equal-style variable which will be evaluated each time this fix is invoked to set the parameter to a new value. It should be specified as v_name, where name is the variable name. Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify parameters that change as a function of time or span consecutive runs in a continuous fashion. For the latter, see the start and stop keywords of the run command and the elaplong keyword of thermo_style custom for details.  

For example, these commands would change the prefactor coefficient of the pair_style soft potential from 10.0 to 30.0 in a linear fashion over the course of a simulation:  

variable prefactor equal ramp(10,30) fix 1 all adapt 1 pair soft a \* \* v_prefactor  

The kspace keyword used the specified variable as a scale factor on the energy, forces, virial calculated by whatever $k$ -space solver is defined by the kspace_style command. If the variable has a value of 1.0, then the solver is unaltered.  

The kspace keyword works this way whether the scale keyword is set to no or yes.  

The atom keyword enables various atom properties to be changed. The aparam argument is the name of the parameter to change. This is the current list of atom parameters that can be varied by this fix:  

• charge $=$ charge on particle • diameter $=$ diameter of particle  

The $I$ argument indicates which atom types are affected. A wild-card asterisk can be used in place of or in conjunction with the $I$ argument to set the coefficients for multiple atom types.  

The $\nu_{,}$ _name argument of the atom keyword is the name of an equal-style variable which will be evaluated each time this fix is invoked to set the parameter to a new value. It should be specified as v_name, where name is the variable name. See the discussion above describing the formulas associated with equal-style variables. The new value is assigned to the corresponding attribute for all atoms in the fix group.  

If the atom parameter is diameter and per-atom density and per-atom mass are defined for particles (e.g., atom_style granular), then the mass of each particle is also changed when the diameter changes (density is assumed to stay constant).  

For example, these commands would shrink the diameter of all granular particles in the “center” group from 1.0 to 0.1 in a linear fashion over the course of a 1000-step simulation:  

<html><body><table><tr><td>variable size equal ramp(1.0,0.1)</td></tr><tr><td>fix 1 center adapt 10 atom diameter * vsize</td></tr></table></body></html>  

For rRESPA time integration, this fix changes parameters on the outermost rRESPA level.  

# 2.4.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.4.5 Restrictions  

The keyword “scale yes” is not supported for scaling per-atom parameters diameter and change. You can use fix adapt for those.  

# 2.4.6 Related commands  

compute fep, fix adapt, compute ti, pair_style \*/soft  

# 2.4.7 Default  

The option defaults are scale $=$ no, reset $=$ no, after $=$ no.  

# 2.5 fix add/heat command  

# 2.5.1 Syntax  

fix ID group-ID add/heat style args keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• add/heat $=$ style name of this fix command   
• style $=$ constant or linear or quartic constant args $=$ rate rate $=$ rate of heat flow (energy/time units) linear args $=$ Ttarget k Ttarget $=$ target temperature (temperature units) $\mathrm{k}=$ prefactor (energy/(time\*temperature) units) quartic args $=$ Ttarget k Ttarget $=$ target temperature (temperature units) $\mathrm{k}=$ prefactor (energy/(time\*temperature $\widehat{\mathbf{\xi}}_{\mathrm{~\tiny~4~}}$ ) units)   
• zero or more keyword/value pairs may be appended to args   
• keyword $=$ overwrite overwrite value $\mathrm{\Delta~}=\mathrm{yes}$ or no yes $=$ sets current heat flow of particle no $=$ adds to current heat flow of particle  

# 2.5.2 Examples  

<html><body><table><tr><td>fix 1 all add/heat constant vheat</td></tr><tr><td>fix 1 all add/heat linear 10.0 1.0 overwrite yes</td></tr></table></body></html>  

# 2.5.3 Description  

This fix adds heat to particles with the temperature attribute every timestep at a given rate. Note that this is an internal temperature of a particle intended for use with non-atomistic models like the discrete element method.  

For the constant style, heat is added at the specified rate. For the linear style, heat is added at a rate of $k(T_{t a r g e t}-T)$ where $k$ is the specified prefactor, $T_{t a r g e t}$ is the specified target temperature, and $T$ is the temperature of the atom. This may be more representative of a conductive process. For the quartic style, heat is added at a rate of $k(T_{t a r g e t}^{4}-T^{4})$ , akin to radiative heat transfer.  

The rate or temperature can be can be specified as an equal-style or atom-style variable. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each time step, and its value will be used to determine the rate of heat added.  

Equal-style variables can specify formulas with various mathematical functions and include thermo_style command keywords for the simulation box parameters, time step, and elapsed time to specify time-dependent heating.  

# 2.5. fix add/heat command  

Atom-style variables can specify the same formulas as equal-style variables but can also include per-atom values, such as atom coordinates to specify spatially-dependent heating.  

If the overwrite keyword is set to yes, this fix will set the total heat flow on a particle every timestep, overwriting contributions from pair styles or other fixes. If overwrite is no, this fix will add heat on top of other contributions.  

# 2.5.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.5.5 Restrictions  

This pair style is part of the GRANULAR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store temperature and heat flow as defined by the fix property/atom command or included in certain atom styles, such as atom_style rheo/thermal.  

# 2.5.6 Related commands  

fix heat/flow, fix property/atom, fix rheo/thermal  

# 2.5.7 Default  

The default for the overwrite keyword is no  

# 2.6 fix addforce command  

# 2.6.1 Syntax  

fix ID group-ID addforce fx fy fz keyword value ...  

• ID, group-ID are documented in fix command • addforce $=$ style name of this fix command • fx,fy,fz $=$ force component values (force units)  

any of fx,fy,fz can be a variable (see below)  

• zero or more keyword/value pairs may be appended to args • keyword $=$ every or region or energy  

every value $=$ Nevery   
Nevery $=$ add force every this many time steps   
region value $=$ region-ID   
region- $\mathrm{\cdotID}=\mathrm{ID}$ of region atoms must be in to have added force   
energy value $=\mathrm{~v~}$ _name   
v_name $=$ variable with name that calculates the potential energy of each atom in the added␣   
$\hookrightarrow$ force field  

# 2.6.2 Examples  

fix kick flow addforce 1.0 0.0 0.0 fix kick flow addforce $1.00.0\mathrm{~v~}$ _oscillate fix ff boundary addforce $0.00.0\mathrm{~v~}$ _push energy v_espace  

# 2.6.3 Description  

Add $(f_{x},f_{y},f_{z})$ to the corresponding component of the force for each atom in the group. This command can be used to give an additional push to atoms in a simulation, such as for a simulation of Poiseuille flow in a channel.  

Any of the three quantities defining the force components, namely $f_{x},f_{y}$ , and $f_{z}$ , can be specified as an equal-style or atom-style variable. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each time step, and its value(s) will be used to determine the force component(s).  

Equal-style variables can specify formulas with various mathematical functions and include thermo_style command keywords for the simulation box parameters, time step, and elapsed time. Thus, it is easy to specify a time-dependent force field.  

Atom-style variables can specify the same formulas as equal-style variables but can also include per-atom values, such as atom coordinates. Thus, it is easy to specify a spatially-dependent force field with optional time-dependence as well.  

If the every keyword is used, the Nevery setting determines how often the forces are applied. The default value is 1, for every time step.  

If the region keyword is used, the atom must also be in the specified geometric region in order to have force added to it.  

Adding a force to atoms implies a change in their potential energy as they move due to the applied force field. For dynamics via the “run” command, this energy can be optionally added to the system’s potential energy for thermodynamic output (see below). For energy minimization via the “minimize” command, this energy must be added to the system’s potential energy to formulate a self-consistent minimization problem (see below).  

The energy keyword is not allowed if the added force is a constant vector $\vec{F}=(f_{x},f_{y},f_{z})$ , with all components defined as numeric constants and not as variables. This is because LAMMPS can compute the energy for each atom directly as  

$$
E=-{\vec{x}}\cdot{\vec{F}}=-(x f_{x}+y f_{y}+z f_{z}),
$$  

so that $-\vec{\nabla}E=\vec{F}$ .  

The energy keyword is optional if the added force is defined with one or more variables, and if you are performing dynamics via the run command. If the keyword is not used, LAMMPS will set the energy to 0.0, which is typically fine for dynamics.  

The energy keyword is required if the added force is defined with one or more variables, and you are performing energy minimization via the “minimize” command. The keyword specifies the name of an atom-style variable which is used to compute the energy of each atom as function of its position. Like variables used for $f_{x},f_{y},f_{z}$ , the energy variable is specified as v_name, where name is the variable name.  

Note that when the energy keyword is used during an energy minimization, you must ensure that the formula defined for the atom-style variable is consistent with the force variable formulas (i.e., that $-\vec{\nabla}E=\vec{F}$ ). For example, if the force were a spring-like, ${\vec{F}}=-k{\vec{x}}$ , then the energy formula should be $\begin{array}{r}{E=\frac12k x^{2}}\end{array}$ . If you do not do this correctly, the minimization will not converge properly.  

# 2.6.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the potential energy inferred by the added force to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no. Note that this energy is a fictitious quantity but is needed so that the minimize command can include the forces added by this fix in a consistent manner (i.e., there is a decrease in potential energy when atoms move in the direction of the added force).  

The fix_modify virial option is supported by this fix to add the contribution due to the added forces on atoms to both the global pressure and per-atom stress of the system via the compute pressure and compute stress/atom commands. The former can be accessed by thermodynamic output. The default setting for this fix is fix_modify virial no.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the $r$ -RESPA integrator the fix is adding its forces. Default is the outermost level.  

This fix computes a global scalar and a global three-vector of forces, which can be accessed by various output commands. The scalar is the potential energy discussed above. The vector is the total force on the group of atoms before the forces on individual atoms are changed by the fix. The scalar and vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command. You should not specify force components with a variable that has time-dependence for use with a minimizer, since the minimizer increments the time step as the iteration count during the minimization.  

![](images/4f44937e38c77f2a8c00ef435d3191c67dde194d7a1a51c61e3fc52e30b4a728.jpg)  

# Note  

If you want the fictitious potential energy associated with the added forces to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for this fix.  

# 2.6.5 Restrictions  

none  

# 2.6.6 Related commands  

fix setforce, fix aveforce  

# 2.6.7 Default  

The option default for the every keyword is every $=1$ .  

# 2.7 fix addtorque command  

# 2.7.1 Syntax  

fix ID group-ID addtorque Tx Ty Tz • ID, group-ID are documented in fix command • addtorque $=$ style name of this fix command • $\mathrm{Tx,Ty,Tz=}$ torque component values (torque units) • any of $\mathrm{Tx}$ ,Ty,Tz can be a variable (see below)  

# 2.7.2 Examples  

fix kick bead addtorque 2.0 3.0 5.0 fix kick bead addtorque 0.0 0.0 v_oscillate  

# 2.7.3 Description  

Add a set of forces to each atom in the group such that:  

• the components of the total torque applied on the group (around its center of mass) are $T_{x},T_{y}$ , and $T_{z}$ • the group would move as a rigid body in the absence of other forces.  

This command can be used to drive a group of atoms into rotation.  

Any of the three quantities defining the torque components can be specified as an equal-style variable, namely $T x,T y$ , $T z$ . If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the torque component.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent torque.  

# 2.7.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the potential “energy” inferred by the added torques to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no. Note that this is a fictitious quantity but is needed so that the minimize command can include the forces added by this fix in a consistent manner (i.e., there is a decrease in potential energy when atoms move in the direction of the added forces).  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is adding its torque. Default is the outermost level.  

This fix computes a global scalar and a global 3-vector, which can be accessed by various output commands. The scalar is the potential energy discussed above. The vector is the total torque on the group of atoms before the forces on individual atoms are changed by the fix. The scalar and vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

![](images/cea424b46075a280e129f807f3ddf4a69f4233f2211d45476900f9963627263f.jpg)  

# Note  

If you want the fictitious potential energy associated with the added forces to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for this fix.  

# Note  

You should not specify force components with a variable that has time-dependence for use with a minimizer, since the minimizer increments the timestep as the iteration count during the minimization.  

# 2.7. fix addtorque command  

# 2.7.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.7.6 Related commands  

fix addforce  

# 2.7.7 Default  

none  

# 2.8 fix alchemy command  

# 2.8.1 Syntax  

fix ID group-ID alchemy v_name  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • alchemy $=$ style name of this fix command • v_name $=$ variable with name that determines the $\lambda_{R}$ value  

# 2.8.2 Examples  

# 2.8.3 Description  

Added in version 28Mar2023.  

This fix command enables an “alchemical transformation” to be performed between two systems, whereby one system slowly transforms into the other over the course of a molecular dynamics run. This is useful for measuring thermodynamic differences between two different systems. It also allows transformations that are not easily possible with the pair style hybrid/scaled, fix adapt or fix adapt/fep commands.  

Example inputs are included in the examples/PACKAGES/alchemy directory for (a) transforming a pure copper system into a copper/aluminum bronze alloy and (b) transforming two water molecules in a box of water into a hydronium and a hydroxyl ion.  

The two systems must be defined as separate replica and run in separate partitions of processors using the -partition command-line switch. Exactly two partitions must be specified, and each partition must use the same number of processors and the same domain decomposition.  

Because the forces applied to the atoms are the same mix of the forces from each partition and the simulation starts with the same atom positions across both partitions, they will generate the same trajectory of coordinates for each atom, and the same simulation box size and shape. The latter two conditions are enforced by this fix; it exchanges coordinates and box information between the replicas. This is not strictly required, but since MD simulations are an example of a chaotic system, even the tiniest random difference will eventually grow exponentially into an unwanted divergence.  

Otherwise, the properties of each atom (type, charge, bond and angle partners, etc.), as well as energy and forces between interacting atoms (pair, bond, angle styles, etc.) can be different in the two systems.  

This can be initialized in the same input script by using commands which only apply to one or the other replica. The example scripts use a world-style variable command along with if/then/else commands for this purpose. The partition command can also be used.  

create_box 2 box   
create_atoms 1 box   
pair_style eam/alloy   
pair_coeff \* \* AlCu.eam.alloy Cu Al $-$   
# replace 5% of copper with aluminum on the second partition only   
variable name world pure alloy   
if $"\S\{\mathrm{name}\}==\mathrm{allo}_{:}$ y" then $\&$ "set type 1 type/fraction 2 0.05 6745234"  

Both replicas must define an instance of this fix, but with a different $\nu.$ _name variable. The named variable must be an equal-style or equivalent variable. The two variables should be defined so that one ramps down from 1.0 to 0.0 for the first replica $(R{=}O)$ and the other ramps $u p$ from 0.0 to 1.0 for the second replica $(R{=}I)$ . A simple way is to do this is linearly, which can be done using the ramp() function of the variable command. You could also define a variable which returns a value between 0.0 and 1.0 as a non-linear function of the timestep. Here is a linear example:  

partition yes 1 variable ramp equal ramp(1.0,0.0) partition yes 2 variable ramp equal ramp(0.0,1.0) fix 2 all alchemy v_ramp  

![](images/28c8e93cd80db1ed6c144f4a08ebb6a3d20a1184ba73d7406188965989eec763.jpg)  

# Note  

For an alchemical transformation, the two variables should sum to exactly 1.0 at any timestep. LAMMPS does NOT check that this is the case.  

If you use the ramp() function to define the two variables, this fix can easily be used across successive runs in the same input script by ensuring each instance of the run command specifies the appropriate start or stop options.  

At each timestep of an MD run, the two instances of this fix evaluate their respective variables as a $\lambda_{R}$ factor, where $R=$ 0 or 1 for each replica. The forces used by each system for the propagation of their atoms is set to the sum of the forces for the two systems, each scaled by their respective $\lambda_{R}$ factor. Thus, during the MD run, the system will transform incrementally from the first system to the second system.  

![](images/58f63ee21c4fd4a1ea131c841de162d278703bbed56c907246c516d150a7b490.jpg)  

# Note  

As mentioned above, the coordinates of the atoms and box size/shape must be exactly the same in the two replicas. Therefore, it is generally not a good idea to initialize the two replicas by reading different data files or creating them individually from scratch. Rather, a single system should be initialized and then desired modifications applied to the system to either replica. If your input script somehow induces the two systems to become different (e.g. by performing atom_modify sort differently, or by adding or depositing a different number of atoms), then LAMMPS will detect the mismatch and generate an error. This is done by ensuring that each step the number and ordering of atoms is identical within each pair of processors in the two replicas.  

# 2.8.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix stores a global scalar (the current value of $\lambda_{R}$ ) and a global vector of length 3 which contains the potential energy of the first partition, the second partition and the combined value, respectively. The global scalar is unitless and  

“intensive”, the vector is in energy units and “extensive”. These values can be used by any command that uses a global value from a fix as input. See the output howto page for an overview of LAMMPS output options.  

This fix is not invoked during energy minimization.  

# 2.8.5 Restrictions  

This fix is part of the REPLICA package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

There may be only one instance of this fix in use at a time within each replica.  

# 2.8.6 Related commands  

compute pressure/alchemy command, fix adapt command, fix adapt/fep command, pair_style hybrid/scaled command.  

# 2.8.7 Default  

none  

# 2.9 fix amoeba/bitorsion command  

# 2.9.1 Syntax  

fix ID group-ID ameoba/bitorsion filename  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • amoeba/bitorsion $=$ style name of this fix command • filename $=$ force-field file with AMOEBA bitorsion coefficients  

# 2.9.2 Examples  

fix bit all amoeba/bitorsion bitorsion.ubiquitin.data read_data proteinX.data fix bit bitorsions BiTorsions fix_modify bit energy yes  

# 2.9.3 Description  

This command enables 5-body torsion/torsion interactions to be added to simulations which use the AMOEBA and HIPPO force fields. It matches how the Tinker MD code computes its torsion/torsion interactions for the AMOEBA and HIPPO force fields. See the Howto amoeba doc page for more information about the implementation of AMOEBA and HIPPO in LAMMPS.  

Bitorsion interactions add additional potential energy contributions to pairs of overlapping phi-psi dihedrals of aminoacids, which are important to properly represent their conformational behavior. Each bitorsion interaction is thus defined for a 5-tuple of atoms IJKLM with bonds between successive atoms in the list, i.e. two overlapping dihedral interactions for atoms IJKL and JKLM.  

The examples/amoeba directory has a sample input script and data file for ubiquitin, which illustrates use of the fix amoeba/bitorsion command.  

As in the example above, this fix should be used before reading a data file that contains a listing of bitorsion interactions.   
The filename specified should contain the bitorsion parameters for the AMOEBA or HIPPO force field.  

The data file read by the read_data command must contain the topology of all the bitorsion interactions, similar to the topology data for bonds, angles, dihedrals, etc. Specifically it should have a line like this in its header section:  

N bitorsions  

where $N$ is the number of bitorsion 5-body interactions. It should also have a section in the body of the data file like this with $N$ lines:  

<html><body><table><tr><td>BiTorsions</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>1</td><td>1</td><td>8</td><td>10</td><td>12</td><td>18</td><td>20</td></tr><tr><td>2</td><td>5</td><td>18</td><td>20</td><td>22</td><td>25</td><td>27</td></tr><tr><td>[..]</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>N</td><td>3</td><td>314</td><td>315</td><td>317</td><td>318</td><td>330</td></tr></table></body></html>  

The first column is an index from 1 to $N$ to enumerate the bitorsion 5-atom tuples; it is ignored by LAMMPS. The second column is the type of the interaction; it is an index into the bitorsion force field file. The remaining 5 columns are the atom IDs of the atoms (in order) for the 5-tuple IJKLM, as described above.  

Note that the bitorsions and BiTorsions keywords for the header and body sections match those specified in the read_data command following the data file name.  

The data file should be generated by using the tools/tinker/tinker2lmp.py conversion script which creates a LAMMPS data file from Tinker input files, including its PRM file which contains the parameters necessary for computing bitorsion interactions. The script must be invoked with the optional “-bitorsion” flag to do this; see the example for the ubiquitin system in the tools/tinker/README file. The same conversion script also creates the file of bitorsion coefficient data which is read by this command.  

The potential energy associated with bitorsion interactions can be output as described below. It can also be included in the total potential energy of the system, as output by the thermo_style command, if the fix_modify energy command is used, as in the example above. See the note below about how to include the bitorsion energy when performing an energy minimization.  

# 2.9.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the list of bitorsion interactions to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify energy option is supported by this fix to add the potential energy of the bitorsion interactions to both the global potential energy and peratom potential energies of the system as part of thermodynamic output or output by the compute pe/atom command. The default setting for this fix is fix_modify energy yes.  

The fix_modify virial option is supported by this fix to add the contribution due to the bitorsion interactions to both the global pressure and per-atom stress of the system via the compute pressure and compute stress/atom commands. The former can be accessed by thermodynamic output. The default setting for this fix is fix_modify virial yes.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the potential energy discussed above. The scalar value calculated by this fix is “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is adding its forces. Default is the outermost level.  

![](images/cd71e82ac9ebd829afffddd492ceb52e91e9136e34a37276fca1987172f2dfe4.jpg)  

# Note  

For energy minimization, if you want the potential energy associated with the bitorsion terms forces to be included in the total potential energy of the system (the quantity being minimized), you MUST not disable the fix_modify energy option for this fix.  

# 2.9.5 Restrictions  

To function as expected this fix command must be issued before a read_data command but after a read_restart command.  

This fix can only be used if LAMMPS was built with the AMOEBA package. See the Build package page for more info.  

# 2.9.6 Related commands  

fix_modify, read_data  

# 2.9.7 Default  

none  

# 2.10 fix amoeba/pitorsion command  

# 2.10.1 Syntax  

fix ID group-ID ameoba/pitorsion  

• ID, group-ID are documented in fix command • amoeba/pitorsion $=$ style name of this fix command  

# 2.10.2 Examples  

fix pit all amoeba/pitorsion   
read_data proteinX.data fix pit "pitorsion types" "PiTorsion Coeffs" & fix pit pitorsions PiTorsions   
fix_modify pit energy yes  

# 2.10.3 Description  

This command enables 6-body pitorsion interactions to be added to simulations which use the AMOEBA and HIPPO force fields. It matches how the Tinker MD code computes its pitorsion interactions for the AMOEBA and HIPPO force fields. See the Howto amoeba doc page for more information about the implementation of AMOEBA and HIPPO in LAMMPS.  

Pitorsion interactions add additional potential energy contributions to 6-tuples of atoms IJKLMN that have a bond between atoms $K$ and $L$ , where both $K$ and $L$ are additionally bonded to exactly two other atoms. Namely, $K$ is also bonded to $I$ and $J$ , and $L$ is also bonded to $M$ and $N$ .  

The examples/amoeba directory has a sample input script and data file for ubiquitin, which illustrates use of the fix amoeba/pitorsion command.  

As in the example above, this fix should be used before reading a data file that contains a listing of pitorsion interactions.  

The data file read by the read_data command must contain the topology of all the pitorsion interactions, similar to the topology data for bonds, angles, dihedrals, etc. Specifically, it should have two lines like these in its header section:  

<html><body><table><tr><td>M pitorsion types</td></tr><tr><td>N pitorsions</td></tr><tr><td></td></tr></table></body></html>  

where $N$ is the number of pitorsion 6-body interactions and $M$ is the number of pitorsion types. It should also have two sections in the body of the data file like these with $M$ and $N$ lines each:  

<html><body><table><tr><td>PiTorsion Coeffs</td></tr><tr><td>1 6.85 2 10.2 [..] M 6.85 PiTorsions</td></tr><tr><td</table></body></html>  

For PiTorsion Coeffs, the first column is an index from 1 to $M$ to enumerate the pitorsion types. The second column is the single prefactor coefficient needed for each type.  

For PiTorsions, the first column is an index from 1 to $N$ to enumerate the pitorsion 6-atom tuples; it is ignored by LAMMPS. The second column is the “type” of the interaction; it is an index into the PiTorsion Coeffs. The remaining 6 columns are the atom IDs of the atoms (in order) for the 6-tuple IJKLMN, as described above.  

Note that the pitorsion types and pitorsions and PiTorsion Coeffs and PiTorsions keywords for the header and body sections of the data file match those specified in the read_data command following the data file name.  

The data file should be generated by using the tools/tinker/tinker2lmp.py conversion script which creates a LAMMPS data file from Tinker input files, including its PRM file which contains the parameters necessary for computing pitorsion interactions.  

The potential energy associated with pitorsion interactions can be output as described below. It can also be included in the total potential energy of the system, as output by the thermo_style command, if the fix_modify energy command is used, as in the example above. See the note below about how to include the pitorsion energy when performing an energy minimization.  

# 2.10.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the list of pitorsion interactions to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify energy option is supported by this fix to add the potential energy of the pitorsion interactions to both the global potential energy and peratom potential energies of the system as part of thermodynamic output or output by the compute pe/atom command. The default setting for this fix is fix_modify energy yes.  

The fix_modify virial option is supported by this fix to add the contribution due to the pitorsion interactions to both the global pressure and per-atom stress of the system via the compute pressure and compute stress/atom commands. The former can be accessed by thermodynamic output. The default setting for this fix is fix_modify virial yes.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the potential energy discussed above. The scalar value calculated by this fix is “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is adding its forces. Default is the outermost level.  

![](images/f7ed2b9f671c20a377dca2ad7863fed106e9d40e36fd1ffc42de166f625ec146.jpg)  

# Note  

For energy minimization, if you want the potential energy associated with the pitorsion terms forces to be included in the total potential energy of the system (the quantity being minimized), you MUST not disable the fix_modify energy option for this fix.  

# 2.10.5 Restrictions  

To function as expected this fix command must be issued before a read_data command but after a read_restart command.  

This fix can only be used if LAMMPS was built with the AMOEBA package. See the Build package page for more info.  

# 2.10.6 Related commands  

fix_modify, read_data  

# 2.10.7 Default  

none  

# 2.11 fix append/atoms command  

# 2.11.1 Syntax  

fix ID group-ID append/atoms face ... keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• append/atoms $=$ style name of this fix command   
• face $=z h i$   
• zero or more keyword/value pairs may be appended   
• keyword $=$ basis or size or freq or temp or random or units basis values $=\mathrm{M}$ itype $\mathrm{M}=$ which basis atom itype $=$ atom type (1-N) to assign to this basis atom size $\mathrm{args=Lz}$ $\mathrm{Lz}=\mathrm{z}$ size of lattice region appended in a single event(distance units) freq args = freq freq = the number of timesteps between append events temp args $-$ target damp seed extent target $=$ target temperature for the region between zhi-extent and zhi (temperature units) damp $-$ damping parameter (time units)   
seed = random number seed for langevin kicks extent = extent of thermostatted region (distance units)   
random args = xmax ymax zmax seed   
xmax, ymax, zmax $-$ maximum displacement in particular direction (distance units) seed = random number seed for random displacement   
units value = lattice or box lattice = the wall position is defined in lattice units box $=$ the wall position is defined in simulation box units  

# 2.11.2 Examples  

<html><body><table><tr><td>fix 1 all append/ 1/atoms zhi size 5.0 freq 295 units lattice</td></tr><tr><td>fix 4 all a /atoms zhi size 15.0 freq 5 units box</td></tr><tr><td>append</td></tr><tr><td>fix A all append/ /atoms zhi size 1.0 freq 1000 units lattice</td></tr></table></body></html>  

# 2.11.3 Description  

This fix creates atoms on a lattice, appended on the zhi edge of the system box. This can be useful when a shock or wave is propagating from zlo. This allows the system to grow with time to accommodate an expanding wave. A simulation box must already exist, which is typically created via the create_box command. Before using this command, a lattice must also be defined using the lattice command.  

This fix will automatically freeze atoms on the zhi edge of the system, so that overlaps are avoided when new atoms are appended.  

The basis keyword specifies an atom type that will be assigned to specific basis atoms as they are created. See the lattice command for specifics on how basis atoms are defined for the unit cell of the lattice. By default, all created atoms are assigned type $=1$ unless this keyword specifies differently.  

The size keyword defines the size in z of the chunk of material to be added.  

The random keyword will give the atoms random displacements around their lattice points to simulate some initial temperature.  

The temp keyword will cause a region to be thermostatted with a Langevin thermostat on the zhi boundary. The size of the region is measured from zhi and is set with the extent argument.  

The units keyword determines the meaning of the distance units used to define a wall position, but only when a numeric constant is used. A box value selects standard distance units as defined by the units command (e.g., $\textrm{\AA}$ for units $=$ real or metal. A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacings.  

# 2.11.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.11.5 Restrictions  

This fix style is part of the SHOCK package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The boundary on which atoms are added with append/atoms must be shrink/minimum. The opposite boundary may be any boundary type other than periodic.  

# 2.11. fix append/atoms command  

# 2.11.6 Related commands  

fix wall/piston command  

# 2.11.7 Default  

The keyword defaults are size $=0.0$ , freq $=0$ , units $=$ lattice. All added atoms are of type 1 unless the basis keyword is used.  

# 2.12 fix atc command  

# 2.12.1 Syntax  

fix <fixID> <group> atc <type> <parameter_file> • fixID $=$ name of fix • group $=$ name of group fix is to be applied • type $=$ thermal or two_temperature or hardy or field  

thermal $=$ thermal coupling with fields: temperature   
two_temperature $=$ electron-phonon coupling with field: temperature and electron_temperature   
hardy $=$ on-the-fly post-processing using kernel localization functions   
field $=$ on-the-fly post-processing using mesh-based localization functions  

• parameter_file $=$ name of the file with material parameters. Note: Neither hardy nor field requires a parameter file  

# 2.12.2 Examples  

fix AtC internal atc thermal Ar_thermal.dat   
fix AtC internal atc two_temperature Ar_ttm.mat   
fix AtC internal atc hardy   
fix AtC internal atc field  

# 2.12.3 Description  

This fix is the beginning to creating a coupled FE/MD simulation and/or an on-the-fly estimation of continuum fields. The coupled versions of this fix do Verlet integration and the post-processing does not. After instantiating this fix, several other fix_modify commands will be needed to set up the problem (i.e., define the finite element mesh and prescribe initial and boundary conditions).  

![](images/f4f21a74d05e34041070a57be5d4ed4b118b1c6a273325cf64d524405fe2c93d.jpg)  

The following coupling example is typical, but non-exhaustive:  

# ... commands to create and initialize the MD system # initial fix to designate coupling type and group to apply it to # tag group physics material_file fix AtC internal atc thermal Ar_thermal.mat  

$\#$ create a uniform $12\mathrm{~x~}2\mathrm{~x~}2$ mesh that covers region contain the group   
# nx ny nz region periodicity   
fix_modify AtC mesh create 12 2 2 mdRegion f p p  

# specify the control method for the type of coupling # physics control_type fix_modify AtC thermal control flux  

# specify the initial values for the empirical field "temperature" # field node_group value fix_modify AtC initial temperature all 30  

# create an output stream for nodal fields # filename output_frequency fix_modify AtC output atc_fe_output 100  

run 1000  

likewise for this post-processing example:  

# ... commands to create and initialize the MD system   
# initial fix to designate post-processing and the group to apply it to   
# no material file is allowed nor required   
fix AtC internal atc hardy   
# for hardy fix, specific kernel function (function type and range) to # be used as a localization function   
fix AtC kernel quartic_sphere 10.0 (continues on next page)  

(continued from previous page)  

# create a uniform $1\mathrm{~x~}1\mathrm{~x~}1$ mesh that covers region contain the group # with periodicity this effectively creates a system average fix_modify AtC mesh create $^\textrm{\scriptsize111}$ box p p p  

# change from default lagrangian map to eulerian # refreshed every 100 steps fix_modify AtC atom_element_map eulerian 100 # start with no field defined # add mass density, potential energy density, stress and temperature fix_modify AtC fields add density energy stress temperature  

# create an output stream for nodal fields # filename output_frequency fix_modify AtC output nvtFE 100 text  

run 1000  

the mesh’s linear interpolation functions can be used as the localization function by using the field option:  

fix AtC internal atc field fix_modify AtC mesh create 1 1 1 box p p p  

Note coupling and post-processing can be combined in the same simulations using separate fixes.  

# 2.12.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is not supported by this fix, but this fix does add the kinetic energy imparted to atoms by the momentum coupling mode of the AtC package to the global potential energy of the system as part of thermodynamic output.  

Additional fix_modify options relevant to this fix are listed below.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the energy discussed in the previous paragraph. The scalar value is “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.12.5 Restrictions  

Thermal and two_temperature (coupling) types use a Verlet time-integration algorithm. The hardy type does not contain its own time-integrator and must be used with a separate fix that does contain one (e.g., nve, nvt). In addition, currently:  

• the coupling is restricted to thermal physics • the FE computations are done in serial on each processor.  

# 2.12.6 Related commands  

After specifying this fix in your input script, several fix_modify AtC commands are used to setup the problem (e.g., define the finite element mesh and prescribe initial and boundary conditions). Each of these options has its own doc page.  

fix_modify commands for setup:  

• fix_modify AtC mesh create   
• fix_modify AtC mesh quadrature   
• fix_modify AtC mesh read   
• fix_modify AtC mesh write   
• fix_modify AtC mesh create_nodeset   
• fix_modify AtC mesh add_to_nodeset   
• fix_modify AtC mesh create_faceset box   
• fix_modify AtC mesh create_faceset plane   
• fix_modify AtC mesh create_elementset   
• fix_modify AtC mesh delete_elements   
• fix_modify AtC mesh nodeset_to_elementset   
• fix_modify AtC boundary type   
• fix_modify AtC internal_quadrature   
• fix_modify AtC time_integration   
• fix_modify AtC extrinsic electron_integration   
• fix_modify AtC internal_element_set   
• fix_modify AtC decomposition  

# fix_modify commands for boundary and initial conditions:  

• fix_modify AtC initial • fix_modify AtC fix • fix_modify AtC unfix • fix_modify AtC fix_flux • fix_modify AtC unfix_flux • fix_modify AtC source • fix_modify AtC remove_source  

# fix_modify commands for control and filtering:  

• fix_modify AtC control thermal • fix_modify AtC control momentum • fix_modify AtC control localized_lambda • fix_modify AtC control lumped_lambda_solve • fix_modify AtC control mask_direction • fix_modify AtC filter  

# 2.12. fix atc command  

• fix_modify AtC filter scale • fix_modify AtC filter type • fix_modify AtC equilibrium_start • fix_modify AtC extrinsic exchange • fix_modify AtC poisson_solver  

# fix_modify commands for output:  

• fix_modify AtC output • fix_modify AtC output nodeset • fix_modify AtC output volume_integral • fix_modify AtC output boundary_integral • fix_modify AtC output contour_integral • fix_modify AtC mesh output • fix_modify AtC write_restart • fix_modify AtC read_restart  

# fix_modify commands for post-processing:  

• fix_modify AtC kernel   
• fix_modify AtC fields   
• fix_modify AtC gradients   
• fix_modify AtC rates   
• fix_modify AtC computes   
• fix_modify AtC on_the_fly   
• fix_modify AtC pair/bond_interactions   
• fix_modify AtC sample_frequency   
• fix_modify AtC set  

# miscellaneous fix_modify commands:  

• fix_modify AtC atom_element_map   
• fix_modify AtC atom_weight   
• fix_modify AtC write_atom_weights   
• fix_modify AtC kernel_bandwidth   
• fix_modify AtC reset_time   
• fix_modify AtC reset_atomic_reference_positions   
• fix_modify AtC fe_md_boundary   
• fix_modify AtC boundary_faceset   
• fix_modify AtC consistent_fe_initialization   
• fix_modify AtC mass_matrix   
• fix_modify AtC material  

• fix_modify AtC atomic_charge • fix_modify AtC source_integration • fix_modify AtC temperature_definition • fix_modify AtC track_displacement • fix_modify AtC boundary_dynamics • fix_modify AtC add_species • fix_modify AtC add_molecule • fix_modify AtC remove_species • fix_modify AtC remove_molecule  

Note: a set of example input files with the attendant material files are included in the examples/PACKAGES/atc folders.  

# 2.12.7 Default  

None  

For detailed exposition of the theory and algorithms please see:  

(Wagner) Wagner, GJ; Jones, RE; Templeton, JA; Parks, MA, “An atomistic-to-continuum coupling method for heat transfer in solids.” Special Issue of Computer Methods and Applied Mechanics (2008) 197:3351.  

(Zimmerman2004) Zimmerman, JA; Webb, EB; Hoyt, JJ;. Jones, RE; Klein, PA; Bammann, DJ, “Calculation of stress in atomistic simulation.” Special Issue of Modelling and Simulation in Materials Science and Engineering (2004), 12:S319.  

(Zimmerman2010) Zimmerman, JA; Jones, RE; Templeton, JA, “A material frame approach for evaluating continuum variables in atomistic simulations.” Journal of Computational Physics (2010), 229:2364.  

(Templeton2010) Templeton, JA; Jones, RE; Wagner, GJ, “Application of a field-based method to spatially varying thermal transport problems in molecular dynamics.” Modelling and Simulation in Materials Science and Engineering (2010), 18:085007.  

(Jones) Jones, RE; Templeton, JA; Wagner, GJ; Olmsted, D; Modine, JA, “Electron transport enhanced molecular dynamics for metals and semi-metals.” International Journal for Numerical Methods in Engineering (2010), 83:940.  

(Templeton2011) Templeton, JA; Jones, RE; Lee, JW; Zimmerman, JA; Wong, BM, “A long-range electric field solver for molecular dynamics based on atomistic-to-continuum modeling.” Journal of Chemical Theory and Computation (2011), 7:1736.  

(Mandadapu) Mandadapu, KK; Templeton, JA; Lee, JW, “Polarization as a field variable from molecular dynamics simulations.” Journal of Chemical Physics (2013), 139:054115.  

Please refer to the standard finite element (FE) texts (e.g., T.J.R. Hughes, The Finite Element Method, Dover 2003) for the basics of FE simulations.  

# 2.13 fix atom/swap command  

# 2.13.1 Syntax  

fix ID group-ID atom/swap N X seed T keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command  

# 2.13. fix atom/swap command  

• atom/swap $=$ style name of this fix command   
• $\Nu=$ invoke this fix every N steps   
• ${\mathrm{X=}}$ number of swaps to attempt every N steps   
• seed $=$ random # seed (positive integer)   
• $\mathrm{T}=$ scaling temperature of the MC swaps (temperature units)   
• one or more keyword/value pairs may be appended to args   
• keyword $=$ types or mu or $k e$ or semi-grand or region types value $\mathrm{~s~}=\mathrm{two}$ or more atom types (1-Ntypes or type label) mu values $=$ chemical potential of swap types (energy units) ke value $=\mathrm{no}$ or yes no $=\mathrm{no}$ conservation of kinetic energy after atom swaps yes $=$ kinetic energy is conserved after atom swaps semi-grand value = no or yes no $=$ particle type counts and fractions conserved yes $=$ semi-grand canonical ensemble, particle fractions not conserved region value $=$ region-ID region-ID = ID of region to use as an exchange/move volume  

# 2.13.2 Examples  

fix 2 all atom/swap 1 1 29494 300.0 ke no types 1 2   
fix myFix all atom/swap 100 1 12345 298.0 region my_swap_region types 5 6   
fix SGMC all atom/swap 1 100 345 1.0 semi-grand yes types 1 2 3 mu 0.0 4.3 -5.0  

# 2.13.3 Description  

This fix performs Monte Carlo swaps of atoms of one given atom type with atoms of the other given atom types. The specified scaling temperature $T$ is used in the Metropolis criterion dictating swap probabilities.  

Perform $X$ swaps of atoms of one type with atoms of another type according to a Monte Carlo probability. Swap candidates must be in the fix group, must be in the region (if specified), and must be of one of the listed types. Swaps are attempted between candidates that are chosen randomly with equal probability among the candidate atoms. Swaps are not attempted between atoms of the same type since nothing would happen.  

All atoms in the simulation domain can be moved using regular time integration displacements (e.g., via $f(x n\nu t)$ , resulting in a hybrid $\mathbf{MC}{+}\mathbf{MD}$ simulation. A smaller-than-usual timestep size may be needed when running such a hybrid simulation, especially if the swapped atoms are not well equilibrated.  

The types keyword is required. At least two atom types must be specified. If not using semi-grand, exactly two atom types are required.  

The ke keyword can be set to no to turn off kinetic energy conservation for swaps. The default is yes, which means that swapped atoms have their velocities scaled by the ratio of the masses of the swapped atom types. This ensures that the kinetic energy of each atom is the same after the swap as it was before the swap, even though the atom masses have changed.  

The semi-grand keyword can be set to yes to switch to the semi-grand canonical ensemble as discussed in (Sadigh). This means that the total number of each particle type does not need to be conserved. The default is no, which means that the only kind of swap allowed exchanges an atom of one type with an atom of a different given type. In other words, the relative mole fractions of the swapped atoms remains constant. Whereas in the semi-grand canonical ensemble, the composition of the system can change. Note that when using semi-grand, atoms in the fix group whose type is not listed in the types keyword are ineligible for attempted conversion. An attempt is made to switch the selected atom (if eligible) to one of the other listed types with equal probability. Acceptance of each attempt depends upon the Metropolis criterion.  

The mu keyword allows users to specify chemical potentials. This is required and allowed only when using semi-grand. All chemical potentials are absolute, so there is one for each swap type listed following the types keyword. In semigrand canonical ensemble simulations the chemical composition of the system is controlled by the difference in these values. So shifting all values by a constant amount will have no effect on the simulation.  

This command may optionally use the region keyword to define swap volume. The specified region must have been previously defined with a region command. It must be defined with side $=i n$ . Swap attempts occur only between atoms that are both within the specified region. Swaps are not otherwise attempted.  

You should ensure you do not swap atoms belonging to a molecule, or LAMMPS will eventually generate an error when it tries to find those atoms. LAMMPS will warn you if any of the atoms eligible for swapping have a non-zero molecule ID, but does not check for this at the time of swapping.  

If not using semi-grand this fix checks to ensure all atoms of the given types have the same atomic charge. LAMMPS does not enforce this in general, but it is needed for this fix to simplify the swapping procedure. Successful swaps will swap the atom type and charge of the swapped atoms. Conversely, when using semi-grand, it is assumed that all the atom types involved in switches have the same charge. Otherwise, charge would not be conserved. As a consequence, no checks on atomic charges are performed, and successful switches update the atom type but not the atom charge. While it is possible to use semi-grand with groups of atoms that have different charges, these charges will not be changed when the atom types change.  

Since this fix computes total potential energies before and after proposed swaps, even complicated potential energy calculations are acceptable, including the following:  

• long-range electrostatics $k$ -space)   
• many body pair styles   
• hybrid pair styles (with restrictions)   
• EAM pair styles   
• triclinic systems  

Some fixes have an associated potential energy. Examples of such fixes include: efield, gravity, addforce, langevin, restrain, temp/berendsen, temp/rescale, and wall fixes. For that energy to be included in the total potential energy of the system (the quantity used when performing GCMC moves), you must enable the fix_modify energy option for that fix. The doc pages for individual $f\boldsymbol{a}\boldsymbol{x}$ commands specify if this should be done.  

# 2.13.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the fix to binary restart files. This includes information about the random number generator seed, the next timestep for MC exchanges, the number of exchange attempts and successes, etc. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

![](images/c2dd578bef32cc2a9e6f613f12dfbb7ad00251d17a6d0afa90c75dd498d4299d.jpg)  

# Note  

For this to work correctly, the timestep must not be changed after reading the restart with reset_timestep. The fix will try to detect it and stop with an error.  

None of the fix_modify options are relevant to this fix.  

This fix computes a global vector of length 2, which can be accessed by various output commands. The vector values are the following global cumulative quantities:  

1. swap attempts  

2. swap accepts  

The vector values calculated by this fix are “intensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.13.5 Restrictions  

This fix is part of the MC package. It is only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

When this fix is used with a hybrid pair style system, only swaps between atom types of the same sub-style (or combination of sub-styles) are permitted.  

This fix cannot be used with systems that do not have per-type masses (e.g. atom style sphere) since the implemented algorithm pre-computes velocity rescaling factors from per-type masses and ignores any per-atom masses, if present. In case both, per-type and per-atom masses are present, a warning is printed.  

# 2.13.6 Related commands  

fix nvt, neighbor, fix deposit, fix evaporate, delete_atoms, fix gcmc, fix mol/swap, fix sgcmc  

# 2.13.7 Default  

The option defaults are $k e=$ yes, semi-grand $=$ no, $m u=0.0$ for all atom types.  

(Sadigh) B Sadigh, P Erhart, A Stukowski, A Caro, E Martinez, and L Zepeda-Ruiz, Phys. Rev. B, 85, 184203 (2012).  

# 2.14 fix ave/atom command  

# 2.14.1 Syntax  

fix ID group-ID ave/atom Nevery Nrepeat Nfreq value1 value2 ...  

• ID, group-ID are documented in fix command • ave/atom $=$ style name of this fix command • Nevery $=$ use input values every this many timesteps • Nrepeat $=\#$ of times to use input values for calculating averages • Nfreq $=$ calculate averages every this many timesteps • one or more input values can be listed • value $=x$ , y, z, vx, vy, vz, fx, fy, fz, c_ID, c_ID[i], f_ID, f_ID[i], v_na  

x,y,z,vx,vy,vz,fx,fy,fz $=$ atom attribute (position, velocity, force component)   
$\mathrm{c}\_\mathrm{ID}=\mathrm{per}-$ atom vector calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ column of per-atom array calculated by a compute with ID, I can include wildcard␣   
$\hookrightarrow$ (see below)   
$\mathrm{f}\_\mathrm{ID}=\mathrm{per}$ -atom vector calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ column of per-atom array calculated by a fix with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)   
v_name = per-atom vector calculated by an atom-style variable with name  

# 2.14.2 Examples  

<html><body><table><tr><td></td></tr><tr><td>fix 1 all ave/atom 1 100 100 vx vy vz</td></tr><tr><td>fix 1 all ave/ /atom 10 20 1000 c_my_s stress[1]</td></tr><tr><td>fix 1 all 1 ave/atom 10 20 1000 c_my_stress[*]</td></tr></table></body></html>  

# 2.14.3 Description  

Use one or more per-atom vectors as inputs every few timesteps, and average them atom by atom over longer timescales. The resulting per-atom averages can be used by other output commands such as the fix ave/chunk or dump custom commands.  

The group specified with the command means only atoms within the group have their averages computed. Results are set to 0.0 for atoms not in the group.  

Each input value can be an atom attribute (position, velocity, force component) or can be the result of a compute or $f\boldsymbol{{x}}$ or the evaluation of an atom-style variable. In the latter cases, the compute, fix, or variable must produce a per-atom vector, not a global quantity or local quantity. If you wish to time-average global quantities from a compute, fix, or variable, then see the fix ave/time command.  

Each per-atom value of each input vector is averaged independently.  

Computes that produce per-atom vectors or arrays are those which have the word atom in their style name. See the doc pages for individual fixes to determine which ones produce per-atom vectors or arrays. Variables of style atom are the only ones that can be used with this fix since they produce per-atom vectors.  

Note that for values from a compute or fix, the bracketed index I can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\rightarrow}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the size of the vector (for mode $=$ scalar) or the number of columns in the array (for mode $=$ vector), then an asterisk with no numeric values means all indices from 1 to $N$ . A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from m to $N$ (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual columns of the array had been listed one by one. For example, these two fix ave/atom commands are equivalent, since the compute stress/atom command creates a per-atom array with six columns:  

compute my_stress all stress/atom NULL   
fix 1 all ave/atom 10 20 1000 c_my_stress[\*]   
fix 1 all ave/atom 10 20 1000 c_my_stress[1] c_my_stress[2] & c_my_stress[3] c_my_stress[4] & c_my_stress[5] c_my_stress[6]  

The $N_{\mathrm{every}}$ , $N_{\mathrm{repeat}}$ , and $N_{\mathrm{freq}}$ arguments specify on what timesteps the input values will be used in order to contribute to the average. The final averaged quantities are generated on timesteps that are a multiple of $N_{\mathrm{freq}}$ . The average is over $N_{\mathrm{repeat}}$ quantities, computed in the preceding portion of the simulation every $N_{\mathrm{every}}$ timesteps. $N_{\mathrm{freq}}$ must be a multiple of $N_{\mathrm{every}}$ and $N_{\mathrm{every}}$ must be non-zero even if $N_{\mathrm{repeat}}$ is 1. Also, the timesteps contributing to the average value cannot overlap; that is, $N_{\mathrm{repeat}}\times N_{\mathrm{every}}$ cannot exceed $N_{\mathrm{freq}}$ .  

For example, if $N_{\mathrm{every}}=2$ , $N_{\mathrm{repeat}}=6$ , and $N_{\mathrm{freq}}=100$ , then values on timesteps 90, 92, 94, 96, 98, and 100 will be used to compute the final average on time step 100. Similarly for timesteps 190, 192, 194, 196, 198, and 200 on time step 200, etc.  

The atom attribute values (x, y, z, vx, vy, vz, fx, fy, and $f_{\zeta})$ are self-explanatory. Note that other atom attributes can be used as inputs to this fix by using the compute property/atom command and then specifying an input value from that compute.  

# 2.14. fix ave/atom command  

![](images/bc706b89eefb3811bc6c7038cae16e451afd4e13dca9fc7c5d0708d45bc9881d.jpg)  

# Note  

The $x,y$ , and $z$ attributes are values that are re-wrapped inside the periodic box whenever an atom crosses a periodic boundary. Thus, if you time-average an atom that spends half of its time on either side of the periodic box, you will get a value in the middle of the box. If this is not what you want, consider averaging unwrapped coordinates, which can be provided by the compute property/atom command via its xu, yu, and zu attributes.  

If a value begins with $\mathrm{~\"~c~}_{-}\mathrm{~,~}$ , a compute ID must follow which has been previously defined in the input script. If no bracketed term is appended, the per-atom vector calculated by the compute is used. If a bracketed term containing an index $I$ is appended, the $I^{\mathrm{th}}$ column of the per-atom array calculated by the compute is used. Users can also write code for their own compute styles and add them to LAMMPS. See the discussion above for how $I$ can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script. If no bracketed term is appended, the per-atom vector calculated by the fix is used. If a bracketed term containing an index $I$ is appended, the $I^{\mathrm{th}}$ column of the per-atom array calculated by the fix is used. Note that some fixes only produce their values on certain timesteps, which must be compatible with $N_{\mathrm{every}}$ , else an error will result. Users can also write code for their own fix styles and add them to LAMMPS. See the discussion above for how $I$ can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “v_”, a variable name must follow which has been previously defined in the input script as an atom-style variable. Variables of style atom can reference thermodynamic keywords or invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of generating per-atom quantities to time average.  

# 2.14.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.   
No global scalar or vector quantities are stored by this fix for access by various output commands.  

This fix produces a per-atom vector or array which can be accessed by various output commands. A vector is produced if only a single quantity is averaged by this fix. If two or more quantities are averaged, then an array of values is produced. The per-atom values can only be accessed on timesteps that are multiples of $N_{\mathrm{freq}}$ since that is when averaging is performed.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.14.5 Restrictions  

none  

# 2.14.6 Related commands  

compute, fix ave/histo, fix ave/chunk, fix ave/time, variable,  

# 2.14.7 Default  

none  

# 2.15 fix ave/chunk command  

# 2.15.1 Syntax  

fix ID group-ID ave/chunk Nevery Nrepeat Nfreq chunkID value1 value2 ... keyword args ...  

• ID, group-ID are documented in fix command   
• ave/chunk $=$ style name of this fix command   
• Nevery $=$ use input values every this many timesteps   
• Nrepeat $=$ # of times to use input values for calculating averages   
• Nfreq $=$ calculate averages every this many timesteps   
• chunkID $=\mathrm{ID}$ of compute chunk/atom command   
• one or more input values can be listed   
• value $=\nu x$ , vy, $\nu z$ , fx, fy, fz, density/mass, density/number, mass, temp, c_ID, c_ID[I], f_ID, f_ID[I], v_name   
vx,vy,vz,fx,fy,fz,mass $=$ atom attribute (velocity, force component, mass)   
density/number, density/mass $=$ number or mass density (per volume)   
temp $=$ temperature   
$\mathrm{{c}\_I D=}$ per-atom vector calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ column of per-atom array calculated by a compute with ID, I can include wildcard␣   
$\hookrightarrow$ (see below)   
f_ID = per-atom vector calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ column of per-atom array calculated by a fix with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)   
v_name $=$ per-atom vector calculated by an atom-style variable with name  

• zero or more keyword/arg pairs may be appended  

• keyword $=$ norm or ave or bias or adof or cdof or file or append or overwrite or format or title1 or title2 or title3  

norm arg $=$ all or sample or none $=$ how output on Nfreq steps is normalized all $=$ output is sum of atoms across all Nrepeat samples, divided by atom count   
sample $=$ output is sum of Nrepeat sample averages, divided by Nrepeat   
none $=$ output is sum of Nrepeat sample sums, divided by Nrepeat   
ave args $=$ one or running or window M   
one = output new average value every Nfreq steps   
running = output cumulative average of all previous Nfreq steps   
window M = output average of M most recent Nfreq steps   
bias arg = bias-ID   
bias-ID = ID of a temperature compute that removes a velocity bias for temperature calculation   
adof value = dof_per_atom dof_per_atom $-$ define this many degrees-of-freedom per atom for temperature calculation   
cdof value = dof_per_chunk   
dof_per_chunk = define this many degrees-of-freedom per chunk for temperature calculation   
file arg = filename filename = file to write results to   
append arg = filename   
filename = file to append results to   
overwrite arg = none $=$ overwrite output file with only latest output   
format arg $=$ string   
string = C-style format string title1 $\mathrm{arg}=\mathrm{string}$   
string $=$ text to print as 1st line of output file title2 arg $=$ string   
string $=$ text to print as 2nd line of output file title3 arg $=$ string   
string $=$ text to print as 3rd line of output file  

# 2.15.2 Examples  

fix 1 all ave/chunk 10000 1 10000 binchunk c_myCentro title1 "My output values" fix 1 flow ave/chunk 100 10 1000 molchunk vx vz norm sample file vel.profile fix 1 flow ave/chunk 100 5 1000 binchunk density/mass ave running fix 1 flow ave/chunk 100 5 1000 binchunk density/mass ave running  

# Note  

Changed in version 31May2016.  

If you are trying to replace a deprecated fix ave/spatial command with the newer, more flexible fix ave/chunk and compute chunk/atom commands, you simply need to split the fix ave/spatial arguments across the two new commands. For example, this command:  

fix 1 flow ave/spatial 100 10 1000 y 0.0 1.0 vx vz norm sample file vel.profile  

could be replaced by:  

compute cc1 flow chunk/atom bin/1d y 0.0 1.0 fix 1 flow ave/chunk 100 10 1000 cc1 vx vz norm sample file vel.profile  

# 2.15.3 Description  

Use one or more per-atom vectors as inputs every few timesteps, sum the values over the atoms in each chunk at each timestep, then average the per-chunk values over longer timescales. The resulting chunk averages can be used by other output commands such as thermo_style custom, and can also be written to a file.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom page and the Howto chunk page for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

Note that if the compute chunk/atom command defines spatial bins, the fix ave/chunk command performs a similar computation as the fix ave/grid command. However, the per-bin outputs from the fix ave/chunk command are global; each processor stores a copy of the entire set of bin data. By contrast, the fix ave/grid command uses a distributed grid where each processor owns a subset of the bins. Thus it is more efficient to use the fix ave/grid command when the grid is large and a simulation is run on many processors.  

Note that only atoms in the specified group contribute to the summing and averaging calculations. The compute chunk/atom command defines its own group as well as an optional region. Atoms will have a chunk $\mathrm{ID}=0$ , meaning they belong to no chunk, if they are not in that group or region. Thus you can specify the “all” group for this command if you simply want to use the chunk definitions provided by chunkID.  

Each specified per-atom value can be an atom attribute (position, velocity, force component), a number or mass density, a mass or temperature, or the result of a compute or $f\boldsymbol{a}\boldsymbol{x}$ or the evaluation of an atom-style variable. In the latter cases, the compute, fix, or variable must produce a per-atom quantity, not a global quantity. Note that the compute property/atom command provides access to any attribute defined and stored by atoms. If you wish to time-average global quantities from a compute, fix, or variable, then see the fix ave/time command.  

The per-atom values of each input vector are summed and averaged independently of the per-atom values in other input vectors.  

Computes that produce per-atom quantities are those which have the word atom in their style name. See the doc pages for individual fixes to determine which ones produce per-atom quantities. Variables of style atom are the only ones that can be used with this fix since all other styles of variable produce global quantities.  

Note that for values from a compute or fix that produces a per-atom array (multiple values per atom), the bracketed index I can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $\mathbf{\overline{{\rho}}}^{\mathbf{6}\mathbf{*}}\mathbf{\overline{{n}}}^{\mathbf{,}\mathbf{,}}$ or $\mathbf{\tilde{\Omega}}^{6}\mathbf{\tilde{n}}^{*}{\mathbf{\tilde{\Omega}}}^{,}$ or $\mathbf{\tilde{\rho}}_{\mathrm{m}}^{*}\mathbf{\tilde{n}}^{,}$ . If $N=$ the size of the vector (for mode $=$ scalar) or the number of columns in the array (for mode $=$ vector), then an asterisk with no numeric values means all indices from 1 to $N$ . A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from m to $N$ (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual columns of the array had been listed one by one. For example, these two fix ave/chunk commands are equivalent, since the compute property/atom command creates, in this case, a per-atom array with three columns:  

compute myAng all property/atom angmomx angmomy angmomz   
fix 1 all ave/chunk 100 1 100 cc1 c_myAng[\*] file tmp.angmom   
fix 2 all ave/chunk 100 1 100 cc1 c_myAng[1] c_myAng[2] c_myAng[3] file tmp.angmom  

![](images/d3b6a022905c1c5a50b4e84406fc86b8ad80328513d2b872e649420726d7677c.jpg)  

# Note  

This fix works by creating an array of size $N_{\mathrm{chunk}}\times N_{\mathrm{values}}$ on each processor. $N_{\mathrm{chunk}}$ is the number of chunks, which is defined by the compute chunk/atom command. $N_{\mathrm{values}}$ is the number of input values specified. Each processor loops over its atoms, tallying its values to the appropriate chunk. Then the entire array is summed across all processors. This means that using a large number of chunks will incur an overhead in memory and computational cost (summing across processors), so be careful to define a reasonable number of chunks.  

The $N_{\mathrm{every}}$ , $N_{\mathrm{repeat}}$ , and $N_{\mathrm{freq}}$ arguments specify on what time steps the input values will be accessed and contribute to the average. The final averaged quantities are generated on time steps that are a multiples of $N_{\mathrm{freq}}$ . The average is over $N_{\mathrm{repeat}}$ quantities, computed in the preceding portion of the simulation every $N_{\mathrm{every}}$ time steps. $N_{\mathrm{freq}}$ must be a multiple of $N_{\mathrm{every}}$ and $N_{\mathrm{every}}$ must be non-zero even if $N_{\mathrm{repeat}}=1$ . Also, the time steps contributing to the average value cannot overlap (i.e., $N_{\mathrm{repeat}}\times N_{\mathrm{every}}$ cannot exceed $N_{\mathrm{freq},}$ ).  

For example, if $N_{\mathrm{every}}=2,N_{\mathrm{repeat}}=6$ , and $N_{\mathrm{freq}}=100$ , then values on time steps 90, 92, 94, 96, 98, 100 will be used to compute the final average on time step 100. Similarly for time steps 190, 192, 194, 196, 198, 200 on time step 200, etc. If $N_{\mathrm{repeat}}=1$ and $N_{\mathrm{freq}}=100$ , then no time averaging is done; values are simply generated on time steps 100, 200, etc.  

Each input value can also be averaged over the atoms in each chunk. The way the averaging is done across the $N_{\mathrm{repeat}}$ time steps to produce output on the $N_{\mathrm{freq}}$ time steps, and across multiple $N_{\mathrm{freq}}$ outputs, is determined by the norm and ave keyword settings, as discussed below.  

![](images/b11125a6a90a4aa5ff7efbc4f587e0360c9514c35a112d6b955020d49c6cd52a.jpg)  

# Note  

To perform per-chunk averaging within a $N_{\mathrm{freq}}$ time window, the number of chunks $N_{\mathrm{chunk}}$ defined by the compute chunk/atom command must remain constant. If the ave keyword is set to running or window then $N_{\mathrm{chunk}}$ must remain constant for the duration of the simulation. This fix forces the chunk/atom compute specified by chunkID to hold $N_{\mathrm{chunk}}$ constant for the appropriate time windows, by not allowing it to re-calculate $N_{\mathrm{chunk}}$ , which can also affect how it assigns chunk IDs to atoms. This is particularly important to understand if the chunks defined by the compute chunk/atom command are spatial bins. If its units keyword is set to box or lattice, then the number of bins $N_{\mathrm{chunk}}$ and size of each bin will be fixed over the $N_{\mathrm{freq}}$ time window, which can affect which atoms are discarded if the simulation box size changes. If its units keyword is set to reduced, then the number of bins $N_{\mathrm{chunk}}$ will still be fixed, but the size of each bin can vary at each time step if the simulation box size changes (e.g., for an NPT simulation).  

The atom attribute values (vx, vy, vz, fx, fy, fz, mass) are self-explanatory. As noted above, any other atom attributes can be used as input values to this fix by using the compute property/atom command and then specifying an input value from that compute.  

The density/number value means the number density is computed for each chunk (i.e., number/volume). The density/mass value means the mass density is computed for each chunk (i.e., total-mass/volume). The output values are in units of 1/volume or mass density (mass/volume). See the units command page for the definition of density for each choice of units (e.g., $\mathrm{g}/\mathrm{cm}^{3}.$ ). If the chunks defined by the compute chunk/atom command are spatial bins, the volume is the bin volume. Otherwise, it is the volume of the entire simulation box.  

The temp value means the temperature is computed for each chunk, by the formula  

$$
\mathrm{KE}=\frac{\mathrm{DOF}}{2}k_{B}T,
$$  

where KE is the total kinetic energy of the chunk of atoms (sum of ${\scriptstyle\frac{1}{2}}m\nu^{2}.$ ), DOF is the the total number of degrees of freedom for all atoms in the chunk, $k_{B}$ is the Boltzmann constant, and $T$ is the absolute temperature.  

The DOF is calculated as N\*adof $^+$ cdof, where $N$ is the number of atoms in the chunk, adof is the number of degrees of freedom per atom, and cdof is the number of degrees of freedom per chunk. By default, adof $=2$ or $3=$ dimensionality of system, as set via the dimension command, and cdof $=0.0$ . This gives the usual formula for temperature.  

Note that currently this temperature only includes translational degrees of freedom for each atom. No rotational degrees of freedom are included for finite-size particles. Also, no degrees of freedom are subtracted for any velocity bias or constraints that are applied, such as compute temp/partial, fix shake, or fix rigid. This is because those degrees of freedom (e.g., a constrained bond) could apply to sets of atoms that are both included and excluded from a specific chunk, and hence the concept is somewhat ill-defined. In some cases, you can use the adof and cdof keywords to adjust the calculated degrees of freedom appropriately, as explained below.  

Also note that a bias can be subtracted from atom velocities before they are used in the above formula for KE, by using the bias keyword. This allows, for example, a thermal temperature to be computed after removal of a flow velocity profile.  

Note that the per-chunk temperature calculated by this fix and the compute temp/chunk command can be different. The compute calculates the temperature for each chunk for a single snapshot. This fix can do that but can also time average those values over many snapshots, or it can compute a temperature as if the atoms in the chunk on different time steps were collected together as one set of atoms to calculate their temperature. The compute allows the center-of-mass velocity of each chunk to be subtracted before calculating the temperature; this fix does not.  

If a value begins with “c_”, a compute ID must follow which has been previously defined in the input script. If no bracketed integer is appended, the per-atom vector calculated by the compute is used. If a bracketed integer is appended, the Ith column of the per-atom array calculated by the compute is used. Users can also write code for their own compute styles and add them to LAMMPS. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script. If no bracketed integer is appended, the per-atom vector calculated by the fix is used. If a bracketed integer is appended, the Ith column of the per-atom array calculated by the fix is used. Note that some fixes only produce their values on certain time steps, which must be compatible with $N_{\mathrm{every}}$ , else an error results. Users can also write code for their own fix styles and add them to LAMMPS. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “v_”, a variable name must follow which has been previously defined in the input script. Variables of style atom can reference thermodynamic keywords and various per-atom attributes, or invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of generating per-atom quantities to average within chunks.  

Additional optional keywords also affect the operation of this fix and its outputs.  

The norm keyword affects how averaging is done for the per-chunk values that are output every $N_{\mathrm{freq}}$ time steps.  

It the norm setting is all, which is the default, a chunk value is summed over all atoms in all $N_{\mathrm{repeat}}$ samples, as is the count of atoms in the chunk. The averaged output value for the chunk on the $N_{\mathrm{freq}}$ time steps is Total-sum / Total-count. In other words it is an average over atoms across the entire $N_{\mathrm{freq}}$ timescale. For the density/number and density/mass values, the volume (bin volume or system volume) used in the final normalization will be the volume at the final $N_{\mathrm{freq}}$ time step. For the temp values, degrees of freedom and kinetic energy are summed separately across the entire $N_{\mathrm{freq}}$ timescale, and the output value is calculated by dividing those two sums.  

If the norm setting is sample, the chunk value is summed over atoms for each sample, as is the count, and an “average sample value” is computed for each sample (i.e., Sample-sum / Sample-count). The output value for the chunk on the $N_{\mathrm{freq}}$ time steps is the average of the $N_{\mathrm{repeat}}$ “average sample values” (i.e., the sum of $N_{\mathrm{repeat}}$ “average sample values” divided by $N_{\mathrm{repeat}})$ . In other words, it is an average of an average. For the density/number and density/mass values, the volume (bin volume or system volume) used in the per-sample normalization will be the current volume at each sampling step.  

If the norm setting is none, a similar computation as for the sample setting is done, except the individual “average sample values” are “summed sample values”. A summed sample value is simply the chunk value summed over atoms in the sample, without dividing by the number of atoms in the sample. The output value for the chunk on the $N_{\mathrm{freq}}$ timesteps is the average of the $N_{\mathrm{repeat}}$ “summed sample values” (i.e., the sum of $N_{\mathrm{repeat}}$ “summed sample values” divided by $N_{\mathrm{repeat}})$ . For the density/number and density/mass values, the volume (bin volume or system volume) used in the per-sample sum normalization will be the current volume at each sampling step.  

The ave keyword determines how the per-chunk values produced every $N_{\mathrm{freq}}$ steps are averaged with values produced on previous steps that were multiples of $N_{\mathrm{freq}}$ , before they are accessed by another output command or written to a file.  

If the ave setting is one, which is the default, then the chunk values produced on timesteps that are multiples of $N_{\mathrm{freq}}$ are independent of each other; they are output as-is without further averaging.  

If the ave setting is running, then the chunk values produced on timesteps that are multiples of $N_{\mathrm{freq}}$ are summed and averaged in a cumulative sense before being output. Each output chunk value is thus the average of the chunk value produced on that timestep with all preceding values for the same chunk. This running average begins when the fix is defined; it can only be restarted by deleting the fix via the unfix command, or re-defining the fix by re-specifying it.  

If the ave setting is window, then the chunk values produced on timesteps that are multiples of $N_{\mathrm{freq}}$ are summed and averaged within a moving “window” of time, so that the last $M$ values for the same chunk are used to produce the output. For example, if $M=3$ and $N_{\mathrm{freq}}=1000$ , then the output on step 10000 will be the average of the individual chunk values on time steps 8000, 9000, and 10000. Outputs on early steps will average over less than $M$ values if they are not available.  

The bias keyword specifies the ID of a temperature compute that removes a “bias” velocity from each atom, specified as bias- $\mathbf{\nabla}\cdot I D$ . It is only used when the temp value is calculated, to compute the thermal temperature of each chunk after the translational kinetic energy components have been altered in a prescribed way (e.g., to remove a flow velocity profile). See the doc pages for individual computes that calculate a temperature to see which ones implement a bias.  

The adof and cdof keywords define the values used in the degree of freedom (DOF) formula described above for temperature calculation for each chunk. They are only used when the temp value is calculated. They can be used to calculate a more appropriate temperature for some kinds of chunks. Here are three examples:  

# 2.15. fix ave/chunk command  

If spatially binned chunks contain some number of water molecules and fix shake is used to make each molecule rigid, then you could calculate a temperature with six degrees of freedom (DOF) (three translational, three rotational) per molecule by setting adof to 2.0.  

If compute temp/partial is used with the bias keyword to only allow the $x$ component of velocity to contribute to the temperature, then adof $=1.0$ would be appropriate.  

If each chunk consists of a large molecule, with some number of its bonds constrained by fix shake or the entire molecule by fix rigid/small, adof $=0.0$ and cdof could be set to the remaining degrees of freedom for the entire molecule (entire chunk in this case), that is, 6 for 3d or 3 for 2d for a rigid molecule.  

Added in version 17Apr2024: new keyword append  

The file or append keywords allow a filename to be specified. If file is used, then the filename is overwritten if it already exists. If append is used, then the filename is appended to if it already exists, or created if it does not exist. Every $N_{\mathrm{freq}}$ timesteps, a section of chunk info will be written to a text file in the following format. A line with the timestep and number of chunks is written. Then one line per chunk is written, containing the chunk ID $(1\mathrm{~-~}N_{\mathrm{chunk}})$ , an optional original ID value, optional coordinate values for chunks that represent spatial bins, the number of atoms in the chunk, and one or more calculated values. More explanation of the optional values is given below. The number of values in each line corresponds to the number of values specified in the fix ave/chunk command. The number of atoms and the value(s) are summed or average quantities, as explained above.  

The overwrite keyword will continuously overwrite the output file with the latest output, so that it only contains one timestep worth of output. This option can only be used with the ave running setting.  

The format keyword sets the numeric format of each value when it is printed to a file via the file keyword. Note that all values are floating point quantities. The default format is $\%{\bf g}$ . You can specify a higher precision if desired (e.g., $\%20.16\mathrm{g})$ .  

The title1 and title2 and title3 keywords allow specification of the strings that will be printed as the first three lines of the output file, assuming the file keyword was used. LAMMPS uses default values for each of these, so they do not need to be specified.  

By default, these header lines are as follows:  

<html><body><table><tr><td>Chunk-averaged data for fix ID and group oname</td></tr><tr><td># Timestep Number-of-chunks</td></tr><tr><td>Chunk (OrigID) (Coord1) (Coord2) (Coord3) Ncount valuel value2</td></tr><tr><td></td></tr></table></body></html>  

In the first line, ID and name are replaced with the fix-ID and group name. The second line describes the two values that are printed at the first of each section of output. In the third line the values are replaced with the appropriate value names (e.g., fx or c_myCompute[2]).  

The words in parenthesis only appear with corresponding columns if the chunk style specified for the compute chunk/atom command supports them. The OrigID column is only used if the compress keyword was set to yes for the compute chunk/atom command. This means that the original chunk IDs (e.g., molecule IDs) will have been compressed to remove chunk IDs with no atoms assigned to them. Thus a compressed chunk ID of 3 may correspond to an original chunk ID or molecule ID of 415. The OrigID column will list 415 for the third chunk.  

The CoordN columns only appear if a binning style was used in the compute chunk/atom command. For bin/1d, bin/2d, and bin/3d styles the column values are the center point of the bin in the corresponding dimension. Just Coord1 is used for bin/1d, Coord2 is added for bin/2d, Coord3 is added for bin/3d. For bin/sphere, just Coord1 is used, and it is the radial coordinate. For bin/cylinder, Coord1 and Coord2 are used. Coord1 is the radial coordinate (away from the cylinder axis), and coord2 is the coordinate along the cylinder axis.  

Note that if the value of the units keyword used in the compute chunk/atom command is box or lattice, the coordinate values will be in distance units. If the value of the units keyword is reduced, the coordinate values will be in unitless reduced units (0–1). This is not true for the Coord1 value of style bin/sphere or bin/cylinder which both represent radial dimensions. Those values are always in distance units.  

# 2.15.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix computes a global array of values which can be accessed by various output commands. The values can only be accessed on timesteps that are multiples of $N_{\mathrm{freq}}$ , since that is when averaging is performed. The global array has # of rows $=$ the number of chunks $N_{\mathrm{chunk}}$ , as calculated by the specified compute chunk/atom command. The # of columns is $M{+}1{+}N_{\mathrm{values}}$ , where $M\in\{1,\ldots,4\}$ , depending on whether the optional columns for OrigID and CoordN are used, as explained above. Following the optional columns, the next column contains the count of atoms in the chunk, and the remaining columns are the Nvalue quantities. When the array is accessed with a row I that exceeds the current number of chunks, than a 0.0 is returned by the fix instead of an error, since the number of chunks can vary as a simulation runs depending on how that value is computed by the compute chunk/atom command.  

The array values calculated by this fix are treated as “intensive”, since they are typically already normalized by the count of atoms in each chunk.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.15.5 Restrictions  

none  

# 2.15.6 Related commands  

compute, fix ave/atom, fix ave/histo, fix ave/time, variable, fix ave/correlate, fix ave/grid  

# 2.15.7 Default  

The option defaults are norm $=$ all, ave $=$ one, bias $=$ none, no file output, and title $^{1,2,3=}$ strings as described above.  

# 2.16 fix ave/correlate command  

# 2.16.1 Syntax  

fix ID group-ID ave/correlate Nevery Nrepeat Nfreq value1 value2 ... keyword args ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • ave/correlate $=$ style name of this fix command • Nevery $=$ use input values every this many timesteps • Nrepeat $=\#$ of correlation time windows to accumulate • Nfreq $=$ calculate time window averages every this many timesteps • one or more input values can be listed • value $=\mathsf{c\_I D}$ , c_ID[N], f_ID, f_ID[N], v_name  

# 2.16. fix ave/correlate command  

c_ID = global scalar calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ component of global vector calculated by a compute with ID, I can include wildcard␣   
$\hookrightarrow$ (see below)   
f_ID = global scalar calculated by a fix with ID   
f_ID[I] = Ith component of global vector calculated by a fix with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)   
v_name = global value calculated by an equal-style variable with name   
v_name[I] = Ith component of a vector-style variable with name, I can include wildcard (see below)  

• zero or more keyword/arg pairs may be appended • keyword $=$ type or ave or start or prefactor or file or overwrite or title1 or title2 or title3  

type arg $=$ auto or upper or lower or auto/upper or auto/lower or full   
auto $=$ correlate each value with itself   
upper $=$ correlate each value with each succeeding value lower $=$ correlate each value with each preceding value auto/uppe $\mathrm{r=auto}+$ upper auto/lower $=$ auto + lower   
full = correlate each value with every other value, including itself = auto $^+$ upper $^+$ lower   
ave args $-$ one or running   
one $-$ zero the correlation accumulation every Nfreq steps   
running = accumulate correlations continuously   
start args = Nstart   
Nstart = start accumulating correlations on this timestep   
prefactor args $=$ value   
value $-$ prefactor to scale all the correlation data by   
file arg = filename   
filename = name of file to output correlation data to   
overwrite arg = none = overwrite output file with only latest output   
title1 arg = string   
string = text to print as 1st line of output file   
title2 arg = string   
string = text to print as 2nd line of output file   
title3 arg $=$ string string $=$ text to print as 3rd line of output file  

# 2.16.2 Examples  

fix 1 all ave/correlate 5 100 1000 c_myTemp file temp.correlate   
fix 1 all ave/correlate 1 50 10000 & c_thermo_press[1] c_thermo_press[2] c_thermo_press[3] & type upper ave running title1 "My correlation data"   
fix 1 all ave/correlate 1 50 10000 c_thermo_press[  

# 2.16.3 Description  

Use one or more global scalar values as inputs every few timesteps, calculate time correlations between them at varying time intervals, and average the correlation data over longer timescales. The resulting correlation values can be time integrated by variables or used by other output commands such as thermo_style custom, and can also be written to a file. See the fix ave/correlate/long command for an alternate method for computing correlation functions efficiently over very long time windows.  

The group specified with this command is ignored. However, note that specified values may represent calculations performed by computes and fixes which store their own “group” definitions.  

Each listed value can be the result of a compute or $f\boldsymbol{{x}}$ or the evaluation of an equal-style or vector-style variable. In each case, the compute, fix, or variable must produce a global quantity, not a per-atom or local quantity. If you wish to spatial- or time-average or histogram per-atom quantities from a compute, fix, or variable, then see the fix ave/chunk, fix ave/atom, or fix ave/histo commands. If you wish to convert a per-atom quantity into a single global value, see the compute reduce command.  

The input values must be all scalars. What kinds of correlations between input values are calculated is determined by the type keyword as discussed below.  

Computes that produce global quantities are those which do not have the word atom in their style name. Only a few fixes produce global quantities. See the doc pages for individual fixes for info on which ones produce such values. Variables of style equal and vector are the only ones that can be used with this fix. Variables of style atom cannot be used, since they produce per-atom values.  

For input values from a compute or fix or variable , the bracketed index I can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $\mathbf{\overline{{\rho}}}^{\mathbf{6}\mathbf{*}}\mathbf{\overline{{n}}}^{\mathbf{,}\mathbf{,}}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\rightarrow}$ or $\mathrm{^{66}m^{*}n^{,}}$ . If $N$ is the size of the vector, then an asterisk with no numeric values means all indices from 1 to $N$ . A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from m to $N$ (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual elements of the vector had been listed one by one. For example, the following two fix ave/correlate commands are equivalent, since the compute pressure command creates a global vector with six values:  

compute myPress all pressure NULL   
fix 1 all ave/correlate 1 50 10000 c_myPress[\*]   
fix 1 all ave/correlate 1 50 10000 & c_myPress[1] c_myPress[2] c_myPress[3] & c_myPress[4] c_myPress[5] c_myPress[6]  

![](images/9ec4f8b04f5526cbfe97dfeddea91b51df000e9c8cf597ba072f53f3fd768f3a.jpg)  

# Note  

For a vector-style variable, only the wildcard forms $\mathbf{\overline{{\Omega}}^{6*}\mathbf{\overline{{\Omega}}\mathbf{n}}^{,,}}$ or $\overline{{\mathbf{\omega}}}_{\mathrm{m}}^{*}\mathfrak{n}^{,}$ are allowed. You must specify the upper bound, because vector-style variable lengths are not determined until the variable is evaluated. If n is specified larger than the vector length turns out to be, zeroes are output for missing vector values.  

The $N_{\mathrm{every}}$ , $N_{\mathrm{repeat}}$ , and $N_{\mathrm{freq}}$ arguments specify on what timesteps the input values will be used to calculate correlation data. The input values are sampled every $N_{\mathrm{every}}$ time steps. The correlation data for the preceding samples is computed on time steps that are a multiple of $N_{\mathrm{freq}}$ . Consider a set of samples from some initial time up to an output timestep. The initial time could be the beginning of the simulation or the last output time; see the ave keyword for options. For the set of samples, the correlation value $C_{i j}$ is calculated as:  

$$
C_{i j}(\Delta t)=\left\langle V_{i}(t)V_{j}(t+\Delta t)\right\rangle,
$$  

which is the correlation value between input values $V_{i}$ and $V_{j}$ , separated by time $\Delta t$ . Note that the second value $V_{j}$ in the pair is always the one sampled at the later time. The average is an average over every pair of samples in the set that are separated by time $\Delta t$ . The maximum $\Delta t$ used is of size $(N_{\mathrm{repeat}}-1)N_{\mathrm{every}}$ . Thus the correlation between a pair of input values yields $N_{\mathrm{repeat}}$ correlation data:  

$$
C_{i j}(0),C_{i j}(N_{\mathrm{every}}),C_{i j}(2N_{\mathrm{every}}),\ldots,C_{i j}\big((N_{\mathrm{repeat}}-1)N_{\mathrm{every}}\big)
$$  

# 2.16. fix ave/correlate command  

For example, if $N_{\mathrm{every}}=5$ , $N_{\mathrm{repeat}}=6$ , and $N_{\mathrm{freq}}=100$ , then values on time steps $0,5,10,15,\ldots,100$ will be used to compute the final averages on time step 100. Six averages will be computed: $C_{i j}(0)$ , $C_{i j}(5)$ , $C_{i j}(10)$ , $C_{i j}(15)$ , $C_{i j}(20)$ , and $C_{i j}(25)$ . $C_{i j}(10)$ on time step 100 will be the average of 19 samples, namely $V_{i}(0)V_{j}(10),V_{i}(5)V_{j}(15),V_{i}(10)V_{j}(20),$ $V_{i}(15)V_{j}(25),\allowbreak\dots,V_{i}(85)V_{j}(95)$ , and $V_{i}(90)V_{j}(100)$ .  

$N_{\mathrm{freq}}$ must be a multiple of $N_{\mathrm{every}}$ ; $N_{\mathrm{every}}$ and $N_{\mathrm{repeat}}$ must be non-zero. Also, if the ave keyword is set to one which is the default, then $N_{\mathrm{freq}}\geq(N_{\mathrm{repeat}}-1)N_{\mathrm{every}}$ is required.  

If a value begins with $\mathrm{~\"~c~}_{-}\mathrm{~,~}$ , a compute ID must follow which has been previously defined in the input script. If no bracketed term is appended, the global scalar calculated by the compute is used. If a bracketed term is appended, the $I^{\mathrm{th}}$ element of the global vector calculated by the compute is used. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

Note that there is a compute reduce command that can sum per-atom quantities into a global scalar or vector which can then be accessed by fix ave/correlate. It can also be a compute defined not in your input script, but by thermodynamic output or other fixes such as fix nvt or fix temp/rescale. See the doc pages for these commands which give the IDs of these computes. Users can also write code for their own compute styles and add them to LAMMPS.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script. If no bracketed term is appended, the global scalar calculated by the fix is used. If a bracketed term is appended, the $I^{\mathrm{th}}$ element of the global vector calculated by the fix is used. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

Note that some fixes only produce their values on certain timesteps, which must be compatible with $N_{\mathrm{every}}$ , else an error will result. Users can also write code for their own fix styles and add them to LAMMPS.  

If a value begins with $\begin{array}{r}{\mathbf{\tilde{\Psi}\Psi}^{\leftarrow}\mathbf{V}_{-}^{\quad,\ddots}}\end{array}$ , a variable name must follow which has been previously defined in the input script. Only equal-style or vector-style variables can be referenced; the latter requires a bracketed term to specify the $I^{\mathrm{th}}$ element of the vector calculated by the variable. See the variable command for details. Note that variables of style equal or vector define a formula which can reference individual atom properties or thermodynamic keywords, or they can invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of specifying quantities to time correlate.  

Additional optional keywords also affect the operation of this fix.  

The type keyword determines which pairs of input values are correlated with each other. For $N$ input values $V_{i}$ , with $i\in\{1,\ldots,N\}$ , let the number of pairs be $N_{\mathrm{pair}}$ . Note that the second value in the pair, $V_{i}(t)V_{j}(t+\Delta t)$ , is always the one sampled at the later time.  

• If type is set to auto then each input value is correlated with itself (i.e., $C_{i i}=V_{i}^{2}$ for $i\in\{1,\ldots,N\}$ , so $N_{\mathrm{pair}}=N,$ .   
• If type is set to upper then each input value is correlated with every succeeding value (i.e., $C_{i j}=V_{i}V_{j}$ for $i<j$ , so $N_{\mathrm{pair}}=N(N-1)/2)$ ).   
• If type is set to lower then each input value is correlated with every preceding value (i.e., $C_{i j}=V_{i}V_{j}$ for $i>j$ , so $N_{\mathrm{pair}}=N(N-1)/2)$ .   
• If type is set to auto/upper then each input value is correlated with itself and every succeeding value (i.e., $C_{i j}=$ $V_{i}V_{j}$ for $i\geq j$ , so $N_{\mathrm{pair}}=N(N+1)/2)$ .   
• If type is set to auto/lower then each input value is correlated with itself and every preceding value (i.e., $C_{i j}=V_{i}V_{j}$ for $i\leq j$ , so $N_{\mathrm{pair}}=N(N+1)/2)$ .   
• If type is set to full then each input value is correlated with itself and every other value (i.e., $C_{i j}=V_{i}V_{j}$ for $\{i,j\}=\{1,N\}$ , so $N_{\mathrm{pair}}=N^{2}$ ).  

The ave keyword determines what happens to the accumulation of correlation samples every $N_{\mathrm{freq}}$ timesteps. If the ave setting is one, then the accumulation is restarted or zeroed every $N_{\mathrm{freq}}$ timesteps. Thus the outputs on successive $N_{\mathrm{freq}}$ timesteps are essentially independent of each other. The exception is that the $C_{i j}(0)=V_{i}(t)V_{j}(t)$ value at a time step $t$ , where $t$ is a multiple of $N_{\mathrm{freq}}$ , contributes to the correlation output both at time $t$ and at time $t+N_{\mathrm{freq}}$ .  

If the ave setting is running, then the accumulation is never zeroed. Thus the output of correlation data at any timestep is the average over samples accumulated every $N_{\mathrm{every}}$ steps since the fix was defined. It can only be restarted by deleting the fix via the unfix command, or by re-defining the fix by re-specifying it.  

The start keyword specifies what time step the accumulation of correlation samples will begin on. The default is step 0. Setting it to a larger value can avoid adding non-equilibrated data to the correlation averages.  

The prefactor keyword specifies a constant which will be used as a multiplier on the correlation data after it is averaged. It is effectively a scale factor on $V_{i}V_{j}$ , which can be used to account for the size of the time window or other unit conversions.  

The file keyword allows a filename to be specified. Every $N_{\mathrm{freq}}$ steps, an array of correlation data is written to the file. The number of rows is $N_{\mathrm{repeat}}$ , as described above. The number of columns is $N_{\mathrm{pair}}+2$ , also as described above. Thus the file ends up to be a series of these array sections.  

The overwrite keyword will continuously overwrite the output file with the latest output, so that it only contains one timestep worth of output. This option can only be used with the ave running setting.  

The title1, title2, and title3 keywords allow specification of the strings that will be printed as the first three lines of the output file, assuming the file keyword was used. LAMMPS uses default values for each of these, so they do not need to be specified.  

By default, these header lines are as follows:  

# Time-correlated data for fix ID # TimeStep Number-of-time-windows # Index TimeDelta Ncount valueI\*valueJ valueI\*valueJ ...  

In the first line, ID is replaced with the fix-ID. The second line describes the two values that are printed at the first of each section of output. In the third line the value pairs are replaced with the appropriate fields from the fix ave/correlate command.  

Let $S_{i j}$ be a set of time correlation data for input values $I$ and $J$ , namely the $N_{\mathrm{repeat}}$ values:  

$$
S_{i j}=C_{i j}(0),C_{i j}(N_{\mathrm{every}}),C_{i j}(2N_{\mathrm{every}}),\ldots,C_{i j I}\left((N_{\mathrm{repeat}}-1)N_{\mathrm{every}}\right)
$$  

As explained below, these data are output as one column of a global array, which is effectively the correlation matrix.  

The trap function defined for equal-style variables can be used to perform a time integration of this vector of data, using a trapezoidal rule. This is useful for calculating various quantities which can be derived from time correlation data. If a normalization factor is needed for the time integration, it can be included in the variable formula or via the prefactor keyword.  

# 2.16.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix computes a global array of values which can be accessed by various output commands. The values can only be accessed on timesteps that are multiples of $N_{\mathrm{freq}}$ since that is when averaging is performed. The global array has # of rows $N_{\mathrm{repeat}}$ and $\#$ of columns $N_{\mathrm{pair}}+2$ . The first column has the time $\Delta t$ (in time steps) between the pairs of input values used to calculate the correlation, as described above. The second column has the number of samples contributing to the correlation average, as described above. The remaining Npair columns are for $I,J$ pairs of the $N$ input values, as determined by the type keyword, as described above.  

# 2.16. fix ave/correlate command  

• For $t y p e=a u t o$ , the $N_{\mathrm{pair}}=N$ columns are ordered: $C_{11},C_{22},\ldots,C_{N N}$ • For $t y p e=u p p e r$ , the $N_{\mathrm{pair}}=N(N-1)/2$ columns are ordered: $C_{12},C_{13},\ldots,C_{1N},C_{23},\ldots,C_{2N},C_{34},\ldots,C_{N-1,N}$ • ${\begin{array}{l r l r l r}&{{\mathrm{For}}}&{t y p e}&{=}&{l o w e r,\quad\quad{\mathrm{the}}}&{N_{\mathrm{pair}}}&{=}&{N(N\quad-\quad1)/2}&{\leq}&{{\mathrm{~c}}}\ &{C_{21},C_{31},C_{32},C_{41},C_{42},C_{43},\quad\ldots,C_{{\mathrm{N1}}},C_{{\mathrm{N2}}},\ldots,\quad\ldots,C_{{\mathrm{N}},N-1}}&&{}\ &{{\mathrm{For}}}&{t y p e}&{=}&{a u t o/u p p e r,\quad\quad{\mathrm{the}}}&{N_{\mathrm{pair}}}&{=}&{N(N\quad+\quad1)/2}&{\leq}&{{\mathrm{~c}}}\ &{C_{11},C_{12},C_{13},\ldots,{\mathrm{~C_{1N}}},C_{22},C_{23},\ldots,\quad{\mathrm{~C_{2N}}},C_{33},C_{34},\ldots,C_{{\mathrm{N-1}},N},C_{{\mathrm{NN}}}}&&{}\ &{{\mathrm{For}}}&{t y p e}&{=}&{a u t o/l o w e r,\quad\quad{\mathrm{the}}}&{N_{\mathrm{pair}}}&{=}&{N(N\quad+\quad1)/2}&{\leq}&{{\mathrm{~c}}}\ &{C_{11},C_{21},C_{22},C_{31},C_{32},C_{33},C_{41},\ldots,C_{44},C_{{\mathrm{N1}}},C_{{\mathrm{N2}}},\ldots,C_{{\mathrm{N}},N-1},C_{{\mathrm{NN}}}}&&{}\end{array}}$ olumns are ordered: • olumns are ordered: • olumns are ordered: • $\mathrm{For}t y p e=f u l l$ , the $N_{\mathrm{pair}}=N^{2}$ columns are ordered: $C_{11},C_{12},\ldots,C_{1N},C_{21},C_{22},\ldots,,C_{2N},C_{31},\ldots,C_{3N},\ldots,C_{N1},\ldots,C_{N,N-1},C_{N N}$  

The array values calculated by this fix are treated as extensive. If you need to divide them by the number of atoms, you must do this in a later processing step (e.g., when using them in a variable).  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.16.5 Restrictions  

none  

# 2.16.6 Related commands  

fix ave/correlate/long, compute, fix ave/time, fix ave/atom, fix ave/chunk, fix ave/histo, variable  

# 2.16.7 Default  

none  

The option defaults are ave $=$ one, type $=$ auto, start $=0$ , no file output, title $^{1,2,3=}$ strings as described above, and prefactor $=1.0$ .  

# 2.17 fix ave/correlate/long command  

# 2.17.1 Syntax  

fix ID group-ID ave/correlate/long Nevery Nfreq value1 value2 ... keyword args ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• ave/correlate/long $=$ style name of this fix command   
• Nevery $=$ use input values every this many time steps   
• Nfreq $=$ save state of the time correlation functions every this many time steps   
• one or more input values can be listed   
• value $=\mathsf{c}.$ _ID, c_ID[N], f_ID, f_ID[N], v_name, v_name[I]   
$\widetilde{\mathrm{c\_ID}}=\mathrm{global}$ scalar calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ component of global vector calculated by a compute with ID, I can include wildcard␣   
$\hookrightarrow$ (see below)   
$\mathrm{f\_ID=global}$ scalar calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ component of global vector calculated by a fix with ID, I can include wildcard (see␣  

(continues on next page)  

(continued from previous page)  

$\hookrightarrow$ below)   
v_name = global value calculated by an equal-style variable with name   
v_name[I] $=$ Ith component of a vector-style variable with name, I can include wildcard (see below)  

• zero or more keyword/arg pairs may be appended • keyword $=$ type or start or file or overwrite or title1 or title2 or ncorr or nlen or ncount  

type arg $=$ auto or upper or lower or auto/upper or auto/lower or full auto $=$ correlate each value with itself upper $=$ correlate each value with each succeeding value lower $=$ correlate each value with each preceding value auto/uppe $\mathrm{r=auto+u}$ pper auto/lower $=$ auto + lower full = correlate each value with every other value, including itself $=$ auto + upper $^+$ lower   
start args = Nstart Nstart = start accumulating correlations on this time step   
file arg = filename filename = name of file to output correlation data to   
overwrite arg = none = overwrite output file with only latest output   
title1 arg = string string = text to print as 1st line of output file   
title2 arg = string string = text to print as 2nd line of output file   
ncorr arg = Ncorrelators Ncorrelators $=$ number of correlators to store   
nlen args = Nlen Nlen = length of each correlator   
ncount args = Ncount Ncount = number of values over which successive correlators are averaged  

# 2.17.2 Examples  

fix 1 all ave/correlate/long 5 1000 c_myTemp file temp.correlate   
fix 1 all ave/correlate/long 1 10000 & c_thermo_press[1] c_thermo_press[2] c_thermo_press[3] & type upper title1 "My correlation data" nlen 15 ncount 3   
fix 1 all ave/correlate/long 1 10000 c_thermo_press[\*]  

# 2.17.3 Description  

This fix is similar in spirit and syntax to the fix ave/correlate. However, this fix allows the efficient calculation of time correlation functions on-the-fly over extremely long time windows with little additional CPU overhead, using a multiple- $\cdot\tau$ method (Ramirez) that decreases the resolution of the stored correlation function with time. It is not a full drop-in replacement.  

The group specified with this command is ignored. However, note that specified values may represent calculations performed by computes and fixes which store their own “group” definitions.  

Each listed value can be the result of a compute or fix or the evaluation of an equal-style or vector-style variable. For vector-style variables, the specified indices can include a wildcard character. See the fix ave/correlate page for details.  

The Nevery and Nfreq arguments specify on what time steps the input values will be used to calculate correlation data and the frequency with which the time correlation functions will be output to a file, respectively. Note that there is no Nrepeat argument, unlike the fix ave/correlate command.  

The optional keywords ncorr, nlen, and ncount are unique to this command and determine the number of correlation points calculated and the memory and CPU overhead used by this calculation. Nlen and ncount determine the amount of averaging done at longer correlation times. The default values nlen $=16$ and ncount $=2$ ensure that the systematic error of the multiple- $\tau$ correlator is always below the level of the statistical error of a typical simulation (which depends on the ensemble size and the simulation length).  

The maximum correlation time (in time steps) that can be reached is given by the formula $(n l e n-1)n c o u n t^{(n c o r r-1)}$ . Longer correlation times are discarded and not calculated. With the default values of the parameters $(n c o r r=20\$ , $n l e n=16$ and $n c o u n t=2\$ , this corresponds to 7864320 time steps. If longer correlation times are needed, the value of ncorr should be increased. Using nlen $=16$ and $n c o u n t=2$ , with $n c o r r=30$ , the maximum number of steps that can be correlated is 80530636808. If ncorr $=40$ , correlation times in excess of $8\times10^{12}$ time steps can be calculated.  

The total memory needed for each correlation pair is roughly $4\times n c o r r\times n l e n\times8$ bytes. With the default values of the parameters, this corresponds to about $10\mathrm{KB}$ .  

For the meaning of the additional optional keywords, see the fix ave/correlate doc page.  

# 2.17.4 Restart, fix_modify, output, run start/stop, minimize info  

Contrary to fix ave/correlate this fix does not provide access to its internal data to various output options. Since this fix in intended for the calculation of time correlation functions over very long MD simulations, the information about this fix is written automatically to binary restart files, so that the time correlation calculation can continue in subsequent simulations. None of the fix_modify options are relevant to this fix.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.17.5 Restrictions  

This compute is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.17.6 Related commands  

fix ave/correlate  

# 2.17.7 Default  

none  

The option defaults for keywords that are also keywords for the fix ave/correlate command are as follows: type $=$ auto, start $=0$ , no file output, title $^{1,2=}$ strings as described on the fix ave/correlate doc page.  

The option defaults for keywords unique to this command are as follows: ncor $\scriptstyle=20$ , nlen ${}_{=16}$ , ncoun $\scriptstyle{\mathrm{t}}=2$  

(Ramirez) J. Ramirez, S.K. Sukumaran, B. Vorselaars and A.E. Likhtman, J. Chem. Phys. 133, 154103 (2010).  

# 2.18 fix ave/grid command  

# 2.18.1 Syntax  

fix ID group-ID ave/grid Nevery Nrepeat Nfreq Nx Ny Nz value1 value2 ... keyword args ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • ave/grid $=$ style name of this fix command  

• Nevery $=$ use input values every this many timesteps   
• Nrepeat $=$ # of times to use input values for calculating averages   
• Nfreq $=$ calculate averages every this many timesteps   
• Nx, Ny, $\mathbf{Nz}=$ grid size in each dimension   
• one or more per-atom or per-grid input values can be listed   
• per-atom value $=$ vx, vy, vz, fx, fy, fz, density/mass, density/number, mass, temp, c_ID, c_ID[I], f_ID, f_ID[I], v_name   
vx,vy,vz,fx,fy,fz,mass $=$ atom attribute (velocity, force component, mass)   
density/number, density/mass $=$ number or mass density (per volume)   
temp $=$ temperature   
$\mathrm{{c}\_I D=}$ per-atom vector calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ column of per-atom array calculated by a compute with ID, I can include wildcard␣   
$\hookrightarrow$ (see below)   
f_ID = per-atom vector calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ column of per-atom array calculated by a fix with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)   
v_name = per-atom vector calculated by an atom-style variable with name  

• per-grid value $=\mathfrak{c}$ _ID:gname:dname, c_ID:gname:dname[I], f_ID:gname:dname, f_ID:gname:dname[I]  

gname = name of grid defined by compute or fix   
dname $=$ name of data field defined by compute or fix   
c_ID = per-grid vector calculated by a compute with ID   
c_ID[I] = Ith column of per-grid array calculated by a compute with ID, I can include wildcard␣   
$\hookrightarrow$ (see below)   
$\mathrm{f}\_\mathrm{ID}=\mathrm{per}$ -grid vector calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ column of per-grid array calculated by a fix with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)  

• zero or more keyword/arg pairs may be appended • keyword $=$ discard or norm or ave or bias or adof or cdof  

discard $\mathrm{arg}=\mathrm{yes}$ or no   
yes $=$ discard an atom outside grid in a non-periodic dimension   
no = remap an atom outside grid in a non-periodic dimension to first or last grid cell   
norm arg = all or sample or none $=$ how output on Nfreq steps is normalized all $=$ output is sum of atoms across all Nrepeat samples, divided by atom count sample $-$ output is sum of Nrepeat sample averages, divided by Nrepeat   
none = output is sum of Nrepeat sample sums, divided by Nrepeat   
ave args = one or running or window M   
one = output new average value every Nfreq steps   
running = output cumulative average of all previous Nfreq steps   
window M = output average of M most recent Nfreq steps   
bias arg = bias-ID   
bias-ID = ID of a temperature compute that removes a velocity bias for temperature calculation   
adof value = dof_per_atom   
dof_per_atom = define this many degrees-of-freedom per atom for temperature calculation   
cdof value = dof_per_grid_cell   
dof_per_grid_cell $=$ add this many degrees-of-freedom per grid_cell for temperature calculation  

# 2.18.2 Examples  

fix 1 all ave/grid 10000 1 10000 10 10 10 fx fy fz c_myMSD[\*] fix 1 flow ave/grid 100 10 1000 20 20 30 f_TTM:grid:data  

# 2.18.3 Description  

Overlay the 2d or 3d simulation box with a uniformly spaced 2d or 3d grid and use it to either (a) time-average per-atom quantities for the atoms in each grid cell, or to (b) time-average per-grid quantities produced by other computes or fixes. This fix operates in either “per-atom mode” (all input values are per-atom) or in “per-grid mode” (all input values are per-grid). You cannot use both per-atom and per-grid inputs in the same command.  

The grid created by this command is distributed; each processor owns the grid points that are within its subdomain. This is similar to the fix ave/chunk command when it uses chunks from the compute chunk/atom command which are 2d or 3d regular bins. However, the per-bin outputs in that case are global; each processor stores a copy of the entire set of bin data. Thus it more efficient to use the fix ave/grid command when the grid is large and a simulation is run on many processors.  

For per-atom mode, only atoms in the specified group contribute to the summing and averaging calculations. For per-grid mode, the specified group is ignored.  

The $N_{\mathrm{every}}$ , $N_{\mathrm{repeat}}$ , and $N_{\mathrm{freq}}$ arguments specify on what time steps the input values will be accessed and contribute to the average. The final averaged quantities are generated on time steps that are a multiples of $N_{\mathrm{freq}}$ . The average is over $N_{\mathrm{repeat}}$ quantities, computed in the preceding portion of the simulation every $N_{\mathrm{every}}$ time steps. $N_{\mathrm{freq}}$ must be a multiple of $N_{\mathrm{every}}$ and $N_{\mathrm{every}}$ must be non-zero even if $N_{\mathrm{repeat}}=1$ . Also, the time steps contributing to the average value cannot overlap (i.e., $N_{\mathrm{repeat}}\times N_{\mathrm{every}}$ cannot exceed $N_{\mathrm{freq.}}$ ).  

For example, if $N_{\mathrm{every}}=2$ , $N_{\mathrm{repeat}}=6$ , and $N_{\mathrm{freq}}=100$ , then values on time steps 90,92,94,96,98,100 will be used to compute the final average on timestep 100. Similarly for timesteps 190,192,194,196,198,200 on timestep 200, etc. If $N_{\mathrm{repeat}}=1$ and $N_{\mathrm{freq}}=100$ , then no time averaging is done; values are simply generated on timesteps 100,200,etc.  

In per-atom mode, each input value can also be averaged over the atoms in each grid cell. The way the averaging is done across the $N_{\mathrm{repeat}}$ timesteps to produce output on the $N_{\mathrm{freq}}$ timesteps, and across multiple $N_{\mathrm{freq}}$ outputs, is determined by the norm and ave keyword settings, as discussed below.  

The $N x,N y$ , and $N z$ arguments specify the size of the grid that overlays the simulation box. For 2d simulations, $N z$ must be 1. The $N x,N y,N z$ values can be any positive integer. The grid can be very coarse compared to the particle count, or very fine. If one or more of the values $=1$ , then bins are 2d planes or 1d slices of the simulation domain. Note that if the total number of grid cells is small, it may be more efficient to use the fix ave/chunk command which can treat a grid defined by the compute chunk/atom command as a global grid where each processor owns a copy of all the grid cells. If $N x=N y=N z=1$ is used, the same calculation would be more efficiently performed by the fix ave/atom command.  

If the simulation box size or shape changes during a simulation, the grid always conforms to the size/shape of the current simulation box. If one more dimensions have non-periodic shrink-wrapped boundary conditions, as defined by the boundary command, then the grid will extend over the (dynamic) shrink-wrapped extent in each dimension. If the box shape is triclinic, as explained in Howto triclinic, then the grid is also triclinic; each grid cell is a small triclinic cell with the same shape as the simulation box.  

In both per-atom and per-grid mode, input values from a compute or fix that produces an array of values (multiple values per atom or per grid point), the bracketed index I can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $\mathbf{\overline{{\rho}}}^{\mathbf{6}\mathbf{*}}\mathbf{\overline{{n}}}^{\mathbf{,}\mathbf{,}}$ or $\mathbf{\tilde{\Sigma}}^{66}\mathbf{n}^{*}{}^{,}$ or $\mathbf{\tilde{\rho}}_{\mathrm{m}}^{*}\mathbf{\tilde{n}}^{,}$ . If $\mathbf{N}=$ the number of columns in the array (for mode $=$ vector), then an asterisk with no numeric values means all indices from 1 to N. A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from n to N (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual columns of the array had been listed one by one. E.g. if there were a compute fft/grid command which produced 3 values for each grid point, these two fix ave/grid commands would be equivalent:  

compute myFFT all fft/grid 10 10 10 ...   
fix 1 all ave/grid 100 1 100 10 10 10 c_myFFT:grid:data[\*]   
fix 2 all ave/grid 100 1 100 10 10 10 c_myFFT:grid:data[\*][1] c_myFFT:grid:data[\*][2] c $\hookrightarrow$ myFFT:grid:data[3]  

Per-atom mode:  

Each specified per-atom value can be an atom attribute (velocity, force component), a number or mass density, a mass or temperature, or the result of a compute or $f\boldsymbol{a}\boldsymbol{x}$ or the evaluation of an atom-style variable. In the latter cases, the compute, fix, or variable must produce a per-atom quantity, not a global quantity. Note that the compute property/atom command provides access to any attribute defined and stored by atoms.  

The per-atom values of each input vector are summed and averaged independently of the per-atom values in other input vectors.  

Computes that produce per-atom quantities are those which have the word atom in their style name. See the doc pages for individual fixes to determine which ones produce per-atom quantities. Variables of style atom are the only ones that can be used with this fix since all other styles of variable produce global quantities.  

The atom attribute values (vx,vy,vz,fx,fy,fz,mass) are self-explanatory. As noted above, any other atom attributes can be used as input values to this fix by using the compute property/atom command and then specifying an input value from that compute.  

The density/number value means the number density is computed for each grid cell, i.e. number/volume. The density/mass value means the mass density is computed for each grid/cell, i.e. total-mass/volume. The output values are in units of 1/volume or density (mass/volume). See the units command page for the definition of density for each choice of units, e.g. gram/cm^3.  

The temp value computes the temperature for each grid cell, by the formula  

$$
\mathrm{KE}=\frac{\mathrm{DOF}}{2}k_{B}T,
$$  

where $\mathrm{KE}=$ total kinetic energy of the atoms in the grid cell ( $\scriptstyle{{\frac{1}{2}}m\nu^{2}})$ , $\mathrm{DOF}=$ the total number of degrees of freedom or all atoms in the grid cell, $k_{B}=$ Boltzmann constant, and $T=$ temperature.  

The DOF is calculated as N\*adof $^+$ cdof, where $\Nu=$ number of atoms in the grid cell, adof $=$ degrees of freedom per atom, and cdof $=$ degrees of freedom per grid cell. By default adof $=2$ or $3=$ dimensionality of system, as set via the dimension command, and cdof $=0.0$ . This gives the usual formula for temperature.  

Note that currently this temperature only includes translational degrees of freedom for each atom. No rotational degrees of freedom are included for finite-size particles. Also no degrees of freedom are subtracted for any velocity bias or constraints that are applied, such as compute temp/partial, or fix shake or fix rigid. This is because those degrees of freedom (e.g. a constrained bond) could apply to sets of atoms that are both inside and outside a specific grid cell, and hence the concept is somewhat ill-defined. In some cases, you can use the adof and cdof keywords to adjust the calculated degrees of freedom appropriately, as explained below.  

Also note that a bias can be subtracted from atom velocities before they are used in the above formula for KE, by using the bias keyword. This allows, for example, a thermal temperature to be computed after removal of a flow velocity profile.  

# 2.18. fix ave/grid command  

Note that the per-grid-cell temperature calculated by this fix and the compute temp/chunk command (using bins) can be different. The compute calculates the temperature for each chunk for a single snapshot. This fix can do that but can also time average those values over many snapshots, or it can compute a temperature as if the atoms in the grid cell on different timesteps were collected together as one set of atoms to calculate their temperature. The compute allows the center-of-mass velocity of each chunk to be subtracted before calculating the temperature; this fix does not.  

If a value begins with “c_”, a compute ID must follow which has been previously defined in the input script. If no bracketed integer is appended, the per-atom vector calculated by the compute is used. If a bracketed integer is appended, the Ith column of the per-atom array calculated by the compute is used. Users can also write code for their own compute styles and add them to LAMMPS. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script. If no bracketed integer is appended, the per-atom vector calculated by the fix is used. If a bracketed integer is appended, the Ith column of the per-atom array calculated by the fix is used. Note that some fixes only produce their values on certain timesteps, which must be compatible with $N_{\mathrm{every}}$ , else an error results. Users can also write code for their own fix styles and add them to LAMMPS. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “v_”, a variable name must follow which has been previously defined in the input script. Variables of style atom can reference thermodynamic keywords and various per-atom attributes, or invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of generating per-atom quantities to average within grid cells.  

# Per-grid mode:  

The attributes that begin with $c_{-}I D$ and $f_{-}I D$ both take colon-separated fields gname and dname. These refer to a grid name and data field name which is defined by the compute or fix. Note that a compute or fix can define one or more grids (of different sizes) and one or more data fields for each of those grids. The sizes of all grids used as values for one instance of this fix must be the same.  

The $c_{-}I D$ :gname:dname and $c_{-}I D$ :gname:dname[I] attributes allow per-grid vectors or arrays calculated by a compute to be accessed. The ID in the attribute should be replaced by the actual ID of the compute that has been defined previously in the input script.  

If $c_{-}I D$ :gname:dname is used as a attribute, then the per-grid vector calculated by the compute is accessed. If $c_{-}I D$ :gname:dname[I] is used, then I must be in the range from 1-M, which will access the Ith column of the pergrid array with M columns calculated by the compute. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

The $f_{-}I D$ :gname:dname and f_ID:gname:dname[I] attributes allow per-grid vectors or arrays calculated by a $f\boldsymbol{a}\boldsymbol{x}$ to be output. The ID in the attribute should be replaced by the actual ID of the fix that has been defined previously in the input script.  

If f_ID:gname:dname is used as a attribute, then the per-grid vector calculated by the fix is printed. If $f_{-}I D$ :gname:dname[I] is used, then I must be in the range from 1-M, which will print the Ith column of the per-grid with M columns calculated by the fix. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

Additional optional keywords also affect the operation of this fix and its outputs. Some are only applicable to per-atom mode. Some are applicable to both per-atom and per-grid mode.  

The discard keyword is only applicable to per-atom mode. If a dimension of the system is non-periodic, then grid cells will only span the box dimension (fixed or shrink-wrap boundaries as set by the boundary command command). An atom may thus be slightly outside the range of grid cells on a particular timestep. If discard is set to yes (the default), then the atom will be assigned to the closest grid cell (lowest or highest) in that dimension. If discard is set to no the atom will be ignored.  

The norm keyword is only applicable to per-atom mode. In per-grid mode, the norm keyword setting is ignored. The output grid value on an $N_{\mathrm{freq}}$ timestep is the sum of the grid values in each of the $N_{\mathrm{repeat}}$ samples, divided by $N_{\mathrm{repeat}}$ .  

In per-atom mode, the norm keyword affects how averaging is done for the per-grid values that are output on an $N_{\mathrm{freq}}$ timestep. $N_{\mathrm{repeat}}$ samples contribute to the output. The norm keyword has 3 possible settings: all or sample or none. $A l l$ is the default.  

In the formulas that follow, SumI is the sum of a per-atom property over the CountI atoms in a grid cell for a single sample I, where I varies from 1 to $\Nu_{:}$ , and $\Nu=$ Nrepeat. These formulas are used for any per-atom input value listed above, except density/number, density/mass, and temp. Those input values are discussed below.  

In per-atom mode, for norm all the output grid value on the $N_{\mathrm{freq}}$ timestep is an average over atoms across the entire $N_{\mathrm{freq}}$ timescale:  

$$
{\mathrm{Output}}=({\mathrm{Sum}}1+{\mathrm{Sum}}2+\ldots+{\mathrm{SumN}})/({\mathrm{Count}}1+{\mathrm{Count}}2+\ldots+{\mathrm{CountN}})
$$  

In per-atom mode, for norm sample the output grid value on the $N_{\mathrm{freq}}$ timestep is an average of an average:  

Output $=$ (Sum1/Count1 + Sum2/Count2 + . . . + SumN/CountN) / Nrepeat  

In per-atom mode, for norm none the output grid value on the $N_{\mathrm{freq}}$ timestep is not normalized by the atom counts:  

Outpu $\mathrm{\Lambda}:=\left(\mathrm{Sum1+Sum2+\dots~SumN}\right)/\mathrm{Nrepeat}$  

For density/number and density/mass, the output value is the same as in the formulas above for norm all and norm sample, except that the result is also divided by the grid cell volume. For norm all, this will be the volume at the final $N_{\mathrm{freq}}$ timestep. For norm sample, the divide-by-volume is done for each sample, using the grid cell volume at the sample timestep. For norm none, the output is the same as for norm all.  

For temp, the output temperature uses the formula for kinetic energy KE listed above, and is normalized similarly to the formulas above for norm all and norm sample, except for the way the degrees of freedom (DOF) are calculated. For norm none, the output is the same as for norm all.  

For norm all, the $\mathrm{DOF}=N_{\mathrm{repeat}}\times$ cdof plus Count times adof, where $C o u n t=(\mathrm{Count1+Count2+...+CountN})$ . The cdof and adof keywords are discussed below. The output temperature is computed with all atoms across all samples contributing.  

For norm sample, the DOF for a single sample $=$ cdof plus Count times adof, where Count $=$ CountI for a single sample.   
The output temperature is the average of Nsample temperatures calculated for each sample.  

Finally, for all 3 norm settings the output count of atoms per grid cell is:  

Output count $=$ (Count1 $^+$ Count2 + . . . CountN) / Nrepeat  

This count is the same for all per-atom input values, including density/number, density/mass, and temp.  

The ave keyword is applied to both per-atom and per-grid mode. It determines how the per-grid values produced once every $N_{\mathrm{freq}}$ steps are averaged with values produced on previous steps that were multiples of $N_{\mathrm{freq}}$ , before they are accessed by another output command.  

If the ave setting is one, which is the default, then the grid values produced on $N_{\mathrm{freq}}$ timesteps are independent of each other; they are output as-is without further averaging.  

If the ave setting is running, then the grid values produced on $N_{\mathrm{freq}}$ timesteps are summed and averaged in a cumulative sense before being output. Each output grid value is thus the average of the grid value produced on that timestep with all preceding values for the same grid value. This running average begins when the fix is defined; it can only be restarted by deleting the fix via the unfix command, or re-defining the fix by re-specifying it.  

# 2.18. fix ave/grid command  

If the ave setting is window, then the grid values produced on $N_{\mathrm{freq}}$ timesteps are summed and averaged within a moving “window” of time, so that the last M values for the same grid are used to produce the output. E.g. if $\mathbf M=3$ and Nfreq $=1000$ , then the grid value output on step 10000 will be the average of the grid values on steps 8000,9000,10000. Outputs on early steps will average over less than M values if they are not available.  

The bias, adof, and cdof keywords are only applicable to per-atom mode.  

The bias keyword specifies the ID of a temperature compute that removes a “bias” velocity from each atom, specified as bias- $\mathbf{\nabla}\cdot I D$ . It is only used when the temp value is calculated, to compute the thermal temperature of each grid cell after the translational kinetic energy components have been altered in a prescribed way, e.g. to remove a flow velocity profile. See the doc pages for individual computes that calculate a temperature to see which ones implement a bias.  

The adof and cdof keywords define the values used in the degree of freedom (DOF) formula described above for temperature calculation for each grid cell. They are only used when the temp value is calculated. They can be used to calculate a more appropriate temperature in some cases. Here are 3 examples:  

If grid cells contain some number of water molecules and fix shake is used to make each molecule rigid, then you could calculate a temperature with 6 degrees of freedom (DOF) (3 translational, 3 rotational) per molecule by setting adof to 2.0.  

If compute temp/partial is used with the bias keyword to only allow the x component of velocity to contribute to the temperature, then adof $=1.0$ would be appropriate.  

Using cdof $=-2$ or $^{-3}$ (for 2d or 3d simulations) will subtract out 2 or 3 degrees of freedom for each grid cell, similar to how the compute temp command subtracts out 3 DOF for the entire system.  

# 2.18.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix calculates a per-grid array which has one column for each of the specified input values. The units for each column with be in the units for the per-atom or per-grid quantity for the corresponding input value. If the fix is used in per-atom mode, it also calculates a per-grid vector with the count of atoms in each grid cell. The number of rows in the per-grid array and number of values in the per-grid vector (distributed across all processors) is $\mathrm{Nx^{*}N y^{*}N z}$ .  

For access by other commands, the name of the single grid produced by this fix is “grid”. The names of its two per-grid datums are “data” for the per-grid array and “count” for the per-grid vector (if using per-atom values). Both datums can be accessed by various output commands.  

In per-atom mode, the per-grid array values calculated by this fix are treated as “intensive”, since they are typically already normalized by the count of atoms in each grid cell.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.18.5 Restrictions  

none  

# 2.18.6 Related commands  

fix ave/atom, fix ave/chunk  

# 2.18.7 Default  

The option defaults are discard $=$ yes, norm $=$ all, ave $=$ one, and bias $=$ none.  

# 2.19 fix ave/histo command  

# 2.20 fix ave/histo/weight command  

# 2.20.1 Syntax  

fix ID group-ID style Nevery Nrepeat Nfreq lo hi Nbin value1 value2 ... keyword args ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• style $=$ ave/histo or ave/histo/weight $=$ style name of this fix command   
• Nevery $=$ use input values every this many timesteps   
• Nrepeat $=\#$ of times to use input values for calculating histogram   
• Nfreq $=$ calculate histogram every this many timesteps   
• $\mathrm{{lo,hi=1o/hi}}$ bounds within which to histogram   
• ${\mathrm{Nbin}}=\#$ of histogram bins   
• one or more input values can be listed   
• value $=x,$ , y, z, vx, vy, vz, fx, fy, fz, c_ID, c_ID[N], f_ID, f_ID[N], v_name   
x,y,z,vx,vy,vz,fx,fy,f $:=$ atom attribute (position, velocity, force component)   
$\mathrm{c\_ID}=\mathrm{scalar}$ or vector calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ component of vector or Ith column of array calculated by a compute with ID, I can␣   
$\hookrightarrow$ include wildcard (see below)   
$\mathrm{f\_ID=}$ scalar or vector calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ component of vector or Ith column of array calculated by a fix with ID, I can include␣   
$\hookrightarrow$ wildcard (see below)   
$\mathrm{v\_name}=\mathrm{value}(\mathrm{s})$ calculated by an equal-style or vector-style or atom-style variable with name   
v_name[I] = value calculated by a vector-style variable with name, I can include wildcard (see␣   
$\hookrightarrow$ below)  

• zero or more keyword/arg pairs may be appended  

• keyword $=$ mode or kind or file or append or ave or start or beyond or overwrite or title1 or title2 or title3  

mode arg $=$ scalar or vector scalar $=$ all input values are scalars vector $=$ all input values are vectors   
kind arg = global or peratom or local   
file arg = filename filename = name of file to output histogram(s) to   
append arg = filename filename = name of file to append histogram(s) to   
ave args = one or running or window one $-$ output a new average value every Nfreq steps running = output cumulative average of all previous Nfreq steps window M = output average of M most recent Nfreq steps   
start args $=$ Nstart $\mathrm{Nstart}=\mathrm{start}$ averaging on this timestep   
beyond arg $=$ ignore or end or extra ignore $=$ ignore values outside histogram lo/hi bounds end = count values outside histogram lo/hi bounds in end bins extra $=$ create 2 extra bins for value outside histogram lo/hi bounds   
overwrite arg = none = overwrite output file with only latest output   
title1 arg = string string = text to print as 1st line of output file   
title2 arg $=$ string string $=$ text to print as 2nd line of output file   
title3 arg $=$ string string $=$ text to print as 3rd line of output file, only for vector mode  

# 2.20.2 Examples  

fix 1 all ave/histo 100 5 1000 0.5 1.5 50 c_myTemp file temp.histo ave running   
fix 1 all ave/histo 100 5 1000 -5 5 100 c_thermo_press[2] c_thermo_press[3] title1 "My output values"   
fix 1 all ave/histo 100 5 1000 -5 5 100 c_thermo_press[\*]   
fix 1 all ave/histo 1 100 1000 -2.0 2.0 18 vx vy vz mode vector ave running beyond extra   
fix 1 all ave/histo/weight 1 1 1 10 100 2000 c_XRD[1] c_XRD[2]  

# 2.20.3 Description  

Use one or more values as inputs every few timesteps to create a single histogram. The histogram can then be averaged over longer timescales. The resulting histogram can be used by other output commands, and can also be written to a file. The fix ave/histo/weight command has identical syntax to fix ave/histo, except that exactly two values must be specified. See details below.  

The group specified with this command is ignored for global and local input values. For per-atom input values, only atoms in the group contribute to the histogram. Note that regardless of the specified group, specified values may represent calculations performed by computes and fixes which store their own “group” definition.  

A histogram is simply a count of the number of values that fall within a histogram bin. Nbins are defined, with even spacing between lo and hi. Values that fall outside the lo/hi bounds can be treated in different ways; see the discussion of the beyond keyword below.  

Each input value can be an atom attribute (position, velocity, force component) or can be the result of a compute or $f\boldsymbol{{x}}$ or the evaluation of an equal-style or vector-style or atom-style variable. The set of input values can be either all global, all per-atom, or all local quantities. Inputs of different kinds (e.g. global and per-atom) cannot be mixed. Atom attributes are per-atom vector values. See the page for individual “compute” and “fix” commands to see what kinds of quantities they generate.  

Note that a compute or fix can produce multiple kinds of data (global, per-atom, local). If LAMMPS cannot unambiguously determine which kind of data to use, the optional kind keyword discussed below can force the desired disambiguation.  

Note that the output of this command is a single histogram for all input values combined together, not one histogram per input value. See below for details on the format of the output of this fix.  

The input values must either be all scalars or all vectors (or arrays), depending on the setting of the mode keyword.  

If mode $=$ scalar, then the input values must be scalars, or vectors with a bracketed term appended, indicating the Ith value of the vector is used.  

If mode $=$ vector, then the input values must be vectors, or arrays with a bracketed term appended, indicating the Ith column of the array is used.  

If the fix ave/histo/weight command is used, exactly two values must be specified. If the values are vectors, they must be the same length. The first value (a scalar or vector) is what is histogrammed into bins, in the same manner the fix ave/histo command operates. The second value (a scalar or vector) is used as a “weight”. This means that instead of each value tallying a “1” to its bin, the corresponding weight is tallied. For example, the $N^{\mathrm{th}}$ entry (weight) in the second vector is tallied to the bin corresponding to the $N^{\mathrm{th}}$ entry in the first vector.  

For input values from a compute or fix or variable, the bracketed index I can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\rightarrow}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the size of the vector (for mode $=$ scalar) or the number of columns in the array (for mode $=$ vector), then an asterisk with no numeric values means all indices from 1 to $N$ . A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from m to $N$ (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual elements of the vector or columns of the array had been listed one by one. For example, the following two fix ave/histo commands are equivalent, since the compute com/chunk command creates a global array with three columns:  

compute myCOM all com/chunk   
fix 1 all ave/histo 100 1 100 -10.0 10.0 100 c_myCOM[\*] file tmp1.com mode vector   
fix 2 all ave/histo 100 1 100 -10.0 10.0 100 c_myCOM[1] c_myCOM[2] c_myCOM[3] file tmp2.com␣   
$\hookrightarrow$ mode vector  

![](images/20bf27b4ce90804ff3a2457d398242c87712d37abd4dbe7892db05d84609dd94.jpg)  

# Note  

For a vector-style variable, only the wildcard forms $\mathbf{\overline{{\Omega}}^{6*}\mathbf{\overline{{\Omega}}\mathbf{n}}^{,,}}$ or “m\*n” are allowed. You must specify the upper bound, because vector-style variable lengths are not determined until the variable is evaluated. If n is specified larger than the vector length turns out to be, zeroes are output for missing vector values.  

The $N_{\mathrm{every}}$ , $N_{\mathrm{repeat}}$ , and $N_{\mathrm{freq}}$ arguments specify on what time steps the input values will be used in order to contribute to the histogram. The final histogram is generated on time steps that are multiple of $N_{\mathrm{freq}}$ . It is averaged over $N_{\mathrm{repeat}}$ histograms, computed in the preceding portion of the simulation every $N_{\mathrm{every}}$ time steps. $N_{\mathrm{freq}}$ must be a multiple of $N_{\mathrm{every}}$ and $N_{\mathrm{every}}$ must be non-zero even if $N_{\mathrm{repeat}}$ is 1. Also, the time steps contributing to the histogram value cannot overlap (i.e., $N_{\mathrm{repeat}}\times N_{\mathrm{every}}$ cannot exceed $N_{\mathrm{freq.}}$ ).  

For example, if $N_{\mathrm{every}}=2$ , $N_{\mathrm{repeat}}=6$ , and $N_{\mathrm{freq}}=100$ , then input values on time steps 90, 92, 94, 96, 98, and 100 will be used to compute the final histogram on timestep 100. Similarly for timesteps 190, 192, 194, 196, 198, and 200 on timestep 200, etc. If $N_{\mathrm{repeat}}=1$ and $N_{\mathrm{freq}}=100$ , then no time averaging of the histogram is done; a histogram is simply generated on timesteps 100, 200, etc.  

The atom attribute values (x, y, z, vx, vy, vz, fx, fy, and $f\sb{\textnormal{Z}})$ are self-explanatory. Note that other atom attributes can be used as inputs to this fix by using the compute property/atom command and then specifying an input value from that compute.  

If a value begins with “c_”, a compute ID must follow which has been previously defined in the input script. If mode $=$ scalar, then if no bracketed term is appended, the global scalar calculated by the compute is used. If a bracketed term is appended, the Ith element of the global vector calculated by the compute is used. If mode $=$ vector, then if no bracketed term is appended, the global or per-atom or local vector calculated by the compute is used. If a bracketed term is appended, the Ith column of the global or per-atom or local array calculated by the compute is used. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

Note that there is a compute reduce command that can sum per-atom quantities into a global scalar or vector, which can then be accessed by fix ave/histo. It can also be a compute defined not in your input script, but by thermodynamic output or other fixes such as fix nvt or fix temp/rescale. See the doc pages for these commands which give the IDs of these computes. Users can also write code for their own compute styles and add them to LAMMPS.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script. If mode $=$ scalar, then if no bracketed term is appended, the global scalar calculated by the fix is used. If a bracketed term is appended, the Ith element of the global vector calculated by the fix is used. If mode $=$ vector, then if no bracketed term is appended, the global or per-atom or local vector calculated by the fix is used. If a bracketed term is appended, the $I^{\mathrm{th}}$ column of the global or per-atom or local array calculated by the fix is used. See the discussion above for how $I$ can be specified with a wildcard asterisk to effectively specify multiple values.  

Note that some fixes only produce their values on certain timesteps, which must be compatible with $N_{\mathrm{every}}$ , else an error will result. Users can also write code for their own fix styles and add them to LAMMPS.  

If a value begins with $\begin{array}{r}{\mathrm{\"~\boldmath~\Omega~}}\ {\mathrm{\boldmath~\Omega~}}\end{array}$ , a variable name must follow which has been previously defined in the input script. If mode $=$ scalar, then only equal-style or vector-style variables can be used, which both produce global values. In this mode, a vector-style variable requires a bracketed term to specify the $I^{\mathrm{th}}$ element of the vector calculated by the variable. If mode $=$ vector, then only vector-style or atom-style variables can be used, which produce a global or per-atom vector respectively. The vector-style variable must be used without a bracketed term. See the variable command for details.  

Note that variables of style equal, vector, and atom define a formula which can reference individual atom properties or thermodynamic keywords, or they can invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of specifying quantities to histogram.  

Additional optional keywords also affect the operation of this fix.  

If the mode keyword is set to scalar, then all input values must be global scalars, or elements of global vectors. If the mode keyword is set to vector, then all input values must be global or per-atom or local vectors, or columns of global or per-atom or local arrays.  

The kind keyword only needs to be used if any of the specified input computes or fixes produce more than one kind of output (global, per-atom, local). If not, LAMMPS will determine the kind of data all the inputs produce and verify it is all the same kind. If not, an error will be triggered. If a compute or fix produces more than one kind of output, the kind keyword should be used to specify which output will be used. The other input arguments must still be consistent.  

The beyond keyword determines how input values that fall outside the $l o$ to $h i$ bounds are treated. Values such that lo $\leq$ value $\leq h i$ are assigned to one bin. Values on a bin boundary are assigned to the lower of the two bins. If beyond is set to ignore then values $<l o$ and values $>h i$ are ignored (i.e., they are not binned). If beyond is set to end, then values $<l o$ are counted in the first bin and values $>h i$ are counted in the last bin. If beyond is set to extend, then two extra bins are created so that there are $N_{\mathrm{bins}}+2$ total bins. Values $<l o$ are counted in the first bin and values $>h i$ are counted in the last bin $(N_{\mathrm{bins}}+2)$ . Values between $l o$ and $h i$ (inclusive) are counted in bins 2 through $N_{\mathrm{bins}}+1$ . The “coordinate” stored and printed for these two extra bins is $l o$ and $h i$ .  

The ave keyword determines how the histogram produced every $N_{\mathrm{freq}}$ steps are averaged with histograms produced on previous steps that were multiples of $N_{\mathrm{freq}}$ , before they are accessed by another output command or written to a file.  

If the ave setting is one, then the histograms produced on timesteps that are multiples of $N_{\mathrm{freq}}$ are independent of each other; they are output as-is without further averaging.  

If the ave setting is running, then the histograms produced on timesteps that are multiples of $N_{\mathrm{freq}}$ are summed and averaged in a cumulative sense before being output. Each bin value in the histogram is thus the average of the bin value produced on that timestep with all preceding values for the same bin. This running average begins when the fix is defined; it can only be restarted by deleting the fix via the unfix command, or by re-defining the fix by re-specifying it.  

If the ave setting is window, then the histograms produced on timesteps that are multiples of $N_{\mathrm{freq}}$ are summed within a moving “window” of time, so that the last $M$ histograms are used to produce the output (e.g., if $M=3$ and $N_{\mathrm{freq}}=1000$ , then the output on step 10000 will be the combined histogram of the individual histograms on steps 8000, 9000, and 10000. Outputs on early steps will be sums over less than $M$ histograms if they are not available.  

The start keyword specifies what timestep histogramming will begin on. The default is step 0. Often input values can be 0.0 at time 0, so setting start to a larger value can avoid including a 0.0 in a running or windowed histogram.  

Added in version $17\mathrm{Apr}2024$ : new keyword append  

The file or append keywords allow a filename to be specified. If file is used, then the filename is overwritten if it already exists. If append is used, then the filename is appended to if it already exists, or created if it does not exist. Every Nfreq steps, one histogram is written to the file. This includes a leading line that contains the timestep, number of bins, the total count of values contributing to the histogram, the count of values that were not histogrammed (see the beyond keyword), the minimum value encountered, and the maximum value encountered. The min/max values include values that were not histogrammed. Following the leading line, one line per bin is written into the file. Each line contains the bin #, the coordinate for the center of the bin (between lo and $h i$ ), the count of values in the bin, and the normalized count. The normalized count is the bin count divided by the total count (not including values not histogrammed), so that the normalized values sum to 1.0 across all bins.  

The overwrite keyword will continuously overwrite the output file with the latest output, so that it only contains one timestep worth of output. This option can only be used with the ave running setting.  

The title1, title2, and title3 keywords allow specification of the strings that will be printed as the first three lines of the output file, assuming the file keyword was used. LAMMPS uses default values for each of these, so they do not need to be specified.  

By default, these header lines are as follows:  

# Histogram for fix ID   
# TimeStep Number-of-bins Total-counts Missing-counts Min-value Max-value   
# Bin Coord Count Count/Total  

In the first line, ID is replaced with the fix-ID. The second line describes the six values that are printed at the first of each section of output. The third describes the four values printed for each bin in the histogram.  

# 2.20.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix produces a global vector and global array which can be accessed by various output commands. The values can only be accessed on timesteps that are multiples of $N_{\mathrm{freq}}$ since that is when a histogram is generated. The global vector has four values:  

1. total counts in the histogram   
2. values that were not histogrammed (see beyond keyword)   
3. min value of all input values, including ones not histogrammed   
4. max value of all input values, including ones not histogrammed  

The global array has $N_{\mathrm{bins}}$ rows and three columns. The first column has the bin coordinate, the second column has the count of values in that histogram bin, and the third column has the bin count divided by the total count (not including missing counts), so that the values in the third column sum to 1.0.  

The vector and array values calculated by this fix are all treated as intensive. If this is not the case (e.g., due to histogramming per-atom input values), then you will need to account for that when interpreting the values produced by this fix.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.20.5 Restrictions  

none  

# 2.20.6 Related commands  

compute, fix ave/atom, fix ave/chunk, fix ave/time, variable, fix ave/correlate,  

# 2.20.7 Default  

none  

The option defaults are mode $=$ scalar, kind $=$ figured out from input arguments, ave $=$ one, start $=0$ , no file output, beyond $=$ ignore, and title $^{1,2,3=}$ strings as described above.  

# 2.21 fix ave/spatial command  

Deprecated since version 11Dec2015.  

The fix ave/spatial command has been superseded by fix ave/chunk.  

# 2.22 fix ave/spatial/sphere command  

Deprecated since version 11Dec2015.  

The fix ave/spatial/sphere command has been superseded by fix ave/chunk.  

# 2.23 fix ave/time command  

# 2.23.1 Syntax  

fix ID group-ID ave/time Nevery Nrepeat Nfreq value1 value2 ... keyword args ...  

• ID, group-ID are documented in fix command • ave/time $=$ style name of this fix command • Nevery $=$ use input values every this many time steps • Nrepeat $=$ # of times to use input values for calculating averages • Nfreq $=$ calculate averages every this many time steps • one or more input values can be listed • value $\l=\mathsf{c}.$ _ID, c_ID[N], f_ID, f_ID[N], v_name  

$\widetilde{\textrm{c}\_{\mathrm{ID}}=\mathrm{global}}$ scalar or vector calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ component of global vector or Ith column of global array calculated by a compute␣   
$\hookrightarrow$ with ID, I can include wildcard (see below)   
$\mathrm{f\_ID=global}$ scalar or vector calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ component of global vector or Ith column of global array calculated by a fix with ID,␣   
$_{\textrm{\scriptsize\textrm{\scriptsize\textrm{\scriptsize\textrm{1}}}}}$ can include wildcard (see below)   
$\mathrm{v\_name}=\mathrm{value}(\mathrm{s})$ calculated by an equal-style or vector-style variable with name   
v_name[I] = value calculated by a vector-style variable with name, I can include wildcard (see␣   
$\hookrightarrow$ below)  

• zero or more keyword/arg pairs may be appended • keyword $=$ mode or file or append or ave or start or off or overwrite or format or title1 or title2 or title3  

mode arg $=$ scalar or vector scalar $=$ all input values are global scalars vector $=$ all input values are global vectors or global arrays   
ave args $=$ one or running or window M one $=$ output a new average value every Nfreq steps running = output cumulative average of all previous Nfreq steps window M = output average of M most recent Nfreq steps   
start args = Nstart Nstart = start averaging on this time step   
off $\mathrm{arg}=\mathbf{M}=\mathrm{do}$ not average this value M = value $\#$ from 1 to Nvalues   
file arg = filename filename = name of file to output time averages to   
append arg = filename filename = name of file to append time averages to   
overwrite arg = none = overwrite output file with only latest output   
format arg = string string = C-style format string   
title1 arg = string string = text to print as 1st line of output file   
title2 arg $=$ string string $=$ text to print as 2nd line of output file   
title3 arg $=$ string string $=$ text to print as 3rd line of output file, only for vector mode  

# 2.23.2 Examples  

fix 1 all ave/time 100 5 1000 c_myTemp c_thermo_temp file temp.profile   
fix 1 all ave/time 100 5 1000 c_thermo_press[2] ave window $20~\&$ title1 "My output values"   
fix 1 all ave/time 100 5 1000 c_thermo_press[\*]   
fix 1 all ave/time 1 100 1000 f_indent f_indent[1] file temp.indent off 1  

# 2.23.3 Description  

Use one or more global values as inputs every few time steps, and average them over longer timescales. The resulting averages can be used by other output commands such as thermo_style custom, and can also be written to a file. Note that if no time averaging is done, this command can be used as a convenient way to simply output one or more global values to a file.  

The group specified with this command is ignored. However, note that specified values may represent calculations performed by computes and fixes which store their own “group” definitions.  

Each listed value can be the result of a compute or $f\boldsymbol{{x}}$ or the evaluation of an equal-style or vector-style variable. In each case, the compute, fix, or variable must produce a global quantity, not a per-atom or local quantity. If you wish to spatial- or time-average or histogram per-atom quantities from a compute, fix, or variable, then see the fix ave/chunk, fix ave/atom, or fix ave/histo commands. If you wish to sum a per-atom quantity into a single global quantity, see the compute reduce command.  

Computes that produce global quantities are those which do not have the word atom in their style name. Only a few fixes produce global quantities. See the doc pages for individual fixes for info on which ones produce such values.  

Variables of style equal and vector are the only ones that can be used with this fix. Variables of style atom cannot be used, since they produce per-atom values.  

The input values must either be all scalars or all vectors depending on the setting of the mode keyword. In both cases, the averaging is performed independently on each input value (i.e., each input scalar is averaged independently or each element of each input vector is averaged independently).  

If mode $=$ scalar, then the input values must be scalars, or vectors with a bracketed term appended, indicating the $I^{\mathrm{th}}$ value of the vector is used.  

If mode $=$ vector, then the input values must be vectors, or arrays with a bracketed term appended, indicating the Ith column of the array is used. All vectors must be the same length, which is the length of the vector or number of rows in the array.  

For input values from a compute or fix or variable, the bracketed index I can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\rightarrow}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the size of the vector (for mode $=$ scalar) or the number of columns in the array (for mode $=\mathbf{V}\mathbf{e}$ ctor), then an asterisk with no numeric values means all indices from 1 to $N$ . A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from n to $N$ (inclusive). A middle asterisk means all indices from m to $\mathbf{n}$ (inclusive).  

Using a wildcard is the same as if the individual elements of the vector or columns of the array had been listed one by one. For example, the following two fix ave/time commands are equivalent, since the compute rdf command creates, in this case, a global array with three columns, each of length 50:  

compute myRDF all rdf 50 1 2   
fix 1 all ave/time 100 1 100 c_myRDF[\*] file tmp1.rdf mode vector   
fix 2 all ave/time 100 1 100 c_myRDF[1] c_myRDF[2] c_myRDF[3] file tmp2.rdf mode vector  

# Note  

For a vector-style variable, only the wildcard forms “\*n” or “m\*n” are allowed. You must specify the upper bound, because vector-style variable lengths are not determined until the variable is evaluated. If n is specified larger than the vector length turns out to be, zeroes are output for missing vector values.  

The $N_{\mathrm{every}}$ , $N_{\mathrm{repeat}}$ , and $N_{\mathrm{freq}}$ arguments specify on what time steps the input values will be used in order to contribute to the average. The final averaged quantities are generated on time steps that are a multiple of $N_{\mathrm{freq}}$ . The average is over $N_{\mathrm{repeat}}$ quantities, computed in the preceding portion of the simulation every $N_{\mathrm{every}}$ time steps. $N_{\mathrm{freq}}$ must be a multiple of $N_{\mathrm{every}}$ and $N_{\mathrm{every}}$ must be non-zero even if $N_{\mathrm{repeat}}=1$ . Also, the time steps contributing to the average value cannot overlap (i.e., $N_{\mathrm{repeat}}\times N_{\mathrm{every}}$ cannot exceed $N_{\mathrm{freq.}}$ ).  

For example, if $N_{\mathrm{every}}=2$ , $N_{\mathrm{repeat}}=6$ , and $N_{\mathrm{freq}}=100$ , then values on time steps 90, 92, 94, 96, 98, and 100 will be used to compute the final average on time step 100. Similarly for time steps 190, 192, 194, 196, 198, and 200 on time step 200, etc. If $N_{\mathrm{repeat}}=1$ and $N_{\mathrm{freq}}=100$ , then no time averaging is done; values are simply generated on time steps 100, 200, etc.  

If a value begins with $\begin{array}{c c}{{\leftarrow}}&{{,}}\ {{{\mathrm{~\small~{~c~}~}}_{-}}}&{{~}}\end{array}$ , a compute ID must follow which has been previously defined in the input script. If mode $=$ scalar, then if no bracketed term is appended, the global scalar calculated by the compute is used. If a bracketed term is appended, the Ith element of the global vector calculated by the compute is used. If mode $=$ vector, then if no bracketed term is appended, the global vector calculated by the compute is used. If a bracketed term is appended, the Ith column of the global array calculated by the compute is used. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

Note that there is a compute reduce command that can sum per-atom quantities into a global scalar or vector, which can then be accessed by fix ave/time. It can also be a compute defined not in your input script, but by thermodynamic output or other fixes such as fix nvt or fix temp/rescale. See the doc pages for these commands which give the IDs of these computes. Users can also write code for their own compute styles and add them to LAMMPS.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script. If mode $=$ scalar, then if no bracketed term is appended, the global scalar calculated by the fix is used. If a bracketed term is appended, the Ith element of the global vector calculated by the fix is used. If mode $=$ vector, then if no bracketed term is appended, the global vector calculated by the fix is used. If a bracketed term is appended, the Ith column of the global array calculated by the fix is used. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

Note that some fixes only produce their values on certain time steps, which must be compatible with Nevery, else an error will result. Users can also write code for their own fix styles and add them to LAMMPS.  

If a value begins with $\begin{array}{r}{\mathrm{~\boldmath~\tilde{~}{~\psi~}~}}\ {\mathrm{~\boldmath~V~}_{-}}\end{array}$ , a variable name must follow which has been previously defined in the input script. If mode $=$ scalar, then only equal-style or vector-style variables can be used, which both produce global values. In this mode, a vector-style variable requires a bracketed term to specify the Ith element of the vector calculated by the variable. If mode $=$ vector, then only a vector-style variable can be used, without a bracketed term. See the variable command for details.  

Note that variables of style equal and vector define a formula which can reference individual atom properties or thermodynamic keywords, or they can invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of specifying quantities to time average.  

Additional optional keywords also affect the operation of this fix.  

If the mode keyword is set to scalar, then all input values must be global scalars, or elements of global vectors. If the mode keyword is set to vector, then all input values must be global vectors, or columns of global arrays. They can also be global arrays, which are converted into a series of global vectors (one per column), as explained above.  

The ave keyword determines how the values produced every $N_{\mathrm{freq}}$ steps are averaged with values produced on previous steps that were multiples of $N_{\mathrm{freq}}$ , before they are accessed by another output command or written to a file.  

If the ave setting is one, then the values produced on time steps that are multiples of $N_{\mathrm{freq}}$ are independent of each other;   
they are output as-is without further averaging.  

If the ave setting is running, then the values produced on time steps that are multiples of $N_{\mathrm{freq}}$ are summed and averaged in a cumulative sense before being output. Each output value is thus the average of the value produced on that time step with all preceding values. This running average begins when the fix is defined; it can only be restarted by deleting the fix via the unfix command, or by re-defining the fix by re-specifying it.  

If the ave setting is window, then the values produced on time steps that are multiples of Nfreq are summed and averaged within a moving “window” of time, so that the last M values are used to produce the output. For example, if $M=3$ and $N_{\mathrm{freq}}=1000$ , then the output on step 10000 will be the average of the individual values on steps 8000, 9000, and 10000. Outputs on early steps will average over less than $M$ values if they are not available.  

The start keyword specifies what time step averaging will begin on. The default is step 0. Often input values can be 0.0 at time 0, so setting start to a larger value can avoid including a 0.0 in a running or windowed average.  

The off keyword can be used to flag any of the input values. If a value is flagged, it will not be time averaged. Instead the most recent input value will always be stored and output. This is useful if one of more of the inputs produced by a compute or fix or variable are effectively constant or are simply current values (e.g., they are being written to a file with other time-averaged values for purposes of creating well-formatted output).  

Added in version 17Apr2024: new keyword append  

The file or append keywords allow a filename to be specified. If file is used, then the filename is overwritten if it already exists. If append is used, then the filename is appended to if it already exists, or created if it does not exist. Every Nfreq steps, one quantity or vector of quantities is written to the file for each input value specified in the fix ave/time command. For mode $=$ scalar, this means a single line is written each time output is performed. Thus the file ends up to be a series of lines, i.e. one column of numbers for each input value. For mode $=$ vector, an array of numbers is written each time output is performed. The number of rows is the length of the input vectors, and the number of columns is the number of values. Thus the file ends up to be a series of these array sections.  

Added in version 4May2022.  

If the filename ends in ‘.yaml’ or ‘.yml’ then the output format conforms to the YAML standard which allows easy import that data into tools and scripts that support reading YAML files. The structured data Howto contains examples for parsing and plotting such data with very little programming effort in Python using the pyyaml, pandas, and matplotlib packages.  

The overwrite keyword will continuously overwrite the output file with the latest output, so that it only contains one time step worth of output. This option can only be used with the ave running setting.  

The format keyword sets the numeric format of each value when it is printed to a file via the file keyword. Note that all values are floating point quantities. The default format is $\%{\bf g}$ . You can specify a higher precision if desired (e.g., $\%20.16\mathrm{g})$ .  

The title1 and title2 and title3 keywords allow specification of the strings that will be printed as the first 2 or 3 lines of the output file, assuming the file keyword was used. LAMMPS uses default values for each of these, so they do not need to be specified.  

By default, these header lines are as follows for mode $=$ scalar:  

<html><body><table><tr><td> Time-averaged data for fix ID</td></tr></table></body></html>  

In the first line, ID is replaced with the fix-ID. In the second line the values are replaced with the appropriate fields from the fix ave/time command. There is no third line in the header of the file, so the title3 setting is ignored when mode $=$ scalar.  

By default, these header lines are as follows for mode $=$ vector:  

<html><body><table><tr><td></td><td>Time-averaged data for fix ID</td></tr><tr><td></td><td>TimeStep Number-of-rows</td></tr><tr><td></td><td></td></tr><tr><td># Row valuel value2</td><td></td></tr></table></body></html>  

In the first line, ID is replaced with the fix-ID. The second line describes the two values that are printed at the first of each section of output. In the third line the values are replaced with the appropriate fields from the fix ave/time command.  

# 2.23.4 Restart, fix_modify, output, run start/stop, minimize info  

Added in version 4May2022.  

No information about this fix is written to binary restart files. The fix_modify colname option can be used to change the name of the column in the output file. When writing a YAML format file this name will be in the list of keywords.  

This fix produces a global scalar or global vector or global array which can be accessed by various output commands.   
The values can only be accessed on time steps that are multiples of $N_{\mathrm{freq}}$ since that is when averaging is performed.  

A scalar is produced if only a single input value is averaged and mode $=$ scalar. A vector is produced if multiple input values are averaged for mode $=$ scalar, or a single input value for mode $=$ vector. In the first case, the length of the vector is the number of inputs. In the second case, the length of the vector is the same as the length of the input vector. An array is produced if multiple input values are averaged and mode $=$ vector. The global array has # of rows $=$ length of the input vectors and # of columns $=$ number of inputs.  

If the fix produces a scalar or vector, then the scalar and each element of the vector can be either “intensive” or “extensive”, depending on whether the values contributing to the scalar or vector element are “intensive” or “extensive”. If the fix produces an array, then all elements in the array must be the same, either “intensive” or “extensive”. If a compute or fix provides the value being time averaged, then the compute or fix determines whether the value is intensive or extensive; see the page for that compute or fix for further info. Values produced by a variable are treated as intensive.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.23.5 Restrictions  

none  

# 2.23.6 Related commands  

compute, fix ave/atom, fix ave/chunk, fix ave/histo, variable, fix ave/correlate,  

# 2.23.7 Default  

The option defaults are mode $=$ scalar, ave $=$ one, start $=0$ , no file output, format $=\mathrm{^{q}o g}$ , title $^{1,2,3=}$ strings as described above, and no off settings for any input values.  

# 2.24 fix aveforce command  

# 2.24.1 Syntax  

fix ID group-ID aveforce fx fy fz keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • aveforce $=$ style name of this fix command • fx,fy,fz $=$ force component values (force units)  

any of fx,fy,fz can be a variable (see below)  

• zero or more keyword/value pairs may be appended to args   
• keyword $=$ region region value $=$ region-ID region- $\mathrm{\cdotID}=\mathrm{ID}$ of region atoms must be in to have added force  

# 2.24.2 Examples  

<html><body><table><tr><td>fix pressdown topwall aveforce 0.0 -1.0 0.0</td></tr><tr><td>fix 2 bottomwall aveforce NULL -1.0 0.0 region 1top</td></tr><tr><td></td></tr><tr><td>fix 2 bottomwall aveforce NULL -1.0 v_oscillate region top</td></tr></table></body></html>  

# 2.24.3 Description  

Apply an additional external force to a group of atoms in such a way that every atom experiences the same force. This is useful for pushing on wall or boundary atoms so that the structure of the wall does not change over time.  

The existing force is averaged for the group of atoms, component by component. The actual force on each atom is then set to the average value plus the component specified in this command. This means each atom in the group receives the same force.  

# 2.24. fix aveforce command  

Any of the fx, fy, or fz values can be specified as NULL, which means the force in that dimension is not changed. Note that this is not the same as specifying a 0.0 value, since that sets all forces to the same average value without adding in any additional force.  

Any of the three quantities defining the force components, namely fx, $f y$ , and $f\boldsymbol{z}$ , can be specified as an equal-style variable. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the average force.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent average force.  

If the region keyword is used, the atom must also be in the specified geometric region in order to have force added to it.  

# 2.24.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is adding its forces. Default is the outermost level.  

This fix computes a global three-vector of forces, which can be accessed by various output commands. This is the total force on the group of atoms before the forces on individual atoms are changed by the fix. The vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command. You should not specify force components with a variable that has time-dependence for use with a minimizer, since the minimizer increments the timestep as the iteration count during the minimization.  

# 2.24.5 Restrictions  

none  

# 2.24.6 Related commands  

fix setforce, fix addforce  

# 2.24.7 Default  

none  

# 2.25 fix balance command  

# 2.25.1 Syntax  

fix ID group-ID balance Nfreq thresh style args keyword args ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• balance $=$ style name of this fix command   
• Nfreq $=$ perform dynamic load balancing every this many steps   
• thresh $=$ imbalance threshold that must be exceeded to perform a re-balance  

• style $=$ shift or rcb or report  

shift args $=$ dimstr Niter stopthresh dimstr $=$ sequence of letters containing x or y or z, each not more than once $\mathrm{Niter}=\#$ of times to iterate within each dimension of dimstr sequence stopthresh $=$ stop balancing when this imbalance threshold is reached   
rcb args $=$ none   
report args $=$ none  

• zero or more keyword/arg pairs may be appended • keyword $=$ weight or out  

weight style $\mathrm{args}=\mathrm{use}$ weighted particle counts for the balancing style $=$ group or neigh or time or var or store group args $=$ Ngroup group1 weight1 group2 weight2 ... Ngro $\mathrm{up}=1$ number of groups with assigned weights group1, group2, ... = group IDs weight1, weight2, ... = corresponding weight factors neigh factor $-$ compute weight based on number of neighbors factor = scaling factor ( $>0$ ) time factor = compute weight based on time spend computing factor $-$ scaling factor ( $>0$ ) var name = take weight from atom-style variable name = name of the atom-style variable store name = store weight in custom atom property defined by fix property/atom command name = atom property name (without $\mathrm{d}_{-}$ prefix)   
sort arg = no or yes   
out arg = filename   
filename $=$ write each processor's subdomain to a file, at each re-balancing  

# 2.25.2 Examples  

fix 2 all balance 1000 1.05 shift x 10 1.05   
fix 2 all balance 100 0.9 shift xy 20 1.1 out tmp.balance   
fix 2 all balance 100 0.9 shift xy 20 1.1 weight group 3 substrate 3.0 solvent 1.0 solute 0.8 out tmp.balance   
fix 2 all balance 100 1.0 shift x 10 1.1 weight time 0.8   
fix 2 all balance 100 1.0 shift xy 5 1.1 weight var myweight weight neigh 0.6 weight store allweight   
fix 2 all balance 1000 1.1 rcb  

# 2.25.3 Description  

This command adjusts the size and shape of processor subdomains within the simulation box, to attempt to balance the number of particles and thus the computational cost (load) evenly across processors. The load balancing is “dynamic” in the sense that re-balancing is performed periodically during the simulation. To perform “static” balancing, before or between runs, see the balance command.  

Added in version 17Apr2024.  

The report balance style only computes the load imbalance but does not attempt any re-balancing. This way the load imbalance information can be used otherwise, for instance for stopping a run with fix halt.  

Load-balancing is typically most useful if the particles in the simulation box have a spatially-varying density distribution or where the computational cost varies significantly between different atoms (e.g., a model of a vapor/liquid interface, or a solid with an irregular-shaped geometry containing void regions, or hybrid pair style simulations that combine pair styles with different computational cost). In these cases, the LAMMPS default of dividing the simulation box volume into a regular-spaced grid of 3d bricks, with one equal-volume subdomain per processor, may assign numbers  