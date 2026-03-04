---
title: "CG-DNA/RNA and Pair Style PACE (ACE)"
description: "oxDNA/oxRNA coarse-grained models, ACE atomic cluster expansion potential"
category: "pair_style"
tags: ["DNA", "RNA", "coarse-grain", "ACE", "machine-learning", "PACE"]
commands: ["pair_style oxdna", "pair_style oxrna", "pair_style pace", "pair_style pedone"]
---
# 4.219.5 Restrictions  

These pair styles can only be used if LAMMPS was built with the CG-DNA package and the MOLECULE and ASPHERE package. See the Build package page for more info.  

# 4.219.6 Related commands  

bond_style oxrna2/fene, pair_coeff , bond_style oxdna/fene, pair_style oxdna/excv, bond_style oxdna2/fene, pair_style oxdna2/excv, atom_style oxdna, fix nve/dotc/langevin  

# 4.219.7 Default  

none  

(Henrich) O. Henrich, Y. A. Gutierrez-Fosado, T. Curk, T. E. Ouldridge, Eur. Phys. J. E 41, 57 (2018).   
(Sulc1) P. Sulc, F. Romano, T. E. Ouldridge, et al., J. Chem. Phys. 140, 235102 (2014).   
(Sulc2) P. Sulc, F. Romano, T.E. Ouldridge, L. Rovigatti, J.P.K. Doye, A.A. Louis, J. Chem. Phys. 137, 135101 (2012).   
(Ouldridge-DPhil) T.E. Ouldridge, Coarse-grained modelling of DNA and DNA self-assembly, DPhil. University of Oxford (2011).   
(Ouldridge) T.E. Ouldridge, A.A. Louis, J.P.K. Doye, J. Chem. Phys. 134, 085101 (2011).  

# 4.220 pair_style pace command  

Accelerator Variants: pace/kk, pace/extrapolation/kk  

# 4.221 pair_style pace/extrapolation command  

# 4.221.1 Syntax  

pair_style pace ... keyword values ...  

• one or more keyword/value pairs may be appended keyword $=$ product or recursive or chunksize product $=$ use product algorithm for basis functions recursive $=$ use recursive algorithm for basis functions chunksize value $=$ number of atoms in each pass  

pair_style pace/extrapolation  

# 4.221.2 Examples  

pair_style pace   
pair_style pace product chunksize 2048   
pair_coeff \* \* Cu-PBE-core-rep.ace Cu   
pair_style pace   
pair_coeff \* \* Cu.yaml Cu   
pair_style pace/extrapolation   
pair_coeff \* \* Cu.yaml Cu.asi Cu  

# 4.221.3 Description  

Pair style pace computes interactions using the Atomic Cluster Expansion (ACE), which is a general expansion of the atomic energy in multi-body basis functions. (Drautz19). The pace pair style provides an efficient implementation that is described in this paper (Lysogorskiy21).  

In ACE, the total energy is decomposed into a sum over atomic energies. The energy of atom $i$ is expressed as a linear or non-linear function of one or more density functions. By projecting the density onto a local atomic base, the lowest order contributions to the energy can be expressed as a set of scalar polynomials in basis function contributions summed over neighbor atoms.  

Only a single pair_coeff command is used with the pace style which specifies an ACE coefficient file followed by N additional arguments specifying the mapping of ACE elements to LAMMPS atom types, where $\mathbf{N}$ is the number of LAMMPS atom types:  

• ACE coefficient file (.yaml or .yace/.ace format) • N element names $=$ mapping of ACE elements to atom types  

Only a single pair_coeff command is used with the pace style which specifies an ACE file that fully defines the potential. Note that unlike for other potentials, cutoffs are not set in the pair_style or pair_coeff command; they are specified in the ACE file.  

The pair_style pace command may be followed by the optional keyword product or recursive, which determines which of two algorithms is used for the calculation of basis functions and derivatives. The default is recursive.  

The keyword chunksize is only applicable when using the pair style pace with the KOKKOS package on GPUs and is ignored otherwise. This keyword controls the number of atoms in each pass used to compute the atomic cluster expansion and is used to avoid running out of memory. For example if there are 8192 atoms in the simulation and the chunksize is set to 4096, the ACE calculation will be broken up into two passes (running on a single GPU).  

# 4.221.4 Extrapolation grade  

Calculation of extrapolation grade in PACE is implemented in pair_style pace/extrapolation. It is based on the MaxVol algorithm similar to Moment Tensor Potential (MTP) by Shapeev et al. and is described in (Lysogorskiy23). In order to compute extrapolation grade one needs to provide:  

1. ACE potential in B-basis form (.yaml format) and   
2. Active Set Inverted (ASI) file for corresponding potential (.asi format)  

Calculation of extrapolation grades requires matrix-vector multiplication for each atom and is slower than the usual pair_style pace recursive, therefore it is not computed by default. Extrapolation grade calculation is involved by $f\boldsymbol{u}\boldsymbol{x}$ pair, which requests to compute gamma, as shown in example below:  

pair_style pace/extrapolation   
pair_coeff \* \* Cu.yaml Cu.asi Cu   
fix pace_gamma all pair 10 pace/extrapolation gamma 1   
compute max_pace_gamma all reduce max f_pace_gamma   
variable dump_skip equal "c_max_pace_gamma $<5$ "   
dump pace_dump all custom 20 extrapolative_structures.dump id type x y z f_pace_gamma   
dump $-$ modify pace_dump skip v_dump_skip   
variable max_pace_gamma equal c_max_pace_gamma   
fix extreme_extrapolation all halt 10 v_max_pace_gamma > 25  

Here extrapolation grade gamma is computed every 10 steps and is stored in f_pace_gamma per-atom variable. The largest value of extrapolation grade among all atoms in a structure is reduced to c_max_pace_gamma variable. Only if this value exceeds extrapolation threshold 5, then the structure will be dumped into extrapolative_structures.dump file, but not more often than every 20 steps.  

On all other steps pair_style pace recursive will be used.  

When using the pair style pace/extrapolation with the KOKKOS package on GPUs product B-basis evaluator is always used and only linear ASI is supported.  

See the pair_coeff page for alternate ways to specify the path for the ACE coefficient file.  

# 4.221.5 Core repulsion  

The ACE potential can be configured to initiate core-repulsion from an inner cutoff, seamlessly transitioning from ACE to ZBL. The core repulsion factor can be accessed as a per-atom quantity, as demonstrated in the example below:  

pair_style pace pair_coeff \* \* CuNi.yaml Cu Ni fix pace_corerep all pair 1 pace corerep 1  

In this case, per-atom $f_{-}$ _pace_corerep quantities represent the fraction of ZBL core-repulsion for each atom.  

# 4.221.6 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS with user-specifiable parameters as described above. You never need to specify a pair_coeff command with $\mathrm{I}!=\mathrm{J}$ arguments for this style.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.221.7 Restrictions  

This pair style is part of the ML-PACE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.221.8 Related commands  

pair_style snap, fix pair  

# 4.221.9 Default  

recursive, chunksize $=4096$ ,  

(Drautz19) Drautz, Phys Rev B, 99, 014104 (2019).  

(Lysogorskiy21) Lysogorskiy, van der Oord, Bochkarev, Menon, Rinaldi, Hammerschmidt, Mrovec, Thompson, Csanyi, Ortner, Drautz, npj Comp Mat, 7, 97 (2021).  

(Lysogorskiy23) Lysogorskiy, Bochkarev, Mrovec, Drautz, Phys Rev Mater, 7, 043801 (2023) / arXiv:2212.08716 (2022).  

# 4.222 pair_style pedone command  

Accelerator Variants: pedone/omp  

# 4.222.1 Syntax  

• style $=$ pedone\* args $=$ list of arguments for a particular style  

pedone args $=$ cutoff cutoff $=$ global cutoff for Pedone interactions (distance units)  

# 4.222.2 Examples  

pair_style hybrid/overlay pedone 15.0 coul/long 15.0   
kspace_style pppm 1.0e-5   
pair_coeff \* \* coul/long   
pair_coeff 1 2 pedone 0.030211 2.241334 2.923245 5.0   
pair_coeff 2 2 pedone 0.042395 1.379316 3.618701 22.0  

Used in input scripts:  

<html><body><table><tr><td>examples/PACKAGES/pedone/in.pedone.relax</td></tr><tr><td>examples/PACKAGES/pedone/in.pedone.melt</td></tr></table></body></html>  

# 4.222.3 Description  

Added in version 17Apr2024.  

Pair style pedone computes the non-Coulomb interactions of the Pedone (or PMMCS) potential (Pedone) which combines Coulomb interactions, Morse potential, and repulsive $r^{-12}$ Lennard-Jones terms (see below). The pedone pair  

style is meant to be used in addition to a Coulomb pair style via pair style hybrid/overlay (see example above). Using coul/long or could/dsf (for solids) is recommended.  

The full Pedone potential function from (Pedone) for each pair of atoms is:  

$$
E=\frac{C q_{i}q_{j}}{\varepsilon r}+D_{0}\left[e^{-2\alpha(r-r_{0})}-2e^{-\alpha(r-r_{0})}\right]+\frac{B_{0}}{r^{12}}\qquadr<r_{c}
$$  

$r_{c}$ is the cutoff and $C$ is a conversion factor that is specific to the choice of units so that the entire Coulomb term is in energy units with $q_{i}$ and $q_{j}$ as the assigned charges in multiples of the elementary charge.  

The following coefficients must be defined for the selected pairs of atom types via the pair_coeff command as in the example above:  

• $D_{0}$ (energy units) • $\alpha$ (1/distance units) • $r_{0}$ (distance units) • $C_{0}$ (energy units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global pedone cutoff is used.  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.222.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing.  

This pair style support the pair_modify shift option for the energy of the pair interaction.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands does not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, or outer keywords.  

# 4.222.5 Restrictions  

The pedone pair style is only enabled if LAMMPS was built with the EXTRA-PAIR package. See the Build package page for more info.  

# 4.222.6 Related commands  

pair_coeff , pair_style, pair style coul/long and coul/dsf , pair style morse  

# 4.222.7 Default  

none  

(Pedone) A. Pedone, G. Malavasi, M. C. Menziani, A. N. Cormack, and U. Segre, J. Phys. Chem. B, 110, 11780 (2006)  

# 4.223 pair_style peri/pmb command  

Accelerator Variants: peri/pmb/omp  

# 4.224 pair_style peri/lps command  

Accelerator Variants: peri/lps/omp  

4.225 pair_style peri/ves command  

4.226 pair_style peri/eps command  

# 4.226.1 Syntax  

Style peri/ves implements the Peridynamic state-based linear peridynamic viscoelastic solid (VES) model.  

Style peri/eps implements the Peridynamic state-based elastic-plastic solid (EPS) model.  

The canonical papers on Peridynamics are (Silling 2000) and (Silling 2007). The implementation of Peridynamics in LAMMPS is described in (Parks). Also see the Peridynamics Howto for more details about its implementation.  

The peridynamic VES and EPS models in PDLAMMPS were implemented by R. Rahman and J. T. Foster at University of Texas at San Antonio. The original VES formulation is described in “(Mitchell2011)” and the original EPS formulation is in “(Mitchell2011a)”. Additional PDF docs that describe the VES and EPS implementations are include in the LAMMPS distribution in doc/PDF/PDLammps_VES.pdf and doc/PDF/PDLammps_EPS.pdf. For questions regarding the VES and EPS models in LAMMPS you can contact R. Rahman (rezwanur.rahman at utsa.edu).  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below.  

For the peri/pmb style:  

• c (energy/distance/volume^2 units)   
• horizon (distance units)   
• s00 (unitless)   
• α (unitless)  

C is the effectively a spring constant for Peridynamic bonds, the horizon is a cutoff distance for truncating interactions, and s00 and $\alpha$ are used as a bond breaking criteria. The units of c are such that c/distance $=$ stiffness/volume $\cdot^{\wedge}2$ , where stiffness is energy/distance $\wedge_{2}$ and volume is distance $\wedge3$ . See the users guide for more details.  

For the peri/lps style:  

• K (force/area units)   
• G (force/area units)   
• horizon (distance units)   
• s00 (unitless)   
• α (unitless)  

K is the bulk modulus and G is the shear modulus. The horizon is a cutoff distance for truncating interactions, and s00 and $\alpha$ are used as a bond breaking criteria. See the users guide for more details.  

For the peri/ves style:  

• K (force/area units)   
• G (force/area units)   
• horizon (distance units)   
• s00 (unitless)   
• α (unitless)   
• m_lambdai (unitless)   
• m_taubi (unitless)  

K is the bulk modulus and G is the shear modulus. The horizon is a cutoff distance for truncating interactions, and s00 and $\alpha$ are used as a bond breaking criteria. m_lambdai and m_taubi are the viscoelastic relaxation parameter and time constant, respectively. m_lambdai varies within zero to one. For very small values of m_lambdai the viscoelastic model responds very similar to a linear elastic model. For details please see the description in “(Mitchell2011)”.  

For the peri/eps style:  

• K (force/area units)   
• G (force/area units)   
• horizon (distance units)   
• s00 (unitless)   
• α (unitless)   
• m_yield_stress (force/area units)  

K is the bulk modulus and G is the shear modulus. The horizon is a cutoff distance and s00 and $\alpha$ are used as a bond breaking criteria. m_yield_stress is the yield stress of the material. For details please see the description in “(Mitchell2011a)”.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.226.4 Mixing, shift, table, tail correction, restart, rRESPA info  

These pair styles do not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

These pair styles do not support the pair_modify shift option.  

The pair_modify table and tail options are not relevant for these pair styles.  

These pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

These pair styles can only be used via the pair keyword of the run_style respa command. They do not support the inner, middle, outer keywords.  

# 4.226.5 Restrictions  

All of these styles are part of the PERI package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.226.6 Related commands  

pair_coeff  

# 4.226.7 Default  

none  

(Parks) Parks, Lehoucq, Plimpton, Silling, Comp Phys Comm, 179(11), 777-783 (2008).  

(Silling 2000) Silling, J Mech Phys Solids, 48, 175-209 (2000).  

(Silling 2007) Silling, Epton, Weckner, Xu, Askari, J Elasticity, 88, 151-184 (2007).  

(Mitchell2011) Mitchell. A non-local, ordinary-state-based viscoelasticity model for peridynamics. Sandia National Lab Report, 8064:1-28 (2011).  

(Mitchell2011a) Mitchell. A Nonlocal, Ordinary, State-Based Plasticity Model for Peridynamics. Sandia National Lab Report, 3166:1-34 (2011).  

# 4.227 pair_style pod command  

Accelerator Variants: pod/kk  

# 4.227.1 Syntax  

# 4.227.2 Examples  

<html><body><table><tr><td>pair style pod</td></tr><tr><td>pair coeff ** Ta_param.pod Ta_coefficients.pod Ta</td></tr></table></body></html>  

# 4.227.3 Description  

Added in version 22Dec2022.  

Pair style pod defines the proper orthogonal descriptor (POD) potential (Nguyen and Rohskopf), (Nguyen2023), (Nguyen2024), and (Nguyen and Sema). The fitpod is used to fit the POD potential.  

Only a single pair_coeff command is used with the pod style which specifies a POD parameter file followed by a coefficient file, a projection matrix file, and a centroid file.  

The POD parameter file (Ta_param.pod) can contain blank and comment lines (start with #) anywhere. Each nonblank non-comment line must contain one keyword/value pair. See fitpod for the description of all the keywords that can be assigned in the parameter file.  

The coefficient file (Ta_coefficients.pod) contains coefficients for the POD potential. The top of the coefficient file can contain any number of blank and comment lines (start with #), but follows a strict format after that. The first non-blank non-comment line must contain:  

• model_coefficients: ncoeff nproj ncentroid  

This is followed by ncoeff coefficients, nproj projection matrix entries, and ncentroid centroid coordinates, one per line. The coefficient file is generated after training the POD potential using fitpod.  

As an example, if a LAMMPS indium phosphide simulation has 4 atoms types, with the first two being indium and the third and fourth being phophorous, the pair_coeff command would look like this:  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The two filenames are for the parameter and coefficient files, respectively. The two trailing $\mathbf{\nabla}^{6}\ensuremath{\mathbf{In}}^{,}$ arguments map LAMMPS atom types 1 and 2 to the POD ‘In’ element. The two trailing $\mathbf{\nabla}^{\leftmoon}\mathbf{P}^{\ {\mu\}}$ arguments map LAMMPS atom types 3 and 4 to the POD ‘P’ element.  

If a POD mapping value is specified as NULL, the mapping is not performed. This can be used when a pod potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Examples about training and using POD potentials are found in the directory lammps/examples/PACKAGES/pod and the Github repo https://github.com/cesmix-mit/pod-examples.  

# 4.227.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS with user-specifiable parameters as described above. You never need to specify a pair_coeff command with $\mathrm{I}!=\mathrm{J}$ arguments for this style.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.227.5 Restrictions  

This style is part of the ML-POD package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.227.6 Related commands  

fitpod, compute pod/atom, compute podd/atom, compute pod/local, compute pod/global  

# 4.227.7 Default  

none  

(Nguyen and Rohskopf) Nguyen and Rohskopf, Journal of Computational Physics, 480, 112030, (2023).  

(Nguyen2023) Nguyen, Physical Review B, 107(14), 144103, (2023).   
(Nguyen2024) Nguyen, Journal of Computational Physics, 113102, (2024).   
(Nguyen and Sema) Nguyen and Sema, https://arxiv.org/abs/2405.00306, (2024).  

# 4.228 pair_style polymorphic command  

# 4.228.1 Syntax  

style $=$ polymorphic  

# 4.228.2 Examples  

pair_style polymorphic pair_coeff \* \* FeCH_BOP_I.poly Fe C H pair_coeff \* \* TlBr_msw.poly Tl Br pair_coeff \* \* CuTa_eam.poly Cu Ta pair_coeff \* \* GaN_tersoff.poly Ga N pair_coeff \* \* GaN_sw.poly Ga N  

# 4.228.3 Description  

The polymorphic pair style computes a 3-body free-form potential (Zhou3) for the energy E of a system of atoms as  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\frac{1}{2}\sum_{i=1}^{i=N}\sum_{j=1}^{j=N}\left[\left(1-\delta_{i j}\right)\cdot U_{I J}\left(r_{i j}\right)-\left(1-\eta_{i j}\right)\cdot F_{I J}\left(X_{i j}\right)\cdot V_{I J}\left(r_{i j}\right)\right]}}\ {{\displaystyle X_{i j}=\sum_{k=i_{1},k\neq j}^{i N}W_{I K}\left(r_{i k}\right)\cdot G_{J I K}\left(\cos\theta_{j i k}\right)\cdot P_{J I K}\left(\Delta r_{j i k}\right)}}\ {{\displaystyle\sum_{j i k}=r_{i j}-\xi_{I J}\cdot r_{i k}}}\end{array}
$$  

where I, J, K represent species of atoms i, j, and $\mathbf{k},i_{1},...,i_{N}$ represents a list of $i$ ‘s neighbors, $\delta_{i j}$ is a Dirac constant (i.e., $\delta_{i j}=1$ when $i=j$ , and $\delta_{i j}=0$ otherwise), $\eta_{i j}$ is similar constant that can be set either to $\eta_{i j}=\delta_{i j}$ or $\eta_{i j}=1-\delta_{i j}$ depending on the potential type, $U_{I J}(r_{i j}),V_{I J}(r_{i j}),W_{I K}(r_{i k})$ are pair functions, $G_{J I K}(\cos\theta_{j i k})$ is an angular function, $P_{J I K}(\Delta r_{j i k})$ is a function of atomic spacing differential $\Delta r_{j i k}=r_{i j}-\xi_{I J}\cdot r_{i k}$ with $\xi_{I J}$ being a pair-dependent parameter, and $F_{I J}(X_{i j})$ is a function of the local environment variable $X_{i j}$ . This generic potential is fully defined once the constants $\eta_{i j}$ and $\xi_{I J}$ , and the six functions $U_{I J}(r_{i j})$ , $V_{I J}(r_{i j})$ , $W_{I K}(r_{i k})$ , $G_{J I K}(\cos\theta_{j i k})$ , $P_{J I K}(\Delta r_{j i k})$ , and $F_{I J}(X_{i j})$ are given. Here LAMMPS uses a global parameter $\eta$ to represent $\eta_{i j}$ . When $\eta=1$ , $\eta_{i j}=1-\delta_{i j}$ , otherwise $\eta_{i j}=\delta_{i j}$ . Additionally, $\eta=3$ indicates that the function $P_{J I K}(\Delta r)$ depends on species I, J and K, otherwise $P_{J I K}(\Delta r)=P_{I K}(\Delta r)$ only depends on species I and K. Note that these six functions are all one dimensional, and hence can be provided in a tabular form. This allows users to design different potentials solely based on a manipulation of these functions. For instance, the potential reduces to a Stillinger-Weber potential (SW ) if we set  

$$
\begin{array}{c}{{\begin{array}{c}{{\begin{array}{c}{{\eta_{i j}=\delta_{i j}(\eta=2\sigma r\eta=0),\zeta_{j l}=0,}}\ {{U_{l j}=\delta_{i j}\cdot\varepsilon_{l j}\cdot\left(\frac{\sigma_{l j}}{r}\right)^{q}\cdot\left[B_{l l}\cdot\left(\frac{\sigma_{l j}}{r}\right)^{p-q}-1\right]\cdot\varepsilon x p\left(\frac{\sigma_{l j}}{r-a_{l j}\cdot\sigma_{l j}}\right)}}\ {{V_{l j}=\sqrt{\lambda_{i j}\cdot\varepsilon_{l j}}\cdot\epsilon_{l j}\left(\frac{\gamma_{l j}\cdot\sigma_{l j}}{r-a_{l j}\cdot\sigma_{l j}}\right)}}\end{array}}}\ {{\begin{array}{c}{{F_{l j}(X)=-X}}\ {{F_{l l}(X)=-X}}\ {{P_{l j}(R)=r\uparrow}}\ {{W_{l j}=\sqrt{\lambda_{i j}\cdot\varepsilon_{l j}}\cdot\epsilon\cdot x p\left(\frac{\gamma_{l j}\cdot\sigma_{l j}}{r-a_{l j}\cdot\sigma_{l j}}\right)}}\end{array}}}\ {{\begin{array}{c}{{\begin{array}{c}{{\scriptstyle{W_{l j}=\sqrt{\lambda_{i j}\cdot\varepsilon_{l j}}}}\ {{W_{l j}=\sqrt{\lambda_{i j}\cdot\varepsilon_{l j}}}\cdot\sigma_{l j}}\end{array}}}\ {{W_{l j}\wedge\left(r\right)=\sqrt{\lambda_{i j}\cdot\varepsilon_{l j}}\cdot\epsilon\cdot x p\left(\frac{\gamma_{l j}\cdot\sigma_{l j}}{r-a_{l j}\cdot\sigma_{l j}}\right)}}\end{array}}}\ {{G_{l l}\wedge\left(\cos\theta\right)=\left(\cos\theta+\frac{1}{3}\right)^{2}}}\end{array}
$$  

The potential reduces to a Tersoff potential (Tersoff or Albe1) if we set  

$$
\begin{array}{r l}&{\quad\quad\eta_{i j}=\delta_{i j}(\eta=2\sigma r\eta=0),\xi_{l j}=1}\ &{\quad U_{l j}(r)=\displaystyle\frac{D_{e,l j}}{S_{l j}-1}\cdot\exp\left[-\beta_{l j}\sqrt{2S_{l j}}\left(r-r_{e,l j}\right)\right]\cdot f_{e,l j}\left(r\right)}\ &{\quad V_{l j}(r)=\displaystyle\frac{S_{l j}}{S_{l j}-1}\cdot\exp\left[-\beta_{l l}\sqrt{\displaystyle\frac{2}{S_{l j}}\left(r-r_{e,l j}\right)}\right]\cdot f_{e,l j}\left(r\right)}\ &{\quad F_{l j}(X)=(1+X)^{-\frac{1}{2}}}\ &{\quad P_{l k}(\Delta r)=P_{l k}(\Delta r)=e x p\left(2\mu_{l k}\cdot\Delta r\right)}\ &{\quad W_{l j}\left(r\right)=f_{e,l j}\left(r\right)}\ &{\quad G_{j k}\left(\cos\theta\right)=\displaystyle\gamma_{t k}\left[1+\frac{c_{l k}^{2}}{d_{k}^{2}}-\frac{c_{l k}^{2}}{d_{k}^{2}+(h_{l k}+\cos\theta)^{2}}\right]}\end{array}
$$  

where  

$$
f_{c,I J}\left(r\right)=\left\{\begin{array}{l}{1,r\leq R_{I J}-D_{I J}}\ {\frac{1}{2}+\frac{1}{2}c o s\left[\frac{\pi\left(r+D_{I J}-R_{I J}\right)}{2D_{I J}}\right],R_{I J}-D_{I J}<r<R_{I J}+D_{I J}}\ {0,r\geq R_{I J}+D_{I J}}\end{array}\right.
$$  

The potential reduces to a modified Stillinger-Weber potential (Zhou3) if we set  

$$
\begin{array}{c}{{\eta_{i j}=\delta_{i j}(\eta=2{\it o r}\eta=0),\xi_{I J}=0}}\ {{}}\ {{{\cal U}_{I J}(r)=\varphi_{R,I J}(r)-\varphi_{A,I J}(r)}}\ {{}}\ {{{\cal V}_{I J}(r)=u_{I J}(r)}}\ {{}}\ {{{\cal F}_{I J}(X)=-X}}\ {{}}\ {{{\cal P}_{J I K}\left(\Delta r\right)={\cal P}_{I K}\left(\Delta r\right)=1}}\ {{}}\ {{{\cal W}_{I J}(r)=u_{I J}(r)}}\ {{}}\ {{\vdots{\cal J}_{I K}\left(\cos\theta\right)=g_{J I K}\left(\cos\theta\right)}}\end{array}
$$  

The potential reduces to a Rockett-Tersoff potential (Wang3) if we set  

$$
\begin{array}{r l}&{\quad\eta_{i j}=\delta_{i j}(\eta=2\sigma r\eta=0),\xi_{i J}=1}\ &{U_{l J}\left(r\right)=A_{l J}e x p\left(-\lambda_{1,l J}\cdot r\right)f_{c,l J}\left(r\right)f_{c,a,l J}\left(r\right)}\ &{V_{l J}\left(r\right)=\left\{\begin{array}{l l}{B_{l J}e x p\left(-\lambda_{2,l J}\cdot r\right)f_{c,l J}\left(r\right)+}\ {A_{l J}e x p\left(-\lambda_{1,l J}\cdot r\right)f_{c,l J}\left(r\right)\left[1-f_{c a,l J}\left(r\right)\right]}\end{array}\right\}}\ &{F_{l J}\left(X\right)=\left[1+\left(\beta_{l J}X\right)^{m_{l J}}\right]^{-\frac{1}{2u_{l J}}}}\ &{P_{l J K}\left(\Delta r\right)=P_{l K}\left(\Delta r\right)=e x p\left(\lambda_{3,l K}\cdot\Delta r^{3}\right)}\ &{W_{l J}\left(r\right)=f_{c,l J}\left(r\right)}\ &{G_{l K}\left(\cos\theta\right)=1+\frac{C_{l K}^{2}}{d_{l K}^{2}}-\frac{c_{l K}^{2}}{d_{l K}^{2}+\left(h_{l K}+\cos\theta\right)^{2}}}\end{array}
$$  

where $f_{c a,I J}(r)$ is similar to the $f_{c,I J}(r)$ defined above:  

$$
f_{c a,I J}\left(r\right)=\left\{\begin{array}{l l}{1,r\leq R_{a,I J}-D_{a,I J}}\ {\frac{1}{2}+\frac{1}{2}c o s\left[\frac{\pi\left(r+D_{a,I J}-R_{a,I J}\right)}{2D_{a,I J}}\right],R_{a,I J}-D_{a,I J}<r<R_{a,I J}+D_{a,I J}}\ {0,r\geq R_{a,I J}+D_{a,I J}}\end{array}\right.
$$  

The potential becomes the embedded atom method $(D a w)$ if we set  

$$
\begin{array}{c}{{\eta_{i j}=1-\delta_{i j}(\eta=1),\xi_{I J}=0}}\ {{}}\ {{U_{I J}(r)=\phi_{I J}(r)}}\ {{}}\ {{V_{I J}(r)=1}}\ {{}}\ {{F_{I I}(X)=-2F_{I}(X)}}\ {{}}\ {{P_{J I K}\left(\Delta r\right)=P_{I K}\left(\Delta r\right)=1}}\ {{}}\ {{W_{I J}\left(r\right)=f_{J}\left(r\right)}}\ {{}}\ {{G_{J I K}\left(\cos\theta\right)=1}}\end{array}
$$  

In the embedded atom method case, $\phi_{I J}(r)$ is the pair energy, $F_{I}(X)$ is the embedding energy, $X$ is the local electron density, and $f_{J}(\boldsymbol{r})$ is the atomic electron density function.  

The potential reduces to another type of Tersoff potential (Zhou4) if we set  

$$
\begin{array}{r l}&{\quad\eta_{i}=\delta_{i}(\eta=3),\xi,\eta=1}\ &{\quad U_{i j}(r)=\displaystyle\frac{D_{i j}}{\delta U_{i j}}\cdot\pi^{\prime}P\left[-\beta_{i j}\sqrt{2S_{i j}}\left(r-r_{e,i j}\right)\right]\cdot f_{e,i j}(r)\cdot\tau_{j i}(r)+V_{2i}\pi_{i,j}(r)[1-T_{i j}(r)]}\ &{\quad V_{i j}(r)=\displaystyle\frac{S_{i j}}{\delta U_{i j}-1}\cdot\tau_{i\ell}\sim\left[-\beta_{i j}\sqrt{\displaystyle\frac{2}{S_{i j}}}\left(r-r_{e,i j}\right)\right]\cdot f_{e,i j}(r)\cdot T_{i j}(r)}\ &{\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad}\ &{\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad}\ &{\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad}\ &{\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad}\ &{\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad}\ &{\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad}\ &{\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad
$$  

where $f_{c,I J}(r)$ is the same as defined above. This Tersoff potential differs from the one above because the $P_{J I K}(\Delta r)$ function is now dependent on all three species I, J, and K.  

If the tabulated functions are created using the parameters of Stillinger-Weber, Tersoff, and EAM potentials, the polymorphic pair style will produce the same global properties (energies and stresses) and the same forces as the sw, tersoff , and eam pair styles. The polymorphic pair style also produces the same per-atom properties (energies and stresses) as the corresponding tersoff and eam pair styles. However, due to a different partitioning of global properties to per-atom properties, the polymorphic pair style will produce different per-atom properties (energies and stresses) as the $s w$ pair style. This does not mean that polymorphic pair style is different from the sw pair style. It just means that the definitions of the atom energies and atom stresses are different.  

Only a single pair_coeff command is used with the polymorphic pair style which specifies a potential file for all needed elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of polymorphic potential elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file. Several files for polymorphic potentials are included in the potentials directory of the LAMMPS distribution. They have a “poly” suffix.  

As an example, imagine the GaN_tersoff.poly file has tabulated functions for Ga-N tersoff potential. If your LAMMPS simulation has 4 atom types and you want the first 3 to be Ga, and the fourth to be N, you would use the following pair_coeff command:  

pair_coeff \* \* GaN_tersoff.poly Ga Ga Ga N  

The first two arguments must be $^{**}$ to span all pairs of LAMMPS atom types. The first three Ga arguments map LAMMPS atom types 1,2,3 to the Ga element in the polymorphic file. The final N argument maps LAMMPS atom type 4 to the N element in the polymorphic file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when an polymorphic potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Potential files in the potentials directory of the LAMMPS distribution have a “.poly” suffix. At the beginning of the files, an unlimited number of lines starting with ‘#’ are used to describe the potential and are ignored by LAMMPS. The next line lists two numbers:  

The next ntypes $\ddot{\mathfrak{N P e s}}(\mathrm{ntypes}+1)/2$ lines contain two numbers:  

cut xi(1)   
cut xi(2)   
cut $\mathrm{xi(ntypes^{*}(n t y p e s{+}1)/2)}$  

Here cut means the cutoff distance of the pair functions, “xi” is $\xi$ as defined in the potential functions above. The ntypes $^{*}(\mathrm{ntypes}{+}1)/2$ lines are related to the pairs according to the sequence of first ii (self) pairs, $\mathrm{i}=1$ , 2, . . . , ntypes, and then ij (cross) pairs, $\mathrm{i}=1,2,\ldots$ , ntypes-1, and $\mathrm{j}=\mathrm{i}{+}1$ , $_{\mathrm{i}+2}$ , . . . , ntypes (i.e., the sequence of the ij pairs follows 11, $22,...,12,13,14,...,23,24,...)$ .  

In the final blocks of the potential file, U, V, W, P, G, and F functions are listed sequentially. First, U functions are given for each of the ntypes $\ddot{{}}(\mathrm{ntypes}{}+1)/2$ pairs according to the sequence described above. For each of the pairs, nr values are listed. Next, similar arrays are given for V and W functions. If P functions depend only on pair species, i.e., $\eta\neq3$ , then P functions are also listed the same way the next. If P functions depend on three species, i.e., $\eta=3$ , then P functions are listed for all the ntypes\*ntypes\*ntypes IJK triplets in a natural sequence I from 1 to ntypes, J from 1 to ntypes, and K from 1 to ntypes (i.e., $\mathrm{{IJK}}=111$ , 112, 113, . . . , 121, 122, 123 . . . , 211, 212, . . . ). Next, G functions are listed for all the ntypes\*ntypes\*ntypes IJK triplets similarly. For each of the G functions, ntheta values are listed. Finally, F functions are listed for all the ntypes $^{*}(\mathrm{ntypes}{+}1)/2$ pairs in the same sequence as described above. For each of the F functions, nx values are listed.  

# 4.228.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

# 4.228.5 Restrictions  

If using create_atoms command, atomic masses must be defined in the input script. If using read_data, atomic masses must be defined in the atomic structure data file.  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair potential requires the newton setting to be “on” for pair interactions.  

The potential files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use any LAMMPS units, but you would need to create your own potential files.  

# 4.228.6 Related commands  

pair_coeff  

(Zhou3) X. W. Zhou, M. E. Foster, R. E. Jones, P. Yang, H. Fan, and F. P. Doty, J. Mater. Sci. Res., 4, 15 (2015).   
(Zhou4) X. W. Zhou, M. E. Foster, J. A. Ronevich, and C. W. San Marchi, J. Comp. Chem., 41, 1299 (2020).   
(SW) F. H. Stillinger, and T. A. Weber, Phys. Rev. B, 31, 5262 (1985).   
(Tersoff) J. Tersoff, Phys. Rev. B, 39, 5566 (1989).   
(Albe1) K. Albe, K. Nordlund, J. Nord, and A. Kuronen, Phys. Rev. B, 66, 035205 (2002).   
(Wang) J. Wang, and A. Rockett, Phys. Rev. B, 43, 12571 (1991).   
(Daw) M. S. Daw, and M. I. Baskes, Phys. Rev. B, 29, 6443 (1984).  

# 4.229 pair_style python command  

# 4.229.1 Syntax  

cutof $=$ global cutoff for interactions in python potential classes  

# 4.229.2 Examples  

pair_style python 2.5   
pair_coeff \* \* py_pot.LJCutMelt lj   
pair_style python 10.0   
pair_coeff \* \* py_pot.HarmonicCut A B   
pair_style hybrid/overlay coul/long 12.0 python 12.0   
pair_coef f \* \* coul/long   
pair_coeff \* \* python py_pot.LJCutSPCE OW NULL  

# 4.229.3 Description  

The python pair style provides a way to define pairwise additive potential functions as python script code that is loaded into LAMMPS from a python file which must contain specific python class definitions. This allows to rapidly evaluate different potential functions without having to modify and re-compile LAMMPS. Due to python being an interpreted language, however, the performance of this pair style is going to be significantly slower (often between $20\mathrm{x}$ and 100x) than corresponding compiled code. This penalty can be significantly reduced through generating tabulations from the python code through the pair_write command, which is supported by this style.  

Only a single pair_coeff command is used with the python pair style which specifies a python class inside a python module or a file that LAMMPS will look up in the current directory, a folder pointed to by the LAMMPS_POTENTIALS environment variable or somewhere in your python path. A single python module can hold multiple python pair class definitions. The class definitions itself have to follow specific rules that are explained below.  

Atom types in the python class are specified through symbolic constants, typically strings. These are mapped to LAMMPS atom types by specifying N additional arguments after the class name in the pair_coeff command, where N must be the number of currently defined atom types:  

As an example, imagine a file py_pot.py has a python potential class names LJCutMelt with parameters and potential functions for a two Lennard-Jones atom types labeled as ‘LJ1’ and ‘LJ2’. In your LAMMPS input and you would have defined 3 atom types, out of which the first two are supposed to be using the ‘LJ1’ parameters and the third the ‘LJ2’ parameters, then you would use the following pair_coeff command:  

pair_coeff \* \* py_pot.LJCutMelt LJ1 LJ1 LJ2  

The first two arguments must be \* \* so as to span all LAMMPS atom types. The first two LJ1 arguments map LAMMPS atom types 1 and 2 to the LJ1 atom type in the LJCutMelt class of the py_pot.py file. The final LJ2 argument maps LAMMPS atom type 3 to the LJ2 atom type the python file. If a mapping value is specified as NULL, the mapping is not performed, any pair interaction with this atom type will be skipped. This can be used when a python potential is used as part of the hybrid or hybrid/overlay pair style. The NULL values are then placeholders for atom types that will be used with other potentials.  

The python potential file has to start with the following code:  

from __future__ import print_function   
class LAMMPSPairPotential(object): def init__(self): self.pmap $\Longleftarrow$ dict() self.units='lj' def map_coeff(self,name,ltype): self.pmap[ltype]=name def check_units(self,units): if (units $!=$ self.units): raise Exception("Conflicting units: %s vs. %s" % (self.units,units))  

Any classes with definitions of specific potentials have to be derived from this class and should be initialize in a similar fashion to the example given below.  

# Note  

The class constructor has to set up a data structure containing the potential parameters supported by this class. It should also define a variable self.units containing a string matching one of the options of LAMMPS’ units command, which is used to verify, that the potential definition in the python class and in the LAMMPS input match.  

Here is an example for a single type Lennard-Jones potential class LJCutMelt in reduced units, which defines an atom type $l j$ for which the parameters epsilon and sigma are both 1.0:  

class LJCutMelt(LAMMPSPairPotential): def _ init (self): super(LJCutMelt,self)._ init__() # set coeffs: 48\*eps\*sig\*\*12, 24\*eps\*sig\*\*6, # 4\*eps\*sig\*\*12, 4\*eps\*sig\*\*6 self.units = 'lj' self.coeff = {'lj' : {'lj' : (48.0,24.0,4.0,4.0)}}  

The class also has to provide two methods for the computation of the potential energy and forces, which have be named compute_force, and compute_energy, which both take 3 numerical arguments:  

• $\mathbf{rsq}=$ the square of the distance between a pair of atoms (float) • itype $=$ the (numerical) type of the first atom • jtype $=$ the (numerical) type of the second atom  

This functions need to compute the (scaled) force and the energy, respectively, and use the result as return value. The functions need to use the pmap dictionary to convert the LAMMPS atom type number to the symbolic value of the internal potential parameter data structure. Following the LJCutMelt example, here are the two functions:  

ef compute_force(self,rsq,itype,jtype): coeff $=$ self.coeff[self.pmap[itype]][self.pmap[jtype]] $\mathrm{r2inv}=1.0/\mathrm{rsq}$ $\mathrm{r6inv}=\mathrm{r2inv^{*}r2i n v^{*}r2i n v}$ $\mathrm{lj1}=\mathrm{coeff}[0]$ $\mathrm{lj}2=\mathrm{coeff}[1]$ return (r6inv \* (lj1\*r6inv - lj2))\*r2inv  

def compute_energy(self,rsq,itype,jtype):  

(continues on next page)  

(continued from previous page)  

coeff = self.coeff[self.pmap[itype]][self.pmap[jtype]]   
r2inv = 1.0/rsq   
r6inv = r2inv\*r2inv\*r2inv   
lj3 = coeff[2]   
lj4 = coeff[3]   
return (r6inv \* (lj3\*r6inv - lj4))  

![](images/8877d2652c50c71a8cad8ab87151159dd4308549378baefa29af1a2a2e70afad.jpg)  

# Note  

for consistency with the $\mathrm{C}{+}{+}$ pair styles in LAMMPS, the compute_force function follows the conventions of the Pair::single() methods and does not return the pairwise force directly, but the force divided by the distance between the two atoms, so this value only needs to be multiplied by delta x, delta y, and delta z to conveniently obtain the three components of the force vector between these two atoms.  

Below is a more complex example using real units and defines an interaction equivalent to:  

units real pair_style harmonic/cut pair_coeff 1 1 0.2 9.0 pair_coeff 2 2 0.4 9.0  

This uses the default geometric mixing. The equivalent input with pair style python is:  

<html><body><table><tr><td>units real</td><td></td></tr><tr><td>pair style python 10.0</td><td></td></tr><tr><td>pair r_coeff **</td><td>py _pot.Harmonic A B</td></tr></table></body></html>  

Note that while for pair style harmonic/cut the cutoff is implicitly set to the minimum of the harmonic potential, for pair style python a global cutoff must be set and it must be equal or larger to the implicit cutoff of the potential in python, which has to explicitly return zero force and energy beyond the cutoff. Also, the mixed parameters have to be explicitly provided. The corresponding python code is:  

class Harmonic(LAMMPSPairPotential): def __init__(self): super(Harmonic,self).__init__() self.units = 'real' # set coeffs: K, r0 $\begin{array}{r l}{\mathrm{self.coeff}=\{\mathrm{A}^{\dagger}\mathrm{A}^{\dagger}:\{^{\uparrow}\mathrm{A}^{\dagger}:(0.2,9.0),}&{}\ {\mathrm{B}^{\uparrow}:(\mathrm{math.sqrt}(0.2^{*}0.4),9.0)\}}\ {\mathrm{B}^{\uparrow}:\{^{\uparrow}\mathrm{A}^{\uparrow}:(\mathrm{math.sqrt}(0.2^{*}0.4),9.0),}&{}\ {\mathrm{B}^{\uparrow}:\{^{\uparrow}\mathrm{A}^{\uparrow}:(0.4,9.0)\}\}}&{}\end{array}$ , def compute_force(self,rsq,itype,jtype): coeff = self.coeff[self.pmap[itype]][self.pmap[jtype]] r = math.sqrt(rsq) delta = coeff[1]-r if $\mathrm{(r<coeff|1|}$ ): return 2.0\*delta\*coeff[0]/r else: return 0.0  

(continues on next page)  

(continued from previous page)  

def compute_energy(self,rsq,itype,jtype): coeff $=$ self.coeff[self.pmap[itype]][self.pmap[jtype]] $\mathrm{~r~}=$ math.sqrt(rsq) delta = coeff[1]-r if (r < coeff[1]): return delta\*delta\*coeff[0] else: return 0.0  

# Performance Impact  

The evaluation of scripted python code will slow down the computation of pairwise interactions quite significantly. However, this performance penalty can be worked around through using the python pair style not for the actual simulation, but to generate tabulated potentials using the pair_write command. This will also enable GPU or multithread acceleration through the GPU, KOKKOS, or OPENMP package versions of the table pair style. Please see below for a LAMMPS input example demonstrating how to build a table file:  

pair_style python 2.5   
pair_coeff \* \* py_pot.LJCutMelt lj   
shell rm -f lj.table   
pair_write 1 1 2000 rsq 0.01 2.5 lj.table lj  

Note that it is strongly recommended to try to delete the potential table file before generating it. Since the pair_write command will always append to a table file, while pair style table will use the first match. Thus when changing the potential function in the python class, the table pair style will still read the old variant unless the table file is first deleted.  

After switching the pair style to table, the potential tables need to be assigned to the LAMMPS atom types like this:  

<html><body><table><tr><td>pair style</td><td>table linear 2000</td><td></td></tr><tr><td>pair coeff</td><td>1 1 lj.table lj</td><td></td></tr></table></body></html>  

This can also be done for more complex systems. Please see the examples/python folders for a few more examples.  

# 4.229.4 Mixing, shift, table, tail correction, restart, rRESPA info  

Mixing of potential parameters has to be handled inside the provided python module. The python pair style simply assumes that force and energy computation can be correctly performed for all pairs of atom types as they are mapped to the atom type labels inside the python potential class.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.229.5 Restrictions  

This pair style is part of the PYTHON package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.229.6 Related commands  

pair_coeff , pair_write, pair style table  

# 4.229.7 Default  

none  

# 4.230 pair_style quip command  

# 4.230.1 Syntax  

# 4.230.2 Examples  

<html><body><table><tr><td>pair</td><td>style</td><td>quip</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>** gap.</td><td colspan="3">example.xml 1 "Potential xml label=GAP 20145_8_6017_1038466″ 14</td></tr><tr><td>pair</td><td>_coeff</td><td>**</td><td colspan="3">SW6 example.xml "IP SW" 14</td></tr></table></body></html>  

# 4.230.3 Description  

Style quip provides an interface for calling potential routines from the QUIP package. QUIP is built separately, and then linked to LAMMPS. The most recent version of the QUIP package can be downloaded from GitHub: https: //github.com/libAtoms/QUIP. The interface is chiefly intended to be used to run Gaussian Approximation Potentials (GAP), which are described in the following publications: (Bartok et al) and (PhD thesis of Bartok).  

Only a single pair_coeff command is used with the quip style that specifies a QUIP potential file containing the parameters of the potential for all needed elements in XML format. This is followed by a QUIP initialization string. Finally, the QUIP elements are mapped to LAMMPS atom types by specifying N atomic numbers, where N is the number of LAMMPS atom types:  

• QUIP filename   
• QUIP initialization string   
• N atomic numbers $=$ mapping of QUIP elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

A QUIP potential is fully specified by the filename which contains the parameters of the potential in XML format, the initialization string, and the map of atomic numbers.  

GAP potentials can be obtained from the GAP models and databases page on the libAtoms homepage \`https://libatoms.github.io, where the appropriate initialization strings are also advised. The list of atomic numbers must be matched to the LAMMPS atom types specified in the LAMMPS data file or elsewhere.  

Two examples input scripts are provided in the examples/PACKAGES/quip directory.  

# 4.230.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.230.5 Restrictions  

This pair style is part of the ML-QUIP package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

QUIP potentials are parameterized in electron-volts and Angstroms and therefore should be used with LAMMPS metal units.  

QUIP potentials are generally not designed to work with the scaling factors set by the special_bonds command. The recommended setting in molecular systems is to include all interactions, i.e. to use special_bonds lj/coul 1.0 1.0 1.0. Scaling factors $>0.0$ will be ignored and treated as 1.0. The only exception to this rule is if you know that your QUIP potential needs to exclude bonded, 1-3, or 1-4 interactions and does not already do this exclusion within QUIP. Then a factor 0.0 needs to be used which will remove such pairs from the neighbor list. This needs to be very carefully tested, because it may remove pairs from the neighbor list that are still required.  

# 4.230.6 Related commands  

pair_coeff  

(Bartok2010) AP Bartok, MC Payne, R Kondor, and G Csanyi, Physical Review Letters 104, 136403 (2010).   
(Bartok_PhD) A Bartok-Partay, PhD Thesis, University of Cambridge, (2010).  

# 4.231 pair_style rann command  

# 4.231.1 Syntax  

pair_style rann pair_coeff file Type1_element Type2_element Type3_element...  

# 4.231.2 Examples  

pair_style rann   
pair_coeff \* \* Mg.rann Mg   
pair_coeff \* \* MgAlalloy.rann Mg Mg Al Mg  

# 4.231.3 Description  

Pair style rann computes pairwise interactions for a variety of materials using rapid atomistic neural network (RANN) potentials (Dickel , Nitol). Neural network potentials work by first generating a series of symmetry functions i.e. structural fingerprints from the neighbor list and then using these values as the input layer of a neural network. There is a single output neuron in the final layer which is the energy. Atomic forces are found by analytical derivatives computed via back-propagation. For alloy systems, each element has a unique network.  

# 4.231.4 Potential file syntax  

The RANN potential is defined by a single text file which contains all the fitting parameters for the alloy system. The potential file also defines the active fingerprints, network architecture, activation functions, etc. The potential file is divided into several sections which are identified by one of the following keywords:  

• atomtypes   
• mass   
• fingerprintsperelement   
• fingerprints   
• fingerprintconstants   
• screening (optional)   
• networklayers   
• layersize   
• weight   
• bias   
• activationfunctions   
• calibrationparameters (ignored)  

The ‘#’ character is treated as a comment marker, similar to LAMMPS input scripts. Sections are not required to follow a rigid ordering, but do require previous definition of prerequisite information. E.g., fingerprintconstants for a particular fingerprint must follow the fingerprints definition; layersize for a particular layer must follow the declaration of network layers.  

atomtypes are defined as follows using element keywords separated by spaces.  

<html><body><table><tr><td>atomtypes:</td></tr><tr><td>Fe Mg Al etc.</td></tr></table></body></html>  

mass must be specified for each element keyword as follows:  

<html><body><table><tr><td>mass:Mg:</td><td></td></tr><tr><td>24.305</td><td></td></tr><tr><td>mass:Fe:</td><td></td></tr><tr><td>55.847</td><td></td></tr><tr><td>mass:Al:</td><td></td></tr><tr><td>26.982</td><td></td></tr></table></body></html>  

fingerprintsperelement specifies how many fingerprints are active for computing the energy of a given atom. This number must be specified for each element keyword. Active elements for each fingerprint depend upon the type of the central atom and the neighboring atoms. Pairwise fingerprints may be defined for a Mg atom based exclusively on its Al neighbors, for example. Bond fingerprints may use two neighbor lists of different element types. In computing fingerprintsperelement from all defined fingerprints, only the fingerprints defined for atoms of a particular element should be considered, regardless of the elements used in its neighbor list. In the following code, for example, some fingerprints may compute pairwise fingerprints summing contributions about Fe atoms based on a neighbor list of exclusively Al atoms, but if there are no fingerprints summing contributions of all neighbors about a central Al atom, then fingerprintsperelement of Al is zero:  

(continues on next page)  

(continued from previous page)  

fingerprintsperelement:Fe: 2   
fingerprintsperelement:Al: 0  

fingerprints specifies the active fingerprints for a certain element combination. Pair fingerprints are specified for two elements, while bond fingerprints are specified for three elements. Only one fingerprints header should be used for an individual combination of elements. The ordering of the fingerprints in the network input layer is determined by the order of element combinations specified by subsequent fingerprints lines, and the order of the fingerprints defined for each element combination. Multiple fingerprints of the same style or different ones may be specified. If the same style and element combination is used for multiple fingerprints, they should have different id numbers. The first element specifies the atoms for which this fingerprint is computed while the other(s) specify which atoms to use in the neighbor lists for the computation. Switching the second and third element type in bond fingerprints has no effect on the computation:  

fingerprints:Mg_Mg:   
radial_0 radialscreened_0 radial_1   
fingerprints:Mg_Al_Fe:   
bond_0 bondspin_0   
fingerprints:Mg_Al:   
radial_0 radialscreened_0  

The following fingerprint styles are currently defined. See the formulation section below for their definitions:  

• radial   
• radialscreened   
• radialspin   
• radialscreenedspin   
• bond   
• bondscreened   
• bondspin   
• bondscreenedspin  

fingerprintconstants specifies the meta-parameters for a defined fingerprint. For all radial styles, re, rc, alpha, dr, o, and n must be specified. re should usually be the stable interatomic distance, rc is the cutoff radius, dr is the cutoff smoothing distance, o is the lowest radial power term (which may be negative), and n is the highest power term. The total length of the fingerprint vector is $(\mathrm{n}{-}0{+}1)$ ). alpha is a list of decay parameters used for exponential decay of radial contributions. It may be set proportionally to the bulk modulus similarly to MEAM potentials, but other values may provided better fitting in special cases. Bond style fingerprints require specification of re, rc, alphak, dr, $\mathbf{k}$ , and m. Here m is the power of the bond cosines and k is the number of decay parameters. Cosine powers go from 0 to $\mathrm{m}{-}1$ and are each computed for all values of alphak. Thus the total length of the fingerprint vector is $\mathrm{m}^{*}\mathrm{k}$ .  

fingerprintconstants:Mg_Mg:radialscreened_0:re:   
3.193592   
fingerprintconstants:Mg_Mg:radialscreened_0:rc:   
6.000000   
fingerprintconstants:Mg_Mg:radialscreened_0:alpha:   
5.520000 5.520000 5.520000 5.520000 5.520000   
fingerprintconstants:Mg_Mg:radialscreened_0:dr:   
2.806408  

(continues on next page)  

(continued from previous page)  

<html><body><table><tr><td>fingerprintconstants:Mg_Mg:radialscreened_O:o: -1</td></tr><tr><td>fingerprintconstants:Mg__Mg:radialscreened_O:n:</td></tr></table></body></html>  

screening specifies the Cmax and Cmin values used in the screening fingerprints. Contributions form neighbors to the fingerprint are omitted if they are blocked by a closer neighbor, and reduced if they are partially blocked. Larger values of Cmin correspond to neighbors being blocked more easily. Cmax cannot be greater than 3, and Cmin cannot be greater than Cmax or less than zero. Screening may be omitted in which case the default values $\operatorname{Cmax}=2.8$ , Cmin $=0.8$ are used. Since screening is a bond computation, it is specified separately for each combination of three elements in which the latter two may be interchanged with no effect.  

<html><body><table><tr><td>screening:Mg_Mg _Mg:Cmax:</td></tr><tr><td>2.700000</td></tr><tr><td>screening:Mg_Mg _Mg:Cmin:</td></tr><tr><td>0.400000</td></tr></table></body></html>  

networklayers species the size of the neural network for each atom. It counts both the input and output layer and so is $^{2+}$ <hidden layers>.  

<html><body><table><tr><td>networklayers:Mg: 3</td></tr></table></body></html>  

layersize specifies the length of each layer, including the input layer and output layer. The input layer is layer 0. The size of the input layer size must match the summed length of all the fingerprints for that element, and the output layer size must be 1:  

<html><body><table><tr><td>layersize:Mg:0:</td><td></td></tr><tr><td>14</td><td></td></tr><tr><td>layersize:Mg: 1:</td><td></td></tr><tr><td>20</td><td></td></tr><tr><td>layersize:Mg:2:</td><td></td></tr><tr><td>1</td><td></td></tr></table></body></html>  

weight specifies the weight for a given element and layer. Weight cannot be specified for the output layer. The weight of layer i is a m x n matrix where $m$ is the layer size of $i$ and $n$ is the layer size of $i{+}1$ :  

<html><body><table><tr><td>weight:Mg:0:</td></tr><tr><td>w11w12w13</td></tr><tr><td></td></tr><tr><td>w21w22w23</td></tr></table></body></html>  

bias specifies the bias for a given element and layer. Bias cannot be specified for the output layer. The bias of layer i is a nx1 vector where n is the layer size of $_{\mathrm{i}+1}$ :  

<html><body><table><tr><td>bias:Mg:0:</td></tr><tr><td>bl</td></tr><tr><td>b2</td></tr><tr><td>b3</td></tr><tr><td></td></tr></table></body></html>  

activationfunctions specifies the activation function for a given element and layer. Activation functions cannot be specified for the output layer:  

activationfunctions:Mg:0: sigI   
activationfunctions:Mg:1: linear  

The following activation styles are currently specified. See the formulation section below for their definitions.  

• linear  

calibrationparameters specifies a number of parameters used to calibrate the potential. These are ignored by LAMMPS.  

# 4.231.5 Formulation  

In the RANN formulation, the total energy of a system of atoms is given by:  

$$
E=\sum_{\alpha}E^{\alpha}
$$  

$$
E^{\alpha}=^{N}A^{\alpha}
$$  

$$
{}^{n+1}A_{i}^{\alpha}={}^{n}F\left({}^{n}W_{i j}{}^{n}A_{j}^{\alpha}+{}^{n}B_{i}\right)
$$  

$$
^{0}{\cal A}_{i}^{\alpha}=\left[\begin{array}{c}{{^{1}S f^{\alpha}}}\ {{^{2}S f^{\alpha}}}\ {{\cdots}}\end{array}\right]
$$  

Here $E^{\alpha}$ is the energy of atom $\alpha,{}^{n}F(),{}^{n}W_{i j}$ and ${}^{n}B_{i}$ are the activation function, weight matrix and bias vector of the $\mathbf{n}$ -th layer respectively. The inputs to the first layer are a collection of structural fingerprints which are collected and reshaped into a single long vector. The individual fingerprints may be defined in any order and have various shapes and sizes. Multiple fingerprints of the same type and varying parameters may also be defined in the input layer.  

Eight types of structural fingerprints are currently defined. In the following, $\beta$ and $\gamma$ span the full neighbor list of atom $\alpha$ . $\delta_{i}$ are decay meta-parameters, and $r_{e}$ is a meta-parameter roughly proportional to the first neighbor distance. $r_{c}$ and $d r$ are the neighbor cutoff distance and cutoff smoothing distance respectively. $S^{\alpha\beta}$ is the MEAM screening function (Baskes), $s_{i}^{\alpha}$ and $s_{i}^{\beta}$ are the atom spin vectors (Tranchida). $r^{\alpha\beta}$ is the distance from atom $\alpha$ to atom $\beta$ , and $\theta^{\alpha\beta\gamma}$ is the bond angle:  

$$
c o s\left(\theta^{\alpha\beta\gamma}\right)=\frac{\mathbf{r}^{\alpha\beta}\cdot\mathbf{r}^{\alpha\gamma}}{r^{\alpha\beta}r^{\alpha\gamma}}
$$  

$S^{\alpha\beta}$ is defined as (Baskes):  

$$
X^{\gamma\beta}=\left(\frac{r^{\gamma\beta}}{r^{\alpha\beta}}\right)^{2}
$$  

$$
X^{\alpha\gamma}=\left({\frac{r^{\alpha\gamma}}{r^{\alpha\beta}}}\right)^{2}
$$  

$$
C=\frac{2\left(X^{\alpha\gamma}+X^{\gamma\beta}\right)-\left(X^{\alpha\gamma}-X^{\gamma\beta}\right)^{2}-1}{1-\left(X^{\alpha\gamma}-X^{\gamma\beta}\right)^{2}}
$$  

$$
f_{c}(x)=\left[\begin{array}{l}{1~x\geq1}\ {\left(1-(1-x)^{4}\right)^{2}~0<x<1}\ {0~x\leq0}\end{array}\right.
$$  

$$
S^{\alpha\beta\gamma}=f_{c}\left(\frac{C-C_{m i n}}{C_{m a x}-C_{m i n}}\right)
$$  

$$
S^{\alpha\beta}=\prod_{\gamma}S^{\alpha\beta\gamma}
$$  

The structural fingerprints are computed as follows:  

• radial  

$$
^{r}S f_{i}^{\alpha}=\sum_{\beta}\left(\frac{r^{\alpha\beta}}{r_{e}}\right)^{i}e^{-\delta_{i}\frac{r^{\alpha\beta}}{r_{e}}}f_{c}\left(\frac{r_{c}-r^{\alpha\beta}}{d r}\right)
$$  

• bond  

$$
^{b}S f_{i j}^{\alpha}=\sum_{\beta}\sum_{\gamma}\left(c o s(\theta_{\alpha\beta\gamma})\right)^{i}e^{-\delta_{j}\frac{r^{\alpha\beta}}{r_{e}}}e^{-\delta_{j}\frac{r^{\alpha\gamma}}{r_{e}}}f_{c}\left(\frac{r_{c}-r^{\alpha\beta}}{d r}\right)f_{c}\left(\frac{r_{c}-r^{\alpha\gamma}}{d r}\right)
$$  

• radialscreened  

$$
r s c{\mathrm{S}f_{i}^{\alpha}}=\sum_{\beta}\left(\frac{r^{\alpha\beta}}{r_{e}}\right)^{i}e^{-\delta_{i}\frac{r^{\alpha\beta}}{r_{e}}}S^{\alpha\beta}f_{c}\left(\frac{r_{c}-r^{\alpha\beta}}{d r}\right)
$$  

# • bondscreened  

$$
^{b s c}S f_{i j}^{\alpha}=\sum_{\beta}\sum_{\gamma}\left(c o s(\theta_{\alpha\beta\gamma})\right)^{i}e^{-\delta_{j}\frac{\pi\beta}{r_{c}}}e^{-\delta_{j}\frac{r\alpha\gamma}{r_{e}}}S^{\alpha\beta}S^{\alpha\gamma}f_{c}\left(\frac{r_{c}-r^{\alpha\beta}}{d r}\right)f_{c}\left(\frac{r_{c}-r^{\alpha\gamma}}{d r}\right)
$$  

• radialspin  

$$
^{r s p}{\cal S}f_{i}^{\alpha}=\sum_{\beta}\left(\frac{r^{\alpha\beta}}{r_{e}}\right)^{i}e^{-\delta_{i}\frac{r^{\alpha\beta}}{r_{e}}}\left({\bf s}^{\alpha}\cdot{\bf s}^{\beta}\right)f_{c}\left(\frac{r_{c}-r^{\alpha\beta}}{d r}\right)
$$  

• bondspin  

$$
b^{s p}S f_{i j}^{\alpha}=\sum_{\beta}\sum_{\gamma}\left(c o s(\theta_{\alpha\beta\gamma})\right)^{i}e^{-\delta_{j}\frac{\alpha\beta}{r_{c}}}e^{-\delta_{j}\frac{r\alpha\gamma}{r_{c}}}\left(\mathbf{s}^{\alpha}\cdot\mathbf{s}^{\beta}\right)\left(\mathbf{s}^{\alpha}\cdot\mathbf{s}^{\gamma}\right)f_{c}\left(\frac{r_{c}-r^{\alpha\beta}}{d r}\right)f_{c}\left(\frac{r_{c}-r^{\alpha\gamma}}{d r}\right)
$$  

• radialscreenedspin  

$$
r s c s p_{S f_{i}}\alpha=\sum_{\beta}\left(\frac{r^{\alpha\beta}}{r_{e}}\right)^{i}e^{-\delta_{i}\frac{r^{\alpha\beta}}{r_{e}}}S^{\alpha\beta}\left({\bf s}^{\alpha}\cdot{\bf s}^{\beta}\right)f_{c}\left(\frac{r_{c}-r^{\alpha\beta}}{d r}\right)
$$  

# • bondscreenedspin  

$$
b s c s p{S/f_{i j}^{\alpha}}=\sum_{\beta}\sum_{\gamma}\left(c o s(\theta_{\alpha\beta\gamma})\right)^{i}e^{-\delta_{j}\frac{\alpha\beta}{r_{c}}}e^{-\delta_{j}\frac{\alpha\gamma}{r_{c}}}S^{\alpha\beta}S^{\alpha\gamma}\left({\bf s}^{\alpha}\cdot{\bf s}^{\beta}\right)\left({\bf s}^{\alpha}\cdot{\bf s}^{\gamma}\right)f_{c}\left(\frac{r_{c}-r^{\alpha\beta}}{d r}\right)f_{c}\left(\frac{r_{c}-r^{\alpha\gamma}}{d r}\right)
$$  

The activation functions are computed as follows:  

sigI  

$$
F^{s i g I}(x)=0.1x+0.9l n\left(e^{x}+1\right)
$$  

• linear  

$$
F^{l i n e a r}(x)=x
$$  

# 4.231.6 Restrictions  

Pair style rann is part of the ML-RANN package. It is only enabled if LAMMPS was built with that package. Additionally, if any spin fingerprint styles are used LAMMPS must be built with the SPIN package as well.  

Pair style rann does not support computing per-atom stress or using pair_modify nofdotr.  

# 4.231.7 Defaults  

${\mathrm{Cmin}}=0.8 $ , $\mathrm{{Cmax}}=2.8\$ .  

(Baskes) Baskes, Materials Chemistry and Physics, 50(2), 152-158, (1997).  

(Dickel) Dickel, Francis, and Barrett, Computational Materials Science 171 (2020): 109157.  

(Nitol) Nitol, Dickel, and Barrett, Computational Materials Science 188 (2021): 110207.  

(Tranchida) Tranchida, Plimpton, Thibaudeau and Thompson, Journal of Computational Physics, 372, 406-425, (2018).  

# 4.232 pair_style reaxff command  

Accelerator Variants: reaxff/kk, reaxff/omp  

# 4.232.1 Syntax  

tabulate value $=$ size of interpolation table for Lennard-Jones and Coulomb interactions list/blocking value $=$ yes or no $=$ whether or not to use "blocking" scheme for bond list build  

# 4.232.2 Examples  

pair_style reaxff NULL pair_style reaxff controlfile checkqeq no pair_style reaxff NULL lgvdw yes pair_style reaxff NULL safezone 1.6 mincap 100 pair_coeff \* \* ffield.reax C H O N  

# 4.232.3 Description  

Pair style reaxff computes the ReaxFF potential of van Duin, Goddard and co-workers. ReaxFF uses distance-dependent bond-order functions to represent the contributions of chemical bonding to the potential energy. There is more than one version of ReaxFF. The version implemented in LAMMPS uses the functional forms documented in the supplemental information of the following paper: (Chenoweth et al., 2008) and matches the version of the reference ReaxFF implementation from Summer 2010. For more technical details about the implementation of ReaxFF in pair style reaxff, see the (Aktulga) paper. The reaxff style was initially implemented as a stand-alone C code and is now converted to $\mathrm{C}{+}{+}$ and integrated into LAMMPS as a package.  

The reaxff/kk style is a Kokkos version of the ReaxFF potential that is derived from the reaxff style. The Kokkos version can run on GPUs and can also use OpenMP multithreading. For more information about the Kokkos package, see Packages details and Speed kokkos doc pages. One important consideration when using the reaxff/kk style is the choice of either half or full neighbor lists. This setting can be changed using the Kokkos package command.  

The reaxff style differs from the (obsolete) “pair_style reax” command in the implementation details. The reax style was a Fortran library, linked to LAMMPS. The reax style has been removed from LAMMPS after the 12 December 2018 version.  

LAMMPS provides several different versions of ffield.reax in its potentials dir, each called potentials/ffield.reax.label.   
These are documented in potentials/README.reax.  

The format of these files is identical to that used originally by van Duin. We have tested the accuracy of pair_style reaxff potential against the original ReaxFF code for the systems mentioned above. You can use other ffield files for specific chemical systems that may be available elsewhere (but note that their accuracy may not have been tested).  

![](images/e01a2cd53dba13e380644f7e3270c17a42d75d93068289b2b0c3c63fb34a12a0.jpg)  

# Note  

We do not distribute a wide variety of ReaxFF force field files with LAMMPS. Adri van Duin’s group at PSU is the central repository for this kind of data as they are continuously deriving and updating parameterizations for different classes of materials. You can submit a contact request at the Materials Computation Center (MCC) website https://www.mri.psu.edu/materials-computation-center/connect-mcc, describing the material(s) you are interested in modeling with ReaxFF. They can tell you what is currently available or what it would take to create a suitable ReaxFF parameterization.  

The cfile setting can be specified as NULL, in which case default settings are used. A control file can be specified which defines values of control variables. Some control variables are global parameters for the ReaxFF potential. Others define certain performance and output settings. Each line in the control file specifies the value for a control variable. The format of the control file is described below.  

# Note  

The LAMMPS default values for the ReaxFF global parameters correspond to those used by Adri van Duin’s standalone serial code. If these are changed by setting control variables in the control file, the results from LAMMPS and the serial code will not agree.  

Examples using pair_style reaxff are provided in the examples/reax directory and its subdirectories.  

Use of this pair style requires using an atom_style that includes a per-atom charge property or using fix property/atom $q$ . Charges can be set via read_data or set. Using an initial charge that is close to the result of charge equilibration will speed up that process.  

The ReaxFF parameter files provided were created using a charge equilibration (QEq) model for handling the electrostatic interactions. Therefore, by default, LAMMPS requires that fix qeq/reaxff or fix qeq/shielded or fix acks2/reaxff or fix qtpie/reaxff is used with pair_style reaxff when simulating a ReaxFF model, to equilibrate the charges at each timestep. See the fix qeq/reaxff or fix qeq/shielded or fix acks2/reaxff or fix qtpie/reaxff command documentation for more details.  

Using the keyword checkqeq with the value no turns off the check for the QEq fixes, allowing a simulation to be run without charge equilibration. In this case, the static charges you assign to each atom will be used for computing the electrostatic interactions in the system.  

Using the optional keyword lgvdw with the value yes turns on the low-gradient correction of ReaxFF for long-range London Dispersion, as described in the (Liu) paper. The bundled force field file ffield.reax.lg is designed for this correction, and is trained for several energetic materials (see “Liu”). When using lgvdw yes, the recommended value for parameter $t h b$ is 0.01, which can be set in the control file. Note: Force field files are different for the original or lg corrected pair styles, using the wrong ffield file generates an error.  

Using the optional keyword enobonds with the value yes, the energy of atoms with no bonds (i.e. isolated atoms) is included in the total potential energy and the per-atom energy of that atom. If the value no is specified then the energy of atoms with no bonds is set to zero. The latter behavior is usual not desired, as it causes discontinuities in the potential energy when the bonding of an atom drops to zero.  

Optional keywords safezone, mincap, and minhbonds are used for allocating reaxff arrays. Increasing these values can avoid memory problems, such as segmentation faults and bondchk failed errors, that could occur under certain conditions. These keywords are not used by the Kokkos version, which instead uses a more robust memory allocation scheme that checks if the sizes of the arrays have been exceeded and automatically allocates more memory.  

# Memory management problems with ReaxFF  

The LAMMPS implementation of ReaxFF is adapted from a standalone MD program written in C called PuReMD. It inherits from this code a heuristic memory management that is different from what the rest of LAMMPS uses. It assumes that a system is dense and already well equilibrated, so that there are no large changes in how many and what types of neighbors atoms have. However, not all systems are like that, and thus there can be errors or segmentation faults if the system changes too much. If you run into problems, here are three options to avoid them:  

• Use the KOKKOS version of ReaxFF (KOKKOS is not only for GPUs, but can also be compiled for serial or OpenMP execution) which uses a different memory management approach.   
• Break down a run command during which memory related errors happen into multiple smaller segments so that the memory management heuristics are re-initialized for each segment before they become invalid.   
• Increase the values for safezone, mincap, and minhbonds as needed. This can lead to significant increase of memory consumption through.  

The keyword tabulate controls the size of interpolation table for Lennard-Jones and Coulomb interactions. Tabulation may also be set in the control file (see below). If tabulation is set in both the input script and the control file, the value in the control file will be ignored. A size of 10000 is typically used for the interpolation table. A value of 0 means no tabulation will be used.  

The keyword list/blocking is only supported by the Kokkos version of ReaxFF and ignored otherwise. Setting the value to yes enables the “blocking” scheme (dynamically building interaction lists) for the ReaxFF bond neighbor list. This reduces the number of empty interactions and can improve performance in some cases (e.g. large number of atoms/GPU on AMD hardware). It is also enabled by default when running the CPU with Kokkos.  

The thermo variable evdwl stores the sum of all the ReaxFF potential energy contributions, with the exception of the Coulombic and charge equilibration contributions which are stored in the thermo variable ecoul. The output of these quantities is controlled by the thermo command.  

This pair style tallies a breakdown of the total ReaxFF potential energy into sub-categories, which can be accessed via the compute pair command as a vector of values of length 14. The 14 values correspond to the following sub-categories (the variable names in italics match those used in the original FORTRAN ReaxFF code):  

1. $e b=$ bond energy   
2. $e a=$ atom energy   
3. elp $=$ lone-pair energy   
4. emol $=$ molecule energy (always 0.0)   
5. $e\nu=$ valence angle energy   
6. epen $=$ double-bond valence angle penalty   
7. ecoa $=$ valence angle conjugation energy   
8. ehb $=$ hydrogen bond energy   
9. $e t=$ torsion energy   
10. $e c o=\iota$ conjugation energy   
11. $e w=$ van der Waals energy   
12. $e p=$ Coulomb energy   
13. ef $=$ electric field energy (always 0.0)   
14. eqeq $=$ charge equilibration energy  

To print these quantities to the log file (with descriptive column headings) the following commands could be included in an input script:  

compute reax all pair reaxff   
variable eb equal c_reax[1]   
variable ea equal c_reax[2]   
[...]   
variable eqeq equal c_reax[14]   
thermo_style custom step temp epair v_eb v_ea [...] v_eqeq  

Only a single pair_coeff command is used with the reaxff style which specifies a ReaxFF potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying $\mathbf{N}$ additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • N indices $=$ ReaxFF elements  

The filename is the ReaxFF potential file.  

In the ReaxFF potential file, near the top, after the general parameters, is the atomic parameters section that contains element names, each with a couple dozen numeric parameters. If there are M elements specified in the ffield file, think of these as numbered 1 to M. Each of the N indices you specify for the N atom types of LAMMPS atoms must be an integer from 1 to M. Atoms with LAMMPS type 1 will be mapped to whatever element you specify as the first index value, etc. If a mapping value is specified as NULL, the mapping is not performed. This can be used when the reaxff style is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

As an example, say your LAMMPS simulation has 4 atom types and the elements are ordered as C, H, O, N in the ffield file. If you want the LAMMPS atom type 1 and 2 to be C, type 3 to be N, and type 4 to be H, you would use the following pair_coeff command:  

<html><body><table><tr><td>pair coeff ** ffield.reax C C N H</td></tr><tr><td></td></tr></table></body></html>  

# 4.232.4 Control file  

The format of a line in the control file is as follows:  

and it may be followed by an “!” character and a trailing comment.  

If the value of a control variable is not specified, then default values are used. What follows is the list of variables along with a brief description of their use and default values.  

# simulation_name  

Output files produced by pair_style reaxff carry this name $^+$ extensions specific to their contents. Partial energies are reported with a “.pot” extension, while the trajectory file has “.trj” extension.  

# tabulate_long_range  

To improve performance, long range interactions can optionally be tabulated (0 means no tabulation). Value of this variable denotes the size of the long range interaction table. The range from 0 to long range cutoff (defined in the ffield file) is divided into tabulate_long_range points. Then at the start of simulation, we fill in the entries of the long range interaction table by computing the energies and forces resulting from van der Waals and Coulomb interactions between every possible atom type pairs present in the input system. During the simulation we consult to the long range interaction table to estimate the energy and forces between a pair of atoms. Linear interpolation is used for estimation. (default value $=0$ )  

# energy_update_freq  

Denotes the frequency (in number of steps) of writes into the partial energies file. (default value $=0$ )  

# nbrhood_cutoff  

Denotes the near neighbors cutoff (in Angstroms) regarding the bonded interactions. (default value $=5.0$ )  

# hbond_cutoff  

Denotes the cutoff distance (in Angstroms) for hydrogen bond interactions.(default value $=7.5$ . A value of 0.0 turns off hydrogen bonds)  

# bond_graph_cutoff  

is the threshold used in determining what is a physical bond, what is not. Bonds and angles reported in the trajectory file rely on this cutoff. (default value $=0.3$ )  

thb_cutoff cutoff value for the strength of bonds to be considered in three body interactions. (default value $=0.001$ )  

# thb_cutoff_sq  

cutoff value for the strength of bond order products to be considered in three body interactions. (default value $=$ 0.00001)  

write_freq  

Frequency of writes into the trajectory file. (default value $=0$ )  

# traj_title  

Title of the trajectory - not the name of the trajectory file.  

# atom_info  

1 means print only atomic positions $^+$ charge (default $=0$ )  

atom_forces 1 adds net forces to atom lines in the trajectory file (default $=0$ )  

# atom_velocities  

1 adds atomic velocities to atoms line (default $=0$ )  

# bond_info  

1 prints bonds in the trajectory file (default $=0$ )  

# angle_info  

1 prints angles in the trajectory file (default $=0$ )  

# 4.232.5 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.232.6 Restrictions  

This pair style is part of the REAXFF package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The ReaxFF potential files provided with LAMMPS in the potentials directory are parameterized for real units. You can use the ReaxFF pair style with any LAMMPS units, but you would need to create your own potential file with coefficients listed in the appropriate units if your simulation does not use “real” units.  

# 4.232.7 Related commands  

pair_coeff , fix qeq/reaxff , fix acks2/reaxff , fix qtpie/reaxff , fix reaxff/bonds, fix reaxff/species, compute reaxff/atom  

# 4.232.8 Default  

The keyword defaults are checkqeq $=$ yes, enobonds $=$ yes, lgvdw $=$ no, safezone $=1.2$ , mincap $=$ 50, minhbonds $=25$ , tabulate $=0$ , list/blocking $=$ yes on CPU, no on GPU.  

(Chenoweth_2008) Chenoweth, van Duin and Goddard, Journal of Physical Chemistry A, 112, 1040-1053 (2008). (Aktulga) Aktulga, Fogarty, Pandit, Grama, Parallel Computing, 38, 245-259 (2012).   
(Liu) L. Liu, Y. Liu, S. V. Zybin, H. Sun and W. A. Goddard, Journal of Physical Chemistry A, 115, 11016-11022 (2011).  

# 4.233 pair_style rebomos command  

Accelerator Variants: rebomos/omp  

# 4.233.1 Syntax  

• rebomos $=$ name of this pair style  

# 4.233.2 Examples  

pair_style rebomos pair_coeff \* \* ../potentials/MoS.rebomos Mo S  

Example input scripts available: examples/threebody/  

# 4.233.3 Description  

Added in version 17Apr2024.  

The rebomos pair style computes the interactions between molybdenum and sulfur atoms (Stewart) utilizing an adaptive interatomic reactive empirical bond order potential that is similar in form to the AIREBO potential (Stuart). The potential is based on an earlier parameterizations for ${\mathrm{Mo}}S_{2}$ developed by (Liang).  

The REBOMoS potential consists of two terms:  

$$
E=\frac{1}{2}\sum_{i}\sum_{j\neq i}\left[E_{i j}^{\mathrm{REBO}}+E_{i j}^{\mathrm{LJ}}\right]
$$  

The $E^{\mathrm{REBO}}$ term describes the covalently bonded interactions between Mo and S atoms while the $E^{\mathrm{LJ}}$ term describes longer range dispersion forces between layers. A cubic spline function is applied to smoothly switch between covalent bonding at short distances to dispersion interactions at longer distances. This allows the model to capture bond formation and breaking events which may occur between adjacent MoS2 layers, edges, defects, and more.  

Only a single pair_coeff command is used with the rebomos pair style which specifies an REBOMoS potential file with parameters for Mo and S. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • $N$ element names $=$ mapping of REBOMoS elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, if your LAMMPS simulation has three atom types and you want the first two to be Mo, and the third to be S, you would use the following pair_coeff command:  

pair_coeff \* \* MoS.rebomos Mo Mo S  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first two Mo arguments map LAMMPS atom types 1 and 2 to the Mo element in the REBOMoS file. The final S argument maps LAMMPS atom type 3 to the S element in the REBOMoS file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a rebomos potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.233.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair styles can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.233.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

These pair potentials require the newton setting to be “on” for pair interactions.  

The MoS.rebomos potential file provided with LAMMPS (see the potentials directory) is parameterized for metal units. You can use the rebomos pair style with any LAMMPS units setting, but you would need to create your own REBOMoS potential file with coefficients listed in the appropriate units.  

The pair style provided here only supports potential files parameterized for the elements molybdenum and sulfur (designated with “Mo” and “S” in the pair_coeff command. Using potential files for other elements will trigger an error.  

# 4.233.6 Related commands  

pair_coeff , pair style rebo  

# 4.233.7 Default  

none  

(Steward) Stewart, Spearot, Modelling Simul. Mater. Sci. Eng. 21, 045003, (2013). (Stuart) Stuart, Tutein, Harrison, J Chem Phys, 112, 6472-6486, (2000). (Liang) Liang, Phillpot, Sinnott Phys. Rev. B79 245110, (2009), Erratum: Phys. Rev. B85 199903(E), (2012)  

# 4.234 pair_style resquared command  

Accelerator Variants: resquared/gpu, resquared/omp  

# 4.234.1 Syntax  

• cutof $=$ global cutoff for interactions (distance units)  

# 4.234.2 Examples  

pair_style resquared 10.0   
pair_coeff \* \* 1.0 1.0 1.7 3.4 3.4 1.0 1.0 1.0  

# 4.234.3 Description  

Style resquared computes the RE-squared anisotropic interaction (Everaers), (Babadi) between pairs of ellipsoidal and/or spherical Lennard-Jones particles. For ellipsoidal interactions, the potential considers the ellipsoid as being comprised of small spheres of size $\sigma$ . LJ particles are a single sphere of size $\sigma$ . The distinction is made to allow the pair style to make efficient calculations of ellipsoid/solvent interactions.  

Details for the equations used are given in the references below and in this supplementary document.  

Use of this pair style requires the NVE, NVT, or NPT fixes with the asphere extension (e.g. fix nve/asphere) in order to integrate particle rotation. Additionally, atom_style ellipsoid should be used since it defines the rotational state and the size and shape of each ellipsoidal particle.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• $\mathbf{A}12=$ Energy Prefactor/Hamaker constant (energy units) • $\sigma=$ atomic interaction diameter (distance units) • $\varepsilon_{i,a}=$ relative well depth of type I for side-to-side interactions • $\varepsilon_{i,b}=$ relative well depth of type I for face-to-face interactions • $\varepsilon_{i,c}=$ relative well depth of type I for end-to-end interactions • $\varepsilon_{j,a}=$ relative well depth of type J for side-to-side interactions • $\varepsilon_{j,b}=$ relative well depth of type J for face-to-face interactions • $\varepsilon_{j,c}=$ relative well depth of type J for end-to-end interactions • cutoff (distance units)  

The parameters used depend on the type of the interacting particles, i.e. ellipsoids or LJ spheres. The type of a particle is determined by the diameters specified for its 3 shape parameters. If all 3 shape parameters $=0.0$ , then the particle is treated as an LJ sphere. The $\varepsilon_{i,*}$ or $\varepsilon_{j,*}$ parameters are ignored for LJ spheres. If the 3 shape parameters are $>0.0$ , then the particle is treated as an ellipsoid (even if the 3 parameters are equal to each other).  

A12 specifies the energy prefactor which depends on the types of the two interacting particles.  

For ellipsoid/ellipsoid interactions, the interaction is computed by the formulas in the supplementary document referenced above. A12 is the Hamaker constant as described in (Everaers). In LJ units:  

$$
A_{12}=4\pi^{2}\varepsilon_{\mathrm{LJ}}(\rho\sigma^{3})^{2}
$$  

where $\rho$ gives the number density of the spherical particles composing the ellipsoids and $\varepsilon_{\mathrm{LJ}}$ determines the interaction strength of the spherical particles.  

For ellipsoid/LJ sphere interactions, the interaction is also computed by the formulas in the supplementary document referenced above. A12 has a modified form (see here for details):  

$$
A_{12}=4\pi^{2}\varepsilon_{\mathrm{LJ}}(\rho\sigma^{3})
$$  

For ellipsoid/LJ sphere interactions, a correction to the distance- of-closest approach equation has been implemented to reduce the error from two particles of disparate sizes; see this supplementary document.  

For LJ sphere/LJ sphere interactions, the interaction is computed using the standard Lennard-Jones formula, which is much cheaper to compute than the ellipsoidal formulas. A12 is used as epsilon in the standard LJ formula:  

$$
A_{12}=\varepsilon_{\mathrm{{LJ}}}
$$  

and the specified $\sigma$ is used as the $\sigma$ in the standard LJ formula.  

When one of both of the interacting particles are ellipsoids, then $\sigma$ specifies the diameter of the continuous distribution of constituent particles within each ellipsoid used to model the RE-squared potential. Note that this is a different meaning for $\sigma$ than the pair_style gayberne potential uses.  

The $\varepsilon_{i}$ and $\varepsilon_{j}$ coefficients are defined for atom types, not for pairs of atom types. Thus, in a series of pair_coeff commands, they only need to be specified once for each atom type.  

Specifically, if any of $\varepsilon_{i,a}$ , $\varepsilon_{i,b}$ , $\varepsilon_{i,c}$ are non-zero, the three values are assigned to atom type I. If all the $\varepsilon_{i}$ values are zero, they are ignored. If any of $\varepsilon_{j,a},\varepsilon_{j,b},\varepsilon_{j,\prime}$ are non-zero, the three values are assigned to atom type J. If all three $\varepsilon_{i}$ values are zero, they are ignored. Thus the typical way to define the $\varepsilon_{i}$ and $\varepsilon_{j}$ coefficients is to list their values in “pair_coeff I J” commands when $\boldsymbol{\mathrm{I}}=\boldsymbol{\mathrm{J}}$ , but set them to 0.0 when ${\bf I\Psi!=J}.$ . If you do list them when ${\textbf{I}}!={\textbf{J}}$ , you should ensure they are consistent with their values in other pair_coeff commands.  

Note that if this potential is being used as a sub-style of pair_style hybrid, and there is no “pair_coeff I I” setting made for RE-squared for a particular type I (because I-I interactions are computed by another hybrid pair potential), then you still need to ensure the epsilon a,b,c coefficients are assigned to that type in a “pair_coeff I J” command.  

For large uniform molecules it has been shown that the $\varepsilon_{*,*}$ energy parameters are approximately representable in terms of local contact curvatures (Everaers):  

$$
 {\varepsilon}_{a}={\sigma}\cdot\frac{a}{b\cdot c};{\varepsilon}_{b}={\sigma}\cdot\frac{b}{a\cdot c};{\varepsilon}_{c}={\sigma}\cdot\frac{c}{a\cdot b}
$$  

where a, b, and c give the particle diameters.  

The last coefficient is optional. If not specified, the global cutoff specified in the pair_style command is used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.234.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{~I~}!=\mathrm{~J~}$ , the epsilon and sigma coefficients and cutoff distance can be mixed, but only for sphere pairs. The default mix value is geometric. See the “pair_modify” command for details. Other type pairs cannot be mixed, due to the different meanings of the energy prefactors used to calculate the interactions and the implicit dependence of the ellipsoid-sphere interaction on the equation for the Hamaker constant presented here. Mixing of sigma and epsilon followed by calculation of the energy prefactors using the equations above is recommended.  

This pair style supports the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction, but only for sphere-sphere interactions. There is no shifting performed for ellipsoidal interactions due to the anisotropic dependence of the interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner middle, outer keywords of the run_style command.  

# 4.234.5 Restrictions  

This style is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires that atoms be ellipsoids as defined by the atom_style ellipsoid command.  

Particles acted on by the potential can be finite-size aspherical or spherical particles, or point particles. Spherical particles have all 3 of their shape parameters equal to each other. Point particles have all 3 of their shape parameters equal to 0.0.  

The distance-of-closest-approach approximation used by LAMMPS becomes less accurate when high-aspect ratio ellipsoids are used.  

# 4.234.6 Related commands  

pair_coeff , fix nve/asphere, compute temp/asphere, pair_style gayberne  

# 4.234.7 Default  

none  

(Everaers) Everaers and Ejtehadi, Phys Rev E, 67, 041710 (2003).   
(Babadi) Babadi, Ejtehadi, Everaers, J Comp Phys, 219, 770-779 (2006).  

# 4.235 pair_style rheo command  

# 4.235.1 Syntax  

pair_style rheo cutoff keyword values  

• cutof $=$ global cutoff for kernel (distance units) • zero or more keyword/value pairs may be appended to args • keyword $=$ rho/damp or artificial/visc or harmonic/means  

rho/damp args $=$ density damping prefactor $\xi$ artificial/visc args $=$ artificial viscosity prefactor $\zeta$ harmonic/means args $=$ none  

# 4.235.2 Examples  

pair_style rheo 3.0 rho/damp 1.0 artificial/visc 2.0 pair_coeff \* \*  

# 4.235.3 Description  

Added in version $29\mathrm{Aug}2024$ .  

Pair style rheo computes pressure and viscous forces between particles in the rheo package. If thermal evolution is turned on in fix rheo, then the pair style also calculates heat exchanged between particles.  

The artificial/viscosity keyword is used to specify the magnitude $\zeta$ of an optional artificial viscosity contribution to forces. This factor can help stabilize simulations by smoothing out small length scale variations in velocity fields. Artificial viscous forces typically are only exchanged by fluid particles. However, if interfaces are not reconstructed in fix rheo, fluid particles will also exchange artificial viscous forces with solid particles to improve stability.  

The rho/damp keyword is used to specify the magnitude $\xi$ of an optional pairwise damping term between the density of particles. This factor can help stabilize simulations by smoothing out small length scale variations in density fields. However, in systems that develop a density gradient in equilibrium (e.g. in a hydrostatic column underlying gravity), this option may be inappropriate.  

If particles have different viscosities or conductivities, the harmonic/means keyword changes how they are averaged before calculating pairwise forces or heat exchanges. By default, an arithmetic averaged is used, however, a harmonic mean may improve stability in systems with multiple fluid phases with large disparities in viscosities.  

No coefficients are defined for each pair of atoms types via the pair_coeff command as in the examples above.  

# 4.235.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This style does not support the pair_modify shift, table, and tail options.  

This style does not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.235.5 Restrictions  

This fix is part of the RHEO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.235.6 Related commands  

fix rheo, fix rheo/pressure, fix rheo/thermal, fix rheo/viscosity, compute rheo/property/atom  

# 4.235.7 Default  

Density damping and artificial viscous forces are not calculated. Arithmetic means are used for mixing particle properties.  

# 4.236 pair_style rheo/solid command  

# 4.236.1 Syntax  

# 4.236.2 Examples  

pair_style rheo/solid pair_coeff \* \* 1.0 1.5 1.0  

# 4.236.3 Description  

Added in version $29\mathrm{Aug}2024$ .  

Style rheo/solid is effectively a copy of pair style bpm/spring except it only applies forces between solid RHEO particles, determined by checking the status of each pair of neighboring particles before calculating forces.  

The style computes pairwise forces with the formula  

$$
\boldsymbol{F}=\boldsymbol{k}(\boldsymbol{r}-\boldsymbol{r}_{c})
$$  

where $k$ is a stiffness and $r_{c}$ is the cutoff length. An additional damping force is also applied to interacting particles The force is proportional to the difference in the normal velocity of particles  

$$
F_{D}=-\gamma{w}(\hat{r}\bullet\vec{\nu})
$$  

where $\gamma$ is the damping strength, $\hat{r}$ is the displacement normal vector, $\vec{\nu}$ is the velocity difference between the two particles, and $w$ is a smoothing factor. This smoothing factor is constructed such that damping forces go to zero as particles come out of contact to avoid discontinuities. It is given by  

$$
w=1.0-\left(\frac{r}{r_{c}}\right)^{8}.
$$  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• $k$ (force/distance units) • $r_{c}$ (distance units) • γ (force/velocity units)  

# 4.236.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the A coefficient and cutoff distance for this pair style can be mixed. A is always mixed via a geometric rule. The cutoff is mixed according to the pair_modify mix value. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style does not support the pair_modify shift option, since the pair interaction goes to 0.0 at the cutoff.  

The pair_modify table and tail options are not relevant for this pair style.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.236.5 Restrictions  

This pair style is part of the RHEO package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.236.6 Related commands  

fix rheo, fix rheo/thermal, pair bpm/spring  

# 4.236.7 Default  

none  

# 4.237 pair_style saip/metal command  

Accelerator Variant: saip/metal/opt  

# 4.237.1 Syntax  

pair_style [hybrid/overlay ...] saip/metal cutoff tap_flag  

• cutof $=$ global cutoff (distance units) • tap_flag $=0/1$ to turn off/on the taper function  

# 4.237.2 Examples  

pair_style hybrid/overlay saip/metal 16.0 1 pair_coeff \* \* saip/metal CHAu.ILP Au C H pair_style hybrid/overlay eam rebo saip/metal 16.0 pair_coeff 1 1 eam Au_u3.eam Au NULL NULL pair_coeff \* \* rebo CH.rebo NULL C H pair_coeff \* \* saip/metal CHAu.ILP Au C H  

# 4.237.3 Description  

Added in version 17Feb2022.  

The saip/metal style computes the registry-dependent interlayer potential (ILP) potential for hetero-junctions formed with hexagonal 2D materials and metal surfaces, as described in (Ouyang6).  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\frac{1}{2}\sum_{i}\sum_{j\neq i}{\cal V}_{i j}}}\ {{\displaystyle{\cal V}_{i j}=\mathrm{Iap}(r_{i j})\left\{e^{-\alpha(r_{i j}/\beta-1)}\left[\varepsilon+f(\rho_{i j})+f(\rho_{j i})\right]-\frac{1}{1+e^{-d\left[(r_{i j}/(\alpha_{\kappa}r^{\prime}/\beta)-1\right]}}\cdot\frac{C_{6}}{r_{i j}^{6}}\right\}}}\ {{\displaystyle{\rho_{i j}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{i})^{2}}}}\ {{\displaystyle{\rho_{j2}^{2}=r_{i j}^{2}-({\bf r}_{i j}\cdot{\bf n}_{j})^{2}}}}\ {{f(\rho)=C e^{-{\left(\rho/\delta\right)^{2}}}}}\ {{\displaystyle{\mathrm{Tap}(r_{i j})=20\left(\frac{r_{i j}}{R_{\alpha\alpha}}\right)^{7}-70\left(\frac{r_{i j}}{R_{\alpha\alpha}}\right)^{6}+84\left(\frac{r_{i j}}{R_{\alpha\alpha}}\right)^{5}-35\left(\frac{r_{i j}}{R_{\alpha\alpha}}\right)^{4}+1}}}\end{array}
$$  

Where $\mathrm{Tap}(r_{i j})$ is the taper function which provides a continuous cutoff (up to third derivative) for interatomic separations larger than $r_{c}$ pair_style ilp_graphene_hbn.  

It is important to include all the pairs to build the neighbor list for calculating the normals.  

# Note  

To account for the isotropic nature of the isolated gold atom electron cloud, their corresponding normal vectors ({bf $n\boldsymbol{\jmath}_{-}\boldsymbol{i})$ are assumed to lie along the interatomic vector $\{b f r\}_{-}i j$ . Notably, this assumption is suitable for many bulk material surfaces, for example, for systems possessing s-type valence orbitals or metallic surfaces, whose valence electrons are mostly delocalized, such that their Pauli repulsion with the electrons of adjacent surfaces are isotropic. Caution should be used in the case of very small gold contacts, for example, nano-clusters, where edge effects may become relevant.  

The parameter file (e.g. CHAu.ILP), is intended for use with metal units, with energies in meV. Two additional parameters, S, and rcut are included in the parameter file. $S$ is designed to facilitate scaling of energies. rcut is designed to build the neighbor list for calculating the normals for each atom pair.  

# $\Theta$ Note  

The parameters presented in the parameter file (e.g. BNCH.ILP), are fitted with taper function by setting the cutoff equal to 16.0 Angstrom. Using different cutoff or taper function should be careful.  

This potential must be used in combination with hybrid/overlay. Other interactions can be set to zero using pair_style none.  

This pair style tallies a breakdown of the total interlayer potential energy into sub-categories, which can be accessed via the compute pair command as a vector of values of length 2. The 2 values correspond to the following sub-categories:  

1. $E_{-}\nu d W=\mathrm{vdW}$ (attractive) energy   
2. $E_{-}R e p=\mathrm{R}$ epulsive energy  

To print these quantities to the log file (with descriptive column headings) the following commands could be included in an input script:  

compute 0 all pair saip/metal   
variable Evdw equal c_0[1]   
variable Erep equal c_0[2]   
thermo_style custom step temp epair v_Erep v_Evdw  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.237.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write their information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

# 4.237.5 Restrictions  

This pair style is part of the INTERLAYER package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be on for pair interactions.  

The CHAu.ILP potential file provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use this potential with any LAMMPS units, but you would need to create your own custom CHAu.ILP potential file with coefficients listed in the appropriate units, if your simulation does not use metal units.  

# 4.237.6 Related commands  

pair_coeff , pair_none, pair_style hybrid/overlay, pair_style drip, pair_style ilp_tmd, pair_style ilp_graphene_hbn, pair_style pair_kolmogorov_crespi_z, pair_style pair_kolmogorov_crespi_full, pair_style pair_lebedeva_z, pair_style pair_coul_shield.  

# 4.237.7 Default  

tap_flag $=1$  

(Ouyang6) W. Ouyang, O. Hod, and R. Guerra, J. Chem. Theory Comput. 17, 7215 (2021).  

# 4.238 pair_style sdpd/taitwater/isothermal command  

# 4.238.1 Syntax  

pair_style sdpd/taitwater/isothermal temperature viscosity seed  

• temperature $=$ temperature of the fluid (temperature units) • viscosity $=$ dynamic viscosity of the fluid (mass\*distance/time units) • seed $=$ random number generator seed (positive integer, optional)  

# 4.238.2 Examples  

pair_style sdpd/taitwater/isothermal 300. 1. 28681   
pair_coeff \* \* 1000.0 1430.0 2.4  

# 4.238.3 Description  

The sdpd/taitwater/isothermal style computes forces between mesoscopic particles according to the Smoothed Dissipative Particle Dynamics model described in this paper by (Espanol and Revenga) under the following assumptions:  

1. The temperature is constant and uniform.   
2. The shear viscosity is constant and uniform.   
3. The volume viscosity is negligible before the shear viscosity.   
4. The Boltzmann constant is negligible before the heat capacity of a single mesoscopic particle of fluid.  

The third assumption is true for water in nearly incompressible flows. The fourth holds true for water for any reasonable size one can imagine for a mesoscopic particle.  

The pressure forces between particles will be computed according to Tait’s equation of state:  

$$
p=B\left[(\frac{\rho}{\rho_{\mathrm{0}}})^{\gamma}-1\right]
$$  

where $\gamma=7$ and $B=c_{0}^{2}\rho_{0}/\gamma_{\mathrm{()}}$ , with $\rho_{0}$ being the reference density and $c_{0}$ the reference speed of sound.  

The laminar viscosity and the random forces will be computed according to formulas described in (Espanol and Revenga).  

![](images/03104a99c29e1f0f8ecb1b4ce985d78dfa779795594f15c693f2956850ebabb6.jpg)  

# Warning  

Similar to brownian and dpd styles, the newton setting for pairwise interactions needs to be on when running LAMMPS in parallel if you want to ensure linear momentum conservation. Otherwise random forces generated for pairs straddling processor boundary will not be equal and opposite.  

![](images/cadc598369f88d2dca187ad52422e3c812455c473f305fb7e59082b0aaf85062.jpg)  

# Note  

The actual random seed used will be a mix of what you specify and other parameters like the MPI ranks. This is to ensure that different MPI tasks have distinct seeds.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• $\rho_{0}$ reference density (mass/volume units) • $c_{0}$ reference soundspeed (distance/time units) • h kernel function cutoff (distance units)  

# 4.238.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This style does not support the pair_modify shift, table, and tail options.  

This style does not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.238.5 Restrictions  

This pair style is part of the DPD-SMOOTH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.238.6 Related commands  

pair coeff , pair sph/rhosum, pair sph/taitwater  

# 4.238.7 Default  

The default seed is 0 (before mixing).  

(Espanol and Revenga) Espanol, Revenga, Physical Review E, 67, 026705 (2003).  

4.239 pair_style smatb command  

4.240 pair_style smatb/single command  

# 4.240.1 Syntax  

# 4.240.2 Examples  

pair_style smatb   
pair_coeff 1 1 2.88 10.35 4.178 0.210 1.818 4.07293506 4.9883063257983666 pair_style smatb/single   
pair_coeff 1 1 2.88 10.35 4.178 0.210 1.818 4.07293506 4.9883063257983666  

# 4.240.3 Description  

Added in version 4May2022.  

The smatb and smatb/single styles compute the Second Moment Approximation to the Tight Binding (Cyrot), (Gupta), (Rosato), given by  

$$
E_{i}=\sum_{j,R_{i j}\leq R_{c}}\alpha(R_{i j})-\sqrt{\sum_{j,R_{i j}\leq R_{c}}\Xi^{2}(R_{i j})}
$$  

$R_{i j}$ is the distance between the atom $i$ and $j$ . And the two functions $\alpha(r)$ and $\Xi\left(r\right)$ are:  

$$
\begin{array}{r l}&{\alpha\left(r\right)=\left\{\begin{array}{l l}{A e^{-p\left(\frac{r}{R_{0}}-1\right)}}&{r<R_{s c}}\ {a_{3}\left(r-R_{c}\right)^{3}+a_{4}\left(r-R_{c}\right)^{4}+a_{5}\left(r-R_{c}\right)^{5}}&{R_{s c}<r<R_{c}}\end{array}\right.}\ &{\Xi\left(r\right)=\left\{\begin{array}{l l}{\xi e^{-q\left(\frac{r}{R_{0}}-1\right)}}&{r<R_{s c}}\ {x_{3}\left(r-R_{c}\right)^{3}+x_{4}\left(r-R_{c}\right)^{4}+x_{5}\left(r-R_{c}\right)^{5}}&{R_{s c}<r<R_{c}}\end{array}\right.}\end{array}
$$  

The polynomial coefficients $a_{3},a_{4},a_{5},x_{3},x_{4},x_{5}$ are computed by LAMMPS: the two exponential terms and their first and second derivatives are smoothly reduced to zero, from the inner cutoff $R_{s c}$ to the outer cutoff $R_{c}$ .  

The smatb/single style is an optimization when using only a single atom type.  

# 4.240.4 Coefficients  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• $R_{0}$ (distance units) • $p$ (dimensionless) • $q$ (dimensionless) • A (energy units) • $\xi$ (energy units) • $R_{c s}$ (distance units) • $R_{c}$ (distance units)  

Note that: $R_{0}$ is the nearest neighbor distance, usually coincides with the diameter of the atoms See the run_style command for details.  

# 4.240.5 Mixing info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ the coefficients are not automatically mixed.  

# 4.240.6 Restrictions  

These pair styles are part of the SMTBQ package and are only enabled if LAMMPS is built with that package. See the Build package page for more info.  

These pair styles require the newton setting to be “on” for pair interactions.  

# 4.240.7 Related commands  

• pair_coeff  

# 4.240.8 Default  

none  

(Cyrot) Cyrot-Lackmann and Ducastelle, Phys Rev. B, 4, 2406-2412 (1971).   
(Gupta) Gupta ,Phys Rev. B, 23, 6265-6270 (1981).   
(Rosato) Rosato and Guillope and Legrand, Philosophical Magazine A, 59.2, 321-336 (1989).  

# 4.241 pair_style smd/hertz command  

# 4.241.1 Syntax  

# 4.241.4 Mixing, shift, table, tail correction, restart, rRESPA info  

No mixing is performed automatically. Currently, no part of MACHDYN supports restarting nor minimization.   
rRESPA does not apply to this pair style.  

# 4.241.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.241.6 Related commands  

pair_coeff  

# 4.241.7 Default  

none  

# 4.242 pair_style smd/tlsph command  

# 4.242.1 Syntax  

# 4.242.2 Examples  

# 4.242.4 Mixing, shift, table, tail correction, restart, rRESPA info  

No mixing is performed automatically. Currently, no part of MACHDYN supports restarting nor minimization.   
rRESPA does not apply to this pair style.  

# 4.242.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.242.6 Related commands  

pair_coeff  

# 4.242.7 Default  

none  

# 4.243 pair_style smd/tri_surface command  

# 4.243.1 Syntax  

# 4.243.2 Examples  

<html><body><table><tr><td>pair style e smd/tri_surface 1.0 pair coeff f 1 1 <contact stiffness></td></tr></table></body></html>  

# 4.243.3 Description  

The smd/tri_surface style calculates contact forces between SPH particles and a rigid wall boundary defined via the smd/wall_surface fix.  

The contact forces are calculated using a Hertz potential, which evaluates the overlap between a particle (whose spatial extents are defined via its contact radius) and the triangle. The effect is that a particle cannot penetrate into the triangular surface. The parameter <contact_stiffness> has units of pressure and should equal roughly one half of the Young’s modulus (or bulk modulus in the case of fluids) of the material model associated with the SPH particle  

The parameter scale_factor can be used to scale the particles’ contact radii. This can be useful to control how close particles can approach the triangulated surface. Usually, scale_factor $=1.0$ .  

# 4.243.4 Mixing, shift, table, tail correction, restart, rRESPA info  

No mixing is performed automatically. Currently, no part of MACHDYN supports restarting nor minimization.   
rRESPA does not apply to this pair style.  

# 4.243.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.243.6 Related commands  

pair_coeff  

# 4.243.7 Default  

none  

# 4.244 pair_style smd/ulsph command  

# 4.244.1 Syntax  

• these keywords must be given  

keyword $=*$ DENSITY_SUMMATION or \*DENSITY_CONTINUITY and \*VELOCITY_GRADIENT␣ $\hookrightarrow$ or $^{*}\mathrm{NO}$ _VELOCITY_GRADIENT and \*GRADIENT_CORRECTION or \*NO_GRADIENT_ $\hookrightarrow$ CORRECTION  

# 4.244.2 Examples  

pair_style smd/ulsph \*DENSITY_CONTINUITY \*VELOCITY_GRADIENT \*NO_GRADIENT ,→CORRECTION  

# 4.244.3 Description  

The smd/ulsph style computes particle interactions according to continuum mechanics constitutive laws and an updated Lagrangian Smooth-Particle Hydrodynamics algorithm.  

This pair style is invoked similar to the following command:  

pair_style smd/ulsph \*DENSITY_CONTINUITY \*VELOCITY_GRADIENT \*NO_GRADIENT   
$\hookrightarrow$ CORRECTION   
pair_coeff i j \*COMMON rho0 c0 Q1 Cp hg & \*END  

Here, $i$ and $j$ denote the LAMMPS particle types for which this pair style is defined. Note that $i$ and $j$ can be different, i.e., ulsph cross interactions between different particle types are allowed. However, $i{-}i$ respectively $j{-}j$ pair_coeff lines have to precede a cross interaction. In contrast to the usual LAMMPS pair coeff definitions, which are given solely a number of floats and integers, the ulsph pair coeff definition is organized using keywords. These keywords mark the beginning of different sets of parameters for particle properties, material constitutive models, and damage models. The pair coeff line must be terminated with the $^{*}E N D$ keyword. The use the line continuation operator $\&$ is recommended. A typical invocation of the ulsph for a solid body would consist of an equation of state for computing the pressure (the diagonal components of the stress tensor), and a material model to compute shear stresses (the off-diagonal components of the stress tensor).  

Note that the use of \*GRADIENT_CORRECTION can lead to severe numerical instabilities. For a general fluid simulation, \*NO_GRADIENT_CORRECTION is recommended.  

Please see the SMD user guide for a complete listing of the possible keywords and material models.  

# 4.244.4 Mixing, shift, table, tail correction, restart, rRESPA info  

No mixing is performed automatically. Currently, no part of MACHDYN supports restarting nor minimization.   
rRESPA does not apply to this pair style.  

# 4.244.5 Restrictions  

This fix is part of the MACHDYN package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.244.6 Related commands  

pair_coeff  

# 4.244.7 Default  

none  

# 4.245 pair_style smtbq command  

# 4.245.1 Syntax  

# 4.245.2 Examples  

pair_style smtbq pair_coeff \* \* ffield.smtbq.Al2O3 O Al  

# 4.245.3 Description  

This pair style computes a variable charge SMTB-Q (Second-Moment tight-Binding QEq) potential as described in SMTB-Q_1 and SMTB-Q_2. This potential was first proposed in SMTB-Q_0. Briefly, the energy of metallic-oxygen systems is given by three contributions:  

$$
\begin{array}{l}{{\displaystyle E_{t o t}=E_{E S}+E_{O O}+E_{M O}}}\ {{\displaystyle E_{E S}=\sum_{i}\left[\chi_{i}^{0}Q_{i}+\frac{1}{2}J_{i}^{0}Q_{i}^{2}+\frac{1}{2}\sum_{j\neq i}J_{i j}(r_{i j})f_{c u l}^{R_{c o l l}}(r_{i j})Q_{i}Q_{j}\right]}}\ {{\displaystyle E_{O O}=\sum_{i,j}^{i,j=O}\left[C e x p(-\frac{r_{i j}}{\rho})-D f_{c u l}^{r_{0}^{O}r_{2}^{O{O}}}(r_{i j})e x p(B r_{i j})\right]}}\ {{\displaystyle E_{M O}=\sum_{i}E_{c o v}^{i}+\sum_{j\neq i}A f_{c u l}^{r_{i}r_{c2}}(r_{i j})e x p\left[-p(\frac{r_{i j}}{r_{0}}-1)\right]}}\end{array}
$$  

where $E_{t o t}$ is the total potential energy of the system, $E_{E S}$ is the electrostatic part of the total energy, $E_{O O}$ is the interaction between oxygen atoms and $E_{M O}$ is a short-range interaction between metal and oxygen atoms. This interactions depend on interatomic distance $r_{i j}$ and/or the charge $Q_{i}$ of atoms $i.$ Cut-off function enables smooth convergence to zero interaction.  

The parameters appearing in the upper expressions are set in the ffield.SMTBQ.Syst file where Syst corresponds to the selected system (e.g. field.SMTBQ.Al2O3). Examples for $\mathrm{TiO}_{2}$ , $\mathrm{Al}_{2}\mathrm{O}_{3}$ are provided. A single pair_coeff command is used with the SMTBQ styles which provides the path to the potential file with parameters for needed elements. These are mapped to LAMMPS atom types by specifying additional arguments after the potential filename in the pair_coeff command. Note that atom type 1 must always correspond to oxygen atoms. As an example, to simulate a $\mathrm{TiO}_{2}$ system, atom type 1 has to be oxygen and atom type $2\mathrm{Ti}$ . The following pair_coeff command should then be used:  

pair_coeff \* \* PathToLammps/potentials/ffield.smtbq.TiO2 O Ti  

The electrostatic part of the energy consists of two components self-energy of atom $i$ in the form of a second order charge dependent polynomial and a long-range Coulombic electrostatic interaction. The latter uses the wolf summation method described in $W o l f$ , spherically truncated at a longer cutoff, $R_{c o u l}$ . The charge of each ion is modeled by an orbital Slater which depends on the principal quantum number $(n)$ of the outer orbital shared by the ion.  

Interaction between oxygen, $E_{O O}$ , consists of two parts, an attractive and a repulsive part. The attractive part is effective only at short range $(<r_{2}^{O O})$ . The attractive contribution was optimized to study surfaces reconstruction (e.g. SMTB$Q_{-}2$ in $\mathrm{TiO}_{2}$ ) and is not necessary for oxide bulk modeling. The repulsive part is the Pauli interaction between the electron clouds of oxygen. The Pauli repulsion and the coulombic electrostatic interaction have same cut off value. In the ffield.SMTBQ.Syst, the keyword ‘buck’ allows to consider only the repulsive O-O interactions. The keyword ‘buckPlusAttr’ allows to consider the repulsive and the attractive O-O interactions.  

The short-range interaction between metal-oxygen, $E_{M O}$ is based on the second moment approximation of the density of states with a N-body potential for the band energy term, $E_{c o\nu}^{i}$ , and a Born-Mayer type repulsive terms as indicated by the keyword ‘second_moment’ in the ffield.SMTBQ.Syst. The energy band term is given by:  

$$
\begin{array}{c}{{E_{c o v}^{i(i=M,O)}=\displaystyle-\left\{\eta_{i}(\mu\xi^{0})^{2}f_{c u t}^{r_{c1}r_{c2}}(r_{i j})\left(\sum_{j(j=O,M)}e x p[-2q(\frac{r_{i j}}{r_{0}}-1)]\right)\delta Q_{i}\big(2\frac{n_{0}}{\eta_{i}}-\delta Q_{i}\big)\right\}^{1/2}}}\ {{\delta Q_{i}=|Q_{i}^{F}|-|Q_{i}|}}\end{array}
$$  

where $\eta_{i}$ is the stoichiometry of atom $i,$ , $\delta Q_{i}$ is the charge delocalization of atom $i$ , compared to its formal charge $Q_{i}^{F}$ .   
$n_{0}$ , the number of hybridized orbitals, is calculated with to the atomic orbitals shared $d_{i}$ and the stoichiometry $\eta_{i}$ . $r_{c1}$   
and $r_{c2}$ are the two cutoff radius around the fourth neighbors in the cutoff function.  

In the formalism used here, $\xi^{0}$ is the energy parameter. $\xi^{0}$ is in tight-binding approximation the hopping integral between the hybridized orbitals of the cation and the anion. In the literature we find many ways to write the hopping integral depending on whether one takes the point of view of the anion or cation. These are equivalent vision. The correspondence between the two visions is explained in appendix A of the article in the SrTiO3 SMTB-Q_3 (parameter $\beta$ shown in this article is in fact the $\beta_{O}$ ). To summarize the relationship between the hopping integral $\xi^{o}$ and the others, we have in an oxide $\mathrm{{C_{n}O_{m}}}$ the following relationship:  

$$
\begin{array}{c}{{\displaystyle\xi^{0}=\frac{\xi_{\cal O}}{m}=\frac{\xi_{\cal C}}{n}}}\ {{\displaystyle\frac{\beta_{\cal O}}{\sqrt{m}}=\frac{\beta_{\cal C}}{\sqrt{n}}=\xi^{0}\frac{\sqrt{m}+\sqrt{n}}{2}}}\end{array}
$$  

Thus parameter $\mu$ , indicated above, is given by $\begin{array}{r}{\mu=\frac{1}{2}(\sqrt{n}+\sqrt{m})}\end{array}$  

The potential offers the possibility to consider the polarizability of the electron clouds of oxygen by changing the slater radius of the charge density around the oxygen atoms through the parameters $r B B$ , $r B$ and $r S$ in the ffield.SMTBQ.Syst. This change in radius is performed according to the method developed by E. Maras SMTB-Q_2. This method needs to determine the number of nearest neighbors around the oxygen. This calculation is based on first $(r_{1n})$ and second $(r_{2n})$ distances neighbors.  

The SMTB-Q potential is a variable charge potential. The equilibrium charge on each atom is calculated by the electronegativity equalization (QEq) method. See Rick for further detail. One can adjust the frequency, the maximum number of iterative loop and the convergence of the equilibrium charge calculation. To obtain the energy conservation in NVE thermodynamic ensemble, we recommend to use a convergence parameter in the interval 10e-5 - 10e-6 eV.  

The ffield.SMTBQ.Syst files are provided for few systems. They consist of nine parts and the lines beginning with ‘#’ are comments (note that the number of comment lines matter). The first sections are on the potential parameters and others are on the simulation options and might be modified. Keywords are character type and must be enclosed in quotation marks (‘’).  

1) Number of different element in the oxide:   
• N_elem $=2$ or 3   
• Divider line  

2) Atomic parameters  

For the anion (oxygen)  

• Name of element (char) and stoichiometry in oxide   
• Formal charge and mass of element   
• Principal quantum number of outer orbital $\boldsymbol{\mathrm n}$ ), electronegativity $(\chi_{i}^{0})$ and hardness $(J_{i}^{0})$   
• Ionic radius parameters $:$ max coordination number $\langle c o o r d B B=6$ by default), bulk coordination number (coordB), surface coordination number (coordS) and $r B B$ , $r B$ and $r S$ the slater radius for each coordination number. (note : If you don’t want to change the slater radius, use three identical radius values)   
• Number of orbital shared by the element in the oxide $(d_{i})$   
• Divider line  

For each cations (metal):  

• Name of element (char) and stoichiometry in oxide   
• Formal charge and mass of element   
• Number of electron in outer orbital $(n e)$ , electronegativity $(\mathcal{X}_{i}^{0})$ , hardness $(J_{i}^{0})$ and $r_{S l a t e r}$ the slater radius for the cation.   
• Number of orbitals shared by the elements in the oxide $(d_{i})$   
• Divider line  

3) Potential parameters:  

• Keyword for element1, element2 and interaction potential (‘second_moment’ or ‘buck’ or ‘buckPlusAttr’) between element 1 and 2. If the potential is ‘second_moment’, specify ‘oxide’ or ‘metal’ for metal-oxygen or metal-metal interactions respectively.  

• Potential parameter:  

– If type of potential is ‘second_moment’ : A (eV), $p$ , $\zeta^{0}$ (eV) and $q,r_{c1}(\mathring\mathrm{A}),r_{c2}(\mathring\mathrm{A})$ and $r_{0}(\mathrm{\AA})$ – If type of potential is ‘buck’ : $C~(\mathrm{{eV})}$ and $\rho(\mathrm{\AA})$ – If type of potential is ‘buckPlusAttr’ : $C$ (eV) and $\rho(\mathring{\mathrm{A}})D(\mathrm{eV}),B(\mathring{\mathrm{A}}^{-1}),r_{1}^{O O}(\mathring{\mathrm{A}})$ and $r_{2}^{O O}(\mathrm{\AA})$  

• Divider line  

4) Tables parameters:  

• Cutoff radius for the Coulomb interaction $(R_{c o u l})$   
• Starting radius $(r_{m i n}=1,18845\mathring\mathrm{A})$ and increments $(d r=0.001\mathrm{\AA})$ for creating the potential table. • Divider line  

5) Rick model parameter:  

• Nevery : parameter to set the frequency of the charge resolution. The charges are evaluated each Nevery time steps.  

• Max number of iterative loop (loopmax) and convergence criterion (prec) in eV of the charge resolution  

• Divider line  

6) Coordination parameter:  

• First $(r_{1n})$ and second $(r_{2n})$ neighbor distances in angstroms  

• Divider line  

7) Charge initialization mode:  

• Keyword (QInitMode) and initial oxygen charge $(Q_{i n i t})$ . If keyword $=$ ‘true’, all oxygen charges are initially set equal to $Q_{i n i t}$ . The charges on the cations are initially set in order to respect the neutrality of the box. If keyword $=$ ‘false’, all atom charges are initially set equal to 0 if you use the create_atoms command or the charge specified in the file structure using read_data command.  

• Divider line  

8) Mode for the electronegativity equalization (Qeq)  

• Keyword (mode) followed by:  

– QEqAll (one QEq group) | no parameters – QEqAllParallel (several QEq groups) | no parameters – Surface | zlim (QEq only for z>zlim)  

• Parameter if necessary • Divider line  

9) Verbose  

• If you want the code to work in verbose mode or not : ‘true’ or ‘false’ • If you want to print or not in the file ‘Energy_component.txt’ the three main contributions to the energy of the system according to the description presented above : ‘true’ or ‘false’ and $N_{E n e r g y}$ . This option writes to the file every $N_{E n e r g y}$ time steps. If the value is ‘false’ then $N_{E n e r g y}=0$ . The file takes into account the possibility to have several QEq groups $g$ then it writes: time step, number of atoms in group $g$ , electrostatic part of energy, $E_{E S}$ , the interaction between oxygen, $E_{O O}$ , and short range metal-oxygen interaction, $E_{M O}$ .  

• If you want to print to the file ‘Electroneg_component.txt’ the electronegativity component $\big(\frac{\partial E_{t o t}}{\partial Q_{i}}\big)$ or not: ‘true’ or ‘false’ and $N_{E l e c t r o n e g}$ . This option writes to the file every $N_{E l e c t r o n e g}$ time steps. If the value is ‘false’ then $N_{E l e c t r o n e g}=0$ . The file consist of atom number $i$ , atom type (1 for oxygen and $\#$ higher than 1 for metal), atom position: $x$ , $y$ and $z$ , atomic charge of atom $i$ , electrostatic part of atom $i$ electronegativity, covalent part of atom $i$ electronegativity, the hopping integral of atom i $(Z\beta^{2})_{i}$ and box electronegativity.  

# Note  

This last option slows down the calculation dramatically. Use only with a single processor simulation.  

# 4.245.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify mix, shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you needs to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.245.5 Restrictions  

This pair style is part of the SMTBQ package and is only enabled if LAMMPS is built with that package. See the Build package page for more info.  

This potential requires using atom type 1 for oxygen and atom type higher than 1 for metal atoms.  

This pair style requires the newton setting to be “on” for pair interactions.  

The SMTB-Q potential files provided with LAMMPS (see the potentials directory) are parameterized for metal units.  

# 4.245.6 Citing this work  

Please cite related publication: N. Salles, O. Politano, E. Amzallag and R. Tetot, Comput. Mater. Sci. 111 (2016) 181-189  

(SMTB-Q_0) A. Hallil, E. Amzallag, S. Landron, R. Tetot, Surface Science 605 738-745 (2011); R. Tetot, A. Hallil, J. Creuze and I. Braems, EPL, 83 40001 (2008)   
(SMTB-Q_1) N. Salles, O. Politano, E. Amzallag, R. Tetot, Comput. Mater. Sci. 111 (2016) 181-189   
(SMTB-Q_2) E. Maras, N. Salles, R. Tetot, T. Ala-Nissila, H. Jonsson, J. Phys. Chem. C 2015, 119, 10391-10399 (SMTB-Q_3) R. Tetot, N. Salles, S. Landron, E. Amzallag, Surface Science 616, 19-8722 28 (2013)   
(Wolf) D. Wolf, P. Keblinski, S. R. Phillpot, J. Eggebrecht, J Chem Phys, 110, 8254 (1999).   
(Rick) S. W. Rick, S. J. Stuart, B. J. Berne, J Chem Phys 101, 6141 (1994).  

# 4.246 pair_style snap command  

Accelerator Variants: snap/intel, snap/kk  

# 4.246.1 Syntax  

# 4.246.3 Description  

Pair style snap defines the spectral neighbor analysis potential (SNAP), a machine-learning interatomic potential (Thompson). Like the GAP framework of Bartok et al. (Bartok2010), SNAP uses bispectrum components to characterize the local neighborhood of each atom in a very general way. The mathematical definition of the bispectrum calculation and its derivatives w.r.t. atom positions is identical to that used by compute snap, which is used to fit SNAP potentials to ab initio energy, force, and stress data. In SNAP, the total energy is decomposed into a sum over atom energies. The energy of atom $i$ is expressed as a weighted sum over bispectrum components.  

$$
E_{S N A P}^{i}(B_{1}^{i},...,B_{K}^{i})=\beta_{0}^{\mu_{i}}+\sum_{k=1}^{K}\beta_{k}^{\mu_{i}}B_{k}^{i}
$$  

where $B_{k}^{i}$ is the $k$ -th bispectrum component of atom $i$ , and $\beta_{k}^{\mu_{i}}$ is the corresponding linear coefficient that depends on $\mu_{i}$ , the SNAP element of atom $i$ . The number of bispectrum components used and their definitions depend on the value of twojmax and other parameters defined in the SNAP parameter file described below. The bispectrum calculation is described in more detail in compute sna/atom.  

Note that unlike for other potentials, cutoffs for SNAP potentials are not set in the pair_style or pair_coeff command;   
they are specified in the SNAP potential files themselves.  

Only a single pair_coeff command is used with the snap style which specifies a SNAP coefficient file followed by a SNAP parameter file and then N additional arguments specifying the mapping of SNAP elements to LAMMPS atom types, where N is the number of LAMMPS atom types:  

• SNAP coefficient file   
• SNAP parameter file   
• N element names $=$ mapping of SNAP elements to atom types  

As an example, if a LAMMPS indium phosphide simulation has 4 atoms types, with the first two being indium and the third and fourth being phophorous, the pair_coeff command would look like this:  

pair_coeff \* \* snap InP.snapcoeff InP.snapparam In In P P  

The first 2 arguments must be $^{**}$ so as to span all LAMMPS atom types. The two filenames are for the coefficient and parameter files, respectively. The two trailing ‘In’ arguments map LAMMPS atom types 1 and 2 to the SNAP ‘In’ element. The two trailing $\mathbf{\nabla}^{\leftmoon}\mathbf{P}^{\ {\mu\}}$ arguments map LAMMPS atom types 3 and 4 to the SNAP ‘P’ element.  

If a SNAP mapping value is specified as NULL, the mapping is not performed. This can be used when a snap potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

The name of the SNAP coefficient file usually ends in the “.snapcoeff” extension. It may contain coefficients for many SNAP elements. The only requirement is that each of the unique element names appearing in the LAMMPS pair_coeff command appear exactly once in the SNAP coefficient file. It is okay if the SNAP coefficient file contains additional elements not in the pair_coeff command, except when using chemflag (see below). The name of the SNAP parameter file usually ends in the “.snapparam” extension. It contains a small number of parameters that define the overall form of the SNAP potential. See the pair_coeff page for alternate ways to specify the path for these files.  

SNAP potentials are quite commonly combined with one or more other LAMMPS pair styles using the hybrid/overlay pair style. As an example, the SNAP tantalum potential provided in the LAMMPS potentials directory combines the snap and $z b l$ pair styles. It is invoked by the following commands:  

(continues on next page)  

(continued from previous page)  

pair_coeff \* \* zbl 0.0   
pair_coeff 1 1 zbl \${zblz}   
pair_coeff \* \* snap Ta06A.snapcoeff Ta06A.snapparam Ta  

It is convenient to keep these commands in a separate file that can be inserted in any LAMMPS input script using the include command.  

The top of the SNAP coefficient file can contain any number of blank and comment lines (start with #), but follows a strict format after that. The first non-blank non-comment line must contain two integers:  

• nelem $=$ Number of elements ncoeff $=$ Number of coefficients  

This is followed by one block for each of the nelem elements. The first line of each block contains three entries:  

• Element name (text string) • $\mathbf{R}=$ Element radius (distance units) • $\mathbf{W}=$ Element weight (dimensionless)  

This line is followed by ncoeff coefficients, one per line.  

The SNAP parameter file can contain blank and comment lines (start with #) anywhere. Each non-blank non-comment line must contain one keyword/value pair. The required keywords are rcutfac and twojmax. Optional keywords are rfac0, rmin0, switchflag, bzeroflag, quadraticflag, chemflag, bnormflag, wselfallflag, switchinnerflag, sinner, dinner, chunksize, and parallelthresh.  

The default values for these keywords are  

• $r f a c O=0.99363$   
• rmin0 = 0.0   
• switchflag = 1   
• bzeroflag $=1$   
• quadraticflag $=0$   
• chemflag $=0$   
• bnormflag $=0$   
• wselfallflag $=0$   
• switchinnerflag $=0$   
• chunksize $=32768$   
• parallelthresh $\iota=8192$  

For detailed definitions of all of these keywords, see the compute sna/atom doc page.  

If quadraticflag is set to 1, then the SNAP energy expression includes additional quadratic terms that have been shown to increase the overall accuracy of the potential without much increase in computational cost (Wood).  

$$
E_{S N A P}^{i}(\mathbf{B}^{i})=\beta_{0}^{\mu_{i}}+\beta^{\mu_{i}}\cdot{\bf B}_{i}+\frac{1}{2}{\bf B}_{i}^{t}\cdot\alpha^{\mu_{i}}\cdot{\bf B}_{i}
$$  

where $\mathbf{B}_{i}$ is the $K$ -vector of bispectrum components, $\beta^{\mu_{i}}$ is the $K$ -vector of linear coefficients for element $\mu_{i}$ , and $\alpha^{\mu_{i}}$ is the symmetric $K$ by $K$ matrix of quadratic coefficients. The SNAP coefficient file should contain $K(K{+}1)/2$ additional coefficients in each element block, the upper-triangular elements of $\alpha^{\mu_{i}}$ .  

If chemflag is set to 1, then the energy expression is written in terms of explicit multi-element bispectrum components indexed on ordered triplets of elements, which has been shown to increase the ability of the SNAP potential to capture energy differences in chemically complex systems, at the expense of a significant increase in computational cost (Cusentino).  

$$
E_{S N A P}^{i}({\bf B}^{i})=\beta_{0}^{\mu_{i}}+\sum_{\kappa,\lambda,\mu}\beta_{\mu_{i}}^{\kappa\lambda\mu}\cdot{\bf B}_{i}^{\kappa\lambda\mu}
$$  

where $\mathbf{B}_{i}^{\kappa\lambda\mu}$ is the $K$ -vector of bispectrum components for neighbors of elements $\kappa,\lambda$ , and $\mu$ and $\beta_{\mu_{i}}^{\kappa\lambda\mu}$ is the corresponding $K$ -vector of linear coefficients for element $\mu_{i}$ . The SNAP coefficient file should contain a total of $K N_{e l e m}^{3}$ coefficients in each element block, where $N_{e l e m}$ is the number of elements in the SNAP coefficient file, which must equal the number of unique elements appearing in the LAMMPS pair_coeff command, to avoid ambiguity in the number of coefficients.  

The keyword switchinnerflag activates an additional switching function that smoothly turns off contributions to the SNAP potential from neighbor atoms at short separations. If switchinnerflag is set to 1 then the additional keywords sinner and dinner must also be provided. Each of these is followed by nelements values, where nelements is the number of unique elements appearing in appearing in the LAMMPS pair_coeff command. The element order should correspond to the order in which elements first appear in the pair_coeff command reading from left to right.  

The keywords chunksize and parallelthresh are only applicable when using the pair style snap with the KOKKOS package on GPUs and are ignored otherwise. The chunksize keyword controls the number of atoms in each pass used to compute the bispectrum components and is used to avoid running out of memory. For example if there are 8192 atoms in the simulation and the chunksize is set to 4096, the bispectrum calculation will be broken up into two passes (running on a single GPU). The parallelthresh keyword controls a crossover threshold for performing extra parallelism. For small systems, exposing additional parallelism can be beneficial when there is not enough work to fully saturate the GPU threads otherwise. However, the extra parallelism also leads to more divergence and can hurt performance when the system is already large enough to saturate the GPU threads. Extra parallelism will be performed if the chunksize (or total number of atoms per GPU) is smaller than parallelthresh.  

![](images/a42201c8b4a5cd132c558294ff9fde5910cf48fa9399a8e4ba4e24b29c561e5d.jpg)  

# Note  

The previously used diagonalstyle keyword was removed in 2019, since all known SNAP potentials use the default value of 3.  

# 4.246.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS with user-specifiable parameters as described above. You never need to specify a pair_coeff command with I != J arguments for this style.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.246.5 Restrictions  

This style is part of the ML-SNAP package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The snap/intel accelerator variant will only be available if LAMMPS is built with Intel compilers and for CPUs with AVX-512 support. While the INTEL package in general allows multiple floating point precision modes to be selected, snap/intel will currently always use full double precision regardless of the precision mode selected. Additionally, the intel variant of snap will NOT use multiple threads with OpenMP.  

# 4.246.6 Related commands  

compute sna/atom, compute snad/atom, compute snav/atom, compute snap  

# 4.246.7 Default  

none  

(Thompson) Thompson, Swiler, Trott, Foiles, Tucker, J Comp Phys, 285, 316 (2015). (Bartok2010) Bartok, Payne, Kondor, Csanyi, Phys Rev Lett, 104, 136403 (2010). (Wood) Wood and Thompson, J Chem Phys, 148, 241721, (2018) (Cusentino) Cusentino, Wood, Thompson, J Phys Chem A, 124, 5456, (2020)  

# 4.247 pair_style soft command  

Accelerator Variants: soft/gpu, soft/kk, soft/omp  

# 4.247.1 Syntax  

# 4.247.3 Description  

Style soft computes pairwise interactions with the formula  

$$
E=A\left[1+\cos\left(\frac{\pi r}{r_{c}}\right)\right]\qquadr<r_{c}
$$  

It is useful for pushing apart overlapping atoms, since it does not blow up as r goes to 0. A is a prefactor that can be made to vary in time from the start to the end of the run (see discussion below), e.g. to start with a very soft potential and slowly harden the interactions over time. $r_{c}$ is the cutoff. See the fix nve/limit command for another way to push apart overlapping atoms.  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• A (energy units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global soft cutoff is used.  

![](images/3e9a1b942c233ace0a898006c7a0415b12fe7ebcdae7dee35dddb6ed442e3297.jpg)  

# Note  

The syntax for pair_coeff with a single A coeff is different in the current version of LAMMPS than in older versions which took two values, Astart and Astop, to ramp between them. This functionality is now available in a more general form through the fix adapt command, as explained below. Note that if you use an old input script and specify Astart and Astop without a cutoff, then LAMMPS will interpret that as A and a cutoff, which is probably not what you want.  

The fix adapt command can be used to vary A for one or more pair types over the course of a simulation, in which case pair_coeff settings for A must still be specified, but will be overridden. For example these commands will vary the prefactor A for all pairwise interactions from 0.0 at the beginning to 30.0 at the end of a run:  

variable prefactor equal ramp(0,30) fix 1 all adapt 1 pair soft a \* \* v_prefactor  

Note that a formula defined by an equal-style variable can use the current timestep, elapsed time in the current run, elapsed time since the beginning of a series of runs, as well as access other variables.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.247.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , the A coefficient and cutoff distance for this pair style can be mixed. A is always mixed via a geometric rule. The cutoff is mixed according to the pair_modify mix value. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style does not support the pair_modify shift option, since the pair interaction goes to 0.0 at the cutoff.  

The pair_modify table and tail options are not relevant for this pair style.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.247.5 Restrictions  

none  

# 4.247.6 Related commands  

pair_coeff , fix nve/limit, fix adapt  

# 4.247.7 Default  

none  

# 4.248 pair_style sph/heatconduction command  

Accelerator Variants: sph/heatconduction/gpu  

# 4.248.1 Syntax  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• D diffusion coefficient (length^2/time units) • h kernel function cutoff (distance units)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.248.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This style does not support the pair_modify shift, table, and tail options.  

This style does not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.248.5 Restrictions  

This pair style is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.248.6 Related commands  

pair_coeff , pair_sph/rhosum  

# 4.248.7 Default  

none  

# 4.249 pair_style sph/idealgas command  

# 4.249.1 Syntax  

# 4.249.2 Examples  

<html><body><table><tr><td>pair style sph/idealgas</td></tr><tr><td>pair coeff ** 1.0 2.4</td></tr><tr><td></td></tr></table></body></html>  

# 4.249.3 Description  

The sph/idealgas style computes pressure forces between particles according to the ideal gas equation of state:  

$$
p=(\gamma-1)\rho e
$$  

where $\gamma=1.4$ is the heat capacity ratio, $\rho$ is the local density, and e is the internal energy per unit mass. This pair style also computes Monaghan’s artificial viscosity to prevent particles from interpenetrating (Monaghan).  

See this PDF guide to using SPH in LAMMPS.  

![](images/24af538baa6c545ea570b9d241d2557e4a297c05c815e532c089890573035067.jpg)  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• ν artificial viscosity (no units) • h kernel function cutoff (distance units)  

# 4.249.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This style does not support the pair_modify shift, table, and tail options.  

This style does not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.249.5 Restrictions  

This pair style is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.249.6 Related commands  

pair_coeff , pair_sph/rhosum  

# 4.249.7 Default  

none  

(Monaghan) Monaghan and Gingold, Journal of Computational Physics, 52, 374-389 (1983).  

# 4.250 pair_style sph/lj command  

Accelerator Variants: sph/lj/gpu  

# 4.250.1 Syntax  

# 4.250.2 Examples  

pair_style sph/lj pair_coeff \* \* 1.0 2.4  

# 4.250.3 Description  

The sph/lj style computes pressure forces between particles according to the Lennard-Jones equation of state, which is computed according to Ree’s 1980 polynomial fit (Ree). The Lennard-Jones parameters epsilon and sigma are set to unity. This pair style also computes Monaghan’s artificial viscosity to prevent particles from interpenetrating (Monaghan).  

See this PDF guide to using SPH in LAMMPS.  

![](images/02f1894420140c776021ebfb8a5d987224bbb9bbe4c0650a7b59480811e8f819.jpg)  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• ν artificial viscosity (no units) • h kernel function cutoff (distance units)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.250.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This style does not support the pair_modify shift, table, and tail options.  

This style does not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.250.5 Restrictions  

As noted above, the Lennard-Jones parameters epsilon and sigma are set to unity.  

This pair style is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.250.6 Related commands  

pair_coeff , pair_sph/rhosum  

# 4.250.7 Default  

(Ree) Ree, Journal of Chemical Physics, 73, 5401 (1980).   
(Monaghan) Monaghan and Gingold, Journal of Computational Physics, 52, 374-389 (1983).  

# 4.251 pair_style sph/rhosum command  

# 4.251.1 Syntax  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• h (distance units)  

# 4.251.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This style does not support the pair_modify shift, table, and tail options.  

This style does not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.251.5 Restrictions  

This pair style is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.251.6 Related commands  

pair_coeff , pair_sph/taitwater  

# 4.251.7 Default  

none  

# 4.252 pair_style sph/taitwater command  

Accelerator Variants: sph/taitwater/gpu  

# 4.252.1 Syntax  

See this PDF guide to using SPH in LAMMPS.  

![](images/e5a546752285fa842b34e628e530a5284366d35ce1eba6d98907934d5b1b62ba.jpg)  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• $\rho_{0}$ reference density (mass/volume units) • $c_{0}$ reference soundspeed (distance/time units) • $\nu$ artificial viscosity (no units) • h kernel function cutoff (distance units)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.252.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This style does not support the pair_modify shift, table, and tail options.  

This style does not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.252.5 Restrictions  

This pair style is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.252.6 Related commands  

pair_coeff , pair_sph/rhosum  

# 4.252.7 Default  

none  

(Monaghan) Monaghan and Gingold, Journal of Computational Physics, 52, 374-389 (1983).  

# 4.253 pair_style sph/taitwater/morris command  

# 4.253.1 Syntax  

# 4.253.2 Examples  

pair_style sph/taitwater/morris pair_coeff \* \* 1000.0 1430.0 1.0 2.4  

# 4.253.3 Description  

The sph/taitwater/morris style computes pressure forces between SPH particles according to Tait’s equation of state:  

$$
p=B\left[\left(\frac{\rho}{\rho_{0}}\right)^{\gamma}-1\right]
$$  

where $\gamma=7$ and $B=c_{0}^{2}\rho_{0}/\gamma_{\mathrm{:}}$ , with $\rho_{0}$ being the reference density and $c_{0}$ the reference speed of sound.  

This pair style also computes laminar viscosity (Morris).  

See this PDF guide to using SPH in LAMMPS.  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• $\rho_{0}$ reference density (mass/volume units) • $c_{0}$ reference soundspeed (distance/time units) • $\nu$ dynamic viscosity (mass\*distance/time units) • h kernel function cutoff (distance units)  

# 4.253.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

This style does not support the pair_modify shift, table, and tail options.  

This style does not write information to binary restart files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.253.5 Restrictions  

This pair style is part of the SPH package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.253.6 Related commands  

pair_coeff , pair_sph/rhosum  

# 4.253.7 Default  

none  

(Morris) Morris, Fox, Zhu, J Comp Physics, 136, 214-226 (1997).  

# 4.254 pair_style lj/spica command  

Accelerator Variants: lj/spica/gpu, lj/spica/kk, lj/spica/omp  

# 4.255 pair_style lj/spica/coul/long command  

Accelerator Variants: lj/spica/coul/long/gpu, lj/spica/coul/long/omp, lj/spica/coul/long/kk  

# 4.256 pair_style lj/spica/coul/msm command  

Accelerator Variants: lj/spica/coul/msm/omp  

# 4.256.1 Syntax  

<html><body><table><tr><td>(continuedfrompreviouspage)</td></tr><tr><td>pair _coeff 1 1 lj9_6 100.0 3.5 12.0</td></tr><tr><td></td></tr><tr><td>pair style lj/s spica coul msm 10.0</td></tr><tr><td>coul 10.012.0</td></tr><tr><td>pair style lj/: spica msm</td></tr><tr><td>pair coeff 1 1 lj9 _6 100.0 3.5 12.0</td></tr></table></body></html>  

# 4.256.3 Description  

The lj/spica styles compute a 9/6, 12/4, 12/5, or 12/6 Lennard-Jones potential, given by  

$$
\begin{array}{l}{{{\cal E}=\displaystyle\frac{27}{4}\varepsilon\left[\left(\displaystyle\frac{\sigma}{r}\right)^{9}-\left(\displaystyle\frac{\sigma}{r}\right)^{6}\right]~r<r_{c}}}\ {{{\cal E}=\displaystyle\frac{3\sqrt{3}}{2}\varepsilon\left[\left(\displaystyle\frac{\sigma}{r}\right)^{12}-\left(\displaystyle\frac{\sigma}{r}\right)^{4}\right]~r<r_{c}}}\ {{{\cal E}=\displaystyle\frac{12}{7}\left(\displaystyle\frac{12}{5}\right)^{(\frac{5}{7})}\varepsilon\left[\left(\displaystyle\frac{\sigma}{r}\right)^{12}-\left(\displaystyle\frac{\sigma}{r}\right)^{5}\right]~r<r_{c}}}\ {{{\cal E}=4\varepsilon\left[\left(\displaystyle\frac{\sigma}{r}\right)^{12}-\left(\displaystyle\frac{\sigma}{r}\right)^{6}\right]~r<r_{c}}}\end{array}
$$  

as required for the SPICA (formerly called SDK) and the pSPICA Coarse-grained MD parameterization discussed in (Shinoda), (DeVane), (Seo), and (Miyazaki). $r_{c}$ is the cutoff. Summary information on these force fields can be found at https://www.spica-ff.org  

Style lj/spica/coul/long computes the adds Coulombic interactions with an additional damping factor applied so it can be used in conjunction with the kspace_style command and its ewald or pppm or pppm/cg option. The Coulombic cutoff specified for this style means that pairwise interactions within this distance are computed directly; interactions outside that distance are computed in reciprocal space.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

cg_type (lj9_6, lj12_4, lj12_5, or lj12_6)   
epsilon (energy units)   
• sigma (distance units)   
• cutoff1 (distance units)  

Note that sigma is defined in the LJ formula as the zero-crossing distance for the potential, not as the energy minimum The prefactors are chosen so that the potential minimum is at -epsilon.  

The latter 2 coefficients are optional. If not specified, the global LJ and Coulombic cutoffs specified in the pair_style command are used. If only one cutoff is specified, it is used as the cutoff for both LJ and Coulombic interactions for this type pair. If both coefficients are specified, they are used as the LJ and Coulombic cutoffs for this type pair.  

For lj/spica/coul/long and lj/spica/coul/msm only the LJ cutoff can be specified since a Coulombic cutoff cannot be specified for an individual I,J type pair. All type pairs use the same global Coulombic cutoff specified in the pair_style command.  

The original implementation of the above styles are style lj/sdk, lj/sdk/coul/long, and lj/sdk/coul/msm, and available for backward compatibility.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.256.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of the lj/spica pair styles cannot be mixed, since different pairs may have different exponents. So all parameters for all pairs have to be specified explicitly through the “pair_coeff” command. Defining then in a data file is also not supported, due to limitations of that file format.  

All of the lj/spica pair styles support the pair_modify shift option for the energy of the Lennard-Jones portion of the pair interaction.  

The lj/spica/coul/long pair styles support the pair_modify table option since they can tabulate the short-range portion of the long-range Coulombic interaction.  

All of the lj/spica pair styles write their information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

The lj/spica and lj/cut/coul/long pair styles do not support the use of the inner, middle, and outer keywords of the run_style respa command.  

# 4.256.5 Restrictions  

All of the lj/spica pair styles are part of the CG-SPICA package. The lj/spica/coul/long style also requires the KSPACE package to be built (which is enabled by default). They are only enabled if LAMMPS was built with that package. See the Build package doc page for more info.  

# 4.256.6 Related commands  

pair_coeff , angle_style spica  

# 4.256.7 Default  

none  

# 4.257 pair_style spin/dipole/cut command  

# 4.258 pair_style spin/dipole/long command  

# 4.258.1 Syntax  

pair_style spin/dipole/cut cutoff pair_style spin/dipole/long cutoff  

• cutof $=$ global cutoff for magnetic dipole energy and forces (optional) (distance units)  

# 4.258.2 Examples  

pair_style spin/dipole/cut 10.0   
pair_coeff \* \* 10.0   
pair_coeff 2 3 8.0   
pair_style spin/dipole/long 9.0   
pair_coeff \* \* 10.0   
pair_coeff 2 3 6.0  

# 4.258.3 Description  

Style spin/dipole/cut computes a short-range dipole-dipole interaction between pairs of magnetic particles that each have a magnetic spin. The magnetic dipole-dipole interactions are computed by the following formulas for the magnetic energy, magnetic precession vector omega and mechanical force between particles I and J.  

$$
\begin{array}{l}{{\displaystyle\mathcal{H}_{\mathrm{long}}=-\frac{\mu_{0}(\mu_{B})^{2}}{4\pi}\sum_{i,j,i\neq j}^{N}\frac{g_{i}g_{j}}{r_{i j}^{3}}\Bigg(3\left(\vec{e}_{i j}\cdot\vec{s}_{i}\right)\left(\vec{e}_{i j}\cdot\vec{s}_{j}\right)-\vec{s}_{i}\cdot\vec{s}_{j}\Bigg)}}\ {{\displaystyle\omega_{i}=\frac{\mu_{0}(\mu_{B})^{2}}{4\pi\hbar}\sum_{j}\frac{g_{i}g_{j}}{r_{i j}^{3}}\left(3\left(\vec{e}_{i j}\cdot\vec{s}_{j}\right)\vec{e}_{i j}-\vec{s}_{j}\right)}}\ {{\displaystyle\mathbf{F}_{i}=\frac{3\mu_{0}(\mu_{B})^{2}}{4\pi}\sum_{j}\frac{g_{i}g_{j}}{r_{i j}^{4}}\left[\left(\vec{s}_{i}\cdot\vec{s}_{j}\right)-5(\vec{e}_{i j}\cdot\vec{s}_{i})(\vec{e}_{i j}\cdot\vec{s}_{j})\right)\vec{e}_{i j}+\left((\vec{e}_{i j}\cdot\vec{s}_{i})\vec{s}_{j}+(\vec{e}_{i j}\cdot\vec{s}_{j})\vec{s}_{i}\right)\right]}}\end{array}
$$  

where ; and  are the spin ontwomagnetic particles, r is their separation distance, and the vector = is the direction vector between the two particles.  

Style spin/dipole/long computes long-range magnetic dipole-dipole interaction. A kspace_style must be defined to use this pair style. Currently, kspace_style ewald/dipole/spin and kspace_style pppm/dipole/spin support long-range magnetic dipole-dipole interactions.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

# 4.258.4 Restrictions  

The spin/dipole/cut and spin/dipole/long styles are part of the SPIN package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Using dipole/spin pair styles with electron units is not currently supported.  

# 4.258.5 Related commands  

pair_coeff , kspace_style fix nve/spin  

# 4.258.6 Default  

none  

# 4.259 pair_style spin/dmi command  

# 4.259.1 Syntax  

• cutof $=$ global cutoff pair (distance in metal units)  

# 4.259.2 Examples  

pair_style spin/dmi 4.0   
pair_coeff \* \* dmi 2.6 0.001 1.0 0.0 0.0   
pair_coeff 1 2 dmi 4.0 0.00109 0.0 0.0 1.0  

# 4.259.3 Description  

Style spin/dmi computes the Dzyaloshinskii-Moriya (DM) interaction between pairs of magnetic spins. According to the expression reported in (Rohart), one has the following DM energy:  

$$
\mathbf{H}_{d m}=\sum_{\substack{i,j=1,i\neq j}}^{N}{\left(\vec{e}_{i j}\times\vec{D}\right)}\cdot\left(\vec{s}_{i}\times\vec{s}_{j}\right),
$$  

where  and are twneigboring magnetic spins of two partiles, = is the unit vector between sites $i$ and $j_{:}$ , and $\vec{D}$ is the DM vector defining the intensity $(\mathrm{ineV},$ ) and the direction of the interaction.  

In (Rohart), $\vec{D}$ is defined as the direction normal to the film oriented from the high spin-orbit layer to the magnetic ultra-thin film.  

The application of a spin-lattice Poisson bracket to this energy (as described in (Tranchida)) allows to derive a magnetic torque omega, and a mechanical force F (for spin-lattice calculations only) for each magnetic particle i:  

$$
\vec{\omega}_{i}=-\frac{1}{\hbar}\sum_{j}^{N e i g h b}\vec{s}_{j}\times\left(\vec{e}_{i j}\times\vec{D}\right)\mathrm{and}\vec{F}_{i}=-\sum_{j}^{N e i g h b}\frac{1}{r_{i j}}\vec{D}\times\left(\vec{s}_{i}\times\vec{s}_{j}\right)
$$  

More details about the derivation of these torques/forces are reported in (Tranchida).  

For the spin/dmi pair style, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, and set in the following order:  

• rc (distance units)  

# LAMMPS Documentation, Release 4Feb2025  

• |D| (energy units) • Dx, Dy, Dz (direction of D)  

Note that rc is the radius cutoff of the considered DM interaction, $|\mathrm{D}|$ is the norm of the DM vector (in eV), and Dx, Dy and Dz define its direction.  

None of those coefficients is optional. If not specified, the spin/dmi pair style cannot be used.  

# 4.259.4 Restrictions  

All the pair/spin styles are part of the SPIN package. These styles are only enabled if LAMMPS was built with this package, and if the atom_style “spin” was declared. See the Build package page for more info.  

# 4.259.5 Related commands  

atom_style spin, pair_coeff , pair_eam,  

# 4.259.6 Default  

none  

(Rohart) Rohart and Thiaville, Physical Review B, 88(18), 184422. (2013).  

(Tranchida) Tranchida, Plimpton, Thibaudeau and Thompson, Journal of Computational Physics, 372, 406-425, (2018).  

# 4.260 pair_style spin/exchange command  

# 4.261 pair_style spin/exchange/biquadratic command  

# 4.261.1 Syntax  

pair_style spin/exchange cutoff pair_style spin/exchange/biquadratic cutoff  

• cutof $=$ global cutoff pair (distance in metal units)  

# 4.261.2 Examples  

pair_style spin/exchange 4.0   
pair_coeff \* \* exchange 4.0 0.0446928 0.003496 1.4885   
pair_coeff 1 2 exchange 6.0 -0.01575 0.0 1.965 offset yes   
pair_style spin/exchange/biquadratic 4.0   
pair_coeff \* \* biquadratic 4.0 0.05 0.03 1.48 0.05 0.03 1.48 offset no   
pair_coeff 1 2 biquadratic 6.0 -0.01 0.0 1.9 0.0 0.1 19  

# 4.261.3 Description  

Style spin/exchange computes the exchange interaction between pairs of magnetic spins:  

$$
H_{e x}=-\sum_{i,j}^{N}J_{i j}(r_{i j})\Vec{s}_{i}\cdot\Vec{s}_{j}
$$  

where $\vec{s}_{i}$ and $\vec{s}_{j}$ are two unit vectors representing the magnetic spins of two particles (usually atoms), and $r_{i j}=|\vec{r}_{i}-\vec{r}_{j}|$ is the inter-atomic distance between those two particles. The summation is over pairs of nearest neighbors. $J(r_{i j})$ is a function defining the intensity and the sign of the exchange interaction for different neighboring shells.  

Style spin/exchange/biquadratic computes a biquadratic exchange interaction between pairs of magnetic spins:  

$$
H_{b i}=-\sum_{i,j}^{N}J_{i j}\left(r_{i j}\right)\vec{s}_{i}\cdot\vec{s}_{j}-\sum_{i,j}^{N}K_{i j}\left(r_{i j}\right)\left(\vec{s}_{i}\cdot\vec{s}_{j}\right)^{2}
$$  

where $\mathbf{\chi}_{i},\vec{s}_{j},r_{i j}$ and $J(r_{i j})$ have the same definitions as above, and $K(r_{i j})$ is a second function, defining the intensity and the sign of the biquadratic term.  

The interatomic dependence of $J(r_{i j})$ and $K(r_{i j})$ in both interactions above is defined by the following function:  

$$
f\left(r_{i j}\right)=4a\left(\frac{r_{i j}}{d}\right)^{2}\left(1-b\left(\frac{r_{i j}}{d}\right)^{2}\right)e^{-\left(\frac{r_{i j}}{d}\right)^{2}}\Theta(R_{c}-r_{i j})
$$  

where $a$ , $b$ and $d$ are the three constant coefficients defined in the associated “pair_coeff” command, and $R_{c}$ is the radius cutoff associated to the pair interaction (see below for more explanations).  

The coefficients $a,b$ , and $d$ need to be fitted so that the function above matches with the value of the exchange interaction for the $N$ neighbor shells taken into account. Examples and more explanations about this function and its parameterization are reported in (Tranchida).  

When a spin/exchange/biquadratic pair style is defined, six coefficients (three for $J(r_{i j})$ , and three for $K(r_{i j}),$ ) have to be fitted.  

From this exchange interaction, each spin $i$ will be submitted to a magnetic torque $\vec{\omega}_{i}$ , and its associated atom can be submitted to a force $\vec{F}_{i}$ for spin-lattice calculations (see fix nve/spin), such as:  

$$
\vec{\omega}_{i}=\frac{1}{\hbar}\sum_{j}^{N e i g h b}J\left(r_{i j}\right)\vec{s}_{j}\mathrm{and}\vec{F}_{i}=\sum_{j}^{N e i g h b}\frac{\partial J\left(r_{i j}\right)}{\partial r_{i j}}\left(\vec{s}_{i}\cdot\vec{s}_{j}\right)\vec{e}_{i j}
$$  

with hthe Planck constant (in metalunits), and = the unit vector between sites $i$ and $j$ . Equivalent forces and magnetic torques are generated for the biquadratic term when a spin/exchange/biquadratic pair style is defined.  

More details about the derivation of these torques/forces are reported in (Tranchida).  

For the spin/exchange and spin/exchange/biquadratic pair styles, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, and set in the following order:  

• $R_{c}$ (distance units) • a (energy units) • $b$ (adim parameter) • $d$ (distance units)  

for the spin/exchange pair style, and:  

• $R_{c}$ (distance units) • $a_{j}$ (energy units)  

• $b_{j}$ (adim parameter) • $d_{j}$ (distance units) • $a_{k}$ (energy units) • $b_{k}$ (adim parameter) • $d_{k}$ (distance units)  

for the spin/exchange/biquadratic pair style.  

Note that $R_{c}$ is the radius cutoff of the considered exchange interaction, and $a,b$ and $d$ are the three coefficients performing the parameterization of the function $J(r_{i j})$ defined above (in the biquadratic style, $a_{j},b_{j},d_{j}$ and $a_{k},b_{k},d_{k}$ are the coefficients of $J(r_{i j})$ and $K(r_{i j})$ respectively).  

None of those coefficients is optional. If not specified, the spin/exchange pair style cannot be used.  

# Offsetting magnetic forces and energies:  

For spin-lattice simulation, it can be useful to offset the mechanical forces and energies generated by the exchange interaction. The offset keyword allows to apply this offset. By setting offset to yes, the energy definitions above are replaced by:  

$$
H_{e x}=-\sum_{i,j}^{N}J_{i j}(r_{i j})\left[\vec{s}_{i}\cdot\vec{s}_{j}-1\right]
$$  

for the spin/exchange pair style, and:  

$$
H_{b i}=-\sum_{i,j}^{N}J_{i j}\left(r_{i j}\right)[\vec{s_{i}}\cdot\vec{s_{j}}-1]-\sum_{i,j}^{N}K_{i j}\left(r_{i j}\right)[\left(\vec{s_{i}}\cdot\vec{s_{j}}\right)^{2}-1]
$$  

for the spin/exchange/biquadratic pair style.  

Note that this offset only affects the calculation of the energy and mechanical forces. It does not modify the calculation of the precession vectors (and thus does no impact the purely magnetic properties). This ensures that when all spins are aligned, the magnetic energy and the associated mechanical forces (and thus the pressure generated by the magnetic potential) are null.  

![](images/854d95c40089034c90bbc7d14f980a660d83dfa23f6d834fb31d71d6eb3f22d4.jpg)  

#  Note  

This offset term can be very important when calculations such as equations of state (energy vs volume, or energy vs pressure) are being performed. Indeed, setting the offset term ensures that at the ground state of the crystal and at the equilibrium magnetic configuration (typically ferromagnetic), the pressure is null, as expected. Otherwise, magnetic forces could generate a residual pressure.  

When the offset option is set to no, no offset is applied (also corresponding to the default option).  

# 4.261.4 Restrictions  

All the pair/spin styles are part of the SPIN package. These styles are only enabled if LAMMPS was built with this package, and if the atom_style “spin” was declared. See the Build package page for more info.  

# 4.261.5 Related commands  

atom_style spin, pair_coeff , pair_eam,  

# 4.261.6 Default  

The default offset keyword value is no.  

(Tranchida) Tranchida, Plimpton, Thibaudeau and Thompson, Journal of Computational Physics, 372, 406-425, (2018).  

# 4.262 pair_style spin/magelec command  

# 4.262.1 Syntax  

• cutof $=$ global cutoff pair (distance in metal units)  

# 4.262.2 Examples  

pair_style spin/magelec 4.5   
pair_coeff \* \* magelec 4.5 0.00109 1.0 1.0 1.0  

# 4.262.3 Description  

Style spin/me computes a magneto-electric interaction between pairs of magnetic spins. According to the derivation reported in (Katsura), this interaction is defined as:  

$$
\begin{array}{l}{{\displaystyle\vec{\omega}_{i}=-\frac{1}{\hbar}\sum_{j}^{N e i g h b}\vec{s}_{j}\times\vec{D}(r_{i j})}}\ {{\displaystyle\vec{F}_{i}=-\sum_{j}^{N e i g h b}\frac{\partial D(r_{i j})}{\partial r_{i j}}\left(\vec{s}_{i}\times\vec{s}_{j}\right)\cdot\vec{r}_{i j}}}\end{array}
$$  

where $\vec{s}_{i}$ and $\vec{s}_{j}$ are neighboring magnetic spins of two particles.  

From this magneto-electric interaction, each spin i will be submitted to a magnetic torque omega, and its associated atom can be submitted to a force F for spin-lattice calculations (see fix nve/spin), such as:  

$$
\begin{array}{c}{{\vec{F}^{i}=-\displaystyle\sum_{\vec{h}}^{N e i g h b o r}\left(\vec{s}_{i}\times\vec{s}_{j}\right)\times\vec{E}}}\ {{\vec{\omega}^{i}=-\displaystyle\frac{1}{\hbar}\sum_{j}^{N e i g h b o r}\vec{s}_{j}\times\left(\vec{E}\times r_{i j}\right)}}\end{array}
$$  

with h the Planck constant (in metal units) and $\vec{E}$ an electric polarization vector. The norm and direction of $\mathrm{E}$ are giving the intensity and the direction of a screened dielectric atomic polarization (in eV).  

More details about the derivation of these torques/forces are reported in (Tranchida).  

# 4.262.4 Restrictions  

All the pair/spin styles are part of the SPIN package. These styles are only enabled if LAMMPS was built with this package, and if the atom_style “spin” was declared. See the Build package page for more info.  

# 4.262.5 Related commands  

atom_style spin, pair_coeff , pair_style spin/exchange, pair_eam,  

# 4.262.6 Default  

none  

(Katsura) H. Katsura, N. Nagaosa, A.V. Balatsky. Phys. Rev. Lett., 95(5), 057205. (2005)  

(Tranchida) Tranchida, Plimpton, Thibaudeau, and Thompson, Journal of Computational Physics, 372, 406-425, (2018).  

# 4.263 pair_style spin/neel command  

# 4.263.1 Syntax  

• cutof $=$ global cutoff pair (distance in metal units)  

# 4.263.2 Examples  

pair_style spin/neel 4.0   
pair_coeff \* \* neel 4.0 0.0048 0.234 1.168 2.6905 0.705 0.652   
pair_coeff 1 2 neel 4.0 0.0048 0.234 1.168 0.0 0.0 1.0  

# 4.263.3 Description  

Style spin/neel computes the Neel pair anisotropy model between pairs of magnetic spins:  

$$
\mathcal{H}_{N\ell e l}=-\sum_{i,j=1,i\neq j}^{N}g_{1}(r_{i j})\left((\mathbf{e}_{i j}\cdot\mathbf{s}_{i})(\mathbf{e}_{i j}\cdot\mathbf{s}_{j})-\frac{\mathbf{s}_{i}\cdot\mathbf{s}_{j}}{3}\right)+q_{1}(r_{i j})\left((\mathbf{e}_{i j}\cdot\mathbf{s}_{i})^{2}-\frac{\mathbf{s}_{i}\cdot\mathbf{s}_{j}}{3}\right)\left((\mathbf{e}_{i j}\cdot\mathbf{s}_{i})^{2}-\frac{\mathbf{s}_{i}\cdot\mathbf{s}_{j}}{3}\right)
$$  

where $\mathbf{s}_{i}$ and $\mathbf{s}_{j}$ are two neighboring magnetic spins of two particles, $r_{i j}=|\mathbf{r}_{i}-\mathbf{r}_{j}|$ is the inter-atomic distance between the two particles, $\begin{array}{r}{\mathbf{e}_{i j}=\frac{\mathbf{r}_{i}-\mathbf{r}_{j}}{\left|\mathbf{r}_{i}-\mathbf{r}_{j}\right|}}\end{array}$ is their normalized separation vector and $g_{1},q_{1}$ and $q_{2}$ are three functions defining the intensity of the dipolar and quadrupolar contributions, with:  

$$
\begin{array}{l}{{g_{1}(r_{i j})=g(r_{i j})+\displaystyle\frac{12}{35}q(r_{i j})}}\ {{{}}}\ {{q_{1}(r_{i j})=\displaystyle\frac{9}{5}q(r_{i j})}}\ {{{}}}\ {{q_{2}(r_{i j})=-\displaystyle\frac{2}{5}q(r_{i j})}}\end{array}
$$  

With the functions $g(r_{i j})$ and $q(r_{i j})$ defined and fitted according to the same Bethe-Slater function used to fit the exchange interaction:  

$$
J\left({{r}_{i j}}\right)=4a\left(\frac{{{r}_{i j}}}{d}\right)^{2}\left(1-b\left(\frac{{{r}_{i j}}}{d}\right)^{2}\right)e^{-\left(\frac{{{r}_{i j}}}{d}\right)^{2}}\Theta(R_{c}-{{r}_{i j}})
$$  

where $a,b$ and $d$ are the three constant coefficients defined in the associated “pair_coeff” command.  

The coefficients $a,b$ , and $d$ need to be fitted so that the function above matches with the values of the magneto-elastic constant of the materials at stake.  

Examples and more explanations about this function and its parameterization are reported in (Tranchida). More examples of parameterization will be provided in future work.  

From this DM interaction, each spin $i$ will be submitted to a magnetic torque $\omega$ and its associated atom to a force F (for spin-lattice calculations only).  

More details about the derivation of these torques/forces are reported in (Tranchida).  

# 4.263.4 Restrictions  

All the pair/spin styles are part of the SPIN package. These styles are only enabled if LAMMPS was built with this package, and if the atom_style “spin” was declared. See the Build package page for more info.  

# 4.263.5 Related commands  

atom_style spin, pair_coeff , pair_eam,  

# 4.263.6 Default  

none  

(Tranchida) Tranchida, Plimpton, Thibaudeau and Thompson, Journal of Computational Physics, 372, 406-425, (2018).  

# 4.264 pair_style srp command  

# 4.265 pair_style srp/react command  

# 4.265.1 Syntax  

pair_style srp cutoff btype dist keyword value ...   
pair_style srp/react cutoff btype dist react-id keyword value ...   
• cutof $=$ global cutoff for SRP interactions (distance units)   
• btype $=$ bond type (numeric, type label, or wildcard) to apply SRP interactions to   
• distance $=$ min or mid   
• react-id $=$ id of either fix bond/break or fix bond/create   
• zero or more keyword/value pairs may be appended   
• keyword $=$ exclude bptype value $=$ atom type (numeric or type label) for bond particles exclude value $\mathrm{~\ensuremath~{~\mu~}~}=\mathrm{yes}$ or no  

# 4.265.2 Examples  

pair_style hybrid dpd 1.0 1.0 12345 srp 0.8 1 mid exclude yes   
pair_coeff 1 1 dpd 60.0 4.5 1.0   
pair_coeff 1 2 none   
pair_coeff 2 2 srp 100.0 0.8   
pair_style hybrid dpd 1.0 1.0 12345 srp 0.8 \* min exclude yes   
pair_coeff 1 1 dpd 60.0 50 1.0   
pair_coeff 1 2 none   
pair_coeff 2 2 srp 40.0   
fix create all bond/create 100 1 2 1.0 1 prob 0.2 19852   
pair_style hybrid dpd 1.0 1.0 12345 srp/react 0.8 \* min create exclude yes   
pair_coeff 1 1 dpd 60.0 50 1.0   
pair_coeff 1 2 none   
pair_coeff 2 2 srp/react 40.0   
pair_style hybrid srp 0.8 2 mid   
pair_coeff 1 1 none   
pair_coeff 1 2 none   
pair_coeff 2 2 srp 100.0 0.8   
labelmap bond 1 C-C   
pair_style hybrid srp 0.8 C-C mid  

Description  

Style srp computes a soft segmental repulsive potential (SRP) that acts between pairs of bonds. This potential is useful for preventing bonds from passing through one another when a soft non-bonded potential acts between beads in, for example, DPD polymer chains. An example input script that uses this command is provided in examples/PACKAGES/srp.  

Bonds of specified type btype interact with one another through a bond-pairwise potential, such that the force on bond $i$ due to bond $j$ is as follows  

$$
F_{i j}^{\mathrm{SRP}}=C(1-r/r_{c})\hat{r}_{i j}\qquadr<r_{c}
$$  

where $r$ and $\hat{r}_{i j}$ are the distance and unit vector between the two bonds. Note that btype can be specified as an asterisk “\*”, which case the interaction is applied to all bond types. The mid option computes $r$ and $\hat{r}_{i j}$ from the midpoint distance between bonds. The min option computes $r$ and $\hat{r}_{i j}$ from the minimum distance between bonds. The force acting on a bond is mapped onto the two bond atoms according to the lever rule,  

$$
\begin{array}{r l}&{F_{i1}^{\mathrm{SRP}}=F_{i j}^{\mathrm{SRP}}(L)}\ &{F_{i2}^{\mathrm{SRP}}=F_{i j}^{\mathrm{SRP}}(1-L)}\end{array}
$$  

where $L$ is the normalized distance from the atom to the point of closest approach of bond $i$ and $j$ . The mid option takes $L$ as 0.5 for each interaction as described in (Sirk).  

The following coefficients must be defined via the pair_coeff command as in the examples above, or in the data file or restart file read by the read_data or read_restart commands:  

• $C$ (force units) • $r_{c}$ (distance units)  

The last coefficient is optional. If not specified, the global cutoff is used.  

![](images/7ee7dfe9803e6660e87ac49c1beca803e99ffaa4e87e142be84281b5551bf978.jpg)  

# Note  

Pair style srp considers each bond of type btype to be a fictitious “particle” of type bptype, where bptype is either the largest atom type in the system, or the type set by the bptype flag. Any actual existing particles with this atom type will be deleted at the beginning of a run. This means you must specify the number of types in your system accordingly; usually to be one larger than what would normally be the case, e.g. via the create_box or by changing the header in your data file. The fictitious “bond particles” are inserted at the beginning of the run, and serve as placeholders that define the position of the bonds. This allows neighbor lists to be constructed and pairwise interactions to be computed in almost the same way as is done for actual particles. Because bonds interact only with other bonds, pair_style hybrid should be used to turn off interactions between atom type bptype and all other types of atoms. An error will be flagged if pair_style hybrid is not used.  

# Note  

If using type labels, the type labels must be defined before calling the pair_coeff command.  

The optional exclude keyword determines if forces are computed between first neighbor (directly connected) bonds. For a setting of $n o$ , first neighbor forces are computed; for yes they are not computed. A setting of no cannot be used with the min option for distance calculation because the minimum distance between directly connected bonds is zero.  

Pair style srp turns off normalization of thermodynamic properties by particle number, as if the command thermo_modify norm no had been issued.  

The pairwise energy associated with style srp is shifted to be zero at the cutoff distance $r_{c}$ .  

Added in version 3Aug2022.  

Pair style srp/react interfaces the pair style srp with the bond breaking and formation mechanisms provided by fix bond/break and fix bond/create, respectively. When using this pair style, whenever a bond breaking (or formation) reaction occurs, the corresponding fictitious particle is deleted (or inserted) during the same simulation time step as the reaction. This is useful in the simulation of reactive systems involving large polymeric molecules (Palkar) where the segmental repulsive potential is necessary to minimize topological violations, and also needs to be turned on and off according to the progress of the reaction.  

# 4.265.3 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing.  

This pair style does not support the pair_modify shift option for the energy of the pair interaction. Note that as discussed above, the energy term is already shifted to be 0.0 at the cutoff distance $r_{c}$ .  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes global and per-atom information to binary restart files. Pair srp should be used with pair_style hybrid, thus the pair_coeff commands need to be specified in the input script when reading a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.265.4 Restrictions  

This pair style is part of the MISC package. It is only enabled if LAMMPS was built with that package. See the Making LAMMPS section for more info.  

This pair style must be used with pair_style hybrid.   
This pair style requires the newton command to be on for non-bonded interactions. This pair style is not compatible with rigid body integrators  

# 4.265.5 Related commands  

pair_style hybrid, pair_coeff , pair dpd  

# 4.265.6 Default  

The default keyword value is exclude $=$ yes.  

(Sirk) Sirk TW, Sliozberg YR, Brennan JK, Lisal M, Andzelm JW, J Chem Phys, 136 (13) 134903, 2012. (Palkar) Palkar V, Kuksenok O, J. Phys. Chem. B, 126 (1), 336-346, 2022  

# 4.266 pair_style sw command  

Accelerator Variants: sw/gpu, sw/intel, sw/kk, sw/omp  

# 4.267 pair_style sw/mod command  

Accelerator Variants: sw/mod/omp  

# 4.267.1 Syntax  

(continued from previous page)  

pair_style hybrid sw threebody on sw threebody off pair_coeff \* \* sw 1 mW_xL.sw mW NULL pair_coeff 1 2 sw 2 mW_xL.sw mW xL pair_coeff 2 2 sw 2 mW_xL.sw mW xL  

# 4.267.3 Description  

The $s w$ style computes a 3-body Stillinger-Weber potential for the energy $\mathrm{\bfE}$ of a system of atoms as  

$$
\begin{array}{c}{{\displaystyle E=\sum_{i}\sum_{j>i}\phi_{2}(r_{i j})+\sum_{i}\sum_{j\neq\ell}\sum_{k>j}\phi_{3}(r_{i j},r_{i k},\theta_{i j k})}}\ {{\phi_{2}(r_{i j})=A_{i j}\varepsilon_{i j}\left[B_{i j}(\frac{\sigma_{i j}}{r_{i j}})^{p_{i j}}-(\frac{\sigma_{i j}}{r_{i j}})^{q_{i j}}\right]\exp\left(\frac{\sigma_{i j}}{r_{i j}-a_{i j}\sigma_{i j}}\right)}}\ {{\phi_{3}(r_{i j},r_{i k},\theta_{i j k})=\lambda_{i j k}\varepsilon_{i j k}\left[\cos\theta_{i j k}-\cos\theta_{0i j k}\right]^{2}\exp\left(\frac{\gamma_{i j}\sigma_{i j}}{r_{i j}-a_{i j}\sigma_{i j}}\right)\exp\left(\frac{\gamma_{i k}\sigma_{i k}}{r_{i k}-a_{i k}\sigma_{i k}}\right)}}\end{array}
$$  

where $\phi_{2}$ is a two-body term and $\phi_{3}$ is a three-body term. The summations in the formula are over all neighbors $\mathbf{J}$ and $\mathrm{K}$ of atom I within a cutoff distance $a^{\prime}\sigma$ .  

Added in version $14\mathrm{Dec}2021$  

The sw/mod style is designed for simulations of materials when distinguishing three-body angles are necessary, such as borophene and transition metal dichalcogenides, which cannot be described by the original code for the StillingerWeber potential. For instance, there are several types of angles around each Mo atom in MoS_2, and some unnecessary angle types should be excluded in the three-body interaction. Such exclusion may be realized by selecting proper angle types directly. The exclusion of unnecessary angles is achieved here by the cut-off function $(f\_C(d e l t a))$ , which induces only minimum modifications for LAMMPS.  

Validation, benchmark tests, and applications of the sw/mod style can be found in (Jiang2) and (Jiang3).  

The sw/mod style computes the energy $\mathrm{E}$ of a system of atoms, whose potential function is mostly the same as the Stillinger-Weber potential. The only modification is in the three-body term, where the value of $\delta=\cos\theta_{i j k}-\cos\theta_{0i j k}$ used in the original energy and force expression is scaled by a switching factor $f_{C}(\delta)$ :  

$$
\begin{array}{r}{f_{C}(\delta)=\left\{\begin{array}{c c c}{1}&{:}&{|\delta|<\delta_{1}}\ {\frac{1}{2}+\frac{1}{2}\cos\Big(\pi\frac{|\delta|-\delta_{1}}{\delta_{2}-\delta_{1}}\Big)}&{:}&{\delta_{1}<|\delta|<\delta_{2}}\ {0}&{:}&{|\delta|>\delta_{2}}\end{array}\right.}\end{array}
$$  

This cut-off function decreases smoothly from 1 to 0 over the range $[\delta_{1},\delta_{2}]$ . This smoothly turns off the energy and force contributions for $|\delta|>\delta_{2}$ . It is suggested that $\delta1$ and $\delta_{2}$ to be the value around $0.5\left|\cos\theta_{1}-\cos\theta_{2}\right|$ , with $\theta_{1}$ and $\theta_{2}$ as the different types of angles around an atom. For borophene and transition metal dichalcogenides, $\delta_{1}=0.25$ and $\delta_{2}=0.35$ . This value enables the cut-off function to exclude unnecessary angles in the three-body SW terms.  

# Note  

The cut-off function is just to be used as a technique to exclude some unnecessary angles, and it has no physical meaning. It should be noted that the force and potential are inconsistent with each other in the decaying range of the cut-off function, as the angle dependence for the cut-off function is not implemented in the force (first derivation of potential). However, the angle variation is much smaller than the given threshold value for actual simulations, so the inconsistency between potential and force can be neglected in actual simulations.  

Added in version 3Aug2022.  

The threebody keyword is optional and determines whether or not the three-body term of the potential is calculated. The default value is “on” and it is only available for the plain $s w$ pair style variants, but not available for the sw/mod and sw/angle/table pair style variants. To turn off the threebody contributions all $\lambda_{i j k}$ parameters from the potential file are forcibly set to 0. In addition the pair style implementation may employ code optimizations for the threebody off setting that can result in significant speedups versus the default. These code optimizations are currently only available for the MANYBODY and OPENMP packages.  

Only a single pair_coeff command is used with the sw and sw/mod styles which specifies a Stillinger-Weber potential file with parameters for all needed elements, except for when the threebody off setting is used (see note below). These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of SW elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine a file SiC.sw has Stillinger-Weber values for Si and C. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Si, and the fourth to be C, you would use the following pair_coeff command:  

<html><body><table><tr><td>pair style SW</td></tr><tr><td>pair coeff ** SiC.sw Si Si Si C</td></tr></table></body></html>  

The first 2 arguments must be $^{**}$ so as to span all LAMMPS atom types. The first three Si arguments map LAMMPS atom types 1, 2, and 3 to the Si element in the SW file. The final C argument maps LAMMPS atom type 4 to the C element in the SW file. If an argument value is specified as NULL, the mapping is not performed. This can be used when an sw potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

![](images/e012b626ea49d2f0e4a88efa3263dc5551a938552d9d7ed629d2c7fde0a77e64.jpg)  

# Note  

When the threebody off keyword is used, multiple pair_coeff commands may be used to specific the pairs of atoms which don’t require three-body term. In these cases, the first 2 arguments are not required to be \* \*, the potential parameter file is only read by the first pair_coeff command and the element to atom type mappings must be consistent across all pair_coeff statements. If not LAMMPS will abort with an error.  

Stillinger-Weber files in the potentials directory of the LAMMPS distribution have a “.sw” suffix. Lines that are not blank or comments (starting with #) define parameters for a triplet of elements. The parameters in a single entry correspond to the two-body and three-body coefficients in the formula above:  

• element 1 (the center atom in a 3-body interaction)   
• element 2   
• element 3   
• ε (energy units)   
• $\sigma$ (distance units)   
• a   
• λ   
• γ   
• cos θ0   
• A  

• B • p • q • tol  

The A, B, p, and q parameters are used only for two-body interactions. The $\lambda$ and cos $\theta_{0}$ parameters are used only for three-body interactions. The ε, $\sigma$ and $a$ parameters are used for both two-body and three-body interactions. γ is used only in the three-body interactions, but is defined for pairs of atoms. The non-annotated parameters are unitless.  

LAMMPS introduces an additional performance-optimization parameter tol that is used for both two-body and threebody interactions. In the Stillinger-Weber potential, the interaction energies become negligibly small at atomic separations substantially less than the theoretical cutoff distances. LAMMPS therefore defines a virtual cutoff distance based on a user defined tolerance tol. The use of the virtual cutoff distance in constructing atom neighbor lists can significantly reduce the neighbor list sizes and therefore the computational cost. LAMMPS provides a tol value for each of the three-body entries so that they can be separately controlled. If tol $=0.0$ , then the standard Stillinger-Weber cutoff is used.  

The Stillinger-Weber potential file must contain entries for all the elements listed in the pair_coeff command. It can also contain entries for additional elements not being used in a particular simulation; LAMMPS ignores those entries.  

For a single-element simulation, only a single entry is required (e.g. SiSiSi). For a two-element simulation, the file must contain 8 entries (for SiSiSi, SiSiC, SiCSi, SiCC, CSiSi, CSiC, CCSi, CCC), that specify SW parameters for all permutations of the two elements interacting in three-body configurations. Thus for 3 elements, 27 entries would be required, etc.  

As annotated above, the first element in the entry is the center atom in a three-body interaction. Thus an entry for SiCC means a Si atom with $2\mathrm{~C~}$ atoms as neighbors. The parameter values used for the two-body interaction come from the entry where the second and third elements are the same. Thus the two-body parameters for Si interacting with C, comes from the SiCC entry. The three-body parameters can in principle be specific to the three elements of the configuration. In the literature, however, the three-body parameters are usually defined by simple formulas involving two sets of pairwise parameters, corresponding to the ij and ik pairs, where i is the center atom. The user must ensure that the correct combining rule is used to calculate the values of the three-body parameters for alloys. Note also that the function $\phi_{3}$ contains two exponential screening factors with parameter values from the ij pair and ik pairs. $\mathrm{So}\phi_{3}$ for a C atom bonded to a Si atom and a second C atom will depend on the three-body parameters for the CSiC entry, and also on the two-body parameters for the CCC and CSiSi entries. Since the order of the two neighbors is arbitrary, the three-body parameters for entries CSiC and CCSi should be the same. Similarly, the two-body parameters for entries SiCC and CSiSi should also be the same. The parameters used only for two-body interactions (A, B, p, and q) in entries whose second and third element are different (e.g. SiCSi) are not used for anything and can be set to 0.0 if desired. This is also true for the parameters in $\phi_{3}$ that are taken from the ij and ik pairs $(\sigma,a,\gamma)$  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

![](images/5f782d64a1744b1e4b6a51b2db8c0ec19e292435fb577670c1745670524db866.jpg)  

# Note  

When using the INTEL package with this style, there is an additional 5 to 10 percent performance improvement when the Stillinger-Weber parameters p and q are set to 4 and 0 respectively. These parameters are common for modeling silicon and water.  

# 4.267.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS as described above from values in the potential file.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

The single() function of the sw pair style is only enabled and supported for the case of the threebody off setting.  

# 4.267.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

The Stillinger-Weber potential files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use the sw or sw/mod pair styles with any LAMMPS units, but you would need to create your own SW potential file with coefficients listed in the appropriate units if your simulation does not use “metal” units. If the potential file contains a ‘UNITS:’ metadata tag in the first line of the potential file, then LAMMPS can convert it transparently between “metal” and “real” units.  

# 4.267.6 Related commands  

pair_coeff  

# 4.267.7 Default  

The default value for the threebody setting of the “sw” pair style is “on”, the default values for the “maxdelcs setting of the sw/mod pair style are delta1 $=0.25$ and delta $2=0.35^{\circ}$ .  

# 4.268 pair_style sw/angle/table command  

# 4.268.1 Syntax  

• style $=$ sw/angle/table  

# 4.268.2 Examples  

<html><body><table><tr><td>pair style e sw/angle/table</td></tr><tr><td>**</td></tr><tr><td>pair coeff spce.sw type</td></tr></table></body></html>  

Used in example input script:  

examples/PACKAGES/manybody_table/in.spce_sw  

# 4.268.3 Description  

Added in version 2Jun2022.  

The sw/angle/table style is a modification of the original pair_style sw. It has been developed for coarse-grained simulations (of water) (Scherer1), but can be employed for all kinds of systems. It computes a modified 3-body StillingerWeber potential for the energy E of a system of atoms as  

$$
\begin{array}{c}{{E=\displaystyle\sum_{i}\sum_{j>i}\phi_{2}(r_{i j})+\sum_{i}\sum_{j\neq i}\sum_{k>j}\phi_{3}(r_{i j},r_{i k},\theta_{i j k})}}\ {{\phi_{2}(r_{i j})=A_{i j}\varepsilon_{i j}\left[B_{i j}(\displaystyle\frac{\sigma_{i j}}{r_{i j}})^{p_{i j}}-(\displaystyle\frac{\sigma_{i j}}{r_{i j}})^{q_{i j}}\right]\exp\left(\displaystyle\frac{\sigma_{i j}}{r_{i j}-a_{i j}\sigma_{i j}}\right)}}\ {{\phi_{3}(r_{i j},r_{i k},\theta_{i j k})=f^{3\flat}\left(\theta_{i j k}\right)\exp\left(\displaystyle\frac{\gamma_{i j}\sigma_{i j}}{r_{i j}-a_{i j}\sigma_{i j}}\right)\exp\left(\displaystyle\frac{\gamma_{i k}\sigma_{i k}}{r_{i k}-a_{i k}\sigma_{i k}}\right)}}\end{array}
$$  

where $\phi_{2}$ is a two-body term and $\phi_{3}$ is a three-body term. The summations in the formula are over all neighbors J and K of atom I within a cutoff distance $a\sigma$ . In contrast to the original $s w$ style, sw/angle/table allows for a flexible three-body term $f^{3\mathrm{b}}\left(\theta_{i j k}\right)$ which is read in as a tabulated interaction. It can be parameterized with the csg_fmatch app of VOTCA as available at: https://gitlab.mpcdf.mpg.de/votca/votca.  

Only a single pair_coeff command is used with the sw/angle/table style which specifies a modified Stillinger-Weber potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying N_el additional arguments after the “.sw” filename in the pair_coeff command, where N_el is the number of LAMMPS atom types:  

“.sw” filename • N_el element names $=$ mapping of SW elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine a file SiC.sw has Stillinger-Weber values for Si and C. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Si, and the fourth to be C, you would use the following pair_coeff command:  

pair_coeff \* \* SiC.sw Si Si Si C  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three Si arguments map LAMMPS atom types 1,2,3 to the Si element in the SW file. The final C argument maps LAMMPS atom type 4 to the C element in the SW file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a sw/angle/table potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

The (modified) Stillinger-Weber files have a “.sw” suffix. Lines that are not blank or comments (starting with #) define parameters for a triplet of elements. The parameters in a single entry correspond to the two-body and three-body coefficients in the formula above. Here, also the suffix “.sw” is used though the original Stillinger-Weber file format is supplemented with four additional lines per parameter block to specify the tabulated three-body interaction. A single entry then contains:  

• element 1 (the c   
• element 2   
• element 3   
• ε (energy units)   
• $\sigma$ (distance units   
• a   
• λ   
• γ   
• cos $\theta_{0}$   
• A   
• B   
• p   
• q   
• tol   
• filename   
• keyword   
• style   
• N  

The A, B, p, and q parameters are used only for two-body interactions. The $\lambda$ and cos $\theta_{0}$ parameters, only used for three-body interactions in the original Stillinger-Weber style, are read in but ignored in this modified pair style. The ε parameter is only used for two-body interactions in this modified pair style and not for the three-body terms. The $\sigma$ and $a$ parameters are used for both two-body and three-body interactions. γ is used only in the three-body interactions, but is defined for pairs of atoms. The non-annotated parameters are unitless.  

LAMMPS introduces an additional performance-optimization parameter tol that is used for both two-body and threebody interactions. In the Stillinger-Weber potential, the interaction energies become negligibly small at atomic separations substantially less than the theoretical cutoff distances. LAMMPS therefore defines a virtual cutoff distance based on a user defined tolerance tol. The use of the virtual cutoff distance in constructing atom neighbor lists can significantly reduce the neighbor list sizes and therefore the computational cost. LAMMPS provides a tol value for each of the three-body entries so that they can be separately controlled. If tol $=0.0$ , then the standard Stillinger-Weber cutoff is used.  

The additional parameters filename, keyword, style, and $N$ refer to the tabulated angular potential $f^{3\mathrm{b}}\left(\theta_{i j k}\right)$ . The tabulated angular potential has to be of the format as used in the angle_style table command:  

An interpolation tables of length $N$ is created. The interpolation is done in one of 2 styles: linear or spline. For the linear style, the angle is used to find 2 surrounding table values from which an energy or its derivative is computed by linear interpolation. For the spline style, a cubic spline coefficients are computed and stored at each of the $N$ values in the table. The angle is used to find the appropriate set of coefficients which are used to evaluate a cubic polynomial which computes the energy or derivative.  

The filename specifies the file containing the tabulated energy and derivative values of $f^{3\mathrm{b}}\left(\theta_{i j k}\right)$ . The keyword then specifies a section of the file. The format of this file is as follows (without the parenthesized comments):  

<html><body><table><tr><td colspan="2"># Angle potential for harmonic (one or more comment or blank lines)</td></tr><tr><td>HAM</td><td>(keyword is the first text on line)</td></tr><tr><td>N181FP0 0EQ90.0</td><td>(N, FP, EQ parameters)</td></tr><tr><td>(blank line)</td><td></td></tr><tr><td>1 0.0 200.5 2.5</td><td>(index, angle, energy, derivative)</td></tr><tr><td>2 1.0 198.0 2.5</td><td></td></tr><tr><td></td><td></td></tr><tr><td>181 180.0 0.0 0.0</td><td></td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

The parameter “N” is required and its value is the number of table entries that follow. Note that this may be different than the $N$ specified in the Stillinger-Weber potential file. Let $\mathrm{Nsw}=N$ in the “.sw” file, and Nfile $=$ “N” in the tabulated angular file. What LAMMPS does is a preliminary interpolation by creating splines using the Nfile tabulated values as nodal points. It uses these to interpolate as needed to generate energy and derivative values at Ntable different points. The resulting tables of length Nsw are then used as described above, when computing energy and force for individual angles and their atoms. This means that if you want the interpolation tables of length Nsw to match exactly what is in the tabulated file (with effectively no preliminary interpolation), you should set $\mathrm{Nsw}=\mathrm{Nfile}$ .  

The “FP” parameter is optional. If used, it is followed by two values fplo and fphi, which are the second derivatives at the innermost and outermost angle settings. These values are needed by the spline construction routines. If not specified by the “FP” parameter, they are estimated (less accurately) by the first two and last two derivative values in the table.  

The “EQ” parameter is also optional. If used, it is followed by a the equilibrium angle value, which is used, for example, by the fix shake command. If not used, the equilibrium angle is set to 180.0.  

Following a blank line, the next N lines of the angular table file list the tabulated values. On each line, the first value is the index from 1 to N, the second value is the angle value (in degrees), the third value is the energy (in energy units), and the fourth is -dE/d(theta) (also in energy units). The third term is the energy of the 3-atom configuration for the specified angle. The last term is the derivative of the energy with respect to the angle (in degrees, not radians). Thus the units of the last term are still energy, not force. The angle values must increase from one line to the next. The angle values must also begin with 0.0 and end with 180.0, i.e. span the full range of possible angles.  

Note that one angular potential file can contain many sections, each with a tabulated potential. LAMMPS reads the file section by section until it finds one that matches the specified keyword of appropriate section of the “.sw” file.  

The Stillinger-Weber potential file must contain entries for all the elements listed in the pair_coeff command. It can also contain entries for additional elements not being used in a particular simulation; LAMMPS ignores those entries.  

For a single-element simulation, only a single entry is required (e.g. SiSiSi). For a two-element simulation, the file must contain 8 entries (for SiSiSi, SiSiC, SiCSi, SiCC, CSiSi, CSiC, CCSi, CCC), that specify SW parameters for all permutations of the two elements interacting in three-body configurations. Thus for 3 elements, 27 entries would be required, etc.  

As annotated above, the first element in the entry is the center atom in a three-body interaction. Thus an entry for SiCC means a Si atom with $2\mathrm{C}$ atoms as neighbors. The parameter values used for the two-body interaction come from the entry where the second and third elements are the same. Thus the two-body parameters for Si interacting with C, comes from the SiCC entry. The three-body angular potential $f^{3\mathrm{b}}\left(\theta_{i j k}\right)$ can in principle be specific to the three elements of the configuration. However, the user must ensure that it makes physically sense. Note also that the function $\phi_{3}$ contains two exponential screening factors with parameter values from the ij pair and ik pairs. So $\phi_{3}$ for a $\mathrm{^C}$ atom bonded to a Si atom and a second C atom will depend on the three-body parameters for the CSiC entry, and also on the two-body parameters for the CCC and CSiSi entries. Since the order of the two neighbors is arbitrary, the three-body parameters and the tabulated angular potential for entries CSiC and CCSi should be the same. Similarly, the two-body parameters for entries SiCC and CSiSi should also be the same. The parameters used only for two-body interactions (A, B, p, and q) in entries whose second and third element are different (e.g. SiCSi) are not used for anything and can be set to 0.0 if desired. This is also true for the parameters in $\phi_{3}$ that are taken from the ij and ik pairs $(\sigma,a,\gamma)$  

Additional input files and reference data can be found at: https://gitlab.mpcdf.mpg.de/votca/votca/-/tree/master/ csg-tutorials/spce/3body_sw  

# 4.268.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS as described above from values in the potential file, but not for the tabulated angular potential file.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.268.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

# 4.268.6 Related commands  

pair_coeff , pair_style sw, pair_style threebody/table  

(Stillinger) Stillinger and Weber, Phys Rev B, 31, 5262 (1985).   
(Scherer1) C. Scherer and D. Andrienko, Phys. Chem. Chem. Phys. 20, 22387-22394 (2018).  

# 4.269 pair_style table command  

Accelerator Variants: table/gpu, table/kk, table/omp  

# 4.269.1 Syntax  

pair_style table style N keyword ...  

• style $=$ lookup or linear or spline or bitmap $=$ method of interpolation • $\Nu=\mathtt{u s e N}$ values in lookup, linear, spline tables • $\mathrm{N}=\mathrm{use}2\hat{\mathrm{N}}$ values in bitmap tables  

• zero or more keywords may be appended • keyword $=$ ewald or pppm or msm or dispersion or tip4p  

# 4.269.2 Examples  

pair_style table linear 1000  
pair_style table linear 1000 pppm  
pair_style table bitmap 12  
pair_coeff \* 3 morse.table ENTRY1  
pair_coeff $\ast_{\mathrm{~3~}}$ morse.table ENTRY1 7.0  

# 4.269.3 Description  

Style table creates interpolation tables from potential energy and force values listed in a file(s) as a function of distance. When performing dynamics or minimization, the interpolation tables are used to evaluate energy and forces for pairwise interactions between particles, similar to how analytic formulas are used for other pair styles.  

The interpolation tables are created as a pre-computation by fitting cubic splines to the file values and interpolating energy and force values at each of $N$ distances. During a simulation, the tables are used to interpolate energy and force values as needed for each pair of particles separated by a distance $R$ . The interpolation is done in one of 4 styles: lookup, linear, spline, or bitmap.  

For the lookup style, the distance $R$ is used to find the nearest table entry, which is the energy or force.  

For the linear style, the distance $R$ is used to find the 2 surrounding table values from which an energy or force is computed by linear interpolation.  

For the spline style, cubic spline coefficients are computed and stored for each of the $N$ values in the table, one set of splines for energy, another for force. Note that these splines are different than the ones used to pre-compute the $N$ values. Those splines were fit to the Nfile values in the tabulated file, where often $N\mathit{f i l e}<N.$ The distance $R$ is used to find the appropriate set of spline coefficients which are used to evaluate a cubic polynomial which computes the energy or force.  

For the bitmap style, the specified $N$ is used to create interpolation tables that are $2\mathsf{N N}$ in length. The distance $R$ is used to index into the table via a fast bit-mapping technique due to $(W o l f)$ , and a linear interpolation is performed between adjacent table values.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• filename   
• keyword   
• cutoff (distance units)  

The filename specifies a file containing tabulated energy and force values. The keyword specifies a section of the file. The cutoff is an optional coefficient. If not specified, the outer cutoff in the table itself (see below) will be used to build an interpolation table that extend to the largest tabulated distance. If specified, only file values up to the cutoff are used to create the interpolation table. The format of this file is described below.  

If your tabulated potential(s) are designed to be used as the short-range part of one of the long-range solvers specified by the kspace_style command, then you must use one or more of the optional keywords listed above for the pair_style command. These are ewald or pppm or msm or dispersion or tip4p. This is so LAMMPS can ensure the short-range potential and long-range solver are compatible with each other, as it does for other short-range pair styles, such as pair_style lj/cut/coul/long. Note that it is up to you to ensure the tabulated values for each pair of atom types has the correct functional form to be compatible with the matching long-range solver.  

Here are some guidelines for using the pair_style table command to best effect:  

• Vary the number of table points; you may need to use more than you think to get good resolution.   
• Always use the pair_write command to produce a plot of what the final interpolated potential looks like. This can show up interpolation “features” you may not like.   
• Start with the linear style; it’s the style least likely to have problems.   
• Use $N$ in the pair_style command equal to the “N” in the tabulation file, and use the “RSQ” or “BITMAP” parameter, so additional interpolation is not needed. See discussion below.   
• Make sure that your tabulated forces and tabulated energies are consistent $\mathrm{{dE/dr=-F}},$ ) over the entire range of r values. LAMMPS will warn if this is not the case.   
• Use as large an inner cutoff as possible. This avoids fitting splines to very steep parts of the potential.  

Suitable tables in the correct format for use with these pair styles can be created by LAMMPS itself using the pair_write command. In combination with the pair styles python, lepton, or lepton/coul this can be a powerful mechanism to implement and test tables for use with LAMMPS. Another option to generate tables is the Python code in the tools/ tabulate folder of the LAMMPS source code distribution.  

The format of a tabulated file has an (optional) header followed by a series of one or more sections, defined as follows (without the parenthesized comments). The header must start with a # character and the DATE: and UNITS: tags will be parsed and used:  

<html><body><table><tr><td># DATE: 2020-06-10 UNITS: real CONTRIBUTOR: ... (header line) # Morse potential for Fe e (one or more comment or blank lines)</td></tr><tr><td></td></tr><tr><td>MORSE FE (keyword is first text on line)</td></tr><tr><td>N 500R 1.010.0 (N, R, RSQ, BITMAP, FPRIME parameters)</td></tr><tr><td>(blank)</td></tr><tr><td>1 1.0 25.5 102.34 (index, r, energy, force)</td></tr><tr><td>2 1.02 23.4 98.5</td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The line can contain additional text, but the initial text must match the argument specified in the pair_coeff command. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

The parameter “N” is required and its value is the number of table entries that follow. Note that this may be different than the $N$ specified in the pair_style table command. Let Ntable $=N$ in the pair_style command, and $\mathrm{\DeltaJfile={}^{\mathrm{\Delta}\cdot\epsilon}N^{\cdot\gamma}}$ in the tabulated file. What LAMMPS does is a preliminary interpolation by creating splines using the Nfile tabulated values as nodal points. It uses these to interpolate energy and force values at Ntable different points. The resulting tables of length Ntable are then used as described above, when computing energy and force for individual pair distances. This means that if you want the interpolation tables of length Ntable to match exactly what is in the tabulated file (with effectively no preliminary interpolation), you should set Ntable $=$ Nfile, and use the “RSQ” or “BITMAP” parameter. This is because the internal table abscissa is always RSQ (separation distance squared), for efficient lookup.  

All other parameters are optional. If “R” or “RSQ” or “BITMAP” does not appear, then the distances in each line of the table are used as-is to perform spline interpolation. In this case, the table values can be spaced in $r$ uniformly or however you wish to position table values in regions of large gradients.  

If used, the parameters “R” or “RSQ” are followed by 2 values rlo and rhi. If specified, the distance associated with each energy and force value is computed from these 2 values (at high accuracy), rather than using the (low-accuracy)  

value listed in each line of the table. The distance values in the table file are ignored in this case. For “R”, distances uniformly spaced between rlo and rhi are computed; for “RSQ”, squared distances uniformly spaced between rlo\*rlo and $r h i^{*}r h i$ are computed.  

![](images/0c7803a2bbf385a0ff6ed8c321fcc8da65971f4bf6fa195659f29d3fe2c01529.jpg)  

# Note  

If you use “R” or “RSQ”, the tabulated distance values in the file are effectively ignored, and replaced by new values as described in the previous paragraph. If the distance value in the table is not very close to the new value (i.e. round-off difference), then you will be assigning energy/force values to a different distance, which is probably not what you want. LAMMPS will warn if this is occurring.  

If used, the parameter “BITMAP” is also followed by 2 values rlo and rhi. These values, along with the “N” value determine the ordering of the N lines that follow and what distance is associated with each. This ordering is complex, so it is not documented here, since this file is typically produced by the pair_write command with its bitmap option. When the table is in BITMAP format, the “N” parameter in the file must be equal to $2\mathsf{M}$ where M is the value specified in the pair_style command. Also, a cutoff parameter cannot be used as an optional third argument in the pair_coeff command; the entire table extent as specified in the file must be used.  

If used, the parameter “FPRIME” is followed by 2 values fplo and fphi which are the derivative of the force at the innermost and outermost distances listed in the table. These values are needed by the spline construction routines. If not specified by the “FPRIME” parameter, they are estimated (less accurately) by the first 2 and last 2 force values in the table. This parameter is not used by BITMAP tables.  

Following a blank line, the next N lines list the tabulated values. On each line, the first value is the index from 1 to N, the second value is r (in distance units), the third value is the energy (in energy units), and the fourth is the force (in force units). The r values must increase from one line to the next (unless the BITMAP parameter is specified).  

Note that one file can contain many sections, each with a tabulated potential. LAMMPS reads the file section by section until it finds one that matches the specified keyword.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.269.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

The pair_modify shift, table, and tail options are not relevant for this pair style.  

This pair style writes the settings for the “pair_style table” command to binary restart files, so a pair_style command does not need to specified in an input script that reads a restart file. However, the coefficient information is not stored in the restart file, since it is tabulated in the potential files. Thus, pair_coeff commands do need to be specified in the restart input script.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.269.5 Restrictions  

none  

# 4.269.6 Related commands  

pair_coeff , pair_write  

# 4.269.7 Default  

none  

(Wolff) Wolff and Rudd, Comp Phys Comm, 120, 200-32 (1999).  

# 4.270 pair_style table/rx command  

Accelerator Variants: table/rx/kk  

# 4.270.1 Syntax  

pair_style table style N ...  

• style $=$ lookup or linear or spline or bitmap $=$ method of interpolation • $\Nu=$ use N values in lookup, linear, spline tables • weighting $=$ fractional or molecular (optional)  

# 4.270.2 Examples  

pair_style table/rx linear 1000 pair_style table/rx linear 1000 fractional pair_style table/rx linear 1000 molecular pair_coeff \* \* rxn.table ENTRY1 h2o h2o 10.0 pair_coeff $^**$ rxn.table ENTRY1 1fluid 1fluid 10.0 pair_coeff \* 3 rxn.table ENTRY1 h2o no2 10.0  

# 4.270.3 Description  

Style table/rx is used in reaction DPD simulations,where the coarse-grained (CG) particles are composed of $m$ species whose reaction rate kinetics are determined from a set of $n$ reaction rate equations through the $f(x r x\$ command. The species of one CG particle can interact with a species in a neighboring CG particle through a site-site interaction potential model. Style table/rx creates interpolation tables of length $N$ from pair potential and force values listed in a file(s) as a function of distance. The files are read by the pair_coeff command.  

The interpolation tables are created by fitting cubic splines to the file values and interpolating energy and force values at each of $N$ distances. During a simulation, these tables are used to interpolate energy and force values as needed. The interpolation is done in one of 4 styles: lookup, linear, spline, or bitmap.  

For the lookup style, the distance between two atoms is used to find the nearest table entry, which is the energy or force.  

For the linear style, the pair distance is used to find 2 surrounding table values from which an energy or force is computed by linear interpolation.  

For the spline style, a cubic spline coefficients are computed and stored at each of the $N$ values in the table. The pair distance is used to find the appropriate set of coefficients which are used to evaluate a cubic polynomial which computes the energy or force.  

For the bitmap style, the N means to create interpolation tables that are 2^N in length. The pair distance is used to index into the table via a fast bit-mapping technique (Wolff) and a linear interpolation is performed between adjacent table values.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above.  

• filename   
• keyword   
• species1   
• species2   
• cutoff (distance units)  

The filename specifies a file containing tabulated energy and force values. The keyword specifies a section of the file. The cutoff is an optional coefficient. If not specified, the outer cutoff in the table itself (see below) will be used to build an interpolation table that extend to the largest tabulated distance. If specified, only file values up to the cutoff are used to create the interpolation table. The format of this file is described below.  

The species tags define the site-site interaction potential between two species contained within two different particles. The species tags must either correspond to the species defined in the reaction kinetics files specified with the fix $r x$ command or they must correspond to the tag “1fluid”, signifying interaction with a product species mixture determined through a one-fluid approximation. The interaction potential is weighted by the geometric average of either the mole fraction concentrations or the number of molecules associated with the interacting coarse-grained particles (see the fractional or molecular weighting pair style options). The coarse-grained potential is stored before and after the reaction kinetics solver is applied, where the difference is defined to be the internal chemical energy (uChem).  

Here are some guidelines for using the pair_style table/rx command to best effect:  

• Vary the number of table points; you may need to use more than you think to get good resolution.   
• Always use the pair_write command to produce a plot of what the final interpolated potential looks like. This can show up interpolation “features” you may not like.   
• Start with the linear style; it’s the style least likely to have problems.   
• Use $N$ in the pair_style command equal to the “N” in the tabulation file, and use the “RSQ” or “BITMAP” parameter, so additional interpolation is not needed. See discussion below.   
• Make sure that your tabulated forces and tabulated energies are consistent $\mathrm{{dE/dr=-F},}$ along the entire range of r values.   
• Use as large an inner cutoff as possible. This avoids fitting splines to very steep parts of the potential.  

The format of a tabulated file is a series of one or more sections, defined as follows (without the parenthesized comments):  

<html><body><table><tr><td colspan="2"># Morse potential for Fe e(one or more comment or blank lines)</td></tr><tr><td>MORSE FE</td><td>(keyword is first text on line)</td></tr><tr><td>N 500 R 1.0 10.0</td><td>(N, R, RSQ, BITMAP, FPRIME parameters)</td></tr><tr><td colspan="2">(blank)</td></tr><tr><td>1 1.0 25.5 102.34</td><td>(index, r, energy, force)</td></tr><tr><td>2 1.0223.498.5</td><td></td></tr><tr><td></td><td></td></tr><tr><td>50010.00.001 0.003</td><td></td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The line can contain additional text, but the initial text must match the argument specified in the pair_coeff command. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

The parameter “N” is required and its value is the number of table entries that follow. Note that this may be different than the $N$ specified in the pair_style table/rx command. Let Ntable $=N$ in the pair_style command, and Nfile $=$ “N” in the tabulated file. What LAMMPS does is a preliminary interpolation by creating splines using the Nfile tabulated values as nodal points. It uses these to interpolate as needed to generate energy and force values at Ntable different points. The resulting tables of length Ntable are then used as described above, when computing energy and force for individual pair distances. This means that if you want the interpolation tables of length Ntable to match exactly what is in the tabulated file (with effectively no preliminary interpolation), you should set Ntable $=$ Nfile, and use the “RSQ” or “BITMAP” parameter. The internal table abscissa is RSQ (separation distance squared).  

All other parameters are optional. If “R” or “RSQ” or “BITMAP” does not appear, then the distances in each line of the table are used as-is to perform spline interpolation. In this case, the table values can be spaced in $r$ uniformly or however you wish to position table values in regions of large gradients.  

If used, the parameters “R” or “RSQ” are followed by 2 values rlo and rhi. If specified, the distance associated with each energy and force value is computed from these 2 values (at high accuracy), rather than using the (low-accuracy) value listed in each line of the table. The distance values in the table file are ignored in this case. For “R”, distances uniformly spaced between rlo and rhi are computed; for “RSQ”, squared distances uniformly spaced between rlo\*rlo and rhi\*rhi are computed.  

If used, the parameter “BITMAP” is also followed by 2 values rlo and rhi. These values, along with the “N” value determine the ordering of the N lines that follow and what distance is associated with each. This ordering is complex, so it is not documented here, since this file is typically produced by the pair_write command with its bitmap option. When the table is in BITMAP format, the “N” parameter in the file must be equal to $2\mathsf{M}$ where M is the value specified in the pair_style command. Also, a cutoff parameter cannot be used as an optional third argument in the pair_coeff command; the entire table extent as specified in the file must be used.  

If used, the parameter “FPRIME” is followed by 2 values fplo and fphi which are the derivative of the force at the innermost and outermost distances listed in the table. These values are needed by the spline construction routines. If not specified by the “FPRIME” parameter, they are estimated (less accurately) by the first 2 and last 2 force values in the table. This parameter is not used by BITMAP tables.  

Following a blank line, the next N lines list the tabulated values. On each line, the first value is the index from 1 to N, the second value is r (in distance units), the third value is the energy (in energy units), and the fourth is the force (in force units). The r values must increase from one line to the next (unless the BITMAP parameter is specified).  

Note that one file can contain many sections, each with a tabulated potential. LAMMPS reads the file section by section until it finds one that matches the specified keyword.  

# 4.270.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly.  

The pair_modify shift, table, and tail options are not relevant for this pair style.  

This pair style writes the settings for the “pair_style table/rx” command to binary restart files, so a pair_style command does not need to specified in an input script that reads a restart file. However, the coefficient information is not stored in the restart file, since it is tabulated in the potential files. Thus, pair_coeff commands do need to be specified in the restart input script.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.270.5 Restrictions  

This command is part of the DPD-REACT package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.270.6 Related commands  

pair_coeff  

# 4.270.7 Default  

fractional weighting  

(Wolff) Wolff and Rudd, Comp Phys Comm, 120, 200-32 (1999).  

# 4.271 pair_style tersoff command  

Accelerator Variants: tersoff/gpu, tersoff/intel, tersoff/kk, tersoff/omp  

# 4.272 pair_style tersoff/table command  

Accelerator Variants: tersoff/table/omp  

# 4.272.1 Syntax  

pair_style style keywords values  

• style $=$ tersoff or tersoff/table   
• keyword $=$ shift shift value $=$ delta delta $=$ negative shift in equilibrium bond length  

# 4.272.2 Examples  

pair_style tersoff pair_coeff \* \* Si.tersoff Si pair_coeff \* \* SiC.tersoff Si C Si pair_style tersoff/table pair_coeff \* \* SiCGe.tersoff Si(D) pair_style tersoff shift 0.05 pair_coeff \* \* Si.tersoff Si  

# 4.272.3 Description  

The tersoff style computes a 3-body Tersoff potential (Tersoff_1) for the energy $\mathrm{E}$ of a system of atoms as  

$$
\begin{array}{l}{{\displaystyle E_{\frac{1}{2}}\sum_{i,j\neq i}V_{i j}}}\ {{\displaystyle V_{i j}=f_{c}(r_{j}+\delta)\left[f_{R}(r_{j}+\delta)+b_{i j}f_{G}(r_{j}+\delta)\right]}}\ {{\displaystyle V_{i j}=f_{c}(r_{j}+\delta)\left[f_{R}(r_{j}-\frac{1}{R})^{\frac{1}{2}}:\begin{array}{c}{{r<R-D}}\ {{\vdots}}\end{array}\right]}}\ {{\displaystyle f_{\mathcal{F}}(r)=\left\{\frac{1}{2}-\frac{1}{2}\sin\left(\frac{\pi}{2}\frac{R}{R}\right)^{\frac{1}{2}}:\begin{array}{c}{{R-D<r<R+D}}\ {{\vdots}}\end{array}\right.}}\ {{\displaystyle f_{\mathcal{F}}(r)=A\mathrm{cov}(-\lambda_{T})}}\ {{\displaystyle f_{A}(r)=R\mathrm{cov}(-\lambda_{T}r)}}\ {{\displaystyle V_{i j}=\left(1+\beta^{\prime}\frac{\nu_{j}}{r_{j}}\right)^{-\delta}}}\ {{\displaystyle\zeta_{i j}=\sum_{i,j\neq i}\sum_{j\neq i}\left[\theta_{j k}(r_{j i},r_{i j})\right]\exp\left[\lambda_{j}^{\mathbf{n}}(r_{j j}-r_{k i})^{\mathbf{n}}\right]}}\ {{\displaystyle\xi_{j j}=\left\{\sum_{i,j\neq j}\left(r_{i}+\delta)\left[g_{i j}(r_{j i},r_{i j},r_{i i})\right]\right.\right.}}\ {{\displaystyle\left.\left.g(\theta)=\gamma_{i k}\left(1+\frac{\epsilon^{2}}{d^{2}}-\frac{\epsilon^{2}}{\left[d^{2}+(\cos\theta-\cos\theta_{0})^{2}\right]}\right)\right]}}\end{array}
$$  

where $f_{R}$ is a two-body term and $f_{A}$ includes three-body interactions. The summations in the formula are over all neighbors J and $\mathbf{K}$ of atom I within a cutoff distance $=\mathrm{R}+\mathrm{D}$ . $\delta$ is an optional negative shift of the equilibrium bond length, as described below.  

The tersoff/table style uses tabulated forms for the two-body, environment and angular functions. Linear interpolation is performed between adjacent table entries. The table length is chosen to be accurate within $10\mathsf{\Lambda}_{-6}$ with respect to the tersoff style energy. The tersoff/table should give better performance in terms of speed.  

Only a single pair_coeff command is used with the tersoff style which specifies a Tersoff potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying $\mathbf{N}$ additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename  

• N element names $=$ mapping of Tersoff elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine the SiC.tersoff file has Tersoff values for Si and C. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Si, and the fourth to be C, you would use the following pair_coeff command:  

pair_coeff \* \* SiC.tersoff Si Si Si C  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three Si arguments map LAMMPS atom types 1,2,3 to the Si element in the Tersoff file. The final C argument maps LAMMPS atom type 4 to the C element in the Tersoff file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a tersoff potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Tersoff files in the potentials directory of the LAMMPS distribution have a “.tersoff” suffix. Lines that are not blank or comments (starting with #) define parameters for a triplet of elements. The parameters in a single entry correspond to coefficients in the formula above:  

• element 1 (the center atom in a 3-body interaction)   
• element 2 (the atom bonded to the center atom)   
• element 3 (the atom influencing the 1-2 bond in a bond-order sense)   
• m   
• γ   
• $\lambda_{3}$ (1/distance units)   
• c   
• d   
• cos $\theta_{0}$ (can be a value $<-1$ or $>1$ )   
• n   
• $\beta$   
• $\lambda_{2}$ (1/distance units)   
• B (energy units)   
• R (distance units)   
• D (distance units)   
• $\lambda_{1}$ (1/distance units)   
• A (energy units)  

The n, $\beta,\lambda_{2}$ , B, $\lambda_{1}$ , and A parameters are only used for two-body interactions. The m, γ, $\lambda_{3}$ , c, d, and $\cos\theta_{0}$ parameters are only used for three-body interactions. The R and D parameters are used for both two-body and three-body interactions. The non-annotated parameters are unitless. The value of m must be 3 or 1.  

The Tersoff potential file must contain entries for all the elements listed in the pair_coeff command. It can also contain entries for additional elements not being used in a particular simulation; LAMMPS ignores those entries.  

For a single-element simulation, only a single entry is required (e.g. SiSiSi). For a two-element simulation, the file must contain 8 entries (for SiSiSi, SiSiC, SiCSi, SiCC, CSiSi, CSiC, CCSi, CCC), that specify Tersoff parameters for all permutations of the two elements interacting in three-body configurations. Thus for 3 elements, 27 entries would be required, etc.  

As annotated above, the first element in the entry is the center atom in a three-body interaction and it is bonded to the second atom and the bond is influenced by the third atom. Thus an entry for SiCC means Si bonded to a C with another C atom influencing the bond. Thus three-body parameters for SiCSi and SiSiC entries will not, in general, be the same. The parameters used for the two-body interaction come from the entry where the second element is repeated. Thus the two-body parameters for Si interacting with C, comes from the SiCC entry.  

The parameters used for a particular three-body interaction come from the entry with the corresponding three elements. The parameters used only for two-body interactions (n, $\beta,\lambda_{2}$ , B, $\lambda_{1}$ , and A) in entries whose second and third element are different (e.g. SiCSi) are not used for anything and can be set to 0.0 if desired.  

Note that the twobody parameters in entries such as SiCC and CSiSi are often the same, due to the common use of symmetric mixing rules, but this is not always the case. For example, the beta and n parameters in Tersoff_2 (Tersoff_2) are not symmetric. Similarly, the threebody parameters in entries such as SiCSi and SiSiC are often the same, but this is not always the case, particularly the value of R, which is sometimes typed on the first and second elements, sometimes on the first and third elements. Hence the need to specify R and D explicitly for all element triples. For example, while Tersoff’s notation in Tersoff_2 (Tersoff_2) is ambiguous on this point, and properties of the zincblende lattice are the same for either choice, Tersoff’s results for rocksalt are consistent with typing on the first and third elements. Albe et al. adopts the same convention. Conversely, the potential for B/N/C from the Cagin group uses the opposite convention, typing on the first and second elements.  

We chose the above form so as to enable users to define all commonly used variants of the Tersoff potential. In particular, our form reduces to the original Tersoff form when $\mathrm{m}=3$ and gamma $=1$ , while it reduces to the form of Albe et al. when beta $=1$ and $\mathrm{m}=1$ . Note that in the current Tersoff implementation in LAMMPS, m must be specified as either 3 or 1. Tersoff used a slightly different but equivalent form for alloys, which we will refer to as Tersoff_2 potential (Tersoff_2). The tersoff/table style implements Tersoff_2 parameterization only.  

LAMMPS parameter values for Tersoff_2 can be obtained as follows: $\gamma_{i j k}=\omega_{i k}$ , $\lambda_{3}\mathrm{~=~}0$ and the value of m has no effect. The parameters for species i and j can be calculated using the Tersoff_2 mixing rules:  

$$
\begin{array}{l}{\lambda_{1}^{i,j}=\frac{1}{2}(\lambda_{1}^{i}+\lambda_{1}^{j})}\ {\lambda_{2}^{i,j}=\frac{1}{2}(\lambda_{2}^{i}+\lambda_{2}^{j})}\ {A_{i,j}=(A_{i}A_{j})^{1/2}}\ {B_{i,j}=\chi_{i j}(B_{i}B_{j})^{1/2}}\ {R_{i,j}=(R_{i}R_{j})^{1/2}}\ {S_{i,j}=(S_{i}S_{j})^{1/2}}\end{array}
$$  

Tersoff_2 parameters R and S must be converted to the LAMMPS parameters $\mathbf{R}$ and $\mathrm{D}$ (R is different in both forms), using the following relations: $\mathrm{R}{=}(\mathrm{R}^{\prime}{+}\mathrm{S}^{\prime})/2$ and ${\mathrm{D}}{=}(\mathrm{S}^{,}{-}{\mathrm{R}}^{,})/2$ , where the primes indicate the Tersoff_2 parameters.  

In the potentials directory, the file SiCGe.tersoff provides the LAMMPS parameters for Tersoff’s various versions of Si, as well as his alloy parameters for Si, C, and Ge. This file can be used for pure Si, (three different versions), pure C, pure Ge, binary SiC, and binary SiGe. LAMMPS will generate an error if this file is used with any combination involving C and $\mathrm{Ge}$ , since there are no entries for the GeC interactions (Tersoff did not publish parameters for this cross-interaction.) Tersoff files are also provided for the SiC alloy (SiC.tersoff) and the GaN (GaN.tersoff) alloys.  

Many thanks to Rutuparna Narulkar, David Farrell, and Xiaowang Zhou for helping clarify how Tersoff parameters for alloys have been defined in various papers.  

The shift keyword computes the energy E of a system of atoms, whose formula is the same as the Tersoff potential. The only modification is that the original equilibrium bond length $\left(\begin{array}{l}{r_{0}}\end{array}\right)$ of the system is shifted to $r_{0}-\delta$ . The minus sign arises because each radial distance $r$ is replaced by $r+\delta$ .  

The shift keyword is designed for simulations of closely matched van der Waals heterostructures. For instance, consider the case of a system with few-layers graphene atop a thick hexagonal boron nitride (h-BN) substrate simulated using periodic boundary conditions. The experimental lattice mismatch of ${\sim}1.8\%$ between graphene and h-BN is not well captured by the equilibrium lattice constants of available potentials, thus a small in-plane strain will be introduced in the system when building a periodic supercell. To minimize the effect of strain on simulation results, the shift keyword allows adjusting the equilibrium bond length of one of the two materials (e.g., h-BN). Validation, benchmark tests, and applications of the shift keyword can be found in (Mandelli_1) and (Ouyang_1).  

For the specific case discussed above, the force field can be defined as  

<html><body><table><tr><td>pair style</td><td colspan="4">hybrid/overlay rebo tersoff shift -0.00407 ilp/ graphene/hbn 16.0 coul/shield 16.0</td></tr><tr><td>pair coeff</td><td>** rebo</td><td colspan="4">CH.rebo NULL NULL C</td></tr><tr><td>pair coeff</td><td>tersoff</td><td colspan="4">BNC.tersoff B N NULL</td></tr><tr><td>pair coeff</td><td colspan="4">* * ilp graphene e/hbn BNCH.ILP</td><td>N ?</td></tr><tr><td>pair coeff</td><td>1 1 coul</td><td colspan="4">shield 0.70</td></tr><tr><td>pair coeff</td><td colspan="4">1 2 coul shield 0.695</td><td></td></tr><tr><td>pair coeff</td><td>22coul</td><td colspan="4">shield 0.69</td></tr></table></body></html>  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.272.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS as described above from values in the potential file.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.272.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

The shift keyword is not supported by the tersoff/gpu, tersoff/intel, tersoff/kk, tersoff/table or tersoff/table/omp variants.  

The tersoff/intel pair style is only available when compiling LAMMPS with the Intel compilers.  

The Tersoff potential files provided with LAMMPS (see the potentials directory) are parameterized for “metal” units. In addition the pair style supports converting potential parameters on-the-fly between “metal” and “real” units. You can use the tersoff pair style variants with any LAMMPS units setting, but you would need to create your own Tersoff potential file with coefficients listed in the appropriate units if your simulation does not use “metal” or “real” units.  

# 4.272.6 Related commands  

pair_coeff  

# 4.272.7 Default  

shift delta $=0.0$  

(Tersoff_1) J. Tersoff, Phys Rev B, 37, 6991 (1988).   
(Albe) J. Nord, K. Albe, P. Erhart, and K. Nordlund, J. Phys.: Condens. Matter, 15, 5649(2003).   
(Tersoff_2) J. Tersoff, Phys Rev B, 39, 5566 (1989); errata (PRB 41, 3248) (Mandelli_1) D. Mandelli, W. Ouyang, M. Urbakh, and O. Hod, ACS Nano 13(7), 7603-7609 (2019).   
(Ouyang_1) W. Ouyang et al., J. Chem. Theory Comput. 16(1), 666-676 (2020).  

# 4.273 pair_style tersoff/mod command  

Accelerator Variants: tersoff/mod/gpu, tersoff/mod/kk, tersoff/mod/omp  

# 4.274 pair_style tersoff/mod/c command  

Accelerator Variants: tersoff/mod/c/omp  

# 4.274.1 Syntax  

energy $\mathrm{E}$ of a system of atoms as  

$$
\begin{array}{r l}&{\quad E=\frac{1}{2}\sum_{i,j=1\atop i\neq j}^{\infty}\frac{\Gamma_{i j}}{\Gamma_{i j}}}\ &{\quad E_{i j}=E(r_{i}+\delta)\left\{R(r_{i}+\delta)+b_{i j}f_{i}(r_{i}+\delta)+1\right\}}\ &{\quad V_{i j}=f_{i}(r_{i}+\delta)\left\{R(r_{i}+\delta)+b_{i j}(r_{i}+\delta)\right\}}\ &{\quad E(r)=\left\{\begin{array}{l l}{1}&{0}\ {1}&{0\leq r<R+D}\ {0}&{1}\end{array}\right\}\cdot R^{\delta}-R^{\delta}<F<F^{\delta}}\ &{\quad E(r)=A\exp(-\lambda_{i})}\ &{\quad\int_{\mathrm{c}}(r)-B\exp(-\lambda_{i})}\ &{\quad V_{i j}=\left(1+\xi_{j}^{\prime}\right)^{-1}}\ &{\quad\int_{\mathrm{c}}f_{i}(r_{i}+\delta)\geq\left\{R(\theta_{i})\exp\left[\alpha(r_{i}-r_{i})^{\theta}\right]\right\}}\ &{\quad E(\theta)=c_{1}+\alpha_{i}\theta_{i}\log_{i}(\theta)}\ &{\quad E(\theta)=\frac{c_{1}+\alpha_{i}\left(\theta_{i}\right)\sum_{i=0\atop i\neq j}^{\infty}}{\left(\alpha_{i}+\alpha_{j}\right)^{\theta}\left(\alpha_{i}-\alpha_{i}\theta_{j}\right)^{2}}}\ &{\quad E(\theta)=1+\alpha_{i}\exp(-\xi_{0}(k-\cos\theta_{i})^{2})}\end{array}
$$  

where $f_{R}$ is a two-body term and $f_{A}$ includes three-body interactions. $\delta$ is an optional negative shift of the equilibrium bond length, as described below.  

The summations in the formula are over all neighbors J and $\mathbf{K}$ of atom I within a cutoff distance $=\mathrm{~R~}+\mathrm{~D~}$ . The tersoff/mod/c style differs from tersoff/mod only in the formulation of the $\mathrm{~V~}_{-}\mathrm{ij}$ term, where it contains an additional c0 term.  

$$
V_{i j}=f_{C}(r_{i j}+\delta)\left[f_{R}(r_{i j}+\delta)+b_{i j}f_{A}(r_{i j}+\delta)+c_{0}\right]
$$  

The modified cutoff function $f_{C}$ proposed by (Murty) and having a continuous second-order differential is employed.   
The angular-dependent term $g(\theta)$ was modified to increase the flexibility of the potential.  

The tersoff/mod potential is fitted to both the elastic constants and melting point by employing the modified Tersoff potential function form in which the angular-dependent term is improved. The model performs extremely well in describing the crystalline, liquid, and amorphous phases (Schelling).  

Only a single pair_coeff command is used with the tersoff/mod style which specifies a Tersoff/MOD potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where $\mathbf{N}$ is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of Tersoff/MOD elements to atom types  

As an example, imagine the Si.tersoff_mod file has Tersoff values for Si. If your LAMMPS simulation has 3 Si atoms types, you would use the following pair_coeff command:  

pair_coeff \* \* Si.tersoff_mod Si Si Si  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The three Si arguments map LAMMPS atom types 1,2,3 to the Si element in the Tersoff/MOD file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a tersoff/mod potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Tersoff/MOD file in the potentials directory of the LAMMPS distribution have a “.tersoff.mod” suffix. Potential files for the tersoff/mod/c style have the suffix “.tersoff.modc”. Lines that are not blank or comments (starting with #) define parameters for a triplet of elements. The parameters in a single entry correspond to coefficients in the formulae above:  

• element 1 (the center atom in a 3-body interaction)   
• element 2 (the atom bonded to the center atom)   
• element 3 (the atom influencing the 1-2 bond in a bond-order sense)   
• $\beta$   
• $\alpha$   
$\bullet\mathrm{~h~}$   
• $\eta$   
• $\beta_{t e r s}=1$ (dummy parameter)   
• $\lambda_{2}$ (1/distance units)   
• B (energy units)   
• R (distance units)   
• D (distance units)   
• $\lambda_{1}$ (1/distance units)   
• A (energy units)   
• n   
• c1   
• c2   
• c3   
• c4   
• c5   
• c0 (energy units, tersoff/mod/c only)  

The n, $\eta$ , $\lambda_{2}$ , B, $\lambda_{1}$ , and A parameters are only used for two-body interactions. The $\beta$ , $\alpha$ , c1, c2, c3, c4, c5, h parameters are only used for three-body interactions. The R and D parameters are used for both two-body and threebody interactions. The c0 term applies to tersoff/mod/c only. The non-annotated parameters are unitless.  

The Tersoff/MOD potential file must contain entries for all the elements listed in the pair_coeff command. It can also contain entries for additional elements not being used in a particular simulation; LAMMPS ignores those entries.  

For a single-element simulation, only a single entry is required (e.g. SiSiSi). As annotated above, the first element in the entry is the center atom in a three-body interaction and it is bonded to the second atom and the bond is influenced by the third atom. Thus an entry for SiSiSi means Si bonded to a Si with another Si atom influencing the bond.  

The shift keyword computes the energy E of a system of atoms, whose formula is the same as the Tersoff potential. The only modification is that the original equilibrium bond length $\left(\begin{array}{l}{r_{0}}\end{array}\right)$ of the system is shifted to $r_{0}-\delta$ . The minus sign arises because each radial distance $r$ is replaced by $r+\delta$ . More information on this option is given on the main pair_tersoff page.  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.274.4 Mixing, shift, table, tail correction, restart, rRESPA info  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.274.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

he shift keyword is not supported by the tersoff/gpu, tersoff/intel, tersoff/kk, tersoff/table or tersoff/table/omp variants.  

The tersoff/mod potential files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use the tersoff/mod pair style with any LAMMPS units, but you would need to create your own Tersoff/MOD potential file with coefficients listed in the appropriate units if your simulation does not use “metal” units.  

# 4.274.6 Related commands  

pair_coeff  

# 4.274.7 Default  

none  

(Kumagai) T. Kumagai, S. Izumi, S. Hara, S. Sakai, Comp. Mat. Science, 39, 457 (2007).   
(Tersoff_1) J. Tersoff, Phys Rev B, 37, 6991 (1988).   
(Tersoff_2) J. Tersoff, Phys Rev B, 38, 9902 (1988).   
(Murty) M.V.R. Murty, H.A. Atwater, Phys Rev B, 51, 4889 (1995).   
(Schelling) Patrick K. Schelling, Comp. Mat. Science, 44, 274 (2008).  

# 4.275 pair_style tersoff/zbl command  

Accelerator Variants: tersoff/zbl/gpu, tersoff/zbl/kk, tersoff/zbl/omp  

# 4.275.1 Syntax  

pair_style tersoff/zbl keywords values  

• keyword $=$ shift shift value $=$ delta delta $=$ negative shift in equilibrium bond length  

# 4.275.2 Examples  

pair_style tersoff/zblpair_coeff \* \* SiC.tersoff.zbl Si C Si  

# 4.275.3 Description  

The tersoff/zbl style computes a 3-body Tersoff potential (Tersoff_1) with a close-separation pairwise modification based on a Coulomb potential and the Ziegler-Biersack-Littmark universal screening function (ZBL), giving the energy E of a system of atoms as  

$$
\begin{array}{l}{{\displaystyle{\cal E}=\frac{1}{2}\sum_{i}\sum_{j\neq i}V_{i j}}}\ {{\displaystyle V_{i j}=(1-f_{F}(r_{i j}+\delta))V^{Z B L}(r_{i j}+\delta)+f_{F}(r_{i j}+\delta)V^{T e r s o f f}(r_{i j}+\delta)}}\ {{f_{F}(r)=\displaystyle{\frac{1}{1+e^{-A_{F}(r-r_{c})}}}}}\end{array}
$$  

$$
\begin{array}{l}{{{\displaystyle{\cal V}^{Z B L}(r)=\frac{1}{4\pi\varepsilon_{0}}\frac{Z_{1}Z_{2}e^{2}}{r}\phi(r/a)}~}}\ {{{\nonumber}}}\ {{{\displaystyle a=\frac{0.8854a_{0}}{Z_{1}^{0.23}+Z_{2}^{0.23}}}}}\ {{{\phi(x)=0.1818e^{-3.2x}+0.5099e^{-0.9423x}+0.2802e^{-0.4029x}+0.02817e^{-0.2016x}}}}\end{array}
$$  

$$
\begin{array}{r l}{\gamma F e r o s f(r)=f_{C}(r)\left[f_{R}(r)+b_{i j}f_{A}(r)\right]}&{}\ {1}&{:~r<R-D}\ {f_{C}(r)=\left\{\begin{array}{l l}{\frac{1}{2}-\frac{1}{2}\sin\left(\frac{\pi}{2}-\frac{R^{2}}{2}\right)}&{:~R-D<r<R+D}\ {\frac{1}{2}-\frac{1}{2}\sin\left(\frac{\pi}{2}-\frac{R^{2}}{2}\right)}&{:~R->R+D}\end{array}\right.}\ {f_{R}(r)=A\exp(-\lambda_{1}r)}&{}\ {f_{A}(r)=-B\exp(-\lambda_{2}r)}\ {~b_{i j}=\left(1+\beta^{2}\zeta_{i j}^{(1)}\right)-\frac{1}{2}}\ {~\zeta_{i j}=\displaystyle\sum_{k\neq i_{j}}f_{C}(r_{i k}+\delta)g(\theta_{i j k})\exp\left[\lambda_{\mathrm{s}}^{(0)}(r_{i j}-r_{i k})^{\alpha}\right]}\ {~}\ {g(\theta)=\mathbb{Y}_{\mid\mathcal{X}}\left(1+\frac{\epsilon^{2}}{d^{2}}-\frac{\epsilon^{2}}{\left[d^{2}+(\cos\theta-\cos\theta_{0})^{2}\right]}\right)}\end{array}
$$  

The $f_{F}$ term is a fermi-like function used to smoothly connect the ZBL repulsive potential with the Tersoff potential. There are 2 parameters used to adjust it: $A_{F}$ and $r_{C}$ . $A_{F}$ controls how “sharp” the transition is between the two, and $r_{C}$ is essentially the cutoff for the ZBL potential.  

For the ZBL portion, there are two terms. The first is the Coulomb repulsive term, with Z1, Z2 as the number of protons in each nucleus, e as the electron charge (1 for metal and real units) and $\varepsilon_{0}$ as the permittivity of vacuum. The second part is the ZBL universal screening function, with a0 being the Bohr radius (typically 0.529 Angstroms), and the remainder of the coefficients provided by the original paper. This screening function should be applicable to most systems. However, it is only accurate for small separations (i.e. less than 1 Angstrom).  

For the Tersoff portion, $f_{R}$ is a two-body term and $f_{A}$ includes three-body interactions. The summations in the formula are over all neighbors J and K of atom I within a cutoff distance $=\mathsf{R}+\mathsf{D}$ .  

$\delta$ is an optional negative shift of the equilibrium bond length, as described below.  

Only a single pair_coeff command is used with the tersoff/zbl style which specifies a Tersoff/ZBL potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where $\mathbf{N}$ is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of Tersoff/ZBL elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine the SiC.tersoff.zbl file has Tersoff/ZBL values for Si and C. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Si, and the fourth to be C, you would use the following pair_coeff command:  

pair_coeff \* \* SiC.tersoff Si Si Si C  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three Si arguments map LAMMPS atom types 1,2,3 to the Si element in the Tersoff/ZBL file. The final C argument maps LAMMPS atom type 4 to the C element in the Tersoff/ZBL file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a tersoff/zbl potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Tersoff/ZBL files in the potentials directory of the LAMMPS distribution have a “.tersoff.zbl” suffix. Lines that are not blank or comments (starting with #) define parameters for a triplet of elements. The parameters in a single entry correspond to coefficients in the formula above:  

• element 1 (the center atom in a 3-body interaction)   
• element 2 (the atom bonded to the center atom)   
• element 3 (the atom influencing the 1-2 bond in a bond-order sense)   
• m   
• γ   
• $\lambda_{3}$ (1/distance units)   
• c   
• d   
• cos $\theta_{0}$ (can be a value $<-1\mathrm{or}>1$ )   
• n   
• $\beta$   
• $\lambda_{2}$ (1/distance units)   
• B (energy units)   
• R (distance units)   
• D (distance units)   
• $\lambda_{1}$ (1/distance units)   
• A (energy units)   
• $Z_{i}$   
• $Z_{j}$   
• ZBLcut (distance units)   
• ZBLexpscale (1/distance units)  

The n, $\beta,\lambda_{2}$ , B, $\lambda_{1}$ , and A parameters are only used for two-body interactions. The m, γ, $\lambda_{3}$ , c, d, and cos $\theta_{0}$ parameters are only used for three-body interactions. The R and D parameters are used for both two-body and three-body interactions. The $Z_{i}$ , $Z_{j}$ , ZBLcut, ZBLexpscale parameters are used in the ZBL repulsive portion of the potential and in the Fermi-like function. The non-annotated parameters are unitless. The value of m must be 3 or 1.  

The Tersoff/ZBL potential file must contain entries for all the elements listed in the pair_coeff command. It can also contain entries for additional elements not being used in a particular simulation; LAMMPS ignores those entries.  

For a single-element simulation, only a single entry is required (e.g. SiSiSi). For a two-element simulation, the file must contain 8 entries (for SiSiSi, SiSiC, SiCSi, SiCC, CSiSi, CSiC, CCSi, CCC), that specify Tersoff parameters for all permutations of the two elements interacting in three-body configurations. Thus for 3 elements, 27 entries would be required, etc.  

As annotated above, the first element in the entry is the center atom in a three-body interaction and it is bonded to the second atom and the bond is influenced by the third atom. Thus an entry for SiCC means Si bonded to a C with another C atom influencing the bond. Thus three-body parameters for SiCSi and SiSiC entries will not, in general, be the same. The parameters used for the two-body interaction come from the entry where the second element is repeated. Thus the two-body parameters for Si interacting with C, comes from the SiCC entry.  

The parameters used for a particular three-body interaction come from the entry with the corresponding three elements. The parameters used only for two-body interactions (n, $\beta,\lambda_{2}$ , B, $\lambda_{1}$ , and A) in entries whose second and third element are different (e.g. SiCSi) are not used for anything and can be set to 0.0 if desired.  

Note that the twobody parameters in entries such as SiCC and CSiSi are often the same, due to the common use of symmetric mixing rules, but this is not always the case. For example, the beta and n parameters in Tersoff_2 (Tersoff_2) are not symmetric.  

We chose the above form so as to enable users to define all commonly used variants of the Tersoff portion of the potential. In particular, our form reduces to the original Tersoff form when $\mathrm{m}=3$ and gamma $=1$ , while it reduces to the form of Albe et al. when beta $=1$ and $\mathrm{m}=1$ . Note that in the current Tersoff implementation in LAMMPS, m must be specified as either 3 or 1. Tersoff used a slightly different but equivalent form for alloys, which we will refer to as Tersoff_2 potential (Tersoff_2).  

LAMMPS parameter values for Tersoff_2 can be obtained as follows: $\gamma=\omega_{i j k}$ , $\lambda_{3}=0$ and the value of m has no effect. The parameters for species i and j can be calculated using the Tersoff_2 mixing rules:  

$$
\begin{array}{l}{\lambda_{1}^{i,j}=\frac{1}{2}(\lambda_{1}^{i}+\lambda_{1}^{j})}\ {\lambda_{2}^{i,j}=\frac{1}{2}(\lambda_{2}^{i}+\lambda_{2}^{j})}\ {A_{i,j}=(A_{i}A_{j})^{1/2}}\ {B_{i,j}=\chi_{i j}(B_{i}B_{j})^{1/2}}\ {R_{i,j}=(R_{i}R_{j})^{1/2}}\ {S_{i,j}=(S_{i}S_{j})^{1/2}}\end{array}
$$  

Tersoff_2 parameters R and S must be converted to the LAMMPS parameters $\mathbf{R}$ and $\mathrm{D}$ (R is different in both forms), using the following relations: $\mathrm{R}{=}(\mathrm{R}^{\prime}{+}\mathrm{S}^{\prime})/2$ and ${\mathrm{D}}{=}(\mathrm{S}^{,}{-}{\mathrm{R}}^{,})/2$ , where the primes indicate the Tersoff_2 parameters.  

In the potentials directory, the file SiCGe.tersoff provides the LAMMPS parameters for Tersoff’s various versions of Si, as well as his alloy parameters for Si, C, and Ge. This file can be used for pure Si, (three different versions), pure C, pure Ge, binary SiC, and binary SiGe. LAMMPS will generate an error if this file is used with any combination involving C and Ge, since there are no entries for the $\mathrm{GeC}$ interactions (Tersoff did not publish parameters for this cross-interaction.) Tersoff files are also provided for the SiC alloy (SiC.tersoff) and the GaN (GaN.tersoff) alloys.  

Many thanks to Rutuparna Narulkar, David Farrell, and Xiaowang Zhou for helping clarify how Tersoff parameters for alloys have been defined in various papers. Also thanks to Ram Devanathan for providing the base ZBL implementation.  

The shift keyword computes the energy $\mathrm{\bfE}$ of a system of atoms, whose formula is the same as the Tersoff potential. The only modification is that the original equilibrium bond length $\left(\begin{array}{l}{r_{0}}\end{array}\right)$ of the system is shifted to $r_{0}-\delta$ . The minus sign arises because each radial distance $r$ is replaced by $r+\delta$ . More information on this option is given on the main pair_tersoff page.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.275.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS as described above from values in the potential file.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.275.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

The shift keyword is currently not supported for the tersoff/gpu and tersoff/kk variants of this pair style.  

The tersoff/zbl potential files provided with LAMMPS (see the potentials directory) are parameterized for “metal” units. Also the pair style supports converting potential file parameters on-the-fly between “metal” and “real” units. You can use the tersoff/zbl pair style with any LAMMPS units, but you would need to create your own tersoff/zbl potential file with coefficients listed in the appropriate units if your simulation does not use “metal” or “real” units.  

# 4.275.6 Related commands  

pair_coeff  

# 4.275.7 Default  

none  

(Tersoff_1) J. Tersoff, Phys Rev B, 37, 6991 (1988).   
(ZBL) J.F. Ziegler, J.P. Biersack, U. Littmark, ‘Stopping and Ranges of Ions in Matter’ Vol 1, 1985, Pergamon Press. (Albe) J. Nord, K. Albe, P. Erhart and K. Nordlund, J. Phys.: Condens. Matter, 15, 5649(2003).   
(Tersoff_2) J. Tersoff, Phys Rev B, 39, 5566 (1989); errata (PRB 41, 3248)  

# 4.276 pair_style thole command  

# 4.277 pair_style lj/cut/thole/long command  

Accelerator Variants: lj/cut/thole/long/omp  

# 4.277.1 Syntax  

• style $=$ thole or lj/cut/thole/long args $=$ list of arguments for a particular style  

thole args $=$ damp cutoff damp $=$ global damping parameter cutoff $=$ global cutoff (distance units)   
lj/cut/thole/long args $=$ damp cutoff (cutoff2) damp $=$ global damping parameter cutoff $=$ global cutoff for LJ (and Thole if only 1 arg) (distance units) cutoff2 $=$ global cutoff for Thole (optional) (distance units)  

# 4.277.2 Examples  

pair_style hybrid/overlay ... thole 2.6 12.0   
pair_coeff 1 1 thole 1.0   
pair_coeff 1 2 thole 1.0 2.6 10.0   
pair_coeff \* 2 thole 1.0 2.6   
pair_style lj/cut/thole/long 2.6 12.0  

Example input scripts available: examples/PACKAGES/drude  

# 4.277.3 Description  

The thole pair styles are meant to be used with force fields that include explicit polarization through Drude dipoles. This link describes how to use the thermalized Drude oscillator model in LAMMPS and polarizable models in LAMMPS are discussed on the Howto polarizable doc page.  

The thole pair style should be used as a sub-style within in the pair_style hybrid/overlay command, in conjunction with a main pair style including Coulomb interactions, i.e. any pair style containing coul/cut or coul/long in its style name.  

The lj/cut/thole/long pair style is equivalent to, but more convenient that the frequent combination hybrid/overlay lj/cut/coul/long cutoff thole damp cutoff2. It is not only a shorthand for this pair_style combination, but it also allows for mixing pair coefficients instead of listing them all. The lj/cut/thole/long pair style is also a bit faster because it avoids an overlay and can benefit from OMP acceleration. Moreover, it uses a more precise approximation of the direct Coulomb interaction at short range similar to coul/long/cs, which stabilizes the temperature of Drude particles.  

The thole pair styles compute the Coulomb interaction damped at short distances by a function  

$$
T_{i j}(r_{i j})=1-\left(1+\frac{s_{i j}r_{i j}}{2}\right)\exp\left(-s_{i j}r_{i j}\right)
$$  

This function results from an adaptation to point charges (Noskov) of the dipole screening scheme originally proposed by Thole. The scaling coefficient $s_{i j}$ is determined by the polarizability of the atoms, $\alpha_{i}$ , and by a Thole damping parameter a. This Thole damping parameter usually takes a value of 2.6, but in certain force fields the value can depend upon the atom types. The mixing rule for Thole damping parameters is the arithmetic average, and for polarizabilities the geometric average between the atom-specific values.  

$$
s_{i j}=\frac{a_{i j}}{(\alpha_{i j})^{1/3}}=\frac{(a_{i}+a_{j})/2}{[(\alpha_{i}\alpha_{j})^{1/2}]^{1/3}}
$$  

The damping function is only applied to the interactions between the point charges representing the induced dipoles on polarizable sites, that is, charges on Drude particles, $q_{D,i}$ , and opposite charges, $-q_{D,i}$ , located on the respective core particles (to which each Drude particle is bonded). Therefore, Thole screening is not applied to the full charge of the core particle $q_{i}$ , but only to the $-q_{D,i}$ part of it.  

The interactions between core charges are subject to the weighting factors set by the special_bonds command. The interactions between Drude particles and core charges or non-polarizable atoms are also subject to these weighting factors. The Drude particles inherit the 1-2, 1-3 and 1-4 neighbor relations from their respective cores.  

For pair_style thole, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the example above.  

• $\alpha$ (distance units^3) • damp • cutoff (distance units)  

The last two coefficients are optional. If not specified the global Thole damping parameter or global cutoff specified in the pair_style command are used. In order to specify a cutoff (third argument) a damp parameter (second argument) must also be specified.  

For pair style lj/cut/thole/long, the following coefficients must be defined for each pair of atoms types via the pair_coeff command.  

• ε (energy units) • σ (length units) • α (distance units^3) • damp • LJ cutoff (distance units)  

The last two coefficients are optional and default to the global values from the pair_style command.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.277.4 Mixing, shift, table, tail correction, restart, rRESPA info  

The thole pair style does not support mixing. Thus, coefficients for all I,J pairs must be specified explicitly  

The lj/cut/thole/long pair style does support mixing. Mixed coefficients are defined using  

$$
\alpha_{i j}=\sqrt{\alpha_{i}\alpha_{j}}
$$  

$$
a_{i j}=\frac{1}{2}(a_{i}+a_{j})
$$  

# 4.277.5 Restrictions  

These pair styles are part of the DRUDE package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair_style should currently not be used with the charmm dihedral style if the latter has non-zero 1-4 weighting factors. This is because the thole pair style does not know which pairs are 1-4 partners of which dihedrals.  

The lj/cut/thole/long pair style should be used with a Kspace solver like PPPM or Ewald, which is only enabled if LAMMPS was built with the kspace package.  

# 4.277.6 Related commands  

fix drude, fix langevin/drude, fix drude/transform, compute temp/drude pair_style lj/cut/coul/long  

# 4.277.7 Default  

none  

(Noskov) Noskov, Lamoureux and Roux, J Phys Chem B, 109, 6705 (2005).   
(Thole) Chem Phys, 59, 341 (1981).  

# 4.278 pair_style threebody/table command  

# 4.278.1 Syntax  

# 4.278.2 Examples  

<html><body><table><tr><td>pair style threebody/table</td></tr><tr><td>pair coeff ** spce2.3b type1 type2</td></tr><tr><td>pair style hybrid overlay table linear 1200 threebody table</td></tr><tr><td>pair coeff 1 1 table table CG CG.txt VOTCA</td></tr><tr><td>pair coeff ** threebody/t /table spce.3b type</td></tr></table></body></html>  

Used in example input scripts:  

<html><body><table><tr><td>examples /PACKAGES/manybody _table/in.spce</td></tr><tr><td>examples/PACKAGES /manybody_table/in.spce2</td></tr></table></body></html>  

# 4.278.3 Description  

Added in version 2Jun2022.  

The threebody/table style is a pair style for generic tabulated three-body interactions. It has been developed for (coarsegrained) simulations (of water) with Kernel-based machine learning (ML) potentials (Scherer2). As for many other MANYBODY package pair styles the energy of a system is computed as a sum over three-body terms:  

$$
E=\sum_{i}\sum_{j\neq i}\sum_{k>j}\phi_{3}(r_{i j},r_{i k},\theta_{i j k})
$$  

The summations in the formula are over all neighbors J and K of atom I within a cutoff distance cut. In contrast to the Stillinger-Weber potential, all forces are not calculated analytically, but read in from a three-body force/energy table which can be generated with the csg_ml app of VOTCA as available at: https://gitlab.mpcdf.mpg.de/votca/votca.  

Only a single pair_coeff command is used with the threebody/table style which specifies a threebody potential (“.3b”) file with parameters for all needed elements. These are then mapped to LAMMPS atom types by specifying N_el additional arguments after the “.3b” filename in the pair_coeff command, where N_el is the number of LAMMPS atom types:  

• “.3b” filename • N_el element names $=$ mapping of threebody elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine a file $\mathrm{SiC.}36$ has three-body values for Si and C. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Si, and the fourth to be C, you would use the following pair_coeff command:  

pair_coeff \* \* SiC.3b Si Si Si C  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three Si arguments map LAMMPS atom types 1,2,3 to the Si element in the “.3b” file. The final C argument maps LAMMPS atom type 4 to the C element in the threebody file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a threebody/table potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

The three-body files have a “.3b” suffix. Lines that are not blank or comments (starting with #) define parameters for a triplet of elements. The parameters in a single entry specify to the (three-body) cutoff distance and the tabulated three-body interaction. A single entry then contains:  

• element 1 (the center atom in a 3-body interaction)   
• element 2   
• element 3   
• cut (distance units)   
• filename   
• keyword   
• style   
• N The parameter cut is the (three-body) cutoff distance. When set to 0, no interaction is calculated for this element triplet.   
The parameters filename, keyword, style, and $N$ refer to the tabulated three-body potential.  

The tabulation is done on a three-dimensional grid of the two distances $r_{i j}$ and $r_{i k}$ as well as the angle $\theta_{i j k}$ which is constructed in the following way. There are two different cases. If element 2 and element 3 are of the same type (e.g. SiCC), the distance $r_{i j}$ is varied in “N” steps from rmin to rmax and the distance $r_{i k}$ is varied from $r_{i j}$ to rmax. This can be done, due to the symmetry of the triplet. If element 2 and element 3 are not of the same type (e.g. SiCSi), there is no additional symmetry and the distance $r_{i k}$ is also varied from rmin to rmax in “N” steps. The angle $\theta_{i j k}$ is always varied in “2N” steps from $(0.0+180.0/(4\mathrm{N}))$ to $(180.0-180.0/(4\mathrm{N}))$ . Therefore, the total number of table entries is $\mathbf{\tilde{\Gamma}}^{6}\mathbf{M}$ ${\bf\Lambda}={\bf N}\stackrel{*}{{\bf\Lambda}}{\bf N}\stackrel{*}{{\bf\Lambda}}({\bf N}+1)^{,}$ for the symmetric (element 2 and element 3 are of the same type) and $\mathbf{\ddot{\kappa}M}=2\mathbf{\kappa}^{*}\mathbf{N}\mathbf{\kappa}^{*}\mathbf{N}\mathbf{\kappa}^{*}\mathbf{N}^{\prime},$ for the general case (element 2 and element 3 are not of the same type).  

The forces on all three particles I, J, and $\mathbf{K}$ of a triplet of this type of three-body interaction potential $(\phi_{3}(r_{i j},r_{i k},\theta_{i j k}))$ lie within the plane defined by the three inter-particle distance vectors $\mathbf{r}_{i j},\mathbf{r}_{i k}$ , and ${\bf r}_{j k}$ . This property is used to project the forces onto the inter-particle distance vectors as follows  

$$
{\left(\bf f_{i}\right)}=\left({\begin{array}{c c c}{f_{i1}}&{f_{i2}}&{0}\ {f_{j}}&{0}&{f_{j2}}\ {0}&{f_{k1}}&{f_{k2}}\end{array}}\right)~{\left(\bf r}_{i j}\right)~
$$  

and then tabulate the 6 force constants $f_{i1},f_{i2},f_{j1},f_{j2},f_{k1}$ , and $f_{k2}$ , as well as the energy of a triplet e. Due to symmetry reasons, the following relations hold: $f_{i1}=-f_{j1}$ , $f_{i2}=-f_{k1}$ , and $f_{j2}=-f_{k2}$ . As in this pair style the forces are read in directly, a correct MD simulation is also performed in the case that the triplet energies are set to $\scriptstyle\mathrm{e=0}$ .  

The filename specifies the file containing the tabulated energy and derivative values of $\phi_{3}(r_{i j},r_{i k},\theta_{i j k})$ . The keyword then specifies a section of the file. The format of this file is as follows (without the parenthesized comments):  

<html><body><table><tr><td colspan="4">Tabulated three-body potential for spce water (one or more comment or blank lines)</td></tr><tr><td>ENTRY1</td><td></td><td></td><td>(keyword is the first text on line)</td></tr><tr><td>N 12 rmin 2.55 rmax 3.65</td><td></td><td>(N, rmin, rmax parameters)</td><td></td></tr><tr><td>1 2.55 2.55 3.75 -867.212 -611.273 867.212 21386.8 611.273 -21386.8 0.0</td><td>(blank line)</td><td></td><td>(index, r_ij, r_ik, theta, f_il,-</td></tr><tr><td>→f_i2, f_jl, f_j2, f_k1, f_k2, e)</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>1872 3.65 3.65 176.25 -0.00215132 -0.00412886 0.00215137 0.00111754 0.00412895 -0.00111757 0.0</td><td></td><td></td><td></td></tr></table></body></html>  

A section begins with a non-blank line whose first character is not a “#”; blank lines or lines starting with “#” can be used as comments between sections. The first line begins with a keyword which identifies the section. The next line lists (in any order) one or more parameters for the table. Each parameter is a keyword followed by one or more numeric values.  

The parameter “N” is required. It should be the same than the parameter “N” of the “.3b” file, otherwise its value is overwritten. “N” determines the number of table entries “M” that follow: $\mathbf{\Phi}^{\leftarrow}\mathbf{M}=\mathbf{N}\mathbf{\Phi}^{*}\mathbf{N}\mathbf{\Phi}^{*}(\mathbf{N}\mathbf{+}1)^{\prime},$ (symmetric triplet, e.g. SiCC) or $\mathrm{{}^{4\leftrightarrow}M=2\leftrightarrow1\leftrightarrow1^{*}N\leftrightarrow N^{\leftrightarrow}N^{\leftrightarrow}N^{\leftrightarrow}N}$ (asymmetric triplet, e.g. SiCSi). Therefore $\mathbf{\ddot{M}}=12\mathbf{\ddot{\tau}}12\mathbf{\ast}\mathbf{1}3=1872\mathbf{\cdot}^{\mathrm{}}$ in the above symmetric example. The parameters “rmin” and “rmax” are also required and determine the minimum and maximum of the inter-particle distances $r_{i j}$ and $r_{i k}$ .  

Following a blank line, the next M lines of the angular table file list the tabulated values. On each line, the first value is the index from 1 to M, the second value is the distance $r_{i j}$ , the third value is the distance $r_{i k}$ , the fourth value is the angle $\theta_{i j k}$ ), the next six values are the force constants $f_{i1},f_{i2},f_{j1},f_{j2},f_{k1}$ , and $f_{k2}$ , and the last value is the energy e.  

Note that one three-body potential file can contain many sections, each with a tabulated potential. LAMMPS reads the file section by section until it finds one that matches the specified keyword of appropriate section of the “.3b” file.  

At the moment, only the style linear is allowed and implemented. After reading in the force table, it is internally stored in LAMMPS as a lookup table. For each triplet configuration occurring in the simulation within the cutoff distance, the next nearest tabulated triplet configuration is looked up. No interpolation is done. This allows for a very efficient force calculation with the stored force constants and energies. Due to the know table structure, the lookup can be done efficiently. It has been tested (Scherer2) that with a reasonably small bin size, the accuracy and speed is comparable to that of a Stillinger-Weber potential with tabulated three-body interactions (pair_style sw/angle/table) while the table format of this pair style allows for more flexible three-body interactions.  

As for the Stillinger-Weber potential, the three-body potential file must contain entries for all the elements listed in the pair_coeff command. It can also contain entries for additional elements not being used in a particular simulation; LAMMPS ignores those entries.  

For a single-element simulation, only a single entry is required (e.g. SiSiSi). For a two-element simulation, the file must contain 8 entries (for SiSiSi, SiSiC, SiCSi, SiCC, CSiSi, CSiC, CCSi, CCC), that specify threebody parameters for all permutations of the two elements interacting in three-body configurations. Thus for 3 elements, 27 entries would be required, etc.  

As annotated above, the first element in the entry is the center atom in a three-body interaction. Thus an entry for SiCC means a Si atom with $2\mathrm{C}$ atoms as neighbors. The tabulated three-body forces can in principle be specific to the three elements of the configuration. However, the user must ensure that it makes physically sense. E.g., the tabulated three-body forces for the entries CSiC and CCSi should be the same exchanging $r_{i j}$ with r_{ik}, $f_{j1}$ with $f_{k1}$ , and $f_{j2}$ with $f_{k2}$ .  

Additional input files and reference data can be found at: https://gitlab.mpcdf.mpg.de/votca/votca/-/tree/master/ csg-tutorials/ml  

# 4.278.4 Mixing, shift, table, tail correction, restart, rRESPA info  

As all interactions are tabulated, no mixing is performed.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.278.5 Restrictions  

This pair style is part of the MANYBODY package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on” for pair interactions.  

# 4.278.6 Related commands  

pair_coeff , pair sw/angle/table  

(Scherer2) C. Scherer, R. Scheid, D. Andrienko, and T. Bereau, J. Chem. Theor. Comp. 16, 3194-3204 (2020).  

# 4.279 pair_style tracker command  

# 4.279.1 Syntax  

pair_style tracker fix_ID N keyword values attribute1 attribute2 ...  

• $\mathrm{{fix\_ID=ID}}$ of associated internal fix to store data • $\Nu=$ prepare data for output every this many timesteps • zero or more keywords may be appended • keyword $=$ finite or time/min or type/include  

finite value $=$ none pair style uses atomic diameters to identify contacts   
time/min value $=\mathrm{T}$ $\mathrm{T}=$ minimum number of timesteps of interaction   
type/include value $=$ list1 list2 list1,list2 $=$ separate lists of types (see below)  

• one or more attributes may be appended possible attributes $=$ id1 id2 time/created time/broken time/total r/min r/ave x y z  

id1, $\mathrm{id2=IDs}$ of the two atoms in each pair interaction   
time/created $=$ the timestep that the two atoms began interacting   
time/broken $=$ the timestep that the two atoms stopped interacting   
time/total = the total number of timesteps the two atoms interacted   
r/min = the minimum radial distance between the two atoms during the interaction (distance units)   
r/ave = the average radial distance between the two atoms during the interaction (distance units)   
x, y, z = the center of mass position of the two atoms when they stopped interacting (distance units)  

# 4.279.2 Examples  

pair_style hybrid/overlay tracker myfix 1000 id1 id2 type/include 1 \* type/include 2 3,4 lj/cut 2.5   
pair_coeff 1 1 tracker 2.0   
pair_style hybrid/overlay tracker myfix 1000 finite x y z time/min 100 granular   
pair_coeff \* \* tracker   
dump 1 all local 1000 dump.local f_myfix[1] f_myfix[2] f_myfix[3]   
dump_modify 1 write_header no  

# 4.279.3 Description  

Style tracker monitors information about pairwise interactions. It does not calculate any forces on atoms. Pair hybrid/overlay can be used to combine this pair style with any other pair style, as shown in the examples above.  

At each timestep, if two neighboring atoms move beyond the interaction cutoff, pairwise data is processed and transferred to an internal fix labeled fix_ID. This allows the local data to be accessed by other LAMMPS commands. Additional filters can be applied using the time/min or type/include keywords described below. Note that this is the interaction cutoff defined by this pair style, not the short-range cutoff defined by the pair style that is calculating forces on atoms.  

Following any optional keyword/value arguments, a list of one or more attributes is specified. These include the IDs of the two atoms in the pair. The other attributes for the pair of atoms are the duration of time they were “interacting” or at the point in time they started or stopped interacting. In this context, “interacting” means the time window during which the two atoms were closer than the interaction cutoff distance. The attributes for time/\* refer to timesteps.  

Data is continuously accumulated by the internal fix over intervals of $N$ timesteps. At the end of each interval, all of the saved accumulated data is deleted to make room for new data. Individual datum may therefore persist anywhere between $I$ to $N$ timesteps depending on when they are saved. This data can be accessed using the $f i x\_I D$ and a dump local command. To ensure all data is output, the dump frequency should correspond to the same interval of $N$ timesteps. A dump frequency of an integer multiple of $N$ can be used to regularly output a sample of the accumulated data.  

The following optional keywords may be used.  

If the finite keyword is not used, the following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• cutoff (distance units)  

If the finite keyword is used, there are no additional coefficients to set for each pair of atom types via the pair_coeff command. Interaction cutoffs are instead calculated based on the diameter of finite particles. However you must still use the pair_coeff for all atom types. For example the command  

The pair_modify shift, table, and tail options are not relevant for this pair style.  

The accumulated data is not written to restart files and should be output before a restart file is written to avoid missing data.  

The internal fix calculates a local vector or local array depending on the number of input values. The length of the vector or number of rows in the array is the number of recorded, lost interactions. If a single input is specified, a local vector is produced. If two or more inputs are specified, a local array is produced where the number of columns $=$ the number of inputs. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array will be floating point values that correspond to the specified attribute.  

# 4.279.5 Restrictions  

This pair style is part of the MISC package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style is currently incompatible with granular pair styles that extend beyond the contact (e.g. JKR and DMT).  

# 4.279.6 Related commands  

# 4.279.7 Default  

none  

# 4.280 pair_style tri/lj command  

# 4.280.1 Syntax  

triangle’s area, but with minimal overlap and a minimal total number of spheres. This is done in a recursive manner. Place a sphere at the centroid of the original triangle. Calculate what diameter it must have to just cover all 3 corner points of the triangle. If that diameter is equal to or smaller than sigma_II, then include a sphere of the calculated diameter in the set of covering spheres. It the diameter is larger than sigma_II, then split the triangle into 2 triangles by bisecting its longest side. Repeat the process on each sub-triangle, recursing as far as needed to generate a set of covering spheres. When finished, the original criteria are met, and the set of covering spheres should be near minimal in number and overlap, at least for input triangles with a reasonable aspect-ratio.  

The LJ interaction between 2 spheres on different triangles of types I,J is computed with an arithmetic mixing of the sigma values of the 2 spheres and using the specified epsilon value for I,J atom types. Note that because the sigma values for triangles spheres is computed using only sigma_II values, specific to the triangles’s type, this means that any specified sigma_IJ values (for $\mathrm{I}!=\mathrm{J}$ ) are effectively ignored.  

For style tri/lj, the following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands:  

• epsilon (energy units) • sigma (distance units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global cutoff is used.  

# 4.280.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for all of this pair style can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.280.5 Restrictions  

This style is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

Defining particles to be triangles so they participate in tri/tri or tri/particle interactions requires the use the atom_style tri command.  

# 4.280.6 Related commands  

pair_coeff , pair_style line/lj  

# 4.280.7 Default  

none  

# 4.281 pair_style uf3 command  

Accelerator Variants: uf3/kk  

# 4.281. pair_style uf3 command  

# 4.281.1 Syntax  

pair_style style BodyFlag  

• style = uf3 or uf3/kk  

BodyFlag = Indicates whether to calculate only 2-body or 2 and 3-body interactions. Possible␣ ,→values: 2 or 3  

# 4.281.2 Examples  

pair_style uf3 3   
pair_coeff \* \* Nb.uf3 Nb   
pair_style uf3 2   
pair_coeff \* \* NbSn.uf3 Nb Sn   
pair_style uf3 3   
pair_coeff \* \* NbSn.uf3 Nb Sn  

# 4.281.3 Description  

Added in version 27June2024.  

The uf3 style computes the Ultra-Fast Force Fields (UF3) potential, a machine-learning interatomic potential. In UF3, the total energy of the system is defined via two- and three-body interactions:  

$$
\begin{array}{c}{{E=\displaystyle\sum_{i,j}V_{2}(r_{i j})+\sum_{i,j,k}V_{3}(r_{i j},r_{i k},r_{j k})}}\ {{{}}}\ {{V_{2}(r_{i j})=\displaystyle\sum_{n=0}^{N}c_{n}B_{n}(r_{i j})}}\ {{{}}}\ {{V_{3}(r_{i j},r_{i k},r_{j k})=\displaystyle\sum_{l=0}^{N_{l}}\sum_{m=0}^{N_{m}}\sum_{n=0}^{N_{n}}c_{l,m,n}B_{l}(r_{i j})B_{m}(r_{i k})B_{n}(r_{j k})}}\end{array}
$$  

where $V_{2}(r_{i j})$ and $V_{3}(r_{i j},r_{i k},r_{j k})$ are the two- and three-body interactions, respectively. For the two-body the summation is over all neighbors J and for the three-body the summation is over all neighbors J and K of atom I within a cutoff distance determined from the potential files. $B_{n}(r_{i j})$ are the cubic b-spline basis, $c_{n}$ and $c_{l,m,n}$ are the machine-learned interaction parameters and $N,N_{l},N_{m}$ , and $N_{n}$ denote the number of basis functions per spline or tensor spline dimension.  

With uf3 style only a single pair_coeff command is used to indicate the UF3 LAMMPS potential file containing all the two- and three-body interactions followed by $\mathbf{N}$ additional arguments specifying the mapping of UF3 elements to LAMMPS atom types, where $\mathbf{N}$ is the number of LAMMPS atom types:  

• UF3 LAMMPS potential file • N elements names $=$ mapping of UF3 elements to atom types  

As an example, if a LAMMPS simulation contains 2 atom types (elements ‘A’ and ‘B’), the pair_coeff command will be:  

<html><body><table><tr><td>pair_s style uf3 3</td></tr><tr><td>pair coeff ** AB.uf3 A B</td></tr></table></body></html>  

The AB.uf3 file should contain all two-body (A-A, A-B, B-B) and three-body (A-A-A, A-A-B, A-B-B, B-A-A, B-A-B, B-B-B).  

If a value of “2” is specified in the pair_style uf3 command, only the two-body potentials are needed. For 3-body interaction the first atom type is the central atom. We recommend using the generate_uf3_lammps_pots.py script (found here) for generating the UF3 LAMMPS potential file from the UF3 JSON potentials.  

UF3 LAMMPS potential file in the potentials directory of the LAMMPS distribution have a “.uf3” suffix. The interaction block in UF3 LAMMPS potential file should start with #UF3 POT and end with $\#$ characters. Following shows the format of a generic 2-body and 3-body potential block in UF3 LAMMPS potential file  

<html><body><table><tr><td>#UF3 POT UNITS: units DATE: POT GEN DATE AUTHOR: AUTHOR NAME CITATION: CITE 2B ELEMENT1 ELEMENT2 LEADING TRIM TRAILINGTRIM Rij_CUTOFF NUM_OF_KNOTS BSPLINE KNOTS NUM OF COEFF COEFF # #UF3 POT UNITS: units DATE: POT_GEN_DATE AUTHOR: AUTHOR_NAME CITATION: CITE Rjk_CUTOFF Rik_CUTOFF Rij_CUTOFF NUM_OF_KNOTS_JK NUM_OF_KNOTS_IK NUM OF KNOTS IJ</td></tr></table></body></html>  

The second line indicates whether the block contains data for 2-body (2B) or 3-body (3B) interaction. This is followed by element combination interaction, LEADING_TRIM and TRAILING_TRIM number on the same line. The current implementation is only tested for LEADING_TRIM $\underline{{\underline{{\mathbf{\Pi}}}}}=0$ and TRAILING_TRIM $\mathrm{\:=3}$ . If other values are used LAMMPS is terminated after issuing an error message. The Rij_CUTOFF sets the 2-body cutoff for the interaction described by the potential block. NUM_OF_KNOTS is the number of knots (or the length of the knot vector) present on the very next line. The BSPLINE_KNOTS line should contain all the knots in ascending order. NUM_OF_COEFF is the number of coefficients in the COEFF line. All the numbers in the BSPLINE_KNOTS and COEFF line should be space-separated. Similar to the 2-body potential block, the third line sets the cutoffs and length of the knots. The cutoff distance between atom-type I and J is Rij_CUTOFF, atom-type I and K is Rik_CUTOFF and between J and K is Rjk_CUTOFF.  

#  Note  

The current implementation only works for UF3 potentials with cutoff distances for 3-body interactions that follows 2Rij_CUTOFF $\stackrel{\cdot}{=}$ 2Rik_CUTOFF $\cong$ Rjk_CUTOFF relation.  

The BSPLINE_KNOTS_FOR_JK, BSPLINE_KNOTS_FOR_IK, and BSPLINE_KNOTS_FOR_IJ lines (note the order) contain the knots in increasing order for atoms J and K, I and K, and atoms I and J respectively. The number of knots is defined by the NUM_OF_KNOTS_\* characters in the previous line. The shape of the coefficient matrix is defined on the SHAPE_OF_COEFF_MATRIX[I][J][K] line followed by the columns of the coefficient matrix, one per line, as shown above. For example, if the coefficient matrix has the shape of $8\mathrm{x}8\mathrm{x}13$ , then SHAPE_OF_COEFF_MATRIX[I][J][K] will be 8 8 13 followed by 64 (8x8) lines each containing 13 coefficients separated by space.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.281.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS as described above from values in the potential file.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.281.5 Restrictions  

The ‘uf3’ pair style is part of the ML-UF3 package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires the newton setting to be “on”.  

The UF3 LAMMPS potential file provided with LAMMPS (see the potentials directory) are parameterized for metal units.  

The single() function of ‘uf3’ pair style only return the 2-body interaction energy.  

# 4.281.6 Related commands  

pair_coeff  

# 4.281.7 Default  

none  

(Xie23) Xie, S.R., Rupp, M. & Hennig, R.G. Ultra-fast interpretable machine-learning potentials. npj Comput Mater 9, 162 (2023). https://doi.org/10.1038/s41524-023-01092-7  

# 4.282 pair_style ufm command  

Accelerator Variants: ufm/gpu, ufm/omp, ufm/opt  

# 4.282.1 Syntax  

• cutof $=$ global cutoff for ufm interactions (distance units)  

# 4.282.2 Examples  

pair_style ufm 4.0   
pair_coeff 1 1 100.0 1.0 2.5   
pair_coeff \* \* 100.0 1.0   
pair_style ufm 4.0   
pair_coeff \* \* 10.0 1.0   
variable prefactor equal ramp(10,100)   
fix 1 all adapt 1 pair ufm epsilon \* \* v_prefactor  

# 4.282.3 Description  

Style ufm computes pairwise interactions using the Uhlenbeck-Ford model (UFM) potential (Paula Leite2016) which is given by  

$$
\begin{array}{l l}{E=-\varepsilon\ln\left[1-\exp\left(-r^{2}/\sigma^{2}\right)\right]\qquadr<r_{c}}\ {\varepsilon=p k_{B}T}\end{array}
$$  

where $r_{c}$ is the cutoff, $\sigma$ is a distance-scale and $\varepsilon$ is an energy-scale, i.e., a product of Boltzmann constant $k_{B}$ , temperature $T$ and the Uhlenbeck-Ford p-parameter which is responsible to control the softness of the interactions (Paula Leite2017). This model is useful as a reference system for fluid-phase free-energy calculations (Paula Leite2016).  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• ε (energy units) • $\sigma$ (distance units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global ufm cutoff is used.  

The fix adapt command can be used to vary epsilon and sigma for this pair style over the course of a simulation, in which case pair_coeff settings for epsilon and sigma must still be specified, but will be overridden. For example these commands will vary the prefactor epsilon for all pairwise interactions from 10.0 at the beginning to 100.0 at the end of a run:  

variable prefactor equal ramp(10,100) fix 1 all adapt 1 pair ufm epsilon \* \* v_prefactor  

# Note  

The thermodynamic integration procedure can be performed with this potential using fix adapt. This command will rescale the force on each atom by varying a scale variable, which always starts with value 1.0. The syntax is the same described above, however, changing epsilon to scale. A detailed explanation of how to use this command and perform nonequilibrium thermodynamic integration in LAMMPS is given in the paper by (Freitas).  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.282.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for this pair style can be mixed.   
The default mix value is geometric. See the “pair_modify” command for details.  

This pair style support the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table and tail are not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.282.5 Restrictions  

This pair style is part of the EXTRA-PAIR package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

# 4.282.6 Related commands  

pair_coeff , fix adapt  

# 4.282.7 Default  

none (Paula Leite2017) Paula Leite, Santos-Florez, and de Koning, Phys Rev E, 96, 32115 (2017).  

(Paula Leite2016) Paula Leite , Freitas, Azevedo, and de Koning, J Chem Phys, 126, 044509 (2016).  

(Freitas) Freitas, Asta, and de Koning, Computational Materials Science, 112, 333 (2016).  

# 4.283 pair_style vashishta command  

Accelerator Variants: vashishta/gpu, vashishta/omp, vashishta/kk  

# 4.284 pair_style vashishta/table command  

Accelerator Variants: vashishta/table/omp  

# 4.284.1 Syntax  

• style $=$ vashishta or vashishta/table args $=$ list of arguments for a particular style vashishta args $=$ none vashishta/table args $=$ Ntable cutinner Ntable $=\#$ of tabulation points cutinner $=$ tablulate from cutinner to cutoff  

# 4.284.2 Examples  

pair_style vashishta pair_coeff \* \* SiC.vashishta Si C pair_style vashishta/table 100000 0.2 pair_coeff \* \* SiC.vashishta Si C  

# 4.284.3 Description  

The vashishta and vashishta/table styles compute the combined 2-body and 3-body family of potentials developed in the group of Priya Vashishta and collaborators. By combining repulsive, screened Coulombic, screened charge-dipole, and dispersion interactions with a bond-angle energy based on the Stillinger-Weber potential, this potential has been used to describe a variety of inorganic compounds, including SiO2 Vashishta1990, SiC Vashishta2007, and InP Branicio2009.  

The potential for the energy $\mathrm{U}$ of a system of atoms is  

$$
\begin{array}{c}{{U=\displaystyle\sum_{i}^{N}\displaystyle\sum_{j>i}^{N}U_{i j}^{(2)}(r_{i j})+\displaystyle\sum_{i}^{N}\displaystyle\sum_{j\neq i}^{N}\displaystyle\sum_{k>j,k\neq i}^{N}U_{i j k}^{(3)}(r_{i j},r_{i k},\theta_{i j k})}}\ {{U_{i j}^{(2)}(r)=\displaystyle\frac{H_{i j}}{r^{\eta_{i j}}}+\displaystyle\frac{Z_{i}Z_{j}}{r}\exp(-r/\lambda_{1,i j})-\displaystyle\frac{D_{i j}}{r^{4}}\exp(-r/\lambda_{4,i j})-\displaystyle\frac{W_{i j}}{r^{6}},r<r_{c,i j}}}\ {{U_{i j k}^{(3)}(r_{i j},r_{i k},\theta_{i j k})=B_{i j k}\displaystyle\frac{\left[\cos\theta_{i j k}-\cos\theta_{0i j k}\right]^{2}}{1+C_{i j k}\left[\cos\theta_{i j k}-\cos\theta_{0i j k}\right]^{2}}\times}}\ {{\exp\left(\displaystyle\frac{\gamma_{i j}}{r_{i j}-r_{0,i j}}\right)\exp\left(\displaystyle\frac{\gamma_{i k}}{r_{i k}-r_{0,i k}}\right),~r_{i j}<r_{0,i j},r_{i k}<r_{0,i k}}}\end{array}
$$  

where we follow the notation used in Branicio2009. $U^{2}$ is a two-body term and U3 is a three-body term. The summation over two-body terms is over all neighbors J within a cutoff distance $=r_{c}$ . The twobody terms are shifted and tilted by a linear function so that the energy and force are both zero at $r_{c}$ . The summation over three-body terms is over all neighbors $i$ and $k$ within a cut-off distance $=r_{0}$ , where the exponential screening function becomes zero.  

The vashishta style computes these formulas analytically. The vashishta/table style tabulates the analytic values for Ntable points from cutinner to the cutoff of the potential. The points are equally spaced in $\mathbf{R}^{\wedge}2$ space from cutinner $\cdot\wedge_{2}$ to cutoff^2. For the two-body term in the above equation, a linear interpolation for each pairwise distance between adjacent points in the table. In practice the tabulated version can run $3{\cdot}5\mathbf{X}$ faster than the analytic version with moderate to little loss of accuracy for Ntable values between 10000 and 1000000. It is not recommended to use less than 5000 tabulation points.  

Only a single pair_coeff command is used with either style which specifies a Vashishta potential file with parameters for all needed elements. These are mapped to LAMMPS atom types by specifying N additional arguments after the filename in the pair_coeff command, where N is the number of LAMMPS atom types:  

• filename • N element names $=$ mapping of Vashishta elements to atom types  

See the pair_coeff page for alternate ways to specify the path for the potential file.  

As an example, imagine a file SiC.vashishta has parameters for Si and C. If your LAMMPS simulation has 4 atoms types and you want the first 3 to be Si, and the fourth to be C, you would use the following pair_coeff command:  

pair_coeff \* \* SiC.vashishta Si Si Si C  

The first 2 arguments must be \* \* so as to span all LAMMPS atom types. The first three Si arguments map LAMMPS atom types 1,2,3 to the Si element in the file. The final C argument maps LAMMPS atom type 4 to the C element in the file. If a mapping value is specified as NULL, the mapping is not performed. This can be used when a vashishta potential is used as part of the hybrid pair style. The NULL values are placeholders for atom types that will be used with other potentials.  

Vashishta files in the potentials directory of the LAMMPS distribution have a “.vashishta” suffix. Lines that are not blank or comments (starting with #) define parameters for a triplet of elements. The parameters in a single entry correspond to the two-body and three-body coefficients in the formulae above:  

• element 1 (the center atom in a 3-body interaction)   
• element 2   
• element 3   
• $H$ (energy units)   
• $\eta$   
• $Z_{i}$ (electron charge units)   
• $Z_{j}$ (electron charge units)   
• $\lambda_{1}$ (distance units)   
• $D$ (energy units)   
• $\lambda_{4}$ (distance units)   
• $W$ (energy units)   
• $r_{c}$ (distance units)   
• $B$ (energy units)   
• γ   
• $r_{0}$ (distance units)   
• $C$   
• cos $\theta_{0}$  

The non-annotated parameters are unitless. The Vashishta potential file must contain entries for all the elements listed in the pair_coeff command. It can also contain entries for additional elements not being used in a particular simulation; LAMMPS ignores those entries. For a single-element simulation, only a single entry is required (e.g. SiSiSi). For a two-element simulation, the file must contain 8 entries (for SiSiSi, SiSiC, SiCSi, SiCC, CSiSi, CSiC, CCSi, CCC), that specify parameters for all permutations of the two elements interacting in three-body configurations. Thus for 3 elements, 27 entries would be required, etc.  

Depending on the particular version of the Vashishta potential, the values of these parameters may be keyed to the identities of zero, one, two, or three elements. In order to make the input file format unambiguous, general, and simple to code, LAMMPS uses a slightly confusing method for specifying parameters. All parameters are divided into two classes: two-body and three-body. Two-body and three-body parameters are handled differently, as described below. The two-body parameters are $H,\eta,\lambda_{1},D,\lambda_{4}$ , W, $r_{c}$ , $\gamma,$ and $r_{0}$ . They appear in the above formulae with two subscripts. The parameters $Z_{i}$ and $Z_{j}$ are also classified as two-body parameters, even though they only have 1 subscript. The threebody parameters are $B$ , $C$ , cos $\theta_{0}$ . They appear in the above formulae with three subscripts. Two-body and three-body parameters are handled differently, as described below.  

The first element in each entry is the center atom in a three-body interaction, while the second and third elements are two neighbor atoms. Three-body parameters for a central atom I and two neighbors J and K are taken from the IJK entry. Note that even though three-body parameters do not depend on the order of J and K, LAMMPS stores three-body parameters for both IJK and IKJ. The user must ensure that these values are equal. Two-body parameters for an atom I interacting with atom J are taken from the IJJ entry, where the second and third elements are the same. Thus the two-body parameters for Si interacting with C come from the SiCC entry. Note that even though two-body parameters (except possibly gamma and r0 in U3) do not depend on the order of the two elements, LAMMPS will get the Si-C value from the SiCC entry and the C-Si value from the CSiSi entry. The user must ensure that these values are equal. Two-body parameters appearing in entries where the second and third elements are different are stored but never used. It is good practice to enter zero for these values. Note that the three-body function U3 above contains the two-body parameters $\gamma$ and $r_{0}$ . So U3 for a central C atom bonded to an Si atom and a second C atom will take three-body parameters from the CSiC entry, but two-body parameters from the CCC and CSiSi entries.  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.284.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}:=\mathrm{J}$ , where types I and J correspond to two different element types, mixing is performed by LAMMPS as described above from values in the potential file.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style does not write its information to binary restart files, since it is stored in potential files. Thus, you need to re-specify the pair_style and pair_coeff commands in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.284.5 Restrictions  

These pair styles are part of the MANYBODY package. They are only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

These pair styles requires the newton setting to be “on” for pair interactions.  

The Vashishta potential files provided with LAMMPS (see the potentials directory) are parameterized for metal units. You can use the Vashishta potential with any LAMMPS units, but you would need to create your own potential file with coefficients listed in the appropriate units if your simulation does not use “metal” units.  

# 4.284.6 Related commands  

pair_coeff  

# 4.284.7 Default  

none  

(Vashishta1990) P. Vashishta, R. K. Kalia, J. P. Rino, Phys. Rev. B 41, 12197 (1990). (Vashishta2007) P. Vashishta, R. K. Kalia, A. Nakano, J. P. Rino. J. Appl. Phys. 101, 103515 (2007). (Branicio2009) Branicio, Rino, Gan and Tsuzuki, J. Phys Condensed Matter 21 (2009) 095002  

# 4.285 pair_style wf/cut command  

# 4.285.1 Syntax  

$r_{c}$ is the cutoff.  

Comparison of the non-truncated Lennard-Jones 12-6 potential (red curve), and the WF potentials with $\mu=1$ and $\nu=1$ are shown in the figure below. The blue curve has $r_{c}=2.0$ and the green curve has $r_{c}=1.2$ and can be used to describe colloidal interactions.  

![](images/2b333e0ce55cc3bb6081932e424db4b60261b766debeca69206dc4d82518ca79.jpg)  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $\varepsilon$ (energy units) • $\sigma$ (distance units) • ν   
• $\mu$   
• $r_{c}$ (distance units)  

The last coefficient is optional. If not specified, the global cutoff given in the pair_style command is used. The exponents $\nu$ and $\mu$ are positive integers, usually set to 1. There is usually little to be gained by choosing other values of $\nu$ and $\mu$ (See discussion in Wang2020)  

# Mixing, shift, table, tail correction, restart, rRESPA info:  

This pair style does not support the pair_modify mixing and table options.  

The pair_modify tail and shift options are not relevant for this pair style as it goes to zero at the cut-off radius.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style does not support the use of the inner, middle, and outer keywords of the run_style respa command.  

# 4.285.4 Restrictions  

This pair style can only be used if LAMMPS was built with the EXTRA-PAIR package. See the Build package doc page for more info.  

# 4.285.5 Related commands  

pair_coeff  

Default: none  

(Wang2020) X. Wang, S. Ramirez-Hinestrosa, J. Dobnikar, and D. Frenkel, Phys. Chem. Chem. Phys. 22, 10624 (2020).  

# 4.286 pair_style ylz command  

# 4.286.1 Syntax  

• cutof $=$ global cutoff for interactions (distance units)  

# 4.286.2 Examples  

pair_style ylz 2.6   
pair_coeff \* \* 1.0 1.0 4 3 0.0 2.6  

# 4.286.3 Description  

Added in version 3Nov2022.  

The ylz (Yuan-Li-Zhang) style computes an anisotropic interaction between pairs of coarse-grained particles considering the relative particle orientations. This potential was originally developed as a particle-based solvent-free model for biological membranes (Yuan2010a). Unlike pair_style gayberne, whose orientation dependence is strictly derived from the closest distance between two ellipsoidal rigid bodies, the orientation-dependence of this pair style is mathematically defined such that the particles can self-assemble into one-particle-thick fluid membranes. The potential of this pair style is described by:  

$$
U(\mathbf{r}_{i j},\mathbf{n}_{i},\mathbf{n}_{j})=\left\{{u}_{R}(r)+\left[1-\phi(\hat{\mathbf{r}}_{i j},\mathbf{n}_{i},\mathbf{n}_{j})\right]\varepsilon,~r<r_{m i n}\right.
$$  

$$
\phi(\hat{\mathbf{r}}_{i j},\mathbf{n}_{i},\mathbf{n}_{j})=1+\left[\mu(a(\hat{\mathbf{r}}_{i j},\mathbf{n}_{i},\mathbf{n}_{j})-1)\right]
$$  

$$
a(\widehat{\mathbf{r}}_{i j},\mathbf{n}_{i},\mathbf{n}_{j})=(\mathbf{n}_{i}\times\widehat{\mathbf{r}}_{i j})\cdot(\mathbf{n}_{j}\times\widehat{\mathbf{r}}_{i j})+\beta(\mathbf{n}_{i}-\mathbf{n}_{j})\cdot\widehat{\mathbf{r}}_{i j}-\beta^{2}
$$  

$$
u_{R}(r)=\varepsilon\left[\left(\frac{r_{m i n}}{r}\right)^{4}-2\left(\frac{r_{m i n}}{r}\right)^{2}\right]
$$  

$$
u_{A}(r)=-\varepsilon~c o s^{2\zeta}~\biggl[\frac{\pi}{2}\frac{(r-r_{m i n})}{(r_{c}-r_{m i n})}\biggr]
$$  

where $\mathbf{r}_{i}$ and $\mathbf{r}_{j}$ are the center position vectors of particles i and j, respectively, $\mathbf{r}_{i j}=\mathbf{r}_{i}-\mathbf{r}_{j}$ is the inter-particle distance vector, $r=\left|\mathbf{r}_{i j}\right|$ and $\hat{\mathbf{r}}_{i j}=\mathbf{r}_{i j}/r$ . The unit vectors $\mathbf{n}_{i}$ and ${\mathbf{n}}_{j}$ represent the axes of symmetry of particles i and j, respectively, $u_{R}$ and $u_{A}$ are the repulsive and attractive potentials, $\phi$ is an angular function which depends on the relative orientation between pair particles, $\mu$ is the parameter related to the bending rigidity of the membrane, $\beta$ is the parameter related to the spontaneous curvature, and $\varepsilon$ is the energy unit, respectively. The $\zeta$ controls the slope of the attractive branch and hence the diffusivity of the particles in the in-plane direction of the membrane. $r_{c}$ is the cutoff radius, $r_{m i n}$ is the distance which minimizes the potential energy $u_{A}(r)$ and $r_{m i n}=2^{1/6}\sigma$ , where $\sigma$ is the length unit.  

This pair style is suited for solvent-free coarse-grained simulations of biological systems involving lipid bilayer membranes, such as vesicle shape transformations (Yuan2010b), nanoparticle endocytosis (Huang), modeling of red blood cell membranes $(F u)$ , (Appshaw), and modeling of cell elasticity (Becton).  

Use of this pair style requires the NVE, NVT, or NPT fixes with the asphere extension (e.g. fix nve/asphere) in order to integrate particle rotation. Additionally, atom_style ellipsoid should be used since it defines the rotational state of each particle.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• $\varepsilon=$ well depth (energy units)   
• $\sigma=$ minimum effective particle radii (distance units)   
• $\zeta=$ tuning parameter for the slope of the attractive branch   
• $\mu=$ parameter related to bending rigidity   
• $\beta=$ parameter related to the spontaneous curvature   
• cutoff (distance units)  

The last coefficient is optional. If not specified, the global cutoff specified in the pair_style command is used.  

# 4.286.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the epsilon and sigma coefficients and cutoff distance for this pair style can be mixed.   
The default mix value is geometric. See the “pair_modify” command for details.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.286.5 Restrictions  

The $y l z$ style is part of the ASPHERE package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires that atoms store torque and a quaternion to represent their orientation, as defined by the atom_style. It also requires they store a per-atom shape. The particles cannot store a per-particle diameter. To avoid being mistakenly considered as point particles, the shape parameters ought to be non-spherical, like [1 0.99 0.99]. Unlike the resquared pair style for which the shape directly determines the mathematical expressions of the potential, the shape parameters for this pair style is only involved in the computation of the moment of inertia and thus only influences the rotational dynamics of individual particles.  

This pair style requires that all atoms are ellipsoids as defined by the atom_style ellipsoid command.  

# 4.286.6 Related commands  

pair_coeff , fix nve/asphere, compute temp/asphere, pair_style resquared, pair_style gayberne  

# 4.286.7 Default  

none  

(Yuan2010a) Yuan, Huang, Li, Lykotrafitis, Zhang, Phys. Rev. E, 82, 011905(2010).   
(Yuan2010b) Yuan, Huang, Zhang, Soft. Matter, 6, 4571(2010).   
(Huang) Huang, Zhang, Yuan, Gao, Zhang, Nano Lett. 13, 4546(2013).   
(Fu) Fu, Peng, Yuan, Kfoury, Young, Comput. Phys. Commun, 210, 193-203(2017).   
(Appshaw) Appshaw, Seddon, Hanna, Soft. Matter,18, 1747(2022).   
(Becton) Becton, Averett, Wang, Biomech. Model. Mechanobiology, 18, 425-433(2019).  

# 4.287 pair_style yukawa command  

Accelerator Variants: yukawa/gpu, yukawa/omp, yukawa/kk  

# 4.287.1 Syntax  

pair_style yukawa kappa cutoff  

• kappa $=$ screening length (inverse distance units) • cutof $=$ global cutoff for Yukawa interactions (distance units)  

# 4.287.2 Examples  

pair_style yukawa 2.0 2.5   
pair_coeff 1 1 100.0 2.3   
pair_coeff \* \* 100.0  

# 4.287.3 Description  

Style yukawa computes pairwise interactions with the formula  

$$
E=A{\frac{e^{-\kappa r}}{r}}\qquadr<r_{c}
$$  

$r_{c}$ is the cutoff.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• A (energy\*distance units) • cutoff (distance units)  

The last coefficient is optional. If not specified, the global yukawa cutoff is used.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator package page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.287.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the A coefficient and cutoff distance for this pair style can be mixed. A is an energy value mixed like a LJ epsilon. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style supports the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.287.5 Restrictions  

none  

4.287.6 Related commands pair_coeff  

# 4.287.7 Default  

none  

# 4.288 pair_style yukawa/colloid command  

Accelerator Variants: yukawa/colloid/gpu, yukawa/colloid/kk, yukawa/colloid/omp  

# 4.288.1 Syntax  

# 4.288.2 Examples  

pair_style yukawa/colloid 2.0 2.5   
pair_coeff 1 1 100.0 2.3   
pair_coeff \* \* 100.0  

# 4.288.3 Description  

Style yukawa/colloid computes pairwise interactions with the formula  

$$
E=\frac{A}{\kappa}e^{-\kappa(r-(r_{i}+r_{j}))}r<r_{c}
$$  

where $r_{i}$ and $r_{j}$ are the radii of the two particles and $r_{c}$ is the cutoff.  

In contrast to pair_style yukawa, this functional form arises from the Coulombic interaction between two colloid particles, screened due to the presence of an electrolyte, see the book by Safran for a derivation in the context of DLVO theory. Pair_style yukawa is a screened Coulombic potential between two point-charges and uses no such approximation.  

This potential applies to nearby particle pairs for which the Derjagin approximation holds, meaning $h<<r_{i}+r_{j}$ , where $h$ is the surface-to-surface separation of the two particles.  

When used in combination with pair_style colloid, the two terms become the so-called DLVO potential, which combines electrostatic repulsion and van der Waals attraction.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• A (energy/distance units) cutoff (distance units)  

The prefactor A is determined from the relationship between surface charge and surface potential due to the presence of electrolyte. Note that the A for this potential style has different units than the A used in pair_style yukawa. For low surface potentials, i.e. less than about $25\mathrm{mV}.$ A can be written as:  

$$
A=2\pi R\varepsilon\varepsilon_{0}\kappa\psi^{2}
$$  

where  

• $R=$ colloid radius (distance units) • $\varepsilon_{\mathrm{0}}=$ permittivity of free space (charge^2/energy/distance units) • $\varepsilon=$ relative permittivity of fluid medium (dimensionless) • $\kappa=$ inverse screening length (1/distance units) • $\psi=$ surface potential (energy/charge units)  

The last coefficient is optional. If not specified, the global yukawa/colloid cutoff is used.  

Styles with a gpu, intel, $k k$ , omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.288.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs I,J and $\mathrm{I}!=\mathrm{J}$ , the A coefficient and cutoff distance for this pair style can be mixed. A is an energy value mixed like a LJ epsilon. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style supports the pair_modify shift option for the energy of the pair interaction.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.288.5 Restrictions  

This style is part of the COLLOID package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

This pair style requires that atoms be finite-size spheres with a diameter, as defined by the atom_style sphere command.  

Per-particle polydispersity is not yet supported by this pair style; per-type polydispersity is allowed. This means all particles of the same type must have the same diameter. Each type can have a different diameter.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.288.6 Related commands  

pair_coeff  

# 4.288.7 Default  

none  

(Safran) Safran, Statistical Thermodynamics of Surfaces, Interfaces, And Membranes, Westview Press, ISBN: 978- 0813340791 (2003).  

# 4.289 pair_style zbl command  

Accelerator Variants: zbl/gpu, zbl/kk, zbl/omp  

# 4.289.1 Syntax  

• inner $=$ distance where switching function begins outer $=$ global cutoff for ZBL interaction  

# 4.289.2 Examples  

<html><body><table><tr><td>pair style zbl 3.0 4.0</td></tr><tr><td>coeff * * 73.0 73.0</td></tr><tr><td>pair coeff 1 1 14.0 14.0</td></tr><tr><td>pair</td></tr></table></body></html>  

# 4.289.3 Description  

Style $z b l$ computes the Ziegler-Biersack-Littmark (ZBL) screened nuclear repulsion for describing high-energy collisions between atoms. (Ziegler). It includes an additional switching function that ramps the energy, force, and curvature smoothly to zero between an inner and outer cutoff. The potential energy due to a pair of atoms at a distance r_ij is given by:  

$$
\begin{array}{l}{{{\cal E}_{i j}^{Z B L}=\displaystyle\frac{1}{4\pi\varepsilon_{0}}\frac{Z_{i}Z_{j}e^{2}}{r_{i j}}\phi(r_{i j}/a)+S(r_{i j})}}\ {{{}}}\ {{a=\displaystyle\frac{0.46850}{Z_{i}^{0.23}+Z_{j}^{0.23}}}}\ {{\phi(x)=0.18175e^{-3.19980x}+0.50986e^{-0.94229x}+0.28022e^{-0.40290x}+0.02817e^{-0.20162x}+0.30287e^{-0.20162x}+0.2037e^{-0.4029x}}}\end{array}
$$  

where $e$ is the electron charge, $\varepsilon_{0}$ is the electrical permittivity of vacuum, and $Z_{i}$ and $Z_{j}$ are the nuclear charges of the two atoms. The switching function $S(r)$ is identical to that used by pair_style lj/gromacs. Here, the inner and outer cutoff are the same for all pairs of atom types.  

The following coefficients must be defined for each pair of atom types via the pair_coeff command as in the examples above, or in the LAMMPS data file.  

• $Z_{i}$ (atomic number for first atom type, e.g. 13.0 for aluminum) • $Z_{j}$ (ditto for second atom type)  

The values of $Z_{i}$ and $Z_{j}$ are normally equal to the atomic numbers of the two atom types. Thus, the user may optionally specify only the coefficients for each $i==i$ pair, and rely on the obvious mixing rule for cross interactions (see below). Note that when $i==i$ it is required that $Z_{i}==Z_{j}$ . When used with hybrid/overlay and pairs are assigned to more than one sub-style, the mixing rule is not used and each pair of types interacting with the ZBL sub-style must be included in a pair_coeff command.  

# Note  

The numerical values of the exponential decay constants in the screening function depend on the unit of distance. In the above equation they are given for units of Angstroms. LAMMPS will automatically convert these values to the distance unit of the specified LAMMPS units setting. The values of $Z$ should always be given as multiples of a proton’s charge, e.g. 29.0 for copper.  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 4.289.4 Mixing, shift, table, tail correction, restart, rRESPA info  

For atom type pairs $i,j$ and $i\neq i$ , the $Z_{i}$ and $Z_{j}$ coefficients can be mixed by taking $Z_{i}$ and $Z_{j}$ from the values specified for $i==i$ and $j==j$ cases. When used with hybrid/overlay and pairs are assigned to more than one sub-style, the mixing rule is not used and each pair of types interacting with the ZBL sub-style must be included in a pair_coeff command. The pair_modify mix option has no effect on the mixing behavior  

The ZBL pair style does not support the pair_modify shift option, since the ZBL interaction is already smoothed to 0.0 at the cutoff.  

The pair_modify table option is not relevant for this pair style.  

This pair style does not support the pair_modify tail option for adding long-range tail corrections to energy and pressure, since there are no corrections for a potential that goes to 0.0 at the cutoff.  

This pair style does not write information to binary restart files, so pair_style and pair_coeff commands must be specified in an input script that reads a restart file.  

This pair style can only be used via the pair keyword of the run_style respa command. It does not support the inner, middle, outer keywords.  

# 4.289.5 Restrictions  

none  

# 4.289.6 Related commands  

pair_coeff  

# 4.289.7 Default  

none  

(Ziegler) J.F. Ziegler, J. P. Biersack and U. Littmark, “The Stopping and Range of Ions in Matter”, Volume 1, Pergamon, 1985.  

# 4.290 pair_style zero command  

# 4.290.1 Syntax  

pair_style zero cutoff [nocoeff] [full] • zero $=$ style name of this pair style • cutof $=$ global cutoff (distance units) • nocoeff $=$ ignore all pair_coeff parameters (optional) • full $=$ build full neighbor list (optional)  

# 4.290.2 Examples  

pair_style zero 10.0 pair_style zero 5.0 nocoeff pair_coeff \* \* pair_coeff 1 2\*4 3.0  

# 4.290.3 Description  

Define a global or per-type cutoff length for the purpose of building a neighbor list and acquiring ghost atoms, but do not compute any pairwise forces or energies.  

This can be useful for fixes or computes which require a neighbor list to enumerate pairs of atoms within some cutoff distance, but when pairwise forces are not otherwise needed. Examples are the fix bond/create, compute rdf , compute voronoi/atom commands.  

Note that the comm_modify cutoff command can be used to ensure communication of ghost atoms even when a pair style is not defined, but it will not trigger neighbor list generation.  

The optional nocoeff flag allows to read data files with a PairCoeff section for any pair style. Similarly, any pair_coeff commands will only be checked for the atom type numbers and the rest ignored. In this case, only the global cutoff will be used.  

Added in version 3Nov2022.  

The optional full flag builds a full neighbor list instead of the default half neighbor list.  

The following coefficients must be defined for each pair of atoms types via the pair_coeff command as in the examples above, or in the data file or restart files read by the read_data or read_restart commands, or by mixing as described below:  

• cutoff (distance units)  

This coefficient is optional. If not specified, the global cutoff specified in the pair_style command is used. If the pair_style has been specified with the optional nocoeff flag, then a cutoff pair coefficient is ignored.  

# 4.290.4 Mixing, shift, table, tail correction, restart, rRESPA info  

The cutoff distance for this pair style can be mixed. The default mix value is geometric. See the “pair_modify” command for details.  

This pair style does not support the pair_modify shift, table, and tail options.  

This pair style writes its information to binary restart files, so pair_style and pair_coeff commands do not need to be specified in an input script that reads a restart file.  

This pair style supports the use of the inner, middle, and outer keywords of the run_style respa command.  

# 4.290.5 Restrictions  

none  

4.290.6 Related commands pair_style none  

# 4.290.7 Default  

none  

# BOND STYLES  

# 5.1 bond_style bpm/rotational command  

# 5.1.1 Syntax  

ond_style bpm/rotational keyword value attribute1 attribute2 ... optional keyword $=$ overlay/pair or store/local or smooth or break store/local values $=$ fix_ID N attributes ... $\mathrm{^kfix\_ID=ID}$ of associated internal fix to store data \* N = prepare data for output every this many timesteps \* attributes $-$ zero or more of the below attributes may be appended id1, id2 = IDs of two atoms in the bond time = the timestep the bond broke x, y, z = the center of mass position of the two atoms when the bond broke (distance units) x/ref, y/ref, z/ref = the initial center of mass position of the two atoms (distance units) overlay/pair value = yes or no bonded particles will still interact with pair forces smooth value = yes or no smooths bond forces near the breaking point normalize value $=$ yes or no normalizes normal and shear forces by the reference length break value $=$ yes or no indicates whether bonds break during a run  

# 5.1.2 Examples  

<html><body><table><tr><td>bond: style bpm rotational</td></tr><tr><td>bond  ( coeff 1 1.0 0.2 0.02 0.02 0.20 0.04 0.04 0.04 0.1 0.02 0.002 0.002</td></tr><tr><td></td></tr><tr><td>bond  style bpm rotational store /local myfix 1000 time id1 id2 dump 1 all local 1000 dump.broken f_1 myfix[1] f_myfix[2] f_1 myfix[3]</td></tr><tr><td>dump_ modify write header no</td></tr></table></body></html>  

# 5.1.3 Description  

Added in version 4May2022.  

The bpm/rotational bond style computes forces and torques based on deviations from the initial reference state of the two atoms. The reference state is stored by each bond when it is first computed in the setup of a run. Data is then preserved across run commands and is written to binary restart files such that restarting the system will not reset the reference state of a bond.  

Forces include a normal and tangential component. The base normal force has a magnitude of  

$$
f_{r}=k_{r}(r-r_{0})
$$  

where $k_{r}$ is a stiffness and $r$ is the current distance and $r_{0}$ is the initial distance between the two particles.  

A tangential force is applied perpendicular to the normal direction which is proportional to the tangential shear displacement with a stiffness of $k_{s}$ . This tangential force also induces a torque. In addition, bending and twisting torques are also applied to particles which are proportional to angular bending and twisting displacements with stiffnesses of $k_{b}$ and $k_{t}$ , respectively. Details on the calculations of shear displacements and angular displacements can be found in (Wang) and (Wang and Mora).  

Bonds will break under sufficient stress. A breaking criterion is calculated  

$$
B=\operatorname*{max}\left\{0,\frac{f_{r}}{f_{r,c}}+\frac{\left|f_{s}\right|}{f_{s,c}}+\frac{\left|\tau_{b}\right|}{\tau_{b,c}}+\frac{\left|\tau_{t}\right|}{\tau_{t,c}}\right\}
$$  

where $\lvert f_{s}\rvert$ is the magnitude of the shear force and $\left|\tau_{b}\right|$ and $\left|\tau_{t}\right|$ are the magnitudes of the bending and twisting torques, respectively. The corresponding variables $f_{r,c}~f_{s,c}$ , $\tau_{b,c}$ , and $\tau_{t,c}$ are critical limits to each force or torque. If $B$ is ever equal to or exceeds one, the bond will break. This is done by setting the bond type to 0 such that forces and torques are no longer computed.  

After computing the base magnitudes of the forces and torques, they can be optionally multiplied by an extra factor $w$ to smoothly interpolate forces and torques to zero as the bond breaks. This term is calculated as $w=(1.0-B^{4})$ . This smoothing factor can be added or removed by setting the smooth keyword to yes or $n o$ , respectively.  

Finally, additional damping forces and torques are applied to the two particles. A force is applied proportional to the difference in the normal velocity of particles using a similar construction as dissipative particle dynamics (Groot):  

$$
F_{D}=-\gamma_{n}w(\hat{r}\bullet\vec{\nu})
$$  

where $\gamma_{n}$ is the damping strength, $\hat{r}$ is the radial normal vector, and $\vec{\nu}$ is the velocity difference between the two particles. Similarly, tangential forces are applied to each atom proportional to the relative differences in sliding velocities with a constant prefactor $\gamma_{s}$ (Wang et al.) along with their associated torques. The rolling and twisting components of the relative angular velocities of the two atoms are also damped by applying torques with prefactors of $\gamma_{r}$ and $\gamma_{t}$ , respectively.  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $k_{r}$ (force/distance units)   
• $k_{s}$ (force/distance units)   
• $k_{t}$ (force\*distance/radians units)   
• $k_{b}$ (force\*distance/radians units)   
• $f_{r,c}$ (force units)   
• $f_{s,c}$ (force units)   
• $\tau_{t,c}$ (force\*distance units)   
• $\tau_{b,c}$ (force\*distance units)  

• γn (force/velocity units) • γs (force/velocity units) • γr (force\*distance/velocity units) • γt (force\*distance/velocity units)  

If the normalize keyword is set to yes, the radial and shear forces will be normalized by $r_{0}$ such that $k_{r}$ and $k_{s}$ must be given in force units.  

By default, pair forces are not calculated between bonded particles. Pair forces can alternatively be overlaid on top of bond forces by setting the overlay/pair keyword to yes. These settings require specific special_bonds settings described in the restrictions. Further details can be found in the how to page on BPMs.  

Added in version 28Mar2023.  

If the break keyword is set to no, LAMMPS assumes bonds should not break during a simulation run. This will prevent some unnecessary calculation. The recommended bond communication distance no longer depends on bond failure coefficients (which are ignored) but instead corresponds to the typical heuristic maximum strain used by typical nonbpm bond styles. Similar behavior to break no can also be attained by setting arbitrarily high values for all four failure coefficients. One cannot use break no with smooth yes.  

If the store/local keyword is used, an internal fix will track bonds that break during the simulation. Whenever a bond breaks, data is processed and transferred to an internal fix labeled $f i x\_I D$ . This allows the local data to be accessed by other LAMMPS commands. Following this optional keyword, a list of one or more attributes is specified. These include the IDs of the two atoms in the bond. The other attributes for the two atoms include the timestep during which the bond broke and the current/initial center of mass position of the two atoms.  

Data is continuously accumulated over intervals of $N$ timesteps. At the end of each interval, all of the saved accumulated data is deleted to make room for new data. Individual datum may therefore persist anywhere between $I$ to $N$ timesteps depending on when they are saved. This data can be accessed using the $f i x\_I D$ and a dump local command. To ensure all data is output, the dump frequency should correspond to the same interval of $N$ timesteps. A dump frequency of an integer multiple of $N$ can be used to regularly output a sample of the accumulated data.  

Note that when unbroken bonds are dumped to a file via the dump local command, bonds with type 0 (broken bonds) are not included. The delete_bonds command can also be used to query the status of broken bonds or permanently delete them, e.g.:  

delete_bonds all stats delete_bonds all bond 0 remove  

# 5.1.4 Restart and other info  

This bond style writes the reference state of each bond to binary restart files. Loading a restart file will properly resume bonds. However, the reference state is NOT written to data files. Therefore reading a data file will not restore bonds and will cause their reference states to be redefined.  

If the store/local option is used, an internal fix will calculate a local vector or local array depending on the number of input values. The length of the vector or number of rows in the array is the number of recorded, broken bonds. If a single input is specified, a local vector is produced. If two or more inputs are specified, a local array is produced where the number of columns $=$ the number of inputs. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array will be floating point values that correspond to the specified attribute.  

The single() function of this bond style returns 0.0 for the energy of a bonded interaction, since energy is not conserved in these dissipative potentials. It also returns only the normal component of the bonded interaction force. However, the single() function also calculates 7 extra bond quantities. The first 4 are data from the reference state of the bond including the initial distance between particles $r_{0}$ followed by the $x,y$ , and $z$ components of the initial unit vector pointing to particle I from particle J. The next 3 quantities (5-7) are the $x,y,$ , and $z$ components of the total force, including normal and tangential contributions, acting on particle I.  

These extra quantities can be accessed by the compute bond/local command, as $b l,b2,...,b7$ .  

# 5.1.5 Restrictions  

This bond style is part of the BPM package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

By default if pair interactions between bonded atoms are to be disabled, this bond style requires setting  

special_bonds lj 0 1 1 coul 1 1 1  

and newton must be set to bond off. If the overlay/pair keyword is set to yes, this bond style alternatively requires setting  

The bpm/rotational style requires atom style bpm/sphere.  

# 5.1.6 Related commands  

bond_coeff , fix nve/bpm/sphere  

# 5.1.7 Default  

The option defaults are overlay/pair $=n o$ , smooth $=$ yes, normalize $=n o$ , and break $=y e s$  

(Wang) Wang, Acta Geotechnica, 4, p 117-127 (2009).   
(Wang and Mora) Wang, Mora, Advances in Geocomputing, 119, p 183-228 (2009).   
(Groot) Groot and Warren, J Chem Phys, 107, 4423-35 (1997).   
(Wang et al, 2015) Wang, Y., Alonso-Marroquin, F., & Guo, W. W. (2015). Rolling and sliding in 3-D discrete element models. Particuology, 23, 49-55.  

# 5.2 bond_style bpm/spring command  

# 5.2.1 Syntax  

bond_style bpm/spring keyword value attribute1 attribute2 ...  

• optional keyword $=$ overlay/pair or store/local or smooth or break or volume/factor store/local values $=$ fix_ID N attributes ... $\mathrm{{}^{\mathrm{~\textcent~}}f i x\textunderscore I D=I D}$ of associated internal fix to store data $^{*}\mathrm{~N~}=$ prepare data for output every this many timesteps \* attributes $=$ zero or more of the below attributes may be appended  

id1, $\mathrm{id2=IDs}$ of two atoms in the bond   
time $=$ the timestep the bond broke   
x, y, z = the center of mass position of the two atoms when the bond broke (distance units)   
x/ref, y/ref, z/ref = the initial center of mass position of the two atoms (distance units)   
overlay/pair value = yes or no bonded particles will still interact with pair forces   
smooth value = yes or no smooths bond forces near the breaking point   
normalize value = yes or no normalizes bond forces by the reference length   
break value $=$ yes or no indicates whether bonds break during a run   
volume/factor value $=$ yes or no indicates whether forces include the volumetric contribution  

# 5.2.2 Examples  

bond_style bpm/spring   
bond_coeff 1 1.0 0.05 0.1   
bond_style bpm/spring volume/factor yes   
bond_coeff 1 1.0 0.05 0.1 0.5   
bond_style bpm/spring myfix 1000 time id1 id2   
dump 1 all local 1000 dump.broken f_myfix[1] f_myfix[2] f_myfix[3]   
dump_modify 1 write_header no  

# 5.2.3 Description  

Added in version 4May2022.  

The bpm/spring bond style computes forces based on deviations from the initial reference state of the two atoms. The reference state is stored by each bond when it is first computed in the setup of a run. Data is then preserved across run commands and is written to binary restart files such that restarting the system will not reset the reference state of a bond.  

This bond style only applies central-body forces which conserve the translational and rotational degrees of freedom of a bonded set of particles based on a model described by Clemmer and Robbins (Clemmer). The force has a magnitude of  

$$
F=k(r-r_{0})w
$$  

where $k$ is a stiffness, $r$ is the current distance and $r_{0}$ is the initial distance between the two particles, and $w$ is an optional smoothing factor discussed below. Bonds will break at a strain of $\varepsilon_{c}$ . This is done by setting the bond type to 0 such that forces are no longer computed.  

An additional damping force is applied to the bonded particles. This forces is proportional to the difference in the normal velocity of particles using a similar construction as dissipative particle dynamics (Groot):  

$$
F_{D}=-\gamma{w}(\hat{r}\bullet\vec{\nu})
$$  

where γ is the damping strength, $\hat{r}$ is the radial normal vector, and $\vec{\nu}$ is the velocity difference between the two particles.  

The smoothing factor $w$ can be added or removed by setting the smooth keyword to yes or $n o$ , respectively. It is constructed such that forces smoothly go to zero, avoiding discontinuities, as bonds approach the critical strain  

$$
w=1.0-\left(\frac{r-r_{0}}{r_{0}\varepsilon_{c}}\right)^{8}.
$$  

If the normalize keyword is set to yes, the elastic bond force will be normalized by $r_{0}$ such that $k$ must be given in force units.  

By default, pair forces are not calculated between bonded particles. Pair forces can alternatively be overlaid on top of bond forces by setting the overlay/pair keyword to yes. These settings require specific special_bonds settings described in the restrictions. Further details can be found in the how to page on BPMs.  

Added in version 28Mar2023.  

If the break keyword is set to no, LAMMPS assumes bonds should not break during a simulation run. This will prevent some unnecessary calculation. The recommended bond communication distance no longer depends on the value of $\varepsilon_{c}$ (which is ignored) but instead corresponds to the typical heuristic maximum strain used by typical non-bpm bond styles. Similar behavior to break no can also be attained by setting an arbitrarily high value of $\varepsilon_{c}$ . One cannot use break no with smooth yes.  

Added in version 4Feb2025.  

The volume/factor keyword toggles whether an additional multibody contribution is added to he force using the formulation in (Clemmer2),  

$$
\alpha_{\nu}\left(\left[\frac{V_{i}+V_{j}}{V_{0,i}+V_{0,j}}\right]^{1/3}-\frac{r_{i j}}{r_{0,i j}}\right)
$$  

where $\alpha_{\nu}$ is a user specified coefficient and $V_{i}$ and $V_{0,i}$ are estimates of the current and local volume of atom i. These volumes are calculated as the sum of current or initial bond lengths cubed. In 2D, the volume is replaced with an area calculated using bond lengths squared and the cube root in the above equation is accordingly replaced with a square root. This approximation assumes bonds are evenly distributed on a spherical surface and neglects constant prefactors which are irrelevant since only the ratio of volumes matters. This term may be used to adjust the Poisson’s ratio.  

If a bond is broken (or created), $V_{0,i}$ is updated by subtracting (or adding) that bond’s contribution.  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above or in the data file or restart files read by the read_data or read_restart commands:  

• $k$ (force/distance units) • $\varepsilon_{c}$ (unit less) • γ (force/velocity units)  

Additionally, if volume/factor is set to yes, a fourth coefficient must be provided:  

• $a_{\nu}$ (force units)  

If the store/local keyword is used, an internal fix will track bonds that break during the simulation. Whenever a bond breaks, data is processed and transferred to an internal fix labeled $f i x\_I D$ . This allows the local data to be accessed by other LAMMPS commands. Following this optional keyword, a list of one or more attributes is specified. These include the IDs of the two atoms in the bond. The other attributes for the two atoms include the timestep during which the bond broke and the current/initial center of mass position of the two atoms.  

Data is continuously accumulated over intervals of $N$ timesteps. At the end of each interval, all of the saved accumulated data is deleted to make room for new data. Individual datum may therefore persist anywhere between $I$ to $N$ timesteps depending on when they are saved. This data can be accessed using the $f i x\_I D$ and a dump local command. To ensure all data is output, the dump frequency should correspond to the same interval of $N$ timesteps. A dump frequency of an integer multiple of $N$ can be used to regularly output a sample of the accumulated data.  

Note that when unbroken bonds are dumped to a file via the dump local command, bonds with type 0 (broken bonds) are not included. The delete_bonds command can also be used to query the status of broken bonds or permanently delete them, e.g.:  

delete_bonds all stats delete_bonds all bond 0 remove  

# 5.2.4 Restart and other info  

This bond style writes the reference state of each bond to binary restart files. Loading a restart file will properly restore bonds. However, the reference state is NOT written to data files. Therefore reading a data file will not restore bonds and will cause their reference states to be redefined.  

If the store/local option is used, an internal fix will calculate a local vector or local array depending on the number of input values. The length of the vector or number of rows in the array is the number of recorded, broken bonds. If a single input is specified, a local vector is produced. If two or more inputs are specified, a local array is produced where the number of columns $=$ the number of inputs. The vector or array can be accessed by any command that uses local values from a compute as input. See the Howto output page for an overview of LAMMPS output options.  

The vector or array will be floating point values that correspond to the specified attribute.  

The single() function of this bond style returns 0.0 for the energy of a bonded interaction, since energy is not conserved in these dissipative potentials. The single() function also calculates an extra bond quantity, the initial distance $r_{0}$ . This extra quantity can be accessed by the compute bond/local command as $b l$ .  

# 5.2.5 Restrictions  

This bond style is part of the BPM package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

By default if pair interactions between bonded atoms are to be disabled, this bond style requires setting  

special_bonds lj 0 1 1 coul 1 1 1  

and newton must be set to bond off. If the overlay/pair keyword is set to yes, this bond style alternatively requires setting  

# 5.3 bond_style class2 command  

Accelerator Variants: class2/omp, class2/kk  

# 5.3.1 Syntax  

# 5.3.2 Examples  

bond_style class2   
bond_coeff 1 1.0 100.0 80.0 80.0  

# 5.3.3 Description  

The class2 bond style uses the potential  

$$
E=K_{2}(r-r_{0})^{2}+K_{3}(r-r_{0})^{3}+K_{4}(r-r_{0})^{4}
$$  

where $r_{0}$ is the equilibrium bond distance.  

See (Sun) for a description of the COMPASS class2 force field.  

The following coefficients must be defined for each bond type via the bond_coeff command as in the example above, or in the data file or restart files read by the read_data or read_restart commands:  

• $r_{0}$ (distance) • $K_{2}$ (energy/distance^2) • $K_{3}$ (energy/distance^3) • $K_{4}$ (energy/distance^4)  

Styles with a gpu, intel, kk, omp, or opt suffix are functionally the same as the corresponding style without the suffix. They have been optimized to run faster, depending on your available hardware, as discussed on the Accelerator packages page. The accelerated styles take the same arguments and should produce the same results, except for round-off and precision issues.  

These accelerated styles are part of the GPU, INTEL, KOKKOS, OPENMP, and OPT packages, respectively. They are only enabled if LAMMPS was built with those packages. See the Build package page for more info.  

You can specify the accelerated styles explicitly in your input script by including their suffix, or you can use the -suffix command-line switch when you invoke LAMMPS, or you can use the suffix command in your input script.  

See the Accelerator packages page for more instructions on how to use the accelerated styles effectively.  

# 5.3.4 Restrictions  

This bond style can only be used if LAMMPS was built with the CLASS2 package. See the Build package page for more info.  