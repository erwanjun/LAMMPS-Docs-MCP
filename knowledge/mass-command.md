---
title: "Mass and MDI Commands"
description: "mass command, MDI interface, min_modify command reference"
category: "command"
tags: ["mass", "MDI", "minimization"]
commands: ["mass", "mdi", "min_modify"]
---
# 1.51.2 Examples  

<html><body><table><tr><td>mass 1 1.0</td><td></td><td></td><td></td></tr><tr><td>mass 62.5</td><td></td><td></td><td></td></tr><tr><td>2* 62.5 mass</td><td></td><td></td><td></td></tr><tr><td>labelmap )atom 1 C</td><td></td><td></td><td></td></tr><tr><td>mass C 12.01</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr></table></body></html>  

# 1.51.3 Description  

Set the mass for all atoms of one or more atom types. Per-type mass values can also be set in the read_data data file using the “Masses” keyword. See the units command for what mass units to use.  

The I index can be specified in one of several ways. An explicit numeric value can be used, as in the first example above. Or I can be a type label, which is an alphanumeric string defined by the labelmap command or in a section of a data file read by the read_data command, and which converts internally to a numeric type. Or a wild-card asterisk can be used to set the mass for multiple atom types. This takes the form “\*” or $\mathbf{\overline{{\rho}}}^{\mathbf{6}\mathbf{*}}\mathbf{\overline{{n}}}^{\mathbf{,}\mathbf{,}}$ or $\mathbf{\Psi}^{66}\mathbf{n}^{*}{}^{,}$ or $\mathrm{^{6}m^{*}n^{,}}$ , where m and n are numbers. If $\Nu=$ the number of atom types, then an asterisk with no numeric values means all types from 1 to N. A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to N (inclusive). A middle asterisk means all types from m to n (inclusive).  

A line in a data file that follows the “Masses” keyword specifies mass using the same format as the arguments of the mass command in an input script, except that no wild-card asterisk can be used. For example, under the “Masses” section of a data file, the line that corresponds to the first example above would be listed as  

# 1 1.0  

Note that the mass command can only be used if the atom style requires per-type atom mass to be set. Currently, all but the sphere and ellipsoid and peri styles do. They require mass to be set for individual particles, not types. Peratom masses are defined in the data file read by the read_data command, or set to default values by the create_atoms command. Per-atom masses can also be set to new values by the set mass or set density commands.  

Also note that pair_style eam and pair_style bop commands define the masses of atom types in their respective potential files, in which case the mass command is normally not used.  

If you define a hybrid atom style which includes one (or more) sub-styles which require per-type mass and one (or more) sub-styles which require per-atom mass, then you must define both. However, in this case the per-type mass will be ignored; only the per-atom mass will be used by LAMMPS.  

# 1.51.4 Restrictions  

This command must come after the simulation box is defined by a read_data, read_restart, or create_box command.  

All masses must be defined before a simulation is run. They must also all be defined before a velocity or fix shake command is used.  

The mass assigned to any type or atom must be $>0.0$ .  

# 1.51.5 Related commands  

none  

# 1.51.6 Default  

none  

# 1.52 mdi command  

# 1.52.1 Syntax  

option $=$ engine or plugin or connect or exit  

engine args $=$ zero or more keyword/args pairs keywords $=$ elements elements args = N_1 N_2 ... N_ntypes N_1,N_2,...N_ntypes $=$ chemical symbol for each of ntypes LAMMPS atom types   
plugin args = name keyword value keyword value ...   
name = name of plugin library (e.g., lammps means a liblammps.so library will be loaded)   
keyword/value pairs in any order, some are required, some are optional keywords = mdi or infile or extra or command mdi value = args passed to MDI for driver to operate with plugins (required) infile value = filename the engine will read at start-up (optional) extra value = aditional command-line args to pass to engine library when loaded (optional) command value = a LAMMPS input script command to execute (required)   
connect args = none   
exit args = none  

# 1.52.2 Examples  

mdi engine   
mdi engine elements Al Cu   
mdi plugin lammps mdi "-role ENGINE -name lammps -method LINK" & infile in.aimd.engine extra "-log log.aimd.engine.plugin" & command "run 5"   
mdi connect   
mdi exit  

# 1.52.3 Description  

This command implements operations within LAMMPS to use the MDI Library <https://molssimdi.github.io/MDI_Library/html/index.html> for coupling to other codes in a client/server protocol.  

See the Howto MDI doc page for a discussion of all the different ways 2 or more codes can interact via MDI.  

The examples/mdi directory has examples which use LAMMPS in 4 different modes: as a driver using an engine as either a stand-alone code or as a plugin, and as an engine operating as either a stand-alone code or as a plugin. The README file in that directory shows how to launch and couple codes for all the 4 usage modes, and so they communicate via the MDI library using either MPI or sockets.  

The scripts in that directory illustrate the use of all the options for this command.  

The engine option enables LAMMPS to act as an MDI engine (server), responding to requests from an MDI driver (client) code.  

The plugin option enables LAMMPS to act as an MDI driver (client), and load the MDI engine (server) code as a library plugin. In this case the MDI engine is a library plugin. An MDI engine can also be a stand-alone code,  

# 1.52. mdi command  

launched separately from LAMMPS, in which case the mdi plugin command is not used.  

The connect and exit options are only used when LAMMPS is acting as an MDI driver. As explained below, these options are normally not needed, except for a specific kind of use case.  

The mdi engine command is used to make LAMMPS operate as an MDI engine. It is typically used in an input script after LAMMPS has setup the system it is going to model consistent with what the driver code expects. Depending on when the driver code tells the LAMMPS engine to exit, other commands can be executed after this command, but typically it is used at the end of a LAMMPS input script.  

To act as an MDI engine operating as an MD code (or surrogate QM code), this is the list of standard MDI commands issued by a driver code which LAMMPS currently recognizes. Using standard commands defined by the MDI library means that a driver code can work interchangeably with LAMMPS or other MD codes or with QM codes which support the MDI standard. See more details about these commands in the MDI library documentation  

These commands are valid at the $@$ DEFAULT node defined by MDI. Commands that start with “>” mean the driver is sending information to LAMMPS. Commands that start with $^{\circ\circ}<\overline{{\zeta}}$ ” are requests by the driver for LAMMPS to send it information. Commands that start with an alphabetic letter perform actions. Commands that start with “ $\ @^{,,}$ are MDI “node” commands, which are described further below.  

<html><body><table><tr><td>Command name</td><td>Action</td></tr><tr><td>>CELL or <CELL</td><td>Send/request 3 simulation box edge vectors (9 values)</td></tr><tr><td>>CELL_DISPL or <CELL_DISPL</td><td></td></tr><tr><td>>CHARGES or <CHARGES</td><td>Send/request charge on each atom (N values)</td></tr><tr><td>>COORDS or <COORDS</td><td>Send/request coordinates of each atom (3Nvalues)</td></tr><tr><td>>ELEMENTS</td><td>Send elements (atomic numbers) for each atom (N values)</td></tr><tr><td><ENERGY</td><td>Request total energy (potential + kinetic) of the system (1 value)</td></tr><tr><td>>FORCES or <FORCES</td><td>Send/request forces on each atom (3N values)</td></tr><tr><td>>+FORCES</td><td>Send forces to add to each atom (3N values)</td></tr><tr><td><LABELS</td><td>Request string label of each atom (N values)</td></tr><tr><td><MASSES</td><td>Request mass of each atom (N values)</td></tr><tr><td>MD</td><td>Perform an MD simulation for N timesteps (most recent >NSTEPS value)</td></tr><tr><td>OPTG</td><td>Perform an energy minimization to convergence (most recent >TOLER- ANCE values)</td></tr><tr><td>>NATOMS or <NATOMS</td><td>Sends/request number of atoms in the system (1 value)</td></tr><tr><td>>NSTEPS</td><td>Send number of timesteps for next MD dynamics run via MD command</td></tr><tr><td><PE</td><td>Request potential energy of the system (1 value)</td></tr><tr><td><STRESS</td><td>Request symmetric stress tensor (virial) of the system (9 values)</td></tr><tr><td>>TOLERANCE</td><td>Send 4 tolerance parameters for next MD minimization via OPTG command</td></tr><tr><td>>TYPES or <TYPES</td><td>Send/request the LAMMPS atom type for each atom (N values)</td></tr><tr><td>>VELOCITIESor<VELOCITIES</td><td>Send/request the velocity of each atom (3N values)</td></tr><tr><td>@INIT_MD or @INIT_OPTG</td><td></td></tr><tr><td>EXIT</td><td>below) Driver tells LAMMPS to exit engine mode</td></tr></table></body></html>  

# Note  

The <ENERGY, <FORCES, <PE, and <STRESS commands trigger LAMMPS to compute atomic interactions for the current configuration of atoms and size/shape of the simulation box. I.e. LAMMPS invokes its pair, bond, angle, . . . , kspace styles. If the driver is updating the atom coordinates and/or box incrementally (as in an MD simulation which the driver is managing), then the LAMMPS engine will do the same, and only occasionally trigger neighbor list builds. If the change in atom positions is large (since the previous >COORDS command), then LAMMPS will do a more expensive operation to migrate atoms to new processors as needed and re-neighbor. If the $>$ NATOMS or >TYPES or $>$ ELEMENTS commands have been sent (since the previous $>$ COORDS command), then LAMMPS assumes the system is new and re-initializes an entirely new simulation.  

# Note  

The >TYPES or $>$ ELEMENTS commands are how the MDI driver tells the LAMMPS engine which LAMMPS atom type to assign to each atom. If both the MDI driver and the LAMMPS engine are initialized so that atom type values are consistent in both codes, then the $>$ TYPES command can be used. If not, the optional elements keyword can be used to specify what element each LAMMPS atom type corresponds to. This is specified by the chemical symbol of the element, e.g. C or Al or Si. A symbol must be specified for each of the ntypes LAMMPS atom types. Each LAMMPS type must map to a unique element; two or more types cannot map to the same element. Ntypes is typically specified via the create_box command or in the data file read by the read_data command. Once this has been done, the MDI driver can send an $>$ ELEMENTS command to the LAMMPS driver with the atomic number of each atom and the LAMMPS engine will be able to map it to a LAMMPS atom type.  

The MD and OPTG commands perform an entire MD simulation or energy minimization (to convergence) with no communication from the driver until the simulation is complete. By contrast, the $\ @\mathrm{INIT\_MD}$ and $\textcircled{a}\mathrm{INIT\_OPTG}$ commands allow the driver to communicate with the engine at each timestep of a dynamics run or iteration of a minimization; see more info below.  

The MD command performs a simulation using the most recent $>$ NSTEPS value. The OPTG command performs a minimization using the 4 convergence parameters from the most recent $>$ TOLERANCE command. The 4 parameters sent are those used by the minimize command in LAMMPS: etol, ftol, maxiter, and maxeval.  

The mdi engine command also implements the following custom MDI commands which are LAMMPS-specific. Thes commands are also valid at the $@$ DEFAULT node defined by MDI:  

– Command name   
– Action   
– >NBYTES   
– Send # of datums in a subsequent command (1 value)   
– >COMMAND   
– Send a LAMMPS input script command as a string (Nbytes in length)   
– >COMMANDS   
– Send multiple LAMMPS input script commands as a newline-separated string (Nbytes in length)   
– >INFILE   
– Send filename of an input script to execute (filename Nbytes in length)   
– <KE   
– Request kinetic energy of the system (1 value)  

Note that other custom commands can easily be added if these are not sufficient to support what a user-written driver code needs. Code to support new commands can be added to the MDI package within LAMMPS, specifically to the src/MDI/mdi_engine.cpp file.  

MDI also defines a standard mechanism for the driver to request that an MD engine (LAMMPS) perform a dynamics simulation one step at a time or an energy minimization one iteration at a time. This is so that the driver can (optionally)  

communicate with LAMMPS at intermediate points of the timestep or iteration by issuing MDI node commands which start with “ $\ @^{,,}$ .  

To tell LAMMPS to run dynamics in single-step mode, the driver sends as $\ @\mathrm{INIT\_MD}$ command followed by the these commands. The driver can interact with LAMMPS at 3 node locations within each timestep: $\scriptstyle{\mathcal{Q}}\mathbf{C}{\mathrm{{OORDS}}}$ , $@$ FORCES, $@$ ENDSTEP:  

• – Command name – Action   
• – @COORDS – Proceed to next @COORDS node $=$ post-integrate location in LAMMPS timestep   
• – @FORCES – Proceed to next $@$ FORCES node $=$ post-force location in LAMMPS timestep – $@$ ENDSTEP – Proceed to next $@$ ENDSTEP node $=$ end-of-step location in LAMMPS timestep – @DEFAULT – Exit MD simulation, return to $@$ DEFAULT node – EXIT – Driver tells LAMMPS to exit the MD simulation and engine mode  

To tell LAMMPS to run an energy minimization in single-iteration mode. The driver can interact with LAMMPS at 2 node locations within each iteration of the minimizer: $@$ COORDS, $@$ FORCES:  

– Command name – Action – @COORDS – Proceed to next $@$ COORDS node $=$ min-pre-force location in LAMMPS min iteration – @FORCES – Proceed to next $@$ FORCES node $=$ min-post-force location in LAMMPS min iteration • – @DEFAULT – Exit minimization, return to $@$ DEFAULT node – EXIT – Driver tells LAMMPS to exit the minimization and engine mode  

While LAMMPS is at its $\scriptstyle{\mathcal{Q}}\mathbf{C}{\mathrm{{OORDS}}}$ node, the following standard MDI commands are supported, as documented above: >COORDS or <COORDS, $@$ COORDS, $\bigotimes\mathrm{FORCES}$ , $@$ ENDSTEP, $@$ DEFAULT, EXIT.  

While LAMMPS is at its $\mathcal{(a_{\mathrm{{FORCES}}}}$ node, the following standard MDI commands are supported, as documented above: <COORDS, <ENERGY, $>$ FORCES or ${\tt>}+\mathrm{FORCES}$ or <FORCES, <KE, <PE, <STRESS, $@$ COORDS, $@$ FORCES, $@$ ENDSTEP, $@$ DEFAULT, EXIT.  

While LAMMPS is at its $@$ ENDSTEP node, the following standard MDI commands are supported, as documented above: <ENERGY, <FORCES, <KE, <PE, <STRESS, $\scriptstyle{\mathcal{Q}}\mathbf{C}{\mathrm{{OORDS}}}$ , $@$ FORCES, $@$ ENDSTEP, $@$ DEFAULT, EXIT.  

The mdi plugin command is used to make LAMMPS operate as an MDI driver which loads an MDI engine as a plugin library. It is typically used in an input script after LAMMPS has setup the system it is going to model consistent with the engine code.  

The name argument specifies which plugin library to load. A name like “lammps” is converted to a filename liblammps.so. The path for where this file is located is specified by the -plugin_path switch within the -mdi commandline switch, which is specified when LAMMPS is launched. See the examples/mdi/README files for examples of how this is done.  

The mdi keyword is required and is used as the -mdi argument passed to the library when it is launched. The -role and -method settings are required. The -name setting can be anything you choose. MDI drivers and engines can query their names to verify they are values they expect.  

The infile keyword is optional. It sets the name of an input script which the engine will open and process. MDI will pass it as a command-line argument to the library when it is launched. The file typically contains settings that an MD or QM code will use for its calculations.  

The extra keyword is optional. It contains additional command-line arguments which MDI will pass to the library when it is launched.  

The command keyword is required. It specifies a LAMMPS input script command (as a single argument in quotes if it is multiple words). Once the plugin library is launched, LAMMPS will execute this command. Other previously-defined commands in the input script, such as the fix mdi/qm command, should perform MDI communication with the engine, while the specified command executes. Note that if command is an include command, then it could specify a filename with multiple LAMMPS commands.  

![](images/f5d85d42148ab909ce16b2d6719bc1e917091e23d71d1c6d090214761b71a9a3.jpg)  

# Note  

When the command is complete, LAMMPS will send an MDI EXIT command to the plugin engine and the plugin will be removed. The “mdi plugin” command will then exit and the next command (if any) in the LAMMPS input script will be processed. A subsequent “mdi plugin” command could then load the same or a different MDI plugin if desired.  

The mdi connect and mdi exit commands are only used when LAMMPS is operating as an MDI driver. And when other LAMMPS command(s) which send MDI commands and associated data to/from the MDI engine are not able to initiate and terminate the connection to the engine code.  

The only current MDI driver command in LAMMPS is the fix mdi/qm command. If it is only used once in an input script then it can initiate and terminate the connection, but if it is being issued multiple times (e.g., in a loop that issues a clear command), then it cannot initiate or terminate the connection multiple times. Instead, the mdi connect and mdi exit commands should be used outside the loop to initiate or terminate the connection.  

See the examples/mdi/in.series.driver script for an example of how this is done. The LOOP in that script is reading a series of data file configurations and passing them to an MDI engine (e.g., quantum code) for energy and force evaluation. A clear command inside the loop wipes out the current system so a new one can be defined. This operation also destroys all fixes. So the fix mdi/qm command is issued once per loop iteration. Note that it includes a “connect no” option which disables the initiate/terminate logic within that fix.  

# 1.52.4 Restrictions  

This command is part of the MDI package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

To use LAMMPS in conjunction with other MDI-enabled atomistic codes, the units command should be used to specify real or metal units. This will ensure the correct unit conversions between LAMMPS and MDI units, which the other codes will also perform in their preferred units.  

LAMMPS can also be used as an MDI engine in other unit choices it supports (e.g., $l j$ ), but then no unit conversion is performed.  

# 1.52. mdi command  

# 1.52.5 Related commands  

fix mdi/qm  

# 1.52.6 Default  

None  

# 1.53 min_modify command  

# 1.53.1 Syntax  

• one or more keyword/value pairs may be listed  

keyword $=$ dmax or line or norm or alpha_damp or discrete_factor or integrator or abcfire dmax value $=$ max max $=$ maximum distance for line search to move (distance units)   
line value $=$ backtrack or quadratic or forcezero or spin_cubic or spin_none backtrack,quadratic,forcezero,spin_cubic,spin_none $=$ style of linesearch to use norm value $=$ two or inf or max two $=$ Euclidean two-norm (length of 3N vector) inf = max force component across all 3-vectors max = max force norm across all 3-vectors alpha_damp value = damping damping = fictitious magnetic damping for spin minimization (adim) discrete_factor value = factor factor = discretization factor for adaptive spin timestep (adim)   
integrator value = eulerimplicit or verlet or leapfrog or eulerexplicit time integration scheme for fire minimization abcfire value = yes or no (default no) yes = use ABC-FIRE variant of fire minimization style no = use default FIRE variant of fire minimization style tmax value = factor factor $=$ maximum adaptive timestep for fire minimization (adim)  

# 1.53.2 Examples  

<html><body><table><tr><td>min modify dmax 0.2</td></tr><tr><td>min modify integrator verlet tmax</td></tr><tr><td></td></tr></table></body></html>  

# 1.53.3 Description  

This command sets parameters that affect the energy minimization algorithms selected by the min_style command. The various settings may affect the convergence rate and overall number of force evaluations required by a minimization, so users can experiment with these parameters to tune their minimizations.  

The $c g$ and $s d$ minimization styles have an outer iteration and an inner iteration which is steps along a one-dimensional line search in a particular search direction. The dmax parameter is how far any atom can move in a single line search in any dimension (x, y, or z). For the quickmin and fire minimization styles, the dmax setting is how far any atom can move in a single iteration (timestep). Thus a value of 0.1 in real units means no atom will move further than 0.1 Angstroms in a single outer iteration. This prevents highly overlapped atoms from being moved long distances (e.g. through another atom) due to large forces.  

The choice of line search algorithm for the $c g$ and $s d$ minimization styles can be selected via the line keyword. The default quadratic line search algorithm starts out using the robust backtracking method described below. However, once the system gets close to a local minimum and the linesearch steps get small, so that the energy is approximately quadratic in the step length, it uses the estimated location of zero gradient as the linesearch step, provided the energy change is downhill. This becomes more efficient than backtracking for highly-converged relaxations. The forcezero line search algorithm is similar to quadratic. It may be more efficient than quadratic on some systems.  

The backtracking search is robust and should always find a local energy minimum. However, it will “converge” when it can no longer reduce the energy of the system. Individual atom forces may still be larger than desired at this point, because the energy change is measured as the difference of two large values (energy before and energy after) and that difference may be smaller than machine epsilon even if atoms could move in the gradient direction to reduce forces further.  

The choice of a norm can be modified for the min styles $c g$ , sd, quickmin, fire, spin, spin/cg, and spin/lbfgs using the norm keyword. The default two norm computes the 2-norm (Euclidean length) of the global force vector:  

$$
||\vec{F}||_{2}=\sqrt{\vec{F}_{1}^{2}+\cdot\cdot\cdot+\vec{F}_{N}^{2}}
$$  

The max norm computes the length of the 3-vector force for each atom (2-norm), and takes the maximum value of those across all atoms  

$$
||\vec{F}||_{m a x}=\operatorname*{max}\Big(||\vec{F}_{1}||,\cdot\cdot\cdot,||\vec{F}_{N}||\Big)
$$  

The inf norm takes the maximum component across the forces of all atoms in the system:  

$$
||\vec{F}||_{i n f}=\operatorname*{max}\left(|F_{1}^{1}|,|F_{1}^{2}|,|F_{1}^{3}|\cdot\cdot\cdot,|F_{N}^{1}|,|F_{N}^{2}|,|F_{N}^{3}|\right)
$$  

For the min styles spin, spin/cg and spin/lbfgs, the force norm is replaced by the spin-torque norm.  

Keywords alpha_damp and discrete_factor only make sense when a min_spin command is declared. Keyword alpha_damp defines an analog of a magnetic damping. It defines a relaxation rate toward an equilibrium for a given magnetic system. Keyword discrete_factor defines a discretization factor for the adaptive timestep used in the spin minimization. See min_spin for more information about those quantities.  

The choice of a line search algorithm for the spin/cg and spin/lbfgs styles can be specified via the line keyword. The spin_cubic and spin_none keywords only make sense when one of those two minimization styles is declared. The spin_cubic performs the line search based on a cubic interpolation of the energy along the search direction. The spin_none keyword deactivates the line search procedure. The spin_none is a default value for line keyword for both spin/lbfgs and spin/cg. Convergence of spin/lbfgs can be more robust if spin_cubic line search is used.  

The Newton integrator used for fire minimization can be selected to be either the symplectic Euler (eulerimplicit), velocity Verlet (verlet), Leapfrog (leapfrog) or non-symplectic forward Euler (eulerexplicit ). The keyword tmax defines the maximum value for the adaptive timestep during a fire minimization. It is a multiplication factor applied to the current timestep (not in time unit). For example, $t m a x=4.0$ with a timestep of 2fs, means that the maximum value the timestep can reach during a fire minimization is 4fs. Note that parameter defaults has been chosen to be reliable in most cases, but one should consider adjusting timestep and tmax to optimize the minimization for large or complex systems. Other parameters of the fire minimization can be tuned (tmin, delaystep, dtgrow, dtshrink, alpha0, and alphashrink). Please refer to the references describing the min_style fire. An additional stopping criteria vdfmax is used by fire in order to avoid unnecessary looping when it is reasonable to think the system will not be relaxed further. Note that in this case the system will NOT have reached your minimization criteria. This could happen when the system comes to be stuck in a local basin of the phase space. vdfmax is the maximum number of consecutive iterations with $\mathrm{P(t)}<0$ .  

Added in version 8Feb2023.  

The abcfire keyword allows to activate the ABC-FIRE variant of the fire minimization algorithm. ABC-FIRE introduces an additional factor that modifies the bias and scaling of the velocities of the atoms during the mixing step (Echeverri Restrepo). This can lead to faster convergence of the minimizer.  

The min_style fire is an optimized implementation. It can behave similarly to the previous version by using the following set of parameters:  

min_modify integrator eulerexplicit tmax 10.0 tmin 0.0 delaystep 5 & dtgrow 1.1 dtshrink 0.5 alpha0 0.1 alphashrink 0.99 & vdfmax 100000 halfstepback no initialdelay no  

# 1.53.4 Restrictions  

For magnetic GNEB calculations, only spin_none value for line keyword can be used when minimization styles spin/cg and spin/lbfgs are employed. See neb/spin for more explanation.  

# 1.53.5 Related commands  

min_style, minimize  

# 1.53.6 Default  

The option defaults are dmax $=0.1$ , line $=$ quadratic and norm $=$ two.  

For the spin, spin/cg and spin/lbfgs styles, the option defaults are alpha_damp $=1.0$ , discrete_factor $=10.0$ , line $=$ spin_none, and norm $=$ euclidean.  

For the fire style, the option defaults are integrator $=$ eulerimplicit, tmax $=10.0$ , $\mathrm{tmin}=0.02$ , delaystep $=20$ , dtgrow $=$ 1.1, dtshrink $=0.5$ , alpha $)=0.25$ , alphashrink $=0.99$ , vdfmax $=2000$ , halfstepback $=$ yes and initialdelay $=$ yes.  

(EcheverriRestrepo) Echeverri Restrepo, Andric, Comput Mater Sci, 218, 111978 (2023).  

1.54 min_style spin command  

1.55 min_style spin/cg command  

1.56 min_style spin/lbfgs command  

# 1.56.1 Syntax  

min_style spin min_style spin/cg min_style spin/lbfgs  

# 1.56.2 Examples  

<html><body><table><tr><td>min style spin /Ibfgs min modify line spin cubic discrete factor 10.0</td></tr></table></body></html>  

# 1.56.3 Description  

Apply a minimization algorithm to use when a minimize command is performed.  

Style spin defines a damped spin dynamics with an adaptive timestep, according to:  

$$
\frac{d\vec{s}_{i}}{d t}=\lambda\vec{s}_{i}\times\left(\vec{\omega}_{i}\times\vec{s}_{i}\right)
$$  

with $\lambda$ a damping coefficient (similar to a magnetic damping). $\lambda$ can be defined by setting the alpha_damp keyword with the min_modify command.  

The minimization procedure solves this equation using an adaptive timestep. The value of this timestep is defined by the largest precession frequency that has to be solved in the system:  

$$
\Delta t_{\operatorname*{max}}=\frac{2\pi}{\kappa|\vec{\omega}_{\operatorname*{max}}|}
$$  

with $|\vec{\omega}_{\mathrm{max}}|$ the norm of the largest precession frequency in the system (across all processes, and across all replicas if a spin/neb calculation is performed).  

$\kappa$ defines a discretization factor discrete_factor for the definition of this timestep. discrete_factor can be defined with the min_modify command.  

Style spin/cg defines an orthogonal spin optimization (OSO) combined to a conjugate gradient (CG) algorithm. The min_modify command can be used to couple the spin/cg to a line search procedure, and to modify the discretization factor discrete_factor. By default, style spin/cg does not employ the line search procedure and uses the adaptive timestep technique in the same way as style spin.  

Style spin/lbfgs defines an orthogonal spin optimization (OSO) combined to a limited-memory Broyden-FletcherGoldfarb-Shanno (L-BFGS) algorithm. By default, style spin/lbfgs does not employ line search procedure. If the line search procedure is not used then the discrete factor defines the maximum root mean squared rotation angle of spins by equation $p i/(5^{*}K a p p a)$ . The default value for Kappa is 10. The spin_cubic line search option can improve the convergence of the spin/lbfgs algorithm.  

The min_modify command can be used to activate the line search procedure, and to modify the discretization factor discrete_factor.  

For more information about styles spin/cg and spin/lbfgs, see their implementation reported in (Ivanov).  

![](images/3210e1cad9357e4c006cd3c308c65dbb0c35f583f6021c5b73ce916b3d8481e7.jpg)  

# Note  

All the spin styles replace the force tolerance by a torque tolerance. See minimize for more explanation.  

![](images/7e1b127e1b63aedddf522a09ebdc065cf87bb494055b1e662256ba5befeecc0d.jpg)  

# Note  

The spin/cg and spin/lbfgs styles can be used for magnetic NEB calculations only if the line search procedure is deactivated. See neb/spin for more explanation.  

# 1.56.4 Restrictions  

The spin, spin/cg, and spin/lbfgps styles are part of the SPIN package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This minimization procedure is only applied to spin degrees of freedom for a frozen lattice configuration.  

# 1.56.5 Related commands  

min_style, minimize, min_modify  

# 1.56.6 Default  

The option defaults are alpha_damp $=1.0$ , discrete_factor $=10.0$ , line $=$ spin_none and norm $=$ euclidean.  

(Ivanov) Ivanov, Uzdin, Jonsson. arXiv preprint arXiv:1904.02669, (2019).  

# 1.57 min_style cg command  

Accelerator Variant: cg/kk  

1.58 min_style hftn command  

1.59 min_style sd command  

1.60 min_style quickmin command  

1.61 min_style fire command  

1.62 min_style spin command  

1.63 min_style spin/cg command  

1.64 min_style spin/lbfgs command  

# 1.64.1 Syntax  

min_style style  

• style $=c g$ or hftn or sd or quickmin or fire or spin or spin/cg or spin/lbfgs  

spin is discussed briefly here and fully on min_style spin doc page spin/cg is discussed briefly here and fully on min_style spin doc page spin/lbfgs is discussed briefly here and fully on min_style spin doc page  

# 1.64.2 Examples  

<html><body><table><tr><td>min style cg</td><td></td></tr><tr><td>min style fire</td><td></td></tr><tr><td>min style spin</td><td></td></tr></table></body></html>  

# 1.64.3 Description  

Choose a minimization algorithm to use when a minimize command is performed.  

Style cg is the Polak-Ribiere version of the conjugate gradient (CG) algorithm. At each iteration the force gradient is combined with the previous iteration information to compute a new search direction perpendicular (conjugate) to the previous search direction. The PR variant affects how the direction is chosen and how the CG method is restarted when it ceases to make progress. The PR variant is thought to be the most effective CG choice for most problems.  

Style hftn is a Hessian-free truncated Newton algorithm. At each iteration a quadratic model of the energy potential is solved by a conjugate gradient inner iteration. The Hessian (second derivatives) of the energy is not formed directly, but approximated in each conjugate search direction by a finite difference directional derivative. When close to an energy minimum, the algorithm behaves like a Newton method and exhibits a quadratic convergence rate to high accuracy. In most cases the behavior of hftn is similar to $c g$ , but it offers an alternative if $c g$ seems to perform poorly. This style is not affected by the min_modify command.  

Style sd is a steepest descent algorithm. At each iteration, the search direction is set to the downhill direction corresponding to the force vector (negative gradient of energy). Typically, steepest descent will not converge as quickly as CG, but may be more robust in some situations.  

Style quickmin is a damped dynamics method described in (Sheppard), where the damping parameter is related to the projection of the velocity vector along the current force vector for each atom. The velocity of each atom is initialized to 0.0 by this style, at the beginning of a minimization.  

Style fire is a damped dynamics method described in $(B i t z e k)$ , which is similar to quickmin but adds a variable timestep and alters the projection operation to maintain components of the velocity non-parallel to the current force vector. The velocity of each atom is initialized to 0.0 by this style, at the beginning of a minimization. This style correspond to an optimized version described in (Guenole) that include different time integration schemes and default parameters. The default parameters can be modified with the command min_modify.  

Style spin is a damped spin dynamics with an adaptive timestep.  

Style spin/cg uses an orthogonal spin optimization (OSO) combined to a conjugate gradient (CG) approach to minimize spin configurations.  

Style spin/lbfgs uses an orthogonal spin optimization (OSO) combined to a limited-memory Broyden-FletcherGoldfarb-Shanno (LBFGS) approach to minimize spin configurations.  

See the min/spin page for more information about the spin, spin/cg and spin/lbfgs styles.  

Either the quickmin or the fire styles are useful in the context of nudged elastic band (NEB) calculations via the neb command.  

Either the spin, spin/cg, or spin/lbfgs styles are useful in the context of magnetic geodesic nudged elastic band (GNEB) calculations via the neb/spin command.  

![](images/1dd64194b75e56fd62cdd6fd8b94b0ccd1cca7fd3cb762550c2524d63ff31558.jpg)  

# Note  

The damped dynamic minimizers use whatever timestep you have defined via the timestep command. Often they will converge more quickly if you use a timestep about $10\mathrm{x}$ larger than you would normally use for dynamics simulations. For fire, the default timestep is recommended to be equal to the one you would normally use for dynamics simulations.  

![](images/937acb8f8a2f9b5a1a301a20e16e02944ff1f9011cd9180278359dfa9189a446.jpg)  

# Note  

The quickmin, fire, hftn, and $c g/k k$ styles do not yet support the use of the fix box/relax command or minimizations involving the electron radius in eFF models.  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 1.64.4 Restrictions  

The spin, spin/cg, and spin/lbfgps styles are part of the SPIN package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 1.64.5 Related commands  

min_modify, minimize, neb  

# 1.64.6 Default  

(Sheppard) Sheppard, Terrell, Henkelman, J Chem Phys, 128, 134106 (2008). See ref 1 in this paper for original reference to Qmin in Jonsson, Mills, Jacobsen.  

(Bitzek) Bitzek, Koskinen, Gahler, Moseler, Gumbsch, Phys Rev Lett, 97, 170201 (2006).  

(Guenole) Guenole, Noehring, Vaid, Houlle, Xie, Prakash, Bitzek, Comput Mater Sci, 175, 109584 (2020)  

# 1.65 minimize command  

Accelerator Variant: minimize/kk  

# 1.65.1 Syntax  

• etol $=$ stopping tolerance for energy (unitless) • ftol $=$ stopping tolerance for force (force units) • maxiter $=$ max iterations of minimizer maxeval $=$ max number of force/energy evaluations  

# 1.65.2 Examples  

minimize 1.0e-4 1.0e-6 100 1000   
minimize 0.0 1.0e-8 1000 100000  

# 1.65.3 Description  

Perform an energy minimization of the system, by iteratively adjusting atom coordinates. Iterations are terminated when one of the stopping criteria is satisfied. At that point the configuration will hopefully be in a local potential energy minimum. More precisely, the configuration should approximate a critical point for the objective function (see below), which may or may not be a local minimum.  

The minimization algorithm used is set by the min_style command. Other options are set by the min_modify command. Minimize commands can be interspersed with run commands to alternate between relaxation and dynamics. The minimizers bound the distance atoms may move in one iteration, so that you can relax systems with highly overlapped atoms (large energies and forces) by pushing the atoms off of each other.  

# $\Theta$ Neighbor list update settings  

The distance that atoms can move during individual minimization steps can be quite large, especially at the beginning of a minimization. Thus neighbor list settings of $e\nu e r y=I$ and $d e l a y=\boldsymbol{O}$ are required. This may be combined with either $c h e c k=n o$ (always update the neighbor list) or $c h e c k=y e s$ (only update the neighbor list if at least one atom has moved more than half the neighbor list skin distance since the last reneighboring). Using $c h e c k=y e s$ is recommended since it avoids unneeded reneighboring steps when the system is closer to the minimum and thus atoms move only small distances. Using $c h e c k=n o$ may be required for debugging or when coupling LAMMPS with external codes that require a predictable sequence of neighbor list updates.  

If the settings are not $e\nu e r y=I$ and $d e l a y=0$ , LAMMPS will temporarily apply a neigh_modify every 1 delay 0 check yes setting during the minimization and restore the original setting at the end of the minimization. A corresponding message will be printed to the screen and log file, if this happens.  

Alternate means of relaxing a system are to run dynamics with a small or limited timestep. Or dynamics can be run using $f\boldsymbol{{\kappa}}$ viscous to impose a damping force that slowly drains all kinetic energy from the system. The pair_style soft potential can be used to un-overlap atoms while running dynamics.  

Note that you can minimize some atoms in the system while holding the coordinates of other atoms fixed by applying fix setforce 0.0 0.0 0.0 to the other atoms. See a more detailed discussion of using fixes while minimizing below.  

The minimization styles cg, sd, and hftn involves an outer iteration loop which sets the search direction along which atom coordinates are changed. An inner iteration is then performed using a line search algorithm. The line search typically evaluates forces and energies several times to set new coordinates. Currently, a backtracking algorithm is used which may not be optimal in terms of the number of force evaluations performed, but appears to be more robust than previous line searches we have tried. The backtracking method is described in Nocedal and Wright’s Numerical Optimization (Procedure 3.1 on p 41).  

The minimization styles quickmin and fire perform damped dynamics using an Euler integration step. Thus they require a timestep be defined.  

# Note  

The damped dynamic minimizer algorithms will use the timestep you have defined via the timestep command or its default value. Often they will converge more quickly if you use a timestep about 10x larger than you would normally use for regular molecular dynamics simulations.  

In all cases, the objective function being minimized is the total potential energy of the system as a function of the $\mathbf{N}$ atom coordinates:  

$$
\begin{array}{l}{{\displaystyle{\cal E}(r_{1},r_{2},\dots,r_{N})=\sum_{i,j}{\cal E}_{p a i r}(r_{i},r_{j})+\sum_{i j}{\cal E}_{b o n d}(r_{i},r_{j})+\sum_{i j k}{\cal E}_{a n g l e}(r_{i},r_{j},r_{k})+}}\ {{\displaystyle~\sum_{i j k l}{\cal E}_{d i h e d r a l}(r_{i},r_{j},r_{k},r_{l})+\sum_{i j k l}{\cal E}_{i m p r o p e r}(r_{i},r_{j},r_{k},r_{l})+\sum_{i}{\cal E}_{f i x}(r_{i})}}\end{array}
$$  

where the first term is the sum of all non-bonded pairwise interactions including long-range Coulombic interactions, the second through fifth terms are bond, angle, dihedral, and improper interactions respectively, and the last term is energy due to fixes which can act as constraints or apply force to atoms, such as through interaction with a wall. See the discussion below about how fix commands affect minimization.  

The starting point for the minimization is the current configuration of the atoms.  

The minimization procedure stops if any of several criteria are met:  

# 1.65. minimize command  

• the change in energy between outer iterations is less than etol • the 2-norm (length) of the global force vector is less than the ftol • the line search fails because the step distance backtracks to 0.0 • the number of outer iterations or timesteps exceeds maxiter • the number of total force evaluations exceeds maxeval  

# Note  

the minimization style spin, spin/cg, and spin/lbfgs replace the force tolerance ftol by a torque tolerance. The minimization procedure stops if the 2-norm (length) of the torque vector on atom (defined as the cross product between the atomic spin and its precession vectors omega) is less than ftol, or if any of the other criteria are met. Torque have the same units as the energy.  

![](images/d7d9bf2deaa654e3e9db8c80d0dda9f31a7f173f88b9e33477e47c733e158770.jpg)  

# Note  

You can also use the fix halt command to specify a general criterion for exiting a minimization, that is a calculation performed on the state of the current system, as defined by an equal-style variable.  

For the first criterion, the specified energy tolerance etol is unitless; it is met when the energy change between successive iterations divided by the energy magnitude is less than or equal to the tolerance. For example, a setting of $1.0\mathrm{e}{-4}$ for etol means an energy tolerance of one part in $10{\sim}4$ . For the damped dynamics minimizers this check is not performed for a few steps after velocities are reset to 0, otherwise the minimizer would prematurely converge.  

For the second criterion, the specified force tolerance ftol is in force units, since it is the length of the global force vector for all atoms, e.g. a vector of size 3N for N atoms. Since many of the components will be near zero after minimization, you can think of ftol as an upper bound on the final force on any component of any atom. For example, a setting of 1.0e-4 for ftol means no x, y, or z component of force on any atom will be larger than 1.0e-4 (in force units) after minimization.  

Either or both of the etol and ftol values can be set to 0.0, in which case some other criterion will terminate the minimization.  

During a minimization, the outer iteration count is treated as a timestep. Output is triggered by this timestep, e.g.   
thermodynamic output or dump and restart files.  

Using the thermo_style custom command with the fmax or fnorm keywords can be useful for monitoring the progress of the minimization. Note that these outputs will be calculated only from forces on the atoms, and will not include any extra degrees of freedom, such as from the fix box/relax command.  

Following minimization, a statistical summary is printed that lists which convergence criterion caused the minimizer to stop, as well as information about the energy, force, final line search, and iteration counts. An example is as follows:  

Minimization stats: Stopping criterion $=$ max iterations Energy initial, next-to-last, final $=$ -0.626828169302 -2.82642039062 -2.82643549739 Force two-norm initial, final = 2052.1 91.9642 Force max component initial, $\mathrm{final}=346.0489.78056$ Final line search alpha, max atom move = 2.23899e-06 2.18986e-05 Iterations, force evaluations = 2000 12724  

The 3 energy values are for before and after the minimization and on the next-to-last iteration. This is what the etol parameter checks.  

The two-norm force values are the length of the global force vector before and after minimization. This is what the ftol parameter checks.  

The max-component force values are the absolute value of the largest component (x,y,z) in the global force vector, i.e.   
the infinity-norm of the force vector.  

The alpha parameter for the line-search, when multiplied by the max force component (on the last iteration), gives the max distance any atom moved during the last iteration. Alpha will be 0.0 if the line search could not reduce the energy. Even if alpha is non-zero, if the “max atom move” distance is tiny compared to typical atom coordinates, then it is possible the last iteration effectively caused no atom movement and thus the evaluated energy did not change and the minimizer terminated. Said another way, even with non-zero forces, it’s possible the effect of those forces is to move atoms a distance less than machine precision, so that the energy cannot be further reduced.  

The iterations and force evaluation values are what is checked by the maxiter and maxeval parameters.  

![](images/cc2ff28b228207d5d22c96fc6a9999ec51b23c898f4ed5e6554f4714b9dd8a5a.jpg)  

# Note  

There are several force fields in LAMMPS which have discontinuities or other approximations which may prevent you from performing an energy minimization to tight tolerances. For example, you should use a pair style that goes to 0.0 at the cutoff distance when performing minimization (even if you later change it when running dynamics). If you do not do this, the total energy of the system will have discontinuities when the relative distance between any pair of atoms changes from cutoff plus epsilon to cutoff minus epsilon and the minimizer may thus behave poorly. Some of the many-body potentials use splines and other internal cutoffs that inherently have this problem. The long-range Coulombic styles (PPPM, Ewald) are approximate to within the user-specified tolerance, which means their energy and forces may not agree to a higher precision than the Kspace-specified tolerance. This agreement is further reduced when using tabulation to speed up the computation of the real-space part of the Coulomb interactions, which is enabled by default. In all these cases, the minimizer may give up and stop before finding a minimum to the specified energy or force tolerance.  

Note that a cutoff Lennard-Jones potential (and others) can be shifted so that its energy is 0.0 at the cutoff via the pair_modify command. See the doc pages for individual pair styles for details. Note that most Coulombic potentials have a cutoff, unless versions with a long-range component are used (e.g. pair_style lj/cut/coul/long) or some other damping/smoothing schemes are used. The CHARMM potentials go to 0.0 at the cutoff (e.g. pair_style lj/charmm/coul/charmm), as do the GROMACS potentials (e.g. pair_style lj/gromacs).  

If a soft potential (pair_style soft) is used the Astop value is used for the prefactor (no time dependence).  

The fix box/relax command can be used to apply an external pressure to the simulation box and allow it to shrink/expand during the minimization.  

Only a few other fixes (typically those that add forces) are invoked during minimization. See the doc pages for individual $f\boldsymbol{{x}}$ commands to see which ones are relevant. Current examples of fixes that can be used include:  

• fix addforce • fix addtorque • fix efield • fix enforce2d • fix indent • fix lineforce • fix planeforce • fix setforce • fix spring • fix spring/self • fix viscous • fix wall • fix wall/region  

![](images/940ac4ce9846444079a091ce29875ba12ac4b89e0385d98e8ad3a8a71ba16d2e.jpg)  

# Note  

Some fixes which are invoked during minimization have an associated potential energy. For that energy to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for that fix. The doc pages for individual $f\boldsymbol{a}\boldsymbol{x}$ commands specify if this should be done.  

![](images/6c44607428392ea2cf4027d7ffb6aea4a2938465b4e02de194190676948508ed.jpg)  

# Note  

The minimizers in LAMMPS do not allow for bonds (or angles, etc) to be held fixed while atom coordinates are being relaxed, e.g. via fix shake or fix rigid. See more info in the Restrictions section below.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 1.65.4 Restrictions  

Features that are not yet implemented are listed here, in case someone knows how they could be coded:  

It is an error to use fix shake with minimization because it turns off bonds that should be included in the potential energy of the system. The effect of a fix shake can be approximated during a minimization by using stiff spring constants for the bonds and/or angles that would normally be constrained by the SHAKE algorithm.  

Fix rigid is also not supported by minimization. It is not an error to have it defined, but the energy minimization will not keep the defined body(s) rigid during the minimization. Note that if bonds, angles, etc internal to a rigid body have been turned off (e.g. via neigh_modify exclude), they will not contribute to the potential energy which is probably not what is desired.  

Pair potentials that produce torque on a particle (e.g. granular potentials or the GayBerne potential for ellipsoidal particles) are not relaxed by a minimization. More specifically, radial relaxations are induced, but no rotations are induced by a minimization, so such a system will not fully relax.  

# 1.65.5 Related commands  

min_modify, min_style, run_style  

# 1.65.6 Default  

none  

# 1.66 molecule command  

# 1.66.1 Syntax  

molecule ID file1 keyword values ... file2 keyword values ... fileN ...  

• $\mathrm{ID}=$ user-assigned name for the molecule template • file1,file2,. . . $=$ names of files containing molecule descriptions • zero or more keyword/value pairs may be appended after each file • keyword $=$ offset or toff or boff or aoff or doff or ioff or scale  

offset values $=$ Toff Boff Aoff Doff Ioff Toff $=$ offset to add to atom types Boff $=$ offset to add to bond types Aoff $=$ offset to add to angle types Doff $=$ offset to add to dihedral types Ioff $=$ offset to add to improper types   
toff value = Toff Toff = offset to add to atom types   
boff value = Boff Boff = offset to add to bond types   
aoff value $-$ Aoff Aoff $=$ offset to add to angle types   
doff value = Doff Doff $=$ offset to add to dihedral types   
ioff value $=$ Ioff Ioff $=$ offset to add to improper types   
scale value $=$ sfactor sfactor $=$ scale factor to apply to the size and mass of the molecule  

# 1.66.2 Examples  

molecule 1 mymol.txt   
molecule 1 co2.txt h2o.txt   
molecule CO2 co2.txt boff 3 aoff 2   
molecule 1 mymol.txt offset 6 9 18 23 14   
molecule objects file.1 scale 1.5 file.1 scale 2.0 file.2 scale 1.3  

# 1.66.3 Description  

Define a molecule template that can be used as part of other LAMMPS commands, typically to define a collection of particles as a bonded molecule or a rigid body. Commands that currently use molecule templates include:  

• fix deposit  

# 1.66. molecule command  

• fix pour   
• fix rigid/small   
• fix shake   
• fix gcmc   
• fix bond/react create_atoms   
• atom_style template  

The ID of a molecule template can only contain alphanumeric characters and underscores.  

A single template can contain multiple molecules, listed one per file. Some of the commands listed above currently use only the first molecule in the template, and will issue a warning if the template contains multiple molecules. The atom_style template command allows multiple-molecule templates to define a system with more than one templated molecule.  

Each filename can be followed by optional keywords which are applied only to the molecule in the file as used in this template. This is to make it easy to use the same molecule file in different molecule templates or in different simulations. You can specify the same file multiple times with different optional keywords.  

The offset, toff, boff, aoff, doff, ioff keywords add the specified offset values to the atom types, bond types, angle types, dihedral types, and/or improper types as they are read from the molecule file. E.g. if $\mathrm{\Delta}t o f=2$ , and the file uses atom types 1,2,3, then each created molecule will have atom types 3,4,5. For the offset keyword, all five offset values must be specified, but individual values will be ignored if the molecule template does not use that attribute (e.g. no bonds).  

![](images/c5b5bbf537b8e38f9cd01163057757bacc03fe878497f934323aef3121b26c64.jpg)  

# Note  

Offsets are ignored on lines using type labels, as the type labels will determine the actual types directly depending on the current labelmap settings.  

The scale keyword scales the size of the molecule. This can be useful for modeling polydisperse granular rigid bodies. The scale factor is applied to each of these properties in the molecule file, if they are defined: the individual particle coordinates (Coords section), the individual mass of each particle (Masses section), the individual diameters of each particle (Diameters section), the total mass of the molecule (header keyword $=$ mass), the center-of-mass of the molecule (header keyword $=\mathrm{com}$ ), and the moments of inertia of the molecule (header keyword $=$ inertia).  

# Note  

The molecule command can be used to define molecules with bonds, angles, dihedrals, impropers, or special bond lists of neighbors within a molecular topology, so that you can later add the molecules to your simulation, via one or more of the commands listed above. Since this topology-related information requires that suitable storage is reserved when LAMMPS creates the simulation box (e.g. when using the create_box command or the read_data command) suitable space has to be reserved so you do not overflow those pre-allocated data structures when adding molecules later. Both the create_box command and the read_data command have “extra” options which ensure space is allocated for storing topology info for molecules that are added later.  

# 1.66.4 Format of a molecule file  

The format of an individual molecule file looks similar but is different than that of a data file read by the read_data commands. Here is a simple example for a TIP3P water molecule:  

<html><body><table><tr><td># Water molecule. TIP3P geometry</td></tr><tr><td># header section:</td></tr><tr><td>3 atoms 2 bonds</td></tr><tr><td>1 angles</td></tr><tr><td></td></tr><tr><td># body section: Coords</td></tr><tr><td>1 0.00000 -0.06556 0.00000</td></tr><tr><td>2 0.75695 0.52032 0.00000</td></tr><tr><td>3 -0.75695 0.52032 0.00000</td></tr><tr><td>Types</td></tr><tr><td></td></tr><tr><td>1 1 #0 2 2 #H</td></tr><tr><td>3 2 #H</td></tr><tr><td>Charges</td></tr><tr><td>1 -0.834</td></tr><tr><td>2 0.417</td></tr><tr><td>3 0.417</td></tr><tr><td>Bonds</td></tr><tr><td>1 1 1 2</td></tr><tr><td>2 1 1 3</td></tr><tr><td>Angles</td></tr></table></body></html>  

A molecule file has a header and a body. The header appears first. The first line of the header and thus of the molecule file is always skipped; it typically contains a description of the file or a comment from the software that created the file.  

Then lines are read one line at a time. Lines can have a trailing comment starting with ‘#’ that is ignored. There must be at least one blank between any valid content and the comment. If the line is blank (i.e. contains only white-space after comments are deleted), it is skipped. If the line contains a header keyword, the corresponding value(s) is/are read from the line. A line that is not blank and does not contains a header keyword begins the body of the file.  

The body of the file contains zero or more sections. The first line of a section has only a keyword. The next line is skipped. The remaining lines of the section contain values. The number of lines depends on the section keyword as described below. Zero or more blank lines can be used between sections. Sections can appear in any order, with a few exceptions as noted below.  

These are the recognized header keywords. Header lines can come in any order. The numeric value(s) are read from the beginning of the line. The keyword should appear at the end of the line. All these settings have default values, as explained below. A line need only appear if the value(s) are different than the default, except when defining a body particle, which requires setting the number of atoms to 1, and setting the inertia in a specific section (see below).  

# 1.66. molecule command  

<html><body><table><tr><td>Number(s)</td><td>Keyword</td><td>Meaning</td><td>DefaultValue</td></tr><tr><td>N</td><td>atoms</td><td># of atoms N in molecule</td><td></td></tr><tr><td>Nb</td><td>bonds</td><td>#of bondsNbinmolecule</td><td>0</td></tr><tr><td>Na</td><td>angles</td><td># of angles Na in molecule</td><td></td></tr><tr><td>PN</td><td>dihedrals</td><td># of dihedrals Nd in molecule</td><td></td></tr><tr><td>Ni</td><td>impropers</td><td># of impropers Ni in molecule</td><td></td></tr><tr><td>Nf</td><td>fragments</td><td># of fragments Nf in molecule</td><td></td></tr><tr><td>NintegerNdouble</td><td>body</td><td># of integer and floating-point values in body particle</td><td>0</td></tr><tr><td>Mtotal</td><td>mass</td><td>total mass of molecule</td><td>computed</td></tr><tr><td>Xc Yc Zc</td><td>com</td><td>coordinates of center-of-mass of molecule</td><td>computed</td></tr><tr><td>Ixx Iyy Izz Ixy Ixz Iyz</td><td>inertia</td><td>6 components ofinertia tensor of molecule</td><td>computed</td></tr></table></body></html>  

For mass, com, and inertia, the default is for LAMMPS to calculate this quantity itself if needed, assuming the molecules consist of a set of point particles or finite-size particles (with a non-zero diameter) that do not overlap. If finite-size particles in the molecule do overlap, LAMMPS will not account for the overlap effects when calculating any of these 3 quantities, so you should pre-compute them yourself and list the values in the file.  

The mass and center-of-mass coordinates $\mathrm{(Xc,Yc,Zc)}$ are self-explanatory. The 6 moments of inertia (ixx,iyy,izz,ixy,ixz,iyz) should be the values consistent with the current orientation of the rigid body around its center of mass. The values are with respect to the simulation box XYZ axes, not with respect to the principal axes of the rigid body itself. LAMMPS performs the latter calculation internally.  

These are the allowed section keywords for the body of the file.  

• Coords, Types, Molecules, Fragments, Charges, Diameters, Dipoles, Masses $=$ atom-property sections   
• Bonds, Angles, Dihedrals, Impropers $=$ molecular topology sections   
• Special Bond Counts, Special Bonds $=$ special neighbor info   
• Shake Flags, Shake Atoms, Shake Bond Types $=$ SHAKE info   
• Body Integers, Body Doubles $=$ body-property sections  

For the Types, Bonds, Angles, Dihedrals, and Impropers sections, each atom/bond/angle/etc type can be specified either as a number (numeric type) or as an alphanumeric type label. The latter is only allowed if type labels have been defined, either by the labelmap command or in data files read by the read_data command which have sections for Atom Type Labels, Bond Type Labels, Angle Type Labels, etc. See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used. When using type labels, any values specified as offset are ignored.  

If a Bonds section is specified then the Special Bond Counts and Special Bonds sections can also be used, if desired, to explicitly list the 1-2, 1-3, 1-4 neighbors within the molecule topology (see details below). This is optional since if these sections are not included, LAMMPS will auto-generate this information. Note that LAMMPS uses this info to properly exclude or weight bonded pairwise interactions between bonded atoms. See the special_bonds command for more details. One reason to list the special bond info explicitly is for the thermalized Drude oscillator model which treats the bonds between nuclear cores and Drude electrons in a different manner.  

# Note  

Whether a section is required depends on how the molecule template is used by other LAMMPS commands. For example, to add a molecule via the fix deposit command, the Coords and Types sections are required. To add a rigid body via the fix pour command, the Bonds (Angles, etc) sections are not required, since the molecule will be treated as a rigid body. Some sections are optional. For example, the fix pour command can be used to add “molecules” which are clusters of finite-size granular particles. If the Diameters section is not specified, each particle in the molecule will have a default diameter of 1.0. See the doc pages for LAMMPS commands that use molecule templates for more details.  

Each section is listed below in alphabetic order. The format of each section is described including the number of lines it must contain and rules (if any) for whether it can appear in the data file. For per- atom sections, entries should be numbered from 1 to Natoms (where Natoms is the number of atoms in the template), indicating which atom (or bond, etc) the entry applies to. Per-atom sections need to include a setting for every atom, but the atoms can be listed in any order.  

Coords section:  

• one line per atom • line syntax: ID x y z • $\mathbf{X},\mathbf{y},\mathbf{Z}=$ coordinate of atom  

Types section:  

• one line per atom   
• line syntax: ID type   
• type $=$ atom type of atom (1-Natomtype, or type label)  

Molecules section:  

• one line per atom • line syntax: ID molecule-ID • molecule-ID $=$ molecule ID of atom  

Fragments section:  

• one line per fragment • line syntax: ID a b c d . . . • $\mathrm{a,b,c,d,...=IDs}$ of atoms in fragment  

The ID of a fragment can only contain alphanumeric characters and underscores. The atom IDs should be values from 1 to Natoms, where Natoms $=\#$ of atoms in the molecule.  

Charges section:  

• one line per atom • line syntax: ID q • ${\bf q}={\bf\Psi}$ charge on atom  

This section is only allowed for atom styles that support charge. If this section is not included, the default charge on each atom in the molecule is 0.0.  

Diameters section:  

# 1.66. molecule command  

• one line per atom • line syntax: ID diam • diam $=$ diameter of atom  

This section is only allowed for atom styles that support finite-size spherical particles, e.g. atom_style sphere. If not listed, the default diameter of each atom in the molecule is 1.0.  

Added in version 7Feb2024.  

Dipoles section:  

• one line per atom   
• line syntax: ID mux muy muz   
• mux,muy,muz ${\mathbf{\mu}}={\mathbf{X}}{\mathbf{\mu}}-$ , y-, and z-component of point dipole vector of atom  

This section is only allowed for atom styles that support particles with point dipoles, e.g. atom_style dipole. If not listed, the default dipole component of each atom in the molecule is set to 0.0.  

Masses section:  

• one line per atom • line syntax: ID mass • mass $=$ mass of atom  

This section is only allowed for atom styles that support per-atom mass, as opposed to per-type mass. See the mass command for details. If this section is not included, the default mass for each atom is derived from its volume (see Diameters section) and a default density of 1.0, in units of mass/volume.  

Bonds section:  

• one line per bond • line syntax: ID type atom1 atom2 • type $=$ bond type (1-Nbondtype, or type label) • atom1,atom2 $=$ IDs of atoms in bond  

The IDs for the two atoms in each bond should be values from 1 to Natoms, where Natoms $=\#$ of atoms in the molecule.  

Angles section:  

• one line per angle • line syntax: ID type atom1 atom2 atom3 • type $=$ angle type (1-Nangletype, or type label) • atom1,atom2,atom3 $=$ IDs of atoms in angle  

The IDs for the three atoms in each angle should be values from 1 to Natoms, where Natoms $=\#$ of atoms in the molecule. The three atoms are ordered linearly within the angle. Thus the central atom (around which the angle is computed) is the atom2 in the list.  

Dihedrals section:  

• one line per dihedral • line syntax: ID type atom1 atom2 atom3 atom4 • type $=$ dihedral type (1-Ndihedraltype, or type label) • atom1,atom2,atom3,atom4 $=$ IDs of atoms in dihedral  

The IDs for the four atoms in each dihedral should be values from 1 to Natoms, where Natoms $=\#$ of atoms in the molecule. The 4 atoms are ordered linearly within the dihedral.  

Impropers section:  

• one line per improper • line syntax: ID type atom1 atom2 atom3 atom4 type $=$ improper type (1-Nimpropertype, or type label) • atom1,atom2,atom3,atom4 $=$ IDs of atoms in improper  

The IDs for the four atoms in each improper should be values from 1 to Natoms, where Natoms $=\#$ of atoms in the molecule. The ordering of the 4 atoms determines the definition of the improper angle used in the formula for the defined improper style. See the doc pages for individual styles for details.  

Special Bond Counts section:  

• one line per atom • line syntax: ID N1 N2 N3 • $\mathrm{N}1=\#$ of 1-2 bonds • $\mathrm{N}2=\#$ of 1-3 bonds • ${\mathrm{N}}3=\#$ of 1-4 bonds  

N1, N2, N3 are the number of 1-2, 1-3, 1-4 neighbors respectively of this atom within the topology of the molecule. See the special_bonds page for more discussion of 1-2, 1-3, 1-4 neighbors. If this section appears, the Special Bonds section must also appear.  

As explained above, LAMMPS will auto-generate this information if this section is not specified. If specified, this section will override what would be auto-generated.  

Special Bonds section:  

• one line per atom   
• line syntax: ID a b c d . . .   
• a,b,c,d,. . . $=$ IDs of atoms in $\scriptstyle\mathrm{N}1+\mathrm{N}2+\mathrm{N}3$ special bonds  

A, b, c, d, etc are the IDs of the $\scriptstyle{\mathrm{nl+n}}2+{\mathrm{n}}3$ atoms that are 1-2, 1-3, 1-4 neighbors of this atom. The IDs should be values from 1 to Natoms, where Natoms $=$ # of atoms in the molecule. The first N1 values should be the 1-2 neighbors, the next N2 should be the 1-3 neighbors, the last N3 should be the 1-4 neighbors. No atom ID should appear more than once. See the special_bonds doc page for more discussion of 1-2, 1-3, 1-4 neighbors. If this section appears, the Special Bond Counts section must also appear.  

As explained above, LAMMPS will auto-generate this information if this section is not specified. If specified, this section will override what would be auto-generated.  

# 1.66. molecule command  

Shake Flags section:  

• one line per atom • line syntax: ID flag $\cdot\mathrm{flag}=0,1,2,3,4$  

This section is only needed when molecules created using the template will be constrained by SHAKE via the “fix shake” command. The other two Shake sections must also appear in the file, following this one.  

The meaning of the flag for each atom is as follows. See the fix shake page for a further description of SHAKE clusters.  

• $0=$ not part of a SHAKE cluster • $1=$ part of a SHAKE angle cluster (two bonds and the angle they form) • $2=$ part of a 2-atom SHAKE cluster with a single bond • $3=$ part of a 3-atom SHAKE cluster with two bonds • $4=$ part of a 4-atom SHAKE cluster with three bonds  

Shake Atoms section:  

• one line per atom • line syntax: ID a b c d • $\mathbf{a},\mathbf{b},\mathbf{c},\mathbf{d}=\mathbf{IDs}$ of atoms in cluster  

This section is only needed when molecules created using the template will be constrained by SHAKE via the “fix shake” command. The other two Shake sections must also appear in the file.  

The a,b,c,d values are atom IDs (from 1 to Natoms) for all the atoms in the SHAKE cluster that this atom belongs to.   
The number of values that must appear is determined by the shake flag for the atom (see the Shake Flags section above).   
All atoms in a particular cluster should list their a,b,c,d values identically.  

If $\mathrm{{flag}=0}$ , no a,b,c,d values are listed on the line, just the (ignored) ID.  

If $\mathrm{flag}=1$ , a,b,c are listed, where $\mathrm{a}=\mathrm{ID}$ of central atom in the angle, and b,c the other two atoms in the angle.  

If flag $=2$ , a,b are listed, where $\mathrm{a=ID}$ of atom in bond with the lowest ID, and $\ensuremath{\mathbf{b}}=\ensuremath{\mathrm{ID}}$ of atom in bond with the highes ID.  

If flag $=3$ , a,b,c are listed, where $\mathrm{a}=\mathrm{ID}$ of central atom, and $\boldsymbol{\mathrm{b}},\mathsf{c}=\mathrm{IDs}$ of other two atoms bonded to the central atom.  

If $\mathrm{flag}=4$ , a,b,c,d are listed, where $\mathrm{a}=\mathrm{ID}$ of central atom, and $\boldsymbol{\mathrm{b}},\boldsymbol{\mathrm{c}},\mathrm{d}=\mathrm{IDs}$ of other three atoms bonded to the central atom.  

See the fix shake page for a further description of SHAKE clusters.  

Shake Bond Types section:  

• one line per atom   
• line syntax: ID a b c   
• ${\mathrm{a}},{\mathrm{b}},{\mathrm{c}}=$ bond types (or angle type) of bonds (or angle) in cluster  

This section is only needed when molecules created using the template will be constrained by SHAKE via the “fix shake” command. The other two Shake sections must also appear in the file.  

The a,b,c values are bond types for all bonds in the SHAKE cluster that this atom belongs to. Bond types may be either numbers (from 1 to Nbondtypes) or bond type labels as defined by the labelmap command or a “Bond Type Labels” section of a data file.  

The number of values that must appear is determined by the shake flag for the atom (see the Shake Flags section above).   
All atoms in a particular cluster should list their a,b,c values identically.  

If $\mathrm{{flag}=0}$ , no a,b,c values are listed on the line, just the (ignored) ID.  

If $\mathrm{{flag}=1}$ , a,b,c are listed, where ${\mathrm{~a~}}=$ bondtype of the bond between the central atom and the first non-central atom (value b in the Shake Atoms section), $\mathbf{b}=$ bondtype of the bond between the central atom and the second non-central atom (value c in the Shake Atoms section), and $\mathbf{c}=$ the angle type (1 to Nangletypes, or angle type label) of the angle between the three atoms.  

If ${\mathrm{flag}}=2$ , only a is listed, where ${\mathrm{a}}=$ bondtype of the bond between the two atoms in the cluster.  

If $\mathrm{flag}=3$ , a,b are listed, where ${\mathrm{a}}=$ bondtype of the bond between the central atom and the first non-central atom (value b in the Shake Atoms section), and $\mathbf{b}=$ bondtype of the bond between the central atom and the second non-central atom (value c in the Shake Atoms section).  

If flag $=4$ , a,b,c are listed, where ${\mathrm{a}}=$ bondtype of the bond between the central atom and the first non-central atom (value b in the Shake Atoms section), $\mathbf{b}=$ bondtype of the bond between the central atom and the second non-central atom (value c in the Shake Atoms section), and ${\mathfrak{c}}=$ bondtype of the bond between the central atom and the third non-central atom (value d in the Shake Atoms section).  

See the fix shake page for a further description of SHAKE clusters.  

Body Integers section:  

• one line   
• line syntax: N E F   
• $\Nu=$ number of sub-particles or number or vertices   
• $\mathrm{E,F=}$ number of edges and faces  

This section is only needed when the molecule is a body particle. the other Body section must also appear in the file.  

The total number of values that must appear is determined by the body style, and must be equal to the Ninteger value given in the body header.  

For nparticle and rounded/polygon, only the number of sub-particles or vertices N is required, and Ninteger should have a value of 1.  

For rounded/polyhedron, the number of edges E and faces F is required, and Ninteger should have a value of 3.  

See the Howto body page for a further description of the file format.  

Body Doubles section:  

• first line   
• line syntax: Ixx Iyy Izz Ixy Ixz Iyz   
• Ixx Iyy Izz Ixy Ixz Iyz $=6$ components of inertia tensor of body particle   
• one line per sub-particle or vertex   
• line syntax: x y z   
• x, y, ${\bf Z}={\bf$ coordinates of sub-particle or vertex   
• one line per edge   
• line syntax: N1 N2   
• N1, ${\mathrm{N}}2=$ vertex indices   
• one line per face   
• line syntax: N1 N2 N3 N4   
• N1, N2, N3, ${\mathrm{N}}4= $ vertex indices   
• last line   
• line syntax: diam   
• diam $=$ rounded diameter that surrounds each vertex  

This section is only needed when the molecule is a body particle. the other Body section must also appear in the file.  

The total number of values that must appear is determined by the body style, and must be equal to the Ndouble value given in the body header. The 6 moments of inertia and the 3N coordinates of the sub-particles or vertices are required for all body styles.  

For rounded/polygon, the $\mathrm{E}=6+3^{*}\mathrm{N}+1$ edges are automatically determined from the vertices.  

For rounded/polyhedron, the 2E vertex indices for the end points of the edges and 4F vertex indices defining the face are required.  

See the Howto body page for a further description of the file format.  

# 1.66.5 Restrictions  

None  

# 1.66.6 Related commands  

fix deposit, fix pour, fix gcmc  

# 1.66.7 Default  

The default keywords values are offset 0 0 0 0 0 and scale $=1.0$ .  

# 1.67 neb command  

# 1.67.1 Syntax  

neb etol ftol N1 N2 Nevery file-style arg keyword values  

• etol $=$ stopping tolerance for energy (dimensionless)   
• ftol $=$ stopping tolerance for force (force units)   
• $\mathrm{{N}1=\operatorname*{max}}$ # of iterations (timesteps) to run initial NEB   
• $\mathrm{N}2=\operatorname*{max}\#$ of iterations (timesteps) to run barrier-climbing NEB   
• Nevery $=$ print replica energies and reaction coordinates every this many timesteps   
• file-style $=$ final or each or none final arg = filename filename = file with initial coords for final replica coords for intermediate replicas are linearly interpolated between first and last replica each arg $=$ filename filename $=$ unique filename for each replica (except first) with its initial coords none $\mathrm{arg}=\mathrm{no}$ argument all replicas assumed to already have their initial coords   
• zero or more keyword/value pairs may be appended   
• keyword $=$ verbosity verbosity value $=$ verbose or default or terse verbose $=$ very detailed per-replica output default $=$ some per-replica output terse $=$ only global state output  

# 1.67.2 Examples  

<html><body><table><tr><td>neb 0.1 0.0 1000 500 50 final c0ords.final</td></tr><tr><td></td></tr><tr><td>neb 0.0 0.001 1000 500 50 each coords.initial.$i</td></tr><tr><td>neb 0.0 0.001 1000 500 50 none verbose</td></tr></table></body></html>  

# 1.67.3 Description  

Perform a nudged elastic band (NEB) calculation using multiple replicas of a system. Two or more replicas must be used; the first and last are the end points of the transition path.  

NEB is a method for finding both the atomic configurations and height of the energy barrier associated with a transition state, e.g. for an atom to perform a diffusive hop from one energy basin to another in a coordinated fashion with its neighbors. The implementation in LAMMPS follows the discussion in these 4 papers: (HenkelmanA), (HenkelmanB), (Nakano) and (Maras).  

Each replica runs on a partition of one or more processors. Processor partitions are defined at run-time using the - partition command-line switch. Note that if you have MPI installed, you can run a multi-replica simulation with more replicas (partitions) than you have physical processors, e.g you can run a 10-replica simulation on just one or two processors. You will simply not get the performance speed-up you would see with one or more physical processors per replica. See the Howto replica doc page for further discussion.  

![](images/d2730802cec7f5d84053818196f07a69187d0bbfd4fa4da7bd90edfd9bef2bf9.jpg)  

# Note  

As explained below, a NEB calculation performs a damped dynamics minimization across all the replicas. The minimizer uses whatever timestep you have defined in your input script, via the timestep command. Often NEB will converge more quickly if you use a timestep about $10\mathrm{x}$ larger than you would normally use for dynamics simulations.  

When a NEB calculation is performed, it is assumed that each replica is running the same system, though LAMMPS does not check for this. I.e. the simulation domain, the number of atoms, the interaction potentials, and the starting configuration when the neb command is issued should be the same for every replica.  

In a NEB calculation each replica is connected to other replicas by inter-replica nudging forces. These forces are imposed by the fix neb command, which must be used in conjunction with the neb command. The group used to define the fix neb command defines the NEB atoms which are the only ones that inter-replica springs are applied to. If the group does not include all atoms, then non-NEB atoms have no inter-replica springs and the forces they feel and their motion is computed in the usual way due only to other atoms within their replica. Conceptually, the non-NEB atoms provide a background force field for the NEB atoms. They can be allowed to move during the NEB minimization procedure (which will typically induce different coordinates for non-NEB atoms in different replicas), or held fixed using other LAMMPS commands such as fix setforce. Note that the partition command can be used to invoke a command on a subset of the replicas, e.g. if you wish to hold NEB or non-NEB atoms fixed in only the end-point replicas.  

The initial atomic configuration for each of the replicas can be specified in different manners via the file-style setting, as discussed below. Only atoms whose initial coordinates should differ from the current configuration need be specified.  

Conceptually, the initial and final configurations for the first replica should be states on either side of an energy barrier.  

As explained below, the initial configurations of intermediate replicas can be atomic coordinates interpolated in a linear fashion between the first and last replicas. This is often adequate for simple transitions. For more complex transitions, it may lead to slow convergence or even bad results if the minimum energy path (MEP, see below) of states over the barrier cannot be correctly converged to from such an initial path. In this case, you will want to generate initial states for the intermediate replicas that are geometrically closer to the MEP and read them in.  

For a file-style setting of final, a filename is specified which contains atomic coordinates for zero or more atoms, in the format described below. For each atom that appears in the file, the new coordinates are assigned to that atom in the final replica. Each intermediate replica also assigns a new position to that atom in an interpolated manner. This is done by using the current position of the atom as the starting point and the read-in position as the final point. The distance between them is calculated, and the new position is assigned to be a fraction of the distance. E.g. if there are 10 replicas, the second replica will assign a position that is $10\%$ of the distance along a line between the starting and final point, and the 9th replica will assign a position that is $90\%$ of the distance along the line. Note that for this procedure to produce consistent coordinates across all the replicas, the current coordinates need to be the same in all replicas. LAMMPS does not check for this, but invalid initial configurations will likely result if it is not the case.  

![](images/dbc7d81bdc696a678d0c6fff9d6003f1e58b16dac9fd1acc2ccd77b140e65924.jpg)  

# Note  

The “distance” between the starting and final point is calculated in a minimum-image sense for a periodic simulation box. This means that if the two positions are on opposite sides of a box (periodic in that dimension), the distance between them will be small, because the periodic image of one of the atoms is close to the other. Similarly, even if the assigned position resulting from the interpolation is outside the periodic box, the atom will be wrapped back into the box when the NEB calculation begins.  

For a file-style setting of each, a filename is specified which is assumed to be unique to each replica. This can be done by using a variable in the filename, e.g.  

variable i equal part neb 0.0 0.001 1000 500 50 each coords.initial.\$i  

which in this case will substitute the partition ID (0 to N-1) for the variable I, which is also effectively the replica ID.   
See the variable command for other options, such as using world-, universe-, or uloop-style variables.  

Each replica (except the first replica) will read its file, formatted as described below, and for any atom that appears in the file, assign the specified coordinates to its atom. The various files do not need to contain the same set of atoms.  

For a file-style setting of none, no filename is specified. Each replica is assumed to already be in its initial configuration at the time the neb command is issued. This allows each replica to define its own configuration by reading a replicaspecific data or restart or dump file, via the read_data, read_restart, or read_dump commands. The replica-specific names of these files can be specified as in the discussion above for the each file-style. Also see the section below for how a NEB calculation can produce restart files, so that a long calculation can be restarted if needed.  

![](images/ab699eb2e3ebbaaf1096c42274808964d8fc53247e6cc238b0a778ecbda82c11.jpg)  

# Note  

None of the file-style settings change the initial configuration of any atom in the first replica. The first replica must thus be in the correct initial configuration at the time the neb command is issued.  

A NEB calculation proceeds in two stages, each of which is a minimization procedure, performed via damped dynamics. To enable this, you must first define a damped dynamics min_style, such as quickmin or fire. The cg, sd, and hftn styles cannot be used, since they perform iterative line searches in their inner loop, which cannot be easily synchronized across multiple replicas.  

The minimizer tolerances for energy and force are set by etol and ftol, the same as for the minimize command.  

A non-zero etol means that the NEB calculation will terminate if the energy criterion is met by every replica. The energies being compared to etol do not include any contribution from the inter-replica nudging forces, since these are non-conservative. A non-zero ftol means that the NEB calculation will terminate if the force criterion is met by every replica. The forces being compared to ftol include the inter-replica nudging forces.  

The maximum number of iterations in each stage is set by N1 and $N2$ . These are effectively timestep counts since each iteration of damped dynamics is like a single timestep in a dynamics run. During both stages, the potential energy of each replica and its normalized distance along the reaction path (reaction coordinate RD) will be printed to the screen and log file every Nevery timesteps. The RD is 0 and 1 for the first and last replica. For intermediate replicas, it is the cumulative distance (normalized by the total cumulative distance) between adjacent replicas, where “distance” is defined as the length of the 3N-vector of differences in atomic coordinates, where $\mathbf{N}$ is the number of NEB atoms involved in the transition. These outputs allow you to monitor NEB’s progress in finding a good energy barrier. N1 and $N2$ must both be multiples of Nevery.  

In the first stage of NEB, the set of replicas should converge toward a minimum energy path (MEP) of conformational states that transition over a barrier. The MEP for a transition is defined as a sequence of 3N-dimensional states, each of which has a potential energy gradient parallel to the MEP itself. The configuration of highest energy along a MEP corresponds to a saddle point. The replica states will also be roughly equally spaced along the MEP due to the interreplica nudging force added by the fix neb command.  

In the second stage of NEB, the replica with the highest energy is selected and the inter-replica forces on it are converted to a force that drives its atom coordinates to the top or saddle point of the barrier, via the barrier-climbing calculation described in (HenkelmanB). As before, the other replicas rearrange themselves along the MEP so as to be roughly equally spaced.  

When both stages are complete, if the NEB calculation was successful, the configurations of the replicas should be along (close to) the MEP and the replica with the highest energy should be an atomic configuration at (close to) the saddle point of the transition. The potential energies for the set of replicas represents the energy profile of the transition along the MEP.  

A few other settings in your input script are required or advised to perform a NEB calculation. See the NOTE about the choice of timestep at the beginning of this doc page.  

An atom map must be defined which it is not by default for atom_style atomic problems. The atom_modify map command can be used to do this.  

The minimizers in LAMMPS operate on all atoms in your system, even non-NEB atoms, as defined above. To prevent non-NEB atoms from moving during the minimization, you should use the fix setforce command to set the force on each of those atoms to 0.0. This is not required, and may not even be desired in some cases, but if those atoms move too far (e.g. because the initial state of your system was not well-minimized), it can cause problems for the NEB procedure.  

The damped dynamics minimizers, such as quickmin and fire), adjust the position and velocity of the atoms via an Euler integration step. Thus you must define an appropriate timestep to use with NEB. As mentioned above, NEB will often converge more quickly if you use a timestep about $10\mathrm{x}$ larger than you would normally use for dynamics simulations.  

# 1.67. neb command  

Each file read by the neb command containing atomic coordinates used to initialize one or more replicas must be formatted as follows.  

The file can be ASCII text or a gzipped text file (detected by a .gz suffix). The file can contain initial blank lines or comment lines starting with “#” which are ignored. The first non-blank, non-comment line should list $\Nu=$ the number of lines to follow. The N successive lines contain the following information:  

<html><body><table><tr><td>ID1 xl yl zl</td></tr><tr><td>ID2 x2 y2 z2</td></tr><tr><td></td></tr><tr><td>IDN xN yN zN</td></tr></table></body></html>  

The fields are the atom ID, followed by the x,y,z coordinates. The lines can be listed in any order. Additional trailing information on the line is OK, such as a comment.  

Note that for a typical NEB calculation you do not need to specify initial coordinates for very many atoms to produce differing starting and final replicas whose intermediate replicas will converge to the energy barrier. Typically only new coordinates for atoms geometrically near the barrier need be specified.  

Also note there is no requirement that the atoms in the file correspond to the NEB atoms in the group defined by the fix neb command. Not every NEB atom need be in the file, and non-NEB atoms can be listed in the file.  

Four kinds of output can be generated during a NEB calculation: energy barrier statistics, thermodynamic output by each replica, dump files, and restart files.  

When running with multiple partitions (each of which is a replica in this case), the print-out to the screen and master log.lammps file contains a line of output, printed once every Nevery timesteps. The amount of information printed in this line can be selected with the verbosity keyword. Available options are terse, default, and verbose.  

With the terse setting, it contains the timestep, the maximum force of a replica, the maximum force per atom (in any replica), potential gradients in the initial, final, and climbing replicas, the forward and backward energy barriers, the total reaction coordinate (RDT).  

With the default setting, additionally the normalized reaction coordinate and potential energy of each replica are printed.  

With the verbose setting, additional per-replica properties are printed: the “path angle” (pathangle), the angle between the 3N-length tangent vector and the 3N-length force vector at image $i$ (angletangrad), the angle between the 3N-length energy gradient vector of replica $i$ and that of replica $i{+}1$ (anglegrad), the norm of the energy gradient (gradV), the the two-norm of the 3N-length force vector (RepForce), and the maximum force component of any atom (MaxAtomForce).  

The “maximum force per replica” is the two-norm of the 3N-length force vector for the atoms in each replica, maximized across replicas, which is what the ftol setting is checking against. In this case, N is all the atoms in each replica. The “maximum force per atom” is the maximum force component of any atom in any replica. The potential gradients are the two-norm of the 3N-length force vector solely due to the interaction potential i.e. without adding in inter-replica forces.  

The “reaction coordinate” (RD) for each replica is the two-norm of the 3N-length vector of distances between its atoms and the preceding replica’s atoms, added to the RD of the preceding replica. The RD of the first replica $\mathrm{RD1}=0.0$ ; the RD of the final replica $\mathrm{RDN}=\mathrm{RDT}$ , the total reaction coordinate. The normalized RDs are divided by RDT, so that they form a monotonically increasing sequence from zero to one. When computing RD, N only includes the atoms being operated on by the fix neb command.  

The forward (reverse) energy barrier is the potential energy of the highest replica minus the energy of the first (last) replica.  

The “path angle” (pathangle) for the replica i which is the angle between the 3N-length vectors $(R_{i-1}-R_{i})$ and $(R_{i+1}-R_{i})$ (where $R_{i}$ is the atomic coordinates of replica $i\dot{.}$ ). A “path angle” of 180 indicates that replicas $i{-}1,i$ and $i{+}1$ are aligned.  

“angletangrad” is the angle between the 3N-length tangent vector and the 3N-length force vector at image i. The tangent vector is calculated as in (HenkelmanA) for all intermediate replicas and at R2 - R1 and RM - RM-1 for the first and last replica, respectively. “anglegrad” is the angle between the 3N-length energy gradient vector of replica $i$ and that of replica $i{+}1$ . It is not defined for the final replica and reads nan. gradV is the norm of the energy gradient of image $i\left(\nabla V\right)$ . ReplicaForce is the two-norm of the 3N-length force vector (including nudging forces) for replica $i$ . MaxAtomForce is the maximum force component of any atom in replica i.  

When a NEB calculation does not converge properly, the supplementary information can help understanding what is going wrong. For instance when the path angle becomes acute, the definition of tangent used in the NEB calculation is questionable and the NEB cannot may diverge (Maras).  

When running on multiple partitions, LAMMPS produces additional log files for each partition, e.g. log.lammps.0, log.lammps.1, etc. For a NEB calculation, these contain the thermodynamic output for each replica.  

If dump commands in the input script define a filename that includes a universe or uloop style variable, then one dump file (per dump command) will be created for each replica. At the end of the NEB calculation, the final snapshot in each file will contain the sequence of snapshots that transition the system over the energy barrier. Earlier snapshots will show the convergence of the replicas to the MEP.  

Likewise, restart filenames can be specified with a universe or uloop style variable, to generate restart files for each replica. These may be useful if the NEB calculation fails to converge properly to the MEP, and you wish to restart the calculation from an intermediate point with altered parameters.  

There are 2 Python scripts provided in the tools/python directory, neb_combine.py and neb_final.py, which are useful in analyzing output from a NEB calculation. Assume a NEB simulation with M replicas, and the NEB atoms labeled with a specific atom type.  

The neb_combine.py script extracts atom coords for the NEB atoms from all M dump files and creates a single dump file where each snapshot contains the NEB atoms from all the replicas and one copy of non-NEB atoms from the first replica (presumed to be identical in other replicas). This can be visualized/animated to see how the NEB atoms relax as the NEB calculation proceeds.  

The neb_final.py script extracts the final snapshot from each of the M dump files to create a single dump file with M snapshots. This can be visualized to watch the system make its transition over the energy barrier.  

To illustrate, here are images from the final snapshot produced by the neb_combine.py script run on the dump file produced by the two example input scripts in examples/neb.  

![](images/44ffca17e0a1c5e9855944c4cb669eaff4278cf8d4b3523aa68bc111435e5f97.jpg)  

# 1.67.4 Restrictions  

This command can only be used if LAMMPS was built with the REPLICA package. See the Build package doc page for more info.  

# 1.67.5 Related commands  

prd, temper, fix langevin, fix viscous, fix neb  

# 1.67.6 Default  

verbosity $=$ default  

(HenkelmanA) Henkelman and Jonsson, J Chem Phys, 113, 9978-9985 (2000). (HenkelmanB) Henkelman, Uberuaga, Jonsson, J Chem Phys, 113, 9901-9904 (2000). (Nakano) Nakano, Comp Phys Comm, 178, 280-289 (2008). (Maras) Maras, Trushin, Stukowski, Ala-Nissila, Jonsson, Comp Phys Comm, 205, 13-21 (2016)  

# 1.68 neb/spin command  

# 1.68.1 Syntax  

neb/spin etol ttol N1 N2 Nevery file-style arg keyword  

• etol $=$ stopping tolerance for energy (energy units)   
• ttol $=$ stopping tolerance for torque ( units)   
• $\mathrm{{N1}}=\operatorname*{max}\#$ of iterations (timesteps) to run initial NEB   
• $\mathrm{N}2=\mathrm{max}$ # of iterations (timesteps) to run barrier-climbing NEB   
• Nevery $=$ print replica energies and reaction coordinates every this many timesteps   
• file-style $=$ final or each or none final arg $=$ filename filename $=$ file with initial coords for final replica coords for intermediate replicas are linearly interpolated between first and last replica each arg $=$ filename filename $=$ unique filename for each replica (except first) with its initial coords none arg = no argument all replicas assumed to already have their initial coords   
• keyword $=$ verbose verbose $=$ print supplemental information  

# 1.68.2 Examples  

<html><body><table><tr><td></td></tr><tr><td>neb/ /spin 0.1 0.0 1000 500 50 final coords.final</td></tr><tr><td>neb spin 0.0 0.001 1000 500 50 each coords.initial.$i</td></tr><tr><td>neb/spin 0.0 0.001 1000 500 50 none verbose</td></tr></table></body></html>  

# 1.68.3 Description  

Perform a geodesic nudged elastic band (GNEB) calculation using multiple replicas of a system. Two or more replicas must be used; the first and last are the end points of the transition path.  

GNEB is a method for finding both the spin configurations and height of the energy barrier associated with a transition state, e.g. spins to perform a collective rotation from one energy basin to another. The implementation in LAMMPS follows the discussion in the following paper: (Bessarab).  

Each replica runs on a partition of one or more processors. Processor partitions are defined at run-time using the - partition command-line switch. Note that if you have MPI installed, you can run a multi-replica simulation with more replicas (partitions) than you have physical processors, e.g you can run a 10-replica simulation on just one or two processors. You will simply not get the performance speed-up you would see with one or more physical processors per replica. See the Howto replica doc page for further discussion.  

![](images/7824aadbd7ef30b922e9dc1e250215f6bb1933d4769bd8a9d6e2b34520e777a8.jpg)  

# Note  

As explained below, a GNEB calculation performs a minimization across all the replicas. One of the spin style minimizers has to be defined in your input script.  

When a GNEB calculation is performed, it is assumed that each replica is running the same system, though LAMMPS does not check for this. I.e. the simulation domain, the number of magnetic atoms, the interaction potentials, and the starting configuration when the neb command is issued should be the same for every replica.  

In a GNEB calculation each replica is connected to other replicas by inter-replica nudging forces. These forces are imposed by the fix neb/spin command, which must be used in conjunction with the neb command. The group used to define the fix neb/spin command defines the GNEB magnetic atoms which are the only ones that inter-replica springs are applied to. If the group does not include all magnetic atoms, then non-GNEB magnetic atoms have no inter-replica springs and the torques they feel and their precession motion is computed in the usual way due only to other magnetic atoms within their replica. Conceptually, the non-GNEB atoms provide a background force field for the GNEB atoms. Their magnetic spins can be allowed to evolve during the GNEB minimization procedure.  

The initial spin configuration for each of the replicas can be specified in different manners via the file-style setting, as discussed below. Only atomic spins whose initial coordinates should differ from the current configuration need to be specified.  

Conceptually, the initial and final configurations for the first replica should be states on either side of an energy barrier.  

As explained below, the initial configurations of intermediate replicas can be spin coordinates interpolated in a linear fashion between the first and last replicas. This is often adequate for simple transitions. For more complex transitions, it may lead to slow convergence or even bad results if the minimum energy path (MEP, see below) of states over the barrier cannot be correctly converged to from such an initial path. In this case, you will want to generate initial states for the intermediate replicas that are geometrically closer to the MEP and read them in.  

For a file-style setting of final, a filename is specified which contains atomic and spin coordinates for zero or more atoms, in the format described below. For each atom that appears in the file, the new coordinates are assigned to that atom in the final replica. Each intermediate replica also assigns a new spin to that atom in an interpolated manner. This is done by using the current direction of the spin at the starting point and the read-in direction as the final point.  

The “angular distance” between them is calculated, and the new direction is assigned to be a fraction of the angular distance.  

![](images/71577e5e39427dd491932ef3320c4174f8d6a522f066d810da6b78b7ecbe2209.jpg)  

# Note  

The “angular distance” between the starting and final point is evaluated in the geodesic sense, as described in (Bessarab).  

![](images/278610375559a5edc6456e855763a29ddb4b37c8b1937a3f7dad0bd09ec6e040.jpg)  

# Note  

The angular interpolation between the starting and final point is achieved using Rodrigues formula:  

$$
\vec{m}_{i}^{\nu}=\vec{m}_{i}^{I}\cos(\omega_{i}^{\nu})+(\vec{k}_{i}\times\vec{m}_{i}^{I})\sin(\omega_{i}^{\nu})+(1.0-\cos(\omega_{i}^{\nu}))\vec{k}_{i}(\vec{k}_{i}\cdot\vec{m}_{i}^{I})
$$  

where $\vec{m}_{i}^{I}$ is the initial spin configuration for spin i, $\omega_{i}^{\nu}$ is a rotation angle defined as:  

$$
\omega_{i}^{\nu}=(\nu-1)\Delta\omega_{i}\mathrm{and}\Delta\omega_{i}=\frac{\omega_{i}}{Q-1}
$$  

with $\nu$ the image number, Q the total number of images, and $\omega_{i}$ the total rotation between the initial and final spins. $\vec{k}_{i}$ defines a rotation axis such as:  

$$
{\vec{k}}_{i}={\frac{{\vec{m}}_{i}^{I}\times{\vec{m}}_{i}^{F}}{\left|{\vec{m}}_{i}^{I}\times{\vec{m}}_{i}^{F}\right|}}
$$  

if the initial and final spins are not aligned. If the initial and final spins are aligned, then their cross product is null, and the expression above does not apply. If they point toward the same direction, the intermediate images conserve the same orientation. If the initial and final spins are aligned, but point toward opposite directions, an arbitrary rotation vector belonging to the plane perpendicular to initial and final spins is chosen. In this case, a warning message is displayed.  

For a file-style setting of each, a filename is specified which is assumed to be unique to each replica. See the neb documentation page for more information about this option.  

For a file-style setting of none, no filename is specified. Each replica is assumed to already be in its initial configuration at the time the neb command is issued. This allows each replica to define its own configuration by reading a replicaspecific data or restart or dump file, via the read_data, read_restart, or read_dump commands. The replica-specific names of these files can be specified as in the discussion above for the each file-style. Also see the section below for how a NEB calculation can produce restart files, so that a long calculation can be restarted if needed.  

![](images/92ca8ffabaa6fdf68a1730020041ccb57d5b6f4656decb868e5d28b0822c970b.jpg)  

# Note  

None of the file-style settings change the initial configuration of any atom in the first replica. The first replica must thus be in the correct initial configuration at the time the neb command is issued.  

A NEB calculation proceeds in two stages, each of which is a minimization procedure. To enable this, you must first define a min_style, using either the spin, spin/cg, or spin/lbfgs style (see min_spin for more information). The other styles cannot be used, since they relax the lattice degrees of freedom instead of the spins.  

The minimizer tolerances for energy and force are set by etol and ttol, the same as for the minimize command.  

A non-zero etol means that the GNEB calculation will terminate if the energy criterion is met by every replica. The energies being compared to etol do not include any contribution from the inter-replica nudging forces, since these are non-conservative. A non-zero ttol means that the GNEB calculation will terminate if the torque criterion is met by every replica. The torques being compared to ttol include the inter-replica nudging forces.  

The maximum number of iterations in each stage is set by N1 and N2. These are effectively timestep counts since each iteration of damped dynamics is like a single timestep in a dynamics run. During both stages, the potential energy of each replica and its normalized distance along the reaction path (reaction coordinate RD) will be printed to the screen and log file every Nevery timesteps. The RD is 0 and 1 for the first and last replica. For intermediate replicas, it is the cumulative angular distance (normalized by the total cumulative angular distance) between adjacent replicas, where “distance” is defined as the length of the 3N-vector of the geodesic distances in spin coordinates, with N the number of GNEB spins involved (see equation (13) in (Bessarab)). These outputs allow you to monitor NEB’s progress in finding a good energy barrier. $N I$ and N2 must both be multiples of Nevery.  

In the first stage of GNEB, the set of replicas should converge toward a minimum energy path (MEP) of conformational states that transition over a barrier. The MEP for a transition is defined as a sequence of 3N-dimensional spin states, each of which has a potential energy gradient parallel to the MEP itself. The configuration of highest energy along a MEP corresponds to a saddle point. The replica states will also be roughly equally spaced along the MEP due to the inter-replica nudging force added by the fix neb command.  

In the second stage of GNEB, the replica with the highest energy is selected and the inter-replica forces on it are converted to a force that drives its spin coordinates to the top or saddle point of the barrier, via the barrier-climbing calculation described in (Bessarab). As before, the other replicas rearrange themselves along the MEP so as to be roughly equally spaced.  

When both stages are complete, if the GNEB calculation was successful, the configurations of the replicas should be along (close to) the MEP and the replica with the highest energy should be a spin configuration at (close to) the saddle point of the transition. The potential energies for the set of replicas represents the energy profile of the transition along the MEP.  

An atom map must be defined which it is not by default for atom_style atomic problems. The atom_modify map command can be used to do this.  

An initial value can be defined for the timestep. Although, the spin minimization algorithm is an adaptive timestep methodology, so that this timestep is likely to evolve during the calculation.  

The minimizers in LAMMPS operate on all spins in your system, even non-GNEB atoms, as defined above.  

Each file read by the neb/spin command containing spin coordinates used to initialize one or more replicas must be formatted as follows.  

The file can be ASCII text or a gzipped text file (detected by a .gz suffix). The file can contain initial blank lines or comment lines starting with “#” which are ignored. The first non-blank, non-comment line should list $\Nu=$ the number of lines to follow. The N successive lines contain the following information:  

<html><body><table><tr><td>ID1 gl xl yl zl sxl syl szl</td><td></td></tr><tr><td>ID2 g2 x2 y2 z2 sx2 sy2 sz2</td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td>IDN gN yN zN sxN syN szN</td><td></td></tr></table></body></html>  

The fields are the atom ID, the norm of the associated magnetic spin, followed by the $x,y,z$ coordinates and the sx,sy,sz spin coordinates. The lines can be listed in any order. Additional trailing information on the line is OK, such as a comment.  

Note that for a typical GNEB calculation you do not need to specify initial spin coordinates for very many atoms to produce differing starting and final replicas whose intermediate replicas will converge to the energy barrier. Typically only new spin coordinates for atoms geometrically near the barrier need be specified.  

# 1.68. neb/spin command  

Also note there is no requirement that the atoms in the file correspond to the GNEB atoms in the group defined by the fix neb command. Not every GNEB atom need be in the file, and non-GNEB atoms can be listed in the file.  

Four kinds of output can be generated during a GNEB calculation: energy barrier statistics, thermodynamic output by each replica, dump files, and restart files.  

When running with multiple partitions (each of which is a replica in this case), the print-out to the screen and master log.lammps file contains a line of output, printed once every Nevery timesteps. It contains the timestep, the maximum torque per replica, the maximum torque per atom (in any replica), potential gradients in the initial, final, and climbing replicas, the forward and backward energy barriers, the total reaction coordinate (RDT), and the normalized reaction coordinate and potential energy of each replica.  

The “maximum torque per replica” is the two-norm of the 3N-length vector given by the cross product of a spin by its precession vector omega, in each replica, maximized across replicas, which is what the ttol setting is checking against. In this case, N is all the atoms in each replica. The “maximum torque per atom” is the maximum torque component of any atom in any replica. The potential gradients are the two-norm of the 3N-length magnetic precession vector solely due to the interaction potential i.e. without adding in inter-replica forces, and projected along the path tangent (as detailed in Appendix D of (Bessarab)).  

The “reaction coordinate” (RD) for each replica is the two-norm of the 3N-length vector of geodesic distances between its spins and the preceding replica’s spins (see equation (13) of (Bessarab)), added to the RD of the preceding replica. The RD of the first replica $\mathrm{RD1}=0.0$ ; the RD of the final replica $\mathrm{RDN}=\mathrm{RDT}$ , the total reaction coordinate. The normalized RDs are divided by RDT, so that they form a monotonically increasing sequence from zero to one. When computing RD, N only includes the spins being operated on by the fix neb/spin command.  

The forward (reverse) energy barrier is the potential energy of the highest replica minus the energy of the first (last) replica.  

Supplementary information for all replicas can be printed out to the screen and master log.lammps file by adding the verbose keyword. This information include the following. The “GradVidottan” are the projections of the potential gradient for the replica i on its tangent vector (as detailed in Appendix D of (Bessarab)). The “DNi” are the non normalized geodesic distances (see equation (13) of (Bessarab)), between a replica i and the next replica $_{\mathrm{i}+1}$ . For the last replica, this distance is not defined and a “NAN” value is the corresponding output.  

When a NEB calculation does not converge properly, the supplementary information can help understanding what is going wrong.  

When running on multiple partitions, LAMMPS produces additional log files for each partition, e.g. log.lammps.0, log.lammps.1, etc. For a GNEB calculation, these contain the thermodynamic output for each replica.  

If dump commands in the input script define a filename that includes a universe or uloop style variable, then one dump file (per dump command) will be created for each replica. At the end of the GNEB calculation, the final snapshot in each file will contain the sequence of snapshots that transition the system over the energy barrier. Earlier snapshots will show the convergence of the replicas to the MEP.  

Likewise, restart filenames can be specified with a universe or uloop style variable, to generate restart files for each replica. These may be useful if the GNEB calculation fails to converge properly to the MEP, and you wish to restart the calculation from an intermediate point with altered parameters.  

A c file script in provided in the tool/spin/interpolate_gneb directory, that interpolates the MEP given the information provided by the verbose output option (as detailed in Appendix D of (Bessarab)).  

# 1.68.4 Restrictions  

This command can only be used if LAMMPS was built with the SPIN package. See the Build package doc page for more info.  

For magnetic GNEB calculations, only the spin_none value for the line keyword can be used when minimization styles spin/cg and spin/lbfgs are employed.  

# 1.68.5 Related commands  

min/spin, fix neb/spin  

# 1.68.6 Default  

none  

(Bessarab) Bessarab, Uzdin, Jonsson, Comp Phys Comm, 196, 335-347 (2015).  

# 1.69 neigh_modify command  

# 1.69.1 Syntax  

• one or more keyword/value pairs may be listed  

keyword $=$ delay or every or check or once or cluster or include or exclude or page or one or binsiz   
$\hookrightarrow\mathrm{Or}$ collection/type or collection/interval   
delay value $=\mathrm{N}$ $\mathrm{N}=$ delay building neighbor lists until this many steps since last build   
every value $=\mathrm{M}$ $\mathrm{M}=\mathrm{c}$ onsider building neighbor lists every this many steps   
check value $\mathrm{\Omega}=\mathrm{yes}$ or no yes = only build if at least one atom has moved half the skin distance or more no = always build on 1st step where every and delay are conditions are satisfied   
once value = yes or no yes $-$ only build neighbor list once at start of run and never rebuild no = rebuild neighbor list according to other settings   
cluster value = yes or no yes = check bond,angle,etc neighbor list for nearby clusters no = do not check bond,angle,etc neighbor list for nearby clusters   
include value = group-ID group-ID = only build pair neighbor lists for atoms in this group   
exclude values: type M N M,N = exclude if one atom in pair is type M, other is type N (M and N may be type labels) group group1-ID group2-ID group1-ID,group2-ID = exclude if one atom is in 1st group, other in 2nd molecule/intra group-ID group-ID $=$ exclude if both atoms are in the same molecule and in group molecule/inter group-ID group-ID $=$ exclude if both atoms are in different molecules and in group  

# 1.69. neigh_modify command  

none delete all exclude settings   
page value $=\mathrm{N}$ $\mathrm{N}=$ number of pairs stored in a single neighbor page   
one value $=\mathrm{N}$ $\mathrm{N}=\mathrm{max}$ number of neighbors of one atom   
binsize value = size size = bin size for neighbor list construction (distance units)   
collection/type values = N arg1 ... argN N = number of custom collections arg = N separate lists of types (see below)   
collection/interval values = N arg1 ... argN N = number of custom collections arg = N separate cutoffs for intervals (see below)  

# 1.69.2 Examples  

<html><body><table><tr><td>neigh modify every 2 delay 10 check yes page 100000</td></tr><tr><td>neigh modify exclude type 2 3</td></tr><tr><td>neigh modify exclude group frozen f frozen check no</td></tr><tr><td>neigh modify exclude group residuel chain3</td></tr><tr><td>neigh modify exclude molecule intra rigid</td></tr><tr><td>neigh modify collection type 2 1*2,5 3*4</td></tr><tr><td>neigh modify collection interval 2 1.0 10.0</td></tr></table></body></html>  

# 1.69.3 Description  

This command sets parameters that affect the building and use of pairwise neighbor lists. Depending on what pair interactions and other commands are defined, a simulation may require one or more neighbor lists.  

The every, delay, check, and once options affect how often lists are built as a simulation runs. The delay setting means never build new lists until at least N steps after the previous build. The every setting means attempt to build lists every M steps (after the delay has passed). If the check setting is $n o$ , the lists are built on the first step that satisfies the delay and every settings. If the check setting is yes, then the every and delay settings determine when a build may possibly be performed, but an actual build only occurs if at least one atom has moved more than half the neighbor skin distance (specified in the neighbor command) since the last neighbor list build.  

# Impact of neighbor list settings  

The choice of neighbor list settings can have a significant impact on the (parallel) performance of LAMMPS and the correctness of the simulation results. Since building the neighbor lists is time consuming, doing it less frequently can speed up a calculation. If the lists are rebuilt too infrequently, however, interacting pairs may be missing and thus the resulting pairwise interactions incorrect. The optimal settings depend on many factors like the properties of the simulated system (density, geometry, topology, temperature, pressure), the force field parameters and settings, the size of the timestep, neighbor list skin distance and more. The default settings are chosen to be very conservative to guarantee correctness of the simulation. They depend on the check flag heuristics to reduce the number of neighbor list rebuilds at a minor expense for executing the check. Determining the correctness of a specific choice of neighbor list settings is complicated by the fact that a neighbor list rebuild changes the order in which pairwise interactions are computed and thus - due to the limitations of floating-point math - the trajectory.  

If the once setting is yes, then the neighbor list is only built once at the beginning of each run, and never rebuilt, except on steps when a restart file is written, or steps when a fix forces a rebuild to occur (e.g. fixes that create or delete atoms, such as fix deposit or fix evaporate). This setting should only be made if you are certain atoms will not move far enough that the neighbor list should be rebuilt, e.g. running a simulation of a cold crystal. Note that it is not that expensive to check if neighbor lists should be rebuilt.  

When the rRESPA integrator is used (see the run_style command), the every and delay parameters refer to the longest (outermost) timestep.  

The cluster option does a sanity test every time neighbor lists are built for bond, angle, dihedral, and improper interactions, to check that each set of 2, 3, or 4 atoms is a cluster of nearby atoms. It does this by computing the distance between pairs of atoms in the interaction and ensuring they are not further apart than half the periodic box length. If they are, an error is generated, since the interaction would be computed between far-away atoms instead of their nearby periodic images. The only way this should happen is if the pairwise cutoff is so short that atoms that are part of the same interaction are not communicated as ghost atoms. This is an unusual model (e.g. no pair interactions at all) and the problem can be fixed by use of the comm_modify cutoff command. Note that to save time, the default cluster setting is no, so that this check is not performed.  

The include option limits the building of pairwise neighbor lists to atoms in the specified group. This can be useful for models where a large portion of the simulation is particles that do not interact with other particles or with each other via pairwise interactions. The group specified with this option must also be specified via the atom_modify first command. Note that specifying “all” as the group-ID effectively turns off the include option.  

The exclude option turns off pairwise interactions between certain pairs of atoms, by not including them in the neighbo list. These are sample scenarios where this is useful:  

• In crack simulations, pairwise interactions can be shut off between 2 slabs of atoms to effectively create a crack. • When a large collection of atoms is treated as frozen, interactions between those atoms can be turned off to save needless computation. E.g. Using the fix setforce command to freeze a wall or portion of a bio-molecule. • When one or more rigid bodies are specified, interactions within each body can be turned off to save needless computation. See the fix rigid command for more details.  

Changed in version 29Aug2024: Support for type labels was added.  

The exclude type option turns off the pairwise interaction if one atom is of type M and the other of type N. M can equal N. The exclude group option turns off the interaction if one atom is in the first group and the other is the second. Group1-ID can equal group2-ID. The exclude molecule/intra option turns off the interaction if both atoms are in the specified group and in the same molecule, as determined by their molecule ID. The exclude molecule/inter turns off the interaction between pairs of atoms that have different molecule IDs and are both in the specified group.  

Each of the exclude options can be specified multiple times. The exclude type option is the most efficient option to use; it requires only a single check, no matter how many times it has been specified. The other exclude options are more expensive if specified multiple times; they require one check for each time they have been specified.  

Note that the exclude options only affect pairwise interactions; see the delete_bonds command for information on turning off bond interactions.  

![](images/02538a06ca02cf132c5ee3b262f90d996406c3f821b517865b58a3f01046c350.jpg)  

# Note  

Excluding pairwise interactions will not work correctly when also using a long-range solver via the kspace_style command. LAMMPS will give a warning to this effect. This is because the short-range pairwise interaction needs to subtract off a term from the total energy for pairs whose short-range interaction is excluded, to compensate for how the long-range solver treats the interaction. This is done correctly for pairwise interactions that are excluded (or weighted) via the special_bonds command. But it is not done for interactions that are excluded via these neigh_modify exclude options.  

The page and one options affect how memory is allocated for the neighbor lists. For most simulations the default settings for these options are fine, but if a very large problem is being run or a very long cutoff is being used, these parameters can be tuned. The indices of neighboring atoms are stored in “pages”, which are allocated one after another as they fill up. The size of each page is set by the page value. A new page is allocated when the next atom’s neighbors could potentially overflow the list. This threshold is set by the one value which tells LAMMPS the maximum number of neighbor’s one atom can have.  

# Note  

LAMMPS can crash without an error message if the number of neighbors for a single particle is larger than the page setting, which means it is much, much larger than the one setting. This is because LAMMPS does not error check these limits for every pairwise interaction (too costly), but only after all the particle’s neighbors have been found. This problem usually means something is very wrong with the way you have setup your problem (particle spacing, cutoff length, neighbor skin distance, etc). If you really expect that many neighbors per particle, then boost the one and page settings accordingly.  

The binsize option allows you to specify what size of bins will be used in neighbor list construction to sort and find neighboring atoms. By default, for neighbor style bin, LAMMPS uses bins that are 1/2 the size of the maximum pair cutoff. For neighbor style multi, the bins are 1/2 the size of the collection interaction cutoff. Typically these are good values for minimizing the time for neighbor list construction. This setting overrides the default. If you make it too big, there is little overhead due to looping over bins, but more atoms are checked. If you make it too small, the optimal number of atoms is checked, but bin overhead goes up. If you set the binsize to 0.0, LAMMPS will use the default binsize of 1/2 the cutoff.  

The collection/type option allows you to define collections of atom types, used by the multi neighbor mode. By grouping atom types with similar physical size or interaction cutoff lengths, one may be able to improve performance by reducing overhead. You must first specify the number of collections N to be defined followed by N lists of types. Each list consists of a series of type ranges separated by commas. The range can be specified as a single numeric value, or a wildcard asterisk can be used to specify a range of values. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $\mathbf{\tilde{\gamma}_{\mathrm{n}}}\mathbf{*}\mathbf{\tilde{\gamma}_{\mathrm{~\textbf~{~n~}~}}}$ or $\mathbf{\tilde{\rho}}_{\mathrm{m}}^{*}\mathbf{\tilde{n}}^{,}$ . For example, if M $=$ the number of atom types, then an asterisk with no numeric values means all types from 1 to M. A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to M (inclusive). A middle asterisk means all types from m to n (inclusive). Note that all atom types must be included in exactly one of the N collections.  

The collection/interval option provides a similar capability. This command allows a user to define collections by specifying a series of cutoff intervals. LAMMPS will automatically sort atoms into these intervals based on their typedependent cutoffs or their finite size. You must first specify the number of collections N to be defined followed by N values representing the upper cutoff of each interval. This command is particularly useful for granular pair styles where the interaction distance of particles depends on their radius and may not depend on their atom type.  

# 1.69.4 Restrictions  

If the delay setting is non-zero, then it must be a multiple of the every setting.  

The molecule/intra and molecule/inter exclusion options can only be used with atom styles that define molecule IDs.  

The value of the page setting must be at least $10\mathrm{x}$ larger than the one setting. This ensures neighbor pages are not mostly empty space.  

The exclude group setting is currently not compatible with dynamic groups.  

# 1.69.5 Related commands  

neighbor, delete_bonds  

# 1.69.6 Default  

The option defaults are delay $=0$ , every $=1$ , check $=$ yes, once $\mathbf{\tau}=\mathbf{n}\mathbf{O}$ , cluster $\mathbf{\tau}=\mathbf{n}\mathbf{o}$ , include $=$ all (same as no include option defined), exclude $=$ none, page $=100000$ , one $=2000$ , and binsize $=0.0$ .  

# 1.70 neighbor command  

# 1.70.1 Syntax  

• skin $=$ extra distance beyond force cutoff (distance units) • style $=$ bin or nsq or multi  

# 1.70.2 Examples  

<html><body><table><tr><td>neighbor 0.3 bin</td></tr><tr><td>neighbor 2.0 nsq</td></tr><tr><td></td></tr></table></body></html>  

# 1.70.3 Description  

This command sets parameters that affect the building of pairwise neighbor lists. All atom pairs within a neighbor cutoff distance equal to the their force cutoff plus the skin distance are stored in the list. Typically, the larger the skin distance, the less often neighbor lists need to be built, but more pairs must be checked for possible force interactions every timestep. The default value for skin depends on the choice of units for the simulation; see the default values below.  

The skin distance is also used to determine how often atoms migrate to new processors if the check option of the neigh_modify command is set to yes. Atoms are migrated (communicated) to new processors on the same timestep that neighbor lists are re-built.  

The style value selects what algorithm is used to build the list. The bin style creates the list by binning which is an operation that scales linearly with N/P, the number of atoms per processor where $\Nu=$ total number of atoms and $\mathrm{\bfP}$ $=$ number of processors. It is almost always faster than the nsq style which scales as $(\mathrm{N}/\mathrm{P})^{\wedge}2$ . For unsolvated small molecules in a non-periodic box, the nsq choice can sometimes be faster. Either style should give the same answers.  

The multi style is a modified binning algorithm that is useful for systems with a wide range of cutoff distances, e.g. due to different size particles. For granular pair styles, cutoffs are set to the sum of the maximum atomic radii for each atom type. For the bin style, the bin size is set to 1/2 of the largest cutoff distance between any pair of atom types and a single set of bins is defined to search over for all atom types. This can be inefficient if one pair of types has a very long cutoff, but other type pairs have a much shorter cutoff. The multi style uses different sized bins for collections of different sized particles, where “size” may mean the physical size of the particle or its cutoff distance for interacting with other particles. Different sets of bins are then used to construct the neighbor lists as as further described by Shire, Hanley, and Stratford (Shire) and Monti et al. (Monti). This imposes some extra setup overhead, but the searches themselves may be much faster.  

For instance in a dense binary system in d-dimensions with a ratio of the size of the largest to smallest collection bin $\lambda$ , the computational costs of building a default neighbor list grows as $\lambda^{2d}$ while the costs for multi grows as $\lambda^{d}$ , equivalent to the cost of force evaluations, as argued in Monti et al. (Monti). In other words, the neighboring costs of multi are expected to scale the same as force calculations, such that its relative cost is independent of the particle size ratio. This is not the case for the default style which becomes substantially more expensive with increasing size ratios.  

By default in multi, each atom type defines a separate collection of particles. For systems where two or more atom types have the same size (either physical size or cutoff distance), the definition of collections can be customized, which can result in less overhead and faster performance. See the neigh_modify command for how to define custom collections. Whether the collection definition is customized or not, also see the comm_modify mode multi command for communication options that further improve performance in a manner consistent with neighbor style multi.  

# Note  

If there are multiple sub-styles in a hybrid/overlay pair style that cover the same atom types, but have significantly different cutoffs, the multi style does not apply. Instead, the pair_modify neigh/trim setting applies (which is yes by default). Please check the neighbor list summary printed at the beginning of a calculation to verify that the desired set of neighbor list builds is performed.  

The neigh_modify command has additional options that control how often neighbor lists are built and which pairs are stored in the list.  

When a run is finished, counts of the number of neighbors stored in the pairwise list and the number of times neighbor lists were built are printed to the screen and log file. See the Run output page for details.  

# 1.70.4 Restrictions  

none  

# 1.70.5 Related commands  

neigh_modify, units, comm_modify  

# 1.70.6 Default  

0.3 bin for units $=1\mathrm{j}$ , $\mathrm{skin}=0.3$ sigma   
2.0 bin for units $=$ real or metal, $\mathrm{skin}=2.0$ Angstroms   
0.001 bin for units ${\bf{\mu}}=\mathrm{{si}}$ , $\mathrm{skin}=0.001$ meters $=1.0\mathrm{mm}$   
0.1 bin for units $=\mathrm{cgs}$ , $\mathrm{skin}=0.1~\mathrm{cm}=1.0\mathrm{mm}$  

(Shire) Shire, Hanley and Stratford, Comp. Part. Mech., (2020).   
(Monti) Monti, Clemmer, Srivastava, Silbert, Grest, and Lechman, Phys. Rev. E, (2022).  

# 1.71 newton command  

# 1.71.1 Syntax  

newton flag newton flag1 flag2  

• flag $=o n$ or off for both pairwise and bonded interactions • $\mathrm{{flag}1}=o n$ or $o f f$ for pairwise interactions • $\operatorname{flag}2=o n$ or off for bonded interactions  

# 1.71.2 Examples  

newton off newton on off  

# 1.71.3 Description  

This command turns Newton’s third law on or off for pairwise and bonded interactions. For most problems, setting Newton’s third law to on means a modest savings in computation at the cost of two times more communication. Whether this is faster depends on problem size, force cutoff lengths, a machine’s compute/communication ratio, and how many processors are being used.  

Setting the pairwise newton flag to off means that if two interacting atoms are on different processors, both processors compute their interaction and the resulting force information is not communicated. Similarly, for bonded interactions, newton off means that if a bond, angle, dihedral, or improper interaction contains atoms on 2 or more processors, the interaction is computed by each processor.  

LAMMPS should produce the same answers for any newton flag settings, except for round-off issues.  

With run_style respa and only bonded interactions (bond, angle, etc) computed in the innermost timestep, it may be faster to turn newton off for bonded interactions, to avoid extra communication in the innermost loop.  

# 1.71.4 Restrictions  

The newton bond setting cannot be changed after the simulation box is defined by a read_data or create_box command.  

# 1.71.5 Related commands  

run_style respa  

# 1.71.6 Default  

See the variable command for info on how to define and use different kinds of variables in LAMMPS input scripts. If a variable name is a single lower-case character from “a” to $\mathbf{\sigma}^{\leftarrow}\mathbf{z}^{\Game}$ , it can be used in an input script command as $\$\mathrm{a}$ or $\$2$ . If it is multiple letters, it can be used as $\$\{\mathrm{myTemp}\}$ .  

If multiple variables are used as arguments to the next command, then all must be of the same variable style: index, loop, file, universe, or uloop. An exception is that universe- and uloop-style variables can be mixed in the same next command.  

All the variables specified with the next command are incremented by one value from their respective list of values. A file-style variable reads the next line from its associated file. An atomfile-style variable reads the next set of lines (one per atom) from its associated file. String- or atom- or equal- or world-style variables cannot be used with the next command, since they only store a single value.  

When any of the variables in the next command has no more values, a flag is set that causes the input script to skip the next jump command encountered. This enables a loop containing a next command to exit. As explained in the variable command, the variable that has exhausted its values is also deleted. This allows it to be used and re-defined later in the input script. File-style and atomfile-style variables are exhausted when the end-of-file is reached.  

When the next command is used with index- or loop-style variables, the next value is assigned to the variable for all processors. When the next command is used with file-style variables, the next line is read from its file and the string assigned to the variable. When the next command is used with atomfile-style variables, the next set of per-atom values is read from its file and assigned to the variable.  

When the next command is used with universe- or uloop-style variables, all universe- or uloop-style variables must be listed in the next command. This is because of the manner in which the incrementing is done, using a single lock file for all variables. The next value (for each variable) is assigned to whichever processor partition executes the command first. All processors in the partition are assigned the same value(s). Running LAMMPS on multiple partitions of processors via the -partition command-line switch. Universe- and uloop-style variables are incremented using the files “tmp.lammps.variable” and “tmp.lammps.variable.lock” which you will see in your directory during and after such a LAMMPS run.  

Here is an example of running a series of simulations using the next command with an index-style variable. If this input script is named in.polymer, 8 simulations would be run using data files from directories run1 through run8.  

variable d index run1 run2 run3 run4 run5 run6 run7 run8 shell cd \$d   
read_data data.polymer   
run 10000   
shell cd ..   
clear   
next d   
jump in.polymer  

If the variable “d” were of style universe, and the same in.polymer input script were run on 3 partitions of processors, then the first 3 simulations would begin, one on each set of processors. Whichever partition finished first, it would assign variable “d” the fourth value and run another simulation, and so forth until all 8 simulations were finished.  

Jump and next commands can also be nested to enable multi-level loops. For example, this script will run 15 simulations in a double loop.  

variable i loop 3 variable j loop 5 clear read_data data.polymer.\$i\$j print Running simulation \$i.\$j run 10000  

(continues on next page)  

(continued from previous page)  

next jjump in.script  
next i  
jump in.script  

Here is an example of a double loop which uses the $i f$ and jump commands to break out of the inner loop when a condition is met, then continues iterating through the outer loop.  

label loopa   
variable a loop 5 label loopb variable b loop 5 print $\mathrm{^{\prime\prime}A,B=\hbar\Omega\hbar\Omega\hbar^{\prime}}$ " run 10000 if $\$10>2$ then "jump in.script break" next b jump in.script loopb   
label break   
variable b delete   
next a   
jump in.script loopa  

# 1.72.4 Restrictions  

As described above.  

# 1.72.5 Related commands  

jump, include, shell, variable,  

# 1.72.6 Default  

none  

# 1.73 package command  

# 1.73.1 Syntax  

newton $=$ off or on off $=$ set Newton pairwise flag off (default and required) on $=$ set Newton pairwise flag on (currently not allowed) pair/only $=$ off or on off = apply "gpu" suffix to all available styles in the GPU package (default) on = apply "gpu" suffix only pair styles binsize value = size size = bin size for neighbor list construction (distance units) split = fraction fraction = fraction of atoms assigned to GPU (default = 1.0) tpa value = Nlanes Nlanes = # of GPU vector lanes (CUDA threads) used per atom blocksize value = size size = thread block size for pair force computation omp value = Nthreads Nthreads = number of OpenMP threads to use on CPU (default = 0) platform value = id id = For OpenCL, platform ID for the GPU or accelerator gpuID values = id id = ID of first GPU to be used on each node device_type value $-$ intelgpu or nvidiagpu or amdgpu or applegpu or generic or custom,val1,val2, val1,val2,... = custom OpenCL accelerator configuration parameters (see below for details) ocl_args value = args args = List of additional OpenCL compiler arguments delimited by colons   
intel args = NPhi keyword value ... $\mathrm{Nphi}=\#$ of co-processors per node   
zero or more keyword/value pairs may be appended   
keywords = mode or omp or lrt or balance or ghost or tpc or tptask or pppm_table or no_affinity mode value = single or mixed or double single = perform force calculations in single precision mixed = perform force calculations in mixed precision double = perform force calculations in double precision omp value = Nthreads Nthreads = number of OpenMP threads to use on CPU (default = 0) lrt value = yes or no yes = use additional thread dedicated for some PPPM calculations no = do not dedicate an extra thread for some PPPM calculations balance value = split split = fraction of work to offload to co-processor, -1 for dynamic ghost value = yes or no yes = include ghost atoms for offload no = do not include ghost atoms for offload tpc value = Ntpc Ntpc = max number of co-processor threads per co-processor core (default = 4) tptask value = Ntptask Ntptask = max number of co-processor threads per MPI task (default = 240) pppm_table value = yes or no yes = Precompute pppm values in table (doesn't change accuracy) no = Compute pppm values on the fly no_affinity values = none   
kokkos args $=$ keyword value ...   
zero or more keyword/value pairs may be appended   
keywords $=$ neigh or neigh/qeq or neigh/thread or neigh/transpose or newton or binsize or comm␣   
$\hookrightarrow$ or comm/exchange or comm/forward or comm/pair/forward or comm/fix/forward or comm/   
$\hookrightarrow$ reverse or comm/pair/reverse or sort or atom/map or gpu/aware or pair/only neigh value = full or half full = full neighbor list half = half neighbor list built in thread-safe manner neigh/qeq value = full or half full = full neighbor list half = half neighbor list built in thread-safe manner neigh/thread value = off or on off = thread only over atoms on = thread over both atoms and neighbors neigh/transpose value $-$ off or on off = use same memory layout for GPU neigh list build as pair style on = use transposed memory layout for GPU neigh list build newton = off or on off = set Newton pairwise and bonded flags off on = set Newton pairwise and bonded flags on binsize value = size size = bin size for neighbor list construction (distance units) comm value = no or host or device use value for comm/exchange and comm/forward and comm/pair/forward and comm/fix/   
→forward and comm/reverse comm/exchange value = no or host or device comm/forward value = no or host or device comm/pair/forward value $-$ no or device comm/fix/forward value = no or device comm/reverse value = no or host or device no = perform communication pack/unpack in non-KOKKOS mode host = perform pack/unpack on host (e.g. with OpenMP threading) device = perform pack/unpack on device (e.g. on GPU) comm/pair/reverse value = no or device no = perform communication pack/unpack in non-KOKKOS mode device = perform pack/unpack on device (e.g. on GPU) sort value = no or device no = perform atom sorting in non-KOKKOS mode device = perform atom sorting on device (e.g. on GPU) atom/map value = no or device no = build atom map in non-KOKKOS mode device = build atom map on device (e.g. on GPU) gpu/aware = off or on off = do not use GPU-aware MPI on = use GPU-aware MPI (default) pair/only = off or on off = use device acceleration (e.g. GPU) for all available styles in the KOKKOS package␣   
$\hookrightarrow$ (default) on = use device acceleration only for pair styles (and host acceleration for others)   
omp args = Nthreads keyword value ...   
Nthreads = # of OpenMP threads to associate with each MPI process   
zero or more keyword/value pairs may be appended   
keywords = neigh neigh value = yes or no yes = threaded neighbor list build (default) no $=$ non-threaded neighbor list build  

# 1.73.2 Examples  

package gpu 0   
package gpu 1 split 0.75   
package gpu 2 split -1.0   
package gpu 0 omp 2 device_type intelgpu   
package kokkos neigh half comm device   
package omp 0 neigh no   
package omp 4   
package intel 1   
package intel 2 omp 4 mode mixed balance 0.5  

# 1.73.3 Description  

This command invokes package-specific settings for the various accelerator packages available in LAMMPS. Currently the following packages use settings from this command: GPU, INTEL, KOKKOS, and OPENMP.  

If this command is specified in an input script, it must be near the top of the script, before the simulation box has been defined. This is because it specifies settings that the accelerator packages use in their initialization, before a simulation is defined.  

This command can also be specified from the command-line when launching LAMMPS, using the “-pk” command-line switch. The syntax is exactly the same as when used in an input script.  

Note that all of the accelerator packages require the package command to be specified (except the OPT package), if the package is to be used in a simulation (LAMMPS can be built with an accelerator package without using it in a particular simulation). However, in all cases, a default version of the command is typically invoked by other accelerator settings.  

The KOKKOS package requires a “-k on” command-line switch respectively, which invokes a “package kokkos” command with default settings.  

For the GPU, INTEL, and OPENMP packages, if a “-sf gpu” or “-sf intel” or “-sf omp” command-line switch is used to auto-append accelerator suffixes to various styles in the input script, then those switches also invoke a “package gpu”, “package intel”, or “package omp” command with default settings.  

![](images/699a69ff3db44fa49561fef23442e723e4621c7f795bb4a5380d7d30ec60e63a.jpg)  

# Note  

A package command for a particular style can be invoked multiple times when a simulation is setup, e.g. by the $-c$ on, -k on, -sf, and -pk command-line switches, and by using this command in an input script. Each time it is used all of the style options are set, either to default values or to specified settings. I.e. settings from previous invocations do not persist across multiple invocations.  

See the Accelerator packages page for more details about using the various accelerator packages for speeding up LAMMPS simulations.  

The gpu style invokes settings associated with the use of the GPU package.  

The Ngpu argument sets the number of GPUs per node. If Ngpu is 0 and no other keywords are specified, GPU or accelerator devices are auto-selected. In this process, all platforms are searched for accelerator devices and GPUs are chosen if available. The device with the highest number of compute cores is selected. The number of devices is increased to be the number of matching accelerators with the same number of compute cores. If there are more devices than MPI tasks, the additional devices will be unused. The auto-selection of GPUs/ accelerator devices and platforms can be restricted by specifying a non-zero value for Ngpu and / or using the gpuID, platform, and device_type keywords as described below. If there are more MPI tasks (per node) than GPUs, multiple MPI tasks will share each GPU.  

Optional keyword/value pairs can also be specified. Each has a default value as listed below.  

The neigh keyword specifies where neighbor lists for pair style computation will be built. If neigh is yes, which is the default, neighbor list building is performed on the GPU. If neigh is no, neighbor list building is performed on the CPU. GPU neighbor list building currently cannot be used with a triclinic box. GPU neighbor lists are not compatible with commands that are not GPU-enabled. When a non-GPU enabled command requires a neighbor list, it will also be built on the CPU. In these cases, it will typically be more efficient to only use CPU neighbor list builds.  

The newton keyword sets the Newton flags for pairwise (not bonded) interactions to off or on, the same as the newton command allows. Currently, only an off value is allowed, since all the GPU package pair styles require this setting. This means more computation is done, but less communication. In the future a value of on may be allowed, so the newton keyword is included as an option for compatibility with the package command for other accelerator styles. Note that the newton setting for bonded interactions is not affected by this keyword.  

The pair/only keyword can change how any “gpu” suffix is applied. By default a suffix is applied to all styles for which an accelerated variant is available. However, that is not always the most effective way to use an accelerator. With pair/only set to on the suffix will only by applied to supported pair styles, which tend to be the most effective in using an accelerator and their operation can be overlapped with all other computations on the CPU.  

The binsize keyword sets the size of bins used to bin atoms in neighbor list builds performed on the GPU, if $n e i g h=$ yes is set. If binsize is set to 0.0 (the default), then the binsize is set automatically using heuristics in the GPU package.  

The split keyword can be used for load balancing force calculations between CPU and GPU cores in GPU-enabled pair styles. If $0<s p l i t<1.0$ , a fixed fraction of particles is offloaded to the GPU while force calculation for the other particles occurs simultaneously on the CPU. If split $<0.0$ , the optimal fraction (based on CPU and GPU timings) is calculated every 25 timesteps, i.e. dynamic load-balancing across the CPU and GPU is performed. If ${s p l i t}=1.0$ , all force calculations for GPU accelerated pair styles are performed on the GPU. In this case, other hybrid pair interactions, bond, angle, dihedral, improper, and long-range calculations can be performed on the CPU while the GPU is performing force calculations for the GPU-enabled pair style. If all CPU force computations complete before the GPU completes, LAMMPS will block until the GPU has finished before continuing the timestep.  

As an example, if you have two GPUs per node and 8 CPU cores per node, and would like to run on 4 nodes (32 cores) with dynamic balancing of force calculation across CPU and GPU cores, you could specify  

<html><body><table><tr><td>mpirun -np 32 -sf gpu -in in.script # launch command package gpu 2 split -1 input script command</td></tr></table></body></html>  

In this case, all CPU cores and GPU devices on the nodes would be utilized. Each GPU device would be shared by 4 CPU cores. The CPU cores would perform force calculations for some fraction of the particles at the same time the GPUs performed force calculation for the other particles.  

The gpuID keyword is used to specify the first ID for the GPU or other accelerator that LAMMPS will use. For example, if the ID is 1 and Ngpu is 3, GPUs 1-3 will be used. Device IDs should be determined from the output of nvc_get_devices, ocl_get_devices, or hip_get_devices as provided in the lib/gpu directory. When using OpenCL with accelerators that have main memory NUMA, the accelerators can be split into smaller virtual accelerators for more efficient use with MPI.  

The tpa keyword sets the number of GPU vector lanes per atom used to perform force calculations. With a default value of 1, the number of lanes will be chosen based on the pair style, however, the value can be set explicitly with this keyword to fine-tune performance. For large cutoffs or with a small number of particles per GPU, increasing the value can improve performance. The number of lanes per atom must be a power of 2 and currently cannot be greater than the SIMD width for the GPU / accelerator. In the case it exceeds the SIMD width, it will automatically be decreased to meet the restriction.  

The blocksize keyword allows you to tweak the number of threads used per thread block. This number should be a multiple of 32 (for GPUs) and its maximum depends on the specific GPU hardware. Typical choices are 64, 128, or 256. A larger block size increases occupancy of individual GPU cores, but reduces the total number of thread blocks, thus may lead to load imbalance. On modern hardware, the sensitivity to the blocksize is typically low.  

The Nthreads value for the omp keyword sets the number of OpenMP threads allocated for each MPI task. This setting controls OpenMP parallelism only for routines run on the CPUs. For more details on setting the number of OpenMP threads, see the discussion of the Nthreads setting on this page for the “package omp” command. The meaning of Nthreads is exactly the same for the GPU, INTEL, and GPU packages.  

The platform keyword is only used with OpenCL to specify the ID for an OpenCL platform. See the output from ocl_get_devices in the lib/gpu directory. In LAMMPS only one platform can be active at a time and by default $(\mathrm{id}=-1)$ ) the platform is auto-selected to find the GPU with the most compute cores. When Ngpu or other keywords are specified, the auto-selection is appropriately restricted. For example, if Ngpu is 3, only platforms with at least 3 accelerators are considered. Similar restrictions can be enforced by the gpuID and device_type keywords.  

The device_type keyword can be used for OpenCL to specify the type of GPU to use or specify a custom configuration for an accelerator. In most cases this selection will be automatic and there is no need to use the keyword. The applegpu type is not specific to a particular GPU vendor, but is separate due to the more restrictive Apple OpenCL implementation. For expert users, to specify a custom configuration, the custom keyword followed by the next parameters can be specified:  

CONFIG_ID, SIMD_SIZE, MEM_THREADS, SHUFFLE_AVAIL, FAST_MATH, THREADS_PER_ATOM,THREADS_PER_CHARGE, THREADS_PER_THREE, BLOCK_PAIR, BLOCK_BIO_PAIR, BLOCK_ELLIPSE,PPPM_BLOCK_1D, BLOCK_NBOR_BUILD, BLOCK_CELL_2D, BLOCK_CELL_ID, MAX_SHARED_TYPES,MAX_BIO_SHARED_TYPES, PPPM_MAX_SPLINE, NBOR_PREFETCH.  

CONFIG_ID can be 0. SHUFFLE_AVAIL in {0,1} indicates that inline-PTX (NVIDIA) or OpenCL extensions (Intel) should be used for horizontal vector operations. FAST_MATH in {0,1} indicates that OpenCL fast math optimizations are used during the build and hardware-accelerated transcendental functions are used when available. THREADS_PER_\* give the default tpa values for ellipsoidal models, styles using charge, and any other styles. The BLOCK_\* parameters specify the block sizes for various kernel calls and the MAX_\*SHARED\*_ parameters are used to determine the amount of local shared memory to use for storing model parameters.  

For OpenCL, the routines are compiled at runtime for the specified GPU or accelerator architecture. The ocl_args keyword can be used to specify additional flags for the runtime build.  

The intel style invokes settings associated with the use of the INTEL package. The keywords balance, ghost, tpc, and tptask are only applicable if LAMMPS was built with Xeon Phi co-processor support and are otherwise ignored.  

The Nphi argument sets the number of co-processors per node. This can be set to any value, including 0, if LAMMPS was not built with co-processor support.  

Optional keyword/value pairs can also be specified. Each has a default value as listed below.  

The Nthreads value for the omp keyword sets the number of OpenMP threads allocated for each MPI task. This setting controls OpenMP parallelism only for routines run on the CPUs. For more details on setting the number of OpenMP threads, see the discussion of the Nthreads setting on this page for the “package omp” command. The meaning of Nthreads is exactly the same for the GPU, INTEL, and GPU packages.  

The mode keyword determines the precision mode to use for computing pair style forces, either on the CPU or on the co-processor, when using a INTEL supported pair style. It can take a value of single, mixed which is the default, or double. Single means single precision is used for the entire force calculation. Mixed means forces between a pair of atoms are computed in single precision, but accumulated and stored in double precision, including storage of forces, torques, energies, and virial quantities. Double means double precision is used for the entire force calculation.  

The lrt keyword can be used to enable “Long Range Thread (LRT)” mode. It can take a value of yes to enable and no to disable. LRT mode generates an extra thread (in addition to any OpenMP threads specified with the OMP_NUM_THREADS environment variable or the omp keyword). The extra thread is dedicated for performing part of the PPPM solver computations and communications. This can improve parallel performance on processors supporting Simultaneous Multithreading (SMT) such as Hyper-Threading (HT) on Intel processors. In this mode, one additional thread is generated per MPI process. LAMMPS will generate a warning in the case that more threads are used than available in SMT hardware on a node. If the PPPM solver from the INTEL package is not used, then the LRT setting is ignored and no extra threads are generated. Enabling LRT will replace the run_style with the verlet/lrt/intel style that is identical to the default verlet style aside from supporting the LRT feature. This feature requires setting the pre-processor flag -DLMP_INTEL_USELRT in the makefile when compiling LAMMPS.  

The balance keyword sets the fraction of pair style work offloaded to the co-processor for split values between 0.0 and 1.0 inclusive. While this fraction of work is running on the co-processor, other calculations will run on the host, including neighbor and pair calculations that are not offloaded, as well as angle, bond, dihedral, kspace, and some MPI communications. If split is set to -1, the fraction of work is dynamically adjusted automatically throughout the run. This typically give performance within 5 to 10 percent of the optimal fixed fraction.  

The ghost keyword determines whether or not ghost atoms, i.e. atoms at the boundaries of processor subdomains, are offloaded for neighbor and force calculations. When the value $=$ “no”, ghost atoms are not offloaded. This option can reduce the amount of data transfer with the co-processor and can also overlap MPI communication of forces with computation on the co-processor when the newton pair setting is “on”. When the value $=$ “yes”, ghost atoms are offloaded. In some cases this can provide better performance, especially if the balance fraction is high.  

The tpc keyword sets the max # of co-processor threads Ntpc that will run on each core of the co-processor. The default value $=4$ , which is the number of hardware threads per core supported by the current generation Xeon Phi chips.  

The tptask keyword sets the max # of co-processor threads (Ntptask\* assigned to each MPI task. The default value $=$ 240, which is the total # of threads an entire current generation Xeon Phi chip can run $240=60$ cores $^{*4}$ threads/core). This means each MPI task assigned to the Phi will enough threads for the chip to run the max allowed, even if only 1 MPI task is assigned. If 8 MPI tasks are assigned to the Phi, each will run with 30 threads. If you wish to limit the number of threads per MPI task, set tptask to a smaller value. E.g. for tptask $=16$ , if 8 MPI tasks are assigned, each will run with 16 threads, for a total of 128.  

Note that the default settings for tpc and tptask are fine for most problems, regardless of how many MPI tasks you assign to a Phi.  

Added in version 15Jun2023.  

The pppm_table keyword with the argument yes allows to use a pre-computed table to efficiently spread the charge to the PPPM grid. This feature is enabled by default but can be turned off using the keyword with the argument no.  

The no_affinity keyword will turn off automatic setting of core affinity for MPI tasks and OpenMP threads on the host when using offload to a co-processor. Affinity settings are used when possible to prevent MPI tasks and OpenMP threads from being on separate NUMA domains and to prevent offload threads from interfering with other processes/threads used for LAMMPS.  

The kokkos style invokes settings associated with the use of the KOKKOS package.  

All of the settings are optional keyword/value pairs. Each has a default value as listed below.  

The neigh keyword determines how neighbor lists are built. A value of half uses a thread-safe variant of half-neighbor lists, the same as used by most pair styles in LAMMPS, which is the default when running on CPUs (i.e. the Kokkos CUDA back end is not enabled).  

A value of full uses a full neighbor lists and is the default when running on GPUs. This performs twice as much computation as the half option, however that is often a win because it is thread-safe and does not require atomic operations in the calculation of pair forces. For that reason, full is the default setting for GPUs. However, when running on CPUs, a half neighbor list is the default because it are often faster, just as it is for non-accelerated pair styles. Similarly, the neigh/qeq keyword determines how neighbor lists are built for fix qeq/reaxff/kk.  

If the neigh/thread keyword is set to off, then the KOKKOS package threads only over atoms. However, for small systems, this may not expose enough parallelism to keep a GPU busy. When this keyword is set to on, the KOKKOS package threads over both atoms and neighbors of atoms. When using neigh/thread on, the newton pair setting must be “off”. Using neigh/thread on may be slower for large systems, so this this option is turned on by default only when running on one or more GPUs and there are $16\mathrm{k\Omega}$ atoms or less owned by an MPI rank. Not all KOKKOS-enabled potentials support this keyword yet, and only thread over atoms. Many simple pairwise potentials such as LennardJones do support threading over both atoms and neighbors.  

If the neigh/transpose keyword is set to off, then the KOKKOS package will use the same memory layout for building the neighbor list on GPUs as used for the pair style. When this keyword is set to on it will use a different (transposed) memory layout to build the neighbor list on GPUs. This can be faster in some cases (e.g. ReaxFF HNS benchmark) but slower in others (e.g. Lennard Jones benchmark). The copy between different memory layouts is done out of place and therefore doubles the memory overhead of the neighbor list, which can be significant.  

The newton keyword sets the Newton flags for pairwise and bonded interactions to off or on, the same as the newton command allows. The default for GPUs is off because this will almost always give better performance for the KOKKOS package. This means more computation is done, but less communication. However, when running on CPUs a value of on is the default since it can often be faster, just as it is for non-accelerated pair styles  

The binsize keyword sets the size of bins used to bin atoms during neighbor list builds. The same value can be set by the neigh_modify binsize command. Making it an option in the package kokkos command allows it to be set from the command-line. The default value for CPUs is 0.0, which means the LAMMPS default will be used, which is bins $=1/2$ the size of the pairwise cutoff $^+$ neighbor skin distance. This is fine when neighbor lists are built on the CPU. For GPU builds, a $2\mathbf{x}$ larger binsize equal to the pairwise cutoff $^+$ neighbor skin is often faster, which is the default. Note that if you use a longer-than-usual pairwise cutoff, e.g. to allow for a smaller fraction of KSpace work with a long-range Coulombic solver because the GPU is faster at performing pairwise interactions, then this rule of thumb may give too large a binsize and the default should be overridden with a smaller value.  

The comm and comm/exchange and comm/forward and comm/pair/forward and comm/fix/forward and comm/reverse and comm/pair/reverse keywords determine whether the host or device performs the packing and unpacking of data when communicating per-atom data between processors. “Exchange” communication happens only on timesteps that neighbor lists are rebuilt. The data is only for atoms that migrate to new processors. “Forward” communication happens every timestep. “Reverse” communication happens every timestep if the newton option is on. The data is for atom coordinates and any other atom properties that needs to be updated for ghost atoms owned by each processor. “Pair/comm” controls additional communication in pair styles, such as pair_style EAM. “Fix/comm” controls additional communication in fixes, such as fix SHAKE.  

The comm keyword is simply a short-cut to set the same value for all the comm keywords.  

The value options for the keywords are no or host or device. A value of no means to use the standard non-KOKKOS method of packing/unpacking data for the communication. A value of host means to use the host, typically a multicore CPU, and perform the packing/unpacking in parallel with threads. A value of device means to use the device, typically a GPU, to perform the packing/unpacking operation.  

For the comm/pair/forward or comm/fix/forward or comm/pair/reverse keywords, if a value of host is used it will be automatically be changed to no since these keywords don’t support host mode. The value of no will also always be used when running on the CPU, i.e. setting the value to device will have no effect if the pair/fix style is running on the CPU. For the comm/fix/forward or comm/pair/reverse keywords, not all styles support device mode and in that case will run in no mode instead.  

The optimal choice for these keywords depends on the input script and the hardware used. The no value is useful for verifying that the Kokkos-based host and device values are working correctly. It is the default when running on CPUs since it is usually the fastest.  

When running on CPUs or Xeon Phi, the host and device values work identically. When using GPUs, the device value is the default since it will typically be optimal if all of your styles used in your input script are supported by the KOKKOS package. In this case data can stay on the GPU for many timesteps without being moved between the host and GPU, if you use the device value. If your script uses styles (e.g. fixes) which are not yet supported by the KOKKOS package, then data has to be moved between the host and device anyway, so it is typically faster to let the host handle communication, by using the host value. Using host instead of no will enable use of multiple threads to pack/unpack communicated data. When running small systems on a GPU, performing the exchange pack/unpack on the host CPU can give speedup since it reduces the number of CUDA kernel launches.  

The sort keyword determines whether the host or device performs atom sorting, see the atom_modify sort command.  

The value options for the sort keyword are no or device similar to the comm keywords above. If a value of host is used it will be automatically be changed to no since the sort keyword does not support host mode. Not all fix styles with extra atom data support device mode and in that case a warning will be given and atom sorting will run in no mode instead.  

Added in version 17Apr2024.  

The atom/map keyword determines whether the host or device builds the atom_map, see the atom_modify map command. The value options for the atom/map keyword are identical to the sort keyword above.  

The gpu/aware keyword chooses whether GPU-aware MPI will be used. When this keyword is set to on, buffers in GPU memory are passed directly through MPI send/receive calls. This reduces overhead of first copying the data to the host CPU. However GPU-aware MPI is not supported on all systems, which can lead to segmentation faults and would require using a value of off. If LAMMPS can safely detect that GPU-aware MPI is not available (currently only possible with OpenMPI v2.0.0 or later), then the gpu/aware keyword is automatically set to off by default. When the gpu/aware keyword is set to off while any of the comm keywords are set to device, the value for these comm keywords will be automatically changed to no. This setting has no effect if not running on GPUs or if using only one MPI rank. GPUaware MPI is available for OpenMPI 1.8 (or later versions), Mvapich2 1.9 (or later) when the “MV2_USE_CUDA” environment variable is set to “1”, CrayMPI, and IBM Spectrum MPI when the “-gpu” flag is used.  

The pair/only keyword can change how the KOKKOS suffix “kk” is applied when using an accelerator device. By default device acceleration is always used for all available styles. With pair/only set to on the suffix setting will choose device acceleration only for pair styles and run all other force computations on the host CPU. The comm flags, along with the sort and atom/map keywords will also automatically be changed to no. This can result in better performance for certain configurations and system sizes.  

The omp style invokes settings associated with the use of the OPENMP package.  

The Nthreads argument sets the number of OpenMP threads allocated for each MPI task. For example, if your system has nodes with dual quad-core processors, it has a total of 8 cores per node. You could use two MPI tasks per node (e.g. using the -ppn option of the mpirun command in MPICH or -npernode in OpenMPI), and set Nthreads $=4$ . This would use all 8 cores on each node. Note that the product of MPI tasks \* threads/task should not exceed the physical number of cores (on a node), otherwise performance will suffer.  

Setting Nthreads $=0$ instructs LAMMPS to use whatever value is the default for the given OpenMP environment. This is usually determined via the OMP_NUM_THREADS environment variable or the compiler runtime. Note that in most cases the default for OpenMP capable compilers is to use one thread for each available CPU core when OMP_NUM_THREADS is not explicitly set, which can lead to poor performance.  

Here are examples of how to set the environment variable when launching LAMMPS:  

<html><body><table><tr><td>env OMP NUM I_THREADS=4 lmp_machine -sf omp -in in.script</td></tr><tr><td>OMP NUM THREADS=2</td></tr><tr><td>env 2 mpirun -np 2 lmp _machine -sf omp -in in.script</td></tr><tr><td>mpirun -x OMP _NUM_THREADS=2 -np 2 lmp_machine -sf omp -in in.script</td></tr></table></body></html>  

or you can set it permanently in your shell’s start-up script. All three of these examples use a total of 4 CPU cores.  

Note that different MPI implementations have different ways of passing the OMP_NUM_THREADS environment variable to all MPI processes. The second example line above is for MPICH; the third example line with $\mathbf{-X}$ is for OpenMPI. Check your MPI documentation for additional details.  

What combination of threads and MPI tasks gives the best performance is difficult to predict and can depend on many components of your input. Not all features of LAMMPS support OpenMP threading via the OPENMP package and the parallel efficiency can be very different, too.  

# Note  

If you build LAMMPS with the GPU, INTEL, and / or OPENMP packages, be aware these packages all allow setting of the Nthreads value via their package commands, but there is only a single global Nthreads value used by OpenMP. Thus if multiple package commands are invoked, you should ensure the values are consistent. If they are not, the last one invoked will take precedence, for all packages. Also note that if the -sf hybrid intel omp command-line switch is used, it invokes a “package intel” command, followed by a “package omp” command, both with a setting of Nthreads $=0$ . Likewise for a hybrid suffix for gpu and omp. Note that KOKKOS also supports setting the number of OpenMP threads from the command-line using the “-k on” command-line switch. The default for KOKKOS is 1 thread per MPI task, so any other number of threads should be explicitly set using the “-k on” command-line switch (and this setting should be consistent with settings from any other packages used).  

Optional keyword/value pairs can also be specified. Each has a default value as listed below.  

The neigh keyword specifies whether neighbor list building will be multi-threaded in addition to force calculations. If neigh is set to no then neighbor list calculation is performed only by MPI tasks with no OpenMP threading. If mode is yes (the default), a multi-threaded neighbor list build is used. Using nei $g h=y e s$ is almost always faster and should produce identical neighbor lists at the expense of using more memory. Specifically, neighbor list pages are allocated for all threads at the same time and each thread works within its own pages.  

# 1.73.4 Restrictions  

This command cannot be used after the simulation box is defined by a read_data or create_box command.  

The gpu style of this command can only be invoked if LAMMPS was built with the GPU package. See the Build package doc page for more info.  

The intel style of this command can only be invoked if LAMMPS was built with the INTEL package. See the Build package page for more info.  

The kokkos style of this command can only be invoked if LAMMPS was built with the KOKKOS package. See the Build package doc page for more info.  

The omp style of this command can only be invoked if LAMMPS was built with the OPENMP package. See the Build package doc page for more info.  

# 1.73.5 Related commands  

suffix, -pk command-line switch  

# 1.73.6 Defaults  

For the GPU package, the default parameters and settings are:  

$\overbrace{\mathrm{Ngpu}=0}$ , neigh = yes, newton $=$ off, binsize $=0.0$ , split $=1.0$ , gpuID = 0 to Ngpu-1, tpa $=1$ , $\mathrm{{omp}=0}$ , $\hookrightarrow$ platform $=-1$ .  

These settings are made automatically if the “-sf gpu” command-line switch is used. If it is not used, you must invoke the package gpu command in your input script or via the “-pk gpu” command-line switch.  

For the INTEL package, the default parameters and settings are:  

Nphi = 1, $\mathrm{{omp}=0}$ , mode = mixed, lrt = no, balance = -1, tpc = 4, tptask = 240, pppm_table = yes  

The default ghost option is determined by the pair style being used. This value is output to the screen in the offload report at the end of each run. Note that all of these settings, except “omp” and “mode”, are ignored if LAMMPS was not built with Xeon Phi co-processor support. These settings are made automatically if the “-sf intel” command-line switch is used. If it is not used, you must invoke the package intel command in your input script or via the “-pk intel” command-line switch.  

For the KOKKOS package when using GPUs, the option defaults are:  

neigh = full, neigh/qeq $=$ full, newton $=$ off, binsize $\it{\Omega}=\it{2x}$ LAMMPS default value, comm $\underline{{\underline{{\mathbf{\Pi}}}}}$ device, sort␣ $\rightarrow-$ device, atom/map $=$ device, neigh/transpose $=$ off, gpu/aware = on  

For GPUs, option neigh/thread $=$ on when there are 16k atoms or less on an MPI rank, otherwise it is “off”. When LAMMPS can safely detect that GPU-aware MPI is not available, the default value of gpu/aware becomes “off”.  

For the KOKKOS package when using CPUs or Xeon Phis, the option defaults are:  

$$
{\mathrm{neigh}}={\mathrm{half}},{\mathrm{~neigh}}/{\mathrm{qeq}}={\mathrm{half}},{\mathrm{~newton}}={\mathrm{on}},{\mathrm{~binsize}}=0.0,{\mathrm{~comm}}={\mathrm{no}},{\mathrm{~sort}}={\mathrm{no}},{\mathrm{~atom/noula}}=1.0,{\mathrm{~atom/noula}}
$$  

These settings are made automatically by the required “-k on” command-line switch. You can change them by using the package kokkos command in your input script or via the -pk kokkos command-line switch.  

For the OMP package, the defaults are  

These settings are made automatically if the “-sf omp” command-line switch is used. If it is not used, you must invoke the package omp command in your input script or via the “-pk omp” command-line switch.  

# 1.74 pair_coeff command  

# 1.74.1 Syntax  

pair_coeff I J args  

• $\mathrm{I},\mathrm{J}=$ numeric atom types (see asterisk form below), or type labels • args $=$ coefficients for one or more pairs of atom types  

# 1.74.2 Examples  

pair_coeff 1 2 1.0 1.0 2.5   
pair_coeff 2 \* 1.0 1.0   
pair_coeff 3\* 1\*2 1.0 1.0 2.5   
pair_coeff \* \* 1.0 1.0   
pair_coeff \* \* nialhjea 1 1 2   
pair_coeff \* 3 morse.table ENTRY1   
pair_coeff 1 2 lj/cut 1.0 1.0 2.5 # (for pair_style hybrid)  

labelmap atom 1 C labelmap atom 2 H pair_coeff C H 1.0 1.0 2.5  

# 1.74.3 Description  

Specify the pairwise force field coefficients for one or more pairs of atom types. The number and meaning of the coefficients depends on the pair style. Pair coefficients can also be set in the data file read by the read_data command or in a restart file.  

I and J can be specified in one of several ways. Explicit numeric values can be used for each, as in the first example above. Or, one or both of the types in the I,J pair can be a type label, which is an alphanumeric string defined by the labelmap command or in a section of a data file read by the read_data command, and which converts internally to a numeric type. Internally, LAMMPS will set coefficients for the symmetric J,I interaction to the same values as the I,J interaction.  

For numeric values only, a wildcard asterisk can be used in place of or in conjunction with the I,J arguments to set the coefficients for multiple pairs of atom types. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $\mathbf{\tilde{\Omega}}^{6}\mathbf{\tilde{n}}^{*}{\mathbf{\tilde{\Omega}}}^{,}$ or $\mathrm{^{6}m^{*}n^{,}}$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive). For the asterisk syntax, only type pairs with $\ensuremath{\mathrm{I}}<=\ensuremath{\mathrm{J}}$ are considered; if asterisks imply type pairs where $\mathbf{J}<\mathbf{I}$ , they are ignored. Again internally, LAMMPS will set the coefficients for the symmetric J,I interactions to the same values as the $\ensuremath{\mathrm{~I~}}<=\ensuremath{\mathrm{~J~}}$ interactions.  

Note that a pair_coeff command can override a previous setting for the same I,J pair. For example, these commands set the coeffs for all I,J pairs, then overwrite the coeffs for just the $\mathrm{I},\mathrm{J}=2,3$ pair:  

<html><body><table><tr><td>pair coeff * * 1.0 1.0 2.5</td></tr><tr><td>pair coeff 2 3 2.0 1.0 1.12</td></tr><tr><td></td></tr></table></body></html>  

A line in a data file that specifies pair coefficients uses the exact same format as the arguments of the pair_coeff command in an input script, with the exception of the I,J type arguments. In each line of the “Pair Coeffs” section of a data file, only a single type I is specified, which sets the coefficients for type I interacting with type I. This is because the section has exactly $N$ lines, where $N$ is the number of atom types. For this reason, the wild-card asterisk should also not be used as part of the I argument. Thus in a data file, the line corresponding to the first example above would be listed as  

# 2 1.0 1.0 2.5  

For many potentials, if coefficients for type pairs with $\mathrm{I}!=\mathrm{J}$ are not set explicitly by a pair_coeff command, the values are inferred from the I,I and J,J settings by mixing rules; see the pair_modify command for a discussion. Details on this option as it pertains to individual potentials are described on the page for the potential.  

Many pair styles, typically for many-body potentials, use tabulated potential files as input, when specifying the pair_coeff command. Potential files provided with LAMMPS are in the potentials directory of the distribution. For some potentials, such as EAM, other archives of suitable files can be found on the Web. They can be used with LAMMPS so long as they are in the format LAMMPS expects, as discussed on the individual doc pages. The first line of potential files may contain metadata with upper case tags followed their value. These may be parsed and used by LAMMPS. Currently supported are the “DATE:” tag and the UNITS: tag. For pair styles that have been programmed to support the metadata, the value of the “DATE:” tag is printed to the screen and logfile so that the version of a potential file can be later identified. The UNITS: tag indicates the units setting required for this particular potential file. If the potential file was created for a different sets of units, LAMMPS will terminate with an error. If the potential file does not contain the tag, no check will be made and it is the responsibility of the user to determine that the unit style is correct.  

In some select cases and for specific combinations of unit styles, LAMMPS is capable of automatically converting potential parameters from a file. In those cases, a warning message signaling that an automatic conversion has happened is printed to the screen.  

When a pair_coeff command using a potential file is specified, LAMMPS looks for the potential file in 2 places. First it looks in the location specified. E.g. if the file is specified as “niu3.eam”, it is looked for in the current working directory. If it is specified as “../potentials/niu3.eam”, then it is looked for in the potentials directory, assuming it is a sister directory of the current working directory. If the file is not found, it is then looked for in one of the directories specified by the LAMMPS_POTENTIALS environment variable. Thus if this is set to the potentials directory in the LAMMPS distribution, then you can use those files from anywhere on your system, without copying them into your working directory. Environment variables are set in different ways for different shells. Here are example settings for csh, tcsh:  

setenv LAMMPS_POTENTIALS /path/to/lammps/potentials  

bash:  

export LAMMPS_POTENTIALS $=$ /path/to/lammps/potentials  

# Windows:  

The LAMMPS_POTENTIALS environment variable may contain paths to multiple folders, if they are separated by “;” on Windows and “:” on all other operating systems, just like the PATH and similar environment variables.  

The alphabetic list of pair styles defined in LAMMPS is given on the pair_style doc page. They are also listed in more compact form on the Commands pair doc page.  

Click on the style to display the formula it computes and its coefficients as specified by the associated pair_coef command.  

# 1.74.4 Restrictions  

This command must come after the simulation box is defined by a read_data, read_restart, or create_box command.  

# 1.74.5 Related commands  

pair_style, pair_modify, read_data, read_restart, pair_write  

# 1.74.6 Default  

none  

# 1.75 pair_modify command  

# 1.75.1 Syntax  

pair_modify keyword values ...  

• one or more keyword/value pairs may be listed   
• keyword $=$ pair or shift or mix or table or table/disp or tabinner or tabinner/disp or tail or compute or nofdotr or special or compute/tally or neigh/trim pair value $=$ sub-style N sub-style $=$ sub-style of pair hybrid $\mathrm{N}=$ which instance of sub-style (1 to M), only specify if sub-style is used multiple times mix value $=$ geometric or arithmetic or sixthpower shift value = yes or no  

# 1.75. pair_modify command  

table value $=\mathrm{N}$ $2\hat{\mathbf{\Omega}}\mathrm{N}=\#$ of values in table   
table/disp value $=\mathrm{N}$ $2\hat{\mathbf{\Omega}}\mathrm{N}=\#$ of values in table   
tabinner value $=$ cutoff cutoff = inner cutoff at which to begin table (distance units)   
tabinner/disp value $-$ cutoff cutoff = inner cutoff at which to begin table (distance units)   
tail value = yes or no   
compute value = yes or no   
nofdotr value $-$ none   
special values $=$ which wt1 wt2 wt3 which = lj/coul or lj or coul $\mathrm{w1,w2,w3=1-2}$ , 1-3, 1-4 weights from 0.0 to 1.0 inclusive   
compute/tally value $=$ yes or no   
neigh/trim value $=$ yes or no  

# 1.75.2 Examples  

pair_modify shift yes mix geometric   
pair_modify tail yes   
pair_modify table 12   
pair_modify pair lj/cut compute no   
pair_modify pair tersoff compute/tally no   
pair_modify pair lj/cut/coul/long 1 special lj/coul 0.0 0.0 0.0   
pair_modify pair lj/cut/coul/long special lj 0.0 0.0 0.5 special coul 0.0 0.0 0.8333333  

# 1.75.3 Description  

Modify the parameters of the currently defined pair style. If the pair style is hybrid or hybrid/overlay, then the specified parameters are by default modified for all the hybrid sub-styles.  

![](images/a17a4edf555f32d442c8319f31004a06cde37e13ca0b3e503284d2aa2c842971.jpg)  

# Note  

The behavior for hybrid pair styles can be changed by using the pair keyword, which allows selection of a specific sub-style to apply all remaining keywords to. The special and compute/tally keywords can only be used in conjunction with the pair keyword. See further details about these 3 keywords below.  

The mix keyword affects pair coefficients for interactions between atoms of type I and J, when $\mathrm{I}!=\mathrm{J}$ and the coefficients are not explicitly set in the input script. Note that coefficients for $\boldsymbol{\mathrm{I}}=\boldsymbol{\mathrm{J}}$ must be set explicitly, either in the input script via the pair_coeff command or in the “Pair Coeffs” or “PairIJ Coeffs” sections of the data file. For some pair styles it is not necessary to specify coefficients when $\mathrm{I}!=\mathrm{J}$ , since a “mixing” rule will create them from the I,I and J,J settings. The pair_modify mix value determines what formulas are used to compute the mixed coefficients. In each case, the cutoff distance is mixed the same way as sigma.  

Note that not all pair styles support mixing and some mix options are not available for certain pair styles. Also, there are additional restrictions when using pair style hybrid or hybrid/overlay. See the page for individual pair styles for those restrictions. Note also that the pair_coeff command also can be used to directly set coefficients for a specific I $\!=\operatorname{J}$ pairing, in which case no mixing is performed. If possible, LAMMPS will print an informational message about how many of the mixed pair coefficients were generated and which mixing rule was applied.  

• mix geometric  

$$
\begin{array}{c}{{\varepsilon_{i j}=\sqrt{\varepsilon_{i}\varepsilon_{j}}}}\ {{\sigma_{i j}=\sqrt{\sigma_{i}\sigma_{j}}}}\end{array}
$$  

• mix arithmetic  

$$
\begin{array}{l}{{\varepsilon_{i j}=\displaystyle\sqrt{\varepsilon_{i}\varepsilon_{j}}}}\ {{\displaystyle\sigma_{i j}=\frac{1}{2}(\sigma_{i}+\sigma_{j})}}\end{array}
$$  

• mix sixthpower  

$$
\begin{array}{l}{\displaystyle\varepsilon_{i j}=\frac{2\sqrt{\varepsilon_{i}\varepsilon_{j}}\sigma_{i}^{3}\sigma_{j}^{3}}{\sigma_{i}^{6}+\sigma_{j}^{6}}}\ {\displaystyle\sigma_{i j}=\left(\frac{1}{2}(\sigma_{i}^{6}+\sigma_{j}^{6})\right)^{\frac{1}{6}}}\end{array}
$$  

The shift keyword determines whether a Lennard-Jones potential is shifted at its cutoff to 0.0. If so, this adds an energy term to each pairwise interaction which will be included in the thermodynamic output, but does not affect pair forces or atom trajectories. See the doc page for individual pair styles to see which ones support this option.  

The table and table/disp keywords apply to pair styles with a long-range Coulombic term or long-range dispersion term respectively; see the page for individual styles to see which potentials support these options. If N is non-zero, a table of length $2\mathsf{N N}$ is pre-computed for forces and energies, which can shrink their computational cost by up to a factor of 2. The table is indexed via a bit-mapping technique (Wolff) and a linear interpolation is performed between adjacent table values. In our experiments with different table styles (lookup, linear, spline), this method typically gave the best performance in terms of speed and accuracy.  

The choice of table length is a tradeoff in accuracy versus speed. A larger N yields more accurate force computations, but requires more memory which can slow down the computation due to cache misses. A reasonable value of $\mathbf{N}$ is between 8 and 16. The default value of 12 (table of length 4096) gives approximately the same accuracy as the no-table $\mathbf{\mathrm{(N=0)}}$ ) option. For $\Nu=0$ , forces and energies are computed directly, using a polynomial fit for the needed erfc() function evaluation, which is what earlier versions of LAMMPS did. Values greater than 16 typically slow down the simulation and will not improve accuracy; values from 1 to 8 give unreliable results.  

The tabinner and tabinner/disp keywords set an inner cutoff above which the pairwise computation is done by table lookup (if tables are invoked), for the corresponding Coulombic and dispersion tables discussed with the table and table/disp keywords. The smaller the cutoff is set, the less accurate the table becomes (for a given number of table values), which can require use of larger tables. The default cutoff value is sqrt(2.0) distance units which means nearly all pairwise interactions are computed via table lookup for simulations with “real” units, but some close pairs may be computed directly (non-table) for simulations with “lj” units.  

When the tail keyword is set to yes, certain pair styles will add a long-range VanderWaals tail “correction” to the energy and pressure. These corrections are bookkeeping terms which do not affect dynamics, unless a constant-pressure simulation is being performed. See the page for individual styles to see which support this option. These corrections are included in the calculation and printing of thermodynamic quantities (see the thermo_style command). Their effect will also be included in constant NPT or NPH simulations where the pressure influences the simulation box dimensions (e.g. the fix npt and fix nph commands). The formulas used for the long-range corrections come from equation 5 of (Sun).  

# Note  

The tail correction terms are computed at the beginning of each run, using the current atom counts of each atom type. If atoms are deleted (or lost) or created during a simulation, e.g. via the fix gcmc command, the correction factors are not re-computed. If you expect the counts to change dramatically, you can break a run into a series of shorter runs so that the correction factors are re-computed more frequently.  

Several additional assumptions are inherent in using tail corrections, including the following:  

• The simulated system is a 3d bulk homogeneous liquid. This option should not be used for systems that are non-liquid, 2d, have a slab geometry (only 2d periodic), or inhomogeneous.   
• G(r), the radial distribution function (rdf), is unity beyond the cutoff, so a fairly large cutoff should be used (i.e. 2.5 sigma for an LJ fluid), and it is probably a good idea to verify this assumption by checking the rdf. The rdf is not exactly unity beyond the cutoff for each pair of interaction types, so the tail correction is necessarily an approximation.  

The tail corrections are computed at the beginning of each simulation run. If the number of atoms changes during the run, e.g. due to atoms leaving the simulation domain, or use of the fix gcmc command, then the corrections are not updated to reflect the changed atom count. If this is a large effect in your simulation, you should break the long run into several short runs, so that the correction factors are re-computed multiple times.  

• Thermophysical properties obtained from calculations with this option enabled will not be thermodynamically consistent with the truncated force-field that was used. In other words, atoms do not feel any LJ pair interactions beyond the cutoff, but the energy and pressure reported by the simulation include an estimated contribution from those interactions.  

The compute keyword allows pairwise computations to be turned off, even though a pair_style is defined. This is not useful for running a real simulation, but can be useful for debugging purposes or for performing a rerun simulation, when you only wish to compute partial forces that do not include the pairwise contribution.  

Two examples are as follows. First, this option allows you to perform a simulation with pair_style hybrid with only a subset of the hybrid sub-styles enabled. Second, this option allows you to perform a simulation with only long-range interactions but no short-range pairwise interactions. Doing this by simply not defining a pair style will not work, because the kspace_style command requires a Kspace-compatible pair style be defined.  

The nofdotr keyword allows to disable an optimization that computes the global stress tensor from the total forces and atom positions rather than from summing forces between individual pairs of atoms.  

The pair keyword can only be used with the hybrid and hybrid/overlay pair styles. If used, it must appear first in the list of keywords.  

Its meaning is that all the following parameters will only be modified for the specified sub-style. If the sub-style is defined multiple times, then an additional numeric argument $N$ must also be specified, which is a number from 1 to M where M is the number of times the sub-style was listed in the pair_style hybrid command. The extra number indicates which instance of the sub-style the remaining keywords will be applied to.  

The special and compute/tally keywords can only be used in conjunction with the pair keyword and they must directly follow it. I.e. any other keyword, must appear after pair, special, and compute/tally.  

The special keyword overrides the global special_bonds 1-2, 1-3, 1-4 exclusion settings (weights) for the sub-style selected by the pair keyword.  

Similar to the special_bonds command, it takes 4 arguments. The which argument can be $l j$ to change only the nonCoulomb weights (e.g. Lennard-Jones or Buckingham), coul to change only the Coulombic settings, or lj/coul to change both to the same values. The $w t l,w t2,w t3$ values are numeric weights from 0.0 to 1.0 inclusive, for the 1-2, 1-3, and 1-4 bond topology neighbors, respectively. The special keyword can be used multiple times, e.g. to set the $l j$ and coul settings to different values.  

![](images/0cd5b1e47146bd1a88e534fcd3d3771a36e1c1e93feb9a0b27879043a6331ea4.jpg)  

# Note  

The special keyword is not compatible with pair styles from the GPU or the INTEL package and attempting to use it will cause an error.  

![](images/f57d5027ae24efd4f1d2dd3c60c5f7ad3a70312cdbcb5a9fd7ae4b8e7f0df4c3.jpg)  

# Note  

Weights of exactly 0.0 or 1.0 in the special_bonds command have implications on the neighbor list construction, which means that they cannot be overridden by using the special keyword. One workaround for this restriction is to use the special_bonds command with weights like 1.0e-10 or 0.999999999 instead of 0.0 or 1.0, respectively, which enables to reset each them to any value between 0.0 and 1.0 inclusively. Otherwise you can set all global weights to an arbitrary number between 0.0 or 1.0, like 0.5, and then you have to override all special settings for all sub-styles which use the 1-2, 1-3, and 1-4 exclusion weights in their force/energy computation.  

The compute/tally keyword disables or enables registering compute \*/tally computes for the sub-style specified by the pair keyword. Use no to disable, or yes to enable.  

![](images/4afac35587fd42ff5908600c6a4d60d1bcb714d4f2f9575c7fc214a84d41abc9.jpg)  

# Note  

The “pair_modify pair compute/tally” command must be issued before the corresponding compute style is defined.  

Added in version 3Aug2022.  

The neigh/trim keyword controls whether an explicit cutoff is set for each neighbor list request issued by individual pair sub-styles when using pair hybrid/overlay. When this keyword is set to $n o$ , then the cutoff of each pair sub-style neighbor list will be set equal to the largest cutoff, even if a shorter cutoff is specified for a particular sub-style. If possible the neighbor list will be copied directly from another list. When this keyword is set to yes then the cutoff of the neighbor list will be explicitly set to the value requested by the pair sub-style, and if possible the list will be created by trimming neighbors from another list with a longer cutoff, otherwise a new neighbor list will be created with the specified cutoff. The yes option can be faster when there are multiple pair styles with different cutoffs since the number of pair-wise distance checks between neighbors is reduced (but the time required to build the neighbor lists is increased). The no option could be faster when two or more neighbor lists have similar (but not exactly the same) cutoffs.  

![](images/bdef542ee828ddd7403befe8e26fcb04f24f867b1e81fb895173211e7827cdf8.jpg)  

# Note  

The “pair_modify neigh/trim” command only applies when there are multiple pair sub-styles for the same atoms with different cutoffs, i.e. when using pair style hybrid/overlay. If you have different cutoffs for different pairs for atoms type, the neighbor style multi should be used to create optimized neighbor lists.  

# 1.75.4 Restrictions  

You cannot use shift yes with tail yes, since those are conflicting options. You cannot use tail yes with 2d simulations.   
You cannot use special with pair styles from the GPU or INTEL package.  

# 1.75.5 Related commands  

pair_style, pair_style hybrid, pair_coeff , thermo_style, compute \*/tally, neighbor multi  

# 1.75.6 Default  

The option defaults are mix $=$ geometric, shift $=$ no, table $=12$ , tabinner $=$ sqrt(2.0), tail $=$ no, compute $=$ yes, and neigh/trim yes.  

Note that some pair styles perform mixing, but only a certain style of mixing. See the doc pages for individual pair styles for details.  

(Wolff) Wolff and Rudd, Comp Phys Comm, 120, 200-32 (1999).   
(Sun) Sun, J Phys Chem B, 102, 7338-7364 (1998).  

# 1.76 pair_style command  

# 1.76.1 Syntax  

• style $=$ one of the styles from the list below args $=$ arguments used by a particular style  

# 1.76.2 Examples  

pair_style lj/cut 2.5   
pair_style eam/alloy   
pair_style hybrid lj/charmm/coul/long 10.0 eam   
pair_style table linear 1000   
pair_style none  

# 1.76.3 Description  

Set the formula(s) LAMMPS uses to compute pairwise interactions. In LAMMPS, pair potentials are defined between pairs of atoms that are within a cutoff distance and the set of active interactions typically changes over time. See the bond_style command to define potentials between pairs of bonded atoms, which typically remain in place for the duration of a simulation.  

In LAMMPS, pairwise force fields encompass a variety of interactions, some of which include many-body effects, e.g. EAM, Stillinger-Weber, Tersoff, REBO potentials. They are still classified as “pairwise” potentials because the set of interacting atoms changes with time (unlike molecular bonds) and thus a neighbor list is used to find nearby interacting atoms.  

Hybrid models where specified pairs of atom types interact via different pair potentials can be setup using the hybrid pair style.  

The coefficients associated with a pair style are typically set for each pair of atom types, and are specified by the pair_coeff command or read from a file by the read_data or read_restart commands.  

The pair_modify command sets options for mixing of type I-J interaction coefficients and adding energy offsets or tail corrections to Lennard-Jones potentials. Details on these options as they pertain to individual potentials are described on the doc page for the potential. Likewise, info on whether the potential information is stored in a restart file is listed on the potential doc page.  

In the formulas listed for each pair style, $E$ is the energy of a pairwise interaction between two atoms separated by a distance $r$ . The force between the atoms is the negative derivative of this expression.  

If the pair_style command has a cutoff argument, it sets global cutoffs for all pairs of atom types. The distance(s) can be smaller or larger than the dimensions of the simulation box.  

In many cases, the global cutoff value can be overridden for a specific pair of atom types by the pair_coeff command.  

If a new pair_style command is specified with a new style, all previous pair_coeff and pair_modify command setting are erased; those commands must be re-specified if necessary.  

If a new pair_style command is specified with the same style, then only the global settings in that command are reset. Any previous doc:pair_coeff <pair_coeff> and pair_modify command settings are preserved. The only exception is that if the global cutoff in the pair_style command is changed, it will override the corresponding cutoff in any of the previous pair_modify commands.  

Two pair styles which do not follow this rule are the pair_style table and hybrid commands. A new pair_style command for these styles will wipe out all previously specified pair_coeff and pair_modify settings, including for the sub-styles of the hybrid command.  

Here is an alphabetic list of pair styles defined in LAMMPS. They are also listed in more compact form on the Commands pair doc page.  

Click on the style to display the formula it computes, any additional arguments specified in the pair_style command, and coefficients specified by the associated pair_coeff command.  

There are also additional accelerated pair styles included in the LAMMPS distribution for faster performance on CPUs, GPUs, and KNLs. The individual style names on the Commands pair doc page are followed by one or more of (g,i,k,o,t) to indicate which accelerated styles exist.  

• none - turn off pairwise interactions   
• hybrid - multiple styles of pairwise interactions   
• hybrid/molecular - different pair styles for intra- and inter-molecular interactions   
• hybrid/overlay - multiple styles of superposed pairwise interactions   
• hybrid/scaled - multiple styles of scaled superposed pairwise interactions   
• zero - neighbor list but no interactions   
adp - angular dependent potential (ADP) of Mishin   
• agni - AGNI machine-learning potential   
• aip/water/2dm - anisotropic interfacial potential for water in 2d geometries   
• airebo - AIREBO potential of Stuart   
• airebo/morse - AIREBO with Morse instead of LJ   
• amoeba -   
• atm - Axilrod-Teller-Muto potential   
• awpmd/cut - Antisymmetrized Wave Packet MD potential for atoms and electrons   
• beck - Beck potential   
• body/nparticle - interactions between body particles   
• body/rounded/polygon - granular-style 2d polygon potential   
• body/rounded/polyhedron - granular-style 3d polyhedron potential   
• born - Born-Mayer-Huggins potential   
• born/coul/dsf - Born with damped-shifted-force model   
• born/coul/dsf/cs - Born with damped-shifted-force and core/shell model   
• born/coul/long - Born with long-range Coulomb   
• born/coul/long/cs - Born with long-range Coulomb and core/shell   
• born/coul/msm - Born with long-range MSM Coulomb   
• born/coul/wolf - Born with Wolf potential for Coulomb   
• born/coul/wolf/cs - Born with Wolf potential for Coulomb and core/shell model   
• born/gauss - Born-Mayer / Gaussian potential   
• bpm/spring - repulsive harmonic force with damping   
• brownian - Brownian potential for Fast Lubrication Dynamics   
• brownian/poly - Brownian potential for Fast Lubrication Dynamics with polydispersity   
• buck - Buckingham potential   
• buck/coul/cut - Buckingham with cutoff Coulomb   
• buck/coul/long - Buckingham with long-range Coulomb   
• buck/coul/long/cs - Buckingham with long-range Coulomb and core/shell   
• buck/coul/msm - Buckingham with long-range MSM Coulomb   
• buck/long/coul/long - long-range Buckingham with long-range Coulomb   
• buck/mdf - Buckingham with a taper function   
• buck6d/coul/gauss/dsf - dispersion-damped Buckingham with damped-shift-force model   
• buck6d/coul/gauss/long - dispersion-damped Buckingham with long-range Coulomb   
• colloid - integrated colloidal potential   
• comb - charge-optimized many-body (COMB) potential   
• comb3 - charge-optimized many-body (COMB3) potential   
• cosine/squared - Cooke-Kremer-Deserno membrane model potential   
• coul/ctip - Charge Transfer Interatomic (Coulomb) Potential   
• coul/cut - cutoff Coulomb potential   
• coul/cut/dielectric -   
• coul/cut/global - cutoff Coulomb potential   
• coul/cut/soft - Coulomb potential with a soft core   
• coul/debye - cutoff Coulomb potential with Debye screening   
• coul/diel - Coulomb potential with dielectric permittivity   
• coul/dsf - Coulomb with damped-shifted-force model   
• coul/exclude - subtract Coulomb potential for excluded pairs   
• coul/long - long-range Coulomb potential   
• coul/long/cs - long-range Coulomb potential and core/shell   
• coul/long/dielectric -   
• coul/long/soft - long-range Coulomb potential with a soft core   
• coul/msm - long-range MSM Coulomb   
• coul/slater/cut - smeared out Coulomb   
• coul/slater/long - long-range smeared out Coulomb   
• coul/shield - Coulomb for boron nitride for use with ilp/graphene/hbn potential   
• coul/streitz - Coulomb via Streitz/Mintmire Slater orbitals   
• coul/tt - damped charge-dipole Coulomb for Drude dipoles   
• coul/wolf - Coulomb via Wolf potential   
• coul/wolf/cs - Coulomb via Wolf potential with core/shell adjustments   
• dispersion/d3 - Dispersion correction for potentials derived from DFT functionals   
• dpd - dissipative particle dynamics (DPD)   
• dpd/coul/slater/long - dissipative particle dynamics (DPD) with electrostatic interactions   
• dpd/ext - generalized force field for DPD   
• dpd/ext/tstat - pairwise DPD thermostatting with generalized force field   
• dpd/fdt - DPD for constant temperature and pressure   
• dpd/fdt/energy - DPD for constant energy and enthalpy   
• dpd/tstat - pairwise DPD thermostatting   
• dsmc - Direct Simulation Monte Carlo (DSMC)   
• e3b - Explicit-three body (E3B) water model   
• drip - Dihedral-angle-corrected registry-dependent interlayer potential (DRIP)   
• eam - embedded atom method (EAM)   
• eam/alloy - alloy EAM   
• eam/cd - concentration-dependent EAM   
• eam/cd/old - older two-site model for concentration-dependent EAM   
• eam/fs - Finnis-Sinclair EAM   
• eam/he - Finnis-Sinclair EAM modified for Helium in metals   
• edip - three-body EDIP potential   
• edip/multi - multi-element EDIP potential   
• edpd - eDPD particle interactions   
• eff/cut - electron force field with a cutoff   
• eim - embedded ion method (EIM)   
• exp6/rx - reactive DPD potential   
• extep - extended Tersoff potential   
• gauss - Gaussian potential   
• gayberne - Gay-Berne ellipsoidal potential   
• granular - Generalized granular potential   
• gran/hertz/history - granular potential with Hertzian interactions   
• gran/hooke - granular potential with history effects   
• gran/hooke/history - granular potential without history effects   
• gw - Gao-Weber potential   
• gw/zbl - Gao-Weber potential with a repulsive ZBL core   
• harmonic/cut - repulsive-only harmonic potential   
• hbond/dreiding/lj - DREIDING hydrogen bonding LJ potential   
• hbond/dreiding/lj/angleoffset - DREIDING hydrogen bonding LJ potential with offset for hbond angle   
• hbond/dreiding/morse - DREIDING hydrogen bonding Morse potential   
• hbond/dreiding/morse/angleoffset - DREIDING hydrogen bonding Morse potential with offset for hbo   
• hdnnp - High-dimensional neural network potential   
• hippo -   
• ilp/graphene/hbn - registry-dependent interlayer potential (ILP)   
• ilp/tmd - interlayer potential (ILP) potential for transition metal dichalcogenides (TMD)   
• kim - interface to potentials provided by KIM project   
• kolmogorov/crespi/full - Kolmogorov-Crespi (KC) potential with no simplifications   
• kolmogorov/crespi/z - Kolmogorov-Crespi (KC) potential with normals along z-axis   
• lcbop - long-range bond-order potential (LCBOP)   
• lebedeva/z - Lebedeva interlayer potential for graphene with normals along $\mathbf{Z}$ -axis   
• lennard/mdf - LJ potential in A/B form with a taper function   
• lepton - pair potential from evaluating a string   
• lepton/coul - pair potential from evaluating a string with support for charges   
• lepton/sphere - pair potential from evaluating a string with support for radii   
• line/lj - LJ potential between line segments   
• list - potential between pairs of atoms explicitly listed in an input file   
• lj/charmm/coul/charmm - CHARMM potential with cutoff Coulomb   
• lj/charmm/coul/charmm/implicit - CHARMM for implicit solvent   
• lj/charmm/coul/long - CHARMM with long-range Coulomb   
• lj/charmm/coul/long/soft - CHARMM with long-range Coulomb and a soft core   
• lj/charmm/coul/msm - CHARMM with long-range MSM Coulomb   
• lj/charmmfsw/coul/charmmfsh - CHARMM with force switching and shifting   
• lj/charmmfsw/coul/long - CHARMM with force switching and long-rnage Coulomb   
• lj/class2 - COMPASS (class 2) force field without Coulomb   
• lj/class2/coul/cut - COMPASS with cutoff Coulomb   
• lj/class2/coul/cut/soft - COMPASS with cutoff Coulomb with a soft core   
• lj/class2/coul/long - COMPASS with long-range Coulomb   
• lj/class2/coul/long/cs - COMPASS with long-range Coulomb with core/shell adjustmen   
• lj/class2/coul/long/soft - COMPASS with long-range Coulomb with a soft core   
• lj/class2/soft - COMPASS (class 2) force field with no Coulomb with a soft core   
• lj/cubic - LJ with cubic after inflection point   
• lj/cut - cutoff Lennard-Jones potential without Coulomb   
• lj/cut/coul/cut - LJ with cutoff Coulomb   
• lj/cut/coul/cut/dielectric -   
• lj/cut/coul/cut/soft - LJ with cutoff Coulomb with a soft core   
• lj/cut/coul/debye - LJ with Debye screening added to Coulomb   
• lj/cut/coul/debye/dielectric -   
• lj/cut/coul/dsf - LJ with Coulomb via damped shifted forces   
• lj/cut/coul/long - LJ with long-range Coulomb   
• lj/cut/coul/long/cs - LJ with long-range Coulomb with core/shell adjustments   
• lj/cut/coul/long/dielectric -   
• lj/cut/coul/long/soft - LJ with long-range Coulomb with a soft core   
• lj/cut/coul/msm - LJ with long-range MSM Coulomb   
• lj/cut/coul/msm/dielectric -   
• lj/cut/coul/wolf - LJ with Coulomb via Wolf potential   
• lj/cut/dipole/cut - point dipoles with cutoff   
• lj/cut/dipole/long - point dipoles with long-range Ewald   
• lj/cut/soft - LJ with a soft core   
• lj/cut/sphere - LJ where per-atom radius is used as LJ sigma   
• lj/cut/thole/long - LJ with Coulomb with thole damping   
• lj/cut/tip4p/cut - LJ with cutoff Coulomb for TIP4P water   
• lj/cut/tip4p/long - LJ with long-range Coulomb for TIP4P water   
• lj/cut/tip4p/long/soft - LJ with cutoff Coulomb for TIP4P water with a soft core   
• lj/expand - Lennard-Jones for variable size particles   
• lj/expand/coul/long - Lennard-Jones for variable size particles with long-range Coulom   
• lj/expand/sphere - Variable size LJ where per-atom radius is used as delta (size)   
• lj/gromacs - GROMACS-style Lennard-Jones potential   
• lj/gromacs/coul/gromacs - GROMACS-style LJ and Coulomb potential   
• lj/long/coul/long - long-range LJ and long-range Coulomb   
• lj/long/coul/long/dielectric - • lj/long/dipole/long - long-range LJ and long-range point dipoles   
• lj/long/tip4p/long - long-range LJ and long-range Coulomb for TIP4P water   
• lj/mdf - LJ potential with a taper function   
• lj/relres - LJ using multiscale Relative Resolution (RelRes) methodology (Chaimovich). • lj/spica - LJ for SPICA coarse-graining   
• lj/spica/coul/long - LJ for SPICA coarse-graining with long-range Coulomb   
• lj/spica/coul/msm - LJ for SPICA coarse-graining with long-range Coulomb via MSM • lj/sf/dipole/sf - LJ with dipole interaction with shifted forces   
• lj/smooth - smoothed Lennard-Jones potential   
• lj/smooth/linear - linear smoothed LJ potential   
• lj/switch3/coulgauss/long - smoothed LJ vdW potential with Gaussian electrostatics • lj96/cut - Lennard-Jones 9/6 potential   
• local/density - Generalized basic local density potential   
• lubricate - Hydrodynamic lubrication forces   
• lubricate/poly - Hydrodynamic lubrication forces with polydispersity   
• lubricateU - Hydrodynamic lubrication forces for Fast Lubrication Dynamics   
• lubricateU/poly - Hydrodynamic lubrication forces for Fast Lubrication with polydispersity • mdpd - mDPD particle interactions   
• mdpd/rhosum - mDPD particle interactions for mass density   
• meam - Modified embedded atom method (MEAM)   
• meam/ms - Multi-state modified embedded atom method (MS-MEAM)   
• meam/spline - Splined version of MEAM   
• meam/sw/spline - Splined version of MEAM with a Stillinger-Weber term   
• mesocnt - Mesoscopic vdW potential for (carbon) nanotubes   
• mesocnt/viscous - Mesoscopic vdW potential for (carbon) nanotubes with friction   
• mgpt - Simplified model generalized pseudopotential theory (MGPT) potential   
• mie/cut - Mie potential   
• mliap - Multiple styles of machine-learning potential   
• mm3/switch3/coulgauss/long - Smoothed MM3 vdW potential with Gaussian electrostatics • momb - Many-Body Metal-Organic (MOMB) force field   
• morse - Morse potential   
• morse/smooth/linear - Linear smoothed Morse potential   
• morse/soft - Morse potential with a soft core   
• multi/lucy - DPD potential with density-dependent force   
• multi/lucy/rx - reactive DPD potential with density-dependent force   
• nb3b/harmonic - Non-bonded 3-body harmonic potential   
• nb3b/screened - Non-bonded 3-body screened harmonic potential   
• nm/cut - N-M potential   
• nm/cut/coul/cut - N-M potential with cutoff Coulomb   
• nm/cut/coul/long - N-M potential with long-range Coulomb   
• nm/cut/split - Split 12-6 Lennard-Jones and N-M potential   
• oxdna/coaxstk -   
• oxdna/excv -   
• oxdna/hbond -   
• oxdna/stk -   
• oxdna/xstk -   
• oxdna2/coaxstk -   
• oxdna2/dh -   
• oxdna2/excv -   
• oxdna2/hbond -   
• oxdna2/stk -   
• oxdna2/xstk -   
• oxrna2/coaxstk -   
• oxrna2/dh -   
• oxrna2/excv -   
• oxrna2/hbond -   
• oxrna2/stk -   
• oxrna2/xstk -   
• pace - Atomic Cluster Expansion (ACE) machine-learning potential   
• pace/extrapolation - Atomic Cluster Expansion (ACE) machine-learning potential with extrapolation grades   
• pedone - Pedone (PMMCS) potential (non-Coulomb part)   
• pod - Proper orthogonal decomposition (POD) machine-learning potential   
• peri/eps - Peridynamic EPS potential   
• peri/lps - Peridynamic LPS potential   
• peri/pmb - Peridynamic PMB potential   
• peri/ves - Peridynamic VES potential   
• polymorphic - Polymorphic 3-body potential   
• python -   
• quip -   
• rann -   
• reaxff - ReaxFF potential   
• rebo - Second generation REBO potential of Brenner   
• rebomos - REBOMoS potential for MoS2   
• rheo - fluid interactions in RHEO package   
• rheo/solid - solid interactions in RHEO package   
• resquared - Everaers RE-Squared ellipsoidal potential   
• saip/metal - Interlayer potential for hetero-junctions formed with hexag   
• sdpd/taitwater/isothermal - Smoothed dissipative particle dynamics for wate   
• smatb - Second Moment Approximation to the Tight Binding   
• smatb/single - Second Moment Approximation to the Tight Binding for sing   
• smd/hertz -   
• smd/tlsph -   
• smd/tri_surface -   
• smd/ulsph -   
• smtbq -   
• snap - SNAP machine-learning potential   
• soft - Soft (cosine) potential   
• sph/heatconduction -   
• sph/idealgas -   
• sph/lj -   
• sph/rhosum -   
• sph/taitwater -   
• sph/taitwater/morris -   
• spin/dipole/cut -   
• spin/dipole/long -   
• spin/dmi -   
• spin/exchange -   
• spin/exchange/biquadratic -   
• spin/magelec -   
• spin/neel -   
• srp -   
• srp/react -   
• sw - Stillinger-Weber 3-body potential   
• sw/angle/table - Stillinger-Weber potential with tabulated angular term   
• sw/mod - modified Stillinger-Weber 3-body potential   
• table - tabulated pair potential   
• table/rx -   
• tdpd - tDPD particle interactions   
• tersoff - Tersoff 3-body potential   
• tersoff/mod - modified Tersoff 3-body potential   
• tersoff/mod/c -   
• tersoff/table -   
• tersoff/zbl - Tersoff/ZBL 3-body potential   
• thole - Coulomb interactions with thole damping   
• threebody/table - generic tabulated three-body potential   
• tip4p/cut - Coulomb for TIP4P water w/out LJ   
• tip4p/long - long-range Coulomb for TIP4P water w/out LJ   
• tip4p/long/soft -   
• tracker - monitor information about pairwise interactions   
• tri/lj - LJ potential between triangles   
• ufm -   
• uf3 - UF3 machine-learning potential   
• vashishta - Vashishta 2-body and 3-body potential   
• vashishta/table -   
• wf/cut - Wang-Frenkel Potential for short-ranged interactions   
• ylz - Yuan-Li-Zhang Potential for anisotropic interactions   
• yukawa - Yukawa potential   
• yukawa/colloid - screened Yukawa potential for finite-size particles   
• $z b l$ - Ziegler-Biersack-Littmark potential  

# 1.76.4 Restrictions  

This command must be used before any coefficients are set by the pair_coeff , read_data, or read_restart commands.  

Some pair styles are part of specific packages. They are only enabled if LAMMPS was built with that package. See the Build package page for more info. The doc pages for individual pair potentials tell if it is part of a package.  

# 1.76.5 Related commands  

pair_coeff , read_data, pair_modify, kspace_style, dielectric, pair_write  

# 1.76.6 Default  

# 1.77 pair_write command  

# 1.77.1 Syntax  

pair_write itype jtype N style inner outer file keyword Qi Qj  

• itype,jtype $=2$ atom types (numeric or type label)   
• $\Nu=\#$ of values   
• style $=r$ or rsq or bitmap   
• inner,outer $=$ inner and outer cutoff (distance units)   
• file $=$ name of file to write values to   
• keyword $=$ section name in file for this set of tabulated values   
• ${\mathrm{Qi}},{\mathrm{Qj}}=2$ atom charges (charge units) (optional)  

# 1.77.2 Examples  

pair_write 1 3 500 r 1.0 10.0 table.txt LJ pair_write 1 1 1000 rsq 2.0 8.0 table.txt Yukawa_1_1 -0.5 0.5 labelmap atom 1 C 2 H pair_write C H 500 r 1.0 10.0 table.txt LJ  

# 1.77.3 Description  

Write energy and force values to a file as a function of distance for the currently defined pair potential. This is useful for plotting the potential function or otherwise debugging its values. If the file already exists, the table of values is appended to the end of the file to allow multiple tables of energy and force to be included in one file. In case a new file is created, the first line will be a comment containing a “DATE:” and “UNITS:” tag with the current date and the current units setting as argument. For subsequent invocations of the pair_write command, the current units setting is compared against the entry in the file, if present, and pair_write will refuse to add a table if the units are not the same.  

The energy and force values are computed at distances from inner to outer for 2 interacting atoms of type itype and jtype, using the appropriate pair_coeff coefficients. If the style is $r$ , then $\mathbf{N}$ distances are used, evenly spaced in r; if the style is rsq, N distances are used, evenly spaced in $\mathrm{r}{}^{\wedge}2$ .  

For example, for $\Nu=7$ , style $=r$ , inner $=1.0$ , and outer $=4.0$ , values are computed at $\mathbf{r}=1.0$ , 1.5, 2.0, 2.5, 3.0, 3.5, 4.0.  

If the style is bitmap, then $2\mathsf{N N}$ values are written to the file in a format and order consistent with how they are read in by the pair_coeff command for pair style table. For reasonable accuracy in a bitmapped table, choose $\Nu>=12$ , an inner value that is smaller than the distance of closest approach of 2 atoms, and an outer value $<=$ cutoff of the potential.  

If the pair potential is computed between charged atoms, the charges of the pair of interacting atoms can optionally be specified. If not specified, values of $\mathrm{Qi=Qj=1.0}$ are used.  

The file is written in the format used as input for the pair_style table option with keyword as the section name. Each line written to the file lists an index number (1-N), a distance (in distance units), an energy (in energy units), and a force (in force units).  

# 1.77.4 Restrictions  

All force field coefficients for pair and other kinds of interactions must be set before this command can be invoked.  

Due to how the pairwise force is computed, an inner value $>0.0$ must be specified even if the potential has a finite value at $\mathrm{r}=0.0$ .  

The pair_write command can only be used for pairwise additive interactions for which a Pair::single() function can be and has been implemented. This excludes for example manybody potentials or TIP4P coulomb styles.  

# 1.77.5 Related commands  

pair_style table, pair_style, pair_coeff  

# 1.77.6 Default  

none  

# 1.78 partition command  

# 1.78.1 Syntax  

partition style N command ...  

• style $=$ yes or no • $\Nu=$ partition number (see asterisk form below) • command $=$ any LAMMPS command  

# 1.78.2 Examples  

partition yes 1 processors 4 10 6 partition no 5 print "Active partition" partition yes $^*5$ fix all nve partition yes $6^{*}$ fix all nvt temp 1.0 1.0 0.1  

# 1.78.3 Description  

This command invokes the specified command on a subset of the partitions of processors you have defined via the -partition command-line switch.  

Normally, every input script command in your script is invoked by every partition. This behavior can be modified by defining world- or universe-style variables that have different values for each partition. This mechanism can be used to cause your script to jump to different input script files on different partitions, if such a variable is used in a jump command.  

The “partition” command is another mechanism for having as input script operate differently on different partitions. It is basically a prefix on any LAMMPS command. The command will only be invoked on the partition(s) specified by the style and $N$ arguments.  

If the style is yes, the command will be invoked on any partition which matches the $N$ argument. If the style is no the command will be invoked on all the partitions which do not match the $\mathrm{Np}$ argument.  

Partitions are numbered from 1 to Np, where Np is the number of partitions specified by the -partition command-line switch.  

# 1.78. partition command  

$N$ can be specified in one of two ways. An explicit numeric value can be used, as in the first example above. Or a wild-card asterisk can be used to span a range of partition numbers. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $\mathbf{\Psi}^{66}\mathbf{n}^{*}{}^{,}$ or $\mathrm{^{6}m^{*}n^{,}}$ . An asterisk with no numeric values means all partitions from 1 to Np. A leading asterisk means all partitions from 1 to n (inclusive). A trailing asterisk means all partitions from n to $\mathrm{Np}$ (inclusive). A middle asterisk means all partitions from m to n (inclusive).  

This command can be useful for the “run_style verlet/split” command which imposed requirements on how the processors command lays out a 3d grid of processors in each of 2 partitions.  

# 1.78.4 Restrictions  

none  

# 1.78.5 Related commands  

run_style verlet/split  

# 1.78.6 Default  

none  

# 1.79 plugin command  

# 1.79.1 Syntax  

command $=$ load or unload or list or clear • args $=$ list of arguments for a particular plugin command  

load file $=$ load plugin(s) from shared object in file   
unload style name $=$ unload plugin name of style style style $=$ pair or bond or angle or dihedral or improper or kspace or compute or fix or region or␣   
$\hookrightarrow$ command   
list $=$ print a list of currently loaded plugins   
clear $=$ unload all currently loaded plugins  

# 1.79.2 Examples  

plugin load morse2plugin.so   
plugin unload pair morse2/omp   
plugin unload command hello   
plugin list   
plugin clear  

# 1.79.3 Description  

The plugin command allows to load (and unload) additional styles and commands into a LAMMPS binary from socalled dynamic shared object (DSO) files. This enables to add new functionality to an existing LAMMPS binary without having to recompile and link the entire executable.  

The load command will load and initialize all plugins contained in the plugin DSO with the given filename. A message with information the plugin style and name and more will be printed. Individual DSO files may contain multiple plugins.  

More details about how to write and compile the plugin DSO is given in programmer’s guide part of the manual under Writing plugins.  

The unload command will remove the given style or the given name from the list of available styles. If the plugin style is currently in use, that style instance will be deleted.  

The list command will print a list of the loaded plugins and their styles and names.  

The clear command will unload all currently loaded plugins.  

# Automatic loading of plugins  

Added in version 4May2022.  

When the environment variable LAMMPS_PLUGIN_PATH is set, then LAMMPS will search the directory (or directories) listed in this path for files with names that end in plugin.so (e.g. helloplugin.so) and will try to load the contained plugins automatically at start-up.  

# 1.79.4 Restrictions  

The plugin command is part of the PLUGIN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

If plugins access functions or classes from a package, LAMMPS must have been compiled with that package included.  

Plugins are dependent on the LAMMPS binary interface (ABI) and particularly the MPI library used. So they are not guaranteed to work when the plugin was compiled with a different MPI library or different compilation settings or a different LAMMPS version. There are no checks, so if there is a mismatch the plugin object will either not load or data corruption and crashes may happen.  

# 1.79.5 Related commands  

none  

# 1.79.6 Default  

none  

# 1.80 prd command  

# 1.80.1 Syntax  

prd N t_event n_dephase t_dephase t_correlate compute-ID seed keyword value ...  

• $\Nu=\#$ of timesteps to run (not including dephasing/quenching)   
• t_event $=$ timestep interval between event checks   
• n_dephase $=$ number of velocity randomizations to perform in each dephase run   
• t_dephase $=$ number of timesteps to run dynamics after each velocity randomization during dephase   
• t_correlate $=$ number of timesteps within which 2 consecutive events are considered to be correlated   
• compute- $\mathrm{\cdotID}=\mathrm{ID}$ of the compute used for event detection   
• random_seed $=$ random # seed (positive integer)   
• zero or more keyword/value pairs may be appended  

# 1.80. prd command  

• keyword $=$ min or temp or vel or time  

min values $=$ etol ftol maxiter maxeval etol $=$ stopping tolerance for energy, used in quenching   
ftol $=$ stopping tolerance for force, used in quenching maxiter $-$ max iterations of minimize, used in quenching   
maxeval = max number of force/energy evaluations, used in quenching   
temp value = Tdephase   
Tdephase = target temperature for velocity randomization, used in dephasing   
vel values = loop dist   
loop = all or local or geom, used in dephasing   
dist = uniform or gaussian, used in dephasing   
time value $=$ steps or clock steps = simulation runs for N timesteps on each replica (default) clock $=$ simulation runs for N timesteps across all replicas  

# 1.80.2 Examples  

<html><body><table><tr><td>prd 150001001010100154982 prd 5000 100 10 10 100 1 54982 min 0.1 0.1 100 200</td></tr></table></body></html>  

# 1.80.3 Description  

Run a parallel replica dynamics (PRD) simulation using multiple replicas of a system. One or more replicas can be used. The total number of steps $N$ to run can be interpreted in one of two ways; see discussion of the time keyword below.  

PRD is described in (Voter1998) by Art Voter. Similar to global or local hyperdynamics (HD), PRD is a method for performing accelerated dynamics that is suitable for infrequent-event systems that obey first-order kinetics. A good overview of accelerated dynamics methods (AMD) for such systems in given in this review paper (Voter2002) from Art’s group. To quote from the paper: “The dynamical evolution is characterized by vibrational excursions within a potential basin, punctuated by occasional transitions between basins. The transition probability is characterized by p(t) $=\mathrm{k^{*}e x p(-k t)}$ where $\mathbf{k}$ is the rate constant.”  

Both PRD and HD produce a time-accurate trajectory that effectively extends the timescale over which a system can be simulated, but they do it differently. PRD creates Nr replicas of the system and runs dynamics on each independently with a normal unbiased potential until an event occurs in one of the replicas. The time between events is reduced by a factor of Nr replicas. HD uses a single replica of the system and accelerates time by biasing the interaction potential in a manner such that each timestep is effectively longer. For both methods, per CPU second, more physical time elapses and more events occur. See the hyper page for more info about HD.  

In PRD, each replica runs on a partition of one or more processors. Processor partitions are defined at run-time using the -partition command-line switch. Note that if you have MPI installed, you can run a multi-replica simulation with more replicas (partitions) than you have physical processors, e.g you can run a 10-replica simulation on one or two processors. However for PRD, this makes little sense, since running a replica on virtual instead of physical processors,offers no effective parallel speed-up in searching for infrequent events. See the Howto replica doc page for further discussion.  

When a PRD simulation is performed, it is assumed that each replica is running the same model, though LAMMPS does not check for this. I.e. the simulation domain, the number of atoms, the interaction potentials, etc should be the same for every replica.  

A PRD run has several stages, which are repeated each time an “event” occurs in one of the replicas, as explained below. The logic for a PRD run is as follows:  

while (time remains): dephase for n_dephase\*t_dephase steps until (event occurs on some replica):  

run dynamics for t_event steps quench check for uncorrelated event on any replica   
until (no correlated event occurs): run dynamics for t_correlate steps quench check for correlated event on this replica   
event replica shares state with all replicas  

Before this loop begins, the state of the system on replica 0 is shared with all replicas, so that all replicas begin from the same initial state. The first potential energy basin is identified by quenching (an energy minimization, see below) the initial state and storing the resulting coordinates for reference.  

In the first stage, dephasing is performed by each replica independently to eliminate correlations between replicas. This is done by choosing a random set of velocities, based on the random_seed that is specified, and running t_dephase timesteps of dynamics. This is repeated n_dephase times. At each of the n_dephase stages, if an event occurs during the t_dephase steps of dynamics for a particular replica, the replica repeats the stage until no event occurs.  

If the temp keyword is not specified, the target temperature for velocity randomization for each replica is the current temperature of that replica. Otherwise, it is the specified Tdephase temperature. The style of velocity randomization is controlled using the keyword vel with arguments that have the same meaning as their counterparts in the velocity command.  

In the second stage, each replica runs dynamics continuously, stopping every t_event steps to check if a transition event has occurred. This check is performed by quenching the system and comparing the resulting atom coordinates to the coordinates from the previous basin. The first time through the PRD loop, the “previous basin” is the set of quenched coordinates from the initial state of the system.  

A quench is an energy minimization and is performed by whichever algorithm has been defined by the min_style command. Minimization parameters may be set via the min_modify command and by the min keyword of the PRD command. The latter are the settings that would be used with the minimize command. Note that typically, you do not need to perform a highly-converged minimization to detect a transition event, though you may need to in order to prevent a set of atoms in the system from relaxing to a saddle point.  

The event check is performed by a compute with the specified compute-ID. Currently there is only one compute that works with the PRD command, which is the compute event/displace command. Other event-checking computes may be added. Compute event/displace checks whether any atom in the compute group has moved further than a specified threshold distance. If so, an “event” has occurred.  

In the third stage, the replica on which the event occurred (event replica) continues to run dynamics to search for correlated events. This is done by running dynamics for t_correlate steps, quenching every t_event steps, and checking if another event has occurred.  

The first time no correlated event occurs, the final state of the event replica is shared with all replicas, the new basin reference coordinates are updated with the quenched state, and the outer loop begins again. While the replica event is searching for correlated events, all the other replicas also run dynamics and event checking with the same schedule, but the final states are always overwritten by the state of the event replica.  

The outer loop of the pseudocode above continues until $N$ steps of dynamics have been performed. Note that $N$ only includes the dynamics of stages 2 and 3, not the steps taken during dephasing or the minimization iterations of quenching. The specified $N$ is interpreted in one of two ways, depending on the time keyword. If the time value is steps, which is the default, then each replica runs for $N$ timesteps. If the time value is clock, then the simulation runs until $N$ aggregate timesteps across all replicas have elapsed. This aggregate time is the “clock” time defined below, which typically advances nearly M times faster than the timestepping on a single replica, where M is the number of replicas.  

Four kinds of output can be generated during a PRD run: event statistics, thermodynamic output by each replica, dump files, and restart files.  

When running with multiple partitions (each of which is a replica in this case), the print-out to the screen and master log.lammps file is limited to event statistics. Note that if a PRD run is performed on only a single replica then the event statistics will be intermixed with the usual thermodynamic output discussed below.  

The quantities printed each time an event occurs are the timestep, CPU time, clock, event number, a correlation flag, the number of coincident events, and the replica number of the chosen event.  

The timestep is the usual LAMMPS timestep, except that time does not advance during dephasing or quenches, but only during dynamics. Note that are two kinds of dynamics in the PRD loop listed above that contribute to this timestepping. The first is when all replicas are performing independent dynamics, waiting for an event to occur. The second is when correlated events are being searched for, but only one replica is running dynamics.  

The CPU time is the total elapsed time on each processor, since the start of the PRD run.  

The clock is the same as the timestep except that it advances by M steps per timestep during the first kind of dynamics when the M replicas are running independently. The clock advances by only 1 step per timestep during the second kind of dynamics, when only a single replica is checking for a correlated event. Thus “clock” time represents the aggregate time (in steps) that has effectively elapsed during a PRD simulation on M replicas. If most of the PRD run is spent in the second stage of the loop above, searching for infrequent events, then the clock will advance nearly M times faster than it would if a single replica was running. Note the clock time between successive events should be drawn from p(t).  

The event number is a counter that increments with each event, whether it is uncorrelated or correlated.  

The correlation flag will be 0 when an uncorrelated event occurs during the second stage of the loop listed above, i.e. when all replicas are running independently. The correlation flag will be 1 when a correlated event occurs during the third stage of the loop listed above, i.e. when only one replica is running dynamics.  

When more than one replica detects an event at the end of the same event check (every t_event steps) during the second stage, then one of them is chosen at random. The number of coincident events is the number of replicas that detected an event. Normally, this value should be 1. If it is often greater than 1, then either the number of replicas is too large, or t_event is too large.  

The replica number is the ID of the replica (from 0 to M-1) in which the event occurred.  

When running on multiple partitions, LAMMPS produces additional log files for each partition, e.g. log.lammps.0, log.lammps.1, etc. For the PRD command, these contain the thermodynamic output for each replica. You will see short runs and minimizations corresponding to the dynamics and quench operations of the loop listed above. The timestep will be reset appropriately depending on whether the operation advances time or not.  

After the PRD command completes, timing statistics for the PRD run are printed in each replica’s log file, giving a breakdown of how much CPU time was spent in each stage (dephasing, dynamics, quenching, etc).  

Any dump files defined in the input script, will be written to during a PRD run at timesteps corresponding to both uncorrelated and correlated events. This means the requested dump frequency in the dump command is ignored. There will be one dump file (per dump command) created for all partitions.  

The atom coordinates of the dump snapshot are those of the minimum energy configuration resulting from quenching following a transition event. The timesteps written into the dump files correspond to the timestep at which the event occurred and NOT the clock. A dump snapshot corresponding to the initial minimum state used for event detection is written to the dump file at the beginning of each PRD run.  

If the restart command is used, a single restart file for all the partitions is generated, which allows a PRD run to be continued by a new input script in the usual manner.  

The restart file is generated at the end of the loop listed above. If no correlated events are found, this means it contains a snapshot of the system at time $\mathrm{~T~}+\mathrm{~}t_{-}$ _correlate, where $\mathrm{T}$ is the time at which the uncorrelated event occurred. If correlated events were found, then it contains a snapshot of the system at time $\mathrm{~T~}+t_{-}$ correlate, where T is the time of the last correlated event.  

The restart frequency specified in the restart command is interpreted differently when performing a PRD run. It does not mean the timestep interval between restart files. Instead it means an event interval for uncorrelated events. Thus a frequency of 1 means write a restart file every time an uncorrelated event occurs. A frequency of 10 means write a restart file every 10th uncorrelated event.  

When an input script reads a restart file from a previous PRD run, the new script can be run on a different number of replicas or processors. However, it is assumed that t_correlate in the new PRD command is the same as it was previously. If not, the calculation of the “clock” value for the first event in the new run will be slightly off.  

# 1.80.4 Restrictions  

This command can only be used if LAMMPS was built with the REPLICA package. See the Build package doc page for more info.  

The $N$ and t_correlate settings must be integer multiples of t_event.  

Runs restarted from restart file written during a PRD run will not produce identical results due to changes in the random numbers used for dephasing.  

This command cannot be used when any fixes are defined that keep track of elapsed time to perform time-dependent operations. Examples include the “ave” fixes such as fix ave/chunk. Also fix dt/reset and fix deposit.  

# 1.80.5 Related commands  

compute event/displace, min_modify, min_style, run_style, minimize, velocity, temper, neb, tad, hyper  

# 1.80.6 Default  

The option defaults are $\mathrm{min}=0.10.14050$ , no temp setting, vel $=$ geom gaussian, and time $=$ steps.  

(Voter1998) Voter, Phys Rev B, 57, 13985 (1998).   
(Voter2002) Voter, Montalenti, Germann, Annual Review of Materials Research 32, 321 (2002).  

# 1.81 print command  

# 1.81.1 Syntax  

print string keyword value  

• string $=$ text string to print, which may contain variables • zero or more keyword/value pairs may be appended • keyword $=f l e$ or append or screen or universe  

file value $=$ filename append value $=$ filename screen value $=$ yes or no universe value $=$ yes or no  

# 1.81. print command  

# 1.81.2 Examples  

print "Done with equilibration" file info.dat   
print Vol=\$v append info.dat screen no   
prin t "The system volume is now $\$1$ "   
print 'The system volume is now $\$1$   
print "NEB calculation 1 complete" screen no universe yes   
print """   
System volume = \$v   
System temperature ${\it\Delta\phi}=\S\mathrm{t}$  

# 1.81.3 Description  

Print a text string to the screen and logfile. The text string must be a single argument, so if it is one line but more than one word, it should be enclosed in single or double quotes. To generate multiple lines of output, the string can be enclosed in triple quotes, as in the last example above. If the text string contains variables, they will be evaluated and their current values printed.  

Added in version 15Jun2023: support for vector style variables  

See the variable command for a description of equal and vector style variables which are typically the most useful ones to use with the print command. Equal- and vector-style variables can calculate formulas involving mathematical operations, atom properties, group properties, thermodynamic properties, global values calculated by a compute or $f\boldsymbol{{x}}$ , or references to other variables. Vector-style variables are printed in a bracketed, comma-separated format, e.g. [1,2,3,4] or [12.5,2,4.6,10.1].  

# Note  

As discussed on the Commands parse doc page, the text string can use “immediate” variables, specified as $\$1$ (formula) with parenthesis, where the numeric formula has the same syntax as equal-style variables described on the variable doc page. This is a convenient way to evaluate a formula immediately without using the variable command to define a named variable and then use that variable in the text string. The formula can include a trailing colon and format string which determines the precision with which the numeric value is output. This is also explained on the Commands parse doc page.  

If you want the print command to be executed multiple times (with changing variable values), there are 3 options. First, consider using the fix print command, which will print a string periodically during a simulation. Second, the print command can be used as an argument to the every option of the run command. Third, the print command could appear in a section of the input script that is looped over (see the jump and next commands).  

If the file or append keyword is used, a filename is specified to which the output will be written. If file is used, then the filename is overwritten if it already exists. If append is used, then the filename is appended to if it already exists, or created if it does not exist.  

If the screen keyword is used, output to the screen and logfile can be turned on or off as desired.  

If the universe keyword is used, output to the global screen and logfile can be turned on or off as desired. In multipartition calculations, the screen option and the corresponding output only apply to the screen and logfile of the individual partition.  

# 1.81.4 Restrictions  

none  

# 1.81.5 Related commands  

fix print, variable  

# 1.81.6 Default  

The option defaults are no file output, screen $=$ yes, and universe $=$ no.  

# 1.82 processors command  

# 1.82.1 Syntax  

processors Px Py Pz keyword args ...  

• $\mathrm{Px,Py,Pz=\#}$ of processors in each dimension of 3d grid overlaying the simulation domain   
• zero or more keyword/arg pairs may be appended   
• keyword $=$ grid or map or part or file grid $\mathrm{arg}=$ gstyle params ... gstyle $=$ onelevel or twolevel or numa or custom onelevel params $=$ none twolevel params = Nc Cx Cy Cz Nc = number of cores per node Cx,Cy,Cz = # of cores in each dimension of 3d sub-grid assigned to each node numa params = none custom params = infile infile = file containing grid layout numa_nodes arg = Nn Nn = number of numa domains per node map arg = cart or cart/reorder or xyz or xzy or yxz or yzx or zxy or zyx $\mathrm{cart}=\mathrm{useMPI\_Cart()}$ methods to map processors to 3d grid with reorder = 0 $\mathrm{cart/reorder}=\mathrm{useMPI\_Cart()}$ methods to map processors to 3d grid with reorder = 1 xyz,xzy,yxz,yzx,zxy,zyx = map processors to 3d grid in IJK ordering part args = Psend Precv cstyle Psend $=$ partition $\#$ (1 to Np) which will send its processor layout Precv $=$ partition # (1 to Np) which will recv the processor layout cstyle $=$ multiple multiple $=$ Psend grid will be multiple of Precv grid in each dimension file arg $=$ outfile outfile $=$ name of file to write 3d grid of processors to  

# 1.82.2 Examples  

processors \* \* 5   
processors 2 4 4   
processors \* \* 8 map xyz   
processors \* \* \* grid numa   
processors \* \* \* grid twolevel 4 \* \* 1  

(continues on next page)  

(continued from previous page)  

processors 4 8 16 grid custom myfile processors $***$ part 1 2 multiple  

# 1.82.3 Description  

Specify how processors are mapped as a regular 3d grid to the global simulation box. The mapping involves 2 steps. First if there are $\mathrm{\bfP}$ processors it means choosing a factorization $\mathbf{P}=\mathbf{P}\mathbf{x}$ by $\mathrm{Py}$ by $\mathrm{Pz}$ so that there are $\mathrm{Px}$ processors in the $\mathbf{X}$ dimension, and similarly for the y and z dimensions. Second, the $\mathrm{\bfP}$ processors are mapped to the regular 3d grid. The arguments to this command control each of these 2 steps.  

The Px, Py, $\mathrm{Pz}$ parameters affect the factorization. Any of the 3 parameters can be specified with an asterisk “\*”, which means LAMMPS will choose the number of processors in that dimension of the grid. It will do this based on the size and shape of the global simulation box so as to minimize the surface-to-volume ratio of each processor’s subdomain.  

Choosing explicit values for $\mathrm{Px}$ or $\mathrm{Py}$ or $\mathrm{Pz}$ can be used to override the default manner in which LAMMPS will create the regular 3d grid of processors, if it is known to be sub-optimal for a particular problem. E.g. a problem where the extent of atoms will change dramatically in a particular dimension over the course of the simulation.  

The product of $\mathrm{Px}$ , Py, $\mathrm{Pz}$ must equal P, the total # of processors LAMMPS is running on. For a 2d simulation, Pz must equal 1.  

Note that if you run on a prime number of processors P, then a grid such as $1\mathrm{~x~P~x~}1$ will be required, which may incur extra communication costs due to the high surface area of each processor’s subdomain.  

Also note that if multiple partitions are being used then $\mathrm{\bfP}$ is the number of processors in this partition; see the partition command-line switch page for details. Also note that you can prefix the processors command with the partition command to easily specify different $\mathrm{Px,Py,Pz}$ values for different partitions.  

You can use the partition command to specify different processor grids for different partitions, e.g.  

<html><body><table><tr><td>partition yes 1 processors 4 4 4</td></tr><tr><td>partition yes 2 processors 2 3 2</td></tr><tr><td></td></tr></table></body></html>  

#  Note  

This command only affects the initial regular 3d grid created when the simulation box is first specified via a create_box or read_data or read_restart command. Or if the simulation box is re-created via the replicate command. The same regular grid is initially created, regardless of which comm_style command is in effect.  

If load-balancing is never invoked via the balance or fix balance commands, then the initial regular grid will persist for all simulations. If balancing is performed, some of the methods invoked by those commands retain the logical topology of the initial 3d grid, and the mapping of processors to the grid specified by the processors command. However the grid spacings in different dimensions may change, so that processors own subdomains of different sizes. If the comm_style tiled command is used, methods invoked by the balancing commands may discard the 3d grid of processors and tile the simulation domain with subdomains of different sizes and shapes which no longer have a logical 3d connectivity. If that occurs, all the information specified by the processors command is ignored.  

The grid keyword affects the factorization of P into $\mathrm{Px},\mathrm{Py},\mathrm{Pz}$ and it can also affect how the P processor IDs are mapped to the 3d grid of processors.  

The onelevel style creates a 3d grid that is compatible with the $\mathrm{Px},\mathrm{Py},\mathrm{Pz}$ settings, and which minimizes the surface-tovolume ratio of each processor’s subdomain, as described above. The mapping of processors to the grid is determined by the map keyword setting.  

The twolevel style can be used on machines with multicore nodes to minimize off-node communication. It ensures that contiguous subsections of the 3d grid are assigned to all the cores of a node. For example if $N c$ is 4, then $2\mathbf{x}2\mathbf{x}1$ or $2\mathrm{x}1\mathrm{x}2$ or $1\mathbf{x}2\mathbf{x}2$ subsections of the 3d grid will correspond to the cores of each node. This affects both the factorization and mapping steps.  

The $C x,C y$ , $C z$ settings are similar to the $P x,P y,P z$ settings, only their product should equal Nc. Any of the 3 parameters can be specified with an asterisk “\*”, which means LAMMPS will choose the number of cores in that dimension of the node’s sub-grid. As with $\mathrm{Px},\mathrm{Py},\mathrm{Pz}$ , it will do this based on the size and shape of the global simulation box so as to minimize the surface-to-volume ratio of each processor’s subdomain.  

![](images/82619beeb83b80a2bcb2767e8481f8f40023208bb95b6895ce5d49927bcee1f1.jpg)  

# Note  

For the twolevel style to work correctly, it assumes the MPI ranks of processors LAMMPS is running on are ordered by core and then by node. E.g. if you are running on 2 quad-core nodes, for a total of 8 processors, then it assumes processors 0,1,2,3 are on node 1, and processors 4,5,6,7 are on node 2. This is the default rank ordering for most MPI implementations, but some MPIs provide options for this ordering, e.g. via environment variable settings.  

The numa style operates similar to the twolevel keyword except that it auto-detects which cores are running on which nodes. It will also subdivide the cores into numa domains. Currently, the number of numa domains is not autodetected and must be specified using the numa_nodes keyword; otherwise, the default value is used. The numa style uses a different algorithm than the twolevel keyword for doing the two-level factorization of the simulation box into a 3d processor grid to minimize off-node communication and communication across numa domains. It does its own MPI-based mapping of nodes and cores to the regular 3d grid. Thus it may produce a different layout of the processors than the twolevel options.  

The numa style will give an error if the number of MPI processes is not divisible by the number of cores used per node, or any of the $\mathrm{Px}$ or $\mathrm{Py}$ or $\mathrm{Pz}$ values is greater than 1.  

# Note  

Unlike the twolevel style, the numa style does not require any particular ordering of MPI ranks in order to work correctly. This is because it auto-detects which processes are running on which nodes. However, it assumes that the lowest ranks are in the first numa domain, and so forth. MPI rank orderings that do not preserve this property might result in more intra-node communication between CPUs.  

The custom style uses the file infile to define both the 3d factorization and the mapping of processors to the grid.  

The file should have the following format. Any number of initial blank or comment lines (starting with a “#” character) can be present. The first non-blank, non-comment line should have 3 values:  

numa style for two-level factorization to reduce the amount of MPI communications between CPUs. A good setting for this will typically be equal to the number of CPU sockets per node.  

The map keyword affects how the P processor IDs (from 0 to P-1) are mapped to the 3d grid of processors. It is only used by the onelevel and twolevel grid settings.  

The cart style uses the family of MPI Cartesian functions to perform the mapping, namely MPI_Cart_create(), MPI_Cart_get(), MPI_Cart_shift(), and MPI_Cart_rank(). It invokes the MPI_Cart_create() function with its reorder flag $=0$ , so that MPI is not free to reorder the processors.  

The cart/reorder style does the same thing as the cart style except it sets the reorder flag to 1, so that MPI can reorder processors if it desires.  

The xyz, xzy, yxz, yzx, zxy, and zyx styles are all similar. If the style is IJK, then it maps the P processors to the grid so that the processor ID in the I direction varies fastest, the processor ID in the J direction varies next fastest, and the processor ID in the K direction varies slowest. For example, if you select style xyz and you have a $2\mathbf{x}2\mathbf{x}2$ grid of 8 processors, the assignments of the 8 octants of the simulation domain will be:  

<html><body><table><tr><td>proc 0 = lo x, lo y, lo z octant</td><td></td></tr><tr><td>proc 1 = hi x, lo y, lo z octant</td><td></td></tr><tr><td>proc 2 = lo x, hi y, lo z octant</td><td></td></tr><tr><td>proc 3 = hi x, hi y, lo z octant</td><td></td></tr><tr><td>proc 4 = lo x, lo y, hi z octant</td><td></td></tr><tr><td>proc 5 = hi x, lo y, hi z octant</td><td></td></tr><tr><td>proc 6 = lo x, hi y, hi z octant</td><td></td></tr><tr><td>proc 7 = hi x, hi y, hi z octant</td><td></td></tr></table></body></html>  

Note that, in principle, an MPI implementation on a particular machine should be aware of both the machine’s network topology and the specific subset of processors and nodes that were assigned to your simulation. Thus its MPI_Cart calls can optimize the assignment of MPI processes to the 3d grid to minimize communication costs. In practice, however, few if any MPI implementations actually do this. So it is likely that the cart and cart/reorder styles simply give the same result as one of the IJK styles.  

Also note, that for the twolevel grid style, the map setting is used to first map the nodes to the 3d grid, then again to the cores within each node. For the latter step, the cart and cart/reorder styles are not supported, so an xyz style is used in their place.  

The part keyword affects the factorization of P into $\mathrm{Px,Py,Pz}$ .  

It can be useful when running in multi-partition mode, e.g. with the run_style verlet/split command. It specifies a dependency between a sending partition Psend and a receiving partition Precv which is enforced when each is setting up their own mapping of their processors to the simulation box. Each of Psend and Precv must be integers from 1 to Np, where Np is the number of partitions you have defined via the -partition command-line switch.  

A “dependency” means that the sending partition will create its regular 3d grid as $\mathrm{Px}$ by Py by $\mathrm{Pz}$ and after it has done this, it will send the $\mathrm{Px},\mathrm{Py},\mathrm{Pz}$ values to the receiving partition. The receiving partition will wait to receive these values before creating its own regular 3d grid and will use the sender’s $\mathrm{Px},\mathrm{Py},\mathrm{Pz}$ values as a constraint. The nature of the constraint is determined by the cstyle argument.  

For a cstyle of multiple, each dimension of the sender’s processor grid is required to be an integer multiple of the corresponding dimension in the receiver’s processor grid. This is a requirement of the run_style verlet/split command.  

For example, assume the sending partition creates a $4\mathrm{x}6\mathrm{x}10\mathrm{grid}=240$ processor grid. If the receiving partition is running on 80 processors, it could create a 4x2x10 grid, but it will not create a $2\mathbf{x}4\mathbf{x}10$ grid, since in the y-dimension, 6 is not an integer multiple of 4.  

![](images/71cc256a2ff9313e8a6d99f17be5ec78a11deaa02e60f54b23755eaece8b8a9c.jpg)  

# Note  

If you use the partition command to invoke different “processors” commands on different partitions, and you also use the part keyword, then you must ensure that both the sending and receiving partitions invoke the “processors” command that connects the 2 partitions via the part keyword. LAMMPS cannot easily check for this, but your simulation will likely hang in its setup phase if this error has been made.  

The file keyword writes the mapping of the factorization of P processors and their mapping to the 3d grid to the specified file outfile. This is useful to check that you assigned physical processors in the manner you desired, which can be tricky to figure out, especially when running on multiple partitions or on, a multicore machine or when the processor ranks were reordered by use of the -reorder command-line switch or due to use of MPI-specific launch options such as a config file.  

If you have multiple partitions you should ensure that each one writes to a different file, e.g. using a world-style variable for the filename. The file has a self-explanatory header, followed by one-line per processor in this format:  

world-ID universe-ID original-ID: I J K: name  

The IDs are the processor’s rank in this simulation (the world), the universe (of multiple simulations), and the original MPI communicator used to instantiate LAMMPS, respectively. The world and universe IDs will only be different if you are running on more than one partition; see the -partition command-line switch. The universe and original IDs will only be different if you used the -reorder command-line switch to reorder the processors differently than their rank in the original communicator LAMMPS was instantiated with.  

I,J,K are the indices of the processor in the regular 3d grid, each from 1 to Nd, where Nd is the number of processors in that dimension of the grid.  

The name is what is returned by a call to MPI_Get_processor_name() and should represent an identifier relevant to the physical processors in your machine. Note that depending on the MPI implementation, multiple cores can have the same name.  

# 1.82.4 Restrictions  

This command cannot be used after the simulation box is defined by a read_data or create_box command. It can be used before a restart file is read to change the 3d processor grid from what is specified in the restart file.  

The grid numa keyword only currently works with the map cart option.  

The part keyword (for the receiving partition) only works with the grid onelevel or grid twolevel options.  

# 1.82.5 Related commands  

partition, -reorder command-line switch  

# 1.82.6 Default  

The option defaults are $\mathrm{Px}$ Py $\mathrm{Pz}={}^{*}****$ , grid $=$ onelevel, map $=$ cart, and numa_nodes $=2$ .  

# 1.83 python command  

# 1.83.1 Syntax  

# 1.83. python command  

• mode $=$ source or name of Python function if mode is source:  

keyword $=$ here or name of a Python file here arg $=$ inline inline $=$ one or more lines of Python code which defines func must be a single argument, typically enclosed between triple quotes Python file $=$ name of a file with Python code which will be executed immediately • if mode is the name of a Python function, one or more keywords with/without arguments must be appended keyword $=$ invoke or input or return or format or length or file or here or exists invoke $\mathrm{arg}=\mathrm{none}=$ invoke the previously defined Python function input args $=\mathrm{N}$ i1 i2 ... iN $\mathrm{N}=\#$ of inputs to function i1,...,iN $=$ value, SELF, or LAMMPS variable name value $=$ integer number, floating point number, or string SELF $=$ reference to LAMMPS itself which can be accessed by Python function variable = v_name, where name $-$ name of LAMMPS variable, e.g. v_abc return arg = varReturn varReturn = v_name = LAMMPS variable name which the return value of the Python␣ $\hookrightarrow$ function will be assigned to format arg = fstring with M characters $\mathrm{M}=\mathrm{N}$ if no return value, where $\Nu=\#$ of inputs $\mathrm{M}=\mathrm{N}{+}1$ if there is a return value fstring = each character (i,f,s,p) corresponds in order to an input or return value ${}^{!}\mathrm{i}^{!}=\mathrm{integer}$ , 'f' = floating point, $\ensuremath{\mathrm{^{\prime}s^{\prime}}}=\mathrm{string}$ , $\mathrm{^{\prime}p^{\prime}=S E L F}$ length arg = Nlen Nlen = max length of string returned from Python function file arg = filename filename $=$ file of Python code, which defines func here arg $=$ inline inline $=$ one or more lines of Python code which defines func must be a single argument, typically enclosed between triple quotes exists arg = none = Python code has been loaded by previous python command  

# 1.83.2 Examples  

python pForce input 2 v_x 20.0 return v_f format fff file force.py   
python pForce invoke   
python factorial input 1 myN return v_fac format ii here """   
def factorial(n): if $\mathrm{n=}\mathrm{=}1$ : return n return n \* factorial(n-1)   
"""   
python loop input 1 SELF return v_value format pf here """   
def loop(lmpptr,N,cut0): from lammps import lammps lmp = lammps(ptr=lmpptr)  

(continues on next page)  

(continued from previous page)  

<html><body><table><tr><td>rPievioas # loop N times, increasing cutoff each time for i in range(N): cut = cut0 + i*0.1 lmp.set _ variable("cut",cut) # set a variable in LAMMPS</td></tr></table></body></html>  

# 1.83.3 Description  

The python command allows interfacing LAMMPS with an embedded Python interpreter and enables either executing arbitrary python code in that interpreter, registering a Python function for future execution (as a python style variable, from a fix interfaced with python, or for direct invocation), or invoking such a previously registered function.  

Arguments, including LAMMPS variables, can be passed to the function from the LAMMPS input script and a value returned by the Python function assigned to a LAMMPS variable. The Python code for the function can be included directly in the input script or in a separate Python file. The function can be standard Python code or it can make “callbacks” to LAMMPS through its library interface to query or set internal values within LAMMPS. This is a powerful mechanism for performing complex operations in a LAMMPS input script that are not possible with the simple input script and variable syntax which LAMMPS defines. Thus your input script can operate more like a true programming language.  

Use of this command requires building LAMMPS with the PYTHON package which links to the Python library so that the Python interpreter is embedded in LAMMPS. More details about this process are given below.  

There are two ways to invoke a Python function once it has been registered. One is using the invoke keyword. The other is to assign the function to a python-style variable defined in your input script. Whenever the variable is evaluated, it will execute the Python function to assign a value to the variable. Note that variables can be evaluated in many different ways within LAMMPS. They can be substituted with their result directly in an input script, or they can be passed to various commands as arguments, so that the variable is evaluated during a simulation run.  

A broader overview of how Python can be used with LAMMPS is given in the Use Python with LAMMPS section of the documentation. There also is an examples/python directory which illustrates use of the python command.  

The first argument of the python command is either the source keyword or the name of a Python function. This defines the mode of the python command.  

Changed in version 22Dec2022.  

If the source keyword is used, it is followed by either a file name or the here keyword. No other keywords can be used. The here keyword is followed by a string with python commands, either on a single line enclosed in quotes, or as multiple lines enclosed in triple quotes. These Python commands will be passed to the python interpreter and executed immediately without registering a Python function for future execution. The code will be loaded into and run in the “main” module of the Python interpreter. This allows running arbitrary Python code at any time while processing the LAMMPS input file. This can be used to pre-load Python modules, initialize global variables, define functions or classes, or perform operations using the python programming language. The Python code will be executed in parallel on all MPI processes. No arguments can be passed.  

In all other cases, the first argument is the name of a Python function that will be registered with LAMMPS for future execution. The function may already be defined (see exists keyword) or must be defined using the file or here keywords as explained below.  

If the invoke keyword is used, no other keywords can be used, and a previous python command must have registered the Python function referenced by this command. This invokes the Python function with the previously defined arguments and the return value is processed as explained below. You can invoke the function as many times as you wish in your input script.  

The input keyword defines how many arguments $N$ the Python function expects. If it takes no arguments, then the input keyword should not be used. Each argument can be specified directly as a value, e.g. ‘6’ or ‘3.14159’ or ‘abc’ (a string of characters). The type of each argument is specified by the format keyword as explained below, so that Python will know how to interpret the value. If the word SELF is used for an argument it has a special meaning. A pointer is passed to the Python function which it can convert into a reference to LAMMPS itself using the LAMMPS Python module. This enables the function to call back to LAMMPS through its library interface as explained below. This allows the Python function to query or set values internal to LAMMPS which can affect the subsequent execution of the input script. A LAMMPS variable can also be used as an argument, specified as v_name, where “name” is the name of the variable. Any style of LAMMPS variable returning a scalar or a string can be used, as defined by the variable command. The format keyword must be used to set the type of data that is passed to Python. Each time the Python function is invoked, the LAMMPS variable is evaluated and its value is passed to the Python function.  

The return keyword is only needed if the Python function returns a value. The specified varReturn must be of the form v_name, where “name” is the name of a python-style LAMMPS variable, defined by the variable command. The Python function can return a numeric or string value, as specified by the format keyword.  

As explained on the variable doc page, the definition of a python-style variable associates a Python function name with the variable. This must match the Python function name first argument of the python command. For example these two commands would be consistent:  

variable foo python myMultiply python myMultiply return v_foo format f file funcs.py  

The two commands can appear in either order in the input script so long as both are specified before the Python function is invoked for the first time. Afterwards, the variable ‘foo’ is associated with the Python function ‘myMultiply’.  

The format keyword must be used if the input or return keywords are used. It defines an fstring with M characters, where $\mathbf{M}=\mathrm{sum}$ of number of inputs and outputs. The order of characters corresponds to the $\mathbf{N}$ inputs, followed by the return value (if it exists). Each character must be one of the following: “i” for integer, “f” for floating point, “s” for string, or “p” for SELF. Each character defines the type of the corresponding input or output value of the Python function and affects the type conversion that is performed internally as data is passed back and forth between LAMMPS and Python. Note that it is permissible to use a python-style variable in a LAMMPS command that allows for an equalstyle variable as an argument, but only if the output of the Python function is flagged as a numeric value (“i” or “f”) via the format keyword.  

If the return keyword is used and the format keyword specifies the output as a string, then the default maximum length of that string is 63 characters (64-1 for the string terminator). If you want to return a longer string, the length keyword can be specified with its Nlen value set to a larger number (the code allocates space for $\scriptstyle\mathrm{Nlen}+1$ to include the string terminator). If the Python function generates a string longer than the default 63 or the specified Nlen, it will be truncated.  

Either the file, here, or exists keyword must be used, but only one of them. These keywords specify what Python code to load into the Python interpreter. The file keyword gives the name of a file containing Python code, which should end with a “.py” suffix. The code will be immediately loaded into and run in the “main” module of the Python interpreter. The Python code will be executed in parallel on all MPI processes. Note that Python code which contains a function definition does not “execute” the function when it is run; it simply defines the function so that it can be invoked later.  

The here keyword does the same thing, except that the Python code follows as a single argument to the here keyword. This can be done using triple quotes as delimiters, as in the examples above. This allows Python code to be listed verbatim in your input script, with proper indentation, blank lines, and comments, as desired. See the Commands parse doc page, for an explanation of how triple quotes can be used as part of input script syntax.  

The exists keyword takes no argument. It means that Python code containing the required Python function with the given name has already been executed, for example by a python source command or in the same file that was used previously with the file keyword.  

Note that the Python code that is loaded and run must contain a function with the specified function name. To operate properly when later invoked, the function code must match the input and return and format keywords specified by the python command. Otherwise Python will generate an error.  

This section describes how Python code can be written to work with LAMMPS.  

Whether you load Python code from a file or directly from your input script, via the file and here keywords, the code can be identical. It must be indented properly as Python requires. It can contain comments or blank lines. If the code is in your input script, it cannot however contain triple-quoted Python strings, since that will conflict with the triple-quote parsing that the LAMMPS input script performs.  

All the Python code you specify via one or more python commands is loaded into the Python “main” module, i.e. $\mathrm{\_name\_==\Delta^{\prime}\_m a i n\_m^{\prime}}$ . The code can define global variables, define global functions, define classes or execute statements that are outside of function definitions. It can contain multiple functions, only one of which matches the func setting in the python command. This means you can use the file keyword once to load several functions, and the exists keyword thereafter in subsequent python commands to register the other functions that were previously loaded with LAMMPS.  

A Python function you define (or more generally, the code you load) can import other Python modules or classes, it can make calls to other system functions or functions you define, and it can access or modify global variables (in the “main” module) which will persist between successive function calls. The latter can be useful, for example, to prevent a function from being invoke multiple times per timestep by different commands in a LAMMPS input script that access the returned python-style variable associated with the function. For example, consider this function loaded with two global variables defined outside the function:  

<html><body><table><tr><td>nsteplast = -1</td></tr><tr><td>nvaluelast = 0</td></tr><tr><td></td></tr><tr><td>def expensive(nstep):</td></tr><tr><td>global 1 nsteplast,nvaluelast</td></tr><tr><td>if nstep 二二 nsteplast: return nvaluelast</td></tr><tr><td>nsteplast nstep perform complicated calculation</td></tr><tr><td>nvalue = .</td></tr><tr><td>nvaluelast = nvalue</td></tr></table></body></html>  

The variable ‘nsteplast’ stores the previous timestep the function was invoked (passed as an argument to the function). The variable ‘nvaluelast’ stores the return value computed on the last function invocation. If the function is invoked again on the same timestep, the previous value is simply returned, without re-computing it. The “global” statement inside the Python function allows it to overwrite the global variables from within the local context of the function.  

Note that if you load Python code multiple times (via multiple python commands), you can overwrite previously loaded variables and functions if you are not careful. E.g. if the code above were loaded twice, the global variables would be re-initialized, which might not be what you want. Likewise, if a function with the same name exists in two chunks of Python code you load, the function loaded second will override the function loaded first.  

It’s important to realize that if you are running LAMMPS in parallel, each MPI task will load the Python interpreter and execute a local copy of the Python function(s) you define. There is no connection between the Python interpreters running on different processors. This implies three important things.  

# 1.83. python command  

First, if you put a print or other statement creating output to the screen in your Python function, you will see P copies of the output, when running on P processors. If the prints occur at (nearly) the same time, the P copies of the output may be mixed together. When loading the LAMMPS Python module into the embedded Python interpreter, it is possible to pass the pointer to the current LAMMPS class instance and via the Python interface to the LAMMPS library interface, it is possible to determine the MPI rank of the current process and thus adapt the Python code so that output will only appear on MPI rank 0. The following LAMMPS input demonstrates how this could be done. The text ‘Hello, LAMMPS!’ should be printed only once, even when running LAMMPS in parallel.  

python python_hello input 1 SELF format p here   
def python_hello(handle): from lammps import lammps lmp $=$ lammps(ptr=handle) me = lmp.extract_setting('world_rank') if $\mathrm{me}==0$ : print('Hello, LAMMPS!')   
python python_hello invoke  

If your Python code loads Python modules that are not pre-loaded by the Python library, then it will load the module from disk. This may be a bottleneck if 1000s of processors try to load a module at the same time. On some large supercomputers, loading of modules from disk by Python may be disabled. In this case you would need to pre-build a Python library that has the required modules pre-loaded and link LAMMPS with that library.  

Third, if your Python code calls back to LAMMPS (discussed in the next section) and causes LAMMPS to perform an MPI operation requires global communication (e.g. via MPI_Allreduce), such as computing the global temperature of the system, then you must ensure all your Python functions (running independently on different processors) call back to LAMMPS. Otherwise the code may hang.  

Your Python function can “call back” to LAMMPS through its library interface, if you use the SELF input to pass Python a pointer to LAMMPS. The mechanism for doing this in your Python function is as follows:  

def foo(handle,...): from lammps import lammps lmp = lammps(ptr=handle) lmp.command('print "Hello from inside Python"')  

The function definition must include a variable (‘handle’ in this case) which corresponds to SELF in the python command. The first line of the function imports the “lammps” Python module. The second line creates a Python object lmp which wraps the instance of LAMMPS that called the function. The ‘pt $\v u=$ handle’ argument is what makes that happen. The third line invokes the command() function in the LAMMPS library interface. It takes a single string argument which is a LAMMPS input script command for LAMMPS to execute, the same as if it appeared in your input script. In this case, LAMMPS should output  

def loop(N,cut0,thresh,lmpptr):   
print("LOOP ARGS", N, cut0, thresh, lmpptr)   
from lammps import lammps   
lmp = lammps(ptr=lmpptr)   
natoms = lmp.get_natoms() for i in range(N): cut = cut0 + i\*0.1 lmp.set_variable("cut",cut) # set a variable in LAMMPS lmp.command("pair_style lj/cut \${cut}") # LAMMPS command #lmp.command("pair_style lj/cut %d" % cut) # LAMMPS command option lmp.command("pair_coeff \* \* 1.0 1.0") # ditto lmp.command("run 10") # ditto pe $=$ lmp.extract_compute("thermo_pe",0,0) # extract total PE from LAMMPS print("PE", pe/natoms, thresh) if pe/natoms $<$ thresh: return  

with these input script commands:  

<html><body><table><tr><td>python python</td><td>Xdesong a d 4e TS 0'v- 0T O1 V 4ndu doo loop invoke</td></tr></table></body></html>  

This has the effect of looping over a series of 10 short runs (10 timesteps each) where the pair style cutoff is increased from a value of 1.0 in distance units, in increments of 0.1. The looping stops when the per-atom potential energy falls below a threshold of -4.0 in energy units. More generally, Python can be used to implement a loop with complex logic, much more so than can be created using the LAMMPS jump and $i f$ commands.  

Several LAMMPS library functions are called from the loop function. Get_natoms() returns the number of atoms in the simulation, so that it can be used to normalize the potential energy that is returned by extract_compute() for the “thermo_pe” compute that is defined by default for LAMMPS thermodynamic output. Set_variable() sets the value of a string variable defined in LAMMPS. This library function is a useful way for a Python function to return multiple values to LAMMPS, more than the single value that can be passed back via a return statement. This cutoff value in the “cut” variable is then substituted (by LAMMPS) in the pair_style command that is executed next. Alternatively, the “LAMMPS command option” line could be used in place of the 2 preceding lines, to have Python insert the value into the LAMMPS command string.  

# Note  

When using the callback mechanism just described, recognize that there are some operations you should not attempt because LAMMPS cannot execute them correctly. If the Python function is invoked between runs in the LAMMPS input script, then it should be OK to invoke any LAMMPS input script command via the library interface command() or file() functions, so long as the command would work if it were executed in the LAMMPS input script directly at the same point.  

However, a Python function can also be invoked during a run, whenever an associated LAMMPS variable it is assigned to is evaluated. If the variable is an input argument to another LAMMPS command (e.g. fix setforce), then the Python function will be invoked inside the class for that command, in one of its methods that is invoked in the middle of a timestep. You cannot execute arbitrary input script commands from the Python function (again, via the command() or file() functions) at that point in the run and expect it to work. Other library functions such as those that invoke computes or other variables may have hidden side effects as well. In these cases, LAMMPS has no simple way to check that something illogical is being attempted.  

The same applies to Python functions called during a simulation run at each time step using fix python/invoke.  

If you run Python code directly on your workstation, either interactively or by using Python to launch a Python script stored in a file, and your code has an error, you will typically see informative error messages. That is not the case when you run Python code from LAMMPS using an embedded Python interpreter. The code will typically fail silently. LAMMPS will catch some errors but cannot tell you where in the Python code the problem occurred. For example, if the Python code cannot be loaded and run because it has syntax or other logic errors, you may get an error from Python pointing to the offending line, or you may get one of these generic errors from LAMMPS:  

<html><body><table><tr><td>Could not process Python file</td></tr><tr><td>Could not process : Python string</td></tr><tr><td></td></tr></table></body></html>  

When the Python function is invoked, if it does not return properly, you will typically get this generic error from LAMMPS:  

Python function evaluation failed  

Here are three suggestions for debugging your Python code while running it under LAMMPS.  

First, don’t run it under LAMMPS, at least to start with! Debug it using plain Python. Load and invoke your function, pass it arguments, check return values, etc.  

Second, add Python print statements to the function to check how far it gets and intermediate values it calculates. See the discussion above about printing from Python when running in parallel.  

Third, use Python exception handling. For example, say this statement in your Python function is failing, because you have not initialized the variable foo:  

If you put one (or more) statements inside a “try” statement, like this:  

import exceptions   
print("Inside simple function")   
try: foo += 1 # one or more statements here   
except Exception as e: print("FOO error:", e)  

then you will get this message printed to the screen:  

FOO error: local variable 'foo' referenced before assignment  

If there is no error in the try statements, then nothing is printed. Either way the function continues on (unless you put a return or sys.exit() in the except clause).  

# 1.83.4 Restrictions  

This command is part of the PYTHON package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Building LAMMPS with the PYTHON package will link LAMMPS with the Python library on your system. Settings to enable this are in the lib/python/Makefile.lammps file. See the lib/python/README file for information on those settings.  

If you use Python code which calls back to LAMMPS, via the SELF input argument explained above, there is an extra step required when building LAMMPS. LAMMPS must also be built as a shared library and your Python function must be able to load the “lammps” Python module that wraps the LAMMPS library interface. These are the same steps required to use Python by itself to wrap LAMMPS. Details on these steps are explained on the Python doc page. Note that it is important that the stand-alone LAMMPS executable and the LAMMPS shared library be consistent (built from the same source code files) in order for this to work. If the two have been built at different times using different source files, problems may occur.  

Another limitation of calling back to Python from the LAMMPS module using the python command in a LAMMPS input is that both, the Python interpreter and LAMMPS, must be linked to the same Python runtime as a shared library. If the Python interpreter is linked to Python statically (which seems to happen with Conda) then loading the shared LAMMPS library will create a second python “main” module that hides the one from the Python interpreter and all previous defined function and global variables will become invisible.  

# 1.83.5 Related commands  

shell, variable, fix python/invoke  

# 1.83.6 Default  

none  

# 1.84 quit command  

# 1.84.1 Syntax  

status $=$ numerical exit status (optional)  

# 1.84.2 Examples  

<html><body><table><tr><td>quit</td></tr><tr><td>if "$n > 10000" then "quit 1"</td></tr></table></body></html>  

# 1.84.3 Description  

This command causes LAMMPS to exit, after shutting down all output cleanly.  

It can be used as a debug statement in an input script, to terminate the script at some intermediate point.  

It can also be used as an invoked command inside the “then” or “else” portion of an $i f$ command.  

The optional status argument is an integer which signals the return status to a program calling LAMMPS. A return status of 0 usually indicates success. A status $\mathrel{\mathop:}=0$ is failure, where the specified value can be used to distinguish the kind of error, e.g. where in the input script the quit was invoked. If not specified, a status of 0 is returned.  

# 1.84.4 Restrictions  

none  

# 1.84. quit command  

# 1.84.5 Related commands  

if  

# 1.84.6 Default  

none  

# 1.85 read_data command  

# 1.85.1 Syntax  

read_data file keyword args ...  

• file $=$ name of data file to read in • zero or more keyword/arg pairs may be appended  

• keyword $=$ add or offset or shift or extra/atom/types or extra/bond/types or extra/angle/types or extra/dihedral/types or extra/improper/types or extra/bond/per/atom or extra/angle/per/atom or extra/dihedral/per/atom or extra/improper/per/atom or extra/special/per/atom or group or nocoeff or fix  

add arg $=$ append or IDoffset or IDoffset MOLoffset or merge   
append $=$ add new atoms with atom IDs appended to current IDs IDoffset $=$ add new atoms with atom IDs having IDoffset added MOLoffset $=$ add new atoms with molecule IDs having MOLoffset added (only when molecule IDs␣   
$\hookrightarrow$ are enabled)   
merge = add new atoms with their atom IDs (and molecule IDs) unchanged   
offset args = toff boff aoff doff ioff toff = offset to add to atom types   
boff = offset to add to bond types aoff = offset to add to angle types doff = offset to add to dihedral types ioff = offset to add to improper types   
shift args = Sx Sy Sz Sx,Sy,Sz = distance to shift atoms when adding to system (distance units)   
extra/atom/types arg = # of extra atom types   
extra/bond/types arg = # of extra bond types   
extra/angle/types arg = # of extra angle types   
extra/dihedral/types arg = # of extra dihedral types   
extra/improper/types arg = # of extra improper types   
extra/bond/per/atom arg = leave space for this many new bonds per atom   
extra/angle/per/atom arg = leave space for this many new angles per atom   
extra/dihedral/per/atom arg = leave space for this many new dihedrals per atom   
extra/improper/per/atom arg = leave space for this many new impropers per atom   
extra/special/per/atom arg = leave space for extra 1-2,1-3,1-4 interactions per atom   
group args = groupID groupID = add atoms in data file to this group   
nocoeff = ignore force field parameters   
fix args = fix-ID header-string section-string  

fix-ID = ID of fix to process header lines and sections of data file header-string = header lines containing this string will be passed to fix section-string = section names with this string will be passed to fix  

# 1.85.2 Examples  

read_data data.lj   
read_data ../run7/data.polymer.gz   
read_data data.protein fix mycmap crossterm CMAP   
read_data data.water add append offset 3 1 1 1 1 shift 0.0 0.0 50.0   
read_data data.water add merge group solvent  

# 1.85.3 Description  

Read in a data file containing information LAMMPS needs to run a simulation. The file can be ASCII text or a gzipped text file (detected by a .gz suffix).  

This is one of 3 ways to specify the simulation box: see the create_box and read_restart and commands for alternative methods. It is also one of 3 ways to specify initial atom coordinates: see the create_atoms and read_restart and commands for alternative methods. Also see the explanation of the -restart command-line switch which can convert a restart file to a data file.  

This command can be used multiple times to add new atoms and their properties to an existing system by using the add, offset, and shift keywords. However, it is important to understand that several system parameters, like the number of types of different kinds and per atom settings are locked in after the first read_data command, which means that no type ID (including its offset) may have a larger value when processing additional data files than what is set by the first data file and the corresponding read_data command options. See more details on this situation below, which includes the use case for the extra keywords.  

The group keyword adds all the atoms in the data file to the specified group-ID. The group will be created if it does not already exist. This is useful if you are reading multiple data files and wish to put sets of atoms into different groups so they can be operated on later. E.g. a group of added atoms can be moved to new positions via the displace_atoms command. Note that atoms read from the data file are also always added to the “all” group. The group command discusses atom groups, as used in LAMMPS.  

The nocoeff keyword tells read_data to ignore force field parameters. The various Coeff sections are still read and have to have the correct number of lines, but they are not applied. This also allows to read a data file without having any pair, bond, angle, dihedral or improper styles defined, or to read a data file for a different force field.  

The use of the fix keyword is discussed below.  

# 1.85.4 Reading multiple data files  

The read_data command can be used multiple times with the same or different data files to build up a complex system from components contained in individual data files. For example one data file could contain fluid in a confined domain; a second could contain wall atoms, and the second file could be read a third time to create a wall on the other side of the fluid. The third set of atoms could be rotated to an opposing direction using the displace_atoms command, after the third read_data command is used.  

The add, offset, shift, extra, and group keywords are useful in this context.  

If a simulation box does not yet exist, the add keyword cannot be used; the read_data command is being used for the first time. If a simulation box does exist, due to using the create_box command, or a previous read_data command, then the add keyword must be used.  

# Note  

If the first read_data command defined an orthogonal or restricted triclinic or general triclinic simulation box (see the sub-section below on header keywords), then subsequent data files must define the same kind of simulation box.  

For orthogonal boxes, the new box can be a different size; see the next Note. For a restricted triclinic box, the 3 new tilt factors (“xy xz yz” keyword) must have the same values as in the original data file. For a general triclinic box, the new avec, bvec, cvec, and “abc origin” keywords must have the same values in the original data file. files. Also the shift keyword cannot be used in subsequent read_data commands for a general triclinic box.  

![](images/93ca64080efeadc7bd2c3024f84623f2adf7e9d36c41a2572bbc8c3762815f29.jpg)  

# Note  

For orthogonal boxes, the simulation box size in the new data file will be merged with the existing simulation box to create a large enough box in each dimension to contain both the existing and new atoms. Each box dimension never shrinks due to this merge operation, it only stays the same or grows. Care must be used if you are growing the existing simulation box in a periodic dimension. If there are existing atoms with bonds that straddle that periodic boundary, then the atoms may become far apart if the box size grows. This will separate the atoms in the bond, which can lead to “lost” bond atoms or bad dynamics.  

The three choices for the add argument affect how the atom IDs and molecule IDs of atoms in the data file are treated.  

If append is specified, atoms in the data file are added to the current system, with their atom IDs reset so that an atom-ID $\mathbf{\Gamma}=\mathbf{M}$ in the data file becomes atom- $\cdot\mathrm{ID}=\mathrm{N}{+}\mathrm{M}$ , where N is the largest atom ID in the current system. This rule is applied to all occurrences of atom IDs in the data file, e.g. in the Velocity or Bonds section. This is also done for molecule IDs, if the atom style does support molecule IDs or they are enabled via fix property/atom.  

If IDoffset is specified, then IDoffset is a numeric value is given, e.g. 1000, so that an atom- $\mathbf{\nabla}\cdot\mathrm{ID}=\mathbf{M}$ in the data file becomes atom- $\mathrm{ID}=1000\substack{+\mathbf{M}}$ . For systems with enabled molecule IDs, another numerical argument MOLoffset is required representing the equivalent offset for molecule IDs.  

If merge is specified, the data file atoms are added to the current system without changing their IDs. They are assumed to merge (without duplication) with the currently defined atoms. It is up to you to ensure there are no multiply defined atom IDs, as LAMMPS only performs an incomplete check that this is the case by ensuring the resulting max atom-ID $>=$ the number of atoms. For molecule IDs, there is no check done at all.  

The offset and shift keywords can only be used if the add keyword is also specified.  

The offset keyword adds the specified offset values to the atom types, bond types, angle types, dihedral types, and improper types as they are read from the data file. E.g. if $\mathrm{\Delta}t o f=2$ , and the file uses atom types 1,2,3, then the added atoms will have atom types 3,4,5. These offsets apply to all occurrences of types in the data file, e.g. for the Atoms or Masses or Pair Coeffs or Bond Coeffs sections. This makes it easy to use atoms and molecules and their attributes from a data file in different simulations, where you want their types (atom, bond, angle, etc) to be different depending on what other types already exist. All five offset values must be specified, but individual values will be ignored if the data file does not use that attribute (e.g. no bonds).  

![](images/4b90ffbc9b5271007e731e06adbff0c21a2023ebbe3f35379f88c0a587b77ef7.jpg)  

# Note  

Offsets are ignored on lines using type labels, as the type labels will determine the actual types directly depending on the current labelmap settings.  

The shift keyword can be used to specify an (Sx, Sy, Sz) displacement applied to the coordinates of each atom. Sz must be 0.0 for a 2d simulation. This is a mechanism for adding structured collections of atoms at different locations within the simulation box, to build up a complex geometry. It is up to you to ensure atoms do not end up overlapping unphysically which would lead to bad dynamics. Note that the displace_atoms command can be used to move a subset of atoms after they have been read from a data file. Likewise, the delete_atoms command can be used to remove overlapping atoms. Note that the shift values (Sx, Sy, Sz) are also added to the simulation box information (xlo, xhi, ylo, yhi, zlo, zhi) in the data file to shift its boundaries. E.g. xlo_new $=\mathrm{xlo}+\mathrm{Sx}$ , xhi_new $=\mathrm{xhi}+\mathrm{Sx}$ .  

The extra keywords can only be used the first time the read_data command is used. They are useful if you intend to add new atom, bond, angle, etc types later with additional read_data commands. This is because the maximum number of allowed atom, bond, angle, etc types is set by LAMMPS when the system is first initialized. If you do not use the extra keywords, then the number of these types will be limited to what appears in the first data file you read. For example, if the first data file is a solid substrate of Si, it will likely specify a single atom type. If you read a second data file with a different material (water molecules) that sit on top of the substrate, you will want to use different atom types for those atoms. You can only do this if you set the extra/atom/types keyword to a sufficiently large value when reading the substrate data file. Note that use of the extra keywords also allows each data file to contain sections like Masses or Pair Coeffs or Bond Coeffs which are sized appropriately for the number of types in that data file. If the offset keyword is used appropriately when each data file is read, the values in those sections will be stored correctly in the larger data structures allocated by the use of the extra keywords. E.g. the substrate file can list mass and pair coefficients for type 1 silicon atoms. The water file can list mass and pair coefficients for type 1 and type 2 hydrogen and oxygen atoms. Use of the extra and offset keywords will store those mass and pair coefficient values appropriately in data structures that allow for 3 atom types (Si, H, O). Of course, you would still need to specify coefficients for H/Si and O/Si interactions in your input script to have a complete pairwise interaction model.  

An alternative to using the extra keywords with the read_data command, is to use the create_box command to initialize the simulation box and all the various type limits you need via its extra keywords. Then use the read_data command one or more times to populate the system with atoms, bonds, angles, etc, using the offset keyword if desired to alter types used in the various data files you read.  

# 1.85.5 Format of a data file  

The structure of the data file is important, though many settings and sections are optional or can come in any order.   
See the examples directory for sample data files for different problems.  

The file will be read line by line, but there is a limit of 254 characters per line and characters beyond that limit will be ignored.  

A data file has a header and a body. The header appears first. The first line of the header and thus of the data file is always skipped; it typically contains a description of the file or a comment from the software that created the file.  

Then lines are read one line at a time. Lines can have a trailing comment starting with ‘#’ that is ignored. There must be at least one blank between any valid content and the comment. If a line is blank (i.e. contains only white-space after comments are deleted), it is skipped. If the line contains a header keyword, the corresponding value(s) is/are read from the line. A line that is not blank and does not contain a header keyword begins the body of the file.  

The body of the file contains zero or more sections. The first line of a section has only a keyword. This line can have a trailing comment starting with ‘#’ that is either ignored or can be used to check for a style match, as described below. There must be a blank between the keyword and any comment. The next line is always skipped. The remaining lines of the section contain values. The number of lines depends on the section keyword as described below. Zero or more blank lines can be used between sections. Sections can appear in any order, with a few exceptions as noted below.  

The keyword fix can be used one or more times. Each usage specifies a fix that will be used to process a specific portion of the data file. Any header line containing header-string and any section that is an exact match to section-string will be passed to the specified fix. See the fix property/atom command for an example of a fix that operates in this manner. The doc page for the fix defines the syntax of the header line(s) and section that it reads from the data file. Note that the header-string can be specified as NULL, in which case no header lines are passed to the fix. This means the fix can infer the length of its Section from standard header settings, such as the number of atoms. Also the section-string may be specified as NULL, and in that case the fix ID is used as section name.  

The formatting of individual lines in the data file (indentation, spacing between words and numbers) is not important except that header and section keywords (e.g. atoms, xlo xhi, Masses, Bond Coeffs) must be capitalized as shown and cannot have extra white-space between their words - e.g. two spaces or a tab between the 2 words in “xlo xhi” or the 2 words in “Bond Coeffs”, is not valid.  

# 1.85.6 Format of the header of a data file  

These are the recognized header keywords. Header lines can come in any order. Each keyword takes a single value unless noted in this list. The value(s) are read from the beginning of the line. Thus the keyword atoms should be in a line like “1000 atoms”; the keyword ylo yhi should be in a line like “-10.0 10.0 ylo yhi”; the keyword xy xz yz should be in a line like “0.0 5.0 6.0 xy xz yz”.  

All these settings have a default value of 0, except for the simulation box size settings; their defaults are explained below. A keyword line need only appear if its value is different than the default.  

• atoms $=\#$ of atoms in system   
• $b o n d s=\#$ of bonds in system   
• angles $=$ # of angles in system   
• dihedrals $=\#$ of dihedrals in system   
• impropers $=\#$ of impropers in system   
• atom $t y p e s=\#$ of atom types in system   
• bond types $=\#$ of bond types in system   
• angle types $=\#$ of angle types in system   
• dihedral types $=$ # of dihedral types in system   
• improper types $=\#$ of improper types in system   
• extra bond per atom $=$ leave space for this many new bonds per atom (deprecated, use extra/bond/per/atom keyword)   
• extra angle per atom $=$ leave space for this many new angles per atom (deprecated, use extra/angle/per/atom keyword)   
• extra dihedral per atom $=$ leave space for this many new dihedrals per atom (deprecated, use extra/dihedral/per/atom keyword)   
• extra improper per atom $=$ leave space for this many new impropers per atom (deprecated, use extra/improper/per/atom keyword)   
• extra special per atom $=$ leave space for this many new special bonds per atom (deprecated, use extra/special/per/atom keyword)   
• ellipsoids $=\#$ of ellipsoids in system   
• lines $=\#$ of line segments in system   
• triangles $=\#$ of triangles in system   
• bodies $=\#$ of bodies in system   
• xlo xhi $=$ simulation box boundaries in x dimension (2 values)   
• ylo yhi $=$ simulation box boundaries in y dimension (2 values)   
• zlo zhi $=$ simulation box boundaries in z dimension (2 values)   
• $\begin{array}{r}{(y x z y z=}\end{array}$ simulation box tilt factors for triclinic system (3 values)   
• $a\nu e c=$ first edge vector of a general triclinic simulation box (3 values)   
• bvec $=$ second edge vector of a general triclinic simulation box (3 values)   
• $c{\nu}e c=$ third edge vector of a general triclinic simulation box (3 values)   
• abc origin $=$ origin of a general triclinic simulation box (3 values)  

# 1.85.7 Header specification of the simulation box size and shape  

The last 8 keywords in the list of header keywords are for simulation boxes of 3 kinds which LAMMPS supports:  

• orthogonal box $=$ faces are perpendicular to the xyz coordinate axes • restricted triclinic $\mathbf{box}=\mathbf{a}$ parallelepiped defined by 3 edge vectors oriented in a constrained manner • general triclinic box ${\mathbf{\tau}}={\mathbf{a}}$ parallelepiped defined by 3 arbitrary edge vectors  

For restricted and general triclinic boxes, see the Howto_triclinic doc page for a fuller description than is given here.  

The units of the values for all 8 keywords in in distance units; see the units command for details.  

For all 3 kinds of simulation boxes, the system may be periodic or non-periodic in any dimension; see the boundary command for details.  

When the simulation box is created by the read_data command, it is also partitioned into a regular 3d grid of subdomains, one per processor, based on the number of processors being used and the settings of the processors command. For each kind of simulation box the subdomains have the same shape as the simulation box, i.e. smaller orthogonal bricks for orthogonal boxes, smaller parallelepipeds for triclinic boxes. The partitioning can later be changed by the balance or fix balance commands.  

For an orthogonal box, only the xlo xhi, ylo yhi, zlo zhi keywords are used. They define the extent of the simulation box in each dimension so that the resulting edge vectors of an orthogonal box are:  

$$
\begin{array}{r}{\mathbf{\dot{\Pi}}\cdot\mathbf{\textbf{A}}=(\mathrm{xhi}-\mathrm{xlo},0,0)}\ {\mathbf{\dot{\Pi}}\cdot\mathbf{\textbf{B}}=(0,\mathrm{yhi}-\mathrm{ylo},0)}\ {\mathbf{\Pi}\cdot\mathbf{\textbf{C}}=(0,0,\mathrm{zhi}-\mathrm{zlo})}\end{array}
$$  

The origin (lower left corner) of the orthogonal box is at (xlo,ylo,zlo). The default values for these 3 keywords are -0.5 and 0.5 for each lo/hi pair. For a 2d simulation, the zlo and zhi values must straddle zero. The default zlo/zhi values do this, so that keyword is not needed in 2d.  

For a restricted triclinic box, the xy xz yz keyword is used in addition to the xlo xhi, ylo yhi, zlo zhi keywords. The three xy,xz,yz values can be 0.0 or positive or negative, and are called “tilt factors” because they are the amount of displacement applied to edges of faces of an orthogonal box to transform it into a restricted triclinic parallelepiped.  

The Howto_triclinic doc page discusses the tilt factors in detail and explains that the resulting edge vectors of a restricted triclinic box are:  

$$
\begin{array}{r l}&{\bullet\mathbf{\deltaA}=(\mathrm{xhi-xlo},0,0)}\ &{\bullet\mathbf{\deltaB}=(\mathrm{xy},\mathrm{yhi-ylo},0)}\ &{\bullet\mathbf{\deltaC}=(\mathrm{xz},\mathrm{yz},\mathrm{zhi-zlo})}\end{array}
$$  

This restricted form of edge vectors requires that A be in the direction of the $\mathbf{X}$ -axis, $\mathbf{B}$ be in the xy plane with its y-component in the $+\mathrm{y}$ direction, and C have its z-component in the ${+\mathbf{Z}}$ direction. The origin (lower left corner) of the restricted triclinic box is at (xlo,ylo,zlo).  

For a 2d simulation, the zlo and zhi values must straddle zero. The default zlo/zhi values do this, so that keyword is not needed in 2d. The xz and yz values must also be zero in 2d. The shape of the 2d restricted triclinic simulation box is effectively a parallelogram.  

# Note  

When a restricted triclinic box is used, the simulation domain should normally be periodic in any dimensions that tilt is applied to, which is given by the second dimension of the tilt factor (e.g. y for xy tilt). This is so that pairs of atoms interacting across that boundary will have one of them shifted by the tilt factor. Periodicity is set by the boundary command which also describes the shifting by the tilt factor. For example, if the xy tilt factor is non-zero, then the y dimension should be periodic. Similarly, the z dimension should be periodic if xz or yz is non-zero. LAMMPS does not require this periodicity, but you may lose atoms if this is not the case.  

# Note  

Normally, the specified tilt factors (xy,xz,yz) should not skew the simulation box by more than half the distance of the corresponding parallel box length for computational efficiency. For example, if $x_{\mathrm{lo}}=2$ and $x_{\mathrm{hi}}=12$ , then the $x$ box length is 10 and the xy tilt factor should be between $^{-5}$ and 5. LAMMPS will issue a warning if this is not the case. See the last sub-section of the Howto_triclinic doc page for more details.  

![](images/25de050fe6ff8e857d3fb3f9b2b4a476aba9e2538e27e8e562edf06649793e85.jpg)  

# Note  

If a simulation box is initially orthogonal, but will tilt during a simulation, e.g. via the fix deform command, then the box should be defined as restricted triclinic with all 3 tilt factors $=0.0$ . Alternatively, the change box command can be used to convert an orthogonal box to a restricted triclinic box.  

For a general triclinic box, the avec, bvec, cvec, and abc origin keywords are used. The xlo xhi, ylo yhi, zlo zhi, and xy xz yz keywords are NOT used. The first 3 keywords define the 3 edge vectors A, B, C of the general triclinic box. They can be arbitrary vectors so long as they are distinct, non-zero, and not co-planar. They must also define a right-handed system such that $\left(\mathbf{A}\thinspace\mathbf{X}\thinspace\mathbf{B}\right)$ points in the direction of C. Note that a left-handed system can be converted to a right-handed system by simply swapping the order of any pair of the A, B, C vectors. The origin of the box (origin of the 3 edge vectors) is set by the abc origin keyword.  

The default values for these 4 keywords are as follows:  

${\begin{array}{r l}&{\bullet\operatorname{avec}=(1,0,0)}\ &{\bullet\operatorname{bvec}=(0,1,0)}\ &{\bullet\operatorname{cvec}=(0,0,1)}\end{array}}$ • abc origin $\mathbf{\Omega}=(0,0,0)$ for 3d, (0,0,-0.5) for 2d  

For 2d simulations, $c\nu e c=(0,0,1)$ is required, and the 3rd value of abc origin must be -0.5. These are the default values, so the cvec keyword is not needed in 2d.  

# Note  

LAMMPS allows specification of general triclinic simulation boxes as a convenience for users who may be converting data from solid-state crystallographic representations or from DFT codes for input to LAMMPS. However, as explained on the Howto_triclinic doc page, internally, LAMMPS only uses restricted triclinic simulation boxes. This means the box and per-atom information (e.g. coordinates, velocities) in the data file are converted (rotated) from general to restricted triclinic form when the file is read. Other sections of the data file must also list their per-atom data appropriately if vector quantities are specified. This requirement is explained below for the relevant sections. The Howto_triclinic doc page also discusses other LAMMPS commands which can input/output general triclinic representations of the simulation box and per-atom data.  

The following explanations apply to all 3 kinds of simulation boxes: orthogonal, restricted triclinic, and general triclinic.  

If the system is periodic (in a dimension), then atom coordinates can be outside the bounds (in that dimension); they will be remapped (in a periodic sense) back inside the box. For triclinic boxes, periodicity in x,y,z refers to the faces of the parallelepiped defined by the A, $^{**}\mathrm{{B}}^{**}=1$ , $^{**}C^{***}$ edge vectors of the simulation box. See the boundary command doc page for a fuller discussion.  

Note that if the add option is being used to add atoms to a simulation box that already exists, this periodic remapping will be performed using simulation box bounds that are the union of the existing box and the box boundaries in the new data file.  

If the system is non-periodic (in a dimension), then an image flag for that direction has no meaning, since there cannot be periodic images without periodicity and the data file is therefore - technically speaking - invalid. This situation would happen when a data file was written with periodic boundaries and then read back for non-periodic boundaries. Accepting a non-zero image flag can lead to unexpected results for any operations and computations in LAMMPS that internally use unwrapped coordinates (for example computing the center of mass of a group of atoms). Thus all non-zero image flags for non-periodic dimensions will be be reset to zero on reading the data file and LAMMPS will print a warning message, if that happens. This is equivalent to wrapping atoms individually back into the principal unit cell in that direction. This operation is equivalent to the behavior of the change_box command when used to change periodicity.  

If those atoms with non-zero image flags are involved in bonded interactions, this reset can lead to undesired changes, when the image flag values differ between the atoms, i.e. the bonded interaction straddles domain boundaries. For example a bond can become stretched across the unit cell if one of its atoms is wrapped to one side of the cell and the second atom to the other. In those cases the data file needs to be pre-processed externally to become valid again. This can be done by first unwrapping coordinates and then wrapping entire molecules instead of individual atoms back into the principal simulation cell and finally expanding the cell dimensions in the non-periodic direction as needed, so that the image flag would be zero.  

# $\Theta$ Note  

If the system is non-periodic (in a dimension), then all atoms in the data file must have coordinates (in that dimension) that are “greater than or equal to” the lo value and “less than or equal to” the hi value. If the non-periodic dimension is of style “fixed” (see the boundary command), then the atom coords must be strictly “less than” the hi value, due to the way LAMMPS assign atoms to processors. Note that you should not make the lo/hi values radically smaller/larger than the extent of the atoms. For example, if atoms extend from 0 to 50, you should not specify the box bounds as -10000 and 10000 unless you also use the processors command. This is because LAMMPS uses the specified box size to layout the 3d grid of processors. A huge (mostly empty) box will be sub-optimal for performance when using “fixed” boundary conditions (see the boundary command). When using “shrink-wrap” boundary conditions (see the boundary command), a huge (mostly empty) box may cause a parallel simulation to lose atoms when LAMMPS shrink-wraps the box around the atoms. The read_data command will generate an error in this case.  

# 1.85.8 Meaning of other header keywords  

The “extra bond per atom” setting (angle, dihedral, improper) is only needed if new bonds (angles, dihedrals, impropers) will be added to the system when a simulation runs, e.g. by using the fix bond/create command. Using this header flag is deprecated; please use the extra/bond/per/atom keyword (and correspondingly for angles, dihedrals and impropers) in the read_data command instead. Either will pre-allocate space in LAMMPS data structures for storing the new bonds (angles, dihedrals, impropers).  

The “extra special per atom” setting is typically only needed if new bonds/angles/etc will be added to the system, e.g. by using the fix bond/create command. Or if entire new molecules will be added to the system, e.g. by using the $f\alpha$ deposit or fix pour commands, which will have more special 1-2,1-3,1-4 neighbors than any other molecules defined in the data file. Using this header flag is deprecated; please use the extra/special/per/atom keyword instead. Using this setting will pre-allocate space in the LAMMPS data structures for storing these neighbors. See the special_bonds and molecule doc pages for more discussion of 1-2,1-3,1-4 neighbors.  

![](images/648510e9ccd4911b67f893990595505b879ded7ae9616255bad5f241cb387bb2.jpg)  

# Note  

All of the “extra” settings are only applied in the first data file read and when no simulation box has yet been created; as soon as the simulation box is created (and read_data implies that), these settings are locked and cannot be changed anymore. Please see the description of the add keyword above for reading multiple data files. If they appear in later data files, they are ignored.  

The “ellipsoids” and “lines” and “triangles” and “bodies” settings are only used with atom_style ellipsoid or line or tri or body and specify how many of the atoms are finite-size ellipsoids or lines or triangles or bodies; the remainder are point particles. See the discussion of ellipsoidflag and the Ellipsoids section below. See the discussion of lineflag and the Lines section below. See the discussion of triangleflag and the Triangles section below. See the discussion of bodyflag and the Bodies section below.  

# Note  

For atom_style template, the molecular topology (bonds,angles,etc) is contained in the molecule templates read-in by the molecule command. This means you cannot set the bonds, angles, etc header keywords in the data file, nor can you define Bonds, Angles, etc sections as discussed below. You can set the bond types, angle types, etc header keywords, though it is not necessary. If specified, they must match the maximum values defined in any of the template molecules.  

# 1.85.9 Format of the body of a data file  

These are the section keywords for the body of the file.  

• Atoms, Velocities, Masses, Ellipsoids, Lines, Triangles, Bodies $=$ atom-property sections   
• Bonds, Angles, Dihedrals, Impropers $=$ molecular topology sections   
• Atom Type Labels, Bond Type Labels, Angle Type Labels, Dihedral Type Labels, Improper Type Labels $=$ type label maps   
• Pair Coeffs, PairIJ Coeffs, Bond Coeffs, Angle Coeffs, Dihedral Coeffs, Improper Coeffs $=$ force field sections   
• BondBond Coeffs, BondAngle Coeffs, MiddleBondTorsion Coeffs, EndBondTorsion Coeffs, AngleTorsion Coeffs, AngleAngleTorsion Coeffs, BondBond13 Coeffs, AngleAngle Coeffs $=$ class 2 force field sections  

These keywords will check an appended comment for a match with the currently defined style:  

• Atoms, Pair Coeffs, PairIJ Coeffs, Bond Coeffs, Angle Coeffs, Dihedral Coeffs, Improper Coeffs  

For example, these lines:  

Atoms # sphere Pair Coeffs # lj/cut  

will check if the currently-defined atom_style is sphere, and the current pair_style is lj/cut. If not, LAMMPS will issue a warning to indicate that the data file section likely does not contain the correct number or type of parameters expected for the currently-defined style.  

Each section is listed below in alphabetic order. The format of each section is described including the number of lines it must contain and rules (if any) for where it can appear in the data file.  

Any individual line in the various sections can have a trailing comment starting with “#” for annotation purposes. There must be at least one blank between valid content and the comment. E.g. in the Atoms section:  

10 1 17 -1.0 10.0 5.0 6.0 # salt ion  

Angle Coeffs section:  

• one line per angle type • line syntax: ID coeffs  

ID = angle type (1-N) coeffs $=$ list of coeffs  

• example:  

The number and meaning of the coefficients are specific to the defined angle style. See the angle_style and angle_coeff commands for details. Coefficients can also be set via the angle_coeff command in the input script.  

Angle Type Labels section:  

• one line per angle type • line syntax: ID label  

<html><body><table><tr><td>ID = angle type (1-N)</td></tr><tr><td>label = alphanumeric type label</td></tr></table></body></html>  

Define alphanumeric type labels for each numeric angle type. These can be used in the Angles section in place of a numeric type, but only if the this section appears before the Angles section.  

See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

AngleAngle Coeffs section:  

• one line per improper type   
• line syntax: ID coeffs ID = improper type (1-N) coeffs $=$ list of coeffs (see improper_coeff)  

# AngleAngleTorsion Coeffs section:  

• one line per dihedral type  

# 1.85. read_data command  

# LAMMPS Documentation, Release 4Feb2025  

• line syntax: ID coeffs $\mathrm{ID}={}$ dihedral type (1-N) coeffs $=$ list of coeffs (see dihedral_coeff)  

Angles section:  

• one line per angle • line syntax: ID type atom1 atom2 atom3  

ID = number of angle (1-Nangles) type $=$ angle type (1-Nangletype, or type label) atom1,atom2,atom3 = IDs of 1st,2nd,3rd atom in angle  

example:  

The three atoms are ordered linearly within the angle. Thus the central atom (around which the angle is computed) is the atom2 in the list. E.g. H,O,H for a water molecule. The Angles section must appear after the Atoms section.  

All values in this section must be integers (1, not 1.0). However, the type can be a numeric value or an alphanumeric label. The latter is only allowed if the type label has been defined by the labelmap command or an Angle Type Labels section earlier in the data file. See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

AngleTorsion Coeffs section:  

• one line per dihedral type   
• line syntax: ID coeffs $\mathrm{ID}={}$ dihedral type (1-N) coeffs $=$ list of coeffs (see dihedral_coeff)  

Atom Type Labels section:  

• one line per atom type • line syntax: ID label  

ID = numeric atom type (1-N) label $=$ alphanumeric type label  

Define alphanumeric type labels for each numeric atom type. These can be used in the Atoms section in place of a numeric type, but only if the Atom Type Labels section appears before the Atoms section.  

See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

Atoms section:  

• one line per atom • line syntax: depends on atom style  

An Atoms section must appear in the data file if natoms $>0$ in the header section. The atoms can be listed in any order. These are the line formats for each atom style in LAMMPS. As discussed below, each line can optionally have 3 flags (nx,ny,nz) appended to it, which indicate which image of a periodic simulation box the atom is in. These may be important to include for some kinds of analysis.  

# Note  

For orthogonal and restricted and general triclinic simulation boxes, the atom coordinates (x,y,z) listed in this section should be inside the corresponding simulation box. For restricted triclinic boxes that means the parallelepiped defined by the xlo xhi, ylo yhi, zlo zhi, and xy xz yz, keywords. For general triclinic boxes that means the parallelepiped defined by the 3 edge vectors and origin specified by the avec, bvec, cvec, and abc origin header keywords. See the discussion in the header section above about how atom coordinates outside the simulation box are (or are not) remapped to be inside the box.  

<html><body><table><tr><td>angle</td><td>atom-ID molecule-ID atom-type x y Z</td></tr><tr><td>atomic</td><td>atom-ID atom-type x y z</td></tr><tr><td>body</td><td>atom-ID atom-type bodyflag mass x y z</td></tr><tr><td>bond</td><td>atom-ID molecule-ID atom-type x y z</td></tr><tr><td>bpm/sphere</td><td>atom-ID molecule-ID atom-type diameter density x y Z</td></tr><tr><td>charge</td><td>atom-ID atom-type q x y z</td></tr><tr><td>dielectric</td><td>     z  x z  x b  </td></tr><tr><td>dipole</td><td>atom-ID atom-type q x y z mux muy muz</td></tr><tr><td>dpd</td><td>atom-ID atom-type theta x y z</td></tr><tr><td>edpd</td><td>atom-ID atom-type edpd_temp edpd_cv x y z</td></tr><tr><td>electron</td><td>atom-ID atom-type q espin eradius x y Z</td></tr><tr><td>ellipsoid</td><td>atom-ID atom-type ellipsoidflag density x y Z</td></tr><tr><td>full</td><td>atom-ID molecule-ID atom-type q x y z</td></tr><tr><td>line</td><td>atom-ID molecule-ID atom-type lineflag density x y Z</td></tr><tr><td>pdpu</td><td>atom-ID atom-type rho x y z</td></tr><tr><td>molecular</td><td>atom-ID molecule-ID atom-type x y Z</td></tr><tr><td>peri</td><td>atom-ID atom-type volume density x y Z</td></tr><tr><td>rheo</td><td>atom-ID atom-type status rho x y z</td></tr><tr><td>rheo/thermal</td><td>atom-ID atom-type status rho energy x y z</td></tr><tr><td>smd</td><td>atom-ID atom-type molecule volume mass kradius cradius xO yO z0 x y z</td></tr><tr><td>sph</td><td>atom-ID atom-type rho esph cv x y z</td></tr><tr><td>sphere</td><td>atom-ID atom-type diameter density x y z</td></tr><tr><td>spin</td><td>atom-ID atom-type x y z spx spy spz sp</td></tr><tr><td>pdp1</td><td>atom-ID atom-type x y z cc1 cc2 ... ccNspecies</td></tr><tr><td>template</td><td>atom-ID atom-type molecule-ID template-index template-atom x y z</td></tr><tr><td>tri</td><td>atom-ID molecule-ID atom-type triangleflag density x y Z</td></tr><tr><td>wavepacket</td><td>atom-ID atom-type charge espin eradius etag cs_re cs_im x y z</td></tr><tr><td>hybrid</td><td>atom-ID atom-type x y z sub-style1 sub-style2 ...</td></tr></table></body></html>  

The per-atom values have these meanings and units, listed alphabetically:  

• atom- $\mathrm{{.ID=}}$ integer ID of atom   
• atom-type $=$ type of atom (1-Ntype, or type label)   
• bodyflag $=1$ for body particles, 0 for point particles   
• $\mathrm{{ccN}=}$ chemical concentration for tDPD particles for each species (mole/volume units)   
• cradius $=$ contact radius for SMD particles (distance units)  

# 1.85. read_data command  

• cs_re,cs_im $=$ real/imaginary parts of wave packet coefficients   
• $\mathbf{cv}=$ heat capacity (need units) for SPH particles   
• density $=$ density of particle (mass/distance^3 or mass/distance $\wedge_{2}$ or mass/distance units, depending on sionality of particle)   
• diameter $=$ diameter of spherical atom (distance units)   
• edpd_temp $=$ temperature for eDPD particles (temperature units)   
• edpd_cv $=$ volumetric heat capacity for eDPD particles (energy/temperature/volume units)   
• ellipsoidflag $=1$ for ellipsoidal particles, 0 for point particles   
• eradius $=$ electron radius (or fixed-core radius)   
• esph $=$ energy (need units) for SPH particles   
• espin $=$ electron spin $(+1/-1)$ , $0=$ nuclei, $2=$ fixed-core, $3=$ pseudo-cores (i.e. ECP)   
• etag $=$ integer ID of electron that each wave packet belongs to   
• kradius $=$ kernel radius for SMD particles (distance units)   
• lineflag $=1$ for line segment particles, 0 for point or spherical particles   
• mass $=$ mass of particle (mass units)   
• molecule-ID $=$ integer ID of molecule the atom belongs to   
• mux,muy,muz $=$ components of dipole moment of atom (dipole units) (see general triclinic note below)   
• ${\bf q}={\bf\Psi}$ charge on atom (charge units)   
• rho $=$ density (need units) for SPH particles   
• $\mathrm{sp}=$ magnitude of magnetic spin of atom (Bohr magnetons)   
• spx,spy,spz $=$ components of magnetic spin of atom (unit vector) (see general triclinic note below)   
• template-atom $=$ which atom within a template molecule the atom is   
• template-index $=$ which molecule within the molecule template the atom is part of   
• theta $=$ internal temperature of a DPD particle   
• triangleflag $=1$ for triangular particles, 0 for point or spherical particles   
• volume $=$ volume of Peridynamic particle (distance^3 units)   
• $\mathbf{X},\mathbf{y},\mathbf{Z}=$ coordinates of atom (distance units)   
• $\mathbf{x}0,\mathbf{y}0,\mathbf{z}0=$ original (strain-free) coordinates of atom (distance units) (see general triclinic note below)  

The units for these quantities depend on the unit style; see the units command for details.  

For 2d simulations, the atom coordinate z must be specified as 0.0. If the data file is created by another program, then $\mathbf{Z}$ values for a 2d simulation can be within epsilon of 0.0, and LAMMPS will force them to zero.  

# Note  

If the data file defines a general triclinic box, then the following per-atom values in the list above are per-atom vectors which imply an orientation: (mux,muy,muz) and (spx,spy,spz). This means they should be specified consistent with the general triclinic box and its orientation relative to the standard x,y,z coordinate axes. For example a dipole moment vector which will be in the $+\mathbf{X}$ direction once LAMMPS converts from a general to restricted triclinic box, should be specified in the data file in the direction of the A edge vector. Likewise the (x0,y0,z0) per-atom strain-free coordinates should be inside the general triclinic simulation box as explained in the note above. See the Howto triclinic doc page for more details.  

The atom-ID is used to identify the atom throughout the simulation and in dump files. Normally, it is a unique value from 1 to Natoms for each atom. Unique values larger than Natoms can be used, but they will cause extra memory to be allocated on each processor, if an atom map array is used, but not if an atom map hash is used; see the atom_modify command for details. If an atom map is not used (e.g. an atomic system with no bonds), and you don’t care if unique atom IDs appear in dump files, then the atom-IDs can all be set to 0.  

The atom-type can be a numeric value or an alphanumeric label. The latter is only allowed if the type label has been defined by the labelmap command or an Atom Type Labels section earlier in the data file. See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

The molecule ID is a second identifier attached to an atom. Normally, it is a number from 1 to N, identifying which molecule the atom belongs to. It can be 0 if it is a non-bonded atom or if you don’t care to keep track of molecule assignments.  

The diameter specifies the size of a finite-size spherical particle. It can be set to 0.0, which means that atom is a point particle.  

The ellipsoidflag, lineflag, triangleflag, and bodyflag determine whether the particle is a finite-size ellipsoid or line or triangle or body of finite size, or whether the particle is a point particle. Additional attributes must be defined for each ellipsoid, line, triangle, or body in the corresponding Ellipsoids, Lines, Triangles, or Bodies section.  

The template-index and template-atom are only defined used by atom_style template. In this case the molecule command is used to define a molecule template which contains one or more molecules (as separate files). If an atom belongs to one of those molecules, its template-index and template-atom are both set to positive integers; if not the values are both 0. The template-index is which molecule (1 to Nmols) the atom belongs to. The template-atom is which atom (1 to Natoms) within the molecule the atom is.  

Some pair styles and fixes and computes that operate on finite-size particles allow for a mixture of finite-size and point particles. See the doc pages of individual commands for details.  

For finite-size particles, the density is used in conjunction with the particle volume to set the mass of each particle as mass $=$ density \* volume. In this context, volume can be a 3d quantity (for spheres or ellipsoids), a 2d quantity (for triangles), or a 1d quantity (for line segments). If the volume is 0.0, meaning a point particle, then the density value is used as the mass. One exception is for the body atom style, in which case the mass of each particle (body or point particle) is specified explicitly. This is because the volume of the body is unknown.  

Note that for 2d simulations of spheres, this command will treat them as spheres when converting density to mass. However, they can also be modeled as 2d discs (circles) if the set density/disc command is used to reset their mass after the read_data command is used. A disc keyword can also be used with time integration fixes, such as fix nve/sphere and fix nvt/sphere to time integrate their motion as 2d discs (not 3d spheres), by changing their moment of inertia.  

For atom_style hybrid, following the 5 initial values (ID,type,x,y,z), specific values for each sub-style must be listed. The order of the sub-styles is the same as they were listed in the atom_style command. The specific values for each sub-style are those that are not the 5 standard ones (ID,type,x,y,z). For example, for the “charge” sub-style, a “q” value would appear. For the “full” sub-style, a “molecule-ID” and “q” would appear. These are listed in the same order they appear as listed above. Thus if  

with the full sub-style fields.  

atom-ID atom-type x y z q mux muy myz molecule-ID  

Atom lines specify the (x,y,z) coordinates of atoms. These can be inside or outside the simulation box. When the data file is read, LAMMPS wraps coordinates outside the box back into the box for dimensions that are periodic. As discussed above, if an atom is outside the box in a non-periodic dimension, it will be lost.  

LAMMPS always stores atom coordinates as values which are inside the simulation box. It also stores 3 flags which indicate which image of the simulation box (in each dimension) the atom would be in if its coordinates were unwrapped across periodic boundaries. An image flag of 0 means the atom is still inside the box when unwrapped. A value of 2 means add 2 box lengths to get the unwrapped coordinate. A value of -1 means subtract 1 box length to get the unwrapped coordinate. LAMMPS updates these flags as atoms cross periodic boundaries during the simulation. The dump command can output atom coordinates in wrapped or unwrapped form, as well as the 3 image flags.  

In the data file, atom lines (all lines or none of them) can optionally list 3 trailing integer values (nx,ny,nz), which are used to initialize the atom’s image flags. If nx,ny,nz values are not listed in the data file, LAMMPS initializes them to 0. Note that the image flags are immediately updated if an atom’s coordinates need to wrapped back into the simulation box.  

It is only important to set image flags correctly in a data file if a simulation model relies on unwrapped coordinates for some calculation; otherwise they can be left unspecified. Examples of LAMMPS commands that use unwrapped coordinates internally are as follows:  

• Atoms in a rigid body (see fix rigid, fix rigid/small) must have consistent image flags, so that when the atoms are unwrapped, they are near each other, i.e. as a single body.   
• If the replicate command is used to generate a larger system, image flags must be consistent for bonded atoms when the bond crosses a periodic boundary. I.e. the values of the image flags should be different by 1 (in the appropriate dimension) for the two atoms in such a bond.   
• If you plan to dump image flags and perform post-analysis that will unwrap atom coordinates, it may be important that a continued run (restarted from a data file) begins with image flags that are consistent with the previous run.  

# Note  

If your system is an infinite periodic crystal with bonds then it is impossible to have fully consistent image flags.   
This is because some bonds will cross periodic boundaries and connect two atoms with the same image flag.  

Atom velocities and other atom quantities not defined above are set to 0.0 when the Atoms section is read. Velocities can be set later by a Velocities section in the data file or by a velocity or set command in the input script.  

Bodies section:  

• one or more lines per body • first line syntax: atom-ID Ninteger Ndouble $\widetilde{\mathrm{Ninteger}=\#}$ of integer quantities for this particle $\mathrm{Ndouble}=\#$ of floating-point quantities for this particle • 0 or more integer lines with total of Ninteger values • 0 or more double lines with total of Ndouble values • example:  

<html><body><table><tr><td>1236</td></tr><tr><td>232</td></tr><tr><td>1.0 2.0 3.0 1.0 2.0 4.0</td></tr></table></body></html>  

• example:  

<html><body><table><tr><td>12014</td></tr><tr><td>1.0 2.0 3.0 1.0 2.0 4.0 1.0</td></tr><tr><td>2.0 3.0 1.0 2.0 4.0 4.0 2.0</td></tr></table></body></html>  

The Bodies section must appear if atom_style body is used and any atoms listed in the Atoms section have a bodyflag $=1$ . The number of bodies should be specified in the header section via the “bodies” keyword.  

Each body can have a variable number of integer and/or floating-point values. The number and meaning of the values is defined by the body style, as described in the Howto body doc page. The body style is given as an argument to the atom_style body command.  

The Ninteger and Ndouble values determine how many integer and floating-point values are specified for this particle. Ninteger and Ndouble can be as large as needed and can be different for every body. Integer values are then listed next on subsequent lines. Lines are read one at a time until Ninteger values are read. Floating-point values follow on subsequent lines, Again lines are read one at a time until Ndouble values are read. Note that if there are no values of a particular type, no lines appear for that type.  

The Bodies section must appear after the Atoms section.  

Bond Coeffs section:  

• one line per bond type • line syntax: ID coeffs  

<html><body><table><tr><td>ID = bond type (1-N) coeffs = list of coeffs</td></tr></table></body></html>  

• example:  

BondAngle Coeffs section:  

• one line per angle type   
• line syntax: ID coeffs $\mathrm{ID}={}$ angle type (1-N) coeffs $=$ list of coeffs (see class 2 section of angle_coeff)  

BondBond Coeffs section:  

• one line per angle type   
• line syntax: ID coeffs $\mathrm{ID}={}$ angle type (1-N) coeffs $=$ list of coeffs (see class 2 section of angle_coeff)  

BondBond13 Coeffs section:  

• one line per dihedral type   
• line syntax: ID coeffs $\mathrm{ID}={}$ dihedral type (1-N) coeffs $=$ list of coeffs (see class 2 section of dihedral_coeff)  

Bonds section:  

• one line per bond • line syntax: ID type atom1 atom2  

ID = bond number (1-Nbonds) type $=$ bond type (1-Nbondtype, or type label) atom1,atom2 = IDs of 1st,2nd atom in bond  

• example:  

• example:  

The number and meaning of the coefficients are specific to the defined dihedral style. See the dihedral_style and dihedral_coeff commands for details. Coefficients can also be set via the dihedral_coeff command in the input script.  

Dihedral Type Labels section:  

• one line per dihedral type • line syntax: ID label  

ID = dihedral type (1-N) label $=$ alphanumeric type label  

Define alphanumeric type labels for each numeric dihedral type. These can be used in the Dihedrals section in place of a numeric type, but only if the this section appears before the Dihedrals section.  

See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

Dihedrals section:  

• one line per dihedral • line syntax: ID type atom1 atom2 atom3 atom4  

ID = number of dihedral (1-Ndihedrals) type $=$ dihedral type (1-Ndihedraltype, or type label) atom1,atom2,atom3,atom4 = IDs of 1st,2nd,3rd,4th atom in dihedral  

• example:  

The Ellipsoids section must appear if atom_style ellipsoid is used and any atoms are listed in the Atoms section with an ellipsoidflag $=1$ . The number of ellipsoids should be specified in the header section via the “ellipsoids” keyword.  

The 3 shape values specify the 3 diameters or aspect ratios of a finite-size ellipsoidal particle, when it is oriented along the 3 coordinate axes. They must all be non-zero values.  

The values quatw, quati, quatj, and quatk set the orientation of the atom as a quaternion (4-vector). Note that the shape attributes specify the aspect ratios of an ellipsoidal particle, which is oriented by default with its $\mathbf{X}$ -axis along the simulation box’s x-axis, and similarly for y and z. If this body is rotated (via the right-hand rule) by an angle theta around a unit vector (a,b,c), then the quaternion that represents its new orientation is given by (cos(theta/2), a\*sin(theta/2), b\*sin(theta/2), c\*sin(theta/2)). These 4 components are quatw, quati, quatj, and quatk as specified above. LAMMPS normalizes each atom’s quaternion in case (a,b,c) is not specified as a unit vector.  

If the data file defines a general triclinic box, then the quaternion for each ellipsoid should be specified for its orientation relative to the standard x,y,z coordinate axes. When the system is converted to a restricted triclinic box, the ellipsoid quaternions will be altered to reflect the new orientation of the ellipsoid.  

The Ellipsoids section must appear after the Atoms section.  

EndBondTorsion Coeffs section:  

• one line per dihedral type   
• line syntax: ID coeffs $\mathrm{ID}={}$ dihedral type (1-N) coeffs $=$ list of coeffs (see class 2 section of dihedral_coeff)  

Improper Coeffs section:  

• one line per improper type • line syntax: ID coeffs  

ID = improper type (1-N) coeffs $=$ list of coeffs  

• example:  

Define alphanumeric type labels for each numeric improper type. These can be used in the Impropers section in place of a numeric type, but only if the this section appears before the Impropers section.  

See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

Impropers section:  

• one line per improper • line syntax: ID type atom1 atom2 atom3 atom4  

ID = number of improper (1-Nimpropers) type $=$ improper type (1-Nimpropertype, or type label) atom1,atom2,atom3,atom4 = IDs of 1st,2nd,3rd,4th atom in improper  

• example:  

The ordering of the 4 atoms determines the definition of the improper angle used in the formula for each improper style. See the doc pages for individual styles for details.  

The Impropers section must appear after the Atoms section.  

All values in this section must be integers (1, not 1.0). However, the type can be a numeric value or an alphanumeric label. The latter is only allowed if the type label has been defined by the labelmap command or a Improper Type Labels section earlier in the data file. See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

Lines section:  

• one line per line segment • line syntax: atom-ID x1 y1 x2 y2  

atom $-\mathrm{ID}=\mathrm{ID}$ of atom which is a line segment   
$\mathrm{{x}1,\mathrm{{y}1}=1\mathrm{{st}}}$ end point   
$\mathrm{{x}2,\mathrm{{y}2=2n d}}$ end point  

• example:  

The Lines section must appear after the Atoms section.  

Masses section:  

• one line per atom type • line syntax: ID mass  

ID = atom type (1-N or atom type label) mass $=$ mass value  

• example:  

This defines the mass of each atom type. This can also be set via the mass command in the input script. This section cannot be used for atom styles that define a mass for individual atoms - e.g. atom_style sphere.  

Using type labels instead of atom type numbers is only allowed if the type label has been defined by the labelmap command or a Atom Type Labels section earlier in the data file. See the Howto type labels doc page for the allowed syntax of type labels and a general discussion of how type labels can be used.  

MiddleBondTorsion Coeffs section:  

• one line per dihedral type   
• line syntax: ID coeffs $\mathrm{ID}={}$ dihedral type (1-N) coeffs $=$ list of coeffs (see class 2 section of dihedral_coeff)  

Pair Coeffs section:  

• one line per atom type • line syntax: ID coeffs  

<html><body><table><tr><td>ID = atom type (1-N) coeffs = list of coeffs</td></tr></table></body></html>  

• example:  

ID1 = atom type I = 1-N ID2 = atom type $\mathrm{J}=\mathrm{I}{\cdot}\mathrm{N}$ , with $\mathrm{I}<=\mathrm{J}$ coeffs $=$ list of coeffs  

• examples:  

<html><body><table><tr><td>3 3 0.022 2.35197 0.022 2.35197</td></tr><tr><td>3 50.0222.351970.0222.35197</td></tr><tr><td></td></tr></table></body></html>  

This section must have $\mathrm{N}^{*}(\mathrm{N}{+}1)/2$ lines where $\Nu=\#$ of atom types. The number and meaning of the coefficients are specific to the defined pair style. See the pair_style and pair_coeff commands for details. Since pair coefficients for types $\mathrm{\textbf{I}}!=\mathrm{\textbf{J}}$ are all specified, these values will turn off the default mixing rule defined by the pair style. See the individual pair_style doc pages and the pair_modify mix command for details. Pair coefficients can also be set via the pair_coeff command in the input script.  

Triangles section:  

• one line per triangle • line syntax: atom-ID x1 y1 z1 x2 y2 z2 x3 y3 z3  

$\mathrm{atom-ID=ID}$ of atom which is a line segment   
$\mathrm{{x}1,\mathrm{{y}1,\mathrm{{z}1}=1\mathrm{{st}}}}$ corner point   
$\mathrm{x2,y2,z2=2nd}$ corner point   
$\mathrm{x3,y3,z3=3rd}$ corner point  

• example:  

12 0.0 0.0 0.0 2.0 0.0 1.0 0.0 2.0 1.0  

The Triangles section must appear if atom_style tri is used and any atoms are listed in the Atoms section with a triangleflag $=1$ . The number of lines should be specified in the header section via the “triangles” keyword.  

The 3 corner points are the corner points of the triangle. They should be values close to the center point of the triangle specified in the Atoms section of the data file, even if individual corner points are outside the simulation box.  

The ordering of the 3 points should be such that using a right-hand rule to go from point1 to point2 to point3 gives an “outward” normal vector to the face of the triangle. I.e. normal $=$ (c2-c1) $\mathbf{X}$ (c3-c1). This orientation may be important for defining some interactions.  

If the data file defines a general triclinic box, then the x1,y1,z1 and $\mathbf{x}2{,}\mathbf{y}2{,}\mathbf{z}2$ and $\mathbf{x}3,\mathbf{y}3,\mathbf{z}3$ values for each triangle should be specified for its orientation relative to the standard x,y,z coordinate axes. When the system is converted to a restricted triclinic box, the $\mathrm{x}1,\mathrm{y}1,\mathrm{z}1,\mathrm{x}2,\mathrm{y}2,\mathrm{z}2,\mathrm{x}3,\mathrm{y}3,\mathrm{z}3$ values will be altered to reflect the new orientation of the triangle.  

The Triangles section must appear after the Atoms section.  

Velocities section:  

• one line per atom • line syntax: depends on atom style where the keywords have these meanings:  

<html><body><table><tr><td>all styles except those listed</td><td>atom-ID vxvyvZ</td></tr><tr><td>electron</td><td>atom-ID vx vy vz ervel</td></tr><tr><td>ellipsoid</td><td>atom-ID vx vy vz lx ly lz</td></tr><tr><td>sphere</td><td>atom-ID vxvyvzwxwywz</td></tr><tr><td>hybrid</td><td>atom-ID vx vy vz sub-style1 sub-style2 ...</td></tr></table></body></html>  

<html><body><table><tr><td>Vx,vy,VZ translational velocity of atom</td><td></td></tr><tr><td>lx,ly,lz 二 angular momentum lof aspherical</td><td>atom</td></tr><tr><td>WX,Wy,WZ angular velocity of spherical</td><td>atom</td></tr><tr><td>ervel 9=1 electron radial velocity 1 (0 for </td><td>fixed-core)</td></tr></table></body></html>  

The velocity lines can appear in any order. This section can only be used after an Atoms section. This is because the Atoms section must have assigned a unique atom ID to each atom so that velocities can be assigned to them.  

$\mathbf{V}\mathbf{\mathbf{X}}$ , vy, vz, and ervel are in units of velocity. Lx, ly, lz are in units of angular momentum (distance-velocity-mass). $\mathbf{W}\mathbf{x}$   
Wy, Wz are in units of angular velocity (radians/time).  

If the data file defines a general triclinic box, then each of the 3 vectors (translational velocity, angular momentum, angular velocity) should be specified for the rotated coordinate axes of the general triclinic box. See the Howto triclinic doc page for more details.  

For atom_style hybrid, following the 4 initial values (ID,vx,vy,vz), specific values for each sub-style must be listed. The order of the sub-styles is the same as they were listed in the atom_style command. The sub-style specific values are those that are not the 5 standard ones (ID,vx,vy,vz). For example, for the “sphere” sub-style, “wx”, “wy”, “wz” values would appear. These are listed in the same order they appear as listed above. Thus if  

# 1.86 read_dump command  

# 1.86.1 Syntax  

read_dump file Nstep field1 field2 ... keyword values ...  

• file $=$ name of dump file to read   
• Nstep $=$ snapshot timestep to read from file   
• one or more fields may be appended field $=\mathrm{~x~}$ or y or z or vx or vy or vz or q or ix or iy or iz or fx or fy or fz $\mathbf{x},\mathbf{y},\mathbf{z}=$ atom coordinates vx,vy,vz $=$ velocity components $\mathrm{~q~}=$ charge ix,iy,iz $=$ image flags in each dimension fx,fy,fz $=$ force components   
• zero or more keyword/value pairs may be appended   
• keyword $=$ nfile or box or timestep or replace or purge or trim or add or label or scaled or wrapped or fo nfile value $=$ Nfiles $=$ how many parallel dump files exist box value $=$ yes or no $=$ replace simulation box with dump box timestep valu $\mathrm{\Delta_{\mathrm{{3}}}}=\mathrm{yes}$ or no $=$ reset simulation timestep with dump timestep replace valu ${\mathrm{e}}={\mathrm{yes}}$ or no $=$ overwrite atoms with dump atoms purge value $\mathrm{~\ensuremath~{~\mu~}~}=\mathrm{yes}$ or no $=$ delete all atoms before adding dump atoms trim value = yes or ${\mathrm{no}}={\mathrm{trim}} $ atoms not in dump snapshot add value = yes or keep or no = add new dump atoms to system label value = field column field = one of the listed fields or id or type column = label on corresponding column in dump file scaled value = yes or no = coords in dump file are scaled/unscaled wrapped value = yes or no = coords in dump file are wrapped/unwrapped format values = format of dump file, must be last keyword if used native = native LAMMPS dump file $\mathrm{{xyz}=X Y Z}$ file adios [timeout value] = dump file written by the dump adios command timeout $=$ specify waiting time for the arrival of the timestep when running concurrently. The value is a float number and is interpreted in seconds. molfile style $\mathrm{path}=\mathrm{VMD}$ molfile plugin interface style = dcd or xyz or others supported by molfile plugins path $=$ optional path for location of molfile plugins  

# 1.86.2 Examples  

read_dump dump.file 5000 x y z   
read_dump dump.xyz 5 x y z box no format xyz   
read_dump dump.xyz 10 x y z box no format molfile xyz "../plugins"   
read_dump dump.dcd 0 x y z box yes format molfile dcd   
read_dump dump.file 1000 x y z vx vy vz box yes format molfile lammpstrj /usr/local/lib/vmd/plugins/   
$\hookrightarrow$ LINUXAMD64/plugins/molfile   
read_dump dump.file 5000 x y vx vy trim yes   
read_dump dump.file 5000 x y vx vy add yes box no timestep no   
read_dump ../run7/dump.file.gz 10000 x y z box yes  

(continues on next page)  

# 1.86. read_dump command  

<html><body><table><tr><td></td><td>(continuedfrompreviouspage)</td></tr><tr><td>read dump</td><td>dump.xyz 10 x y z box no format molfile xyz ../F plugins</td></tr><tr><td>read</td><td>dump dump.dcd 0 x y z format molfile dcd</td></tr><tr><td>read</td><td>dump dump.file 1000 x y z vx vy vz format molfile lammpstrj usr /local/lib/vmd/plugins</td></tr><tr><td></td><td>→LINUXAMD64/plugins molfile</td></tr><tr><td>read</td><td>dump dump.bp 5000 x y Z vx vy vz format adios</td></tr><tr><td>read</td><td>dump dump.bp 5000 x y z vx ( vy vz format adios timeout 60.0</td></tr></table></body></html>  

# 1.86.3 Description  

Read atom information from a dump file to overwrite the current atom coordinates, and optionally the atom velocities and image flags, the simulation timestep, and the simulation box dimensions. This is useful for restarting a run from a particular snapshot in a dump file. See the read_restart and read_data commands for alternative methods to do this. Also see the rerun command for a means of reading multiple snapshots from a dump file.  

Note that a simulation box must already be defined before using the read_dump command. This can be done by the create_box, read_data, or read_restart commands. The read_dump command can reset the simulation box dimensions, as explained below.  

Also note that reading per-atom information from a dump snapshot is limited to the atom coordinates, velocities and image flags, as explained below. Other atom properties, which may be necessary to run a valid simulation, such as atom charge, or bond topology information for a molecular system, are not read from (or may not even be contained in) dump files. Thus this auxiliary information should be defined in the usual way, e.g. in a data file read in by a read_data command, before using the read_dump command, or by the set command, after the dump snapshot is read.  

If the dump filename specified as file ends with “.gz”, the dump file is read in gzipped format.  

You can read dump files that were written (in parallel) to multiple files via the $^{66}\%$ ” wild-card character in the dump file name. If any specified dump file name contains a $^{\leftarrow6}\%^{\cdot}$ , they must all contain it. See the dump command for details. The $\mathbf{\hat{\mu}}^{\epsilon6}\mathbf{0}\mathbf{\%}^{,}$ wild-card character is only supported by the native format for dump files, described next.  

If reading parallel dump files, you must also use the nfile keyword to tell LAMMPS how many parallel files exist, via its specified Nfiles value.  

The format of the dump file is selected through the format keyword. If specified, it must be the last keyword used, since all remaining arguments are passed on to the dump reader. The native format is for native LAMMPS dump files, written with a dump atom or dump custom command. The xyz format is for generic XYZ formatted dump files (see details below). These formats take no additional values.  

The molfile format supports reading data through using the VMD molfile plugin interface. This dump reader format is only available, if the MOLFILE package has been installed when compiling LAMMPS.  

The molfile format takes one or two additional values. The style value determines the file format to be used and can be any format that the molfile plugins support, such as DCD or XYZ. Note that DCD dump files can be written by LAMMPS via the dump dcd command. The path value specifies a list of directories which LAMMPS will search for the molfile plugins appropriate to the specified style. The syntax of the path value is like other search paths: it can contain multiple directories separated by a colon (or semicolon on windows). The path keyword is optional and defaults to “.”, i.e. the current directory.  

The adios format supports reading data that was written by the dump adios command. The entire dump is read in parallel across all the processes, dividing the atoms evenly among the processes. The number of writers that has written the dump file does not matter. Using the adios style for dump and read_dump is a convenient way to dump all atoms from $N$ writers and read it back by $M$ readers. If one is running two LAMMPS instances concurrently where one dumps data and the other is reading it with the rerun command, the timeout option can be specified to wait on the reader side for the arrival of the requested step.  

Support for other dump format readers may be added in the future.  

Global information is first read from the dump file, namely timestep and box information.  

The dump file is scanned for a snapshot with a timestamp that matches the specified Nstep. This means the LAMMPS timestep the dump file snapshot was written on for the native or adios formats.  

The list of timestamps available in an adios .bp file is stored in the variable ntimestep:  

<html><body><table><tr><td>console</td></tr><tr><td>$ bpls dump.bp -d ntimestep</td></tr><tr><td>uint64 t ntimestep 5*scalar</td></tr><tr><td>(0) 0 50 100 150 200</td></tr></table></body></html>  

Note that the xyz and molfile formats do not store the timestep. For these formats, timesteps are numbered logically, in a sequential manner, starting from 0. Thus to access the 10th snapshot in an xyz or mofile formatted dump file, use $N s t e p=9$ .  

The dimensions of the simulation box for the selected snapshot are also read; see the box keyword discussion below. For the native format, an error is generated if the snapshot is for a triclinic box and the current simulation box is orthogonal or vice versa. A warning will be generated if the snapshot box boundary conditions (periodic, shrink-wrapped, etc) do not match the current simulation boundary conditions, but the boundary condition information in the snapshot is otherwise ignored. See the “boundary” command for more details. The adios reader does the same as the native format reader.  

For the xyz format, no information about the box is available, so you must set the box flag to no. See details below.  

For the molfile format, reading simulation box information is typically supported, but the location of the simulation box origin is lost and no explicit information about periodicity or orthogonal/triclinic box shape is available. The MOLFILE package makes a best effort to guess based on heuristics, but this may not always work perfectly.  

Per-atom information from the dump file snapshot is then read from the dump file snapshot. This corresponds to the specified fields listed in the read_dump command. It is an error to specify a z-dimension field, namely $z,\nu z,$ , or $i z$ , for a 2d simulation.  

For dump files in native format, each column of per-atom data has a text label listed in the file. A matching label for each field must appear, e.g. the label “vy” for the field vy. For the $x,y,z$ fields any of the following labels are considered a match:  

x, xs, xu, xsu for field x y, ys, yu, ysu for field y z, zs, zu, zsu for field z  

The meaning of xs (scaled), xu (unwrapped), and xsu (scaled and unwrapped) is explained on the dump command doc page. These labels are searched for in the list of column labels in the dump file, in order, until a match is found.  

The dump file must also contain atom IDs, with a column label of “id”.  

If the add keyword is specified with a value of yes or keep, as discussed below, the dump file must contain atom types, with a column label of “type”.  

If a column label you want to read from the dump file is not a match to a specified field, the label keyword can be used to specify the specific column label from the dump file to associate with that field. An example is if a time-averaged coordinate is written to the dump file via the fix ave/atom command. The column will then have a label corresponding to the fix-ID rather than “x” or “xs”. The label keyword can also be used to specify new column labels for fields id and type.  

# 1.86. read_dump command  

For dump files in xyz format, only the $t y p e,x,y_{\mathrm{:}}$ , and $z$ fields are supported. There are many variants of the XYZ file format. LAMMPS will read the number of atoms from the first line of each frame, ignore the second (title) line, and then read one line for each atom in the format:  

<html><body><table><tr><td><label> <x coordinate> <y coordinate> <z coordinate></td></tr></table></body></html>  

If the atom label is a numeric integer (like with XYZ files created by created with default settings by dump style xyz), that number will be used as the atom type. If the atom label is a string, then a type map must be created using the labelmap command. This map needs to associate each (numeric) atom type with a string label. The numeric atom type is stored internally.  

The xyz format dump file does not store atom IDs, so these are assigned consecutively to the atoms as they appear in the dump file, starting from 1. Thus you should ensure that the order of atoms is consistent from snapshot to snapshot in the XYZ dump file. See the dump_modify sort command if the XYZ dump file was written by LAMMPS.  

For dump files in molfile format, the x, y, z, vx, vy, and $\nu z$ fields can be specified. However, not all molfile formats store velocities, or their respective plugins may not support reading of velocities. The molfile dump files do not store atom IDs, so these are assigned consecutively to the atoms as they appear in the dump file, starting from 1. Thus you should ensure that the order of atoms are consistent from snapshot to snapshot in the molfile dump file. See the dump_modify sort command if the dump file was written by LAMMPS.  

The adios format supports all fields that the native format supports except for the $q$ charge field. The list of fields stored in an adios .bp file is recorded in the attributes columns (array of short strings) and columnstr (space-separated single string).  

<html><body><table><tr><td colspan="3">console</td></tr><tr><td></td><td>$ bpls -la dump.bp column</td></tr><tr><td>string</td><td>columns attr</td><td>{"id", "type", "x", "y", "z", "vx", "- 'vy", "vz"}</td></tr><tr><td>string</td><td>columnstr attr</td><td>"id t type x y z vx vy vz</td></tr></table></body></html>  

Information from the dump file snapshot is used to overwrite or replace properties of the current system. There are various options for how this is done, determined by the specified fields and optional keywords.  

Changed in version $3\mathrm{Aug}2022$ .  

The timestep of the snapshot becomes the current timestep for the simulation unless the timestep keyword is specified with a no value (default setting is yes). See the reset_timestep command if you wish to change this to a different value after the dump snapshot is read.  

If the box keyword is specified with a yes value, then the current simulation box dimensions are replaced by the dump snapshot box dimensions. If the box keyword is specified with a no value, the current simulation box is unchanged.  

If the purge keyword is specified with a yes value, then all current atoms in the system are deleted before any of the operations invoked by the replace, trim, or add keywords take place.  

If the replace keyword is specified with a yes value, then atoms with IDs that are in both the current system and the dump snapshot have their properties overwritten by field values. If the replace keyword is specified with a no value, atoms with IDs that are in both the current system and the dump snapshot are not modified.  

If the trim keyword is specified with a yes value, then atoms with IDs that are in the current system but not in the dump snapshot are deleted. These atoms are unaffected if the trim keyword is specified with a no value.  

If the add keyword is specified with a no value (default), then dump file atoms with IDs that are not in the current system are not added to the system. They are simply ignored.  

If a yes value is specified, the atoms with new IDs are added to the system but their atom IDs are not preserved. Instead, after all the atoms are added, new IDs are assigned to them in the same manner as is described for the create_atoms command. Basically the largest existing atom ID in the system is identified, and all the added atoms are assigned IDs that consecutively follow the largest ID.  

If a keep value is specified, the atoms with new IDs are added to the system and their atom IDs are preserved. This may lead to non-contiguous IDs for the combined system.  

Note that atoms added via the add keyword will only have the attributes read from the dump file due to the field arguments. For example, if $x$ or $y$ or $z$ or $q$ is not specified as a field, a value of 0.0 is used for added atoms. Added atoms must have an atom type, so this value must appear in the dump file.  

Any other attributes (e.g. charge or particle diameter for spherical particles) will be set to default values, the same as if the create_atoms command were used.  

Atom coordinates read from the dump file are first converted into unscaled coordinates, relative to the box dimensions of the snapshot. These coordinates are then be assigned to an existing or new atom in the current simulation. The coordinates will then be remapped to the simulation box, whether it is the original box or the dump snapshot box. If periodic boundary conditions apply, this means the atom will be remapped back into the simulation box if necessary. If shrink-wrap boundary conditions apply, the new coordinates may change the simulation box dimensions. If fixed boundary conditions apply, the atom will be lost if it is outside the simulation box.  

For native format dump files, the 3 xyz image flags for an atom in the dump file are set to the corresponding values appearing in the dump file if the ix, iy, iz fields are specified. If not specified, the image flags for replaced atoms are not changed and image flags for new atoms are set to default values. If coordinates read from the dump file are in unwrapped format (e.g. xu) then the image flags for read-in atoms are also set to default values. The remapping procedure described in the previous paragraph will then change images flags for all atoms (old and new) if periodic boundary conditions are applied to remap an atom back into the simulation box.  

![](images/afbe0b9bae418bf015779bae76f6f0f8cd3169d8e9a5ad07e9b3f603c8ac6fc7.jpg)  

# Note  

If you get a warning about inconsistent image flags after reading in a dump snapshot, it means one or more pairs of bonded atoms now have inconsistent image flags. As discussed on the Errors common page this may or may not cause problems for subsequent simulations. One way this can happen is if you read image flag fields from the dump file but do not also use the dump file box parameters.  

LAMMPS knows how to compute unscaled and remapped coordinates for the snapshot column labels discussed above, e.g. x, xs, xu, xsu. If another column label is assigned to the $x$ or $y$ or $z$ field via the label keyword, e.g. for coordinates output by the fix ave/atom command, then LAMMPS needs to know whether the coordinate information in the dump file is scaled and/or wrapped. This can be set via the scaled and wrapped keywords. Note that the value of the scaled and wrapped keywords is ignored for fields $x$ or $y$ or $z$ if the label keyword is not used to assign a column label to that field.  

The scaled/unscaled and wrapped/unwrapped setting must be identical for any of the $x,y,z$ fields that are specified. Thus you cannot read xs and yu from the dump file. Also, if the dump file coordinates are scaled and the simulation box is triclinic, then all 3 of the $x,y,z$ fields must be specified, since they are all needed to generate absolute, unscaled coordinates.  

# 1.86.4 Restrictions  

To read gzipped dump files, you must compile LAMMPS with the -DLAMMPS_GZIP option. See the Build settings doc page for details.  

The molfile dump file formats are part of the MOLFILE package. They are only enabled if LAMMPS was built with that packages. See the Build package page for more info.  

To write and read adios .bp files, you must compile LAMMPS with the ADIOS package.  

# 1.86. read_dump command  

# 1.86.5 Related commands  

dump, dump molfile, dump adios, read_data, read_restart, rerun  

# 1.86.6 Default  

The option defaults are box $=$ yes, timestep $=$ yes, replace $=$ yes, purge $=$ no, trim $=$ no, ad $\mathrm{d}=\mathrm{no}$ , scaled $=$ no, wrapped $=$ yes, and format $=$ native.  

# 1.87 read_restart command  

# 1.87.1 Syntax  

• file $=$ name of binary restart file to read in  

# 1.87.2 Examples  

read restart save.10000 read _restart restart.\*  

# 1.87.3 Description  

Read in a previously saved system configuration from a restart file. This allows continuation of a previous run. Details about what information is stored (and not stored) in a restart file is given below. Basically this operation will re-create the simulation box with all its atoms and their attributes as well as some related global settings, at the point in time it was written to the restart file by a previous simulation. The simulation box will be partitioned into a regular 3d grid of rectangular bricks, one per processor, based on the number of processors in the current simulation and the settings of the processors command. The partitioning can later be changed by the balance or fix balance commands.  

Deprecated since version 23Jun2022.  

Atom coordinates that are found to be outside the simulation box when reading the restart will be remapped back into the box and their image flags updated accordingly. This previously required specifying the remap option, but that is no longer required.  

Restart files are saved in binary format to enable exact restarts, meaning that the trajectories of a restarted run will precisely match those produced by the original run had it continued on.  

Some information about a restart file can be gathered directly from the command-line when using LAMMPS with the -restart2info command-line flag. On Unix-like operating systems (like Linux or macOS), one can also configure the “file” command-line program to display basic information about a restart file  

The binary restart file format was not designed with backward, forward, or cross-platform compatibility in mind, so the files are only expected to be read correctly by the same LAMMPS executable on the same platform. Changes to the architecture, compilation settings, or LAMMPS version can render a restart file unreadable or it may read the data incorrectly. If you want a more portable format, you can use the data file format as created by the write_data command. Binary restart files can also be converted into a data file from the command-line by the LAMMPS executable that wrote them using the -restart2data command-line flag.  

Several things can prevent exact restarts due to round-off effects, in which case the trajectories in the 2 runs will slowly diverge. These include running on a different number of processors or changing certain settings such as those set by the newton or processors commands. LAMMPS will issue a warning in these cases.  

Certain fixes will not restart exactly, though they should provide statistically similar results. These include fix shake and fix langevin.  

Certain pair styles will not restart exactly, though they should provide statistically similar results. This is because the forces they compute depend on atom velocities, which are used at half-step values every timestep when forces are computed. When a run restarts, forces are initially evaluated with a full-step velocity, which is different than if the run had continued. These pair styles include granular pair styles, pair dpd, and pair lubricate.  

If a restarted run is immediately different than the run which produced the restart file, it could be a LAMMPS bug, so consider reporting it if you think the behavior is a bug.  

Because restart files are binary, they may not be portable to other machines. In this case, you can use the -restart command-line switch to convert a restart file to a data file.  

Similar to how restart files are written (see the write_restart and restart commands), the restart filename can contain two wild-card characters. If a “\*” appears in the filename, the directory is searched for all filenames that match the pattern where “\*” is replaced with a timestep value. The file with the largest timestep value is read in. Thus, this effectively means, read the latest restart file. It’s useful if you want your script to continue a run from where it left off. See the run command and its “upto” option for how to specify the run command so it does not need to be changed either.  

If a $^{66}\%$ ” character appears in the restart filename, LAMMPS expects a set of multiple files to exist. The restart and write_restart commands explain how such sets are created. Read_restart will first read a filename where $\mathbf{\hat{\mu}}^{\epsilon}\mathbf{C}\mathbf{\eta}_{0}^{\eta}$ is replaced by “base”. This file tells LAMMPS how many processors created the set and how many files are in it. Read_restart then reads the additional files. For example, if the restart file was specified as save. $\%$ when it was written, then read_restart reads the files save.base, save.0, save.1, . . . save.P-1, where $\mathrm{\bfP}$ is the number of processors that created the restart file.  

Note that P could be the total number of processors in the previous simulation, or some subset of those processors, if the fileper or nfile options were used when the restart file was written; see the restart and write_restart commands for details. The processors in the current LAMMPS simulation share the work of reading these files; each reads a roughly equal subset of the files. The number of processors which created the set can be different the number of processors in the current LAMMPS simulation. This can be a fast mode of input on parallel machines that support parallel I/O.  

Here is the list of information included in a restart file, which means these quantities do not need to be re-specified in the input script that reads the restart file, though you can redefine many of these settings after the restart file is read.  

• units   
• newton bond (see discussion of newton command below)   
• atom style and atom_modify settings id, map, sort   
• comm style and comm_modify settings mode, cutoff, vel   
• timestep size and timestep number   
• simulation box size and shape and boundary settings   
• atom group definitions   
• per-type atom settings such as mass   
• per-atom attributes including their group assignments and molecular topology attributes (bonds, angles, etc)   
• force field styles (pair, bond, angle, etc)   
• force field coefficients (pair, bond, angle, etc) in some cases (see below)   
• pair_modify settings, except the compute option   
• special_bonds settings  

Here is a list of information not stored in a restart file, which means you must re-issue these commands in your input script, after reading the restart file.  

• newton pair (see discussion of newton command below)  

# 1.87. read_restart command  

• fix commands (see below)   
• compute commands (see below)   
• variable commands   
• region commands   
• neighbor list criteria including neigh_modify settings   
• kspace_style and kspace_modify settings   
• info for thermodynamic, dump, or restart output  

The newton command has two settings, one for pairwise interactions, the other for bonded. Both settings are stored in the restart file. For the bond setting, the value in the file will overwrite the current value (at the time the read_restart command is issued) and warn if the two values are not the same and the current value is not the default. For the pair setting, the value in the file will not overwrite the current value (so that you can override the previous run’s value), but a warning is issued if the two values are not the same and the current value is not the default.  

Note that some force field styles (pair, bond, angle, etc) do not store their coefficient info in restart files. Typically these are many-body or tabulated potentials which read their parameters from separate files. In these cases you will need to re-specify the pair_coeff , bond_coeff , etc commands in your restart input script. The doc pages for individual force field styles mention if this is the case. This is also true of pair_style hybrid (bond hybrid, angle hybrid, etc) commands; they do not store coefficient info.  

As indicated in the above list, the fixes used for a simulation are not stored in the restart file. This means the new input script should specify all fixes it will use. However, note that some fixes store an internal “state” which is written to the restart file. This allows the fix to continue on with its calculations in a restarted simulation. To re-enable such a fix, the fix command in the new input script must be of the same style and use the same fix-ID as was used in the input script that wrote the restart file.  

If a match is found, LAMMPS prints a message indicating that the fix is being re-enabled. If no match is found before the first run or minimization is performed by the new script, the “state” information for the saved fix is discarded. At the time the discard occurs, LAMMPS will also print a list of fixes for which the information is being discarded. See the doc pages for individual fixes for info on which ones can be restarted in this manner. Note that fixes which are created internally by other LAMMPS commands (computes, fixes, etc) will have style names which are all-capitalized, and IDs which are generated internally.  

Likewise, the computes used for a simulation are not stored in the restart file. This means the new input script should specify all computes it will use. However, some computes create a fix internally to store “state” information that persists from timestep to timestep. An example is the compute msd command which uses a fix to store a reference coordinate for each atom, so that a displacement can be calculated at any later time. If the compute command in the new input script uses the same compute-ID and group-ID as was used in the input script that wrote the restart file, then it will create the same fix in the restarted run. This means the re-created fix will be re-enabled with the stored state information as described in the previous paragraph, so that the compute can continue its calculations in a consistent manner.  

![](images/f4f921d248f24f5ba7dd027d4b13915e02913f2f0ee636ca1d81995356b4e514.jpg)  

# Note  

There are a handful of commands which can be used before or between runs which may require a system initialization. Examples include the “balance”, “displace_atoms”, “delete_atoms”, “set” (some options), and “velocity” (some options) commands. This is because they can migrate atoms to new processors. Thus they will also discard unused “state” information from fixes. You will know the discard has occurred because a list of discarded fixes will be printed to the screen and log file, as explained above. This means that if you wish to retain that info in a restarted run, you must re-specify the relevant fixes and computes (which create fixes) before those commands are used.  

Some pair styles, like the granular pair styles, also use a fix to store “state” information that persists from timestep to timestep. In the case of granular potentials, it is contact information between pairs of touching particles. This info will also be re-enabled in the restart script, assuming you re-use the same granular pair style.  

LAMMPS allows bond interactions (angle, etc) to be turned off or deleted in various ways, which can affect how their info is stored in a restart file.  

If bonds (angles, etc) have been turned off by the fix shake or delete_bonds command, their info will be written to a restart file as if they are turned on. This means they will need to be turned off again in a new run after the restart file is read.  

Bonds that are broken (e.g. by a bond-breaking potential) are written to the restart file as broken bonds with a type of 0. Thus these bonds will still be broken when the restart file is read.  

Bonds that have been broken by the fix bond/break command have disappeared from the system. No information about these bonds is written to the restart file.  

# 1.87.4 Restrictions  

none  

# 1.87.5 Related commands  

read_data, read_dump, write_restart, restart  

# 1.87.6 Default  

none  

# 1.88 region command  

Accelerator Variants: block/kk, sphere/kk  

# 1.88.1 Syntax  

region ID style args keyword arg ...  

• $\mathrm{ID}=$ user-assigned name for the region   
• style $=$ delete or block or cone or cylinder or ellipsoid or plane or prism or sphere or union or intersect delete $=\mathrm{no}$ args block $\mathrm{{urgs}=\mathrm{{xlo}}}$ xhi ylo yhi zlo zhi xlo,xhi,ylo,yhi,zlo,zhi $=$ bounds of block in all dimensions (distance units) xlo,xhi,ylo,yhi,zlo,zhi can be a variable (see below) cone $\mathrm{args=dimcl{c}2}$ radlo radhi lo hi $\mathrm{{dim}=x}$ or y or $\mathrm{~Z~}=$ axis of cone c1,c2 = coords of cone axis in other 2 dimensions (distance units) radlo,radhi = cone radii at lo and hi end (distance units) lo,hi = bounds of cone in dim (distance units) c1,c2,radlo,radhi,lo,hi can be a variable (see below) cylinder $\mathrm{args=dimcl{c}2}$ radius lo hi $\mathrm{{dim}=x}$ or y or z = axis of cylinder c1,c2 = coords of cylinder axis in other 2 dimensions (distance units) radius $=$ cylinder radius (distance units) c1,c2, and radius can be a variable (see below) lo,hi $=$ bounds of cylinder in dim (distance units)  

ellipsoid args $=\mathrm{~x~}$ y z a b c x,y,z $=$ center of ellipsoid (distance units) a,b,c = half the length of the principal axes of the ellipsoid (distance units) x,y,z,a,b and c can be a variable (see below) plane args = px py pz nx ny nz px,py,pz = point on the plane (distance units) nx,ny,nz = direction normal to plane (distance units) px,py,pz can be a variable (see below) prism args = xlo xhi ylo yhi zlo zhi xy xz yz xlo,xhi,ylo,yhi,zlo,zhi = bounds of untilted prism (distance units) xy = distance to tilt y in x direction (distance units) xz = distance to tilt z in x direction (distance units) yz = distance to tilt z in y direction (distance units) xlo,xhi,ylo,yhi,zlo,zhi,xy,xz,yz can be a variable (see below) sphere args = x y z radius x,y,z = center of sphere (distance units) radius = radius of sphere (distance units) x,y,z, and radius can be a variable (see below) union args = N reg-ID1 reg-ID2 ... $\mathrm{N}=\#$ of regions to follow, must be 2 or greater reg-ID1,reg-ID2, $\dots=\mathrm{IDs}$ of regions to join together intersect $\mathrm{args=N}$ reg-ID1 reg-ID2 ... $\mathrm{N}=\#$ of regions to follow, must be 2 or greater reg-ID1,reg-ID2, $\dots=\mathrm{IDs}$ of regions to intersect • zero or more keyword/arg pairs may be appended • keyword $=$ side or units or move or rotate or open side value = in or out in $=$ the region is inside the specified geometry out $=$ the region is outside the specified geometry units value $=$ lattice or box lattice $=$ the geometry is defined in lattice units box = the geometry is defined in simulation box units move $\arg\mathrm{s}=\mathrm{v\_X\mathrm{v\_y\mathrm{v\_Z}}}$ $\mathrm{~v~}_{-}\mathrm{x,v\_y,v\_z=}$ equal-style variables for x,y,z displacement of region over time (distance units) rotate $\mathrm{args}=\mathrm{v\_}$ theta Px Py Pz Rx Ry Rz v_theta $=$ equal-style variable for rotaton of region over time (in radians) $\mathrm{Px,Py,Pz=}$ origin for axis of rotation (distance units) $\mathrm{Rx,Ry,Rz=}$ axis of rotation vector open value $=$ integer from 1-6 corresponding to face index (see below) • accelerated styles (with same args) $=$ block/kk, sphere/kk  

# 1.88.2 Examples  

region 1 block -3.0 5.0 INF 10.0 INF INF   
region 2 sphere 0.0 0.0 0.0 5 side out   
region void cylinder y 2 3 5 -5.0 EDGE units box   
region 1 prism 0 10 0 10 0 10 2 0 0   
region outside union 4 side1 side2 side3 side4   
region 2 sphere 0.0 0.0 0.0 5 side out move v_left v_up NULL   
region openbox block 0 10 0 10 0 10 open 5 open 6 units box   
region funnel cone z 10 10 2 5 0 10 open 1 units box  

# 1.88.3 Description  

This command defines a geometric region of space. Various other commands use regions. For example, the region can be filled with atoms via the create_atoms command. Or a bounding box around the region, can be used to define the simulation box via the create_box command. Or the atoms in the region can be identified as a group via the group command, or deleted via the delete_atoms command. Or the surface of the region can be used as a boundary wall via the fix wall/region command.  

Commands which use regions typically test whether an atom’s position is contained in the region or not. For this purpose, coordinates exactly on the region boundary are considered to be interior to the region. This means, for example, for a spherical region, an atom on the sphere surface would be part of the region if the sphere were defined with the side in keyword, but would not be part of the region if it were defined using the side out keyword. See more details on the side keyword below.  

Normally, regions in LAMMPS are “static”, meaning their geometric extent does not change with time. If the move or rotate keyword is used, as described below, the region becomes “dynamic”, meaning it’s location or orientation changes with time. This may be useful, for example, when thermostatting a region, via the compute temp/region command, or when the fix wall/region command uses a region surface as a bounding wall on particle motion, i.e. a rotating container.  

The delete style removes the named region. Since there is little overhead to defining extra regions, there is normally no need to do this, unless you are defining and discarding large numbers of regions in your input script.  

The lo/hi values for block or cone or cylinder or prism styles can be specified as EDGE or INF. EDGE means they extend all the way to the global simulation box boundary. Note that this is the current box boundary; if the box changes size during a simulation, the region does not. INF means a large negative or positive number (1.0e20), so it should encompass the simulation box even if it changes size. If a region is defined before the simulation box has been created (via create_box or read_data or read_restart commands), then an EDGE or INF parameter cannot be used. For a prism region, a non-zero tilt factor in any pair of dimensions cannot be used if both the lo/hi values in either of those dimensions are INF. E.g. if the xy tilt is non-zero, then xlo and xhi cannot both be INF, nor can ylo and yhi.  

# Note  

Regions in LAMMPS do not get wrapped across periodic boundaries, as specified by the boundary command. For example, a spherical region that is defined so that it overlaps a periodic boundary is not treated as 2 half-spheres, one on either side of the simulation box.  

![](images/c9c2e573d3841d870ae60b36a1c03535fcc0f65ec439cdd29ec0d5eabb598507.jpg)  

# Note  

Regions in LAMMPS are always 3d geometric objects, regardless of whether the dimension of a simulation is 2d or 3d. Thus when using regions in a 2d simulation, you should be careful to define the region so that its intersection with the $2\mathbf{d}\mathbf{x}$ -y plane of the simulation has the 2d geometric extent you want.  

For style cone, an axis-aligned cone is defined which is like a cylinder except that two different radii (one at each end) can be defined. Either of the radii (but not both) can be 0.0.  

For style cone and cylinder, the c1,c2 params are coordinates in the 2 other dimensions besides the cylinder axis dimension. For $\mathrm{{dim}=x}$ , $\mathrm{c}1/\mathrm{c}2=\mathrm{y}/\mathrm{z}$ ; for $\dim=\mathrm{y}.$ , $\mathrm{c}1/\mathrm{c}2=\mathrm{x}/\mathrm{z}$ ; for $\mathrm{dim}=\mathbf{z}$ , $\mathrm{c}1/\mathrm{c}2=\mathrm{x}/\mathrm{y}$ . Thus the third example above specifies a cylinder with its axis in the y-direction located at $\mathbf{X}=2.0$ and ${\bf Z}=3.0$ , with a radius of 5.0, and extending in the y-direction from -5.0 to the upper box boundary.  

Added in version 4May2022.  

For style ellipsoid, an axis-aligned ellipsoid is defined. The ellipsoid has its center at (x,y,z) and is defined by 3 axisaligned vectors given by $\mathrm{A=(a,0,0);B=(0,b,0);C=(0,0,c)}$ . Note that although the ellipsoid is specified as axis-aligned it can be rotated via the optional rotate keyword.  

For style plane, a plane is defined which contain the point (px,py,pz) and has a normal vector (nx,ny,nz). The normal vector does not have to be of unit length. The “inside” of the plane is the half-space in the direction of the normal vector; see the discussion of the side option below.  

For style prism, a parallelepiped is defined (it’s too hard to spell parallelepiped in an input script!). The parallelepiped has its “origin” at (xlo,ylo,zlo) and is defined by 3 edge vectors starting from the origin given by $\mathbf{A}=(\mathrm{xhi-xlo},0,0)$ ; $\mathbf{B}=(\mathrm{xy},\mathrm{yhi}{-}\mathrm{ylo},0)$ ; ${\mathrm{C}}=$ (xz,yz,zhi-zlo). Xy,xz,yz can be 0.0 or positive or negative values and are called “tilt factors” because they are the amount of displacement applied to faces of an originally orthogonal box to transform it into the parallelepiped.  

A prism region that will be used with the create_box command to define a triclinic simulation box must have tilt factors (xy,xz,yz) that do not skew the box more than half the distance of corresponding the parallel box length. For example, if $\mathrm{xlo}=2$ and $\mathrm{xhi}=12$ , then the $\mathbf{X}$ box length is 10 and the xy tilt factor must be between -5 and 5. Similarly, both xz and yz must be between -(xhi-xlo)/2 and $+(\mathrm{yhi-ylo})/2$ . Note that this is not a limitation, since if the maximum tilt factor is 5 (as in this example), then configurations with tilt $=$ . . . , -15, -5, 5, 15, 25, . . . are all geometrically equivalent.  

For style sphere, a sphere is defined with its center at (x,y,z) and with radius as its radius.  

The radius value for styles sphere and cylinder, and the parameters a,b,c for style ellipsoid, can each be specified as an equal-style variable. Likewise, for style sphere and ellipsoid the x-, y-, and z- coordinates of the center of the sphere/ellipsoid can be specified as an equal-style variable. And for style cylinder the two center positions c1 and c2 for the location of the cylinder axes can be specified as a equal-style variable. For style cone and prism all properties can be defined via equal-style variables. For style plane the point can be defined via equal-style variables.  

If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the radius of the region.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent radius or have a time dependent position of the sphere or cylinder region.  

See the Howto tricilinc page for a geometric description of triclinic boxes, as defined by LAMMPS, and how to transform these parameters to and from other commonly used triclinic representations.  

The union style creates a region consisting of the volume of all the listed regions combined. The intersect style create a region consisting of the volume that is common to all the listed regions.  

# Note  

The union and intersect regions operate by invoking methods from their list of sub-regions. Thus you cannot delete the sub-regions after defining a union or intersection region.  

The side keyword determines whether the region is considered to be inside or outside of the specified geometry. Using this keyword in conjunction with union and intersect regions, complex geometries can be built up. For example, if the interior of two spheres were each defined as regions, and a union style with side $=$ out was constructed listing the region-IDs of the 2 spheres, the resulting region would be all the volume in the simulation box that was outside both of the spheres.  

The units keyword determines the meaning of the distance units used to define the region for any argument above listed as having distance units. It also affects the scaling of the velocity vector specified with the vel keyword, the amplitude vector specified with the wiggle keyword, and the rotation point specified with the rotate keyword, since they each involve a distance metric.  

A box value selects standard distance units as defined by the units command, e.g. Angstroms for units $=$ real or metal. A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacings which are used as follows:  

• For style block, the lattice spacing in dimension x is applied to xlo and xhi, similarly the spacings in dimensions y,z are applied to ylo/yhi and zlo/zhi.  

• For style cone, the lattice spacing in argument dim is applied to lo and hi. The spacings in the two radial dimensions are applied to c1 and c2. The two cone radii are scaled by the lattice spacing in the dimension corresponding to c1.   
• For style cylinder, the lattice spacing in argument dim is applied to lo and hi. The spacings in the two radial dimensions are applied to c1 and c2. The cylinder radius is scaled by the lattice spacing in the dimension corresponding to c1.   
• For style ellipsoid, the lattice spacing in dimensions x,y,z are applied to the ellipsoid center x,y,z. The spacing in dimensions x,y,z are applied to the ellipsoid radii a,b,c respectively.   
• For style plane, the lattice spacing in dimension $\mathbf{X}$ is applied to px and nx, similarly the spacings in dimensions y,z are applied to py/ny and pz/nz.   
• For style prism, the lattice spacing in dimension $\mathbf{X}$ is applied to xlo and xhi, similarly for ylo/yhi and zlo/zhi. The lattice spacing in dimension x is applied to xy and xz, and the spacing in dimension y to yz.   
• For style sphere, the lattice spacing in dimensions x,y,z are applied to the sphere center x,y,z. The spacing in dimension x is applied to the sphere radius.  

If the move or rotate keywords are used, the region is “dynamic”, meaning its location or orientation changes with time. These keywords cannot be used with a union or intersect style region. Instead, the keywords should be used to make the individual sub-regions of the union or intersect region dynamic. Normally, each sub-region should be “dynamic” in the same manner (e.g. rotate around the same point), though this is not a requirement.  

The move keyword allows one or more equal-style variables to be used to specify the x,y,z displacement of the region, typically as a function of time. A variable is specified as v_name, where name is the variable name. Any of the three variables can be specified as NULL, in which case no displacement is calculated in that dimension.  

Note that equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a region displacement that change as a function of time or spans consecutive runs in a continuous fashion. For the latter, see the start and stop keywords of the run command and the elaplong keyword of thermo_style custom for details.  

For example, these commands would displace a region from its initial position, in the positive x direction, effectively at a constant velocity:  

variable dx equal ramp(0,10) region 2 sphere 10.0 10.0 0.0 5 move v_dx NULL NULL  

Note that the initial displacement is 0.0, though that is not required.  

Either of these variables would “wiggle” the region back and forth in the y direction:  

variable dy equal swiggle(0,5,100) variable dysame equal $5^{*}\mathrm{sin}(2^{*}\mathrm{PI^{*}e l a p l o n g^{*}d t}/100)$ region 2 sphere 10.0 10.0 0.0 5 move NULL v_dy NULL  

The rotate keyword rotates the region around a rotation axis $R=(\mathrm{Rx},\mathrm{Ry},\mathrm{Rz})$ that goes through a point $P=(\mathrm{Px},\mathrm{Py},\mathrm{Pz})$ . The rotation angle is calculated, presumably as a function of time, by a variable specified as v_theta, where theta is the variable name. The variable should generate its result in radians. The direction of rotation for the region around the rotation axis is consistent with the right-hand rule: if your right-hand thumb points along $R$ , then your fingers wrap around the axis in the direction of rotation.  

The move and rotate keywords can be used together. In this case, the displacement specified by the move keyword is applied to the $P$ point of the rotate keyword.  

# 1.88. region command  

The open keyword can be used (multiple times) to indicate that one or more faces of the region are ignored for purposes of particle/wall interactions. This keyword is only relevant for regions used by the fix wall/region and $f\boldsymbol{u}\boldsymbol{x}$ wall/gran/region commands. It can be used to create “open” containers where only some of the region faces are walls. For example, a funnel can be created with a cone style region that has an open face at the smaller radius for particles to flow out, or at the larger radius for pouring particles into the cone, or both.  

Note that using the open keyword partly overrides the side keyword, since both exterior and interior surfaces of an open region are tested for particle contacts. The exception to this is a union or intersect region which includes an open sub-region. In that case the side keyword is still used to define the union/intersect region volume, and the open settings are only applied to the individual sub-regions that use them.  

The indices specified as part of the open keyword have the following meanings:  

For style block, indices 1-6 correspond to the xlo, xhi, ylo, yhi, zlo, zhi surfaces of the block. I.e. 1 is the yz plane at x $=$ xlo, 2 is the yz-plane at $\mathbf{X}=\mathbf{X}\mathbf{h}\mathbf{i}$ , 3 is the xz plane at $\mathrm{y}=\mathrm{ylo}$ , 4 is the xz plane at $\mathbf{y}=\mathbf{y}\mathbf{h}\mathbf{i}$ , 5 is the xy plane at $\mathbf{Z}=\mathbf{Z}\mathbf{l}\mathbf{o}$ , 6 is the xy plane at ${\bf{Z}}={\bf{z h i}}$ ). In the second-to-last example above, the region is a box open at both xy planes.  

For style prism, values 1-6 have the same mapping as for style block. I.e. in an untilted prism, open indices correspond to the xlo, xhi, ylo, yhi, zlo, zhi surfaces.  

For style cylinder, index 1 corresponds to the flat end cap at the low coordinate along the cylinder axis, index 2 corresponds to the high-coordinate flat end cap along the cylinder axis, and index 3 is the curved cylinder surface. For example, a cylinder region with open 1 open 2 keywords will be open at both ends (e.g. a section of pipe), regardless of the cylinder orientation.  

For style cone, the mapping is the same as for style cylinder. Index 1 is the low-coordinate flat end cap, index 2 is the high-coordinate flat end cap, and index 3 is the curved cone surface. In the last example above, a cone region is defined along the z-axis that is open at the zlo value (e.g. for use as a funnel).  

For all other styles, the open keyword is ignored. As indicated above, this includes the intersect and union regions, though their sub-regions can be defined with the open keyword.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

![](images/f11f2963a2bc5cf3600e567dad476a5ecd6f6c2caece122e37f5a37d9b86c73e.jpg)  

# Note  

Currently, only block and sphere style regions are supported by KOKKOS. The code using the region (such as a fix or compute) must also be supported by KOKKOS or no acceleration will occur.  

# 1.88.4 Restrictions  

A prism cannot be of 0.0 thickness in any dimension; use a small z thickness for 2d simulations. For 2d simulations, the xz and yz parameters must be 0.0.  

# 1.88.5 Related commands  

lattice, create_atoms, delete_atoms, group  

# 1.88.6 Default  

The option defaults are side $=$ in, units $=$ lattice, and no move or rotation.  

# 1.89 replicate command  

# 1.89.1 Syntax  

nx,ny,nz $=$ replication factors in each dimension  

• zero or more keywords may be appended • keyword $=$ bbox or bond/periodic  

bbox $=$ use a bounding-box algorithm which is faster for large proc counts bond/periodic $=$ use an algorithm that correctly replicates periodic bond loops  

# 1.89.2 Examples  

For examples of replicating simple linear polymer chains (periodic or non-periodic) or periodic carbon nanotubes, see examples/replicate.  

replicate 2 3 2 replicate 2 3 2 bbox replicate 2 3 2 bond/periodic  

# 1.89.3 Description  

Replicate the current system one or more times in each dimension. For example, replication factors of 2,2,2 will create a simulation with $8\mathbf{x}$ as many atoms by doubling the size of the simulation box in each dimension. A replication factor of 1 leaves the simulation domain unchanged in that dimension.  

When the new simulation box is created it is partitioned into a regular 3d grid of rectangular bricks, one per processor, based on the number of processors being used and the settings of the processors command. The partitioning can be changed by subsequent balance or fix balance commands.  

All properties of each atom are replicated (except per-atom fix data, see the Restrictions section below). This includes their velocities, which may or may not be desirable. New atom IDs are assigned to new atoms, as are new molecule IDs. Bonds and other topology interactions are created between pairs of new atoms as well as between old and new atoms.  

# Note  

The bond discussion which follows only refers to models with permanent covalent bonds typically defined in LAMMPS via a data file. It is not relevant to systems modeled with many-body potentials which can define bonds on-the-fly, based on the current positions of nearby atoms, e.g. models using the AIREBO or ReaxFF potentials.  

If the bond/periodic keyword is not specified, bond replication is done by using the image flag for each atom to “unwrap” it out of the periodic box before replicating it. After replication is performed, atoms outside the new periodic box are wrapped back into it. This assigns correct images flags to all atoms in the system. For this to work, all original atoms in the original simulation box must have consistent image flags. This means that if two atoms have a bond between them which crosses a periodic boundary, their respective image flags will differ by 1 in that dimension.  

Image flag consistency is not possible if a system has a periodic bond loop, meaning there is a chain of bonds which crosses an entire dimension and re-connects to itself across a periodic boundary. In this case you MUST use the bond/periodic keyword to correctly replicate the system. This option zeroes the image flags for all atoms and uses a different algorithm to find new (nearby) bond neighbors in the replicated system. In the final replicated system all image flags are zero (in each dimension).  

![](images/4399d43c926faafcc5990626992d813afe98f18fdcb3412aaba5e8acf32a23c4.jpg)  

# Note  

LAMMPS does not check for image flag consistency before performing the replication (it does issue a warning about this before a simulation is run). If the original image flags are inconsistent, the replicated system will also have inconsistent image flags, but will otherwise be correctly replicated. This is NOT the case if there is a periodic bond loop. See the next note.  

# Note  

LAMMPS does not check for periodic bond loops. If you use the bond/periodic keyword for a system without periodic bond loops, the system will be correctly replicated, but image flag information will be lost (which may or may not be important to your model). If you do not use the bond/periodic keyword for a system with periodic bond loops, the replicated system will have invalid bonds (typically very long), resulting in bad dynamics.  

If possible, the bbox keyword should be used when running on a large number of processors, as it can result in a substantial speed-up for the replication operation. It uses a bounding box to only check atoms in replicas that overlap with each processor’s new subdomain when assigning atoms to processors. It also preserves image flag information. The only drawback to the bbox option is that it requires a temporary use of more memory. Each processor must be able to store all atoms (and their per-atom data) in the original system, before it is replicated.  

# Note  

The algorithm used by the bond/periodic keyword builds on the algorithm used by the bbox keyword and thus has the same memory requirements. If you specify only the bond/peridoic keyword it will internally set the bbox keyword as well.  

# 1.89.4 Restrictions  

A 2d simulation cannot be replicated in the z dimension.  

If a simulation is non-periodic in a dimension, care should be used when replicating it in that dimension, as it may generate atoms nearly on top of each other.  

If the current simulation was read in from a restart file (before a run is performed), there must not be any fix information stored in the file for individual atoms. Similarly, no fixes can be defined at the time the replicate command is used that require vectors of atom information to be stored. This is because the replicate command does not know how to replicate that information for new atoms it creates.  

To work around this restriction two options are possible. (1) Fixes which use the stored data in the restart file can be defined before replication and then deleted via the unfix command and re-defined after it. Or (2) the restart file can be converted to a data file (which deletes the stored fix information) and fixes defined after the replicate command. In both these scenarios, the per-atom fix information in the restart file is lost.  

# 1.89.5 Related commands  

none  

# 1.89.6 Default  

No settings for using the bbox or bond/periodic algorithms.  

# 1.90 rerun command  

# 1.90.1 Syntax  

rerun file1 file2 ... keyword args ...  

• file1,file2,. . . $=$ dump file(s) to read • one or more keywords may be appended, keyword dump must appear and be last  

keyword $=$ first or last or every or skip or start or stop or post or dump   
first $\mathrm{args}=\mathrm{Nfirst}$ Nfirst $=$ dump timestep to start on   
last $\mathrm{args}=\mathrm{Nlast}$ Nlast $=$ dumptimestep to stop on   
every $\mathrm{args}=\mathrm{Nevery}$ Nevery $=$ read snapshots matching every this many timesteps   
skip $\mathrm{args=Nskip}$ Nskip = read one out of every Nskip snapshots   
start args = Nstart Nstart $=$ timestep on which pseudo run will start   
stop args $=$ Nstop Nstop $=$ timestep to which pseudo run will end   
post value = yes or no   
dump args $=$ same as read_dump command starting with its field arguments  

# 1.90.2 Examples  

rerun dump.file dump x y z vx vy vz   
rerun dump1.txt dump2.txt first 10000 every 1000 dump x y z   
rerun dump.vels dump x y z vx vy vz box yes format molfile lammpstrj   
rerun dump.dcd dump x y z box no format molfile dcd   
rerun ../run7/dump.file.gz skip 2 dump x y z box yes   
rerun dump.bp dump x y z box no format adios   
rerun dump.bp dump x y z vx vy vz format adios timeout 10.0  

# 1.90. rerun command  

# 1.90.3 Description  

Perform a pseudo simulation run where atom information is read one snapshot at a time from a dump file(s), and energies and forces are computed on the shapshot to produce thermodynamic or other output.  

This can be useful in the following kinds of scenarios, after an initial simulation produced the dump file:  

• Compute the energy and forces of snapshots using a different potential.   
• Calculate one or more diagnostic quantities on the snapshots that were not computed in the initial run. These can also be computed with settings not used in the initial run, e.g. computing an RDF via the compute rdf command with a longer cutoff than was used initially.   
• Calculate the portion of per-atom forces resulting from a subset of the potential. E.g. compute only Coulombic forces. This can be done by only defining only a Coulombic pair style in the rerun script. Doing this in the original script would result in different (bad) dynamics.  

Conceptually, using the rerun command is like running an input script that has a loop in it (see the next and jump commands). Each iteration of the loop reads one snapshot from the dump file via the read_dump command, sets the timestep to the appropriate value, and then invokes a run command for zero timesteps to simply compute energy and forces, and any other thermodynamic output or diagnostic info you have defined. This computation also invokes any fixes you have defined that apply constraints to the system, such as fix shake or fix indent.  

Note that a simulation box must already be defined before using the rerun command. This can be done by the create_box, read_data, or read_restart commands.  

Also note that reading per-atom information from dump snapshots is limited to the atom coordinates, velocities and image flags as explained in the read_dump command. Other atom properties, which may be necessary to compute energies and forces, such as atom charge, or bond topology information for a molecular system, are not read from (or even contained in) dump files. Thus this auxiliary information should be defined in the usual way, e.g. in a data file read in by a read_data command, before using the rerun command.  

Also note that the frequency of thermodynamic or dump output from the rerun simulation will depend on settings made in the rerun script, the same as for output from any LAMMPS simulation. See further info below as to what that means if the timesteps for snapshots read from dump files do not match the specified output frequency.  

If more than one dump file is specified, the dump files are read one after the other in the order specified. It is assumed that snapshot timesteps will be in ascending order. If a snapshot is encountered that is not in ascending order, it will skip the snapshot until it reads one that is. This allows skipping of a duplicate snapshot (same timestep), e.g. that appeared at the end of one file and beginning of the next. However if you specify a series of dump files in an incorrect order (with respect to the timesteps they contain), you may skip large numbers of snapshots.  

Note that the dump files specified as part of the dump keyword can be parallel files, i.e. written as multiple files either per processor and/or per snapshot. If that is the case they will also be read in parallel which can make the rerun command operate dramatically faster for large systems. See the page for the read_dump and dump commands which describe how to read and write parallel dump files.  

The first, last, every, skip keywords determine which snapshots are read from the dump file(s). Snapshots are skipped until they have a timestep $>=N f t r s t$ . When a snapshot with a timestep $>$ Nlast is encountered, the rerun command finishes. Note that the defaults for first and last are to read all snapshots. If the every keyword is set to a value $>0$ , then only snapshots with timesteps that are a multiple of Nevery are read (the first snapshot is always read). If $N e\nu e r y=0$ , then this criterion is ignored, i.e. every snapshot is read that meets the other criteria. If the skip keyword is used, then after the first snapshot is read, every Nth snapshot is read, where $\Nu=N s k i p$ . E.g. if $N s k i p=3$ , then only 1 out of every 3 snapshots is read, assuming the snapshot timestep is also consistent with the other criteria.  

# Note  

Not all dump formats contain the timestep and not all dump readers support reading it. In that case individual snapshots are assigned consecutive timestep numbers starting at 1.  

The start and stop keywords do not affect which snapshots are read from the dump file(s). Rather, they have the same meaning that they do for the run command. They only need to be defined if (a) you are using a fix command that changes some value over time, and (b) you want the reference point for elapsed time (from start to stop) to be different than the first and last settings. See the page for individual fixes to see which ones can be used with the start/stop keywords. Note that if you define neither of the start/stop or first/last keywords, then LAMMPS treats the pseudo run as going from 0 to a huge value (effectively infinity). This means that any quantity that a fix scales as a fraction of elapsed time in the run, will essentially remain at its initial value. Also note that an error will occur if you read a snapshot from the dump file with a timestep value larger than the stop setting you have specified.  

The post keyword can be used to minimize the output to the screen that happens after a rerun command, similar to the post keyword of the run command. It is set to no by default.  

The dump keyword is required and must be the last keyword specified. Its arguments are passed internally to the read_dump command. The first argument following the dump keyword should be the field1 argument of the read_dump command. See the read_dump page for details on the various options it allows for extracting information from the dump file snapshots, and for using that information to alter the LAMMPS simulation.  

In general, a LAMMPS input script that uses a rerun command can include and perform all the usual operations of an input script that uses the run command. There are a few exceptions and points to consider, as discussed here.  

Fixes that perform time integration, such as fix nve or fix npt are not invoked, since no time integration is performed. Fixes that perturb or constrain the forces on atoms will be invoked, just as they would during a normal run. Examples are fix indent and fix langevin. So you should think carefully as to whether that makes sense for the manner in which you are reprocessing the dump snapshots.  

If you only want the rerun script to perform an analysis that does not involve pair interactions, such as use compute msd to calculated displacements over time, you do not need to define a pair style, which may also mean neighbor lists will not need to be calculated which saves time. The comm_modify cutoff command can also be used to ensure ghost atoms are acquired from far enough away for operations like bond and angle evaluations, if no pair style is being used.  

Every time a snapshot is read, the timestep for the simulation is reset, as if the reset_timestep command were used. This command has some restrictions as to what fixes can be defined. See its documentation page for details. For example, the fix deposit and fix dt/reset fixes are in this category. They also make no sense to use with a rerun command.  

If time-averaging fixes like fix ave/time are used, they are invoked on timesteps that are a function of their Nevery, Nrepeat, and Nfreq settings. As an example, see the fix ave/time page for details. You must ensure those settings are consistent with the snapshot timestamps that are read from the dump file(s). If an averaging fix is not invoked on a timestep it expects to be, LAMMPS will flag an error.  

The various forms of LAMMPS output, as defined by the thermo_style, thermo, dump, and restart commands occur with specified frequency, e.g. every N steps. If the timestep for a dump snapshot is not a multiple of N, then it will be read and processed, but no output will be produced. If you want output for every dump snapshot, you can simply use ${\tt N}{=}1$ for an output frequency, e.g. for thermodynamic output or new dump file output.  

# 1.90.4 Restrictions  

The rerun command is subject to all restrictions of the read_dump command.  

# 1.90.5 Related commands  

read_dump  

# 1.90.6 Default  

The option defaults are first $=0$ , last $=$ a huge value (effectively infinity), start $=$ same as first, stop $=$ same as last, every $=0$ , $\mathrm{skip}=1$ , $\mathrm{post}=\mathrm{no}$ ;  

# 1.91 reset_atoms command  

# 1.91.1 Syntax  

• property $=$ id or image or mol • additional arguments depend on the property reset_atoms id keyword value ...  

– zero or more keyword/value pairs can be appended   
– keyword $=$ sort sort value $=$ yes or no  

reset_atoms image group-ID  

– group- $\cdot\mathrm{ID}=\mathrm{ID}$ of group of atoms whose image flags will be reset reset_atoms mol group-ID keyword value ...  

– group- $\cdot\mathrm{ID}=\mathrm{ID}$ of group of atoms whose molecule IDs will be reset   
– zero or more keyword/value pairs can be appended   
– keyword $=$ compress or offset or single compress value $\mathbf{\mu}=\mathbf{y}\mathrm{es}$ or no offset value $=$ Noffset $>=-1$ single value $=$ yes or no to treat single atoms (no bonds) as molecules  

# 1.91.2 Examples  

reset_atoms id   
reset_atoms id sort yes   
reset_atoms image all   
reset_atoms image mobile   
reset_atoms mol all   
reset_atoms mol all offset 10 single yes   
reset_atoms mol solvent compress yes offset 100   
reset_atoms mol solvent compress no  

# 1.91.3 Description  

Added in version 22Dec2022.  

The reset_atoms command resets the values of a specified atom property. In contrast to the set command, it does this in a collective manner which resets the values for many atoms in a self-consistent way. This command is often useful when the simulated system has undergone significant modifications like adding or removing atoms or molecules, joining data files, changing bonds, or large-scale diffusion.  

The new values can be thought of as a reset, similar to values atoms would have if a new data file were being read or a new simulation performed. Note that the set command also resets atom properties to new values, but it treats each atom independently.  

The property setting can be id or image or mol. For id, the IDs of all the atoms are reset to contiguous values. For image, the image flags of atoms in the specified group- $I D$ are reset so that at least one atom in each molecule is in the simulation box (image flag $=0$ ). For mol, the molecule IDs of all atoms are reset to contiguous values.  

More details on these operations and their arguments or optional keyword/value settings are given below.  

Property: id  

Reset atom IDs for the entire system, including all the global IDs stored for bond, angle, dihedral, improper topology data. This will create a set of IDs that are numbered contiguously from 1 to N for a N atoms system.  

This can be useful to do after performing a “delete_atoms” command for a molecular system. The delete_atoms compress yes option will not perform this operation due to the existence of bond topology. It can also be useful to do after any simulation which has lost atoms, e.g. due to atoms moving outside a simulation box with fixed boundaries (see the “boundary command”), or due to evaporation (see the “fix evaporate” command).  

If the sort keyword is used with a setting of yes, then the assignment of new atom IDs will be the same no matter how many processors LAMMPS is running on. This is done by first doing a spatial sort of all the atoms into bins and sorting them within each bin. Because the set of bins is independent of the number of processors, this enables a consistent assignment of new IDs to each atom.  

This can be useful to do after using the “create_atoms” command and/or “replicate” command. In general those commands do not guarantee assignment of the same atom ID to the same physical atom when LAMMPS is run on different numbers of processors. Enforcing consistent IDs can be useful for debugging or comparing output from two different runs.  

Note that the spatial sort requires communication of atom IDs and coordinates between processors in an all-to-all manner. This is done efficiently in LAMMPS, but it is more expensive than how atom IDs are reset without sorting.  

Note that whether sorting or not, the resetting of IDs is not a compression, where gaps in atom IDs are removed by decrementing atom IDs that are larger. Instead the IDs for all atoms are erased, and new IDs are assigned so that the atoms owned by an individual processor have consecutive IDs, as the create_atoms command explains.  

![](images/08dc6fe68c72b8d194b25eb058cd40aa8142d800f1e1184de3d45b302b1f303c.jpg)  

# Note  

If this command is used before a pair style is defined, an error about bond topology atom IDs not being found may result. This is because the cutoff distance for ghost atom communication was not sufficient to find atoms in bonds, angles, etc that are owned by other processors. The comm_modify cutoff command can be used to correct this issue. Or you can define a pair style before using this command. If you do the former, you should unset the comm_modify cutoff after using reset atoms id so that subsequent communication is not inefficient.  

Property: image  

Reset the image flags of atoms so that at least one atom in each molecule has an image flag of 0. Molecular topology is respected so that if the molecule straddles a periodic simulation box boundary, the images flags of all atoms in the molecule will be consistent. This avoids inconsistent image flags that could result from resetting all image flags to zero with the set command.  

![](images/f7b5faf00e6f01d352ac9717f73dd0ccc353ff9d894b0a5c3764ba6187124a5e.jpg)  

# Note  

If the system has no bonds, there is no reason to use this command, since image flags for different atoms do not need to be consistent. Use the set command with its image keyword instead.  

Only image flags for atoms in the specified group- $\mathbf{\nabla}\cdot I D$ are reset; all others remain unchanged. No check is made for whether the group covers complete molecule fragments and thus whether the command will result in inconsistent image flags.  

Molecular fragments are identified by the algorithm used by the compute fragment/atom command. For each fragment the average of the largest and the smallest image flag in each direction across all atoms in the fragment is computed and subtracted from the current image flag in the same direction.  

This can be a useful operation to perform after running longer equilibration runs of mobile systems where molecules would pass through the system multiple times and thus produce non-zero image flags.  

![](images/9dd345da72064537e4cbdf5dcd7116c4195486107ebdd3de9a57ff076ca0345b.jpg)  

# Note  

Same as explained for the compute fragment/atom command, molecules are identified using the current bond topology. This will not account for bonds broken by the bond_style quartic command, because this bond style does not perform a full update of the bond topology data structures within LAMMPS. In that case, using the delete_bonds all bond 0 remove will permanently delete such broken bonds and should thus be used first.  

Property: mol  

Reset molecule IDs for a specified group of atoms based on current bond connectivity. This will typically create a new set of molecule IDs for atoms in the group. Only molecule IDs for atoms in the specified group- $\cdot I D$ are reset; molecule IDs for atoms not in the group are not changed.  

For purposes of this operation, molecules are identified by the current bond connectivity in the system, which may or may not be consistent with the current molecule IDs. A molecule in this context is a set of atoms connected to each other with explicit bonds. The specific algorithm used is the one of compute fragment/atom. Once the molecules are identified and a new molecule ID computed for each, this command will update the current molecule ID for all atoms in the group with the new molecule ID. Note that if the group excludes atoms within molecules, one (physical) molecule may become two or more (logical) molecules. For example if the group excludes atoms in the middle of a linear chain, then each end of the chain is considered an independent molecule and will be assigned a different molecule ID.  

This can be a useful operation to perform after running reactive molecular dynamics run with fix bond/react, fix bond/create, or fix bond/break, all of which can change molecule topologies. It can also be useful after molecules have been deleted with the delete_atoms command or after a simulation which has lost molecules, e.g. via the $f\alpha$ evaporate command.  

The compress keyword determines how new molecule IDs are computed. If the setting is yes (the default) and there are N molecules in the group, the new molecule IDs will be a set of N contiguous values. See the offset keyword for details on selecting the range of these values. If the setting is $n o$ , the molecule ID of every atom in the molecule will be set to the smallest atom ID of any atom in the molecule.  

The single keyword determines whether single atoms (not bonded to another atom) are treated as one-atom molecules or not, based on the yes or no setting. If the setting is no (the default), their molecule IDs are set to 0. This setting can be important if the new molecule IDs will be used as input to other commands such as compute chunk/atom molecule or fix rigid molecule.  

The offset keyword is only used if the compress setting is yes. Its default value is $N o f f s e t=-1$ . In that case, if the specified group is all, then the new compressed molecule IDs will range from 1 to N. If the specified group is not all and the largest molecule ID of atoms outside that group is M, then the new compressed molecule IDs will range from $_{\mathrm{M}+1}$ to $\mathbf{M}{+}\mathbf{N}.$ , to avoid collision with existing molecule IDs. If an Noffset $>=0$ is specified, then the new compressed molecule IDs will range from Noffset $+1$ to Noffset $\mathbf{+N}$ . If the group is not all there may be collisions with the molecule IDs of other atoms.  

![](images/6c969b627985702d6772ab5bc607e93144d6fac8cc0d0f3b4e3ba7c678a74582.jpg)  

# Note  

Same as explained for the compute fragment/atom command, molecules are identified using the current bond topology. This will not account for bonds broken by the bond_style quartic command, because this bond style does not perform a full update of the bond topology data structures within LAMMPS. In that case, using the delete_bonds all bond 0 remove will permanently delete such broken bonds and should thus be used first.  

# 1.91.4 Restrictions  

The image property can only be used when the atom style supports bonds.  

# 1.91.5 Related commands  

compute fragment/atom, fix bond/react, fix bond/create, fix bond/break, fix evaporate, delete_atoms, delete_bonds  

# 1.91.6 Defaults  

For property id, the default keyword setting is sort $\mathbf{\tau}=\mathbf{n}\mathbf{O}$ .   
For property mol, the default keyword settings are compress $=$ yes, single $=$ no, and offset $=-1$ .  

# 1.92 reset_timestep command  

# 1.92.1 Syntax  

reset_timestep N keyword values ...  

• $\Nu=$ timestep number   
• zero or more keyword/value pairs may be appended   
• keyword $=$ time time value $=$ atime atime $=$ accumulated simulation time  

# 1.92.2 Examples  

reset_timestep 0   
reset_timestep 4000000   
reset_timestep 1000 time 100.0  

# 1.92.3 Description  

Set the timestep counter to the specified value. This command usually comes after the timestep has been set by reading a restart file via the read_restart command, or a previous simulation run or minimization advanced the timestep.  

The optional time keyword allows to also set the accumulated simulation time. This is usually the number of timesteps times the size of the timestep, but when using variable size timesteps with fix dt/reset it can differ.  

The read_data and create_box commands set the timestep to 0; the read_restart command sets the timestep to the value it had when the restart file was written. The same applies to the accumulated simulation time.  

# 1.92.4 Restrictions  

This command cannot be used when any fixes are defined that keep track of elapsed time to perform certain kinds of time-dependent operations. Examples are the fix deposit and fix dt/reset commands. The former adds atoms on specific timesteps. The latter keeps track of accumulated time.  

Various fixes use the current timestep to calculate related quantities. If the timestep is reset, this may produce unexpected behavior, but LAMMPS allows the fixes to be defined even if the timestep is reset. For example, commands which thermostat the system, e.g. fix nvt, allow you to specify a target temperature which ramps from Tstart to Tstop which may persist over several runs. If you change the timestep, you may induce an instantaneous change in the target temperature.  

Resetting the timestep clears flags for computes that may have calculated some quantity from a previous run. This means these quantity cannot be accessed by a variable in between runs until a new run is performed. See the variable command for more details.  

# 1.92.5 Related commands  

rerun, timestep, fix dt/reset  

# 1.92.6 Default  

none  

# 1.93 restart command  

# 1.93.1 Syntax  

restart 0 restart N root keyword value ... restart N file1 file2 keyword value ...  

• $\Nu=$ write a restart file on timesteps which are multiples of N   
• N can be a variable (see below)   
• root $=$ filename to which timestep # is appended   
• file1,file2 $=$ two full filenames, toggle between them when writing file   
• zero or more keyword/value pairs may be appended   
• keyword $=$ fileper or nfile   
fileper $\mathrm{arg}=\mathrm{Np}$   
$\mathrm{Np}=$ write one file for every this many processors   
nfile $\mathrm{arg}=\mathrm{Nf}$ $\mathrm{Nf}=$ write this many files, one from each of Nf processors  

# 1.93.2 Examples  

restart 0   
restart 1000 poly.restart   
restart 1000 restart.\*.equil   
restart 10000 poly.%.1 poly.%.2 nfile 10   
restart v_mystep poly.restart  

# 1.93.3 Description  

Write out a binary restart file with the current state of the simulation on timesteps which are a multiple of N. A value of $\Nu=0$ means do not write out any restart files, which is the default. Restart files are written in one (or both) of two modes as a run proceeds. If one filename is specified, a series of filenames will be created which include the timestep in the filename. If two filenames are specified, only 2 restart files will be created, with those names. LAMMPS will toggle between the 2 names as it writes successive restart files.  

Note that you can specify the restart command twice, once with a single filename and once with two filenames. This would allow you, for example, to write out archival restart files every 100000 steps using a single filename, and more frequent temporary restart files every 1000 steps, using two filenames. Using restart 0 will turn off both modes of output.  

Similar to dump files, the restart filename(s) can contain two wild-card characters.  

If a “\*” appears in the single filename, it is replaced with the current timestep value. This is only recognized when a single filename is used (not when toggling back and forth). Thus, the third example above creates restart files as follows: restart.1000.equil, restart.2000.equil, etc. If a single filename is used with no “\*”, then the timestep value is appended. E.g. the second example above creates restart files as follows: poly.restart.1000, poly.restart.2000, etc.  

If a $^{66}\%^{!}$ ” character appears in the restart filename(s), then one file is written for each processor and the $^{\leftarrow6}\%^{\cdot}$ character is replaced with the processor ID from 0 to P-1. An additional file with the $^{\leftarrow6}\%^{,5}$ replaced by “base” is also written, which contains global information. For example, the files written on step 1000 for filename restart. $\%$ would be restart.base.1000, restart.0.1000, restart.1.1000, . . . , restart.P-1.1000. This creates smaller files and can be a fast mode of output and subsequent input on parallel machines that support parallel I/O. The optional fileper and nfile keywords discussed below can alter the number of files written.  

Restart files are written on timesteps that are a multiple of N but not on the first timestep of a run or minimization. You can use the write_restart command to write a restart file before a run begins. A restart file is not written on the last timestep of a run unless it is a multiple of N. A restart file is written on the last timestep of a minimization if $\Nu>0$ and the minimization converges.  

Instead of a numeric value, N can be specified as an equal-style variable, which should be specified as v_name, where name is the variable name. In this case, the variable is evaluated at the beginning of a run to determine the next timestep at which a restart file will be written out. On that timestep, the variable will be evaluated again to determine the next timestep, etc. Thus the variable should return timestep values. See the stagger() and logfreq() and stride() math functions for equal-style variables, as examples of useful functions to use in this context. Other similar math functions could easily be added as options for equal-style variables.  

For example, the following commands will write restart files every step from 1100 to 1200, and could be useful for debugging a simulation where something goes wrong at step 1163:  

variable s equal stride(1100,1200,1) restart v_s tmp.restart  

See the read_restart command for information about what is stored in a restart file.  

# 1.93. restart command  

Restart files can be read by a read_restart command to restart a simulation from a particular state. Because the file is binary (to enable exact restarts), it may not be readable on another machine. In this case, you can use the -r commandline switch to convert a restart file to a data file.  

# Note  

Although the purpose of restart files is to enable restarting a simulation from where it left off, not all information about a simulation is stored in the file. For example, the list of fixes that were specified during the initial run is not stored, which means the new input script must specify any fixes you want to use. Even when restart information is stored in the file, as it is for some fixes, commands may need to be re-specified in the new input script, in order to re-use that information. See the read_restart command for information about what is stored in a restart file.  

The optional nfile or fileper keywords can be used in conjunction with the $^{66}\%^{!}$ ” wildcard character in the specified restart file name(s). As explained above, the $^{66}\%^{,}$ character causes the restart file to be written in pieces, one piece for each of P processors. By default $\mathrm{P}=$ the number of processors the simulation is running on. The nfile or fileper keyword can be used to set $\mathrm{\bfP}$ to a smaller value, which can be more efficient when running on a large number of processors.  

The nfile keyword sets $\mathrm{\bfP}$ to the specified Nf value. For example, if $\mathrm{Nf}=4$ , and the simulation is running on 100 processors, 4 files will be written, by processors 0,25,50,75. Each will collect information from itself and the next 24 processors and write it to a restart file.  

For the fileper keyword, the specified value of $\mathrm{Np}$ means write one file for every $\mathrm{Np}$ processors. For example, if ${\mathrm{Np}}=$ 4, every fourth processor (0,4,8,12,etc) will collect information from itself and the next 3 processors and write it to a restart file.  

# 1.93.4 Restrictions  

none  

# 1.93.5 Related commands  

write_restart, read_restart  

# 1.93.6 Default  

upto value $=$ none   
start value $=\mathrm{N}1$ $\mathrm{N1=}$ timestep at which 1st run started   
stop value = N2 N2 = timestep at which last run will end   
pre value = no or yes   
post value $=\mathrm{no}$ or yes   
every values = M c1 c2 ... $\mathrm{M}=$ break the run into M-timestep segments and invoke one or more commands between each␣   
$\hookrightarrow$ segment c1,c2,...,cN $=$ one or more LAMMPS commands, each enclosed in quotes $\mathrm{c1}=\mathrm{NULL}$ means no command will be invoked  

# 1.94.2 Examples  

run 10000   
run 1000000 upto   
run 100 start 0 stop 1000   
run 1000 pre no post yes   
run 100000 start 0 stop 1000000 every 1000 "print 'Protein $\mathrm{Rg}=\mathfrak{S}\mathrm{r}^{\mathfrak{m}}$   
run 100000 every 1000 NULL  

# 1.94.3 Description  

Run or continue dynamics for a specified number of timesteps.  

When the run style is respa, N refers to outer loop (largest) timesteps.  

A value of $\mathbf N=0$ is acceptable; only the thermodynamics of the system are computed and printed without taking a timestep.  

The upto keyword means to perform a run starting at the current timestep up to the specified timestep. E.g. if the current timestep is 10,000 and “run 100000 upto” is used, then an additional 90,000 timesteps will be run. This can be useful for very long runs on a machine that allocates chunks of time and terminate your job when time is exceeded. If you need to restart your script multiple times (reading in the last restart file), you can keep restarting your script with the same run command until the simulation finally completes.  

The start or stop keywords can be used if multiple runs are being performed and you want a $f\alpha$ command that changes some value over time (e.g. temperature) to make the change across the entire set of runs and not just a single run. See the page for individual fixes to see which ones can be used with the start/stop keywords.  

For example, consider this fix followed by 10 run commands:  

<html><body><table><tr><td>fix</td><td>1 all nvt 200.0 300.0 1.0</td></tr><tr><td></td><td></td></tr><tr><td>run</td><td>1000 start 0 stop 10000</td></tr><tr><td>run</td><td>1000 start 0 stop 10000</td></tr><tr><td>run</td><td>1000 start 0 stop 10000</td></tr></table></body></html>  

The NVT fix ramps the target temperature from 200.0 to 300.0 during a run. If the run commands did not have the start/stop keywords (just “run $1000^{,}$ ), then the temperature would ramp from 200.0 to 300.0 during the 1000 steps of each run. With the start/stop keywords, the ramping takes place over the 10000 steps of all runs together.  

The pre and post keywords can be used to streamline the setup, clean-up, and associated output to the screen that happens before and after a run. This can be useful if you wish to do many short runs in succession (e.g. LAMMPS is being called as a library which is doing other computations between successive short LAMMPS runs).  

By default (pre and post $=$ yes), LAMMPS creates neighbor lists, computes forces, and imposes fix constraints before every run. And after every run it gathers and prints timings statistics. If a run is just a continuation of a previous run (i.e. no settings are changed), the initial computation is not necessary; the old neighbor list is still valid as are the forces. So if pre is specified as “no” then the initial setup is skipped, except for printing thermodynamic info. Note that if pre is set to “no” for the very first run LAMMPS performs, then it is overridden, since the initial setup computations must be done.  

![](images/6aa33a0577f8c8e104fa4b02d5ea9bbb4cf0d049bb597a40c4b1775b9ed7ffcb.jpg)  

# Note  

If your input script changes the system between 2 runs, then the initial setup must be performed to ensure the change is recognized by all parts of the code that are affected. Examples are adding a $f\boldsymbol{{x}}$ or dump or compute, changing a neighbor list parameter, or writing restart file which can migrate atoms between processors. LAMMPS has no easy way to check if this has happened, but it is an error to use the pre no option in this case.  

If post is specified as “no”, the full timing summary is skipped; only a one-line summary timing is printed.  

The every keyword provides a means of breaking a LAMMPS run into a series of shorter runs. Optionally, one or more LAMMPS commands (c1, c2, . . . , cN) will be executed in between the short runs. If used, the every keyword must be the last keyword, since it has a variable number of arguments. Each of the trailing arguments is a single LAMMPS command, and each command should be enclosed in quotes, so that the entire command will be treated as a single argument. This will also prevent any variables in the command from being evaluated until it is executed multiple times during the run. Note that if a command itself needs one of its arguments quoted (e.g. the print command), then you can use a combination of single and double quotes, as in the example above or below.  

The every keyword is a means to avoid listing a long series of runs and interleaving commands in your input script. For example, a print command could be invoked or a fix could be redefined, e.g. to reset a thermostat temperature. Or this could be useful for invoking a command you have added to LAMMPS that wraps some other code (e.g. as a library) to perform a computation periodically during a long LAMMPS run. See the Modify doc page for info about how to add new commands to LAMMPS. See the Howto couple page for ideas about how to couple LAMMPS to other codes.  

With the every option, N total steps are simulated, in shorter runs of M steps each. After each M-length run, the specified commands are invoked. If only a single command is specified as NULL, then no command is invoked. Thus these lines:  

<html><body><table><tr><td>variable q equal x[100]</td></tr><tr><td>run 6000 every 2000 "print 'Coord = $q'"</td></tr></table></body></html>  

are the equivalent of:  

variable q equal x[100]   
run 2000   
print "Coord = \$q"   
run 2000   
print "Coord = \$q"   
run 2000   
print "Coord = \$q"  

which does 3 runs of 2000 steps and prints the $\mathbf{X}$ -coordinate of a particular atom between runs. Note that the variable $\mathrm{\hbar}\mathfrak{S}\mathfrak{q}^{,}$ will be evaluated afresh each time the print command is executed.  

Note that by using the line continuation character “&”, the run every command can be spread across many lines, though it is still a single command:  

<html><body><table><tr><td>run 100000 every 1000 & print 'Minimum . value = $a'"</td></tr></table></body></html>  

(continued from previous page)  

"print 'Maximum value = \$b'" & "print 'Temp = \$c'" & "print 'Press = \$d'"  

If the pre and post options are set to “no” when used with the every keyword, then the first run will do the full setup and the last run will print the full timing summary, but these operations will be skipped for intermediate runs.  

![](images/98965533b91590193202bb043adf6432da6a7e955ffbd6b17726bbdb91666324.jpg)  

You might wish to specify a command that exits the run by jumping out of the loop, e.g.  

variable t equal temp run 10000 every 100 "if $^{1}\Phi\mathrm{t}<300.0^{\prime}$ then 'jump SELF afterrun'"  

However, this will not work. The run command simply executes each command one at a time each time it pauses, then continues the run.  

Instead, you should use the fix halt command, which has additional options for how to exit the run.  

# 1.94.4 Restrictions  

When not using the upto keyword, the number of specified timesteps N must fit in a signed 32-bit integer, so you are limited to slightly more than 2 billion steps (2^31) in a single run. When using upto, N can be larger than a signed 32-bit integer, however the difference between N and the current timestep must still be no larger than $2^{\wedge}31$ steps.  

However, with or without the upto keyword, you can perform successive runs to run a simulation for any number of steps (ok, up to $2^{\land}63$ total steps). I.e. the timestep counter within LAMMPS is a 64-bit signed integer.  

# 1.94.5 Related commands  

minimize, run_style, temper, fix halt  

# 1.94.6 Default  

The option defaults are start $=$ the current timestep, stop $=$ current timestep $\mathbf{\Gamma}+\mathbf{N}$ , pre $=$ yes, and post $=$ yes.  

# 1.95 run_style command  

# 1.95.1 Syntax  

$\mathrm{M}=$ which level (1-N) to compute bond forces in   
angle value $=\mathrm{M}$ $\mathrm{M}=$ which level (1-N) to compute angle forces in   
dihedral value = M M = which level (1-N) to compute dihedral forces in   
improper value = M M = which level (1-N) to compute improper forces in   
pair value = M M = which level (1-N) to compute pair forces in   
inner values = M cut1 cut2 M = which level (1-N) to compute pair inner forces in cut1 = inner cutoff between pair inner and pair middle or outer (distance units) cut2 = outer cutoff between pair inner and pair middle or outer (distance units)   
middle values = M cut1 cut2 M = which level (1-N) to compute pair middle forces in cut1 = inner cutoff between pair middle and pair outer (distance units) cut2 = outer cutoff between pair middle and pair outer (distance units)   
outer value = M M = which level (1-N) to compute pair outer forces in   
hybrid values = M1 M2 ... (as many values as there are hybrid sub-styles M1 = which level (1-N) to compute the first pair_style hybrid sub-style in M2 = which level (1-N) to compute the second pair_style hybrid sub-style in M3,etc   
kspace value = M $\mathrm{M}=$ which level (1-N) to compute kspace forces in  

# 1.95.2 Examples  

run_style verlet   
run_style respa 4 2 2 2 bond 1 dihedral 2 pair 3 kspace 4   
run_style respa 4 2 2 2 bond 1 dihedral 2 inner 3 5.0 6.0 outer 4 kspace 4   
run_style respa 3 4 2 bond 1 hybrid 2 2 1 kspace 3  

# 1.95.3 Description  

Choose the style of time integrator used for molecular dynamics simulations performed by LAMMPS.  

The verlet style is the velocity form of the Stoermer-Verlet time integration algorithm (velocity-Verlet)  

The verlet/split style is also a velocity-Verlet integrator, but it splits the force calculation within each timestep over 2 partitions of processors. See the -partition command-line switch for info on how to run LAMMPS with multiple partitions.  

Specifically, this style performs all computation except the kspace_style portion of the force field on the first partition. This include the pair style, bond style, neighbor list building, fixes including time integration, and output. The kspace_style portion of the calculation is performed on the second partition.  

This can lead to a significant speedup, if the number of processors can be easily increased and the fraction of time is spent in computing Kspace interactions is significant, too. The two partitions may have a different number of processors. This is most useful for the PPPM kspace_style when its performance on a large number of processors degrades due to the cost of communication in its 3d FFTs. In this scenario, splitting your P total processors into 2 subsets of processors, P1 in the first partition and P2 in the second partition, can enable your simulation to run faster. This is because the long-range forces in PPPM can be calculated at the same time as pairwise and bonded forces are being calculated and the parallel 3d FFTs can be faster to compute when running on fewer processors. Please note that the scenario of using fewer MPI processes to reduce communication overhead can also be implemented through using MPI with OpenMP threads via the INTEL, KOKKOS, or OPENMP package. This alternative option is typically more effective in case of a fixed number of available processors and less complex to execute.  

To use the verlet/split style, you must define 2 partitions with the -partition command-line switch, where partition P1 is either the same size or an integer multiple of the size of the partition P2. Typically having P1 be $3\mathbf{x}$ larger than P2 is a good choice, since the (serial) performance of LAMMPS is often best if the time spent in the Pair computation versus Kspace is a 3:1 split. The 3d processor layouts in each partition must overlay in the following sense. If P1 is a Px1 by Py1 by $\scriptstyle\mathrm{Pzl}$ grid, and $\ensuremath{\mathsf{P}}2=\ensuremath{\mathsf{P}}\ensuremath{\mathbf{X}}2$ by $\mathrm{Py}2$ by $\scriptstyle{\mathrm{Pz}}2$ , then Px1 must be an integer multiple of $\mathrm{Px}2$ , and similarly for Py1 a multiple of Py2, and $\scriptstyle\mathrm{Pzl}$ a multiple of $\mathrm{Pz}2$ .  

Typically the best way to do this is to let the first partition choose its own optimal layout, then require the second partition’s layout to match the integer multiple constraint. See the processors command with its part keyword for a way to control this, e.g.  

You can also use the partition command to explicitly specify the processor layout on each partition. E.g. for 2 partitions of 60 and 15 processors each:  

<html><body><table><tr><td>partition yes 1 processors 3 4 5</td></tr></table></body></html>  

When you run in 2-partition mode with the verlet/split style, the thermodynamic data for the entire simulation will be output to the log and screen file of the first partition, which are log.lammps.0 and screen.0 by default; see the -plog and -pscreen command-line switches to change this. The log and screen file for the second partition will not contain thermodynamic output beyond the first timestep of the run.  

See the Accelerator packages page for performance details of the speed-up offered by the verlet/split style. One important performance consideration is the assignment of logical processors in the 2 partitions to the physical cores of a parallel machine. The processors command has options to support this, and strategies are discussed in Section 5 of the manual.  

The respa style implements the rRESPA multi-timescale integrator (Tuckerman) with N hierarchical levels, where level 1 is the innermost loop (shortest timestep) and level N is the outermost loop (largest timestep). The loop factor arguments specify what the looping factor is between levels. N1 specifies the number of iterations of level 1 for a single iteration of level 2, N2 is the iterations of level 2 per iteration of level 3, etc. N-1 looping parameters must be specified.  

Thus with a 4-level respa setting of $\mathbf{\Delta}^{66}222^{,99}$ for the 3 loop factors, you could choose to have bond interactions computed 8x per large timestep, angle interactions computed $4\mathbf{x}$ , pair interactions computed $2\mathbf{x}$ , and long-range interactions once per large timestep.  

The timestep command sets the large timestep for the outermost rRESPA level. Thus if the 3 loop factors are $\mathbf{\Delta}^{66}222^{,99}$ for 4-level rRESPA, and the outer timestep is set to 4.0 fs, then the inner timestep would be $8\mathbf{x}$ smaller or 0.5 fs. All other LAMMPS commands that specify number of timesteps (e.g. thermo for thermo output every N steps, neigh_modify delay/every parameters, dump every $\mathbf{N}$ steps, etc) refer to the outermost timesteps.  

The rRESPA keywords enable you to specify at what level of the hierarchy various forces will be computed. If not specified, the defaults are that bond forces are computed at level 1 (innermost loop), angle forces are computed where bond forces are, dihedral forces are computed where angle forces are, improper forces are computed where dihedral forces are, pair forces are computed at the outermost level, and kspace forces are computed where pair forces are. The inner, middle, outer forces have no defaults.  

For fixes that support it, the rRESPA level at which a given fix is active, can be selected through the fix_modify command.  