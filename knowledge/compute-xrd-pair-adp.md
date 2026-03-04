---
title: "Compute XRD and Pair Style ADP/AGNI"
description: "X-ray diffraction compute, ADP potential, AGNI machine learning potential"
category: "pair_style"
tags: ["XRD", "ADP", "EAM", "AGNI", "machine-learning", "water"]
commands: ["compute xrd", "pair_style adp", "pair_style agni", "pair_style aip/water/2dm"]
---
# 3.174.4 Output info  

This compute calculates a global array. The number of rows in the array is the number of reciprocal lattice nodes that are explored which by the mesh. The global array has two columns.  

The first column contains the diffraction angle in the units (radians or degrees) provided with the 2Theta values. The second column contains the computed diffraction intensities as described above.  

The array can be accessed by any command that uses global values from a compute as input. See the Howto output doc page for an overview of LAMMPS output options.  

All array values calculated by this compute are “intensive”.  

# 3.174.5 Restrictions  

This compute is part of the DIFFRACTION package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The compute_xrd command does not work for triclinic cells.  

# 3.174.6 Related commands  

fix ave/histo, compute saed  

# 3.174.7 Default  

The option defaults are 2Theta $=1$ 179 (degrees), $c=111,L P=1$ , no manual flag, no echo flag.  

# PAIR STYLES  

# 4.1 pair_style adp command  

Accelerator Variants: adp/kk, adp/omp  

# 4.1.1 Syntax  

# 4.1.2 Examples  

pair_style adp   
pair_coeff \* \* Ta.adp Ta   
pair_coeff \* \* ../potentials/AlCu.adp Al Al Cu  

# 4.1.3 Description  

Style adp computes pairwise interactions for metals and metal alloys using the angular dependent potential (ADP) of (Mishin), which is a generalization of the embedded atom method (EAM) potential. The LAMMPS implementation is discussed in (Singh). The total energy Ei of an atom I is given by  

$$
\begin{array}{l}{{\displaystyle E_{i}=F_{\alpha}\left(\sum_{j\neq i}\rho_{\beta}(r_{i j})\right)+\frac{1}{2}\sum_{j=\ell}\phi_{\alpha\beta}(r_{i j})+\frac{1}{2}\sum_{s}(\mu_{i}^{s})^{2}+\frac{1}{2}\sum_{s,t}(\lambda_{i}^{s\prime})^{2}-\frac{1}{6}v_{i}^{2}}}\ {{\displaystyle\mu_{i}^{s}=\sum_{j\neq i}u_{\alpha\beta}(r_{i j})r_{i j}^{s}}}\ {{\displaystyle\lambda_{i}^{s^{\prime}}=\sum_{j\neq i}w_{\alpha\beta}(r_{i j})r_{i j}^{s}r_{i j}^{t}}}\ {{\displaystyle\nu_{i}=\sum_{s}\lambda_{i}^{s s}}}\end{array}
$$  

where $F$ is the embedding energy which is a function of the atomic electron density $\rho,\phi$ is a pair potential interaction, $\alpha$ and $\beta$ are the element types of atoms $I$ and $J$ , and $s$ and $t=1,2,3$ and refer to the cartesian coordinates. The $\mu$ and $\lambda$ terms represent the dipole and quadruple distortions of the local atomic environment which extend the original EAM framework by introducing angular forces.  

Note that unlike for other potentials, cutoffs for ADP potentials are not set in the pair_style or pair_coeff command; they are specified in the ADP potential files themselves. Likewise, the ADP potential files list atomic masses; thus you do not need to use the mass command to specify them.  

# ADP potentials are available from:  

• The NIST WWW site at https://www.ctcms.nist.gov/potentials. Note that ADP potentials obtained from NIST must be converted into the extended DYNAMO setfl format discussed below.  

• The OpenKIM Project at https://openkim.org/browse/models/by-type provides ADP potentials that can be used directly in LAMMPS with the kim command interface.  

Only a single pair_coeff command is used with the adp style which specifies an extended DYNAMO setfl file, which contains information for $M$ elements. These are mapped to LAMMPS atom types by specifying $N$ additional arguments after the filename in the pair_coeff command, where $N$ is the number of LAMMPS atom types:  

• filename • $N$ element names $=$ mapping of extended setfl elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, the potentials/AlCu.adp file, included in the potentials directory of the LAMMPS distribution, is an extended setfl file which has tabulated ADP values for w elements and their alloy interactions: Cu and Al. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Al, and the fourth to be Cu, you would use the following pair_coeff command:  

The first 2 arguments must be $^{**}$ so as to span all LAMMPS atom types. The first three Al arguments map LAMMPS atom types 1,2,3 to the Al element in the extended setfl file. The final ${\mathrm{Cu}}$ argument maps LAMMPS atom type 4 to the Al element in the extended setfl file. Note that there is no requirement that your simulation use all the elements specified by the extended setfl file.  

If a mapping value is specified as NULL, the mapping is not performed. This can be used when an adp potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Adp files in the potentials directory of the LAMMPS distribution have an “.adp” suffix. A DYNAMO setfl file extended for ADP is formatted as follows. Basically it is the standard setfl format with additional tabulated functions u and w added to the file after the tabulated pair potentials. See the pair_eam command for further details on the setfl format.  

• lines $^{1,2,3=}$ comments (ignored) • line 4: Nelements Element1 Element2 . . . ElementN • line 5: $N_{\rho},d_{\rho},N_{r},d_{r}$ , cutoff  

Following the 5 header lines are $N_{\mathrm{elements}}$ sections, one for each element, each with the following format:  

• line $1=$ atomic number, mass, lattice constant, lattice type (e.g. FCC)   
• embedding function $F(\rho)$ $(N_{\rho}$ values)   
• density function $\rho(r)$ $\ensuremath{N_{r}}$ values)  

Following the $N_{\mathrm{elements}}$ sections, $N_{r}$ values for each pair potential $\phi(r)$ array are listed for all $i,j$ element pairs in th same format as other arrays. Since these interactions are symmetric $(i,j=j,i)$ only $\phi$ arrays with $i\geq j$ are listed, in the following order:  

$$
i,j=(1,1),(2,1),(2,2),(3,1),(3,2),(3,3),(4,1),...,(N_{\mathrm{elements}},N_{\mathrm{elements}}).
$$  

The tabulated values for each $\phi$ function are listed as $r*\phi$ (in units of eV-Angstroms), since they are for atom pairs, the same as for other EAM files.  

After the $\phi(r)$ arrays, each of the $u(r)$ arrays are listed in the same order with the same assumptions of symmetry.   
Directly following the $u(r)$ , the $w(r)$ arrays are listed. Note that $\phi(r)$ is the only array tabulated with a scaling by $r$ .  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.1.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{\textbf{I}}!=\mathrm{\textbf{J}}$ , where types I and J correspond to two different element types, no special mixing rules are needed, since the ADP potential files specify alloy interactions explicitly.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in tabulated potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner middle, outer keywords.  

# 4.1.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package.  

# 4.1.6 Related commands  

pair_coeff , pair_eam  

# 4.1.7 Default  

none  

(Mishin) Mishin, Mehl, and Papaconstantopoulos, Acta Mater, 53, 4029 (2005).  

(Singh) Singh and Warner, Acta Mater, 58, 5797-5805 (2010),  

# 4.2 pair_style agni command  

Accelerator Variants: agni/omp  

# 4.2.1 Syntax  

# 4.2.2 Examples  

<html><body><table><tr><td>pair style</td><td>agni</td></tr><tr><td>pair coeff</td><td>** Al.agni Al</td></tr></table></body></html>  

# 4.2.3 Description  

Style agni style computes the many-body vectorial force components for an atom as  

$$
\begin{array}{c}{{F_{i}^{u}=\displaystyle\sum_{t}^{N_{t}}\alpha_{t}\cdot\exp\left[-\frac{\left(d_{i,t}^{u}\right)^{2}}{2l^{2}}\right]}}\ {{d_{i,t}^{u}=||V_{i}^{u}(\boldsymbol{\eta})-V_{t}^{u}(\boldsymbol{\eta})||}}\ {{V_{i}^{u}(\boldsymbol{\eta})=\displaystyle\sum_{j\neq i}\frac{r_{i j}^{u}}{r_{i j}}\cdot e^{-\left(\frac{r_{i j}}{\eta}\right)^{2}}\cdot f_{d}\left(r_{i j}\right)}}\ {{f_{d}\left(r_{i j}\right)=\displaystyle\frac{1}{2}\left[\cos\left(\displaystyle\frac{\pi r_{i j}}{R_{c}}\right)+1\right]}}\end{array}
$$  

$u$ labels the individual components, i.e. $x,y$ or $z$ , and $V$ is the corresponding atomic fingerprint. $d$ is the Euclidean distance between any two atomic fingerprints. A total of $N_{t}$ reference atomic environments are considered to construct the force field file. $\alpha_{t}$ and $l$ are the weight coefficients and length scale parameter of the non-linear regression model.  

The method implements the recently proposed machine learning access to atomic forces as discussed extensively in the following publications - (Botu1) and (Botu2). The premise of the method is to map the atomic environment numerically into a fingerprint, and use machine learning methods to create a mapping to the vectorial atomic forces.  

Only a single pair_coeff command is used with the agni style which specifies an AGNI potential file containing the parameters of the force field for the needed elements. These are mapped to LAMMPS atom types by specifying $N$ additional arguments after the filename in the pair_coeff command, where $N$ is the number of LAMMPS atom types:  

• filename • $N$ element names $=$ mapping of AGNI elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the force field file.  

An AGNI force field is fully specified by the filename which contains the parameters of the force field, i.e., the reference training environments used to construct the machine learning force field. Example force field and input files are provided in the examples/PACKAGES/agni directory.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.2.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.2.5 Restrictions  

Currently, only elemental systems are implemented. Also, the method only provides access to the forces and not energies or stresses. The lack of potential energy data makes this pair style incompatible with several of the minimizer algorthms like $c g$ or sd. It should work with damped dynamics based minimizers like fire or quickmin. However, one can access the energy via thermodynamic integration of the forces as discussed in (Botu3). This pair style is part of the MISC package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The AGNI force field files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use the AGNI potential with any LAMMPS units, but you would need to create your own AGNI potential file with coefficients listed in the appropriate units if your simulation does not use “metal” units.  

# 4.2.6 Related commands  

pair_coeff  

# 4.2.7 Default  

none  

(Botu1) V. Botu and R. Ramprasad, Int. J. Quant. Chem., 115(16), 1074 (2015).   
(Botu2) V. Botu and R. Ramprasad, Phys. Rev. B, 92(9), 094306 (2015).   
(Botu3) V. Botu, R. Batra, J. Chapman and R. Ramprasad, https://arxiv.org/abs/1610.02098 (2016).  

# 4.3 pair_style aip/water/2dm command  

Accelerator Variant: aip/water/2dm/opt  

# 4.3.1 Syntax  

pair_style [hybrid/overlay ...] aip/water/2dm cutoff tap_flag  

• cutof $=$ global cutoff (distance units) • tap_flag $=0/1$ to turn off/on the taper function  

# 4.3.2 Examples  

<html><body><table><tr><td></td><td>pair_style hybrid/overlay aip/water/2dm 16.0 1</td><td colspan="3">pair_coeff * * aip/water/2dm CBNOH.aip.water.2dm C Ow Hw</td></tr><tr><td></td><td colspan="5"></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>pair_coeff </td><td></td><td>22 lj/cut/tip4p/long</td><td>8.0313e-3 3.1589</td><td># 0-0</td></tr><tr><td>pair_coeff</td><td></td><td>23 lj/cut/tip4p/long</td><td>0.0 0.0</td><td># O-H</td></tr><tr><td>pair_coeff pair_coeff</td><td>33 **</td><td>lj/cut/tip4p/long aip/water/2dm</td><td>0.0 0.0 CBNOH.aip.water.2dm</td><td># H-H C Ow Hw</td></tr><tr><td></td><td colspan="4"></td></tr><tr><td>pair_coeff </td><td colspan="4">pair_style hybrid/overlay aip/water/2dm 16.0 lj/cut /tip4p/long 3 4 1 1 0.1546 10 8.5 coul/shield 16.0 1</td></tr><tr><td></td><td>1*21*2</td><td>none</td><td></td><td></td></tr><tr><td>pair_coeff</td><td></td><td>：33lj/cut/tip4p/long</td><td>8.0313e-3 3.1589</td><td>#0-0</td></tr><tr><td>pair_coeff</td><td> 34</td><td>lj/cut/tip4p/long</td><td>0.0 0.0 0.0 0.0</td><td># O-H</td></tr><tr><td>pair_coeff</td><td>44</td><td>lj/cut/tip4p/long</td><td colspan="3"># H-H</td></tr><tr><td>pair_coeff</td><td>**</td><td>aip/water/2dm</td><td colspan="3">CBNOH.aip.water.2dmB N Ow Hw</td></tr><tr><td>pair_coeff</td><td>13</td><td>coul/shield coul/shield</td><td>1.333 1.333</td><td></td></tr><tr><td>pair_coeff</td><td>14</td><td></td><td>1.333</td><td></td></tr><tr><td>pair_coeff</td><td>23</td><td>coul/shield</td><td></td><td></td></tr><tr><td>pair_coeff </td><td>24</td><td>coul/shield</td><td>1.333</td><td></td></tr></table></body></html>  

# 4.3.3 Description  

Added in version $15\mathrm{Jun}2023$ .  

The aip/water/2dm style computes the anisotropic interfacial potential (AIP) potential for interfaces of water with twodimensional (2D) materials as described in (Feng1) and (Feng2).  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\frac{1}{2}\sum_{i}\sum_{j\neq i}{\cal V}_{i j}}}\ {{\displaystyle{\cal V}_{i j}=\mathrm{Iap}(r_{i j})\left\{e^{-\alpha(r_{i j}/\beta-1)}\left[\varepsilon+f(\rho_{i j})+f(\rho_{j i})\right]-\frac{1}{1+e^{-d\left[(r_{i j}/(\alpha_{\kappa}r^{\prime}/\beta)-1\right]}}\cdot\frac{C_{6}}{r_{i j}^{6}}\right\}}}\ {{\displaystyle{\rho_{i j}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{i})^{2}}}}\ {{\displaystyle{\rho_{j2}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{j})^{2}}}}\ {{f(\rho)=C e^{-{\left(\rho/\delta\right)^{2}}}}}\ {{\displaystyle{\mathrm T a p}(r_{i j})=20\left(\frac{r_{i j}}{R_{\alpha\alpha}}\right)^{7}-70\left(\frac{r_{i j}}{R_{\alpha\alpha}}\right)^{6}+84\left(\frac{r_{i j}}{R_{\alpha\alpha}}\right)^{5}-35\left(\frac{r_{i j}}{R_{\alpha\alpha}}\right)^{4}+1}}\end{array}
$$  

Where $\mathrm{Tap}(r_{i j})$ is the taper function which provides a continuous cutoff (up to third derivative) for interatomic separations larger than $r_{c}$ pair_style ilp_graphene_hbn.  

# Note  

This pair style uses the atomic normal vector definition from (Feng1)), where the atomic normal vectors of the hydrogen atoms are assumed to lie along the corresponding oxygen-hydrogen bonds and the normal vector of the central oxygen atom is defined as their average.  

The provided parameter file, CBNOH.aip.water.2dm, is intended for use with metal units, with energies in meV. Two additional parameters, $S_{:}$ , and rcut are included in the parameter file. S is designed to facilitate scaling of energies; rcut is the cutoff for an internal, short distance neighbor list that is generated for speeding up the calculation of the normals for all atom pairs.  

![](images/6a4cc884b78609cec15c4d621b709c2758d70bf552ac7f5cb825e156fd6dc0a2.jpg)  

# Note  

The parameters presented in the provided parameter file, CBNOH.aip.water.2dm, are fitted with the taper function enabled by setting the cutoff equal to 16.0 Angstrom. Using a different cutoff or taper function setting should be carefully checked as they can lead to significant errors. These parameters provide a good description in both shortand long-range interaction regimes. This is essential for simulations in high pressure regime (i.e., the interlayer distance is smaller than the equilibrium distance).  

This potential must be used in combination with hybrid/overlay. Other interactions can be set to zero using pair_coeff settings with the pair style set to none.  

This pair style tallies a breakdown of the total interlayer potential energy into sub-categories, which can be accessed via the compute pair command as a vector of values of length 2. The 2 values correspond to the following sub-categories:  

1. $E_{-}\nu d W=\mathrm{vdW}$ (attractive) energy   
2. $E_{-}R e p=\mathrm{R}$ epulsive energy  

To print these quantities to the log file (with descriptive column headings) the following commands could be included in an input script:  

compute 0 all pair aip/water/2dm   
variable Evdw equal c_0[1]   
variable Erep equal c_0[2]   
thermo_style custom step temp epair v_Erep v_Evdw  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.3.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

# 4.3.5 Restrictions  

This pair style is part of the INTERLAYER package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be on for pair interactions.  

The CBNOH.aip.water.2dm potential file provided with LAMMPS is parameterized for metal units. You can use this pair style with any LAMMPS units, but you would need to create your own potential file with parameters in the appropriate units, if your simulation does not use metal units.  

# 4.3.6 Related commands  

pair_coeff , pair_none, pair_style hybrid/overlay, pair_style drip, pair_style ilp_tmd, pair_style saip_metal, pair_styleilp_graphene_hbn, pair_style pair_kolmogorov_crespi_z, pair_style pair_kolmogorov_crespi_full, pair_stylepair_lebedeva_z, pair_style pair_coul_shield.  

# 4.3.7 Default  

tap_flag $=1$  

(Feng1) Z. Feng, . . . , and W. Ouyang, J. Phys. Chem. C. 127(18), 8704-8713 (2023).   
(Feng2) Z. Feng, . . . , and W. Ouyang, Langmuir 39(50), 18198-18207 (2023).  

# 4.4 pair_style airebo command  

Accelerator Variants: airebo/intel, airebo/omp  

# 4.5 pair_style airebo/morse command  

Accelerator Variants: airebo/morse/intel, airebo/morse/omp  

# 4.6 pair_style rebo command  

Accelerator Variants: rebo/intel, rebo/omp  

# 4.6.1 Syntax  

pair_style style cutoff LJ_flag TORSION_flag cutoff_min  

• style $=$ airebo or airebo/morse or rebo   
• cutof $=\mathrm{LJ}$ or Morse cutoff $\upsigma$ scale factor) (AIREBO and AIREBO-M only)   
• $\mathrm{LJ\_flag}=0/1$ to turn off/on the LJ or Morse term (AIREBO and AIREBO-M only, optional)   
• TORSION_flag $=0/1$ to turn off/on the torsion term (AIREBO and AIREBO-M only, optional)   
• cutoff_min $=$ Start of the transition region of cutoff $\sigma$ scale factor) (AIREBO and AIREBO-M only, optional)  

# 4.6.2 Examples  

pair_style airebo 3.0   
pair_style airebo 2.5 1 0   
pair_coeff \* \* ../potentials/CH.airebo H C   
pair_style airebo/morse 3.0   
pair_coeff \* \* ../potentials/CH.airebo-m H C   
pair_style rebo   
pair_coeff \* \* ../potentials/CH.rebo H C  

# 4.6.3 Description  

The airebo pair style computes the Adaptive Intermolecular Reactive Empirical Bond Order (AIREBO) Potential of (Stuart) for a system of carbon and/or hydrogen atoms. Note that this is the initial formulation of AIREBO from 2000, not the later formulation.  

The airebo/morse pair style computes the AIREBO-M potential, which is equivalent to AIREBO, but replaces the LJ term with a Morse potential. The Morse potentials are parameterized by high-quality quantum chemistry (MP2) calculations and do not diverge as quickly as particle density increases. This allows AIREBO-M to retain accuracy to much higher pressures than AIREBO (up to $40\mathrm{GPa}$ for Polyethylene). Details for this potential and its parameterization are given in ( $o$ ’Conner).  

The rebo pair style computes the Reactive Empirical Bond Order (REBO) Potential of (Brenner). Note that this is the so-called second generation REBO from 2002, not the original REBO from 1990. As discussed below, second generation REBO is closely related to the initial AIREBO; it is just a subset of the potential energy terms with a few slightly different parameters  

The AIREBO potential consists of three terms:  

$$
E=\frac{1}{2}\sum_{i}\sum_{j\neq i}\left[E_{i j}^{\mathrm{REBO}}+E_{i j}^{\mathrm{LJ}}+\sum_{k\neq i,j}\sum_{l\neq\bar{i},j,k}E_{k i j l}^{\mathrm{TORSION}}\right]
$$  

By default, all three terms are included. For the airebo style, if the first two optional flag arguments to the pair_style command are included, the LJ and torsional terms can be turned off. Note that both or neither of the flags must be included. If both of the LJ an torsional terms are turned off, it becomes the second-generation REBO potential, with a small caveat on the spline fitting procedure mentioned below. This can be specified directly as pair_style rebo with no additional arguments.  

The detailed formulas for this potential are given in (Stuart); here we provide only a brief description.  

The $E^{\mathrm{REBO}}$ term has the same functional form as the hydrocarbon REBO potential developed in (Brenner). The coefficients for $E^{\mathrm{REBO}}$ in AIREBO are essentially the same as Brenner’s potential, but a few fitted spline values are slightly different. For most cases the $E^{\mathrm{REBO}}$ term in AIREBO will produce the same energies, forces and statistical averages as the original REBO potential from which it was derived. The $E^{\mathrm{REBO}}$ term in the AIREBO potential gives the model its reactive capabilities and only describes short-ranged C-C, C-H and H-H interactions $(r<2\mathrm{\AA})$ ). These interactions have strong coordination-dependence through a bond order parameter, which adjusts the attraction between the I,J atoms based on the position of other nearby atoms and thus has 3- and 4-body dependence.  

The $E^{\mathrm{LJ}}$ term adds longer-ranged interactions $2<r<$ cutoff) using a form similar to the standard Lennard Jones potential. The $E^{\mathrm{LJ}}$ term in AIREBO contains a series of switching functions so that the short-ranged LJ repulsion $(1/r^{12})$ does not interfere with the energetics captured by the $E^{\mathrm{REBO}}$ term. The extent of the $E^{\mathrm{LJ}}$ interactions is determined by the cutoff argument to the pair_style command which is a scale factor. For each type pair (C-C, C-H, H-H) the cutoff is obtained by multiplying the scale factor by the sigma value defined in the potential file for that type pair. In the standard AIREBO potential, $\sigma_{C C}=3.4\mathring\mathrm{A}$ , so with a scale factor of 3.0 (the argument in pair_style), the resulting $E^{\mathrm{LJ}}$ cutoff would be $10.{\dot{2}}{\mathring\mathrm{A}}$ .  

By default, the longer-ranged interaction is smoothly switched off between 2.16 and $3.0\sigma$ . By specifying cutoff_min in addition to cutoff, the switching can be configured to take place between cutoff_min and cutoff. cutoff_min can only be specified if all optional arguments are given.  

The $E^{\mathrm{TORSION}}$ term is an explicit 4-body potential that describes various dihedral angle preferences in hydrocarbon configurations.  

Only a single pair_coeff command is used with the airebo, airebo or rebo style which specifies an AIREBO, REBO, or AIREBO-M potential file with parameters for C and H. Note that as of LAMMPS version 15 May 2019 the rebo style in LAMMPS uses its own potential file (CH.rebo). These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • $N$ element names $=$ mapping of AIREBO elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, if your LAMMPS simulation has 4 atom types and you want the first 3 to be C, and the fourth to be $\mathrm{H}$ , you would use the following pair_coeff command:  

$$
\mathrm{\widetilde{pair\_coeff\ast\ast_{CH.aireboCCCH}}}
$$  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three C arguments map LAMMPS atom types 1,2,3 to the C element in the AIREBO file. The final H argument maps LAMMPS atom type 4 to the H element in the AIREBO file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a airebo potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

The parameters/coefficients for the AIREBO potentials are listed in the CH.airebo file to agree with the original (Stuart) paper. Thus the parameters are specific to this potential and the way it was fit, so modifying the file should be done cautiously.  

Similarly the parameters/coefficients for the AIREBO-M potentials are listed in the CH.airebo-m file to agree with the ( $o$ ’Connor) paper. Thus the parameters are specific to this potential and the way it was fit, so modifying the file should be done cautiously. The AIREBO-M Morse potentials were parameterized using a cutoff of $3.0\left(\sigma\right)$ . Modifying this cutoff may impact simulation accuracy.  

This pair style tallies a breakdown of the total AIREBO potential energy into sub-categories, which can be accessed via the compute pair command as a vector of values of length 3. The 3 values correspond to the following sub-categories:  

1. $E_{\mathrm{REBO}}=\mathrm{REBO}$ energy   
2. $E_{\mathrm{LJ}}=$ Lennard-Jones energy   
3. ETORSION $=$ Torsion energy  

To print these quantities to the log file (with descriptive column headings) the following commands could be included in an input script:  

compute 0 all pair airebo   
variable REBO equal c_0[1]   
variable LJ equal c_0[2]   
variable TORSION equal c_0[3]   
thermo_style custom step temp epair v_REBO v_LJ v_TORSION  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.6.4 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles do not support the pair_modify mix, shift, table, and tail options.  

These pair styles do not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.6.5 Restrictions  

These pair styles are part of the MANYBODY package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

These pair potentials require the newton setting to be “on” for pair interactions.  

The CH.airebo and CH.airebo-m potential files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use the pair styles with any LAMMPS units, but you would need to create your own AIREBO or AIREBO-M potential file with coefficients listed in the appropriate units, if your simulation does not use “metal” units.  

The pair styles provided here only support potential files parameterized for the elements carbon and hydrogen (designated with “C” and “H” in the pair_coeff command. Using potential files for other elements will trigger an error.  

# 4.6.6 Related commands  

pair_coeff  

# 4.6.7 Default  

none  

(Stuart) Stuart, Tutein, Harrison, J Chem Phys, 112, 6472-6486 (2000).   
(Brenner) Brenner, Shenderova, Harrison, Stuart, Ni, Sinnott, J Physics: Condensed Matter, 14, 783-802 (2002).   
(O’Connor) O’Connor et al., J. Chem. Phys. 142, 024903 (2015).  

# 4.7 pair_style amoeba command  

Accelerator Variants: amoeba/gpu  

# 4.8 pair_style hippo command  

Accelerator Variants: hippo/gpu  

# 4.8.1 Syntax  

# 4.8.2 Examples  

pair_style amoeba pair_coeff \* \* protein.prm.amoeba protein.key.amoeba  

pair_style hippo pair_coeff \* \* water.prm.hippo water.key.hippo  

# 4.8.3 Additional info  

• Howto amoeba • examples/amoeba • tools/amoeba • potentials/\*.amoeba • potentials/\*.hippo  

# 4.8.4 Description  

The amoeba style computes the AMOEBA polarizable field formulated by Jay Ponder’s group at the U Washington at St Louis (Ren), (Shi). The hippo style computes the HIPPO polarizable force field, an extension to AMOEBA, formulated by Josh Rackers and collaborators in the Ponder group (Rackers).  

These force fields can be used when polarization effects are desired in simulations of water, organic molecules, and biomolecules including proteins, provided that parameterizations (Tinker PRM force field files) are available for the systems you are interested in. Files in the LAMMPS potentials directory with a “amoeba” or “hippo” suffix can be used. The Tinker distribution and website have additional force field files as well.  

As discussed on the Howto amoeba doc page, the intermolecular (non-bonded) portion of the AMOEBA force field contains these terms:  

$$
U_{a m o e b a}=U_{m u l t i p o l e}+U_{p o l a r}+U_{h a l}
$$  

while the HIPPO force field contains these terms:  

$$
U_{h i p p o}=U_{m u l t i p o l e}+U_{p o l a r}+U_{q x f e r}+U_{r e p u l s i o n}+U_{d i s p e r s i o n}
$$  

Conceptually, these terms compute the following interactions:  

• $U_{h a l}=$ buffered 14-7 van der Waals with offsets applied to hydrogen atoms • $U_{r e p u l s i o n}=$ Pauli repulsion due to rearrangement of electron density • $U_{d i s p e r s i o n}=$ dispersion between correlated, instantaneous induced dipole moments • $U_{m u l t i p o l e}=$ electrostatics between permanent point charges, dipoles, and quadrupoles • $U_{p o l a r}=$ electronic polarization between induced point dipoles • $U_{q x f e r}=$ charge transfer effects  

Note that the AMOEBA versus HIPPO force fields typically compute the same term differently using their own formulas. The references on this doc page give full details for both force fields.  

The formulas for the AMOEBA energy terms are:  

$$
\begin{array}{c}{{U_{h a l}=\displaystyle\varepsilon_{i j}\left(\frac{1.07}{\rho_{i j}+0.07}\right)^{7}\left(\frac{1.12}{\rho_{i j}^{7}+0.12}-2\right)}}\ {{U_{m u l t i p o l e}=\displaystyle\vec{M}_{i}T_{i j}\vec{M}_{j},\quad\mathrm{~with}\quad\displaystyle\vec{M}=\left(q,\vec{\mu}_{p e r m},\Theta\right)}}\ {{U_{p o l a r}=\displaystyle\frac{1}{2}\vec{\mu}_{i}^{i n d}\vec{E}_{i}^{p e r m}}}\end{array}
$$  

The formulas for the HIPPO energy terms are:  

$$
\begin{array}{r l}&{U_{m u l t i p o l e}=Z_{i}\cfrac{1}{r_{i j}}Z_{j}+Z_{i}T_{i j}^{d a m p}\cvec{M}_{j}+Z_{j}T_{j i}^{d a m p}\cvec{M}_{i}+\vec{M}_{i}T_{i j}^{d a m p}\cvec{M}_{j},\quad\mathrm{with}\quad\vec{M}=\left(q,\vec{\mu}_{p e r m},\Theta\right)}\ &{U_{p o l a r}=\cfrac{1}{2}\vec{\mu}_{i}^{i n d}\cvec{E}_{i}^{p e r m}}\ &{U_{q z e r e}=\varepsilon_{i}e^{-\eta_{r_{i}}r_{i j}}+\varepsilon_{j}e^{-\eta_{r_{i}}r_{i j}}}\ &{U_{r e p u l s i o n}=\cfrac{K_{i}K_{j}}{r_{i j}}S^{2}=\left(\int\phi_{i}\phi_{j}d\nu\right)^{2}=\vec{M}_{i}T_{i j}^{r e p u s i o n}\c{\vec{M}}_{j}}\ &{U_{d i s p e r s i o n}=-\cfrac{C_{6}^{i}C_{6}^{j}}{r_{i j}^{i}}\left(f_{d a m p}^{d i s p e r s i o n}\right)_{i j}^{2}}\end{array}
$$  

# Note  

The AMOEBA and HIPPO force fields compute long-range charge, dipole, and quadrupole interactions as well as long-range dispersion effects. However, unlike other models with long-range interactions in LAMMPS, this does not require use of a KSpace style via the kspace_style command. That is because for AMOEBA and HIPPO the long-range computations are intertwined with the pairwise computations. So these pair style include both shortand long-range computations. This means the energy and virial computed by the pair style as well as the “Pair” timing reported by LAMMPS will include the long-range calculations.  

The implementation of the AMOEBA and HIPPO force fields in LAMMPS was done using F90 code provided by the Ponder group from their Tinker MD code.  

The current implementation (July 2022) of AMOEBA in LAMMPS matches the version discussed in (Ponder), (Ren), and (Shi). Likewise the current implementation of HIPPO in LAMMPS matches the version discussed in (Rackers).  

Added in version 8Feb2023.  

Accelerator support via the GPU package is available.  

Only a single pair_coeff command is used with either the amoeba and hippo styles which specifies two Tinker files, a PRM and KEY file.  

pair_coeff \* \* ../potentials/protein.prm.amoeba ../potentials/protein.key.amoeba pair_coeff \* \* ../potentials/water.prm.hippo ../potentials/water.key.hippo  

Examples of the PRM files are in the potentials directory with an \*.amoeba or \*.hippo suffix. The examples/amoeba directory has examples of both PRM and KEY files.  

A Tinker PRM file is composed of sections, each of which has multiple lines. A Tinker KEY file is composed of lines each of which has a keyword followed by zero or more parameters.  

The list of PRM sections and KEY keywords which LAMMPS recognizes are listed on the Howto amoeba doc page.   
If not recognized, the section or keyword is skipped.  

Note that if the KEY file is specified as NULL, then no file is required; default values for various AMOEBA/HIPPO settings are used. The Howto amoeba doc page also gives the default settings.  

Added in version 3Nov2022.  

The amoeba and hippo pair styles support extraction of two per-atom quantities by the fix pair command. This allows the quantities to be output to files by the dump or otherwise processed by other LAMMPS commands.  

The names of the two quantities are “uind” and “uinp” for the induced dipole moments for each atom. Neither quantity needs to be triggered by the fix pair command in order for these pair styles to calculate it.  

# 4.8.5 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles do not support the pair_modify mix, shift, table, and tail options.  

These pair styles do not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffi command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

![](images/926174d9501e7e93e73defca94a6333b6b6e71946825eed9a38b38a121e08fd9.jpg)  

# Note  

Using the GPU accelerated pair styles ‘amoeba/gpu’ or ‘hippo/gpu’ when compiling the GPU package for OpenCL has a few known issues when running on integrated GPUs and the calculation may crash.  

The GPU accelerated pair styles are also not (yet) compatible with single precision FFTs.  

# 4.8.6 Restrictions  

These pair styles are part of the AMOEBA package. They are only enabled if LAMMPS was built with that package.   
See the Build package doc page for more info.  

The AMOEBA and HIPPO potential (PRM) and KEY files provided with LAMMPS in the potentials and examples/amoeba directories are Tinker files parameterized for Tinker units. Their numeric parameters are converted by LAMMPS to its real units units. Thus you can only use these pair styles with real units.  

These potentials do not yet calculate per-atom energy or virial contributions.  

As explained on the AMOEBA and HIPPO howto page, use of these pair styles to run a simulation with the AMOEBA or HIPPO force fields requires several things.  

The first is a data file generated by the tools/tinker/tinker2lmp.py conversion script which uses Tinker file force field file input to create a data file compatible with LAMMPS.  

The second is use of these commands:  

• atom_style amoeba • fix property/atom • special_bonds one/five  

And third, depending on the model being simulated, these commands for intramolecular interactions may also be required:  

• bond_style class2 • angle_style amoeba • dihedral_style fourier • improper_style amoeba • fix amoeba/pitorsion • fix amoeba/bitorsion  

# 4.8.7 Related commands  

atom_style amoeba, bond_style class2, angle_style amoeba, dihedral_style fourier, improper_style amoeba, fix amoeba/pitorsion, fix amoeba/bitorsion, special_bonds one/five, fix property/atom  

# 4.8.8 Default  

none  

(Ponder) Ponder, Wu, Ren, Pande, Chodera, Schnieders, Haque, Mobley, Lambrecht, DiStasio Jr, M. Head-Gordon, Clark, Johnson, T. Head-Gordon, J Phys Chem B, 114, 2549-2564 (2010).   
(Rackers) Rackers, Silva, Wang, Ponder, J Chem Theory Comput, 17, 7056-7084 (2021).   
(Ren) Ren and Ponder, J Phys Chem B, 107, 5933 (2003).   
(Shi) Shi, Xia, Zhang, Best, Wu, Ponder, Ren, J Chem Theory Comp, 9, 4046, 2013.  

# 4.9 pair_style atm command  

# 4.9.1 Syntax  

pair_style atm cutoff cutoff_triple  

• cutof $=$ cutoff for each pair in 3-body interaction (distance units) • cutoff_triple $=$ additional cutoff applied to product of 3 pairwise distances (distance units)  

# 4.9. pair_style atm command  

# 4.9.2 Examples  

<html><body><table><tr><td>pair style atm 4.5 2.5</td></tr><tr><td>pair coeff *** 0.072</td></tr><tr><td>pair style hybrid/overlay lj/cut 6.5 atm 4.5 2.5</td></tr><tr><td>pair coeff ** lj/ /cut 1.0 1.0</td></tr><tr><td>pair coeff 1 1 atm 1 0.064</td></tr><tr><td>pair coeff 1 1 atm 2 0.080</td></tr><tr><td>pair coeff 1 2 atm 2 0.100</td></tr><tr><td>pair coeff 2 2 atm 2 0.125</td></tr></table></body></html>  

# 4.9.3 Description  

The atm style computes a 3-body Axilrod-Teller-Muto potential for the energy $\mathrm{\bfE}$ of a system of atoms as  

$$
E=\nu\frac{1+3\cos\gamma_{1}\cos\gamma_{2}\cos\gamma_{3}}{r_{12}^{3}r_{23}^{3}r_{31}^{3}}
$$  

where $\nu$ is the three-body interaction strength. The distances between pairs of atoms $r_{12},r_{23},r_{31}$ and the angles $\gamma_{1},\gamma_{2}$ , $\gamma_{3}$ are as shown in this diagram:  

![](images/7cf7644a40c5e0058f7f365ea48fe558bcc7c930d1e5d7dd73351e0e18eb93a1.jpg)  

Note that for the interaction between a triplet of atoms $I,J,K$ , there is no “central” atom. The interaction is symmetric with respect to permutation of the three atoms. Thus the $\nu$ value is the same for all those permutations of the atom types of $I,J,K$ and needs to be specified only once, as discussed below.  

The atm potential is typically used in combination with a two-body potential using the pair_style hybrid/overlay command as in the example above.  

The potential for a triplet of atom is calculated only if all 3 distances $r_{12}$ , $r_{23}$ , $r_{31}$ between the three atoms satisfy $r_{I J}<$ cutoff. In addition, the product of the 3 distances $r_{12}r_{23}r_{31}<$ cutoff_triple 3 is required, which excludes from calculation the triplets with small contribution to the interaction.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the restart files read by the read_restart commands:  

• $K=$ atom type of the third atom (1 to $N_{\mathrm{types.}}$ ) • $\nu=$ prefactor (energy/distance^9 units)  

$K$ can be specified in one of two ways. An explicit numeric value or type label can be used, as in the second example above. LAMMPS sets the coefficients for the other 5 symmetric interactions to the same values. E.g. if $I=1$ , $J=2$ , $K=3$ , then these 6 values are set to the specified $\nu$ : $\nu_{123}$ , $\nu_{132}$ , $\nu_{213}$ , $\nu_{231}$ , $\nu_{312}$ , $\nu_{321}$ . This enforces the symmetry discussed above.  

A wildcard asterisk can be used for K to set the coefficients for multiple triplets of atom types. This takes the form “\*” or $^{66*}\mathrm{n}^{,}$ or $\mathbf{\Psi}^{66}\mathbf{n}^{*}{}^{,}$ or $\mathrm{^{6}m^{*}n^{,}}$ . If $N$ equals the number of atom types, then an asterisk with no numeric values means all types from 1 to $N$ . A leading asterisk means all types from 1 to $n$ (inclusive). A trailing asterisk means all types from $n$ to $N$ (inclusive). A middle asterisk means all types from $m$ to $n$ (inclusive). Note that only type triplets with $J\le K$ are considered; if asterisks imply type triplets where $K<J$ , they are ignored.  

Note that a pair_coeff command can override a previous setting for the same $I,J,K$ triplet. For example, these commands set $\nu$ for all $I,J.K$ triplets, then overwrite nu for just the $I,J,K=2,3,4$ triplet:  

<html><body><table><tr><td>pair coeff *** 0.25</td></tr><tr><td>pair coeff 2 3 4 0.1</td></tr></table></body></html>  

Note that for a simulation with a single atom type, only a single entry is required, e.g.  

![](images/0736d538233e9d10a476eff8850ffc7af33f7fb0d157c6304dc33b79ee9cb707.jpg)  

For a simulation with two atom types, four pair_coeff commands will specify all possible nu values:  

<html><body><table><tr><td>pair coeff 1 1 1 nul</td><td></td></tr><tr><td>pair coeff 1 12 nu2</td><td></td></tr><tr><td>pair coeff 1 2 2 nu3</td><td></td></tr><tr><td>pair coeff 222 nu4</td><td></td></tr></table></body></html>  

For a simulation with three atom types, ten pair_coeff commands will specify all possible nu values:  

<html><body><table><tr><td>pair</td><td>coeff 1 1 1 nul</td><td></td></tr><tr><td>pair</td><td>coeff 1 1 2 nu2</td><td></td></tr><tr><td>pair</td><td>coeff 1 1 3 nu3</td><td></td></tr><tr><td>pair</td><td>coeff 1 2 2 nu4</td><td></td></tr><tr><td>pair</td><td>coeff 1 23 nu5</td><td></td></tr><tr><td>pair</td><td>coeff 13 3 nu6</td><td></td></tr><tr><td>pair</td><td>coeff 222 nu7</td><td></td></tr><tr><td>pair</td><td>coeff 223 nu8</td><td></td></tr><tr><td>pair</td><td>coeff 233 nu9</td><td></td></tr><tr><td>pair</td><td>coeff 3 3 3 nu10</td><td></td></tr></table></body></html>  

By default the $\nu$ value for all triplets is set to 0.0. Thus it is not required to provide pair_coeff commands that enumerate triplet interactions for all $K$ types. If some $I,J,K$ combination is not specified, then there will be no 3-body ATM interactions for that combination and all its permutations. However, as with all pair styles, it is required to specify a pair_coeff command for all $I,J$ combinations, else an error will result.  

# 4.9.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style do not support the pair_modify mix, shift, table, and tail options.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file. However, if the atm potential is used in combination with other potentials using the pair_style hybrid/overlay command then pair_coeff commands need to be re-specified in the restart input script.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, and outer keywords.  

# 4.9.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.9.6 Related commands  

pair_coeff  

# 4.9.7 Default  

none  

(Axilrod) Axilrod and Teller, J Chem Phys, 11, 299 (1943); Muto, Nippon Sugaku-Buturigakkwaishi 17, 629 (1943).  

# 4.10 pair_style awpmd/cut command  

# 4.10.1 Syntax  

pair_style awpmd/cut Rc keyword value ...  

• Rc $=$ global cutoff, -1 means cutoff of half the shortest box length   
• zero or more keyword/value pairs may be appended   
• keyword $=$ hartree or dproduct or uhf or free or pbc or fix or harm or ermscale or flex_press   
hartree value $=$ none   
dproduct value $=$ none   
uhf value $=$ none   
free value $=$ none   
pbc value $=\mathrm{Plen}$ Plen $=$ periodic width of electron $=-1$ or positive value (distance units)   
fix value = Flen Flen = fixed width of electron = -1 or positive value (distance units)   
harm value $=$ width width $=$ harmonic width constraint   
ermscale value $=$ factor factor $=$ scaling between electron mass and width variable mass   
flex_press value $=$ none  

# 4.10.2 Examples  

pair_style awpmd/cut -1   
pair_style awpmd/cut 40.0 uhf free   
pair_coeff \* \*   
pair_coeff 2 2 20.0  

# 4.10.3 Description  

This pair style contains an implementation of the Antisymmetrized Wave Packet Molecular Dynamics (AWPMD) method. Need citation here. Need basic formulas here. Could be links to other documents.  

Rc is the cutoff.  

The pair_style command allows for several optional keywords to be specified.  

The hartree, dproduct, and uhf keywords specify the form of the initial trial wave function for the system. If the hartree keyword is used, then a Hartree multielectron trial wave function is used. If the dproduct keyword is used, then a trial function which is a product of two determinants for each spin type is used. If the uhf keyword is used, then an unrestricted Hartree-Fock trial wave function is used.  

The free, pbc, and fix keywords specify a width constraint on the electron wave packets. If the free keyword is specified, then there is no constraint. If the pbc keyword is used and Plen is specified as -1, then the maximum width is half the shortest box length. If Plen is a positive value, then the value is the maximum width. If the fix keyword is used and Flen is specified as -1, then electrons have a constant width that is read from the data file. If Flen is a positive value, then the constant width for all electrons is set to Flen.  

The harm keyword allow oscillations in the width of the electron wave packets. More details are needed.  

The ermscale keyword specifies a unitless scaling factor between the electron masses and the width variable mass.   
More details needed.  

If the flex_press keyword is used, then a contribution from the electrons is added to the total virial and pressure of the system.  

This potential is designed to be used with atom_style wavepacket definitions, in order to handle the description o systems with interacting nuclei and explicit electrons.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• cutoff (distance units)  

For awpmd/cut, the cutoff coefficient is optional. If it is not used (as in some of the examples above), the default global value specified in the pair_style command is used.  

# 4.10.4 Mixing, shift, table, tail correction, restart, rRESPA info  

The pair_modify mix, shift, table, and tail options are not relevant for this pair style.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.10.5 Restrictions  

none  

# 4.10.6 Related commands  

pair_coeff  

# 4.10.7 Default  

These are the defaults for the pair_style keywords: hartree for the initial wave function, free for the wave packet width.  

# 4.10. pair_style awpmd/cut command  

# 4.11 pair_style beck command  

Accelerator Variants: beck/gpu, beck/omp  

# 4.11.1 Syntax  

• $\mathbf{R}\mathbf{c}=$ cutoff for interactions (distance units)  

# 4.11.2 Examples  

pair_style beck 8.0   
pair_coeff \* \* 399.671876712 0.0000867636112694 0.675 4.390 0.0003746   
pair_coeff 1 1 399.671876712 0.0000867636112694 0.675 4.390 0.0003746 6.0  

# 4.11.3 Description  

Style beck computes interactions based on the potential by (Beck), originally designed for simulation of Helium. It includes truncation at a cutoff distance $r_{c}$ .  

$$
E(r)=A\exp\left[-\alpha r-\beta r^{6}\right]-{\frac{B}{\left(r^{2}+a^{2}\right)^{3}}}\left(1+{\frac{2.709+3a^{2}}{r^{2}+a^{2}}}\right)\qquadr<r_{c}
$$  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands.  

• A (energy units) • $B$ (energy-distance $\wedge_{6}$ units) • $a$ (distance units) • α (1/distance units) • $\beta$ (1/distance^6 units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global cutoff $r_{c}$ is used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.11.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , coefficients must be specified. No default mixing rules are used.  

This pair style does not support the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.11.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.11.6 Related commands  

pair_coeff  

# 4.11.7 Default  

none  

(Beck) Beck, Molecular Physics, 14, 311 (1968).  

# 4.12 pair_style body/nparticle command  

# 4.12.1 Syntax  

The coordinates of a body particle are its center-of-mass (COM). If the COMs of a pair of body particles are within the cutoff (global or type-specific, as specified above), then all interactions between pairs of sub-particles in the two body particles are computed. E.g. if the first body particle has 3 sub-particles, and the second has 10, then 30 interactions are computed and summed to yield the total force and torque on each body particle.  

![](images/ce7f0d3dbfc0fbca7719dbea356d9de9f3d559fd618801f68e02148883802244.jpg)  

# Note  

In the example just described, all 30 interactions are computed even if the distance between a particular pair of sub-particles is greater than the cutoff. Likewise, no interaction between two body particles is computed if the two COMs are further apart than the cutoff, even if the distance between some pairs of their sub-particles is within the cutoff. Thus care should be used in defining the cutoff distances for body particles, depending on their shape and size.  

Similar rules apply for a body particle interacting with a point particle. The distance between the two particles is calculated using the COM of the body particle and the position of the point particle. If the distance is within the cutof and the body particle has $\mathbf{N}$ sub-particles, then $\mathbf{N}$ interactions with the point particle are computed and summed. If the distance is not within the cutoff, no interactions between the body and point particle are computed.  

The interaction between two sub-particles, or a sub-particle and point particle, or between two point particles is computed as a Lennard-Jones interaction, using the standard formula  

$$
E=4\varepsilon\left[\left({\frac{\sigma}{r}}\right)^{12}-\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<R_{c}
$$  

where $R_{c}$ is the cutoff. As explained above, an interaction involving one or two body sub-particles may be computed even for $r>R_{c}$ .  

For style body, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• ε (energy units) • $\sigma$ (distance units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global cutoff is used.  

# 4.12.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of this pair style can be mixed. The default mix value is geometric. See the pair_modify command for details.  

This pair style does not support the pair_modify shift, table, and tail options  

This pair style does not write its information to binary restart files.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.12.5 Restrictions  

This style is part of the BODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Defining particles to be bodies so they participate in body/body or body/particle interactions requires the use of the atom_style body command.  

# 4.12.6 Related commands  

pair_coeff , fix rigid  

# 4.12.7 Default  

none  

# 4.13 pair_style body/rounded/polygon command  

# 4.13.1 Syntax  

<html><body><table><tr><td>pair style e body rounded/ polygon c_n c_t mu delta_ua cutoff</td></tr><tr><td>cn= normal damping coefficient</td></tr><tr><td>c _t = tangential damping coefficient</td></tr><tr><td>= normal friction coefficient during gross sliding mu</td></tr><tr><td>delta_ua = multiple contact scaling factor</td></tr><tr><td>cutoff = global separation cutoff for interactions (distance units), see below for definition</td></tr></table></body></html>  

# 4.13.2 Examples  

pair_style body/rounded/polygon 20.0 5.0 0.0 1.0 0.5   
pair_coeff \* \* 100.0 1.0   
pair_coeff 1 1 100.0 1.0  

# 4.13.3 Description  

Style body/rounded/polygon is for use with 2d models of body particles of style rounded/polygon. It calculates pairwise body/body interactions which can include body particles modeled as 1-vertex circular disks with a specified diameter. See the Howto body page for more details on using body rounded/polygon particles.  

This pairwise interaction between rounded polygons is described in Fraige, where a polygon does not have sharp corners, but is rounded at its vertices by circles centered on each vertex with a specified diameter. The edges of the polygon are defined between pairs of adjacent vertices. The circle diameter for each polygon is specified in the data file read by the read data command. This is a 2d discrete element model (DEM) which allows for multiple contact points.  

Note that when two particles interact, the effective surface of each polygon particle is displaced outward from each of its vertices and edges by half its circle diameter (as in the diagram below of a gray and yellow square particle). The interaction forces and energies between two particles are defined with respect to the separation of their respective rounded surfaces, not by the separation of the vertices and edges themselves.  

This means that the specified cutoff in the pair_style command is the cutoff distance, $r_{c}$ , for the surface separation, $\delta_{n}$ (see figure below). This is the distance at which two particles no longer interact. If $r_{c}$ is specified as 0.0, then it is a contact-only interaction. I.e. the two particles must overlap in order to exert a repulsive force on each other. If $r_{c}>0.0$ , then the force between two particles will be attractive for surface separations from 0 to $r_{c}$ , and repulsive once the particles overlap.  

Note that unlike for other pair styles, the specified cutoff is not the distance between the centers of two particles at which they stop interacting. This center-to-center distance depends on the shape and size of the two particles and their relative orientation. LAMMPS takes that into account when computing the surface separation distance and applying the $r_{c}$ cutoff.  

The forces between vertex-vertex, vertex-edge, and edge-edge overlaps are given by:  

$$
\begin{array}{r l}&{F_{n}=\left\{\begin{array}{l l}{k_{n}\delta_{n}-c_{n}\nu_{n}}&{\delta_{n}\leq0}\ {-k_{n a}\delta_{n}-c_{n}\nu_{n}}&{0<\delta_{n}\leq r_{c}}\ {0}&{\delta_{n}>r_{c}}\end{array}\right.}\ &{F_{t}=\left\{\begin{array}{l l}{\mu k_{n}\delta_{n}-c_{t}\nu_{t}}&{\delta_{n}\leq0}\ {0}&{\delta_{n}>0}\end{array}\right.}\end{array}
$$  

![](images/96be82aceb4c613a5762bd0b7869ef95b454be5582f5bfd9e43f48dce3e374e2.jpg)  

Note that $F_{n}$ and $F_{t}$ are functions of the surface separation $\delta_{n}=d-(R_{i}+R_{j})$ . In this model, when $(R_{i}+R_{j})<d<$ $(R_{i}+R_{j})+r_{c}$ , that is, $0<\delta_{n}<r_{c}$ , the cohesive region of the two surfaces overlap and the two surfaces are attractive to each other.  

In Fraige, the tangential friction force between two particles that are in contact is modeled differently prior to gross sliding (i.e. static friction) and during gross-sliding (kinetic friction). The latter takes place when the tangential deformation exceeds the Coulomb frictional limit. In the current implementation, however, we do not take into account frictional history, i.e. we do not keep track of how many time steps the two particles have been in contact nor calculate the tangential deformation. Instead, we assume that gross sliding takes place as soon as two particles are in contact.  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file read by the read_data command:  

• $k_{n}$ (energy/distance^2 units) • $k_{n a}$ (energy/distance^2 units)  

Effectively, $k_{n}$ and $k_{n a}$ are the slopes of the red lines in the plot above for force versus surface separation, for $\delta_{n}<0$ and $0<\delta_{n}<r_{c}$ respectively.  

# 4.13.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write its information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.13.5 Restrictions  

These pair styles are part of the BODY package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

# 4.13.6 Related commands  

pair_coeff  

# 4.13.7 Default  

none (Fraige) F. Y. Fraige, P. A. Langston, A. J. Matchett, J. Dodds, Particuology, 6, 455 (2008).  

# 4.14 pair_style body/rounded/polyhedron command  

# 4.14.1 Syntax  

<html><body><table><tr><td>pair style body rounded/ /polyhedron c_n c_t mu delta _ua cutoff</td></tr><tr><td>cn= normal damping coefficient</td></tr><tr><td>c _t = tangential damping coefficient</td></tr><tr><td>mu = normal friction coefficient during gross sliding</td></tr><tr><td>delta_ua = multiple contact scaling factor</td></tr><tr><td>cutoff global separation cutoff for interactions distance units), see below for definition</td></tr></table></body></html>  

# 4.14.2 Examples  

pair_style body/rounded/polyhedron 20.0 5.0 0.0 1.0 0.5   
pair_coeff \* \* 100.0 1.0   
pair_coeff 1 1 100.0 1.0  

# 4.14.3 Description  

Style body/rounded/polygon is for use with 3d models of body particles of style rounded/polyhedron. It calculates pairwise body/body interactions which can include body particles modeled as 1-vertex spheres with a specified diameter. See the Howto body page for more details on using body rounded/polyhedron particles.  

This pairwise interaction between the rounded polyhedra is described in Wang, where a polyhedron does not have sharp corners and edges, but is rounded at its vertices and edges by spheres centered on each vertex with a specified diameter. The edges of the polyhedron are defined between pairs of adjacent vertices. Its faces are defined by a loop of edges. The sphere diameter for each polygon is specified in the data file read by the read data command. This is a discrete element model (DEM) which allows for multiple contact points.  

Note that when two particles interact, the effective surface of each polyhedron particle is displaced outward from each of its vertices, edges, and faces by half its sphere diameter. The interaction forces and energies between two particles are defined with respect to the separation of their respective rounded surfaces, not by the separation of the vertices, edges, and faces themselves.  

This means that the specified cutoff in the pair_style command is the cutoff distance, $r_{c}$ , for the surface separation, $\delta_{n}$ (see figure below). This is the distance at which two particles no longer interact. If $r_{c}$ is specified as 0.0, then it is a contact-only interaction. I.e. the two particles must overlap in order to exert a repulsive force on each other. If $r_{c}>0.0$ , then the force between two particles will be attractive for surface separations from 0 to $r_{c}$ , and repulsive once the particles overlap.  

Note that unlike for other pair styles, the specified cutoff is not the distance between the centers of two particles at which they stop interacting. This center-to-center distance depends on the shape and size of the two particles and their relative orientation. LAMMPS takes that into account when computing the surface separation distance and applying the $r_{c}$ cutoff.  

The forces between vertex-vertex, vertex-edge, vertex-face, edge-edge, and edge-face overlaps are given by:  

$$
\begin{array}{r l}&{F_{n}=\left\{\begin{array}{l l}{k_{n}\delta_{n}-c_{n}\nu_{n},}&{\delta_{n}\leq0}\ {-k_{n a}\delta_{n}-c_{n}\nu_{n}}&{0<\delta_{n}\leq r_{c}}\ {0}&{\delta_{n}>r_{c}}\end{array}\right.}\ &{F_{t}=\left\{\begin{array}{l l}{\mu k_{n}\delta_{n}-c_{t}\nu_{t}}&{\delta_{n}\leq0}\ {0}&{\delta_{n}>0}\end{array}\right.}\end{array}
$$  

![](images/7d7ba65ed05f1ccda4de45c847548109c399fe0029fa284584fada5fda03763e.jpg)  

In Wang, the tangential friction force between two particles that are in contact is modeled differently prior to gross sliding (i.e. static friction) and during gross-sliding (kinetic friction). The latter takes place when the tangential deformation exceeds the Coulomb frictional limit. In the current implementation, however, we do not take into account frictional history, i.e. we do not keep track of how many time steps the two particles have been in contact nor calculate the tangential deformation. Instead, we assume that gross sliding takes place as soon as two particles are in contact.  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file read by the read_data command:  

• $k_{n}$ (energy/distance $\wedge_{2}$ units) • $k_{n a}$ (energy/distance^2 units)  

Effectively, $k_{n}$ and $k_{n a}$ are the slopes of the red lines in the plot above for force versus surface separation, for $\delta_{n}<0$ and $0<\delta_{n}<r_{c}$ respectively.  

# 4.14.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write its information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.14.5 Restrictions  

These pair styles are part of the BODY package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

# 4.14.6 Related commands  

pair_coeff  

# 4.14.7 Default  

none (Wang) J. Wang, H. S. Yu, P. A. Langston, F. Y. Fraige, Granular Matter, 13, 1 (2011).  

# 4.15 pair_style bop command  

# 4.15.1 Syntax  

can also be modeled by using the appropriate alloy file and assigning all atom types to the single element or subset of elements via the pair_coeff command, as discussed below.  

The BOP potential consists of three terms:  

$$
E=\frac{1}{2}\sum_{i=1}^{N}\sum_{j=i_{1}}^{i_{N}}\phi_{i j}\left(r_{i j}\right)-\sum_{i=1}^{N}\sum_{j=i_{1}}^{i_{N}}\beta_{\sigma,i j}\left(r_{i j}\right)\cdot\Theta_{\sigma,i j}-\sum_{i=1}^{N}\sum_{j=i_{1}}^{i_{N}}\beta_{\pi,i j}\left(r_{i j}\right)\cdot\Theta_{\pi,i j}+U_{p r o m}
$$  

where $\phi_{i j}(r_{i j})$ is a short-range two-body function representing the repulsion between a pair of ion cores, $\beta_{\sigma,i j}(r_{i j})$ and $\beta_{\sigma,i j}(r_{i j})$ are respectively sigma and $\pi$ bond integrals, $\Theta_{\sigma,i j}$ and $\Theta_{\pi,i j}$ are $\sigma$ and $\pi$ bond-orders, and U_prom is the promotion energy for sp-valent systems.  

The detailed formulas for this potential are given in Ward (Ward); here we provide only a brief description.  

The repulsive energy $\phi_{i j}(r_{i j})$ and the bond integrals $\beta_{\sigma,i j}(r_{i j})$ and $\beta_{\phi,i j}(r_{i j})$ are functions of the interatomic distance $r_{i j}$ between atom $i$ and $j$ . Each of these potentials has a smooth cutoff at a radius of $r_{c u t,i j}$ . These smooth cutoffs ensure stable behavior at situations with high sampling near the cutoff such as melts and surfaces.  

The bond-orders can be viewed as environment-dependent local variables that are ij bond specific. The maximum value of the $\sigma$ bond-order $\boldsymbol{\Theta}_{\sigma}$ is 1, while that of the $\pi$ bond-order $(\Theta_{\pi})$ is 2, attributing to a maximum value of the total bond-order $(\Theta_{\sigma}+\Theta_{\pi})$ of 3. The $\sigma$ and $\pi$ bond-orders reflect the ubiquitous single-, double-, and triple- bond behavior of chemistry. Their analytical expressions can be derived from tight- binding theory by recursively expanding an inter-site Green’s function as a continued fraction. To accurately represent the bonding with a computationally efficient potential formulation suitable for MD simulations, the derived BOP only takes (and retains) the first two levels of the recursive representations for both the $\sigma$ and the $\pi$ bond-orders. Bond-order terms can be understood in terms of molecular orbital hopping paths based upon the Cyrot-Lackmann theorem (Pettifor_1). The $\sigma$ bond-order with a half-full valence shell is used to interpolate the bond-order expression that incorporated explicit valance band filling. This $\pi$ bond-order expression also contains also contains a three-member ring term that allows implementation of an asymmetric density of states, which helps to either stabilize or destabilize close-packed structures. The $\pi$ bond-order includes hopping paths of length 4. This enables the incorporation of dihedral angles effects.  

![](images/629328bea7b85c6e61f94efec32978fa78d005ac122a2abfbfdc067be4036d37.jpg)  

# Note  

Note that unlike for other potentials, cutoffs for BOP potentials are not set in the pair_style or pair_coeff command; they are specified in the BOP potential files themselves. Likewise, the BOP potential files list atomic masses; thus you do not need to use the mass command to specify them. Note that for BOP potentials with hydrogen, you will likely want to set the mass of H atoms to be $10\mathrm{x}$ or $20\mathrm{x}$ larger to avoid having to use a tiny timestep. You can do this by using the mass command after using the pair_coeff command to read the BOP potential file.  

One option can be specified as a keyword with the pair_style command.  

The save keyword gives you the option to calculate in advance and store a set of distances, angles, and derivatives of angles. The default is to not do this, but to calculate them on-the-fly each time they are needed. The former may be faster, but takes more memory. The latter requires less memory, but may be slower. It is best to test this option to optimize the speed of BOP for your particular system configuration.  

Only a single pair_coeff command is used with the bop style which specifies a BOP potential file, with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of BOP elements to atom types  

As an example, imagine the CdTe.bop file has BOP values for Cd and Te. If your LAMMPS simulation has 4 atom types and you want the first 3 to be Cd, and the fourth to be Te, you would use the following pair_coeff command:  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three Cd arguments map LAMMPS atom types 1,2,3 to the Cd element in the BOP file. The final Te argument maps LAMMPS atom type 4 to the Te element in the BOP file.  

BOP files in the potentials directory of the LAMMPS distribution have a “.bop” suffix. The potentials are in tabulated form containing pre-tabulated pair functions for phi_ij(r_ij), beta_(sigma,ij)(r_ij), and beta_pi,ij)(r_ij).  

The parameters/coefficients format for the different kinds of BOP files are given below with variables matching the formulation of Ward (Ward) and Zhou (Zhou). Each header line containing a “:” is preceded by a blank line.  

# No angular table file format:  

The parameters/coefficients format for the BOP potentials input file containing pre-tabulated functions of $\mathrm{g}$ is given below with variables matching the formulation of Ward (Ward). This format also assumes the angular functions have the formulation of (Ward).  

• Line 1: # elements N  

The first line is followed by N lines containing the atomic number, mass, and element symbol of each element.  

Following the definition of the elements several global variables for the tabulated functions are given.  

• Line 1: nr, nBOt (nr is the number of divisions the radius is broken into for function tables and MUST be a factor of 5; nBOt is the number of divisions for the tabulated values of THETA_(S,ij)   
• Line 2: delta_1-delta_7 (if all are not used in the particular   
• formulation, set unused values to 0.0)  

Following this N lines for e_1-e_N containing p_pi.  

• Line 3: p_pi (for e_1) • Line 4: p_pi (for e_2 and continues to e_N)  

The next section contains several pair constants for the number of interaction types e_i-e_j, with $\mathrm{i}{=}1{-}>\mathrm{N}$ , j=i->N  

• Line 1: r_cut (for e_1-e_1 interactions)   
• Line 2: c_sigma, a_sigma, c_pi, a_pi   
• Line 3: delta_sigma, delta_pi   
• Line 4: f_sigma, k_sigma, delta_3 (This delta_3 is similar to that of the previous section but is interaction type dependent)  

The next section contains a line for each three body interaction type e_j-e_i-e_k with $\scriptstyle{\mathrm{i}=0->N}$ , $\mathrm{j}{=}0{\sim}>\mathrm{N}$ , k=j->N  

• Line 1: g_(sigma0), g_(sigma1), g_(sigma2) (These are coefficients for g_(sigma,jik)(THETA_ijk) for e_1-e_1- e_1 interaction. Ward contains the full expressions for the constants as functions of b_(sigma,ijk), p_(sigma,ijk), u_(sigma,ijk))   
• Line 2: g_(sigma0), g_(sigma1), g_(sigma2) (for e_1-e_1-e_2)  

The next section contains a block for each interaction type for the phi_ij(r_ij). Each block has nr entries with 5 entries per line.  

• Line 1: phi(r1), phi(r2), phi(r3), phi(r4), phi(r5) (for the e_1-e_1 interaction type) • Line 2: phi(r6), phi(r7), phi(r8), phi(r9), phi(r10) (this continues until nr)  

• Line nr/5_1: phi(r1), phi(r2), phi(r3), phi(r4), phi(r5), (for the e_1-e_1 interaction type)  

The next section contains a block for each interaction type for the beta_(sigma,ij)(r_ij). Each block has nr entries with 5 entries per line.  

• Line 1: beta_sigma(r1), beta_sigma(r2), beta_sigma(r3), beta_sigma(r4), beta_sigma(r5) (for the e_1-e_1 interaction type)   
• Line 2: beta_sigma(r6), beta_sigma(r7), beta_sigma(r8), beta_sigma(r9), beta_sigma(r10) (this continues until nr)   
• . . .   
• Line $\mathrm{nr}/5{+}1$ : beta_sigma(r1), beta_sigma(r2), beta_sigma(r3), beta_sigma(r4), beta_sigma(r5) (for the e_1-e_2 interaction type)  

The next section contains a block for each interaction type for beta_(pi,ij)(r_ij). Each block has nr entries with 5 entries per line.  

• Line 1: beta_pi(r1), beta_pi(r2), beta_pi(r3), beta_pi(r4), beta_pi(r5) (for the e_1-e_1 interaction type) • Line 2: beta_pi(r6), beta_pi(r7), beta_pi(r8), beta_pi(r9), beta_pi(r10) (this continues until nr) • . . . • Line $\mathrm{nr}/5{+}1$ : beta_pi(r1), beta_pi(r2), beta_pi(r3), beta_pi(r4), beta_pi(r5) (for the e_1-e_2 interaction type  

The next section contains a block for each interaction type for the THETA_(S,ij)((THETA_(sigma,ij))^(1/2), f_(sigma,ij)). Each block has nBOt entries with 5 entries per line.  

• Line 1: THETA_(S,ij)(r1), THETA_(S,ij)(r2), THETA_(S,ij)(r3), THETA_(S,ij)(r4), THETA_(S,ij)(r5) (for the e_1-e_2 interaction type)   
• Line 2: THETA_(S,ij)(r6), THETA_(S,ij)(r7), THETA_(S,ij)(r8), THETA_(S,ij)(r9), THETA_(S,ij)(r10) (this continues until nBOt)   
• Line $\mathrm{nBOt}/5{+}1$ : THETA_(S,ij)(r1), THETA_(S,ij)(r2), THETA_(S,ij)(r3), THETA_(S,ij)(r4), THETA_(S,ij)(r5) (for the e_1-e_2 interaction type)  

The next section contains a block of N lines for e_1-e_N • Line 1: delta^mu (for e_1) • Line 2: delta $\scriptstyle\mathrm{{\hat{\Pi}}}_{\mathrm{{mu}}}$ (for e_2 and repeats to e_N)  

The last section contains more constants for e_i-e_j interactions with $\scriptstyle{\mathrm{i}=0->N}$ , j=i->N • Line 1: $(\mathrm{A_{-}i j})^{\wedge}(\mathrm{mu^{*}n u})$ (for e1-e1) • Line 2: $(\mathrm{A_{-}i j})^{\wedge}(\mathrm{mu^{*}n u})$ (for e1-e2 and repeats as above)  

# Angular spline table file format:  

The parameters/coefficients format for the BOP potentials input file containing pre-tabulated functions of $\mathrm{g}$ is given below with variables matching the formulation of Ward (Ward). This format also assumes the angular functions have the formulation of (Zhou).  

• Line 1: # elements N  

The first line is followed by N lines containing the atomic number, mass, and element symbol of each element.   
Following the definition of the elements several global variables for the tabulated functions are given.  

# 4.15. pair_style bop command  

• Line 1: nr, ntheta, nBOt (nr is the number of divisions the radius is broken into for function tables and MUST be a factor of 5; ntheta is the power of the power of the spline used to fit the angular function; nBOt is the number of divisions for the tabulated values of THETA_(S,ij)   
• Line 2: delta_1-delta_7 (if all are not used in the particular   
• formulation, set unused values to 0.0)  

Following this N lines for e_1-e_N containing p_pi.  

• Line 3: p_pi (for e_1) • Line 4: p_pi (for e_2 and continues to e_N)  

The next section contains several pair constants for the number of interaction types e_i-e_j, with $\mathrm{i}{=}1{-}>\mathrm{N}$ , j=i->N  

• Line 1: r_cut (for e_1-e_1 interactions)   
• Line 2: c_sigma, a_sigma, c_pi, a_pi   
• Line 3: delta_sigma, delta_pi   
• Line 4: f_sigma, k_sigma, delta_3 (This delta_3 is similar to that of the previous section but is interaction type dependent)  

The next section contains a line for each three body interaction type e_j-e_i-e_k with $\scriptstyle{\mathrm{i}=0->N}$ , $\mathrm{j}{=}0{\sim}>\mathrm{N}$ , k=j->N • Line 1: g0, g1, g2. . . (These are coefficients for the angular spline of the g_(sigma,jik)(THETA_ijk) for e_1- e_1-e_1 interaction. The function can contain up to 10 term thus 10 constants. The first line can contain up to five constants. If the spline has more than five terms the second line will contain the remaining constants The following lines will then contain the constants for the remaining g0, g1, g2. . . (for e_1-e_1-e_2) and the other three body interactions  

The rest of the table has the same structure as the previous section (see above).  

# Angular no-spline table file format:  

The parameters/coefficients format for the BOP potentials input file containing pre-tabulated functions of $\mathrm{g}$ is given below with variables matching the formulation of Ward (Ward). This format also assumes the angular functions have the formulation of (Zhou).  

• Line 1: # elements N  

The first two lines are followed by N lines containing the atomic number, mass, and element symbol of each element.  

ollowing the definition of the elements several global variables for the tabulated functions are given.  

• Line 1: nr, ntheta, nBOt (nr is the number of divisions the radius is broken into for function tables and MUST be a factor of 5; ntheta is the number of divisions for the tabulated values of the g angular function; nBOt is the number of divisions for the tabulated values of THETA_(S,ij)   
• Line 2: delta_1-delta_7 (if all are not used in the particular   
• formulation, set unused values to 0.0)  

Following this N lines for e_1-e_N containing p_pi.  

• Line 3: p_pi (for e_1) • Line 4: p_pi (for e_2 and continues to e_N)  

The next section contains several pair constants for the number of interaction types e_i-e_j, with $\mathrm{i}{=}1{-}>\mathrm{N}$ , j=i->N  

• Line 1: r_cut (for e_1-e_1 interactions) • Line 2: c_sigma, a_sigma, c_pi, a_pi  

• Line 3: delta_sigma, delta_pi   
• Line 4: f_sigma, k_sigma, delta_3 (This delta_3 is similar to that of the previous section but is interaction type dependent)  

The next section contains a line for each three body interaction type e_j-e_i-e_k with $\scriptstyle{\mathrm{i}=0->N}$ , $\mathrm{j}{=}0{\sim}>\mathrm{N}$ , k=j->N • Line 1: g(theta1), g(theta2), g(theta3), g(theta4), g(theta5) (for the e_1-e_1-e_1 interaction type) • Line 2: g(theta6), g(theta7), g(theta8), g(theta9), g(theta10) (this continues until ntheta) • Line ntheta $^{\prime5+1}$ : g(theta1), g(theta2), g(theta3), g(theta4), g(theta5), (for the e_1-e_1-e_2 interaction type)  

The rest of the table has the same structure as the previous section (see above).  

# 4.15.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.15.5 Restrictions  

These pair styles are part of the MANYBODY package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

These pair potentials require the newtion setting to be “on” for pair interactions.  

Pair style bop is not compatible with being used as a sub-style with doc:hybrid pair styles <pair_hybrid>. Pair style bop is also not compatible with multi-cutoff neighbor lists or multi-cutoff communitcation.  

The .bop.table potential files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use the BOP potential with any LAMMPS units, but you would need to create your own BOP potential file with coefficients listed in the appropriate units if your simulation does not use “metal” units.  

# 4.15.6 Related commands  

pair_coeff  

# 4.15.7 Default  

non-tabulated potential file, a_0 is non-zero.  

(Pettifor_1) D.G. Pettifor and I.I. Oleinik, Phys. Rev. B, 59, 8487 (1999).   
(Pettifor_2) D.G. Pettifor and I.I. Oleinik, Phys. Rev. Lett., 84, 4124 (2000).   
(Pettifor_3) D.G. Pettifor and I.I. Oleinik, Phys. Rev. B, 65, 172103 (2002).   
(Murdick) D.A. Murdick, X.W. Zhou, H.N.G. Wadley, D. Nguyen-Manh, R. Drautz, and D.G. Pettifor, Phys. Rev. B, 73, 45206 (2006). (Ward) D.K. Ward, X.W. Zhou, B.M. Wong, F.P. Doty, and J.A. Zimmerman, Phys. Rev. B, 85,115206 (2012).   
(Zhou) X.W. Zhou, D.K. Ward, M. Foster (TBP).  

# 4.16 pair_style born command  

Accelerator Variants: born/omp, born/gpu  

# 4.17 pair_style born/coul/long command  

Accelerator Variants: born/coul/long/gpu, born/coul/long/omp  

# 4.18 pair_style born/coul/msm command  

Accelerator Variants: born/coul/msm/omp  

# 4.19 pair_style born/coul/wolf command  

Accelerator Variants: born/coul/wolf/gpu, born/coul/wolf/omp  

# 4.20 pair_style born/coul/dsf command  

# 4.20.1 Syntax  

pair_style style args  

• style $=$ born or born/coul/long or born/coul/msm or born/coul/wolf • args $=$ list of arguments for a particular style  

born args $=$ cutoff  

cutoff $=$ global cutoff for non-Coulombic interactions (distance units)   
born/coul/long args $=$ cutoff (cutoff2) cutof $=$ global cutoff for non-Coulombic (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)   
born/coul/msm args $=$ cutoff (cutoff2) cutoff $=$ global cutoff for non-Coulombic (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
born/coul/wolf args = alpha cutoff (cutoff2) alpha = damping parameter (inverse distance units) cutoff = global cutoff for non-Coulombic (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
born/coul/dsf args = alpha cutoff (cutoff2) alpha $=$ damping parameter (inverse distance units) cutoff $=$ global cutoff for non-Coulombic (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (distance units)  

# 4.20.2 Examples  

pair_style born 10.0   
pair_coeff \* \* 6.08 0.317 2.340 24.18 11.51  

(continues on next page)  

(continued from previous page)  

<html><body><table><tr><td></td></tr><tr><td>pair_coef 1 1 6.08 0.317 2.340 24.18 11.51</td></tr><tr><td></td></tr><tr><td>pair_style born/coul/long 10.0</td></tr><tr><td>pair_style born/coul/long 10.0 8.</td></tr><tr><td>pair_coeff f * * 6.08 0.317 2.340 24.18 11.51 pair _ coeff 1 1 6.08 0.317 2.340 24.18 11.51</td></tr><tr><td></td></tr><tr><td>pair_style born/coul/msm 10.0</td></tr><tr><td>pair_style born/coul/msm 10.0 8.0</td></tr><tr><td>pair_coeff * * 6.08 0.317 2.340 24.18 11.51 pair_ coeff 1 1 6.08 0.317 2.340 24.18 11.51</td></tr><tr><td></td></tr><tr><td>pair_style born/coul/wolf 0.25 10.0</td></tr><tr><td>pair_style born/coul/wolf 0.25 10.0 9.0</td></tr><tr><td>pair _coeff * * 6.08 0.317 2.340 24.18 11.51</td></tr><tr><td>pair_ coeff 1 1 6.08 0.317 2.340 24.18 11.51</td></tr><tr><td>pair_style born/coul/dsf 0.1 10.0 12.0</td></tr><tr><td>pair_coeff * * " 0.0 1.00 0.00 0.00 0.00</td></tr><tr><td>pair _ coeff 1 1 480.0 0.25 0.00 1.05 0.50</td></tr></table></body></html>  

# 4.20.3 Description  

The born style computes the Born-Mayer-Huggins or Tosi/Fumi potential described in (Fumi and Tosi), given by  

$$
E=A\exp\left({\frac{\sigma-r}{\rho}}\right)-{\frac{C}{r^{6}}}+{\frac{D}{r^{8}}}\qquadr<r_{c}
$$  

where $\sigma$ is an interaction-dependent length parameter, $\rho$ is an ionic-pair dependent length parameter, and $r_{c}$ is the cutoff.  

The styles with coul/long or coul/msm add a Coulombic term as described for the lj/cut pair styles. An additional damping factor is applied to the Coulombic term so it can be used in conjunction with the kspace_style command and its ewald or pppm of msm option. The Coulombic cutoff specified for this style means that pairwise interactions within this distance are computed directly; interactions outside that distance are computed in reciprocal space.  

If one cutoff is specified for the born/coul/long and born/coul/msm style, it is used for both the A,C,D and Coulombic terms. If two cutoffs are specified, the first is used as the cutoff for the A,C,D terms, and the second is the cutoff for the Coulombic term.  

The born/coul/wolf style adds a Coulombic term as described for the Wolf potential in the coul/wolf pair style.  

The born/coul/dsf style computes the Coulomb contribution with the damped shifted force model as in the coul/ds style.  

Note that these potentials are related to the Buckingham potential.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• A (energy units)   
• $\rho$ (distance units)   
• $\sigma$ (distance units)   
• C (energy units \* distance units $\wedge_{6}$ )  

# 4.20. pair_style born/coul/dsf command  

# LAMMPS Documentation, Release 4Feb2025  

• D (energy units \* distance units^8) • cutoff (distance units)  

The second coefficient, rho, must be greater than zero.  

The last coefficient is optional. If not specified, the global A,C,D cutoff specified in the pair_style command is used.  

For born/coul/long, born/coul/wolf and born/coul/dsf no Coulombic cutoff can be specified for an individual I,J typ pair. All type pairs use the same global Coulombic cutoff specified in the pair_style command.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.20.4 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles do not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

These styles support the pair_modify shift option for the energy of the exp(), $1/\mathrm{r}\Lambda/6$ , and $1/\mathrm{r}^{\Lambda}8$ portion of the pair interaction.  

The born/coul/long pair style supports the pair_modify table option to tabulate the short-range portion of the long-range Coulombic interaction.  

These styles support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

Thess styles writes thei information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.20.5 Restrictions  

The born/coul/long style is part of the KSPACE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

The born/coul/dsf and born/coul/wolf pair styles are part of the EXTRA-PAIR package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.20.6 Related commands  

pair_coeff , pair_style buck  

# 4.20.7 Default  

none  

Fumi and Tosi, J Phys Chem Solids, 25, 31 (1964), Fumi and Tosi, J Phys Chem Solids, 25, 45 (1964).  

# 4.21 pair_style born/gauss command  

# 4.21.1 Syntax  

• born/gauss $=$ name of the pair style cutof $=$ global cutoff (distance units)  

# 4.21.2 Examples  

<html><body><table><tr><td>pair_style born/gauss 10.0</td></tr><tr><td>pair coeff f 1 1 8.2464e13 12.48 0.042644277 0.44 3.56</td></tr><tr><td></td></tr></table></body></html>  

# 4.21.3 Description  

Added in version 28Mar2023.  

Pair style born/gauss computes pairwise interactions from a combination of a Born-Mayer repulsive term and a Gaussian attractive term according to (Bomont):  

$$
E=A_{0}\exp{(-\alpha r)}-A_{1}\exp{\left[-\beta\left(r-r_{0}\right)^{2}\right]}\qquadr<r_{c}
$$  

$r_{c}$ is the cutoff.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• $A_{0}$ (energy units) • $\alpha$ (1/distance units) • $A_{1}$ (energy units) • $\beta$ (1/(distance units)^2) • $r_{0}$ (distance units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global cutoff is used.  

# 4.21.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This pair style supports the pair_modify shift option for the energy of the pair interaction.   
The pair_modify table options are not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.21.5 Restrictions  

This pair style is only enabled if LAMMPS was built with the EXTRA-PAIR package. See the Build package page for more info.  

# 4.21.6 Related commands  

pair_coeff , pair_style born  

# 4.21.7 Default  

none  

(Bomont) Bomont, Bretonnet, J. Chem. Phys. 124, 054504 (2006)  

# 4.22 pair_style bpm/spring command  

# 4.22.1 Syntax  

pair_style bpm/spring keyword value ...  

• optional keyword $=$ anharmonic anharmonic value ${\it\Delta\phi}=\mathrm{yes}$ or no whether forces include the anharmonic term  

# 4.22.2 Examples  

pair_style bpm/spring pair_coeff \* \* 1.0 1.0 1.0 pair_style bpm/spring anharmonic yes pair_coeff 1 1 1.0 1.0 1.0 50.0  

# 4.22.3 Description  

Added in version 4May2022.  

Style bpm/spring computes pairwise forces with the formula  

$$
F=k(r-r_{c})+k_{a}(r-r_{c})^{3}
$$  

where $k$ is a stiffness, $r_{c}$ is the cutoff length, and $k_{a}$ is an optional anharmonic cubic prefactor that can be enabled using the anharmonic keyword. The anharmonic term may be useful in scenarios that need to prevent large particle overlap.  

An additional damping force is also applied to interacting particles. The force is proportional to the difference in the normal velocity of particles  

$$
F_{D}=-\gamma{w}(\hat{r}\bullet\vec{\nu})
$$  

where γ is the damping strength, $\hat{r}$ is the radial normal vector, $\vec{\nu}$ is the velocity difference between the two particles, and $w$ is a smoothing factor. This smoothing factor is constructed such that damping forces go to zero as particles come out of contact to avoid discontinuities. It is given by  

$$
w=1.0-\left(\frac{r}{r_{c}}\right)^{8}.
$$  

This pair style is designed for use in a spring-based bonded particle model. It mirrors the construction of the bpm/spring bond style.  

This pair interaction is always applied to pairs of non-bonded particles that are within the interaction distance. For pairs of bonded particles that are within the interaction distance, there is the option to either include this pair interaction and overlay the pair force over the bond force or to exclude this pair interaction such that the two particles only interact via the bond force. See discussion of the overlay/pair option for BPM bond styles and the special_bonds command in the how to page on BPMs for more details.  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• $k$ (force/distance units) • $r_{c}$ (distance units) • γ (force/velocity units)  

Added in version 4Feb2025.  

Additionally, if anharmonic is set to yes, a fourth coefficient must be provided:  

• $k_{a}$ (force/distance^3 units)  

# 4.22.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the A coefficient and cutoff distance for this pair style can be mixed. A is always mixed via a geometric rule. The cutoff is mixed according to the pair_modify mix value. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style does not support the pair_modify shift option, since the pair interaction goes to 0.0 at the cutoff.  

The pair_modify table and tail options are not relevant for this pair style.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.22.5 Restrictions  

This pair style is part of the BPM package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.22. pair_style bpm/spring command  

# 4.22.6 Related commands  

pair_coeff , bond bpm/spring  

# 4.22.7 Default  

The option defaults are anharmonic $=n o$  

# 4.23 pair_style brownian command  

Accelerator Variants: brownian/omp, brownian/kk  

# 4.24 pair_style brownian/poly command  

Accelerator Variants: brownian/poly/omp  

# 4.24.1 Syntax  

pair_style style mu flaglog flagfld cutinner cutoff t_target seed flagHI flagVF  

• style $=$ brownian or brownian/poly   
• $\mathrm{mu}=$ dynamic viscosity (dynamic viscosity units)   
• flaglog $=0/1$ log terms in the lubrication approximation on/off   
• flagfld $=0/1$ to include/exclude Fast Lubrication Dynamics effects   
• cutinner $=$ inner cutoff distance (distance units)   
• cutof $=$ outer cutoff for interactions (distance units)   
• t_target $=$ target temp of the system (temperature units)   
• seed $=$ seed for the random number generator (positive integer)   
• flagHI (optional) $=0/1$ to include/exclude $1/\mathrm{r}$ hydrodynamic interactions   
• flagVF (optional) $=0/1$ to include/exclude volume fraction corrections in the long-range isotropic terms  

# 4.24.2 Examples  

pair_style brownian 1.5 1 1 2.01 2.5 2.0 5878567 # (assuming radius $=1$ )   
pair_coeff 1 1 2.05 2.8   
pair_coeff \* \*  

# 4.24.3 Description  

Styles brownian and brownian/poly compute Brownian forces and torques on finite-size spherical particles. The former requires monodisperse spherical particles; the latter allows for polydisperse spherical particles.  

These pair styles are designed to be used with either the pair_style lubricate or pair_style lubricateU commands to provide thermostatting when dissipative lubrication forces are acting. Thus the parameters mu, flaglog, flagfld, cutinner, and cutoff should be specified consistent with the settings in the lubrication pair styles. For details, refer to either of the lubrication pair styles.  

The t_target setting is used to specify the target temperature of the system. The random number seed is used to generate random numbers for the thermostatting procedure.  

The flagHI and flagVF settings are optional. Neither should be used, or both must be defined.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• cutinner (distance units) • cutoff (distance units)  

The two coefficients are optional. If neither is specified, the two cutoffs specified in the pair_style command are used.   
Otherwise both must be specified.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.24.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the two cutoff distances for these pair styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

These pair styles do not support the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for these pair styles.  

These pair styles do not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.24.5 Restrictions  

These styles are part of the COLLOID package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Only spherical monodisperse particles are allowed for pair_style brownian.  

Only spherical particles are allowed for pair_style brownian/poly.  

These pair styles are only compatible with the following wall fixes: doc:fix wall/lj93, fix wall/lj126, fix wall/lj1043, fix wall/colloid, fix wall/harmonic, fix wall/lepton, fix wall/morse, fix wall/table <fix_wall>.  

# 4.24.6 Related commands  

pair_coeff , pair_style lubricate, pair_style lubricateU  

# 4.24.7 Default  

The default settings for the optional args are flagHI $=1$ and $\mathrm{{flagVF}=1}$ .  

# 4.25 pair_style buck command  

Accelerator Variants: buck/gpu, buck/intel, buck/kk, buck/omp  

# 4.26 pair_style buck/coul/cut command  

Accelerator Variants: buck/coul/cut/gpu, buck/coul/cut/intel, buck/coul/cut/kk, buck/coul/cut/omp  

# 4.27 pair_style buck/coul/long command  

Accelerator Variants: buck/coul/long/gpu, buck/coul/long/intel, buck/coul/long/kk, buck/coul/long/omp  

# 4.28 pair_style buck/coul/msm command  

Accelerator Variants: buck/coul/msm/omp  

# 4.28.1 Syntax  

(continued from previous page)  

<html><body><table><tr><td>pair _coeff * * 100.0 1.5 200.0</td><td></td><td></td><td></td></tr><tr><td>pair rc0eff 1 1 100.0 1.5 200.0 9.0 pair_ coef 1 1 100.0 1.5 200.0 9.0 8.0</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>pair</td><td>r_style buck/coul/long 10.0</td><td></td><td></td></tr><tr><td>pair</td><td>style buck/coul/long 10.0 8.0</td><td></td><td></td></tr><tr><td>pair</td><td>coeff * * 100.0 1.5 200.0</td><td></td><td></td></tr><tr><td></td><td>pair_ coeff 1 1 100.0 1.5 200.0 9.0</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>pair</td><td>pair_style buck/coul/msm 10.0 _style buck/coul/msm 10.0 8.0</td><td></td><td></td></tr><tr><td>pair</td><td>coeff * * 100.0 1.5 200.0</td><td></td><td></td></tr><tr><td>pair</td><td>:c0eff 1 1 100.0 1.5 200.0 9.0</td><td></td><td></td></tr></table></body></html>  

# 4.28.3 Description  

The buck style computes a Buckingham potential $\mathrm{(exp/6}$ instead of Lennard-Jones 12/6) given by  

$$
E=A e^{-r/\rho}-{\frac{C}{r^{6}}}\qquadr<r_{c}
$$  

where $\rho$ is an ionic-pair dependent length parameter, and $r_{c}$ is the cutoff on both terms.  

The styles with coul/cut or coul/long or coul/msm add a Coulombic term as described for the lj/cut pair styles. For buck/coul/long and buc/coul/msm, an additional damping factor is applied to the Coulombic term so it can be used in conjunction with the kspace_style command and its ewald or pppm or msm option. The Coulombic cutoff specified for this style means that pairwise interactions within this distance are computed directly; interactions outside that distance are computed in reciprocal space.  

If one cutoff is specified for the born/coul/cut and born/coul/long and born/coul/msm styles, it is used for both the A,C and Coulombic terms. If two cutoffs are specified, the first is used as the cutoff for the A,C terms, and the second is the cutoff for the Coulombic term.  

Note that these potentials are related to the Born-Mayer-Huggins potential.  

![](images/72a216f03a2847b90d5e94069f9c92b275e901bf1953090daa94809d1f7b2d06.jpg)  

# Note  

For all these pair styles, the terms with A and C are always cutoff. The additional Coulombic term can be cutoff or long-range (no cutoff) depending on whether the style name includes coul/cut or coul/long or coul/msm. If you wish the $\mathrm{C}/\mathrm{r}{}^{\wedge}6$ term to be long-range (no cutoff), then see the pair_style buck/long/coul/long command.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• A (energy units) • $\rho$ (distance units) • C (energy-distance^6 units) • cutoff (distance units) • cutoff2 (distance units)  

The second coefficient, $\rho$ , must be greater than zero. The coefficients A, $\rho$ , and $\mathrm{^C}$ can be written as analytical expressions of $\varepsilon$ and $\sigma$ , in analogy to the Lennard-Jones potential (Khrapak).  

The latter 2 coefficients are optional. If not specified, the global A,C and Coulombic cutoffs are used. If only one cutoff is specified, it is used as the cutoff for both A,C and Coulombic interactions for this type pair. If both coefficients are specified, they are used as the A,C and Coulombic cutoffs for this type pair. You cannot specify 2 cutoffs for style buck, since it has no Coulombic terms. For buck/coul/long only the LJ cutoff can be specified since a Coulombic cutoff cannot be specified for an individual I,J type pair. All type pairs use the same global Coulombic cutoff specified in the pair_style command.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.28.4 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles do not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

These styles support the pair_modify shift option for the energy of the exp() and $1/\mathrm{r}{\wedge}6$ portion of the pair interaction.  

The buck/coul/long pair style supports the pair_modify table option to tabulate the short-range portion of the long-range Coulombic interaction.  

These styles support the pair_modify tail option for adding long-range tail corrections to energy and pressure for the A,C terms in the pair interaction.  

These styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.28.5 Restrictions  

The buck/coul/long style is part of the KSPACE package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.28.6 Related commands  

pair_coeff , pair_style born  

# 4.28.7 Default  

none (Khrapak) Khrapak, Chaudhuri, and Morfill, J Chem Phys, 134, 054120 (2011).  

# 4.29 pair_style buck6d/coul/gauss/dsf command  

# 4.30 pair_style buck6d/coul/gauss/long command  

# 4.30.1 Syntax  

pair_style style args  

• style $=$ buck6d/coul/gauss/dsf or buck6d/coul/gauss/long • args $=$ list of arguments for a particular style  

buck6d/coul/gauss/dsf args $=$ smooth cutoff (cutoff2) smooth $=$ smoothing onset within Buckingham cutoff (ratio) cutoff $=$ global cutoff for Buckingham (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)   
buck6d/coul/gauss/long args $=$ smooth smooth2 cutoff (cutoff2) smooth $=$ smoothing onset within Buckingham cutoff (ratio) smooth $2\:=\:$ smoothing onset within Coulombic cutoff (ratio) cutoff $=$ global cutoff for Buckingham (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)  

# 4.30.2 Examples  

pair_style buck6d/coul/gauss/dsf 0.9000 12.0000   
pair_coeff 1 1 1030. 3.061 457.179 4.521 0.608   
pair_style buck6d/coul/gauss/long 0.9000 1.0000 12.0000   
pair_coeff 1 1 1030. 3.061 457.179 4.521 0.608  

# 4.30.3 Description  

The buck6d/coul/gauss styles evaluate vdW and Coulomb interactions following the MOF-FF force field after (Schmid). The vdW term of the buck6d styles computes a dispersion damped Buckingham potential:  

$$
E=A e^{-\kappa r}-\frac{C}{r^{6}}\cdot\frac{1}{1+D r^{14}}\qquadr<r_{c}
$$  

where A and C are a force constant, $\kappa$ is an ionic-pair dependent reciprocal length parameter, D is a dispersion correction parameter, and the cutoff $r_{c}$ truncates the interaction distance. The first term in the potential corresponds to the Buckingham repulsion term and the second term to the dispersion attraction with a damping correction analog to the Grimme correction used in DFT. The latter corrects for artifacts occurring at short distances which become an issue for soft vdW potentials.  

The buck6d styles include a smoothing function which is invoked according to the global smoothing parameter within the specified cutoff. Hereby a parameter of i.e. 0.9 invokes the smoothing within $90\%$ of the cutoff. No smoothing is applied at a value of 1.0. For the gauss/dsf style this smoothing is only applicable for the dispersion damped Buckingham potential. For the gauss/long styles the smoothing function can also be invoked for the real space coulomb interactions which enforce continuous energies and forces at the cutoff.  

Both styles buck6d/coul/gauss/dsf and buck6d/coul/gauss/long evaluate a Coulomb potential using spherical Gaussian type charge distributions which effectively dampen electrostatic interactions for high charges at close distances. The electrostatic potential is thus evaluated as:  

$$
E=\frac{C_{q_{i}q_{j}}}{{\varepsilon}r_{i j}}\mathrm{erf}\left(\alpha_{i j}r_{i j}\right)r<r_{c}
$$  

where C is an energy-conversion constant, $q_{i}$ and $q_{j}$ are the charges on the two atoms, epsilon is the dielectric constant which can be set by the dielectric command, $\alpha$ is the ion pair dependent damping parameter and erf() is the errorfunction. The cutoff $r_{c}$ truncates the interaction distance.  

The style buck6d/coul/gauss/dsf computes the Coulomb interaction via the damped shifted force model described in (Fennell) approximating an Ewald sum similar to the pair coul/dsf styles. In buck6d/coul/gauss/long an additional damping factor is applied to the Coulombic term so it can be used in conjunction with the kspace_style command and its ewald or pppm options. The Coulombic cutoff in this case separates the real and reciprocal space evaluation of the Ewald sum.  

If one cutoff is specified it is used for both the vdW and Coulomb terms. If two cutoffs are specified, the first is used as the cutoff for the vdW terms, and the second is the cutoff for the Coulombic term.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• A (energy units) • $\rho$ (distance^-1 units) • C (energy-distance^6 units) • D (distance^14 units) • α (distance^-1 units) • cutoff (distance units)  

The second coefficient, $\rho$ , must be greater than zero. The latter coefficient is optional. If not specified, the global vdW cutoff is used.  

# 4.30.4 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles do not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

These styles do not support the pair_modify shift option for the energy. Instead the smoothing function should be applied by setting the global smoothing parameter to a value $<1.0$ .  

These styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

# 4.30.5 Restrictions  

These styles are part of the MOFFF package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.30.6 Related commands  

pair_coeff  

# 4.30.7 Default  

none  

(Schmid) S. Bureekaew, S. Amirjalayer, M. Tafipolsky, C. Spickermann, T.K. Roy and R. Schmid, Phys. Status Solidi B, 6, 1128 (2013).  

(Fennell) C. J. Fennell, J. D. Gezelter, J Chem Phys, 124, 234104 (2006).  

# 4.31 pair_style buck/long/coul/long command  

Accelerator Variants: buck/long/coul/long/omp  

# 4.31.1 Syntax  

pair_style buck/long/coul/long flag_buck flag_coul cutoff (cutoff2)  

• flag_buck $=$ long or cut long $=$ use Kspace long-range summation for the dispersion term $1/\mathrm{r}^{\sim}6$ cut $=$ use a cutoff   
• flag_coul $=$ long or off long $=$ use Kspace long-range summation for the Coulombic term $1/\mathrm{r}$ off $=$ omit the Coulombic term   
• cutof $=$ global cutoff for Buckingham (and Coulombic if only 1 cutoff) (distance units)   
• cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)  

# 4.31.2 Examples  

pair_style buck/long/coul/long cut off 2.5   
pair_style buck/long/coul/long cut long 2.5 4.0   
pair_style buck/long/coul/long long long 4.0   
pair_coeff \* \* 1 1   
pair_coeff 1 1 1 3 4  

# 4.31.3 Description  

The buck/long/coul/long style computes a Buckingham potential $\mathrm{(exp/6}$ instead of Lennard-Jones 12/6) and Coulombic potential, given by  

$$
\begin{array}{l}{{\displaystyle{E=A e^{-r/\rho}-\frac{C}{r^{6}}\qquadr<r_{c}}}}\ {{\displaystyle{E=\frac{C q_{i}q_{j}}{\varepsilon r}\qquadr<r_{c}}}}\end{array}
$$  

$r_{c}$ is the cutoff. If one cutoff is specified in the pair_style command, it is used for both the Buckingham and Coulombic terms. If two cutoffs are specified, they are used as cutoffs for the Buckingham and Coulombic terms respectively.  

The purpose of this pair style is to capture long-range interactions resulting from both attractive $1/\mathrm{r}{\wedge}6$ Buckingham and Coulombic $1/\mathrm{r}$ interactions. This is done by use of the flag_buck and flag_coul settings. The Ismail paper has more details on when it is appropriate to include long-range $1/\mathrm{r}{\wedge}6$ interactions, using this potential.  

If flag_buck is set to long, no cutoff is used on the Buckingham $1/\mathrm{r}{\wedge}6$ dispersion term. The long-range portion can be calculated by using the kspace_style ewald/disp or pppm/disp commands. The specified Buckingham cutoff then determines which portion of the Buckingham interactions are computed directly by the pair potential versus which part is computed in reciprocal space via the Kspace style. If flag_buck is set to cut, the Buckingham interactions are simply cutoff, as with pair_style buck.  

If flag_coul is set to long, no cutoff is used on the Coulombic interactions. The long-range portion can calculated by using any of several kspace_style command options such as pppm or ewald. Note that if flag_buck is also set to long, then the ewald/disp or pppm/disp Kspace style needs to be used to perform the long-range calculations for both the Buckingham and Coulombic interactions. If flag_coul is set to off, Coulombic interactions are not computed.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• A (energy units) • rho (distance units) • C (energy-distance^6 units) • cutoff (distance units) • cutoff2 (distance units)  

The second coefficient, rho, must be greater than zero.  

The latter 2 coefficients are optional. If not specified, the global Buckingham and Coulombic cutoffs specified in the pair_style command are used. If only one cutoff is specified, it is used as the cutoff for both Buckingham and Coulombic interactions for this type pair. If both coefficients are specified, they are used as the Buckingham and Coulombic cutoffs for this type pair. Note that if you are using flag_buck set to long, you cannot specify a Buckingham cutoff for an atom type pair, since only one global Buckingham cutoff is allowed. Similarly, if you are using flag_coul set to long, you cannot specify a Coulombic cutoff for an atom type pair, since only one global Coulombic cutoff is allowed.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.31.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This pair style supports the pair_modify shift option for the energy of the exp() and $1/\mathrm{r}{\wedge}6$ portion of the pair interaction, assuming flag_buck is cut.  

This pair style does not support the pair_modify shift option for the energy of the Buckingham portion of the pair interaction.  

This pair style supports the pair_modify table and table/disp options since they can tabulate the short-range portion of the long-range Coulombic and dispersion interactions.  

This pair style write its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style supports the use of the inner, middle, and outer keywords of the run_style respa command, meaning the pairwise forces can be partitioned by distance at different levels of the rRESPA hierarchy. See the run_style command for details.  

# 4.31.5 Restrictions  

This style is part of the KSPACE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.31.6 Related commands  

pair_coeff  

# 4.31.7 Default  

none  

(Ismail) Ismail, Tsige, In ‘t Veld, Grest, Molecular Physics (accepted) (2007).  

# 4.32 pair_style lj/charmm/coul/charmm command  

Accelerator Variants: lj/charmm/coul/charmm/gpu, lj/charmm/coul/charmm/intel, lj/charmm/coul/charmm/kk, lj/charmm/coul/charmm/omp  

4.33 pair_style lj/charmm/coul/charmm/implicit command  

Accelerator Variants: lj/charmm/coul/charmm/implicit/kk, lj/charmm/coul/charmm/implicit/omp  

# 4.34 pair_style lj/charmm/coul/long command  

Accelerator Variants: lj/charmm/coul/long/gpu, lj/charmm/coul/long/intel, lj/charmm/coul/long/kk, lj/charmm/coul/long/opt, lj/charmm/coul/long/omp  

# 4.35 pair_style lj/charmm/coul/msm command  

Accelerator Variants: lj/charmm/coul/msm/omp  

4.36 pair_style lj/charmmfsw/coul/charmmfsh command  

4.37 pair_style lj/charmmfsw/coul/long command  

Accelerator Variants: lj/charmmfsw/coul/long/kk  

# 4.37.1 Syntax  

pair_style style args  

• style $=$ lj/charmm/coul/charmm or lj/charmm/coul/charmm/implicit or lj/charmm/coul/long or lj/charmm/coul/msm or lj/charmmfsw/coul/charmmfsh or lj/charmmfsw/coul/long   
• args $=$ list of arguments for a particular style   
lj/charmm/coul/charmm args $=$ inner outer (inner2) (outer2)   
inner, outer = global switching cutoffs for Lennard Jones (and Coulombic if only 2 args) inner2, outer2 = global switching cutoffs for Coulombic (optional)   
lj/charmm/coul/charmm/implicit args = inner outer (inner2) (outer2) inner, outer = global switching cutoffs for LJ (and Coulombic if only 2 args) inner2, outer2 = global switching cutoffs for Coulombic (optional)   
lj/charmm/coul/long args = inner outer (cutoff) inner, outer = global switching cutoffs for LJ (and Coulombic if only 2 args) cutoff = global cutoff for Coulombic (optional, outer is Coulombic cutoff if only 2 args)   
lj/charmm/coul/msm args = inner outer (cutoff) inner, outer = global switching cutoffs for LJ (and Coulombic if only 2 args)   
cutoff = global cutoff for Coulombic (optional, outer is Coulombic cutoff if only 2 args)   
lj/charmmfsw/coul/charmmfsh args = inner outer (cutoff) inner, outer = global cutoffs for LJ (and Coulombic if only 2 args) cutoff = global cutoff for Coulombic (optional, outer is Coulombic cutoff if only 2 args)   
lj/charmmfsw/coul/long args = inner outer (cutoff) inner, outer = global cutoffs for LJ (and Coulombic if only 2 args) cutoff $=$ global cutoff for Coulombic (optional, outer is Coulombic cutoff if only 2 args)  

# 4.37.2 Examples  

pair_style lj/charmm/coul/charmm 8.0 10.0   
pair_style lj/charmm/coul/charmm 8.0 10.0 7.0 9.0   
pair_style lj/charmmfsw/coul/charmmfsh 10.0 12.0   
pair_style lj/charmmfsw/coul/charmmfsh 10.0 12.0 9.0   
pair_coeff \* \* 100.0 2.0   
pair_coeff 1 1 100.0 2.0 150.0 3.5   
pair_style lj/charmm/coul/charmm/implicit 8.0 10.0   
pair_style lj/charmm/coul/charmm/implicit 8.0 10.0 7.0 9.0   
pair_coeff \* \* 100.0 2.0   
pair_coeff 1 1 100.0 2.0 150.0 3.5   
pair_style lj/charmm/coul/long 8.0 10.0   
pair_style lj/charmm/coul/long 8.0 10.0 9.0   
pair_style lj/charmmfsw/coul/long 8.0 10.0   
pair_style lj/charmmfsw/coul/long 8.0 10.0 9.0   
pair_coeff \* \* 100.0 2.0   
pair_coeff 1 1 100.0 2.0 150.0 3.5   
pair_style lj/charmm/coul/msm 8.0 10.0   
pair_style lj/charmm/coul/msm 8.0 10.0 9.0   
pair_coeff \* \* 100.0 2.0   
pair_coeff 1 1 100.0 2.0 150.0 3.5  

# 4.37.3 Description  

These pair styles compute Lennard Jones (LJ) and Coulombic interactions with additional switching or shifting functions that ramp the energy and/or force smoothly to zero between an inner and outer cutoff. They implement the widely used CHARMM force field, see Howto discussion on biomolecular force fields for details.  

The styles with charmm (not charmmfsw or charmmfsh) in their name are the older, original LAMMPS implementations. They compute the LJ and Coulombic interactions with an energy switching function which ramps the energy smoothly to zero between the inner and outer cutoff. This can cause irregularities in pairwise forces (due to the dis  

continuous second derivative of energy at the boundaries of the switching region), which in some cases can result in detectable artifacts in an MD simulation.  

The newer styles with charmmfsw or charmmfsh in their name replace the energy switching with force switching (fsw) and force shifting (fsh) functions, for LJ and Coulombic interactions respectively.  

# $\Theta$ Note  

The newer charmmfsw or charmmfsh styles were released in March 2017. We recommend they be used instead of the older charmm styles. This includes the newer dihedral_style charmmfsw command. Eventually code from the new styles will propagate into the related pair styles (e.g. implicit, accelerator, free energy variants).  

# Note  

The newest CHARMM pair styles reset the Coulombic energy conversion factor used internally in the code, from the LAMMPS value to the CHARMM value, as if it were effectively a parameter of the force field. This is because the CHARMM code uses a slightly different value for the this conversion factor in real units $(\mathrm{kcal/mol})$ ), namely $\mathrm{CHARMM}=332.0716,\mathrm{LAMMPS}=332.06371.$ . This is to enable more precise agreement by LAMMPS with the CHARMM force field energies and forces, when using one of these two CHARMM pair styles.  

When using the lj/charmm/coul/charmm styles, both the LJ and Coulombic terms require an inner and outer cutoff. They can be the same for both formulas or different depending on whether 2 or 4 arguments are used in the pair_style command. For the lj/charmmfsw/coul/charmmfsh style, the LJ term requires both an inner and outer cutoff, while the Coulombic term requires only one cutoff. If the Coulombic cutoff is not specified (2 instead of 3 arguments), the LJ outer cutoff is used for the Coulombic cutoff. In all cases where an inner and outer cutoff are specified, the inner cutoff distance must be less than the outer cutoff. It is typical to make the difference between the inner and outer cutoffs about 2.0 Angstroms.  

Style lj/charmm/coul/charmm/implicit computes the same formulas as style lj/charmm/coul/charmm except that an additional 1/r term is included in the Coulombic formula. The Coulombic energy thus varies as $1/\mathrm{r}^{\Lambda}2$ . This is effectively a distance-dependent dielectric term which is a simple model for an implicit solvent with additional screening. It is designed for use in a simulation of an unsolvated biomolecule (no explicit water molecules).  

Styles lj/charmm/coul/long and lj/charmm/coul/msm compute the same formulas as style lj/charmm/coul/charmm and style lj/charmmfsw/coul/long computes the same formulas as style lj/charmmfsw/coul/charmmfsh, except that an additional damping factor is applied to the Coulombic term, so it can be used in conjunction with the kspace_style command and its ewald or pppm or msm option. Only one Coulombic cutoff is specified for these styles; if only 2 arguments are used in the pair_style command, then the outer LJ cutoff is used as the single Coulombic cutoff. The Coulombic cutoff specified for these styles means that pairwise interactions within this distance are computed directly; interactions outside that distance are computed in reciprocal space.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • $\varepsilon_{14}$ (energy units) • $\sigma_{14}$ (distance units)  

Note that $\sigma$ is defined in the LJ formula as the zero-crossing distance for the potential, not as the energy minimum at $2^{1/6}\sigma$ .  

The latter 2 coefficients are optional. If they are specified, they are used in the LJ formula between two atoms of these types which are also first and fourth atoms in any dihedral. No cutoffs are specified because the CHARMM force field does not allow varying cutoffs for individual atom pairs; all pairs use the global cutoff(s) specified in the pair_style command.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.37.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the epsilon, sigma, epsilon_14, and sigma_14 coefficients for all of the lj/charmm pair styles can be mixed. The default mix value is arithmetic to coincide with the usual settings for the CHARMM force field. See the “pair_modify” command for details.  

None of the lj/charmm or lj/charmmfsw pair styles support the pair_modify shift option, since the Lennard-Jones portion of the pair interaction is smoothed to 0.0 at the cutoff.  

The lj/charmm/coul/long and lj/charmmfsw/coul/long styles support the pair_modify table option since they can tabulate the short-range portion of the long-range Coulombic interaction.  

None of the lj/charmm or lj/charmmfsw pair styles support the pair_modify tail option for adding long-range tail corrections to energy and pressure, since the Lennard-Jones portion of the pair interaction is smoothed to 0.0 at the cutoff.  

All of the lj/charmm and lj/charmmfsw pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

The lj/charmm/coul/long and lj/charmmfsw/coul/long pair styles support the use of the inner, middle, and outer keywords of the run_style respa command, meaning the pairwise forces can be partitioned by distance at different levels of the rRESPA hierarchy. The other styles only support the pair keyword of run_style respa. See the run_style command for details.  

# 4.37.5 Restrictions  

All the styles with coul/charmm or coul/charmmfsh styles are part of the MOLECULE package. All the styles with coul/long style are part of the KSPACE package. They are only enabled if LAMMPS was built with those packages. See the Build package doc page for more info.  

# 4.37.6 Related commands  

pair_coeff , angle_style charmm, dihedral_style charmm, dihedral_style charmmfsw, fix cmap  

# 4.37.7 Default  

none  

(Brooks) Brooks, et al, J Comput Chem, 30, 1545 (2009).   
(MacKerell) MacKerell, Bashford, Bellott, Dunbrack, Evanseck, Field, Fischer, Gao, Guo, Ha, et al, J Phys Chem, 102, 3586 (1998).   
(Steinbach) Steinbach, Brooks, J Comput Chem, 15, 667 (1994).  

# 4.38 pair_style lj/class2 command  

Accelerator Variants: lj/class2/gpu, lj/class2/kk, lj/class2/omp  

# 4.39 pair_style lj/class2/coul/cut command  

Accelerator Variants: lj/class2/coul/cut/kk, lj/class2/coul/cut/omp  

# 4.40 pair_style lj/class2/coul/long command  

Accelerator Variants: lj/class2/coul/long/gpu, lj/class2/coul/long/kk, lj/class2/coul/long/omp  

# 4.40.1 Syntax  

• style $=$ lj/class2 or lj/class2/coul/cut or lj/class2/coul/long • args $=$ list of arguments for a particular style  

lj/class2 args $=$ cutoff cutoff $=$ global cutoff for class 2 interactions (distance units)   
lj/class2/coul/cut args $=$ cutoff (cutoff2) cutoff $=$ global cutoff for class 2 (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)   
lj/class2/coul/long args $=$ cutoff (cutoff2) cutoff $=$ global cutoff for class 2 (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)  

# 4.40.2 Examples  

pair_style lj/class2 10.0   
pair_coeff \* \* 100.0 2.5   
pair_coeff 1 2\* 100.0 2.5 9.0   
pair_style lj/class2/coul/cut 10.0   
pair_style lj/class2/coul/cut 10.0 8.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0   
pair_coeff 1 1 100.0 3.5 9.0 9.0  

(continues on next page)  

(continued from previous page)  

pair_style lj/class2/coul/long 10.0   
pair_style lj/class2/coul/long 10.0 8.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0  

# 4.40.3 Description  

The lj/class2 styles compute a 6/9 Lennard-Jones potential given by  

$$
E=\varepsilon\left[2\left({\frac{\sigma}{r}}\right)^{9}-3\left({\frac{\sigma}{r}}\right)^{6}\right]\qquadr<r_{c}
$$  

$r_{c}$ is the cutoff.  

The lj/class2/coul/cut and lj/class2/coul/long styles add a Coulombic term as described for the lj/cut pair styles.  

See (Sun) for a description of the COMPASS class2 force field.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • cutoff1 (distance units) • cutoff2 (distance units)  

The latter 2 coefficients are optional. If not specified, the global class 2 and Coulombic cutoffs are used. If only one cutoff is specified, it is used as the cutoff for both class 2 and Coulombic interactions for this type pair. If both coefficients are specified, they are used as the class 2 and Coulombic cutoffs for this type pair. You cannot specify 2 cutoffs for style lj/class2, since it has no Coulombic terms.  

For lj/class2/coul/long only the class 2 cutoff can be specified since a Coulombic cutoff cannot be specified for an individual I,J type pair. All type pairs use the same global Coulombic cutoff specified in the pair_style command.  

If the pair_coeff command is not used to define coefficients for a particular $\mathrm{I}!=\mathrm{J}$ type pair, the mixing rule for $\varepsilon$ and $\sigma$ for all class2 potentials is to use the sixthpower formulas documented by the pair_modify command. The pair_modify mix setting is thus ignored for class2 potentials for epsilon and sigma. However it is still followed for mixing the cutof distance.  

A version of these styles with a soft core, lj/cut/soft, suitable for use in free energy calculations, is part of the FEP package and is documented with the pair_style \*/soft styles. The version with soft core is only available if LAMMPS was built with that package. See the Build package page for more info.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.40.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/class2 pair styles can be mixed. Epsilon and sigma are always mixed with the value sixthpower. The cutoff distance is mixed by whatever option is set by the pair_modify command (default $=$ geometric). See the “pair_modify” command for details.  

All of the lj/class2 pair styles support the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction.  

The lj/class2/coul/long pair style does not support the pair_modify table option since a tabulation capability has not yet been added to this potential.  

All of the lj/class2 pair styles support the pair_modify tail option for adding a long-range tail correction to the energy and pressure of the Lennard-Jones portion of the pair interaction.  

All of the lj/class2 pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

Only the lj/class2 and lj/class2/coul/long pair styles support the use of the inner, middle, and outer keywords of the run_style respa command, meaning the pairwise forces can be partitioned by distance at different levels of the rRESPA hierarchy. The other styles only support the pair keyword of run_style respa. See the run_style command for details.  

# 4.40.5 Restrictions  

These styles are part of the CLASS2 package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.40.6 Related commands  

pair_coeff , pair_style \*/soft  

# 4.40.7 Default  

# 4.41.2 Examples  

pair_style colloid 10.0  
pair_coeff \* \* 25 1.0 10.0 10.0  
pair _coeff 1 1 144 1.0 0.0 0.0 3.0  
pair coeff 1 2 75.398 1.0 0.0 10.0 9.0  
pair coeff 2 2 39.478 1.0 10.0 10.0 25.0  

# 4.41.3 Description  

Style colloid computes pairwise interactions between large colloidal particles and small solvent particles using 3 formulas. A colloidal particle has a size $>$ sigma; a solvent particle is the usual Lennard-Jones particle of size sigma.  

The colloid-colloid interaction energy is given by  

$$
U_{A}=-\frac{A_{c c}}6\left[\frac{2a_{1}a_{2}}{r^{2}-\left(a_{1}+a_{2}\right)^{2}}+\frac{2a_{1}a_{2}}{r^{2}-\left(a_{1}-a_{2}\right)^{2}}+\ln\left(\frac{r^{2}-\left(a_{1}+a_{2}\right)^{2}}{r^{2}-\left(a_{1}-a_{2}\right)^{2}}\right)\right]
$$  

$$
\begin{array}{c}{{U_{R}=\frac{A_{c c}}{37800}\frac{\sigma^{6}}{r}\left[\frac{r^{2}-7r(a_{1}+a_{2})+6\left(a_{1}^{2}+7a_{1}a_{2}+a_{2}^{2}\right)}{(r-a_{1}-a_{2})^{7}}\right.}}\ {{\mathrm{}}}\ {{\displaystyle\left.+\frac{r^{2}+7r(a_{1}+a_{2})+6\left(a_{1}^{2}+7a_{1}a_{2}+a_{2}^{2}\right)}{(r+a_{1}+a_{2})^{7}}\right.}}\ {{\mathrm{}}}\ {{\displaystyle\left.-\frac{r^{2}+7r(a_{1}-a_{2})+6\left(a_{1}^{2}-7a_{1}a_{2}+a_{2}^{2}\right)}{(r+a_{1}-a_{2})^{7}}\right.}}\ {{\mathrm{}}}\ {{\displaystyle\left.-\frac{r^{2}-7r(a_{1}-a_{2})+6\left(a_{1}^{2}-7a_{1}a_{2}+a_{2}^{2}\right)}{(r-a_{1}+a_{2})^{7}}\right]}}\end{array}
$$  

$$
U=U_{A}+U_{R},\qquadr<r_{c}
$$  

where $A_{c c}$ is the Hamaker constant, $a_{1}$ and $a_{2}$ are the radii of the two colloidal particles, and $r_{c}$ is the cutoff. This equation results from describing each colloidal particle as an integrated collection of Lennard-Jones particles of size sigma and is derived in (Everaers).  

The colloid-solvent interaction energy is given by  

$$
U=\frac{2a^{3}\sigma^{3}A_{c s}}{9\left(a^{2}-r^{2}\right)^{3}}\left[1-\frac{\left(5a^{6}+45a^{4}r^{2}+63a^{2}r^{4}+15r^{6}\right)\sigma^{6}}{15\left(a-r\right)^{6}\left(a+r\right)^{6}}\right],\quad r<r_{c}
$$  

where $A_{c s}$ is the Hamaker constant, $a$ is the radius of the colloidal particle, and $r_{c}$ is the cutoff. This formula is derived from the colloid-colloid interaction, letting one of the particle sizes go to zero.  

The solvent-solvent interaction energy is given by the usual Lennard-Jones formula  

$$
U=\frac{A_{s s}}{36}\left[\left(\frac{\displaystyle\sigma}{\displaystyle r}\right)^{12}-\left(\frac{\displaystyle\sigma}{\displaystyle r}\right)^{6}\right],\quad r<r_{c}
$$  

with $A_{s s}$ set appropriately, which results from letting both particle sizes go to zero.  

When used in combination with pair_style yukawa/colloid, the two terms become the so-called DLVO potential, which combines electrostatic repulsion and van der Waals attraction.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• A (energy units) • $\sigma$ (distance units) • d1 (distance units) • d2 (distance units) • cutoff (distance units)  

A is the Hamaker energy prefactor and should typically be set as follows:  

$\bullet A_{c c}=\operatorname{colloid}/\operatorname{colloid}=4\pi^{2}=39.5$   
$\textbf{\textit{A}}_{c s}=\mathrm{colloid/solvent}=\sqrt{A_{c c}A_{s s}}$   
• $A_{s s}=$ solvent/solvent = 144 (assuming epsilon $=1$ , so that $144/36=4$ )  

$\sigma$ is the size of the solvent particle or the constituent particles integrated over in the colloidal particle and should typically be set as follows:  

• $\sigma_{c c}=\mathrm{colloid/colloid}=1.0$ • $\sigma_{c s}=$ colloid/solvent $=$ arithmetic mixing between colloid $\sigma$ and solvent $\sigma$ • $\sigma_{s s}=$ solvent/solvent $=1.0$ or whatever size the solvent particle is  

Thus typically $\sigma_{c s}=1.0$ , unless the solvent particle’s size $\mathrel{\mathop:}=1.0$ .  

D1 and d2 are particle diameters, so that $\mathrm{d}1=2^{*}\mathrm{a}1$ and $\mathrm{d}2=2^{*}\mathrm{a}2$ in the formulas above. Both d1 and d2 must be values $>=0$ . If $\mathrm{d}1>0$ and $\mathrm{d}2>0$ , then the pair interacts via the colloid-colloid formula above. If $\mathrm{d}1=0$ and $\mathrm{d}2=0$ , then the pair interacts via the solvent-solvent formula. I.e. a d value of 0 is a Lennard-Jones particle of size $\sigma$ . If either $\mathrm{d}1=0$ or $\mathrm{d}2=0$ and the other is larger, then the pair interacts via the colloid-solvent formula.  

Note that the diameter of a particular particle type may appear in multiple pair_coeff commands, as it interacts with other particle types. You should ensure the particle diameter is specified consistently each time it appears.  

The last coefficient is optional. If not specified, the global cutoff specified in the pair_style command is used. However, you typically want different cutoffs for interactions between different particle sizes. E.g. if colloidal particles of diameter 10 are used with solvent particles of diameter 1, then a solvent-solvent cutoff of 2.5 would correspond to a colloid-colloid cutoff of 25. A good rule-of-thumb is to use a colloid-solvent cutoff that is half the big diameter $+4$ times the small diameter. I.e. $9=5+4$ for the colloid-solvent cutoff in this case.  

# Note  

When using pair_style colloid for a mixture with 2 (or more) widely different particles sizes (e.g. sigma $=10$ colloids in a background sigma $^{=1}$ LJ fluid), you will likely want to use these commands for efficiency: neighbor multi and comm_modify multi.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.41.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the A, sigma, d1, and d2 coefficients and cutoff distance for this pair style can be mixed. A is an energy value mixed like a LJ epsilon. D1 and d2 are distance values and are mixed like sigma. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style supports the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.41.5 Restrictions  

This style is part of the COLLOID package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Normally, this pair style should be used with finite-size particles which have a diameter, e.g. see the atom_style sphere command. However, this is not a requirement, since the only definition of particle size is via the pair_coeff parameters for each type. In other words, the physical radius of the particle is ignored. Thus you should ensure that the d1,d2 parameters you specify are consistent with the physical size of the particles of that type.  

Per-particle polydispersity is not yet supported by this pair style; only per-type polydispersity is enabled via the pair_coeff parameters.  

# 4.41.6 Related commands  

pair_coeff  

# 4.41.7 Default  

keyword $=$ polar polar value $=$ polar_on or polar_off $=$ whether or not to include atomic polarization  

# 4.43.2 Examples  

pair_style comb   
pair_coeff \* \* ../potentials/ffield.comb Si   
pair_coeff \* \* ../potentials/ffield.comb Hf Si O   
pair_style comb3 polar_off   
pair_coeff \* \* ../potentials/ffield.comb3 O Cu N C O  

# 4.43.3 Description  

Style comb computes the second generation variable charge COMB (Charge-Optimized Many-Body) potential. Style comb3 computes the third-generation COMB potential. These COMB potentials are described in (COMB) and (COMB3). Briefly, the total energy $E_{T}$ of a system of atoms is given by  

$$
\begin{array}{r}{E_{T}=\displaystyle\sum_{i}[E_{i}^{s e l f}(q_{i})+\sum_{j>i}[E_{i j}^{s h o r t}(r_{i j},q_{i},q_{j})+E_{i j}^{C o u l}(r_{i j},q_{i},q_{j})]+}\ {E^{p o l a r}(q_{i},r_{i j})+E^{v d W}(r_{i j})+E^{b a r r}(q_{i})+E^{c o r r}(r_{i j},\theta_{j i k})]}\end{array}
$$  

where $E_{i}^{s e l f}$ is the self-energy of atom $i$ (including atomic ionization energies and electron affinities), $E_{i j}^{s h o r t}$ is the bondorder potential between atoms $i$ and $j,$ , $E_{i j}^{C o u l}$ is the Coulomb interactions, $E^{p o l a r}$ is the polarization term for organic systems (style comb3 only), $E^{\nu d W}$ is the van der Waals energy (style comb3 only), $E^{b a r r}$ is a charge barrier function, and $E^{c o r r}$ are angular correction terms.  

The COMB potentials (styles comb and comb3) are variable charge potentials. The equilibrium charge on each atom is calculated by the electronegativity equalization (QEq) method. See Rick for further details. This is implemented by the fix qeq/comb command, which should normally be specified in the input script when running a model with the COMB potential. The fix qeq/comb command has options that determine how often charge equilibration is performed, its convergence criterion, and which atoms are included in the calculation.  

Only a single pair_coeff command is used with the comb and comb3 styles which specifies the COMB potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the potential file in the pair_coeff command, where N is the number of LAMMPS atom types.  

For example, if your LAMMPS simulation of a Si/SiO2/ HfO2 interface has 4 atom types, and you want the first and last to be Si, the second to be Hf, and the third to be O, and you would use the following pair_coeff command:  

pair_coeff \* \* ../potentials/ffield.comb Si Hf O Si  

The first two arguments must be $^{**}$ so as to span all LAMMPS atom types. The first and last Si arguments map LAMMPS atom types 1 and 4 to the Si element in the ffield.comb file. The second Hf argument maps LAMMPS atom type 2 to the Hf element, and the third O argument maps LAMMPS atom type 3 to the O element in the potential file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a comb potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

For style comb, the provided potential file ffield.comb contains all currently-available second generation COMB parameterizations: for Si, Cu, Hf, Ti, O, their oxides and Zr, Zn and U metals. For style comb3, the potential file ffield.comb3 contains all currently-available third generation COMB parameterizations: O, Cu, N, C, H, Ti, Zn and Zr. The status of the optimization of the compounds, for example Cu2O, TiN and hydrocarbons, are given in the following table:  

<html><body><table><tr><td></td><td>0 Cu</td><td>N</td><td>C</td><td>H</td><td>Ti</td><td>Zn</td><td>Zr</td></tr><tr><td>0</td><td>F F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td></tr><tr><td>Cu</td><td>F F</td><td>P</td><td>F</td><td>F</td><td>P</td><td>F</td><td>P</td></tr><tr><td>N</td><td>F P</td><td>F</td><td>M</td><td>F</td><td>P</td><td>P</td><td>P</td></tr><tr><td>C</td><td>F F</td><td>M</td><td>F</td><td>F</td><td>M</td><td>M</td><td>M</td></tr><tr><td>H</td><td>F F</td><td>F</td><td>F</td><td>F</td><td>M</td><td>M</td><td>F</td></tr><tr><td>Ti</td><td>F P</td><td>P</td><td>M</td><td>M</td><td>F</td><td>P</td><td>P</td></tr><tr><td>Zn</td><td>F F</td><td>P</td><td>M</td><td>M</td><td>P</td><td>F</td><td>P</td></tr><tr><td>Zr</td><td>F P</td><td>P</td><td>M</td><td>F</td><td>P</td><td>P</td><td>F</td></tr></table></body></html>  

• $\mathrm{F}=$ Fully optimized • $\mathbf{M}=$ Only optimized for dimer molecule • $\mathrm{P}=\mathrm{in}$ progress, but have it from mixing rule  

For style comb3, in addition to ffield.comb3, a special parameter file, lib.comb3, that is exclusively used for C/O/H systems, will be automatically loaded if carbon atom is detected in LAMMPS input structure. This file must be in your working directory or in the directories listed in the environment variable LAMMPS_POTENTIALS, as described on the pair_coeff command doc page.  

The keyword polar indicates whether the force field includes the atomic polarization. Since the equilibration of the polarization has not yet been implemented, it can only set polar_off at present.  

![](images/91eb3e54a02fd418f0bf23b7f5395b8e3ad95bca1d0b8cefcfed44b5721edc75.jpg)  

# Note  

You can not use potential file ffield.comb with style comb3, nor file ffield.comb3 with style comb.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.43.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS as described above from values in the potential file.  

These pair styles does not support the pair_modify shift, table, and tail options.  

These pair styles do not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style, pair_coeff, and fix qeq/comb commands in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.43.5 Restrictions  

These pair styles are part of the MANYBODY package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

These pair styles requires the newton setting to be “on” for pair interactions.  

The COMB potentials in the ffield.comb and ffield.comb3 files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use the COMB potential with any LAMMPS units, but you would need to create your own COMB potential file with coefficients listed in the appropriate units if your simulation does not use “metal” units.  

# 4.43.6 Related commands  

pair_style, pair_coeff , fix qeq/comb  

# 4.43.7 Default  

none  

(COMB) T.-R. Shan, B. D. Devine, T. W. Kemper, S. B. Sinnott, and S. R. Phillpot, Phys. Rev. B 81, 125328 (2010) (COMB3) T. Liang, T.-R. Shan, Y.-T. Cheng, B. D. Devine, M. Noordhoek, Y. Li, Z. Lu, S. R. Phillpot, and S. B. Sinnott, Mat. Sci. & Eng: R 74, 255-279 (2013).   
(Rick) S. W. Rick, S. J. Stuart, B. J. Berne, J Chem Phys 101, 6141 (1994).  

# 4.44 pair_style cosine/squared command  

# 4.44.1 Syntax  

pair_style cosine/squared cutoff  

• cutof $=$ global cutoff for cosine-squared interactions (distance units)  

pair_coeff I J eps sigma pair_coeff I J eps sigma cutoff pair_coeff I J eps sigma wca pair_coeff I J eps sigma cutoff wca  

• $\mathrm{I},\mathrm{J}=\mathrm{a}$ particle type   
• eps $=$ interaction strength, i.e. the depth of the potential minimum (energy units)   
• sigma $=$ distance of the potential minimum from 0   
• cutof $=$ the cutoff distance for this pair type, if different from global (distance units)   
• wca $=$ if specified a Weeks-Chandler-Andersen potential (with eps strength and minimum at sigma) is added, otherwise not  

# 4.44.2 Examples  

pair_style cosine/squared 3.0   
pair_coeff \* \* 1.0 1.3   
pair_coeff 1 3 1.0 1.3 2.0  

(continues on next page)  

(continued from previous page)  

pair_coeff 1 3 1.0 1.3 wca pair_coeff 1 3 1.0 1.3 2.0 wca  

# 4.44.3 Description  

Style cosine/squared computes a potential of the form  

$$
E=\left\{\begin{array}{l l}{-\varepsilon}&{\quad r<\sigma}\ {-\varepsilon\cos\left(\frac{\pi(r-\sigma)}{2(r_{c}-\sigma)}\right)^{2}}&{\quad\sigma\leq r<r_{c}}\ {0}&{\quad r\geq r_{c}}\end{array}\right.
$$  

between two point particles, where $(\sigma,-\varepsilon)$ is the location of the (rightmost) minimum of the potential, as explained in the syntax section above.  

This potential was first used in (Cooke) for a coarse-grained lipid membrane model. It is generally very useful as a non-specific interaction potential because it is fully adjustable in depth and width while joining the minimum at (sigma, -epsilon) and zero at (cutoff, 0) smoothly, requiring no shifting and causing no related artifacts, tail energy calculations etc. This evidently requires cutoff to be larger than sigma.  

If the wca option is used then a Weeks-Chandler-Andersen potential (Weeks) is added to the above specified cosinesquared potential, specifically the following:  

$$
E=\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12}-2\left(\frac{\sigma}{r}\right)^{6}+1\right],\quad r<\sigma
$$  

In this case, and this case only, the $\sigma$ parameter can be equal to cutoff ( $\sigma=$ cutoff) which will result in ONLY the WCA potential being used (and print a warning), so the minimum will be attained at (sigma, 0). This is a convenience feature that enables a purely repulsive potential to be used without a need to define an additional pair style and use the hybrid styles.  

The energy and force of this pair style for parameters epsilon $=1.0$ , sigma $=1.0$ , cutoff $=2.5$ , with and without the WCA potential, are shown in the graphs below:  

![](images/5e4bc28cce8bd801509708c93be2b4f85771155788a464c1280a3b913e820387.jpg)  

# 4.44.4 Mixing, shift, table, tail correction, restart, rRESPA info  

Mixing is not supported for this style.  

The shift, table and tail options are not relevant for this style.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.44.5 Restrictions  

The cosine/squared style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS is build with that package See the Build package page for more info.  

# 4.44.6 Related commands  

pair_coeff , pair_style lj/cut  

# 4.44.7 Default  

none (Cooke) “Cooke, Kremer and Deserno, Phys. Rev. E, 72, 011506 (2005)” (Weeks) “Weeks, Chandler and Andersen, J. Chem. Phys., 54, 5237 (1971)”  

# 4.45 pair_style coul/cut command  

Accelerator Variants: coul/cut/gpu, coul/cut/kk, coul/cut/omp  

4.46 pair_style coul/cut/global command  

Accelerator Variants: coul/cut/omp  

4.47 pair_style coul/ctip command  

4.48 pair_style coul/debye command  

Accelerator Variants: coul/debye/gpu, coul/debye/kk, coul/debye/omp  

# 4.49 pair_style coul/dsf command  

Accelerator Variants: coul/dsf/gpu, coul/dsf/kk, coul/dsf/omp  

4.50 pair_style coul/exclude command  

4.51 pair_style coul/long command  

Accelerator Variants: coul/long/omp, coul/long/kk, coul/long/gpu  

# 4.45. pair_style coul/cut command  

# 4.52 pair_style coul/msm command  

Accelerator Variants: coul/msm/omp  

4.53 pair_style coul/streitz command  

4.54 pair_style coul/wolf command  

Accelerator Variants: coul/wolf/kk, coul/wolf/omp  

# 4.55 pair_style tip4p/cut command  

Accelerator Variants: tip4p/cut/omp  

# 4.56 pair_style tip4p/long command  

Accelerator Variants: tip4p/long/omp  

# 4.56.1 Syntax  

pair_style coul/cut cutoff   
pair_style coul/cut/global cutoff   
pair_style coul/ctip alpha cutoff   
pair_style coul/debye kappa cutoff   
pair_style coul/dsf alpha cutoff   
pair_style coul/exclude cutoff   
pair_style coul/long cutoff   
pair_style coul/wolf alpha cutoff   
pair_style coul/streitz cutoff keyword alpha  

\* cutoff = global cutoff for Coulombic interactions \* kappa = Debye length (inverse distance units) alpha = damping parameter (inverse distance units)  

pair_style tip4p/cut otype htype btype atype qdist cutoff   
pair_style tip4p/long otype htype btype atype qdist cutoff   
\* otype,htype $=$ atom types (numeric or type label) for TIP4P O and H   
\* btype,atype $=$ bond and angle types (numeric or type label) for TIP4P waters   
\* qdist $=$ distance from O atom to massless charge (distance units)  

# 4.56.2 Examples  

pair_style coul/cut 2.5   
pair_coeff \* \*   
pair_coeff 2 2 3.5   
pair_style coul/ctip 0.30 12.0   
pair_coeff \* \* NiO.ctip Ni O  

(continues on next page)  

(continued from previous page)  

<html><body><table><tr><td>pair_style coul/debye 1.4 3.0</td></tr><tr><td></td></tr><tr><td>pair_coeff * * pair _coeff 2 2 3.5</td></tr><tr><td></td></tr><tr><td>pair _style coul/dsf 0.05 10.0</td></tr><tr><td>pair_coeff * *</td></tr><tr><td>pair _style hybrid/overlay coul/exclude 10.0 .. pair_coeff * * coul/exclude</td></tr><tr><td>pair_style coul/long 10.0</td></tr><tr><td>pair_coeff * *</td></tr><tr><td>pair_style coul/msm 10.0 pair_coeff * *</td></tr><tr><td>pair _style coul/wolf 0.2 9.0</td></tr><tr><td>pair _coeff * *</td></tr><tr><td>pair _style coul/streitz 12.0 ewald pair _style coul/streitz 12.0 wolf 0.30</td></tr><tr><td>pair_coeff * * AlO.streitz Al O</td></tr><tr><td>pair_style tip4p/cut 1 2 7 8 0.15 12.0</td></tr><tr><td>pair_coeff * *</td></tr><tr><td>pair _style tip4p/long 1 2 7 8 0.15 10.0 pair_coeff * *</td></tr><tr><td></td></tr><tr><td>0'ZI SIO MH-MO-MH MO-MH MH MO 4n3/dvd1 0IA4s 11ed labelmap atom 1 OW 2 HW</td></tr><tr><td>labelmap bond 1 HW-OW</td></tr><tr><td>labelmap angle 1 HW-OW-HW</td></tr><tr><td>pair_coeff * *</td></tr></table></body></html>  

# 4.56.3 Description  

The coul/cut style computes the standard Coulombic interaction potential given by  

$$
E={\frac{C q_{i}q_{j}}{\varepsilon r}}\qquadr<r_{c}
$$  

where C is an energy-conversion constant, Qi and Qj are the charges on the two atoms, and $\varepsilon$ is the dielectric constant which can be set by the dielectric command. The cutoff $r_{c}$ truncates the interaction distance.  

Pair style coul/cut/global computes the same Coulombic interactions as style coul/cut except that it allows only a single global cutoff and thus makes it compatible for use in combination with long-range coulomb styles in hybrid pair styles.  

Added in version 19Nov2024.  

Style coul/ctip computes the Coulomb interactions as described in Plummer. It uses the the damped shifted model as in style coul/dsf but is further extended to the second derivative of the potential and incorporates empirical charge shielding meant to approximate the more expensive Coulomb integrals used in style coul/streitz. More details can be found in the referenced paper. Like the style coul/streitz, style coul/ctip is a variable charge potential and must be hybridized with a short-range potential via the pair_style hybrid/overlay command. Charge equilibration must be performed with the fix qeq/ctip command. For example:  

pair_style hybrid/overlay eam/fs coul/ctip 0.30 12.0   
pair_coeff \* \* eam/fs NiO.eam.fs Ni O   
pair_coeff \* \* coul/ctip NiO.ctip Ni O   
fix 1 all qeq/ctip 1 12.0 1.0e-8 100 coul/ctip cdamp 0.30 maxrepeat 10  

See the examples/ctip directory for an example input script using the CTIP potential. An Ni-O CTIP and EAM/FS parameterization are included for use with the example.  

Style coul/debye adds an additional exp() damping factor to the Coulombic term, given by  

$$
E={\frac{C q_{i}q_{j}}{\varepsilon r}}\exp(-\kappa r)\qquadr<r_{c}
$$  

where $\kappa$ is the Debye length. This potential is another way to mimic the screening effect of a polar solvent.  

Style coul/dsf computes Coulombic interactions via the damped shifted force model described in Fennell, given by:  

$$
E=q_{i}q_{j}\left[\frac{\mathrm{erfc}(\alpha r)}{r}-\frac{\mathrm{erfc}(\alpha r_{c})}{r_{c}}+\left(\frac{\mathrm{erfc}(\alpha r_{c})}{r_{c}^{2}}+\frac{2\alpha}{\sqrt{\pi}}\frac{\mathrm{exp}(-\alpha^{2}r_{c}^{2})}{r_{c}}\right)(r-r_{c})\right]\qquadr<r_{c}
$$  

where $\alpha$ is the damping parameter and $e r f c()$ is the complementary error-function. The potential corrects issues in the Wolf model (described below) to provide consistent forces and energies (the Wolf potential is not differentiable at the cutoff) and smooth decay to zero.  

Style coul/wolf computes Coulombic interactions via the Wolf summation method, described in Wolf , given by:  

$$
E_{i}=\frac{1}{2}\sum_{j\neq i}\frac{q_{i}q_{j}\mathrm{erfc}(\alpha r_{i j})}{r_{i j}}+\frac{1}{2}\sum_{j\neq i}\frac{q_{i}q_{j}\mathrm{erf}(\alpha r_{i j})}{r_{i j}}\qquadr<r_{c}
$$  

where $\alpha$ is the damping parameter, and $e r f()$ and erfc() are error-function and complementary error-function terms. This potential is essentially a short-range, spherically-truncated, charge-neutralized, shifted, pairwise $l/r$ summation. With a manipulation of adding and subtracting a self term (for $\mathrm{i}=\mathrm{j}$ ) to the first and second term on the right-hand-side, respectively, and a small enough $\alpha$ damping parameter, the second term shrinks and the potential becomes a rapidlyconverging real-space summation. With a long enough cutoff and small enough $\alpha$ parameter, the energy and forces calculated by the Wolf summation method approach those of the Ewald sum. So it is a means of getting effective long-range interactions with a short-range potential.  

Style coul/streitz is the Coulomb pair interaction defined as part of the Streitz-Mintmire potential, as described in this paper, in which charge distribution about an atom is modeled as a Slater 1s orbital. More details can be found in the referenced paper. To fully reproduce the published Streitz-Mintmire potential, which is a variable charge potential, style coul/streitz must be used with pair_style eam/alloy (or some other short-range potential that has been parameterized appropriately) via the pair_style hybrid/overlay command. Likewise, charge equilibration must be performed via the fix qeq/slater command. For example:  

The keyword wolf in the coul/streitz command denotes computing Coulombic interactions via Wolf summation. An additional damping parameter is required for the Wolf summation, as described for the coul/wolf potential above. Alternatively, Coulombic interactions can be computed via an Ewald summation. For example:  

pair_style hybrid/overlay coul/streitz 12.0 ewald eam/alloy kspace_style ewald 1e-6  

Keyword ewald does not need a damping parameter, but a kspace_style must be defined, which can be style ewald or pppm. The Ewald method was used in Streitz and Mintmire’s original paper, but a Wolf summation offers a speed-up in some cases.  

For the fix qeq/slater command, the qfile can be a filename that contains QEq parameters as discussed on the fix qeq command doc page. Alternatively qfile can be replaced by “coul/streitz”, in which case the fix will extract QEq parameters from the coul/streitz pair style itself.  

See the examples/strietz directory for an example input script that uses the Streitz-Mintmire potential. The potentials directory has the AlO.eam.alloy and AlO.streitz potential files used by the example.  

Note that the Streiz-Mintmire potential is generally used for oxides, but there is no conceptual problem with extending it to nitrides and carbides (such as SiC, TiN). Pair coul/strietz used by itself or with any other pair style such as EAM, MEAM, Tersoff, or LJ in hybrid/overlay mode. To do this, you would need to provide a Streitz-Mintmire parameterization for the material being modeled.  

Pair style coul/exclude computes Coulombic interactions like coul/cut but only applies them to excluded pairs using a scaling factor of $\gamma-1.0$ with $\gamma$ being the factor assigned to that excluded pair via the special_bonds coul setting. With this it is possible to treat Coulomb interactions for molecular systems with kspace style scafacos, which always computes the full Coulomb interactions without exclusions. Pair style coul/exclude will then subtract the excluded interactions accordingly. So to achieve the same forces as with pair_style lj/cut/coul/long 12.0 with kspace_style pppm 1.0e-6, one would use pair_style hybrid/overlay lj/cut 12.0 coul/exclude 12.0 with kspace_style scafacos $\mathrm{p3m~1.0e-6}$ .  

Styles coul/long and coul/msm compute the same Coulombic interactions as style coul/cut except that an additional damping factor is applied so it can be used in conjunction with the kspace_style command and its ewald or pppm option. The Coulombic cutoff specified for this style means that pairwise interactions within this distance are computed directly; interactions outside that distance are computed in reciprocal space.  

Styles tip4p/cut and tip4p/long implement the Coulomb part of the TIP4P water model of (Jorgensen), which introduces a massless site located a short distance away from the oxygen atom along the bisector of the HOH angle. The atomic types of the oxygen and hydrogen atoms, the bond and angle types for OH and HOH interactions, and the distance to the massless charge site are specified as pair_style arguments. Style tip4p/cut uses a global cutoff for Coulomb interactions; style tip4p/long is for use with a long-range Coulombic solver (Ewald or PPPM).  

![](images/790777aadb93a0cd314c185830c8fee135327b818cc74c583f21eff6c535c1d3.jpg)  

# Note  

For each TIP4P water molecule in your system, the atom IDs for the $\mathrm{o}$ and $2\textrm{H}$ atoms must be consecutive, with the O atom first. This is to enable LAMMPS to “find” the $2\mathrm{{H}}$ atoms associated with each O atom. For example, if the atom ID of an O atom in a TIP4P water molecule is 500, then its $2\mathrm{~H~}$ atoms must have IDs 501 and 502.  

# Note  

If using type labels, the type labels must be defined before calling the pair_coeff command.  

See the Howto tip4p page for more information on how to use the TIP4P pair styles and lists of parameters to set. Note that the neighbor list cutoff for Coulomb interactions is effectively extended by a distance $2^{*}$ qdist when using the TIP4P pair style, to account for the offset distance of the fictitious charges on O atoms in water molecules. Thus it is typically best in an efficiency sense to use a LJ cutoff $>=$ Coulombic cutoff $+2^{*}$ qdist, to shrink the size of the neighbor list. This leads to slightly larger cost for the long-range calculation, so you can test the trade-off for your model.  

Note that these potentials are designed to be combined with other pair potentials via the pair_style hybrid/overlay command. This is because they have no repulsive core. Hence if they are used by themselves, there will be no repulsion to keep two oppositely charged particles from moving arbitrarily close to each other.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• cutoff (distance units)  

For coul/cut and coul/debye the cutoff coefficient is optional. If it is not used (as in some of the examples above), the default global value specified in the pair_style command is used.  

For coul/cut/global, coul/long and coul/msm no cutoff can be specified for an individual I,J type pair via the pair_coeff command. All type pairs use the same global Coulomb cutoff specified in the pair_style command.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.56.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{\textbf{I}}!=\mathrm{\textbf{J}}$ , the cutoff distance for the coul/cut style can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

The pair_modify shift option is not relevant for these pair styles.  

The coul/long style supports the pair_modify table option for tabulation of the short-range portion of the long-range Coulombic interaction.  

These pair styles do not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.56.5 Restrictions  

The coul/long, coul/msm, coul/streitz, and tip4p/long styles are part of the KSPACE package. The coul/cut/global, coul/exclude, and coul/ctip styles are part of the EXTRA-PAIR package. The tip4p/cut style is part of the MOLECULE package. A pair style is only enabled if LAMMPS was built with its corresponding package. See the Build package page for more info.  

# 4.56.6 Related commands  

pair_coeff , pair_style hybrid/overlay, kspace_style  

# 4.56.7 Default  

none  

(Wolf) D. Wolf, P. Keblinski, S. R. Phillpot, J. Eggebrecht, J Chem Phys, 110, 8254 (1999). (Fennell) C. J. Fennell, J. D. Gezelter, J Chem Phys, 124, 234104 (2006). (Streitz) F. H. Streitz, J. W. Mintmire, Phys Rev B, 50, 11996-12003 (1994) (Plummer) G. Plummer, J. P. Tavenner, M. I. Mendelev, Z. Wu, J. W. Lawson, in preparation (Jorgensen) Jorgensen, Chandrasekhar, Madura, Impey, Klein, J Chem Phys, 79, 926 (1983).  

# 4.57 pair_style coul/diel command  

Accelerator Variants: coul/diel/omp  

# 4.57.1 Syntax  

cutof $=$ global cutoff (distance units)  

# 4.57.2 Examples  

pair_style coul/diel 3.5   
pair_coeff 1 4 78. 1.375 0.112  

# 4.57.3 Description  

Style coul/diel computes a Coulomb correction for implicit solvent ion interactions in which the dielectric permittivity is distance dependent. The dielectric permittivity $\varepsilon_{D}(r)$ connects to limiting regimes: One limit is defined by a small dielectric permittivity (close to vacuum) at or close to contact separation between the ions. At larger separations the dielectric permittivity reaches a bulk value used in the regular Coulomb interaction coul/long or coul/cut. The transition is modeled by a hyperbolic function which is incorporated in the Coulomb correction term for small ion separations as follows  

$$
\begin{array}{c}{{E=\displaystyle\frac{C q_{i}q_{j}}{\varepsilon r}\left(\frac{\varepsilon}{\varepsilon_{D}(r)}-1\right)}}\ {{\varepsilon_{D}(r)=\displaystyle\frac{5.2+\varepsilon}{2}+\frac{\varepsilon-5.2}{2}\operatorname{tanh}\left(\frac{r-r_{m e}}{\sigma_{e}}\right)}}\end{array}
$$  

where $r_{m e}$ is the inflection point of $\varepsilon_{D}(r)$ and $\sigma_{e}$ is a slope defining length scale. C is the same Coulomb conversion factor as in the pair_styles coul/cut, coul/long, and coul/debye. In this way the Coulomb interaction between ions is corrected at small distances r. The lower limit of $\varepsilon_{D}(r\rightarrow0)=5.2\$ due to dielectric saturation (Stiles) while the Coulomb interaction reaches its bulk limit by setting $\varepsilon_{D}(r\rightarrow\infty)=\varepsilon$ , the bulk value of the solvent which is 78 for water at 298K.  

Examples of the use of this type of Coulomb interaction include implicit solvent simulations of salt ions (Lenart) and of ionic surfactants (Jusufi). Note that this potential is only reasonable for implicit solvent simulations and in combination with coul/cut or coul/long. It is also usually combined with gauss/cut, see (Lenart) or (Jusufi).  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• ε (no units) • $r_{m e}$ (distance units) • $\sigma_{e}$ (distance units)  

The global cutoff $\left(r_{c}\right)$ specified in the pair_style command is used.  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.57.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support parameter mixing. Coefficients must be given explicitly for each type of particle pairs.  

This pair style supports the pair_modify shift option for the energy of the Gauss-potential portion of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.57.5 Restrictions  

This style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.57.6 Related commands  

pair_coeff pair_style gauss/cut  

# 4.57.7 Default  

none  

# 4.58 pair_style coul/shield command  

# 4.58.1 Syntax  

pair_style coul/shield cutoff tap_flag  

• cutof $=$ global cutoff (distance units) • tap_flag $=0/1$ to turn off/on the taper function  

# 4.58.2 Examples  

<html><body><table><tr><td>pair style coul/shield 16.0 1</td></tr><tr><td>pair coeff f 1 2 0.70</td></tr><tr><td></td></tr></table></body></html>  

# 4.58.3 Description  

Style coul/shield computes a Coulomb interaction for boron and nitrogen atoms located in different layers of hexagonal boron nitride. This potential is designed be used in combination with the pair style ilp/graphene/hbn  

# Note  

This potential is intended for electrostatic interactions between two different layers of hexagonal boron nitride. Therefore, to avoid interaction within the same layers, each layer should have a separate molecule id and is recommended to use the “full” atom style, so that charge and molecule ID information is included.  

$$
\begin{array}{c}{{E=\displaystyle\frac{1}{2}\sum_{i}\sum_{j\neq i}V_{i j}}}\ {{V_{i j}=\mathrm{Tap}(r_{i j})\displaystyle\frac{\kappa q_{i}q_{j}}{\sqrt[3]{r_{i j}^{3}+(1/\lambda_{i j})^{3}}}}}\ {{\mathrm{Tap}(r_{i j})=20\left(\displaystyle\frac{r_{i j}}{R_{c u t}}\right)^{7}-70\left(\displaystyle\frac{r_{i j}}{R_{c u t}}\right)^{6}+84\left(\displaystyle\frac{r_{i j}}{R_{c u t}}\right)^{5}-35\left(\displaystyle\frac{r_{i j}}{R_{c u t}}\right)^{4}+1}}\end{array}
$$  

Where $\mathrm{Tap}(r_{i j})$ is the taper function which provides a continuous cutoff (up to third derivative) for inter-atomic separations larger than $r_{c}$ (Leven1), (Leven2) and (Maaravi). Here $\lambda$ is the shielding parameter that eliminates the short-range singularity of the classical mono-polar electrostatic interaction expression (Maaravi).  

The shielding parameter $\lambda$ (1/distance units) must be defined for each pair of atom types via the pair_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

The global cutoff $\left(r_{c}\right)$ specified in the pair_style command is used.  

# 4.58.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support parameter mixing. Coefficients must be given explicitly for each type of particle pairs.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.58. pair_style coul/shield command  

# 4.58.5 Restrictions  

This pair style is part of the INTERLAYER package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.58.6 Related commands  

pair_coeff pair_style ilp/graphene/hbn  

# 4.58.7 Default  

tap_flag $=1$  

(Leven1) I. Leven, I. Azuri, L. Kronik and O. Hod, J. Chem. Phys. 140, 104106 (2014).   
(Leven2) I. Leven et al, J. Chem.Theory Comput. 12, 2896-905 (2016).   
(Maaravi) T. Maaravi et al, J. Phys. Chem. C 121, 22826-22835 (2017).  

4.59 pair_style coul/slater command  

4.60 pair_style coul/slater/cut command  

# 4.61 pair_style coul/slater/long command  

Accelerator Variants: coul/slater/long/gpu  

# 4.61.1 Syntax  

pair_style coul/slater/cut lambda cutoff pair_style coul/slater/long lambda cutoff  

lambda $=$ decay length of the charge (distance units) cutoff $=$ cutoff (distance units)  

# 4.61.2 Examples  

pair_style coul/slater/cut 1.0 3.5   
pair_coeff \* \*   
pair_coeff 2 2 2.5   
pair_style coul/slater/long 1.0 12.0   
pair_coeff \* \*   
pair_coeff 1 1 5.0  

# 4.61.3 Description  

Styles coul/slater/\* compute electrostatic interactions in mesoscopic models which employ potentials without explicit excluded-volume interactions. The goal is to prevent artificial ionic pair formation by including a charge distribution in the Coulomb potential, following the formulation of (Melchor):  

$$
E=\frac{C q_{i}q_{j}}{\varepsilon r}\left(1-\left(1+\frac{r_{i j}}{\lambda}e x p\left(-2r_{i j}/\lambda\right)\right)\right)\qquadr<r_{c}
$$  

where $r_{c}$ is the cutoff distance and $\lambda$ is the decay length of the charge. C is the same Coulomb conversion factor as in the pair_styles coul/cut and coul/long. In this way the Coulomb interaction between ions is corrected at small distances r. For the coul/slater/cut style, the potential energy for distances larger than the cutoff is zero, while for the coul/slater/long, the long-range interactions are computed either by the Ewald or the PPPM technique.  

Phenomena that can be captured at a mesoscopic level using this type of electrostatic interactions include the formation of polyelectrolyte-surfactant aggregates, charge stabilization of colloidal suspensions, and the formation of complexes driven by charged species in biological systems. (Vaiwala).  

The cutoff distance is optional. If it is not used, the default global value specified in the pair_style command is used. For each pair of atom types, a specific cutoff distance can be defined via the pair_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $r_{c}$ (distance units)  

The global decay length of the charge $(\lambda)$ specified in the pair_style command is used for all pairs.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.61.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the cutoff distance for the coul/slater styles can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

The pair_modify shift and table options are not relevant for these pair styles.  

hese pair styles do not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.61.5 Restrictions  

The coul/slater/long style requires the long-range solvers included in the KSPACE package.  

These styles are part of the EXTRA-PAIR package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 4.61.6 Related commands  

pair_coeff , pair_style, hybrid/overlay, kspace_style  

# 4.61.7 Default  

none  

(Melchor) Gonzalez-Melchor, Mayoral, Velazquez, and Alejandre, J Chem Phys, 125, 224107 (2006).   
(Vaiwala) Vaiwala, Jadhav, and Thaokar, J Chem Phys, 146, 124904 (2017).  

# 4.62 pair_style coul/tt command  

# 4.62.1 Syntax  

• style = coul/tt args $=$ list of arguments for a particular style  

coul/tt args = n cutoff $\mathrm{~n~}=$ degree of polynomial cutoff $=$ global cutoff (distance units)  

# 4.62.2 Examples  

pair_style hybrid/overlay ... coul/tt 4 12.0   
pair_coeff 1 2 coul/tt 4.5 1.0   
pair_coeff 1 2 coul/tt 4.0 1.0 4 12.0   
pair_coeff 1 3\* coul/tt 4.5 1.0 4  

Example input scripts available: examples/PACKAGES/drude  

# 4.62.3 Description  

The coul/tt pair style is meant to be used with force fields that include explicit polarization through Drude dipoles.  

The coul/tt pair style should be used as a sub-style within in the pair_style hybrid/overlay command, in conjunction with a main pair style including Coulomb interactions and thole pair style, or with lj/cut/thole/long pair style that is equivalent to the combination of preceding two.  

The coul/tt pair styles compute the charge-dipole Coulomb interaction damped at short distances by a function  

$$
f_{n,i j}(r)=1-c_{i j}\cdot e^{-b_{i j}r}\sum_{k=0}^{n}\frac{(b_{i j}r)^{k}}{k!}
$$  

This function results from an adaptation to the Coulomb interaction (Salanne) of the damping function originally proposed by Tang Toennies for van der Waals interactions.  

The polynomial takes the degree 4 for damping the Coulomb interaction. The parameters $b_{i j}$ and $c_{i j}$ could be determined from first-principle calculations for small, mainly mono-atomic, ions (Salanne), or else treated as empirical for large molecules.  

In pair styles with Drude induced dipoles, this damping function is typically applied to the interactions between a Drude charge (either $q_{D,i}$ on a Drude particle or $-q_{D,i}$ on the respective Drude core)) and a charge on a non-polarizable atom, $q_{j}$ .  

The Tang-Toennies function could also be used to damp electrostatic interactions between the (non-polarizable part of the) charge of a core, $q_{i}-q_{D,i}$ , and the Drude charge of another, $-q_{D,j}$ . The $b_{i j}$ and $c_{i j}$ are equal to $b_{j i}$ and $c_{j i}$ in the case of core-core interactions.  

For pair_style coul/tt, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the example above.  

• bi j   
• ci j   
• degree of polynomial (positive integer)   
cutoff (distance units)  

The last two coefficients are optional. If not specified the global degree of the polynomial or the global cutoff specified in the pair_style command are used. In order to specify a cutoff (forth argument), the degree of the polynomial (third argument) must also be specified.  

# 4.62.4 Mixing, shift, table, tail correction, restart, rRESPA info  

The coul/tt pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

# 4.62.5 Restrictions  

These pair styles are part of the DRUDE package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair_style should currently not be used with the charmm dihedral style if the latter has non-zero 1-4 weighting factors. This is because the coul/tt pair style does not know which pairs are 1-4 partners of which dihedrals.  

# 4.62.6 Related commands  

fix drude, fix langevin/drude, fix drude/transform, compute temp/drude, pair_style thole  

# 4.62.7 Default  

none  

(Thole) Chem Phys, 59, 341 (1981).   
(Salanne) Salanne, Rotenberg, Jahn, Vuilleumier, Simon, Christian and Madden, Theor Chem Acc, 131, 1143 (2012).   
(Tang and Toennies) J Chem Phys, 80, 3726 (1984).  

4.63 pair_style born/coul/dsf/cs command  

4.64 pair_style born/coul/long/cs command  

Accelerator Variants: born/coul/long/cs/gpu  

# 4.65 pair_style born/coul/wolf/cs command  

Accelerator Variants: born/coul/wolf/cs/gpu  

4.66 pair_style buck/coul/long/cs command  

4.67 pair_style coul/long/cs command  

Accelerator Variants: coul/long/cs/gpu  

4.68 pair_style coul/wolf/cs command  

4.69 pair_style lj/cut/coul/long/cs command  

4.70 pair_style lj/class2/coul/long/cs command  

# 4.70.1 Syntax  

pair_style style args  

• style $=$ born/coul/dsf/cs or born/coul/long/cs or born/coul/wolf/cs or buck/coul/long/cs or coul/long/cs or coul/wolf/cs or lj/cut/coul/long/cs or lj/class2/coul/long/cs  

• args $=$ list of arguments for a particular style  

born/coul/dsf/cs args $=$ alpha cutoff (cutoff2) alpha $=$ damping parameter (inverse distance units) cutoff $=$ global cutoff for non-Coulombic (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (distance units)   
born/coul/long/cs args $=$ cutoff (cutoff2) cutof $=$ global cutoff for non-Coulombic (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)   
born/coul/wolf/cs args = alpha cutoff (cutoff2) alpha = damping parameter (inverse distance units) cutoff = global cutoff for Buckingham (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
buck/coul/long/cs args $-$ cutoff (cutoff2) cutoff = global cutoff for Buckingham (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
coul/long args = cutoff cutoff = global cutoff for Coulombic (distance units)   
coul/wolf args = alpha cutoff alpha = damping parameter (inverse distance units) cutoff = global cutoff for Coulombic (distance units)   
lj/cut/coul/long/cs args = cutoff (cutoff2) cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units)   
cutoff2 = global cutoff for Coulombic (optional) (distance units)   
lj/class2/coul/long/cs args $=$ cutoff (cutoff2) cutoff $=$ global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)  

# 4.70.2 Examples  

pair_style born/coul/dsf/cs 0.1 10.0 12.0   
pair_coeff \* \* 0.0 1.00 0.00 0.00 0.00   
pair_coeff 1 1 480.0 0.25 0.00 1.05 0.50  

(continues on next page)  

(continued from previous page)  

<html><body><table><tr><td>pair _style born/coul/long/cs 10.0 8.0 pair_ coeff 1 1 6.08 0.317 2.340 24.18 11.51</td></tr><tr><td></td></tr><tr><td>pair _style born/coul/wolf/cs 0.25 10.0 12.0</td></tr><tr><td>pair_coeff * **0.0 1.00 0.00 0.00 0.00 pair_coef 1 1 480.0 0.25 0.00 1.05 0.50</td></tr><tr><td></td></tr><tr><td>pair_style buck/coul/long/cs 10.0</td></tr><tr><td>pair_style buck/coul/long/cs 10.0 8.0 pair_coeff * * 100.0 1.5 200.0</td></tr><tr><td>pair_coeff 1 1 100.0 1.5 200.0 9.0</td></tr><tr><td>pair_style coul/long/cs 10.0</td></tr><tr><td>pair_coeff * *</td></tr><tr><td>pair_style coul/wolf/cs 0.2 9.0</td></tr><tr><td>pair_coeff * *</td></tr><tr><td>pair_style lj/cut/coul/long/cs 10.0</td></tr><tr><td>pair _style lj/cut/coul/long/cs 10.0 8.0</td></tr><tr><td>pair _coeff * * 100.0 3.0</td></tr><tr><td>pair _coeff 1 1 100.0 3.5 9.0</td></tr><tr><td></td></tr></table></body></html>  

# 4.70.3 Description  

These pair styles are designed to be used with the adiabatic core/shell model of (Mitchell and Fincham). See the Howto coreshell page for an overview of the model as implemented in LAMMPS.  

All the styles are identical to the corresponding pair style without the “/cs” in the name:  

• pair_style born/coul/dsf • pair_style born/coul/long pair_style born/coul/wolf pair_style buck/coul/long • pair_style coul/long • pair_style coul/wolf • pair_style lj/cut/coul/long • pair_style lj/class2/coul/long  

except that they correctly treat the special case where the distance between two charged core and shell atoms in the same core/shell pair approach $\mathrm{r}=0.0$ .  

Styles with a “/long” in the name are used with a long-range solver for Coulombic interactions via the kspace_style command. They require special treatment of the short-range Coulombic interactions within the cor/shell model.  

Specifically, the short-range Coulomb interaction between a core and its shell should be turned off using the special_bonds command by setting the 1-2 weight to 0.0, which works because the core and shell atoms are bonded to each other. This induces a long-range correction approximation which fails at small distances $\mathrel{\mathop\sim}<10\mathrm{e}{\boldsymbol-8})$ . Therefore, the Coulomb term which is used to calculate the correction factor is extended by a minimal distance $\mathrm{r}\_\mathrm{min}=1.0{-}6)$  

when the interaction between a core/shell pair is treated, as follows  

$$
E=\frac{C q_{i}q_{j}}{\varepsilon(r+r_{m i n})}r\rightarrow0
$$  

where C is an energy-conversion constant, $q_{i}$ and $q_{j}$ are the charges on the core and shell, epsilon is the dielectric constant and $r_{m i n}$ is the minimal distance.  

For styles that are not used with a long-range solver, i.e. those with “/dsf” or “/wolf” in the name, the only correction is the addition of a minimal distance to avoid the possible $\mathbf{r}=0.0$ case for a core/shell pair.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.70.4 Mixing, shift, table, tail correction, restart, rRESPA info  

See the corresponding doc pages for pair styles without the “cs” suffix to see how mixing, shifting, tabulation, tail correction, restarting, and rRESPA are handled by theses pair styles.  

# 4.70.5 Restrictions  

These pair styles are part of the CORESHELL package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 4.70.6 Related commands  

pair_coeff , pair_style born, pair_style buck  

# 4.70.7 Default  

none  

(Mitchell and Fincham) Mitchell, Fincham, J Phys Condensed Matter, 5, 1031-1038 (1993).  

4.71 pair_style coul/cut/dielectric command  

4.72 pair_style coul/long/dielectric command  

4.73 pair_style lj/cut/coul/cut/dielectric command  

Accelerator Variants: lj/cut/coul/cut/dielectric/omp  

# 4.74 pair_style lj/cut/coul/debye/dielectric command  

Accelerator Variants: lj/cut/coul/debye/dielectric/omp  

4.75 pair_style lj/cut/coul/long/dielectric command  

Accelerator Variants: lj/cut/coul/long/dielectric/omp  

4.76 pair_style lj/cut/coul/msm/dielectric command  

4.77 pair_style lj/long/coul/long/dielectric command  

# 4.77.1 Syntax  

pair_style style args  

• style $=$ lj/cut/coul/cut/dielectric or lj/cut/coul/long/dielectric or lj/cut/coul/msm/dielectric or lj/long/coul/msm/dielectric   
• args $=$ list of arguments for a particular style  

# 4.77.2 Examples  

pair_style coul/cut/dielectric 10.0   
pair_coeff \* \*   
pair_coeff 1 1 9.0   
pair_style lj/cut/coul/cut/dielectric 10.0   
pair_style lj/cut/coul/cut/dielectric 10.0 8.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0   
pair_style lj/cut/coul/long/dielectric 10.0   
pair_style lj/cut/coul/long/dielectric 10.0 8.0   
pair_coeff \* \* 100.0 3.0   
pair_coeff 1 1 100.0 3.5 9.0  

Used in input scripts:  

<html><body><table><tr><td>examples/PACKAGES/dielectric/in.confined</td></tr><tr><td>examples/PACKAGES/dielectric /in.nopbc</td></tr></table></body></html>  

# 4.77.3 Description  

All these pair styles are derived from the corresponding pair styles without the dielectric suffix. In addition to computing atom forces and energies, these pair styles compute the electric field vector at each atom, which are intended to be used by the fix polarize commands to compute induced charges at interfaces between two regions of different dielectric constant.  

These pair styles should be used with atom_style dielectric.  

The styles lj/cut/coul/long/dielectric, lj/cut/coul/msm/dielectric, and lj/long/coul/long/dielectric should be used with their kspace style counterparts, namely, pppm/dielectric, pppm/disp/dielectric, and msm/dielectric, respectively.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.77.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distances for this pair style can be mixed.   
The default mix algorithm is geometric. See the pair_modify” command for details.  

The pair_modify table option is not relevant for this pair style.  

These pair styles write its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.77.5 Restrictions  

These styles are part of the DIELECTRIC package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

# 4.77.6 Related commands  

pair_coeff , fix polarize, read_data  

# 4.77.7 Default  

none  

# 4.78 pair_style lj/cut/dipole/cut command  

Accelerator Variants: lj/cut/dipole/cut/gpu, lj/cut/dipole/cut/kk, lj/cut/dipole/cut/omp  

4.79 pair_style lj/sf/dipole/sf command  

Accelerator Variants: lj/sf/dipole/sf/gpu, lj/sf/dipole/sf/omp  

# 4.80 pair_style lj/cut/dipole/long command  

Accelerator Variants: lj/cut/dipole/long/gpu  

# 4.81 pair_style lj/long/dipole/long command  

# 4.81.1 Syntax  

pair_style lj/cut/dipole/cut cutoff (cutoff2) pair_style lj/sf/dipole/sf cutoff (cutoff2) pair_style lj/cut/dipole/long cutoff (cutoff2) pair_style lj/long/dipole/long flag_lj flag_coul cutoff (cutoff2)  

• cutof $=$ global cutoff LJ (and Coulombic if only 1 arg) (distance units)   
• cutoff2 $=$ global cutoff for Coulombic and dipole (optional) (distance units)   
• flag_lj $=$ long or cut or off ${\mathrm{long}}={\mathrm{use}}$ long-range damping on dispersion $1/\mathrm{r}^{\sim}6$ term $\mathrm{cut}=\mathrm{use}$ a cutoff on dispersion $1/\mathrm{r}^{\sim}6$ term off $=$ omit disperion $1/\mathrm{r}^{\sim}6$ term entirely   
• flag_coul $=$ long or off long $=$ use long-range damping on Coulombic $1/\mathrm{r}$ and point-dipole term off $=$ omit Coulombic and point-dipole terms entirely  

# 4.81.2 Examples  

<html><body><table><tr><td>pair_style lj/cut/dipole/cut 2.5 5.0</td></tr><tr><td>pair_coeff * * 1.0 1.0</td></tr><tr><td>pair _ coeff 2 3 0.8 1.0 2.5 4.0</td></tr><tr><td></td></tr><tr><td>pair_style lj/sf/dipole/sf 9.0 pair_coeff * * 1.0 1.0</td></tr><tr><td>pair _ coeff 2 3 1.0 1.0 2.5 4.0 scale 0.5</td></tr><tr><td>pair_ coeff 2 3 0.8 1.0 2.5 4.0</td></tr><tr><td>pair _style lj/cut /dipole/long 2.5 3.5</td></tr><tr><td>pair_coeff * * 1.0 1.0 pair _coeff 2 3 0.8 1.0 3.0</td></tr><tr><td></td></tr><tr><td>pair_style lj/long/dipole/long long long 3.5</td></tr><tr><td>pair_coeff * * 1.0 1.0 pair _coeff 2 3 0.8 1.0</td></tr><tr><td>pair _style lj/long/dipole/long cut long 2.5 3.5</td></tr><tr><td>pair_coeff * * 1.0 1.0</td></tr><tr><td>pair _ coeff 2 3 0.8 1.0 3.0</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></table></body></html>  

# 4.81.3 Description  

Style lj/cut/dipole/cut computes interactions between pairs of particles that each have a charge and/or a point dipole moment. In addition to the usual Lennard-Jones interaction between the particles (Elj) the charge-charge (Eqq), chargedipole (Eqp), and dipole-dipole (Epp) interactions are computed by these formulas for the energy (E), force (F), and  

torque (T) between particles I and J.  

$$
\begin{array}{l}{{E_{L J}=4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12}-\left(\frac{\sigma}{r}\right)^{6}\right]}}\ {{\mathrm{}}}\ {{E_{q q}=\displaystyle\frac{q_{i}q_{j}}{r}}}\ {{\displaystyle E_{q p}=\frac{q}{r^{3}}(p\bullet\vec{r})}}\ {{\displaystyle E_{p p}=\displaystyle\frac{1}{r^{3}}(\vec{p}_{i}\bullet\vec{p}_{j})-\frac{3}{r^{5}}(\vec{p}_{i}\bullet\vec{r})(\vec{p}_{j}\bullet\vec{r})}}\end{array}
$$  

$$
\begin{array}{l}{{\displaystyle F_{q q}=\frac{q_{i}q_{j}}{r^{3}}\vec{r}}}\ {{\displaystyle F_{q p}=-\frac{q}{r^{3}}\vec{p}+\frac{3q}{r^{5}}(\vec{p}\bullet\vec{r})\vec{r}}}\ {{\displaystyle F_{p p}=\frac{3}{r^{5}}(\vec{p}_{i}\bullet\vec{p}_{j})\vec{r}-\frac{15}{r^{7}}(\vec{p}_{i}\bullet\vec{r})(\vec{p}_{j}\bullet\vec{r})\vec{r}+\frac{3}{r^{5}}\left[(\vec{p}_{j}\bullet\vec{r})\vec{p}_{i}+(\vec{p}_{i}\bullet\vec{r})\vec{p}_{j}\right]}}\end{array}
$$  

$$
\begin{array}{l}{{{\displaystyle T_{p q}=T_{i j}={\frac{q_{j}}{r^{3}}}({\vec{p}}_{i}\times{\vec{r}})}}}\ {{{\displaystyle T_{q p}=T_{j i}=-{\frac{q_{i}}{r^{3}}}({\vec{p}}_{j}\times{\vec{r}})}}}\ {{{\displaystyle T_{p p}=T_{i j}=-{\frac{1}{r^{3}}}({\vec{p}}_{i}\times{\vec{p}}_{j})+{\frac{3}{r^{5}}}({\vec{p}}_{j}\bullet{\vec{r}})({\vec{p}}_{i}\times{\vec{r}})}}}\ {{{\displaystyle T_{p p}=T_{j i}=-{\frac{1}{r^{3}}}({\vec{p}}_{j}\times{\vec{p}}_{i})+{\frac{3}{r^{5}}}({\vec{p}}_{i}\bullet{\vec{r}})({\vec{p}}_{j}\times{\vec{r}})}}}\end{array}
$$  

where $q_{i}$ and $q_{j}$ are the charges on the two particles, $\vec{p}_{i}$ and $\vec{p}_{j}$ are the dipole moment vectors of the two particles, r is their separation distance, and the vector ${\bf r}={\bf R}{\bf{i}}-{\bf R}{\bf{j}}$ is the separation vector between the two particles. Note that Eqq and Fqq are simply Coulombic energy and force, $\mathrm{Fij}=\cdot$ -Fji as symmetric forces, and Tij $\!=$ -Tji since the torques do not act symmetrically. These formulas are discussed in (AllenTildesley) and in (Toukmaji).  

Also note, that in the code, all of these terms (except Elj) have a $C/\varepsilon$ prefactor, the same as the Coulombic term in the $\mathrm{~LJ+~}$ Coulombic pair styles discussed here. C is an energy-conversion constant and $\varepsilon$ is the dielectric constant which can be set by the dielectric command. The same is true of the equations that follow for other dipole pair styles.  

Style lj/sf/dipole/sf computes “shifted-force” interactions between pairs of particles that each have a charge and/or a point dipole moment. In general, a shifted-force potential is a (slightly) modified potential containing extra terms that make both the energy and its derivative go to zero at the cutoff distance; this removes (cutoff-related) problems in energy conservation and any numerical instability in the equations of motion (AllenTildesley). Shifted-force interactions for the Lennard-Jones (E_LJ), charge-charge (Eqq), charge-dipole (Eqp), dipole-charge (Epq) and dipole-dipole (Epp)  

potentials are computed by these formulas for the energy $(\mathrm{E})$ , force $(\mathrm{F})$ , and torque (T) between particles I and J:  

$$
\begin{array}{r l}&{E_{L J}=4e\left\{\left[\left(\frac{\sigma}{r}\right)^{12}-\left(\frac{\sigma}{r}\right)^{6}\right]+\left[6\left(\frac{\sigma}{r_{c}}\right)^{12}-3\left(\frac{\sigma}{r_{c}}\right)^{6}\right]\left(\frac{r}{r_{c}}\right)^{2}-7\left(\frac{\sigma}{r_{c}}\right)^{12}+4\left(\frac{\sigma}{r_{c}}\right)^{6}\right\}}\ &{E_{q p}=\frac{q\cdot q\cdot q}{r}\left(1-\frac{r}{r_{c}}\right)^{2}}\ &{E_{p q}=E_{j i}=-\frac{q}{r^{3}}\left[1-3\left(\frac{r}{r_{c}}\right)^{2}+2\left(\frac{r}{r_{c}}\right)^{3}\right]\left(\bar{p}\bullet\bar{r}\right)}\ &{E_{q p}=E_{i j}=\frac{q}{r^{3}}\left[1-3\left(\frac{r}{r_{c}}\right)^{2}+2\left(\frac{r}{r_{c}}\right)^{3}\right]\left(\bar{p}\bullet\bar{r}\right)}\ &{E_{p p}=\left[1-4\left(\frac{r}{r_{c}}\right)^{3}+3\left(\frac{r}{r_{c}}\right)^{4}\right]\left[\frac{1}{r^{3}}(\bar{p}_{i}\bullet\bar{p}_{j})-\frac{3}{r^{5}}(\bar{p}_{i}\bullet\bar{r})(\bar{p}_{j}\bullet\bar{r})\right]}\end{array}
$$  

$$
\begin{array}{l}{{F_{L U}=\left\{\left[\mathrm{d}\&{e}\displaystyle\left(\frac{\sigma}{r_{c}}\right)^{1/2}-24\varepsilon\left(\frac{\sigma}{r_{c}}\right)^{6}\right]\frac{1}{r_{c}^{7}}-\left[\mathrm{d}\&{e}\left(\frac{\sigma}{r_{c}}\right)^{1/2}-24\varepsilon\left(\frac{\sigma}{r_{c}}\right)^{6}\right]\frac{1}{r_{c}^{5}}\right\}^{-},}}\ {{F_{\varphi\varphi}=\frac{q_{\varphi\mid\mid\Big(}1}{r_{c}}-\frac{1}{r_{c}^{2}}\Big)^{\frac{3}{r_{c}^{7}}}}}\ {{F_{\varphi\varphi}=F_{i j}=-\frac{3q}{r_{c}^{3}}\left[1-\left(\frac{r}{r_{c}}\right)^{2}\right]\left(\bar{\psi}\bullet\bar{\eta}\bar{\gamma}\bar{\gamma}\bar{\gamma}+\frac{q}{r^{3}}\left[1-3\left(\frac{r}{r_{c}}\right)^{2}+2\left(\frac{r}{r_{c}}\right)^{3}\right]\bar{\psi}\right.}}\ {{F_{\varphi\varphi}=F_{i j}=\frac{3q}{r_{c}^{3}}\left[1-\left(\frac{r}{r_{c}}\right)^{2}\right]\left(\bar{\psi}\bullet\bar{\eta}\bar{\gamma}\bar{\gamma}-\frac{q}{r^{3}}\left[1-3\left(\frac{r}{r_{c}}\right)^{2}+2\left(\frac{r}{r_{c}}\right)^{3}\right]\bar{\psi}\right.}}\ {{F_{\varphi\varphi}=\frac{3}{r_{c}^{3}}\left\{\left[1-\left(\frac{r}{r_{c}}\right)^{4}\right]\left[\left(\bar{\eta}\right)-\frac{3}{r_{c}^{2}}\left(\bar{\eta}\right)\bar{\gamma}+\bar{\gamma}\bar{\gamma}\right]\bar{\gamma}+}\right.}}\ {{\left.\left[1-4\left(\frac{r}{r_{c}}\right)^{3}+3\left(\frac{r}{r_{c}}\right)^{4}\right]\left[\left(\bar{\eta}\right)+\bar{\eta}\bar{\gamma}\bar{\eta}\bar{\gamma}+\left(\bar{\eta}\right)\bar{\gamma}\bar{\gamma}\right]-\frac{2}{r_{c}^{2} 
$$  

$$
\begin{array}{c}{{T_{n p}=T_{l j}=\frac{q_{j}}{r_{j}}\left[1-3\left(\frac{r}{r_{j}}\right)^{2}+2\left(\frac{r}{r_{k}}\right)^{3}\right](\vec{p}_{j}\times\vec{r})}}\ {{}}\ {{T_{i p}=T_{j i}=-\frac{q_{j}}{r_{j}}\left[1-3\left(\frac{r}{r_{k}}\right)^{2}+2\left(\frac{r}{r_{k}}\right)^{3}\right](\vec{p}_{j}\times\vec{r})}}\ {{}}\ {{T_{p p}=T_{l j}=-\frac{1}{r_{j}}\left[1-4\left(\frac{r}{r_{k}}\right)^{3}+\epsilon^{3}\left(\frac{r}{r_{k}}\right)^{4}\right](\vec{p}_{j}\times\vec{p}_{j})+}}\ {{}}\ {{\frac{3}{r_{p}}\left[1-4\left(\frac{r}{r_{c}}\right)^{3}+3\left(\frac{r}{r_{c}}\right)^{4}\right](\vec{p}_{j}\cdot\vec{r})(\vec{p}_{l}\times\vec{r})}}\ {{}}\ {{T_{p p}=T_{l j}=-\frac{1}{r_{s}}\left[1-4\left(\frac{r}{r_{c}}\right)^{3}+3\left(\frac{r}{r_{c}}\right)^{4}\right](\vec{p}_{j}\times\vec{p}_{j})+}}\ {{}}\ {{\frac{3}{r_{s}}\left[1-4\left(\frac{r}{r_{c}}\right)^{3}+3\left(\frac{r}{r_{c}}\right)^{4}\right](\vec{p}_{i}\cdot\vec{r})(\vec{p}_{j}\times\vec{r})}}\end{array}
$$  

where $\varepsilon$ and $\sigma$ are the standard LJ parameters, $r_{c}$ is the cutoff, $q_{i}$ and $q_{j}$ are the charges on the two particles, $\vec{p}_{i}$ and $\vec{p}_{j}$ are the dipole moment vectors of the two particles, r is their separation distance, and the vector ${\bf r}={\bf R}{\bf{\dot{i}}}-{\bf R}{\bf{\dot{j}}}$ is the separation vector between the two particles. Note that Eqq and Fqq are simply Coulombic energy and force, $\mathrm{Fij}=\cdot$ -Fji as symmetric forces, and Tij $!=$ -Tji since the torques do not act symmetrically. The shifted-force formula for the LennardJones potential is reported in (Stoddard). The original (non-shifted) formulas for the electrostatic potentials, forces and torques can be found in (Price). The shifted-force electrostatic potentials have been obtained by applying equation 5.13 of (AllenTildesley). The formulas for the corresponding forces and torques have been obtained by applying the ‘chain rule’ as in appendix C.3 of (AllenTildesley).  

If one cutoff is specified in the pair_style command, it is used for both the LJ and Coulombic (q,p) terms. If two cutoffs are specified, they are used as cutoffs for the LJ and Coulombic (q,p) terms respectively. This pair style also supports an optional scale keyword as part of a pair_coeff statement, where the interactions can be scaled according to this factor. This scale factor is also made available for use with fix adapt.  

Style lj/cut/dipole/long computes the short-range portion of point-dipole interactions as discussed in (Toukmaji). Dipole-dipole, dipole-charge, and charge-charge interactions are all supported, along with the standard 12/6 LennardJones interactions, which are computed with a cutoff. A kspace_style must be defined to use this pair style. If only dipoles (not point charges) are included in the model, the kspace style can be one of these 3 options, all of which compute the long-range portion of dipole-dipole interactions. If the model includes point charges (in addition to dipoles), then only the first of these kspace styles can be used:  

• kspace_style ewald/disp • kspace_style ewald/dipole • kspace_style pppm/dipole  

Style lj/long/dipole/long has the same functionality as style lj/cut/dipole/long, except it also has an option to compute 12/6 Lennard-Jones interactions for use with a long-range dispersion kspace style. This is done by setting its flag_lj argument to long. For long-range LJ interactions, the kspace_style ewald/disp command must be used.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • σ (distance units) • cutoff1 (distance units) • cutoff2 (distance units)  

The latter 2 coefficients are optional. If not specified, the global LJ and Coulombic cutoffs specified in the pair_style command are used. If only one cutoff is specified, it is used as the cutoff for both LJ and Coulombic interactions for this type pair. If both coefficients are specified, they are used as the LJ and Coulombic cutoffs for this type pair. When using a long-rang Coulomb solver, only a global Coulomb cutoff may be used and only the LJ cutoff may be changed with the pair_coeff command. When using the lj/long/dipole/long pair style with long long setting, only a single global cutoff may be provided and no cutoff for the pair_coeff command.  

Note that for systems using these pair styles, typically particles should be able to exert torque on each other via their dipole moments so that the particle and its dipole moment can rotate. This requires they not be point particles, but finite-size spheres. Thus you should use a command like atom_style hybrid sphere dipole to use particles with both attributes.  

The magnitude and orientation of the dipole moment for each particle can be defined by the set command or in the “Atoms” section of the data file read in by the read_data command.  

Rotating finite-size particles have 6 degrees of freedom (DOFs), translation and rotational. You can use the compute temp/sphere command to monitor a temperature which includes all these DOFs.  

Finite-size particles with dipole moments should be integrated using one of these options:  

• fix nve/sphere update dipole   
• fix nve/sphere update dipole plus fix langevin omega yes   
• fix nvt/sphere update dipole   
• fix npt/sphere update dipole  

In all cases the “update dipole” setting ensures the dipole moments are also rotated when the finite-size spheres rotate. The 2nd and 3rd bullets perform thermostatting; in the case of a Langevin thermostat the “omega yes” option also thermostats the rotational degrees of freedom (if desired). The 4th bullet performs thermostatting and barostatting.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.81.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distances for this pair style can be mixed.   
The default mix value is geometric. See the “pair_modify” command for details.  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the A, sigma, d1, and d2 coefficients and cutoff distance for this pair style can be mixed. A is an energy value mixed like a LJ epsilon. D1 and d2 are distance values and are mixed like sigma. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style does not support the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction; such energy goes to zero at the cutoff by construction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.81.5 Restrictions  

The lj/cut/dipole/cut, lj/cut/dipole/long, lj/long/dipole/long, and lj/sf/dipole/sf\* styles are part of the DIPOLE package.   
They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Using dipole pair styles with electron units is not currently supported.  

# 4.81.6 Related commands  

pair_coeff , set, read_data, fix nve/sphere, fix nvt/sphere  

# 4.81.7 Default  

none  

(AllenTildesley) Allen and Tildesley, Computer Simulation of Liquids, Clarendon Press, Oxford, 1987.   
(Toukmaji) Toukmaji, Sagui, Board, and Darden, J Chem Phys, 113, 10913 (2000).   
(Stoddard) Stoddard and Ford, Phys Rev A, 8, 1504 (1973).   
(Price) Price, Stone and Alderton, Mol Phys, 52, 987 (1984).  

# 4.82 pair_style dispersion/d3 command  

# 4.82.1 Syntax  

pair_style dispersion/d3 damping functional cutoff cn_cutoff • damping $=$ damping function: zero, zerom, bj, or bjm • functional $=X C$ functional form: pbe, pbe0, . . . (see list below) • cutof $=$ global cutoff (distance units) • cn_cutoff $=$ coordination number cutoff (distance units)  

# 4.82.2 Examples  

pair_style dispersion/d3 zero pbe 30.0 20.0 pair_coeff \* \* C  

# 4.82.3 Description  

Added in version 4Feb2025.  

Style dispersion/d3 computes the dispersion energy-correction used in the DFT-D3 method of Grimme (Grimme1). It would typically be used with a machine learning (ML) potential that was trained with results from plain DFT calculations without the dispersion correction through pair_style hybrid/overlay. ML potentials are often combined $a$ posteriori with dispersion energy-correction schemes (see e.g. (Qamar) and (Batatia)).  

The energy contribution $E_{i}$ for an atom $i$ is given by:  

$$
E_{i}=\frac{1}{2}\sum_{j\neq i}\big(s_{6}\frac{C_{6,i j}}{r_{i j}^{6}}f_{6}^{d a m p}(r_{i j})+s_{8}\frac{C_{8,i j}}{r_{i j}^{8}}f_{8}^{d a m p}(r_{i j})\big)
$$  

where $C_{n}$ is the averaged, geometry-dependent nth-order dispersion coefficient for atom pair $i j,r_{i j}$ their inter-nuclear distance, $s_{n}$ are XC functional-dependent scaling factor, and $f_{n}^{d a m p}$ are damping functions.  

# Note  

It is currently not possible to calculate three-body dispersion contributions, according to, for example, the AxilrodTeller-Muto model.  

Available damping functions are the original “zero-damping” (Grimme1), Becke-Johnson damping (Grimme2), and their revised forms (Sherrill).  

Available XC functional scaling factors are listed in the table below, and depend on the selected damping function.   


<html><body><table><tr><td>Damping function</td><td>XC functional</td></tr><tr><td>zero</td><td>slater-dirac-exchange, b-lyp, b-p, b97-d, revpbe, pbe, pbesol, rpw86-pbe, rpbe, tpss, b3-lyp, pbe0, hse06, revpbe38, pw6b95, tpss0, b2-plyp, pwpb95, b2gp-plyp, ptpss, hf, mpwlyp, bpbe, bh-lyp, tpssh, pwb6k, b1b95, bop, 0-lyp, O-pbe, ssb, revssb, otpss, b3pw91, revpbe0, pbe38, mpw1b95, mpwb1k, bmk, cam-b3lyp, 1c-wpbe, m05, m052x, m061, m06, m062x,</td></tr><tr><td>zerom</td><td>m06hf, hcth120</td></tr><tr><td>bj</td><td>b2-plyp, b3-lyp, b97-d, b-lyp, b-p, pbe, pbe0, lc-wpbe b-p, b-lyp, revpbe, rpbe, b97-d, pbe, rpw86-pbe, b3-lyp, tpss, hf, tpss0, pbe0, hse06, revpbe38, pw6b95, b2-plyp, dsd-blyp, dsd-blyp-fc, bop, mpwlyp, o-lyp, pbesol, bpbe, opbe, ssb, revssb, otpss, b3pw91,</td></tr><tr><td></td><td>tpssh, mpw1b95, pwb6k, b1b95, bmk, cam-b3lyp, Ic-wpbe, b2gp-plyp, ptpss, pwpb95, hf/mixed, hf/sv, hf/minis, b3lyp/6-31gd, hcth120, pw1pw, pwgga,</td></tr><tr><td>bjm</td><td>hsesol, hf3c, hf3cv, pbeh3c, pbeh-3c b2-plyp, b3-lyp, b97-d, b-lyp, b-p, pbe, pbe0, lc-wpbe</td></tr></table></body></html>  

This style is primarily supposed to be used combined with a machine-learned interatomic potential trained on a DFT dataset (the selected XC functional should be chosen accordingly) via the pair_style hybrid command.  

# 4.82.4 Coefficients  

All the required coefficients are already stored internally (in the src/EXTRA-PAIR/d3_parameters.h file). The only information to provide are the chemical symbols of the atoms. The number of chemical symbols given must be equal to the number of atom types used and must match their ordering as atom types.  

# 4.82.5 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing since all parameters are explicit for each pair of atom types.  

This pair style does not support the pair_modify command shift, table, and tail options.  

This pair style does not write its information to binary restart files.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.82. pair_style dispersion/d3 command  

# 4.82.6 Restrictions  

Style dispersion/d3 is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package See the Build package page for more info.  

It is currently not possible to calculate three-body dispersion contributions according to, for example, the AxilrodTeller-Muto model.  

# 4.82.7 Related commands  

pair_coeff  

# 4.82.8 Default  

none  

(Grimme1) S. Grimme, J. Antony, S. Ehrlich, and H. Krieg, J. Chem. Phys. 132, 154104 (2010).   
(Qamar) M. Qamar, M. Mrovec, T. Lysogorskiy, A. Bochkarev, and R. Drautz, J. Chem. Theory Comput. 19, 5151 (2023).   
(Batatia) I. Batatia, et al., arXiv:2401.0096 (2023).   
(Grimme2) S. Grimme, S. Ehrlich and L. Goerigk, J. Comput. Chem. 32, 1456 (2011).   
(Sherrill) D. G. A. Smith, L. A. Burns, K. Patkowski, and C. D. Sherrill, J. Phys. Chem. Lett., 7, 2197, (2016).  

# 4.83 pair_style dpd command  

Accelerator Variants: dpd/gpu, dpd/intel, dpd/kk, dpd/omp  

# 4.84 pair_style dpd/tstat command  

Accelerator Variants: dpd/tstat/gpu, dpd/tstat/kk, dpd/tstat/omp  

# 4.84.1 Syntax  

pair_style dpd T cutoff seed pair_style dpd/tstat Tstart Tstop cutoff seed  

• $\mathrm{T}=$ temperature (temperature units) (dpd only)   
• Tstart,Tstop $=$ desired temperature at start/end of run (temperature units) (dpd/tstat only)   
• cutof $=$ global cutoff for DPD interactions (distance units)   
• seed $=$ random # seed (positive integer)  

# 4.84.2 Examples  

pair_style dpd 1.0 2.5 34387   
pair_coeff \* \* 3.0 1.0   
pair_coeff 1 1 3.0 1.0 1.0   
pair_style hybrid/overlay lj/cut 2.5 dpd/tstat 1.0 1.0 2.5 34387  

(continues on next page)  

(continued from previous page)  

# 4.84.3 Description  

Style dpd computes a force field for dissipative particle dynamics (DPD) following the exposition in (Groot).  

Style dpd/tstat invokes a DPD thermostat on pairwise interactions, which is equivalent to the non-conservative portion of the DPD force field. This pairwise thermostat can be used in conjunction with any pair style, and instead of perparticle thermostats like fix langevin or ensemble thermostats like Nose Hoover as implemented by $f i x n\nu t$ . To use dpd/tstat as a thermostat for another pair style, use the pair_style hybrid/overlay command to compute both the desired pair interaction and the thermostat for each pair of particles.  

For style dpd, the force on atom I due to atom J is given as a sum of 3 terms  

$$
\begin{array}{r l r l}&{\vec{f}=(F^{C}+F^{D}+F^{R})\hat{r_{i j}}}&&{\quad r<r_{c}}\ &{F^{C}=A w(r)}\ &{F^{D}=-\gamma w^{2}(r)(\hat{r_{i j}}\bullet\vec{\nu}_{i j})}&&{}\ &{F^{R}=\sigma w(r)\alpha(\Delta t)^{-1/2}}&&{}\ &{w(r)=1-\cfrac{r}{r_{c}}}\end{array}
$$  

where $F^{C}$ is a conservative force, $F^{D}$ is a dissipative force, and $F^{R}$ is a random force. $\hat{r_{i j}}$ is a unit vector in the direction $r_{i}-r_{j}$ , $\vec{\nu}_{i j}$ is the vector difference in velocities of the two atoms $\vec{\nu}_{i}-\vec{\nu}_{j}$ , $\alpha$ is a Gaussian random number with zero mean and unit variance, $d t$ is the timestep size, and $w(r)$ is a weighting factor that varies between 0 and 1. $r_{c}$ is the pairwise cutoff. $\sigma$ is set equal to $\sqrt{2k_{B}T\gamma}$ , where $k_{B}$ is the Boltzmann constant and $T$ is the temperature parameter in the pair_style command.  

For style dpd/tstat, the force on atom I due to atom J is the same as the above equation, except that the conservative $F^{C}$ term is dropped. Also, during the run, $T$ is set each timestep to a ramped value from Tstart to Tstop.  

For style dpd, the pairwise energy associated with style dpd is only due to the conservative force term $F^{C}$ , and is shifted to be zero at the cutoff distance $r_{c}$ . The pairwise virial is calculated using all 3 terms. For style dpd/tstat there is no pairwise energy, but the last two terms of the formula make a contribution to the virial.  

For style dpd, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• A (force units) • γ (force/velocity units) • cutoff (distance units)  

The cutoff coefficient is optional. If not specified, the global DPD cutoff is used. Note that sigma is set equal to sqrt(2 T gamma), where T is the temperature set by the pair_style command so it does not need to be specified.  

For style dpd/tstat, the coefficients defined for each pair of atoms types via the pair_coeff command are:  

• γ (force/velocity units) cutoff (distance units)  

The cutoff coefficient is optional.  

Styles with a gpu suffix are implemented based on the work of (Afshar) and (Phillips).  

![](images/5c43a58a41cb32c349651dd1c293ea7b137d6b924fafefc1f970f7c1ec180fce.jpg)  

# Note  

If you are modeling DPD polymer chains, you may want to use the pair_style srp command in conjunction with these pair styles. It is a soft segmental repulsive potential (SRP) that can prevent DPD polymer chains from crossing each other.  

![](images/78dc5b0381ba32aa5e140ab9ce35527de8f237be9570f04992b3d9b84cdc510a.jpg)  

# Note  

The virial calculation for pressure when using these pair styles includes all the components of force listed above, including the random force. Since the random force depends on random numbers, everything that changes the order of atoms in the neighbor list (e.g. different number of MPI ranks or a different neighbor list skin distance) will also change the sequence in which the random numbers are applied and thus the individual forces and therefore also the virial/pressure.  

# Note  

For more consistent time integration and force computation you may consider using fix mvv/dpd instead of fix nve.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.84.4 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles do not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

These pair styles do not support the pair_modify shift option for the energy of the pair interaction. Note that as discussed above, the energy due to the conservative $F^{C}$ term is already shifted to be 0.0 at the cutoff distance $r_{c}$ .  

The pair_modify table option is not relevant for these pair styles.  

These pair styles do not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file. Note that the user-specified random number seed is stored in the restart file, so when a simulation is restarted, each processor will re-initialize its random number generator the same way it did initially. This means the random forces will be random, but will not be the same as they would have been if the original simulation had continued past the restart time.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

The dpd/tstat style can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

# 4.84.5 Restrictions  

These styles are part of the DPD-BASIC package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The default frequency for rebuilding neighbor lists is every 10 steps (see the neigh_modify command). This may be too infrequent for style dpd simulations since particles move rapidly and can overlap by large amounts. If this setting yields a non-zero number of “dangerous” reneighborings (printed at the end of a simulation), you should experiment with forcing reneighboring more often and see if system energies/trajectories change.  

These pair styles requires you to use the comm_modify vel yes command so that velocities are stored by ghost atoms.  

These pair styles will not restart exactly when using the read_restart command, though they should provide statistically similar results. This is because the forces they compute depend on atom velocities. See the read_restart command for more details.  

# 4.84.6 Related commands  

pair_style dpd/ext, pair_coeff , fix nvt, fix langevin, pair_style srp, fix mvv/dpd.  

# 4.84.7 Default  

none  

(Groot) Groot and Warren, J Chem Phys, 107, 4423-35 (1997).   
(Afshar) Afshar, F. Schmid, A. Pishevar, S. Worley, Comput Phys Comm, 184, 1119-1128 (2013).   
(Phillips) C. L. Phillips, J. A. Anderson, S. C. Glotzer, Comput Phys Comm, 230, 7191-7201 (2011).  

# 4.85 pair_style dpd/coul/slater/long command  

Accelerator Variants: dpd/coul/slater/long/gpu  

# 4.85.1 Syntax  

pair_style dpd/coul/slater/long T cutoff_DPD seed lambda cutoff_coul  

• $\mathrm{T}=$ temperature (temperature units)   
• cutoff_ $\mathrm{DPD}=$ global cutoff for DPD interactions (distance units)   
• seed $=$ random # seed (positive integer)   
• lambda $=$ decay length of the charge (distance units)   
• cutoff_coul $=$ global cutoff for Coulombic interactions (distance units)  

# 4.85.2 Examples  

<html><body><table><tr><td>pair_style dpd/coul/slater/long 1.0 2.5 34387 0.25 3.0</td></tr><tr><td>pair c0eff 1 1 78.0 4.5 not charged by default</td></tr><tr><td>pair r_coeff 2 2 78.0 4.5 yes</td></tr></table></body></html>  

# 4.85.3 Description  

Added in version 27June2024.  

Style dpd/coul/slater/long computes a force field for dissipative particle dynamics (DPD) following the exposition in (Groot). It also allows for the use of charged particles in the model by adding a long-range Coulombic term to the DPD interactions. The short-range portion of the Coulombics is calculated by this pair style. The long-range Coulombics are computed by use of the kspace_style command, e.g. using the Ewald or PPPM styles.  

Coulombic forces in mesoscopic models such as DPD employ potentials without explicit excluded-volume interactions. The goal is to prevent artificial ionic pair formation by including a charge distribution in the Coulomb potential, following the formulation in (Melchor1).  

![](images/a8018a35df9889dff4bc7c623d52cc9e78427f4d26c920f02bf1ea23c89684e7.jpg)  

# Note  

This pair style is effectively the combination of the pair_style dpd and pair_style coul/slater/long commands, but should be more efficient (especially on GPUs) than using pair_style hybrid/overlay dpd coul/slater/long. That is particularly true for the GPU package version of the pair style since this version is compatible with computing neighbor lists on the GPU instead of the CPU as is required for hybrid styles.  

In the charged DPD model, the force on bead I due to bead J is given as a sum of 4 terms:  

$$
\begin{array}{r l r}&{\vec{f}=(F^{C}+F^{D}+F^{R}+F^{E})r\hat{i}_{j}}\ &{F^{C}=A w(r)}&{r<r_{D P D}}\ &{F^{D}=-\gamma w^{2}(r)(r\hat{i}_{j}\bullet\vec{\nu}_{i j})}&{r<r_{D P D}}\ &{F^{R}=\sigma w(r)\alpha(\Delta t)^{-1/2}}&{r<r_{D P D}}\ &{w(r)=1-\frac{r}{r_{D P D}}}\ &{F^{E}=\frac{C q_{i}q_{j}}{\varepsilon r^{2}}\left(1-e x p\left(\frac{2r_{i j}}{\lambda}\right)\left(1+\frac{2r_{i j}}{\lambda}\left(1+\frac{r_{i j}}{\lambda}\right)\right)\right)}\end{array}
$$  

where $F^{C}$ is a conservative force, $F^{D}$ is a dissipative force, $F^{R}$ is a random force, and $F^{E}$ is an electrostatic force. $\hat{r_{i j}}$ is a unit vector in the direction $r_{i}-r_{j}$ , $\vec{\nu}_{i j}$ is the vector difference in velocities of the two atoms $\vec{\nu}_{i}-\vec{\nu}_{j}$ , $\alpha$ is a Gaussian random number with zero mean and unit variance, $d t$ is the timestep size, and $w(r)$ is a weighting factor that varies between 0 and 1.  

$\sigma$ is set equal to $\sqrt{2k_{B}T\gamma},$ , where $k_{B}$ is the Boltzmann constant and $T$ is the temperature parameter in the pair_style command.  

rDPD is the pairwise cutoff for the first 3 DPD terms in the formula as specified by cutoff_DPD. For the $F^{E}$ term, pairwise interactions within the specified cutoff_coul distance are computed directly; interactions beyond that distance are computed in reciprocal space. $C$ is the same Coulomb conversion factor used in the Coulombic formulas described on the pair_coul doc page.  

The following parameters must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• A (force units) • γ (force/velocity units)  

• is_charged (optional boolean, default $=\mathrm{no}$ )  

The is_charged parameter is optional and can be specified as yes or no. Yes should be used for interactions between two types of charged particles. No is the default and should be used for interactions between two types of particles when one or both are uncharged.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.85.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This pair style does not support the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file. Note that the user-specified random number seed is stored in the restart file, so when a simulation is restarted, each processor will re-initialize its random number generator the same way it did initially. This means the random forces will be random, but will not be the same as they would have been if the original simulation had continued past the restart time.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.85.5 Restrictions  

This style is part of the DPD-BASIC package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The default frequency for rebuilding neighbor lists is every 10 steps (see the neigh_modify command). This may be too infrequent since particles move rapidly and can overlap by large amounts. If this setting yields a non-zero number of “dangerous” reneighborings (printed at the end of a simulation), you should experiment with forcing reneighboring more often and see if system energies/trajectories change.  

This pair style requires use of the comm_modify vel yes command so that velocities are stored by ghost atoms  

This pair style also requires use of a long-range solvers from the KSPACE package.  

This pair style will not restart exactly when using the read_restart command, though they should provide statistically similar results. This is because the forces they compute depend on atom velocities. See the read_restart command for more details.  

# 4.85.6 Related commands  

pair_style dpd, pair_style coul/slater/long,  

# 4.85.7 Default  

For the pair_coeff command, the default is is_charged $\mathbf{\mu}=\mathbf{n}\mathbf{O}$ .  

(Groot) Groot and Warren, J Chem Phys, 107, 4423-35 (1997).   
(Melchor) Gonzalez-Melchor, Mayoral, Velazquez, and Alejandre, J Chem Phys, 125, 224107 (2006).  

# 4.86 pair_style dpd/ext command  

Accelerator Variants: dpd/ext/kk dpd/ext/omp  

# 4.87 pair_style dpd/ext/tstat command  

Accelerator Variants: dpd/ext/tstat/kk dpd/ext/tstat/omp  

# 4.87.1 Syntax  

<html><body><table><tr><td>pair_style e dpd/ext T cutoff seed pair_style dpd/ext /tstat Tstart Tstop cutoff seed</td></tr></table></body></html>  

• $\mathrm{T}=$ temperature (temperature units)   
• Tstart,Tstop $=$ desired temperature at start/end of run (temperature units)   
• cutof $=$ global cutoff for DPD interactions (distance units)   
• seed $=$ random # seed (positive integer)  

# 4.87.2 Examples  

pair_style dpd/ext 1.0 2.5 34387   
pair_coeff 1 1 25.0 4.5 4.5 0.5 0.5 1.2   
pair_coeff 1 2 40.0 4.5 4.5 0.5 0.5 1.2   
pair_style hybrid/overlay lj/cut 2.5 dpd/ext/tstat 1.0 1.0 2.5 34387   
pair_coeff \* \* lj/cut 1.0 1.0   
pair_coeff \* \* 4.5 4.5 0.5 0.5 1.2  

# 4.87.3 Description  

The style dpd/ext computes an extended force field for dissipative particle dynamics (DPD) following the exposition in (Groot), (Junghans).  

Style dpd/ext/tstat invokes an extended DPD thermostat on pairwise interactions, equivalent to the non-conservative portion of the extended DPD force field. To use dpd/ext/tstat as a thermostat for another pair style, use the pair_style hybrid/overlay command to compute both the desired pair interaction and the thermostat for each pair of particles.  

For the style dpd/ext, the force on atom I due to atom J is given as a sum of 3 terms  

$$
\begin{array}{l}{{{\bf f}}={f^{C}}+{f^{D}}+{f^{R}}\qquadr<r_{c}}\ {{f^{C}}=A_{i j}w(r){\hat{\bf r}}_{i j}}\ {{f^{D}}=-\gamma_{\parallel}w_{\parallel}^{2}(r)({\hat{\bf r}}_{i j}\cdot{\bf v}_{i j}){\hat{\bf r}}_{i j}-\gamma_{\perp}w_{\perp}^{2}(r)({\bf I}-{\hat{\bf r}}_{i j}{\hat{\bf r}}_{i j}^{\mathrm{T}}){\bf v}_{i j}}\ {{f^{R}}=\sigma_{\parallel}w_{\parallel}(r)\frac{\alpha}{\sqrt{\Delta t}}{\hat{\bf r}}_{i j}+\sigma_{\perp}w_{\perp}(r)({\bf I}-{\hat{\bf r}}_{i j}{\hat{\bf r}}_{i j}^{\mathrm{T}})\frac{\xi_{i j}}{\sqrt{\Delta t}}}\ {w(r)=1-r/r_{c}}\end{array}
$$  

where $\mathbf{f}^{C}$ is a conservative force, $\mathbf{f}^{D}$ is a dissipative force, and $\mathbf{f}^{R}$ is a random force. $A_{i j}$ is the maximum repulsion between the two atoms, $\hat{\mathbf{r}}_{i j}$ is a unit vector in the direction $\mathbf{r}_{i}-\mathbf{r}_{j}$ , $\mathbf{v}_{i j}=\mathbf{v}_{i}-\mathbf{v}_{j}$ is the vector difference in velocities of the two atoms, $\alpha$ and $\xi_{i j}$ are Gaussian random numbers with zero mean and unit variance, $\Delta t$ is the timestep, $w(r)=1-r/r_{c}$ is a weight function for the conservative interactions that varies between 0 and 1, $r_{c}$ is the corresponding cutoff, $w_{\alpha}(r)=(1-r/\bar{r}_{c})^{s_{\alpha}}$ , $\alpha\equiv(\parallel,\perp)$ , are weight functions with coefficients $s_{\alpha}$ that vary between 0 and 1, $\Bar{r}_{c}$ is the corresponding cutoff, I is the unit matrix, $\sigma_{\alpha}=\sqrt{2k_{B}T\gamma_{\alpha}}$ , where $k_{B}$ is the Boltzmann constant and $T$ is the temperature in the pair_style command.  

For the style dpd/ext/tstat, the force on atom I due to atom J is the same as the above equation, except that the conservative $\mathbf{f}^{C}$ term is dropped. Also, during the run, $\mathrm{T}$ is set each timestep to a ramped value from Tstart to Tstop.  

For the style dpd/ext, the pairwise energy associated with style dpd/ext is only due to the conservative force term $\mathbf{f}^{C}$ , and is shifted to be zero at the cutoff distance $r_{c}$ . The pairwise virial is calculated using all three terms. There is no pairwise energy for style dpd/ext/tstat, but the last two terms of the formula contribute the virial.  

For the style dpd/ext/tstat, the force on atom I due to atom J is the same as the above equation, except that the conservative $\mathbf{f}^{C}$ term is dropped. Also, during the run, $\mathrm{T}$ is set each timestep to a ramped value from Tstart to Tstop.  

For the style dpd/ext, the pairwise energy associated with style dpd/ext is only due to the conservative force term $\mathbf{f}^{C}$ , and is shifted to be zero at the cutoff distance $r_{c}$ . The pairwise virial is calculated using all three terms. There is no pairwise energy for style dpd/ext/tstat, but the last two terms of the formula contribute the virial.  

For the style dpd/ext, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above:  

• A (force units)   
• γ (force/velocity units)   
• $\gamma_{\perp}$ (force/velocity units)   
• $s_{\parallel}$ (unitless)   
• $s_{\perp}$ (unitless)   
• $r_{c}$ (distance units)  

The last coefficient is optional. If not specified, the global DPD cutoff is used. Note that $\sigma$ ’s are set equal to $\sqrt{2k_{B}T\gamma},$ where $T$ is the temperature set by the pair_style command so it does not need to be specified.  

For the style dpd/ext/tstat, the coefficients defined for each pair of atoms types via the pair_coeff command are:  

• $\gamma_{\parallel}$ (force/velocity units)   
• $\gamma_{\perp}$ (force/velocity units)   
• $s_{\parallel}$ (unitless)   
• $s_{\perp}$ (unitless)   
• $r_{c}$ (distance units)  

The last coefficient is optional.  

![](images/ed958f828a768a708c07c5166861d9e46aa3ad3a54c32141f9f9beb5bce62549.jpg)  

# Note  

If you are modeling DPD polymer chains, you may want to use the pair_style srp command in conjunction with these pair styles. It is a soft segmental repulsive potential (SRP) that can prevent DPD polymer chains from crossing each other.  

# Note  

The virial calculation for pressure when using these pair styles includes all the components of force listed above, including the random force. Since the random force depends on random numbers, everything that changes the order of atoms in the neighbor list (e.g. different number of MPI ranks or a different neighbor list skin distance) will also change the sequence in which the random numbers are applied and thus the individual forces and therefore also the virial/pressure.  

![](images/5bae7dd98ac076af2362b5f3ec2e8c8592c1ef7379aa1bccf2e2cdb3fc77fadd.jpg)  

# Note  

For more consistent time integration and force computation you may consider using fix mvv/dpd instead of fix nve.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# Mixing, shift, table, tail correction, restart, rRESPA info:  

The style dpd/ext does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

The pair styles do not support the pair_modify shift option for the energy of the pair interaction. Note that as discussed above, the energy due to the conservative $\mathbf{f}^{C}$ term is already shifted to be zero at the cutoff distance $r_{c}$ .  

The pair_modify table option is not relevant for the style dpd/ext.  

The style dpd/ext does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

The pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, and outerkeywords.  

The style dpd/ext/tstat can ramp its target temperature over multiple runs, using the start and stop keywords of the run command. See the run command for details of how to do this.  

# 4.87.4 Restrictions  

These styles are part of the DPD-BASIC package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The default frequency for rebuilding neighbor lists is every 10 steps (see the neigh_modify command). This may be too infrequent for style dpd/ext simulations since particles move rapidly and can overlap by large amounts. If this setting yields a non-zero number of say{dangerous} reneighborings (printed at the end of a simulation), you should experiment with forcing reneighboring more often and see if system energies/trajectories change.  

The pair styles require to use the comm_modify vel yes command so that velocities are stored by ghost atoms.  

The pair styles will not restart exactly when using the read_restart command, though they should provide statistically similar results. This is because the forces they compute depend on atom velocities. See the read_restart command for more details.  

# 4.87.5 Related commands  

pair_style dpd, pair_coeff , fix nvt, fix langevin, pair_style srp, fix mvv/dpd.  

Default: none  

(Groot) Groot and Warren, J Chem Phys, 107, 4423-35 (1997).   
(Junghans) Junghans, Praprotnik and Kremer, Soft Matter 4, 156, 1119-1128 (2008).  

# 4.88 pair_style dpd/fdt command  

# 4.89 pair_style dpd/fdt/energy command  

Accelerator Variants: dpd/fdt/energy/kk  

# 4.89.1 Syntax  

# 4.89.3 Description  

Styles dpd/fdt and dpd/fdt/energy compute the force for dissipative particle dynamics (DPD) simulations. The dpd/fdt style is used to perform DPD simulations under isothermal and isobaric conditions, while the dpd/fdt/energy style is used to perform DPD simulations under isoenergetic and isoenthalpic conditions (see (Lisal)). For DPD simulations in general, the force on atom I due to atom J is given as a sum of 3 terms  

$$
\begin{array}{r l r l}&{\vec{f}=(F^{C}+F^{D}+F^{R})r_{i j}}&&{\quad r<r_{c}}\ &{F^{C}=A w(r)}\ &{F^{D}=-\gamma w^{2}(r)(\hat{r_{i j}}\bullet\vec{\nu}_{i j})}&&{}\ &{F^{R}=\sigma w(r)\alpha(\Delta t)^{-1/2}}&&{}\ &{w(r)=1-\cfrac{r}{r_{c}}}\end{array}
$$  

where $F^{C}$ is a conservative force, $F^{D}$ is a dissipative force, and $F^{R}$ is a random force. $\hat{r_{i j}}$ is a unit vector in the direction $r_{i}-r_{j}$ , $\vec{\nu}_{i j}$ is the vector difference in velocities of the two atoms, $\vec{\nu}_{i}-\vec{\nu}_{j}$ , $\alpha$ is a Gaussian random number with zero mean and unit variance, $d t$ is the timestep size, and $w(r)$ is a weighting factor that varies between 0 and 1, $r_{c}$ is the pairwise cutoff. Note that alternative definitions of the weighting function exist, but would have to be implemented as a separate pair style command.  

For style dpd/fdt, the fluctuation-dissipation theorem defines $\gamma$ to be set equal to $\sigma^{2}/(2T)$ , where $T$ is the set point temperature specified as a pair style parameter in the above examples. The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• A (force units) • σ (force\*time^(1/2) units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global DPD cutoff is used.  

Style dpd/fdt/energy is used to perform DPD simulations under isoenergetic and isoenthalpic conditions. The fluctuation-dissipation theorem defines $\gamma$ to be set equal to $\sigma^{2}/(2\theta)$ , where $\theta$ is the average internal temperature for the pair. The particle internal temperature is related to the particle internal energy through a mesoparticle equation of state (see fix eos). The differential internal conductive and mechanical energies are computed within style dpd/fdt/energy as:  

$$
\begin{array}{l}{{d u_{i}^{c o n d}=\kappa_{i j}(\displaystyle\frac{1}{\theta_{i}}-\displaystyle\frac{1}{\theta_{j}})\omega_{i j}^{2}+\alpha_{i j}\omega_{i j}\zeta_{i j}^{q}(\Delta t)^{-1/2}}}\ {{d u_{i}^{m e c h}=-\displaystyle\frac{1}{2}\gamma_{i j}\omega_{i j}^{2}(\displaystyle\frac{\vec{r}_{i j}}{r_{i j}}\bullet\vec{\nu}_{i j})^{2}-\displaystyle\frac{\sigma_{i j}^{2}}{4}(\displaystyle\frac{1}{m_{i}}+\displaystyle\frac{1}{m_{j}})\omega_{i j}^{2}-\displaystyle\frac{1}{2}\sigma_{i j}\omega_{i j}(\displaystyle\frac{\vec{r}_{i j}}{r_{i j}}\bullet\vec{\nu}_{i j})\zeta_{i j}(\Delta t)^{-1/2}}}\end{array}
$$  

where  

$$
\begin{array}{c}{{\alpha_{i j}^{2}=2k_{B}\kappa_{i j}}}\ {{\displaystyle\sigma_{i j}^{2}=2\gamma_{i j}k_{B}\Theta_{i j}}}\ {{\displaystyle\Theta_{i j}^{-1}=\displaystyle\frac{1}{2}(\frac{1}{\theta_{i}}+\frac{1}{\theta_{j}})}}\end{array}
$$  

$\zeta_{i}j^{q}$ is a second Gaussian random number with zero mean and unit variance that is used to compute the internal conductive energy. The fluctuation-dissipation theorem defines $a l p h a^{2}$ to be set equal to $2k_{B}\kappa$ , where $\kappa$ is the mesoparticle thermal conductivity parameter. The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• A (force units)  

• σ (force\*time^(1/2) units) • κ (energy\*temperature/time units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global DPD cutoff is used.  

The pairwise energy associated with styles dpd/fdt and dpd/fdt/energy is only due to the conservative force term $F^{C}$ , and is shifted to be zero at the cutoff distance $r_{c}$ . The pairwise virial is calculated using only the conservative term.  

The forces computed through the dpd/fdt and dpd/fdt/energy styles can be integrated with the velocity-Verlet integration scheme or the Shardlow splitting integration scheme described by (Lisal). In the cases when these pair styles are combined with the fix shardlow, these pair styles differ from the other dpd styles in that the dissipative and random forces are split from the force calculation and are not computed within the pair style. Thus, only the conservative force is computed by the pair style, while the stochastic integration of the dissipative and random forces are handled through the Shardlow splitting algorithm approach. The Shardlow splitting algorithm is advantageous, especially when performing DPD under isoenergetic conditions, as it allows significantly larger timesteps to be taken.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.89.4 Restrictions  

These commands are part of the DPD-REACT package. They are only enabled if LAMMPS was built with that package See the Build package page for more info.  

Pair styles dpd/fdt and dpd/fdt/energy require use of the comm_modify vel yes option so that velocities are stored by ghost atoms.  

Pair style dpd/fdt/energy requires atom_style dpd to be used in order to properly account for the particle internal energies and temperatures.  

# 4.89.5 Related commands  

pair_coeff , fix shardlow  

# 4.89.6 Default  

none  

(Lisal) M. Lisal, J.K. Brennan, J. Bonet Avalos, J. Chem. Phys., 135, 204105 (2011).  

# 4.90 pair_style drip command  

# 4.90.1 Syntax  

pair_style hybrid/overlay drip [styles ...]  

• styles $=$ other styles to be overlayed with drip (optional)  

# 4.90.2 Examples  

<html><body><table><tr><td>pair_style hybrid/overlay drip coeff ** none</td><td></td></tr><tr><td>pair pair _coeff ** drip C.drip</td><td></td></tr><tr><td>pair</td><td></td></tr><tr><td>_style hybrid/overlay drip rebo coeff ** drip C.drip</td><td>C</td></tr><tr><td>pair pair _coeff ** rebo</td><td>CH.airebo</td></tr><tr><td></td><td></td></tr><tr><td>pair _style</td><td>e hybrid/overlay drip rebo</td></tr><tr><td>pair coeff ** **</td><td>C.drip C NULL</td></tr><tr><td>pair coeff</td><td>CH.airebo C H</td></tr></table></body></html>  

# 4.90.3 Description  

Style drip computes the interlayer interactions of layered materials using the dihedral-angle-corrected registrydependent (DRIP) potential as described in (Wen), which is based on the (Kolmogorov) potential and provides an improved prediction for forces. The total potential energy of a system is  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\frac{1}{2}\sum_{i}\sum_{j\notin\mathrm{layer}i}\phi_{i j}}}\ {{\displaystyle\phi_{i j}=f_{\mathrm{c}}(x_{r})\left[e^{-\lambda(r_{i j}-z_{0})}\left[C+f(\rho_{i j})+g(\rho_{i j},\{\alpha_{i j}^{(m)}\})\right]-A\left(\frac{z_{0}}{r_{i j}}\right)^{6}\right]}}\end{array}
$$  

where the $r^{-6}$ term models the attractive London dispersion, the exponential term is designed to capture the registry effect due to overlapping $p i$ bonds, and $f c$ is a cutoff function.  

This potential (DRIP) only provides the interlayer interactions between graphene layers. So, to perform a realistic simulation, it should be used in combination with an intralayer potential such as $R E B O$ and Tersoff . To keep the intralayer interactions unaffected, we should avoid applying DRIP to contribute energy to intralayer interactions. This can be achieved by assigning different molecular IDs to atoms in different layers, and DRIP is implemented such that only atoms with different molecular ID can interact with each other. For this purpose, atom style “molecular” or “full” has to be used.  

On the other way around, REBO (Tersoff or any other potential used to provide the intralayer interactions) should not interfere with the interlayer interactions described by DRIP. This is typically automatically achieved using the commands provided in the Examples section above, since the cutoff distance for carbon-carbon interaction in the intralayer potentials (e.g. 2 Angstrom for REBO) is much smaller than the equilibrium layer distance of graphene layers (about 3.4 Angstrom). If you want, you can enforce this by assigning different atom types to atoms in different layers, and apply an intralayer potential to one atom type. See pair_hybrid for details.  

The pair_coeff command for DRIP takes $4{+}N$ arguments, where $N$ is the number of LAMMPS atom types. The fist three arguments must be fixed to be $**d r i p$ , the fourth argument is the path to the DRIP parameter file, and the remaining N arguments specifying the mapping between element in the parameter file and atom types. For example, if your LAMMPS simulation has 3 atom types and you want all of them to be C, you would use the following pair_coeff command:  

If a mapping value is specified as NULL, the mapping is not performed. This could be useful when DRIP is used to model part of the system where other element exists. Suppose you have a hydrocarbon system, with C of atom type 1 and $\mathrm{H}$ of atom type 2, you can use the following command to inform DRIP not to model H atoms:  

pair_style hybrid/overlay drip rebo pair_coeff \* \* drip C.drip C NULL pair_coeff \* \* rebo CH.airebo C H  

#  Note  

The potential parameters developed in (Wen) are provided with LAMMPS (see the “potentials” directory). Besides those in Wen, an additional parameter “normal_cutoff”, specific to the LAMMPS implementation, is used to find the three nearest neighbors of an atom to construct the normal.  

# 4.90.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

# 4.90.5 Restrictions  

This pair style is part of the INTERLAYER package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

The C.drip parameter file provided with LAMMPS (see the “potentials” directory) is parameterized for metal units. You can use the DRIP potential with any LAMMPS units, but you would need to create your own custom parameter file with coefficients listed in the appropriate units, if your simulation does not use “metal” units.  

# 4.90.6 Related commands  

pair_style lebedeva_z, pair_style kolmogorov/crespi/z, pair_style kolmogorov/crespi/full, pair_style ilp/graphene/hbn.  

(Wen) M. Wen, S. Carr, S. Fang, E. Kaxiras, and E. B. Tadmor, Phys. Rev. B, 98, 235404 (2018) (Kolmogorov) A. N. Kolmogorov, V. H. Crespi, Phys. Rev. B 71, 235415 (2005)  

# 4.91 pair_style dsmc command  

# 4.91.1 Syntax  

pair_style dsmc max_cell_size seed weighting Tref Nrecompute Nsample  

• max_cell_size $=$ global maximum cell size for DSMC interactions (distance units)   
• seed $=$ random # seed (positive integer)   
• weighting $=$ macroparticle weighting   
• Tref $=$ reference temperature (temperature units)   
• Nrecompute $=$ re-compute $\mathbf{V}^{*}$ sigma_max every this many timesteps (timesteps)   
• Nsample $=$ sample this many times in recomputing v\*sigma_max  

# 4.91.2 Examples  

pair_style dsmc 2.5 34387 10 1.0 100 20   
pair_coeff \* \* 1.0   
pair_coeff 1 1 1.0  

# 4.91.3 Description  

Style dsmc computes collisions between pairs of particles for a direct simulation Monte Carlo (DSMC) model following the exposition in (Bird). Each collision resets the velocities of the two particles involved. The number of pairwise collisions for each pair or particle types and the length scale within which they occur are determined by the parameters of the pair_style and pair_coeff commands.  

Stochastic collisions are performed using the variable hard sphere (VHS) approach, with the user-defined max_cell_size value used as the maximum DSMC cell size, and reference cross-sections for collisions given using the pair_coeff command.  

There is no pairwise energy or virial contributions associated with this pair style.  

The following coefficient must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• sigma (area units, i.e. distance-squared)  

The global DSMC max_cell_size determines the maximum cell length used in the DSMC calculation. A structured mesh is overlayed on the simulation box such that an integer number of cells are created in each direction for each processor’s subdomain. Cell lengths are adjusted up to the user-specified maximum cell size.  

To perform a DSMC simulation with LAMMPS, several additional options should be set in your input script, though LAMMPS does not check for these settings.  

Since this pair style does not compute particle forces, you should use the “fix nve/noforce” time integration fix for the DSMC particles, e.g.  

These commands ensure that LAMMPS communicates particles to neighboring processors every timestep and that no ghost atoms are created. The output statistics for a simulation run should indicate there are no ghost particles or neighbors.  

In order to get correct DSMC collision statistics, users should specify a Gaussian velocity distribution when populating the simulation domain. Note that the default velocity distribution is uniform, which will not give good DSMC collision rates. Specify “dist gaussian” when using the velocity command as in the following:  

velocity all create 594.6 87287 loop geom dist gaussian  

# 4.91.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly  

This pair style does not support the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file. Note that the user-specified random number seed is stored in the restart file, so when a simulation is restarted, each processor will re-initialize its random number generator the same way it did initially. This means the random forces will be random, but will not be the same as they would have been if the original simulation had continued past the restart time.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.91.5 Restrictions  

This pair style is part of the MC package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires an atom style with per atom type masses.  

# 4.91.6 Related commands  

pair_coeff , fix nve/noforce, neigh_modify, neighbor, comm_modify  

# 4.91.7 Default  

• one or more keyword/value pairs must be appended.   
• keyword $=$ preset or $E a$ or $E b$ or $E c$ or $E2$ or $K3$ or $K2$ or $R s$ or $R c3$ or $R c2$ or bondL or neigh   
• If the preset keyword is given, no others are needed. Otherwise, all are mandatory except for neigh. The neigh keyword is always optional.   
preset $\mathrm{arg}=2011$ or $2015=$ which set of predefined parameters to use $2011={\mathrm{use}}$ the potential parameters from (Tainter 2011) $2015=$ use the potential parameters from (Tainter 2015)   
Ea arg $=$ three-body energy for type A hydrogen bonding interactions (energy units)   
Eb arg $=$ three-body energy for type B hydrogen bonding interactions (energy units)   
Ec arg $=$ three-body energy for type C hydrogen bonding interactions (energy units)   
E2 arg = two-body energy correction (energy units)   
K3 arg = three-body exponential constant (inverse distance units)   
K2 arg = two-body exponential constant (inverse distance units)   
Rc3 arg = three-body cutoff (distance units)   
Rc2 arg $=$ two-body cutoff (distance units)   
Rs arg = three-body switching function cutoff (distance units)   
bondL arg = intramolecular OH bond length (distance units)   
neigh arg $=$ approximate integer number of molecules within Rc3 of an oxygen atom  

# 4.92.2 Examples  

pair_style e3b 1   
pair_coeff \* \* Ea 35.85 Eb -240.2 Ec 449.3 E2 108269.9 K3 1.907 K2 4.872 Rc3 5.2 Rc2 5.2 Rs 5.0␣ $\hookrightarrow$ bondL 0.9572   
pair_style hybrid/overlay e3b 1 lj/cut/tip4p/long 1 2 1 1 0.15 8.5   
pair_coeff \* \* e3b preset 2011   
pair_style e3b OW   
labelmap atom 1 C 2 H 3 O 4 N 5 OW 6 HW   
pair_coeff \* \* Ea 35.85 Eb -240.2 Ec 449.3 E2 108269.9 K3 1.907 K2 4.872 Rc3 5.2 Rc2 5.2 Rs 5.0␣   
,→bondL 0.9572  

Used in example input script:  

examples/PACKAGES/e3b/in.e3b-tip4p2005  

# 4.92.3 Description  

The $e3b$ style computes an "explicit three-body" (E3B) potential for water (Kumar 2008).  

$$
\begin{array}{l}{{\displaystyle E=E_{2}\sum_{i,j}e^{-k_{2}r_{i j}}+E_{A}~\sum_{i,j,k_{\ell}}f(r_{i j})f(r_{k\ell})+E_{B}\sum_{i,j,k_{\ell}}f(r_{i j})f(r_{k\ell})+E_{C}\sum_{i,j,k_{\ell}}f(r_{i j})f(r_{k\ell})}}\ {{\displaystyle~f(r)=e^{-k_{3}r_{S}}(r)}}\ {{\displaystyle s(r)=\left\{\frac{1}{(R_{f}-r)^{2}(R_{f}-3R_{s}+2r)}\right.}}\ {{\displaystyle0}}\end{array}\begin{array}{l}{{\displaystyle F<R_{s}}}\ {{\displaystyle F>R_{f}}}\end{array}}\end{array}
$$  

This potential was developed as a water model that includes the three-body cooperativity of hydrogen bonding explicitly. To use it in this way, it must be applied in conjunction with a conventional two-body water model, through pair style hybrid/overlay. The three body interactions are split into three types: A, B, and C. Type A corresponds to anticooperative double hydrogen bond donor interactions. Type B corresponds to the cooperative interaction of molecules that both donate and accept a hydrogen bond. Type C corresponds to anti-cooperative double hydrogen bond acceptor interactions. The three-body interactions are smoothly cutoff by the switching function s(r) between Rs and Rc3. The two-body interactions are designed to correct for the effective many-body interactions implicitly included in the conventional two-body potential. The two-body interactions are cut off sharply at Rc2, because K3 is typically significantly smaller than K2. See (Kumar 2008) for more details.  

Only a single pair_coeff command is used with the $e3b$ style and the first two arguments must be \* \*. The oxygen atom type for the pair style is passed as the only argument to the pair_style command, not in the pair_coeff command. The hydrogen atom type is inferred from the ordering of the atoms.  

![](images/03fea4789d9fb5aa2f2db8d5535e41412c9ee309c94f5f37e8885da4d05b7723.jpg)  

# Note  

Every atom of type Otype must be part of a water molecule. Each water molecule must have consecutive IDs with the oxygen first. This pair style does not test that this criteria is met.  

![](images/4cd77730b8db57b0040c4aa135ccc8fac70a9a3ae119bb53d06f7f584242a586.jpg)  

# Note  

If using type labels, the type labels must be defined before calling the pair_coeff command.  

The pair_coeff command must have at least one keyword/value pair, as described above. The preset keyword sets the potential parameters to the values used in (Tainter 2011) or (Tainter 2015). To use the water models defined in those references, the $e3b$ style should always be used in conjunction with an lj/cut/tip4p/long style through pair_style hybrid/overlay, as demonstrated in the second example above. The preset 2011 option should be used with the TIP4P water model. The preset 2015 option should be used with the TIP4P/2005 water model. If the preset keyword is used, no other keyword is needed. Changes to the preset parameters can be made by specifying the preset keyword followed by the specific parameter to change, like Ea. Note that the other keywords must come after preset in the pair_style command. The $e3b$ style can also be used to implement any three-body potential of the same form by specifying all the keywords except neigh: Ea, Eb, Ec, E2, K3, K2, Rc3, Rc2, Rs, and bondL. The keyword bondL specifies the intramolecular OH bond length of the water model being used. This is needed to include $\mathrm{H}$ atoms that are within the cutoff even when the attached oxygen atom is not.  

This pair style allocates arrays sized according to the number of pairwise interactions within Rc3. To do this it needs an estimate for the number of water molecules within Rc3 of an oxygen atom. This estimate defaults to 10 and can be changed using the neigh keyword, which takes an integer as an argument. If the neigh setting is too small, the simulation will fail with the error “neigh is too small”. If the neigh setting is too large, the pair style will use more memory than necessary.  

This pair style tallies a breakdown of the total E3B potential energy into sub-categories, which can be accessed via the compute pair command as a vector of values of length 4. The 4 values correspond to the terms in the first equation above: the E2 term, the Ea term, the Eb term, and the Ec term.  

See the examples/PACKAGES/e3b directory for a complete example script.  

# 4.92.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style is incompatible with respa.  

# 4.92.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

This pair style requires a fixed number of atoms in the simulation, so it is incompatible with fixes like fix deposit. If the number of atoms changes between runs, this pair style must be re-initialized by calling the pair_style and pair_coeffs commands. This is not a fundamental limitation of the pair style, but the code currently does not support a variable number of atoms.  

The preset keyword currently only works with real, metal, si, and cgs units.  

# 4.92.6 Related commands  

pair_coeff , compute pair  

# 4.92.7 Default  

The option default for the neigh keyword is 10.  

(Kumar) Kumar and Skinner, J. Phys. Chem. B, 112, 8311 (2008) (Tainter 2011) Tainter, Pieniazek, Lin, and Skinner, J. Chem. Phys., 134, 184501 (2011) (Tainter 2015) Tainter, Shi, and Skinner, 11, 2268 (2015)  

# 4.93 pair_style eam command  

Accelerator Variants: eam/gpu, eam/intel, eam/kk, eam/omp, eam/opt  

# 4.94 pair_style eam/alloy command  

Accelerator Variants: eam/alloy/gpu, eam/alloy/intel, eam/alloy/kk, eam/alloy/omp, eam/alloy/opt  

4.95 pair_style eam/cd command  

4.96 pair_style eam/cd/old command  

4.97 pair_style eam/fs command  

4.98 pair_style eam/he command  

Accelerator Variants: eam/fs/gpu, eam/fs/intel, eam/fs/kk, eam/fs/omp, eam/fs/opt  

# 4.98.1 Syntax  

• style $=$ eam or eam/alloy or eam/cd or eam/cd/old or eam/fs or eam/he  

# 4.98.2 Examples  

pair_style eam   
pair_coeff \* \* cuu3   
pair_coeff 1\*3 1\*3 niu3.eam   
pair_style eam/alloy   
pair_coeff \* \* ../potentials/NiAlH_jea.eam.alloy Ni Al Ni Ni   
pair_style eam/cd   
pair_coeff \* \* ../potentials/FeCr.cdeam Fe Cr   
pair_style eam/fs   
pair_coeff \* \* NiAlH_jea.eam.fs Ni Al Ni Ni   
pair_style eam/he   
pair_coeff \* \* PdHHe.eam.he Pd H He  

# 4.98.3 Description  

Style eam computes pairwise interactions for metals and metal alloys using embedded-atom method (EAM) potentials (Daw). The total energy Ei of an atom I is given by  

$$
E_{i}=F_{\alpha}\left(\sum_{j\neq i}\rho_{\beta}(r_{i j})\right)+\frac{1}{2}\sum_{j\neq i}\phi_{\alpha\beta}(r_{i j})
$$  

where F is the embedding energy which is a function of the atomic electron density rho, phi is a pair potential interaction, and alpha and beta are the element types of atoms I and J. The multi-body nature of the EAM potential is a result of the embedding energy term. Both summations in the formula are over all neighbors J of atom I within the cutoff distance.  

The cutoff distance and the tabulated values of the functionals F, rho, and phi are listed in one or more files which are specified by the pair_coeff command. These are ASCII text files in a DYNAMO-style format which is described below. DYNAMO was the original serial EAM MD code, written by the EAM originators. Several DYNAMO potential files for different metals are included in the “potentials” directory of the LAMMPS distribution. All of these files are parameterized in terms of LAMMPS metal units.  

# $\Theta$ Note  

The eam style reads single-element EAM potentials in the DYNAMO funcfl format. Either single element or alloy systems can be modeled using multiple funcfl files and style eam. For the alloy case LAMMPS mixes the singleelement potentials to produce alloy potentials, the same way that DYNAMO does. Alternatively, a single DYNAMO setfl file or Finnis/Sinclair EAM file can be used by LAMMPS to model alloy systems by invoking the eam/alloy or eam/cd or eam/fs or eam/he styles as described below. These files require no mixing since they specify alloy interactions explicitly.  

![](images/a994c2b47c01b746638759db9457ff891d5714a8487d23cea9d3aa43636315c7.jpg)  

# Note  

Note that unlike for other potentials, cutoffs for EAM potentials are not set in the pair_style or pair_coeff command; they are specified in the EAM potential files themselves. Likewise, valid EAM potential files usually contain atomic masses; thus you may not need to use the mass command to specify them, unless the potential file uses a dummy value (e.g. 0.0). LAMMPS will print a warning, if this is the case.  

There are web sites that distribute and document EAM potentials stored in DYNAMO or other formats:  

• https://www.ctcms.nist.gov/potentials • https://openkim.org  

These potentials should be usable with LAMMPS, though the alternate formats would need to be converted to the DYNAMO format used by LAMMPS and described on this page. The NIST site is maintained by Chandler Becker (cbecker at nist.gov) who is good resource for info on interatomic potentials and file formats.  

The OpenKIM Project at https://openkim.org/browse/models/by-type provides EAM potentials that can be used directly in LAMMPS with the kim command interface.  

![](images/620c9b8fb75a095e1a9920dd304840a8509f9ea7db64a41f69b358b35bca5674.jpg)  

# Warning  

The EAM potential files tabulate the embedding energy as a function of the local electron density $\rho$ . When atoms get too close, this electron density may exceed the range for which the embedding energy was tabulated for. To avoid crashes, LAMMPS will assume a linearly increasing embedding energy for electron densities beyond the maximum tabulated value. LAMMPS will print a warning when this happens. It may be acceptable at the beginning of an equilibration (e.g. when using randomized coordinates) but would be a big concern for accuracy if it happens during production runs. The EAM potential file triggering the warning during production is thus not a good choice, and the EAM model in general not likely a good model for the kind of system under investigation.  

For style eam, potential values are read from a file that is in the DYNAMO single-element funcfl format. If the DYNAMO file was created by a Fortran program, it cannot have “D” values in it for exponents. C only recognizes “e” or “E” for scientific notation.  

For style eam a potential file must be assigned to each I,I pair of atom types by using one or more pair_coeff commands, each with a single argument:  

• filename  

Thus the following command • line 3: Nrho, drho, Nr, dr, cutoff  

On line 2, all values but the mass are ignored by LAMMPS. The mass is in mass units, e.g. mass number or grams/mole for metal units. The cubic lattice constant is in Angstroms. On line 3, Nrho and Nr are the number of tabulated values in the subsequent arrays, drho and dr are the spacing in density and distance space for the values in those arrays, and the specified cutoff becomes the pairwise cutoff used by LAMMPS for the potential. The units of dr are Angstroms; I’m not sure of the units for drho - some measure of electron density.  

Following the three header lines are three arrays of tabulated values:  

• embedding function F(rho) (Nrho values) • effective charge function Z(r) (Nr values) • density function rho(r) (Nr values)  

The values for each array can be listed as multiple values per line, so long as each array starts on a new line. For example, the individual $Z(\boldsymbol{\mathrm{r}})$ values are for r = 0,dr,2\*dr, . . . $(\mathrm{Nr}{-}1)^{*}\mathrm{dr}$ .  

The units for the embedding function F are $\mathrm{eV.}$ The units for the density function rho are the same as for drho (see above, electron density). The units for the effective charge $Z$ are “atomic charge” or sqrt(Hartree \* Bohr-radii). For two interacting atoms i,j this is used by LAMMPS to compute the pair potential term in the EAM energy expression as $\mathrm{r}^{*}\mathrm{phi}$ , in units of $\mathrm{eV}.$ -Angstroms, via the formula  

$$
r\cdot\phi=27.2\cdot0.529\cdot Z_{i}\cdot Z_{j}
$$  

where 1 Hartree $=27.2\mathrm{eV}$ and $1~\mathrm{Bohr}=0.529$ Angstroms.  

Style eam/alloy computes pairwise interactions using the same formula as style eam. However the associated pair_coeff command reads a DYNAMO setfl file instead of a funcfl file. Setfl files can be used to model a single-element or alloy system. In the alloy case, as explained above, setfl files contain explicit tabulated values for alloy interactions. Thus they allow more generality than funcfl files for modeling alloys.  

For style eam/alloy, potential values are read from a file that is in the DYNAMO multi-element setfl format, except that element names (Ni, Cu, etc) are added to one of the lines in the file. If the DYNAMO file was created by a Fortran program, it cannot have “D” values in it for exponents. C only recognizes “e” or “E” for scientific notation.  

Only a single pair_coeff command is used with the eam/alloy style which specifies a DYNAMO setfl file, which contains information for M elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of setfl elements to atom types  

As an example, the potentials/NiAlH_jea.eam.alloy file is a setfl file which has tabulated EAM values for 3 elements and their alloy interactions: Ni, Al, and H. See the pair_coeff doc page for alternate ways to specify the path for the potential file. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Ni, and the fourth to be Al, you would use the following pair_coeff command:  

pair_coeff \* \* NiAlH_jea.eam.alloy Ni Ni Ni Al  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three Ni arguments map LAMMPS atom types 1,2,3 to the Ni element in the setfl file. The final Al argument maps LAMMPS atom type 4 to the Al element in the setfl file. Note that there is no requirement that your simulation use all the elements specified by the setfl file.  

If a mapping value is specified as NULL, the mapping is not performed. This can be used when an eam/alloy potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Setfl files in the potentials directory of the LAMMPS distribution have an “.eam.alloy” suffix. A DYNAMO multielement setfl file is formatted as follows:  

• lines $^{1,2,3=}$ comments (ignored) • line 4: Nelements Element1 Element2 . . . ElementN • line 5: Nrho, drho, Nr, dr, cutoff  

In a DYNAMO setfl file, line 4 only lists Nelements $=$ the # of elements in the setfl file. For LAMMPS, the element name (Ni, Cu, etc) of each element must be added to the line, in the order the elements appear in the file.  

The meaning and units of the values in line 5 is the same as for the funcfl file described above. Note that the cutoff (in Angstroms) is a global value, valid for all pairwise interactions for all element pairings.  

Following the 5 header lines are Nelements sections, one for each element, each with the following format:  

• line $1=$ atomic number, mass, lattice constant, lattice type (e.g. FCC)   
• embedding function F(rho) (Nrho values)   
• density function rho(r) (Nr values)  

As with the funcfl files, only the mass (in mass units, e.g. mass number or grams/mole for metal units) is used by LAMMPS from the first line. The cubic lattice constant is in Angstroms. The F and rho arrays are unique to a single element and have the same format and units as in a funcfl file.  

Following the Nelements sections, Nr values for each pair potential phi(r) array are listed for all i,j element pairs in the same format as other arrays. Since these interactions are symmetric $(\mathrm{i},\mathrm{j}=\mathrm{j},\mathrm{i})$ only phi arrays with $\mathrm{i}>=\mathrm{j}$ are listed, in the following order: $\mathrm{i},\mathrm{j}=(1,1)$ , (2,1), (2,2), (3,1), (3,2), (3,3), (4,1), . . . , (Nelements, Nelements). Unlike the effective charge array $Z(\boldsymbol{\mathrm{r}})$ in funcfl files, the tabulated values for each phi function are listed in setfl files directly as $\mathbf{r}^{*}\mathbf{ph}$ (in units of $\mathrm{eV}.$ -Angstroms), since they are for atom pairs.  

Style eam/cd is similar to the eam/alloy style, except that it computes alloy pairwise interactions using the concentrationdependent embedded-atom method (CD-EAM). This model can reproduce the enthalpy of mixing of alloys over the full composition range, as described in (Stukowski). Style eam/cd/old is an older, slightly different and slower two-site formulation of the model (Caro).  

The pair_coeff command is specified the same as for the eam/alloy style. However the DYNAMO setfl file must has two lines added to it, at the end of the file:  

• line 1: Comment line (ignored) • line 2: N Coefficient0 Coefficient1 . . . CoefficientN  

The last line begins with the degree $N$ of the polynomial function $h(x)$ that modifies the cross interaction between A and B elements. Then $N{+}I$ coefficients for the terms of the polynomial are then listed.  

Modified EAM setfl files used with the eam/cd style must contain exactly two elements, i.e. in the current implementation the eam/cd style only supports binary alloys. The first and second elements in the input EAM file are always taken as the $A$ and $B$ species.  

CD-EAM files in the potentials directory of the LAMMPS distribution have a “.cdeam” suffix.  

Style eam/fs computes pairwise interactions for metals and metal alloys using a generalized form of EAM potentials due to Finnis and Sinclair (Finnis). Style eam/he is similar to eam/fs except that it allows for negative electron density in order to capture the behavior of helium in metals (Zhou6).  

The total energy Ei of an atom I is given by  

$$
E_{i}=F_{\alpha}\left(\sum_{j\neq i}\rho_{\alpha\beta}(r_{i j})\right)+\frac{1}{2}\sum_{j\neq i}\phi_{\alpha\beta}(r_{i j})
$$  

where $\rho_{\alpha\beta}$ refers to the density contributed by a neighbor atom J of element $\beta$ at the site of atom I of element $\alpha$ . This has the same form as the EAM formula above, except that rho is now a functional specific to the elements of both atoms I and J, so that different elements can contribute differently to the total electron density at an atomic site depending on the identity of the element at that atomic site.  

The associated pair_coeff command for style eam/fs or eam/he reads a DYNAMO setfl file that has been extended to include additional $\rho_{\alpha\beta}$ arrays of tabulated values. A discussion of how FS EAM differs from conventional EAM alloy potentials is given in (Ackland1). An example of such a potential is the same author’s Fe-P FS potential (Ackland2). Note that while FS potentials always specify the embedding energy with a square root dependence on the total density, the implementation in LAMMPS does not require that; the user can tabulate any functional form desired in the FS potential files.  

For style eam/fs and eam/he the form of the pair_coeff command is exactly the same as for style eam/alloy, e.g.  

pair_coeff \* \* NiAlH_jea.eam.fs Ni Ni Ni Al  

with N additional arguments after the filename, where N is the number of LAMMPS atom types. See the pair_coeff doc page for alternate ways to specify the path for the potential file. The N values determine the mapping of LAMMPS atom types to EAM elements in the file, as described above for style eam/alloy. As with eam/alloy, if a mapping value is NULL, the mapping is not performed. This can be used when an eam/fs or eam/he potential is used as part of a hybrid pair style. The NULL values are used as placeholders for atom types that will be used with other potentials.  

FS EAM and HE EAM files include more information than the DYNAMO setfl format files read by eam/alloy, in that i,j density functionals for all pairs of elements are included as needed by the Finnis/Sinclair formulation of the EAM.  

FS EAM files in the potentials directory of the LAMMPS distribution have an “.eam.fs” suffix. They are formatted as follows:  

• lines $^{1,2,3=}$ comments (ignored) • line 4: Nelements Element1 Element2 . . . ElementN • line 5: Nrho, drho, Nr, dr, cutoff  

The 5-line header section is identical to an EAM setfl file.  

Following the header are Nelements sections, one for each element $\beta$ , each with the following format:  

• line $1=$ atomic number, mass, lattice constant, lattice type (e.g. FCC) • embedding function F(rho) (Nrho values) • density function $\rho_{1\beta}(r)$ for element $\beta$ at element 1 (Nr values) • density function $\rho_{2\beta}(r)$ for element $\beta$ at element 2 • density function $\rho_{N_{e l e m}\beta}(r)$ for element $\beta$ at element $N_{e l e m}$  

The units of these quantities in line 1 are the same as for setfl files. Note that the rho(r) arrays in Finnis/Sinclair can be asymmetric $(\rho_{\alpha\beta}(r)\neq\rho_{\beta\alpha}(r))$ so there are Nelements $\wedge_{2}$ of them listed in the file.  

Following the Nelements sections, $\mathrm{Nr}$ values for each pair potential phi(r) array are listed in the same manner $(\mathrm{r}^{*}\mathfrak{p h i}$ , units of eV-Angstroms) as in EAM setfl files. Note that in Finnis/Sinclair, the phi(r) arrays are still symmetric, so only phi arrays for $\mathrm{i}>=\mathrm{j}$ are listed.  

HE EAM files in the potentials directory of the LAMMPS distribution have an “.eam.he” suffix. They are formatted as follows:  

# LAMMPS Documentation, Release 4Feb2025  

• lines $^{1,2,3=}$ comments (ignored) • line 4: Nelements Element1 Element2 . . . ElementN • line 5: Nrho, drho, Nr, dr, cutoff, rhomax  

The 5-line header section is identical to an FS EAM file except that line 5 lists an additional value, rhomax. Unlike in FS EAM files where embedding energies F(rho) are always defined between rho $=0$ and rho $=$ (Nrho -1)drho, F(rho) in HE EAM files are defined between rho $=$ rhomin and rho $=$ rhomax. Since drho $=$ (rhomax - rhomin)/(Nrho - 1), rhomin $=$ rhomax - (Nrho - 1)drho. The embedding energies F(rho) are listed for rho $=$ rhomin, rhomin $^+$ drho, rhomin $^+$ 2drho, . . . , rhomax. This gives users additional flexibility to define a negative rhomin and therefore an embedding energy function that works for both positive and negative electron densities. The format and units of these sections are identical to the FS EAM files (see above).  

Added in version 3Nov2022.  

The eam, eam/alloy, eam/fs, and eam/he pair styles support extraction of two per-atom quantities by the fix pair command. This allows the quantities to be output to files by the dump or otherwise processed by other LAMMPS commands.  

The names of the two quantities are “rho” and “fp” for the density and derivative of the embedding energy for each atom. Neither quantity needs to be triggered by the fix pair command in order for these pair styles to calculate it.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.98.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS as described above with the individual styles. You never need to specify a pair_coeff command with $\mathrm{I:=}$ J arguments for the eam styles.  

This pair style does not support the pair_modify shift, table, and tail options.  

The eam pair styles do not write their information to binary restart files, since it is stored in tabulated potential files.   
Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

The eam pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.98.5 Restrictions  

All of these styles are part of the MANYBODY package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.98.6 Related commands  

pair_coeff  

# 4.98.7 Default  

none  

(Ackland1) Ackland, Condensed Matter (2005).   
(Ackland2) Ackland, Mendelev, Srolovitz, Han and Barashev, Journal of Physics: Condensed Matter, 16, S2629 (2004).   
(Daw) Daw, Baskes, Phys Rev Lett, 50, 1285 (1983). Daw, Baskes, Phys Rev B, 29, 6443 (1984).   
(Finnis) Finnis, Sinclair, Philosophical Magazine A, 50, 45 (1984).   
(Zhou6) Zhou, Bartelt, Sills, Physical Review B, 103, 014108 (2021).   
(Stukowski) Stukowski, Sadigh, Erhart, Caro; Modeling Simulation Materials Science & Engineering, 7, 075005 (2009).   
(Caro) A Caro, DA Crowson, M Caro; Phys Rev Lett, 95, 075702 (2005)  

# 4.99 pair_style edip command  

Accelerator Variants: edip/omp  

# 4.100 pair_style edip/multi command  

# 4.100.1 Syntax  

In EDIP, the energy $\mathrm{E}$ of a system of atoms is  

$$
\begin{array}{c}{{{\cal E}=\displaystyle\sum_{j\neq1}\phi_{2}(R_{i j},Z_{i})+\displaystyle\sum_{j\neq i}\sum_{k\neq i,k,k,Z_{i}}\phi_{3}(R_{i j},R_{k,i},Z_{i})}}\ {{\phi_{2}(r,Z)={\cal A}\left[\left(\displaystyle\frac{B}{r}\right)^{\rho}-e^{-\beta Z}\right]e x p\left(\displaystyle\frac{\sigma}{r-a}\right)}}\ {{\phi_{3}(R_{i j},R_{i k},Z_{i})=e x p\left(\displaystyle\frac{\gamma}{R_{i j}-a}\right)e x p\left(\displaystyle\frac{\gamma}{R_{k-a}}\right)h(c o s\theta_{i j k},Z_{i})}}\ {{{\cal Z}_{i=\displaystyle\sum_{m\neq i}\int(R_{i m})~f(r)=\left\{\displaystyle\sum_{0}\left(\displaystyle\frac{\alpha}{1-x^{-\alpha}}\right)~c<r<\alpha~\right.}}}\ {{\displaystyle h(I,Z)=\lambda[(1-e^{-Q(Z)(i+\pi(Z))^{2}})+\eta Q(Z)(i+\pi(Z))^{2}]}}\ {{\phi(Z)=Q_{0}e^{-\mu L}~z~}}\end{array}
$$  

where $\phi_{2}$ is a two-body term and $\phi_{3}$ is a three-body term. The summations in the formula are over all neighbors J and K of atom I within a cutoff distance ${\mathbf{\lambda}}={\mathrm{~a~}}$ . Both terms depend on the local environment of atom I through its effective coordination number defined by $Z$ , which is unity for a cutoff distance $<\mathfrak{c}$ and gently goes to 0 at distance ${\mathbf{\lambda}}={\mathbf{a}}$ .  

Only a single pair_coeff command is used with the edip style which specifies a EDIP potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying $\mathbf{N}$ additional arguments after the filename in the pair_coeff command, where $\mathbf{N}$ is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of EDIP elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine a file Si.edip has EDIP values for Si.  

EDIP files in the potentials directory of the LAMMPS distribution have a “.edip” suffix. Lines that are not blank or comments (starting with #) define parameters for a triplet of elements. The parameters in a single entry correspond to the two-body and three-body coefficients in the formula above:  

• element 1 (the center atom in a 3-body interaction)   
• element 2   
• element 3   
• A (energy units)   
• B (distance units)   
• cutoffA (distance units)   
• cutoffC (distance units)   
• α   
• $\beta$   
• η   
• γ (distance units)   
• lambda (energy units)   
• µ   
• τ  

• σ (distance units)   
• Q0   
• u1   
• u2   
• u3   
• u4  

The A, B, beta, sigma parameters are used only for two-body interactions. The eta, gamma, lambda, mu, Q0 and all u1 to ${\bf u}4$ parameters are used only for three-body interactions. The alpha and cutoffC parameters are used for the coordination environment function only.  

The EDIP potential file must contain entries for all the elements listed in the pair_coeff command. It can also contain entries for additional elements not being used in a particular simulation; LAMMPS ignores those entries.  

For a single-element simulation, only a single entry is required (e.g. SiSiSi). For a two-element simulation, the file must contain 8 entries (for SiSiSi, SiSiC, SiCSi, SiCC, CSiSi, CSiC, CCSi, CCC), that specify EDIP parameters for all permutations of the two elements interacting in three-body configurations. Thus for 3 elements, 27 entries would be required, etc.  

At the moment, only a single element parameterization is implemented. However, the author is not aware of other multi-element EDIP parameterization. If you know any and you are interest in that, please contact the author of the EDIP package.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.100.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.100.5 Restrictions  

This pair style can only be used if LAMMPS was built with the MANYBODY package. See the Build package doc page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

The EDIP potential files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use the EDIP potential with any LAMMPS units, but you would need to create your own EDIP potential file with coefficients listed in the appropriate units if your simulation does not use “metal” units.  

# 4.100.6 Related commands  

pair_coeff  

# 4.100.7 Default  

(EDIP) J F Justo et al, Phys Rev B 58, 2539 (1998).  

# 4.101 pair_style eff/cut command  

# 4.101.1 Syntax  

pair_style eff/cut cutoff keyword args ...  

• cutof $=$ global cutoff for Coulombic interactions   
• zero or more keyword/value pairs may be appended keyword $=$ limit/eradius or pressure/evirials or ecp limit/eradius args $=$ none pressure/evirials args $=$ none ecp args $=$ type element type element ... type $=$ LAMMPS atom type (1 to Ntypes) element $=$ element symbol (e.g. H, Si)  

# 4.101.2 Examples  

pair_style eff/cut 39.7   
pair_style eff/cut 40.0 limit/eradius   
pair_style eff/cut 40.0 limit/eradius pressure/evirials   
pair_style eff/cut 40.0 ecp 1 Si 3 C   
pair_coeff \* \*   
pair_coeff 2 2 20.0   
pair_coeff 1 s 0.320852 2.283269 0.814857   
pair_coeff 3 p 22.721015 0.728733 1.103199 17.695345 6.693621  

# 4.101.3 Description  

This pair style contains a LAMMPS implementation of the electron Force Field (eFF) potential currently under development at Caltech, as described in (Jaramillo-Botero). The eFF for $\angle<6$ was first introduced by $(S u)$ in 2007. It has been extended to higher Zs by using effective core potentials (ECPs) that now cover up to second and third row $\mathrm{p}$ -block elements of the periodic table.  

eFF can be viewed as an approximation to QM wave packet dynamics and Fermionic molecular dynamics, combining the ability of electronic structure methods to describe atomic structure, bonding, and chemistry in materials, and of plasma methods to describe nonequilibrium dynamics of large systems with a large number of highly excited electrons. Yet, eFF relies on a simplification of the electronic wave function in which electrons are described as floating Gaussian wave packets whose position and size respond to the various dynamic forces between interacting classical nuclear particles and spherical Gaussian electron wave packets. The wave function is taken to be a Hartree product of the wave packets. To compensate for the lack of explicit antisymmetry in the resulting wave function, a spin-dependent Pauli potential is included in the Hamiltonian. Substituting this wave function into the time-dependent Schrodinger equation produces equations of motion that correspond - to second order - to classical Hamiltonian relations between electron position and size, and their conjugate momenta. The N-electron wave function is described as a product of one-electron Gaussian functions, whose size is a dynamical variable and whose position is not constrained to a nuclear center. This form allows for straightforward propagation of the wave function, with time, using a simple formulation from which the equations of motion are then integrated with conventional MD algorithms. In addition to this spin-dependent Pauli repulsion potential term between Gaussians, eFF includes the electron kinetic energy from the Gaussians. These two terms are based on first-principles quantum mechanics. On the other hand, nuclei are described as point charges, which interact with other nuclei and electrons through standard electrostatic potential forms.  

The full Hamiltonian (shown below), contains then a standard description for electrostatic interactions between a set of delocalized point and Gaussian charges which include, nuclei-nuclei (NN), electron-electron (ee), and nuclei-electron (Ne). Thus, eFF is a mixed QM-classical mechanics method rather than a conventional force field method (in which electron motions are averaged out into ground state nuclear motions, i.e a single electronic state, and particle interactions are described via empirically parameterized interatomic potential functions). This makes eFF uniquely suited to simulate materials over a wide range of temperatures and pressures where electronically excited and ionized states of matter can occur and coexist. Furthermore, the interactions between particles -nuclei and electrons- reduce to the sum of a set of effective pairwise potentials in the eFF formulation. The eff/cut style computes the pairwise Coulomb interactions between nuclei and electrons (E_NN,E_Ne,E_ee), and the quantum-derived Pauli (E_PR) and Kinetic energy interactions potentials between electrons (E_KE) for a total energy expression given as,  

$$
U\left(R,r,s\right)=E_{N N}\left(R\right)+E_{N e}\left(R,r,s\right)+E_{e e}\left(r,s\right)+E_{K E}\left(r,s\right)+E_{P R}\left(\uparrow\downarrow,S\right)
$$  

The individual terms are defined as follows:  

$$
\begin{array}{r l}&{E_{K E}=\displaystyle\frac{\hat{I}_{e}^{2}}{\hat{m}_{e}}\sum_{i}^{\frac{3}{2}}E_{i}^{\frac{3}{2}}}\ &{E_{N N}=\displaystyle\frac{1}{4\pi\varepsilon_{0}}\sum_{i<j}\frac{Z_{i}Z_{j}}{R_{i j}}}\ &{E_{N e}=-\displaystyle\frac{1}{4\pi\varepsilon_{0}}\sum_{i,j}\frac{Z_{i}}{R_{i j}}F r f\left(\frac{\sqrt{2}R_{i j}}{s_{j}}\right)}\ &{E_{e e}=\displaystyle\frac{1}{4\pi\varepsilon_{0}}\sum_{i<j}\frac{1}{r i_{j}}F r f\left(\frac{\sqrt{2}r_{i j}}{\sqrt{s_{i}^{'}+s_{j}^{'}}}\right)}\ &{E_{R u i l}=\displaystyle\sum_{\sigma=g_{r}}E\left(\uparrow\right)_{i j}+\sum_{\sigma\in\mathcal{G}_{r}}E\left(\uparrow\downarrow_{j}\right)_{i j}}\end{array}
$$  

where, s_i correspond to the electron sizes, the sigmas i’s to the fixed spins of the electrons, $\mathbf{Z_{-}i}$ to the charges on the nuclei, R_ij to the distances between the nuclei or the nuclei and electrons, and r_ij to the distances between electrons. For additional details see (Jaramillo-Botero).  

The overall electrostatics energy is given in Hartree units of energy by default and can be modified by an energyconversion constant, according to the units chosen (see electron_units). The cutoff Rc, given in Bohrs (by default), truncates the interaction distance. The recommended cutoff for this pair style should follow the minimum image criterion, i.e. half of the minimum unit cell length.  

This potential is designed to be used with atom_style electron definitions, in order to handle the description of system with interacting nuclei and explicit electrons.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• cutoff (distance units)  

For eff/cut, the cutoff coefficient is optional. If it is not used (as in some of the examples above), the default global value specified in the pair_style command is used.  

The limit/eradius and pressure/evirials keywords are optional. Neither or both must be specified. If not specified they are unset.  

The limit/eradius keyword is used to restrain electron size from becoming excessively diffuse at very high temperatures were the Gaussian wave packet representation breaks down, and from expanding as free particles to infinite size. If unset, electron radius is free to increase without bounds. If set, a restraining harmonic potential of the form $\mathrm{E}=$ $1/2\mathrm{k}\_\mathrm{ss}{\wedge}2$ for $\mathrm{s}>\mathrm{L}\_{\mathrm{box}}/2$ , where $\mathrm{~k~}_{-}\mathrm{s}=1$ Hartrees $/\mathrm{Bohr}^{\Lambda}2$ , is applied on the electron radius.  

The pressure/evirials keyword is used to control between two types of pressure computation: if unset, the computed pressure does not include the electronic radial virials contributions to the total pressure (scalar or tensor). If set, the computed pressure will include the electronic radial virial contributions to the total pressure (scalar and tensor).  

The ecp keyword is used to associate an ECP representation for a particular atom type. The ECP captures the orbital overlap between a core pseudo particle and valence electrons within the Pauli repulsion. A list of type:element-symbol pairs may be provided for all ECP representations, after the “ecp” keyword.  

# Note  

Default ECP parameters are provided for C, N, O, Al, and Si. Users can modify these using the pair_coeff command as exemplified above. For this, the User must distinguish between two different functional forms supported, one that captures the orbital overlap assuming the s-type core interacts with an s-like valence electron (s-s) and another that assumes the interaction is s-p. For systems that exhibit significant p-character (e.g. C, N, O) the s-p form is recommended. The “s” ECP form requires 3 parameters and the “p” 5 parameters.  

![](images/f1efa81513aa18689a1d11170452962a7a6aae45c36b38546823d6d0e62fbca8.jpg)  

# Note  

There are two different pressures that can be reported for eFF when defining this pair_style, one (default) that considers electrons do not contribute radial virial components (i.e. electrons treated as incompressible ‘rigid’ spheres) and one that does. The radial electronic contributions to the virials are only tallied if the flexible pressure option is set, and this will affect both global and per-atom quantities. In principle, the true pressure of a system is somewhere in between the rigid and the flexible eFF pressures, but, for most cases, the difference between these two pressures will not be significant over long-term averaged runs (i.e. even though the energy partitioning changes, the total energy remains similar).  

# Note  

This implementation of eFF gives a reasonably accurate description for systems containing nuclei from $Z=1{-}6$ in “all electron” representations. For systems with increasingly non-spherical electrons, Users should use the ECP representations. ECPs are now supported and validated for most of the second and third row elements of the $\mathsf{p}-$ block. Predefined parameters are provided for C, N, O, Al, and Si. The ECP captures the orbital overlap between the core and valence electrons (i.e. Pauli repulsion) with one of the functional forms:  

$$
\begin{array}{r l}&{E_{P a u l i(E C P_{s})}=p_{1}\exp\left(-\frac{p_{2}r^{2}}{p_{3}+s^{2}}\right)}\ &{E_{P a u l i(E C P_{p})}=p_{1}\left(\frac{2}{p_{2}/s+s/p_{2}}\right)(r-p_{3}s)^{2}\exp\left[-\frac{p_{4}(r-p_{3}s)^{2}}{p_{5}+s^{2}}\right]}\end{array}
$$  

Where the first form correspond to core interactions with s-type valence electrons and the second to core interactions with p-type valence electrons.  

The current version adds full support for models with fixed-core and ECP definitions. to enable larger timesteps (i.e. by avoiding the high frequency vibrational modes -translational and radial- of the $2\mathrm{~s~}$ electrons), and in the ECP case to reduce the increased orbital complexity in higher Z elements (up to $Z{<}18$ ). A fixed-core should be defined with a mass that includes the corresponding nuclear mass plus the 2 s electrons in atomic mass units (2x5.4857990943e-4), and a radius equivalent to that of minimized 1s electrons (see examples under /examples/PACKAGES/eff/fixed-core). An pseudo-core should be described with a mass that includes the corresponding nuclear mass, plus all the core electrons (i.e no outer shell electrons), and a radius equivalent to that of a corresponding minimized full-electron system. The charge for a pseudo-core atom should be given by the number of outer shell electrons.  

In general, eFF excels at computing the properties of materials in extreme conditions and tracing the system dynamics over multi-picosecond timescales; this is particularly relevant where electron excitations can change significantly the nature of bonding in the system. It can capture with surprising accuracy the behavior of such systems because it describes consistently and in an unbiased manner many different kinds of bonds, including covalent, ionic, multicenter, ionic, and plasma, and how they interconvert and/or change when they become excited. eFF also excels in computing the relative thermochemistry of isodemic reactions and conformational changes, where the bonds of the reactants are of the same type as the bonds of the products. eFF assumes that kinetic energy differences dominate the overall exchange energy, which is true when the electrons present are nearly spherical and nodeless and valid for covalent compounds such as dense hydrogen, hydrocarbons, and diamond; alkali metals (e.g. lithium), alkali earth metals (e.g. beryllium) and semimetals such as boron; and various compounds containing ionic and/or multicenter bonds, such as boron dihydride.  

# 4.101.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{~I~}!=\mathrm{~J~}$ , the cutoff distance for the eff/cut style can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

The pair_modify shift option is not relevant for these pair styles.  

The eff/long (not yet available) style supports the pair_modify table option for tabulation of the short-range portion of the long-range Coulombic interaction.  

These pair styles do not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.101.5 Restrictions  

These pair styles will only be enabled if LAMMPS is built with the EFF package. It will only be enabled if LAMMPS was built with that package. See the Build package page for more info.  

These pair styles require that particles store electron attributes such as radius, radial velocity, and radial force, as define by the atom_style. The electron atom style does all of this.  

Thes pair styles require you to use the comm_modify vel yes command so that velocities are stored by ghost atoms.  

# 4.101.6 Related commands  

pair_coeff  

# 4.101.7 Default  

If not specified, limit_eradius $=0$ and pressure_with_evirials $=0$ .  

(Su) Su and Goddard, Excited Electron Dynamics Modeling of Warm Dense Matter, Phys Rev Lett, 99:185003 (2007).  

(Jaramillo-Botero) Jaramillo-Botero, Su, Qi, Goddard, Large-scale, Long-term Non-adiabatic Electron Molecular Dynamics for Describing Material Properties and Phenomena in Extreme Environments, J Comp Chem, 32, 497-512 (2011).  

# 4.102 pair_style eim command  

Accelerator Variants: eim/omp  

# 4.102.1 Syntax  

• style = eim  

# 4.102.2 Examples  

pair_style eim pair_coeff \* \* Na Cl ../potentials/ffield.eim Na Cl pair_coeff \* \* Na Cl ffield.eim Na Na Na Cl pair_coeff \* \* Na Cl ../potentials/ffield.eim Cl NULL Na  

# 4.102.3 Description  

Style eim computes pairwise interactions for ionic compounds using embedded-ion method (EIM) potentials (Zhou). The energy of the system E is given by  

$$
E=\frac{1}{2}\sum_{i=1}^{N}\sum_{j=i_{1}}^{i_{N}}\phi_{i j}\left(r_{i j}\right)+\sum_{i=1}^{N}E_{i}\left(q_{i},\sigma_{i}\right)
$$  

The first term is a double pairwise sum over the J neighbors of all I atoms, where $\phi_{i j}$ is a pair potential. The second term sums over the embedding energy $\textrm{E}_{1}$ of atom I, which is a function of its charge ${\mathfrak{q}}_{-}{\mathfrak{i}}$ and the electrical potential $\sigma_{i}$ at its location. $\mathrm{~E~}_{-}\mathrm{i},\mathrm{q}_{-}\mathrm{i}$ , and sigmai are calculated as  

$$
\begin{array}{c}{{q_{i}=\displaystyle\sum_{j=i_{1}}^{i_{N}}\eta_{j i}\left(r_{i j}\right)}}\ {{{}}}\ {{\sigma_{i}=\displaystyle\sum_{j=i_{1}}^{i_{N}}q_{j}\cdot\psi_{i j}\left(r_{i j}\right)}}\ {{{}}}\ {{{}_{i}\left(q_{i},\sigma_{i}\right)=\displaystyle\frac{1}{2}\cdot q_{i}\cdot\sigma_{i}}}\end{array}
$$  

where $\eta_{j i}$ is a pairwise function describing electron flow from atom I to atom J, and $\psi_{i j}$ is another pairwise function. The multi-body nature of the EIM potential is a result of the embedding energy term. A complete list of all the pair functions used in EIM is summarized below  

$$
\begin{array}{r l}&{\phi_{i j}\left(r\right)=\left\{\begin{array}{l l}{\left[\frac{E_{k j}\beta_{i j}}{\beta_{i j}-\alpha_{i j}}\exp\left(-\alpha_{i j}\frac{r-r_{e,i j}}{r_{e,i j}}\right)-\frac{E_{k j}\alpha_{i j}}{\beta_{i j}-\alpha_{i j}}\exp\left(-\beta_{i j}\frac{r-r_{e,j j}}{r_{e,i j}}\right)\right]f_{c}\left(r,r_{e,i j},r_{c,\phi,i j}\right),}&{p_{i j}=1}\ {\left[\frac{E_{k j}\beta_{i j}}{\beta_{i j}-\alpha_{i j}}\left(\frac{r_{e,i j}}{r}\right)^{\alpha_{i j}}-\frac{E_{k j}\alpha_{i j}}{\beta_{i j}-\alpha_{i j}}\left(\frac{r_{e,i j}}{r}\right)^{\beta_{i j}}\right]f_{c}\left(r,r_{e,i j},r_{c,\phi,i j}\right),}&{p_{i j}=2}\end{array}\right.}\ &{\psi_{i j}\left(r\right)=A_{\eta,i j}\left(\chi_{j}-\chi_{i}\right)f_{c}\left(r,r_{s,\eta,i j},r_{c,\eta,i j}\right)}\ &{\psi_{i j}\left(r\right)=A_{\psi,i j}\exp\left(-\zeta_{i j}r\right)f_{c}\left(r,r_{s,\psi,i j},r_{c,\psi,i j}\right)}\ {\B_{\iota}\left(r\right)=0.510204\cdot\mathrm{~erfc}\left[\frac{1.64498\left(2r-r_{p}-r_{c}\right)}{r_{c}-r_{p}}\right]-0.010204}\end{array}
$$  

Here $\begin{array}{r}{E_{b},r_{e},r_{(}c,\phi),\alpha,\beta,A_{(}\psi),\zeta,r_{(}s,\psi),r_{(}c,\psi),A_{(}\eta),r_{(}s,\eta),r_{(}c,\eta),\chi}\end{array}$ , and pair function type $p$ are parameters, with subscripts $i j$ indicating the two species of atoms in the atomic pair.  

# Note  

Even though the EIM potential is treating atoms as charged ions, you should not use a LAMMPS atom_style that stores a charge on each atom and thus requires you to assign a charge to each atom, e.g. the charge or full atom styles. This is because the EIM potential infers the charge on an atom from the equation above for q_i; you do not assign charges explicitly.  

All the EIM parameters are listed in a potential file which is specified by the pair_coeff command. This is an ASCII text file in a format described below. The “ffield.eim” file included in the “potentials” directory of the LAMMPS distribution currently includes nine elements Li, Na, K, Rb, Cs, F, Cl, Br, and I. A system with any combination of these elements can be modeled. This file is parameterized in terms of LAMMPS metal units.  

Note that unlike other potentials, cutoffs for EIM potentials are not set in the pair_style or pair_coeff command; they are specified in the EIM potential file itself. Likewise, the EIM potential file lists atomic masses; thus you do not need to use the mass command to specify them.  

Only a single pair_coeff command is used with the eim style which specifies an EIM potential file and the element(s) to extract information for. The EIM elements are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• Elem1, Elem2, . . .   
• EIM potential file   
• N element names $=$ mapping of EIM elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example like one of those above, suppose you want to model a system with Na and Cl atoms. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Na, and the fourth to be Cl, you would use the following pair_coeff command:  

pair_coeff \* \* Na Cl ffield.eim Na Na Na Cl  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The filename is the EIM potential file. The Na and Cl arguments (before the file name) are the two elements for which info will be extracted from the potential file. The first three trailing Na arguments map LAMMPS atom types 1,2,3 to the EIM Na element. The final Cl argument maps LAMMPS atom type 4 to the EIM Cl element.  

If a mapping value is specified as NULL, the mapping is not performed. This can be used when an eim potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

The ffield.eim file in the potentials directory of the LAMMPS distribution is formatted as follows:  

Lines starting with # are comments and are ignored by LAMMPS. Lines starting with “global:” include three global values. The first value divides the cations from anions, i.e., any elements with electronegativity above this value are viewed as anions, and any elements with electronegativity below this value are viewed as cations. The second and third values are related to the cutoff function - i.e. the 0.510204, 1.64498, and 0.010204 shown in the above equation can be derived from these values.  

Lines starting with “element:” are formatted as follows: name of element, atomic number, atomic mass, electronic negativity, atomic radius (LAMMPS ignores it), ionic radius (LAMMPS ignores it), cohesive energy (LAMMPS ignores it), and q0 (must be 0).  

Lines starting with “pair:” are entered as: element 1, element 2, r_(c,phi), r_(c,phi) (redundant for historical reasons), E_b, r_e, alpha, beta, r_(c,eta), A_(eta), r_(s,eta), r_(c,psi), A_(psi), zeta, r_(s,psi), and p.  

The lines in the file can be in any order; LAMMPS extracts the info it needs.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.102.4 Restrictions  

This style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package.  

# 4.102.5 Related commands  

pair_coeff  

# 4.102.6 Default  

none  

(Zhou) Zhou, submitted for publication (2010). Please contact Xiaowang Zhou (Sandia) for details via email at xzhou at sandia.gov.  

# 4.103 pair_style exp6/rx command  

Accelerator Variants: exp6/rx/kk  

# 4.103.1 Syntax  

pair_style exp6/rx cutoff ...  

• cutof $=$ global cutoff for DPD interactions (distance units) • weighting $=$ fractional or molecular (optional)  

# 4.103.2 Examples  

pair_style exp6/rx 10.0   
pair_style exp6/rx 10.0 fractional   
pair_style exp6/rx 10.0 molecular   
pair_coeff \* \* exp6.params h2o h2o exponent 1.0 1.0 10.0   
pair_coeff \* \* exp6.params h2o 1fluid exponent 1.0 1.0 10.0   
pair_coeff exp6.params 1fluid 1fluid exponent 1.0 1.0 10.0   
pair_coeff $^**$ exp6.params 1fluid 1fluid none 10.0   
pair_coeff \* \* exp6.params 1fluid 1fluid polynomial filename 10.0  

# 4.103.3 Description  

Style exp6/rx is used in reaction DPD simulations, where the coarse-grained (CG) particles are composed of $m$ species whose reaction rate kinetics are determined from a set of $n$ reaction rate equations through the $f(x r x\$ command. The species of one CG particle can interact with a species in a neighboring CG particle through a site-site interaction potential model. The exp6/rx style computes an exponential-6 potential given by  

$$
U_{i j}(r)=\frac{\varepsilon}{\alpha-6}\{6\exp[\alpha(1-\frac{r_{i j}}{R_{m}})]-\alpha(\frac{R_{m}}{r_{i j}})^{6}\}
$$  

where the ε parameter determines the depth of the potential minimum located at $R_{m}$ , and $\alpha$ determines the softness of the repulsion.  

The coefficients must be defined for each species in a given particle type via the pair_coeff command as in the examples above, where the first argument is the filename that includes the exponential-6 parameters for each species. The file includes the species tag followed by the $\alpha,\varepsilon$ and $R_{m}$ parameters. The format of the file is described below.  

The second and third arguments specify the site-site interaction potential between two species contained within two different particles. The species tags must either correspond to the species defined in the reaction kinetics files specified with the $f(x r x $ command or they must correspond to the tag “1fluid”, signifying interaction with a product species mixture determined through a one-fluid approximation. The interaction potential is weighted by the geometric average of either the mole fraction concentrations or the number of molecules associated with the interacting coarse-grained particles (see the fractional or molecular weighting pair style options). The coarse-grained potential is stored before and after the reaction kinetics solver is applied, where the difference is defined to be the internal chemical energy (uChem).  

The fourth argument specifies the type of scaling that will be used to scale the EXP-6 parameters as reactions occur.   
Currently, there are three scaling options: exponent, polynomial and none.  

Exponent scaling requires two additional arguments for scaling the $R_{m}$ and $\varepsilon$ parameters, respectively. The scaling factor is computed by phi^exponent, where phi is the number of molecules represented by the coarse-grain particle and exponent is specified as a pair coefficient argument for $R_{m}$ and $\varepsilon$ , respectively. The $R_{m}$ and $\varepsilon$ parameters are multiplied by the scaling factor to give the scaled interaction parameters for the CG particle.  

Polynomial scaling requires a filename to be specified as a pair coeff argument. The file contains the coefficients to a fifth order polynomial for the $\alpha$ , $\varepsilon$ and $R_{m}$ parameters that depend upon phi (the number of molecules represented by the CG particle). The format of a polynomial file is provided below.  

The none option to the scaling does not have any additional pair coeff arguments. This is equivalent to specifying the exponent option with $R_{m}$ and $\varepsilon$ exponents of 0.0 and 0.0, respectively.  

The final argument specifies the interaction cutoff (optional).  

The format of a tabulated file is as follows (without the parenthesized comments):   


<html><body><table><tr><td>exponential-6 5 parameters for various species (one or more comment or blank lines)</td></tr><tr><td>h2o exp6 11.00 0.02 3.50 (species, exp6, alpha, Rm, epsilon)</td></tr></table></body></html>  

The format of the polynomial scaling file as follows (without the parenthesized comments):  

# POLYNOMIAL FILE (one or more comment or blank lines)  

<html><body><table><tr><td colspan="5">井 General Functional Form:</td></tr><tr><td colspan="5">A*phi~5 + B*phi~4 + C*phi~3 + D*phi~2 + E*phi + F</td></tr><tr><td>#井 Parameter CA</td><td>B</td><td></td><td>D E</td><td>F</td></tr><tr><td></td><td>(blank)</td><td></td><td></td><td></td></tr><tr><td>alpha</td><td>0.0000 0.00000</td><td>0.00008</td><td>30.04955-0.73804</td><td>13.63201</td></tr><tr><td>epsilon 0.0000</td><td></td><td>0.00478-0.06283</td><td>0.24486-0.33737</td><td>2.60097</td></tr><tr><td>rm</td><td>0.0001-0.00118-0.00253</td><td></td><td>0.05812 -0.00509</td><td>1.50106</td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections.  

Following a blank line, the next N lines list the species and their corresponding parameters. The first argument is the species tag, the second argument is the exp6 tag, the third argument is the $\alpha$ parameter (energy units), the fourth argument is the $\varepsilon$ parameter (energy-distance $\cdot\wedge_{6}$ units), and the fifth argument is the $R_{m}$ parameter (distance units). If a species tag of “1fluid” is listed as a pair coefficient, a one-fluid approximation is specified where a concentrationdependent combination of the parameters is computed through the following equations:  

$$
\begin{array}{l}{{\displaystyle R_{m}^{3}=\sum_{a}\sum_{b}x_{a}x_{b}R_{m,a b}^{3}}}\ {{\displaystyle~\varepsilon=\frac{1}{R_{m}^{3}}\sum_{a}\sum_{b}x_{a}x_{b}\varepsilon_{a b}R_{m,a b}^{3}}}\ {{\displaystyle~\alpha=\frac{1}{\varepsilon R_{m}^{3}}\sum_{a}\sum_{b}x_{a}x_{b}\alpha_{a b}\varepsilon_{a b}R_{m,a b}^{3}}}\end{array}
$$  

where  

$$
\begin{array}{c}{{\varepsilon_{a b}=\sqrt{\varepsilon_{a}\varepsilon_{b}}}}\ {{R_{m,a b}=\displaystyle\frac{R_{m,a}+R_{m,b}}{2}}}\ {{\alpha_{a b}=\sqrt{\alpha_{a}\alpha_{b}}}}\end{array}
$$  

and $x_{a}$ and $x_{b}$ are the mole fractions of a and $\mathbf{b}$ , respectively, which comprise the gas mixture.  

# 4.103.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This style does not support the pair_modify shift option for the energy of the exp() and $1/\mathrm{r}{\wedge}6$ portion of the pair interaction.  

This style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure for the A,C terms in the pair interaction.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.103.5 Restrictions  

This command is part of the DPD-REACT package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.103.6 Related commands  

pair_coeff  

# 4.103.7 Default  

fractional weighting  

# 4.104 pair_style extep command  

# 4.104.1 Syntax  

# 4.104.4 Restrictions  

none  

4.104.5 Related commands pair_tersoff  

# 4.104.6 Default  

none  

(Los2017) J. H. Los et al. “Extended Tersoff potential for boron nitride: Energetics and elastic properties of pristine and defective h-BN”, Phys. Rev. B 96 (184108), 2017.  

# 4.105 pair_style lj/cut/soft command  

Accelerator Variants: lj/cut/soft/omp  

4.106 pair_style lj/cut/coul/cut/soft command  

Accelerator Variants: lj/cut/coul/cut/soft/gpu, lj/cut/coul/cut/soft/omp  

4.107 pair_style lj/cut/coul/long/soft command  

Accelerator Variants: lj/cut/coul/long/soft/gpu, lj/cut/coul/long/soft/omp  

4.108 pair_style lj/cut/tip4p/long/soft command  

Accelerator Variants: lj/cut/tip4p/long/soft/omp  

4.109 pair_style lj/charmm/coul/long/soft command  

Accelerator Variants: lj/charmm/coul/long/soft/omp  

4.110 pair_style lj/class2/soft command  

4.111 pair_style lj/class2/coul/cut/soft command  

4.112 pair_style lj/class2/coul/long/soft command  

4.113 pair_style coul/cut/soft command  

Accelerator Variants: coul/cut/soft/omp  

# 4.114 pair_style coul/long/soft command  

Accelerator Variants: coul/long/soft/omp  

4.115 pair_style tip4p/long/soft command  

Accelerator Variants: tip4p/long/soft/omp  

# 4.116 pair_style morse/soft command  

# 4.116.1 Syntax  

pair_style style args  

• style $=$ lj/cut/soft or lj/cut/coul/cut/soft or lj/cut/coul/long/soft or lj/cut/tip4p/long/soft or lj/charmm/coul/long/soft or lj/class2/soft or lj/class2/coul/cut/soft or lj/class2/coul/long/soft or coul/cut/soft or coul/long/soft or tip4p/long/soft or morse/soft  

• args $=$ list of arguments for a particular style  

lj/cut/soft args $=\mathrm{~n~}$ alpha_lj cutoff n, alpha_ $\mathrm{LJ}=$ parameters of soft-core potential cutoff $=$ global cutoff for Lennard-Jones interactions (distance units)   
lj/cut/coul/cut/soft args $=\mathrm{~n~}$ alpha_LJ alpha_C cutoff (cutoff2) n, alpha_LJ, alpha_ $\mathrm{C}=$ parameters of soft-core potential cutoff $=$ global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)   
lj/cut/coul/long/soft args = n alpha_LJ alpha_C cutoff n, alpha_LJ, alpha_C = parameters of the soft-core potential cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
lj/cut/tip4p/long/soft args = otype htype btype atype qdist n alpha_LJ alpha_C cutoff (cutoff2) otype,htype = atom types (numeric or type label) for TIP4P O and H btype,atype = bond and angle types (numeric or type label) for TIP4P waters qdist = distance from O atom to massless charge (distance units) n, alpha_LJ, alpha_C = parameters of the soft-core potential cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
lj/charmm/coul/long/soft args = n alpha_LJ alpha_C inner outer (cutoff) n, alpha_LJ, alpha_C = parameters of the soft-core potential inner, outer = global switching cutoffs for LJ (and Coulombic if only 5 args) cutoff = global cutoff for Coulombic (optional, outer is Coulombic cutoff if only 5 args)   
lj/class2/soft args = n alpha_lj cutoff   
n, alpha_LJ = parameters of soft-core potential cutoff = global cutoff for Lennard-Jones interactions (distance units)   
lj/class2/coul/cut/soft args = n alpha_LJ alpha_C cutoff (cutoff2) n, alpha_LJ, alpha_C = parameters of soft-core potential cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 = global cutoff for Coulombic (optional) (distance units)   
lj/class2/coul/long/soft args = n alpha_LJ alpha_C cutoff (cutoff2) n, alpha_LJ, alpha_C = parameters of soft-core potential cutoff = global cutoff for LJ (and Coulombic if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Coulombic (optional) (distance units)   
coul/cut/soft args = n alpha_C cutoff   
n, alpha_C = parameters of the soft-core potential   
cutoff $=$ global cutoff for Coulomb interactions (distance units)   
coul/long/soft args = n alpha_C cutoff   
n, alpha_C = parameters of the soft-core potential cutoff = global cutoff for Coulomb interactions (distance units)   
tip4p/long/soft args = otype htype btype atype qdist n alpha_C cutoff   
otype,htype = atom types (numeric or type label) for TIP4P O and H   
btype,atype = bond and angle types (numeric or type label) for TIP4P waters qdist = distance from O atom to massless charge (distance units)   
n, alpha_C = parameters of the soft-core potential   
cutoff = global cutoff for Coulomb interactions (distance units)   
morse/soft args = n lf cutoff   
n = soft-core parameter   
$\operatorname{lf}=$ transformation range is lf $<$ lambda $<1$ cutoff $=$ global cutoff for Morse interactions (distance units)  

# 4.116.2 Examples  

pair_style lj/cut/soft 2.0 0.5 9.5   
pair_coeff \* \* 0.28 3.1 1.0   
pair_coeff 1 1 0.28 3.1 1.0 9.5   
pair_style lj/cut/coul/cut/soft 2.0 0.5 10.0 9.5   
pair_style lj/cut/coul/cut/soft 2.0 0.5 10.0 9.5 9.5   
pair_coeff \* \* 0.28 3.1 1.0   
pair_coeff 1 1 0.28 3.1 0.5 10.0   
pair_coeff 1 1 0.28 3.1 0.5 10.0 9.5   
pair_style lj/cut/coul/long/soft 2.0 0.5 10.0 9.5   
pair_style lj/cut/coul/long/soft 2.0 0.5 10.0 9.5 9.5   
pair_coeff \* \* 0.28 3.1 1.0   
pair_coeff 1 1 0.28 3.1 0.0 10.0   
pair_coeff 1 1 0.28 3.1 0.0 10.0 9.5   
pair_style lj/cut/tip4p/long/soft 1 2 7 8 0.15 2.0 0.5 10.0 9.8   
pair_style lj/cut/tip4p/long/soft 1 2 7 8 0.15 2.0 0.5 10.0 9.8 9.5   
pair_coeff \* \* 0.155 3.1536 1.0   
pair_coeff 1 1 0.155 3.1536 1.0 9.5   
pair_style lj/cut/tip4p/long/soft OW HW HW-OW HW-OW-HW 0.15 2.0 0.5 10.0 9.8   
labelmap atom 1 OW 2 HW   
labelmap bond 1 HW-OW   
labelmap angle 1 HW-OW-HW   
pair_coeff \* \* 0.155 3.1536 1.0   
pair_coeff OW OW 0.155 3.1536 1.0 9.5   
pair_style lj/charmm/coul/long 2.0 0.5 10.0 8.0 10.0   
pair_style lj/charmm/coul/long 2.0 0.5 10.0 8.0 10.0 9.0   
pair_coeff \* \* 0.28 3.1 1.0   
pair_coeff 1 1 0.28 3.1 1.0 0.14 3.1   
pair_style lj/class2/coul/long/soft 2.0 0.5 10.0 9.5  

(continued from previous page)  

<html><body><table><tr><td>pair_style lj/class2/coul/long/soft 2.0 0.5 10.0 9.5 9.5</td><td></td><td></td></tr><tr><td>pair_coeff * * 0.28 3.1 1.0</td></tr><tr><td></td></tr><tr><td>pair_ coeff 1 1 0.28 3.1 0.0 10.0</td></tr><tr><td>pair _ coeff 1 1 0.28 3.1 0.0 10.0 9.5</td></tr><tr><td></td></tr><tr><td>pair _style coul/long/soft 1.0 10.0 9.5</td></tr><tr><td>pair_coeff * * 1.0 pair_coeff 1 1 1.0</td></tr><tr><td></td></tr><tr><td>pair_style tip4p/long/soft 1 2 7 8 0.15 2.0 0.5 10.0 9.8</td></tr><tr><td>pair_coeff * * 1.0</td></tr><tr><td>pair_coeff 1 1 1.0</td></tr><tr><td>pair _style morse/soft 4 0.9 10.0</td></tr><tr><td>pair_coeff * * 100.0 2.0 1.5 1.0</td></tr></table></body></html>  

Example input scripts available: examples/PACKAGES/fep  

# 4.116.3 Description  

These pair styles have a soft repulsive core, tunable by a parameter lambda, in order to avoid singularities during free energy calculations when sites are created or annihilated (Beutler). When lambda tends to 0 the pair interaction vanishes with a soft repulsive core. When lambda tends to 1, the pair interaction approaches the normal, non-soft potential. These pair styles are suited for “alchemical” free energy calculations using the fix adapt/fep and compute fep commands.  

The lj/cut/soft style and related sub-styles compute the 12-6 Lennard-Jones and Coulomb potentials modified by a soft core, with the functional form  

$$
E=\lambda^{n}4\varepsilon\left\{\frac{1}{\left[\alpha_{\mathrm{LJ}}(1-\lambda)^{2}+\left(\frac{r}{\sigma}\right)^{6}\right]^{2}}-\frac{1}{\alpha_{\mathrm{LJ}}(1-\lambda)^{2}+\left(\frac{r}{\sigma}\right)^{6}}\right\}\qquadr<r_{c}
$$  

The lj/class2/soft style is a 9-6 potential with the exponent of the denominator of the first term in brackets taking the value 1.5 instead of 2 (other details differ, see the form of the potential in pair_style lj/class2).  

Coulomb interactions can also be damped with a soft core at short distance,  

$$
E=\lambda^{n}{\frac{C q_{i}q_{j}}{\varepsilon\left[\alpha_{\mathrm{{C}}}(1-\lambda)^{2}+r^{2}\right]^{1/2}}}\qquadr<r_{c}
$$  

In the Coulomb part $C$ is an energy-conversion constant, $q_{i}$ and $q_{j}$ are the charges on the two atoms, and epsilon is the dielectric constant which can be set by the dielectric command.  

The coefficient lambda is an activation parameter. When $\lambda=1$ the pair potential is identical to a Lennard-Jones term or a Coulomb term or a combination of both. When $\lambda=0$ the interactions are deactivated. The transition between these two extrema is smoothed by a soft repulsive core in order to avoid singularities in potential energy and forces when sites are created or annihilated and can overlap (Beutler).  

The parameters $n$ , $\alpha_{\mathrm{LJ}}$ and $\alpha_{\mathrm{C}}$ are set in the pair_style command, before the cutoffs. Usual choices for the exponent are $n=2$ or $n=1$ . For the remaining coefficients $\alpha_{\mathrm{LJ}}=0.5$ and $\alpha_{\mathrm{C}}=10\mathrm{A}^{2}$ are appropriate choices. Plots of the $12{-}6\mathrm{LJ}$ and Coulomb terms are shown below, for lambda ranging from 1 to 0 every 0.1.  

![](images/c7ec649e74bfd788eb8a2f67274d85223d1ad90634efe65ea537574efd7985a7.jpg)  

For the lj/cut/coul/cut/soft or lj/cut/coul/long/soft pair styles, as well as for the equivalent class2 versions, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units)   
• $\sigma$ (distance units)   
• $\lambda$ (activation parameter, between 0 and 1)   
• cutoff1 (distance units)   
• cutoff2 (distance units)  

The latter two coefficients are optional. If not specified, the global LJ and Coulombic cutoffs specified in the pair_style command are used. If only one cutoff is specified, it is used as the cutoff for both LJ and Coulombic interactions for this type pair. If both coefficients are specified, they are used as the LJ and Coulombic cutoffs for this type pair. You cannot specify 2 cutoffs for style lj/cut/soft, since it has no Coulombic terms. For the coul/cut/soft and coul/long/soft only lambda and the optional cutoff2 are to be specified.  

Style lj/cut/tip4p/long/soft implements a soft-core version of the TIP4P water model. The usage of the TIP4P pair style is documented in the pair_lj styles. In the soft version the parameters $n$ , $\alpha_{\mathrm{LJ}}$ and $\alpha_{\mathrm{{C}}}$ are set in the pair_style command, after the specific parameters of the TIP4P water model and before the cutoffs. The activation parameter lambda is supplied as an argument of the pair_coeff command, after epsilon and sigma and before the optional cutoffs.  

If using type labels, the type labels must be defined before calling the pair_coeff command.  

Style lj/charmm/coul/long/soft implements a soft-core version of the modified $12{-}6\mathrm{~LJ}$ potential used in CHARMM and documented in the pair_style lj/charmm/coul/long style. In the soft version the parameters $n$ , $\alpha_{\mathrm{LJ}}$ and $\alpha_{\mathrm{{C}}}$ are set in the pair_style command, before the global cutoffs. The activation parameter lambda is introduced as an argument of the pair_coeff command, after $\varepsilon$ and $\sigma$ and before the optional eps14 and sigma14.  

Style lj/class2/soft implements a soft-core version of the 9-6 potential in pair_style lj/class2. In the soft version the parameters $n$ , $\alpha_{\mathrm{LJ}}$ and $\alpha_{\mathrm{{C}}}$ are set in the pair_style command, before the global cutoffs. The activation parameter lambda is introduced as an argument of the the pair_coeff command, after $\varepsilon$ and $\sigma$ and before the optional cutoffs.  

The coul/cut/soft, coul/long/soft and tip4p/long/soft sub-styles are designed to be combined with other pair potentials via the pair_style hybrid/overlay command. This is because they have no repulsive core. Hence, if used by themselves, there will be no repulsion to keep two oppositely charged particles from overlapping each other. In this case, if $\lambda=1$ , a singularity may occur. These sub-styles are suitable to represent charges embedded in the Lennard-Jones radius of another site (for example hydrogen atoms in several water models). The $\lambda$ must be defined for each pair, and coul/cut/soft can accept an optional cutoff as the second coefficient.  

![](images/d9d8376d7dc8695807ad6692f78b01d7ddfc82bf6414bd8c4e7d99b2badf974b.jpg)  

# Note  

When using the soft-core Coulomb potentials with long-range solvers (coul/long/soft, lj/cut/coul/long/soft, etc.) in a free energy calculation in which sites holding electrostatic charges are being created or annihilated (using $f\boldsymbol{{x}}$ adapt/fep and compute fep) it is important to adapt both the $\lambda$ activation parameter (from 0 to 1, or the reverse) and the value of the charge (from 0 to its final value, or the reverse). This ensures that long-range electrostatic terms (kspace) are correct. It is not necessary to use soft-core Coulomb potentials if the van der Waals site is present during the free-energy route, thus avoiding overlap of the charges. Examples are provided in the LAMMPS source directory tree, under examples/PACKAGES/fep.  

# Note  

To avoid division by zero do not set $\sigma=0$ in the lj/cut/soft and related styles; use the lambda parameter instead to activate/deactivate interactions, or use $\varepsilon=0$ and $\sigma=1$ . Alternatively, when sites do not interact though the Lennard-Jones term the coul/long/soft or similar sub-style can be used via the pair_style hybrid/overlay command.  

The morse/soft variant modifies the pair_morse style at short range to have a soft core. The functional form differs from that of the lj/soft styles, and is instead given by:  

$$
\begin{array}{r l r l}&{s(\lambda)=(1-\lambda)/(1-\lambda_{f}),\quad}&{B=-2D e^{-2\alpha r_{0}}(e^{\alpha r_{0}}-1)/3}\ &{\quad E=D_{0}\left[e^{-2\alpha(r-r_{0})}-2e^{-\alpha(r-r_{0})}\right]+s(\lambda)B e^{-3\alpha(r-r_{0})},\quad}&{\lambda\ge\lambda_{f},\quad r<r_{c}}\ &{E=\left(D_{0}\left[e^{-2\alpha(r-r_{0})}-2e^{-\alpha(r-r_{0})}\right]+B e^{-3\alpha(r-r_{0})}\right)(\lambda/\lambda_{f})^{n},\quad}&{\lambda<\lambda_{f},\quad r<r_{c}}\end{array}
$$  

The morse/soft style requires the following pair coefficients:  

• $D_{0}$ (energy units)   
• $\alpha$ (1/distance units)   
• $r_{0}$ (distance units)   
• $\lambda$ (unitless, between 0.0 and 1.0)   
• cutoff (distance units)  

The last coefficient is optional. If not specified, the global morse cutoff is used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.116.4 Mixing, shift, table, tail correction, restart, rRESPA info  

The different versions of the lj/cut/soft pair styles support mixing. For atom type pairs I,J and $\mathrm{~I~}!=\mathrm{~J~}$ , the $\varepsilon$ and $\sigma$ coefficients and cutoff distance for these pair styles can be mixed. The default mix value is geometric for 12-6 styles.  

The mixing rule for epsilon and sigma for lj/class2/soft 9-6 potentials is to use the sixthpower formulas. The pair_modify mix setting is thus ignored for class2 potentials for ε and $\sigma$ . However it is still followed for mixing the cutoff distance. See the pair_modify command for details.  

The morse/soft pair style does not support mixing. Thus, coefficients for all LJ pairs must be specified explicitly.  

All of the pair styles with soft core support the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction.  

The different versions of the lj/cut/soft pair styles support the pair_modify tail option for adding a long-range tail correction to the energy and pressure for the Lennard-Jones portion of the pair interaction.  

![](images/ed5b12574b64e9d8f8474432443aba725d7931feefc7a6592fabd1e2d8e7d49b.jpg)  

# Note  

The analytical form of the tail corrections for energy and pressure used in the lj/cut/soft potentials are approximate, being identical to that of the corresponding non-soft potentials scaled by a factor $\lambda^{n}$ . The errors due to this approximation should be negligible. For example, for a cutoff of $2.5\sigma$ this approximation leads to maximum relative errors in tail corrections of the order of 1e-4 for energy and virial $(\alpha_{\mathrm{LJ}}=0.5,n=2)$ . The error vanishes when lambda approaches 0 or 1. Note that these are the errors affecting the long-range tail (itself a correction to the interaction energy) which includes other approximations, namely that the system is homogeneous (local density equal the average density) beyond the cutoff.  

The morse/soft pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

All of these pair styles write information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

# 4.116.5 Restrictions  

The pair styles with soft core are only enabled if LAMMPS was built with the FEP package. The long versions also require the KSPACE package to be installed. The soft tip4p versions also require the MOLECULE package to be installed. These styles are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

# 4.116.6 Related commands  

pair_coeff , fix adapt, fix adapt/fep, compute fep  

# 4.116.7 Default  

none  

(Beutler) Beutler, Mark, van Schaik, Gerber, van Gunsteren, Chem Phys Lett, 222, 529 (1994).  

# 4.117 pair_style gauss command  

Accelerator Variants: gauss/gpu, gauss/omp  

# 4.118 pair_style gauss/cut command  

Accelerator Variants: gauss/cut/omp  

# 4.118.1 Syntax  

pair_style gauss cutoff pair_style gauss/cut cutoff  

• cutof $=$ global cutoff for Gauss interactions (distance units)  

# 4.118.2 Examples  

pair_style gauss 12.0   
pair_coeff \* \* 1.0 0.9   
pair_coeff 1 4 1.0 0.9 10.0   
pair_style gauss/cut 3.5   
pair_coeff 1 4 0.2805 1.45 0.112  

# 4.118.3 Description  

Style gauss computes a tethering potential of the form  

$$
E=-A\exp(-B r^{2})r<r_{c}
$$  

between an atom and its corresponding tether site which will typically be a frozen atom in the simulation. $r_{c}$ is the cutoff.  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• A (energy units) • B (1/distance^2 units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global cutoff is used.  

Style gauss/cut computes a generalized Gaussian interaction potential between pairs of particles:  

$$
E=\frac{H}{\sigma_{h}\sqrt{2\pi}}\exp\left[-\frac{(r-r_{m h})^{2}}{2\sigma_{h}^{2}}\right]
$$  

where H determines together with the standard deviation $\sigma_{h}$ the peak height of the Gaussian function, and $r_{m h}$ the peak position. Examples of the use of the Gaussian potentials include implicit solvent simulations of salt ions (Lenart) and of surfactants (Jusufi). In these instances the Gaussian potential mimics the hydration barrier between a pair of particles. The hydration barrier is located at $r_{m h}$ and has a width of $\sigma_{h}$ . The prefactor determines the height of the potential barrier.  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• H (energy \* distance units) • $r_{m h}$ (distance units) • $\sigma_{h}$ (distance units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global cutoff is used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.118.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the A, B, H, sigma_h, r_mh parameters, and the cutoff distance for these pair styles can be mixed:  

• A (energy units) $\sqrt{\frac{1}{B}}$ (distance units, see below)   
• H (energy units)   
• $r_{m h}$ (distance units)   
• $\sigma_{h}$ (distance units)   
• cutoff (distance units)  

The default mix value is geometric. Only arithmetic and geometric mix values are supported. See the “pair_modify” command for details.  

The A and H parameters are mixed using the same rules normally used to mix the “epsilon” parameter in a Lennard Jones interaction. The sigma_h, r_mh, and the cutoff distance are mixed using the same rules used to mix the “sigma” parameter in a Lennard Jones interaction. The B parameter is converted to a distance (sigma), before mixing (using sigma $\scriptstyle=\mathrm{B}^{\wedge_{-}}0.5\$ ), and converted back to a coefficient afterwards (using $\mathbf{B}{=}\mathrm{sigma}^{\wedge}2$ ). Negative A values are converted to positive A values (using abs(A)) before mixing, and converted back after mixing (by multiplying by $\mathrm{min(sign(Ai),sign(Aj))} $ . This way, if either particle is repulsive (if $\mathrm{Ai}{<}0$ or $\mathrm{Aj}{<}0$ ), then the default interaction between both particles will be repulsive.  

For the gauss style there is no effect due to the Gaussian well beyond the cutoff; hence reasonable cutoffs need to be specified.  

The gauss/cut style supports the pair_modify shift option for the energy of the Gauss-potential portion of the pair interaction.  

The pair_modify table and tail options are not relevant for these pair styles.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

The gauss pair style tallies an “occupancy” count of how many Gaussian-well sites have an atom within the distance at which the force is a maximum $=\mathrm{sqrt}(0.5/\mathrm{b})$ . This quantity can be accessed via the compute pair command as a vector of values of length 1.  

To print this quantity to the log file (with a descriptive column heading) the following commands could be included in an input script:  

compute gauss all pair gauss variable occ equal c_gauss[1] thermo_style custom step temp epair v_occ  

# 4.118.5 Restrictions  

The gauss and gauss/cut styles are part of the EXTRA-PAIR package. They are only enabled if LAMMPS is build with that package. See the Build package page for more info.  

Changed in version 28Mar2023.  

Prior to this version, the gauss pair style did not apply special_bonds factors.  

# 4.118.6 Related commands  

pair_coeff , pair_style coul/diel  

# 4.118.7 Default  

none (Lenart) Lenart , Jusufi, and Panagiotopoulos, J Chem Phys, 126, 044509 (2007). (Jusufi) Jusufi, Hynninen, and Panagiotopoulos, J Phys Chem B, 112, 13783 (2008).  

# 4.119 pair_style gayberne command  

Accelerator Variants: gayberne/gpu, gayberne/intel, gayberne/omp  

# 4.119.1 Syntax  

pair_style gayberne gamma upsilon mu cutoff gamma $=$ shift for potential minimum (typically 1) upsilon $=$ exponent for eta orientation-dependent energy function • mu $=$ exponent for chi orientation-dependent energy function cutof $=$ global cutoff for interactions (distance units)  

# 4.119.2 Examples  

<html><body><table><tr><td>bair style gayberne 1.0 1.0 1.0 10.0</td></tr></table></body></html>  

# 4.119.3 Description  

The gayberne styles compute a Gay-Berne anisotropic LJ interaction (Berardi) between pairs of ellipsoidal particles or an ellipsoidal and spherical particle via the formulas  

$$
\begin{array}{r l}&{U({\bf A}_{1},{\bf A}_{2},{\bf r}_{12})=U_{r}({\bf A}_{1},{\bf A}_{2},{\bf r}_{12},\gamma)\cdot\eta_{12}({\bf A}_{1},{\bf A}_{2},\upsilon)\cdot\chi_{12}({\bf A}_{1},{\bf A}_{2},{\bf r}_{12},\mu)}\ &{\quad\quad\quad U_{r}=4\varepsilon(\rho^{12}-\rho^{6})}\ &{\quad\quad\quad\quad\quad\rho=\frac{\sigma}{h_{12}+\gamma\sigma}}\end{array}
$$  

where ${\bf A}_{1}$ and ${\bf A}_{2}$ are the transformation matrices from the simulation box frame to the body frame and $r_{12}$ is the center to center vector between the particles. $U_{r}$ controls the shifted distance dependent interaction based on the distance of closest approach of the two particles $(h_{12})$ and the user-specified shift parameter $\gamma.$ When both particles are spherical, the formula reduces to the usual Lennard-Jones interaction (see details below for when Gay-Berne treats a particle as “spherical”).  

For large uniform molecules it has been shown that the energy parameters are approximately representable in terms of local contact curvatures (Everaers):  

$$
\varepsilon_{a}=\sigma\cdot{\frac{a}{b\cdot c}};\varepsilon_{b}=\sigma\cdot{\frac{b}{a\cdot c}};\varepsilon_{c}=\sigma\cdot{\frac{c}{a\cdot b}}
$$  

The variable names utilized as potential parameters are for the most part taken from (Everaers) in order to be consistent with the $R E$ -squared pair potential. Details on the upsilon and mu parameters are given here.  

More details of the Gay-Berne formulation are given in the references listed below and in this supplementary document  

Use of this pair style requires the NVE, NVT, or NPT fixes with the asphere extension (e.g. fix nve/asphere) in order to integrate particle rotation. Additionally, atom_style ellipsoid should be used since it defines the rotational state and the size and shape of each ellipsoidal particle.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• $\varepsilon=$ well depth (energy units) • $\sigma=$ minimum effective particle radii (distance units) • $\varepsilon_{i,a}=$ relative well depth of type I for side-to-side interactions • $\varepsilon_{i,b}=$ relative well depth of type I for face-to-face interactions • $\varepsilon_{i,c}=$ relative well depth of type I for end-to-end interactions • $\varepsilon_{j,a}=$ relative well depth of type J for side-to-side interactions • $\varepsilon_{j,b}=$ relative well depth of type J for face-to-face interactions • $\varepsilon_{j,c}=$ relative well depth of type J for end-to-end interactions • cutoff (distance units)  

The last coefficient is optional. If not specified, the global cutoff specified in the pair_style command is used.  

It is typical with the Gay-Berne potential to define $\sigma$ as the minimum of the 3 shape diameters of the particles involved in an I,I interaction, though this is not required. Note that this is a different meaning for $\sigma$ than the pair_style resquared potential uses.  

The $\varepsilon_{i}$ and $\varepsilon_{j}$ coefficients are actually defined for atom types, not for pairs of atom types. Thus, in a series of pair_coeff commands, they only need to be specified once for each atom type.  

Specifically, if any of $\widehat{\sf z}_{i,a},\varepsilon_{i,b},\varepsilon_{i,c}$ are non-zero, the three values are assigned to atom type I. If all the $\varepsilon_{i}$ values are zero, they are ignored. If any of $\varepsilon_{j,a}$ , $\varepsilon_{j,b}$ , $\varepsilon_{j,c}$ are non-zero, the three values are assigned to atom type J. If all three epsilon_j values are zero, they are ignored. Thus the typical way to define the $\varepsilon_{i}$ and $\varepsilon_{j}$ coefficients is to list their values in “pair_coeff I J” commands when $\boldsymbol{\mathrm{I}}=\boldsymbol{\mathrm{J}}$ , but set them to 0.0 when ${\textbf{I}}!={\textbf{J}}.$ . If you do list them when $\mathrm{I}:=\mathrm{J}$ , you should ensure they are consistent with their values in other pair_coeff commands, since only the last setting will be in effect.  

Note that if this potential is being used as a sub-style of pair_style hybrid, and there is no “pair_coeff I I” setting made for Gay-Berne for a particular type I (because I-I interactions are computed by another hybrid pair potential), then you still need to ensure the $\varepsilon$ a,b,c coefficients are assigned to that type. e.g. in a “pair_coeff I J” command.  

# Note  

If the $\varepsilon_{a}=\varepsilon_{b}=\varepsilon_{c}$ for an atom type, and if the shape of the particle itself is spherical, meaning its 3 shape parameters are all the same, then the particle is treated as an LJ sphere by the Gay-Berne potential. This is significant because if two LJ spheres interact, then the simple Lennard-Jones formula is used to compute their interaction energy/force using the specified epsilon and sigma as the standard LJ parameters. This is much cheaper to compute than the full Gay-Berne formula. To treat the particle as a LJ sphere with sigma $=\mathrm{D}$ , you should normally set $\varepsilon_{a}=\varepsilon_{b}=$ $\varepsilon_{c}=1.0$ , set the pair_coeff $\sigma=D$ , and also set the 3 shape parameters for the particle to D. The one exception is that if the 3 shape parameters are set to 0.0, which is a valid way in LAMMPS to specify a point particle, then the Gay-Berne potential will treat that as shape parameters of 1.0 (i.e. a LJ particle with $\sigma=1$ ), since it requires finite-size particles. In this case you should still set the pair_coeff $\sigma$ to 1.0 as well.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.119.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for this pair style can be mixed.   
The default mix value is geometric. See the “pair_modify” command for details.  

This pair style supports the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction, but only for sphere-sphere interactions. There is no shifting performed for ellipsoidal interactions due to the anisotropic dependence of the interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.119.5 Restrictions  

The gayberne style is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

These pair styles require that atoms store torque and a quaternion to represent their orientation, as defined by the atom_style. It also require they store a per-type shape. The particles cannot store a per-particle diameter.  

This pair style requires that atoms be ellipsoids as defined by the atom_style ellipsoid command.  

Particles acted on by the potential can be finite-size aspherical or spherical particles, or point particles. Spherical particles have all 3 of their shape parameters equal to each other. Point particles have all 3 of their shape parameters equal to 0.0.  

The Gay-Berne potential does not become isotropic as r increases (Everaers). The distance-of-closest-approach approximation used by LAMMPS becomes less accurate when high-aspect ratio ellipsoids are used.  

# 4.119.6 Related commands  

pair_coeff , fix nve/asphere, compute temp/asphere, pair_style resquared  

# 4.119.7 Default  

none  

(Everaers) Everaers and Ejtehadi, Phys Rev E, 67, 041710 (2003).  

(Berardi) Berardi, Fava, Zannoni, Chem Phys Lett, 297, 8-14 (1998). Berardi, Muccioli, Zannoni, J Chem Phys, 128, 024905 (2008).  

(Perram) Perram and Rasmussen, Phys Rev E, 54, 6565-6572 (1996).  

(Allen) Allen and Germano, Mol Phys 104, 3225-3235 (2006).  

# 4.120 pair_style gran/hooke command  

Accelerator Variants: gran/hooke/omp  

# 4.121 pair_style gran/hooke/history command  

Accelerator Variants: gran/hooke/history/omp, gran/hooke/history/kk  

# 4.122 pair_style gran/hertz/history command  

Accelerator Variants: gran/hertz/history/omp  

# 4.122.1 Syntax  

pair_style style Kn Kt gamma_n gamma_t xmu dampflag keyword  

• style $=$ gran/hooke or gran/hooke/history or gran/hertz/history   
• $\mathrm{Kn}=$ elastic constant for normal particle repulsion (force/distance units or pressure units - see discussion below)   
• $\mathrm{Kt}=$ elastic constant for tangential contact (force/distance units or pressure units - see discussion below)   
• gamma_ $\mathbf{n}=$ damping coefficient for collisions in normal direction (1/time units or 1/time-distance units - see discussion below)   
• gamma_t $=$ damping coefficient for collisions in tangential direction (1/time units or 1/time-distance units - see discussion below)   
• xmu $=$ static yield criterion (unitless value between 0.0 and 1.0e4)   
• dampflag $=0$ or 1 if tangential damping force is excluded or included   
• keyword $=$ limit_damping limit_damping value $=$ none limit damping to prevent attractive interaction  

# Note  

Versions of LAMMPS before 9Jan09 had different style names for granular force fields. This is to emphasize the fact that the Hertzian equation has changed to model polydispersity more accurately. A side effect of the change is that the Kn, Kt, gamma_n, and gamma_t coefficients in the pair_style command must be specified with different values in order to reproduce calculations made with earlier versions of LAMMPS, even for monodisperse systems. See the NOTE below for details.  

# 4.122.2 Examples  

<html><body><table><tr><td>pair style gran/hooke/history 200000.0 NULL 50.0 NULL 0.5 1</td></tr><tr><td>style /ho0ke 200000.0 70000.0 50.0 30.0 0.5 0</td></tr><tr><td>pair gran /hooke 200000.0 70000.0 50.0 30.0 0.5 0 limit _damping</td></tr><tr><td>style pair_s gran</td></tr></table></body></html>  

# 4.122.3 Description  

The gran styles use the following formulas for the frictional force between two granular particles, as described in (Brilliantov), (Silbert), and (Zhang), when the distance r between two particles of radii Ri and $\mathrm{Rj}$ is less than their contact distance $\mathrm{d}=\mathrm{Ri}+\mathrm{Rj}$ . There is no force between the particles when $\mathrm{r}>\mathrm{d}$ .  

The two Hookean styles use this formula:  

$$
F_{h k}=(k_{n}\delta\mathbf{n}_{i j}-m_{e f f}\gamma_{n}\mathbf{v}_{n})-(k_{t}\Delta\mathbf{s}_{t}+m_{e f f}\gamma_{t}\mathbf{v}_{t})
$$  

# 4.121. pair_style gran/hooke/history command  

The Hertzian style uses this formula:  

$$
F_{h z}=\sqrt{\delta}\sqrt{\frac{R_{i}R_{j}}{R_{i}+R_{j}}}F_{h k}=\sqrt{\delta}\sqrt{\frac{R_{i}R_{j}}{R_{i}+R_{j}}}\Big[(k_{n}\delta{\bf n}_{i j}-m_{e f f}\gamma_{n}{\bf v}_{n})-(k_{t}\Delta{\bf s}_{t}+m_{e f f}\gamma_{t}{\bf v}_{t})\Big]
$$  

In both equations the first parenthesized term is the normal force between the two particles and the second parenthesized term is the tangential force. The normal force has 2 terms, a contact force and a damping force. The tangential force also has 2 terms: a shear force and a damping force. The shear force is a “history” effect that accounts for the tangential displacement between the particles for the duration of the time they are in contact. This term is included in pair styles hooke/history and hertz/history, but is not included in pair style hooke. The tangential damping force term is included in all three pair styles if dampflag is set to 1; it is not included if dampflag is set to 0.  

The other quantities in the equations are as follows:  

• $\delta=\mathrm{d}-\mathrm{r}=$ overlap distance of 2 particles   
• $K_{n}=$ elastic constant for normal contact   
• $K_{t}=$ elastic constant for tangential contact   
• $\gamma_{n}=$ viscoelastic damping constant for normal contact   
• $\gamma_{t}=$ viscoelastic damping constant for tangential contact   
• $m_{e f f}=M_{i}M_{j}/(M_{i}+M_{j})=$ effective mass of 2 particles of mass M_i and M_j   
• $\Delta{{\bf s}_{t}}=$ tangential displacement vector between 2 particles which is truncated to satisfy a frictional yield criterion   
• $n_{i j}=$ unit vector along the line connecting the centers of the 2 particles   
• $V_{n}=$ normal component of the relative velocity of the 2 particles   
• $V_{t}=$ tangential component of the relative velocity of the 2 particles  

The $K_{n},K_{t}.$ , $\gamma_{n}$ , and $\gamma_{t}$ coefficients are specified as parameters to the pair_style command. If a NULL is used for $K_{t}$ , then a default value is used where $K_{t}=2/7K_{n}$ . If a NULL is used for $\gamma_{t}$ , then a default value is used where $\gamma_{t}=1/2\gamma_{n}$ .  

The interpretation and units for these 4 coefficients are different in the Hookean versus Hertzian equations.  

The Hookean model is one where the normal push-back force for two overlapping particles is a linear function of the overlap distance. Thus the specified $K_{n}$ is in units of (force/distance). Note that this push-back force is independent of absolute particle size (in the monodisperse case) and of the relative sizes of the two particles (in the polydisperse case). This model also applies to the other terms in the force equation so that the specified $\gamma_{n}$ is in units of (1/time), $K_{t}$ is in units of (force/distance), and $\gamma_{t}$ is in units of (1/time).  

The Hertzian model is one where the normal push-back force for two overlapping particles is proportional to the area of overlap of the two particles, and is thus a non-linear function of overlap distance. Thus Kn has units of force per area and is thus specified in units of (pressure). The effects of absolute particle size (monodispersity) and relative size (polydispersity) are captured in the radii-dependent prefactors. When these prefactors are carried through to the other terms in the force equation it means that the specified $\gamma_{n}$ is in units of (1/(time\*distance)), $K_{t}$ is in units of (pressure), and $\gamma_{t}$ is in units of (1/(time\*distance)).  

Note that in the Hookean case, $K_{n}$ can be thought of as a linear spring constant with units of force/distance. In the Hertzian case, $K_{n}$ is like a non-linear spring constant with units of force/area or pressure, and as shown in the (Zhang) paper, $K_{n}=4G/(3(1-\nu))$ where $\nu=$ the Poisson ratio, $\mathrm{G}=$ shear modulus $=E/(2(1+\nu))$ , and $\mathrm{E}=$ Young’s modulus. Similarly, $K_{t}=4G/(2-\nu)$ . (NOTE: in an earlier version of the manual, we incorrectly stated that $K_{t}=8G/(2-\nu).$ )  

Thus in the Hertzian case $K_{n}$ and $K_{t}$ can be set to values that corresponds to properties of the material being modeled. This is also true in the Hookean case, except that a spring constant must be chosen that is appropriate for the absolute size of particles in the model. Since relative particle sizes are not accounted for, the Hookean styles may not be a suitable model for polydisperse systems.  

![](images/a6c761da0285664d43a6d5b0418d1316b4e218bca8d944279f5634d9aad6936f.jpg)  

# Note  

In versions of LAMMPS before $9\mathrm{Jan09}$ , the equation for Hertzian interactions did not include the $\sqrt{r_{i}r_{j}/(r_{i}+r_{j})}$ term and thus was not as accurate for polydisperse systems. For monodisperse systems, $\sqrt{r_{i}r_{j}/(r_{i}+r_{j})}$ is a constant factor that effectively scales all 4 coefficients: $K_{n},K_{t},\gamma_{n},\gamma_{t}$ . Thus you can set the values of these 4 coefficients appropriately in the current code to reproduce the results of a previous Hertzian monodisperse calculation. For example, for the common case of a monodisperse system with particles of diameter 1, all 4 of these coefficients should now be set $2\mathbf{x}$ larger than they were previously.  

Xmu is also specified in the pair_style command and is the upper limit of the tangential force through the Coulomb criterion $\mathrm{Ft}=\mathrm{xmu^{*}F n}$ , where $\mathrm{Ft}$ and Fn are the total tangential and normal force components in the formulas above. Thus in the Hookean case, the tangential force between 2 particles grows according to a tangential spring and dash-pot model until $\mathrm{{Ft/Fn=xmu}}$ and is then held at $\mathrm{{Ft}=\mathrm{{Fn}^{*}\mathrm{{xmu}}}}$ until the particles lose contact. In the Hertzian case, a similar analogy holds, though the spring is no longer linear.  

![](images/1ae071c6f1fbf48f05d83eec51a03f14f8417155eb98120d321b04ff17b6ea2e.jpg)  

# Note  

Normally, xmu should be specified as a fractional value between 0.0 and 1.0, however LAMMPS allows large values (up to 1.0e4) to allow for modeling of systems which can sustain very large tangential forces.  

The effective mass $m\_e f f$ is given by the formula above for two isolated particles. If either particle is part of a rigid body, its mass is replaced by the mass of the rigid body in the formula above. This is determined by searching for a $f\alpha$ rigid command (or its variants).  

For granular styles there are no additional coefficients to set for each pair of atom types via the pair_coeff command. All settings are global and are made via the pair_style command. However you must still use the pair_coeff for all pairs of granular atom types. For example the command  

# 4.122.4 Mixing, shift, table, tail correction, restart, rRESPA info  

The pair_modify mix, shift, table, and tail options are not relevant for granular pair styles.  

These pair styles write their information to binary restart files, so a pair_style command does not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

The single() function of these pair styles returns 0.0 for the energy of a pairwise interaction, since energy is not conserved in these dissipative potentials. It also returns only the normal component of the pairwise interaction force. However, the single() function also calculates 10 extra pairwise quantities. The first 3 are the components of the tangential force between particles I and J, acting on particle I. The fourth is the magnitude of this tangential force. The next 3 (5-7) are the components of the relative velocity in the normal direction (along the line joining the 2 sphere centers). The last 3 (8-10) the components of the relative velocity in the tangential direction.  

These extra quantities can be accessed by the compute pair/local command, as $p l,p2,\ldots,p l{\cal O}.$  

# 4.122.5 Restrictions  

All the granular pair styles are part of the GRANULAR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

These pair styles require that atoms store torque and angular velocity (omega) as defined by the atom_style. They also require a per-particle radius is stored. The sphere atom style does all of this.  

This pair style requires you to use the comm_modify vel yes command so that velocities are stored by ghost atoms.  

These pair styles will not restart exactly when using the read_restart command, though they should provide statistically similar results. This is because the forces they compute depend on atom velocities. See the read_restart command for more details.  

Accumulated values for individual contacts are saved to to restart files but are not saved to data files. Therefore, force may differ significantly when a system is reloaded using A read_data command.  

# 4.122.6 Related commands  

pair_coeff  

# 4.122.7 Default  

none  

(Brilliantov) Brilliantov, Spahn, Hertzsch, Poschel, Phys Rev E, 53, p 5382-5392 (1996).   
(Silbert) Silbert, Ertas, Grest, Halsey, Levine, Plimpton, Phys Rev E, 64, p 051302 (2001).   
(Zhang) Zhang and Makse, Phys Rev E, 72, p 011301 (2005).  

# 4.123 pair_style granular command  

# 4.123.1 Syntax  

# 4.123.2 Examples  

pair_style granular   
pair_coeff \* \* hooke 1000.0 50.0 tangential linear_nohistory 1.0 0.4 damping mass_velocity   
pair_style granular   
pair_coeff \* \* hooke 1000.0 50.0 tangential linear_history 500.0 1.0 0.4 damping mass_velocity pair_style granular   
pair_coeff \* \* hertz 1000.0 50.0 tangential mindlin 1000.0 1.0 0.4 limit $-$ damping   
pair_style granular   
pair_coeff \* \* hertz/material 1e8 0.3 0.3 tangential mindlin_rescale NULL 1.0 0.4 damping tsuji pair_style granular   
pair_coeff 1 \* jkr 1000.0 500.0 0.3 10 tangential mindlin 800.0 1.0 0.5 rolling sds 500.0 200.0 0.5 twisting␣ $\hookrightarrow$ marshall   
pair_coeff 2 2 hertz 200.0 100.0 tangential linear_history 300.0 1.0 0.1 rolling sds 200.0 100.0 0.1␣ $\hookrightarrow$ twisting marshall   
pair_style granular   
pair_coeff 1 1 dmt 1000.0 50.0 0.3 0.0 tangential mindlin NULL 0.5 0.5 rolling sds 500.0 200.0 0.5␣ $\hookrightarrow$ twisting marshall   
pair_coeff 2 2 dmt 1000.0 50.0 0.3 10.0 tangential mindlin NULL 0.5 0.1 rolling sds 500.0 200.0 0.1␣ $\hookrightarrow$ twisting marshall   
pair_style granular   
pair_coeff \* \* hertz 1000.0 50.0 tangential mindlin 1000.0 1.0 0.4 heat area 0.1   
pair_style granular   
pair_coeff \* \* mdr 5e6 0.4 1.9e5 2.0 0.5 0.5 tangential linear_history 940.0 0.0 0.7 rolling sds 2.7e5 0.0 0. $\omega^{6}$ damping none  

# 4.123.3 Description  

The granular styles support a variety of options for the normal, tangential, rolling and twisting forces resulting from contact between two granular particles. This expands on the options offered by the pair gran/\* pair styles. The total computed forces and torques are the sum of various models selected for the normal, tangential, rolling and twisting modes of motion.  

All model choices and parameters are entered in the pair_coeff command, as described below. Unlike e.g. pair gran/hooke, coefficient values are not global, but can be set to different values for different combinations of particle types, as determined by the pair_coeff command. If the contact model choice is the same for two particle types, the mixing for the cross-coefficients can be carried out automatically. This is shown in the last example, where model choices are the same for type 1 - type 1 as for type 2 - type2 interactions, but coefficients are different. In this case, the mixed coefficients for type 1 - type 2 interactions can be determined from mixing rules discussed below. For additional flexibility, coefficients as well as model forms can vary between particle types, as shown in the fourth example: type 1 - type 1 interactions are based on a Johnson-Kendall-Roberts normal contact model and 2-2 interactions are based on a DMT cohesive model (see below). In that example, 1-1 and 2-2 interactions have different model forms, in which case mixing of coefficients cannot be determined, so 1-2 interactions must be explicitly defined via the pair_coeff 1 \* command, otherwise an error would result.  

The first required keyword for the pair_coeff command is the normal contact model. Currently supported options for normal contact models and their required arguments are:  

1. hooke : $k_{n}$ , $\eta_{n0}$ (or e)   
2. hertz : $k_{n}$ , $\eta_{n0}$ (or $e$ )   
3. hertz/material : E, $\eta_{n0}$ (or $e$ ), ν   
4. dmt : E, $\eta_{n0}$ (or $e$ ), ν , γ   
5. jkr : E, $\eta_{n0}$ (or $e$ ), ν , γ   
$6.m d r:E,\nu,Y,\Delta\gamma,\psi_{b},e$  

Here, $k_{n}$ is spring stiffness (with units that depend on model choice, see below); $\eta_{n0}$ is a damping prefactor (or, in its place a coefficient of restitution $e$ , depending on the choice of damping mode, see below); E is Young’s modulus in units of force/length $\wedge_{2}$ , i.e. pressure; $\nu$ is Poisson’s ratio and $\gamma$ is a surface energy density, in units of energy/length $^{\prime\prime2}$ .  

For the hooke model, the normal, elastic component of force acting on particle $i$ due to contact with particle $j$ is given by:  

$$
{\bf F}_{n e,H o o k e}=k_{n}\delta_{i j}{\bf n}
$$  

Where $\delta_{i j}=R_{i}+R_{j}-\left\|\mathbf{r}_{i j}\right\|$ is the particle overlap, $R_{i},R_{j}$ are the particle radii, $\mathbf{r}_{i j}=\mathbf{r}_{i}-\mathbf{r}_{j}$ is the vector separating the two particle centers (note the $\mathbf{i}{-}\mathbf{j}$ ordering so that ${\bf F}_{n e}$ is positive for repulsion), and $\begin{array}{r}{\mathbf{n}=\frac{\mathbf{r}_{i j}}{\|\mathbf{r}_{i j}\|}}\end{array}$ . Therefore, for hooke, the units of the spring constant $k_{n}$ are force/distance, or equivalently mass/time^2.  

For the hertz model, the normal component of force is given by:  

$$
\mathbf{F}_{n e,H e r t z}=k_{n}R_{e f f}^{1/2}\delta_{i j}^{3/2}\mathbf{n}
$$  

Here, $\begin{array}{r}{R_{e f f}=R=\frac{R_{i}R_{j}}{R_{i}+R_{j}}}\end{array}$ RRii+RRjj is the effective radius, denoted for simplicity as R from here on. For hertz, the units of the spring constant $k_{n}$ are force/length $\wedge_{2}$ , or equivalently pressure.  

For the hertz/material model, the force is given by:  

$$
\mathbf{F}_{n e,H e r t z/m a t e r i a l}=\frac{4}{3}E_{e f f}R^{1/2}\delta_{i j}^{3/2}\mathbf{n}
$$  

Here, $\begin{array}{r}{E_{e f f}=E=\left(\frac{1-{\nu}_{i}^{2}}{E_{i}}+\frac{1-{\nu}_{j}^{2}}{E_{j}}\right)^{-1}}\end{array}$ is the effective Young’s modulus, with $\nu_{i},\nu_{j}$ the Poisson ratios of the particles of types $i$ and $j$ . $E_{e f f}$ is denoted as $E$ from here on. Note that if the elastic modulus and the shear modulus of the two particles are the same, the hertz/material model is equivalent to the hertz model with $k_{n}=4/3E$  

The dmt model corresponds to the (Derjaguin-Muller-Toporov) cohesive model, where the force is simply Hertz with an additional attractive cohesion term:  

$$
{\bf F}_{n e,d m t}=\left(\frac{4}{3}E R^{1/2}\delta_{i j}^{3/2}-4\pi\gamma R\right){\bf n}
$$  

The $j k r$ model is the (Johnson-Kendall-Roberts) model, where the force is computed as:  

$$
\mathbf{F}_{n e,j k r}=\left(\frac{4E a^{3}}{3R}-2\pi a^{2}\sqrt{\frac{4\gamma E}{\pi a}}\right)\mathbf{n}
$$  

Here, $a$ is the radius of the contact zone, related to the overlap $\delta$ according to:  

$$
\delta=a^{2}/R-2\sqrt{\pi\gamma a/E}
$$  

LAMMPS internally inverts the equation above to solve for $a$ in terms of $\delta$ , then solves for the force in the previous equation. Additionally, note that the JKR model allows for a tensile force beyond contact (i.e. for $\delta<0,$ ), up to a maximum of $3\pi\gamma R$ (also known as the ‘pull-off’ force). Note that this is a hysteretic effect, where particles that are not contacting initially will not experience force until they come into contact $\delta\geq0$ ; as they move apart and $(\delta<0)$ , they experience a tensile force up to $3\pi\gamma R$ , at which point they lose contact.  

The mdr model is a mechanically-derived contact model designed to capture the contact response between adhesive elastic-plastic particles into large deformation. The theoretical foundations of the mdr model are detailed in the twopart series Zunker and Kamrin Part I and Zunker and Kamrin Part II. Further development and demonstrations of its application to industrially relevant powder compaction processes are presented in Zunker et al..  

The model requires the following inputs:  

1. Young’s modulus $E>0$ : The Young’s modulus is commonly reported for various powders.   
2. Poisson’s ratio $0\leq\nu\leq0.5$ : The Poisson’s ratio is commonly reported for various powders. 3. Yield stress $Y\geq0$ : The yield stress is often known for powders composed of materials such as metals but may be unreported for ductile organic materials, in which case it can be treated as a free parameter. 4. Effective surface energy $\Delta\gamma\geq0$ : The effective surface energy for powder compaction applications is most easily determined through its relation to the more commonly reported critical stress intensity factor $K_{I c}=\sqrt{2\dot{\Delta}\gamma E/(1-\nu^{2})}$ .   
5. Critical confinement ratio $0\leq\psi_{b}\leq1$ : The critical confinement ratio is a tunable parameter that determines when the bulk elastic response is triggered. Lower values of $\psi_{b}$ delay the onset of the bulk elastic response.   
6. Coefficient of restitution $0\leq e\leq1$ : The coefficient of restitution is a tunable parameter that controls  

damping in the normal direction.  

# Note  

The values for $E,\nu,Y$ , and $\Delta\gamma(\mathrm{i.e.,}K_{I c})$ should be selected for zero porosity to reflect the intrinsic material property rather than the bulk powder property.  

The mdr model produces a nonlinear force-displacement response, therefore the critical timestep $\Delta t$ depends on the inputs and level of deformation. As a conservative starting point the timestep can be assumed to be dictated by the bulk elastic response such that $\Delta t=0.35\sqrt{m/k_{\mathrm{bulk}}}$ , where $m$ is the mass of the smallest particle and $k_{\mathrm{bulk}}=\kappa R_{\mathrm{min}}$ is an effective stiffness related to the bulk elastic response. Here, $\kappa=E/(3(1-2\nu))$ is the bulk modulus and $R_{\mathrm{min}}$ is the radius of the smallest particle.  

![](images/5e665f9aff0c75d92050adc91fe335db257edbb8ea128589d299a52ef47646f4.jpg)  

# Note  

The mdr model requires some specific settings to function properly, please read the following text carefully to ensure all requirements are followed.  

The atom_style must be set to sphere $I$ to enable dynamic particle radii. The mdr model is designed to respect the incompressibility of plastic deformation and inherently tracks free surface displacements induced by all particle contacts. In practice, this means that all particles begin with an initial radius, however as compaction occurs and plastic deformation is accumulated, a new enlarged apparent radius is defined to ensure that that volume change due to plastic deformation is not lost. This apparent radius is stored as the atom radius meaning it is used for subsequent neighbor list builds and contact detection checks. The advantage of this is that multi-neighbor dependent effects such as formation of secondary contacts caused by radial expansion are captured by the mdr model. Setting atom_style sphere 1 ensures that updates to the particle radii are properly reflected throughout the simulation.  

Newton’s third law must be set to off. This ensures that the neighbor lists are constructed properly for the topological penalty algorithm used to screen for non-physical contacts occurring through obstructing particles, an issue prevalent under large deformation conditions. For more information on this algorithm see Zunker et al..  

The damping model must be set to none. The mdr model already has a built in damping model.  

pair_coeff \* \* mdr 5e6 0.4 1.9e5 2 0.5 0.5 damping none  

The definition of multiple mdr models in the pair_style is currently not supported. Similarly, the mdr model cannot be combined with a different normal model in the pair_style. Physically this means that only one homogeneous collection of particles governed by a single mdr model is allowed.  

The mdr model currently only supports fix wall/gran/region, not fix wall/gran. If the mdr model is specified for the pair_style any fix wall/gran/region commands must also use the mdr model. Additionally, the following mdr inputs must match between the pair_style and fix wall/gran/region definitions: $E$ , ν , Y , $\psi_{b}$ , and $e$ . The exception is $\Delta\gamma$ , which may vary, permitting different adhesive behaviors between particle-particle and particle-wall interactions.  

![](images/73d3ca79700efba76be3faf5784a028d89084b18d08f0776fceb7d620069ef59.jpg)  

# Note  

The mdr model has a number of custom property/atom and pair/local definitions that can be called in the input file.   
The useful properties for visualization and analysis are described below.  

In addition to contact forces the mdr model also tracks the following quantities for each particle: elastic volume change, average normal stress components, total surface area involved in contact, and individual contact areas. In the input script, these quantities are initialized by calling run $O$ and can then be accessed using subsequent compute commands. The last compute command uses pair/local $p l3$ to calculate the pairwise contact areas for each active contact in the group-ID. Due to the use of an apparent radius in the mdr model, the keyword/arg pair cutoff radius must be specified for pair/local to properly detect existing contacts.  

run 0 compute ID group-ID property/atom d_Velas compute ID group-ID property/atom d_sigmaxx compute ID group-ID property/atom d_sigmayy compute ID group-ID property/atom d_sigmazz compute ID group-ID property/atom d_Acon1 compute ID group-ID pair/local p13 cutoff radius  

![](images/8fcfd2675291c60b09bd4119b5a02072d3245f157d0f9737bedfd42c6e952412.jpg)  

# Note  

The mdr model has two example input scripts within the examples/granular directory. The first is a die compaction simulation involving 200 particles named in.tableting.200. The second is a triaxial compaction simulation involving 12 particles named in.triaxial.compaction.12.  

In addition, the normal force is augmented by a damping term of the following general form:  

$$
{\bf F}_{n,d a m p}=-\eta_{n}{\bf v}_{n,r e l}
$$  

Here, $\mathbf{v}_{n,r e l}=(\mathbf{v}_{j}-\mathbf{v}_{i})\cdot\mathbf{n}\mathbf{n}$ is the component of relative velocity along $\mathbf{n}$ .  

The optional damping keyword to the pair_coeff command followed by a keyword determines the model form of the damping factor $\eta_{n}$ , and the interpretation of the $\eta_{n0}$ or $e$ coefficients specified as part of the normal contact model settings. The damping keyword and corresponding model form selection may be appended anywhere in the pair coeff command. Note that the choice of damping model affects both the normal and tangential damping (and depending on other settings, potentially also the twisting damping). The options for the damping model currently supported are:  

1. velocity   
2. mass_velocity   
3. viscoelastic   
4. tsuji   
5. coeff_restitution  

If the damping keyword is not specified, the viscoelastic model is used by default.  

For damping velocity, the normal damping is simply equal to the user-specified damping coefficient in the normal model:  

$$
\eta_{n}=\eta_{n0}
$$  

Here, $\eta_{n0}$ is the damping coefficient specified for the normal contact model, in units of mass/time.  

For damping mass_velocity, the normal damping is given by:  

$$
\eta_{n}=\eta_{n0}m_{e f f}
$$  

Here, $\eta_{n0}$ is the damping coefficient specified for the normal contact model, in units of 1/time and $m_{e f f}=m_{i}m_{j}/(m_{i}+m_{j})$ is the effective mass. Use damping mass_velocity to reproduce the damping behavior of pair gran/hooke/\*.  

The damping viscoelastic model is based on the viscoelastic treatment of (Brilliantov et al), where the normal damping is given by:  

$$
\eta_{n}=\eta_{n0}a m_{e f f}
$$  

Here, $a$ is the contact radius, given by $a={\sqrt{R\delta}}$ for all models except $j k r$ , for which it is given implicitly according to $\delta=a^{2}/R-2\sqrt{\pi\gamma a/E}$ . For damping viscoelastic, $\eta_{n0}$ is in units of 1/(time\*distance).  

The tsuji model is based on the work of (Tsuji et al). Here, the damping coefficient specified as part of the normal model is interpreted as a restitution coefficient $e$ . The damping constant $\eta_{n}$ is given by:  

$$
\eta_{n}=\alpha(m_{e f f}k_{n d})^{1/2}
$$  

where $k_{n d}$ is an effective harmonic stiffness equal to the ratio of the normal force to the overlap. For example, $k_{n d}=$ $4/3E a$ for a Hertz contact model based on material parameters with $a$ being the contact radius of $\sqrt{\delta R}$ . For Hooke, $k_{n d}$ is simply the spring constant or $k_{n}$ . This damping model is not compatible with cohesive normal models such as $J K R$ or $D M T$ . The parameter $\alpha$ is related to the restitution coefficient $e$ according to:  

$$
\alpha=1.2728-4.2783e+11.087e^{2}-22.348e^{3}+27.467e^{4}-18.022e^{5}+4.8218e^{6}
$$  

The dimensionless coefficient of restitution $e$ specified as part of the normal contact model parameters should be between 0 and 1, but no error check is performed on this.  

The coeff_restitution model is useful when a specific normal coefficient of restitution $e$ is required. It operates much like the Tsuji model but, the normal coefficient of restitution $e$ is specified as an input in place of the usual $\eta_{n0}$ value in the normal model. Following the approach of (Brilliantov et al), when using the hooke normal model, coeff_restitution then calculates the damping coefficient as:  

$$
\eta_{n}=\sqrt{\frac{4m_{e f f}k_{n d}}{1+\left(\frac{\pi}{\log(e)}\right)^{2}}},
$$  

# 4.123. pair_style granular command  