---
title: "Optional Packages"
description: "LAMMPS optional packages: H5MD, INTEL, KIM, KOKKOS, KSPACE, LATBOLTZ, LEPTON and more"
category: "general"
tags: ["packages", "GPU", "KOKKOS", "KIM", "INTEL", "acceleration"]
commands: []
---
# 6.2.36 H5MD package  

# Contents:  

H5MD stands for HDF5 for MD. HDF5 is a portable, binary, self-describing file format, used by many scientific simulations. H5MD is a format for molecular simulations, built on top of HDF5. This package implements a dump h5md command to output LAMMPS snapshots in this format.  

To use this package you must have the HDF5 library available on your system.  

Author: Pierre de Buyl (KU Leuven) created both the package and the H5MD format.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/H5MD: filenames $\mathbf{->}$ commands   
• src/H5MD/README   
• lib/h5md/README   
• dump h5md  

# 6.2.37 INTEL package  

# Contents:  

Dozens of pair, fix, bond, angle, dihedral, improper, and kspace styles which are optimized for Intel CPUs and KNLs (Knights Landing). All of them have an “intel” in their style name. The INTEL package page gives details of what hardware and compilers are required on your system, and how to build and use this package. Its styles can be invoked at run time via the -sf intel or -suffix intel command-line switches. Also see the KOKKOS, OPT, and OPENMP packages, which have styles optimized for CPUs and KNLs.  

You need to have an Intel compiler, version 14 or higher to take full advantage of this package. While compilation with GNU compilers is supported, performance will be sub-optimal.  

![](images/826f3f9e8ffef30672ad50c7a7093a4b321133098a7241ca5a8ef9b9c8a7417c.jpg)  

# Note  

the INTEL package contains styles that require using the -restrict flag, when compiling with Intel compilers.  

Author: Mike Brown (Intel).  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/INTEL: filenames $\mathrm{->}$ commands   
• src/INTEL/README   
• Accelerator packages   
• INTEL package   
• Section 2.6 -sf intel   
• Section 2.6 -pk intel   
• package intel   
• Search the commands pages (fix, compute, pair, bond, angle, dihedral, improper, kspace) for styles followed by (i)   
• src/INTEL/TEST   
• Benchmarks page of website  

# 6.2.38 INTERLAYER package  

# Contents:  

A collection of pair styles specifically to be used for modeling layered materials, most commonly graphene sheets (or equivalents).  

# Supporting info:  

• src/INTERLAYER: filenames $\mathrm{->}$ commands • Pair style page • examples/PACKAGES/interlayer  

# 6.2.39 KIM package  

# Contents:  

This package contains a command with a set of sub-commands that serve as a wrapper on the Open Knowledgebase of Interatomic Models (OpenKIM) repository of interatomic models (IMs) enabling compatible ones to be used in LAMMPS simulations.  

This includes kim init, and kim interactions commands to select, initialize and instantiate the IM, a kim query command to perform web queries for material property predictions of OpenKIM IMs, a kim param command to access KIM Model Parameters from LAMMPS, and a kim property command to write material properties computed in LAMMPS to standard KIM property instance format.  

Support for KIM IMs that conform to the KIM Application Programming Interface (API) is provided by the pair_style kim command.  

![](images/257684236b40ee53f3b45fef96ae6f909d269eaa398a0781959bd04f07193320.jpg)  

# Note  

The command pair_style kim is called by kim interactions and is not recommended to be directly used in input scripts.  

To use this package you must have the KIM API library available on your system. The KIM API is available for download on the OpenKIM website. When installing LAMMPS from binary, the kim-api package is a dependency that is automatically downloaded and installed.  

Information about the KIM project can be found at its website: https://openkim.org. The KIM project is led by Ellad Tadmor and Ryan Elliott (U Minnesota) and is funded by the National Science Foundation.  

Authors: Ryan Elliott (U Minnesota) is the main developer for the KIM API and the pair_style kim command. Yaser Afshar (U Minnesota), Axel Kohlmeyer (Temple U), Ellad Tadmor (U Minnesota), and Daniel Karls (U Minnesota) contributed to the kim command interface in close collaboration with Ryan Elliott.  

# Install:  

# 6.2. Package details  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• kim command  
• pair_style kim  
• src/KIM: filenames $\mathbf{->}$ commands  
• src/KIM/README  
• lib/kim/README  
• examples/kim  

# 6.2.40 KOKKOS package  

# Contents:  

Dozens of atom, pair, bond, angle, dihedral, improper, fix, compute styles adapted to compile using the Kokkos library which can convert them to OpenMP or CUDA code so that they run efficiently on multicore CPUs, KNLs, or GPUs. All the styles have a “kk” as a suffix in their style name. The KOKKOS package page gives details of what hardware and software is required on your system, and how to build and use this package. Its styles can be invoked at run time via the -sf kk or -suffix kk command-line switches. Also see the GPU, OPT, INTEL, and OPENMP packages, which have styles optimized for CPUs, KNLs, and GPUs.  

You must have a $\mathrm{C}{+}{+}17$ compatible compiler to use this package. KOKKOS makes extensive use of advanced $\mathrm{C}{+}{+}$ features, which can expose compiler bugs, especially when compiling for maximum performance at high optimization levels. Please see the file lib/kokkos/README for a list of compilers and their respective platforms, that are known to work.  

Authors: The KOKKOS package was created primarily by Christian Trott and Stan Moore (Sandia), with contributions from other folks as well. It uses the open-source Kokkos library which was developed by Carter Edwards, Christian Trott, and others at Sandia, and which is included in the LAMMPS distribution in lib/kokkos.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/KOKKOS: filenames $\mathbf{->}$ commands   
• src/KOKKOS/README   
• lib/kokkos/README   
• Accelerator packages   
• KOKKOS package   
• Section 2.6 -k on . . .   
• Section 2.6 -sf kk   
• Section 2.6 -pk kokkos   
• package kokkos   
• Search the commands pages (fix, compute, pair, bond, angle, dihedral, improper, kspace) for styles followed by (k)   
• Benchmarks page of website  

# 6.2.41 KSPACE package  

# Contents:  

A variety of long-range Coulombic solvers, as well as pair styles which compute the corresponding short-range pairwise Coulombic interactions. These include Ewald, particle-particle particle-mesh (PPPM), and multilevel summation method (MSM) solvers.  

# Install:  

Building with this package requires a 1d FFT library be present on your system for use by the PPPM solvers. This can be the KISS FFT library provided with LAMMPS, third party libraries like FFTW, or a vendor-supplied FFT library. See the Build settings page for details on how to select different FFT options for your LAMMPS build.  

# Supporting info:  

• src/KSPACE: filenames $->$ commands   
• kspace_style   
• doc/PDF/kspace.pdf   
• Howto tip3p   
• Howto tip4p   
• Howto spc   
pair_style coul   
• Search the pair style page for styles with “long” or “msm” in name   
• examples/peptide   
• bench/in.rhodo  

# 6.2.42 LATBOLTZ package  

# Contents:  

Fixes which implement a background Lattice-Boltzmann (LB) fluid, which can be used to model MD particles influenced by hydrodynamic forces.  

Authors: Frances Mackay and Colin Denniston (University of Western Ontario).  

# Install:  

The LATBOLTZ package requires that LAMMPS is build in MPI parallel mode.  

# Supporting info:  

• src/LATBOLTZ: filenames $\mathrm{->}$ commands   
• src/LATBOLTZ/README   
• fix lb/fluid   
• fix lb/momentum   
• fix lb/viscous   
• examples/PACKAGES/latboltz  

# 6.2. Package details  

# 6.2.43 LEPTON package  

# Contents:  

Styles for pair, bond, and angle forces that evaluate the potential function from a string using the Lepton mathematical expression parser. Lepton is a $\mathrm{C}{+}{+}$ library that is bundled with OpenMM and can be used for parsing, evaluating, differentiating, and analyzing mathematical expressions. This is a more lightweight and efficient alternative for evaluating custom potential function to an embedded Python interpreter as used in the PYTHON package. On the other hand, since the potentials are evaluated form analytical expressions, they are more precise than what can be done with tabulated potentials.  

Authors: Axel Kohlmeyer (Temple U). Lepton itself is developed by Peter Eastman at Stanford University.  

Added in version 8Feb2023.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/LEPTON: filenames -> commands   
• lib/lepton/README.md   
• pair_style lepton   
• bond_style lepton   
• angle_style lepton   
• dihedral_style lepton  

# 6.2.44 MACHDYN package  

# Contents:  

An atom style, fixes, computes, and several pair styles which implements smoothed Mach dynamics (SMD) for solids, which is a model related to smoothed particle hydrodynamics (SPH) for liquids (see the SPH package).  

This package solves solids mechanics problems via a state of the art stabilized meshless method with hourglass control. It can specify hydrostatic interactions independently from material strength models, i.e. pressure and deviatoric stresses are separated. It provides many material models (Johnson-Cook, plasticity with hardening, Mie-Grueneisen, Polynomial EOS) and allows new material models to be added. It implements rigid boundary conditions (walls) which can be specified as surface geometries from \*.STL files.  

Author: Georg Ganzenmuller (Fraunhofer-Institute for High-Speed Dynamics, Ernst Mach Institute, Germany).  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/MACHDYN: filenames $\mathbf{->}$ commands • src/MACHDYN/README • doc/PDF/MACHDYN_LAMMPS_userguide.pdf • examples/PACKAGES/machdyn • https://www.lammps.org/movies.html#smd  

# 6.2.45 MANIFOLD package  

# Contents:  

Several fixes and a “manifold” class which enable simulations of particles constrained to a manifold (a 2D surface within the 3D simulation box). This is done by applying the RATTLE constraint algorithm to formulate single-particle constraint functions $\mathrm{g}(\mathrm{xi},\mathrm{yi},\mathrm{zi})=0$ and their derivative (i.e. the normal of the manifold) $\mathrm{n}=\mathrm{grad}(\mathrm{g})$ .  

Author: Stefan Paquay (until 2017: Eindhoven University of Technology (TU/e), The Netherlands; since 2017: Brandeis University, Waltham, MA, USA)  

# Supporting info:  

• src/MANIFOLD: filenames $->$ commands   
• src/MANIFOLD/README   
• Howto manifold   
• fix manifoldforce   
• fix nve/manifold/rattle   
• fix nvt/manifold/rattle   
• examples/PACKAGES/manifold   
• https://www.lammps.org/movies.html#manifold  

# 6.2.46 MANYBODY package  

# Contents:  

A variety of many-body and bond-order potentials. These include (AI)REBO, BOP, EAM, EIM, Stillinger-Weber, and Tersoff potentials.  

# Supporting info:  

• src/MANYBODY: filenames $->$ commands   
• Pair style page   
• examples/comb   
• examples/eim   
• examples/nb3d   
• examples/shear   
• examples/streitz   
• examples/vashishta   
• bench/in.eam  

# 6.2.47 MC package  

# Contents:  

Several fixes and a pair style that have Monte Carlo (MC) or MC-like attributes. These include fixes for creating, breaking, and swapping bonds, for performing atomic swaps, and performing grand canonical MC (GCMC), semigrand canonical MC (SGCMC), or similar processes in conjunction with molecular dynamics (MD).  

# Supporting info:  

• src/MC: filenames $->$ commands   
• fix atom/swap   
• fix bond/break   
• fix bond/create   
• fix bond/create/angle   
• fix bond/swap   
• fix charge/regulation   
• fix gcmc   
• fix sgcmc   
• fix tfmc   
• fix widom   
• pair_style dsmc   
• https://www.lammps.org/movies.html#gc  

# 6.2.48 MDI package  

# Contents:  

A LAMMPS command and fixes to allow client-server coupling of LAMMPS to other atomic or molecular simulation codes or materials modeling workflows via the MolSSI Driver Interface (MDI) library.  

Author: Taylor Barnes - MolSSI, taylor.a.barnes at gmail.com Added in version 14May2021.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/MDI/README   
• lib/mdi/README   
• Howto MDI   
• mdi   
• fix mdi/qm   
• examples/PACKAGES/mdi  

# 6.2.49 MEAM package  

# Contents:  

A pair style for the modified embedded atom (MEAM) potential translated from the Fortran version in the (obsolete) MEAM package to plain $\mathrm{C}{+}{+}$ . The MEAM fully replaces the MEAM package, which has been removed from LAMMPS after the 12 December 2018 version.  

Author: Sebastian Huetter, (Otto-von-Guericke University Magdeburg) based on the Fortran version of Greg Wagner (Northwestern U) while at Sandia.  

# Supporting info:  

• src/MEAM: filenames $->$ commands   
• src/MEAM/README   
• pair_style meam   
• examples/meam  

# 6.2.50 MESONT package  

# Contents:  

MESONT is a LAMMPS package for simulation of nanomechanics of nanotubes (NTs). The model is based on a coarse-grained representation of NTs as “flexible cylinders” consisting of a variable number of segments. Internal interactions within a NT and the van der Waals interaction between the tubes are described by a mesoscopic force field designed and parameterized based on the results of atomic-level molecular dynamics simulations. The description of the force field is provided in the papers listed in src/MESONT/README.  

This package used to have two independent implementations of this model: the original implementation using a Fortran library written by the developers of the model and a second implementation written in $\mathrm{C}{+}{+}$ by Philipp Kloza (U Cambridge). Since the $\mathrm{C}{+}{+}$ implementation offers the same features as the original implementation with the addition of friction, is typically faster, and easier to compile/install, the Fortran library based implementation has since been obsoleted and removed from the distribution. You have to download and compile an older version of LAMMPS if you want to use those.  

# Download of potential files:  

The potential files for these pair styles are very large and thus are not included in the regular downloaded packages of LAMMPS or the git repositories. Instead, they will be automatically downloaded from a web server when the package is installed for the first time.  

# Authors of the obsoleted \*mesont\* styles:  

Maxim V. Shugaev (University of Virginia), Alexey N. Volkov (University of Alabama), Leonid V. Zhigilei (University of Virginia)  

Deprecated since version 8Feb2023.  

Author of the $\mathbf{C}{+}+$ styles: Philipp Kloza (U Cambridge)  

Added in version $15\mathrm{Jun}2020$ .  

# Supporting info:  

• src/MESONT: filenames $\mathrm{->}$ commands • src/MESONT/README • bond_style mesocnt  

# 6.2. Package details  

• angle_style mesocnt   
• pair_style mesocnt   
• examples/PACKAGES/mesont  

# 6.2.51 MGPT package  

# Contents:  

A pair style which provides a fast implementation of the quantum-based MGPT multi-ion potentials. The MGPT or model GPT method derives from first-principles DFT-based generalized pseudopotential theory (GPT) through a series of systematic approximations valid for mid-period transition metals with nearly half-filled d bands. The MGPT method was originally developed by John Moriarty at LLNL. The pair style in this package calculates forces and energies using an optimized matrix-MGPT algorithm due to Tomas Oppelstrup at LLNL.  

Authors: Tomas Oppelstrup and John Moriarty (LLNL).  

# Supporting info:  

• src/MGPT: filenames $\mathbf{->}$ commands • src/MGPT/README pair_style mgpt examples/PACKAGES/mgpt  

# 6.2.52 MISC package  

# Contents:  

A variety of compute, fix, pair, bond styles with specialized capabilities that don’t align with other packages. Do a directory listing, ls src/MISC, to see the list of commands.  

# Note  

the MISC package contains styles that require using the -restrict flag, when compiling with Intel compilers.  

# Supporting info:  

• src/MISC: filenames $\mathrm{->}$ commands   
• bond_style special   
• compute viscosity/cos   
• fix accelerate/cos   
• fix imd   
• fix ipi   
• pair_style agni   
• pair_style list   
• pair_style srp   
• pair_style tracker  

# 6.2.53 ML-HDNNP package  

# Contents:  

A pair_style hdnnp command which allows to use high-dimensional neural network potentials (HDNNPs), a form of machine learning potentials. HDNNPs must be carefully trained prior to their application in a molecular dynamics simulation.  

To use this package you must have the n2p2 library installed and compiled on your system.  

Author: Andreas Singraber Added in version 27May2021.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/ML-HDNNP: filenames $->$ commands   
• src/ML-HDNNP/README   
• lib/hdnnp/README   
• pair_style hdnnp   
• examples/PACKAGES/hdnnp  

# 6.2.54 ML-IAP package  

# Contents:  

A general interface for machine-learning interatomic potentials, including PyTorch.  

# Install:  

To use this package, also the ML-SNAP package needs to be installed. To make the mliappy model available, also the PYTHON package needs to be installed, the version of Python must be 3.6 or later, and the cython software must be installed.  

Author: Aidan Thompson (Sandia), Nicholas Lubbers (LANL).  

Added in version 30Jun2020.  

# Supporting info:  

• src/ML-IAP: filenames $->$ commands   
• src/ML-IAP/README.md   
• pair_style mliap   
• compute_style mliap   
• examples/mliap (see README)  

When built with the mliappy model this package includes an extension for coupling with Python models, including PyTorch. In this case, the Python interpreter linked to LAMMPS will need the cython and numpy modules installed. The provided examples build models with PyTorch, which would therefore also needs to be installed to run those examples.  

# 6.2. Package details  

# 6.2.55 ML-PACE package  

# Contents:  

A pair style for the Atomic Cluster Expansion potential (ACE). ACE is a methodology for deriving a highly accurate classical potential fit to a large archive of quantum mechanical (DFT) data. The ML-PACE package provides an efficient implementation for running simulations with ACE potentials.  

# Authors:  

This package was written by Yury Lysogorskiy^1, Cas van der Oord^2, Anton Bochkarev^1, Sarath Menon^1, Matteo Rinaldi^1, Thomas Hammerschmidt^1, Matous Mrovec^1, Aidan Thompson $\wedge3$ , Gabor Csanyi^2, Christoph Ortner^4, Ralf Drautz $\wedge_{1}$ .  

$\wedge_{1}$ : Ruhr-University Bochum, Bochum, Germany ^2: University of Cambridge, Cambridge, United Kingdom ^3: Sandia National Laboratories, Albuquerque, New Mexico, USA $\wedge_{4}$ : University of British Columbia, Vancouver, BC, Canada  

Added in version 14May2021.  

# Install:  

This package has specific installation instructions on the Build extras page. This package may also be compiled as a plugin to avoid licensing conflicts when distributing binaries.  

# Supporting info:  

• src/ML-PACE: filenames $->$ commands • pair_style pace examples/PACKAGES/pace  

# 6.2.56 ML-POD package  

# Contents:  

A pair style and fitpod style for Proper Orthogonal Descriptors (POD). POD is a methodology for deriving descriptors based on the proper orthogonal decomposition. The ML-POD package provides an efficient implementation for running simulations with POD potentials, along with fitting the potentials natively in LAMMPS.  

# Authors:  

Ngoc Cuong Nguyen (MIT), Andrew Rohskopf (Sandia) Added in version 22Dec2022.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/ML-POD: filenames $->$ commands   
• pair_style pod   
• command_style fitpod  

• examples/PACKAGES/pod  

# 6.2.57 ML-QUIP package  

# Contents:  

A pair_style quip command which wraps the QUIP libAtoms library, which includes a variety of interatomic potentials, including Gaussian Approximation Potential (GAP) models developed by the Cambridge University group.  

To use this package you must have the QUIP libAtoms library available on your system.  

Author: Albert Bartok (Cambridge University)  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/ML-QUIP: filenames $\mathbf{->}$ commands • src/ML-QUIP/README pair_style quip examples/PACKAGES/quip  

# 6.2.58 ML-RANN package  

# Contents:  

A pair style for using rapid atomistic neural network (RANN) potentials. These neural network potentials work by first generating a series of symmetry functions from the neighbor list and then using these values as the input layer of a neural network.  

# Authors:  

This package was written by Christopher Barrett with contributions by Doyl Dickel, Mississippi State University.  

Added in version 27May2021.  

# Supporting info:  

• src/ML-RANN: filenames $->$ commands • pair_style rann • examples/PACKAGES/rann  

# 6.2.59 ML-SNAP package  

# Contents:  

A pair style for the spectral neighbor analysis potential (SNAP). SNAP is methodology for deriving a highly accurate classical potential fit to a large archive of quantum mechanical (DFT) data. Also several computes which analyze attributes of the potential.  

Author: Aidan Thompson (Sandia).  

Supporting info:  

# 6.2. Package details  

• src/ML-SNAP: filenames $->$ commands   
pair_style snap   
compute sna/atom   
compute sna/grid   
compute sna/grid/local   
• compute snad/atom   
• compute snav/atom   
• examples/snap  

# 6.2.60 ML-UF3 package  

# Contents:  

A pair style for the ultra-fast force field potentials (UF3). UF3 is a methodology for deriving a highly accurate classical potential which is fast to evaluate and is fitted to a large archives of quantum mechanical (DFT) data. The use of b-spline basis set in UF3 enables the rapid evaluation of 2-body and 3-body interactions.  

Authors: Ajinkya C Hire (University of Florida), Hendrik Krass (University of Constance), Matthias Rupp (Luxembourg Institute of Science and Technology), Richard Hennig (University of Florida)  

# Supporting info:  

• src/ML-UF3: filenames $\mathrm{->}$ commands   
pair_style uf3   
• examples/uf3   
• https://github.com/uf3/uf3  

# 6.2.61 MOFFF package  

# Contents:  

Pair, angle and improper styles needed to employ the MOF-FF force field by Schmid and coworkers with LAMMPS. MOF-FF is a first principles derived force field with the primary aim to simulate MOFs and related porous framework materials, using spherical Gaussian charges. It is described in S. Bureekaew et al., Phys. Stat. Sol. B 2013, 250, 1128-1141. For the usage of MOF-FF see the example in the example directory as well as the $\mathrm{MOF+}$ website.  

Author: Hendrik Heenen (Technical U of Munich), Rochus Schmid (Ruhr-University Bochum).  

# Supporting info:  

• src/MOFFF: filenames $\mathbf{->}$ commands • src/MOFFF/README • pair_style buck6d/coul/gauss • angle_style class2 angle_style cosine/buck6d • improper_style inversion/harmonic examples/PACKAGES/mofff  

# 6.2.62 MOLECULE package  

# Contents:  

A large number of atom, pair, bond, angle, dihedral, improper styles that are used to model molecular systems with fixed covalent bonds. The pair styles include the Dreiding (hydrogen-bonding) and CHARMM force fields, and a TIP4P water model.  

# Supporting info:  

• src/MOLECULE: filenames $\mathrm{->}$ command   
• atom_style   
• bond_style   
• angle_style   
• dihedral_style   
• improper_style   
• pair_style hbond/dreiding/lj   
• pair_style lj/charmm/coul/charmm   
• Howto bioFF   
• examples/cmap   
• examples/dreiding   
• examples/micelle,   
• examples/peptide   
• bench/in.chain   
• bench/in.rhodo  

# 6.2.63 MOLFILE package  

# Contents:  

A dump molfile command which uses molfile plugins that are bundled with the VMD molecular visualization and analysis program, to enable LAMMPS to dump snapshots in formats compatible with various molecular simulation tools.  

To use this package you must have the desired VMD plugins available on your system.  

Note that this package only provides the interface code, not the plugins themselves, which will be accessed when requesting a specific plugin via the dump molfile command. Plugins can be obtained from a VMD installation which has to match the platform that you are using to compile LAMMPS for. By adding plugins to VMD, support for new file formats can be added to LAMMPS (or VMD or other programs that use them) without having to re-compile the application itself. More information about the VMD molfile plugins can be found at https://www.ks.uiuc.edu/Research/ vmd/plugins/molfile.  

Author: Axel Kohlmeyer (Temple U).  

# Install:  

This package has specific installation instructions on the Build extras page.  

Supporting info:  

# 6.2. Package details  

• src/MOLFILE: filenames $->$ commands   
• src/MOLFILE/README   
• lib/molfile/README   
• dump molfile  

# 6.2.64 NETCDF package  

# Contents:  

Dump styles for writing NetCDF formatted dump files. NetCDF is a portable, binary, self-describing file format developed on top of HDF5. The file contents follow the AMBER NetCDF trajectory conventions (https://ambermd.org/ netcdf/nctraj.xhtml), but include extensions.  

To use this package you must have the NetCDF library available on your system.  

Note that NetCDF files can be directly visualized with the following tools:  

• Ovito (Ovito supports the AMBER convention and the extensions mentioned above) • VMD  

Author: Lars Pastewka (Karlsruhe Institute of Technology).  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/NETCDF: filenames $\mathrm{->}$ commands   
• src/NETCDF/README   
• lib/netcdf/README   
• dump netcdf  

# 6.2.65 OPENMP package  

# Contents:  

Hundreds of pair, fix, compute, bond, angle, dihedral, improper, and kspace styles which are altered to enable threading on many-core CPUs via OpenMP directives. All of them have an “omp” in their style name. The OPENMP package page gives details of what hardware and compilers are required on your system, and how to build and use this package. Its styles can be invoked at run time via the -sf omp or -suffix omp command-line switches. Also see the KOKKOS, OPT, and INTEL packages, which have styles optimized for CPUs.  

Author: Axel Kohlmeyer (Temple U).  

# Note  

To enable multi-threading support the compile flag -fopenmp and the link flag -fopenmp (for GNU compilers, you have to look up the equivalent flags for other compilers) must be used to build LAMMPS. When using Intel compilers, also the -restrict flag is required. The OPENMP package can be compiled without enabling OpenMP; then all code will be compiled as serial and the only improvement over the regular styles are some data access optimization. These flags should be added to the CCFLAGS and LINKFLAGS lines of your Makefile.machine. See src/MAKE/OPTIONS/Makefile.omp for an example.  

Once you have an appropriate Makefile.machine, you can install/uninstall the package and build LAMMPS in the usual manner:  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/OPENMP: filenames $->$ commands   
• src/OPENMP/README   
• Accelerator packages   
• OPENMP package   
• Command-line option -suffix/-sf omp   
• Command-line option -package/-pk omp   
• package omp   
• Search the commands pages (fix, compute, pair, bond, angle, dihedral, improper, kspace) for styles followed by (o)   
• Benchmarks page of website  

# 6.2.66 OPT package  

# Contents:  

A handful of pair styles which are optimized for improved CPU performance on single or multiple cores. These include EAM, LJ, CHARMM, and Morse potentials. The styles have an “opt” suffix in their style name. The OPT package page gives details of how to build and use this package. Its styles can be invoked at run time via the -sf opt or -suffix opt command-line switches. See also the KOKKOS, INTEL, and OPENMP packages, which have styles optimized for CPU performance.  

Authors: James Fischer (High Performance Technologies), David Richie, and Vincent Natoli (Stone Ridge Technology).  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/OPT: filenames $->$ commands   
• Accelerator packages   
• OPT package   
• Section 2.6 -sf opt   
• Search the pair style page for styles followed by (t)   
• Benchmarks page of website  

# 6.2. Package details  

# 6.2.67 ORIENT package  

# Contents:  

A few fixes that apply orientation dependent forces for studying grain boundary migration.  

# Supporting info:  

• src/ORIENT: filenames $->$ commands   
• fix orient/bcc   
• fix orient/fcc   
• fix orient/eco  

# 6.2.68 PERI package  

# Contents:  

An atom style, several pair styles which implement different Peridynamics materials models, and several computes which calculate diagnostics. Peridynamics is a particle-based meshless continuum model.  

Authors: The original package was created by Mike Parks (Sandia). Additional Peridynamics models were added by Rezwanur Rahman and John Foster (UTSA).  

# Supporting info:  

• src/PERI: filenames $\mathbf{->}$ commands   
• Peridynamics Howto   
• doc/PDF/PDLammps_overview.pdf   
• doc/PDF/PDLammps_EPS.pdf   
• doc/PDF/PDLammps_VES.pdf   
• atom_style peri   
• pair_style peri/\*   
• compute damage/atom   
• compute plasticity/atom   
• examples/peri   
• https://www.lammps.org/movies.html#pe  

# 6.2.69 PHONON package  

# Contents:  

A fix phonon command that calculates dynamical matrices, which can then be used to compute phonon dispersion relations, directly from molecular dynamics simulations. And a dynamical_matrix as well as a third_order command to compute the dynamical matrix and third order tensor from finite differences.  

# Install:  

The fix phonon command also requires that the KSPACE package is installed.  

Authors: Ling-Ti Kong (Shanghai Jiao Tong University) for “fix phonon” and Charlie Sievers (UC Davis) for “dynamical_matrix” and “third_order”  

# Supporting info:  

• src/PHONON: filenames $->$ commands   
• src/PHONON/README   
• fix phonon   
• dynamical_matrix   
• third_order   
examples/PACKAGES/phonon  

# 6.2.70 PLUGIN package  

# Contents:  

A plugin command that can load and unload several kind of styles in LAMMPS from shared object files at runtime without having to recompile and relink LAMMPS.  

When the environment variable LAMMPS_PLUGIN_PATH is set, then LAMMPS will search the directory (or directories) listed in this path for files with names that end in plugin.so (e.g. helloplugin.so) and will try to load the contained plugins automatically at start-up.  

Authors: Axel Kohlmeyer (Temple U)  

Added in version 8Apr2021.  

# Supporting info:  

• src/PLUGIN: filenames $->$ commands   
• plugin command   
• Information on writing plugins   
• examples/plugin  

# 6.2.71 PLUMED package  

# Contents:  

The fix plumed command allows you to use the PLUMED free energy plugin for molecular dynamics to analyze and bias your LAMMPS trajectory on the fly. The PLUMED library is called from within the LAMMPS input script by using the fix plumed command.  

Authors: The PLUMED library is written and maintained by Massimilliano Bonomi, Giovanni Bussi, Carlo Camiloni, and Gareth Tribello.  

# Install:  

This package has specific installation instructions on the Build extras page. This package may also be compiled as a plugin to avoid licensing conflicts when distributing binaries.  

# Supporting info:  

• src/PLUMED/README  

# 6.2. Package details  

# LAMMPS Documentation, Release 4Feb2025  

• lib/plumed/README • fix plumed • examples/PACKAGES/plumed  

# 6.2.72 POEMS package  

# Contents:  

A fix that wraps the Parallelizable Open source Efficient Multibody Software (POEMS) library, which is able to simulate the dynamics of articulated body systems. These are systems with multiple rigid bodies (collections of particles) whose motion is coupled by connections at hinge points.  

Author: Rudra Mukherjee (JPL) while at RPI.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/POEMS: filenames $\mathbf{->}$ commands   
• src/POEMS/README   
• lib/poems/README   
• fix poems   
• examples/rigid  

# 6.2.73 PTM package  

# Contents:  

A compute ptm/atom command that calculates local structure characterization using the Polyhedral Template Matching methodology.  

Author: Peter Mahler Larsen (MIT).  

# Supporting info:  

• src/PTM: filenames not starting with ptm_ $\mathrm{->}$ commands • src/PTM: filenames starting with ptm_ $->$ supporting code • src/PTM/LICENSE   
• compute ptm/atom  

# 6.2.74 PYTHON package  

# Contents:  

A python command which allow you to execute Python code from a LAMMPS input script. The code can be in a separate file or embedded in the input script itself. See the Python call page for an overview of using Python from LAMMPS in this manner and all the Python manual pages for other ways to use LAMMPS and Python together.  

![](images/327198e6494231e28f077d221a750846ddd701072c0b3f85f3040a1a904cdb50.jpg)  

# Note  

Building with the PYTHON package assumes you have a Python development environment (headers and libraries) available on your system, which needs to be either Python version 2.7 or Python 3.5 and later.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/PYTHON: filenames $\mathrm{->}$ commands   
• Python call   
• lib/python/README   
• examples/python  

# 6.2.75 QEQ package  

# Contents:  

Several fixes for performing charge equilibration (QEq) via different algorithms. These can be used with pair styles that perform QEq as part of their formulation.  

# Supporting info:  

• src/QEQ: filenames $\mathbf{->}$ commands   
• fix qeq/\*   
examples/qeq   
• examples/streitz  

# 6.2.76 QMMM package  

# Contents:  

A fix qmmm command which allows LAMMPS to be used as the MM code in a QM/MM simulation. This is currently only available in combination with the Quantum ESPRESSO package.  

To use this package you must have Quantum ESPRESSO (QE) available on your system and include its coupling library in the compilation and then compile LAMMPS as a library. For QM/MM calculations you then build a custom binary with MPI support, that sets up 3 partitions with MPI sub-communicators (for inter- and intra-partition communication) and then calls the corresponding library interfaces on each partition (2x LAMMPS and 1x QE).  

The current implementation supports an ONIOM style mechanical coupling and a multi-pole based electrostatic coupling to the Quantum ESPRESSO plane wave DFT package. The QM/MM interface has been written in a manner that coupling to other QM codes should be possible without changes to LAMMPS itself.  

# 6.2. Package details  

Authors: Axel Kohlmeyer (Temple U). Mariella Ippolito and Carlo Cavazzoni (CINECA, Italy)  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/QMMM: filenames $\mathrm{->}$ commands • src/QMMM/README • lib/qmmm/README • fix phonon • lib/qmmm/example-ec/README • lib/qmmm/example-mc/README  

# 6.2.77 QTB package  

# Contents:  

Two fixes which provide a self-consistent quantum treatment of vibrational modes in a classical molecular dynamics simulation. By coupling the MD simulation to a colored thermostat, it introduces zero point energy into the system, altering the energy power spectrum and the heat capacity to account for their quantum nature. This is useful when modeling systems at temperatures lower than their classical limits or when temperatures ramp across the classical limits in a simulation.  

Author: Yuan Shen (Stanford U).  

# Supporting info:  

• src/QTB: filenames $->$ commands   
• src/QTB/README   
• fix qtb   
• fix qbmsst   
• examples/PACKAGES/qtb  

# 6.2.78 REACTION package  

# Contents:  

This package implements the REACTER protocol, which allows for complex bond topology changes (reactions) during a running MD simulation when using classical force fields. Topology changes are defined in pre- and post-reaction molecule templates and can include creation and deletion of bonds, angles, dihedrals, impropers, atom types, bond types, angle types, dihedral types, improper types, and/or atomic charges. Other options currently available include reaction constraints (e.g., angle and Arrhenius constraints), deletion of reaction byproducts or other small molecules, creation of new atoms or molecules bonded to existing atoms, and using LAMMPS variables for input parameters.  

Author: Jacob R. Gissinger (NASA Langley Research Center).  

# Supporting info:  

• src/REACTION: filenames $->$ commands • src/REACTION/README  

• fix bond/react examples/PACKAGES/reaction • 2017 LAMMPS Workshop • 2019 LAMMPS Workshop • 2021 LAMMPS Workshop • REACTER website (reacter.org)  

# 6.2.79 REAXFF package  

# Contents:  

A pair style which implements the ReaxFF potential in $\mathrm{C/C++}$ . ReaxFF is a universal reactive force field. See the src/REAXFF/README file for more info on differences between the two packages. Also two fixes for monitoring molecules as bonds are created and destroyed.  

Author: Hasan Metin Aktulga (MSU) while at Purdue University.  

# Supporting info:  

• src/REAXFF: filenames $\mathrm{->}$ commands   
• src/REAXFF/README   
• pair_style reaxff   
• fix reaxff/bonds   
• fix reaxff/species   
• examples/reaxff  

# 6.2.80 REPLICA package  

# Contents:  

A collection of multi-replica methods which can be used when running multiple LAMMPS simulations (replicas). See the Howto replica page for an overview of how to run multi-replica simulations in LAMMPS. Methods in the package include nudged elastic band (NEB), parallel replica dynamics (PRD), temperature accelerated dynamics (TAD), parallel tempering, and a verlet/split algorithm for performing long-range Coulombics on one set of processors, and the remainder of the force field calculation on another set.  

# Supporting info:  

• src/REPLICA: filenames $\mathbf{->}$ commands   
• Howto replica   
• neb prd   
tad   
• temper,   
• temper/npt,   
• temper/grem,  

# 6.2. Package details  

• run_style verlet/split   
• examples/neb   
• examples/prd   
• examples/tad   
examples/PACKAGES/grem  

# 6.2.81 RHEO package  

# Contents:  

Pair styles, bond styles, fixes, and computes for reproducing hydrodynamics and elastic objects. See the Howto rheo page for an overview.  

# Install:  

This package has specific installation instructions on the Build extras page.  

Authors: Joel T. Clemmer (Sandia National Labs), Thomas C. O’Connor (Carnegie Mellon University)  

Added in version 29Aug2024.  

# Supporting info:  

• src/RHEO filenames $\mathrm{->}$ commands   
• Howto_rheo   
• atom_style rheo   
• atom_style rheo/thermal   
• bond_style rheo/shell   
• compute rheo/property/atom   
• fix rheo   
• fix rheo/oxidation   
• fix rheo/pressure   
• fix rheo/thermal   
• fix rheo/viscosity   
pair_style rheo   
pair_style rheo/solid   
• https://www.lammps.org/movies.html#rheopackage   
• examples/rheo  

# 6.2.82 RIGID package  

# Contents:  

Fixes which enforce rigid constraints on collections of atoms or particles. This includes SHAKE and RATTLE, as well as various rigid-body integrators for a few large bodies or many small bodies. Also several computes which calculate properties of rigid bodies.  

# Supporting info:  

• src/RIGID: filenames $->$ commands   
• compute erotate/rigid   
• fix shake   
• fix rattle   
• fix rigid/\*   
• examples/ASPHERE   
• examples/rigid   
• bench/in.rhodo   
• https://www.lammps.org/movies.html#box   
• https://www.lammps.org/movies.html#star  

# 6.2.83 SCAFACOS package  

# Contents:  

A KSpace style which wraps the ScaFaCoS Coulomb solver library to compute long-range Coulombic interactions.  

To use this package you must have the ScaFaCoS library available on your system.  

Author: Rene Halver (JSC) wrote the scafacos LAMMPS command.  

ScaFaCoS itself was developed by a consortium of German research facilities with a BMBF (German Ministry of Science and Education) funded project in 2009-2012. Participants of the consortium were the Universities of Bonn, Chemnitz, Stuttgart, and Wuppertal as well as the Forschungszentrum Juelich.  

# Install:  

This package has specific installation instructions on the Build extras page. The SCAFACOS package requires that LAMMPS is build in MPI parallel mode.  

# Supporting info:  

• src/SCAFACOS: filenames -> commands   
• src/SCAFACOS/README   
• kspace_style scafacos   
• kspace_modify   
examples/PACKAGES/scafacos  

# 6.2. Package details  

# 6.2.84 SHOCK package  

# Contents:  

Fixes for running impact simulations where a shock-wave passes through a material.  

# Supporting info:  

• src/SHOCK: filenames $->$ commands   
• fix append/atoms   
• fix msst   
• fix nphug   
• fix wall/piston   
examples/hugoniostat   
• examples/msst  

# 6.2.85 SMTBQ package  

# Contents:  

Pair styles which implement Second Moment Tight Binding models. One with QEq charge equilibration (SMTBQ) for the description of ionocovalent bonds in oxides, and two more as plain SMATB models.  

Authors: SMTBQ: Nicolas Salles, Emile Maras, Olivier Politano, and Robert Tetot (LAAS-CNRS, France); SMATB Daniele Rapetti (Politecnico di Torino)  

# Supporting info:  

• src/SMTBQ: filenames $\mathrm{->}$ commands • src/SMTBQ/README • pair_style smtbq pair_style smatb, pair_style smatb/single examples/PACKAGES/smtbq  

# 6.2.86 SPH package  

# Contents:  

An atom style, fixes, computes, and several pair styles which implements smoothed particle hydrodynamics (SPH) for liquids. See the related MACHDYN package package for smooth Mach dynamics (SMD) for solids.  

This package contains ideal gas, Lennard-Jones equation of states, Tait, and full support for complete (i.e. internalenergy dependent) equations of state. It allows for plain or Monaghans XSPH integration of the equations of motion. It has options for density continuity or density summation to propagate the density field. It has set command options to set the internal energy and density of particles from the input script and allows the same quantities to be output with thermodynamic output or to dump files via the compute property/atom command.  

Author: Georg Ganzenmuller (Fraunhofer-Institute for High-Speed Dynamics, Ernst Mach Institute, Germany).  

# Supporting info:  

• src/SPH: filenames $\mathbf{->}$ commands • src/SPH/README • doc/PDF/SPH_LAMMPS_userguide.pdf • examples/PACKAGES/sph • https://www.lammps.org/movies.html#sph  

![](images/0f98cc5f704a00264ef75a9d68439383b46e090b3cdb8282812421b63e1ba914.jpg)  

# Note  

Please note that the SPH PDF guide file has not been updated for many years and thus does not reflect the current syntax of the SPH package commands. For that please refer to the LAMMPS manual.  

# Note  

Please also note, that the RHEO package offers similar functionality in a more modern and flexible implementation.  

# 6.2.87 SPIN package  

# Contents:  

Model atomic magnetic spins classically, coupled to atoms moving in the usual manner via MD. Various pair, fix, and compute styles.  

Author: Julien Tranchida (Sandia).  

# Supporting info:  

• src/SPIN: filenames $\mathbf{->}$ commands   
• Howto spins   
pair_style spin/dipole/cut   
• pair_style spin/dipole/long   
• pair_style spin/dmi   
• pair_style spin/exchange   
• pair_style spin/exchange/biquadratic   
• pair_style spin/magelec   
• pair_style spin/neel   
• fix nve/spin   
• fix langevin/spin   
• fix precession/spin   
• compute spin   
• neb/spin   
• examples/SPIN  

# 6.2. Package details  

# 6.2.88 SRD package  

# Contents:  

A pair of fixes which implement the Stochastic Rotation Dynamics (SRD) method for coarse-graining of a solvent, typically around large colloidal particles.  

# Supporting info:  

• src/SRD: filenames $\mathbf{->}$ commands   
• fix srd   
• fix wall/srd   
• examples/srd   
• examples/ASPHERE   
• https://www.lammps.org/movies.html#tri   
• https://www.lammps.org/movies.html#line   
• https://www.lammps.org/movies.html#poly  

# 6.2.89 TALLY package  

# Contents:  

Several compute styles that can be called when pairwise interactions are calculated to tally information (forces, heat flux, energy, stress, etc) about individual interactions.  

Author: Axel Kohlmeyer (Temple U).  

# Supporting info:  

• src/TALLY: filenames $->$ commands • src/TALLY/README • compute \*/tally examples/PACKAGES/tally  

# 6.2.90 UEF package  

# Contents:  

A fix style for the integration of the equations of motion under extensional flow with proper boundary conditions, as well as several supporting compute styles and an output option.  

Author: David Nicholson (MIT).  

# Supporting info:  

• src/UEF: filenames $\mathrm{->}$ commands   
• src/UEF/README   
• fix nvt/uef   
• fix npt/uef   
• compute pressure/uef  

• compute temp/uef• dump cfg/uef• examples/uef  

# 6.2.91 VORONOI package  

# Contents:  

A compute command which calculates the Voronoi tesselation of a collection of atoms by wrapping the Voro $^{++}$ library.   
This can be used to calculate the local volume or each atoms or its near neighbors.  

To use this package you must have the Voro $^{++}$ library available on your system.  

Author: Daniel Schwen (INL) while at LANL. The open-source Voro $^{++}$ library was written by Chris Rycroft (Harvar U) while at UC Berkeley and LBNL.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/VORONOI: filenames $\mathbf{->}$ commands   
• src/VORONOI/README   
• lib/voronoi/README   
• compute voronoi/atom   
• examples/voronoi  

# 6.2.92 VTK package  

# Contents:  

A dump vtk command which outputs snapshot info in the VTK format, enabling visualization by Paraview or other visualization packages.  

To use this package you must have VTK library available on your system.  

Authors: Richard Berger (JKU) and Daniel Queteschiner (DCS Computing).  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/VTK: filenames $->$ commands   
• src/VTK/README   
• lib/vtk/README   
• dump vtk  

# 6.2. Package details  

# 6.2.93 YAFF package  

# Contents:  

Some potentials that are also implemented in the Yet Another Force Field (YAFF) code. The expressions and their use are discussed in the following papers  

• Vanduyfhuys et al., J. Comput. Chem., 36 (13), 1015-1027 (2015) link • Vanduyfhuys et al., J. Comput. Chem., 39 (16), 999-1011 (2018) link  

which discuss the QuickFF methodology.  

Author: Steven Vandenbrande.   
Added in version 1Feb2019.  

# Supporting info:  

• src/YAFF/README   
• angle_style cross   
• angle_style mm3   
• bond_style mm3   
• improper_style distharm   
• improper_style sqdistharm   
pair_style mm3/switch3/coulgauss/long   
pair_style lj/switch3/coulgauss/long   
examples/PACKAGES/yaff  

# ACCELERATE PERFORMANCE  

This section describes various methods for improving LAMMPS performance for different classes of problems running on different kinds of machines.  

There are two thrusts to the discussion that follows. The first is using code options that implement alternate algorithms that can speed-up a simulation. The second is to use one of the several accelerator packages provided with LAMMPS that contain code optimized for certain kinds of hardware, including multicore CPUs, GPUs, and Intel Xeon Phi coprocessors.  

The Benchmark page of the LAMMPS website gives performance results for the various accelerator packages discussed on the Accelerator packages page, for several of the standard LAMMPS benchmark problems, as a function of problem size and number of compute nodes, on different hardware platforms.  

# 7.1 Benchmarks  

Current LAMMPS performance is discussed on the Benchmarks page of the LAMMPS website where timings and parallel efficiency are listed. The page has several sections, which are briefly described below:  

• CPU performance on 5 standard problems, strong and weak scaling • GPU and Xeon Phi performance on same and related problems • Comparison of cost of interatomic potentials • Performance of huge, billion-atom problems  

The 5 standard problems are as follow:  

1. LJ $=$ atomic fluid, Lennard-Jones potential with 2.5 sigma cutoff (55 neighbors per atom), NVE integration   
2. Chain $=$ bead-spring polymer melt of 100-mer chains, FENE bonds and LJ pairwise interactions with a 2 6 sigma cutoff (5 neighbors per atom), NVE integration   
3. EAM $=$ metallic solid, Cu EAM potential with 4.95 Angstrom cutoff (45 neighbors per atom), NVE integration   
4. Chute $=$ granular chute flow, frictional history potential with 1.1 sigma cutoff (7 neighbors per atom), NVE integration   
5. Rhodo $=$ rhodopsin protein in solvated lipid bilayer, CHARMM force field with a 10 Angstrom LJ cutoff (440 neighbors per atom), particle-particle particle-mesh (PPPM) for long-range Coulombics, NPT integration  

Input files for these 5 problems are provided in the bench directory of the LAMMPS distribution. Each has 32,000 atoms and runs for 100 timesteps. The size of the problem (number of atoms) can be varied using command-line switches as described in the bench/README file. This is an easy way to test performance and either strong or weak scalability on your machine.  

The bench directory includes a few log.\* files that show performance of these 5 problems on 1 or 4 cores of Linux desktop. The bench/FERMI and bench/KEPLER directories have input files and scripts and instructions for running the same (or similar) problems using OpenMP or GPU or Xeon Phi acceleration options. See the README files in those directories and the Accelerator packages pages for instructions on how to build LAMMPS and run on that kind of hardware.  

The bench/POTENTIALS directory has input files which correspond to the table of results on the Potentials section of the Benchmarks web page. So you can also run those test problems on your machine.  

The billion-atom section of the Benchmarks web page has performance data for very large benchmark runs of simple Lennard-Jones (LJ) models, which use the bench/in.lj input script.  

For all the benchmarks, a useful metric is the CPU cost per atom per timestep. Since performance scales roughly linearly with problem size and timesteps for all LAMMPS models (i.e. interatomic or coarse-grained potentials), the run time of any problem using the same model (atom style, force field, cutoff, etc) can then be estimated.  

Performance on a parallel machine can also be predicted from one-core or one-node timings if the parallel efficiency can be estimated. The communication bandwidth and latency of a particular parallel machine affects the efficiency. On most machines LAMMPS will give a parallel efficiency on these benchmarks above $50\%$ so long as the number of atoms/core is a few 100 or greater, and closer to $100\%$ for large numbers of atoms/core. This is for all-MPI mode with one MPI task per core. For nodes with accelerator options or hardware (OpenMP, GPU, Phi), you should first measure single node performance. Then you can estimate parallel performance for multi-node runs using the same logic as for all-MPI mode, except that now you will typically need many more atoms/node to achieve good scalability.  

# 7.2 Measuring performance  

Before trying to make your simulation run faster, you should understand how it currently performs and where the bottlenecks are.  

The best way to do this is run the your system (actual number of atoms) for a modest number of timesteps (say 100 steps) on several different processor counts, including a single processor if possible. Do this for an equilibrium version of your system, so that the 100-step timings are representative of a much longer run. There is typically no need to run for 1000s of timesteps to get accurate timings; you can simply extrapolate from short runs.  

For the set of runs, look at the timing data printed to the screen and log file at the end of each LAMMPS run. The screen and logfile output page gives an overview.  

Running on one (or a few processors) should give a good estimate of the serial performance and what portions of the timestep are taking the most time. Running the same problem on a few different processor counts should give an estimate of parallel scalability. I.e. if the simulation runs 16x faster on 16 processors, its $100\%$ parallel efficient; if it runs 8x faster on 16 processors, it’s $50\%$ efficient.  

The most important data to look at in the timing info is the timing breakdown and relative percentages. For example, trying different options for speeding up the long-range solvers will have little impact if they only consume $10\%$ of the run time. If the pairwise time is dominating, you may want to look at GPU or OMP versions of the pair style, as discussed below. Comparing how the percentages change as you increase the processor count gives you a sense of how different operations within the timestep are scaling. Note that if you are running with a Kspace solver, there is additional output on the breakdown of the Kspace time. For PPPM, this includes the fraction spent on FFTs, which can be communication intensive.  

Another important detail in the timing info are the histograms of atoms counts and neighbor counts. If these vary widely across processors, you have a load-imbalance issue. This often results in inaccurate relative timing data, because processors have to wait when communication occurs for other processors to catch up. Thus the reported times for “Communication” or “Other” may be higher than they really are, due to load-imbalance. If this is an issue, you can use the timer sync command to obtain synchronized timings.  

# 7.3 General tips  

![](images/28e77bfddaa70997600c616678b16d25afe71cf1cff6b7d2fa00123698b456e1.jpg)  

# Note  

this page is still a work in progress  

Here is a list of general ideas for improving simulation performance. Most of them are only applicable to certain models and certain bottlenecks in the current performance, so let the timing data you generate be your guide. It is hard, if not impossible, to predict how much difference these options will make, since it is a function of problem size, number of processors used, and your machine. There is no substitute for identifying performance bottlenecks, and trying out various options.  

• rRESPA   
• Two-FFT PPPM   
• Staggered PPPM   
• single vs double PPPM   
• partial charge PPPM   
• verlet/split run style   
• processor command for proc layout and numa layout   
• load-balancing: balance and fix balance  

Two-FFT PPPM, also called analytic differentiation or ad PPPM, uses 2 FFTs instead of the 4 FFTs used by the default ik differentiation PPPM. However, 2-FFT PPPM also requires a slightly larger mesh size to achieve the same accuracy as 4-FFT PPPM. For problems where the FFT cost is the performance bottleneck (typically large problems running on many processors), 2-FFT PPPM may be faster than 4-FFT PPPM.  

Staggered PPPM performs calculations using two different meshes, one shifted slightly with respect to the other. This can reduce force aliasing errors and increase the accuracy of the method, but also doubles the amount of work required. For high relative accuracy, using staggered PPPM allows one to half the mesh size in each dimension as compared to regular PPPM, which can give around a $4\mathbf{x}$ speedup in the kspace time. However, for low relative accuracy, using staggered PPPM gives little benefit and can be up to $2\mathbf{x}$ slower in the kspace time. For example, the rhodopsin benchmark was run on a single processor, and results for kspace time vs. relative accuracy for the different methods are shown in the figure below. For this system, staggered PPPM (using ik differentiation) becomes useful when using a relative accuracy of slightly greater than 1e-5 and above.  

![](images/1e78c8918539f88f7fab2be88bd4fed3b8e3254cce771c6aad60efe8734f9808.jpg)  

# Note  

Using staggered PPPM may not give the same increase in accuracy of energy and pressure as it does in forces, so some caution must be used if energy and/or pressure are quantities of interest, such as when using a barostat.  

# 7.4 Accelerator packages  

Accelerated versions of various pair_style, fixes, computes, and other commands have been added to LAMMPS, which will typically run faster than the standard non-accelerated versions. Some require appropriate hardware to be present on your system, e.g. GPUs or Intel Xeon Phi co-processors.  

All of these commands are in packages provided with LAMMPS. An overview of packages is give on the Packages doc pages.  

These are the accelerator packages currently in LAMMPS:  

<html><body><table><tr><td>GPUPackage</td><td>for GPUs via CUDA, OpenCL, or ROCm HIP</td></tr><tr><td>INTELPackage</td><td>forIntel CPUs and Intel XeonPhi</td></tr><tr><td>KOKKOSPackage</td><td>for NVIDIA GPUs, Intel Xeon Phi, and OpenMP threading</td></tr><tr><td>OPENMPPackage</td><td>for ( OpenMP threading and generic CPUoptimizations</td></tr><tr><td>OPTPackage</td><td>generic CPUoptimizations</td></tr></table></body></html>  

# 7.4.1 GPU package  

The GPU package was developed by Mike Brown while at SNL and ORNL (now at Intel Corp.) and his collaborators, particularly Trung Nguyen (now at Northwestern). Support for AMD GPUs via HIP was added by Vsevolod Nikolskiy and coworkers at HSE University.  

The GPU package provides GPU versions of many pair styles and for parts of the kspace_style pppm for long-range Coulombics. It has the following general features:  

• It is designed to exploit common GPU hardware configurations where one or more GPUs are coupled to many cores of one or more multicore CPUs, e.g. within a node of a parallel machine.   
• Atom-based data (e.g. coordinates, forces) are moved back-and-forth between the CPU(s) and GPU every timestep.   
• Neighbor lists can be built on the CPU or on the GPU   
• The charge assignment and force interpolation portions of PPPM can be run on the GPU. The FFT portion, which requires MPI communication between processors, runs on the CPU.   
• Force computations of different style (pair vs. bond/angle/dihedral/improper) can be performed concurrently on the GPU and CPU(s), respectively.   
• It allows for GPU computations to be performed in single or double precision, or in mixed-mode precision, where pairwise forces are computed in single precision, but accumulated into double-precision force vectors.   
• LAMMPS-specific code is in the GPU package. It makes calls to a generic GPU library in the lib/gpu directory. This library provides either Nvidia support, AMD support, or more general OpenCL support (for Nvidia GPUs, AMD GPUs, Intel GPUs, and multicore CPUs). so that the same functionality is supported on a variety of hardware.  

# Required hardware/software  

To compile and use this package in CUDA mode, you currently need to have an NVIDIA GPU and install the corresponding NVIDIA CUDA toolkit software on your system (this is only tested on Linux and unsupported on Windows):  

• Check if you have an NVIDIA GPU: cat /proc/driver/nvidia/gpus/\\*/information   
• Go to https://developer.nvidia.com/cuda-downloads   
• Install a driver and toolkit appropriate for your system (SDK is not necessary)   
• Run lammps/lib/gpu/nvc_get_devices (after building the GPU library, see below) to list supported devices and properties  

To compile and use this package in OpenCL mode, you currently need to have the OpenCL headers and the (vendor neutral) OpenCL library installed. In OpenCL mode, the acceleration depends on having an OpenCL Installable Client Driver (ICD) installed. There can be multiple of them for the same or different hardware (GPUs, CPUs, Accelerators) installed at the same time. OpenCL refers to those as ‘platforms’. The GPU library will try to auto-select the best suitable platform, but this can be overridden using the platform option of the package command. run lammps/lib/ gpu/ocl_get_devices to get a list of available platforms and devices with a suitable ICD available.  

To compile and use this package for Intel GPUs, OpenCL or the Intel oneAPI HPC Toolkit can be installed using linux package managers. The latter also provides optimized $\mathrm{C}{+}{+}$ , MPI, and many other libraries and tools. See:  

• https://software.intel.com/content/www/us/en/develop/tools/oneapi/hpc-toolkit/download.html  

If you do not have a discrete GPU card installed, this package can still provide significant speedups on some CPUs that include integrated GPUs. Additionally, for many macs, OpenCL is already included with the OS and Makefiles are available in the lib/gpu directory.  

To compile and use this package in HIP mode, you have to have the AMD ROCm software installed. Versions of ROCm older than 3.5 are currently deprecated by AMD.  

# Building LAMMPS with the GPU package  

See the Build extras page for instructions.  

# Run with the GPU package from the command-line  

The mpirun or mpiexec command sets the total number of MPI tasks used by LAMMPS (one or multiple per compute node) and the number of MPI tasks used per node. E.g. the mpirun command in MPICH does this via its -np and -ppn switches. Ditto for OpenMPI via -np and -npernode.  

When using the GPU package, you cannot assign more than one GPU to a single MPI task. However multiple MPI tasks can share the same GPU, and in many cases it will be more efficient to run this way. Likewise it may be more efficient to use less MPI tasks/node than the available # of CPU cores. Assignment of multiple MPI tasks to a GPU will happen automatically if you create more MPI tasks/node than there are GPUs/mode. E.g. with 8 MPI tasks/node and 2 GPUs, each GPU will be shared by 4 MPI tasks.  

The GPU package also has limited support for OpenMP for both multi-threading and vectorization of routines that are run on the CPUs. This requires that the GPU library and LAMMPS are built with flags to enable OpenMP support (e.g. -fopenmp). Some styles for time integration are also available in the GPU package. These run completely on the CPUs in full double precision, but exploit multi-threading and vectorization for faster performance.  

Use the -sf gpu command-line switch, which will automatically append “gpu” to styles that support it. Use the -pk gpu $\mathrm{Ng}$ command-line switch to set $\mathrm{Ng}=\#$ of GPUs/node to use. If $\mathrm{Ng}$ is 0, the number is selected automatically as the number of matching GPUs that have the highest number of compute cores.  

# 1 MPI task uses 1 GPU lmp_machine -sf gpu -pk gpu 1 -in in.script # 12 MPI tasks share 2 GPUs on a single 16-core (or whatever) node mpirun -np 12 lmp_machine -sf gpu -pk gpu 2 -in in.script  

# ditto on 4 16-core nodes mpirun -np 48 -ppn 12 lmp_machine -sf gpu -pk gpu 2 -in in.script  

Note that if the -sf gpu switch is used, it also issues a default package gpu $O$ command, which will result in automatic selection of the number of GPUs to use.  

Using the -pk switch explicitly allows for setting of the number of GPUs/node to use and additional options. Its syntax is the same as the package gpu command. See the package command page for details, including the default values used for all its options if it is not specified.  

Note that the default for the package gpu command is to set the Newton flag to “off” pairwise interactions. It does not affect the setting for bonded interactions (LAMMPS default is “on”). The “off” setting for pairwise interaction is currently required for GPU package pair styles.  

# Run with the GPU package by editing an input script  

The discussion above for the mpirun or mpiexec command, MPI tasks/node, and use of multiple MPI tasks/GPU is the same.  

Use the suffix gpu command, or you can explicitly add an “gpu” suffix to individual styles in your input script, e.g.  

pair_style lj/cut/gpu 2.5  

You must also use the package gpu command to enable the GPU package, unless the -sf gpu or -pk gpu command-line switches were used. It specifies the number of GPUs/node to use, as well as other options.  

# Speed-up to expect  

The performance of a GPU versus a multicore CPU is a function of your hardware, which pair style is used, the number of atoms/GPU, and the precision used on the GPU (double, single, mixed). Using the GPU package in OpenCL mode on CPUs (which uses vectorization and multithreading) is usually resulting in inferior performance compared to using LAMMPS’ native threading and vectorization support in the OPENMP and INTEL packages.  

See the Benchmark page of the LAMMPS website for performance of the GPU package on various hardware, including the Titan HPC platform at ORNL.  

You should also experiment with how many MPI tasks per GPU to use to give the best performance for your problem and machine. This is also a function of the problem size and the pair style being using. Likewise, you should experiment with the precision setting for the GPU library to see if single or mixed precision will give accurate results, since they will typically be faster.  

MPI parallelism typically outperforms OpenMP parallelism, but in some cases using fewer MPI tasks and multiple OpenMP threads with the GPU package can give better performance. 3-body potentials can often perform better with multiple OMP threads because the inter-process communication is higher for these styles with the GPU package in order to allow deterministic results.  

# Guidelines for best performance  

• Using multiple MPI tasks (2-10) per GPU will often give the best performance, as allowed my most multicore CPU/GPU configurations. Using too many MPI tasks will result in worse performance due to growing overhead with the growing number of MPI tasks.   
• If the number of particles per MPI task is small (e.g. 100s of particles), it can be more efficient to run with fewer MPI tasks per GPU, even if you do not use all the cores on the compute node.   
• The package gpu command has several options for tuning performance. Neighbor lists can be built on the GPU or CPU. Force calculations can be dynamically balanced across the CPU cores and GPUs. GPU-specific settings can be made which can be optimized for different hardware. See the package command page for details.   
• As described by the package gpu command, GPU accelerated pair styles can perform computations asynchronously with CPU computations. The “Pair” time reported by LAMMPS will be the maximum of the time required to complete the CPU pair style computations and the time required to complete the GPU pair style computations. Any time spent for GPU-enabled pair styles for computations that run simultaneously with bond, angle, dihedral, improper, and long-range calculations will not be included in the “Pair” time.   
• Since only part of the pppm kspace style is GPU accelerated, it may be faster to only use GPU acceleration for Pair styles with long-range electrostatics. See the “pair/only” keyword of the package command for a shortcut to do that. The distribution of work between kspace on the CPU and non-bonded interactions on the GPU can be balanced through adjusting the coulomb cutoff without loss of accuracy.   
• When the mode setting for the package gpu command is force/neigh, the time for neighbor list calculations on the GPU will be added into the “Pair” time, not the “Neigh” time. An additional breakdown of the times required for various tasks on the GPU (data copy, neighbor calculations, force computations, etc) are output only with the LAMMPS screen output (not in the log file) at the end of each run. These timings represent total time spent on the GPU for each routine, regardless of asynchronous CPU calculations.   
• The output section “GPU Time Info (average)” reports “Max Mem / Proc”. This is the maximum memory used at one time on the GPU for data storage by a single MPI process.  

# Restrictions  

When using hybrid pair styles, the neighbor list must be generated on the host instead of the GPU and thus the potential GPU acceleration is reduced.  

# 7.4.2 INTEL package  

The INTEL package is maintained by Mike Brown at Intel Corporation. It provides two methods for accelerating simulations, depending on the hardware you have. The first is acceleration on Intel CPUs by running in single, mixed, or double precision with vectorization. The second is acceleration on Intel Xeon Phi co-processors via offloading neighbor list and non-bonded force calculations to the Phi. The same $\mathrm{C}{+}{+}$ code is used in both cases. When offloading to a co-processor from a CPU, the same routine is run twice, once on the CPU and once with an offload flag. This allows LAMMPS to run on the CPU cores and co-processor cores simultaneously.  

# Currently Available INTEL Styles  

• Angle Styles: charmm, harmonic   
• Bond Styles: fene, harmonic   
• Dihedral Styles: charmm, fourier, harmonic, opls   
• Fixes: nve, npt, nvt, nvt/sllod, nve/asphere, electrode/conp, electrode/conq, electrode/thermo   
• Improper Styles: cvff, harmonic   
• Pair Styles: airebo, airebo/morse, buck/coul/cut, buck/coul/long, buck, dpd, eam, eam/alloy, eam/fs, gayberne, lj/charmm/coul/charmm, lj/charmm/coul/long, lj/cut, lj/cut/coul/long, lj/long/coul/long, rebo, snap, sw, tersoff   
• K-Space Styles: pppm, pppm/disp, pppm/electrode  

# Warning  

None of the styles in the INTEL package currently support computing per-atom stress. If any compute or fix in your input requires it, LAMMPS will abort with an error message.  

# Speed-up to expect  

The speedup will depend on your simulation, the hardware, which styles are used, the number of atoms, and the floatingpoint precision mode. Performance improvements are shown compared to LAMMPS without using other acceleration packages as these are under active development (and subject to performance changes). The measurements were performed using the input files available in the src/INTEL/TEST directory with the provided run script. These are scalable in size; the results given are with 512K particles (524K for Liquid Crystal). Most of the simulations are standard LAMMPS benchmarks (indicated by the filename extension in parenthesis) with modifications to the run length and to add a warm-up run (for use with offload benchmarks).  

![](images/c67b44205e9a02ed31703a87ca033d29368b3f867bcf5b08fc08f19a96214202.jpg)  

Results are speedups obtained on Intel Xeon E5-2697v4 processors (code-named Broadwell), Intel Xeon Phi 7250 processors (code-named Knights Landing), and Intel Xeon Gold 6148 processors (code-named Skylake) with “June 2017” LAMMPS built with Intel Parallel Studio 2017 update 2. Results are with 1 MPI task per physical core. See src/INTEL/TEST/README for the raw simulation rates and instructions to reproduce.  

# Accuracy and order of operations  

In most molecular dynamics software, parallelization parameters (# of MPI, OpenMP, and vectorization) can change the results due to changing the order of operations with finite-precision calculations. The INTEL package is deterministic. This means that the results should be reproducible from run to run with the same parallel configurations and when using deterministic libraries or library settings (MPI, OpenMP, FFT). However, there are differences in the INTEL package that can change the order of operations compared to LAMMPS without acceleration:  

• Neighbor lists can be created in a different order   
• Bins used for sorting atoms can be oriented differently   
• The default stencil order for PPPM is 7. By default, LAMMPS will calculate other PPPM parameters to fit the desired accuracy with this order   
• The newton setting applies to all atoms, not just atoms shared between MPI tasks   
• Vectorization can change the order for adding pairwise forces   
• When using the -DLMP_USE_MKL_RNG define (all included intel optimized makefiles do) at build time, the random number generator for dissipative particle dynamics (pair style dpd/intel) uses the Mersenne Twister generator included in the Intel MKL library (that should be more robust than the default Masaglia random number generator)  

The precision mode (described below) used with the INTEL package can change the accuracy of the calculations. For the default mixed precision option, calculations between pairs or triplets of atoms are performed in single precision, intended to be within the inherent error of MD simulations. All accumulation is performed in double precision to prevent the error from growing with the number of atoms in the simulation. Single precision mode should not be used without appropriate validation.  

# Quick Start for Experienced Users  

LAMMPS should be built with the INTEL package installed. Simulations should be run with 1 MPI task per physical core, not hardware thread.  

• Edit src/MAKE/OPTIONS/Makefile.intel_cpu_intelmpi as necessary.   
• Set the environment variable KMP_BLOCKTIME=0   
• -pk intel 0 omp $\$1$ -sf intel added to LAMMPS command-line   
• $\$1$ should be 2 for Intel Xeon CPUs and 2 or 4 for Intel Xeon Phi   
• For some of the simple 2-body potentials without long-range electrostatics, performance and scalability can be better with the newton off setting added to the input script   
• For simulations on higher node counts, add processors $***$ grid numa to the beginning of the input script for better scalability   
• If using kspace_style pppm in the input script, add kspace_modify diff ad for better performance  

For Intel Xeon Phi CPUs:  

• Runs should be performed using MCDRAM.  

For simulations using kspace_style pppm on Intel CPUs supporting AVX-512:  

• Add kspace_modify diff ad to the input script   
• The command-line option should be changed to -pk intel 0 omp $\$1$ lrt yes -sf intel where $\$1$ is the number of threads minus 1.   
• Do not use thread affinity (set KMP_AFFINITY $\cong$ none)   
• The newton off setting may provide better scalability  

For Intel Xeon Phi co-processors (Offload):  

• Edit src/MAKE/OPTIONS/Makefile.intel_co-processor as necessary • -pk intel N omp 1 added to command-line where N is the number of co-processors per node.  

# Required hardware/software  

When using Intel compilers version 16.0 or later is required.  

In order to use offload to co-processors, an Intel Xeon Phi co-processor and an Intel compiler are required.  

Although any compiler can be used with the INTEL package, currently, vectorization directives are disabled by default when not using Intel compilers due to lack of standard support and observations of decreased performance. The OpenMP standard now supports directives for vectorization and we plan to transition the code to this standard once it is available in most compilers. We expect this to allow improved performance and support with other compilers.  

For Intel Xeon Phi $\mathbf{\Omega}_{\mathbf{X}200}$ series processors (code-named Knights Landing), there are multiple configuration options for the hardware. For best performance, we recommend that the MCDRAM is configured in “Flat” mode and with the cluster mode set to “Quadrant” or “SNC4”. “Cache” mode can also be used, although the performance might be slightly lower.  

# Notes about Simultaneous Multithreading  

Modern CPUs often support Simultaneous Multithreading (SMT). On Intel processors, this is called Hyper-Threading (HT) technology. SMT is hardware support for running multiple threads efficiently on a single core. Hardware threads or logical cores are often used to refer to the number of threads that are supported in hardware. For example, the Intel Xeon E5-2697v4 processor is described as having 36 cores and 72 threads. This means that 36 MPI processes or OpenMP threads can run simultaneously on separate cores, but that up to 72 MPI processes or OpenMP threads can be running on the CPU without costly operating system context switches.  

Molecular dynamics simulations will often run faster when making use of SMT. If a thread becomes stalled, for example because it is waiting on data that has not yet arrived from memory, another thread can start running so that the CPU pipeline is still being used efficiently. Although benefits can be seen by launching a MPI task for every hardware thread, for multinode simulations, we recommend that OpenMP threads are used for SMT instead, either with the INTEL package, OPENMP package, or KOKKOS package. In the example above, up to 36X speedups can be observed by using all 36 physical cores with LAMMPS. By using all 72 hardware threads, an additional $10–30\%$ performance gain can be achieved.  

The BIOS on many platforms allows SMT to be disabled, however, we do not recommend this on modern processors as there is little to no benefit for any software package in most cases. The operating system will report every hardware thread as a separate core allowing one to determine the number of hardware threads available. On Linux systems, this information can normally be obtained with:  

# Building LAMMPS with the INTEL package  

See the Build extras page for instructions. Some additional details are covered here.  

For building with make, several example Makefiles for building with the Intel compiler are included with LAMMPS in the src/MAKE/OPTIONS/ directory:  

Makefile.intel_cpu_intelmpi # Intel Compiler, Intel MPI, No Offload Makefile.knl # Intel Compiler, Intel MPI, No Offload Makefile.intel_cpu_mpich # Intel Compiler, MPICH, No Offload Makefile.intel_cpu_openpmi # Intel Compiler, OpenMPI, No Offload Makefile.intel_co-processor # Intel Compiler, Intel MPI, Offload  

Makefile.knl is identical to Makefile.intel_cpu_intelmpi except that it explicitly specifies that vectorization should be for Intel Xeon Phi x200 processors making it easier to cross-compile. For users with recent installations of Intel Parallel Studio, the process can be as simple as:  

make yes-intel   
source /opt/intel/parallel_studio_xe_2016.3.067/psxevars.sh   
# or psxevars.csh for C-shell   
make intel_cpu_intelmpi  

Note that if you build with support for a Phi co-processor, the same binary can be used on nodes with or without coprocessors installed. However, if you do not have co-processors on your system, building without offload support will produce a smaller binary.  

The general requirements for Makefiles with the INTEL package are as follows. When using Intel compilers, -restrict is required and -qopenmp is highly recommended for CCFLAGS and LINKFLAGS. CCFLAGS should include -DLMP_INTEL_USELRT (unless POSIX Threads are not supported in the build environment) and -DLMP_USE_MKL_RNG (unless Intel Math Kernel Library (MKL) is not available in the build environment). For Intel compilers, LIB should include -ltbbmalloc or if the library is not available, -DLMP_INTEL_NO_TBB can be added to CCFLAGS. For builds supporting offload, -DLMP_INTEL_OFFLOAD is required for CCFLAGS  

# 7.4. Accelerator packages  

and -qoffload is required for LINKFLAGS. Other recommended CCFLAG options for best performance are -O2 -fno-alias -ansi-alias -qoverride-limits fp-model fas $\mathrm{=}2$ -no-prec-div.  

![](images/11445ecc489c451ef43d43239638512805a095df9fb9b1a8c8d1ec38d37087c4.jpg)  

# Note  

See the src/INTEL/README file for additional flags that might be needed for best performance on Intel server processors code-named “Skylake”.  

![](images/82a228c189455246aa8fba4b858f5da39b9cd8a71d8a1c4e63f94bebc738a9e2.jpg)  

# Note  

The vectorization and math capabilities can differ depending on the CPU. For Intel compilers, the -x flag specifies the type of processor for which to optimize. -xHost specifies that the compiler should build for the processor used for compiling. For Intel Xeon Phi $\mathbf{\Omega}_{\mathbf{X}200}$ series processors, this option is -xMIC-AVX512. For fourth generation Intel Xeon (v4/Broadwell) processors, -xCORE-AVX2 should be used. For older Intel Xeon processors, -xAVX will perform best in general for the different simulations in LAMMPS. The default in most of the example Makefiles is to use -xHost, however this should not be used when cross-compiling.  

# Running LAMMPS with the INTEL package  

Running LAMMPS with the INTEL package is similar to normal use with the exceptions that one should 1) specify that LAMMPS should use the INTEL package, 2) specify the number of OpenMP threads, and 3) optionally specify the specific LAMMPS styles that should use the INTEL package. 1) and 2) can be performed from the command-line or by editing the input script. 3) requires editing the input script. Advanced performance tuning options are also described below to get the best performance.  

When running on a single node (including runs using offload to a co-processor), best performance is normally obtained by using 1 MPI task per physical core and additional OpenMP threads with SMT. For Intel Xeon processors, 2 OpenMP threads should be used for SMT. For Intel Xeon Phi CPUs, 2 or 4 OpenMP threads should be used (best choice depends on the simulation). In cases where the user specifies that LRT mode is used (described below), 1 or 3 OpenMP threads should be used. For multi-node runs, using 1 MPI task per physical core will often perform best, however, depending on the machine and scale, users might get better performance by decreasing the number of MPI tasks and using more OpenMP threads. For performance, the product of the number of MPI tasks and OpenMP threads should not exceed the number of available hardware threads in almost all cases.  

# Note  

Setting core affinity is often used to pin MPI tasks and OpenMP threads to a core or group of cores so that memory access can be uniform. Unless disabled at build time, affinity for MPI tasks and OpenMP threads on the host (CPU) will be set by default on the host when using offload to a co-processor. In this case, it is unnecessary to use other methods to control affinity (e.g. taskset, numactl, I_MPI_PIN_DOMAIN, etc.). This can be disabled with the no_affinity option to the package intel command or by disabling the option at build time (by adding -DINTEL_OFFLOAD_NOAFFINITY to the CCFLAGS line of your Makefile). Disabling this option is not recommended, especially when running on a machine with Intel Hyper-Threading technology disabled.  

# Run with the INTEL package from the command-line  

To enable INTEL optimizations for all available styles used in the input script, the -sf intel command-line switch can be used without any requirement for editing the input script. This switch will automatically append “intel” to styles that support it. It also invokes a default command: package intel 1. This package command is used to set options for the INTEL package. The default package command will specify that INTEL calculations are performed in mixed precision, that the number of OpenMP threads is specified by the OMP_NUM_THREADS environment variable, and that if co-processors are present and the binary was built with offload support, that 1 co-processor per node will be used with automatic balancing of work between the CPU and the co-processor.  

You can specify different options for the INTEL package by using the -pk intel Nphi command-line switch with keyword/value pairs as specified in the documentation. Here, $\mathrm{Nphi}=\#$ of Xeon Phi co-processors/node (ignored without offload support). Common options to the INTEL package include omp to override any OMP_NUM_THREADS setting and specify the number of OpenMP threads, mode to set the floating-point precision mode, and $l r t$ to enable LongRange Thread mode as described below. See the package intel command for details, including the default values used for all its options if not specified, and how to set the number of OpenMP threads via the OMP_NUM_THREADS environment variable if desired.  

Examples (see documentation for your MPI/Machine for differences in launching MPI applications):  

# 2 nodes, 36 MPI tasks/node, \$OMP_NUM_THREADS OpenMP Threadsmpirun -np 72 -ppn 36 lmp_machine -sf intel -in in.script  

# Don't use any co-processors that might be available, # use 2 OpenMP threads for each task, use double precision mpirun -np 72 -ppn 36 lmp_machine -sf intel -in in.script -pk intel 0 omp 2 mode double  

# Or run with the INTEL package by editing an input script  

As an alternative to adding command-line arguments, the input script can be edited to enable the INTEL package. This requires adding the package intel command to the top of the input script. For the second example above, this would be:  

package intel 0 omp 2 mode double  

To enable the INTEL package only for individual styles, you can add an “intel” suffix to the individual style, e.g.:  

![](images/da53bf7a77cea7dbb9db4e6ad1d46ca8e776aa6a508393d9eb1286931270a7cf.jpg)  

# Note  

Changing the newton setting to off can improve performance and/or scalability for simple 2-body potentials such as lj/cut or when using LRT mode on processors supporting AVX-512.  

Not all styles are supported in the INTEL package. You can mix the INTEL package with styles from the OPT package or the OPENMP package. Of course, this requires that these packages were installed at build time. This can performed automatically by using -sf hybrid intel opt or -sf hybrid intel omp command-line options. Alternatively, the “opt” and “omp” suffixes can be appended manually in the input script. For the latter, the package omp command must be in the input script or the -pk omp Nt command-line switch must be used where Nt is the number of OpenMP threads. The number of OpenMP threads should not be set differently for the different packages. Note that the suffix hybrid intel omp command can also be used within the input script to automatically append the “omp” suffix to styles when INTEL styles are not available.  

![](images/682df30ed5da23a715750303f6bd817fcce929681fea48a926268c2cbeebaced.jpg)  

# Note  

For simulations on higher node counts, add processors \* \* \* grid numa to the beginning of the input script for better scalability.  

When running on many nodes, performance might be better when using fewer OpenMP threads and more MPI tasks. This will depend on the simulation and the machine. Using the verlet/split run style might also give better performance for simulations with PPPM electrostatics. Note that this is an alternative to LRT mode and the two cannot be used together.  

Currently, when using Intel MPI with Intel Xeon Phi $\mathbf{\Omega}_{\mathbf{X}200}$ series CPUs, better performance might be obtained by setting the environment variable I_MPI_SHM_LMT $\cong$ shm for Linux kernels that do not yet have full support for AVX-512. Runs on Intel Xeon Phi $\mathbf{\Omega}_{\mathbf{X}}200$ series processors will always perform better using MCDRAM. Please consult your system documentation for the best approach to specify that MPI runs are performed in MCDRAM.  

# Tuning for Offload Performance  

The default settings for offload should give good performance.  

When using LAMMPS with offload to Intel co-processors, best performance will typically be achieved with concurrent calculations performed on both the CPU and the co-processor. This is achieved by offloading only a fraction of the neighbor and pair computations to the co-processor or using hybrid pair styles where only one style uses the “intel” suffix. For simulations with long-range electrostatics or bond, angle, dihedral, improper calculations, computation and data transfer to the co-processor will run concurrently with computations and MPI communications for these calculations on the host CPU. This is illustrated in the figure below for the rhodopsin protein benchmark running on E5-2697v2 processors with a Intel Xeon Phi 7120p co-processor. In this plot, the vertical access is time and routines running at the same time are running concurrently on both the host and the co-processor.  

![](images/4700d357b55c91a85f18b55c704bbaf482f553a6c450a0aec4c7d684c446ebf6.jpg)  

The fraction of the offloaded work is controlled by the balance keyword in the package intel command. A balance of 0 runs all calculations on the CPU. A balance of 1 runs all supported calculations on the co-processor. A balance of 0.5 runs half of the calculations on the co-processor. Setting the balance to $^{-1}$ (the default) will enable dynamic load balancing that continuously adjusts the fraction of offloaded work throughout the simulation. Because data transfer cannot be timed, this option typically produces results within 5 to 10 percent of the optimal fixed balance.  

If running short benchmark runs with dynamic load balancing, adding a short warm-up run (10-20 steps) will allow the load-balancer to find a near-optimal setting that will carry over to additional runs.  

The default for the package intel command is to have all the MPI tasks on a given compute node use a single Xeon Phi co-processor. In general, running with a large number of MPI tasks on each node will perform best with offload. Each MPI task will automatically get affinity to a subset of the hardware threads available on the co-processor. For example, if your card has 61 cores, with 60 cores available for offload and 4 hardware threads per core (240 total threads), running with $24\mathrm{MPI}$ tasks per node will cause each MPI task to use a subset of 10 threads on the co-processor. Fine tuning of the number of threads to use per MPI task or the number of threads to use per core can be accomplished with keyword settings of the package intel command.  

The INTEL package has two modes for deciding which atoms will be handled by the co-processor. This choice is controlled with the ghost keyword of the package intel command. When set to 0, ghost atoms (atoms at the borders between MPI tasks) are not offloaded to the card. This allows for overlap of MPI communication of forces with computation on the co-processor when the newton setting is “on”. The default is dependent on the style being used, however, better performance may be achieved by setting this option explicitly.  

When using offload with CPU Hyper-Threading disabled, it may help performance to use fewer MPI tasks and OpenMP threads than available cores. This is due to the fact that additional threads are generated internally to handle the asynchronous offload tasks.  

If pair computations are being offloaded to an Intel Xeon Phi co-processor, a diagnostic line is printed to the screen (not to the log file), during the setup phase of a run, indicating that offload mode is being used and indicating the number of co-processor threads per MPI task. Additionally, an offload timing summary is printed at the end of each run. When offloading, the frequency for atom sorting is changed to 1 so that the per-atom data is effectively sorted at every rebuild of the neighbor lists. All the available co-processor threads on each Phi will be divided among MPI tasks, unless the tptask option of the -pk intel command-line switch is used to limit the co-processor threads per MPI task.  

# Restrictions  

When offloading to a co-processor, hybrid styles that require skip lists for neighbor builds cannot be offloaded. Using hybrid/overlay is allowed. Only one intel accelerated style may be used with hybrid styles when offloading. Special_bonds exclusion lists are not currently supported with offload, however, the same effect can often be accomplished by setting cutoffs for excluded atom types to 0. None of the pair styles in the INTEL package currently support the “inner”, “middle”, “outer” options for rRESPA integration via the run_style respa command; only the “pair” option is supported.  

# References  

• Brown, W.M., Carrillo, J.-M.Y., Mishra, B., Gavhane, N., Thakkar, F.M., De Kraker, A.R., Yamada, M., Ang, J.A., Plimpton, S.J., “Optimizing Classical Molecular Dynamics in LAMMPS”, in Intel Xeon Phi Processor High Performance Programming: Knights Landing Edition, J. Jeffers, J. Reinders, A. Sodani, Eds. Morgan Kaufmann. • Brown, W. M., Semin, A., Hebenstreit, M., Khvostov, S., Raman, K., Plimpton, S.J. Increasing Molecular Dynamics Simulation Rates with an 8-Fold Increase in Electrical Power Efficiency. 2016 High Performance Computing, Networking, Storage and Analysis, SC16: International Conference (pp. 82-95). • Brown, W.M., Carrillo, J.-M.Y., Gavhane, N., Thakkar, F.M., Plimpton, S.J. Optimizing Legacy Molecular Dynamics Software with Directive-Based Offload. Computer Physics Communications. 2015. 195: p. 95-101.  

# 7.4.3 KOKKOS package  

Kokkos is a templated $\mathrm{C}{+}{+}$ library that provides abstractions to allow a single implementation of an application kernel (e.g. a pair style) to run efficiently on different kinds of hardware, such as GPUs, Intel Xeon Phis, or many-core CPUs. Kokkos maps the $\mathrm{C}{+}{+}$ kernel onto different back end languages such as CUDA, OpenMP, or Pthreads. The Kokkos library also provides data abstractions to adjust (at compile time) the memory layout of data structures like 2d and 3d arrays to optimize performance on different hardware. For more information on Kokkos, see the Kokkos GitHub page.  

The LAMMPS KOKKOS package contains versions of pair, fix, and atom styles that use data structures and macros provided by the Kokkos library, which is included with LAMMPS in /lib/kokkos. The KOKKOS package was developed primarily by Christian Trott (Sandia) and Stan Moore (Sandia) with contributions of various styles by others, including Sikandar Mashayak (UIUC), Ray Shan (Sandia), and Dan Ibanez (Sandia). For more information on developing using Kokkos abstractions see the Kokkos Wiki.  

# Note  

The Kokkos library is under active development and tracking the availability of accelerator hardware, so is the KOKKOS package in LAMMPS. This means that only a certain range of versions of the Kokkos library are compatible with the KOKKOS package of a certain range of LAMMPS versions. For that reason LAMMPS comes with a bundled version of the Kokkos library that has been validated on multiple platforms and may contain selected back-ported bug fixes from upstream Kokkos versions. While it is possible to build LAMMPS with an external version of Kokkos, it is untested and may result in incorrect execution or crashes.  

Kokkos currently provides full support for 4 modes of execution (per MPI task). These are Serial (MPI-only for CPUs and Intel Phi), OpenMP (threading for many-core CPUs and Intel Phi), CUDA (for NVIDIA GPUs) and HIP (for AMD GPUs). Additional modes (e.g. OpenMP target, Intel data center GPUs) are under development. You choose the mode at build time to produce an executable compatible with a specific hardware.  

The following compatibility notes have been last updated for LAMMPS version 23 November 2023 and Kokkos version 4.2.  

![](images/d257aa6543eb78e06a19df517ea4260ac4b067fb725a5718d36d9f782685930b.jpg)  

# $\mathbf{C}++\mathbf{1}7$ support  

Kokkos requires using a compiler that supports the $_{\mathsf{c}++17}$ standard. For some compilers, it may be necessary to add a flag to enable $_{\mathsf{c}++17}$ support. For example, the GNU compiler uses the -st $\scriptstyle{=}\operatorname{c}++17$ flag. For a list of compilers that have been tested with the Kokkos library, see the requirements document of the Kokkos Wiki.  

![](images/7573c5305513f3ee3c9c605d49dce34b0fc31056ce1bdc63e6135fe29a5a75a8.jpg)  

# NVIDIA CUDA support  

To build with Kokkos support for NVIDIA GPUs, the NVIDIA CUDA toolkit software version 11.0 or later must be installed on your system. See the discussion for the GPU package for details of how to check and do this.  

![](images/873468c33c3583c4b6d83ce2bb0042726e318b1b0d03d53c80878914e9637de6.jpg)  

# AMD ROCm (HIP) support  

To build with Kokkos support for AMD GPUs, the AMD ROCm toolkit software version 5.2.0 or later must be installed on your system.  

# Intel Data Center GPU support  

Support for Kokkos with Intel Data Center GPU accelerators (formerly known under the code name “Ponte Vecchio”) in LAMMPS is still a work in progress. Only a subset of the functionality works correctly. Please contact the LAMMPS developers if you run into problems.  

# $\Theta$ CUDA and MPI library compatibility  

Kokkos with CUDA currently implicitly assumes that the MPI library is GPU-aware. This is not always the case, especially when using pre-compiled MPI libraries provided by a Linux distribution. This is not a problem when using only a single GPU with a single MPI rank. When running with multiple MPI ranks, you may see segmentation faults without GPU-aware MPI support. These can be avoided by adding the flags -pk kokkos gpu/aware off to the LAMMPS command-line or by using the command package kokkos gpu/aware off in the input file.  

![](images/2217246f76256346bc2671a4b720037869c0934ae16bcb1e3ac40b2626cf7c1b.jpg)  

# Using multiple MPI ranks per GPU  

Unlike with the GPU package, there are limited benefits from using multiple MPI processes per GPU with KOKKOS. But when doing this it is required to enable CUDA MPS (Multi-Process Service :: GPU Deployment and Management Documentation ) to get acceptable performance.  

# Building LAMMPS with the KOKKOS package  

See the Build extras page for instructions.  

# Running LAMMPS with the KOKKOS package  

All Kokkos operations occur within the context of an individual MPI task running on a single node of the machine. The total number of MPI tasks used by LAMMPS (one or multiple per compute node) is set in the usual manner via the mpirun or mpiexec commands, and is independent of Kokkos. E.g. the mpirun command in OpenMPI does this via its -np and -npernode switches. Ditto for MPICH via -np and -ppn.  

# 7.4. Accelerator packages  

# Running on a multicore CPU  

Here is a quick overview of how to use the KOKKOS package for CPU acceleration, assuming one or more 16-core nodes.  

# 1 node, 16 MPI tasks/node, no multi-threading mpirun -np 16 lmp_kokkos_mpi_only -k on -sf kk -in in.lj # 2 nodes, 1 MPI task/node, 16 threads/task mpirun -np 2 -ppn 1 lmp_kokkos_omp -k on t 16 -sf kk -in in.lj # 1 node, 2 MPI tasks/node, 8 threads/task mpirun -np 2 lmp_kokkos_omp -k on t 8 -sf kk -in in.lj # 8 nodes, 4 MPI tasks/node, 4 threads/task mpirun -np 32 -ppn 4 lmp_kokkos_omp -k on t 4 -sf kk -in in.lj  

To run using the KOKKOS package, use the -k on, -sf kk and -pk kokkos command-line switches in your mpirun command. You must use the -k on command-line switch to enable the KOKKOS package. It takes additional arguments for hardware settings appropriate to your system. For OpenMP use:  

-k on t Nt  

The t Nt option specifies how many OpenMP threads per MPI task to use with a node. The default is $\mathrm{Nt}=1$ , which is MPI-only mode. Note that the product of MPI tasks \* OpenMP threads/task should not exceed the physical number of cores (on a node), otherwise performance will suffer. If Hyper-Threading (HT) is enabled, then the product of MPI tasks \* OpenMP threads/task should not exceed the physical number of cores \* hardware threads. The $\mathrm{-k}$ on switch also issues a package kokkos command (with no additional arguments) which sets various KOKKOS options to default values, as discussed on the package command doc page.  

The -sf kk command-line switch will automatically append the “/kk” suffix to styles that support it. In this manner no modification to the input script is needed. Alternatively, one can run with the KOKKOS package by editing the input script as described below.  

![](images/95b096427209ad87da0d32ed74093cd79786ce1a507f658413abcda1c4043642.jpg)  

# Note  

When using a single OpenMP thread, the Kokkos Serial back end (i.e. Makefile.kokkos_mpi_only) will give better performance than the OpenMP back end (i.e. Makefile.kokkos_omp) because some of the overhead to make the code thread-safe is removed.  

![](images/9af8f9d609a936a435c86e3053c5c3a70bd0262100e7d2989bc758ba6f3fc764.jpg)  

# Note  

Use the -pk kokkos command-line switch to change the default package kokkos options. See its doc page for details and default settings. Experimenting with its options can provide a speed-up for specific calculations. For example:  

# Newton on, Half neighbor list, non-threaded comm mpirun -np 16 lmp_kokkos_mpi_only -k on -sf kk -pk kokkos newton on neigh half comm no -in in.lj  

If the newton command is used in the input script, it can also override the Newton flag defaults.  

For half neighbor lists and OpenMP, the KOKKOS package uses data duplication (i.e. thread-private arrays) by default to avoid thread-level write conflicts in the force arrays (and other data structures as necessary). Data duplication is typically fastest for small numbers of threads (i.e. 8 or less) but does increase memory footprint and is not scalable to large numbers of threads. An alternative to data duplication is to use thread-level atomic operations which do not require data duplication. The use of atomic operations can be enforced by compiling LAMMPS with the -DLMP_KOKKOS_USE_ATOMICS pre-processor flag. Most but not all Kokkos-enabled pair_styles support data duplication. Alternatively, full neighbor lists avoid the need for duplication or atomic operations but require more compute operations per atom. When using the Kokkos Serial back end or the OpenMP back end with a single thread, no duplication or atomic operations are used. For CUDA and half neighbor lists, the KOKKOS package always uses atomic operations.  

# CPU Cores, Sockets and Thread Affinity  

When using multi-threading, it is important for performance to bind both MPI tasks to physical cores, and threads to physical cores, so they do not migrate during a simulation.  

If you are not certain MPI tasks are being bound (check the defaults for your MPI installation), binding can be forced with these flags:  

# # OpenMPI 1.8  

mpirun -np 2 --bind-to socket --map-by socket ./lmp_openmpi ...  

# Mvapich2 2.0 mpiexec -np 2 --bind-to socket --map-by socket ./lmp_mvapich  

For binding threads with KOKKOS OpenMP, use thread affinity environment variables to force binding. With OpenMP 3.1 (gcc 4.7 or later, intel 12 or later) setting the environment variable OMP_PROC_BIND $=$ true should be sufficient. In general, for best performance with OpenMP 4.0 or later set OMP_PROC_BIND $=$ spread and OMP_PLACES $=$ threads. For binding threads with the KOKKOS pthreads option, compile LAMMPS with the hwloc or libnuma support enabled as described in the extra build options page.  

# Running on Knight’s Landing (KNL) Intel Xeon Phi  

Here is a quick overview of how to use the KOKKOS package for the Intel Knight’s Landing (KNL) Xeon Phi:  

KNL Intel Phi chips have 68 physical cores. Typically 1 to 4 cores are reserved for the OS, and only 64 or 66 cores are used. Each core has 4 Hyper-Threads,so there are effectively $\mathrm{N}=256$ $(4^{*}64)$ or $\mathrm{N}=264$ $(4^{*}66)$ cores to run on. The product of MPI tasks \* OpenMP threads/task should not exceed this limit, otherwise performance will suffer. Note that with the KOKKOS package you do not need to specify how many KNLs there are per node; each KNL is simply treated as running some number of MPI tasks.  

Examples of mpirun commands that follow these rules are shown below.  

<html><body><table><tr><td># Running on an Intel KNL node with 68 cores # (272 threads/node via 4x hardware threading):</td></tr><tr><td></td></tr><tr><td># 1 node, 64 MPI tasks/node, 4 threads/task</td></tr><tr><td>mpirun -np 64 lmp _kokkos_phi -k on t 4 -sf kk -in in.lj</td></tr><tr><td></td></tr><tr><td># 1 node, 66 MPI tasks/node, 4 threads/task mpirun -np 66 lmp_kokkos_phi -k on t 4 -sf kk -in in.lj</td></tr><tr><td></td></tr><tr><td># 1 node, 32 MPI tasks/node, 8 threads/task mpirun -np 32 lmp _kokkos_phi -k on t 8 -sf kk -in in.lj</td></tr></table></body></html>  

The -np setting of the mpirun command sets the number of MPI tasks/node. The -k on t Nt command-line switch sets the number of threads/task as Nt. The product of these two values should be N, i.e. 256 or 264.  

![](images/a2d77940bc3712d89b7160cd6d28617c3f44485b8111846c0ece2f9b93d9911a.jpg)  

# Note  

The default for the package kokkos command when running on KNL is to use “half” neighbor lists and set the Newton flag to “on” for both pairwise and bonded interactions. This will typically be best for many-body potentials. For simpler pairwise potentials, it may be faster to use a “full” neighbor list with Newton flag to “off”. Use the -pk kokkos command-line switch to change the default package kokkos options. See its documentation page for details and default settings. Experimenting with its options can provide a speed-up for specific calculations. For example:  

# Newton on, half neighbor list, threaded comm mpirun -np 64 lmp_kokkos_phi -k on t 4 -sf kk -pk kokkos comm host -in in.reax # Newton off, full neighbor list, non-threaded comm mpirun -np 64 lmp_kokkos_phi -k on t 4 -sf kk \ -pk kokkos newton off neigh full comm no -in in.lj  

![](images/521ec768c2e8131d2838ab166d156b6f0d962b64cf614301ab727a544ee62bc3.jpg)  

# Note  

MPI tasks and threads should be bound to cores as described above for CPUs.  

![](images/15a89d6ce9c8cc94b5c1c4e5184857b1f8d7ba0b434b6b0ce20d60292be2432b.jpg)  

# Note  

To build with Kokkos support for Intel Xeon Phi co-processors such as Knight’s Corner (KNC), your system must be configured to use them in “native” mode, not “offload” mode like the INTEL package supports.  

# Running on GPUs  

Use the -k command-line switch to specify the number of GPUs per node. Typically the -np setting of the mpirun command should set the number of MPI tasks/node to be equal to the number of physical GPUs on the node. You can assign multiple MPI tasks to the same GPU with the KOKKOS package, but this is usually only faster if some portions of the input script have not been ported to use Kokkos. In this case, also packing/unpacking communication buffers on the host may give speedup (see the KOKKOS package command). Using CUDA MPS is recommended in this scenario.  

Using a GPU-aware MPI library is highly recommended. GPU-aware MPI use can be avoided by using -pk kokkos gpu/aware off . As above for multicore CPUs (and no GPU), if N is the number of physical cores/node, then the number of MPI tasks/node should not exceed N.  

![](images/848341a2f3f0387601d77f5146f8c818e2b6509c22e5c29cb16eecdd8a02a988.jpg)  

# Note  

The default for the package kokkos command when running on GPUs is to use “full” neighbor lists and set the Newton flag to “off” for both pairwise and bonded interactions, along with threaded communication. When running on Maxwell or Kepler GPUs, this will typically be best. For Pascal GPUs and beyond, using “half” neighbor lists and setting the Newton flag to “on” may be faster. For many pair styles, setting the neighbor binsize equal to twice the CPU default value will give speedup, which is the default when running on GPUs. Use the -pk kokkos command-line switch to change the default package kokkos options. See its documentation page for details and default settings. Experimenting with its options can provide a speed-up for specific calculations. For example:  

# Newton on, half neighbor list, set binsize $=$ neighbor ghost cutoff mpirun -np 2 lmp_kokkos_cuda_openmpi -k on g 2 -sf kk \ -pk kokkos newton on neigh half binsize 2.8 -in in.lj  

![](images/bc3205dcbf928b70a8a90976ed321e9b611da56741bb01ecd176e823476d5149.jpg)  

# Note  

The default binsize for atom sorting on GPUs is equal to the default CPU neighbor binsize (i.e. 2x smaller than the default GPU neighbor binsize). When running simple pair-wise potentials like Lennard Jones on GPUs, using a $2\mathbf{x}$ larger binsize for atom sorting (equal to the default GPU neighbor binsize) and a more frequent sorting than default (e.g. sorting every 100 time steps instead of 1000) may improve performance.  

![](images/481d80b84007d7a2d7320d73e264cfa4471b741fe453dbb079f914451b290408.jpg)  

# Note  

When running on GPUs with many MPI ranks (tens of thousands and more), the creation of the atom map (required for molecular systems) on the GPU can slow down significantly or run out of GPU memory and thus slow down the whole calculation or cause a crash. You can use the -pk kokkos atom/map no command-line switch of the package kokkos atom/map no command to create the atom map on the CPU instead.  

![](images/b9b369521922ba05a3b77eee7e0f6471471fb110bcf282cc6f97e00ee6cfedcd.jpg)  

# Note  

When using a GPU, you will achieve the best performance if your input script does not use fix or compute styles which are not yet Kokkos-enabled. This allows data to stay on the GPU for multiple timesteps, without being copied back to the host CPU. Invoking a non-Kokkos fix or compute, or performing I/O for thermo or dump output will cause data to be copied back to the CPU incurring a performance penalty.  

![](images/389f999807492becac6d898dbc7cfd5cb5f9b0aa841a7e9f4b97b17812564d0f.jpg)  

# Note  

To get an accurate timing breakdown between time spend in pair, kspace, etc., you must set the environment variable CUDA_LAUNCH_BLOCKING ${\cdot}{=}1$ . However, this will reduce performance and is not recommended for production runs.  

# Troubleshooting segmentation faults on GPUs  

As noted above, KOKKOS by default assumes that the MPI library is GPU-aware. This is not always the case and can lead to segmentation faults when using more than one MPI process. Normally, LAMMPS will print a warning like “Turning off GPU-aware MPI since it is not detected”, or an error message like “Kokkos with GPU-enabled backend assumes GPU-aware MPI is available”, OR a segmentation fault. To confirm that a segmentation fault is caused by  

# 7.4. Accelerator packages  

this, you can turn off the GPU-aware assumption via the package kokkos command or the corresponding command-line flag.  

If you still get a segmentation fault, despite running with only one MPI process or using the command-line flag to turn off expecting a GPU-aware MPI library, then using the CMake compile setting -DKokkos_ENABLE_DEBUG $=$ on or adding KOKKOS_DEBUG $=$ yes to your machine makefile for building with traditional make will generate useful output that can be passed to the LAMMPS developers for further debugging.  

# Troubleshooting memory allocation on GPUs  

Kokkos Tools provides a set of lightweight profiling and debugging utilities, which interface with instrumentation hooks (eg. space-time-stack) built directly into the Kokkos runtime. After compiling a dynamic LAMMPS library, you then have to set the environment variable KOKKOS_TOOLS_LIBS before executing your LAMMPS Kokkos run. Example:  

export KOKKOS_TOOLS_LIBS=\${HOME}/kokkos-tools/src/tools/memory-events/kp_memory_event. ,→so   
mpirun -np 4 lmp_kokkos_cuda_openmpi -in in.lj -k on g 4 -sf kk  

Starting with the NVIDIA Pascal GPU architecture, CUDA supports “Unified Virtual Memory” (UVM) which enables allocating more memory than a GPU possesses by also using memory on the host CPU and then CUDA will transparently move data between CPU and GPU as needed. The resulting LAMMPS performance depends on memory access pattern, data residency, and GPU memory oversubscription . The CMake option -DKokkos_ENABLE_CUDA_UVM $\underline{{\underline{{\mathbf{\Pi}}}}}$ on or the makefile setting KOKKOS_CUDA_OPTIONS $=$ enable_lambda,force_uvm enables using UVM with Kokkos when compiling LAMMPS.  

# Run with the KOKKOS package by editing an input script  

Alternatively the effect of the -sf or -pk switches can be duplicated by adding the package kokkos or suffix kk commands to your input script.  

The discussion above for building LAMMPS with the KOKKOS package, the mpirun or mpiexec command, and setting appropriate thread properties are the same.  

You must still use the -k on command-line switch to enable the KOKKOS package, and specify its additional arguments for hardware options appropriate to your system, as documented above.  

You can use the suffix kk command, or you can explicitly add a “kk” suffix to individual styles in your input script, e.g.  

The suffix “/kk” is equivalent to “/kk/device”, and for Kokkos CUDA, using the -sf kk in the command-line gives the default CUDA version everywhere. However, if the “/kk/host” suffix is added to a specific style in the input script, the Kokkos OpenMP (CPU) version of that specific style will be used instead. Set the number of OpenMP threads as t Nt and the number of GPUs as g Ng  

For example, the command to run with 1 GPU and 8 OpenMP threads is then:  

mpiexec -np 1 lmp_kokkos_cuda_openmpi -in in.lj -k on g 1 t 8 -sf kk  

Conversely, if the -sf kk/host is used in the command-line and then the “/kk” or “/kk/device” suffix is added to a specific style in your input script, then only that specific style will run on the GPU while everything else will run on the CPU in OpenMP mode. Note that the execution of the CPU and GPU styles will NOT overlap, except for a special case:  

A kspace style and/or molecular topology (bonds, angles, etc.) running on the host CPU can overlap with a pair style running on the GPU. First compile with --default-stream per-thread added to CCFLAGS in the Kokkos CUDA Makefile. Then explicitly use the “/kk/host” suffix for kspace and bonds, angles, etc. in the input file and the “kk” suffix (equal to “kk/device”) on the command-line. Also make sure the environment variable CUDA_LAUNCH_BLOCKING is not set to “1” so CPU/GPU overlap can occur.  

# Performance to expect  

The performance of KOKKOS running in different modes is a function of your hardware, which KOKKOS-enable styles are used, and the problem size.  

Generally speaking, the following rules of thumb apply:  

• When running on CPUs only, with a single thread per MPI task, performance of a KOKKOS style is somewhere between the standard (un-accelerated) styles (MPI-only mode), and those provided by the OPENMP package. However the difference between all 3 is small (less than $20\%$ ).   
• When running on CPUs only, with multiple threads per MPI task, performance of a KOKKOS style is a bit slower than the OPENMP package.   
• When running large number of atoms per GPU, KOKKOS is typically faster than the GPU package when compiled for double precision. The benefit of using single or mixed precision with the GPU package depends significantly on the hardware in use and the simulated system and pair style.   
• When running on Intel Phi hardware, KOKKOS is not as fast as the INTEL package, which is optimized for $\mathrm{x}86$ hardware (not just from Intel) and compilation with the Intel compilers. The INTEL package also can increase the vector length of vector instructions by switching to single or mixed precision mode.   
• The KOKKOS package by default assumes that you are using exactly one MPI rank per GPU. When trying to use multiple MPI ranks per GPU it is mandatory to enable CUDA Multi-Process Service (MPS) to get good performance. In this case it is better to not use all available MPI ranks in order to avoid competing with the MPS daemon for CPU resources.  

See the Benchmark page of the LAMMPS website for performance of the KOKKOS package on different hardware.  

# Advanced Kokkos options  

There are other allowed options when building with the KOKKOS package that can improve performance or assist in debugging or profiling. They are explained on the KOKKOS section of the build extras doc page,  

# Restrictions  

Currently, there are no precision options with the KOKKOS package. All compilation and computation is performed in double precision.  

# 7.4.4 OPENMP package  

The OPENMP package was developed by Axel Kohlmeyer at Temple University. It provides optimized and multithreaded versions of many pair styles, nearly all bonded styles (bond, angle, dihedral, improper), several Kspace styles, and a few fix styles. It uses the OpenMP interface for multi-threading, but can also be compiled without OpenMP support, providing optimized serial styles in that case.  

# Required hardware/software  

To enable multi-threading, your compiler must support the OpenMP interface. You should have one or more multicore CPUs, as multiple threads can only be launched by each MPI task on the local node (using shared memory).  

# Building LAMMPS with the OPENMP package  

See the Build extras page for instructions.  

# Run with the OPENMP package from the command-line  

These examples assume one or more 16-core nodes.  

# 1 MPI task, 16 threads according to OMP_NUM_THREADS env OMP_NUM_THREADS=16 lmp_omp -sf omp -in in.script # 1 MPI task, no threads, optimized kernels lmp_mpi -sf omp -in in.script  

# 4 MPI tasks, 4 threads/task mpirun -np 4 lmp_omp -sf omp -pk omp 4 -in in.script # 8 nodes, 4 MPI tasks/node, 4 threads/task mpirun -np 32 -ppn 4 lmp_omp -sf omp -pk omp 4 -in in.script  

The mpirun or mpiexec command sets the total number of MPI tasks used by LAMMPS (one or multiple per compute node) and the number of MPI tasks used per node. E.g. the mpirun command in MPICH does this via its -np and -ppn switches. Ditto for OpenMPI via -np and -npernode.  

You need to choose how many OpenMP threads per MPI task will be used by the OPENMP package. Note that the product of MPI tasks \* threads/task should not exceed the physical number of cores (on a node), otherwise performance will suffer.  

As in the lines above, use the -sf omp command-line switch, which will automatically append “omp” to styles that support it. The -sf omp switch also issues a default package omp $O$ command, which will set the number of threads per MPI task via the OMP_NUM_THREADS environment variable.  

You can also use the -pk omp Nt command-line switch, to explicitly set $\mathrm{Nt}=\#$ of OpenMP threads per MPI task to use, as well as additional options. Its syntax is the same as the package omp command whose page gives details, including the default values used if it is not specified. It also gives more details on how to set the number of threads via the OMP_NUM_THREADS environment variable.  

# Or run with the OPENMP package by editing an input script  

The discussion above for the mpirun or mpiexec command, MPI tasks/node, and threads/MPI task is the same.  

Use the suffix omp command, or you can explicitly add an “omp” suffix to individual styles in your input script, e.g.  

pair_style lj/cut/omp 2.5  

You must also use the package omp command to enable the OPENMP package. When you do this you also specify how many threads per MPI task to use. The command page explains other options and how to set the number of threads via the OMP_NUM_THREADS environment variable.  

# Speed-up to expect  

Depending on which styles are accelerated, you should look for a reduction in the “Pair time”, “Bond time”, “KSpace time”, and “Loop time” values printed at the end of a run.  

You may see a small performance advantage (5 to $20\%$ ) when running a OPENMP style (in serial or parallel) with a single thread per MPI task, versus running standard LAMMPS with its standard un-accelerated styles (in serial or all-MPI parallelization with 1 task/core). This is because many of the OPENMP styles contain similar optimizations to those used in the OPT package, described in the OPT package doc page.  

With multiple threads/task, the optimal choice of number of MPI tasks/node and OpenMP threads/task can vary a lot and should always be tested via benchmark runs for a specific simulation running on a specific machine, paying attention to guidelines discussed in the next subsection.  

A description of the multi-threading strategy used in the OPENMP package and some performance examples are presented here.  

# Guidelines for best performance  

For many problems on current generation CPUs, running the OPENMP package with a single thread/task is faster than running with multiple threads/task. This is because the MPI parallelization in LAMMPS is often more efficient than multi-threading as implemented in the OPENMP package. The parallel efficiency (in a threaded sense) also varies for different OPENMP styles.  

Using multiple threads/task can be more effective under the following circumstances:  

• Individual compute nodes have a significant number of CPU cores but the CPU itself has limited memory bandwidth, e.g. for Intel Xeon $53\mathrm{xx}$ (Clovertown) and ${54}\mathbf{X}\mathbf{X}$ (Harpertown) quad-core processors. Running one MPI task per CPU core will result in significant performance degradation, so that running with 4 or even only $2\mathrm{{MPI}}$ tasks per node is faster. Running in hybrid MPI $^+$ OpenMP mode will reduce the inter-node communication bandwidth contention in the same way, but offers an additional speedup by utilizing the otherwise idle CPU cores. • The interconnect used for MPI communication does not provide sufficient bandwidth for a large number of MPI tasks per node. For example, this applies to running over gigabit ethernet or on Cray XT4 or XT5 series supercomputers. As in the aforementioned case, this effect worsens when using an increasing number of nodes. • The system has a spatially inhomogeneous particle density which does not map well to the domain decomposition scheme or load-balancing options that LAMMPS provides. This is because multi-threading achieves parallelism over the number of particles, not via their distribution in space. • A machine is being used in “capability mode”, i.e. near the point where MPI parallelism is maxed out. For example, this can happen when using the PPPM solver for long-range electrostatics on large numbers of nodes. The scaling of the KSpace calculation (see the kspace_style command) becomes the performance-limiting factor. Using multi-threading allows less MPI tasks to be invoked and can speed-up the long-range solver, while increasing overall performance by parallelizing the pairwise and bonded calculations via OpenMP. Likewise additional speedup can be sometimes be achieved by increasing the length of the Coulombic cutoff and thus reducing the work done by the long-range solver. Using the run_style verlet/split command, which is compatible with the OPENMP package, is an alternative way to reduce the number of MPI tasks assigned to the KSpace calculation.  

Additional performance tips are as follows:  

• The best parallel efficiency from omp styles is typically achieved when there is at least one MPI task per physical CPU chip, i.e. socket or die. • It is usually most efficient to restrict threading to a single socket, i.e. use one or more MPI task per socket. • NOTE: By default, several current MPI implementations use a processor affinity setting that restricts each MPI task to a single CPU core. Using multi-threading in this mode will force all threads to share the one core and thus is likely to be counterproductive. Instead, binding MPI tasks to a (multicore) socket, should solve this issue.  

# Restrictions  

None.  

# 7.4.5 OPT package  

The OPT package was developed by James Fischer (High Performance Technologies), David Richie, and Vincent Natoli (Stone Ridge Technologies). It contains a handful of pair styles whose compute() methods were rewritten in $\mathrm{C}{+}{+}$ templated form to reduce the overhead due to if tests and other conditional code.  

# Required hardware/software  

Any hardware. Any compiler.  

# Building LAMMPS with the OPT package  

See the Build extras page for instructions.  

# Run with the OPT package from the command-line  

<html><body><table><tr><td rowspan="11">lmp_mpi -sf opt -in in.script run in serial mpirun -np</td></tr><tr><td>0 4 lmp_mpi -sf opt -in in.script : run in parallel</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></table></body></html>  

Use the “-sf opt” command-line switch, which will automatically append “opt” to styles that support it.  

# Or run with the OPT package by editing an input script  

Use the suffix opt command, or you can explicitly add an “opt” suffix to individual styles in your input script, e.g.  

<html><body><table><tr><td>Many-core CPUs</td><td>INTEL,KOKKOS,OPENMP,OPT packages</td></tr><tr><td>GPUs</td><td>GPU,KOKKOS packages</td></tr><tr><td>IntelPhi/AVX</td><td>INTEL,KOKKOS packages</td></tr></table></body></html>  

Which package is fastest for your hardware may depend on the size problem you are running and what commands (accelerated and non-accelerated) are invoked by your input script. While these doc pages include performance guidelines, there is no substitute for trying out the different packages appropriate to your hardware.  

Any accelerated style has the same name as the corresponding standard style, except that a suffix is appended. Otherwise, the syntax for the command that uses the style is identical, their functionality is the same, and the numerical results it produces should also be the same, except for precision and round-off effects.  

For example, all of these styles are accelerated variants of the Lennard-Jones pair_style lj/cut:  

• pair_style lj/cut/gpu • pair_style lj/cut/intel • pair_style lj/cut/kk • pair_style lj/cut/omp • pair_style lj/cut/opt  

To see what accelerate styles are currently available for a particular style, find the style name in the Commands style pages (fix,compute,pair,etc) and see what suffixes are listed (g,i,k,o,t) with it. The doc pages for individual commands (e.g. pair lj/cut or fix nve) also list any accelerated variants available for that style.  

To use an accelerator package in LAMMPS, and one or more of the styles it provides, follow these general steps. Details vary from package to package and are explained in the individual accelerator doc pages, listed above:  

<html><body><table><tr><td>build the accelerator library</td><td>only for GPU package</td></tr><tr><td>install the accelerator package add compile/link fags to Makefile.machine in src /MAKE</td><td>make yes-opt, make yes-intel, etc only for INTEL, KOKKOS, OPENMP, OPT pack-</td></tr><tr><td></td><td>ages</td></tr><tr><td>re-buildLAMMPS prepare and test a regular LAMMPS simulation</td><td>make machine lmp_machine -in in.script; mpirun -np 32</td></tr><tr><td>enable specific accelerator support via -k on command-line</td><td>lmp_machine -in in.script</td></tr><tr><td>switch set any needed options for the package via -pk command-line</td><td>only needed for KOKKOS package</td></tr><tr><td>switch or package command use accelerated styles in your input via -sf command-line</td><td> only if defaults need to be changed</td></tr><tr><td>switchorsuffixcommand</td><td> lmp_machine -in in.script -sf gpu</td></tr></table></body></html>  

Note that the first 4 steps can be done as a single command with suitable make command invocations. This is discussed on the Packages doc pages, and its use is illustrated in the individual accelerator sections. Typically these steps only need to be done once, to create an executable that uses one or more accelerator packages.  

The last 4 steps can all be done from the command-line when LAMMPS is launched, without changing your input script, as illustrated in the individual accelerator sections. Or you can add package and suffix commands to your input script.  

With a few exceptions, you can build a single LAMMPS executable with all its accelerator packages installed. Note however that the INTEL and KOKKOS packages require you to choose one of their hardware options when building for a specific platform. I.e. CPU or Phi option for the INTEL package. Or the OpenMP, CUDA, HIP, SYCL, or Phi option for the KOKKOS package. Or the OpenCL, HIP, or CUDA option for the GPU package.  

These are the exceptions. You cannot build a single executable with:  

• both the INTEL Phi and KOKKOS Phi options • the INTEL Phi or Kokkos Phi option, and the GPU package  

As mentioned above, the Benchmark page of the LAMMPS website gives performance results for the various accelerator packages for several of the standard LAMMPS benchmark problems, as a function of problem size and number of compute nodes, on different hardware platforms.  

Here is a brief summary of what the various packages provide. Details are in the individual accelerator sections.  

• Styles with a “gpu” suffix are part of the GPU package and can be run on Intel, NVIDIA, or AMD GPUs. The speed-up on a GPU depends on a variety of factors, discussed in the accelerator sections.   
• Styles with an “intel” suffix are part of the INTEL package. These styles support vectorized single and mixed precision calculations, in addition to full double precision. In extreme cases, this can provide speedups over $3.5\mathrm{x}$ on CPUs. The package also supports acceleration in “offload” mode to Intel(R) Xeon Phi(TM) co-processors. This can result in additional speedup over 2x depending on the hardware configuration.   
• Styles with a “kk” suffix are part of the KOKKOS package, and can be run using OpenMP on multicore CPUs, on an NVIDIA or AMD GPU, or on an Intel Xeon Phi in “native” mode. The speed-up depends on a variety of factors, as discussed on the KOKKOS accelerator page.   
• Styles with an “omp” suffix are part of the OPENMP package and allow a pair-style to be run in multi-threaded mode using OpenMP. This can be useful on nodes with high-core counts when using less MPI processes than cores is advantageous, e.g. when running with PPPM so that FFTs are run on fewer MPI processors or when the many MPI tasks would overload the available bandwidth for communication.   
• Styles with an “opt” suffix are part of the OPT package and typically speed-up the pairwise calculations of your simulation by $5.25\%$ on a CPU.  

The individual accelerator package doc pages explain:  

• what hardware and software the accelerated package requires   
• how to build LAMMPS with the accelerated package   
• how to run with the accelerated package either via command-line switches or modifying the input script   
• speed-ups to expect   
• guidelines for best performance   
• restrictions  

# 7.5 Comparison of various accelerator packages  

The next section compares and contrasts the various accelerator options, since there are multiple ways to perform OpenMP threading, run on GPUs, optimize for vector units on CPUs and run on Intel Xeon Phi (co-)processors.  

All of these packages can accelerate a LAMMPS calculation taking advantage of hardware features, but they do it in different ways and acceleration is not always guaranteed.  

As a consequence, for a particular simulation on specific hardware, one package may be faster than the other. We give some guidelines below, but the best way to determine which package is faster for your input script is to try multiple of them on your machine and experiment with available performance tuning settings. See the benchmarking section low for examples where this has been done.  

uidelines for using each package optimally:   
• Both, the GPU and the KOKKOS package allows you to assign multiple MPI ranks $\mathrm{(=CPU}$ cores) to the same GPU. For the GPU package, this can lead to a speedup through better utilization of the GPU (by overlapping computation and data transfer) and more efficient computation of the non-GPU accelerated parts of LAMMPS through MPI parallelization, as all system data is maintained and updated on the host. For KOKKOS, there is less to no benefit from this, due to its different memory management model, which tries to retain data on the GPU.   
• The GPU package moves per-atom data (coordinates, forces, and (optionally) neighbor list data, if not computed on the GPU) between the CPU and GPU at every timestep. The KOKKOS/CUDA package only does this on timesteps when a CPU calculation is required (e.g. to invoke a fix or compute that is non-GPU-ized). Hence, if you can formulate your input script to only use GPU-ized fixes and computes, and avoid doing I/O too often (thermo output, dump file snapshots, restart files), then the data transfer cost of the KOKKOS/CUDA package can be very low, causing it to run faster than the GPU package.   
• The GPU package is often faster than the KOKKOS/CUDA package, when the number of atoms per GPU is on the smaller side. The crossover point, in terms of atoms/GPU at which the KOKKOS/CUDA package becomes faster depends strongly on the pair style. For example, for a simple Lennard Jones system the crossover (in single precision) is often about 50K-100K atoms per GPU. When performing double precision calculations the crossover point can be significantly smaller.   
• Both KOKKOS and GPU package compute bonded interactions (bonds, angles, etc) on the CPU. If the GPU package is running with several MPI processes assigned to one GPU, the cost of computing the bonded interactions is spread across more CPUs and hence the GPU package can run faster in these cases.   
• When using LAMMPS with multiple MPI ranks assigned to the same GPU, its performance depends to some extent on the available bandwidth between the CPUs and the GPU. This can differ significantly based on the available bus technology, capability of the host CPU and mainboard, the wiring of the buses and whether switches are used to increase the number of available bus slots, or if GPUs are housed in an external enclosure. This can become quite complex.   
• To achieve significant acceleration through GPUs, both KOKKOS and GPU package require capable GPUs with fast on-device memory and efficient data transfer rates. This requests capable upper mid-level to high-end (desktop) GPUs. Using lower performance GPUs (e.g. on laptops) may result in a slowdown instead.   
• For the GPU package, specifically when running in parallel with MPI, if it often more efficient to exclude the PPPM kspace style from GPU acceleration and instead run it - concurrently with a GPU accelerated pair style - on the CPU. This can often be easily achieved with placing a suffix off command before and a suffix on command after the kspace_style pppm command.   
• The KOKKOS/OpenMP and OPENMP package have different thread management strategies, which should result in OPENMP being more efficient for a small number of threads with increasing overhead as the number of threads per MPI rank grows. The KOKKOS/OpenMP kernels have less overhead in that case, but have lower performance with few threads.   
• The INTEL package contains many options and settings for achieving additional performance on Intel hardware (CPU and accelerator cards), but to unlock this potential, an Intel compiler is required. The package code will compile with GNU gcc, but it will not be as efficient.   
fferences between the GPU and KOKKOS packages:   
• The GPU package accelerates only pair force, neighbor list, and (parts of) PPPM calculations. The KOKKOS  

package attempts to run most of the calculation on the GPU, but can transparently support non-accelerated code (with a performance penalty due to having data transfers between host and GPU).  

• The GPU package requires neighbor lists to be built on the CPU when using exclusion lists, or a triclinic simulation box.   
• The GPU package can be compiled for CUDA or OpenCL and thus supports both, NVIDIA and AMD GPUs well. On NVIDIA hardware, using CUDA is typically resulting in equal or better performance over OpenCL.   
• OpenCL in the GPU package does theoretically also support Intel CPUs or Intel Xeon Phi, but the native support for those in KOKKOS (or INTEL) is superior.  

# HOWTO DISCUSSIONS  

These doc pages describe how to perform various tasks with LAMMPS, both for users and developers. The glossary website page also lists MD terminology, with links to corresponding LAMMPS manual pages. The example input scripts included in the examples directory of the LAMMPS source code distribution and highlighted on the Example scripts page also show how to set up and run various kinds of simulations.  

# 8.1 General howto  

# 8.1.1 Restart a simulation  

There are 3 ways to continue a long LAMMPS simulation. Multiple run commands can be used in the same input script. Each run will continue from where the previous run left off. Or binary restart files can be saved to disk using the restart command. At a later time, these binary files can be read via a read_restart command in a new script. Or they can be converted to text data files using the -r command-line switch and read by a read_data command in a new script.  

Here we give examples of 2 scripts that read either a binary restart file or a converted data file and then issue a new run command to continue where the previous run left off. They illustrate what settings must be made in the new script. Details are discussed in the documentation for the read_restart and read_data commands.  

Look at the in.chain input script provided in the bench directory of the LAMMPS distribution to see the original script that these 2 scripts are based on. If that script had the line  

<html><body><table><tr><td>restart</td><td>50 tmp.restart</td></tr></table></body></html>  

added to it, it would produce two binary restart files (tmp.restart.50 and tmp.restart.100) as it ran.  

This script could be used to read the first restart file and re-run the last 50 timesteps:  

<html><body><table><tr><td>read restart</td><td>tmp.restart.50</td></tr><tr><td>neighbor</td><td>0.4 bin</td></tr><tr><td>neigh 1_modify</td><td>every 1 delay 1</td></tr><tr><td>fix</td><td>1 all nve</td></tr><tr><td>fix</td><td>2 all langevin 1.0 1.0 10.0 904297</td></tr><tr><td>timestep</td><td>0.012</td></tr><tr><td>run</td><td>50</td></tr></table></body></html>  

Note that the following commands do not need to be repeated because their settings are included in the restart file: units, atom_style, special_bonds, pair_style, bond_style. However, these commands do need to be used, since their settings are not in the restart file: neighbor, fix, timestep.  

If you actually use this script to perform a restarted run, you will notice that the thermodynamic data match at step 50 (if you also put a thermo 50 command in the original script), but do not match at step 100. This is because the $f\alpha$ langevin command uses random numbers in a way that does not allow for perfect restarts.  

As an alternate approach, the restart file could be converted to a data file as follows:  

<html><body><table><tr><td>lmp_g++ -r tmp.restart.50 tmp.restart.data</td></tr></table></body></html>  

Then, this script could be used to re-run the last 50 steps:  

<html><body><table><tr><td></td><td></td></tr><tr><td>atom_style</td><td>bond</td></tr><tr><td>pair_style</td><td>lj/cut 1.12</td></tr><tr><td>pair_modify</td><td>shift yes</td></tr><tr><td>bond_style special_bonds</td><td>fene 0.0 1.0 1.0</td></tr><tr><td></td><td></td></tr><tr><td>read_data</td><td>tmp.restart.data</td></tr><tr><td>neighbor</td><td>0.4 bin</td></tr><tr><td>neigh_modify</td><td>every 1 delay 1</td></tr><tr><td>fix fix</td><td>1 all nve</td></tr><tr><td></td><td>2 all langevin 1.0 1.0 10.0 904297</td></tr><tr><td>timestep</td><td>0.012</td></tr><tr><td>reset_timestep 50</td><td></td></tr><tr><td>run</td><td></td></tr></table></body></html>  

Note that nearly all the settings specified in the original in.chain script must be repeated, except the pair_coeff and bond_coeff commands, since the new data file lists the force field coefficients. Also, the reset_timestep command is used to tell LAMMPS the current timestep. This value is stored in restart files, but not in data files.  

# 8.1.2 Visualize LAMMPS snapshots  

Snapshots from LAMMPS simulations can be viewed, visualized, and analyzed in a variety of ways.  

LAMMPS snapshots are created by the dump command, which can create files in several formats. The native LAMMPS dump format is a text file (see dump atom or dump custom) which can be visualized by several visualization tools for MD simulation trajectories. OVITO and VMD seem to be the most popular choices among them.  

The dump image and dump movie styles can output internally rendered images or convert them to a movie during the MD run. It is also possible to create visualizations from LAMMPS inputs or restart file with the LAMMPS-GUI, which uses the dump image command internally. The Snapshot Image Viewer can be used to adjust the visualization of the system interactively and then export the corresponding LAMMPS commands to the clipboard to be inserted into input files.  

Programs included with LAMMPS as auxiliary tools can convert between LAMMPS format files and other formats.   
See the Tools page for details. These are rarely needed these days.  

# 8.1.3 Run multiple simulations from one input script  

This can be done in several ways. See the documentation for individual commands for more details on how these examples work.  

If “multiple simulations” means to continue a previous simulation for more timesteps, then you simply use the run command multiple times. For example, this script  

<html><body><table><tr><td>units lj</td><td></td></tr><tr><td>atom style eatomic</td><td></td></tr><tr><td>read data ( data.lj</td><td></td></tr><tr><td>run 10000</td><td></td></tr><tr><td>run 10000</td><td></td></tr><tr><td>run 10000</td><td></td></tr><tr><td>run 10000</td><td></td></tr><tr><td>run 10000</td><td></td></tr></table></body></html>  

would run 5 successive simulations of the same system for a total of 50,000 timesteps.  

If you wish to run totally different simulations, one after the other, the clear command can be used in between them to re-initialize LAMMPS. For example, this script  

<html><body><table><tr><td>units</td><td></td></tr><tr><td>atom style atomic</td><td></td></tr><tr><td>read data c data.lj</td><td></td></tr><tr><td>run 10000</td><td></td></tr><tr><td>clear</td><td></td></tr><tr><td>units</td><td></td></tr><tr><td>atom style atomic</td><td></td></tr><tr><td>read data c data.lj.new</td><td></td></tr></table></body></html>  

would run 2 independent simulations, one after the other.  

For large numbers of independent simulations, you can use variables and the next and jump commands to loop over the same input script multiple times with different settings. For example, this script, named in.polymer  

<html><body><table><tr><td>variable d index run1 run2 run3 run4 run5 run6 run7 run8 shell cd $d</td></tr><tr><td>read_data data.polymer</td></tr><tr><td></td></tr><tr><td>run 10000 shell cd ..</td></tr><tr><td>clear</td></tr><tr><td>next d</td></tr><tr><td>jump in.polymer</td></tr></table></body></html>  

would run 8 simulations in different directories, using a data.polymer file in each directory. The same concept could be used to run the same system at 8 different temperatures, using a temperature variable and storing the output in different log and dump files, for example  

<html><body><table><tr><td>variable a loop 8</td></tr><tr><td>variable t index 0.8 0.85 0.9 0.95 1.0 1.05 1.1 1.15</td></tr><tr><td></td></tr><tr><td>log log.$a read data.polymer</td></tr><tr><td>velocity all create $t 352839</td></tr><tr><td>fix 1 all nvt $t $t 100.0</td></tr><tr><td>dump 1 all atom 1000 dump.$a</td></tr><tr><td>run 100000</td></tr><tr><td>clear</td></tr></table></body></html>  

# 8.1. General howto  

(continued from previous page)  

next a jump in.polymer  

All of the above examples work whether you are running on 1 or multiple processors, but assumed you are running LAMMPS on a single partition of processors. LAMMPS can be run on multiple partitions via the -partition commandline switch.  

In the last 2 examples, if LAMMPS were run on 3 partitions, the same scripts could be used if the index and loop variables were replaced with universe-style variables, as described in the variable command. Also, the next t and next a commands would need to be replaced with a single next a t command. With these modifications, the 8 simulations of each script would run on the 3 partitions one after the other until all were finished. Initially, 3 simulations would be started simultaneously, one on each partition. When one finished, that partition would then start the fourth simulation, and so forth, until all 8 were completed.  

# 8.1.4 Multi-replica simulations  

Several commands in LAMMPS run multi-replica simulations, meaning that multiple instances (replicas) of your simulation are run simultaneously, with small amounts of data exchanged between replicas periodically.  

These are the relevant commands:  

• hyper for bond boost hyperdynamics (HD)   
• neb for nudged elastic band calculations (NEB)   
• neb_spin for magnetic nudged elastic band calculations   
• prd for parallel replica dynamics (PRD)   
• tad for temperature accelerated dynamics (TAD)   
• temper for parallel tempering with fixed volume   
• temper/npt for parallel tempering extended for NPT   
• temper/grem for parallel tempering with generalized replica exchange (gREM)   
• fix pimd for path-integral molecular dynamics (PIMD)  

NEB is a method for finding transition states and barrier potential energies. HD, PRD, and TAD are methods for performing accelerated dynamics to find and perform infrequent events. Parallel tempering or replica exchange runs different replicas at a series of temperature to facilitate rare-event sampling. PIMD runs different replicas whose individual particles in different replicas are coupled together by springs to model a system of ring-polymers which can represent the quantum nature of atom cores.  

These commands can only be used if LAMMPS was built with the REPLICA package. See the Build package page for more info.  

In all these cases, you must run with one or more processors per replica. The processors assigned to each replica are determined at run-time by using the -partition command-line switch to launch LAMMPS on multiple partitions, which in this context are the same as replicas. E.g. these commands:  

<html><body><table><tr><td>mpirun -np 16 lmp_linux -partition 8x2 -in in.temper mpirun -np 81mp linux -partition 8x1 -in in.neb</td></tr></table></body></html>  

would each run 8 replicas, on either 16 or 8 processors. Note the use of the -in command-line switch to specify the input script which is required when running in multi-replica mode.  

Also note that with MPI installed on a machine (e.g. your desktop), you can run on more (virtual) processors than you have physical processors. Thus, the above commands could be run on a single-processor (or few-processor) desktop so that you can run a multi-replica simulation on more replicas than you have physical processors. This is useful for testing and debugging, since with most modern processors and MPI libraries, the efficiency of a calculation can severely diminish when oversubscribing processors.  

# 8.1.5 Library interface to LAMMPS  

As described on the Build basics doc page, LAMMPS can be built as a static or shared library, so that it can be called by another code, used in a coupled manner with other codes, or driven through a Python interface.  

At the core of LAMMPS is the LAMMPS class, which encapsulates the state of the simulation program through the state of the various class instances that it is composed of. So a calculation using LAMMPS requires creating an instance of the LAMMPS class and then send it (text) commands, either individually or from a file, or perform other operations that modify the state stored inside that instance or drive simulations. This is essentially what the src/main.cpp file does as well for the standalone LAMMPS executable, reading commands either from an input file or the standard input.  

Creating a LAMMPS instance can be done by using $\mathrm{C}{+}{+}$ code directly or through a C-style interface library to LAMMPS that is provided in the files src/library.cpp and src/library.h. This $C$ language API, can be used from C and $\mathrm{C}{+}{+}$ , and is also the basis for the Python and Fortran interfaces or the SWIG based wrappers included in the LAMMPS source code.  

The examples/COUPLE and python/examples directories contain some example programs written in $\mathrm{C}{+}{+}$ , C, Fortran, and Python, which show how a driver code can link to LAMMPS as a library, run LAMMPS on a subset of processors (so the others are available to run some other code concurrently), grab data from LAMMPS, change it, and send it back into LAMMPS.  

A detailed documentation of the available APIs and examples of how to use them can be found in the Programmer Guide section of this manual.  

# 8.1.6 Coupling LAMMPS to other codes  

LAMMPS is designed to support being coupled to other codes. For example, a quantum mechanics code might compute forces on a subset of atoms and pass those forces to LAMMPS. Or a continuum finite element (FE) simulation might use atom positions as boundary conditions on FE nodal points, compute a FE solution, and return interpolated forces on MD atoms.  

LAMMPS can be coupled to other codes in at least 4 different ways. Each has advantages and disadvantages, which you will have to think about in the context of your application.  

1. Define a new $f\boldsymbol{{\kappa}}$ or compute command that calls the other code. In this scenario, LAMMPS is the driver code. During timestepping, the fix or compute is invoked, and can make library calls to the other code, which has been linked to LAMMPS as a library. This is the way the VORONOI package, which computes Voronoi tesselations using the $\mathrm{Voro++}$ library, is interfaced to LAMMPS. See the compute voronoi command for more details. Also see the Modify pages for information on how to add a new fix or compute to LAMMPS. 2. Define a new LAMMPS command that calls the other code. This is conceptually similar to method (1), but in this case LAMMPS and the other code are on a more equal footing. Note that now the other code is not called during the timestepping of a LAMMPS run, but between runs. The LAMMPS input script can be used to alternate LAMMPS runs with calls to the other code, invoked via the new command. The run command facilitates this with its every option, which makes it easy to run a few steps, invoke the command, run a few steps, invoke the command, etc.  

In this scenario, the other code can be called as a library, as in 1., or it could be a stand-alone code, invoked by a system() call made by the command (assuming your parallel machine allows one or more processors to start up another program). In the latter case the stand-alone code could communicate with LAMMPS through files that the command writes and reads.  

See the Modify command page for information on how to add a new command to LAMMPS.  

3. Use LAMMPS as a library called by another code. In this case, the other code is the driver and calls LAMMPS as needed. Alternately, a wrapper code could link and call both LAMMPS and another code as libraries. Again,  

# 8.1. General howto  

the run command has options that allow it to be invoked with minimal overhead (no setup or clean-up) if you wish to do multiple short runs, driven by another program. Details about using the library interface are given in the library API documentation.  

4. Couple LAMMPS with another code in a client/server fashion, using the MDI Library developed by the Molecular Sciences Software Institute (MolSSI) to run LAMMPS as either an MDI driver (client) or an MDI engine (server). The MDI driver issues commands to the MDI server to exchange data between them. See the Using LAMMPS with the MDI library for code coupling page for more information about how LAMMPS can operate in either of these modes.  

# 8.1.7 Using LAMMPS with the MDI library for code coupling  

Client/server coupling of two (or more) codes is where one code is the “client” and sends request messages (data) to one (or more) “server” code(s). A server responds to each request with a reply message (data). This enables two (or more) codes to work in tandem to perform a simulation. In this context, LAMMPS can act as either a client or server code. It does this by using the MolSSI Driver Interface (MDI) library, developed by the Molecular Sciences Software Institute (MolSSI), which is supported by the MDI package.  

Alternate methods for coupling codes with LAMMPS are described on the Coupling LAMMPS to other codes page.  

Some advantages of client/server coupling are that the codes can run as stand-alone executables; they need not be linked together. Thus, neither code needs to have a library interface. This also makes it easy to run the two codes on different numbers of processors. If a message protocol (format and content) is defined for a particular kind of simulation, then in principle any code which implements the client-side protocol can be used in tandem with any code which implements the server-side protocol. Neither code needs to know what specific other code it is working with.  

In MDI nomenclature, a client code is the “driver”, and a server code is an “engine”. One driver code can communicate with one or more instances of one or more engine codes. Driver and engine codes can be written in any language: C, $\mathrm{C}{+}{+}$ , Fortran, Python, etc.  

In addition to allowing driver and engine(s) to run as stand-alone executables, MDI also enables an engine to be a plugin to the client code. In this scenario, server code(s) are compiled as shared libraries, and one (or more) instances of the server are instantiated by the driver code. If the driver code runs in parallel, it can split its MPI communicator into multiple sub-communicators, and launch each plugin engine instance on a sub-communicator. Driver processors within that sub-communicator exchange messages with the corresponding engine instance, and can also send MPI messages to other processors in the driver. The driver code can also destroy engine instances and re-instantiate them. LAMMPS can operate as either a stand-alone or plugin MDI engine. When it operates as a driver, it can use either stand-alone or plugin MDI engines.  

The way in which an MDI driver communicates with an MDI engine is by making MDI_Send() and MDI_Recv() calls, which are conceptually similar to MPI_Send() and MPI_Recv() calls. Each send or receive operation uses a string to identify the command name, and optionally some data, which can be a single value or vector of values of any data type. Inside the MDI library, data is exchanged between the driver and engine via MPI calls or sockets. This is a run-time choice by the user.  

The MDI package provides a mdi engine command, which enables LAMMPS to operate as an MDI engine. Its doc page explains the variety of standard and custom MDI commands which the LAMMPS engine recognizes and can respond to.  

The package also provides a mdi plugin command, which enables LAMMPS to operate as an MDI driver and load an MDI engine as a plugin library.  

The package furthermore includes a fix mdi/qm command, in which LAMMPS operates as an MDI driver in conjunction with a quantum mechanics code as an MDI engine. The post_force() method of the fix_mdi_qm.cpp file shows how a driver issues MDI commands to another code. This command can be used to couple to an MDI engine, which is either a stand-alone code or a plugin library.  

As explained in the fix mdi/qm command documentation, it can be used to perform ab initio MD simulations or energy minimizations, or to evaluate the quantum energy and forces for a series of independent systems. The examples/mdi directory has example input scripts for all of these use cases.  

The package also has a fix mdi/qmmm command in which LAMMPS operates as an MDI driver in conjunction with a quantum mechanics code as an MDI engine to perform QM/MM simulations. The LAMMPS input script partitions the system into QM and MM (molecular mechanics) atoms. As described below the examples/QUANTUM directory has examples for coupling to 3 different quantum codes in this manner.  

The examples/mdi directory contains Python scripts and LAMMPS input script which use LAMMPS as either an MDI driver or engine, or both. Currently, 5 example use cases are provided:  

• Run ab initio MD (AIMD) using 2 instances of LAMMPS. As a driver, LAMMPS performs the timestepping in either NVE or NPT mode. As an engine, LAMMPS computes forces and is a surrogate for a quantum code.   
• LAMMPS runs an MD simulation as a driver. Every N steps it passes the current snapshot to an MDI engine to evaluate the energy, virial, and peratom forces. As the engine, LAMMPS is a surrogate for a quantum code.   
• LAMMPS loops over a series of data files and passes the configuration to an MDI engine to evaluate the energy, virial, and peratom forces and thus acts as a simulation driver. As the engine, LAMMPS is used as a surrogate for a quantum code.   
• A Python script driver invokes a sequence of unrelated LAMMPS calculations. Calculations can be single-point energy/force evaluations, MD runs, or energy minimizations.   
• Run AIMD with a Python driver code and 2 LAMMPS instances as engines. The first LAMMPS instance performs MD timestepping. The second LAMMPS instance acts as a surrogate QM code to compute forces.  

# Note  

In any of these examples where LAMMPS is used as an engine, an actual QM code (provided it has support for MDI) could be used in its place, without modifying the input scripts or launch commands, except to specify the name of the QM code.  

The examples/mdi/Run.sh file illustrates how to launch both driver and engine codes so that they communicate using the MDI library via either MPI or sockets, or using the engine as a stand-alone code, or as a plugin library.  

As of March 2023, these are quantum codes with MDI support provided via Python wrapper scripts included in the LAMMPS distribution. These can be used with the fix mdi/qm and fix mdi/qmmm commands to perform QM calculations of an entire system (e.g. AIMD) or QM/MM simulations. See the examples/QUANTUM sub-directories for more details:  

• LATTE - AIMD only • PySCF - QM/MM only • NWChem - AIMD or QM/MM  

There are also at least two quantum codes which have direct MDI support, Quantum ESPRESSO (QE) and INQ. There are also several QM codes which have indirect support through QCEngine or i-PI. The former means they require a wrapper program (QCEngine) with MDI support which writes/read files to pass data to the quantum code itself. The list of QCEngine-supported and i-PI-supported quantum codes is on the MDI webpage.  

These direct- and indirect-support codes should be usable for full system calculations (e.g. AIMD). Whether they support QM/MM models depends on the individual QM code.  

# 8.1. General howto  

# 8.1.8 Broken Bonds  

Typically, molecular bond interactions persist for the duration of a simulation in LAMMPS. However, some commands break bonds dynamically, including the following:  

• bond_style quartic   
• fix bond/break   
• fix bond/react   
• BPM package bond styles  

A bond can break if it is stretched beyond a user-defined threshold or more generally if other criteria are met.  

For the quartic bond style, when a bond is broken its bond type is set to 0 to effectively break it and pairwise forces between the two atoms in the broken bond are “turned on”. Angles, dihedrals, etc cannot be defined for a system when bond_style quartic is used.  

Similarly, bond styles in the BPM package are also incompatible with angles, dihedrals, etc. and when a bond breaks its type is set to zero. However, in the BPM package one can either turn off all pair interactions between bonded particles or leave them on, overlaying pair forces on top of bond forces. To remove pair forces, the special bond list is dynamically updated. More details can be found on the Howto BPM page.  

The fix bond/break and fix bond/react commands allow breaking of bonds within a molecular topology with may also define angles, dihedrals, etc. These commands update internal topology data structures to remove broken bonds, as well as the appropriate angle, dihedral, etc interactions which include the bond. They also trigger a rebuild of the neighbor list when this occurs, to turn on the appropriate pairwise forces.  

Note that when bonds are dumped to a file via the dump local command, bonds with type 0 are not included.  

The delete_bonds command can be used to query the status of broken bonds with type $=0$ or permanently delete them, e.g.:  

<html><body><table><tr><td>delete bonds all stats</td><td></td></tr><tr><td>delete</td><td> bonds all bond 0 remove</td></tr></table></body></html>  

The compute count/type command tallies the current number of bonds (or angles, etc) for each bond (angle, etc) type.   
It also tallies broken bonds with type $=0$ .  

The compute nbond/atom command tallies the current number of bonds each atom is part of, excluding broken bonds with type $=0$ .  

# 8.2 Settings howto  

# 8.2.1 2d simulations  

You must use the dimension command to specify a 2d simulation. The default is 3d.  

A 2d simulation box must be periodic in z as set by the boundary command. This is the default.  

Simulation boxes in LAMMPS can be either orthogonal or triclinic in shape. Orthogonal boxes in 2d are a rectangle with 4 edges that are each perpendicular to either the x or y coordinate axes. Triclinic boxes in 2d are a parallelogram with opposite pairs of faces parallel to each other. LAMMPS supports two forms of triclinic boxes, restricted and general, which for 2d differ in how the box is oriented with respect to the xy coordinate axes. See the Howto triclinic for a detailed description of all 3 kinds of simulation boxes.  

Here are examples of using the create_box command to define the simulation box for a 2d system.  

<html><body><table><tr><td># 2d orthogonal box using a block-style region region mybox block -10 10 0 10 -0.5 0.5 create_box 1 mybox</td></tr></table></body></html>  

Note that for 2d orthogonal or restricted triclinic boxes, the box has a 3rd dimension which must straddle $\mathbf{Z}=0.0$ in the z dimension. Typically the width of box in the z dimension should be narrow, e.g. -0.5 to 0.5, but that is not required. For a 2d general triclinic box, the a3 vector defined by the lattice command must be (0.0,0.0,1.0), which is its default value. Also the clo and chi arguments of the create_box command must be -0.5 and 0.5.  

Here are examples of using the read_data command to define the simulation box for a 2d system via keywords in the header section of the data file. These are the same boxes as the examples for the create_box command  

<html><body><table><tr><td># 2d orthogonal box</td><td></td></tr><tr><td>-10 10 xlo xhi 010 ylo yhi</td><td></td></tr><tr><td>-0.5 0.5 zlo zhi</td><td># this is the default, so no need to specify</td></tr><tr><td></td><td></td></tr><tr><td># 2d restricted triclinic box with only xy tilt</td><td></td></tr><tr><td> xlo xhi</td><td></td></tr><tr><td>ylo yhi</td><td></td></tr><tr><td>-0.5 0.5 zlo zhi</td><td># this is the default, so no need to specify</td></tr><tr><td>2.0 0.0 0.0 xy xz yz</td><td></td></tr><tr><td></td><td></td></tr><tr><td>avec</td><td># 3d general triclinic box using a primitive cell for a 2d hex lattice</td></tr><tr><td>500 2.5 4.3301270189 0 bvec</td><td></td></tr><tr><td></td><td></td></tr><tr><td>001 cvec</td><td># this is the default, so no need to specify</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td>0 0-0.5 abc origin</td><td></td></tr><tr><td></td><td># this is the default for 2d, so no need to specify</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table></body></html>  

Note that for 2d orthogonal or restricted triclinic boxes, the box has a 3rd dimension specified by the zlo zhi values, which must straddle $\mathbf{Z}=0.0$ . Typically the width of box in the z dimension should be narrow, e.g. -0.5 to 0.5, but that is not required. For a 2d general triclinic box, the z component of avec and bvec must be zero, and cvec must be (0,0,1), which is the default. The z component of abc origin must also be -0.5, which is the default.  

If using the create_atoms command to create atoms in the 2d simulation box, all the z coordinates of created atoms will be zero.  

If using the read_data command to read in a data file of atom coordinates for a 2d system, the z coordinates of all atoms should be zero. A value within epsilon of zero is also allowed in case the data file was generated by another program with finite numeric precision, in which case the z coord for the atom will be set to zero.  

Use the fix enforce2d command as the last fix defined in the input script. It ensures that the z-components of velocities and forces are zeroed out every timestep. The reason to make it the last fix is so that any forces added by other fixes will also be zeroed out.  

Many of the example input scripts included in the examples directory are for 2d models.  

# 8.2. Settings howto  

![](images/1938a956f4ebf1a1dffa2b06db98737799b498a32f1b3fdde842e4318f94c7df.jpg)  

# Note  

Some models in LAMMPS treat particles as finite-size spheres, as opposed to point particles. See the atom_style sphere and fix nve/sphere commands for details. By default, for 2d simulations, such particles will still be modeled as 3d spheres, not 2d discs (circles), meaning their moment of inertia will be that of a sphere. If you wish to model them as 2d discs, see the set density/disc command and the disc option for the fix nve/sphere, fix nvt/sphere, fix nph/sphere, fix npt/sphere commands.  

# 8.2.2 Type labels  

Added in version 15Sep2022.  

Each atom in LAMMPS has an associated numeric atom type. Similarly, each bond, angle, dihedral, and improper is assigned a bond type, angle type, and so on. The primary use of these types is to map potential (force field) parameters to the interactions of the atom, bond, angle, dihedral, and improper.  

By default, type values are entered as integers from 1 to Ntypes wherever they appear in LAMMPS input or output files. The total number Ntypes for each interaction is “locked in” when the simulation box is created.  

A recent addition to LAMMPS is the option to use strings - referred to as type labels - as an alternative. Using type labels instead of numeric types can be advantageous in various scenarios. For example, type labels can make inputs more readable and generic (i.e. usable through the include command for different systems with different numerical values assigned to types. This generality also applies to other inputs like data files read by read_data or molecule template files read by the molecule command. A discussion of the current type label support can be found in (Gissinger). See below for a list of other commands that can use type labels in different ways.  

LAMMPS will internally continue to use numeric types, which means that many previous restrictions still apply. For example, the total number of types is locked in when creating the simulation box, and potential parameters for each type must be provided even if not used by any interactions.  

A collection of type labels for all type-kinds (atom types, bond types, etc.) is stored as a “label map” which is simply a list of numeric types and their associated type labels. Within a type-kind, each type label must be unique. It can be assigned to only one numeric type. To read and write type labels to data files for a given type-kind, all associated numeric types need have a type label assigned. Partial maps can be saved with the labelmap write command and read back with the include command.  

Valid type labels can contain most ASCII characters, but cannot start with a number, a $^{\cdot}\#^{,}$ , or a ‘\*’. Also, labels must not contain whitespace characters. When using the labelmap command in the LAMMPS input, if certain characters appear in the type label, such as the single (’) or double (”) quote or the ‘#’ character, the label must be put in either double, single, or triple (“””) quotes. Triple quotes allow for the most generic type label strings, but they require to have a leading and trailing blank space. When defining type labels the blanks will be ignored. Example:  

labelmap angle 1 """ C1'-C2"-C3#  

This command will map the string \`C1'-C2"-C3#\` to the angle type 1.  

There are two ways to define label maps. One is via the labelmap command. The other is via the read_data command. A data file can have sections such as Atom Type Labels, Bond Type Labels, etc., which assign type labels to numeric types. The label map can be written out to data files by the write_data command. This map is also written to and read from restart files, by the write_restart and read_restart commands.  

# Use of type labels in LAMMPS input or output  

Many LAMMPS input script commands that take a numeric type as an argument can use the associated type label instead. If a type label is not defined for a particular numeric type, only its numeric type can be used.  

This example assigns labels to the atom types, and then uses the type labels to redefine the pair coefficients.  

<html><body><table><tr><td>pair coeff 1 2 1.0 1.0</td><td>numeric types</td></tr><tr><td>labelmap atom 1 C 2 H</td><td></td></tr><tr><td>pair _coeff CH 1.0 1.0</td><td></td></tr><tr><td></td><td>type labels</td></tr></table></body></html>  

Adding support for type labels to various commands is an ongoing project. If an input script command (or a section in a file read by a command) allows substituting a type label for a numeric type argument, it will be explicitly mentioned in that command’s documentation page.  

As a temporary measure, input script commands can take advantage of variables and how they can be expanded during processing of the input. The variables can use functions that will translate type label strings to their respective number as defined in the current label map. See the variable command for details.  

For example, here is how the pair_coeff command could be used with type labels if it did not yet support them, either with an explicit variable command or an implicit variable used in the pair_coeff command.  

labelmap atom 1 C 2 H variable atom1 equal label2type(atom,C) variable atom2 equal label2type(atom,H) pair_coeff \${atom1} \${atom2} 1.0 1.0 labelmap atom 1 C 2 H pair_coeff \$(label2type(atom,C)) \$(label2type(atom,H)) 80.0 1.2  

# Commands that can use label types  

Any workflow that involves reading multiple data files, molecule templates or a combination of the two can be streamlined by using type labels instead of numeric types, because types are automatically synced between the files. The creation of simulation-ready reaction templates for fix bond/react is much simpler when using type labels, and results in templates that can be used without modification in multiple simulations or different systems.  

(Gissinger) J. R. Gissinger, I. Nikiforov, Y. Afshar, B. Waters, M. Choi, D. S. Karls, A. Stukowski, W. Im, H. Heinz, A. Kohlmeyer, and E. B. Tadmor, J Phys Chem B, 128, 3282-3297 (2024).  

# 8.2.3 Triclinic (non-orthogonal) simulation boxes  

By default, LAMMPS uses an orthogonal simulation box to encompass the particles. The orthogonal box has its “origin” at (xlo,ylo,zlo) and extends to (xhi,yhi,zhi). Conceptually it is defined by 3 edge vectors starting from the origin given by $\mathbf{A}=(\mathrm{xhi-xlo},0,0)$ ; $\mathbf{B}=(0,\mathrm{yhi}{-}\mathrm{ylo},0)$ ; $\mathbf{C}=(0,0,\mathrm{zhi}{-}\mathrm{zlo})$ . The boundary command sets the boundary conditions for the 6 faces of the box (periodic, non-periodic, etc). The 6 parameters (xlo,xhi,ylo,yhi,zlo,zhi) are defined at the time the simulation box is created by one of these commands:  

• create_box • read_data • read_restart • read_dump  

# 8.2. Settings howto  

Internally, LAMMPS defines box size parameters lx,ly,lz where $\ln\mathbf{X}=$ xhi-xlo, and similarly in the y and z dimensions. The 6 parameters, as well as lx,ly,lz, can be output via the thermo_style custom command. See the Howto $2d$ doc page for info on how zlo and zhi are defined for 2d simulations.  

# Triclinic simulation boxes  

LAMMPS also allows simulations to be performed using triclinic (non-orthogonal) simulation boxes shaped as a 3d parallelepiped with triclinic symmetry. For 2d simulations a triclinic simulation box is effectively a parallelogram; see the Howto $2d$ doc page for details.  

One use of triclinic simulation boxes is to model solid-state crystals with triclinic symmetry. The lattice command can be used with non-orthogonal basis vectors to define a lattice that will tile a triclinic simulation box via the create_atoms command.  

A second use is to run Parrinello-Rahman dynamics via the fix npt command, which will adjust the xy, xz, yz tilt factors to compensate for off-diagonal components of the pressure tensor. The analog for an energy minimization is the fix box/relax command.  

A third use is to shear a bulk solid to study the response of the material. The fix deform command can be used for this purpose. It allows dynamic control of the xy, xz, yz tilt factors as a simulation runs. This is discussed in the Howto NEMD doc page on non-equilibrium MD (NEMD) simulations.  

Conceptually, a triclinic parallelepiped is defined with an “origin” at (xlo,ylo,zhi) and 3 edge vectors $\mathbf{A}=(\mathrm{ax},\mathrm{ay},\mathrm{az})$ , B $\mathbf{\xi}=(\mathbf{b}\mathbf{x},\mathbf{b}\mathbf{y},\mathbf{b}\mathbf{z})$ , $\mathbf{C}=(\mathrm{cx},\mathrm{cy},\mathrm{cz})$ which can be arbitrary vectors, so long as they are non-zero, distinct, and not co-planar. In addition, they must define a right-handed system, such that (A cross B) points in the direction of C. Note that a left-handed system can be converted to a right-handed system by simply swapping the order of any pair of the A, B, C vectors.  

The 4 commands listed above for defining orthogonal simulation boxes have triclinic options which allow for specification of the origin and edge vectors A, B, C. For each command, this can be done in one of two ways, for what LAMMPS calls a general triclinic box or a restricted triclinic box.  

A general triclinic box is specified by an origin (xlo, ylo, zlo) and arbitrary edge vectors $\mathbf{A}=(\mathrm{ax},\mathrm{ay},\mathrm{az})$ , $\mathbf{B}=(\mathbf{b}\mathbf{x},\mathbf{b}\mathbf{y},\mathbf{b}\mathbf{z})$ and $\mathbf{C}=(\mathrm{cx},\mathrm{cy},\mathrm{cz})$ . So there are 12 parameters in total.  

A restricted triclinic box also has an origin (xlo,ylo,zlo), but its edge vectors are of the following restricted form: $\mathbf{A}=$ (xhi-xlo,0,0), $\mathbf{B}=(\mathrm{xy},\mathrm{yhi}{-}\mathrm{ylo},0)$ , $\mathbf{C}=$ (xz,yz,zhi-zlo). So there are 9 parameters in total. Note that the restricted form requires A to be along the $\mathbf{X}$ -axis, $\mathbf{B}$ to be in the xy plane with a y-component in the $+\mathrm{y}$ direction, and C to have its $\mathbf{Z}$ -component in the ${+}Z$ direction. Note that a restricted triclinic box is right-handed by construction since (A cross $\mathbf{B}$ ) points in the direction of C.  

The $x y,x z,y z$ values can be zero or positive or negative. They are called “tilt factors” because they are the amount of displacement applied to edges of faces of an orthogonal box to change it into a restricted triclinic parallelepiped.  

![](images/64887ff64341a807d37f5116dc45ef02ee6fd1b032e213d00f8b897d641a6021.jpg)  

# Note  

Any right-handed general triclinic box (i.e. solid-state crystal basis vectors) can be rotated in 3d around its origin in order to conform to the LAMMPS definition of a restricted triclinic box. See the discussion in the next sub-section about general triclinic simulation boxes in LAMMPS.  

Note that the thermo_style custom command has keywords for outputting the various parameters that define the size and shape of orthogonal, restricted triclinic, and general triclinic simulation boxes.  

For orthogonal boxes there 6 thermo keywords (xlo,ylo,zlo) and (xhi,yhi,zhi).  

For restricted triclinic boxes there are 9 thermo keywords for (xlo,ylo,zlo), (xhi,yhi,zhi), and the (xy,xz,yz) tilt factors.  

For general triclinic boxes there are 12 thermo keywords for (xlo,ylo,zhi) and the components of the A, B, C edge vectors, namely (avecx,avecy,avecz), (bvecx,bvecy,bvecz), and (cvecx,cvecy,cvecz),  

The remainder of this doc page explains (a) how LAMMPS operates with general triclinic simulation boxes, (b) mathematical transformations between general and restricted triclinic boxes which may be useful when creating LAMMPS inputs or interpreting outputs for triclinic simulations, and (c) how LAMMPS uses tilt factors for restricted triclinic simulation boxes.  

# General triclinic simulation boxes in LAMMPS  

LAMMPS allows specification of general triclinic simulation boxes with their atoms as a convenience for users who may be converting data from solid-state crystallographic representations or from DFT codes for input to LAMMPS. Likewise it allows output of dump files, data files, and thermodynamic data (e.g. pressure tensor) in a general triclinic format.  

However internally, LAMMPS only uses restricted triclinic simulation boxes. This is for parallel efficiency and to formulate partitioning of the simulation box across processors, neighbor list building, and inter-processor communication of per-atom data with methods similar to those used for orthogonal boxes.  

This means 4 things which are important to understand:  

• Input of a general triclinic system is immediately converted to a restricted triclinic system.   
• If output of per-atom data for a general triclinic system is requested (e.g. for atom coordinates in a dump file), conversion from a restricted to general triclinic system is done at the time of output.   
• The conversion of the simulation box and per-atom data from general triclinic to restricted triclinic (and vice versa) is a 3d rotation operation around an origin, which is the lower left corner of the simulation box. This means an input data file for a general triclinic system should specify all per-atom quantities consistent with the general triclinic box and its orientation relative to the standard x,y,z coordinate axes. For example, atom coordinates should be inside the general triclinic simulation box defined by the edge vectors A, B, C and its origin. Likewise per-atom velocities should be in directions consistent with the general triclinic box orientation. E.g. a velocity vector which will be in the $+\mathbf{X}$ direction once LAMMPS converts from a general to restricted triclinic box, should be specified in the data file in the direction of the A edge vector. See the read_data doc page for info on all the per-atom vector quantities to which this rule applies when a data file for a general triclinic box is input.   
• If commands such as write_data or dump custom are used to output general triclinic information, it is effectively the inverse of the operation described in the preceding bullet.   
• Other LAMMPS commands such as region or velocity or set, operate on a restricted triclinic system even if a general triclinic system was defined initially.  

This is the list of commands which have general triclinic options:  

• create_box - define a general triclinic box   
• create_atoms - add atoms to a general triclinic box   
• lattice - define a custom lattice consistent with the A, B, C edge vectors of a general triclinic box   
• read_data - read a data file for a general triclinic system   
• write_data - write a data file for a general triclinic system   
• dump atom, dump custom - output dump snapshots in general triclinic format   
• dump_modify triclinic/general - select general triclinic format for dump output   
• thermo_style - output the pressure tensor in general triclinic format   
• thermo_modify triclinic/general - select general triclinic format for thermo output  

# 8.2. Settings howto  

• read_restart - read a restart file for a general triclinic system • write_restart - write a restart file for a general triclinic system  

# Transformation from general to restricted triclinic boxes  

Let A,B,C be the right-handed edge vectors of a general triclinic simulation box. The equivalent LAMMPS a,b,c for a restricted triclinic box are a 3d rotation of $\mathbf{A},\mathbf{B}$ , and C and can be computed as follows:  

$$
\begin{array}{r l r}{\left(\textbf{a}\textbf{b}\textbf{c}\right)}&{=\left(\begin{array}{l l l}{a_{x}}&{b_{x}}&{c_{x}}\ {0}&{b_{y}}&{c_{y}}\ {0}&{0}&{c_{z}}\end{array}\right)}\ &{}&{a_{x}=A}\ &{}&{b_{x}=\mathbf{B}\cdot\widehat{\textbf{A}}=\begin{array}{r l}{B\cosh\gamma}&{}\ {b_{y}=\widehat{\textbf{A}}\times\widehat{\textbf{B}}}\end{array}}\ &{}&{b_{y}=\widehat{\textbf{A}}\times\textbf{B}|=\begin{array}{r l}{B^{2}-b_{x}^{2}}\ {C_{x}=\widehat{\textbf{A}}}&{=\begin{array}{r l}{C\cosh\beta}&{}\ {0}&{c_{y}}\end{array}}\ &{}&{c_{y}=\widehat{\textbf{C}}\cdot\widehat{(\textbf{A}\times\textbf{B})}\times\widehat{\textbf{A}}=\begin{array}{r l}{\frac{\textbf{B}\cdot\textbf{C}-b_{x}c_{x}}{b_{y}}}\ {c_{z}=\widehat{\textbf{C}}\cdot\widehat{(\textbf{A}\times\textbf{B})}|}&{=\begin{array}{r l}{\sqrt{c^{2}-c_{x}^{2}-c_{y}^{2}}}\end{array}}\end{array}
$$  

where $\mathbf{A}=|\mathbf{\DeltaA}|$ indicates the scalar length of A. The hat symbol $(\hat{\mathbf{\theta}})$ indicates the corresponding unit vector. $\beta$ and γ are angles between the A, B, C vectors as described below.  

For consistency, the same rotation applied to the triclinic box edge vectors can also be applied to atom positions, velocities, and other vector quantities. This can be conveniently achieved by first converting to fractional coordinates in the general triclinic coordinates and then converting to coordinates in the restricted triclinic basis. The transformation is given by the following equation:  

$$
{\bf x}=\left(\mathbf{a}\quad\mathbf{b}\quad\mathbf{c}\right)\cdot{\frac{1}{V}}\left({\mathbf{B}\times\mathbf{C}}\right)\cdot{\mathbf{X}}
$$  

where $V$ is the volume of the box (same in either basis), $\mathbf{X}$ is the fractional vector in the general triclinic basis and $\mathbf{X}$ is the resulting vector in the restricted triclinic basis.  

# Crystallographic general triclinic representation of a simulation box  

General triclinic crystal structures are often defined using three lattice constants $a,b$ , and $c$ , and three angles $\alpha,\beta$ , and $\gamma.$ . Note that in this nomenclature, the a, b, and c lattice constants are the scalar lengths of the edge vectors a, $\mathbf{b}$ , and c defined above. The relationship between these 6 quantities $(\mathbf{a},\mathbf{b},\mathbf{c},\alpha,\beta,\gamma)$ and the LAMMPS restricted triclinic box sizes $\mathrm{(lx,ly,lz)=}$ (xhi-xlo,yhi-ylo,zhi-zlo) and tilt factors (xy,xz,yz) is as follows:  

$$
\begin{array}{c}{{a=\mathrm{lx}}}\ {{b^{2}=\mathrm{ly}^{2}+\mathrm{xy}^{2}}}\ {{c^{2}=\mathrm{lz}^{2}+\mathrm{xz}^{2}+\mathrm{yz}^{2}}}\ {{\cos\alpha=\frac{\mathrm{xy}\ast\mathrm{xz}+\mathrm{ly}\ast\mathrm{yz}}{b\ast c}}}\ {{\cos\beta=\frac{\mathrm{xz}}{c}}}\ {{\cos\gamma=\frac{\mathrm{xy}}{b}}}\end{array}
$$  

The inverse relationship can be written as follows:  

$$
\begin{array}{l}{\mathrm{lx}=a}\ {\mathrm{xy}=b\cos\gamma}\ {\mathrm{xz}=c\cos\beta}\ {\mathrm{ly}^{2}=b^{2}-\mathrm{xy}^{2}}\ {\mathrm{yz}=\frac{b*c\cos\alpha-\mathrm{xy}*\mathrm{xz}}{\mathrm{ly}}}\ {\mathrm{lz}^{2}=c^{2}-\mathrm{xz}^{2}-\mathrm{yz}^{2}}\end{array}
$$  

The values of $a,b,c,\alpha,\beta$ , and $\gamma$ can be printed out or accessed by computes using the thermo_style custom keywords cella, cellb, cellc, cellalpha, cellbeta, cellgamma, respectively.  

# Output of restricted and general triclinic boxes in a dump file  

As discussed on the dump command doc page, when the BOX BOUNDS for a snapshot is written to a dump file for a restricted triclinic box, an orthogonal bounding box which encloses the triclinic simulation box is output, along with the 3 tilt factors (xy, xz, yz) of the restricted triclinic box, formatted as follows:  

<html><body><table><tr><td>ITEM: BOX BOUNDS xy xz yz</td></tr><tr><td>xlo_bound xhi_bound xy</td></tr><tr><td></td></tr><tr><td>ylo_bound yhi_bound xz zlo_bound zhi_bound yz</td></tr></table></body></html>  

This bounding box is convenient for many visualization programs and is calculated from the 9 restricted triclinic box parameters (xlo,xhi,ylo,yhi,zlo,zhi,xy,xz,yz) as follows:  

<html><body><table><tr><td>xlo bound = xlo + MIN(0.0,xy,xz,xy+xz) xhi bound = xhi + MAX(0.0,xy,xz,xy+xz) ylo _bound = ylo + MIN(O.0,yz)</td></tr></table></body></html>  

These formulas can be inverted if you need to convert the bounding box back into the restricted triclinic box parameters, e.g. xlo $=$ xlo_bound - MIN(0.0,xy,xz,xy+xz).  

# Periodicity and tilt factors for triclinic simulation boxes  

There is no requirement that a triclinic box be periodic in any dimension, though it typically should be in y or z if you wish to enforce a shift in coordinates due to periodic boundary conditions across the y or z boundaries. See the doc page for the boundary command for an explanation of shifted coordinates for restricted triclinic boxes which are periodic.  

Some commands that work with triclinic boxes, e.g. the fix deform and fix npt commands, require periodicity or nonshrink-wrap boundary conditions in specific dimensions. See the command doc pages for details.  

A restricted triclinic box can be defined with all 3 tilt factors $=0.0$ , so that it is initially orthogonal. This is necessary if the box will become non-orthogonal, e.g. due to use of the fix npt or fix deform commands. Alternatively, you can use the change_box command to convert a simulation box from orthogonal to restricted triclinic and vice versa.  

# 8.2. Settings howto  

![](images/496c03767d66b23378b1f1842ba114b11f26d8711247d8be64b44f8572191d9f.jpg)  

# Note  

Highly tilted restricted triclinic simulation boxes can be computationally inefficient. This is due to the large volume of communication needed to acquire ghost atoms around a processor’s irregular-shaped subdomain. For extreme values of tilt, LAMMPS may also lose atoms and generate an error.  

LAMMPS will issue a warning if you define a restricted triclinic box with a tilt factor which skews the box more than half the distance of the parallel box length, which is the first dimension in the tilt factor (e.g. x for xz).  

For example, if $\mathbf{\chi}_{\mathrm{Xlo}}=2$ and $\mathrm{xhi}=12$ , then the x box length is 10 and the xy tilt factor should be between -5 and 5 to avoid the warning. Similarly, both xz and yz should be between -(xhi-xlo)/2 and $+(\mathrm{yhi-ylo})/2$ . Note that these are not limitations, since if the maximum tilt factor is 5 (as in this example), then simulations boxes and atom configurations with $\mathrm{tilt}=\dots,-15,-5,5,15,25,\dots$ are all geometrically equivalent.  

If the box tilt exceeds this limit during a dynamics run (e.g. due to the fix deform command), then by default the box is “flipped” to an equivalent shape with a tilt factor within the warning bounds, and the run continues. See the $f\alpha$ deform page for further details. Box flips that would normally occur using the fix deform or fix npt commands can be suppressed using the flip no option with either of the commands.  

One exception to box flipping is if the first dimension in the tilt factor (e.g. x for xy) is non-periodic. In that case, the limits on the tilt factor are not enforced, since flipping the box in that dimension would not change the atom positions due to non-periodicity. In this mode, if the system tilts to large angles, the simulation will simply become inefficient, due to the highly skewed simulation box.  

# 8.2.4 Thermostats  

Thermostatting means controlling the temperature of particles in an MD simulation. Barostatting means controlling the pressure. Since the pressure includes a kinetic component due to particle velocities, both these operations require calculation of the temperature. Typically a target temperature (T) and/or pressure (P) is specified by the user, and the thermostat or barostat attempts to equilibrate the system to the requested T and/or P.  

Thermostatting in LAMMPS is performed by fixes, or in one case by a pair style. Several thermostatting fixes are available: Nose-Hoover (nvt), Berendsen, CSVR, Langevin, and direct rescaling (temp/rescale). Dissipative particle dynamics (DPD) thermostatting can be invoked via the dpd/tstat pair style:  

• fix nvt • fix nvt/sphere • fix nvt/asphere • fix nvt/sllod • fix temp/berendsen • fix temp/csvr • fix langevin • fix temp/rescale • pair_style dpd/tstat  

Fix nvt only thermostats the translational velocity of particles. Fix nvt/sllod also does this, except that it subtracts out a velocity bias due to a deforming box and integrates the SLLOD equations of motion. See the Howto nemd page for further details. Fix nvt/sphere and fix nvt/asphere thermostat not only translation velocities but also rotational velocities for spherical and aspherical particles.  

![](images/f8832b42b866d067e593bada90fce1a66d65dd34a618ef8d51de46e9c9bce33f.jpg)  

# Note  

A recent (2017) book by (Daivis and Todd) discusses use of the SLLOD method and non-equilibrium MD (NEMD) thermostatting generally, for both simple and complex fluids, e.g. molecular systems. The latter can be tricky to do correctly.  

DPD thermostatting alters pairwise interactions in a manner analogous to the per-particle thermostatting of fix langevin.  

Any of the thermostatting fixes can be instructed to use custom temperature computes that remove bias which has two effects: first, the current calculated temperature, which is compared to the requested target temperature, is calculated with the velocity bias removed; second, the thermostat adjusts only the thermal temperature component of the particle’s velocities, which are the velocities with the bias removed. The removed bias is then added back to the adjusted velocities. See the doc pages for the individual fixes and for the fix_modify command for instructions on how to assign a temperature compute to a thermostatting fix.  

For example, you can apply a thermostat only to atoms in a spatial region by using it in conjunction with compute temp/region. Or you can apply a thermostat to only the x and z components of velocity by using it with compute temp/partial. Of you could thermostat only the thermal temperature of a streaming flow of particles without affecting the streaming velocity, by using compute temp/profile.  

Below is a list of custom temperature computes that can be used like that:  

• compute temp/asphere command compute temp/body command • compute temp/chunk command • compute temp/com command • compute temp/deform command • compute temp/partial command • compute temp/profile command • compute temp/ramp command compute temp/region command • compute temp/rotate command • compute temp/sphere command  

# Note  

Only the nvt fixes perform time integration, meaning they update the velocities and positions of particles due to forces and velocities respectively. The other thermostat fixes only adjust velocities; they do NOT perform time integration updates. Thus they should be used in conjunction with a constant NVE integration fix such as these:  

• fix nve • fix nve/sphere • fix nve/asphere  

Thermodynamic output, which can be setup via the thermo_style command, often includes temperature values. As explained on the page for the thermo_style command, the default temperature is setup by the thermo command itself. It is NOT the temperature associated with any thermostatting fix you have defined or with any compute you have defined that calculates a temperature. The doc pages for the thermostatting fixes explain the ID of the temperature compute they create. Thus if you want to view these temperatures, you need to specify them explicitly via the thermo_style  

# 8.2. Settings howto  

custom command. Or you can use the thermo_modify command to re-define what temperature compute is used for default thermodynamic output.  

(Daivis and Todd) Daivis and Todd, Nonequilibrium Molecular Dynamics (book), Cambridge University Press, https: //doi.org/10.1017/9781139017848, (2017).  

# 8.2.5 Barostats  

Barostatting means controlling the pressure in an MD simulation. Thermostatting means controlling the temperature of the particles. Since the pressure includes a kinetic component due to particle velocities, both these operations require calculation of the temperature. Typically a target temperature (T) and/or pressure (P) is specified by the user, and the thermostat or barostat attempts to equilibrate the system to the requested T and/or P.  

Barostatting in LAMMPS is performed by fixes. Three barostatting methods are currently available: Nose-Hoover (npt and nph), Berendsen, and various linear controllers in deform/pressure:  

• fix npt   
• fix npt/sphere   
• fix npt/asphere   
• fix nph   
• fix press/berendsen   
• fix deform/pressure  

The fix npt commands include a Nose-Hoover thermostat and barostat. Fix nph is just a Nose/Hoover barostat; it does no thermostatting. The fixes nph, press/berendsen, and deform/pressure can be used in conjunction with any of the thermostatting fixes.  

As with the thermostats, fix npt and fix nph only use translational motion of the particles in computing T and P and performing thermo/barostatting. Fix npt/sphere and fix npt/asphere thermo/barostat using not only translation velocities but also rotational velocities for spherical and aspherical particles.  

All of the barostatting fixes use the compute pressure compute to calculate a current pressure. By default, this compute is created with a simple compute temp (see the last argument of the compute pressure command), which is used to calculated the kinetic component of the pressure. The barostatting fixes can also use temperature computes that remove bias for the purpose of computing the kinetic component which contributes to the current pressure. See the doc pages for the individual fixes and for the fix_modify command for instructions on how to assign a temperature or pressure compute to a barostatting fix.  

# Note  

As with the thermostats, the Nose/Hoover methods (fix npt and fix nph) perform time integration. Fix press/berendsen and fix deform/pressure do NOT, so they should be used with one of the constant NVE fixes or with one of the NVT fixes.  

Thermodynamic output, which can be setup via the thermo_style command, often includes pressure values. As explained on the page for the thermo_style command, the default pressure is setup by the thermo command itself. It is NOT the pressure associated with any barostatting fix you have defined or with any compute you have defined that calculates a pressure. The doc pages for the barostatting fixes explain the ID of the pressure compute they create. Thus if you want to view these pressures, you need to specify them explicitly via the thermo_style custom command. Or you can use the thermo_modify command to re-define what pressure compute is used for default thermodynamic output.  

# 8.2.6 Walls  

Walls in an MD simulation are typically used to bound particle motion, i.e. to serve as a boundary condition.  

Walls in LAMMPS can be of rough (made of particles) or idealized surfaces. Ideal walls can be smooth, generating forces only in the normal direction, or frictional, generating forces also in the tangential direction.  

Rough walls, built of particles, can be created in various ways. The particles themselves can be generated like any other particle, via the lattice and create_atoms commands, or read in via the read_data command.  

Their motion can be constrained by many different commands, so that they do not move at all, move together as a group at constant velocity or in response to a net force acting on them, move in a prescribed fashion (e.g. rotate around a point), etc. Note that if a time integration fix like fix nve or fix nvt is not used with the group that contains wall particles, their positions and velocities will not be updated.  

• fix aveforce - set force on particles to average value, so they move together   
• fix setforce - set force on particles to a value, e.g. 0.0   
• fix freeze - freeze particles for use as granular walls   
• fix nve/noforce - advect particles by their velocity, but without force   
• fix move - prescribe motion of particles by a linear velocity, oscillation, rotation, variable  

The fix move command offers the most generality, since the motion of individual particles can be specified with variabl formula which depends on time and/or the particle position.  

For rough walls, it may be useful to turn off pairwise interactions between wall particles via the neigh_modify exclude command.  

Rough walls can also be created by specifying frozen particles that do not move and do not interact with mobile particles, and then tethering other particles to the fixed particles, via a bond. The bonded particles do interact with other mobile particles.  

Idealized walls can be specified via several fix commands. Fix wall/gran creates frictional walls for use with granular particles; all the other commands create smooth walls.  

• fix wall/reflect - reflective flat walls   
• fix wall/lj93 - flat walls, with Lennard-Jones 9/3 potential   
• fix wall/lj126 - flat walls, with Lennard-Jones 12/6 potential   
• fix wall/colloid - flat walls, with pair_style colloid potential   
• fix wall/harmonic - flat walls, with repulsive harmonic spring potential   
• fix wall/morse - flat walls, with Morse potential   
• fix wall/region - use region surface as wall   
• fix wall/gran - flat or curved walls with pair_style granular potential  

The lj93, lj126, colloid, harmonic, and morse styles all allow the flat walls to move with a constant velocity, or oscillate in time. The fix wall/region command offers the most generality, since the region surface is treated as a wall, and the geometry of the region can be a simple primitive volume (e.g. a sphere, or cube, or plane), or a complex volume made from the union and intersection of primitive volumes. Regions can also specify a volume “interior” or “exterior” to the specified primitive shape or union or intersection. Regions can also be “dynamic” meaning they move with constant velocity, oscillate, or rotate.  

The only frictional idealized walls currently in LAMMPS are flat or curved surfaces specified by the fix wall/gran command. At some point we plan to allow region surfaces to be used as frictional walls, as well as triangulated surfaces.  

# 8.2. Settings howto  

# 8.2.7 NEMD simulations  

Non-equilibrium molecular dynamics or NEMD simulations are typically used to measure a fluid’s rheological properties such as viscosity. In LAMMPS, such simulations can be performed by first setting up a non-orthogonal simulation box (see the preceding Howto section).  

A shear strain can be applied to the simulation box at a desired strain rate by using the fix deform command. The $f\alpha$ nvt/sllod command can be used to thermostat the sheared fluid and integrate the SLLOD equations of motion for the system. Fix nvt/sllod uses compute temp/deform to compute a thermal temperature by subtracting out the streaming velocity of the shearing atoms. The velocity profile or other properties of the fluid can be monitored via the fix ave/chunk command.  

![](images/83b725028b8834df445b088b26b0919bc49aef0e1d79c1e244f544168752a3d4.jpg)  

# Note  

A recent (2017) book by (Daivis and Todd) discusses use of the SLLOD method and non-equilibrium MD (NEMD) thermostatting generally, for both simple and complex fluids, e.g. molecular systems. The latter can be tricky to do correctly.  

As discussed in the previous section on non-orthogonal simulation boxes, the amount of tilt or skew that can be applied is limited by LAMMPS for computational efficiency to be $1/2$ of the parallel box length. However, fix deform can continuously strain a box by an arbitrary amount. As discussed in the fix deform command, when the tilt value reaches a limit, the box is flipped to the opposite limit which is an equivalent tiling of periodic space. The strain rate can then continue to change as before. In a long NEMD simulation these box re-shaping events may occur many times.  

In a NEMD simulation, the “remap” option of fix deform should be set to “remap v”, since that is what fix nvt/sllod assumes to generate a velocity profile consistent with the applied shear strain rate.  

An alternative method for calculating viscosities is provided via the fix viscosity command.  

NEMD simulations can also be used to measure transport properties of a fluid through a pore or channel. Simulation of steady-state flow can be performed using the fix flow/gauss command.  

(Daivis and Todd) Daivis and Todd, Nonequilibrium Molecular Dynamics (book), Cambridge University Press, https: //doi.org/10.1017/9781139017848, (2017).  

# 8.2.8 Long-range dispersion settings  

The PPPM method computes interactions by splitting the pair potential into two parts, one of which is computed in a normal pairwise fashion, the so-called real-space part, and one of which is computed using the Fourier transform, the so called reciprocal-space or kspace part. For both parts, the potential is not computed exactly but is approximated. Thus, there is an error in both parts of the computation, the real-space and the kspace error. The just mentioned facts are true both for the PPPM for Coulomb as well as dispersion interactions. The deciding difference - and also the reason why the parameters for pppm/disp have to be selected with more care - is the impact of the errors on the results: The kspace error of the PPPM for Coulomb and dispersion interaction and the real-space error of the PPPM for Coulomb interaction have the character of noise. In contrast, the real-space error of the PPPM for dispersion has a clear physical interpretation: the underprediction of cohesion. As a consequence, the real-space error has a much stronger effect than the kspace error on simulation results for pppm/disp. Parameters must thus be chosen in a way that this error is much smaller than the kspace error.  

When using pppm/disp and not making any specifications on the PPPM parameters via the kspace modify command, parameters will be tuned such that the real-space error and the kspace error are equal. This will result in simulations that are either inaccurate or slow, both of which is not desirable. For selecting parameters for the pppm/disp that provide fast and accurate simulations, there are two approaches, which both have their up- and downsides.  

The first approach is to set desired real-space an kspace accuracies via the kspace_modify force/disp/real and kspace_modify force/disp/kspace commands. Note that the accuracies have to be specified in force units and are thus dependent on the chosen unit settings. For real units, 0.0001 and 0.002 seem to provide reasonable accurate and efficient computations for the real-space and kspace accuracies. 0.002 and 0.05 work well for most systems using lj units. PPPM parameters will be generated based on the desired accuracies. The upside of this approach is that it usually provides a good set of parameters and will work for both the kspace_modify diff ad and kspace_modify diff ik options. The downside of the method is that setting the PPPM parameters will take some time during the initialization of the simulation.  

The second approach is to set the parameters for the pppm/disp explicitly using the kspace_modify mesh/disp, kspace_modify order/disp, and kspace_modify gewald/disp commands. This approach requires a more experienced user who understands well the impact of the choice of parameters on the simulation accuracy and performance. This approach provides a fast initialization of the simulation. However, it is sensitive to errors: A combination of parameters that will perform well for one system might result in far-from-optimal conditions for other simulations. For example, parameters that provide accurate and fast computations for all-atomistic force fields can provide insufficient accuracy or united-atomistic force fields (which is related to that the latter typically have larger dispersion coefficients).  

To avoid inaccurate or inefficient simulations, the pppm/disp stops simulations with an error message if no action is taken to control the PPPM parameters. If the automatic parameter generation is desired and real-space and kspace accuracies are desired to be equal, this error message can be suppressed using the kspace_modify disp/auto yes command.  

A reasonable approach that combines the upsides of both methods is to make the first run using the kspace_modify force/disp/real and kspace_modify force/disp/kspace commands, write down the PPPM parameters from the output, and specify these parameters using the second approach in subsequent runs (which have the same composition, force field, and approximately the same volume).  

Concerning the performance of the pppm/disp there are two more things to consider. The first is that when using the pppm/disp, the cutoff parameter does no longer affect the accuracy of the simulation (subject to that gewald/disp is adjusted when changing the cutoff). The performance can thus be increased by examining different values for the cutoff parameter. A lower bound for the cutoff is only set by the truncation error of the repulsive term of pair potentials.  

The second is that the mixing rule of the pair style has an impact on the computation time when using the pppm/disp. Fastest computations are achieved when using the geometric mixing rule. Using the arithmetic mixing rule substantially increases the computational cost. The computational overhead can be reduced using the kspace_modify mix/disp geom and kspace_modify splittol commands. The first command simply enforces geometric mixing of the dispersion coefficients in kspace computations. This introduces some error in the computations but will also significantly speed-up the simulations. The second keyword sets the accuracy with which the dispersion coefficients are approximated using a matrix factorization approach. This may result in better accuracy then using the first command, but will usually also not provide an equally good increase of efficiency.  

Finally, pppm/disp can also be used when no mixing rules apply. This can be achieved using the kspace_modify mix/disp none command. Note that the code does not check automatically whether any mixing rule is fulfilled. If mixing rules do not apply, the user will have to specify this command explicitly.  

# 8.3 Analysis howto  

# 8.3.1 Output from LAMMPS (thermo, dumps, computes, fixes, variables)  

There are four basic forms of LAMMPS output:  

• Thermodynamic output, which is a list of quantities printed every few timesteps to the screen and logfile. • Dump files, which contain snapshots of atoms and various per-atom values and are written at a specified frequency. • Certain fixes can output user-specified quantities to files: fix ave/time for time averaging, fix ave/chunk for spatial or other averaging, and fix print for single-line output of variables. Fix print can also output to the screen.  

• Restart files.  

A simulation prints one set of thermodynamic output and (optionally) restart files. It can generate any number of dump files and fix output files, depending on what dump and $f\boldsymbol{a}\boldsymbol{x}$ commands you specify.  

As discussed below, LAMMPS gives you a variety of ways to determine what quantities are calculated and printed when the thermodynamics, dump, or fix commands listed above perform output. Throughout this discussion, note that users can also add their own computes and fixes to LAMMPS which can generate values that can then be output with these commands.  

The following subsections discuss different LAMMPS commands related to output and the kind of data they operate on and produce:  

• Global/per-atom/local/per-grid data   
• Scalar/vector/array data   
• Disambiguation   
• Thermodynamic output   
• Dump file output   
• Fixes that write output files   
• Computes that process output quantities   
• Fixes that process output quantities   
• Computes that generate values to output   
• Fixes that generate values to output   
• Variables that generate values to output   
• Summary table of output options and data flow between command  

# Global/per-atom/local/per-grid data  

Various output-related commands work with four different “styles” of data: global, per-atom, local, and per-grid. A global datum is one or more system-wide values, e.g. the temperature of the system. A per-atom datum is one or more values per atom, e.g. the kinetic energy of each atom. Local datums are calculated by each processor based on the atoms it owns, and there may be zero or more per atom, e.g. a list of bond distances.  

A per-grid datum is one or more values per grid cell, for a grid which overlays the simulation domain. Similar to atoms and per-atom data, the grid cells and the data they store are distributed across processors; each processor owns the grid cells whose center points fall within its subdomain.  

# Scalar/vector/array data  

Global, per-atom, local, and per-grid datums can come in three “kinds”: a single scalar value, a vector of values, or a 2d array of values. More specifically these are the valid kinds for each style:  

• global scalar • global vector • global array • per-atom vector • per-atom array • local vector • local array • per-grid vector • per-grid array  

A per-atom vector means a single value per atom; the “vector” is the length of the number of atoms. A per-atom array means multiple values per atom. Similarly a local vector or array means one or multiple values per entity (e.g. per bond in the system). And a per-grid vector or array means one or multiple values per grid cell.  

The doc page for a compute or fix or variable that generates data will specify both the styles and kinds of data it produces, e.g. a per-atom vector. Note that a compute or fix may generate multiple styles and kinds of output. However, for peratom data only a vector or array is output, never both. Likewise for per-local and per-grid data. An example of a fix which generates multiple styles and kinds of data is the fix mdi/qm command. It outputs a global scalar, global vector, and per-atom array for the quantum mechanical energy and virial of the system and forces on each atom.  

By contrast, different variable styles generate only a single kind of data: a global scalar for an equal-style variable, global vector for a vector-style variable, and a per-atom vector for an atom-style variable.  

When data is accessed by another command, as in many of the output commands discussed below, it can be referenced via the following bracket notation, where ID in this case is the ID of a compute. The leading “c_” would be replaced by “f_” for a fix, or “v_” for a variable (and ID would be the name of the variable):  

<html><body><table><tr><td>C_ID</td><td>entire scalar, vector, or array</td></tr><tr><td>c_ID[I]</td><td>one element of vector, one column of array</td></tr><tr><td>c_ID[I][J]</td><td>one element of array</td></tr></table></body></html>  

Note that using one bracket reduces the dimension of the data once (vector $\mathrm{->}$ scalar, array $\mathbf{->}$ vector). Using two brackets reduces the dimension twice (array $\mathrm{->}$ scalar). Thus a command that uses scalar values as input can also conceptually operate on an element of a vector or array.  

Per-grid vectors or arrays are accessed similarly, except that the ID for the compute or fix includes a grid name and a data name. This is because a fix or compute can create multiple grids (of different sizes) and multiple sets of data (for each grid). The fix or compute defines names for each grid and for each data set, so that all of them can be accessed by other commands. See the Howto grid doc page for more details.  

# Disambiguation  

When a compute or fix produces data in multiple styles, e.g. global and per-atom, a reference to the data can sometimes be ambiguous. Usually the context in which the input script references the data determines which style is meant.  

For example, if a compute outputs a global vector and a per-atom array, an element of the global vector will be accessed by using c_ID[I] in thermodynamic output, while a column of the per-atom array will be accessed by using c_ID[I] in a dump custom command.  

However, if a atom-style variable references c_ID[I], then it could be intended to refer to a single element of the global vector or a column of the per-atom array. The doc page for any command that has a potential ambiguity (variables are the most common) will explain how to resolve the ambiguity.  

In this case, an atom-style variables references per-atom data if it exists. If access to an element of a global vector is needed (as in this example), an equal-style variable which references the value can be defined and used in the atom-style variable formula instead.  

Similarly, thermodynamic output can only reference global data from a compute or fix. But you can indirectly access per-atom data as follows. The reference c_ID[245][2] for the ID of a compute displace/atom command, refers to the ycomponent of displacement for the atom with ID 245. While you cannot use that reference directly in the thermo_style command, you can use it an equal-style variable formula, and then reference the variable in thermodynamic output.  

# 8.3. Analysis howto  

# Thermodynamic output  

The frequency and format of thermodynamic output is set by the thermo, thermo_style, and thermo_modify commands. The thermo_style command also specifies what values are calculated and written out. Pre-defined keywords can be specified (e.g. press, etotal, etc). Three additional kinds of keywords can also be specified (c_ID, f_ID, v_name), where a compute or $f\boldsymbol{{x}}$ or variable provides the value to be output. In each case, the compute, fix, or variable must generate global values for input to the thermo_style custom command.  

Note that thermodynamic output values can be “extensive” or “intensive”. The former scale with the number of atoms in the system (e.g. total energy), the latter do not (e.g. temperature). The setting for thermo_modify norm determines whether extensive quantities are normalized or not. Computes and fixes produce either extensive or intensive values; see their individual doc pages for details. Equal-style variables produce only intensive values; you can include a division by “natoms” in the formula if desired, to make an extensive calculation produce an intensive result.  

# Dump file output  

Dump file output is specified by the dump and dump_modify commands. There are several pre-defined formats (dump atom, dump xtc, etc).  

There is also a dump custom format where the user specifies what values are output with each atom. Pre-defined atom attributes can be specified (id, x, fx, etc). Three additional kinds of keywords can also be specified (c_ID, f_ID, v_name), where a compute or fix or variable provides the values to be output. In each case, the compute, fix, or variable must generate per-atom values for input to the dump custom command.  

There is also a dump local format where the user specifies what local values to output. A pre-defined index keyword can be specified to enumerate the local values. Two additional kinds of keywords can also be specified (c_ID, f_ID), where a compute or $f\boldsymbol{{x}}$ or variable provides the values to be output. In each case, the compute or fix must generate local values for input to the dump local command.  

There is also a dump grid format where the user specifies what per-grid values to output from computes or fixes that generate per-grid data.  

# Fixes that write output files  

Several fixes take various quantities as input and can write output files: fix ave/time, fix ave/chunk, fix ave/histo, fix ave/correlate, and fix print.  

The fix ave/time command enables direct output to a file and/or time-averaging of global scalars or vectors. The user specifies one or more quantities as input. These can be global compute values, global fix values, or variables of any style except the atom style which produces per-atom values. Since a variable can refer to keywords used by the thermo_style custom command (like temp or press) and individual per-atom values, a wide variety of quantities can be time averaged and/or output in this way. If the inputs are one or more scalar values, then the fix generate a global scalar or vector of output. If the inputs are one or more vector values, then the fix generates a global vector or array of output. The time-averaged output of this fix can also be used as input to other output commands.  

The fix ave/chunk command enables direct output to a file of chunk-averaged per-atom quantities like those output in dump files. Chunks can represent spatial bins or other collections of atoms, e.g. individual molecules. The per-atom quantities can be atom density (mass or number) or atom attributes such as position, velocity, force. They can also be per-atom quantities calculated by a compute, by a $f\boldsymbol{a}\boldsymbol{x}$ , or by an atom-style variable. The chunk-averaged output of this fix is global and can also be used as input to other output commands.  

Note that the fix ave/grid command can also average the same per-atom quantities within spatial bins, but it does this for a distributed grid whose grid cells are owned by different processors. It outputs per-grid data, not global data, so it is more efficient for large numbers of averaging bins.  

The fix ave/histo command enables direct output to a file of histogrammed quantities, which can be global or per-atom or local quantities. The histogram output of this fix can also be used as input to other output commands.  

The fix ave/correlate command enables direct output to a file of time-correlated quantities, which can be global values The correlation matrix output of this fix can also be used as input to other output commands.  

The fix print command can generate a line of output written to the screen and log file or to a separate file, periodically during a running simulation. The line can contain one or more variable values for any style variable except the vector or atom styles). As explained above, variables themselves can contain references to global values generated by thermodynamic keywords, computes, fixes, or other variables, or to per-atom values for a specific atom. Thus the fix print command is a means to output a wide variety of quantities separate from normal thermodynamic or dump file output.  

# Computes that process output quantities  

The compute reduce and compute reduce/region commands take one or more per-atom or local vector quantities as inputs and “reduce” them (sum, min, max, ave) to scalar quantities. These are produced as output values which can be used as input to other output commands.  

The compute slice command take one or more global vector or array quantities as inputs and extracts a subset of their values to create a new vector or array. These are produced as output values which can be used as input to other output commands.  

The compute property/atom command takes a list of one or more pre-defined atom attributes (id, x, fx, etc) and stores the values in a per-atom vector or array. These are produced as output values which can be used as input to other output commands. The list of atom attributes is the same as for the dump custom command.  

The compute property/local command takes a list of one or more pre-defined local attributes (bond info, angle info, etc) and stores the values in a local vector or array. These are produced as output values which can be used as input to other output commands.  

The compute property/grid command takes a list of one or more pre-defined per-grid attributes (id, grid cell coords, etc) and stores the values in a per-grid vector or array. These are produced as output values which can be used as input to the dump grid command.  

The compute property/chunk command takes a list of one or more pre-defined chunk attributes (id, count, coords for spatial bins) and stores the values in a global vector or array. These are produced as output values which can be used as input to other output commands.  

# Fixes that process output quantities  

The fix vector command can create global vectors as output from global scalars as input, accumulating them one element at a time.  

The fix ave/atom command performs time-averaging of per-atom vectors. The per-atom quantities can be atom attributes such as position, velocity, force. They can also be per-atom quantities calculated by a compute, by a $f\boldsymbol{a}\boldsymbol{x}$ , or by an atomstyle variable. The time-averaged per-atom output of this fix can be used as input to other output commands.  

The fix store/state command can archive one or more per-atom attributes at a particular time, so that the old values can be used in a future calculation or output. The list of atom attributes is the same as for the dump custom command, including per-atom quantities calculated by a compute, by a fix, or by an atom-style variable. The output of this fix can be used as input to other output commands.  

The fix ave/grid command performs time-averaging of either per-atom or per-grid data.  

For per-atom data it performs averaging for the atoms within each grid cell, similar to the fix ave/chunk command when its chunks are defined as regular 2d or 3d bins. The per-atom quantities can be atom density (mass or number) or atom attributes such as position, velocity, force. They can also be per-atom quantities calculated by a compute, by a $f\boldsymbol{{x}}$ , or by an atom-style variable.  

The chief difference between the fix ave/grid and fix ave/chunk commands when used in this context is that the former uses a distributed grid, while the latter uses a global grid. Distributed means that each processor owns the subset of grid cells within its subdomain. Global means that each processor owns a copy of the entire grid. The fix ave/grid command is thus more efficient for large grids.  

For per-grid data, the fix ave/grid command takes inputs for grid data produced by other computes or fixes and averages the values for each grid point over time.  

# 8.3. Analysis howto  

# Computes that generate values to output  

Every compute in LAMMPS produces either global or per-atom or local or per-grid values. The values can be scalars or vectors or arrays of data. These values can be output using the other commands described in this section. The page for each compute command describes what it produces. Computes that produce per-atom or local or per-grid values have the word “atom” or “local” or “grid as the last word in their style name. Computes without the word “atom” or “local” or “grid” produce global values.  

# Fixes that generate values to output  

Some fixes in LAMMPS produces either global or per-atom or local or per-grid values which can be accessed by other commands. The values can be scalars or vectors or arrays of data. These values can be output using the other commands described in this section. The page for each fix command tells whether it produces any output quantities and describes them.  

# Variables that generate values to output  

Variables defined in an input script can store one or more strings. But equal-style, vector-style, and atom-style or atomfile-style variables generate a global scalar value, global vector or values, or a per-atom vector, respectively, when accessed. The formulas used to define these variables can contain references to the thermodynamic keywords and to global and per-atom data generated by computes, fixes, and other variables. The values generated by variables can be used as input to and thus output by the other commands described in this section.  

Per-grid variables have not (yet) been implemented.  

# Summary table of output options and data flow between commands  

This table summarizes the various commands that can be used for generating output from LAMMPS. Each command produces output data of some kind and/or writes data to a file. Most of the commands can take data from other commands as input. Thus you can link many of these commands together in pipeline form, where data produced by one command is used as input to another command and eventually written to the screen or to a file. Note that to hook two commands together the output and input data types must match, e.g. global/per-atom/local data and scalar/vector/array data.  

Also note that, as described above, when a command takes a scalar as input, that could also be an element of a vecto or array. Likewise a vector input could be a column of an array.  

<html><body><table><tr><td>Command</td><td>Input</td><td>Output</td></tr><tr><td>thermo_style custom</td><td>global scalars</td><td>screen, log file</td></tr><tr><td>dump custom</td><td>per-atom vectors</td><td>dump file</td></tr><tr><td>dump local</td><td>local vectors</td><td>dump file</td></tr><tr><td>dump grid</td><td>per-grid vectors</td><td>dump file</td></tr><tr><td>fix print</td><td>global scalar from variable</td><td>screen, file</td></tr><tr><td>print</td><td>global scalar from variable</td><td>screen</td></tr><tr><td>computes</td><td>N/A</td><td>global/per-atom/local/per-grid scalar/vector/array</td></tr><tr><td>fixes</td><td>N/A</td><td>global/per-atom/local/per-grid</td></tr><tr><td>variables</td><td>global scalars and vectors, per-atom vec-</td><td>scalar/vector/array global scalar and vector, per-atom vector</td></tr><tr><td>compute reduce</td><td>tors per-atom/local vectors</td><td>global scalar/vector</td></tr><tr><td>compute slice</td><td>global vectors/arrays</td><td>global vector/array</td></tr><tr><td>compute prop- erty/atom</td><td>N/A</td><td>per-atom vector/array</td></tr><tr><td>compute prop-</td><td>N/A</td><td>local vector/array</td></tr><tr><td>erty/local compute property/grid</td><td>N/A</td><td>per-grid vector/array</td></tr><tr><td>compute prop- erty/chunk</td><td>N/A</td><td>global vector/array</td></tr><tr><td>fix vector</td><td>global scalars</td><td>global vector</td></tr><tr><td>fix avelatom</td><td>per-atom vectors</td><td>per-atom vector/array</td></tr><tr><td>fix ave/time</td><td>global scalars/vectors</td><td>global scalar/vector/array, file</td></tr><tr><td>fix ave/chunk</td><td>per-atom vectors</td><td>global array, file</td></tr><tr><td>fix ave/grid</td><td>per-atom vectors or per-grid vectors</td><td>per-grid vector/array</td></tr><tr><td>fix ave/histo</td><td>global/per-atom/local scalars and vectors</td><td>global array, file</td></tr><tr><td>fix ave/correlate</td><td>global scalars</td><td>global array, file</td></tr><tr><td>fix store/state</td><td></td><td></td></tr><tr><td></td><td>per-atom vectors</td><td>per-atom vector/array</td></tr></table></body></html>  

# 8.3.2 Use chunks to calculate system properties  

In LAMMPS, “chunks” are collections of atoms, as defined by the compute chunk/atom command, which assigns each atom to a chunk ID (or to no chunk at all). The number of chunks and the assignment of chunk IDs to atoms can be static or change over time. Examples of “chunks” are molecules or spatial bins or atoms with similar values (e.g. coordination number or potential energy).  

The per-atom chunk IDs can be used as input to two other kinds of commands, to calculate various properties of a system:  

• fix ave/chunk any of the compute \*/chunk commands  

Here a brief overview for each of the 4 kinds of chunk-related commands is provided. Then some examples are given of how to compute different properties with chunk commands.  

# Compute chunk/atom command:  

This compute can assign atoms to chunks of various styles. Only atoms in the specified group and optional specified region are assigned to a chunk. Here are some possible chunk definitions:  

# 8.3. Analysis howto  

<html><body><table><tr><td>atomsinsamemolecule</td><td>chunk ID =molecule ID</td></tr><tr><td>atoms of same atom type</td><td>chunk ID = atom type</td></tr><tr><td>all atoms with same atom property (charge, ra- dius, etc)</td><td>chunk ID = output of compute property/atom</td></tr><tr><td>atoms in same cluster</td><td>chunk ID= output of compute cluster/atom command</td></tr><tr><td>atoms in same spatial bin</td><td>chunk ID = bin ID</td></tr><tr><td>atoms in same rigid body</td><td>chunk ID = molecule ID used to define rigid bodies</td></tr><tr><td>atoms with similar potential energy</td><td>chunk ID = output of compute pe/atom</td></tr><tr><td>atomswithsamelocaldefectstructure</td><td>chunk ID=output of compute centro/atom or computecoord/atom command</td></tr></table></body></html>  

Note that chunk IDs are integer values, so for atom properties or computes that produce a floating point value, they will be truncated to an integer. You could also use the compute in a variable that scales the floating point value to spread it across multiple integers.  

Spatial bins can be of various kinds, e.g. 1d bins $=$ slabs, 2d bins $=$ pencils, 3d bins $=$ boxes, spherical bins, cylindrica bins.  

This compute also calculates the number of chunks Nchunk, which is used by other commands to tally per-chunk data. Nchunk can be a static value or change over time (e.g. the number of clusters). The chunk ID for an individual atom can also be static (e.g. a molecule ID), or dynamic (e.g. what spatial bin an atom is in as it moves).  

Note that this compute allows the per-atom output of other computes, fixes, and variables to be used to define chunk IDs for each atom. This means you can write your own compute or fix to output a per-atom quantity to use as chunk ID. See the Modify doc pages for info on how to do this. You can also define a per-atom variable in the input script that uses a formula to generate a chunk ID for each atom.  

# Fix ave/chunk command:  

This fix takes the ID of a compute chunk/atom command as input. For each chunk, it then sums one or more specified per-atom values over the atoms in each chunk. The per-atom values can be any atom property, such as velocity, force, charge, potential energy, kinetic energy, stress, etc. Additional keywords are defined for per-chunk properties like density and temperature. More generally any per-atom value generated by other computes, fixes, and per-atom variables, can be summed over atoms in each chunk.  

Similar to other averaging fixes, this fix allows the summed per-chunk values to be time-averaged in various ways, and output to a file. The fix produces a global array as output with one row of values per chunk.  

# Compute \*/chunk commands:  

The following computes operate on chunks of atoms to produce per-chunk values. Any compute whose style name ends in “/chunk” is in this category:  

• compute com/chunk • compute gyration/chunk • compute inertia/chunk compute msd/chunk • compute property/chunk • compute temp/chunk • compute torque/chunk • compute vcm/chunk  

They each take the ID of a compute chunk/atom command as input. As their names indicate, they calculate the centerof-mass, radius of gyration, moments of inertia, mean-squared displacement, temperature, torque, and velocity of center-of-mass for each chunk of atoms. The compute property/chunk command can tally the count of atoms in each chunk and extract other per-chunk properties.  

The reason these various calculations are not part of the fix ave/chunk command, is that each requires a more complicated operation than simply summing and averaging over per-atom values in each chunk. For example, many of them require calculation of a center of mass, which requires summing mass\*position over the atoms and then dividing by summed mass.  

All of these computes produce a global vector or global array as output, with one or more values per chunk. The outpu can be used in various ways:  

• As input to the fix ave/time command, which can write the values to a file and optionally time average them. • As input to the fix ave/histo command to histogram values across chunks. E.g. a histogram of cluster sizes or molecule diffusion rates. • As input to special functions of equal-style variables, like sum() and max() and ave(). E.g. to find the largest cluster or fastest diffusing molecule or average radius-of-gyration of a set of molecules (chunks).  

# Other chunk commands:  

• compute chunk/spread/atom • compute reduce/chunk  

The compute chunk/spread/atom command spreads per-chunk values to each atom in the chunk, producing per-atom values as its output. This can be useful for outputting per-chunk values to a per-atom dump file. Or for using an atom’s associated chunk value in an atom-style variable. Or as input to the fix ave/chunk command to spatially average per-chunk values calculated by a per-chunk compute.  

The compute reduce/chunk command reduces a peratom value across the atoms in each chunk to produce a value per chunk. When used with the compute chunk/spread/atom command it can create peratom values that induce a new set of chunks with a second compute chunk/atom command.  

# Example calculations with chunks  

Here are examples using chunk commands to calculate various properties:  

1. Average velocity in each of 1000 2d spatial bins:  

compute cc1 all chunk/atom bin/2d x 0.0 0.1 y lower 0.01 units reduced fix 1 all ave/chunk 100 10 1000 cc1 vx vy file tmp.out  

2. Temperature in each spatial bin, after subtracting a flow velocity:  

compute cc1 all chunk/atom bin/2d x 0.0 0.1 y lower 0.1 units reduced compute vbias all temp/profile 1 0 0 y 10 fix 1 all ave/chunk 100 10 1000 cc1 temp bias vbias file tmp.out  

3. Center of mass of each molecule:  

compute cc1 all chunk/atom molecule   
compute myChunk all com/chunk cc1   
fix 1 all ave/time 100 1 100 c_myChunk[\*] file tmp.out mode vector  

4. Total force on each molecule and ave/max across all molecules:  

# 8.3. Analysis howto  

compute cc1 all chunk/atom molecule   
fix 1 all ave/chunk 1000 1 1000 cc1 fx fy fz file tmp.out   
variable xave equal ave(f_1[2])   
variable xmax equal max(f_1[2])   
thermo 1000   
thermo_style custom step temp v_xave v_xmax  

5. Histogram of cluster sizes:  

compute cluster all cluster/atom 1.0   
compute cc1 all chunk/atom c_cluster compress yes   
compute size all property/chunk cc1 count   
fix 1 all ave/histo 100 1 100 0 20 20 c_size mode vector ave running beyond ignore file tmp.histo  

6. An example for using a per-chunk value to apply per-atom forces to compress individual polymer chains (molecules) in a mixture, is explained on the compute chunk/spread/atom command doc page.  

7. An example for using one set of per-chunk values for molecule chunks, to create a second set of micelle-scale chunks (clustered molecules, due to hydrophobicity), is explained on the compute reduce/chunk command doc page.  

8. An example for using one set of per-chunk values (dipole moment vectors) for molecule chunks, spreading the values to each atom in each chunk, then defining a second set of chunks as spatial bins, and using the fix ave/chunk command to calculate an average dipole moment vector for each bin. This example is explained on the compute chunk/spread/atom command doc page.  

# 8.3.3 Using distributed grids  

Added in version 22Dec2022.  

LAMMPS has internal capabilities to create uniformly spaced grids which overlay the simulation domain. For 2d and 3d simulations these are 2d and 3d grids respectively. Conceptually a grid can be thought of as a collection of grid cells. Each grid cell can store one or more values (data).  

The grid cells and data they store are distributed across processors. Each processor owns the grid cells (and data) whose center points lie within the spatial subdomain of the processor. If needed for its computations, a processor may also store ghost grid cells with their data.  

Distributed grids can overlay orthogonal or triclinic simulation boxes; see the Howto triclinic doc page for an explanation of the latter. For a triclinic box, the grid cell shape conforms to the shape of the simulation domain, e.g. parallelograms instead of rectangles in 2d.  

If the box size or shape changes during a simulation, the grid changes with it, so that it always overlays the entire simulation domain. For non-periodic dimensions, the grid size in that dimension matches the box size, as set by the boundary command for fixed or shrink-wrapped boundaries.  

If load-balancing is invoked by the balance or fix balance commands, then the subdomain owned by a processor can change which may also change which grid cells they own.  

Post-processing and visualization of grid cell data can be enabled by the dump grid, dump grid/vtk, and dump image commands. The latter has an optional grid keyword. The OVITO visualization tool also plans (as of Nov 2022) to add support for visualizing grid cell data (along with atoms) using dump grid output files as input.  

# Note  

For developers, distributed grids are implemented within the code via two classes: Grid2d and Grid3d. These partition the grid across processors and have methods which allow forward and reverse communication of ghost grid data as well as load balancing. If you write a new compute or fix which needs a distributed grid, these are the classes to look at. A new pair style could use a distributed grid by having a fix define it. Please see the section on using distributed grids within style classes for a detailed description.  

These are the commands which currently define or use distributed grids:  

• fix ttm/grid - store electron temperature on grid • fix ave/grid - time average per-atom or per-grid values • compute property/grid - generate grid IDs and coords • dump grid - output per-grid values in LAMMPS format • dump grid/vtk - output per-grid values in VTK format • dump image grid - include colored grid in output images pair_style amoeba - FFT grids • kspace_style pppm (and variants) - FFT grids • kspace_style msm (and variants) - MSM grids  

The grids used by the kspace_style can not be referenced by an input script. However the grids and data created and used by the other commands can be.  

A compute or fix command may create one or more grids (of different sizes). Each grid can store one or more data fields. A data field can be a single value per grid point (per-grid vector) or multiple values per grid point (per-grid array). See the Howto output doc page for an explanation of how per-grid data can be generated by some commands and used by other commands.  

A command accesses grid data from a compute or fix using a grid reference with the following syntax:  

• c_ID:gname:dname • c_ID:gname:dname[I] • f_ID:gname:dname • f_ID:gname:dname[I]  

The prefix “c_” or “f_” refers to the ID of the compute or fix; gname is the name of the grid, which is assigned by the compute or fix; dname is the name of the data field, which is also assigned by the compute or fix.  

If the data field is a per-grid vector (one value per grid point), then no brackets are used to access the values. If the data field is a per-grid array (multiple values per grid point), then brackets are used to specify the column I of the array. I ranges from 1 to Ncol inclusive, where Ncol is the number of columns in the array and is defined by the compute or fix.  

Currently, there are no per-grid variables implemented in LAMMPS. We may add this feature at some point.  

# 8.3.4 Calculate temperature  

Temperature is computed as kinetic energy divided by some number of degrees of freedom (and the Boltzmann constant). Since kinetic energy is a function of particle velocity, there is often a need to distinguish between a particle’s advection velocity (due to some aggregate motion of particles) and its thermal velocity. The sum of the two is the particle’s total velocity, but the latter is often what is wanted to compute a temperature.  

LAMMPS has several options for computing temperatures, any of which can be used in thermostatting and barostatting. These compute commands calculate temperature:  

• compute temp  

# 8.3. Analysis howto  

• compute temp/sphere • compute temp/asphere • compute temp/com • compute temp/deform • compute temp/partial • compute temp/profile • compute temp/ramp • compute temp/region  

All but the first 3 calculate velocity biases directly (e.g. advection velocities) that are removed when computing the thermal temperature. Compute temp/sphere and compute temp/asphere compute kinetic energy for finite-size particles that includes rotational degrees of freedom. They both allow for velocity biases indirectly, via an optional extra argument which is another temperature compute that subtracts a velocity bias. This allows the translational velocity of spherical or aspherical particles to be adjusted in prescribed ways.  

# 8.3.5 Calculate elastic constants  

Elastic constants characterize the stiffness of a material. The formal definition is provided by the linear relation that holds between the stress and strain tensors in the limit of infinitesimal deformation. In tensor notation, this is expressed as  

$$
\begin{array}{r}{s_{i j}=C_{i j k l}e_{k l}}\end{array}
$$  

where the repeated indices imply summation. $s_{i j}$ are the elements of the symmetric stress tensor. $e_{k l}$ are the elements of the symmetric strain tensor. $C_{i j k l}$ are the elements of the fourth rank tensor of elastic constants. In three dimensions, this tensor has $3^{4}=81$ elements. Using Voigt notation, the tensor can be written as a 6x6 matrix, where $C_{i j}$ is now the derivative of $s_{i}$ w.r.t. $e_{j}$ . Because $s_{i}$ is itself a derivative w.r.t. $e_{i}$ , it follows that $C_{i j}$ is also symmetric, with at most $\frac{7\times6}{2}$ $=21$ distinct elements.  

At zero temperature, it is easy to estimate these derivatives by deforming the simulation box in one of the six directions using the change_box command and measuring the change in the stress tensor. A general-purpose script that does this is given in the examples/ELASTIC directory described on the Examples doc page.  

Calculating elastic constants at finite temperature is more challenging, because it is necessary to run a simulation that performs time averages of differential properties. There are at least 3 ways to do this in LAMMPS. The most reliable way to do this is by exploiting the relationship between elastic constants, stress fluctuations, and the Born matrix, the second derivatives of energy w.r.t. strain (Ray). The Born matrix calculation has been enabled by the compute born/matrix command, which works for any bonded or non-bonded potential in LAMMPS. The most expensive part of the calculation is the sampling of the stress fluctuations. Several examples of this method are provided in the examples/ ELASTIC_T/BORN_MATRIX directory described on the Examples doc page.  

A second way is to measure the change in average stress tensor in an NVT simulations when the cell volume undergoes a finite deformation. In order to balance the systematic and statistical errors in this method, the magnitude of the deformation must be chosen judiciously, and care must be taken to fully equilibrate the deformed cell before sampling the stress tensor. An example of this method is provided in the examples/ELASTIC_T/DEFORMATION directory described on the Examples doc page.  

Another approach is to sample the triclinic cell fluctuations that occur in an NPT simulation. This method can also be slow to converge and requires careful post-processing (Shinoda). We do not provide an example of this method.  

A nice review of the advantages and disadvantages of all of these methods is provided in the paper by Clavier et al.   
(Clavier). (Ray) J. R. Ray and A. Rahman, J Chem Phys, 80, 4423 (1984).   
(Shinoda) Shinoda, Shiga, and Mikami, Phys Rev B, 69, 134103 (2004).   
(Clavier) G. Clavier, N. Desbiens, E. Bourasseau, V. Lachet, N. Brusselle-Dupend and B. Rousseau, Mol Sim, 43, 1413 (2017).  

# 8.3.6 Calculate thermal conductivity  

The thermal conductivity $\kappa$ of a material can be measured in at least 4 ways using various options in LAMMPS. See the examples/KAPPA directory for scripts that implement the 4 methods discussed here for a simple Lennard-Jones fluid model. Also, see the Howto viscosity page for an analogous discussion for viscosity.  

The thermal conductivity tensor $\kappa$ is a measure of the propensity of a material to transmit heat energy in a diffusive manner as given by Fourier’s law  

$$
J=-\boldsymbol{\kappa}\cdot\mathrm{grad}(T)
$$  

where $J$ is the heat flux in units of energy per area per time and grad $(T)$ is the spatial gradient of temperature. The thermal conductivity thus has units of energy per distance per time per degree K and is often approximated as an isotropic quantity, i.e. as a scalar.  

The first method is to setup two thermostatted regions at opposite ends of a simulation box, or one in the middle and one at the end of a periodic box. By holding the two regions at different temperatures with a thermostatting fix, the energy added to the hot region should equal the energy subtracted from the cold region and be proportional to the heat flux moving between the regions. See the papers by Ikeshoji and Hafskjold and Wirnsberger et al for details of this idea. Note that thermostatting fixes such as fix nvt, fix langevin, and fix temp/rescale store the cumulative energy they add/subtract.  

Alternatively, as a second method, the fix heat or fix ehex commands can be used in place of thermostats on each of two regions to add/subtract specified amounts of energy to both regions. In both cases, the resulting temperatures of the two regions can be monitored with the “compute temp/region” command and the temperature profile of the intermediate region can be monitored with the fix ave/chunk and compute ke/atom commands.  

The third method is to perform a reverse non-equilibrium MD simulation using the fix thermal/conductivity command which implements the rNEMD algorithm of Muller-Plathe. Kinetic energy is swapped between atoms in two different layers of the simulation box. This induces a temperature gradient between the two layers which can be monitored with the fix ave/chunk and compute ke/atom commands. The fix tallies the cumulative energy transfer that it performs. See the fix thermal/conductivity command for details.  

The fourth method is based on the Green-Kubo (GK) formula which relates the ensemble average of the auto-correlation of the heat flux to $\kappa$ . The heat flux can be calculated from the fluctuations of per-atom potential and kinetic energies and per-atom stress tensor in a steady-state equilibrated simulation. This is in contrast to the two preceding non-equilibrium methods, where energy flows continuously between hot and cold regions of the simulation box.  

The compute heat/flux command can calculate the needed heat flux and describes how to implement the Green_Kubo formalism using additional LAMMPS commands, such as the fix ave/correlate command to calculate the needed autocorrelation. See the page for the compute heat/flux command for an example input script that calculates the thermal conductivity of solid Ar via the GK formalism.  

# 8.3.7 Calculate viscosity  

The shear viscosity $\eta$ of a fluid can be measured in at least 6 ways using various options in LAMMPS. See the examples/VISCOSITY directory for scripts that implement the 5 methods discussed here for a simple LennardJones fluid model and 1 method for SPC/E water model. Also, see the page on calculating thermal conductivity for an analogous discussion for thermal conductivity.  

$\eta$ is a measure of the propensity of a fluid to transmit momentum in a direction perpendicular to the direction of velocity or momentum flow. Alternatively it is the resistance the fluid has to being sheared. It is given by  

$$
J=-\eta\cdot\mathrm{grad}(V_{\mathrm{stream}})
$$  

where $J$ is the momentum flux in units of momentum per area per time. and grad $(V_{\mathrm{stream}})$ is the spatial gradient of the velocity of the fluid moving in another direction, normal to the area through which the momentum flows. Viscosity thus has units of pressure-time.  

The first method is to perform a non-equilibrium MD (NEMD) simulation by shearing the simulation box via the $f\alpha$ deform command, and using the fix nvt/sllod command to thermostat the fluid via the SLLOD equations of motion. Alternatively, as a second method, one or more moving walls can be used to shear the fluid in between them, again with some kind of thermostat that modifies only the thermal (non-shearing) components of velocity to prevent the fluid from heating up.  

# Note  

A recent (2017) book by (Daivis and Todd) discusses use of the SLLOD method and non-equilibrium MD (NEMD) thermostatting generally, for both simple and complex fluids, e.g. molecular systems. The latter can be tricky to do correctly.  

In both cases, the velocity profile setup in the fluid by this procedure can be monitored by the fix ave/chunk command, which determines grad $(V_{\mathrm{stream}})$ in the equation above. E.g. the derivative in the y-direction of the $V_{x}$ component of fluid motion or grad(Vstream) = ddVyx . The $P_{x y}$ off-diagonal component of the pressure or stress tensor, as calculated by the compute pressure command, can also be monitored, which is the $J$ term in the equation above. See the Howto nemd page for details on NEMD simulations.  

The third method is to perform a reverse non-equilibrium MD simulation using the fix viscosity command which implements the rNEMD algorithm of Muller-Plathe. Momentum in one dimension is swapped between atoms in two different layers of the simulation box in a different dimension. This induces a velocity gradient which can be monitored with the fix ave/chunk command. The fix tallies the cumulative momentum transfer that it performs. See the $f\alpha$ viscosity command for details.  

The fourth method is based on the Green-Kubo (GK) formula which relates the ensemble average of the auto-correlation of the stress/pressure tensor to $\eta$ . This can be done in a fully equilibrated simulation which is in contrast to the two preceding non-equilibrium methods, where momentum flows continuously through the simulation box.  

Here is an example input script that calculates the viscosity of liquid Ar via the GK formalism:  

# Sample LAMMPS input script for viscosity of liquid Ar  

units real   
variable T equal 200.0 # run temperature   
variable Tinit equal 250.0 # equilibration temperature   
variable V equal vol   
variable dt equal 4.0   
variable p equal 400 # correlation length   
variable s equal 5 # sample interval   
variable d equal \$p\*\$s # dump interval  

(continues on next page)  

(continued from previous page)  

# # convert from LAMMPS real units to SI  

variable kB equal 1.3806504e-23 # [J/K] Boltzmann   
variable atm2Pa equal 101325.0   
variable A2m equal 1.0e-10   
variable fs2s equal 1.0e-15   
variable convert equal $\Phi\{\mathrm{atm2Pa}\}^{*}\Phi\{\mathrm{atm2Pa}\}^{*}\Phi\{\mathrm{fs2s}\}^{*}\Phi\{\mathrm{A2m}\}^{*}\Phi\{\mathrm{A2m}\}^{*}\Phi\{\mathrm{A2m}\}\}$   
# setup problem   
dimension 3   
boundary p p p   
lattice fcc 5.376 orient x 1 0 0 orient y 0 1 0 orient z 0 0 1   
region box block 0 4 0 4 0 4   
create_box 1 box   
create_atoms 1 box   
mass 1 39.948   
pair_style lj/cut 13.0   
pair_coeff $**_{0.23813.405}$   
timestep $\$\{\mathrm{dt}\}$   
thermo $\mathbb{S}$ d   
# equilibration and thermalization   
velocity all create \${Tinit} 102486 mom yes rot yes dist gaussian   
fix NVT all nvt temp \${Tinit} \${Tinit} 10 drag 0.2   
run 8000   
$\#$ viscosity calculation, switch to NVE if desired   
velocity all create $\$1$ T 102486 mom yes rot yes dist gaussian   
fix NVT all nvt temp $\mathbb{S}$ T $\mathbb{S}$ T 10 drag 0.2   
#unfix NVT   
#fix NVE all nve   
reset_timestep 0   
variable pxy equal pxy   
variable pxz equal pxz   
variable pyz equal pyz   
fix SS all ave/correlate \$s \$p \$d & v_pxy v_pxz v_pyz type auto file S0St.dat ave running   
variable scale equal $\mathrm{\S\{convert\}/(\S\{k B\}^{*}\Phi T)^{*}\S V^{*}\{\Phi\mathrm{s}^{*}\Phi\{d t\}}}$   
variable v11 equal $\mathrm{trap}(\mathrm{f\_SS}[3])^{*}\Phi\{\mathrm{scale}\}$   
variable v22 equal $\mathrm{trap(f\_SS[4])^{*}\Phi\{s c a l e\}}$   
variable v33 equal $\mathrm{trap}(\mathrm{f}\_{\mathrm{SS}}[5])^{*}\S\{\mathrm{scale}\}$   
thermo_style custom step temp press v_pxy v_pxz v_pyz v_v11 v_v22 v_v33   
run 100000   
variable v equal (v_v11+v_v22+v_v33)/3.0   
variable ndens equal count(all)/vol   
print "average viscosity: \$v [Pa.s] @ \$T K, \${ndens} atoms/A^3"  

The fifth method is related to the above Green-Kubo method, but uses the Einstein formulation, analogous to the  

# 8.3. Analysis howto  

Einstein mean-square-displacement formulation for self-diffusivity. The time-integrated momentum fluxes play the role of Cartesian coordinates, whose mean-square displacement increases linearly with time at sufficiently long times.  

The sixth is the periodic perturbation method, which is also a non-equilibrium MD method. However, instead of measuring the momentum flux in response to an applied velocity gradient, it measures the velocity profile in response to applied stress. A cosine-shaped periodic acceleration is added to the system via the fix accelerate/cos command, and the compute viscosity/cos command is used to monitor the generated velocity profile and remove the velocity bias before thermostatting.  

#  Note  

An article by (Hess) discussed the accuracy and efficiency of these methods.  

(Daivis and Todd) Daivis and Todd, Nonequilibrium Molecular Dynamics (book), Cambridge University Press, https: //doi.org/10.1017/9781139017848, (2017).  

(Hess) Hess, B. The Journal of Chemical Physics 2002, 116 (1), 209-217.  

# 8.3.8 Calculate diffusion coefficients  

The diffusion coefficient $D$ of a material can be measured in at least 2 ways using various options in LAMMPS. See the examples/DIFFUSE directory for scripts that implement the 2 methods discussed here for a simple Lennard-Jones fluid model.  

The first method is to measure the mean-squared displacement (MSD) of the system, via the compute msd command. The slope of the MSD versus time is proportional to the diffusion coefficient. The instantaneous MSD values can be accumulated in a vector via the $f\boldsymbol{{x}}$ vector command, and a line fit to the vector to compute its slope via the variable slope function, and thus extract $D$ .  

The second method is to measure the velocity auto-correlation function (VACF) of the system, via the compute vacf command. The time-integral of the VACF is proportional to the diffusion coefficient. The instantaneous VACF values can be accumulated in a vector via the fix vector command, and time integrated via the variable trap function, and thus extract $D$ .  

# 8.3.9 Output structured data from LAMMPS  

LAMMPS can output structured data with the print and fix print command. This gives you flexibility since you can build custom data formats that contain system properties, thermo data, and variables values. This output can be directed to the screen and/or to a file for post processing.  

# Writing the current system state, thermo data, variable values  

Use the print command to output the current system state, which can include system properties, thermo data and variable values.  

# YAML  

print   
timestep: \$(step)   
pe: \$(pe)   
ke: \$(ke) """ file current_state.yaml screen no  

Listing 1: current_state.yaml  

timestep: 250   
pe: -4.7774327356321810711   
ke: 2.4962152903997174569  

# JSON  

print """{ "timestep": \$(step), "pe": \$(pe), "ke": \$(ke)   
}""" file current_state.json screen no  

Listing 2: current_state.json { "timestep": 250, "pe": -4.7774327356321810711, "ke": 2.4962152903997174569  

# YAML format thermo_style or dump_style output  

# Extracting data from log file  

Added in version $24\mathbf{Mar}2022$ .  

LAMMPS supports the thermo style “yaml” and for “custom” style thermodynamic output the format can be changed to YAML with thermo_modify line yaml. This will produce a block of output in a compact YAML format - one “document” per run - of the following style:  

keywords: ['Step', 'Temp', 'E_pair', 'E_mol', 'TotEng', 'Press', ]   
data:   
- [100, 0.757453103239935, -5.7585054860159, 0, -4.62236133677021, 0.207261053624721, ] - [110, 0.759322359337036, -5.7614668389562, 0, -4.62251889318624, 0.194314975399602, ] - [120, 0.759372342462676, -5.76149365656489, 0, -4.62247073844943, 0.191600048851267, ] - [130, 0.756833027516501, -5.75777334823494, 0, -4.62255928350835, 0.208792327853067, ]  

This data can be extracted and parsed from a log file using python with:  

import re, yaml   
try: from yaml import CSafeLoader as Loader   
except ImportError: from yaml import SafeLoader as Loader   
docs = ""   
with open("log.lammps") as f:  

(continues on next page)  

# 8.3. Analysis howto  

(continued from previous page) for line in f: $\mathbf{m}=\mathrm{re.search}(\mathrm{r^{\prime\prime}}\left(\mathrm{keywords}\boldsymbol{:}\boldsymbol{*}\boldsymbol{\Phi}\right|\mathrm{data}\boldsymbol{:}\mathfrak{P}\left|-\mathfrak{P}\right|\big\backslash_{\cdot}\big\backslash_{\cdot}\mathfrak{P}\big|\right.-\sqrt[\cdot]{\mathfrak{P}})^{\intercal},\mathrm{line}\big)$ if m: d $\mathrm{{ocs}\mathrel{+}\mathrm{{=}}\mathrm{{m.group(0)+\pi^{\prime}\backslash n^{\prime}}}}$ thermo = list(yaml.load_all(docs, Loader=Loader)) print("Number of runs: ", len(thermo)) print(thermo[1]['keywords'][4], $^1=1$ , thermo[1]['data'][2][4])  

After loading the YAML data, thermo is a list containing a dictionary for each “run” where the tag “keywords” maps to the list of thermo header strings and the tag “data” has a list of lists where the outer list represents the lines of output and the inner list the values of the columns matching the header keywords for that step. The second print() command for example will print the header string for the fifth keyword of the second run and the corresponding value for the third output line of that run:  

<html><body><table><tr><td>Number of runs: 2</td></tr><tr><td>TotEng = -4.62140097780047</td></tr></table></body></html>  

# Extracting data from dump file  

Added in version 4May2022.  

YAML format output has been added to multiple commands in LAMMPS, for example dump yaml or fix ave/time Depending on the kind of data being written, organization of the data or the specific syntax used may change, but the principles are very similar and all files should be readable with a suitable YAML parser. A simple example for this is given below:  

import yaml   
try: from yaml import CSafeLoader as YamlLoader   
except ImportError: from yaml import SafeLoader as YamlLoader   
timesteps = []   
with open("dump.yaml", "r") as f: data = yaml.load_all(f, Loader=YamlLoader) for d in data: print('Processing timestep %d' % d['timestep']) timesteps.append(d)   
print('Read %d timesteps from yaml dump' % len(timesteps))   
print('Second timestep: ', timesteps[1]['timestep'])   
print('Box info: x: ' , timesteps[1]['box'][0], ' y:', timesteps[1]['box'][1], ' z:',timesteps[1]['box'][2])   
print('First 5 per-atom columns: ', timesteps[1]['keywords'][0:5])   
print('Corresponding 10th atom data: ', timesteps[1]['data'][9][0:5])  

The corresponding output for a YAML dump command added to the “melt” example is:  

Processing timestep 0   
Processing timestep 50   
Processing timestep 100   
Processing timestep 150  

(continues on next page)  

(continued from previous page)  

Processing timestep 200   
Processing timestep 250   
Read 6 timesteps from yaml dump   
Second timestep: 50   
Box info: x: [0, 16.795961913825074] y: [0, 16.795961913825074] z: [0, 16.795961913825074]   
First 5 per-atom columns: ['id', 'type', 'x', 'y', 'z']   
Corresponding 10th atom data: [10, 1, 4.43828, 0.968481, 0.108555]  

# Processing scalar data with Python  

After reading and parsing the YAML format data, it can be easily imported for further processing and visualization with the pandas and matplotlib Python modules. Because of the organization of the data in the YAML format thermo output, it needs to be told to process only the ‘data’ part of the imported data to create a pandas data frame, and one needs to set the column names from the ‘keywords’ entry. The following Python script code example demonstrates this, and creates the image shown on the right of a simple plot of various bonded energy contributions versus the timestep from a run of the ‘peptide’ example input after changing the thermo style to ‘yaml’. The properties to be used for x and y values can be conveniently selected through the keywords. Please note that those keywords can be changed to custom strings with the thermo_modify colname command.  

![](images/04a255fbc0485be259244fd9f5dad6199c1982eade7ca6986151f48e1a50ae54.jpg)  

import re, yaml   
import pandas as pd   
import matplotlib.pyplot as plt   
try: from yaml import CSafeLoader as Loader   
except ImportError: from yaml import SafeLoader as Loader   
docs = ""   
with open("log.lammps") as f: for line in f: m = re.search(r"^(keywords:.\*\$|data:\$|---\$|\.\.\.\$| - \[.\*\]\$)", line) if $\mathrm{\ddot{m}\cdot d o c s\mathrm{~+=~m.group(0)~+~^{\prime}\backslash n^{\prime}}}$   
thermo = list(yaml.load_all(docs, Loader=Loader))   
df = pd.DataFrame(data=thermo[0]['data'], columns $=$ thermo[0]['keywords'])   
fig = df.plot(x='Step', y=['E_bond', 'E_angle', 'E_dihed', 'E_impro'], ylabel $=1$ Energy in kcal/mol')   
plt.savefig('thermo_bondeng.png')  

# Processing vector data with Python  

Global vector data as produced by fix ave/time uses a slightly different organization of the data. You still have the dictionary keys ‘keywords’ and ‘data’ for the column headers and the data. But the data is a dictionary indexed by the time step and for each step there are multiple rows of values each with a list of the averaged properties. This requires a slightly different processing, since the entire data cannot be directly imported into a single pandas DataFrame class instance. The following Python script example demonstrates how to read such data. The result will combine the data for the different steps into one large “multi-index” table. The pandas IndexSlice class can then be used to select data  

from this combined data frame.  

import yaml   
import pandas as pd   
try: from yaml import CSafeLoader as Loader   
except ImportError: from yaml import SafeLoader as Loader   
with open("ave.yaml") as f: ave = yaml.load(f, Loader=Loader)   
keys = ave['keywords']   
$\mathrm{df}=\{\}$   
for k in ave['data'].keys(): df[k] = pd.DataFrame(data=ave['data'][k], columns=keys)   
# create multi-index data frame   
df = pd.concat(df)   
# output only the first 3 value for steps 200 to 300 of the column Pressure   
idx $=$ pd.IndexSlice   
print(df['Pressure'].loc[idx[200:300, 0:2]])  

# Processing scalar data with Perl  

The ease of processing YAML data is not limited to Python. Here is an example for extracting and processing a LAMMPS log file with Perl instead.  

use YAML::XS;   
open(LOG, "log.lammps") or die("could not open log.lammps: \$!");   
my \$file = "";   
while(my $\Phi_{}]\mathrm{ine}=\mathrm{<LOG>},$ ) { if (\$line =\~ /^(keywords:.\*\$|data:\$|---\$|\.\.\.\$| - \[.\*\]\$)/) { \$file .= \$line; }   
}   
close(LOG);   
$\#$ convert YAML to perl as nested hash and array references   
my $\$1$ thermo = Load $\mathbb{S}$ file;   
$\#$ convert references to real arrays   
my $\mathrm{@keywords=\mathbb{Q}\{\S t h e r m o->\{^t k e y w o r d s^{\prime}\}\}}$ ;   
my $\mathrm{@data=\mathbb{Q}\{\bar{{\ell}}t h e r m o->\{{\ell}d a t a^{\prime}\}\}};$ ;   
$\#$ print first two columns   
print(" $\mathbb{S}$ keywords[0] \$keywords[1]\n");   
foreach ( $@$ data) $\{$ { print("\${\$_}[0] \${\$_}[1]\n");  

# Writing continuous data during a simulation  

The fix print command allows you to output an arbitrary string at defined times during a simulation run.  

# YAML  

fix extra all print 50 """   
- timestep: \$(step) pe: \$(pe) ke: $\$(\mathrm{ke})^{\mathrm{111111}}$ file output.yaml screen no  

Listing 3: output.yaml  

# Fix print output for fix extra   
timestep: 0   
pe: -6.77336805325924729 ke: 4.4988750000000026219   
- timestep: 50   
pe: -4.8082494418323200591 ke: 2.5257981827119797558   
- timestep: 100   
pe: -4.7875608875581505686 ke: 2.5062598821985102582   
- timestep: 150   
pe: -4.7471033686005483787   
ke: 2.466095925545450207   
- timestep: 200   
pe: -4.7509052858544134068 ke: 2.4701136792591693592   
- timestep: 250   
pe: -4.7774327356321810711 ke: 2.4962152903997174569  

Post-processing of YAML files can be easily be done with Python and other scripting languages. In case of Python the yaml package allows you to load the data files and obtain a list of dictionaries.  

import yaml   
with open("output.yaml") as f: data $=$ yaml.load(f, Loader $^{*}=$ yaml.FullLoader)   
print(data)  

[{'timestep': 0, 'pe': -6.773368053259247, 'ke': 4.498875000000003}, {'timestep': 50, 'pe': -4.80824944183232, 'ke': 2.5257981827119798}, {'timestep': 100, 'pe': -4.787560887558151, 'ke': 2.5062598821985103}, {'timestep': 150, 'pe': -4.747103368600548, 'ke': 2.46609592554545}, {'timestep': 200, 'pe': -4.750905285854413, 'ke': 2.4701136792591694}, {'timestep': 250, 'pe': -4.777432735632181, 'ke': 2.4962152903997175}]  

# 8.3. Analysis howto  

# Line Delimited JSON (LD-JSON)  

The JSON format itself is very strict when it comes to delimiters. For continuous output/streaming data it is beneficial use the line delimited JSON format. Each line represents one JSON object.  

<html><body><table><tr><td>fix extra all print 50 {()$ :y(d)s :d(das)$ :ds title "" file output.json screen no</td></tr><tr><td>Listing 4:output.json</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td>"timestep": 100, "pe": -4.7875608875581505686, "ke": 2.5062598821985102582}</td></tr><tr><td>timestep": 150, "pe": -4.7471033686005483787, "ke": 2.466095925545450207}</td></tr><tr><td>"timestep": 200, "pe": -4.7509052858544134068, "ke": 2.4701136792591693592}</td></tr><tr><td></td></tr></table></body></html>  

One simple way to load this data into a Python script is to use the pandas package. It can directly load these files into a data frame:  

<html><body><table><tr><td colspan="2">import pandas as pd</td></tr><tr><td colspan="2">data = pd.read _json('output.json', lines=True) print(data)</td></tr><tr><td colspan="2">timestep pe</td></tr><tr><td></td><td>ke</td></tr><tr><td>0 0 -6.773368 4.498875</td><td></td></tr><tr><td>1 50 -4.808249 2.525798</td><td></td></tr><tr><td>7 100 -4.787561 2.506260</td><td></td></tr><tr><td>3 150 -4.747103 ：2.466096</td><td></td></tr><tr><td>4 200 -4.750905 2.470114 5 250 -4.777433</td><td>2.496215</td></tr></table></body></html>  

# 8.4 Force fields howto  

# 8.4.1 CHARMM, AMBER, COMPASS, DREIDING, and OPLS force fields  

A compact summary of the concepts, definitions, and properties of force fields with explicit bonded interactions (like the ones discussed in this HowTo) is given in (Gissinger).  

A force field has 2 parts: the formulas that define it and the coefficients used for a particular system. Here we only discuss formulas implemented in LAMMPS that correspond to formulas commonly used in the CHARMM, AMBER, COMPASS, and DREIDING force fields. Setting coefficients is done either from special sections in an input data file via the read_data command or in the input script with commands like pair_coeff or bond_coeff and so on. See the Tools doc page for additional tools that can use CHARMM, AMBER, or Materials Studio generated files to assign force field coefficients and convert their output into LAMMPS input. LAMMPS input scripts can also be generated by charmm-gui.org.  

# CHARMM and AMBER  

The CHARMM force field (MacKerell) and AMBER force field (Cornell) have potential energy function of the form  

$$
V=\sum_{b o n d s}E_{b}+\sum_{a n g l e s}E_{a}+\overbrace{\sum_{d i h e d r a l}E_{d}}+\sum_{i m p r o p e r s}E_{i}
$$  

The terms are computed by bond styles (relationship between two atoms), angle styles (between 3 atoms) , dihedral/improper styles (between 4 atoms), pair styles (non-covalently bonded pair interactions) and special bonds. The CMAP term (see fix cmap command for details) corrects for pairs of dihedral angles (“Correction MAP”) to significantly improve the structural and dynamic properties of proteins in crystalline and solution environments (Brooks). The AMBER force field does not include the CMAP term.  

The interaction styles listed below compute force field formulas that are consistent with common options in CHARMM or AMBER. See each command’s documentation for the formula it computes.  

• bond_style harmonic   
• angle_style charmm   
• dihedral_style charmmfsh   
• dihedral_style charmm   
• pair_style lj/charmmfsw/coul/charmmfsh   
• pair_style lj/charmmfsw/coul/long   
pair_style lj/charmm/coul/charmm   
pair_style lj/charmm/coul/charmm/implicit   
pair_style lj/charmm/coul/long   
• special_bonds charmm   
• special_bonds amber  

The pair styles compute Lennard Jones (LJ) and Coulombic interactions with additional switching or shifting functions that ramp the energy and/or force smoothly to zero between an inner $(a)$ and outer $(b)$ cutoff. The older styles with charmm (not charmmfsw or charmmfsh) in their name compute the LJ and Coulombic interactions with an energy switching function (esw) $S(r)$ which ramps the energy smoothly to zero between the inner and outer cutoff. This can cause irregularities in pairwise forces (due to the discontinuous second derivative of energy at the boundaries of the switching region), which in some cases can result in complications in energy minimization and detectable artifacts in MD simulations.  

$$
\begin{array}{l}{{L J(r)=4\varepsilon\left[\left(\frac{\displaystyle\sigma}{\displaystyle r}\right)^{12}-\left(\frac{\displaystyle\sigma}{\displaystyle r}\right)^{6}\right]}}\ {{}}\ {{C(r)=\displaystyle\frac{C q_{i}q_{j}}{\varepsilon r}}}\ {{}}\ {{S(r)=\displaystyle\frac{\left(b^{2}-r^{2}\right)^{2}\left(b^{2}+2r^{2}-3a^{2}\right)}{\left(b^{2}-a^{2}\right)^{3}}}}\end{array}
$$  

$$
E_{L J}(r)=\left\{\begin{array}{l l}{L J(r),}&{r\leq a}\ {L J(r)S(r),}&{a<r\leq b}\ {0,}&{r>b}\end{array}\right.
$$  

$$
E_{c o u l}(r)=\left\{\begin{array}{l l}{C(r),}&{r\leq a}\ {C(r)S(r),}&{a<r\leq b}\ {0,}&{r>b}\end{array}\right.
$$  

![](images/7514dabb66a3d522610f597467d6341dca97e683962b5384c5cfa2f34945f410.jpg)  

The newer styles with charmmfsw or charmmfsh in their name replace energy switching with force switching (fsw) for LJ interactions and force shifting (fsh) functions for Coulombic interactions (Steinbach)  

$$
E_{L J}(r)=\left\{\begin{array}{l l}{4\varepsilon\sigma^{6}\left(\frac{\sigma^{6}-r^{6}}{r^{12}}-\frac{\sigma^{6}}{a^{6}b^{6}}+\frac{1}{a^{3}b^{3}}\right)}&{r\leq a}\ {\frac{4\varepsilon\sigma^{6}\left(\sigma^{6}\left(b^{6}-r^{6}\right)^{2}-b^{3}r^{6}\left(a^{3}+b^{3}\right)\left(b^{3}-r^{3}\right)^{2}\right)}{b^{6}r^{12}\left(b^{6}-a^{6}\right)}}&{a<r\leq b}\ {0,}&{r>b}\end{array}\right.
$$  

$$
E_{c o u l}(r)=\left\{\begin{array}{l l}{C(r)\frac{\left(b-r\right)^{2}}{r b^{2}},}&{r\leq b}\ {0,}&{r>b}\end{array}\right.
$$  

![](images/51defab97f81c43cf5e3961d3666debb6ceb899ff86b6b5bc511543948d53058.jpg)  

These styles are used by LAMMPS input scripts generated by https://charmm-gui.org/ (Brooks).  

# Note  

For CHARMM, newer charmmfsw or charmmfsh styles were released in March 2017. We recommend they be used instead of the older charmm styles. See discussion of the differences on the pair charmm and dihedral charmm doc pages.  

![](images/d0747855e9335450d6f4b18a74e7963fe9ef606e2afd23e3add9d1b8f52afc3a.jpg)  

# Note  

The TIP3P water model is strongly recommended for use with the CHARMM force field. In fact, “using the SPC model with CHARMM parameters is a bad idea” and “to enable TIP4P style water in CHARMM, you would have to write a new pair style” . LAMMPS input scripts generated by Solution Builder on https://charmm-gui.org use TIP3P molecules for solvation. Any other water model can and probably will lead to false conclusions.  

# COMPASS  

COMPASS is a general force field for atomistic simulation of common organic molecules, inorganic small molecules, and polymers which was developed using ab initio and empirical parameterization techniques (Sun). See the Tools page for the msi2lmp tool for creating LAMMPS template input and data files from BIOVIA’s Materials Studio files. Please note that the msi2lmp tool is very old and largely unmaintained, so it does not support all features of Materials Studio provided force field files, especially additions during the last decade. You should watch the output carefully and compare results, where possible. See (Sun) for a description of the COMPASS force field.  

These interaction styles listed below compute force field formulas that are consistent with the COMPASS force field.   
See each command’s documentation for the formula it computes.  

• bond_style class2 • angle_style class2 • dihedral_style class2 • improper_style class2 • pair_style lj/class2 pair_style lj/class2/coul/cut pair_style lj/class2/coul/long • special_bonds lj/coul 0 0 1  

# DREIDING  

DREIDING is a generic force field developed by the Goddard group at Caltech and is useful for predicting structures and dynamics of organic, biological and main-group inorganic molecules. The philosophy in DREIDING is to use general force constants and geometry parameters based on simple hybridization considerations, rather than individual force constants and geometric parameters that depend on the particular combinations of atoms involved in the bond, angle, or torsion terms. DREIDING has an explicit hydrogen bond term to describe interactions involving a hydrogen atom on very electronegative atoms (N, O, F). Unlike CHARMM or AMBER, the DREIDING force field has not been parameterized for considering solvents (like water).  

See (Mayo) for a description of the DREIDING force field  

The interaction styles listed below compute force field formulas that are consistent with the DREIDING force field.   
See each command’s documentation for the formula it computes.   
• bond_style harmonic   
• bond_style morse   
angle_style cosine/squared   
angle_style harmonic   
angle_style cosine   
• angle_style cosine/periodic   
• dihedral_style charmm   
• improper_style umbrella   
• pair_style buck   
• pair_style buck/coul/cut   
• pair_style buck/coul/long   
• pair_style lj/cut   
• pair_style lj/cut/coul/cut   
pair_style lj/cut/coul/long   
pair_style hbond/dreiding/lj   
pair_style hbond/dreiding/morse   
• special_bonds dreiding  

# OPLS  

OPLS (Optimized Potentials for Liquid Simulations) is a general force field for atomistic simulation of organic molecules in solvent. It was developed by the Jorgensen group at Purdue University and later at Yale University. Multiple versions of the OPLS parameters exist for united atom representations (OPLS-UA) and for all-atom representations (OPLS-AA).  

This force field is based on atom types mapped to specific functional groups in organic and biological molecules. Each atom includes a static, partial atomic charge reflecting the oxidation state of the element derived from its bonded neighbors (Jorgensen) and computed based on increments determined by the atom type of the atoms bond to it.  

The interaction styles listed below compute force field formulas that are fully or in part consistent with the OPLS style force fields. See each command’s documentation for the formula it computes. Some are only compatible with a subset of OPLS interactions.  

• bond_style harmonic   
• angle_style harmonic   
• dihedral_style opls   
• improper_style cvff   
• improper_style fourier   
• improper_style harmonic   
• pair_style lj/cut/coul/cut   
• pair_style lj/cut/coul/long   
• pair_modify geometric   
• special_bonds lj/coul 0.0 0.0 0.5 (Gissinger) J. R. Gissinger, I. Nikiforov, Y. Afshar, B. Waters, M. Choi, D. S. Karls, A. Stukowski, W. Im, H. Heinz, A. Kohlmeyer, and E. B. Tadmor, J Phys Chem B, 128, 3282-3297 (2024).   
(MacKerell) MacKerell, Bashford, Bellott, Dunbrack, Evanseck, Field, Fischer, Gao, Guo, Ha, et al (1998). J Phys Chem, 102, 3586 . https://doi.org/10.1021/jp973084f   
(Cornell) Cornell, Cieplak, Bayly, Gould, Merz, Ferguson, Spellmeyer, Fox, Caldwell, Kollman (1995). JACS 117, 5179-5197. https://doi.org/10.1021/ja00124a002   
(Steinbach) Steinbach, Brooks (1994). J Comput Chem, 15, 667. https://doi.org/10.1002/jcc.540150702   
(Brooks) Brooks, et al (2009). J Comput Chem, 30, 1545. https://onlinelibrary.wiley.com/doi/10.1002/jcc.21287 (Sun) Sun (1998). J. Phys. Chem. B, 102, 7338-7364. https://doi.org/10.1021/jp980939v   
(Mayo) Mayo, Olfason, Goddard III (1990). J Phys Chem, 94, 8897-8909. https://doi.org/10.1021/j100389a010 (Jorgensen) Jorgensen, Tirado-Rives (1988). J Am Chem Soc, 110, 1657-1666. https://doi.org/10.1021/ja00214a001  

# 8.4.2 AMOEBA and HIPPO force fields  

The AMOEBA and HIPPO polarizable force fields were developed by Jay Ponder’s group at the U Washington at St Louis. The LAMMPS implementation is based on Fortran 90 code provided by the Ponder group in their Tinker MD software.  

The current implementation (July 2022) of AMOEBA in LAMMPS matches the version discussed in (Ponder), (Ren), and (Shi). Likewise the current implementation of HIPPO in LAMMPS matches the version discussed in (Rackers).  

These force fields can be used when polarization effects are desired in simulations of water, organic molecules, and biomolecules including proteins, provided that parameterizations (Tinker PRM force field files) are available for the systems you are interested in. Files in the LAMMPS potentials directory with a “amoeba” or “hippo” suffix can be used. The Tinker distribution and website have additional force field files as well: https://github.com/TinkerTools/ tinker/tree/release/params.  

Note that currently, HIPPO can only be used for water systems, but HIPPO files for a variety of small organic and biomolecules are in preparation by the Ponder group. Those force field files will be included in the LAMMPS distribution when available.  

To use the AMOEBA or HIPPO force fields, a simulation must be 3d, and fully periodic or fully non-periodic, and use an orthogonal (not triclinic) simulation box.  

The AMOEBA and HIPPO force fields contain the following terms in their energy (U) computation. Further details for AMOEBA equations are in (Ponder), further details for the HIPPO equations are in (Rackers).  

$$
\begin{array}{c}{U=U_{i n t e r m o l e c u l a r}+U_{i n t r a m o l e c u l a r}}\ {U_{i n t e r m o l e c u l a r}=U_{h a l}+U_{r e p u l s i o n}+U_{d i s p e r s i o n}+U_{m u l t i p o l e}+U_{p o l a r}+U_{q x f e r}}\ {U_{i n t r a m o l e c u l a r}=U_{b o n d}+U_{a n g l e}+U_{t o r s i o n}+U_{o o p}+U_{b\theta}+U_{U B}+U_{p i t o r s i o n}+U_{b i t o r s i o n}}\end{array}
$$  

For intermolecular terms, the AMOEBA force field includes only the $U_{h a l}$ , $U_{m u l t i p o l e}$ , $U_{p o l a r}$ terms. The HIPPO force field includes all but the $U_{h a l}$ term. In LAMMPS, these are all computed by the pair_style amoeba or hippo command. Note that the $U_{m u l t i p o l e}$ and $U_{p o l a r}$ terms in this formula are not the same for the AMOEBA and HIPPO force fields.  

For intramolecular terms, the $U_{b o n d}$ , $U_{a n g l e}$ , $U_{t o r s i o n}$ , $U_{o o p}$ terms are computed by the bond_style class2 angle_style amoeba, dihedral_style fourier, and improper_style amoeba commands respectively. The angle_style amoeba command includes the $U_{b\theta}$ bond-angle cross term, and the $U_{U B}$ term for a Urey-Bradley bond contribution between the I,K atoms in the IJK angle.  

The $U_{p i t o r s i o n}$ term is computed by the fix amoeba/pitorsion command. It computes 6-body interaction between a pair of bonded atoms which each have 2 additional bond partners.  

The $U_{b i t o r s i o n}$ term is computed by the fix amoeba/bitorsion command. It computes 5-body interaction between two 4-body torsions (dihedrals) which overlap, having 3 atoms in common.  

These command doc pages have additional details on the terms they compute:  

pair_style amoeba or hippo • bond_style class2 • angle_style amoeba • dihedral_style fourier • improper_style amoeba • fix amoeba/pitorsion • fix amoeba/bitorsion  

To use the AMOEBA or HIPPO force fields in LAMMPS, use commands like the following appropriately in your input script. The only change needed for AMOEBA vs HIPPO simulation is for the pair_style and pair_coeff commands, as shown below. See examples/amoeba for example input scripts for both AMOEBA and HIPPO.  

<html><body><table><tr><td colspan="2">units real amoeba</td><td># required</td></tr><tr><td colspan="2">atom_style class2</td><td></td></tr><tr><td colspan="2">bond_style</td><td># CLASS2 package</td></tr><tr><td colspan="2">angle_style amoeba</td><td></td></tr><tr><td colspan="2">dihedral_style fourier improper _style amoeba</td><td># EXTRA-MOLECULE package</td></tr><tr><td colspan="3"></td></tr><tr><td colspan="2">amtype all property /atom i_amtype ghost yes</td><td># required per-atom data</td></tr><tr><td colspan="2">fix extra all property/atom &</td><td></td></tr><tr><td colspan="2">fix</td><td>i_amgroup i_ired i_xaxis i_yaxis i_zaxis d_pval ghost yes</td></tr><tr><td colspan="2">fix</td><td>polaxe all property/atom i_polaxe</td></tr><tr><td colspan="2">fix pit all amoeba/pitorsion</td><td></td></tr><tr><td colspan="2">fix_modify</td><td># PiTorsion terms in FF</td></tr><tr><td colspan="2">pit energy yes</td><td></td></tr><tr><td colspan="2"></td><td># Bitorsion terms in FF</td></tr><tr><td colspan="2">fix</td><td>bit all amoeba/bitorsion bitorsion.ubiquitin.data</td></tr></table></body></html>  

(continued from previous page)  

<html><body><table><tr><td>fix_modify</td><td>bit energy yes</td></tr><tr><td>read_data</td><td>asd  n de x n fix pit "pitorsion types" "PiTorsion Coeffs" &</td></tr><tr><td></td><td>fix pit pitorsions PiTorsions & fix bit bitorsions BiTorsions</td></tr><tr><td>pair_style</td><td>amoeba #AMOEBA FF</td></tr><tr><td>pair_coeff</td><td>** amoeba_ubiquitin.prm amoeba_ubiquitin.key</td></tr><tr><td>pair_style</td><td>hippo # HIPPO FF</td></tr><tr><td>pair_coeff</td><td>* * hippo_ water.prm hippo_ water.key</td></tr><tr><td>special_bonds</td><td></td></tr><tr><td></td><td>lj/coul 0.5 0.5 0.5 one/five yes # 1-5 neighbors</td></tr></table></body></html>  

The data file read by the read_data command should be created by the tools/tinker/tinker2lmp.py conversion program described below. It will create a section in the data file with the header “Tinker Types”. A fix property/atom command for the data must be specified before the read_data command. In the example above the fix ID is amtype.  

Similarly, if the system you are simulating defines AMOEBA/HIPPO pitorsion or bitorsion interactions, there will be entries in the data file for those interactions. They require a fix amoeba/pitortion and fix amoeba/bitorsion command be defined. In the example above, the IDs for these two fixes are pit and bit.  

Of course, if the system being modeled does not have one or more of the following – bond, angle, dihedral, improper, pitorsion, bitorsion interactions – then the corresponding style and fix commands above do not need to be used. See the example scripts in examples/amoeba for water systems as examples; they are simpler than what is listed above.  

The two fix property/atom commands with IDs (in the example above) extra and polaxe are also needed to define internal per-atom quantities used by the AMOEBA and HIPPO force fields.  

The pair_coeff command used for either the AMOEBA or HIPPO force field takes two arguments for Tinker force field files, namely a PRM and KEY file. The keyfile can be specified as NULL and default values for a various settings will be used. Note that these 2 files are meant to allow use of native Tinker files as-is. However LAMMPS does not support all the options which can be included in a Tinker PRM or KEY file. See specifics below.  

A special_bonds command with the one/five option is required, since the AMOEBA/HIPPO force fields define weighting factors for not only 1-2, 1-3, 1-4 interactions, but also 1-5 interactions. This command will trigger a per-atom list of 1-5 neighbors to be generated. The AMOEBA and HIPPO force fields define their own custom weighting factors for all the 1-2, 1-3, 1-4, 1-5 terms which in the Tinker PRM and KEY files; they can be different for different terms in the force field.  

In addition to the list above, these command doc pages have additional details:  

• atom_style amoeba • fix property/atom • special_bonds  

Tinker PRM and KEY files  

A Tinker PRM file is composed of sections, each of which has multiple lines. This is the list of PRM sections LAMMPS knows how to parse and use. Any other sections are skipped:  

• Angle Bending Parameters • Atom Type Definitions  

# 8.4. Force fields howto  

• Atomic Multipole Parameters • Bond Stretching Parameters • Charge Penetration Parameters • Charge Transfer Parameters • Dipole Polarizability Parameters • Dispersion Parameters • Force Field Definition • Literature References • Out-of-Plane Bend Parameters • Pauli Repulsion Parameters • Pi-Torsion Parameters • Stretch-Bend Parameters • Torsion-Torsion Parameters • Torsional Parameters • Urey-Bradley Parameters • Van der Waals Pair Parameters • Van der Waals Parameters  

A Tinker KEY file is composed of lines, each of which has a keyword followed by zero or more parameters. This is the list of keywords LAMMPS knows how to parse and use in the same manner Tinker does. Any other keywords are skipped. The value in parenthesis is the default value for the keyword if it is not specified, or if the keyfile in the pair_coeff command is specified as NULL:  

• a-axis (0.0)   
• b-axis (0.0)   
• c-axis (0.0)   
• ctrn-cutoff (6.0)   
• ctrn-taper ( $0.9\mathrm{~}^{*}$ ctrn-cutoff)   
• cutoff   
• delta-halgren (0.07)   
• dewald (no long-range dispersion unless specified)   
• dewald-alpha (0.4)   
• dewald-cutoff (7.0)   
• dispersion-cutoff (9.0)   
• dispersion-taper $^{9.0^{*}}$ dispersion-cutoff)   
• dpme-grid   
• dpme-order (4)   
• ewald (no long-range electrostatics unless specified)   
ewald-alpha (0.4)   
• ewald-cutoff (7.0)   
• gamma-halgren (0.12)   
• mpole-cutoff (9.0)   
• mpole-taper (0.65 \* mpole-cutoff)   
• pcg-guess (enabled by default)   
• pcg-noguess (disable pcg-guess if specified)   
• pcg-noprecond (disable pcg-precond if specified)   
• pcg-peek (1.0)   
• pcg-precond (enabled by default)   
• pewald-alpha (0.4)   
• pme-grid   
• pme-order (5)   
• polar-eps (1.0e-6)   
• polar-iter (100)   
• polar-predict (no prediction operation unless specified)   
• ppme-order (5)   
• repulsion-cutoff (6.0)   
• repulsion-taper ( $0.9\mathrm{~^{*}~}$ repulsion-cutoff)   
• taper   
• usolve-cutoff (4.5)   
• usolve-diag (2.0)   
• vdw-cutoff (9.0)   
• vdw-taper (0.9 \* vdw-cutoff)  

Tinker2lmp.py tool  

This conversion tool is found in the tools/tinker directory. As shown in examples/amoeba/README, these commands produce the data files found in examples/amoeba, and also illustrate all the options available to use with the tinker2lmp.py script:  

python tinker2lmp.py -xyz water_dimer.xyz -amoeba amoeba_water.prm -data data.water_dimer. $\hookrightarrow$ amoeba # AMOEBA non-periodic system   
python tinker2lmp.py -xyz water_dimer.xyz -hippo hippo_water.prm -data data.water_dimer.hippo ,→ # HIPPO non-periodic system   
python tinker2lmp.py -xyz water_box.xyz -amoeba amoeba_water.prm -data data.water_box.amoeba - $\hookrightarrow$ pbc 18.643 18.643 18.643 # AMOEBA periodic system   
python tinker2lmp.py -xyz water_box.xyz -hippo hippo_water.prm -data data.water_box.hippo -pbc 18. ,→643 18.643 18.643 # HIPPO periodic system   
python tinker2lmp.py -xyz ubiquitin.xyz -amoeba amoeba_ubiquitin.prm -data data.ubiquitin.new -pbc␣ ,→54.99 41.91 41.91 -bitorsion bitorsion.ubiquitin.data.new # system with bitorsions  

Switches and their arguments may be specified in any order.  

The -xyz switch is required and specifies an input XYZ file as an argument. The format of this file is an extended XYZ format defined and used by Tinker for its input. Example \*.xyz files are in the examples/amoeba directory. The file lists the atoms in the system. Each atom has the following information: Tinker species name (ignored by LAMMPS), xyz coordinates, Tinker numeric type, and a list of atom IDs the atom is bonded to.  

Here is more information about the extended XYZ format defined and used by Tinker, and links to programs that convert standard PDB files to the extended XYZ format:  

• https://openbabel.org/docs/current/FileFormats/Tinker_XYZ_format.html • https://github.com/emleddin/pdbxyz-xyzpdb • https://github.com/TinkerTools/tinker/blob/release/source/pdbxyz.f  

The -amoeba or -hippo switch is required. It specifies an input AMOEBA or HIPPO PRM force field file as an argument.   
This should be the same file used by the pair_style command in the input script.  

The -data switch is required. It specifies an output file name for the LAMMPS data file that will be produced.  

For periodic systems, the -pbc switch is required. It specifies the periodic box size for each dimension (x,y,z). For a Tinker simulation these are specified in the KEY file.  

The -bitorsion switch is only needed if the system contains Tinker bitorsion interactions. The data for each type of bitorsion interaction will be written to the specified file, and read by the fix amoeba/bitorsion command. The data includes 2d arrays of values to which splines are fit, and thus is not compatible with the LAMMPS data file format.  

(Ponder) Ponder, Wu, Ren, Pande, Chodera, Schnieders, Haque, Mobley, Lambrecht, DiStasio Jr, M. Head-Gordon, Clark, Johnson, T. Head-Gordon, J Phys Chem B, 114, 2549-2564 (2010).   
(Rackers) Rackers, Silva, Wang, Ponder, J Chem Theory Comput, 17, 7056-7084 (2021).   
(Ren) Ren and Ponder, J Phys Chem B, 107, 5933 (2003).   
(Shi) Shi, Xia, Zhang, Best, Wu, Ponder, Ren, J Chem Theory Comp, 9, 4046, 2013.  

# 8.4.3 TIP3P water model  

The TIP3P water model as implemented in CHARMM (MacKerell) specifies a 3-site rigid water molecule with charges and Lennard-Jones parameters assigned to each of the three atoms.  

A suitable pair style with cutoff Coulomb would be:  

• pair_style lj/cut/coul/cut or these commands for a long-range Coulomb model:  

• pair_style lj/cut/coul/long pair_style lj/cut/coul/long/soft • kspace_style pppm • kspace_style pppm/disp  

In LAMMPS the fix shake or fix rattle command can be used to hold the two O-H bonds and the H-O-H angle rigid. A bond style of harmonic and an angle style of harmonic or charmm should also be used. In case of rigid bonds also bond style zero and angle style zero can be used.  

The table below lists the force field parameters (in real units) to for the water molecule atoms to run a rigid or flexible TIP3P-CHARMM model with a cutoff, the original 1983 TIP3P model (Jorgensen), or a TIP3P model with parameters optimized for a long-range Coulomb solver (e.g. Ewald or PPPM in LAMMPS) (Price). The K values can be used if a flexible TIP3P model (without fix shake) is desired, for rigid bonds/angles they are ignored.  

<html><body><table><tr><td>Parameter</td><td>TIP3P-CHARMM</td><td>TIP3P (original)</td><td>TIP3P (Ewald)</td></tr><tr><td>O mass (amu)</td><td>15.9994</td><td>15.9994</td><td>15.9994</td></tr><tr><td>H mass (amu)</td><td>1.008</td><td>1.008</td><td>1.008</td></tr><tr><td>O charge (e)</td><td>-0.834</td><td>-0.834</td><td>-0.834</td></tr><tr><td>H charge (e)</td><td>0.417</td><td>0.417</td><td>0.417</td></tr><tr><td>LJ ε of OO (kcal/mole)</td><td>0.1521</td><td>0.1521</td><td>0.1020</td></tr><tr><td>LJ o of OO (A)</td><td>3.1507</td><td>3.1507</td><td>3.188</td></tr><tr><td>LJ ε of HH (kcal/mole)</td><td>0.0460</td><td>0.0</td><td>0.0</td></tr><tr><td>LJ o of HH (A)</td><td>0.4</td><td>1.0</td><td>1.0</td></tr><tr><td>LJ ε of OH (kcal/mole)</td><td>0.0836</td><td>0.0</td><td>0.0</td></tr><tr><td>LJ o of OH (A)</td><td>1.7753</td><td>1.0</td><td>1.0</td></tr><tr><td>K of OH bond (kcal/mole/A2)</td><td>450</td><td>450</td><td>450</td></tr><tr><td>ro of OH bond (A)</td><td>0.9572</td><td>0.9572</td><td>0.9572</td></tr><tr><td>K of HOH angle (kcal/mole)</td><td>55.0</td><td>55.0</td><td>55.0</td></tr><tr><td>0o of HOH angle</td><td>104.52°</td><td>104.52°</td><td>104.52°</td></tr></table></body></html>  

Below is the code for a LAMMPS input file and a molecule file (tip3p.mol) of TIP3P water for use with the molecule command demonstrating how to set up a small bulk water system for TIP3P with rigid bonds.  

units real   
atom_style full   
region box block -5 5 -5 5 -5 5   
create_box 2 box bond/types 1 angle/types 1 & extra/bond/per/atom 2 extra/angle/per/atom 1 extra/special/per/atom 2   
mass 1 15.9994   
mass 2 1.008   
pair_style lj/cut/coul/cut 8.0   
pair_coeff 1 1 0.1521 3.1507   
pair_coeff 2 2 0.0 1.0   
bond_style zero   
bond_coeff 1 0.9574   
angle_style zero   
angle_coeff 1 104.52   
molecule water tip3p.mol   
create_atoms 0 random 33 34564 NULL mol water 25367 overlap 1.33   
fix rigid all shake 0.001 10 10000 b 1 a 1   
minimize 0.0 0.0 1000 10000   
reset_timestep 0   
timestep 1.0   
velocity all create 300.0 5463576   
fix integrate all nvt temp 300 300 100.0  

(continues on next page)  

(continued from previous page)  

thermo_style custom step temp press etotal pe  

<html><body><table><tr><td>thermo 1000 run 20000 write_data tip3p.data nocoeff</td></tr><tr><td># Water molecule. TIP3P geometry</td></tr><tr><td></td></tr><tr><td>3 atoms 2 bonds</td></tr><tr><td>1 angles</td></tr><tr><td>Coords</td></tr><tr><td></td></tr><tr><td>1 0.00000-0.065560.00000 2 0.75695 0.52032 0.00000</td></tr><tr><td>3 -0.75695 0.52032 0.00000</td></tr><tr><td>Types</td></tr><tr><td>1</td></tr><tr><td>1 #0 2 2 #H</td></tr><tr><td>3 2 #H</td></tr><tr><td>Charges</td></tr><tr><td></td></tr><tr><td>1 -0.834 2 0.417</td></tr><tr><td>3 0.417</td></tr><tr><td>Bonds</td></tr><tr><td>1 1 1 2</td></tr><tr><td>2 1 1 3</td></tr><tr><td>Angles</td></tr><tr><td>1 2 1 3</td></tr><tr><td>Shake Flags</td></tr><tr><td>11</td></tr><tr><td>21 31</td></tr><tr><td></td></tr><tr><td>Shake Atoms</td></tr><tr><td>1123</td></tr><tr><td>2123</td></tr><tr><td>3123</td></tr><tr><td></td></tr><tr><td>Shake Bond Types</td></tr></table></body></html>  

(continues on next page)  

(continued from previous page)  

<html><body><table><tr><td></td></tr><tr><td></td></tr><tr><td>11 1 1</td></tr><tr><td>2111</td></tr><tr><td>3111</td></tr><tr><td>Special Bond Counts</td></tr><tr><td></td></tr><tr><td>1200</td></tr><tr><td>2110</td></tr><tr><td>3110</td></tr><tr><td>Special Bonds</td></tr><tr><td></td></tr><tr><td>123 213</td></tr><tr><td>312</td></tr></table></body></html>  

Wikipedia also has a nice article on water models.  

(MacKerell) MacKerell, Bashford, Bellott, Dunbrack, Evanseck, Field, Fischer, Gao, Guo, Ha, et al, J Phys Chem, 102, 3586 (1998).  

(Jorgensen) Jorgensen, Chandrasekhar, Madura, Impey, Klein, J Chem Phys, 79, 926 (1983).  

(Price) Price and Brooks, J Chem Phys, 121, 10096 (2004).  

# 8.4.4 TIP4P water model  

The four-point TIP4P rigid water model extends the traditional three-point TIP3P model by adding an additional site M, usually massless, where the charge associated with the oxygen atom is placed. This site M is located at a fixed distance away from the oxygen along the bisector of the HOH bond angle. A bond style of harmonic and an angle style of harmonic or charmm should also be used. In case of rigid bonds also bond style zero and angle style zero can be used.  

There are two ways to implement TIP4P water in LAMMPS:  

1. Use a specially written pair style that uses the TIP3P geometry without the point M. The point M location is then implicitly derived from the other atoms or each water molecule and used during the force computation. The forces on M are then projected on the oxygen and the two hydrogen atoms. This is computationally very efficient, but the charge distribution in space is only correct within the tip4p labeled styles. So all other computations using charges will “see” the negative charge incorrectly on the oxygen atom.  

This can be done with the following pair styles for Coulomb with a cutoff:  

• pair_style tip4p/cut pair_style lj/cut/tip4p/cut  

or these commands for a long-range Coulomb treatment:  

• pair_style tip4p/long • pair_style lj/cut/tip4p/long pair_style lj/long/tip4p/long • pair_style tip4p/long/soft  

• pair_style lj/cut/tip4p/long/soft • kspace_style pppm/tip4p • kspace_style pppm/disp/tip4p  

The bond lengths and bond angles should be held fixed using the fix shake or fix rattle command, unless a parameterization for a flexible TIP4P model is used. The parameter sets listed below are all for rigid TIP4P model variants and thus the bond and angle force constants are not used and can be set to any legal value; only equilibrium length and angle are used.  

2. Use an explicit 4 point TIP4P geometry where the oxygen atom carries no charge and the M point no LennardJones interactions. Since fix shake or fix rattle may not be applied to this kind of geometry, fix rigid or fix rigid/small or its thermostatted variants are required to maintain a rigid geometry. This avoids some of the issues with respect to analysis and non-tip4p styles, but it is a more costly force computation (more atoms in the same volume and thus more neighbors in the neighbor lists) and requires a much shorter timestep for stable integration of the rigid body motion. Since no bonds or angles are required, they do not need to be defined and atom style charge would be sufficient for a bulk TIP4P water system. In order to avoid that LAMMPS produces an error due to the massless M site a tiny non-zero mass needs to be assigned.  

The table below lists the force field parameters (in real units) to for a selection of popular variants of the TIP4P model. There is the rigid TIP4P model with a cutoff (Jorgensen), the TIP4/Ice model (Abascal1), the TIP4P/2005 model (Abascal2) and a version of TIP4P parameters adjusted for use with a long-range Coulombic solver (e.g. Ewald or PPPM in LAMMPS). Note that for implicit TIP4P models the OM distance is specified in the pair_style command, not as part of the pair coefficients.  

<html><body><table><tr><td>Parameter</td><td>TIP4P (original)</td><td>TIP4P/lce</td><td>TIP4P/2005</td><td>TIP4P (Ewald)</td></tr><tr><td>0 mass (amu)</td><td>15.9994</td><td>15.9994</td><td>15.9994</td><td>15.9994</td></tr><tr><td>H mass (amu)</td><td>1.008</td><td>1.008</td><td>1.008</td><td>1.008</td></tr><tr><td>O or M charge (e)</td><td>-1.040</td><td>-1.1794</td><td>-1.1128</td><td>-1.04844</td></tr><tr><td>H charge (e)</td><td>0.520</td><td>0.5897</td><td>0.5564</td><td>0.52422</td></tr><tr><td>LJ ε of OO (kcal/mole)</td><td>0.1550</td><td>0.21084</td><td>0.1852</td><td>0.16275</td></tr><tr><td>LJ o of OO (A)</td><td>3.1536</td><td>3.1668</td><td>3.1589</td><td>3.16435</td></tr><tr><td>LJ ε of HH, MM, OH, OM, HM (kcal/mole)</td><td>0.0</td><td>0.0</td><td>0.0</td><td>0.0</td></tr><tr><td>LJ o of HH, MM, OH, OM, HM (A)</td><td>1.0</td><td>1.0</td><td>1.0</td><td>1.0</td></tr><tr><td>ro of OH bond (A)</td><td>0.9572</td><td>0.9572</td><td>0.9572</td><td>0.9572</td></tr><tr><td>0o of HOH angle</td><td>104.52°</td><td>104.52°</td><td>104.52°</td><td>104.52°</td></tr><tr><td>OM distance (A)</td><td>0.15</td><td>0.1577</td><td>0.1546</td><td>0.1250</td></tr></table></body></html>  

Note that the when using the TIP4P pair style, the neighbor list cutoff for Coulomb interactions is effectively extended by a distance $^{2^{*}}$ (OM distance), to account for the offset distance of the fictitious charges on $\mathrm{o}$ atoms in water molecules. Thus it is typically best in an efficiency sense to use a LJ cutoff $>=$ Coulomb cutoff $+~2^{*}$ (OM distance), to shrink the size of the neighbor list. This leads to slightly larger cost for the long-range calculation, so you can test the trade-off for your model. The OM distance and the LJ and Coulombic cutoffs are set in the pair_style lj/cut/tip4p/long command.  

Below is the code for a LAMMPS input file using the implicit method and the TIP3P molecule file. Because the TIP4P charges are different from TIP3P they need to be reset (or the molecule file changed):  

units real   
atom_style full   
region box block -5 5 -5 5 -5 5   
create_box 2 box bond/types 1 angle/types 1 & extra/bond/per/atom 2 extra/angle/per/atom 1 extra/special/per/atom 2  

(continues on next page)  

(continued from previous page)  

mass 1 15.9994   
mass 2 1.008   
pair_style lj/cut/tip4p/cut 1 2 1 1 0.15 8.0   
pair_coeff 1 1 0.1550 3.1536   
pair_coeff 2 2 0.0 1.0   
bond_style zero   
bond_coeff 1 0.9574   
angle_style zero   
angle_coeff 1 104.52   
molecule water tip3p.mol # this uses the TIP3P geometry   
create_atoms 0 random 33 34564 NULL mol water 25367 overlap 1.33   
# must change charges for TIP4P   
set type 1 charge -1.040   
set type 2 charge 0.520   
fix rigid all shake 0.001 10 10000 b 1 a 1   
minimize 0.0 0.0 1000 10000   
reset_timestep 0   
timestep 1.0   
velocity all create 300.0 5463576   
fix integrate all nvt temp 300 300 100.0   
thermo_style custom step temp press etotal pe   
thermo 1000   
run 20000   
write_data tip4p-implicit.data nocoeff  

Below is the code for a LAMMPS input file using the explicit method and a TIP4P molecule file. Because of using $f\alpha$ rigid/small no bonds need to be defined and thus no extra storage needs to be reserved for them, but we need to either switch to atom style full or use fix property/atom mol so that fix rigid/small can identify rigid bodies by their molecule ID. Also a neigh_modify exclude command is added to exclude computing intramolecular non-bonded interactions, since those are removed by the rigid fix anyway:  

<html><body><table><tr><td>units real</td><td></td><td></td><td></td></tr><tr><td>atom _style charge</td><td></td><td></td><td></td></tr><tr><td>atom </td><td>_modify map array</td><td></td><td></td></tr><tr><td></td><td>region box block -5 5 -5 5 -5 5</td><td></td><td></td></tr><tr><td>create box 3 box</td><td></td><td></td><td></td></tr><tr><td>mass 1 15.9994</td><td></td><td></td><td></td></tr><tr><td>mass 2 1.008</td><td></td><td></td><td></td></tr><tr><td>mass 3 1.0e-100</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>pair</td><td>r_style lj/cut/coul/cut 8.0</td><td></td><td></td></tr><tr><td>pair_coeff 1 1 0.1550 3.1536</td><td></td><td></td><td></td></tr><tr><td>pair_coeff 2 2 0.0</td><td>1.0</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td>(continues onnextpage)</td></tr></table></body></html>  

<html><body><table><tr><td>(continuedfrompreviouspage) pair _coeff 3 3 0.0 1.0</td></tr><tr><td></td></tr><tr><td>fix mol all property/atom mol ghost yes</td></tr><tr><td>molecule water tip4p.mol</td></tr><tr><td>create_atoms 0 random 33 34564 NULL mol water 25367 overlap 1.33</td></tr><tr><td>neigh _modify exclude molecule/intra all</td></tr><tr><td></td></tr><tr><td>timestep 0.5 fix integrate all rigid/small molecule langevin 300.0 300.0 100.0 2345634</td></tr><tr><td></td></tr><tr><td>thermo_style custom step temp press etotal density pe ke</td></tr><tr><td></td></tr><tr><td>thermo 2000</td></tr></table></body></html>  

<html><body><table><tr><td colspan="2"># Water molecule. Explicit TIP4P geometry for use with fix rigid</td></tr><tr><td colspan="2">4 atoms</td></tr><tr><td colspan="2">Coords</td></tr><tr><td>1 0.00000-0.06556</td><td>0.00000</td></tr><tr><td>2 0.75695</td><td>0.52032 0.00000</td></tr><tr><td>3 -0.75695</td><td>0.52032 0.00000</td></tr><tr><td>4 0.00000</td><td>0.08444 0.00000</td></tr><tr><td colspan="2">Types</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2">1 1 #0</td></tr><tr><td colspan="2">2 2 # H</td></tr><tr><td colspan="2">3 2 #H 4 3 #M</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2">Charges</td></tr><tr><td colspan="2">1 0.000</td></tr><tr><td colspan="2">2 0.520</td></tr><tr><td colspan="2">3 0.520</td></tr><tr><td colspan="2">4 -1.040</td></tr></table></body></html>  

Wikipedia also has a nice article on water models.  

# 8.4.5 TIP5P water model  

The five-point TIP5P rigid water model extends the three-point TIP3P model by adding two additional sites L, usually massless, where the charge associated with the oxygen atom is placed. These sites L are located at a fixed distance away from the oxygen atom, forming a tetrahedral angle that is rotated by 90 degrees from the HOH plane. Those sites thus somewhat approximate lone pairs of the oxygen and consequently improve the water structure to become even more “tetrahedral” in comparison to the four-point TIP4P model.  

A suitable pair style with cutoff Coulomb would be:  

• pair_style lj/cut/coul/cut or these commands for a long-range model:  

• pair_style lj/cut/coul/long • pair_style lj/cut/coul/long/soft • kspace_style pppm • kspace_style pppm/disp  

A TIP5P model must be run using a rigid fix since there is no other option to keep this kind of structure rigid in LAMMPS. In order to avoid that LAMMPS produces an error due to the massless L sites, those need to be assigned a tiny non-zero mass.  

The table below lists the force field parameters (in real units) to for a the TIP5P model with a cutoff (Mahoney) and the TIP5P-E model (Rick) for use with a long-range Coulombic solver (e.g. Ewald or PPPM in LAMMPS).   


<html><body><table><tr><td>Parameter</td><td>TIP5P</td><td>TIP5P-E</td></tr><tr><td>O mass (amu)</td><td>15.9994</td><td>15.9994</td></tr><tr><td>H mass (amu)</td><td>1.008</td><td>1.008</td></tr><tr><td>O charge (e)</td><td>0.0</td><td>0.0</td></tr><tr><td>L charge (e)</td><td>-0.241</td><td>-0.241</td></tr><tr><td>H charge (e)</td><td>0.241</td><td>0.241</td></tr><tr><td>LJ ε of OO (kcal/mole)</td><td>0.1600</td><td>0.1780</td></tr><tr><td>LJ o of OO (A)</td><td>3.1200</td><td>3.0970</td></tr><tr><td>LJ ε of HH, LL, OH, OL, HL (kcal/mole)</td><td>0.0</td><td>0.0</td></tr><tr><td>LJ o of HH, LL, OH, OL, HL (A)</td><td>1.0</td><td>1.0</td></tr><tr><td>ro of OH bond (A)</td><td>0.9572</td><td>0.9572</td></tr><tr><td>Oo of HOH angle</td><td>104.52°</td><td>104.52°</td></tr><tr><td>OL distance (A)</td><td>0.70</td><td>0.70</td></tr><tr><td>0o of LOL angle</td><td>109.470</td><td>109.470</td></tr></table></body></html>  

Below is the code for a LAMMPS input file for setting up a simulation of TIP5P water with a molecule file. Because of using fix rigid/small no bonds need to be defined and thus no extra storage needs to be reserved for them, but we need to either switch to atom style full or use fix property/atom mol so that fix rigid/small can identify rigid bodies by their molecule ID. Also a neigh_modify exclude command is added to exclude computing intramolecular non-bonded interactions, since those are removed by the rigid fix anyway:  

units real   
atom_style charge   
atom_modify map array   
region box block -5 5 -5 5 -5 5   
create_box 3 box  

(continues on next page)  

(continued from previous page)  

<html><body><table><tr><td>mass 2 1.008 mass 3 1.0e-100</td><td></td><td></td></tr><tr><td>pair_style lj/cut /coul/cut 8.0</td><td></td><td></td></tr><tr><td>pair_coeff 1 1 0.160 3.12</td><td></td><td></td></tr><tr><td>pair _coeff 2 2 0.0</td><td></td><td></td></tr><tr><td>pair _coeff 3 3 0.0</td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td>fix mol all property /atom mol</td><td></td><td></td></tr><tr><td>molecule water tip5p.mol</td><td></td><td></td></tr><tr><td>neigh _modify exclude molecule/intra all</td><td>create _atoms 0 random 33 34564 NULL mol water 25367 overlap 1.33</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td>timestep 0.5</td><td></td><td></td></tr><tr><td>reset_timestep 0</td><td>fix integrate all rigid/small molecule langevin 300.0 300.0 50.0 235664</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td>thermo_style custom step temp press etotal density pe ke</td><td></td></tr><tr><td>thermo 1000</td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td>run 20000</td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td>write_data tip5p.data nocoeff</td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table></body></html>  

<html><body><table><tr><td># Water molecule. Explicit TIP5P geometry for use with fix rigid</td></tr><tr><td>5 atoms</td></tr><tr><td>Coords</td></tr><tr><td></td></tr><tr><td>1 0.00000 -0.06556 0.00000 2 0.75695 0.52032 0.00000</td></tr><tr><td>3 -0.75695 0.52032 0.00000</td></tr><tr><td>4 0.00000 -0.46971 0.57154</td></tr><tr><td>5 0.00000 -0.46971 -0.57154</td></tr><tr><td>Types</td></tr><tr><td></td></tr><tr><td>1 1 #0 2 2 # H</td></tr><tr><td>3 2 # H</td></tr><tr><td>4 3 # L</td></tr><tr><td>5 3 #L</td></tr><tr><td>Charges</td></tr><tr><td></td></tr><tr><td>1 0.000</td></tr><tr><td>2 0.241 3 0.241</td></tr><tr><td>4 -0.241</td></tr><tr><td>5 -0.241</td></tr></table></body></html>  

Wikipedia also has a nice article on water models.  

(Mahoney) Mahoney, Jorgensen, J Chem Phys 112, 8910 (2000) (Rick) Rick, J Chem Phys 120, 6085 (2004)  

# 8.4.6 SPC water model  

The SPC water model specifies a 3-site rigid water molecule with charges and Lennard-Jones parameters assigned to each of the three atoms. In LAMMPS the fix shake command can be used to hold the two O-H bonds and the H-O-H angle rigid. A bond style of harmonic and an angle style of harmonic or charmm should also be used.  

These are the additional parameters (in real units) to set for $\mathrm{o}$ and H atoms and the water molecule to run a rigid SPC model.  

O mass $=15.9994$   
H mass $=1.008$   
O charge $=-0.820$   
H charge $=0.410$   
LJ $\varepsilon$ of $\mathrm{OO}=0.1553$   
LJ $\sigma$ of $\mathrm{OO}=3.166$   
LJ $\varepsilon$ , $\sigma$ of OH, $\mathrm{HH}=0.0$   
$r_{0}$ of OH bond $=1.0$   
$\theta_{0}$ of HOH angle $=109.47^{\circ}$  

Note that as originally proposed, the SPC model was run with a 9 Angstrom cutoff for both LJ and Coulomb terms. It can also be used with long-range electrostatic solvers (e.g. Ewald or PPPM in LAMMPS) without changing any of the parameters above, although it becomes a different model in that mode of usage.  

The SPC/E (extended) water model is the same, except the partial charge assignments change:  

O charge $=-0.8476$ H charge $=0.4238$  

See the (Berendsen2) reference for more details on both the SPC and SPC/E models.  

Below is the code for a LAMMPS input file and a molecule file (spce.mol) of SPC/E water for use with the molecule command demonstrating how to set up a small bulk water system for SPC/E with rigid bonds.  

units real   
atom_style full   
region box block -5 5 -5 5 -5 5   
create_box 2 box bond/types 1 angle/types 1 & extra/bond/per/atom 2 extra/angle/per/atom 1 extra/special/per/atom 2  

mass 1 15.9994   
mass 2 1.008   
pair_style lj/cut/coul/cut 10.0   
pair_coeff 1 1 0.1553 3.166   
pair_coeff 1 2 0.0 1.0   
pair_coeff 2 2 0.0 1.0  

(continues on next page)  

# 8.4. Force fields howto  

(continued from previous page)  

bond_style zero bond_coeff 1 1.0 angle_style zero angle_coeff 1 109.47  

molecule water spce.mol create_atoms 0 random 33 34564 NULL mol water 25367 overlap 1.33  

timestep 1.0   
fix rigid all shake 0.0001 10 10000 b 1 a 1   
minimize 0.0 0.0 1000 10000   
velocity all create 300.0 5463576   
fix integrate all nvt temp 300.0 300.0 100.0  

thermo_style custom step temp press etotal density pe ke   
thermo 1000   
run 20000 upto   
write_data spce.data nocoeff  

<html><body><table><tr><td colspan="2"># Water molecule. SPC/E geometry</td></tr><tr><td>3 atoms 2 bonds</td><td></td></tr><tr><td></td><td></td></tr><tr><td>1 angles</td><td></td></tr><tr><td colspan="2">Coords</td></tr><tr><td>1</td><td>0.00000 -0.06461</td><td>0.00000</td></tr><tr><td>2 0.81649</td><td>0.51275</td><td>0.00000</td></tr><tr><td>3 -0.81649</td><td>0.51275</td><td>50.00000</td></tr><tr><td colspan="2">Types</td></tr><tr><td></td><td>1 #0</td></tr><tr><td>2</td><td>#H</td></tr><tr><td>2</td><td>#H</td></tr><tr><td colspan="2">Charges</td></tr><tr><td>1 -0.8476</td><td></td></tr><tr><td>2 3</td><td>0.4238</td></tr><tr><td>0.4238</td><td></td></tr><tr><td colspan="2">Bonds</td></tr><tr><td>1 1</td><td>1 2</td></tr><tr><td>2 1</td><td>3</td></tr><tr><td>Angles</td><td></td></tr></table></body></html>  

(continues on next page)  

(continued from previous page)  

<html><body><table><tr><td>2 3</td><td></td><td>1</td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td>Shake Flags</td><td></td><td></td></tr><tr><td>11</td><td></td><td></td><td></td></tr><tr><td></td><td>21</td><td></td><td></td></tr><tr><td></td><td>31</td><td></td><td></td></tr><tr><td></td><td>Shake Atoms</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>1123</td><td>2123</td><td></td><td></td></tr><tr><td></td><td>3123</td><td></td><td></td></tr><tr><td>Shake Bond Types</td><td></td><td></td><td></td></tr><tr><td></td><td>1111</td><td></td><td></td></tr><tr><td>2111</td><td></td><td></td><td></td></tr><tr><td>3111</td><td></td><td></td><td></td></tr><tr><td>Special Bond Counts</td><td></td><td></td><td></td></tr><tr><td></td><td>1200</td><td></td><td></td></tr><tr><td>2110</td><td></td><td></td><td></td></tr><tr><td>3110</td><td></td><td></td><td></td></tr><tr><td></td><td>Special Bonds</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>123</td><td></td><td></td><td></td></tr><tr><td>213</td><td></td><td></td><td></td></tr><tr><td>312</td><td></td><td></td><td></td></tr></table></body></html>  

Wikipedia also has a nice article on water models.  

(Berendsen2) Berendsen, Grigera, Straatsma, J Phys Chem, 91, 6269-6271 (1987).  

# 8.5 Packages howto  

# 8.5.1 Finite-size spherical and aspherical particles  

Typical MD models treat atoms or particles as point masses. Sometimes it is desirable to have a model with finite-size particles such as spheroids or ellipsoids or generalized aspherical bodies. The difference is that such particles have a moment of inertia, rotational energy, and angular momentum. Rotation is induced by torque coming from interactions with other particles.  

LAMMPS has several options for running simulations with these kinds of particles. The following aspects are discussed in turn:  

• atom styles • pair potentials • time integration  

# 8.5. Packages howto  

• computes, thermodynamics, and dump output rigid bodies composed of finite-size particles  

Example input scripts for these kinds of models are in the body, colloid, dipole, ellipse, line, peri, pour, and tri directories of the examples directory in the LAMMPS distribution.  

# Atom styles  

There are several atom styles that allow for definition of finite-size particles: sphere, dipole, ellipsoid, line, tri, peri, and body.  

The sphere style defines particles that are spheroids and each particle can have a unique diameter and mass (or density). These particles store an angular velocity (omega) and can be acted upon by torque. The “set” command can be used to modify the diameter and mass of individual particles, after then are created.  

The dipole style does not actually define finite-size particles, but is often used in conjunction with spherical particles, via a command like  

atom_style hybrid sphere dipole  

This is because when dipoles interact with each other, they induce torques, and a particle must be finite-size (i.e. have a moment of inertia) in order to respond and rotate. See the atom_style dipole command for details. The “set” command can be used to modify the orientation and length of the dipole moment of individual particles, after then are created.  

The ellipsoid style defines particles that are ellipsoids and thus can be aspherical. Each particle has a shape, specified by 3 diameters, and mass (or density). These particles store an angular momentum and their orientation (quaternion), and can be acted upon by torque. They do not store an angular velocity (omega), which can be in a different direction than angular momentum, rather they compute it as needed. The “set” command can be used to modify the diameter, orientation, and mass of individual particles, after then are created. It also has a brief explanation of what quaternions are.  

The line style defines line segment particles with two end points and a mass (or density). They can be used in 2d simulations, and they can be joined together to form rigid bodies which represent arbitrary polygons.  

The tri style defines triangular particles with three corner points and a mass (or density). They can be used in 3d simulations, and they can be joined together to form rigid bodies which represent arbitrary particles with a triangulated surface.  

The peri style is used with Peridynamic models and defines particles as having a volume, that is used internally in the pair_style peri potentials.  

The body style allows for definition of particles which can represent complex entities, such as surface meshes of discrete points, collections of sub-particles, deformable objects, etc. The body style is discussed in more detail on the Howto body doc page.  

Note that if one of these atom styles is used (or multiple styles via the atom_style hybrid command), not all particles in the system are required to be finite-size or aspherical.  

For example, in the ellipsoid style, if the 3 shape parameters are set to the same value, the particle will be a sphere rather than an ellipsoid. If the 3 shape parameters are all set to 0.0 or if the diameter is set to 0.0, it will be a point particle. In the line or tri style, if the lineflag or triflag is specified as 0, then it will be a point particle.  

Some of the pair styles used to compute pairwise interactions between finite-size particles also compute the correct interaction with point particles as well, e.g. the interaction between a point particle and a finite-size particle or between two point particles. If necessary, pair_style hybrid can be used to ensure the correct interactions are computed for the appropriate style of interactions. Likewise, using groups to partition particles (ellipsoids versus spheres versus point particles) will allow you to use the appropriate time integrators and temperature computations for each class of particles. See the doc pages for various commands for details.  

Also note that for 2d simulations, atom styles sphere and ellipsoid still use 3d particles, rather than as circular disks or ellipses. This means they have the same moment of inertia as the 3d object. When temperature is computed, the correct degrees of freedom are used for rotation in a 2d versus 3d system.  

# Pair potentials  

When a system with finite-size particles is defined, the particles will only rotate and experience torque if the force field computes such interactions. These are the various pair styles that generate torque:  

• pair_style gran/history pair_style gran/hertz pair_style gran/no_history • pair_style dipole/cut • pair_style gayberne • pair_style resquared • pair_style brownian pair_style lubricate pair_style line/lj • pair_style tri/lj • pair_style body/nparticle  

The granular pair styles are used with spherical particles. The dipole pair style is used with the dipole atom style, which could be applied to spherical or ellipsoidal particles. The GayBerne and REsquared potentials require ellipsoidal particles, though they will also work if the 3 shape parameters are the same (a sphere). The Brownian and lubrication potentials are used with spherical particles. The line, tri, and body potentials are used with line segment, triangular, and body particles respectively.  

# Time integration  

There are several fixes that perform time integration on finite-size spherical particles, meaning the integrators update the rotational orientation and angular velocity or angular momentum of the particles:  

• fix nve/sphere • fix nvt/sphere • fix npt/sphere  

Likewise, there are 3 fixes that perform time integration on ellipsoidal particles:  

• fix nve/asphere • fix nvt/asphere • fix npt/asphere  

The advantage of these fixes is that those which thermostat the particles include the rotational degrees of freedom in the temperature calculation and thermostatting. The fix langevin command can also be used with its omgea or angmom options to thermostat the rotational degrees of freedom for spherical or ellipsoidal particles. Other thermostatting fixes only operate on the translational kinetic energy of finite-size particles.  

These fixes perform constant NVE time integration on line segment, triangular, and body particles:  

• fix nve/line • fix nve/tri  

# 8.5. Packages howto  

# • fix nve/body  

Note that for mixtures of point and finite-size particles, these integration fixes can only be used with groups which contain finite-size particles.  

# Computes, thermodynamics, and dump output  

There are several computes that calculate the temperature or rotational energy of spherical or ellipsoidal particles:  

• compute temp/sphere compute temp/asphere • compute erotate/sphere • compute erotate/asphere  

These include rotational degrees of freedom in their computation. If you wish the thermodynamic output of temperature or pressure to use one of these computes (e.g. for a system entirely composed of finite-size particles), then the compute can be defined and the thermo_modify command used. Note that by default thermodynamic quantities will be calculated with a temperature that only includes translational degrees of freedom. See the thermo_style command for details.  

These commands can be used to output various attributes of finite-size particles:  

• dump custom   
compute property/atom   
• dump local   
• compute body/local  

Attributes include the dipole moment, the angular velocity, the angular momentum, the quaternion, the torque, the end-point and corner-point coordinates (for line and tri particles), and sub-particle attributes of body particles.  

# Rigid bodies composed of finite-size particles  

The fix rigid command treats a collection of particles as a rigid body, computes its inertia tensor, sums the total force and torque on the rigid body each timestep due to forces on its constituent particles, and integrates the motion of the rigid body.  

If any of the constituent particles of a rigid body are finite-size particles (spheres or ellipsoids or line segments or triangles), then their contribution to the inertia tensor of the body is different than if they were point particles. This means the rotational dynamics of the rigid body will be different. Thus a model of a dimer is different if the dimer consists of two point masses versus two spheroids, even if the two particles have the same mass. Finite-size particles that experience torque due to their interaction with other particles will also impart that torque to a rigid body they are part of.  

See the “fix rigid” command for example of complex rigid-body models it is possible to define in LAMMPS.  

Note that the fix shake command can also be used to treat 2, 3, or 4 particles as a rigid body, but it always assumes the particles are point masses.  

Also note that body particles cannot be modeled with the fix rigid command. Body particles are treated by LAMMPS as single particles, though they can store internal state, such as a list of sub-particles. Individual body particles are typically treated as rigid bodies, and their motion integrated with a command like fix nve/body. Interactions between pairs of body particles are computed via a command like pair_style body/nparticle.  

# 8.5.2 Granular models  

Granular system are composed of spherical particles with a diameter, as opposed to point particles. This means they have an angular velocity and torque can be imparted to them to cause them to rotate.  

To run a simulation of a granular model, you will want to use the following commands:  

• atom_style sphere • fix nve/sphere • fix gravity  

This compute • compute erotate/sphere  

alculates rotational kinetic energy which can be output with thermodynamic info. The compute  

• compute fabric  

calculates various versions of the fabric tensor for granular and non-granular pair styles.  

Use one of these 4 pair potentials, which compute forces and torques between interacting pairs of particles:  

• pair_style gran/history pair_style gran/no_history • pair_style gran/hertzian pair_style granular  

These commands implement fix options specific to granular systems:  

• fix freeze   
• fix pour   
• fix viscous   
• fix wall/gran   
• fix wall/gran/region  

The fix style freeze zeroes both the force and torque of frozen atoms, and should be used for granular system instead of the fix style setforce.  

To model heat conduction, one must add the temperature and heatflow atom variables with:  

• fix property/atom a temperature integration fix • fix heat/flow  

and a heat conduction option defined in both  

• pair_style granular • fix wall/gran  

For computational efficiency, you can eliminate needless pairwise computations between frozen atoms by using this command:  

• neigh_modify exclude  

# 8.5. Packages howto  

![](images/9362497182faf94351ccea260468c3163f339502c0cd5fa4dd862c7e2f2e9253.jpg)  

# Note  

By default, for 2d systems, granular particles are still modeled as 3d spheres, not 2d discs (circles), meaning their moment of inertia will be the same as in 3d. If you wish to model granular particles in 2d as 2d discs, see the note on this topic on the Howto $2d$ doc page, where 2d simulations are discussed.  

To add custom granular contact models, see the modifying granular sub-models page.  

# 8.5.3 Body particles  

# Overview:  

In LAMMPS, body particles are generalized finite-size particles. Individual body particles can represent complex entities, such as surface meshes of discrete points, collections of sub-particles, deformable objects, etc. Note that other kinds of finite-size spherical and aspherical particles are also supported by LAMMPS, such as spheres, ellipsoids, line segments, and triangles, but they are simpler entities than body particles. See the Howto spherical page for a general overview of all these particle types.  

Body particles are used via the atom_style body command. It takes a body style as an argument. The current body styles supported by LAMMPS are as follows. The name in the first column is used as the bstyle argument for the atom_style body command.  

<html><body><table><tr><td>nparticle</td><td>rigid body with N sub-particles</td></tr><tr><td>rounded/polygon</td><td>2d polygons with N vertices</td></tr><tr><td>rounded/polyhedron</td><td>3d polyhedra with N vertices, E edges and F faces</td></tr></table></body></html>  

The body style determines what attributes are stored for each body and thus how they can be used to compute pairwise body/body or bond/non-body (point particle) interactions. More details of each style are described below.  

More styles may be added in the future. See the page on creating new body styles for details on how to add a new body style to the code.  

# When to use body particles:  

You should not use body particles to model a rigid body made of simpler particles (e.g. point, sphere, ellipsoid, line segment, triangular particles), if the interaction between pairs of rigid bodies is just the summation of pairwise interactions between the simpler particles. LAMMPS already supports this kind of model via the fix rigid command. Any of the numerous pair styles that compute interactions between simpler particles can be used. The fix rigid command time integrates the motion of the rigid bodies. All of the standard LAMMPS commands for thermostatting, adding constraints, performing output, etc will operate as expected on the simple particles.  

By contrast, when body particles are used, LAMMPS treats an entire body as a single particle for purposes of computing pairwise interactions, building neighbor lists, migrating particles between processors, output of particles to a dump file, etc. This means that interactions between pairs of bodies or between a body and non-body (point) particle need to be encoded in an appropriate pair style. If such a pair style were to mimic the fix rigid model, it would need to loop over the entire collection of interactions between pairs of simple particles within the two bodies, each time a single body/body interaction was computed.  

Thus it only makes sense to use body particles and develop such a pair style, when particle/particle interactions are more complex than what the fix rigid command can already calculate. For example, consider particles with one or more of the following attributes:  

• represented by a surface mesh represented by a collection of geometric entities (e.g. planes $^+$ spheres)  

• deformable • internal stress that induces fragmentation  

For these models, the interaction between pairs of particles is likely to be more complex than the summation of simple pairwise interactions. An example is contact or frictional forces between particles with planar surfaces that interpenetrate. Likewise, the body particle may store internal state, such as a stress tensor used to compute a fracture criterion.  

These are additional LAMMPS commands that can be used with body particles of different styles  

<html><body><table><tr><td>fixnve/body</td><td>integrate motion of a bodyparticle in NVE ensemble</td></tr><tr><td>fixnvt/body</td><td>dittoforNVTensemble</td></tr><tr><td>fixnpt/body</td><td>ditto for NPT ensemble</td></tr><tr><td>fixnph/body</td><td>dittoforNPHensemble</td></tr><tr><td>computebody/local</td><td>store sub-particle attributes of a body particle</td></tr><tr><td>computetemp/body</td><td>compute temperature of body particles</td></tr><tr><td>dumplocal</td><td>output sub-particle attributes of a body particle</td></tr><tr><td>dump image</td><td>output body particle attributes as an image</td></tr></table></body></html>  

The pair styles currently defined for use with specific body styles are listed in the sections below.  

Note that for all the body styles, if the data file defines a general triclinic box, then the orientation of the body particle and its corresponding 6 moments of inertia and other orientation-dependent values should reflect the fact the body is defined withing a general triclinic box with edge vectors A, $^{**}\mathrm{{B}}^{**}$ , $\mathbf{*}\mathbf{*}\mathbf{C}\mathbf{*}\mathbf{*}$ . LAMMPS will rotate the box to convert it to a restricted triclinic box. This operation will also rotate the orientation of the body particles. See the Howto triclinic doc page for more details. The sections below highlight the orientation-dependent values specific to each body style.  

# Specifics of body style nparticle:  

The nparticle body style represents body particles as a rigid body with a variable number N of sub-particles. It is provided as a vanilla, prototypical example of a body particle, although as mentioned above, the fix rigid command already duplicates its functionality.  

The atom_style body command for this body style takes two additional arguments:  

<html><body><table><tr><td>atom_style body nparticle Nmin Nmax</td></tr><tr><td>Nmin 二 minimum # of sub-particles in any body in the system</td></tr><tr><td>Nmax = maximum # of sub-particles in any body in the system</td></tr><tr><td></td></tr></table></body></html>  

The Nmin and Nmax arguments are used to bound the size of data structures used internally by each particle.  

When the read_data command reads a data file for this body style, the following information must be provided for each entry in the Bodies section of the data file:  

<html><body><table><tr><td>atom-ID 1 M</td><td></td></tr><tr><td>N</td><td></td></tr><tr><td>ixx iyy izz ixy ixz iyz</td><td></td></tr><tr><td>xl yl zl</td><td></td></tr><tr><td>xN yN zN</td><td></td></tr></table></body></html>  

where $\mathrm{\bfM}=6+3\mathrm{^{*}N}$ , and $\mathbf{N}$ is the number of sub-particles in the body particle.  

The integer line has a single value N. The floating point line(s) list 6 moments of inertia followed by the coordinates of the N sub-particles (x1 to zN) as 3N values. These values can be listed on as many lines as you wish; see the read_data command for more details.  

# 8.5. Packages howto  

The 6 moments of inertia (ixx,iyy,izz,ixy,ixz,iyz) should be the values consistent with the current orientation of the rigid body around its center of mass. The values are with respect to the simulation box XYZ axes, not with respect to the principal axes of the rigid body itself. LAMMPS performs the latter calculation internally.  

The coordinates of each sub-particle are specified as its x,y,z displacement from the center-of-mass of the body particle. The center-of-mass position of the particle is specified by the x,y,z values in the Atoms section of the data file, as is the total mass of the body particle.  

Note that if the data file defines a general triclinic simulation box, these sub-particle displacements are orientationdependent and, as mentioned above, should reflect the body particle’s orientation within the general triclinic box.  

The pair_style body/nparticle command can be used with this body style to compute body/body and body/non-body interactions.  

# Specifics of body style rounded/polygon:  

The rounded/polygon body style represents body particles as a 2d polygon with a variable number of N vertices. This style can only be used for 2d models; see the boundary command. See the pair_style body/rounded/polygon page for a diagram of two squares with rounded circles at the vertices. Special cases for $\Nu=1$ (circle) and $\Nu=2$ (rod with rounded ends) can also be specified.  

One use of this body style is for 2d discrete element models, as described in Fraige.  

Similar to body style nparticle, the atom_style body command for this body style takes two additional arguments:  

<html><body><table><tr><td>atom_style body rounded/polygon Nmin Nmax</td></tr><tr><td></td></tr><tr><td>Nmin minimum # of vertices in any body in the system Nmax = maximum # of vertices in any body in the system</td></tr></table></body></html>  

The Nmin and Nmax arguments are used to bound the size of data structures used internally by each particle.  

When the read_data command reads a data file for this body style, the following information must be provided for each body in the Bodies section of the data file:  

<html><body><table><tr><td>atom-ID 1 M</td><td></td></tr><tr><td>N</td><td></td></tr><tr><td>ixx iyy izz ixy ixz iyz</td><td></td></tr><tr><td>xl yl zl</td><td></td></tr><tr><td></td><td></td></tr><tr><td>xN yN zN</td><td></td></tr><tr><td>diameter</td><td></td></tr></table></body></html>  

where $\mathbf{M}=6+3^{*}\mathbf{N}+1$ , and $\mathbf{N}$ is the number of vertices in the body particle.  

The integer line has a single value N. The floating point line(s) list 6 moments of inertia, followed by the coordinates of the N vertices $\mathbf{\tilde{x}}1$ to zN) as 3N values (with $\mathbf{Z}=0.0$ for each), followed by a diameter value $=$ the rounded diameter of the circle that surrounds each vertex. The diameter value can be different for each body particle. These floating-point values can be listed on as many lines as you wish; see the read_data command for more details.  

![](images/99b80fff723683477f3b03b8427324c34565f4b34383be0c024c37c3cf612a99.jpg)  

# Note  

It is important that the vertices for each polygonal body particle be listed in order around its perimeter, so that edges can be inferred. LAMMPS does not check that this is the case.  

The 6 moments of inertia (ixx,iyy,izz,ixy,ixz,iyz) should be the values consistent with the current orientation of the rigid body around its center of mass. The values are with respect to the simulation box XYZ axes, not with respect to the principal axes of the rigid body itself. LAMMPS performs the latter calculation internally.  

The coordinates of each vertex are specified as its x,y,z displacement from the center-of-mass of the body particle. The center-of-mass position of the particle is specified by the x,y,z values in the Atoms section of the data file.  

For example, the following information would specify a square particle whose edge length is sqrt(2) and rounded diameter is 1.0. The orientation of the square is aligned with the xy coordinate axes which is consistent with the 6 moments of inertia: ixx iyy izz ixy ixz iyz $=114000$ . Note that only Izz matters in 2D simulations.  

<html><body><table><tr><td>3119</td><td></td></tr><tr><td>4 114000</td><td></td></tr><tr><td>-0.7071 -0.7071 0</td><td></td></tr><tr><td>-0.7071 0.7071 0</td><td></td></tr><tr><td>0.7071 0.7071 0</td><td></td></tr><tr><td>0.7071 -0.7071 0</td><td></td></tr><tr><td>1.0</td><td></td></tr></table></body></html>  

A rod in 2D, whose length is 4.0, mass 1.0, rounded at two ends by circles of diameter 0.5, is specified as follows:  

<html><body><table><tr><td>1113</td></tr><tr><td>2</td></tr><tr><td>1 1 1.33333 0 00</td></tr><tr><td>-200</td></tr><tr><td>200 0.5</td></tr></table></body></html>  

A disk, whose diameter is 3.0, mass 1.0, is specified as follows:  

<html><body><table><tr><td>1 1 10</td><td></td></tr><tr><td>1</td><td></td></tr><tr><td>1 14.5000</td><td></td></tr><tr><td>000</td><td></td></tr><tr><td>3.0</td><td></td></tr></table></body></html>  

Note that if the data file defines a general triclinic simulation box, these polygon vertex displacements are orientationdependent and, as mentioned above, should reflect the body particle’s orientation within the general triclinic box.  

The pair_style body/rounded/polygon command can be used with this body style to compute body/body interactions. The fix wall/body/polygon command can be used with this body style to compute the interaction of body particles with a wall.  

# Specifics of body style rounded/polyhedron:  

The rounded/polyhedron body style represents body particles as a 3d polyhedron with a variable number of N vertices, E edges and F faces. This style can only be used for 3d models; see the boundary command. See the “pair_style body/rounded/polygon” page for a diagram of a two 2d squares with rounded circles at the vertices. A 3d cube with rounded spheres at the 8 vertices and 12 rounded edges would be similar. Special cases for $\Nu=1$ (sphere) and $\Nu=2$ (rod with rounded ends) can also be specified.  

This body style is for 3d discrete element models, as described in Wang.  

Similar to body style rounded/polygon, the atom_style body command for this body style takes two additional arguments:  

<html><body><table><tr><td>atom _style body rounded/polyhedron Nmin Nmax</td><td></td></tr><tr><td>Nmin = minimum # of vertices in any</td></tr><tr><td>1 body in the system Nmax = maximum # of vertices in any body in the system</td></tr></table></body></html>  

# 8.5. Packages howto  

The Nmin and Nmax arguments are used to bound the size of data structures used internally by each particle.  

When the read_data command reads a data file for this body style, the following information must be provided for each entry in the Bodies section of the data file:  

<html><body><table><tr><td>atom-ID 3 M</td></tr><tr><td>NEF</td></tr><tr><td>ixx iyy izz ixy ixz iyz</td></tr><tr><td>xl yl zl</td></tr><tr><td></td></tr><tr><td>xN yN zN 01</td></tr><tr><td>12</td></tr><tr><td>23</td></tr><tr><td></td></tr><tr><td>012-1 023-1</td></tr><tr><td></td></tr><tr><td>1234</td></tr><tr><td>diameter</td></tr></table></body></html>  

where $\mathbf{M}=6+3^{*}\mathbf{N}+2^{*}\mathbf{E}+4^{*}\mathbf{F}+1$ , and $\mathbf{N}$ is the number of vertices in the body particle, $\mathrm{E}=$ number of edges, $\mathrm{F}=$ number of faces. For ${\bf N}=1$ or 2, the format is simpler. $\mathrm{\bfE}$ and $\mathrm{F}$ are ignored and no edges or faces are listed, so that M $=6+3^{*}\mathrm{N}+1$ .  

The integer line has three values: number of vertices (N), number of edges (E) and number of faces (F). The floating point line(s) list 6 moments of inertia followed by the coordinates of the N vertices (x1 to zN) as 3N values, followed by 2E vertex indices corresponding to the end points of the E edges, then $4^{*}\mathrm{F}$ vertex indices defining F faces. The last value is the diameter value $=$ the rounded diameter of the sphere that surrounds each vertex. The diameter value can be different for each body particle. These floating-point values can be listed on as many lines as you wish; see the read_data command for more details.  

Note that vertices are numbered from 0 to N-1 inclusive. The order of the 2 vertices in each edge does not matter. Faces can be triangles or quadrilaterals. In both cases 4 vertices must be specified. For a triangle the 4th vertex is -1. The 4 vertices within each triangle or quadrilateral face should be ordered by the right-hand rule so that the normal vector of the face points outwards from the center of mass. For polyhedron with faces with more than 4 vertices, you should split the complex face into multiple simple faces, each of which is a triangle or quadrilateral.  

![](images/9fa9aeef8933d63c23b70fbec85a38083eba946202b09cca76c232f47589a06d.jpg)  

# Note  

If a face is a quadrilateral then its 4 vertices must be co-planar. LAMMPS does not check that this is the case. If you have a quad-face of a polyhedron that is not planar (e.g. a cube whose vertices have been randomly displaced), then you should represent the single quad face as two triangle faces instead.  

The 6 moments of inertia (ixx,iyy,izz,ixy,ixz,iyz) should be the values consistent with the current orientation of the rigid body around its center of mass. The values are with respect to the simulation box XYZ axes, not with respect to the principal axes of the rigid body itself. LAMMPS performs the latter calculation internally.  

The coordinates of each vertex are specified as its x,y,z displacement from the center-of-mass of the body particle. The center-of-mass position of the particle is specified by the x,y,z values in the Atoms section of the data file.  

For example, the following information would specify a cubic particle whose edge length is 2.0 and rounded diameter is 0.5. The orientation of the cube is aligned with the xyz coordinate axes which is consistent with the 6 moments of inertia: ixx iyy izz ixy ixz iyz $=0.6670.6670.667000$ .  

<html><body><table><tr><td>1379</td><td></td></tr><tr><td>8 12 6</td><td></td></tr><tr><td>0.667 0.667 0.667 0 0 0 111</td><td></td></tr><tr><td>1 -1 1</td><td></td></tr><tr><td>-1 -1 1</td><td></td></tr><tr><td>-1 1 1</td><td></td></tr><tr><td>11-1</td><td></td></tr><tr><td>1 -1 -1</td><td></td></tr><tr><td>-1 -1 -1</td><td></td></tr><tr><td>-1 1 -1</td><td></td></tr><tr><td>01</td><td></td></tr><tr><td>12</td><td></td></tr><tr><td>23</td><td></td></tr><tr><td>30</td><td></td></tr><tr><td>45</td><td></td></tr><tr><td>56</td><td></td></tr><tr><td>67</td><td></td></tr><tr><td>74</td><td></td></tr><tr><td>04</td><td></td></tr><tr><td>15</td><td></td></tr><tr><td>26</td><td></td></tr><tr><td>37</td><td></td></tr><tr><td>0123</td><td></td></tr><tr><td>4567</td><td></td></tr><tr><td>0154</td><td></td></tr><tr><td>1265</td><td></td></tr><tr><td>2376</td><td></td></tr><tr><td>3047</td><td></td></tr><tr><td></td><td></td></tr><tr><td>0.5</td><td></td></tr></table></body></html>  

A rod in 3D, whose length is 4.0, mass 1.0 and rounded at two ends by circles of diameter 0.5, is specified as follows:  

<html><body><table><tr><td>1313</td><td></td></tr><tr><td>211</td><td></td></tr><tr><td>01.333331.3333300 0</td><td></td></tr><tr><td>-200</td><td></td></tr><tr><td>200 0.5</td><td></td></tr></table></body></html>  

A sphere whose diameter is 3.0 and mass 1.0, is specified as follows:  

<html><body><table><tr><td>1310</td></tr><tr><td>111</td></tr><tr><td>0.9 0.9 0.9 0 0 0</td></tr><tr><td>000</td></tr><tr><td>3.0</td></tr></table></body></html>  

The number of edges and faces for a rod or sphere must be listed, but is ignored.  

Note that if the data file defines a general triclinic simulation box, these polyhedron vertex displacements are orientationdependent and, as mentioned above, should reflect the body particle’s orientation within the general triclinic box.  

The pair_style body/rounded/polhedron command can be used with this body style to compute body/body interactions. The fix wall/body/polyhedron command can be used with this body style to compute the interaction of body particles  

# 8.5. Packages howto  

with a wall.  

# Output specifics for all body styles:  

For the compute body/local and dump local commands, all 3 of the body styles described on his page produces one datum for each of the N vertices (of sub-particles) in a body particle. The datum has 3 values:  

<html><body><table><tr><td>1 = x position of vertex (or sub-particle)</td></tr><tr><td></td></tr><tr><td>2 = y position of vertex</td></tr><tr><td>3 = Z position of vertex</td></tr></table></body></html>  

These values are the current position of the vertex within the simulation domain, not a displacement from the centerof-mass (COM) of the body particle itself. These values are calculated using the current COM and orientation of the body particle.  

The dump image command and its body keyword can be used to render body particles.  

For the nparticle body style, each body is drawn as a collection of spheres, one for each sub-particle. The size of each sphere is determined by the bflag1 parameter for the body keyword. The bflag2 argument is ignored.  

For the rounded/polygon body style, each body is drawn as a polygon with N line segments. For the rounded/polyhedron body style, each face of each body is drawn as a polygon with N line segments. The drawn diameter of each line segment is determined by the bflag1 parameter for the body keyword. The bflag2 argument is ignored.  

Note that for both the rounded/polygon and rounded/polyhedron styles, line segments are drawn between the pairs of vertices. Depending on the diameters of the line segments this may be slightly different than the physical extent of the body as calculated by the pair_style rounded/polygon or pair_style rounded/polyhedron commands. Conceptually, the pair styles define the surface of a 2d or 3d body by lines or planes that are tangent to the finite-size spheres of specified diameter which are placed on each vertex position.  

(Fraige) F. Y. Fraige, P. A. Langston, A. J. Matchett, J. Dodds, Particuology, 6, 455 (2008).   
(Wang) J. Wang, H. S. Yu, P. A. Langston, F. Y. Fraige, Granular Matter, 13, 1 (2011).  

# 8.5.4 Bonded particle models  

The BPM package implements bonded particle models which can be used to simulate mesoscale solids. Solids are constructed as a collection of particles, which each represent a coarse-grained region of space much larger than the atomistic scale. Particles within a solid region are then connected by a network of bonds to model solid elasticity. There are many names for methods that are based on similar (or equivalent) capabilities to those in this package, including, but not limited to, cohesive beam models, bonded DEMs, lattice spring models, mass spring models, and lattice particle methods.  

Unlike traditional bonds in molecular dynamics, the equilibrium bond length can vary between bonds. Bonds store the reference state. This includes setting the equilibrium length equal to the initial distance between the two particles, but can also include data on the bond orientation for rotational models. This produces a stress-free initial state. Furthermore, bonds are allowed to break under large strains, producing fracture. The examples/bpm directory has sample input scripts for simulations of the fragmentation of an impacted plate and the pouring of extended, elastic bodies. See (Clemmer) for more general information on the approach and the LAMMPS implementation. Example movies illustrating some of these capabilities are found at https://www.lammps.org/movies.html#bpmpackage.  

Bonds can be created using a read data or create bonds command. Alternatively, a molecule template with bonds can be used with fix deposit or fix pour to create solid grains.  

In this implementation, bonds store their reference state when they are first computed in the setup of the first simulation run. Data is then preserved across run commands and is written to binary restart files such that restarting the system will not reset the reference state of a bond. Bonds that are created midway into a run, such as those created by pouring grains using fix pour, are initialized on that timestep.  

Currently, there are two types of bonds included in the BPM package. The first bond style, bond bpm/spring, only applies pairwise, central body forces. Point particles must have bond atom style and may be thought of as nodes in a spring network. An optional multibody term can be used to adjust the network’s Poisson’s ratio. Alternatively, the second bond style, bond bpm/rotational, resolves tangential forces and torques arising with the shearing, bending, and twisting of the bond due to rotation or displacement of particles. Particles are similar to those used in the granular package, atom style sphere. However, they must also track the current orientation of particles and store bonds, and therefore use a bpm/sphere atom style. This also requires a unique integrator fix nve/bpm/sphere which numerically integrates orientation similar to fix nve/asphere.  

In addition to bond styles, a new pair style pair bpm/spring was added to accompany the bpm/spring bond style. By default, this pair style is simply a hookean repulsion with similar velocity damping as its sister bond style, but optional arguments can be used to modify the force.  

Bond data can be output using a combination of standard LAMMPS commands. A list of IDs for bonded atoms can be generated using the compute property/local command. Various properties of bonds can be computed using the compute bond/local command. This command allows one to access data saved to the bond’s history, such as the reference length of the bond. More information on bond history data can be found on the documentation pages for the specific BPM bond styles. Finally, this data can be output using a dump local command. As one may output many columns from the same compute, the dump modify colname option may be used to provide more helpful column names. An example of this procedure is found in /examples/bpm/pour/. External software, such as OVITO, can read these dump files to render bond data.  

As bonds can be broken between neighbor list builds, the special_bonds command works differently for BPM bond styles. There are two possible settings which determine how pair interactions work between bonded particles. First, one can overlay pair forces with bond forces such that all bonded particles also feel pair interactions. This can be accomplished by setting the overlay/pair keyword present in all bpm bond styles to yes and requires using the following special bond settings  

This can be useful for post-processing, or to determine pair interaction properties between distinct bonded particles.  

To monitor the fracture of bonds in the system, all BPM bond styles have the ability to record instances of bond breakage to output using the dump local command. Since one may frequently output a list of broken bonds and the time they broke, the dump modify option header no may be useful to avoid repeatedly printing the header of the dump file. An example of this procedure is found in /examples/bpm/impact/. Additionally, one can use compute nbond/atom to tally the current number of bonds per atom.  

See the Howto page on broken bonds for more information.  

While LAMMPS has many utilities to create and delete bonds, only the following are currently compatible with BPM bond styles:  

• create_bonds • delete_bonds • fix bond/create • fix bond/break • fix bond/swap  

![](images/865de48689440a5b6668d44550a5c20b4aa5c17426bb6593ad6b727e7bc54f84.jpg)  

# Note  

The create_bonds command requires certain special_bonds settings. To subtract pair interactions, one will need to switch between different special_bonds settings in the input script. An example is found in examples/bpm/ impact.  

(Clemmer) Clemmer, Monti, Lechman, Soft Matter, 20, 1702 (2024).  

# 8.5.5 Polarizable models  

In polarizable force fields the charge distributions in molecules and materials respond to their electrostatic environments. Polarizable systems can be simulated in LAMMPS using three methods:  

• the fluctuating charge method, implemented in the QEQ package, • the adiabatic core-shell method, implemented in the CORESHELL package, • the thermalized Drude dipole method, implemented in the DRUDE package.  

The fluctuating charge method calculates instantaneous charges on interacting atoms based on the electronegativity equalization principle. It is implemented in the fix qeq which is available in several variants. It is a relatively efficient technique since no additional particles are introduced. This method allows for charge transfer between molecules or atom groups. However, because the charges are located at the interaction sites, off-plane components of polarization cannot be represented in planar molecules or atom groups.  

The two other methods share the same basic idea: polarizable atoms are split into one core atom and one satellite particle (called shell or Drude particle) attached to it by a harmonic spring. Both atoms bear a charge and they represent collectively an induced electric dipole. These techniques are computationally more expensive than the QEq method because of additional particles and bonds. These two charge-on-spring methods differ in certain features, with the core-shell model being normally used for ionic/crystalline materials, whereas the so-called Drude model is normally used for molecular systems and fluid states.  

The core-shell model is applicable to crystalline materials where the high symmetry around each site leads to stable trajectories of the core-shell pairs. However, bonded atoms in molecules can be so close that a core would interact too strongly or even capture the Drude particle of a neighbor. The Drude dipole model is relatively more complex in order to remedy this and other issues. Specifically, the Drude model includes specific thermostatting of the core-Drude pairs and short-range damping of the induced dipoles.  

The three polarization methods can be implemented through a self-consistent calculation of charges or induced dipoles at each timestep. In the fluctuating charge scheme this is done by the matrix inversion method in fix qeq/point, but for core-shell or Drude-dipoles the relaxed-dipoles technique would require an slow iterative procedure. These selfconsistent solutions yield accurate trajectories since the additional degrees of freedom representing polarization are massless. An alternative is to attribute a mass to the additional degrees of freedom and perform time integration using an extended Lagrangian technique. For the fluctuating charge scheme this is done by fix qeq/dynamic, and for the charge-on-spring models by the methods outlined in the next two sections. The assignment of masses to the additional degrees of freedom can lead to unphysical trajectories if care is not exerted in choosing the parameters of the polarizable models and the simulation conditions.  

In the core-shell model the vibration of the shells is kept faster than the ionic vibrations to mimic the fast response of the polarizable electrons. But in molecular systems thermalizing the core-Drude pairs at temperatures comparable to the rest of the simulation leads to several problems (kinetic energy transfer, too short a timestep, etc.) In order to avoid these problems the relative motion of the Drude particles with respect to their cores is kept “cold” so the vibration of the core-Drude pairs is very slow, approaching the self-consistent regime. In both models the temperature is regulated using the velocities of the center of mass of core $^+$ shell (or Drude) pairs, but in the Drude model the actual relative core-Drude particle motion is thermostatted separately as well.  

# 8.5.6 Adiabatic core/shell model  

The adiabatic core-shell model by Mitchell and Fincham is a simple method for adding polarizability to a system. In order to mimic the electron shell of an ion, a satellite particle is attached to it. This way the ions are split into a core and a shell where the latter is meant to react to the electrostatic environment inducing polarizability. See the Howto polarizable page for a discussion of all the polarizable models available in LAMMPS.  

Technically, shells are attached to the cores by a spring force $\mathrm{f}=\mathrm{k}^{*}\mathrm{r}$ where $\mathbf{k}$ is a parameterized spring constant and r is the distance between the core and the shell. The charges of the core and the shell add up to the ion charge, thus q(ion) $={\mathsf{q}}({\mathsf{c o r e}})+{\mathsf{q}}({\mathsf{s h e l l}})$ . This setup introduces the ion polarizability (alpha) given by alpha $\mathbf{\tau}=\mathbf{q}(\mathrm{shell})^{\wedge}2/\mathrm{k}$ . In a similar fashion the mass of the ion is distributed on the core and the shell with the core having the larger mass.  

To run this model in LAMMPS, atom_style full can be used since atom charge and bonds are needed. Each kind of core/shell pair requires two atom types and a bond type. The core and shell of a core/shell pair should be bonded to each other with a harmonic bond that provides the spring force. For example, a data file for $\mathrm{NaCl}$ , as found in examples/coreshell, has this format:  

<html><body><table><tr><td>432 216</td><td>atoms # core and shell atoms</td></tr><tr><td></td><td> bonds # number of core/shell springs</td></tr><tr><td>4 2</td><td>atom types # 2 cores and 2 shells for Na and Cl</td></tr><tr><td>bond types</td><td></td></tr><tr><td></td><td></td></tr><tr><td>0.0 24.09597 xlo xhi 0.0 24.09597 ylo yhi</td><td></td></tr><tr><td>0.0 24.09597 zlo zhi</td><td></td></tr><tr><td>Masses</td><td># core/shell mass ratio = 0.1</td></tr><tr><td></td><td></td></tr><tr><td>1 20.690784 # Na core # Cl core</td><td></td></tr><tr><td>2 31.90500 3 2.298976</td><td></td></tr><tr><td></td><td># Na shell (continuesonnextpage)</td></tr></table></body></html>  

# 8.5. Packages howto  

(continued from previous page)  

<html><body><table><tr><td colspan="2">4 3.54500 # Cl shell</td><td colspan="8"></td></tr><tr><td rowspan="4">1</td><td>Atoms</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>1</td><td>2 4</td><td>1.5005 -2.5005</td><td>0.00000000 0.00000000</td><td>0.00000000 0.00000000</td><td></td><td>0.00000000 # core of core/shell pair 1</td><td></td></tr><tr><td>1 2</td><td>1</td><td>1.5056</td><td>4.01599500</td><td>4.01599500</td><td></td><td>0.00000000 # shell of core/shell pair 1 4.01599500 # core of core/shell pair 2</td><td></td></tr><tr><td>3 4</td><td>2</td><td>3 -0.5056</td><td></td><td>4.01599500</td><td>4.01599500</td><td></td><td>4.01599500 # shell of core/shell pair 2</td><td></td></tr><tr><td></td><td></td><td>Bonds # Bond topology for spring forces</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>1 2</td><td>2 2</td><td>1 3</td><td>2 4</td><td># spring for core/shell pair 1 # spring for core/shell pair 2</td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table></body></html>  

Non-Coulombic (e.g. Lennard-Jones) pairwise interactions are only defined between the shells. Coulombic interactions are defined between all cores and shells. If desired, additional bonds can be specified between cores.  

The special_bonds command should be used to turn-off the Coulombic interaction within core/shell pairs, since that interaction is set by the bond spring. This is done using the special_bonds command with a 1-2 weight $=0.0$ , which is the default value. It needs to be considered whether one has to adjust the special_bonds weighting according to the molecular topology since the interactions of the shells are bypassed over an extra bond.  

Note that this core/shell implementation does not require all ions to be polarized. One can mix core/shell pairs and ions without a satellite particle if desired.  

Since the core/shell model permits distances of $\mathrm{r}=0.0$ between the core and shell, a pair style with a “cs” suffix needs to be used to implement a valid long-range Coulombic correction. Several such pair styles are provided in the CORESHELL package. See this page for details. All of the core/shell enabled pair styles require the use of a long-range Coulombic solver, as specified by the kspace_style command. Either the PPPM or Ewald solvers can be used.  

For the NaCL example problem, these pair style and bond style settings are used:  

<html><body><table><tr><td></td></tr><tr><td>pair _style born/coul/long/cs 20.0 20.0</td></tr><tr><td>pair coeff ** 0.01.0000.000.00 0.00</td></tr><tr><td>coeff 33 487.0 0.23768 0.001.05 0.50 #Na-Na</td></tr><tr><td>pair coeff 3 4 145134.0 0.23768 0.006.99 8.70 #Na-Cl</td></tr><tr><td>pair pair coeff 4 4 405774.0 0.23768 0.00 72.40 145.40 #C1-Cl</td></tr><tr><td></td></tr><tr><td>bond style harmonic</td></tr><tr><td>bond coeff 1 63.014 0.0 bond coeff 225.7240.0</td></tr></table></body></html>  

When running dynamics with the adiabatic core/shell model, the following issues should be considered. The relative motion of the core and shell particles corresponds to the polarization, hereby an instantaneous relaxation of the shells is approximated and a fast core/shell spring frequency ensures a nearly constant internal kinetic energy during the simulation. Thermostats can alter this polarization behavior, by scaling the internal kinetic energy, meaning the shell will not react freely to its electrostatic environment. Therefore it is typically desirable to decouple the relative motion of the core/shell pair, which is an imaginary degree of freedom, from the real physical system. To do that, the compute temp/cs command can be used, in conjunction with any of the thermostat fixes, such as $f i x n\nu t$ or fix langevin. This compute uses the center-of-mass velocity of the core/shell pairs to calculate a temperature, and ensures that velocity is what is rescaled for thermostatting purposes. This compute also works for a system with both core/shell pairs and non-polarized ions (ions without an attached satellite particle). The compute temp/cs command requires input of two groups, one for the core atoms, another for the shell atoms. Non-polarized ions which might also be included in the treated system should not be included into either of these groups, they are taken into account by the group-ID (second argument) of the compute. The groups can be defined using the group \*type\* command. Note that to perform thermostatting using this definition of temperature, the fix modify temp command should be used to assign the compute to the thermostat fix. Likewise the thermo_modify temp command can be used to make this temperature be output for the overall system.  

For the NaCl example, this can be done as follows:  

group cores type 1 2   
group shells type 3 4   
compute CSequ all temp/cs cores shells   
fix thermoberendsen all temp/berendsen 1427 1427 0.4 # thermostat for the true physical system   
fix thermostatequ all nve # integrator as needed for the berendsen thermostat   
fix_modify thermoberendsen temp CSequ   
thermo_modify temp CSequ # output of center-of-mass derived temperature  

The pressure for the core/shell system is computed via the regular LAMMPS convention by treating the cores and shells as individual particles. For the thermo output of the pressure as well as for the application of a barostat, it is necessary to use an additional pressure compute based on the default temperature and specifying it as a second argument in $f\alpha$ modify and thermo_modify resulting in:  

(...)   
compute CSequ all temp/cs cores shells   
compute thermo_press_lmp all pressure thermo_temp # pressure for individual particles   
thermo_modify temp CSequ press thermo_press_lmp # modify thermo to regular pressure   
fix press_bar all npt temp 300 300 0.04 iso 0 0 0.4   
fix_modify press_bar temp CSequ press thermo_press_lmp # pressure modification for correct kinetic␣ ,→scalar  

If compute temp/cs is used, the decoupled relative motion of the core and the shell should in theory be stable. However numerical fluctuation can introduce a small momentum to the system, which is noticeable over long trajectories. Therefore it is recommendable to use the fix momentum command in combination with compute temp/cs when equilibrating the system to prevent any drift.  

When initializing the velocities of a system with core/shell pairs, it is also desirable to not introduce energy into the relative motion of the core/shell particles, but only assign a center-of-mass velocity to the pairs. This can be done by using the bias keyword of the velocity create command and assigning the compute temp/cs command to the temp keyword of the velocity command, e.g.  

velocity all create 1427 134 bias yes temp CSequ velocity all scale 1427 temp CSequ  

To maintain the correct polarizability of the core/shell pairs, the kinetic energy of the internal motion shall remain nearly constant. Therefore the choice of spring force and mass ratio need to ensure much faster relative motion of the two atoms within the core/shell pair than their center-of-mass velocity. This allows the shells to effectively react instantaneously to the electrostatic environment and limits energy transfer to or from the core/shell oscillators. This fast movement also dictates the timestep that can be used.  

The primary literature of the adiabatic core/shell model suggests that the fast relative motion of the core/shell pairs only allows negligible energy transfer to the environment. The mentioned energy transfer will typically lead to a small drift in total energy over time. This internal energy can be monitored using the compute chunk/atom and compute temp/chunk commands. The internal kinetic energies of each core/shell pair can then be summed using the sum() special function of the variable command. Or they can be time/averaged and output using the fix ave/time command. To use these commands, each core/shell pair must be defined as a “chunk”. If each core/shell pair is defined as its own molecule, the molecule ID can be used to define the chunks. If cores are bonded to each other to form larger molecules, the chunks can be identified by the fix property/atom via assigning a core/shell ID to each atom using a special field in  

# 8.5. Packages howto  

the data file read by the read_data command. This field can then be accessed by the compute property/atom command, to use as input to the compute chunk/atom command to define the core/shell pairs as chunks.  

For example if core/shell pairs are the only molecules:  

read_data NaCl_CS_x0.1_prop.data   
compute prop all property/atom molecule   
compute cs_chunk all chunk/atom c_prop   
compute cstherm all temp/chunk cs_chunk temp internal com yes cdof 3.0 # note the chosen degrees␣   
,→of freedom for the core/shell pairs   
fix ave_chunk all ave/time 10 1 10 c_cstherm file chunk.dump mode vector  

For example if core/shell pairs and other molecules are present:  

fix csinfo all property/atom i_CSID # property/atom command   
read_data NaCl_CS_x0.1_prop.data fix csinfo NULL CS-Info # atom property added in the data-file   
compute prop all property/atom i_CSID   
(...)  

The additional section in the date file would be formatted like this:  

<html><body><table><tr><td colspan="2">CS-Info</td></tr><tr><td>1</td><td># column 1 = atom ID, column 2 = core/shell ID</td></tr><tr><td>2 1</td><td></td></tr><tr><td>3</td><td></td></tr><tr><td>4</td><td>2 2</td></tr><tr><td>5</td><td>3</td></tr><tr><td>6</td><td>3</td></tr><tr><td>7</td><td>4</td></tr><tr><td></td><td></td></tr><tr><td>8</td><td>4</td></tr></table></body></html>  

(Mitchell and Fincham) Mitchell, Fincham, J Phys Condensed Matter, 5, 1031-1038 (1993).  

(Fincham) Fincham, Mackrodt and Mitchell, J Phys Condensed Matter, 6, 393-404 (1994).  

# 8.5.7 Drude induced dipoles  

The thermalized Drude model represents induced dipoles by a pair of charges (the core atom and the Drude particle) connected by a harmonic spring. See the Howto polarizable doc page for a discussion of all the polarizable models available in LAMMPS.  

The Drude model has a number of features aimed at its use in molecular systems (Lamoureux and Roux):  

• Thermostatting of the additional degrees of freedom associated with the induced dipoles at very low temperature, in terms of the reduced coordinates of the Drude particles with respect to their cores. This makes the trajectory close to that of relaxed induced dipoles. • Consistent definition of 1-2 to 1-4 neighbors. A core-Drude particle pair represents a single (polarizable) atom, so the special screening factors in a covalent structure should be the same for the core and the Drude particle. Drude particles have to inherit the 1-2, 1-3, 1-4 special neighbor relations from their respective cores. • Stabilization of the interactions between induced dipoles. Drude dipoles on covalently bonded atoms interact too strongly due to the short distances, so an atom may capture the Drude particle of a neighbor, or the induced dipoles within the same molecule may align too much. To avoid this, damping at short range can be done by Thole functions (for which there are physical grounds). This Thole damping is applied to the point charges composing the induced dipole (the charge of the Drude particle and the opposite charge on the core, not to the total charge of the core atom).  

A detailed tutorial covering the usage of Drude induced dipoles in LAMMPS is on the here.  

As with the core-shell model, the cores and Drude particles should appear in the data file as standard atoms. The same holds for the springs between them, which are described by standard harmonic bonds. The nature of the atoms (core, Drude particle or non-polarizable) is specified via the fix drude command. The special list of neighbors is automatically refactored to account for the equivalence of core and Drude particles as regards special 1-2 to 1-4 screening. It may be necessary to use the extra/special/per/atom keyword of the read_data command. If using fix shake, make sure no Drude particle is in this fix group.  

There are three ways to thermostat the Drude particles at a low temperature: use either fix langevin/drude for a Langevin thermostat, or fix drude/transform/\* for a Nose-Hoover thermostat, or fix tgnvt/drude for a temperature-grouped NoseHoover thermostat. The first and third require use of the command comm_modify vel yes. The second requires two separate integration fixes like nvt or npt. The correct temperatures of the reduced degrees of freedom can be calculated using the compute temp/drude. This requires also to use the command comm_modify vel yes.  

Short-range damping of the induced dipole interactions can be achieved using Thole functions through the pair style thole in pair_style hybrid/overlay with a Coulomb pair style. It may be useful to use coul/long/cs or similar from the CORESHELL package if the core and Drude particle come too close, which can cause numerical issues.  

(Lamoureux and Roux) G. Lamoureux, B. Roux, J. Chem. Phys 119, 3025 (2003)  

# 8.5.8 Tutorial for Thermalized Drude oscillators in LAMMPS  

This tutorial explains how to use Drude oscillators in LAMMPS to simulate polarizable systems using the DRUDE package. As an illustration, the input files for a simulation of 250 phenol molecules are documented. First of all, LAMMPS has to be compiled with the DRUDE package activated. Then, the data file and input scripts have to be modified to include the Drude dipoles and how to handle them.  

Example input scripts available: examples/PACKAGES/drude  

# Overview of Drude induced dipoles  

Polarizable atoms acquire an induced electric dipole moment under the action of an external electric field, for example the electric field created by the surrounding particles. Drude oscillators represent these dipoles by two fixed charges: the core (DC) and the Drude particle (DP) bound by a harmonic potential. The Drude particle can be thought of as the electron cloud whose center can be displaced from the position of the corresponding nucleus.  

The sum of the masses of a core-Drude pair should be the mass of the initial (unsplit) atom, $m_{C}+m_{D}=m$ . The sum of their charges should be the charge of the initial (unsplit) atom, $q_{C}+q_{D}=q$ . A harmonic potential between the core and Drude partners should be present, with force constant $k_{D}$ and an equilibrium distance of zero. The (half-)stiffness of the harmonic bond $K_{D}=k_{D}/2$ and the Drude charge $q_{D}$ are related to the atom polarizability $\alpha$ by  

$$
K_{D}=\frac{1}{2}\frac{q_{D}^{2}}{\alpha}
$$  

Ideally, the mass of the Drude particle should be small, and the stiffness of the harmonic bond should be large, so that the Drude particle remains close to the core. The values of Drude mass, Drude charge, and force constant can be chosen following different strategies, as in the following examples of polarizable force fields:  

• Lamoureux and Roux suggest adopting a global half-stiffness, $K_{D}=500\mathrm{kcal/(mol}\mathrm{Ang}^{2}\mathrm{)}$ - which corresponds to a force constant $k_{D}=4184\mathrm{kJ/(molAng\Delta^{2})}$ - for all types of core-Drude bond, a global mass $m_{D}=0.4~\mathrm{g/mol}$ (or u) for all types of Drude particles, and to calculate the Drude charges for individual atom types from the atom polarizabilities using equation (1). This choice is followed in the polarizable CHARMM force field.  

# 8.5. Packages howto  

• Alternately Schroeder and Steinhauser suggest adopting a global charge $q_{D}=-1.0\mathrm{e}$ and a global mass $m_{D}=0.1$ $\mathrm{\mathbf{g}/m o l}$ (or u) for all Drude particles, and to calculate the force constant for each type of core-Drude bond from equation (1). The timesteps used by these authors are between 0.5 and 2 fs, with the degrees of freedom of the Drude oscillators kept cold at $1\textsf{K}$ .  

• In both these force fields hydrogen atoms are treated as non-polarizable.  

The motion of of the Drude particles can be calculated by minimizing the energy of the induced dipoles at each timestep, by an iterative, self-consistent procedure. The Drude particles can be massless and therefore do not contribute to the kinetic energy. However, the relaxed method is computational slow. An extended-lagrangian method can be used to calculate the positions of the Drude particles, but this requires them to have mass. It is important in this case to decouple the degrees of freedom associated with the Drude oscillators from those of the normal atoms. Thermalizing the Drude dipoles at temperatures comparable to the rest of the simulation leads to several problems (kinetic energy transfer, very short timestep, etc.), which can be remedied by the “cold Drude” technique (Lamoureux and Roux).  

Two closely related models are used to represent polarization through “charges on a spring”: the core-shell model and the Drude model. Although the basic idea is the same, the core-shell model is normally used for ionic/crystalline materials, whereas the Drude model is normally used for molecular systems and fluid states. In ionic crystals the symmetry around each ion and the distance between them are such that the core-shell model is sufficiently stable. But to be applicable to molecular/covalent systems the Drude model includes two important features:  

1. The possibility to thermostat the additional degrees of freedom associated with the induced dipoles at very low temperature, in terms of the reduced coordinates of the Drude particles with respect to their cores. This makes the trajectory close to that of relaxed induced dipoles.   
2. The Drude dipoles on covalently bonded atoms interact too strongly due to the short distances, so an atom may capture the Drude particle (shell) of a neighbor, or the induced dipoles within the same molecule may align too much. To avoid this, damping at short of the interactions between the point charges composing the induced dipole can be done by Thole functions.  

# Preparation of the data file  

The data file is similar to a standard LAMMPS data file for atom_style full. The DPs and the harmonic bonds connecting them to their DC should appear in the data file as normal atoms and bonds.  

You can use the polarizer tool (Python script distributed with the DRUDE package) to convert a non-polarizable data file (here data.102494.lmp) to a polarizable data file (data-p.lmp)  

<html><body><table><tr><td>polarizer -q -f phenol.dff data.102494.lmp data-p.lmp</td></tr></table></body></html>  

This will automatically insert the new atoms and bonds. The masses and charges of DCs and DPs are computed from phenol.dff, as well as the DC-DP bond constants. The file phenol.dff contains the polarizabilities of the atom types and the mass of the Drude particles, for instance:  

# units: kJ/mol, A, deg # kforce is in the form k/2 r_D^2 # type m D/u q D/e k D alpha/A3 thole OH 0.4 -1.0 4184.0 0.63 0.67 CA 0.4 -1.0 4184.0 1.36 2.51 CAI 0.4 -1.0 4184.0 1.09 2.51  

The hydrogen atoms are absent from this file, so they will be treated as non-polarizable atoms. In the non-polarizable data file data.102494.lmp, atom names corresponding to the atom type numbers have to be specified as comments at the end of lines of the Masses section. You probably need to edit it to add these names. It should look like  

Masses  

(continues on next page)  

(continued from previous page)  

1 12.011 # CAI   
2 12.011 # CA   
3 15.999 # OH   
4 1.008 # HA   
5 1.008 # HO  

# Basic input file  

The atom style should be set to (or derive from) full, so that you can define atomic charges and molecular bonds, angles, dihedrals. . .  

The polarizer tool also outputs certain lines related to the input script (the use of these lines will be explained below). In order for LAMMPS to recognize that you are using Drude oscillators, you should use the fix drude. The command is  

fix DRUDE all drude C C C N N D D D  

The N, C, D following the drude keyword have the following meaning: There is one tag for each atom type. This tag is C for DCs, D for DPs and N for non-polarizable atoms. Here the atom types 1 to 3 (C and O atoms) are DC, atom types 4 and 5 (H atoms) are non-polarizable and the atom types 6 to 8 are the newly created DPs.  

By recognizing the fix drude, LAMMPS will find and store matching DC-DP pairs and will treat DP as equivalent to their DC in the special bonds relations. It may be necessary to extend the space for storing such special relations. In this case extra space should be reserved by using the extra/special/per/atom keyword of either the read_data or create_box command. With our phenol, there is 1 more special neighbor for which space is required. Otherwise LAMMPS crashes and gives the required value.  

read_data data-p.lmp extra/special/per/atom 1  

Let us assume we want to run a simple NVT simulation at $300\mathrm{K}$ . Note that Drude oscillators need to be thermalized at a low temperature in order to approximate a self-consistent field (SCF), therefore it is not possible to simulate an NVE ensemble with this package. Since dipoles are approximated by a charged DC-DP pair, the pair_style must include Coulomb interactions, for instance lj/cut/coul/long with kspace_style pppm. For example, with a cutoff of 10. and a precision 1.e-4:  

pair_style lj/cut/coul/long 10.0   
kspace_style pppm 1.0e-4  

As compared to the non-polarizable input file, pair_coeff lines need to be added for the DPs. Since the DPs have no Lennard-Jones interactions, their $\varepsilon$ is 0. so the only pair_coeff line that needs to be added is  

In order to avoid that the center of mass of the whole system drifts due to the random forces of the Langevin thermostat on DCs, you can add the zero yes option at the end of the fix line.  

If the fix shake is used to constrain the C-H bonds, it should be invoked after the fix langevin/drude for more accuracy.  

fix SHAKE ATOMS shake 0.0001 20 0 t 4 5  

![](images/5bad977b67653a412c5d080146fa24a2322c9b06436d29fae8fd90a760e876d8.jpg)  

# Note  

The group of the fix shake must not include the DPs. If the group ATOMS is defined by non-DPs atom types, you could use  

Since the fix langevin/drude does not perform time integration (just modification of forces but no position/velocity updates), the fix nve should be used in conjunction.  

To avoid the flying ice cube artifact, where the atoms progressively freeze and the center of mass of the whole system drifts faster and faster, the fix momentum can be used. For instance:  

fix MOMENTUM all momentum 100 linear 1 1 1  

Finally, do not forget to update the atom type elements if you use them in a dump_modify . . . element . . . command, by adding the element type of the DPs. Here for instance  

dump DUMP all custom 10 dump.lammpstrj id mol type element x y z ix iy iz dump_modify DUMP element C C O H H D D D  

The input file should now be ready for use!  

You will notice that the global temperature thermo_temp computed by LAMMPS is not 300. K as wanted. This is because LAMMPS treats DPs as standard atoms in his default compute. If you want to output the temperatures of the DC-DP pair centers of mass and of the DPs relative to their DCs, you should use the compute temp_drude  

pair_style hybrid/overlay lj/cut/coul/long 10.0 thole 2.6 10.0  

This tells LAMMPS that we are using two pair_styles. The first one is as above (lj/cut/coul/long 10.0). The second one is a thole pair_style with default screening factor 2.6 (Noskov) and cutoff 10.0.  

Since hybrid/overlay does not support mixing rules, the interaction coefficients of all the pairs of atom types with $\mathrm{i}<$ j should be explicitly defined. The output of the polarizer script can be used to complete the pair_coeff section of the input file. In our example, this will look like:  

<html><body><table><tr><td>pair_</td><td>coeff</td><td>1</td><td>1 lj/cut/coul/long</td><td></td><td>0.0700</td><td>3.550</td></tr><tr><td>pair</td><td>：coeff</td><td>1</td><td>2 lj/cut/coul/long</td><td></td><td>0.0700</td><td>3.550</td></tr><tr><td>pair</td><td>coeff</td><td>1</td><td></td><td>3 lj/cut/coul/long</td><td>0.1091</td><td>3.310</td></tr><tr><td>pair</td><td>coeff</td><td>1</td><td></td><td>4 lj/cut/coul/long</td><td>0.0458</td><td>2.985</td></tr><tr><td>pair</td><td>coeff</td><td>2</td><td></td><td>2 lj/cut/coul/long</td><td>0.0700</td><td>3.550</td></tr><tr><td>pair</td><td>coeff</td><td>2</td><td></td><td>3 lj/cut /coul/long</td><td>0.1091</td><td>3.310</td></tr><tr><td>pair</td><td>coeff</td><td>2</td><td></td><td>4 lj/cut/coul/long</td><td>0.0458</td><td>2.985</td></tr><tr><td>pair</td><td>coeff</td><td>3</td><td></td><td>3 lj/cut/coul/long</td><td>0.1700</td><td>3.070</td></tr><tr><td>pair</td><td>coeff</td><td>3</td><td></td><td>4 lj/cut/coul/long</td><td>0.0714</td><td>2.745</td></tr><tr><td>pair</td><td>coeff</td><td>4</td><td></td><td>4 lj/cut/coul/long</td><td>0.0300</td><td>2.420</td></tr><tr><td>pair</td><td>coeff</td><td>*</td><td></td><td>5 lj/cut/coul/long</td><td>0.0000</td><td>0.000</td></tr><tr><td>pair</td><td>coeff</td><td>*</td><td></td><td>6* lj/cut/coul/long</td><td>0.0000</td><td>0.000</td></tr><tr><td>pair</td><td>coeff</td><td>1</td><td>1 thole</td><td>1.090</td><td>2.510</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>1</td><td>2 thole</td><td>1.218</td><td>2.510</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>1</td><td>3 thole</td><td>0.829</td><td>1.590</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>1</td><td>6 thole</td><td>1.090</td><td>2.510</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>1</td><td>7 thole</td><td>1.218</td><td>2.510</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>1</td><td>8 thole</td><td>0.829</td><td>1.590</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>2</td><td>2 thole</td><td>1.360</td><td>2.510</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>2</td><td>3 thole</td><td>0.926</td><td>1.590</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>2</td><td>6 thole</td><td>1.218</td><td>2.510</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>2</td><td>7 thole</td><td>1.360</td><td>2.510</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>2</td><td>8 thole</td><td>0.926</td><td>1.590</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>3</td><td>3 thole</td><td>0.630</td><td>0.670</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>3</td><td>6 thole</td><td>0.829</td><td>1.590</td><td></td></tr><tr><td>pair</td><td>coeff</td><td>3</td><td>7 thole</td><td>0.926</td><td>1.590</td><td></td></tr><tr><td>pair_</td><td>_coeff</td><td>3</td><td>8 thole</td><td>0.630</td><td>0.670</td><td></td></tr><tr><td></td><td>pair_coeff</td><td>6</td><td>6 thole</td><td>1.090</td><td>2.510</td><td></td></tr><tr><td></td><td>pair_coeff</td><td>6</td><td>7 thole 8 thole</td><td>1.218</td><td>2.510</td><td></td></tr><tr><td>pair</td><td>_coeff</td><td>6</td><td>7 thole</td><td>0.829</td><td>1.590</td><td></td></tr><tr><td>pair</td><td>_coeff</td><td>7 7</td><td>8 thole</td><td>1.360 0.926</td><td>2.510 1.590</td><td></td></tr><tr><td>pair</td><td>r_coeff</td><td></td><td>8 thole</td><td>0.630</td><td>0.670</td><td></td></tr><tr><td>pair</td><td>r_coeff</td><td>8</td><td></td><td></td><td></td><td></td></tr></table></body></html>  

For the thole pair style the coefficients are  

1. the atom polarizability in units of cubic length   
2. the screening factor of the Thole function (optional, default value specified by the pair_style command)   
3. the cutoff (optional, default value defined by the pair_style command)  

The special neighbors have charge-charge and charge-dipole interactions screened by the coul factors of the special_bonds command (0.0, 0.0, and 0.5 in the example above). Without using the pair_style thole, dipole-dipole interactions are screened by the same factor. By using the pair_style thole, dipole-dipole interactions are screened by Thole’s function, whatever their special relationship (except within each DC-DP pair of course). Consider for example 1-2 neighbors: using the pair_style thole, their dipoles will see each other (despite the coul factor being 0.) and the  

# 8.5. Packages howto  

interactions between these dipoles will be damped by Thole’s function.  

# Thermostats and barostats  

Using a Nose-Hoover barostat with the langevin/drude thermostat is straightforward using fix nph instead of nve. For example:  

fix NPH all nph iso 1. 1. 500  

It is also possible to use a Nose-Hoover instead of a Langevin thermostat. This requires to use \*fix drude/transform\* just before and after the time integration fixes. The fix drude/transform/direct converts the atomic masses, positions, velocities and forces into a reduced representation, where the DCs transform into the centers of mass of the DC-DP pairs and the DPs transform into their relative position with respect to their DC. The fix drude/transform/inverse performs the reverse transformation. For a NVT simulation, with the DCs and atoms at $300\mathrm{K}$ and the DPs at $1\textsf{K}$ relative to their DC one would use  

fix DIRECT all drude/transform/direct fix NVT1 ATOMS nvt temp 300. 300. 100 fix NVT2 DRUDES nvt temp 1. 1. 20 fix INVERSE all drude/transform/inverse  

For our phenol example, the groups would be defined as  

group ATOMS type 1 2 3 4 5 # DCs and non-polarizable atoms   
group CORES type 1 2 3 # DCs   
group DRUDES type 6 7 8 # DPs  

Note that with the fixes drude/transform, it is not required to specify comm_modify vel yes because the fixes do it anyway (several times and for the forces also).  

It is a bit more tricky to run a NPT simulation with Nose-Hoover barostat and thermostat. First, the volume should be integrated only once. So the fix for DCs and atoms should be npt while the fix for DPs should be nvt (or vice versa). Second, the fix npt computes a global pressure and thus a global temperature whatever the fix group. We do want the pressure to correspond to the whole system, but we want the temperature to correspond to the fix group only. We must then use the fix_modify command for this. In the end, the block of instructions for thermostatting and barostatting will look like  

compute TATOMS ATOMS temp fix DIRECT all drude/transform/direct fix NPT ATOMS npt temp 300. 300. 100 iso 1. 1. 500 fix_modify NPT temp TATOMS press thermo_press fix NVT DRUDES nvt temp 1. 1. 20 fix INVERSE all drude/transform/inverse  

Another option for thermalizing the Drude model is to use the temperature-grouped Nose-Hoover (TGNH) thermostat proposed by (Son). This is implemented as fix tgnvt/drude and fix tgnpt/drude. It separates the kinetic energy into three contributions: the molecular center of mass (COM) motion, the motion of atoms or atom-Drude pairs relative to molecular COMs, and the relative motion of atom-Drude pairs. An independent Nose-Hoover chain is applied to each type of motion. When TGNH is used, the temperatures of molecular, atomic and Drude motion can be printed out with thermo_style command command.  

NVT simulation with TGNH thermostat comm_modify vel yes fix TGNVT all tgnvt/drude temp 300. 300. 100 1. 20 thermo_style custom f_TGNVT[1] f_TGNVT[2] f_TGNVT[3]  

# NPT simulation with TGNH thermostat  

comm_modify vel yes fix TGNPT all tgnpt/drude temp 300. 300. 100 1. 20 iso 1. 1. 500 thermo_style custom f_TGNPT[1] f_TGNPT[2] f_TGNPT[3]  

# Rigid bodies  

You may want to simulate molecules as rigid bodies (but polarizable). Common cases are water models such as SWM4- NDP, which is a kind of polarizable TIP4P water. The rigid bodies and the DPs should be integrated separately, even with the Langevin thermostat. Let us review the different thermostats and ensemble combinations.  

NVT ensemble using Langevin thermostat:  

comm_modify vel yes   
fix LANG all langevin/drude 300. 100 12435 1. 20 13977   
fix RIGID ATOMS rigid/nve/small molecule   
fix NVE DRUDES nve  

NVT ensemble using Nose-Hoover thermostat:  

fix DIRECT all drude/transform/direct   
fix RIGID ATOMS rigid/nvt/small molecule temp 300. 300. 100   
fix NVT DRUDES nvt temp 1. 1. 20   
fix INVERSE all drude/transform/inverse  

NPT ensemble with Langevin thermostat:  

comm_modify vel yes   
fix LANG all langevin/drude 300. 100 12435 1. 20 13977 fix RIGID ATOMS rigid/nph/small molecule iso 1. 1. 500 fix NVE DRUDES nve  

NPT ensemble using Nose-Hoover thermostat:  

compute TATOM ATOMS temp   
fix DIRECT all drude/transform/direct   
fix RIGID ATOMS rigid/npt/small molecule temp 300. 300. 100 iso 1. 1. 500   
fix_modify RIGID temp TATOM press thermo_press   
fix NVT DRUDES nvt temp 1. 1. 20   
fix INVERSE all drude/transform/inverse (Lamoureux and Roux) Lamoureux and Roux, J Chem Phys, 119, 3025-3039 (2003)   
(Schroeder) Schroeder and Steinhauser, J Chem Phys, 133, 154511 (2010).   
(Thole) Chem Phys, 59, 341 (1981).   
(Noskov) Noskov, Lamoureux and Roux, J Phys Chem B, 109, 6705 (2005).   
(SWM4-NDP) Lamoureux, Harder, Vorobyov, Roux, MacKerell, Chem Phys Let, 418, 245-249 (2006)  

# 8.5. Packages howto  

(Son) Son, McDaniel, Cui and Yethiraj, J Phys Chem Lett, 10, 7523 (2019).  

# 8.5.9 Peridynamics with LAMMPS  

This Howto is based on the Sandia report 2010-5549 by Michael L. Parks, Pablo Seleson, Steven J. Plimpton, Richard B. Lehoucq, and Stewart A. Silling.  

# Overview  

Peridynamics is a nonlocal extension of classical continuum mechanics. The discrete peridynamic model has the same computational structure as a molecular dynamics model. This Howto provides a brief overview of the peridynamic model of a continuum, then discusses how the peridynamic model is discretized within LAMMPS as described in the original article (Parks). An example problem with comments is also included.  

# Quick Start  

The peridynamics styles are included in the optional PERI package. If your LAMMPS executable does not already include the PERI package, you can see the build instructions for packages for how to enable the package when compiling a custom version of LAMMPS from source.  

Here is a minimal example for setting up a peridynamics simulation.  

units si   
boundary s s s   
lattice sc 0.0005   
atom_style peri   
atom_modify map array   
neighbor 0.0010 bin   
region target cylinder y 0.0 0.0 0.0050 -0.0050 0.0 units box   
create_box 1 target   
create_atoms 1 region target   
pair_style peri/pmb   
pair_coeff \* \* 1.6863e22 0.0015001 0.0005 0.25   
set group all density 2200   
set group all volume 1.25e-10   
velocity all set 0.0 0.0 0.0 sum no units box   
fix 1 all nve   
compute 1 all damage/atom   
timestep 1.0e-7  

Some notes on this input example:  

• peridynamics simulations typically use SI units   
• particles must be created on a simple cubic lattice   
• using the atom style peri is required   
• an atom map is required for indexing particles   
• The skin distance used when computing neighbor lists should be defined appropriately for your choice of simulation parameters. The skin should be set to a value such that the peridynamic horizon plus the skin distance is larger than the maximum possible distance between two bonded particles (before their bond breaks). Here it is set to 0.001 meters.   
• a peridynamics pair style is required. Available choices are currently: peri/eps, peri/lps, peri/pmb, and peri/ves. The model parameters are set with a pair_coeff command.   
• the mass density and volume fraction for each particle must be defined. This is done with the two set commands for density and volume. For a simple cubic lattice, the volume of a particle should be equal to the cube of the lattice constant, here $V_{i}=\Delta x^{3}$ .   
• with the velocity command all particles are initially at rest   
• a plain velocity-Verlet time integrator is used, which is algebraically equivalent to a centered difference in time, but numerically more stable   
• you can compute the damage at the location of each particle with compute damage/atom   
• finally, the timestep is set to 0.1 microseconds with the timestep command.  

# Peridynamic Model of a Continuum  

The following is not a complete overview of peridynamics, but a discussion of only those details specific to the model we have implemented within LAMMPS. For more on the peridynamic theory, the reader is referred to (Silling 2007). To begin, we define the notation we will use.  

# Basic Notation  

Within the peridynamic literature, the following notational conventions are generally used. The position of a given point in the reference configuration is $\mathbf{X}$ . Let ${\bf u}({\bf x},t)$ and $\mathbf{y}(\mathbf{x},t)$ denote the displacement and position, respectively, of the point $\mathbf{X}$ at time t. Define the relative position and displacement vectors of two bonded points $\mathbf{X}$ and $\mathbf{x}^{\prime}$ as $\boldsymbol{\xi}=\mathbf{x}^{\prime}-\mathbf{x}$ and $\eta=\mathbf{u}(\mathbf{x}^{\prime},t)-\mathbf{u}(\mathbf{x},t)$ , respectively. We note here that $\eta$ is time-dependent, and that $\xi$ is not. It follows that the relative position of the two bonded points in the current configuration can be written as $\xi+\eta=\mathbf{y}(\mathbf{x}^{\prime},t)-\mathbf{y}(\mathbf{x},t)$ .  

Peridynamic models are frequently written using states, which we briefly describe here. For the purposes of our discussion, all states are operators that act on vectors in $\mathbb{R}^{3}$ . For a more complete discussion of states, see (Silling 2007). A vector state is an operator whose image is a vector, and may be viewed as a generalization of a secondrank tensor. Similarly, a scalar state is an operator whose image is a scalar. Of particular interest is the vector force state $\underline{{\mathbf{T}}}\left[\mathbf{x},t\right]\left\langle\mathbf{x}^{\prime}-\mathbf{x}\right\rangle$ , which is a mapping, having units of force per volume squared, of the vector $\mathbf{x}^{\prime}-\mathbf{x}$ to the force vector state field. The vector state operator $\underline{{\mathbf{T}}}$ may itself be a function of $\mathbf{X}$ and $t$ . The constitutive model is completely contained within $\mathbf{T}$ .  

In the peridynamic theory, the deformation at a point depends collectively on all points interacting with that point. Using the notation of (Silling 2007), we write the peridynamic equation of motion as  

$$
\rho(\mathbf{x}){\ddot{\mathbf{u}}}(\mathbf{x},t)=\int_{{\mathcal{H}}_{x}}\left\{{\underline{{\mathbf{T}}}}\left[\mathbf{x},t\right]\left\langle\mathbf{x}^{\prime}-\mathbf{x}\right\rangle-{\underline{{\mathbf{T}}}}\left[\mathbf{x}^{\prime},t\right]\left\langle\mathbf{x}-\mathbf{x}^{\prime}\right\rangle\right\}d V_{\mathbf{x}^{\prime}}+\mathbf{b}(\mathbf{x},t),
$$  

where $\rho$ represents the mass density, $\mathbf{T}$ the force vector state, and $\mathbf{b}$ an external body force density. A point $\mathbf{X}$ interacts with all the points $\mathbf{x}^{\prime}$ within the neighborhood $\mathcal{H}_{\mathbf{x}}$ , assumed to be a spherical region of radius $\delta>0$ centered at $\mathbf{X}$ . $\delta$ is called the horizon, and is analogous to the cutoff radius used in molecular dynamics. Conditions on $\mathbf{T}$ for which $(I)$ satisfies the balance of linear and angular momentum are given in (Silling 2007).  

We consider only force vector states that can be written as  

$$
\begin{array}{r}{\underline{{\mathbf{T}}}=t\underline{{\mathbf{M}}},}\end{array}
$$  

with $\underline{{t}}$ a scalar force state and $\mathbf{M}$ the deformed direction vector state, defined by  

$$
\begin{array}{r}{\underline{{\mathbf{M}}}\left\langle\xi\right\rangle=\left\{\begin{array}{c l}{\frac{\xi+\eta}{\|\xi+\eta\|}}&{\left\|\xi+\eta\right\|\neq0}\ {0}&{\mathrm{otherwise}}\end{array}\right..}\end{array}
$$  

Such force states correspond to so-called ordinary materials (Silling 2007). These are the materials for which the force between any two interacting points $\mathbf{X}$ and $\mathbf{x}^{\prime}$ acts along the line between the points.  

# 8.5. Packages howto  