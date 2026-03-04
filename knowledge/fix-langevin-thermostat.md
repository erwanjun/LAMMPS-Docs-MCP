---
title: "Fix Langevin Thermostat"
description: "fix langevin thermostat including Drude oscillator and eff variants"
category: "fix"
tags: ["thermostat", "langevin", "temperature-control", "Drude"]
commands: ["fix langevin", "fix langevin/drude", "fix langevin/eff"]
---
A simulation using atom_style sphere defines an omega for finite-size spheres. A simulation using atom_style ellipsoid defines a finite size and shape for aspherical particles and an angular momentum. The Langevin formulas for thermostatting the rotational degrees of freedom are the same as those above, where force is replaced by torque, m is replaced by the moment of inertia I, and v is replaced by omega (which is derived from the angular momentum in the case of aspherical particles).  

The rotational temperature of the particles can be monitored by the compute temp/sphere and compute temp/asphere commands with their rotate options.  

For the omega keyword there is also a scale factor of $\frac{10.0}{3.0}$ that is applied as a multiplier on the $F_{f}$ (damping) term in the equation above and of $\displaystyle{\sqrt{\frac{10.0}{3.0}}}$ as a multiplier on the $F_{r}$ term. This does not affect the thermostatting behavior of the Langevin formalism but ensures that the randomized rotational diffusivity of spherical particles is correct.  

For the angmom keyword a similar scale factor is needed which is $\frac{10.0}{3.0}$ for spherical particles, but is anisotropic for aspherical particles (e.g. ellipsoids). Currently LAMMPS only applies an isotropic scale factor, and you can choose its magnitude as the specified value of the angmom keyword. If your aspherical particles are (nearly) spherical than a value of $\textstyle{\frac{10.0}{3.0}}=3{\overline{{3}}}$ is a good choice. If they are highly aspherical, a value of 1.0 is as good a choice as any, since the effects on rotational diffusivity of the particles will be incorrect regardless. Note that for any reasonable scale factor, the thermostatting effect of the angmom keyword on the rotational temperature of the aspherical particles should still be valid.  

The keyword scale allows the damp factor to be scaled up or down by the specified factor for atoms of that type. This can be useful when different atom types have different sizes or masses. It can be used multiple times to adjust damp for several atom types. Note that specifying a ratio of 2 increases the relaxation time which is equivalent to the solvent’s viscosity acting on particles with $\frac12$ the diameter. This is the opposite effect of scale factors used by the fix viscous command, since the damp factor in fix langevin is inversely related to the $\gamma$ factor in fix viscous. Also note that the damping factor in fix langevin includes the particle mass in Ff, unlike fix viscous. Thus the mass and size of different atom types should be accounted for in the choice of ratio values.  

The keyword tally enables the calculation of the cumulative energy added/subtracted to the atoms as they are thermostatted. Effectively it is the energy exchanged between the infinite thermal reservoir and the particles. As described below, this energy can then be printed out or added to the potential energy of the system to monitor energy conservation.  

The keyword zero can be used to eliminate drift due to the thermostat. Because the random forces on different atoms are independent, they do not sum exactly to zero. As a result, this fix applies a small random force to the entire system, and the center-of-mass of the system undergoes a slow random walk. If the keyword zero is set to yes, the total random force is set exactly to zero by subtracting off an equal part of it from each atom in the group. As a result, the center-of-mass of a system with zero initial momentum will not drift over time.  

The keyword gjf can be used to run the Gronbech-Jensen/Farago time-discretization of the Langevin model. As described in the papers cited below, the purpose of this method is to enable longer timesteps to be used (up to the numerical stability limit of the integrator), while still producing the correct Boltzmann distribution of atom positions.  

The current implementation provides the user with the option to output the velocity in one of two forms: vfull or vhalf, which replaces the outdated option yes. The gjf option vfull outputs the on-site velocity given in GronbechJensen/Farago; this velocity is shown to be systematically lower than the target temperature by a small amount, which grows quadratically with the timestep. The gjf option vhalf outputs the 2GJ half-step velocity given in Gronbech Jensen/Gronbech-Jensen; for linear systems, this velocity is shown to not have any statistical errors for any stable time step. An overview of statistically correct Boltzmann and Maxwell-Boltzmann sampling of true on-site and true half-step velocities is given in Gronbech-Jensen. Regardless of the choice of output velocity, the sampling of the configurational distribution of atom positions is the same, and linearly consistent with the target temperature.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.84.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. Because the state of the random number generator is not saved in restart files, this means you cannot do “exact” restarts with this fix, where the simulation continues on the same as if no restart had taken place. However, in a statistical sense, a restarted simulation should produce the same behavior.  

The fix_modify temp option is supported by this fix. You can use it to assign a temperature compute you have defined to this fix which will be used in its thermostatting procedure, as described above. For consistency, the group used by this fix and by the compute should be the same.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve, but only if the tally keyword to set to yes. See the thermo_style page for details.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”. Note that calculation of this quantity also requires setting the tally keyword to yes.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.84.5 Restrictions  

For gjf do not choose damp ${}^{1}={}$ dt/2. gjf is not compatible with run_style respa.  

# 2.84.6 Related commands  

fix nvt, fix temp/rescale, fix viscous, fix nvt, pair_style dpd/tstat  

# 2.84.7 Default  

The option defaults are angmom $=$ no, omega $=$ no, scale $=1.0$ for all types, tally $=$ no, zero $=$ no, gjf ${\mathbf{\mu}}=\mathbf{n}\mathbf{0}$ .  

# 2.85 fix langevin/drude command  

# 2.85.1 Syntax  

fix ID group-ID langevin/drude Tcom damp_com seed_com Tdrude damp_drude seed_drude keyword␣ $\hookrightarrow$ values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• langevin/drude $=$ style name of this fix command   
• Tcom $=$ desired temperature of the centers of mass (temperature units)   
• damp_com $=$ damping parameter for the thermostat on centers of mass (time units)   
• seed_com $=$ random number seed to use for white noise of the thermostat on centers of mass (positive integer)   
• Tdrude $=$ desired temperature of the Drude oscillators (temperature units)   
• damp_drude $=$ damping parameter for the thermostat on Drude oscillators (time units)   
• seed_drude $=$ random number seed to use for white noise of the thermostat on Drude oscillators (positive integer)   
• zero or more keyword/value pairs may be appended   
• keyword = zero zero value $=\mathrm{no}$ or yes no $\mathbf{\mu}=\mathrm{do}$ not set total random force on centers of mass to zero yes $=$ set total random force on centers of mass to zero  

# 2.85.2 Examples  

<html><body><table><tr><td>fix 3 all langevin/ /drude 300.0 100.019377 1.0 20.083451 fix 1 all langevin drude 298.15 100.0 19377 5.0 10.0 83451 zeroyes</td></tr></table></body></html>  

Example input scripts available: examples/PACKAGES/drude  

# 2.85.3 Description  

Apply two Langevin thermostats as described in (Jiang1) for thermalizing the reduced degrees of freedom of Drude oscillators. This link describes how to use the thermalized Drude oscillator model in LAMMPS and polarizable models in LAMMPS are discussed on the Howto polarizable doc page.  

Drude oscillators are a way to simulate polarizables atoms, by splitting them into a core and a Drude particle bound by a harmonic bond. The thermalization works by transforming the particles degrees of freedom by these equations. In these equations upper case denotes atomic or center of mass values and lower case denotes Drude particle or dipole values. Primes denote the transformed (reduced) values, while bare letters denote the original values.  

Velocities:  

$$
V^{\prime}=\frac{M V+m\nu}{M^{\prime}}
$$  

$$
\nu^{\prime}=\nu-V
$$  

Masses:  

$$
\begin{array}{c}{{M^{\prime}=M+m}}\ {{}}\ {{m^{\prime}=\displaystyle\frac{M m}{M^{\prime}}}}\end{array}
$$  

The Langevin forces are computed as  

$$
\begin{array}{c}{{\displaystyle F^{\prime}=-\frac{M^{\prime}}{\mathrm{damp}_{\mathrm{c}}\mathrm{om}}V^{\prime}+F_{r}^{\prime}}}\ {{\displaystyle}}\ {{\displaystyle f^{\prime}=-\frac{m^{\prime}}{\mathrm{damp}_{\mathrm{d}}\mathrm{rude}}\nu^{\prime}+f_{r}^{\prime}}}\end{array}
$$  

$F_{r}^{\prime}$ is a random force proportional to q 2d tk BdTacmopmc omm′ . f r′ is a random force proportional to $\sqrt{\frac{2k_{B}\mathrm{Tdrude}m^{\prime}}{\mathrm{d}t\mathrm{damp_{d}r u d e}}}$ . Then the real forces acting on the particles are computed from the inverse transform:  

$$
\begin{array}{c c c}{{F=\displaystyle\frac{M}{M^{\prime}}F^{\prime}-f^{\prime}}}\ {{{}}}\ {{f=\displaystyle\frac{m}{M^{\prime}}F^{\prime}+f^{\prime}}}\end{array}
$$  

This fix also thermostats non-polarizable atoms in the group at temperature Tcom, as if they had a massless Drude partner. The Drude particles themselves need not be in the group. The center of mass and the dipole are thermostatted iff the core atom is in the group.  

Note that the thermostat effect of this fix is applied to only the translational degrees of freedom of the particles, which is an important consideration if finite-size particles, which have rotational degrees of freedom, are being thermostatted. The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

# Note  

Like the fix langevin command, this fix does NOT perform time integration. It only modifies forces to effect thermostatting. Thus you must use a separate time integration fix, like fix nve or fix nph to actually update the velocities and positions of atoms using the modified forces. Likewise, this fix should not normally be used on atoms that also have their temperature controlled by another fix - e.g. by fix nvt or fix temp/rescale commands.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

This fix requires each atom know whether it is a Drude particle or not. You must therefore use the fix drude command to specify the Drude status of each atom type.  

![](images/655025b5bbdff34df85f918a4857176a3b46136974ddfabd05163e79a206dfb6.jpg)  

# Note  

only the Drude core atoms need to be in the group specified for this fix. A Drude electron will be transformed together with its cores even if it is not itself in the group. It is safe to include Drude electrons or non-polarizable atoms in the group. The non-polarizable atoms will simply be thermostatted as if they had a massless Drude partner (electron).  

![](images/86f7d6e165ec60c515ea8047aa53dbe76bec458cd602e6b512aca9faf892b6a5.jpg)  

# Note  

Ghost atoms need to know their velocity for this fix to act correctly. You must use the comm_modify command to enable this, e.g.  

Tcom is the target temperature of the centers of mass, which would be used to thermostat the non-polarizable atoms. Tdrude is the (normally low) target temperature of the core-Drude particle pairs (dipoles). Tcom and Tdrude can be specified as an equal-style variable. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the target temperature.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent temperature.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the x-component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

Note: The temperature thermostatting the core-Drude particle pairs should be chosen low enough, so as to mimic as closely as possible the self-consistent minimization. It must however be high enough, so that the dipoles can follow the local electric field exerted by the neighboring atoms. The optimal value probably depends on the temperature of the centers of mass and on the mass of the Drude particles.  

damp_com is the characteristic time for reaching thermal equilibrium of the centers of mass. For example, a value of 100.0 means to relax the temperature of the centers of mass in a timespan of (roughly) 100 time units (tau or fs or ps - see the units command). damp_drude is the characteristic time for reaching thermal equilibrium of the dipoles. It is typically a few timesteps.  

The number seed_com and seed_drude are positive integers. They set the seeds of the Marsaglia random number generators used for generating the random forces on centers of mass and on the dipoles. Each processor uses the input seed to generate its own unique seed and its own stream of random numbers. Thus the dynamics of the system will not be identical on two runs on different numbers of processors.  

The keyword zero can be used to eliminate drift due to the thermostat on centers of mass. Because the random forces on different centers of mass are independent, they do not sum exactly to zero. As a result, this fix applies a small random force to the entire system, and the momentum of the total center of mass of the system undergoes a slow random walk. If the keyword zero is set to yes, the total random force on the centers of mass is set exactly to zero by subtracting off an equal part of it from each center of mass in the group. As a result, the total center of mass of a system with zero initial momentum will not drift over time.  

The actual temperatures of cores and Drude particles, in center-of-mass and relative coordinates, respectively, can be calculated using the compute temp/drude command.  

Usage example for rigid bodies in the NPT ensemble:  

• Drude particles should not be in the rigid group, otherwise the Drude oscillators will be frozen and the system will lose its polarizability.   
• zero yes avoids a drift of the center of mass of the system, but is a bit slower.   
• Use two different random seeds to avoid unphysical correlations.   
• Temperature is controlled by the fix langevin/drude, so the time-integration fixes do not thermostat. Don’t forget to time-integrate both cores and Drude particles.   
• Pressure is time-integrated only once by using nve for Drude particles and nph for atoms/cores (or vice versa). Do not use nph for both.   
• The temperatures of cores and Drude particles are calculated by compute temp/drude   
• Contrary to the alternative thermostatting using Nose-Hoover thermostat fix npt and fix drude/transform, the fix_modify command is not required here, because the fix nph computes the global pressure even if its group is ATOMS. This is what we want. If we thermostatted ATOMS using npt, the pressure should be the global one, but the temperature should be only that of the cores. That’s why the command fix_modify should be called in that case.  

# 2.85.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. Because the state of the random number generator is not saved in restart files, this means you cannot do “exact” restarts with this fix, where the simulation continues on the same as if no restart had taken place. However, in a statistical sense, a restarted simulation should produce the same behavior.  

The fix_modify temp option is supported by this fix. You can use it to assign a temperature compute you have defined to this fix which will be used in its thermostatting procedure, as described above. For consistency, the group used by the compute should include the group of this fix and the Drude particles.  

This fix is not invoked during energy minimization.  

# 2.85.5 Restrictions  

none  

# 2.85.6 Related commands  

fix langevin, fix drude, fix drude/transform, compute temp/drude, pair_style thole  

# 2.85.7 Default  

The option defaults are zero $=$ no.  

(Jiang1) Jiang, Hardy, Phillips, MacKerell, Schulten, and Roux, J Phys Chem Lett, 2, 87-92 (2011).  

# 2.86 fix langevin/eff command  

# 2.86.1 Syntax  

fix ID group-ID langevin/eff Tstart Tstop damp seed keyword values ...  

• ID, group-ID are documented in fix command  

# 2.86. fix langevin/eff command  

• langevin/eff $=$ style name of this fix command   
• Tstart,Tstop $=$ desired temperature at start/end of run (temperature units)   
• damp $=$ damping parameter (time units)   
• seed $=$ random number seed to use for white noise (positive integer)   
• zero or more keyword/value pairs may be appended keyword $=$ scale or tally or zero scale values $=$ type ratio type $=$ atom type (1-N) ratio $=$ factor by which to scale the damping coefficient tally values $=\mathrm{no}$ or yes $\mathrm{no}=\mathrm{do}$ not tally the energy added/subtracted to atoms yes = do tally the energy added/subtracted to atoms zero value = no or yes no = do not set total random force to zero yes = set total random force to zero  

# 2.86.2 Examples  

fix 3 boundary langevin/eff 1.0 1.0 10.0 699483   
fix 1 all langevin/eff 1.0 1.1 10.0 48279 scale 3 1.5  

# 2.86.3 Description  

Apply a Langevin thermostat as described in (Schneider) to a group of nuclei and electrons in the electron force field model. Used with fix nve/eff , this command performs Brownian dynamics (BD), since the total force on each atom will have the form:  

$$
\begin{array}{r}{F=F_{c}+F_{f}+F_{r}}\ {F_{f}=-\cfrac{m}{\operatorname{damp}{\vphantom{|}}}\nu}\ {F_{r}\propto\sqrt{\cfrac{k_{B}T m}{d t\operatorname{damp}{\vphantom{|}}}}}\end{array}
$$  

$F_{c}$ is the conservative force computed via the usual inter-particle interactions (pair_style). The $F_{f}$ and $F_{r}$ terms are added by this fix on a per-particle basis.  

The operation of this fix is exactly like that described by the fix langevin command, except that the thermostatting is also applied to the radial electron velocity for electron particles.  

# 2.86.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. Because the state of the random number generator is not saved in restart files, this means you cannot do “exact” restarts with this fix, where the simulation continues on the same as if no restart had taken place. However, in a statistical sense, a restarted simulation should produce the same behavior.  

The fix_modify temp option is supported by this fix. You can use it to assign a temperature compute you have defined to this fix which will be used in its thermostatting procedure, as described above. For consistency, the group used by this fix and by the compute should be the same.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve, but only if the tally keyword to set to yes. See the thermo_style page for details.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”. Note that calculation of this quantity also requires setting the tally keyword to yes.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.86.5 Restrictions  

none  

This fix is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.86.6 Related commands  

fix langevin  

# 2.86.7 Default  

The option defaults are scale $=1.0$ for all types and tally $\mathbf{\mu}=\mathbf{n}\mathbf{O}$ .  

(Dunweg) Dunweg and Paul, Int J of Modern Physics C, 2, 817-27 (1991).   
(Schneider) Schneider and Stoll, Phys Rev B, 17, 1302 (1978).  

# 2.87 fix langevin/spin command  

# 2.87.1 Syntax  

fix ID group-ID langevin/spin T Tdamp seed • ID, group-ID are documented in fix command • langevin/spin $=$ style name of this fix command • $\mathrm{T}=$ desired temperature of the bath (temperature units, K in metal units) • Tdamp $=$ transverse magnetic damping parameter (adim) • seed $=$ random number seed to use for white noise (positive integer)  

# 2.87.2 Examples  

fix 2 all langevin/spin 300.0 0.01 21  

# 2.87.3 Description  

Apply a Langevin thermostat as described in (Mayergoyz) to the magnetic spins associated to the atoms. Used with $f\alpha$ nve/spin, this command performs Brownian dynamics (BD). A random torque and a transverse dissipation are applied to each spin i according to the following stochastic differential equation:  

$$
\frac{d\vec{s}_{i}}{d t}=\frac{1}{\left(1+\lambda^{2}\right)}\left(\left(\vec{\omega}_{i}+\vec{\eta}\right)\times\vec{s}_{i}+\lambda\vec{s}_{i}\times\left(\vec{\omega}_{i}\times\vec{s}_{i}\right)\right)
$$  

# 2.87. fix langevin/spin command  

with $\lambda$ the transverse damping, and $\eta$ a random vector. This equation is referred to as the stochastic Landau-Lifshitz (sLL) equation.  

The components of $\eta$ are drawn from a Gaussian probability law. Their amplitude is defined as a proportion of the temperature of the external thermostat T (in K in metal units).  

More details about this implementation are reported in (Tranchida).  

Note: due to the form of the sLL equation, this fix has to be defined just before the nve/spin fix (and after all other magnetic fixes). As an example:  

fix 1 all precession/spin zeeman 0.01 0.0 0.0 1.0 fix 2 all langevin/spin 300.0 0.01 21 fix 3 all nve/spin lattice moving  

is correct, but defining a force/spin command after the langevin/spin command would give an error message.  

Note: The random # seed must be a positive integer. A Marsaglia random number generator is used. Each processor uses the input seed to generate its own unique seed and its own stream of random numbers. Thus the dynamics of the system will not be identical on two runs on different numbers of processors.  

# 2.87.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. Because the state of the random number generator is not saved in restart files, this means you cannot do “exact” restarts with this fix, where the simulation continues on the same as if no restart had taken place. However, in a statistical sense, a restarted simulation should produce the same behavior.  

This fix is not invoked during energy minimization.  

# 2.87.5 Restrictions  

The langevin/spin fix is part of the SPIN package. This style is only enabled if LAMMPS was built with this package.   
See the Build package page for more info.  

The numerical integration has to be performed with fix nve/spin when fix langevin/spin is enabled.  

This fix has to be the last defined magnetic fix before the time integration fix (e.g. fix nve/spin).  

# 2.87.6 Related commands  

fix nve/spin, fix precession/spin  

# 2.87.7 Default  

none  

(Mayergoyz) I.D. Mayergoyz, G. Bertotti, C. Serpico (2009). Elsevier (2009)  

(Tranchida) Tranchida, Plimpton, Thibaudeau and Thompson, Journal of Computational Physics, 372, 406-425, (2018).  

# 2.88 fix lb/fluid command  

# 2.88.1 Syntax  

fix ID group-ID lb/fluid nevery viscosity density keyword values ...  

• ID, group-ID are documented in fix command   
• lb/fluid $=$ style name of this fix command   
• nevery $=$ update the lattice-Boltzmann fluid every this many timesteps (should normally be 1)   
• viscosity $=$ the fluid viscosity (units of mass/(time\*length)).   
• density $=$ the fluid density.   
• zero or more keyword/value pairs may be appended   
• keyword $=d x$ or dm or noise or stencil or read_restart or write_restart or zwall_velocity or pressurebcx or bodyforce or $D3Q I9$ or dumpxdmf or linearInit or dof or scaleGamma or a0 or npits or wp or sw dx values $=\mathrm{dx\_LB=t}{\mathrm{1}}$ he lattice spacing. dm values = dm_LB = the lattice-Boltzmann mass unit. noise values $=$ Temperature seed  

Temperature $=$ fluid temperature.  

seed = random number generator seed (positive integer) stencil values $=2$ (trilinear stencil, the default), 3 (3-point immersed boundary stencil), or 4␣ ,→(4-point Keys' interpolation stencil) read_restart values = restart file = name of the restart file to use to restart a fluid run. write_restart values = N = write a restart file every N MD timesteps. zwall_velocity values = velocity_bottom velocity_top = velocities along the y-direction of the␣ ,→bottom and top walls (located at z=zmin and z=zmax). pressurebcx values = pgradav $-$ imposes a pressure jump at the (periodic) x-boundary of␣ $\hookrightarrow$ pgradav\*Lx\*1000. bodyforce values = bodyforcex bodyforcey bodyforcez = the x,y and z components of a constant␣ $\hookrightarrow$ body force added to the fluid. D3Q19 values = none (used to switch from the default D3Q15, 15 velocity lattice, to the D3Q19, 19␣ $\hookrightarrow$ velocity lattice). dumpxdmf values = N file timeI N = output the force and torque every N timesteps file = output file name timeI = 1 (use simulation time to index xdmf file), 0 (use output frame number to index xdmf␣ $\hookrightarrow$ file) linearInit values = none = initialize density and velocity using linear interpolation (default is␣ $\hookrightarrow$ uniform density, no velocities) dof values = dof = specify the number of degrees of freedom for temperature calculation scaleGamma values = type gammaFactor type = atom type (1-N) gammaFactor = factor to scale the setGamma gamma value by, for the specified atom type. a0 values = a_0_real = the square of the speed of sound in the fluid. npits values = npits h_p l_p l_pp l_e npits $-$ number of pit regions $\mathbf{h}\_{\mathrm{~p~}}=\mathbf{z}$ -height of pit regions (floor to bottom of slit) $\mathbf{l}\_{\mathrm{~p~}}\mathbf{=x}$ -length of pit regions $\mathrm{l\_pp=x}$ -length of slit regions between consecutive pits $\mathbf{l}\_{\mathbf{e}}=\mathbf{x}$ -length of slit regions at ends wp values = w_p = y-width of slit regions (defaults to full width if not present or if sw active)  

sw values $=$ none (turns on y-sidewalls (in xz plane) if npits option active)  

# 2.88.2 Examples  

fix 1 all lb/fluid 1 1.0 0.0009982071 dx 1.2 dm 0.001   
fix 1 all lb/fluid 1 1.0 0.0009982071 dx 1.2 dm 0.001 noise 300.0 2761   
fix 1 all lb/fluid 1 1.0 1.0 dx 4.0 dm 10.0 dumpxdmf 500 fflow 0 pressurebcx 0.01 npits 2 20 40 5 0 wp 30  

# 2.88.3 Description  

Changed in version 24Mar2022.  

Implement a lattice-Boltzmann fluid on a uniform mesh covering the LAMMPS simulation domain. Note that this fix was updated in 2022 and is not backward compatible with the previous version. If you need the previous version, please download an older version of LAMMPS. The MD particles described by group- $\mathbf{\nabla}\cdot I D$ apply a velocity dependent force to the fluid.  

The lattice-Boltzmann algorithm solves for the fluid motion governed by the Navier Stokes equations,  

$$
\begin{array}{c}{\partial_{t}\rho+\partial_{\beta}\left(\rho u_{\beta}\right)=0}\ {\partial_{t}\left(\rho u_{\alpha}\right)+\partial_{\beta}\left(\rho u_{\alpha}u_{\beta}\right)=\partial_{\beta}\sigma_{\alpha\beta}+F_{\alpha}+\partial_{\beta}\left(\eta_{\alpha\beta\gamma\nu}\partial_{\gamma}u_{\nu}\right)}\end{array}
$$  

with,  

$$
\eta_{\alpha\beta\gamma\nu}=\eta\left[\delta_{\alpha\gamma}\delta_{\beta\nu}+\delta_{\alpha\nu}\delta_{\beta\gamma}-\frac{2}{3}\delta_{\alpha\beta}\delta_{\gamma\nu}\right]+\Lambda\delta_{\alpha\beta}\delta_{\gamma\nu}
$$  

where $\rho$ is the fluid density, $u$ is the local fluid velocity, $\sigma$ is the stress tensor, $F$ is a local external force, and $\eta$ and $\Lambda$ are the shear and bulk viscosities respectively. Here, we have implemented  

$$
\sigma_{\alpha\beta}=-P_{\alpha\beta}=-\rho a_{0}\delta_{\alpha\beta}
$$  

with $a_{0}$ set to ${\frac{1}{3}}{\frac{d x}{d t}}^{2}$ by default. You should not normally need to change this default.  

The algorithm involves tracking the time evolution of a set of partial distribution functions which evolve according to a velocity discretized version of the Boltzmann equation,  

$$
\left(\partial_{t}+e_{i\alpha}\partial_{\alpha}\right)f_{i}=-\frac{1}{\tau}\left(f_{i}-f_{i}^{e q}\right)+W_{i}
$$  

where the first term on the right hand side represents a single time relaxation towards the equilibrium distribution function, and $\tau$ is a parameter physically related to the viscosity. On a technical note, we have implemented a 15 velocity model (D3Q15) as default; however, the user can switch to a 19 velocity model (D3Q19) through the use of the $D3Q I9$ keyword. Physical variables are then defined in terms of moments of the distribution functions,  

$$
\begin{array}{c}{\displaystyle\rho=\sum_{i}f_{i}}\ {\displaystyle\rho u_{\alpha}=\sum_{i}f_{i}e_{i\alpha}}\end{array}
$$  

Full details of the lattice-Boltzmann algorithm used can be found in Denniston et al..  

The fluid is coupled to the MD particles described by group- $\cdot I D$ through a velocity dependent force. The contribution to the fluid force on a given lattice mesh site j due to MD particle $\alpha$ is calculated as:  

$$
\mathbf{F}_{j\alpha}=\gamma\left(\mathbf{v}_{n}-\mathbf{u}_{f}\right)\zeta_{j\alpha}
$$  

where ${\bf v}_{n}$ is the velocity of the MD particle, $\mathbf{u}_{f}$ is the fluid velocity interpolated to the particle location, and $\gamma$ is the force coupling constant. This force, as with most forces in LAMMPS, and hence the velocities, are calculated at the half-time step. $\zeta$ is a weight assigned to the grid point, obtained by distributing the particle to the nearest lattice sites.  

The force coupling constant, $\gamma,$ is calculated according to  

$$
\gamma={\frac{2m_{u}m_{\nu}}{m_{u}+m_{\nu}}}\left({\frac{1}{\Delta t}}\right)
$$  

Here, $m_{\nu}$ is the mass of the MD particle, $m_{u}$ is a representative fluid mass at the particle location, and $\Delta t$ is the time step. The fluid mass $m_{u}$ that the MD particle interacts with is calculated internally. This coupling is chosen to constrain the particle and associated fluid velocity to match at the end of the time step. As with other constraints, such as shake, this constraint can remove degrees of freedom from the simulation which are accounted for internally in the algorithm.  

![](images/16e379428318c40e142587edda38f14818adfd52bac0e4ff2efa48ec8e87dd1d.jpg)  

# Note  

While this fix applies the force of the particles on the fluid, it does not apply the force of the fluid to the particles. There is only one option to include this hydrodynamic force on the particles, and that is through the use of the lb/viscous fix. This fix adds the hydrodynamic force to the total force acting on the particles, after which any of the built-in LAMMPS integrators can be used to integrate the particle motion. If the lb/viscous fix is NOT used to add the hydrodynamic force to the total force acting on the particles, this physically corresponds to a situation in which an infinitely massive particle is moving through the fluid (since collisions between the particle and the fluid do not act to change the particle’s velocity). In this case, setting scaleGamma to -1 for the corresponding particle type will explicitly take this limit (of infinite particle mass) in computing the force coupling for the fluid force.  

Physical parameters describing the fluid are specified through viscosity and density. These parameters should all be given in terms of the mass, distance, and time units chosen for the main LAMMPS run, as they are scaled by the LB timestep, lattice spacing, and mass unit, inside the fix.  

The $d x$ keyword allows the user to specify a value for the LB grid spacing and the dm keyword allows the user to specify the LB mass unit. Inside the fix, parameters are scaled by the lattice-Boltzmann timestep, $d t_{L B}$ , grid spacing, $d x_{L B}$ , and mass unit, $d m_{L B}$ . $d t_{L B}$ is set equal to nevery $\boldsymbol{\cdot}d t_{M D}$ , where $d t_{M D}$ is the MD timestep. By default, $d m_{L B}$ is set equal to 1.0, and dxLB is chosen so that dτt = 3ρηdxd2t is approximately equal to 1.  

# Note  

Care must be taken when choosing both a value for $d x_{L B}$ , and a simulation domain size. This fix uses the same subdivision of the simulation domain among processors as the main LAMMPS program. In order to uniformly cover the simulation domain with lattice sites, the lengths of the individual LAMMPS subdomains must all be evenly divisible by $d x_{L B}$ . If the simulation domain size is cubic, with equal lengths in all dimensions, and the default value for $d x_{L B}$ is used, this will automatically be satisfied.  

If the noise keyword is used, followed by a positive temperature value, and a positive integer random number seed, the thermal LB algorithm of Adhikari et al. is used.  

If the keyword stencil is used, the value sets the number of interpolation points used in each direction. For this, the user has the choice between a trilinear stencil (stencil 2), which provides a support of 8 lattice sites, or the 3-point immersed boundary method stencil (stencil 3), which provides a support of 27 lattice sites, or the 4-point Keys’ interpolation stencil (stencil 4), which provides a support of 64 lattice sites. The trilinear stencil is the default as it is better suited for simulation of objects close to walls or other objects, due to its smaller support. The 3-point stencil provides smoother motion of the lattice and is suitable for particles not likely to be to close to walls or other objects.  

If the keyword write_restart is used, followed by a positive integer, N, a binary restart file is printed every N LB timesteps. This restart file only contains information about the fluid. Therefore, a LAMMPS restart file should also be written in order to print out full details of the simulation.  

![](images/149c8dff0cdba421f70e03b379ed9d9ef8ac604525babe6a2b1a34528c510e87.jpg)  

# Note  

When a large number of lattice grid points are used, the restart files may become quite large.  

In order to restart the fluid portion of the simulation, the keyword read_restart is specified, followed by the name of the binary lb_fluid restart file to be used.  

If the zwall_velocity keyword is used y-velocities are assigned to the lower and upper walls. This keyword requires the presence of walls in the $\mathbf{Z}$ -direction. This is set by assigning fixed boundary conditions in the z-direction. If fixed boundary conditions are present in the $\mathbf{Z}\cdot\mathbf{\partial}$ -direction, and this keyword is not used, the walls are assumed to be stationary.  

If the pressurebcx keyword is used, a pressure jump (implemented by a step jump in density) is imposed at the (periodic) x-boundary. The value set specifies what would be the resulting equilibrium average pressure gradient in the $\mathbf{X}$ -direction if the system had a constant cross-section (i.e. resistance to flow). It is converted to a pressure jump by multiplication by the system size in the x-direction. As this value should normally be quite small, it is also assumed to be scaled by 1000.  

If the bodyforce keyword is used, a constant body force is added to the fluid, defined by it’s x, y and z components.  

If the keyword D3Q19 is used, the 19 velocity (D3Q19) lattice is used by the lattice-Boltzmann algorithm. By default the 15 velocity (D3Q15) lattice is used.  

If the dumpxdmf keyword is used, followed by a positive integer, N, and a file name, the fluid densities and velocities at each lattice site are output to an xdmf file every N timesteps. This is a binary file format that can be read by visualization packages such as Paraview . The xdmf file format contains a time index for each frame dump and the value timeI $=$ 1 uses simulation time while 0 uses the output frame number to index xdmf file. The later can be useful if the dump vtk command is used to output the particle positions at the same timesteps and you want to visualize both the fluid and particle data together in Paraview .  

The scaleGamma keyword allows the user to scale the $\gamma$ value by a factor, gammaFactor, for a given atom type. Setting scaleGamma to -1 for the corresponding particle type will explicitly take the limit of infinite particle mass in computing the force coupling for the fluid force (see note above).  

If the a0 keyword is used, the value specified is used for the square of the speed of sound in the fluid. If this keyword is not present, the speed of sound squared is set equal to $\begin{array}{r}{\frac{1}{3}\left(\frac{d x_{L B}}{d t_{L B}}\right)^{2}}\end{array}$ . Setting $\begin{array}{r}{a0>(\frac{d x_{L B}}{d t_{L B}})^{2}}\end{array}$ is not allowed, as this may lead to instabilities. As the speed of sound should usually be much larger than any fluid velocity of interest, its value does not normally have a significant impact on the results. As such, it is usually best to use the default for this option.  

The npits keyword (followed by integer arguments: npits, $\mathtt{h\_p,l\_p,l\_p p,l\_e)}$ sets the fluid domain to the pits geometry. These arguments should only be used if you actually want something more complex than a rectangular/cubic geometry. The npits value sets the number of pits regions (arranged along $\mathbf{X}^{'}$ ). The remaining arguments are sizes measured in multiples of dx_lb: h_p is the z-height of the pit regions, $1\_\mathrm{p}$ is the $\mathbf{X}$ -length of the pit regions, l_pp is the length of the region between consecutive pits (referred to as a “slit” region), and $1\_\mathrm{e}$ is the $\mathbf{X}$ -length of the slit regions at each end of the channel. The pit geometry must fill the system in the $\mathbf{X}$ -direction but can be longer, in which case it is truncated (which enables asymmetric entrance/exit end sections). The additional $w p$ keyword allows the width (in y-direction) of the pit to be specified (the default is full width) and the $s w$ keyword indicates that there should be sidewalls in the y-direction (default is periodic in y-direction). These parameters are illustrated below:  

![](images/f637c1f0610438266df270695a0e2edef8f7ca576e4d94994b8bec99df62652f.jpg)  

(continued from previous page)  

![](images/f61a344e19d518923ee51c04bfe2fa27815bae952910fd8dce63797d3e71e483.jpg)  

Endview (in yz plane) of pit geometry (no sw so wp is active):  

![](images/36daeae3711fcb91295983ed3fd8cea85d9b7046ce659411e81e6998990e6341.jpg)  

For further details, as well as descriptions and results of several test runs, see Denniston et al.. Please include a citation to this paper if the lb_fluid fix is used in work contributing to published research.  

# 2.88.4 Restart, fix_modify, output, run start/stop, minimize info  

Due to the large size of the fluid data, this fix writes it’s own binary restart files, if requested, independent of the main LAMMPS binary restart files; no information about lb_fluid is written to the main LAMMPS binary restart files.  

None of the fix_modify options are relevant to this fix.  

The fix computes a global scalar which can be accessed by various output commands. The scalar is the current temperature of the group of particles described by group- $\mathbf{\nabla}\cdot I D$ along with the fluid constrained to move with them. The temperature is computed via the kinetic energy of the group and fluid constrained to move with them and the total number of degrees of freedom (calculated internally). If the particles are not integrated independently (such as via $f\alpha$ NVE) but have additional constraints imposed on them (such as via integration using fix rigid) the degrees of freedom removed from these additional constraints will not be properly accounted for. In this case, the user can specify the total degrees of freedom independently using the dof keyword.  

The fix also computes a global array of values which can be accessed by various output commands. There are 5 entries in the array. The first entry is the temperature of the fluid, the second entry is the total mass of the fluid plus particles, the third through fifth entries give the x, y, and $\mathbf{Z}$ total momentum of the fluid plus particles.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.88.5 Restrictions  

This fix is part of the LATBOLTZ package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix can only be used with an orthogonal simulation domain.  

The boundary conditions for the fluid are specified independently to the particles. However, these should normally be specified consistently via the main LAMMPS boundary command (p p p, p p f, and p f f are the only consistent possibilities). Shrink-wrapped boundary conditions are not permitted with this fix.  

This fix must be used before any of fix lb/viscous and fix lb/momentum as the fluid needs to be initialized before any of these routines try to access its properties. In addition, in order for the hydrodynamic forces to be added to the particles, this fix must be used in conjunction with the lb/viscous fix.  

This fix needs to be used in conjunction with a standard LAMMPS integrator such as fix NVE or fix rigid.  

# 2.88.6 Related commands  

fix lb/viscous, fix lb/momentum  

# 2.88.7 Default  

$d x$ ei st rcilhionseeanr  sstuecnhc itlh iast $\begin{array}{r}{\frac{\tau}{d t_{L B}}=\frac{3\eta d t_{L B}}{\rho d x_{L B}^{2}}}\end{array}$ eisf aaupltp irnotxeirmpaotlealtiyo enq umaelt thoo d1..  Tdhme  isD 3seQt 1e5q luaatlt itcoe  1i.s0 .u sae0d  ifso rs teht ee lqautatil cteo- $\begin{array}{r}{\frac{1}{3}\left(\frac{d x_{L B}}{d t_{L B}}\right)^{2}}\end{array}$ algorithm.  

(Denniston et al.) Denniston, C., Afrasiabian, N., Cole-Andre, M.G., Mackay, F. E., Ollila, S.T.T., and Whitehead, T., LAMMPS lb/fluid fix version 2: Improved Hydrodynamic Forces Implemented into LAMMPS through a latticeBoltzmann fluid, Computer Physics Communications 275 (2022) 108318 .  

(Mackay and Denniston) Mackay, F. E., and Denniston, C., Coupling MD particles to a lattice-Boltzmann fluid through the use of conservative forces, J. Comput. Phys. 237 (2013) 289-298.  

(Adhikari et al.) Adhikari, R., Stratford, K., Cates, M. E., and Wagner, A. J., Fluctuating lattice Boltzmann, Europhys.   
Lett. 71 (2005) 473-479.  

# 2.89 fix lb/momentum command  

# 2.89.1 Syntax  

fix ID group-ID lb/momentum nevery keyword values ...  

• ID, group-ID are documented in the $f\boldsymbol{a}\boldsymbol{x}$ command   
• lb/momentum $=$ style name of this fix command   
• nevery $=$ adjust the momentum every this many timesteps   
• zero or more keyword/value pairs may be appended   
• keyword $=$ linear linear values $=$ xflag yflag zflag xflag,yflag,zflag $=0/1$ to exclude/include each dimension.  

# 2.89.2 Examples  

fix 1 sphere lb/momentum fix 1 all lb/momentum linear 1 1 0  

# 2.89.3 Description  

This fix is based on the fix momentum command, and was created to be used in place of that command, when a latticeBoltzmann fluid is present.  

Zero the total linear momentum of the system, including both the atoms specified by group-ID and the lattice-Boltzmann fluid every nevery timesteps. If there are no atoms specified by group-ID only the fluid momentum is affected. This is accomplished by adjusting the particle velocities and the fluid velocities at each lattice site.  

![](images/8689d61c96ac5e9c957d6861e0a3fb94eb67bb289388374682446555dc261753.jpg)  

# Note  

This fix only considers the linear momentum of the system.  

By default, the subtraction is performed for each dimension. This can be changed by specifying the keyword linear, along with a set of three flags set to $0/1$ in order to exclude/ include the corresponding dimension.  

# 2.89.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.89.5 Restrictions  

Can only be used if a lattice-Boltzmann fluid has been created via the fix lb/fluid command, and must come after this command.  

This fix is part of the LATBOLTZ package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.89.6 Related commands  

fix momentum, fix lb/fluid  

# 2.89.7 Default  

Zeros the total system linear momentum in each dimension.  

# 2.90 fix lb/viscous command  

# 2.90.1 Syntax  

# fix ID group-ID lb/viscous  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • lb/viscous $=$ style name of this fix command  

# 2.90.2 Examples  

This fix adds a viscous force to each atom to cause it move with the same velocity as the fluid (an equal and opposite force is applied to the fluid via fix lb/fluid). When fix lb/fluid is called with the noise option, the atoms will also experience random forces which will thermalize them to the same temperature as the fluid. In this way, the combination of this fix with fix lb/fluid and a LAMMPS integrator like fix NVE is analogous to fix langevin except here the fluid is explicit. The temperature of the particles can be monitored via the scalar output of fix lb/fluid.  

For details of this fix, as well as descriptions and results of several test runs, see Denniston et al.. Please include a citation to this paper if this fix is used in work contributing to published research.  

# 2.90.4 Restart, fix_modify, output, run start/stop, minimize info  

As described in the fix viscous documentation:  

“No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command. This fix should only be used with damped dynamics minimizers that allow for non-conservative forces. See the min_style command for details.”  

# 2.90.5 Restrictions  

This fix is part of the LATBOLTZ package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Can only be used if a lattice-Boltzmann fluid has been created via the fix lb/fluid command, and must come after this command.  

# 2.90.6 Related commands  

fix lb/fluid  

# 2.90.7 Default  

none  

(Denniston et al.) Denniston, C., Afrasiabian, N., Cole-Andre, M.G., Mackay, F. E., Ollila, S.T.T., and Whitehead, T., LAMMPS lb/fluid fix version 2: Improved Hydrodynamic Forces Implemented into LAMMPS through a latticeBoltzmann fluid, Computer Physics Communications 275 (2022) 108318 .  

# 2.91 fix lineforce command  

# 2.91.1 Syntax  

fix ID group-ID lineforce x y z  

• ID, group-ID are documented in fix command • lineforce $=$ style name of this fix command • x y ${\bf Z}={\bf$ direction of line as a 3-vector  

# 2.91.2 Examples  

fix hold boundary lineforce 0.0 1.0 1.0  

# 2.91.3 Description  

Adjust the forces on each atom in the group so that only the component of force along the linear direction specified by the vector (x,y,z) remains. This is done by subtracting out components of force in the plane perpendicular to the line.  

If the initial velocity of the atom is 0.0 (or along the line), then it should continue to move along the line thereafter.  

# 2.91.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

# 2.91.5 Restrictions  

none  

# 2.91.6 Related commands  

fix planeforce  

# 2.91.7 Default  

none  

# 2.92 fix manifoldforce command  

# 2.92.1 Syntax  

fix ID group-ID manifoldforce manifold manifold-args ...  

• ID, group-ID are documented in fix command • manifold $=$ name of the manifold manifold-args $=$ parameters for the manifold  

# 2.92.2 Examples  

# 2.92.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is invoked during energy minimization.  

# 2.92.5 Restrictions  

This fix is part of the MANIFOLD package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Only use this with min_style hftn or min_style quickmin. If not, the constraints will not be satisfied very well at all. A warning is generated if the min_style is incompatible but no error.  

# 2.92.6 Related commands  

fix nve/manifold/rattle, fix nvt/manifold/rattle  

# 2.93 fix mdi/qm command  

# 2.93.1 Syntax  

fix ID group-ID mdi/qm keyword value(s) keyword value(s) ...  

• ID, group-ID are documented in fix command   
• $\mathrm{mdi}/{\mathrm{qm}}=$ style name of this fix command   
• zero or more keyword/value pairs may be appended   
• keyword $=$ virial or add or every or connect or elements or mc virial $\mathrm{args}=\mathrm{yes}$ or no yes $=$ request virial tensor from server code $\mathrm{no}=\mathrm{do}$ not request virial tensor from server code add $\mathrm{args}=\mathrm{yes}$ or no yes $=$ add returned value from server code to LAMMPS quantities $\mathrm{no}=\mathrm{do}$ not add returned values to LAMMPS quantities every args = Nevery Nevery $-$ request values from server code once every Nevery steps connect args = yes or no yes $=$ perform a one-time connection to the MDI engine code $\mathrm{no}=\mathrm{do}$ not perform the connection operation elements $\mathrm{args}=\mathrm{N}\_1\mathrm{N}\_2\ldots\mathrm{N}.$ _ntypes N_1,N_2,...N_ntypes $=$ chemical symbol for each of ntypes LAMMPS atom types mc args $=$ mcfixID mcfixID $=\mathrm{ID}$ of a Monte Carlo fix designed to work with this fix  

# 2.93.2 Examples  

fix 1 all mdi/qm   
fix 1 all mdi/qm virial yes   
fix 1 all mdi/qm add no every 100 elements C C H O  

# 2.93.3 Description  

Added in version 3Aug2022.  

This command enables LAMMPS to act as a client with another server code that will compute the total energy, per-atom forces, and total virial for atom conformations and simulation box size/shapes that LAMMPS sends it.  

Typically the server code will be a quantum mechanics (QM) code, hence the name of the fix. However this is not required, the server code could be another classical molecular dynamics code or LAMMPS itself. The server code must support use of the MDI Library as explained below.  

Typically, to use this fix, the input script should not define any other classical force field components, e.g. a pair style, bond style, etc.  

These are example use cases for this fix, discussed further below:  

• perform an ab initio MD (AIMD) simulation with quantum forces   
• perform an energy minimization with quantum forces   
• perform a nudged elastic band (NEB) calculation with quantum forces   
• perform a QM calculation for a series of independent systems which LAMMPS reads or generates once   
• run a classical MD simulation and calculate QM energy/forces once every N steps on the current configu  

More generally any command which calculates per-atom forces can instead use quantum forces by defining this fix. Examples are the Monte Carlo commands fix gcmc and fix atom/swap, as well as the compute born/matrix command. The only requirement is that internally the command invokes the post_force() method of fixes such as this one, which will trigger the quantum calculation.  

The code coupling performed by this command is done via the MDI Library. LAMMPS runs as an MDI driver (client), and sends MDI commands to an external MDI engine code (server), e.g. a QM code which has support for MDI. See the Howto mdi page for more information about how LAMMPS can operate as either an MDI driver or engine.  

The examples/mdi directory contains input scripts using this fix in the various use cases discussed below. In each case, two instances of LAMMPS are used, once as an MDI driver, once as an MDI engine (surrogate for a QM code). The examples/mdi/README file explains how to launch two codes so that they communicate via the MDI library using either MPI or sockets. Any QM code that supports MDI could be used in place of LAMMPS acting as a QM surrogate. See the Howto mdi page for a current list (March 2022) of such QM codes. The examples/QUANTUM directory has examples for coupling LAMMPS to 3 QM codes either via this fix or the fix mdi/qmmm command.  

Note that an engine code can support MDI in either or both of two modes. It can be used as a stand-alone code, launched at the same time as LAMMPS. Or it can be used as a plugin library, which LAMMPS loads. See the mdi plugin command for how to trigger LAMMPS to load a plugin library. The examples/mdi/README file and examples/ QUANTUM/QM-code/README files explain how to launch the two codes in either mode.  

The virial keyword setting of yes or no determines whether LAMMPS will request the QM code to also compute and return the QM contribution to a stress tensor for the system which LAMMPS will convert to a 6-element symmetric virial tensor.  

The add keyword setting of yes or no determines whether the energy and forces and virial returned by the QM code will be added to the LAMMPS internal energy and forces and virial or not. If the setting is no then the default fix_modify energy and fix_modify virial settings are also set to no and your input scripts should not set them to yes. See more details on these fix_modify settings below.  

Whatever the setting for the add keyword, the QM energy, forces, and virial will be stored by the fix, so they can be accessed by other commands. See details below.  

The every keyword determines how often the QM code will be invoked during a dynamics run with the current LAMMPS simulation box and configuration of atoms. The QM code will be called once every Nevery timesteps. By default $N e\nu e r y=1$ .  

The connect keyword determines whether this fix performs a one-time connection to the QM code. The default is yes. The only time a no is needed is if this command is used multiple times in an input script and the MDI coupling is between two stand-alone codes (not plugin mode). E.g. if it used inside a loop which also uses the clear command to destroy the system (including this fix). See the examples/mdi/in.series.driver script as an example of this, where LAMMPS is using the QM code to compute energy and forces for a series of system configurations. In this use case connect no is used along with the mdi connect and exit command to one-time initiate/terminate the connection outside the loop.  

The elements keyword allows specification of what element each LAMMPS atom type corresponds to. This is specified by the chemical symbol of the element, e.g. C or Al or Si. A symbol must be specified for each of the ntypes LAMMPS atom types. Multiple LAMMPS types can represent the same element. Ntypes is typically specified via the create_box command or in the data file read by the read_data command.  

If this keyword is specified, then this fix will send the MDI “ $\mathrm{\dot{~>~}}$ ELEMENTS” command to the engine, to ensure the two codes are consistent in their definition of atomic species. If this keyword is not specified, then this fix will send the MDI $>$ TYPES command to the engine. This is fine if both the LAMMPS driver and the MDI engine are initialized so that the atom type values are consistent in both codes.  

The mc keyword enables this fix to be used with a Monte Carlo (MC) fix to calculate before/after quantum energies as part of the MC accept/reject criterion. The fix gcmc and fix atom/swap commands can be used in this manner. Specify the ID of the MC fix following the mc keyword. This allows the two fixes to coordinate when MC events are being calculated versus MD timesteps between the MC events.  

The following 3 example use cases are illustrated in the examples/mdi directory. See its README file for more details.  

(1) To run an ab initio MD (AIMD) dynamics simulation, or an energy minimization with QM forces, or a multi-replica NEB calculation, use add yes and every 1 (the defaults). This is so that every time LAMMPS needs energy and forces, the QM code will be invoked.  

Both LAMMPS and the QM code should define the same system (simulation box, atoms and their types) in their respective input scripts. Note that on this scenario, it may not be necessary for LAMMPS to define a pair style or use a neighbor list.  

LAMMPS will then perform the timestepping or minimization iterations for the simulation. At the point in each timestep or iteration when LAMMPS needs the force on each atom, it communicates with the engine code. It sends the current simulation box size and shape (if they change dynamically, e.g. during an NPT simulation), and the current atom coordinates. The engine code computes quantum forces on each atom and the total energy of the system and returns them to LAMMPS.  

Note that if the AIMD simulation is an NPT or NPH model, or the energy minimization includes fix box relax to equilibrate the box size/shape, then LAMMPS computes a pressure. This means the virial keyword should be set to yes so that the QM contribution to the pressure can be included.  

(2) To run dynamics with a LAMMPS interatomic potential, and evaluate the QM energy and forces once every 1000 steps, use add no and every 1000. This could be useful for using an MD run to generate randomized configurations which are then passed to the QM code to produce training data for a machine learning potential. A dump custom command could be invoked every 1000 steps to dump the atom coordinates and QM forces to a file. Likewise the QM energy and virial could be output with the thermo_style custom command.  

(3) To do a QM evaluation of energy and forces for a series of $N$ independent systems (simulation box and atoms), use add no and every 1. Write a LAMMPS input script which loops over the $N$ systems. See the Howto multiple doc page for details on looping and removing old systems. The series of systems could be initialized by reading them from data files with read_data commands. Or, for example, by using the lattice , create_atoms, delete_atoms, and/or displace_atoms random commands to generate a series of different systems. At the end of the loop perform run $O$ and write_dump commands to invoke the QM code and output the QM energy and forces. As in (2) this be useful to produce QM data for training a machine learning potential.  

# 2.93.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the potential energy computed by the QM code to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy yes, unless the add keyword is set to no, in which case the default setting is no.  

The fix_modify virial option is supported by this fix to add the contribution computed by the QM code to the global pressure of the system as part of thermodynamic output. The default setting for this fix is fix_modify virial yes, unless the add keyword is set to no, in which case the default setting is no.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the energy returned by the QM code. The scalar value calculated by this fix is “extensive”.  

This fix also computes a global vector with of length 6 which contains the symmetric virial tensor values returned by the QM code. It can likewise be accessed by various output commands.  

The ordering of values in the symmetric virial tensor is as follows: vxx, vyy, vzz, vxy, vxz, vyz. The values will be in pressure units.  

This fix also computes a peratom array with 3 columns which contains the peratom forces returned by the QM code. It can likewise be accessed by various output commands.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

Assuming the add keyword is set to yes (the default), the forces computed by the QM code are used during an energy minimization, invoked by the minimize command.  

# Note  

If you want the potential energy associated with the QM forces to be included in the total potential energy of the system (the quantity being minimized), you MUST not disable the fix_modify energy option for this fix, which means the add keyword should also be set to yes (the default).  

# 2.93.5 Restrictions  

This fix is part of the MDI package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

To use LAMMPS as an MDI driver in conjunction with other MDI-enabled codes (MD or QM codes), the units command should be used to specify real or metal units. This will ensure the correct unit conversions between LAMMPS and MDI units. The other code will also perform similar unit conversions into its preferred units.  

LAMMPS can also be used as an MDI driver in other unit choices it supports, e.g. $l j$ , but then no unit conversion to MDI units is performed.  

If this fix is used in conjunction with a QM code that does not support periodic boundary conditions (more specifically, a QM code that does not support the $>$ CELL MDI command), the LAMMPS system must be fully non-periodic. I.e. no dimension of the system can be periodic.  

# 2.93.6 Related commands  

mdi plugin, mdi engine, fix mdi/qmmm  

# 2.93.7 Default  

The default for the optional keywords are virial $=$ no, add $=$ yes, every $=1$ , connect $=$ yes.  

# 2.94 fix mdi/qmmm command  

# 2.94.1 Syntax  

fix ID group-ID mdi/qmmm mode keyword value(s) keyword value(s) ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• mdi/qmmm $=$ style name of this fix command   
• mode $=$ direct or potential   
• zero or more keyword/value pairs may be appended   
• keyword $=$ virial or add or every or connect or elements virial $\mathrm{args}=\mathrm{yes}$ or no yes $=$ request virial tensor from server code $\mathrm{no}=\mathrm{do}$ not request virial tensor from server code connect $\mathrm{args}=\mathrm{yes}$ or no yes $=$ perform a one-time connection to the MDI engine code $\mathrm{no}=\mathrm{do}$ not perform the connection operation elements args = N_1 N_2 ... N_ntypes N_1,N_2,...N_ntypes $=$ chemical symbol for each of ntypes LAMMPS atom types  

# 2.94.2 Examples  

fix 1 all mdi/qmmm direct fix 1 all mdi/qmmm potential virial yes fix 1 all mdi/qmmm potential virial yes elements 13 29  

# 2.94.3 Description  

Added in version 28Mar2023.  

This command enables LAMMPS to act as a client with another server code to perform a coupled QM/MM (quantummechanics/molecular-mechanics) simulation. LAMMPS will perform classical MD (molecular mechanics or MM) for the (typically larger) MM portion of the system. A quantum mechanics code will calculate quantum energy and forces for the QM portion of the system. The two codes work together to calculate the energy and forces due to the cross interactions between QM and MM atoms. The QM server code must support use of the MDI Library as explained below.  

The partitioning of the system between QM and MM atoms is as follows. Atoms in the specified group are QM atoms; the remaining atoms are MM atoms. The input script should thus define this partitioning. See additional information below about other requirements for an input script to use this fix and perform a QM/MM simulation.  

The code coupling performed by this command is done via the MDI Library. LAMMPS runs as an MDI driver (client), and sends MDI commands to an external MDI engine code (server), in this case a QM code which has support for MDI. See the Howto mdi page for more information about how LAMMPS can operate as either an MDI driver or engine.  

The examples/QUANTUM directory has sub-directories with example input scripts using this fix in tandem with different QM codes. The README files in the sub-directories explain how to download and build the various QM codes. They also explain how to launch LAMMPS and the QM code so that they communicate via the MDI library using either MPI or sockets. Any QM code that supports MDI could be used in addition to those discussed in the sub-directories. See the Howto mdi page for a current list (March 2022) of such QM codes.  

Note that an engine code can support MDI in either or both of two modes. It can be used as a stand-alone code, launched at the same time as LAMMPS. Or it can be used as a plugin library, which LAMMPS loads. See the mdi plugin command for how to trigger LAMMPS to load a plugin library. The examples/QUANTUM sub-directory README files explains how to launch the two codes in either mode.  

The mode setting determines which QM/MM coupling algorithm is used. LAMMPS currently supports direct and potential algorithms, based on the mode setting. Both algorithms should give reasonably accurate results, but some QM codes support only one of the two modes. E.g. in the examples/QUANTUM directory, PySCF supports only direct, NWChem supports only potential, and LATTE currently supports neither, so it cannot be used for QM/MM simulations using this fix.  

The direct option passes the coordinates and charges of each MM atom to the quantum code, in addition to the coordinates of each QM atom. The quantum code returns forces on each QM atom as well as forces on each MM atom. The latter is effectively the force on MM atoms due to the QM atoms.  

The input script for performing a direct mode QM/MM simulation should do the following:  

• delete all bonds (angles, dihedrals, etc) between QM atoms • set the charge on each QM atom to zero • define no bonds (angles, dihedrals, etc) which involve both QM and MM atoms • define a force field (pair, bonds, angles, optional kspace) for the entire system  

The first two bullet can be performed using the delete_bonds and set commands.  

The third bullet is required to have a consistent model, but is not checked by LAMMPS.  

The fourth bullet implies that non-bonded non-Coulombic interactions (e.g. van der Waals) between QM/QM and QM/MM pairs of atoms are computed by LAMMPS.  

See the examples/QUANTUM/PySCF/in.\* files for examples of input scripts for QM/MM simulations using the direct mode.  

The potential option passes the coordinates of each QM atom and a Coulomb potential for each QM atom to the quantum code. The latter is calculated by performing a Coulombics-only calculation for the entire system, subtracting all QM/QM pairwise Coulombic terms, and dividing the Coulomb energy on each QM atom by the charge of the QM atom. The potential value represents the Coulombic influence of all the MM atoms on each QM atom.  

The quantum code returns forces and charge on each QM atom. The new charges on the QM atom are used to recalculate the MM force field, resulting in altered forces on the MM atoms.  

The input script for performing a potential mode QM/MM simulation should do the following:  

• delete all bonds (angles, dihedrals, etc) between QM atoms • define a hybrid pair style which includes a Coulomb-only pair sub-style • define no bonds (angles, dihedrals, etc) which involve both QM and MM atoms • define a force field (pair, bonds, angles, optional kspace) for the entire system  

The first operation can be performed using the delete_bonds command. See the examples/QUANTUM/NWChem/ in.\* files for examples of how to do this.  

The second operation is necessary so that this fix can calculate the Coulomb potential for the QM atoms.   
The third bullet is required to have a consistent model, but is not checked by LAMMPS.  

The fourth bullet implies that non-bonded non-Coulombic interactions (e.g. van der Waals) between QM/QM and QM/MM pairs of atoms are computed by LAMMPS. However, some QM codes do not want the MM code (LAMMPS) to compute QM/QM van der Waals interactions. NWChem is an example. In this case, the coefficients for those interactions need to be turned off, which typically requires the atom types for the QM atoms be different than those for the MM atoms.  

See the examples/QUANTUM/NWChem/in.\* files for examples of input scripts for QM/MM simulations using the potential mode. Those scripts also illustrate how to turn off QM/QM van der Waals interactions.  

The virial keyword setting of yes or no determines whether LAMMPS will request the QM code to also compute and return the QM contribution to a stress tensor for the system which LAMMPS will convert to a 6-element symmetric virial tensor.  

The connect keyword determines whether this fix performs a one-time connection to the QM code. The default is yes. The only time a no is needed is if this command is used multiple times in an input script. E.g. if it used inside a loop which also uses the clear command to destroy the system (including this fix). As example would be a script which loop over a series of independent QM/MM simulations, e.g. each with their own data file. In this use case connect no could be used along with the mdi connect and exit command to one-time initiate/terminate the connection outside the loop.  

The elements keyword allows specification of what element each LAMMPS atom type corresponds to. This is specified by the chemical symbol of the element, e.g. C or Al or Si. A symbol must be specified for each of the ntypes LAMMPS atom types. Multiple LAMMPS types can represent the same element. Ntypes is typically specified via the create_box command or in the data file read by the read_data command.  

If this keyword is specified, then this fix will send the MDI “ $\mathrm{^{\circ}}>$ ELEMENTS” command to the engine, to insure the two codes are consistent in their definition of atomic species. If this keyword is not specified, then this fix will send the $\mathrm{MDI>TYPES}$ command to the engine. This is fine if both the LAMMPS driver and the MDI engine are initialized so that the atom type values are consistent in both codes.  

# 2.94.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the potential energy computed by the QM code to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy yes.  

The fix_modify virial option is supported by this fix to add the contribution computed by the QM code to the global pressure of the system as part of thermodynamic output. The default setting for this fix is fix_modify virial yes.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the energy returned by the QM code. The scalar value calculated by this fix is “extensive”.  

This fix also computes a global vector with of length 6 which contains the symmetric virial tensor values returned by the QM code. It can likewise be accessed by various output commands.  

The ordering of values in the symmetric virial tensor is as follows: vxx, vyy, vzz, vxy, vxz, vyz. The values will be in pressure units.  

This fix also computes a peratom array with 3 columns which contains the peratom forces returned by the QM code. It can likewise be accessed by various output commands. Note that for direct mode this will be quantum forces on both QM and MM atoms. For potential mode it will only be quantum forces on QM atoms; the forces for MM atoms will be zero.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces computed by the QM code are used during an energy minimization, invoked by the minimize command.  

![](images/e11068813f940e64a09c9f68d46eea822ed9b0b33dc5823d5dbc8662502161d3.jpg)  

# Note  

If you want the potential energy associated with the QM forces to be included in the total potential energy of the system (the quantity being minimized), you MUST not disable the fix_modify energy option for this fix.  

# 2.94.5 Restrictions  

This command is part of the MDI package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

To use LAMMPS as an MDI driver in conjunction with other MDI-enabled codes (MD or QM codes), the units command should be used to specify real or metal units. This will ensure the correct unit conversions between LAMMPS and MDI units. The other code will also perform similar unit conversions into its preferred units.  

If this fix is used in conjunction with a QM code that does not support periodic boundary conditions (more specifically, a QM code that does not support the $>$ CELL MDI command), the LAMMPS system must be fully non-periodic. I.e. no dimension of the system can be periodic.  

# 2.94.6 Related commands  

mdi plugin, mdi engine, fix mdi/qm  

# 2.94.7 Default  

The default for the optional keywords are virial $=$ no and connect $=$ yes.  

# 2.95 fix meso/move command  

# 2.95.1 Syntax  

fix ID group-ID meso/move style args keyword values ...  

• ID, group-ID are documented in fix command   
• meso/move $=$ style name of this fix command   
• style $=$ linear or wiggle or rotate or variable linear $\mathrm{args=VxVyVz}$ $\mathrm{Vx,Vy,Vz=c}$ omponents of velocity vector (velocity units), any component can be specified as␣ $\rightarrow\mathrm{NULL}$ wiggle $\mathrm{args=Ax}$ Ay Az period $\mathrm{Ax,Ay,Az=cc}$ mponents of amplitude vector (distance units), any component can be specified as␣ $\rightarrow\mathrm{NULL}$ period = period of oscillation (time units) rotate args = Px Py Pz Rx Ry Rz period Px,Py,Pz = origin point of axis of rotation (distance units) Rx,Ry,Rz = axis of rotation vector period = period of rotation (time units) variable args = v_dx v_dy v_dz v_vx v_vy v_vz $\mathrm{v\_dx,v\_dy,v\_dz=3}$ variable names that calculate x,y,z displacement as function of time, any␣ $\hookrightarrow$ component can be specified as NULL $\mathrm{v\_vx,v\_vy,v\_vz=3}$ variable names that calculate x,y,z velocity as function of time, any␣ $\hookrightarrow$ component can be specified as NULL  

• zero or more keyword/value pairs may be appended  

# 2.95. fix meso/move command  

• keyword $=$ units units value $=$ box or lattice  

# 2.95.2 Examples  

fix 1 boundary meso/move wiggle 3.0 0.0 0.0 1.0 units box fix 2 boundary meso/move rotate 0.0 0.0 0.0 0.0 0.0 1.0 5.0 fix 2 boundary meso/move variable v_myx v_myy NULL v_VX v_VY NULL  

# 2.95.3 Description  

Perform updates of position, velocity, internal energy and local density for mesoscopic particles in the group each timestep using the specified settings or formulas, without regard to forces on the particles. This can be useful for boundary, solid bodies or other particles, whose movement can influence nearby particles.  

The operation of this fix is exactly like that described by the fix move command, except that particles’ density, internal energy and extrapolated velocity are also updated.  

![](images/f30a6536edf9052250ea694bafbb68d336d2067eabf3980b94e010b313c52cc2.jpg)  

# Note  

The particles affected by this fix should not be time integrated by other fixes (e.g. fix sph, fix sph/stationary), since that will change their positions and velocities twice.  

# Note  

As particles move due to this fix, they will pass through periodic boundaries and be remapped to the other side of the simulation box, just as they would during normal time integration (e.g. via the fix sph command). It is up to you to decide whether periodic boundaries are appropriate with the kind of particle motion you are prescribing with this fix.  

# Note  

As discussed below, particles are moved relative to their initial position at the time the fix is specified. These initial coordinates are stored by the fix in “unwrapped” form, by using the image flags associated with each particle. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each particle. You can reset the image flags (e.g. to 0) before invoking this fix by using the set image command.  

The linear style moves particles at a constant velocity, so that their position $\boldsymbol{X}=(\mathbf{x},\mathbf{y},\mathbf{z})$ as a function of time is given in vector notation as  

$$
\mathrm{X(t)}=\mathrm{X0}+\mathrm{V}^{\ast}\mathrm{delta}
$$  

where $X O=(\mathrm{x}0,\mathrm{y}0,\mathrm{z}0)$ is their position at the time the fix is specified, $V$ is the specified velocity vector with components $\left(\mathrm{Vx,Vy,Vz}\right)$ , and delta is the time elapsed since the fix was specified. This style also sets the velocity of each particle to V $\mathbf{\Sigma}=(\mathrm{Vx},\mathrm{Vy},\mathrm{Vz})$ . If any of the velocity components is specified as NULL, then the position and velocity of that component is time integrated the same as the $f\boldsymbol{a}\boldsymbol{x}$ sph command would perform, using the corresponding force component on the particle.  

Note that the linear style is identical to using the variable style with an equal-style variable that uses the vdisplace() function. E.g.  

<html><body><table><tr><td>variable eV equal 10.0</td></tr><tr><td>variable x equal vdisplace(0.0,$V)</td></tr><tr><td>fix 1 boundary move variable v_x NULL NULL v V NULL NULL</td></tr><tr><td></td></tr></table></body></html>  

The wiggle style moves particles in an oscillatory fashion, so that their position $X=\left(\mathbf{x},\mathbf{y},\mathbf{z}\right)$ as a function of time is given in vector notation as  

$$
\mathrm{X(t)=X0+A\sin(omega^{*}d e l t a)}
$$  

where $X O=(\mathrm{x}0,\mathrm{y}0,\mathrm{z}0)$ is their position at the time the fix is specified, $A$ is the specified amplitude vector with components (Ax,Ay,Az), omega is 2 PI / period, and delta is the time elapsed since the fix was specified. This style also sets the velocity of each particle to the time derivative of this expression. If any of the amplitude components is specified as NULL, then the position and velocity of that component is time integrated the same as the fix sph command would perform, using the corresponding force component on the particle.  

Note that the wiggle style is identical to using the variable style with equal-style variables that use the swiggle() and cwiggle() functions. E.g.  

variable A equal 10.0   
variable T equal 5.0   
variable omega equal $2.0^{*}\mathrm{PI}/\mathbb{S}\mathrm{T}$   
variable x equal swiggle(0.0,\$A,\$T)   
variable v equal $\mathrm{\Deltav\_omega^{*}(\Phi A\mathrm{-}c w i g g l e(0.0,\Phi A,\Phi T))}$   
fix 1 boundary move variable v_x NULL NULL v_v NULL NULL  

The rotate style rotates particles around a rotation axis $R=(\mathrm{Rx},\mathrm{Ry},\mathrm{Rz})$ that goes through a point $P=(\mathrm{Px},\mathrm{Py},\mathrm{Pz})$ . The period of the rotation is also specified. The direction of rotation for the particles around the rotation axis is consistent with the right-hand rule: if your right-hand thumb points along $R$ , then your fingers wrap around the axis in the direction of rotation.  

This style also sets the velocity of each particle to (omega cross Rperp) where omega is its angular velocity around the rotation axis and Rperp is a perpendicular vector from the rotation axis to the particle.  

The variable style allows the position and velocity components of each particle to be set by formulas specified via the variable command. Each of the 6 variables is specified as an argument to the fix as v_name, where name is the variable name that is defined elsewhere in the input script.  

Each variable must be of either the equal or atom style. Equal-style variables compute a single numeric quantity, that can be a function of the timestep as well as of other simulation values. Atom-style variables compute a numeric quantity for each particle, that can be a function per-atom quantities, such as the particle’s position, as well as of the timestep and other simulation values. Note that this fix stores the original coordinates of each particle (see note below) so that per-atom quantity can be used in an atom-style variable formula. See the variable command for details.  

The first 3 variables (v_dx,v_dy,v_dz) specified for the variable style are used to calculate a displacement from the particle’s original position at the time the fix was specified. The second 3 variables (v_vx,v_vy,v_vz) specified are used to compute a velocity for each particle.  

Any of the 6 variables can be specified as NULL. If both the displacement and velocity variables for a particular x,y,z component are specified as NULL, then the position and velocity of that component is time integrated the same as the fix sph command would perform, using the corresponding force component on the particle. If only the velocity variable for a component is specified as NULL, then the displacement variable will be used to set the position of the particle, and its velocity component will not be changed. If only the displacement variable for a component is specified as NULL, then the velocity variable will be used to set the velocity of the particle, and the position of the particle will be time integrated using that velocity.  

The units keyword determines the meaning of the distance units used to define the linear velocity and wiggle amplitude and rotate origin. This setting is ignored for the variable style. A box value selects standard units as defined by the units command, e.g. velocity in Angstroms/fs and amplitude and position in Angstroms for units $=$ real. A lattice value means the velocity units are in lattice spacings per time and the amplitude and position are in lattice spacings. The lattice command must have been previously used to define the lattice spacing. Each of these 3 quantities may be dependent on the x,y,z dimension, since the lattice spacings can be different in x,y,z.  

# 2.95.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the original coordinates of moving particles to binary restart files, as well as the initial timestep, so that the motion can be continuous in a restarted simulation. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

![](images/417ebfb6fd3080326a69f13e98989ce9762f81a3ef6cfcf06084f495bd659f49.jpg)  

# Note  

Because the move positions are a function of the current timestep and the initial timestep, you cannot reset the timestep to a different value after reading a restart file, if you expect a fix move command to work in an uninterrupted fashion.  

None of the fix_modify options are relevant to this fix.  

This fix produces a per-atom array which can be accessed by various output commands. The number of columns for each atom is 3, and the columns store the original unwrapped x,y,z coords of each particle. The per-atom values can be accessed on any timestep.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is not invoked during energy minimization.  

# 2.95.5 Restrictions  

This fix is part of the DPD-SMOOTH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store density and internal energy as defined by the atom_style sph command.  

All particles in the group must be mesoscopic SPH/SDPD particles.  

Changed in version 29Aug2024.  

This fix is incompatible with deformation controls that remap velocity, for instance the remap $\nu$ option of fix deform.  

# 2.95.6 Related commands  

fix move, fix sph, displace_atoms  

# 2.95.7 Default  

The option default is units $=$ lattice.  

# 2.96 fix mol/swap command  

# 2.96.1 Syntax  

fix ID group-ID mol/swap N X itype jtype seed T keyword value ...  

• ID, group-ID are documented in fix command   
• atom/swap $=$ style name of this fix command   
• $\Nu=$ invoke this fix every N steps   
• ${\mathrm{X=}}$ number of swaps to attempt every N steps   
• itype,jtype $=$ two atom types (1-Ntypes or type label) to swap with each other   
• seed $=$ random # seed (positive integer)   
• $\mathrm{T}=$ scaling temperature of the MC swaps (temperature units)   
• zero or more keyword/value pairs may be appended to args   
• keyword $=k e$ ke value $=\mathrm{no}$ or yes no $=\mathrm{no}$ conservation of kinetic energy after atom swaps yes $=$ kinetic energy is conserved after atom swaps  

# 2.96.2 Examples  

fix 2 all mol/swap 100 1 2 3 29494 300.0 ke no fix mySwap fluid mol/swap 500 10 1 2 482798 1.0 labelmap atom 1 A 2 B fix mySwap fluid mol/swap 500 10 A B 482798 1.0  

# 2.96.3 Description  

This fix performs Monte Carlo swaps of two specified atom types within a randomly selected molecule. Two possible use cases are as follows.  

First, consider a mixture of some molecules with atoms of itype and other molecules with atoms of jtype. The fix will select a random molecule and attempt to swap all the itype atoms to jtype for the first kind of molecule, or all the jtype atoms to itype for the second kind. Because the swap will only take place if it is energetically favorable, the fix can be used to determine the miscibility of 2 different kinds of molecules much more quickly than just dynamics would do it.  

Second, consider diblock co-polymers with two types of monomers itype and jtype. The fix will select a random molecule and attempt to do a itype $<->$ jtype swap of all those monomers within the molecule. Thus the fix can be used to find the energetically favorable fractions of two flavors of diblock co-polymers.  

Intra-molecular swaps of atom types are attempted every N timesteps. On that timestep, X swaps are attempted. For each attempt a single molecule ID is randomly selected. The range of possible molecule IDs from loID to hiID is pre-computed before each run begins. The loID/hiID is set for the molecule with the smallest/largest ID which has any itype or jtype atoms in it. Note that if you define a system with many molecule IDs between loID and hiID which have no itype or jtype atoms, then the fix will be inefficient at performing swaps. Also note that if atoms with molecule ID $=0$ exist, they are not considered molecules by this fix; they are assumed to be solvent atoms or molecules.  

Candidate atoms for swapping must also be in the fix group. Atoms within the selected molecule which are not itype or jtype are ignored.  

When an atom is swapped from itype to jtype (or vice versa), if charges are defined, the charge values for itype versus jtype atoms are also swapped. This requires that all itype atoms in the system have the same charge value. Likewise all jtype atoms in the system must have the same charge value. If this is not the case, LAMMPS issues a warning that it cannot swap charge values.  

If the ke keyword is set to yes, which is the default, and the masses of itype and jtype atoms are different, then when a swap occurs, the velocity of the swapped atom is rescaled by the sqrt of the mass ratio, so as to conserve the kinetic energy of the atom.  

The potential energy of the entire system is computed before and after each swap is performed within a single molecule. The specified temperature T is used in the Metropolis criterion to accept or reject the attempted swap. If the swap is rejected all swapped values are reversed.  

The potential energy calculations can include systems and models with the following features:  

• manybody pair styles, including EAM   
• hybrid pair styles   
• long-range electrostatics (kspace)   
• triclinic systems   
• potential energy contributions from other fixes  

For the last bullet point, fixes can have an associated potential energy. Examples of such fixes include: efield, gravity, addforce, langevin, restrain, temp/berendsen, temp/rescale, and wall fixes. For that energy to be included in the total potential energy of the system (the quantity used for the swap accept/reject decision), you MUST enable the fix_modify energy option for that fix. The doc pages for individual $f\alpha$ commands specify if this should be done.  

![](images/ff12bd103366df575f1c95e7ad2315910d016e96792825e9cd88d7ef29846bde.jpg)  

# Note  

One comment on computational efficiency. If the cutoff lengths defined for the pair style are different for itype versus jtype atoms (for any of their interactions with any other atom type), then a new neighbor list needs to be generated for every attempted swap. This is potentially expensive if $\mathbf{N}$ is small or X is large.  

# 2.96.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the fix to binary restart files. This includes information about the random number generator seed, the next timestep for MC exchanges, the number of exchange attempts and successes etc. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

# Note  

For this to work correctly, the timestep must not be changed after reading the restart with reset_timestep. The fix will try to detect it and stop with an error.  

None of the fix_modify options are relevant to this fix.  

This fix computes a global vector of length 2, which can be accessed by various output commands. The vector values are the following global cumulative quantities:  

1. swap attempts   
2. swap accepts  

The vector values calculated by this fix are “intensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.96.5 Restrictions  

This fix is part of the MC package. It is only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

# 2.96.6 Related commands  

fix atom/swap, fix gcmc  

# 2.96.7 Default  

The option default is ${\mathrm{ke}}={\mathrm{yes}}$ .  

# 2.97 fix momentum command  

Accelerator Variants: momentum/kk  

# 2.98 fix momentum/chunk command  

# 2.98.1 Syntax  

fix ID group-ID momentum N keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• momentum $=$ style name of this fix command   
• $\Nu=$ adjust the momentum every this many timesteps one or more keyword/value pairs may be appended  

fix ID group-ID momentum/chunk N chunkID keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• momentum/chunk $=$ style name of this fix command   
• $\Nu=$ adjust the momentum per chunk every this many timesteps   
• chunkID $=\mathrm{ID}$ of compute chunk/atom command one or more keyword/value settings may be appended to each of the fix commands:  

• keyword $=$ linear or angular or rescale  

linear values $=$ xflag yflag zflag xflag,yflag,zflag $=0/1$ to exclude/include each dimension   
angular values $=$ none   
rescale values $=$ none  

# 2.98.2 Examples  

fix 1 all momentum 1 linear 1 1 0 fix 1 all momentum 1 linear 1 1 1 rescale fix 1 all momentum 100 linear 1 1 1 angular fix 1 all momentum/chunk 100 molchunk linear 1 1 1 angular  

# 2.98.3 Description  

Fix momentum zeroes the linear and/or angular momentum of the group of atoms every N timesteps by adjusting the velocities of the atoms. Fix momentum/chunk works equivalently, but operates on a per-chunk basis.  

One (or both) of the linear or angular keywords must be specified.  

If the linear keyword is used, the linear momentum is zeroed by subtracting the center-of-mass velocity of the group or chunk from each atom. This does not change the relative velocity of any pair of atoms. One or more dimensions can be excluded from this operation by setting the corresponding flag to 0.  

If the angular keyword is used, the angular momentum is zeroed by subtracting a rotational component from each atom.  

This command can be used to ensure the entire collection of atoms (or a subset of them) does not drift or rotate during the simulation due to random perturbations (e.g. fix langevin thermostatting).  

The rescale keyword enables conserving the kinetic energy of the group or chunk of atoms by rescaling the velocitie after the momentum was removed.  

Note that the velocity command can be used to create initial velocities with zero aggregate linear and/or angular momentum.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.98.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.98.5 Restrictions  

Fix momentum/chunk is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package See the Build package page for more info.  

# 2.98.6 Related commands  

fix recenter, velocity  

# 2.98.7 Default  

none  

# 2.99 fix move command  

# 2.99.1 Syntax  

fix ID group-ID move style args keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• move $=$ style name of this fix command   
• style $=$ linear or wiggle or rotate or transrot or variable   
linear $\mathrm{args}=\mathrm{Vx}$ Vy Vz $\mathrm{Vx,Vy,Vz=c}$ omponents of velocity vector (velocity units), any component can be specified as␣ $\rightarrow\mathrm{NULL}$   
wiggle $\mathrm{args=Ax}$ Ay Az period $\mathrm{Ax,Ay,Az=c}$ omponents of amplitude vector (distance units), any component can be specified as␣ $\hookrightarrow$ NULL period = period of oscillation (time units)   
rotate args = Px Py Pz Rx Ry Rz period Px,Py,Pz = origin point of axis of rotation (distance units) Rx,Ry,Rz = axis of rotation vector period = period of rotation (time units)   
transrot args = Vx Vy Vz Px Py Pz Rx Ry Rz period Vx,Vy,Vz = components of velocity vector (velocity units) $\mathrm{Px,Py,Pz=0}$ origin point of axis of rotation (distance units) ${\mathrm{Rx,Ry,Rz}}={\mathrm{axis}}$ of rotation vector period $=$ period of rotation (time units)   
variable $\mathrm{args}=\mathrm{\bfv}_{-}$ _dx v_dy v_dz v_vx v_vy v_vz $\mathrm{v\_dx,v\_dy,v\_dz=3}$ variable names that calculate x,y,z displacement as function of time, any␣ $\hookrightarrow$ component can be specified as NULL $\mathrm{v\_vx,v\_vy,v\_vz=3}$ variable names that calculate x,y,z velocity as function of time, any␣ $\hookrightarrow$ component can be specified as NULL   
• zero or more keyword/value pairs may be appended   
• keyword $=$ units units value $=$ box or lattice  

# 2.99.2 Examples  

fix 1 boundary move wiggle 3.0 0.0 0.0 1.0 units box   
fix 2 boundary move rotate 0.0 0.0 0.0 0.0 0.0 1.0 5.0   
fix 2 boundary move variable v_myx v_myy NULL v_VX v_VY NULL   
fix 3 boundary move transrot 0.1 0.1 0.0 0.0 0.0 0.0 0.0 0.0 1.0 5.0 units box  

# 2.99. fix move command  

# 2.99.3 Description  

Perform updates of position and velocity for atoms in the group each timestep using the specified settings or formulas, without regard to forces on the atoms. This can be useful for boundary or other atoms, whose movement can influence nearby atoms.  

![](images/96bf59cce28b3f4f54c26b6fad3db712b72a6a7faede268447104c0a85bf3d50.jpg)  

# Note  

The atoms affected by this fix should not normally be time integrated by other fixes (e.g. fix nve, fix nvt), since that will change their positions and velocities twice.  

![](images/1ab9e36dfb25850f8e52d20760a2d985bf6cd1d77c3b97d970ca03758c6ffcbc.jpg)  

# Note  

As atoms move due to this fix, they will pass through periodic boundaries and be remapped to the other side of the simulation box, just as they would during normal time integration (e.g. via the fix nve command). It is up to you to decide whether periodic boundaries are appropriate with the kind of atom motion you are prescribing with this fix.  

![](images/a05d2605198eda50def3fa24b74941209302b6742a8fb5837fd6ec927bbb9756.jpg)  

# Note  

As discussed below, atoms are moved relative to their initial position at the time the fix is specified. These initial coordinates are stored by the fix in “unwrapped” form, by using the image flags associated with each atom. See the dump custom command for a discussion of “unwrapped” coordinates. See the Atoms section of the read_data command for a discussion of image flags and how they are set for each atom. You can reset the image flags (e.g. to 0) before invoking this fix by using the set image command.  

The linear style moves atoms at a constant velocity, so that their position $X=\mathrm{(x,y,z)}$ as a function of time is given in vector notation as  

$$
\mathrm{X(t)}=\mathrm{X0}+\mathrm{V}^{\ast}\mathrm{delta}
$$  

where $X O=(\mathrm{x0,y0,z0})$ is their position at the time the fix is specified, $V$ is the specified velocity vector with components $\left(\mathrm{Vx,Vy,Vz}\right)$ , and delta is the time elapsed since the fix was specified. This style also sets the velocity of each atom to V $\mathbf{\Sigma}=(\mathrm{Vx},\mathrm{Vy},\mathrm{Vz})$ . If any of the velocity components is specified as NULL, then the position and velocity of that component is time integrated the same as the $f\boldsymbol{{x}}$ nve command would perform, using the corresponding force component on the atom.  

Note that the linear style is identical to using the variable style with an equal-style variable that uses the vdisplace() function. E.g.  

variable V equal 10.0   
variable x equal vdisplace $\left(0.0,\$1\right)$   
fix 1 boundary move variable v_x NULL NULL v_V NULL NULL  

The wiggle style moves atoms in an oscillatory fashion, so that their position $X=\left(\mathbf{{x}},\mathbf{{y}},\mathbf{{z}}\right)$ as a function of time is given in vector notation as  

$$
\mathrm{X(t)=X0+A\sin(omega^{*}d e l t a)}
$$  

where $X O=(\mathrm{x}0,\mathrm{y}0,\mathrm{z}0)$ is their position at the time the fix is specified, $A$ is the specified amplitude vector with components (Ax,Ay,Az), omega is 2 PI / period, and delta is the time elapsed since the fix was specified. This style also sets the velocity of each atom to the time derivative of this expression. If any of the amplitude components is specified as NULL, then the position and velocity of that component is time integrated the same as the fix nve command would perform, using the corresponding force component on the atom.  

Note that the wiggle style is identical to using the variable style with equal-style variables that use the swiggle() and cwiggle() functions. E.g.  

variable A equal 10.0   
variable T equal 5.0   
variable omega equal $2.0^{*}\mathrm{PI}/\mathbb{S}\mathrm{T}$   
variable x equal swiggle $(0.0,\$4,4T)$   
variable v equal $\mathrm{\Deltav\_omega^{*}(\Phi A\mathrm{-}c w i g g l e(0.0,\Phi A,\Phi T))}$   
fix 1 boundary move variable v_x NULL NULL v_v NULL NULL  

The rotate style rotates atoms around a rotation axis $R=(\mathrm{Rx},\mathrm{Ry},\mathrm{Rz})$ that goes through a point $P=(\mathrm{Px},\mathrm{Py},\mathrm{Pz})$ . The period of the rotation is also specified. The direction of rotation for the atoms around the rotation axis is consistent with the right-hand rule: if your right-hand thumb points along $R$ , then your fingers wrap around the axis in the direction of rotation.  

This style also sets the velocity of each atom to (omega cross Rperp) where omega is its angular velocity around the rotation axis and Rperp is a perpendicular vector from the rotation axis to the atom. If the defined atom_style assigns an angular velocity or angular momentum or orientation to each atom (atom styles sphere, ellipsoid, line, tri, body), then those properties are also updated appropriately to correspond to the atom’s motion and rotation over time.  

The transrot style combines the effects of rotate and linear so that it is possible to prescribe a rotating group of atoms that also moves at a constant velocity. The arguments are for the translation first and then for the rotation. Since the rotation affects all coordinate components, it is not possible to set any of the translation vector components to NULL.  

The variable style allows the position and velocity components of each atom to be set by formulas specified via the variable command. Each of the 6 variables is specified as an argument to the fix as v_name, where name is the variable name that is defined elsewhere in the input script.  

Each variable must be of either the equal or atom style. Equal-style variables compute a single numeric quantity, that can be a function of the timestep as well as of other simulation values. Atom-style variables compute a numeric quantity for each atom, that can be a function per-atom quantities, such as the atom’s position, as well as of the timestep and other simulation values. Note that this fix stores the original coordinates of each atom (see note below) so that per-atom quantity can be used in an atom-style variable formula. See the variable command for details.  

The first 3 variables (v_dx,v_dy,v_dz) specified for the variable style are used to calculate a displacement from the atom’s original position at the time the fix was specified. The second 3 variables (v_vx,v_vy,v_vz) specified are used to compute a velocity for each atom.  

Any of the 6 variables can be specified as NULL. If both the displacement and velocity variables for a particular x,y,z component are specified as NULL, then the position and velocity of that component is time integrated the same as the fix nve command would perform, using the corresponding force component on the atom. If only the velocity variable for a component is specified as NULL, then the displacement variable will be used to set the position of the atom, and its velocity component will not be changed. If only the displacement variable for a component is specified as NULL, then the velocity variable will be used to set the velocity of the atom, and the position of the atom will be time integrated using that velocity.  

The units keyword determines the meaning of the distance units used to define the linear velocity and wiggle amplitude and rotate origin. This setting is ignored for the variable style. A box value selects standard units as defined by the units command, e.g. velocity in Angstroms/fs and amplitude and position in Angstroms for units $=$ real. A lattice value means the velocity units are in lattice spacings per time and the amplitude and position are in lattice spacings. The lattice command must have been previously used to define the lattice spacing. Each of these 3 quantities may be dependent on the x,y,z dimension, since the lattice spacings can be different in x,y,z.  

# 2.99.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the original coordinates of moving atoms to binary restart files, as well as the initial timestep, so that the motion can be continuous in a restarted simulation. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

![](images/e7cc48f8a024b5b5379530a75a12b368de0a7c8106b666addb21a621faed69ce.jpg)  

# Note  

Because the move positions are a function of the current timestep and the initial timestep, you cannot reset the timestep to a different value after reading a restart file, if you expect a fix move command to work in an uninterrupted fashion.  

None of the fix_modify options are relevant to this fix.  

This fix produces a per-atom array which can be accessed by various output commands. The number of columns for each atom is 3, and the columns store the original unwrapped x,y,z coords of each atom. The per-atom values can be accessed on any timestep.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

For rRESPA time integration, this fix adjusts the position and velocity of atoms on the outermost rRESPA level.  

# 2.99.5 Restrictions  

none  

# 2.99.6 Related commands  

fix nve, displace_atoms  

# 2.99.7 Default  

none The option default is units $=$ lattice.  

# 2.100 fix msst command  

# 2.100.1 Syntax  

fix ID group-ID msst dir shockvel keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
msst $=$ style name of this fix   
• dir $=x$ or $y$ or z   
• shockvel $=$ shock velocity (strictly positive, distance/time units)   
• zero or more keyword value pairs may be appended   
• keyword $=q$ or mu or $p O$ or $\nu O$ or $e O$ or tscale or beta or dftb q value $=\mathrm{cell}$ mass-like parameter (mass $\widehat{\mathbf{\xi}}^{2}$ /distance^4 units) mu value $=$ artificial viscosity (mass/length/time units) p0 value $=$ initial pressure in the shock equations (pressure units)   
v0 value $=$ initial simulation cell volume in the shock equations (distance^3 units)   
e0 value $=$ initial total energy (energy units)   
tscale value $=$ reduction in initial temperature (unitless fraction between 0.0 and 1.0)   
dftb value $=$ yes or no for whether using MSST in conjunction with DFTB+   
beta value $=$ scale factor for improved energy conservation  

# 2.100.2 Examples  

fix 1 all msst y 100.0 q 1.0e5 mu 1.0e5   
fix 2 all msst z 50.0 q 1.0e4 mu 1.0e4 v0 4.3419e+03 p0 3.7797e+03 e0 -9.72360e+02 tscale 0.01   
fix 1 all msst y 100.0 q 1.0e5 mu 1.0e5 dftb yes beta 0.5  

# 2.100.3 Description  

This command performs the Multi-Scale Shock Technique (MSST) integration to update positions and velocities each timestep to mimic a compressive shock wave passing over the system. See (Reed) for a detailed description of this method. The MSST varies the cell volume and temperature in such a way as to restrain the system to the shock Hugoniot and the Rayleigh line. These restraints correspond to the macroscopic conservation laws dictated by a shock front. shockvel determines the steady shock velocity that will be simulated.  

To perform a simulation, choose a value of $q$ that provides volume compression on the timescale of 100 fs to 1 ps. If the volume is not compressing, either the shock speed is chosen to be below the material sound speed or $p O$ has been chosen inaccurately. Volume compression at the start can be sped up by using a non-zero value of tscale. Use the smallest value of tscale that results in compression.  

Under some special high-symmetry conditions, the pressure (volume) and/or temperature of the system may oscillate for many cycles even with an appropriate choice of mass-like parameter $q$ . Such oscillations have physical significance in some cases. The optional mu keyword adds an artificial viscosity that helps break the system symmetry to equilibrate to the shock Hugoniot and Rayleigh line more rapidly in such cases.  

The keyword tscale is a factor between 0 and 1 that determines what fraction of thermal kinetic energy is converted to compressive strain kinetic energy at the start of the simulation. Setting this parameter to a non-zero value may assist in compression at the start of simulations where it is slow to occur.  

If keywords $e O$ , $p O$ ,or $\nu O$ are not supplied, these quantities will be calculated on the first step, after the energy specified by tscale is removed. The value of $e O$ is not used in the dynamical equations, but is used in calculating the deviation from the Hugoniot.  

The keyword beta is a scaling term that can be added to the MSST ionic equations of motion to account for drift in the conserved quantity during long timescale simulations, similar to a Berendsen thermostat. See (Reed) and (Goldman) for more details. The value of beta must be between 0.0 and 1.0 inclusive. A value of 0.0 means no contribution, a value of 1.0 means a full contribution.  

Values of shockvel less than a critical value determined by the material response will not have compressive solutions.   
This will be reflected in lack of significant change of the volume in the MSST.  

For all pressure styles, the simulation box stays orthogonal in shape. Parrinello-Rahman boundary conditions (tilted box) are supported by LAMMPS, but are not implemented for MSST.  

This fix computes a temperature and pressure and potential energy each timestep. To do this, the fix creates its own computes of style “temp” “pressure”, and “pe”, as if these commands had been issued:  

compute fix-ID_MSST_temp all temp   
compute fix-ID_MSST_press all pressure fix-ID_MSST_temp   
compute fix-ID_MSST_pe all pe  

See the compute temp and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ “_MSST_temp” or “MSST_press” or “_MSST_pe”. The group for the new computes is “all”.  

The dftb keyword is to allow this fix to be used when LAMMPS is being driven by $\mathrm{DFTB+}$ , a density-functional tightbinding code. If the keyword dftb is used with a value of yes, then the MSST equations are altered to account for the electron entropy contribution to the Hugonio relations and total energy. See (Reed2) and (Goldman) for details on this contribution. In this case, you must define a fix external command in your input script, which is used to callback to $\mathrm{DFTB+}$ during the LAMMPS timestepping. $\mathrm{DFTB+}$ will communicate its info to LAMMPS via that fix.  

# 2.100.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of all internal variables to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

The progress of the MSST can be monitored by printing the global scalar and global vector quantities computed by the fix.  

As mentioned above, the scalar is the cumulative energy change due to the fix. By monitoring the thermodynamic econserve output, this can be used to test if the MD timestep is sufficiently small for accurate integration of the dynamic equations.  

The global vector contains four values in the following order. The vector values output by this fix are “intensive”.  

[dhugoniot, drayleigh, lagrangian_speed, lagrangian_position]  

1. dhugoniot is the departure from the Hugoniot (temperature units).   
2. drayleigh is the departure from the Rayleigh line (pressure units).   
3. lagrangian_speed is the laboratory-frame Lagrangian speed (particle velocity) of the computational cell (velocity units).   
4. lagrangian_position is the computational cell position in the reference frame moving at the shock speed. This is usually a good estimate of distance of the computational cell behind the shock front.  

To print these quantities to the log file with descriptive column headers, the following LAMMPS commands are suggested:  

fix msst all msst z   
variable dhug equal f_msst[1]   
variable dray equal f_msst[2]   
variable lgr_vel equal f_msst[3]   
variable lgr_pos equal f_msst[4]   
thermo_style custom step temp ke pe lz pzz econserve v_dhug v_dray v_lgr_vel v_lgr_pos f_msst  

# 2.100.5 Restrictions  

This fix style is part of the SHOCK package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

All cell dimensions must be periodic. This fix can not be used with a triclinic cell. The MSST fix has been tested only for the group-ID all.  

# 2.100.6 Related commands  

fix nphug, fix deform  

# 2.100.7 Default  

The keyword defaults are ${\mathrm{q}}=10$ , $\mathrm{mu}=0$ , tscale $=0.01$ , dftb $=$ no, beta $=0.0$ . Note that p0, v0, and e0 are calculated on the first timestep.  

(Reed) Reed, Fried, and Joannopoulos, Phys. Rev. Lett., 90, 235503 (2003).   
(Reed2) Reed, J. Phys. Chem. C, 116, 2205 (2012).   
(Goldman) Goldman, Srinivasan, Hamel, Fried, Gaus, and Elstner, J. Phys. Chem. C, 117, 7885 (2013).  

2.101 fix mvv/dpd command  

2.102 fix mvv/edpd command  

2.103 fix mvv/tdpd command  

# 2.103.1 Syntax  

fix ID group-ID mvv/dpd lambda fix ID group-ID mvv/edpd lambda fix ID group-ID mvv/tdpd lambda  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • mvv/dpd, mvv/edpd, mvv/tdpd $=$ style name of this fix command • lambda $=$ (optional) relaxation parameter (unitless)  

# 2.103.2 Examples  

fix 1 all mvv/dpd fix 1 all mvv/dpd 0.5 fix 1 all mvv/edpd fix 1 all mvv/edpd 0.5 fix 1 all mvv/tdpd fix 1 all mvv/tdpd 0.5  

# 2.103.3 Description  

Perform time integration using the modified velocity-Verlet (MVV) algorithm to update position and velocity (fix mvv/dpd), or position, velocity and temperature (fix mvv/edpd), or position, velocity and concentration (fix mvv/tdpd) for particles in the group each timestep.  

The modified velocity-Verlet (MVV) algorithm aims to improve the stability of the time integrator by using an extrapolated version of the velocity for the force evaluation:  

$$
\begin{array}{l}{\displaystyle\nu(t+\frac{\Delta t}{2})=\nu(t)+\frac{\Delta t}{2}\cdot a(t)}\ {\displaystyle r(t+\Delta t)=r(t)+\Delta t\cdot\nu(t+\frac{\Delta t}{2})}\ {\displaystyle a(t+\Delta t)=\frac{1}{m}\cdot F\left[r(t+\Delta t),\nu(t)+\lambda\cdot\Delta t\cdot a(t)\right]}\ {\displaystyle\nu(t+\Delta t)=\nu(t+\frac{\Delta t}{2})+\frac{\Delta t}{2}\cdot a(t+\Delta t)}\end{array}
$$  

where the parameter $\lambda$ depends on the specific choice of DPD parameters, and needs to be tuned on a case-by-case basis. Specification of a lambda value is optional. If specified, the setting must be from 0.0 to 1.0. If not specified, a default value of 0.5 is used, which effectively reproduces the standard velocity-Verlet (VV) scheme. For more details, see Groot.  

Fix mvv/dpd updates the position and velocity of each atom. It can be used with the pair_style mdpd command or othe pair styles such as pair dpd.  

Fix mvv/edpd updates the per-atom temperature, in addition to position and velocity, and must be used with the pair_style edpd command.  

Fix mvv/tdpd updates the per-atom chemical concentration, in addition to position and velocity, and must be used with the pair_style tdpd command.  

# 2.103.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.103.5 Restrictions  

These fixes are part of the DPD-MESO package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Changed in version 29Aug2024.  

This fix is incompatible with deformation controls that remap velocity, for instance the remap $\nu$ option of fix deform.  

# 2.103.6 Related commands  

pair_style mdpd, pair_style edpd, pair_style tdpd  

# 2.103.7 Default  

The default value for the optional lambda parameter is 0.5.  

(Groot) Groot and Warren, J Chem Phys, 107: 4423-4435 (1997). DOI: 10.1063/1.474784  

# 2.104 fix neb command  

# 2.104.1 Syntax  

fix ID group-ID neb Kspring keyword value  

• ID, group-ID are documented in fix command   
• neb $=$ style name of this fix command   
• Kspring $=$ spring constant for parallel nudging force (force/distance units or force units, see parallel keyword)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ parallel or perp or end  

parallel value $=$ neigh or ideal or equal  

neigh $=$ parallel nudging force based on distance to neighbor replicas (Kspring $=$ force/distance units) ideal $=$ parallel nudging force based on interpolated ideal position (Kspring $=$ force units) equal $=$ parallel nudging force based on interpolated ideal position before climbing, then interpolated␣ $\hookrightarrow$ ideal energy whilst climbing (Kspring $=$ force units) perp value = Kspring2 Kspring2 = spring constant for perpendicular nudging force (force/distance units) end values = estyle Kspring3 estyle = first or last or last/efirst or last/efirst/middle first = apply force to first replica last = apply force to last replica last/efirst = apply force to last replica and set its target energy to that of first replica last/efirst/middle $=$ same as last/efirst plus prevent middle replicas having lower energy than first␣ $\hookrightarrow$ replica Kspring $3=$ spring constant for target energy term (1/distance units)  

# 2.104.2 Examples  

fix 1 active neb 10.0 fix 2 all neb 1.0 perp 1.0 end last fix 2 all neb 1.0 perp 1.0 end first 1.0 end last 1.0 fix 1 all neb 1.0 parallel ideal end last/efirst 1  

# 2.104.3 Description  

Add nudging forces to atoms in the group for a multi-replica simulation run via the neb command to perform a nudged elastic band (NEB) calculation for finding the transition state. Hi-level explanations of NEB are given with the neb command and on the Howto replica doc page. The fix neb command must be used with the “neb” command and defines how inter-replica nudging forces are computed. A NEB calculation is divided in two stages. In the first stage n replicas are relaxed toward a MEP until convergence. In the second stage, the climbing image scheme (see (Henkelman2)) is enabled, so that the replica having the highest energy relaxes toward the saddle point (i.e. the point of highest energy along the MEP), and a second relaxation is performed.  

A key purpose of the nudging forces is to keep the replicas equally spaced. During the NEB calculation, the $3N.$ -length vector of interatomic force $F_{i}=-\nabla V$ for each replica $i$ is altered. For all intermediate replicas (i.e. for $1<i<N$ , except the climbing replica) the force vector becomes:  

$$
F_{i}=-\boldsymbol{\nabla}V+(\boldsymbol{\nabla}V\cdot\boldsymbol{T^{\prime}})\boldsymbol{T^{\prime}}+F_{\parallel}+F_{\perp}
$$  

T’ is the unit “tangent” vector for replica $i$ and is a function of $R_{i},R_{i-1},R_{i+1}$ , and the potential energy of the 3 replicas; it points roughly in the direction of $R_{i+i}-R_{i-1}$ ; see the (Henkelman1) paper for details. $R_{i}$ are the atomic coordinates of  

# 2.104. fix neb command  

replica $i$ ; $R_{i-1}$ and $R_{i+1}$ are the coordinates of its neighbor replicas. The term $\nabla V\cdot T^{\prime}$ is used to remove the component of the gradient parallel to the path which would tend to distribute the replica unevenly along the path. $F_{\parallel}$ is an artificial nudging force which is applied only in the tangent direction and which maintains the equal spacing between replicas (see below for more information). $F_{\bot}$ is an optional artificial spring which is applied in a direction perpendicular to the tangent direction and which prevent the paths from forming acute kinks (see below for more information).  

In the second stage of the NEB calculation, the interatomic force $F_{i}$ for the climbing replica (the replica of highest energy after the first stage) is changed to:  

$$
F_{i}=-\boldsymbol{\nabla}V+2(\boldsymbol{\nabla}V\cdot\boldsymbol{T^{\prime}})\boldsymbol{T^{\prime}}+\boldsymbol{F}_{\perp}
$$  

and the relaxation procedure is continued to a new converged MEP.  

The keyword parallel specifies how the parallel nudging force is computed. With a value of neigh, the parallel nudging force is computed as in (Henkelman1) by connecting each intermediate replica with the previous and the next image:  

$$
F_{\parallel}=K s p r i n g\cdot\left(\left|R_{i+1}-R_{i}\right|-\left|R_{i}-R_{i-1}\right|\right)
$$  

Note that in this case the specified Kspring is in force/distance units.  

With a value of ideal, the spring force is computed as suggested in (WeinanE)  

$$
F_{||}=-K s p r i n g\cdot(R D-R D_{i d e a l})/(2\cdot m e a n D i s t)
$$  

where $R D$ is the “reaction coordinate” see neb section, and $R D_{i d e a l}$ is the ideal $R D$ for which all the images are equally spaced. I.e. $R D_{i d e a l}=(i-1)\cdot$ meanDist when the climbing replica is off, where $i$ is the replica number). The meanDist is the average distance between replicas. Note that in this case the specified Kspring is in force units. When the climbing replica is on, $R D_{i d e a l}$ and meanDist are calculated separately each side of the climbing image. Note that the ideal form of nudging can often be more effective at keeping the replicas equally spaced before climbing, then equally spaced either side of the climbing image whilst climbing.  

With a value of equal the spring force is computed as for ideal when the climbing replica is off, promoting equidistance. When the climbing replica is on, the spring force is computed to promote equidistant absolute differences in energy, rather than distance, each side of the climbing image:  

$$
F_{||}=-K s p r i n g\cdot(E D-E D_{i d e a l})/(2\cdot m e a n E D i s t)
$$  

where $E D$ is the cumulative sum of absolute energy differences:  

$$
E D=\sum_{i<N}\left|E(R_{i+1})-E(R_{i})\right|,
$$  

meanEdist is the average absolute energy difference between replicas up to the climbing image or from the climbing image to the final image, for images before or after the climbing image respectively. $E D_{i d e a l}$ is the corresponding cumulative sum of average absolute energy differences in each case, in close analogy to ideal. This form of nudging is to aid schemes which integrate forces along, or near to, NEB pathways such as fix_pafi.  

The keyword perp specifies if and how a perpendicular nudging force is computed. It adds a spring force perpendicular to the path in order to prevent the path from becoming too strongly kinked. It can significantly improve the convergence of the NEB calculation when the resolution is poor. I.e. when few replicas are used; see (Maras) for details.  

The perpendicular spring force is given by  

$$
F_{\bot}=K_{s p r i n g2}\cdot F(R_{i-1},R_{i},R_{i+1})(R_{i+1}+R_{i-1}-2R_{i})
$$  

where Kspring2 is the specified value. $F(R_{i-1},R_{i},R_{i+1})$ is a smooth scalar function of the angle $R_{i-1}R_{i}R_{i+1}$ . It is equal to 0.0 when the path is straight and is equal to 1 when the angle $R_{i-1}R_{i}R_{i+1}$ is acute. $F(R_{i-1},R_{i},R_{i+1})$ is defined in (Jonsson).  

If Kspring2 is set to 0.0 (the default) then no perpendicular spring force is added.  

By default, no additional forces act on the first and last replicas during the NEB relaxation, so these replicas simply relax toward their respective local minima. By using the key word end, additional forces can be applied to the first and/or last replicas, to enable them to relax toward a MEP while constraining their energy E to the target energy ETarget.  

If $E_{T a r g e t}>E$ , the interatomic force $F_{i}$ for the specified replica becomes:  

$$
\begin{array}{r l}{F_{i}=-\nabla V+(\nabla V\cdot T^{\prime}+(E-E_{T a r g e t})\cdot K_{s p r i n g3})T^{\prime},\quad}&{\mathrm{when}\quad\nabla V\cdot T^{\prime}<0}\ {F_{i}=-\nabla V+(\nabla V\cdot T^{\prime}+(E_{T a r g e t}-E)\cdot K_{s p r i n g3})T^{\prime},\quad}&{\mathrm{when}\quad\nabla V\cdot T^{\prime}>0}\end{array}
$$  

The “spring” constant on the difference in energies is the specified Kspring3 value.  

When estyle is specified as first, the force is applied to the first replica. When estyle is specified as last, the force is applied to the last replica. Note that the end keyword can be used twice to add forces to both the first and last replicas.  

For both these estyle settings, the target energy ETarget is set to the initial energy of the replica (at the start of the NEB calculation).  

If the estyle is specified as last/efirst or last/efirst/middle, force is applied to the last replica, but the target energy ETarge is continuously set to the energy of the first replica, as it evolves during the NEB relaxation.  

The difference between these two estyle options is as follows. When estyle is specified as last/efirst, no change is made to the inter-replica force applied to the intermediate replicas (neither first or last). If the initial path is too far from the MEP, an intermediate replica may relax “faster” and reach a lower energy than the last replica. In this case the intermediate replica will be relaxing toward its own local minima. This behavior can be prevented by specifying estyle as last/efirst/middle which will alter the inter-replica force applied to intermediate replicas by removing the contribution of the gradient to the inter-replica force. This will only be done if a particular intermediate replica has a lower energy than the first replica. This should effectively prevent the intermediate replicas from over-relaxing.  

After converging a NEB calculation using an estyle of last/efirst/middle, you should check that all intermediate replica have a larger energy than the first replica. If this is not the case, the path is probably not a MEP.  

Finally, note that the last replica may never reach the target energy if it is stuck in a local minima which has a large energy than the target energy.  

# 2.104.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, as invoked by the minimize command via the neb command.  

# 2.104.5 Restrictions  

This command can only be used if LAMMPS was built with the REPLICA package. See the Build package doc page for more info.  

# 2.104.6 Related commands  

neb  

# 2.104.7 Default  

The option defaults are parallel $=$ neigh, perp $=0.0$ , ends is not specified (no inter-replica force on the end replicas).  

(Henkelman1) Henkelman and Jonsson, J Chem Phys, 113, 9978-9985 (2000).   
(Henkelman2) Henkelman, Uberuaga, Jonsson, J Chem Phys, 113, 9901-9904 (2000).   
(WeinanE) E, Ren, Vanden-Eijnden, Phys Rev B, 66, 052301 (2002).   
(Jonsson) Jonsson, Mills and Jacobsen, in Classical and Quantum Dynamics in Condensed Phase Simulations, edited by Berne, Ciccotti, and Coker World Scientific, Singapore, 1998, p 385.   
(Maras) Maras, Trushin, Stukowski, Ala-Nissila, Jonsson, Comp Phys Comm, 205, 13-21 (2016).  

# 2.105 fix neb/spin command  

# 2.105.1 Syntax  

• ID, group-ID are documented in fix command • neb/spin $=$ style name of this fix command  

Kspring $=$ spring constant for parallel nudging force (force/distance units or force units, see parallel keyword)  

# 2.105.2 Examples  

# 2.105.5 Restrictions  

This command can only be used if LAMMPS was built with the SPIN package. See the Build package doc page for more info.  

# 2.105.6 Related commands  

neb_spin  

# 2.105.7 Default  

none  

(Bessarab) Bessarab, Uzdin, Jonsson, Comp Phys Comm, 196, 335-347 (2015).  

# 2.106 fix nvt command  

Accelerator Variants: nvt/gpu, nvt/intel, nvt/kk, nvt/omp  

# 2.107 fix npt command  

Accelerator Variants: npt/gpu, npt/intel, npt/kk, npt/omp  

# 2.108 fix nph command  

Accelerator Variants: nph/kk, nph/omp  

# 2.108.1 Syntax  

fix ID group-ID style_name keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• style_name $=n\nu t$ or npt or nph   
• one or more keyword/value pairs may be appended keyword $=$ temp or iso or aniso or tri or x or y or z or xy or yz or xz or couple or tchain or pchain␣ $\hookrightarrow\mathrm{Or}$ mtk or tloop or ploop or nreset or drag or ptemp or dilate or scalexy or scaleyz or scalexz or␣ $\hookrightarrow$ flip or fixedpoint or update temp values $=$ Tstart Tstop Tdamp Tstart,Tstop $=$ external temperature at start/end of run Tdamp $=$ temperature damping parameter (time units) iso or aniso or tri values $=$ Pstart Pstop Pdamp Pstart,Pstop = scalar external pressure at start/end of run (pressure units) Pdamp $=$ pressure damping parameter (time units) x or y or z or xy or yz or xz values = Pstart Pstop Pdamp Pstart,Pstop $=$ external stress tensor component at start/end of run (pressure units) Pdamp $-$ stress damping parameter (time units) couple $=$ none or xyz or xy or yz or xz tchain value $=\mathrm{N}$ N = length of thermostat chain (1 = single thermostat) pchain value $=\mathrm{N}$  

N length of thermostat chain on barostat ( $0=\mathrm{no}$ thermostat) mtk value = yes or no = add in MTK adjustment term or not tloop value = M  

M = number of sub-cycles to perform on thermostat ploop value = M  

M = number of sub-cycles to perform on barostat thermostat nreset value $-$ reset reference cell every this many timesteps drag value = Df  

Df = drag factor added to barostat/thermostat (0.0 = no drag) ptemp value = Ttarget  

Ttarget = target temperature for barostat dilate value = dilate-group-ID  

dilate-group-ID = only dilate atoms in this group due to barostat volume changes scalexy value = yes or no = scale xy with ly scaleyz value = yes or no = scale yz with lz scalexz value = yes or no = scale xz with lz flip value = yes or no = allow or disallow box flips when it becomes highly skewed fixedpoint values = x y z  

x,y,z = perform barostat dilation/contraction around this point (distance units)   
update value $=$ dipole or dipole/dlm dipole $=$ update dipole orientation (only for sphere variants)   
dipole/dlm $=$ use DLM integrator to update dipole orientation (only for sphere variants)  

# 2.108.2 Examples  

fix 1 all nvt temp 300.0 300.0 100.0   
fix 1 water npt temp 300.0 300.0 100.0 iso 0.0 0.0 1000.0   
fix 2 jello npt temp 300.0 300.0 100.0 tri 5.0 5.0 1000.0   
fix 2 ice nph x 1.0 1.0 0.5 y 2.0 2.0 0.5 z 3.0 3.0 0.5 yz 0.1 0.1 0.5 xz 0.2 0.2 0.5 xy 0.3 0.3 0.5 nreset 1000  

# 2.108.3 Description  

These commands perform time integration on Nose-Hoover style non-Hamiltonian equations of motion which are designed to generate positions and velocities sampled from the canonical (nvt), isothermal-isobaric (npt), and isenthalpic (nph) ensembles. This updates the position and velocity for atoms in the group each timestep.  

The thermostatting and barostatting is achieved by adding some dynamic variables which are coupled to the particle velocities (thermostatting) and simulation domain dimensions (barostatting). In addition to basic thermostatting and barostatting, these fixes can also create a chain of thermostats coupled to the particle thermostat, and another chain of thermostats coupled to the barostat variables. The barostat can be coupled to the overall box volume, or to individual dimensions, including the xy, xz and yz tilt dimensions. The external pressure of the barostat can be specified as either a scalar pressure (isobaric ensemble) or as components of a symmetric stress tensor (constant stress ensemble). When used correctly, the time-averaged temperature and stress tensor of the particles will match the target values specified by Tstart/Tstop and Pstart/Pstop.  

The equations of motion used are those of Shinoda et al in (Shinoda), which combine the hydrostatic equations of Martyna, Tobias and Klein in (Martyna) with the strain energy proposed by Parrinello and Rahman in (Parrinello). The time integration schemes closely follow the time-reversible measure-preserving Verlet and rRESPA integrators derived by Tuckerman et al in (Tuckerman).  

The thermostat parameters for fix styles nvt and npt are specified using the temp keyword. Other thermostat-related keywords are tchain, tloop and drag, which are discussed below.  

The thermostat is applied to only the translational degrees of freedom for the particles. The translational degrees of freedom can also have a bias velocity removed before thermostatting takes place; see the description below. The desired temperature at each timestep is a ramped value during the run from Tstart to Tstop. The Tdamp parameter is specified in time units and determines how rapidly the temperature is relaxed. For example, a value of 10.0 means to relax the temperature in a timespan of (roughly) 10 time units (e.g. τ or fs or ps - see the units command). The atoms in the fix group are the only ones whose velocities and positions are updated by the velocity/position update portion of the integration.  

![](images/39f5f56b3a8d345ac993110b3302671648b046bbe4423dae723e1c123619714f.jpg)  

# Note  

A Nose-Hoover thermostat will not work well for arbitrary values of Tdamp. If Tdamp is too small, the temperature can fluctuate wildly; if it is too large, the temperature will take a very long time to equilibrate. A good choice for many models is a Tdamp of around 100 timesteps. Note that this is NOT the same as 100 time units for most units settings. A simple way to ensure this, is via using an immediate variable expression accessing the thermo property ‘dt’, which is the length of the time step. Example:  

fix 1 all nvt temp 300.0 300.0 \$(100.0\*dt)  

The barostat parameters for fix styles npt and nph is specified using one or more of the iso, aniso, tri, x, y, z, xy, xz, yz, and couple keywords. These keywords give you the ability to specify all 6 components of an external stress tensor, and to couple various of these components together so that the dimensions they represent are varied together during a constant-pressure simulation.  

Other barostat-related keywords are pchain, mtk, ploop, nreset, drag, and dilate, which are discussed below.  

Orthogonal simulation boxes have 3 adjustable dimensions (x,y,z). Triclinic (non-orthogonal) simulation boxes have 6 adjustable dimensions (x,y,z,xy,xz,yz). The create_box, read data, and read_restart commands specify whether the simulation box is orthogonal or non-orthogonal (triclinic) and explain the meaning of the xy,xz,yz tilt factors.  

The target pressures for each of the 6 components of the stress tensor can be specified independently via the x, y, z, xy, xz, yz keywords, which correspond to the 6 simulation box dimensions. For each component, the external pressure or tensor component at each timestep is a ramped value during the run from Pstart to Pstop. If a target pressure is specified for a component, then the corresponding box dimension will change during a simulation. For example, if the $y$ keyword is used, the y-box length will change. If the xy keyword is used, the xy tilt factor will change. A box dimension will not change if that component is not specified, although you have the option to change that dimension via the fix deform command.  

Note that in order to use the xy, xz, or yz keywords, the simulation box must be triclinic, even if its initial tilt factors are 0.0.  

For all barostat keywords, the Pdamp parameter operates like the Tdamp parameter, determining the time scale on which pressure is relaxed. For example, a value of 10.0 means to relax the pressure in a timespan of (roughly) 10 time units (e.g. τ or fs or ps - see the units command).  

# Note  

A Nose-Hoover barostat will not work well for arbitrary values of Pdamp. If Pdamp is too small, the pressure and volume can fluctuate wildly; if it is too large, the pressure will take a very long time to equilibrate. A good choice for many models is a Pdamp of around 1000 timesteps. However, note that Pdamp is specified in time units, and that timesteps are NOT the same as time units for most units settings.  

The relaxation rate of the barostat is set by its inertia $W$ :  

$$
W=(N+1)k_{B}T_{\mathrm{target}}P_{\mathrm{damp}}^{2}
$$  

# 2.108. fix nph command  

where $N$ is the number of atoms, $k_{B}$ is the Boltzmann constant, and $T_{\mathrm{target}}$ is the target temperature of the barostat (Martyna). If a thermostat is defined, $T_{\mathrm{target}}$ is the target temperature of the thermostat. If a thermostat is not defined, $T_{\mathrm{target}}$ is set to the current temperature of the system when the barostat is initialized. If this temperature is too low the simulation will quit with an error. Note: in previous versions of LAMMPS, $T_{\mathrm{target}}$ would default to a value of 1.0 for $l j$ units and 300.0 otherwise if the system had a temperature of exactly zero.  

If a thermostat is not specified by this fix, $T_{\mathrm{target}}$ can be manually specified using the Ptemp parameter. This may be useful if the barostat is initialized when the current temperature does not reflect the steady state temperature of the system. This keyword may also be useful in athermal simulations where the temperature is not well defined.  

Regardless of what atoms are in the fix group (the only atoms which are time integrated), a global pressure or stress tensor is computed for all atoms. Similarly, when the size of the simulation box is changed, all atoms are re-scaled to new positions, unless the keyword dilate is specified with a dilate-group- $I D$ for a group that represents a subset of the atoms. This can be useful, for example, to leave the coordinates of atoms in a solid substrate unchanged and controlling the pressure of a surrounding fluid. This option should be used with care, since it can be unphysical to dilate some atoms and not others, because it can introduce large, instantaneous displacements between a pair of atoms (one dilated, one not) that are far from the dilation origin. Also note that for atoms not in the fix group, a separate time integration fix like fix nve or fix nvt can be used on them, independent of whether they are dilated or not.  

The couple keyword allows two or three of the diagonal components of the pressure tensor to be “coupled” together. The value specified with the keyword determines which are coupled. For example, $x z$ means the $P x x$ and $P z z$ components of the stress tensor are coupled. Xyz means all 3 diagonal components are coupled. Coupling means two things: the instantaneous stress will be computed as an average of the corresponding diagonal components, and the coupled box dimensions will be changed together in lockstep, meaning coupled dimensions will be dilated or contracted by the same percentage every timestep. The Pstart, Pstop, Pdamp parameters for any coupled dimensions must be identical. Couple xyz can be used for a 2d simulation; the z dimension is simply ignored.  

The iso, aniso, and tri keywords are simply shortcuts that are equivalent to specifying several other keywords together.  

The keyword iso means couple all 3 diagonal components together when pressure is computed (hydrostatic pressure), and dilate/contract the dimensions together. Using “iso Pstart Pstop Pdamp” is the same as specifying these 4 keywords:  

x Pstart Pstop Pdamp y Pstart Pstop Pdamp z Pstart Pstop Pdamp couple xyz  

The keyword aniso means $x,y$ , and $z$ dimensions are controlled independently using the $P x x,P y y$ , and $P z z$ components of the stress tensor as the driving forces, and the specified scalar external pressure. Using “aniso Pstart Pstop Pdamp” is the same as specifying these 4 keywords:  

x Pstart Pstop Pdamp y Pstart Pstop Pdamp z Pstart Pstop Pdamp couple none  

The keyword tri means x, y, z, xy, xz, and yz dimensions are controlled independently using their individual stress components as the driving forces, and the specified scalar pressure as the external normal stress. Using “tri Pstart Pstop Pdamp” is the same as specifying these 7 keywords:  

x Pstart Pstop Pdamp y Pstart Pstop Pdamp z Pstart Pstop Pdamp (continues on next page)  

(continued from previous page)  

In some cases (e.g. for solids) the pressure (volume) and/or temperature of the system can oscillate undesirably when a Nose/Hoover barostat and thermostat is applied. The optional drag keyword will damp these oscillations, although it alters the Nose/Hoover equations. A value of 0.0 (no drag) leaves the Nose/Hoover formalism unchanged. A nonzero value adds a drag term; the larger the value specified, the greater the damping effect. Performing a short run and monitoring the pressure and temperature is the best way to determine if the drag term is working. Typically a value between 0.2 to 2.0 is sufficient to damp oscillations after a few periods. Note that use of the drag keyword will interfere with energy conservation and will also change the distribution of positions and velocities so that they do not correspond to the nominal NVT, NPT, or NPH ensembles.  

An alternative way to control initial oscillations is to use chain thermostats. The keyword tchain determines the number of thermostats in the particle thermostat. A value of 1 corresponds to the original Nose-Hoover thermostat. The keyword pchain specifies the number of thermostats in the chain thermostatting the barostat degrees of freedom. A value of 0 corresponds to no thermostatting of the barostat variables.  

The mtk keyword controls whether or not the correction terms due to Martyna, Tuckerman, and Klein are included in the equations of motion (Martyna). Specifying no reproduces the original Hoover barostat, whose volume probability distribution function differs from the true NPT and NPH ensembles by a factor of 1/V. Hence using yes is more correct, but in many cases the difference is negligible.  

The keyword tloop can be used to improve the accuracy of integration scheme at little extra cost. The initial and final updates of the thermostat variables are broken up into tloop sub-steps, each of length dt/tloop. This corresponds to using a first-order Suzuki-Yoshida scheme (Tuckerman). The keyword ploop does the same thing for the barostat thermostat.  

The keyword nreset controls how often the reference dimensions used to define the strain energy are reset. If this keyword is not used, or is given a value of zero, then the reference dimensions are set to those of the initial simulation domain and are never changed. If the simulation domain changes significantly during the simulation, then the final average pressure tensor will differ significantly from the specified values of the external stress tensor. A value of nstep means that every nstep timesteps, the reference dimensions are set to those of the current simulation domain.  

The scaleyz, scalexz, and scalexy keywords control whether or not the corresponding tilt factors are scaled with the associated box dimensions when barostatting triclinic periodic cells. The default values yes will turn on scaling, which corresponds to adjusting the linear dimensions of the cell while preserving its shape. Choosing no ensures that the tilt factors are not scaled with the box dimensions. See below for restrictions and default values in different situations. In older versions of LAMMPS, scaling of tilt factors was not performed. The old behavior can be recovered by setting all three scale keywords to no.  

The flip keyword allows the tilt factors for a triclinic box to exceed half the distance of the parallel box length, as discussed below. If the flip value is set to yes, the bound is enforced by flipping the box when it is exceeded. If the flip value is set to no, the tilt will continue to change without flipping. Note that if applied stress induces large deformations (e.g. in a liquid), this means the box shape can tilt dramatically and LAMMPS will run less efficiently, due to the large volume of communication needed to acquire ghost atoms around a processor’s irregular-shaped subdomain. For extreme values of tilt, LAMMPS may also lose atoms and generate an error.  

The fixedpoint keyword specifies the fixed point for barostat volume changes. By default, it is the center of the box. Whatever point is chosen will not move during the simulation. For example, if the lower periodic boundaries pass through (0,0,0), and this point is provided to fixedpoint, then the lower periodic boundaries will remain at (0,0,0), while the upper periodic boundaries will move twice as far. In all cases, the particle trajectories are unaffected by the chosen value, except for a time-dependent constant translation of positions.  

If the update keyword is used with the dipole value, then the orientation of the dipole moment of each particle is also updated during the time integration. This option should be used for models where a dipole moment is assigned to finite-size particles, e.g. spheroids via use of the atom_style hybrid sphere dipole command.  

The default dipole orientation integrator can be changed to the Dullweber-Leimkuhler-McLachlan integration scheme (Dullweber) when using update with the value dipole/dlm. This integrator is symplectic and time-reversible, giving better energy conservation and allows slightly longer timesteps at only a small additional computational cost.  

![](images/c382682d410b10abfb5afdcecd447615a0e8b5ecab1087d8cf478682b25706dc.jpg)  

# Note  

Using a barostat coupled to tilt dimensions xy, xz, yz can sometimes result in arbitrarily large values of the tilt dimensions, i.e. a dramatically deformed simulation box. LAMMPS allows the tilt factors to grow a small amount beyond the normal limit of half the box length (0.6 times the box length), and then performs a box “flip” to an equivalent periodic cell. See the discussion of the flip keyword above, to allow this bound to be exceeded, if desired.  

The flip operation is described in more detail in the page for fix deform. Both the barostat dynamics and the atom trajectories are unaffected by this operation. However, if a tilt factor is incremented by a large amount (1.5 times the box length) on a single timestep, LAMMPS can not accommodate this event and will terminate the simulation with an error. This error typically indicates that there is something badly wrong with how the simulation was constructed, such as specifying values of Pstart that are too far from the current stress value, or specifying a timestep that is too large. Triclinic barostatting should be used with care. This also is true for other barostat styles, although they tend to be more forgiving of insults. In particular, it is important to recognize that equilibrium liquids can not support a shear stress and that equilibrium solids can not support shear stresses that exceed the yield stress.  

One exception to this rule is if the first dimension in the tilt factor ( $\mathbf{\check{x}}$ for xy) is non-periodic. In that case, the limits on the tilt factor are not enforced, since flipping the box in that dimension does not change the atom positions due to non-periodicity. In this mode, if you tilt the system to extreme angles, the simulation will simply become inefficient due to the highly skewed simulation box.  

![](images/8a00fc739e62d09ac85b7e66f167b9797f45cdb87705a5239220d1cbd6cfa0e2.jpg)  

# Note  

Unlike the fix temp/berendsen command which performs thermostatting but NO time integration, these fixes perform thermostatting/barostatting AND time integration. Thus you should not use any other time integration fix, such as fix nve on atoms to which this fix is applied. Likewise, fix nvt and fix npt should not normally be used on atoms that also have their temperature controlled by another fix - e.g. by fix langevin or fix temp/rescale commands.  

See the Howto thermostat and Howto barostat doc pages for a discussion of different ways to compute temperature and perform thermostatting and barostatting.  

These fixes compute a temperature and pressure each timestep. To do this, the thermostat and barostat fixes create their own computes of style “temp” and “pressure”, as if one of these sets of commands had been issued:  

For fix nvt:  

For fix nvt, the group for the new temperature compute is the same as the fix group. For fix npt and fix nph, the group for both the new temperature and pressure compute is “all” since pressure is computed for the entire system. In the case of fix nph, the temperature compute is not used for thermostatting, but just for a kinetic-energy contribution to the pressure. See the compute temp and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of these fix’s temperature or pressure via the compute_modify command. Or you can print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the x-component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

These fixes can be used with either the verlet or respa integrators. When using one of the barostat fixes with respa, LAMMPS uses an integrator constructed according to the following factorization of the Liouville propagator (for two rRESPA levels):  

$$
\begin{array}{r l}&{\exp\left(\mathrm{i}L\Delta t\right)=\hat{E}\exp\left(\mathrm{i}L_{\mathrm{T}}.\mathrm{baro}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{T}}.\mathrm{par}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{e},2}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{2}^{(2)}\frac{\Delta t}{2}\right)}\ &{\qquad\times\left[\exp\left(\mathrm{i}L_{2}^{(1)}\frac{\Delta t}{2n}\right)\exp\left(\mathrm{i}L_{\mathrm{e},1}\frac{\Delta t}{2n}\right)\exp\left(\mathrm{i}L_{1}\frac{\Delta t}{n}\right)\exp\left(\mathrm{i}L_{\mathrm{e},1}\frac{\Delta t}{2n}\right)\exp\left(\mathrm{i}L_{2}^{(1)}\frac{\Delta t}{2n}\right)\right]^{n}}\ &{\qquad\times\exp\left(\mathrm{i}L_{2}^{(2)}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{e},2}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{T}}.\mathrm{par}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{T}\cdot\mathrm{baro}}\frac{\Delta t}{2}\right)}\ &{\qquad+\mathcal{O}\left(\Delta t^{3}\right)}\end{array}
$$  

This factorization differs somewhat from that of Tuckerman et al, in that the barostat is only updated at the outermost rRESPA level, whereas Tuckerman’s factorization requires splitting the pressure into pieces corresponding to the forces computed at each rRESPA level. In theory, the latter method will exhibit better numerical stability. In practice, because Pdamp is normally chosen to be a large multiple of the outermost rRESPA timestep, the barostat dynamics are not the limiting factor for numerical stability. Both factorizations are time-reversible and can be shown to preserve the phase space measure of the underlying non-Hamiltonian equations of motion.  

# Note  

This implementation has been shown to conserve linear momentum up to machine precision under NVT dynamics. Under NPT dynamics, for a system with zero initial total linear momentum, the total momentum fluctuates close to zero. It may occasionally undergo brief excursions to non-negligible values, before returning close to zero. Over long simulations, this has the effect of causing the center-of-mass to undergo a slow random walk. This can be mitigated by resetting the momentum at infrequent intervals using the fix momentum command.  

The fix npt and fix nph commands can be used with rigid bodies or mixtures of rigid bodies and non-rigid particles (e.g. solvent). But there are also fix rigid/npt and fix rigid/nph commands, which are typically a more natural choice. See the page for those commands for more discussion of the various ways to do this.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.108.4 Restart, fix_modify, output, run start/stop, minimize info  

These fixes writes the state of all the thermostat and barostat variables to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by these fixes. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure, as described above. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

![](images/100f13d6e17500d4a1d0cbddfb2d47fc03017bd65be5e5b6d5a5ed6c3aedfad6.jpg)  

# Note  

If both the temp and press keywords are used in a single thermo_modify command (or in two separate commands), then the order in which the keywords are specified is important. Note that a pressure compute defines its own temperature compute as an argument when it is specified. The temp keyword will override this (for the pressure compute being used by fix npt), but only if the temp keyword comes after the press keyword. If the temp keyword comes before the press keyword, then the new pressure compute specified by the press keyword will be unaffected by the temp setting.  

The cumulative energy change in the system imposed by these fixes, via either thermostatting and/or barostatting, is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style page for details.  

These fixes compute a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

These fixes compute also compute a global vector of quantities, which can be accessed by various output commands.   
The vector values are “intensive”.  

The vector stores internal Nose/Hoover thermostat and barostat variables. The number and meaning of the vector values depends on which fix is used and the settings for keywords tchain and pchain, which specify the number of Nose/Hoover chains for the thermostat and barostat. If no thermostatting is done, then tchain is 0. If no barostatting is done, then pchain is 0. In the following list, “ndof” is 0, 1, 3, or 6, and is the number of degrees of freedom in the barostat. Its value is 0 if no barostat is used, else its value is 6 if any off-diagonal stress tensor component is barostatted, else its value is 1 if couple xyz is used or couple xy for a 2d simulation, otherwise its value is 3.  

The order of values in the global vector and their meaning is as follows. The notation means there are tchain values for eta, followed by tchain for eta_dot, followed by ndof for omega, etc:  

• eta[tchain] $=$ particle thermostat displacements (unitless)  

• eta_dot[tchain] $=$ particle thermostat velocities (1/time units)   
• omega[ndof] $=$ barostat displacements (unitless)   
• omega_dot[ndof] $=$ barostat velocities (1/time units)   
• etap[pchain] $=$ barostat thermostat displacements (unitless)   
• etap_dot[pchain] $=$ barostat thermostat velocities (1/time units)   
• PE_eta[tchain] $=$ potential energy of each particle thermostat displacement (energy units)   
• KE_eta_dot[tchain] $=$ kinetic energy of each particle thermostat velocity (energy units)   
• PE_omega[ndof] $=$ potential energy of each barostat displacement (energy units)   
• KE_omega_dot[ndof] $=$ kinetic energy of each barostat velocity (energy units)   
• PE_etap[pchain] $=$ potential energy of each barostat thermostat displacement (energy units)   
• KE_etap_dot[pchain] $=$ kinetic energy of each barostat thermostat velocity (energy units)   
• PE_strain[1] $=$ scalar strain energy (energy units)  

These fixes can ramp their external temperature and pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

These fixes are not invoked during energy minimization.  

# 2.108.5 Restrictions  

X, y, z cannot be barostatted if the associated dimension is not periodic. Xy, $x z$ , and yz can only be barostatted if the simulation domain is triclinic and the second dimension in the keyword ( $y$ dimension in $x y$ ) is periodic. $Z,x z$ , and yz, cannot be barostatted for 2D simulations. The create_box, read data, and read_restart commands specify whether the simulation box is orthogonal or non-orthogonal (triclinic) and explain the meaning of the xy,xz,yz tilt factors.  

For the temp keyword, the final Tstop cannot be 0.0 since it would make the external $\mathrm{T}=0.0$ at some timestep during the simulation which is not allowed in the Nose/Hoover formulation.  

The scaleyz yes and scalexz yes keyword/value pairs can not be used for 2D simulations. scaleyz yes, scalexz yes, and scalexy yes options can only be used if the second dimension in the keyword is periodic, and if the tilt factor is not coupled to the barostat via keywords tri, yz, xz, and xy.  

These fixes can be used with dynamic groups as defined by the group command. Likewise they can be used with groups to which atoms are added or deleted over time, e.g. a deposition simulation. However, the conservation properties of the thermostat and barostat are defined for systems with a static set of atoms. You may observe odd behavior if the atoms in a group vary dramatically over time or the atom count becomes very small.  

# 2.108.6 Related commands  

fix nve, fix_modify, run_style  

# 2.108.7 Default  

The keyword defaults are tchain $=3$ , pchain $=3$ , $\mathrm{mtk}=\mathrm{yes}$ , tloop $=1$ , ploop $=1$ , nreset $=0$ , $\mathrm{drag}=0.0$ , dilate $=$ all, couple $=$ none, flip $=$ yes, scaleyz $=$ scalexz $=$ scalexy $=$ yes if periodic in second dimension and not coupled to barostat, otherwise no.  

(Martyna) Martyna, Tobias and Klein, J Chem Phys, 101, 4177 (1994).  

# LAMMPS Documentation, Release 4Feb2025  

(Parrinello) Parrinello and Rahman, J Appl Phys, 52, 7182 (1981).   
(Tuckerman) Tuckerman, Alejandre, Lopez-Rendon, Jochim, and Martyna, J Phys A: Math Gen, 39, 5629 (2006).   
(Shinoda) Shinoda, Shiga, and Mikami, Phys Rev B, 69, 134103 (2004).   
(Dullweber) Dullweber, Leimkuhler and McLachlan, J Chem Phys, 107, 5840 (1997).  

2.109 fix nvt/eff command  

2.110 fix npt/eff command  

# 2.111 fix nph/eff command  

# 2.111.1 Syntax  

fix ID group-ID style_name keyword value ...  

• ID, group-ID are documented in fix command • style_name $=n\nu t/e f f$ or npt/eff or nph/eff  

one or more keyword value pairs may be appended   
keyword $=$ temp or iso or aniso or tri or x or y or z or xy or yz or xz or couple or tchain or pchain␣   
$\hookrightarrow\mathrm{Or}$ mtk or tloop or ploop or nreset or drag or dilate temp values $=$ Tstart Tstop Tdamp  

Tstart,Tstop $=$ external temperature at start/end of run  

Tdamp $=$ temperature damping parameter (time units) iso or aniso or tri values $=$ Pstart Pstop Pdamp  

Pstart,Pstop $-$ scalar external pressure at start/end of run (pressure units)  

Pdamp $-$ pressure damping parameter (time units) x or y or z or xy or yz or xz values $=$ Pstart Pstop Pdam  

Pstart,Pstop = external stress tensor component at start/end of run (pressure units)  

Pdamp = stress damping parameter (time units)   
couple $-$ none or xyz or xy or yz or xz   
tchain value = length of thermostat chain (1 = single thermostat)   
pchain values = length of thermostat chain on barostat ( $0=\mathrm{no}$ thermostat)   
mtk value = yes or no $=$ add in MTK adjustment term or not   
tloop value $=$ number of sub-cycles to perform on thermostat   
ploop value $=$ number of sub-cycles to perform on barostat thermostat   
nreset value $=$ reset reference cell every this many timesteps   
drag value $=$ drag factor added to barostat/thermostat (0.0 = no drag)   
dilate value $=$ all or partial  

# 2.111.2 Examples  

fix 1 all nvt/eff temp 300.0 300.0 0.1   
fix 1 part npt/eff temp 300.0 300.0 0.1 iso 0.0 0.0 1.0   
fix 2 part npt/eff temp 300.0 300.0 0.1 tri 5.0 5.0 1.0   
fix 2 ice nph/eff x 1.0 1.0 0.5 y 2.0 2.0 0.5 z 3.0 3.0 0.5 yz 0.1 0.1 0.5 xz 0.2 0.2 0.5 xy 0.3 0.3 0.5 nreset␣   
,→1000  

# 2.111.3 Description  

These commands perform time integration on Nose-Hoover style non-Hamiltonian equations of motion for nuclei and electrons in the group for the electron force field model. The fixes are designed to generate positions and velocities sampled from the canonical (nvt), isothermal-isobaric (npt), and isenthalpic (nph) ensembles. This is achieved by adding some dynamic variables which are coupled to the particle velocities (thermostatting) and simulation domain dimensions (barostatting). In addition to basic thermostatting and barostatting, these fixes can also create a chain of thermostats coupled to the particle thermostat, and another chain of thermostats coupled to the barostat variables. The barostat can be coupled to the overall box volume, or to individual dimensions, including the xy, xz and yz tilt dimensions. The external pressure of the barostat can be specified as either a scalar pressure (isobaric ensemble) or as components of a symmetric stress tensor (constant stress ensemble). When used correctly, the time-averaged temperature and stress tensor of the particles will match the target values specified by Tstart/Tstop and Pstart/Pstop.  

The operation of these fixes is exactly like that described by the fix nvt, npt, and nph commands, except that the radius and radial velocity of electrons are also updated. Likewise the temperature and pressure calculated by the fix, using the computes it creates (as discussed in the fix nvt, npt, and nph doc page), are performed with computes that include the eFF contribution to the temperature or kinetic energy from the electron radial velocity.  

# Note  

there are two different pressures that can be reported for eFF when defining the pair_style (see pair eff/cut to understand these settings), one (default) that considers electrons do not contribute radial virial components (i.e. electrons treated as incompressible ‘rigid’ spheres) and one that does. The radial electronic contributions to the virials are only tallied if the flexible pressure option is set, and this will affect both global and per-atom quantities. In principle, the true pressure of a system is somewhere in between the rigid and the flexible eFF pressures, but, for most cases, the difference between these two pressures will not be significant over long-term averaged runs (i.e. even though the energy partitioning changes, the total energy remains similar).  

![](images/30dc7a87be4444a606c851c156f52e5a2070df5584de70be29f3d72c3cecae0f.jpg)  

# Note  

currently, there is no available option for the user to set or create temperature distributions that include the radial electronic degrees of freedom with the velocity command, so the the user must allow for these degrees of freedom to equilibrate (i.e. equi-partitioning of energy) through time integration.  

# 2.111.4 Restart, fix_modify, output, run start/stop, minimize info  

See the page for the fix nvt, npt, and nph commands for details.  

# 2.111.5 Restrictions  

This fix is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Other restriction discussed on the page for the fix nvt, npt, and nph commands also apply.  

# Note  

The temperature for systems (regions or groups) with only electrons and no nuclei is 0.0 (i.e. not defined) in the current temperature calculations, a practical example would be a uniform electron gas or a very hot plasma, where electrons remain delocalized from the nuclei. This is because, even though electron virials are included in the temperature calculation, these are averaged over the nuclear degrees of freedom only. In such cases a corrective term must be added to the pressure to get the correct kinetic contribution.  

# 2.111. fix nph/eff command  

# 2.111.6 Related commands  

fix nvt, fix nph, fix npt, fix_modify, run_style  

# 2.111.7 Default  

The keyword defaults are tchain $=3$ , pchain $=3$ , mtk $=$ yes, $\mathrm{tloop}=\mathrm{ploop}=1$ , nreset $=0$ , $\mathrm{drag}=0.0$ , dilate $=$ all, and couple $=$ none.  

(Martyna) Martyna, Tobias and Klein, J Chem Phys, 101, 4177 (1994).   
(Parrinello) Parrinello and Rahman, J Appl Phys, 52, 7182 (1981).   
(Tuckerman) Tuckerman, Alejandre, Lopez-Rendon, Jochim, and Martyna, J Phys A: Math Gen, 39, 5629 (2006).   
(Shinoda) Shinoda, Shiga, and Mikami, Phys Rev B, 69, 134103 (2004).  

# 2.112 fix nvt/uef command  

# 2.113 fix npt/uef command  

# 2.113.1 Syntax  

fix ID group-ID style_name erate edot_x edot_y temp Tstart Tstop Tdamp keyword value ...  

• ID, group-ID are documented in fix command   
• style_name $=$ nvt/uef or npt/uef   
• Tstart, Tstop, and Tdamp are documented in the fix npt command   
• edot $\boldsymbol{\mathscr{x}}$ and edot_y are the strain rates in the x and y directions (1/(time units))   
• one or more keyword/value pairs may be appended keyword $=$ erate or ext or strain or temp or iso or x or y or $\mathrm{_{Z}}$ or tchain or pchain or tloop or ploop␣ $\hookrightarrow\mathrm{Or}$ mtk erate values $=\mathrm{e\_xe\_y=tru}$ e strain rates (required) ext value $=\mathrm{~x~}$ or $_\mathrm{y}$ or z or xy or yz or $\mathbf{x}\mathbf{Z}=$ external dimensions sets the external dimensions used to calculate the scalar pressure strain values $=\mathrm{~e~}_{-}\mathrm{~x~e~}_{-}\mathrm{~y~}=$ initial strain usually not needed, but may be needed to resume a run with a data file. temp, iso, x, y, z, tchain, pchain, tloop, ploop, mtk keywords documented by the fix npt command  

# 2.113.2 Examples  

fix uniax_nvt all nvt/uef temp 400 400 100 erate 0.00001 -0.000005 fix biax_nvt all nvt/uef temp 400 400 100 erate 0.000005 0.000005 fix uniax_npt all npt/uef temp 400 400 300 iso 1 1 3000 erate 0.00001 -0.000005 ext yz fix biax_npt all npt/uef temp 400 400 100 erate -0.00001 0.000005 x 1 1 3000  

# 2.113.3 Description  

These fixes can be used to simulate non-equilibrium molecular dynamics (NEMD) under diagonal flow fields, including uniaxial and bi-axial flow. Simulations under continuous extensional flow may be carried out for an indefinite amount of time. It is an implementation of the boundary conditions from (Dobson), and also uses numerical lattice reduction as was proposed by (Hunt). The lattice reduction algorithm is from (Semaev). The fix is intended for simulations of homogeneous flows, and integrates the SLLOD equations of motion, originally proposed by Hoover and Ladd (see (Evans and Morriss)). Additional detail about this implementation can be found in (Nicholson and Rutledge).  

Note that NEMD simulations of a continuously strained system can be performed using the fix deform, fix nvt/sllod, and compute temp/deform commands.  

The applied flow field is set by the erate keyword. The values edot $\boldsymbol{\mathscr{x}}$ and edot $\boldsymbol{\mathcal{N}}$ correspond to the strain rates in the xx and yy directions. It is implicitly assumed that the flow field is traceless, and therefore the strain rate in the zz direction is eqal to - $(e d o t\_x+e d o t\_y)$ ).  

![](images/f9eeccbe62c67839124ce7485ece1d649c4f04300210f80c9c2b3ae653e22075.jpg)  

# Note  

Due to an instability in the SLLOD equations under extension, fix momentum should be used to regularly reset the linear momentum.  

The boundary conditions require a simulation box that does not have a consistent alignment relative to the applied flow field. Since LAMMPS utilizes an upper-triangular simulation box, it is not possible to express the evolving simulation box in the same coordinate system as the flow field. These fixes keep track of two coordinate systems: the flow frame, and the upper triangular LAMMPS frame. The coordinate systems are related to each other through the QR decomposition, as is illustrated in the image below.  

![](images/85d87038e6753984024fc93f0df9c9a6d5f914fa287a6bba5d7fa424b4ae5be5.jpg)  

During most molecular dynamics operations, the system is represented in the LAMMPS frame. Only when the positions and velocities are updated is the system rotated to the flow frame, and it is rotated back to the LAMMPS frame immediately afterwards. For this reason, all vector-valued quantities (except for the tensors from compute pressure/uef and compute temp/uef ) will be computed in the LAMMPS frame. Rotationally invariant scalar quantities like the temperature and hydrostatic pressure are frame-invariant and will be computed correctly. Additionally, the system is in the LAMMPS frame during all of the output steps, and therefore trajectory files made using the dump command will be in the LAMMPS frame unless the dump cfg/uef command is used.  

Temperature control is achieved with the default Nose-Hoover style thermostat documented in $f(x n\nu t$ . When this fix is active, only the peculiar velocity of each atom is stored, defined as the velocity relative to the streaming velocity. This is in contrast to fix nvt/sllod, which uses a lab-frame velocity, and removes the contribution from the streaming velocity in order to compute the temperature.  

Pressure control is achieved using the default Nose-Hoover barostat documented in $f i x n p t$ . There are two ways to control the pressure using this fix. The first method involves using the ext keyword along with the iso pressure style. With this method, the pressure is controlled by scaling the simulation box isotropically to achieve the average pressure only in the directions specified by ext. For example, if the ext value is set to xy, the average pressure $(\mathrm{Pxx}+\mathrm{Pyy})/2$ will be controlled.  

This example command will control the total hydrostatic pressure under uniaxial tension:  

fix f1 all npt/uef temp 0.7 0.7 0.5 iso 1 1 5 erate -0.5 -0.5 ext xyz  

This example command will control the average stress in compression directions, which would typically correspond to free surfaces under drawing with uniaxial tension:  

fix f2 all npt/uef temp 0.7 0.7 0.5 iso 1 1 5 erate -0.5 -0.5 ext xy  

The second method for pressure control involves setting the normal stresses using the $x,y,$ , and/or $z$ keywords. When using this method, the same pressure must be specified via Pstart and Pstop for all dimensions controlled. Any choice of pressure conditions that would cause LAMMPS to compute a deviatoric stress are not permissible and will result in an error. Additionally, all dimensions with controlled stress must have the same applied strain rate. The ext keyword must be set to the default value (xyz) when using this method.  

For example, the following commands will work:  

<html><body><table><tr><td>fix f3 all npt/uef temp 0.7 0.7 0.5 x 1 1 5 y 1 1 5 erate -0.5 -0.5 fix f4 all npt/uef temp 0.7 0.7 0.5 z 1 1 5 erate 0.5 0.5</td></tr></table></body></html>  

The following commands will not work:  

<html><body><table><tr><td>fix f5 all npt/uef temp 0.7 0.7 0.5 x 1 1 5 z 1 1 5 erate -0.5 -0.5</td></tr><tr><td>fix f6 all npt/uef temp 0.7 0.7 0.5 x 1 1 5 z 2 2 5 erate 0.5 0.5</td></tr><tr><td></td></tr></table></body></html>  

These fixes compute a temperature and pressure each timestep. To do this, they create their own computes of style “temp/uef” and “pressure/uef”, as if one of these two sets of commands had been issued:  

compute fix-ID_temp group-ID temp/uef compute fix-ID_press group-ID pressure/uef fix-ID_temp compute fix-ID_temp all temp/uef compute fix-ID_press all pressure/uef fix-ID_temp  

See the compute temp/uef and compute pressure/uef commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”.  

# 2.113.4 Restart, fix_modify, output, run start/stop, minimize info  

The fix writes the state of all the thermostat and barostat variables, as well as the cumulative strain applied, to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

![](images/49b1e80377e40933b0207a3575b139bde350e45ab77fe9096c9435943f63e47c.jpg)  

# Note  

It is not necessary to set the strain keyword when resuming a run from a restart file. Only for resuming from data files, which do not contain the cumulative applied strain, will this keyword be necessary.  

These fixes can be used with the fix_modify temp and press options. The temperature and pressure computes used must be of type temp/uef and pressure/uef.  

These fixes compute the same global scalar and vector quantities as fix nvt andnpt.  

These fixes are not invoked during energy minimization.  

# 2.113.5 Restrictions  

These fixes are part of the UEF package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Due to requirements of the boundary conditions, when the strain keyword is set to zero (or unset), the initial simulation box must be cubic and have style triclinic. If the box is initially of type ortho, use change_box before invoking the fix.  

# 2.113.6 Related commands  

fix nvt, fix npt, fix nvt/sllod, compute temp/uef , compute pressure/uef , dump cfg/uef  

# 2.113.7 Default  

The default keyword values specific to these fixes are $\mathrm{exy}=\mathrm{xyz}$ , strain $=00$ . The remaining defaults are the same as for fix nvt or npt except tchain $=1$ . The reason for this change is given in fix nvt/sllod.  

(Dobson) Dobson, J Chem Phys, 141, 184103 (2014).   
(Hunt) Hunt, Mol Simul, 42, 347 (2016).   
(Semaev) Semaev, Cryptography and Lattices, 181 (2001).   
(Evans and Morriss) Evans and Morriss, Phys Rev A, 30, 1528 (1984).   
(Nicholson and Rutledge) Nicholson and Rutledge, J Chem Phys, 145, 244903 (2016).  

# 2.114 fix nonaffine/displacement command  

# 2.114.1 Syntax  

fix ID group nonaffine/displacement style args reference/style nstep keyword values  

• ID, group are documented in $f\boldsymbol{{\kappa}}$ command   
• nonaffine/displacement $=$ style name of this fix command   
• nevery $=$ calculate nonaffine displacement every this many timesteps   
• style $=$ d2min or integrated d2min args $=$ cutoff args cutof $=$ type or radius or custom type args $=$ none, cutoffs determined by atom types radius args $=$ none, cutoffs determined based on atom diameters (atom style sphere)  

# 2.114. fix nonaffine/displacement command  

custom $\mathrm{args}=\mathrm{rmax}$ , cutoff set by a constant numeric value rmax (distance units) integrated args $=$ none  

• reference/style $=$ fixed or update or offset  

$\mathrm{fixed}=\mathrm{use}$ a fixed reference frame at nstep   
update $=$ update the reference frame every nstep timesteps offset $=$ update the reference frame nstep timesteps before calculating the nonaffine displacement   
• zero or more keyword/value pairs may be appended   
$\mathrm{z/min~values=zmin}$ zmin $=$ minimum coordination number to calculate D2min  

# 2.114.2 Examples  

fix 1 all nonaffine/displacement 100 integrated update 100   
fix 1 all nonaffine/displacement 1000 d2min type fixed 0   
fix 1 all nonaffine/displacement 1000 d2min custom 2.0 offset 100  

# 2.114.3 Description  

Added in version 7Feb2024.  

This fix computes different metrics of the nonaffine displacement of particles. The first metric, d2min calculates the $D_{\operatorname*{min}}^{2}$ nonaffine displacement by Falk and Langer in (Falk). For each atom, the fix computes the two tensors  

$$
X=\sum_{\mathrm{neighbors}}\vec{r}\left(\vec{r}_{0}\right)^{T}
$$  

and  

$$
Y=\sum_{\mathrm{neighbors}}\vec{r}_{0}\left(\vec{r}_{0}\right)^{T}
$$  

where the neighbors include all other atoms within the distance criterion set by the cutoff option, discussed below, $\vec{r}$ is the current displacement between particles, and $\vec{r}_{0}$ is the reference displacement. A deformation gradient tensor is then calculated as $F=X Y^{-1}$ from which  

$$
D_{\mathrm{min}}^{2}=\sum_{\mathrm{neighbors}}\left|\vec{r}-F\vec{r}_{0}\right|^{2}
$$  

and a strain tensor is calculated $E=F F^{T}-I$ where $I$ is the identity tensor. This calculation is only performed on timesteps that are a multiple of nevery (including timestep zero). Data accessed before this occurs will simply be zeroed.  

For particles with low coordination numbers, calculations of $D_{\operatorname*{min}}^{2}$ may not be accurate. An optional minimum coordination number can be defined using the z/min keyword. If any particle has fewer than the specified number of particles in the cutoff distance or in contact, the above calculations will be skipped and the corresponding peratom array entries will be zero.  

The integrated style simply integrates the velocity of particles every timestep to calculate a displacement. This style only works if used in conjunction with another fix that deforms the box and displaces atom positions such as fix deform with remap x, fix press/berendsen, or fix nh.  

Both of these methods require defining a reference state. With the fixed reference style, the user picks a specific timestep nstep at which particle positions are saved. If peratom data is accessed from this compute prior to this timestep, it will simply be zeroed. The update reference style implies the reference state will be updated every nstep timesteps. The offset reference will update the reference state nstep timesteps before a multiple of nevery timesteps.  

# 2.114.4 Restart, fix_modify, output, run start/stop, minimize info  

The reference state is saved to binary restart files.  

None of the fix_modify options are relevant to this fix.  

This fix computes a peratom array with 3 columns, which can be accessed by indices 1-3 using any command that uses per-atom values from a fix as input.  

For the integrated style, the three columns are the nonaffine displacements in the x, y, and z directions. For the d2min style, the three columns are the calculated $\sqrt{D_{\mathrm{min}}^{2}}$ , the volumetric strain, and the deviatoric strain.  

# 2.114.5 Restrictions  

This compute is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

As this fix depends on a run including specific reference timesteps, it currently does not update peratom values if used in conjunction with the rerun command since it cannot ensure the necessary reference timesteps are included.  

# 2.114.6 Related commands  

none  

# 2.114.7 Default  

(Falk) Falk and Langer PRE, 57, 7192 (1998).  

# 2.115 fix nph/asphere command  

Accelerator Variants: nph/asphere/omp  

# 2.115.1 Syntax  

fix ID group-ID nph/asphere args keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• nph/asphere $=$ style name of this fix command   
• additional barostat related keyword/value pairs from the fix nph command can be appended  

# 2.115.2 Examples  

fix 1 all nph/asphere iso 0.0 0.0 1000.0 fix 2 all nph/asphere x 5.0 5.0 1000.0 fix 2 all nph/asphere x 5.0 5.0 1000.0 drag 0.2 fix 2 water nph/asphere aniso 0.0 0.0 1000.0 dilate partial  

# 2.115. fix nph/asphere command  

# 2.115.3 Description  

Perform constant NPH integration to update position, velocity, orientation, and angular velocity each timestep for aspherical or ellipsoidal particles in the group using a Nose/Hoover pressure barostat. P is pressure; H is enthalpy. This creates a system trajectory consistent with the isenthalpic ensemble.  

This fix differs from the fix nph command, which assumes point particles and only updates their position and velocity.  

Additional parameters affecting the barostat are specified by keywords and values documented with the fix nph command. See, for example, discussion of the aniso, and dilate keywords.  

The particles in the fix group are the only ones whose velocities and positions are updated by the velocity/position update portion of the NPH integration.  

Regardless of what particles are in the fix group, a global pressure is computed for all particles. Similarly, when the size of the simulation box is changed, all particles are re-scaled to new positions, unless the keyword dilate is specified with a value of partial, in which case only the particles in the fix group are re-scaled. The latter can be useful for leaving the coordinates of particles in a solid substrate unchanged and controlling the pressure of a surrounding fluid.  

This fix computes a temperature and pressure each timestep. To do this, the fix creates its own computes of style “temp/asphere” and “pressure”, as if these commands had been issued:  

compute fix-ID_temp all temp/asphere compute fix-ID_press all pressure fix-ID_temp  

See the compute temp/asphere and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”, and the group for the new computes is “all” since pressure is computed for the entire system.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of this fix’s temperature or pressure via the compute_modify command or print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.115.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover barostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by this fix. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure. If you do this, note that the kinetic  

energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix nph command.  

This fix can ramp its target pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.115.5 Restrictions  

This fix is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular momentum and a quaternion as defined by the atom_style ellipsoid command.  

All particles in the group must be finite-size. They cannot be point particles, but they can be aspherical or spherical as defined by their shape attribute.  

# 2.115.6 Related commands  

fix nph, fix nve_asphere, fix nvt_asphere, fix npt_asphere, fix_modify  

# 2.115.7 Default  

none  

# 2.116 fix nph/body command  

# 2.116.1 Syntax  

fix ID group-ID nph/body args keyword value ...  

• ID, group-ID are documented in fix command   
• nph/body $=$ style name of this fix command   
• additional barostat related keyword/value pairs from the fix nph command can be appended  

# 2.116.2 Examples  

fix 1 all nph/body iso 0.0 0.0 1000.0 fix 2 all nph/body x 5.0 5.0 1000.0 fix 2 all nph/body x 5.0 5.0 1000.0 drag 0.2 fix 2 water nph/body aniso 0.0 0.0 1000.0 dilate partial  

# 2.116.3 Description  

Perform constant NPH integration to update position, velocity, orientation, and angular velocity each timestep for body particles in the group using a Nose/Hoover pressure barostat. P is pressure; H is enthalpy. This creates a system trajectory consistent with the isenthalpic ensemble.  

This fix differs from the fix nph command, which assumes point particles and only updates their position and velocity.  

# 2.116. fix nph/body command  

Additional parameters affecting the barostat are specified by keywords and values documented with the fix nph command. See, for example, discussion of the aniso, and dilate keywords.  

The particles in the fix group are the only ones whose velocities and positions are updated by the velocity/position update portion of the NPH integration.  

Regardless of what particles are in the fix group, a global pressure is computed for all particles. Similarly, when the size of the simulation box is changed, all particles are re-scaled to new positions, unless the keyword dilate is specified with a value of partial, in which case only the particles in the fix group are re-scaled. The latter can be useful for leaving the coordinates of particles in a solid substrate unchanged and controlling the pressure of a surrounding fluid.  

This fix computes a temperature and pressure each timestep. To do this, the fix creates its own computes of style “temp/body” and “pressure”, as if these commands had been issued:  

compute fix-ID_temp all temp/body compute fix-ID_press all pressure fix-ID_temp  

See the compute temp/body and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”, and the group for the new computes is “all” since pressure is computed for the entire system.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of this fix’s temperature or pressure via the compute_modify command or print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

# 2.116.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover barostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by this fix. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix nph command.  

This fix can ramp its target pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.116.5 Restrictions  

This fix is part of the BODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular momentum and a quaternion as defined by the atom_style body command.  

# 2.116.6 Related commands  

fix nph, fix nve_body, fix nvt_body, fix npt_body, fix_modify  

# 2.116.7 Default  

none  

# 2.117 fix nph/sphere command  

Accelerator Variants: nph/sphere/omp  

# 2.117.1 Syntax  

fix ID group-ID nph/sphere args keyword value ...  

• ID, group-ID are documented in fix command   
• nph/sphere $=$ style name of this fix command   
• keyword $=$ disc disc value $=$ none $=$ treat particles as 2d discs, not spheres   
• additional barostat related keyword/value pairs from the fix nph command can be appended  

# 2.117.2 Examples  

fix 1 all nph/sphere iso 0.0 0.0 1000.0 fix 2 all nph/sphere x 5.0 5.0 1000.0 fix 2 all nph/sphere x 5.0 5.0 1000.0 disc fix 2 all nph/sphere x 5.0 5.0 1000.0 drag 0.2 fix 2 water nph/sphere aniso 0.0 0.0 1000.0 dilate partial  

# 2.117.3 Description  

Perform constant NPH integration to update position, velocity, and angular velocity each timestep for finite-size spherical particles in the group using a Nose/Hoover pressure barostat. P is pressure; H is enthalpy. This creates a system trajectory consistent with the isenthalpic ensemble.  

This fix differs from the fix nph command, which assumes point particles and only updates their position and velocity.  

If the disc keyword is used, then each particle is treated as a 2d disc (circle) instead of as a sphere. This is only possible for 2d simulations, as defined by the dimension keyword. The only difference between discs and spheres in this context is their moment of inertia, as used in the time integration.  

Additional parameters affecting the barostat are specified by keywords and values documented with the fix nph command. See, for example, discussion of the aniso, and dilate keywords.  

The particles in the fix group are the only ones whose velocities and positions are updated by the velocity/position update portion of the NPH integration.  

Regardless of what particles are in the fix group, a global pressure is computed for all particles. Similarly, when the size of the simulation box is changed, all particles are re-scaled to new positions, unless the keyword dilate is specified with a value of partial, in which case only the particles in the fix group are re-scaled. The latter can be useful for leaving the coordinates of particles in a solid substrate unchanged and controlling the pressure of a surrounding fluid.  

This fix computes a temperature and pressure each timestep. To do this, the fix creates its own computes of style “temp/sphere” and “pressure”, as if these commands had been issued:  

<html><body><table><tr><td>compute fix-ID temp all temp/sphere compute fix-ID _press all fix-ID temp</td></tr></table></body></html>  

See the compute temp/sphere and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”, and the group for the new computes is “all” since pressure is computed for the entire system.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of this fix’s temperature or pressure via the compute_modify command or print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.117.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover barostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by this fix. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix nph command.  

This fix can ramp its target pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.117.5 Restrictions  

This fix requires that atoms store torque and angular velocity (omega) and a radius as defined by the atom_style sphere command.  

All particles in the group must be finite-size spheres. They cannot be point particles.  

Use of the disc keyword is only allowed for 2d simulations, as defined by the dimension keyword.  

# 2.117.6 Related commands  

fix nph, fix nve_sphere, fix nvt_sphere, fix npt_sphere, fix_modify  

# 2.117.7 Default  

none  

# 2.118 fix nphug command  

Accelerator Variants: nphug/omp  

# 2.118.1 Syntax  

• ID, group-ID are documented in fix command  

one or more keyword value pairs may be appended   
keyword $=$ temp or iso or aniso or tri or x or y or z or couple or tchain or pchain or mtk or tloop or␣   
$\hookrightarrow$ ploop or nreset or drag or dilate or scaleyz or scalexz or scalexy temp values $=$ Value1 Value2 Tdamp  

Value1, Value2 = Nose-Hoover target temperatures, ignored by Hugoniostat  

Tdamp $=$ temperature damping parameter (time unit iso or aniso or tri values $=$ Pstart Pstop Pdamp  

Pstart,Pstop = scalar external pressures, must be equal (pressure units) Pdamp = pressure damping parameter (time units) x or y or $\mathrm{_{Z}}$ or xy or yz or xz values $-$ Pstart Pstop Pdamp  

Pstart,Pstop = external stress tensor components, must be equal (pressure units)  

Pdamp = stress damping parameter (time units) couple = none or xyz or xy or yz or xz tchain value = length of thermostat chain (1 = single thermostat) pchain values = length of thermostat chain on barostat ( $0=\mathrm{no}$ thermostat) mtk value = yes or no = add in MTK adjustment term or not tloop value $-$ number of sub-cycles to perform on thermostat ploop value = number of sub-cycles to perform on barostat thermostat nreset value = reset reference cell every this many timesteps drag value = drag factor added to barostat/thermostat (0.0 = no drag) dilate value = all or partial scaleyz value = yes or no = scale yz with lz scalexz value = yes or no $=$ scale xz with lz scalexy value = yes or no $=$ scale xy with ly  

# 2.118.2 Examples  

fix myhug all nphug temp 1.0 1.0 10.0 z 40.0 40.0 70.0   
fix myhug all nphug temp 1.0 1.0 10.0 iso 40.0 40.0 70.0 drag 200.0 tchain 1 pchain 0  

# 2.118.3 Description  

This command is a variant of the Nose-Hoover fix npt fix style. It performs time integration of the Hugoniostat equations of motion developed by Ravelo et al. (Ravelo). These equations compress the system to a state with average axial stress or pressure equal to the specified target value and that satisfies the Rankine-Hugoniot (RH) jump conditions for steady shocks.  

# 2.118. fix nphug command  

The compression can be performed either hydrostatically (using keyword iso, aniso, or tri) or uniaxially (using keywords $x,y$ , or z). In the hydrostatic case, the cell dimensions change dynamically so that the average axial stress in all three directions converges towards the specified target value. In the uniaxial case, the chosen cell dimension changes dynamically so that the average axial stress in that direction converges towards the target value. The other two cell dimensions are kept fixed (zero lateral strain).  

This leads to the following additional restrictions on the keywords:  

• One and only one of the following keywords should be used: iso, aniso, tri, x, y, z   
• The specified initial and final target pressures must be the same.   
• The keywords xy, xz, yz may not be used.   
• The only admissible value for the couple keyword is xyz, which has the same effect as keyword iso • The temp keyword must be used to specify the time constant for kinetic energy relaxation, but initial and fi target temperature values are ignored.  

Essentially, a Hugoniostat simulation is an NPT simulation in which the user-specified target temperature is replaced with a time-dependent target temperature Tt obtained from the following equation:  

$$
T_{t}-T=\frac{\left(\frac{1}{2}\left(P+P_{0}\right)(V_{0}-V)+E_{0}-E\right)}{N_{d o f}k_{B}}=\Delta
$$  

where $T$ and $T_{t}$ are the instantaneous and target temperatures, $P$ and $P_{0}$ are the instantaneous and reference pressures or axial stresses, depending on whether hydrostatic or uniaxial compression is being performed, $V$ and $V_{0}$ are the instantaneous and reference volumes, $E$ and $E_{0}$ are the instantaneous and reference internal energy (potential plus kinetic), $N_{d o f}$ is the number of degrees of freedom used in the definition of temperature, and $k_{B}$ is the Boltzmann constant. $\Delta$ is the negative deviation of the instantaneous temperature from the target temperature. When the system reaches a stable equilibrium, the value of $\Delta$ should fluctuate about zero.  

The values of $E_{0},V_{0}$ , and $P_{0}$ are the instantaneous values at the start of the simulation. These can be overridden using the fix_modify keywords $e0,\nu O$ , and $p O$ described below.  

# Note  

Unlike the fix temp/berendsen command which performs thermostatting but NO time integration, this fix performs thermostatting/barostatting AND time integration. Thus you should not use any other time integration fix, such as fix nve on atoms to which this fix is applied. Likewise, this fix should not be used on atoms that have their temperature controlled by another fix - e.g. by fix langevin or fix temp/rescale commands.  

This fix computes a temperature and pressure at each timestep. To do this, the fix creates its own computes of style “temp” and “pressure”, as if one of these two sets of commands had been issued:  

compute fix-ID_temp group-ID temp compute fix-ID_press group-ID pressure fix-ID_temp compute fix-ID_temp all temp compute fix-ID_press all pressure fix-ID_temp  

See the compute temp and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”. The group for the new computes is “all” since pressure is computed for the entire system.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of this fix’s temperature or pressure via the compute_modify command or print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.118.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the values of $E_{0}$ , $V_{0}$ , and $P_{0}$ , as well as the state of all the thermostat and barostat variables to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify $e O$ , $\nu O$ and $p O$ keywords can be used to define the values of $E_{0},V_{0}$ , and $P_{0}$ . Note the the values for $e0$ and $\nu O$ are extensive, and so must correspond to the total energy and volume of the entire system, not energy and volume per atom. If any of these quantities are not specified, then the instantaneous value in the system at the start of the simulation is used.  

The fix_modify temp and press options are supported by this fix. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure, as described above. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details. Note that this energy is \*not\* included in the definition of internal energy E when calculating the value of Delta in the above equation.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

This fix also computes a global vector of quantities, which can be accessed by various output commands. The scala The vector values are “intensive”.  

The vector stores three quantities unique to this fix (∆, Us, and up), followed by all the internal Nose/Hoover thermostat and barostat variables defined for fix npt. Delta is the deviation of the temperature from the target temperature, given by the above equation. Us and up are the shock and particle velocity corresponding to a steady shock calculated from the RH conditions. They have units of distance/time.  

# 2.118.5 Restrictions  

This fix style is part of the SHOCK package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

All the usual restrictions for fix npt apply, plus the additional ones mentioned above.  

# 2.118. fix nphug command  

# 2.118.6 Related commands  

fix msst, fix npt, fix_modify  

# 2.118.7 Default  

The keyword defaults are the same as those for fix npt  

(Ravelo) Ravelo, Holian, Germann and Lomdahl, Phys Rev B, 70, 014103 (2004).  

# 2.119 fix npt/asphere command  

Accelerator Variants: npt/asphere/omp  

# 2.119.1 Syntax  

fix ID group-ID npt/asphere keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• npt/asphere $=$ style name of this fix command   
• additional thermostat and barostat related keyword/value pairs from the fix npt command can be appended  

# 2.119.2 Examples  

fix 1 all npt/asphere temp 300.0 300.0 100.0 iso 0.0 0.0 1000.0 fix 2 all npt/asphere temp 300.0 300.0 100.0 x 5.0 5.0 1000.0 fix 2 all npt/asphere temp 300.0 300.0 100.0 x 5.0 5.0 1000.0 drag 0.2 fix 2 water npt/asphere temp 300.0 300.0 100.0 aniso 0.0 0.0 1000.0 dilate partial  

# 2.119.3 Description  

Perform constant NPT integration to update position, velocity, orientation, and angular velocity each timestep for aspherical or ellipsoidal particles in the group using a Nose/Hoover temperature thermostat and Nose/Hoover pressure barostat. P is pressure; T is temperature. This creates a system trajectory consistent with the isothermal-isobaric ensemble.  

This fix differs from the fix npt command, which assumes point particles and only updates their position and velocity.  

The thermostat is applied to both the translational and rotational degrees of freedom for the aspherical particles, assuming a compute is used which calculates a temperature that includes the rotational degrees of freedom (see below). The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

Additional parameters affecting the thermostat and barostat are specified by keywords and values documented with the fix npt command. See, for example, discussion of the temp, iso, aniso, and dilate keywords.  

The particles in the fix group are the only ones whose velocities and positions are updated by the velocity/position update portion of the NPT integration.  

Regardless of what particles are in the fix group, a global pressure is computed for all particles. Similarly, when the size of the simulation box is changed, all particles are re-scaled to new positions, unless the keyword dilate is specified with a value of partial, in which case only the particles in the fix group are re-scaled. The latter can be useful for leaving the coordinates of particles in a solid substrate unchanged and controlling the pressure of a surrounding fluid.  

This fix computes a temperature and pressure each timestep. To do this, the fix creates its own computes of style “temp/asphere” and “pressure”, as if these commands had been issued:  

compute fix-ID_temp all temp/asphere compute fix-ID_press all pressure fix-ID_temp  

See the compute temp/asphere and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”, and the group for the new computes is “all” since pressure is computed for the entire system.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of this fix’s temperature or pressure via the compute_modify command or print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the $\mathbf{X}$ -component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.119.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover thermostat and barostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by this fix. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix npt command.  

This fix can ramp its target temperature and pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

# 2.119. fix npt/asphere command  

This fix is not invoked during energy minimization.  

# 2.119.5 Restrictions  

This fix is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular momentum and a quaternion as defined by the atom_style ellipsoid command.  

All particles in the group must be finite-size. They cannot be point particles, but they can be aspherical or spherical as defined by their shape attribute.  

# 2.119.6 Related commands  

fix npt, fix nve_asphere, fix nvt_asphere, fix_modify  

# 2.119.7 Default  

none  

# 2.120 fix npt/body command  

# 2.120.1 Syntax  

fix ID group-ID npt/body keyword value ...  

• ID, group-ID are documented in fix command   
• npt/body $=$ style name of this fix command   
• additional thermostat and barostat related keyword/value pairs from the fix npt command can be appended  

# 2.120.2 Examples  

fix 1 all npt/body temp 300.0 300.0 100.0 iso 0.0 0.0 1000.0 fix 2 all npt/body temp 300.0 300.0 100.0 x 5.0 5.0 1000.0 fix 2 all npt/body temp 300.0 300.0 100.0 x 5.0 5.0 1000.0 drag 0.2 fix 2 water npt/body temp 300.0 300.0 100.0 aniso 0.0 0.0 1000.0 dilate partial  

# 2.120.3 Description  

Perform constant NPT integration to update position, velocity, orientation, and angular velocity each timestep for body particles in the group using a Nose/Hoover temperature thermostat and Nose/Hoover pressure barostat. P is pressure; T is temperature. This creates a system trajectory consistent with the isothermal-isobaric ensemble.  

This fix differs from the fix npt command, which assumes point particles and only updates their position and velocity.  

The thermostat is applied to both the translational and rotational degrees of freedom for the body particles, assuming a compute is used which calculates a temperature that includes the rotational degrees of freedom (see below). The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

Additional parameters affecting the thermostat and barostat are specified by keywords and values documented with the fix npt command. See, for example, discussion of the temp, iso, aniso, and dilate keywords.  

The particles in the fix group are the only ones whose velocities and positions are updated by the velocity/position update portion of the NPT integration.  

Regardless of what particles are in the fix group, a global pressure is computed for all particles. Similarly, when the size of the simulation box is changed, all particles are re-scaled to new positions, unless the keyword dilate is specified with a value of partial, in which case only the particles in the fix group are re-scaled. The latter can be useful for leaving the coordinates of particles in a solid substrate unchanged and controlling the pressure of a surrounding fluid.  

This fix computes a temperature and pressure each timestep. To do this, the fix creates its own computes of style “temp/body” and “pressure”, as if these commands had been issued:  

compute fix-ID_temp all temp/body compute fix-ID_press all pressure fix-ID_temp  

See the compute temp/body and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”, and the group for the new computes is “all” since pressure is computed for the entire system.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of this fix’s temperature or pressure via the compute_modify command or print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the $\mathbf{X}$ -component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

# 2.120.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover thermostat and barostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by this fix. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix npt command.  

This fix can ramp its target temperature and pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.120.5 Restrictions  

This fix is part of the BODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular momentum and a quaternion as defined by the atom_style body command.  

# 2.120.6 Related commands  

fix npt, fix nve_body, fix nvt_body, fix_modify  

# 2.120.7 Default  

none  

# 2.121 fix npt/cauchy command  

# 2.121.1 Syntax  

fix ID group-ID style_name keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• style_name $=$ npt/cauchy   
• one or more keyword/value pairs may be appended   
• keyword $=$ temp or iso or aniso or $t r i$ or $x$ or $y$ or $z$ or $x y$ or yz or xz or couple or tchain or pchain or mtk or tloop or ploop or nreset or drag or dilate or scalexy or scaleyz or scalexz or flip or alpha or continue or fixedpoint   
temp values $=$ Tstart Tstop Tdamp   
Tstart,Tstop $=$ external temperature at start/end of run Tdamp $=$ temperature damping parameter (time units)   
iso or aniso or tri values $=$ Pstart Pstop Pdamp Pstart,Pstop $=$ scalar external pressure at start/end of run (pressure units)   
Pdamp $=$ pressure damping parameter (time units)   
x or y or z or xy or yz or xz values = Pstart Pstop Pdamp   
Pstart,Pstop = external stress tensor component at start/end of run (pressure units)   
Pdamp $-$ stress damping parameter (time units)   
couple = none or xyz or xy or yz or xz   
tchain value = N   
N = length of thermostat chain (1 = single thermostat)   
pchain values = N N length of thermostat chain on barostat ( $0=\mathrm{no}$ thermostat)   
mtk value = yes or no = add in MTK adjustment term or not   
tloop value = M M = number of sub-cycles to perform on thermostat   
ploop value = M   
M = number of sub-cycles to perform on barostat thermostat   
nreset value $-$ reset reference cell every this many timesteps   
drag value = Df   
Df = drag factor added to barostat/thermostat ( $0.0=\mathrm{no}$ drag)   
dilate value $=$ dilate-group-ID dilate-group-ID = only dilate atoms in this group due to barostat volume changes   
scalexy value = yes or no $-$ scale xy with ly   
scaleyz value = yes or no = scale yz with lz   
scalexz value = yes or no = scale xz with lz   
flip value $=$ yes or no $=$ allow or disallow box flips when it becomes highly skewed   
alpha value $=$ strength of Cauchy stress control parameter   
continue value $=$ yes or no $=$ whether of not to continue from a previous run   
fixedpoint values $=\mathrm{~x~}$ y z  

$\mathbf{x},\mathbf{y},\mathbf{z}=$ perform barostat dilation/contraction around this point (distance units)  

# 2.121.2 Examples  

fix 1 water npt/cauchy temp 300.0 300.0 100.0 iso 0.0 0.0 1000.0 alpha 0.001  

# 2.121.3 Description  

This command performs time integration on Nose-Hoover style non-Hamiltonian equations of motion which are designed to generate positions and velocities sampled from the isothermal-isobaric (npt) ensembles. This updates the position and velocity for atoms in the group each timestep and the box dimensions.  

The thermostatting and barostatting is achieved by adding some dynamic variables which are coupled to the particle velocities (thermostatting) and simulation domain dimensions (barostatting). In addition to basic thermostatting and barostatting, this fix can also create a chain of thermostats coupled to the particle thermostat, and another chain of thermostats coupled to the barostat variables. The barostat can be coupled to the overall box volume, or to individual dimensions, including the xy, $x z$ and yz tilt dimensions. The external pressure of the barostat can be specified as either a scalar pressure (isobaric ensemble) or as components of a symmetric stress tensor (constant stress ensemble). When used correctly, the time-averaged temperature and stress tensor of the particles will match the target values specified by Tstart/Tstop and Pstart/Pstop.  

The equations of motion used are those of Shinoda et al in (Shinoda), which combine the hydrostatic equations of Martyna, Tobias and Klein in (Martyna) with the strain energy proposed by Parrinello and Rahman in (Parrinello). The time integration schemes closely follow the time-reversible measure-preserving Verlet and rRESPA integrators derived by Tuckerman et al in (Tuckerman).  

The thermostat parameters are specified using the temp keyword. Other thermostat-related keywords are tchain, tloop and drag, which are discussed below.  

The thermostat is applied to only the translational degrees of freedom for the particles. The translational degrees of freedom can also have a bias velocity removed before thermostatting takes place; see the description below. The desired temperature at each timestep is a ramped value during the run from Tstart to Tstop. The Tdamp parameter is specified in time units and determines how rapidly the temperature is relaxed. For example, a value of 10.0 means to relax the temperature in a timespan of (roughly) 10 time units (e.g. τ or fs or ps - see the units command). The atoms in the fix group are the only ones whose velocities and positions are updated by the velocity/position update portion of the integration.  

![](images/96f64ddb71fa1dfd630de809af7993b11266cf2df792f8d0bae2757a0cf47c79.jpg)  

# Note  

A Nose-Hoover thermostat will not work well for arbitrary values of Tdamp. If Tdamp is too small, the temperature can fluctuate wildly; if it is too large, the temperature will take a very long time to equilibrate. A good choice for many models is a Tdamp of around 100 timesteps. Note that this is NOT the same as 100 time units for most units settings.  

The barostat parameters are specified using one or more of the iso, aniso, tri, x, y, z, xy, xz, yz, and couple keywords. These keywords give you the ability to specify all 6 components of an external stress tensor, and to couple various  

# 2.121. fix npt/cauchy command  

of these components together so that the dimensions they represent are varied together during a constant-pressure simulation.  

Other barostat-related keywords are pchain, mtk, ploop, nreset, drag, and dilate, which are discussed below.  

Orthogonal simulation boxes have 3 adjustable dimensions (x,y,z). Triclinic (non-orthogonal) simulation boxes have 6 adjustable dimensions (x,y,z,xy,xz,yz). The create_box, read data, and read_restart commands specify whether the simulation box is orthogonal or non-orthogonal (triclinic) and explain the meaning of the xy,xz,yz tilt factors.  

The target pressures for each of the 6 components of the stress tensor can be specified independently via the x, y, z, xy, xz, yz keywords, which correspond to the 6 simulation box dimensions. For each component, the external pressure or tensor component at each timestep is a ramped value during the run from Pstart to Pstop. If a target pressure is specified for a component, then the corresponding box dimension will change during a simulation. For example, if the $y$ keyword is used, the y-box length will change. If the xy keyword is used, the xy tilt factor will change. A box dimension will not change if that component is not specified, although you have the option to change that dimension via the fix deform command.  

Note that in order to use the xy, xz, or yz keywords, the simulation box must be triclinic, even if its initial tilt factors are 0.0.  

For all barostat keywords, the Pdamp parameter operates like the Tdamp parameter, determining the time scale on which pressure is relaxed. For example, a value of 10.0 means to relax the pressure in a timespan of (roughly) 10 time units (e.g. τ or fs or ps - see the units command).  

![](images/aabc79bc29b2fd153938a0df6c7f415ee86951fef1a0ebcdeb6173d1f16ba5fd.jpg)  

# Note  

A Nose-Hoover barostat will not work well for arbitrary values of Pdamp. If Pdamp is too small, the pressure and volume can fluctuate wildly; if it is too large, the pressure will take a very long time to equilibrate. A good choice for many models is a Pdamp of around 1000 timesteps. However, note that Pdamp is specified in time units, and that timesteps are NOT the same as time units for most units settings.  

Regardless of what atoms are in the fix group (the only atoms which are time integrated), a global pressure or stress tensor is computed for all atoms. Similarly, when the size of the simulation box is changed, all atoms are re-scaled to new positions, unless the keyword dilate is specified with a dilate-group- $I D$ for a group that represents a subset of the atoms. This can be useful, for example, to leave the coordinates of atoms in a solid substrate unchanged and controlling the pressure of a surrounding fluid. This option should be used with care, since it can be unphysical to dilate some atoms and not others, because it can introduce large, instantaneous displacements between a pair of atoms (one dilated, one not) that are far from the dilation origin. Also note that for atoms not in the fix group, a separate time integration fix like fix nve or fix nvt can be used on them, independent of whether they are dilated or not.  

The couple keyword allows two or three of the diagonal components of the pressure tensor to be “coupled” together. The value specified with the keyword determines which are coupled. For example, $x z$ means the $P x x$ and $P z z$ components of the stress tensor are coupled. Xyz means all 3 diagonal components are coupled. Coupling means two things: the instantaneous stress will be computed as an average of the corresponding diagonal components, and the coupled box dimensions will be changed together in lockstep, meaning coupled dimensions will be dilated or contracted by the same percentage every timestep. The Pstart, Pstop, Pdamp parameters for any coupled dimensions must be identical. Couple xyz can be used for a 2d simulation; the z dimension is simply ignored.  

The iso, aniso, and tri keywords are simply shortcuts that are equivalent to specifying several other keywords together.  

The keyword iso means couple all 3 diagonal components together when pressure is computed (hydrostatic pressure), and dilate/contract the dimensions together. Using “iso Pstart Pstop Pdamp” is the same as specifying these 4 keywords:  

<html><body><table><tr><td>x Pstart Pstop Pdamp</td></tr><tr><td>Pstart Pstop Pdamp</td></tr><tr><td></td></tr><tr><td>z Pstart Pstop Pdamp couple xyz</td></tr></table></body></html>  

The keyword aniso means x, y, and $z$ dimensions are controlled independently using the $P x x,P y y$ , and $P z z$ components of the stress tensor as the driving forces, and the specified scalar external pressure. Using “aniso Pstart Pstop Pdamp” is the same as specifying these 4 keywords:  

x Pstart Pstop Pdamp y Pstart Pstop Pdamp z Pstart Pstop Pdamp couple none  

The keyword tri means $x,y,z,x y,x z$ , and yz dimensions are controlled independently using their individual stress components as the driving forces, and the specified scalar pressure as the external normal stress. Using “tri Pstart Pstop Pdamp” is the same as specifying these 7 keywords:  

x Pstart Pstop Pdamp y Pstart Pstop Pdamp z Pstart Pstop Pdamp xy 0.0 0.0 Pdamp yz 0.0 0.0 Pdamp xz 0.0 0.0 Pdamp couple none  

In some cases (e.g. for solids) the pressure (volume) and/or temperature of the system can oscillate undesirably when a Nose/Hoover barostat and thermostat is applied. The optional drag keyword will damp these oscillations, although it alters the Nose/Hoover equations. A value of 0.0 (no drag) leaves the Nose/Hoover formalism unchanged. A nonzero value adds a drag term; the larger the value specified, the greater the damping effect. Performing a short run and monitoring the pressure and temperature is the best way to determine if the drag term is working. Typically a value between 0.2 to 2.0 is sufficient to damp oscillations after a few periods. Note that use of the drag keyword will interfere with energy conservation and will also change the distribution of positions and velocities so that they do not correspond to the nominal NVT, NPT, or NPH ensembles.  

An alternative way to control initial oscillations is to use chain thermostats. The keyword tchain determines the number of thermostats in the particle thermostat. A value of 1 corresponds to the original Nose-Hoover thermostat. The keyword pchain specifies the number of thermostats in the chain thermostatting the barostat degrees of freedom. A value of 0 corresponds to no thermostatting of the barostat variables.  

The mtk keyword controls whether or not the correction terms due to Martyna, Tuckerman, and Klein are included in the equations of motion (Martyna). Specifying no reproduces the original Hoover barostat, whose volume probability distribution function differs from the true NPT and NPH ensembles by a factor of 1/V. Hence using yes is more correct, but in many cases the difference is negligible.  

The keyword tloop can be used to improve the accuracy of integration scheme at little extra cost. The initial and final updates of the thermostat variables are broken up into tloop sub-steps, each of length dt/tloop. This corresponds to using a first-order Suzuki-Yoshida scheme (Tuckerman). The keyword ploop does the same thing for the barostat thermostat.  

The keyword nreset controls how often the reference dimensions used to define the strain energy are reset. If this keyword is not used, or is given a value of zero, then the reference dimensions are set to those of the initial simulation domain and are never changed. If the simulation domain changes significantly during the simulation, then the final average pressure tensor will differ significantly from the specified values of the external stress tensor. A value of nstep means that every nstep timesteps, the reference dimensions are set to those of the current simulation domain.  

The scaleyz, scalexz, and scalexy keywords control whether or not the corresponding tilt factors are scaled with the associated box dimensions when barostatting triclinic periodic cells. The default values yes will turn on scaling, which corresponds to adjusting the linear dimensions of the cell while preserving its shape. Choosing no ensures that the tilt factors are not scaled with the box dimensions. See below for restrictions and default values in different situations. In older versions of LAMMPS, scaling of tilt factors was not performed. The old behavior can be recovered by setting all three scale keywords to no.  

The flip keyword allows the tilt factors for a triclinic box to exceed half the distance of the parallel box length, as discussed below. If the flip value is set to yes, the bound is enforced by flipping the box when it is exceeded. If the flip value is set to $n o$ , the tilt will continue to change without flipping. Note that if applied stress induces large deformations (e.g. in a liquid), this means the box shape can tilt dramatically and LAMMPS will run less efficiently, due to the large volume of communication needed to acquire ghost atoms around a processor’s irregular-shaped subdomain. For extreme values of tilt, LAMMPS may also lose atoms and generate an error.  

The fixedpoint keyword specifies the fixed point for barostat volume changes. By default, it is the center of the box. Whatever point is chosen will not move during the simulation. For example, if the lower periodic boundaries pass through (0,0,0), and this point is provided to fixedpoint, then the lower periodic boundaries will remain at (0,0,0), while the upper periodic boundaries will move twice as far. In all cases, the particle trajectories are unaffected by the chosen value, except for a time-dependent constant translation of positions.  

![](images/7acfadad0c4afadfe4d9d65698fa34b6fabd907319e7b8852732b16f67b63b00.jpg)  

# Note  

Using a barostat coupled to tilt dimensions xy, xz, yz can sometimes result in arbitrarily large values of the tilt dimensions, i.e. a dramatically deformed simulation box. LAMMPS allows the tilt factors to grow a small amount beyond the normal limit of half the box length (0.6 times the box length), and then performs a box “flip” to an equivalent periodic cell. See the discussion of the flip keyword above, to allow this bound to be exceeded, if desired.  

The flip operation is described in more detail in the page for fix deform. Both the barostat dynamics and the atom trajectories are unaffected by this operation. However, if a tilt factor is incremented by a large amount (1.5 times the box length) on a single timestep, LAMMPS can not accommodate this event and will terminate the simulation with an error. This error typically indicates that there is something badly wrong with how the simulation was constructed, such as specifying values of Pstart that are too far from the current stress value, or specifying a timestep that is too large. Triclinic barostatting should be used with care. This also is true for other barostat styles, although they tend to be more forgiving of insults. In particular, it is important to recognize that equilibrium liquids can not support a shear stress and that equilibrium solids can not support shear stresses that exceed the yield stress.  

One exception to this rule is if the first dimension in the tilt factor (x for xy) is non-periodic. In that case, the limits on the tilt factor are not enforced, since flipping the box in that dimension does not change the atom positions due to non-periodicity. In this mode, if you tilt the system to extreme angles, the simulation will simply become inefficient due to the highly skewed simulation box.  

![](images/7c4588b5a5bd4ad25f5c851db943ff54ddf55448e7c6b4e73728214e031f8294.jpg)  

# Note  

Unlike the fix temp/berendsen command which performs thermostatting but NO time integration, this fix performs thermostatting/barostatting AND time integration. Thus you should not use any other time integration fix, such as fix nve on atoms to which this fix is applied. Likewise, fix npt/cauchy should not normally be used on atoms that also have their temperature controlled by another fix - e.g. by fix langevin or fix temp/rescale commands.  

See the Howto thermostat and Howto barostat doc pages for a discussion of different ways to compute temperature and perform thermostatting and barostatting.  

This fix compute a temperature and pressure each timestep. To do this, the fix creates its own computes of style “temp” and “pressure”, as if one of these sets of commands had been issued:  

<html><body><table><tr><td>compute fix-ID temp all 1temp</td></tr><tr><td>compute fix-ID_press all pressure fix-ID temp</td></tr><tr><td></td></tr></table></body></html>  

The group for both the new temperature and pressure compute is “all” since pressure is computed for the entire system. See the compute temp and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of these fix’s temperature or pressure via the compute_modify command. Or you can print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the $\mathbf{X}$ -component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

This fix can be used with either the verlet or respa integrators. When using this fix with respa, LAMMPS uses an integrator constructed according to the following factorization of the Liouville propagator (for two rRESPA levels):  

$$
\begin{array}{r l}&{\exp\left(\mathrm{i}L\Delta t\right)=\hat{E}\exp\left(\mathrm{i}L_{\mathrm{T}}.\mathrm{baro}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{T}}.\mathrm{par}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{e},2}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{2}^{(2)}\frac{\Delta t}{2}\right)}\ &{\qquad\times\left[\exp\left(\mathrm{i}L_{2}^{(1)}\frac{\Delta t}{2n}\right)\exp\left(\mathrm{i}L_{\mathrm{e},1}\frac{\Delta t}{2n}\right)\exp\left(\mathrm{i}L_{1}\frac{\Delta t}{n}\right)\exp\left(\mathrm{i}L_{\mathrm{e},1}\frac{\Delta t}{2n}\right)\exp\left(\mathrm{i}L_{2}^{(1)}\frac{\Delta t}{2n}\right)\right]^{n}}\ &{\qquad\times\exp\left(\mathrm{i}L_{2}^{(2)}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{e},2}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{T}}.\mathrm{par}\frac{\Delta t}{2}\right)\exp\left(\mathrm{i}L_{\mathrm{T}\cdot\mathrm{baro}}\frac{\Delta t}{2}\right)}\ &{\qquad+\mathcal{O}\left(\Delta t^{3}\right)}\end{array}
$$  

This factorization differs somewhat from that of Tuckerman et al, in that the barostat is only updated at the outermost rRESPA level, whereas Tuckerman’s factorization requires splitting the pressure into pieces corresponding to the forces computed at each rRESPA level. In theory, the latter method will exhibit better numerical stability. In practice, because Pdamp is normally chosen to be a large multiple of the outermost rRESPA timestep, the barostat dynamics are not the limiting factor for numerical stability. Both factorizations are time-reversible and can be shown to preserve the phase space measure of the underlying non-Hamiltonian equations of motion.  

# Note  

Under NPT dynamics, for a system with zero initial total linear momentum, the total momentum fluctuates close to zero. It may occasionally undergo brief excursions to non-negligible values, before returning close to zero. Over long simulations, this has the effect of causing the center-of-mass to undergo a slow random walk. This can be mitigated by resetting the momentum at infrequent intervals using the fix momentum command.  

# 2.121.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of all the thermostat and barostat variables to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by this fix. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure, as described above. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

![](images/520f828f22af1998f5eb84a32acc2c7bc02a0eb6c3e965dd81faff050a8e0ec0.jpg)  

# Note  

If both the temp and press keywords are used in a single thermo_modify command (or in two separate commands), then the order in which the keywords are specified is important. Note that a pressure compute defines its own temperature compute as an argument when it is specified. The temp keyword will override this (for the pressure compute being used by fix npt), but only if the temp keyword comes after the press keyword. If the temp keyword comes before the press keyword, then the new pressure compute specified by the press keyword will be unaffected by the temp setting.  

The cumulative energy change in the system imposed by this fix, due to thermostatting and/or barostatting, is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style page for details.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

This fix also computes a global vector of quantities, which can be accessed by various output commands. Rhe vecto values are “intensive”.  

The vector stores internal Nose/Hoover thermostat and barostat variables. The number and meaning of the vector values depends on which fix is used and the settings for keywords tchain and pchain, which specify the number of Nose/Hoover chains for the thermostat and barostat. If no thermostatting is done, then tchain is 0. If no barostatting is done, then pchain is 0. In the following list, “ndof” is 0, 1, 3, or 6, and is the number of degrees of freedom in the barostat. Its value is 0 if no barostat is used, else its value is 6 if any off-diagonal stress tensor component is barostatted, else its value is 1 if couple xyz is used or couple xy for a 2d simulation, otherwise its value is 3.  

The order of values in the global vector and their meaning is as follows. The notation means there are tchain values for eta, followed by tchain for eta_dot, followed by ndof for omega, etc:  

• eta[tchain] $=$ particle thermostat displacements (unitless)   
• eta_dot[tchain] $=$ particle thermostat velocities (1/time units)   
• omega[ndof] $=$ barostat displacements (unitless)   
• omega_dot[ndof] $=$ barostat velocities (1/time units)   
• etap[pchain] $=$ barostat thermostat displacements (unitless)   
• etap_dot[pchain] $=$ barostat thermostat velocities (1/time units)   
• PE_eta[tchain] $=$ potential energy of each particle thermostat displacement (energy units)   
• KE_eta_dot[tchain] $=$ kinetic energy of each particle thermostat velocity (energy units)   
• PE_omega[ndof] $=$ potential energy of each barostat displacement (energy units)   
• KE_omega_dot[ndof] $=$ kinetic energy of each barostat velocity (energy units)   
• PE_etap[pchain] $=$ potential energy of each barostat thermostat displacement (energy units)   
• KE_etap_dot[pchain] $=$ kinetic energy of each barostat thermostat velocity (energy units)  

• PE_strain[1] $=$ scalar strain energy (energy units)  

This fix can ramp its external temperature and pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.121.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

X, y, z cannot be barostatted if the associated dimension is not periodic. Xy, xz, and yz can only be barostatted if the simulation domain is triclinic and the second dimension in the keyword ( $y$ dimension in $x y$ ) is periodic. $Z,x z$ , and yz, cannot be barostatted for 2D simulations. The create_box, read data, and read_restart commands specify whether the simulation box is orthogonal or non-orthogonal (triclinic) and explain the meaning of the xy,xz,yz tilt factors.  

For the temp keyword, the final Tstop cannot be 0.0 since it would make the external $\mathrm{T}=0.0$ at some timestep during the simulation which is not allowed in the Nose/Hoover formulation.  

The scaleyz yes and scalexz yes keyword/value pairs can not be used for 2D simulations. scaleyz yes, scalexz yes, and scalexy yes options can only be used if the second dimension in the keyword is periodic, and if the tilt factor is not coupled to the barostat via keywords tri, yz, xz, and xy.  

The alpha keyword modifies the barostat as per Miller et al. (Miller)_”#nc-Miller” so that the Cauchy stress is controlled. alpha is the non-dimensional parameter, typically set to 0.001 or 0.01 that determines how aggressively the algorithm drives the system towards the set Cauchy stresses. Larger values of alpha will modify the system more quickly, but can lead to instabilities. Smaller values will lead to longer convergence time. Since alpha also influences how much the stress fluctuations deviate from the equilibrium fluctuations, it should be set as small as possible.  

A continue value of yes indicates that the fix is subsequent to a previous run with the npt/cauchy fix, and the intention is to continue from the converged stress state at the end of the previous run. This may be required, for example, when implementing a multi-step loading/unloading sequence over several fixes.  

Setting alpha to zero is not permitted. To “turn off” the cauchystat control and thus restore the equilibrium stress fluctuations, two subsequent fixes should be used. In the first, fix npt/cauchy is used and the simulation box equilibrates to the correct shape for the desired stresses. In the second, $f i x n p t$ is used instead which uses the original ParrinelloRahman algorithm, but now with the corrected simulation box shape from using fix npt/cauchy.  

This fix can be used with dynamic groups as defined by the group command. Likewise it can be used with groups to which atoms are added or deleted over time, e.g. a deposition simulation. However, the conservation properties of the thermostat and barostat are defined for systems with a static set of atoms. You may observe odd behavior if the atoms in a group vary dramatically over time or the atom count becomes very small.  

# 2.121.6 Related commands  

fix nve, fix_modify, run_style  

# 2.121.7 Default  

The keyword defaults are tchain $=3$ , pchain $=3$ , mtk $=$ yes, $\mathrm{tloop}=\mathrm{ploop}=1$ , nreset $=0$ , $\mathrm{drag}=0.0$ , dilate $=$ all, couple $=$ none, cauchystat $=$ no, scaleyz $=$ scalexz $=$ scalexy $=$ yes if periodic in second dimension and not coupled to barostat, otherwise no.  

(Martyna) Martyna, Tobias and Klein, J Chem Phys, 101, 4177 (1994).   
(Parrinello) Parrinello and Rahman, J Appl Phys, 52, 7182 (1981).  

# 2.121. fix npt/cauchy command  

(Tuckerman) Tuckerman, Alejandre, Lopez-Rendon, Jochim, and Martyna, J Phys A: Math Gen, 39, 5629 (2006).   
(Shinoda) Shinoda, Shiga, and Mikami, Phys Rev B, 69, 134103 (2004).   
(Miller) Miller, Tadmor, Gibson, Bernstein and Pavia, J Chem Phys, 144, 184107 (2016).  

# 2.122 fix npt/sphere command  

Accelerator Variants: npt/sphere/omp  

# 2.122.1 Syntax  

fix ID group-ID npt/sphere keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{{x}}$ command npt/sphere $=$ style name of this fix command zero or more keyword/value pairs may be appended   
• keyword $=$ disc  

disc value $=$ none $=$ treat particles as 2d discs, not spheres  

• NOTE: additional thermostat and barostat and dipole related keyword/value pairs from the fix npt command can be appended  

# 2.122.2 Examples  

fix 1 all npt/sphere temp 300.0 300.0 100.0 iso 0.0 0.0 1000.0 fix 2 all npt/sphere temp 300.0 300.0 100.0 x 5.0 5.0 1000.0 fix 2 all npt/sphere temp 300.0 300.0 100.0 x 5.0 5.0 1000.0 disc fix 2 all npt/sphere temp 300.0 300.0 100.0 x 5.0 5.0 1000.0 drag 0.2 fix 2 all npt/sphere temp 300.0 300.0 100.0 x 5.0 5.0 1000.0 update dipole fix 2 water npt/sphere temp 300.0 300.0 100.0 aniso 0.0 0.0 1000.0 dilate partial  

# 2.122.3 Description  

Perform constant NPT integration to update position, velocity, and angular velocity each timestep for finite-sizex spherical particles in the group using a Nose/Hoover temperature thermostat and Nose/Hoover pressure barostat. P is pressure; T is temperature. This creates a system trajectory consistent with the isothermal-isobaric ensemble.  

This fix differs from the fix npt command, which assumes point particles and only updates their position and velocity.  

The thermostat is applied to both the translational and rotational degrees of freedom for the spherical particles, assuming a compute is used which calculates a temperature that includes the rotational degrees of freedom (see below). The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

If the disc keyword is used, then each particle is treated as a 2d disc (circle) instead of as a sphere. This is only possible for 2d simulations, as defined by the dimension keyword. The only difference between discs and spheres in this context is their moment of inertia, as used in the time integration.  

Additional parameters affecting the thermostat and barostat are specified by keywords and values documented with the fix npt command. See, for example, discussion of the temp, iso, aniso, and dilate keywords.  

The particles in the fix group are the only ones whose velocities and positions are updated by the velocity/position update portion of the NPT integration.  

Regardless of what particles are in the fix group, a global pressure is computed for all particles. Similarly, when the size of the simulation box is changed, all particles are re-scaled to new positions, unless the keyword dilate is specified with a value of partial, in which case only the particles in the fix group are re-scaled. The latter can be useful for leaving the coordinates of particles in a solid substrate unchanged and controlling the pressure of a surrounding fluid.  

This fix computes a temperature and pressure each timestep. To do this, the fix creates its own computes of style “temp/sphere” and “pressure”, as if these commands had been issued:  

compute fix-ID_temp all temp/sphere compute fix-ID_press all pressure fix-ID_temp  

See the compute temp/sphere and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”, and the group for the new computes is “all” since pressure is computed for the entire system.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of this fix’s temperature or pressure via the compute_modify command or print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the $\mathbf{X}$ -component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.122.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover thermostat and barostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by this fix. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix npt command.  

# 2.122. fix npt/sphere command  

This fix can ramp its target temperature and pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.122.5 Restrictions  

This fix requires that atoms store torque and angular velocity (omega) and a radius as defined by the atom_style spher command.  

All particles in the group must be finite-size spheres. They cannot be point particles.  

Use of the disc keyword is only allowed for 2d simulations, as defined by the dimension keyword.  

# 2.122.6 Related commands  

fix npt, fix nve_sphere, fix nvt_sphere, fix npt_asphere, fix_modify  

# 2.122.7 Default  

none  

# 2.123 fix numdiff command  

# 2.123.1 Syntax  

fix ID group-ID numdiff Nevery delta • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • numdif $=$ style name of this fix command • Nevery $=$ calculate force by finite difference every this many timesteps • delta $=$ size of atom displacements (distance units)  

# 2.123.2 Examples  

fix 1 all numdiff 10 1e-6   
fix 1 movegroup numdiff 100 0.01  

# 2.123.3 Description  

Calculate forces through finite difference calculations of energy versus position. These forces can be compared to analytic forces computed by pair styles, bond styles, etc. This can be useful for debugging or other purposes.  

The group specified with the command means only atoms within the group have their averages computed. Results are set to 0.0 for atoms not in the group.  

This fix performs a loop over all atoms in the group. For each atom and each component of force it adds delta to the position, and computes the new energy of the entire system. It then subtracts delta from the original position and again computes the new energy of the system. It then restores the original position. That component of force is calculated as the difference in energy divided by two times delta.  

![](images/c30a9a344b15b1940ebdf0107c12ef95aeb99eb8ce810922f1d13b2d3290c559.jpg)  

# Note  

It is important to choose a suitable value for delta, the magnitude of atom displacements that are used to generate finite difference approximations to the exact forces. For typical systems, a value in the range of 1 part in 1e4 to 1e5 of the typical separation distance between atoms in the liquid or solid state will be sufficient. However, the best value will depend on a multitude of factors including the stiffness of the interatomic potential, the thermodynamic state of the material being probed, and so on. The only way to be sure that you have made a good choice is to do a sensitivity study on a representative atomic configuration, sweeping over a wide range of values of delta. If delta is too small, the output forces will vary erratically due to truncation effects. If delta is increased beyond a certain point, the output forces will start to vary smoothly with delta, due to growing contributions from higher order derivatives. In between these two limits, the numerical force values should be largely independent of delta.  

# Note  

The cost of each energy evaluation is essentially the cost of an MD timestep. Thus invoking this fix once for a 3d system has a cost of 6N timesteps, where $\mathbf{N}$ is the total number of atoms in the system. So this fix can be very expensive to use for large systems. One expedient alternative is to define the fix for a group containing only a few atoms.  

The Nevery argument specifies on what timesteps the force will be used calculated by finite difference.  

The delta argument specifies the size of the displacement each atom will undergo.  

# 2.123.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix produces a per-atom array which can be accessed by various output commands, which stores the components of the force on each atom as calculated by finite difference. The per-atom values can only be accessed on timesteps that are multiples of Nevery since that is when the finite difference forces are calculated. See the examples in examples/numdiff directory to see how this fix can be used to directly compare with the analytic forces computed by LAMMPS.  

The array values calculated by this compute will be in force units.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is invoked during energy minimization.  

# 2.123.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.123.6 Related commands  

dynamical_matrix, fix numdiff/virial,  

# 2.123.7 Default  

none  

# 2.124 fix numdiff/virial command  

# 2.124.1 Syntax  

fix ID group-ID numdiff/virial Nevery delta • ID, group-ID are documented in fix command • numdiff/virial $=$ style name of this fix command • Nevery $=$ calculate virial by finite difference every this many timesteps • delta $=$ magnitude of strain fields (dimensionless)  

# 2.124.2 Examples  

<html><body><table><tr><td>fix 1 all numdiff/stress 10 1e-6</td></tr></table></body></html>  

# 2.124.3 Description  

Added in version 17Feb2022.  

Calculate the virial stress tensor through a finite difference calculation of energy versus strain. These values can be compared to the analytic virial tensor computed by pair styles, bond styles, etc. This can be useful for debugging or other purposes. The specified group must be “all”.  

This fix applies linear strain fields of magnitude delta to all the atoms relative to a point at the center of the box. The strain fields are in six different directions, corresponding to the six Cartesian components of the stress tensor defined by LAMMPS. For each direction it applies the strain field in both the positive and negative senses, and the new energy of the entire system is calculated after each. The difference in these two energies divided by two times delta, approximates the corresponding component of the virial stress tensor, after applying a suitable unit conversion.  

#  Note  

It is important to choose a suitable value for delta, the magnitude of strains that are used to generate finite difference approximations to the exact virial stress. For typical systems, a value in the range of 1 part in 1e5 to 1e6 will be sufficient. However, the best value will depend on a multitude of factors including the stiffness of the interatomic potential, the thermodynamic state of the material being probed, and so on. The only way to be sure that you have made a good choice is to do a sensitivity study on a representative atomic configuration, sweeping over a wide range of values of delta. If delta is too small, the output values will vary erratically due to truncation effects. If delta is increased beyond a certain point, the output values will start to vary smoothly with delta, due to growing contributions from higher order derivatives. In between these two limits, the numerical virial values should be largely independent of delta.  

The Nevery argument specifies on what timesteps the force will be used calculated by finite difference.   
The delta argument specifies the size of the displacement each atom will undergo.  

# 2.124.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix produces a global vector which can be accessed by various output commands, which stores the components of the virial stress tensor as calculated by finite difference. The global vector can only be accessed on timesteps that are multiples of Nevery since that is when the finite difference virial is calculated. See the examples in examples/numdiff directory to see how this fix can be used to directly compare with the analytic virial stress tensor computed by LAMMPS.  

The order of the virial stress tensor components is xx, yy, zz, yz, xz, and $x y$ , consistent with Voigt notation. Note that the vector produced by compute pressure uses a different ordering, with yz and xy swapped.  

The vector values calculated by this compute are “intensive”. The vector values will be in pressure units.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is invoked during energy minimization.  

# 2.124.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.124.6 Related commands  

fix numdiff , compute pressure  

# 2.124.7 Default  

none  

# 2.125 fix nve command  

Accelerator Variants: nve/gpu, nve/intel, nve/kk, nve/omp  

# 2.125.1 Syntax  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.125.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.125.5 Restrictions  

none  

2.125.6 Related commands fix nvt, fix npt, run_style  

# 2.125.7 Default  

none  

# 2.126 fix nve/asphere command  

Accelerator Variants: nve/asphere/gpu, nve/asphere/intel  

# 2.126.1 Syntax  

fix ID group-ID nve/asphere  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • nve/asphere $=$ style name of this fix command  

# 2.126.2 Examples  

# 2.126.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.126.5 Restrictions  

This fix is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular momentum and a quaternion as defined by the atom_style ellipsoid command.  

All particles in the group must be finite-size. They cannot be point particles, but they can be aspherical or spherical as defined by their shape attribute.  

# 2.126.6 Related commands  

fix nve, fix nve/sphere  

# 2.126.7 Default  

none  

# 2.127 fix nve/asphere/noforce command  

# 2.127.1 Syntax  

fix ID group-ID nve/asphere/noforce  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • nve/asphere/noforce $=$ style name of this fix command  

# 2.127.2 Examples  

fix 1 all nve/asphere/noforce  

# 2.127.3 Description  

Perform updates of position and orientation, but not velocity or angular momentum for atoms in the group each timestep.   
In other words, the force and torque on the atoms is ignored and their velocity and angular momentum are not updated.   
The atom velocities and angular momenta are used to update their positions and orientation.  

This is useful as an implicit time integrator for Fast Lubrication Dynamics, since the velocity and angular momentum are updated by the pair_style lubricuteU command.  

# 2.127.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.127.5 Restrictions  

This fix is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular momentum and a quaternion as defined by the atom_style ellipsoid command.  

All particles in the group must be finite-size. They cannot be point particles, but they can be aspherical or spherical as defined by their shape attribute.  

# 2.127.6 Related commands  

fix nve/noforce, fix nve/asphere  

# 2.127.7 Default  

none  

# 2.128 fix nve/awpmd command  

# 2.128.1 Syntax  

fix ID group-ID nve/awpmd  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • nve/awpmd $=$ style name of this fix command  

# 2.128.2 Examples  

The operation of this fix is exactly like that described by the fix nve command, except that the width and width-velocity of the electron wave functions are also updated.  

# 2.128.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.128.5 Restrictions  

This fix is part of the AWPMD package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.128.6 Related commands  

fix nve  

# 2.128.7 Default  

none  

# 2.129 fix nve/body command  

# 2.129.1 Syntax  

# fix ID group-ID nve/body  

• ID, group-ID are documented in fix command • nve/body $=$ style name of this fix command  

# 2.129.2 Examples  

# 2.129.5 Restrictions  

This fix is part of the BODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular momentum and a quaternion as defined by the atom_style body command.  

All particles in the group must be body particles. They cannot be point particles.  

# 2.129.6 Related commands  

fix nve, fix nve/sphere, fix nve/asphere  

# 2.129.7 Default  

none  

# 2.130 fix nve/bpm/sphere command  

# 2.130.1 Syntax  

fix ID group-ID nve/bpm/sphere • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • nve/bpm/sphere $=$ style name of this fix command • zero or more keyword/value pairs may be appended • keyword $=$ disc disc value $=$ none $=$ treat particles as 2d discs, not spheres  

# 2.130.2 Examples  

<html><body><table><tr><td>fix 1 all nve/bpm/sphere</td></tr><tr><td>fix l all lnve /bpm sphere disc</td></tr><tr><td></td></tr></table></body></html>  

# 2.130.3 Description  

Added in version 4May2022.  

Perform constant NVE integration to update position, velocity, angular velocity, and quaternion orientation for finitesize spherical particles in the group each timestep. V is volume; E is energy. This creates a system trajectory consistent with the microcanonical ensemble.  

This fix differs from the fix nve command, which assumes point particles and only updates their position and velocity. It also differs from the fix nve/sphere command which assumes finite-size spheroid particles which do not store a quaternion. It thus does not update a particle’s orientation or quaternion.  

If the disc keyword is used, then each particle is treated as a 2d disc (circle) instead of as a sphere. This is only possible for 2d simulations, as defined by the dimension keyword. The only difference between discs and spheres in this context is their moment of inertia, as used in the time integration.  

# 2.130.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.130.5 Restrictions  

This fix is part of the BPM package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque, angular velocity (omega), a radius, and a quaternion as defined by the atom_style bpm/sphere command.  

All particles in the group must be finite-size spheres with quaternions. They cannot be point particles.  

Use of the disc keyword is only allowed for 2d simulations, as defined by the dimension keyword.  

# 2.130.6 Related commands  

fix nve, fix nve/sphere  

# 2.130.7 Default  

none  

# 2.131 fix nve/dot command  

# 2.131.1 Syntax  

# 2.131.4 Restrictions  

These pair styles can only be used if LAMMPS was built with the CG-DNA package and the MOLECULE and ASPHERE package. See the Build package page for more info.  

# 2.131.5 Related commands  

fix nve/dotc/langevin, fix nve  

# 2.131.6 Default  

none  

(Davidchack) R.L Davidchack, T.E. Ouldridge, and M.V. Tretyakov. J. Chem. Phys. 142, 144114 (2015). (Miller) T. F. Miller III, M. Eleftheriou, P. Pattnaik, A. Ndirango, G. J. Martyna, J. Chem. Phys., 116, 8649-8659 (2002). (Henrich) O. Henrich, Y. A. Gutierrez-Fosado, T. Curk, T. E. Ouldridge, Eur. Phys. J. E 41, 57 (2018).  

# 2.132 fix nve/dotc/langevin command  

# 2.132.1 Syntax  

fix ID group-ID nve/dotc/langevin Tstart Tstop damp seed keyword value  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• nve/dotc/langevin $=$ style name of this fix command   
• Tstart,Tstop $=$ desired temperature at start/end of run (temperature units)   
• damp $=$ damping parameter (time units)   
• seed $=$ random number seed to use for white noise (positive integer)   
• keyword $=$ angmom angmom value $=$ factor factor $\mathbf{\mu}=\mathrm{do}$ thermostat rotational degrees of freedom via the angular momentum and apply␣ $\hookrightarrow$ numeric scale factor as discussed below  

# 2.132.2 Examples  

fix 1 all nve/dotc/langevin 1.0 1.0 0.03 457145 angmom 10   
fix 1 all nve/dotc/langevin 0.1 0.1 78.9375 457145 angmom 10  

# 2.132.3 Description  

Apply a rigid-body Langevin-type integrator of the kind “Langevin C” as described in (Davidchack) to a group of atoms, which models an interaction with an implicit background solvent. This command performs Brownian dynamics (BD) via a technique that splits the integration into a deterministic Hamiltonian part and the Ornstein-Uhlenbeck process for noise and damping. The quaternion degrees of freedom are updated though an evolution operator which performs a rotation in quaternion space, preserves the quaternion norm and is akin to (Miller).  

In terms of syntax this command has been closely modelled on the fix langevin and its angmom option. But it combines the fix nve and the fix langevin in one single command. The main feature is improved stability over the standard integrator, permitting slightly larger timestep sizes.  

![](images/f340296b445847791f05c458aa5dbf11697e28b0754e4ca85ee475bb785f8dc8.jpg)  

# Note  

Unlike the fix langevin this command performs also time integration of the translational and quaternion degrees of freedom.  

The total force on each atom will have the form:  

$$
\begin{array}{r}{F=F_{c}+F_{f}+F_{r}}\ {F_{f}=-\cfrac{m}{\operatorname{damp}{\vphantom{|}}}\nu}\ {F_{r}\propto\sqrt{\cfrac{k_{B}T m}{d t\operatorname{damp}{\vphantom{|}}}}}\end{array}
$$  

$F_{c}$ is the conservative force computed via the usual inter-particle interactions (pair_style, bond_style, etc). The $F_{f}$ and $F_{r}$ terms are implicitly taken into account by this fix on a per-particle basis.  

$F_{f}$ is a frictional drag or viscous damping term proportional to the particle’s velocity. The proportionality constant for each atom is computed as $\frac{m}{\mathrm{{damp}}}$ , where $m$ is the mass of the particle and damp is the damping factor specified by the user.  

$F_{r}$ is a force due to solvent atoms at a temperature $T$ randomly bumping into the particle. As derived from the fluctuation/dissipation theorem, its magnitude as shown above is proportional to $\sqrt{\frac{k_{B}T m}{d t~\mathrm{damp}}}$ , where $k_{B}$ is the Boltzmann constant, $T$ is the desired temperature, $m$ is the mass of the particle, $d t$ is the timestep size, and damp is the damping factor. Random numbers are used to randomize the direction and magnitude of this force as described in (Dunweg), where a uniform random number is used (instead of a Gaussian random number) for speed.  

Tstart and Tstop have to be constant values, i.e. they cannot be variables. If used together with the oxDNA force field for coarse-grained simulation of DNA please note that $\mathrm{T}=0.1$ in oxDNA units corresponds to $\mathrm{T}=300\mathrm{K}$ .  

The damp parameter is specified in time units and determines how rapidly the temperature is relaxed. For example, a value of 0.03 means to relax the temperature in a timespan of (roughly) 0.03 time units $\tau$ (see the units command). The damp factor can be thought of as inversely related to the viscosity of the solvent, i.e. a small relaxation time implies a high-viscosity solvent and vice versa. See the discussion about gamma and viscosity in the documentation for the $f\alpha$ viscous command for more details. Note that the value 78.9375 in the second example above corresponds to a diffusion constant, which is about an order of magnitude larger than realistic ones. This has been used to sample configurations faster in Brownian dynamics simulations.  

The random # seed must be a positive integer. A Marsaglia random number generator is used. Each processor uses the input seed to generate its own unique seed and its own stream of random numbers. Thus the dynamics of the system will not be identical on two runs on different numbers of processors.  

The keyword/value option has to be used in the following way:  

This fix has to be used together with the angmom keyword. The particles are always considered to have a finite size. The keyword angmom enables thermostatting of the rotational degrees of freedom in addition to the usual translational degrees of freedom.  

The scale factor after the angmom keyword gives the ratio of the rotational to the translational friction coefficient.  

An example input file can be found in examples/PACKAGES/cgdna/examples/duplex2/. Further details of the implementation and stability of the integrators are contained in (Henrich). The preprint version of the article can be found here.  

# 2.132. fix nve/dotc/langevin command  

# 2.132.4 Restrictions  

These pair styles can only be used if LAMMPS was built with the CG-DNA package and the MOLECULE and ASPHERE package. See the Build package page for more info.  

# 2.132.5 Related commands  

fix nve, fix langevin, fix nve/dot, bond_style oxdna/fene, bond_style oxdna2/fene, pair_style oxdna/excv, pair_style oxdna2/excv  

# 2.132.6 Default  

none  

(Davidchack) R.L Davidchack, T.E. Ouldridge, M.V. Tretyakov. J. Chem. Phys. 142, 144114 (2015).   
(Miller) T. F. Miller III, M. Eleftheriou, P. Pattnaik, A. Ndirango, G. J. Martyna, J. Chem. Phys., 116, 8649-8659 (2002).   
(Dunweg) B. Dunweg, W. Paul, Int. J. Mod. Phys. C, 2, 817-27 (1991).   
(Henrich) O. Henrich, Y. A. Gutierrez-Fosado, T. Curk, T. E. Ouldridge, Eur. Phys. J. E 41, 57 (2018).  

# 2.133 fix nve/eff command  

# 2.133.1 Syntax  

# 2.133.5 Restrictions  

This fix is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.133.6 Related commands  

fix nve, fix nvt/eff , fix npt/eff  

# 2.133.7 Default  

none  

# 2.134 fix nve/limit command  

Accelerator Variants: nve/limit/kk  

# 2.134.1 Syntax  

fix ID group-ID nve/limit xmax  

• ID, group-ID are documented in fix command   
• nve $=$ style name of this fix command   
• xmax $=$ maximum distance an atom can move in one timestep (distance units)  

# 2.134.2 Examples  

performing initial dynamics that need this fix, then turn fix shake on when doing normal dynamics with a fixed-size timestep.  

# 2.134.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the count of how many updates of atom’s velocity/position were limited by the maximum distance criterion. This should be roughly the number of atoms so affected, except that updates occur at both the beginning and end of a timestep in a velocity Verlet timestepping algorithm. This is a cumulative quantity for the current run, but is re-initialized to zero each time a run is performed. The scalar value calculated by this fix is “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.134.5 Restrictions  

none  

2.134.6 Related commandsfix nve, fix nve/noforce, pair_style soft  

# 2.134.7 Default  

none  

# 2.135 fix nve/line command  

# 2.135.1 Syntax  

fix ID group-ID nve/line  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • nve/line $=$ style name of this fix command  

# 2.135.2 Examples  

# 2.135.3 Description  

Perform constant NVE integration to update position, velocity, orientation, and angular velocity for line segment particles in the group each timestep. V is volume; E is energy. This creates a system trajectory consistent with the microcanonical ensemble. See Howto spherical page for an overview of using line segment particles.  

This fix differs from the fix nve command, which assumes point particles and only updates their position and velocity.  

# 2.135.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.135.5 Restrictions  

This fix is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that particles be line segments as defined by the atom_style line command.  

# 2.135.6 Related commands  

fix nve, fix nve/asphere  

# 2.135.7 Default  

none  

# 2.136 fix nve/manifold/rattle command  

# 2.136.1 Syntax  

fix ID group-ID nve/manifold/rattle tol maxit manifold manifold-args keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• nve/manifold/rattle $=$ style name of this fix command   
• tol $=$ tolerance to which Newton iteration must converge   
• maxit $=$ maximum number of iterations to perform   
• manifold $=$ name of the manifold   
manifold-args $=$ parameters for the manifold   
• one or more keyword/value pairs may be appended keyword $=$ every every values $=\mathrm{N}$ $\mathrm{N}=$ print info about iteration every N steps. $\mathrm{N}=0$ means no output  

# 2.136.2 Examples  

fix 1 all nve/manifold/rattle 1e-4 10 sphere 5.0   
fix step all nve/manifold/rattle 1e-8 100 ellipsoid 2.5 2.5 5.0 every 25  

# 2.136.3 Description  

Perform constant NVE integration to update position and velocity for atoms constrained to a curved surface (manifold) in the group each timestep. The constraint is handled by RATTLE (Andersen) written out for the special case of singleparticle constraints as explained in (Paquay). V is volume; E is energy. This way, the dynamics of particles constrained to curved surfaces can be studied. If combined with fix langevin, this generates Brownian motion of particles constrained to a curved surface. For a list of currently supported manifolds and their parameters, see the Howto manifold doc page.  

Note that the particles must initially be close to the manifold in question. If not, RATTLE will not be able to iterate until the constraint is satisfied, and an error is generated. For simple manifolds this can be achieved with region and create_atoms commands, but for more complex surfaces it might be more useful to write a script.  

The manifold args may be equal-style variables, like so:  

variable R equal "ramp(5.0,3.0)" fix shrink_sphere all nve/manifold/rattle 1e-4 10 sphere v_R  

In this case, the manifold parameter will change in time according to the variable. This is not a problem for the time integrator as long as the change of the manifold is slow with respect to the dynamics of the particles. Note that if the manifold has to exert work on the particles because of these changes, the total energy might not be conserved.  

# 2.136.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.136.5 Restrictions  

This fix is part of the MANIFOLD package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.136.6 Related commands  

fix nvt/manifold/rattle, fix manifoldforce  

# 2.136.7 Default  

every $=0$ , tchain $=3$  

(Andersen) Andersen, J. Comp. Phys. 52, 24, (1983).   
(Paquay) Paquay and Kusters, Biophys. J., 110, 6, (2016). preprint available at arXiv:1411.3019.  

# 2.137 fix nve/noforce command  

# 2.137.1 Syntax  

# fix ID group-ID nve  

• ID, group-ID are documented in fix command • nve/noforce $=$ style name of this fix command  

# 2.137.2 Examples  

# 2.137.3 Description  

Perform updates of position, but not velocity for atoms in the group each timestep. In other words, the force on the atoms is ignored and their velocity is not updated. The atom velocities are used to update their positions.  

This can be useful for wall atoms, when you set their velocities, and want the wall to move (or stay stationary) in a prescribed fashion.  

This can also be accomplished via the fix setforce command, but with fix nve/noforce, the forces on the wall atoms are unchanged, and can thus be printed by the dump command or queried with an equal-style variable that uses the fcm() group function to compute the total force on the group of atoms.  

# 2.137.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.137.5 Restrictions  

none  

# 2.137.6 Related commands  

fix nve  

# 2.137.7 Default  

none  

# 2.138 fix nve/sphere command  

Accelerator Variants: nve/sphere/omp, nve/sphere/kk  

# 2.138.1 Syntax  

fix ID group-ID nve/sphere  

• ID, group-ID are documented in fix command • nve/sphere $=$ style name of this fix command  

# 2.137. fix nve/noforce command  

• zero or more keyword/value pairs may be appended • keyword $=$ update or disc  

update value $=$ dipole or dipole/dlm dipole $=$ update orientation of dipole moment during integration dipole/dlm $=$ use DLM integrator to update dipole orientation disc value $=$ none $=$ treat particles as 2d discs, not spheres  

# 2.138.2 Examples  

fix 1 all nve/sphere   
fix 1 all nve/sphere update dipole   
fix 1 all nve/sphere disc   
fix 1 all nve/sphere update dipole/dlm  

# 2.138.3 Description  

Perform constant NVE integration to update position, velocity, and angular velocity for finite-size spherical particles in the group each timestep. V is volume; E is energy. This creates a system trajectory consistent with the microcanonical ensemble.  

This fix differs from the fix nve command, which assumes point particles and only updates their position and velocity.  

If the update keyword is used with the dipole value, then the orientation of the dipole moment of each particle is also updated during the time integration. This option should be used for models where a dipole moment is assigned to finite-size particles, e.g. spheroids via use of the atom_style hybrid sphere dipole command.  

The default dipole orientation integrator can be changed to the Dullweber-Leimkuhler-McLachlan integration scheme (Dullweber) when using update with the value dipole/dlm. This integrator is symplectic and time-reversible, giving better energy conservation and allows slightly longer timesteps at only a small additional computational cost.  

If the disc keyword is used, then each particle is treated as a 2d disc (circle) instead of as a sphere. This is only possible for 2d simulations, as defined by the dimension keyword. The only difference between discs and spheres in this context is their moment of inertia, as used in the time integration.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.138.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.138.5 Restrictions  

This fix requires that atoms store torque and angular velocity (omega) and a radius as defined by the atom_style sphere command. If the dipole keyword is used, then they must also store a dipole moment as defined by the atom_style dipole command.  

All particles in the group must be finite-size spheres. They cannot be point particles.  

Use of the disc keyword is only allowed for 2d simulations, as defined by the dimension keyword  

# 2.138.6 Related commands  

fix nve, fix nve/asphere  

# 2.138.7 Default  

none  

(Dullweber) Dullweber, Leimkuhler and McLachlan, J Chem Phys, 107, 5840 (1997).  

# 2.139 fix nve/spin command  

# 2.139.1 Syntax  

fix ID group-ID nve/spin keyword values  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• nve/spin $=$ style name of this fix command   
• keyword $=$ lattice lattice value $=$ moving or frozen moving $=$ integrate both spin and atomic degress of freedom frozen $=$ integrate spins on a fixed lattice  

# 2.139.2 Examples  

<html><body><table><tr><td>fix 3 all nve/spin lattice moving</td></tr><tr><td>fix 1 all 1 nve/spin lattice frozen</td></tr><tr><td></td></tr></table></body></html>  

# 2.139.3 Description  

Perform a symplectic integration for the spin or spin-lattice system.  

The lattice keyword defines if the spins are integrated on a lattice of fixed atoms (lattice $=$ frozen), or if atoms are moving (lattice $=$ moving). The first case corresponds to a spin dynamics calculation, and the second to a spin-lattice calculation. By default a spin-lattice integration is performed (lattice $=$ moving).  

The nve/spin fix applies a Suzuki-Trotter decomposition to the equations of motion of the spin lattice system, following the scheme:  

![](images/02272723137913aa7633e8e963ed371a8beaeffbe1c07f932ba91f27843fba89.jpg)  

according to the implementation reported in (Omelyan).  

A sectoring method enables this scheme for parallel calculations. The implementation of this sectoring algorithm is reported in (Tranchida).  

# 2.139.4 Restrictions  

This fix style can only be used if LAMMPS was built with the SPIN package. See the Build package page for more info.  

To use the spin algorithm, it is necessary to define a map with the atom_modify command. Typically, by adding the command:  

• ID, group-ID are documented in fix command • nve/tri $=$ style name of this fix command  

# 2.140.2 Examples  

# 2.140.3 Description  

Perform constant NVE integration to update position, velocity, orientation, and angular momentum for triangular particles in the group each timestep. V is volume; E is energy. This creates a system trajectory consistent with the microcanonical ensemble. See the Howto spherical page for an overview of using triangular particles.  

This fix differs from the fix nve command, which assumes point particles and only updates their position and velocity.  

# 2.140.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.140.5 Restrictions  

This fix is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that particles be triangles as defined by the atom_style tri command.  

# 2.140.6 Related commands  

fix nve, fix nve/asphere  

# 2.140.7 Default  

none  

# 2.141 fix nvk command  

# 2.141.1 Syntax  

# 2.141.3 Description  

Perform constant kinetic energy integration using the Gaussian thermostat to update position and velocity for atoms in the group each timestep. V is volume; K is kinetic energy. This creates a system trajectory consistent with the isokinetic ensemble.  

The equations of motion used are those of Minary et al in (Minary), a variant of those initially given by Zhang in (Zhang).  

The kinetic energy will be held constant at its value given when fix nvk is initiated. If a different kinetic energy is desired, the velocity command should be used to change the kinetic energy prior to this fix.  

# 2.141.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.141.5 Restrictions  

The Gaussian thermostat only works when it is applied to all atoms in the simulation box. Therefore, the group must be set to all.  

This fix has not yet been implemented to work with the RESPA integrator.  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.141.6 Related commands  

none  

# 2.141.7 Default  

none  

(Minary) Minary, Martyna, and Tuckerman, J Chem Phys, 18, 2510 (2003).   
(Zhang) Zhang, J Chem Phys, 106, 6102 (1997).  

# 2.142 fix nvt/asphere command  

Accelerator Variants: nvt/asphere/omp  

# 2.142.1 Syntax  

fix ID group-ID nvt/asphere keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• nvt/asphere $=$ style name of this fix command   
• additional thermostat related keyword/value pairs from the fix nvt command can be appended  

# 2.142.2 Examples  

<html><body><table><tr><td>fix 1 all nvt/asphere temp 300.0 300.0 100.0</td></tr></table></body></html>  

# 2.142.3 Description  

Perform constant NVT integration to update position, velocity, orientation, and angular velocity each timestep for aspherical or ellipsoidal particles in the group using a Nose/Hoover temperature thermostat. V is volume; T is temperature. This creates a system trajectory consistent with the canonical ensemble.  

This fix differs from the fix nvt command, which assumes point particles and only updates their position and velocity.  

The thermostat is applied to both the translational and rotational degrees of freedom for the aspherical particles, assuming a compute is used which calculates a temperature that includes the rotational degrees of freedom (see below). The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

Additional parameters affecting the thermostat are specified by keywords and values documented with the $f(x n\nu t$ command. See, for example, discussion of the temp and drag keywords.  

This fix computes a temperature each timestep. To do this, the fix creates its own compute of style “temp/asphere”, as if this command had been issued:  

compute fix-ID_temp group-ID temp/asphere  

See the compute temp/asphere command for details. Note that the ID of the new compute is the fix-ID $^+$ underscore $^+$ “temp”, and the group for the new compute is the same as the fix group.  

Note that this is NOT the compute used by thermodynamic output (see the thermo_style command) with $\mathrm{~ID~}=$ thermo_temp. This means you can change the attributes of this fix’s temperature (e.g. its degrees-of-freedom) via the compute_modify command or print this temperature during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the x-component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.142.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover thermostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp option is supported by this fix. You can use it to assign a compute you have defined to this fix which will be used in its thermostatting procedure.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix nvt command.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.142.5 Restrictions  

This fix is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular momentum and a quaternion as defined by the atom_style ellipsoid command.  

All particles in the group must be finite-size. They cannot be point particles, but they can be aspherical or spherical as defined by their shape attribute.  

# 2.142.6 Related commands  

fix nvt, fix nve_asphere, fix npt_asphere, fix_modify  

# 2.142.7 Default  

none  

# 2.143 fix nvt/body command  

# 2.143.1 Syntax  

fix ID group-ID nvt/body keyword value ...  

• ID, group-ID are documented in fix command   
• nvt/body $=$ style name of this fix command   
• additional thermostat related keyword/value pairs from the fix nvt command can be appended  

# 2.143.2 Examples  

fix 1 all nvt/body temp 300.0 300.0 100.0   
fix 1 all nvt/body temp 300.0 300.0 100.0 drag 0.2  

# 2.143.3 Description  

Perform constant NVT integration to update position, velocity, orientation, and angular velocity each timestep for body particles in the group using a Nose/Hoover temperature thermostat. V is volume; T is temperature. This creates a system trajectory consistent with the canonical ensemble.  

This fix differs from the fix nvt command, which assumes point particles and only updates their position and velocity.  

The thermostat is applied to both the translational and rotational degrees of freedom for the body particles, assuming a compute is used which calculates a temperature that includes the rotational degrees of freedom (see below). The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

Additional parameters affecting the thermostat are specified by keywords and values documented with the fix nvt command. See, for example, discussion of the temp and drag keywords.  

This fix computes a temperature each timestep. To do this, the fix creates its own compute of style “temp/body”, as if this command had been issued:  

compute fix-ID_temp group-ID temp/body  

See the compute temp/body command for details. Note that the ID of the new compute is the fix-ID $^+$ underscore $^+$ “temp”, and the group for the new compute is the same as the fix group.  

Note that this is NOT the compute used by thermodynamic output (see the thermo_style command) with $\mathrm{~ID~}=$ thermo_temp. This means you can change the attributes of this fix’s temperature (e.g. its degrees-of-freedom) via the compute_modify command or print this temperature during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the x-component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

# 2.143.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover thermostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp option is supported by this fix. You can use it to assign a compute you have defined to this fix which will be used in its thermostatting procedure.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix nvt command.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.143.5 Restrictions  

This fix is part of the BODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix requires that atoms store torque and angular momentum and a quaternion as defined by the atom_style body command.  

# 2.143.6 Related commands  

fix nvt, fix nve_body, fix npt_body, fix_modify  

# 2.143.7 Default  

none  

# 2.144 fix nvt/manifold/rattle command  

# 2.144.1 Syntax  

fix ID group-ID nvt/manifold/rattle tol maxit manifold manifold-args keyword value ..  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• nvt/manifold/rattle $=$ style name of this fix command   
• tol $=$ tolerance to which Newton iteration must converge   
• maxit $=$ maximum number of iterations to perform   
• manifold $=$ name of the manifold   
manifold-args $=$ parameters for the manifold   
one or more keyword/value pairs may be appended keyword $=$ temp or tchain or every temp values $=$ Tstart Tstop Tdamp Tstart, $\mathrm{Tstop}=\mathrm{e}$ xternal temperature at start/end of run Tdamp $=$ temperature damping parameter (time units) tchain value $=\mathrm{N}$ $\mathrm{N}=$ length of thermostat chain (1 = single thermostat) every value $=\mathrm{N}$ $\mathrm{N}=$ print info about iteration every N steps. N = 0 means no output  

# 2.144.2 Examples  

fix 1 all nvt/manifold/rattle 1e-4 10 cylinder 3.0 temp 1.0 1.0 10.0  

# 2.144.3 Description  

This fix combines the RATTLE-based (Andersen) time integrator of fix nve/manifold/rattle (Paquay) with a NoseHoover-chain thermostat to sample the canonical ensemble of particles constrained to a curved surface (manifold). This sampling does suffer from discretization bias of O(dt). For a list of currently supported manifolds and their parameters, see the Howto manifold doc page.  

# 2.144.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.144.5 Restrictions  

This fix is part of the MANIFOLD package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.144.6 Related commands  

fix nve/manifold/rattle, fix manifoldforce Default: every $=0$  

(Andersen) Andersen, J. Comp. Phys. 52, 24, (1983).   
(Paquay) Paquay and Kusters, Biophys. J., 110, 6, (2016). preprint available at arXiv:1411.3019.  

# 2.145 fix nvt/sllod command  

Accelerator Variants: nvt/sllod/intel, nvt/sllod/omp, nvt/sllod/kk  

# 2.145.1 Syntax  

fix ID group-ID nvt/sllod keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• nvt/sllod $=$ style name of this fix command   
• zero or more keyword/value pairs may be appended keyword $=$ psllod psllod value $=\mathrm{no}$ or yes $=$ use SLLOD or p-SLLOD variant, respectively   
• additional thermostat related keyword/value pairs from the fix nvt command can be appended  

# 2.145.2 Examples  

fix 1 all nvt/sllod temp 300.0 300.0 100.0   
fix 1 all nvt/sllod temp 300.0 300.0 100.0 drag 0.2  

# 2.145.3 Description  

Perform constant NVT integration to update positions and velocities each timestep for atoms in the group using a Nose/Hoover temperature thermostat. V is volume; T is temperature. This creates a system trajectory consistent with the canonical ensemble.  

This thermostat is used for a simulation box that is changing size and/or shape, for example in a non-equilibrium MD (NEMD) simulation. The size/shape change is induced by use of the fix deform command, so each point in the simulation box can be thought of as having a “streaming” velocity. This position-dependent streaming velocity is  

# 2.145. fix nvt/sllod command  

subtracted from each atom’s actual velocity to yield a thermal velocity which is used for temperature computation and thermostatting. For example, if the box is being sheared in x, relative to y, then points at the bottom of the box (low y) have a small x velocity, while points at the top of the box (hi y) have a large x velocity. These velocities do not contribute to the thermal “temperature” of the atom.  

![](images/e363dd6f1e685330d1b78dd48428c87e8e96a54cb5f42f4ed604155a3cca0eb5.jpg)  

# Note  

Fix deform has an option for remapping either atom coordinates or velocities to the changing simulation box. To use fix nvt/sllod, fix deform should NOT remap atom positions, because fix nvt/sllod adjusts the atom positions and velocities to create a velocity profile that matches the changing box size/shape. Fix deform SHOULD remap atom velocities when atoms cross periodic boundaries since that is consistent with maintaining the velocity profile created by fix nvt/sllod. LAMMPS will give an error if this setting is not consistent.  

The SLLOD equations of motion, originally proposed by Hoover and Ladd (see (Evans and Morriss)), were proven to be equivalent to Newton’s equations of motion for shear flow by (Evans and Morriss). They were later shown to generate the desired velocity gradient and the correct production of work by stresses for all forms of homogeneous flow by (Daivis and Todd).  

Changed in version 8Feb2023.  

For the default $(p s l l o d=n o$ ), the LAMMPS implementation adheres to the standard SLLOD equations of motion, as defined by (Evans and Morriss). The option psllod $=$ yes invokes the slightly different SLLOD variant first introduced by (Tuckerman et al.) as $\mathrm{g}$ -SLLOD and later by (Edwards) as p-SLLOD. In all cases, the equations of motion are coupled to a Nose/Hoover chain thermostat in a velocity Verlet formulation, closely following the implementation used for the fix nvt command.  

![](images/9ee475a1291d6461f150c635d2c70af462e00107e0c03fe4627ee79253d03ef9.jpg)  

# Note  

A recent (2017) book by (Todd and Daivis) discusses use of the SLLOD method and non-equilibrium MD (NEMD) thermostatting generally, for both simple and complex fluids, e.g. molecular systems. The latter can be tricky to do correctly.  

Additional parameters affecting the thermostat are specified by keywords and values documented with the fix nvt command. See, for example, discussion of the temp and drag keywords.  

This fix computes a temperature each timestep. To do this, the fix creates its own compute of style “temp/deform”, as if this command had been issued:  

compute fix-ID_temp group-ID temp/deform  

See the compute temp/deform command for details. Note that the ID of the new compute is the fix-ID $^+$ underscore $^+$ “temp”, and the group for the new compute is the same as the fix group.  

Note that this is NOT the compute used by thermodynamic output (see the thermo_style command) with $\mathrm{~ID~}=$ thermo_temp. This means you can change the attributes of this fix’s temperature (e.g. its degrees-of-freedom) via the compute_modify command or print this temperature during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the $\mathbf{X}$ -component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.145.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover thermostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp option is supported by this fix. You can use it to assign a compute you have defined to this fix which will be used in its thermostatting procedure.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix nvt command.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.145.5 Restrictions  

This fix works best without Nose-Hoover chain thermostats, i.e. using tchain $=1$ . Setting tchain to larger values can result in poor equilibration.  

# 2.145.6 Related commands  

fix nve, fix nvt, fix temp/rescale, fix langevin, fix_modify, compute temp/deform  

# 2.145.7 Default  

Same as fix nvt, except tchain $=1$ , psllod $=n o$ .  

# 2.146 fix nvt/sllod/eff command  

# 2.146.1 Syntax  

fix ID group-ID nvt/sllod/eff keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• nvt/sllod/eff $=$ style name of this fix command   
• zero or more keyword/value pairs may be appended keyword $=$ psllod psllod value $=\mathrm{no}$ or yes $=$ use SLLOD or p-SLLOD variant, respectively   
• additional thermostat related keyword/value pairs from the fix nvt/eff command may be appended, too.  

# 2.146.2 Examples  

fix 1 all nvt/sllod/eff temp 300.0 300.0 0.1   
fix 1 all nvt/sllod/eff temp 300.0 300.0 0.1 drag 0.2  

# 2.146.3 Description  

Perform constant NVT integration to update positions and velocities each timestep for nuclei and electrons in the group for the electron force field model, using a Nose/Hoover temperature thermostat. V is volume; T is temperature. This creates a system trajectory consistent with the canonical ensemble.  

The operation of this fix is exactly like that described by the fix nvt/sllod command, except that the radius and radial velocity of electrons are also updated and thermostatted. Likewise the temperature calculated by the fix, using the compute it creates (as discussed in the fix nvt, npt, and nph doc page), is performed with a compute temp/deform/eff command that includes the eFF contribution to the temperature from the electron radial velocity.  

# 2.146.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover thermostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp option is supported by this fix. You can use it to assign a compute you have defined to this fix which will be used in its thermostatting procedure.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix nvt/eff command.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.146.5 Restrictions  

This fix is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix works best without Nose-Hoover chain thermostats, i.e. using tchain $=1$ . Setting tchain to larger values can result in poor equilibration.  

# 2.146.6 Related commands  

fix nve/eff , fix nvt/eff , fix langevin/eff , fix nvt/sllod, fix_modify, compute temp/deform/eff  

# 2.146.7 Default  

Same as fix nvt/eff , except tchain $=1$ .  

(Tuckerman) Tuckerman, Mundy, Balasubramanian, Klein, J Chem Phys, 106, 5615 (1997).  

# 2.147 fix nvt/sphere command  

Accelerator Variants: nvt/sphere/omp  

# 2.147.1 Syntax  

fix ID group-ID nvt/sphere keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• nvt/sphere $=$ style name of this fix command   
• zero or more keyword/value pairs may be appended   
• keyword $=$ disc disc value $=$ none $=$ treat particles as 2d discs, not spheres   
• NOTE: additional thermostat and dipole related keyword/value pairs from the fix nvt command can be appended  

# 2.147.2 Examples  

fix 1 all nvt/sphere temp 300.0 300.0 100.0 fix 1 all nvt/sphere temp 300.0 300.0 100.0 disc fix 1 all nvt/sphere temp 300.0 300.0 100.0 drag 0.2 fix 1 all nvt/sphere temp 300.0 300.0 100.0 update dipole  

# 2.147.3 Description  

Perform constant NVT integration to update position, velocity, and angular velocity each timestep for finite-size spherical particles in the group using a Nose/Hoover temperature thermostat. V is volume; T is temperature. This creates a system trajectory consistent with the canonical ensemble.  

This fix differs from the fix nvt command, which assumes point particles and only updates their position and velocity.  

The thermostat is applied to both the translational and rotational degrees of freedom for the spherical particles, assuming a compute is used which calculates a temperature that includes the rotational degrees of freedom (see below). The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

If the disc keyword is used, then each particle is treated as a 2d disc (circle) instead of as a sphere. This is only possible for 2d simulations, as defined by the dimension keyword. The only difference between discs and spheres in this context is their moment of inertia, as used in the time integration.  

Additional parameters affecting the thermostat are specified by keywords and values documented with the fix nvt command. See, for example, discussion of the temp and drag keywords.  

This fix computes a temperature each timestep. To do this, the fix creates its own compute of style “temp/sphere”, as if this command had been issued:  

compute fix-ID_temp group-ID temp/sphere  

See the compute temp/sphere command for details. Note that the ID of the new compute is the fix-ID $^+$ underscore $^+$ “temp”, and the group for the new compute is the same as the fix group.  

Note that this is NOT the compute used by thermodynamic output (see the thermo_style command) with $\mathrm{~ID~}=$ thermo_temp. This means you can change the attributes of this fix’s temperature (e.g. its degrees-of-freedom) via the compute_modify command or print this temperature during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the x-component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.147.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the state of the Nose/Hoover thermostat to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp option is supported by this fix. You can use it to assign a compute you have defined to this fix which will be used in its thermostatting procedure.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes the same global scalar and global vector of quantities as does the fix nvt command.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.147.5 Restrictions  

This fix requires that atoms store torque and angular velocity (omega) and a radius as defined by the atom_style sphere command.  

All particles in the group must be finite-size spheres. They cannot be point particles.  

Use of the disc keyword is only allowed for 2d simulations, as defined by the dimension keyword.  

# 2.147.6 Related commands  

fix nvt, fix nve_sphere, fix nvt_asphere, fix npt_sphere, fix_modify  

# 2.147.7 Default  

none  

# 2.148 fix oneway command  

# 2.148.1 Syntax  

fix ID group-ID oneway N region-ID direction  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• oneway $=$ style name of this fix command   
• $\Nu=$ apply this fix every this many timesteps   
• region- $\mathrm{{\cdot}I D=I D}$ of region where fix is active   
• direction $=x$ or - $-x$ or $y$ or - $\cdot y$ or $z$ or - $\cdot z=$ coordinate and direction of the oneway constraint  

# 2.148.2 Examples  

fix 1 ions oneway 10 semi -x fix 2 all oneway 1 left $-\mathrm{Z}$ fix 3 all oneway 1 right z  

# 2.148.3 Description  

Enforce that particles in the group and in a given region can only move in one direction. This is done by reversing a particle’s velocity component, if it has the wrong sign in the specified dimension. The effect is that the particle moves in one direction only.  

This can be used, for example, as a simple model of a semi-permeable membrane, or as an implementation of Maxwell’s demon.  

# 2.148.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.148. fix oneway command  

# 2.148.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.148.6 Related commands  

fix wall/reflect command  

# 2.148.7 Default  

none  

2.149 fix orient/fcc command  

# 2.150 fix orient/bcc command  

# 2.150.1 Syntax  

fix ID group-ID orient/fcc nstats dir alat dE cutlo cuthi file0 file1   
fix ID group-ID orient/bcc nstats dir alat dE cutlo cuthi file0 file1  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • nstats $=$ print stats every this many steps, $0=$ never • $\mathrm{dir}=0/1$ for which crystal is used as reference • alat $=$ fcc/bcc cubic lattice constant (distance units) • dE $=$ energy added to each atom (energy units) • cutlo,cuthi $=$ values between 0.0 and 1.0, cutlo $<$ cuthi • file0,file1 $=$ files that specify orientation of each grain  

# 2.150.2 Examples  

<html><body><table><tr><td>fix gb all orient /fcc 0 1 4.032008 0.001 0.25 0.75 xi.vec chi.vec fix gb all Orient t/bcc 0 1 2.882 0.001 0.25 0.75 ngb.left ngb.right</td></tr></table></body></html>  

# 2.150.3 Description  

The fix applies an orientation-dependent force to atoms near a planar grain boundary which can be used to induce grain boundary migration (in the direction perpendicular to the grain boundary plane). The motivation and explanation of this force and its application are described in (Janssens). The adaptation to bcc crystals is described in (Wicaksono1). The computed force is only applied to atoms in the fix group.  

The basic idea is that atoms in one grain (on one side of the boundary) have a potential energy dE added to them. Atoms in the other grain have 0.0 potential energy added. Atoms near the boundary (whose neighbor environment is intermediate between the two grain orientations) have an energy between 0.0 and dE added. This creates an effective driving force to reduce the potential energy of atoms near the boundary by pushing them towards one of the grain orientations. For dir $=1$ and $\mathrm{d}\mathrm{E}>0$ , the boundary will thus move so that the grain described by file0 grows and the grain described by file1 shrinks. Thus this fix is designed for simulations of two-grain systems, either with one grain boundary and free surfaces parallel to the boundary, or a system with periodic boundary conditions and two equal and opposite grain boundaries. In either case, the entire system can displace during the simulation, and such motion should be accounted for in measuring the grain boundary velocity.  

The potential energy added to atom I is given by these formulas  

$$
\xi_{i}=\sum_{j=1}^{12}\left|\mathbf{r}_{j}-\mathbf{r}_{j}^{\mathrm{I}}\right|
$$  

$$
\xi_{\operatorname{IJ}}=\sum_{j=1}^{12}\big|\mathbf{r}_{j}^{\operatorname{J}}-\mathbf{r}_{j}^{\operatorname{I}}\big|
$$  

$$
\begin{array}{r}{\xi_{\mathrm{low}}=\mathrm{cutlo}\xi_{\mathrm{IJ}}}\ {\xi_{\mathrm{high}}=\mathrm{cuthi}\xi_{\mathrm{IJ}}}\end{array}
$$  

$$
\omega_{i}=\frac{\pi}{2}\frac{\xi_{i}-\xi_{\mathrm{low}}}{\xi_{\mathrm{high}}-\xi_{\mathrm{low}}}
$$  

$$
\begin{array}{r l r l}&{u_{i}=0}&&{\mathrm{for}\quad\quad\xi_{i}<\xi_{\mathrm{low}}}\ &{\mathrm{=dE}\frac{1-\cos(2\omega_{i})}{2}}&&{\mathrm{for}\quad\quad\xi_{\mathrm{low}}<\xi_{i}<\xi_{\mathrm{high}}}\ &{\mathrm{=dE}}&&{\mathrm{for}\quad}&&{\xi_{\mathrm{high}}<\xi_{i}}\end{array}
$$  

which are fully explained in (Janssens). For fcc crystals this order parameter Xi for atom I in equation (1) is a sum over the 12 nearest neighbors of atom I. For bcc crystals it is the corresponding sum of the 8 nearest neighbors. Rj is the vector from atom I to its neighbor J, and RIj is a vector in the reference (perfect) crystal. That is, if $\mathrm{dir}=0/1$ , then RIj is a vector to an atom coord from file 0/1. Equation (2) gives the expected value of the order parameter XiIJ in the other grain. Hi and lo cutoffs are defined in equations (3) and (4), using the input parameters cutlo and cuthi as thresholds to avoid adding grain boundary energy when the deviation in the order parameter from 0 or 1 is small (e.g. due to thermal fluctuations in a perfect crystal). The added potential energy Ui for atom I is given in equation (6) where it is interpolated between 0 and dE using the two threshold Xi values and the Wi value of equation (5).  

The derivative of this energy expression gives the force on each atom which thus depends on the orientation of its neighbors relative to the 2 grain orientations. Only atoms near the grain boundary feel a net force which tends to drive them to one of the two grain orientations.  

In equation (1), the reference vector used for each neighbor is the reference vector closest to the actual neighbor position. This means it is possible two different neighbors will use the same reference vector. In such cases, the atom in question is far from a perfect orientation and will likely receive the full dE addition, so the effect of duplicate reference vector usage is small.  

The dir parameter determines which grain wants to grow at the expense of the other. A value of 0 means the first grain will shrink; a value of 1 means it will grow. This assumes that $d E$ is positive. The reverse will be true if $d E$ is negative.  

The alat parameter is the cubic lattice constant for the fcc or bcc material and is only used to compute a cutoff distance of $1.57~^{\ast}$ alat / sqrt(2) for finding the 12 or 8 nearest neighbors of each atom (which should be valid for an fcc or bcc crystal). A longer/shorter cutoff can be imposed by adjusting alat. If a particular atom has less than 12 or 8 neighbor within the cutoff, the order parameter of equation (1) is effectively multiplied by 12 or 8 divided by the actual number of neighbors within the cutoff.  

The $d E$ parameter is the maximum amount of additional energy added to each atom in the grain which wants to shrink.  

The cutlo and cuthi parameters are used to reduce the force added to bulk atoms in each grain far away from the boundary. An atom in the bulk surrounded by neighbors at the ideal grain orientation would compute an order parameter of 0 or 1 and have no force added. However, thermal vibrations in the solid will cause the order parameters to be greater than 0 or less than 1. The cutoff parameters mask this effect, allowing forces to only be added to atoms with orderparameters between the cutoff values.  

File0 and file1 are filenames for the two grains which each contain 6 vectors (6 lines with 3 values per line) which specify the grain orientations. Each vector is a displacement from a central atom (0,0,0) to a nearest neighbor atom in an fcc lattice at the proper orientation. The vector lengths should all be identical since an fcc lattice has a coordination number of 12. Only 6 are listed due to symmetry, so the list must include one from each pair of equal-and-opposite neighbors. A pair of orientation files for a Sigma ${}_{=5}$ tilt boundary are shown below. A tutorial that can help for writing the orientation files is given in (Wicaksono2)  

# 2.150.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the potential energy of atom interactions with the grain boundary driving force to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no.  

The fix_modify respa option is supported by these fixes. This allows to set at which level of the $r$ -RESPA integrator a fix is adding its forces. Default is the outermost level.  

This fix calculates a global scalar which can be accessed by various output commands. The scalar is the potentia energy change due to this fix. The scalar value calculated by this fix is “extensive”.  

This fix also calculates a per-atom array which can be accessed by various output commands. The array stores the order parameter Xi and normalized order parameter (0 to 1) for each atom. The per-atom values can be accessed on any timestep.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is not invoked during energy minimization.  

# 2.150.5 Restrictions  

These fixes are part of the ORIENT package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

These fixes should only be used with fcc or bcc lattices.  

# 2.150.6 Related commands  

fix_modify  

# 2.150.7 Default  

none  

(Janssens) Janssens, Olmsted, Holm, Foiles, Plimpton, Derlet, Nature Materials, 5, 124-127 (2006).  

(Wicaksono1) Wicaksono, Sinclair, Militzer, Computational Materials Science, 117, 397-405 (2016).   
(Wicaksono2) Wicaksono, figshare, https://doi.org/10.6084/m9.figshare.1488628.v1 (2015).  

For illustration purposes, here are example files that specify a $\mathrm{Sigma}{=}5<100>$ tilt boundary. This is for a lattice constant of 3.5706 Angs.  

file0:  

file1:   


<html><body><table><tr><td>0.798410432046075</td><td>1.785300000000000</td><td>1.596820864092150</td></tr><tr><td>-0.798410432046075</td><td>1.785300000000000</td><td>-1.596820864092150</td></tr><tr><td>2.395231296138225</td><td>0.000000000000000</td><td>0.798410432046075</td></tr><tr><td>0.798410432046075</td><td>0.000000000000000</td><td>-2.395231296138225</td></tr><tr><td>1.596820864092150</td><td>1.785300000000000</td><td>-0.798410432046075</td></tr><tr><td>1.596820864092150</td><td>-1.785300000000000</td><td>-0.798410432046075</td></tr></table></body></html>  

<html><body><table><tr><td>-0.798410432046075</td><td>1.785300000000000</td><td>1.596820864092150</td></tr><tr><td>0.798410432046075</td><td>1.785300000000000</td><td>-1.596820864092150</td></tr><tr><td>0.798410432046075</td><td>0.000000000000000</td><td>2.395231296138225</td></tr><tr><td>2.395231296138225</td><td>0.000000000000000</td><td>-0.798410432046075</td></tr><tr><td>1.596820864092150</td><td>1.785300000000000</td><td>0.798410432046075</td></tr><tr><td>1.596820864092150</td><td>-1.785300000000000</td><td>0.798410432046075</td></tr></table></body></html>  

# 2.151 fix orient/eco command  

<html><body><table><tr><td>fix ID group-ID orient/eco uO eta cutoff orientationsFile</td></tr></table></body></html>  

• ID, group-ID are documented in fix command • $\mathrm{u}0=$ energy added to each atom (energy units) • eta $=$ cutoff value (usually 0.25) • cutof $=$ cutoff radius for orientation parameter calculation • orientationsFile $=$ file that specifies orientation of each grain  

# 2.151.1 Examples  

fix gb all orient/eco 0.08 0.25 3.524 sigma5.ori  

# 2.151.2 Description  

The fix applies a synthetic driving force to a grain boundary which can be used for the investigation of grain boundary motion. The affiliation of atoms to either of the two grains forming the grain boundary is determined from an orientation-dependent order parameter as described in (Ulomek). The potential energy of atoms is either increased by an amount of $0.5{^{*}u}O$ or $-0.5{}^{*}u O$ according to the orientation of the surrounding crystal. This creates a potential energy gradient which pushes atoms near the grain boundary to orient according to the energetically favorable grain orientation. This fix is designed for applications in bicrystal system with one grain boundary and open ends, or two opposite grain boundaries in a periodic system. In either case, the entire system can experience a displacement during the simulation which needs to be accounted for in the evaluation of the grain boundary velocity. While the basic method is described in (Ulomek), the implementation follows the efficient implementation from (Schratt & Mohles).  

The synthetic potential energy added to an atom j is given by the following formulas  

$$
\begin{array}{c}{\displaystyle\vert W\left\vert\overrightarrow{r}_{j k}\right\vert=w_{j k}=\left\{\begin{array}{l l}{\displaystyle\frac{\vert\overrightarrow{r}_{j k}\vert^{2}}{r_{j k}^{2}}-2\frac{\vert\overrightarrow{r}_{j k}\vert^{2}}{r_{j k}^{2}}+1,}&{\displaystyle\vert\vec{r}_{j k}\vert<r_{\mathrm{cut}}}\ {\displaystyle0,}&{\displaystyle\vert\vec{r}_{j k}\vert\geq r_{\mathrm{cut}}}\end{array}\right.}\ {\displaystyle\chi_{j}=\frac{1}{N}\sum_{l=1}^{3}\left[\left\vert\psi_{l}^{1}(\vec{r}_{j})\right\vert^{2}-\left\vert\psi_{l}^{1}(\vec{r}_{j})\right\vert^{2}\right]}\ {\displaystyle\psi_{l}^{1}(\vec{r}_{j})=\sum_{k\in\mathbf{g}}w_{j k}\exp\left(\mathrm{i}\vec{r}_{j k}\cdot\vec{q}_{l}^{N}\right)}\ {\displaystyle\left.u(\chi_{j})=\frac{u_{0}}{2}\left\{\begin{array}{l l}{\displaystyle1,}&{\displaystyle\chi_{j}\geq\eta}\ {\displaystyle\sin\left(\frac{\pi\chi_{j}}{2\eta}\right),}&{-\eta<\chi_{j}<\eta}\ {\displaystyle-1,}&{\displaystyle\chi_{j}\leq-\eta}\end{array}\right.}\end{array}
$$  

which are fully explained in (Ulomek) and (Schratt & Mohles).  

The force on each atom is the negative gradient of the synthetic potential energy. It depends on the surrounding of this atom. An atom far from the grain boundary does not experience a synthetic force as its surrounding is that of an oriented single crystal and thermal fluctuations are masked by the parameter eta. Near the grain boundary however, the gradient is nonzero and synthetic force terms are computed. The orientationsFile specifies the perfect oriented crystal basis vectors for the two adjoining crystals. The first three lines (line $\mathrel{\mathop:}=$ row vector) for the energetically penalized and the last three lines for the energetically favored grain assuming $u0$ is positive. For negative $u0$ , this is reversed. With the cutoff parameter, the size of the region around each atom which is used in the order parameter computation is defined. The cutoff must be smaller than the interaction range of the MD potential. It should at least include the nearest neighbor shell. For high temperatures or low angle grain boundaries, it might be beneficial to increase the cutoff in order to get a more precise identification of the atoms surrounding. However, computation time will increase as more atoms are considered in the order parameter and force computation. It is also worth noting that the cutoff radius must not exceed the communication distance for ghost atoms in LAMMPS. With orientationsFile, the 6 oriented crystal basis vectors is specified. Each line of the input file contains the three components of a primitive lattice vector oriented according to the grain orientation in the simulation box. The first (last) three lines correspond to the primitive lattice vectors of the first (second) grain. An example for a $\Sigma\langle001\rangle$ mis-orientation is given at the end.  

If no synthetic energy difference between the grains is created, $u0=0$ , the force computation is omitted. In this case, still, the order parameter of the driving force is computed and can be used to track the grain boundary motion throughout the simulation.  

# 2.151.3 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the potential energy of atom interactions with the grain boundary driving force to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no.  

This fix calculates a per-atom array with 2 columns, which can be accessed by indices 1-1 by any command that uses per-atom values from a fix as input. See the Howto output doc page for an overview of LAMMPS output options.  

The first column is the order parameter for each atom; the second is the thermal masking value for each atom. Both are described above.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.151.4 Restrictions  

This fix is part of the ORIENT package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.151.5 Related commands  

fix_modify fix_orient  

# 2.151.6 Default  

none  

(Ulomek) Ulomek, Brien, Foiles, Mohles, Modelling Simul. Mater. Sci. Eng. 23 (2015) 025007   
(Schratt & Mohles) Schratt, Mohles. Comp. Mat. Sci. 182 (2020) 109774  

For illustration purposes, here is an example file that specifies a $\Sigma=5\langle001\rangle$ tilt grain boundary. This is for a lattice constant of 3.52 Angstrom:  

sigma5.ori:  

1.671685 0.557228 1.76212   
0.557228 -1.671685 1.76212   
2.228913 -1.114456 0.00000   
0.557228 1.671685 1.76212   
1.671685 -0.557228 1.76212   
2.228913 1.114456 0.00000  

# 2.152 fix pafi command  

# 2.152.1 Syntax  

fix ID group-ID pafi compute-ID Temp Tdamp seed keyword values...  

• ID, group-ID are documented in fix command   
• paf $=$ style name of this fix command   
• compute- $\mathrm{\cdotID}=\mathrm{ID}$ of a compute property/atom that holds data used by this fix   
• Temp $=$ desired temperature (temperature units)   
• Tdamp $=$ damping parameter (time units)   
• seed $=$ random number seed to use for white noise (positive integer)   
• keyword $=$ overdamped or com overdamped value $\mathrm{\Delta}=\mathrm{yes}$ or no or 1 or 0 yes or $1=$ Brownian (overdamped) integration in hyperplane no or $0=$ Langevin integration in hyperplane com value $\mathrm{~\small~\alpha~}=\mathrm{yes}$ or no or 1 or 0 yes or $1=\mathrm{zero}$ linear momentum, fixing center or mass (recommended) no or $0=\mathrm{do}$ not zero linear momentum, allowing center of mass drift  

# 2.152. fix pafi command  

# 2.152.2 Examples  

compute pa all property/atom d_nx d_ny d_nz d_dnx d_dny d_dnz d_ddnx d_ddny d_ddnz   
run 0 post no   
fix hp all pafi pa 500.0 0.01 434 overdamped yes  

# 2.152.3 Description  

Perform Brownian or Langevin integration whilst constraining the system to lie in some hyperplane, which is expected to be the tangent plane to some reference pathway in a solid state system. The instantaneous value of a modified force projection is also calculated, whose time integral can be shown to be equal to the true free energy gradient along the minimum free energy path local to the reference pathway. A detailed discussion of the projection technique can be found in (Swinburne).  

This fix can be used with LAMMPS as demonstrated in examples/PACKAGES/pafi, though it is primarily intended to be coupled with the PAFI $\mathrm{C}{+}{+}$ code, developed at https://github.com/tomswinburne/pafi, which distributes multiple LAMMPS workers in parallel to compute and collate hyperplane-constrained averages, allowing the calculation of free energy barriers and pathways.  

A compute property/atom must be provided with 9 fields per atom coordinate, which in order are the x,y,z coordinates of a configuration on the reference path, the x,y,z coordinates of the path tangent (derivative of path position with path coordinate) and the x,y,z coordinates of the change in tangent (derivative of path tangent with path coordinate).  

A 4-element vector is also calculated by this fix. The 4 components are the modified projected force, its square, the expected projection of the minimum free energy path tangent on the reference path tangent and the minimum image distance between the current configuration and the reference configuration, projected along the path tangent. This latter value should be essentially zero.  

![](images/ba3ffc2755ca26541e22816eaf5081cef80cafe913c72f2c66310dff79589a56.jpg)  

# Note  

When $_\mathrm{com=yes/1}$ , which is recommended, the provided tangent vector must also have zero center of mass. This can be achieved by subtracting from each coordinate of the path tangent the average x,y,z value. The PAFI $\mathrm{C}{+}{+}$ code (see above) can generate these paths for use in LAMMPS.  

![](images/e3bbe1128d887b9140823a9670f4f6c98cf9b3d953c1f4c125a0f2a6c73a4e52.jpg)  

# Note  

When overdamped=yes/1, the Tdamp parameter should be around 5-10 times smaller than that used in typical Langevin integration. See fix langevin for typical values.  

# 2.152.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.   
This fix produces a global vector each timestep which can be accessed by various output commands.  

# 2.152.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.152.6 Default  

The option defaults are $\mathrm{com}=y e s$ , overdamped $=n o$  

(Swinburne) Swinburne and Marinica, Physical Review Letters, 120, 1 (2018)  

# 2.153 fix pair command  

# 2.153.1 Syntax  

fix ID group-ID pair N pstyle name flag ...  

• ID, group-ID are documented in fix command   
• pair $=$ style name of this fix command   
• $\Nu=$ invoke this fix once every N timesteps   
• pstyle $=$ name of pair style to extract info from (e.g. eam)   
• one or more name/flag pairs can be listed   
• name $=$ name of quantity the pair style allows extraction of   
• flag $=1$ if pair style needs to be triggered to produce data for name, 0 if not  

# 2.153.2 Examples  

<html><body><table><tr><td>fix request all pair 100 eam rho 0</td></tr><tr><td>fix request all pair 100 amoeba uind 0 uinp 0</td></tr><tr><td></td></tr></table></body></html>  

# 2.153.3 Description  

Added in version 15Sep2022.  

Extract per-atom quantities from a pair style and store them in this fix so they can be accessed by other LAMMPS commands, e.g. by a dump command or by another fix, compute, or variable command.  

These are example use cases:  

• extract per-atom density from pair_style eam to a dump file   
• extract induced dipoles from pair_style amoeba to a dump file   
• extract accuracy metrics from a machine-learned potential to trigger output when a condition is met (see the dump_modify skip command)  

The $N$ argument determines how often the fix is invoked.  

The pstyle argument is the name of the pair style. It can be a sub-style used in a pair_style hybrid command. If there are multiple sub-styles using the same pair style, then pstyle should be specified as “style:N”, where $N$ is the number of the instance of the pair style you wish monitor (e.g., the first or second). For example, pstyle could be specified as “pace/extrapolation” or “amoeba” or “eam:1” or “eam:2”.  

One or more name/flag pairs of arguments follow. Each name is a per-atom quantity which the pair style must recognize as an extraction request. See the doc pages for individual pair_styles to see what fix pair requests (if any) they support.  

The flag setting determines whether this fix will also trigger the pair style to compute the named quantity so it can be extracted. If the quantity is always computed by the pair style, no trigger is needed; specify $\mathit{f l a g}=0$ . If the quantity is not always computed (e.g. because it is expensive to calculate), then specify $\mathit{f l a g}=1$ . This will trigger the quantity to be calculated only on timesteps it is needed. Again, see the doc pages for individual pair_styles to determine which fix pair requests (if any) need to be triggered with a $\mathit{f l a g}=1$ setting.  

The per-atom data extracted from the pair style is stored by this fix as either a per-atom vector or array. If there is only one name argument specified and the pair style computes a single value for each atom, then this fix stores it as a per-atom vector. Otherwise a per-atom array is created, with its data in the order of the name arguments.  

For example, pair_style amoeba allows extraction of two named quantities: “uind” and “uinp”, both of which are 3- vectors for each atom, i.e. dipole moments. In the example below a 6-column per-atom array will be created. Columns 1-3 will store the “uind” values; columns 4-6 will store the “uinp” values.  

pair_style amoeba fix ex all pair 10 amoeba uind 0 uinp 0  

# 2.153.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

As explained above, this fix produces a per-atom vector or array which can be accessed by various output commands. If an array is produced, the number of columns is the sum of the number of per-atom quantities produced by each name argument requested from the pair style.  

# 2.153.5 Restrictions  

none  

# 2.153.6 Related commands  

compute pair  

# 2.153.7 Default  

none  

# 2.154 fix phonon command  

# 2.154.1 Syntax  

fix ID group-ID phonon N Noutput Nwait map_file prefix keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• phonon $=$ style name of this fix command   
• $\Nu=$ measure the Green’s function every this many timesteps   
• Noutput $=$ output the dynamical matrix every this many measurements   
• Nwait $=$ wait this many timesteps before measuring   
• map_file $=$ file or GAMMA  

file is the file that contains the mapping info between atom ID and the lattice indices.  

GAMMA flags to treate the whole simulation box as a unit cell, so that the mapping info can be generated internally. In this case, dynamical matrix at only the gamma-point will/can be evaluated.  

• prefix $=$ prefix for output files   
• one or none keyword/value pairs may be appended   
• keyword $=$ sysdim or nasr sysdim value $=\mathrm{d}$ $\mathrm{d}=$ dimension of the system, usually the same as the MD model dimension nasr value $=\mathrm{~n~}$ $\mathrm{~n~}=$ number of iterations to enforce the acoustic sum rule  

# 2.154.2 Examples  

<html><body><table><tr><td>fix 1 all phonon 20 5000 200000 ) map.in LJ1D sysdim 1</td></tr></table></body></html>  

# 2.154.3 Description  

Calculate the dynamical matrix from molecular dynamics simulations based on fluctuation-dissipation theory for a group of atoms.  

Consider a crystal with $N$ unit cells in three dimensions labeled $l=(l_{1},l_{2},l_{3})$ where $l_{i}$ are integers. Each unit cell is defined by three linearly independent vectors ${\bf a}_{1},{\bf a}_{2},{\bf a}_{3}$ forming a parallelepiped, containing $K$ basis atoms labeled $k$ .  

Based on fluctuation-dissipation theory, the force constant coefficients of the system in reciprocal space are given by (Campana , Kong)  

$$
\mathbf{\delta}^{\mathbf{u}}\alpha\mathbf{,}k^{\prime}\beta^{\mathbf{(q)}}=k_{B}T\mathbf{G}_{k\alpha,k^{\prime}\beta}^{-1}(\mathbf{q})
$$  

where $\mathbf{G}$ is the Green’s functions coefficients given by  

$$
\mathbf{G}_{k\alpha,k^{\prime}\beta}(\mathbf{q})=\left\langle\mathbf{u}_{k\alpha}(\mathbf{q})\bullet\mathbf{u}_{k^{\prime}\beta}^{\ast}(\mathbf{q})\right\rangle
$$  

where $\langle\ldots\rangle$ denotes the ensemble average, and  

$$
{\bf u}_{k\alpha}({\bf q})=\sum_{l}{\bf u}_{l k\alpha}\exp{(i{\bf q r}_{l})}
$$  

is the $\alpha$ component of the atomic displacement for the $k$ th atom in the unit cell in reciprocal space at $\mathbf{q}$ . In practice, the Green’s functions coefficients can also be measured according to the following formula,  

$$
\begin{array}{r}{\boldsymbol{\mathbf{G}}_{k\alpha,k^{\prime}\beta}(\boldsymbol{\mathbf{q}})=\left\langle\boldsymbol{\mathbf{R}}_{k\alpha}(\boldsymbol{\mathbf{q}})\boldsymbol{\mathbf{\cdot}}\boldsymbol{\mathbf{R}}_{k^{\prime}\beta}^{*}(\boldsymbol{\mathbf{q}})\right\rangle-\left\langle\boldsymbol{\mathbf{R}}\right\rangle_{k\alpha}(\boldsymbol{\mathbf{q}})\boldsymbol{\mathbf{\bullet}}\left\langle\boldsymbol{\mathbf{R}}\right\rangle_{k^{\prime}\beta}^{*}(\boldsymbol{\mathbf{q}})}\end{array}
$$  

where $\mathbf{R}$ is the instantaneous positions of atoms, and $\langle\mathbf{R}\rangle$ is the averaged atomic positions. It gives essentially the same results as the displacement method and is easier to implement in an MD code.  

Once the force constant matrix is known, the dynamical matrix $\mathbf{D}$ can then be obtained by  

$$
\mathbf{D}_{k\alpha,k^{\prime}\beta}(\mathbf{q})=(m_{k}m_{k^{\prime}})^{-\frac{1}{2}}\mathbf{\mathbb{1}}_{k\alpha,k^{\prime}\beta}(\mathbf{q})
$$  

whose eigenvalues are exactly the phonon frequencies at $\mathbf{q}$ .  

This fix uses positions of atoms in the specified group and calculates two-point correlations. To achieve this. the positions of the atoms are examined every Nevery steps and are Fourier-transformed into reciprocal space, where the averaging process and correlation computation is then done. After every Noutput measurements, the matrix $\mathbf{G}(\mathbf{q})$ is calculated and inverted to obtain the elastic stiffness coefficients. The dynamical matrices are then constructed and written to prefix.bin.timestep files in binary format and to the file prefix.log for each wave-vector $\mathbf{q}$ .  

# 2.154. fix phonon command  

A detailed description of this method can be found in (Kong2011).  

The sysdim keyword is optional. If specified with a value smaller than the dimensionality of the LAMMPS simulation, its value is used for the dynamical matrix calculation. For example, using LAMMPS to model a 2D or 3D system, the phonon dispersion of a 1D atomic chain can be computed using sysdim $=1$ .  

The nasr keyword is optional. An iterative procedure is employed to enforce the acoustic sum rule on $\Phi$ at $\Gamma$ , and the number provided by keyword nasr gives the total number of iterations. For a system whose unit cell has only one atom, $n a s r=1$ is sufficient; for other systems, $n a s r=10$ is typically sufficient.  

The map_file contains the mapping information between the lattice indices and the atom IDs, which tells the code which atom sits at which lattice point; the lattice indices start from 0. An auxiliary code, latgen, can be employed to generate the compatible map file for various crystals.  

In case one simulates a non-periodic system, where the whole simulation box is treated as a unit cell, one can set map_file as GAMMA, so that the mapping info will be generated internally and a file is not needed. In this case, the dynamical matrix at only the gamma-point will/can be evaluated. Please keep in mind that fix-phonon is designed for cyrstals, it will be inefficient and even degrade the performance of LAMMPS in case the unit cell is too large.  

The calculated dynamical matrix elements are written out in energy/distance^2/mass units. The coordinates for $q$ points in the log file is in the units of the basis vectors of the corresponding reciprocal lattice.  

# 2.154.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify temp option is supported by this fix. You can use it to change the temperature compute from thermo_temp to the one that reflects the true temperature of atoms in the group.  

No global scalar or vector or per-atom quantities are stored by this fix for access by various output commands.  

Instead, this fix outputs its initialization information (including mapping information) and the calculated dynamical matrices to the file prefix.log, with the specified prefix. The dynamical matrices are also written to files prefix.bin.timestep in binary format. These can be read by the post-processing tool in tools/phonon to compute the phonon density of states and/or phonon dispersion curves.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is not invoked during energy minimization.  

# 2.154.5 Restrictions  

This fix assumes a crystalline system with periodical lattice. The temperature of the system should not exceed the melting temperature to keep the system in its solid state.  

This fix is part of the PHONON package. It is only enabled if LAMMPS was built with that package. This fix also requires LAMMPS to be built with 3d-FFT support which is included in the KSPACE package. See the Build package page for more info.  

# 2.154.6 Related commands  

compute msd, dynamical_matrix  

# 2.154.7 Default  

The option defaults are sysdim $=$ the same dimension as specified by the dimension command, and nasr $=20$ .  

(Kong) L.T. Kong, G. Bartels, C. Campana, C. Denniston, and Martin H. Muser, Implementation of Green’s function molecular dynamics: An extension to LAMMPS, Computer Physics Communications [180](6):1004-1010 (2009). L.T. Kong, C. Denniston, and Martin H. Muser, An improved version of the Green’s function molecular dynamics method, Computer Physics Communications [182](2):540-541 (2011).   
(Kong2011) L.T. Kong, Phonon dispersion measured directly from molecular dynamics simulations, Computer Physics Communications [182](10):2201-2207, (2011).  

# 2.155 fix pimd/langevin command  

# 2.156 fix pimd/nvt command  

# 2.156.1 Syntax  

fix ID group-ID style keyword value ...  

• ID, group-ID are documented in fix command   
• style $=$ pimd/langevin or pimd/nvt $=$ style name of this fix command   
• zero or more keyword/value pairs may be appended   
• keywords for style pimd/nvt keywords $=$ method or fmass or sp or temp or nhc method value $=$ pimd or nmpimd or cmd fmass value $=$ scaling factor on mass sp value $=$ scaling factor on Planck constant temp value $=$ temperature (temperature units) nhc value $={\mathrm{Nc}}=$ number of chains in Nose-Hoover thermostat  

• keywords for style pimd/langevin  

keywords $=$ method or integrator or ensemble or fmmode or fmass or scale or temp or thermosta   
$\hookrightarrow\mathrm{Or}$ tau or iso or aniso or barostat or taup or fixcom or lj   
method value $=$ nmpimd (default) or pimd   
integrator value $=$ obabo or baoab   
fmmode value = physical or normal   
fmass value $-$ scaling factor on mass   
temp value = temperature (temperature unit) temperature = target temperature of the thermostat   
thermostat values $-$ style seed style value = PILE_L seed = random number generator seed   
tau value = thermostat damping parameter (time unit)   
scale value = scaling factor of the damping times of non-centroid modes of PILE_L thermostat   
iso or aniso values $-$ pressure (pressure unit) pressure = scalar external pressure of the barostat   
barostat value = BZP or MTTK   
taup value = barostat damping parameter (time unit)   
fixcom value = yes or no   
lj values = epsilon sigma mass planck mvv2e epsilon $-$ energy scale for reduced units (energy units) sigma = length scale for reduced units (length units) mass $-$ mass scale for reduced units (mass units) planck $=$ Planck's constant for other unit style  

${\mathrm{mvv2e}}={\mathrm{mass}}^{*}$ velocity $\widehat{\mathbf{\xi}}^{2}$ to energy conversion factor for other unit style  

# 2.156.2 Examples  

fix 1 all pimd/nvt method nmpimd fmass 1.0 sp 2.0 temp 300.0 nhc 4   
fix 1 all pimd/langevin ensemble npt integrator obabo temp 113.15 thermostat PILE_L 1234 tau 1.0 iso 1. $\rightarrow0$ barostat BZP taup 1.0  

# 2.156.3 Description  

Changed in version 28Mar2023.  

Fix pimd was renamed to fix pimd/nvt and fix pimd/langevin was added.  

These fix commands perform quantum molecular dynamics simulations based on the Feynman path-integral to include effects of tunneling and zero-point motion. In this formalism, the isomorphism of a quantum partition function for the original system to a classical partition function for a ring-polymer system is exploited, to efficiently sample configurations from the canonical ensemble (Feynman).  

The classical partition function and its components are given by the following equations:  

$$
\begin{array}{l}{{\displaystyle{\cal Z}=\int d{\bf q}d{\bf p}\cdot\exp[-\beta H_{e f f}]}~}\ {{\displaystyle H_{e f f}=\left(\sum_{i=1}^{P}\frac{p_{i}^{2}}{2M_{i}}\right)+V_{e f f}}~}\ {{\displaystyle V_{e f f}=\sum_{i=1}^{P}\left[\frac{m P}{2\beta^{2}\hbar^{2}}(q_{i}-q_{i+1})^{2}+\frac{1}{P}V(q_{i})\right]}}\end{array}
$$  

$M_{i}$ is the fictitious mass of the $i$ -th mode, and m is the actual mass of the atoms.  

The interested user is referred to any of the numerous references on this methodology, but briefly, each quantum particle in a path integral simulation is represented by a ring-polymer of $\mathrm{\bfP}$ quasi-beads, labeled from 1 to P. During the simulation, each quasi-bead interacts with beads on the other ring-polymers with the same imaginary time index (the second term in the effective potential above). The quasi-beads also interact with the two neighboring quasi-beads through the spring potential in imaginary-time space (first term in effective potential). To sample the canonical ensemble, any thermostat can be applied.  

Fix pimd/nvt applies a Nose-Hoover massive chain thermostat (Tuckerman). With the massive chain algorithm, a chain of NH thermostats is coupled to each degree of freedom for each quasi-bead. The keyword temp sets the target temperature for the system and the keyword nhc sets the number Nc of thermostats in each chain. For example, for a simulation of N particles with P beads in each ring-polymer, the total number of NH thermostats would be $3\mathrm{~x~N~x~P~x~}$ Nc.  

Fix pimd/langevin implements a Langevin thermostat in the normal mode representation, and also provides a barostat to sample the NPH/NPT ensembles.  

![](images/a2c6d9d432197975edd2e1651842f82e5fd2909b2a3977e7ec8177ebb466215a.jpg)  

# Note  

Both these fix styles implement a complete velocity-verlet integrator combined with a thermostat, so no other time integration fix should be used.  

The method keyword determines what style of PIMD is performed. A value of pimd is standard PIMD. A value of nmpimd is for normal-mode PIMD. A value of cmd is for centroid molecular dynamics (CMD). The difference between the styles is as follows.  

In standard PIMD, the value used for a bead’s fictitious mass is arbitrary. A common choice is to use $M_{i}=m/P$ , which results in the mass of the entire ring-polymer being equal to the real quantum particle. But it can be difficult to efficiently integrate the equations of motion for the stiff harmonic interactions in the ring polymers.  

A useful way to resolve this issue is to integrate the equations of motion in a normal mode representation, using Normal Mode Path-Integral Molecular Dynamics (NMPIMD) (Cao1). In NMPIMD, the NH chains are attached to each normal mode of the ring-polymer and the fictitious mass of each mode is chosen as $\mathrm{Mk}=$ the eigenvalue of the Kth normal mode for $\mathbf{k}>0$ . The $\mathbf{k}=0$ mode, referred to as the zero-frequency mode or centroid, corresponds to overall translation of the ring-polymer and is assigned the mass of the real particle.  

![](images/7b24f0fc778a6a2583297e07a1dda22eb5317643f06af97f668aebcb841655db.jpg)  

# Note  

Motion of the centroid can be effectively uncoupled from the other normal modes by scaling the fictitious masses to achieve a partial adiabatic separation. This is called a Centroid Molecular Dynamics (CMD) approximation (Cao2). The time-evolution (and resulting dynamics) of the quantum particles can be used to obtain centroid time correlation functions, which can be further used to obtain the true quantum correlation function for the original system. The CMD method also uses normal modes to evolve the system, except only the $\mathbf{k}>0$ modes are thermostatted, not the centroid degrees of freedom.  

Added in version 21Nov2023: Mode pimd added to fix pimd/langevin.  

Fix pimd/langevin supports the method values nmpimd and pimd. The default value is nmpimd. If method is nmpimd, the normal mode representation is used to integrate the equations of motion. The exact solution of harmonic oscillator is used to propagate the free ring polymer part of the Hamiltonian. If method is pimd, the Cartesian representation is used to integrate the equations of motion. The harmonic force is added to the total force of the system, and the numerical integrator is used to propagate the Hamiltonian.  

The keyword integrator specifies the Trotter splitting method used by fix pimd/langevin. See (Liu) for a discussion on the OBABO and BAOAB splitting schemes. Typically either of the two should work fine.  

The keyword fmass sets a further scaling factor for the fictitious masses of beads, which can be used for the Partial Adiabatic CMD (Hone), or to be set as P, which results in the fictitious masses to be equal to the real particle masses.  

The keyword fmmode of fix pimd/langevin determines the mode of fictitious mass preconditioning. There are two options: physical and normal. If fmmode is physical, then the physical mass of the particles are used (and then multiplied by fmass). If fmmode is normal, then the physical mass is first multiplied by the eigenvalue of each normal mode, and then multiplied by fmass. More precisely, the fictitious mass of fix pimd/langevin is determined by two factors: fmmode and fmass. If fmmode is physical, then the fictitious mass is  

$$
M_{i}=\mathrm{fmass}\times m
$$  

If fmmode is normal, then the fictitious mass is  

$$
M_{i}=\mathrm{fmass}\times\lambda_{i}\times m
$$  

where $\lambda_{i}$ is the eigenvalue of the $i$ -th normal mode.  

![](images/74e28f90ff07a0b43ec2d898606e1035f8c945616b99f37a4b47b5d3b98371c9.jpg)  

# Note  

Fictitious mass is only used in the momentum of the equation of motion $(\mathbf{{p}}_{i}=M_{i}\mathbf{{v}}_{i})$ , and not used in the spring elastic energy $\begin{array}{r l}{(\sum_{i=1}^{P}{\frac{1}{2}}{\stackrel{\cdot}{m}}\omega_{P}^{2}(q_{i}-q_{i+1})^{2}}&{{}}\end{array}$ , $m$ is always the actual mass of the particles).  

The keyword $s p$ is a scaling factor on Planck’s constant, which can be useful for debugging or other purposes. The default value of 1.0 is appropriate for most situations.  

# 2.156. fix pimd/nvt command  

The keyword ensemble for fix style pimd/langevin determines which ensemble is it going to sample. The value can be nve (microcanonical), nvt (canonical), nph (isoenthalpic), and npt (isothermal-isobaric).  

The keyword temp specifies temperature parameter for fix styles pimd/nvt and pimd/langevin. It should read a positive floating-point number.  

![](images/8e3de3a9851c04959e637590429fcf494ed62f65a8543d7aa8ba48c489e101ab.jpg)  

# Note  

For pimd simulations, a temperature values should be specified even for nve ensemble. Temperature will make a difference for nve pimd, since the spring elastic frequency between the beads will be affected by the temperature.  

The keyword thermostat reads style and seed of thermostat for fix style pimd/langevin. style can only be $P I L E\_L$ (path integral Langevin equation local thermostat, as described in Ceriotti), and seed should a positive integer number, which serves as the seed of the pseudo random number generator.  

# Note  

The fix style pimd/langevin uses the stochastic PILE_L thermostat to control temperature. This thermostat works on the normal modes of the ring polymer. The tau parameter controls the centroid mode, and the scale parameter controls the non-centroid modes.  

The keyword tau specifies the thermostat damping time parameter for fix style pimd/langevin. It is in time unit. It only works on the centroid mode.  

The keyword scale specifies a scaling parameter for the damping times of the non-centroid modes for fix style pimd/langevin. The default damping time of the non-centroid mode $i$ is $\textstyle{\frac{P}{\beta\hbar}}{\sqrt{\lambda_{i}\times\operatorname{fmass}}}$ (fmmode is physical) or $\frac{P}{\beta\hbar}\sqrt{\mathrm{fmass}}$ (fmmode is normal). The damping times of all non-centroid modes are the default values divided by scale.  

The barostat parameters for fix style pimd/langevin with npt or nph ensemble is specified using one of iso and aniso keywords. A pressure value should be given with pressure unit. The keyword iso means couple all 3 diagonal components together when pressure is computed (hydrostatic pressure), and dilate/contract the dimensions together. The keyword aniso means x, y, and $\mathbf{Z}$ dimensions are controlled independently using the $\mathbf{Pr}\mathbf{X}\mathbf{X}$ , Pyy, and Pzz components of the stress tensor as the driving forces, and the specified scalar external pressure.  

The keyword barostat reads style of barostat for fix style pimd/langevin. style can be BZP (Bussi-Zykova-Parrinello, as described in Bussi) or MTTK (Martyna-Tuckerman-Tobias-Klein, as described in Martyna1 and Martyna2).  

The keyword taup specifies the barostat damping time parameter for fix style pimd/langevin. It is in time unit.  

The keyword fixcom specifies whether the center-of-mass of the extended ring-polymer system is fixed during the pimd simulation. Once fixcom is set to be yes, the center-of-mass velocity will be distracted from the centroid-mode velocities in each step.  

The keyword $l j$ should be used if lj units is used for fix pimd/langevin. Typically one may want to use reduced units to run the simulation, and then convert the results into some physical units (for example, metal units). In this case, the 5 quantities in the physical mass units are needed: epsilon (energy scale), sigma (length scale), mass, Planck’s constant, mvv2e (mass \* velocity^2 to energy conversion factor). Planck’s constant and mvv2e can be found in src/update.cpp. If there is no need to convert reduced units to physical units, you can omit the keyword $l j$ and these five values will be set to 1.  

The PIMD algorithm in LAMMPS is implemented as a hyper-parallel scheme as described in Calhoun. In LAMMPS this is done by using multi-replica feature in LAMMPS, where each quasi-particle system is stored and simulated on a separate partition of processors. The following diagram illustrates this approach. The original system with 2 ring polymers is shown in red. Since each ring has 4 quasi-beads (imaginary time slices), there are 4 replicas of the system, each running on one of the 4 partitions of processors. Each replica (shown in green) owns one quasi-bead in each ring.  

![](images/406fd4a950f5dcaa5badb8bf1608ea2fa476a02d9ef81e959aa243ec19b61472.jpg)  

To run a PIMD simulation with M quasi-beads in each ring polymer using N MPI tasks for each partition’s domaindecomposition, you would use $\mathbf{P}=\mathbf{M}\mathbf{x}\mathbf{N}$ processors (cores) and run the simulation as follows:  

mpirun -np P lmp_mpi -partition MxN -in script  

Note that in the LAMMPS input script for a multi-partition simulation, it is often very useful to define a uloop-style variable such as  

variable ibead uloop M pad  

where M is the number of quasi-beads (partitions) used in the calculation. The uloop variable can then be used to manage I/O related tasks for each of the partitions, e.g.  

dump dcd all dcd 10 system_\${ibead}.dcd   
dump 1 all custom 100 \${ibead}.xyz id type x y z vx vy vz ix iy iz fx fy fz   
restart 1000 system_\${ibead}.restart1 system_\${ibead}.restart2   
read_restart system_\${ibead}.restart2  

![](images/64a5f29adc6611a1c31321b1165a5c13f6bfc79e82213ff4003922a88aa3f7c7.jpg)  

# Note  

Fix pimd/langevin dumps the Cartesian coordinates, but dumps the velocities and forces in the normal mode representation. If the Cartesian velocities and forces are needed, it is easy to perform the transformation when doing post-processing.  

It is recommended to dump the image flags (ix iy iz) for fix pimd/langevin. It will be useful if you want to calculate some estimators during post-processing.  

Major differences of fix pimd/nvt and fix pimd/langevin are:  

1. Fix pimd/nvt includes Cartesian pimd, normal mode pimd, and centroid md. Fix pimd/langevin only intends to support normal mode pimd, as it is commonly enough for thermodynamic sampling.   
2. Fix pimd/nvt uses Nose-Hoover chain thermostat. Fix pimd/langevin uses Langevin thermostat.   
3. Fix pimd/langevin provides barostat, so the npt ensemble can be sampled. Fix pimd/nvt only support nvt ensemble.   
4. Fix pimd/langevin provides several quantum estimators in output.   
5. Fix pimd/langevin allows multiple processes for each bead. For fix pimd/nvt, there is a large chance that multiprocess tasks for each bead may fail.   
6. The dump of fix pimd/nvt are all Cartesian. Fix pimd/langevin dumps normal-mode velocities and forces, and Cartesian coordinates.  

Initially, the inter-replica communication and normal mode transformation parts of fix pimd/langevin are written based on those of fix pimd/nvt, but are significantly revised.  

# 2.156.4 Restart, fix_modify, output, run start/stop, minimize info  

Fix pimd/nvt writes the state of the Nose/Hoover thermostat over all quasi-beads to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

Fix pimd/langevin writes the state of the barostat overall beads to binary restart files. Since it uses a stochastic thermostat, the state of the thermostat is not written. However, the state of the system can be restored by reading the restart file, except that it will re-initialize the random number generator.  

None of the fix_modify options are relevant to fix pimd/nvt.  

Fix pimd/nvt computes a global 3-vector, which can be accessed by various output commands. The three quantities in the global vector are:  

1. the total spring energy of the quasi-beads,   
2. the current temperature of the classical system of ring polymers,   
3. the current value of the scalar virial estimator for the kinetic energy of the quantum system (Herman).  

The vector values calculated by fix pimd/nvt are “extensive”, except for the temperature, which is “intensive”.  

Fix pimd/langevin computes a global vector of quantities, which can be accessed by various output commands. Note that it outputs multiple log files, and different log files contain information about different beads or modes (see detailed explanations below). If ensemble is nve or nvt, the vector has 10 values:  

1. kinetic energy of the normal mode   
2. spring elastic energy of the normal mode   
3. potential energy of the bead   
4. total energy of all beads (conserved if ensemble is nve)   
5. primitive kinetic energy estimator   
6. virial energy estimator   
7. centroid-virial energy estimator   
8. primitive pressure estimator   
9. thermodynamic pressure estimator   
10. centroid-virial pressure estimator  

The first 3 are different for different log files, and the others are the same for different log files. If ensemble is nph or npt, the vector stores internal variables of the barostat. If iso is used, the vector has 15 values:  

1. kinetic energy of the normal mode   
2. spring elastic energy of the normal mode   
3. potential energy of the bead   
4. total energy of all beads (conserved if ensemble is nve)   
5. primitive kinetic energy estimator   
6. virial energy estimator   
7. centroid-virial energy estimator   
8. primitive pressure estimator   
9. thermodynamic pressure estimator   
10. centroid-virial pressure estimator   
11. barostat velocity   
12. barostat kinetic energy   
13. barostat potential energy   
14. barostat cell Jacobian   
15. enthalpy of the extended system (sum of 4, 12, 13, and 14; conserved if ensemble is nph)  

If aniso or $x$ or $y$ or $z$ is used for the barostat, the vector has 17 values:  

1. kinetic energy of the normal mode   
2. spring elastic energy of the normal mode   
3. potential energy of the bead   
4. total energy of all beads (conserved if ensemble is nve)   
5. primitive kinetic energy estimator   
6. virial energy estimator   
7. centroid-virial energy estimator   
8. primitive pressure estimator   
9. thermodynamic pressure estimator   
10. centroid-virial pressure estimator   
11. x component of barostat velocity   
12. y component of barostat velocity   
13. z component of barostat velocity   
14. barostat kinetic energy   
15. barostat potential energy  

# 2.156. fix pimd/nvt command  

16. barostat cell Jacobian   
17. enthalpy of the extended system (sum of 4, 14, 15, and 16; conserved if ensemble is nph)  

No parameter of fix pimd/nvt or pimd/langevin can be used with the start/stop keywords of the run command. Fix pimd/nvt or pimd/langevin is not invoked during energy minimization.  

# 2.156.5 Restrictions  

These fixes are part of the REPLICA package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Fix pimd/nvt cannot be used with lj units. Fix pimd/langevin can be used with lj units. See the above part for how to use it.  

A PIMD simulation can be initialized with a single data file read via the read_data command. However, this means all quasi-beads in a ring polymer will have identical positions and velocities, resulting in identical trajectories for all quasi-beads. To avoid this, users can simply initialize velocities with different random number seeds assigned to each partition, as defined by the uloop variable, e.g.  

velocity all create 300.0 1234\${ibead} rot yes dist gaussian  

# 2.156.6 Default  

The keyword defaults for fix pimd/nvt are method $=$ pimd, fmass $=1.0$ , $\mathrm{sp}=1.0$ , temp $=300.0$ , and nhc $=2$ .  

(Feynman) R. Feynman and A. Hibbs, Chapter 7, Quantum Mechanics and Path Integrals, McGraw-Hill, New Yor (1965).   
(Tuckerman) M. Tuckerman and B. Berne, J Chem Phys, 99, 2796 (1993).   
(Cao1) J. Cao and B. Berne, J Chem Phys, 99, 2902 (1993).   
(Cao2) J. Cao and G. Voth, J Chem Phys, 100, 5093 (1994).   
(Hone) T. Hone, P. Rossky, G. Voth, J Chem Phys, 124, 154103 (2006).   
(Calhoun) A. Calhoun, M. Pavese, G. Voth, Chem Phys Letters, 262, 415 (1996).   
(Herman) M. F. Herman, E. J. Bruskin, B. J. Berne, J Chem Phys, 76, 5150 (1982).   
(Bussi) G. Bussi, T. Zykova-Timan, M. Parrinello, J Chem Phys, 130, 074101 (2009).   
(Ceriotti) M. Ceriotti, M. Parrinello, T. Markland, D. Manolopoulos, J. Chem. Phys. 133, 124104 (2010).   
(Martyna1) G. Martyna, D. Tobias, M. Klein, J. Chem. Phys. 101, 4177 (1994).   
(Martyna2) G. Martyna, A. Hughes, M. Tuckerman, J. Chem. Phys. 110, 3275 (1999).   
(Liu) J. Liu, D. Li, X. Liu, J. Chem. Phys. 145, 024103 (2016).  

# 2.157 fix planeforce command  

# 2.157.1 Syntax  

fix ID group-ID planeforce x y z  

• ID, group-ID are documented in fix command • planeforce $=$ style name of this fix command  

• x y ${\bf Z}=3$ -vector that is normal to the plane  

# 2.157.2 Examples  

# 2.157.3 Description  

Adjust the forces on each atom in the group so that only the components of force in the plane specified by the normal vector (x,y,z) remain. This is done by subtracting out the component of force perpendicular to the plane.  

If the initial velocity of the atom is 0.0 (or in the plane), then it should continue to move in the plane thereafter.  

# 2.157.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

# 2.157.5 Restrictions  

none  

# 2.157.6 Related commands  

fix lineforce  

# 2.157.7 Default  

none  

# 2.158 fix plumed command  

# 2.158.1 Syntax  

fix ID group-ID plumed keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• plumed $=$ style name of this fix command   
• keyword $=$ plumedfile or outfile plumedfile $\mathrm{arg}=\mathrm{name}$ of PLUMED input file to use (default: NULL) outfile arg $=$ name of file on which to write the PLUMED log (default: NULL)  

# 2.158.2 Examples  

fix pl all plumed plumedfile plumed.dat outfile p.log  

# 2.158. fix plumed command  

# 2.158.3 Description  

This fix instructs LAMMPS to call the PLUMED library, which allows one to perform various forms of trajectory analysis on the fly and to also use methods such as umbrella sampling and metadynamics to enhance the sampling of phase space.  

The documentation included here only describes the fix plumed command itself. This command is LAMMPS specific, whereas most of the functionality implemented in PLUMED will work with a range of MD codes, and when PLUMED is used as a stand alone code for analysis. The full documentation for PLUMED is available online and included in the PLUMED source code. The PLUMED library development is hosted at https://github.com/plumed/plumed2 A detailed discussion of the code can be found in (Tribello).  

There is an example input for using this package with LAMMPS in the examples/PACKAGES/plumed directory.  

The command to make LAMMPS call PLUMED during a run requires two keyword value pairs pointing to the PLUMED input file and an output file for the PLUMED log. The user must specify these arguments every time PLUMED is to be used. Furthermore, the fix plumed command should appear in the LAMMPS input file after relevant input parameters (e.g. the timestep) have been set.  

The group- $.I D$ entry is ignored. LAMMPS will always pass all the atoms to PLUMED and there can only be one instance of the plumed fix at a time. The way the plumed fix is implemented ensures that the minimum amount of information required is communicated. Furthermore, PLUMED supports multiple, completely independent collective variables, multiple independent biases and multiple independent forms of analysis. There is thus really no restriction in functionality by only allowing only one plumed fix in the LAMMPS input.  

The plumedfile keyword allows the user to specify the name of the PLUMED input file. Instructions as to what should be included in a plumed input file can be found in the documentation for PLUMED  

The outfile keyword allows the user to specify the name of a file in which to output the PLUMED log. This log file normally just repeats the information that is contained in the input file to confirm it was correctly read and parsed. The names of the files in which the results are stored from the various analysis options performed by PLUMED will be specified by the user in the PLUMED input file.  

# 2.158.4 Restart, fix_modify, output, run start/stop, minimize info  

When performing a restart of a calculation that involves PLUMED you must include a RESTART command in the PLUMED input file as detailed in the PLUMED documentation. When the restart command is found in the PLUMED input PLUMED will append to the files that were generated in the run that was performed previously. No part of the PLUMED restart data is included in the LAMMPS restart files. Furthermore, any history dependent bias potentials that were accumulated in previous calculations will be read in when the RESTART command is included in the PLUMED input.  

The fix_modify energy option is supported by this fix to add the energy change from the biasing force added by PLUMED to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy yes.  

The fix_modify virial option is supported by this fix to add the contribution from the biasing force to the global pressure of the system via the compute pressure command. This can be accessed by thermodynamic output. The default setting for this fix is fix_modify virial yes.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the PLUMED energy mentioned above. The scalar value calculated by this fix is “extensive”.  

Note that other quantities of interest can be output by commands that are native to PLUMED.  

# 2.158.5 Restrictions  

This fix is part of the PLUMED package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

There can only be one fix plumed command active at a time.  

# 2.158.6 Related commands  

fix smd fix colvars  

# 2.158.7 Default  

The default options are plumedfile $=$ NULL and outfile $=$ NULL  

(Tribello) G.A. Tribello, M. Bonomi, D. Branduardi, C. Camilloni and G. Bussi, Comp. Phys. Comm 185, 604 (2014)  

# 2.159 fix poems command  

# 2.159.1 Syntax  

fix ID group-ID poems keyword values  

• ID, group-ID are documented in fix command   
• poems $=$ style name of this fix command   
• keyword $=$ group or file or molecule group values $=$ list of group IDs molecule values $=$ none file values $=$ filename  

# 2.159.2 Examples  

fix 3 fluid poems group clump1 clump2 clump3 fix 3 fluid poems file cluster.list  

# 2.159.3 Description  

Treats one or more sets of atoms as coupled rigid bodies. This means that each timestep the total force and torque on each rigid body is computed and the coordinates and velocities of the atoms are updated so that the collection of bodies move as a coupled set. This can be useful for treating a large biomolecule as a collection of connected, coarse-grained particles.  

The coupling, associated motion constraints, and time integration is performed by the software package Parallelizable Open source Efficient Multibody Software (POEMS) which computes the constrained rigid-body motion of articulated (jointed) multibody systems (Anderson). POEMS was written and is distributed by Prof Kurt Anderson, his graduate student Rudranarayan Mukherjee, and other members of his group at Rensselaer Polytechnic Institute (RPI). Rudranarayan developed the LAMMPS/POEMS interface. For copyright information on POEMS and other details, please refer to the documents in the poems directory distributed with LAMMPS.  

This fix updates the positions and velocities of the rigid atoms with a constant-energy time integration, so you should not update the same atoms via other fixes (e.g. nve, nvt, npt, temp/rescale, langevin).  

# 2.159. fix poems command  

Each body must have a non-degenerate inertia tensor, which means if must contain at least 3 non-collinear atoms.   
Which atoms are in which bodies can be defined via several options.  

For option group, each of the listed groups is treated as a rigid body. Note that only atoms that are also in the fix group are included in each rigid body.  

For option molecule, each set of atoms in the group with a different molecule ID is treated as a rigid body.  

For option file, sets of atoms are read from the specified file and each set is treated as a rigid body. Each line of the file specifies a rigid body in the following format:  

ID type atom1-ID atom2-ID atom3-ID . . .  

ID as an integer from 1 to M (the number of rigid bodies). Type is any integer; it is not used by the fix poems command. The remaining arguments are IDs of atoms in the rigid body, each typically from 1 to N (the number of atoms in the system). Only atoms that are also in the fix group are included in each rigid body. Blank lines and lines that begin with ‘#’ are skipped.  

A connection between a pair of rigid bodies is inferred if one atom is common to both bodies. The POEMS solver treats that atom as a spherical joint with 3 degrees of freedom. Currently, a collection of bodies can only be connected by joints as a linear chain. The entire collection of rigid bodies can represent one or more chains. Other connection topologies (tree, ring) are not allowed, but will be added later. Note that if no joints exist, it is more efficient to use the fix rigid command to simulate the system.  

When the poems fix is defined, it will print out statistics on the total # of clusters, bodies, joints, atoms involved. A cluster in this context means a set of rigid bodies connected by joints.  

For computational efficiency, you should turn off pairwise and bond interactions within each rigid body, as they no longer contribute to the motion. The “neigh_modify exclude” and “delete_bonds” commands can be used to do this if each rigid body is a group.  

For computational efficiency, you should only define one fix poems which includes all the desired rigid bodies.   
LAMMPS will allow multiple poems fixes to be defined, but it is more expensive.  

The degrees-of-freedom removed by coupled rigid bodies are accounted for in temperature and pressure computations. Similarly, the rigid body contribution to the pressure virial is also accounted for. The latter is only correct if forces within the bodies have been turned off, and there is only a single fix poems defined.  

# 2.159.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify virial option is supported by this fix to add the contribution due to the added forces and torques on atoms to both the global pressure and per-atom stress of the system via the compute pressure and compute stress/atom commands. The former can be accessed by thermodynamic output. The default setting for this fix is fix_modify virial yes.  

The fix_modify bodyforces option is supported by this fix style to set whether per-body forces and torques are computed early or late in a timestep, i.e. at the post-force stage or at the final-integrate stage, respectively.  

No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.159.5 Restrictions  

This fix is part of the POEMS package. It is only enabled if LAMMPS was built with that package, which also requires the POEMS library be built and linked with LAMMPS. See the Build package page for more info.  

# 2.159.6 Related commands  

fix rigid, delete_bonds, neigh_modify exclude  

# 2.159.7 Default  

none  

(Anderson) Anderson, Mukherjee, Critchley, Ziegler, and Lipton “POEMS: Parallelizable Open-source Efficient Multibody Software “, Engineering With Computers (2006). (link to paper)  

2.160 fix polarize/bem/gmres command  

2.161 fix polarize/bem/icc command  

2.162 fix polarize/functional command  

# 2.162.1 Syntax  

fix ID group-ID style nevery tolerance • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command style $=$ polarize/bem/gmres or polarize/bem/icc or polarize/functional nevery $=$ this fixed is invoked every this many timesteps • tolerance $=$ the relative tolerance for the iterative solver to stop  

# 2.162.2 Examples  

fix 2 interface polarize/bem/gmres 5 0.0001   
fix 1 interface polarize/bem/icc 1 0.0001   
fix 3 interface polarize/functional 1 0.0001  

Used in input scripts:  

examples/PACKAGES/dielectric/in.confined examples/PACKAGES/dielectric/in.nopbc  

# 2.162.3 Description  

These fixes compute induced charges at the interface between two impermeable media with different dielectric constants. The interfaces need to be discretized into vertices, each representing a boundary element. The vertices are treated as if they were regular atoms or particles. atom_style dielectric should be used since it defines the additional properties of each interface particle such as interface normal vectors, element areas, and local dielectric mismatch. These fixes also require the use of pair_style and kspace_style with the dielectric suffix. At every time step, given a configuration of the physical charges in the system (such as atoms and charged particles) these fixes compute and update the charge of the interface particles. The interfaces are allowed to move during the simulation if the appropriate time integrators are also set (for example, with fix_rigid).  

Consider an interface between two media: one with dielectric constant of 78 (water), the other of 4 (silica). The interface is discretized into 2000 boundary elements, each represented by an interface particle. Suppose that each interface particle has a normal unit vector pointing from the silica medium to water. The dielectric difference along the normal vector is then $78-4=74$ , the mean dielectric value is $\left(78+4\right)/2=41$ . Each boundary element also has its area and the local mean curvature, which is used by these fixes for computing a correction term in the local electric field. To model charged interfaces, an interface particle will have a non-zero charge value, coming from its area and surface charge density, and its local dielectric constant set to the mean dielectric value.  

For non-interface particles such as atoms and charged particles, the interface normal vectors, element area, and dielectric mismatch are irrelevant and unused. Their local dielectric value is used internally to rescale their given charge when computing the Coulombic interactions. For instance, to simulate a cation carrying a charge of $+2$ (in simulation charge units) in an implicit solvent with a dielectric constant of 40, the cation’s charge should be set to $+2$ and its local dielectric constant property (defined in the atom_style dielectric) should be set to 40; there is no need to manually rescale charge. This will produce the proper force for any pair_style with the dielectric suffix. It is assumed that the particles cannot pass through the interface during the simulation because the value of the local dielectric constant property does not change.  

There are some example scripts for using these fixes with LAMMPS in the examples/PACKAGES/dielectric directory. The README file therein contains specific details on the system setup. Note that the example data files show the additional fields (columns) needed for atom_style dielectric beyond the conventional fields id, mol, type, q, x, y, and $z$ .  

For fix polarize/bem/gmres and fix polarize/bem/icc the induced charges of the atoms in the specified group, which are the vertices on the interface, are computed using the equation:  

$$
\sigma_{b}(\mathbf{s})=\frac{1-\bar{\varepsilon}}{\bar{\varepsilon}}\sigma_{f}(\mathbf{s})-\varepsilon_{0}\frac{\Delta\varepsilon}{\bar{\varepsilon}}\mathbf{E}(\mathbf{s})\cdot\mathbf{n}(\mathbf{s})
$$  

• $\sigma_{b}$ is the induced charge density at the interface vertex s.  

·  is the mean dielectric constant at the interface vertex: $\bar{\varepsilon}=(\varepsilon_{1}+\varepsilon_{2})/2$ .   
• $\Delta\varepsilon$ is the dielectric constant difference at the interface vertex: $\Delta\varepsilon=\varepsilon_{1}-\varepsilon_{2}$   
• $\sigma_{f}$ is the free charge density at the interface vertex   
• $\mathbf{E}(\mathbf{s})$ is the electrical field at the vertex   
• $\mathbf{n}(\mathbf{s})$ is the unit normal vector at the vertex pointing from medium with $\varepsilon_{2}$ to that with $\varepsilon_{1}$  

Fix polarize/bem/gmres employs the Generalized Minimum Residual (GMRES) as described in (Barros) to solve $\sigma_{b}$  

Fix polarize/bem/icc employs the successive over-relaxation algorithm as described in (Tyagi) to solve $\sigma_{b}$ .  

The iterative solvers would terminate either when the maximum relative change in the induced charges in consecutive iterations is below the set tolerance, or when the number of iterations reaches iter_max (see below).  

Fix polarize/functional employs the energy functional variation approach as described in (Jadhao) to solve $\sigma_{b}$ .  

The induced charges computed by these fixes are stored in the q_scaled field, and can be accessed as in the following example:  

compute qs all property/atom q_scaled dump 1 all custom 1000 all.txt id type q x y z c_qs  

Note that the $q$ field is the regular atom charges, which do not change during the simulation. For interface particles, q_scaled is the sum of the real charge, divided by the local dielectric constant epsilon, and their induced charges. For non-interface particles, q_scaled is the real charge, divided by the local dielectric constant epsilon.  

More details on the implementation of these fixes and their recommended use are described in (NguyenTD).  

# 2.162.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify command provides the ability to modify certain settings:  

itr_max arg arg $=$ maximum number of iterations for convergence   
dielectrics ediff emean epsilon area charge edif $=$ dielectric difference or NULL emean $=$ dielectric mean or NULL epsilon $=$ local dielectric value or NULL area = element area or NULL charge = real interface charge or NULL   
kspace arg = yes or no   
rand max seed max $=$ range of random induced charges to be generated seed $=$ random number seed to use when generating random charge   
mr arg arg $=$ maximum number of q-vectors to use when solving (GMRES only)   
omega arg arg $=$ relaxation parameter to use when iterating (ICC only)  

The itr_max keyword sets the max number of iterations to be used for solving each step.  

The dielectrics keyword allows properties of the atoms in group group- $.I D$ to be modified. Values passed to any of the arguments (ediff, emean, epsilon, area, charge) will override existing values for all atoms in the group group$I D$ . Passing NULL to any of these arguments will preserve the existing value. Note that setting the properties of the interface this way will change the properties of all atoms associated with the fix (all atoms in group- $.I D$ ), so multiple fix and fix_modify commands would be needed to change the properties of two different interfaces to different values (one fix and fix_modify for each interface group).  

The kspace keyword turns on long range interactions.  

If the arguments of the rand keyword are set, then the atoms subject to this fix will be assigned a random initial charge in a uniform distribution from -max/2 to max/2, using random number seed seed.  

The mr keyword only applies to style $=$ polarize/bem/gmres. It is the maximum number of q-vectors to use when solving for the surface charge.  

The omega keyword only applies when using style $=$ polarize/bem/icc. It is a relaxation parameter defined in (Tyagi) that should generally be set between 0 and 2.  

Note that the local dielectric constant (epsilon) can also be set independently using the set command.  

polarize/bem/gmres or polarize/bem/icc compute a global 2-element vector which can be accessed by various output commands. The first element is the number of iterations when the solver terminates (of which the upper bound is set by iter_max). The second element is the RMS error.  

# 2.162.5 Restrictions  

These fixes are part of the DIELECTRIC package. They are only enabled if LAMMPS was built with that package, which requires that also the KSPACE package is installed. See the Build package page for more info.  

Note that the polarize/bem/gmres and polarize/bem/icc fixes only support units lj, real, metal, si and nano at the moment.  

Note that polarize/functional does not yet support charged interfaces.  

# 2.162.6 Related commands  

pair_coeff , fix polarize, read_data, pair_style lj/cut/coul/long/dielectric, kspace_style pppm/dielectric, compute efield/atom  

# 2.162.7 Default  

iter_max $=50$   
kspace = yes   
omega = 0.7 (ICC only)   
$m r=\#$ atoms in group group-ID minus 1 (GMRES only) No random charge initialization happens by default.  

(Barros) Barros, Sinkovits, Luijten, J. Chem. Phys, 140, 064903 (2014) (Tyagi) Tyagi, Suzen, Sega, Barbosa, Kantorovich, Holm, J Chem Phys, 132, 154112 (2010) (Jadhao) Jadhao, Solis, Olvera de la Cruz, J Chem Phys, 138, 054119 (2013) (NguyenTD) Nguyen, Li, Bagchi, Solis, Olvera de la Cruz, Comput Phys Commun 241, 80-19 (2019)  

# 2.163 fix pour command  

# 2.163.1 Syntax  

fix ID group-ID pour N type seed keyword values ...  

• ID, group-ID are documented in fix command   
• pour $=$ style name of this fix command   
• $\Nu=\#$ of particles to insert   
• type $=$ atom type to assign to inserted particles (offset for molecule insertion)   
• seed $=$ random # seed (positive integer)   
• one or more keyword/value pairs may be appended to args   
• keyword $=$ region or diam or $i d$ or vol or rate or dens or vel or mol or molfrac or rigid or shake or ignore region value $=$ region-ID region- $\mathrm{\cdotID}=\mathrm{ID}$ of region to use as insertion volume diam values $=$ dstyle args dstyle $=$ one or range or poly one args = D D = single diameter for inserted particles (distance units) range args = Dlo Dhi Dlo,Dhi = range of diameters for inserted particles (distance units) poly args = Npoly D1 P1 D2 P2 ... $\mathrm{Npoly}=\#$ of (D,P) pairs D1,D2,... = diameter for subset of inserted particles (distance units) P1,P2,... = percentage of inserted particles with this diameter (0-1) id values = idflag idflag = max or $\mathrm{next}=\mathrm{how}$ to choose IDs for inserted particles and molecules vol values = fraction Nattempt fraction $=$ desired volume fraction for filling insertion volume Nattempt = max # of insertion attempts per particle   
rate value = V ${\textsc{V}}={\mathbf z}$ velocity (3d) or y velocity (2d) at which insertion volume moves (velocity units)   
dens values = Rholo Rhohi Rholo,Rhohi = range of densities for inserted particles (mass/volume units)   
vel values (3d) = vxlo vxhi vylo vyhi vz   
vel values (2d) = vxlo vxhi vy vxlo,vxhi = range of x velocities for inserted particles (velocity units) vylo,vyhi = range of y velocities for inserted particles (velocity units) $\lor\mathbf{Z}\equiv\mathbf{Z}$ velocity (3d) assigned to inserted particles (velocity units) vy = y velocity (2d) assigned to inserted particles (velocity units)   
mol value = template-ID template-ID = ID of molecule template specified in a separate molecule command   
molfrac values = f1 f2 ... fN f1 to fN = relative probability of creating each of N molecules in template-ID   
rigid value = fix-ID fix-ID = ID of fix rigid/small command   
shake value = fix-ID fix-ID = ID of fix shake command   
ignore value $=$ none skip any line or triangle particles when detecting possible overlaps with inserted particles  

# 2.163.2 Examples  

fix 3 all pour 1000 2 29494 region myblock fix 2 all pour 10000 1 19985583 region disk vol 0.33 100 rate 1.0 diam range 0.9 1.1 fix 2 all pour 10000 1 19985583 region disk diam poly 2 0.7 0.4 1.5 0.6 fix ins all pour 500 1 4767548 vol 0.8 10 region slab mol object rigid myRigid  

# 2.163.3 Description  

Insert finite-size particles or molecules into the simulation box every few timesteps within a specified region until N particles or molecules have been inserted. This is typically used to model the pouring of granular particles into a container under the influence of gravity. For the remainder of this doc page, a single inserted atom or molecule is referred to as a “particle”.  

If inserted particles are individual atoms, they are assigned the specified atom type. If they are molecules, the type of each atom in the inserted molecule is specified in the file read by the molecule command, and those values are added to the specified atom type. E.g. if the file specifies atom types 1,2,3, and those are the atom types you want for inserted molecules, then specify $t y p e=0$ . If you specify $t y p e=2$ , the in the inserted molecule will have atom types 3,4,5.  

All atoms in the inserted particle are assigned to two groups: the default group “all” and the group specified in the fix pour command (which can also be “all”).  

This command must use the region keyword to define an insertion volume. The specified region must have been previously defined with a region command. It must be of type block or a z-axis cylinder and must be defined with side $=i n$ . The cylinder style of region can only be used with 3d simulations.  

Individual atoms are inserted, unless the mol keyword is used. It specifies a template- $I D$ previously defined using the molecule command, which reads a file that defines the molecule. The coordinates, atom types, center-of-mass, moments of inertia, etc, as well as any bond/angle/etc and special neighbor information for the molecule can be specified in the molecule file. See the molecule command for details. The only settings required to be in this file are the coordinates and types of atoms in the molecule.  

If the molecule template contains more than one molecule, the relative probability of depositing each molecule can be specified by the molfrac keyword. N relative probabilities, each from 0.0 to 1.0, are specified, where N is the number of molecules in the template. Each time a molecule is inserted, a random number is used to sample from the list of relative probabilities. The N values must sum to 1.0.  

If you wish to insert molecules via the mol keyword, that will be treated as rigid bodies, use the rigid keyword, specifying as its value the ID of a separate fix rigid/small command which also appears in your input script.  

![](images/5f8e28409a0d89618b6d416db80091f60e4d99c9835d18f881d5a1278ba7c275.jpg)  

# Note  

If you wish the new rigid molecules (and other rigid molecules) to be thermostatted correctly via fix rigid/small/nvt or fix rigid/small/npt, then you need to use the fix_modify dynamic/dof yes command for the rigid fix. This is to inform that fix that the molecule count will vary dynamically.  

If you wish to insert molecules via the mol keyword, that will have their bonds or angles constrained via SHAKE, use the shake keyword, specifying as its value the ID of a separate $f\boldsymbol{{x}}$ shake command which also appears in your input script.  

Each timestep particles are inserted, they are placed randomly inside the insertion volume so as to mimic a stream of poured particles. If they are molecules they are also oriented randomly. Each atom in the particle is tested for overlaps with existing particles, including effects due to periodic boundary conditions if applicable. If an overlap is detected, another random insertion attempt is made; see the vol keyword discussion below. The larger the volume of the insertion region, the more particles that can be inserted at any one timestep. Particles are inserted again after enough time has elapsed that the previously inserted particles fall out of the insertion volume under the influence of gravity. Insertions continue every so many timesteps until the desired # of particles has been inserted.  

![](images/fd17aac33155a65aad8d33d521bce959aa4c3df5e1167e430abfb6835154c084.jpg)  

# Note  

If you are monitoring the temperature of a system where the particle count is changing due to adding particles, you typically should use the compute_modify dynamic/dof yes command for the temperature compute you are using.  

![](images/cc2491df3a379e0de55b4e18e54e5a713d8311eb9b89c8b00235a8542a691a33.jpg)  

# Implementation Notes  

The exact insertion procedure depends on many factors (e.g. the range of diameters inserted or whether molecules are being inserted). However, in the simplest scenario of monodisperse atoms, the procedure works as follows. First, the number of timesteps between two insertion events is calculated as the time for a particle to fall through the insertion region, accounting for gravity and any region motion. Next, the target number of particles inserted per event (assuming no failed insertions due to overlaps) is calculated as the product of the volume fraction and the volume of the insertion region divided by the volume of a particle (or area in 2D). Events are repeated until all N particles have been inserted, where the final event is likely interrupted upon reaching N. Estimates of this process are printed to the log/screen at the start of a run.  

All other keywords are optional with defaults as shown below.  

The diam option is only used when inserting atoms and specifies the diameters of inserted particles. There are 3 styles: one, range, or poly. For one, all particles will have diameter $D$ . For range, the diameter of each particle will be chosen randomly and uniformly between the specified Dlo and $D h i$ bounds. For poly, a series of Npoly diameters is specified. For each diameter a percentage value from 0.0 to 1.0 is also specified. The Npoly percentages must sum to 1.0. For the example shown above with “diam $20.70.41.50.6^{,}$ , all inserted particles will have a diameter of 0.7 or 1.5. $40\%$ of the particles will be small; $60\%$ will be large.  

Note that for molecule insertion, the diameters of individual atoms in the molecule can be specified in the file read by the molecule command. If not specified, the diameter of each atom in the molecule has a default diameter of 1.0.  

The id option has two settings which are used to determine the atom or molecule IDs to assign to inserted particles/molecules. In both cases a check is done of the current system to find the maximum current atom and molecule ID of any existing particle. Newly inserted particles and molecules are assigned IDs that increment those max values. For the max setting, which is the default, this check is done at every insertion step, which allows for particles to leave the system, and their IDs to potentially be re-used. For the next setting this check is done only once when the fix is specified, which can be more efficient if you are sure particles will not be added in some other way.  

The vol option specifies what volume fraction of the insertion volume will be filled with particles. For particles with a size specified by the diam range keyword, they are assumed to all be of maximum diameter Dhi for purposes of computing their contribution to the volume fraction.  

The higher the volume fraction value, the more particles are inserted each timestep. Since inserted particles cannot overlap, the maximum volume fraction should be no higher than about 0.6. Each timestep particles are inserted, LAMMPS will make up to a total of M tries to insert the new particles without overlaps, where $\mathbf{M}=\#$ of inserted particles \* Nattempt. If LAMMPS is unsuccessful at completing all insertions, it prints a warning.  

The dens and vel options enable inserted particles to have a range of densities or xy velocities. The specific values for a particular inserted particle will be chosen randomly and uniformly between the specified bounds. Internally, the density value for a particle is converted to a mass, based on the radius (volume) of the particle. The $\nu z$ or vy value for option vel assigns a z-velocity (3d) or y-velocity (2d) to each inserted particle.  

The rate option moves the insertion volume in the z direction (3d) or y direction (2d). This enables pouring particle from a successively higher height over time.  

The ignore option is useful when running a simulation that used line segment (2d) or triangle (3d) particles, typically to define boundaries for spherical granular particles to interact with. See the atom_style line or tri command for details. Lines and triangles store their size, and if the size is large it may overlap (in a spherical sense) with the insertion region, even if the line/triangle is oriented such that there is no actual overlap. This can prevent particles from being inserted. The ignore keyword causes the overlap check to skip any line or triangle particles. Obviously you should only use it if there is in fact no overlap of the line or triangle particles with the insertion region.  

# 2.163.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. This means you must be careful when restarting a pouring simulation, when the restart file was written in the middle of the pouring operation. Specifically, you should use a new fix pour command in the input script for the restarted simulation that continues the operation. You will need to adjust the arguments of the original fix pour command to do this.  

Also note that because the state of the random number generator is not saved in restart files, you cannot do “exact” restarts with this fix, where the simulation continues on the same as if no restart had taken place. However, in a statistical sense, a restarted simulation should produce the same behavior if you adjust the fix pour parameters appropriately.  

None of the fix_modify options are relevant to this fix. This fix computes a global scalar, which can be accessed by various output commands. The scalar is the cumulative number of insertions. The scalar value calculated by this fix is “intensive”. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.163.5 Restrictions  

This fix is part of the GRANULAR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

For 3d simulations, a gravity fix in the -z direction must be defined for use in conjunction with this fix. For 2d simulations, gravity must be defined in the -y direction.  