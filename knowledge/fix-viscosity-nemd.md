---
title: "Fix Viscosity, Viscous, and Wall Commands"
description: "Müller-Plathe NEMD viscosity, viscous drag, wall interaction fixes"
category: "fix"
tags: ["viscosity", "NEMD", "wall", "drag", "boundary"]
commands: ["fix viscosity", "fix viscous", "fix wall/reflect", "fix wall/lj93", "fix wall/lj126", "fix wall/harmonic"]
---
If your system is periodic in the direction of the momentum flux, then the flux is going in 2 directions. This means the effective momentum flux in one direction is reduced by a factor of 2. You will see this in the equations for viscosity in the Muller-Plathe paper. LAMMPS is simply tallying momentum which does not account for whether or not your system is periodic; you must use the value appropriately to yield a viscosity for your system.  

![](images/2023068b659567c64fa8a87b62c557e7f1b4a7b71dd7848793e355c150b76240.jpg)  

# Note  

After equilibration, if the velocity profile you observe is not linear, then you are likely swapping momentum too frequently and are not in a regime of linear response. In this case you cannot accurately infer a viscosity and should try increasing the Nevery parameter.  

An alternative method for calculating a viscosity is to run a NEMD simulation, as described on the Howto nemd doc page. NEMD simulations deform the simulation box via the fix deform command.  

Some features or combination of settings in LAMMPS do not support non-orthogonal boxes. Using fix viscosity keeps the box orthogonal; thus it does not suffer from these limitations.  

# 2.245.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the cumulative momentum transferred between the bottom and middle of the simulation box (in the pdim direction) is stored as a scalar quantity by this fix. This quantity is zeroed when the fix is defined and accumulates thereafter, once every N steps. The units of the quantity are momentum $=$ mass\*velocity. The scalar value calculated by this fix is “intensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.245.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Swaps conserve both momentum and kinetic energy, even if the masses of the swapped atoms are not equal. Thus you should not need to thermostat the system. If you do use a thermostat, you may want to apply it only to the non-swapped dimensions (other than vdim).  

LAMMPS does not check, but you should not use this fix to swap velocities of atoms that are in constrained molecules, e.g. via fix shake or fix rigid. This is because application of the constraints will alter the amount of transferred momentum. You should, however, be able to use flexible molecules. See the Maginn paper for an example of using this algorithm in a computation of alcohol molecule properties.  

When running a simulation with large, massive particles or molecules in a background solvent, you may want to only exchange momenta between solvent particles.  

# 2.245.6 Related commands  

fix ave/chunk, fix thermal/conductivity  

# 2.245.7 Default  

The option defaults are swap $=1$ and vtarget $\begin{array}{r}{{\bf\Gamma}=\mathrm{INF}}\end{array}$ .  

(Muller-Plathe) Muller-Plathe, Phys Rev E, 59, 4894-4898 (1999).   
(Maginn) Kelkar, Rafferty, Maginn, Siepmann, Fluid Phase Equilibria, 260, 218-231 (2007).  

# 2.246 fix viscous command  

Accelerator Variants: viscous/kk  

# 2.246.1 Syntax  

fix ID group-ID viscous gamma keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• viscous $=$ style name of this fix command   
• gamma $=$ damping coefficient (force/velocity units) zero or more keyword/value pairs may be appended keyword $=$ scale scale values $=$ type ratio type $=$ atom type (1-N) ratio $=$ factor to scale the damping coefficient by  

# 2.246.2 Examples  

fix 1 flow viscous 0.1   
fix 1 damp viscous 0.5 scale 3 2.5  

# 2.246.3 Description  

Add a viscous damping force to atoms in the group that is proportional to the velocity of the atom. The added force can be thought of as a frictional interaction with implicit solvent, i.e. the no-slip Stokes drag on a spherical particle. In granular simulations this can be useful for draining the kinetic energy from the system in a controlled fashion. If used without additional thermostatting (to add kinetic energy to the system), it has the effect of slowly (or rapidly) freezing the system; hence it can also be used as a simple energy minimization technique.  

The damping force $F_{i}$ is given by $F_{i}=-\gamma\nu_{i}$ . The larger the coefficient, the faster the kinetic energy is reduced. If the optional keyword scale is used, $\gamma$ can scaled up or down by the specified factor for atoms of that type. It can be used multiple times to adjust $\gamma$ for several atom types.  

![](images/201a3d8014f2b85ddf9250829d7f9b7de2aa0d7cc84839d5304d53f32dd19f5d.jpg)  

# Note  

You should specify gamma in force/velocity units. This is not the same as mass/time units, at least for some of the LAMMPS units options like “real” or “metal” that are not self-consistent.  

Icno ea fBficrioewntn.i cdaynn abme iwcsr icttoennt eaxst $\begin{array}{r}{\gamma=\frac{k_{B}T}{D}}\end{array}$ h, ewreh $k_{B}=$ aBmolitcz vmisacnons’ist cy oonfs ttahne t,f $T=$ otenaml pfelruaitdu aren,d $D=$ pmaertteirc loef  dpiaffrutisciloen. $D$ $\frac{k_{B}T}{3\pi\eta d}$ $\eta=$ $\mathrm{d}=$ This means $\gamma=3\pi\eta d$ , and thus is proportional to the viscosity of the fluid and the particle diameter.  

# 2.246. fix viscous command  

In the current implementation, rather than have the user specify a viscosity, γ is specified directly in force/velocity units. If needed, γ can be adjusted for atoms of different sizes (i.e. $\sigma$ ) by using the scale keyword.  

Note that Brownian dynamics models also typically include a randomized force term to thermostat the system at a chosen temperature. The fix langevin command does this. It has the same viscous damping term as fix viscous and adds a random force to each atom. The random force term is proportional to the square root of the chosen thermostatting temperature. Thus if you use fix langevin with a target $T=0$ , its random force term is zero, and you are essentially performing the same operation as fix viscous. Also note that the gamma of fix viscous is related to the damping parameter of fix langevin, however the former is specified in units of force/velocity and the latter in units of time, so that it can more easily be used as a thermostat.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.246.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is modifying forces. Default is the outermost level.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command. This fix should only be used with damped dynamics minimizers that allow for non-conservative forces. See the min_style command for details.  

# 2.246.5 Restrictions  

none  

# 2.246.6 Related commands  

fix langevin, fix viscous/sphere, fix damping/cundall  

# 2.246.7 Default  

none  

# 2.247 fix viscous/sphere command  

# 2.247.1 Syntax  

fix ID group-ID viscous/sphere gamma keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• viscous/sphere $=$ style name of this fix command gamma $=$ damping coefficient (torque/angular velocity units) zero or more keyword/value pairs may be appended keyword $=$ scale scale values $=$ type ratio or v_name type $=$ atom type (1-N) ratio $=$ factor to scale the damping coefficients by v_name $=$ reference to atom style variable name  

# 2.247.2 Examples  

fix 1 flow viscous/sphere 0.1 fix 1 damp viscous/sphere 0.5 scale 3 2.5 fix 1 damp viscous/sphere 0.5 scale v_radscale  

# 2.247.3 Description  

Add a viscous damping torque to finite-size spherical particles in the group that is proportional to the angular velocity of the atom. In granular simulations this can be useful for draining the rotational kinetic energy from the system in a controlled fashion. If used without additional thermostatting (to add kinetic energy to the system), it has the effect of slowly (or rapidly) freezing the system; hence it can also be used as a simple energy minimization technique.  

The damping torque $T_{i}$ is given by $T_{i}=-\gamma\omega_{i}$ . The larger the coefficient, the faster the rotational kinetic energy is reduced.  

If the optional keyword scale is used, $\gamma$ can be scaled up or down by the specified factor for atoms. This factor can be set for different atom types and thus the scale keyword used multiple times followed by the atom type and the associated scale factor. Alternately the scaling factor can be computed for each atom (e.g. based on its radius) by using an atom-style variable.  

![](images/012bde92749d3fda365515318d36a13c0ba5ad4080fce3cfbbe02c278ca7fa6a.jpg)  

# Note  

You should specify gamma in torque/angular velocity units. This is not the same as mass/time units, at least for some of the LAMMPS units options like “real” or “metal” that are not self-consistent.  

In the current implementation, rather than have the user specify a viscosity, $\gamma$ is specified directly in torque/angular velocity units. If needed, γ can be adjusted for atoms of different sizes (i.e. $\sigma$ ) by using the scale keyword.  

# 2.247.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is modifying torques. Default is the outermost level.  

The torques due to this fix are imposed during an energy minimization, invoked by the minimize command. This fix should only be used with damped dynamics minimizers that allow for non-conservative forces. See the min_style command for details.  

# 2.247.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular velocity (omega) and a radius as defined by the atom_style sphere command.  

All particles in the group must be finite-size spheres. They cannot be point particles.  

# 2.247.6 Related commands  

fix viscous, fix damping/cundall  

# 2.247.7 Default  

none  

# 2.248 fix wall/lj93 command  

Accelerator Variants: wall/lj93/kk  

2.249 fix wall/lj126 command   
2.250 fix wall/lj1043 command   
2.251 fix wall/colloid command   
2.252 fix wall/harmonic command   
2.253 fix wall/lepton command   
2.254 fix wall/morse command   
2.255 fix wall/table command  

# 2.255.1 Syntax  

fix ID group-ID style [tabstyle] [N] face args ... keyword value ...  

• ID, group-ID are documented in fix command   
• style $=$ wall/lj93 or wall/lj126 or wall/lj1043 or wall/colloid or wall/harmonic or wall/lepton or wall/morse or wall/table   
• tabstyle $=$ linear or spline $=$ method of table interpolation (only applies to wall/table)   
• $\Nu=$ use N values in linear or spline interpolation (only applies to wall/table)   
• one or more face/arg pairs may be appended  

• face $=x l o$ or xhi or ylo or yhi or zlo or zhi • args for styles $l j93$ or $l j l26$ or lj1043 or colloid or harmonic  

args $=$ coord epsilon sigma cutoff   
coord $=$ position of $\mathrm{wall}=\mathrm{EDGE}$ or constant or variable EDGE $=$ current lo or hi edge of simulation box constant $=$ number like 0.0 or -30.0 (distance units) variable $=$ equal-style variable like v_x or v_wiggle   
epsilon $=$ strength factor for wall-particle interaction (energy or energy/distance $\frown2$ units) epsilon can be a variable (see below)   
sigma $=$ size factor for wall-particle interaction (distance units) sigma can be a variable (see below)   
cutoff $=$ distance from wall at which wall-particle interactions are cut off (distance units)  

• args for style lepton  

args $=$ coord expression cutoff   
coord $=$ position of $\mathrm{wall}=\mathrm{EDGE}$ or constant or variable EDGE $=$ current lo or hi edge of simulation box constant $=$ number like 0.0 or -30.0 (distance units) variable $=$ equal-style variable like v_x or v_wiggle   
expression $=$ Lepton expression for the potential (energy units)   
cutoff $=$ distance from wall at which wall-particle interactions are cut off (distance units)  

• args for style morse  

args $=$ coord D_0 alpha r_0 cutoff   
coord $=$ position of $\mathrm{wall}=\mathrm{EDGE}$ or constant or variable EDGE $=$ current lo or hi edge of simulation box constant $=$ number like 0.0 or -30.0 (distance units) variable $=$ equal-style variable like v_x or v_wiggle   
D_ $0=$ depth of the potential (energy units) $\mathrm{~D~}_{-}0$ can be a variable (see below)   
alpha $=$ width factor for wall-particle interaction (1/distance units) alpha can be a variable (see below)   
$\mathrm{~r~}\_0=$ distance of the potential minimum from the face of region (distance units) $\mathrm{~r~}\_0$ can be a variable (see below)   
cutoff $=$ distance from wall at which wall-particle interactions are cut off (distance units)  

• args for style table  

args $=$ coord filename keyword cutoff   
coord $=$ position of wall $=$ EDGE or constant or variable EDGE $=$ current lo or hi edge of simulation box constant $=$ number like 0.0 or -30.0 (distance units) variable $=$ equal-style variable like v_x or v_wiggle   
filename $=$ file containing tabulated energy and force values   
keyword $=$ section identifier to select a specific table in table file   
cutoff $=$ distance from wall at which wall-particle interactions are cut off (distance units)  

• zero or more keyword/value pairs may be appended • keyword $=$ units or fld or pbc  

units value $=$ lattice or box lattice $=$ the wall position is defined in lattice units box $=$ the wall position is defined in simulation box units   
fld value $=$ yes or no  

yes $=$ invoke the wall constraint to be compatible with implicit FLD no = invoke the wall constraint in the normal way pbc value = yes or no yes $=$ allow periodic boundary in a wall dimension no $=$ require non-perioidic boundaries in any wall dimension  

# 2.255.2 Examples  

fix wallhi all wall/lj93 xlo -1.0 1.0 1.0 2.5 units box   
fix wallhi all wall/lj93 xhi EDGE 1.0 1.0 2.5   
fix wallhi all wall/harmonic xhi EDGE 100.0 0.0 4.0 units box   
fix wallhi all wall/morse xhi EDGE 1.0 1.0 1.0 2.5 units box   
fix wallhi all wall/lj126 v_wiggle 23.2 1.0 1.0 2.5   
fix zwalls all wall/colloid zlo 0.0 1.0 1.0 0.858 zhi 40.0 1.0 1.0 0.858   
fix xwall mobile wall/table spline 200 EDGE -5.0 walltab.dat HARMONIC 4.0   
fix xwalls mobile wall/lepton xlo -5.0 "k\*(r-rc)^2;k=100.0" 4.0 xhi 5.0 "k\*(r-rc)^2;k=100.0" 4.0  

# 2.255.3 Description  

Bound the simulation domain on one or more of its faces with a flat wall that interacts with the atoms in the group by generating a force on the atom in a direction perpendicular to the wall. The energy of wall-particle interactions depends on the style.  

For style wall/lj93, the energy $\mathrm{E}$ is given by the 9-3 Lennard-Jones potential:  

$$
E=\varepsilon\left[\frac{2}{15}\left(\frac{\sigma}{r}\right)^{9}-\left(\frac{\sigma}{r}\right)^{3}\right]\qquadr<r_{c}
$$  

For style wall/lj126, the energy $\mathrm{\bfE}$ is given by the 12-6 Lennard-Jones potential:  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<r_{c}
$$  

For style wall/lj1043, the energy $\mathrm{\bfE}$ is given by the 10-4-3 Lennard-Jones potential:  

$$
E=2\pi\varepsilon\left[\frac{2}{5}\left(\frac{\sigma}{r}\right)^{10}-\left(\frac{\sigma}{r}\right)^{4}-\frac{\sqrt(2)\sigma^{3}}{3\left(r+\left(0.61/\sqrt(2)\right)\sigma\right)^{3}}\right]\qquadr<r_{c}
$$  

For style wall/colloid, the energy $\mathrm{\bfE}$ is given by an integrated form of the pair_style colloid potential:  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\varepsilon\left[{\frac{\sigma^{6}}{7560}}\left({\frac{6R-D}{D^{7}}}+{\frac{D+8R}{(D+2R)^{7}}}\right)\right.}}\ {{\displaystyle\left.-{\frac{1}{6}}\left({\frac{2R(D+R)+D(D+2R)[\ln D-\ln(D+2R)]}{D(D+2R)}}\right)\right]\qquadr<r_{c}}}\end{array}
$$  

For style wall/harmonic, the energy $\mathrm{\bfE}$ is given by a repulsive-only harmonic spring potential:  

$$
\begin{array}{r}{E=\varepsilon\quad(r-r_{c})^{2}\qquadr<r_{c}}\end{array}
$$  

For style wall/morse, the energy $\mathrm{E}$ is given by a Morse potential:  

$$
E=D_{0}\left[e^{-2\alpha(r-r_{0})}-2e^{-\alpha(r-r_{0})}\right]r<r_{c}
$$  

Added in version 28Mar2023.  

For style wall/lepton, the energy E is provided as an Lepton expression string using “r” as the distance variable. The Lepton library, that the wall/lepton style interfaces with, evaluates this expression string at run time to compute the wall-particle energy. It also creates an analytical representation of the first derivative of this expression with respect to “r” and then uses that to compute the force between the wall and atoms in the fix group. The Lepton expression must be either enclosed in quotes or must not contain any whitespace so that LAMMPS recognizes it as a single keyword.  

Optionally, the expression may use “rc” to refer to the cutoff distance for the given wall. Further constants in the expression can be defined in the same string as additional expressions separated by semicolons. The expression $\mathrm{{}^{66}k^{*}}(\mathrm{r}-$ $\mathrm{rc})^{\wedge}2;\mathrm{k}{=}100.0^{\ '}$ represents a repulsive-only harmonic spring as in fix wall/harmonic with a force constant $K$ (same as $\varepsilon$ above) of 100 energy units. More details on the Lepton expression strings are given below.  

Added in version $28\mathbf{Mar}2023$ .  

For style wall/table, the energy E and forces are determined from interpolation tables listed in one or more files as a function of distance. The interpolation tables are used to evaluate energy and forces between particles and the wall similar to how analytic formulas are used for the other wall styles.  

The interpolation tables are created as a pre-computation by fitting cubic splines to the file values and interpolating energy and force values at each of $N$ distances. During a simulation, the tables are used to interpolate energy and force values as needed for each wall and particle separated by a distance $R$ . The interpolation is done in one of two styles: linear or spline.  

For the linear style, the distance $R$ is used to find the 2 surrounding table values from which an energy or force is computed by linear interpolation.  

For the spline style, cubic spline coefficients are computed and stored for each of the $N$ values in the table, one set of splines for energy, another for force. Note that these splines are different than the ones used to pre-compute the $N$ values. Those splines were fit to the Nfile values in the tabulated file, where often $N f l e<N.$ . The distance $R$ is used to find the appropriate set of spline coefficients which are used to evaluate a cubic polynomial which computes the energy or force.  

For each wall a filename and a keyword must be provided as in the examples above. The filename specifies a file containing tabulated energy and force values. The keyword specifies a section of the file. The format of this file is described below.  

In all cases, $r$ is the distance from the particle to the wall at position coord, and $r_{c}$ is the cutoff distance at which the particle and wall no longer interact. The energy of the wall potential is shifted so that the wall-particle interaction energy is 0.0 at the cutoff distance.  

Up to 6 walls or faces can be specified in a single command: xlo, xhi, ylo, yhi, zlo, zhi. A lo face interacts with particles near the lower side of the simulation box in that dimension. A hi face interacts with particles near the upper side of the simulation box in that dimension.  

The position of each wall can be specified in one of 3 ways: as the EDGE of the simulation box, as a constant value, or as a variable. If EDGE is used, then the corresponding boundary of the current simulation box is used. If a numeric constant is specified then the wall is placed at that position in the appropriate dimension (x, y, or z). In both the EDGE and constant cases, the wall will never move. If the wall position is a variable, it should be specified as v_name, where name is an equal-style variable name. In this case the variable is evaluated each timestep and the result becomes the current position of the reflecting wall. Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent wall position. See examples below.  

For the wall/lj93 and wall/lj126 and wall/lj1043 styles, $\varepsilon$ and $\sigma$ are the usual Lennard-Jones parameters, which determine the strength and size of the particle as it interacts with the wall. Epsilon has energy units. Note that this $\varepsilon$ and $\sigma$ may be different than any $\varepsilon$ or $\sigma$ values defined for a pair style that computes particle-particle interactions.  

The wall/lj93 interaction is derived by integrating over a 3d half-lattice of Lennard-Jones 12/6 particles. The wall/lj126 interaction is effectively a harder, more repulsive wall interaction. The wall/lj1043 interaction is yet a different form of wall interaction, described in Magda et al in (Magda).  

For the wall/colloid style, $R$ is the radius of the colloid particle, $D$ is the distance from the surface of the colloid particle to the wall (r-R), and $\sigma$ is the size of a constituent LJ particle inside the colloid particle and wall. Note that the cutoff distance Rc in this case is the distance from the colloid particle center to the wall. The prefactor $\varepsilon$ can be thought of as an effective Hamaker constant with energy units for the strength of the colloid-wall interaction. More specifically, the $\varepsilon$ prefactor is $4\pi^{2}\rho_{w a l l}\rho_{c o l l o i d}\varepsilon\sigma^{6}$ , where $\varepsilon$ and $\sigma$ are the LJ parameters for the constituent LJ particles. $\rho_{w a l l}$ and $\rho_{c o l l o i d}$ are the number density of the constituent particles, in the wall and colloid respectively, in units of 1/volume.  

The wall/colloid interaction is derived by integrating over constituent LJ particles of size $\sigma$ within the colloid particle and a 3d half-lattice of Lennard-Jones 12/6 particles of size $\sigma$ in the wall. As mentioned in the preceding paragraph, the density of particles in the wall and colloid can be different, as specified by the $\varepsilon$ prefactor.  

For the wall/harmonic style, $\varepsilon$ is effectively the spring constant K, and has units (energy/distance $\wedge_{2}$ ). The input parameter $\sigma$ is ignored. The minimum energy position of the harmonic spring is at the cutoff. This is a repulsive-only spring since the interaction is truncated at the cutoff  

For the wall/morse style, the three parameters are in this order: $D_{0}$ the depth of the potential, $\alpha$ the width parameter, and $r_{0}$ the location of the minimum. $D_{0}$ has energy units, $\alpha$ inverse distance units, and $r_{0}$ distance units.  

For any wall that supports them, the $\varepsilon$ and/or $\sigma$ and/or $\alpha$ parameter can be specified as an equal-style variable, in which case it should be specified as v_name, where name is the variable name. As with a variable wall position, the variable is evaluated each timestep and the result becomes the current epsilon or sigma of the wall. Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent wall interaction.  

# Note  

For all of the styles, you must ensure that r is always $>0$ for all particles in the group, or LAMMPS will generate an error. This means you cannot start your simulation with particles at the wall position coord $(\mathbf{r}=0,$ ) or with particles on the wrong side of the wall $\left(\mathrm{r}<0\right)$ . For the wall/lj93 and wall/lj126 styles, the energy of the wall/particle interaction (and hence the force on the particle) blows up as $\mathrm{\Deltar\rightarrow0}$ . The wall/colloid style is even more restrictive, since the energy blows up as $\mathrm{D}=\mathrm{r}{-\mathrm{R}}\to0$ . This means the finite-size particles of radius R must be a distance larger than R from the wall position coord. The harmonic style is a softer potential and does not blow up as $\mathrm{~r~}{\rightarrow}0$ , but you must use a large enough $\varepsilon$ that particles always reamin on the correct side of the wall $(\mathrm{r}>0)$ .  

The units keyword determines the meaning of the distance units used to define a wall position, but only when a numeric constant or variable is used. It is not relevant when EDGE is used to specify a face position. In the variable case, the variable is assumed to produce a value compatible with the units setting you specify.  

A box value selects standard distance units as defined by the units command, e.g. Angstroms for units $=$ real or metal. A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacings.  

The fld keyword can be used with a yes setting to invoke the wall constraint before pairwise interactions are computed. This allows an implicit FLD model using pair_style lubricateU to include the wall force in its calculations. If the setting is $n o$ , wall forces are imposed after pairwise interactions, in the usual manner.  

The pbc keyword can be used with a yes setting to allow walls to be specified in a periodic dimension. See the boundary command for options on simulation box boundaries. The default for pbc is no, which means the system must be nonperiodic when using a wall. But you may wish to use a periodic box. E.g. to allow some particles to interact with the wall via the fix group-ID, and others to pass through it and wrap around a periodic box. In this case you should ensure that the wall is sufficiently far enough away from the box boundary. If you do not, then particles may interact with both the wall and with periodic images on the other side of the box, which is probably not what you want.  

Here are examples of variable definitions that move the wall position in a time-dependent fashion using equal-style variables. The wall interaction parameters (epsilon, sigma) could be varied with additional variable definitions.  

<html><body><table><tr><td>variable ramp equal ramp(0,10)</td><td></td></tr><tr><td>fix 1 all wall xlo v_ramp 1.0 1.0 2.5</td><td></td></tr><tr><td>variable linear equal vdisplace(0,20)</td><td></td></tr><tr><td>fix 1 all wall xlo v linear 1.0 1.0 2.5</td><td></td></tr><tr><td></td><td></td></tr><tr><td>variable wiggle equal swiggle(0.0,5.0,3.0)</td><td></td></tr><tr><td>fix 1 all wall xlo v_wiggle 1.0 1.0 2.5</td><td></td></tr><tr><td></td><td></td></tr><tr><td>variable wiggle equal cwiggle(0.0,5.0,3.0)</td><td></td></tr><tr><td>fix 1 all wall xlo v_wiggle 1.0 1.0 2.5</td><td></td></tr></table></body></html>  

The ramp(lo,hi) function adjusts the wall position linearly from $l o$ to $h i$ over the course of a run. The vdisplace(c0,velocity) function does something similar using the equation position $=c O+$ velocity\*delta, where delta is the elapsed time.  

The swiggle(c0,A,period) function causes the wall position to oscillate sinusoidally according to this equation, where $o m e g a=2$ PI / period:  

$$
\mathrm{position=c0+Asin(omega^{*}d e l t a)}
$$  

The cwiggle(c0,A,period) function causes the wall position to oscillate sinusoidally according to this equation, which will have an initial wall velocity of 0.0, and thus may impose a gentler perturbation on the particles:  

$$
\mathrm{position=c0+A\left(1-cos(omega^{*}d e l t a)\right)}
$$  

# 2.255.4 Lepton expression syntax and features  

Lepton supports the following operators in expressions:  

<html><body><table><tr><td>+ Add Subtract *</td><td>Multiply / Divide Power</td></tr></table></body></html>  

The following mathematical functions are available:  

<html><body><table><tr><td>sqrt(x)</td><td>Square root</td><td>exp(x)</td><td>Exponential</td></tr><tr><td>log(x)</td><td>Natural logarithm</td><td>sin(x)</td><td>Sine (angle in radians)</td></tr><tr><td>cos(x)</td><td>Cosine (angle in radians)</td><td>sec(x)</td><td>Secant (angle in radians)</td></tr><tr><td>csc(x)</td><td>Cosecant (angle in radians)</td><td>tan(x)</td><td>Tangent (angle in radians)</td></tr><tr><td>cot(x)</td><td>Cotangent (angle in radians)</td><td>asin(x)</td><td>Inverse sine (in radians)</td></tr><tr><td>acos(x)</td><td>Inverse cosine (in radians)</td><td>atan(x)</td><td>Inverse tangent (in radians)</td></tr><tr><td>sinh(x)</td><td>Hyperbolic sine</td><td>cosh(x)</td><td>Hyperbolic cosine</td></tr><tr><td>tanh(x)</td><td>Hyperbolic tangent</td><td>erf(x)</td><td>Errorfunction</td></tr><tr><td>erfc(x)</td><td>Complementary Error function</td><td>abs(x)</td><td>Absolutevalue</td></tr><tr><td>min(x,y)</td><td>Minimumoftwovalues</td><td>max(x,y)</td><td>Maximumoftwovalues</td></tr><tr><td>delta(x)</td><td>delta(x) is 1 for x = 0, otherwise 0</td><td>step(x)</td><td>step(x) is 0 for x < 0, otherwise 1</td></tr></table></body></html>  

Numbers may be given in either decimal or exponential form. All of the following are valid numbers: 5, -3.1, 1e6, and $3.l2e{-}2$ .  

As an extension to the standard Lepton syntax, it is also possible to use LAMMPS variables in the format “v_name”. Before evaluating the expression, “v_name” will be replaced with the value of the variable “name”. This is compatible with all kinds of scalar variables, but not with vectors, arrays, local, or per-atom variables. If necessary, a custom scalar variable needs to be defined that can access the desired (single) item from a non-scalar variable. As an example, the following lines will instruct LAMMPS to ramp the force constant for a harmonic bond from 100.0 to 200.0 during the next run:  

<html><body><table><tr><td>variable fconst equal ramp(100.0, 200)</td><td></td><td></td></tr><tr><td>bond style</td><td></td></tr><tr><td>bond coeff 11.5 "vf fconst</td><td>* (r~2)"</td></tr></table></body></html>  

An expression may be followed by definitions for intermediate values that appear in the expression. A semicolon “;” is used as a delimiter between value definitions. For example, the expression:  

<html><body><table><tr><td>a~2+a*b+b~2;a=a1+a2;b=b1+b2</td></tr></table></body></html>  

is exactly equivalent to  

<html><body><table><tr><td>7 (29+19)+(9+19)*(2+1)+7<(7+1)</td></tr></table></body></html>  

The definition of an intermediate value may itself involve other intermediate values. Whitespace and quotation characters (’'’ and ‘”’) are ignored. All uses of a value must appear before that value’s definition. For efficiency reasons, the expression string is parsed, optimized, and then stored in an internal, pre-parsed representation for evaluation.  

Evaluating a Lepton expression is typically between 2.5 and 5 times slower than the corresponding compiled and optimized $\mathrm{C}{+}{+}$ code. If additional speed or GPU acceleration (via GPU or KOKKOS) is required, the interaction can be represented as a table. Suitable table files can be created either internally using the pair_write or bond_write command or through the Python scripts in the tools/tabulate folder.  

# 2.255.5 Table file format  

Suitable tables for use with fix wall/table can be created by the Python code in the tools/tabulate folder of the LAMMPS source code distribution.  

The format of a tabulated file is as follows (without the parenthesized comments):  

<html><body><table><tr><td colspan="2"># Tabulated wall potential UNITS: real</td></tr><tr><td>HARMONIC</td><td>(keyword is the first text on a line)</td></tr><tr><td>N100FP200200</td><td></td></tr><tr><td>(blank line)</td><td></td></tr><tr><td>1 0.04 1568.16 792.00</td><td>(index, distance to wall, energy, force)</td></tr><tr><td>2 0.08 1536.64</td><td>784.00</td></tr><tr><td>3 0.12 1505.44</td><td>776.00</td></tr><tr><td></td><td></td></tr><tr><td>993.96 0.16</td><td>8.00</td></tr><tr><td>1004.00 0</td><td></td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The line can contain additional text, but the initial text must match the argument specified in the fix wall/table command. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

The parameter “N” is required and its value is the number of table entries that follow. Note that this may be different than the $N$ specified in the fix wall/table command. Let Ntable $=N$ in the fix command, and $\mathrm{{Nfile={^{\mathrm{\infty}}N^{\mathrm{,\gamma}}}}}$ in the tabulated file. What LAMMPS does is a preliminary interpolation by creating splines using the Nfile tabulated values as nodal points. It uses these to interpolate as needed to generate energy and force values at Ntable different points. The resulting tables of length Ntable are then used as described above, when computing energy and force for wall-particle interactions. This means that if you want the interpolation tables of length Ntable to match exactly what is in the tabulated file (with effectively no preliminary interpolation), you should set Ntable $=$ Nfile.  

# 2.255.6 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the energy of interaction between atoms and all the specified walls to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no.  

The fix_modify virial option is supported by this fix to add the contribution due to the interaction between atoms and all the specified walls to both the global pressure and per-atom stress of the system via the compute pressure and compute stress/atom commands. The former can be accessed by thermodynamic output. The default setting for this fix is fix_modify virial no.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is adding its forces. Default is the outermost level.  

This fix computes a global scalar energy and a global vector of forces, which can be accessed by various output commands. Note that the scalar energy is the sum of interactions with all defined walls. If you want the energy on a per-wall basis, you need to use multiple fix wall commands. The length of the vector is equal to the number of walls defined by the fix. Each vector value is the normal force on a specific wall. Note that an outward force on a wall will be a negative value for lo walls and a positive value for hi walls. The scalar and vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

# Note  

If you want the atom/wall interaction energy to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for this fix.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.255.7 Restrictions  

Fix wall/lepton is part of the LEPTON package and only enabled if LAMMPS was built with this package. See the Build package page for more info.  

# 2.255.8 Related commands  

fix wall/reflect, fix wall/gran, fix wall/region  

# 2.255.9 Default  

The option defaults units $=$ lattice, fld $=$ no, and pbc $=$ no.  

(Magda) Magda, Tirrell, Davis, J Chem Phys, 83, 1888-1901 (1985); erratum in JCP 84, 2901 (1986).  

# 2.256 fix wall/body/polygon command  

# 2.256.1 Syntax  

fix ID group-ID wall/body/polygon k_n c_n c_t wallstyle args keyword values ...  

• ID, group-ID are documented in fix command   
• wall/body/polygon $=$ style name of this fix command   
• $\mathbf{k}\_\mathbf{n}=$ normal repulsion strength (force/distance or pressure units)   
• $\mathrm{~c~}_{-}\mathrm{n}=$ normal damping coefficient (force/distance or pressure units)   
• $\mathrm{~c~}_{-}\mathrm{~t~}=$ tangential damping coefficient (force/distance or pressure units)   
• wallstyle $=$ xplane or yplane or zcylinder   
• args $=$ list of arguments for a particular style xplane or yplane args $=10$ hi lo,hi $=$ position of lower and upper plane (distance units), either can be NULL) zcylinder args $=$ radius radius $=$ cylinder radius (distance units)   
• zero or more keyword/value pairs may be appended to args   
• keyword $=$ wiggle wiggle value $\mathrm{s}=\mathrm{dim}$ amplitude period $\mathrm{{dim}=x}$ or y or z amplitude $=$ size of oscillation (distance units) period $=$ time of oscillation (time units)  

# 2.256.2 Examples  

fix 1 all wall/body/polygon 1000.0 20.0 5.0 xplane -10.0 10.0  

# 2.256.3 Description  

This fix is for use with 2d models of body particles of style rounded/polygon. It bounds the simulation domain with wall(s). All particles in the group interact with the wall when they are close enough to touch it. The nature of the interaction between the wall and the polygon particles is the same as that between the polygon particles themselves, which is similar to a Hookean potential. See the Howto body page for more details on using body particles.  

The parameters $k\_n$ , $c\_n$ , c_t have the same meaning and units as those specified with the pair_style body/rounded/polygon command.  

The wallstyle can be planar or cylindrical. The 2 planar options specify a pair of walls in a dimension. Wall positions are given by lo and $h i$ . Either of the values can be specified as NULL if a single wall is desired. For a zcylinder wallstyle, the cylinder’s axis is at $\mathbf{\sigma}_{\mathbf{X}}=\mathbf{y}=0.0$ , and the radius of the cylinder is specified.  

Optionally, the wall can be moving, if the wiggle keyword is appended.  

For the wiggle keyword, the wall oscillates sinusoidally, similar to the oscillations of particles which can be specified by the fix move command. This is useful in packing simulations of particles. The arguments to the wiggle keyword specify a dimension for the motion, as well as it’s amplitude and period. Note that if the dimension is in the plane of the wall, this is effectively a shearing motion. If the dimension is perpendicular to the wall, it is more of a shaking motion. A zcylinder wall can only be wiggled in the z dimension.  

Each timestep, the position of a wiggled wall in the appropriate dim is set according to this equation:  

position $=$ coord + A - A cos (omega \* delta)  

where coord is the specified initial position of the wall, $A$ is the amplitude, omega is 2 PI / period, and delta is the time elapsed since the fix was specified. The velocity of the wall is set to the derivative of this expression.  

# 2.256.4 Restart, fix_modify, output, run start/stop, minimize info  

None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.256.5 Restrictions  

This fix is part of the BODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Any dimension (xy) that has a wall must be non-periodic.  

# 2.256.6 Related commands  

atom_style body, pair_style body/rounded/polygon  

# 2.256.7 Default  

none  

# 2.257 fix wall/body/polyhedron command  

# 2.257.1 Syntax  

fix ID group-ID wall/body/polyhedron k_n c_n c_t wallstyle args keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• wall/body/polyhedron $=$ style name of this fix command   
• $\mathbf{k}\_\mathbf{n}=$ normal repulsion strength (force/distance units or pressure units - see discussion below)   
• $\mathrm{~c~}_{-}\mathrm{n}=$ normal damping coefficient (force/distance units or pressure units - see discussion below)   
• $\mathrm{~c~}_{-}\mathrm{~t~}=$ tangential damping coefficient (force/distance units or pressure units - see discussion below)   
• wallstyle $=$ xplane or yplane or zplane   
• args $=$ list of arguments for a particular style  

xplane or yplane or zplane args $=10$ hi lo,hi $=$ position of lower and upper plane (distance units), either can be NULL)  

• zero or more keyword/value pairs may be appended to args  

• keyword $=$ wiggle  

wiggle values $=\mathrm{dim}$ amplitude period $\mathrm{{dim}=x}$ or y or z amplitude $=$ size of oscillation (distance units) period $=$ time of oscillation (time units)  

# 2.257.2 Examples  

fix 1 all wall/body/polyhedron 1000.0 20.0 5.0 xplane -10.0 10.0  

# 2.257.3 Description  

This fix is for use with 3d models of body particles of style rounded/polyhedron. It bounds the simulation domain with wall(s). All particles in the group interact with the wall when they are close enough to touch it. The nature of the interaction between the wall and the polygon particles is the same as that between the polygon particles themselves, which is similar to a Hookean potential. See the Howto body page for more details on using body particles.  

The parameters $k\_n$ , $c\_n$ , $c_{-}t$ have the same meaning and units as those specified with the pair_style body/rounded/polyhedron command.  

The wallstyle can be planar or cylindrical. The 3 planar options specify a pair of walls in a dimension. Wall positions are given by $l o$ and $h i$ . Either of the values can be specified as NULL if a single wall is desired.  

Optionally, the wall can be moving, if the wiggle keyword is appended.  

For the wiggle keyword, the wall oscillates sinusoidally, similar to the oscillations of particles which can be specified by the $f\boldsymbol{a}\boldsymbol{x}$ move command. This is useful in packing simulations of particles. The arguments to the wiggle keyword specify a dimension for the motion, as well as it’s amplitude and period. Note that if the dimension is in the plane of the wall, this is effectively a shearing motion. If the dimension is perpendicular to the wall, it is more of a shaking motion.  

Each timestep, the position of a wiggled wall in the appropriate dim is set according to this equation:  

position $=$ coord + A - A cos (omega \* delta)  

where coord is the specified initial position of the wall, $A$ is the amplitude, omega is 2 PI / period, and delta is the time elapsed since the fix was specified. The velocity of the wall is set to the derivative of this expression.  

# 2.257.4 Restart, fix_modify, output, run start/stop, minimize info  

None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.257.5 Restrictions  

This fix is part of the BODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Any dimension (xyz) that has a wall must be non-periodic.  

# 2.257.6 Related commands  

atom_style body, pair_style body/rounded/polyhedron  

# 2.257.7 Default  

none  

2.258 fix wall/ees command  

# 2.259 fix wall/region/ees command  

# 2.259.1 Syntax  

fix ID group-ID style args • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • style $=$ wall/ees or wall/region/ees  

args for style wall/ees: one or more face parameters groups may be appended   
$\mathrm{face}=\mathrm{xlo}$ or xhi or ylo or yhi or zlo or zhi   
parameters $=$ coord epsilon sigma cutoff   
coord $=$ position of $\mathrm{wall}=\mathrm{EDGE}$ or constant or variable EDGE $=$ current lo or hi edge of simulation box constant $=$ number like 0.0 or -30.0 (distance units) variable = equal-style variable like v_x or v_wiggle epsilon = strength factor for wall-particle interaction (energy or energy/distance $\widehat{\mathbf{\xi}}^{\star}2$ units) epsilon can be a variable (see below) sigma = size factor for wall-particle interaction (distance units) sigma can be a variable (see below) cutoff = distance from wall at which wall-particle interaction is cut off (distance units)   
args for style wall/region/ees: region-ID epsilon sigma cutoff   
region-ID = region whose boundary will act as wall epsilon = strength factor for wall-particle interaction (energy or energy/distance^2 units) sigma = size factor for wall-particle interaction (distance units) cutoff = distance from wall at which wall-particle interaction is cut off (distance units)  

# 2.259.2 Examples  

fix wallhi all wall/ees xlo -1.0 1.0 1.0 2.5 units box fix wallhi all wall/ees xhi EDGE 1.0 1.0 2.5 fix wallhi all wall/ees v_wiggle 23.2 1.0 1.0 2.5 fix zwalls all wall/ees zlo 0.0 1.0 1.0 0.858 zhi 40.0 1.0 1.0 0.858 fix ees_cube all wall/region/ees myCube 1.0 1.0 2.5  

# 2.259.3 Description  

Fix wall/ees bounds the simulation domain on one or more of its faces with a flat wall that interacts with the ellipsoidal atoms in the group by generating a force on the atom in a direction perpendicular to the wall and a torque parallel with  

the wall. The energy of wall-particle interactions $\mathrm{\bfE}$ is given by:  

$$
E=\varepsilon\left[\frac{2\sigma_{L J}^{12}\left(7r^{5}+14r^{3}\sigma_{n}^{2}+3r\sigma_{n}^{4}\right)}{945\left(r^{2}-\sigma_{n}^{2}\right)^{7}}-\frac{\sigma_{L J}^{6}\left(2r\sigma_{n}^{3}+\sigma_{n}^{2}\left(r^{2}-\sigma_{n}^{2}\right)\log{\left[\frac{r-\sigma_{n}}{r+\sigma_{n}}\right]}\right)}{12\sigma_{n}^{5}\left(r^{2}-\sigma_{n}^{2}\right)}\right]\qquad\sigma_{n}<r<r_{c}
$$  

Introduced by Babadi and Ejtehadi in (Babadi2). Here, $r$ is the distance from the particle to the wall at position coord, and $\mathtt{R c}$ is the cutoff distance at which the particle and wall no longer interact. Also, $\sigma_{n}$ is the distance between center of ellipsoid and the nearest point of its surface to the wall as shown below.  

![](images/62fbf5bc18ffa209d8af8fdefccaf6a754a21d5be3184102e10dcb1d58a03814.jpg)  

Details of using this command and specifications are the same as fix/wall command. You can also find an example in USER/ees/ under examples/ directory.  

The prefactor $\varepsilon$ can be thought of as an effective Hamaker constant with energy units for the strength of the ellipsoidwall interaction. More specifically, the ε prefactor is  

$$
8\pi^{2}\quad\rho_{w a l l}\quad\rho_{e l l i p s o i d}\quad\varepsilon\quad\sigma_{a}\quad\sigma_{b}\quad\sigma_{c}
$$  

where $\varepsilon$ is the LJ energy parameter for the constituent LJ particles and $\sigma_{a},\sigma_{b}$ , and $\sigma_{c}$ are the radii of the ellipsoidal particles. $\rho_{w a l l}$ and ρellipsoid are the number density of the constituent particles, in the wall and ellipsoid respectively, in units of 1/volume.  

![](images/ebff11247926d68c667ead87ba62a96873e80916a68fc569ecbaa71ddb6c5b1b.jpg)  

# Note  

You must ensure that r is always bigger than $\sigma_{n}$ for all particles in the group, or LAMMPS will generate an error. This means you cannot start your simulation with particles touching the wall position coord $(r=\sigma_{n})$ ) or with particles penetrating the wall ( $0=<r<\sigma_{n}$ ) or with particles on the wrong side of the wall $(r<0)$ ).  

Fix wall/region/ees treats the surface of the geometric region defined by the region- $\cdot I D$ as a bounding wall which interacts with nearby ellipsoidal particles according to the EES potential introduced above.  

Other details of this command are the same as for the fix wall/region command. One may also find an example of using this fix in the examples/PACKAGES/ees/ directory.  

# 2.259.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about these fixes are written to binary restart files.  

The fix_modify energy option is supported by these fixes to add the energy of interaction between atoms and all the specified walls or region wall to the global potential energy of the system as part of thermodynamic output. The default settings for these fixes are fix_modify energy no.  

The fix_modify respa option is supported by these fixes. This allows to set at which level of the $r$ -RESPA integrator the fix is adding its forces. Default is the outermost level.  

These fixes computes a global scalar and a global vector of forces, which can be accessed by various output commands.   
See the fix wall command for a description of the scalar and vector.  

No parameter of these fixes can be used with the start/stop keywords of the run command.  

The forces due to these fixes are imposed during an energy minimization, invoked by the minimize command.  

![](images/904e33e6bb18988cb1bc643c6c3172bf6cd138ef3a9f4c3213ed1d0a2da58f9d.jpg)  

# Note  

If you want the atom/wall interaction energy to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for this fix.  

# 2.259.5 Restrictions  

These fixes are part of the EXTRA-FIX package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

These fixes requires that atoms be ellipsoids as defined by the atom_style ellipsoid command.  

# 2.259.6 Related commands  

fix wall, pair resquared  

# 2.259.7 Default  

• seed $=$ random seed for stochasticity (positive integer)  

• $\Nu=$ number of walls  

• coords $=$ list of N wall positions along the axis direction in ascending order (distance units)  

• zero or more keyword/value pairs may be appended  

• keyword $=$ units  

units value $=$ lattice or box lattice $=$ wall positions are defined in lattice units box $=$ the wall positions are defined in simulation box units  

# 2.260.2 Examples  

fix 1 all wall/flow x 0.4 1.5 593894 4 2.0 4.0 6.0 8.0  

# 2.260.3 Description  

Added in version 17Apr2024.  

This fix implements flow boundary conditions (FBC) introduced in (Pavlov1) and (Pavlov2). The goal is to generate a stationary flow with a shifted Maxwell velocity distribution:  

$$
f_{a}(\nu_{a})\propto\exp{\left(-\frac{m(\nu_{a}-\nu_{\mathrm{flow}})^{2}}{2k B T}\right)}
$$  

where $\nu_{a}$ is the component of velocity along the specified axis argument $\mathbf{\sigma}_{\mathrm{a}}=\mathbf{x},\mathbf{y},\mathbf{z}$ ), $\nu_{\mathrm{{flow}}}$ is the flow velocity specified as the vflow argument, $T$ is the specified flow temperature, $m$ is the particle mass, and $k B$ is the Boltzmann constant.  

This is achieved by defining a series of $N$ transparent walls along the flow axis direction. Each wall is at the specified position listed in the coords argument. Note that an additional transparent wall is defined by the code at the boundary of the (periodic) simulation domain in the axis direction. So there are effectively $_{\mathrm{N}+1}$ walls.  

Each time a particle in the specified group passes through one of the transparent walls, its velocity is re-assigned. Particles not in the group do not interact with the wall. This can be used, for example, to add obstacles composed of atoms, or to simulate a solution of complex molecules in a one-atom liquid (note that the fix has been tested for one-atom systems only).  

Conceptually, the velocity re-assignment represents creation of a new particle within the system with simultaneous removal of the particle which passed through the wall. The velocity components in directions parallel to the wall are re-assigned according to the standard Maxwell velocity distribution for the specified temperature $T.$ The velocity component perpendicular to the wall is re-assigned according to the shifted Maxwell distribution defined above:  

$$
f_{\mathrm{agenerated}}(\nu_{a})\propto\nu_{a}f_{a}(\nu_{a})
$$  

It can be shown that for an ideal-gas scenario this procedure makes the velocity distribution of particles between walls exactly as desired.  

Since in most cases simulated systems are not an ideal gas, multiple walls can be defined, since a single wall may not be sufficient for maintaining a stationary flow without “congestion” which can manifest itself as regions in the flow with increased particle density located upstream from static obstacles.  

For the same reason, the actual temperature and velocity of the generated flow may differ from what is requested. The degree of discrepancy is determined by how different from an ideal gas the simulated system is. Therefore, a calibration procedure may be required for such a system as described in (Pavlov).  

Note that the interactions between particles on different sides of a transparent wall are not disabled or neglected. Likewise particle positions are not altered by the velocity reassignment. This removes the need to modify the force field to work correctly in cases when a particle is close to a wall.  

For example, if particle positions were uniformly redistributed across the surface of a wall, two particles could end up too close to each other, potentially causing the simulation to explode. However due to this compromise, some collective phenomena such as regions with increased/decreased density or collective movements are not fully removed when particles cross a wall. This unwanted consequence can also be potentially mitigated by using more multiple walls.  

![](images/ab0ef674b2a59f2762fd2332d22b9cd5f5ba5ae8c029308f6fde9127884b56b2.jpg)  

# Note  

When the specified flow has a high velocity, a lost atoms error can occur (see error messages). If this happens, you should ensure the checks for neighbor list rebuilds, set via the neigh_modify command, are as conservative as possible (every timestep if needed). Those are the default settings.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.260.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

None of the fix_modify options are relevant to this fix.  

No global or per-atom quantities are stored by this fix for access by various output commands.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is not invoked during energy minimization.  

# 2.260.5 Restrictions  

Fix wall_flow is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Flow boundary conditions should not be used with rigid bodies such as those defined by a “fix rigid” command.  

This fix can only be used with periodic boundary conditions along the flow axis. The size of the box in this direction must not change. Also, the fix is designed to work only in an orthogonal simulation box.  

# 2.260.6 Related commands  

fix wall/reflect command  

# 2.260.7 Default  

The default for the units keyword is lattice.  

(Pavlov1) Pavlov, Kolotinskii, Stegailov, “GPU-Based Molecular Dynamics of Turbulent Liquid Flows with OpenMM”, Proceedings of PPAM-2022, LNCS (Springer), vol. 13826, pp. 346-358 (2023)  

(Pavlov2) Pavlov, Galigerov, Kolotinskii, Nikolskiy, Stegailov, “GPU-based Molecular Dynamics of Fluid Flows: Reaching for Turbulence”, Int. J. High Perf. Comp. Appl., (2024)  

# 2.261 fix wall/gran command  

Accelerator Variants: wall/gran/kk  

# 2.261.1 Syntax  

fix ID group-ID wall/gran fstyle fstyle_params wallstyle args keyword values ...  

• ID, group-ID are documented in fix command • wall/gran $=$ style name of this fix command • fstyle $=$ style of force interactions between particles and wall possible choices: hooke, hooke/history, hertz/history, granular • fstyle_params $=$ parameters associated with force interaction style  

For hooke, hooke/history, and hertz/history, fstyle_params are: $\mathrm{Kn}=$ elastic constant for normal particle repulsion (force/distance units or pressure units - see␣   
$\hookrightarrow$ discussion below) Kt = elastic constant for tangential contact (force/distance units or pressure units - see␣   
$\hookrightarrow$ discussion below) gamma_n = damping coefficient for collisions in normal direction (1/time units or 1/   
$\hookrightarrow$ time-distance units - see discussion below) gamma_t = damping coefficient for collisions in tangential direction (1/time units or 1/   
$\hookrightarrow$ time-distance units - see discussion below) xmu = static yield criterion (unitless value between 0.0 and 1.0e4) dampflag $=0$ or 1 if tangential damping force is excluded or included optional keyword $=$ limit_damping, limit damping to prevent attractive interaction  

For granular, fstyle_params are set using the same syntax as for the pair_coeff command of pair_ $-$ $\hookrightarrow$ style granular  

• wallstyle $=$ xplane or yplane or zplane or zcylinder • args $=$ list of arguments for a particular style  

xplane or yplane or zplane $\mathrm{args}=\mathrm{lo}$ hi   
lo,hi $=$ position of lower and upper plane (distance units), either can be NULL)   
zcylinder args $=$ radius   
radius $=$ cylinder radius (distance units)  

• zero or more keyword/value pairs may be appended to args • keyword $=$ wiggle or shear or contacts or temperature  

wiggle values = dim amplitude period $\mathrm{{dim}=x}$ or y or z amplitude = size of oscillation (distance units) period = time of oscillation (time units)   
shear values = dim vshear $\mathrm{{dim}=x}$ or y or z vshear $-$ magnitude of shear velocity (velocity units)   
contacts value = none generate contact information for each particle   
temperature value $=$ temperature specify temperature of wall  

# 2.261.2 Examples  

fix 1 all wall/gran hooke 200000.0 NULL 50.0 NULL 0.5 0 xplane -10.0 10.0   
fix 1 all wall/gran hooke/history 200000.0 NULL 50.0 NULL 0.5 0 zplane 0.0 NULL   
fix 2 all wall/gran hooke 100000.0 20000.0 50.0 30.0 0.5 1 zcylinder 15.0 wiggle z 3.0 2.0   
fix 3 all wall/gran granular hooke 1000.0 50.0 tangential linear_nohistory 1.0 0.4 damping velocity region␣ $\hookrightarrow$ myBox   
fix 4 all wall/gran granular jkr 1e5 1500.0 0.3 10.0 tangential mindlin NULL 1.0 0.5 rolling sds 500.0 200. $\rightarrow0~0.5$ twisting marshall region myCone   
fix 5 all wall/gran granular dmt 1e5 0.2 0.3 10.0 tangential mindlin NULL 1.0 0.5 rolling sds 500.0 200.0 0. ${}\hookrightarrow{}5$ twisting marshall damping tsuji heat 10 region myCone temperature 1.0   
fix 6 all wall/gran hooke 200000.0 NULL 50.0 NULL 0.5 0 xplane -10.0 10.0 contacts  

# 2.261.3 Description  

Bound the simulation domain of a granular system with a frictional wall. All particles in the group interact with the wall when they are close enough to touch it.  

The nature of the wall/particle interactions are determined by the fstyle setting. It can be any of the styles defined by the pair_style gran/\* or the more general pair_style granular commands. Currently the options are hooke, hooke/history, or hertz/history for the former, and granular with all the possible options of the associated pair_coeff command for the latter. The equation for the force between the wall and particles touching it is the same as the corresponding equation on the pair_style gran/\* and pair_style granular doc pages, in the limit of one of the two particles going to infinite radius and mass (flat wall). Specifically, delta $=$ radius - $\boldsymbol{\mathrm{r}}=$ overlap of particle with wall, m_ef $=$ mass of particle, and the effective radius of contact $=\mathrm{RiRj/Ri{+}R j}$ is set to the radius of the particle.  

The parameters $K n,K t$ , gamma_n, gamma_t, xmu, dampflag, and the optional keyword limit_damping have the same meaning and units as those specified with the pair_style gran/\* commands. This means a NULL can be used for either $K t$ or gamma_t as described on that page. If a NULL is used for $K t$ , then a default value is used where $K t=2/7K n$ . If a NULL is used for gamma_t, then a default value is used where gamma_ $t=1/2$ gamma_n.  

All the model choices for cohesion, tangential friction, rolling friction and twisting friction supported by the pair_style granular through its pair_coeff command are also supported for walls. These are discussed in greater detail on the doc page for pair_style granular.  

# $\Theta$ Note  

When fstyle granular is specified, the associated fstyle_params are taken as those for a wall/particle interaction. For example, for the hertz/material normal contact model with $E=960$ and $\nu=0.2$ , the effective Young’s modulus for a wall/particle interaction is computed as $\begin{array}{r}{E_{e f f}=\frac{960}{2(1-0.2^{2})}=500}\end{array}$ . Any pair coefficients defined by pair_style granular are not taken into consideration. To model different wall/particle interactions for particles of different material types, the user may define multiple fix wall/gran commands operating on separate groups (e.g. based on particle type) each with a different wall/particle effective Young’s modulus.  

Note that you can choose a different force styles and/or different values for the wall/particle coefficients than for particle/particle interactions. E.g. if you wish to model the wall as a different material.  

![](images/800988b109980e5fe34fee770a01e645ed585b997b5241a0ca08b88e7d2c9699.jpg)  

# Note  

As discussed on the page for pair_style gran/\*, versions of LAMMPS before 9Jan09 used a different equation for Hertzian interactions. This means Hertizian wall/particle interactions have also changed. They now include a sqrt(radius) term which was not present before. Also the previous versions used Kn and Kt from the pairwise interaction and hardwired dampflag to 1, rather than letting them be specified directly. This means you can set the values of the wall/particle coefficients appropriately in the current code to reproduce the results of a previous Hertzian monodisperse calculation. For example, for the common case of a monodisperse system with particles of diameter 1, Kn, Kt, gamma_n, and gamma_s should be set sqrt(2.0) larger than they were previously.  

The effective mass $m\_e f f$ in the formulas listed on the pair_style granular page is the mass of the particle for particle/wall interactions (mass of wall is infinite). If the particle is part of a rigid body, its mass is replaced by the mass of the rigid body in those formulas. This is determined by searching for a fix rigid command (or its variants).  

The wallstyle can be planar or cylindrical. The 3 planar options specify a pair of walls in a dimension. Wall positions are given by lo and $h i$ . Either of the values can be specified as NULL if a single wall is desired. For a zcylinder wallstyle, the cylinder’s axis is at $\mathbf{\sigma}_{\mathbf{X}}=\mathbf{y}=0.0$ , and the radius of the cylinder is specified.  

Optionally, the wall can be moving, if the wiggle or shear keywords are appended. Both keywords cannot be used together.  

For the wiggle keyword, the wall oscillates sinusoidally, similar to the oscillations of particles which can be specified by the fix move command. This is useful in packing simulations of granular particles. The arguments to the wiggle keyword specify a dimension for the motion, as well as it’s amplitude and period. Note that if the dimension is in the plane of the wall, this is effectively a shearing motion. If the dimension is perpendicular to the wall, it is more of a shaking motion. A zcylinder wall can only be wiggled in the z dimension.  

Each timestep, the position of a wiggled wall in the appropriate dim is set according to this equation:  

position $=$ coord + A - A cos (omega \* delta)  

where coord is the specified initial position of the wall, $A$ is the amplitude, omega is 2 PI / period, and delta is the time elapsed since the fix was specified. The velocity of the wall is set to the derivative of this expression.  

For the shear keyword, the wall moves continuously in the specified dimension with velocity vshear. The dimension must be tangential to walls with a planar wallstyle, e.g. in the $y$ or z directions for an xplane wall. For zcylinder walls, a dimension of $z$ means the cylinder is moving in the $\mathbf{Z}$ -direction along it’s axis. A dimension of $x$ or $y$ means the cylinder is spinning around the $\mathbf{Z}$ -axis, either in the clockwise direction for vshear $>0$ or counter-clockwise for vshear $<0$ . In this case, vshear is the tangential velocity of the wall at whatever radius has been defined.  

The temperature keyword is used to assign a temperature to the wall. The following value can either be a numeric value or an equal-style variable. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the temperature. This option must be used in conjunction with a heat conduction model defined in pair_style granular, fix property/atom to store temperature and a heat flow, and fix heat/flow to integrate heat flow.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.261.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the shear friction state of atoms interacting with the wall to binary restart files, so that a simulation can continue correctly if granular potentials with shear “history” effects are being used. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

If the contacts option is used, this fix generates a per-atom array with at least 8 columns as output, containing the contact information for owned particles (nlocal on each processor). All columns in this per-atom array will be zero if no contact has occurred. The first 8 values of these columns are listed in the following table.  

<html><body><table><tr><td>Index</td><td>Value</td><td>Units</td></tr><tr><td>1</td><td>1.0 if particle is in contact with wall, 0.0 otherwise</td><td></td></tr><tr><td>2</td><td>Force fx exerted by the wall</td><td>forceunits</td></tr><tr><td>3</td><td>Force fy exerted by the wall</td><td>force units</td></tr><tr><td>4</td><td>Force f. exerted by the wall</td><td>force units</td></tr><tr><td>5</td><td>x-coordinate of contact point on wall</td><td>distance units</td></tr><tr><td>6</td><td>y-coordinate of contact point on wall</td><td>distance units</td></tr><tr><td>7</td><td>z-coordinate of contact point on wall</td><td>distance units</td></tr><tr><td>8</td><td>Radiusrofatom</td><td>distanceunits</td></tr></table></body></html>  

If a granular sub-model calculates additional contact information (e.g. the heat sub-models calculate the amount of heat exchanged), these quantities are appended to the end of this array. First, any extra values from the normal sub-model are appended followed by the damping, tangential, rolling, twisting, then heat models. See the descriptions of granular sub-models in the pair granular page for information on any extra quantities.  

None of the fix_modify options are relevant to this fix. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.261.5 Restrictions  

This fix is part of the GRANULAR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Any dimension (xyz) that has a granular wall must be non-periodic.  

# 2.261.6 Related commands  

fix move, fix wall/gran/region, pair_style gran/\* pair_style granular  

# 2.261.7 Default  

none  

# 2.262 fix wall/gran/region command  

# 2.262.1 Syntax  

fix ID group-ID wall/gran/region fstyle fstyle_params wallstyle regionID keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • wall/region $=$ style name of this fix command • fstyle $=$ style of force interactions between particles and wall possible choices: hooke, hooke/history, hertz/history, granular • fstyle_params $=$ parameters associated with force interaction style  

For hooke, hooke/history, and hertz/history, fstyle_params are: $\mathrm{Kn}=$ elastic constant for normal particle repulsion (force/distance units or pressure units - see   
$\hookrightarrow$ discussion below) $\mathrm{Kt}=$ elastic constant for tangential contact (force/distance units or pressure units - see␣   
$\hookrightarrow$ discussion below) gamma_n = damping coefficient for collisions in normal direction (1/time units or 1/   
$\hookrightarrow$ time-distance units - see discussion below) gamma_t = damping coefficient for collisions in tangential direction (1/time units or 1/   
$\hookrightarrow$ time-distance units - see discussion below) xmu = static yield criterion (unitless value between 0.0 and 1.0e4) dampflag = 0 or 1 if tangential damping force is excluded or included  

For granular, fstyle_params are set using the same syntax as for the pair_coeff command of pair_ $-$ ,→style granular  

• wallstyle $=$ region (see fix wall/gran for options for other kinds of walls)   
• region-ID $=$ region whose boundary will act as wall   
• keyword $=$ contacts or temperature contacts value $=$ none generate contact information for each particle temperature value $=$ temperature specify temperature of wall  

# 2.262.2 Examples  

fix wall all wall/gran/region hooke/history 1000.0 200.0 200.0 100.0 0.5 1 region myCone   
fix 3 all wall/gran/region granular hooke 1000.0 50.0 tangential linear_nohistory 1.0 0.4 damping velocity␣ $\hookrightarrow$ region myBox   
fix 4 all wall/gran/region granular jkr 1e5 1500.0 0.3 10.0 tangential mindlin NULL 1.0 0.5 rolling sds 500. ,→0 200.0 0.5 twisting marshall region myCone   
fix 5 all wall/gran/region granular dmt 1e5 0.2 0.3 10.0 tangential mindlin NULL 1.0 0.5 rolling sds 500.0␣ ,→200.0 0.5 twisting marshall damping tsuji region myCone   
fix wall all wall/gran/region hooke/history 1000.0 200.0 200.0 100.0 0.5 1 region myCone contacts  

# 2.262.3 Description  

Treat the surface of the geometric region defined by the region- $\mathbf{\nabla}\cdot I D$ as a bounding frictional wall which interacts with nearby finite-size granular particles when they are close enough to touch the wall. See the fix wall/region and $f\alpha$ wall/gran commands for related kinds of walls for non-granular particles and simpler wall geometries, respectively.  

Here are snapshots of example models using this command. Corresponding input scripts can be found in examples/granregion. Movies of these simulations are here on the Movies page of the LAMMPS website.  

![](images/81e5f56b883236e3617372d3549ab2740df8463d0733e04b5386cd3ddd462194.jpg)  

The distance between a particle and the region boundary is the distance to the nearest point on the region surface. The force the wall exerts on the particle is along the direction between that point and the particle center, which is the direction normal to the surface at that point. Note that if the region surface is comprised of multiple “faces”, then each face can exert a force on the particle if it is close enough. E.g. for region_style block, a particle in the interior, near a corner of the block, could feel wall forces from 1, 2, or 3 faces of the block.  

Regions are defined using the region command. Note that the region volume can be interior or exterior to the bounding surface, which will determine in which direction the surface interacts with particles, i.e. the direction of the surface normal. The exception to this is if one or more open options are specified for the region command, in which case particles interact with both the interior and exterior surfaces of regions.  

Regions can either be primitive shapes (block, sphere, cylinder, etc) or combinations of primitive shapes specified via the union or intersect region styles. These latter styles can be used to construct particle containers with complex shapes.  

Regions can also move dynamically via the region command keywords (move) and rotate, or change their shape by use of variables as inputs to the region command. If such a region is used with this fix, then the region surface will move in time in the corresponding manner.  

# Note  

As discussed on the region command doc page, regions in LAMMPS do not get wrapped across periodic boundaries. It is up to you to ensure that the region location with respect to periodic or non-periodic boundaries is specified appropriately via the region and boundary commands when using a region as a wall that bounds particle motion.  

# Note  

For primitive regions with sharp corners and/or edges (e.g. a block or cylinder), wall/particle forces are computed accurately for both interior and exterior regions. For union and intersect regions, additional sharp corners and edges may be present due to the intersection of the surfaces of 2 or more primitive volumes. These corners and edges can be of two types: concave or convex. Concave points/edges are like the corners of a cube as seen by particles in the interior of a cube. Wall/particle forces around these features are computed correctly. Convex points/edges are like the corners of a cube as seen by particles exterior to the cube, i.e. the points jut into the volume where particles are present. LAMMPS does NOT compute the location of these convex points directly, and hence wall/particle forces in the cutoff volume around these points suffer from inaccuracies. The basic problem is that the outward normal of the surface is not continuous at these points. This can cause particles to feel no force (they don’t “see” the wall) when in one location, then move a distance epsilon, and suddenly feel a large force because they now “see” the wall. In a worst-case scenario, this can blow particles out of the simulation box. Thus, as a general rule you should not use the fix wall/gran/region command with union or interesect regions that have convex points or edges resulting from the union/intersection (convex points/edges in the union/intersection due to a single sub-region are still OK).  

![](images/603aa4263a1138b575dc3a10c0a89f4330b394cd4382017565b4c875c8196e23.jpg)  

# Note  

Similarly, you should not define union or intersert regions for use with this command that share an overlapping common face that is part of the overall outer boundary (interior boundary is OK), even if the face is smooth. E.g. two regions of style block in a union region, where the two blocks overlap on one or more of their faces. This is because LAMMPS discards points that are part of multiple sub-regions when calculating wall/particle interactions, to avoid double-counting the interaction. Having two coincident faces could cause the face to become invisible to the particles. The solution is to make the two faces differ by epsilon in their position.  

The nature of the wall/particle interactions are determined by the fstyle setting. It can be any of the styles defined by the pair_style gran/\* or the more general pair_style granular commands. Currently the options are hooke, hooke/history, or hertz/history for the former, and granular with all the possible options of the associated pair_coeff command for the latter. The equation for the force between the wall and particles touching it is the same as the corresponding equation on the pair_style gran/\* and pair_style granular doc pages, but the effective radius is calculated using the radius of the particle and the radius of curvature of the wall at the contact point.  

Specifically, delta $=$ radius - $\boldsymbol{\mathrm{r}}=$ overlap of particle with wall, $\mathrm{m\_eff}=\mathrm{mass}$ of particle, and $\mathrm{RiRj/Ri{+}R j}$ is the effective radius, with Rj replaced by the radius of curvature of the wall at the contact point. The radius of curvature can be negative for a concave wall section, e.g. the interior of cylinder. For a flat wall, delta $=$ radius $\mathbf{\nabla}-\mathbf{r}=$ overlap of particle with wall, m_ef $=$ mass of particle, and the effective radius of contact is just the radius of the particle.  

The parameters $K n,K t$ , gamma_n, gamma_t, xmu, dampflag, and the optional keyword limit_damping have the same meaning and units as those specified with the pair_style gran/\* commands. This means a NULL can be used for either $K t$ or gamma_ $t$ as described on that page. If a NULL is used for $K t$ , then a default value is used where $K t=2/7K n$ . If a NULL is used for gamma_t, then a default value is used where gamma_ $t=1/2$ gamma_n.  

All the model choices for cohesion, tangential friction, rolling friction and twisting friction supported by the pair_style granular through its pair_coeff command are also supported for walls. These are discussed in greater detail on the doc page for pair_style granular.  

Note that you can choose a different force styles and/or different values for the 6 wall/particle coefficients than for particle/particle interactions. E.g. if you wish to model the wall as a different material.  

The temperature keyword is used to assign a temperature to the wall. The following value can either be a numeric value or an equal-style variable. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the temperature. This option must be used in conjunction with a heat conduction model defined in pair_style granular, fix property/atom to store temperature and a heat flow, and fix heat/flow to integrate heat flow.  

# 2.262.4 Restart, fix_modify, output, run start/stop, minimize info  

Similar to fix wall/gran command, this fix writes the shear friction state of atoms interacting with the wall to binary restart files, so that a simulation can continue correctly if granular potentials with shear “history” effects are being used. This fix also includes info about a moving region in the restart file. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

# Note  

Information about region definitions is NOT included in restart files, as discussed on the read_restart doc page. So you must re-define your region and if it is a moving region, define its motion attributes in a way that is consistent with the simulation that wrote the restart file. In particular, if you want to change the region motion attributes (e.g. its velocity), then you should ensure the position/orientation of the region at the initial restart timestep is the same as it was on the timestep the restart file was written. If this is not possible, you may need to ignore info in the restart file by defining a new fix wall/gran/region command in your restart script, e.g. with a different fix ID. Or if you want to keep the shear history info but discard the region motion information, you can use the same fix ID for fix wall/gran/region, but assign it a region with a different region ID.  

If the contacts option is used, this fix generates a per-atom array with at least 8 columns as output, containing the contact information for owned particles (nlocal on each processor). All columns in this per-atom array will be zero if no contact has occurred. The first 8 values of these columns are listed in the following table.  

<html><body><table><tr><td>Index</td><td>Value</td><td>Units</td></tr><tr><td>1</td><td>1.0 if particle is in contact with wall, 0.0 otherwise</td><td></td></tr><tr><td>2</td><td>Forcefx exerted by the wall</td><td>forceunits</td></tr><tr><td>3</td><td>Force fy exerted by the wall</td><td>force units</td></tr><tr><td>4</td><td>Force f. exerted by the wall</td><td>force units</td></tr><tr><td>5</td><td>x-coordinate of contact point on wall</td><td>distanceunits</td></tr><tr><td>6</td><td>y-coordinate of contact point on wall</td><td>distance units</td></tr><tr><td>7</td><td>z-coordinate of contact point on wall</td><td>distance units</td></tr><tr><td>8</td><td>Radiusrof atom</td><td>distanceunits</td></tr></table></body></html>  

If a granular sub-model calculates additional contact information (e.g. the heat sub-models calculate the amount of heat exchanged), these quantities are appended to the end of this array. First, any extra values from the normal sub-model are appended followed by the damping, tangential, rolling, twisting, then heat models. See the descriptions of granular sub-models in the pair granular page for information on any extra quantities.  

None of the fix_modify options are relevant to this fix. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.262.5 Restrictions  

This fix is part of the GRANULAR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.262.6 Related commands  

fix_move, fix wall/gran, fix wall/region, pair_style granular, region  

# 2.262.7 Default  

none  

# 2.263 fix wall/piston command  

# 2.263.1 Syntax  

fix ID group-ID wall/piston face ... keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• wall/piston $=$ style name of this fix command   
• face $=z l o$   
• zero or more keyword/value pairs may be appended   
• keyword $=p o s$ or vel or ramp or temp or units pos $\mathrm{args}=\mathbf{z}$ ${\bf Z}={\bf Z}$ coordinate at which the piston begins (distance units) vel $\mathrm{args}=\mathrm{vz}$ $\mathrm{vz}={}$ final velocity of the piston (velocity units) ramp $=$ use a linear velocity ramp from 0 to vz temp args $=$ target damp seed extent target $=$ target velocity for region immediately ahead of the piston damp $=$ damping parameter (time units) seed = random number seed for langevin kicks extent = extent of thermostatted region (distance units) units value = lattice or box lattice = the wall position is defined in lattice units box $=$ the wall position is defined in simulation box units  

# 2.263.2 Examples  

fix xwalls all wall/piston zlo fix walls all wall/piston zlo pos 1.0 vel 10.0 units box fix top all wall/piston zlo vel 10.0 ramp  

# 2.263.3 Description  

Bound the simulation with a moving wall which reflect particles in the specified group and drive the system with an effective infinite-mass piston capable of driving shock waves.  

A momentum mirror technique is used, which means that if an atom (or the wall) moves such that an atom is outside the wall on a timestep by a distance delta (e.g. due to $f(x n\nu e)$ , then it is put back inside the face by the same delta, and the velocity relative to the moving wall is flipped in z. For instance, a stationary particle hit with a piston wall with velocity vz, will end the timestep with a velocity of $2^{*}\mathbf{V}\mathbf{Z}$ .  

Currently the face keyword can only be zlo. This creates a piston moving in the positive z direction. Particles with z coordinate less than the wall position are reflected to a z coordinate greater than the wall position. If the piston velocity is vpz and the particle velocity before reflection is vzi, the particle velocity after reflection is -v $\mathbf{\zeta}^{\prime}\mathbf{Z}\mathbf{i}+2^{*}\mathbf{v}\mathbf{p}\mathbf{z}$ .  

The initial position of the wall can be specified by the pos keyword.  

The final velocity of the wall can be specified by the vel keyword  

The ramp keyword will cause the wall/piston to adjust the velocity linearly from zero velocity to vel over the course of the run. If the ramp keyword is omitted then the wall/piston moves at a constant velocity defined by vel.  

The temp keyword will cause the region immediately in front of the wall/piston to be thermostatted with a Langevin thermostat. This region moves with the piston. The damping and kicking are measured in the reference frame of the piston. So, a temperature of zero would mean all particles were moving at exactly the speed of the wall/piston.  

The units keyword determines the meaning of the distance units used to define a wall position, but only when a numeric constant is used.  

A box value selects standard distance units as defined by the units command, e.g. Angstroms for units $=$ real or metal. A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacings.  

# 2.263.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.263.5 Restrictions  

This fix style is part of the SHOCK package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The face that has the wall/piston must be boundary type ‘s’ (shrink-wrapped). The opposing face can be any boundary type other than periodic.  

A wall/piston should not be used with rigid bodies such as those defined by a “fix rigid” command. This is because the wall/piston displaces atoms directly rather than exerting a force on them.  

# 2.263.6 Related commands  

fix wall/reflect command, fix append/atoms command  

# 2.263.7 Default  

The keyword defaults are $\mathrm{pos}=0$ , vel $=0$ , units $=$ lattice.  

# 2.264 fix wall/reflect command  

Accelerator Variants: wall/reflect/kk  

# 2.264.1 Syntax  

fix ID group-ID wall/reflect face arg ... keyword value ...  

• ID, group-ID are documented in fix command • wall/reflect $=$ style name of this fix command • one or more face/arg pairs may be appended • face $=x l o$ or xhi or ylo or yhi or zlo or zhi  

# 2.264. fix wall/reflect command  

$\mathrm{arg}=\mathrm{EDGE}$ or constant or variable EDGE $=$ current lo edge of simulation box constant $=$ number like 0.0 or 30.0 (distance units) variable $=$ equal-style variable like v_x or v_wiggle • zero or more keyword/value pairs may be appended  

• keyword $=$ units  

units value $=$ lattice or box lattice $=$ the wall position is defined in lattice units box $=$ the wall position is defined in simulation box units  

# 2.264.2 Examples  

fix xwalls all wall/reflect xlo EDGE xhi EDGE fix walls all wall/reflect xlo 0.0 ylo 10.0 units box fix top all wall/reflect zhi v_pressdown  

# 2.264.3 Description  

Bound the simulation with one or more walls which reflect particles in the specified group when they attempt to move through them.  

Reflection means that if an atom moves outside the wall on a timestep by a distance delta (e.g. due to $f(x n\nu e)$ , then it is put back inside the face by the same delta, and the sign of the corresponding component of its velocity is flipped.  

When used in conjunction with fix nve and run_style verlet, the resultant time-integration algorithm is equivalent to the primitive splitting algorithm (PSA) described by Bond. Because each reflection event divides the corresponding timestep asymmetrically, energy conservation is only satisfied to O(dt), rather than to $\mathrm{O}(\mathrm{dt}^{\wedge}2)$ as it would be for velocityVerlet integration without reflective walls.  

Up to 6 walls or faces can be specified in a single command: xlo, xhi, ylo, yhi, zlo, zhi. A lo face reflects particles that move to a coordinate less than the wall position, back in the hi direction. A hi face reflects particles that move to a coordinate higher than the wall position, back in the lo direction.  

The position of each wall can be specified in one of 3 ways: as the EDGE of the simulation box, as a constant value, or as a variable. If EDGE is used, then the corresponding boundary of the current simulation box is used. If a numeric constant is specified then the wall is placed at that position in the appropriate dimension (x, y, or z). In both the EDGE and constant cases, the wall will never move. If the wall position is a variable, it should be specified as v_name, where name is an equal-style variable name. In this case the variable is evaluated each timestep and the result becomes the current position of the reflecting wall. Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent wall position.  

The units keyword determines the meaning of the distance units used to define a wall position, but only when a numeric constant or variable is used. It is not relevant when EDGE is used to specify a face position. In the variable case, the variable is assumed to produce a value compatible with the units setting you specify.  

A box value selects standard distance units as defined by the units command, e.g. Angstroms for units $=$ real or metal. A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacings.  

Here are examples of variable definitions that move the wall position in a time-dependent fashion using equal-style variables.  

<html><body><table><tr><td>variable ramp equal ramp(0,10)</td></tr><tr><td>fix 1 all wall/reflect xlo v_ramp</td></tr><tr><td></td></tr><tr><td>variable linear equal vdisplace(0,20)</td></tr><tr><td>fix l all wall/reflect xlo v linear</td></tr><tr><td></td></tr><tr><td>variable wiggle equal swiggle(0.0,5.0,3.0)</td></tr><tr><td>fix 1 all wall/reflect xlo v_wiggle</td></tr><tr><td>variable wiggle equal cwiggle(0.0,5.0,3.0)</td></tr><tr><td>fix 1 all wall/refect xlo v_wiggle</td></tr></table></body></html>  

The ramp(lo,hi) function adjusts the wall position linearly from $l o$ to $h i$ over the course of a run. The vdisplace( $c0,$ ,velocity) function does something similar using the equation position $=c O+$ velocity\*delta, where delta is the elapsed time.  

The swiggle(c0,A,period) function causes the wall position to oscillate sinusoidally according to this equation, where $o m e g a=2$ PI / period:  

$$
\mathrm{position=c0+Asin(omega^{*}d e l t a)}
$$  

The cwiggle(c0,A,period) function causes the wall position to oscillate sinusoidally according to this equation, which will have an initial wall velocity of 0.0, and thus may impose a gentler perturbation on the particles:  

$$
\mathrm{position=c0+A\left(1-cos(omega^{*}d e l t a)\right)}
$$  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.264.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.264.5 Restrictions  

Any dimension (xyz) that has a reflecting wall must be non-periodic.  

A reflecting wall should not be used with rigid bodies such as those defined by a “fix rigid” command. This is because the wall/reflect displaces atoms directly rather than exerts a force on them. For rigid bodies, use a soft wall instead, such as fix wall/lj93. LAMMPS will flag the use of a rigid fix with fix wall/reflect with a warning, but will not generate an error.  

# 2.264.6 Related commands  

fix wall/lj93, fix oneway  

# 2.264.7 Default  

The default for the units keyword is lattice.  

(Bond) Bond and Leimkuhler, SIAM J Sci Comput, 30, p 134 (2007).  

# 2.265 fix wall/reflect/stochastic command  

# 2.265.1 Syntax  

fix ID group-ID wall/reflect/stochastic rstyle seed face args ... keyword value ...  

• ID, group-ID are documented in fix command • wall/reflect/stochastic $=$ style name of this fix command rstyle $=$ diffusive or maxwell or ccl • seed $=$ random seed for stochasticity (positive integer) • one or more face/args pairs may be appended • face $=x l o$ or xhi or ylo or yhi or zlo or zhi  

$\mathrm{args}=\mathrm{pos}$ temp velx vely velz accomx accomy accomz   
$\mathrm{pos}=\mathrm{EDGE}$ or constant $\mathrm{EDGE}=\mathrm{~.~}$ current lo or hi edge of simulation box constant $=$ number like 0.0 or 30.0 (distance units) temp = wall temperature (temperature units) velx,vely,velz $=$ wall velocity in x,y,z directions (velocity units)   
accomx,accomy,accomz $=$ accommodation coeffs in x,y,z directions (unitless) not specified for rstyle $=$ diffusive single accom coeff specified for rstyle maxwell all 3 coeffs specified for rstyle cll  

• zero or more keyword/value pairs may be appended  

• keyword $=$ units  

units value $=$ lattice or box lattice $=$ the wall position is defined in lattice units box $=$ the wall position is defined in simulation box units  

# 2.265.2 Examples  

fix zwalls all wall/reflect/stochastic diffusive 23424 zlo EDGE 300 0.1 0.1 0 zhi EDGE 200 0.1 0.1 0 fix ywalls all wall/reflect/stochastic maxwell 345533 ylo 5.0 300 0.1 0.0 0.0 0.8 yhi 10.0 300 0.1 0.0 0.0 0.8 fix xwalls all wall/reflect/stochastic cercignanilampis 2308 xlo 0.0 300 0.0 0.1 0.9 0.8 0.7 xhi EDGE 300 0. ,→0 0.1 0 0.9 0.8 0.7 units box  

# 2.265.3 Description  

Bound the simulation with one or more walls which reflect particles in the specified group when they attempt to move through them.  

Reflection means that if an atom moves outside the wall on a timestep (e.g. due to the fix nve command), then it is put back inside the wall with a changed velocity.  

This fix models treats the wall as a moving solid boundary with a finite temperature, which can exchange energy with particles that collide with it. This is different than the simpler fix wall/reflect command which models mirror reflection. For this fix, the post collision velocity of each particle is treated stochastically. The randomness can come from many sources: thermal motion of the wall atoms, surface roughness, etc. Three stochastic reflection models are currently implemented.  

For rstyle diffusive, particles are reflected diffusively. Their velocity distribution corresponds to an equilibrium distribution of particles at the wall temperature. No accommodation coefficients are specified.  

For rstyle maxwell, particle reflection is Maxwellian which means partially diffusive and partially specular (Maxwell). A single accommodation coeff is specified which must be between 0.0 and 1.0 inclusive. It determines the fraction of the collision which is diffusive versus specular. An accommodation coefficient of 1.0 is fully diffusive; a coefficient of 0.0 is fully specular.  

For rstyle cll, particle collisions are computed by the Cercignani/Lampis model. See $C L$ and $T o$ for details. Three accommodations coefficient are specified. Each must be between 0.0 and 1.0 inclusive. Two are velocity accommodation coefficients; one is a normal kinetic energy accommodation. The normal coeff is the one corresponding to the normal of the wall itself. For example if the wall is ylo or yhi, accomx and accomz are the tangential velocity accommodation coefficients, and accomy is the normal kinetic energy accommodation coefficient.  

The optional units keyword determines the distance units used to define a wall position. A box value selects standard distance units as defined by the units command, e.g. Angstroms for units $=$ real or metal. A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacings.  

# 2.265.4 Restrictions  

This fix has the same limitations as the fix wall/reflect command. Any dimension (xyz) that has a wall must be nonperiodic. It should not be used with rigid bodies such as those defined by the fix rigid command. The wall velocity must lie on the same plane as the wall itself.  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.265.5 Related commands  

fix wall/reflect  

# 2.265.6 Default  

The default for the units keyword is lattice.  

(Maxwell) J.C. Maxwell, Philos. Tans. Royal Soc. London, 157: 49-88 (1867).   
(Cercignani) C. Cercignani and M. Lampis. Trans. Theory Stat. Phys. 1, 2, 101 (1971).   
(To) Q.D. To, V.H. Vu, G. Lauriat, and C. Leonard. J. Math. Phys. 56, 103101 (2015).  

# 2.266 fix wall/region command  

Accelerator Variants: wall/region/kk  

# 2.266.1 Syntax  

fix ID group-ID wall/region region-ID style args ... cutoff  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• wall/region $=$ style name of this fix command   
• region-ID $=$ region whose boundary will act as wall   
• style $=l j93$ or lj126 or lj1043 or colloid or harmonic or morse   
• args for styles $l j93$ or lj126 or lj1043 or colloid or harmonic $=$ epsilon $=$ strength factor for wall-particle interaction (energy or energy/distance^2 units) sigma $=$ size factor for wall-particle interaction (distance units)  

• args for style morse $=$  

D_0 = depth of the potential (energy units)   
alpha $=$ width parameter (1/distance units)   
r_0 = distance of the potential minimum from wall position (distance units)  

• cutof $=$ distance from wall at which wall-particle interaction is cut off (distance units)  

# 2.266.2 Examples  

<html><body><table><tr><td>fix wall all wall region mySphere lj93 1.0 1.0 2.5</td></tr><tr><td>fix wall all wall region mySphere harmonic 1.0 0.0 2.5</td></tr><tr><td>fix wall all wall region box_top morse 1.0 1.0 1.5 3.0</td></tr><tr><td></td></tr></table></body></html>  

# 2.266.3 Description  

Treat the surface of the geometric region defined by the region- $\cdot I D$ as a bounding wall which interacts with nearby particles according to the specified style.  

The distance between a particle and the surface is the distance to the nearest point on the surface and the force the wall exerts on the particle is along the direction between that point and the particle, which is the direction normal to the surface at that point. Note that if the region surface is comprised of multiple “faces”, then each face can exert a force on the particle if it is close enough. E.g. for region_style block, a particle in the interior, near a corner of the block, could feel wall forces from 1, 2, or 3 faces of the block.  

Regions are defined using the region command. Note that the region volume can be interior or exterior to the bounding surface, which will determine in which direction the surface interacts with particles, i.e. the direction of the surface normal. The surface of the region only exerts forces on particles “inside” the region; if a particle is “outside” the region it will generate an error, because it has moved through the wall.  

Regions can either be primitive shapes (block, sphere, cylinder, etc) or combinations of primitive shapes specified via the union or intersect region styles. These latter styles can be used to construct particle containers with complex shapes. Regions can also change over time via the region command keywords (move) and rotate. If such a region is used with this fix, then the of region surface will move over time in the corresponding manner.  

![](images/228757b12f738ec6f2c1ffc3ef82d7c0270e0c11aa9c7059696701a3b58ff7a9.jpg)  

# Note  

As discussed on the region command doc page, regions in LAMMPS do not get wrapped across periodic boundaries. It is up to you to ensure that periodic or non-periodic boundaries are specified appropriately via the boundary command when using a region as a wall that bounds particle motion. This also means that if you embed a region in your simulation box and want it to repulse particles from its surface (using the “side out” option in the region command), that its repulsive force will not be felt across a periodic boundary.  

![](images/47af4d188ef5b54f74a01e2a16bcb4ed281dd9aa41865cfde34e4a5441501e39.jpg)  

# Note  

For primitive regions with sharp corners and/or edges (e.g. a block or cylinder), wall/particle forces are computed accurately for both interior and exterior regions. For union and intersect regions, additional sharp corners and edges may be present due to the intersection of the surfaces of 2 or more primitive volumes. These corners and edges can be of two types: concave or convex. Concave points/edges are like the corners of a cube as seen by particles in the interior of a cube. Wall/particle forces around these features are computed correctly. Convex points/edges are like the corners of a cube as seen by particles exterior to the cube, i.e. the points jut into the volume where particles are present. LAMMPS does NOT compute the location of these convex points directly, and hence wall/particle forces in the cutoff volume around these points suffer from inaccuracies. The basic problem is that the outward normal of the surface is not continuous at these points. This can cause particles to feel no force (they don’t “see” the wall) when in one location, then move a distance epsilon, and suddenly feel a large force because they now “see” the wall. In a worst-case scenario, this can blow particles out of the simulation box. Thus, as a general rule you should not use the fix wall/gran/region command with union or interesect regions that have convex points or edges resulting from the union/intersection (convex points/edges in the union/intersection due to a single sub-region are still OK).  

# Note  

Similarly, you should not define union or intersert regions for use with this command that share an overlapping common face that is part of the overall outer boundary (interior boundary is OK), even if the face is smooth. E.g. two regions of style block in a union region, where the two blocks overlap on one or more of their faces. This is because LAMMPS discards points that are part of multiple sub-regions when calculating wall/particle interactions, to avoid double-counting the interaction. Having two coincident faces could cause the face to become invisible to the particles. The solution is to make the two faces differ by epsilon in their position.  

The energy of wall-particle interactions depends on the specified style.  

For style $l j93$ , the energy $\mathrm{E}$ is given by the $9/3$ potential:  

$$
E=\varepsilon\left[\frac{2}{15}\left(\frac{\sigma}{r}\right)^{9}-\left(\frac{\sigma}{r}\right)^{3}\right]\qquadr<r_{c}
$$  

For style lj126, the energy $\mathrm{E}$ is given by the 12/6 potential:  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<r_{c}
$$  

For style wall/lj1043, the energy $\mathrm{\bfE}$ is given by the $10/4/3$ potential:  

$$
E=2\pi\varepsilon\left[\frac{2}{5}\left(\frac{\sigma}{r}\right)^{10}-\left(\frac{\sigma}{r}\right)^{4}-\frac{\sqrt(2)\sigma^{3}}{3\left(r+\left(0.61/\sqrt(2)\right)\sigma\right)^{3}}\right]\qquadr<r_{c}
$$  

For style colloid, the energy $\mathrm{E}$ is given by an integrated form of the pair_style colloid potential:  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\varepsilon\left[\frac{\sigma^{6}}{7560}\left(\frac{6R-D}{D^{7}}+\frac{D+8R}{(D+2R)^{7}}\right)\right.}}\ {{\displaystyle\left.-\frac{1}{6}\left(\frac{2R(D+R)+D(D+2R)[\ln D-\ln(D+2R)]}{D(D+2R)}\right)\right]\qquadr<r_{c}}}\end{array}
$$  

For style wall/harmonic, the energy $\mathrm{\bfE}$ is given by a harmonic spring potential (the distance parameter is ignored):  

$$
\begin{array}{r}{E=\varepsilon\quad(r-r_{c})^{2}\qquadr<r_{c}}\end{array}
$$  

For style wall/morse, the energy $\mathrm{E}$ is given by the Morse potential:  

$$
E=D_{0}\left[e^{-2\alpha(r-r_{0})}-2e^{-\alpha(r-r_{0})}\right]r<r_{c}
$$  

Unlike other styles, this requires three parameters $(D_{0},\alpha$ , and $r_{0}$ in this order) instead of two like for the other wall styles.  

In all cases, $r$ is the distance from the particle to the region surface, and $\mathtt{R c}$ is the cutoff distance at which the particle and surface no longer interact. The cutoff is always the last argument. The energy of the wall potential is shifted so that the wall-particle interaction energy is 0.0 at the cutoff distance.  

For a full description of these wall styles, see fix_style wall  

# 2.266.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the energy of interaction between atoms and the region wall to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no.  

The fix_modify virial option is supported by this fix to add the contribution due to the interaction between atoms and the region wall to both the global pressure and per-atom stress of the system via the compute pressure and compute stress/atom commands. The former can be accessed by thermodynamic output. The default setting for this fix is fix_modify virial no.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is adding its forces. Default is the outermost level.  

This fix computes a global scalar energy and a global 3-length vector of forces, which can be accessed by various output commands. The scalar energy is the sum of energy interactions for all particles interacting with the wall represented by the region surface. The 3 vector quantities are the x,y,z components of the total force acting on the wall due to the particles. The scalar and vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

![](images/b76fe247712ade902774875270d67cc3b29001943b1387de9ae7713a7af5caed.jpg)  

# Note  

If you want the atom/wall interaction energy to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for this fix.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages  

page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.266.5 Restrictions  

none  

# 2.266.6 Related commands  

fix wall/lj93, fix wall/lj126, fix wall/lj1043, fix wall/colloid, fix wall/harmonic, fix wall/gran  

# 2.266.7 Default  

none  

# 2.267 fix wall/srd command  

# 2.267.1 Syntax  

fix ID group-ID wall/srd face arg ... keyword value ...  

• ID, group-ID are documented in fix command   
• wall/srd $=$ style name of this fix command   
• one or more face/arg pairs may be appended   
• face $=x l o$ or xhi or ylo or yhi or zlo or zhi xlo,ylo,zlo $\mathrm{arg}=\mathrm{EDGE}$ or constant or variable $\mathrm{EDGE}={\mathrm{~}}$ current lo edge of simulation box constant $=$ number like 0.0 or -30.0 (distance units) variable $=$ equal-style variable like $\mathrm{~v~\_~x~}$ or v_wiggle xhi,yhi,zhi $\mathrm{arg}=\mathrm{EDGE}$ or constant or variable $\mathrm{EDGE=}$ current hi edge of simulation box constant $=$ number like 50.0 or 100.3 (distance units) variable $=$ equal-style variable like $\mathrm{~v~\_~x~}$ or v_wiggle   
• zero or more keyword/value pairs may be appended   
• keyword $=$ units units value $=$ lattice or box lattice $=$ the wall position is defined in lattice units box $=$ the wall position is defined in simulation box units  

# 2.267.2 Examples  

fix xwalls all wall/srd xlo EDGE xhi EDGE fix walls all wall/srd xlo 0.0 ylo 10.0 units box fix top all wall/srd zhi v_pressdown  

# 2.267.3 Description  

Bound the simulation with one or more walls which interact with stochastic reaction dynamics (SRD) particles as slip (smooth) or no-slip (rough) flat surfaces. The wall interaction is actually invoked via the fix srd command, only on the group of SRD particles it defines, so the group setting for the fix wall/srd command is ignored.  

A particle/wall collision occurs if an SRD particle moves outside the wall on a timestep. This alters the position and velocity of the SRD particle and imparts a force to the wall.  

The collision and Tsrd settings specified via the fix srd command affect the SRD/wall collisions. A slip setting for the collision keyword means that the tangential component of the SRD particle momentum is preserved. Thus only a normal force is imparted to the wall. The normal component of the new SRD velocity is sampled from a Gaussian distribution at temperature Tsrd.  

For a noslip setting of the collision keyword, both the normal and tangential components of the new SRD velocity are sampled from a Gaussian distribution at temperature Tsrd. Additionally, a new tangential direction for the SRD velocity is chosen randomly. This collision style imparts both a normal and tangential force to the wall.  

Up to 6 walls or faces can be specified in a single command: xlo, xhi, ylo, yhi, zlo, zhi. A lo face reflects particles that move to a coordinate less than the wall position, back in the hi direction. A hi face reflects particles that move to a coordinate higher than the wall position, back in the lo direction.  

The position of each wall can be specified in one of 3 ways: as the EDGE of the simulation box, as a constant value, or as a variable. If EDGE is used, then the corresponding boundary of the current simulation box is used. If a numeric constant is specified then the wall is placed at that position in the appropriate dimension (x, y, or z). In both the EDGE and constant cases, the wall will never move. If the wall position is a variable, it should be specified as v_name, where name is an equal-style variable name. In this case the variable is evaluated each timestep and the result becomes the current position of the reflecting wall. Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent wall position.  

![](images/c78a13660046204c1d70cbde1c8255a66f69b73bd0dcb52d6c5b55b37c906d0b.jpg)  

# Note  

Because the trajectory of the SRD particle is tracked as it collides with the wall, you must ensure that $\mathrm{r}=$ distance of the particle from the wall, is always $>0$ for SRD particles, or LAMMPS will generate an error. This means you cannot start your simulation with SRD particles at the wall position coord $(\mathbf{r}=0,$ ) or with particles on the wrong side of the wall $\left(\mathrm{r}<0\right)$ ).  

![](images/658da89176615d7d5a652aacfd2a817b183d5cdc832a1828d26dab69d315062b.jpg)  

# Note  

If you have 2 or more walls that come together at an edge or corner (e.g. walls in the x and y dimensions), then be sure to set the overlap keyword to yes in the fix srd command, since the walls effectively overlap when SRD particles collide with them. LAMMPS will issue a warning if you do not do this.  

# Note  

The walls of this fix only interact with SRD particles, as defined by the fix srd command. If you are simulating a mixture containing other kinds of particles, then you should typically use another wall command to act on the other particles. Since SRD particles will be colliding both with the walls and the other particles, it is important to ensure that the other particle’s finite extent does not overlap an SRD wall. If you do not do this, you may generate errors when SRD particles end up “inside” another particle or a wall at the beginning of a collision step.  

The units keyword determines the meaning of the distance units used to define a wall position, but only when a numeric constant is used. It is not relevant when EDGE or a variable is used to specify a face position.  

A box value selects standard distance units as defined by the units command, e.g. Angstroms for units $=$ real or metal. A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacings.  

Here are examples of variable definitions that move the wall position in a time-dependent fashion using equal-style variables.  

<html><body><table><tr><td>variable ramp equal ramp(0,10)</td></tr><tr><td>fix 1 all wall/srd xlo v_ramp</td></tr><tr><td>variable linear equal vdisplace(0,20) fix 1 all wall/srd xlo v_linear</td></tr><tr><td>variable wiggle equal swiggle(0.0,5.0,3.0)</td></tr><tr><td>fix 1 all wall/srd xlo v_wiggle</td></tr><tr><td></td></tr><tr><td>variable wiggle equal cwiggle(0.0,5.0,3.0) fix 1 all wall/srd xlo v_wiggle</td></tr></table></body></html>  

The ramp(lo,hi) function adjusts the wall position linearly from $l o$ to hi over the course of a run. The vdisplace(c0,velocity) function does something similar using the equation position $=c O+$ velocity\*delta, where delta is the elapsed time.  

The swiggle(c0,A,period) function causes the wall position to oscillate sinusoidally according to this equation, where o $n e g a=2~P I$ / period:  

$$
\mathrm{position=c0+Asin(omega^{*}d e l t a)}
$$  

The cwiggle(c0,A,period) function causes the wall position to oscillate sinusoidally according to this equation, which will have an initial wall velocity of 0.0, and thus may impose a gentler perturbation on the particles:  

$$
\mathrm{position=c0+A\left(1-cos(omega^{*}d e l t a)\right)}
$$  

# 2.267.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix computes a global array of values which can be accessed by various output commands. The number of rows in the array is equal to the number of walls defined by the fix. The number of columns is 3, for the x,y,z components of force on each wall.  

Note that an outward normal force on a wall will be a negative value for lo walls and a positive value for hi walls. The array values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.267.5 Restrictions  

Any dimension (xyz) that has an SRD wall must be non-periodic.  

# 2.267.6 Related commands  

fix srd  

# 2.267.7 Default  

none  

# 2.268 fix widom command  

# 2.268.1 Syntax  

fix ID group-ID widom N M type seed T keyword values ...  

• ID, group-ID are documented in fix command   
• widom $=$ style name of this fix command   
• $\Nu=$ invoke this fix every N steps   
• $\mathbf{M}=$ number of Widom insertions to attempt every N steps   
• type $=$ atom type (1-Ntypes or type label) for inserted atoms (must be 0 if mol keyword used)   
• seed $=$ random # seed (positive integer)   
• $\mathrm{T}=$ temperature of the system (temperature units)   
• zero or more keyword/value pairs may be appended to args keyword $=\mathrm{mol}$ , region, full_energy, charge, intra_energy mol value $=$ template-ID template- $\mathrm{\cdotID}=\mathrm{ID}$ of molecule template specified in a separate molecule command region value $=$ region-ID region- $\mathrm{{\cdot}I D}=\mathrm{{ID}}$ of region where Widom insertions are allowed full_energy $=$ compute the entire system energy when performing Widom insertions charge value $=$ charge of inserted atoms (charge units) intra_energy value $=$ intramolecular energy (energy units)  

# 2.268.2 Examples  

fix 2 gas widom 1 50000 1 19494 2.0   
fix 3 water widom 1000 100 0 29494 300.0 mol h2omol full_energy   
labelmap atom 1 Li   
fix 2 ion widom 1 50000 Li 19494 2.0  

# 2.268.3 Description  

This fix performs Widom insertions of atoms or molecules at the given temperature as discussed in (Frenkel). Specific uses include computation of Henry constants of small molecules in microporous materials or amorphous systems.  

Every N timesteps the fix attempts M number of Widom insertions of atoms or molecules.  

If the mol keyword is used, only molecule insertions are performed. Conversely, if the mol keyword is not used, only atom insertions are performed.  

This command may optionally use the region keyword to define an insertion volume. The specified region must have been previously defined with a region command. It must be defined with side $=i n$ . Insertion attempts occur only within the specified region. For non-rectangular regions, random trial points are generated within the rectangular bounding box until a point is found that lies inside the region. If no valid point is generated after 1000 trials, no insertion is performed. If an attempted insertion places the atom or molecule center-of-mass outside the specified region, a new attempted insertion is generated. This process is repeated until the atom or molecule center-of-mass is inside the specified region.  

Note that neighbor lists are re-built every timestep that this fix is invoked, so you should not set $\mathbf{N}$ to be too small. See the neighbor command for details.  

When an atom or molecule is to be inserted, its coordinates are chosen at a random position within the current simulation cell or region. Relative coordinates for atoms in a molecule are taken from the template molecule provided by the user. The center of mass of the molecule is placed at the insertion point. The orientation of the molecule is chosen at random by rotating about this point.  

Individual atoms are inserted, unless the mol keyword is used. It specifies a template-ID previously defined using the molecule command, which reads a file that defines the molecule. The coordinates, atom types, charges, etc., as well as any bonding and special neighbor information for the molecule can be specified in the molecule file. See the molecule command for details. The only settings required to be in this file are the coordinates and types of atoms in the molecule.  

Note that fix widom does not use configurational bias MC or any other kind of sampling of intramolecular degrees of freedom. Inserted molecules can have different orientations, but they will all have the same intramolecular configuration, which was specified in the molecule command input.  

For atoms, inserted particles have the specified atom type. For molecules, they use the same atom types as in the template molecule supplied by the user.  

The excess chemical potential mu_ex is defined as:  

$$
\mu_{e x}=-k T\ln(<\exp(-(U_{N+1}-U_{N})/k_{B}T)>)
$$  

where $k_{B}$ is the Boltzmann constant, $T$ is the user-specified temperature, $U_{N}$ and $U_{N+1}$ is the potential energy of the system with $N$ and $N+1$ particles.  

The full_energy option means that the fix calculates the total potential energy of the entire simulated system, instead of just the energy of the part that is changed. By default, this option is off, in which case only partial energies are computed to determine the energy difference due to the proposed change.  

The full_energy option is needed for systems with complicated potential energy calculations, including the following:  

• long-range electrostatics (kspace)   
• many-body pair styles   
• hybrid pair styles   
• eam pair styles   
• tail corrections   
• need to include potential energy contributions from other fixes  

In these cases, LAMMPS will automatically apply the full_energy keyword and issue a warning message.  

When the mol keyword is used, the full_energy option also includes the intramolecular energy of inserted and deleted molecules, whereas this energy is not included when full_energy is not used. If this is not desired, the intra_energy keyword can be used to define an amount of energy that is subtracted from the final energy when a molecule is inserted, and subtracted from the initial energy when a molecule is deleted. For molecules that have a non-zero intramolecular energy, this will ensure roughly the same behavior whether or not the full_energy option is used.  

Some fixes have an associated potential energy. Examples of such fixes include: efield, gravity, addforce, restrain, and wall fixes. For that energy to be included in the total potential energy of the system (the quantity used when performing Widom insertions), you MUST enable the fix_modify energy option for that fix. The doc pages for individual $f\boldsymbol{{x}}$ commands specify if this should be done.  

Use the charge option to insert atoms with a user-specified point charge. Note that doing so will cause the system to become non-neutral. LAMMPS issues a warning when using long-range electrostatics (kspace) with non-neutral systems. See the compute group/group documentation for more details about simulating non-neutral systems with kspace on.  

# 2.268.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the fix to binary restart files. This includes information about the random number generator seed, the next timestep for Widom insertions etc. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

![](images/99438706209133a01b29192d0a8d8ec54c3f584c154b0e9fe33b41b027469cb8.jpg)  

# Note  

For this to work correctly, the timestep must not be changed after reading the restart with reset_timestep. The fix will try to detect it and stop with an error.  

None of the fix_modify options are relevant to this fix.  

This fix computes a global vector of length 3, which can be accessed by various output commands. The vector values are the following global cumulative quantities:  

1. average excess chemical potential on each timestep   
2. average difference in potential energy on each timestep   
3. volume of the insertion region  

The vector values calculated by this fix are “intensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.268.5 Restrictions  

This fix is part of the MC package. It is only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

Do not set “neigh_modify once yes” or else this fix will never be called. Reneighboring is required.  

This fix style requires an atom style with per atom type masses.  

Can be run in parallel, but some aspects of the insertion procedure will not scale well in parallel. Only usable for 3D simulations.  

# 2.268.6 Related commands  

fix gcmc fix atom/swap, neighbor, fix deposit, fix evaporate,  

# 2.268.7 Default  

The option defaults are mol $=$ no, intra_energy $=0.0$ and full_energy $=$ no, except for the situations where full_energy is required, as listed above.  

(Frenkel) Frenkel and Smit, Understanding Molecular Simulation, Academic Press, London, 2002.  

# COMPUTE STYLES  

# 3.1 compute ackland/atom command  

# 3.1.1 Syntax  

compute ID group-ID ackland/atom keyword/value  

• ID, group-ID are documented in compute command   
• ackland/atom $=$ style name of this compute command   
• zero or more keyword/value pairs may be appended   
• keyword $=$ legacy legacy $\mathrm{args}=\mathrm{yes}$ or no $=$ use (yes) or do not use (no) legacy Ackland algorithm implementation  

# 3.1.2 Examples  

<html><body><table><tr><td>compute 1 all ackland/atom</td></tr><tr><td>compute 1 all ackland/ atomlegacyyes</td></tr><tr><td></td></tr></table></body></html>  

# 3.1.3 Description  

Defines a computation that calculates the local lattice structure according to the formulation given in (Ackland). Historically, LAMMPS had two, slightly different implementations of the algorithm from the paper. With the legacy keyword, it is possible to switch between the pre-2015 (legacy yes) and post-2015 implementation (legacy no). The post-2015 variant is the default.  

In contrast to the centro-symmetry parameter this method is stable against temperature boost, because it is based not on the distance between particles but the angles. Therefore statistical fluctuations are averaged out a little more. A comparison with the Common Neighbor Analysis metric is made in the paper.  

The result is a number which is mapped to the following different lattice structures:  

• 0 = UNKNOWN   
• $1=\mathrm{BCC}$   
• $2=\mathrm{FCC}$   
• $3=\mathrm{HCP}$   
• $4=\mathrm{ICO}$  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (i.e. each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently or to have multiple compute/dump commands, each of which computes this quantity.-  

# 3.1.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

# 3.1.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

The per-atom vector values will be unitless since they are the integers defined above.  

# 3.1.6 Related commands  

compute centro/atom  

# 3.1.7 Default  

The keyword legacy defaults to no.  

(Ackland) Ackland, Jones, Phys Rev B, 73, 054104 (2006).  

# 3.2 compute adf command  

# 3.2.1 Syntax  

compute ID group-ID adf Nbin itype1 jtype1 ktype1 Rjinner1 Rjouter1 Rkinner1 Rkouter1 ...  

• ID, group-ID are documented in compute command   
• adf $=$ style name of this compute command   
• Nbin $=$ number of ADF bins   
• itypeN $=$ central atom type for Nth ADF histogram (see asterisk form below)   
• jtypeN $=\mathbf{J}$ atom type for Nth ADF histogram (see asterisk form below)   
• ktypeN $=\mathbf{K}$ atom type for Nth ADF histogram (see asterisk form below)   
• RjinnerN $=$ inner radius of J atom shell for Nth ADF histogram (distance units)   
• RjouterN $=$ outer radius of J atom shell for Nth ADF histogram (distance units)   
• RkinnerN $=$ inner radius of K atom shell for Nth ADF histogram (distance units)   
• RkouterN $=$ outer radius of $\mathbf{K}$ atom shell for Nth ADF histogram (distance units)   
• zero or one keyword/value pairs may be appended   
• keyword $=$ ordinate ordinate value $=$ degree or radian or cosine Choose the ordinate parameter for the histogram  

# 3.2.2 Examples  

<html><body><table><tr><td>compute 1 fuid adf 32 1 1 1 0.0 1.2 0.0 1.2 &</td><td></td></tr><tr><td>1 1 2 0.0 1.20.01.5&</td><td></td></tr><tr><td>1 220.01.50.01.5&</td><td></td></tr><tr><td>2 1 1 0.0 1.2 0.01.2&</td><td></td></tr><tr><td>2 120.0 1.52.03.5&</td><td></td></tr><tr><td>2222.03.52.03.5</td><td></td></tr><tr><td>' 9'0 7*1 7*1 7*1 78 9e p1 1 40d5</td><td></td></tr><tr><td>compute 1 fuid adf 32</td><td></td></tr></table></body></html>  

# 3.2.3 Description  

Define a computation that calculates one or more angular distribution functions (ADF) for a group of particles. Each ADF is calculated in histogram form by measuring the angle formed by a central atom and two neighbor atoms and binning these angles into Nbin bins. Only neighbors for which Rinner $<R<i$ Router are counted, where Rinner and Router are specified separately for the first and second neighbor atom in each requested ADF.  

![](images/423269b62a8d0942992c70364245ac1bde7082a39325aa84c04f02ab3586f5f3.jpg)  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this fix uses a neighbor list, it also means those pairs will not be included in the ADF. This does not apply when using long-range coulomb interactions (coul/long, coul/msm, coul/wolf or similar. One way to get around this would be to set special_bond scaling factors to very tiny numbers that are not exactly zero (e.g. 1.0e-50). Another workaround is to write a dump file, and use the rerun command to compute the ADF for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

![](images/91aa5a4a2ffbce0245db7ce672d95435d1839e47dd03093c7741dd568e04254b.jpg)  

# Note  

If you request any outer cutoff Router $>$ force cutoff, or if no pair style is defined, e.g. the rerun command is being used to post-process a dump file of snapshots you must ensure ghost atom information out to the largest value of Router $^+$ skin is communicated, via the comm_modify cutoff command, else the ADF computation cannot be performed, and LAMMPS will give an error message. The skin value is what is specified with the neighbor command.  

The itypeN,jtypeN,ktypeN settings can be specified in one of two ways. An explicit numeric value can be used, as in the first example above. Or a wild-card asterisk can be used to specify a range of atom types as in the second example above. This takes the form “\*” or $\mathbf{\overline{{\Omega}}^{6*}\mathbf{\overline{{\Omega}}\mathbf{n}}^{,,}}$ or $\mathbf{\Psi}^{66}\mathbf{n}^{*}{}^{,}$ or $\mathbf{\tilde{\rho}}_{\mathrm{m}}^{*}\mathbf{\tilde{n}}^{,}$ . If $\Nu=$ the number of atom types, then an asterisk with no numeric values means all types from 1 to N. A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to N (inclusive). A middle asterisk means all types from m to n (inclusive).  

If itypeN, jtypeN, and ktypeN are single values, as in the first example above, this means that the ADF is computed where atoms of type itypeN are the central atom, and neighbor atoms of type jtypeN and ktypeN are forming the angle. If any of itypeN, jtypeN, or ktypeN represent a range of values via the wild-card asterisk, as in the second example above, this means that the ADF is computed where atoms of any of the range of types represented by itypeN are the central atom, and the angle is formed by two neighbors, one neighbor in the range of types represented by jtypeN and another neighbor in the range of types represented by ktypeN.  

If no itypeN, jtypeN, ktypeN settings are specified, then LAMMPS will generate a single ADF for all atoms in the group. The inner cutoff is set to zero and the outer cutoff is set to the force cutoff. If no pair_style is specified, there is no force cutoff and LAMMPS will give an error message. Note that in most cases, generating an ADF for all atoms is not a good thing. Such an ADF is both uninformative and extremely expensive to compute. For example, with liquid water with a $10\mathrm{A}$ force cutoff, there are 80,000 angles per atom. In addition, most of the interesting angular structure occurs for neighbors that are the closest to the central atom, involving just a few dozen angles.  

Angles for each ADF are generated by double-looping over the list of neighbors of each central atom I, just as they would be in the force calculation for a three-body potential such as Stillinger-Weber. The angle formed by central atom I and neighbor atoms J and K is included in an ADF if the following criteria are met:  

• atoms I,J,K are all in the specified compute group • the distance between atoms I,J is between Rjinner and Rjouter • the distance between atoms I,K is between Rkinner and Rkouter • the type of the I atom matches itypeN (one or a range of types) • atoms I,J,K are distinct • the type of the J atom matches jtypeN (one or a range of types) • the type of the K atom matches ktypeN (one or a range of types)  

Each unique angle satisfying the above criteria is counted only once, regardless of whether either or both of the neighbor atoms making up the angle appear in both the J and K lists. It is OK if a particular angle is included in more than one individual histogram, due to the way the itypeN, jtypeN, ktypeN arguments are specified.  

The first ADF value for a bin is calculated from the histogram count by dividing by the total number of triples satisfying the criteria, so that the integral of the ADF w.r.t. angle is 1, i.e. the ADF is a probability density function.  

The second ADF value is reported as a cumulative sum of all bins up to the current bins, averaged over atoms of type itypeN. It represents the number of angles per central atom with angle less than or equal to the angle of the current bin, analogous to the coordination number radial distribution function.  

The ordinate optional keyword determines whether the bins are of uniform angular size from zero to 180 (degree), zero to Pi (radian), or the cosine of the angle uniform in the range [-1,1] (cosine). cosine has the advantage of eliminating the acos() function call, which speeds up the compute by 2-3x, and it is also preferred on physical grounds, because the for uniformly distributed particles in 3D, the angular probability density w.r.t dtheta is sin(theta)/2, while for d(cos(theta)), it is 1/2, Regardless of which ordinate is chosen, the first column of ADF values is normalized w.r.t. the range of that ordinate, so that the integral is 1.  

The simplest way to output the results of the compute adf calculation to a file is to use the fix ave/time command, for example:  

<html><body><table><tr><td>compute myADF all adf 32 2 2 2 0.5 3.5 0.5 3.5</td></tr><tr><td>fix 1 all 1 ave/time 100 1 100 c_myADF[*] file tmp.adf mode vector</td></tr></table></body></html>  

# 3.2.4 Output info  

This compute calculates a global array with the number of rows $=$ Nbins and the number of columns $=1+2\times$ Ntriples, where Ntriples is the number of I,J,K triples specified. The first column has the bin coordinate (angle-related ordinate at midpoint of bin). Each subsequent column has the two ADF values for a specific set of (itypeN,jtypeN,ktypeN) interactions, as described above. These values can be used by any command that uses a global values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The array values calculated by this compute are all “intensive”.  

The first column of array values is the angle-related ordinate, either the angle in degrees or radians, or the cosine of the angle. Each subsequent pair of columns gives the first and second kinds of ADF for a specific set of (itypeN,jtypeN,ktypeN). The values in the first ADF column are normalized numbers $\ge0.0$ , whose integral w.r.t. the ordinate is 1, i.e. the first ADF is a normalized probability distribution. The values in the second ADF column are also numbers $\ge0.0$ . They are the cumulative density distribution of angles per atom. By definition, this ADF is monotonically increasing from zero to a maximum value equal to the average total number of angles per atom satisfying the ADF criteria.  

# 3.2.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

By default, the ADF is not computed for distances longer than the largest force cutoff, since the neighbor list creation will only contain pairs up to that distance (plus neighbor list skin). If you use outer cutoffs larger than that, you must use neighbor style ‘bin’ or ‘nsq’.  

If you want an ADF for a larger outer cutoff, you can also use the rerun command to post-process a dump file, use pair style zero and set the force cutoff to be larger in the rerun script. Note that in the rerun context, the force cutoff is arbitrary and with pair style zero you are not computing any forces, and since you are not running dynamics you are not changing the model that generated the trajectory.  

The ADF is not computed for neighbors outside the force cutoff, since processors (in parallel) don’t know about atom coordinates for atoms further away than that distance. If you want an ADF for larger distances, you can use the rerun command to post-process a dump file and set the cutoff for the potential to be longer in the rerun script. Note that in the rerun context, the force cutoff is arbitrary, since you are not running dynamics and thus are not changing your model.  

# 3.2.6 Related commands  

compute rdf , fix ave/time, compute_modify  

# 3.2.7 Default  

The keyword default is ordinate $=$ degree.  

# 3.3 compute angle command  

# 3.3.1 Syntax  

compute ID group-ID angle  

• ID, group-ID are documented in compute command • angle $=$ style name of this compute command  

# 3.3.2 Examples  

# 3.3.4 Output info  

This compute calculates a global vector of length $N.$ , where $N$ is the number of sub_styles defined by the angle_style hybrid command, which can be accessed by indices 1 through $N.$ These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector values are “extensive” and will be in energy units.  

# 3.3.5 Restrictions  

none  

# 3.3.6 Related commands  

compute pe, compute pair  

# 3.3.7 Default  

none  

# 3.4 compute angle/local command  

# 3.4.1 Syntax  

compute ID group-ID angle/local value1 value2 ... keyword args ...  

• ID, group-ID are documented in compute command   
• angle/local $=$ style name of this compute command   
• one or more values may be appended   
• value $=$ theta or eng or v_name theta $=$ tabulate angles $\mathrm{eng}=$ tabulate angle energies v_name $=$ equal-style variable with name (see below)   
• zero or more keyword/args pairs may be appended   
• keyword $=s e t$ set args $=$ theta name theta $=$ only currently allowed arg name $=$ name of variable to set with theta  

# 3.4.2 Examples  

compute 1 all angle/local theta compute 1 all angle/local eng theta compute 1 all angle/local theta v_cos set theta t  

# 3.4.3 Description  

Define a computation that calculates properties of individual angle interactions. The number of datums generated, aggregated across all processors, equals the number of angles in the system, modified by the group parameter as explained below.  

The value theta is the angle for the three atoms in the interaction.  

The value eng is the interaction energy for the angle.  

The value v_name can be used together with the set keyword to compute a user-specified function of the angle theta. The name specified for the v_name value is the name of an equal-style variable which should evaluate a formula based on a variable which will store the angle theta. This other variable must be an internal-style variable defined in the input script; its initial numeric value can be anything. It must be an internal-style variable, because this command resets its value directly. The set keyword is used to identify the name of this other variable associated with theta.  

Note that the value of theta for each angle which stored in the internal variable is in radians, not degrees.  

As an example, these commands can be added to the bench/in.rhodo script to compute the cosine and cosine-squared of every angle in the system and output the statistics in various ways:  

variable t internal 0.0 variable cos equal $\cos(\mathrm{v\_t)}$ variable cossq equal $\cos(\mathrm{v\_t)^{*}}\mathrm{cos(v\_t)}$ compute 1 all property/local aatom1 aatom2 aatom3 atype compute 2 all angle/local eng theta v_cos v_cossq set theta t dump 1 all local 100 tmp.dump $\mathrm{~c~}_{-}1[^{*}]\mathrm{~c~}_{-}2[^{*}]$  

compute 3 all reduce ave $\mathrm{c\_2[{^*}]}$ inputs local thermo_style custom step temp press $\mathrm{~c~}_{-}3[{}^{*}]$  

The dump local command will output the potential energy $(\phi)$ , the angle $(\theta)$ , $\cos(\theta)$ , and $\cos^{2}(\theta)$ for every angle $\theta$ in the system. The thermo_style command will print the average of those quantities via the compute reduce command with thermo output. And the fix ave/histo command will histogram the $\cos(\theta)$ values and write them to a file.  

The local data stored by this command is generated by looping over all the atoms owned on a processor and their angles. An angle will only be included if all three atoms in the angle are in the specified compute group. Any angles that have been broken (see the angle_style command) by setting their angle type to 0 are not included. Angles that have been turned off (see the fix shake or delete_bonds commands) by setting their angle type negative are written into the file, but their energy will be 0.0.  

Note that as atoms migrate from processor to processor, there will be no consistent ordering of the entries within the local vector or array from one timestep to the next. The only consistency that is guaranteed is that the ordering on a particular timestep will be the same for local vectors or arrays generated by other compute commands. For example, angle output from the compute property/local command can be combined with data from this command and output by the dump local command in a consistent way.  

Here is an example of how to do this:  

compute 1 all property/local atype aatom1 aatom2 aatom3   
compute 2 all angle/local theta eng   
dump 1 all local 1000 tmp.dump index c_1[1] c_1[2] c_1[3] c_1[4] c_2[1] c_2[2]  

# 3.4.4 Output info  

This compute calculates a local vector or local array depending on the number of values. The length of the vector or number of rows in the array is the number of angles. If a single value is specified, a local vector is produced. If two or more values are specified, a local array is produced where the number of columns $=$ the number of values. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The output for theta will be in degrees. The output for eng will be in energy units.  

# 3.4.5 Restrictions  

none  

# 3.4.6 Related commands  

dump local, compute property/local  

# 3.4.7 Default  

none  

# 3.5 compute angmom/chunk command  

# 3.5.1 Syntax  

compute ID group-ID angmom/chunk chunkID  

• ID, group-ID are documented in compute command • angmom/chunk $=$ style name of this compute command • chunkID $=\mathrm{ID}$ of compute chunk/atom command  

# 3.5.2 Examples  

compute 1 fluid angmom/chunk molchunk  

# 3.5.3 Description  

Define a computation that calculates the angular momentum of multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

This compute calculates the 3 components of the angular momentum vector for each chunk, due to the velocity/momentum of the individual atoms in the chunk around the center-of-mass of the chunk. The calculation includes all effects due to atoms passing through periodic boundaries.  

Note that only atoms in the specified group contribute to the calculation. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

![](images/fb02785e4e6c7180ae8e703619ede529d7395f7e443f7cc12a391d7d4e102478.jpg)  

# Note  

The coordinates of an atom contribute to the chunk’s angular momentum in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g. to 0) before invoking this compute by using the set image command.  

The simplest way to output the results of the compute angmom/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule   
compute myChunk all angmom/chunk cc1   
fix 1 all ave/time 100 1 100 c_myChunk[\*] file tmp.out mode vector  

# 3.5.4 Output info  

This compute calculates a global array where the number of rows $=$ the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The number of columns $=3$ for the three $(x,y,z)$ components of the angular momentum for each chunk. These values can be accessed by any command that uses global array values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The array values are “intensive”. The array values will be in mass-velocity-distance units.  

# 3.5.5 Restrictions  

none  

# 3.5.6 Related commands  

variable angmom() function  

# 3.5.7 Default  

none  

# 3.6 compute ave/sphere/atom command  

Accelerator Variants: ave/sphere/atom/kk  

# 3.6.1 Syntax  

compute ID group-ID ave/sphere/atom keyword values ...  

• ID, group-ID are documented in compute command   
• ave/sphere/atom $=$ style name of this compute command   
• one or more keyword/value pairs may be appended keyword $=$ cutoff cutoff value $=$ distance cutoff  

# 3.6.2 Examples  

compute 1 all ave/sphere/atom compute 1 all ave/sphere/atom cutoff 5.0 comm_modify cutoff 5.0  

# 3.6.3 Description  

Added in version 7Jan2022.  

Define a computation that calculates the local mass density and temperature for each atom based on its neighbors inside a spherical cutoff. If an atom has M neighbors, then its local mass density is calculated as the sum of its mass and its $M$ neighbor masses, divided by the volume of the cutoff sphere (or circle in 2d). The local temperature of the atom is calculated as the temperature of the collection of $M+1$ atoms, after subtracting the center-of-mass velocity of the $M+1$ atoms from each of the $M+1$ atom’s velocities. This is effectively the thermal velocity of the neighborhood of the central atom, similar to compute temp/com.  

The optional keyword cutoff defines the distance cutoff used when searching for neighbors. The default value is the cutoff specified by the pair style. If no pair style is defined, then a cutoff must be defined using this keyword. If the specified cutoff is larger than that of the pair_style plus neighbor skin (or no pair style is defined), the comm_modify cutoff option must also be set to match that of the cutoff keyword.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (i.e. each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently.  

![](images/77a4118a25063d3cd1c3aac0c1f56d14520e88ff77d7778f7cca82ffa0b1d051.jpg)  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this compute uses the neighbor list, it also means those pairs will not be included in the order parameter. This difficulty can be circumvented by writing a dump file, and using the rerun command to compute the order parameter for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.6.4 Output info  

This compute calculates a per-atom array with two columns: mass density in density units and temperature in temperature units.  

These values can be accessed by any command that uses per-atom values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

# 3.6.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

This compute requires neighbor styles ‘bin’ or ‘nsq’.  

# 3.6.6 Related commands  

comm_modify  

# 3.6.7 Default  

The option defaults are cutoff $=$ pair style cutoff.  

# 3.7 compute basal/atom command  

# 3.7.1 Syntax  

compute ID group-ID basal/atom  

• ID, group-ID are documented in compute command • basal/atom $=$ style name of this compute command  

# 3.7.2 Examples  

# 3.7.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

The output of this compute will be meaningless unless the atoms are on (or near) hcp lattice sites, since the calculation assumes a well-defined basal plane.  

# 3.7.6 Related commands  

compute centro/atom, compute ackland/atom  

# 3.7.7 Default  

none  

(Barrett) Barrett, Tschopp, El Kadiri, Scripta Mat. 66, p.666 (2012).  

# 3.8 compute body/local command  

# 3.8.1 Syntax  

compute ID group-ID body/local input1 input2 ...  

• ID, group-ID are documented in compute command • body/local $=$ style name of this compute command • one or more keywords may be appended • keyword $=i d$ or type or integer  

id $=$ atom ID of the body particle type $=$ atom type of the body particle integer $=1,2,3$ ,etc $=$ index of fields defined by body style  

# 3.8.2 Examples  

compute 1 all body/local type 1 2 3   
compute 1 all body/local 3 6  

# 3.8.3 Description  

Define a computation that calculates properties of individual body sub-particles. The number of data generated, aggregated across all processors, equals the number of body sub-particles plus the number of non-body particles in the system, modified by the group parameter as explained below. See the Howto body page for more details on using body particles.  

The local data stored by this command is generated by looping over all the atoms. An atom will only be included if it is in the group. If the atom is a body particle, then its $N$ sub-particles will be looped over, and it will contribute $N$ data to the count of data. If it is not a body particle, it will contribute 1 datum.  

For both body particles and non-body particles, the id keyword will store the ID of the particle.  

For both body particles and non-body particles, the type keyword will store the type of the particle.  

The integer keywords mean different things for body and non-body particles. If the atom is not a body particle, only its $x,y,z$ coordinates can be referenced, using the integer keywords 1,2,3. Note that this means that if you want to access more fields than this for body particles, then you cannot include non-body particles in the group.  

For a body particle, the integer keywords refer to fields calculated by the body style for each sub-particle. The body style, as specified by the atom_style body, determines how many fields exist and what they are. See the Howto_body doc page for details of the different styles.  

Here is an example of how to output body information using the dump local command with this compute. If fields 1, 2, and 3 for the body sub-particles are $(x,y,z)$ coordinates, then the dump file will be formatted similar to the output of a dump atom or custom command.  

<html><body><table><tr><td>compute 1 all body /local type 1 2 3 dump 0 1 all local 1000 tmp.dump index c_1[1] c _1[2] c_1[3] c_1[4]</td></tr></table></body></html>  

# 3.8.4 Output info  

This compute calculates a local vector or local array depending on the number of keywords. The length of the vector or number of rows in the array is the number of data as described above. If a single keyword is specified, a local vector is produced. If two or more keywords are specified, a local array is produced where the number of columns $=$ the number of keywords. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The units for output values depend on the body style.  

# 3.8.5 Restrictions  

none  

# 3.8.6 Related commands  

dump local  

# 3.8.7 Default  

none  

# 3.9 compute bond command  

# 3.9.1 Syntax  

compute ID group-ID bond  

• ID, group-ID are documented in compute command • bond $=$ style name of this compute command  

# 3.9.2 Examples  

# 3.9.3 Description  

Define a computation that extracts the bond energy calculated by each of the bond sub-styles used in the bond_style hybrid command. These values are made accessible for output or further processing by other commands. The group specified for this command is ignored.  

This compute is useful when using bond_style hybrid if you want to know the portion of the total energy contributed by one or more of the hybrid sub-styles.  

# 3.9.4 Output info  

This compute calculates a global vector of length $N$ , where $N$ is the number of sub_styles defined by the bond_style hybrid command, which can be accessed by indices 1 through $N$ . These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector values are “extensive” and will be in energy units.  

# 3.9.5 Restrictions  

none  

# 3.9.6 Related commands  

compute pe, compute pair  

# 3.9.7 Default  

none  

# 3.10 compute bond/local command  

# 3.10.1 Syntax  

compute ID group-ID bond/local value1 value2 ... keyword args ...  

• ID, group-ID are documented in compute command   
• bond/local $=$ style name of this compute command   
• one or more values may be appended   
• value $=$ dist or $d x$ or dy or $d z$ or engpot or force or fx or fy or fz or engvib or engrot or engtrans or omega or velvib or $\nu.$ _name or bN  

dist $=$ bond distance engpot $=$ bond potential energy force $=$ bond force  

dx,dy,dz $=$ components of pairwise distance fx,fy,fz $=$ components of bond force engvib $=$ bond kinetic energy of vibration engrot = bond kinetic energy of rotation engtrans = bond kinetic energy of translation omega $-$ magnitude of bond angular velocity velvib = vibrational velocity along the bond length v_name = equal-style variable with name (see below)  

bN $=$ bond style specific quantities for allowed N values • zero or more keyword/args pairs may be appended • keyword = set  

set args $=$ dist name dist $=$ only currently allowed arg name $=$ name of variable to set with distance (dist)  

# 3.10.2 Examples  

<html><body><table><tr><td>compute 1 all bond/local engpot</td></tr><tr><td>compute 1 all bond/local dist engpot force</td></tr><tr><td>compute 1 all bond/local dist fx fy fz b1 b2</td></tr><tr><td>compute 1 all bond/local dist v distsq set dist d</td></tr></table></body></html>  

# 3.10.3 Description  

Define a computation that calculates properties of individual bond interactions. The number of datums generated, aggregated across all processors, equals the number of bonds in the system, modified by the group parameter as explained below.  

All these properties are computed for the pair of atoms in a bond, whether the two atoms represent a simple diatomic molecule, or are part of some larger molecule.  

The value dist is the current length of the bond. The values $d x,d y$ , and $d z$ are the xyz components of the distance between the pair of atoms. This value is always the distance from the atom of lower to the one with the higher id.  

The value engpot is the potential energy for the bond, based on the current separation of the pair of atoms in the bond.  

The value force is the magnitude of the force acting between the pair of atoms in the bond.  

The values $f x,f y$ , and $f\boldsymbol{z}$ are the xyz components of force between the pair of atoms in the bond. For bond styles that apply non-central forces, such as bond_style bpm/rotational, these values only include the $(x,y,z)$ components of the normal force component.  

The remaining properties are all computed for motion of the two atoms relative to the center of mass (COM) velocity of the two atoms in the bond.  

The value engvib is the vibrational kinetic energy of the two atoms in the bond, which is simply $\begin{array}{r}{\frac{1}{2}m_{1}\nu_{1}^{2}+\frac{1}{2}m_{2}\nu_{2}^{2}}\end{array}$ , where $\nu_{1}$ and $\nu_{2}$ are the magnitude of the velocity of the two atoms along the bond direction, after the COM velocity has been subtracted from each.  

The value engrot is the rotational kinetic energy of the two atoms in the bond, which is simply $\textstyle{\frac{1}{2}}m_{1}\nu_{1}^{2}+{\frac{1}{2}}m_{2}\nu_{2}^{2}$ , where $\nu_{1}$ and $\nu_{2}$ are the magnitude of the velocity of the two atoms perpendicular to the bond direction, after the COM velocity has been subtracted from each.  

The value engtrans is the translational kinetic energy associated with the motion of the COM of the system itself, namely $\textstyle{\frac{1}{2}}(m_{1}+m_{2})V_{\mathrm{cm}}^{2}$ , where $V c m=$ magnitude of the velocity of the COM.  

Note that these three kinetic energy terms are simply a partitioning of the summed kinetic energy of the two atoms themselves. That is, the total kinetic energy is ${\textstyle\frac{1}{2}}m_{1}\nu_{1}^{2}+{\textstyle\frac{1}{2}}m_{2}\nu_{2}^{2}=\mathrm{engvib+engrot{\scriptstyle+\frac{1}{2}}m}$ $^+$ engtrans, where $\nu_{1}$ and $\nu_{2}$ are the magnitude of the velocities of the two atoms, without any adjustment for the COM velocity.  

The value omega is the magnitude of the angular velocity of the two atoms around their COM position.  

The value velvib is the magnitude of the relative velocity of the two atoms in the bond towards each other. A negative value means the two atoms are moving toward each other; a positive value means they are moving apart.  

# 3.10. compute bond/local command  

The value $\nu_{,}$ _name can be used together with the set keyword to compute a user-specified function of the bond distance. The name specified for the v_name value is the name of an equal-style variable which should evaluate a formula based on a variable which will store the bond distance. This other variable must be an internal-style variable defined in the input script; its initial numeric value can be anything. It must be an internal-style variable, because this command resets its value directly. The set keyword is used to identify the name of this other variable associated with theta.  

As an example, these commands can be added to the bench/in.rhodo script to compute the length of every bond in the system and output the statistics in various ways:  

<html><body><table><tr><td>variable d internal 0.0 variable dsq equal v_d*v _d</td><td></td></tr><tr><td>compute 1 all property/local batom1 batom2 btype</td><td></td></tr><tr><td>compute 2 all bond/local engpot dist v_dsq set dist d</td><td></td></tr><tr><td>dump 1 all local 100 tmp.dump c_1[*] c_2[*]</td><td></td></tr><tr><td></td><td></td></tr><tr><td>compute 3 all reduce ave c_2[*] inputs local</td><td></td></tr><tr><td>thermo_style e custom step temp press c_3[*]</td><td></td></tr><tr><td></td><td></td></tr><tr><td>fix 10 all ave/histo 10 10 100 0 6 20 c_2[3]</td><td>l mode vector file tmp.histo</td></tr></table></body></html>  

The dump local command will output the energy, length, and length2 for every bond in the system. The thermo_style command will print the average of those quantities via the compute reduce command with thermo output, and the $f\alpha$ ave/histo command will histogram the length2 values and write them to a file.  

A bond style may define additional bond quantities which can be accessed as $b l$ to $b N_{;}$ , where N is defined by the bond style. Most bond styles do not define any additional quantities, so $\Nu=0$ . An example of ones that do are the BPM bond styles which store the reference state between two particles. See individual bond styles for details.  

When using bN with bond style hybrid, the output will be the Nth quantity from the sub-style that computes the bonded interaction (based on bond type). If that sub-style does not define a $b N$ , the output will be 0.0. The maximum allowed N is the maximum number of quantities provided by any sub-style.  

The local data stored by this command is generated by looping over all the atoms owned on a processor and their bonds. A bond will only be included if both atoms in the bond are in the specified compute group. Any bonds that have been broken (see the bond_style command) by setting their bond type to 0 are not included. Bonds that have been turned off (see the fix shake or delete_bonds commands) by setting their bond type negative are written into the file, but their energy will be 0.0.  

Note that as atoms migrate from processor to processor, there will be no consistent ordering of the entries within the local vector or array from one timestep to the next. The only consistency that is guaranteed is that the ordering on a particular timestep will be the same for local vectors or arrays generated by other compute commands. For example, bond output from the compute property/local command can be combined with data from this command and output by the dump local command in a consistent way.  

Here is an example of how to do this:  

<html><body><table><tr><td>compute 1 all property/local btype batom1 batom2 compute 2 all bond/local dist engpot</td></tr></table></body></html>  

# 3.10.4 Output info  

This compute calculates a local vector or local array depending on the number of values. The length of the vector or number of rows in the array is the number of bonds. If a single value is specified, a local vector is produced. If two or more values are specified, a local array is produced where the number of columns $=$ the number of values. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The output for dist will be in distance units. The output for velvib will be in velocity units. The output for omega will be in velocity/distance units. The output for engtrans, engvib, engrot, and engpot will be in energy units. The output for force will be in force units.  

# 3.10.5 Restrictions  

none  

# 3.10.6 Related commands  

dump local, compute property/local  

# 3.10.7 Default  

none  

# 3.11 compute born/matrix command  

# 3.11.1 Syntax  

compute ID group-ID born/matrix keyword value ...  

• ID, group-ID are documented in compute command   
• born/matrix $=$ style name of this compute command   
• zero or more keywords or keyword/value pairs may be appended keyword $=$ numdiff or pair or bond or angle or dihedral or improper numdiff values $=$ delta virial-ID delta $=$ magnitude of strain (dimensionless) virial- $\mathrm{\cdotID}=\mathrm{ID}$ of pressure compute for virial (string) (numdiff cannot be used with any other keyword) pair $=$ compute pair-wise contributions bond $=$ compute bonding contributions angle $=$ compute angle contributions dihedral $=$ compute dihedral contributions improper $=$ compute improper contributions  

# 3.11.2 Examples  

compute 1 all born/matrix compute 1 all born/matrix bond angle compute 1 all born/matrix numdiff 1.0e-4 myvirial  

# 3.11.3 Description  

Added in version 4May2022.  

Define a compute that calculates ∂∂εi2∂Uεj , the second derivatives of the potential energy U with respect to the strain tensor ε elements. These values are related to:  

$$
C_{i,j}^{B}=\frac{1}{V}\frac{\partial^{2}U}{\partial\varepsilon_{i}\partial\varepsilon_{j}}
$$  

also called the Born term of elastic constants in the stress-stress fluctuation formalism. This quantity can be used to compute the elastic constant tensor. Using the symmetric Voigt notation, the elastic constant tensor can be written as a 6x6 symmetric matrix:  

$$
C_{i,j}=\langle C_{i,j}^{B}\rangle+\frac{V}{k_{B}T}\left(\langle\sigma_{i}\sigma_{j}\rangle-\langle\sigma_{i}\rangle\langle\sigma_{j}\rangle\right)+\frac{N k_{B}T}{V}\left(\delta_{i,j}+(\delta_{1,i}+\delta_{2,i}+\delta_{3,i})*(\delta_{1,j}+\delta_{2,j}+\delta_{3,j})\right)
$$  

In the above expression, $\sigma$ stands for the virial stress tensor, $\delta$ is the Kronecker delta and the usual notation apply for he number of particle, the temperature and volume respectively $N,T$ and $V$ . $k_{B}$ is the Boltzmann constant.  

The Born term is a symmetric 6x6 matrix, as is the matrix of second derivatives of potential energy w.r.t strain, whose 21 independent elements are output in this order:  

$$
\begin{array}{r}{{{\sf C}_{1}\quad C_{7}\quad C_{8}\quad C_{9}\quad C_{10}\quad C_{11}}}\ {{\quad C_{7}\quad C_{2}\quad C_{12}\quad C_{13}\quad C_{14}\quad C_{15}}}\ {{\vdots\quad C_{12}\quad C_{3}\quad C_{16}\quad C_{17}\quad C_{18}}}\ {{\vdots\quad C_{13}\quad C_{16}\quad C_{4}\quad C_{19}\quad C_{20}}}\ {{\vdots\quad\vdots\quad\vdots\quad C_{19}\quad C_{5}\quad C_{21}}}\ {{\vdots\quad\vdots\quad\vdots\quad\vdots\quad C_{21}\quad C_{6}}}\end{array}
$$  

in this matrix the indices of $C_{k}$ value are the corresponding element $k$ in the global vector output by this compute. Each term comes from the sum of the derivatives of every contribution to the potential energy in the system as explained in (VanWorkum).  

The output can be accessed using usual Lammps routines:  

compute 1 all born/matrix   
compute 2 all pressure NULL virial   
variable S1 equal -c_2[1]   
variable S2 equal -c_2[2]   
variable S3 equal -c_2[3]   
variable S4 equal -c_2[4]   
variable S5 equal -c_2[5]   
variable S6 equal -c_2[6]   
fix 1 all ave/time 1 1 1 v_S1 v_S2 v_S3 v_S4 v_S5 v_S6 c_1[\*] file born.out  

In this example, the file born.out will contain the information needed to compute the first and second terms of the elastic constant matrix in a post processing procedure. The other required quantities can be accessed using any other LAMMPS usual method. Several examples of this method are provided in the examples/ELASTIC_T/BORN_MATRIX directory described on the Examples doc page.  

NOTE: In the above $C_{i,j}$ computation, the fluctuation term involving the virial stress tensor $\sigma$ is the covariance between each elements. In a solid the stress fluctuations can vary rapidly, while average fluctuations can be slow to converge. A detailed analysis of the convergence rate of all the terms in the elastic tensor is provided in the paper by Clavier et al. (Clavier).  

Two different computation methods for the Born matrix are implemented in this compute and are mutually exclusive.  

The first one is a direct computation from the analytical formula from the different terms of the potential used for the simulations (VanWorkum). However, the implementation of such derivations must be done for every potential form. This has not been done yet and can be very complicated for complex potentials. At the moment a warning message is displayed for every term that is not supporting the compute at the moment. This method is the default for now.  

The second method uses finite differences of energy to numerically approximate the second derivatives (Zhen). This is useful when using interaction styles for which the analytical second derivatives have not been implemented. In this cases, the compute applies linear strain fields of magnitude delta to all the atoms relative to a point at the center of the box. The strain fields are in six different directions, corresponding to the six Cartesian components of the stress tensor defined by LAMMPS. For each direction it applies the strain field in both the positive and negative senses, and the new stress virial tensor of the entire system is calculated after each. The difference in these two virials divided by two times delta, approximates the corresponding components of the second derivative, after applying a suitable unit conversion.  

![](images/40eb4ae391b8b5981dc248922ded68fcf25555e2f0fcc2ed0f9261741c554cfa.jpg)  

# Note  

It is important to choose a suitable value for delta, the magnitude of strains that are used to generate finite difference approximations to the exact virial stress. For typical systems, a value in the range of 1 part in 1e5 to 1e6 will be sufficient. However, the best value will depend on a multitude of factors including the stiffness of the interatomic potential, the thermodynamic state of the material being probed, and so on. The only way to be sure that you have made a good choice is to do a sensitivity study on a representative atomic configuration, sweeping over a wide range of values of delta. If delta is too small, the output values will vary erratically due to truncation effects. If delta is increased beyond a certain point, the output values will start to vary smoothly with delta, due to growing contributions from higher order derivatives. In between these two limits, the numerical virial values should be largely independent of delta.  

The keyword requires the additional arguments delta and virial-ID. delta gives the size of the applied strains. virial- $.I D$ gives the ID string of the pressure compute that provides the virial stress tensor, requiring that it use the virial keyword e.g.  

<html><body><table><tr><td>ompute myvirial all 1 pressure NULL virial</td></tr><tr><td>compute 1 all born /matrix numdiff 1.0e-4 myvirial</td></tr></table></body></html>  

# Output info:  

This compute calculates a global vector with 21 values that are the second derivatives of the potential energy with respect to strain. The values are in energy units. The values are ordered as explained above. These values can be used by any command that uses global values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The array values calculated by this compute are all “extensive”.  

# 3.11.4 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info. LAMMPS was built with that package. See the Build package page for more info.  

The Born term can be decomposed as a product of two terms. The first one is a general term which depends on the configuration. The second one is specific to every interaction composing your force field (non-bonded, bonds, angle, . . . ). Currently not all LAMMPS interaction styles implement the born_matrix method giving first and second order derivatives and LAMMPS will exit with an error if this compute is used with such interactions unless the numdiff option is also used. The numdiff option cannot be used with any other keyword. In this situation, LAMMPS will also exit with an error.  

# 3.11.5 Default  

none  

(Van Workum) K. Van Workum et al., J. Chem. Phys. 125 144506 (2006)   
(Clavier) G. Clavier, N. Desbiens, E. Bourasseau, V. Lachet, N. Brusselle-Dupend and B. Rousseau, Mol Sim, 43, 1413 (2017).   
(Zhen) Y. Zhen, C. Chu, Computer Physics Communications 183(2012)261-265  

# 3.12 compute centro/atom command  

# 3.12.1 Syntax  

compute ID group-ID centro/atom lattice keyword value ...  

• ID, group-ID are documented in compute command   
• centro/atom $=$ style name of this compute command   
• lattice $=f c c$ or bcc or $\Nu=\#$ of neighbors per atom to include   
• zero or more keyword/value pairs may be appended   
• keyword = axes axes value $=\mathrm{no}$ or yes $\mathrm{no}=\mathrm{do}$ not calculate 3 symmetry axes yes $=$ calculate 3 symmetry axes  

# 3.12.2 Examples  

<html><body><table><tr><td>compute 1 all centro/atom fcc</td></tr><tr><td>compute 1 all centro/atom </td></tr></table></body></html>  

# 3.12.3 Description  

Define a computation that calculates the centro-symmetry parameter for each atom in the group, for either FCC or BCC lattices, depending on the choice of the lattice argument. In solid-state systems the centro-symmetry parameter is a useful measure of the local lattice disorder around an atom and can be used to characterize whether the atom is part of a perfect lattice, a local defect (e.g. a dislocation or stacking fault), or at a surface.  

The value of the centro-symmetry parameter will be 0.0 for atoms not in the specified compute group.  

This parameter is computed using the following formula from (Kelchner)  

$$
C S=\sum_{i=1}^{N/2}|\vec{R}_{i}+\vec{R}_{i+N/2}|^{2}
$$  

where the $N$ nearest neighbors of each atom are identified and $\vec{R}_{i}$ and $\vec{R}_{i+N/2}$ are vectors from the central atom to a particular pair of nearest neighbors. There are $N(N-1)/2$ possible neighbor pairs that can contribute to this formula. The quantity in the sum is computed for each, and the $N/2$ smallest are used. This will typically be for pairs of atoms in symmetrically opposite positions with respect to the central atom; hence the $i+N/2$ notation.  

$N$ is an input parameter, which should be set to correspond to the number of nearest neighbors in the underlying lattice of atoms. If the keyword fcc or $b c c$ is used, $N$ is set to 12 and 8 respectively. More generally, $N$ can be set to a positive, even integer.  

For an atom on a lattice site, surrounded by atoms on a perfect lattice, the centro-symmetry parameter will be 0. It will be near 0 for small thermal perturbations of a perfect lattice. If a point defect exists, the symmetry is broken, and the parameter will be a larger positive value. An atom at a surface will have a large positive parameter. If the atom does not have $N$ neighbors (within the potential cutoff), then its centro-symmetry parameter is set to 0.0.  

If the keyword axes has the setting yes, then this compute also estimates three symmetry axes for each atom’s local neighborhood. The first two of these are the vectors joining the two pairs of neighbor atoms with smallest contributions to the centrosymmetry parameter, i.e. the two most symmetric pairs of atoms. The third vector is normal to the first two by the right-hand rule. All three vectors are normalized to unit length. For FCC crystals, the first two vectors will lie along a $\langle110\rangle$ direction, while the third vector will lie along either a $\langle100\rangle$ or ⟨111⟩ direction. For HCP crystals, the first two vectors will lie along $\langle1000\rangle$ directions, while the third vector will lie along $\langle0001\rangle$ . This provides a simple way to measure local orientation in HCP structures. In general, the axes keyword can be used to estimate the orientation of symmetry axes in the neighborhood of any atom.  

Only atoms within the cutoff of the pairwise neighbor list are considered as possible neighbors. Atoms not in the compute group are included in the $N$ neighbors used in this calculation.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (e.g., each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently or to have multiple compute/dump commands, each with a centro/atom style.  

# 3.12.4 Output info  

By default, this compute calculates the centrosymmetry value for each atom as a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

If the axes keyword setting is yes, then a per-atom array is calculated. The first column is the centrosymmetry parameter. The next three columns are the $x,y$ , and $z$ components of the first symmetry axis, followed by the second, and third symmetry axes in columns 5–7 and 8–10.  

The centrosymmetry values are unitless values $\ge0.0$ . Their magnitude depends on the lattice style due to the number of contributing neighbor pairs in the summation in the formula above. And it depends on the local defects surrounding the central atom, as described above. For the axes yes case, the vector components are also unitless, since they represent spatial directions.  

Here are typical centro-symmetry values, from a nanoindentation simulation into gold (FCC). These were provided by Jon Zimmerman (Sandia):  

Bulk lattice = 0   
Dislocation core \~ 1.0 (0.5 to 1.25) Stacking faults \~ 5.0 (4.0 to 6.0) Free surface \~ 23.0  

These values are not normalized by the square of the lattice parameter. If they were, normalized values would be:  

Bulk lattice = 0   
Dislocation core \~ 0.06 (0.03 to 0.075)   
Stacking faults \~ 0.3 (0.24 to 0.36)   
Free surface \~ 1.38  

For BCC materials, the values for dislocation cores and free surfaces would be somewhat different, due to their being only 8 neighbors instead of 12.  

# 3.12. compute centro/atom command  

# 3.12.5 Restrictions  

none  

# 3.12.6 Related commands  

compute cna/atom  

# 3.12.7 Default  

The default value for the optional keyword is axes $=$ no.  

(Kelchner) Kelchner, Plimpton, Hamilton, Phys Rev B, 58, 11085 (1998).  

# 3.13 compute chunk/atom command  

# 3.13.1 Syntax  

compute ID group-ID chunk/atom style args keyword values ...  

• ID, group-ID are documented in compute command • chunk/atom $=$ style name of this compute command  

$\mathrm{style}=\mathrm{bin}/1\mathrm{d}$ or bin/2d or bin/3d or bin/sphere or bin/cylinder or type or molecule or c_ID, c_   
$\mathrm{\toID[I]}$ , $\mathrm{f\_ID}$ , $\mathrm{~f~}\_\mathrm{ID}[\mathrm{I}]$ , v_name   
bin/1d args $=$ dim origin delta $\mathrm{{dim}=x}$ or y or z origin $=$ lower or center or upper or coordinate value (distance units) delta $=$ thickness of spatial bins in dim (distance units)   
bin/2d args $=$ dim origin delta dim origin delta $\mathrm{{dim}=x}$ or y or z origin $-$ lower or center or upper or coordinate value (distance units) delta = thickness of spatial bins in dim (distance units)   
bin/3d args = dim origin delta dim origin delta dim origin delta $\mathrm{{dim}=x}$ or y or z origin $-$ lower or center or upper or coordinate value (distance units) delta = thickness of spatial bins in dim (distance units)   
bin/sphere args = xorig yorig zorig rmin rmax nsbin xorig,yorig,zorig = center point of sphere srmin,srmax = bin from sphere radius rmin to rmax $\mathrm{nsbin}=\#$ of spherical shell bins between rmin and rmax   
bin/cylinder $\mathrm{args}=\mathrm{dim}$ origin delta c1 c2 rmin rmax ncbin $\mathrm{{dim}=x}$ or y or $\mathbf{Z}=$ axis of cylinder axis origin = lower or center or upper or coordinate value (distance units) delta = thickness of spatial bins in dim (distance units) c1,c2 = coords of cylinder axis in other 2 dimensions (distance units) crmin,crmax = bin from cylinder radius rmin to rmax (distance units) $\mathrm{ncbin}=\#$ of concentric circle bins between rmin and rmax   
type args = none   
molecule args = none   
c_ID, c_ID[I], f_ID, f_ID[I], v_name args = none c_ID = per-atom vector calculated by a compute with ID $\mathrm{c\_ID[I]=Ith}$ column of per-atom array calculated by a compute with ID  

f $\mathrm{\partial_{-}I D}={\mathrm{per}}$ -atom vector calculated by a fix with ID $\mathrm{f\_ID[I]=Ith}$ column of per-atom array calculated by a fix with ID $\mathrm{v\_name}=\mathrm{r}$ er-atom vector calculated by an atom-style variable with name • zero or more keyword/values pairs may be appended • keyword $=$ region or nchunk or limit or ids or compress or discard or bound or pbc or units  

region value $=$ region-ID region- $\mathrm{\cdotID}=\mathrm{ID}$ of region atoms must be in to be part of a chunk   
nchunk value $=$ once or every once $=$ only compute the number of chunks once every $=$ re-compute the number of chunks whenever invoked   
limit values = 0 or Nc max or Nc exact $0=\mathrm{no}$ limit on the number of chunks Nc max = limit number of chunks to be <= Nc Nc exact = set number of chunks to exactly Nc   
ids value $-$ once or nfreq or every once = assign chunk IDs to atoms only once, they persist thereafter nfreq = assign chunk IDs to atoms only once every Nfreq steps (if invoked by fix ave/chunk which␣   
$\hookrightarrow$ sets Nfreq) every = assign chunk IDs to atoms whenever invoked   
compress value = yes or no   
yes = compress chunk IDs to eliminate IDs with no atoms no = do not compress chunk IDs even if some IDs have no atoms   
discard value = yes or no or mixed   
yes $-$ discard atoms with out-of-range chunk IDs by assigning a chunk ID = 0 $\mathrm{no}=\mathrm{keep}$ atoms with out-of-range chunk IDs by assigning a valid chunk ID mixed = keep or discard such atoms according to spatial binning rule   
bound values = x/y/z lo hi $\mathbf{x}/\mathbf{y}/\mathbf{z}=\mathbf{x}$ or y or $\mathrm{_{Z}}$ to bound spatial bins in this dimension lo = lower or coordinate value (distance units)   
hi = upper or coordinate value (distance units)   
pbc value = no or yes   
yes = use periodic distance for bin/sphere and bin/cylinder styles   
units value $=$ box or lattice or reduced  

# 3.13.2 Examples  

compute 1 all chunk/atom type   
compute 1 all chunk/atom bin/1d z lower 0.02 units reduced   
compute 1 all chunk/atom bin/2d z lower 1.0 y 0.0 2.5   
compute 1 all chunk/atom molecule region sphere nchunk once ids once compress yes   
compute 1 all chunk/atom bin/sphere 5 5 5 2.0 5.0 5 discard yes   
compute 1 all chunk/atom bin/cylinder z lower 2 10 10 2.0 5.0 3 discard yes   
compute 1 all chunk/atom c_cluster  

# 3.13.3 Description  

Define a computation that calculates an integer chunk ID from 1 to Nchunk for each atom in the group. Values of chunk IDs are determined by the style of chunk, which can be based on atom type or molecule ID or spatial binning or a per-atom property or value calculated by another compute, fix, or atom-style variable. Per-atom chunk IDs can be used by other computes with “chunk” in their style name, such as compute com/chunk or compute msd/chunk. Or they can be used by the fix ave/chunk command to sum and time average a variety of per-atom properties over the atoms in each chunk. Or they can simply be accessed by any command that uses per-atom values from a compute as input, as discussed on the Howto output doc page.  

See the Howto chunk page for an overview of how this compute can be used with a variety of other commands to tabulate properties of a simulation. The page gives several examples of input script commands that can be used to calculate interesting properties.  

Conceptually it is important to realize that this compute does two simple things. First, it sets the value of $N c h u n k=$ the number of chunks, which can be a constant value or change over time. Second, it assigns each atom to a chunk via a chunk ID. Chunk IDs range from 1 to Nchunk inclusive; some chunks may have no atoms assigned to them. Atoms that do not belong to any chunk are assigned a value of 0. Note that the two operations are not always performed together. For example, spatial bins can be setup once (which sets Nchunk), and atoms assigned to those bins many times thereafter (setting their chunk IDs).  

All other commands in LAMMPS that use chunk IDs assume there are Nchunk number of chunks, and that every atom is assigned to one of those chunks, or not assigned to any chunk.  

There are many options for specifying for how and when Nchunk is calculated, and how and when chunk IDs are assigned to atoms. The details depend on the chunk style and its args, as well as optional keyword settings. They can also depend on whether a fix ave/chunk command is using this compute, since that command requires Nchunk to remain static across windows of timesteps it specifies, while it accumulates per-chunk averages.  

The details are described below.  

The different chunk styles operate as follows. For each style, how it calculates Nchunk and assigns chunk IDs to atoms is explained. Note that using the optional keywords can change both of those actions, as described further below where the keywords are discussed.  

The binning styles perform a spatial binning of atoms, and assign an atom the chunk ID corresponding to the bin number it is in. Nchunk is set to the number of bins, which can change if the simulation box size changes. This also depends on the setting of the units keyword (e.g., for reduced units the number of chunks may not change even if the box size does).  

The bin/1d, bin/2d, and bin/3d styles define bins as 1d layers (slabs), 2d pencils, or 3d boxes. The dim, origin, and delta settings are specified 1, 2, or 3 times. For 2d or 3d bins, there is no restriction on specifying $\mathrm{dim}=x$ before dim $=y$ or $z$ , or $\dim=y$ before $\mathrm{dim}=z$ . Bins in a particular dim have a bin size in that dimension given by delta. In each dimension, bins are defined relative to a specified origin, which may be the lower/upper edge of the simulation box (in that dimension), or its center point, or a specified coordinate value. Starting at the origin, sufficient bins are created in both directions to completely span the simulation box or the bounds specified by the optional bounds keyword.  

For orthogonal simulation boxes, the bins are layers, pencils, or boxes aligned with the xyz coordinate axes. For triclinic (non-orthogonal) simulation boxes, the bin faces are parallel to the tilted faces of the simulation box. See the Howto triclinic page for a discussion of the geometry of triclinic boxes in LAMMPS. As described there, a tilted simulation box has edge vectors ${\vec{a}},{\vec{b}}$ , and ?. In that nomenclature, bins in the $x$ dimension have faces with normals in the ${\vec{b}}\times{\vec{c}}$ direction, bins in $y$ have faces normal to the ${\vec{a}}\times{\vec{c}}$ direction, and bins in $z$ have faces normal to the ${\vec{a}}\times{\vec{b}}$ direction. Note that in order to define the size and position of these bins in an unambiguous fashion, the units option must be set to reduced when using a triclinic simulation box, as noted below.  

The meaning of origin and delta for triclinic boxes is as follows. Consider a triclinic box with bins that are 1d layers or slabs in the x dimension. No matter how the box is tilted, an origin of 0.0 means start layers at the lower ${\vec{b}}\times{\vec{c}}$ plane of the simulation box and an origin of 1.0 means to start layers at the upper ${\vec{b}}\times{\vec{c}}$ face of the box. A delta value of 0.1 in reduced units means there will be 10 layers from 0.0 to 1.0, regardless of the current size or shape of the simulation box.  

The bin/sphere style defines a set of spherical shell bins around the origin (xorig,yorig,zorig), using nsbin bins with radii equally spaced between srmin and srmax. This is effectively a 1d vector of bins. For example, if srmin $=1.0$ and $s r m a x=10.0$ and $n s b i n=9$ , then the first bin spans $1.0<r<2.0$ , and the last bin spans $9.0<r<10.0$ . The geometry of the bins is the same whether the simulation box is orthogonal or triclinic (i.e., the spherical shells are not tilted or scaled differently in different dimensions to transform them into ellipsoidal shells).  

The bin/cylinder style defines bins for a cylinder oriented along the axis dim with the axis coordinates in the other two radial dimensions at $(c l,c2)$ . For $\dim=x.$ , $c_{1}/c_{2}=y/z$ ; for $\mathrm{dim}=y$ , $c_{1}/c_{2}=x/z$ ; for $\mathrm{dim}=z$ , $c_{1}/c_{2}=x/y$ . This is effectively a 2d array of bins. The first dimension is along the cylinder axis, the second dimension is radially outward from the cylinder axis. The bin size and positions along the cylinder axis are specified by the origin and delta values, the same as for the bin/1d, bin/2d, and bin/3d styles. There are ncbin concentric circle bins in the radial direction from the cylinder axis with radii equally spaced between crmin and crmax. For example, if crmin $=1.0$ and $c r m a x=10.0$ and $n c b i n=9$ , then the first bin spans $1.0<r<2.0$ and the last bin spans $9.0<r<10.0$ . The geometry of the bins in the radial dimensions is the same whether the simulation box is orthogonal or triclinic (i.e., the concentric circles are not tilted or scaled differently in the two different dimensions to transform them into ellipses).  

The created bins (and hence the chunk IDs) are numbered consecutively from 1 to the number of bins $=$ Nchunk. For $b i n2d$ and bin3d, the numbering varies most rapidly in the first dimension (which could be $x,y$ , or z), next rapidly in the second dimension, and most slowly in the third dimension. For bin/sphere, the bin with smallest radii is chunk 1 and the bin with largest radii is chunk Nchunk $=$ ncbin. For bin/cylinder, the numbering varies most rapidly in the dimension along the cylinder axis and most slowly in the radial direction.  

Each time this compute is invoked, each atom is mapped to a bin based on its current position. Note that between reneighboring timesteps, atoms can move outside the current simulation box. If the box is periodic (in that dimension) the atom is remapping into the periodic box for purposes of binning. If the box in not periodic, the atom may have moved outside the bounds of all bins. If an atom is not inside any bin, the discard keyword is used to determine how a chunk ID is assigned to the atom.  

The type style uses the atom type as the chunk ID. Nchunk is set to the number of atom types defined for the simulation (e.g., via the create_box or read_data commands).  

The molecule style uses the molecule ID of each atom as its chunk ID. Nchunk is set to the largest chunk ID. Note that this excludes molecule IDs for atoms which are not in the specified group or optional region.  

There is no requirement that all atoms in a particular molecule are assigned the same chunk ID (zero or non-zero), though you probably want that to be the case, if you wish to compute a per-molecule property. LAMMPS will issue a warning if that is not the case, but only the first time that Nchunk is calculated.  

Note that atoms with a molecule $\mathrm{ID}=0$ , which may be non-molecular solvent atoms, have an out-of-range chunk ID. These atoms are discarded (not assigned to any chunk) or assigned to Nchunk, depending on the value of the discard keyword.  

The compute/fix/variable styles set the chunk ID of each atom based on a quantity calculated and stored by a compute, fix, or variable. In each case, it must be a per-atom quantity. In each case the referenced floating point values are converted to an integer chunk ID as follows. The floating point value is truncated (rounded down) to an integer value. If the integer value is $\leq0$ , then a chunk ID of 0 is assigned to the atom. If the integer value is $>0$ , it becomes the chunk ID to the atom. Nchunk is set to the largest chunk ID. Note that this excludes atoms which are not in the specified group or optional region.  

If the style begins with “c_”, a compute ID must follow which has been previously defined in the input script. If no bracketed integer is appended, the per-atom vector calculated by the compute is used. If a bracketed integer is appended, the Ith column of the per-atom array calculated by the compute is used. Users can also write code for their own compute styles and add them to LAMMPS.  

If the style begins with “f_”, a fix ID must follow which has been previously defined in the input script. If no bracketed integer is appended, the per-atom vector calculated by the fix is used. If a bracketed integer is appended, the Ith column of the per-atom array calculated by the fix is used. Note that some fixes only produce their values on certain timesteps, which must be compatible with the timestep on which this compute accesses the fix, else an error results. Users can also write code for their own fix styles and add them to LAMMPS.  

If a value begins with $\begin{array}{r l}{\leftarrow}&{{}\mathrm{~\leftarrow~}\mathrm{~\rightarrow~}}\ {\mathrm{~\cup~}}&{{}\mathrm{~\underline{{~}}~}}\end{array}$ , a variable name for an atom or atomfile style variable must follow which has been previously defined in the input script. Variables of style atom can reference thermodynamic keywords and various per-atom attributes, or invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of generating per-atom quantities to treat as a chunk ID.  

Normally, Nchunk $=$ the number of chunks, is re-calculated every time this fix is invoked, though the value may or may not change. As explained below, the nchunk keyword can be set to once which means Nchunk will never change.  

If a fix ave/chunk command uses this compute, it can also turn off the re-calculation of Nchunk for one or more windows of timesteps. The extent of the windows, during which Nchunk is held constant, are determined by the Nevery, Nrepeat, Nfreq values and the ave keyword setting that are used by the fix ave/chunk command.  

Specifically, if $a\nu e=o n e$ , then for each span of Nfreq timesteps, Nchunk is held constant between the first timestep when averaging is done (within the Nfreq-length window), and the last timestep when averaging is done (multiple of Nfreq). If $a\nu e=$ running or window, then Nchunk is held constant forever, starting on the first timestep when the $f\alpha$ ave/chunk command invokes this compute.  

Note that multiple fix ave/chunk commands can use the same compute chunk/atom compute. However, the time windows they induce for holding Nchunk constant must be identical, else an error will be generated.  

The various optional keywords operate as follows. Note that some of them function differently or are ignored by different chunk styles. Some of them also have different default values, depending on the chunk style, as listed below.  

The region keyword applies to all chunk styles. If used, an atom must be in both the specified group and the specified geometric region to be assigned to a chunk.  

The nchunk keyword applies to all chunk styles. It specifies how often Nchunk is recalculated, which in turn can affect the chunk IDs assigned to individual atoms.  

If nchunk is set to once, then Nchunk is only calculated once, the first time this compute is invoked. If nchunk is set to every, then Nchunk is re-calculated every time the compute is invoked. Note that, as described above, the use of this compute by the fix ave/chunk command can override the every setting.  

The default values for nchunk are listed below and depend on the chunk style and other system and keyword settings. They attempt to represent typical use cases for the various chunk styles. The nchunk value can always be set explicitly if desired.  

The limit keyword can be used to limit the calculated value of Nchunk $=$ the number of chunks. The limit is applied each time Nchunk is calculated, which also limits the chunk IDs assigned to any atom. The limit keyword is used by all chunk styles except the binning styles, which ignore it. This is because the number of bins can be tailored using the bound keyword (described below) which effectively limits the size of Nchunk.  

If limit is set to $N c=0$ , then no limit is imposed on Nchunk, though the compress keyword can still be used to reduce Nchunk, as described below.  

If $N c>0$ , then the effect of the limit keyword depends on whether the compress keyword is also used with a setting of yes, and whether the compress keyword is specified before the limit keyword or after.  

In all cases, Nchunk is first calculated in the usual way for each chunk style, as described above.  

First, here is what occurs if compress yes is not set. If limit is set to Nc max, then Nchunk is reset to the smaller of Nchunk and $N c$ . If limit is set to Nc exact, then Nchunk is reset to Nc, whether the original Nchunk was larger or smaller than Nc. If Nchunk shrank due to the limit setting, then atom chunk $\mathrm{IDs}>$ Nchunk will be reset to 0 or Nchunk, depending on the setting of the discard keyword. If Nchunk grew, there will simply be some chunks with no atoms assigned to them.  

If compress yes is set, and the compress keyword comes before the limit keyword, the compression operation is performed first, as described below, which resets Nchunk. The limit keyword is then applied to the new Nchunk value, exactly as described in the preceding paragraph. Note that in this case, all atoms will end up with chunk $\mathrm{IDs}\leq N c$ , but their original values (e.g., molecule ID or compute/fix/variable) may have been $>N c$ , because of the compression operation.  

If compress yes is set, and the compress keyword comes after the limit keyword, then the limit value of $N c$ is applied first to the uncompressed value of Nchunk, but only if $N c<N c h u n k$ (whether Nc max or Nc exact is used). This effectively means all atoms with chunk $\mathrm{IDs}>N c$ have their chunk IDs reset to 0 or $N c$ , depending on the setting of the discard keyword. The compression operation is then performed, which may shrink Nchunk further. If the new Nchunk $<N c$ and limit $=N c$ exact is specified, then Nchunk is reset to $N c$ , which results in extra chunks with no atoms assigned to them. Note that in this case, all atoms will end up with chunk $\mathrm{IDs}\leq N c$ , and their original values (e.g., molecule ID or compute/fix/variable value) will also have been $\leq N c$ .  

The ids keyword applies to all chunk styles. If the setting is once then the chunk IDs assigned to atoms the first time this compute is invoked will be permanent, and never be re-computed.  

If the setting is nfreq and if a fix ave/chunk command is using this compute, then in each of the Nchunk $=$ constant time windows (discussed above), the chunk ID’s assigned to atoms on the first step of the time window will persist until the end of the time window.  

If the setting is every, which is the default, then chunk IDs are re-calculated on any timestep this compute is invoked.  

![](images/9f7b9803ca77f207393defed65a6d4359d004ad9aaa9ba09b9c86f746e14d6ea.jpg)  

# Note  

If you want the persistent chunk-IDs calculated by this compute to be continuous when running from a restart file, then you should use the same ID for this compute, as in the original run. This is so that the fix this compute creates to store per-atom quantities will also have the same ID, and thus be initialized correctly with chunk IDs from the restart file.  

The compress keyword applies to all chunk styles and affects how Nchunk is calculated, which in turn affects the chunk IDs assigned to each atom. It is useful for converting a “sparse” set of chunk IDs (with many IDs that have no atoms assigned to them), into a “dense” set of IDs, where every chunk has one or more atoms assigned to it.  

Two possible use cases are as follows. If a large simulation box is mostly empty space, then the binning style may produce many bins with no atoms. If compress is set to yes, only bins with atoms will be contribute to Nchunk. Likewise, the molecule or compute/fix/variable styles may produce large Nchunk values. For example, the compute cluster/atom command assigns every atom an atom ID for one of the atoms it is clustered with. For a million-atom system with 5 clusters, there would only be 5 unique chunk IDs, but the largest chunk ID might be 1 million, resulting in Nchunk $=1$ million. If compress is set to yes, Nchunk will be reset to 5.  

If compress is set to no, which is the default, no compression is done. If it is set to yes, all chunk IDs with no atoms are removed from the list of chunk IDs, and the list is sorted. The remaining chunk IDs are renumbered from 1 to Nchunk where Nchunk is the new length of the list. The chunk IDs assigned to each atom reflect the new renumbering from 1 to Nchunk.  

The original chunk IDs (before renumbering) can be accessed by the compute property/chunk command and its id keyword, or by the fix ave/chunk command which outputs the original IDs as one of the columns in its global output array. For example, using the “compute cluster/atom” command discussed above, the original 5 unique chunk IDs might be atom IDs (27,4982,58374,857838,1000000). After compression, these will be renumbered to (1,2,3,4,5). The original values (27,. . . ,1000000) can be output to a file by the fix ave/chunk command, or by using the fix ave/time command in conjunction with the compute property/chunk command.  

![](images/83dcf4b8da4ecfefa4085fbaa46f4009e3087d66477e2e63457d3db02288c977.jpg)  

# Note  

The compression operation requires global communication across all processors to share their chunk ID values. It can require large memory on every processor to store them, even after they are compressed, if there are a large number of unique chunk IDs with atoms assigned to them. It uses a STL map to find unique chunk IDs and store them in sorted order. Each time an atom is assigned a compressed chunk ID, it must access the STL map. All of this means that compression can be expensive, both in memory and CPU time. The use of the limit keyword in conjunction with the compress keyword can affect these costs, depending on which keyword is used first. So use this option with care.  

The discard keyword applies to all chunk styles. It affects what chunk IDs are assigned to atoms that do not match one of the valid chunk IDs from 1 to Nchunk. Note that it does not apply to atoms that are not in the specified group or optionally specified region. Those atoms are always assigned a chunk $\mathrm{ID}=0$ .  

If the calculated chunk ID for an atom is not within the range 1 to Nchunk then it is a “discard” atom. Note that Nchunk may have been shrunk by the limit keyword. Or the compress keyword may have eliminated chunk IDs that were valid before the compression took place, and are now not in the compressed list. Also note that for the molecule chunk style, if new molecules are added to the system, their chunk IDs may exceed a previously calculated Nchunk. Likewise, evaluation of a compute/fix/variable on a later timestep may return chunk IDs that are invalid for the previously calculated Nchunk.  

All the chunk styles except the binning styles, must use discard set to either yes or no. If discard is set to yes, which is the default, then every “discard” atom has its chunk ID set to 0. If discard is set to no, every “discard” atom has its chunk ID set to Nchunk. I.e. it becomes part of the last chunk.  

The binning styles use the discard keyword to decide whether to discard atoms outside the spatial domain covered by bins, or to assign them to the bin they are nearest to.  

For the bin/1d, bin/2d, bin/3d styles the details are as follows. If discard is set to yes, an out-of-domain atom will have its chunk ID set to 0. If discard is set to no, the atom will have its chunk ID set to the first or last bin in that dimension. If discard is set to mixed, which is the default, it will only have its chunk ID set to the first or last bin if bins extend to the simulation box boundary in that dimension. This is the case if the bound keyword settings are lower and upper, which is the default. If the bound keyword settings are numeric values, then the atom will have its chunk ID set to 0 if it is outside the bounds of any bin. Note that in this case, it is possible that the first or last bin extends beyond the numeric bounds settings, depending on the specified origin. If this is the case, the chunk ID of the atom is only set to 0 if it is outside the first or last bin, not if it is simply outside the numeric bounds setting.  

For the bin/sphere style the details are as follows. If discard is set to yes, an out-of-domain atom will have its chunk ID set to 0. If discard is set to no or mixed, the atom will have its chunk ID set to the first or last bin, i.e. the innermost or outermost spherical shell. If the distance of the atom from the origin is less than rmin, it will be assigned to the first bin. If the distance of the atom from the origin is greater than rmax, it will be assigned to the last bin.  

For the bin/cylinder style the details are as follows. If discard is set to yes, an out-of-domain atom will have its chunk ID set to 0. If discard is set to no, the atom will have its chunk ID set to the first or last bin in both the radial and axis dimensions. If discard is set to mixed, which is the default, the radial dimension is treated the same as for discard $=$ no. But for the axis dimension, it will only have its chunk ID set to the first or last bin if bins extend to the simulation box boundary in the axis dimension. This is the case if the bound keyword settings are lower and upper, which is the default. If the bound keyword settings are numeric values, then the atom will have its chunk ID set to 0 if it is outside the bounds of any bin. Note that in this case, it is possible that the first or last bin extends beyond the numeric bounds settings, depending on the specified origin. If this is the case, the chunk ID of the atom is only set to 0 if it is outside the first or last bin, not if it is simply outside the numeric bounds setting.  

If discard is set to no or mixed, the atom will have its chunk ID set to the first or last bin, i.e. the innermost or outermost spherical shell. If the distance of the atom from the origin is less than rmin, it will be assigned to the first bin. If the distance of the atom from the origin is greater than rmax, it will be assigned to the last bin.  

The bound keyword only applies to the bin/1d, bin/2d, bin/3d styles and to the axis dimension of the bin/cylinder style; otherwise it is ignored. It can be used one or more times to limit the extent of bin coverage in a specified dimension, i.e. to only bin a portion of the box. If the lo setting is lower or the hi setting is upper, the bin extent in that direction extends to the box boundary. If a numeric value is used for lo and/or hi, then the bin extent in the lo or hi direction extends only to that value, which is assumed to be inside (or at least near) the simulation box boundaries, though LAMMPS does not check for this. Note that using the bound keyword typically reduces the total number of bins and thus the number of chunks Nchunk.  

The pbc keyword only applies to the bin/sphere and bin/cylinder styles. If set to yes, the distance an atom is from the sphere origin or cylinder axis is calculated in a minimum image sense with respect to periodic dimensions, when determining which bin the atom is in. I.e. if $\mathbf{X}$ is a periodic dimension and the distance between the atom and the sphere center in the x dimension is greater than $0.5~^{*}$ simulation box length in x, then a box length is subtracted to give a distance $<0.5*$ simulation box length. This allosws the sphere or cylinder center to be near a box edge, and atoms on the other side of the periodic box will still be close to the center point/axis. Note that with a setting of yes, the outer sphere or cylinder radius must also be $<=0.5*$ simulation box length in any periodic dimension except for the cylinder axis dimension, or an error is generated.  

The units keyword only applies to the binning styles; otherwise it is ignored. For the bin/1d, bin/2d, bin/3d styles, it determines the meaning of the distance units used for the bin sizes delta and for origin and bounds values if they are coordinate values. For the bin/sphere style it determines the meaning of the distance units used for xorig,yorig,zorig and the radii srmin and srmax. For the bin/cylinder style it determines the meaning of the distance units used for delta,c1,c2 and the radii crmin and crmax.  

For orthogonal simulation boxes, any of the 3 options may be used. For non-orthogonal (triclinic) simulation boxes, only the reduced option may be used.  

A box value selects standard distance units as defined by the units command (e.g., $\textrm{\AA}$ for units $=$ real or metal). A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacing. A reduced value means normalized unitless values between 0 and 1, which represent the lower and upper faces of the simulation box respectively. Thus an origin value of 0.5 means the center of the box in any dimension. A delta value of 0.1 means 10 bins span the box in that dimension.  

Note that for the bin/sphere style, the radii srmin and srmax are scaled by the lattice spacing or reduced value of the $x$ dimension.  

Note that for the bin/cylinder style, the radii crmin and crmax are scaled by the lattice spacing or reduced value of the first dimension perpendicular to the cylinder axis (e.g., $y$ for an $x$ -axis cylinder, $x$ for a $y$ -axis cylinder, and $x$ for a $z$ -axis cylinder).  

# 3.13.4 Output info  

This compute calculates a per-atom vector (the chunk ID), which can be accessed by any command that uses per-atom values from a compute as input. It also calculates a global scalar (the number of chunks), which can be similarly accessed everywhere outside of a per-atom context. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values are unitless chunk IDs, ranging from 1 to Nchunk (inclusive) for atoms assigned to chunks, and 0 for atoms not belonging to a chunk. The scalar contains the value of Nchunk.  

# 3.13. compute chunk/atom command  

# 3.13.5 Restrictions  

Even if the nchunk keyword is set to once, the chunk IDs assigned to each atom are not stored in a restart files. This means you cannot expect those assignments to persist in a restarted simulation. Instead you must re-specify this command and assign atoms to chunks when the restarted simulation begins.  

# 3.13.6 Related commands  

fix ave/chunk, compute global/atom  

# 3.13.7 Default  

The option defaults are as follows:  

• region $=$ none   
• nchunk $=$ every, if compress is yes, overriding other defaults listed here   
• nchunk $=$ once, for type style   
• nchunk $=$ once, for mol style if region is none   
• nchunk $=$ every, for mol style if region is set   
• nchunk $=$ once, for binning style if the simulation box size is static or units $=$ reduced   
• nchunk $=$ every, for binning style if the simulation box size is dynamic and units is lattice or box   
• nchunk $=$ every, for compute/fix/variable style   
• ${\mathrm{limit}}=0$   
• ids $=$ every   
• compress $=$ no   
• discard $=$ yes, for all styles except binning   
• discard $=$ mixed, for binning styles   
• bound $=$ lower and upper in all dimensions   
$\bullet\mathrm{pbc}=\mathrm{no}$   
• units $=$ lattice  

# 3.14 compute chunk/spread/atom command  

# 3.14.1 Syntax  

compute ID group-ID chunk/spread/atom chunkID input1 input2 ...  

• ID, group-ID are documented in compute command • chunk/spread/atom $=$ style name of this compute command • chunkID $=\mathrm{ID}$ of compute chunk/atom command • one or more inputs can be listed • input $=\mathtt{c}$ _ID, c_ID[N], f_ID, f_ID[N]  

c_ID = global vector calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ column of global array calculated by a compute with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)   
$\mathrm{f\_ID=global}$ vector calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ column of global array calculated by a fix with ID, I can include wildcard (see below)  

# 3.14.2 Examples  

compute 1 all chunk/spread/atom mychunk c_com[\*] c_gyration  

# 3.14.3 Description  

Define a calculation that “spreads” one or more per-chunk values to each atom in the chunk. This can be useful in several scenarios:  

• For creating a dump file where each atom lists info about the chunk it is in, e.g. for post-processing purposes.   
• To access chunk value in atom-style variables that need info about the chunk each atom is in.   
• To use the fix ave/chunk command to spatially average per-chunk values calculated by a per-chunk compute.  

Examples are given below.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

For inputs that are computes, they must be a compute that calculates per-chunk values. These are computes whose style names end in “/chunk”.  

For inputs that are fixes, they should be a fix that calculates per-chunk values. For example, fix ave/chunk or fix ave/time (assuming it is time-averaging per-chunk data).  

For each atom, this compute accesses its chunk ID from the specified chunkID compute, then accesses the per-chunk value in each input. Those values are copied to this compute to become the output for that atom.  

The values generated by this compute will be 0.0 for atoms not in the specified compute group group-ID. They will also be 0.0 if the atom is not in a chunk, as assigned by the chunkID compute. They will also be 0.0 if the current chunk ID for the atom is out-of-bounds with respect to the number of chunks stored by a particular input compute or fix.  

![](images/7b3504469e4704ffc356ddb722b24fcbf160ae22327aa1f72bf714074b404a04.jpg)  

# Note  

LAMMPS does not check that a compute or fix which calculates per-chunk values uses the same definition of chunks as this compute. It’s up to you to be consistent. Likewise, for a fix input, LAMMPS does not check that it is per-chunk data. It only checks that the fix produces a global vector or array.  

Each listed input is operated on independently.  

If a bracketed index I is used, it can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or “\*n” or $\mathbf{\epsilon}_{\mathrm{n}}\prec\leftrightarrow$ or $\ '_{\mathrm{m}}\ast_{\mathrm{n}}\cdots$ . If $\Nu=$ the number of columns in the array, then an asterisk with no numeric values means all indices from 1 to N. A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from n to N (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual columns of the array had been listed one by one. E.g. these 2 compute chunk/spread/atom commands are equivalent, since the compute com/chunk command creates a per-atom array with 3 columns:  

compute com all com/chunk mychunk   
compute 10 all chunk/spread/atom mychunk c_com[\*]   
compute 10 all chunk/spread/atom mychunk c_com[1] c_com[2] c_com[3]  

Here is an example of writing a dump file the with the center-of-mass (COM) for the chunk each atom is in. The commands below can be added to the bench/in.chain script.  

<html><body><table><tr><td colspan="2">compute cmol all chunk com all com</td></tr><tr><td>compute</td><td>atom molecule chunk cmol</td></tr><tr><td>compute</td><td>comchunk all chunk atom cmol c_c [*] spread com</td></tr><tr><td rowspan="2">dump dump_1 modify</td><td>1 all custom 50 tmp.dump id mol type x y z c_comchunk[*]</td></tr><tr><td>1 sort id</td></tr></table></body></html>  

The same per-chunk data for each atom could be used to define per-atom forces for the fix addforce command. In this example the forces act to pull atoms of an extended polymer chain towards its COM in an attractive manner.  

<html><body><table><tr><td>compute variable</td><td>k equal 0.1</td></tr><tr><td>variable</td><td>fx atom v_k*(c_ comchunk[1]-c_prop[1])</td></tr><tr><td>variable</td><td>atom v_k*(c_ comchunk[2]-c _prop[2])</td></tr><tr><td>variable fz atom v_k*(c_ fix 3 all addforce v</td><td>comchunk[3]-c_prop[3])</td></tr></table></body></html>  

Note that compute property/atom is used to generate unwrapped coordinates for use in the per-atom force calculation, so that the effect of periodic boundaries is accounted for properly.  

Over time this applied force could shrink each polymer chain’s radius of gyration in a polymer mixture simulation. Here is output from the bench/in.chain script. Thermo output is shown for 1000 steps, where the last column is the average radius of gyration over all 320 chains in the 32000 atom system:  

<html><body><table><tr><td>compute gyr all gyration/chunk cmol variable ave equal ave(c_gyr) thermo_style</td><td>custom step etotal press v_ave</td></tr><tr><td></td><td></td></tr><tr><td>0 22.394765 4.6721833</td><td>5.128278</td></tr><tr><td>100 22.445002 4.8166709</td><td>5.0348372</td></tr><tr><td>200 22.500128 4.8790392 4.9364875</td><td></td></tr><tr><td>300 22.534686 4.9183766 4.8590693</td><td></td></tr><tr><td>400 22.557196 4.9492211</td><td>4.7937849</td></tr><tr><td>500 22.571017 4.9161853</td><td>4.7412008</td></tr><tr><td>600 22.573944</td><td>5.0229708 4.6931243</td></tr><tr><td>700 22.581804 5.0541301</td><td>4.6440647</td></tr><tr><td>800 22.584683 4.9691734 4.6000016</td><td></td></tr><tr><td>900 22.59128 1000 22.586832 4.94697</td><td>5.0247538 4.5611513 4.5238362</td></tr></table></body></html>  

Here is an example for using one set of chunks, defined for molecules, to compute the dipole moment vector for each chunk. E.g. for water molecules. Then spreading those values to each atom in each chunk. Then defining a second set of chunks based on spatial bins. And finally, using the fix ave/chunk command to calculate an average dipole moment vector per spatial bin.  

<html><body><table><tr><td>compute</td><td>cmol all chunk atommolecule</td></tr><tr><td>compute</td><td rowspan="2">dipole all dipole chunk cmol spread all chunk atom cmol c_( dipole[1] c _dipole[2] c_d dipole[3]</td></tr><tr><td>compute</td></tr><tr><td>compute cspatial all chunk</td><td>spread atom bin 1d z lower 0.1 units reduced</td></tr><tr><td>fix all ave</td><td>ave chunk 100 0101000 cspatial c_s spread[*]</td></tr></table></body></html>  

Note that the fix ave/chunk command requires per-atom values as input. That is why the compute chunk/spread/atom command is used to assign per-chunk values to each atom in the chunk. If a molecule straddles bin boundaries, each of its atoms contributes in a weighted manner to the average dipole moment of the spatial bin it is in.  

# 3.14.4 Output info  

This compute calculates a per-atom vector or array, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The output is a per-atom vector if a single input value is specified, otherwise a per-atom array is output. The number of columns in the array is the number of inputs provided. The per-atom values for the vector or each column of the array will be in whatever units the corresponding input value is in.  

The vector or array values are “intensive”.  

# 3.14.5 Restrictions  

none  

# 3.14.6 Related commands  

compute chunk/atom, fix ave/chunk, compute reduce/chunk  

# 3.14.7 Default  

none  

3.15 compute cluster/atom command  

3.16 compute fragment/atom command  

3.17 compute aggregate/atom command  

# 3.17.1 Syntax  

compute ID group-ID cluster/atom cutoff compute ID group-ID fragment/atom keyword value ... compute ID group-ID aggregate/atom cutoff  

• ID, group-ID are documented in compute command • cluster/atom or fragment/atom or aggregate/atom $=$ style name of this compute command • cutof $=$ distance within which to label atoms as part of same cluster (distance units)  

# 3.15. compute cluster/atom command  

• zero or more keyword/value pairs may be appended to fragment/atom • keyword $=$ single single value $=$ yes or no to treat single atoms (no bonds) as fragments  

# 3.17.2 Examples  

compute 1 all cluster/atom 3.5 compute 1 all fragment/atom compute 1 all fragment/atom single no compute 1 all aggregate/atom 3.5  

# 3.17.3 Description  

Define a computation that assigns each atom a cluster, fragment, or aggregate ID. Only atoms in the compute group are clustered and assigned cluster IDs. Atoms not in the compute group are assigned an $\mathrm{ID}=0$ .  

A cluster is defined as a set of atoms, each of which is within the cutoff distance from one or more other atoms in the cluster. If an atom has no neighbors within the cutoff distance, then it is a 1-atom cluster.  

A fragment is similarly defined as a set of atoms, each of which has a bond to another atom in the fragment. Bonds can be defined initially via the data file or create_bonds commands, or dynamically by fixes which create or break bonds like fix bond/react, fix bond/create, fix bond/swap, or fix bond/break. The cluster ID or fragment ID of every atom in the cluster will be set to the smallest atom ID of any atom in the cluster or fragment, respectively.  

For the fragment/atom style, the single keyword determines whether single atoms (not bonded to another atom) are treated as one-atom fragments or not, based on the yes or no setting. If the setting is no (the default), their fragment IDs are set to 0.  

An aggregate is defined by combining the rules for clusters and fragments (i.e., a set of atoms, where each of them is within the cutoff distance from one or more atoms within a fragment that is part of the same cluster). This measure can be used to track molecular assemblies like micelles.  

For computes cluster/atom and aggregate/atom a neighbor list needed to compute cluster IDs is constructed each time the compute is invoked. Thus it can be inefficient to compute/dump this quantity too frequently or to have multiple cluster/atom or aggregate/atom style computes.  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this fix uses the neighbor list, it also means those pairs will not be included when computing the clusters. This does not apply when using long-range coulomb (coul/long, coul/msm, coul/wolf or similar. One way to get around this would be to set special_bond scaling factors to very tiny numbers that are not exactly zero (e.g., $1.0\times10^{-50}$ ). Another workaround is to write a dump file and use the rerun command to compute the clusters for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

![](images/8d0ae2cbec5270ecfa7acf8efcc7edb4a70d5a4d99d25a27b8938ce6d127f05a.jpg)  

# Note  

For the compute fragment/atom style, each fragment is identified using the current bond topology. This will not account for bonds broken by the bond_style quartic command because it does not perform a full update of the bond topology data structures within LAMMPS.  

# 3.17.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be an $\mathrm{ID}>0$ , as explained above.  

# 3.17.5 Restrictions  

none  

# 3.17.6 Related commands  

compute coord/atom  

# 3.17.7 Default  

The default for fragment/atom is single $\asymp$ no.  

# 3.18 compute cna/atom command  

# 3.18.1 Syntax  

compute ID group-ID cna/atom cutoff  

• ID, group-ID are documented in compute command • cna/atom $=$ style name of this compute command • cutof $=$ cutoff distance for nearest neighbors (distance units)  

# 3.18.2 Examples  

FCC and HCP crystals, 14 nearest neighbors for perfect BCC crystals). These formulas can be used to obtain a good cutoff distance:  

$$
\begin{array}{c}{{r_{c}^{\mathrm{fcc}}=\displaystyle\frac{1}{2}\left(\displaystyle\frac{\sqrt{2}}{2}+1\right)a\approx0.8536a}}\ {{{}}}\ {{r_{c}^{\mathrm{bcc}}=\displaystyle\frac{1}{2}(\sqrt{2}+1)a\approx1.207a}}\ {{{}}}\ {{r_{c}^{\mathrm{hep}}=\displaystyle\frac{1}{2}\left(1+\sqrt{\displaystyle\frac{4+2x^{2}}{3}}\right)a}}\end{array}
$$  

where $a$ is the lattice constant for the crystal structure concerned and in the HCP case, $x=(c/a)/1.633$ , where 1.633 is the ideal $c/a$ for HCP crystals.  

Also note that since the CNA calculation in LAMMPS uses the neighbors of an owned atom to find the nearest neighbors of a ghost atom, the following relation should also be satisfied:  

$$
r_{c}+r_{s}>2*\mathrm{cutoff}
$$  

where $r_{c}$ is the cutoff distance of the potential, $r_{s}$ is the skin distance as specified by the neighbor command, and cutoff is the argument used with the compute cna/atom command. LAMMPS will issue a warning if this is not the case.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (e.g. each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently or to have multiple compute/dump commands, each with a cna/atom style.  

# 3.18.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be a number from 0 to 5, as explained above.  

# 3.18.5 Restrictions  

none  

# 3.18.6 Related commands  

compute centro/atom  

# 3.18.7 Default  

none  

(Faken) Faken, Jonsson, Comput Mater Sci, 2, 279 (1994).   
(Tsuzuki) Tsuzuki, Branicio, Rino, Comput Phys Comm, 177, 518 (2007).  

# 3.19 compute cnp/atom command  

# 3.19.1 Syntax  

compute ID group-ID cnp/atom cutoff  

• ID, group-ID are documented in compute command • cnp/atom $=$ style name of this compute command • cutof $=$ cutoff distance for nearest neighbors (distance units)  

# 3.19.2 Examples  

# 3.19.3 Description  

Define a computation that calculates the Common Neighborhood Parameter (CNP) for each atom in the group. In solidstate systems the CNP is a useful measure of the local crystal structure around an atom and can be used to characterize whether the atom is part of a perfect lattice, a local defect (e.g., a dislocation or stacking fault), or at a surface.  

The value of the CNP parameter will be 0.0 for atoms not in the specified compute group. Note that normally a CNP calculation should only be performed on single component systems.  

This parameter is computed using the following formula from (Tsuzuki)  

$$
Q_{i}=\frac{1}{n_{i}}\sum_{j=1}^{n_{i}}\left\|\sum_{k=1}^{n_{i j}}\vec{R}_{i k}+\vec{R}_{j k}\right\|^{2}
$$  

where the index $j$ goes over the $n_{i}$ nearest neighbors of atom $i$ , and the index $k$ goes over the $n_{i j}$ common nearest neighbors between atom $i$ and atom $j$ . $\vec{R}_{i k}$ and $\vec{R}_{j k}$ are the vectors connecting atom $k$ to atoms $i$ and $j$ . The quantity in the double sum is computed for each atom.  

The CNP calculation is sensitive to the specified cutoff value. You should ensure that the appropriate nearest neighbors of an atom are found within the cutoff distance for the presumed crystal structure. E.g. 12 nearest neighbor for perfect FCC and HCP crystals, 14 nearest neighbors for perfect BCC crystals. These formulas can be used to obtain a good cutoff distance:  

$$
\begin{array}{c}{{r_{c}^{\mathrm{fcc}}=\displaystyle\frac{1}{2}\left(\displaystyle\frac{\sqrt{2}}{2}+1\right)a\approx0.8536a}}\ {{{}}}\ {{r_{c}^{\mathrm{bcc}}=\displaystyle\frac{1}{2}(\sqrt{2}+1)a\approx1.207a}}\ {{{}}}\ {{r_{c}^{\mathrm{hcp}}=\displaystyle\frac{1}{2}\left(1+\sqrt{\displaystyle\frac{4+2x^{2}}{3}}\right)a}}\end{array}
$$  

where $a$ is the lattice constant for the crystal structure concerned and in the HCP case, $x=(c/a)/1.633$ , where 1.633 is the ideal $c/a$ for HCP crystals.  

Also note that since the CNP calculation in LAMMPS uses the neighbors of an owned atom to find the nearest neighbors of a ghost atom, the following relation should also be satisfied:  

$$
r_{c}+r_{s}>2*\mathrm{cutoff}
$$  

where $r_{c}$ is the cutoff distance of the potential, $r_{s}$ is the skin distance as specified by the neighbor command, and cutoff is the argument used with the compute cnp/atom command. LAMMPS will issue a warning if this is not the case.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (e.g., each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently or to have multiple compute/dump commands, each with a cnp/atom style.  

# 3.19.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be real positive numbers. Some typical CNP values:  

<html><body><table><tr><td>FCC lattice = 0.0</td></tr><tr><td>BCC lattice = 0.0</td></tr><tr><td>HCP lattice = 4.4</td></tr><tr><td></td></tr><tr><td>FCC (111) surface = 13.0</td></tr><tr><td>FCC (100) surface = 26.5</td></tr><tr><td>FCC dislocation core = 11</td></tr></table></body></html>  

# 3.19.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.19.6 Related commands  

compute cna/atom compute centro/atom  

# 3.19.7 Default  

none  

(Tsuzuki) Tsuzuki, Branicio, Rino, Comput Phys Comm, 177, 518 (2007).  

# 3.20 compute com command  

# 3.20.1 Syntax  

# compute ID group-ID com  

• ID, group-ID are documented in compute command • $\mathrm{com}=$ style name of this compute command  

# 3.20.2 Examples  

# Note  

The coordinates of an atom contribute to the center-of-mass in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

# 3.20.4 Output info  

This compute calculates a global vector of length 3, which can be accessed by indices 1–3 by any command that uses global vector values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The vector values are “intensive”. The vector values will be in distance units.  

# 3.20.5 Restrictions  

none  

# 3.20.6 Related commands  

compute com/chunk  

# 3.20.7 Default  

none  

# 3.21 compute com/chunk command  

# 3.21.1 Syntax  

compute ID group-ID com/chunk chunkID  

• ID, group-ID are documented in compute command • com/chunk $=$ style name of this compute command • chunkID $=$ ID of compute chunk/atom command  

# 3.21.2 Examples  

compute 1 fluid com/chunk molchunk  

# 3.21.3 Description  

Define a computation that calculates the center-of-mass for multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

This compute calculates the $(x,y,z)$ coordinates of the center of mass for each chunk, which includes all effects due to atoms passing through periodic boundaries.  

# 3.21. compute com/chunk command  

Note that only atoms in the specified group contribute to the calculation. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

![](images/632f922155cabeb3c322b5a79b6c4e175e03a0022ac74cd33dd41c86cfebf123.jpg)  

# Note  

The coordinates of an atom contribute to the chunk’s center-of-mass in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

The simplest way to output the results of the compute com/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule   
compute myChunk all com/chunk cc1   
fix 1 all ave/time 100 1 100 c_myChunk[\*] file tmp.out mode vector  

# 3.21.4 Output info  

This compute calculates a global array where the number of rows $=$ the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The number of columns is 3 for the $(x,y,z)$ center-of-mass coordinates of each chunk. These values can be accessed by any command that uses global array values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The array values are “intensive”. The array values will be in distance units.  

# 3.21.5 Restrictions  

none  

# 3.21.6 Related commands  

compute com  

# 3.21.7 Default  

none  

# 3.22 compute composition/atom command  

Accelerator Variants: composition/atom/kk  

# 3.22.1 Syntax  

compute ID group-ID composition/atom keyword values ...  

• ID, group-ID are documented in compute command • composition/atom $=$ style name of this compute command one or more keyword/value pairs may be appended  

keyword $=$ cutoff cutoff value $=$ distance cutoff  

# 3.22.2 Examples  

compute 1 all composition/atom compute 1 all composition/atom cutoff 9.0 comm_modify cutoff 9.0  

# 3.22.3 Description  

Added in version 21Nov2023.  

Define a computation that calculates a local composition vector for each atom. For a central atom with $M$ neighbors within the neighbor cutoff sphere, composition is defined as the number of atoms of a given type (including the central atom) divided by $(M+1)$ . For a given central atom, the sum of all compositions equals one.  

# Note  

This compute uses the number of atom types, not chemical species, assigned in pair_coeff command. If an interatomic potential has two species (i.e., Cu and Ni) assigned to four different atom types in pair_coeff (i.e., ‘Cu Cu Ni Ni’), the compute will output four fractional values. In those cases, the user may desire an extra calculation step to consolidate per-type fractions into per-species fractions. This calculation can be conducted within LAMMPS using another compute such as compute reduce, an atom-style variable command, or as a post-processing step.  

The optional keyword cutoff defines the distance cutoff used when searching for neighbors. The default value is the cutoff specified by the pair style. If no pair style is defined, then a cutoff must be defined using this keyword. If the specified cutoff is larger than that of the pair_style plus neighbor skin (or no pair style is defined), the comm_modify cutoff option must also be set to match that of the cutoff keyword.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (i.e. each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently.  

![](images/c14b5dd58504c4b9d5cf22a466af2221c123a1b05c3789445e1af60c965c0c54.jpg)  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this compute uses the neighbor list, it also means those pairs will not be included in the order parameter. This difficulty can be circumvented by writing a dump file, and using the rerun command to compute the order parameter for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.22.4 Output info  

This compute calculates a per-atom array with $1+N$ columns, where $N$ is the number of atom types. The first column is a count of the number of atoms used to calculate composition (including the central atom), and each subsequent column indicates the fraction of that atom type within the cutoff sphere.  

These values can be accessed by any command that uses per-atom values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

# 3.22.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

This compute requires neighbor styles ‘bin’ or ‘nsq’.  

# 3.22.6 Related commands  

comm_modify  

# 3.22.7 Default  

The option defaults are cutoff $=$ pair style cutoff.  

# 3.23 compute contact/atom command  

# 3.23.1 Syntax  

compute ID group-ID contact/atom group2-ID  

• ID, group-ID are documented in compute command   
• contact/atom $=$ style name of this compute command   
• group2-ID $=$ optional argument to restrict which atoms to consider for contacts (see below)  

# 3.23.2 Examples  

compute 1 all contact/atom compute 1 all contact/atom mygroup  

# 3.23.3 Description  

Define a computation that calculates the number of contacts for each atom in a group.  

The contact number is defined for finite-size spherical particles as the number of neighbor atoms which overlap the central particle, meaning that their distance of separation is less than or equal to the sum of the radii of the two particles.  

The value of the contact number will be 0.0 for atoms not in the specified compute group.  

The optional group2- $\mathbf{\nabla}\cdot I D$ argument allows to specify from which group atoms contribute to the coordination number Default setting is group ‘all’.  

# 3.23.4 Output info  

This compute calculates a per-atom vector, whose values can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be a number $\ge0.0$ , as explained above.  

# 3.23.5 Restrictions  

This compute is part of the GRANULAR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This compute requires that atoms store a radius as defined by the atom_style sphere command.  

# 3.23.6 Related commands  

compute coord/atom  

# 3.23.7 Default  

group2- $.I D=$ all  

# 3.24 compute coord/atom command  

Accelerator Variants: coord/atom/kk  

# 3.24.1 Syntax  

compute ID group-ID coord/atom style args ...  

• ID, group-ID are documented in compute command   
• coord/atom $=$ style name of this compute command   
• style $=$ cutoff or orientorder cutoff args $=$ cutoff [group group2-ID] typeN cutof $=$ distance within which to count coordination neighbors (distance units) group group2-ID $=$ select group-ID to restrict which atoms to consider for coordination number␣ $\hookrightarrow$ (optional) typeN $=$ atom type for Nth coordination count (see asterisk form below) orientorder args $=$ orientorderID threshold orientorderID = ID of an orientorder/atom compute threshold = minimum value of the product of two "connected" atoms  

# 3.24.2 Examples  

compute 1 all coord/atom cutoff 2.0 compute 1 all coord/atom cutoff 6.0 1 2 compute 1 all coord/atom cutoff 6.0 2\*4 5\*8 \* compute 1 solute coord/atom cutoff 2.0 group solvent compute 1 all coord/atom orientorder 2 0.5  

# 3.24.3 Description  

This compute performs calculations between neighboring atoms to determine a coordination value. The specific calculation and the meaning of the resulting value depend on the cstyle keyword used.  

The cutoff cstyle calculates one or more traditional coordination numbers for each atom. A coordination number is defined as the number of neighbor atoms with specified atom type(s), and optionally within the specified group, that are within the specified cutoff distance from the central atom. The compute group selects only the central atoms; all neighboring atoms, unless selected by type, type range, or group option, are included in the coordination number tally.  

The optional group keyword allows to specify from which group atoms contribute to the coordination number. Default setting is group ‘all.’  

The typeN keywords allow specification of which atom types contribute to each coordination number. One coordination number is computed for each of the typeN keywords listed. If no typeN keywords are listed, a single coordination number is calculated, which includes atoms of all types (same as the “\*” format, see below).  

The typeN keywords can be specified in one of two ways. An explicit numeric value can be used, as in the second example above. Or a wild-card asterisk can be used to specify a range of atom types. This takes the form “\*” or $\mathbf{\overline{{\rho}}}^{\mathbf{6}\mathbf{*}}\mathbf{\overline{{n}}}^{\mathbf{,}\mathbf{,}}$ or $\cdot_{\mathrm{m}}{\ast}{\cdot}$ or $\ '_{\mathrm{m}}\ast_{\mathrm{n}}\cdots$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

The orientorder cstyle calculates the number of “connected” neighbor atoms $j$ around each central atom i. For this cstyle, connected is defined by the orientational order parameter calculated by the compute orientorder/atom command. This cstyle thus allows one to apply the ten Wolde’s criterion to identify crystal-like atoms in a system, as discussed in ten Wolde.  

The ID of the previously specified compute orientorder/atom command is specified as orientorderID. The compute must invoke its components option to calculate components of the Ybar_lm vector for each atoms, as described in its documentation. Note that orientorder/atom compute defines its own criteria for identifying neighboring atoms. If the scalar product $(Y b a r\_l m(i),Y b a r\_l m(j))$ , calculated by the orientorder/atom compute is larger than the specified threshold, then $i$ and $j$ are connected, and the coordination value of $i$ is incremented by one.  

For all cstyle settings, all coordination values will be 0.0 for atoms not in the specified compute group.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (i.e., each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently.  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this fix uses the neighbor list, it also means those pairs will not be included in the coordination count. One way to get around this, is to write a dump file, and use the rerun command to compute the coordination for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.24.4 Output info  

For cstyle cutoff, this compute can calculate a per-atom vector or array. If single type1 keyword is specified (or if none are specified), this compute calculates a per-atom vector. If multiple typeN keywords are specified, this compute calculates a per-atom array, with $N$ columns.  

For cstyle orientorder, this compute calculates a per-atom vector.  

These values can be accessed by any command that uses per-atom values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The per-atom vector or array values will be a number $\ge0.0$ , as explained above.  

# 3.24.5 Restrictions  

none  

# 3.24.6 Related commands  

compute cluster/atom compute orientorder/atom  

# 3.24.7 Default  

group $=$ all  

(tenWolde) P. R. ten Wolde, M. J. Ruiz-Montero, D. Frenkel, J. Chem. Phys. 104, 9932 (1996).  

# 3.25 compute count/type command  

# 3.25.1 Syntax  

compute ID group-ID count/type mode  

• ID, group-ID are documented in compute command • count/type $=$ style name of this compute command • mode $=$ atom or bond or angle or dihedral or improper  

# 3.25.2 Examples  

compute 1 all count/type atom compute 1 flowmols count/type bond  

# 3.25. compute count/type command  

# 3.25.3 Description  

Added in version 15Jun2023.  

Define a computation that counts the current number of atoms for each atom type. Or the number of bonds (angles, dihedrals, impropers) for each bond (angle, dihedral, improper) type.  

The former can be useful if atoms are added to or deleted from the system in random ways, e.g. via the fix deposit, fix pour, or fix evaporate commands. The latter can be useful in reactive simulations where molecular bonds are broken or created, as well as angles, dihedrals, impropers.  

Note that for this command, bonds (angles, etc) are the topological kind enumerated in a data file, initially read by the read_data command or defined by the molecule command. They do not refer to implicit bonds defined on-the-fly by bond-order or reactive pair styles based on the current conformation of small clusters of atoms.  

These commands can turn off topological bonds (angles, etc) by setting their bond (angle, etc) types to negative values This command includes the turned-off bonds (angles, etc) in the count for each type:  

• fix shake • delete_bonds  

These commands can create and/or break topological bonds (angles, etc). In the case of breaking, they remove the bond (angle, etc) from the system, so that they no longer exist (bond_style quartic and BPM bond styles are exceptions, see the discussion below). Thus they are not included in the counts for each type:  

• delete_bonds remove   
• bond_style quartic   
• fix bond/react   
• fix bond/create   
• fix bond/break   
• BPM package bond styles  

If the mode setting is atom then the count of atoms for each atom type is tallied. Only atoms in the specified group are counted.  

The atom count for each type can be normalized by the total number of atoms like so:  

compute typevec all count/type atom $\#$ number of atoms of each type variable normtypes vector c_typevec/atoms $\#$ divide by total number of atoms variable ntypes equal extract_setting(ntypes) # number of atom types thermo_style custom step v_normtypes[\*\${ntypes}] # vector variable needs upper limit  

Similarly, bond counts can be normalized by the total number of bonds. The same goes for angles, dihedrals, and impropers (see below).  

If the mode setting is bond then the count of bonds for each bond type is tallied. Only bonds with both atoms in the specified group are counted.  

For $m o d e=b o n d$ , broken bonds with a bond type of zero are also counted. The bond_style quartic and BPM bond styles break bonds by doing this. See the Howto broken bonds doc page for more details. Note that the group setting is ignored for broken bonds; all broken bonds in the system are counted.  

If the mode setting is angle then the count of angles for each angle type is tallied. Only angles with all 3 atoms in the specified group are counted.  

If the mode setting is dihedral then the count of dihedrals for each dihedral type is tallied. Only dihedrals with all 4 atoms in the specified group are counted.  

If the mode setting is improper then the count of impropers for each improper type is tallied. Only impropers with all 4 atoms in the specified group are counted.  

# 3.25.4 Output info  

This compute calculates a global vector of counts. If the mode is atom or bond or angle or dihedral or improper, then the vector length is the number of atom types or bond types or angle types or dihedral types or improper types, respectively.  

If the mode is bond this compute also calculates a global scalar which is the number of broken bonds with type $=0$ , as explained above.  

These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar and vector values calculated by this compute are both “intensive”.  

# 3.25.5 Restrictions  

none  

# 3.25.6 Related commands  

none  

# 3.25.7 Default  

none  

# 3.26 compute damage/atom command  

# 3.26.1 Syntax  

compute ID group-ID damage/atom  

• ID, group-ID are documented in compute command • damage/atom $=$ style name of this compute command  

# 3.26.2 Examples  

# 3.26.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values are unitless numbers (damage) $\ge0.0$  

# 3.26.5 Restrictions  

This compute is part of the PERI package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.26.6 Related commands  

compute dilatation/atom, compute plasticity/atom  

# 3.26.7 Default  

none  

# 3.27 compute dihedral command  

# 3.27.1 Syntax  

compute ID group-ID dihedral  

• ID, group-ID are documented in compute command • dihedral $=$ style name of this compute command  

# 3.27.2 Examples  

# 3.27.5 Restrictions  

none  

# 3.27.6 Related commands  

compute pe, compute pair  

# 3.27.7 Default  

none  

# 3.28 compute dihedral/local command  

# 3.28.1 Syntax  

compute ID group-ID dihedral/local value1 value2 ... keyword args ...  

• ID, group-ID are documented in compute command   
• dihedral/local $=$ style name of this compute command   
• one or more values may be appended   
• value $=p h i$ or v_name phi $=$ tabulate dihedral angles v_name $=$ equal-style variable with name (see below)   
• zero or more keyword/args pairs may be appended   
• keyword = set set $\mathrm{args=phi}$ name phi $=$ only currently allowed arg name $=$ name of variable to set with phi  

# 3.28.2 Examples  

<html><body><table><tr><td>compute 1 all dihedral/local phi</td></tr><tr><td>compute 1 all dihedral/local phi v_cos set phi p</td></tr><tr><td></td></tr></table></body></html>  

# 3.28.3 Description  

Define a computation that calculates properties of individual dihedral interactions. The number of datums generated, aggregated across all processors, equals the number of dihedral angles in the system, modified by the group parameter as explained below.  

The value phi $(\phi)$ is the dihedral angle, as defined in the diagram on the dihedral_style doc page.  

The value $\nu_{,}$ _name can be used together with the set keyword to compute a user-specified function of the dihedral angle $\phi$ . The name specified for the $\nu.$ _name value is the name of an equal-style variable which should evaluate a formula based on a variable which will store the angle $\phi$ . This other variable must be an internal-style variable defined in the input script; its initial numeric value can be anything. It must be an internal-style variable, because this command resets its value directly. The set keyword is used to identify the name of this other variable associated with $\phi$ .  

Note that the value of $\phi$ for each angle which stored in the internal variable is in radians, not degrees.  

# 3.28. compute dihedral/local command  

As an example, these commands can be added to the bench/in.rhodo script to compute the cos $\phi$ and $\cos^{2}\phi$ of every dihedral angle in the system and output the statistics in various ways:  

variable p internal 0.0   
variable cos equal cos(v_p)   
variable cossq equal $\cos(\mathrm{v\_p)^{*}c o s(\mathrm{v\_p)}}$   
compute 1 all property/local datom1 datom2 datom3 datom4 dtype   
compute 2 all dihedral/local phi v_cos v_cossq set phi p   
dump 1 all local 100 tmp.dump $\mathrm{~c~}_{-}1[^{*}]\mathrm{~c~}_{-}2[^{*}]$   
compute 3 all reduce ave $\mathrm{c\_2[{^*}]}$ inputs local   
thermo_style custom step temp press $\mathrm{~c~}_{-}3[{}^{*}]$   
fix 10 all ave/histo 10 10 100 -1 1 20 c_2[2] mode vector file tmp.histo  

The dump local command will output the angle $(\phi)$ , $\cos(\phi)$ , and $\cos^{2}(\phi)$ for every dihedral in the system. The thermo_style command will print the average of those quantities via the compute reduce command with thermo output. And the fix ave/histo command will histogram the cosine(angle) values and write them to a file.  

The local data stored by this command is generated by looping over all the atoms owned on a processor and their dihedrals. A dihedral will only be included if all four atoms in the dihedral are in the specified compute group.  

Note that as atoms migrate from processor to processor, there will be no consistent ordering of the entries within the local vector or array from one timestep to the next. The only consistency that is guaranteed is that the ordering on a particular timestep will be the same for local vectors or arrays generated by other compute commands. For example, dihedral output from the compute property/local command can be combined with data from this command and output by the dump local command in a consistent way.  

Here is an example of how to do this:  

<html><body><table><tr><td>compute 2 all dihedral/local phi dump []  [1  [1  [1  []1  [1]1  xu dnpd 001 ol e 1 </td></tr></table></body></html>  

# 3.28.4 Output info  

This compute calculates a local vector or local array depending on the number of values. The length of the vector or number of rows in the array is the number of dihedrals. If a single value is specified, a local vector is produced. If two or more values are specified, a local array is produced where the number of columns is equal to the number of values. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The output for phi will be in degrees.  

# 3.28.5 Restrictions  

none  

# 3.28.6 Related commands  

dump local, compute property/local  

# 3.28.7 Default  

none  

# 3.29 compute dilatation/atom command  

# 3.29.1 Syntax  

compute ID group-ID dilatation/atom  

• ID, group-ID are documented in compute command • dilatation/atom $=$ style name of this compute command  

# 3.29.2 Examples  

# 3.29.3 Description  

Define a computation that calculates the per-atom dilatation for each atom in a group. This is a quantity relevant for Peridynamics models. See this document for an overview of LAMMPS commands for Peridynamics modeling.  

For small deformation, dilatation of is the measure of the volumetric strain.  

The dilatation θ for each peridynamic particle $i$ is calculated as a sum over its neighbors with unbroken bonds, where the contribution of the $i j$ pair is a function of the change in bond length (versus the initial length in the reference state), the volume fraction of the particles and an influence function. See the Peridynamics Howto for a formal definition of dilatation.  

This command can only be used with a subset of the Peridynamic pair styles: peri/lps, peri/ves, and peri/eps.  

The dilatation value will be 0.0 for atoms not in the specified compute group.  

# 3.29.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values are unitless numbers $\begin{array}{r}{\theta\ge0.0,\quad}\end{array}$ ).  

# 3.29.5 Restrictions  

This compute is part of the PERI package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.29.6 Related commands  

compute damage/atom, compute plasticity/atom  

# 3.29.7 Default  

none  

# 3.30 compute dipole command  

# 3.31 compute dipole/tip4p command  

# 3.31.1 Syntax  

compute ID group-ID style arg  

• ID, group-ID are documented in compute command   
• style $=$ dipole or dipole/tip4p   
• arg $=$ mass or geometry $=$ use COM or geometric center for charged chunk correction (optional)  

# 3.31.2 Examples  

compute 1 fluid dipole compute dw water dipole geometry compute dw water dipole/tip4p  

# 3.31.3 Description  

Define a computation that calculates the dipole vector and total dipole for a group of atoms.  

These computes calculate the x,y,z coordinates of the dipole vector and the total dipole moment for the atoms in the compute group. This includes all effects due to atoms passing through periodic boundaries. For a group with a net charge the resulting dipole is made position independent by subtracting the position vector of the center of mass or geometric center times the net charge from the computed dipole vector. Both per-atom charges and per-atom dipole moments, if present, contribute to the computed dipole.  

Added in version 28Mar2023.  

Compute dipole/tip4 $\boldsymbol{:}p$ includes adjustments for the charge carrying point M in molecules with TIP4P water geometry.   
The corresponding parameters are extracted from the pair style.  

![](images/f549b41e468690d75e543a7860deb7e1031b5dc9b5599876c3b664ce8899394d.jpg)  

# Note  

The coordinates of an atom contribute to the dipole in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

# 3.31.4 Output info  

These computes calculate a global scalar containing the magnitude of the computed dipole moment and a global vector of length 3 with the dipole vector. See the Howto output page for an overview of LAMMPS output options.  

The computed values are “intensive”. The array values will be in dipole units (i.e., charge units times distance units).  

# 3.31.5 Restrictions  

Compute style dipole/tip4p is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Compute style dipole/tip4p can only be used with tip4p pair styles.  

# 3.31.6 Related commands  

compute dipole/chunk  

# 3.31.7 Default  

Using the center of mass is the default setting for the net charge correction.  

3.32 compute dipole/chunk command  

# 3.33 compute dipole/tip4p/chunk command  

# 3.33.1 Syntax  

compute ID group-ID style chunkID arg  

• ID, group-ID are documented in compute command   
• style $=$ dipole/chunk or dipole/tip4p/chunk   
• chunkID $=$ ID of compute chunk/atom command   
• arg $=$ mass or geometry $=$ use COM or geometric center for charged chunk correction (optional)  

# 3.33.2 Examples  

compute 1 fluid dipole/chunk molchunk compute dw water dipole/chunk 1 geometry  

# 3.33.3 Description  

Define a computation that calculates the dipole vector and total dipole for multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

These computes calculate the $(x,y,z)$ coordinates of the dipole vector and the total dipole moment for each chunk, which includes all effects due to atoms passing through periodic boundaries. For chunks with a net charge the resulting dipole is made position independent by subtracting the position vector of the center of mass or geometric center times the net charge from the computed dipole vector. Both per-atom charges and per-atom dipole moments, if present, contribute to the computed dipole.  

Added in version 28Mar2023.  

Compute dipole/tip4p/chunk includes adjustments for the charge carrying point M in molecules with TIP4P water geometry. The corresponding parameters are extracted from the pair style.  

Note that only atoms in the specified group contribute to the calculation. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

# Note  

The coordinates of an atom contribute to the chunk’s dipole in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

The simplest way to output the results of the compute com/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule   
compute myChunk all dipole/chunk cc1   
fix 1 all ave/time 100 1 100 c_myChunk[\*] file tmp.out mode vector  

# 3.33.4 Output info  

These computes calculate a global array where the number of rows $=$ the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The number of columns is 4 for the $(x,y,z)$ dipole vector components and the total dipole of each chunk. These values can be accessed by any command that uses global array values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The array values are “intensive”. The array values will be in dipole units (i.e., charge units times distance units).  

# 3.33.5 Restrictions  

Compute style dipole/tip4p/chunk is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Compute style dipole/tip4p/chunk can only be used with tip4p pair styles.  

# 3.33.6 Related commands  

compute com/chunk, compute dipole  

# 3.33.7 Default  

Using the center of mass is the default setting for the net charge correction.  

# 3.34 compute displace/atom command  

# 3.34.1 Syntax  

compute ID group-ID displace/atom • ID, group-ID are documented in compute command • displace/atom $=$ style name of this compute command • zero or more keyword/arg pairs may be appended • keyword $=$ refresh refresh arg $=$ name of per-atom variable  

# 3.34.2 Examples  

<html><body><table><tr><td>compute 1 all c displace/atom</td></tr><tr><td>compute 1 all displace /atom refresh myVar</td></tr><tr><td></td></tr></table></body></html>  

# 3.34.3 Description  

Define a computation that calculates the current displacement of each atom in the group from its original (reference) coordinates, including all effects due to atoms passing through periodic boundaries.  

A vector of four quantities per atom is calculated by this compute. The first three elements of the vector are the $(d x,d y,d z)$ displacements. The fourth component is the total displacement (i.e., $\sqrt{d x^{2}+d y^{2}+d z^{2}})$ .  

The displacement of an atom is from its original position at the time the compute command was issued. The value of the displacement will be 0.0 for atoms not in the specified compute group.  

![](images/89ace35a6cf19ef7da03d9cb0e6f7a2d023cc05b399decad1c214c6ef3e7be93.jpg)  

# Note  

Initial coordinates are stored in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

![](images/35eb8b6ee86e7ff0533e184eabf32780cbf21c652237e8d085667208536ed975.jpg)  

# Note  

If you want the quantities calculated by this compute to be continuous when running from a restart file, then you should use the same ID for this compute, as in the original run. This is so that the fix this compute creates to store per-atom quantities will also have the same ID, and thus be initialized correctly with time $=0$ atom coordinates from the restart file.  

The refresh option can be used in conjunction with the “dump_modify refresh” command to generate incremental dump files.  

The definition and motivation of an incremental dump file is as follows. Instead of outputting all atoms at each snapshot (with some associated values), you may only wish to output the subset of atoms with a value that has changed in some way compared to the value the last time that atom was output. In some scenarios this can result in a dramatically smaller dump file. If desired, by post-processing the sequence of snapshots, the values for all atoms at all timesteps can be inferred.  

A concrete example using this compute, is a simulation of atom diffusion in a solid, represented as atoms on a lattice. Diffusive hops are rare. Imagine that when a hop occurs an atom moves more than a distance Dhop. For any snapshot we only want to output atoms that have hopped since the last snapshot. This can be accomplished with something like the following commands:  

<html><body><table><tr><td>write( dump</td><td>all custom tmp.dump id type x y Z see comment below</td></tr><tr><td>variable</td><td>Dhop equal 0.6</td></tr><tr><td>checkatom</td><td>"c_ dsp[4] > v_Dhop"</td></tr><tr><td>compute</td><td>dsp all displace/atom refresh check</td></tr><tr><td>dump 1 all</td><td>l custom 100 t tmp.dump id type x y Z</td></tr><tr><td>dump_modify refresh c_dsp delay 100</td><td>append yes thresh c_dsp[4] > ${Dhop}</td></tr></table></body></html>  

The dump_modify thresh command will only output atoms that have displaced more than $0.6\mathrm{~\AA~}$ on each snapshot (assuming metal units). The dump_modify refresh option triggers a call to this compute at the end of every dump.  

The refresh argument for this compute is the ID of an atom-style variable which calculates a Boolean value (0 or 1) based on the same criterion used by dump_modify thresh. This compute evaluates the atom-style variable. For each atom that returns 1 (true), the original (reference) coordinates of the atom (stored by this compute) are updated.  

The effect of these commands is that a particular atom will only be output in the dump file on the snapshot after it makes a diffusive hop. It will not be output again until it makes another hop.  

Note that in the first snapshot of a subsequent run, no atoms will be typically be output. That is because the initial displacement for all atoms is 0.0. If an initial dump snapshot is desired, containing the initial reference positions of all atoms, one way to do this is illustrated above. An initial write_dump command can be used before the first run. It will contain the positions of all the atoms, Options in the dump_modify command above will append new output to that same file and delay the output until a later timestep. The delay setting avoids a second time $=0$ snapshot which would be empty.  

# 3.34.4 Output info  

This compute calculates a per-atom array with four columns, which can be accessed by indices 1–4 by any command that uses per-atom values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The per-atom array values will be in distance units.  

This compute supports the refresh option as explained above, for use in conjunction with dump_modify refresh to generate incremental dump files.  

# 3.34.5 Restrictions  

none  

# 3.34.6 Related commands  

compute msd, dump custom, fix store/state  

# 3.34.7 Default  

none  

# 3.35 compute dpd command  

# 3.35.1 Syntax  

# 3.35.3 Description  

Define a computation that accumulates the total internal conductive energy $(U^{\mathrm{cond}})$ , the total internal mechanical energy $(U^{\mathrm{mech}})$ , the total chemical energy $(U^{\mathrm{chem}})$ and the harmonic average of the internal temperature $(\theta_{\mathrm{avg}})$ for the entire system of particles. See the compute dpd/atom command if you want per-particle internal energies and internal temperatures.  

The system internal properties are computed according to the following relations:  

$$
{\begin{array}{r l}&{U^{\mathrm{cond}}=\displaystyle{\sum_{i=1}^{N}}u_{i}^{\mathrm{cond}}}\ &{U^{\mathrm{meab}}=\displaystyle{\sum_{i=1}^{N}}u_{i}^{\mathrm{meab}}}\ &{U^{\mathrm{chem}}=\displaystyle{\sum_{i=1}^{N}}u_{i}^{\mathrm{dem}}}\ &{U^{\mathrm{chem}}=\displaystyle{\sum_{i=1}^{N}}u_{i}^{\mathrm{dem}}}\ &{U=\displaystyle{\sum_{i=1}^{N}}(u_{i}^{\mathrm{cond}}+u_{i}^{\mathrm{meab}}+u_{i}^{\mathrm{dem}})}\ &{\theta_{\mathrm{arg}}=\displaystyle{\left({\frac{1}{N}}\displaystyle{\sum_{i=1}^{N}}{\frac{1}{\theta_{i}}}\right)^{-1}}}\end{array}}
$$  

where $N$ is the number of particles in the system.  

# 3.35.4 Output info  

This compute calculates a global vector of length 5 $(U^{\mathrm{cond}}$ , $U^{\mathrm{mech}}$ , $U^{\mathrm{chem}}$ , $\theta_{\mathrm{avg}},N)$ , which can be accessed by indices 1 through 5. See the Howto output page for an overview of LAMMPS output options.  

The vector values will be in energy and temperature units.  

# 3.35.5 Restrictions  

This command is part of the DPD-REACT package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This command also requires use of the atom_style dpd command.  

# 3.35.6 Related commands  

compute dpd/atom, thermo_style  

# 3.35.7 Default  

none  

(Larentzos) J.P. Larentzos, J.K. Brennan, J.D. Moore, and W.D. Mattson, “LAMMPS Implementation of Constant Energy Dissipative Particle Dynamics (DPD-E)”, ARL-TR-6863, U.S. Army Research Laboratory, Aberdeen Proving Ground, MD (2014).  

# 3.36 compute dpd/atom command  

# 3.36.1 Syntax  

compute ID group-ID dpd/atom  

• ID, group-ID are documented in compute command dpd/atom $=$ style name of this compute command  

# 3.36.2 Examples  

# 3.36.3 Description  

Define a computation that accesses the per-particle internal conductive energy $(\boldsymbol{u}^{\mathrm{cond}})$ , internal mechanical energy $(\boldsymbol{u}^{\mathrm{mech}})$ , internal chemical energy $(\boldsymbol{u}^{\mathrm{chem}})$ and internal temperatures (θ ) for each particle in a group. See the compute dpd command if you want the total internal conductive energy, the total internal mechanical energy, the total chemical energy and average internal temperature of the entire system or group of dpd particles.  

# 3.36.4 Output info  

This compute calculates a per-particle array with four columns $\mathbf{\chi}_{u}\mathrm{cond}$ , $u^{\mathrm{mech}}$ , $u^{\mathrm{chem}}$ , θ ), which can be accessed by indices 1–4 by any command that uses per-particle values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-particle array values will be in energy $(u^{\mathrm{cond}},u^{\mathrm{mech}},u^{\mathrm{chem}})$ and temperature (θ ) units.  

# 3.36.5 Restrictions  

This command is part of the DPD-REACT package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This command also requires use of the atom_style dpd command.  

# 3.36.6 Related commands  

dump custom, compute dpd  

# 3.36.7 Default  

none  

(Larentzos) J.P. Larentzos, J.K. Brennan, J.D. Moore, and W.D. Mattson, “LAMMPS Implementation of Constant Energy Dissipative Particle Dynamics (DPD-E)”, ARL-TR-6863, U.S. Army Research Laboratory, Aberdeen Proving Ground, MD (2014).  

# 3.37 compute edpd/temp/atom command  

# 3.37.1 Syntax  

# compute ID group-ID edpd/temp/atom  

• ID, group-ID are documented in compute command • edpd/temp/atom $=$ style name of this compute command  

# 3.37.2 Examples  

# 3.37.3 Description  

Define a computation that calculates the per-atom temperature for each eDPD particle in a group.  

The temperature is a local temperature derived from the internal energy of each eDPD particle based on the local equilibrium hypothesis. For more details please see (Espanol1997) and (Li2014).  

# 3.37.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in temperature units.  

# 3.37.5 Restrictions  

This compute is part of the DPD-MESO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.37.6 Related commands  

pair_style edpd  

# 3.37.7 Default  

none  

(Espanol1997) Espanol, Europhys Lett, 40(6): 631-636 (1997). DOI: 10.1209/epl/i1997-00515-8 (Li2014) Li, Tang, Lei, Caswell, Karniadakis, J Comput Phys, 265: 113-127 (2014). DOI: 10.1016/j.jcp.2014.02.003.  

# 3.38 compute efield/atom command  

# 3.38.1 Syntax  

compute ID group-ID efield/atom keyword val  

• ID, group-ID are documented in compute command   
• efield/atom $=$ style name of this compute command   
• zero or more keyword/value pairs may be appended   
• keyword $=$ pair or kspace pair $\mathrm{args}=\mathrm{yes}$ or no kspace args $=$ yes or no  

# 3.38. compute efield/atom command  

# 3.38.2 Examples  

<html><body><table><tr><td>compute 1 all efield/atom</td></tr><tr><td>compute e 1 all efield/atom pair yes kspace no</td></tr></table></body></html>  

Used in input scripts:  

<html><body><table><tr><td>examples/PACKAGES/dielectric/in.confined</td></tr><tr><td>examples/PACKAGES/dielectric /in.nopbc</td></tr><tr><td></td></tr></table></body></html>  

# 3.38.3 Description  

Define a computation that calculates the electric field at each atom in a group. The compute should only enabled with pair and kspace styles that are provided by the DIELECTRIC package because only these styles compute the per-atom electric field at every time step.  

The electric field is a 3-component vector. The value of the electric field components will be 0.0 for atoms not in the specified compute group.  

The keyword/value option pairs are used in the following ways.  

For the pair and kspace keywords, the real-space and reciprocal-space contributions to the electric field can be turned off and on.  

# 3.38.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in electric field units.  

# 3.38.5 Restrictions  

This compute is part of the DIELECTRIC package. It is only enabled if LAMMPS was built with that package.  

# 3.38.6 Related commands  

dump custom  

# 3.38.7 Default  

The option defaults are pair $=$ yes and kspace $=$ yes.  

# 3.39 compute efield/wolf/atom command  

# 3.39.1 Syntax  

compute ID group-ID efield/wolf/atom alpha keyword val • ID, group-ID are documented in compute command • efield/atom/wolf $=$ style name of this compute command • alpha $=$ damping parameter (inverse distance units) zero or more keyword/value pairs may be appended  

• keyword $=$ limit or cutoff  

limit group2-ID $=$ limit computing the electric field contributions to a group (default: all) cutoff value $=$ set cutoff for computing contributions to this value (default: maximum cutoff of pair␣ $\hookrightarrow$ style)  

# 3.39.2 Examples  

<html><body><table><tr><td>compute 1 all efield/wolf/atom 0.2 compute e 1 mols efield/wolf atom 0.25 limit water cutoff 10.0</td></tr></table></body></html>  

# 3.39.3 Description  

Added in version 8Feb2023.  

Define a computation that approximates the electric field at each atom in a group.  

$$
\vec{E}_{i}=\frac{\vec{F}c o u l_{i}}{q_{i}}=\sum_{j\neq i}\frac{q_{j}}{r_{i j}^{2}}\qquadr<r_{c}
$$  

The electric field at the position of the atom $i$ is the coulomb force on a unit charge at that point, which is equivalent to dividing the Coulomb force by the charge of the individual atom.  

In this compute the electric field is approximated as the derivative of the potential energy using the Wolf summation method, described in Wolf , given by:  

$$
E_{i}=\frac{1}{2}\sum_{j\neq i}\frac{q_{i}q_{j}\mathrm{erfc}(\alpha r_{i j})}{r_{i j}}+\frac{1}{2}\sum_{j\neq i}\frac{q_{i}q_{j}\mathrm{erf}(\alpha r_{i j})}{r_{i j}}\qquadr<r_{c}
$$  

where $\alpha$ is the damping parameter, and $e r f()$ and $e r f c()$ ) are error-function and complementary error-function terms. This potential is essentially a short-range, spherically-truncated, charge-neutralized, force-shifted, pairwise $l/r$ summation. With a manipulation of adding and subtracting a self term (for $\mathrm{i}=\mathrm{j}$ ) to the first and second term on the right-handside, respectively, and a small enough $\alpha$ damping parameter, the second term shrinks and the potential becomes a rapidly-converging real-space summation. With a long enough cutoff and small enough $\alpha$ parameter, the electric field calculated by the Wolf summation method approaches that computed using the Ewald sum.  

The value of the electric field components will be 0.0 for atoms not in the specified compute group.  

When the limit keyword is used, only contributions from atoms in the selected group will be considered, otherwise contributions from all atoms within the cutoff are included.  

When the cutoff keyword is used, the cutoff used for the electric field approximation can be set explicitly. By default it is the largest cutoff of any pair style force computation.  

# Computational Efficiency  

This compute will loop over a full neighbor list just like a pair style does when computing forces, thus it can be quite time-consuming and slow down a calculation significantly when its data is used in every time step. The compute efield/atom command of the DIELECTRIC package is more efficient in comparison, since the electric field data is collected and stored as part of the force computation at next to no extra computational cost.  

# 3.39.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector contains 3 values per atom which are the x-, y-, and z-direction electric field components in force units.  

# 3.39.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
This compute requires neighbor styles ‘bin’ or ‘nsq’.  

# 3.39.6 Related commands  

pair_style coul/wolf , compute efield/atom  

# 3.39.7 Default  

The option defaults are limit $=$ all and cutoff $=$ largest cutoff for pair styles.  

(Wolf) D. Wolf, P. Keblinski, S. R. Phillpot, J. Eggebrecht, J Chem Phys, 110, 8254 (1999).  

# 3.40 compute entropy/atom command  

# 3.40.1 Syntax  

compute ID group-ID entropy/atom sigma cutoff keyword value ...  

• ID, group-ID are documented in compute command • entropy/atom $=$ style name of this compute command • sigma $=$ width of Gaussians used in the $g(r)$ smoothing • cutof $=$ cutoff for the $g(r)$ calculation • one or more keyword/value pairs may be appended  

keyword $=$ avg or local avg args $=$ neigh cutoff2 neigh value $\mathrm{~\small~\alpha~}=\mathrm{yes}$ or no $=$ whether to average the pair entropy over neighbors cutoff2 $=$ cutoff for the averaging over neighbors local $\mathrm{arg}=\mathrm{yes}$ or no $=$ use the local density around each atom to normalize the g(r)  

# 3.40.2 Examples  

compute 1 all entropy/atom 0.25 5. compute 1 all entropy/atom 0.25 5. avg yes 5. compute 1 all entropy/atom 0.125 7.3 avg yes 5.1 local yes  

# 3.40.3 Description  

Define a computation that calculates the pair entropy fingerprint for each atom in the group. The fingerprint is useful to distinguish between ordered and disordered environments, for instance liquid and solid-like environments, or glassy and crystalline-like environments. Some applications could be the identification of grain boundaries, a melt-solid interface, or a solid cluster emerging from the melt. The advantage of this parameter over others is that no a priori information about the solid structure is required.  

This parameter for atom i is computed using the following formula from (Piaggi) and (Nettleton) ,  

$$
s_{S}^{i}=-2\pi\rho k_{B}\int_{0}^{r_{m}}[g(r)\ln g(r)-g(r)+1]r^{2}d r
$$  

where $r$ is a distance, $g(r)$ is the radial distribution function of atom $i,$ , and $\rho$ is the density of the system. The $g(r)$ computed for each atom $i$ can be noisy and therefore it is smoothed using  

$$
g_{m}^{i}(r)={\frac{1}{4\pi\rho r^{2}}}\sum_{j}{\frac{1}{\sqrt{2\pi\sigma^{2}}}}e^{-(r-r_{i j})^{2}/(2\sigma^{2})}
$$  

where the sum over $j$ goes through the neighbors of atom $i$ and $\sigma$ is a parameter to control the smoothing.  

The input parameters are sigma the smoothing parameter $\sigma$ , and the cutoff for the calculation of $g(r)$  

If the keyword avg has the setting yes, then this compute also averages the parameter over the neighbors of atom $i$ according to  

$$
\left\langle s_{S}^{i}\right\rangle=\frac{\sum_{j}s_{S}^{j}+s_{S}^{i}}{N+1},
$$  

where the sum over $j$ goes over the neighbors of atom $i$ and $N$ is the number of neighbors. This procedure provides a sharper distinction between order and disorder environments. In this case the input parameter cutoff2 is the cutoff for the averaging over the neighbors and must also be specified.  

If the avg yes option is used, the effective cutoff of the neighbor list should be cutoff +cutoff2 and therefore it might be necessary to increase the skin of the neighbor list with:  

See neighbor for details.  

If the local yes option is used, the $g(r)$ is normalized by the local density around each atom, that is to say the density around each atom is the number of neighbors within the neighbor list cutoff divided by the corresponding volume. This option can be useful when dealing with inhomogeneous systems such as those that have surfaces.  

Here are typical input parameters for fcc aluminum (lattice constant 4.05 Å),  

compute 1 all entropy/atom 0.25 5.7 avg yes 3.7  

and for bcc sodium (lattice constant 4.23 Å),  

compute 1 all entropy/atom 0.25 7.3 avg yes 5.1  

# 3.40.4 Output info  

By default, this compute calculates the pair entropy value for each atom as a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The pair entropy values have units of the Boltzmann constant. They are always negative, and lower values (lower entropy) correspond to more ordered environments.  

# 3.40.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.40.6 Related commands  

compute cna/atom compute centro/atom  

# 3.40.7 Default  

The default values for the optional keywords are $\mathrm{avg}=\mathrm{no}$ and local $=$ no.  

(Piaggi) Piaggi and Parrinello, J Chem Phys, 147, 114112 (2017).   
(Nettleton) Nettleton and Green, J Chem Phys, 29, 6 (1958).  

# 3.41 compute erotate/asphere command  

# 3.41.1 Syntax  

compute ID group-ID erotate/asphere  

• ID, group-ID are documented in compute command erotate/asphere $=$ style name of this compute command  

# 3.41.2 Examples  

# 3.41.3 Description  

Define a computation that calculates the rotational kinetic energy of a group of aspherical particles. The aspherical particles can be ellipsoids, or line segments, or triangles. See the atom_style and read_data commands for descriptions of these options.  

For all 3 types of particles, the rotational kinetic energy is computed as ${\scriptstyle{\frac{1}{2}}}I\omega^{2}$ , where $I$ is the inertia tensor for the aspherical particle and $\omega$ is its angular velocity, which is computed from its angular momentum if needed.  

![](images/b14e156d8addb96c32076d67609115d71dd1f32513894fe7a51cdd0658ab7fb4.jpg)  

# Note  

For 2d models, ellipsoidal particles are treated as ellipsoids, not ellipses, meaning their moments of inertia will be the same as in 3d.  

# 3.41.4 Output info  

This compute calculates a global scalar (the KE). This value can be used by any command that uses a global scalar value from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “extensive”. The scalar value will be in energy units.  

# 3.41.5 Restrictions  

This compute requires that ellipsoidal particles atoms store a shape and quaternion orientation and angular momentum as defined by the atom_style ellipsoid command.  

This compute requires that line segment particles atoms store a length and orientation and angular velocity as defined by the atom_style line command.  

This compute requires that triangular particles atoms store a size and shape and quaternion orientation and angular momentum as defined by the atom_style tri command.  

All particles in the group must be of finite size. They cannot be point particles.  

# 3.41.6 Related commands  

none compute erotate/sphere  

# 3.41.7 Default  

none  

# 3.42 compute erotate/rigid command  

# 3.42.1 Syntax  

compute ID group-ID erotate/rigid fix-ID  

• ID, group-ID are documented in compute command • erotate/rigid $=$ style name of this compute command • fix- $\mathrm{\cdotID}=\mathrm{ID}$ of rigid body fix  

# 3.42.2 Examples  

# 3.42.3 Description  

Define a computation that calculates the rotational kinetic energy of a collection of rigid bodies, as defined by one of the fix rigid command variants.  

The rotational energy of each rigid body is computed as $\scriptstyle{\frac{1}{2}}I\omega_{\mathrm{body}}^{2}$ , where $I$ is the inertia tensor for the rigid body and $\omega_{\mathrm{body}}$ is its angular velocity vector. Both $I$ and $\omega_{\mathrm{body}}$ are in the frame of reference of the rigid body (i.e., $I$ is diagonal).  

The fix-ID should be the ID of one of the fix rigid commands which defines the rigid bodies. The group specified in the compute command is ignored. The rotational energy of all the rigid bodies defined by the fix rigid command in included in the calculation.  

# 3.42.4 Output info  

This compute calculates a global scalar (the summed rotational energy of all the rigid bodies). This value can be used by any command that uses a global scalar value from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “extensive”. The scalar value will be in energy units.  

# 3.42.5 Restrictions  

This compute is part of the RIGID package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.42.6 Related commands  

compute ke/rigid  

# 3.42. compute erotate/rigid command  

# 3.42.7 Default  

none  

# 3.43 compute erotate/sphere command  

Accelerator Variants: erotate/sphere/kk  

# 3.43.1 Syntax  

compute ID group-ID erotate/sphere  

• ID, group-ID are documented in compute command • erotate/sphere $=$ style name of this compute command  

# 3.43.2 Examples  

# 3.43.3 Description  

Define a computation that calculates the rotational kinetic energy of a group of spherical particles.  

The rotational energy is computed as ${\scriptstyle{\frac{1}{2}}}I\omega^{2}$ , where $I$ is the moment of inertia for a sphere and $\omega$ is the particle’s angular velocity.  

![](images/d65b6d44e93bf256edee263d263172e99c4f1706e6d4c8daa4e9f3326ba9e0ba.jpg)  

# Note  

For 2d models, particles are treated as spheres, not disks, meaning their moment of inertia will be the same as in 3d.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.43.4 Output info  

This compute calculates a global scalar (the KE). This value can be used by any command that uses a global scalar value from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “extensive”. The scalar value will be in energy units.  

# 3.43.5 Restrictions  

This compute requires that atoms store a radius and angular velocity (omega) as defined by the atom_style sphere command.  

All particles in the group must be finite-size spheres or point particles. They cannot be aspherical. Point particles will not contribute to the rotational energy.  

# 3.43.6 Related commands  

compute erotate/asphere  

# 3.43.7 Default  

none  

# 3.44 compute erotate/sphere/atom command  

# 3.44.1 Syntax  

compute ID group-ID erotate/sphere/atom  

• ID, group-ID are documented in compute command • erotate/sphere/atom $=$ style name of this compute command  

# 3.44.2 Examples  

# 3.44.3 Description  

Define a computation that calculates the rotational kinetic energy for each particle in a group.  

The rotational energy is computed as ${\scriptstyle{\frac{1}{2}}}I\omega^{2}$ , where $I$ is the moment of inertia for a sphere and $\omega$ is the particle’s angular velocity.  

![](images/f6dd1bdc55be00fcd51d11d91c2b6a4d5c1310804e16ec2c944f198a060f030e.jpg)  

# Note  

For 2d models, particles are treated as spheres, not disks, meaning their moment of inertia will be the same as in 3d.  

The value of the rotational kinetic energy will be 0.0 for atoms not in the specified compute group or for point particles with a radius of 0.0.  

# 3.44.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in energy units.  

# 3.44.5 Restrictions  

none  

# 3.44.6 Related commands  

dump custom  

# 3.44.7 Default  

none  

# 3.45 compute event/displace command  

# 3.45.1 Syntax  

compute ID group-ID event/displace threshold  

• ID, group-ID are documented in compute command   
• event/displace $=$ style name of this compute command   
• threshold $=$ minimum distance any particle must move to trigger an event (distance units)  

# 3.45.2 Examples  

# 3.45.3 Description  

Define a computation that flags an “event” if any particle in the group has moved a distance greater than the specified threshold distance when compared to a previously stored reference state (i.e., the previous event). This compute is typically used in conjunction with the prd and tad commands, to detect if a transition to a new minimum energy basin has occurred.  

This value calculated by the compute is equal to 0 if no particle has moved far enough, and equal to 1 if one or more particles have moved further than the threshold distance.  

# Note  

If the system is undergoing significant center-of-mass motion, due to thermal motion, an external force, or an initial net momentum, then this compute will not be able to distinguish that motion from local atom displacements and may generate “false positives”.  

# 3.45.4 Output info  

This compute calculates a global scalar (the flag). This value can be used by any command that uses a global scalar value from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “intensive”. The scalar value will be a 0 or 1 as explained above.  

# 3.45.5 Restrictions  

This command can only be used if LAMMPS was built with the REPLICA package. See the Build package doc page for more info.  

# 3.45.6 Related commands  

prd, tad  

# 3.45.7 Default  

none  

# 3.46 compute fabric command  

# 3.46.1 Syntax  

compute ID group-ID fabric cutoff attribute ... keyword values ...  

• ID, group-ID are documented in compute command   
• fabric $=$ style name of this compute command   
• cutof $=t y p e$ or radius type $=$ cutoffs determined based on atom types radius $=$ cutoffs determined based on atom diameters (atom style sphere)   
• one or more attributes may be appended   
• attribute $=$ contact or branch or force/normal or force/tangential contact $=$ contact tensor branch $=$ branch tensor force/normal $=$ normal force tensor force/tangential $=$ tangential force tensor   
• zero or more keyword/value pairs may be appended   
• keyword $=$ type/include type/include value $=$ arg1 arg2 arg $=$ separate lists of types (see below)  

# 3.46.2 Examples  

compute 1 all fabric type contact force/normal type/include 1,2 3\*4 compute 1 all fabric radius force/normal force/tangential  

# 3.46.3 Description  

Define a compute that calculates various fabric tensors for pairwise interaction (Ouadfel). Fabric tensors are commonly used to quantify the anisotropy or orientation of granular contacts but can also be used to characterize the direction of pairwise interactions in general systems. The type and radius settings are used to select whether interactions cutoffs are determined by atom types or by the sum of atomic radii (atom style sphere), respectively. Calling this compute is roughly the cost of a pair style invocation as it involves a loop over the neighbor list. If the normal or tangential force tensors are requested, it will be more expensive than a pair style invocation as it will also recalculate all pair forces.  

# 3.46. compute fabric command  

Four fabric tensors are available: the contact, branch, normal force, or tangential force tensor. The contact tensor is calculated as  

$$
C_{a b}=\frac{15}{2}(\phi_{a b}-\frac{1}{3}\mathrm{Tr}(\phi)\delta_{a b})
$$  

where $a$ and $b$ are the $x,y,z$ directions, $\delta_{a b}$ is the Kronecker delta function, and the tensor $\phi$ is defined as  

$$
\phi_{a b}=\sum_{n=1}^{N_{p}}{\frac{r_{a}r_{b}}{r^{2}}}
$$  

where $n$ loops over the $N_{p}$ pair interactions in the simulation, $r_{a}$ is the $a$ component of the radial vector between the two pairwise interacting particles, and $r$ is the magnitude of the radial vector.  

The branch tensor is calculated as  

$$
B_{a b}=\frac{15}{2\mathrm{Tr}(D)}(D_{a b}-\frac{1}{3}\mathrm{Tr}(D)\delta_{a b})
$$  

where the tensor $D$ is defined as  

$$
D_{a b}=\sum_{n=1}^{N_{p}}{\frac{1}{N_{c}(r^{2}+C_{c d}r_{c}r_{d})}}{\frac{r_{a}r_{b}}{r}}
$$  

where $N_{c}$ is the total number of contacts in the system and the subscripts $c$ and $d$ indices are summed according to Einstein notation.  

The normal force fabric tensor is calculated as  

$$
F_{a b}^{n}=\frac{15}{2\mathrm{Tr}(N)}(N_{a b}-\frac{1}{3}\mathrm{Tr}(N)\delta_{a b})
$$  

where the tensor $N$ is defined as  

$$
N_{a b}=\sum_{n=1}^{N_{p}}\frac{1}{N_{c}(r^{2}+C_{c d}r_{c}r_{d})}\frac{r_{a}r_{b}}{r^{2}}f_{n}
$$  

and $f_{n}$ is the magnitude of the normal, central-body force between the two atoms.  

Finally, the tangential force fabric tensor is only defined for pair styles that apply tangential forces to particles, namely granular pair styles. It is calculated as  

$$
F_{a b}^{t}=\frac{5}{\mathrm{Tr}(N)}(T_{a b}-\frac{1}{3}\mathrm{Tr}(T)\delta_{a b})
$$  

where the tensor $T$ is defined as  

$$
T_{a b}=\sum_{n=1}^{N_{p}}\frac{1}{N_{c}(r^{2}+C_{c d}r_{c}r_{d})}\frac{r_{a}r_{b}}{r^{2}}f_{t}
$$  

and $f_{t}$ is the magnitude of the tangential force between the two atoms.  

The type/include keyword filters interactions based on the types of the two atoms. Interactions between two atoms are only included in calculations if the atom types are in the two lists. Each list consists of a series of type ranges separated by commas. The range can be specified as a single numeric value, or a wildcard asterisk can be used to specify a range of values. This takes the form “\*” or $\mathbf{\overline{{\rho}}}^{\mathbf{6}\mathbf{*}}\mathbf{\overline{{n}}}^{\mathbf{,}\mathbf{,}}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\rightarrow}$ or $\mathrm{^{6}m^{*}n^{,}}$ . For example, if $M$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $M$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $M$ (inclusive). A middle asterisk means all types from m to n (inclusive). Multiple type/include keywords may be added.  

# 3.46.4 Output info  

This compute calculates a global vector of doubles and a global scalar. The vector stores the unique components of the first requested tensor in the order xx, yy, zz, xy, xz, yz followed by the same components for all subsequent tensors. The length of the vector is therefore six times the number of requested tensors. The scalar output is the number of pairwise interactions included in the calculation of the fabric tensor.  

# 3.46.5 Restrictions  

This fix is part of the GRANULAR package. It is only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

Currently, compute fabric does not support pair styles with many-body interactions. It also does not support models with long-range Coulombic or dispersion forces, i.e. the kspace_style command in LAMMPS. It also does not support the following fixes which add rigid-body constraints: fix shake, fix rattle, fix rigid, fix rigid/small. It does not support granular pair styles that extend beyond the contact of atomic radii (e.g., JKR and DMT).  

# 3.46.6 Related commands  

none  

# 3.46.7 Default  

none  

(Ouadfel) Ouadfel and Rothenburg “Stress-force-fabric relationship for assemblies of ellipsoids”, Mechanics of Materials (2001). (link to paper)  

# 3.47 compute fep command  

# 3.47.1 Syntax  

compute ID group-ID fep temp attribute args ... keyword value ...  

• ID, group-ID are documented in the compute command   
• fep $=$ name of this compute command   
• temp $=$ external temperature (as specified for constant-temperature run)   
• one or more attributes with args may be appended   
• attribute $=p a i r$ or atom pair args $=$ pstyle pparam I J v_delta pstyle $=$ pair style name (e.g., lj/cut) pparam $=$ parameter to perturb $\mathrm{I,J=typepair(s)}$ to set parameter for v_delta $=$ variable with perturbation to apply (in the units of the parameter) atom args $=$ aparam I v_delta aparam $=$ charge $=$ parameter to perturb $\ensuremath{\mathrm{I}}=\ensuremath{\mathrm{type}}$ to set parameter for v_delta $=$ variable with perturbation to apply (in the units of the parameter)  

• zero or more keyword/value pairs may be appended • keyword $=$ tail or volume  

tail value $=\mathrm{no}$ or yes no $=$ ignore tail correction to pair energies (usually small in fep)   
yes $=$ include tail correction to pair energies   
volume value $=$ no or yes no $=$ ignore volume changes (e.g., in NVE or NVT trajectories)   
yes $=$ include volume changes (e.g., in NPT trajectories)  

# 3.47.2 Examples  

compute 1 all fep 298 pair lj/cut epsilon 1 \* v_delta pair lj/cut sigma 1 \* v_delta volume yes compute 1 all fep 300 atom charge 2 v_delta  

Example input scripts available: examples/PACKAGES/fep  

# 3.47.3 Description  

Apply a perturbation to parameters of the interaction potential and recalculate the pair potential energy without changing the atomic coordinates from those of the reference, unperturbed system. This compute can be used to calculate free energy differences using several methods, such as free-energy perturbation (FEP), finite-difference thermodynamic integration (FDTI) or Bennet’s acceptance ratio method (BAR).  

The potential energy of the system is decomposed in three terms: a background term corresponding to interaction sites whose parameters remain constant, a reference term $U_{0}$ corresponding to the initial interactions of the atoms that will undergo perturbation, and a term $U_{1}$ corresponding to the final interactions of these atoms:  

$$
U(\lambda)=U_{\mathrm{bg}}+U_{1}(\lambda)+U_{0}(\lambda)
$$  

A coupling parameter $\lambda$ varying from 0 to 1 connects the reference and perturbed systems:  

$$
\begin{array}{r}{\lambda=0\quad\Rightarrow\quad U=U_{\mathrm{bg}}+U_{0}}\ {\lambda=1\quad\Rightarrow\quad U=U_{\mathrm{bg}}+U_{1}}\end{array}
$$  

It is possible but not necessary that the coupling parameter (or a function thereof) appears as a multiplication factor of the potential energy. Therefore, this compute can apply perturbations to interaction parameters that are not directly proportional to the potential energy (e.g., $\sigma$ in Lennard-Jones potentials).  

This command can be combined with fix adapt to perform multistage free-energy perturbation calculations along stepwise alchemical transformations during a simulation run:  

$$
\Delta_{0}^{1}A=\sum_{i=0}^{n-1}\Delta_{\lambda_{i}}^{\lambda_{i+1}}A=-k_{B}T\sum_{i=0}^{n-1}\ln\left\langle\exp\left(-\frac{U(\lambda_{i+1})-U(\lambda_{i})}{k_{B}T}\right)\right\rangle_{\lambda_{i}}
$$  

This compute is suitable for the finite-difference thermodynamic integration (FDTI) method (Mezei), which is based on an evaluation of the numerical derivative of the free energy by a perturbation method using a very small $\delta$ :  

$$
\Delta_{0}^{1}A=\int_{\lambda=0}^{\lambda=1}\left(\frac{\partial A(\lambda)}{\partial\lambda}\right)_{\lambda}\mathrm{d}\lambda\approx\sum_{i=0}^{n-1}w_{i}\frac{A(\lambda_{i}+\delta)-A(\lambda_{i})}{\delta}
$$  

where $w_{i}$ are weights of a numerical quadrature. The fix adapt command can be used to define the stages of $\lambda$ at which the derivative is calculated and averaged.  

The compute fep calculates the exponential Boltzmann term and also the potential energy difference $U_{1}-U_{0}$ . By choosing a very small perturbation $\delta$ the thermodynamic integration method can be implemented using a numerical evaluation of the derivative of the potential energy with respect to $\lambda$ :  

$$
\Delta_{0}^{1}A=\int_{\lambda=0}^{\lambda=1}\left<\frac{\partial U(\lambda)}{\partial\lambda}\right>_{\lambda}\mathrm{d}\lambda\approx\sum_{i=0}^{n-1}w_{i}\left<\frac{U(\lambda_{i}+\delta)-U(\lambda_{i})}{\delta}\right>_{\lambda}
$$  

Another technique to calculate free energy differences is the acceptance ratio method (Bennet), which can be implemented by calculating the potential energy differences with $\delta=1.0$ on both the forward and reverse routes:  

$$
\left\langle\frac{1}{1+\exp\left[\left(U_{1}-U_{0}-\Delta_{0}^{1}A\right)/k_{B}T\right]}\right\rangle_{0}=\left\langle\frac{1}{1+\exp\left[\left(U_{0}-U_{1}+\Delta_{0}^{1}A\right)/k_{B}T\right]}\right\rangle_{1}
$$  

The value of the free energy difference is determined by numerical root finding to establish the equality.  

Concerning the choice of how the atomic parameters are perturbed in order to setup an alchemical transformation route, several strategies are available, such as single-topology or double-topology strategies (Pearlman). The latter does not require modification of bond lengths, angles or other internal coordinates.  

NOTES: This compute command does not take kinetic energy into account, therefore the masses of the particles should not be modified between the reference and perturbed states, or along the alchemical transformation route. This compute command does not change bond lengths or other internal coordinates (Boresch, Karplus).  

The pair attribute enables various parameters of potentials defined by the pair_style and pair_coeff commands to be changed, if the pair style supports it.  

The pstyle argument is the name of the pair style. For example, pstyle could be specified as “lj/cut”. The pparam argument is the name of the parameter to change. This is a list of pair styles and parameters that can be used with this compute. See the doc pages for individual pair styles and their energy formulas for the meaning of these parameters:  

<html><body><table><tr><td>born</td><td>a,b,c</td><td>type pairs</td></tr><tr><td>buck,buck/coul/cut,buck/coul/long,buck/coul/msm</td><td>a,c</td><td>type pairs</td></tr><tr><td>buck/mdf</td><td>a,c</td><td>type pairs</td></tr><tr><td>coul/cut</td><td>scale</td><td>type pairs</td></tr><tr><td>coul/cut/soft</td><td>lambda</td><td>type pairs</td></tr><tr><td>coul/long,coul/msm</td><td>scale</td><td>type pairs</td></tr><tr><td>coul/long/soft</td><td>scale, lambda</td><td>type pairs</td></tr><tr><td>eam</td><td>scale</td><td>type pairs</td></tr><tr><td>gauss</td><td>a</td><td>type pairs</td></tr><tr><td>lennard/mdf</td><td>a,b</td><td>type pairs</td></tr><tr><td>lj/class2</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/class2/coul/cut,lj/class2/coul/long</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/cut</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/cut/soft</td><td>epsilon,sigma,lambda</td><td>type pairs</td></tr><tr><td>lj/cut/coul/cut,lj/cut/coul/long,lj/cut/coul/msm</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/cut/coul/cut/soft,lj/cut/coul/long/soft</td><td>epsilon,sigma,lambda</td><td>type pairs</td></tr><tr><td>lj/cut/tip4p/cut, lj/cut/tip4p/long</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/cut/tip4p/long/soft</td><td>epsilon,sigma,lambda</td><td>type pairs</td></tr><tr><td>lj/expand</td><td>epsilon,sigma,delta</td><td>type pairs</td></tr><tr><td>lj/mdf</td><td>epsilon,sigma</td><td>type pairs</td></tr><tr><td>lj/sf/dipole/sf</td><td>epsilon,sigma,scale</td><td>type pairs</td></tr><tr><td>mie/cut</td><td>epsilon,sigma,gamR,gamA</td><td>type pairs</td></tr><tr><td>morse,morse/smooth/linear</td><td>d0,r0,alpha</td><td>type pairs</td></tr><tr><td>morse/soft</td><td>d0,r0,alpha,lambda</td><td>type pairs</td></tr><tr><td>nm/cut</td><td>e0,r0,nn,mm</td><td>type pairs</td></tr><tr><td>nm/cut/coul/cut,nm/cut/coul/long</td><td>e0,r0,nn,mm</td><td>type pairs</td></tr><tr><td>ufm</td><td>epsilon,sigma,scale</td><td>type pairs</td></tr><tr><td>soft</td><td>a</td><td>type pairs</td></tr></table></body></html>  

Note that it is easy to add new potentials and their parameters to this list. All it typically takes is adding an extract() method to the pair_\*.cpp file associated with the potential.  

Similar to the pair_coeff command, I and J can be specified in one of two ways. Explicit numeric values can be used for each, as in the first example above. $\ensuremath{\mathrm{~\boldmath~I~}}\leq\ensuremath{\mathrm{~\boldmath~J~}}$ is required. LAMMPS sets the coefficients for the symmetric J,I interaction to the same values. A wild-card asterisk can be used in place of or in conjunction with the I,J arguments to set the coefficients for multiple pairs of atom types. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $\mathbf{\hat{\Pi}}^{\leftarrow}\mathbf{m}^{*}{\hat{\mathbf{\Pi}}}^{,}$ or $\mathrm{^{66}m^{*}n^{,}}$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $\mathbf{N}$ (inclusive). A middle asterisk means all types from m to n (inclusive). Note that only type pairs with $\mathrm{I}\le\mathrm{J}$ are considered; if asterisks imply type pairs where $\mathbf{J}<\mathbf{I}$ , they are ignored.  

If pair_style hybrid or hybrid/overlay is being used, then the pstyle will be a sub-style name. You must specify I,J arguments that correspond to type pair values defined (via the pair_coeff command) for that sub-style.  

The v_name argument for keyword pair is the name of an equal-style variable which will be evaluated each time thi compute is invoked. It should be specified as v_name, where name is the variable name.  

The atom attribute enables atom properties to be changed. The aparam argument is the name of the parameter to change. This is the current list of atom parameters that can be used with this compute:  

• charge $=$ charge on particle  

The $\nu.$ _name argument for keyword pair is the name of an equal-style variable which will be evaluated each time this compute is invoked. It should be specified as v_name, where name is the variable name.  

The tail keyword controls the calculation of the tail correction to “van der Waals” pair energies beyond the cutoff, if this has been activated via the pair_modify command. If the perturbation is small, the tail contribution to the energy difference between the reference and perturbed systems should be negligible.  

If the keyword volum $\mathrm{\Sigma}=y e s$ , then the Boltzmann term is multiplied by the volume so that correct ensemble averaging can be performed over trajectories during which the volume fluctuates or changes (Allen and Tildesley):  

$$
\Delta_{0}^{1}A=-k_{B}T\sum_{i=0}^{n-1}\ln\frac{\left\langle V\exp\left(-\frac{U(\lambda_{i+1})-U(\lambda_{i})}{k_{B}T}\right)\right\rangle_{\lambda_{i}}}{\left\langle V\right\rangle_{\lambda_{i}}}
$$  

# 3.47.4 Output info  

This compute calculates a global vector of length 3 which contains the energy difference $(U_{1}-U_{0})$ as $\mathrm{c\_ID[1]}$ , the Boltzmann factor $\exp(-(U_{1}-U_{0})/k_{B}T)$ , or $V\exp(-(U_{1}-U_{0})/k_{B}T)$ , as $\mathrm{c}\_{\mathrm{ID}[2]}$ and the volume of the simulation box $V$ as $\mathrm{c}_{-}\mathrm{ID}[3]$ . $U_{1}$ is the pair potential energy obtained with the perturbed parameters and $U_{0}$ is the pair potential energy obtained with the unperturbed parameters. The energies include kspace terms if these are used in the simulation.  

These output results can be used by any command that uses a global scalar or vector from a compute as input. See the Howto output page for an overview of LAMMPS output options. For example, the computed values can be averaged using fix ave/time.  

The values calculated by this compute are “extensive”.  

# 3.47.5 Restrictions  

This compute is distributed as the FEP package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.47.6 Related commands  

fix adapt/fep, fix ave/time, pair_style . . . /soft  

# 3.47.7 Default  

The option defaults are tail $=n o$ , volume $=n o$ .  

(Pearlman) Pearlman, J Chem Phys, 98, 1487 (1994)   
(Mezei) Mezei, J Chem Phys, 86, 7084 (1987)   
(Bennet) Bennet, J Comput Phys, 22, 245 (1976)   
(BoreschKarplus) Boresch and Karplus, J Phys Chem A, 103, 103 (1999)   
(AllenTildesley) Allen and Tildesley, Computer Simulation of Liquids, Oxford University Press (1987)  

# 3.48 compute fep/ta command  

# 3.48.1 Syntax  

compute ID group-ID fep/ta temp plane scale_factor keyword value ...  

• ID, group-ID are documented in the compute command   
• fep/ta $=$ name of this compute command   
• temp $=$ external temperature (as specified for constant-temperature run)   
• plane $=x y$ or $x z$ or yz   
• scale_factor $=$ multiplicative factor for change in plane area   
• zero or more keyword/value pairs may be appended   
• keyword $=$ tail tail value $=\mathrm{no}$ or yes no $=$ ignore tail correction to pair energies (usually small in fep) yes $=$ include tail correction to pair energies  

# 3.48.2 Examples  

compute 1 all fep/ta 298 xy 1.0005  

# 3.48.3 Description  

Added in version 4May2022.  

Define a computation that calculates the change in the free energy due to a test-area (TA) perturbation (Gloor). The test-area approach can be used to determine the interfacial tension of the system in a single simulation:  

$$
\gamma=\operatorname*{lim}_{\Delta A\rightarrow0}\left({\frac{\Delta A_{0\rightarrow1}}{\Delta A}}\right)_{N,V,T}=-{\frac{k_{B}T}{\Delta A}}\ln\left\langle\exp\left({\frac{-(U_{1}-U_{0})}{k_{B}T}}\right)\right\rangle_{0}
$$  

During the perturbation, both axes of plane are scaled by multiplying scale_factor, while the other axis divided by scale_factor such that the overall volume of the system is maintained.  

# 3.48. compute fep/ta command  

The tail keyword controls the calculation of the tail correction to “van der Waals” pair energies beyond the cutoff, if this has been activated via the pair_modify command. If the perturbation is small, the tail contribution to the energy difference between the reference and perturbed systems should be negligible.  

# 3.48.4 Output info  

This compute calculates a global vector of length 3 which contains the energy difference $(U_{1}-U_{0})$ as $\mathrm{c\_ID[1]}$ , the Boltzmann factor $\exp\left(-(U_{1}-U_{0})/k_{B}T\right)$ , as $\mathrm{c}\_{\mathrm{ID}}[2]$ and the change in the plane area $\Delta{\cal A}$ as $\mathrm{c}_{-}\mathrm{ID}[3]$ . $U_{1}$ is the potential energy of the perturbed state and $U_{0}$ is the potential energy of the reference state. The energies include kspace terms if these are used in the simulation.  

These output results can be used by any command that uses a global scalar or vector from a compute as input. See the Howto output page for an overview of LAMMPS output options. For example, the computed values can be averaged using fix ave/time.  

# 3.48.5 Restrictions  

Constraints, like fix shake, may lead to incorrect values for energy difference.  

This compute is distributed as the FEP package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.48.6 Related commands  

compute fep  

# 3.48.7 Default  

The option defaults are tail $=n o$ .  

(Gloor) Gloor, J Chem Phys, 123, 134703 (2005)  

# 3.49 compute gaussian/grid/local command  

Accelerator Variants: gaussian/grid/local/kk  

# 3.49.1 Syntax  

compute ID group-ID gaussian/grid/local grid nx ny nz rcutfac R_1 R_2 ... sigma_1 sigma_2  

• ID, group-ID are documented in compute command   
• gaussian/grid/local $=$ style name of this compute command   
• grid values $\mathbf{\tau}=\mathbf{n}\mathbf{X}$ , ny, nz, number of grid points in x, y, and z directions (positive integer)   
• rcutfac $=$ scale factor applied to all cutoff radii (positive real)   
• $R\_I,R\_2,\ldots=\mathrm{lis}$ t of cutoff radii, one for each type (distance units)   
• sigma_1, sigma_2,. . . $=$ Gaussian widths, one for each type (distance units)  

# 3.49.2 Examples  

compute mygrid all gaussian/grid/local grid 40 40 40 4.0 0.5 0.5 0.4 0.4  

# 3.49.3 Description  

Added in version 4Feb2025.  

Define a computation that calculates a Gaussian representation of the ionic structure. This representation is used for the efficient evaluation of quantities related to the structure factor in a grid-based workflow, such as the ML-DFT workflow MALA (Ellis), for which it was originally implemented. Usage of the workflow is described in a separate publication (Fiedler).  

For each LAMMPS type, a separate sum of Gaussians is calculated, using a separate Gaussian broadening per type. The computation is always performed on the numerical grid, no atom-based version of this compute exists. The Gaussian representation can only be executed in a local fashion, thus the output array only contains rows for grid points that are local to the processor subdomain. The layout of the grid is the same as for the see sna/grid/local command.  

Namely, the array contains one row for each of the local grid points, looping over the global index $i x$ fastest, then iy, and iz slowest. Each row of the array contains the global indexes ix, $i y$ , and $i z$ first, followed by the $x,y_{\mathrm{{;}}}$ , and $z$ coordinates of the grid point, followed by the values of the Gaussians (one floating point number per type per grid point).  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 3.49.4 Output info  

Compute gaussian/grid/local evaluates a local array. The array contains one row for each of the local grid points, looping over the global index ix fastest, then $i y$ , and $i z$ slowest. The array contains math $n t y p e s+6$ columns, where ntypes is the number of LAMMPS types. The first three columns are the global indexes ix, $i y$ , and $i z$ , followed by the $x.$ , $y$ , and $z$ coordinates of the grid point, followed by the ntypes columns containing the values of the Gaussians for each type.  

# 3.49.5 Restrictions  

These computes are part of the ML-SNAP package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.49.6 Related commands  

compute sna/grid/local  

(Ellis) Ellis, Fiedler, Popoola, Modine, Stephens, Thompson, Cangi, Rajamanickam, Phys. Rev. B, 104, 035120, (2021)  

(Fiedler) Fiedler, Modine, Schmerler, Vogel, Popoola, Thompson, Rajamanickam, and Cangi, npj Comp. Mater., 9, 115 (2023)  

# 3.50 compute global/atom command  

# 3.50.1 Syntax  

compute ID group-ID style index input1 input2 ...  

• ID, group-ID are documented in compute command • global/atom $=$ style name of this compute command • index $=\mathsf{c\_I D}$ , c_ID[N], f_ID, f_ID[N], v_name  

c_ID = per-atom vector calculated by a compute with ID $\mathrm{c\_ID[I]=I}$ th column of per-atom array calculated by a compute with ID $\mathrm{f\_ID=}$ per-atom vector calculated by a fix with ID $\mathrm{f\_ID[I]=Ith}$ column of per-atom array calculated by a fix with ID v_name $=$ per-atom vector calculated by an atom-style variable with name  

• one or more inputs can be listed • input $\l=\mathsf{c}.$ _ID, c_ID[N], f_ID, f_ID[N], v_name  

$\widetilde{\textrm{c}\_{\mathrm{ID}}=\mathrm{global}}$ vector calculated by a compute with ID   
$\mathrm{c\_ID[I]=Itl}$ h column of global array calculated by a compute with ID, I can include wildcard (see␣   
$\hookrightarrow$ below)   
$\mathrm{f\_ID=global}$ vector calculated by a fix with ID   
$\mathrm{f}\_\mathrm{ID}[\mathrm{I}]=\mathrm{I}$ th column of global array calculated by a fix with ID, I can include wildcard (see below)   
v_name $=$ global vector calculated by a vector-style variable with name  

# 3.50.2 Examples  

<html><body><table><tr><td>compute 1 all global/atom c_chunk c_com[1] c_com[2] c_com[3] compute 1 all global /atom c_chunk c _com[*]</td></tr></table></body></html>  

# 3.50.3 Description  

Define a calculation that assigns global values to each atom from vectors or arrays of global values. The specified index parameter is used to determine which global value is assigned to each atom.  

The index parameter must reference a per-atom vector or array from a compute or $f\boldsymbol{{\kappa}}$ or the evaluation of an atomstyle variable. Each input value must reference a global vector or array from a compute or $f\boldsymbol{{x}}$ or the evaluation of an vector-style variable. Details are given below.  

The index value for an atom is used as an index $I$ (from 1 to $N$ , where $N$ is the number of atoms) into the vector associated with each of the input values. The Ith value from the input vector becomes one output value for that atom. If the atom is not in the specified group, or the index $I<1$ or $I>M$ , where $M$ is the actual length of the input vector, then an output value of 0.0 is assigned to the atom.  

An example of how this command is useful, is in the context of “chunks” which are static or dynamic subsets of atoms. The compute chunk/atom command assigns unique chunk IDs to each atom. Its output can be used as the index parameter for this command. Various other computes with “chunk” in their style name, such as compute com/chunk or compute msd/chunk, calculate properties for each chunk. The output of these commands are global vectors or arrays, with one or more values per chunk, and can be used as input values for this command. This command will then assign the global chunk value to each atom in the chunk, producing a per-atom vector or per-atom array as output. The peratom values can then be output to a dump file or used by any command that uses per-atom values from a compute as input, as discussed on the Howto output doc page.  

As a concrete example, these commands will calculate the displacement of each atom from the center-of-mass of the molecule it is in, and dump those values to a dump file. In this case, each molecule is a chunk.  

compute cc1 all chunk/atom molecule   
compute myChunk all com/chunk cc1   
compute prop all property/atom xu yu zu   
compute glob all global/atom c_cc1 c_myChunk[\*]   
variable dx atom c_prop[1]-c_glob[1]   
variable dy atom c_prop[2]-c_glob[2]   
variable dz atom c_prop[3]-c_glob[3]   
variable dist atom sqrt(v_dx\*v_dx+v_dy\*v_dy+v_dz\*v_dz)   
dump 1 all custom 100 tmp.dump id xu yu zu c_glob[1] c_glob[2] c_glob[3] & v_dx v_dy v_dz v_dist   
dump_modify 1 sort id  

You can add these commands to the bench/in.chain script to see how they work.  

Note that for input values from a compute or fix, the bracketed index I can be specified using a wildcard asterisk with the index to effectively specify multiple values. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\rightarrow}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the size of the vector (for mode $=$ scalar) or the number of columns in the array (for mode $=$ vector), then an asterisk with no numeric values means all indices from 1 to $N$ . A leading asterisk means all indices from 1 to n (inclusive). A trailing asterisk means all indices from m to $N$ (inclusive). A middle asterisk means all indices from m to n (inclusive).  

Using a wildcard is the same as if the individual columns of the array had been listed one by one. For example, the following two compute global/atom commands are equivalent, since the compute com/chunk command creates a global array with three columns:  

compute cc1 all chunk/atom molecule   
compute com all com/chunk cc1   
compute 1 all global/atom c_cc1 c_com[1] c_com[2] c_com[3]   
compute 1 all global/atom c_cc1 c_com[\*]  

This section explains the index parameter. Note that it must reference per-atom values, as contrasted with the input values, which must reference global values.  

Note that all of these options generate floating point values. When they are used as an index into the specified input vectors, they simple rounded down to convert the value to integer indices. The final values should range from 1 to $N$ (inclusive), since they are used to access values from $N$ -length vectors.  

If index begins with “c_”, a compute ID must follow which has been previously defined in the input script. The compute must generate per-atom quantities. See the individual compute doc page for details. If no bracketed integer is appended, the per-atom vector calculated by the compute is used. If a bracketed integer is appended, the Ith column of the peratom array calculated by the compute is used. Users can also write code for their own compute styles and add them to LAMMPS. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

If index begins with “f_”, a fix ID must follow which has been previously defined in the input script. The Fix must generate per-atom quantities. See the individual $f\boldsymbol{a}\boldsymbol{x}$ page for details. Note that some fixes only produce their values on certain timesteps, which must be compatible with when compute global/atom references the values, else an error results. If no bracketed integer is appended, the per-atom vector calculated by the fix is used. If a bracketed integer is appended, the Ith column of the per-atom array calculated by the fix is used. Users can also write code for their own fix style and add them to LAMMPS. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

If index begins with “ $\omega_{-}^{*}$ , a variable name must follow which has been previously defined in the input script. It must be an atom-style variable. Atom-style variables can reference thermodynamic keywords and various per-atom attributes, or invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of generating per-atom quantities to use as index.  

This section explains the kinds of input values that can be used. Note that inputs reference global values, as contrasted with the index parameter which must reference per-atom values.  

If a value begins with “c_”, a compute ID must follow which has been previously defined in the input script. The compute must generate a global vector or array. See the individual compute doc page for details. If no bracketed integer is appended, the vector calculated by the compute is used. If a bracketed integer is appended, the Ith column of the array calculated by the compute is used. Users can also write code for their own compute styles and add them to LAMMPS. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script. The fix must generate a global vector or array. See the individual $f\boldsymbol{{x}}$ doc page for details. Note that some fixes only produce their values on certain timesteps, which must be compatible with when compute global/atom references the values, else an error results. If no bracketed integer is appended, the vector calculated by the fix is used. If a bracketed integer is appended, the Ith column of the array calculated by the fix is used. Users can also write code for their own fix style and add them to LAMMPS. See the discussion above for how I can be specified with a wildcard asterisk to effectively specify multiple values.  

If a value begins with “v_”, a variable name must follow which has been previously defined in the input script. It must be a vector-style variable. Vector-style variables can reference thermodynamic keywords and various other attributes of atoms, or invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of generating a vector of global quantities which the index parameter will reference for assignment of global values to atoms.  

# 3.50.4 Output info  

If a single input is specified this compute produces a per-atom vector. If multiple inputs are specified, this compute produces a per-atom array values, where the number of columns is equal to the number of inputs specified. These values can be used by any command that uses per-atom vector or array values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector or array values will be in whatever units the corresponding input values are in.  

# 3.50.5 Restrictions  

none  

# 3.50.6 Related commands  

compute, fix, variable, compute chunk/atom, compute reduce  

# 3.50.7 Default  

none  

# 3.51 compute group/group command  

# 3.51.1 Syntax  

compute ID group-ID group/group group2-ID keyword value ...  

• ID, group-ID are documented in compute command • group/group $=$ style name of this compute command • group2-ID $=$ group ID of second (or same) group • zero or more keyword/value pairs may be appended • keyword $=$ pair or kspace or boundary or molecule pair value $\mathrm{~\ensuremath~{~\mu~}~}=\mathrm{yes}$ or no kspace value $=$ yes or no boundary value $=$ yes or no molecule value $=$ off or inter or intra  

# 3.51.2 Examples  

<html><body><table><tr><td>compute e1lower group group upper</td></tr><tr><td>compute 1 lower group group upper kspace yes</td></tr><tr><td>compute mine fuid group group wall</td></tr><tr><td></td></tr></table></body></html>  

# 3.51.3 Description  

Define a computation that calculates the total energy and force interaction between two groups of atoms: the compute group and the specified group2. The two groups can be the same.  

If the pair keyword is set to yes, which is the default, then the the interaction energy will include a pair component which is defined as the pairwise energy between all pairs of atoms where one atom in the pair is in the first group and the other is in the second group. Likewise, the interaction force calculated by this compute will include the force on the compute group atoms due to pairwise interactions with atoms in the specified group2.  

![](images/e071cd2d1f5cce79535d8ba3c17b0f18c5430862722666b4794230ed7faef84f.jpg)  

# Note  

The energies computed by the pair keyword do not include tail corrections, even if they are enabled via the pair_modify command.  

If the molecule keyword is set to inter or intra than an additional check is made based on the molecule IDs of the two atoms in each pair before including their pairwise interaction energy and force. For the inter setting, the two atoms must be in different molecules. For the intra setting, the two atoms must be in the same molecule.  

If the kspace keyword is set to yes, which is not the default, and if a kspace_style is defined, then the interaction energy will include a Kspace component which is the long-range Coulombic energy between all the atoms in the first group and all the atoms in the second group. Likewise, the interaction force calculated by this compute will include the force on the compute group atoms due to long-range Coulombic interactions with atoms in the specified group2.  

Normally the long-range Coulombic energy converges only when the net charge of the unit cell is zero. However, one can assume the net charge of the system is neutralized by a uniform background plasma, and a correction to the system energy can be applied to reduce artifacts. For more information see (Bogusz). If the boundary keyword is set to yes, which is the default, and kspace contributions are included, then this energy correction term will be added to the total group-group energy. This correction term does not affect the force calculation and will be zero if one or both of the groups are charge neutral. This energy correction term is the same as that included in the regular Ewald and PPPM routines.  

![](images/48d25c1ca7456650e8ef1d2e8e0569f8887188ae4818992a215b280b9843fff4.jpg)  

# Note  

The molecule setting only affects the group/group contributions calculated by the pair keyword. It does not affect the group/group contributions calculated by the kspace keyword.  

This compute does not calculate any bond or angle or dihedral or improper interactions between atoms in the two groups.  

The pairwise contributions to the group-group interactions are calculated by looping over a neighbor list. The Kspace contribution to the group-group interactions require essentially the same amount of work (FFTs, Ewald summation) as computing long-range forces for the entire system. Thus it can be costly to invoke this compute too frequently.  

![](images/d39d75c7a25793f8be139fd25e4a0f5a46b08f21811e0ebcd5c47fd5ff22b75d.jpg)  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this compute uses a neighbor list, it also means those pairs will not be included in the group/group interaction. This does not apply when using long-range Coulomb interactions (coul/long, coul/msm, coul/wolf or similar). One way to get around this would be to set special_bond scaling factors to very tiny numbers that are not exactly zero (e.g., $1.0\times10^{-50}$ ). Another workaround would be to write a dump file and use the rerun command to compute the group/group interactions for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

If you desire a breakdown of the interactions into a pairwise and Kspace component, simply invoke the compute twice with the appropriate yes/no settings for the pair and kspace keywords. This is no more costly than using a single compute with both keywords set to yes. The individual contributions can be summed in a variable if desired.  

This document describes how the long-range group-group calculations are performed.  

# 3.51.4 Output info  

This compute calculates a global scalar (the energy) and a global vector of length 3 (force), which can be accessed by indices 1–3. These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

Both the scalar and vector values calculated by this compute are “extensive”. The scalar value will be in energy units.   
The vector values will be in force units.  

# 3.51.5 Restrictions  

Not all pair styles can be evaluated in a pairwise mode as required by this compute. For example, three-body and other many-body potentials, such as Tersoff and Stillinger-Weber cannot be used. EAM potentials will re-use previously  

computed embedding term contributions, so the computed pairwise forces and energies are based on the whole system and not valid if particles have been moved since.  

Not all Kspace styles support the calculation of group/group interactions. The regular ewald and pppm styles do.  

# 3.51.6 Related commands  

none  

# 3.51.7 Default  

The option defaults are pair $=$ yes, kspace $=$ no, boundary $=$ yes, molecule $=$ off.  

Bogusz et al, J Chem Phys, 108, 7070 (1998)  

# 3.52 compute gyration command  

# 3.52.1 Syntax  

compute ID group-ID gyration  

• ID, group-ID are documented in compute command gyration $=$ style name of this compute command  

# 3.52.2 Examples  

# 3.52.4 Output info  

This compute calculates a global scalar $(R_{g})$ and a global vector of length 6 $(R_{g}^{2}$ tensor), which can be accessed by indices 1–6. These values can be used by any command that uses a global scalar value or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar and vector values calculated by this compute are “intensive”. The scalar and vector values will be in distanc and distance2 units, respectively.  

# 3.52.5 Restrictions  

none  

# 3.52.6 Related commands  

compute gyration/chunk, compute gyration/shape  

# 3.52.7 Default  

none  

# 3.53 compute gyration/chunk command  

# 3.53.1 Syntax  

compute ID group-ID gyration/chunk chunkID keyword value ...  

• ID, group-ID are documented in compute command   
gyration/chunk $=$ style name of this compute command   
• chunkID $=\mathrm{ID}$ of compute chunk/atom command   
• zero or more keyword/value pairs may be appended   
• keyword $=$ tensor tensor value $=$ none  

# 3.53.2 Examples  

<html><body><table><tr><td>compute 1 molecule gyration/chunk molchunk compute 2 molecule gyration /chunk molchunk tensor</td></tr></table></body></html>  

# 3.53.3 Description  

Define a computation that calculates the radius of gyration $R_{g}$ for multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

This compute calculates the radius of gyration $R_{g}$ for each chunk, which includes all effects due to atoms passing through periodic boundaries.  

$R_{g}$ is a measure of the size of a chunk, and is computed by the formula  

$$
R_{g}^{2}=\frac{1}{M}\sum_{i}m_{i}(r_{i}-r_{\mathrm{cm}})^{2}
$$  

where $M$ is the total mass of the chunk, $r_{\mathrm{cm}}$ is the center-of-mass position of the chunk, and the sum is over all atoms in the chunk.  

Note that only atoms in the specified group contribute to the calculation. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

If the tensor keyword is specified, then the scalar $R_{g}$ value is not calculated, but an $R_{g}$ tensor is instead calculated for each chunk. The formula for the components of the tensor is the same as the above formula, except that $(r_{i}-r_{\mathrm{cm}})^{2}$ is replaced by $(r_{i,x}-r_{\mathrm{cm},x})\cdot(r_{i,y}-r_{\mathrm{cm},y})$ for the xy component, and so on. The six components of the tensor are ordered xx, yy, zz, xy, xz, yz.  

![](images/805fcab54d51292eed161f5059dc51c2b3b7d0325ca52d548cd4d3478203f761.jpg)  

# Note  

The coordinates of an atom contribute to $R_{g}$ in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

The simplest way to output the results of the compute gyration/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule compute myChunk all gyration/chunk cc1 fix 1 all ave/time 100 1 100 c_myChunk file tmp.out mode vector  

# 3.53.4 Output info  

This compute calculates a global vector if the tensor keyword is not specified and a global array if it is. The length of the vector or number of rows in the array $=$ the number of chunks Nchunk as calculated by the specified compute chunk/atom command. If the tensor keyword is specified, the global array has six columns. The vector or array can be accessed by any command that uses global values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

All the vector or array values calculated by this compute are “intensive”. The vector or array values will be in distance units, since they are the square root of values represented by the formula above.  

# 3.53.5 Restrictions  

none  

# 3.53.6 Related commands  

none compute gyration  

# 3.53. compute gyration/chunk command  

# 3.53.7 Default  

none  

# 3.54 compute gyration/shape command  

# 3.54.1 Syntax  

compute ID group-ID gyration/shape compute-ID  

• ID, group-ID are documented in compute command • gyration/shape $=$ style name of this compute command compute-ID $=\mathrm{ID}$ of compute gyration command  

# 3.54.2 Examples  

compute 1 molecule gyration/shape pe  

# 3.54.3 Description  

Define a computation that calculates the eigenvalues of the gyration tensor of a group of atoms and three shape parameters. The computation includes all effects due to atoms passing through periodic boundaries.  

The three computed shape parameters are the asphericity, $b$ , the acylindricity, $c$ , and the relative shape anisotropy, $k$ , viz.,  

$$
\begin{array}{l}{{b=l_{z}-\displaystyle\frac{1}{2}(l_{y}+l_{x})}}\ {{c=l_{y}-l_{x}}}\ {{k=\displaystyle\frac{3}{2}\displaystyle\frac{l_{x}^{2}+l_{y}^{2}+l_{z}^{2}}{(l_{x}+l_{y}+l_{z})^{2}}-\displaystyle\frac{1}{2}}}\end{array}
$$  

where $l_{x}\le l_{y}\le l_{z}$ are the three eigenvalues of the gyration tensor. A general description of these parameters is provided in (Mattice) while an application to polymer systems can be found in (Theodorou). The asphericity is always nonnegative and zero only when the three principal moments are equal. This zero condition is met when the distribution of particles is spherically symmetric (hence the name asphericity) but also whenever the particle distribution is symmetric with respect to the three coordinate axes (e.g., when the particles are distributed uniformly on a cube, tetrahedron or other Platonic solid). The acylindricity is always non-negative and zero only when the two principal moments are equal. This zero condition is met when the distribution of particles is cylindrically symmetric (hence the name, acylindricity), but also whenever the particle distribution is symmetric with respect to the two coordinate axes (e.g., when the particles are distributed uniformly on a regular prism). The relative shape anisotropy is bounded between zero (if all points are spherically symmetric) and one (if all points lie on a line).  

# Note  

The coordinates of an atom contribute to the gyration tensor in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

# 3.54.4 Output info  

This compute calculates a global vector of length 6, which can be accessed by indices 1–6. The first three values are the eigenvalues of the gyration tensor followed by the asphericity, the acylindricity and the relative shape anisotropy. The computed values can be used by any command that uses global vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector values calculated by this compute are “intensive”. The first five vector values will be in distance2 units while the sixth one is dimensionless.  

# 3.54.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package See the Build package page for more info.  

# 3.54.6 Related commands  

compute gyration  

# 3.54.7 Default  

none  

(Mattice) Mattice, Suter, Conformational Theory of Large Molecules, Wiley, New York, 1994.   
(Theodorou) Theodorou, Suter, Macromolecules, 18, 1206 (1985).  

# 3.55 compute gyration/shape/chunk command  

# 3.55.1 Syntax  

compute ID group-ID gyration/shape/chunk compute-ID  

• ID, group-ID are documented in compute command • gyration/shape/chunk $=$ style name of this compute command compute- $\mathrm{\cdotID}=\mathrm{ID}$ of compute gyration/chunk command  

# 3.55.2 Examples  

compute 1 molecule gyration/shape/chunk pe  

# 3.55.3 Description  

Define a computation that calculates the eigenvalues of the gyration tensor and three shape parameters of multiple chunks of atoms. The computation includes all effects due to atoms passing through periodic boundaries.  

The three computed shape parameters are the asphericity, $b$ , the acylindricity, $c$ , and the relative shape anisotropy, $k$ , viz.,  

$$
\begin{array}{l}{{b=l_{z}-\displaystyle\frac{1}{2}(l_{y}+l_{x})}}\ {{c=l_{y}-l_{x}}}\ {{k=\displaystyle\frac{3}{2}\displaystyle\frac{l_{x}^{2}+l_{y}^{2}+l_{z}^{2}}{(l_{x}+l_{y}+l_{z})^{2}}-\displaystyle\frac{1}{2}}}\end{array}
$$  

# 3.55. compute gyration/shape/chunk command  

where $l_{x}\le l_{y}\le l_{z}$ are the three eigenvalues of the gyration tensor. A general description of these parameters is provided in (Mattice) while an application to polymer systems can be found in (Theodorou). The asphericity is always nonnegative and zero only when the three principal moments are equal. This zero condition is met when the distribution of particles is spherically symmetric (hence the name asphericity) but also whenever the particle distribution is symmetric with respect to the three coordinate axes (e.g., when the particles are distributed uniformly on a cube, tetrahedron, or other Platonic solid). The acylindricity is always non-negative and zero only when the two principal moments are equal. This zero condition is met when the distribution of particles is cylindrically symmetric (hence the name, acylindricity), but also whenever the particle distribution is symmetric with respect to the two coordinate axes (e.g., when the particles are distributed uniformly on a regular prism). The relative shape anisotropy is bounded between 0 (if all points are spherically symmetric) and 1 (if all points lie on a line).  

The tensor keyword must be specified in the compute gyration/chunk command.  

![](images/12568af9e131e86fa8ac326e794750004b77822fd71de7c645d1856bec95a2f6.jpg)  

# Note  

The coordinates of an atom contribute to the gyration tensor in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

# 3.55.4 Output info  

This compute calculates a global array with six columns, which can be accessed by indices 1–6. The first three columns are the eigenvalues of the gyration tensor followed by the asphericity, the acylindricity and the relative shape anisotropy. The computed values can be used by any command that uses global array values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The array calculated by this compute is “intensive”. The first five columns will be in distance2 units while the sixth one is dimensionless.  

# 3.55.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.55.6 Related commands  

compute gyration/chunk compute gyration/shape  

# 3.55.7 Default  

none  

(Mattice) Mattice, Suter, Conformational Theory of Large Molecules, Wiley, New York, 1994.   
(Theodorou) Theodorou, Suter, Macromolecules, 18, 1206 (1985).  

# 3.56 compute heat/flux command  

# 3.56.1 Syntax  

compute ID group-ID heat/flux ke-ID pe-ID stress-ID • ID, group-ID are documented in compute command • heat/flux $=$ style name of this compute command • $\mathrm{ke-ID=ID}$ of a compute that calculates per-atom kinetic energy • pe- $\cdot\mathrm{ID}=\mathrm{ID}$ of a compute that calculates per-atom potential energy • stress- $\cdot\mathrm{ID}=\mathrm{ID}$ of a compute that calculates per-atom stress  

# 3.56.2 Examples  

compute myFlux all heat/flux myKE myPE myStress  

# 3.56.3 Description  

Define a computation that calculates the heat flux vector based on contributions from atoms in the specified group. This can be used by itself to measure the heat flux through a set of atoms (e.g., a region between two thermostatted reservoirs held at different temperatures), or to calculate a thermal conductivity using the equilibrium Green-Kubo formalism.  

For other non-equilibrium ways to compute a thermal conductivity, see the Howto kappa doc page. These include use of the fix thermal/conductivity command for the Muller-Plathe method. Or the fix heat command which can add or subtract heat from groups of atoms.  

The compute takes three arguments which are IDs of other computes. One calculates per-atom kinetic energy $(k e-I D)$ , one calculates per-atom potential energy (pe-ID), and the third calculates per-atom stress (stress-ID).  

![](images/5fdf7e41a7821b0a0087ce1a88151079f1dd5bbd6b84314f92ee157031754d93.jpg)  

# Note  

These other computes should provide values for all the atoms in the group this compute specifies. That means the other computes could use the same group as this compute, or they can just use group “all” (or any group whose atoms are superset of the atoms in this compute’s group). LAMMPS does not check for this.  

In case of two-body interactions, the heat flux $\mathbf{J}$ is defined as  

$$
\begin{array}{l}{{\displaystyle{\bf J}=\frac{1}{V}\left[\sum_{i}e_{i}{\bf v}_{i}-\sum_{i}{\bf S}_{i}{\bf v}_{i}\right]}}\ {~}\ {{\displaystyle~=\frac{1}{V}\left[\sum_{i}e_{i}{\bf v}_{i}+\sum_{i<j}\left({\bf F}_{i j}\cdot{\bf v}_{j}\right){\bf r}_{i j}\right]}}\ {~}\ {{\displaystyle~=\frac{1}{V}\left[\sum_{i}e_{i}{\bf v}_{i}+\frac{1}{2}\sum_{i<j}\left({\bf F}_{i j}\cdot\left({\bf v}_{i}+{\bf v}_{j}\right)\right){\bf r}_{i j}\right]}}\end{array}
$$  

$e_{i}$ in the first term of the equation is the per-atom energy (potential and kinetic). This is calculated by the computes ke-ID and pe-ID. $\mathbf{S}_{i}$ in the second term is the per-atom stress tensor calculated by the compute stress- $\cdot I D$ . See compute stress/atom and compute centroid/stress/atom for possible definitions of atomic stress $\mathbf{S}_{i}$ in the case of bonded and many-body interactions. The tensor multiplies $\mathbf{v}_{i}$ by a $3\times3$ matrix to yield a vector. Note that as discussed below, the $1/V$ scaling factor in the equation for J is not included in the calculation performed by these computes; you need to add it for a volume appropriate to the atoms included in the calculation.  

# $\Theta$ Note  

The compute pe/atom and compute stress/atom commands have options for which terms to include in their calculation (pair, bond, etc). The heat flux calculation will thus include exactly the same terms. Normally you should use  

compute stress/atom virial or compute centroid/stress/atom virial so as not to include a kinetic energy term in the heat flux.  

![](images/59e4910ac844efe91e3dd3192db183bec86485620659ea8529eedda2469ed2c5.jpg)  

# Warning  

The compute heat/flux has been reported to produce unphysical values for angle, dihedral, improper and constraint force contributions when used with compute stress/atom, as discussed in (Surblys2019), (Boone) and (Surblys2021). You are strongly advised to use compute centroid/stress/atom, which has been implemented specifically for such cases.  

![](images/28dbb3cf0279714093da5699443c81319238ce0375554a67a43a9da05298b564.jpg)  

# Warning  

Due to an implementation detail, the $y$ and $z$ components of heat flux from fix rigid contribution when computed via compute stress/atom are highly unphysical and should not be used.  

The Green–Kubo formulas relate the ensemble average of the auto-correlation of the heat flux J to the thermal conductivity $\kappa$ :  

$$
{\boldsymbol{\kappa}}={\frac{V}{k_{B}T^{2}}}\int_{0}^{\infty}\langle J_{x}(0)J_{x}(t)\rangle\mathrm{d}t={\frac{V}{3k_{B}T^{2}}}\int_{0}^{\infty}\langle\mathbf{J}(0)\cdot\mathbf{J}(t)\rangle\mathrm{d}t
$$  

The heat flux can be output every so many timesteps (e.g., via the thermo_style custom command). Then as a postprocessing operation, an auto-correlation can be performed, its integral estimated, and the Green–Kubo formula above evaluated.  

The fix ave/correlate command can calculate the auto-correlation. The trap() function in the variable command can calculate the integral.  

An example LAMMPS input script for solid argon is appended below. The result should be an average conductivity $\approx0.29\:\mathrm{W/m\cdotK}$ .  

# 3.56.4 Output info  

This compute calculates a global vector of length 6. The first three components are the $x,y,$ , and z components of the full heat flux vector (i.e., $J_{x},J_{y}$ , and $J_{z,}$ ). The next three components are the $x,y_{:}$ , and $z$ components of just the convective portion of the flux (i.e., the first term in the equation for J). Each component can be accessed by indices 1–6. These values can be used by any command that uses global vector values from a compute as input. See the Howto output documentation for an overview of LAMMPS output options.  

The vector values calculated by this compute are “extensive”, meaning they scale with the number of atoms in the simulation. They can be divided by the appropriate volume to get a flux, which would then be an “intensive” value, meaning independent of the number of atoms in the simulation. Note that if the compute group is “all”, then the appropriate volume to divide by is the simulation box volume. However, if a group with a subset of atoms is used, it should be the volume containing those atoms.  

The vector values will be in energy\*velocity units. Once divided by a volume the units will be that of flux, namely energy/area/time units  

# 3.56.5 Restrictions  

none  

# 3.56.6 Related commands  

fix thermal/conductivity, fix ave/correlate, variable  

# 3.56.7 Default  

none  

# Example Input File  

# Sample LAMMPS input script for thermal conductivity of solid Ar  

units real   
variable T equal 70   
variable V equal vol   
variable dt equal 4.0   
variable p equal 200 # correlation length   
variable s equal 10 # sample interval   
variable d equal \$p\*\$s # dump interval  

$\#$ convert from LAMMPS real units to SI  

variable kB equal 1.3806504e-23 # [J/K] Boltzmann   
variable kCal2J equal 4186.0/6.02214e23   
variable A2m equal 1.0e-10   
variable fs2s equal 1.0e-15   
variable convert equal \${kCal2J}\*\${kCal2J}/\${fs2s}/\${A2m}  

# # setup problem  

dimension 3   
boundary p p p   
lattice fcc 5.376 orient x 1 0 0 orient y $\mathrm{~0~1~0~}$ orient $\textbf{z}()~0\textbf{]}$   
region box block 0 4 0 4 0 4   
create_box 1 box   
create_atoms 1 box   
mass 1 39.948   
pair_style lj/cut 13.0 $-$   
pair_coeff $**_{0.23813.405}$ $-$   
timestep $\$\{\mathrm{dt}\}$   
thermo $\mathbb{S}$ d  

$\#$ equilibration and thermalization velocity all create \$T 102486 mom yes rot yes dist gaussian fix NVT all nvt temp \$T \$T 10 drag 0.2 run 8000  

(continues on next page)  

(continued from previous page)  

<html><body><table><tr><td colspan="2"># thermal conductivity calculation, switch to NVE if desired</td></tr><tr><td colspan="2">#unfix NVT #fix</td></tr><tr><td>NVE all nve</td><td></td></tr><tr><td></td><td></td></tr><tr><td colspan="2">reset_timestep 0</td></tr><tr><td>compute</td><td>myKE all ke/atom</td></tr><tr><td>compute</td><td>myPE all pe/atom</td></tr><tr><td>compute</td><td>myStress all stress/atom NULL virial</td></tr><tr><td>compute</td><td>fux all heat/fux myKE myPE myStress</td></tr><tr><td>variable</td><td>Jx equal c_fux[1l /vol</td></tr><tr><td>variable</td><td>Jy equal c_fux[2] /vol</td></tr><tr><td>variable</td><td>Jz equal c_fux[3] vol</td></tr><tr><td>fix</td><td>JJ all ave/correlate $s $p $d &</td></tr><tr><td>variable</td><td>c_fux[1] c_fux[2] c_fux[3] type auto file J0Jt.dat ave running</td></tr><tr><td>variable</td><td>scale equal ${convert}/${kB}/$T/$T/$V*$s*${dt}</td></tr><tr><td>variable</td><td>k11 equal trap(f_JJ[3])*${scale}</td></tr><tr><td>variable</td><td>k22 equal trap(f_JJ[4])*${scale} k33 equal trap(f_JJ[5])*${scale}</td></tr><tr><td></td><td>thermo_style custom step temp v_Jx v_Jy v_Jz v_k11 v_k22 v_k33</td></tr><tr><td colspan="2">100000</td></tr><tr><td>run variable</td><td></td></tr><tr><td>variable</td><td>k equal (v_k11+v_k22+v_k33)/3.0</td></tr><tr><td>print</td><td>ndens equal count(all) /vol</td></tr></table></body></html>  

(Surblys2019) Surblys, Matsubara, Kikugawa, Ohara, Phys Rev E, 99, 051301(R) (2019).   
(Boone) Boone, Babaei, Wilmer, J Chem Theory Comput, 15, 5579–5587 (2019).   
(Surblys2021) Surblys, Matsubara, Kikugawa, Ohara, J Appl Phys 130, 215104 (2021).  

# 3.57 compute hexorder/atom command  

# 3.57.1 Syntax  

compute ID group-ID hexorder/atom keyword values ...  

• ID, group-ID are documented in compute command   
• hexorder/atom $=$ style name of this compute command   
• one or more keyword/value pairs may be appended keyword $=$ degree or nnn or cutoff cutoff value $=$ distance cutoff nnn value $=$ number of nearest neighbors degree value $=$ degree n of order parameter  

# 3.57.2 Examples  

compute 1 all hexorder/atom compute 1 all hexorder/atom degree 4 nnn 4 cutoff 1.2  

# 3.57.3 Description  

Define a computation that calculates $q_{n}$ the bond-orientational order parameter for each atom in a group. The hexatic (n $=6$ ) order parameter was introduced by Nelson and Halperin as a way to detect hexagonal symmetry in two-dimensional systems. For each atom, $q_{n}$ is a complex number (stored as two real numbers) defined as follows:  

$$
q_{n}=\frac{1}{n n n}\sum_{j=1}^{n n n}e^{n i\theta(\mathbf{r}_{i j})}
$$  

where the sum is over the nnn nearest neighbors of the central atom. The angle $\theta$ is formed by the bond vector $r_{i j}$ and the $x$ axis. $\theta$ is calculated only using the $x$ and $y$ components, whereas the distance from the central atom is calculated using all three $x,y$ , and $z$ components of the bond vector. Neighbor atoms not in the group are included in the order parameter of atoms in the group.  

The optional keyword cutoff defines the distance cutoff used when searching for neighbors. The default value, also the maximum allowable value, is the cutoff specified by the pair style.  

The optional keyword nnn defines the number of nearest neighbors used to calculate $q_{n}$ . The default value is 6. If the value is NULL, then all neighbors up to the distance cutoff are used.  

The optional keyword degree sets the degree $n$ of the order parameter. The default value is 6. For a perfect hexagonal lattice with $n n n=6$ , $q_{6}=e^{6i\phi}$ for all atoms, where the constant $\begin{array}{r}{0<\phi<\frac{\pi}{3}}\end{array}$ depends only on the orientation of the lattice relative to the $x$ axis. In an isotropic liquid, local neighborhoods may still exhibit weak hexagonal symmetry, but because the orientational correlation decays quickly with distance, the value of $\phi$ will be different for different atoms, and so when $q_{6}$ is averaged over all the atoms in the system, $|\left\langle q_{6}\right\rangle|<<1$ .  

The value of $q_{n}$ is set to zero for atoms not in the specified compute group, as well as for atoms that have less than nnn neighbors within the distance cutoff.  

The neighbor list needed to compute this quantity is constructed each time the calculation is performed (i.e. each time a snapshot of atoms is dumped). Thus it can be inefficient to compute/dump this quantity too frequently.  

# Note  

If you have a bonded system, then the settings of special_bonds command can remove pairwise interactions between atoms in the same bond, angle, or dihedral. This is the default setting for the special_bonds command, and means those pairwise interactions do not appear in the neighbor list. Because this fix uses the neighbor list, it also means those pairs will not be included in the order parameter. This difficulty can be circumvented by writing a dump file, and using the rerun command to compute the order parameter for snapshots in the dump file. The rerun script can use a special_bonds command that includes all pairs in the neighbor list.  

# 3.57.4 Output info  

This compute calculates a per-atom array with 2 columns, giving the real and imaginary parts $q_{n}$ , a complex number restricted to the unit disk of the complex plane (i.e., $\Re(q_{n})^{2}+\Im(q_{n})^{2}\leq1)$ .  

These values can be accessed by any command that uses per-atom values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

# 3.57.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 3.57.6 Related commands  

compute orientorder/atom, compute coord/atom, compute centro/atom  

# 3.57.7 Default  

The option defaults are cutoff $=$ pair style cutoff, $n n n=6$ , degree $=6$  

(Nelson) Nelson, Halperin, Phys Rev B, 19, 2457 (1979).  

# 3.58 compute hma command  

# 3.58.1 Syntax  

compute ID group-ID hma temp-ID keyword ...  

• ID, group-ID are documented in compute command   
• hma $=$ style name of this compute command   
• temp- $\mathrm{\cdotID}=\mathrm{ID}$ of fix that specifies the set temperature during canonical simulation   
• one or more keywords or keyword/argument pairs must be appended   
• keyword $=$ anharmonic or $u$ or $p$ or $c\nu$  

anharmonic $=$ compute will return anharmonic property values ${\mathrm{u}}={\mathrm{c}}$ ompute will return potential energy p value $=$ Pharm $=$ compute will return pressure  

Pharm $=$ difference between the harmonic pressure and lattice pressure as described below cv = compute will return the heat capacity  

# 3.58.2 Examples  

compute 2 all hma 1 u   
compute 2 all hma 1 anharmonic u p 0.9   
compute 2 all hma 1 u cv  

# 3.58.3 Description  

Define a computation that calculates the properties of a solid (potential energy, pressure or heat capacity), using the harmonically-mapped averaging (HMA) method. This command yields much higher precision than the equivalent compute commands (compute pe, compute pressure, etc.) commands during a canonical simulation of an atomic crystal. Specifically, near melting HMA can yield averages of a given precision an order of magnitude faster than conventional methods, and this only improves as the temperatures is lowered. This is particularly important for evaluating the free energy by thermodynamic integration, where the low-temperature contributions are the greatest source of statistical uncertainty. Moreover, HMA has other advantages, including smaller potential-truncation effects, finite-size effects, smaller timestep inaccuracy, faster equilibration and shorter decorrelation time.  

HMA should not be used if atoms are expected to diffuse. It is also restricted to simulations in the NVT ensemble. While this compute may be used with any potential in LAMMPS, it will provide inaccurate results for potentials that do not go to 0 at the truncation distance; pair_style lj/smooth/linear and Ewald summation should work fine, while pair_style lj/cut will perform poorly unless the potential is shifted (via pair_modify shift) or the cutoff is large. Furthermore, computation of the heat capacity with this compute is restricted to those that implement the single_hessian method in Pair. Implementing single_hessian in additional pair styles is simple. Please contact Andrew Schultz (ajs42 at buffalo.edu) and David Kofke (kofke at buffalo.edu) if your desired pair style does not have this method. This is the list of pair styles that currently implement single_hessian:  

# • pair_style lj/smooth/linear  

In this method, the analytically known harmonic behavior of a crystal is removed from the traditional ensemble averages, which leads to an accurate and precise measurement of the anharmonic contributions without contamination by noise produced by the already-known harmonic behavior. A detailed description of this method can be found in (Moustafa). The potential energy is computed by the formula:  

$$
\langle U\rangle_{\mathrm{HMA}}={\frac{d}{2}}(N-1)k_{B}T+\left\langle U+{\frac{1}{2}}{\vec{F}}\cdot\Delta{\vec{r}}\right\rangle
$$  

where $N$ is the number of atoms in the system, $k_{B}$ is Boltzmann’s constant, $T$ is the temperature, $d$ is the dimensionality of the system (2 or 3 for 2d/3d), ${\vec{F}}\cdot\Delta{\vec{r}}$ is the sum of dot products of the atomic force vectors and displacement (from lattice sites) vectors, and $U$ is the sum of pair, bond, angle, dihedral, improper, kspace (long-range), and fix energies.  

The pressure is computed by the formula:  

$$
\langle P\rangle_{H M A}=\Delta\hat{P}+\left\langle P_{\mathrm{vir}}+\frac{\beta\Delta\hat{P}-\rho}{d(N-1)}\vec{F}\cdot\Delta\vec{r}\right\rangle
$$  

where $\rho$ is the number density of the system, $\Delta\hat{P}$ is the difference between the harmonic and lattice pressure, $P_{\mathrm{vir}}$ is the virial pressure computed as the sum of pair, bond, angle, dihedral, improper, kspace (long-range), and fix contributions to the force on each atom, and $k_{B}=1/k_{B}T$ . Although the method will work for any value of △P specified (use pressure units), the precision of the resultant pressure is sensitive to $\Delta\hat{P}$ ; the precision tends to be best when $\Delta\hat{P}$ is the actual the difference between the lattice pressure and harmonic pressure.  

$$
\left\langle{C_{V}}\right\rangle_{\mathrm{HMA}}=\frac{d}{2}(N-1)k_{B}+\frac{1}{k_{B}T^{2}}\left(\left\langle{U_{\mathrm{HMA}}^{2}}\right\rangle-\left\langle{U_{\mathrm{HMA}}}\right\rangle^{2}\right)+\frac{1}{4T}\left\langle{\vec{F}}\cdot\Delta{\vec{r}}+\Delta{r}\cdot\Phi\cdot\Delta{\vec{r}}\right\rangle
$$  

where $\Phi$ is the Hessian matrix. The compute hma command computes the full expression for $C_{V}$ except for the $\left<U_{\mathrm{HMA}}\right>^{2}$ in the variance term, which can be obtained by passing the $u$ keyword; you must add this extra contribution to the $C_{V}$ value reported by this compute. The variance term can cause significant round-off error when computing $C_{V}$ . To address this, the anharmonic keyword can be passed and/or the output format can be specified with more digits.  

thermo_modify format float '%22.15e'  

The anharmonic keyword will instruct the compute to return anharmonic properties rather than the full properties, which include lattice, harmonic and anharmonic contributions. When using this keyword, the compute must be first active (it must be included via a thermo_style custom command) while the atoms are still at their lattice sites (before equilibration).  

The temp-ID specified with compute hma command should be same as the fix-ID of the Nose–Hoover $(\it{\hbar}x n\nu t)$ or Berendsen (fix temp/berendsen) thermostat used for the simulation. While using this command, the Langevin thermostat (fix langevin) should be avoided as its extra forces interfere with the HMA implementation.  

![](images/15acdb0f934f6f83b45633cdd46efec0653d80e48ad779ffc7bce13686a648d1.jpg)  

# Note  

Compute hma command should be used right after the energy minimization, when the atoms are at their lattice sites. The simulation should not be started before this command has been used in the input script.  

The following example illustrates the placement of this command in the input script:  

# 3.58. compute hma command  

min_style cg minimize 1e-35 1e-15 50000 500000 compute 1 all hma thermostatid u fix thermostatid all nvt temp 600.0 600.0 100.0  

![](images/c7cf46beaca1e9dc30991f0434e49116b8c3e85b42b0e3d60a5569e6c8ea4085.jpg)  

# Note  

Compute hma should be used when the atoms of the solid do not diffuse. Diffusion will reduce the precision in the potential energy computation.  

![](images/cc3195e6a933abc36c3c7c1ea6300990084a0bca832b76cc08839b6885247c3e.jpg)  

# Note  

The fix_modify energy yes command must also be specified if a fix is to contribute potential energy to this command.  

An example input script that uses this compute is included in examples/PACKAGES/hma/ along with corresponding LAMMPS output showing that the HMA properties fluctuate less than the corresponding conventional properties.  

# 3.58.4 Output info  

This compute calculates a global vector that includes the n properties requested as arguments to the command (the potential energy, pressure and/or heat capacity). The elements of the vector can be accessed by indices $_{1-\mathrm{n}}$ by any command that uses global vector values as input. See the Howto output page for an overview of LAMMPS output options.  

The vector values calculated by this compute are “extensive”. The scalar value will be in energy units.  

# 3.58.5 Restrictions  

This compute is part of the EXTRA-COMPUTE package. It is enabled only if LAMMPS was built with that package.   
See the Build package page for more info.  

Usage restricted to canonical (NVT) ensemble simulation only.  

# 3.58.6 Related commands  

compute pe, compute pressure  

dynamical matrix provides a finite difference formulation of the Hessian provided by Pair’s single_hessian, which is used by this compute.  

# 3.58.7 Default  

none  

(Moustafa) Sabry G. Moustafa, Andrew J. Schultz, and David A. Kofke, Very fast averaging of thermal properties of crystals by molecular simulation, Phys. Rev. E [92], 043303 (2015)  

# 3.59 compute improper command  

# 3.59.1 Syntax  

compute ID group-ID improper  

• ID, group-ID are documented in compute command • improper $=$ style name of this compute command  

# 3.59.2 Examples  

# 3.59.3 Description  

Define a computation that extracts the improper energy calculated by each of the improper sub-styles used in the improper_style hybrid command. These values are made accessible for output or further processing by other commands. The group specified for this command is ignored.  

This compute is useful when using improper_style hybrid if you want to know the portion of the total energy contributed by one or more of the hybrid sub-styles.  

# 3.59.4 Output info  

This compute calculates a global vector of length $N$ , where $N$ is the number of sub_styles defined by the improper_style hybrid command. These styles can be accessed by the indices 1 through $N$ . These values can be used by any command that uses global scalar or vector values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector values are “extensive” and will be in energy units.  

# 3.59.5 Restrictions  

none  

# 3.59.6 Related commands  

compute pe, compute pair  

# 3.59.7 Default  

none  

# 3.60 compute improper/local command  

# 3.60.1 Syntax  

compute ID group-ID improper/local value1 value2 ...  

• ID, group-ID are documented in compute command • improper/local $=$ style name of this compute command • one or more values may be appended  

# 3.59. compute improper command  

• value = chi chi $=$ tabulate improper angles  

# 3.60.2 Examples  

# 3.60.3 Description  

Define a computation that calculates properties of individual improper interactions. The number of datums generated, aggregated across all processors, equals the number of impropers in the system, modified by the group parameter as explained below.  

The value chi is the improper angle, as defined in the doc pages for the individual improper styles listed on improper_style doc page.  

The local data stored by this command is generated by looping over all the atoms owned on a processor and their impropers. An improper will only be included if all four atoms in the improper are in the specified compute group.  

Note that as atoms migrate from processor to processor, there will be no consistent ordering of the entries within the local vector or array from one timestep to the next. The only consistency that is guaranteed is that the ordering on a particular timestep will be the same for local vectors or arrays generated by other compute commands. For example, improper output from the compute property/local command can be combined with data from this command and output by the dump local command in a consistent way.  

Here is an example of how to do this:  

<html><body><table><tr><td>       compute 2 all improper/ /localchi</td></tr></table></body></html>  

# 3.60.4 Output info  

This compute calculates a local vector or local array depending on the number of keywords. The length of the vector or number of rows in the array is the number of impropers. If a single keyword is specified, a local vector is produced. If two or more keywords are specified, a local array is produced where the number of columns $=$ the number of keywords. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The output for chi will be in degrees.  

# 3.60.5 Restrictions  

none  

# 3.60.6 Related commands  

dump local, compute property/local  

# 3.60.7 Default  

none  

# 3.61 compute inertia/chunk command  

# 3.61.1 Syntax  

compute ID group-ID inertia/chunk chunkID  

• ID, group-ID are documented in compute command • inertia/chunk $=$ style name of this compute command • chunkID $=$ ID of compute chunk/atom command  

# 3.61.2 Examples  

compute 1 fluid inertia/chunk molchunk  

# 3.61.3 Description  

Define a computation that calculates the inertia tensor for multiple chunks of atoms.  

In LAMMPS, chunks are collections of atoms defined by a compute chunk/atom command, which assigns each atom to a single chunk (or no chunk). The ID for this command is specified as chunkID. For example, a single chunk could be the atoms in a molecule or atoms in a spatial bin. See the compute chunk/atom and Howto chunk doc pages for details of how chunks can be defined and examples of how they can be used to measure properties of a system.  

This compute calculates the six components of the symmetric inertia tensor for each chunk, ordered $I_{x x},I_{y y},I_{z z},I_{x y},I_{y z},I_{x z}$ . The calculation includes all effects due to atoms passing through periodic boundaries.  

Note that only atoms in the specified group contribute to the calculation. The compute chunk/atom command defines its own group; atoms will have a chunk $\mathrm{ID}=0$ if they are not in that group, signifying they are not assigned to a chunk, and will thus also not contribute to this calculation. You can specify the “all” group for this command if you simply want to include atoms with non-zero chunk IDs.  

# Note  

The coordinates of an atom contribute to the chunk’s inertia tensor in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g., to 0) before invoking this compute by using the set image command.  

The simplest way to output the results of the compute inertia/chunk calculation to a file is to use the fix ave/time command, for example:  

compute cc1 all chunk/atom molecule   
compute myChunk all inertia/chunk cc1   
fix 1 all ave/time 100 1 100 c_myChunk[\*] file tmp.out mode vector  

# 3.61.4 Output info  

This compute calculates a global array where the number of rows $=$ the number of chunks Nchunk as calculated by the specified compute chunk/atom command. The number of columns is 6, one for each of the 6 components of the inertia tensor for each chunk, ordered as listed above. These values can be accessed by any command that uses global array values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The array values are “intensive”. The array values will be in mass\*distance2 units.  

# 3.61. compute inertia/chunk command  

# 3.61.5 Restrictions  

none  

# 3.61.6 Related commands  

variable inertia() function  

# 3.61.7 Default  

none  

# 3.62 compute ke command  

# 3.62.1 Syntax  

compute ID group-ID ke  

• ID, group-ID are documented in compute command • $\mathrm{ke=}$ style name of this compute command  

# 3.62.2 Examples  

# 3.62.3 Description  

Define a computation that calculates the translational kinetic energy of a group of particles.  

The kinetic energy of each particle is computed as ${\scriptstyle{\frac{1}{2}}}m\nu^{2}$ , where $m$ and $\nu$ are the mass and velocity of the particle, respectively.  

There is a subtle difference between the quantity calculated by this compute and the kinetic energy calculated by the $k e$ or etotal keyword used in thermodynamic output, as specified by the thermo_style command. For this compute, kinetic energy is “translational” kinetic energy, calculated by the simple formula above. For thermodynamic output, the ke keyword infers kinetic energy from the temperature of the system with ${\frac{1}{2}}k_{B}T$ of energy for each degree of freedom. For the default temperature computation via the compute temp command, these are the same. However, different computes that calculate temperature can subtract out different non-thermal components of velocity and/or include different degrees of freedom (translational, rotational, etc.).  

# 3.62.4 Output info  

This compute calculates a global scalar (the summed KE). This value can be used by any command that uses a global scalar value from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “extensive”. The scalar value will be in energy units.  

# 3.62.5 Restrictions  

none  

# 3.62.6 Related commands  

compute erotate/sphere  

# 3.62.7 Default  

none  

# 3.63 compute ke/atom command  

# 3.63.1 Syntax  

compute ID group-ID ke/atom  

• ID, group-ID are documented in compute command • ke/atom $=$ style name of this compute command  

# 3.63.2 Examples  

# 3.63.3 Description  

Define a computation that calculates the per-atom translational kinetic energy for each atom in a group.   
The kinetic energy is simply ${\scriptstyle{\frac{1}{2}}}m\nu^{2}$ , where $m$ is the mass and $\nu$ is the velocity of each atom.   
The value of the kinetic energy will be 0.0 for atoms not in the specified compute group.  

# 3.63.4 Output info  

This compute calculates a per-atom vector, which can be accessed by any command that uses per-atom values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in energy units.  

# 3.63.5 Restrictions  

none  

# 3.63.6 Related commands  

dump custom  

# 3.63.7 Default  

none  

# 3.64 compute ke/atom/eff command  

# 3.64.1 Syntax  

• ID, group-ID are documented in compute command • ke/atom/eff $=$ style name of this compute command  

# 3.64.2 Examples  

# 3.64.3 Description  

Define a computation that calculates the per-atom translational (nuclei and electrons) and radial kinetic energy (electron only) in a group. The particles are assumed to be nuclei and electrons modeled with the electronic force field.  

The kinetic energy for each nucleus is computed as ${\scriptstyle{\frac{1}{2}}}m\nu^{2}$ , where $m$ corresponds to the corresponding nuclear mass, and the kinetic energy for each electron is computed as $\begin{array}{r}{\frac{1}{2}(m_{e}\nu^{2}+\frac{3}{4}m_{e}s^{2})}\end{array}$ , where $m_{e}$ and $\nu$ correspond to the mass and translational velocity of each electron, and $s$ to its radial velocity, respectively.  

There is a subtle difference between the quantity calculated by this compute and the kinetic energy calculated by the $k e$ or etotal keyword used in thermodynamic output, as specified by the thermo_style command. For this compute, kinetic energy is “translational” plus electronic “radial” kinetic energy, calculated by the simple formula above. For thermodynamic output, the $k e$ keyword infers kinetic energy from the temperature of the system with ${\frac{1}{2}}k_{B}T$ of energy for each (nuclear-only) degree of freedom in eFF.  

# Note  

The temperature in eFF should be monitored via the compute temp/eff command, which can be printed with thermodynamic output by using the thermo_modify command, as shown in the following example:  

compute effTemp all temp/eff thermo_style custom step etotal pe ke temp press thermo_modify temp effTemp  

The value of the kinetic energy will be 0.0 for atoms (nuclei or electrons) not in the specified compute group.  

# 3.64.4 Output info  

This compute calculates a scalar quantity for each atom, which can be accessed by any command that uses per-atom computes as input. See the Howto output page for an overview of LAMMPS output options.  

The per-atom vector values will be in energy units.  

# 3.64.5 Restrictions  

This compute is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 3.64.6 Related commands  

dump custom  

# 3.64.7 Default  

none  

# 3.65 compute ke/eff command  

# 3.65.1 Syntax  

# compute ID group-ID ke/eff  

• ID, group-ID are documented in compute command • ke/ef $=$ style name of this compute command  

# 3.65.2 Examples  

# 3.65.3 Description  

Define a computation that calculates the kinetic energy of motion of a group of eFF particles (nuclei and electrons), as modeled with the electronic force field.  

The kinetic energy for each nucleus is computed as ${\scriptstyle{\frac{1}{2}}}m\nu^{2}$ and the kinetic energy for each electron is computed as $\begin{array}{r}{\frac{1}{2}(m_{e}\nu^{2}+\frac{3}{4}m_{e}s^{2})}\end{array}$ , where $m$ corresponds to the nuclear mass, $m_{e}$ to the electron mass, $\nu$ to the translational velocity of each particle, and $s$ to the radial velocity of the electron, respectively.  

There is a subtle difference between the quantity calculated by this compute and the kinetic energy calculated by the $k e$ or etotal keyword used in thermodynamic output, as specified by the thermo_style command. For this compute, kinetic energy is “translational” and “radial” (only for electrons) kinetic energy, calculated by the simple formula above. For thermodynamic output, the $k e$ keyword infers kinetic energy from the temperature of the system with ${\frac{1}{2}}k_{B}T$ of energy for each degree of freedom. For the eFF temperature computation via the compute temp_eff command, these are the same. But different computes that calculate temperature can subtract out different non-thermal components of velocity and/or include other degrees of freedom.  

![](images/2e5c74ab9dc6f77861fe41158d1f78029b53269f43d09bb5691e847ce184a29b.jpg)  

# Warning  

The temperature in eFF models should be monitored via the compute temp/eff command, which can be printed with thermodynamic output by using the thermo_modify command, as shown in the following example:  

compute effTemp all temp/eff thermo_style custom step etotal pe ke temp press thermo_modify temp effTemp  

See compute temp/eff .  

# 3.65.4 Output info  

This compute calculates a global scalar (the KE). This value can be used by any command that uses a global scalar value from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The scalar value calculated by this compute is “extensive”. The scalar value will be in energy units.  

# 3.65. compute ke/eff command  