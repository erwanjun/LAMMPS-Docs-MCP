---
title: "Fix Pour, Precession/Spin, Press/Berendsen"
description: "Particle insertion (pour), magnetic spin precession, Berendsen barostat"
category: "fix"
tags: ["pour", "granular", "spin", "magnetic", "barostat", "pressure"]
commands: ["fix pour", "fix precession/spin", "fix press/berendsen"]
---
The specified insertion region cannot be a “dynamic” region, as defined by the region command.  

# 2.163.6 Related commands  

fix deposit, fix gravity, region  

# 2.163.7 Default  

Insertions are performed for individual particles, i.e. no mol setting is defined. If the mol keyword is used, the default for molfrac is an equal probabilities for all molecules in the template. Additional option defaults are diam $=$ one 1.0, dens $=1.01.0$ , $\mathrm{vol}=0.2550$ , rate $=0.0$ , v $\mathrm{{el}=0.00.00.00.00.00.0}$ (for 3d), vel $=0.00.00.0$ (for 2d), and $\mathrm{id}=\mathrm{max}$ .  

# 2.164 fix precession/spin command  

# 2.164.1 Syntax  

fix ID group precession/spin style args  

• ID, group are documented in fix command precession/spin $=$ style name of this fix command   
• style $=$ zeeman or anisotropy or cubic or stt zeeman $\arg\mathrm{gs}=\mathrm{H}\mathrm{~x~y~z~}$ $\mathrm{H}=$ intensity of the magnetic field (in Tesla) x y $\mathrm{~Z~}=$ vector direction of the field anisotropy $\arg\mathrm{ss}=\mathrm{K}\mathrm{~x~y~z~}$ $\mathrm{K}=$ intensity of the magnetic anisotropy (in eV) x y $\mathrm{~Z~}=$ vector direction of the anisotropy cubic args = K1 K2c n1x n1y n1x n2x n2y n2z n3x n3y n3z K1 and $\mathrm{K2c=}$ intensity of the magnetic anisotropy (in eV) n1x to n3z = three direction vectors of the cubic anisotropy stt args = J x y z $\mathrm{J}=$ intensity of the spin-transfer torque field x y $\mathrm{~Z~}=$ vector direction of the field  

# 2.164.2 Examples  

fix 1 all precession/spin zeeman 0.1 0.0 0.0 1.0   
fix 1 3 precession/spin anisotropy 0.001 0.0 0.0 1.0   
fix 1 iron precession/spin cubic 0.001 0.0005 1.0 0.0 0.0 0.0 1.0 0.0 0.0 0.0 1.0   
fix 1 all precession/spin zeeman 0.1 0.0 0.0 1.0 anisotropy 0.001 0.0 0.0 1.0  

# 2.164.3 Description  

This fix applies a precession torque to each magnetic spin in the group.  

Style zeeman is used for the simulation of the interaction between the magnetic spins in the defined group and an external magnetic field:  

$$
H_{Z e e m a n}=-g\sum_{i=0}^{N}\mu_{i}\vec{s_{i}}\cdot\vec{B}_{e x t}
$$  

with:  

• $\Vec{B}_{e x t}$ the external magnetic field (in T)   
• $g$ the Lande factor (hard-coded as $g=2.0$ )   
• $\vec{s}_{i}$ the unitary vector describing the orientation of spin $i$   
• $\mu_{i}$ the atomic moment of spin $i$ given as a multiple of the Bohr magneton $\mu_{B}$ (for example, $\mu_{i}\approx2.2$ in bulk iron).  

The field value in Tesla is multiplied by the gyromagnetic ratio, $g\cdot\mu_{B}/\hbar$ , converting it into a precession frequency in rad.THz (in metal units and with $\mu_{B}=5.788\cdot10^{-5}\mathrm{eV/T)}$ .  

As a comparison, the figure below displays the simulation of a single spin (of norm $\mu_{i}=1.0$ ) submitted to an external magnetic field of $|B_{e x t}|=10.0$ Tesla (and oriented along the $\mathbf{Z}$ axis). The upper plot shows the average magnetization along the external magnetic field axis and the lower plot the Zeeman energy, both as a function of temperature. The reference result is provided by the plot of the Langevin function for the same parameters.  

![](images/62e7194447eaf2c7cd0202bb128634474850f916b18b570e5688e4a351f0307d.jpg)  

The temperature effects are accounted for by connecting the spin $i$ to a thermal bath using a Langevin thermostat (see fix langevin/spin for the definition of this thermostat).  

Style anisotropy is used to simulate an easy axis or an easy plane for the magnetic spins in the defined group:  

$$
H_{a n i s o}=-\sum_{i=1}^{N}K_{a n}(\mathbf{r}_{i})\:(\vec{s}_{i}\cdot\vec{n}_{i})^{2}
$$  

with $n$ defining the direction of the anisotropy, and $K$ (in $\mathrm{eV}$ ) its intensity. If $K>0$ , an easy axis is defined, and if $K<0$ , an easy plane is defined.  

Style cubic is used to simulate a cubic anisotropy, with three possible easy axis for the magnetic spins in the defined group:  

$$
{_{c u b i c}}=-\sum_{i=1}^{N}K_{1}\left[{\left(\vec{s_{i}}\cdot\vec{n}_{1}\right)}^{2}{\left(\vec{s_{i}}\cdot\vec{n}_{2}\right)}^{2}+{\left(\vec{s_{i}}\cdot\vec{n}_{2}\right)}^{2}{\left(\vec{s_{i}}\cdot\vec{n}_{3}\right)}^{2}+{\left(\vec{s_{i}}\cdot\vec{n}_{1}\right)}^{2}{\left(\vec{s_{i}}\cdot\vec{n}_{3}\right)}^{2}\right]+K_{2}^{(c)}\left(\vec{s_{i}}\cdot\vec{n}_{1}\right)^{2}{\left(\vec{s_{i}}\cdot\vec{n}_{2}\right)}^{2}{\left(\vec{s_{i}}\cdot\vec{n}_{3}\right)}^{2},
$$  

with $K_{1}$ and $K_{2c}$ (in eV) the intensity coefficients and $\vec{n}_{1},\vec{n}_{2}$ and $\vec{n}_{3}$ defining the three anisotropic directions defined by the command (from $n l x$ to $n3z$ ). For $\vec{n}_{1}=(100)$ , $\vec{n}_{2}=(010)$ , and ${\vec{n}}_{3}=(001)$ , $K_{1}<0$ defines an iron type anisotropy (easy axis along the (001)-type cube edges), and $K_{1}>0$ defines a nickel type anisotropy (easy axis along the (111)-type cube diagonals). $K_{2}^{c}>0$ also defines easy axis along the (111)-type cube diagonals. See chapter 2 of (Skomski) for more details on cubic anisotropies.  

Style $s t t$ is used to simulate the interaction between the spins and a spin-transfer torque. See equation (7) of (Chirac) for more details about the implemented spin-transfer torque term.  

In all cases, the choice of $(x y z)$ only imposes the vector directions for the forces. Only the direction of the vector is important; its length is ignored (the entered vectors are normalized).  

Those styles can be combined within one single command.  

![](images/4fa9d05d30889c8d77d43a15baf154d3cd2c30bdb21d4c4151370330edada277.jpg)  

# Note  

The norm of all vectors defined with the precession/spin command have to be non-zero. For example, defining “fix 1 all precession/spin zeeman $0.10.00.00.0^{\gamma}$ would result in an error message. Since those vector components are used to compute the inverse of the field (or anisotropy) vector norm, setting a zero-vector would result in a division by zero.  

# 2.164.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the energy associated with the spin precession torque to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the potential energy (in energy units) discussed in the previous paragraph. The scalar value is an “extensive” quantity.  

No information about this fix is written to binary restart files.  

# 2.164.5 Restrictions  

The precession/spin style is part of the SPIN package. This style is only enabled if LAMMPS was built with this package, and if the atom_style “spin” was declared. See the Build package page for more info.  

# 2.164.6 Related commands  

atom_style spin  

# 2.164.7 Default  

none  

# 2.165 fix press/berendsen command  

# 2.165.1 Syntax  

fix ID group-ID press/berendsen keyword value ..  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • press/berendsen $=$ style name of this fix command one or more keyword value pairs may be appended keyword $=$ iso or aniso or x or y or z or couple or dilate or modulus iso or aniso values $=$ Pstart Pstop Pdamp  

Pstart,Pstop $=$ scalar external pressure at start/end of run (pressure units)  

Pdamp $=$ pressure damping parameter (time units) x or y or z values $=$ Pstart Pstop Pdamp  

Pstart,Pstop $=$ external stress tensor component at start/end of run (pressure units)  

Pdamp = stress damping parameter (time units) couple $=$ none or xyz or xy or yz or xz modulus value $=$ bulk modulus of system (pressure units) dilate value $=$ all or partial  

# 2.165.2 Examples  

<html><body><table><tr><td>fix 1 all press/ /berendsen iso 0.0 0.0 1000.0 fix 2 all press berendsen aniso 0.0 0.0 1000.0 dilate partial</td></tr></table></body></html>  

# 2.165.3 Description  

Reset the pressure of the system by using a Berendsen barostat (Berendsen), which rescales the system volume and (optionally) the atoms coordinates within the simulation box every timestep.  

Regardless of what atoms are in the fix group, a global pressure is computed for all atoms. Similarly, when the size of the simulation box is changed, all atoms are re-scaled to new positions, unless the keyword dilate is specified with a value of partial, in which case only the atoms in the fix group are re-scaled. The latter can be useful for leaving the coordinates of atoms in a solid substrate unchanged and controlling the pressure of a surrounding fluid.  

# Note  

Unlike the fix npt or fix nph commands which perform Nose/Hoover barostatting AND time integration, this fix does NOT perform time integration. It only modifies the box size and atom coordinates to effect barostatting. Thus you must use a separate time integration fix, like fix nve or fix nvt to actually update the positions and velocities of atoms. This fix can be used in conjunction with thermostatting fixes to control the temperature, such as fix nvt or fix langevin or fix temp/berendsen.  

See the Howto barostat page for a discussion of different ways to perform barostatting.  

The barostat is specified using one or more of the iso, aniso, x, y, z, and couple keywords. These keywords give you the ability to specify the 3 diagonal components of an external stress tensor, and to couple various of these components together so that the dimensions they represent are varied together during a constant-pressure simulation. Unlike the fix npt and fix nph commands, this fix cannot be used with triclinic (non-orthogonal) simulation boxes to control all 6 components of the general pressure tensor.  

The target pressures for each of the 3 diagonal components of the stress tensor can be specified independently via the $x,y,z$ , keywords, which correspond to the 3 simulation box dimensions. For each component, the external pressure or tensor component at each timestep is a ramped value during the run from Pstart to Pstop. If a target pressure is specified for a component, then the corresponding box dimension will change during a simulation. For example, if the $y$ keyword is used, the y-box length will change. A box dimension will not change if that component is not specified, although you have the option to change that dimension via the fix deform command.  

For all barostat keywords, the Pdamp parameter determines the time scale on which pressure is relaxed. For example, a value of 10.0 means to relax the pressure in a timespan of (roughly) 10 time units (tau or fs or ps - see the units command).  

![](images/ab1e843269d4050d3dafee2c2328462e27a5e36ed1323cc6a4b224d57fe9b9f5.jpg)  

# Note  

A Berendsen barostat will not work well for arbitrary values of Pdamp. If Pdamp is too small, the pressure and volume can fluctuate wildly; if it is too large, the pressure will take a very long time to equilibrate. A good choice for many models is a Pdamp of around 1000 timesteps. However, note that Pdamp is specified in time units, and that timesteps are NOT the same as time units for most units settings.  

![](images/dc983e7bf57619e2b2fc46ee26072eebd2d5350b2b64018dd81bf8a0f3d44a3f.jpg)  

# Note  

The relaxation time is actually also a function of the bulk modulus of the system (inverse of isothermal compressibility). The bulk modulus has units of pressure and is the amount of pressure that would need to be applied (isotropically) to reduce the volume of the system by a factor of 2 (assuming the bulk modulus was a constant, independent of density, which it’s not). The bulk modulus can be set via the keyword modulus. The Pdamp parameter is effectively multiplied by the bulk modulus, so if the pressure is relaxing faster than expected or desired, increasing the bulk modulus has the same effect as increasing Pdamp. The converse is also true. LAMMPS does not attempt to guess a correct value of the bulk modulus; it just uses 10.0 as a default value which gives reasonable relaxation for a Lennard-Jones liquid, but will be way off for other materials and way too small for solids. Thus you should experiment to find appropriate values of Pdamp and/or the modulus when using this fix.  

The couple keyword allows two or three of the diagonal components of the pressure tensor to be “coupled” together. The value specified with the keyword determines which are coupled. For example, $x z$ means the $P x x$ and $P z z$ components of the stress tensor are coupled. Xyz means all 3 diagonal components are coupled. Coupling means two things: the instantaneous stress will be computed as an average of the corresponding diagonal components, and the coupled box dimensions will be changed together in lockstep, meaning coupled dimensions will be dilated or contracted by the same percentage every timestep. The Pstart, Pstop, Pdamp parameters for any coupled dimensions must be identical. Couple xyz can be used for a 2d simulation; the $z$ dimension is simply ignored.  

The iso and aniso keywords are simply shortcuts that are equivalent to specifying several other keywords together.  

The keyword iso means couple all 3 diagonal components together when pressure is computed (hydrostatic pressure), and dilate/contract the dimensions together. Using “iso Pstart Pstop Pdamp” is the same as specifying these 4 keywords:  

x Pstart Pstop Pdamp y Pstart Pstop Pdamp z Pstart Pstop Pdamp couple xyz  

The keyword aniso means $x,y$ , and $z$ dimensions are controlled independently using the $P x x,P y y$ , and $P z z$ components of the stress tensor as the driving forces, and the specified scalar external pressure. Using “aniso Pstart Pstop Pdamp” is the same as specifying these 4 keywords:  

This fix computes a temperature and pressure each timestep. To do this, the fix creates its own computes of style “temp” and “pressure”, as if these commands had been issued:  

compute fix-ID_temp group-ID temp compute fix-ID_press group-ID pressure fix-ID_temp  

See the compute temp and compute pressure commands for details. Note that the IDs of the new computes are the fix-ID $^+$ underscore $^+$ “temp” or fix_ID $^+$ underscore $^+$ “press”, and the group for the new computes is the same as the fix group.  

Note that these are NOT the computes used by thermodynamic output (see the thermo_style command) with $\mathrm{ID}=$ thermo_temp and thermo_press. This means you can change the attributes of this fix’s temperature or pressure via the compute_modify command or print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

# 2.165.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify temp and press options are supported by this fix. You can use them to assign a compute you have defined to this fix which will be used in its temperature and pressure calculations. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

No global or per-atom quantities are stored by this fix for access by various output commands.  

This fix can ramp its target pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.165.5 Restrictions  

Any dimension being adjusted by this fix must be periodic.  

# 2.165.6 Related commands  

fix nve, fix nph, fix npt, fix temp/berendsen, fix_modify  

# 2.165.7 Default  

The keyword defaults are dilate $=$ all, modulus $=10.0$ in units of pressure for whatever units are defined.  

# 2.166 fix press/langevin command  

# 2.166.1 Syntax  

fix ID group-ID press/langevin keyword value ...  

• ID, group-ID are documented in fix command • press/langevin $=$ style name of this fix command  

one or more keyword value pairs may be appended   
keyword $=$ iso or aniso or tri or x or $_\mathrm{y}$ or z or xy or xz or yz or couple or dilate or modulus or temp␣   
$\hookrightarrow\mathrm{Or}$ flip  

iso or aniso or tri values $=$ Pstart Pstop Pdamp  

Pstart,Pstop $=$ scalar external pressure at start/end of run (pressure units)  

Pdamp $=$ pressure damping parameter (time units)  

or $_\mathrm{y}$ or $\mathrm{_{Z}}$ or xy or xz or yz values $=$ Pstart Pstop Pdamp  

Pstart,Pstop = external stress tensor component at start/end of run (pressure units)  

Pdamp $=$ pressure damping parameter   
flip value = yes or no $=$ allow or disallow box flips when it becomes highly skewed   
couple $=$ none or xyz or xy or yz or xz   
friction value $=$ Friction coefficient for the barostat (time units)   
temp values $=$ Tstart, Tstop, seed   
Tstart, Tstop $=$ target temperature used for the barostat at start/end of run   
seed $=$ seed of the random number generator   
dilate value $=$ all or partial  

# 2.166.2 Examples  

fix 1 all press/langevin iso 0.0 0.0 1000.0 temp 300 300 487374 fix 2 all press/langevin aniso 0.0 0.0 1000.0 temp 100 300 238 dilate partial  

# 2.166.3 Description  

Adjust the pressure of the system by using a Langevin stochastic barostat (Gronbech), which rescales the system volume and (optionally) the atoms coordinates within the simulation box every timestep.  

The Langevin barostat couple each direction $L$ with a pseudo-particle that obeys the Langevin equation such as:  

$$
\begin{array}{r l}&{f_{P}=\frac{N k_{B}T_{T(T)R e p t}}{V}+\frac{1}{V d}\sum_{\vec{r}=\vec{r}_{1}}^{N}\cdot\vec{f}_{i}-P_{i\alpha\gamma\epsilon}}\ &{Q\vec{L}+\alpha L=f_{P r}+\beta(t)}\ &{L^{n+1}=L^{n}+b d L^{n}\frac{b d^{2}}{2Q}}\ &{\vec{L}^{n+1}=\alpha L^{n}+\frac{d}{2Q}\left(a f_{P}^{n}+f_{P}^{n+1}\right)+\frac{b}{Q}\beta^{n+1}}\ &{\quad=\frac{1-\frac{\alpha\vec{Q}}{2}}{1+\frac{\alpha\vec{Q}}{2\epsilon^{2}}}}\ &{\quad=\frac{1}{1+\frac{\alpha\vec{Q}}{2\epsilon^{2}}}}\ &{\quad b=\frac{1}{1+\frac{\alpha\vec{Q}}{2\epsilon^{2}}}}\ &{\quad\beta(t)\beta(t^{\prime})=2\alpha k_{T}d t}\end{array}
$$  

Where $d t$ is the timestep $\dot{L}$ and $\ddot{L}$ the first and second derivatives of the coupled direction with regard to time, $\alpha$ is a friction coefficient, $\beta$ is a random gaussian variable and $Q$ the effective mass of the coupled pseudoparticle. The two first terms on the right-hand side of the first equation are the virial expression of the canonical pressure. It is to be noted that the temperature used to compute the pressure is not based on the atom velocities but rather on the canonical target temperature directly. This temperature is specified using the temp keyword parameter and should be close to the expected target temperature of the system.  

Regardless of what atoms are in the fix group, a global pressure is computed for all atoms. Similarly, when the size of the simulation box is changed, all atoms are re-scaled to new positions, unless the keyword dilate is specified with a value of partial, in which case only the atoms in the fix group are re-scaled. The latter can be useful for leaving the coordinates of atoms in a solid substrate unchanged and controlling the pressure of a surrounding fluid.  

![](images/17f2976eee08fd03ad88fe9b5344094fd676837e5d1ac305a5aba48d43204797.jpg)  

# Note  

Unlike the fix npt or fix nph commands which perform Nose-Hoover barostatting AND time integration, this fix does NOT perform time integration of the atoms but only of the barostat coupled coordinate. It then only modifies the box size and atom coordinates to effect barostatting. Thus you must use a separate time integration fix, like fix nve or fix nvt to actually update the positions and velocities of atoms. This fix can be used in conjunction with thermostatting fixes to control the temperature, such as fix nvt or fix langevin or fix temp/berendsen.  

See the Howto barostat page for a discussion of different ways to perform barostatting.  

The barostat is specified using one or more of the iso, aniso, tri x, y, z, xy, xz, yz, and couple keywords. These keywords give you the ability to specify the 3 diagonal components of an external stress tensor, and to couple various of these components together so that the dimensions they represent are varied together during a constant-pressure simulation.  

The target pressures for each of the 6 diagonal components of the stress tensor can be specified independently via the x, y, z, keywords, which correspond to the 3 simulation box dimensions, and the xy, xz and yz keywords which corresponds to the 3 simulation box tilt factors. For each component, the external pressure or tensor component at each timestep is a ramped value during the run from Pstart to Pstop. If a target pressure is specified for a component, then the corresponding box dimension will change during a simulation. For example, if the $y$ keyword is used, the y-box length will change. A box dimension will not change if that component is not specified, although you have the option to change that dimension via the fix deform command.  

The Pdamp parameter can be seen in the same way as a Nose-Hoover parameter as it is used to compute the mass of the fNololtoe wt haa ts iPmdilaamr pd eschaoyu ilnd  tbiem ee.x pTrhese semda sisn  otif mthee  ubnairtso.stat is linked to Pdamp by the relation $Q=(N_{a t}+1)\cdot k_{B}T_{t a r g e t}\cdot P_{d a m p}^{2}$  

![](images/d39728be5f5e66e74e5df013f2a6f32ceb3f966077d638bb9bd445c6673e93e4.jpg)  

# Note  

As for Berendsen barostat, a Langevin barostat will not work well for arbitrary values of Pdamp. If Pdamp is too small, the pressure and volume can fluctuate wildly; if it is too large, the pressure will take a very long time to equilibrate. A good choice for many models is a Pdamp of around 1000 timesteps. However, note that Pdamp is specified in time units, and that timesteps are NOT the same as time units for most units settings.  

The temp keyword sets the temperature to use in the equation of motion of the barostat. This value is used to compute the value of the force $f_{P}$ in the equation of motion. It is important to note that this value is not the instantaneous temperature but a target temperature that ramps from Tstart to Tstop. Also the required argument seed sets the seed for the random number generator used in the generation of the random forces.  

# 2.166. fix press/langevin command  

The couple keyword allows two or three of the diagonal components of the pressure tensor to be “coupled” together. The value specified with the keyword determines which are coupled. For example, $x z$ means the $P x x$ and $P z z$ components of the stress tensor are coupled. Xyz means all 3 diagonal components are coupled. Coupling means two things: the instantaneous stress will be computed as an average of the corresponding diagonal components, and the coupled box dimensions will be changed together in lockstep, meaning coupled dimensions will be dilated or contracted by the same percentage every timestep. The Pstart, Pstop, Pdamp parameters for any coupled dimensions must be identical. Couple xyz can be used for a 2d simulation; the z dimension is simply ignored.  

The iso, aniso and tri keywords are simply shortcuts that are equivalent to specifying several other keywords together.  

The keyword iso means couple all 3 diagonal components together when pressure is computed (hydrostatic pressure), and dilate/contract the dimensions together. Using “iso Pstart Pstop Pdamp” is the same as specifying these 4 keywords  

<html><body><table><tr><td>:Pstart Pstop Pdamp K</td></tr><tr><td>Pstart Pstop Pdamp</td></tr><tr><td></td></tr><tr><td>z Pstart Pstop Pdamp couple xyz</td></tr></table></body></html>  

The keyword aniso means $x,y$ , and $z$ dimensions are controlled independently using the $P x x,P y y$ , and $P z z$ components of the stress tensor as the driving forces, and the specified scalar external pressure. Using “aniso Pstart Pstop Pdamp” is the same as specifying these 4 keywords:  

x Pstart Pstop Pdamp y Pstart Pstop Pdamp z Pstart Pstop Pdamp couple none  

The keyword tri is the same as aniso but also adds the control on the shear pressure coupled with the tilt factors.  

x Pstart Pstop Pdamp y Pstart Pstop Pdamp z Pstart Pstop Pdamp xy Pstart Pstop Pdamp xz Pstart Pstop Pdamp yz Pstart Pstop Pdamp couple none  

The flip keyword allows the tilt factors for a triclinic box to exceed half the distance of the parallel box length, as discussed below. If the flip value is set to yes, the bound is enforced by flipping the box when it is exceeded. If the flip value is set to $n o$ , the tilt will continue to change without flipping. Note that if applied stress induces large deformations (e.g. in a liquid), this means the box shape can tilt dramatically and LAMMPS will run less efficiently, due to the large volume of communication needed to acquire ghost atoms around a processor’s irregular-shaped subdomain. For extreme values of tilt, LAMMPS may also lose atoms and generate an error.  

The friction keyword sets the friction parameter $\alpha$ in the equations of motion of the barostat. For each barostat direction, the value of $\alpha$ depends on both Pdamp and friction. The value given as a parameter is the Langevin characteristic time $\begin{array}{r}{\tau_{L}=\frac{Q}{\alpha}}\end{array}$ in time units. The langevin time can be understood as a decorrelation time for the pressure. A long Langevin time value will make the barostat act as an underdamped oscillator while a short value will make it act as an overdamped oscillator. The ideal configuration would be to find the critical parameter of the barostat. Empirically this is observed to occur for $\tau_{L}\approx P_{d a m p}$ . For this reason, if the friction keyword is not used, the default value Pdamp is used for each barostat direction.  

This fix computes pressure each timestep. To do this, the fix creates its own computes of style “pressure”, as if this command had been issued:  

compute fix-ID_press group-ID pressure NULL virial  

The kinetic contribution to the pressure is taken as the ensemble value $\frac{N k_{b}T}{V}$ and computed by the fix itself.  

See the compute pressure command for details. Note that the IDs of the new compute is the fix-ID $^+$ underscore $^+$ “press” and the group for the new computes is the same as the fix group.  

Note that this is NOT the compute used by thermodynamic output (see the thermo_style command) with $\mathrm{~ID~}=$ thermo_press. This means you can change the attributes of this fix’s pressure via the compute_modify command or print this temperature or pressure during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp or thermo_press will have no effect on this fix.  

# 2.166.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify press option is supported by this fix. You can use it to assign a compute you have defined to this fix which will be used in its pressure calculations.  

No global or per-atom quantities are stored by this fix for access by various output commands.  

This fix can ramp its target pressure and temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this. It is recommended that the ramped temperature is the same as the effective temperature of the thermostatted system. That is, if the system’s temperature is ramped by other commands, it is recommended to do the same with this pressure control.  

This fix is not invoked during energy minimization.  

# 2.166.5 Restrictions  

Any dimension being adjusted by this fix must be periodic.  

# 2.166.6 Related commands  

fix press/berendsen, fix nve, fix nph, fix npt, fix langevin, fix_modify  

# 2.166.7 Default  

The keyword defaults are dilate $=$ all, $\begin{array}{r l}{\lefteqn{f l i p=}}\end{array}$ yes, and friction $=$ Pdamp.  

(Gronbech) Gronbech-Jensen, Farago, J Chem Phys, 141, 194108 (2014).  

# 2.167 fix print command  

# 2.167.1 Syntax  

fix ID group-ID print N string keyword value ...  

• ID, group-ID are documented in fix command  

# 2.167. fix print command  

• print $=$ style name of this fix command • $\Nu=$ print every N steps; N can be a variable (see below) • string $=$ text string to print with optional variable names • zero or more keyword/value pairs may be appended • keyword $=f l e$ or append or screen or title  

file value $=$ filename   
append value $=$ filename   
screen value $=$ yes or no   
title value = string string $=$ text to print as 1st line of output file  

# 2.167.2 Examples  

fix extra all print 100 "Coords of marker atom = \$x \$y \$z" fix extra all print 100 "Coords of marker atom = \$x \$y \$z" file coord.txt  

# 2.167.3 Description  

Print a text string every N steps during a simulation run. This can be used for diagnostic purposes or as a debugging tool to monitor some quantity during a run. The text string must be a single argument, so it should be enclosed in single or double quotes if it is more than one word. If it contains variables it must be enclosed in double quotes to ensure they are not evaluated when the input script line is read, but will instead be evaluated each time the string is printed.  

Added in version $15\mathrm{Jun}2023$ : support for vector style variables  

See the variable command for a description of equal and vector style variables which are typically the most useful ones to use with the print command. Equal- and vector-style variables can calculate formulas involving mathematical operations, atom properties, group properties, thermodynamic properties, global values calculated by a compute or $f\boldsymbol{{x}}$ , or references to other variables. Vector-style variables are printed in a bracketed, comma-separated format, e.g. [1,2,3,4] or [12.5,2,4.6,10.1].  

# Note  

As discussed on the Commands parse doc page, the text string can use “immediate” variables, specified as $\$1$ (formula) with parenthesis, where the numeric formula has the same syntax as equal-style variables described on the variable doc page. This is a convenient way to evaluate a formula immediately without using the variable command to define a named variable and then use that variable in the text string. The formula can include a trailing colon and format string which determines the precision with which the numeric value is output. This is also explained on the Commands parse doc page.  

Instead of a numeric value, N can be specified as an equal-style variable, which should be specified as v_name, where name is the variable name. In this case, the variable is evaluated at the beginning of a run to determine the next timestep at which the string will be written out. On that timestep, the variable will be evaluated again to determine the next timestep, etc. Thus the variable should return timestep values. See the stagger() and logfreq() and stride() math functions for equal-style variables, as examples of useful functions to use in this context. For example, the following commands will print output at timesteps 10,20,30,100,200,300,1000,2000,etc:  

variable s equal logfreq(10,3,10) fix extra all print v_s "Coords of marker $\mathrm{atom}=\$8\mathrm{x}\oplus\mathrm{y}\oplus\mathrm{z}^{\dprime}$  

The specified group-ID is ignored by this fix.  

If the file or append keyword is used, a filename is specified to which the output generated by this fix will be written. If file is used, then the filename is overwritten if it already exists. If append is used, then the filename is appended to if it already exists, or created if it does not exist.  

If the screen keyword is used, output by this fix to the screen and logfile can be turned on or off as desired.  

The title keyword allow specification of the string that will be printed as the first line of the output file, assuming the file keyword was used. By default, the title line is as follows:  

where ID is replaced with the fix-ID.  

# 2.167.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.167.5 Restrictions  

none  

# 2.167.6 Related commands  

variable, print  

# 2.167.7 Default  

The option defaults are no file output, screen $=$ yes, and title string as described above.  

# 2.168 fix propel/self command  

# 2.168.1 Syntax  

fix ID group-ID propel/self mode magnitude keyword values  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• propel/self $=$ style name of this fix command   
• mode $=$ dipole or velocity or quat   
• magnitude $=$ magnitude of self-propulsion force   
• zero or one keyword/value pairs may be appended   
• keyword $=$ qvector qvector value $=$ direction of force in ellipsoid frame sx, sy, s $\mathrm{~\textit~{~w~}~}$ components of qvector  

# 2.168.2 Examples  

fix active all propel/self dipole 40.0   
fix active all propel/self velocity 10.0   
fix active all propel/self quat 15.7 qvector 1.0 0.0 0.0  

# 2.168. fix propel/self command  

# 2.168.3 Description  

Add a force to each atom in the group due to a self-propulsion force. The force is given by  

$$
F_{i}=f_{P}e_{i}
$$  

where $i$ is the particle the force is being applied to, $f_{P}$ is the magnitude of the force, and $e_{i}$ is the vector direction of the force. The specification of $e_{i}$ is based on which of the three keywords (dipole or velocity or quat) one selects.  

For mode dipole, $e_{i}$ is just equal to the dipole vectors of the atoms in the group. Therefore, if the dipoles are not unit vectors, the $e_{i}$ will not be unit vectors.  

# Note  

If another command changes the magnitude of the dipole, this force will change accordingly (since $\left|e_{i}\right|$ will change, which is physically equivalent to re-scaling $f_{P}$ while keeping $\left|e_{i}\right|$ constant), and no warning will be provided by LAMMPS. This is almost never what you want, so ensure you are not changing dipole magnitudes with another LAMMPS fix or pair style. Furthermore, self-propulsion forces (almost) always set $e_{i}$ to be a unit vector for all times, so it’s best to set all the dipole magnitudes to 1.0 unless you have a good reason not to (see the set command on how to do this).  

For mode velocity, $e_{i}$ points in the direction of the current velocity (a unit-vector). This can be interpreted as a velocitydependent friction, as proposed by e.g. (Erdmann).  

For mode quat, $e_{i}$ points in the direction of a unit vector, oriented in the coordinate frame of the ellipsoidal particles, which defaults to point along the x-direction. This default behavior can be changed by via the quatvec keyword.  

The optional quatvec keyword specifies the direction of self-propulsion via a unit vector (sx,sy,sz). The arguments $s x$ , $s y$ , and $s z$ , are defined within the coordinate frame of the atom’s ellipsoid. For instance, for an ellipsoid with long axis along its $\mathbf{X}$ -direction, if one wanted the self-propulsion force to also be along this axis, set $s x$ equal to 1 and $s y,s z$ both equal to zero. This keyword may only be specified for mode quat.  

![](images/2e494a70035398b758d63c166d1aa655718f81cfe2ad1b41ca9c1765173ae47d.jpg)  

# Note  

In using keyword quatvec, the three arguments $s x,s y$ , and $s z$ will be automatically normalized to components of a unit vector internally to avoid users having to explicitly do so themselves. Therefore, in mode quat, the vectors $e_{i}$ will always be of unit length.  

Along with adding a force contribution, this fix can also contribute to the virial (pressure) of the system, defined as $f_{P}\Sigma_{i}<e_{i}.r_{i}>/(d V)$ , where $r_{i}$ is the unwrapped coordinate of particle i in the case of periodic boundary conditions. See (Winkler) for a discussion of this active pressure contribution.  

For modes dipole and quat, this fix is by default included in pressure computations.  

For mode velocity, this fix is by default not included in pressure computations.  

# Note  

In contrast to equilibrium systems, pressure of active systems in general depends on the geometry of the container. The active pressure contribution as calculated in this fix is only valid for certain boundary conditions (spherical walls, rectangular walls, or periodic boundary conditions). For other geometries, the pressure must be measured via explicit calculation of the force per unit area on a wall, and so one must not calculate it using this fix. (Use fix_modify as described below to turn off the virial contribution of this fix). Again, see (Winkler) for discussion of why this is the case.  

Furthermore, when dealing with active systems, the temperature is no longer well defined. Therefore, one should ensure that the virial flag is used in the compute pressure command (turning off temperature contributions).  

# 2.168.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify virial option is supported by this fix to add the contribution due to the added forces on atoms to the system’s virial as part of thermodynamic output. The default is virial yes for keywords dipole and quat. The default is virial no for keyword velocity.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

# 2.168.5 Restrictions  

With keyword dipole, this fix only works when the DIPOLE package is enabled. See the Build package page for more info.  

This fix is part of the BROWNIAN package. It is only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

# 2.168.6 Related commands  

fix efield , fix setforce, fix addforce  

# 2.168.7 Default  

none  

(Erdmann) U. Erdmann , W. Ebeling, L. Schimansky-Geier, and F. Schweitzer, Eur. Phys. J. B 15, 105-113, 2000.   
(Winkler) Winkler, Wysocki, and Gompper, Soft Matter, 11, 6680 (2015).  

# 2.169 fix property/atom command  

Accelerator Variants: property/atom/kk  

# 2.169.1 Syntax  

fix ID group-ID property/atom name1 name2 ... keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• property/atom $=$ style name of this fix command   
• name1,name2,. . . $=$ mol or $q$ or rmass or i_name or d_name or i2_name or d2_nam mol $=$ molecule IDs $\mathrm{~q~}=$ charge rmass $=$ per-atom mass temperature $=$ internal temperature of atom heatflow $=$ internal heat flow of atom $\mathrm{i\_name}=\mathrm{new}$ integer vector referenced by name  

# 2.169. fix property/atom command  

d_name $=$ new floating-point vector referenced by name i2_name $=$ new integer array referenced by name i2_name arg = N = number of columns in the array d2_name = new floating-point array referenced by name d2_name arg = N = number of columns in the array   
• zero of more keyword/value pairs may be appended   
• keyword = ghost ghost value $=\mathrm{no}$ or yes for whether ghost atom info in communicated  

# 2.169.2 Examples  

<html><body><table><tr><td>fix 1 all property/ atom mol</td><td></td></tr><tr><td>fix 1 all</td><td>property, atom i_myfag1 i_myflag2</td></tr><tr><td></td><td>fix 1 all property/ atom d2_sxyz 3 ghost yes</td></tr><tr><td></td><td></td></tr></table></body></html>  

# 2.169.3 Description  

Create one or more additional per-atom vectors or arrays to store information about atoms and to use during a simulation.   
The specified group- $\mathbf{\nabla}\cdot I D$ is ignored by this fix.  

The atom style used for a simulation defines a set of per-atom properties, as explained on the atom_style and read_data doc pages. The latter command defines these properties for each atom in the system when a data file is read. This fix augments the set of per-atom properties with new custom ones. This can be useful in several scenarios.  

If the atom style does not define molecule IDs, per-atom charge, per-atom mass, internal temperature, or internal heat flow, they can be added using the mol, q, rmass, temperature, or heatflow keywords. This could be useful to define “molecules” to use as rigid bodies with the fix rigid command, or to carry around an extra flag with atoms (stored as a molecule ID) that can be used by various commands like compute chunk/atom to group atoms without having to use the group command (which is limited to a total of 32 groups including all). For finite-size particles, an internal temperature and heat flow can be used to model heat conduction as in the GRANULAR package.  

Another application is to use the rmass flag in order to have per-atom masses instead of per-type masses. This could be used to study isotope effects with partial isotope substitution. See below for an example of simulating a mixture of light and heavy water with the TIP4P water potential.  

An alternative to using fix property/atom for these examples is to use an atom style that does define molecule IDs or charge or per-atom mass (indirectly via diameter and density) or to use a hybrid atom style that combines two or more atom styles to provide the union of all their atom properties. However, this has two practical drawbacks: first, it typically necessitates changing the format of the Atoms section in the data file and second, it may define additional properties that are not needed such as bond lists, which incurs some overhead when there are no bonds.  

In the future, we may add additional existing per-atom properties to fix property/atom, similar to mol, q, rmass, temperature, or heatflow which “turn-on” specific properties defined by some atom styles, so they can be easily used by atom styles that do not define them.  

More generally, the i_name and $d_{\cdot}$ _name options allow one or more new custom per-atom vectors to be defined. Likewise the i2_name and $d2$ _name options allow one or more custom per-atom arrays to be defined. The i2_name and d2_name options take an argument $N$ which specifies the number of columns in the per-atom array, i.e. the number of attributes associated with each atom. $N>=1$ is required.  

Each name must be unique and can use alphanumeric or underscore characters. These vectors and arrays can store whatever values you decide are useful in your simulation. As explained below there are several ways to initialize, access, and output these values, via input script commands, data files, and in new code you add to LAMMPS.  

This is effectively a simple way to add per-atom properties to a model without needing to write code for a new atom style that defines the properties. Note however that implementing a new atom style allows new atom properties to be more tightly and seamlessly integrated with the rest of the code.  

The new atom properties encode values that migrate with atoms to new processors and are written to restart files. If you want the new properties to also be defined for ghost atoms, then use the ghost keyword with a value of yes. This will invoke extra communication when ghost atoms are created (at every re-neighboring) to ensure the new properties are also defined for the ghost atoms.  

# Properties on ghost atoms  

If you use the mol, $q$ or rmass names, you most likely want to set ghost yes, since these properties are stored with ghost atoms if you use an atom_style that defines them. Many LAMMPS operations that use molecule IDs or charge, such as neighbor lists and pair styles, will expect ghost atoms to have these values. LAMMPS will issue a warning it you define those vectors but do not set ghost yes.  

# $\Theta$ Limitations on ghost atom properties  

The specified properties for ghost atoms are not updated every timestep, but only once every few steps when neighbor lists are re-built. Thus the ghost keyword is suitable for static properties, like molecule IDs, but not for dynamic properties that change every step. For the latter, the code you add to LAMMPS to change the properties will also need to communicate their new values to/from ghost atoms, an operation that can be invoked from within a pair style or fix or compute that you write.  

This fix is one of a small number that can be defined in an input script before the simulation box is created or atoms are defined. This is so it can be used with the read_data command as described next.  

Per-atom properties that are defined by the atom style are initialized when atoms are created, e.g. by the read_data or create_atoms commands. The per-atom properties defined by this fix are not. So you need to initialize them explicitly. One way to do this is read_data command, using its fix keyword and passing it the fix-ID of this fix.  

Thus these commands:  

<html><body><table><tr><td>fix prop all property/atom mol d_fag</td></tr><tr><td>read data data.txt fix prop NULL Molecules</td></tr><tr><td></td></tr></table></body></html>  

would allow a data file to have a section like this:  

<html><body><table><tr><td>Molecules</td></tr><tr><td>1 4 1.5</td></tr><tr><td>2 43.0</td></tr><tr><td>3 10 1.0</td></tr><tr><td>4 10 1.0</td></tr><tr><td>5 10 1.0</td></tr><tr><td>N 763 4.5</td></tr><tr><td></td></tr></table></body></html>  

where N is the number of atoms, the first field on each line is the atom-ID, the next two are a molecule-ID and a floating point value that will be stored in a new property called “flag”. If a per-atom array was specified in the fix property/atom command then the $N$ values for that array must be specified consecutively for that property on each line. Note that the order of values on each line corresponds to the order of custom names in the fix property/atom command.  

Note that the the lines of per-atom properties can be listed in any order. Also note that all the per-atom properties specified by the fix ID (prop in this case) must be included on each line in the specified data file section (Molecules in this case).  

Another way of initializing the new properties is via the set command. For example, if you wanted molecules defined for every set of 10 atoms, based on their atom-IDs, these commands could be used:  

fix prop all property/atom mol variable cluster atom ((id-1)/10)+1 set atom \* mol v_cluster  

The atom-style variable will create values for atoms with IDs 31,32,33,. . . 40 that are 4.0,4.1,4.2,. . . ,4.9. When the set commands assigns them to the molecule ID for each atom, they will be truncated to an integer value, so atoms 31-40 will all be assigned a molecule ID of 4.  

Note that atomfile-style variables can also be used in place of atom-style variables, which means in this case that the molecule IDs could be read-in from a separate file and assigned by the set command. This allows you to initialize new per-atom properties in a completely general fashion.  

For new atom properties specified as i_name, d_name, i2_name, or d2_name, the dump custom and compute property/atom commands can access their values. This means that the values can be used accessed by fixes like fix ave/atom, accessed by other computes like compute reduce, or used in atom-style variables.  

For example, these commands will output both the instantaneous and time-averaged values of two new properties to a custom dump file:  

fix myprops all property/atom i_flag1 d_flag2   
compute 1 all property/atom i_flag1 d_flag2   
fix 1 all ave/atom 10 10 100 c_1[1] c_1[2]   
dump 1 all custom 100 tmp.dump id x y z i_flag1 d_flag2 f_1[1] f_1[2]  

If you wish to add new pair styles, fixes, or computes that use the per-atom properties defined by this fix, see the Modify atom doc page which has details on how the custom properties of this fix can be accessed from added classes.  

Here is an example of using per-atom masses with TIP4P water to study isotope effects. When setting up simulations with the TIP4P pair styles for water, you have to provide exactly one atom type each to identify the water oxygen and hydrogen atoms. Since the atom mass is normally tied to the atom type, this makes it impossible to study multiple isotopes in the same simulation. With fix property/atom rmass however, the per-type masses are replaced by per-atom masses. Asumming you have a working input deck for regular TIP4P water, where water oxygen is atom type 1 and water hydrogen is atom type 2, the following lines of input script convert this to using per-atom masses:  

fix Isotopes all property/atom rmass ghost yes   
set type 1 mass 15.9994   
set type 2 mass 1.008  

When writing out the system data with the write_data command, there will be a new section named with the fix-ID (i.e. Isotopes in this case). Alternatively, you can take an existing data file and just add this Isotopes section with one line per atom containing atom-ID and mass. Either way, the extended data file can be read back with:  

fix Isotopes all property/atom rmass ghost yes read_data tip4p-isotopes.data fix Isotopes NULL Isotopes  

Chapter 2. Fix Styles  

Please note that the first Isotopes refers to the fix-ID and the second to the name of the section. The following input script code will now change the first 100 water molecules in this example to heavy water:  

group hwat id 2:300:3   
group hwat id 3:300:3   
set group hwat mass 2.0141018  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.169.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the per-atom values it stores to binary restart files, so that the values can be restored when a simulation is restarted. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

![](images/631e7ab89ff856f07b2a0def6c7d25c43fe9735a42e43c4b3c320fe31f690cb4.jpg)  

# Warning  

When reading data from a restart file, this fix command has to be specified after the read_restart command and exactly the same was in the input script that created the restart file. LAMMPS will only check whether a fix is of the same style and has the same fix ID and in case of a match will then try to initialize the fix with the data stored in the binary restart file. If the names and associated date types in the new fix property/atom command do not match the old one exactly, data can be corrupted or LAMMPS may crash. If the fix is specified before the read_restart command its data will not be restored.  

None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.169.5 Restrictions  

none  

2.169.6 Related commands read_data, set, compute property/atom  

# 2.169.7 Default  

The default keyword value is ghost $=$ no.  

# 2.169. fix property/atom command  

# 2.170 fix python/invoke command  

# 2.170.1 Syntax  

fix ID group-ID python/invoke N callback function_name  

• ID, group-ID are ignored by this fix   
• python/invoke $=$ style name of this fix command   
• $\Nu=$ execute every N steps   
• callback $=$ post_force or end_of_step post_force $=$ callback after force computations on atoms every N time steps end_of_step $=$ callback after every N time steps  

# 2.170.2 Examples  

python post_force_callback here """   
from lammps import lammps   
def post_force_callback(lammps_ptr, vflag): lmp = lammps(ptr=lammps_ptr) # access LAMMPS state using Python interface   
"""   
python end_of_step_callback here """   
def end_of_step_callback(lammps_ptr): lmp = lammps(ptr=lammps_ptr) # access LAMMPS state using Python interface   
fix pf all python/invoke 50 post_force post_force_callback   
fix eos all python/invoke 50 end_of_step end_of_step_callback  

# 2.170.3 Description  

This fix allows you to call a Python function during a simulation run. The callback is either executed after forces have been applied to atoms or at the end of every N time steps.  

Callback functions must be declared in the global scope of the active Python interpreter. This can either be done by defining it inline using the python command or by importing functions from other Python modules. If LAMMPS is driven using the library interface from Python, functions defined in the driving Python interpreter can also be executed.  

Each callback is given a pointer object as first argument. This can be used to initialize an instance of the lammps Python interface, which gives access to the LAMMPS state from Python.  

![](images/39525795fb86e1617d442c21590f5762a817bb1cb7275bb1beafade89297f946.jpg)  

# Warning  

While you can access the state of LAMMPS via library functions from these callbacks, trying to execute input script commands will in the best case not work or in the worst case result in undefined behavior.  

# 2.170.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.170.5 Restrictions  

This fix is part of the PYTHON package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Building LAMMPS with the PYTHON package will link LAMMPS with the Python library on your system. Settings to enable this are in the lib/python/Makefile.lammps file. See the lib/python/README file for information on those settings.  

# 2.170.6 Related commands  

python command  

# 2.171 fix python/move command  

# 2.171.1 Syntax  

fix python/move pymodule.CLASS  

pymodule.CLASS $=$ use class CLASS in module/file pymodule to compute how to move atoms  

# 2.171.2 Examples  

<html><body><table><tr><td>fix 1 all python move py _nve.NVE fix 1 all python /move py _nve.NVE OPT</td></tr></table></body></html>  

# 2.171.3 Description  

The python/move fix style provides a way to define ways how particles are moved during an MD run from python script code, that is loaded from a file into LAMMPS and executed at the various steps where other fixes can be executed. This python script must contain specific python class definitions.  

This allows to implement complex position updates and also modified time integration methods. Due to python being an interpreted language, however, the performance of this fix can be moderately to significantly slower than the corresponding $\mathrm{C}{+}{+}$ code. For specific cases, this performance penalty can be limited through effective use of $\mathrm{{NumPy}}$ .  

The python module file has to start with the following code:  

from future import print_function   
import lammps   
import ctypes   
import traceback   
import numpy as np   
#   
class LAMMPSFix(object): def init _(self, ptr, group_name="all"): self.lmp $=$ lammps.lammps(ptr=ptr)  

(continues on next page)  

# 2.171. fix python/move command  

(continued from previous page)  

self.group_name = group_name   
#   
class LAMMPSFixMove(LAMMPSFix): def __init__(self, ptr, group_name="all"): super(LAMMPSFixMove, self).__init__(ptr, group_name)   
# def init(self): pass   
# def initial_integrate(self, vflag): pass   
# def final_integrate(self): pass   
# def initial_integrate_respa(self, vflag, ilevel, iloop): pass   
# def final_integrate_respa(self, ilevel, iloop): pass   
# def reset_dt(self): pass  

Any classes implementing new atom motion functionality have to be derived from the LAMMPSFixMove class, overriding the available methods as needed.  

Examples for how to do this are in the examples/python folder.  

# 2.171.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.171.5 Restrictions  

This pair style is part of the PYTHON package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.171.6 Related commands  

fix nve, fix python/invoke  

# 2.171.7 Default  

none  

# 2.172 fix qbmsst command  

# 2.172.1 Syntax  

fix ID group-ID qbmsst dir shockvel keyword value ...  

• ID, group-ID are documented in fix command   
• qbmsst $=$ style name of this fix   
• dir $=x$ or $y$ or z   
• shockvel $=$ shock velocity (strictly positive, velocity units)   
• zero or more keyword/value pairs may be appended   
• keyword $=q$ or mu or $p O$ or $\nu O$ or $e O$ or tscale or damp or seed or $f_{-}$ _max or $N_{\rightarrow}f$ or eta or beta or $T_{-}$ _init q value $=$ cell mass-like parameter (mass $\widehat{\mathbf{\xi}}^{2}$ /distance^4 units) mu value $=$ artificial viscosity (mass/distance/time units) p0 value $=$ initial pressure in the shock equations (pressure units) v0 value $=$ initial simulation cell volume in the shock equations (distance^3 units) e0 value $=$ initial total energy (energy units) tscale value = reduction in initial temperature (unitless fraction between 0.0 and 1.0) damp value = damping parameter (time units) inverse of friction gamma seed value = random number seed (positive integer) f_max value = upper cutoff frequency of the vibration spectrum (1/time units) $\bar{\mathrm{~N~}}_{-}\mathrm{~f~}$ value $-$ number of frequency bins (positive integer) eta value = coupling constant between the shock system and the quantum thermal bath (positive␣ $\hookrightarrow$ unitless) beta value = the quantum temperature is updated every beta time steps (positive integer) T_init value $=$ quantum temperature for the initial state (temperature units)  

# 2.172.2 Examples  

$\#$ (liquid methane modeled with the REAX force field, real units)   
fix 1 all qbmsst $\mathrm{~z~}0.122\mathrm{~q~}25\mathrm{~mu~}0.9$ tscale 0.01 damp 200 seed 35082 f_max 0.3 N_f 100 eta 1 beta 400␣   
,→T_init 110   
# (quartz modeled with the BKS force field, metal units)   
fix 2 all qbmsst $\mathrm{~z~}72\mathrm{~q~}40$ tscale 0.05 damp 1 seed 47508 f_max 120.0 N_f 100 eta 1.0 beta 500 T_init 300  

Two example input scripts are given, including shocked $\alpha$ -quartz and shocked liquid methane. The input script first equilibrates an initial state with the quantum thermal bath at the target temperature and then applies fix qbmsst to simulate shock compression with quantum nuclear correction. The following two figures plot relevant quantities for shocked $\alpha$ -quartz.  

![](images/0f35ac960f77a3a0da9ecdedaf694f8f065e0b06c6ddb648eb2e1d136c366f4e.jpg)  

Figure 1. Classical temperature $\begin{array}{r}{T_{c l}=\sum\frac{m_{i}\nu_{i}^{2}}{3N k_{B}}}\end{array}$ time oupling the $\alpha$ -quartz initial state with the quantum thermal bath at target quantum temperature $T^{q m}=\bar{3}00K$ $\mathrm{\DeltaNpH}$ ensemble is used for time integration while QTB provides the colored random force. $T^{c l}$ converges at the timescale of damp which is set to be 1 ps.  

![](images/9ca072b5968c9a65ee29806c02a8c3c7fc9903823662db4ed631be5202d0176d.jpg)  
Figure 2. Quantum temperature and pressure vs. time for simulating shocked $\alpha$ -quartz with fix qbmsst. The shock propagates along the z direction. Restart of the fix qbmsst command is demonstrated in the example input script. Thermodynamic quantities stay continuous before and after the restart.  

# 2.172.3 Description  

This command performs the Quantum-Bath coupled Multi-Scale Shock Technique (QBMSST) integration. See $(Q i)$ for a detailed description of this method. QBMSST provides description of the thermodynamics and kinetics of shock processes while incorporating quantum nuclear effects. The shockvel setting determines the steady shock velocity that will be simulated along direction dir.  

Quantum nuclear effects (fix qtb) can be crucial especially when the temperature of the initial state is below the classical limit or there is a great change in the zero point energies between the initial and final states. Theoretical post processing quantum corrections of shock compressed water and methane have been reported as much as $30\%$ of the temperatures (Goldman). A self-consistent method that couples the shock to a quantum thermal bath described by a colored noise Langevin thermostat has been developed by Qi et al $(Q i)$ and applied to shocked methane. The onset of chemistry is reported to be at a pressure on the shock Hugoniot that is $40\%$ lower than observed with classical molecular dynamics.  

It is highly recommended that the system be already in an equilibrium state with a quantum thermal bath at temperature of T_init. The fix command fix qtb at constant temperature $T_{-}$ _init could be used before applying this command to introduce self-consistent quantum nuclear effects into the initial state.  

The parameters $q$ , mu, $e0,p0;$ , $\nu O$ and tscale are described in the command fix msst. The values of $e0,p0$ , or $\nu O$ will be calculated on the first step if not specified. The parameter of damp, $f_{\_}m a x.$ , and $N_{-}f$ are described in the command $f\alpha$ qtb.  

The fix qbmsst command couples the shock system to a quantum thermal bath with a rate that is proportional to the change of the total energy of the shock system, $E^{t o t}-E_{0}^{t o t}$ . Here $E^{e t o t}$ consists of both the system energy and a thermal term, see $(Q i)$ , and $E_{0}^{t o t}=e0$ is the initial total energy.  

The eta $(\eta)$ parameter is a unitless coupling constant between the shock system and the quantum thermal bath. A small $\eta$ value cannot adjust the quantum temperature fast enough during the temperature ramping period of shock compression while large $\eta$ leads to big temperature oscillation. A value of $\eta$ between 0.3 and 1 is usually appropriate for simulating most systems under shock compression. We observe that different values of $\eta$ lead to almost the same final thermodynamic state behind the shock, as expected.  

The quantum temperature is updated every beta $(\beta)$ steps with an integration time interval $\beta$ times longer than the simulation time step. In that case, $E^{t o t}$ is taken as its average over the past $\beta$ steps. The temperature of the quantum thermal bath $T^{q m}$ changes dynamically according to the following equation where $\Delta_{t}$ is the MD time step and $\gamma$ is the friction constant which is equal to the inverse of the damp parameter.  

$$
\frac{d T^{q m}}{d t}=\gamma\eta\sum_{l=1}^{\beta}\frac{E^{t o t}(t-l\Delta t)-E_{0}^{t o t}}{3\beta N k_{B}}
$$  

The parameter $T_{-}$ _init is the initial temperature of the quantum thermal bath and the system before shock loading.  

For all pressure styles, the simulation box stays orthorhombic in shape. Parrinello-Rahman boundary conditions (tilted box) are supported by LAMMPS, but are not implemented for QBMSST.  

# 2.172.4 Restart, fix_modify, output, run start/stop, minimize info  

Because the state of the random number generator is not written to binary restart files, this fix cannot be restarted “exactly” in an uninterrupted fashion. However, in a statistical sense, a restarted simulation should produce similar behaviors of the system as if it is not interrupted. To achieve such a restart, one should write explicitly the same value for q, mu, damp, f_max, N_f, eta, and beta and set tscale $=0$ if the system is compressed during the first run.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

The progress of the QBMSST can be monitored by printing the global scalar and global vector quantities computed by the fix.  

As mentioned above, the scalar is the cumulative energy change due to the fix. By monitoring the thermodynamic econserve output, this can be used to test if the MD timestep is sufficiently small for accurate integration of the dynamic equations.  

The global vector contains five values in the following order. The vector values output by this fix are “intensive”.  

[dhugoniot, drayleigh, lagrangian_speed, lagrangian_position, quantum_temperature]  

1. dhugoniot is the departure from the Hugoniot (temperature units).   
2. drayleigh is the departure from the Rayleigh line (pressure units).   
3. lagrangian_speed is the laboratory-frame Lagrangian speed (particle velocity) of the computational cell (velocity units).   
4. lagrangian_position is the computational cell position in the reference frame moving at the shock speed. This is the distance of the computational cell behind the shock front.   
5. quantum_temperature is the temperature of the quantum thermal bath $T^{q m}$ .  

To print these quantities to the log file with descriptive column headers, the following LAMMPS commands are suggested.  

<html><body><table><tr><td>fix</td><td>fix id all msst z</td></tr><tr><td>variable</td><td>dhug equal f_fix_id[1]</td></tr><tr><td>variable dray</td><td>equal f_fix_id[2]</td></tr><tr><td>variable</td><td>lgr _vel equal f_fix_id[3]</td></tr><tr><td>variable</td><td>lgr_pos equal f_fix_id[4]</td></tr><tr><td>variable T_C qm</td><td>equal f_fix_id[5] dhug v_dray v_lgr_ vel v_lgr_pos v_T</td></tr></table></body></html>  

# 2.172. fix qbmsst command  

It is worth noting that the temp keyword for the thermo_style command prints the instantaneous classical temperature $T^{c l}$ as described by the fix qtb command.  

# 2.172.5 Restrictions  

This fix style is part of the QTB package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

All cell dimensions must be periodic. This fix can not be used with a triclinic cell. The QBMSST fix has been tested only for the group-ID all.  

# 2.172.6 Related commands  

fix qtb, fix msst  

# 2.172.7 Default  

The keyword defaults are ${\sf q}=10$ , $\mathrm{mu}=0$ , tscale $=0.01$ , $\mathrm{damp}=1$ , $\mathrm{seed}=880302$ , f_max $=$ 200.0, N_f = 100, eta $=1.0$ beta $=100$ , and T_init ${\bf\varepsilon}=300.0\$ . e0, $\mathfrak{p}0$ , and v0 are calculated on the first step.  

(Goldman) Goldman, Reed and Fried, J. Chem. Phys. 131, 204103 (2009) (Qi) Qi and Reed, J. Phys. Chem. A 116, 10451 (2012).  

2.173 fix qeq/point command  

2.174 fix qeq/shielded command  

2.175 fix qeq/slater command  

2.176 fix qeq/ctip command  

2.177 fix qeq/dynamic command  

2.178 fix qeq/fire command  

# 2.178.1 Syntax  

fix ID group-ID style Nevery cutoff tolerance maxiter qfile keyword ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• style $=$ qeq/point or qeq/shielded or qeq/slater or qeq/ctip or qeq/dynamic or qeq/fire   
• Nevery $=$ perform charge equilibration every this many steps   
• cutof $=$ global cutoff for charge-charge interactions (distance unit)   
• tolerance $=$ precision to which charges will be equilibrated   
• maxiter $=$ maximum iterations to perform charge equilibration   
• qfile ${\mathbf{\lambda}}={\mathbf{a}}$ filename with QEq parameters or coul/streitz or coul/ctip or reaxff   
• zero or more keyword/value pairs may be appended   
• keyword $=$ alpha or cdamp or maxrepeat or qdamp or qstep or warn alpha value $=$ Slater type orbital exponent (qeq/slater only) cdamp value $=$ damping parameter for Coulomb interactions (qeq/ctip only) maxrepeat value $=$ number of equilibration cycles allowed to ensure no atoms cross charge bounds␣ $\hookrightarrow$ (qeq/ctip only) qdamp value = damping factor for damped dynamics charge solver (qeq/dynamic and qeq/fire only) qstep value = time step size for damped dynamics charge solver (qeq/dynamic and qeq/fire only) warn value = do $=$ yes) or do not (=no) print a warning when the maximum number of iterations␣ ,→is reached  

# 2.178.2 Examples  

fix 1 all qeq/point 1 10 1.0e-6 200 param.qeq1   
fix 1 qeq qeq/shielded 1 8 1.0e-6 100 param.qeq2   
fix 1 all qeq/slater 5 10 1.0e-6 100 params alpha 0.2   
fix 1 all qeq/ctip 1 12 1.0e-8 100 coul/ctip cdamp 0.30 maxrepeat 10   
fix 1 qeq qeq/dynamic 1 12 1.0e-3 100 my_qeq   
fix 1 all qeq/fire 1 10 1.0e-3 100 my_qeq qdamp 0.2 qstep 0.1  

# 2.178.3 Description  

Perform the charge equilibration (QEq) method as described in (Rappe and Goddard) and formulated in (Nakano) (also known as the matrix inversion method) and in (Rick and Stuart) (also known as the extended Lagrangian method) based on the electronegativity equilization principle.  

These fixes can be used with any pair style in LAMMPS, so long as per-atom charges are defined. The most typical use-case is in conjunction with a pair style that performs charge equilibration periodically (e.g. every timestep), such as the ReaxFF or Streitz-Mintmire potential. But these fixes can also be used with potentials that normally assume per-atom charges are fixed, e.g. a Buckingham or LJ/Coulombic potential.  

Because the charge equilibration calculation is effectively independent of the pair style, these fixes can also be used to perform a one-time assignment of charges to atoms. For example, you could define the QEq fix, perform a zero-timestep run via the run command without any pair style defined which would set per-atom charges (based on the current atom configuration), then remove the fix via the unfix command before performing further dynamics.  

![](images/52f1a990bf77d507fb64a98c7907339feac34c0b9cded8cda1381fbbb12b5d6c.jpg)  

# Note  

Computing and using charge values different from published values defined for a fixed-charge potential like Buckingham or CHARMM or AMBER, can have a strong effect on energies and forces, and produces a different model than the published versions.  

# Note  

The fix qeq/comb command must still be used to perform charge equilibration with the COMB potential. The fix qeq/reaxff command can be used to perform charge equilibration with the ReaxFF force field, although fix qeq/shielded yields the same results as fix qeq/reaxff if Nevery, cutoff, and tolerance are the same. Eventually the fix qeq/reaxff command will be deprecated.  

The QEq method minimizes the electrostatic energy of the system (or equalizes the derivative of energy with respect to charge of all the atoms) by adjusting the partial charge on individual atoms based on interactions with their neighbors within cutoff. It requires a few parameters in the appropriate units for each atom type which are read from a file specified by qfile. The file has the following format:  

1 chi eta gamma zeta qcore 2 chi eta gamma zeta qcore Ntype chi eta gamma zeta qcore except for fix style qeq/ctip where the format is:  

<html><body><table><tr><td></td></tr><tr><td>1 chi eta gamma zeta qcore q qmin qmax omega</td></tr><tr><td>2 chi eta gamma zeta qcore @ qmin qmax omega</td></tr><tr><td></td></tr><tr><td>Ntype chi eta gamma zeta qcore qmin 1 qmax omega</td></tr></table></body></html>  

There have to be parameters given for every atom type. Wildcard entries are possible using the same type range syntax as for “coeff” commands (i.e., $\mathfrak{n}^{*}\mathfrak{m}$ , $\mathrm{n^{*}}$ , $^{*}\mathrm{m},^{*},$ . Later entries will overwrite previous ones. Empty lines or any text following the pound sign $(\#)$ are ignored. Each line starts with the atom type followed by eight parameters. Only a subset of the parameters is used by each QEq style as described below, thus the others can be set to 0.0 if desired, but all eight entries per line are required.  

• $c h i=$ electronegativity in energy units   
• eta $=$ self-Coulomb potential in energy units   
• gamma $=$ shielded Coulomb constant defined by ReaxFF force field in distance units   
• zeta $=$ Slater type orbital exponent defined by the Streitz-Mintmire potential in reverse distance units   
• qcore $=$ charge of the nucleus defined by the Streitz-Mintmire potential potential in charge units   
• qmin $=$ lower bound on the allowed charge defined by the CTIP potential in charge units   
• qmax $=$ upper bound on the allowed charge defined by the CTIP potential in charge units   
• omega $=$ penalty parameter used to enforce charge bounds defined by the CTIP potential in energy units  

The fix qeq styles will print a warning if the charges are not equilibrated within tolerance by maxiter steps, unless the warn keyword is used with “no” as argument. This latter option may be useful for testing and benchmarking purposes, as it allows to use a fixed number of QEq iterations when tolerance is set to a small enough value to always reach the maxiter limit. Turning off warnings will avoid the excessive output in that case.  

The qeq/point style describes partial charges on atoms as point charges. Interaction between a pair of charged particles is $1/\mathrm{r}$ , which is the simplest description of the interaction between charges. Only the chi and eta parameters from the qfile file are used. Note that Coulomb catastrophe can occur if repulsion between the pair of charged particles is too weak. This style solves partial charges on atoms via the matrix inversion method. A tolerance of 1.0e-6 is usually a good number.  

The qeq/shielded style describes partial charges on atoms also as point charges, but uses a shielded Coulomb potential to describe the interaction between a pair of charged particles. Interaction through the shielded Coulomb is given by equation (13) of the ReaxFF force field paper. The shielding accounts for charge overlap between charged particles at small separation. This style is the same as fix qeq/reaxff , and can be used with pair_style reaxff . Only the chi, eta, and gamma parameters from the qfile file are used. When using the string reaxff as filename, these parameters are extracted directly from an active reaxff pair style. This style solves partial charges on atoms via the matrix inversion method. A tolerance of 1.0e-6 is usually a good number.  

The qeq/slater style describes partial charges on atoms as spherical charge densities centered around atoms via the Slater 1s orbital, so that the interaction between a pair of charged particles is the product of two Slater 1s orbitals. The expression for the Slater 1s orbital is given under equation (6) of the Streitz-Mintmire paper. Only the chi, eta, zeta, and qcore parameters from the qfile file are used. When using the string coul/streitz as filename, these parameters are extracted directly from an active coul/streitz pair style. This style solves partial charges on atoms via the matrix inversion method. A tolerance of 1.0e-6 is usually a good number. Keyword alpha can be used to change the Slater type orbital exponent.  

Added in version 19Nov2024.  

The qeq/ctip style describes partial charges on atoms in the same way as style qeq/shielded but also enables the definition of charge bounds. Only the chi, eta, gamma, qmin, qmax, and omega parameters from the qfile file are used. When using the string coul/ctip as filename, these parameters are extracted directly from an active coul/ctip pair style. This style solves partial charges on atoms via the matrix inversion method. Keyword cdamp can be used to change the damping parameter used to calculate Coulomb interactions. Keyword maxrepeat can be used to adjust the number of equilibration cycles allowed to ensure no atoms have crossed the charge bounds. A value of 10 is usually a good choice. A tolerance between $1.0\mathrm{e}{-6}$ and $1.0\mathrm{e}{-}8$ is usually a good choice but should be checked in conjunction with the timestep for adequate energy conservation during dynamic runs.  

The qeq/dynamic style describes partial charges on atoms as point charges that interact through 1/r, but the extended Lagrangian method is used to solve partial charges on atoms. Only the chi and eta parameters from the qfile file are used. Note that Coulomb catastrophe can occur if repulsion between the pair of charged particles is too weak. A tolerance of 1.0e-3 is usually a good number. Keyword qdamp can be used to change the damping factor, while keyword qstep can be used to change the time step size.  

The \*qeq/fire\* style describes the same charge model and charge solver as the qeq/dynamic style, but employs a FIRE minimization algorithm to solve for equilibrium charges. Keyword qdamp can be used to change the damping factor, while keyword qstep can be used to change the time step size.  

Note that qeq/point, qeq/shielded, qeq/slater, and qeq/ctip describe different charge models, whereas the matrix inversion method and the extended Lagrangian method (qeq/dynamic and qeq/fire) are different solvers.  

Note that qeq/point, qeq/dynamic and qeq/fire styles all describe charges as point charges that interact through 1/r relationship, but solve partial charges on atoms using different solvers. These three styles should yield comparable results if the QEq parameters and Nevery, cutoff, and tolerance are the same. Style qeq/point is typically faster, qeq/dynamic scales better on larger sizes, and qeq/fire is faster than qeq/dynamic.  

![](images/4bb1a5114793ab814d0f61e58d9b923825a284b2914b025ad3e8afa1ddb29d2f.jpg)  

# Note  

In order to solve the self-consistent equations for electronegativity equalization, LAMMPS imposes the additional constraint that all the charges in the fix group must add up to zero. The initial charge assignments should also satisfy this constraint. LAMMPS will print a warning if that is not the case.  

![](images/849299ab0a75a9d62312a47eee2da5e614ee67ce93e633cb3fcfc0abf6e73083.jpg)  

# Note  

Developing QEq parameters (chi, eta, gamma, zeta, and qcore) is non-trivial. Charges on atoms are not guaranteed to equilibrate with arbitrary choices of these parameters. We do not develop these QEq parameters. See the examples/qeq directory for some examples.  

# 2.178.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about these fixes is written to binary restart files. No global scalar or vector or per-atom quantities are stored by these fixes for access by various output commands. No parameter of these fixes can be used with the start/stop keywords of the run command.  

Thexe fixes are invoked during energy minimization.  

# 2.178.5 Restrictions  

These fixes are part of the QEQ package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

These qeq fixes will ignore electric field contributions from fix efield.  

# 2.178.6 Related commands  

fix qeq/reaxff , fix qeq/comb  

# 2.178.7 Default  

warn yes  

(Rappe and Goddard) A. K. Rappe and W. A. Goddard III, J Physical Chemistry, 95, 3358-3363 (1991).   
(Nakano) A. Nakano, Computer Physics Communications, 104, 59-69 (1997).   
(Rick and Stuart) S. W. Rick, S. J. Stuart, B. J. Berne, J Chemical Physics 101, 16141 (1994).   
(Streitz-Mintmire) F. H. Streitz, J. W. Mintmire, Physical Review B, 50, 16, 11996 (1994)   
(CTIP) G. Plummer, J. P. Tavenner, M. I. Mendelev, Z. Wu, J. W. Lawson, in preparation   
(ReaxFF) A. C. T. van Duin, S. Dasgupta, F. Lorant, W. A. Goddard III, J Physical Chemistry, 105, 9396-9049 (2001) (QEq/Fire) T.-R. Shan, A. P. Thompson, S. J. Plimpton, in preparation  

# 2.179 fix qeq/comb command  

Accelerator Variants: qeq/comb/omp  

# 2.179.1 Syntax  

fix ID group-ID qeq/comb Nevery precision keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
qeq/comb $=$ style name of this fix command   
• Nevery $=$ perform charge equilibration every this many steps   
• precision $=$ convergence criterion for charge equilibration   
• zero or more keyword/value pairs may be appended   
• keyword $=f l e$ file value $=$ filename filename $=$ name of file to write QEQ equilibration info t  

# 2.179.2 Examples  

# 2.179.3 Description  

Perform charge equilibration $({\mathrm{QeQ}})$ in conjunction with the COMB (Charge-Optimized Many-Body) potential as described in (COMB_1) and (COMB_2). It performs the charge equilibration portion of the calculation using the so-called QEq method, whereby the charge on each atom is adjusted to minimize the energy of the system. This fix can only be used with the COMB potential; see the fix qeq/reaxff command for a QeQ calculation that can be used with any potential.  

Only charges on the atoms in the specified group are equilibrated. The fix relies on the pair style (COMB in this case) to calculate the per-atom electronegativity (effective force on the charges). An electronegativity equalization calculation (or QEq) is performed in an iterative fashion, which in parallel requires communication at each iteration for processors to exchange charge information about nearby atoms with each other. See Rappe_and_Goddard and Rick_and_Stuart for details.  

During a run, charge equilibration is performed every Nevery time steps. Charge equilibration is also always enforced on the first step of each run. The precision argument controls the tolerance for the difference in electronegativity for all atoms during charge equilibration. Precision is a trade-off between the cost of performing charge equilibration (more iterations) and accuracy.  

If the file keyword is used, then information about each equilibration calculation is written to the specified file.  

![](images/d29505bd277135414e422d295be727c55fb6ebfc55354fa318dd8e45765e975c.jpg)  

# Note  

In order to solve the self-consistent equations for electronegativity equalization, LAMMPS imposes the additional constraint that all the charges in the fix group must add up to zero. The initial charge assignments should also satisfy this constraint. LAMMPS will print a warning if that is not the case.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.179.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is performing charge equilibration. Default is the outermost level.  

This fix produces a per-atom vector which can be accessed by various output commands. The vector stores the gradient of the charge on each atom. The per-atom values be accessed on any timestep.  

# 2.179. fix qeq/comb command  

No parameter of this fix can be used with the start/stop keywords of the run command.   
This fix can be invoked during energy minimization.  

# 2.179.5 Restrictions  

This fix command currently only supports pair style \*comb\*.  

# 2.179.6 Related commands  

pair_style comb  

# 2.179.7 Default  

No file output is performed.  

(COMB_1) J. Yu, S. B. Sinnott, S. R. Phillpot, Phys Rev B, 75, 085311 (2007), (COMB_2) T.-R. Shan, B. D. Devine, T. W. Kemper, S. B. Sinnott, S. R. Phillpot, Phys Rev B, 81, 125328 (2010). (Rappe_and_Goddard) A. K. Rappe, W. A. Goddard, J Phys Chem 95, 3358 (1991). (Rick_and_Stuart) S. W. Rick, S. J. Stuart, B. J. Berne, J Chem Phys 101, 16141 (1994).  

# 2.180 fix qeq/reaxff command  

Accelerator Variants: qeq/reaxff/kk, qeq/reaxff/omp  

# 2.180.1 Syntax  

fix ID group-ID qeq/reaxff Nevery cutlo cuthi tolerance params args • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command qeq/reaxf $=$ style name of this fix command • Nevery $=$ perform QEq every this many steps • cutlo,cuthi $=$ lo and hi cutoff for Taper radius • tolerance $=$ precision to which charges will be equilibrated params $=$ reaxff or a filename one or more keywords or keyword/value pairs may be appended keyword $=$ dual or maxiter or nowarn dual $=$ process S and T matrix in parallel (only for qeq/reaxff/omp) maxiter $\mathrm{N}=$ limit the number of iterations to N nowarn $=$ do not print a warning message if the maximum number of iterations was reached  

# 2.180.2 Examples  

fix 1 all qeq/reaxff 1 0.0 10.0 1.0e-6 reaxff fix 1 all qeq/reaxff 1 0.0 10.0 1.0e-6 param.qeq maxiter 500  

# 2.180.3 Description  

Perform the charge equilibration (QEq) method as described in (Rappe and Goddard) and formulated in (Nakano). It is typically used in conjunction with the ReaxFF force field model as implemented in the pair_style reaxff command, but it can be used with any potential in LAMMPS, so long as it defines and uses charges on each atom. The fix qeq/comb command should be used to perform charge equilibration with the COMB potential. For more technical details about the charge equilibration performed by fix qeq/reaxff, see the (Aktulga) paper.  

The QEq method minimizes the electrostatic energy of the system by adjusting the partial charge on individual atoms based on interactions with their neighbors. It requires some parameters for each atom type. If the params setting above is the word “reaxff”, then these are extracted from the pair_style reaxff command and the ReaxFF force field file it reads in. If a file name is specified for params, then the parameters are taken from the specified file and the file must contain one line for each atom type. The latter form must be used when performing QeQ with a non-ReaxFF potential. Each line should be formatted as follows:  

where itype is the atom type from 1 to Ntypes, chi denotes the electronegativity in eV, eta denotes the self-Coulomb potential in eV, and gamma denotes the valence orbital exponent. Note that these 3 quantities are also in the ReaxFF potential file, except that eta is defined here as twice the eta value in the ReaxFF file. Note that unlike the rest of LAMMPS, the units of this fix are hard-coded to be A, eV, and electronic charge.  

The optional dual keyword allows to perform the optimization of the S and T matrices in parallel. This is only supported for the qeq/reaxff/omp style. Otherwise they are processed separately. The qeq/reaxff/kk style always solves the S and T matrices in parallel.  

The optional maxiter keyword allows changing the max number of iterations in the linear solver. The default value is 200.  

The optional nowarn keyword silences the warning message printed when the maximum number of iterations was reached. This can be useful for comparing serial and parallel results where having the same fixed number of QEq iterations is desired, which can be achieved by using a very small tolerance and setting maxiter to the desired number of iterations.  

![](images/b340e0708e8ac5281dc63908e4b91670a6454364d7e61d2fd51f6298bd1c012d.jpg)  

# Note  

In order to solve the self-consistent equations for electronegativity equalization, LAMMPS imposes the additional constraint that all the charges in the fix group must add up to zero. The initial charge assignments should also satisfy this constraint. LAMMPS will print a warning if that is not the case.  

# 2.180.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. This fix computes a global scalar (the number of iterations) for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is invoked during energy minimization.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.180.5 Restrictions  

This fix is part of the REAXFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix does not correctly handle interactions involving multiple periodic images of the same atom. Hence, it should not be used for periodic cell dimensions smaller than the non-bonded cutoff radius, which is typically $10\textup{\AA}$ for ReaxFF simulations.  

This fix may be used in combination with fix efield and will apply the external electric field during charge equilibration, but there may be only one fix efield instance used and the electric field vector may only have components in non-periodic directions. Equal-style variables can be used for electric field vector components without any further settings. Atomstyle variables can be used for spatially-varying electric field vector components, but the resulting electric potential must be specified as an atom-style variable using the potential keyword for fix efield.  

# 2.180.6 Related commands  

pair_style reaxff , fix qeq/shielded, fix acks2/reaxff , fix qtpie/reaxff  

# 2.180.7 Default  

maxiter 200  

(Rappe) Rappe and Goddard III, Journal of Physical Chemistry, 95, 3358-3363 (1991). (Nakano) Nakano, Computer Physics Communications, 104, 59-69 (1997) (Aktulga) Aktulga, Fogarty, Pandit, Grama, Parallel Computing, 38, 245-259 (2012).  

# 2.181 fix qmmm command  

# 2.181.1 Syntax  

# 2.181.3 Description  

This fix provides functionality to enable a quantum mechanics/molecular mechanics (QM/MM) coupling of LAMMPS to a quantum mechanical code. The current implementation only supports an ONIOM style mechanical coupling to the Quantum ESPRESSO plane wave DFT package. Electrostatic coupling is in preparation and the interface has been written in a manner that coupling to other QM codes should be possible without changes to LAMMPS itself.  

The interface code for this is in the lib/qmmm directory of the LAMMPS distribution and is being made available at this early stage of development in order to encourage contributions for interfaces to other QM codes. This will allow the LAMMPS side of the implementation to be adapted if necessary before being finalized.  

Details about how to use this fix are currently documented in the description of the QM/MM interface code itself in lib/qmmm/README.  

# 2.181.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global scalar or vector or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.181.5 Restrictions  

This fix is part of the QMMM package. It is only enabled if LAMMPS was built with that package. It also requires building a library provided with LAMMPS. See the Build package page for more info.  

The fix is only functional when LAMMPS is built as a library and linked with a compatible QM program and a QM/MM front end into a QM/MM executable. See the lib/qmmm/README file for details.  

# 2.181.6 Related commands  

none  

# 2.181.7 Default  

none  

# 2.182 fix qtb command  

# 2.182.1 Syntax  

fix ID group-ID qtb keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• qtb $=$ style name of this fix   
• zero or more keyword/value pairs may be appended   
• keyword $=$ temp or damp or seed or f_max or N_f temp value $=$ target quantum temperature (temperature units) damp value $=$ damping parameter (time units) inverse of friction gamma seed value $=$ random number seed (positive integer) f_max value $=$ upper cutoff frequency of the vibration spectrum (1/time units) N_f value $=$ number of frequency bins (positive integer)  

# 2.182.2 Examples  

$\#$ (liquid methane modeled with the REAX force field, real units) fix 1 all nve   
fix 1 all qtb temp 110 damp 200 seed 35082 f_max 0.3 N_f 100 $\#$ (quartz modeled with the BKS force field, metal units)   
fix 2 all nph iso 1.01325 1.01325 1   
fix 2 all qtb temp 300 damp 1 seed 47508 f_max 120.0 N_f 100  

# 2.182.3 Description  

This command performs the quantum thermal bath scheme proposed by (Dammak) to include self-consistent quantum nuclear effects, when used in conjunction with the fix nve or fix nph commands.  

Classical molecular dynamics simulation does not include any quantum nuclear effect. Quantum treatment of the vibrational modes will introduce zero point energy into the system, alter the energy power spectrum and bias the heat capacity from the classical limit. Missing all the quantum nuclear effects, classical MD cannot model systems at temperatures lower than their classical limits. This effect is especially important for materials with a large population of hydrogen atoms and thus higher classical limits.  

The equation of motion implemented by this command follows a Langevin form:  

$$
m_{i}a_{i}=f_{i}+R_{i}-m_{i}\gamma\nu_{i}
$$  

Here $m_{i},a_{i},f_{i},R_{i},\gamma,\mathrm{and}\nu_{i}$ represent in this order mass, acceleration, force exerted by all other atoms, random force, frictional coefficient (the inverse of damping parameter damp), and velocity. The random force $R_{i}$ is “colored” so that any vibrational mode with frequency $\omega$ will have a temperature-sensitive energy $\theta(\omega,T)$ which resembles the energy expectation for a quantum harmonic oscillator with the same natural frequency:  

$$
\theta(\omega T)=\frac{\hbar}{2}+\hbar\omega\left[\exp(\frac{\hbar\omega}{k_{B}T})-1\right]^{-1}
$$  

To efficiently generate the random forces, we employ the method of (Barrat), that circumvents the need to generate all random forces for all times before the simulation. The memory requirement of this approach is less demanding and independent of the simulation duration. Since the total random force $R_{t o t}$ does not necessarily vanish for a finite number of atoms, Ri is replaced by Ri − RNttoott to avoid collective motion of the system.  

The temp parameter sets the target quantum temperature. LAMMPS will still have an output temperature in its thermo style. That is the instantaneous classical temperature $T^{c l}$ derived from the atom velocities at thermal equilibrium. A non-zero $T^{c l}$ will be present even when the quantum temperature approaches zero. This is associated with zero-point energy at low temperatures.  

$$
T^{c l}=\sum\frac{m_{i}\nu_{i}^{2}}{3N k_{B}}
$$  

The damp parameter is specified in time units, and it equals the inverse of the frictional coefficient γ. γ should be as small as possible but slightly larger than the timescale of anharmonic coupling in the system which is about 10 ps to 100 ps. When γ is too large, it gives an energy spectrum that differs from the desired Bose-Einstein spectrum. When γ is too small, the quantum thermal bath coupling to the system will be less significant than anharmonic effects, reducing to a classical limit. We find that setting γ between 5 THz and 1 THz could be appropriate depending on the system.  

The random number seed is a positive integer used to initiate a Marsaglia random number generator. Each processor uses the input seed to generate its own unique seed and its own stream of random numbers. Thus the dynamics of the system will not be identical on two runs on different numbers of processors.  

The $f_{-}$ _max parameter truncate the noise frequency domain so that vibrational modes with frequencies higher than f_max will not be modulated. If we denote $\Delta t$ as the time interval for the MD integration, $f_{-}$ _max is always reset by the code to make $\alpha=(i n t)(2f\_m a x\Delta t)^{-1}$ a positive integer and print out relative information. An appropriate value for the cutoff frequency $f_{-}$ _max would be around $2{\sim}3~f_{D}$ , where $f_{D}$ is the Debye frequency.  

The $N_{\rightarrow}f$ parameter is the frequency grid size, the number of points from 0 to $f_{-}$ _max in the frequency domain that will be sampled. $3^{*}2N_{\cal{f}}$ per-atom random numbers are required in the random force generation and there could be as many atoms as in the whole simulation that can migrate into every individual processor. A larger $N_{-}f$ provides a more accurate sampling of the spectrum while consumes more memory. With fixed $f_{-}$ _max and $\gamma,N_{\perp}f$ should be big enough to converge the classical temperature $T^{c l}$ as a function of target quantum bath temperature. Memory usage per processor could be from 10 to $100\mathrm{MB}$ ytes.  

![](images/0f176c4171b984babf87a8ddc20deb5591bf225743ce9eb8ff75be3e8a05fa1b.jpg)  

# Note  

Unlike the fix nvt command which performs Nose/Hoover thermostatting AND time integration, this fix does NOT perform time integration. It only modifies forces to a colored thermostat. Thus you must use a separate time integration fix, like fix nve or fix nph to actually update the velocities and positions of atoms (as shown in the examples). Likewise, this fix should not normally be used with other fixes or commands that also specify system temperatures , e.g. fix nvt and fix temp/rescale.  

# 2.182.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. Because the state of the random number generator is not saved in restart files, this means you cannot do “exact” restarts with this fix. However, in a statistical sense, a restarted simulation should produce similar behaviors of the system.  

This fix is not invoked during energy minimization.  

# 2.182.5 Restrictions  

This fix style is part of the QTB package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.182.6 Related commands  

fix nve, fix nph, fix langevin, fix qbmsst  

# 2.182.7 Default  

The keyword defaults are temp $=300$ , damp $=1$ , $\mathrm{seed}=880302$ , f_max $=200.0$ and $\mathrm{~N~f~}=100$ .  

(Dammak) Dammak, Chalopin, Laroche, Hayoun, and Greffet, Phys Rev Lett, 103, 190601 (2009).   
(Barrat) Barrat and Rodney, J. Stat. Phys, 144, 679 (2011).  

# 2.183 fix qtpie/reaxff command  

# 2.183.1 Syntax  

fix ID group-ID qtpie/reaxff Nevery cutlo cuthi tolerance params gfile args  

• ID, group-ID are documented in fix command qtpie/reaxff $=$ style name of this fix command   
• Nevery $=$ perform QTPIE every this many steps   
• cutlo,cuthi $=$ lo and hi cutoff for Taper radius   
• tolerance $=$ precision to which charges will be equilibrated   
• params $=$ reaxff or a filename   
• gfile $=$ the name of a file containing Gaussian orbital exponents   
• one or more keywords or keyword/value pairs may be appended keyword $=$ maxiter maxiter $\mathrm{N}=$ limit the number of iterations to N  

# 2.183.2 Examples  

<html><body><table><tr><td>fix 1 all qtpie/reaxff 1 0.0 10.0 1.0e-6 reaxff exp.qtpie fix 1 all c /reaxff 1 0.0 10.0 1.0e-6 params.qtpie exp.qtpie maxiter 500</td></tr></table></body></html>  

# 2.183.3 Description  

Added in version 19Nov2024.  

The QTPIE charge equilibration method is an extension of the QEq charge equilibration method. With QTPIE, the partial charges on individual atoms are computed by minimizing the electrostatic energy of the system in the same way as the QEq method but where the absolute electronegativity, $\chi_{i}$ , of each atom in the QEq charge equilibration scheme (Rappe and Goddard) is replaced with an effective electronegativity given by (Chen)  

$$
\chi_{\mathrm{eff},i}=\frac{\sum_{j=1}^{N}(\chi_{i}-\chi_{j})S_{i j}}{\sum_{m=1}^{N}S_{i m}},
$$  

which acts to penalize long-range charge transfer seen with the QEq charge equilibration scheme. In this equation, $N$ is the number of atoms in the system and $S_{i j}$ is the overlap integral between atom $i$ and atom $j$ .  

The effect of an external electric field can be incorporated into the QTPIE method by modifying the absolute or effective electronegativities of each atom (Chen). This fix models the effect of an external electric field by using the effective electronegativity given in (Gergs):  

$$
\chi_{\mathrm{eff},i}=\frac{\sum_{j=1}^{N}(\chi_{i}-\chi_{j}+\phi_{i}-\phi_{j})S_{i j}}{\sum_{m=1}^{N}S_{i m}},
$$  

where $\phi_{i}$ and $\phi_{j}$ are the electric potentials at the positions of atom $i$ and $j$ due to the external electric field.  

This fix is typically used in conjunction with the ReaxFF force field model as implemented in the pair_style reaxff command, but it can be used with any potential in LAMMPS, so long as it defines and uses charges on each atom. For more technical details about the charge equilibration performed by fix qtpie/reaxff, which is the same as in fix qeq/reaxff except for the use of $\chi_{\mathrm{eff},i}$ , please refer to (Aktulga). To be explicit, this fix replaces $\chi_{k}$ of eq. 3 in (Aktulga) with $\chi_{\mathrm{eff},k}$ .  

This fix requires the absolute electronegativity, $\chi$ , in eV, the self-Coulomb potential, $\eta$ , in eV, and the shielded Coulomb constant, $\gamma,$ in Å− . If the params setting above is the word “reaxff”, then these are extracted from the pair_style reaxff command and the ReaxFF force field file it reads in. If a file name is specified for params, then the parameters are taken from the specified file and the file must contain one line for each atom type. The latter form must be used when performing QTPIE with a non-ReaxFF potential. Each line should be formatted as follows, ensuring that the parameters are given in units of eV, eV, and Å− , respectively:  

where itype is the atom type from 1 to Ntypes. Note that eta is defined here as twice the eta value in the ReaxFF file.  

The overlap integrals in the equation for $\chi_{\mathrm{eff},i}$ are computed by using normalized 1s Gaussian type orbitals. The Gaussian orbital exponents, $\alpha$ , that are needed to compute the overlap integrals are taken from the file given by gfile. This file must contain one line for each atom type and provide the Gaussian orbital exponent for each atom type in units of inverse square Bohr radius. Each line should be formatted as follows:  

Empty lines or any text following the pound sign (#) are ignored. An example gfile for a system with two atom types is  

# An example gfile. Exponents are taken from Table 2.2 of Chen, J. (2009). # Theory and applications of fluctuating-charge models.   
# The units of the exponents are 1 / (Bohr radius) $\widehat{\mathbf{\xi}}^{2}$ .   
1 0.2240 # O   
2 0.5434 # H  

The optional maxiter keyword allows changing the max number of iterations in the linear solver. The default value is 200.  

# Note  

In order to solve the self-consistent equations for electronegativity equalization, LAMMPS imposes the additional constraint that all the charges in the fix group must add up to zero. The initial charge assignments should also satisfy this constraint. LAMMPS will print a warning if that is not the case.  

# 2.183.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. This fix computes a global scalar (the number of iterations) and a per-atom vector (the effective electronegativity), which can be accessed by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is invoked during energy minimization.  

# 2.183.5 Restrictions  

This fix is part of the REAXFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix does not correctly handle interactions involving multiple periodic images of the same atom. Hence, it should not be used for periodic cell dimensions smaller than the non-bonded cutoff radius, which is typically 10 Å for ReaxFF simulations.  

This fix may be used in combination with fix efield and will apply the external electric field during charge equilibration, but there may be only one fix efield instance used and the electric field must be applied to all atoms in the system. Consequently, fix efield must be used with group- $\cdot I D$ all and must not be used with the keyword region. Equal-style  

variables can be used for electric field vector components without any further settings. Atom-style variables can be used for spatially-varying electric field vector components, but the resulting electric potential must be specified as an atom-style variable using the potential keyword for fix efield.  

# 2.183.6 Related commands  

pair_style reaxff , fix qeq/reaxff , fix acks2/reaxff  

# 2.183.7 Default  

maxiter 200  

(Rappe) Rappe and Goddard III, Journal of Physical Chemistry, 95, 3358-3363 (1991).   
(Chen) Chen, Jiahao. Theory and applications of fluctuating-charge models. University of Illinois at UrbanaChampaign, 2009.   
(Gergs) Gergs, Dirkmann and Mussenbrock. Journal of Applied Physics 123.24 (2018).   
(Aktulga) Aktulga, Fogarty, Pandit, Grama, Parallel Computing, 38, 245-259 (2012).  

# 2.184 fix reaxff/bonds command  

Accelerator Variants: reaxff/bonds/kk  

# 2.184.1 Syntax  

fix ID group-ID reaxff/bonds Nevery filename • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • reax/bonds $=$ style name of this fix command • Nevery $=$ output interval in timesteps • filename $=$ name of output file  

# 2.184.2 Examples  

• nb $=$ number of bonds   
• id_1 $=$ atom id of first bond   
• id_nb $=$ atom id of Nth bond   
• mol $=$ molecule id   
• bo_1 $=$ bond order of first bond   
• bo_nb $=$ bond order of Nth bond   
• abo $=$ atom bond order (sum of all bonds)   
• ${\mathrm{nlp}}=$ number of lone pairs   
• ${\bf q}={\bf\Psi}$ atomic charge  

If the filename ends with “.gz”, the output file is written in gzipped format. A gzipped dump file will be about 3x smaller than the text version, but will also take longer to write.  

# 2.184.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.184.5 Restrictions  

The fix reaxff/bonds command requires that the pair_style reaxff is invoked. This fix is part of the REAXFF package.   
It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

To write gzipped bond files, you must compile LAMMPS with the -DLAMMPS_GZIP option.  

# 2.184.6 Related commands  

pair_style reaxff , fix reaxff/species  

# 2.184.7 Default  

none  

# 2.185 fix reaxff/species command  

Accelerator Variants: reaxff/species/kk  

# 2.185.1 Syntax  

fix ID group-ID reaxff/species Nevery Nrepeat Nfreq filename keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• reaxff/species $=$ style name of this command   
• Nevery $=$ sample bond-order every this many timesteps   
• Nrepeat $=\#$ of bond-order samples used for calculating averages   
• Nfreq $=$ calculate average bond-order every this many timesteps   
• filename $=$ name of output file   
• zero or more keyword/value pairs may be appended   
• keyword $=$ cutoff or element or position or delete or delete_rate_limit cutoff value $=\mathrm{~I~J~}$ Cutoff I, $\mathrm{J}=$ atom types (see asterisk form below) Cutoff $=$ Bond-order cutoff value for this pair of atom types element value $=$ Element1, Element2, ... position value $=$ posfreq filepos posfreq $=$ write position files every this many timestep filepos $=$ name of position output file delete value = filedel keyword value filedel = name of delete species output file keyword = specieslist or masslimit specieslist value = Nspecies Species1 Species2 ... Nspecies = number of species in list masslimit value = massmin massmax massmin $-$ minimum molecular weight of species to delete massmax $=$ maximum molecular weight of species to delete delete_rate_limit value $=$ Nlimit Nsteps Nlimit $=$ maximum number of deletions allowed to occur within interval Nsteps $=$ the interval (number of timesteps) over which to count deletions  

# 2.185.2 Examples  

fix 1 all reaxff/species 10 10 100 species.out fix 1 all reaxff/species 1 2 20 species.out cutoff 1 1 0.40 cutoff $1~2^{*}3~0.55$ fix 1 all reaxff/species 1 100 100 species.out element Au O H position 1000 AuOH.pos fix 1 all reaxff/species 1 100 100 species.out delete species.del masslimit 0 50  

# 2.185.3 Description  

Write out the chemical species information computed by the ReaxFF potential specified by pair_style reaxff . Bondorder values (either averaged or instantaneous, depending on value of Nrepeat) are used to determine chemical bonds. Every Nfreq timesteps, chemical species information is written to filename as a two line output. The first line is a header containing labels. The second line consists of the following: timestep, total number of molecules, total number of distinct species, number of molecules of each species. In this context, “species” means a unique molecule. The chemical formula of each species is given in the first line.  

# Warning  

In order to compute averaged data, it is required that there are no neighbor list rebuilds for at least Nrepeat\*Nevery steps preceding each Nfreq step. For that reason, fix reaxff/species may change your neighbor list settings. Reneighboring will occur no more frequently than every Nrepeat\*Nevery timesteps, and will occur less frequently if Nfreq is not a multiple of Nrepeat\*Nevery. There will be a warning message showing the new settings. Having a Nfreq setting that is larger than what is required for correct computation of the ReaxFF force field interactions, in combination with certain Nrepeat and Nevery settings, can thus lead to incorrect results. For typical ReaxFF calculations, reneighboring only every 100 steps is already quite a low frequency.  

If the filename ends with “.gz”, the output file is written in gzipped format. A gzipped dump file will be about $3\mathbf{x}$ smaller than the text version, but will also take longer to write.  

Added in version $15\mathrm{Jun}2023$ : Support for wildcards added  

Optional keyword cutoff can be assigned to change the minimum bond-order values used in identifying chemical bonds between pairs of atoms. Bond-order cutoffs should be carefully chosen, as bond-order cutoffs that are too small may include too many bonds (which will result in an error), while cutoffs that are too large will result in fragmented molecules. The default cutoff of 0.3 usually gives good results. A wildcard asterisk can be used in place of or in conjunction with the I,J arguments to set the bond-order cutoff for multiple pairs of atom types. This takes the form “\*” or $\mathbf{\overline{{\rho}}}^{\mathbf{6}\mathbf{*}}\mathbf{\overline{{n}}}^{\mathbf{,}\mathbf{,}}$ or $\mathbf{\Psi}^{66}\mathbf{n}^{*}{}^{,}$ or $\mathrm{^{6}m^{*}n^{,}}$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from n to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

The optional keyword element can be used to specify the chemical symbol printed for each LAMMPS atom type. The number of symbols must match the number of LAMMPS atom types and each symbol must consist of 1 or 2 alphanumeric characters. By default, these symbols are the same as the chemical identity of each LAMMPS atom type, as specified by the ReaxFF pair_coeff command and the ReaxFF force field file.  

The optional keyword position writes center-of-mass positions of each identified molecules to file filepos every posfreq timesteps. The first line contains information on timestep, total number of molecules, total number of distinct species, and box dimensions. The second line is a header containing labels. From the third line downward, each molecule writes a line of output containing the following information: molecule ID, number of atoms in this molecule, chemical formula, total charge, and center-of-mass xyz positions of this molecule. The xyz positions are in fractional coordinates relative to the box dimensions.  

For the keyword position, the filepos is the name of the output file. It can contain the wildcard character “\*”. If the “\*” character appears in filepos, then one file per snapshot is written at posfreq and the “\*” character is replaced with the timestep value. For example, AuO.pos.\* becomes AuO.pos.0, AuO.pos.1000, etc.  

Added in version 3Aug2022.  

The optional keyword delete enables the periodic removal of molecules from the system (Gissinger). Criteria for deletion can be either a list of specific chemical formulae or a range of molecular weights. Molecules are deleted every Nfreq timesteps, and bond connectivity is determined using the Nevery and Nrepeat keywords. The filedel argument is the name of the output file that records the species that are removed from the system. The specieslist keyword permits specific chemical species to be deleted. The Nspecies argument specifies how many species are eligible for deletion and is followed by a list of chemical formulae, whose strings are compared to species identified by this fix. For example, “specieslist 2 CO CO2” deletes molecules that are identified as “CO” and “CO2” in the species output file. When using the specieslist keyword, the filedel file has the following format: the first line lists the chemical formulae eligible for deletion, and each additional line contains the timestep on which a molecule deletion occurs and the number of each species deleted on that timestep. The masslimit keyword permits deletion of molecules with molecular weights between massmin and massmax. When using the masslimit keyword, each line of the filedel file contains the timestep on which deletions occurs, followed by how many of each species are deleted (with quantities preceding chemical formulae). The specieslist and masslimit keywords cannot both be used in the same reaxff/species fix. The delete_rate_limit keyword can enforce an upper limit on the overall rate of molecule deletion. The number of deletion occurrences is limited to Nlimit within an interval of Nsteps timesteps. Nlimit can be specified with an equal-style variable. When using the delete_rate_limit keyword, no deletions are permitted to occur within the first Nsteps timesteps of the first run (after reading a either a data or restart file).  

The Nevery, Nrepeat, and Nfreq arguments specify on what timesteps the bond-order values are sampled to get the average bond order. The species analysis is performed using the average bond-order on timesteps that are a multiple of Nfreq. The average is over Nrepeat bond-order samples, computed in the preceding portion of the simulation every Nevery timesteps. Nfreq must be a multiple of Nevery and Nevery must be non-zero even if Nrepeat is 1. Also, the timesteps contributing to the average bond-order cannot overlap, i.e. Nrepeat\*Nevery can not exceed Nfreq.  

For example, if Nevery $=2$ , Nrepeat $_{=6}$ , and Nfreq $\mathord{\left|=\right.\kern-\nulldelimiterspace}00$ , then bond-order values on timesteps 90,92,94,96,98,100 will be used to compute the average bond-order for the species analysis output on timestep 100.  

# 2.185.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix computes both a global vector of length 2 and a per-atom vector, either of which can be accessed by various output commands. The values in the global vector are “intensive”.  

The 2 values in the global vector are as follows:  

1. total number of molecules   
2. total number of distinct species  

The per-atom vector stores the molecule ID for each atom as identified by the fix. If an atom is not in a molecule, its ID will be 0. For atoms in the same molecule, the molecule ID for all of them will be the same, and molecule IDs will range from 1 to the number of molecules.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.185.5 Restrictions  

The “fix reaxff/species” requires that pair_style reaxff is used. This fix is part of the REAXFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

To write gzipped species files, you must compile LAMMPS with the -DLAMMPS_GZIP option.  

# 2.185.6 Related commands  

pair_style reaxff , fix reaxff/bonds  

# 2.185.7 Default  

The default values for bond-order cutoffs are 0.3 for all I-J pairs. The default element symbols are taken from the ReaxFF pair_coeff command. Position files are not written by default.  

(Gissinger) Jacob R. Gissinger, Scott R. Zavada, Joseph G. Smith, Josh Kemppainen, Ivan Gallegos, Gregory M.   
Odegard, Emilie J. Siochi, and Kristopher E. Wise, Carbon, 202, 336-347 (2023).  

# 2.186 fix recenter command  

Accelerator Variants: recenter/kk  

# 2.186.1 Syntax  

fix ID group-ID recenter x y z keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• recenter $=$ style name of this fix command   
• $\mathbf{X},\mathbf{y},\mathbf{Z}=$ constrain center-of-mass to these coords (distance units), any coord can also be NULL or INIT (see below)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ shift or units shift value $=$ group-ID group-ID $=$ group of atoms whose coords are shifted units value $=$ box or lattice or fraction  

# 2.186.2 Examples  

fix 1 all recenter 0.0 0.5 0.0 fix 1 all recenter INIT INIT NULL fix 1 all recenter INIT 0.0 0.0 units box  

# 2.186.3 Description  

Constrain the center-of-mass position of a group of atoms by adjusting the coordinates of the atoms every timestep. This is simply a small shift that does not alter the dynamics of the system or change the relative coordinates of any pair of atoms in the group. This can be used to ensure the entire collection of atoms (or a portion of them) do not drift during the simulation due to random perturbations (e.g. fix langevin thermostatting).  

Distance units for the x,y,z values are determined by the setting of the units keyword, as discussed below. One or more x,y,z values can also be specified as NULL, which means exclude that dimension from this operation. Or it can be specified as INIT which means to constrain the center-of-mass to its initial value at the beginning of the run.  

The center-of-mass (COM) is computed for the group specified by the fix. If the current COM is different than the specified x,y,z, then a group of atoms has their coordinates shifted by the difference. By default the shifted group is also the group specified by the fix. A different group can be shifted by using the shift keyword. For example, the COM could be computed on a protein to keep it in the center of the simulation box. But the entire system (protein $^+$ water) could be shifted.  

# 2.186. fix recenter command  

If the units keyword is set to box, then the distance units of x,y,z are defined by the units command - e.g. Angstroms for real units. A lattice value means the distance units are in lattice spacings. The lattice command must have been previously used to define the lattice spacing. A fraction value means a fractional distance between the lo/hi box boundaries, e.g. $0.5=$ middle of the box. The default is to use lattice units.  

Note that the velocity command can be used to create velocities with zero aggregate linear and/or angular momentum.  

# $\Theta$ Note  

This fix performs its operations at the same point in the timestep as other time integration fixes, such as fix nve, fix nvt, or fix npt. Thus fix recenter should normally be the last such fix specified in the input script, since the adjustments it makes to atom coordinates should come after the changes made by time integration. LAMMPS will warn you if your fixes are not ordered this way.  

![](images/3b35a0cdfaf9d572449be0d9f3892b823e7eef3e666d0f143c720a42d77877e8.jpg)  

# Note  

If you use this fix on a small group of atoms (e.g. a molecule in solvent) without using the shift keyword to adjust the positions of all atoms in the system, then the results can be unpredictable. For example, if the molecule is pushed consistently in one direction by a flowing solvent, its velocity will increase. But its coordinates will be re-centered, meaning it is moved back towards the force. Thus over time, the velocity and effective temperature of the molecule could become very large, though it won’t actually be moving due to the re-centering. If you are thermostatting the entire system, then the solvent would be cooled to compensate. A better solution for this simulation scenario is to use the fix spring command to tether the molecule in place.  

# 2.186.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the distance the group is moved by fix recenter.  

This fix also computes global 3-vector which can be accessed by various output commands. The 3 quantities in the vector are xyz components of displacement applied to the group of atoms by the fix.  

The scalar and vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.186.5 Restrictions  

This fix should not be used with an x,y,z setting that causes a large shift in the system on the first timestep, due to the requested COM being very different from the initial COM. This could cause atoms to be lost, especially in parallel. Instead, use the displace_atoms command, which can be used to move atoms a large distance.  

# 2.186.6 Related commands  

fix momentum, velocity  

# 2.186.7 Default  

The option defaults are shift $=$ fix group-ID, and units $=$ lattice.  

# 2.187 fix restrain command  

# 2.187.1 Syntax  

fix ID group-ID restrain keyword args ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• restrain $=$ style name of this fix command   
• one or more keyword/arg pairs may be appended   
• keyword $=$ bond or lbound or angle or dihedral bond $\mathrm{args=atom1}$ atom2 Kstart Kstop r0start (r0stop) atom1,atom2 $=$ IDs of two atoms in bond Kstart,Kstop $=$ restraint coefficients at start/end of run (energy units) r0start $=$ equilibrium bond distance at start of run (distance units) r0stop = equilibrium bond distance at end of run (optional) (distance units). If not specified it is assumed to be equal to r0start lbound args = atom1 atom2 Kstart Kstop r0start (r0stop) atom1,atom2 = IDs of two atoms in bond Kstart,Kstop = restraint coefficients at start/end of run (energy units) r0start = equilibrium bond distance at start of run (distance units) r0stop = equilibrium bond distance at end of run (optional) (distance units). If not specified it is assumed to be equal to r0start angle args = atom1 atom2 atom3 Kstart Kstop theta0 atom1,atom2,atom3 = IDs of three atoms in angle, atom2 = middle atom Kstart,Kstop = restraint coefficients at start/end of run (energy units) theta0 = equilibrium angle theta (degrees) dihedral args = atom1 atom2 atom3 atom4 Kstart Kstop phi0 keyword/value atom1,atom2,atom3,atom4 = IDs of 4 atoms in dihedral in linear order Kstart,Kstop = restraint coefficients at start/end of run (energy units) phi0 = equilibrium dihedral angle phi (degrees) keyword/value = optional keyword value pairs. supported keyword/value pairs: mult n = dihedral multiplicity n (integer $>=0$ , default = 1)  

# 2.187.2 Examples  

fix holdem all restrain bond 45 48 2000.0 2000.0 2.75   
fix holdem all restrain lbound 45 48 2000.0 2000.0 2.75   
fix holdem all restrain dihedral 1 2 3 4 2000.0 2000.0 120.0   
fix holdem all restrain bond 45 48 2000.0 2000.0 2.75 dihedral 1 2 3 4 2000.0 2000.0 120.0   
fix texas_holdem all restrain dihedral 1 2 3 4 0.0 2000.0 120.0 dihedral 1 2 3 5 0.0 2000.0 -120.0 dihedral␣   
$\rightarrow1\mathrm{~2~3~6~}0.0\mathrm{~2000.0~0.0~}$  

# 2.187.3 Description  

Restrain the motion of the specified sets of atoms by making them part of a bond or angle or dihedral interaction whose strength can vary over time during a simulation. This is functionally similar to creating a bond or angle or dihedral for the same atoms in a data file, as specified by the read_data command, albeit with a time-varying prefactor coefficient, and except for exclusion rules, as explained below.  

For the purpose of force field parameter-fitting or mapping a molecular potential energy surface, this fix reduces the hassle and risk associated with modifying data files. In other words, use this fix to temporarily force a molecule to adopt a particular conformation. To create a permanent bond or angle or dihedral, you should modify the data file.  

![](images/d62e8d5ef985cfd858cc6b527424fd5ba6fb4e4d1cd9c32d497706c7e4d31c43.jpg)  

# Note  

Adding a bond/angle/dihedral with this command does not apply the exclusion rules and weighting factors specified by the special_bonds command to atoms in the restraint that are now bonded (1-2,1-3,1-4 neighbors) as a result. If they are close enough to interact in a pair_style sense (non-bonded interaction), then the bond/angle/dihedral restraint interaction will simply be superposed on top of that interaction.  

The group-ID specified by this fix is ignored.  

The second example above applies a restraint to hold the dihedral angle formed by atoms 1, 2, 3, and 4 near 120 degrees using a constant restraint coefficient. The fourth example applies similar restraints to multiple dihedral angles using a restraint coefficient that increases from 0.0 to 2000.0 over the course of the run.  

![](images/61f4250c4ba8fea24f89c1812755c60a6a006b1c6e6beb525ee3d998f7654190.jpg)  

# Note  

Adding a force to atoms implies a change in their potential energy as they move due to the applied force field. For dynamics via the run command, this energy can be added to the system’s potential energy for thermodynamic output (see below). For energy minimization via the minimize command, this energy must be added to the system’s potential energy to formulate a self-consistent minimization problem (see below).  

In order for a restraint to be effective, the restraint force must typically be significantly larger than the forces associated with conventional force field terms. If the restraint is applied during a dynamics run (as opposed to during an energy minimization), a large restraint coefficient can significantly reduce the stable timestep size, especially if the atoms are initially far from the preferred conformation. You may need to experiment to determine what value of $K$ works best for a given application.  

For the case of finding a minimum energy structure for a single molecule with particular restraints (e.g. for fitting force field parameters or constructing a potential energy surface), commands such as the following may be useful:  

# minimize molecule energy with restraints velocity all create 600.0 8675309 mom yes rot yes dist gaussian fix NVE all nve fix TFIX all langevin 600.0 0.0 100 24601  

(continues on next page)  

(continued from previous page)  

fix REST all restrain dihedral 2 1 3 8 0.0 5000.0 \${angle1} dihedral 3 1 2 9 0.0 5000.0 \${angle2}   
fix $-$ modify REST energy yes   
run 10000   
fix TFIX all langevin 0.0 0.0 100 24601   
fix REST all restrain dihedral 2 1 3 8 5000.0 5000.0 \${angle1} dihedral 3 1 2 9 5000.0 5000.0 \${angle2}   
fix_modify REST energy yes   
run 10000   
# sanity check for convergence   
minimize 1e-6 1e-9 1000 100000   
# report unrestrained energies   
unfix REST   
run 0  

The bond keyword applies a bond restraint to the specified atoms using the same functional form used by the bond_style harmonic command. The potential associated with the restraint is  

$$
E=K(r-r_{0})^{2}
$$  

with the following coefficients:  

• $K$ (energy/distance^2) • $r_{0}$ (distance)  

$K$ and $r_{0}$ are specified with the fix. Note that the usual $1/2$ factor is included in $K$ .  

The lbound keyword applies a lower bound bond restraint to the specified atoms using the same functional form used by the bond_style harmonic command if the distance between the atoms is smaller than the equilibrium bond distance and 0 otherwise. The potential associated with the restraint is  

$$
\begin{array}{l}{{E=K(r-r_{0})^{2},i f r<r_{0}}}\ {{}}\ {{E=0}}\end{array}
$$  

with the following coefficients:  

• K (energy/distance^2) • $r_{0}$ (distance)  

$K$ and $r_{0}$ are specified with the fix. Note that the usual $1/2$ factor is included in $K$ .  

The angle keyword applies an angle restraint to the specified atoms using the same functional form used by the angle_style harmonic command. The potential associated with the restraint is  

$$
E=K(\theta-\theta_{0})^{2}
$$  

with the following coefficients:  

• K (energy) • $\theta_{0}$ (degrees)  

# 2.187. fix restrain command  

$K$ and $\theta_{0}$ are specified with the fix. $\theta_{0}$ is specified in degrees, but LAMMPS converts it to radians internally; hence $K$ is effectively energy per radian $\mathbf{\nabla}^{\wedge}2$ . Note that the usual 1/2 factor is included in $K$ .  

The dihedral keyword applies a dihedral restraint to the specified atoms using a simplified form of the function used by the dihedral_style charmm command. The potential associated with the restraint is  

$$
E=K[1+\cos(n\phi-d)]
$$  

with the following coefficients:  

• K (energy) • $n$ (multiplicity, $>=0$ ) $\bullet d(\mathrm{degrees})=\phi_{0}+180$  

$K$ and $\phi_{0}$ are specified with the fix. Note that the value of the dihedral multiplicity $n$ is set by default to 1. You can use the optional mult keyword to set it to a different positive integer. Also note that the energy will be a minimum when the current dihedral angle $\phi$ is equal to $\phi_{0}$ .  

# 2.187.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the potential energy associated with this fix to the global potential energy of the system as part of thermodynamic output The default setting for this fix is fix_modify energy no.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the $r$ -RESPA integrator the fix is adding its forces. Default is the outermost level.  

![](images/c45a260dc08d69b275b4a1353e93055cff9302b8ca9d4be00292405f80133b07.jpg)  

# Note  

If you want the fictitious potential energy associated with the added forces to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for this fix.  

This fix computes a global scalar and a global vector of length 3, which can be accessed by various output commands. The scalar is the total potential energy for all the restraints as discussed above. The vector values are the sum of contributions to the following individual categories:  

1. bond energy   
2. angle energy   
3. dihedral energy  

The scalar and vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

# 2.187.5 Restrictions  

none  

# 2.187.6 Related commands  

none  

# 2.187.7 Default  

none  

# 2.188 fix rheo command  

# 2.188.1 Syntax  

fix ID group-ID rheo cut kstyle zmin keyword values...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• rheo $=$ style name of this fix command   
• cut $=$ cutoff for the kernel (distance)   
• kstyle $=$ quintic or RK0 or RK1 or RK2   
• zmin $=$ minimal number of neighbors for reproducing kernels   
• zero or more keyword/value pairs may be appended to args   
• keyword $=$ thermal or interface/reconstruct or surface/detection or shift or rho/sum or density or speed/sound thermal turns on thermal evolution values $=$ none interface/reconstruct reconstructs interfaces with solid particles values $=$ none surface/detection detects free-surfaces with an absence of particles values = sdstyle limit limit/splash sdstyle = coordination or divergence limit = threshold for surface particles limit/splash = threshold for splash particles (unitless) shift turns on velocity shifting values = none optional args = exclude/type or scale/cross/type exclude/type values = types types = list of types scale/cross/type values = shiftscale cmin wmin shiftscale = fraction of shifting in normal direction to preserve (unitless) cmin = minimum color function value required for scaling (unitless) wmin = minimum local same-type support required for any shifting (unitless) rho/sum density evolution performed by a kernel summation values = none optional args = self/mass self/mass values = none, a particle uses its own mass in summation density specify equilibrium densities for each atom type values = rho01, ... rho0N (density) speed/sound specify speeds of sound for each atom type values = cs0, ... csN (velocity)  

# 2.188.2 Examples  

fix 1 all rheo 3.0 quintic 0 thermal density 0.1 0.1 speed/sound 10.0 1.0 fix 1 all rheo 3.0 RK1 10 shift surface/detection coordination 40 fix 1 all rheo 3.0 RK1 10 shift exclude/type $2^{*}4$ scale/cross/type 0.05 0.02 0.5 fix 1 all rheo 3.0 RK1 10 rhosum self/mass  

# 2.188.3 Description  

Added in version 29Aug2024.  

Perform time integration for RHEO particles, updating positions, velocities, and densities. For a detailed breakdown of the integration timestep and numerical details, see (Palermo). For an overview and list of other features available in the RHEO package, see the RHEO howto.  

The type of kernel is specified using kstyle and the cutoff is cut. Four kernels are currently available. The quintic kernel is a standard quintic spline function commonly used in SPH. The other options, RK0, RK1, and RK2, are zeroth, first, and second order reproducing. To generate a reproducing kernel, a particle must have sufficient neighbors inside the kernel cutoff distance (a coordination number) to accurately calculate moments. This threshold is set by zmin. If reproducing kernels are requested but a particle has fewer neighbors, then it will revert to a non-reproducing quintic kernel until it gains more neighbors.  

To model temperature evolution, one must specify the thermal keyword, define a separate instance of fix rheo/thermal, and use atom style rheo/thermal.  

By default, the density of solid RHEO particles does not evolve and forces with fluid particles are calculated using the current velocity of the solid particle. If the interface/reconstruct keyword is used, then the density and velocity of solid particles are alternatively reconstructed for every fluid-solid interaction to ensure no-slip and pressure-balanced boundaries. This is done by estimating the location of the fluid-solid interface and extrapolating fluid particle properties across the interface to calculate a temporary apparent density and velocity for a solid particle. The numerical details are the same as those described in (Palermo) except there is an additional restriction that the reconstructed solid density cannot be less than the equilibrium density. This prevents fluid particles from sticking to solid surfaces.  

A modified form of Fickian particle shifting can be enabled with the shift keyword. This effectively shifts particle positions to generate a more uniform spatial distribution. By default, shifting does not consider the type of a particle and therefore may be inappropriate in systems consisting of multiple atom types representing multiple fluid phases. However, two optional sub-arguments can follow the shift keyword, exclude/type and scale/cross/type to adjust shifting at fluid interfaces.  

The exclude/type option lets the user specify a list of atom types which are not shifted, types. A wild-card asterisk can be used in place of or in conjunction with the types argument to toggle shifting for multiple atom types. This takes the form “\*” or $^{66*}\mathrm{n}^{,,}$ or $\ '_{\mathrm{m}}\mathrel{\ast}\mathrel{\mathop{:}}$ or $\mathbf{\tilde{\rho}}_{\mathrm{m}}^{*}\mathbf{\tilde{\rho}}_{\mathrm{n}}^{,}$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

The scale/cross/type option is designed to handle interfaces between fluids made up of different atom types. Similar to the method by $(Y a n g)$ , a color function is calculated and used to estimate a local interfacial normal vector. Shifting along this normal direction is rescaled by a factor of scaleshift, such that a value of scaleshift of zero implies there is no shifting in the normal direction and a value of scaleshift of one implies no change in behavior. This scaling is only applied to atoms with a color function value greater than cmin. To handle scenarios of a small inclusion of one fluid type (e.g. a single atom) inside another, the degree of same-type support is calculated  

$$
W_{i,\mathrm{same}}=\sum_{j}W_{i j}\delta_{i j}
$$  

where $\delta_{i j}$ is zero if atoms $i$ and $j$ have different types but unity otherwise. If $W_{i,\mathrm{same}}$ is ever less than the specified value of wmin, shifting is turned off for particle $i$  

In systems with free surfaces (atom-vacuum), the surface/detection keyword can classify the location of particles as being within the bulk fluid, on a free surface, or isolated from other particles in a splash or droplet. Shifting is then disabled in the normal direction away from the free surface to prevent particles from diffusing away. Surface detection can also be used to control surface-nucleated effects like oxidation when used in combination with fix rheo/oxidation. Surface detection is not performed on solid bodies.  

The surface/detection keyword takes three arguments: sdstyle, limit, and limit/splash. The first, sdstyle, specifies whether surface particles are identified using a coordination number (coordination) or the divergence of the local particle positions (divergence). The threshold value for a surface particle for either of these criteria is set by the numerical value of limit. Additionally, if a particle’s coordination number is too low, i.e. if it has separated off from the bulk in a droplet, it is not possible to define surfaces and the particle is classified as a splash. The coordination threshold for this classification is set by the numerical value of limit/splash.  

By default, RHEO integrates particles’ densities using a mass diffusion equation. Alternatively, one can update densities every timestep by performing a kernel summation of the masses of neighboring particles by specifying the rho/sum keyword. Following this keyword, one may include the optional self/mass sub-argument which modifies the behavior of the density summation. Typically, the density $\rho$ of a particle is calculated as the sum over neighbors  

$$
\rho_{i}=\sum_{j}W_{i j}M_{j}
$$  

where $W_{i j}$ is the kernel, and $M_{j}$ is the mass of particle $j$ . The self/mass keyword augments this expression by replacing $M_{j}$ with $M_{i}$ . This may be useful in simulations of multiple fluid phases with large differences in density, $(H u)$ .  

The density keyword is used to specify the equilibrium density of each of the $\mathbf{N}$ particle types. It must be followed by N numerical values specifying each type’s equilibrium density rho0.  

The speed/sound keyword is used to specify the speed of sound of each of the N particle types. It must be followed by N numerical values specifying each type’s speed of sound cs. These values may be ignored if the pressure equation of state has a non-constant speed of sound, as discussed further in fix rheo/pressure.  

# 2.188.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.188.5 Restrictions  

This fix must be used with atom style rheo or rheo/thermal. This fix must be used in conjunction with fix rheo/pressure. and fix rheo/viscosity. If the thermal setting is used, there must also be an instance of fix rheo/thermal. The fix group must be set to all. Only one instance of fix rheo may be defined and it must be defined prior to all other RHEO fixes in the input script.  

This fix is part of the RHEO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.188.6 Related commands  

fix rheo/viscosity, fix rheo/pressure, fix rheo/thermal, pair rheo, compute rheo/property/atom  

# 2.188.7 Default  

rho0 and cs are set to 1.0 for all atom types.  

(Palermo) Palermo, Wolf, Clemmer, O’Connor, Phys. Fluids, 36, 113337 (2024).  

(Yang) Yang, Rakhsha, Hu, Negrut, J. Comp. Physics, 458, 111079 (2022). Hu) Hu, and Adams, J. Comp. Physics, 213, 844-861 (2006).  

# 2.189 fix rheo/oxidation command  

# 2.189.1 Syntax  

fix ID group-ID rheo/oxidation cut btype rsurf • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • rheo/oxidation $=$ style name of this fix command • cut $=$ maximum bond length (distance units) • btype $=$ type of bonds created • rsurf $=$ distance from surface to create bonds (distance units)  

# 2.189.2 Examples  

<html><body><table><tr><td>fix 1 all rheo/oxidation 1.5 2 0.0</td></tr><tr><td>fix 1 all rheo/oxidation 1.0 1 2.0</td></tr></table></body></html>  

# 2.189.3 Description  

Added in version $29\mathrm{Aug}2024$ .  

This fix dynamically creates bonds on the surface of fluids to represent physical processes such as oxidation. It is intended for use with bond style bond rheo/shell.  

Every timestep, particles check neighbors within a distance of cut. This distance must be smaller than the kernel length defined in fix rheo. Bonds of type btype are created between a fluid particle and either a fluid or solid neighbor. The fluid particles must also be on the fluid surface, or within a distance of rsurf from the surface. This process is further described in (Clemmer).  

If used in conjunction with solid bodies, such as those generated by the react option of fix rheo/thermal, it is recommended to use a hybrid bond style with different bond types for solid and oxide bonds.  

# 2.189.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.189.5 Restrictions  

This fix must be used with the bond style rheo/shell and fix rheo with surface detection enabled.  

This fix is part of the RHEO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.189.6 Related commands  

fix rheo, bond rheo/shell, compute rheo/property/atom  

# 2.189.7 Default  

none  

(Clemmer) Clemmer, Pierce, O’Connor, Nevins, Jones, Lechman, Tencer, Appl. Math. Model., 130, 310-326 (2024).  

# 2.190 fix rheo/pressure command  

# 2.190.1 Syntax  

fix ID group-ID rheo/pressure type1 pstyle1 args1 ... typeN pstyleN argsN  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• rheo/pressure $=$ style name of this fix command   
• one or more types and pressure styles must be appended   
• types $=$ lists of types (see below)   
• pstyle $=$ linear or tait/water or tait/general or cubic or ideal/gas or background linear args $=$ none   
tait/water args $=$ none   
tait/general args $=$ exponent gamma (unitless)   
cubic args $=$ cubic prefactor $A_{3}$ (pressure/density $\widehat{\mathbf{\xi}}^{2}$ ) ideal/gas args $=$ heat capacity ratio gamma (unitless) background args $=$ background pressure P[b] (pressure)  

# 2.190.2 Examples  

fix 1 all rheo/pressure \* linear fix 1 all rheo/pressure 1 linear 2 cubic 10.0 fix 1 all rheo/pressure \* linear \* background 0.1  

# 2.190.3 Description  

Added in version 29Aug2024.  

This fix defines a pressure equation of state for RHEO particles. One can define different equations of state for different atom types. An equation must be specified for every atom type.  

One first defines the atom types. A wild-card asterisk can be used in place of or in conjunction with the types argument to set values for multiple atom types. This takes the form “\*” or $\mathbf{\overline{{\Omega}}^{6*}\mathbf{\overline{{\Omega}}\mathbf{n}}^{,,}}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\flat}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

The types definition is followed by the pressure style, pstyle. Current options linear, taitwater, and cubic. Style linear is a linear equation of state with a particle pressure $P$ calculated as  

$$
P=c^{2}(\rho-\rho_{0})
$$  

# 2.190. fix rheo/pressure command  

where $c$ is the speed of sound, $\rho_{0}$ is the equilibrium density, and $\rho$ is the current density of a particle. The numerical values of $c$ and $\rho_{0}$ are set in $f\boldsymbol{{x}}$ rheo. Style cubic is a cubic equation of state which has an extra argument $A_{3}$ ,  

$$
P=c^{2}((\rho-\rho_{0})+A_{3}(\rho-\rho_{0})^{3}).
$$  

Style tait/water is Tait’s equation of state:  

$$
P=\frac{c^{2}\rho_{0}}{7}\left[\left(\frac{\rho}{\rho_{0}}\right)^{7}-1\right].
$$  

Style tait/general generalizes this equation of state  

$$
P=\frac{c^{2}\rho_{0}}{\gamma}\left[\left(\frac{\rho}{\rho_{0}}\right)^{\gamma}-1\right].
$$  

where γ is an exponent.  

Style ideal/gas is the ideal gas equation of state  

$$
P=(\gamma-1)\rho e
$$  

where $\gamma$ is the heat capacity ratio and $e$ is the internal energy of a particle per unit mass. This style is only compatible with atom style rheo/thermal. Note that when using this style, the speed of sound is no longer constant such that the value of $c$ specified in fix rheo is not used.  

The background style acts differently than the rest as it only adds a constant background pressure shift $P[b]$ to all atoms of the designated types. Therefore, this style must be used in conjunction with another style that specifies an equation of state.  

# 2.190.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.190.5 Restrictions  

This fix must be used with an atom style that includes density such as atom_style rheo or rheo/thermal. This fix must be used in conjunction with fix rheo. The fix group must be set to all. Only one instance of fix rheo/pressure can be defined.  

This fix is part of the RHEO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.190.6 Related commands  

fix rheo, pair rheo, compute rheo/property/atom  

# 2.190.7 Default  

none  

# 2.191 fix rheo/thermal command  

# 2.191.1 Syntax  

fix ID group-ID rheo/thermal attribute values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• rheo/thermal $=$ style name of this fix command   
• one or more attributes may be appended   
• attribute $=$ conductivity or specific/heat or latent/heat or Tfreeze or rea conductivity $\mathrm{args=types}$ style args types $=$ lists of types (see below) style $=$ constant constant arg $=$ conductivity (power/temperature) specific/heat args $=$ types style args types $=$ lists of types (see below) style = constant constant arg = specific heat (energy/(mass\*temperature)) latent/heat args = types style args types = lists of types (see below) style = constant constant arg = latent heat (energy/mass) Tfreeze args $-$ types style args types = lists of types (see below) style $-$ constant constant arg $=$ freezing temperature (temperature) react args = cut type cut = maximum bond distance type = bond type  

# 2.191.2 Examples  

fix 1 all rheo/thermal conductivity \* constant 1.0 specific/heat \* constant 1.0 Tfreeze \* constant 1.0 fix 1 all rheo/pressure conductivity $1^{*}2$ constant 1.0 conductivity $3^{*}4$ constant 2.0 specific/heat \*␣ $\hookrightarrow$ constant 1.0  

# 2.191.3 Description  

Added in version $29\mathrm{Aug}2024$ .  

This fix performs time integration of temperature for atom style rheo/thermal. In addition, it defines multiple thermal properties of particles and handles melting/solidification, if applicable. For more details on phase transitions in RHEO, see the RHEO howto.  

Note that the temperature of a particle is always derived from the energy. This implies the temperature attribute of the set command does not affect particles. Instead, one should use the sph/e attribute.  

For each atom type, one can define expressions for the conductivity, specific/heat, latent/heat, and critical temperature (Tfreeze). The conductivity and specific heat must be defined for all atom types. The latent heat and critical temperature are optional. However, a critical temperature must be defined to specify a latent heat.  

Note, if shifting is turned on in fix rheo, the gradient of the energy is used to shift energies. This may be inappropriate in systems with multiple atom types with different specific heats.  

For each property, one must first define a list of atom types. A wild-card asterisk can be used in place of or in conjunction with the types argument to set values for multiple atom types. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\flat}$ or $\ '_{\mathrm{m}}\ast_{\mathrm{n}}\cdots$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

The types definition for each property is followed by the style. Currently, the only option is constant. Style constant simply applies a constant value of respective property to each particle of the assigned type.  

The react keyword controls whether bonds are created/deleted when particles transition between a fluid and solid state. This option only applies to atom types that have a defined value of Tfreeze. When a fluid particle’s temperature drops below Tfreeze, bonds of type btype are created between nearby solid particles within a distance of cut. The particle’s status also swaps to a solid state. When a solid particle’s temperature rises above Tfreeze, all bonds of type btype are broken and the particle’s status swaps to a fluid state.  

# 2.191.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.191.5 Restrictions  

This fix must be used with an atom style that includes temperature, heatflow, and conductivity such as atom_style rheo/thermal This fix must be used in conjunction with fix rheo with the thermal setting. The fix group must be set to all. Only one instance of fix rheo/pressure can be defined.  

This fix is part of the RHEO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.191.6 Related commands  

fix rheo, pair rheo, compute rheo/property/atom, fix add/heat  

# 2.191.7 Default  

none  

# 2.192 fix rheo/viscosity command  

# 2.192.1 Syntax  

fix ID group-ID rheo/viscosity type1 pstyle1 args1 ... typeN pstyleN argsN  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• rheo/viscosity $=$ style name of this fix command   
• one or more types and viscosity styles must be appended   
• types $=$ lists of types (see below)   
• vstyle $=$ constant or power constant $\mathrm{args=eta}$ eta $=$ viscosity power a $\mathrm{rgs}=\mathrm{eta}$ , gd0, K, n eta $=$ viscosity $\mathrm{gd0=}$ critical strain rate K = consistency index  

n = power-law exponent  

# 2.192.2 Examples  

<html><body><table><tr><td>fix 1 all rheo/viscosity 米 constant1.0</td></tr></table></body></html>  

# 2.192.3 Description  

Added in version $29\mathrm{Aug}2024$ .  

This fix defines a viscosity for RHEO particles. One can define different viscosities for different atom types, but a viscosity must be specified for every atom type.  

One first defines the atom types. A wild-card asterisk can be used in place of or in conjunction with the types argument to set values for multiple atom types. This takes the form $\yen63,456,7$ or $\mathbf{\overline{{\Omega}}^{6*}\mathbf{\overline{{\Omega}}\mathbf{n}}^{,,}}$ or $^{\leftarrow}\mathrm{{m}}^{\ast}^{\flat}$ or $\mathbf{\tilde{\Omega}}^{\ast}\mathbf{n}^{\ast}$ . If $N$ is the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to n (inclusive). A trailing asterisk means all types from m to $N$ (inclusive). A middle asterisk means all types from m to n (inclusive).  

The types definition is followed by the viscosity style, vstyle. Two options are available, constant and power. Style constant simply applies a constant value of the viscosity eta to each particle of the assigned type. Style power is a Hershchel-Bulkley constitutive equation for the stress $\tau$  

$$
\tau=\left(\frac{\tau_{0}}{\dot{\gamma}}+K\dot{\gamma}^{n-1}\right)\dot{\gamma},\tau\geq\tau_{0}
$$  

where $\dot{\gamma}$ is the strain rate and $\tau_{0}$ is the critical yield stress, below which $\dot{\gamma}=0.0$ . To avoid divergences, this expression is regularized by defining a critical strain rate $g d O$ . If the local strain rate on a particle falls below this limit, a constant viscosity of eta is assigned. This implies a value of  

$$
\tau_{0}=\eta\dot{\gamma}_{0}-K\dot{\gamma}_{0}^{N}
$$  

# 2.192.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.192.5 Restrictions  

This fix must be used with an atom style that includes viscosity such as atom_style rheo or rheo/thermal. This fix must be used in conjunction with fix rheo. The fix group must be set to all. Only one instance of fix rheo/viscosity can be defined.  

This fix is part of the RHEO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.192.6 Related commands  

fix rheo, pair rheo, compute rheo/property/atom  

# 2.192.7 Default  

none  

# 2.193 fix rhok command  

# 2.193.1 Syntax  

fix ID group-ID rhok nx ny nz K a • ID, group-ID are documented in fix command • nx, ny, $\mathbf{n}\mathbf{z}=\operatorname{k}$ -vector of collective density field • $\mathtt{K}=$ spring constant of bias potential • ${\mathrm{a}}=$ anchor point of bias potential  

# 2.193.2 Examples  

fix bias all rhok 16 0 0 4.0 16.0   
fix 1 all npt temp 0.8 0.8 4.0 z 2.2 2.2 8.0   
# output of 4 values from fix rhok: U_bias rho_k_RE rho_k_IM \|rho_k\|   
thermo_style custom step temp pzz lz f_bias f_bias[1] f_bias[2] f_bias[3]  

# 2.193.3 Description  

The fix applies a force to atoms given by the potential  

$$
\begin{array}{l}{{\displaystyle U=\frac{1}{2}K(|\rho_{\vec{k}}|-a)^{2}}}\ {{\displaystyle\rho_{\vec{k}}=\sum_{j}^{N}\exp(-i\vec{k}\cdot\vec{r}_{j})/\sqrt{N}}}\ {{\displaystyle\vec{k}=(2\pi n_{x}/L_{x},2\pi n_{y}/L_{y},2\pi n_{z}/L_{z})}}\end{array}
$$  

as described in (Pedersen).  

This field, which biases configurations with long-range order, can be used to study crystal-liquid interfaces and determine melting temperatures (Pedersen).  

An example of using the interface pinning method is located in the examples/PACKAGES/rhok directory.  

# 2.193.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the potential energy calculated by the fix to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the potential energy discussed in the preceding paragraph. The scalar stored by this fix is “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is not invoked during energy minimization.  

# 2.193.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.193.6 Related commands  

thermo_style  

# 2.193.7 Default  

none  

(Pedersen) Pedersen, J. Chem. Phys., 139, 104102 (2013).  

# 2.194 fix rigid command  

Accelerator Variants: rigid/omp  

2.195 fix rigid/nve command  

Accelerator Variants: rigid/nve/omp  

2.196 fix rigid/nvt command  

Accelerator Variants: rigid/nvt/omp  

2.197 fix rigid/npt command  

Accelerator Variants: rigid/npt/omp  

2.198 fix rigid/nph command  

Accelerator Variants: rigid/nph/omp  

# 2.199 fix rigid/small command  

Accelerator Variants: rigid/small/omp  

2.200 fix rigid/nve/small command  

2.201 fix rigid/nvt/small command  

2.202 fix rigid/npt/small command  

2.203 fix rigid/nph/small command  

# 2.203.1 Syntax  

fix ID group-ID style bodystyle args keyword values ...  

• ID, group-ID are documented in fix command  

• style $=$ rigid or rigid/nve or rigid/nvt or rigid/npt or rigid/nph or rigid/small or rigid/nve/small or rigid/nvt/small or rigid/npt/small or rigid/nph/small  

• bodystyle $=$ single or molecule or group  

single $\mathrm{args}=\mathrm{none}$   
molecule $\mathrm{args}=\mathrm{none}$   
custom args $=\mathrm{i}$ _propname or v_varname   
i_propname ${\it\Delta\phi}=\mathrm{a}$ custom integer vector defined via fix property/atom   
v_varname ${\mathbf\xi}={\mathbf a}{\mathbf\Pi}$ atom-style or atomfile-style variable   
group args $=\mathrm{N}$ groupID1 groupID2 ... $\mathrm{N}=\#$ of groups groupID1, groupID2, $\dots=\mathrm{list}$ of N group IDs  

• zero or more keyword/value pairs may be appended  

• keyword $=$ langevin or reinit or temp or mol or iso or aniso or $x$ or $y$ or $\boldsymbol{\zeta}$ or couple or tparam or pchain or dilate or force or torque or infile or gravity  

langevin values $=$ Tstart Tstop Tperiod seed Tstart,Tstop $=$ desired temperature at start/stop of run (temperature units) Tdamp $=$ temperature damping parameter (time units) seed $=$ random number seed to use for white noise (positive integer)   
reinit value = yes or no   
temp values = Tstart Tstop Tdamp   
Tstart,Tstop $-$ desired temperature at start/stop of run (temperature units)   
Tdamp = temperature damping parameter (time units)   
mol value = template-ID  

template-ID = ID of molecule template specified in a separate molecule command iso or aniso values = Pstart Pstop Pdamp  

Pstart,Pstop = scalar external pressure at start/end of run (pressure units) Pdamp $-$ pressure damping parameter (time units) x or y or z values = Pstart Pstop Pdamp  

Pstart,Pstop = external stress tensor component at start/end of run (pressure units)  

Pdamp = stress damping parameter (time units) couple value = none or xyz or xy or yz or xz tparam values = Tchain Titer Torder  

Tchain = length of Nose/Hoover thermostat chain  

Titer = number of thermostat iterations performed  

Torder = 3 or 5 = Yoshida-Suzuki integration parameters pchain values = Pchain  

Pchain = length of the Nose/Hoover thermostat chain coupled with the barostat dilate value = dilate-group-ID  

dilate-group-ID = only dilate atoms in this group due to barostat volume changes force values = M xflag yflag zflag  

M = which rigid body from 1-Nbody (see asterisk form below)  

xflag,yflag,zflag = off/on if component of center-of-mass force is active torque values = M xflag yflag zflag  

M = which rigid body from 1-Nbody (see asterisk form below)  

xflag,yflag,zflag = off/on if component of center-of-mass torque is active infile filename  

filename = file with per-body values of mass, center-of-mass, moments of inertia gravity values = gravity-ID gravity-ID = ID of fix gravity command to add gravitational forces  

# 2.203.2 Examples  

fix 1 clump rigid single reinit yes   
fix 1 clump rigid/small molecule   
fix 1 clump rigid single force 1 off off on langevin 1.0 1.0 1.0 428984   
fix 1 polychains rigid/nvt molecule temp 1.0 1.0 5.0 reinit no   
fix 1 polychains rigid molecule force $1^{*}5$ off off off force $6^{*}10$ off off on   
fix 1 polychains rigid/small molecule langevin 1.0 1.0 1.0 428984   
fix 2 fluid rigid group 3 clump1 clump2 clump3 torque \* off off off   
fix 1 rods rigid/npt molecule temp 300.0 300.0 100.0 iso 0.5 0.5 10.0   
fix 1 particles rigid/npt molecule temp 1.0 1.0 5.0 x 0.5 0.5 1.0 z 0.5 0.5 1.0 couple xz   
fix 1 water rigid/nph molecule iso 0.5 0.5 1.0   
fix 1 particles rigid/npt/small molecule temp 1.0 1.0 1.0 iso 0.5 0.5 1.0   
variable bodyid atom 1.0\*gmask(clump1)+2.0\*gmask(clump2)+3.0\*gmask(clump3)   
fix 1 clump rigid custom v_bodyid   
variable bodyid atomfile bodies.txt   
fix 1 clump rigid custom v_bodyid   
fix 0 all property/atom i_bodyid   
read_restart data.rigid fix 0 NULL Bodies   
fix 1 clump rigid/small custom i_bodyid  

# 2.203.3 Description  

Treat one or more sets of atoms as independent rigid bodies. This means that each timestep the total force and torque on each rigid body is computed as the sum of the forces and torques on its constituent particles. The coordinates, velocities, and orientations of the atoms in each body are then updated so that the body moves and rotates as a single entity. This is implemented by creating internal data structures for each rigid body and performing time integration on these data structures. Positions, velocities, and orientations of the constituent particles are regenerated from the rigid body data structures in every time step. This restricts which operations and fixes can be applied to rigid bodies. See below for a detailed discussion.  

Examples of large rigid bodies are a colloidal particle, or portions of a biomolecule such as a protein.  

Example of small rigid bodies are patchy nanoparticles, such as those modeled in this paper by Sharon Glotzer’s group, clumps of granular particles, lipid molecules consisting of one or more point dipoles connected to other spheroids or ellipsoids, irregular particles built from line segments (2d) or triangles (3d), and coarse-grain models of nano or colloidal particles consisting of a small number of constituent particles. Note that the fix shake command can also be used to rigidify small molecules of 2, 3, or 4 atoms, e.g. water molecules. That fix treats the constituent atoms as point masses.  

These fixes also update the positions and velocities of the atoms in each rigid body via time integration, in the NVE, NVT, NPT, or NPH ensemble, as described below.  

There are two main variants of this fix, fix rigid and fix rigid/small. The NVE/NVT/NPT/NHT versions belong to one of the two variants, as their style names indicate.  

![](images/7d5ee540a2351f51096492a3430386e64a692b293fbe50a547e60a077cf8b3bc.jpg)  

# Note  

Not all of the bodystyle options and keyword/value options are available for both the rigid and rigid/small variants.   
See details below.  

The rigid styles are typically the best choice for a system with a small number of large rigid bodies, each of which can extend across the domain of many processors. It operates by creating a single global list of rigid bodies, which all processors contribute to. MPI_Allreduce operations are performed each timestep to sum the contributions from each processor to the force and torque on all the bodies. This operation will not scale well in parallel if large numbers of rigid bodies are simulated.  

The rigid/small styles are typically best for a system with a large number of small rigid bodies. Each body is assigned to the atom closest to the geometrical center of the body. The fix operates using local lists of rigid bodies owned by each processor and information is exchanged and summed via local communication between neighboring processors when ghost atom info is accumulated.  

![](images/e7ee22f7d73ab3f764b4663597dbc296c1e2a191c9c45a282661afb344986bcd.jpg)  

# Note  

To use the rigid/small styles the ghost atom cutoff must be large enough to span the distance between the atom that owns the body and every other atom in the body. This distance value is printed out when the rigid bodies are defined. If the pair_style cutoff plus neighbor skin does not span this distance, then you should use the comm_modify cutoff command with a setting epsilon larger than the distance.  

Which of the two variants is faster for a particular problem is hard to predict. The best way to decide is to perform a short test run. Both variants should give identical numerical answers for short runs. Long runs should give statistically similar results, but round-off differences may accumulate to produce divergent trajectories.  

![](images/0006373ad0e09d579cdf5ec8cf0c7d8d0515b841366a4108ce55a7091ddc9700.jpg)  

# Note  

You should not update the atoms in rigid bodies via other time-integration fixes (e.g. fix nve, fix nvt, fix npt, fix move), or you will have conflicting updates to positions and velocities resulting in unphysical behavior in most cases. When performing a hybrid simulation with some atoms in rigid bodies, and some not, a separate time integration fix like fix nve or fix nvt should be used for the non-rigid particles.  

![](images/95ab386a96cf11baeb7c4155909a956cb1b7ab61c2d64d33e051c1b78886c44b.jpg)  

# Note  

These fixes are overkill if you simply want to hold a collection of atoms stationary or have them move with a constant velocity. A simpler way to hold atoms stationary is to not include those atoms in your time integration fix. E.g. use “fix 1 mobile nve” instead of “fix 1 all nve”, where “mobile” is the group of atoms that you want to move. You can move atoms with a constant velocity by assigning them an initial velocity (via the velocity command), setting the force on them to 0.0 (via the fix setforce command), and integrating them as usual (e.g. via the fix nve command).  

# Warning  

The aggregate properties of each rigid body are calculated at the start of a simulation run and are maintained in internal data structures. The properties include the position and velocity of the center-of-mass of the body, its moments of inertia, and its angular momentum. This is done using the properties of the constituent atoms of the body at that point in time (or see the infile keyword option). Thereafter, changing these properties of individual atoms in the body will have no effect on a rigid body’s dynamics, unless they effect any computation of per-atom forces or torques. If the keyword reinit is set to yes (the default), the rigid body data structures will be recreated at the beginning of each run command; if the keyword reinit is set to no, the rigid body data structures will be built only at the very first run command and maintained for as long as the rigid fix is defined. For example, you might think you could displace the atoms in a body or add a large velocity to each atom in a body to make it move in a desired direction before a second run is performed, using the set or displace_atoms or velocity commands. But these commands will not affect the internal attributes of the body unless reinit is set to yes. With reinit set to no (or using the infile option, which implies reinit no) the position and velocity of individual atoms in the body will be reset when time integration starts again.  

Each rigid body must have two or more atoms. An atom can belong to at most one rigid body. Which atoms are in which bodies can be defined via several options.  

![](images/0654a843c7411c75ae130fe0d79702728ca3b1ee3ac8bc3a6182fc80c91a0c33.jpg)  

# Note  

With the rigid/small styles, which require that bodystyle be specified as molecule or custom, you can define a system that has no rigid bodies initially. This is useful when you are using the mol keyword in conjunction with another fix that is adding rigid bodies on-the-fly as molecules, such as fix deposit or fix pour.  

For bodystyle single the entire fix group of atoms is treated as one rigid body. This option is only allowed for the rigid styles.  

For bodystyle molecule, atoms are grouped into rigid bodies by their respective molecule IDs: each set of atoms in the fix group with the same molecule ID is treated as a different rigid body. This option is allowed for both the rigid and rigid/small styles. Note that atoms with a molecule $\mathrm{ID}=0$ will be treated as a single rigid body. For a system with atomic solvent (typically this is atoms with molecule $\mathrm{ID}=0$ ) surrounding rigid bodies, this may not be what you want. Thus you should be careful to use a fix group that only includes atoms you want to be part of rigid bodies.  

Bodystyle custom is similar to bodystyle molecule except that it is more flexible in using other per-atom properties to define the sets of atoms that form rigid bodies. A custom per-atom integer vector defined by the fix property/atom command can be used. Or an atom-style or atomfile-style variable can be used; the floating-point value produced by the variable is rounded to an integer. As with bodystyle molecule, each set of atoms in the fix groups with the same integer value is treated as a different rigid body. Since fix property/atom custom vectors and atom-style variables produce values for all atoms, you should be careful to use a fix group that only includes atoms you want to be part of rigid bodies.  

![](images/1be65a6ad8389d66df809a07610e3facf1abab8003d0e672892b710dd0e2597f.jpg)  

# Note  

To compute the initial center-of-mass position and other properties of each rigid body, the image flags for each atom in the body are used to “unwrap” the atom coordinates. Thus you must ensure that these image flags are consistent so that the unwrapping creates a valid rigid body (one where the atoms are close together), particularly if the atoms in a single rigid body straddle a periodic boundary. This means the input data file or restart file must define the image flags for each atom consistently or that you have used the set command to specify them correctly. If a dimension is non-periodic then the image flag of each atom must be 0 in that dimension, else an error is generated.  

The force and torque keywords discussed next are only allowed for the rigid styles.  

By default, each rigid body is acted on by other atoms which induce an external force and torque on its center of mass, causing it to translate and rotate. Components of the external center-of-mass force and torque can be turned off by the force and torque keywords. This may be useful if you wish a body to rotate but not translate, or vice versa, or if you wish it to rotate or translate continuously unaffected by interactions with other particles. Note that if you expect a rigid body not to move or rotate by using these keywords, you must ensure its initial center-of-mass translational or angular velocity is 0.0. Otherwise the initial translational or angular momentum the body has will persist.  

An xflag, yflag, or zflag set to off means turn off the component of force of torque in that dimension. A setting of on means turn on the component, which is the default. Which rigid body(s) the settings apply to is determined by the first argument of the force and torque keywords. It can be an integer M from 1 to Nbody, where Nbody is the number of rigid bodies defined. A wild-card asterisk can be used in place of, or in conjunction with, the M argument to set the flags for multiple rigid bodies. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $\mathbf{\tilde{\Sigma}}^{6}\mathbf{\tilde{n}}^{*}{\mathbf{\tilde{\Sigma}}}^{,*}$ or $\mathrm{^{6}m^{*}n^{,}}$ . If $\Nu=$ the number of rigid bodies, then an asterisk with no numeric values means all bodies from 1 to N. A leading asterisk means all bodies from 1 to n (inclusive). A trailing asterisk means all bodies from n to $\mathbf{N}$ (inclusive). A middle asterisk means all types from m to n (inclusive). Note that you can use the force or torque keywords as many times as you like. If a particular rigid body has its component flags set multiple times, the settings from the final keyword are used.  

# Note  

For computational efficiency, you may wish to turn off pairwise and bond interactions within each rigid body, as they no longer contribute to the motion. The neigh_modify exclude and delete_bonds commands are used to do this. If the rigid bodies have strongly overlapping atoms, you may need to turn off these interactions to avoid numerical problems due to large equal/opposite intra-body forces swamping the contribution of small inter-body forces.  

For computational efficiency, you should typically define one fix rigid or fix rigid/small command which includes all the desired rigid bodies. LAMMPS will allow multiple rigid fixes to be defined, but it is more expensive.  

The constituent particles within a rigid body can be point particles (the default in LAMMPS) or finite-size particles, such as spheres or ellipsoids or line segments or triangles. See the atom_style sphere and ellipsoid and line and tri commands for more details on these kinds of particles. Finite-size particles contribute differently to the moment of inertia of a rigid body than do point particles. Finite-size particles can also experience torque (e.g. due to frictional granular interactions) and have an orientation. These contributions are accounted for by these fixes.  

Forces between particles within a body do not contribute to the external force or torque on the body. Thus for computational efficiency, you may wish to turn off pairwise and bond interactions between particles within each rigid body. The neigh_modify exclude and delete_bonds commands are used to do this. For finite-size particles this also means the particles can be highly overlapped when creating the rigid body.  

The rigid, rigid/nve, rigid/small, and rigid/small/nve styles perform constant NVE time integration. They are referred to below as the 4 NVE rigid styles. The only difference is that the rigid and rigid/small styles use an integration technique based on Richardson iterations. The rigid/nve and rigid/small/nve styles uses the methods described in the paper by Miller, which are thought to provide better energy conservation than an iterative approach.  

The rigid/nvt and rigid/nvt/small styles performs constant NVT integration using a Nose/Hoover thermostat with chains as described originally in (Hoover) and (Martyna), which thermostats both the translational and rotational degrees of freedom of the rigid bodies. They are referred to below as the 2 NVT rigid styles. The rigid-body algorithm used by rigid/nvt is described in the paper by Kamberaj.  

The rigid/npt, rigid/nph, rigid/npt/small, and rigid/nph/small styles perform constant NPT or NPH integration using a Nose/Hoover barostat with chains. They are referred to below as the 4 NPT and NPH rigid styles. For the NPT case, the same Nose/Hoover thermostat is also used as with rigid/nvt and rigid/nvt/small.  

The barostat parameters are specified using one or more of the iso, aniso, x, y, z and couple keywords. These keywords give you the ability to specify 3 diagonal components of the external stress tensor, and to couple these components together so that the dimensions they represent are varied together during a constant-pressure simulation. The effects of these keywords are similar to those defined in fix npt/nph  

![](images/bee735ba03e159afdb1ce1ef2dd6ebedb17fa3219c688ef4c2423c15fd148577.jpg)  

# Note  

Currently the rigid/npt, rigid/nph, rigid/npt/small, and rigid/nph/small styles do not support triclinic (nonorthogonal) boxes.  

The target pressures for each of the 6 components of the stress tensor can be specified independently via the $x,y,z$ keywords, which correspond to the 3 simulation box dimensions. For each component, the external pressure or tensor component at each timestep is a ramped value during the run from Pstart to Pstop. If a target pressure is specified for a component, then the corresponding box dimension will change during a simulation. For example, if the $y$ keyword is used, the y-box length will change. A box dimension will not change if that component is not specified, although you have the option to change that dimension via the fix deform command.  

For all barostat keywords, the Pdamp parameter operates like the Tdamp parameter, determining the time scale on which pressure is relaxed. For example, a value of 10.0 means to relax the pressure in a timespan of (roughly) 10 time units (e.g. $\tau$ or fs or ps - see the units command).  

Regardless of what atoms are in the fix group (the only atoms which are time integrated), a global pressure or stress tensor is computed for all atoms. Similarly, when the size of the simulation box is changed, all atoms are re-scaled to new positions, unless the keyword dilate is specified with a dilate-group- $I D$ for a group that represents a subset of the atoms. This can be useful, for example, to leave the coordinates of atoms in a solid substrate unchanged and controlling the pressure of a surrounding fluid. Another example is a system consisting of rigid bodies and point particles where the barostat is only coupled with the rigid bodies. This option should be used with care, since it can be unphysical to dilate some atoms and not others, because it can introduce large, instantaneous displacements between a pair of atoms (one dilated, one not) that are far from the dilation origin.  

The couple keyword allows two or three of the diagonal components of the pressure tensor to be “coupled” together. The value specified with the keyword determines which are coupled. For example, $x z$ means the $P x x$ and $P z z$ components of the stress tensor are coupled. Xyz means all 3 diagonal components are coupled. Coupling means two things: the instantaneous stress will be computed as an average of the corresponding diagonal components, and the coupled box dimensions will be changed together in lockstep, meaning coupled dimensions will be dilated or contracted by the same percentage every timestep. The Pstart, Pstop, Pdamp parameters for any coupled dimensions must be identical. Couple xyz can be used for a 2d simulation; the z dimension is simply ignored.  

The iso and aniso keywords are simply shortcuts that are equivalent to specifying several other keywords together.  

The keyword iso means couple all 3 diagonal components together when pressure is computed (hydrostatic pressure) and dilate/contract the dimensions together. Using “iso Pstart Pstop Pdamp” is the same as specifying these 4 keywords  

<html><body><table><tr><td>x Pstart Pstop Pdamp X</td></tr><tr><td>Pstart Pstop Pdamp</td></tr><tr><td></td></tr><tr><td>z Pstart Pstop Pdamp couple xyz</td></tr></table></body></html>  

The keyword aniso means $x,y$ , and $z$ dimensions are controlled independently using the $P x x,P y y$ , and $P z z$ components of the stress tensor as the driving forces, and the specified scalar external pressure. Using “aniso Pstart Pstop Pdamp” is the same as specifying these 4 keywords:  

x Pstart Pstop Pdamp y Pstart Pstop Pdamp z Pstart Pstop Pdamp couple none  

The keyword/value option pairs are used in the following ways.  

The reinit keyword determines, whether the rigid body properties are re-initialized between run commands. With the option yes (the default) this is done, with the option no this is not done. Turning off the re-initialization can be helpful to protect rigid bodies against unphysical manipulations between runs or when properties cannot be easily re-computed (e.g. when read from a file). When using the infile keyword, the reinit option is automatically set to no.  

The langevin and temp and tparam keywords perform thermostatting of the rigid bodies, altering both their translational and rotational degrees of freedom. What is meant by “temperature” of a collection of rigid bodies and how it can be monitored via the fix output is discussed below.  

The langevin keyword applies a Langevin thermostat to the constant NVE time integration performed by any of the 4 NVE rigid styles: rigid, rigid/nve, rigid/small, rigid/small/nve. It cannot be used with the 2 NVT rigid styles: rigid/nvt, rigid/small/nvt. The desired temperature at each timestep is a ramped value during the run from Tstart to Tstop. The Tdamp parameter is specified in time units and determines how rapidly the temperature is relaxed. For example, a value of 100.0 means to relax the temperature in a timespan of (roughly) 100 time units $\mathit{\check{\tau}}$ or fs or ps - see the units command). The random # seed must be a positive integer.  

The way that Langevin thermostatting operates is explained on the fix langevin doc page. If you wish to simply viscously damp the rotational motion without thermostatting, you can set Tstart and Tstop to 0.0, which means only the viscous drag term in the Langevin thermostat will be applied. See the discussion on the fix viscous page for details.  

![](images/7616973ed94c4bab78ac6690b251c1dc1f4026ebc083271b30ebc3ca008d3cb8.jpg)  

# Note  

When the langevin keyword is used with fix rigid versus fix rigid/small, different dynamics will result for parallel runs. This is because of the way random numbers are used in the two cases. The dynamics for the two cases should be statistically similar, but will not be identical, even for a single timestep.  

The temp and tparam keywords apply a Nose/Hoover thermostat to the NVT time integration performed by the 2 NVT rigid styles. They cannot be used with the 4 NVE rigid styles. The desired temperature at each timestep is a ramped value during the run from Tstart to Tstop. The Tdamp parameter is specified in time units and determines how rapidly the temperature is relaxed. For example, a value of 100.0 means to relax the temperature in a timespan of (roughly) 100 time units (tau or fs or ps - see the units command).  

Nose/Hoover chains are used in conjunction with this thermostat. The tparam keyword can optionally be used to change the chain settings used. Tchain is the number of thermostats in the Nose Hoover chain. This value, along with Tdamp can be varied to dampen undesirable oscillations in temperature that can occur in a simulation. As a rule of thumb, increasing the chain length should lead to smaller oscillations. The keyword pchain specifies the number of thermostats in the chain thermostatting the barostat degrees of freedom.  

![](images/9912f05d70c0588a0ee60756271f1db3c1f3d23239f933432de9271c1b8c2947.jpg)  

# Note  

There are alternate ways to thermostat a system of rigid bodies. You can use fix langevin to treat the individual particles in the rigid bodies as effectively immersed in an implicit solvent, e.g. a Brownian dynamics model. For hybrid systems with both rigid bodies and solvent particles, you can thermostat only the solvent particles that surround one or more rigid bodies by appropriate choice of groups in the compute and fix commands for temperature and thermostatting. The solvent interactions with the rigid bodies should then effectively thermostat the rigid body temperature as well without use of the Langevin or Nose/Hoover options associated with the fix rigid commands.  

The mol keyword can only be used with the rigid/small styles. It must be used when other commands, such as fix deposit or fix pour, add rigid bodies on-the-fly during a simulation. You specify a template- $I D$ previously defined using the molecule command, which reads a file that defines the molecule. You must use the same template- $\mathbf{\nabla}\cdot I D$ that the other fix which is adding rigid bodies uses. The coordinates, atom types, atom diameters, center-of-mass, and moments of inertia can be specified in the molecule file. See the molecule command for details. The only settings required to be in this file are the coordinates and types of atoms in the molecule, in which case the molecule command calculates the other quantities itself.  

Note that these other fixes create new rigid bodies, in addition to those defined initially by this fix via the bodystyle setting.  

Also note that when using the mol keyword, extra restart information about all rigid bodies is written out whenever a restart file is written out. See the NOTE in the next section for details.  

The infile keyword allows a file of rigid body attributes to be read in from a file, rather then having LAMMPS compute them. There are 5 such attributes: the total mass of the rigid body, its center-of-mass position, its 6 moments of inertia, its center-of-mass velocity, and the 3 image flags of the center-of-mass position. For rigid bodies consisting of point particles or non-overlapping finite-size particles, LAMMPS can compute these values accurately.  

However, for rigid bodies consisting of finite-size particles which overlap each other, LAMMPS will ignore the overlaps when computing these 4 attributes, which means the dynamics of the bodies will be incorrect. The amount of error this induces depends on the amount of overlap. To avoid this issue, the values can be pre-computed (e.g. using Monte Carlo integration).  

The format of the file is as follows. Note that the file does not have to list attributes for every rigid body integrated by fix rigid. Only bodies which the file specifies will have their computed attributes overridden. The file can contain initial blank lines or comment lines starting with “#” which are ignored. The first non-blank, non-comment line should list $\Nu=$ the number of lines to follow. The N successive lines contain the following information:  

ID1 masstotal xcm ycm zcm ixx iyy izz ixy ixz iyz vxcm vycm vzcm lx ly lz ixcm iycm izcm ID2 masstotal xcm ycm zcm ixx iyy izz ixy ixz iyz vxcm vycm vzcm lx ly lz ixcm iycm izcm IDN masstotal xcm ycm zcm ixx iyy izz ixy ixz iyz vxcm vycm vzcm lx ly lz ixcm iycm izcm  

The rigid body IDs are all positive integers. For the single bodystyle, only an ID of 1 can be used. For the group bodystyle, IDs from 1 to $\mathrm{Ng}$ can be used where $\mathrm{Ng}$ is the number of specified groups. For the molecule bodystyle, use the molecule ID for the atoms in a specific rigid body as the rigid body ID.  

The masstotal and center-of-mass coordinates (xcm,ycm,zcm) are self-explanatory. The center-of-mass should be consistent with what is calculated for the position of the rigid body with all its atoms unwrapped by their respective image flags. If this produces a center-of-mass that is outside the simulation box, LAMMPS wraps it back into the box.  

The 6 moments of inertia (ixx,iyy,izz,ixy,ixz,iyz) should be the values consistent with the current orientation of the rigid body around its center of mass. The values are with respect to the simulation box XYZ axes, not with respect to the principal axes of the rigid body itself. LAMMPS performs the latter calculation internally.  

The (vxcm,vycm,vzcm) values are the velocity of the center of mass. The (lx,ly,lz) values are the angular momentum of the body. The (vxcm,vycm,vzcm) and (lx,ly,lz) values can simply be set to 0 if you wish the body to have no initial motion.  

The (ixcm,iycm,izcm) values are the image flags of the center of mass of the body. For periodic dimensions, they specify which image of the simulation box the body is considered to be in. An image of 0 means it is inside the box as defined. A value of 2 means add 2 box lengths to get the true value. A value of -1 means subtract 1 box length to get the true value. LAMMPS updates these flags as the rigid bodies cross periodic boundaries during the simulation.  

# Note  

If you use the infile or mol keywords and write restart files during a simulation, then each time a restart file is written, the fix also write an auxiliary restart file with the name rfile.rigid, where “rfile” is the name of the restart file, e.g. tmp.restart.10000 and tmp.restart.10000.rigid. This auxiliary file is in the same format described above. Thus it can be used in a new input script that restarts the run and re-specifies a rigid fix using an infile keyword and the appropriate filename. Note that the auxiliary file will contain one line for every rigid body, even if the original file only listed a subset of the rigid bodies.  

If the system has rigid bodies with finite-size overlapping particles and the model uses the fix gravity command to apply a gravitational force to the rigid bodies, then the gravity keyword should be used in the following manner.  

First, the group specified for the fix gravity command should not include any atoms in rigid bodies which have overlapping particles. It can be empty (see the group empty command) or only contain single particles not in rigid bodies, e.g. background particles.  

Second, the infile keyword should be used to specify the total mass and other properties of the rigid bodies with overlaps, so that their dynamics will be modeled correctly, as explained above.  

Third, the gravity keyword should be used the with the ID of the fix gravity command as its argument. The rigid fixes will access the gravity fix to extract the current direction of the gravity vector at each timestep (which can be static or dynamic). A gravity force will then be applied to each rigid body at its center-of-mass position using its total mass.  

If you use a temperature compute with a group that includes particles in rigid bodies, the degrees-of-freedom removed by each rigid body are accounted for in the temperature (and pressure) computation, but only if the temperature group includes all the particles in a particular rigid body.  

A 3d rigid body has 6 degrees of freedom (3 translational, 3 rotational), except for a collection of point particles lying on a straight line, which has only 5, e.g a dimer. A 2d rigid body has 3 degrees of freedom (2 translational, 1 rotational).  

#  Note  

You may wish to explicitly subtract additional degrees-of-freedom if you use the force and torque keywords to eliminate certain motions of one or more rigid bodies. LAMMPS does not do this automatically.  

The rigid body contribution to the pressure of the system (virial) is also accounted for by this fix.  

If your simulation is a hybrid model with a mixture of rigid bodies and non-rigid particles (e.g. solvent) there are several ways these rigid fixes can be used in tandem with fix nve, fix nvt, fix npt, and fix nph.  

If you wish to perform NVE dynamics (no thermostatting or barostatting), use one of 4 NVE rigid styles to integrate the rigid bodies, and fix nve to integrate the non-rigid particles.  

If you wish to perform NVT dynamics (thermostatting, but no barostatting), you can use one of the 2 NVT rigid styles for the rigid bodies, and any thermostatting fix for the non-rigid particles (fix nvt, fix langevin, fix temp/berendsen). You can also use one of the 4 NVE rigid styles for the rigid bodies and thermostat them using fix langevin on the group that contains all the particles in the rigid bodies. The net force added by fix langevin to each rigid body effectively thermostats its translational center-of-mass motion. Not sure how well it does at thermostatting its rotational motion.  

If you wish to perform NPT or NPH dynamics (barostatting), you cannot use both fix npt and the NPT or NPH rigid styles. This is because there can only be one fix which monitors the global pressure and changes the simulation box dimensions. So you have 3 choices:  

1. Use one of the 4 NPT or NPH styles for the rigid bodies. Use the dilate all option so that it will dilate the positions of the non-rigid particles as well. Use fix nvt (or any other thermostat) for the non-rigid particles. 2. Use fix npt for the group of non-rigid particles. Use the dilate all option so that it will dilate the center-of-mass positions of the rigid bodies as well. Use one of the 4 NVE or 2 NVT rigid styles for the rigid bodies. 3. Use fix press/berendsen to compute the pressure and change the box dimensions. Use one of the 4 NVE or 2 NVT rigid styles for the rigid bodies. Use fix nvt (or any other thermostat) for the non-rigid particles.  

In all case, the rigid bodies and non-rigid particles both contribute to the global pressure and the box is scaled the same by any of the barostatting fixes.  

You could even use the second and third options for a non-hybrid simulation consisting of only rigid bodies, assuming you give fix npt an empty group, though it’s an odd thing to do. The barostatting fixes (fix npt and fix press/berensen) will monitor the pressure and change the box dimensions, but not time integrate any particles. The integration of the rigid bodies will be performed by fix rigid/nvt.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.203.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about the 4 NVE rigid styles is written to binary restart files. The exception is if the infile or mol keyword is used, in which case an auxiliary file is written out with rigid body information each time a restart file is written, as explained above for the infile keyword. For the 2 NVT rigid styles, the state of the Nose/Hoover thermostat is written to binary restart files. Ditto for the 4 NPT and NPH rigid styles, and the state of the Nose/Hoover barostat. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by the 4 NPT and NPH rigid styles to change the computes used to calculate the instantaneous pressure tensor. Note that the 2 NVT rigid fixes do not use any external compute to compute instantaneous temperature.  

The fix_modify bodyforces option is supported by all rigid styles to set whether per-body forces and torques are computed early or late in a timestep, i.e. at the post-force stage or at the final-integrate stage or the timestep, respectively.  

The cumulative energy change in the system imposed by the 6 NVT, NPT, NPH rigid fixes, via either thermostatting and/or barostatting, is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

The 2 NVE rigid fixes compute a global scalar which can be accessed by various output commands. The scalar value calculated by these fixes is “intensive”. The scalar is the current temperature of the collection of rigid bodies. This is averaged over all rigid bodies and their translational and rotational degrees of freedom. The translational energy of a rigid body is $1/2\mathrm{~m~v~}^{\wedge}2$ , where $\mathrm{m}=$ total mass of the body and $\mathbf{V}=$ the velocity of its center of mass. The rotational energy of a rigid body is $1/2\mathrm{~I~w~}^{\wedge}2$ , where $\boldsymbol{\mathrm{I}}=$ the moment of inertia tensor of the body and $\mathbf{W}=$ its angular velocity. Degrees of freedom constrained by the force and torque keywords are removed from this calculation, but only for the rigid and rigid/nve fixes.  

The 6 NVT, NPT, NPH rigid fixes compute a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to these fixes described above. The scalar value calculated by this fix is “extensive”.  

The fix_modify virial option is supported by these fixes to add the contribution due to the added forces on atoms to both the global pressure and per-atom stress of the system via the compute pressure and compute stress/atom commands. The former can be accessed by thermodynamic output. The default setting for this fix is fix_modify virial yes.  

All of the rigid styles (but not the rigid/small styles) compute a global array of values which can be accessed by various output commands. Similar information about the bodies defined by the rigid/small styles can be accessed via the compute rigid/local command.  

The number of rows in the array is equal to the number of rigid bodies. The number of columns is 15. Thus for each rigid body, 15 values are stored: the xyz coords of the center of mass (COM), the xyz components of the COM velocity, the xyz components of the force acting on the COM, the xyz components of the torque acting on the COM, and the xyz image flags of the COM.  

The center of mass (COM) for each body is similar to unwrapped coordinates written to a dump file. It will always be inside (or slightly outside) the simulation box. The image flags have the same meaning as image flags for atom positions (see the “dump” command). This means you can calculate the unwrapped COM by applying the image flags to the COM, the same as when unwrapped coordinates are written to a dump file.  

The force and torque values in the array are not affected by the force and torque keywords in the fix rigid command;   
they reflect values before any changes are made by those keywords.  

The ordering of the rigid bodies (by row in the array) is as follows. For the single keyword there is just one rigid body. For the molecule keyword, the bodies are ordered by ascending molecule ID. For the group keyword, the list of group IDs determines the ordering of bodies.  

The array values calculated by these fixes are “intensive”, meaning they are independent of the number of atoms in the simulation.  

No parameter of these fixes can be used with the start/stop keywords of the run command. These fixes are not invoked during energy minimization.  

# 2.203.5 Restrictions  

These fixes are all part of the RIGID package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Assigning a temperature via the velocity create command to a system with rigid bodies may not have the desired outcome for two reasons. First, the velocity command can be invoked before the rigid-body fix is invoked or initialized and the number of adjusted degrees of freedom (DOFs) is known. Thus it is not possible to compute the target temperature correctly. Second, the assigned velocities may be partially canceled when constraints are first enforced, leading to a different temperature than desired. A workaround for this is to perform a run $O$ command, which ensures all DOFs are accounted for properly, and then rescale the temperature to the desired value before performing a simulation. For example:  

<html><body><table><tr><td colspan="2">velocity all create 300.0 12345</td></tr><tr><td>run</td><td>temperature may not be 300K</td></tr><tr><td>velocity all scale 300.0</td><td>now it should be</td></tr></table></body></html>  

# 2.203.6 Related commands  

delete_bonds, neigh_modify exclude, fix shake  

# 2.203.7 Default  

The option defaults are force \* on on on and torque \* on on on, meaning all rigid bodies are acted on by center-of-mass force and torque. Also Tchain $={\mathrm{Pchain}}=10$ , Titer $=1$ , Torder $=3$ , reinit $=\mathrm{yes}$ .  

# 2.204 fix rigid/meso command  

# 2.204.1 Syntax  

fix ID group-ID rigid/meso bodystyle args keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• rigid/meso $=$ style name of this fix command   
• bodystyle $=$ single or molecule or group single $\mathrm{args}=\mathrm{none}$ molecule args $=$ none custom args $=\mathrm{i}$ _propname or v_varname i_propname $=$ an integer property defined via fix property/atom v_varname $=$ an atom-style or atomfile-style variable group args $=\mathrm{N}$ groupID1 groupID2 ... $\mathrm{N}=\#$ of groups groupID1, groupID2, $\dots=\mathrm{list}$ of N group IDs   
• zero or more keyword/value pairs may be appended   
• keyword $=$ reinit or force or torque or infile reini ${\u{\mathrm{,}}}=\mathrm{yes}$ or no force values $=\mathrm{M}$ xflag yflag zflag $\mathrm{M}=$ which rigid body from 1-Nbody (see asterisk form below) xflag,yflag,zflag $=$ off/on if component of center-of-mass force is active torque values $=\mathrm{M}$ xflag yflag zflag $\mathrm{M}=$ which rigid body from 1-Nbody (see asterisk form below) xflag,yflag,zflag $=$ off/on if component of center-of-mass torque is active infile filename  

filename $=$ file with per-body values of mass, center-of-mass, moments of inertia  

# 2.204.2 Examples  

fix 1 ellipsoid rigid/meso single   
fix 1 rods rigid/meso molecule   
fix 1 spheres rigid/meso single force 1 off off on   
fix 1 particles rigid/meso molecule force $1^{*}5$ off off off force $6^{*}10$ off off on   
fix 2 spheres rigid/meso group 3 sphere1 sphere2 sphere3 torque \* off off off  

# 2.204.3 Description  

Treat one or more sets of mesoscopic SPH/SDPD particles as independent rigid bodies. This means that each timestep the total force and torque on each rigid body is computed as the sum of the forces and torques on its constituent particles. The coordinates and velocities of the particles in each body are then updated so that the body moves and rotates as a single entity using the methods described in the paper by (Miller). Density and internal energy of the particles will also be updated. This is implemented by creating internal data structures for each rigid body and performing time integration on these data structures. Positions and velocities of the constituent particles are regenerated from the rigid body data structures in every time step. This restricts which operations and fixes can be applied to rigid bodies. See below for a detailed discussion.  

The operation of this fix is exactly like that described by the fix rigid/nve command, except that particles’ density, internal energy and extrapolated velocity are also updated.  

![](images/9f2d8d8ac552e940be0a3d644c87f3777c7773911919113e2fd75e40902e59c5.jpg)  

# Note  

You should not update the particles in rigid bodies via other time-integration fixes (e.g. fix sph, fix sph/stationary), or you will have conflicting updates to positions and velocities resulting in unphysical behavior in most cases. When performing a hybrid simulation with some atoms in rigid bodies, and some not, a separate time integration fix like fix sph should be used for the non-rigid particles.  

# Note  

These fixes are overkill if you simply want to hold a collection of particles stationary or have them move with a constant velocity. To hold particles stationary use fix sph/stationary instead. If you would like to move particles with a constant velocity use fix meso/move.  

![](images/9c534768b2236deb31b6e109d26c8bd0f2139f41a97c3111a645b7c632d70520.jpg)  

# Warning  

The aggregate properties of each rigid body are calculated at the start of a simulation run and are maintained in internal data structures. The properties include the position and velocity of the center-of-mass of the body, its moments of inertia, and its angular momentum. This is done using the properties of the constituent particles of the body at that point in time (or see the infile keyword option). Thereafter, changing these properties of individual particles in the body will have no effect on a rigid body’s dynamics, unless they effect any computation of perparticle forces or torques. If the keyword reinit is set to yes (the default), the rigid body data structures will be recreated at the beginning of each run command; if the keyword reinit is set to no, the rigid body data structures will be built only at the very first run command and maintained for as long as the rigid fix is defined. For example, you might think you could displace the particles in a body or add a large velocity to each particle in a body to make it move in a desired direction before a second run is performed, using the set or displace_atoms or velocity commands. But these commands will not affect the internal attributes of the body unless reinit is set to yes. With reinit set to no (or using the infile option, which implies reinit no) the position and velocity of individual particles in the body will be reset when time integration starts again.  

Each rigid body must have two or more particles. A particle can belong to at most one rigid body. Which particles are in which bodies can be defined via several options.  

For bodystyle single the entire fix group of particles is treated as one rigid body.  

For bodystyle molecule, particles are grouped into rigid bodies by their respective molecule IDs: each set of particles in the fix group with the same molecule ID is treated as a different rigid body. Note that particles with a molecule $\mathrm{ID}=0$ will be treated as a single rigid body. For a system with solvent (typically this is particles with molecule $\mathrm{ID}=$ 0) surrounding rigid bodies, this may not be what you want. Thus you should be careful to use a fix group that only includes particles you want to be part of rigid bodies.  

Bodystyle custom is similar to bodystyle molecule except that it is more flexible in using other per-atom properties to define the sets of particles that form rigid bodies. An integer vector defined by the fix property/atom command can be used. Or an atom-style or atomfile-style variable can be used; the floating-point value produced by the variable is rounded to an integer. As with bodystyle molecule, each set of particles in the fix groups with the same integer value is treated as a different rigid body. Since fix property/atom vectors and atom-style variables produce values for all particles, you should be careful to use a fix group that only includes particles you want to be part of rigid bodies.  

For bodystyle group, each of the listed groups is treated as a separate rigid body. Only particles that are also in the fix group are included in each rigid body.  

# Note  

To compute the initial center-of-mass position and other properties of each rigid body, the image flags for each particle in the body are used to “unwrap” the particle coordinates. Thus you must ensure that these image flags are consistent so that the unwrapping creates a valid rigid body (one where the particles are close together) , particularly if the particles in a single rigid body straddle a periodic boundary. This means the input data file or restart file must define the image flags for each particle consistently or that you have used the set command to specify them correctly. If a dimension is non-periodic then the image flag of each particle must be 0 in that dimension, else an error is generated.  

By default, each rigid body is acted on by other particles which induce an external force and torque on its center of mass, causing it to translate and rotate. Components of the external center-of-mass force and torque can be turned off by the force and torque keywords. This may be useful if you wish a body to rotate but not translate, or vice versa, or if you wish it to rotate or translate continuously unaffected by interactions with other particles. Note that if you expect a rigid body not to move or rotate by using these keywords, you must ensure its initial center-of-mass translational or angular velocity is 0.0. Otherwise the initial translational or angular momentum, the body has, will persist.  

An xflag, yflag, or zflag set to off means turn off the component of force or torque in that dimension. A setting of on means turn on the component, which is the default. Which rigid body(s) the settings apply to is determined by the first argument of the force and torque keywords. It can be an integer M from 1 to Nbody, where Nbody is the number of rigid bodies defined. A wild-card asterisk can be used in place of, or in conjunction with, the M argument to set the flags for multiple rigid bodies. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $\mathbf{\tilde{\Sigma}}^{6}\mathbf{\tilde{n}}^{*}{\mathbf{\tilde{\Sigma}}}^{,*}$ or $\mathrm{^{6}m^{*}n^{,}}$ . If $\Nu=$ the number of rigid bodies, then an asterisk with no numeric values means all bodies from 1 to N. A leading asterisk means all bodies from 1 to n (inclusive). A trailing asterisk means all bodies from n to N (inclusive). A middle asterisk means all bodies from m to n (inclusive). Note that you can use the force or torque keywords as many times as you like. If a particular rigid body has its component flags set multiple times, the settings from the final keyword are used.  

For computational efficiency, you should typically define one fix rigid/meso command which includes all the desired rigid bodies. LAMMPS will allow multiple rigid/meso fixes to be defined, but it is more expensive.  

The keyword/value option pairs are used in the following ways.  

The reinit keyword determines, whether the rigid body properties are re-initialized between run commands. With the option yes (the default) this is done, with the option no this is not done. Turning off the re-initialization can be helpful to protect rigid bodies against unphysical manipulations between runs or when properties cannot be easily re-computed (e.g. when read from a file). When using the infile keyword, the reinit option is automatically set to no.  

The infile keyword allows a file of rigid body attributes to be read in from a file, rather then having LAMMPS compute them. There are 5 such attributes: the total mass of the rigid body, its center-of-mass position, its 6 moments of inertia, its center-of-mass velocity, and the 3 image flags of the center-of-mass position. For rigid bodies consisting of point particles or non-overlapping finite-size particles, LAMMPS can compute these values accurately. However, for rigid bodies consisting of finite-size particles which overlap each other, LAMMPS will ignore the overlaps when computing these 4 attributes. The amount of error this induces depends on the amount of overlap. To avoid this issue, the values can be pre-computed (e.g. using Monte Carlo integration).  

The format of the file is as follows. Note that the file does not have to list attributes for every rigid body integrated by fix rigid. Only bodies which the file specifies will have their computed attributes overridden. The file can contain initial blank lines or comment lines starting with “#” which are ignored. The first non-blank, non-comment line should list $\Nu=$ the number of lines to follow. The N successive lines contain the following information:  

(continued from previous page)  

IDN masstotal xcm ycm zcm ixx iyy izz ixy ixz iyz vxcm vycm vzcm lx ly lz ixcm iycm izcm  

The rigid body IDs are all positive integers. For the single bodystyle, only an ID of 1 can be used. For the group bodystyle, IDs from 1 to $\mathrm{Ng}$ can be used where $\mathrm{Ng}$ is the number of specified groups. For the molecule bodystyle, use the molecule ID for the atoms in a specific rigid body as the rigid body ID.  

The masstotal and center-of-mass coordinates (xcm,ycm,zcm) are self-explanatory. The center-of-mass should be consistent with what is calculated for the position of the rigid body with all its atoms unwrapped by their respective image flags. If this produces a center-of-mass that is outside the simulation box, LAMMPS wraps it back into the box.  

The 6 moments of inertia (ixx,iyy,izz,ixy,ixz,iyz) should be the values consistent with the current orientation of the rigid body around its center of mass. The values are with respect to the simulation box XYZ axes, not with respect to the principal axes of the rigid body itself. LAMMPS performs the latter calculation internally.  

The (vxcm,vycm,vzcm) values are the velocity of the center of mass. The (lx,ly,lz) values are the angular momentum of the body. The (vxcm,vycm,vzcm) and (lx,ly,lz) values can simply be set to 0 if you wish the body to have no initial motion.  

The (ixcm,iycm,izcm) values are the image flags of the center of mass of the body. For periodic dimensions, they specify which image of the simulation box the body is considered to be in. An image of 0 means it is inside the box as defined. A value of 2 means add 2 box lengths to get the true value. A value of -1 means subtract 1 box length to get the true value. LAMMPS updates these flags as the rigid bodies cross periodic boundaries during the simulation.  

![](images/421c41e78e05c36916c295dbd29e31730a5c2b24dc97b2c2f1221139ae5ce171.jpg)  

# Note  

If you use the infile keyword and write restart files during a simulation, then each time a restart file is written, the fix also write an auxiliary restart file with the name rfile.rigid, where “rfile” is the name of the restart file, e.g. tmp.restart.10000 and tmp.restart.10000.rigid. This auxiliary file is in the same format described above. Thus it can be used in a new input script that restarts the run and re-specifies a rigid fix using an infile keyword and the appropriate filename. Note that the auxiliary file will contain one line for every rigid body, even if the original file only listed a subset of the rigid bodies.  

# 2.204.4 Restart, fix_modify, output, run start/stop, minimize info  

No information is written to binary restart files. If the infile keyword is used, an auxiliary file is written out with rigid body information each time a restart file is written, as explained above for the infile keyword.  

None of the fix_modify options are relevant to this fix.  

This fix computes a global array of values which can be accessed by various output commands.  

The number of rows in the array is equal to the number of rigid bodies. The number of columns is 28. Thus for each rigid body, 28 values are stored: the xyz coords of the center of mass (COM), the xyz components of the COM velocity, the xyz components of the force acting on the COM, the components of the 4-vector quaternion representing the orientation of the rigid body, the xyz components of the angular velocity of the body around its COM, the xyz components of the torque acting on the COM, the 3 principal components of the moment of inertia, the xyz components of the angular momentum of the body around its COM, and the xyz image flags of the COM.  

The center of mass (COM) for each body is similar to unwrapped coordinates written to a dump file. It will always be inside (or slightly outside) the simulation box. The image flags have the same meaning as image flags for particle positions (see the “dump” command). This means you can calculate the unwrapped COM by applying the image flags to the COM, the same as when unwrapped coordinates are written to a dump file.  

The force and torque values in the array are not affected by the force and torque keywords in the fix rigid command;   
they reflect values before any changes are made by those keywords.  

The ordering of the rigid bodies (by row in the array) is as follows. For the single keyword there is just one rigid body. For the molecule keyword, the bodies are ordered by ascending molecule ID. For the group keyword, the list of group IDs determines the ordering of bodies.  

The array values calculated by this fix are “intensive”, meaning they are independent of the number of particles in the simulation.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

This fix is not invoked during energy minimization.  

# 2.204.5 Restrictions  

This fix is part of the DPD-SMOOTH package and also depends on the RIGID package. It is only enabled if LAMMPS was built with both packages. See the Build package page for more info.  

This fix requires that atoms store density and internal energy as defined by the atom_style sph command.  

All particles in the group must be mesoscopic SPH/SDPD particles.  

Changed in version 29Aug2024.  

This fix is incompatible with deformation controls that remap velocity, for instance the remap $\nu$ option of fix deform.  

# 2.204.6 Related commands  

fix meso/move, fix rigid, neigh_modify exclude  

# 2.204.7 Default  

The option defaults are force \* on on on and torque \* on on on, meaning all rigid bodies are acted on by center-of-mass force and torque. Also reinit $=\mathrm{yes}$ .  

(Miller) Miller, Eleftheriou, Pattnaik, Ndirango, and Newns, J Chem Phys, 116, 8649 (2002).  

# 2.205 fix rx command  

Accelerator Variants: rx/kk  

# 2.205.1 Syntax  

fix ID group-ID rx file localTemp matrix solver minSteps ..  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• $\mathbf{r}\mathbf{X}=$ style name of this fix command   
• file $=$ filename containing the reaction kinetic equations and Arrhenius parameters   
• localTemp $\cdot=n o n e,l u c y=\mathrm{no}$ local temperature averaging or local temperature defined through Lucy weighting function   
• matrix $=$ sparse, dense format for the stoichiometric matrix   
• solver $=$ lammps_rk4,rkf4 $\textstyle{\mathcal{L}}=\operatorname{rk4}$ is an explicit fourth order Runge-Kutta method; rkf45 is an adaptive fourth-order Runge-Kutta-Fehlberg method   
• minSteps $=\#$ of steps for $\mathrm{rk}4$ solver or minimum # of steps for rkf45 (rk4 or rkf45)   
• maxSteps $=$ maximum number of steps for the rkf45 solver (rkf45 only)   
• relTol $=$ relative tolerance for the rkf45 solver (rkf45 only)   
• absTol $=$ absolute tolerance for the rkf45 solver (rkf45 only)   
• diag $=$ Diagnostics frequency for the rkf45 solver (optional, rkf45 only)  

# 2.205.2 Examples  

fix 1 all rx kinetics.rx none dense lammps_rk4   
fix 1 all rx kinetics.rx none sparse lammps_rk4 1   
fix 1 all rx kinetics.rx lucy sparse lammps_rk4 10   
fix 1 all rx kinetics.rx none dense rkf45 1 100 1e-6 1e-8   
fix 1 all rx kinetics.rx none dense rkf45 1 100 1e-6 1e-8 -1  

# 2.205.3 Description  

Fix $r x$ solves the reaction kinetic ODEs for a given reaction set that is defined within the file associated with this command.  

For a general reaction such that  

$$
\nu_{A}A+\nu_{B}B\to\nu_{C}C
$$  

the reaction rate equation is defined to be of the form  

$$
r=k(T)[A]^{\nu_{A}}[B]^{\nu_{B}}
$$  

In the current implementation, the exponents are defined to be equal to the stoichiometric coefficients. A given reaction set consisting of $n$ reaction equations will contain a total of $m$ species. A set of $m$ ordinary differential equations (ODEs) that describe the change in concentration of a given species as a function of time are then constructed based on the $n$ reaction rate equations.  

The ODE systems are solved over the full DPD timestep $d t$ using either a fourth order Runge-Kutta $r k4$ method with a fixed step-size $h$ , specified by the lammps_rk4 keyword, or a fourth order Runge-Kutta-Fehlberg (rkf45) method with an adaptive step-size for $h$ . The number of ODE steps per DPD timestep for the rk4 method is optionally specified immediately after the rk4 keyword. The ODE step-size is set as dt/num_steps. Smaller step-sizes tend to yield more accurate results but there is not control on the error. For error control, use the rkf45 ODE solver.  

The rkf45 method adjusts the step-size so that the local truncation error is held within the specified absolute and relative tolerances. The initial step-size $h0$ can be specified by the user or estimated internally. It is recommended that the user specify $h0$ since this will generally reduced the number of ODE integration steps required. $h0$ is defined as dt / min_steps if min_steps $>=1$ . If min_steps $ ==0$ , $h0$ is estimated such that an explicit Euler method would likely produce an acceptable solution. This is generally overly conservative for the fourth-order method and users are advised to specify $h0$ as some fraction of the DPD timestep. For small DPD timesteps, only one step may be necessary depending upon the tolerances. Note that more than min_steps ODE steps may be taken depending upon the ODE stiffness but no more than max_steps will be taken. If max_steps is reached, an error warning is printed and the simulation is stopped.  

After each ODE step, the solution error $e$ is tested and weighted using the absTol and relTol values. The error vector is weighted as $e/\left(\mathrm{rel{Tol}^{*}}\left|u\right|+\mathrm{abs{Tol}}\right)$ where $u$ is the solution vector. If the norm of the error is $<=1$ , the solution is accepted, $h$ is increased by a proportional amount, and the next ODE step is begun. Otherwise, $h$ is shrunk and the ODE step is repeated.  

Run-time diagnostics are available for the rkf45 ODE solver. The frequency (in timesteps) that diagnostics are reported is controlled by the last (optional) 12th argument. A negative frequency means that diagnostics are reported once at the end of each run. A positive value N means that the diagnostics are reported once per N timesteps.  

The diagnostics report the average # of integrator steps and RHS function evaluations and run-time per ODE as well as the average/RMS/min/max per process. If the reporting frequency is 1, the RMS/min/max per ODE are also reported. The per ODE statistics can be used to adjust the tolerance and min/max step parameters. The statistics per MPI process can be useful to examine any load imbalance caused by the adaptive ODE solver. (Some DPD particles can take longer to solve than others. This can lead to an imbalance across the MPI processes.)  

The filename specifies a file that contains the entire set of reaction kinetic equations and corresponding Arrhenius parameters. The format of this file is described below.  

There is no restriction on the total number or reaction equations that are specified. The species names are arbitrary string names that are associated with the species concentrations. Each species in a given reaction must be preceded by it’s stoichiometric coefficient. The only delimiters that are recognized between the species are either $\mathbf{a}+\mathbf{or}=$ character. The $=$ character corresponds to an irreversible reaction. After specifying the reaction, the reaction rate constant is determined through the temperature dependent Arrhenius equation:  

$$
k=A T^{n}e^{\frac{-E_{a}}{k_{B}T}}
$$  

where $A$ is the Arrhenius factor in time units or concentration/time units, $n$ is the unitless exponent of the temperature dependence, and $E_{a}$ is the activation energy in energy units. The temperature dependence can be removed by specifying the exponent as zero.  

The internal temperature of the coarse-grained particles can be used in constructing the reaction rate constants at every DPD timestep by specifying the keyword none. Alternatively, the keyword lucy can be specified to compute a localaverage particle internal temperature for use in the reaction rate constant expressions. The local-average particle internal temperature is defined as:  

$$
\theta_{i}^{-1}=\frac{\sum_{j=1}\omega_{L u c y}\left(r_{i j}\right)\theta_{j}^{-1}}{\sum_{j=1}\omega_{L u c y}\left(r_{i j}\right)}
$$  

where the Lucy function is expressed as:  

$$
\omega_{L u c y}\left(r_{i j}\right)=\left(1+\frac{3r_{i j}}{r_{c}}\right)\left(1-\frac{r_{i j}}{r_{c}}\right)^{3}
$$  

The self-particle interaction is included in the above equation.  

The stoichiometric coefficients for the reaction mechanism are stored in either a sparse or dense matrix format. The dense matrix should only be used for small reaction mechanisms. The sparse matrix should be used when there are many reactions (e.g., more than 5). This allows the number of reactions and species to grow while keeping the computational cost tractable. The matrix format can be specified as using either the sparse or dense keywords. If all stoichiometric coefficients for a reaction are small integers (whole numbers $<=3$ ), a fast exponential function is used. This can save significant computational time so users are encouraged to use integer coefficients where possible.  

The format of a tabulated file is as follows (without the parenthesized comments):  

<html><body><table><tr><td># Rxn equations and</td><td>parameters</td><td>(one or more comment or blank lines)</td></tr><tr><td>1.0 hcn + 1.0 no2 = 1.0 no + 0.5 n2</td><td>+ 0.5 h2 + 1.0 co 2.49E+01 0.0 1.34</td><td>(rxn equation, A, n, Ea)</td></tr><tr><td>1.0 hcn + 1.0</td><td>no = 1.0 co +1.0 n2</td><td>+ 0.5 h2 2.16E+00 0.0 1.52</td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td>1.0</td><td></td><td></td></tr><tr><td>no + 1.0</td><td>co = 0.5 n2 + 1.0 co2</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td>1.66E+06 0.0 0.69</td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections.  

Following a blank line, the next N lines list the N reaction equations. Each species within the reaction equation is specified through its stoichiometric coefficient and a species tag. Reactant species are specified on the left-hand side of the equation and product species are specified on the right-hand side of the equation. After specifying the reactant and product species, the final three arguments of each line represent the Arrhenius parameter $A$ , the temperature exponent $n$ , and the activation energy Ea.  

Note that the species tags that are defined in the reaction equations are used by the fix eos/table/rx command to define the thermodynamic properties of each species. Furthermore, the number of species molecules (i.e., concentration) can be specified either with the set command using the “d_” prefix or by reading directly the concentrations from a data file. For the latter case, the read_data command with the fix keyword should be specified, where the fix-ID will be the “fix rx\`ID with a <SPECIES”>\`_ suffix, e.g.  

fix foo all rx reaction.file . . . read_data data.dpd fix foo_SPECIES NULL Species  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.205.4 Restrictions  

This command is part of the DPD-REACT package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This command also requires use of the atom_style dpd command.  

This command can only be used with a constant energy or constant enthalpy DPD simulation.  

# 2.205.5 Related commands  

fix eos/table/rx, fix shardlow, pair dpd/fdt/energy  

# 2.205.6 Default  

none  

# 2.206 fix saed/vtk command  

# 2.206.1 Syntax  

fix ID group-ID saed/vtk Nevery Nrepeat Nfreak c_ID attribute args ... keyword args ...  

• ID, group-ID are documented in fix command • saed/vtk $=$ style name of this fix command • Nevery $=$ use input values every this many timesteps • Nrepeat $=\#$ of times to use input values for calculating averages • Nfreq $=$ calculate averages every this many timesteps  

• $\mathrm{{c\_ID=}}$ saed compute ID  

keyword $=$ file or ave or start or file or overwrite:l ave args $=$ one or running or window M one $=$ output a new average value every Nfreq steps running $=$ output cumulative average of all previous Nfreq steps window $\mathrm{M}=$ output average of M most recent Nfreq steps start $\mathrm{args}=\mathrm{Nstart}$ Nstart $=$ start averaging on this timestep file arg = filename filename $-$ name of file to output time averages to  

# 2.206.2 Examples  

compute 1 all saed 0.0251 Al O Kmax 1.70 Zone 0 0 1 dR_Ewald 0.01 c 0.5 0.5 0.5 compute 2 all saed 0.0251 Ni Kmax 1.70 Zone 0 0 0 c 0.05 0.05 0.05 manual echo  

fix 1 all saed/vtk 1 1 1 c_1 file Al2O3_001.saed fix 2 all saed/vtk 1 1 1 c_2 file Ni_000.saed  

# 2.206.3 Description  

Time average computed intensities from compute saed and write output to a file in the third generation vtk image data format for visualization directly in parallelized visualization software packages like ParaView and VisIt. Note that if no time averaging is done, this command can be used as a convenient way to simply output diffraction intensities at a single snapshot.  

To produce output in the image data vtk format ghost data is added outside the Kmax range assigned in the compute saed. The ghost data is assigned a value of -1 and can be removed setting a minimum isovolume of 0 within the visualization software. SAED images can be created by visualizing a spherical slice of the data that is centered at R_Ewald\*[h k $\mathrm{{lJ/norm}([h~k~l])}$ , where R_Ewald $\underline{{\underline{{\mathbf{\Pi}}}}}$ 1/lambda.  

The group specified within this command is ignored. However, note that specified values may represent calculations performed by saed computes which store their own “group” definitions.  

Fix saed/vtk is designed to work only with compute saed values, e.g.  

compute 3 top saed 0.0251 Al O fix saed/vtk 1 1 1 c_3 file Al2O3_001.saed  

The Nevery, Nrepeat, and Nfreq arguments specify on what timesteps the input values will be used in order to contribute to the average. The final averaged quantities are generated on timesteps that are a multiple of Nfreq. The average is over Nrepeat quantities, computed in the preceding portion of the simulation every Nevery timesteps. Nfreq must be a multiple of Nevery and Nevery must be non-zero even if Nrepeat is 1. Also, the timesteps contributing to the average value cannot overlap, i.e. Nrepeat\*Nevery can not exceed Nfreq.  

For example, if Nevery $=2$ , Nrepeat $_{=6}$ , and $\scriptstyle\mathrm{Nfreq}=100$ , then values on timesteps 90,92,94,96,98,100 will be used to compute the final average on timestep 100. Similarly for timesteps 190,192,194,196,198,200 on timestep 200, etc. If Nrepea $^{\mathrm{{\circ}}}{=}1$ and Nfreq $=100$ , then no time averaging is done; values are simply generated on timesteps 100,200,etc.  

The output for fix ave/time/saed is a file written with the third generation vtk image data formatting. The filename assigned by the file keyword is appended with _N.vtk where N is an index (0,1,2. . . ) to account for multiple diffraction intensity outputs.  

By default the header contains the following information (with example data):  

<html><body><table><tr><td># vtk DataFile Version 3.0 cSAED Image data set</td></tr><tr><td>ASCII</td></tr><tr><td>DATASET STRUCTUREDPOINTS DIMENSIONS337219209</td></tr><tr><td>ASPECTRATIO 0.005079530.00785161 0.00821458</td></tr><tr><td></td></tr><tr><td>POINTDATA15424827</td></tr><tr><td>SCALARS intensity foat</td></tr><tr><td>LOOKUPTABLE default</td></tr><tr><td>...data</td></tr></table></body></html>  

In this example, kspace is sampled across a $337\mathrm{~x~}219\mathrm{~x~}209$ point mesh where the mesh spacing is approximately 0.005, 0.007, and 0.008 inv(length) units in the k1, k2, and $_{\mathrm{k}3}$ directions, respectively. The data is shifted by -0.85, -0.85, -0.85 inv(length) units so that the origin will lie at $0,0,0$ . Here, 15,424,827 kspace points are sampled in total.  

Additional optional keywords also affect the operation of this fix.  

The ave keyword determines how the values produced every Nfreq steps are averaged with values produced on previous steps that were multiples of Nfreq, before they are accessed by another output command or written to a file.  

If the ave setting is one, then the values produced on timesteps that are multiples of Nfreq are independent of each other; they are output as-is without further averaging.  

If the ave setting is running, then the values produced on timesteps that are multiples of Nfreq are summed and averaged in a cumulative sense before being output. Each output value is thus the average of the value produced on that timestep with all preceding values. This running average begins when the fix is defined; it can only be restarted by deleting the fix via the unfix command, or by re-defining the fix by re-specifying it.  

If the ave setting is window, then the values produced on timesteps that are multiples of Nfreq are summed and averaged within a moving “window” of time, so that the last M values are used to produce the output. E.g. if $\mathbf M=3$ and Nfreq $=1000$ , then the output on step 10000 will be the average of the individual values on steps 8000,9000,10000. Outputs on early steps will average over less than M values if they are not available.  

The start keyword specifies what timestep averaging will begin on. The default is step 0. Often input values can be 0.0 at time 0, so setting start to a larger value can avoid including a 0.0 in a running or windowed average.  

The file keyword allows a filename to be specified. Every Nfreq steps, the vector of saed intensity data is written to a new file using the third generation vtk format. The base of each file is assigned by the file keyword and this string is appended with _N.vtk where N is an index (0,1,2. . . ) to account for situations with multiple diffraction intensity outputs.  

# 2.206.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix is part of the DIFFRACTION package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.206.5 Restrictions  

The attributes for fix_saed_vtk must match the values assigned in the associated compute_saed command.  

# 2.206.6 Related commands  

compute_saed  

# 2.206.7 Default  

The option defaults are ave $=$ one, start $=0$ , no file output.  

(Coleman) Coleman, Spearot, Capolungo, MSMSE, 21, 055020 (2013).  

# 2.207 fix setforce command  

Accelerator Variants: setforce/kk  

# 2.208 fix setforce/spin command  

# 2.208.1 Syntax  

fix ID group-ID setforce fx fy fz keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• setforce $=$ style name of this fix command   
• fx,fy,fz $=$ force component values   
any of fx,fy,fz can be a variable (see below)   
• zero or more keyword/value pairs may be appended to args   
• keyword $=$ region region value $=$ region-ID region- $\mathrm{\cdotID}=\mathrm{ID}$ of region atoms must be in to have added force  

# 2.208.2 Examples  

fix freeze indenter setforce 0.0 0.0 0.0 fix 2 edge setforce NULL 0.0 0.0 fix 1 edge setforce/spin 0.0 0.0 0.0 fix 2 edge setforce NULL 0.0 v_oscillate  

# 2.208.3 Description  

Set each component of force on each atom in the group to the specified values fx,fy,fz. This erases all previously computed forces on the atom, though additional fixes could add new forces. This command can be used to freeze certain atoms in the simulation by zeroing their force, either for running dynamics or performing an energy minimization. For dynamics, this assumes their initial velocity is also zero.  

Any of the fx,fy,fz values can be specified as NULL which means do not alter the force component in that dimension.  

Any of the 3 quantities defining the force components can be specified as an equal-style or atom-style variable, namely fx, fy, fz. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the force component.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent force field.  

Atom-style variables can specify the same formulas as equal-style variables but can also include per-atom values, such as atom coordinates. Thus it is easy to specify a spatially-dependent force field with optional time-dependence as well.  

If the region keyword is used, the atom must also be in the specified geometric region in order to have force added to it.  

Style spin suffix sets the components of the magnetic precession vectors instead of the mechanical forces. This also erases all previously computed magnetic precession vectors on the atom, though additional magnetic fixes could add new forces.  

This command can be used to freeze the magnetic moment of certain atoms in the simulation by zeroing their precession vector.  

All options defined above remain valid, they just apply to the magnetic precession vectors instead of the forces.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

![](images/6bc7ea3b42d226c3d5f11f9f4dad3efeaab913864ab7d5ea24f72947d257d26d.jpg)  

# Note  

The region keyword is supported by Kokkos, but a Kokkos-enabled region must be used. See the region region command for more information.  

# 2.208.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is setting the forces to the desired values; on all other levels, the force is set to 0.0 for the atoms in the fix group, so that setforce values are not counted multiple times. Default is to to override forces at the outermost level.  

This fix computes a global 3-vector of forces, which can be accessed by various output commands. This is the total force on the group of atoms before the forces on individual atoms are changed by the fix. The vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command, but you cannot set forces to any value besides zero when performing a minimization. Use the fix addforce command if you want to apply a non-zero force to atoms during a minimization.  

# 2.208.5 Restrictions  

Fix setforce/spin is part of the SPIN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.208.6 Related commands  

fix addforce, fix aveforce  

# 2.208.7 Default  

none  

# 2.209 fix sgcmc command  

# 2.209.1 Syntax  

fix ID group-ID sgcmc every_nsteps swap_fraction temperature deltamu ...  

• ID, group-ID are documented in fix command   
• sgcmc $=$ style name of this fix command   
• every_nsteps $=$ number of MD steps between MC cycles   
• swap_fraction $=$ fraction of a full MC cycle carried out at each call (a value of 1.0 will perform as many trial moves as there are atoms)   
• temperature $=$ temperature that enters Boltzmann factor in Metropolis criterion (usually the same as MD temperature)   
• deltamu $=N{-}I$ chemical potential differences $\mu_{1}-\mu_{2},\dots,\mu_{1}-\mu_{N}$ ( $N$ is the number of atom types)   
• Zero or more keyword/value pairs may be appended to fix definition line: keyword $=$ variance or randseed or window_moves or window_size variance kappa conc1 [conc2] ... [concN] kappa $=$ variance constraint parameter c_2, c_3,..., $\mathrm{~c~}_{-}\mathrm{N}=\mathrm{N}{-}1$ target concentration fractions randseed N $\mathrm{N}=$ seed for pseudo random number generator window_moves N  

$\mathrm{N}=$ number of times sampling window is moved during one MC cycle window_size frac frac $=$ size of sampling window (must be between 0.5 and 1.0)  

# 2.209.2 Examples  

fix mc all sgcmc 50 0.1 400.0 -0.55   
fix vc all sgcmc 20 0.2 700.0 -0.7 randseed 324234 variance 2000.0 0.05   
fix 2 all sgcmc 20 0.1 700.0 -0.7 window_moves 20  

# 2.209.3 Description  

Added in version 22Dec2022.  

This command allows to carry out parallel hybrid molecular dynamics/Monte Carlo (MD/MC) simulations using the algorithms described in (Sadigh1). Simulations can be carried out in either the semi-grand canonical (SGC) or variance constrained semi-grand canonical (VC-SGC) ensemble (Sadigh2). Only atom type swaps are performed by the SGCMC fix. Relaxations are accounted for by the molecular dynamics integration steps.  

This fix can be used with standard multi-element EAM potentials (pair styles eam/alloy or eam/fs)  

The SGCMC fix can handle Finnis/Sinclair type EAM potentials where $\rho(r)$ is atom-type specific, such that different elements can contribute differently to the total electron density at an atomic site depending on the identity of the element at that atomic site.  

If this fix is applied, the regular MD simulation will be interrupted in defined intervals to carry out a fraction of a Monte Carlo (MC) cycle. The interval is set using the parameter every_nsteps which determines how many MD integrator steps are taken between subsequent calls to the MC routine.  

It is possible to carry out pure lattice MC simulations by setting every_nsteps to 1 and not defining an integration fix such as NVE, NPT etc. In that case, the particles will not move and only the MC routine will be called to perform atom type swaps.  

The parameter swap_fraction determines how many MC trial steps are carried out every time the MC routine is entered. It is measured in units of full MC cycles where one full cycle, swap_fraction $\scriptstyle=I$ , corresponds to as many MC trial steps as there are atoms.  

The parameter temperature specifies the temperature that is used to evaluate the Metropolis acceptance criterion. While it usually should be set to the same value as the MD temperature there are cases when it can be useful to use two different values for at least part of the simulation, e.g., to speed up equilibration at low temperatures.  

The parameter deltamu is used to set the chemical potential differences in the SGC MC algorithm (see Eq. 16 in Sadigh1). The N-1 differences are defined as $\mu_{1}-\mu_{2},\dots,\mu_{1}-\mu_{N}$ , where $N$ is the number of atom types.  

The variance-constrained SGC MC algorithm is activated if the keyword variance is used. In that case the fix parameter deltamu determines the effective average constraint in the parallel VC-SGC MC algorithm (parameter $\delta\mu_{0}$ in Eq. (20) of Sadigh1). The parameter kappa specifies the variance constraint (see Eqs. (20-21) in Sadigh1). The parameter conc sets the $N{-}I$ target atomic concentration fractions (parameter $c_{0}$ in Eqs. (20-21) of Sadigh1) $0\leq c_{2},\dots,c_{N}\leq1$ , with $c_{1}=1-\Sigma_{i=2}^{N}c_{i}$ . When the simulation includes $N$ atom types (elements), $N{-}I$ concentration values must be specified.  

There are several technical parameters that can be set via optional flags.  

randseed is expected to be a positive integer number and is used to initialize the random number generator on each processor.  

window_size controls the size of the sampling window in a parallel MC simulation. The size has to lie between 0.5 and 1.0. Normally, this parameter should be left unspecified which instructs the code to choose the optimal window size automatically (see Sect. III.B and Figure 6 in Sadigh1 for details).  

The number of times the window is moved during a MC cycle is set using the parameter window_moves (see Sect. III.B in Sadigh1 for details).  

# 2.209.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to restart files.  

The MC routine keeps track of the global concentration(s) as well as the number of accepted and rejected trial swaps during each MC step. These values are provided by the sgcmc fix in the form of a global vector that can be accessed by various output commands components of the vector represent the following quantities:  

• $1=$ The absolute number of accepted trial swaps during the last MC step • $2=$ The absolute number of rejected trial swaps during the last MC step • $3=$ Current global concentration $c_{-}I$ $\cong$ number of atoms of type 1 / total number of atoms) • $4=$ Current global concentration $c_{-}2$ $\cong$ number of atoms of type $2/$ total number of atoms) • . . . • $\Nu+2=$ Current global concentration $c\_N$ $\cong$ number of atoms of type $N$ / total number of atom  

The vector values calculated by this fix are “intensive”.  

# 2.209.5 Restrictions  

This fix is part of the MC package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix style requires an atom style with per atom type masses.  

At present the fix provides optimized subroutines for EAM type potentials (see above) that calculate potential energy changes due to local atom type swaps very efficiently. Other potentials are supported by using the generic potential functions. This, however, will lead to exceedingly slow simulations since it implies that the energy of the entire system is recomputed at each MC trial step. If other potentials are to be used it is strongly recommended to modify and optimize the existing generic potential functions for this purpose. Also, the generic energy calculation can not be used for parallel execution i.e. it only works with a single MPI process.  

# 2.209.6 Default  

The optional parameters default to the following values:  

• randseed = 324234 • window_moves $=8$ • window_size $=$ automatic  

(Sadigh1) B. Sadigh, P. Erhart, A. Stukowski, A. Caro, E. Martinez, and L. Zepeda-Ruiz, Phys. Rev. B 85, 184203   
(2012)   
(Sadigh2) B. Sadigh and P. Erhart, Phys. Rev. B 86, 134204 (2012)  

# 2.209. fix sgcmc command  

# 2.210 fix shake command  

Accelerator Variants: shake/kk  

# 2.211 fix rattle command  

# 2.211.1 Syntax  

fix ID group-ID style tol iter N constraint values ... keyword value ...  

• ID, group-ID are documented in fix command   
• style $=$ shake or rattle $=$ style name of this fix command   
• tol $=$ accuracy tolerance of SHAKE solution   
• iter $=$ max # of iterations in each SHAKE solution   
• $\Nu=$ print SHAKE statistics every this many timesteps ( $0=$ never)   
• one or more constraint/value pairs are appended   
• constraint $=b$ or $a$ or $t$ or $m$ b values $=$ one or more bond types (may use type labels) a values $=$ one or more angle types (may use type labels) $\mathrm{t}$ values $=$ one or more atom types (may use type labels) m value $=$ one or more mass values   
• zero or more keyword/value pairs may be appended   
• keyword $=$ mol or kbond mol value $=$ template-ID template- $\mathrm{ID}=\mathrm{ID}$ of molecule template specified in a separate molecule command kbond value $=$ force constant force constant $=$ force constant used to apply a restraint force when used during minimization  

# 2.211.2 Examples  

<html><body><table><tr><td>fix 1 sub shake 0.0001 20 10 b 4 19 a 3 5 2</td></tr><tr><td>fix 1 sub shake 0.0001 20 10 t 5 6 m 1.0 a 31</td></tr><tr><td></td></tr><tr><td>mol myMol</td></tr><tr><td>fix 1 sub rattle 0.0001 20 10 t 5 6 m 1.0 a 31</td></tr></table></body></html>  

# 2.211.3 Description  

Apply bond and angle constraints to specified bonds and angles in the simulation by either the SHAKE or RATTLE algorithms. This typically enables a longer timestep. The SHAKE or RATTLE constraint algorithms, however, can only be applied during molecular dynamics runs.  

Changed in version 15Sep2022.  

These fixes may now also be used during minimization. In that case the constraints are approximated by strong harmonic restraints.  

# SHAKE vs RATTLE:  

The SHAKE algorithm was invented for schemes such as standard Verlet timestepping, where only the coordinates are integrated and the velocities are approximated as finite differences to the trajectories (Ryckaert et al. (1977)). If the velocities are integrated explicitly, as with velocity Verlet which is what LAMMPS uses as an integration method, a second set of constraining forces is required in order to eliminate velocity components along the bonds (Andersen (1983)).  

In order to formulate individual constraints for SHAKE and RATTLE, focus on a single molecule whose bonds are constrained. Let Ri and Vi be the position and velocity of atom $i$ at time $n$ , for $i=1,\ldots,N_{\astrosun}$ , where $N$ is the number of sites of our reference molecule. The distance vector between sites $i$ and $j$ is given by  

$$
\mathbf{r}_{i j}^{n+1}=\mathbf{r}_{j}^{n}-\mathbf{r}_{i}^{n}
$$  

The constraints can then be formulated as  

$$
\begin{array}{l}{{\mathbf{r}_{i j}^{n+1}\cdot\mathbf{r}_{i j}^{n+1}=d_{i j}^{2}\quad\mathrm{and}}}\ {{\mathbf{v}_{i j}^{n+1}\cdot\mathbf{r}_{i j}^{n+1}=0}}\end{array}
$$  

The SHAKE algorithm satisfies the first condition, i.e. the sites at time $n{+}I$ will have the desired separations Dij immediately after the coordinates are integrated. If we also enforce the second condition, the velocity components along the bonds will vanish. RATTLE satisfies both conditions. As implemented in LAMMPS, fix rattle uses fix shake for satisfying the coordinate constraints. Therefore the settings and optional keywords are the same for both fixes, and all the information below about SHAKE is also relevant for RATTLE.  

# SHAKE:  

Each timestep the specified bonds and angles are reset to their equilibrium lengths and angular values via the SHAKE algorithm (Ryckaert et al. (1977)). This is done by applying an additional constraint force so that the new positions preserve the desired atom separations. The equations for the additional force are solved via an iterative method that typically converges to an accurate solution in a few iterations. The desired tolerance (e.g. $1.0\mathrm{e}{-4}=1$ part in 10000) and maximum # of iterations are specified as arguments. Setting the N argument will print statistics to the screen and log file about regarding the lengths of bonds and angles that are being constrained. Small delta values mean SHAKE is doing a good job.  

In LAMMPS, only small clusters of atoms can be constrained. This is so the constraint calculation for a cluster can be performed by a single processor, to enable good parallel performance. A cluster is defined as a central atom connected to others in the cluster by constrained bonds. LAMMPS allows for the following kinds of clusters to be constrained: one central atom bonded to 1 or 2 or 3 atoms, or one central atom bonded to 2 others and the angle between the three atoms also constrained. This means water molecules or CH2 or CH3 groups may be constrained, but not all the C-C backbone bonds of a long polymer chain.  

The $b$ constraint lists bond types that will be constrained. The $t$ constraint lists atom types. All bonds connected to an atom of the specified type will be constrained. The $m$ constraint lists atom masses. All bonds connected to atoms of the specified masses will be constrained (within a fudge factor of MASSDELTA specified in src/RIGID/fix_shake.cpp). The $a$ constraint lists angle types. If both bonds in the angle are constrained then the angle will also be constrained if its type is in the list.  

Changed in version 29Aug2024.  

The types may be given as type labels only if there is no atom, bond, or angle type label named $b,a,t,$ , or $m$ defined in the simulation. If that is the case, type labels cannot be used as constraint type index with these two fixes, because the type labels would be incorrectly treated as a new type of constraint instead. Thus, LAMMPS will print a warning and type label handling is disabled and numeric types must be used.  

For all constraints, a particular bond is only constrained if both atoms in the bond are in the group specified with the SHAKE fix.  

The degrees-of-freedom removed by SHAKE bonds and angles are accounted for in temperature and pressure computations. Similarly, the SHAKE contribution to the pressure of the system (virial) is also accounted for.  

![](images/282e438895eb22b13a9c69f37dd5b14cdcedd48b4db1e6aad4cfc9043ed89362.jpg)  

# Note  

This command works by using the current forces on atoms to calculate an additional constraint force which when added will leave the atoms in positions that satisfy the SHAKE constraints (e.g. bond length) after the next time integration step. If you define fixes (e.g. fix efield) that add additional force to the atoms after fix shake operates, then this fix will not take them into account and the time integration will typically not satisfy the SHAKE constraints. The solution for this is to make sure that fix shake is defined in your input script after any other fixes which add or change forces (to atoms that fix shake operates on).  

The mol keyword should be used when other commands, such as fix deposit or fix pour, add molecules on-the-fly during a simulation, and you wish to constrain the new molecules via SHAKE. You specify a template- $I D$ previously defined using the molecule command, which reads a file that defines the molecule. You must use the same template- $I D$ that the command adding molecules uses. The coordinates, atom types, special bond restrictions, and SHAKE info can be specified in the molecule file. See the molecule command for details. The only settings required to be in this file (by this command) are the SHAKE info of atoms in the molecule.  

The kbond keyword sets the restraint force constant when fix shake or fix rattle are used during minimization. In that case the constraint algorithms are not applied and restraint forces are used instead to maintain the geometries similar to the constraints. How well the geometries are maintained and how quickly a minimization converges, depends largely on the force constant kbond: larger values will reduce the deviation from the desired geometry, but can also lead to slower convergence of the minimization or lead to instabilities depending on the minimization algorithm requiring to reduce the value of timestep. Even though the restraints will not preserve the bond lengths and angles as closely as the constraints during the MD, they are generally close enough so that the constraints will be fulfilled to the desired accuracy within a few MD steps following the minimization. The default value for kbond depends on the units setting and is $1.0{\mathrm{e}}6^{*}{\mathrm{k}}\_{}\mathrm{B}$ .  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# RATTLE:  

The velocity constraints lead to a linear system of equations which can be solved analytically. The implementation of the algorithm in LAMMPS closely follows (Andersen (1983)).  

![](images/682015d2da826e0ada25b3bdf14774e20278f465a7a62827e7c92a1f7ca466f2.jpg)  

# Note  

The fix rattle command modifies forces and velocities and thus should be defined after all other integration fixes in your input script. If you define other fixes that modify velocities or forces after fix rattle operates, then fix rattle will not take them into account and the overall time integration will typically not satisfy the RATTLE constraints. You can check whether the constraints work correctly by setting the value of RATTLE_DEBUG in src/RIGID/ fix_rattle.cpp to 1 and recompiling LAMMPS.  

# 2.211.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about these fixes is written to binary restart files.  

Both fix shake and fix rattle behave differently during a minimization in comparison to a molecular dynamics run:  

• When used during a minimization, the SHAKE or RATTLE constraint algorithms themselves are not applied. Instead the constraints are replaced by harmonic restraint forces. The energy and virial contributions due to the restraint forces are tallied into global and per-atom accumulators. The total restraint energy is also accessible as a global scalar property of the fix.   
• During molecular dynamics runs, however, the fixes do apply the requested SHAKE or RATTLE constraint algorithms.  

The fix_modify virial option is supported by these fixes to add the contribution due to the added constraint forces on atoms to both the global pressure and per-atom stress of the system via the compute pressure and compute stress/atom commands. The former can be accessed by thermodynamic output.  

The default setting for this fix is fix_modify virial yes. No global or per-atom quantities are stored by these fixes for access by various output commands during an MD run. No parameter of these fixes can be used with the start/stop keywords of the run command.  

# 2.211.5 Restrictions  

These fixes are part of the RIGID package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

For computational efficiency, there can only be one shake or rattle fix defined in a simulation.  

If you use a tolerance that is too large or a max-iteration count that is too small, the constraints will not be enforced very strongly, which can lead to poor energy conservation. You can test for this in your system by running a constant NVE simulation with a particular set of SHAKE parameters and monitoring the energy versus time.  

SHAKE or RATTLE should not be used to constrain an angle at 180 degrees (e.g. a linear CO2 molecule). This causes a divergence when solving the constraint equations numerically. You can use fix rigid or fix rigid/small instead to make a linear molecule rigid.  

When used during minimization choosing a too large value of the kbond can make minimization very inefficient and also cause stability problems with some minimization algorithms. Sometimes those can be avoided by reducing the timestep.  

# 2.211.6 Related commands  

fix rigid, fix ehex, fix nve/manifold/rattle  

# 2.211.7 Default  

kbond = 1.0e9\*k_B  

# 2.212 fix shardlow command  

Accelerator Variants: shardlow/kk  

# 2.212.1 Syntax  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • shardlow $=$ style name of this fix command  

# 2.212.2 Examples  

# 2.212.3 Description  

Specifies that the Shardlow splitting algorithm (SSA) is to be used to integrate the DPD equations of motion. The SSA splits the integration into a stochastic and deterministic integration step. The fix shardlow performs the stochastic integration step and must be used in conjunction with a deterministic integrator (e.g. fix nve or fix nph). The stochastic integration of the dissipative and random forces is performed prior to the deterministic integration of the conservative force. Further details regarding the method are provided in (Lisal) and (Larentzos1).  

The fix shardlow must be used with the pair_style dpd/fdt or pair_style dpd/fdt/energy command to properly initialize the fluctuation-dissipation theorem parameter(s) sigma (and kappa, if necessary).  

Note that numerous variants of DPD can be specified by choosing an appropriate combination of the integrator and pair_style dpd/fdt command. DPD under isothermal conditions can be specified by using fix shardlow, fix nve and pair_style dpd/fdt. DPD under isoenergetic conditions can be specified by using fix shardlow, fix nve and pair_style dpd/fdt/energy. DPD under isobaric conditions can be specified by using fix shardlow, fix nph and pair_style dpd/fdt. DPD under isoenthalpic conditions can be specified by using fix shardlow, fix nph and pair_style dpd/fdt/energy. Examples of each DPD variant are provided in the examples/PACKAGES/dpd-react directory.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.212.4 Restrictions  

This command is part of the DPD-REACT package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This fix is currently limited to orthogonal simulation cell geometries.  

This fix must be used with an additional fix that specifies time integration, e.g. fix nve or fix nph.  

The Shardlow splitting algorithm requires the sizes of the subdomain lengths to be larger than twice the cutof $^{\cdot}+$ skin.   
Generally, the domain decomposition is dependent on the number of processors requested.  

# 2.212.5 Related commands  

pair_style dpd/fdt, fix eos/cv  

# 2.212.6 Default  

none  

(Lisal) M. Lisal, J.K. Brennan, J. Bonet Avalos, J. Chem. Phys., 135, 204105 (2011).   
(Larentzos1) J.P. Larentzos, J.K. Brennan, J.D. Moore, M. Lisal and W.D. Mattson, Comput. Phys. Commun., 185, 1987-1998 (2014).   
(Larentzos2) J.P. Larentzos, J.K. Brennan, J.D. Moore, and W.D. Mattson, ARL-TR-6863, U.S. Army Research Laboratory, Aberdeen Proving Ground, MD (2014).  

# 2.213 fix smd command  

# 2.213.1 Syntax  

fix ID group-ID smd type values keyword values  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• smd $=$ style name of this fix command   
• mode $=$ cvel or cfor to select constant velocity or constant force SMD cvel values $=\mathrm{K}$ vel $\mathrm{K}=$ spring constant (force/distance units) $\mathrm{vel}=$ velocity of pulling (distance/time units) cfor values $=$ force force $=$ pulling force (force units)   
• keyword $=$ tether or couple tether values $=\mathrm{~x~}$ y z R0 x,y, $\zeta=$ point to which spring is tethered $\mathrm{R0}=$ distance of end of spring from tether point (distance units) couple v $\mathrm{alues}=\mathrm{group}\mathrm{-ID2}\mathrm{~x~y~z~}\mathrm{R0}$ group- $\mathrm{ID2=2nd}$ group to couple to fix group with a spring x,y,z = direction of spring, automatically computed with 'auto' $\mathrm{R0}=$ distance of end of spring (distance units)  

# 2.213.2 Examples  

fix pull cterm smd cvel 20.0 -0.00005 tether NULL NULL 100.0 0.0   
fix pull cterm smd cvel 20.0 -0.0001 tether 25.0 25 25.0 0.0   
fix stretch cterm smd cvel 20.0 0.0001 couple nterm auto auto auto 0.0   
fix pull cterm smd cfor 5.0 tether 25.0 25.0 25.0 0.0  

# 2.213. fix smd command  

# 2.213.3 Description  

This fix implements several options of steered MD (SMD) as reviewed in (Izrailev), which allows to induce conformational changes in systems and to compute the potential of mean force (PMF) along the assumed reaction coordinate (Park) based on Jarzynski’s equality (Jarzynski). This fix borrows a lot from fix spring and fix setforce.  

You can apply a moving spring force to a group of atoms (tether style) or between two groups of atoms (couple style). The spring can then be used in either constant velocity (cvel) mode or in constant force (cfor) mode to induce transitions in your systems. When running in tether style, you may need some way to fix some other part of the system (e.g. via fix spring/self )  

The tether style attaches a spring between a point at a distance of R0 away from a fixed point $x,y,z$ and the center of mass of the fix group of atoms. A restoring force of magnitude K (R - R0) Mi / M is applied to each atom in the group where $K$ is the spring constant, Mi is the mass of the atom, and M is the total mass of all atoms in the group. Note that $K$ thus represents the total force on the group of atoms, not a per-atom force.  

In cvel mode the distance R is incremented or decremented monotonously according to the pulling (or pushing) velocity.   
In cfor mode a constant force is added and the actual distance in direction of the spring is recorded.  

The couple style links two groups of atoms together. The first group is the fix group; the second is specified by groupID2. The groups are coupled together by a spring that is at equilibrium when the two groups are displaced by a vector in direction $x,y,z$ with respect to each other and at a distance R0 from that displacement. Note that $x,y,z$ only provides a direction and will be internally normalized. But since it represents the absolute displacement of group-ID2 relative to the fix group, (1,1,0) is a different spring than (-1,-1,0). For each vector component, the displacement can be described with the auto parameter. In this case the direction is re-computed in every step, which can be useful for steering a local process where the whole object undergoes some other change. When the relative positions and distance between the two groups are not in equilibrium, the same spring force described above is applied to atoms in each of the two groups.  

For both the tether and couple styles, any of the x,y,z values can be specified as NULL which means do not include that dimension in the distance calculation or force application.  

For constant velocity pulling (cvel mode), the running integral over the pulling force in direction of the spring is recorded and can then later be used to compute the potential of mean force (PMF) by averaging over multiple independent trajectories along the same pulling path.  

# 2.213.4 Restart, fix_modify, output, run start/stop, minimize info  

The fix stores the direction of the spring, current pulling target distance and the running PMF to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify virial option is supported by this fix to add the contribution due to the added forces on atoms to both the global pressure and per-atom stress of the system via the compute pressure and compute stress/atom commands. The former can be accessed by thermodynamic output. The default setting for this fix is fix_modify virial no.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the $r$ -RESPA integrator the fix is adding its forces. Default is the outermost level.  

This fix computes a vector list of 7 quantities, which can be accessed by various output commands. The quantities in the vector are in this order: the $\mathbf{X}\mathbf{-}$ , y-, and $\mathbf{Z}$ -component of the pulling force, the total force in direction of the pull, the equilibrium distance of the spring, the distance between the two reference points, and finally the accumulated PMF (the sum of pulling forces times displacement).  

The force is the total force on the group of atoms by the spring. In the case of the couple style, it is the force on the fix group (group-ID) or the negative of the force on the second group (group-ID2). The vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.213.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.213.6 Related commands  

fix drag, fix spring, fix spring/self , fix spring/rg, fix colvars, fix plumed  

# 2.213.7 Default  

none  

(Izrailev) Izrailev, Stepaniants, Isralewitz, Kosztin, Lu, Molnar, Wriggers, Schulten. Computational Molecular Dynamics: Challenges, Methods, Ideas, volume 4 of Lecture Notes in Computational Science and Engineering, pp. 39-65. Springer-Verlag, Berlin, 1998.   
(Park) Park, Schulten, J. Chem. Phys. 120 (13), 5946 (2004)   
(Jarzynski) Jarzynski, Phys. Rev. Lett. 78, 2690 (1997)  

# 2.214 fix smd/adjust_dt command  

# 2.214.1 Syntax  

fix ID group-ID smd/adjust_dt arg  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• smd/adjust_dt $=$ style name of this fix command   
• arg = s_fact s_fact $=$ safety factor  

# 2.214.2 Examples  

# 2.214.4 Restart, fix_modify, output, run start/stop, minimize info  

Currently, no part of MACHDYN supports restarting nor minimization.  

# 2.214.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.214.6 Related commands  

smd/tlsph_dt  

# 2.214.7 Default  

none  

# 2.215 fix smd/integrate_tlsph command  

# 2.215.1 Syntax  

fix ID group-ID smd/integrate_tlsph keyword values • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • smd/integrate_tlsph $=$ style name of this fix command • zero or more keyword/value pairs may be appended • keyword $=$ limit_velocity  

limit_velocity value $=$ max_vel max_vel $=$ maximum allowed velocity  

# 2.215.2 Examples  

<html><body><table><tr><td>fix 1 all smd/integrate_tlsph</td></tr><tr><td>fix 1 all smd integrate_tlsph limit_velocity 1000</td></tr></table></body></html>  

# 2.215.3 Description  

The fix performs explicit time integration for particles which interact according with the Total-Lagrangian SPH pair style.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

The limit_velocity keyword will control the velocity, scaling the norm of the velocity vector to max_vel in case it exceeds this velocity limit.  

# 2.215.4 Restart, fix_modify, output, run start/stop, minimize info  

Currently, no part of MACHDYN supports restarting nor minimization. This fix has no outputs.  

# 2.215.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Changed in version 29Aug2024.  

This fix is incompatible with deformation controls that remap velocity, for instance the remap $\nu$ option of fix deform.  

# 2.215.6 Related commands  

smd/integrate_ulsph  

# 2.215.7 Default  

none  

# 2.216 fix smd/integrate_ulsph command  

# 2.216.1 Syntax  

fix ID group-ID smd/integrate_ulsph keyword • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • smd/integrate_ulsph $=$ style name of this fix command • zero or more keyword/value pairs may be appended • keyword $=$ adjust_radius or limit_velocity  

adjust_radius values $=$ adjust_radius_factor min_nn max_nn adjust_radius_factor $=$ factor which scale the smooth/kernel radius min_nn $=$ minimum number of neighbors max_nn $=$ maximum number of neighbors  

limit_velocity values $=$ max_velocity max_velocity $=$ maximum allowed velocity.  

# 2.216.2 Examples  

<html><body><table><tr><td>fix 1 all smd/integrate_ulsph adjust. tradius 1.02 25 50 fix 1 all smd integrate_u ulsph limit_velocity 11000</td></tr></table></body></html>  

# 2.216.3 Description  

The fix performs explicit time integration for particles which interact with the updated Lagrangian SPH pair style.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

The adjust_radius keyword activates dynamic adjustment of the per-particle SPH smoothing kernel radius such that the number of neighbors per particles remains within the interval min_nn to max_nn. The parameter adjust_radius_factor determines the amount of adjustment per timestep. Typical values are adjust_radius_factor $=1.02$ , min_nn $=15$ , and $m a x\_n n=20$ .  

The limit_velocity keyword will control the velocity, scaling the norm of the velocity vector to max_vel in case it exceeds this velocity limit.  

# 2.216.4 Restart, fix_modify, output, run start/stop, minimize info  

Currently, no part of MACHDYN supports restarting nor minimization. This fix has no outputs.  

# 2.216.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Changed in version 29Aug2024.  

This fix is incompatible with deformation controls that remap velocity, for instance the remap $\nu$ option of fix deform.  

# 2.216.6 Related commands  

none  

# 2.216.7 Default  

none  

# 2.217 fix smd/move_tri_surf command  

# 2.217.1 Syntax  

fix ID group-ID smd/move_tri_surf keyword  

• ID, group-ID are documented in fix command   
• smd/move_tri_surf keyword $=$ style name of this fix command   
• keyword $={}^{*}L I N E A R$ or $*{W I G G L E}$ or \*ROTATE \*LINEAR $\mathrm{args=VxVyVz}$ $\mathrm{Vx,Vy,Vz=co}$ mponents of velocity vector (velocity units), any component can be specified as␣ $\rightarrow\mathrm{NULL}$ \*WIGGLE args = Vx Vy Vz max_travel vx,vy,vz $=$ components of velocity vector (velocity units), any component can be specified as␣ $\hookrightarrow$ NULL max_travel = wiggle amplitude \*ROTATE args = Px Py Pz Rx Ry Rz period $\mathrm{Px,Py,Pz=}$ origin point of axis of rotation (distance units) Rx,Ry,Rz = axis of rotation vector period $=$ period of rotation (time units)  

# 2.217.2 Examples  

<html><body><table><tr><td>fix 1 tool smd move_tri surf *LINEAR 20 20 10</td></tr><tr><td></td></tr><tr><td>fix 2 tool smd move_tri surf *WIGGLE 20 20 10</td></tr><tr><td>fix 2 tool smd move_trisurf *ROTATE 0 005 2 1</td></tr></table></body></html>  

# 2.217.3 Description  

This fix applies only to rigid surfaces read from .STL files via fix smd/wall_surface . It updates position and velocity for the particles in the group each timestep without regard to forces on the particles. The rigid surfaces can thus be moved along simple trajectories during the simulation.  

The ${}^{*}L I N E A R$ style moves particles with the specified constant velocity vector $\mathrm{V}=(\mathrm{Vx},\mathrm{Vy},\mathrm{Vz})$ . This style also sets the velocity of each particle to $\mathbf{V}=(\mathrm{Vx},\mathrm{Vy},\mathrm{Vz})$ .  

The $\ast_{W I G G L E}$ style moves particles in an oscillatory fashion. Particles are moved along (vx, vy, vz) with constant velocity until a displacement of max_travel is reached. Then, the velocity vector is reversed. This process is repeated.  

The ${}^{*}R O T A T E$ style rotates particles around a rotation axis ${\bf R}=({\bf R}{\bf x},{\bf R}{\bf y},{\bf R}{\bf z})$ that goes through a point $\mathbf{P}=(\mathrm{Px},\mathrm{Py},\mathrm{Pz})$ . The period of the rotation is also specified. This style also sets the velocity of each particle to (omega cross Rperp) where omega is its angular velocity around the rotation axis and Rperp is a perpendicular vector from the rotation axis to the particle.  

See this PDF guide to using Smooth Mach Dynamics in LAMMPS.  

# 2.217.4 Restart, fix_modify, output, run start/stop, minimize info  

Currently, no part of MACHDYN supports restarting nor minimization. This fix has no outputs.  

# 2.217.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.217.6 Related commands  

smd/triangle_mesh_vertices, smd/wall_surface  

# 2.217.7 Default  

none  

# 2.218 fix smd/setvel command  

# 2.218.1 Syntax  

fix ID group-ID smd/setvel vx vy vz keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• smd/setvel $=$ style name of this fix command   
• vx,vy,vz $=$ velocity component values   
• any of vx,vy,vz can be a variable (see below)   
• zero or more keyword/value pairs may be appended to args   
• keyword $=$ region region value $=$ region-ID region- $\mathrm{\cdotID}=\mathrm{ID}$ of region particles must be in to have their velocities set  

# 2.218.2 Examples  

fix top_velocity top_group smd/setvel 1.0 0.0 0.0  

# 2.218.3 Description  

Set each component of velocity on each particle in the group to the specified values vx,vy,vz, regardless of the forces acting on the particle. This command can be used to impose velocity boundary conditions.  

Any of the vx,vy,vz values can be specified as NULL which means do not alter the velocity component in that dimension.  

This fix is indented to be used together with a time integration fix.  

Any of the 3 quantities defining the velocity components can be specified as an equal-style or atom-style variable, namely vx, vy, vz. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the force component.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent velocity field.  

Atom-style variables can specify the same formulas as equal-style variables but can also include per-atom values, such as atom coordinates. Thus it is easy to specify a spatially-dependent velocity field with optional time-dependence as well.  

If the region keyword is used, the particle must also be in the specified geometric region in order to have its velocity set by this command.  

# 2.218.4 Restart, fix_modify, output, run start/stop, minimize info  

Currently, no part of MACHDYN supports restarting nor minimization None of the fix_modify options are relevant to this fix.  

This fix computes a global 3-vector of forces, which can be accessed by various output commands. This is the total force on the group of atoms. The vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

# 2.218.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.218.6 Related commands  

none  

# 2.218.7 Default  

none  

# 2.219 fix smd/wall_surface command  

# 2.219.1 Syntax  

fix ID group-ID smd/wall_surface arg type mol-ID  

• ID, group-ID are documented in fix command • smd/wall_surface $=$ style name of this fix command • arg = file  

file $=$ file name of a triangular mesh in stl format • type $=$ particle type to be given to the new particles created by this fix • mol-ID $=$ molecule-ID to be given to the new particles created by this fix (must be $>=65535$ )  

# 2.219.2 Examples  

# 2.219.3 Description  

This fix creates reads a triangulated surface from a file in .STL format. For each triangle, a new particle is created which stores the barycenter of the triangle and the vertex positions. The radius of the new particle is that of the minimum circle which encompasses the triangle vertices.  

The triangulated surface can be used as a complex rigid wall via the smd/tri_surface pair style. It is possible to move the triangulated surface via the smd/move_tri_surf fix style.  

Immediately after a .STL file has been read, the simulation needs to be run for 0 timesteps in order to properly register the new particles in the system. See the “funnel_flow” example in the MACHDYN examples directory.  

See this PDF guide to use Smooth Mach Dynamics in LAMMPS.  

# 2.219.4 Restart, fix_modify, output, run start/stop, minimize info  

Currently, no part of MACHDYN supports restarting nor minimization. This fix has no outputs.  

# 2.219.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The molecule ID given to the particles created by this fix have to be equal to or larger than 65535.  

Within each .STL file, only a single triangulated object must be present, even though the STL format allows for the possibility of multiple objects in one file.  

# 2.219.6 Related commands  

smd/triangle_mesh_vertices, smd/move_tri_surf , smd/tri_surface  

# 2.219.7 Default  

none  

# 2.220 fix sph command  

# 2.220.1 Syntax  

# 2.220.2 Examples  

# 2.220.3 Description  

Perform time integration to update position, velocity, internal energy and local density for atoms in the group each timestep. This fix is needed to time-integrate SPH systems where particles carry internal variables such as internal energy. SPH stands for Smoothed Particle Hydrodynamics.  

See this PDF guide to using SPH in LAMMPS.  

![](images/727f2f65c35dbecc9800db884b7d0c93c670f3e72d28908a2ea04dc233af63d3.jpg)  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

# 2.220.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.220.5 Restrictions  

This fix is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.220.6 Related commands  

fix sph/stationary  

# 2.220.7 Default  

none  

# 2.221 fix sph/stationary command  

# 2.221.1 Syntax  

fix ID group-ID sph/stationary  

• ID, group-ID are documented in fix command $\mathrm{sph}=$ style name of this fix command  

# 2.221.2 Examples  

fix 1 boundary sph/stationary  

# 2.221.3 Description  

Perform time integration to update internal energy and local density, but not position or velocity for atoms in the group each timestep. This fix is needed for SPH simulations to correctly time-integrate fixed boundary particles which constrain a fluid to a given region in space. SPH stands for Smoothed Particle Hydrodynamics.  

See this PDF guide to using SPH in LAMMPS.  

![](images/9073c05bb0e63440f88ff66f51d827cc1c6db0fe64f625752435b62acc7e07c6.jpg)  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

# 2.221.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix. No global or per-atom quantities are stored by this fix for access by various output commands. No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.221.5 Restrictions  

This fix is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.221.6 Related commands  

fix sph  

# 2.221.7 Default  

none  

# 2.222 fix spring command  

# 2.222.1 Syntax  

fix ID group-ID spring keyword values  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• spring $=$ style name of this fix command   
• keyword $=$ tether or couple tether values $=\mathrm{K}$ x y z R0 $\mathrm{K}=$ spring constant (force/distance units) $\mathbf{x},\mathbf{y},\mathbf{z}=$ point to which spring is tethered $\mathrm{R0}=$ equilibrium distance from tether point (distance units) couple values $=$ group-ID2 K x y z R0 group- $\mathrm{{\cdot}I D2=2n d}$ group to couple to fix group with a spring K = spring constant (force/distance units) x,y,z = direction of spring $\mathrm{R0=}$ equilibrium distance of spring (distance units)  

# 2.222.2 Examples  

fix pull ligand spring tether 50.0 0.0 0.0 0.0 0.0   
fix pull ligand spring tether 50.0 0.0 0.0 0.0 5.0   
fix pull ligand spring tether 50.0 NULL NULL 2.0 3.0   
fix 5 bilayer1 spring couple bilayer2 100.0 NULL NULL 10.0 0.0   
fix longitudinal pore spring couple ion 100.0 NULL NULL -20.0 0.0   
fix radial pore spring couple ion 100.0 0.0 0.0 NULL 5.0  

# 2.222.3 Description  

Apply a spring force to a group of atoms or between two groups of atoms. This is useful for applying an umbrella force to a small molecule or lightly tethering a large group of atoms (e.g. all the solvent or a large molecule) to the center of the simulation box so that it does not wander away over the course of a long simulation. It can also be used to hold the centers of mass of two groups of atoms at a given distance or orientation with respect to each other.  

The tether style attaches a spring between a fixed point $x,y,z$ and the center of mass of the fix group of atoms. The equilibrium position of the spring is R0. At each timestep the distance R from the center of mass of the group of atoms to the tethering point is computed, taking account of wrap-around in a periodic simulation box. A restoring force of magnitude K (R - R0) Mi / M is applied to each atom in the group where $K$ is the spring constant, Mi is the mass of the atom, and M is the total mass of all atoms in the group. Note that $K$ thus represents the spring constant for the total force on the group of atoms, not for a spring applied to each atom.  

The couple style links two groups of atoms together. The first group is the fix group; the second is specified by groupID2. The groups are coupled together by a spring that is at equilibrium when the two groups are displaced by a vector $x,y,z$ with respect to each other and at a distance R0 from that displacement. Note that $x,y,z$ is the equilibrium displacement of group-ID2 relative to the fix group. Thus (1,1,0) is a different spring than (-1,-1,0). When the relative positions and distance between the two groups are not in equilibrium, the same spring force described above is applied to atoms in each of the two groups.  

For both the tether and couple styles, any of the x,y,z values can be specified as NULL which means do not include that dimension in the distance calculation or force application.  

The first example above pulls the ligand towards the point (0,0,0). The second example holds the ligand near the surface of a sphere of radius 5 around the point (0,0,0). The third example holds the ligand a distance 3 away from the $\scriptstyle\mathbf{Z}=2$ plane (on either side).  

The fourth example holds 2 bilayers a distance 10 apart in $\mathbf{Z}$ . For the last two examples, imagine a pore (a slab of atoms with a cylindrical hole cut out) oriented with the pore axis along z, and an ion moving within the pore. The fifth example holds the ion a distance of -20 below the $\mathbf{Z}=0$ center plane of the pore (umbrella sampling). The last example holds the ion a distance 5 away from the pore axis (assuming the center-of-mass of the pore in x,y is the pore axis).  

![](images/1e1597614209ffa160042bc973ae40fa77cd3f601d9afffb963b44320f4fbaac.jpg)  

# Note  

The center of mass of a group of atoms is calculated in “unwrapped” coordinates using atom image flags, which means that the group can straddle a periodic boundary. See the dump doc page for a discussion of unwrapped coordinates. It also means that a spring connecting two groups or a group and the tether point can cross a periodic boundary and its length be calculated correctly.  

# 2.222.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify energy option is supported by this fix to add the energy stored in the spring to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is adding its forces. Default is the outermost level.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the spring energy $=0.5^{*}\mathrm{K}^{*}\mathrm{r}^{\wedge}2$ .  

This fix also computes global 4-vector which can be accessed by various output commands. The first 3 quantities in the vector are xyz components of the total force added to the group of atoms by the spring. In the case of the couple style, it is the force on the fix group (group-ID) or the negative of the force on the second group (group-ID2). The fourth quantity in the vector is the magnitude of the force added by the spring, as a positive value if $({\bf r}{-}{\bf R}0)>0$ and a negative value if $({\tt r}-{\tt R}0)<0$ . This sign convention can be useful when using the spring force to compute a potential of mean force (PMF).  

The scalar and vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

![](images/32fa4ad4b5456d5bea3f7850da5e11b66c8cbe6588a083fd3ecad17ae60e48c9.jpg)  

# Note  

If you want the spring energy to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for this fix.  

# 2.222.5 Restrictions  

none  

2.222.6 Related commands fix drag, fix spring/self , fix spring/rg, fix smd  

# 2.222.7 Default  

none  

# 2.223 fix spring/chunk command  

# 2.223.1 Syntax  

fix ID group-ID spring/chunk K chunkID comID • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • spring/chunk $=$ style name of this fix command • $\mathtt{K}=$ spring constant for each chunk (force/distance units) • chunkID $=\mathrm{ID}$ of compute chunk/atom command • $\mathrm{comID=ID}$ of compute com/chunk command  

# 2.223.2 Examples  

# 2.223.3 Description  

Apply a spring force to the center-of-mass (COM) of chunks of atoms as defined by the compute chunk/atom command. Chunks can be molecules or spatial bins or other groupings of atoms. This is a way of tethering each chunk to its initial COM coordinates.  

The chunkID is the ID of a compute chunk/atom command defined in the input script. It is used to define the chunks. The comID is the ID of a compute com/chunk command defined in the input script. It is used to compute the COMs of each chunk.  

At the beginning of the first run or minimize command after this fix is defined, the initial COM of each chunk is calculated and stored as $\scriptstyle\mathrm{R0m}$ , where $\mathbf{M}$ is the chunk number. Thereafter, at every timestep (or minimization iteration), the current COM of each chunk is calculated as Rm. A restoring force of magnitude K $({\mathrm{Rm}}-{\mathrm{R0m}})$ Mi / Mm is applied to each atom in each chunk where $K$ is the specified spring constant, Mi is the mass of the atom, and Mm is the total mass of all atoms in the chunk. Note that $K$ thus represents the spring constant for the total force on each chunk of atoms, not for a spring applied to each atom.  

# 2.223.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the locations of the initial per-chunk center of mass coordinates to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the fix continues in an uninterrupted fashion. Since this fix depends on an instance of compute chunk/atom it will check when reading the restart if the chunk still exists and will define the same number of chunks. The restart data is only applied when the number of chunks matches. Otherwise the center of mass coordinates are recomputed.  

The fix_modify energy option is supported by this fix to add the energy stored in all the springs to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the $r$ -RESPA integrator the fix is adding its forces. Default is the outermost level.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the energy of all the springs, i.e. $0.5^{*}\mathrm{K}^{*}\mathrm{r}^{\wedge}2$ per-spring.  

The scalar value calculated by this fix is “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

![](images/f51963a5cc5e8fd0234a12725dda7c4e71dc15766cfdb88bef22db303aaabc0a.jpg)  

# Note  

If you want the spring energies to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for this fix.  

# 2.223.5 Restrictions  

none  

# 2.223.6 Related commands  

fix spring, fix spring/self , fix spring/rg  

# 2.223.7 Default  

none  

# 2.224 fix spring/rg command  

# 2.224.1 Syntax  

fix ID group-ID spring/rg K RG0 • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command spring/rg $=$ style name of this fix command • $\mathtt{K}=$ harmonic force constant (force/distance units) • $\mathrm{RG0=}$ target radius of gyration to constrain to (distance units)  

if $\mathrm{RG0}=\mathrm{NULL}$ , use the current RG as the target value  

# 2.224.2 Examples  

<html><body><table><tr><td>fix 1 protein spring/rg 5.0 10.0</td></tr><tr><td>fix 2 micelle spring/rg 5.0 NULL</td></tr></table></body></html>  

# 2.224.3 Description  

Apply a harmonic restraining force to atoms in the group to affect their central moment about the center of mass (radius of gyration). This fix is useful to encourage a protein or polymer to fold/unfold and also when sampling along the radius of gyration as a reaction coordinate (i.e. for protein folding).  

The radius of gyration is defined as RG in the first formula. The energy of the constraint and associated force on each atom is given by the second and third formulas, when the group is at a different RG than the target value RG0.  

$$
\begin{array}{l}{{{\displaystyle R_{G}}^{2}={\frac{1}{M}}\sum_{i}^{N}m_{i}\left(x_{i}-{\frac{1}{M}}\sum_{j}^{N}m_{j}x_{j}\right)^{2}}}\ {{{\displaystyle E}=K\left(R_{G}-R_{G0}\right)^{2}}}\ {{{\displaystyle F_{i}}=2K{\frac{m_{i}}{M}}\left(1-{\frac{R_{G0}}{R_{G}}}\right)\left(x_{i}-{\frac{1}{M}}\sum_{j}^{N}m_{j}x_{j}\right)}}\end{array}
$$  

The $(x_{i}$ - center-of-mass) term is computed taking into account periodic boundary conditions, $m_{i}$ is the mass of the atom, and $M$ is the mass of the entire group. Note that $\mathrm{K}$ is thus a force constant for the aggregate force on the group of atoms, not a per-atom force.  

If $R_{G0}$ is specified as NULL, then the RG of the group is computed at the time the fix is specified, and that value is used as the target.  

# 2.224.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the currently used reference RG $(\boldsymbol{R}_{G0})$ to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the fix continues in an uninterrupted fashion.  

None of the fix_modify options are relevant to this fix.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the reference radius of gyration $R_{G0}$ used by the fix. energy change due to this fix. The scalar value calculated by this fix is “intensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

The fix_modify respa option is supported by this fix. This allows to set at which level of the r-RESPA integrator the fix is adding its forces. Default is the outermost level.  

# 2.224.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.224.6 Related commands  

fix spring, fix spring/self fix drag, fix smd  

# 2.224.7 Default  

none  

# 2.225 fix spring/self command  

# 2.225.1 Syntax  

fix ID group-ID spring/self K dir  

• ID, group-ID are documented in fix command spring/self $=$ style name of this fix command • $\mathtt{K}=$ spring constant (force/distance units), can be a variable (see below) • dir $=$ xyz, xy, xz, yz, x, y, or z (optional, default: xyz)  

# 2.225.2 Examples  

fix tether boundary-atoms spring/self 10.0 fix var all spring/self v_kvar fix zrest move spring/self 10.0 z  

# 2.225.3 Description  

Apply a spring force independently to each atom in the group to tether it to its initial position. The initial position for each atom is its location at the time the fix command was issued. At each timestep, the magnitude of the force on each atom is -Kr, where r is the displacement of the atom from its current position to its initial position. The distance r correctly takes into account any crossings of periodic boundary by the atom since it was in its initial position.  

With the (optional) dir flag, one can select in which direction the spring force is applied. By default, the restraint is applied in all directions, but it can be limited to the xy-, xz-, yz-plane and the x-, y-, or z-direction, thus restraining the atoms to a line or a plane, respectively.  

The force constant $k$ can be specified as an equal-style or atom-style variable. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each time step, and its value(s) will be used as force constant for the spring force.  

Equal-style variables can specify formulas with various mathematical functions and include thermo_style command keywords for the simulation box parameters, time step, and elapsed time. Thus, it is easy to specify a time-dependent force field.  

Atom-style variables can specify the same formulas as equal-style variables but can also include per-atom values, such as atom coordinates. Thus, it is easy to specify a spatially-dependent force field with optional time-dependence as well.  

# 2.225.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the original coordinates of tethered atoms to binary restart files, so that the spring effect will be the same in a restarted simulation. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify energy option is supported by this fix to add the energy stored in the per-atom springs to the globa potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no  

The fix_modify respa option is supported by this fix. This allows to set at which level of the $r$ -RESPA integrator the fix is adding its forces. Default is the outermost level.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is an energy which is the sum of the spring energy for each atom, where the per-atom energy is $0.5^{*}\mathrm{K}^{*}\mathrm{r}^{\wedge}2$ . The scalar value calculated by this fix is “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

# Note  

If you want the per-atom spring energy to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix_modify energy option for this fix.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# LAMMPS Documentation, Release 4Feb2025  

# 2.225.5 Restrictions  

The KOKKOS version, fix spring/self/kk may only be used with a constant value of K, not a variable.  

# 2.225.6 Related commands  

fix drag, fix spring, fix smd, fix spring/rg  

# 2.225.7 Default  

none  

# 2.226 fix srd command  

# 2.226.1 Syntax  

fix ID group-ID srd N groupbig-ID Tsrd hgrid seed keyword value ...  

• ID, group-ID are documented in fix command   
• srd $=$ style name of this fix command   
• $\Nu=$ reset SRD particle velocities every this many timesteps   
• groupbig- $\mathrm{\cdotID}=\mathrm{ID}$ of group of large particles that SRDs interact with   
• Tsrd $=$ temperature of SRD particles (temperature units)   
• hgrid $=$ grid spacing for SRD grouping (distance units)   
• seed $=$ random # seed (positive integer)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ lamda or collision or overlap or inside or exact or radius or bounce or search or cubic or shift or tstat or rescale   
lamda value $=$ mean free path of SRD particles (distance units)   
collision value $=$ noslip or slip $=$ collision model   
overlap value $=$ yes or no $=$ whether big particles may overlap   
inside value $=$ error or warn or ignore $=$ how SRD particles which end up inside a big particle are␣   
$\hookrightarrow$ treated   
exact value = yes or no   
radius value = rfactor = scale collision radius by this factor   
bounce valu $:={\mathrm{Nbounce}}={\mathrm{max}}\#$ of collisions an SRD particle can undergo in one timestep   
search value $=$ sgrid = grid spacing for collision partner searching (distance units)   
cubic values = style tolerance style = error or warn tolerance $=$ fractional difference allowed ( $0<=\mathrm{tol}<=1$ )   
shift values = flag shiftseed $\mathrm{Hag}=\mathrm{yes}$ or no or possible = SRD bin shifting for better statistics yes = perform bin shifting each time SRD velocities are rescaled $\mathrm{no}=\mathrm{no}$ shifting possible = shift depending on mean free path and bin size shiftseed = random # seed (positive integer)   
tstat value = yes or no = thermostat SRD particles or not   
rescale value = yes or no or rotate or collide = rescaling of SRD velocities   
yes = rescale during velocity rotation and collisions  

no = no rescaling rotate $=$ rescale during velocity rotation, but not collisions collide $=$ rescale during collisions, but not velocity rotation  

# 2.226.2 Examples  

<html><body><table><tr><td>fix 1 srd srd 10 big 1.0 0.25 482984</td></tr><tr><td>fix 1 srd srd 10 big 0.5 0.25 482984 collision slip search 0.5</td></tr></table></body></html>  

# 2.226.3 Description  

Treat a group of particles as stochastic rotation dynamics (SRD) particles that serve as a background solvent when interacting with big (colloidal) particles in groupbig-ID. The SRD formalism is described in (Hecht). The same methodology is also called multi-particle collision dynamics (MPCD) in the literature.  

The key idea behind using SRD particles as a cheap coarse-grained solvent is that SRD particles do not interact with each other, but only with the solute particles, which in LAMMPS can be spheroids, ellipsoids, or line segments, or triangles, or rigid bodies containing multiple spheroids or ellipsoids or line segments or triangles. The collision and rotation properties of the model imbue the SRD particles with fluid-like properties, including an effective viscosity. Thus simulations with large solute particles can be run more quickly, to measure solute properties like diffusivity and viscosity in a background fluid. The usual LAMMPS fixes for such simulations, such as fix deform, fix viscosity, and fix nvt/sllod, can be used in conjunction with the SRD model.  

These 3 papers give more details on how the SRD model is implemented in LAMMPS. (Petersen) describes pure SRD fluid systems. (Bolintineanu1) describes models where pure SRD fluids interact with boundary walls. (Bolintineanu2) describes mixture models where large colloidal particles are solvated by an SRD fluid. See the examples/srd directory for sample input scripts.  

This fix does two things:  

1. It advects the SRD particles, performing collisions between SRD and big particles or walls every timestep, imparting force and torque to the big particles. Collisions also change the position and velocity of SRD particles. 2. It resets the velocity distribution of SRD particles via random rotations every N timesteps.  

SRD particles have a mass, temperature, characteristic timestep $d t_{S R D}$ , and mean free path between collisions $(\lambda)$ . The fundamental equation relating these 4 quantities is  

$$
\lambda=d t_{S R D}\sqrt{\frac{k_{B}T_{S R D}}{m}}
$$  

The mass $m$ of SRD particles is set by the mass command elsewhere in the input script. The SRD timestep $d t_{S R D}$ is N times the step dt defined by the timestep command. Big particles move in the normal way via a time integration $f\boldsymbol{{x}}$ with a short timestep dt. SRD particles advect with a large timestep $d t_{S R D}\geq d t$ .  

If the lamda keyword is not specified, the SRD temperature $T_{S R D}$ is used in the above formula to compute $\lambda$ . If the lamda keyword is specified, then the Tsrd setting is ignored and the above equation is used to compute the SRD temperature.  

The characteristic length scale for the SRD fluid is set by hgrid which is used to bin SRD particles for purposes of resetting their velocities. Normally hgrid is set to be $1/4$ of the big particle diameter or smaller, to adequately resolve fluid properties around the big particles.  

$\lambda$ cannot be smaller than $0.6~^{*}$ hgrid, else an error is generated (unless the shift keyword is used, see below). The velocities of SRD particles are bounded by Vmax, which is set so that an SRD particle will not advect further than $D_{m a x}=4\lambda$ in $d t_{S R D}$ . This means that roughly speaking, $D_{m a x}$ should not be larger than a big particle diameter, else SRDs may pass through big particles without colliding. A warning is generated if this is the case.  

Collisions between SRD particles and big particles or walls are modeled as a lightweight SRD point particle hitting a heavy big particle of given diameter or a wall at a point on its surface and bouncing off with a new velocity. The collision changes the momentum of the SRD particle. It imparts a force and torque to the big particle. It imparts a force to a wall. Static or moving SRD walls are setup via the fix wall/srd command. For the remainder of this doc page, a collision of an SRD particle with a wall can be viewed as a collision with a big particle of infinite radius and mass.  

The collision keyword sets the style of collisions. The slip style means that the tangential component of the SRD particle momentum is preserved. Thus a force is imparted to a big particle, but no torque. The normal component of the new SRD velocity is sampled from a Gaussian distribution at temperature Tsrd.  

For the noslip style, both the normal and tangential components of the new SRD velocity are sampled from a Gaussian distribution at temperature Tsrd. Additionally, a new tangential direction for the SRD velocity is chosen randomly. This collision style imparts torque to a big particle. Thus a time integrator $f\boldsymbol{a}\boldsymbol{x}$ that rotates the big particles appropriately should be used.  

The overlap keyword should be set to yes if two (or more) big particles can ever overlap. This depends on the pair potential interaction used for big-big interactions, or could be the case if multiple big particles are held together as rigid bodies via the fix rigid command. If the overlap keyword is no and big particles do in fact overlap, then SRD/big collisions can generate an error if an SRD ends up inside two (or more) big particles at once. How this error is treated is determined by the inside keyword. Running with overlap set to no allows for faster collision checking, so it should only be set to yes if needed.  

The inside keyword determines how a collision is treated if the computation determines that the timestep started with the SRD particle already inside a big particle. If the setting is error then this generates an error message and LAMMPS stops. If the setting is warn then this generates a warning message and the code continues. If the setting is ignore then no message is generated. One of the output quantities logged by the fix (see below) tallies the number of such events, so it can be monitored. Note that once an SRD particle is inside a big particle, it may remain there for several steps until it drifts outside the big particle.  

The exact keyword determines how accurately collisions are computed. A setting of yes computes the time and position of each collision as SRD and big particles move together. A setting of no estimates the position of each collision based on the end-of-timestep positions of the SRD and big particle. If overlap is set to yes, the setting of the exact keyword is ignored since time-accurate collisions are needed.  

The radius keyword scales the effective size of big particles. If big particles will overlap as they undergo dynamics, then this keyword can be used to scale down their effective collision radius by an amount rfactor, so that SRD particle will only collide with one big particle at a time. For example, in a Lennard-Jones system at a temperature of 1.0 (in reduced LJ units), the minimum separation between two big particles is as small as about 0.88 sigma. Thus an rfactor value of 0.85 should prevent dual collisions.  

The bounce keyword can be used to limit the maximum number of collisions an SRD particle undergoes in a single timestep as it bounces between nearby big particles. Note that if the limit is reached, the SRD can be left inside a big particle. A setting of 0 is the same as no limit.  

There are 2 kinds of bins created and maintained when running an SRD simulation. The first are “SRD bins” which are used to bin SRD particles and reset their velocities, as discussed above. The second are “search bins” which are used to identify SRD/big particle collisions.  

The search keyword can be used to choose a search bin size for identifying SRD/big particle collisions. The default is to use the hgrid parameter for SRD bins as the search bin size. Choosing a smaller or large value may be more efficient, depending on the problem. But, in a statistical sense, it should not change the simulation results.  

The cubic keyword can be used to generate an error or warning when the bin size chosen by LAMMPS creates SRD bins that are non-cubic or different than the requested value of hgrid by a specified tolerance. Note that using non-cubic SRD bins can lead to undetermined behavior when rotating the velocities of SRD particles, hence LAMMPS tries to protect you from this problem.  

LAMMPS attempts to set the SRD bin size to exactly hgrid. However, there must be an integer number of bins in each dimension of the simulation box. Thus the actual bin size will depend on the size and shape of the overall simulation box. The actual bin size is printed as part of the SRD output when a simulation begins.  

If the actual bin size in non-cubic by an amount exceeding the tolerance, an error or warning is printed, depending on the style of the cubic keyword. Likewise, if the actual bin size differs from the requested hgrid value by an amount exceeding the tolerance, then an error or warning is printed. The tolerance is a fractional difference. E.g. a tolerance setting of 0.01 on the shape means that if the ratio of any 2 bin dimensions exceeds ( $1+/-$ tolerance) then an error or warning is generated. Similarly, if the ratio of any bin dimension with hgrid exceeds ( $1+/-$ tolerance), then an error or warning is generated.  

# Note  

The fix srd command can be used with simulations where the size and/or shape of the simulation box changes. This can be due to non-periodic boundary conditions or the use of fixes such as the fix deform or fix wall/srd commands to impose a shear on an SRD fluid or an interaction with an external wall. If the box size changes then the size of SRD bins must be recalculated every reneighboring. This is not necessary if only the box shape changes. This re-binning is always done so as to fit an integer number of bins in the current box dimension, whether it be a fixed, shrink-wrapped, or periodic boundary, as set by the boundary command. If the box size or shape changes, then the size of the search bins must be recalculated every reneighboring. Note that changing the SRD bin size may alter the properties of the SRD fluid, such as its viscosity.  

The shift keyword determines whether the coordinates of SRD particles are randomly shifted when binned for purposes of rotating their velocities. When no shifting is performed, SRD particles are binned and the velocity distribution of the set of SRD particles in each bin is adjusted via a rotation operator. This is a statistically valid operation if SRD particles move sufficiently far between successive rotations. This is determined by their mean-free path $\lambda$ . If $\lambda$ is less than 0.6 of the SRD bin size, then shifting is required. A shift means that all of the SRD particles are shifted by a vector whose coordinates are chosen randomly in the range [-1/2 bin size, 1/2 bin size]. Note that all particles are shifted by the same vector. The specified random number shiftseed is used to generate these vectors. This operation sufficiently randomizes which SRD particles are in the same bin, even if lambda is small.  

If the shift flag is set to $n o$ , then no shifting is performed, but bin data will be communicated if bins overlap processor boundaries. An error will be generated if $\lambda<0.6$ of the SRD bin size. If the shift flag is set to possible, then shifting is performed only if $\lambda<0.6$ of the SRD bin size. A warning is generated to let you know this is occurring. If the shift flag is set to yes then shifting is performed regardless of the magnitude of $\lambda$ . Note that the shiftseed is not used if the shift flag is set to $n o$ , but must still be specified.  

Note that shifting of SRD coordinates requires extra communication, hence it should not normally be enabled unless required.  

The tstat keyword will thermostat the SRD particles to the specified Tsrd. This is done every N timesteps, during the velocity rotation operation, by rescaling the thermal velocity of particles in each SRD bin to the desired temperature. If there is a streaming velocity associated with the system, e.g. due to use of the fix deform command to perform a simulation undergoing shear, then that is also accounted for. The mean velocity of each bin of SRD particles is set to the position-dependent streaming velocity, based on the coordinates of the center of the SRD bin. Note that collisions of SRD particles with big particles or walls has a thermostatting effect on the colliding particles, so it may not be necessary to thermostat the SRD particles on a bin by bin basis in that case. Also note that for streaming simulations, if no thermostatting is performed (the default), then it may take a long time for the SRD fluid to come to equilibrium with a velocity profile that matches the simulation box deformation.  

The rescale keyword enables rescaling of an SRD particle’s velocity if it would travel more than 4 mean-free paths in an SRD timestep. If an SRD particle exceeds this velocity it is possible it will be lost when migrating to other processors or that collisions with big particles will be missed, either of which will generate errors. Thus the safest mode is to run with rescaling enabled. However rescaling removes kinetic energy from the system (the particle’s velocity is reduced). The latter will not typically be a problem if thermostatting is enabled via the tstat keyword or if SRD collisions with big particles or walls effectively thermostat the system. If you wish to turn off rescaling (on is the default), e.g. for a pure SRD system with no thermostatting so that the temperature does not decline over time, the rescale keyword can be used. The no value turns rescaling off during collisions and the per-bin velocity rotation operation. The collide and rotate values turn it on for one of the operations and off for the other.  

# Note  

This fix is normally used for simulations with a huge number of SRD particles relative to the number of big particles, e.g. 100 to 1. In this scenario, computations that involve only big particles (neighbor list creation, communication, time integration) can slow down dramatically due to the large number of background SRD particles.  

Three other input script commands will largely overcome this effect, speeding up an SRD simulation by a significant amount. These are the atom_modify first, neigh_modify include, and comm_modify group commands. Each takes a group-ID as an argument, which in this case should be the group-ID of the big solute particles.  

Additionally, when a pair_style for big/big particle interactions is specified, the pair_coeff command should be used to turn off big/SRD interactions, e.g. by setting their epsilon or cutoff length to 0.0.  

The “delete_atoms overlap” command may be useful in setting up an SRD simulation to ensure there are no initia overlaps between big and SRD particles.  

# 2.226.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix tabulates several SRD statistics which are stored in a vector of length 12, which can be accessed by various output commands. The vector values calculated by this fix are “intensive”, meaning they do not scale with the size of the simulation. Technically, the first 8 do scale with the size of the simulation, but treating them as intensive means they are not scaled when printed as part of thermodynamic output.  

These are the 12 quantities. All are values for the current timestep, except for quantity 5 and the last three, each of which are cumulative quantities since the beginning of the run.  

(1) # of SRD/big collision checks performed   
(2) # of SRDs which had a collision   
(3) # of SRD/big collisions (including multiple bounces)   
(4) # of SRD particles inside a big particle   
(5) # of SRD particles whose velocity was rescaled to be $<$ Vmax   
(6) # of bins for collision searching   
(7) # of bins for SRD velocity rotation   
(8) # of bins in which SRD temperature was computed   
(9) SRD temperature   
(10) # of SRD particles which have undergone max # of bounces   
(11) max # of bounces any SRD particle has had in a single step   
(12) # of reneighborings due to SRD particles moving too far  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.226.5 Restrictions  

This command can only be used if LAMMPS was built with the SRD package. See the Build package doc page for more info.  

# 2.226.6 Related commands  

fix wall/srd  

# 2.226.7 Default  

The option defaults are: lamda $(\lambda)$ is inferred from Tsrd, collision $=$ noslip, overlap $=$ no, inside $=$ error, exact $=$ yes, radius $=1.0$ , bounce $=0$ , search $=$ hgrid, cubic $=$ error 0.01, shift $=$ no, tstat $=$ no, and rescale $=$ yes.  

(Hecht) Hecht, Harting, Ihle, Herrmann, Phys Rev E, 72, 011408 (2005).   
(Petersen) Petersen, Lechman, Plimpton, Grest, in’ t Veld, Schunk, J Chem Phys, 132, 174106 (2010).   
(Bolintineanu1) Bolintineanu, Lechman, Plimpton, Grest, Phys Rev E, 86, 066703 (2012).   
(Bolintineanu2) Bolintineanu, Grest, Lechman, Pierce, Plimpton, Schunk, Comp Particle Mechanics, 1, 321-356 (2014).  

# 2.227 fix store/force command  

# 2.227.1 Syntax  

fix ID group-ID store/force  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • store/force $=$ style name of this fix command  

# 2.227.2 Examples  

that apply constraints. However, if you wish to include certain constraints (e.g. fix shake) in the stored force, then it could be specified after some fixes and before others.  

# 2.227.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix produces a per-atom array which can be accessed by various output commands. The number of columns for each atom is 3, and the columns store the x,y,z forces on each atom. The per-atom values be accessed on any timestep.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.227.5 Restrictions  

none  

# 2.227.6 Related commands  

fix store_state  

# 2.227.7 Default  

none  

# 2.228 fix store/state command  

# 2.228.1 Syntax  

fix ID group-ID store/state N input1 input2 ... keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • store/state $=$ style name of this fix command • $\Nu=$ store atom attributes every $\mathbf{N}$ steps, $\Nu=0$ for initial store only • input $=$ one or more atom attributes  

possible attributes = id, mol, type, mass, x, y, z, xs, ys, zs, xu, yu, zu, xsu, ysu, zsu, ix, iy, iz, vx, vy, vz, fx, fy, fz, q, mux, muy, muz, mu, radius, diameter, omegax, omegay, omegaz, angmomx, angmomy, angmomz, tqx, tqy, tqz, c_ID, c_ID[I], f_ID, f_ID[I], v_name, d_name, i_name, i2_name[I], d2_name[I],  

id = atom ID   
mol = molecule ID   
type $-$ atom type   
mass $-$ atom mass   
x,y,z = unscaled atom coordinates   
xs,ys,zs = scaled atom coordinates   
xu,yu,zu $-$ unwrapped atom coordinates xsu,ysu,zsu = scaled unwrapped atom coordinates ix,iy,iz = box image that the atom is in vx,vy,vz = atom velocities fx,fy,fz = forces on atoms q = atom charge mux,muy,muz = orientation of dipolar atom mu = magnitued of dipole moment of atom radius,diameter = radius.diameter of spherical particle omegax,omegay,omegaz $-$ angular velocity of spherical particle angmomx,angmomy,angmomz = angular momentum of aspherical particle tqx,tqy,tqz = torque on finite-size particles c_ID = per-atom vector calculated by a compute with ID $\mathrm{c\_ID[I]=Ith}$ column of per-atom array calculated by a compute with ID f_ID = per-atom vector calculated by a fix with ID $\mathrm{f\_ID[I]=Ith}$ column of per-atom array calculated by a fix with ID v_name $=$ per-atom vector calculated by an atom-style variable with name i_name $=$ custom integer vector with name d_name $=$ custom floating point vector with name $\mathrm{i2\_name[I]=Ith}$ column of custom integer array with name d2_name[I] = Ith column of custom floating-point array with name   
• zero or more keyword/value pairs may be appended   
• keyword $=$ com com value $=$ yes or no  

# 2.228.2 Examples  

fix 1 all store/state 0 x y z fix 1 all store/state 0 xu yu zu com yes fix 2 all store/state 1000 vx vy vz  

# 2.228.3 Description  

Define a fix that stores attributes for each atom in the group at the time the fix is defined. If $N$ is 0, then the values are never updated, so this is a way of archiving an atom attribute at a given time for future use in a calculation or output. See the discussion of output commands that take fixes as inputs.  

If $N$ is not zero, then the attributes will be updated every $N$ steps.  

# Note  

Actually, only atom attributes specified by keywords like xu or vy or radius are initially stored immediately at the point in your input script when the fix is defined. Attributes specified by a compute, fix, or variable are not initially stored until the first run following the fix definition begins. This is because calculating those attributes may require quantities that are not defined in between runs.  

The list of possible attributes is the same as that used by the dump custom command, which describes their meaning.  

If the com keyword is set to yes then the xu, yu, and zu inputs store the position of each atom relative to the center-ofmass of the group of atoms, instead of storing the absolute position.  

The requested values are stored in a per-atom vector or array as discussed below. Zeroes are stored for atoms not in the specified group.  

# 2.228.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the per-atom values it stores to binary restart files, so that the values can be restored when a simulation is restarted. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

![](images/f64f9bed08ab4b91e8e5b58f56995d53a0ddf5671f4fbb9bc960f8e0cde76bf0.jpg)  

# Warning  

When reading data from a restart file, this fix command has to be specified exactly the same way as before. LAMMPS will only check whether a fix is of the same style and has the same fix ID and in case of a match will then try to initialize the fix with the data stored in the binary restart file. If the fix store/state command does not match exactly, data can be corrupted or LAMMPS may crash.  

None of the fix_modify options are relevant to this fix.  

If a single input is specified, this fix produces a per-atom vector. If multiple inputs are specified, a per-atom array is produced where the number of columns for each atom is the number of inputs. These can be accessed by various output commands. The per-atom values be accessed on any timestep.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.228.5 Restrictions  

none  

# 2.228.6 Related commands  

dump custom, compute property/atom, fix property/atom, variable  

# 2.228.7 Default  

The option default is $\mathrm{{com}=n o}$ .  

# 2.229 fix temp/berendsen command  

Accelerator Variants: temp/berendsen/kk  

# 2.229.1 Syntax  

fix ID group-ID temp/berendsen Tstart Tstop Tdamp  

• ID, group-ID are documented in fix command • temp/berendsen $=$ style name of this fix command • Tstart,Tstop $=$ desired temperature at start/end of run  

Tstart can be a variable (see below)  

• Tdamp $=$ temperature damping parameter (time units)  

# 2.229.2 Examples  

# 2.229.3 Description  

Reset the temperature of a group of atoms by using a Berendsen thermostat (Berendsen), which rescales their velocities every timestep.  

The thermostat is applied to only the translational degrees of freedom for the particles, which is an important consideration for finite-size particles which have rotational degrees of freedom are being thermostatted with this fix. The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

The desired temperature at each timestep is a ramped value during the run from Tstart to Tstop. The Tdamp parameter is specified in time units and determines how rapidly the temperature is relaxed. For example, a value of 100.0 means to relax the temperature in a timespan of (roughly) 100 time units (tau or fs or ps - see the units command).  

Tstart can be specified as an equal-style variable. In this case, the Tstop setting is ignored. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the target temperature.  

![](images/6e38f8d8451880eaea791c91d61acc780928f13be1a3e1b74b2d54f4d727ad60.jpg)  

# Note  

This thermostat will generate an error if the current temperature is zero at the end of a timestep. It cannot rescale a zero temperature.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent temperature.  

![](images/a2084da62a0b454cf0a3ce5447f24c919f71864f5411103a8ea5977ba655b3b2.jpg)  

# Note  

Unlike the fix nvt command which performs Nose/Hoover thermostatting AND time integration, this fix does NOT perform time integration. It only modifies velocities to effect thermostatting. Thus you must use a separate time integration fix, like fix nve to actually update the positions of atoms using the modified velocities. Likewise, this fix should not normally be used on atoms that also have their temperature controlled by another fix - e.g. by fix nvt or fix langevin commands.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

This fix computes a temperature each timestep. To do this, the fix creates its own compute of style “temp”, as if this command had been issued:  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the $\mathbf{X}$ -component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.229.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the cumulative global energy change to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the fix continues in an uninterrupted fashion.  

The fix_modify temp option is supported by this fix. You can use it to assign a temperature compute you have defined to this fix which will be used in its thermostatting procedure, as described above. For consistency, the group used by this fix and by the compute should be the same.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.229.5 Restrictions  

This fix can be used with dynamic groups as defined by the group command. Likewise it can be used with groups to which atoms are added or deleted over time, e.g. a deposition simulation. However, the conservation properties of the thermostat and barostat are defined for systems with a static set of atoms. You may observe odd behavior if the atoms in a group vary dramatically over time or the atom count becomes very small.  

# 2.229.6 Related commands  

fix nve, fix nvt, fix temp/rescale, fix langevin, fix_modify, compute temp, fix press/berendsen  

# 2.229.7 Default  

none  

(Berendsen) Berendsen, Postma, van Gunsteren, DiNola, Haak, J Chem Phys, 81, 3684 (1984).  

2.230 fix temp/csvr command  

# 2.231 fix temp/csld command  

# 2.231.1 Syntax  

fix ID group-ID temp/csvr Tstart Tstop Tdamp seed fix ID group-ID temp/csld Tstart Tstop Tdamp seed  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • temp/csvr or temp/csld $=$ style name of this fix command • Tstart,Tstop $=$ desired temperature at start/end of run  

Tstart can be a variable (see below)  

• Tdamp $=$ temperature damping parameter (time units) • seed $=$ random number seed to use for white noise (positive integer)  

# 2.231.2 Examples  

fix 1 all temp/csvr 300.0 300.0 100.0 54324   
fix 1 all temp/csld 100.0 300.0 10.0 123321  

# 2.231.3 Description  

Adjust the temperature with a canonical sampling thermostat that uses global velocity rescaling with Hamiltonian dynamics (temp/csvr) (Bussi1), or Langevin dynamics (temp/csld) (Bussi2). In the case of temp/csvr the thermostat is similar to the empirical Berendsen thermostat in temp/berendsen, but chooses the actual scaling factor from a suitably chosen (gaussian) distribution rather than having it determined from the time constant directly. In the case of temp/csld the velocities are updated to a linear combination of the current velocities with a gaussian distribution of velocities at the desired temperature. Both thermostats are applied every timestep.  

The thermostat is applied to only the translational degrees of freedom for the particles, which is an important consideration for finite-size particles which have rotational degrees of freedom are being thermostatted with these fixes. The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

The desired temperature at each timestep is a ramped value during the run from Tstart to Tstop. The Tdamp parameter is specified in time units and determines how rapidly the temperature is relaxed. For example, a value of 100.0 means to relax the temperature in a timespan of (roughly) 100 time units (tau or fs or ps - see the units command).  

Tstart can be specified as an equal-style variable. In this case, the Tstop setting is ignored. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the target temperature.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent temperature.  

![](images/f7899f1c81da09dfac9693ad3a67f4474253ef966c0d0e812de2a766896b8036.jpg)  

# Note  

Unlike the fix nvt command which performs Nose/Hoover thermostatting AND time integration, these fixes do NOT perform time integration. They only modify velocities to effect thermostatting. Thus you must use a separate time integration fix, like fix nve to actually update the positions of atoms using the modified velocities. Likewise, these fixes should not normally be used on atoms that also have their temperature controlled by another fix - e.g. by $f\boldsymbol{{x}}$ nvt or fix langevin commands.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

These fixes compute a temperature each timestep. To do this, the fix creates its own compute of style “temp”, as if this command had been issued:  

compute fix-ID_temp group-ID temp  

See the compute temp command for details. Note that the ID of the new compute is the fix-ID $^+$ underscore $^+$ “temp”, and the group for the new compute is the same as the fix group.  

Note that this is NOT the compute used by thermodynamic output (see the thermo_style command) with $\mathrm{~ID~}=$ thermo_temp. This means you can change the attributes of this fix’s temperature (e.g. its degrees-of-freedom) via the compute_modify command or print this temperature during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the $\mathbf{X}$ -component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

An important feature of these thermostats is that they have an associated effective energy that is a constant of motion. The effective energy is the total energy (kinetic $^+$ potential) plus the accumulated kinetic energy changes due to the thermostat. The latter quantity is the global scalar computed by these fixes. This feature is useful to check the integration of the equations of motion against discretization errors. In other words, the conservation of the effective energy can be used to choose an appropriate integration timestep. This is similar to the usual paradigm of checking the conservation of the total energy in the microcanonical ensemble.  

# 2.231.4 Restart, fix_modify, output, run start/stop, minimize info  

These fixes write the cumulative global energy change and the random number generator states to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the selected fix continues in an uninterrupted fashion. The random number generator state can only be restored when the number of processors remains unchanged from what is recorded in the restart file.  

The fix_modify temp option is supported by these fixes. You can use it to assign a temperature compute you have defined to these fixes which will be used in its thermostatting procedure, as described above. For consistency, the group used by these fixes and by the compute should be the same.  

The cumulative energy change in the system imposed by these fixes is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

These fixes compute a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

These fixes can ramp their target temperature over multiple runs, using the start and stop keywords of the run command.   
See the run command for details of how to do this.  

These fixes are not invoked during energy minimization.  

# 2.231.5 Restrictions  

Fix temp/csld is not compatible with fix shake.  

These fixes are part of the EXTRA-FIX package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

These fixes can be used with dynamic groups as defined by the group command. Likewise it can be used with groups to which atoms are added or deleted over time, e.g. a deposition simulation. However, the conservation properties of the thermostat and barostat are defined for systems with a static set of atoms. You may observe odd behavior if the atoms in a group vary dramatically over time or the atom count becomes very small.  

# 2.231.6 Related commands  

fix nve, fix nvt, fix temp/rescale, fix langevin, fix_modify, compute temp, fix temp/berendsen  

# 2.231.7 Default  

none  

(Bussi1) Bussi, Donadio and Parrinello, J. Chem. Phys. 126, 014101(2007) (Bussi2) Bussi and Parrinello, Phys. Rev. E 75, 056707 (2007)  

# 2.232 fix temp/rescale command  

Accelerator Variants: temp/rescale/kk  

# 2.232.1 Syntax  

fix ID group-ID temp/rescale N Tstart Tstop window fraction • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • temp/rescale $=$ style name of this fix command • $\Nu=$ perform rescaling every N steps • Tstart,Tstop $=$ desired temperature at start/end of run (temperature units)  

Tstart can be a variable (see below)  

• window $=$ only rescale if temperature is outside this window (temperature units) • fraction $=$ rescale to target temperature by this fraction  

# 2.232. fix temp/rescale command  

# 2.232.2 Examples  

<html><body><table><tr><td>fix 3 fow temp/rescale 100 1.0 1.1 0.02 0.5</td></tr><tr><td></td></tr><tr><td>fix 3 boundary temp/rescale 1 1.0 1.5 0.05 1.0 fix 3 boundary temp/rescale 1 1.0 1.5 0.05 1.0</td></tr><tr><td></td></tr></table></body></html>  

# 2.232.3 Description  

Reset the temperature of a group of atoms by explicitly rescaling their velocities.  

The rescaling is applied to only the translational degrees of freedom for the particles, which is an important consideration if finite-size particles which have rotational degrees of freedom are being thermostatted with this fix. The translational degrees of freedom can also have a bias velocity removed from them before thermostatting takes place; see the description below.  

Rescaling is performed every N timesteps. The target temperature is a ramped value between the Tstart and Tstop temperatures at the beginning and end of the run.  

![](images/a756c290c0ca4105381b6d141dbc36da5afa35b591eb5bfbb4ea9fd0a1b8b171.jpg)  

# Note  

This thermostat will generate an error if the current temperature is zero at the end of a timestep it is invoked on. It cannot rescale a zero temperature.  

Tstart can be specified as an equal-style variable. In this case, the Tstop setting is ignored. If the value is a variable, it should be specified as v_name, where name is the variable name. In this case, the variable will be evaluated each timestep, and its value used to determine the target temperature.  

Equal-style variables can specify formulas with various mathematical functions, and include thermo_style command keywords for the simulation box parameters and timestep and elapsed time. Thus it is easy to specify a time-dependent temperature.  

Rescaling is only performed if the difference between the current and desired temperatures is greater than the window value. The amount of rescaling that is applied is a fraction (from 0.0 to 1.0) of the difference between the actual and desired temperature. E.g. if fraction $=1.0$ , the temperature is reset to exactly the desired value.  

![](images/bd4ebdbafdee83d972d3eef43e962586d08f0b4bbda400ec22e63cc774eada07.jpg)  

# Note  

Unlike the fix nvt command which performs Nose/Hoover thermostatting AND time integration, this fix does NOT perform time integration. It only modifies velocities to effect thermostatting. Thus you must use a separate time integration fix, like fix nve to actually update the positions of atoms using the modified velocities. Likewise, this fix should not normally be used on atoms that also have their temperature controlled by another fix - e.g. by fix nvt or fix langevin commands.  

See the Howto thermostat page for a discussion of different ways to compute temperature and perform thermostatting.  

This fix computes a temperature each timestep. To do this, the fix creates its own compute of style “temp”, as if one of this command had been issued:  

compute fix-ID_temp group-ID temp  

See the compute temp for details. Note that the ID of the new compute is the fix-ID $^+$ underscore $^+$ “temp”, and the group for the new compute is the same as the fix group.  

Note that this is NOT the compute used by thermodynamic output (see the thermo_style command) with $\mathrm{~ID~}=$ thermo_temp. This means you can change the attributes of this fix’s temperature (e.g. its degrees-of-freedom) via the compute_modify command or print this temperature during thermodynamic output via the thermo_style custom command using the appropriate compute-ID. It also means that changing attributes of thermo_temp will have no effect on this fix.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the $\mathbf{X}$ -component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 2.232.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the cumulative global energy change to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the fix continues in an uninterrupted fashion.  

The fix_modify temp option is supported by this fix. You can use it to assign a temperature compute you have defined to this fix which will be used in its thermostatting procedure, as described above. For consistency, the group used by this fix and by the compute should be the same.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.232.5 Restrictions  

none  

# 2.232.6 Related commands  

fix langevin, fix nvt, fix_modify  

# 2.232. fix temp/rescale command  

# 2.232.7 Default  

none  

# 2.233 fix temp/rescale/eff command  

# 2.233.1 Syntax  

fix ID group-ID temp/rescale/eff N Tstart Tstop window fraction  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command   
• temp/rescale/ef $=$ style name of this fix command   
• $\Nu=$ perform rescaling every N steps   
• Tstart,Tstop $=$ desired temperature at start/end of run (temperature units)   
• window $=$ only rescale if temperature is outside this window (temperature units)   
• fraction $=$ rescale to target temperature by this fraction  

# 2.233.2 Examples  

fix 3 flow temp/rescale/eff 10 1.0 100.0 0.02 1.0  

# 2.233.3 Description  

Reset the temperature of a group of nuclei and electrons in the electron force field model by explicitly rescaling their velocities.  

The operation of this fix is exactly like that described by the fix temp/rescale command, except that the rescaling is also applied to the radial electron velocity for electron particles.  

# 2.233.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

The fix_modify temp option is supported by this fix. You can use it to assign a temperature compute you have defined to this fix which will be used in its thermostatting procedure, as described above. For consistency, the group used by this fix and by the compute should be the same.  

The cumulative energy change in the system imposed by this fix is included in the thermodynamic output keywords ecouple and econserve. See the thermo_style doc page for details.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

This fix can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.233.5 Restrictions  

This fix is part of the EFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.233.6 Related commands  

fix langevin/eff , fix nvt/eff , fix_modify, fix temp rescale,  

# 2.233.7 Default  

none  

# 2.234 fix tfmc command  

# 2.234.1 Syntax  

fix ID group-ID tfmc Delta Temp seed keyword value • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • tfmc $=$ style name of this fix command • Delta $=$ maximal displacement length (distance units) • Temp $=$ imposed temperature of the system • seed $=$ random number seed (positive integer) • zero or more keyword/arg pairs may be appended • keyword $=$ com or rot  

com args $=$ xflag yflag zflag xflag,yflag,zflag $=0/1$ to exclude/include each dimension   
rot args $=$ none  

# 2.234.2 Examples  

fix 1 all tfmc 0.1 1000.0 159345 fix 1 all tfmc 0.05 600.0 658943 com 1 1 0 fix 1 all tfmc 0.1 750.0 387068 com 1 1 1 rot  

# 2.234.3 Description  

Perform uniform-acceptance force-bias Monte Carlo (fbMC) simulations, using the time-stamped force-bias Monte Carlo (tfMC) algorithm described in (Mees) and (Bal).  

One successful use case of force-bias Monte Carlo methods is that they can be used to extend the time scale of atomistic simulations, in particular when long time scale relaxation effects must be considered; some interesting examples are given in the review by (Neyts). An example of a typical use case would be the modelling of chemical vapor deposition (CVD) processes on a surface, in which impacts by gas-phase species can be performed using MD, but subsequent relaxation of the surface is too slow to be done using MD only. Using tfMC can allow for a much faster relaxation of the surface, so that higher fluxes can be used, effectively extending the time scale of the simulation. (Such an alternating simulation approach could be set up using a loop.)  

The initial version of tfMC algorithm in (Mees) contained an estimation of the effective time scale of such a simulation, but it was later shown that the speed-up one can gain from a tfMC simulation is system- and process-dependent, ranging from none to several orders of magnitude. In general, solid-state processes such as (re)crystallization or growth can be accelerated by up to two or three orders of magnitude, whereas diffusion in the liquid phase is not accelerated at all. The observed pseudodynamics when using the tfMC method is not the actual dynamics one would obtain using MD, but the relative importance of processes can match the actual relative dynamics of the system quite well, provided  

Delta is chosen with care. Thus, the system’s equilibrium is reached faster than in MD, along a path that is generally roughly similar to a typical MD simulation (but not necessarily so). See (Bal) for details.  

Each step, all atoms in the selected group are displaced using the stochastic tfMC algorithm, which is designed to sample the canonical (NVT) ensemble at the temperature Temp. Although tfMC is a Monte Carlo algorithm and thus strictly speaking does not perform time integration, it is similar in the sense that it uses the forces on all atoms in order to update their positions. Therefore, it is implemented as a time integration fix, and no other fixes of this type (such as $f(x n\nu e)$ should be used at the same time. Because velocities do not play a role in this kind of Monte Carlo simulations, instantaneous temperatures as calculated by temperature computes or thermodynamic output have no meaning: the only relevant temperature is the sampling temperature Temp. Similarly, performing tfMC simulations does not require setting a timestep and the simulated time as calculated by LAMMPS is meaningless.  

The critical parameter determining the success of a tfMC simulation is Delta, the maximal displacement length of the lightest element in the system: the larger it is, the longer the effective time scale of the simulation will be (there is an approximately quadratic dependence). However, Delta must also be chosen sufficiently small in order to comply with detailed balance; in general values between 5 and $10~\%$ of the nearest neighbor distance are found to be a good choice. For a more extensive discussion with specific examples, please refer to (Bal), which also describes how the code calculates element-specific maximal displacements from Delta, based on the fourth root of their mass.  

Because of the uncorrelated movements of the atoms, the center-of-mass of the fix group will not necessarily be stationary, just like its orientation. When the com keyword is used, all atom positions will be shifted (after every tfMC iteration) in order to fix the position of the center-of-mass along the included directions, by setting the corresponding flag to 1. The rot keyword does the same for the rotational component of the tfMC displacements after every iteration.  

#  Note  

the com and rot keywords should not be used if an external force is acting on the specified fix group, along the included directions. This can be either a true external force (e.g. through fix wall) or forces due to the interaction with atoms not included in the fix group. This is because in such cases, translations or rotations of the fix group could be induced by these external forces, and removing them will lead to a violation of detailed balance.  

# 2.234.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files.  

None of the fix_modify options are relevant to this fix.  

This fix is not invoked during energy minimization.  

# 2.234.5 Restrictions  

This fix is part of the MC package. It is only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

This fix is not compatible with fix shake.  

# 2.234.6 Related commands  

fix gcmc, fix nvt  

# 2.234.7 Default  

The option default is $\mathrm{com}=000$  

(Bal) K. M Bal and E. C. Neyts, J. Chem. Phys. 141, 204104 (2014).  

(Mees) M. J. Mees, G. Pourtois, E. C. Neyts, B. J. Thijsse, and A. Stesmans, Phys. Rev. B 85, 134301 (2012).   
(Neyts) E. C. Neyts and A. Bogaerts, Theor. Chem. Acc. 132, 1320 (2013).  

# 2.235 fix tgnvt/drude command  

# 2.236 fix tgnpt/drude command  

# 2.236.1 Syntax  

fix ID group-ID style_name keyword values ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • style_name $=$ tgnvt/drude or tgnpt/drude • one or more keyword/values pairs may be appended  

keyword $=$ temp iso or aniso or tri or x or y or z or xy or yz or xz or couple or tchain or pchain or␣ $\mathrm{{\Gamma}_{\mathrm{{+}}\mathrm{{mtk}}}}$ or tloop or ploop or nreset or scalexy or scaleyz or scalexz or flip or fixedpoint temp values $=$ Tstart Tstop Tdamp Tdrude Tdamp_drude  

Tstart, Tstop $=$ external temperature at start/end of run (temperature units) Tdamp $=$ temperature damping parameter (time units)  

Tdrude $=$ desired temperature of Drude oscillators (temperature units)  

Tdamp_drude = temperature damping parameter for Drude oscillators (time units) iso or aniso or tri values = Pstart Pstop Pdamp  

Pstart,Pstop = scalar external pressure at start/end of run (pressure units) Pdamp = pressure damping parameter (time units) x or y or $\mathrm{_{Z}}$ or xy or yz or xz values = Pstart Pstop Pdamp  

Pstart,Pstop $-$ external stress tensor component at start/end of run (pressure units)  

Pdamp = stress damping parameter (time units) couple = none or xyz or xy or yz or xz tchain value = N  

N = length of thermostat chain (1 = single thermostat) pchain value = N  

N length of thermostat chain on barostat ( $0=\mathrm{no}$ thermostat) mtk value = yes or no = add in MTK adjustment term or not tloop value = M  

M = number of sub-cycles to perform on thermostat ploop value = M  

M = number of sub-cycles to perform on barostat thermostat nreset value $=$ reset reference cell every this many timesteps scalexy value = yes or no = scale xy with ly scaleyz value $=$ yes or no $=$ scale yz with lz scalexz value = yes or no $=$ scale xz with lz flip value $=$ yes or no $=$ allow or disallow box flips when it becomes highly skewed fixedpoint values $=\mathrm{~x~}$ y z  

$\mathbf{x},\mathbf{y},\mathbf{z}=$ perform barostat dilation/contraction around this point (distance units)  

# 2.236.2 Examples  

comm_modify vel yes   
fix 1 all tgnvt/drude temp 300.0 300.0 100.0 1.0 20.0   
fix 1 water tgnpt/drude temp 300.0 300.0 100.0 1.0 20.0 iso 0.0 0.0 1000.0   
fix 2 jello tgnpt/drude temp 300.0 300.0 100.0 1.0 20.0 tri 5.0 5.0 1000.0   
fix 2 ice tgnpt/drude temp 250.0 250.0 100.0 1.0 20.0 x 1.0 1.0 0.5 y 2.0 2.0 0.5 z 3.0 3.0 0.5 yz 0.1 0.1 0.5␣   
,→xz 0.2 0.2 0.5 xy 0.3 0.3 0.5 nreset 1000  

Example input scripts available: examples/PACKAGES/drude  

# 2.236.3 Description  

These commands are variants of the Nose-Hoover fix styles fix nvt and fix npt for thermalized Drude polarizable models. They apply temperature-grouped Nose-Hoover thermostat (TGNH) proposed by (Son). When there are fast vibrational modes with frequencies close to Drude oscillators (e.g. double bonds or out-of-plane torsions), this thermostat can provide better kinetic energy equipartitioning.  

The difference between TGNH and the original Nose-Hoover thermostat is that, TGNH separates the kinetic energy of the group into three contributions: molecular center of mass (COM) motion, motion of COM of atom-Drude pairs or non-polarizable atoms relative to molecular COM, and relative motion of atom-Drude pairs. An independent NoseHoover chain is applied to each type of motion. The temperatures for these three types of motion are denoted as molecular translational temperature $(T_{\mathbf{M}})$ , real atomic temperature $(T_{\mathrm{R}})$ and Drude temperature $(T_{\mathrm{D}})$ , which are defined in terms of their associated degrees of freedom (DOF):  

$$
\begin{array}{c}{{T_{\mathrm{{M}}}={\frac{{{\sum_{i}^{N_{\mathrm{{mol}}}}}{M_{i}}V_{i}^{2}}}{3\left({{N_{\mathrm{mol}}}-{\frac{{{N_{\mathrm{mol}}}}}{{{N_{\mathrm{mol}}},{\mathrm{{sys}}}}}}}\right){k_{\mathrm{B}}}}}}}\ {{{}}}\ {{T_{\mathrm{{R}}}={\frac{{\sum_{i}^{N_{\mathrm{{real}}}}{{m_{i}}\left({{\nu_{i}}-{\nu_{M,i}}}\right)^{2}}}}{{{\left({{N_{\mathrm{DOF}}}-3{N_{\mathrm{{mol}}}}+3{\frac{{{N_{\mathrm{mol}}}}}{{{N_{\mathrm{mol}}},{\mathrm{{ss}}}}}}-3{N_{\mathrm{{drade}}}}}\right){k_{\mathrm{{B}}}}}}}}}\ {{T_{\mathrm{{D}}}={\frac{{\sum_{i}^{N_{\mathrm{{mol}}}}{{m_{i}^{\prime}}{\nu_{i}^{\prime}}}}}{{3{N_{\mathrm{drade}}}{k_{\mathrm{{B}}}}}}}}\end{array}
$$  

Here $N_{\mathrm{mol}}$ and $N_{\mathrm{mol,sys}}$ are the numbers of molecules in the group and in the whole system, respectively. $N_{\mathrm{real}}$ is the number of atom-Drude pairs and non-polarizable atoms in the group. $N_{\mathrm{drude}}$ is the number of Drude particles in the group. $N_{\mathrm{DOF}}$ is the DOF of the group. $M_{i}$ and $V_{i}$ are the mass and the COM velocity of the i-th molecule. $m_{i}$ is the mass of the i-th atom-Drude pair or non-polarizable atom. $\nu_{i}$ is the velocity of COM of i-th atom-Drude pair or nonpolarizable atom. $\nu_{M,i}$ is the COM velocity of the molecule the i-th atom-Drude pair or non-polarizable atom belongs to. $m_{i}^{\prime}$ and $\nu_{i}^{\prime}$ are the reduced mass and the relative velocity of the i-th atom-Drude pair.  

# Note  

These fixes require that each atom knows whether it is a Drude particle or not. You must therefore use the fix drude command to specify the Drude status of each atom type.  

Because the TGNH thermostat thermostats the molecular COM motion, all atoms belonging to the same molecule must be in the same group. That is, these fixes can not be applied to a subset of a molecule.  

For this fix to act correctly, ghost atoms need to know their velocity. You must use the comm_modify command to enable this.  

These fixes assume that the translational DOF of the whole system is removed. It is therefore recommended to invoke fix momentum command so that the $T_{\mathbf{M}}$ is calculated correctly.  

The thermostat parameters are specified using the temp keyword. The thermostat is applied to only the translational DOF for the particles. The translational DOF can also have a bias velocity removed before thermostatting takes place; see the description below. The desired temperature for molecular and real atomic motion is a ramped value during the run from Tstart to Tstop. The Tdamp parameter is specified in time units and determines how rapidly the temperature is relaxed. For example, a value of 10.0 means to relax the temperature in a timespan of (roughly) 10 time units (e.g. τ or fs or ps - see the units command). The parameter Tdrude is the desired temperature for Drude motion at each timestep. Similar to Tdamp, the Tdamp_drude parameter determines the relaxation speed for Drude motion. Fix group are the only ones whose velocities and positions are updated by the velocity/position update portion of the integration. Other thermostat-related keywords are tchain and tloop, which are detailed in $f(x n\nu t$ .  

![](images/b790f93a01c746feaa62363b3f5dab2cfd1443afab9009f1b2de0466afd5e4f3.jpg)  

# Note  

A Nose-Hoover thermostat will not work well for arbitrary values of Tdamp. If Tdamp is too small, the temperature can fluctuate wildly; if it is too large, the temperature will take a very long time to equilibrate. A good choice for many models is a Tdamp of around 100 timesteps. A smaller Tdamp_drude value would be required to maintain Drude motion at low temperature.  

fix 1 all nvt temp 300.0 300.0 \$(100.0\*dt) 1.0 \$(20.0\*dt)  

The barostat parameters for fix style tgnpt/drude is specified using one or more of the iso, aniso, tri, x, y, z, xy, xz, yz, and couple keywords. These keywords give you the ability to specify all 6 components of an external stress tensor, and to couple various of these components together so that the dimensions they represent are varied together during a constant-pressure simulation. Other barostat-related keywords are pchain, mtk, ploop, nreset, scalexy, scaleyz, scalexz, flipand fixedpoint. The meaning of barostat parameters are detailed in fix npt.  

Regardless of what atoms are in the fix group (the only atoms which are time integrated), a global pressure or stress tensor is computed for all atoms. Similarly, when the size of the simulation box is changed, all atoms are re-scaled to new positions.  

![](images/bfe615018b038d5a28a602b050a3bfbcbe001246407879b7db25feed664fa236.jpg)  

# Note  

Unlike the fix temp/berendsen command which performs thermostatting but NO time integration, these fixes perform thermostatting/barostatting AND time integration. Thus you should not use any other time integration fix, such as fix nve on atoms to which this fix is applied. Likewise, these fixes should not be used on atoms that also have their temperature controlled by another fix - e.g. by fix langevin/drude command.  

See the Howto thermostat and Howto barostat doc pages for a discussion of different ways to compute temperature and perform thermostatting and barostatting.  

Like other fixes that perform thermostatting, this fix can be used with compute commands that remove a “bias” from the atom velocities. E.g. to apply the thermostat only to atoms within a spatial region, or to remove the center-of-mass velocity from a group of atoms, or to remove the $\mathbf{X}$ -component of velocity from the calculation.  

This is not done by default, but only if the fix_modify command is used to assign a temperature compute to this fix that includes such a bias term. See the doc pages for individual compute temp commands to determine which ones include a bias. In this case, the thermostat works in the following manner: bias is removed from each atom, thermostatting is performed on the remaining thermal degrees of freedom, and the bias is added back in.  

![](images/0aa7b5510456024ba93737311729afaf087a12291184d54dab55553277c32f01.jpg)  

# Note  

However, not all temperature compute commands are valid to be used with these fixes. Precisely, only temperature compute that does not modify the DOF of the group can be used. E.g. compute temp/ramp and compute viscosity/cos compute the kinetic energy after remove a velocity gradient without affecting the DOF of the group, then they can be invoked in this way. In contrast, compute temp/partial may remove the DOF at one or more dimensions, therefore it cannot be used with these fixes.  

# 2.236.4 Restart, fix_modify, output, run start/stop, minimize info  

These fixes writes the state of all the thermostat and barostat variables to binary restart files. See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify temp and press options are supported by these fixes. You can use them to assign a compute you have defined to this fix which will be used in its thermostatting or barostatting procedure, as described above. If you do this, note that the kinetic energy derived from the compute temperature should be consistent with the virial term computed using all atoms for the pressure. LAMMPS will warn you if you choose to compute temperature on a subset of atoms.  

![](images/6920d6b39bfe445d54267369aa69d02f9772b9e1e4eeff22eae373fba1214479.jpg)  

# Note  

If both the temp and press keywords are used in a single thermo_modify command (or in two separate commands), then the order in which the keywords are specified is important. Note that a pressure compute defines its own temperature compute as an argument when it is specified. The temp keyword will override this (for the pressure compute being used by fix npt), but only if the temp keyword comes after the press keyword. If the temp keyword comes before the press keyword, then the new pressure compute specified by the press keyword will be unaffected by the temp setting.  

The cumulative energy change in the system imposed by these fixes, due to thermostatting and/or barostatting, are included in the thermodynamic output keywords ecouple and econserve. See the thermo_style page for details.  

These fixes compute a global scalar which can be accessed by various output commands. The scalar is the same cumulative energy change due to this fix described in the previous paragraph. The scalar value calculated by this fix is “extensive”.  

These fixes also compute a global vector of quantities, which can be accessed by various output commands. The vector values are “intensive”. The vector stores the three temperatures $T_{\mathbf{M}}$ , $T_{\mathrm{R}}$ and $T_{\mathrm{D}}$ .  

These fixes can ramp their external temperature and pressure over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

These fixes are not invoked during energy minimization.  

# 2.236.5 Restrictions  

These fixes are only available when LAMMPS was built with the DRUDE package. These fixes cannot be used with dynamic groups as defined by the group command. These fixes cannot be used in 2D simulations.  

$X,y,z$ cannot be barostatted if the associated dimension is not periodic. Xy, xz, and yz can only be barostatted if the simulation domain is triclinic and the second dimension in the keyword ( $y$ dimension in $x y$ ) is periodic. The create_box, read data, and read_restart commands specify whether the simulation box is orthogonal or non-orthogonal (triclinic) and explain the meaning of the xy,xz,yz tilt factors.  

For the temp keyword, the final Tstop cannot be 0.0 since it would make the external $\mathrm{T}=0.0$ at some timestep during the simulation which is not allowed in the Nose/Hoover formulation.  

The scaleyz yes, scalexz yes, and scalexy yes options can only be used if the second dimension in the keyword is periodic, and if the tilt factor is not coupled to the barostat via keywords tri, yz, xz, and $x y$ .  

# 2.236.6 Related commands  

fix drude, fix nvt, fix_npt, fix_modify  

# 2.236.7 Default  

The keyword defaults are tchain $=3$ , pchain $=3$ , mtk $=$ yes, $\mathrm{tloop}=1$ , $\mathrm{ploop}=1$ , nreset $=0$ , couple $=$ none, flip $=$ yes, scaleyz $=$ scalexz $=$ scalexy $=$ yes if periodic in second dimension and not coupled to barostat, otherwise no.  

(Son) Son, McDaniel, Cui and Yethiraj, J Phys Chem Lett, 10, 7523 (2019).  

# 2.237 fix thermal/conductivity command  

# 2.237.1 Syntax  

D group-ID thermal/conductivity N edim Nbin keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • thermal/conductivity $=$ style name of this fix command • $\Nu=$ perform kinetic energy exchange every N steps • edim $=x$ or $y$ or $z=$ direction of kinetic energy transfer • ${\mathrm{Nbin}}=\#$ of layers in edim direction (must be even number) • zero or more keyword/value pairs may be appended • keyword $=$ swap swap value $=$ Nswap $=$ number of swaps to perform every N steps  

# 2.237.2 Examples  

<html><body><table><tr><td>fix 1 all thermal/conductivity 100 z 20</td></tr><tr><td>fix 1 all thermal/conductivity 50 z 20 swap 2</td></tr></table></body></html>  

# 2.237.3 Description  

Use the Muller-Plathe algorithm described in this paper to exchange kinetic energy between two particles in different regions of the simulation box every N steps. This induces a temperature gradient in the system. As described below this enables the thermal conductivity of a material to be calculated. This algorithm is sometimes called a reverse non-equilibrium MD (reverse NEMD) approach to computing thermal conductivity. This is because the usual NEMD approach is to impose a temperature gradient on the system and measure the response as the resulting heat flux. In the Muller-Plathe method, the heat flux is imposed, and the temperature gradient is the system’s response.  

See the compute heat/flux command for details on how to compute thermal conductivity in an alternate way, via the Green-Kubo formalism.  

# 2.237. fix thermal/conductivity command  

The simulation box is divided into Nbin layers in the edim direction, where the layer 1 is at the low end of that dimension and the layer Nbin is at the high end. Every N steps, Nswap pairs of atoms are chosen in the following manner. Only atoms in the fix group are considered. The hottest Nswap atoms in layer 1 are selected. Similarly, the coldest Nswap atoms in the “middle” layer (see below) are selected. The two sets of Nswap atoms are paired up and their velocities are exchanged. This effectively swaps their kinetic energies, assuming their masses are the same. If the masses are different, an exchange of velocities relative to center of mass motion of the two atoms is performed, to conserve kinetic energy. Over time, this induces a temperature gradient in the system which can be measured using commands such as the following, which writes the temperature profile (assuming ${\bf Z}=$ edim) to the file tmp.profile:  

compute ke all ke/atom   
variable temp atom c_ke/1.5   
compute layers all chunk/atom bin/1d z lower 0.05 units reduced fix 3 all ave/chunk 10 100 1000 layers v_temp file tmp.profile  

Note that by default, $\mathrm{Nswap}=1$ , though this can be changed by the optional swap keyword. Setting this parameter appropriately, in conjunction with the swap rate N, allows the heat flux to be adjusted across a wide range of values, and the kinetic energy to be exchanged in large chunks or more smoothly.  

The “middle” layer for velocity swapping is defined as the $N b i n/2+1$ layer. Thus if $N b i n=20$ , the two swapping layers are 1 and 11. This should lead to a symmetric temperature profile since the two layers are separated by the same distance in both directions in a periodic sense. This is why Nbin is restricted to being an even number.  

As described below, the total kinetic energy transferred by these swaps is computed by the fix and can be output. Dividing this quantity by time and the cross-sectional area of the simulation box yields a heat flux. The ratio of heat flux to the slope of the temperature profile is proportional to the thermal conductivity of the fluid, in appropriate units. See the Muller-Plathe paper for details.  

![](images/b95a273ae58341ac77b2e7e1dbb29046790009645a6cb9a921e8385a7fcda2b3.jpg)  

# Note  

If your system is periodic in the direction of the heat flux, then the flux is going in 2 directions. This means the effective heat flux in one direction is reduced by a factor of 2. You will see this in the equations for thermal conductivity (kappa) in the Muller-Plathe paper. LAMMPS is simply tallying kinetic energy which does not account for whether or not your system is periodic; you must use the value appropriately to yield a kappa for your system.  

![](images/2cc94d25477b999bb72f0869526fb283ea6c9f8b69dd3f1fd13527918a2a85af.jpg)  

# Note  

After equilibration, if the temperature gradient you observe is not linear, then you are likely swapping energy too frequently and are not in a regime of linear response. In this case you cannot accurately infer a thermal conductivity and should try increasing the Nevery parameter.  

# 2.237.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix computes a global scalar which can be accessed by various output commands. The scalar is the cumulative kinetic energy transferred between the bottom and middle of the simulation box (in the edim direction) is stored as a scalar quantity by this fix. This quantity is zeroed when the fix is defined and accumulates thereafter, once every N steps. The units of the quantity are energy; see the units command for details. The scalar value calculated by this fix is “intensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.237.5 Restrictions  

Swaps conserve both momentum and kinetic energy, even if the masses of the swapped atoms are not equal. Thus you should not need to thermostat the system. If you do use a thermostat, you may want to apply it only to the non-swapped dimensions (other than vdim).  

LAMMPS does not check, but you should not use this fix to swap the kinetic energy of atoms that are in constrained molecules, e.g. via fix shake or fix rigid. This is because application of the constraints will alter the amount of transferred momentum. You should, however, be able to use flexible molecules. See the Zhang paper for a discussion and results of this idea.  

When running a simulation with large, massive particles or molecules in a background solvent, you may want to only exchange kinetic energy between solvent particles.  

# 2.237.6 Related commands  

fix ehex, fix heat, fix ave/chunk, fix viscosity, compute heat/flux  

# 2.237.7 Default  

The option defaults are swap $=1$ .  

(Muller-Plathe) Muller-Plathe, J Chem Phys, 106, 6082 (1997).   
(Zhang) Zhang, Lussetti, de Souza, Muller-Plathe, J Phys Chem B, 109, 15060-15067 (2005).  

# 2.238 fix ti/spring command  

# 2.238.1 Syntax  

fix ID group-ID ti/spring k t_s t_eq keyword value ...  

• ID, group-ID are documented in fix command   
• ti/spring $=$ style name of this fix command   
• $\mathbf{k}=$ spring constant (force/distance units)   
• $\mathbf{\mathop{t}\underbrace{e q}}=$ number of steps for the equilibration procedure   
• $\mathbf{\underline{{t}}}\mathbf{\Delta}\mathbf{S}=$ number of steps for the switching procedure   
• zero or more keyword/value pairs may be appended to args   
• keyword $=$ function function value $=$ function-ID function- $\mathrm{{\cdot}I D}=\mathrm{{ID}}$ of the switching function (1 or 2)  

# 2.238.2 Example  

fix 1 all ti/spring 50.0 2000 1000 function 2  

# 2.238.3 Description  

This fix allows you to compute the free energy of crystalline solids by performing a nonequilibrium thermodynamic integration between the solid of interest and an Einstein crystal. A detailed explanation of how to use this command and choose its parameters for optimal performance and accuracy is given in the paper by Freitas. The paper also presents a short summary of the theory of nonequilibrium thermodynamic integration.  

The thermodynamic integration procedure is performed by rescaling the force on each atom. Given an atomic configuration the force (F) on each atom is given by  

$$
F=\left(1-\lambda\right)F_{\mathrm{solid}}+\lambda F_{\mathrm{harm}}
$$  

where F_solid is the force that acts on an atom due to an interatomic potential (e.g. EAM potential), F_harm is the force due to the Einstein crystal harmonic spring, and lambda is the coupling parameter of the thermodynamic integration. An Einstein crystal is a solid where each atom is attached to its equilibrium position by a harmonic spring with spring constant $k$ . With this fix a spring force is applied independently to each atom in the group defined by the fix to tether it to its initial position. The initial position of each atom is its position at the time the fix command was issued.  

The fix acts as follows: during the first $t\_e q$ steps after the fix is defined the value of lambda is zero. This is the period to equilibrate the system in the lambda $=0$ state. After this the value of lambda changes dynamically during the simulation from 0 to 1 according to the function defined using the keyword function (described below), this switching from lambda from 0 to 1 is done in $t\_s$ steps. Then comes the second equilibration period of $t\_e q$ to equilibrate the system in the lambda $=1$ state. After that, the switching back to the lambda $=0$ state is made using $t\_s$ timesteps and following the same switching function. After this period the value of lambda is kept equal to zero and the fix has no other effect on the dynamics of the system.  

The processes described above is known as nonequilibrium thermodynamic integration and is has been shown (Freitas) to present a much superior efficiency when compared to standard equilibrium methods. The reason why the switching it is made in both directions (potential to Einstein crystal and back) is to eliminate the dissipated heat due to the nonequilibrium process. Further details about nonequilibrium thermodynamic integration and its implementation in LAMMPS is available in Freitas.  

The function keyword allows the use of two different lambda paths. Option $I$ results in a constant rate of change of lambda with time:  

$$
\lambda(\tau)=\tau
$$  

where $\tau$ is the scaled time variable $t/t\_s$ . The option 2 performs the lambda switching at a rate defined by the following switching function  

$$
\lambda(\tau)=\tau^{5}\left(70\tau^{4}-315\tau^{3}+540\tau^{2}-420\tau+126\right)
$$  

This function has zero slope as lambda approaches its extreme values (0 and 1), according to de Koning this results in smaller fluctuations on the integral to be computed on the thermodynamic integration. The use of option 2 is recommended since it results in better accuracy and less dissipation without any increase in computational resources cost.  

# Note  

As described in Freitas, it is important to keep the center-of-mass fixed during the thermodynamic integration. A nonzero total velocity will result in divergences during the integration due to the fact that the atoms are ‘attached’ to their equilibrium positions by the Einstein crystal. Check the option zero of fix langevin and velocity. The use of the Nose-Hoover thermostat $(\it{\hbar}x n\nu t)$ is NOT recommended due to its well documented issues with the canonical sampling of harmonic degrees of freedom (notice that the chain option will NOT solve this problem). The Langevin thermostat (fix langevin) correctly thermostats the system and we advise its usage with ti/spring command.  

# 2.238.4 Restart, fix_modify, output, run start/stop, minimize info  

This fix writes the original coordinates of tethered atoms to binary restart files, so that the spring effect will be the same in a restarted simulation. See the read restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion.  

The fix_modify energy option is supported by this fix to add the energy stored in the per-atom springs to the global potential energy of the system as part of thermodynamic output. The default setting for this fix is fix_modify energy no.  

This fix computes a global scalar and a global vector quantities which can be accessed by various output commands. The scalar is an energy which is the sum of the spring energy for each atom, where the per-atom energy is $0.5\cdot k\cdot r^{2}$ . The vector stores 2 values. The first value is the coupling parameter lambda. The second value is the derivative of lambda with respect to the integer timestep $s$ , i.e. $\frac{d\lambda}{d s}$ . In order to obtain $\textstyle{\frac{d\lambda}{d t}}$ , where t is simulation time, this 2nd value needs to be divided by the timestep size (e.g. 0.5 fs). The scalar and vector values calculated by this fix are “extensive”.  

No parameter of this fix can be used with the start/stop keywords of the run command.  

The forces due to this fix are imposed during an energy minimization, invoked by the minimize command.  

![](images/440e794409787c4925a54f780dbb97cae743a8329882a70e509f91240eafba5a.jpg)  

# Note  

If you want the per-atom spring energy to be included in the total potential energy of the system (the quantity being minimized), you MUST enable the fix modify energy option for this fix.  

# 2.238.5 Related commands  

fix spring, fix adapt  

# 2.238.6 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 2.238.7 Default  

The keyword default is function $=1$ .  

(Freitas) Freitas, Asta, and de Koning, Computational Materials Science, 112, 333 (2016).   
(de Koning) de Koning and Antonelli, Phys Rev E, 53, 465 (1996).  

# 2.239 fix tmd command  

# 2.239.1 Syntax  

fix ID group-ID tmd rho_final file1 N file2 • ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • tmd $=$ style name of this fix command • rho_final $=$ desired value of rho at the end of the run (distance units) • file1 $=$ filename to read target structure from • $\Nu=$ dump TMD statistics every this many timesteps, $0=$ no dump  

# 2.239. fix tmd command  

• file2 $=$ filename to write TMD statistics to (only needed if $\Nu>0$ )  

# 2.239.2 Examples  

<html><body><table><tr><td>fix 1all nve</td></tr><tr><td>fix 2 tmdatoms tmd 1.0 target_file 100 tmd_ dump_file</td></tr></table></body></html>  

# 2.239.3 Description  

Perform targeted molecular dynamics (TMD) on a group of atoms. A holonomic constraint is used to force the atoms to move towards (or away from) the target configuration. The parameter “rho” is monotonically decreased (or increased) from its initial value to rho_final at the end of the run.  

Rho has distance units and is a measure of the root-mean-squared distance (RMSD) between the current configuration of the atoms in the group and the target coordinates listed in file1. Thus a value of rho_final $=0.0$ means move the atoms all the way to the final structure during the course of the run.  

The target file1 can be ASCII text or a gzipped text file (detected by a .gz suffix). The format of the target file1 is as follows:  

<html><body><table><tr><td colspan="4">0.0 25.0 xlo xhi 0.0 25.0 ylo yhi</td></tr><tr><td colspan="2">0.0 25.0 zlo zhi</td><td></td></tr><tr><td>125</td><td>24.97311 1.69005 23.4695600 -1</td><td></td></tr><tr><td>126</td><td>1.94691 2.79640</td><td>1.92799 9100</td></tr><tr><td>127 0.15906</td><td>3.46099</td><td>0.791211 0 0</td></tr><tr><td></td><td></td><td></td></tr></table></body></html>  

The first 3 lines may or may not be needed, depending on the format of the atoms to follow. If image flags are included with the atoms, the first $3~\mathrm{lo/hi}$ lines must appear in the file. If image flags are not included, the first 3 lines must not appear. The 3 lines contain the simulation box dimensions for the atom coordinates, in the same format as in a LAMMPS data file (see the read_data command).  

The remaining lines each contain an atom ID and its target x,y,z coordinates. The atom lines (all or none of them) can optionally be followed by 3 integer values: nx,ny,nz.For periodic dimensions, they specify which image of the box the atom is considered to be in, i.e. a value of N (positive or negative) means add N times the box length to the coordinate to get the true value. Those 3 integers either must be given for all atoms or none.  

The atom lines can be listed in any order, but every atom in the group must be listed in the file. Atoms not in the fix group may also be listed; they will be ignored.  

Comments starting with ‘#’ and empty lines may be included as well.  

TMD statistics are written to file2 every N timesteps, unless N is specified as 0, which means no statistics.  

The atoms in the fix tmd group should be integrated (via a fix nve, nvt, npt) along with other atoms in the system.  

Restarts can be used with a fix tmd command. For example, imagine a 10000 timestep run with a rho_initial $=11$ and a rho_final $=1$ . If a restart file was written after 2000 time steps, then the configuration in the file would have a rho value of 9. A new 8000 time step run could be performed with the same rho_final $=1$ to complete the conformational change at the same transition rate. Note that for restarted runs, the name of the TMD statistics file should be changed to prevent it being overwritten.  

For more information about TMD, see (Schlitter1) and (Schlitter2).  

# 2.239.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.   
No global or per-atom quantities are stored by this fix for access by various output commands.  

This fix can ramp its rho parameter over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

This fix is not invoked during energy minimization.  

# 2.239.5 Restrictions  

This fix is part of the EXTRA-FIX package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

All TMD fixes must be listed in the input script after all integrator fixes (nve, nvt, npt) are applied. This ensures that atoms are moved before their positions are corrected to comply with the constraint.  

Atoms that have a TMD fix applied should not be part of a group to which a SHAKE fix is applied. This is because LAMMPS assumes there are not multiple competing holonomic constraints applied to the same atoms.  

To read gzipped target files, you must compile LAMMPS with the -DLAMMPS_GZIP option. See the Build settings doc page for details.  

# 2.239.6 Related commands  

none  

# 2.239.7 Default  

none  

(Schlitter1) Schlitter, Swegat, Mulders, “Distance-type reaction coordinates for modelling activated processes”, J Molecular Modeling, 7, 171-177 (2001).  

(Schlitter2) Schlitter and Klahn, “The free energy of a reaction coordinate at multiple constraints: a concise formulation”, Molecular Physics, 101, 3439-3443 (2003).  

# 2.240 fix ttm command  

2.241 fix ttm/grid command  

# 2.242 fix ttm/mod command  

# 2.242.1 Syntax  

fix ID group-ID ttm seed C_e rho_e kappa_e gamma_p gamma_s v_0 Nx Ny Nz keyword value ...   
fix ID group-ID ttm/mod seed init_file Nx Ny Nz keyword value ...  

• ID, group-ID are documented in fix command • style $=$ ttm or ttm/grid or ttm/mod • seed $=$ random number seed to use for white noise (positive integer) remaining arguments for fix ttm or fix ttm/grid  

C_e = electronic specific heat (energy/(electron\*temperature) units)   
rho_e = electronic density (electrons/volume units)   
kappa_e = electronic thermal conductivity (energy/(time\*distance\*temperature) units)   
gamma_p $=$ friction coefficient due to electron-ion interactions (mass/time units)   
gamma_ $\mathrm{~s~}=$ friction coefficient due to electronic stopping (mass/time units)   
$\mathrm{~v~\_~0~=~}$ electronic stopping critical velocity (velocity units)   
$\mathrm{Nx}=$ number of thermal solve grid points in the x-direction (positive integer)   
$\mathrm{Ny}=$ number of thermal solve grid points in the y-direction (positive integer)   
$\mathrm{Nz}={}$ number of thermal solve grid points in the z-direction (positive integer)  

• remaining arguments for fix ttm/mod:  

init_file $=$ file with the parameters to TTM $\mathrm{Nx}=$ number of thermal solve grid points in the x-direction (positive integer) $\mathrm{Ny}=$ number of thermal solve grid points in the y-direction (positive integer) $\mathrm{Nz}={}$ number of thermal solve grid points in the $\mathrm{_{Z}}$ -direction (positive integer)  

• zero or more keyword/value(s) pairs may be appended • keyword $=$ set or infile or outfile set value $=$ Tinit  

Tinit $=$ initial electronic temperature at all grid points (temperature unit   
infile value $=$ file.in with grid values for electronic temperatures   
outfile values $=$ Nout file.out Nout $=$ dump grid temperatures every this many timesteps file.out $=$ filename to write grid temperatures to  

# 2.242.2 Examples  

fix 2 all ttm 699489 1.0 1.0 10 0.1 0.0 2.0 1 12 1 infile initial outfile 1000 T.outfix 3 all ttm/grid 123456 1.0 1.0 1.0 1.0 1.0 5.0 5 5 5 infile Te.infix 4 all ttm/mod 34277 parameters.txt 5 5 5 infile T_init outfile 10 T_out  

Example input scripts using these commands can be found in examples/ttm.  

# 2.242.3 Description  

Use a two-temperature model (TTM) to represent heat transfer through and between electronic and atomic subsystems. LAMMPS models the atomic subsystem as usual with a molecular dynamics model and the classical force field specified by the user. The electronic subsystem is modeled as a continuum, or a background “gas”, on a regular grid which overlays the simulation domain. Energy can be transferred spatially within the grid representing the electrons. Energy can also be transferred between the electronic and atomic subsystems. The algorithm underlying this fix was derived by D. M. Duffy and A. M. Rutherford and is discussed in two J Physics: Condensed Matter papers: (Duffy) and (Rutherford). They used this algorithm in cascade simulations where a primary knock-on atom (PKA) was initialized with a high velocity to simulate a radiation event.  

The description in this subsection applies to all 3 fix styles: ttm, ttm/grid, and ttm/mod.  

Fix ttm/grid distributes the regular grid across processors consistent with the subdomains of atoms owned by each processor, but is otherwise identical to fix ttm. Note that fix ttm stores a copy of the grid on each processor, which is acceptable when the overall grid is reasonably small. For larger grids you should use fix ttm/grid instead.  

Fix ttm/mod adds options to account for external heat sources (e.g. at a surface) and for specifying parameters that allow the electronic heat capacity to depend strongly on electronic temperature. It is more expensive computationally than fix ttm because it treats the thermal diffusion equation as non-linear. More details on fix ttm/mod are given below.  

Heat transfer between the electronic and atomic subsystems is carried out via an inhomogeneous Langevin thermostat.   
Only atoms in the fix group contribute to and are affected by this heat transfer.  

This thermostatting differs from the regular Langevin thermostat (fix langevin) in three important ways. First, the Langevin thermostat is applied uniformly to all atoms in the user-specified group for a single target temperature, whereas the TTM fixes apply Langevin thermostatting locally to atoms within the volumes represented by the user-specified grid points with a target temperature specific to that grid point. Second, the Langevin thermostat couples the temperature of the atoms to an infinite heat reservoir, whereas the heat reservoir for the TTM fixes is finite and represents the local electrons. Third, the TTM fixes allow users to specify not just one friction coefficient, but rather two independent friction coefficients: one for the electron-ion interactions (gamma $p$ ), and one for electron stopping (gamma_s).  

When the friction coefficient due to electron stopping, gamma_s, is non-zero, electron stopping effects are included for atoms moving faster than the electron stopping critical velocity, $\nu_{-}\mathcal{O}$ . For further details about this algorithm, see (Duffy) and (Rutherford).  

Energy transport within the electronic subsystem is solved according to the heat diffusion equation with added source terms for heat transfer between the subsystems:  

$$
C_{e}\rho_{e}\frac{\partial T_{e}}{\partial t}=\nabla(\kappa_{e}\:\bigtriangledown\:T_{e})-g_{p}(T_{e}-T_{a})+g_{s}T_{a}^{\prime}
$$  

where $C_{e}$ is the specific heat, $\rho_{e}$ is the density, $\kappa_{e}$ is the thermal conductivity, $T$ is temperature, the “e” and “a” subscripts represent electronic and atomic subsystems respectively, $g_{p}$ is the coupling constant for the electron-ion interaction, and $g_{s}$ is the electron stopping coupling parameter. $C_{e},\rho_{e}$ , and $\kappa_{e}$ are specified as parameters to the fix ttm or ttm/grid. The other quantities are derived. The form of the heat diffusion equation used here is almost the same as that in equation 6 of (Duffy), with the exception that the electronic density is explicitly represented, rather than being part of the specific heat parameter.  

Currently, the TTM fixes assume that none of the user-supplied parameters will vary with temperature. Note that (Duffy) used a tanh() functional form for the temperature dependence of the electronic specific heat, but ignored temperature dependencies of any of the other parameters. See more discussion below for fix ttm/mod.  

![](images/be53c19e582cd4e9709da310eddf03f8e8100a04cf8b343ee8bc9c9d4603d748.jpg)  

# Note  

These fixes do not perform time integration of the atoms in the fix group, they only rescale their velocities. Thus a time integration fix such as fix nve should be used in conjunction with these fixes. These fixes should not normally be used on atoms that have their temperature controlled by another thermostatting fix, e.g. $f(x n\nu t$ or fix langevin.  

![](images/f30d15bc60d5fcdbbec4d550a5d39120b32af372b80efe7d6f62c3c9b02ecdab.jpg)  

# Note  

These fixes require use of an orthogonal 3d simulation box with periodic boundary conditions in all dimensions. They also require that the size and shape of the simulation box do not vary dynamically, e.g. due to use of the fix npt command. Likewise, the size/shape of processor subdomains cannot vary due to dynamic load-balancing via use of the fix balance command. It is possible however to load balance before the simulation starts using the balance command, so that each processor has a different size subdomain.  

Periodic boundary conditions are also used in the heat equation solve for the electronic subsystem. This varies from the approach of (Rutherford) where the atomic subsystem was embedded within a larger continuum representation of the electronic subsystem.  

The set keyword specifies a Tinit temperature value to initialize the value stored on all grid points. By default the temperatures are all zero when the grid is created.  

The infile keyword specifies an input file of electronic temperatures for each grid point to be read in to initialize the grid, as an alternative to using the set keyword.  

The input file is a text file which may have comments starting with the ‘#’ character. Each line contains four numeric columns: ix,iy,iz,Temperature. Empty or comment-only lines will be ignored. The number of lines must be equal to the number of user-specified grid points (Nx by Ny by Nz). The ix,iy,iz are grid point indices ranging from 1 to Nxyz inclusive in each dimension. The lines can appear in any order. For example, the initial electronic temperatures on a 1 by 2 by 3 grid could be specified in the file as follows:  

<html><body><table><tr><td># UNITS: metal COMMENT: initial electron temperature</td></tr><tr><td>1 1 1 1.0</td></tr><tr><td>11 2 1.0</td></tr><tr><td>113 1.0</td></tr><tr><td>1212.0</td></tr><tr><td>1222.0</td></tr><tr><td>1232.0</td></tr></table></body></html>  

where the electronic temperatures along the $\scriptstyle\mathrm{y=0}$ plane have been set to 1.0, and the electronic temperatures along the $_{\mathrm{y=1}}$ plane have been set to 2.0. If all the grid point values are not specified, LAMMPS will generate an error. LAMMPS will check if a “UNITS:” tag is in the first line and stop with an error, if there is a mismatch with the current units used.  

![](images/7f622307f081667bdef990efd23c9cc88651d2694be3cb04ab85111a72a01044.jpg)  

# Note  

The electronic temperature at each grid point must be a non-zero positive value, both initially, and as the temperature evolves over time. Thus you must use either the set or infile keyword or be restarting a simulation that used this fix previously.  

The outfile keyword has 2 values. The first value Nout triggers output of the electronic temperatures for each grid point every Nout timesteps. The second value is the filename for output, which will be suffixed by the timestep. The format of each output file is exactly the same as the input temperature file. It will contain a comment in the first line reporting the date the file was created, the LAMMPS units setting in use, grid size and the current timestep.  

![](images/eec79396ac33479fd1583b2e4e9d72481d7c4ea19aa0f80aa69f1e4f6abf999f.jpg)  

# Note  

The fix ttm/grid command does not support the outfile keyword. Instead you can use the dump grid command to output the electronic temperature on the distributed grid to a dump file or the restart command which creates a file specific to this fix which the read restart command reads. The file has the same format as the file the infile option reads.  

For the fix ttm and fix ttm/mod commands, the corresponding atomic temperature for atoms in each grid cell can be computed and output by the fix ave/chunk command using the compute chunk/atom command to create a 3d array of chunks consistent with the grid used by this fix.  

For the fix ttm/grid command the same thing can be done using the fix ave/grid command and its per-grid values can be output via the dump grid command.  

# Additional details for fix ttm/mod  

Fix ttm/mod uses the heat diffusion equation with possible external heat sources (e.g. laser heating in ablation simulations):  

$$
C_{e}\rho_{e}\frac{\partial T_{e}}{\partial t}=\nabla(\kappa_{e}\bigtriangledown T_{e})-g_{p}(T_{e}-T_{a})+g_{s}T_{a}^{\prime}+\theta(x-x_{s u r f a c e})I_{0}\exp(-x/l_{s k i n})
$$  

where $\theta$ is the Heaviside step function, $I_{0}$ is the (absorbed) laser pulse intensity for ablation simulations, $l_{s k i n}$ is the depth of the skin-layer, and all other designations have the same meaning as in the former equation. The duration of the pulse is set by the parameter tau in the init_file.  

Fix ttm/mod also allows users to specify the dependencies of $C_{e}$ and $\kappa_{e}$ on the electronic temperature. The specific heat is expressed as  

$$
C_{e}=C_{0}+(a_{0}+a_{1}X+a_{2}X^{2}+a_{3}X^{3}+a_{4}X^{4})\exp(-(A X)^{2})
$$  

where X = 10Te00 , and the thermal conductivity is defined as ${\kappa_{e}}=D_{e}\cdot r h o_{e}\cdot C_{e}$ , where $D_{e}$ is the thermal diffusion coefficient.  

Electronic pressure effects are included in the TTM model to account for the blast force acting on ions because of electronic pressure gradient (see (Chen), (Norman)). The total force acting on an ion is:  

$$
\vec{F}_{i}=-\partial U/\partial\vec{r}_{i}+\vec{F}_{l a n g e\nu i n}-\nabla P_{e}/n_{i o n}
$$  

where $F_{l a n g e\nu i n}$ is a force from Langevin thermostat simulating electron-phonon coupling, and $\nabla P_{e}/n_{i o n}$ is the electron blast force.  

The electronic pressure is taken to be $P_{e}=B\cdot r h o_{e}\cdot C_{e}\cdot T_{e}$  

The current fix ttm/mod implementation allows TTM simulations with a vacuum. The vacuum region is defined as the grid cells with zero electronic temperature. The numerical scheme does not allow energy exchange with such cells. Since the material can expand to previously unoccupied region in some simulations, the vacuum border can be allowed to move. It is controlled by the surface_movement parameter in the init_file. If it is set to 1, then “vacuum” cells can be changed to “electron-filled” cells with the temperature $T\_e.$ _min if atoms move into them (currently only implemented for the case of 1-dimensional motion of a flat surface normal to the $\boldsymbol{\mathrm X}$ axis). The initial locations of the interfaces of the electron density to the vacuum can be set in the init_file via lsurface and rsurface parameters. In this case, electronic pressure gradient is calculated as  

$$
\nabla_{x}P_{e}=\left[{\frac{C_{e}T_{e}(x)\lambda}{(x+\lambda)^{2}}}+{\frac{x}{x+\lambda}}{\frac{(C_{e}T_{e})_{x+\Delta x}-(C_{e}T_{e})_{x}}{\Delta x}}\right]
$$  

where $\lambda$ is the electron mean free path (see (Norman), (Pisarev))  

The fix ttm/mod parameter file init_file has the following syntax. Every line with an odd number is considered as a comment and ignored. The lines with the even numbers are treated as follows:  

a_0, energy/(temperature\*electron) units   
a_1, energy/(temperature $^{\frown_{2}*}$ electron) units   
a_2, energy/(temperature $\Hat{\mathbf{\Omega}}\times\mathbf{{3}}^{*}$ electron) units   
a_3, energy/(temperature $\hat{\mathbf{\Omega}}^{*}$ electron) units   
a_4, energy/(temperature $\widehat{\mathbf{\xi}}5^{*}$ electron) units   
C_0, energy/(temperature\*electron) units   
A, 1/temperature units   
rho_e, electrons/volume units   
D_e, length^2/time units   
gamma_p, mass/time units   
gamma_s, mass/time units   
v_0, length/time units   
I_0, energy/(time\*length $\widehat{\mathbf{\xi}}^{\star}2$ ) units   
lsurface, electron grid units (positive integer)   
rsurface, electron grid units (positive integer)   
l_skin, length units   
tau, time units   
B, dimensionless   
lambda, length units   
n_ion, ions/volume units   
surface_movement: 0 to disable tracking of surface motion, 1 to enable   
T_e_min, temperature units  

# 2.242.4 Restart, fix_modify, output, run start/stop, minimize info  

The fix ttm and fix ttm/mod commands write the state of the electronic subsystem and the energy exchange between the subsystems to binary restart files. The fix ttm/grid command does not yet support writing of its distributed grid to a restart file.  

See the read_restart command for info on how to re-specify a fix in an input script that reads a restart file, so that the operation of the fix continues in an uninterrupted fashion. Note that the restart script must define the same size grid as the original script.  

The fix ttm/grid command also outputs an auxiliary file each time a restart file is written, with the electron temperatures for each grid cell. The format of this file is the same as that read by the infile option explained above. The filename is the same as the restart filename with “.ttm” appended. This auxiliary file can be read in for a restarted run by using the infile option for the fix ttm/grid command, following the read_restart command.  

None of the fix_modify options are relevant to these fixes.  

These fixes compute 2 output quantities stored in a vector of length 2, which can be accessed by various output commands. The first quantity is the total energy of the electronic subsystem. The second quantity is the energy transferred from the electronic to the atomic subsystem on that timestep. Note that the velocity verlet integrator applies the fix ttm forces to the atomic subsystem as two half-step velocity updates: one on the current timestep and one on the subsequent timestep. Consequently, the change in the atomic subsystem energy is lagged by half a timestep relative to the change in the electronic subsystem energy. As a result of this, users may notice slight fluctuations in the sum of the atomic and electronic subsystem energies reported at the end of the timestep.  

The vector values calculated are “extensive”.  

The fix ttm/grid command also outputs a per-grid vector which stores the electron temperature for each grid cell in temperature units. which can be accessed by various output commands. The length of the vector (distributed across all processors) is $\mathrm{Nx}\stackrel{*}{\cdots}\mathrm{Ny}\stackrel{*}{\cdots}\mathrm{Nz}$ . For access by other commands, the name of the single grid produced by fix ttm/grid is “grid”. The name of its per-grid data is “data”.  

No parameter of the fixes can be used with the start/stop keywords of the run command. The fixes are not invoked during energy minimization.  

# 2.242.5 Restrictions  

All these fixes are part of the EXTRA-FIX package. They are only enabled if LAMMPS was built with that package See the Build package page for more info.  

As mentioned above, these fixes require 3d simulations and orthogonal simulation boxes periodic in all 3 dimensions.  

These fixes used a random number generator to Langevin thermostat the electron temperature. This means you will not get identical answers when running on different numbers of processors or when restarting a simulation (even on the same number of processors). However, in a statistical sense, simulations on different processor counts and restarted simulation should produce results which are statistically the same.  

# 2.242.6 Related commands  

fix langevin, fix dt/reset  

# 2.242.7 Default  

none  

(Duffy) D M Duffy and A M Rutherford, J. Phys.: Condens. Matter, 19, 016207-016218 (2007).   
(Rutherford) A M Rutherford and D M Duffy, J. Phys.: Condens. Matter, 19, 496201-496210 (2007). (Chen) J Chen, D Tzou and J Beraun, Int. J. Heat Mass Transfer, 49, 307-316 (2006).   
(Norman) G E Norman, S V Starikov, V V Stegailov et al., Contrib. Plasma Phys., 53, 129-139 (2013).   
(Pisarev) V V Pisarev and S V Starikov, J. Phys.: Condens. Matter, 26, 475401 (2014).  

# 2.243 fix tune/kspace command  

# 2.243.1 Syntax  

fix ID group-ID tune/kspace N  

• ID, group-ID are documented in fix command • tune/kspace $=$ style name of this fix command • $\Nu=$ invoke this fix every N steps  

# 2.243.2 Examples  

# 2.243.3 Description  

This fix tests each kspace style (Ewald, PPPM, and MSM), and automatically selects the fastest style to use for the remainder of the run. If the fastest style is Ewald or PPPM, the fix also adjusts the Coulombic cutoff towards optimal speed. Future versions of this fix will automatically select other kspace parameters to use for maximum simulation speed. The kspace parameters may include the style, cutoff, grid points in each direction, order, Ewald parameter, MSM parallelization cut-point, MPI tasks to use, etc.  

The rationale for this fix is to provide the user with as-fast-as-possible simulations that include long-range electrostatics (kspace) while meeting the user-prescribed accuracy requirement. A simple heuristic could never capture the optimal combination of parameters for every possible run-time scenario. But by performing short tests of various kspace parameter sets, this fix allows parameters to be tailored specifically to the user’s machine, MPI ranks, use of threading or accelerators, the simulated system, and the simulation details. In addition, it is possible that parameters could be evolved with the simulation on-the-fly, which is useful for systems that are dynamically evolving (e.g. changes in box size/shape or number of particles).  

When this fix is invoked, LAMMPS will perform short timed tests of various parameter sets to determine the optimal parameters. Tests are performed on-the-fly, with a new test initialized every N steps. N should be chosen large enough so that adequate CPU time lapses between tests, thereby providing statistically significant timings. But N should not be chosen to be so large that an unfortunate parameter set test takes an inordinate amount of wall time to complete. An N of 100 for most problems seems reasonable. Once an optimal parameter set is found, that set is used for the remainder of the run.  

This fix uses heuristics to guide it’s selection of parameter sets to test, but the actual timed results will be used to decide which set to use in the simulation.  

It is not necessary to discard trajectories produced using sub-optimal parameter sets, or a mix of various parameter sets, since the user-prescribed accuracy will have been maintained throughout. However, some users may prefer to use this fix only to discover the optimal parameter set for a given setup that can then be used on subsequent production runs.  

This fix starts with kspace parameters that are set by the user with the kspace_style and kspace_modify commands. The prescribed accuracy will be maintained by this fix throughout the simulation.  

None of the fix_modify options are relevant to this fix.  

No parameter of this fix can be used with the start/stop keywords of the run command. This fix is not invoked during energy minimization.  

# 2.243.4 Restrictions  

This fix is part of the KSPACE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Do not set “neigh_modify once yes” or else this fix will never be called. Reneighboring is required.  

This fix is not compatible with a hybrid pair style, long-range dispersion, TIP4P water support, or long-range point dipole support.  

# 2.243.5 Related commands  

kspace_style, boundary kspace_modify, pair_style lj/cut/coul/long, pair_style lj/charmm/coul/long, pair_style lj/long, pair_style lj/long/coul/long, pair_style buck/coul/long  

# 2.243.6 Default  

# 2.244 fix vector command  

# 2.244.1 Syntax  

fix ID group-ID vector Nevery value1 value2 ... keyword args ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • vector $=$ style name of this fix command • Nevery $=$ use input values every this many timesteps • one or more input values can be listed • value $=\mathsf{c\_I D}$ , c_ID[N], f_ID, f_ID[N], v_name  

$\widetilde{\textrm{c}\_{\mathrm{ID}}=\mathrm{global}}$ scalar calculated by a compute with ID   
$\mathrm{c\_ID[I]=Ith}$ component of global vector calculated by a compute with ID   
$\mathrm{f\_ID=global}$ scalar calculated by a fix with ID   
$\mathrm{f\_ID[I]=Ith}$ component of global vector calculated by a fix with ID   
v_name = value calculated by an equal-style variable with name   
$\mathrm{v\_name[I]}=\mathrm{Ith}$ component of vector-style variable with name  

• zero or more keyword/args pairs may be appended • keyword $=$ nmax nmax length $=$ set maximal length of vector to <length>  

# 2.244.2 Examples  

fix 1 all vector 100 c_myTemp fix 1 all vector 5 c_myTemp v_integral fix 1 all vector 50 c_myTemp nmax 200  

# 2.244.3 Description  

Use one or more global values as inputs every few timesteps, and simply store them as a sequence. For a single specified value, the values are stored as a global vector of growing length. For multiple specified values, they are stored as rows in a global array, whose number of rows is growing. The resulting vector or array can be used by other output commands.  

The optional nmax keyword can be used to restrict the length of the vector to the given length value. Once the restricted vector is filled, the oldest entry will be discarded when a entry is added.  

One way to to use this command is to accumulate a vector that is numerically integrated using the variable trap() function. For example, the velocity auto-correlation function (VACF) can be integrated, to yield a diffusion coefficient, as follows:  

<html><body><table><tr><td>compute</td><td>2 all vacf</td></tr><tr><td>fix</td><td>5 all vector 1 c_2[4]</td></tr><tr><td>variable</td><td>diff equal dt*trap(f_5)</td></tr><tr><td>thermo_ style</td><td>custom step v_diff</td></tr></table></body></html>  

The group specified with this command is ignored. However, note that specified values may represent calculations performed by computes and fixes which store their own “group” definitions.  

Each listed value can be the result of a compute or $f\boldsymbol{{x}}$ or the evaluation of an equal-style or vector-style variable. In each case, the compute, fix, or variable must produce a global quantity, not a per-atom or local quantity. And the global quantity must be a scalar, not a vector or array.  

Computes that produce global quantities are those which do not have the word atom in their style name. Only a few fixes produce global quantities. See the doc pages for individual fixes for info on which ones produce such values. Variables of style equal or vector are the only ones that can be used with this fix. Variables of style atom cannot be used, since they produce per-atom values.  

The Nevery argument specifies on what timesteps the input values will be used in order to be stored. Only timesteps that are a multiple of Nevery, including timestep 0, will contribute values.  

![](images/9d443bff8fa84ef5b36505135f27b5ede10da4e4ff18452267dc717a15c492be.jpg)  

# Note  

If Nevery is a small number and the simulation runs for many steps, the accumulated vector or array can become very large and thus consume a lot of memory. The implementation limit is about 2 billion entries. Using the nmax keyword mentioned above can avoid that by limiting the size of the vector.  

Note that if you perform multiple runs, using the “pre no” option of the run command to avoid initialization on subsequent runs, then you need to use the stop keyword with the first run command with a timestep value that encompasses all the runs. This is so that the vector or array stored by this fix can be allocated to a sufficient size.  

If a value begins with $\mathrm{~\"~}\mathrm{~c~\"~}$ , a compute ID must follow which has been previously defined in the input script. If no bracketed term is appended, the global scalar calculated by the compute is used. If a bracketed term is appended, the Ith element of the global vector calculated by the compute is used.  

Note that there is a compute reduce command which can sum per-atom quantities into a global scalar or vector which can thus be accessed by fix vector. Or it can be a compute defined not in your input script, but by thermodynamic output or other fixes such as fix nvt or fix temp/rescale. See the doc pages for these commands which give the IDs of these computes. Users can also write code for their own compute styles and add them to LAMMPS.  

If a value begins with “f_”, a fix ID must follow which has been previously defined in the input script. If no bracketed term is appended, the global scalar calculated by the fix is used. If a bracketed term is appended, the Ith element of the global vector calculated by the fix is used.  

Note that some fixes only produce their values on certain timesteps, which must be compatible with Nevery, else an error will result. Users can also write code for their own fix styles and add them to LAMMPS.  

If a value begins with “v_”, a variable name must follow which has been previously defined in the input script. An equal-style or vector-style variable can be referenced; the latter requires a bracketed term to specify the Ith element of the vector calculated by the variable. See the variable command for details. Note that variables of style equal and vector define a formula which can reference individual atom properties or thermodynamic keywords, or they can invoke other computes, fixes, or variables when they are evaluated, so this is a very general means of specifying quantities to be stored by fix vector.  

# 2.244.4 Restart, fix_modify, output, run start/stop, minimize info  

No information about this fix is written to binary restart files. None of the fix_modify options are relevant to this fix.  

This fix produces a global vector or global array which can be accessed by various output commands. The values can only be accessed on timesteps that are multiples of Nevery.  

A vector is produced if only a single input value is specified. An array is produced if multiple input values are specified.   
The length of the vector or the number of rows in the array grows by 1 every Nevery timesteps.  

If the fix produces a vector, then the entire vector will be either “intensive” or “extensive”, depending on whether the values stored in the vector are “intensive” or “extensive”. If the fix produces an array, then all elements in the array must be the same, either “intensive” or “extensive”. If a compute or fix provides the value stored, then the compute or fix determines whether the value is intensive or extensive; see the page for that compute or fix for further info. Values produced by a variable are treated as intensive.  

This fix can allocate storage for stored values accumulated over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this. If using the run pre no command option, this is required to allow the fix to allocate sufficient storage for stored values.  

This fix is not invoked during energy minimization.  

# 2.244.5 Restrictions  

none  

# 2.244.6 Related commands  

compute, variable  

# 2.244.7 Defaults  

The default value of nmax is deduced from the number of steps in a run (or multiple runs when using the start and stop keywords of the run command) divided by the choice of Nevery plus 1.  

# 2.245 fix viscosity command  

# 2.245.1 Syntax  

fix ID group-ID viscosity N vdim pdim Nbin keyword value ...  

• ID, group-ID are documented in $f\boldsymbol{a}\boldsymbol{x}$ command • viscosity $=$ style name of this fix command • $\Nu=$ perform momentum exchange every N steps  

• vdim $=x$ or $y$ or $z=$ which momentum component to exchange   
• pdim $=x$ or $y$ or $z=$ direction of momentum transfer   
• Nbin $=\#$ of layers in pdim direction (must be even number)   
• zero or more keyword/value pairs may be appended   
• keyword $=$ swap or vtarget swap value = Nswap $=$ number of swaps to perform every N steps vtarget value $=\mathrm{V}$ or $\mathrm{INF=}$ target velocity of swap partners (velocity units)  

# 2.245.2 Examples  

fix 1 all viscosity 100 x z 20   
fix 1 all viscosity 50 x z 20 swap 2 vtarget 1.5  

# 2.245.3 Description  

Use the Muller-Plathe algorithm described in this paper to exchange momenta between two particles in different regions of the simulation box every N steps. This induces a shear velocity profile in the system. As described below this enables a viscosity of the fluid to be calculated. This algorithm is sometimes called a reverse non-equilibrium MD (reverse NEMD) approach to computing viscosity. This is because the usual NEMD approach is to impose a shear velocity profile on the system and measure the response via an off-diagonal component of the stress tensor, which is proportional to the momentum flux. In the Muller-Plathe method, the momentum flux is imposed, and the shear velocity profile is the system’s response.  

The simulation box is divided into Nbin layers in the pdim direction, where the layer 1 is at the low end of that dimension and the layer Nbin is at the high end. Every N steps, Nswap pairs of atoms are chosen in the following manner. Only atoms in the fix group are considered. Nswap atoms in layer 1 with positive velocity components in the vdim direction closest to the target value $V$ are selected. Similarly, Nswap atoms in the “middle” layer (see below) with negative velocity components in the vdim direction closest to the negative of the target value $V$ are selected. The two sets of Nswap atoms are paired up and their vdim momenta components are swapped within each pair. This resets their velocities, typically in opposite directions. Over time, this induces a shear velocity profile in the system which can be measured using commands such as the following, which writes the profile to the file tmp.profile:  

compute layers all chunk/atom bin/1d z lower 0.05 units reduced fix f1 all ave/chunk 100 10 1000 layers vx file tmp.profile  

Note that by default, $\mathrm{Nswap}=1$ and vtarget $\r=\mathrm{INF}$ , though this can be changed by the optional swap and vtarget keywords. When vtarget $=\mathrm{INF}$ , one or more atoms with the most positive and negative velocity components are selected. Setting these parameters appropriately, in conjunction with the swap rate N, allows the momentum flux rate to be adjusted across a wide range of values, and the momenta to be exchanged in large chunks or more smoothly.  

The “middle” layer for momenta swapping is defined as the $N b i n/2+1$ layer. Thus if $N b i n=20$ , the two swapping layers are 1 and 11. This should lead to a symmetric velocity profile since the two layers are separated by the same distance in both directions in a periodic sense. This is why Nbin is restricted to being an even number.  

As described below, the total momentum transferred by these velocity swaps is computed by the fix and can be output. Dividing this quantity by time and the cross-sectional area of the simulation box yields a momentum flux. The ratio of momentum flux to the slope of the shear velocity profile is proportional to the viscosity of the fluid, in appropriate units. See the Muller-Plathe paper for details.  