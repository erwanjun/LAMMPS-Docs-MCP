---
title: "Angle Styles and Commands"
description: "angle_style, angle_write, atom_modify, atom_style commands reference"
category: "command"
tags: ["angle", "atom_style", "atom_modify", "topology"]
commands: ["angle_style", "angle_write", "atom_modify", "atom_style"]
---
• harmonic - harmonic angle   
• lepton - angle potential from evaluating a string   
• mesocnt - piecewise harmonic and linear angle for bending-buckling of nanotubes   
• mm3 - anharmonic angle   
• mwlc - meltable wormlike chain quartic - angle with cubic and quartic terms   
• spica - harmonic angle with repulsive SPICA pair style between 1-3 atoms   
• table - tabulated by angle  

# 1.2.4 Restrictions  

Angle styles can only be set for atom_styles that allow angles to be defined.  

Most angle styles are part of the MOLECULE package. They are only enabled if LAMMPS was built with that package See the Build package page for more info. The doc pages for individual bond potentials tell if it is part of a package.  

# 1.2.5 Related commands  

angle_coeff  

# 1.2.6 Default  

# 1.3 angle_write command  

# 1.3.1 Syntax  

potential function or otherwise debugging its values. The resulting file can also be used as input for use with angle style table.  

If the file already exists, the table of values is appended to the end of the file to allow multiple tables of energy and force to be included in one file. The individual sections may be identified by the keyword.  

The energy and force values are computed for angles ranging from 0 degrees to 180 degrees for 3 interacting atoms forming an angle type atype, using the appropriate angle_coeff coefficients. N evenly spaced angles are used.  

For example, for $\Nu=6$ , values are computed at $\theta=0,36,72,108,144,180.$  

The file is written in the format used as input for the angle_style table option with keyword as the section name. Each line written to the file lists an index number (1-N), an angle (in degrees), an energy (in energy units), and a force (in force units per radians $\wedge_{2}$ ). In case a new file is created, the first line will be a comment with a “DATE:” and “UNITS:” tag with the current date and units settings. For subsequent invocations of the angle_write command for the same file, data will be appended and the current units settings will be compared to the data from the header, if present. The angle_write will refuse to add a table to an existing file if the units are not the same.  

# 1.3.4 Restrictions  

All force field coefficients for angle and other kinds of interactions must be set before this command can be invoked.  

The table of the angle energy and force data data is created by using a separate, internally created, new LAMMPS instance with a dummy system of 3 atoms for which the angle potential energy is computed after transferring the angle style and coefficients and arranging the three atoms into the corresponding geometries. The angle force is then determined from the potential energies through numerical differentiation. As a consequence of this approach, not all angle styles are compatible. The following conditions must be met:  

• The angle style must be able to write its coefficients to a data file. This condition excludes for example angle style hybrid and angle style table.   
• The potential function must not have any terms that depend on geometry properties other than the angle. This condition excludes for example angle style class2 all angle types for angle style charmm that have non-zero Urey-Bradley terms. Please note that the write_angle command has no way of checking for this condition, so the resulting tables may be bogus if the requirement is not met. It is thus recommended to make careful tests for any created tables.  

# 1.3.5 Related commands  

angle_style table, bond_write, dihedral_write, angle_style, angle_coeff  

# 1.3.6 Default  

none  

# 1.4 atom_modify command  

# 1.4.1 Syntax  

atom_modify keyword values ..  

• one or more keyword/value pairs may be appended   
• keyword $=i d$ or map or first or sort id value $\mathrm{\Delta}=\mathrm{yes}$ or no map value $=$ yes or array or hash first value $=$ group-ID $=$ group whose atoms will appear first in internal atom lists  

# 1.4. atom_modify command  

sort values $=$ Nfreq binsize Nfreq $=$ sort atoms spatially every this many time steps binsize $=$ bin size for spatial sorting (distance units)  

# 1.4.2 Examples  

<html><body><table><tr><td>atom modify map yes</td></tr><tr><td>ohash sort 10000 2.0</td></tr><tr><td>atom modify map</td></tr><tr><td>atom_modify first colloid</td></tr></table></body></html>  

# 1.4.3 Description  

Modify certain attributes of atoms defined and stored within LAMMPS, in addition to what is specified by the atom_style command. The id and map keywords must be specified before a simulation box is defined; other keywords can be specified any time.  

The id keyword determines whether non-zero atom IDs can be assigned to each atom. If the value is yes, which is the default, IDs are assigned, whether you use the create atoms or read_data or read_restart commands to initialize atoms. If the value is no the IDs for all atoms are assumed to be 0.  

If atom IDs are used, they must all be positive integers. They should also be unique, though LAMMPS does not check for this. Typically they should also be consecutively numbered (from 1 to Natoms), though this is not required. Molecular atom styles are those that store bond topology information (styles bond, angle, molecular, full). These styles require atom IDs since the IDs are used to encode the topology. Some other LAMMPS commands also require the use of atom IDs. E.g. some many-body pair styles use them to avoid double computation of the I-J interaction between two atoms.  

The only reason not to use atom IDs is if you are running an atomic simulation so large that IDs cannot be uniquely assigned. For a default LAMMPS build this limit is 2^31 or about 2 billion atoms. However, even in this case, you can use 64-bit atom IDs, allowing $2^{\land}63$ or about 9e18 atoms, if you build LAMMPS with the - DLAMMPS_BIGBIG switch. This is described on the Build_settings doc page. If atom IDs are not used, they must be specified as 0 for all atoms, e.g. in a data or restart file.  

# Note  

If a triclinic simulation box is used, atom IDs are required, due to how neighbor lists are built.  

The map keyword determines how atoms with specific IDs are found when required. For example, the bond (angle, etc) methods need to find the local index of an atom with a specific global ID which is a bond (angle, etc) partner. LAMMPS performs this operation efficiently by creating a “map”, which is either an array or hash table, as described below.  

When the map keyword is not specified in your input script, LAMMPS only creates a map for atom_styles for molecular systems which have permanent bonds (angles, etc). No map is created for atomic systems, since it is normally not needed. However some LAMMPS commands require a map, even for atomic systems, and will generate an error if one does not exist. The map keyword thus allows you to force the creation of a map.  

Specifying a value of yes will create either an array-style or hash-style map, depending on the size of the system. If no atom ID is larger than 1 million, then an array-style map is used, otherwise a hash-style map is used. Specifying a value of array or hash creates an array-style or hash-style map respectively, regardless of the size of the system.  

For an array-style map, each processor stores a lookup table of length N, where N is the largest atom ID in the system. This is a fast, simple method for many simulations, but requires too much memory for large simulations. For a hashstyle map, a hash table is created on each processor, which finds an atom ID in constant time (independent of the global number of atom IDs). It can be slightly slower than the array map, but its memory cost is proportional to the number of atoms owned by a processor, i.e. N/P when $\mathbf{N}$ is the total number of atoms in the system and $\mathrm{\bfP}$ is the number of processors.  

The first keyword allows a group to be specified whose atoms will be maintained as the first atoms in each processor’s list of owned atoms. This in only useful when the specified group is a small fraction of all the atoms, and there are other operations LAMMPS is performing that will be sped-up significantly by being able to loop over the smaller set of atoms. Otherwise the reordering required by this option will be a net slow-down. The neigh_modify include and comm_modify group commands are two examples of commands that require this setting to work efficiently. Several fixes, most notably time integration fixes like fix nve, also take advantage of this setting if the group they operate on is the group specified by this command. Note that specifying “all” as the group-ID effectively turns off the first option.  

It is OK to use the first keyword with a group that has not yet been defined, e.g. to use the atom_modify first command at the beginning of your input script. LAMMPS does not use the group until a simulation is run.  

The sort keyword turns on a spatial sorting or reordering of atoms within each processor’s subdomain every Nfreq timesteps. If Nfreq is set to 0, then sorting is turned off. Sorting can improve cache performance and thus speed-up a LAMMPS simulation, as discussed in a paper by (Meloni). Its efficacy depends on the problem size (atoms/processor), how quickly the system becomes disordered, and various other factors. As a general rule, sorting is typically more effective at speeding up simulations of liquids as opposed to solids. In tests we have done, the speed-up can range from zero to $3{-}4\mathbf{X}$ .  

Reordering is performed every Nfreq timesteps during a dynamics run or iterations during a minimization. More precisely, reordering occurs at the first reneighboring that occurs after the target timestep. The reordering is performed locally by each processor, using bins of the specified binsize. If binsize is set to 0.0, then a binsize equal to half the neighbor cutoff distance (force cutoff plus skin distance) is used, which is a reasonable value. After the atoms have been binned, they are reordered so that atoms in the same bin are adjacent to each other in the processor’s 1d list of atoms.  

The goal of this procedure is for atoms to put atoms close to each other in the processor’s one-dimensional list of atoms that are also near to each other spatially. This can improve cache performance when pairwise interactions and neighbor lists are computed. Note that if bins are too small, there will be few atoms/bin. Likewise if bins are too large, there will be many atoms/bin. In both cases, the goal of cache locality will be undermined.  

# Note  

Running a simulation with sorting on versus off should not change the simulation results in a statistical sense. However, a different ordering will induce round-off differences, which will lead to diverging trajectories over time when comparing two simulations. Various commands, particularly those which use random numbers (e.g. velocity create, and fix langevin), may generate (statistically identical) results which depend on the order in which atoms are processed. The order of atoms in a dump file will also typically change if sorting is enabled.  

# Note  

When running simple pair-wise potentials like Lennard Jones on GPUs with the KOKKOS package, using a larger binsize (e.g. $2\mathbf{x}$ larger than default) and a more frequent reordering than default (e.g. every 100 time steps) may improve performance.  

# 1.4.4 Restrictions  

The first and sort options cannot be used together. Since sorting is on by default, it will be turned off if the first keyword is used with a group-ID that is not “all”.  

# 1.4.5 Related commands  

none  

# 1.4.6 Default  

By default, id is yes. By default, atomic systems (no bond topology info) do not use a map. For molecular systems (with bond topology info), the default is to use a map of either array or hash style depending on the size of the system, as explained above for the map yes keyword/value option. By default, a first group is not defined. By default, sorting is enabled with a frequency of 1000 and a binsize of 0.0, which means the neighbor cutoff will be used to set the bin size. If no neighbor cutoff is defined, sorting will be turned off.  

(Meloni) Meloni, Rosati and Colombo, J Chem Phys, 126, 121102 (2007).  

# 1.5 atom_style command  

# 1.5.1 Syntax  

atom_style style args  

• style $=$ amoeba or angle or atomic or body or bond or charge or dielectric or dipole or dpd or edpd or electron or ellipsoid or full or line or mdpd or molecular or oxdna or peri or smd or sph or sphere or bpm/sphere or spin or tdpd or tri or template or wavepacket or hybrid  

args $=$ none for any style except the following   
body args $=$ bstyle bstyle-args bstyle $=$ style of body particles bstyle-args $=$ additional arguments specific to the bstyle see the Howto body doc page for details sphere $\mathrm{arg}=0/1$ (optional) for static/dynamic particle radii bpm/sphere $\mathrm{arg}=0/1$ (optional) for static/dynamic particle radii tdpd arg = Nspecies Nspecies $=\#$ of chemical species template arg $=$ template-ID template- $\mathrm{ID}=\mathrm{ID}$ of molecule template specified in a separate molecule command hybrid args $=$ list of one or more sub-styles, each with their args  

• accelerated styles (with same args) $=$ angle/kk or atomic/kk or bond/kk or charge/kk or full/kk or molecular/kk or spin/kk  

# 1.5.2 Examples  

atom_style atomic   
atom_style bond   
atom_style full   
atom_style body nparticle 2 10   
atom_style hybrid charge bond   
atom_style hybrid charge body nparticle 2 5   
atom_style spin   
atom_style template myMols   
atom_style hybrid template twomols charge   
atom_style tdpd 2  

# 1.5.3 Description  

The atom_style command selects which per-atom attributes are associated with atoms in a LAMMPS simulation and thus stored and communicated with those atoms as well as read from and stored in data and restart files. Different models (e.g. pair styles) require access to specific per-atom attributes and thus require a specific atom style. For example, to compute Coulomb interactions, the atom must have a “charge” (aka “q”) attribute.  

A number of distinct atom styles exist that combine attributes. Some atom styles are a superset of other atom styles. Further attributes may be added to atoms either via using a hybrid style which provides a union of the attributes of the sub-styles, or via the fix property/atom command. The atom_style command must be used before a simulation is setup via a read_data, read_restart, or create_box command.  

![](images/1cf530c305619dfd9eb328f811decaee9f161630064ee6fe7f50fc716a6236b5.jpg)  

# Note  

Many of the atom styles discussed here are only enabled if LAMMPS was built with a specific package, as listed below in the Restrictions section.  

Once a style is selected and the simulation box defined, it cannot be changed but only augmented with the fix property/atom command. So one should select an atom style general enough to encompass all attributes required. E.g. with atom style bond, it is not possible to define angles and use angle styles.  

It is OK to use a style more general than needed, though it may be slightly inefficient because it will allocate and communicate additional unused data.  

# 1.5.4 Atom style attributes  

The atom style atomic has the minimum subset of per-atom attributes and is also the default setting. It encompasses the following per-atom attributes (name of the vector or array in the Atom class is given in parenthesis): atom-ID (tag), type (type), position $\mathbf{\rho}(\mathbf{x})$ , velocities (v), forces (f), image flags (image), group membership (mask). Since all atom styles are a superset of atom style atomic, they all include these attributes.  

This table lists all the available atom styles, which attributes they provide, which package is required to use them, and what the typical applications are that use them. See the read_data, create_atoms, and set commands for details on how to set these various quantities. More information about many of the styles is provided in the Additional Information section below.  

<html><body><table><tr><td>Atom style</td><td>Attributes</td><td>Required package</td><td>Applications</td></tr><tr><td>amoeba</td><td>full + "1-5 special neighbor data"</td><td>AMOEBA</td><td>AMOEBA/HIPPOforcefields</td></tr><tr><td>angle</td><td>bond + "angle data"</td><td>MOLECULE</td><td>bead-spring polymers with stiffness</td></tr><tr><td>atomic</td><td>tag, type, x, v, f, image, mask</td><td></td><td>atomic liquids, solids, metals</td></tr><tr><td>body</td><td>atomic + radius, rmass, angmom, torque, body</td><td>BODY</td><td>arbitrary bodies, see body howto</td></tr><tr><td>bond</td><td>atomic + molecule, nspecial, spe- cial + "bond data"</td><td>MOLECULE</td><td>bead-spring polymers</td></tr><tr><td>bpm/sphere</td><td>bond + radius, rmass, omega, torque, quat</td><td>BPM</td><td>granular bonded particle models, see BPMhowto</td></tr><tr><td>charge</td><td>b+ uo</td><td></td><td>atomic systems with charges</td></tr><tr><td>dielectric</td><td>full + mu, area, ed, em, epsilon, curvature, q_scaled</td><td>DIELECTRIC</td><td>systems with surface polarization</td></tr><tr><td>dipole</td><td>charge + mu</td><td>DIPOLE</td><td>atomic systems with charges and point dipoles</td></tr><tr><td>pdp</td><td>data"</td><td>DPD-REACT</td><td>reactive DPD</td></tr><tr><td>edpd electron</td><td>atomic + “eDPD data"</td><td>DPD-MESO</td><td>Energy conservative DPD (eDPD)</td></tr><tr><td></td><td>charge + espin, eradius, ervel, er- force</td><td>EFF</td><td>Electron force field systems</td></tr><tr><td>ellipsoid</td><td>atomic + rmass, angmom, torque, ellipsoid</td><td></td><td>aspherical particles</td></tr><tr><td>full</td><td>molecular +q</td><td>MOLECULE</td><td>molecular force fields</td></tr><tr><td>line</td><td>atomic + molecule, radius, rmass, omega, torque, line</td><td></td><td>2-d rigid body particles</td></tr><tr><td>mdpd</td><td>atomic + rho, drho, vest</td><td>DPD-MESO</td><td>Many-body DPD (mDPD)</td></tr><tr><td>molecular</td><td>do pue pu, + lu data"</td><td>MOLECULE</td><td>apolar and uncharged molecules</td></tr><tr><td>oxdna</td><td>atomic + id5p</td><td>CG-DNA</td><td>coarse-grained DNA and RNA models</td></tr><tr><td>peri smd</td><td>atomic + rmass, vfrac, s0, x0</td><td>PERI</td><td>mesoscopic Peridynamics models</td></tr><tr><td></td><td>atomic + molecule, radius, rmass + "smd data"</td><td>MACHDYN</td><td>Smooth Mach Dynamics models</td></tr><tr><td>rheo</td><td>atomic + rho, status</td><td>RHEO</td><td>solid and fuid RHEO particles</td></tr><tr><td>rheo/thermal</td><td>atomic + rho, status, energy, tem- perature</td><td>RHEO</td><td>RHEO particles with temperature</td></tr><tr><td>sph</td><td>ep yds, + ouoin</td><td>SPH</td><td>Smoothed particle hydrodynamics models</td></tr><tr><td>sphere</td><td>atomic + radius, rmass, omega, torque</td><td></td><td>finite size spherical particles, e.g. gran- ular models</td></tr><tr><td>spin</td><td>atomic “magnetic moment data'</td><td>SPIN</td><td>magnetic particles</td></tr><tr><td>tdpd</td><td>atomic + cc, cc_fux, vest</td><td>DPD-MESO</td><td>Transport DPD (tDPD)</td></tr><tr><td>template</td><td>atomic + molecule, molindex,</td><td>MOLECULE</td><td>molecular systems where attributes are</td></tr><tr><td>tri</td><td>molatom sphere + molecule, angmom, tri</td><td></td><td>taken from molecule files 3-d triangulated rigid body LJ particles</td></tr><tr><td>wavepacket</td><td>charge + "wavepacket data"</td><td>AWPMD</td><td>Antisymmetrized wave packet MD</td></tr></table></body></html>  

# Note  

It is possible to add some attributes, such as a molecule ID and charge, to atom styles that do not have them built in using the fix property/atom command. This command also allows new custom-named attributes consisting of  

extra integer or floating-point values or vectors to be added to atoms. See the fix property/atom page for examples of cases where this is useful and details on how to initialize, access, and output these custom values.  

# 1.5.5 Particle size and mass  

All of the atom styles define point particles unless they (1) define finite-size spherical particles via the radius attribute, or (2) define finite-size aspherical particles (e.g. the body, ellipsoid, line, and tri styles). Most of these styles can also be used with mixtures of point and finite-size particles.  

Note that the radius property may need to be provided as a diameter (e.g. in molecule files or data files). See the Howto spherical page for an overview of using finite-size spherical and aspherical particle models with LAMMPS.  

Unless an atom style defines the per-atom rmass attribute, particle masses are defined on a per-type basis, using the mass command. This means each particle’s mass is indexed by its atom type.  

A few styles define the per-atom rmass attribute which can also be added using the fix property/atom command. In this case each particle stores its own mass. Atom styles that have a per-atom rmass may define it indirectly through setting particle diameter and density on a per-particle basis. If both per-type mass and per-atom rmass are defined (e.g. in a hybrid style), the per-atom mass will take precedence in any operation which which works with both flavors of mass.  

# 1.5.6 Additional information about specific atom styles  

For the body style, the particles are arbitrary bodies with internal attributes defined by the “style” of the bodies, which is specified by the bstyle argument. Body particles can represent complex entities, such as surface meshes of discrete points, collections of sub-particles, deformable objects, etc.  

The Howto body page describes the body styles LAMMPS currently supports, and provides more details as to the kind of body particles they represent. For all styles, each body particle stores moments of inertia and a quaternion 4-vector, so that its orientation and position can be time integrated due to forces and torques.  

Note that there may be additional arguments required along with the bstyle specification, in the atom_style body command. These arguments are described on the Howto body doc page.  

For the dielectric style, each particle can be either a physical particle (e.g. an ion), or an interface particle representing a boundary element between two regions of different dielectric constant. For interface particles, in addition to the properties associated with atom_style full, each particle also should be assigned a unit dipole vector (mu) representing the direction of the induced dipole moment at each interface particle, an area (area/patch), the difference and mean of the dielectric constants of two sides of the interface along the direction of the normal vector (ed and em), the local dielectric constant at the boundary element (epsilon), and a mean local curvature (curv). Physical particles must be assigned these values, as well, but only their local dielectric constants will be used; see documentation for associated pair styles and fixes. The distinction between the physical and interface particles is only meaningful when fix polarize commands are applied to the interface particles. This style is part of the DIELECTRIC package.  

For the dipole style, a point dipole vector mu is defined for each point particle. Note that if you wish the particles to be finite-size spheres as in a Stockmayer potential for a dipolar fluid, so that the particles can rotate due to dipole-dipole interactions, then you need to use the command atom_style hybrid sphere dipole, which will assign both a diameter and dipole moment to each particle. This also requires using an integrator with a “/sphere” suffix like fix nve/sphere or fix nvt/sphere and the “update dipole” or “update dlm” parameters to the fix commands.  

The dpd style is for reactive dissipative particle dynamics (DPD) particles. Note that it is part of the DPD-REACT package, and is not required for use with the pair_style dpd or dpd/stat commands, which only require the attributes from atom_style atomic. Atom_style dpd extends DPD particle properties with internal temperature (dpdTheta), internal conductive energy (uCond), internal mechanical energy (uMech), and internal chemical energy (uChem).  

The edpd style is for energy-conserving dissipative particle dynamics (eDPD) particles which store a temperature (edpd_temp), and heat capacity (edpd_cv).  

For the electron style, the particles representing electrons are 3d Gaussians with a specified position and bandwidth or uncertainty in position, which is represented by the eradius $=$ electron size.  

For the ellipsoid style, particles can be ellipsoids which each stores a shape vector with the 3 diameters of the ellipsoid and a quaternion 4-vector with its orientation. Each particle stores a flag in the ellipsoid vector which indicates whether it is an ellipsoid (1) or a point particle (0).  

For the line style, particles can be are idealized line segments which store a per-particle mass and length and orientation (i.e. the end points of the line segment). Each particle stores a flag in the line vector which indicates whether it is a line segment (1) or a point particle (0).  

The mdpd style is for many-body dissipative particle dynamics (mDPD) particles which store a density (rho) for considering density-dependent many-body interactions.  

The oxdna style is for coarse-grained nucleotides and stores the $_3\cdot$ -to- $\cdot5^{\circ}$ polarity of the nucleotide strand, which is set through the bond topology in the data file. The first (second) atom in a bond definition is understood to point towards the $_3\cdot$ -end ( $\mho$ -end) of the strand.  

For the peri style, the particles are spherical and each stores a per-particle mass and volume.  

The smd style is for Smooth Particle Mach dynamics. Both fluids and solids can be modeled. Particles store the mass and volume of an integration point, a kernel diameter used for calculating the field variables (e.g. stress and deformation) and a contact radius for calculating repulsive forces which prevent individual physical bodies from penetrating each other.  

The sph style is for smoothed particle hydrodynamics (SPH) particles which store a density (rho), energy (esph), and heat capacity (cv).  

For the spin style, a magnetic spin is associated with each atom. Those spins have a norm (their magnetic moment) and a direction.  

The tdpd style is for transport dissipative particle dynamics (tDPD) particles which store a set of chemical concentration.   
An integer “cc_species” is required to specify the number of chemical species involved in a tDPD system.  

The wavepacket style is similar to the electron style, but the electrons may consist of several Gaussian wave packets, summed up with coefficients $\mathrm{cs}=\mathrm{(cs\_re,cs\_im)}$ . Each of the wave packets is treated as a separate particle in LAMMPS, wave packets belonging to the same electron must have identical etag values.  

The sphere and bpm/sphere styles allow particles to be either point particles or finite-size particles. If the radius attribute is $>0.0$ , the particle is a finite-size sphere. If the diameter $=0.0$ , it is a point particle. Note that by using the disc keyword with the fix nve/sphere, fix nvt/sphere, fix nph/sphere, fix npt/sphere commands for the sphere style, spheres can be effectively treated as 2d discs for a 2d simulation if desired. See also the set density/disc command. These styles also take an optional 0 or 1 argument. A value of 0 means the radius of each sphere is constant for the duration of the simulation (this is the default). A value of 1 means the radii may vary dynamically during the simulation, e.g. due to use of the fix adapt command.  

The template style allows molecular topology (bonds,angles,etc) to be defined via a molecule template using the molecule command. The template stores one or more molecules with a single copy of the topology info (bonds,angles,etc) of each. Individual atoms only store a template index and template atom to identify which molecule and which atom-within-the-molecule they represent. Using the template style instead of the bond, angle, molecular styles can save memory for systems comprised of a large number of small molecules, all of a single type (or small number of types). See the paper by Grime and Voth, in (Grime), for examples of how this can be advantageous for large-scale coarse-grained systems. The examples/template directory has a few demo inputs and examples showing the use of the template atom style versus molecular.  

![](images/88214f6492f2c0318b919711cbdf921b009102d2b8866e385e9bfd19fbfe79e5.jpg)  

# Note  

When using the template style with a molecule template that contains multiple molecules, you should ensure the atom types, bond types, angle_types, etc in all the molecules are consistent. E.g. if one molecule represents H2O and another CO2, then you probably do not want each molecule file to define two atom types and a single bond type, because they will conflict with each other when a mixture system of H2O and CO2 molecules is defined, e.g. by the read_data command. Rather the H2O molecule should define atom types 1 and 2, and bond type 1. And the CO2 molecule should define atom types 3 and 4 (or atom types 3 and 2 if a single oxygen type is desired), and bond type 2.  

For the tri style, particles can be planar triangles which each stores a per-particle mass and size and orientation (i.e. the corner points of the triangle). Each particle stores a flag in the tri vector which indicates whether it is a triangle (1) or a point particle (0).  

Typically, simulations require only a single (non-hybrid) atom style. If some atoms in the simulation do not have all the properties defined by a particular style, use the simplest style that defines all the needed properties by any atom. For example, if some atoms in a simulation are charged, but others are not, use the charge style. If some atoms have bonds, but others do not, use the bond style.  

The only scenario where the hybrid style is needed is if there is no single style which defines all needed properties of all atoms. For example, as mentioned above, if you want dipolar particles which will rotate due to torque, you need to use “atom_style hybrid sphere dipole”. When a hybrid style is used, atoms store and communicate the union of all quantities implied by the individual styles.  

When using the hybrid style, you cannot combine the template style with another molecular style that stores bond, angle, etc info on a per-atom basis.  

LAMMPS can be extended with new atom styles as well as new body styles; see the corresponding manual page on modifying & extending LAMMPS.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 1.5.7 Restrictions  

This command cannot be used after the simulation box is defined by a read_data or create_box command.  

Many of the styles listed above are only enabled if LAMMPS was built with a specific package, as listed below. See the Build package page for more info. The table above lists which package is required for individual atom styles.  

# 1.5.8 Related commands  

read_data, pair_style, fix property/atom, set  

# 1.5.9 Default  

The default atom style is atomic. If atom_style sphere or bpm/sphere is used, its default argument is 0.  

(Grime) Grime and Voth, to appear in J Chem Theory & Computation (2014).  

# 1.6 balance command  

# 1.6.1 Syntax  

balance thresh style args ... keyword args ...  

• thresh $=$ imbalance threshold that must be exceeded to perform a re-balance  

• one style/arg pair can be used (or multiple for $x,y,z$ )   
• style $=x$ or $y$ or $z$ or shift or rcb x args $=$ uniform or $\mathrm{Px}{-1}$ numbers between 0 and 1 uniform $=$ evenly spaced cuts between processors in x dimension numbers $=\mathrm{Px}{-}1$ ascending values between 0 and 1, Px - # of processors in x dimension x can be specified together with y or z y args $=$ uniform or Py-1 numbers between 0 and 1 uniform = evenly spaced cuts between processors in y dimension numbers = Py-1 ascending values between 0 and 1, Py - # of processors in y dimension y can be specified together with x or z $\mathrm{_{Z}}$ args = uniform or Pz-1 numbers between 0 and 1 uniform = evenly spaced cuts between processors in z dimension numbers = Pz-1 ascending values between 0 and 1, Pz - # of processors in z dimension z can be specified together with x or y shift args $=$ dimstr Niter stopthresh dimstr $=$ sequence of letters containing ${}^{11}\mathrm{x}^{11}$ or ${}^{11}\mathrm{y}^{11}$ or $"\mathbf{Z}"$ , each not more than once $\mathrm{Niter}=\#$ of times to iterate within each dimension of dimstr sequence stopthresh $=$ stop balancing when this imbalance threshold is reached rcb $\mathrm{args}=\mathrm{none}$   
• zero or more keyword/arg pairs may be appended   
• keyword $=$ weight or out weight style $\mathrm{args}=\mathrm{use}$ weighted particle counts for the balancing style $=$ group or neigh or time or var or store group args $=$ Ngroup group1 weight1 group2 weight2 ... Ngroup $=$ number of groups with assigned weights group1, group2, ... = group IDs weight1, weight2, ... = corresponding weight factors neigh factor $=$ compute weight based on number of neighbors factor = scaling factor $>0$ ) time factor $=$ compute weight based on time spend computing factor $=$ scaling factor $\mathrm{\Gamma}>0$ ) var name $=$ take weight from atom-style variable name $=$ name of the atom-style variable  

store name = store weight in custom atom property defined by fix property/atom command name $-$ atom property name (without $\mathrm{d}_{-}$ prefix) sort arg = no or yes out arg = filename filename $=$ write each processor's subdomain to a file  

# 1.6.2 Examples  

balance 0.9 x uniform y 0.4 0.5 0.6   
balance 1.2 shift xz 5 1.1   
balance 1.0 shift xz 5 1.1   
balance 1.1 rcb   
balance 1.0 shift x 10 1.1 weight group 2 fast 0.5 slow 2.0   
balance 1.0 shift x 10 1.1 weight time 0.8 weight neigh 0.5 weight store balance   
balance 1.0 shift x 20 1.0 out tmp.balance  

# 1.6.3 Description  

This command adjusts the size and shape of processor subdomains within the simulation box, to attempt to balance the number of atoms or particles and thus indirectly the computational cost (load) more evenly across processors. The load balancing is “static” in the sense that this command performs the balancing once, before or between simulations. The processor subdomains will then remain static during the subsequent run. To perform “dynamic” balancing, see the $f\alpha$ balance command, which can adjust processor subdomain sizes and shapes on-the-fly during a run.  

Load-balancing is typically most useful if the particles in the simulation box have a spatially-varying density distribution or when the computational cost varies significantly between different particles. E.g. a model of a vapor/liquid interface, or a solid with an irregular-shaped geometry containing void regions, or hybrid pair style simulations which combine pair styles with different computational cost. In these cases, the LAMMPS default of dividing the simulation box volume into a regular-spaced grid of 3d bricks, with one equal-volume subdomain per processor, may assign numbers of particles per processor in a way that the computational effort varies significantly. This can lead to poor performance when the simulation is run in parallel.  

The balancing can be performed with or without per-particle weighting. With no weighting, the balancing attempts to assign an equal number of particles to each processor. With weighting, the balancing attempts to assign an equal aggregate computational weight to each processor, which typically induces a different number of atoms assigned to each processor. Details on the various weighting options and examples for how they can be used are given below.  

Note that the processors command allows some control over how the box volume is split across processors. Specifically, for a $\mathrm{Px}$ by Py by $\mathrm{Pz}$ grid of processors, it allows choice of $\mathrm{Px}$ , Py, and $\mathrm{Pz}$ , subject to the constraint that $\mathrm{Px}*\mathrm{Py}*\mathrm{Pz}=$ P, the total number of processors. This is sufficient to achieve good load-balance for some problems on some processor counts. However, all the processor subdomains will still have the same shape and same volume.  

The requested load-balancing operation is only performed if the current “imbalance factor” in particles owned by each processor exceeds the specified thresh parameter. The imbalance factor is defined as the maximum number of particles (or weight) owned by any processor, divided by the average number of particles (or weight) per processor. Thus an imbalance factor of 1.0 is perfect balance.  

As an example, for 10000 particles running on 10 processors, if the most heavily loaded processor has 1200 particles, then the factor is 1.2, meaning there is a $20\%$ imbalance. Note that a re-balance can be forced even if the current balance is perfect (1.0) be specifying a thresh $<1.0$ .  

# Note  

Balancing is performed even if the imbalance factor does not exceed the thresh parameter if a “grid” style is specified when the current partitioning is “tiled”. The meaning of “grid” vs “tiled” is explained below. This is to allow forcing  

# 1.6. balance command  

of the partitioning to “grid” so that the comm_style brick command can then be used to replace a current comm_style tiled setting.  

When the balance command completes, it prints statistics about the result, including the change in the imbalance factor and the change in the maximum number of particles on any processor. For “grid” methods (defined below) that create a logical 3d grid of processors, the positions of all cutting planes in each of the 3 dimensions (as fractions of the box length) are also printed.  

![](images/d76e9ea00115b0aa0ac040b28beeed8b396ee8b97c33cde6d00b662f0f0d02ae.jpg)  

# Note  

This command attempts to minimize the imbalance factor, as defined above. But depending on the method a perfect balance (1.0) may not be achieved. For example, “grid” methods (defined below) that create a logical 3d grid cannot achieve perfect balance for many irregular distributions of particles. Likewise, if a portion of the system is a perfect lattice, e.g. the initial system is generated by the create_atoms command, then “grid” methods may be unable to achieve exact balance. This is because entire lattice planes will be owned or not owned by a single processor.  

![](images/05e1f8347ed767e6ddc8a875c5944ae28c5ea809a94809f6b29ca688b88a219d.jpg)  

# Note  

The imbalance factor is also an estimate of the maximum speed-up you can hope to achieve by running a perfectly balanced simulation versus an imbalanced one. In the example above, the 10000 particle simulation could run up to $20\%$ faster if it were perfectly balanced, versus when imbalanced. However, computational cost is not strictly proportional to particle count, and changing the relative size and shape of processor subdomains may lead to additional computational and communication overheads, e.g. in the PPPM solver used via the kspace_style command. Thus you should benchmark the run times of a simulation before and after balancing.  

The method used to perform a load balance is specified by one of the listed styles (or more in the case of $x,y,z$ ), which are described in detail below. There are 2 kinds of styles.  

The x, y, z, and shift styles are “grid” methods which produce a logical 3d grid of processors. They operate by changing the cutting planes (or lines) between processors in 3d (or 2d), to adjust the volume (area in 2d) assigned to each processor, as in the following 2d diagram where processor subdomains are shown and particles are colored by the processor that owns them.  

![](images/d58fff84e89e3298bbfda52bfd0a572c3ab754671d73b114ff35ad714a17eaa1.jpg)  

The leftmost diagram is the default partitioning of the simulation box across processors (one sub-box for each of 16 processors); the middle diagram is after a “grid” method has been applied. The $r c b$ style is a “tiling” method which does not produce a logical 3d grid of processors. Rather it tiles the simulation domain with rectangular sub-boxes of varying size and shape in an irregular fashion so as to have equal numbers of particles (or weight) in each sub-box, as in the rightmost diagram above.  

The “grid” methods can be used with either of the comm_style command options, brick or tiled. The “tiling” methods can only be used with comm_style tiled. Note that it can be useful to use a “grid” method with comm_style tiled to return the domain partitioning to a logical 3d grid of processors so that “comm_style brick” can afterwords be specified for subsequent run commands.  

When a “grid” method is specified, the current domain partitioning can be either a logical 3d grid or a tiled partitioning. In the former case, the current logical 3d grid is used as a starting point and changes are made to improve the imbalance factor. In the latter case, the tiled partitioning is discarded and a logical 3d grid is created with uniform spacing in all dimensions. This becomes the starting point for the balancing operation.  

When a “tiling” method is specified, the current domain partitioning (“grid” or “tiled”) is ignored, and a new partitioning is computed from scratch.  

The $x,y_{\mathrm{{;}}}$ , and $z$ styles invoke a “grid” method for balancing, as described above. Note that any or all of these 3 styles can be specified together, one after the other, but they cannot be used with any other style. This style adjusts the position of cutting planes between processor subdomains in specific dimensions. Only the specified dimensions are altered.  

The uniform argument spaces the planes evenly, as in the left diagrams above. The numeric argument requires listing Ps-1 numbers that specify the position of the cutting planes. This requires knowing $\mathrm{Ps}=\mathrm{Px}$ or Py or $\mathbf{Pz}=$ the number of processors assigned by LAMMPS to the relevant dimension. This assignment is made (and the $\mathrm{Px}$ , Py, $\mathrm{Pz}$ values printed out) when the simulation box is created by the “create_box” or “read_data” or “read_restart” command and is influenced by the settings of the processors command.  

Each of the numeric values must be between 0 and 1, and they must be listed in ascending order. They represent the fractional position of the cutting place. The left (or lower) edge of the box is 0.0, and the right (or upper) edge is 1.0. Neither of these values is specified. Only the interior Ps-1 positions are specified. Thus is there are 2 processors in the x dimension, you specify a single value such as 0.75, which would make the left processor’s subdomain $3\mathbf{x}$ larger than the right processor’s subdomain.  

The shift style invokes a “grid” method for balancing, as described above. It changes the positions of cutting planes between processors in an iterative fashion, seeking to reduce the imbalance factor, similar to how the fix balance shift command operates.  

The dimstr argument is a string of characters, each of which must be an “x” or “y” or “z”. Each character can appear zero or one time, since there is no advantage to balancing on a dimension more than once. You should normally only list dimensions where you expect there to be a density variation in the particles.  

Balancing proceeds by adjusting the cutting planes in each of the dimensions listed in dimstr, one dimension at a time. For a single dimension, the balancing operation (described below) is iterated on up to Niter times. After each dimension finishes, the imbalance factor is re-computed, and the balancing operation halts if the stopthresh criterion is met.  

A re-balance operation in a single dimension is performed using a recursive multisectioning algorithm, where the position of each cutting plane (line in 2d) in the dimension is adjusted independently. This is similar to a recursive bisectioning for a single value, except that the bounds used for each bisectioning take advantage of information from neighboring cuts if possible. At each iteration, the count of particles on either side of each plane is tallied. If the counts do not match the target value for the plane, the position of the cut is adjusted to be halfway between a low and high bound. The low and high bounds are adjusted on each iteration, using new count information, so that they become closer together over time. Thus as the recursion progresses, the count of particles on either side of the plane gets closer to the target value.  

After the balanced plane positions are determined, if any pair of adjacent planes are closer together than the neighbor skin distance (as specified by the neigh_modify command), then the plane positions are shifted to separate them by at  

# 1.6. balance command  

least this amount. This is to prevent particles being lost when dynamics are run with processor subdomains that are too narrow in one or more dimensions.  

Once the re-balancing is complete and final processor subdomains assigned, particles are migrated to their new owning processor, and the balance procedure ends.  

# $\Theta$ Note  

At each re-balance operation, the bisectioning for each cutting plane (line in 2d) typically starts with low and high bounds separated by the extent of a processor’s subdomain in one dimension. The size of this bracketing region shrinks by $1/2$ every iteration. Thus if Niter is specified as 10, the cutting plane will typically be positioned to 1 part in 1000 accuracy (relative to the perfect target position). For $N i t e r=20$ , it will be accurate to 1 part in a million. Thus there is no need to set Niter to a large value. LAMMPS will check if the threshold accuracy is reached (in a dimension) is less iterations than Niter and exit early. However, Niter should also not be set too small, since it will take roughly the same number of iterations to converge even if the cutting plane is initially close to the target value.  

The rcb style invokes a “tiled” method for balancing, as described above. It performs a recursive coordinate bisectioning (RCB) of the simulation domain. The basic idea is as follows.  

The simulation domain is cut into 2 boxes by an axis-aligned cut in one of the dimensions, leaving one new sub-box on either side of the cut. Which dimension is chosen for the cut depends on the particle (weight) distribution within the parent box. Normally the longest dimension of the box is cut, but if all (or most) of the particles are at one end of the box, a cut may be performed in another dimension to induce sub-boxes that are more cube-ish (3d) or square-ish (2d) in shape.  

After the cut is made, all the processors are also partitioned into 2 groups, half assigned to the box on the lower side of the cut, and half to the box on the upper side. (If the processor count is odd, one side gets an extra processor.) The cut is positioned so that the number of (weighted) particles in the lower box is exactly the number that the processors assigned to that box should own for load balance to be perfect. This also makes load balance for the upper box perfect. The positioning of the cut is done iteratively, by a bisectioning method (median search). Note that counting particles on either side of the cut requires communication between all processors at each iteration.  

That is the procedure for the first cut. Subsequent cuts are made recursively, in exactly the same manner. The subset of processors assigned to each box make a new cut in one dimension of that box, splitting the box, the subset of processors, and the particles in the box in two. The recursion continues until every processor is assigned a sub-box of the entire simulation domain, and owns the (weighted) particles in that sub-box.  

This subsection describes how to perform weighted load balancing using the weight keyword.  

By default, all particles have a weight of 1.0, which means each particle is assumed to require the same amount of computation during a timestep. There are, however, scenarios where this is not a good assumption. Measuring the computational cost for each particle accurately would be impractical and slow down the computation. Instead the weight keyword implements several ways to influence the per-particle weights empirically by properties readily available or using the user’s knowledge of the system. Note that the absolute value of the weights are not important; only their relative ratios affect which particle is assigned to which processor. A particle with a weight of 2.5 is assumed to require 5x more computational than a particle with a weight of 0.5. For all the options below the weight assigned to a particle must be a positive value; an error will be be generated if a weight is $<=0.0$ .  

Below is a list of possible weight options with a short description of their usage and some example scenarios where they might be applicable. It is possible to apply multiple weight flags and the weightings they induce will be combined through multiplication. Most of the time, however, it is sufficient to use just one method.  

The group weight style assigns weight factors to specified groups of particles. The group style keyword is followed by the number of groups, then pairs of group IDs and the corresponding weight factor. If a particle belongs to none of the specified groups, its weight is not changed. If it belongs to multiple groups, its weight is the product of the weight factors.  

This weight style is useful in combination with pair style hybrid, e.g. when combining a more costly many-body potential with a fast pairwise potential. It is also useful when using run_style respa where some portions of the system have many bonded interactions and others none. It assumes that the computational cost for each group remains constant over time. This is a purely empirical weighting, so a series test runs to tune the assigned weight factors for optimal performance is recommended.  

The neigh weight style assigns the same weight to each particle owned by a processor based on the total count of neighbors in the neighbor list owned by that processor. The motivation is that more neighbors means a higher computational cost. The style does not use neighbors per atom to assign a unique weight to each atom, because that value can vary depending on how the neighbor list is built.  

The factor setting is applied as an overall scale factor to the neigh weights which allows adjustment of their impact on the balancing operation. The specified factor value must be positive. A value $>1.0$ will increase the weights so that the ratio of max weight to min weight increases by factor. A value $<1.0$ will decrease the weights so that the ratio of max weight to min weight decreases by factor. In both cases the intermediate weight values increase/decrease proportionally as well. A value $=1.0$ has no effect on the neigh weights. As a rule of thumb, we have found a factor of about 0.8 often results in the best performance, since the number of neighbors is likely to overestimate the ideal weight.  

This weight style is useful for systems where there are different cutoffs used for different pairs of interactions, or the density fluctuates, or a large number of particles are in the vicinity of a wall, or a combination of these effects. If a simulation uses multiple neighbor lists, this weight style will use the first suitable neighbor list it finds. It will not request or compute a new list. A warning will be issued if there is no suitable neighbor list available or if it is not current, e.g. if the balance command is used before a run or minimize command is used, in which case the neighbor list may not yet have been built. In this case no weights are computed. Inserting a run 0 post no command before issuing the balance command, may be a workaround for this case, as it will induce the neighbor list to be built.  

The time weight style uses timer data to estimate weights. It assigns the same weight to each particle owned by a processor based on the total computational time spent by that processor. See details below on what time window is used. It uses the same timing information as is used for the MPI task timing breakdown, namely, for sections Pair, Bond, Kspace, and Neigh. The time spent in those portions of the timestep are measured for each MPI rank, summed, then divided by the number of particles owned by that processor. I.e. the weight is an effective CPU time/particle averaged over the particles on that processor.  

The factor setting is applied as an overall scale factor to the time weights which allows adjustment of their impact on the balancing operation. The specified factor value must be positive. A value $>1.0$ will increase the weights so that the ratio of max weight to min weight increases by factor. A value $<1.0$ will decrease the weights so that the ratio of max weight to min weight decreases by factor. In both cases the intermediate weight values increase/decrease proportionally as well. A value $=1.0$ has no effect on the time weights. As a rule of thumb, effective values to use are typically between 0.5 and 1.2. Note that the timer quantities mentioned above can be affected by communication which occurs in the middle of the operations, e.g. pair styles with intermediate exchange of data witin the force computation, and likewise for KSpace solves.  

When using the time weight style with the balance command, the timing data is taken from the preceding run command, i.e. the timings are for the entire previous run. For the fix balance command the timing data is for only the timesteps since the last balancing operation was performed. If timing information for the required sections is not available, e.g. at the beginning of a run, or when the timer command is set to either loop or off, a warning is issued. In this case no weights are computed.  

![](images/004a4fa49404ebd686092f3eb0931d70cc776c3e8e4231c1dc49eea69aba9b7a.jpg)  

# Note  

The time weight style is the most generic option, and should be tried first, unless the group style is easily applicable. However, since the computed cost function is averaged over all particles on a processor, the weights may not be highly accurate. This style can also be effective as a secondary weight in combination with either group or neigh to offset some of inaccuracies in either of those heuristics.  

The var weight style assigns per-particle weights by evaluating an atom-style variable specified by name. This is provided as a more flexible alternative to the group weight style, allowing definition of a more complex heuristics based on information (global and per atom) available inside of LAMMPS. For example, atom-style variables can reference the position of a particle, its velocity, the volume of its Voronoi cell, etc.  

The store weight style does not compute a weight factor. Instead it stores the current accumulated weights in a custom per-atom vector specified by name. This must be a vector defined as d_name via the fix property/atom command. This means the values in the vector can be read as part of a data file with the read_data command or specified with the set command. These weights can also be output in a dump file, so this is a way to examine, debug, or visualize the per-particle weights used during the load-balancing operation.  

Note that the name of the custom per-atom vector is specified just as name, not as d_name as it is for other commands that use different kinds of custom atom vectors or arrays as arguments.  

The sort keyword determines whether the communication of per-atom data to other processors during load-balancing will be random or deterministic. Random is generally faster; deterministic will ensure the new ordering of atoms on each processor is the same each time the same simulation is run. This can be useful for debugging purposes. Since the balance command is a one-time operation, the default is yes to perform sorting.  

The out keyword writes a text file to the specified filename with the results of the balancing operation. The file contains the bounds of the subdomain for each processor after the balancing operation completes. The format of the file is compatible with the Pizza.py mdump tool which has support for manipulating and visualizing mesh files. An example is shown here for a balancing by 4 processors for a 2d problem:  

<html><body><table><tr><td>ITEM: TIMESTEP</td></tr><tr><td>0</td></tr><tr><td>ITEM: NUMBER OF NODES</td></tr><tr><td>16</td></tr><tr><td>ITEM: BOX BOUNDS 0 10</td></tr><tr><td>010</td></tr><tr><td>010</td></tr><tr><td>ITEM: NODES</td></tr><tr><td>11000</td></tr><tr><td>21500</td></tr><tr><td>31550</td></tr><tr><td>41050</td></tr><tr><td>51500 611000</td></tr><tr><td>711050</td></tr><tr><td>81550</td></tr><tr><td>91050</td></tr><tr><td>101550</td></tr><tr><td>111510 0</td></tr><tr><td>12 110 5 0</td></tr><tr><td>131550</td></tr><tr><td></td></tr></table></body></html>  

(continued from previous page)  

14 1 10 5 0   
15 1 10 10 0   
16 1 5 10 0   
ITEM: TIMESTEP   
0   
ITEM: NUMBER OF SQUARES   
4   
ITEM: SQUARES   
1 1 1 2 3 4   
2 1 5 6 7 8   
3 1 9 10 11 12   
4 1 13 14 15 16  

The coordinates of all the vertices are listed in the NODES section, 5 per processor. Note that the 4 subdomains share vertices, so there will be duplicate nodes in the list.  

The “SQUARES” section lists the node IDs of the 4 vertices in a rectangle for each processor (1 to 4).  

For a 3d problem, the syntax is similar with 8 vertices listed for each processor, instead of 4, and “SQUARES” replaced by “CUBES”.  

# 1.6.4 Restrictions  

For 2d simulations, the z style cannot be used. Nor can a “z” appear in dimstr for the shift style. Balancing through recursive bisectioning ( $r c b$ style) requires comm_style tiled  

# 1.6.5 Related commands  

group, processors, fix balance, comm_style  

# 1.6.6 Default  

The default setting is sort $=$ yes.  

# 1.7 bond_coeff command  

# 1.7.1 Syntax  

(continued from previous page)  

labelmap bond 5 carbonyl bond_coeff carbonyl 80.0 1.2  

# 1.7.3 Description  

Specify the bond force field coefficients for one or more bond types. The number and meaning of the coefficients depends on the bond style. Bond coefficients can also be set in the data file read by the read_data command or in a restart file.  

$N$ can be specified in one of several ways. An explicit numeric value can be used, as in the first example above. Or $N$ can be a type label, which is an alphanumeric string defined by the labelmap command or in a section of a data file read by the read_data command.  

For numeric values only, a wild-card asterisk can be used to set the coefficients for multiple bond types. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $\mathbf{\tilde{\Omega}}^{6}\mathbf{\tilde{n}}^{*}{\mathbf{\tilde{\Omega}}}^{,}$ or $\overline{{\mathfrak{m}}}^{*}\mathfrak{n}^{,}$ . If $N$ is the number of bond types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

Note that using a bond_coeff command can override a previous setting for the same bond type. For example, these commands set the coeffs for all bond types, then overwrite the coeffs for just bond type 2:  

bond_coeff \* 100.0 1.2   
bond_coeff 2 200.0 1.2  

A line in a data file that specifies bond coefficients uses the exact same format as the arguments of the bond_coeff command in an input script, except that wild-card asterisks should not be used since coefficients for all $N$ types must be listed in the file. For example, under the “Bond Coeffs” section of a data file, the line that corresponds to the first example above would be listed as  

# 1.8 bond_style command  

# 1.8.1 Syntax  

bond_style style args  

• style $=$ none or zero or hybrid or bpm/rotational or bpm/spring or class2 or fene or fene/expand or fene/nm or gaussian or gromos or harmonic or harmonic/restrain harmonic/shift or harmonic/shift/cut or lepton or morse or nonlinear or oxdna/fene or oxdena2/fene or oxrna2/fene or quartic or special or table   
• args $=$ none for any style except hybrid – hybrid args $=$ list of one or more styles  

# 1.8.2 Examples  

<html><body><table><tr><td>bond style</td><td>harmonic</td></tr><tr><td>bond  style</td><td>fene</td></tr><tr><td>bond_style</td><td> hybrid harmonic fene</td></tr></table></body></html>  

# 1.8.3 Description  

Set the formula(s) LAMMPS uses to compute bond interactions between pairs of atoms. In LAMMPS, a bond differs from a pairwise interaction, which are set via the pair_style command. Bonds are defined between specified pairs of atoms and remain in force for the duration of the simulation (unless new bonds are created or existing bonds break, which is possible in some fixes and bond potentials). The list of bonded atoms is read in by a read_data or read_restart command from a data or restart file. By contrast, pair potentials are typically defined between all pairs of atoms within a cutoff distance and the set of active interactions changes over time.  

Hybrid models where bonds are computed using different bond potentials can be setup using the hybrid bond style.  

The coefficients associated with a bond style can be specified in a data or restart file or via the bond_coeff command.  

All bond potentials store their coefficient data in binary restart files which means bond_style and bond_coeff commands do not need to be re-specified in an input script that restarts a simulation. See the read_restart command for details on how to do this. The one exception is that bond_style hybrid only stores the list of sub-styles in the restart file; bond coefficients need to be re-specified.  

![](images/fbd361091db33cce2e64d85d3bbb3e81e4fa3678dadbc05c8d94243d5537f2be.jpg)  

# Note  

When both a bond and pair style is defined, the special_bonds command often needs to be used to turn off (or weight) the pairwise interaction that would otherwise exist between two bonded atoms.  

In the formulas listed for each bond style, $r$ is the distance between the two atoms in the bond.  

Here is an alphabetic list of bond styles defined in LAMMPS. Click on the style to display the formula it computes and coefficients specified by the associated bond_coeff command.  

Click on the style to display the formula it computes, any additional arguments specified in the bond_style command, and coefficients specified by the associated bond_coeff command.  

There are also additional accelerated pair styles included in the LAMMPS distribution for faster performance on CPUs, GPUs, and KNLs. The individual style names on the Commands bond doc page are followed by one or more of (g,i,k,o,t) to indicate which accelerated styles exist.  

# 1.8. bond_style command  

• none - turn off bonded interactions   
• zero - topology but no interactions   
• hybrid - define multiple styles of bond interactions   
• bpm/rotational - breakable bond with forces and torques based on deviation from reference state   
• bpm/spring - breakable bond with forces based on deviation from reference length   
• class2 - COMPASS (class 2) bond   
• fene - FENE (finite-extensible non-linear elastic) bond   
• fene/expand - FENE bonds with variable size particles   
• fene/nm - FENE bonds with a generalized Lennard-Jones potential   
• gaussian - multicentered Gaussian-based bond potential   
• gromos - GROMOS force field bond   
• harmonic - harmonic bond   
• harmonic/restrain - harmonic bond to restrain to original bond distance   
• harmonic/shift - shifted harmonic bond   
• harmonic/shift/cut - shifted harmonic bond with a cutoff   
• lepton - bond potential from evaluating a string   
• mesocnt - Harmonic bond wrapper with parameterization presets for nanotubes   
• mm3 - MM3 anharmonic bond   
• morse - Morse bond   
• nonlinear - nonlinear bond   
• oxdna/fene - modified FENE bond suitable for DNA modeling   
• oxdna2/fene - same as oxdna but used with different pair styles   
• oxrna2/fene - modified FENE bond suitable for RNA modeling   
• quartic - breakable quartic bond   
• rheo/shell - shell bond for oxidation modeling in RHEO   
• special - enable special bond exclusions for 1-5 pairs and beyond   
• table - tabulated by bond length  

# 1.8.4 Restrictions  

Bond styles can only be set for atom styles that allow bonds to be defined.  

Most bond styles are part of the MOLECULE package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info. The doc pages for individual bond potentials tell if it is part of a package.  

# 1.8.5 Related commands  

bond_coeff , delete_bonds  

# 1.8.6 Default  

# 1.9 bond_write command  

# 1.9.1 Syntax  

<html><body><table><tr><td>bond write btype N inner outer file keyword itype jtype</td></tr></table></body></html>  

• btype $=$ bond type   
• $\Nu=\#$ of values   
• inner,outer $=$ inner and outer bond length (distance units)   
• file $=$ name of file to write values to   
• keyword $=$ section name in file for this set of tabulated values   
• itype,jtype $=$ two atom types (optional)  

# 1.9.2 Examples  

<html><body><table><tr><td>bond write 1 500 0.5 3.5 table.txt Harmonic 1 bond write 3 1000 0.1 6.0 table.txt Morse</td></tr></table></body></html>  

# 1.9.3 Description  

Write energy and force values to a file as a function of distance for the currently defined bond style for a selected bond type. This is useful for plotting the potential function or otherwise debugging its values. The resulting file can also be used as input for use with bond style table.  

If the file already exists, the table of values is appended to the end of the file to allow multiple tables of energy and force to be included in one file. The individual sections may be identified by the keyword.  

The energy and force values are computed at distances from inner to outer for two interacting atoms forming a bond of type btype, using the appropriate bond_coeff coefficients. N evenly spaced distances are used.  

For example, for $\Nu=7$ , inner $=1.0$ , and outer $=4.0$ , values are computed at $\mathrm{r}=1.0$ , 1.5, 2.0, 2.5, 3.0, 3.5, 4.0.  

The file is written in the format used as input for the bond_style table option with keyword as the section name. Each line written to the file lists an index number (1-N), a distance (in distance units), an energy (in energy units), and a force (in force units). In case a new file is created, the first line will be a comment with a “DATE:” and “UNITS:” tag with the current date and units settings. For subsequent invocations of the bond_write command for the same file, data will be appended and the current units settings will be compared to the data from the header, if present. The bond_write command will refuse to add a table to an existing file if the units are not the same.  

# 1.9.4 Restrictions  

All force field coefficients for bond and other kinds of interactions must be set before this command can be invoked.  

Due to how the bond force is computed, an inner value $>0.0$ must be specified even if the potential has a finite value at $\mathrm{r}=0.0$ .  

# 1.9.5 Related commands  

bond_style table, angle_write, bond_style, bond_coeff  

# 1.9.6 Default  

none  

# 1.10 boundary command  

# 1.10.1 Syntax  

• $\mathbf{x},\mathbf{y},\mathbf{z}=p$ or $s$ or $f$ or $m$ , one or two letters  

p is periodic   
f is non-periodic and fixed   
s is non-periodic and shrink-wrapped   
m is non-periodic and shrink-wrapped with a minimum value  

# 1.10.2 Examples  

<html><body><table><tr><td>boundary p p f</td></tr><tr><td>boundary p fs p</td></tr><tr><td></td></tr><tr><td>boundary s f fm</td></tr></table></body></html>  

# 1.10.3 Description  

Set the style of boundaries for the global simulation box in each dimension. A single letter assigns the same style to both the lower and upper face of the box. Two letters assigns the first style to the lower face and the second style to the upper face. The initial size of the simulation box is set by the read_data, read_restart, or create_box commands.  

The style $p$ means the box is periodic, so that particles interact across the boundary, and they can exit one end of the box and re-enter the other end. A periodic dimension can change in size due to constant pressure boundary conditions or box deformation (see the fix npt and fix deform commands). The $p$ style must be applied to both faces of a dimension. For 2d simulations the z dimension must be periodic (which is the default).  

The styles $f,s,$ , and $m$ mean the box is non-periodic, so that particles do not interact across the boundary and do not move from one side of the box to the other.  

For style $f,$ the position of the face is fixed. If an atom moves outside the face it will be deleted on the next timestep that reneighboring occurs. This will typically generate an error unless you have set the thermo_modify lost option to allow for lost atoms.  

For style $s$ , the position of the face is set so as to encompass the atoms in that dimension (shrink-wrapping), no matter how far they move. Note that when the difference between the current box dimensions and the shrink-wrap box dimensions is large, this can lead to lost atoms at the beginning of a run when running in parallel. This is due to the large change in the (global) box dimensions also causing significant changes in the individual subdomain sizes. If these changes are farther than the communication cutoff, atoms will be lost. This is best addressed by setting initial box dimensions to match the shrink-wrapped dimensions more closely, by using $m$ style boundaries (see below).  

For style $m$ , shrink-wrapping occurs, but is bounded by the value specified in the data or restart file or set by the create_box command. For example, if the upper z face has a value of 50.0 in the data file, the face will always be positioned at 50.0 or above, even if the maximum z-extent of all the atoms becomes less than 50.0. This can be useful if you start a simulation with an empty box or if you wish to leave room on one side of the box, e.g. for atoms to evaporate from a surface.  

LAMMPS also allows use of triclinic (non-orthogonal) simulation boxes. See the Howto triclinic page for a description of both general and restricted triclinic boxes and how to define them. General triclinic boxes (arbitrary edge vectors A, B, and C) are converted internally to restricted triclinic boxes with tilt factors (xy,xz,yz) which skew an otherwise orthogonal box.  

The boundary <boundary> command settings explained above for the 6 faces of an orthogonal box also apply in similar manner to the 6 faces of a restricted triclinic box (and thus to the corresponding 6 faces of a general triclinic box), with the following context.  

if the second dimension of a tilt factor (e.g. y for xy) is periodic, then the periodicity is enforced with the tilt factor offset. This means that for y periodicity a particle which exits the lower y boundary is displaced in the $\mathbf{X}$ -direction by xy before it re-enters the upper y boundary. And vice versa if a particle exits the upper y boundary. Likewise the ghost atoms surrounding a particle near the lower y boundary include images of particles near the upper y-boundary which are displaced in the $\mathbf{X}$ -direction by xy. Similar rules apply for z-periodicity and the xz and/or yz tilt factors.  

If the first dimension of a tilt factor is shrink-wrapped, then the shrink wrapping is applied to the tilted box face, to encompass the atoms. E.g. for a positive xy tilt, the xlo and xhi faces of the box are planes tilting in the $+\mathrm{y}$ direction as y increases. The position of these tilted planes are adjusted dynamically to shrink-wrap around the atoms to determine the xlo and xhi extents of the box.  

# 1.10.4 Restrictions  

This command cannot be used after the simulation box is defined by a read_data or create_box command or read_restart command. See the change_box command for how to change the simulation box boundaries after it has been defined.  

For 2d simulations, the z dimension must be periodic.  

# 1.10.5 Related commands  

See the thermo_modify command for a discussion of lost atoms.  

# 1.10.6 Default  

scale values $=$ factor factor $=$ multiplicative factor for change in box length after displacement volume value $=$ none = adjust this dim to preserve volume of system   
xy, xz, yz args $=$ style value style $=$ final or delta final value = tilt tilt = tilt factor after displacement (distance units) delta value = dtilt dtilt = change in tilt factor after displacement (distance units)   
boundary args = x y z x,y,z = p or s or f or m, one or two letters p is periodic f is non-periodic and fixed s is non-periodic and shrink-wrapped m is non-periodic and shrink-wrapped with a minimum value   
ortho $\mathrm{args}=\mathrm{none}={}$ change box to orthogonal   
triclinic $\mathrm{args}=\mathrm{none}=0$ hange box to triclinic   
set $\mathrm{args=none=s}$ tore state of current box   
remap args = none $=$ remap atom coords from last saved state to current box  

• zero or more keyword/value pairs may be appended  

• keyword $=$ units  

units value $=$ lattice or box lattice $=$ distances are defined in lattice units box $=$ distances are defined in simulation box units  

# 1.11.2 Examples  

change_box all xy final $-2.0~\mathrm{z}$ final 0.0 5.0 boundary p p f remap units box change_box all x scale 1.1 y volume z volume remap  

# 1.11.3 Description  

Change the volume and/or shape and/or boundary conditions for the simulation box. Orthogonal simulation boxes have 3 adjustable size parameters (x,y,z). Triclinic (non-orthogonal) simulation boxes have 6 adjustable size/shape parameters (x,y,z,xy,xz,yz). Any or all of them can be adjusted independently by this command. Thus it can be used to expand or contract a box, or to apply a shear strain to a non-orthogonal box. It can also be used to change the boundary conditions for the simulation box, similar to the boundary command.  

The size and shape of the initial simulation box are specified by the create_box or read_data or read_restart command used to setup the simulation. The size and shape may be altered by subsequent runs, e.g. by use of the fix npt or fix deform commands. The create_box, read data, and read_restart commands also determine whether the simulation box is orthogonal or triclinic and their doc pages explain the meaning of the xy,xz,yz tilt factors.  

See the Howto triclinic page for a geometric description of triclinic boxes, as defined by LAMMPS, and how to transform these parameters to and from other commonly used triclinic representations.  

The keywords used in this command are applied sequentially to the simulation box and the atoms in it, in the orde specified.  

Before the sequence of keywords are invoked, the current box size/shape is stored, in case a remap keyword is used to map the atom coordinates from a previously stored box size/shape to the current one.  

After all the keywords have been processed, any shrink-wrap boundary conditions are invoked (see the boundary command) which may change simulation box boundaries, and atoms are migrated to new owning processors.  

# Note  

This means that you cannot use the change_box command to enlarge a shrink-wrapped box, e.g. to make room to insert more atoms via the create_atoms command, because the simulation box will be re-shrink-wrapped before the change_box command completes. Instead you could do something like this, assuming the simulation box is non-periodic and atoms extend from 0 to 20 in all dimensions:  

change_box all x final -10 20   
create_atoms 1 single -5 5 5 # this will fail to insert an atom   
change_box all x final -10 20 boundary f s s   
create_atoms 1 single -5 5 5   
change_box all boundary s s s # this will work  

![](images/64128eae457a5b821cd8f1d1b782da4b4ff5f615217fe33d9818ce1dca1d7f71.jpg)  

# Note  

Unlike the earlier “displace_box” version of this command, atom remapping is NOT performed by default. This command allows remapping to be done in a more general way, exactly when you specify it (zero or more times) in the sequence of transformations. Thus if you do not use the remap keyword, atom coordinates will not be changed even if the box size/shape changes. If a uniformly strained state is desired, the remap keyword should be specified.  

# Note  

It is possible to lose atoms with this command. E.g. by changing the box without remapping the atoms, and having atoms end up outside of non-periodic boundaries. It is also possible to alter bonds between atoms straddling a boundary in bad ways. E.g. by converting a boundary from periodic to non-periodic. It is also possible when remapping atoms to put them (nearly) on top of each other. E.g. by converting a boundary from non-periodic to periodic. All of these will typically lead to bad dynamics and/or generate error messages.  

# Note  

The simulation box size/shape can be changed by arbitrarily large amounts by this command. This is not a problem, except that the mapping of processors to the simulation box is not changed from its initial 3d configuration; see the processors command. Thus, if the box size/shape changes dramatically, the mapping of processors to the simulation box may not end up as optimal as the initial mapping attempted to be. You may wish to re-balance the atoms by using the balance command if that is the case.  

# Note  

You cannot use this command after reading a restart file (and before a run is performed) if the restart file stored peratom information from a fix and any of the specified keywords change the box size or shape or boundary conditions. This is because atoms may be moved to new processors and the restart info will not migrate with them. LAMMPS will generate an error if this could happen. Only the ortho and triclinic keywords do not trigger this error. One solution is to perform a “run $0^{\circ}$ command before using the change_box command. This clears the per-atom restart data, whether it has been re-assigned to a new fix or not.  

![](images/29cfb49664e2367aaf82e02ab2a102faa65e6681711bdc752efc66bbfab9ab30.jpg)  

# Note  

Because the keywords used in this command are applied one at a time to the simulation box and the atoms in it, care must be taken with triclinic cells to avoid exceeding the limits on skew after each transformation in the sequence. If skew is exceeded before the final transformation this can be avoided by changing the order of the sequence, or breaking the transformation into two or more smaller transformations. For more information on the allowed limits for box skew see the discussion on triclinic boxes on Howto triclinic doc page.  

For the $x,y,$ , and $z$ parameters, this is the meaning of their styles and values.  

For style final, the final lo and hi box boundaries of a dimension are specified. The values can be in lattice or box distance units. See the discussion of the units keyword below.  

For style delta, plus or minus changes in the lo/hi box boundaries of a dimension are specified. The values can be in lattice or box distance units. See the discussion of the units keyword below.  

For style scale, a multiplicative factor to apply to the box length of a dimension is specified. For example, if the initial box length is 10, and the factor is 1.1, then the final box length will be 11. A factor less than 1.0 means compression.  

The volume style changes the specified dimension in such a way that the overall box volume remains constant with respect to the operation performed by the preceding keyword. The volume style can only be used following a keyword that changed the volume, which is any of the $x$ , y, z keywords. If the preceding keyword “key” had a volume style, then both it and the current keyword apply to the keyword preceding “key”. I.e. this sequence of keywords is allowed:  

change_box all x scale 1.1 y volume z volume  

The volume style changes the associated dimension so that the overall box volume is unchanged relative to its value before the preceding keyword was invoked.  

If the following command is used, then the z box length will shrink by the same 1.1 factor the x box length was increased by:  

For the $x y,x z$ , and yz parameters, this is the meaning of their styles and values. Note that changing the tilt factors of a triclinic box does not change its volume.  

For style final, the final tilt factor is specified. The value can be in lattice or box distance units. See the discussion of the units keyword below.  

For style delta, a plus or minus change in the tilt factor is specified. The value can be in lattice or box distance units.   
See the discussion of the units keyword below.  

All of these styles change the xy, xz, yz tilt factors. In LAMMPS, tilt factors (xy,xz,yz) for triclinic boxes are required to be no more than half the distance of the parallel box length. For example, if $\mathrm{xlo}=2$ and $\mathrm{xhi}=12$ , then the x box length is 10 and the xy tilt factor must be between -5 and 5. Similarly, both xz and yz must be between -(xhi-xlo)/2 and $+(\mathrm{yhi-ylo})/2$ . Note that this is not a limitation, since if the maximum tilt factor is 5 (as in this example), then configurations with $\mathrm{tilt}=\dots,-15,-5,5,15,25,\dots$ are all equivalent. Any tilt factor specified by this command must be within these limits.  

The boundary keyword takes arguments that have exactly the same meaning as they do for the boundary command. In each dimension, a single letter assigns the same style to both the lower and upper face of the box. Two letters assigns the first style to the lower face and the second style to the upper face.  

The style $p$ means the box is periodic; the other styles mean non-periodic. For style $f,$ the position of the face is fixed. For style $s$ , the position of the face is set so as to encompass the atoms in that dimension (shrink-wrapping), no matter how far they move. For style $m$ , shrink-wrapping occurs, but is bounded by the current box edge in that dimension, so that the box will become no smaller. See the boundary command for more explanation of these style options.  

Note that the “boundary” command itself can only be used before the simulation box is defined via a read_data or create_box or read_restart command. This command allows the boundary conditions to be changed later in your input script. Also note that the read_restart will change boundary conditions to match what is stored in the restart file. So if you wish to change them, you should use the change_box command after the read_restart command.  

![](images/8867ae1c103d53fa365c1564cdbf566d3286c0b382f60eea27f416bc967ca6ee.jpg)  

# Note  

Changing a periodic boundary to a non-periodic one will also cause the image flag for that dimension of all atoms to be reset to 0. LAMMPS will print a warning message, if that happens. Please note that this reset can lead to undesired changes when atoms are involved in bonded interactions that straddle periodic boundaries and thus the values of the image flag differs for those atoms.  

The ortho and triclinic keywords convert the simulation box to be orthogonal or triclinic (non-orthogonal).  

The simulation box is defined as either orthogonal or triclinic when it is created via the create_box, read_data, or read_restart commands.  

These keywords allow you to toggle the existing simulation box from orthogonal to triclinic and vice versa. For example, an initial equilibration simulation can be run in an orthogonal box, the box can be toggled to triclinic, and then a nonequilibrium MD (NEMD) simulation can be run with deformation via the fix deform command.  

If the simulation box is currently triclinic and has non-zero tilt in xy, yz, or xz, then it cannot be converted to an orthogonal box.  

The set keyword saves the current box size/shape. This can be useful if you wish to use the remap keyword more than once or if you wish it to be applied to an intermediate box size/shape in a sequence of keyword operations. Note that the box size/shape is saved before any of the keywords are processed, i.e. the box size/shape at the time the create_box command is encountered in the input script.  

The remap keyword remaps atom coordinates from the last saved box size/shape to the current box state. For example, if you stretch the box in the $\mathbf{X}$ dimension or tilt it in the xy plane via the $x$ and $x y$ keywords, then the remap command will dilate or tilt the atoms to conform to the new box size/shape, as if the atoms moved with the box as it deformed.  

Note that this operation is performed without regard to periodic boundaries. Also, any shrink-wrapping of non-periodic boundaries (see the boundary command) occurs after all keywords, including this one, have been processed.  

Only atoms in the specified group are remapped.  

The units keyword determines the meaning of the distance units used to define various arguments. A box value selects standard distance units as defined by the units command, e.g. Angstroms for units $=$ real or metal. A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacing.  

# 1.11.4 Restrictions  

If you use the ortho or triclinic keywords, then at the point in the input script when this command is issued, no dumps can be active, nor can a fix deform be active. This is because these commands test whether the simulation box is orthogonal when they are first issued. Note that these commands can be used in your script before a change_box command is issued, so long as an undump or unfix command is also used to turn them off.  

# 1.11.5 Related commands  

fix deform, boundary  

# 1.11.6 Default  

The option default is units $=$ lattice.  

# 1.12 clear command  

# 1.12.1 Syntax  

# 1.12.4 Restrictions  

none  

# 1.12.5 Related commands  

none  

# 1.12.6 Default  

none  

# 1.13 comm_modify command  

# 1.13.1 Syntax  

comm_modify keyword value ...  

• one or more keyword/value pairs may be appended   
• keyword $=$ mode or cutoff or cutoff/multi or group or reduce/multi or vel mode value $=$ single or multi $=$ communicate atoms within a single or multiple distances cutoff val $\mathrm{{1e=Rcut}}$ (distance units) $=$ communicate atoms from this far away cutoff/multi collection value collection $=$ atom collection or collection range (supports asterisk notation) valu $\mathrm{{}_{\mathrm{{}}}=R c u t}$ (distance units) $=$ communicate atoms for selected types from this far away reduce/multi arg = none = reduce number of communicated ghost atoms for multi style group value = group-ID = only communicate atoms in the group vel value = yes or no = do or do not communicate velocity info with ghost atoms  

# 1.13.2 Examples  

comm_modify mode multi reduce/multi   
comm_modify mode multi group solvent   
comm_modify mode multi cutoff/multi 1 10.0 cutoff/multi 2\*4 15.0   
comm_modify vel yes   
comm_modify mode single cutoff 5.0 vel yes   
comm_modify cutoff/multi \* 0.0  

# 1.13.3 Description  

This command sets parameters that affect the inter-processor communication of atom information that occurs each timestep as coordinates and other properties are exchanged between neighboring processors and stored as properties of ghost atoms.  

# Note  

These options apply to the currently defined comm style. When you specify a comm_style or read_restart command, all communication settings are restored to their default or stored values, including those previously reset by a comm_modify command. Thus if your input script specifies a comm_style or read_restart command, you should use the comm_modify command after it.  

The mode keyword determines whether a single or multiple cutoff distances are used to determine which atoms to communicate.  

The default mode is single which means each processor acquires information for ghost atoms that are within a single distance from its subdomain. The distance is by default the maximum of the neighbor cutoff across all atom type pairs.  

For many systems this is an efficient algorithm, but for systems with widely varying cutoffs for different type pairs, the multi mode can be faster. In multi, each atom is assigned to a collection which should correspond to a set of atoms with similar interaction cutoffs. See the neighbor command for a detailed description of collections. In this case, each atom collection is assigned its own distance cutoff for communication purposes, and fewer atoms will be communicated. See the neighbor multi command for neighbor list construction options that may also be beneficial for simulations of this kind. The multi communication mode is only compatible with the multi neighbor style.  

The cutoff keyword allows you to extend the ghost cutoff distance for communication mode single, which is the distance from the borders of a processor’s subdomain at which ghost atoms are acquired from other processors. By default the ghost cutof $=$ neighbor cutof $=$ pairwise force cutoff $^+$ neighbor skin. See the neighbor command for more information about the skin distance. If the specified Rcut is greater than the neighbor cutoff, then extra ghost atoms will be acquired. If the provided cutoff is smaller, the provided value will be ignored, the ghost cutoff is set to the neighbor cutoff and a warning will be printed. Specifying a cutoff value of 0.0 will reset any previous value to the default. If bonded interactions exist and equilibrium bond length information is available, then also a heuristic based on that bond length is computed. It is used as communication cutoff, if there is no pair style present and no comm_modify cutoff command used. Otherwise a warning is printed, if this bond based estimate is larger than the communication cutoff used.  

The cutoff/multi option is equivalent to cutoff, but applies to communication mode multi instead. Since the communication cutoffs are determined per atom collections, a collection specifier is needed and cutoff for one or multiple collections can be extended. Also ranges of collections using the usual asterisk notation can be given. Collections are indexed from 1 to $\mathbf{N}$ where $\mathbf{N}$ is the total number of collections. Note that the arguments for cutoff/multi are parsed right before each simulation to account for potential changes in the number of collections. Custom cutoffs are preserved between runs but if collections are redefined, one may want to re-specify the communication cutoffs. For granular pair styles,the default cutoff is set to the sum of the current maximum atomic radii for each collection.  

The reduce/multi option applies to multi and sets the communication cutoff for a particle equal to the maximum interaction distance between particles in the same collection. This reduces the number of ghost atoms that need to be communicated. This method is only compatible with the multi neighbor style and requires a half neighbor list and Newton on. See the neighbor multi command for more information.  

These are simulation scenarios in which it may be useful or even necessary to set a ghost cutoff $>$ neighbor cutoff:  

• a single polymer chain with bond interactions, but no pairwise interactions • bonded interactions (e.g. dihedrals) extend further than the pairwise cutoff • ghost atoms beyond the pairwise cutoff are needed for some computation  

In the first scenario, a pairwise potential is not defined. Thus the pairwise neighbor cutoff will be 0.0. But ghos atoms are still needed for computing bond, angle, etc interactions between atoms on different processors, or when the interaction straddles a periodic boundary.  

The appropriate ghost cutoff depends on the newton bond setting. For newton bond off, the distance needs to be the furthest distance between any two atoms in the bond, angle, etc. E.g. the distance between 1-4 atoms in a dihedral. For newton bond on, the distance between the central atom in the bond, angle, etc and any other atom is sufficient. E.g. the distance between 2-4 atoms in a dihedral.  

In the second scenario, a pairwise potential is defined, but its neighbor cutoff is not sufficiently long enough to enable bond, angle, etc terms to be computed. As in the previous scenario, an appropriate ghost cutoff should be set.  

In the last scenario, a $f\boldsymbol{{\kappa}}$ or compute or pairwise potential needs to calculate with ghost atoms beyond the normal pairwise cutoff for some computation it performs (e.g. locate neighbors of ghost atoms in a manybody pair potential). Setting the ghost cutoff appropriately can ensure it will find the needed atoms.  

![](images/52c26b321eee0d5ef7fc49547ded31dff5e7ecd908c7001ab53da8bff71c776b.jpg)  

# Note  

In these scenarios, if you do not set the ghost cutoff long enough, and if there is only one processor in a periodic dimension (e.g. you are running in serial), then LAMMPS may “find” the atom it is looking for (e.g. the partner atom in a bond), that is on the far side of the simulation box, across a periodic boundary. This will typically lead to bad dynamics (i.e. the bond length is now the simulation box length). To detect if this is happening, see the neigh_modify cluster command.  

The group keyword will limit communication to atoms in the specified group. This can be useful for models where no ghost atoms are needed for some kinds of particles. All atoms (not just those in the specified group) will still migrate to new processors as they move. The group specified with this option must also be specified via the atom_modify first command.  

The vel keyword enables velocity information to be communicated with ghost particles. Depending on the atom_style, velocity info includes the translational velocity, angular velocity, and angular momentum of a particle. If the vel option is set to yes, then ghost atoms store these quantities; if no then they do not. The yes setting is needed by some pair styles which require the velocity state of both the I and J particles to compute a pairwise I,J interaction, as well as by some compute and fix commands.  

Note that if the fix deform command is being used with its “remap v” option enabled, then the velocities for ghost atoms (in the fix deform group) mirrored across a periodic boundary will also include components due to any velocity shift that occurs across that boundary (e.g. due to dilation or shear).  

# 1.13.4 Restrictions  

Communication mode multi is currently only available for comm_style brick.  

# 1.13.5 Related commands  

comm_style, neighbor  

# 1.13.6 Default  

The option defaults are mode $=$ single, group $=$ all, cutof $=0.0$ , vel $=$ no. The cutoff default of 0.0 means that ghost cutof $=$ neighbor cutoff $=$ pairwise force cutoff $^+$ neighbor skin.  

# 1.14 comm_style command  

# 1.14.1 Syntax  

# 1.14.3 Description  

This command sets the style of inter-processor communication of atom information that occurs each timestep as coordinates and other properties are exchanged between neighboring processors and stored as properties of ghost atoms.  

For the default brick style, the domain decomposition used by LAMMPS to partition the simulation box must be a regular 3d grid of bricks, one per processor. Each processor communicates with its 6 Cartesian neighbors in the grid to acquire information for nearby atoms.  

For the tiled style, a more general domain decomposition can be used, as triggered by the balance or fix balance commands. The simulation box can be partitioned into non-overlapping rectangular-shaped “tiles” or varying sizes and shapes. Again there is one tile per processor. To acquire information for nearby atoms, communication must now be done with a more complex pattern of neighboring processors.  

Note that this command does not actually define a partitioning of the simulation box (a domain decomposition), rather it determines what kinds of decompositions are allowed and the pattern of communication used to enable the decomposition. A decomposition is created when the simulation box is first created, via the create_box or read_data or read_restart commands. For both the brick and tiled styles, the initial decomposition will be the same, as described by create_box and processors commands. The decomposition can be changed via the balance or fix balance commands.  

# 1.14.4 Restrictions  

none  

# 1.14.5 Related commands  

comm_modify, processors, balance, fix balance  

# 1.14.6 Default  

The default style is brick.  

# 1.15 compute command  

# 1.15.1 Syntax  

compute ID group-ID style args  

• $\mathrm{ID}=$ user-assigned name for the computation group- $\cdot\mathrm{ID}=\mathrm{ID}$ of the group of atoms to perform the computation on • style $=$ one of a list of possible style names (see below) args $=$ arguments used by a particular style  

# 1.15.2 Examples  

compute 1 all temp   
compute newtemp flow temp/partial 1 1 0   
compute 3 all ke/atom  

# 1.15.3 Description  

Define a diagnostic computation that will be performed on a group of atoms. Quantities calculated by a compute are instantaneous values, meaning they are calculated from information about atoms on the current timestep or iteration, though internally a compute may store some information about a previous state of the system. Defining a compute does not perform the computation. Instead computes are invoked by other LAMMPS commands as needed (e.g., to calculate a temperature needed for a thermostat fix or to generate thermodynamic or dump file output). See the Howto output page for a summary of various LAMMPS output options, many of which involve computes.  

The ID of a compute can only contain alphanumeric characters and underscores.  

Computes calculate and store any of four styles of quantities: global, per-atom, local, or per-grid.  

A global quantity is one or more system-wide values, e.g. the temperature of the system. A per-atom quantity is one or more values per atom, e.g. the kinetic energy of each atom. Per-atom values are set to 0.0 for atoms not in the specified compute group. Local quantities are calculated by each processor based on the atoms it owns, but there may be zero or more per atom, e.g. a list of bond distances. Per-grid quantities are calculated on a regular 2d or 3d grid which overlays a 2d or 3d simulation domain. The grid points and the data they store are distributed across processors; each processor owns the grid points which fall within its subdomain.  

As a general rule of thumb, computes that produce per-atom quantities have the word “atom” at the end of their style, e.g. ke/atom. Computes that produce local quantities have the word “local” at the end of their style, e.g. bond/local. Computes that produce per-grid quantities have the word “grid” at the end of their style, e.g. property/grid. And styles with neither “atom” or “local” or “grid” at the end of their style name produce global quantities.  

Global, per-atom, local, and per-grid quantities can also be of three kinds: a single scalar value (global only), a vector of values, or a 2d array of values. For per-atom, local, and per-grid quantities, a “vector” means a single value for each atom, each local entity (e.g. bond), or grid cell. Likewise an “array”, means multiple values for each atom, each local entity, or each grid cell.  

Note that a single compute can produce any combination of global, per-atom, local, or per-grid values. Likewise it can produce any combination of scalar, vector, or array output for each style. The exception is that for per-atom, local, and per-grid output, either a vector or array can be produced, but not both. The doc page for each compute explains the values it produces.  

When a compute output is accessed by another input script command it is referenced via the following bracket notation, where ID is the ID of the compute:  

<html><body><table><tr><td>c_ID</td><td>entire scalar, vector, or array</td></tr><tr><td>c_ID[I]</td><td>one element of vector, one column of array</td></tr><tr><td>c_ID[I][J]</td><td>one element of a array</td></tr></table></body></html>  

In other words, using one bracket reduces the dimension of the quantity once (vector $\rightarrow$ scalar, array $\rightarrow$ vector). Using two brackets reduces the dimension twice (array $\rightarrow$ scalar). Thus, for example, a command that uses global scalar compute values as input can also process elements of a vector or array. Depending on the command, this can either be done directly using the syntax in the table, or by first defining a variable of the appropriate style to store the quantity, then using the variable as an input to the command.  

Note that commands and variables which take compute outputs as input typically do not allow for all styles and kinds of data (e.g., a command may require global but not per-atom values, or it may require a vector of values, not a scalar). This means there is typically no ambiguity about referring to a compute output as $\mathrm{~c~}_{-}\mathrm{ID}$ even if it produces, for example, both a scalar and vector. The doc pages for various commands explain the details, including how any ambiguities are resolved.  

In LAMMPS, the values generated by a compute can be used in several ways:  

# 1.15. compute command  

• The results of computes that calculate a global temperature or pressure can be used by fixes that do thermostatting or barostatting or when atom velocities are created.   
• Global values can be output via the thermo_style custom or fix ave/time command. Or the values can be referenced in a variable equal or variable atom command.   
• Per-atom values can be output via the dump custom command. Or they can be time-averaged via the fix ave/atom command or reduced by the compute reduce command. Or the per-atom values can be referenced in an atom-style variable.   
• Local values can be reduced by the compute reduce command, or histogrammed by the fix ave/histo command, or output by the dump local command.  

The results of computes that calculate global quantities can be either “intensive” or “extensive” values. Intensive means the value is independent of the number of atoms in the simulation (e.g., temperature). Extensive means the value scales with the number of atoms in the simulation (e.g., total rotational kinetic energy). Thermodynamic output will normalize extensive values by the number of atoms in the system, depending on the “thermo_modify norm” setting. It will not normalize intensive values. If a compute value is accessed in another way (e.g., by a variable), you may want to know whether it is an intensive or extensive value. See the page for individual computes for further info.  

LAMMPS creates its own computes internally for thermodynamic output. Three computes are always created, named “thermo_temp”, “thermo_press”, and “thermo_pe”, as if these commands had been invoked in the input script:  

compute thermo_temp all temp compute thermo_press all pressure thermo_temp compute thermo_pe all pe  

Additional computes for other quantities are created if the thermo style requires it. See the documentation for the thermo_style command.  

Fixes that calculate temperature or pressure, i.e. for thermostatting or barostatting, may also create computes. These are discussed in the documentation for specific fix commands.  

In all these cases, the default computes LAMMPS creates can be replaced by computes defined by the user in the input script, as described by the thermo_modify and fix modify commands.  

Properties of either a default or user-defined compute can be modified via the compute_modify command.  

Computes can be deleted with the uncompute command.  

Code for new computes can be added to LAMMPS; see the Modify page for details. The results of their calculations accessed in the various ways described above.  

Each compute style has its own page which describes its arguments and what it does. Here is an alphabetic list of compute styles available in LAMMPS. They are also listed in more compact form on the Commands compute doc page.  

There are also additional accelerated compute styles included in the LAMMPS distribution for faster performance on CPUs, GPUs, and KNLs. The individual style names on the Commands compute page are followed by one or more of (g,i,k,o,t) to indicate which accelerated styles exist.  

• ackland/atom - determines the local lattice structure based on the Ackland formulation   
• adf - angular distribution function of triples of atoms   
• aggregate/atom - aggregate ID for each atom   
• angle - energy of each angle sub-style   
• angle/local - theta and energy of each angle   
• angmom/chunk - angular momentum for each chunk   
• ave/sphere/atom - compute local density and temperature around each atom   
• basal/atom - calculates the hexagonal close-packed “c” lattice vector of each atom   
• body/local - attributes of body sub-particles   
• bond - energy of each bond sub-style   
• bond/local - distance and energy of each bond   
• born/matrix - second derivative or potential with respect to strain   
• centro/atom - centro-symmetry parameter for each atom   
• centroid/stress/atom - centroid based stress tensor for each atom   
• chunk/atom - assign chunk IDs to each atom   
• chunk/spread/atom - spreads chunk values to each atom in chunk   
• cluster/atom - cluster ID for each atom   
• cna/atom - common neighbor analysis (CNA) for each atom   
• cnp/atom - common neighborhood parameter (CNP) for each atom   
• com - center of mass of group of atoms   
• com/chunk - center of mass for each chunk   
• contact/atom - contact count for each spherical particle   
• coord/atom - coordination number for each atom   
• count/type - count of atoms or bonds by type   
• damage/atom - Peridynamic damage for each atom   
• dihedral - energy of each dihedral sub-style   
• dihedral/local - angle of each dihedral   
• dilatation/atom - Peridynamic dilatation for each atom   
• dipole - dipole vector and total dipole   
• dipole/chunk - dipole vector and total dipole for each chunk   
• dipole/tip4p - dipole vector and total dipole with TIP4P pair style   
• dipole/tip4p/chunk - dipole vector and total dipole for each chunk with TIP4P pair style   
• displace/atom - displacement of each atom   
• dpd - total values of internal conductive energy, internal mechanical energy, chemical average of internal temperature   
• dpd/atom - per-particle values of internal conductive energy, internal mechanical energy, internal temperature   
• edpd/temp/atom - per-atom temperature for each eDPD particle in a group   
• efield/atom - electric field at each atom   
• efield/wolf/atom - electric field at each atom   
• entropy/atom - pair entropy fingerprint of each atom   
• erotate/asphere - rotational energy of aspherical particles   
• erotate/rigid - rotational energy of rigid bodies   
• erotate/sphere - rotational energy of spherical particles   
• erotate/sphere/atom - rotational energy for each spherical particle   
• event/displace - detect event on atom displacement   
• fabric - calculates fabric tensors from pair interactions   
• fep - compute free energies for alchemical transformation from perturbation theory   
• fep/ta - compute free energies for a test area perturbation   
• force/tally - force between two groups of atoms via the tally callback mechanism   
• fragment/atom - fragment ID for each atom   
• gaussian/grid/local - local array of Gaussian atomic contributions on a regular grid   
• global/atom - assign global values to each atom from arrays of global values   
• group/group - energy/force between two groups of atoms   
• gyration - radius of gyration of group of atoms   
• gyration/chunk - radius of gyration for each chunk   
• gyration/shape - shape parameters from gyration tensor   
• gyration/shape/chunk - shape parameters from gyration tensor for each chunk   
• heat/flux - heat flux through a group of atoms   
• heat/flux/tally - heat flux through a group of atoms via the tally callback mechanism   
• heat/flux/virial/tally - virial heat flux between two groups via the tally callback mechanism   
• hexorder/atom - bond orientational order parameter q6   
• hma - harmonically mapped averaging for atomic crystals   
• improper - energy of each improper sub-style   
• improper/local - angle of each improper   
• inertia/chunk - inertia tensor for each chunk   
• $k e$ - translational kinetic energy   
• ke/atom - kinetic energy for each atom   
• ke/atom/eff - per-atom translational and radial kinetic energy in the electron force field mode   
• ke/eff - kinetic energy of a group of nuclei and electrons in the electron force field model   
• ke/rigid - translational kinetic energy of rigid bodies   
• composition/atom - local composition for each atom   
• mliap - gradients of energy and forces with respect to model parameters and related quantities fo learning interatomic potentials   
• momentum - translational momentum   
• msd - mean-squared displacement of group of atoms   
• msd/chunk - mean-squared displacement for each chunk   
• msd/nongauss - MSD and non-Gaussian parameter of group of atoms   
• nbond/atom - calculates number of bonds per atom   
• omega/chunk - angular velocity for each chunk   
• orientorder/atom - Steinhardt bond orientational order parameters Ql   
• pace - atomic cluster expansion descriptors and related quantities   
• pair - values computed by a pair style   
• pair/local - distance/energy/force of each pairwise interaction   
• pe - potential energy   
• pe/atom - potential energy for each atom   
• pe/mol/tally - potential energy between two groups of atoms separated into intermolecular and intram components via the tally callback mechanism   
• pe/tally - potential energy between two groups of atoms via the tally callback mechanism   
• plasticity/atom - Peridynamic plasticity for each atom   
• pod/atom - POD descriptors for each atom   
• podd/atom - derivative of POD descriptors for each atom   
• pod/local - local POD descriptors and their derivatives   
• pod/global - global POD descriptors and their derivatives   
• pressure - total pressure and pressure tensor   
• pressure/alchemy - mixed system total pressure and pressure tensor for fix alchemy runs   
• pressure/uef - pressure tensor in the reference frame of an applied flow field   
• property/atom - convert atom attributes to per-atom vectors/arrays   
• property/chunk - extract various per-chunk attributes   
• property/grid - convert per-grid attributes to per-grid vectors/arrays   
• property/local - convert local attributes to local vectors/arrays   
• ptm/atom - determines the local lattice structure based on the Polyhedral Template Matching method   
• rattlers/atom - identify under-coordinated rattler atoms   
• rdf - radial distribution function $g(r)$ histogram of group of atoms   
• reaxff/atom - extract ReaxFF bond information   
• reduce - combine per-atom quantities into a single global value   
• reduce/chunk - reduce per-atom quantities within each chunk   
• reduce/region - same as compute reduce, within a region   
• rheo/property/atom - convert atom attributes in RHEO package to per-atom vectors/arrays   
• rigid/local - extract rigid body attributes   
• saed - electron diffraction intensity on a mesh of reciprocal lattice nodes   
• slcsa/atom - perform Supervised Learning Crystal Structure Analysis (SL-CSA)   
• slice - extract values from global vector or array  

# 1.15. compute command  

• smd/contact/radius - contact radius for Smooth Mach Dynamics   
• smd/damage - damage status of SPH particles in Smooth Mach Dynamics   
• smd/hourglass/error - error associated with approximated relative separation in Smooth Mach Dynamics   
• smd/internal/energy - per-particle enthalpy in Smooth Mach Dynamics   
• smd/plastic/strain - equivalent plastic strain per particle in Smooth Mach Dynamics   
• smd/plastic/strain/rate - time rate of the equivalent plastic strain in Smooth Mach Dynamics   
• smd/rho - per-particle mass density in Smooth Mach Dynamics   
• smd/tlsph/defgrad - deformation gradient in Smooth Mach Dynamics   
• smd/tlsph/dt - CFL-stable time increment per particle in Smooth Mach Dynamics   
• smd/tlsph/num/neighs - number of particles inside the smoothing kernel radius for Smooth Mach Dynamics   
• smd/tlsph/shape - current shape of the volume of a particle for Smooth Mach Dynamics   
• smd/tlsph/strain - Green–Lagrange strain tensor for Smooth Mach Dynamics   
• smd/tlsph/strain/rate - rate of strain for Smooth Mach Dynamics   
• smd/tlsph/stress - per-particle Cauchy stress tensor for SPH particles   
• smd/triangle/vertices - coordinates of vertices corresponding to the triangle elements of a mesh for Smooth Mach Dynamics   
• smd/ulsph/effm - per-particle effective shear modulus   
• smd/ulsph/num/neighs - number of neighbor particles inside the smoothing kernel radius for Smooth Mach Dynamics   
• smd/ulsph/strain - logarithmic strain tensor for Smooth Mach Dynamics   
• smd/ulsph/strain/rate - logarithmic strain rate for Smooth Mach Dynamics   
• smd/ulsph/stress - per-particle Cauchy stress tensor and von Mises equivalent stress in Smooth Mach Dynamics   
• smd/vol - per-particle volumes and their sum in Smooth Mach Dynamics   
• snap - gradients of SNAP energy and forces with respect to linear coefficients and related quantities for fitting SNAP potentials   
• sna/atom - bispectrum components for each atom   
• sna/grid - global array of bispectrum components on a regular grid   
• sna/grid/local - local array of bispectrum components on a regular grid   
• snad/atom - derivative of bispectrum components for each atom   
• snav/atom - virial contribution from bispectrum components for each atom   
• sph/e/atom - per-atom internal energy of Smooth-Particle Hydrodynamics atoms   
• sph/rho/atom - per-atom density of Smooth-Particle Hydrodynamics atoms   
• sph/t/atom - per-atom internal temperature of Smooth-Particle Hydrodynamics atoms   
• spin - magnetic quantities for a system of atoms having spins   
• stress/atom - stress tensor for each atom   
• stress/cartesian - stress tensor in cartesian coordinates   
• stress/cylinder - stress tensor in cylindrical coordinates   
• stress/mop - normal components of the local stress tensor using the method of planes   
• stress/mop/profile - profile of the normal components of the local stress tensor using the method of planes   
• stress/spherical - stress tensor in spherical coordinates   
• stress/tally - stress between two groups of atoms via the tally callback mechanism   
• tdpd/cc/atom - per-atom chemical concentration of a specified species for each tDPD particle   
• temp - temperature of group of atoms   
• temp/asphere - temperature of aspherical particles   
• temp/body - temperature of body particles   
• temp/chunk - temperature of each chunk   
• temp/com - temperature after subtracting center-of-mass velocity   
• temp/cs - temperature based on the center-of-mass velocity of atom pairs that are bonded to each other   
• temp/deform - temperature excluding box deformation velocity   
• temp/deform/eff - temperature excluding box deformation velocity in the electron force field model   
• temp/drude - temperature of Core–Drude pairs   
• temp/eff - temperature of a group of nuclei and electrons in the electron force field model   
• temp/partial - temperature excluding one or more dimensions of velocity   
• temp/profile - temperature excluding a binned velocity profile   
• temp/ramp - temperature excluding ramped velocity component   
• temp/region - temperature of a region of atoms   
• temp/region/eff - temperature of a region of nuclei and electrons in the electron force field model   
• temp/rotate - temperature of a group of atoms after subtracting out their center-of-mass and angular velocities   
• temp/sphere - temperature of spherical particles   
• temp/uef - kinetic energy tensor in the reference frame of an applied flow field   
• $t i$ - thermodynamic integration free energy values   
• torque/chunk - torque applied on each chunk   
• vacf - velocity auto-correlation function of group of atoms   
• vcm/chunk - velocity of center-of-mass for each chunk   
• viscosity/cos - velocity profile under cosine-shaped acceleration   
• voronoi/atom - Voronoi volume and neighbors for each atom   
• xrd - X-ray diffraction intensity on a mesh of reciprocal lattice nodes  

# 1.15.4 Restrictions  

none  

# 1.15.5 Related commands  

uncompute, compute_modify, fix ave/atom, fix ave/time, fix ave/histo  

# 1.15.6 Default  

none  

# 1.16 compute_modify command  

# 1.16.1 Syntax  

compute_modify compute-ID keyword value ...  

• compute- $\mathrm{\cdotID}=\mathrm{ID}$ of the compute to modify   
• one or more keyword/value pairs may be listed   
• keyword $=$ extra/dof or dynamic/dof extra/dof value $=\mathrm{N}$ $\mathrm{N}=\#$ of extra degrees of freedom to subtract dynamic/dof value $\mathbf{\mu}=\mathbf{y}\mathbf{es}$ or no $\mathrm{yes/no=do}$ or do not re-compute the number of degrees of freedom (DOF) contributing to the␣ $\hookrightarrow$ temperature  

# 1.16.2 Examples  

<html><body><table><tr><td>compute _modify myTemp extra/dof 0</td></tr><tr><td>compute _modify newtemp dynamic/dof yes extra/dof 600</td></tr><tr><td></td></tr></table></body></html>  

# 1.16.3 Description  

Modify one or more parameters of a previously defined compute. Not all compute styles support all parameters.  

The extra/dof keyword refers to how many degrees of freedom are subtracted (typically from $3N$ ) as a normalizing factor in a temperature computation. Only computes that compute a temperature use this option. The default is 2 or 3 for 2d or 3d systems which is a correction factor for an ensemble of velocities with zero total linear momentum. For compute temp/partial, if one or more velocity components are excluded, the value used for extra/dof is scaled accordingly. You can use a negative number for the extra/dof parameter if you need to add degrees-of-freedom. See the compute temp/asphere command for an example.  

The dynamic/dof keyword determines whether the number of atoms $N$ in the compute group and their associated degrees of freedom (DOF) are re-computed each time a temperature is computed. Only compute styles that calculate a temperature use this option. By default, $N$ and their DOF are assumed to be constant. If you are adding atoms or molecules to the system (see the fix pour, fix deposit, and fix gcmc commands) or expect atoms or molecules to be lost (e.g. due to exiting the simulation box or via $f\boldsymbol{a}\boldsymbol{x}$ evaporate), then this option should be used to ensure the temperature is correctly normalized.  

# 1.16.4 Restrictions  

none  

# 1.16.5 Related commands  

compute  

# 1.16.6 Default  

The option defaults are extra/dof $=2$ or 3 for 2d or 3d systems, respectively, and dynamic/dof $=n o$ .  

# 1.17 create_atoms command  

# 1.17.1 Syntax  

create_atoms type style args keyword values ...  

• type $=$ atom type (1-Ntypes or type label) of atoms to create (offset for molecule creation)   
• style $=b o x$ or region or single or mesh or random box $\mathrm{args}=\mathrm{none}$ region args $=$ region-ID region-ID $=$ particles will only be created if contained in the region single $\mathrm{args}={\bf x}$ y z x,y,z = coordinates of a single particle (distance units) mesh args $=$ STL-file STL-file $=$ file with triangle mesh in STL format random $\mathrm{args=N}$ seed region-ID N = number of particles to create seed $=$ random # seed (positive integer) region-ID $=$ create atoms within this region, use NULL for entire simulation box   
• zero or more keyword/value pairs may be appended   
• keyword $=$ mol or basis or ratio or subset or remap or var or set or radscale or meshmode or rotate or overlap or maxtry or units mol values $=$ template-ID seed template-ID = ID of molecule template specified in a separate molecule command seed $=$ random # seed (positive integer) basis values = M itype M = which basis atom itype = atom type (1-Ntypes or type label) to assign to this basis atom ratio values = frac seed frac = fraction of lattice sites (0 to 1) to populate randomly seed = random # seed (positive integer) subset values = Nsubset seed $\mathrm{Nsubset}=\#$ of lattice sites to populate randomly seed = random # seed (positive integer) remap value = yes or no var value $-$ name = variable name to evaluate for test of atom creation set values = dim name $\mathrm{{dim}=x}$ or y or z name = name of variable to set with x, y, or z atom position radscale value $=$ factor factor $=$ scale factor for setting atom radius meshmode values $=$ mode arg mode $=$ bisect or qrand   
bisect arg $=$ radthresh radthresh $=$ threshold value for mesh to determine when to split triangles (distance units) qrand arg $=$ density density $=$ minimum number density for atoms place on mesh triangles (inverse distance squared␣   
$\hookrightarrow$ units)   
rotate values $=$ theta Rx Ry Rz   
theta $=$ rotation angle for single molecule (degrees)   
Rx,Ry,Rz = rotation vector for single molecule   
overlap value $=$ Doverlap   
Doverlap $=$ only insert if at least this distance from all existing atoms   
maxtry value $=\mathrm{Ntry}$   
Ntry $=$ number of attempts to insert a particle before failure   
units value $=$ lattice or box   
lattice $=$ the geometry is defined in lattice units   
box $=$ the geometry is defined in simulation box units  

# 1.17.2 Examples  

create_atoms 1 box   
labelmap atom 1 Pt   
create_atoms Pt box   
labelmap atom 1 C 2 Si   
create_atoms C region regsphere basis Si C   
create_atoms 3 region regsphere basis 2 3   
create_atoms 3 region regsphere basis 2 3 ratio 0.5 74637   
create_atoms 3 single 0 0 5   
create_atoms 1 box var v set x xpos set y ypos   
create_atoms 2 random 50 12345 NULL overlap 2.0 maxtry 50   
create_atoms 1 mesh open_box.stl meshmode qrand 0.1 units box   
create_atoms 1 mesh funnel.stl meshmode bisect 4.0 units box radscale 0.9  

# 1.17.3 Description  

This command creates atoms (or molecules) within the simulation box, either on a lattice, or at random points, or on a surface defined by a triangulated mesh. Or it creates a single atom (or molecule) at a specified point. It is an alternative to reading in atom coordinates explicitly via a read_data or read_restart command.  

To use this command a simulation box must already exist, which is typically created via the create_box command. Before using this command, a lattice must typically also be defined using the lattice command, unless you specify the single or mesh style with units $=$ box or the random style. To create atoms on a lattice for general triclinic boxes, see the discussion below.  

For the remainder of this doc page, a created atom or molecule is referred to as a “particle”.  

If created particles are individual atoms, they are assigned the specified atom type, though this can be altered via the basis keyword as discussed below. If molecules are being created, the type of each atom in the created molecule is specified in a specified file read by the molecule command, and those values are added to the specified atom type (e.g., if $t y p e=2$ and the file specifies atom types 1, 2, and 3, then each created molecule will have atom types 3, 4, and 5).  

You cannot use this command to create atoms that are outside the simulation box; they will just be ignored by LAMMPS. This is true even if you are using shrink-wrapped box boundaries, as specified by the boundary command. However, you can first use the change_box command to temporarily expand the box, then add atoms via create_atoms, then finally use change_box command again if needed to re-shrink-wrap the new atoms. See the change_box doc page for an example of how to do this, using the create_atoms single style to insert a new atom outside the current simulation box.  

For the box style, the create_atoms command fills the entire simulation box with particles on the lattice. If your simulation box is periodic, you should ensure its size is a multiple of the lattice spacings, to avoid unwanted atom overlaps at the box boundaries. If your box is periodic and a multiple of the lattice spacing in a particular dimension, LAMMPS is careful to put exactly one particle at the boundary (on either side of the box), not zero or two.  

For the region style, a geometric volume is filled with particles on the lattice. This volume is what is both inside the simulation box and also consistent with the region volume. See the region command for details. Note that a region can be specified so that its “volume” is either inside or outside its geometric boundary. Also note that if a region is the same size as a periodic simulation box (in some dimension), LAMMPS does NOT implement the same logic described above for the box style, to ensure exactly one particle at periodic boundaries. If this is desired, you should either use the box style, or tweak the region size to get precisely the particles you want.  

If the simulation box is formulated as a general triclinic box defined by arbitrary edge vectors A, B, C, then the box and region styles will create atoms on a lattice commensurate with those edge vectors. See the Howto_triclinic doc page for a detailed explanation of orthogonal, restricted triclinic, and general triclinic simulation boxes. As with the create_box command, the lattice command used by this command must be of style custom and use its triclinic/general option. The a1, \*a2, a3 settings of the lattice command define the edge vectors of a unit cell of the general triclinic lattice. The create_box command creates a simulation box which replicates that unit cell along each of the A, B, C edge vectors.  

# Note  

LAMMPS allows specification of general triclinic simulation boxes as a convenience for users who may be converting data from solid-state crystallographic representations or from DFT codes for input to LAMMPS. However, as explained on the Howto_triclinic doc page, internally, LAMMPS only uses restricted triclinic simulation boxes. This means the box created by the create_box command as well as the atoms created by this command with their per-atom information (e.g. coordinates, velocities) are converted (rotated) from general to restricted triclinic form when the two commands are invoked. The Howto_triclinic doc page also discusses other LAMMPS commands which can input/output general triclinic representations of the simulation box and per-atom data.  

The box style will fill the entire general triclinic box with particles on the lattice, as explained above.  

![](images/e181c5e7608d078c62c8e6d33cb99654ac502efb873905de6527112b4f21be56.jpg)  

# Note  

The region style also operates as explained above, but the check for particles inside the region is performed after the particle coordinates have been converted to the restricted triclinic box. This means the region must also be defined with respect to the restricted triclinic box, not the general triclinic box.  

If the simulation box is general triclinic, the single, random, and mesh styles described next operate on the box after it has been converted to restricted triclinic. So all the settings for those styles should be made in that context.  

For the single style, a single particle is added to the system at the specified coordinates. This can be useful for debugging purposes or to create a tiny system with a handful of particles at specified positions. For a 2d simulation the specified z coordinate must be 0.0.  

Changed in version $2\ensuremath{\mathrm{Jun}}2022$ .  

The porosity style has been renamed to random with added functionality.  

For the random style, $N$ particles are added to the system at randomly generated coordinates, which can be useful for generating an amorphous system. For 2d simulations, the z coordinates of all added atoms will be 0.0.  

The particles are created one by one using the specified random number seed, resulting in the same set of particle coordinates, independent of how many processors are being used in the simulation. Unless the overlap keyword is specified, particles created by the random style will typically be highly overlapped. Various additional criteria can be used to accept or reject a random particle insertion; see the keyword discussion below. Multiple attempts per particle are made (see the maxtry keyword) until the insertion is either successful or fails. If this command fails to add all requested $N$ particles, a warning will be output.  

If the region- $\mathbf{\nabla}\cdot I D$ argument is specified as NULL, then the randomly created particles will be anywhere in the simulation box. If a region- $\cdot I D$ is specified, a geometric volume is filled that is both inside the simulation box and is also consistent with the region volume. See the region command for details. Note that a region can be specified so that its “volume” is either inside or outside its geometric boundary.  

Note that the create_atoms command adds particles to those that already exist. This means it can be used to add particles to a system previously read in from a data or restart file. Or the create_atoms command can be used multiple times, to add multiple sets of particles to the simulation. For example, grain boundaries can be created, by interleaving the create_atoms command with lattice commands specifying different orientations.  

When this command is used, care should be taken to ensure the resulting system does not contain particles that are highly overlapped. Such overlaps will cause many interatomic potentials to compute huge energies and forces, leading to bad dynamics. There are several strategies to avoid this problem:  

• Use the delete_atoms overlap command after create_atoms. For example, this strategy can be used to overlay and surround a large protein molecule with a volume of water molecules, then delete water molecules that overlap with the protein atoms. • For the random style, use the optional overlap keyword to avoid overlaps when each new particle is created. • Before running dynamics on an overlapped system, perform an energy minimization. Or run initial dynamics with pair_style soft or with fix nve/limit to un-overlap the particles, before running normal dynamics.  

Added in version 2Jun2022.  

For the mesh style, a file with a triangle mesh in STL format is read and one or more particles are placed into the area of each triangle. The reader supports both ASCII and binary files conforming to the format on the Wikipedia page. Binary STL files (e.g. as frequently offered for 3d-printing) can also be first converted to ASCII for editing with the stl_bin2txt tool. The use of the units box option is required. There are two algorithms available for placing atoms: bisect and qrand. They can be selected via the meshmode option; bisect is the default. If the atom style allows it, the radius will be set to a value depending on the algorithm and the value of the radscale parameter (see below), and the atoms created from the mesh are assigned a new molecule ID.  

In bisect mode a particle is created at the center of each triangle unless the average distance of the triangle vertices from its center is larger than the radthresh value (default is lattice spacing in $\mathbf{X}$ -direction). In case the average distance is over the threshold, the triangle is recursively split into two halves along the the longest side until the threshold is reached. There will be at least one sphere per triangle. The value of radthresh is set as an argument to meshmode bisect. The average distance of the vertices from the center is also used to set the radius.  

![](images/05201640541edcd7133596b9fe3f37a605ca757eec5ffa831c8d156d2fc841c2.jpg)  

In qrand mode a quasi-random sequence is used to distribute particles on mesh triangles using an approach by (Roberts). Particles are added to the triangle until the minimum number density is met or exceeded such that every triangle will have at least one particle. The minimum number density is set as an argument to the qrand option. The radius will be set so that the sum of the area of the radius of the particles created in place of a triangle will be equal to the area of that triangle.  

![](images/5b1925a9dbc87547d7a33081e0b7d2ec19e96b90e17ea1a7ab648c77bd2daa69.jpg)  

# Note  

The atom placement algorithms in the mesh style benefit from meshes where triangles are close to equilateral. It is therefore recommended to pre-process STL files to optimize the mesh accordingly. There are multiple open source and commercial software tools available with the capability to generate optimized meshes.  

# Note  

In most cases the atoms created in mesh style will become an immobile or rigid object that would not be time integrated or moved by fix move or fix rigid. For computational efficiency and to avoid undesired contributions to pressure and potential energy due to close contacts, it is usually beneficial to exclude computing interactions between the created particles using neigh_modify exclude.  

Individual atoms are inserted by this command, unless the mol keyword is used. It specifies a template- $.I D$ previously defined using the molecule command, which reads a file that defines the molecule. The coordinates, atom types, charges, etc, as well as any bond/angle/etc and special neighbor information for the molecule can be specified in the molecule file. See the molecule command for details. The only settings required to be in this file are the coordinates and types of atoms in the molecule.  

![](images/6fbf4f1fa60d3ed8220cf79eb0afa5e7386c92f37c7e40d6e2f26ea3ecd80083.jpg)  

# Note  

If you are using the mol keyword in combination with the atom style template command, they must use the same molecule template-ID.  

Using a lattice to add molecules, e.g. via the box or region or single styles, is exactly the same as adding atoms on lattice points, except that entire molecules are added at each point, i.e. on the point defined by each basis atom in the unit cell as it tiles the simulation box or region. This is done by placing the geometric center of the molecule at the lattice point, and (by default) giving the molecule a random orientation about the point. The random seed specified with the mol keyword is used for this operation, and the random numbers generated by each processor are different. This means the coordinates of individual atoms (in the molecules) will be different when running on different numbers of processors, unlike when atoms are being created in parallel.  

Note that with random rotations, it may be important to use a lattice with a large enough spacing that adjacent molecules will not overlap, regardless of their relative orientations. See the description of the rotate keyword below, which overrides the default random orientation and inserts all molecules at a specified orientation.  

# Note  

If the create_box command is used to create the simulation box, followed by the create_atoms command with its mol option for adding molecules, then you typically need to use the optional keywords allowed by the create_box command for extra bonds (angles,etc) or extra special neighbors. This is because by default, the create_box command sets up a non-molecular system that does not allow molecules to be added.  

This is the meaning of the other optional keywords.  

The basis keyword is only used when atoms (not molecules) are being created. It specifies an atom type that will be assigned to specific basis atoms as they are created. See the lattice command for specifics on how basis atoms are defined for the unit cell of the lattice. By default, all created atoms are assigned the argument type as their atom type.  

The ratio and subset keywords can be used in conjunction with the box or region styles to limit the total number of particles inserted. The lattice defines a set of Nlatt eligible sites for inserting particles, which may be limited by the region style or the var and set keywords. For the ratio keyword, only the specified fraction of them ( $0\leq f\leq1,$ ) will be assigned particles. For the subset keyword only the specified Nsubset of them will be assigned particles. In both cases the assigned lattice sites are chosen randomly. An iterative algorithm is used that ensures the correct number of particles are inserted, in a perfectly random fashion. Which lattice sites are selected will change with the number of processors used.  

The remap keyword only applies to the single style. If it is set to yes, then if the specified position is outside the simulation box, it will mapped back into the box, assuming the relevant dimensions are periodic. If it is set to $n o$ , no remapping is done and no particle is created if its position is outside the box.  

The var and set keywords can be used together to provide a criterion for accepting or rejecting the addition of an individual atom, based on its coordinates. They apply to all styles except single. The name specified for the var keyword is the name of an equal-style variable that should evaluate to a zero or non-zero value based on one or two or three variables that will store the $x,y_{:}$ , or z coordinates of an atom (one variable per coordinate). If used, these other variables must be internal-style variables defined in the input script; their initial numeric value can be anything. They must be internal-style variables, because this command resets their values directly. The set keyword is used to identify the names of these other variables, one variable for the $x$ -coordinate of a created atom, one for $y$ , and one for z.  

When an atom is created, its $(x,y,z)$ coordinates become the values for any set variable that is defined. The var variable is then evaluated. If the returned value is 0.0, the atom is not created. If it is non-zero, the atom is created.  

As an example, these commands can be used in a 2d simulation, to create a sinusoidal surface. Note that the surface is “rough” due to individual lattice points being “above” or “below” the mathematical expression for the sinusoidal curve. If a finer lattice were used, the sinusoid would appear to be “smoother”. Also note the use of the “xlat” and “ylat” thermo_style keywords, which converts lattice spacings to distance.  

![](images/8e7afe5dec1607bd372a5655f73c575971454f380044e77b1ff5d0132a10720e.jpg)  

dimension 2   
variable x equal 100   
variable y equal 25   
lattice hex 0.8442   
region box block 0 \$x 0 \$y -0.5 0.5   
create_box 1 box   
variable xx internal 0.0   
variable yy internal 0.0   
variable v equal "(0.2\*v_y\*ylat \* cos(v_xx/xlat \* 2.0\*PI\*4.0/v_x) + 0.5\*v_y\*ylat - v_yy) > 0.0"   
create_atoms 1 box var v set x xx set y yy   
write_dump all atom sinusoid.lammpstrj  

The rotate keyword allows specification of the orientation at which molecules are inserted. The axis of rotation is determined by the rotation vector $(R_{x},R_{y},R_{z})$ that goes through the insertion point. The specified theta determines the angle of rotation around that axis. Note that the direction of rotation for the atoms around the rotation axis is consistent with the right-hand rule: if your right-hand’s thumb points along $R$ , then your fingers wrap around the axis in the direction of rotation.  

The radscale keyword only applies to the mesh style and adjusts the radius of created particles (see above), provided this is supported by the atom style. Its value is a prefactor (must be $>0.0$ , default is 1.0) that is applied to the atom radius inferred from the size of the individual triangles in the triangle mesh that the particle corresponds to.  

Added in version 2Jun2022.  

The overlap keyword only applies to the random style. It prevents newly created particles from being created closer than the specified Doverlap distance from any other particle. If particles have finite size (see atom_style sphere for example) Doverlap should be specified large enough to include the particle size in the non-overlapping criterion. If molecules are being randomly inserted, then an insertion is only accepted if each particle in the molecule meets the overlap criterion with respect to other particles (not including particles in the molecule itself).  

![](images/6b4b452299cd38238c85853f4e90499ff3cd84af4b56afe89425776be95e03f3.jpg)  

# Note  

Checking for overlaps is a costly $\mathcal{O}(N(N{+}M))$ operation for inserting $N$ new particles into a system with $M$ existing particles. This is because distances to all $M$ existing particles are computed for each new particle that is added. Thus the intended use of this keyword is to add relatively small numbers of particles to systems that remain at a relatively low density even after the new particles are created. Careful use of the maxtry keyword in combination with overlap is recommended. See the discussion above about systems with overlapped particles for alternate strategies that allow for overlapped insertions.  

Added in version 2Jun2022.  

The maxtry keyword only applies to the random style. It limits the number of attempts to generate valid coordinates for a single new particle that satisfy all requirements imposed by the region, var, and overlap keywords. The default is 10 attempts per particle before the loop over the requested $N$ particles advances to the next particle. Note that if insertion success is unlikely (e.g., inserting new particles into a dense system using the overlap keyword), setting the maxtry keyword to a large value may result in this command running for a long time.  

Here is an example for the random style using these commands  

units lj   
dimension 2   
region box block 0 50 0 50 -0.5 0.5   
create_box 1 box   
create_atoms 1 random 2000 13487 NULL overlap 1.0 maxtry 50   
pair_style lj/cut 2.5   
pair_coeff 1 1 1.0 1.0 2.5  

![](images/510b25a3b1831a59b310ede116383f9ec62686f6015c0eb020323e89610e6990.jpg)  

to produce a system as shown in the image with 1520 particles (out of 2000 requested) that are moderately dense and which have no overlaps sufficient to prevent the LJ pair_style from running properly (because the overlap criterion is 1.0). The create_atoms command ran for $0.3\mathrm{~s~}$ on a single CPU core.  

The units keyword determines the meaning of the distance units used by parameters for various styles. A box value selects standard distance units as defined by the units command (e.g., $\textrm{\AA}$ for units $=$ real or metal. A lattice value means the distance units are in lattice spacings. These are affected settings:  

• for single style: coordinates of the particle created • for random style: overlap distance Doverlap by the overlap keyword • for mesh style: bisect threshold value for meshmode $=$ bisect • for mesh style: radthresh value for meshmode $=$ bisect • for mesh style: density value for meshmode $=$ qrand  

Since density represents an area (distance $\wedge_{2}$ ), the lattice spacing factor is also squared.  

Atom IDs are assigned to created atoms in the following way. The collection of created atoms are assigned consecutive IDs that start immediately following the largest atom ID existing before the create_atoms command was invoked. This is done by the processor’s communicating the number of atoms they each own, the first processor numbering its atoms from 1 to $N_{1}$ , the second processor from $N_{1}+1$ to $N_{2}$ , and so on, where $N_{1}$ is the number of atoms owned by the first processor, $N_{2}$ is the number owned by the second processor, and so forth. Thus, when the same simulation is performed on different numbers of processors, there is no guarantee a particular created atom will be assigned the same ID in both simulations. If molecules are being created, molecule IDs are assigned to created molecules in a similar fashion.  

Aside from their ID, atom type, and xyz position, other properties of created atoms are set to default values, depending on which quantities are defined by the chosen atom style. See the atom style command for more details. See the set and velocity commands for info on how to change these values.  

• charge $=0.0$   
• dipole moment magnitude $=0.0$   
• diameter $=1.0$   
• shape = 0.0 0.0 0.0   
• density $=1.0$   
• volume $=1.0$   
• velocity $=0.00.00.0$ angular velocity $=0.00.00.0$   
angular momentum $=0.00.00.0$   
quaternion $\mathbf{\Phi}=(1,0,0,0)$   
• bonds, angles, dihedrals, impropers $=$ none  

If molecules are being created, these defaults can be overridden by values specified in the file read by the molecule command. That is, the file typically defines bonds (angles, etc.) between atoms in the molecule, and can optionally define charges on each atom.  

Note that the sphere atom style sets the default particle diameter to 1.0 as well as the density. This means the mass for the particle is not 1.0, but is $\textstyle{\frac{\pi}{6}}d^{3}=0.5236$ , where $d$ is the diameter. When using the mesh style, the particle diameter is adjusted from the size of the individual triangles in the triangle mesh.  

Note that the ellipsoid atom style sets the default particle shape to (0.0 0.0 0.0) and the density to 1.0, which means it is a point particle, not an ellipsoid, and has a mass of 1.0.  

Note that the peri style sets the default volume and density to 1.0 and thus also set the mass for the particle to 1.0.  

The set command can be used to override many of these default settings.  

# 1.17.4 Restrictions  

An atom_style must be previously defined to use this command.  

A rotation vector specified for a single molecule must be in the z-direction for a 2d model.  

For molecule templates that are created from multiple files, i.e. contain multiple molecule sets, only the first set is used. To create multiple molecules the files currently need to be merged and different molecule IDs assigned with a Molecules section.  

# 1.17.5 Related commands  

lattice, region, create_box, read_data, read_restart  

# 1.17.6 Default  

The default for the basis keyword is that all created atoms are assigned the argument type as their atom type (when single atoms are being created). The other defaults are remap $=$ no, rotate $=$ random, radscale $=1.0$ , radthresh $=$ $\mathbf{X}$ -lattice spacing, overlap not checked, $m a x t r y=10$ , and units $=$ lattice.  

(Roberts) R. Roberts (2019) “Evenly Distributing Points in a Triangle.” Extreme Learning. http://extremelearning. com.au/evenly-distributing-points-in-a-triangle/  

# 1.18 create_bonds command  

# 1.18.1 Syntax  

create_bonds style args ... keyword value ...  

• style $=$ many or single/bond or single/angle or single/dihedral or single/improper  

many args $=$ group-ID group2-ID btype rmin rmax group-ID = ID of first group group2-ID = ID of second group, bonds will be between atoms in the 2 groups btype = bond type of created bonds rmin = minimum distance between pair of atoms to bond together rmax = maximum distance between pair of atoms to bond together   
single/bond args $-$ btype batom1 batom2 btype = bond type of new bond batom1,batom2 = atom IDs for two atoms in bond   
single/angle args = atype aatom1 aatom2 aatom3 atype = angle type of new angle aatom1,aatom2,aatom3 = atom IDs for three atoms in angle   
single/dihedral args $=$ dtype datom1 datom2 datom3 datom4 dtype $=$ dihedral type of new dihedral datom1,datom2,datom3,datom $4=$ atom IDs for four atoms in dihedral   
single/improper args $=$ itype iatom1 iatom2 iatom3 iatom4 itype $=$ improper type of new improper iatom1,iatom2,iatom3,iatom $4=$ atom IDs for four atoms in improper • zero or more keyword/value pairs may be appended • keyword $=$ special   
special value $\mathrm{~\ensuremath~{~\mu~}~}=\mathrm{yes}$ or no  

# 1.18. create_bonds command  

# 1.18.2 Examples  

<html><body><table><tr><td>create bonds many all all 1 1.0 1.2</td></tr><tr><td>create bonds surf solvent 3 2.0 2.4</td></tr><tr><td>many create bonds single e/bond 1 1 2</td></tr><tr><td>bonds single create angle 5 52 98 107 s special lno</td></tr><tr><td>create bonds single dihedral2 419 27 101</td></tr><tr><td>create bonds single improper 3 23 26 31 57</td></tr></table></body></html>  

# 1.18.3 Description  

Create bonds between pairs of atoms that meet a specified distance criteria. Or create a single bond, angle, dihedral or improper between 2, 3, or 4 specified atoms.  

The new bond (angle, dihedral, improper) interactions will then be computed during a simulation by the bond (angle, dihedral, improper) potential defined by the bond_style, bond_coeff , angle_style, angle_coeff , dihedral_style, dihedral_coeff , improper_style, improper_coeff commands.  

The many style is useful for adding bonds to a system (e.g., between nearest neighbors in a lattice of atoms) without having to enumerate all the bonds in the data file read by the read_data command.  

The single styles are useful for adding bonds, angles, dihedrals, and impropers to a system incrementally, then continuing a simulation.  

Note that this command does not auto-create any angle, dihedral, or improper interactions when a bond is added, nor does it auto-create any bonds when an angle, dihedral, or improper is added. It also will not auto-create any angles when a dihedral or improper is added. Thus, the flexibility of this command is limited. It can be used several times to create different types of bond at different distances, but it cannot typically auto-create all the bonds or angles or dihedrals or impropers that would normally be defined in a data file for a complex system of molecules.  

# Note  

If the system has no bonds (angles, dihedrals, impropers) to begin with, or if more bonds per atom are being added than currently exist, then you must ensure that the number of bond types and the maximum number of bonds per atom are set to large enough values, and similarly for angles, dihedrals, impropers, and special neighbors, otherwise an error may occur when too many bonds (angles, dihedrals, impropers) are added to an atom. If the read_data command is used to define the system, these parameters can be set via its optional extra/bond/types, extra/bond/per/atom, and similar keywords to the command. If the create_box command is used to define the system, these two parameters can be set via its optional bond/types and extra/bond/per/atom arguments, and similarly for angles, dihedrals, and impropers. See the corresponding documentation pages for these two commands for details.  

The many style will create bonds between pairs of atoms $I,J$ , where $I$ is in one of the two specified groups and $J$ is in the other. The two groups can be the same (e.g., group “all”). The created bonds will be of bond type btype, where btype must be a value between 1 and the number of bond types defined.  

For a bond to be created, an $I,J$ pair of atoms must be a distance $D$ apart such that $r_{\operatorname*{min}}\le D\le r_{\operatorname*{max}}$ .  

The following settings must have been made in an input script before the many style is used:  

special_bonds weight for 1–2 interactions must be 0.0   
• a pair_style must be defined   
• no kspace_style defined   
• minimum pair_style cutoff $^+$ neighbor skin ≥ rmax  

These settings are required so that a neighbor list can be created to search for nearby atoms. Pairs of atoms that are already bonded cannot appear in the neighbor list, to avoid creation of duplicate bonds. The neighbor list for all atom type pairs must also extend to a distance that encompasses the rmax for new bonds to create. When using periodic boundary conditions, the box length in each periodic dimension must be larger than rmax, so that no bonds are created between the system and its own periodic image.  

# Note  

If you want to create bonds between pairs of 1–3 or 1–4 atoms in the current bond topology, then you need to use special_bonds lj 0 1 1 to ensure those pairs appear in the neighbor list. They will not appear with the default special_bonds settings, which are zero for 1–2, 1–3, and 1–4 atoms. 1–3 or 1–4 atoms are those which are two hops or three hops apart in the bond topology.  

An additional requirement for this style is that your system must be ready to perform a simulation. This means, for example, that all pair_style coefficients be set via the pair_coeff command. A bond_style command and all bond coefficients must also be set, even if no bonds exist before this command is invoked. This is because the building of neighbor list requires initialization and setup of a simulation, similar to what a run command would require.  

Note that you can change any of these settings after this command executes (e.g., if you wish to use long-range Coulombic interactions) via the kspace_style command for your subsequent simulation.  

The single/bond style creates a single bond of type btype between two atoms with IDs batom1 and batom2. Btype must be a value between 1 and the number of bond types defined.  

The single/angle style creates a single angle of type atype between three atoms with IDs aatom1, aatom2, and aatom3. The ordering of the atoms is the same as in the Angles section of a data file read by the read_data command (i.e., the three atoms are ordered linearly within the angle; the central atom is aatom2). Atype must be a value between 1 and the number of angle types defined.  

The single/dihedral style creates a single dihedral of type dtype between four atoms with IDs datom1, datom2, datom3, and datom4. The ordering of the atoms is the same as in the Dihedrals section of a data file read by the read_data command. I.e. the 4 atoms are ordered linearly within the dihedral. dtype must be a value between 1 and the number of dihedral types defined.  

The single/improper style creates a single improper of type itype between four atoms with IDs iatom1, iatom2, iatom3, and iatom4. The ordering of the atoms is the same as in the Impropers section of a data file read by the read_data command. I.e. the 4 atoms are ordered linearly within the improper. itype must be a value between 1 and the number of improper types defined.  

The keyword special controls whether an internal list of special bonds is created after one or more bonds, or a single angle, dihedral, or improper is added to the system.  

The default value is yes. A value of no cannot be used with the many style.  

This is an expensive operation since the bond topology for the system must be walked to find all 1–2, 1–3, and 1–4 interactions to store in an internal list, which is used when pairwise interactions are weighted; see the special_bonds command for details.  

Thus if you are adding a few bonds or a large list of angles all at the same time, by using this command repeatedly, it is more efficient to only trigger the internal list to be created once, after the last bond (or angle, or dihedral, or improper) is added:  

# 1.18. create_bonds command  

create_bonds single/bond 5 52 98 special no create_bonds single/bond 5 73 74 special no create_bonds single/bond 5 17 386 special no create_bonds single/bond 4 112 183 special yes  

Note that you must ensure the internal list is rebuilt after the last bond (angle, dihedral, improper) is added, before performing a simulation. Otherwise, pairwise interactions will not be properly excluded or weighted. LAMMPS does not check that you have done this correctly.  

# 1.18.4 Restrictions  

This command cannot be used with molecular systems defined using molecule template files via the molecule and atom_style template commands.  

For style many, no kspace style must be defined. Also, the rmax value must be smaller than any periodic box length and the neighbor list cutoff (largest pair cutoff plus neighbor skin).  

# 1.18.5 Related commands  

create_atoms, delete_bonds  

# 1.18.6 Default  

The keyword default is special $=$ yes.  

# 1.19 create_box command  

# 1.19.1 Syntax  

create_box N region-ID keyword value ...   
create_box N NULL alo ahi blo bhi clo chi keyword value ...   
• $\Nu=\#$ of atom types to use in this simulation   
• region- $\mathrm{{\cdot}I D=I D}$ of region to use as simulation domain or NULL for general triclinic box   
• alo,ahi,blo,bhi,clo,chi $=$ multipliers on a1,a2,a3 vectors defined by lattice command (only when region- $\mathrm{~ID=~}$ NULL)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ bond/types or angle/types or dihedral/types or improper/types or extra/bond/per/atom or extra/angle/per/atom or extra/dihedral/per/atom or extra/improper/per/atom or extra/special/per/atom bond/types value $=\#$ of bond types angle/types value $=\#$ of angle types dihedral/types value $=\#$ of dihedral types improper/types value = # of improper types extra/bond/per/atom value = # of bonds per atom extra/angle/per/atom value = # of angles per atom extra/dihedral/per/atom value = # of dihedrals per atom extra/improper/per/atom value = # of impropers per atom extra/special/per/atom value = # of special neighbors per atom  

# 1.19.2 Examples  

# orthogonal or restricted triclinic box using regionID = mybox create_box 2 mybox create_box 2 mybox bond/types 2 extra/bond/per/atom 1  

# 2d general triclinic box using primitive cell for 2d hex lattice lattice custom 1.0 a1 1.0 0.0 0.0 a2 0.5 0.86602540378 0.0 & a3 0.0 0.0 1.0 basis 0.0 0.0 0.0 triclinic/general create_box 1 NULL 0 5 0 5 -0.5 0.5  

# 3d general triclinic box using primitive cell for 3d fcc lattice   
lattice custom 1.0 a2 0.0 0.5 0.5 a1 0.5 0.0 0.5 a3 0.5 0.5 0.0 basis 0.0 0.0 0.0 triclinic/general   
create box 1 NULL -5 5 -10 10 0 20  

# 1.19.3 Description  

This command creates a simulation box. It also partitions the box into a regular 3d grid of smaller sub-boxes, one per processor (MPI task). The geometry of the partitioning is based on the size and shape of the simulation box, the number of processors being used and the settings of the processors command. The partitioning can later be changed by the balance or fix balance commands.  

Simulation boxes in LAMMPS can be either orthogonal or triclinic in shape. Orthogonal boxes are a brick in 3d (rectangle in 2d) with 6 faces that are each perpendicular to one of the standard xyz coordinate axes. Triclinic boxes are a parallelepiped in 3d (parallelogram in 2d) with opposite pairs of faces parallel to each other. LAMMPS supports two forms of triclinic boxes, restricted and general, which differ in how the box is oriented with respect to the xyz coordinate axes. See the Howto triclinic for a detailed description of all 3 kinds of simulation boxes.  

The argument $N$ is the number of atom types that will be used in the simulation.  

Orthogonal and restricted triclinic boxes are created by specifying a region ID previously defined by the region command. General triclinic boxes are discussed below.  

If the region is not of style prism, then LAMMPS encloses the region (block, sphere, etc.) with an axis-aligned orthogonal bounding box which becomes the simulation domain. For a 2d simulation, the zlo and zhi values of the simulation box must straddle zero.  

If the region is of style prism, LAMMPS creates a non-orthogonal simulation domain shaped as a parallelepiped with triclinic symmetry. As defined by the region prism command, the parallelepiped has an “origin” at (xlo,ylo,zlo) and three edge vectors starting from the origin given by $\vec{a}=(x_{\mathrm{hi}}-x_{\mathrm{lo}},0,0)$ ; $\vec{b}=(x y,y_{\mathrm{hi}}-y_{\mathrm{lo}},\overset{\leftarrow}{0})$ ; and $\vec{c}=(x z,y z,z_{\mathrm{hi}}-$ $z_{\mathrm{lo.}}$ ). In LAMMPS lingo, this is a restricted triclinic box because the three edge vectors cannot be defined in arbitrary (general) directions. The parameters $x y,x z$ , and $y z$ can be 0.0 or positive or negative values and are called “tilt factors” because they are the amount of displacement applied to faces of an originally orthogonal box to transform it into the parallelepiped. For a 2d simulation, the zlo and zhi values of the simulation box must straddle zero.  

Typically a prism region used with the create_box command should have tilt factors $(x y,x z,y z)$ that do not skew the box more than half the distance of the parallel box length. For example, if $x_{\mathrm{lo}}=2$ and $x_{\mathrm{hi}}=12$ , then the $x$ box length is 10 and the $x y$ tilt factor must be between $^{-5}$ and 5. Similarly, both $x z$ and $y z$ must be between $-(x_{\mathrm{hi}}-x_{\mathrm{lo}})/2$ and $+(y_{\mathrm{hi}}-y_{\mathrm{lo}})/2$ . Note that this is not a limitation, since if the maximum tilt factor is 5 (as in this example), then configurations with tilt $=\dots,-15,-5,5,15,25,\dots.$ are all geometrically equivalent.  

LAMMPS will issue a warning if the tilt factors of the created box do not meet this criterion. This is because simulations with large tilt factors may run inefficiently, since they require more ghost atoms and thus more communication. With very large tilt factors, LAMMPS may eventually produce incorrect trajectories and stop with errors due to lost atoms or similar issues.  

See the Howto triclinic page for geometric descriptions of triclinic boxes and tilt factors, as well as how to transform the restricted triclinic parameters to and from other commonly used triclinic representations.  

When a prism region is used, the simulation domain should normally be periodic in the dimension that the tilt is applied to, which is given by the second dimension of the tilt factor (e.g., y for xy tilt). This is so that pairs of atoms interacting across that boundary will have one of them shifted by the tilt factor. Periodicity is set by the boundary command. For example, if the xy tilt factor is non-zero, then the y dimension should be periodic. Similarly, the $z$ dimension should be periodic if $x z$ or $y z$ is non-zero. LAMMPS does not require this periodicity, but you may lose atoms if this is not the case.  

Note that if your simulation will tilt the box (e.g., via the fix deform command), the simulation box must be created as triclinic, even if the tilt factors are initially 0.0. You can also change an orthogonal box to a triclinic box or vice versa by using the change box command with its ortho and triclinic options.  

#  Note  

If the system is non-periodic (in a dimension), then you should not make the lo/hi box dimensions (as defined in your region command) radically smaller/larger than the extent of the atoms you eventually plan to create (e.g., via the create_atoms command). For example, if your atoms extend from 0 to 50, you should not specify the box bounds as $-10000$ and 10000. This is because as described above, LAMMPS uses the specified box size to lay out the 3d grid of processors. A huge (mostly empty) box will be sub-optimal for performance when using “fixed” boundary conditions (see the boundary command). When using “shrink-wrap” boundary conditions (see the boundary command), a huge (mostly empty) box may cause a parallel simulation to lose atoms the first time that LAMMPS shrink-wraps the box around the atoms.  

As noted above, general triclinic boxes in LAMMPS allow the box to have arbitrary edge vectors A, B, C. The only restrictions are that the three vectors be distinct, non-zero, and not co-planar. They must also define a right-handed system such that $\left(\mathbf{A}\thinspace\mathbf{X}\thinspace\mathbf{B}\right)$ points in the direction of C. Note that a left-handed system can be converted to a right-handed system by simply swapping the order of any pair of the A, B, C vectors.  

To create a general triclinic boxes, the region is specified as NULL and the next 6 parameters (alo,ahi,blo,bhi,clo,chi) define the three edge vectors A, B, C using additional information previously defined by the lattice command.  

The lattice must be of style custom and use its triclinic/general option. This insures the lattice satisfies the restrictions listed above. The a1, $^{*}a2$ , a3 settings of the lattice command define the edge vectors of a unit cell of the general triclinic lattice. This command uses them to define the three edge vectors and origin of the general triclinic box as:  

• A = (ahi-alo) \* a1   
• B = (bhi-blo) \* a2   
• C = (chi-clo) \* a3   
$\bullet\mathrm{origin}=(\mathrm{alo^{\ast}a l}+\mathrm{blo^{\ast}a2}+\mathrm{clo^{\ast}a3})$  

For 2d general triclinic boxes, $\mathrm{clo}=-0.5\$ and $\mathrm{chi}=0.5$ is required.  

# Note  

LAMMPS allows specification of general triclinic simulation boxes as a convenience for users who may be converting data from solid-state crystallographic representations or from DFT codes for input to LAMMPS. However, as explained on the Howto_triclinic doc page, internally, LAMMPS only uses restricted triclinic simulation boxes. This means the box defined by this command and per-atom information (e.g. coordinates, velocities) defined by the create_atoms command are converted (rotated) from general to restricted triclinic form when the two commands are invoked. The <Howto_triclinic>\` doc page also discusses other LAMMPS commands which can input/output general triclinic representations of the simulation box and per-atom data.  

The optional keywords can be used to create a system that allows for bond (angle, dihedral, improper) interactions, or for molecules with special 1–2, 1–3, or 1–4 neighbors to be added later. These optional keywords serve the same purpose as the analogous keywords that can be used in a data file which are recognized by the read_data command when it sets up a system.  

Note that if these keywords are not used, then the create_box command creates an atomic (non-molecular) simulation that does not allow bonds between pairs of atoms to be defined, or a bond potential to be specified, or for molecules with special neighbors to be added to the system by commands such as create_atoms mol, fix deposit or fix pour.  

As an example, see the examples/deposit/in.deposit.molecule script, which deposits molecules onto a substrate. Initially there are no molecules in the system, but they are added later by the fix deposit command. The create_box command in the script uses the bond/types and extra/bond/per/atom keywords to allow this. If the added molecule contained more than one special bond (allowed by default), an extra/special/per/atom keyword would also need to be specified.  

# 1.19.4 Restrictions  

An atom_style and region must have been previously defined to use this command.  

# 1.19.5 Related commands  

read_data, create_atoms, region  

# 1.19.6 Default  

none  

# 1.20 delete_atoms command  

# 1.20.1 Syntax  

delete_atoms style args keyword value ...  

• style $=$ group or region or overlap or random or variable  

group args $=$ group-ID   
region args $=$ region-ID   
overlap args $=$ cutoff group1-ID group2-ID cutoff $=$ delete one atom from pairs of atoms within the cutoff (distance units) group1-ID = one atom in pair must be in this group group2-ID = other atom in pair must be in this group   
random args = ranstyle value eflag group-ID region-ID seed ranstyle = fraction or count for fraction: value = fraction (0.0 to 1.0) of eligible atoms to delete eflag $-$ no for fast approximate deletion, yes for exact deletion for count: value $=$ number of atoms to delete eflag = no for warning if count $>$ eligible atoms, yes for error  

# 1.20. delete_atoms command  

group-ID $=$ group within which to perform deletions region-ID $=$ region within which to perform deletions or NULL to only impose the group criterion seed $=$ random number seed (positive integer) variable args $=$ variable-name  

• zero or more keyword/value pairs may be appended • keyword $=$ compress or bond or mol  

compress value $=\mathrm{no}$ or yes bond value $=\mathrm{no}$ or yes mol value $=$ no or yes  

# 1.20.2 Examples  

delete_atoms group edge   
delete_atoms region sphere compress no   
delete_atoms overlap 0.3 all all   
delete_atoms overlap 0.5 solvent colloid   
delete_atoms random fraction 0.1 yes all cube 482793 bond yes   
delete_atoms random fraction 0.3 no polymer NULL 482793 bond yes   
delete_atoms random count 500 no ions NULL 482793   
delete_atoms variable checkers  

# 1.20.3 Description  

Delete the specified atoms. This command can be used, for example, to carve out voids from a block of material or to delete created atoms that are too close to each other (e.g., at a grain boundary).  

For style group, all atoms belonging to the group are deleted.  

For style region, all atoms in the region volume are deleted. Additional atoms can be deleted if they are in a molecule for which one or more atoms were deleted within the region; see the mol keyword discussion below.  

For style overlap pairs of atoms whose distance of separation is within the specified cutoff distance are searched for, and one of the two atoms is deleted. Only pairs where one of the two atoms is in the first group specified and the other atom is in the second group are considered. The atom that is in the first group is the one that is deleted.  

Note that it is OK for the two group IDs to be the same (e.g., group all), or for some atoms to be members of both groups. In these cases, either atom in the pair may be deleted. Also note that if there are atoms which are members of both groups, the only guarantee is that at the end of the deletion operation, enough deletions will have occurred that no atom pairs within the cutoff will remain (subject to the group restriction). There is no guarantee that the minimum number of atoms will be deleted, or that the same atoms will be deleted when running on different numbers of processors.  

For style random a subset of eligible atoms are deleted. Which atoms to delete are chosen randomly using the specified random number seed. Which atoms are deleted may vary when running on different numbers of processors.  

For ranstyle $=$ fraction, the specified fractional value (0.0 to 1.0) of eligible atoms are deleted. If eflag is set to no, then the number of deleted atoms will be approximate, but the operation will be fast. If eflag is set to yes, then the number deleted will match the requested fraction, but for large systems the selection of deleted atoms may take additional time to determine.  

For ransty $l e=c o u n t$ , the specified integer value is the number of eligible atoms are deleted. If eflag is set to no, then if the requested number is larger then the number of eligible atoms, a warning is issued and only the eligible atoms are deleted instead of the requested value. If eflag is set to yes, an error is triggered instead and LAMMPS will exit. For large systems the selection of atoms to delete may take additional time to determine, the same as for requesting an exact fraction with pstyle $\l=\l.$ fraction.  

Which atoms are eligible for deletion for style random is determined by the specified group- $\cdot I D$ and region- $I D$ . To be eligible, an atom must be in both the specified group and region. If group- $.I D=$ all, there is effectively no group criterion. If region- $\mathbf{\nabla}\cdot I D$ is specified as NULL, no region criterion is imposed.  

Added in version 4May2022.  

For style variable, all atoms for which the atom-style variable with the given name evaluates to non-zero will be deleted. Additional atoms can be deleted if they are in a molecule for which one or more atoms were deleted within the region; see the mol keyword discussion below. This option allows complex selections of atoms not covered by the other options listed above.  

Here is the meaning of the optional keywords.  

If the compress keyword is set to yes, then after atoms are deleted, then atom IDs are re-assigned so that they run from 1 to the number of atoms in the system. Note that this is not done for molecular systems (see the atom_style command), regardless of the compress setting, since it would foul up the bond connectivity that has already been assigned. However, the reset_atoms id command can be used after this command to accomplish the same thing.  

Note that the re-assignment of IDs is not really a compression, where gaps in atom IDs are removed by decrementing atom IDs that are larger. Instead the IDs for all atoms are erased, and new IDs are assigned so that the atoms owned by individual processors have consecutive IDs, as the create_atoms command explains.  

A molecular system with fixed bonds, angles, dihedrals, or improper interactions, is one where the topology of the interactions is typically defined in the data file read by the read_data command, and where the interactions themselves are defined with the bond_style, angle_style, etc. commands. If you delete atoms from such a system, you must be careful not to end up with bonded interactions that are stored by remaining atoms but which include deleted atoms. This will cause LAMMPS to generate a “missing atoms” error when the bonded interaction is computed. The bond and mol keywords offer two ways to do that.  

It the bond keyword is set to yes then any bond or angle or dihedral or improper interaction that includes a deleted atom is also removed from the lists of such interactions stored by non-deleted atoms. Note that simply deleting interactions due to dangling bonds (e.g., at a surface) may result in a inaccurate or invalid model for the remaining atoms.  

It the mol keyword is set to yes, then for every atom that is deleted, all other atoms in the same molecule (with the same molecule ID) will also be deleted. This is not done for atoms with molecule $\mathrm{ID}=0$ , since such an ID is assumed to flag isolated atoms that are not part of molecules.  

![](images/c4cb92325d72b81278b87b109f58303f48b7af28d1ea0c4e0f2cc7b848e76a3c.jpg)  

# Note  

The molecule deletion operation is invoked after all individual atoms have been deleted using the rules described above for each style. This means additional atoms may be deleted that are not in the group or region, that are not required by the overlap cutoff criterion, or that will create a higher fraction of porosity than was requested.  

# 1.20.4 Restrictions  

The overlap styles requires inter-processor communication to acquire ghost atoms and build a neighbor list. This means that your system must be ready to perform a simulation before using this command (force fields setup, atom masses set, etc.). Since a neighbor list is used to find overlapping atom pairs, it also means that you must define a pair style with the minimum force cutoff distance between any pair of atoms types (plus the neighbor skin) $\geq$ the specified overlap cutoff.  

If the special_bonds command is used with a setting of 0, then a pair of bonded atoms (1–2, 1–3, or 1–4) will not appear in the neighbor list, and thus will not be considered for deletion by the overlap styles. You probably do not want to delete one atom in a bonded pair anyway.  

The bond yes option cannot be used with molecular systems defined using molecule template files via the molecule and atom_style template commands.  

# 1.20.5 Related commands  

create_atoms, reset_atoms id  

# 1.20.6 Default  

The option defaults are compress $=$ yes, bond $=$ no, $\mathrm{mol}=\mathrm{no}$ .  

# 1.21 delete_bonds command  

# 1.21.1 Syntax  

delete_bonds group-ID style arg keyword ...  

• group-ID $=$ group ID  

• style $=$ multi or atom or bond or angle or dihedral or improper or stats  

multi arg $=$ none   
atom $\mathrm{arg}=\mathrm{an}$ atom type or range of types (see below)   
bond $\mathrm{arg}=\mathrm{a}$ bond type or range of types (see below)   
angle $\mathrm{arg}=\mathrm{an}$ angle type or range of types (see below)   
dihedral $\mathrm{arg}=\mathrm{a}$ dihedral type or range of types (see below)   
improper $\mathrm{arg}=\mathrm{an}$ improper type or range of types (see below)   
stats $\mathrm{arg}=\mathrm{none}$  

• zero or more keywords may be appended • keyword $=$ any or undo or remove or special  

any $\mathrm{arg}=\mathrm{none}=\mathrm{turn}$ off interactions if any atoms are in the group (or on if undo is also used)   
undo $\mathrm{arg}=\mathrm{none}=\mathrm{turn}$ specified bonds on instead of off   
remove arg $=$ permanently remove bonds that have been turned off   
special arg $=$ recompute pairwise 1-2, 1-3, and 1-4 lists  

# 1.21.2 Examples  

<html><body><table><tr><td>delete bonds frozen multi remove</td><td></td></tr><tr><td>delete _bonds all atom 4 special</td><td></td></tr><tr><td>delete bonds all bond 0*3 special</td><td></td></tr><tr><td>delete bonds all stats</td><td></td></tr><tr><td></td><td></td></tr><tr><td>labelmap atom 4 hc</td><td></td></tr><tr><td>delete bonds all atom hc special</td><td></td></tr></table></body></html>  

# 1.21.3 Description  

Turn off (or on) molecular topology interactions (i.e., bonds, angles, dihedrals, and/or impropers). This command is useful for deleting interactions that have been previously turned off by bond-breaking potentials. It is also useful for turning off topology interactions between frozen or rigid atoms. Pairwise interactions can be turned off via the neigh_modify exclude command. The fix shake command also effectively turns off certain bond and angle interactions.  

For all styles, by default, an interaction is only turned off (or on) if all the atoms involved are in the specified group.   
See the any keyword to change the behavior.  

# $\Theta$ Possible errors caused by using delete_bonds  

Since this command by default only turns off bonded interactions, their definitions are still present and subject to the limitations due to LAMMPS’ domain decomposition based parallelization. That is, when a bond is turned off, the two constituent atoms may move apart and may reach a distance where they can lead to a “bond atoms missing” error and crash the simulation. Adding the remove keyword (see below) is required to fully remove those interactions and prevent the error.  

Several of the styles (atom, bond, angle, dihedral, improper) take a type as an argument. The specified type can be a type label. Otherwise, the type should be an integer from 0 to $N$ , where $N$ is the number of relevant types (atom types, bond types, etc.). A value of 0 is only relevant for style bond; see details below. For numeric types, a wildcard asterisk can be used in place of or in conjunction with the type argument to specify a range of types. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $\mathbf{\hat{\Pi}}^{\leftarrow}\mathbf{m}^{*}{\hat{\mathbf{\Pi}}}^{,}$ or $\ '_{\mathrm{m}}\ast_{\mathrm{n}}\cdots$ . If $N$ is the number of types, then an asterisk with no numeric values means all types from 0 to $N$ . A leading asterisk means all types from 0 to n (inclusive). A trailing asterisk means all types from m to $\mathbf{N}$ (inclusive). A middle asterisk means all types from m to $\boldsymbol{\mathrm n}$ (inclusive). Note that it is fine to include a type of 0 for non-bond styles; it will simply be ignored.  

For style multi all bond, angle, dihedral, and improper interactions of any type, involving atoms in the group, are turned off.  

Style atom is the same as style multi except that in addition, one or more of the atoms involved in the bond, angle, dihedral, or improper interaction must also be of the specified atom type.  

For style bond, only bonds are candidates for turn-off, and the bond must also be of the specified type. Styles angle, dihedral, and improper are treated similarly.  

For style bond, you can set the type to 0 to delete bonds that have been previously broken by a bond-breaking potentia (which sets the bond type to 0 when a bond is broken); for example, see the bond_style quartic command.  

For style stats no interactions are turned off (or on); the status of all interactions in the specified group is simply reported.   
This is useful for diagnostic purposes if bonds have been turned off by a bond-breaking potential during a previous run.  

# Impact on special_bonds processing and exclusions  

The default behavior of the delete_bonds command is to turn off interactions by toggling their type to a negative value, but not to permanently remove the interaction. For example, a bond_type of 2 is set to $^{-2}$ . The neighbor list creation routines will not include such an interaction in their interaction lists. The default is also to not alter the list of 1–2, 1–3, or 1–4 neighbors computed by the special_bonds command and used to weight pairwise force and energy calculations. This means that pairwise computations will proceed as if the bond (or angle, etc.) were still turned on.  

Several keywords can be appended to the argument list to alter the default behaviors.  

The any keyword changes the requirement that all atoms in the bond (angle, etc.) must be in the specified group in order to turn off the interaction. Instead, if any of the atoms in the interaction are in the specified group, it will be turned off (or on if the undo keyword is used).  

The undo keyword inverts the delete_bonds command so that the specified bonds, angles, etc. are turned on if they are currently turned off. This means a negative value is toggled to positive. For example, for style angle, if type is specified as 2, then all angles with current type $=-2$ are reset to type $=2$ . Note that the fix shake command also sets bond and angle types negative, so this option should not be used on those interactions.  

The remove keyword is invoked at the end of the delete_bonds operation. It causes turned-off bonds (angles, etc.) to be removed from each atom’s data structure and then adjusts the global bond (angle, etc.) counts accordingly. Removal is a permanent change; removed bonds cannot be turned back on via the undo keyword. Removal does not alter the pairwise 1–2, 1–3, or 1–4 weighting list.  

The special keyword is invoked at the end of the delete_bonds operation, after (optional) removal. It re-computes the pairwise 1–2, 1–3, 1–4 weighting list. The weighting list computation treats turned-off bonds the same as turned-on. Thus, turned-off bonds must be removed if you wish to change the weighting list.  

![](images/2d3e1baabeed3895dd5b57e88c8125d8571eaf1fa2c40cb2bcdb47dab26993c9.jpg)  

# Note  

The choice of remove and special options affects how 1–2, 1–3, 1–4 pairwise interactions will be computed across bonds that have been modified by the delete_bonds command.  

# 1.21.4 Restrictions  

This command requires inter-processor communication to acquire ghost atoms, to coordinate the deleting of bonds, angles, etc. between atoms shared by multiple processors. This means that your system must be ready to perform a simulation before using this command (force fields setup, atom masses set, etc.). Just as would be needed to run dynamics, the force field you define should define a cutoff (e.g., through a pair_style command) which is long enough for a processor to acquire the ghost atoms its needs to compute bond, angle, etc. interactions.  

If deleted bonds (or angles, etc.) are removed but the 1–2, 1–3, and 1–4 weighting list is not recomputed, this can cause a later fix shake command to fail due to an atom’s bonds being inconsistent with the weighting list. This should only happen if the group used in the fix command includes both atoms in the bond, in which case you probably should be recomputing the weighting list.  

# 1.21.5 Related commands  

neigh_modify exclude, special_bonds, fix shake  

# 1.21.6 Default  

none  

# 1.22 dielectric command  

# 1.22.1 Syntax  

# 1.22.4 Restrictions  

none  

# 1.22.5 Related commands  

pair_style  

# 1.22.6 Default  

# 1.23 dihedral_coeff command  

# 1.23.1 Syntax  

dihedral_coeff N args  

• $\Nu=$ numeric dihedral type (see asterisk form below) or alphanumeric type label • args $=$ coefficients for one or more dihedral types  

# 1.23.2 Examples  

dihedral_coeff 1 80.0 1 3   
dihedral coeff \* 80.0 1 3 0.5   
dihedral coeff 2\* 80.0 1 3 0.5  

labelmap dihedral 1 backbone dihedral_coeff backbone 80.0 1 3  

# 1.23.3 Description  

Specify the dihedral force field coefficients for one or more dihedral types. The number and meaning of the coefficients depends on the dihedral style. Dihedral coefficients can also be set in the data file read by the read_data command or in a restart file.  

$N$ can be specified in one of two ways. An explicit numeric value can be used, as in the first example above. Or $N$ can be an alphanumeric type label, which is a string defined by the labelmap command or in a corresponding section of a data file read by the read_data command.  

For numeric values only, a wild-card asterisk can be used to set the coefficients for multiple dihedral types. This takes the form “\*” or $\mathbf{\overline{{\Omega}}^{6*}\mathbf{\overline{{\Omega}}\mathbf{n}}^{,,}}$ or $\mathbf{\Psi}^{66}\mathbf{n}^{*}{}^{,}$ or $\mathbf{\tilde{\rho}}_{\mathrm{m}}^{*}\mathbf{\tilde{n}}^{,}$ . If $N$ is the number of dihedral types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

Note that using a dihedral_coeff command can override a previous setting for the same dihedral type. For example, these commands set the coeffs for all dihedral types, then overwrite the coeffs for just dihedral type 2:  

<html><body><table><tr><td>dihedral coeff f*80.013</td></tr><tr><td>dihedral  coeff 2 200.0 1 3</td></tr><tr><td></td></tr></table></body></html>  

A line in a data file that specifies dihedral coefficients uses the exact same format as the arguments of the dihedral_coeff command in an input script, except that wild-card asterisks should not be used since coefficients for all $N$ types must be listed in the file. For example, under the “Dihedral Coeffs” section of a data file, the line that corresponds to the first example above would be listed as  

The dihedral_style class2 is an exception to this rule, in that an additional argument is used in the input script to allow specification of the cross-term coefficients. See its doc page for details.  

![](images/232d2c2e8ed696aea036841863c2177d672b94e791911435898e7fb4d84d4ea9.jpg)  

# Note  

When comparing the formulas and coefficients for various LAMMPS dihedral styles with dihedral equations defined by other force fields, note that some force field implementations divide/multiply the energy prefactor $K$ by the multiple number of torsions that contain the $J{-}K$ bond in an $I{-}J{-}K{-}L$ torsion. LAMMPS does not do this (i.e., the listed dihedral equation applies to each individual dihedral). Thus, you need to define $K$ appropriately to account for this difference, if necessary.  

The list of all dihedral styles defined in LAMMPS is given on the dihedral_style doc page. They are also listed in more compact form on the Commands dihedral doc page.  

On either of those pages, click on the style to display the formula it computes and its coefficients as specified by the associated dihedral_coeff command.  

# 1.23.4 Restrictions  

This command must come after the simulation box is defined by a read_data, read_restart, or create_box command.   
A dihedral style must be defined before any dihedral coefficients are set, either in the input script or in a data file.  

# 1.23.5 Related commands  

dihedral_style  

# 1.23.6 Default  

none  

# 1.24 dihedral_style command  

# 1.24.1 Syntax  

dihedral_style style  

• style $=$ none or zero or hybrid or charmm or charmmfsw or class2 or cosine/shift/exp or cosine/squared/restricted or fourier or harmonic or helix or lepton or multi/harmonic or nharmonic or opls or spherical or table or table/cut  

# 1.24.2 Examples  

dihedral_style harmonic dihedral_style multi/harmonic dihedral_style hybrid harmonic charmm  

# 1.24.3 Description  

Set the formula(s) LAMMPS uses to compute dihedral interactions between quadruplets of atoms, which remain in force for the duration of the simulation. The list of dihedral quadruplets is read in by a read_data or read_restart command from a data or restart file.  

Hybrid models where dihedrals are computed using different dihedral potentials can be setup using the hybrid dihedral style.  

The coefficients associated with a dihedral style can be specified in a data or restart file or via the dihedral_coeff command.  

All dihedral potentials store their coefficient data in binary restart files which means dihedral_style and dihedral_coeff commands do not need to be re-specified in an input script that restarts a simulation. See the read_restart command for details on how to do this. The one exception is that dihedral_style hybrid only stores the list of sub-styles in the restart file; dihedral coefficients need to be re-specified.  

![](images/cfb6fbd3034ab162ea498dc4eb26a07929d8a18dfec5f6d8b95cef1a56402fd6.jpg)  

# Note  

When both a dihedral and pair style is defined, the special_bonds command often needs to be used to turn off (or weight) the pairwise interaction that would otherwise exist between four bonded atoms.  

In the formulas listed for each dihedral style, phi is the torsional angle defined by the quadruplet of atoms. This angle has a sign convention as shown in this diagram:  

![](images/f6c533e2baf2b194b634bc1f588c2a4aeffa4ef26833734b936e787cf7f5a0af.jpg)  

where the $I,J,K,L$ ordering of the four atoms that define the dihedral is from left to right.  

This sign convention effects several of the dihedral styles listed below (e.g., charmm, helix) in the sense that the energ formula depends on the sign of phi, which may be reflected in the value of the coefficients you specify.  

# Note  

When comparing the formulas and coefficients for various LAMMPS dihedral styles with dihedral equations defined by other force fields, note that some force field implementations divide/multiply the energy prefactor $K$ by the multiple number of torsions that contain the $J{-}K$ bond in an $I{-}J{-}K{-}L$ torsion. LAMMPS does not do this (i.e., the listed dihedral equation applies to each individual dihedral). Thus, you need to define $K$ appropriately via the dihedral_coeff command to account for this difference if necessary.  

Here is an alphabetic list of dihedral styles defined in LAMMPS. Click on the style to display the formula it computes and coefficients specified by the associated dihedral_coeff command.  

Click on the style to display the formula it computes, any additional arguments specified in the dihedral_style command, and coefficients specified by the associated dihedral_coeff command.  

There are also additional accelerated pair styles included in the LAMMPS distribution for faster performance on CPUs, GPUs, and KNLs. The individual style names on the Commands dihedral page are followed by one or more of (g,i,k,o,t) to indicate which accelerated styles exist.  

• none - turn off dihedral interactions   
• zero - topology but no interactions   
• hybrid - define multiple styles of dihedral interactions   
• charmm - CHARMM dihedral   
• charmmfsw - CHARMM dihedral with force switching   
• class2 - COMPASS (class 2) dihedral   
• cosine/shift/exp - dihedral with exponential in spring constant   
• cosine/squared/restricted - squared cosine dihedral with restricted term   
• fourier - dihedral with multiple cosine terms   
• harmonic - harmonic dihedral   
• helix - helix dihedral   
• lepton - dihedral potential from evaluating a string   
• multi/harmonic - dihedral with 5 harmonic terms   
• nharmonic - same as multi-harmonic with N terms   
• opls - OPLS dihedral quadratic - dihedral with quadratic term in angle   
• spherical - dihedral which includes angle terms to avoid singularities   
• table - tabulated dihedral   
• table/cut - tabulated dihedral with analytic cutoff  

# 1.24.4 Restrictions  

Dihedral styles can only be set for atom styles that allow dihedrals to be defined.  

Most dihedral styles are part of the MOLECULE package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info. The doc pages for individual dihedral potentials tell if it is part of a package.  

# 1.24.5 Related commands  

dihedral_coeff  

# 1.24.6 Default  

dihedral_style none  

# 1.25 dihedral_write command  

# 1.25.1 Syntax  

dihedral_write dtype N file keyword  

• dtype $=$ dihedral type  

• $\Nu=\#$ of values   
• file $=$ name of file to write values to   
• keyword $=$ section name in file for this set of tabulated values  

# 1.25.2 Examples  

<html><body><table><tr><td>dihedral write 1 500 table.txt Harmonic 1</td></tr></table></body></html>  

# 1.25.3 Description  

Added in version 8Feb2023.  

Write energy and force values to a file as a function of the dihedral angle for the currently defined dihedral potential. Force in this context means the force with respect to the dihedral angle, not the force on individual atoms. This is useful for plotting the potential function or otherwise debugging its values. The resulting file can also be used as input for use with dihedral style table.  

If the file already exists, the table of values is appended to the end of the file to allow multiple tables of energy and force to be included in one file. The individual sections may be identified by the keyword.  

The energy and force values are computed for dihedrals ranging from 0 degrees to 360 degrees for 4 interacting atoms forming an dihedral type dtype, using the appropriate dihedral_coeff coefficients. N evenly spaced dihedrals are used. Since 0 and 360 degrees are the same dihedral angle, the latter entry is skipped.  

For example, for $\Nu=6$ , values would be computed at $\phi=0,60,120,180,240,300.$  

The file is written in the format used as input for the dihedral_style table option with keyword as the section name. Each line written to the file lists an index number (1-N), an dihedral angle (in degrees), an energy (in energy units), and a force (in force units per radians $\wedge_{2}$ ). In case a new file is created, the first line will be a comment with a “DATE:” and “UNITS:” tag with the current date and units settings. For subsequent invocations of the dihedral_write command for the same file, data will be appended and the current units settings will be compared to the data from the header, if present. The dihedral_write will refuse to add a table to an existing file if the units are not the same.  

# 1.25.4 Restrictions  

All force field coefficients for dihedrals and other kinds of interactions must be set before this command can be invoked.  

The table of the dihedral energy and force data data is created by using a separate, internally created, new LAMMPS instance with a dummy system of 4 atoms for which the dihedral potential energy is computed after transferring the dihedral style and coefficients and arranging the 4 atoms into the corresponding geometries. The dihedral force is then determined from the potential energies through numerical differentiation. As a consequence of this approach, not all dihedral styles are compatible. The following conditions must be met:  

• The dihedral style must be able to write its coefficients to a data file. This condition excludes for example dihedral style hybrid and dihedral style table.   
• The potential function must not have any terms that depend on geometry properties other than the dihedral. This condition excludes for example dihedral style class2. Please note that the write_dihedral command has no way of checking for this condition. It will check the style name against an internal list of known to be incompatible styles. The resulting tables may be bogus for unlisted dihedral styles if the requirement is not met. It is thus recommended to make careful tests for any created tables.  

# 1.25.5 Related commands  

dihedral_style table, bond_write, angle_write, dihedral_style, dihedral_coeff  

# 1.25.6 Default  

none  

# 1.26 dimension command  

# 1.26.1 Syntax  

• N = 2 or 3  

# 1.26.2 Examples  

# 1.26.3 Description  

Set the dimensionality of the simulation. By default LAMMPS runs 3d simulations. To run a 2d simulation, this command should be used prior to setting up a simulation box via the create_box or read_data commands. Restart files also store this setting.  

See the discussion on the Howto $2d$ page for additional instructions on how to run 2d simulations.  

![](images/69c206be14f926cdbd07ef7cf6008ea9f2bb58599fee378b6eb50f4ae35be6f2.jpg)  

# Note  

Some models in LAMMPS treat particles as finite-size spheres or ellipsoids, as opposed to point particles. In 2d, the particles will still be spheres or ellipsoids, not circular disks or ellipses, meaning their moment of inertia will be the same as in 3d.  

# 1.26.4 Restrictions  

This command must be used before the simulation box is defined by a read_data or create_box command.  

# 1.26.5 Related commands  

fix enforce2d  

# 1.26.6 Default  

• group- $\cdot\mathrm{ID}=\mathrm{ID}$ of group of atoms to displace   
• style $=$ move or ramp or random or rotate move args $=$ delx dely delz delx,dely,delz $=$ distance to displace in each dimension (distance units) any of delx,dely,delz can be a variable (see below) ramp args $=$ ddim dlo dhi dim clo chi $\operatorname{ddim}=\mathbf{x}$ or y or z dlo,dhi = displacement distance between dlo and dhi (distance units) $\mathrm{{dim}=x}$ or y or z clo,chi = lower and upper bound of domain to displace (distance units) random args = dx dy dz seed dx,dy, $\mathrm{dz}={}$ random displacement magnitude in each dimension (distance units) seed $=$ random $\#$ seed (positive integer) rotate args $=\mathrm{Px}$ Py Pz Rx Ry Rz theta $\mathrm{Px,Py,Pz=}$ origin point of axis of rotation (distance units) $\mathrm{Rx,Ry,Rz=}$ axis of rotation vector theta $=$ angle of rotation (degrees)   
• zero or more keyword/value pairs may be appended keyword $=$ units units value $=$ box or lattice  

# 1.27.2 Examples  

<html><body><table><tr><td>displace atoms top move 0 -5 0 units box</td></tr><tr><td>displace_atoms fow ramp x 0.0 5.0 y 2.0 20.5</td></tr><tr><td></td></tr></table></body></html>  

# 1.27.3 Description  

Displace a group of atoms. This can be used to move atoms a large distance before beginning a simulation or to randomize atoms initially on a lattice. For example, in a shear simulation, an initial strain can be imposed on the system. Or two groups of atoms can be brought into closer proximity.  

The move style displaces the group of atoms by the specified 3d displacement vector. Any of the three quantities defining the vector components can be specified as an equal-style or atom-style variable. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated, and its value(s) used for the displacement(s). The scale factor implied by the units keyword will also be applied to the variable result.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Atom-style variables can specify the same formulas as equal-style variables but can also include per-atom values, such as atom coordinates or per-atom values read from a file. Note that if the variable references other compute or $f\alpha$ commands, those values must be up-to-date for the current timestep. See the “Variable Accuracy” section of the variable doc page for more details.  

The ramp style displaces atoms a variable amount in one dimension depending on the atom’s coordinate in a (possibly) different dimension. For example, the second example command displaces atoms in the $x$ -direction an amount between 0.0 and 5.0 distance units. Each atom’s displacement depends on the fractional distance its $y$ coordinate is between 2.0 and 20.5. Atoms with $y$ -coordinates outside those bounds will be moved the minimum (0.0) or maximum (5.0) amount.  

The random style independently moves each atom in the group by a random displacement, uniformly sampled from a value between $-d x$ and $+d x$ in the $x$ dimension, and similarly for $y$ and $z$ . Random numbers are used in such a way that the displacement of a particular atom is the same, regardless of how many processors are being used.  

The rotate style rotates each atom in the group by the angle theta around a rotation axis $\boldsymbol{R}=(R_{x},R_{y},R_{z})$ that goes through a point $P=(P_{x},P_{y},P_{z})$ . The direction of rotation for the atoms around the rotation axis is consistent with the right-hand rule: if your right-hand thumb points along $R$ , then your fingers wrap around the axis in the direction of positive theta.  

If the defined atom_style assigns an orientation to each atom (atom styles ellipsoid, line, tri, body), then that property is also updated appropriately to correspond to the atom’s rotation.  

Distance units for displacements and the origin point of the rotate style are determined by the setting of box or lattice for the units keyword. Box means distance units as defined by the units command (e.g., Å for real or metal units). Lattice means distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacing.  

![](images/1d46c8e27bbef4fc4b025d5f2ee2ad40eb99f4d406134226f10483867d4c57ff.jpg)  

# Note  

Care should be taken not to move atoms on top of other atoms. After the move, atoms are remapped into the periodic simulation box if needed, and any shrink-wrap boundary conditions (see the boundary command) are enforced which may change the box size. Other than this effect, this command does not change the size or shape of the simulation box. See the change_box command if that effect is desired.  

![](images/3e987b8cf2456d0889056f1f5733c86dcfcb914f2b344842e31876e8aaa9a798.jpg)  

# Note  

Atoms can be moved arbitrarily long distances by this command. If the simulation box is non-periodic and shrinkwrapped (see the boundary command), this can change its size or shape. This is not a problem, except that the mapping of processors to the simulation box is not changed by this command from its initial 3d configuration; see the processors command. Thus, if the box size/shape changes dramatically, the mapping of processors to the simulation box may not end up as optimal as the initial mapping attempted to be.  

# 1.27.4 Restrictions  

For a 2d simulation, only rotations around the a vector parallel to the $z$ -axis are allowed.  

# 1.27.5 Related commands  

lattice, change_box, fix move  

# 1.27.6 Default  

The option defaults are units $=$ lattice.  

# 1.28 dynamical_matrix command  

Accelerator Variant: dynamical_matrix/kk  

# 1.28.1 Syntax  

dynamical_matrix group-ID style gamma args keyword value ...  

• group-ID $=$ ID of group of atoms to displace  

• style $=$ regular or eskm • gamma $=$ finite different displacement length (distance units) • one or more keyword/arg pairs may be appended  

keyword $=$ file or binary   
file name $=$ name of output file for the dynamical matrix   
binary $\mathrm{arg}=\mathrm{yes}$ or no or gzip  

# 1.28.2 Examples  

<html><body><table><tr><td>dynamical matrix 1</td><td>regular 0.000001</td></tr><tr><td>dynamical matrix eskm</td><td>0.000001</td></tr><tr><td>dynamical matrix 3 regular</td><td>0.00004 file dynmat.dat</td></tr><tr><td>dynamical matrix</td><td>eskm 0.00000001 file dynamical.dat binary yes</td></tr></table></body></html>  

# 1.28.3 Description  

Calculate the dynamical matrix by finite difference of the selected group,  

$$
D=\frac{\Phi_{i j}^{\alpha\beta}}{\sqrt{M_{i}M_{j}}}
$$  

where D is the dynamical matrix and $\Phi$ is the force constant matrix defined by  

$$
\Phi_{i j}^{\alpha\beta}=\frac{\partial^{2}U}{\partial x_{i,\alpha}\partial x_{j,\beta}}
$$  

The output for the dynamical matrix is printed three elements at a time. The three elements are the three $\beta$ elements for a respective $\mathrm{i}/\alpha/\mathrm{j}$ combination. Each line is printed in order of $\mathrm{j}$ increasing first, $\alpha$ second, and i last.  

If the style eskm is selected, the dynamical matrix will be in units of inverse squared femtoseconds. These units wil then conveniently leave frequencies in THz.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 1.28.4 Restrictions  

The command collects an array of nine times the number of atoms in a group on every single MPI rank, so the memory requirements can be very significant for large systems.  

This command is part of the PHONON package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 1.28. dynamical_matrix command  

# 1.28.5 Related commands  

fix phonon, fix numdiff ,  

compute hma uses an analytic formulation of the Hessian provided by a pair_style’s Pair::single_hessian() function, if implemented.  

# 1.28.6 Default  

The default settings are file $=$ “dynmat.dyn”, binary $=$ no  

# 1.29 echo command  

# 1.29.1 Syntax  

• style $=$ none or screen or log or both  

# 1.29.2 Examples  

<html><body><table><tr><td>echo both</td></tr><tr><td>echo log</td></tr><tr><td></td></tr></table></body></html>  

# 1.29.3 Description  

This command determines whether LAMMPS echoes each input script command to the screen and/or log file as it is read and processed. If an input script has errors, it can be useful to look at echoed output to see the last command processed.  

The command-line switch -echo can be used in place of this command.  

# 1.29.4 Restrictions  

none  

# 1.29.5 Related commands  

none  

# 1.29.6 Default  

• style $=$ one of a long list of possible style names (see below) args $=$ arguments used by a particular style  

# 1.30.2 Examples  

fix 1 all nve fix 3 all nvt temp 300.0 300.0 0.01 fix mine top setforce 0.0 NULL 0.0  

# 1.30.3 Description  

Set a fix that will be applied to a group of atoms. In LAMMPS, a “fix” is any operation that is applied to the system during timestepping or minimization. Examples include updating of atom positions and velocities due to time integration, controlling temperature, applying constraint forces to atoms, enforcing boundary conditions, computing diagnostics, etc. There are hundreds of fixes defined in LAMMPS and new ones can be added; see the Modify page for details.  

Fixes perform their operations at different stages of the timestep. If two or more fixes operate at the same stage of the timestep, they are invoked in the order they were specified in the input script.  

The ID of a fix can only contain alphanumeric characters and underscores.  

Fixes can be deleted with the unfix command.  

# Note  

The unfix command is the only way to turn off a fix; simply specifying a new fix with a similar style will not turn off the first one. This is especially important to realize for integration fixes. For example, using a fix nve command for a second run after using a fix nvt command for the first run will not cancel out the NVT time integration invoked by the “fix nvt” command. Thus, two time integrators would be in place!  

If you specify a new fix with the same ID and style as an existing fix, the old fix is deleted and the new one is created (presumably with new settings). This is the same as if an “unfix” command were first performed on the old fix, except that the new fix is kept in the same order relative to the existing fixes as the old one originally was. Note that this operation also wipes out any additional changes made to the old fix via the fix_modify command.  

The fix modify command allows settings for some fixes to be reset. See the page for individual fixes for details.  

Some fixes store an internal “state” which is written to binary restart files via the restart or write_restart commands. This allows the fix to continue on with its calculations in a restarted simulation. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file. See the doc pages for individual fixes for info on which ones can be restarted.  

Some fixes calculate and store any of four styles of quantities: global, per-atom, local, or per-grid.  

A global quantity is one or more system-wide values, e.g. the energy of a wall interacting with particles. A per-atom quantity is one or more values per atom, e.g. the original coordinates of each atom at time 0. Per-atom values are set to 0.0 for atoms not in the specified fix group. Local quantities are calculated by each processor based on the atoms it owns, but there may be zero or more per atom, e.g. values for each bond. Per-grid quantities are calculated on a regular 2d or 3d grid which overlays a 2d or 3d simulation domain. The grid points and the data they store are distributed across processors; each processor owns the grid points which fall within its subdomain.  

As a general rule of thumb, fixes that produce per-atom quantities have the word “atom” at the end of their style, e.g. ave/atom. Fixes that produce local quantities have the word “local” at the end of their style, e.g. store/local. Fixes that produce per-grid quantities have the word “grid” at the end of their style, e.g. ave/grid.  

Global, per-atom, local, and per-grid quantities can also be of three kinds: a single scalar value (global only), a vector of values, or a 2d array of values. For per-atom, local, and per-grid quantities, a “vector” means a single value for each atom, each local entity (e.g. bond), or grid cell. Likewise an “array”, means multiple values for each atom, each local entity, or each grid cell.  

Note that a single fix can produce any combination of global, per-atom, local, or per-grid values. Likewise it can produce any combination of scalar, vector, or array output for each style. The exception is that for per-atom, local, and per-grid output, either a vector or array can be produced, but not both. The doc page for each fix explains the values it produces, if any.  

When a fix output is accessed by another input script command it is referenced via the following bracket notation, where ID is the ID of the fix:  

<html><body><table><tr><td>f_ID</td><td>entire scalar, vector, or array</td></tr><tr><td>f_ID[I]</td><td>one element of vector, one column of : array</td></tr><tr><td>f_ID[I[J]</td><td>one element of : array</td></tr></table></body></html>  

In other words, using one bracket reduces the dimension of the quantity once (vector $\rightarrow$ scalar, array $\rightarrow$ vector). Using two brackets reduces the dimension twice (array $\rightarrow$ scalar). Thus, for example, a command that uses global scalar fix values as input can also process elements of a vector or array. Depending on the command, this can either be done directly using the syntax in the table, or by first defining a variable of the appropriate style to store the quantity, then using the variable as an input to the command.  

Note that commands and variables which take fix outputs as input typically do not allow for all styles and kinds of data (e.g., a command may require global but not per-atom values, or it may require a vector of values, not a scalar). This means there is typically no ambiguity about referring to a fix output as $\mathrm{~c~}_{-}\mathrm{ID}$ even if it produces, for example, both a scalar and vector. The doc pages for various commands explain the details, including how any ambiguities are resolved.  

In LAMMPS, the values generated by a fix can be used in several ways:  

• Global values can be output via the thermo_style custom or fix ave/time command. Alternatively, the values can be referenced in an equal-style variable command.   
• Per-atom values can be output via the dump custom command, or they can be time-averaged via the fix ave/atom command or reduced by the compute reduce command. Alternatively, per-atom values can be referenced in an atom-style variable.   
• Local values can be reduced by the compute reduce command or histogrammed by the fix ave/histo command. They can also be output by the dump local command.  

See the Howto output page for a summary of various LAMMPS output options, many of which involve fixes.  

The results of fixes that calculate global quantities can be either “intensive” or “extensive” values. Intensive means the value is independent of the number of atoms in the simulation (e.g., temperature). Extensive means the value scales with the number of atoms in the simulation (e.g., total rotational kinetic energy). Thermodynamic output will normalize extensive values by the number of atoms in the system, depending on the “thermo_modify norm” setting. It will not normalize intensive values. If a fix value is accessed in another way (e.g., by a variable), you may want to know whether it is an intensive or extensive value. See the page for individual fix styles for further info.  

Each fix style has its own page that describes its arguments and what it does, as listed below. Here is an alphabetical list of fix styles available in LAMMPS. They are also listed in more compact form on the Commands fix doc page.  

There are also additional accelerated fix styles included in the LAMMPS distribution for faster performance on CPUs, GPUs, and KNLs. The individual style names on the Commands fix doc page are followed by one or more of (g,i,k,o,t) to indicate which accelerated styles exist.  

• accelerate/cos - apply cosine-shaped acceleration to atoms   
• acks2/reaxff - apply ACKS2 charge equilibration   
• adapt - change a simulation parameter over time   
• adapt/fep - enhanced version of fix adapt   
• addforce - add a force to each atom   
• add/heat - add a heat flux to each atom   
• addtorque - add a torque to a group of atoms   
• alchemy - perform an “alchemical transformation” between two partitions   
• amoeba/bitorsion - torsion/torsion terms in AMOEBA force field   
• amoeba/pitorsion - 6-body terms in AMOEBA force field   
• append/atoms - append atoms to a running simulation   
• atc - initiates a coupled MD/FE simulation   
• atom/swap - Monte Carlo atom type swapping   
• ave/atom - compute per-atom time-averaged quantities   
• ave/chunk - compute per-chunk time-averaged quantities   
• ave/correlate - compute/output time correlations   
• ave/correlate/long - alternative to ave/correlate that allows efficient calculation over long time windows   
• ave/grid - compute per-grid time-averaged quantities   
• ave/histo - compute/output time-averaged histograms   
• ave/histo/weight - weighted version of fix ave/histo   
• ave/time - compute/output global time-averaged quantities   
• aveforce - add an averaged force to each atom   
• balance - perform dynamic load-balancing   
• brownian - overdamped translational brownian motion   
• brownian/asphere - overdamped translational and rotational brownian motion for ellipsoids   
• brownian/sphere - overdamped translational and rotational brownian motion for spheres   
• bocs - NPT style time integration with pressure correction   
• bond/break - break bonds on the fly   
• bond/create - create bonds on the fly   
• bond/create/angle - create bonds on the fly with angle constraints   
• bond/react - apply topology changes to model reactions   
• bond/swap - Monte Carlo bond swapping   
• box/relax - relax box size during energy minimization   
• charge/regulation - Monte Carlo sampling of charge regulation   
• cmap - CMAP torsion/torsion terms in CHARMM force field   
• colvars - interface to the collective variables “Colvars” library   
• controller - apply control loop feedback mechanism   
• damping/cundall - Cundall non-viscous damping for granular simulations   
• deform - change the simulation box size/shape   
• deform/pressure - change the simulation box size/shape with additional loading conditions   
• deposit - add new atoms above a surface   
• dpd/energy - constant energy dissipative particle dynamics   
• drag - drag atoms towards a defined coordinate   
• drude - part of Drude oscillator polarization model   
• drude/transform/direct - part of Drude oscillator polarization model   
• drude/transform/inverse - part of Drude oscillator polarization model   
• dt/reset - reset the timestep based on velocity, forces   
• edpd/source - add heat source to eDPD simulations   
• efield - impose electric field on system   
• efield/lepton - impose electric field on system using a Lepton expression for the potential   
• efield/tip4p - impose electric field on system with TIP4P molecules   
• ehex - enhanced heat exchange algorithm   
• electrode/conp - impose electric potential   
• electrode/conq - impose total electric charge   
• electrode/thermo - apply thermo-potentiostat   
• electron/stopping - electronic stopping power as a friction force   
• electron/stopping/fit - electronic stopping power as a friction force   
• enforce2d - zero out $z$ -dimension velocity and force   
• eos/cv - applies a mesoparticle equation of state to relate the particle internal energy to the particle internal temperature   
• eos/table - applies a tabulated mesoparticle equation of state to relate the particle internal energy to the particle internal temperature   
• eos/table/rx - applies a tabulated mesoparticle equation of state to relate the concentration-dependent particle internal energy to the particle internal temperature   
• evaporate - remove atoms from simulation periodically   
• external - callback to an external driver program   
• ffl - apply a Fast-Forward Langevin equation thermostat   
• filter/corotate - implement corotation filter to allow larger timesteps with r-RESPA   
• flow/gauss - Gaussian dynamics for constant mass flux   
• freeze - freeze atoms in a granular simulation   
• gcmc - grand canonical insertions/deletions   
• gld - generalized Langevin dynamics integrator   
• gle - generalized Langevin equation thermostat   
• gravity - add gravity to atoms in a granular simulation   
• grem - implements the generalized replica exchange method   
• halt - terminate a dynamics run or minimization   
• heat - add/subtract momentum-conserving heat   
• heat/flow - plain time integration of heat flow with per-atom temperature updates   
• hyper/global - global hyperdynamics   
• hyper/local - local hyperdynamics   
• imd - implements the “Interactive MD” (IMD) protocol   
• indent - impose force due to an indenter   
• ipi - enable LAMMPS to run as a client for i-PI path-integral simulations   
• langevin - Langevin temperature control   
• langevin/drude - Langevin temperature control of Drude oscillators   
• langevin/eff - Langevin temperature control for the electron force field model   
• langevin/spin - Langevin temperature control for a spin or spin-lattice system   
• lb/fluid - lattice-Boltzmann fluid on a uniform mesh   
• lb/momentum - fix momentum replacement for use with a lattice-Boltzmann fluid   
• lb/viscous - fix viscous replacement for use with a lattice-Boltzmann fluid   
• lineforce - constrain atoms to move in a line   
• manifoldforce - restrain atoms to a manifold during minimization   
• mdi/qm - LAMMPS operates as a client for a quantum code via the MolSSI Driver Interface (MDI)   
• mdi/qmmm - LAMMPS operates as client for QM/MM simulation with a quantum code via the MolSSI Driver Interface (MDI)   
• meso/move - move mesoscopic SPH/SDPD particles in a prescribed fashion   
• mol/swap - Monte Carlo atom type swapping with a molecule   
• momentum - zero the linear and/or angular momentum of a group of atoms   
• momentum/chunk - zero the linear and/or angular momentum of a chunk of atoms   
• move - move atoms in a prescribed fashion   
• msst - multi-scale shock technique (MSST) integration   
• mvv/dpd - DPD using the modified velocity-Verlet integration algorithm   
• mvv/edpd - constant energy DPD using the modified velocity-Verlet algorithm   
• mvv/tdpd - constant temperature DPD using the modified velocity-Verlet algorithm   
• neb - nudged elastic band (NEB) spring forces   
• neb/spin - nudged elastic band (NEB) spring forces for spins   
• nonaffine/displacement - calculate nonaffine displacement of atoms   
• nph - constant NPH time integration via Nose/Hoover   
• nph/asphere - NPH for aspherical particles   
• nph/body - NPH for body particles   
• nph/eff - NPH for nuclei and electrons in the electron force field model   
• nph/sphere - NPH for spherical particles   
• nphug - constant-stress Hugoniostat integration   
• npt - constant NPT time integration via Nose/Hoover   
• npt/asphere - NPT for aspherical particles   
• npt/body - NPT for body particles   
• npt/cauchy - NPT with Cauchy stress   
• npt/eff - NPT for nuclei and electrons in the electron force field model   
• npt/sphere - NPT for spherical particles   
• npt/uef - NPT style time integration with diagonal flow   
• numdiff - numerically approximate atomic forces using finite energy differences   
• numdiff/virial - numerically approximate virial stress tensor using finite energy differences   
• nve - constant NVE time integration   
• nve/asphere - NVE for aspherical particles   
• nve/asphere/noforce - NVE for aspherical particles without forces   
• nve/awpmd - NVE for the Antisymmetrized Wave Packet Molecular Dynamics model   
• nve/body - NVE for body particles   
• nve/dot - rigid body constant energy time integrator for coarse grain models   
• nve/dotc/langevin - Langevin style rigid body time integrator for coarse grain models   
• nve/eff - NVE for nuclei and electrons in the electron force field model   
• nve/limit - NVE with limited step length   
• nve/line - NVE for line segments   
• nve/manifold/rattle - NVE time integration for atoms constrained to a curved surface (manifold)   
• nve/noforce - NVE without forces (update positions only)   
• nve/sphere - NVE for spherical particles   
• nve/bpm/sphere - NVE for spherical particles used in the BPM package   
• nve/spin - NVE for a spin or spin-lattice system   
• nve/tri - NVE for triangles   
• nvk - constant kinetic energy time integration   
• nvt - NVT time integration via Nose/Hoover   
• nvt/asphere - NVT for aspherical particles   
• nvt/body - NVT for body particles   
• nvt/eff - NVE for nuclei and electrons in the electron force field model   
• nvt/manifold/rattle - NVT time integration for atoms constrained to a curved surface (manifold)   
• nvt/sllod - NVT for NEMD with SLLOD equations   
• nvt/sllod/eff - NVT for NEMD with SLLOD equations for the electron force field model   
• nvt/sphere - NVT for spherical particles   
• nvt/uef - NVT style time integration with diagonal flow   
• oneway - constrain particles on move in one direction   
• orient/bcc - add grain boundary migration force for BCC   
• orient/fcc - add grain boundary migration force for FCC   
• orient/eco - add generalized grain boundary migration force   
• pafi - constrained force averages on hyper-planes to compute free energies (PAFI)   
• pair - access per-atom info from pair styles   
• phonon - calculate dynamical matrix from MD simulations   
• pimd/langevin - Feynman path-integral molecular dynamics with stochastic thermostat   
• pimd/nvt - Feynman path-integral molecular dynamics with Nose-Hoover thermostat   
• planeforce - constrain atoms to move in a plane   
• plumed - wrapper on PLUMED free energy library   
• poems - constrain clusters of atoms to move as coupled rigid bodies   
• polarize/bem/gmres - compute induced charges at the interface between impermeable media with different dielectric constants with generalized minimum residual (GMRES)   
• polarize/bem/icc - compute induced charges at the interface between impermeable media with different dielectric constants with the successive over-relaxation algorithm   
• polarize/functional - compute induced charges at the interface between impermeable media with different dielectric constants with the energy variational approach   
• pour - pour new atoms/molecules into a granular simulation domain   
• precession/spin - apply a precession torque to each magnetic spin   
• press/berendsen - pressure control by Berendsen barostat   
• press/langevin - pressure control by Langevin barostat   
• print - print text and variables during a simulation   
• propel/self - model self-propelled particles   
• property/atom - add customized per-atom values   
• python/invoke - call a Python function during a simulation   
• python/move - move particles using a Python function during a simulation run   
• qbmsst - quantum bath multi-scale shock technique time integrator   
• qeq/comb - charge equilibration for COMB potential   
• qeq/ctip - charge equilibration for CTIP potential   
• qeq/dynamic - charge equilibration via dynamic method   
• qeq/fire - charge equilibration via FIRE minimizer   
• qeq/point - charge equilibration via point method   
• qeq/reaxff - charge equilibration for ReaxFF potential   
• qeq/shielded - charge equilibration via shielded method   
• qeq/slater - charge equilibration via Slater method   
• qmmm - functionality to enable a quantum mechanics/molecular mechanics coupling   
• qtb - implement quantum thermal bath scheme   
• qtpie/reaxff - apply QTPIE charge equilibration   
• rattle - RATTLE constraints on bonds and/or angles   
• reaxff/bonds - write out ReaxFF bond information   
• reaxff/species - write out ReaxFF molecule information   
• recenter - constrain the center-of-mass position of a group of atoms   
• restrain - constrain a bond, angle, dihedral   
• rheo - integrator for the RHEO package   
• rheo/thermal - thermal integrator for the RHEO package   
• rheo/oxidation - create oxidation bonds for the RHEO package   
• rheo/pressure - pressure calculation for the RHEO package   
• rheo/viscosity - viscosity calculation for the RHEO package   
• rhok - add bias potential for long-range ordered systems   
• rigid - constrain one or more clusters of atoms to move as a rigid body with NVE integration   
• rigid/meso - constrain clusters of mesoscopic SPH/SDPD particles to move as a rigid body   
• rigid/nph - constrain one or more clusters of atoms to move as a rigid body with NPH integration   
• rigid/nph/small - constrain many small clusters of atoms to move as a rigid body with NPH integration   
• rigid/npt - constrain one or more clusters of atoms to move as a rigid body with NPT integration   
• rigid/npt/small - constrain many small clusters of atoms to move as a rigid body with NPT integration   
• rigid/nve - constrain one or more clusters of atoms to move as a rigid body with alternate NVE integration   
• rigid/nve/small - constrain many small clusters of atoms to move as a rigid body with alternate NVE integration   
• rigid/nvt - constrain one or more clusters of atoms to move as a rigid body with NVT integration   
• rigid/nvt/small - constrain many small clusters of atoms to move as a rigid body with NVT integration   
• rigid/small - constrain many small clusters of atoms to move as a rigid body with NVE integration   
• $r x$ - solve reaction kinetic ODEs for a defined reaction set   
• saed/vtk - time-average the intensities from compute saed   
• setforce - set the force on each atom   
• setforce/spin - set magnetic precession vectors on each atom   
• sgcmc - fix for hybrid semi-grand canonical MD/MC simulations   
• shake - SHAKE constraints on bonds and/or angles   
• shardlow - integration of DPD equations of motion using the Shardlow splitting   
• smd - applied a steered MD force to a group   
• smd/adjust_dt - calculate a new stable time increment for use with SMD integrators   
• smd/integrate_tlsph - explicit time integration with total Lagrangian SPH pair style   
• smd/integrate_ulsph - explicit time integration with updated Lagrangian SPH pair style   
• smd/move_tri_surf - update position and velocity near rigid surfaces using SPH integrators   
• smd/setvel - sets each velocity component, ignoring forces, for Smooth Mach Dynamics   
• smd/wall_surface - create a rigid wall with a triangulated surface for use in Smooth Mach Dynamics   
• sph - time integration for SPH/DPDE particles   
• sph/stationary - update energy and density but not position or velocity in Smooth Particle Hydrodynamic   
• spring - apply harmonic spring force to group of atoms   
• spring/chunk - apply harmonic spring force to each chunk of atoms   
• spring/rg - spring on radius of gyration of group of atoms   
• spring/self - spring from each atom to its origin   
• srd - stochastic rotation dynamics (SRD)   
• store/force - store force on each atom   
• store/state - store attributes for each atom   
• tdpd/source - add external concentration source   
• temp/berendsen - temperature control by Berendsen thermostat   
• temp/csld - canonical sampling thermostat with Langevin dynamics   
• temp/csvr - canonical sampling thermostat with Hamiltonian dynamics   
• temp/rescale - temperature control by velocity rescaling   
• temp/rescale/eff - temperature control by velocity rescaling in the electron force field model   
• tfmc - perform force-bias Monte Carlo with time-stamped method   
• tgnvt/drude - NVT time integration for Drude polarizable model via temperature-grouped Nose-Hoover   
• tgnpt/drude - NPT time integration for Drude polarizable model via temperature-grouped Nose-Hoover   
• thermal/conductivity - Mueller-Plathe kinetic energy exchange for thermal conductivity calculation   
• ti/spring - perform thermodynamic integration between a solid and an Einstein crystal   
• tmd - guide a group of atoms to a new configuration   
• ttm - two-temperature model for electronic/atomic coupling (replicated grid)   
• ttm/grid - two-temperature model for electronic/atomic coupling (distributed grid)   
• ttm/mod - enhanced two-temperature model with additional options   
• tune/kspace - auto-tune $k$ -space parameters   
• vector - accumulate a global vector every $N$ timesteps   
• viscosity - Mueller-Plathe momentum exchange for viscosity calculation   
• viscous - viscous damping for granular simulations   
• viscous/sphere - viscous damping on angular velocity for granular simulations   
• wall/body/polygon - time integration for body particles of style rounded/polygon   
• wall/body/polyhedron - time integration for body particles of style rounded/polyhedron   
• wall/colloid - Lennard-Jones wall interacting with finite-size particles   
• wall/ees - wall for ellipsoidal particles   
• wall/flow - flow boundary conditions   
• wall/gran - frictional wall(s) for granular simulations   
• wall/gran/region - fix wall/region equivalent for use with granular particles   
• wall/harmonic - harmonic spring wall   
• wall/lj1043 - Lennard-Jones 10–4–3 wall   
• wall/lj126 - Lennard-Jones 12–6 wall   
• wall/lj93 - Lennard-Jones 9–3 wall   
• wall/lepton - Custom Lepton expression wall   
• wall/morse - Morse potential wall   
• wall/piston - moving reflective piston wall   
• wall/reflect - reflecting wall(s)   
• wall/reflect/stochastic - reflecting wall(s) with finite temperature   
wall/region - use region surface as wall   
wall/region/ees - use region surface as wall for ellipsoidal particles   
• wall/srd - slip/no-slip wall for SRD particles   
• wall/table - Tabulated potential wall wall   
• widom - Widom insertions of atoms or molecules  

# 1.30.4 Restrictions  

Some fix styles are part of specific packages. They are only enabled if LAMMPS was built with that package. See the Build package page for more info. The doc pages for individual fixes tell if it is part of a package.  

# 1.30.5 Related commands  

unfix, fix_modify  

# 1.30.6 Default  

none  

# 1.31 fix_modify command  

# 1.31.1 Syntax  

fix_modify fix-ID keyword value ...  

• $\mathrm{fix{-}I D=I D}$ of the fix to modify   
• one or more keyword/value pairs may be appended   
• keyword $=$ bodyforces or colname or dynamic/dof or energy or press or respa or temp or virial   
bodyforces value = early or late early/late = compute rigid-body forces/torques early or late in the timestep   
colname values = ID string string = new column header name   
ID = integer from 1 to N, or integer from -1 to -N, where $\mathrm{N}=\#$ of quantities being output or a fix output property keyword or reference to compute, fix, property or variable.   
dynamic/dof value = yes or no   
yes/no = do or do not re-compute the number of degrees of freedom (DOF) contributing to the␣   
$\hookrightarrow$ temperature   
energy value = yes or no   
press value $-$ compute ID that calculates a pressure   
respa value $=1$ to max respa level or 0 (for outermost level)   
temp value $=$ compute ID that calculates a temperature   
virial value = yes or no  

# 1.31.2 Examples  

fix_modify 3 temp myTemp press myPress   
fix_modify 1 energy yes   
fix_modify tether respa 2   
fix_modify ave colname c_thermo_press Pressure colname 1 Temperature  

# 1.31.3 Description  

Modify one or more parameters of a previously defined fix. Only specific fix styles support specific parameters. See the doc pages for individual fix commands for info on which ones support which fix_modify parameters.  

The temp keyword is used to determine how a fix computes temperature. The specified compute ID must have been previously defined by the user via the compute command and it must be a style of compute that calculates a temperature. All fixes that compute temperatures define their own compute by default, as described in their documentation. Thus this option allows the user to override the default method for computing T.  

The press keyword is used to determine how a fix computes pressure. The specified compute ID must have been previously defined by the user via the compute command and it must be a style of compute that calculates a pressure. All fixes that compute pressures define their own compute by default, as described in their documentation. Thus this option allows the user to override the default method for computing P.  

The energy keyword can be used with fixes that support it, which is explained at the bottom of their doc page. Energy yes will add a contribution to the potential energy of the system. More specifically, the fix’s global or per-atom energy is included in the calculation performed by the compute pe or compute pe/atom commands. The former is what is used the thermo_style command for output of any quantity that includes the global potential energy of the system. Note that the compute $p e$ and compute pe/atom commands also have an option to include or exclude the contribution from fixes. For fixes that tally a global energy, it can also be printed with thermodynamic output by using the keyword f_ID in the thermo_style custom command, where ID is the fix-ID of the appropriate fix.  

# Note  

If you are performing an energy minimization with one of these fixes and want the energy and forces it produces to be part of the optimization criteria, you must specify the energy yes setting.  

For most fixes that support the energy keyword, the default setting is no. For a few it is yes, when a user would expect that to be the case. The page of each fix gives the default.  

The virial keyword can be used with fixes that support it, which is explained at the bottom of their doc page. Virial yes will add a contribution to the virial of the system. More specifically, the fix’s global or per-atom virial is included in the calculation performed by the compute pressure or compute stress/atom commands. The former is what is used the thermo_style command for output of any quantity that includes the global pressure of the system. Note that the compute pressure and compute stress/atom commands also have an option to include or exclude the contribution from fixes.  

![](images/8a1946d1853a20c566840bebf5b3a0856992bf77cc3e6a6e9ef4b00f31e838b1.jpg)  

# Note  

If you are performing an energy minimization with box relaxation and one of these fixes and want the virial contribution of the fix to be part of the optimization criteria, you must specify the virial yes setting.  

![](images/fe23090b0e7e5f58992e572489674f61f0c93fde976599e4b63c1f2d379c2b5a.jpg)  

# Note  

For most fixes that support the virial keyword, the default setting is no. For a few it is yes, when a user would expect that to be the case. The page of each fix gives the default.  

For fixes that set or modify forces, it may be possible to select at which r-RESPA level the fix operates via the respa keyword. The RESPA level at which the fix is active can be selected. This is a number ranging from 1 to the number of levels. If the RESPA level is larger than the current maximum, the outermost level will be used, which is also the default setting. This default can be restored using a value of $O$ for the RESPA level. The affected fix has to be enabled to support this feature; if not, fix_modify will report an error. Active fixes with a custom RESPA level setting are reported with their specified level at the beginning of a r-RESPA run.  

The dynamic/dof keyword determines whether the number of atoms N in the fix group and their associated degrees of freedom are re-computed each time a temperature is computed. Only fix styles that calculate their own internal temperature use this option. Currently this is only the fix rigid/nvt/small and fix rigid/npt/small commands for the purpose of thermostatting rigid body translation and rotation. By default, N and their DOF are assumed to be constant. If you are adding atoms or molecules to the system (see the fix pour, fix deposit, and $f\boldsymbol{{x}}$ gcmc commands) or expect atoms or molecules to be lost (e.g. due to exiting the simulation box or via fix evaporate), then this option should be used to ensure the temperature is correctly normalized.  

![](images/cda7229a5bb1a70ff2665b85ea468d96872b2951a66b756f0912e7e38666b64b.jpg)  

# Note  

Other thermostatting fixes, such as $f i x n\nu t$ , do not use the dynamic/dof keyword because they use a temperature compute to calculate temperature. See the compute_modify dynamic/dof command for a similar way to ensure correct temperature normalization for those thermostats.  

The bodyforces keyword determines whether the forces and torques acting on rigid bodies are computed early at the post-force stage of each timestep (right after per-atom forces have been computed and communicated among processors), or late at the final-integrate stage of each timestep (after any other fixes have finished their post-force tasks). Only the rigid-body integration fixes use this option, which includes fix rigid and fix rigid/small, and their variants, and also fix poems.  

The default is late. If there are other fixes that add forces to individual atoms, then the rigid-body constraints will include these forces when time-integrating the rigid bodies. If early is specified, then new fixes can be written that use or modify the per-body force and torque, before time-integration of the rigid bodies occurs. Note however this has the side effect, that fixes such as fix addforce, fix setforce, fix spring, which add forces to individual atoms will have no effect on the motion of the rigid bodies if they are specified in the input script after the fix rigid command. LAMMPS will give a warning if that is the case.  

The colname keyword can be used to change the default header keywords in output files of fix styles that support it: currently only fix ave/time is supported. The setting for $I D$ string replaces the default text with the provided string. $I D$ can be a positive integer when it represents the column number counting from the left, a negative integer when it represents the column number from the right (i.e. -1 is the last column/keyword), or a custom fix output keyword (or compute, fix, property, or variable reference) and then it replaces the string for that specific keyword. The colname keyword can be used multiple times. If multiple colname settings refer to the same keyword, the last setting has precedence.  

# 1.31.4 Restrictions  

none  

# 1.31.5 Related commands  

fix, compute temp, compute pressure, thermo_style  

# 1.31.6 Default  

The option defaults are temp $=$ ID defined by fix, press $=$ ID defined by fix, energy $=$ no, virial $=$ different for each fix style, respa $=0$ , bodyforce $=$ late.  

# 1.32 fitpod command  

# 1.32.1 Syntax  

<html><body><table><tr><td>fitpod Ta _param.pod Ta_data.pod Ta _coefficients.pod</td></tr></table></body></html>  

• fitpod $=$ style name of this command • Ta_param.pod $=$ an input file that describes proper orthogonal descriptors (PODs) • Ta_data.pod $=$ an input file that specifies DFT data used to fit a POD potential • Ta_coefficients.pod (optional) $=$ an input file that specifies trainable coefficients of a POD potential  

# 1.32.2 Examples  

<html><body><table><tr><td>fitpod Ta_param.pod Ta_data.pod</td></tr><tr><td>fitpod 1 Ta_param.pod Ta_data.pod Ta_coefficients.pod</td></tr></table></body></html>  

# 1.32.3 Description  

Added in version 22Dec2022.  

Fit a machine-learning interatomic potential (ML-IAP) based on proper orthogonal descriptors (POD); please see (Nguyen and Rohskopf), (Nguyen2023), (Nguyen2024), and (Nguyen and Sema) for details. The fitted POD potential can be used to run MD simulations via pair_style pod.  

Two input files are required for this command. The first input file describes a POD potential parameter settings, while the second input file specifies the DFT data used for the fitting procedure. All keywords except species have default values. If a keyword is not set in the input file, its default value is used. The table below has one-line descriptions of all the keywords that can be used in the first input file (i.e. Ta_param.pod)  

# 1.32. fitpod command  

<html><body><table><tr><td>Keyword</td><td>De- fault</td><td>Type</td><td>Description</td></tr><tr><td>species</td><td>(none)</td><td>STRING</td><td>Chemical symbols for all elements in the sys- tem and have to match XYZ training files.</td></tr><tr><td>pbc</td><td>111</td><td>INT</td><td>three integer constants specify boundary con- ditions</td></tr><tr><td>rin</td><td>0.5</td><td>REAL</td><td>a real number specifies the inner cut-off radius</td></tr><tr><td>rcut</td><td>5.0</td><td>REAL</td><td>a real number specifies the outer cut-off radius</td></tr><tr><td>bessel_polynomial_degree</td><td>4</td><td>INT</td><td>the maximum degree of Bessel polynomials</td></tr><tr><td>inverse_polynomial_degree</td><td>8</td><td>INT</td><td>the maximum degree of inverse radial basis functions</td></tr><tr><td>number_of_environment_clusters</td><td>1</td><td>INT</td><td>the number of clusters for environment- adaptive potentials</td></tr><tr><td>number_of_principal_components</td><td>2</td><td>INT</td><td>the number of principal components for di- mensionality reduction</td></tr><tr><td>onebody</td><td>1</td><td>BOOL</td><td>turns on/off one-body potential</td></tr><tr><td>twobody_number_radial_basis_functions</td><td>8</td><td>INT</td><td>number of radial basis functions for two-body potential</td></tr><tr><td>threebody_number_radial_basis_functions</td><td>6</td><td>INT</td><td>number of radial basis functions for three- body potential</td></tr><tr><td>threebody_angular_degree</td><td>5</td><td>INT</td><td>angular degree for three-body potential</td></tr><tr><td>fourbody_number_radial_basis_functions</td><td>4</td><td>INT</td><td>number of radial basis functions for four-body potential</td></tr><tr><td>fourbody_angular_degree</td><td>3</td><td>INT</td><td>angular degree for four-body potential</td></tr><tr><td>fivebody_number_radial_basis_functions</td><td>0</td><td>INT</td><td>number of radial basis functions for five-body potential</td></tr><tr><td>fivebody_angular_degree</td><td>0</td><td>INT</td><td>angular degree for five-body potential</td></tr><tr><td>sixbody_number_radial_basis_functions</td><td>0</td><td>INT</td><td>number of radial basis functions for six-body potential</td></tr><tr><td>sixbody_angular_degree</td><td>0</td><td>INT</td><td>angular degree for six-body potential</td></tr><tr><td>sevenbody_number_radial_basis_functions</td><td>0</td><td>INT</td><td>number of radial basis functions for seven- body potential</td></tr><tr><td>sevenbody_angular_degree</td><td>0</td><td>INT</td><td>angular degree for seven-body potential</td></tr></table></body></html>  

Note that both the number of radial basis functions and angular degree must decrease as the body order increases. The next table describes all keywords that can be used in the second input file (i.e. Ta_data.pod in the example above):  

<html><body><table><tr><td>Keyword</td><td>De- fault</td><td>Type</td><td>Description</td></tr><tr><td>file_format</td><td>extxyz</td><td>STRING</td><td>only the extended xyz format (extxyz) is cur- rently supported</td></tr><tr><td>file_extension</td><td>xyz</td><td>STRING</td><td>extension of the data files</td></tr><tr><td>path_to_training_data_set</td><td>(none)</td><td>STRING</td><td>specifies the path to training data files in double quotes</td></tr><tr><td>path_to_test_data_set</td><td>6699</td><td>STRING</td><td>specifies the path to test data files in double quotes</td></tr><tr><td>path_to_environment_configuration_set</td><td></td><td>STRING</td><td>specifies the path to environment configuration files in double quotes</td></tr><tr><td>fraction_training_data_set</td><td>1.0</td><td>REAL</td><td>a real number (<= 1.0) specifies the fraction of the training set used to fit POD</td></tr><tr><td>randomize_training_data_set</td><td>0</td><td>BOOL</td><td>turns on/off randomization of the training set</td></tr><tr><td>fraction_test_data_set</td><td>1.0</td><td>REAL</td><td>a real number (<= 1.0) specifies the fraction of the test set used to validate POD</td></tr><tr><td>randomize_test_data_set</td><td>0</td><td>BOOL</td><td>turns on/off randomization of the test set</td></tr><tr><td>fitting_weight_energy</td><td>100.0</td><td>REAL</td><td>a real constant specifies the weight for energy in the least-squares fit</td></tr><tr><td>fitting_weight_force</td><td>1.0</td><td>REAL</td><td>a real constant specifies the weight for force in the least-squares fit</td></tr><tr><td>fitting_regularization_parameter</td><td>1.0e-10</td><td>REAL</td><td>a real constant specifies the regularization pa- rameter in the least-squares fit</td></tr><tr><td>error_analysis_for_training_data_set</td><td>0</td><td>BOOL</td><td>turns on/off error analysis for the training data set</td></tr><tr><td>error_analysis_for_test_data_set</td><td>0</td><td>BOOL</td><td>turns on/off error analysis for the test data set</td></tr><tr><td>basename_for_output_files</td><td>pod</td><td>STRING</td><td>a basename string added to the output files</td></tr><tr><td>precision_for_pod_coefficients</td><td>8</td><td>INT</td><td>number of digits after the decimal points for numbers in the coefficient file</td></tr><tr><td>group_weights</td><td>global</td><td>STRING</td><td>table uses group weights defined for each group named by filename</td></tr></table></body></html>  

All keywords except path_to_training_data_set have default values. If a keyword is not set in the input file, its default value is used. After successful training, a number of output files are produced, if enabled:  

• <basename>_training_errors.pod reports the errors in energy and forces for the training data set • <basename>_training_analysis.pod reports detailed errors for all training configurations • <basename>_test_errors.pod reports errors for the test data set • <basename>_test_analysis.pod reports detailed errors for all test configurations • <basename $>$ _coefficients.pod contains the coefficients of the POD potential  

After training the POD potential, Ta_param.pod and $<$ basename $>$ _coefficients.pod are the two files needed to use the POD potential in LAMMPS. See pair_style pod for using the POD potential. Examples about training and using POD potentials are found in the directory lammps/examples/PACKAGES/pod and the Github repo https://github.com/ cesmix-mit/pod-examples.  

# Loss Function Group Weights  

The group_weights keyword in the data.pod file is responsible for weighting certain groups of configurations in the loss function. For example:  

<html><body><table><tr><td></td></tr><tr><td>group_weights table Displaced _A15 100.0 1.0</td></tr><tr><td>Displaced_BCC 100.0 1.0</td></tr><tr><td>Displaced_FCC 100.0 1.0</td></tr><tr><td>Elastic_BCC 100.0 1.0</td></tr><tr><td>Elastic FCC 100.0 1.0</td></tr><tr><td>GSF 110 100.0 1.0</td></tr><tr><td>GSF 112 100.0 1.0</td></tr><tr><td>Liquid 100.0 1.0</td></tr><tr><td>Surface 100.0 1.0</td></tr><tr><td>Volume A15 100.0 1.0</td></tr><tr><td>Volume BCC 100.0 1.0 Volume FCC 100.0 1.0</td></tr></table></body></html>  

This will apply an energy weight of 100.0 and a force weight of 1.0 for all groups in the Ta example. The groups are named by their respective filename. If certain groups are left out of this table, then the globally defined weights from the fitting_weight_energy and fitting_weight_force keywords will be used.  

# 1.32.4 POD Potential  

We consider a multi-element system of $N$ atoms with $N_{\mathrm{e}}$ unique elements. We denote by $r_{n}$ and $Z_{n}$ position vector and type of an atom $n$ in the system, respectively. Note that we have $Z_{n}\in\{1,\ldots,N_{\mathrm{e}}\}$ , $R=(r_{1},r_{2},\ldots,r_{N})\in\mathbb{R}^{3N}$ , and $Z=(Z_{1},Z_{2},\ldots,Z_{N})\in\mathbb{N}^{N}$ . The total energy of the POD potential is expressed as $\begin{array}{r}{E(R,Z)=\sum_{i=1}^{N}E_{i}(R_{i},Z_{i})}\end{array}$ , where  

$$
E_{i}(R_{i},Z_{i})=\sum_{m=1}^{M}c_{m}D_{i m}(R_{i},Z_{i}) 
$$  

Here $c_{m}$ are trainable coefficients and $\mathcal{D}_{i m}(R_{i},Z_{i})$ are per-atom POD descriptors. Summing the per-atom descriptors over $i$ yields the global descriptors $\begin{array}{r}{d_{m}(R,Z)=\sum_{i=1}^{N}\mathcal{D}_{i m}(R_{i},Z_{i})}\end{array}$ . It thus follows that $\begin{array}{r}{E(R,Z)=\sum_{m=1}^{M}c_{m}d_{m}(R,Z)}\end{array}$ .  

The per-atom POD descriptors include one, two, three, four, five, six, and seven-body descriptors, which can be specified in the first input file. Furthermore, the per-atom POD descriptors also depend on the number of environment clusters specified in the first input file. Please see (Nguyen2024) and (Nguyen and Sema) for the detailed description of the per-atom POD descriptors.  

# 1.32.5 Training  

A POD potential is trained using the least-squares regression against density functional theory (DFT) data. Let $J$ be the number of training configurations, with $N_{j}$ being the number of atoms in the $\mathrm{j}$ -th configuration. The training configurations are extracted from the extended XYZ files located in a directory (i.e., path_to_training_data_set in the second input file). Let $\{E_{j}^{\star}\}_{j=1}^{J}$ and $\{F_{j}^{\star}\}_{j=1}^{J}$ be the DFT energies and forces for $J$ configurations. Next, we calculate the global descriptors and their derivatives for all training configurations. Let $d_{j m}$ , $1\leq m\leq M$ , be the global descriptors associated with the j-th configuration, where $M$ is the number of global descriptors. We then form a matrix $A\in\mathbb{R}^{J\times M}$ with entries $A_{j m}=d_{j m}/N_{j}$ for $j=1,\ldots,J$ and $m=1,\ldots,M$ . Moreover, we form a matrix $B\in\mathbb{R}^{\mathcal{N}\times M}$ by stacking the derivatives of the global descriptors for all training configurations from top to bottom, where $\begin{array}{r}{\mathcal{N}=3\sum_{j=1}^{J}N_{j}}\end{array}$ .  

The coefficient vector $c$ of the POD potential is found by solving the following least-squares problem  

$$
\begin{array}{r}{\operatorname*{min}_{c\in{\mathbb R}^{M}}\:w_{E}\|A c-\bar{E}^{\star}\|^{2}+w_{F}\|B c+F^{\star}\|^{2}+w_{R}\|c\|^{2},}\end{array}
$$  

where $w_{E}$ and $w_{F}$ are weights for the energy (fitting_weight_energy) and force (fitting_weight_force), respectively; and $w_{R}$ is the regularization parameter (fitting_regularization_parameter). Here $\bar{E}^{\star}\in\mathbb{R}^{J}$ is a vector of with entries $\bar{E}_{j}^{\star}=E_{j}^{\star}/N_{j}$ and $F^{\star}$ is a vector of $\mathcal{N}$ entries obtained by stacking $\{F_{j}^{\star}\}_{j=1}^{J}$ from top to bottom.  

# 1.32.6 Validation  

POD potential can be validated on a test dataset in a directory specified by setting path_to_test_data_set in the second input file. It is possible to validate the POD potential after the training is complete. This is done by providing the coefficient file as an input to fitpod, for example,  

fitpod Ta_param.pod Ta_data.pod Ta_coefficients.pod  

# 1.32.7 Restrictions  

This command is part of the ML-POD package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 1.32.8 Related commands  

pair_style pod, compute pod/atom, compute podd/atom, compute pod/local, compute pod/global  

# 1.32.9 Default  

The keyword defaults are also given in the description of the input files.  

(Nguyen and Rohskopf) Nguyen and Rohskopf, Journal of Computational Physics, 480, 112030, (2023).   
(Nguyen2023) Nguyen, Physical Review B, 107(14), 144103, (2023).   
(Nguyen2024) Nguyen, Journal of Computational Physics, 113102, (2024).   
(Nguyen and Sema) Nguyen and Sema, https://arxiv.org/abs/2405.00306, (2024).  

# 1.33 geturl command  

# 1.33.1 Syntax  

geturl url keyword args ...  

• $\mathrm{url}=\mathrm{URL}$ of the file to download • zero or more keyword argument pairs may be provided • keyword $=$ output or verify or overwrite or verbose  

output filename $=$ write to filename instead of inferring the name from the URL verify yes/no $=$ verify SSL certificate and hostname if yes, do not if no overwrite yes/ $\mathrm{{no}=i}$ f yes overwrite the output file in case it exists, do not if no verbose yes/no $=$ if yes write verbose debug output from libcurl to screen, do not if no  

# 1.33.2 Examples  

geturl https://www.ctcms.nist.gov/potentials/Download/1990--Ackland-G-J-Vitek-V--Cu/2/Cu2.eam.fs geturl https://github.com/lammps/lammps/blob/develop/bench/in.lj output in.bench-lj  

# 1.33.3 Description  

Added in version $29\mathrm{Aug}2024$ .  

Download a file from an URL to the local disk. This is implemented with the libcurl library which supports a large variety of protocols including “http”, “https”, “ftp”, “scp”, “sftp”, “file”. The transfer will only be performed on MPI rank 0.  

The output keyword can be used to set the filename. By default, the last part of the URL is used.  

The verify keyword determines whether libcurl will validate the SSL certificate and hostname for encrypted connections. Turning this off may be required when using a proxy or connecting to a server with a self-signed SSL certificate.  

The overwrite keyword determines whether a file should be overwritten if it already exists. If the argument is no, then the download will be skipped if the file exists.  

The verbose keyword determines whether a detailed protocol of the steps performed by libcurl is written to the screen. Using the argument yes can be used to debug connection issues when the geturl command does not behave as expected. If the argument is no, geturl will operate silently and only report the error status number provided by libcurl, in case of a failure.  

# 1.33.4 Restrictions  

This command is part of the EXTRA-COMMAND package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. It also requires that LAMMPS was built with support for the libcurl library. See the page about Compiling LAMMPS with libcurl support for further info. If support for libcurl is not included, using geturl will trigger an error.  

# 1.33.5 Related commands  

shell  

# 1.33.6 Default  

verify $=$ yes, overwrite $=$ yes  

# 1.34 group command  

# 1.34.1 Syntax  

group ID style args  

• $\mathrm{ID}=$ user-defined name of the group   
• style $=$ delete or clear or empty or region or type or id or molecule or variable or include or subtract or union or intersect or dynamic or static delet $\u=\mathrm{no}$ args clea $\mathrm{r}=\mathrm{no}$ args empty $=\mathrm{no}$ args region args $=$ region-ID type or id or molecule args $=$ list of one or more atom types (1-Ntypes or type label), atom IDs, or molecule IDs any numeric entry in list can be a sequence formatted as A:B or A:B:C where A = starting index, B = ending index, C = increment between indices, 1 if not specified  

args = logical value logical = " $<$ " or "<=" or " $>$ " or " $\mathcal{>}$ =" or "==" or "!=" value = an atom type (1-Ntypes or type label) or atom ID or molecule ID (depending on style) args = logical value1 value2 logical = " $<>$ " value1,value2 = atom types or atom IDs or molecule IDs (depending on style) variable args = variable-name include args = molecule molecule = add atoms to group with same molecule ID as atoms already in group subtract args = two or more group IDs union args = one or more group IDs intersect args = two or more group IDs dynamic args = parent-ID keyword value ... one or more keyword/value pairs may be appended keyword = region or var or property or every region value = region-ID var value $=$ name of variable property value $=$ name of custom integer or floating point vector every value = N = update group every this many timesteps static = no args  

# 1.34.2 Examples  

<html><body><table><tr><td>group edge region regstrip group water type 3 4 group water type OW HT</td><td></td></tr></table></body></html>  

# 1.34.3 Description  

Identify a collection of atoms as belonging to a group. The group ID can then be used in other commands such as $f\boldsymbol{{x}}$ , compute, dump, or velocity to act on those atoms together.  

If the group ID already exists, the group command adds the specified atoms to the group.  

# Note  

By default groups are static, meaning the atoms are permanently assigned to the group. For example, if the region style is used to assign atoms to a group, the atoms will remain in the group even if they later move out of the region. As explained below, the dynamic style can be used to make a group dynamic so that a periodic determination is made as to which atoms are in the group. Since many LAMMPS commands operate on groups of atoms, you should think carefully about whether making a group dynamic makes sense for your model.  

A group with the ID all is predefined. All atoms belong to this group. This group cannot be deleted, or made dynamic.  

The delete style removes the named group and un-assigns all atoms that were assigned to that group. Since there is a restriction (see below) that no more than 32 groups can be defined at any time, the delete style allows you to remove groups that are no longer needed, so that more can be specified. You cannot delete a group if it has been used to define a current $f\boldsymbol{{x}}$ or compute or dump.  

The clear style un-assigns all atoms that were assigned to that group. This may be dangerous to do during a simulation run (e.g., using the run every command if a fix or compute or other operation expects the atoms in the group to remain constant), but LAMMPS does not check for this.  

The empty style creates an empty group, which is useful for commands like fix gcmc or with complex scripts that add atoms to a group.  

The region style puts all atoms in the region volume into the group. Note that this is a static one-time assignment. The atoms remain assigned (or not assigned) to the group even in they later move out of the region volume.  

The type, id, and molecule styles put all atoms with the specified atom types, atom IDs, or molecule IDs into the group.   
These three styles can use arguments specified in one of two formats.  

The first format is a list of values (types or IDs). For example, the second command in the examples above puts all atoms of type 3 or 4 into the group named water. Each numeric entry in the list can be a colon-separated sequence A:B or A:B:C, as in two of the examples above. A “sequence” generates a sequence of values (types or IDs), with an optional increment. The first example with 500:1000 has the default increment of 1 and would add all atom IDs from 500 to 1000 (inclusive) to the group sub, along with 10, 25, and 50 since they also appear in the list of values. The second example with 100:10000:10 uses an increment of 10 and would thus would add atoms IDs 100, 110, 120, . . . , 9990, 10000 to the group sub.  

The second format is a logical followed by one or two values (type or ID). The 7 valid logicals are listed above. All the logicals except $<>$ take a single argument. The third example above adds all atoms with IDs from 1 to 150 to the group named sub. The logical $<>$ means “between” and takes 2 arguments. The fourth example above adds all atoms belonging to molecules with IDs from 50 to 250 (inclusive) to the group named polyA. For the type style, type labels are converted into numeric types before being evaluated.  

The variable style evaluates a variable to determine which atoms to add to the group. It must be an atom-style variable previously defined in the input script. If the variable evaluates to a non-zero value for a particular atom, then that atom is added to the specified group.  

Atom-style variables can specify formulas that include thermodynamic quantities, per-atom values such as atom coordinates, or per-atom quantities calculated by computes, fixes, or other variables. They can also include Boolean logic where two numeric values are compared to yield a 1 or 0 (effectively a true or false). Thus, using the variable style is a general way to flag specific atoms to include or exclude from a group.  

For example, these lines define a variable “eatom” that calculates the potential energy of each atom and includes it in the group if its potential energy is above the threshold value $-3.0$ .  

<html><body><table><tr><td rowspan="2" colspan="2">compute compute thermo style run variable group</td><td>1 all pe/atom C1</td></tr><tr><td>2 all reduce sum custom step temp pe c_2</td></tr></table></body></html>  

# Note that these lines  

compute 2 all reduce sum c_1 thermo_style custom step temp pe c_2 run 0 post no  

are necessary to ensure that the “eatom” variable is current when the group command invokes it. Because the eatom variable computes the per-atom energy via the pe/atom compute, it will only be current if a run has been performed which evaluated pairwise energies, and the pe/atom compute was actually invoked during the run. Printing the thermodynamic info for compute 2 ensures that this is the case, since it sums the pe/atom compute values (in the reduce compute) to output them to the screen. See the “Variable Accuracy” section of the variable page for more details on ensuring that variables are current when they are evaluated between runs.  

The include style with its arg molecule adds atoms to a group that have the same molecule ID as atoms already in the group. The molecule $\mathrm{ID}=0$ is ignored in this operation, since it is assumed to flag isolated atoms that are not part of molecules. An example of where this operation is useful is if the region style has been used previously to add atoms to a group that are within a geometric region. If molecules straddle the region boundary, then atoms outside the region that are part of molecules with atoms inside the region will not be in the group. Using the group command a second time with include molecule will add those atoms that are outside the region to the group.  

# Note  

The include molecule operation is relatively expensive in a parallel sense. This is because it requires communication of relevant molecule IDs between all the processors and each processor to loop over its atoms once per processor, to compare its atoms to the list of molecule IDs from every other processor. Hence it scales as N, rather than N/P as most of the group operations do, where N is the number of atoms, and P is the number of processors.  

The subtract style takes a list of two or more existing group names as arguments. All atoms that belong to the first group, but not to any of the other groups are added to the specified group.  

The union style takes a list of one or more existing group names as arguments. All atoms that belong to any of the listed groups are added to the specified group.  

The intersect style takes a list of two or more existing group names as arguments. Atoms that belong to every one of the listed groups are added to the specified group.  

The dynamic style flags an existing or new group as dynamic. This means atoms will be (re)assigned to the group periodically as a simulation runs. This is in contrast to static groups where atoms are permanently assigned to the group. The way the assignment occurs is as follows. Only atoms in the group specified as the parent group via the parent-ID are assigned to the dynamic group before the following conditions are applied.  

If the region keyword is used, atoms not in the specified region are removed from the dynamic group.  

If the var keyword is used, the variable name must be an atom-style or atomfile-style variable. The variable is evaluated and atoms whose per-atom values are 0.0, are removed from the dynamic group.  

If the property keyword is used, the name refers to a custom integer or floating point per-atom vector defined via the fix property/atom command. This means the values in the vector can be read as part of a data file with the read_data command or specified with the set command. Or accessed and changed via the library interface to LAMMPS, or by styles you add to LAMMPS (pair, fix, compute, etc) which access the custom vector and modify its values. Which means the values can be modified between or during simulations. Atoms whose values in the custom vector are zero are removed from the dynamic group. Note that the name of the custom per-atom vector is specified just as name, not as i_name or $d_{\cdot}$ _name as it is for other commands that use different kinds of custom atom vectors or arrays as arguments.  

The assignment of atoms to a dynamic group is done at the beginning of each run and on every timestep that is a multiple of $N$ , which is the argument for the every keyword $N=1$ is the default). For an energy minimization, via the minimize command, an assignment is made at the beginning of the minimization, but not during the iterations of the minimizer.  

The point in the timestep at which atoms are assigned to a dynamic group is after interatomic forces have been computed, but before any fixes which alter forces or otherwise update the system have been invoked. This means that atom positions have been updated, neighbor lists and ghost atoms are current, and both intermolecular and intramolecular forces have been calculated based on the new coordinates. Thus the region criterion, if applied, should be accurate. Also, any computes invoked by an atom-style variable should use updated information for that timestep (e.g., potential energy/atom or coordination number/atom). Similarly, fixes or computes which are invoked after that point in the timestep, should operate on the new group of atoms.  

![](images/cd044cd2793d6cc428b3c9d3c0ecad8b62e60807130e7d2d4eb02ce1cf770a9f.jpg)  

# Note  

If the region keyword is used to determine what atoms are in the dynamic group, atoms can move outside of the simulation box between reneighboring events. Thus if you want to include all atoms on the left side of the simulation box, you probably want to set the left boundary of the region to be outside the simulation box by some reasonable amount (e.g., up to the cutoff of the potential), else they may be excluded from the dynamic region.  

Here is an example of using a dynamic group to shrink the set of atoms being integrated by using a spherical region with a variable radius (shrinking from 18 to 5 over the course of the run). This could be used to model a quench of the system, freezing atoms outside the shrinking sphere, then converting the remaining atoms to a static group and running further.  

variable nsteps equal 5000   
variable rad equal 18-(step/v_nsteps)\*(18-5)   
region ss sphere 20 20 0 v_rad   
group mobile dynamic all region ss   
fix 1 mobile nve   
run \${nsteps}   
group mobile static   
run \${nsteps}  

# Note  

All fixes and computes take a group ID as an argument, but they do not all allow for use of a dynamic group. If you get an error message that this is not allowed, but feel that it should be for the fix or compute in question, then please post your reasoning to the LAMMPS forum at MatSci and we can look into changing it. The same applies if you come across inconsistent behavior when dynamic groups are allowed.  

The static style removes the setting for a dynamic group, converting it to a static group (the default). The atoms in the static group are those currently in the dynamic group.  

# 1.34.4 Restrictions  

There can be no more than 32 groups defined at one time, including “all”.   
The parent group of a dynamic group cannot itself be a dynamic group.  

# 1.34.5 Related commands  

dump, fix, region, velocity  

# 1.34.6 Default  

All atoms belong to the “all” group.  

# 1.35 group2ndx command  

# 1.36 ndx2group command  

# 1.36.1 Syntax  

group2ndx file args ndx2group file args  

• file $=$ name of index file to write out or read in • args $=$ zero or more group IDs may be appended  

# 1.36.2 Examples  

group2ndx allindex.ndx   
group2ndx someindex.ndx upper lower mobile   
ndx2group someindex.ndx   
ndx2group someindex.ndx mobile  

# 1.36.3 Description  

Write or read a Gromacs style index file in text format that associates atom IDs with the corresponding group definitions. This index file can be used with in combination with Gromacs analysis tools or to import group definitions into the $f\alpha$ colvars input file.  

It can also be used to save and restore group definitions for static groups using the individual atom IDs. This may be important if the original group definition depends on a region or otherwise on the geometry and thus cannot be easily recreated.  

Another application would be to import atom groups defined for Gromacs simulation into LAMMPS. When translating Gromacs topology and geometry data to LAMMPS.  

The group2ndx command will write group definitions to an index file. Without specifying any group IDs, all groups will be written to the index file. When specifying group IDs, only those groups will be written to the index file. In order to follow the Gromacs conventions, the group all will be renamed to System in the index file.  

The ndx2group command will create or update group definitions from those stored in an index file. Without specifying any group IDs, all groups except System will be read from the index file and the corresponding groups recreated. If a group of the same name already exists, it will be completely reset. When specifying group IDs, those groups, if present, will be read from the index file and restored.  

# 1.36.4 File Format  

The file format is equivalent and compatible with what is produced by the Gromacs make_ndx command. and follows the Gromacs definition of an ndx file  

Each group definition begins with the group name in square brackets with blanks, e.g. [ water ] and is then followed by the list of atom indices, which may be spread over multiple lines. Here is a small example file:  

[ Oxygen ]   
1 4 7   
[ Hydrogen ] 2 3 5 6   
8 9  

(continues on next page)  

# 1.35. group2ndx command  

(continued from previous page)  

The index file defines 3 groups: Oxygen, Hydrogen, and Water and the latter happens to be the union of the first two.  

# 1.36.5 Restrictions  

These commands require that atoms have atom IDs, since this is the information that is written to the index file.  

These commands are part of the EXTRA-COMMAND package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 1.36.6 Related commands  

group, dump, fix colvars  

# 1.36.7 Default  

none  

# 1.37 hyper command  

# 1.37.1 Syntax  

hyper N Nevent fix-ID compute-ID keyword values ...  

• $\Nu=\#$ of timesteps to run   
• Nevent $=$ check for events every this many steps   
• fix- $\mathrm{\cdotID}=\mathrm{ID}$ of a fix that applies a global or local bias potential, can be NULL   
• compute- $\mathrm{\cdotID}=\mathrm{ID}$ of a compute that identifies when an event has occurred   
• zero or more keyword/value pairs may be appended   
• keyword $=$ min or dump or rebond min values $=$ etol ftol maxiter maxeval etol $=$ stopping tolerance for energy, used in quenching ftol $=$ stopping tolerance for force, used in quenching maxiter $=$ max iterations of minimize, used in quenching maxeval $=$ max number of force/energy evaluations, used in quenching dump value = dump-ID dump-ID = ID of dump to trigger whenever an event takes place rebond value = Nrebond Nrebond = frequency at which to reset bonds, even if no event has occurred  

# 1.37.2 Examples  

compute event all event/displace 1.0   
fix HG mobile hyper/global 3.0 0.3 0.4 800.0   
hyper 5000 100 HG event min 1.0e-6 1.0e-6 100 100 dump 1 dump 5  

# 1.37.3 Description  

Run a bond-boost hyperdynamics (HD) simulation where time is accelerated by application of a bias potential to one or more pairs of nearby atoms in the system. This command can be used to run both global and local hyperdynamics. In global HD a single bond within the system is biased on each timestep. In local HD multiple bonds (separated by a sufficient distance) can be biased simultaneously at each timestep. In the bond-boost hyperdynamics context, a “bond” is not a covalent bond between a pair of atoms in a molecule. Rather it is simply a pair of nearby atoms as discussed below.  

Both global and local HD are described in (Voter2013) by Art Voter and collaborators. Similar to parallel replica dynamics (PRD), global and local HD are methods for performing accelerated dynamics that are suitable for infrequentevent systems that obey first-order kinetics. A good overview of accelerated dynamics methods (AMD) for such systems in given in (Voter2002) from the same group. To quote from the review paper: “The dynamical evolution is characterized by vibrational excursions within a potential basin, punctuated by occasional transitions between basins. The transition probability is characterized by $\mathrm{p(t)}=\mathrm{k}^{\ast}\mathrm{exp(-kt)}$ where $\mathbf{k}$ is the rate constant.”  

Both HD and PRD produce a time-accurate trajectory that effectively extends the timescale over which a system can be simulated, but they do it differently. HD uses a single replica of the system and accelerates time by biasing the interaction potential in a manner such that each timestep is effectively longer. PRD creates Nr replicas of the system and runs dynamics on each independently with a normal unbiased potential until an event occurs in one of the replicas. The time between events is reduced by a factor of $\mathrm{Nr}$ replicas. For both methods, per CPU second, more physical time elapses and more events occur. See the prd page for more info about PRD.  

An HD run has several stages, which are repeated each time an event occurs, as explained below. The logic for an HD run is as follows:  

<html><body><table><tr><td>quench</td></tr><tr><td>create initial list of bonds</td></tr><tr><td></td></tr><tr><td>while (time remains):</td></tr><tr><td>run dynamics for Nevent steps</td></tr><tr><td>quench</td></tr><tr><td>check for an event</td></tr><tr><td>if event occurred: reset list of bonds restore pre-quench state</td></tr></table></body></html>  

The list of bonds is the list of atom pairs of atoms that are within a short cutoff distance of each other after the system energy is minimized (quenched). This list is created and reset by a fix hyper/global or fix hyper/local command specified as fix-ID. At every dynamics timestep, the same fix selects one of more bonds to apply a bias potential to.  

# Note  

The style of fix associated with the specified fix-ID determines whether you are running the global versus local hyperdynamics algorithm.  

Dynamics (with the bias potential) is run continuously, stopping every Nevent steps to check if a transition event has occurred. The specified $N$ for total steps must be a multiple of Nevent. check is performed by quenching the system and comparing the resulting atom coordinates to the coordinates from the previous basin.  

A quench is an energy minimization and is performed by whichever algorithm has been defined by the min_style command. Minimization parameters may be set via the min_modify command and by the min keyword of the hyper command. The latter are the settings that would be used with the minimize command. Note that typically, you do not need to perform a highly-converged minimization to detect a transition event, though you may need to in order to prevent a set of atoms in the system from relaxing to a saddle point.  

The event check is performed by a compute with the specified compute-ID. Currently there is only one compute that  

# 1.37. hyper command  

works with the hyper command, which is the compute event/displace command. Other event-checking computes may be added. Compute event/displace checks whether any atom in the compute group has moved further than a specified threshold distance. If so, an event has occurred.  

If this happens, the list of bonds is reset, since some bond pairs are likely now too far apart, and new pairs are likely close enough to be considered a bond. The pre-quenched state of the system (coordinates and velocities) is restored, and dynamics continue.  

At the end of the hyper run, a variety of statistics are output to the screen and logfile. These include info relevant to both global and local hyperdynamics, such as the number of events and the elapsed hyper time (accelerated time), And it includes info specific to one or the other, depending on which style of fix was specified by fix-ID.  

The optional keywords operate as follows.  

As explained above, the min keyword can be used to specify parameters for the quench. Their meaning is the same as for the minimize command  

The dump keyword can be used to trigger a specific dump command with the specified dump- $\mathbf{\nabla}\cdot I D$ to output a snapshot each time an event is detected. It can be specified multiple times with different dump- $I D$ values, as in the example above. These snapshots will be for the quenched state of the system on a timestep that is a multiple of Nevent, i.e. a timestep after the event has occurred. Note that any dump command in the input script will also output snapshots at whatever timestep interval it defines via its $N$ argument; see the dump command for details. This means if you only want a particular dump to output snapshots when events are detected, you should specify its $N$ as a value larger than the length of the hyperdynamics run.  

As in the code logic above, the bond list is normally only reset when an event occurs. The rebond keyword will force a reset of the bond list every Nrebond steps, even if an event has not occurred. Nrebond must be a multiple of Nevent. This can be useful to check if more frequent resets alter event statistics, perhaps because the parameters chosen for defining what is a bond and what is an event are producing bad dynamics in the presence of the bias potential.  

# 1.37.4 Restrictions  

This command can only be used if LAMMPS was built with the REPLICA package. See the Build package doc page for more info.  

# 1.37.5 Related commands  

fix hyper/global, fix hyper/local, compute event/displace, prd  

# 1.37.6 Default  

The option defaults are $\mathrm{min}=0.10.14050$ and time $=$ steps.  

(Voter2013) S. Y. Kim, D. Perez, A. F. Voter, J Chem Phys, 139, 144110 (2013).   
(Voter2002) Voter, Montalenti, Germann, Annual Review of Materials Research 32, 321 (2002).  

# 1.38 if command  

# 1.38.1 Syntax  

if boolean then t1 t2 ... elif boolean f1 f2 ... elif boolean f1 f2 ... else e1 e2 ...  

• boolean ${\mathbf{\mu}}={\mathbf{2}}$ Boolean expression evaluated as TRUE or FALSE (see below)   
• then $=$ required word   
• t1,t2,. . . ,tN $=$ one or more LAMMPS commands to execute if condition is met, each enclosed in quotes   
• elif $=$ optional word, can appear multiple times   
• f1,f2,. . . ,fN $=$ one or more LAMMPS commands to execute if elif condition is met, each enclosed in quotes (optional arguments)   
• else $=$ optional argument   
• e1,e2,. . . ,eN $=$ one or more LAMMPS commands to execute if no condition is met, each enclosed in quotes (optional arguments)  

# 1.38.2 Examples  

if " $^1\Phi\{\mathrm{steps}\}>1000"$ then quit   
if $"9\{\mathrm{myString}\}==\mathrm{a10"}$ then quit   
if $^{11}\S_{\mathrm{X}}<=\S_{\mathrm{y}^{11}}$ then "print $^{1}\mathrm{X}$ is smaller $=\$8$ else "print 'Y is smaller = \$y'"   
if " $\mathrm{|(\Phi(e n g)>0.0\$ ) $||$ ( $\Phi\mathrm{n}<1000)$ " then $\&$ "timestep 0.005" &   
elif \$n<10000 & "timestep 0.01" &   
else & "timestep 0.02" & "print 'Max step reached'"   
if " $"\S\{\mathrm{eng}\}>\S\{\mathrm{eng}\_\mathrm{previous}\}"$ then "jump file1" else "jump file2"  

# 1.38.3 Description  

This command provides an if-then-else capability within an input script. A Boolean expression is evaluated and the result is TRUE or FALSE. Note that as in the examples above, the expression can contain variables, as defined by the variable command, which will be evaluated as part of the expression. Thus a user-defined formula that reflects the current state of the simulation can be used to issue one or more new commands.  

If the result of the Boolean expression is TRUE, then one or more commands $(\mathrm{t}1,\mathrm{t}2,\ldots,\mathrm{tN})$ are executed. If it is FALSE, then Boolean expressions associated with successive elif keywords are evaluated until one is found to be true, in which case its commands (f1, f2, . . . , fN) are executed. If no Boolean expression is TRUE, then the commands associated with the else keyword, namely (e1, e2, . . . , eN), are executed. The elif and else keywords and their associated commands are optional. If they are not specified and the initial Boolean expression is FALSE, then no commands are executed.  

The syntax for Boolean expressions is described below.  

Each command (t1, f1, e1, etc.) can be any valid LAMMPS input script command. If the command is more than one word, it must enclosed in quotes, so it will be treated as a single argument, as in the examples above.  

# Note  

If a command itself requires a quoted argument (e.g., a print command), then double and single quotes can be used and nested in the usual manner, as in the examples above and below. The Commands parse page has more details on using quotes in arguments. Only one of level of nesting is allowed, but that should be sufficient for most use cases.  

Note that by using the line continuation character “&”, the if command can be spread across many lines, though it is still a single command:  

if "\$a < \$b" then & "print 'Minimum value = \$a'" & "run 1000" &   
else & 'print "Minimum value = \$b"' & "minimize 0.001 0.001 1000 10000"  

Note that if one of the commands to execute is quit, as in the first example above, then executing the command will cause LAMMPS to halt.  

Note that by jumping to a label in the same input script, the if command can be used to break out of a loop. See the variable delete command for info on how to delete the associated loop variable, so that it can be re-used later in the input script.  

Here is an example of a loop which checks every 1000 steps if the system temperature has reached a certain value, and if so, breaks out of the loop to finish the run. Note that any variable could be checked, so long as it is current on the timestep when the run completes. As explained on the variable doc page, this can be ensured by including the variable in thermodynamic output.  

variable myTemp equal temp   
label loop   
variable a loop 1000   
run 1000   
if " $\mathrm{\Delta"{\Phi}}{\Phi}\{\mathrm{myTemp}\}<300.0\mathrm{\Delta"}$ then "jump SELF break"   
next a   
jump SELF loop   
label break   
print "ALL DONE"  

Here is an example of a double loop which uses the if and jump commands to break out of the inner loop when a condition is met, then continues iterating through the outer loop.  

label loopa   
variable a loop 5 label loopb variable b loop 5 print ${}^{\prime\prime}\mathrm{A},\mathrm{B}=\$9a,\S\mathrm{b}^{\prime}$ " run 10000 if $^{11}\S\mathrm{b}>2^{11}$ then "jump SELF break" next b jump in.script loopb label break variable b delete   
next a   
jump SELF loopa  

The Boolean expressions for the if and elif keywords have a C-like syntax. Note that each expression is a single argument within the if command. Thus if you want to include spaces in the expression for clarity, you must enclose the entire expression in quotes.  

An expression is built out of numbers (which start with a digit or period or minus sign) or strings (which start with a letter and can contain alphanumeric characters, underscores, or forward slashes):  

0.2, 100, 1.0e20, -15.4, ...   
InP, myString, a123, ab_23_cd, lj/cut, ...  

and Boolean operators:  

$\mathrm{A==B}$ , $\mathrm{A}:=\mathrm{B}$ , $\mathrm{~A~}<\mathrm{~B~}$ , $\mathrm{A}<=\mathrm{B}$ , $\mathrm{A}>\mathrm{B}$ , $\mathrm{A}>=\mathrm{B}$ , A && B, A || B, A |^ B, !A  

Each A and B is a number or string or a variable reference like $\$\mathrm{a}$ or $\$\{\mathrm{abc}\}$ , or $\mathbf{A}$ or B can be another Boolean expression.  

Note that all variables used will be substituted for before the Boolean expression in evaluated. A variable can produce a number, like an equal-style variable, or it can produce a string, like an index-style variable.  

The Boolean operators $==$ and $!=$ can operate on a pair or strings or numbers. They cannot compare a number to a string. All the other Boolean operations can only operate on numbers.  

Expressions are evaluated left to right and have the usual C-style precedence: the unary logical NOT operator ! has the highest precedence, the 4 relational operators $<$ , $<=,>$ , and $>=$ are next; the two remaining relational operators $==$ and $!=$ are next; then the logical AND operator $\&\&$ ; and finally the logical OR operator $||$ and logical XOR (exclusive or) operator $|\hat{\mathbf{\theta}}|$ have the lowest precedence. Parenthesis can be used to group one or more portions of an expression and/or enforce a different order of evaluation than what would occur with the default precedence.  

When the six relational operators (first six in list above) compare two numbers, they return either a 1.0 or 0.0 depending on whether the relationship between A and B is TRUE or FALSE.  

When the three logical operators (last three in list above) compare two numbers, they also return either a 1.0 or 0.0 depending on whether the relationship between A and B is TRUE or FALSE (or just A). The logical AND operator will return 1.0 if both its arguments are non-zero, else it returns 0.0. The logical OR operator will return 1.0 if either of its arguments is non-zero, else it returns 0.0. The logical XOR operator will return 1.0 if one of its arguments is zero and the other non-zero, else it returns 0.0. The logical NOT operator returns 1.0 if its argument is 0.0, else it returns 0.0. The 3 logical operators can only be used to operate on numbers, not on strings.  

The overall Boolean expression produces a TRUE result if the numeric result is non-zero. If the result is zero, the expression result is FALSE.  

![](images/bd9b26b37682209500c2d397fb673ac21ca812533d27ed2fd398ba63dbae56cc.jpg)  

# Note  

If the Boolean expression is a single numeric value with no Boolean operators, it will be FALSE if the value $=0.0$ , otherwise TRUE. If the Boolean expression is a single string, an error message will be issued.  

# 1.38.4 Restrictions  

none  

# 1.38.5 Related commands  

variable, print  

# 1.38.6 Default  

none  

# 1.38. if command  

# 1.39 improper_coeff command  

# 1.39.1 Syntax  

improper_coeff N args  

• $\Nu=$ numeric improper type (see asterisk form below), or type label • args $=$ coefficients for one or more improper types  

# 1.39.2 Examples  

improper_coeff 1 300.0 0.0   
improper_coeff \* 80.2 -1 2   
improper_coeff \*4 80.2 -1 2   
labelmap improper 1 benzene   
improper_coeff benzene 300.0 0.0  

# 1.39.3 Description  

Specify the improper force field coefficients for one or more improper types. The number and meaning of the coefficients depends on the improper style. Improper coefficients can also be set in the data file read by the read_data command or in a restart file.  

$N$ can be specified in one of two ways. An explicit numeric value can be used, as in the first example above. Or $N$ can be a type label, which is an alphanumeric string defined by the labelmap command or in a section of a data file read by the read_data command.  

For numeric values only, a wild-card asterisk can be used to set the coefficients for multiple improper types. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $\mathbf{\Psi}^{66}\mathbf{n}^{*}{}^{,}$ or $\mathrm{^{6}m^{*}n^{,}}$ . If $N=$ the number of improper types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

Note that using an improper_coeff command can override a previous setting for the same improper type. For example, these commands set the coeffs for all improper types, then overwrite the coeffs for just improper type 2:  

<html><body><table><tr><td>improper _coeff * 300.0 0.0</td></tr></table></body></html>  

A line in a data file that specifies improper coefficients uses the exact same format as the arguments of the improper_coeff command in an input script, except that wild-card asterisks should not be used since coefficients for all $N$ types must be listed in the file. For example, under the “Improper Coeffs” section of a data file, the line that corresponds to the first example above would be listed as  

# 1.39.4 Restrictions  

This command must come after the simulation box is defined by a read_data, read_restart, or create_box command.   
An improper style must be defined before any improper coefficients are set, either in the input script or in a data file.  

# 1.39.5 Related commands  

improper_style  

# 1.39.6 Default  

none  

# 1.40 improper_style command  

# 1.40.1 Syntax  

• style $=$ none or hybrid or class2 or cvff or harmonic  

# 1.40.2 Examples  

improper_style harmonic improper_style cvff improper_style hybrid cvff harmonic  

# 1.40.3 Description  

Set the formula(s) LAMMPS uses to compute improper interactions between quadruplets of atoms, which remain in force for the duration of the simulation. The list of improper quadruplets is read in by a read_data or read_restart command from a data or restart file. Note that the ordering of the 4 atoms in an improper quadruplet determines the definition of the improper angle used in the formula for each style. See the doc pages of individual styles for details.  

Hybrid models where impropers are computed using different improper potentials can be setup using the hybrid improper style.  

The coefficients associated with an improper style can be specified in a data or restart file or via the improper_coef command.  

All improper potentials store their coefficient data in binary restart files which means improper_style and improper_coeff commands do not need to be re-specified in an input script that restarts a simulation. See the read_restart command for details on how to do this. The one exception is that improper_style hybrid only stores the list of sub-styles in the restart file; improper coefficients need to be re-specified.  

# Note  

When both an improper and pair style is defined, the special_bonds command often needs to be used to turn off (or weight) the pairwise interaction that would otherwise exist between a group of 4 bonded atoms.  

Here is an alphabetic list of improper styles defined in LAMMPS. Click on the style to display the formula it computes and coefficients specified by the associated improper_coeff command.  

Click on the style to display the formula it computes, any additional arguments specified in the improper_style command, and coefficients specified by the associated improper_coeff command.  

There are also additional accelerated pair styles included in the LAMMPS distribution for faster performance on CPUs, GPUs, and KNLs. The individual style names on the Commands improper page are followed by one or more of (g,i,k,o,t) to indicate which accelerated styles exist.  

• none - turn off improper interactions   
• zero - topology but no interactions   
• hybrid - define multiple styles of improper interactions   
• amoeba - AMOEBA out-of-plane improper   
• class2 - COMPASS (class 2) improper   
• cossq - improper with a cosine squared term   
• cvff - CVFF improper   
• distance - improper based on distance between atom planes   
• distharm - improper that is harmonic in the out-of-plane distance   
• fourier - improper with multiple cosine terms   
• harmonic - harmonic improper   
• inversion/harmonic - harmonic improper with Wilson-Decius out-of-plane definition   
• ring - improper which prevents planar conformations   
• umbrella - DREIDING improper   
sqdistharm - improper that is harmonic in the square of the out-of-plane distance  

# 1.40.4 Restrictions  

Improper styles can only be set for atom_style choices that allow impropers to be defined.  

Most improper styles are part of the MOLECULE package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info. The doc pages for individual improper potentials tell if it is part of a package.  

# 1.40.5 Related commands  

improper_coeff  

# 1.40.6 Default  

# 1.41 include command  

# 1.41.1 Syntax  

• file $=$ filename of new input script to switch to  

# 1.41.2 Examples  

<html><body><table><tr><td>include newfile</td></tr><tr><td>include in.run2</td></tr><tr><td></td></tr></table></body></html>  

# 1.41.3 Description  

This command opens a new input script file and begins reading LAMMPS commands from that file. When the new file is finished, the original file is returned to. Include files can be nested as deeply as desired. If input script A includes script B, and B includes A, then LAMMPS could run for a long time.  

If the filename is a variable (see the variable command), different processor partitions can run different input scripts.  

# 1.41.4 Restrictions  

none  

# 1.41.5 Related commands  

variable, jump  

# 1.41.6 Default  

none  

# 1.42 info command  

# 1.42.1 Syntax  

info args  

• args $=$ one or more of the following keywords: out, all, system, memory, communication, computes, dumps, fixes, groups, regions, variables, coeffs, styles, time, accelerator, fft or configuration   
• out values $=$ screen, log, append filename, overwrite filename   
• styles values $=$ all, angle, atom, bond, compute, command, dump, dihedral, fix, improper, integrate, kspace, minimize, pair, region  

# 1.42.2 Examples  

info system   
info groups computes variables   
info all out log   
info all out append info.txt  

(continues on next page)  

# 1.41. include command  

(continued from previous page)  

info styles all info styles atom styles command  

# 1.42.3 Description  

Print out information about the current internal state of the running LAMMPS process. This can be helpful when debugging or validating complex input scripts. Several output categories are available and one or more output categories may be requested. All category keywords take no arguments, only out and styles take arguments as shown below. The keywords are cumulative, may be abbreviated, and unknown keywords are ignored.  

The out flag controls where the output is sent. It can only be sent to one target. By default this is the screen, if it is active. The log argument selects the log file instead. With the append and overwrite option, followed by a filename, the output is written to that file, which is either appended to or overwritten, respectively.  

The all flag activates printing all categories listed below.  

The configuration category prints some information about the LAMMPS version as well as architecture and OS it is run on.  

The memory category prints some information about the current memory allocation of MPI rank 0 (this the amount of dynamically allocated memory reported by LAMMPS classes). Where supported, also some OS specific information about the size of the reserved memory pool size (this is where malloc() and the new operator request memory from) and the maximum resident set size is reported (this is the maximum amount of physical memory occupied so far).  

The system category prints a general system overview listing. This includes the unit style, atom style, number of atoms, bonds, angles, dihedrals, and impropers and the number of the respective types, box dimensions and properties, force computing styles and more.  

The communication category prints a variety of information about communication and parallelization: the MPI library version level, the number of MPI ranks and OpenMP threads, the communication style and layout, the processor grid dimensions, ghost atom communication mode, cutoff, and related settings.  

The computes category prints a list of all currently defined computes, their IDs and styles and groups they operate on.  

The dumps category prints a list of all currently active dumps, their IDs, styles, filenames, groups, and dump frequencies.  

The fixes category prints a list of all currently defined fixes, their IDs and styles and groups they operate on.  

The groups category prints a list of all currently defined groups.  

The regions category prints a list of all currently defined regions, their IDs and styles and whether “inside” or “outside” atoms are selected.  

The variables category prints a list of all currently defined variables, their names, styles, definition and last computed value, if available.  

The coeffs category prints a list for each defined force style (pair, bond, angle, dihedral, improper) indicating which of the corresponding coefficients have been set. This can be very helpful to debug error messages like “All pair coeffs are not set”.  

The accelerator category prints out information about compile time settings of included accelerator support for the GPU, KOKKOS, INTEL, and OPENMP packages.  

Added in version 7Feb2024.  

The fft category prints out information about the included 3d-FFT support. This lists the 3d-FFT engine, FFT precision, FFT library used by the FFT engine. If the KOKKOS package is included, the settings used for the KOKKOS package are displayed as well.  

The styles category prints the list of styles available in the current LAMMPS binary. The styles keyword without option is the same as using the “all” option. One of the following options may be used to control which category of styles is printed out. To select multiple categories, the styles keyword needs to be used multiple times with the desired categories:  

• all   
• angle   
• atom   
• bond   
• compute   
• command   
• dump   
• dihedral   
• fix   
• improper   
• integrate   
• kspace   
• minimize   
• pair   
• region  

The time category prints the accumulated CPU and wall time for the process that writes output (usually MPI rank 0).  

# 1.42.4 Restrictions  

none  

# 1.42.5 Related commands  

print  

# 1.42.6 Default  

The out option has the default screen.   
The styles option has the default all.  

# 1.43 jump command  

# 1.43.1 Syntax  

# 1.43.2 Examples  

jump newfile jump in.run2 runloop jump SELF runloop  

# 1.43.3 Description  

This command closes the current input script file, opens the file with the specified name, and begins reading LAMMPS commands from that file. Unlike the include command, the original file is not returned to, although by using multiple jump commands it is possible to chain from file to file or back to the original file.  

If the word “SELF” is used for the filename, then the current input script is re-opened and read again.  

![](images/cff49e5e95b519e1067a1f3c1aa748cc21c214a796792bdb40b244f6d3f64acc.jpg)  

The SELF option is not guaranteed to work when the current input script is being read through stdin (standard input), e.g.  

since the SELF option invokes the C-library rewind() call, which may not be supported for stdin on some systems or by some MPI implementations. This can be worked around by using the -in command-line switch, e.g.  

or by using the -var command-line switch to pass the script name as a variable to the input script. In the latter case, a variable called “fname” could be used in place of SELF, e.g.  

Here is an example of a loop which checks every 1000 steps if the system temperature has reached a certain value, and if so, breaks out of the loop to finish the run. Note that any variable could be checked, so long as it is current on the timestep when the run completes. As explained on the variable doc page, this can be ensured by including the variable in thermodynamic output.  

variable myTemp equal temp   
label loop   
variable a loop 1000   
run 1000   
if " $"9\{\mathrm{myTemp}\}<300.0"$ then "jump SELF break"   
next a   
jump SELF loop   
label break   
print "ALL DONE"  

Here is an example of a double loop which uses the if and jump commands to break out of the inner loop when a condition is met, then continues iterating through the outer loop.  

label loopa   
variable a loop 5 label loopb variable b loop 5 print ${}^{\prime\prime}\mathrm{A},\mathrm{B}=\$9a,\S\mathrm{b}^{\prime}$ " run 10000 if $^{11}\S\mathrm{b}>2^{11}$ then "jump SELF break" next b   
jump in.script loopb label break variable b delete   
next a   
jump SELF loopa  

# 1.43.4 Restrictions  

If you jump to a file and it does not contain the specified label, LAMMPS will come to the end of the file and exit.  

# 1.43.5 Related commands  

variable, include, label, next  

# 1.43.6 Default  

none  

# 1.44 kim command  

# 1.44.1 Syntax  

kim sub-command args  

• sub-command $=$ init or interactions or query or param or property args $=$ arguments used by a particular sub-command  

# 1.44. kim command  

# 1.44.2 Examples  

kim init args kim interactions args kim query args kim param args kim property args  

# 1.44.3 Description  

The kim command includes a set of sub-commands that allow LAMMPS users to use interatomic models (IM) (potentials and force fields) and their predictions for various physical properties archived in the Open Knowledgebase of Interatomic Models (OpenKIM) repository.  

Using OpenKIM provides LAMMPS users with immediate access to a large number of verified IMs and their predictions. OpenKIM IMs have multiple benefits including reliability, reproducibility and convenience.  

There are two types of IMs archived in OpenKIM:  

1. The first type is called a KIM Portable Model (PM). A KIM PM is an independent computer implementation of an IM written in one of the languages supported by KIM (C, $\mathrm{C}{+}{+}$ , Fortran) that conforms to the KIM Application Programming Interface (KIM API) Portable Model Interface (PMI) standard. A KIM PM will work seamlessly with any simulation code that supports the KIM API/PMI standard (including LAMMPS; see complete list of supported codes).   
2. The second type is called a KIM Simulator Model (SM). A KIM SM is an IM that is implemented natively within a simulation code (simulator) that supports the KIM API Simulator Model Interface (SMI); in this case LAMMPS. A separate SM package is archived in OpenKIM for each parameterization of the IM, which includes all of the necessary parameter files, LAMMPS commands, and metadata (supported species, units, etc.) needed to run the IM in LAMMPS.  

With these two IM types, OpenKIM can archive and test almost all IMs that can be used by LAMMPS. (It is easy to contribute new IMs to OpenKIM, see the upload instructions.)  

OpenKIM IMs are uniquely identified by a KIM ID. The extended KIM ID consists of a human-readable prefix identifying the type of IM, authors, publication year, and supported species, separated by two underscores from the KIM ID itself, which begins with an IM code (MO for a KIM Portable Model, and SM for a KIM Simulator Model) followed by a unique 12-digit code and a 3-digit version identifier. By convention SM prefixes begin with Sim_ to readily identify them.  

SW_StillingerWeber_1985_Si__MO_405512056662_005   
Sim_LAMMPS_ReaxFF_StrachanVanDuinChakraborty_2003_CHNO__SM_107643900657_001  

Each OpenKIM IM has a dedicated “Model Page” on OpenKIM providing all the information on the IM including a title, description, authorship and citation information, test and verification check results, visualizations of results, a wiki with documentation and user comments, and access to raw files, and other information. The URL for the Model Page is constructed from the extended KIM ID of the IM:  

https://openkim.org/id/extended_KIM_ID  

For example, for the Stillinger-Weber potential listed above the Model Page is located at:  

https://openkim.org/id/SW_StillingerWeber_1985_Si__MO_405512056662_005  

See the current list of KIM PMs and SMs archived in OpenKIM. This list is sorted by species and can be filtered to display only IMs for certain species combinations.  

See Obtaining KIM Models to learn how to install a pre-built binary of the OpenKIM Repository of Models.  

![](images/fc1d47cf16dc8d04a166d6a9cb00f6a28e3df9725a826d66441a4223f3dc7704.jpg)  

# Note  

It is also possible to locally install IMs not archived in OpenKIM, in which case their names do not have to conform to the KIM ID format.  

# 1.44.4 Using OpenKIM IMs with LAMMPS (kim init, kim interactions)  

Two sub-commands are employed when using OpenKIM IMs in LAMMPS, one to select the IM and perform necessary initialization (kim init), and the second to set up the IM for use by executing any necessary LAMMPS commands (kim interactions). Both are required.  

# Syntax  

kim init model user_units unitarg kim interactions typeargs  

• model $=$ name of the KIM interatomic model (the KIM ID for models archived in OpenKIM)   
• user_units $=$ the LAMMPS units style assumed in the LAMMPS input script   
• unitarg $=$ unit_conversion_mode (optional)   
• typeargs $=$ atom type to species mapping (one entry per atom type) or fixed_types for models with a preset fixed mapping  

# Examples  

kim init SW_StillingerWeber_1985_Si__MO_405512056662_005 metal   
kim interactions Si   
kim init Sim_LAMMPS_ReaxFF_StrachanVanDuinChakraborty_2003_CHNO__SM_107643900657_   
,→001 real   
kim init Sim_LAMMPS_ReaxFF_StrachanVanDuinChakraborty_2003_CHNO__SM_107643900657_   
$_{\odot001}$ metal unit_conversion_mode   
kim interactions C H O   
kim init Sim_LAMMPS_IFF_PCFF_HeinzMishraLinEmami_2015Ver1v5_   
$\hookrightarrow$ FccmetalsMineralsSolventsPolymers__SM_039297821658_000 real   
kim interactions fixed_types  

See the examples/kim directory for example input scripts that use KIM PMs and KIM SMs.  

# OpenKIM IM Initialization (kim init)  

The kim command followed by init sub-command must be issued before the simulation box is created (normally at the top of the file). This command sets the OpenKIM IM that will be used and may issue additional commands changing LAMMPS default settings that are required for using the selected IM (such as units or atom_style). If needed, those settings can be overridden, however, typically a script containing a kim init command would not include units and atom_style commands.  

The required arguments of kim init are the model name of the IM to be used in the simulation (for an IM archived in OpenKIM this is its extended KIM ID, and the user_units, which are the LAMMPS units style used in the input script. (Any dimensioned numerical values in the input script and values read in from files are expected to be in the user_units system.)  

The selected IM can be either a KIM PM or a KIM SM. For a KIM SM, the kim init command verifies that the SM is designed to work with LAMMPS (and not another simulation code). In addition, the LAMMPS version used for defining the SM and the LAMMPS version being currently run are printed to help diagnose any incompatible changes to input script or command syntax between the two LAMMPS versions.  

Based on the selected model kim init may modify the atom_style. Some SMs have requirements for this setting. If this is the case, then atom_style will be set to the required style. Otherwise, the value is left unchanged (which in the absence of an atom_style command in the input script is the default atom_style value).  

Regarding units, the kim init behaves in different ways depending on whether or not unit conversion mode is activated as indicated by the optional unitarg argument. If unit conversion mode is not active, then user_units must either match the required units of the IM or the IM must be able to adjust its units to match. (The latter is only possible with some KIM PMs; SMs can never adjust their units.) If a match is possible, the LAMMPS units command is called to set the units to user_units. If the match fails, the simulation is terminated with an error. The kim init command also sets the default value for the skin (extra distance beyond force cutoff) as 2.0 Angstroms and sets the default value for the timestep size as 1.0 femtosecond.  

Here is an example of a LAMMPS script to compute the cohesive energy of a face-centered cubic (fcc) lattice for the MEAM potential by Pascuet and Fernandez (2015) for Al.  

<html><body><table><tr><td>boundary lattice region</td><td>ppp</td></tr></table></body></html>  

The above script will end with an error in the kim init line if the IM is changed to another potential for Al that does not work with metal units. To address this, kim init offers the unit_conversion_mode as shown below.  

If unit conversion mode is active, then kim init calls the LAMMPS units command to set the units to the IM’s required or preferred units. Conversion factors between the IM’s units and the user_units are defined for all physical quantitie (mass, distance, etc.). (Note that converting to or from the “lj” unit style is not supported.) These factors are stored as internal style variables with the following standard names:  

<html><body><table><tr><td>u mass</td><td></td></tr><tr><td>u distance</td><td></td></tr><tr><td>u time</td><td></td></tr><tr><td>u energy</td><td></td></tr><tr><td>velocity u</td><td></td></tr><tr><td>u force</td><td></td></tr><tr><td>u torque</td><td></td></tr><tr><td>u temperature</td><td></td></tr><tr><td>u pressure viscosity</td><td></td></tr><tr><td>u u charge</td><td></td></tr><tr><td>u dipole</td><td></td></tr><tr><td>u efield</td><td></td></tr><tr><td>density u</td><td></td></tr><tr><td></td><td></td></tr></table></body></html>  

If desired, the input script can be designed to work with these conversion factors so that the script will work without change with any OpenKIM IM. (This approach is used in the OpenKIM Testing Framework.)  

For example, the script given above for the cohesive energy of fcc Al can be rewritten to work with any IM regardless of units. The following script constructs an fcc lattice with a lattice parameter defined in meters, computes the total energy, and prints the cohesive energy in Joules regardless of the units of the IM.  

<html><body><table><tr><td colspan="2">→conversion mode</td><td>init Sim LAMMPS MEAM PascuetFernandez 2015 AlSM 811588957187 000 si unit</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2">boundary</td><td>ppp</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2">lattice</td><td></td><td>fcc $(4.049e-10*v__u_distance)</td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2">region</td><td>box</td><td>simbox block 0 1 0 1 0 1 units lattice</td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2">create create atoms 1 box</td><td>1 simbox</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2"></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2">mass</td><td></td><td>1 $(4.480134e-26*v __u_mass)</td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2">kim</td><td>interactions Al</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2">neighbor</td><td>$(2e-10*v__u_distance)</td><td>bin</td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2">run</td><td>0</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2">variable</td><td></td><td>Ec _in_J equal (pe/count(all)) /v</td><td></td><td></td><td></td><td></td></tr><tr><td colspan="2"></td><td></td><td></td><td>u energy</td><td></td><td></td><td></td></tr><tr><td colspan="2">print</td><td></td><td>"Cohesive Energy = ${Ec _in_J} J"</td><td></td><td></td><td></td><td></td></tr></table></body></html>  

Note the multiplication by $\nu_{.}$ __u_distance and $\nu.$ __u_mass to convert from SI units (specified in the kim init command) to whatever units the IM uses (metal in this case), and the division by $\nu.$ __u_energy to convert from the IM’s energy units to SI units (Joule). This script will work correctly for any IM for Al (KIM PM or SM) selected by the kim init command.  

Care must be taken to apply unit conversion to dimensional variables read in from a file. For example, if a configuration of atoms is read in from a dump file using the read_dump command, the following can be done to convert the box and all atomic positions to the correct units:  

<html><body><table><tr><td>change box all x scale ${_u_distance} &</td></tr><tr><td>&</td></tr><tr><td>y scale ${_u_ distance}</td></tr><tr><td>Z scale ${_u_( distance}</td></tr><tr><td></td></tr><tr><td>xy final $(xy*v u distance</td></tr><tr><td>XZ final $(xz*v 11 distance</td></tr><tr><td>yz final $(yz*v 11 distance K</td></tr></table></body></html>  

![](images/32c8b9817204316b2af6d7144c55f61e3eb60a8b9c788fdc95d82f48ada63bba.jpg)  

# Note  

Unit conversion will only work if the conversion factors are placed in all appropriate places in the input script. It is up to the user to do this correctly.  

# OpenKIM IM Execution (kim interactions)  

The second and final step in using an OpenKIM IM is to execute the kim interactions command. This command must be preceded by a kim init command and a command that defines the number of atom types $N$ (such as create_box). The kim interactions command has one argument typeargs. This argument contains either a list of $N$ chemical species, which defines a mapping between atom types in LAMMPS to the available species in the OpenKIM IM, or the keyword fixed_types for models that have a preset fixed mapping (i.e. the mapping between LAMMPS atom types and chemical species is defined by the model and cannot be changed). In the latter case, the user must consult the model documentation to see how many atom types there are and how they map to the chemical species.  

For example, consider an OpenKIM IM that supports Si and C species. If the LAMMPS simulation has four atom types, where the first three are Si, and the fourth is C, the following kim interactions command would be used:  

Alternatively, for a model with a fixed mapping the command would be:  

kim interactions fixed_types  

The kim interactions command performs all the necessary steps to set up the OpenKIM IM selected in the kim init command. The specific actions depend on whether the IM is a KIM PM or a KIM SM. For a KIM PM, a pair_style kim command is executed followed by the appropriate pair_coeff command. For example, for the Ercolessi and Adams (1994) KIM PM for Al set by the following commands:  

kim init EAM_Dynamo_ErcolessiAdams_1994_Al__MO_123629422045_005 metal   
.. box specification lines skipped   
kim interactions Al  

the kim interactions command executes the following LAMMPS input commands:  

pair_style kim EAM_Dynamo_ErcolessiAdams_1994_Al__MO_123629422045_005 pair_coeff \* \* Al  

For a KIM SM, the generated input commands may be more complex and require that LAMMPS is built with the required packages included for the type of potential being used. The set of commands to be executed is defined in the SM specification file, which is part of the SM package. For example, for the Strachan et al. (2003) ReaxFF SM set by the following commands:  

kim init Sim_LAMMPS_ReaxFF_StrachanVanDuinChakraborty_2003_CHNO__SM_107643900657_   
,→000 real . box specification lines skipped   
kim interactions C H N O  

the kim interactions command executes the following LAMMPS input commands:  

pair_style reaxff lmp_control safezone 2.0 mincap 100 pair_coeff \* \* ffield.reax.rdx C H N O fix reaxqeq all qeq/reaxff 1 0.0 10.0 1.0e-6 param.qeq  

![](images/344e6b7f6170c98553d05d5038cb385e632bfdb0d60f4bc689d0e21d1bac4c66.jpg)  

# Note  

The files lmp_control, ffield.reax.rdx and param.qeq are specific to the Strachan et al. (2003) ReaxFF parameterization and are archived as part of the SM package in OpenKIM.  

![](images/ae771433fc845914863239b980d5b0107cf43555fe686038b3101ae0909f36b5.jpg)  

# Note  

Parameters like cutoff radii and charge tolerances, which have an effect on IM predictions, are also included in the SM definition ensuring reproducibility.  

![](images/19807ff84cacd9be38111d014dbb220e3433d03018487555c11617d03ac7b01f.jpg)  

# Note  

When using kim init and kim interactions to select and set up an OpenKIM IM, other LAMMPS commands for the same functions (such as pair_style, pair_coeff, bond_style, bond_coeff, fixes related to charge equilibration, etc.) should normally not appear in the input script.  

![](images/11caebb561a78fd1b0b5ba45eb945c451878cb688ad22c024135497f0e6d8693.jpg)  

# Note  

kim interactions must be called each time after the change_box command to provide the correct settings (it should be called with the same typeargs as the first call.) The reason is that changing a periodic boundary to a nonperiodic one, or in general, using the change_box command after the interactions are set via kim interactions or pair_coeff commands might affect some of the settings. For example, SM models containing Coulombic terms in the interactions require different settings if a periodic boundary changes to a non-periodic one. In other cases, the second call to kim interactions does not affect any other settings.  

# 1.44.5 Using OpenKIM Web Queries in LAMMPS (kim query)  

The kim query command performs a web query to retrieve the predictions of an IM set by kim init for material properties archived in OpenKIM.  

# Syntax  

kim query variable formatarg query_function queryargs  

• variable(s) $=$ single name or list of names of (string style) LAMMPS variable(s) where a query result or parameter get result is stored. Variables that do not exist will be created by the command   
• formatarg $=$ list or split or index (optional) list $=$ returns a single string with a list of space separated values (e.g. $"1.02.03.0"$ ), which is placed in a LAMMPS variable as defined by the variable argument. [default] split $=$ returns the values separately in new variables with names based on the prefix specified in variable and a number appended to indicate which element in the list of values is in the variable index $=$ returns a variable style index that can be incremented via the next command. This enables the construction of simple loops   
• query_function $=$ name of the OpenKIM web API query function to be used   
• queryargs $=$ a series of keyword $\circeq$ value pairs that represent the web query; supported keywords depend on the query function  

# Examples  

kim query a0 get_lattice_constant_cubic crystal=[fcc] species=[Al] units $=$ [angstrom] kim query model index get_available_models species $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ [Al] potential_type=[eam]  

The result of the query is stored in one or more string style variables as determined by the optional formatarg argument. For the “list” setting of formatarg (or if formatarg is not specified), the result is returned as a space-separated list of values in variable. The formatarg keyword “split” separates the result values into individual variables of the form prefix_I, where prefix is set to the kim query variable argument and $I$ ranges from 1 to the number of returned values. The number and order of the returned values is determined by the type of query performed. The formatarg keyword “index” returns a variable style index that can be incremented via the next command. This enables the construction of simple loops over the returned values by the type of query performed.  

![](images/b760f5d71bbb88b7a7959a0f1303e102c8a451ff7569fb5c1021eca47dcd29d4.jpg)  

# Note  

kim query only supports queries that return a single result or an array of values. More complex queries that return a JSON structure are not currently supported. An attempt to use kim query in such cases will generate an error.  

The second required argument query_function is the name of the query function to be called (e.g. get_lattice_constant_cubic). All following arguments are parameters handed over to the web query in the format keyword $\uplus$ value, where value is always an array of one or more comma-separated items in brackets. The list of supported keywords and the type and format of their values depend on the query function used. The current list of query functions is available on the OpenKIM webpage at https://openkim.org/doc/usage/kim-query.  

![](images/156bc78f80001d7bbdf8a477c80dd7c9a8ec2553557be9f845fe64f7ce8b8839.jpg)  

# Note  

All query functions, except get_available_models, require the model keyword, which identifies the IM whose predictions are being queried. kim query automatically generates the model keyword based on the IM set in by kim init, and it can be overwritten if specified as an argument to the kim query. Where kim init is not specified, the model keyword must be provided as an argument to the kim query.  

![](images/f066a07c727074f9cf53b35357d1b4a51c6f7505c182ac94c04c9b4e980029d5.jpg)  

# Note  

Each query_function is associated with a default method (implemented as a KIM Test) used to compute this property. In cases where there are multiple methods in OpenKIM for computing a property, a method keyword can be provided to select the method of choice. See the query documentation to see which methods are available for a given query_function.  

# kim query Usage Examples and Further Clarifications  

The data obtained by kim query commands can be used as part of the setup or analysis phases of LAMMPS simulations.   
Some examples are given below.  

# Define an equilibrium fcc crystal  

kim init EAM_Dynamo_ErcolessiAdams_1994_Al__MO_123629422045_005 metal boundary p p p   
kim query a0 get_lattice_constant_cubic crystal $=$ [fcc] species $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ [Al] units $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ [angstrom] lattice fcc \${a0}   
units metal   
kim query a0 get_lattice_constant_cubic crystal=[fcc] species $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ [Al] units $=$ [angstrom] model=[EAM   
$\hookrightarrow$ Dynamo_ErcolessiAdams_1994_Al__MO_123629422045_005]   
lattice fcc \${a0}  

The kim query command retrieves from OpenKIM the equilibrium lattice constant predicted by the Ercolessi and Adams (1994) potential for the fcc structure and places it in variable $a O$ . This variable is then used on the next line to set up the crystal. By using kim query, the user is saved the trouble and possible error of tracking this value down, or of having to perform an energy minimization to find the equilibrium lattice constant.  

# Note  

In unit_conversion_mode the results obtained from a kim query would need to be converted to the appropriate units system. For example, in the above script, the lattice command would need to be changed to: “lattice fcc $\$(\mathrm{\Deltav\_a0^{*}v}_{\mathrm{\Delta}}$ __u_distance)”.  

# Define an equilibrium hcp crystal  

kim init EAM_Dynamo_MendelevAckland_2007v3_Zr__MO_004835508849_000 metal   
boundary p p p   
kim query latconst split get_lattice_constant_hexagonal crystal $=$ [hcp] species=[Zr] units $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ [angstrom]   
lattice custom $\mathbb{\mathbb{S}}\{\mathrm{latconst\_1}\}$ a1 0.5 -0.866025 0 a2 0.5 0.866025 0 a3 0 0 $\$1$ (latconst_2/latconst_1) & basis 0.333333 0.666666 0.25 basis 0.666666 0.333333 0.75  

In this case the kim query returns two arguments (since the hexagonal close packed (hcp) structure has two independent lattice constants). The formatarg keyword “split” places the two values into the variables latconst_1 and latconst_2. (These variables are created if they do not already exist.)  

# Define a crystal at finite temperature accounting for thermal expansion  

kim init EAM_Dynamo_ErcolessiAdams_1994_Al__MO_123629422045_005 metal   
boundary p p p   
kim query a0 get_lattice_constant_cubic crysta $\underline{{\underline{{\mathbf{\Pi}}}}}$ [fcc] species $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ [Al] units $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ [angstrom]   
kim query alpha get_linear_thermal_expansion_coefficient_cubic crysta $=$ [fcc] species=[Al]␣   
$\hookrightarrow$ units=[1/K] temperature=[293.15] temperature_units=[K]   
variable DeltaT equal 300   
lattice fcc \$(v_a0\*v_alpha\*v_DeltaT)  

As in the previous example, the equilibrium lattice constant is obtained for the Ercolessi and Adams (1994) potential. However, in this case the crystal is scaled to the appropriate lattice constant at room temperature (293.15 K) by using the linear thermal expansion constant predicted by the potential.  

# Note  

When passing numerical values as arguments (as in the case of the temperature in the above example) it is also possible to pass a tolerance indicating how close to the value is considered a match. If no tolerance is passed a default value is used. If multiple results are returned (indicating that the tolerance is too large), kim query will return an error. See the query documentation to see which numerical arguments and tolerances are available for a given query_function.  

# Compute defect formation energy  

kim init EAM_Dynamo_ErcolessiAdams_1994_Al__MO_123629422045_005 metal   
... Build fcc crystal containing some defect and compute the total energy   
... which is stored in the variable \*Etot\*   
kim query Ec get_cohesive_energy_cubic crystal=[fcc] species=[Al] units=[eV]   
variable Eform equal $\Phi\{\mathrm{Etot}\}\mathrm{~-count}(\mathrm{all})^{\ast}\Phi\{\mathrm{Ec}\}$  

# 1.44. kim command  

The defect formation energy Eform is computed by subtracting the ideal fcc cohesive energy of the atoms in the system from Etot. The ideal fcc cohesive energy of the atoms is obtained from OpenKIM for the Ercolessi and Adams (1994) potential.  

# Retrieve equilibrium fcc crystal of all EAM potentials that support a specific species  

kim query model index get_available_models species=[Al] potential_type=[eam]   
label model_loop   
kim query latconst get_lattice_constant_cubic crystal=[fcc] species $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ [Al] units $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ [angstrom] model=[\$   
,→{model}]   
print "FCC lattice constant $(\S\{\mathrm{model}\}~\mathrm{potential})=\S\{\mathrm{latconst}\}^{}"$   
... do something with current value of latconst   
next model   
jump SELF model_loop  

In this example, the index mode of formatarg is used. The first kim query returns the list of all available EAM potentials that support the $A l$ species and archived in OpenKIM. The result of the query operation is stored in the LAMMPS variable model as an index variable. This variable is used later to access the values one at a time within a loop as shown in the example. The second kim query command retrieves from OpenKIM the equilibrium lattice constant predicted by each potential for the fcc structure and places it in variable latconst.  

# Note  

kim query commands return results archived in OpenKIM. These results are obtained using programs for computing material properties (KIM Tests and KIM Test Drivers) that were contributed to OpenKIM. In order to give credit to Test developers, the number of times results from these programs are queried is tracked. No other information about the nature of the query or its source is recorded.  

# 1.44.6 Accessing KIM Model Parameters from LAMMPS (kim param)  

All IMs are functional forms containing a set of parameters. These parameters’ values are typically selected to best reproduce a training set of quantum mechanical calculations or available experimental data. For example, a LennardJones potential intended to model argon might have the values of its two parameters, epsilon, and sigma, fit to the dimer dissociation energy or thermodynamic properties at a critical point of the phase diagram.  

Normally a user employing an IM should not modify its parameters since, as noted above, these are selected to reproduce material properties. However, there are cases where accessing and modifying IM parameters is desired, such as for assessing uncertainty, fitting an IM, or working with an ensemble of IMs. As explained above, IMs archived in OpenKIM are either Portable Models (PMs) or Simulator Models (SMs). KIM PMs are complete independent implementations of an IM, whereas KIM SMs are wrappers to an IM implemented within LAMMPS. Two different mechanisms are provided for accessing IM parameters in these two cases:  

• For a KIM PM, the kim param command can be used to get and set the values of the PM’s parameters as explained below.   
• For a KIM SM, the user should consult the documentation page for the specific IM and follow instructions there for how to modify its parameters (if possible).  

The kim param get and kim param set commands provide an interface to access and change the parameters of a KIM PM that “publishes” its parameters and makes them publicly available (see the KIM API documentation for details).  

![](images/dd1a1aa4a97290674836401d3d00a97210978e4d029cd5f011517a5f81869ea2.jpg)  

# Note  

The kim param set/get command must be preceded by a kim interactions command (or alternatively by a pair_style kim and pair_coeff commands). The kim param set command may be used wherever a pair_coeff command may occur.  

# Syntax  

kim param get param_name index_range variable formatarg kim param set param_name index_range values  

• param_name $=$ name of a KIM portable model parameter (which is published by the PM and available for access). The specific string used to identify a parameter is defined by the PM. For example, for the Stillinger-Weber (SW) potential in OpenKIM, the parameter names are A, B, p, q, sigma, gamma, cutoff, lambda, costheta0   
• index_range $=\mathrm{KIM}$ portable model parameter index range (an integer for a single element, or pair of integers separated by a colon for a range of elements)   
• variable(s) $=$ single name or list of names of (string style) LAMMPS variable(s) where a query result or parameter get result is stored. Variables that do not exist will be created by the command   
• formatarg $=$ list or split or explicit (optional) list $=$ returns a single string with a list of space separated values (e.g. $"1.02.03.0"$ ), which is placed in a LAMMPS variable as defined by the variable argument split $=$ returns the values separately in new variables with names based on the prefix specified in variable and a number appended to indicate which element in the list of values is in the variable explicit $=$ returns the values separately in one more more variable names provided as arguments that precede formatarg (default) $=$  

• values new value(s) to replace the current value(s) of a KIM portable model parameter  

# Note  

The list of all the parameters that a PM exposes for access/mutation are automatically written to the lammps log file when kim init is called.  

Each published parameter of a KIM PM takes the form of an array of numerical values. The array can contain one element for a single-valued parameter, or a set of values. For example, the multispecies SW potential for the Zn-Cd-HgS-Se-Te system has the same parameter names as the single-species SW potential, but each parameter array contains 21 entries that correspond to the parameter values used for each pairwise combination of the model’s six supported species (this model does not have parameters specific to individual ternary combinations of its supported species).  

The index_range argument may either be an integer referring to a specific element within the array associated with the parameter specified by param_name, or a pair of integers separated by a colon that refer to a slice of this array. In both cases, one-based indexing is used to refer to the entries of the array.  

The result of a get operation for a specific index_range is stored in one or more LAMMPS string style variables as determined by the optional formatarg argument documented above. If not specified, the default for formatarg is “explicit” for the kim param command.  

For the case where the result is an array with multiple values (i.e. index_range contains a range), the optional “split” or “explicit” formatarg keywords can be used to separate the results into multiple variables; see the examples below. Multiple parameters can be retrieved with a single call to kim param get by repeating the argument list following get.  

For a set operation, the values argument contains the new value(s) for the element(s) of the parameter specified by index_range. For the case where multiple values are being set, values contains a set of values separated by spaces. Multiple parameters can be set with a single call to kim param set by repeating the argument list following set.  

# kim param Usage Examples and Further Clarifications  

Examples of getting and setting KIM PM parameters with further clarifications are provided below.  

# Getting a scalar parameter  

kim init SW_StillingerWeber_1985_Si__MO_405512056662_005 metal   
kim interactions Si   
kim param get A 1 VARA  

or  

pair_style kim SW_StillingerWeber_1985_Si__MO_405512056662_005   
pair_coeff \* \* Si   
kim param get A 1 VARA  

In these cases, the value of the SW A parameter is retrieved and placed in the LAMMPS variable VARA. The variable VARA can be used in the remainder of the input script in the same manner as any other LAMMPS variable.  

Getting multiple scalar parameters with a single call  

kim interactions Si kim param get A 1 VARA B 1 VARB  

In this example, it is shown how to retrieve the $A$ and $B$ parameters of the SW potential and store them in the LAMMPS variables VARA and VARB.  

# Getting a range of values from a parameter  

There are several options when getting a range of values from a parameter determined by the formatarg argument.  

kim init SW_ZhouWardMartin_2013_CdTeZnSeHgS__MO_503261197030_002 metal   
kim interactions Te Zn Se   
kim param get lambda 7:9 LAM_TeTe LAM_TeZn LAM_TeSe  

In this case, formatarg is not specified and therefore the default “explicit” mode is used. (The behavior would be the same if the word explicit were added after LAM_TeSe.) Elements 7, 8 and 9 of parameter lambda retrieved by the get operation are placed in the LAMMPS variables LAM_TeTe, LAM_TeZn and LAM_TeSe, respectively.  

![](images/a248dad5913a13d685d5759e6f922348071c65c3a71c5398f6f3865b81011833.jpg)  

# Note  

In the above example, elements 7-9 of the lambda parameter correspond to Te-Te, Te-Zm and Te-Se interactions. This can be determined by visiting the model page for the specified potential and looking at its parameter file linked to at the bottom of the page (file with .param ending) and consulting the README documentation provided with the driver for the PM being used. A link to the driver is provided at the top of the model page.  

kim interactions Te Zn Se   
kim param get lambda 15:17 LAMS list   
variable LAM_VALUE index \${LAMS}   
label loop_on_lambda do something with the current value of lambda   
next LAM_VALUE   
jump SELF loop_on_lambda  

In this case, the “list” mode of formatarg is used. The result of the get operation is stored in the LAMMPS variable LAMS as a string containing the three retrieved values separated by spaces, e.g “1.0 2.0 3.0”. This can be used in LAMMPS with an index variable to access the values one at a time within a loop as shown in the example. At each iteration of the loop LAM_VALUE contains the current value of lambda.  

kim interactions Te Zn Se kim param get lambda 15:17 LAM split  

In this case, the “split” mode of formatarg is used. The three values retrieved by the get operation are stored in the three LAMMPS variables LAM_15, LAM_16 and $L A M\_I7$ . The provided name “LAM” is used as prefix and the location in the lambda array is appended to create the variable names.  

# Setting a scalar parameter  

kim init SW_StillingerWeber_1985_Si__MO_405512056662_005 metal   
kim interactions Si   
kim param set gamma 1 2.6  

Here, the SW potential’s gamma parameter is set to 2.6. Note that the get and set commands work together, so that a get following a set operation will return the new value that was set. For example,  

kim interactions Si   
kim param get gamma 1 ORIG_GAMMA   
kim param set gamma 1 2.6   
kim param get gamma 1 NEW_GAMMA   
print "original gamma = \${ORIG_GAMMA}, new gamma = \${NEW_GAMMA}"  

Here, ORIG_GAMMA will contain the original gamma value for the SW potential, while NEW_GAMMA will contain the value 2.6.  

# Setting multiple scalar parameters with a single call  

kim init SW_ZhouWardMartin_2013_CdTeZnSeHgS__MO_503261197030_002 metal   
kim interactions Cd Te   
variable VARG equal 2.6   
variable VARS equal 2.0951   
kim param set gamma 1 \${VARG} sigma 3 \${VARS}  

In this case, the first element of the gamma parameter and third element of the sigma parameter are set to 2.6 and 2.0951, respectively. This example also shows how LAMMPS variables can be used when setting parameters.  

# Setting a range of values of a parameter  

kim init SW_ZhouWardMartin_2013_CdTeZnSeHgS__MO_503261197030_002 metal kim interactions Cd Te Zn Se Hg S kim param set sigma 2:6 2.35214 2.23869 2.04516 2.43269 1.80415  

In this case, elements 2 through 6 of the parameter sigma are set to the values 2.35214, 2.23869, 2.04516, 2.43269 and 1.80415 in order.  

# 1.44.7 Writing material properties in standard KIM Property Instance format (kim property)  

The OpenKIM system includes a collection of Tests (material property calculation codes), Models (interatomic potentials), Predictions, and Reference Data (DFT or experiments). Specifically, a KIM Test is a computation that when coupled with a KIM Model generates the prediction of that model for a specific material property rigorously defined by a KIM Property Definition (see the KIM Properties Framework for further details). A prediction of a material property for a given model is a specific numerical realization of a property definition, referred to as a “Property Instance.” The objective of the kim property command is to make it easy to output material properties in a standardized, machine readable, format that can be easily ingested by other programs. Additionally, it aims to make it as easy as possible to convert a LAMMPS script that computes a material property into a KIM Test that can then be uploaded to openkim.org  

A developer interested in creating a KIM Test using a LAMMPS script should first determine whether a property definition that applies to their calculation already exists in OpenKIM by searching the properties page. If none exists, it is possible to use a locally defined property definition contained in a file until it can be uploaded to the official repository (see below). Once one or more applicable property definitions have been identified, the kim property create, kim property modify, kim property remove, and kim property destroy, commands provide an interface to create, set, modify, remove, and destroy instances of them within a LAMMPS script.  

# Syntax  

kim property create instance_id property_id   
kim property modify instance_id key key_name key_name_key key_name_value   
kim property remove instance_id key key_name   
kim property destroy instance_id   
kim property dump file   
• instance_id $=$ a positive integer identifying the KIM property instance; (note that the results file can contain multiple property instances)   
• property_id $=$ identifier of a KIM Property Definition, which can be (1) a property short name, (2) the full unique ID of the property (including the contributor and date), (3) a file name corresponding to a local property definition file   
• key_name $=$ one of the keys belonging to the specified KIM property definition   
• key_name_key $=$ a key belonging to a key-value pair (standardized in the KIM Properties Framework)   
• key_name_value $=$ value to be associated with a key_name_key in a key-value pair   
• file $=$ name of a file to write the currently defined set of KIM property instances to  

Examples of each of the three property_id cases are shown below, kim property create 1 atomic-mass kim property create 2 cohesive-energy-relation-cubic-crystal kim property create 1 tag:brunnels@noreply.openkim.org,2016-05-11:property/atomic-mass kim property create 2 tag:staff@noreply.openkim.org,2014-04-15:property/cohesive-energy-relation-cubic$\hookrightarrow$ crystal  

kim property create 1 new-property.edn kim property create 2 /home/mary/marys-kim-properties/dissociation-energy.edn  

In the last example, “new-property.edn” and “/home/mary/marys-kim-properties/dissociation-energy.edn” are the names of files that contain user-defined (local) property definitions.  

A KIM property instance takes the form of a “map”, i.e. a set of key-value pairs akin to Perl’s hash, Python’s dictionary, or Java’s Hashtable. It consists of a set of property key names, each of which is referred to here by the key_name argument, that are defined as part of the relevant KIM Property Definition and include only lowercase alphanumeric characters and dashes. The value paired with each property key is itself a map whose possible keys are defined as part of the KIM Properties Framework; these keys are referred to by the key_name_key argument and their associated values by the key_name_value argument. These values may either be scalars or arrays, as stipulated in the property definition.  

![](images/cb1d4b46caab668b5885047585754ffa788b5fd618cccfb8b585191da63b98ae.jpg)  

# Note  

Each map assigned to a key_name must contain the key_name_key “source-value” and an associated key_name_value of the appropriate type (as defined in the relevant KIM Property Definition). For keys that are defined as having physical units, the “source-unit” key_name_key must also be given a string value recognized by GNU units.  

Once a kim property create command has been given to instantiate a property instance, maps associated with the property’s keys can be edited using the kim property modify command. In using this command, the special keyword “key” should be given, followed by the property key name and the key-value pair in the map associated with the key that is to be set. For example, the atomic-mass property definition consists of two property keys named “mass” and “species.” An instance of this property could be created like so:  

kim property create 1 atomic-mass kim property modify 1 key species source-value Al kim property modify 1 key mass source-value 26.98154 kim property modify 1 key mass source-unit amu  

or, equivalently,  

kim property create 1 atomic-mass   
kim property modify 1 key species source-value Al & key mass source-value 26.98154 & source-unit amu  

# kim property Usage Examples and Further Clarifications  

# Create  

kim property create instance_id property_id  

The kim property create command takes as input a property instance ID and the property definition name, and creates an initial empty property instance data structure. For example,  

# 1.44. kim command  

<html><body><table><tr><td>kim property create1atomic-mass</td></tr><tr><td>kim property create 2 cohesive-energy-relation-cubic-crystal</td></tr></table></body></html>  

creates an empty property instance of the “atomic-mass” property definition with instance ID 1 and an empty instance of the “cohesive-energy-relation-cubic-crystal” property with ID 2. A list of published property definitions in OpenKIM can be found on the properties page.  

One can also provide the name of a file in the current working directory or the path of a file containing a valid property definition. For example,  

kim property create 1 new-property.edn  

where “new-property.edn” refers to a file name containing a new property definition that does not exist in OpenKIM.  

If the property_id given cannot be found in OpenKIM and no file of this name containing a valid property definition can be found, this command will produce an error with an appropriate message. Calling kim property create with the same instance ID multiple times will also produce an error.  

# Modify  

kim property modify instance_id key key_name key_name_key key_name_value  

The kim property modify command incrementally builds the property instance by receiving property definition keys along with associated arguments. Each key_name is associated with a map containing one or more key-value pairs (in the form of key_name_key-key_name_value pairs). For example,  

kim property modify 1 key species source-value Al kim property modify 1 key mass source-value 26.98154 kim property modify 1 key mass source-unit amu  

where the special keyword “key” is followed by a key_name (“species” or “mass” in the above) and one or more keyvalue pairs. These key-value pairs may continue until either another “key” keyword is given or the end of the line is reached. Thus, the above could equivalently be written as  

<html><body><table><tr><td>kim property r</td><td> modify 1 key species source-value Al</td></tr><tr><td>key mass</td><td>source-value 26.98154 &</td></tr><tr><td>key mass</td><td>source-unit amu</td></tr></table></body></html>  

As an example of modifying multiple key-value pairs belonging to the map of a single property key, the following command modifies the map of the “cohesive-potential-energy” property key to contain the key “source-unit” which is assigned a value of “eV” and the key “digits” which is assigned a value of 5,  

kim property modify 2 key cohesive-potential-energy source-unit eV digits 5  

![](images/a90d654d46288ce7f214369cae57731e7aad2ac71fd283fd2a5c83b2f5347ded.jpg)  

# Note  

The relevant data types of the values in the map are handled automatically based on the specification of the key in the KIM Property Definition. In the example above, this means that the value “eV” will automatically be interpreted as a string while the value 5 will be interpreted as an integer.  

The values contained in maps can either be scalars, as in all of the examples above, or arrays depending on which is stipulated in the corresponding Property Definition. For one-dimensional arrays, a single one-based index must be supplied that indicates which element of the array is to be modified. For multidimensional arrays, multiple indices must be given depending on the dimensionality of the array.  

![](images/d56fb692cdcdfa9e841cd9acec72ef55a069514503d022d4ed18855b3ecc9bb1.jpg)  

# Note  

All array indexing used by kim property modify is one-based, i.e. the indices are enumerated 1, 2, 3, . . .  

![](images/f34c58d8ae6bb77bfe4380dd9e3c1822f81f581d473f722ac7c85caae842cab2.jpg)  

# Note  

The dimensionality of arrays are defined in the the corresponding Property Definition. The extent of each dimension of an array can either be a specific finite number or indefinite and determined at run time. If an array has a fixed extent, attempting to modify an out-of-range index will fail with an error message.  

For example, the “species” property key of the cohesive-energy-relation-cubic-crystal property is a one-dimensional array that can contain any number of entries based on the number of atoms in the unit cell of a given cubic crystal. To assign an array containing the string “Al” four times to the “source-value” key of the “species” property key, we can do so by issuing:  

kim property modify 2 key species source-value 1 Al kim property modify 2 key species source-value 2 Al kim property modify 2 key species source-value 3 Al kim property modify 2 key species source-value 4 Al  

![](images/4a8d6d7f60cd1d9cc8df9ced909d1ca1d601c2e90272b8355e856192bdf89f32.jpg)  

# Note  

No declaration of the number of elements in this array was given; kim property modify will automatically handle memory management to allow an arbitrary number of elements to be added to the array.  

# Note  

In the event that kim property modify is used to set the value of an array index without having set the values of all lesser indices, they will be assigned default values based on the data type associated with the key in the map:  

<html><body><table><tr><td>Data type</td><td>Default value</td></tr><tr><td>int</td><td>0</td></tr><tr><td>float</td><td>0.0</td></tr><tr><td>string</td><td>1</td></tr><tr><td>file</td><td></td></tr></table></body></html>  

For example, doing the following:  

kim property create 2 cohesive-energy-relation-cubic-crystal kim property modify 2 key species source-value 4 Al  

will result in the “source-value” key in the map for the property key “species” being assigned the array [“”, “”, “”, “Al”].  

For convenience, the index argument provided may refer to an inclusive range of indices by specifying two integers separated by a colon (the first integer must be less than or equal to the second integer, and no whitespace should be included). Thus, the snippet above could equivalently be written:  

# 1.44. kim command  

kim property modify 2 key species source-value 1:4 Al Al Al Al  

Calling this command with a non-positive index, e.g. kim property modify 2 key species source-value 0 Al, or an incorrect number of input arguments, e.g. kim property modify 2 key species source-value 1:4 Al Al, will result in an error.  

As an example of modifying multidimensional arrays, consider the “basis-atoms” key in the cohesive-energy-relationcubic-crystal property definition. This is a two-dimensional array containing the fractional coordinates of atoms in the unit cell of the cubic crystal. In the case of, e.g. a conventional fcc unit cell, the “source-value” key in the map associated with this key should be assigned the following value:  

<html><body><table><tr><td>[[0.0, 0.0, 0.0],</td></tr><tr><td>[0.5, 0.5, 0.0],</td></tr><tr><td></td></tr><tr><td>[0.5, 0.0, 0.5], [0.0, 0.5, 0.5]]</td></tr></table></body></html>  

While each of the twelve components could be set individually, we can instead set each row at a time using colon notation:  

kim property modify 2 key basis-atom-coordinates source-value 1 1:3 0.0 0.0 0.0   
kim property modify 2 key basis-atom-coordinates source-value 2 1:3 0.5 0.5 0.0   
kim property modify 2 key basis-atom-coordinates source-value 3 1:3 0.5 0.0 0.5   
kim property modify 2 key basis-atom-coordinates source-value 4 1:3 0.0 0.5 0.5  

Where the first index given refers to a row and the second index refers to a column. We could, instead, choose to set each column at a time like so:  

kim property modify 2 key basis-atom-coordinates source-value 1:4 1 0.0 0.5 0.5 0.0 & key basis-atom-coordinates source-value 1:4 2 0.0 0.5 0.0 0.5 & key basis-atom-coordinates source-value 1:4 3 0.0 0.0 0.5 0.5  

# Note  

Multiple calls of kim property modify made for the same instance ID can be combined into a single invocation, meaning the following are both valid:  

<html><body><table><tr><td>kim property modify 2 key basis-atom-coordinates source-value 1 1:3 0.0 0.0 0.0 & key basis-atom-coordinates source-value 2 1:3 0.5 0.5 0.0 & key basis-atom-coordinates source-value 3 1:3 0.5 0.0 0.5 & key basis-atom-coordinates source-value 4 1:3 0.0 0.5 0.5</td></tr><tr><td>kim property modify 2 key short-name source-value 1 fcc & key species source-value 1:4 Al Al Al Al & key a source-value 1:5 3.9149 4.0000 4.032 4.0817 4.1602 & source-unit angstrom & digits 5 &</td></tr></table></body></html>  

![](images/50680577c13b2997e539d16cecbe790b1b82741ee3193af44e931ee898079f1b.jpg)  

# Note  

<html><body><table><tr><td>Formultidimensional arrays,only onecolon-separated range is allowed in the index listing. Therefore.</td></tr><tr><td>kim property y modify 2 key basis-atom-coordinates 1 1:3 0.0 0.0 0.0</td></tr><tr><td>is valid but</td></tr><tr><td>kim property modify 2 key basis-atom-coordinates 1:2 1:3 0.0 0.0 0.0 0.0 0.0 0.0</td></tr><tr><td>is not.</td></tr></table></body></html>  

![](images/cdfb402cd433fb098389a4b1da5ea180f0c53cd1448b3d03015f27037c595467.jpg)  

# Note  

After one sets a value in a map with the kim property modify command, additional calls will overwrite the previous value.  

# Remove  

kim property remove instance_id key key_name  

The kim property remove command can be used to remove a property key from a property instance. For example,  

kim property remove 2 key basis-atom-coordinates  

# Destroy  

kim property destroy instance_id  

The kim property destroy command deletes a previously created property instance ID. For example,  

kim property destroy 2  

![](images/a1a0cba32d538928230f9bda91d53242c7ce5dd7174fa07bcc37ca9c2314ae9a.jpg)  

# Note  

If this command is called with an instance ID that does not exist, no error is raised.  

# Dump  

The kim property dump command can be used to write the content of all currently defined property instances to a file:  

kim property dump file  

For example,  

kim property dump results.edn  

![](images/ed992755cb4052c0b721197f9e989249bf938db117681e95729f625c32f53d44.jpg)  

# Note  

Issuing the kim property dump command clears all existing property instances from memory.  

# 1.44.8 Citation of OpenKIM IMs  

When publishing results obtained using OpenKIM IMs researchers are requested to cite the OpenKIM project (Tadmor), KIM API (Elliott), and the specific IM codes used in the simulations, in addition to the relevant scientific references for the IM. The citation format for an IM is displayed on its page on OpenKIM along with the corresponding BibTex file, and is automatically added to the LAMMPS citation reminder.  

Citing the IM software (KIM infrastructure and specific PM or SM codes) used in the simulation gives credit to the researchers who developed them and enables open source efforts like OpenKIM to function.  

# 1.44.9 Restrictions  

The kim command is part of the KIM package. It is only enabled if LAMMPS is built with that package. A requirement for the KIM package, is the KIM API library that must be downloaded from the OpenKIM website and installed before LAMMPS is compiled. When installing LAMMPS from binary, the kim-api package is a dependency that is automatically downloaded and installed. The kim query command requires the libcurl library to be installed. The kim property command requires Python 3.6 or later and the kim-property python package to be installed. See the KIM section of the Packages details for details.  

Furthermore, when using kim command to run KIM SMs, any packages required by the native potential being used or other commands or fixes that it invokes must be installed.  

# 1.44.10 Related commands  

pair_style kim  

(Tadmor) Tadmor, Elliott, Sethna, Miller and Becker, JOM, 63, 17 (2011). doi: https://doi.org/10.1007/ s11837-011-0102-6 (Elliott) Elliott, Tadmor and Bernstein, https://openkim.org/kim-api (2011) doi: https://doi.org/10.25950/FF8F563A  

# 1.45 kspace_modify command  

# 1.45.1 Syntax  

kspace_modify keyword value ...  

• one or more keyword/value pairs may be listed  

• keyword $=$ collective or compute or cutoff/adjust or diff or disp/auto or fftbench or force/disp/kspace or force/disp/real or force or gewald/disp or gewald or kmax/ewald or mesh or minorder or mix/disp or order/disp or order or overlap or scafacos or slab or splittol or wire  

collective value $=$ yes or no   
compute value $=$ yes or no   
cutoff/adjust value $=$ yes or no   
diff value $=$ ad or $\mathrm{ik}=2$ or 4 FFTs for PPPM in smoothed or non-smoothed mode   
disp/auto value $=$ yes or no   
fftbench value = yes or no   
force/disp/real value $=$ accuracy (force units)   
force/disp/kspace value = accuracy (force units)   
force value $=$ accuracy (force units)   
gewald value $=$ rinv (1/distance units)   
rinv = G-ewald parameter for Coulombics   
gewald/disp value $=$ rinv (1/distance units) rinv = G-ewald parameter for dispersion   
kmax/ewald value = kx ky kz kx,ky,kz = number of Ewald sum kspace vectors in each dimension   
mesh value = x y z $\mathrm{x,y,z=grid}$ size in each dimension for long-range Coulombics   
mesh/disp value = x y z x,y,z = grid size in each dimension for $1/\mathrm{r}^{\sim}6$ dispersion   
minorder value = M $\ensuremath\mathrm{{M}}=\ensuremath{\mathrm{min}}$ allowed extent of Gaussian when auto-adjusting to minimize grid communication   
mix/disp value = pair or geom or none   
order value = N N = extent of Gaussian for PPPM or MSM mapping of charge to grid   
order/disp value = N N = extent of Gaussian for PPPM mapping of dispersion term to grid   
overlap = yes or no = whether the grid stencil for PPPM is allowed to overlap into more than the␣   
$\hookrightarrow$ nearest-neighbor processor   
pressure/scalar value = yes or no   
scafacos values $-$ option value1 value2 ... option = tolerance value = energy or energy_rel or field or field_rel or potential or potential_rel option = fmm_tuning value = 0 or 1   
slab value = volfactor or nozforce volfactor = ratio of the total extended volume used in the 2d approximation compared with the volume of the simulation domain nozforce turns off kspace forces in the z direction   
splittol value = tol tol = relative size of two eigenvalues (see discussion below)   
wire value = volfactor (available with ELECTRODE package) volfactor $-$ ratio of the total extended dimension used in the 1d approximation compared with the dimension of the simulation domain  

# 1.45.2 Examples  

<html><body><table><tr><td>kspace modify mesh 24 24 30 order 6</td></tr><tr><td>kspace modify slab 3.0</td></tr><tr><td>kspace_modify y scafacos tolerance energy</td></tr><tr><td></td></tr></table></body></html>  

# 1.45.3 Description  

Set parameters used by the kspace solvers defined by the kspace_style command. Not all parameters are relevant to all kspace styles.  

The collective keyword applies only to PPPM. It is set to no by default, except on IBM BlueGene machines. If this option is set to yes, LAMMPS will use MPI collective operations to remap data for 3d-FFT operations instead of the default point-to-point communication. This is faster on IBM BlueGene machines, and may also be faster on other machines if they have an efficient implementation of MPI collective operations and adequate hardware.  

The compute keyword allows Kspace computations to be turned off, even though a kspace_style is defined. This is not useful for running a real simulation, but can be useful for debugging purposes or for computing only partial forces that do not include the Kspace contribution. You can also do this by simply not defining a kspace_style, but a Kspacecompatible pair_style requires a kspace style to be defined. This keyword gives you that option.  

The cutoff/adjust keyword applies only to MSM. If this option is turned on, the Coulombic cutoff will be automatically adjusted at the beginning of the run to give the desired estimated error. Other cutoffs such as LJ will not be affected. If the grid is not set using the mesh command, this command will also attempt to use the optimal grid that minimizes cost using an estimate given by (Hardy). Note that this cost estimate is not exact, somewhat experimental, and still may not yield the optimal parameters.  

The diff keyword specifies the differentiation scheme used by the PPPM method to compute forces on particles given electrostatic potentials on the PPPM mesh. The $i k$ approach is the default for PPPM and is the original formulation used in (Hockney). It performs differentiation in Kspace, and uses 3 FFTs to transfer each component of the computed fields back to real space for total of 4 FFTs per timestep.  

The analytic differentiation ad approach uses only 1 FFT to transfer information back to real space for a total of 2 FFTs per timestep. It then performs analytic differentiation on the single quantity to generate the 3 components of the electric field at each grid point. This is sometimes referred to as “smoothed” PPPM. This approach requires a somewhat larger PPPM mesh to achieve the same accuracy as the $i k$ method. Currently, only the $i k$ method (default) can be used for a triclinic simulation cell with PPPM. The ad method is always used for MSM.  

![](images/e1b6c2a40000f69bbd38c8972a76d863c52400ff88705fc8cd72b1a05c0473a0.jpg)  

# Note  

Currently, not all PPPM styles support the ad option. Support for those PPPM variants will be added later.  

The disp/auto option controls whether the pppm/disp is allowed to generate PPPM parameters automatically. If set to no, parameters have to be specified using the gewald/disp, mesh/disp, force/disp/real or force/disp/kspace keywords, or the code will stop with an error message. When this option is set to yes, the error message will not appear and the simulation will start. For a typical application, using the automatic parameter generation will provide simulations that are either inaccurate or slow. Using this option is thus not recommended. For guidelines on how to obtain good parameters, see the long-range dispersion howto discussion.  

The fftbench keyword applies only to PPPM. It is off by default. If this option is turned on, LAMMPS will perform a short FFT benchmark computation and report its timings, and will thus finish some seconds later than it would if this option were off.  

The force/disp/real and force/disp/kspace keywords set the force accuracy for the real and reciprocal space computations for the dispersion part of pppm/disp. As shown in (Isele-Holder), optimal performance and accuracy in the results is obtained when these values are different.  

The force keyword overrides the relative accuracy parameter set by the kspace_style command with an absolute accuracy. The accuracy determines the RMS error in per-atom forces calculated by the long-range solver and is thus specified in force units. A negative value for the accuracy setting means to use the relative accuracy parameter. The accuracy setting is used in conjunction with the pairwise cutoff to determine the number of K-space vectors for style ewald, the FFT grid size for style pppm, or the real space grid size for style msm.  

The gewald keyword sets the value of the Ewald or PPPM G-ewald parameter for charge as rinv in reciprocal distance units. Without this setting, LAMMPS chooses the parameter automatically as a function of cutoff, precision, grid spacing, etc. This means it can vary from one simulation to the next which may not be desirable for matching a KSpace solver to a pre-tabulated pairwise potential. This setting can also be useful if Ewald or PPPM fails to choose a good grid spacing and G-ewald parameter automatically. If the value is set to 0.0, LAMMPS will choose the G-ewald parameter automatically. MSM does not use the gewald parameter.  

The gewald/disp keyword sets the value of the Ewald or PPPM G-ewald parameter for dispersion as rinv in reciprocal distance units. It has the same meaning as the gewald setting for Coulombics.  

The kmax/ewald keyword sets the number of kspace vectors in each dimension for kspace style ewald. The three values must be positive integers, or else (0,0,0), which unsets the option. When this option is not set, the Ewald sum scheme chooses its own kspace vectors, consistent with the user-specified accuracy and pairwise cutoff. In any case, if kspace style ewald is invoked, the values used are printed to the screen and the log file at the start of the run.  

The mesh keyword sets the grid size for kspace style pppm or msm. In the case of PPPM, this is the FFT mesh, and each dimension must be factorizable into powers of 2, 3, and 5. In the case of MSM, this is the finest scale real-space mesh, and each dimension must be factorizable into powers of 2. When this option is not set, the PPPM or MSM solver chooses its own grid size, consistent with the user-specified accuracy and pairwise cutoff. Values for x,y,z of 0,0,0 unset the option.  

The mesh/disp keyword sets the grid size for kspace style pppm/disp. This is the FFT mesh for long-range dispersion and ach dimension must be factorizable into powers of 2, 3, and 5. When this option is not set, the PPPM solver chooses its own grid size, consistent with the user-specified accuracy and pairwise cutoff. Values for x,y,z of 0,0,0 unset the option.  

The minorder keyword allows LAMMPS to reduce the order setting if necessary to keep the communication of ghost grid point limited to exchanges between nearest-neighbor processors. See the discussion of the overlap keyword for details. If the overlap keyword is set to yes, which is the default, this is never needed. If it set to no and overlap occurs, then LAMMPS will reduce the order setting, one step at a time, until the ghost grid overlap only extends to nearest neighbor processors. The minorder keyword limits how small the order setting can become. The minimum allowed value for PPPM is 2, which is the default. If minorder is set to the same value as order then no reduction is allowed, and LAMMPS will generate an error if the grid communication is non-nearest-neighbor and overlap is set to no. The minorder keyword is not currently supported in MSM.  

The mix/disp keyword selects the mixing rule for the dispersion coefficients. With pair, the dispersion coefficients of unlike types are computed as indicated with pair_modify. With geom, geometric mixing is enforced on the dispersion coefficients in the kspace coefficients. When using the arithmetic mixing rule, this will speed-up the simulations but introduces some error in the force computations, as shown in (Wennberg). With none, it is assumed that no mixing rule is applicable. Splitting of the dispersion coefficients will be performed as described in (Isele-Holder).  

This splitting can be influenced with the splittol keywords. Only the eigenvalues that are larger than tol compared to the largest eigenvalues are included. Using this keywords the original matrix of dispersion coefficients is approximated. This leads to faster computations, but the accuracy in the reciprocal space computations of the dispersion part is decreased.  

The order keyword determines how many grid spacings an atom’s charge extends when it is mapped to the grid in kspace style pppm or msm. The default for this parameter is 5 for PPPM and 8 for MSM, which means each charge spans 5 or 8 grid cells in each dimension, respectively. For the LAMMPS implementation of MSM, the order can range from 4 to 10 and must be even. For PPPM, the minimum allowed setting is 2 and the maximum allowed setting is 7. The larger the value of this parameter, the smaller that LAMMPS will set the grid size, to achieve the requested accuracy. Conversely, the smaller the order value, the larger the grid size will be. Note that there is an inherent trade-off involved: a small grid will lower the cost of FFTs or MSM direct sum, but a larger order parameter will increase the cost of interpolating charge/fields to/from the grid.  

The PPPM order parameter may be reset by LAMMPS when it sets up the FFT grid if the implied grid stencil extends beyond the grid cells owned by neighboring processors. Typically this will only occur when small problems are run on large numbers of processors. A warning will be generated indicating the order parameter is being reduced to allow LAMMPS to run the problem. Automatic adjustment of the order parameter is not supported in MSM.  

The order/disp keyword determines how many grid spacings an atom’s dispersion term extends when it is mapped to the grid in kspace style pppm/disp. It has the same meaning as the order setting for Coulombics.  

The overlap keyword can be used in conjunction with the minorder keyword with the PPPM styles to adjust the amount of communication that occurs when values on the FFT grid are exchanged between processors. This communication is distinct from the communication inherent in the parallel FFTs themselves, and is required because processors interpolate charge and field values using grid point values owned by neighboring processors (i.e. ghost point communication). If the overlap keyword is set to yes then this communication is allowed to extend beyond nearest-neighbor processors, e.g. when using lots of processors on a small problem. If it is set to no then the communication will be limited to nearest-neighbor processors and the order setting will be reduced if necessary, as explained by the minorder keyword discussion. The overlap keyword is always set to yes in MSM.  

The pressure/scalar keyword applies only to MSM. If this option is turned on, only the scalar pressure (i.e. $\left(\operatorname{Pxx}+\right.$ $\mathrm{Pyy}+\mathrm{Pzz})/3.0\AA$ will be computed, which can be used, for example, to run an isotropic barostat. Computing the full pressure tensor with MSM is expensive, and this option provides a faster alternative. The scalar pressure is computed using a relationship between the Coulombic energy and pressure (Hummer) instead of using the virial equation. This option cannot be used to access individual components of the pressure tensor, to compute per-atom virial, or with suffix kspace/pair styles of MSM, like OMP or GPU.  

The scafacos keyword is used for settings that are passed to the ScaFaCoS library when using kspace_style scafacos.  

The tolerance option affects how the accuracy specified with the kspace_style command is interpreted by ScaFaCoS. The following values may be used:  

• energy $=$ absolute accuracy in total Coulombic energy • energy_rel $=$ relative accuracy in total Coulombic energy • potential $=$ absolute accuracy in total Coulombic potential • potential_rel $=$ relative accuracy in total Coulombic potential • field $=$ absolute accuracy in electric field • field_rel $=$ relative accuracy in electric field  

The values with suffix _rel indicate the tolerance is a relative tolerance; the other values impose an absolute tolerance on the given quantity. Absolute tolerance in this case means, that for a given quantity q and a given absolute tolerance of t_a the result should be between q-t_a and ${\bf q+t\_a}$ . For a relative tolerance t_r the relative error should not be greater than t_r, i.e. $\mathrm{abs}(1-\mathrm{(result/q)})<\mathrm{t\_r}$ . As a consequence of this, the tolerance type should be checked, when performing computations with a high absolute field / energy. E.g. if the total energy in the system is 1000000.0 an absolute tolerance of 1e-3 would mean that the result has to be between 999999.999 and 1000000.001, which would be equivalent to a relative tolerance of 1e-9.  

The energy and energy_rel values, set a tolerance based on the total Coulombic energy of the system. The potential and potential_rel set a tolerance based on the per-atom Coulombic energy. The field and field_rel tolerance types set a tolerance based on the electric field values computed by ScaFaCoS. Since per-atom forces are derived from the peratom electric field, this effectively sets a tolerance on the forces, similar to other LAMMPS KSpace styles, as explained on the kspace_style doc page.  

Note that not all ScaFaCoS solvers support all tolerance types. These are the allowed values for each method:  

• $\mathrm{fmm=}$ energy and energy_rel   
• p2nfft $=$ field (1d-,2d-,3d-periodic systems) or potential (0d-periodic)   
• $\mathrm{p}3\mathrm{m}=$ field   
• ewald $=$ field   
• direct $=$ has no tolerance tuning If the tolerance type is not changed, the default values for the tolerance type are the first values in the above list, e.g.   
energy is the default tolerance type for the fmm solver.  

The fmm_tuning option is only relevant when using the FMM method. It activates (value $^{=1}$ ) or deactivates (value $\scriptstyle=0$ ) an internal tuning mechanism for the FMM solver. The tuning operation runs sequentially and can be very timeconsuming. Usually it is not needed for systems with a homogeneous charge distribution. The default for this option is therefore $O$ . The FMM internal tuning is performed once, when the solver is set up.  

The slab keyword allows an Ewald or PPPM solver to be used for a systems that are periodic in x,y but non-periodic in z - a boundary setting of “boundary p p f”. This is done by treating the system as if it were periodic in z, but inserting empty volume between atom slabs and removing dipole inter-slab interactions so that slab-slab interactions are effectively turned off. The volfactor value sets the ratio of the extended dimension in z divided by the actual dimension in z. It must be a value $>=1.0$ . A value of 1.0 (the default) means the slab approximation is not used.  

The recommended value for volfactor is 3.0. A larger value is inefficient; a smaller value introduces unwanted slab-slab interactions. The use of fixed boundaries in z means that the user must prevent particle migration beyond the initial z-bounds, typically by providing a wall-style fix. The methodology behind the slab option is explained in the paper by (Yeh). The slab option is also extended to non-neutral systems (Ballenegger).  

An alternative slab option can be invoked with the nozforce keyword in lieu of the volfactor. This turns off all kspace forces in the z direction. The nozforce option is not supported by MSM. For MSM, any combination of periodic, nonperiodic, or shrink-wrapped boundaries can be set using boundary (the slab approximation in not needed). The slab keyword is not currently supported by Ewald or PPPM when using a triclinic simulation cell. The slab correction has also been extended to point dipole interactions (Klapp) in kspace_style ewald/disp, ewald/dipole, and pppm/dipole.  

#  Note  

If you wish to apply an electric field in the Z-direction, in conjunction with the slab keyword, you can do it either by adding explicit oppositely charged particles to the $+/-Z$ surfaces, or by using the fix efield command.  

The force/disp/real and force/disp/kspace keywords set the force accuracy for the real and reciprocal space computations for the dispersion part of pppm/disp. As shown in (Isele-Holder), optimal performance and accuracy in the results is obtained when these values are different.  

The disp/auto option controls whether the pppm/disp is allowed to generate PPPM parameters automatically. If set to no, parameters have to be specified using the gewald/disp, mesh/disp, force/disp/real or force/disp/kspace keywords, or the code will stop with an error message. When this option is set to yes, the error message will not appear and the simulation will start. For a typical application, using the automatic parameter generation will provide simulations that are either inaccurate or slow. Using this option is thus not recommended. For guidelines on how to obtain good parameters, see the Howto dispersion doc page.  

# 1.45.4 Restrictions  

none  

# 1.45.5 Related commands  

kspace_style, boundary  

# 1.45.6 Default  

The option defaults are as follows:  

• compute $=$ yes   
• cutoff/adjust $=$ yes (MSM)   
• dif $=$ ik (PPPM)   
• disp/auto = no   
• fftbench $=$ no (PPPM)   
• force $=-1.0$   
• force/disp/kspace $=-1.0$   
• force/disp/real $=-1.0$   
• gewald $=$ gewald/disp = 0.0   
• mesh $=$ mesh/disp $=000$   
• minorder $=2$   
• mix/disp $=$ pair   
• order $=10$ (MSM)   
• order $=$ order/disp $=5$ (PPPM)   
• order $=$ order/disp $=7$ (PPPM/intel)   
• overlap $=$ yes   
• pressure/scalar $=$ yes (MSM)   
$\begin{array}{r l}&{\bullet\mathrm{~slab=1.0~}}\ &{\bullet\mathrm{~split=0~}}\ &{\bullet\mathrm{~tol=1.0e-6~}}\end{array}$  

For scafacos settings, the scafacos tolerance option depends on the method chosen, as documented above. The scafacos fmm_tuning default $=0$ .  

(Yeh) Yeh and Berkowitz, J Chem Phys, 111, 3155 (1999).   
(Ballenegger) Ballenegger, Arnold, Cerda, J Chem Phys, 131, 094107 (2009).   
(Klapp) Klapp, Schoen, J Chem Phys, 117, 8050 (2002).   
(Hardy) David Hardy thesis: Multilevel Summation for the Fast Evaluation of Forces for the Simulation of Biomolecules, University of Illinois at Urbana-Champaign, (2006).   
(Hummer) Hummer, Gronbech-Jensen, Neumann, J Chem Phys, 109, 2791 (1998)   
(Isele-Holder) Isele-Holder, Mitchell, Hammond, Kohlmeyer, Ismail, J Chem Theory Comput, 9, 5412 (2013). (Wennberg) Wennberg, Murtola, Hess, Lindahl, J Chem Theory Comput, 9, 3527 (2013).  

# 1.46 kspace_style command  

# 1.46.1 Syntax  

kspace_style style value  

• style $=$ none or ewald or ewald/dipole or ewald/dipole/spin or ewald/disp or ewald/disp/dipole or ewald/omp or ewald/electrode or pppm or pppm/cg or pppm/disp or pppm/tip4p or pppm/stagger or pppm/disp/tip4p or pppm/gpu or pppm/intel or pppm/disp/intel or pppm/kk or pppm/omp or pppm/cg/omp or pppm/disp/tip4p/omp or pppm/tip4p/omp or pppm/dielectic or pppm/disp/dielectric or pppm/electrode or pppm/electrode/intel or msm or msm/cg or msm/omp or msm/cg/omp or msm/dielectric or scafacos  

none value $=$ none   
ewald value $=$ accuracy accuracy $=$ desired relative error in forces   
ewald/dipole value $=$ accuracy accuracy $=$ desired relative error in forces   
ewald/dipole/spin value $=$ accuracy accuracy = desired relative error in forces   
ewald/disp value $=$ accuracy accuracy $=$ desired relative error in forces   
ewald/disp/dipole value = accuracy accuracy = desired relative error in forces   
ewald/omp value = accuracy accuracy $-$ desired relative error in forces   
ewald/electrode value = accuracy accuracy $-$ desired relative error in forces   
pppm value = accuracy accuracy = desired relative error in forces   
pppm/cg values $-$ accuracy (smallq) accuracy = desired relative error in forces smallq = cutoff for charges to be considered (optional) (charge units)   
pppm/dipole value = accuracy accuracy $-$ desired relative error in forces   
pppm/dipole/spin value = accuracy accuracy = desired relative error in forces   
pppm/disp value = accuracy accuracy = desired relative error in forces   
pppm/tip4p value $=$ accuracy accuracy $=$ desired relative error in forces   
pppm/disp/tip4p value $=$ accuracy accuracy $=$ desired relative error in forces   
pppm/gpu value $=$ accuracy accuracy $=$ desired relative error in forces   
pppm/intel value $=$ accuracy accuracy $=$ desired relative error in forces   
pppm/disp/intel value $=$ accuracy accuracy = desired relative error in forces   
pppm/kk value $=$ accuracy accuracy = desired relative error in forces   
pppm/omp value = accuracy accuracy $-$ desired relative error in forces   
pppm/cg/omp values $-$ accuracy (smallq) accuracy = desired relative error in forces smallq = cutoff for charges to be considered (optional) (charge units)   
pppm/disp/omp value $-$ accuracy accuracy = desired relative error in forces   
pppm/tip4p/omp value $-$ accuracy accuracy $-$ desired relative error in forces   
pppm/disp/tip4p/omp value $=$ accuracy accuracy = desired relative error in forces   
pppm/stagger value = accuracy accuracy $-$ desired relative error in forces   
pppm/dielectric value = accuracy accuracy = desired relative error in forces   
pppm/disp/dielectric value = accuracy accuracy = desired relative error in forces   
pppm/electrode value = accuracy accuracy = desired relative error in forces   
pppm/electrode/intel value $-$ accuracy accuracy = desired relative error in forces   
msm value = accuracy accuracy = desired relative error in forces   
msm/cg value $-$ accuracy (smallq) accuracy = desired relative error in forces smallq = cutoff for charges to be considered (optional) (charge units)   
msm/omp value $-$ accuracy accuracy = desired relative error in forces   
msm/cg/omp value = accuracy (smallq) accuracy = desired relative error in forces smallq = cutoff for charges to be considered (optional) (charge units)   
msm/dielectric value $=$ accuracy accuracy $=$ desired relative error in forces   
scafacos values $=$ method accuracy method $=$ fmm or p2nfft or p3m or ewald or direct accuracy $=$ desired relative error in forces  

# 1.46.2 Examples  

kspace_style pppm 1.0e-4   
kspace_style pppm/cg 1.0e-5 1.0e-6   
kspace_style msm 1.0e-4   
kspace_style scafacos fmm 1.0e-4   
kspace_style none  

Used in input scripts:  

# 1.46.3 Description  

Define a long-range solver for LAMMPS to use each timestep to compute long-range Coulombic interactions or longrange $1/r^{6}$ interactions. Most of the long-range solvers perform their computation in K-space, hence the name of this command.  

When such a solver is used in conjunction with an appropriate pair style, the cutoff for Coulombic or $1/r^{N}$ interactions is effectively infinite. If the Coulombic case, this means each charge in the system interacts with charges in an infinite array of periodic images of the simulation domain.  

Note that using a long-range solver requires use of a matching pair style to perform consistent short-range pairwise calculations. This means that the name of the pair style contains a matching keyword to the name of the KSpace style, as in this table:  

<html><body><table><tr><td>Pair style</td><td>KSpace style</td></tr><tr><td>coul/long</td><td>ewald orpppm</td></tr><tr><td>coul/msm</td><td>msm</td></tr><tr><td>lj/long or buck/long</td><td>disp (for dispersion)</td></tr><tr><td>tip4p/long</td><td>tip4p</td></tr><tr><td>dipole/long</td><td>dipole</td></tr></table></body></html>  

The ewald style performs a standard Ewald summation as described in any solid-state physics text.  

The ewald/disp style adds a long-range dispersion sum option for $1/r^{6}$ potentials and is useful for simulation of interfaces (Veld). It also performs standard Coulombic Ewald summations, but in a more efficient manner than the ewald style. The $1/r^{6}$ capability means that Lennard-Jones or Buckingham potentials can be used without a cutoff, i.e. they become full long-range potentials.  

The ewald/disp/dipole style can also be used with point-dipoles, see (Toukmaji).  

e ewald/dipole style adds long-range standard Ewald summations for dipole-dipole interactions, see (Toukmaji).  

The ewald/dipole/spin style adds long-range standard Ewald summations for magnetic dipole-dipole interactions between magnetic spins.  

The pppm style invokes a particle-particle particle-mesh solver (Hockney) which maps atom charge to a 3d mesh, uses 3d FFTs to solve Poisson’s equation on the mesh, then interpolates electric fields on the mesh points back to the atoms. It is closely related to the particle-mesh Ewald technique (PME) (Darden) used in AMBER and CHARMM. The cost of traditional Ewald summation scales as $N^{\frac{3}{2}}$ where $N$ is the number of atoms in the system. The PPPM solver scales as $N\log N$ due to the FFTs, so it is almost always a faster choice (Pollock).  

The pppm/cg style is identical to the pppm style except that it has an optimization for systems where most particles are uncharged. Similarly the msm/cg style implements the same optimization for msm. The optional smallq argument defines the cutoff for the absolute charge value which determines whether a particle is considered charged or not. Its default value is 1.0e-5.  

The pppm/dipole style invokes a particle-particle particle-mesh solver for dipole-dipole interactions, following the method of (Cerda).  

The pppm/dipole/spin style invokes a particle-particle particle-mesh solver for magnetic dipole-dipole interactions between magnetic spins.  

The pppm/tip4p style is identical to the pppm style except that it adds a charge at the massless fourth site in each TIP4P water molecule. It should be used with pair styles with a tip4p/long in their style name.  

The pppm/stagger style performs calculations using two different meshes, one shifted slightly with respect to the other. This can reduce force aliasing errors and increase the accuracy of the method for a given mesh size. Or a coarser mesh can be used for the same target accuracy, which saves CPU time. However, there is a trade-off since FFTs on two meshes are now performed which increases the computation required. See (Cerutti), (Neelov), and (Hockney) for details of the method.  

For high relative accuracy, using staggered PPPM allows the mesh size to be reduced by a factor of 2 in each dimension as compared to regular PPPM (for the same target accuracy). This can give up to a $4\mathbf{x}$ speedup in the KSpace time (8x less mesh points, $2\mathbf{x}$ more expensive). However, for low relative accuracy, the staggered PPPM mesh size may be essentially the same as for regular PPPM, which means the method will be up to $2\mathbf{x}$ slower in the KSpace time (simply 2x more expensive). For more details and timings, see the Speed tips doc page.  

![](images/e7ace1b8b98333c7366dba2bf97c1fc69ad21aecef3ad567778d446ff37c6066.jpg)  

# Note  

Using pppm/stagger may not give the same increase in the accuracy of energy and pressure as it does in forces, so some caution must be used if energy and/or pressure are quantities of interest, such as when using a barostat.  

The pppm/disp and pppm/disp/tip4 $\iota_{p}$ styles add a mesh-based long-range dispersion sum option for $1/\mathrm{r}\Lambda/6$ potentials (Isele-Holder), similar to the ewald/disp style. The $1/\mathrm{r}\Lambda/6$ capability means that Lennard-Jones or Buckingham potentials can be used without a cutoff, i.e. they become full long-range potentials.  

For these styles, you will possibly want to adjust the default choice of parameters by using the kspace_modify command. This can be done by either choosing the Ewald and grid parameters, or by specifying separate accuracies for the real and kspace calculations. When not making any settings, the simulation will stop with an error message. Further information on the influence of the parameters and how to choose them is described in (Isele-Holder), (Isele-Holder2) and the Howto dispersion doc page.  

![](images/c54e96e61a7ac4773ba227e1d5b83bb2ab0274e6cf447b7d310f9941a75e4510.jpg)  

# Note  

All of the PPPM styles can be used with single-precision FFTs by using the compiler switch -DFFT_SINGLE for the FFT_INC setting in your low-level Makefile. This setting also changes some of the PPPM operations (e.g. mapping charge to mesh and interpolating electric fields to particles) to be performed in single precision. This option can speed-up long-range calculations, particularly in parallel or on GPUs. The use of the -DFFT_SINGLE flag is discussed on the Build settings doc page. MSM does not currently support the -DFFT_SINGLE compiler switch.  

The electrode styles add methods that are required for the constant potential method implemented in fix electrode/\*. The styles ewald/electrode, pppm/electrode and pppm/electrode/intel are available. These styles do not support the kspace_modify slab nozforce command.  

The msm style invokes a multi-level summation method MSM solver, (Hardy) or (Hardy2), which maps atom charge to a 3d mesh, and uses a multi-level hierarchy of coarser and coarser meshes on which direct Coulomb solvers are done. This method does not use FFTs and scales as $N$ . It may therefore be faster than the other K-space solvers for relatively large problems when running on large core counts. MSM can also be used for non-periodic boundary conditions and for mixed periodic and non-periodic boundaries.  

MSM is most competitive versus Ewald and PPPM when only relatively low accuracy forces, about 1e-4 relative error or less accurate, are needed. Note that use of a larger Coulombic cutoff (i.e. 15 Angstroms instead of 10 Angstroms) provides better MSM accuracy for both the real space and grid computed forces.  

Currently calculation of the full pressure tensor in MSM is expensive. Using the kspace_modify pressure/scalar yes command provides a less expensive way to compute the scalar pressure $(\mathrm{Pxx}+\mathrm{Pyy}+\mathrm{Pzz})/3.0$ . The scalar pressure can be used, for example, to run an isotropic barostat. If the full pressure tensor is needed, then calculating the pressure at every timestep or using a fixed pressure simulation with MSM will cause the code to run slower.  

The scafacos style is a wrapper on the ScaFaCoS Coulomb solver library which provides a variety of solver methods which can be used with LAMMPS. The paper by (Sutman) gives an overview of ScaFaCoS.  

ScaFaCoS was developed by a consortium of German research facilities with a BMBF (German Ministry of Science and Education) funded project in 2009-2012. Participants of the consortium were the Universities of Bonn, Chemnitz, Stuttgart, and Wuppertal as well as the Forschungszentrum Juelich.  

The library is available for download at “http://scafacos.de” or can be cloned from the git-repository “https://github.   
com/scafacos/scafacos.git”.  

In order to use this KSpace style, you must download and build the ScaFaCoS library, then build LAMMPS with the SCAFACOS package installed package which links LAMMPS to the ScaFaCoS library. See details on this page.  

![](images/3f6dc794691df148718f9868cf0ddac6c032c60b8b52dec889bb0774c87b6323.jpg)  

# Note  

Unlike other KSpace solvers in LAMMPS, ScaFaCoS computes all Coulombic interactions, both short- and longrange. Thus you should NOT use a Coulombic pair style when using kspace_style scafacos. This also means the total Coulombic energy (short- and long-range) will be tallied for thermodynamic output command as part of the elong keyword; the ecoul keyword will be zero.  

# Note  

See the current restriction below about use of ScaFaCoS in LAMMPS with molecular charged systems or the TIP4P water model.  

The specified method determines which ScaFaCoS algorithm is used. These are the ScaFaCoS methods currently available from LAMMPS:  

• fmm $=$ Fast Multi-Pole method • $p2n f f t=$ FFT-based Coulomb solver • ewald $=$ Ewald summation • direct $=$ direct $\mathrm{O}(\mathrm{N}^{\wedge}2)$ summation • $p3m=\mathrm{PPPM}$  

We plan to support additional ScaFaCoS solvers from LAMMPS in the future. For an overview of the included solvers, refer to (Sutmann)  

The specified accuracy is similar to the accuracy setting for other LAMMPS KSpace styles, but is passed to ScaFaCoS, which can interpret it in different ways for different methods it supports. Within the ScaFaCoS library the accuracy is treated as a tolerance level (either absolute or relative) for the chosen quantity, where the quantity can be either the Columic field values, the per-atom Columic energy or the total Columic energy. To select from these options, see the kspace_modify scafacos accuracy doc page.  

The kspace_modify scafacos command also explains other ScaFaCoS options currently exposed to LAMMPS.  

The specified accuracy determines the relative RMS error in per-atom forces calculated by the long-range solver. It is set as a dimensionless number, relative to the force that two unit point charges (e.g. 2 monovalent ions) exert on each other at a distance of 1 Angstrom. This reference value was chosen as representative of the magnitude of electrostatic forces in atomic systems. Thus an accuracy value of 1.0e-4 means that the RMS error will be a factor of 10000 smaller than the reference force.  

The accuracy setting is used in conjunction with the pairwise cutoff to determine the number of K-space vectors for style ewald or the grid size for style pppm or msm.  

Note that style pppm only computes the grid size at the beginning of a simulation, so if the length or triclinic tilt of the simulation cell increases dramatically during the course of the simulation, the accuracy of the simulation may degrade. Likewise, if the kspace_modify slab option is used with shrink-wrap boundaries in the $\mathbf{Z}\cdot\mathbf{\partial}$ -dimension, and the box size changes dramatically in z. For example, for a triclinic system with all three tilt factors set to the maximum limit, the PPPM grid should be increased roughly by a factor of 1.5 in the y direction and 2.0 in the z direction as compared to the same system using a cubic orthogonal simulation cell. One way to handle this issue if you have a long simulation where the box size changes dramatically, is to break it into shorter simulations (multiple run commands). This works because the grid size is re-computed at the beginning of each run. Another way to ensure the described accuracy requirement is met is to run a short simulation at the maximum expected tilt or length, note the required grid size, and then use the kspace_modify mesh command to manually set the PPPM grid size to this value for the long run. The simulation then will be “too accurate” for some portion of the run.  

RMS force errors in real space for ewald and pppm are estimated using equation 18 of (Kolafa), which is also referenced as equation 9 of (Petersen). RMS force errors in K-space for ewald are estimated using equation 11 of (Petersen), which is similar to equation 32 of (Kolafa). RMS force errors in K-space for pppm are estimated using equation 38 of (Deserno). RMS force errors for msm are estimated using ideas from chapter 3 of (Hardy), with equation 3.197 of particular note. When using msm with non-periodic boundary conditions, it is expected that the error estimation will be too pessimistic. RMS force errors for dipoles when using ewald/disp or ewald/dipole are estimated using equations 33 and 46 of (Wang). The RMS force errors for pppm/dipole are estimated using the equations in (Cerda).  

See the kspace_modify command for additional options of the K-space solvers that can be set, including a force option for setting an absolute RMS error in forces, as opposed to a relative RMS error.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

![](images/cfe99b96f5aa75fe542f0fe9e9cd752ef773e62d6a71d5cdbe1717d064ae07cd.jpg)  

# Note  

For the GPU package, the pppm/gpu style performs charge assignment and force interpolation calculations on the GPU. These processes are performed either in single or double precision, depending on whether the - DFFT_SINGLE setting was specified in your low-level Makefile, as discussed above. The FFTs themselves are still calculated on the CPU. If pppm/gpu is used with a GPU-enabled pair style, part of the PPPM calculation can be performed concurrently on the GPU while other calculations for non-bonded and bonded force calculation are performed on the CPU.  

![](images/bff0b33efae3652986674b5ff449e90a022db4f64acfd948c6a5e6c3de9cb32f.jpg)  

# Note  

For the KOKKOS package, the pppm/kk style performs charge assignment and force interpolation calculations, along with the FFTs themselves, on the GPU or (optionally) threaded on the CPU when using OpenMP and FFTW3. The specific FFT library is selected using the FFT_KOKKOS CMake parameter. See the Build settings doc page for how to select a 3rd-party FFT library.  

# 1.46.4 Restrictions  

Note that the long-range electrostatic solvers in LAMMPS assume conducting metal (tinfoil) boundary conditions for both charge and dipole interactions. Vacuum boundary conditions are not currently supported.  

The ewald/disp, ewald, pppm, and msm styles support non-orthogonal (triclinic symmetry) simulation boxes. However, triclinic simulation cells may not yet be supported by all suffix versions of these styles.  

Most of the base kspace styles are part of the KSPACE package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The msm/dielectric and pppm/dielectric kspace styles are part of the DIELECTRIC package. They are only enabled if LAMMPS was built with that package and the KSPACE package. See the Build package page for more info.  

For MSM, a simulation must be 3d and one can use any combination of periodic, non-periodic, but not shrink-wrapped boundaries (specified using the boundary command).  

For Ewald and PPPM, a simulation must be 3d and periodic in all dimensions. The only exception is if the slab option is set with kspace_modify, in which case the xy dimensions must be periodic and the z dimension must be non-periodic  

The scafacos KSpace style will only be enabled if LAMMPS is built with the SCAFACOS package. See the Build package doc page for more info.  

The use of ScaFaCos in LAMMPS does not yet support molecular charged systems where the short-range Coulombic interactions between atoms in the same bond/angle/dihedral are weighted by the special_bonds command. Likewise it does not support the “TIP4P water style” where a fictitious charge site is introduced in each water molecule. Finally, the methods $p3m$ and ewald do not support computing the virial, so this contribution is not included.  

# 1.46.5 Related commands  

kspace_modify, pair_style lj/cut/coul/long, pair_style lj/charmm/coul/long, pair_style lj/long/coul/long, pair_style buck/coul/long  

# 1.46.6 Default  

(Pollock) Pollock and Glosli, Comp Phys Comm, 95, 93 (1996).   
(Cerutti) Cerutti, Duke, Darden, Lybrand, Journal of Chemical Theory and Computation 5, 2322 (2009)   
(Neelov) Neelov, Holm, J Chem Phys 132, 234103 (2010)   
(Veld) In ‘t Veld, Ismail, Grest, J Chem Phys, 127, 144711 (2007).   
(Toukmaji) Toukmaji, Sagui, Board, and Darden, J Chem Phys, 113, 10913 (2000).   
(Isele-Holder) Isele-Holder, Mitchell, Ismail, J Chem Phys, 137, 174107 (2012).   
(Isele-Holder2) Isele-Holder, Mitchell, Hammond, Kohlmeyer, Ismail, J Chem Theory Comput 9, 5412 (2013). (Hardy) David Hardy thesis: Multilevel Summation for the Fast Evaluation of Forces for the Simulation of Biomolecules, University of Illinois at Urbana-Champaign, (2006).   
(Hardy2) Hardy, Stone, Schulten, Parallel Computing, 35, 164-177 (2009).   
(Sutmann) Sutmann, Arnold, Fahrenberger, et. al., Physical review / E 88(6), 063308 (2013)   
(Cerda) Cerda, Ballenegger, Lenz, Holm, J Chem Phys 129, 234104 (2008)   
(Sutmann) G. Sutmann. ScaFaCoS - a Scalable library of Fast Coulomb Solvers for particle Systems. In Bajaj, Zavattieri, Koslowski, Siegmund, Proceedings of the Society of Engineering Science 51st Annual Technical Meeting. 2014.  

# 1.47 label command  

# 1.47.1 Syntax  

• $\mathrm{ID}=$ string used as label name  

# 1.47.2 Examples  

<html><body><table><tr><td>label xyz</td></tr><tr><td>label loop</td></tr></table></body></html>  

# 1.47.3 Description  

Label this line of the input script with the chosen ID. Unless a jump command was used previously, this does nothing. But if a jump command was used with a label argument to begin invoking this script file, then all commands in the script prior to this line will be ignored. I.e. execution of the script will begin at this line. This is useful for looping over a section of the input script as discussed in the jump command.  

# 1.47.4 Restrictions  

none  

# 1.47.5 Related commands  

jump, next  

# 1.47.6 Default  

none  

# 1.48 labelmap command  

# 1.48.1 Syntax  

option $=$ atom or bond or angle or dihedral or improper or clear or write  

clear $=\mathrm{no}$ args   
write arg $=$ filename   
atom or bond or angle or dihedral or improper args $=$ list of one or more numeric-type/type-label pairs  

# 1.48.2 Examples  

labelmap atom 1 c1 2 hc 3 cp 4 nt   
labelmap atom 3 carbon 4 'c3"' 5 "c1'" 6 "c#"   
labelmap atom \$(label2type(atom,carbon)) C # change type label from 'carbon' to 'C'   
labelmap clear   
labelmap write mymap.include   
labelmap bond 1 carbonyl 2 nitrile 3 """ c1'-c2" """  

# 1.48.3 Description  

Added in version 15Sep2022.  

Define alphanumeric type labels to associate with one or more numeric atom, bond, angle, dihedral or improper types.   
A collection of type labels for all atom types, bond types, etc. is stored as a label map.  

The label map can also be defined by the read_data command when it reads these sections in a data file: Atom Type Labels, Bond Type Labels, etc. See the Howto type labels doc page for a general discussion of how type labels can be used. See (Gissinger) for a discussion of the type label implementation in LAMMPS and its uses.  

Valid type labels can contain any alphanumeric character, but must not start with a number, a ‘#’, or a ‘\*’ character. They can contain other standard ASCII characters such as angular or square brackets $^{\bullet}<^{,}$ and $\ '>:$ or ‘[’ and ‘]’, parenthesis ‘(’ and ‘)’, dash ‘-’, underscore ‘_’, plus $\mathbf{\nabla}^{\epsilon}+\mathbf{\nabla}^{\gamma}$ and equals $\mathbf{\omega}^{\zeta}=\mathbf{\gamma}^{\zeta}$ signs and more. They must not contain blanks or any other whitespace. Note that type labels must be put in single or double quotation marks if they contain the ‘#’ character or if they contain a double (”) or single quotation mark (‘). If the label contains both a single and a double quotation mark, then triple quotation (“””) must be used. When enclosing a type label with quotation marks, the LAMMPS input parser may require adding leading or trailing blanks around the type label so it can identify the enclosing quotation marks. Those blanks will be removed when defining the label.  

A labelmap command can only modify the label map for one type-kind (atom types, bond types, etc). Any number of numeric-type/type-label pairs may follow. If a type label already exists for the same numeric type, it will be overwritten. Type labels must be unique; assigning the same type label to multiple numeric types within the same type-kind is not allowed. When reading and writing data files, it is required that there is a label defined for every numeric type within a given type-kind in order to write out the type label section for that type-kind.  

The clear option resets the label map and thus discards all previous settings.  

The write option takes a filename as argument and writes the current label mappings to a file as a sequence of labelmap commands, so the file can be copied into a new LAMMPS input file or read in using the include command.  

# 1.48. labelmap command  

# 1.48.4 Restrictions  

This command must come after the simulation box is defined by a read_data, read_restart, or create_box command.   
Label maps are currently not supported when using the KOKKOS package.  

# 1.48.5 Related commands  

read_data, write_data, molecule, fix bond/react  

# 1.48.6 Default  

none  

(Gissinger) J. R. Gissinger, I. Nikiforov, Y. Afshar, B. Waters, M. Choi, D. S. Karls, A. Stukowski, W. Im, H. Heinz, A. Kohlmeyer, and E. B. Tadmor, J Phys Chem B, 128, 3282-3297 (2024).  

# 1.49 lattice command  

# 1.49.1 Syntax  

lattice style scale keyword values ...  

• style $=$ none or sc or bcc or fcc or hcp or diamond or sq or $s q2$ or hex or custom   
• scale $=$ scale factor between lattice and simulation box scale $=$ reduced density rho\* (for LJ units) scale $=$ lattice constant in distance units (for all other units)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ origin or orient or spacing or $a I$ or $a2$ or $a3$ or basis or triclinic/general origin values $=\mathrm{~x~}$ y z $\mathbf{x},\mathbf{y},\mathbf{z}=$ fractions of a unit cell $\mathrm{\Lambda}^{\prime}0<=\mathrm{x},\mathrm{y},\mathrm{z}<1$ ) orient values $=\dim\mathrm{~i~j~k~}$ $\mathrm{{dim}=x}$ or y or z $\mathrm{i,j,k=}$ integer lattice directions spacing values = dx dy dz dx,dy, $\mathrm{dz}={}$ lattice spacings in the x,y,z box directions a1,a2,a3 values = x y z $\mathbf{x},\mathbf{y},\mathbf{z}=$ primitive vector components that define unit cell basis values $=\mathrm{~x~}$ y z $\mathbf{x},\mathbf{y},\mathbf{z}=$ fractional coords of a basis atom ( $0<=\mathbf{x}$ ,y,z $<1$ ) triclinic/general values $=$ no values  

# 1.49.2 Examples  

lattice fcc 3.52   
lattice hex 0.85   
lattice sq 0.8 origin 0.0 0.5 0.0 orient $\mathrm{~x~1~1~0~}$ orient y -1 1 0   
lattice custom 3.52 a1 1.0 0.0 0.0 a2 0.5 1.0 0.0 a3 0.0 0.0 0.5 & basis 0.0 0.0 0.0 basis 0.5 0.5 0.5 triclinic/general   
lattice none 2.0  

# 1.49.3 Description  

Define a lattice for use by other commands. In LAMMPS, a lattice is simply a set of points in space, determined by a unit cell with basis atoms, that is replicated infinitely in all dimensions. The arguments of the lattice command can be used to define a wide variety of crystallographic lattices.  

A lattice is used by LAMMPS in two ways. First, the create_atoms command creates atoms on the lattice points inside the simulation box. Note that the create_atoms command allows different atom types to be assigned to different basis atoms of the lattice. Second, the lattice spacing in the x,y,z dimensions implied by the lattice, can be used by other commands as distance units (e.g. create_box, region and velocity), which are often convenient to use when the underlying problem geometry is atoms on a lattice.  

The lattice style must be consistent with the dimension of the simulation - see the dimension command. Styles $s c$ or bcc or fcc or hcp or diamond are for 3d problems. Styles sq or sq2 or hex are for 2d problems. Style custom can be used for either 2d or 3d problems.  

A lattice consists of a unit cell, a set of basis atoms within that cell, and a set of transformation parameters (scale, origin, orient) that map the unit cell into the simulation box. The vectors a1,a2,a3 are the edge vectors of the unit cell. This is the nomenclature for “primitive” vectors in solid-state crystallography, but in LAMMPS the unit cell they determine does not have to be a “primitive cell” of minimum volume.  

Note that the lattice command can be used multiple times in an input script. Each time it is invoked, the lattice attributes are re-defined and are used for all subsequent commands (that use lattice attributes). For example, a sequence of lattice, region, and create_atoms commands can be repeated multiple times to build a poly-crystalline model with different geometric regions populated with atoms in different lattice orientations.  

A lattice of style none does not define a unit cell and basis set, so it cannot be used with the create_atoms command. However it does define a lattice spacing via the specified scale parameter. As explained above the lattice spacings in x,y,z can be used by other commands as distance units. No additional keyword/value pairs can be specified for the none style. By default, a “lattice none $1.0^{\cdot}$ is defined, which means the lattice spacing is the same as one distance unit, as defined by the units command.  

Lattices of style sc, fcc, bcc, and diamond are 3d lattices that define a cubic unit cell with edge length $=1.0$ . This means ${\sf a l}=100$ , $\mathrm{a}2=010$ , and ${\mathrm{a}3=001}$ . Style hcp has ${\sf a l}=100$ , $\mathrm{a}2=0$ sqrt(3) 0, and $\mathrm{a}3=00\mathrm{sqrt}(8/3)$ . The placement of the basis atoms within the unit cell are described in any solid-state physics text. A $s c$ lattice has 1 basis atom at the lower-left-bottom corner of the cube. A bcc lattice has 2 basis atoms, one at the corner and one at the center of the cube. A fcc lattice has 4 basis atoms, one at the corner and 3 at the cube face centers. A hcp lattice has 4 basis atoms, two in the $\mathbf{Z}=0$ plane and 2 in the $\mathbf{Z}=0.5$ plane. A diamond lattice has 8 basis atoms.  

Lattices of style $s q$ and $s q2$ are 2d lattices that define a square unit cell with edge length $=1.0$ . This means ${\sf a l}=100$ and ${\bf a}2=010$ . A sq lattice has 1 basis atom at the lower-left corner of the square. A sq2 lattice has 2 basis atoms, one at the corner and one at the center of the square. A hex style is also a 2d lattice, but the unit cell is rectangular, with a1 $=100$ and $\mathbf{a}2=0$ sqrt(3) 0. It has 2 basis atoms, one at the corner and one at the center of the rectangle.  

A lattice of style custom allows you to specify a1, a2, a3, and a list of basis atoms to put in the unit cell. By default, a1 and a2 and a3 are 3 orthogonal unit vectors (edges of a unit cube). But you can specify them to be of any length and non-orthogonal to each other, so that they describe a tilted parallelepiped. Via the basis keyword you add atoms, one at a time, to the unit cell. Its arguments are fractional coordinates $(0.0<=\mathrm{x,y,z<1.0}$ ). For 2d simulations, the fractional z coordinate for any basis atom must be 0.0.  

The position vector x of a basis atom within the unit cell is a linear combination of the unit cell’s 3 edge vectors, i.e. x $={\mathrm{bx~al~+by~a2+bz~a3}}$ , where bx,by,bz are the 3 values specified for the basis keyword.  

This subsection discusses the arguments that determine how the idealized unit cell is transformed into a lattice of points within the simulation box.  

The scale argument determines how the size of the unit cell will be scaled when mapping it into the simulation box. I.e. it determines a multiplicative factor to apply to the unit cell, to convert it to a lattice of the desired size and distance units in the simulation box. The meaning of the scale argument depends on the units being used in your simulation.  

For all unit styles except $l j$ , the scale argument is specified in the distance units defined by the unit style. For example, in real or metal units, if the unit cell is a unit cube with edge length 1.0, specifying scale $=3.52$ would create a cubic lattice with a spacing of 3.52 Angstroms. In cgs units, the spacing would be $3.52\mathrm{cm}$ .  

For unit style $l j$ , the scale argument is the Lennard-Jones reduced density, typically written as rho\*. LAMMPS converts this value into the multiplicative factor via the formula “factor $\cdot\wedge_{\mathrm{dim}}={\mathrm{rho}}/{\mathrm{rho}}^{*}^{,}$ , where rho ${\bf\Gamma}={\bf N}/{\bf V}$ with ${\mathrm{V}}=$ the volume of the lattice unit cell and $\Nu=$ the number of basis atoms in the unit cell (described below), and $\mathrm{dim}=2$ or 3 for the dimensionality of the simulation. Effectively, this means that if LJ particles of size sigma $=1.0$ are used in the simulation, the lattice of particles will be at the desired reduced density.  

The origin option specifies how the unit cell will be shifted or translated when mapping it into the simulation box. The x,y,z values are fractional values $(0.0<=\mathrm{x,y,z<1.0}$ ) meaning shift the lattice by a fraction of the lattice spacing in each dimension. The meaning of “lattice spacing” is discussed below. For 2d simulations, the origin z value must be 0.0.  

The orient option specifies how the unit cell will be rotated when mapping it into the simulation box. The dim argument is one of the 3 coordinate axes in the simulation box. The other 3 arguments are the crystallographic direction in the lattice that you want to orient along that axis, specified as integers. E.g. “orient $\textsc{x210}^{\ '}$ means the $\mathbf{X}$ -axis in the simulation box will be the [210] lattice direction, and similarly for y and z. The 3 lattice directions you specify do not have to be unit vectors, but they must be mutually orthogonal and obey the right-hand rule, i.e. (X cross Y) points in the Z direction. For 2d simulations, the orient x and y vectors must define 0 for their 3rd component. Similarly the orient z vector must define 0 for its 1st and 2nd components.  

![](images/0e04a6ba0a2967cd8b610617741c7e622a3fb8f4fbae7ceabf0041800852c535.jpg)  

# Note  

The preceding paragraph describing lattice directions is only valid for orthogonal cubic unit cells (or square in 2d). If you are using a hcp or hex lattice or the more general lattice style custom with non-orthogonal a1,a2,a3 vectors, then you should think of the 3 orient vectors as creating a 3x3 rotation matrix which is applied to a1,a2,a3 to rotate the original unit cell to a new orientation in the simulation box.  

The triclinic/general option specifies that the defined lattice is for use with a general triclinic simulation box, as opposed to an orthogonal or restricted triclinic box. The Howto triclinic doc page explains all 3 kinds of simulation boxes LAMMPS supports.  

If this option is specified, a custom lattice style must be used. The a1, a2, a3 vectors should define the edge vectors of a single unit cell of the lattice with one or more basis atoms. They edge vectors can be arbitrary so long as they are non-zero, distinct, and not co-planar. In addition, they must define a right-handed system, such that (a1 cross $a2$ ) points in the direction of a3. Note that a left-handed system can be converted to a right-handed system by simply swapping the order of any pair of the a1, a2, a3 vectors. For 2d simulations, the a3 vector must be specified as (0.0,0.0,1.0), which is its default value.  

If this option is used, the origin and orient settings must have their default values. Namely (0.0,0.0,0.0) for the origin and (100), (010), (001) for the orient vectors.  

The create_box command can be used to create a general triclinic box that replicates the a1, a2, a3 unit cell vectors in each direction to create the 3 arbitrary edge vectors of the overall simulation box. It requires a lattice with the triclinic/general option.  

Likewise, the create_atoms command can be used to add atoms (or molecules) to a general triclinic box which lie on the lattice points defined by a1, a2, a3 and the unit cell basis atoms. To do this, it also requires a lattice with the triclinic/general option.  

![](images/41d96912b0f3ef708f11b90699c707f03dd579abbfefc9b4cfcf37e94a5d247f.jpg)  

# Note  

LAMMPS allows specification of general triclinic lattices and simulation boxes as a convenience for users who may be converting data from solid-state crystallographic representations or from DFT codes for input to LAMMPS. However, as explained on the Howto_triclinic doc page, internally, LAMMPS only uses restricted triclinic simulation boxes. This means the box and per-atom information (e.g. coordinates, velocities) defined by the create_box and create_atoms commands are converted from general to restricted triclinic form when the two commands are invoked. It also means that any other commands which use lattice spacings from this command (e.g. the region command), will be operating on a restricted triclinic simulation box, even if the triclinic/general option was used to define the lattice. See the next section for details.  

Several LAMMPS commands have the option to use distance units that are inferred from “lattice spacings” in the x,y,z box directions. E.g. the region command can create a block of size $10\mathrm{x}20\mathrm{x}20$ , where 10 means 10 lattice spacings in the x direction.  

![](images/f9b4c9143fd7415e20d9e4c299e643de2044f62a5dfe74a372d0e43826bb06dc.jpg)  

# Note  

Though they are called lattice spacings, all the commands that have a “units lattice” option, simply use the 3 values as scale factors on the distance units defined by the units command. Thus if you do not like the lattice spacings computed by LAMMPS (e.g. for a non-orthogonal or rotated unit cell), you can define the 3 values to be whatever you wish, via the spacing option.  

If the spacing option is not specified, the lattice spacings are computed by LAMMPS in the following way. A unit cell of the lattice is mapped into the simulation box (scaled and rotated), so that it now has (perhaps) a modified size and orientation. The lattice spacing in X is defined as the difference between the min/max extent of the x coordinates of the 8 corner points of the modified unit cell (4 in 2d). Similarly, the Y and Z lattice spacings are defined as the difference in the min/max of the y and z coordinates.  

# Note  

If the triclinic/general option is specified, the unit cell defined by a1, a2, a3 edge vectors is first converted to a restricted triclinic orientation, which is a rotation operation. The min/max extent of the 8 corner points is then determined, as described in the preceding paragraph, to set the lattice spacings. As explained for the triclinic/general option above, this is because any use of the lattice spacings by other commands will be for a restricted triclinic simulation box, not a general triclinic box.  

Note that if the unit cell is orthogonal with axis-aligned edges (no rotation via the orient keyword), then the lattice spacings in each dimension are simply the scale factor (described above) multiplied by the length of a1,a2,a3. Thus a hex style lattice with a scale factor of 3.0 Angstroms, would have a lattice spacing of 3.0 in x and $3^{*}\mathrm{sqrt}(3.0)$ in y.  

# Note  

For non-orthogonal unit cells and/or when a rotation is applied via the orient keyword, then the lattice spacings computed by LAMMPS are typically less intuitive. In particular, in these cases, there is no guarantee that a particular lattice spacing is an integer multiple of the periodicity of the lattice in that direction. Thus, if you create an orthogonal periodic simulation box whose size in a dimension is a multiple of the lattice spacing, and then fill it with atoms via the create_atoms command, you will NOT necessarily create a periodic system. I.e. atoms may overlap incorrectly at the faces of the simulation box.  

The spacing option sets the 3 lattice spacings directly. All must be non-zero (use 1.0 for dz in a 2d simulation). The specified values are multiplied by the multiplicative factor described above that is associated with the scale factor. Thus a spacing of 1.0 means one unit cell edge length independent of the scale factor. As mentioned above, this option can be useful if the spacings LAMMPS computes are inconvenient to use in subsequent commands, which can be the case for non-orthogonal or rotated lattices.  

Note that whenever the lattice command is used, the values of the lattice spacings LAMMPS calculates are printed out.   
Thus their effect in commands that use the spacings should be decipherable.  

Example commands for generating a Wurtzite crystal. The lattice constants approximate those of CdSe. The ${\sqrt{3}}\times1$ orthorhombic supercell is used with the x, y, and z directions oriented along [1230], [10i0], and [0001], respectively  

<html><body><table><tr><td>variable a equal  4.34</td><td></td><td></td><td></td></tr><tr><td>variable b equal $a*sqrt(3.0)</td><td></td><td></td><td></td></tr><tr><td>variable c equal $a*sqrt(8.0/3.0)</td><td></td><td></td><td></td></tr><tr><td colspan="4">variable third equal 1.0/3.0</td></tr><tr><td colspan="4">variable five6 equal 5.0/6.0</td></tr><tr><td colspan="4">lattice custom 1.0 & 0.0</td></tr><tr><td>al a2</td><td>$b 0.0</td><td>0.0</td><td>& &</td></tr><tr><td>a3</td><td>e$ 0.0 0.0</td><td>0.0 $c</td><td>&</td></tr><tr><td>basis</td><td>0.0 0.0</td><td>0.0</td><td></td></tr><tr><td>basis</td><td>0.5 0.5</td><td>0.0</td><td></td></tr><tr><td>basis</td><td>${third} 0.0</td><td>0.5</td><td>& &</td></tr><tr><td>basis</td><td>${five6} 0.5</td><td>0.5</td><td>&</td></tr><tr><td>basis</td><td>0.0</td><td>0.625</td><td></td></tr><tr><td>basis</td><td>0.5</td><td>0.625</td><td>& &</td></tr><tr><td>basis</td><td>${third} 0.0</td><td>0.125</td><td>28</td></tr><tr><td>basis</td><td>${fve6} 0.5</td><td>0.125</td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td colspan="4">region myreg block 0 1 0 1 0 1 create_box</td></tr><tr><td>create_atoms</td><td>2 myreg</td><td></td><td></td></tr><tr><td>basis</td><td>1 box 2</td><td>& &</td><td></td></tr><tr><td>basis</td><td>5 6</td><td></td><td></td></tr><tr><td>basis</td><td>7</td><td>& &</td><td></td></tr><tr><td></td><td>8</td><td></td><td></td></tr><tr><td>basis</td><td>2</td><td></td><td></td></tr></table></body></html>  

# 1.49.4 Restrictions  

The $a l,a2,a3$ ,basis keywords can only be used with style custom.  

# 1.49.5 Related commands  

dimension, create_atoms, region  

# 1.49.6 Default  

lattice none 1.0  

For other lattice styles, the option defaults are origin $=0.00.00.0$ , orient $=\mathbf{x}\mathrm{~1~0~0~}$ , orient $=\mathrm{~y~0~1~0~}$ , orient $=\mathbf{z}\left(\right)01$ , ${\sf a l}=100$ , $\mathrm{a}2=010$ , and ${\mathrm{a}3=001}$ .  

# 1.50 log command  

# 1.50.1 Syntax  

• file $=$ name of new logfile • keyword $=$ append if output should be appended to logfile (optional)  

# 1.50.2 Examples  

log log.equil log log.equil append  

# 1.50.3 Description  

This command closes the current LAMMPS log file, opens a new file with the specified name, and begins logging information to it. If the specified file name is none, then no new log file is opened. If the optional keyword append is specified, then output will be appended to an existing log file, instead of overwriting it.  

If multiple processor partitions are being used, the file name should be a variable, so that different processors do not attempt to write to the same log file.  

The file “log.lammps” is the default log file for a LAMMPS run. The name of the initial log file can also be set by the -log command-line switch.  

# 1.50.4 Restrictions  

none  

# 1.50.5 Related commands  

none  

# 1.50.6 Default  

The default LAMMPS log file is named log.lammps  

# 1.51 mass command  

# 1.51.1 Syntax  