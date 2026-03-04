---
title: "LAMMPS Introduction and Features"
description: "Overview of LAMMPS molecular dynamics simulator, features, version history, and command categories"
category: "general"
tags: ["introduction", "features", "overview", "commands"]
commands: ["lammps"]
---
# LAMMPS Documentation  

Release 4 Feb 2025  

The LAMMPS Developers developers@lammps.org  

# About LAMMPS and this manual 1  

# I User Guide 5  

# 1 Introduction  

1.1 Overview of LAMMPS 7   
1.2 What does a LAMMPS version mean 7   
1.2.1 Identifying the Version . 8   
1.2.2 LAMMPS releases, branches, and tags . 8   
1.3 LAMMPS features 9   
1.3.1 General features . 9   
1.3.2 Particle and model types 10   
1.3.3 Interatomic potentials (force fields) . 10   
1.3.4 Atom creation . 11   
1.3.5 Ensembles, constraints, and boundary conditions 11   
1.3.6 Integrators . . 12   
1.3.7 Diagnostics . 12   
1.3.8 Output . . 12   
1.3.9 Multi-replica models 13   
1.3.10 Pre- and post-processing 13   
1.3.11 Specialized features 13   
1.4 LAMMPS non-features . 14   
1.5 LAMMPS portability and compatibility 15   
1.5.1 Programming language standards . 15   
1.5.2 Build systems . 15   
1.5.3 Operating systems . . 15   
1.5.4 Compilers . 16   
1.5.5 CPU architectures . 16   
1.5.6 Portability compliance 16   
1.6 LAMMPS open-source license . 16   
1.6.1 GPL version of LAMMPS 16   
1.6.2 LGPL version of LAMMPS 17   
1.7 Authors of LAMMPS . 17   
1.8 Citing LAMMPS 18   
1.8.1 Core Algorithms 18   
1.8.2 DOI for the LAMMPS source code . 18   
1.8.3 Home page 19   
1.8.4 Citing contributions . . . 19   
1.9 Additional website links 19  

# 2 Install LAMMPS 21  

# 2.1 Download an executable for Linux 21  

2.1.1 Pre-built static Linux $\mathrm{x86\_64}$ executables 22   
2.1.2 Pre-built Ubuntu and Debian Linux executables . . 22   
2.1.3 Pre-built Fedora Linux executables . 23   
2.1.4 Pre-built EPEL Linux executable . 23   
2.1.5 Pre-built OpenSuse Linux executable 23   
2.1.6 Gentoo Linux executable 24   
2.1.7 Archlinux build-script 24   
2.2 Download an executable for macOS 25   
2.3 Download an executable for Windows 25   
2.4 Download an executable for Linux or macOS via Conda 26   
2.5 Download source and documentation as a tarball 26   
2.6 Download the LAMMPS source with git . . 27  

# 3 Build LAMMPS 31  

3.1 Build LAMMPS with CMake . 31   
3.1.1 Advantages of using CMake 31   
3.1.2 Getting started 32   
3.1.3 Configuration and build options 33   
3.1.4 Multi-configuration build systems 33   
3.1.5 Installing CMake . 33   
Build LAMMPS with make . . 34   
3.2.1 Requirements 34   
3.2.2 Getting started 34   
3.2.3 Customized builds and alternate makefiles . 35   
Link LAMMPS as a library to another code 35   
3.3.1 Link with LAMMPS as a static library . 36   
3.3.2 Link with LAMMPS as a shared library 37   
Basic build options . . 39   
3.4.1 Serial vs parallel build 39   
3.4.2 Choice of compiler and compile/link options 41   
3.4.3 Build the LAMMPS executable and library 43   
3.4.4 Including or removing debug support 45   
3.4.5 Build LAMMPS tools . . 45   
3.4.6 Install LAMMPS after a build 46   
Optional build settings . . 47   
3.5.1 $\mathrm{C}{+}{+}11$ standard compliance 47   
3.5.2 FFT library 47   
3.5.3 Size of LAMMPS integer types and size limits 52   
3.5.4 Output of JPEG, PNG, and movie files . 53   
3.5.5 Read or write compressed files 54   
3.5.6 Support for downloading files 54   
3.5.7 Memory allocation alignment 55   
3.5.8 Workaround for long long integers . . 56   
3.5.9 Exception handling when using LAMMPS as a library 56   
3.5.10 Trigger selected floating-point exceptions 56   
Include packages in build . . 57   
3.6.1 Information for both build systems 58   
3.6.2 CMake presets for installing many packages . . 58   
3.6.3 Make shortcuts for installing many packages . . . 60   
Packages with extra build options . . 61   
3.7.1 COMPRESS package . . . 61   
3.7.2 GPU package 62   
3.7.3 KIM package 65   
3.7.4 KOKKOS package 67   
3.7.5 LEPTON package . 72   
3.7.6 MACHDYN package 72   
3.7.7 ML-IAP package 73   
3.7.8 OPT package 74   
3.7.9 POEMS package 74   
3.7.10 PYTHON package 75   
3.7.11 VORONOI package 75   
3.7.12 ADIOS package . 76   
3.7.13 ATC package 77   
3.7.14 AWPMD package . 78   
3.7.15 COLVARS package 79   
3.7.16 ELECTRODE package 80   
3.7.17 ML-PACE package 81   
3.7.18 ML-POD package . 81   
3.7.19 ML-QUIP package 82   
3.7.20 PLUMED package 83   
3.7.21 H5MD package 85   
3.7.22 ML-HDNNP package . 85   
3.7.23 INTEL package . 86   
3.7.24 MDI package 87   
3.7.25 MISC package 87   
3.7.26 MOLFILE package 88   
3.7.27 NETCDF package . 88   
3.7.28 OPENMP package 89   
3.7.29 QMMM package 89   
3.7.30 RHEO package 90   
3.7.31 SCAFACOS package 91   
3.7.32 VTK package 92   
Build the LAMMPS documentation 92   
3.8.1 Build using GNU make 93   
3.8.2 Build using CMake 94   
3.8.3 Prerequisites for HTML . 94   
3.8.4 Prerequisites for PDF 94   
3.8.5 Prerequisites for ePUB and MOBI 95   
3.8.6 Instructions for Developers . 95   
Notes for building LAMMPS on Windows . . 96   
3.9.1 General remarks . 96   
3.9.2 Running Linux on Windows 96   
3.9.3 Using a GNU GCC ported to Windows 97   
3.9.4 Using Microsoft Visual Studio . . 97   
3.9.5 Using Intel oneAPI Compilers and Libraries . . . . . . . . 98   
3.9.6 Using a cross-compiler 98   
3.10 Notes for saving disk space when building LAMMPS from source . . 98   
3.11 Development build options . . 99   
3.11.1 Monitor compilation flags (CMake only) . 99   
3.11.2 Enable static code analysis with clang-tidy (CMake only) . 99   
3.11.3 Report missing and unneeded ‘#include’ statements (CMake only) 100   
3.11.4 Address, Leak, Undefined Behavior, and Thread Sanitizer Support (CMake only) 100   
3.11.5 Code Coverage and Unit Testing (CMake only) 101   
3.11.6 Coding style utilities 108   
3.11.7 Clang-format support . 108   
3.11.8 GitHub command-line interface 108  

# 4 Run LAMMPS 111  

4.1 Basics of running LAMMPS 111   
4.2 Command-line options 112   
4.3 Screen and logfile output 120   
4.4 Error message output 122   
4.4.1 A single line . 122   
4.4.2 Two lines 123   
4.4.3 Three lines 123   
4.4.4 Four lines 123   
4.5 Running LAMMPS on Windows 123   
5 Commands 125   
5.1 LAMMPS input scripts 125   
5.2 Parsing rules for input scripts 126   
5.3 Input script structure 128   
5.3.1 Initialization . 128   
5.3.2 System definition 129   
5.3.3 Simulation settings 129   
5.3.4 Run a simulation 129   
5.4 Commands by category 130   
5.4.1 Initialization . 130   
5.4.2 Setup simulation box 130   
5.4.3 Setup atoms 130   
5.4.4 Force fields 130   
5.4.5 Settings . . 130   
5.4.6 Operations within timestepping (fixes) and diagnostics (computes) 130   
5.4.7 Output . . . . 131   
5.4.8 Actions . . 131   
5.4.9 Input script control 131   
5.5 General commands 132   
5.6 Fix styles 132   
5.7 Compute styles 134   
5.8 Pair styles 135   
5.9 Bond styles 137   
5.10 Angle styles 137   
5.11 Dihedral styles 137   
5.12 Improper styles 137   
5.13 KSpace styles 138   
5.14 Dump styles . 138   
5.15 Removed commands and packages 138   
5.15.1 LAMMPS shell 139   
5.15.2 i-PI tool 139   
5.15.3 USER-REAXC package 139   
5.15.4 MPIIO package 139   
5.15.5 MSCG package 139   
5.15.6 LATTE package . 140   
5.15.7 Minimize style fire/old 140   
5.15.8 Pair style mesont/tpm, compute style mesont, atom style mesont 140   
5.15.9 Box command . . 140   
5.15.10 Reset_ids, reset_atom_ids, reset_mol_ids commands 140   
5.15.11 MESSAGE package . . 140   
5.15.12 REAX package 140   
5.15.13 MEAM package . . . . 141   
5.15.14 USER-CUDA package 141   
5.15.15 Fix ave/spatial and fix ave/spatial/sphere . . 141   
5.15.16 restart2data tool . 141   
6 Optional packages 143   
6.1 Available Packages 143   
Package details 147   
6.2.1 ADIOS package . 148   
6.2.2 AMOEBA package 149   
6.2.3 ASPHERE package 149   
6.2.4 ATC package 150   
6.2.5 AWPMD package 150   
6.2.6 BOCS package 150   
6.2.7 BODY package 151   
6.2.8 BPM package 151   
6.2.9 BROWNIAN package . 152   
6.2.10 CG-DNA package . 152   
6.2.11 CG-SPICA package 152   
6.2.12 CLASS2 package 153   
6.2.13 COLLOID package 153   
6.2.14 COLVARS package 154   
6.2.15 COMPRESS package 154   
6.2.16 CORESHELL package 155   
6.2.17 DIELECTRIC package 155   
6.2.18 DIFFRACTION package 156   
6.2.19 DIPOLE package . 156   
6.2.20 DPD-BASIC package 157   
6.2.21 DPD-MESO package 157   
6.2.22 DPD-REACT package 158   
6.2.23 DPD-SMOOTH package 158   
6.2.24 DRUDE package 159   
6.2.25 EFF package 159   
6.2.26 ELECTRODE package 160   
6.2.27 EXTRA-COMMAND package 160   
6.2.28 EXTRA-COMPUTE package . 161   
6.2.29 EXTRA-DUMP package 161   
6.2.30 EXTRA-FIX package 161   
6.2.31 EXTRA-MOLECULE package . 161   
6.2.32 EXTRA-PAIR package 162   
6.2.33 FEP package 162   
6.2.34 GPU package 162   
6.2.35 GRANULAR package 163   
6.2.36 H5MD package 164   
6.2.37 INTEL package 164   
6.2.38 INTERLAYER package 165   
6.2.39 KIM package . 165   
6.2.40 KOKKOS package 166   
6.2.41 KSPACE package . 167   
6.2.42 LATBOLTZ package 167   
6.2.43 LEPTON package . 168   
6.2.44 MACHDYN package 168   
6.2.45 MANIFOLD package . 169   
6.2.46 MANYBODY package 169   
6.2.47 MC package . 170   
6.2.48 MDI package 170   
6.2.49 MEAM package . 171   
6.2.50 MESONT package 171   
6.2.51 MGPT package 172   
6.2.52 MISC package 172   
6.2.53 ML-HDNNP package 173   
6.2.54 ML-IAP package 173   
6.2.55 ML-PACE package 174   
6.2.56 ML-POD package . 174   
6.2.57 ML-QUIP package 175   
6.2.58 ML-RANN package 175   
6.2.59 ML-SNAP package 175   
6.2.60 ML-UF3 package 176   
6.2.61 MOFFF package 176   
6.2.62 MOLECULE package 177   
6.2.63 MOLFILE package 177   
6.2.64 NETCDF package . 178   
6.2.65 OPENMP package 178   
6.2.66 OPT package 179   
6.2.67 ORIENT package 180   
6.2.68 PERI package . 180   
6.2.69 PHONON package 180   
6.2.70 PLUGIN package 181   
6.2.71 PLUMED package 181   
6.2.72 POEMS package 182   
6.2.73 PTM package . 182   
6.2.74 PYTHON package 183   
6.2.75 QEQ package 183   
6.2.76 QMMM package 183   
6.2.77 QTB package 184   
6.2.78 REACTION package 184   
6.2.79 REAXFF package . 185   
6.2.80 REPLICA package 185   
6.2.81 RHEO package 186   
6.2.82 RIGID package 187   
6.2.83 SCAFACOS package 187   
6.2.84 SHOCK package 188   
6.2.85 SMTBQ package 188   
6.2.86 SPH package 188   
6.2.87 SPIN package 189   
6.2.88 SRD package 190   
6.2.89 TALLY package . 190   
6.2.90 UEF package 190   
6.2.91 VORONOI package 191   
6.2.92 VTK package 191   
6.2.93 YAFF package 192  

# 7 Accelerate performance 193  

# 7.1 Benchmarks . 193  

7.2 Measuring performance . 194   
7.3 General tips 195   
7.4 Accelerator packages 196   
7.4.1 GPU package 196   
7.4.2 INTEL package 200   
7.4.3 KOKKOS package 208   
7.4.4 OPENMP package 216   
7.4.5 OPT package . . 218   
Comparison of various accelerator packages . 220   
8 Howto discussions 223   
8.1 General howto . 223   
8.1.1 Restart a simulation . 223   
8.1.2 Visualize LAMMPS snapshots . . . 224   
8.1.3 Run multiple simulations from one input script 224   
8.1.4 Multi-replica simulations . . 226   
8.1.5 Library interface to LAMMPS 227   
8.1.6 Coupling LAMMPS to other codes . 227   
8.1.7 Using LAMMPS with the MDI library for code coupling 228   
8.1.8 Broken Bonds . 230   
Settings howto 230   
8.2.1 2d simulations . 230   
8.2.2 Type labels 232   
8.2.3 Triclinic (non-orthogonal) simulation boxes 233   
8.2.4 Thermostats . 238   
8.2.5 Barostats 240   
8.2.6 Walls 241   
8.2.7 NEMD simulations 242   
8.2.8 Long-range dispersion settings 242   
Analysis howto 243   
8.3.1 Output from LAMMPS (thermo, dumps, computes, fixes, variables) 243   
8.3.2 Use chunks to calculate system properties . 249   
8.3.3 Using distributed grids 252   
8.3.4 Calculate temperature . 253   
8.3.5 Calculate elastic constants 254   
8.3.6 Calculate thermal conductivity . 255   
8.3.7 Calculate viscosity 256   
8.3.8 Calculate diffusion coefficients . 258   
8.3.9 Output structured data from LAMMPS . 258   
Force fields howto . 264   
8.4.1 CHARMM, AMBER, COMPASS, DREIDING, and OPLS force fields . 264   
8.4.2 AMOEBA and HIPPO force fields . 269   
8.4.3 TIP3P water model 274   
8.4.4 TIP4P water model 277   
8.4.5 TIP5P water model 281   
8.4.6 SPC water model 283   
8.5 Packages howto . 285   
8.5.1 Finite-size spherical and aspherical particles . . . 285   
8.5.2 Granular models 289   
8.5.3 Body particles . . . . 290   
8.5.4 Bonded particle models 296   
8.5.5 Polarizable models 298   
8.5.6 Adiabatic core/shell model 299   
8.5.7 Drude induced dipoles 302   
8.5.8 Tutorial for Thermalized Drude oscillators in LAMMPS 303   
8.5.9 Peridynamics with LAMMPS 310   
8.5.10 Manifolds (surfaces) 325   
8.5.11 Reproducing hydrodynamics and elastic objects (RHEO) 326   
8.5.12 Magnetic spins 327   
8.6 Tutorials howto 328  

# 8.6.1 Using CMake with LAMMPS 328  

8.6.2 LAMMPS GitHub tutorial 335   
8.6.3 Using LAMMPS-GUI 347   
8.6.4 Moltemplate Tutorial 362   
8.6.5 LAMMPS Python Tutorial 369   
8.6.6 PyLammps Tutorial . 379   
8.6.7 Using LAMMPS on Windows 10 with WSL 379  

# 9 Example scripts 391  

9.1 Lowercase directories . 391   
9.2 Uppercase directories 393  

# 0 Auxiliary tools 395  

10.1 Pre-processing tools . . 395   
10.2 Post-processing tools 395   
10.3 Miscellaneous tools 396   
10.4 Tool descriptions 396   
10.4.1 amber2lmp tool 396   
10.4.2 binary2txt tool 396   
10.4.3 ch2lmp tool 396   
10.4.4 chain tool 397   
10.4.5 LAMMPS coding standard 397   
10.4.6 colvars tools . 397   
10.4.7 createatoms tool . 398   
10.4.8 drude tool 398   
10.4.9 eam database tool 398   
10.4.10 eam generate tool 398   
10.4.11 eff tool . 399   
10.4.12 emacs tool 399   
10.4.13 fep tool 399   
10.4.14 i-PI tool 399   
10.4.15 ipp tool 400   
10.4.16 kate tool 400   
10.4.17 LAMMPS-GUI 400   
10.4.18 lmp2arc tool 403   
10.4.19 lmp2cfg tool . 403   
10.4.20 Magic patterns for the “file” command 403   
10.4.21 matlab tool 404   
10.4.22 micelle2d tool 404   
10.4.23 moltemplate tool 404   
10.4.24 msi2lmp tool 405   
10.4.25 Scripts for building LAMMPS when offline 405   
10.4.26 phonon tool 406   
10.4.27 polybond tool 406   
10.4.28 pymol_asphere tool 407   
10.4.29 python tool 407   
10.4.30 Regression tester tool 407   
10.4.31 replica tool 407   
10.4.32 smd tool 408   
10.4.33 spin tool 408   
10.4.34 singularity/apptainer tool 408   
10.4.35 stl_bin2txt tool 408   
10.4.36 SWIG interface 408   
10.4.37 tabulate tool 410   
10.4.38 tinker tool 410   
10.4.39 valgrind tool . 410   
10.4.40 vim tool 410   
10.4.41 xmgrace tool 411  

# 11 Errors  

# 413  

# 11.1 Common problems 413  

11.2 Error and warning details 414   
11.2.1 General troubleshooting advice 415   
11.2.2 Unknown identifier in data file 417   
11.2.3 Incorrect format in . . . section of data file 417   
11.2.4 Illegal variable command: expected X arguments but found Y 417   
11.2.5 Out of range atoms - cannot compute . . . 417   
11.2.6 Too many neighbor bins 418   
11.2.7 Cannot use neighbor bins - box size $<<$ cutoff 418   
11.2.8 Domain too large for neighbor bins . 418   
11.2.9 Molecule topology/atom exceeds system topology/atom 418   
11.2.10 Molecule topology type exceeds system topology type 418   
11.2.11 Molecule attributes do not match system attributes 418   
11.3 Reporting bugs 419   
11.4 Debugging crashes 419   
11.4.1 Using the GDB debugger to get a stack trace . . . . 420   
11.4.2 Using valgrind to get a stack trace . 422   
1.5 Debugging when LAMMPS appears to be stuck . 423   
1.6 Error messages 424   
11.7 Warning messages 547  

# II Programmer Guide 561  

# 1 LAMMPS Library Interfaces 563  

# 1.1 LAMMPS C Library API . 563  

1.1.1 Creating or deleting a LAMMPS object 564   
1.1.2 Executing commands 569   
1.1.3 System properties 572   
1.1.4 Per-atom properties 583   
1.1.5 Computes, fixes, variables 585   
1.1.6 Scatter/gather operations 595   
1.1.7 Neighbor list access . 608   
1.1.8 Configuration information 610   
1.1.9 Utility functions . 617   
1.1.10 Extending the C API 625   
1.2 LAMMPS Python API 626   
1.3 LAMMPS Fortran API . 626   
1.3.1 The LIBLAMMPS Fortran Module 626   
1.3.2 Creating or deleting a LAMMPS object 627   
1.3.3 Executing LAMMPS commands 628   
1.3.4 Accessing system properties 629   
1.3.5 The LIBLAMMPS module API . . 630   
1.4 LAMMPS $\mathrm{C}{+}{+}$ API . 675   
1.4.1 Using the $\mathrm{C}{+}{+}$ API directly . . 676   
1.4.2 Creating or deleting a LAMMPS object 676   
1.4.3 Executing LAMMPS commands 676  

# Use Python with LAMMPS 679  

2.1 Overview 679   
2.2 Installation 680   
2.2.1 Installing the LAMMPS Python Module and Shared Library 681   
2.2.2 Extending Python to run in parallel . 684   
2.3 Run LAMMPS from Python 685   
2.3.1 Running LAMMPS and Python in serial . 685   
2.3.2 Running LAMMPS and Python in parallel with MPI 685   
2.3.3 Running Python scripts 686   
2.3.4 Creating or deleting a LAMMPS object . . 687   
2.3.5 Executing commands . . 687   
2.3.6 System properties 689   
2.3.7 Per-atom properties . 690   
2.3.8 Compute, fixes, variables 691   
2.3.9 Scatter/gather operations 692   
2.3.10 Neighbor list access . 693   
2.3.11 Configuration information 695   
2.4 The lammps Python module 695   
2.4.1 The lammps class API 696   
2.4.2 Additional components of the lammps module 721   
2.5 Extending the Python interface 723   
2.6 Calling Python from LAMMPS 724   
2.7 Output Readers 724   
2.8 Example Python scripts . . 725   
2.9 Using LAMMPS in IPython notebooks and Jupyter . 726   
2.9.1 Interactive Python Examples 726   
2.10 Handling LAMMPS errors . . 727   
2.11 Troubleshooting . . . 727   
2.11.1 Testing if Python can launch LAMMPS 727  

# 3 Modifying & extending LAMMPS 729  

# 3.1 Overview  

3.2 Submitting new features for inclusion in LAMMPS 730   
3.2.1 Communication with the LAMMPS developers . 731   
3.2.2 Time and effort required 731   
3.2.3 Submission procedure 731   
3.2.4 External contributions 731   
3.2.5 Location of files: individual files and packages 731   
3.2.6 Changes to core LAMMPS files 732   
3.3 Requirements for contributions to LAMMPS 732   
3.3.1 Motivation 732   
3.3.2 Licensing requirements (strict) 732   
3.3.3 Integration testing (strict) 733   
3.3.4 Documentation (strict) 733   
3.3.5 Build system (strict) . . 734   
3.3.6 Command or style names, file names, and keywords (strict) . . 734   
3.3.7 Programming style requirements (varied) 735   
3.3.8 Examples (preferred) 735   
3.3.9 Error or warning messages and explanations (preferred) . . 735   
3.3.10 Citation reminder (optional) 736   
3.3.11 Testing (optional) 736   
3.4 LAMMPS programming style 736   
3.4.1 Include files (varied) 736   
3.4.2 Whitespace (preferred) 737  

# 3.4.3 Constants (strongly preferred) 737  

3.4.4 Placement of braces (strongly preferred) . 738  

3.4.5 Miscellaneous standards (varied) 738   
3.5 Atom styles 739   
3.6 Pair styles . 741   
3.7 Bond, angle, dihedral, improper styles 743   
3.8 Compute styles 744   
3.9 Fix styles 745   
3.10 Input script command style 747   
3.11 Dump styles 747   
3.12 Kspace styles 747   
3.13 Minimization styles 748   
3.14 Region styles 748   
3.15 Body styles 748   
3.16 Granular Sub-Model styles 749   
3.17 Thermodynamic output options . 751   
3.18 Variable options . 752   
4 Information for Developers 753   
4.1 Source files 753   
4.2 Class topology 754   
3 Code design . 757   
4.3.1 Object-oriented code 757   
4.3.2 I/O and output formatting . . 760   
4.3.3 Memory management . . 762   
Parallel algorithms 762   
4.4.1 Partitioning 763   
4.4.2 Communication 764   
4.4.3 Neighbor lists . 766   
4.4.4 Long-range interactions . 768   
4.4.5 OpenMP Parallelism 770   
5 Accessing per-atom data 771   
4.5.1 Owned and ghost atoms . . . 771   
4.5.2 Atom indexing 772   
4.5.3 Atom class versus AtomVec classes 772   
6 Communication patterns 772   
4.6.1 Owned and ghost atoms . 772   
4.6.2 Higher level communication 774   
How a timestep works . 775   
8 Writing new styles 778   
4.8.1 Writing new pair styles . 778   
4.8.2 Package and build system considerations . 779   
4.8.3 Case 1: a pairwise additive model 779   
4.8.4 Case 2: a many-body potential 792   
4.8.5 Case 3: a potential requiring communication . . 795   
4.8.6 Case 4: potentials without a compute() function 797   
4.8.7 Writing a new fix style 798   
4.8.8 Writing a new command style 802   
4.8.9 Case 1: Implementing the geturl command . 802   
9 Notes for developers and code maintainers . 807   
4.9.1 Reading and parsing of text and text files . . . 807   
4.9.2 Requesting and accessing neighbor lists 808   
4.9.3 Errors, warnings, and informational messages . 810   
4.9.4 Choosing between a custom atom style, fix property/atom, and fix STORE/ATOM . . 811  

4.9.5 Fix contributions to instantaneous energy, virial, and cumulative energy 812  

4.9.6 KSpace PPPM FFT grids 813   
Notes for updating code written for older LAMMPS versions . 815   
4.10.1 Setting flags in the constructor . . . 815   
4.10.2 Rename of pack/unpack_comm() to pack/unpack_forward_comm() . . . . . . . 815   
4.10.3 Use ev_init() to initialize variables derived from eflag and vflag . . 816   
4.10.4 Use utils::count_words() functions instead of atom->count_words() . 817   
4.10.5 Use utils::numeric() functions instead of force->numeric() . . 817   
4.10.6 Use utils::open_potential() function to open potential files 818   
4.10.7 Use symbolic Atom and AtomVec constants instead of numerical values . . 818   
4.10.8 Simplify customized error messages 819   
4.10.9 Use of “override” instead of “virtual” . 819   
4.10.10 Simplified function names for forward and reverse communication . . 819   
4.10.11 Simplified and more compact neighbor list requests . . . . 820   
4.10.12 Split of fix STORE into fix STORE/GLOBAL and fix STORE/PERATOM . 820   
4.10.13 Rename of fix STORE/PERATOM to fix STORE/ATOM and change of arguments . . 821   
4.10.14 Use Output::get_dump_by_id() instead of Output::find_dump() . . . . . 822   
4.10.15 Refactored grid communication using Grid3d/Grid2d classes instead of GridComm . . . 822   
.11 Writing plugins . . . 823   
4.11.1 Members of lammpsplugin_t . . 824   
4.11.2 Pair style example . 824   
4.11.3 Fix style example . 825   
4.11.4 Command style example 825   
4.11.5 Additional Details . . 826   
4.11.6 Compiling plugins 827   
12 Adding tests for unit testing . 827   
4.12.1 Tests for utility functions 828   
4.12.2 Tests for individual LAMMPS commands 829   
4.12.3 Tests for the C-style library interface 830   
4.12.4 Tests for the Python module and package . 830   
4.12.5 Tests for the Fortran interface . . . 830   
4.12.6 Tests for the $\mathrm{C}{+}{+}\cdot$ -style library interface . . 830   
4.12.7 Tests for reading and writing file formats . 831   
4.12.8 Tests for styles computing or modifying forces . 831   
4.12.9 Tests for programs in the tools folder . 834   
4.12.10 Troubleshooting failed unit tests 834   
3 $\mathrm{C}{+}{+}$ base classes . 835   
4.13.1 LAMMPS Class . . 836   
4.13.2 LAMMPS Atom and AtomVec Base Classes 837   
4.13.3 LAMMPS Input Base Class 842   
Platform abstraction functions . . . 843   
4.14.1 Time functions . 843   
4.14.2 Platform information functions 843   
4.14.3 File and path functions and global constants 844   
4.14.4 Standard I/O function wrappers . 847   
4.14.5 Environment variable functions . . 848   
4.14.6 Dynamically loaded object or library functions 849   
4.14.7 Compressed file I/O functions 849   
5 Utility functions . 850   
4.15.1 I/O with status check and similar functions . . . . . 850   
4.15.2 String to number conversions with validity check . 852   
4.15.3 String processing . 855   
4.15.4 Potential file functions 860   
4.15.5 Argument processing . 861  

# 4.15.6 Convenience functions  

864   
4.15.7 Customized standard functions 866   
4.16 Special Math functions 867   
4.17 Tokenizer classes 869   
4.18 Argument parsing classes . 874   
4.19 File reader classes . 877   
4.20 Memory pool classes 881   
4.21 Eigensolver functions . . . 885   
4.22 Communication buffer coding with ubuf 886   
4.23 Use of distributed grids within style classes 887   
4.23.1 Style commands . 887   
4.23.2 Grid data allocation and access 888   
4.23.3 Grid class constructors 889   
4.23.4 Grid class set methods 889   
4.23.5 Grid class setup_grid method 890   
4.23.6 More grid class set methods 891   
4.23.7 Grid class get methods 891   
4.23.8 Grid class owned/ghost communication 892   
4.23.9 Grid class remap methods for load balancing 893   
4.23.10 Grid class I/O methods 894   
4.23.11 Style class grid access methods . . 896   
4.23.12 Final notes 897  

# II Command Reference 899  

# 1 Commands 901  

1.1 angle_coeff command . 901   
1.1.1 Syntax 901   
1.1.2 Examples 901   
1.1.3 Description 901   
1.1.4 Restrictions 902   
1.1.5 Related commands 902   
1.1.6 Default 902   
angle_style command 902   
1.2.1 Syntax . 902   
1.2.2 Examples 902   
1.2.3 Description 902   
1.2.4 Restrictions 904   
1.2.5 Related commands 904   
1.2.6 Default 904   
angle_write command 904   
1.3.1 Syntax 904   
1.3.2 Examples 904   
1.3.3 Description 904   
1.3.4 Restrictions 905   
1.3.5 Related commands 905   
1.3.6 Default 905   
atom_modify command 905   
1.4.1 Syntax . 905   
1.4.2 Examples . 906   
1.4.3 Description 906   
1.4.4 Restrictions . 907   
1.4.5 Related commands 908   
1.4.6 Default 908   
atom_style command 908   
1.5.1 Syntax . 908   
1.5.2 Examples 908   
1.5.3 Description 909   
1.5.4 Atom style attributes 909   
1.5.5 Particle size and mass . 911   
1.5.6 Additional information about specific atom styles 911   
1.5.7 Restrictions 913   
1.5.8 Related commands 914   
1.5.9 Default 914   
balance command . 914   
1.6.1 Syntax 914   
1.6.2 Examples 915   
1.6.3 Description 915   
1.6.4 Restrictions 921   
1.6.5 Related commands 921   
1.6.6 Default 921   
bond_coeff command 921   
1.7.1 Syntax . 921   
1.7.2 Examples 921   
1.7.3 Description 922   
1.7.4 Restrictions 922   
1.7.5 Related commands 922   
1.7.6 Default 922   
.8 bond_style command 923   
1.8.1 Syntax . 923   
1.8.2 Examples 923   
1.8.3 Description 923   
1.8.4 Restrictions 924   
1.8.5 Related commands 924   
1.8.6 Default 925   
bond_write command . 925   
1.9.1 Syntax . 925   
1.9.2 Examples 925   
1.9.3 Description 925   
1.9.4 Restrictions 925   
1.9.5 Related commands 926   
1.9.6 Default 926   
.10 boundary command 926   
1.10.1 Syntax 926   
1.10.2 Examples 926   
1.10.3 Description 926   
1.10.4 Restrictions 927   
1.10.5 Related commands 927   
1.10.6 Default 927   
1.11 change_box command 927   
1.11.1 Syntax . 927   
1.11.2 Examples 928   
1.11.3 Description 928   
1.11.4 Restrictions 932   
1.11.5 Related commands 932   
1.11.6 Default 932   
clear command 932   
1.12.1 Syntax . 932   
1.12.2 Examples 932   
1.12.3 Description 932   
1.12.4 Restrictions 933   
1.12.5 Related commands 933   
1.12.6 Default 933   
13 comm_modify command 933   
1.13.1 Syntax . 933   
1.13.2 Examples 933   
1.13.3 Description 933   
1.13.4 Restrictions 935   
1.13.5 Related commands 935   
1.13.6 Default 935   
.14 comm_style command 935   
1.14.1 Syntax . 935   
1.14.2 Examples 935   
1.14.3 Description 936   
1.14.4 Restrictions 936   
1.14.5 Related commands 936   
1.14.6 Default 936   
.15 compute command 936   
1.15.1 Syntax . 936   
1.15.2 Examples 936   
1.15.3 Description 937   
1.15.4 Restrictions 943   
1.15.5 Related commands 944   
1.15.6 Default 944   
.16 compute_modify command 944   
1.16.1 Syntax . 944   
1.16.2 Examples 944   
1.16.3 Description 944   
1.16.4 Restrictions 944   
1.16.5 Related commands 945   
1.16.6 Default 945   
.17 create_atoms command 945   
1.17.1 Syntax . 945   
1.17.2 Examples 946   
1.17.3 Description 946   
1.17.4 Restrictions 953   
1.17.5 Related commands 953   
1.17.6 Default 953   
1.18 create_bonds command 953   
1.18.1 Syntax . 953   
1.18.2 Examples 954   
1.18.3 Description 954   
1.18.4 Restrictions 956   
1.18.5 Related commands 956   
1.18.6 Default 956   
create_box command 956   
1.19.1 Syntax . 956   
1.19.2 Examples . 957   
1.19.3 Description 957   
1.19.4 Restrictions . 959   
1.19.5 Related commands 959   
1.19.6 Default 959   
0 delete_atoms command . 959   
1.20.1 Syntax 959   
1.20.2 Examples 960   
1.20.3 Description 960   
1.20.4 Restrictions 961   
1.20.5 Related commands 962   
1.20.6 Default 962   
21 delete_bonds command 962   
1.21.1 Syntax . 962   
1.21.2 Examples 962   
1.21.3 Description 962   
1.21.4 Restrictions 964   
1.21.5 Related commands . . . 964   
1.21.6 Default 964   
2 dielectric command . 964   
1.22.1 Syntax . 964   
1.22.2 Examples 964   
1.22.3 Description 964   
1.22.4 Restrictions 965   
1.22.5 Related commands 965   
1.22.6 Default 965   
.23 dihedral_coeff command 965   
1.23.1 Syntax . 965   
1.23.2 Examples 965   
1.23.3 Description 965   
1.23.4 Restrictions 966   
1.23.5 Related commands 966   
1.23.6 Default 966   
dihedral_style command 966   
1.24.1 Syntax . 966   
1.24.2 Examples 966   
1.24.3 Description 967   
1.24.4 Restrictions 968   
1.24.5 Related commands 968   
1.24.6 Default 968   
1.25 dihedral_write command 968   
1.25.1 Syntax . 968   
1.25.2 Examples 969   
1.25.3 Description 969   
1.25.4 Restrictions 969   
1.25.5 Related commands 970   
1.25.6 Default 970   
6 dimension command 970   
1.26.1 Syntax . 970   
1.26.2 Examples 970   
1.26.3 Description 970   
1.26.4 Restrictions 970   
1.26.5 Related commands 970   
1.26.6 Default 970   
.27 displace_atoms command . 970   
1.27.1 Syntax . 970   
1.27.2 Examples 971   
1.27.3 Description 971  

# 1.27.4 Restrictions 972  

1.27.5 Related commands 972   
1.27.6 Default 972   
1.28 dynamical_matrix command 972   
1.28.1 Syntax . 972   
1.28.2 Examples 973   
1.28.3 Description 973   
1.28.4 Restrictions 973   
1.28.5 Related commands 974   
1.28.6 Default 974   
1.29 echo command 974   
1.29.1 Syntax . 974   
1.29.2 Examples 974   
1.29.3 Description 974   
1.29.4 Restrictions 974   
1.29.5 Related commands 974   
1.29.6 Default 974   
.30 fix command 974   
1.30.1 Syntax 974   
1.30.2 Examples 975   
1.30.3 Description 975   
1.30.4 Restrictions 984   
1.30.5 Related commands 984   
1.30.6 Default 984   
1.31 fix_modify command 984   
1.31.1 Syntax . 984   
1.31.2 Examples 985   
1.31.3 Description 985   
1.31.4 Restrictions 987   
1.31.5 Related commands 987   
1.31.6 Default 987   
1.32 fitpod command . 987   
1.32.1 Syntax . 987   
1.32.2 Examples 987   
1.32.3 Description 987   
1.32.4 POD Potential . 990   
1.32.5 Training . 990   
1.32.6 Validation 991   
1.32.7 Restrictions 991   
1.32.8 Related commands 991   
1.32.9 Default 991   
1.33 geturl command . 991   
1.33.1 Syntax . 991   
1.33.2 Examples 991   
1.33.3 Description 992   
1.33.4 Restrictions 992   
1.33.5 Related commands 992   
1.33.6 Default 992   
1.34 group command . 992   
1.34.1 Syntax . 992   
1.34.2 Examples . 993   
1.34.3 Description 993   
1.34.4 Restrictions 996   
1.34.5 Related commands 996   
1.34.6 Default 996   
1.35 group2ndx command 997   
1.36 ndx2group command 997   
1.36.1 Syntax . 997   
1.36.2 Examples 997   
1.36.3 Description 997   
1.36.4 File Format 997   
1.36.5 Restrictions 998   
1.36.6 Related commands 998   
1.36.7 Default 998   
hyper command . 998   
1.37.1 Syntax 998   
1.37.2 Examples 998   
1.37.3 Description 999   
1.37.4 Restrictions 1000   
1.37.5 Related commands 1000   
1.37.6 Default 1000   
.38 if command 1000   
1.38.1 Syntax . 1000   
1.38.2 Examples 1001   
1.38.3 Description 1001   
1.38.4 Restrictions 1003   
1.38.5 Related commands 1003   
1.38.6 Default 1003   
improper_coeff command . 1004   
1.39.1 Syntax . 1004   
1.39.2 Examples 1004   
1.39.3 Description 1004   
1.39.4 Restrictions 1005   
1.39.5 Related commands 1005   
1.39.6 Default 1005   
40 improper_style command 1005   
1.40.1 Syntax . 1005   
1.40.2 Examples 1005   
1.40.3 Description 1005   
1.40.4 Restrictions 1006   
1.40.5 Related commands 1006   
1.40.6 Default 1006   
include command 1007   
1.41.1 Syntax . 1007   
1.41.2 Examples 1007   
1.41.3 Description 1007   
1.41.4 Restrictions 1007   
1.41.5 Related commands 1007   
1.41.6 Default 1007   
.42 info command 1007   
1.42.1 Syntax . 1007   
1.42.2 Examples 1007   
1.42.3 Description 1008   
1.42.4 Restrictions 1009   
1.42.5 Related commands 1009   
1.42.6 Default 1009   
.43 jump command 1009   
1.43.1 Syntax . 1009   
1.43.2 Examples 1010   
1.43.3 Description 1010   
1.43.4 Restrictions 1011   
1.43.5 Related commands 1011   
1.43.6 Default 1011   
kim command . 1011   
1.44.1 Syntax . 1011   
1.44.2 Examples 1012   
1.44.3 Description 1012   
1.44.4 Using OpenKIM IMs with LAMMPS (kim init, kim interactions) . 1013   
1.44.5 Using OpenKIM Web Queries in LAMMPS (kim query) 1017   
1.44.6 Accessing KIM Model Parameters from LAMMPS (kim param) 1020   
1.44.7 Writing material properties in standard KIM Property Instance format (kim property) 1024   
1.44.8 Citation of OpenKIM IMs 1030   
1.44.9 Restrictions 1030   
1.44.10 Related commands 1030   
kspace_modify command . 1030   
1.45.1 Syntax . 1030   
1.45.2 Examples 1031   
1.45.3 Description 1031   
1.45.4 Restrictions 1036   
1.45.5 Related commands 1036   
1.45.6 Default 1036   
.46 kspace_style command 1037   
1.46.1 Syntax . 1037   
1.46.2 Examples 1038   
1.46.3 Description 1039   
1.46.4 Restrictions 1043   
1.46.5 Related commands 1043   
1.46.6 Default 1043   
.47 label command 1044   
1.47.1 Syntax 1044   
1.47.2 Examples 1044   
1.47.3 Description 1044   
1.47.4 Restrictions 1044   
1.47.5 Related commands 1044   
1.47.6 Default 1045   
labelmap command 1045   
1.48.1 Syntax . 1045   
1.48.2 Examples 1045   
1.48.3 Description 1045   
1.48.4 Restrictions 1046   
1.48.5 Related commands 1046   
1.48.6 Default 1046   
lattice command . 1046   
1.49.1 Syntax . 1046   
1.49.2 Examples 1046   
1.49.3 Description 1047   
1.49.4 Restrictions 1050   
1.49.5 Related commands 1050   
1.49.6 Default 1051   
log command 1051   
1.50.1 Syntax . 1051   
1.50.2 Examples 1051   
1.50.3 Description 1051   
1.50.4 Restrictions 1051   
1.50.5 Related commands 1051   
1.50.6 Default 1051   
.51 mass command 1051   
1.51.1 Syntax . 1051   
1.51.2 Examples 1052   
1.51.3 Description 1052   
1.51.4 Restrictions 1052   
1.51.5 Related commands 1052   
1.51.6 Default 1053   
.52 mdi command 1053   
1.52.1 Syntax . 1053   
1.52.2 Examples 1053   
1.52.3 Description 1053   
1.52.4 Restrictions 1057   
1.52.5 Related commands 1058   
1.52.6 Default 1058   
.53 min_modify command 1058   
1.53.1 Syntax . 1058   
1.53.2 Examples 1058   
1.53.3 Description 1058   
1.53.4 Restrictions 1060   
1.53.5 Related commands 1060   
1.53.6 Default 1060   
.54 min_style spin command 1060   
.55 min_style spin/cg command 1060   
1.56 min_style spin/lbfgs command 1060   
1.56.1 Syntax . 1060   
1.56.2 Examples 1060   
1.56.3 Description 1060   
1.56.4 Restrictions 1061   
1.56.5 Related commands 1061   
1.56.6 Default 1061   
.57 min_style cg command 1062   
1.58 min_style hftn command 1062   
.59 min_style sd command 1062   
.60 min_style quickmin command 1062   
.61 min_style fire command 1062   
.62 min_style spin command 1062   
.63 min_style spin/cg command 1062   
.64 min_style spin/lbfgs command 1062   
1.64.1 Syntax . 1062   
1.64.2 Examples 1062   
1.64.3 Description 1062   
1.64.4 Restrictions . 1064   
1.64.5 Related commands 1064   
1.64.6 Default 1064   
.65 minimize command . 1064   
1.65.1 Syntax . 1064   
1.65.2 Examples . . . 1064   
1.65.3 Description 1064   
1.65.4 Restrictions 1068   
1.65.5 Related commands 1069   
1.65.6 Default 1069   
.66 molecule command 1069   
1.66.1 Syntax . 1069   
1.66.2 Examples 1069   
1.66.3 Description 1069   
1.66.4 Format of a molecule file 1071   
1.66.5 Restrictions 1078   
1.66.6 Related commands 1078   
1.66.7 Default 1078   
.67 neb command 1078   
1.67.1 Syntax . 1078   
1.67.2 Examples 1079   
1.67.3 Description 1079   
1.67.4 Restrictions 1084   
1.67.5 Related commands 1084   
1.67.6 Default 1084   
.68 neb/spin command 1084   
1.68.1 Syntax . 1084   
1.68.2 Examples 1085   
1.68.3 Description 1085   
1.68.4 Restrictions 1089   
1.68.5 Related commands 1089   
1.68.6 Default 1089   
.69 neigh_modify command 1089   
1.69.1 Syntax . 1089   
1.69.2 Examples 1090   
1.69.3 Description 1090   
1.69.4 Restrictions 1092   
1.69.5 Related commands 1092   
1.69.6 Default 1093   
neighbor command 1093   
1.70.1 Syntax . 1093   
1.70.2 Examples 1093   
1.70.3 Description 1093   
1.70.4 Restrictions 1094   
1.70.5 Related commands 1094   
1.70.6 Default 1094   
.71 newton command 1094   
1.71.1 Syntax . 1094   
1.71.2 Examples 1095   
1.71.3 Description 1095   
1.71.4 Restrictions 1095   
1.71.5 Related commands 1095   
1.71.6 Default 1095   
.72 next command . 1095   
1.72.1 Syntax . 1095   
1.72.2 Examples 1095   
1.72.3 Description 1095   
1.72.4 Restrictions 1097   
1.72.5 Related commands 1097   
1.72.6 Default 1097   
.73 package command 1097   
1.73.1 Syntax . 1097   
1.73.2 Examples 1100   
1.73.3 Description 1100   
1.73.4 Restrictions 1106   
1.73.5 Related commands 1106   
1.73.6 Defaults 1106   
1.74 pair_coeff command 1107   
1.74.1 Syntax . 1107   
1.74.2 Examples 1107   
1.74.3 Description 1108   
1.74.4 Restrictions 1109   
1.74.5 Related commands 1109   
1.74.6 Default 1109   
1.75 pair_modify command 1109   
1.75.1 Syntax . 1109   
1.75.2 Examples 1110   
1.75.3 Description 1110   
1.75.4 Restrictions 1113   
1.75.5 Related commands 1114   
1.75.6 Default 1114   
1.76 pair_style command . 1114   
1.76.1 Syntax 1114   
1.76.2 Examples 1114   
1.76.3 Description 1114   
1.76.4 Restrictions 1123   
1.76.5 Related commands 1123   
1.76.6 Default 1123   
1.77 pair_write command 1124   
1.77.1 Syntax . 1124   
1.77.2 Examples 1124   
1.77.3 Description 1124   
1.77.4 Restrictions 1125   
1.77.5 Related commands 1125   
1.77.6 Default 1125   
1.78 partition command 1125   
1.78.1 Syntax . 1125   
1.78.2 Examples 1125   
1.78.3 Description 1125   
1.78.4 Restrictions 1126   
1.78.5 Related commands 1126   
1.78.6 Default 1126   
1.79 plugin command 1126   
1.79.1 Syntax . 1126   
1.79.2 Examples 1126   
1.79.3 Description 1126   
1.79.4 Restrictions 1127   
1.79.5 Related commands 1127   
1.79.6 Default 1127   
1.80 prd command 1127   
1.80.1 Syntax . 1127   
1.80.2 Examples 1128   
1.80.3 Description 1128   
1.80.4 Restrictions 1131   
1.80.5 Related commands 1131   
1.80.6 Default 1131   
1.81 print command 1131   
1.81.1 Syntax . 1131   
1.81.2 Examples 1132   
1.81.3 Description 1132   
1.81.4 Restrictions 1133   
1.81.5 Related commands 1133   
1.81.6 Default 1133   
1.82 processors command 1133   
1.82.1 Syntax 1133   
1.82.2 Examples 1133   
1.82.3 Description 1134   
1.82.4 Restrictions 1137   
1.82.5 Related commands 1137   
1.82.6 Default 1137   
1.83 python command 1137   
1.83.1 Syntax . 1137   
1.83.2 Examples 1138   
1.83.3 Description 1139   
1.83.4 Restrictions 1144   
1.83.5 Related commands 1145   
1.83.6 Default 1145   
1.84 quit command . 1145   
1.84.1 Syntax . 1145   
1.84.2 Examples 1145   
1.84.3 Description 1145   
1.84.4 Restrictions 1145   
1.84.5 Related commands 1146   
1.84.6 Default 1146   
1.85 read_data command . 1146   
1.85.1 Syntax . 1146   
1.85.2 Examples 1147   
1.85.3 Description . . 1147   
1.85.4 Reading multiple data files 1147   
1.85.5 Format of a data file . 1149   
1.85.6 Format of the header of a data file . . 1150   
1.85.7 Header specification of the simulation box size and shape 1151   
1.85.8 Meaning of other header keywords . . 1153   
1.85.9 Format of the body of a data file 1154   
1.85.10 Restrictions 1168   
1.85.11 Related commands 1168   
1.85.12 Default 1168   
1.86 read_dump command . 1169   
1.86.1 Syntax 1169   
1.86.2 Examples 1169   
1.86.3 Description 1170   
1.86.4 Restrictions 1173   
1.86.5 Related commands 1174   
1.86.6 Default 1174   
1.87 read_restart command 1174   
1.87.1 Syntax . 1174   
1.87.2 Examples 1174   
1.87.3 Description 1174   
1.87.4 Restrictions 1177   
1.87.5 Related commands 1177   
1.87.6 Default 1177   
1.88 region command 1177   
1.88.1 Syntax . 1177   
1.88.2 Examples 1178   
1.88.3 Description 1179   
1.88.4 Restrictions 1183   
1.88.5 Related commands 1183   
1.88.6 Default 1183   
1.89 replicate command 1183   
1.89.1 Syntax . 1183   
1.89.2 Examples 1183   
1.89.3 Description 1183   
1.89.4 Restrictions 1184   
1.89.5 Related commands 1185   
1.89.6 Default 1185   
1.90 rerun command 1185   
1.90.1 Syntax . 1185   
1.90.2 Examples 1185   
1.90.3 Description 1186   
1.90.4 Restrictions 1188   
1.90.5 Related commands 1188   
1.90.6 Default 1188   
1.91 reset_atoms command 1188   
1.91.1 Syntax . 1188   
1.91.2 Examples 1188   
1.91.3 Description 1189   
1.91.4 Restrictions 1191   
1.91.5 Related commands 1191   
1.91.6 Defaults 1191   
1.92 reset_timestep command 1191   
1.92.1 Syntax . 1191   
1.92.2 Examples 1191   
1.92.3 Description 1192   
1.92.4 Restrictions 1192   
1.92.5 Related commands 1192   
1.92.6 Default 1192   
1.93 restart command 1192   
1.93.1 Syntax . 1192   
1.93.2 Examples 1193   
1.93.3 Description 1193   
1.93.4 Restrictions 1194   
1.93.5 Related commands 1194   
1.93.6 Default 1194   
1.94 run command 1194   
1.94.1 Syntax . 1194   
1.94.2 Examples 1195   
1.94.3 Description 1195   
1.94.4 Restrictions 1197   
1.94.5 Related commands 1197   
1.94.6 Default 1197   
1.95 run_style command 1197   
1.95.1 Syntax . 1197   
1.95.2 Examples 1198   
1.95.3 Description 1198   
1.95.4 Restrictions 1201   
1.95.5 Related commands 1201   
1.95.6 Default 1201   
1.96 set command 1202   
1.96.1 Syntax . 1202   
1.96.2 Examples 1204   
1.96.3 Description 1205   
1.96.4 Restrictions 1209   
1.96.5 Related commands 1209   
1.96.6 Default 1209   
1.97 shell command 1210   
1.97.1 Syntax . 1210   
1.97.2 Examples 1210   
1.97.3 Description 1210   
1.97.4 Restrictions 1211   
1.97.5 Related commands 1211   
1.97.6 Default 1211   
1.98 special_bonds command 1211   
1.98.1 Syntax . 1211   
1.98.2 Examples 1212   
1.98.3 Description 1212   
1.98.4 Restrictions 1215   
1.98.5 Related commands 1215   
1.98.6 Default 1215   
1.99 suffix command 1215   
1.99.1 Syntax . 1215   
1.99.2 Examples 1215   
1.99.3 Description 1215   
1.99.4 Restrictions 1216   
1.99.5 Related commands 1216   
1.99.6 Default 1216   
1.100 tad command . 1216   
1.100.1 Syntax . 1216   
1.100.2 Examples 1217   
1.100.3 Description 1217   
1.100.4 Restrictions 1220   
1.100.5 Related commands 1220   
1.100.6 Default 1220   
1.101 temper command 1220   
1.101.1 Syntax . 1220   
1.101.2 Examples 1221   
1.101.3 Description 1221   
1.101.4 Restrictions 1222   
1.101.5 Related commands 1222   
1.101.6 Default 1222   
1.102 temper/grem command 1222   
1.102.1 Syntax . 1222   
1.102.2 Examples 1223   
1.102.3 Description 1223   
1.102.4 Restrictions 1224   
1.102.5 Related commands 1224   
1.102.6 Default 1224   
1.103 temper/npt command 1224   
1.103.1 Syntax . 1224   
1.103.2 Examples 1224   
1.103.3 Description 1225   
1.103.4 Restrictions 1225   
1.103.5 Related commands 1225   
1.103.6 Default 1225   
1.104 thermo command 1225   
1.104.1 Syntax . 1225   
1.104.2 Examples 1225   
1.104.3 Description 1225   
1.104.4 Restrictions 1226   
1.104.5 Related commands 1226   
1.104.6 Default 1226   
1.105 thermo_modify command 1226   
1.105.1 Syntax . 1226   
1.105.2 Examples 1227   
1.105.3 Description 1227   
1.105.4 Restrictions 1229   
1.105.5 Related commands 1229   
1.105.6 Default 1229   
1.106 thermo_style command 1230   
1.106.1 Syntax . 1230   
1.106.2 Examples 1231   
1.106.3 Description 1231   
1.106.4 Restrictions 1236   
1.106.5 Related commands 1236   
1.106.6 Default 1236   
third_order command . 1236   
1.107.1 Syntax . 1236   
1.107.2 Examples 1237   
1.107.3 Description 1237   
1.107.4 Restrictions 1237   
1.107.5 Related commands 1237   
1.107.6 Default 1237   
1.108 timer command 1238   
1.108.1 Syntax . 1238   
1.108.2 Examples 1238   
1.108.3 Description 1238   
1.108.4 Restrictions 1239   
1.108.5 Related commands 1239   
1.108.6 Default 1239   
1.109 timestep command 1239   
1.109.1 Syntax . 1239   
1.109.2 Examples 1239   
1.109.3 Description 1239   
1.109.4 Restrictions 1240   
1.109.5 Related commands 1240   
1.109.6 Default 1240   
1.110 uncompute command 1240   
1.110.1 Syntax . 1240   
1.110.2 Examples 1240   
1.110.3 Description 1240   
1.110.4 Restrictions 1240   
1.110.5 Related commands 1240   
1.110.6 Default 1241   
1.111 undump command 1241  

# 1.111.1 Syntax 1241  

+1   
1.111.2 Examples 1241   
1.111.3 Description 1241   
1.111.4 Restrictions 1241   
1.111.5 Related commands 1241   
1.111.6 Default 1241   
unfix command 1241   
1.112.1 Syntax . 1241   
1.112.2 Examples 1241   
1.112.3 Description 1241   
1.112.4 Restrictions 1242   
1.112.5 Related commands 1242   
1.112.6 Default 1242   
1.113 units command 1242   
1.113.1 Syntax . 1242   
1.113.2 Examples 1242   
1.113.3 Description 1242   
1.113.4 Restrictions 1246   
1.113.5 Related commands 1246   
1.113.6 Default 1246   
1.114 variable command 1246   
1.114.1 Syntax . 1246   
1.114.2 Examples . . 1248   
1.114.3 Description . 1248   
1.114.4 Immediate Evaluation of Variables 1265   
1.114.5 Variable Accuracy 1266   
1.114.6 Restrictions 1267   
1.114.7 Related commands 1267   
1.114.8 Default 1267   
5 velocity command . 1267   
1.115.1 Syntax . 1267   
1.115.2 Examples 1268   
1.115.3 Description 1268   
1.115.4 Restrictions 1270   
1.115.5 Related commands 1270   
1.115.6 Default 1270   
1.116 write_coeff command 1271   
1.116.1 Syntax . 1271   
1.116.2 Examples 1271   
1.116.3 Description 1271   
1.116.4 Restrictions 1271   
1.116.5 Related commands 1271   
.117 write_data command 1271   
1.117.1 Syntax . 1271   
1.117.2 Examples 1272   
1.117.3 Description 1272   
1.117.4 Restrictions 1273   
1.117.5 Related commands 1273   
1.117.6 Default 1273   
8 write_dump command 1274   
1.118.1 Syntax . 1274   
1.118.2 Examples 1274   
1.118.3 Description 1274  

1.118.4 Restrictions 1275  

1.118.5 Related commands 1275   
1.118.6 Default 1275   
.119 write_restart command 1275   
1.119.1 Syntax . 1275   
1.119.2 Examples 1275   
1.119.3 Description 1275   
1.119.4 Restrictions 1276   
1.119.5 Related commands 1276   
1.119.6 Default 1276  

# 2 Fix Styles 1277  

2.1 fix accelerate/cos command . 1277   
2.1.1 Syntax . 1277   
2.1.2 Examples . 1277   
2.1.3 Description . . 1277   
2.1.4 Restart, fix_modify, output, run start/stop, minimize info 1278   
2.1.5 Restrictions . . . 1278   
2.1.6 Related commands 1278   
2.1.7 Default 1278   
2.2 fix acks2/reaxff command . 1278   
2.2.1 Syntax . 1278   
2.2.2 Examples 1279   
2.2.3 Description 1279   
2.2.4 Restart, fix_modify, output, run start/stop, minimize info 1279   
2.2.5 Restrictions . . 1280   
2.2.6 Related commands 1280   
2.2.7 Default 1280   
2.3 fix adapt command 1280   
2.3.1 Syntax . 1280   
2.3.2 Examples . . 1281   
2.3.3 Description 1281   
2.3.4 Restart, fix_modify, output, run start/stop, minimize info 1286   
2.3.5 Restrictions 1286   
2.3.6 Related commands 1286   
2.3.7 Default 1286   
2.4 fix adapt/fep command 1286   
2.4.1 Syntax . 1286   
2.4.2 Examples 1287   
2.4.3 Description 1287   
2.4.4 Restart, fix_modify, output, run start/stop, minimize info 1290   
2.4.5 Restrictions . . 1290   
2.4.6 Related commands 1291   
2.4.7 Default 1291   
2.5 fix add/heat command . 1291   
2.5.1 Syntax 1291   
2.5.2 Examples 1291   
2.5.3 Description 1291   
2.5.4 Restart, fix_modify, output, run start/stop, minimize info 1292   
2.5.5 Restrictions . 1292   
2.5.6 Related commands 1292   
2.5.7 Default 1292   
2.6 fix addforce command 1292   
2.6.1 Syntax . 1292   
2.6.2 Examples 1293   
2.6.3 Description 1293   
2.6.4 Restart, fix_modify, output, run start/stop, minimize info 1294   
2.6.5 Restrictions 1294   
2.6.6 Related commands 1294   
2.6.7 Default 1294   
2.7 fix addtorque command . 1294   
2.7.1 Syntax . 1294   
2.7.2 Examples 1295   
2.7.3 Description 1295   
2.7.4 Restart, fix_modify, output, run start/stop, minimize info 1295   
2.7.5 Restrictions 1296   
2.7.6 Related commands 1296   
2.7.7 Default 1296   
2.8 fix alchemy command . 1296   
2.8.1 Syntax . 1296   
2.8.2 Examples 1296   
2.8.3 Description 1296   
2.8.4 Restart, fix_modify, output, run start/stop, minimize info 1297   
2.8.5 Restrictions 1298   
2.8.6 Related commands 1298   
2.8.7 Default 1298   
2.9 fix amoeba/bitorsion command 1298   
2.9.1 Syntax . 1298   
2.9.2 Examples 1298   
2.9.3 Description 1298   
2.9.4 Restart, fix_modify, output, run start/stop, minimize info 1299   
2.9.5 Restrictions 1300   
2.9.6 Related commands 1300   
2.9.7 Default 1300   
2.10 fix amoeba/pitorsion command 1300   
2.10.1 Syntax . 1300   
2.10.2 Examples 1300   
2.10.3 Description 1300   
2.10.4 Restart, fix_modify, output, run start/stop, minimize info 1301   
2.10.5 Restrictions 1302   
2.10.6 Related commands 1302   
2.10.7 Default 1302   
2.11 fix append/atoms command . 1302   
2.11.1 Syntax . 1302   
2.11.2 Examples 1303   
2.11.3 Description 1303   
2.11.4 Restart, fix_modify, output, run start/stop, minimize info 1303   
2.11.5 Restrictions 1303   
2.11.6 Related commands 1304   
2.11.7 Default 1304   
2.12 fix atc command 1304   
2.12.1 Syntax . 1304   
2.12.2 Examples 1304   
2.12.3 Description 1304   
2.12.4 Restart, fix_modify, output, run start/stop, minimize info 1306   
2.12.5 Restrictions 1306   
2.12.6 Related commands 1307   
2.12.7 Default 1309   
2.13 fix atom/swap command 1309   
2.13.1 Syntax . 1309   
2.13.2 Examples 1310   
2.13.3 Description 1310   
2.13.4 Restart, fix_modify, output, run start/stop, minimize info 1311   
2.13.5 Restrictions 1312   
2.13.6 Related commands 1312   
2.13.7 Default 1312   
2.14 fix ave/atom command 1312   
2.14.1 Syntax . 1312   
2.14.2 Examples 1313   
2.14.3 Description 1313   
2.14.4 Restart, fix_modify, output, run start/stop, minimize info 1314   
2.14.5 Restrictions 1314   
2.14.6 Related commands 1314   
2.14.7 Default 1314   
2.15 fix ave/chunk command . 1315   
2.15.1 Syntax . 1315   
2.15.2 Examples 1316   
2.15.3 Description 1316   
2.15.4 Restart, fix_modify, output, run start/stop, minimize info 1321   
2.15.5 Restrictions 1321   
2.15.6 Related commands 1321   
2.15.7 Default 1321   
2.16 fix ave/correlate command 1321   
2.16.1 Syntax . 1321   
2.16.2 Examples 1322   
2.16.3 Description 1322   
2.16.4 Restart, fix_modify, output, run start/stop, minimize info 1325   
2.16.5 Restrictions 1326   
2.16.6 Related commands 1326   
2.16.7 Default 1326   
2.17 fix ave/correlate/long command 1326   
2.17.1 Syntax . 1326   
2.17.2 Examples 1327   
2.17.3 Description 1327   
2.17.4 Restart, fix_modify, output, run start/stop, minimize info 1328   
2.17.5 Restrictions 1328   
2.17.6 Related commands 1328   
2.17.7 Default 1328   
2.18 fix ave/grid command . 1328   
2.18.1 Syntax . 1328   
2.18.2 Examples 1330   
2.18.3 Description 1330   
2.18.4 Restart, fix_modify, output, run start/stop, minimize info 1334   
2.18.5 Restrictions 1334   
2.18.6 Related commands 1334   
2.18.7 Default 1335   
2.19 fix ave/histo command 1335   
2.20 fix ave/histo/weight command 1335   
2.20.1 Syntax . 1335   
2.20.2 Examples 1336   
2.20.3 Description 1336   
2.20.4 Restart, fix_modify, output, run start/stop, minimize info 1339   
2.20.5 Restrictions 1340   
2.20.6 Related commands 1340   
2.20.7 Default 1340   
2.21 fix ave/spatial command 1340   
2.22 fix ave/spatial/sphere command . 1340   
2.23 fix ave/time command . 1340   
2.23.1 Syntax . 1340   
2.23.2 Examples 1341   
2.23.3 Description 1341   
2.23.4 Restart, fix_modify, output, run start/stop, minimize info 1344   
2.23.5 Restrictions 1345   
2.23.6 Related commands 1345   
2.23.7 Default 1345   
2.24 fix aveforce command . 1345   
2.24.1 Syntax . 1345   
2.24.2 Examples 1345   
2.24.3 Description 1345   
2.24.4 Restart, fix_modify, output, run start/stop, minimize info 1346   
2.24.5 Restrictions 1346   
2.24.6 Related commands 1346   
2.24.7 Default 1346   
2.25 fix balance command 1346   
2.25.1 Syntax . 1346   
2.25.2 Examples 1347   
2.25.3 Description 1347   
2.25.4 Restart, fix_modify, output, run start/stop, minimize info 1351   
2.25.5 Restrictions 1352   
2.25.6 Related commands 1352   
2.25.7 Default 1352   
2.26 fix bocs command . 1352   
2.26.1 Syntax . 1352   
2.26.2 Examples 1353   
2.26.3 Description 1353   
2.26.4 Restart, fix_modify, output, run start/stop, minimize info 1353   
2.26.5 Restrictions 1354   
2.26.6 Further information . 1354   
fix bond/break command 1354   
2.27.1 Syntax . 1354   
2.27.2 Examples 1354   
2.27.3 Description 1355   
2.27.4 Restart, fix_modify, output, run start/stop, minimize info 1356   
2.27.5 Restrictions 1356   
2.27.6 Related commands 1356   
2.27.7 Default 1356   
2.28 fix bond/create command . 1356   
2.29 fix bond/create/angle command . 1356   
2.29.1 Syntax . 1356   
2.29.2 Examples 1357   
2.29.3 Description 1357   
2.29.4 Restart, fix_modify, output, run start/stop, minimize info 1359   
2.29.5 Restrictions 1360   
2.29.6 Related commands 1360   
2.29.7 Default 1360   
2.30 fix bond/react command 1360   
2.30.1 Syntax . 1360   
2.30.2 Examples 1361   
2.30.3 Description 1362   
2.30.4 Restart, fix_modify, output, run start/stop, minimize info 1369   
2.30.5 Restrictions 1370   
2.30.6 Related commands 1370   
2.30.7 Default 1370   
2.31 fix bond/swap command 1370   
2.31.1 Syntax . 1370   
2.31.2 Examples 1370   
2.31.3 Description 1370   
2.31.4 Restart, fix_modify, output, run start/stop, minimize info 1373   
2.31.5 Restrictions 1373   
2.31.6 Related commands 1373   
2.31.7 Default 1373   
2.32 fix box/relax command 1373   
2.32.1 Syntax . 1373   
2.32.2 Examples 1374   
2.32.3 Description 1374   
2.32.4 Restart, fix_modify, output, run start/stop, minimize info 1377   
2.32.5 Restrictions 1378   
2.32.6 Related commands 1378   
2.32.7 Default 1378   
2.33 fix brownian command 1378   
2.34 fix brownian/sphere command 1378   
2.35 fix brownian/asphere command . 1378   
2.35.1 Syntax . 1378   
2.35.2 Examples 1379   
2.35.3 Description 1379   
2.35.4 Restart, fix_modify, output, run start/stop, minimize info 1381   
2.35.5 Restrictions 1381   
2.35.6 Related commands 1381   
2.35.7 Default 1381   
2.36 fix charge/regulation command . 1381   
2.36.1 Syntax . 1381   
2.36.2 Examples 1382   
2.36.3 Description 1382   
2.36.4 Output . 1384   
2.36.5 Restrictions 1384   
2.36.6 Related commands 1385   
2.36.7 Default 1385   
2.37 fix cmap command 1385   
2.37.1 Syntax . 1385   
2.37.2 Examples 1385   
2.37.3 Description 1386   
2.37.4 Restart, fix_modify, output, run start/stop, minimize info 1386   
2.37.5 Restrictions 1387   
2.37.6 Related commands 1387   
2.37.7 Default 1387   
2.38 fix colvars command 1388   
2.38.1 Syntax . 1388   
2.38.2 Examples 1388   
2.38.3 Description 1388   
2.38.4 Restarting 1389   
2.38.5 Output . 1389   
2.38.6 Controlling Colvars via fix_modify 1390   
2.38.7 Restrictions 1390   
2.38.8 Related commands 1390   
2.39 fix controller command . 1391   
2.39.1 Syntax . 1391   
2.39.2 Examples 1391   
2.39.3 Description 1391   
2.39.4 Restart, fix_modify, output, run start/stop, minimize info 1393   
2.39.5 Restrictions 1393   
2.39.6 Related commands 1393   
2.39.7 Default 1393   
2.40 fix damping/cundall command 1394   
2.40.1 Syntax . 1394   
2.40.2 Examples 1394   
2.40.3 Description 1394   
2.40.4 Restart, fix_modify, output, run start/stop, minimize info . . 1395   
2.40.5 Restrictions 1395   
2.40.6 Related commands 1395   
2.40.7 Default 1395   
2.40.8 References . 1395   
2.41 fix deform command 1395   
2.41.1 Syntax . 1396   
2.41.2 Examples 1397   
2.41.3 Description 1397   
2.41.4 Restart, fix_modify, output, run start/stop, minimize info 1403   
2.41.5 Restrictions 1403   
2.41.6 Related commands 1403   
2.41.7 Default 1403   
2.42 fix deform/pressure command 1403   
2.42.1 Syntax . 1403   
2.42.2 Examples 1405   
2.42.3 Description 1405   
2.42.4 Restart, fix_modify, output, run start/stop, minimize info 1408   
2.42.5 Restrictions 1408   
2.42.6 Related commands 1408   
2.42.7 Default 1408   
2.43 fix deposit command 1408   
2.43.1 Syntax . 1408   
2.43.2 Examples 1410   
2.43.3 Description 1410   
2.43.4 Restart, fix_modify, output, run start/stop, minimize info 1412   
2.43.5 Restrictions 1413   
2.43.6 Related commands 1413   
2.43.7 Default 1413   
2.44 fix dpd/energy command 1413   
2.44.1 Syntax . 1413   
2.44.2 Examples 1413   
2.44.3 Description 1413   
2.44.4 Restrictions 1414   
2.44.5 Related commands 1414   
2.44.6 Default 1414   
2.45 fix edpd/source command . 1414   
fix tdpd/source command . 1414   
2.46.1 Syntax . 1414   
2.46.2 Examples 1415   
2.46.3 Description 1415   
2.46.4 Restart, fix_modify, output, run start/stop, minimize info 1415   
2.46.5 Restrictions 1415   
2.46.6 Related commands 1416   
2.46.7 Default 1416   
2.47 fix drag command . 1416   
2.47.1 Syntax . 1416   
2.47.2 Examples 1416   
2.47.3 Description 1416   
2.47.4 Restart, fix_modify, output, run start/stop, minimize info 1416   
2.47.5 Restrictions 1417   
2.47.6 Related commands 1417   
2.47.7 Default 1417   
2.48 fix drude command 1417   
2.48.1 Syntax . 1417   
2.48.2 Examples 1417   
2.48.3 Description 1417   
2.48.4 Restrictions 1417   
2.48.5 Related commands 1417   
2.48.6 Default 1418   
fix drude/transform/direct command 1418   
2.50 fix drude/transform/inverse command 1418   
2.50.1 Syntax . 1418   
2.50.2 Examples 1418   
2.50.3 Description 1418   
2.50.4 Restart, fix_modify, output, run start/stop, minimize info 1420   
2.50.5 Restrictions 1420   
2.50.6 Related commands 1420   
2.50.7 Default 1420   
2.51 fix dt/reset command 1420   
2.51.1 Syntax . 1420   
2.51.2 Examples 1421   
2.51.3 Description 1421   
2.51.4 Restart, fix_modify, output, run start/stop, minimize info 1422   
2.51.5 Restrictions 1422   
2.51.6 Related commands 1422   
2.51.7 Default 1422   
2.52 fix efield command 1422   
2.53 fix efield/tip4p command 1422   
2.53.1 Syntax . 1422   
2.53.2 Examples 1423   
2.53.3 Description . . 1423   
2.53.4 Restart, fix_modify, output, run start/stop, minimize info 1424   
2.53.5 Restrictions 1425   
2.53.6 Related commands 1425   
2.53.7 Default 1425   
2.54 fix efield/lepton command . 1425   
2.54.1 Syntax . 1425   
2.54.2 Examples . . . 1426   
2.54.3 Description . . . 1426   
2.54.4 Lepton expression syntax and features 1426   
2.54.5 Restart, fix_modify, output, run start/stop, minimize info 1428   
2.54.6 Restrictions 1428  

# xxxiv  

2.54.7 Related commands 1428   
2.54.8 Default 1428   
2.55 fix ehex command . 1428   
2.55.1 Syntax . 1428   
2.55.2 Examples 1429   
2.55.3 Description 1429   
2.55.4 Restart, fix_modify, output, run start/stop, minimize info 1431   
2.55.5 Restrictions 1431   
2.55.6 Related commands 1431   
2.55.7 Default 1431   
2.56 fix electrode/conp command 1431   
2.57 fix electrode/conq command 1431   
fix electrode/thermo command 1431   
2.58.1 Syntax . 1431   
2.58.2 Examples 1432   
2.58.3 Description 1432   
2.58.4 Restart, fix_modify, output, run start/stop, minimize info 1435   
2.58.5 Restrictions 1436   
2.58.6 Default 1436   
2.59 fix electron/stopping command . 1437   
fix electron/stopping/fit command 1437   
2.60.1 Syntax . 1437   
2.60.2 Examples 1437   
2.60.3 Description 1437   
2.60.4 Restart, fix_modify, output, run start/stop, minimize info 1439   
2.60.5 Restrictions 1439   
2.60.6 Default 1439   
2.61 fix enforce2d command . 1439   
2.61.1 Syntax . 1440   
2.61.2 Examples 1440   
2.61.3 Description 1440   
2.61.4 Restart, fix_modify, output, run start/stop, minimize info 1440   
2.61.5 Restrictions 1440   
2.61.6 Related commands 1440   
2.61.7 Default 1440   
2.62 fix eos/cv command . 1441   
2.62.1 Syntax . 1441   
2.62.2 Examples 1441   
2.62.3 Description 1441   
2.62.4 Restrictions 1441   
2.62.5 Related commands 1441   
2.62.6 Default 1441   
2.63 fix eos/table command 1441   
2.63.1 Syntax . 1441   
2.63.2 Examples 1442   
2.63.3 Description 1442   
2.63.4 Restrictions 1443   
2.63.5 Related commands 1443   
2.63.6 Default 1443   
.64 fix eos/table/rx command 1443   
2.64.1 Syntax . 1443   
2.64.2 Examples 1444   
2.64.3 Description 1444   
2.64.4 Restrictions 1446   
2.64.5 Related commands 1446   
2.64.6 Default 1446   
2.65 fix evaporate command 1446   
2.65.1 Syntax . 1446   
2.65.2 Examples 1446   
2.65.3 Description 1446   
2.65.4 Restart, fix_modify, output, run start/stop, minimize info 1447   
2.65.5 Restrictions 1447   
2.65.6 Related commands 1447   
2.65.7 Default 1447   
2.66 fix external command 1447   
2.66.1 Syntax . 1447   
2.66.2 Examples 1448   
2.66.3 Description 1448   
2.66.4 Restart, fix_modify, output, run start/stop, minimize info 1449   
2.66.5 Restrictions 1450   
2.66.6 Related commands 1450   
2.66.7 Default 1450   
2.67 fix ffl command 1450   
2.67.1 Syntax . 1450   
2.67.2 Examples 1450   
2.67.3 Description 1450   
2.67.4 Restart, fix_modify, output, run start/stop, minimize info 1451   
2.67.5 Restrictions 1451   
2.67.6 Related commands 1451   
2.68 fix filter/corotate command 1452   
2.68.1 Syntax . 1452   
2.68.2 Examples 1452   
2.68.3 Description 1452   
2.68.4 Restart, fix_modify, output, run start/stop, minimize info 1452   
2.68.5 Restrictions 1452   
2.68.6 Related commands 1453   
2.68.7 Default 1453   
2.69 fix flow/gauss command 1453   
2.69.1 Syntax . 1453   
2.69.2 Examples 1453   
2.69.3 Description 1453   
2.69.4 Restart, fix_modify, output, run start/stop, minimize info 1454   
2.69.5 Restrictions 1455   
2.69.6 Related commands 1455   
2.69.7 Default 1455   
2.70 fix freeze command 1455   
2.70.1 Syntax . 1455   
2.70.2 Examples 1455   
2.70.3 Description 1455   
2.70.4 Restart, fix_modify, output, run start/stop, minimize info 1456   
2.70.5 Restrictions 1456   
2.70.6 Related commands 1456   
2.70.7 Default 1456   
2.71 fix gcmc command 1456   
2.71.1 Syntax . 1456   
2.71.2 Examples 1457   
2.71.3 Description 1457   
2.71.4 Restart, fix_modify, output, run start/stop, minimize info 1461   
2.71.5 Restrictions 1462   
2.71.6 Related commands 1462   
2.71.7 Default 1462   
2.72 fix gld command 1462   
2.72.1 Syntax . 1462   
2.72.2 Examples 1463   
2.72.3 Description 1463   
2.72.4 Restart, fix_modify, output, run start/stop, minimize info 1464   
2.72.5 Restrictions 1464   
2.72.6 Related commands 1464   
2.72.7 Default 1464   
2.73 fix gle command 1465   
2.73.1 Syntax . 1465   
2.73.2 Examples 1465   
2.73.3 Description 1465   
2.73.4 Restart, fix_modify, output, run start/stop, minimize info 1466   
2.73.5 Restrictions 1466   
2.73.6 Related commands 1466   
2.74 fix gravity command 1467   
2.74.1 Syntax . 1467   
2.74.2 Examples 1467   
2.74.3 Description 1467   
2.74.4 Restart, fix_modify, output, run start/stop, minimize info 1468   
2.74.5 Restrictions 1468   
2.74.6 Related commands 1468   
2.74.7 Default 1468   
2.75 fix grem command 1469   
2.75.1 Syntax . 1469   
2.75.2 Examples 1469   
2.75.3 Description 1469   
2.75.4 Restart, fix_modify, output, run start/stop, minimize info 1470   
2.75.5 Restrictions 1470   
2.75.6 Related commands 1470   
2.75.7 Default 1470   
2.76 fix halt command 1470   
2.76.1 Syntax . 1470   
2.76.2 Examples 1471   
2.76.3 Description 1471   
2.76.4 Restart, fix_modify, output, run start/stop, minimize info 1472   
2.76.5 Restrictions 1472   
2.76.6 Related commands 1472   
2.76.7 Default 1472   
2.77 fix heat command . 1472   
2.77.1 Syntax . 1472   
2.77.2 Examples 1473   
2.77.3 Description 1473   
2.77.4 Restart, fix_modify, output, run start/stop, minimize info 1474   
2.77.5 Restrictions 1474   
2.77.6 Related commands 1474   
2.77.7 Default 1474   
2.78 fix heat/flow command 1474   
2.78.1 Syntax . 1474   
2.78.2 Examples 1475   
2.78.3 Description 1475   
2.78.4 Restart, fix_modify, output, run start/stop, minimize info 1475   
2.78.5 Restrictions 1475   
2.78.6 Related commands 1475   
2.78.7 Default 1475   
2.79 fix hyper/global command 1475   
2.79.1 Syntax . 1475   
2.79.2 Examples 1476   
2.79.3 Description 1476   
2.79.4 Restart, fix_modify, output, run start/stop, minimize info 1478   
2.79.5 Restrictions 1479   
2.79.6 Related commands 1479   
2.79.7 Default 1479   
2.80 fix hyper/local command 1479   
2.80.1 Syntax . 1479   
2.80.2 Examples 1479   
2.80.3 Description 1480   
2.80.4 Restart, fix_modify, output, run start/stop, minimize info 1483   
2.80.5 Restrictions 1486   
2.80.6 Related commands 1486   
2.80.7 Default 1486   
2.81 fix imd command 1486   
2.81.1 Syntax . 1486   
2.81.2 Examples 1487   
2.81.3 Description 1487   
2.81.4 Restart, fix_modify, output, run start/stop, minimize info 1488   
2.81.5 Restrictions 1488   
2.81.6 Related commands 1488   
2.81.7 Default 1488   
2.82 fix indent command . 1488   
2.82.1 Syntax . 1488   
2.82.2 Examples 1489   
2.82.3 Description 1489   
2.82.4 Restart, fix_modify, output, run start/stop, minimize info 1491   
2.82.5 Restrictions 1491   
2.82.6 Related commands 1491   
2.82.7 Default 1492   
2.83 fix ipi command . 1492   
2.83.1 Syntax 1492   
2.83.2 Examples 1492   
2.83.3 Description 1492   
2.83.4 Obtaining i-PI 1493   
2.83.5 Restart, fix_modify, output, run start/stop, minimize info 1493   
2.83.6 Restrictions 1493   
2.83.7 Related commands 1493   
2.84 fix langevin command . 1493   
2.84.1 Syntax . 1493   
2.84.2 Examples 1494   
2.84.3 Description 1494   
2.84.4 Restart, fix_modify, output, run start/stop, minimize info 1497   
2.84.5 Restrictions 1497   
2.84.6 Related commands 1497   
2.84.7 Default 1497   
2.85 fix langevin/drude command 1498   
2.85.1 Syntax . 1498  

# xxxviii  

2.85.2 Examples 1498   
2.85.3 Description 1498   
2.85.4 Restart, fix_modify, output, run start/stop, minimize info 1501   
2.85.5 Restrictions 1501   
2.85.6 Related commands 1501   
2.85.7 Default 1501   
2.86 fix langevin/eff command . 1501   
2.86.1 Syntax . 1501   
2.86.2 Examples 1502   
2.86.3 Description 1502   
2.86.4 Restart, fix_modify, output, run start/stop, minimize info 1502   
2.86.5 Restrictions 1503   
2.86.6 Related commands 1503   
2.86.7 Default 1503   
2.87 fix langevin/spin command 1503   
2.87.1 Syntax . 1503   
2.87.2 Examples 1503   
2.87.3 Description 1503   
2.87.4 Restart, fix_modify, output, run start/stop, minimize info 1504   
2.87.5 Restrictions 1504   
2.87.6 Related commands 1504   
2.87.7 Default 1504   
2.88 fix lb/fluid command 1505   
2.88.1 Syntax . 1505   
2.88.2 Examples 1506   
2.88.3 Description 1506   
2.88.4 Restart, fix_modify, output, run start/stop, minimize info 1509   
2.88.5 Restrictions 1509   
2.88.6 Related commands 1510   
2.88.7 Default 1510   
2.89 fix lb/momentum command . 1510   
2.89.1 Syntax . 1510   
2.89.2 Examples 1510   
2.89.3 Description 1510   
2.89.4 Restart, fix_modify, output, run start/stop, minimize info 1511   
2.89.5 Restrictions 1511   
2.89.6 Related commands 1511   
2.89.7 Default 1511   
2.90 fix lb/viscous command . 1511   
2.90.1 Syntax . 1511   
2.90.2 Examples 1511   
2.90.3 Description 1511   
2.90.4 Restart, fix_modify, output, run start/stop, minimize info 1512   
2.90.5 Restrictions 1512   
2.90.6 Related commands 1512   
2.90.7 Default 1512   
2.91 fix lineforce command 1512   
2.91.1 Syntax . 1512   
2.91.2 Examples 1513   
2.91.3 Description 1513   
2.91.4 Restart, fix_modify, output, run start/stop, minimize info 1513   
2.91.5 Restrictions 1513   
2.91.6 Related commands 1513   
2.91.7 Default 1513   
2.92 fix manifoldforce command 1513   
2.92.1 Syntax . 1513   
2.92.2 Examples 1513   
2.92.3 Description 1513   
2.92.4 Restart, fix_modify, output, run start/stop, minimize info 1514   
2.92.5 Restrictions 1514   
2.92.6 Related commands 1514   
2.93 fix mdi/qm command . 1514   
2.93.1 Syntax . 1514   
2.93.2 Examples 1514   
2.93.3 Description 1515   
2.93.4 Restart, fix_modify, output, run start/stop, minimize info 1517   
2.93.5 Restrictions 1517   
2.93.6 Related commands 1517   
2.93.7 Default 1518   
2.94 fix mdi/qmmm command 1518   
2.94.1 Syntax . 1518   
2.94.2 Examples 1518   
2.94.3 Description 1518   
2.94.4 Restart, fix_modify, output, run start/stop, minimize info 1520   
2.94.5 Restrictions 1521   
2.94.6 Related commands 1521   
2.94.7 Default 1521   
2.95 fix meso/move command 1521   
2.95.1 Syntax . 1521   
2.95.2 Examples 1522   
2.95.3 Description 1522   
2.95.4 Restart, fix_modify, output, run start/stop, minimize info 1524   
2.95.5 Restrictions 1524   
2.95.6 Related commands 1524   
2.95.7 Default 1524   
2.96 fix mol/swap command 1525   
2.96.1 Syntax 1525   
2.96.2 Examples 1525   
2.96.3 Description 1525   
2.96.4 Restart, fix_modify, output, run start/stop, minimize info 1526   
2.96.5 Restrictions 1527   
2.96.6 Related commands 1527   
2.96.7 Default 1527   
2.97 fix momentum command 1527   
2.98 fix momentum/chunk command 1527   
2.98.1 Syntax . 1527   
2.98.2 Examples 1528   
2.98.3 Description 1528   
2.98.4 Restart, fix_modify, output, run start/stop, minimize info 1528   
2.98.5 Restrictions 1528   
2.98.6 Related commands 1529   
2.98.7 Default 1529   
2.99 fix move command 1529   
2.99.1 Syntax . 1529   
2.99.2 Examples 1529   
2.99.3 Description 1530   
2.99.4 Restart, fix_modify, output, run start/stop, minimize info 1532   
2.99.5 Restrictions 1532   
2.99.6 Related commands 1532   
2.99.7 Default 1532   
2.100 fix msst command . 1532   
2.100.1 Syntax . 1532   
2.100.2 Examples 1533   
2.100.3 Description 1533   
2.100.4 Restart, fix_modify, output, run start/stop, minimize info 1534   
2.100.5 Restrictions 1535   
2.100.6 Related commands 1535   
2.100.7 Default 1535   
2.101 fix mvv/dpd command 1535   
2.102 fix mvv/edpd command 1535   
2.103 fix mvv/tdpd command 1535   
2.103.1 Syntax . 1535   
2.103.2 Examples 1535   
2.103.3 Description 1536   
2.103.4 Restart, fix_modify, output, run start/stop, minimize info 1536   
2.103.5 Restrictions 1536   
2.103.6 Related commands 1536   
2.103.7 Default 1536   
2.104 fix neb command 1537   
2.104.1 Syntax . 1537   
2.104.2 Examples 1537   
2.104.3 Description 1537   
2.104.4 Restart, fix_modify, output, run start/stop, minimize info 1539   
2.104.5 Restrictions 1539   
2.104.6 Related commands 1539   
2.104.7 Default 1540   
2.105 fix neb/spin command . 1540   
2.105.1 Syntax . 1540   
2.105.2 Examples 1540   
2.105.3 Description 1540   
2.105.4 Restart, fix_modify, output, run start/stop, minimize info 1540   
2.105.5 Restrictions 1541   
2.105.6 Related commands 1541   
2.105.7 Default 1541   
2.106 fix nvt command 1541   
2.107 fix npt command 1541   
2.108 fix nph command 1541   
2.108.1 Syntax . 1541   
2.108.2 Examples 1542   
2.108.3 Description 1542   
2.108.4 Restart, fix_modify, output, run start/stop, minimize info 1548   
2.108.5 Restrictions 1549   
2.108.6 Related commands 1549   
2.108.7 Default 1549   
2.109 fix nvt/eff command . 1550   
2.110 fix npt/eff command . 1550   
2.111 fix nph/eff command 1550   
2.111.1 Syntax . 1550   
2.111.2 Examples 1550   
2.111.3 Description 1551   
2.111.4 Restart, fix_modify, output, run start/stop, minimize info 1551   
2.111.5 Restrictions 1551   
2.111.6 Related commands 1552   
2.111.7 Default 1552   
2.112 fix nvt/uef command 1552   
2.113 fix npt/uef command 1552   
2.113.1 Syntax . 1552   
2.113.2 Examples 1552   
2.113.3 Description 1553   
2.113.4 Restart, fix_modify, output, run start/stop, minimize info 1554   
2.113.5 Restrictions 1555   
2.113.6 Related commands 1555   
2.113.7 Default 1555   
2.114 fix nonaffine/displacement command . 1555   
2.114.1 Syntax . 1555   
2.114.2 Examples 1556   
2.114.3 Description 1556   
2.114.4 Restart, fix_modify, output, run start/stop, minimize info 1557   
2.114.5 Restrictions 1557   
2.114.6 Related commands 1557   
2.114.7 Default 1557   
2.115 fix nph/asphere command . 1557   
2.115.1 Syntax . 1557   
2.115.2 Examples 1557   
2.115.3 Description 1558   
2.115.4 Restart, fix_modify, output, run start/stop, minimize info 1558   
2.115.5 Restrictions 1559   
2.115.6 Related commands 1559   
2.115.7 Default 1559   
2.116 fix nph/body command 1559   
2.116.1 Syntax . 1559   
2.116.2 Examples 1559   
2.116.3 Description 1559   
2.116.4 Restart, fix_modify, output, run start/stop, minimize info 1560   
2.116.5 Restrictions 1560   
2.116.6 Related commands 1561   
2.116.7 Default 1561   
2.117 fix nph/sphere command 1561   
2.117.1 Syntax . 1561   
2.117.2 Examples 1561   
2.117.3 Description 1561   
2.117.4 Restart, fix_modify, output, run start/stop, minimize info 1562   
2.117.5 Restrictions 1562   
2.117.6 Related commands 1563   
2.117.7 Default 1563   
2.118 fix nphug command . 1563   
2.118.1 Syntax . 1563   
2.118.2 Examples 1563   
2.118.3 Description 1563   
2.118.4 Restart, fix_modify, output, run start/stop, minimize info 1565   
2.118.5 Restrictions 1565   
2.118.6 Related commands 1566   
2.118.7 Default 1566   
2.119 fix npt/asphere command 1566   
2.119.1 Syntax . 1566   
2.119.2 Examples 1566   
2.119.3 Description 1566   
2.119.4 Restart, fix_modify, output, run start/stop, minimize info 1567   
2.119.5 Restrictions 1568   
2.119.6 Related commands 1568   
2.119.7 Default 1568   
2.120 fix npt/body command 1568   
2.120.1 Syntax 1568   
2.120.2 Examples 1568   
2.120.3 Description 1568   
2.120.4 Restart, fix_modify, output, run start/stop, minimize info 1569   
2.120.5 Restrictions 1570   
2.120.6 Related commands 1570   
2.120.7 Default 1570   
2.121 fix npt/cauchy command 1570   
2.121.1 Syntax . 1570   
2.121.2 Examples 1571   
2.121.3 Description 1571   
2.121.4 Restart, fix_modify, output, run start/stop, minimize info 1576   
2.121.5 Restrictions 1577   
2.121.6 Related commands 1577   
2.121.7 Default 1577   
2.122 fix npt/sphere command 1578   
2.122.1 Syntax . 1578   
2.122.2 Examples 1578   
2.122.3 Description 1578   
2.122.4 Restart, fix_modify, output, run start/stop, minimize info 1579   
2.122.5 Restrictions 1580   
2.122.6 Related commands 1580   
2.122.7 Default 1580   
2.123 fix numdiff command . 1580   
2.123.1 Syntax . 1580   
2.123.2 Examples 1580   
2.123.3 Description 1580   
2.123.4 Restart, fix_modify, output, run start/stop, minimize info 1581   
2.123.5 Restrictions 1581   
2.123.6 Related commands 1581   
2.123.7 Default 1581   
2.124 fix numdiff/virial command . 1582   
2.124.1 Syntax . 1582   
2.124.2 Examples 1582   
2.124.3 Description 1582   
2.124.4 Restart, fix_modify, output, run start/stop, minimize info 1583   
2.124.5 Restrictions 1583   
2.124.6 Related commands 1583   
2.124.7 Default 1583   
2.125 fix nve command 1583   
2.125.1 Syntax . 1583   
2.125.2 Examples 1583   
2.125.3 Description 1583   
2.125.4 Restart, fix_modify, output, run start/stop, minimize info 1584   
2.125.5 Restrictions 1584   
2.125.6 Related commands 1584   
2.125.7 Default 1584   
2.126 fix nve/asphere command . 1584   
2.126.1 Syntax . 1584   
2.126.2 Examples 1584   
2.126.3 Description 1584   
2.126.4 Restart, fix_modify, output, run start/stop, minimize info 1585   
2.126.5 Restrictions 1585   
2.126.6 Related commands 1585   
2.126.7 Default 1585   
2.127 fix nve/asphere/noforce command 1585   
2.127.1 Syntax . 1585   
2.127.2 Examples 1585   
2.127.3 Description 1586   
2.127.4 Restart, fix_modify, output, run start/stop, minimize info 1586   
2.127.5 Restrictions 1586   
2.127.6 Related commands 1586   
2.127.7 Default 1586   
2.128 fix nve/awpmd command 1586   
2.128.1 Syntax 1586   
2.128.2 Examples 1586   
2.128.3 Description 1586   
2.128.4 Restart, fix_modify, output, run start/stop, minimize info 1587   
2.128.5 Restrictions 1587   
2.128.6 Related commands 1587   
2.128.7 Default 1587   
2.129 fix nve/body command 1587   
2.129.1 Syntax 1587   
2.129.2 Examples 1587   
2.129.3 Description 1587   
2.129.4 Restart, fix_modify, output, run start/stop, minimize info 1587   
2.129.5 Restrictions 1588   
2.129.6 Related commands 1588   
2.129.7 Default 1588   
2.130 fix nve/bpm/sphere command . 1588   
2.130.1 Syntax . 1588   
2.130.2 Examples 1588   
2.130.3 Description 1588   
2.130.4 Restart, fix_modify, output, run start/stop, minimize info 1589   
2.130.5 Restrictions 1589   
2.130.6 Related commands 1589   
2.130.7 Default 1589   
2.131 fix nve/dot command 1589   
2.131.1 Syntax . 1589   
2.131.2 Examples 1589   
2.131.3 Description 1589   
2.131.4 Restrictions 1590   
2.131.5 Related commands 1590   
2.131.6 Default 1590   
2.132 fix nve/dotc/langevin command . 1590   
2.132.1 Syntax . 1590   
2.132.2 Examples 1590   
2.132.3 Description 1590   
2.132.4 Restrictions 1592   
2.132.5 Related commands 1592   
2.132.6 Default 1592   
2.133 fix nve/eff command 1592   
2.133.1 Syntax . 1592   
2.133.2 Examples 1592   
2.133.3 Description 1592   
2.133.4 Restart, fix_modify, output, run start/stop, minimize info 1592   
2.133.5 Restrictions 1593   
2.133.6 Related commands 1593   
2.133.7 Default 1593   
2.134 fix nve/limit command 1593   
2.134.1 Syntax . 1593   
2.134.2 Examples 1593   
2.134.3 Description 1593   
2.134.4 Restart, fix_modify, output, run start/stop, minimize info 1594   
2.134.5 Restrictions 1594   
2.134.6 Related commands 1594   
2.134.7 Default 1594   
2.135 fix nve/line command . 1594   
2.135.1 Syntax . 1594   
2.135.2 Examples 1595   
2.135.3 Description 1595   
2.135.4 Restart, fix_modify, output, run start/stop, minimize info 1595   
2.135.5 Restrictions 1595   
2.135.6 Related commands 1595   
2.135.7 Default 1595   
2.136 fix nve/manifold/rattle command 1595   
2.136.1 Syntax . 1595   
2.136.2 Examples 1596   
2.136.3 Description 1596   
2.136.4 Restart, fix_modify, output, run start/stop, minimize info 1596   
2.136.5 Restrictions 1596   
2.136.6 Related commands 1596   
2.136.7 Default 1596   
2.137 fix nve/noforce command . 1597   
2.137.1 Syntax . 1597   
2.137.2 Examples 1597   
2.137.3 Description 1597   
2.137.4 Restart, fix_modify, output, run start/stop, minimize info 1597   
2.137.5 Restrictions 1597   
2.137.6 Related commands 1597   
2.137.7 Default 1597   
2.138 fix nve/sphere command 1597   
2.138.1 Syntax . 1597   
2.138.2 Examples 1598   
2.138.3 Description 1598   
2.138.4 Restart, fix_modify, output, run start/stop, minimize info 1598   
2.138.5 Restrictions 1599   
2.138.6 Related commands 1599   
2.138.7 Default 1599   
2.139 fix nve/spin command . 1599   
2.139.1 Syntax . 1599   
2.139.2 Examples 1599   
2.139.3 Description 1599   
2.139.4 Restrictions 1600   
2.139.5 Related commands 1600   
2.139.6 Default 1600   
2.140 fix nve/tri command . 1600   
2.140.1 Syntax . 1600   
2.140.2 Examples 1601   
2.140.3 Description . . . 1601   
2.140.4 Restart, fix_modify, output, run start/stop, minimize info 1601   
2.140.5 Restrictions 1601   
2.140.6 Related commands 1601   
2.140.7 Default 1601   
2.141 fix nvk command 1601   
2.141.1 Syntax . 1601   
2.141.2 Examples 1601   
2.141.3 Description 1602   
2.141.4 Restart, fix_modify, output, run start/stop, minimize info 1602   
2.141.5 Restrictions . 1602   
2.141.6 Related commands 1602   
2.141.7 Default 1602   
fix nvt/asphere command 1602   
2.142.1 Syntax . 1602   
2.142.2 Examples 1603   
2.142.3 Description 1603   
2.142.4 Restart, fix_modify, output, run start/stop, minimize info 1604   
2.142.5 Restrictions 1604   
2.142.6 Related commands 1604   
2.142.7 Default 1604   
2.143 fix nvt/body command 1604   
2.143.1 Syntax . 1604   
2.143.2 Examples 1604   
2.143.3 Description 1605   
2.143.4 Restart, fix_modify, output, run start/stop, minimize info 1605   
2.143.5 Restrictions 1606   
2.143.6 Related commands 1606   
2.143.7 Default 1606   
fix nvt/manifold/rattle command 1606   
2.144.1 Syntax . 1606   
2.144.2 Examples 1606   
2.144.3 Description 1606   
2.144.4 Restart, fix_modify, output, run start/stop, minimize info 1607   
2.144.5 Restrictions 1607   
2.144.6 Related commands 1607   
2.145 fix nvt/sllod command 1607   
2.145.1 Syntax . 1607   
2.145.2 Examples 1607   
2.145.3 Description 1607   
2.145.4 Restart, fix_modify, output, run start/stop, minimize info 1609   
2.145.5 Restrictions 1609   
2.145.6 Related commands 1609   
2.145.7 Default 1609   
fix nvt/sllod/eff command . 1610   
2.146.1 Syntax . 1610   
2.146.2 Examples 1610   
2.146.3 Description 1610   
2.146.4 Restart, fix_modify, output, run start/stop, minimize info 1610   
2.146.5 Restrictions 1610   
2.146.6 Related commands 1611   
2.146.7 Default 1611   
2.147 fix nvt/sphere command . 1611   
2.147.1 Syntax . 1611   
2.147.2 Examples 1611   
2.147.3 Description 1611   
2.147.4 Restart, fix_modify, output, run start/stop, minimize info 1612   
2.147.5 Restrictions 1613   
2.147.6 Related commands 1613   
2.147.7 Default 1613   
2.148 fix oneway command 1613   
2.148.1 Syntax . 1613   
2.148.2 Examples 1613   
2.148.3 Description 1613   
2.148.4 Restart, fix_modify, output, run start/stop, minimize info 1613   
2.148.5 Restrictions 1614   
2.148.6 Related commands 1614   
2.148.7 Default 1614   
2.149 fix orient/fcc command 1614   
2.150 fix orient/bcc command . 1614   
2.150.1 Syntax . 1614   
2.150.2 Examples 1614   
2.150.3 Description 1614   
2.150.4 Restart, fix_modify, output, run start/stop, minimize info . 1616   
2.150.5 Restrictions 1616   
2.150.6 Related commands 1616   
2.150.7 Default 1616   
2.151 fix orient/eco command . 1617   
2.151.1 Examples 1617   
2.151.2 Description 1617   
2.151.3 Restart, fix_modify, output, run start/stop, minimize info 1618   
2.151.4 Restrictions 1619   
2.151.5 Related commands 1619   
2.151.6 Default 1619   
2.152 fix pafi command 1619   
2.152.1 Syntax . 1619   
2.152.2 Examples 1620   
2.152.3 Description 1620   
2.152.4 Restart, fix_modify, output, run start/stop, minimize info 1620   
2.152.5 Restrictions 1620   
2.152.6 Default 1621   
2.153 fix pair command 1621   
2.153.1 Syntax . 1621   
2.153.2 Examples 1621   
2.153.3 Description 1621   
2.153.4 Restart, fix_modify, output, run start/stop, minimize info 1622   
2.153.5 Restrictions 1622   
2.153.6 Related commands 1622   
2.153.7 Default 1622   
2.154 fix phonon command 1622   
2.154.1 Syntax . 1622   
2.154.2 Examples 1623   
2.154.3 Description 1623   
2.154.4 Restart, fix_modify, output, run start/stop, minimize info 1624   
2.154.5 Restrictions 1624   
2.154.6 Related commands 1624   
2.154.7 Default 1624   
2.155 fix pimd/langevin command 1625   
2.156 fix pimd/nvt command 1625   
2.156.1 Syntax . 1625   
2.156.2 Examples 1626   
2.156.3 Description 1626   
2.156.4 Restart, fix_modify, output, run start/stop, minimize info 1630   
2.156.5 Restrictions 1632   
2.156.6 Default 1632   
2.157 fix planeforce command 1632   
2.157.1 Syntax . 1632   
2.157.2 Examples 1633   
2.157.3 Description 1633   
2.157.4 Restart, fix_modify, output, run start/stop, minimize info 1633   
2.157.5 Restrictions 1633   
2.157.6 Related commands 1633   
2.157.7 Default 1633   
2.158 fix plumed command 1633   
2.158.1 Syntax . 1633   
2.158.2 Examples 1633   
2.158.3 Description 1634   
2.158.4 Restart, fix_modify, output, run start/stop, minimize info 1634   
2.158.5 Restrictions 1635   
2.158.6 Related commands 1635   
2.158.7 Default 1635   
2.159 fix poems command . 1635   
2.159.1 Syntax 1635   
2.159.2 Examples 1635   
2.159.3 Description 1635   
2.159.4 Restart, fix_modify, output, run start/stop, minimize info 1636   
2.159.5 Restrictions 1636   
2.159.6 Related commands 1637   
2.159.7 Default 1637   
2.160 fix polarize/bem/gmres command 1637   
2.161 fix polarize/bem/icc command 1637   
2.162 fix polarize/functional command 1637   
2.162.1 Syntax . 1637   
2.162.2 Examples 1637   
2.162.3 Description 1637   
2.162.4 Restart, fix_modify, output, run start/stop, minimize info 1639   
2.162.5 Restrictions 1639   
2.162.6 Related commands 1640   
2.162.7 Default 1640   
2.163 fix pour command . 1640   
2.163.1 Syntax . 1640   
2.163.2 Examples 1641   
2.163.3 Description 1641   
2.163.4 Restart, fix_modify, output, run start/stop, minimize info 1643   
2.163.5 Restrictions 1643   
2.163.6 Related commands 1644   
2.163.7 Default 1644   
2.164 fix precession/spin command . 1644   
2.164.1 Syntax . 1644   
2.164.2 Examples 1644   
2.164.3 Description 1644   
2.164.4 Restart, fix_modify, output, run start/stop, minimize info 1646   
2.164.5 Restrictions 1646   
2.164.6 Related commands 1646   
2.164.7 Default 1646   
2.165 fix press/berendsen command . 1647   
2.165.1 Syntax . 1647   
2.165.2 Examples 1647   
2.165.3 Description 1647   
2.165.4 Restart, fix_modify, output, run start/stop, minimize info 1649   
2.165.5 Restrictions 1649   
2.165.6 Related commands 1649   
2.165.7 Default 1649   
2.166 fix press/langevin command 1650   
2.166.1 Syntax . 1650   
2.166.2 Examples 1650   
2.166.3 Description 1650   
2.166.4 Restart, fix_modify, output, run start/stop, minimize info 1653   
2.166.5 Restrictions 1653   
2.166.6 Related commands 1653   
2.166.7 Default 1653   
2.167 fix print command 1653   
2.167.1 Syntax . 1653   
2.167.2 Examples 1654   
2.167.3 Description 1654   
2.167.4 Restart, fix_modify, output, run start/stop, minimize info 1655   
2.167.5 Restrictions 1655   
2.167.6 Related commands 1655   
2.167.7 Default 1655   
2.168 fix propel/self command 1655   
2.168.1 Syntax . 1655   
2.168.2 Examples 1655   
2.168.3 Description 1656   
2.168.4 Restart, fix_modify, output, run start/stop, minimize info . . . 1657   
2.168.5 Restrictions 1657   
2.168.6 Related commands 1657   
2.168.7 Default 1657   
2.169 fix property/atom command 1657   
2.169.1 Syntax . 1657   
2.169.2 Examples 1658   
2.169.3 Description 1658   
2.169.4 Restart, fix_modify, output, run start/stop, minimize info 1661   
2.169.5 Restrictions 1661   
2.169.6 Related commands 1661   
2.169.7 Default 1661   
2.170 fix python/invoke command 1662   
2.170.1 Syntax . 1662   
2.170.2 Examples 1662   
2.170.3 Description 1662   
2.170.4 Restart, fix_modify, output, run start/stop, minimize info 1663   
2.170.5 Restrictions 1663   
2.170.6 Related commands 1663   
2.171 fix python/move command 1663   
2.171.1 Syntax . 1663   
2.171.2 Examples 1663   
2.171.3 Description . . 1663   
2.171.4 Restart, fix_modify, output, run start/stop, minimize info 1664   
2.171.5 Restrictions . . . 1664   
2.171.6 Related commands 1664   
2.171.7 Default 1664   
2.172 fix qbmsst command 1665   
2.172.1 Syntax . 1665   
2.172.2 Examples 1665   
2.172.3 Description 1666   
2.172.4 Restart, fix_modify, output, run start/stop, minimize info 1667   
2.172.5 Restrictions 1668   
2.172.6 Related commands 1668   
2.172.7 Default 1668   
2.173 fix qeq/point command 1668   
2.174 fix qeq/shielded command 1668   
2.175 fix qeq/slater command 1668   
2.176 fix qeq/ctip command . 1668   
2.177 fix qeq/dynamic command 1668   
2.178 fix qeq/fire command 1668   
2.178.1 Syntax . 1668   
2.178.2 Examples 1669   
2.178.3 Description 1669   
2.178.4 Restart, fix_modify, output, run start/stop, minimize info 1672   
2.178.5 Restrictions 1672   
2.178.6 Related commands 1672   
2.178.7 Default 1672   
2.179 fix qeq/comb command 1672   
2.179.1 Syntax . 1672   
2.179.2 Examples 1673   
2.179.3 Description 1673   
2.179.4 Restart, fix_modify, output, run start/stop, minimize info 1673   
2.179.5 Restrictions 1674   
2.179.6 Related commands 1674   
2.179.7 Default 1674   
2.180 fix qeq/reaxff command . 1674   
2.180.1 Syntax . 1674   
2.180.2 Examples 1674   
2.180.3 Description 1675   
2.180.4 Restart, fix_modify, output, run start/stop, minimize info 1675   
2.180.5 Restrictions 1676   
2.180.6 Related commands 1676   
2.180.7 Default 1676   
2.181 fix qmmm command 1676   
2.181.1 Syntax . 1676   
2.181.2 Examples 1676   
2.181.3 Description 1677   
2.181.4 Restart, fix_modify, output, run start/stop, minimize info 1677   
2.181.5 Restrictions 1677   
2.181.6 Related commands 1677   
2.181.7 Default 1677   
2.182 fix qtb command 1677   
2.182.1 Syntax . 1677   
2.182.2 Examples 1678   
2.182.3 Description 1678   
2.182.4 Restart, fix_modify, output, run start/stop, minimize info 1679   
2.182.5 Restrictions 1679   
2.182.6 Related commands 1679   
2.182.7 Default 1679   
2.183 fix qtpie/reaxff command 1680   
2.183.1 Syntax . 1680   
2.183.2 Examples 1680   
2.183.3 Description 1680   
2.183.4 Restart, fix_modify, output, run start/stop, minimize info 1681   
2.183.5 Restrictions 1681   
2.183.6 Related commands 1682   
2.183.7 Default 1682   
2.184 fix reaxff/bonds command 1682   
2.184.1 Syntax . 1682   
2.184.2 Examples 1682   
2.184.3 Description 1682   
2.184.4 Restart, fix_modify, output, run start/stop, minimize info 1683   
2.184.5 Restrictions 1683   
2.184.6 Related commands 1683   
2.184.7 Default 1683   
2.185 fix reaxff/species command 1684   
2.185.1 Syntax 1684   
2.185.2 Examples 1684   
2.185.3 Description 1684   
2.185.4 Restart, fix_modify, output, run start/stop, minimize info 1686   
2.185.5 Restrictions 1686   
2.185.6 Related commands 1687   
2.185.7 Default 1687   
2.186 fix recenter command 1687   
2.186.1 Syntax 1687   
2.186.2 Examples 1687   
2.186.3 Description 1687   
2.186.4 Restart, fix_modify, output, run start/stop, minimize info 1688   
2.186.5 Restrictions 1689   
2.186.6 Related commands 1689   
2.186.7 Default 1689   
2.187 fix restrain command 1689   
2.187.1 Syntax . 1689   
2.187.2 Examples 1690   
2.187.3 Description 1690   
2.187.4 Restart, fix_modify, output, run start/stop, minimize info 1692   
2.187.5 Restrictions 1692   
2.187.6 Related commands 1693   
2.187.7 Default 1693   
2.188 fix rheo command . 1693   
2.188.1 Syntax 1693   
2.188.2 Examples 1694   
2.188.3 Description 1694   
2.188.4 Restart, fix_modify, output, run start/stop, minimize info 1695   
2.188.5 Restrictions 1695   
2.188.6 Related commands 1695   
2.188.7 Default 1695   
2.189 fix rheo/oxidation command 1696   
2.189.1 Syntax . 1696   
2.189.2 Examples 1696   
2.189.3 Description 1696   
2.189.4 Restart, fix_modify, output, run start/stop, minimize info . 1696   
2.189.5 Restrictions 1696   
2.189.6 Related commands 1697   
2.189.7 Default 1697   
2.190 fix rheo/pressure command 1697   
2.190.1 Syntax . 1697   
2.190.2 Examples 1697   
2.190.3 Description 1697   
2.190.4 Restart, fix_modify, output, run start/stop, minimize info 1698   
2.190.5 Restrictions 1698   
2.190.6 Related commands 1698   
2.190.7 Default 1698   
.191 fix rheo/thermal command 1698   
2.191.1 Syntax . 1698   
2.191.2 Examples 1699   
2.191.3 Description 1699   
2.191.4 Restart, fix_modify, output, run start/stop, minimize info 1700   
2.191.5 Restrictions 1700   
2.191.6 Related commands 1700   
2.191.7 Default 1700   
2.192 fix rheo/viscosity command . 1700   
2.192.1 Syntax . 1700   
2.192.2 Examples 1701   
2.192.3 Description 1701   
2.192.4 Restart, fix_modify, output, run start/stop, minimize info 1701   
2.192.5 Restrictions 1701   
2.192.6 Related commands 1701   
2.192.7 Default 1701   
2.193 fix rhok command . 1702   
2.193.1 Syntax . 1702   
2.193.2 Examples 1702   
2.193.3 Description 1702   
2.193.4 Restart, fix_modify, output, run start/stop, minimize info 1702   
2.193.5 Restrictions 1702   
2.193.6 Related commands 1703   
2.193.7 Default 1703   
2.194 fix rigid command 1703   
2.195 fix rigid/nve command 1703   
2.196 fix rigid/nvt command 1703   
2.197 fix rigid/npt command 1703   
2.198 fix rigid/nph command 1703   
2.199 fix rigid/small command 1703   
2.200 fix rigid/nve/small command 1703   
2.201 fix rigid/nvt/small command 1703   
2.202 fix rigid/npt/small command 1703   
2.203 fix rigid/nph/small command 1703   
2.203.1 Syntax . 1703   
2.203.2 Examples 1705   
2.203.3 Description 1705   
2.203.4 Restart, fix_modify, output, run start/stop, minimize info 1713   
2.203.5 Restrictions 1714   
2.203.6 Related commands 1714   
2.203.7 Default 1714   
2.204 fix rigid/meso command 1715   
2.204.1 Syntax . 1715   
2.204.2 Examples 1715   
2.204.3 Description 1715   
2.204.4 Restart, fix_modify, output, run start/stop, minimize info 1718   
2.204.5 Restrictions 1719   
2.204.6 Related commands 1719   
2.204.7 Default 1719   
2.205 fix rx command 1719   
2.205.1 Syntax . 1719   
2.205.2 Examples 1720   
2.205.3 Description 1720   
2.205.4 Restrictions 1722   
2.205.5 Related commands 1722   
2.205.6 Default 1722   
2.206 fix saed/vtk command . 1722   
2.206.1 Syntax . 1722   
2.206.2 Examples 1723   
2.206.3 Description 1723   
2.206.4 Restart, fix_modify, output, run start/stop, minimize info 1724   
2.206.5 Restrictions 1725   
2.206.6 Related commands 1725   
2.206.7 Default 1725   
2.207 fix setforce command 1725   
2.208 fix setforce/spin command 1725   
2.208.1 Syntax . 1725   
2.208.2 Examples 1725   
2.208.3 Description 1726   
2.208.4 Restart, fix_modify, output, run start/stop, minimize info 1727   
2.208.5 Restrictions 1727   
2.208.6 Related commands 1727   
2.208.7 Default 1727   
2.209 fix sgcmc command . 1727   
2.209.1 Syntax . 1727   
2.209.2 Examples 1728   
2.209.3 Description 1728   
2.209.4 Restart, fix_modify, output, run start/stop, minimize info 1729   
2.209.5 Restrictions 1729   
2.209.6 Default 1729   
2.210 fix shake command 1730   
2.211 fix rattle command 1730   
2.211.1 Syntax . 1730   
2.211.2 Examples 1730   
2.211.3 Description 1730   
2.211.4 Restart, fix_modify, output, run start/stop, minimize info 1733   
2.211.5 Restrictions 1733   
2.211.6 Related commands 1733   
2.211.7 Default 1733   
2.212 fix shardlow command 1734   
2.212.1 Syntax . 1734   
2.212.2 Examples 1734   
2.212.3 Description 1734   
2.212.4 Restrictions 1734   
2.212.5 Related commands 1735   
2.212.6 Default 1735   
2.213 fix smd command 1735   
2.213.1 Syntax . 1735   
2.213.2 Examples 1735   
2.213.3 Description 1736   
2.213.4 Restart, fix_modify, output, run start/stop, minimize info 1736   
2.213.5 Restrictions 1737   
2.213.6 Related commands 1737   
2.213.7 Default 1737   
2.214 fix smd/adjust_dt command . 1737   
2.214.1 Syntax . 1737   
2.214.2 Examples 1737   
2.214.3 Description 1737   
2.214.4 Restart, fix_modify, output, run start/stop, minimize info 1738   
2.214.5 Restrictions 1738   
2.214.6 Related commands 1738   
2.214.7 Default 1738   
2.215 fix smd/integrate_tlsph command . 1738   
2.215.1 Syntax . 1738   
2.215.2 Examples 1738   
2.215.3 Description 1738   
2.215.4 Restart, fix_modify, output, run start/stop, minimize info 1738   
2.215.5 Restrictions 1739   
2.215.6 Related commands 1739   
2.215.7 Default 1739   
2.216 fix smd/integrate_ulsph command 1739   
2.216.1 Syntax . 1739   
2.216.2 Examples 1739   
2.216.3 Description 1739   
2.216.4 Restart, fix_modify, output, run start/stop, minimize info 1740   
2.216.5 Restrictions 1740   
2.216.6 Related commands 1740   
2.216.7 Default 1740   
2.217 fix smd/move_tri_surf command . 1740   
2.217.1 Syntax . 1740   
2.217.2 Examples 1740   
2.217.3 Description 1740   
2.217.4 Restart, fix_modify, output, run start/stop, minimize info 1741   
2.217.5 Restrictions 1741   
2.217.6 Related commands 1741   
2.217.7 Default 1741   
2.218 fix smd/setvel command 1741   
2.218.1 Syntax . 1741   
2.218.2 Examples 1741   
2.218.3 Description 1742   
2.218.4 Restart, fix_modify, output, run start/stop, minimize info 1742   
2.218.5 Restrictions 1742   
2.218.6 Related commands 1742   
2.218.7 Default 1742   
2.219 fix smd/wall_surface command . 1742   
2.219.1 Syntax . 1742   
2.219.2 Examples 1743   
2.219.3 Description 1743   
2.219.4 Restart, fix_modify, output, run start/stop, minimize info 1743   
2.219.5 Restrictions 1743   
2.219.6 Related commands 1743   
2.219.7 Default 1743   
2.220 fix sph command 1743   
2.220.1 Syntax . 1743   
2.220.2 Examples 1744   
2.220.3 Description 1744   
2.220.4 Restart, fix_modify, output, run start/stop, minimize info 1744   
2.220.5 Restrictions 1744   
2.220.6 Related commands 1744   
2.220.7 Default 1744   
2.221 fix sph/stationary command . 1744   
2.221.1 Syntax . 1744   
2.221.2 Examples 1744   
2.221.3 Description 1745   
2.221.4 Restart, fix_modify, output, run start/stop, minimize info 1745   
2.221.5 Restrictions 1745   
2.221.6 Related commands 1745   
2.221.7 Default 1745   
2.222 fix spring command . 1745   
2.222.1 Syntax . 1745   
2.222.2 Examples 1746   
2.222.3 Description 1746   
2.222.4 Restart, fix_modify, output, run start/stop, minimize info 1746   
2.222.5 Restrictions 1747   
2.222.6 Related commands 1747   
2.222.7 Default 1747   
2.223 fix spring/chunk command 1747   
2.223.1 Syntax . 1747   
2.223.2 Examples 1748   
2.223.3 Description 1748   
2.223.4 Restart, fix_modify, output, run start/stop, minimize info 1748   
2.223.5 Restrictions 1748   
2.223.6 Related commands 1749   
2.223.7 Default 1749   
2.224 fix spring/rg command 1749   
2.224.1 Syntax . 1749   
2.224.2 Examples 1749   
2.224.3 Description 1749   
2.224.4 Restart, fix_modify, output, run start/stop, minimize info 1750   
2.224.5 Restrictions 1750   
2.224.6 Related commands 1750   
2.224.7 Default 1750   
2.225 fix spring/self command 1750   
2.225.1 Syntax . 1750   
2.225.2 Examples 1750   
2.225.3 Description 1750   
2.225.4 Restart, fix_modify, output, run start/stop, minimize info 1751   
2.225.5 Restrictions 1752   
2.225.6 Related commands 1752   
2.225.7 Default 1752   
2.226 fix srd command 1752   
2.226.1 Syntax . 1752   
2.226.2 Examples 1753   
2.226.3 Description 1753   
2.226.4 Restart, fix_modify, output, run start/stop, minimize info 1756   
2.226.5 Restrictions 1757   
2.226.6 Related commands 1757   
2.226.7 Default 1757   
2.227 fix store/force command 1757   
2.227.1 Syntax . 1757   
2.227.2 Examples 1757   
2.227.3 Description 1757   
2.227.4 Restart, fix_modify, output, run start/stop, minimize info 1758   
2.227.5 Restrictions 1758   
2.227.6 Related commands 1758   
2.227.7 Default 1758   
2.228 fix store/state command . 1758   
2.228.1 Syntax 1758   
2.228.2 Examples 1759   
2.228.3 Description 1759   
2.228.4 Restart, fix_modify, output, run start/stop, minimize info 1760   
2.228.5 Restrictions 1760   
2.228.6 Related commands 1760   
2.228.7 Default 1760   
2.229 fix temp/berendsen command . 1760   
2.229.1 Syntax . 1760   
2.229.2 Examples 1761   
2.229.3 Description 1761   
2.229.4 Restart, fix_modify, output, run start/stop, minimize info 1762   
2.229.5 Restrictions 1762   
2.229.6 Related commands 1762   
2.229.7 Default 1763   
2.230 fix temp/csvr command 1763   
2.231 fix temp/csld command 1763   
2.231.1 Syntax 1763   
2.231.2 Examples 1763   
2.231.3 Description 1763   
2.231.4 Restart, fix_modify, output, run start/stop, minimize info 1764   
2.231.5 Restrictions 1765   
2.231.6 Related commands 1765   
2.231.7 Default 1765   
2.232 fix temp/rescale command 1765   
2.232.1 Syntax . 1765   
2.232.2 Examples 1766   
2.232.3 Description 1766   
2.232.4 Restart, fix_modify, output, run start/stop, minimize info 1767   
2.232.5 Restrictions 1767   
2.232.6 Related commands 1767   
2.232.7 Default 1768   
2.233 fix temp/rescale/eff command . 1768   
2.233.1 Syntax . 1768   
2.233.2 Examples 1768   
2.233.3 Description 1768   
2.233.4 Restart, fix_modify, output, run start/stop, minimize info 1768   
2.233.5 Restrictions 1768   
2.233.6 Related commands 1769   
2.233.7 Default 1769   
2.234 fix tfmc command . 1769   
2.234.1 Syntax . 1769   
2.234.2 Examples 1769   
2.234.3 Description 1769   
2.234.4 Restart, fix_modify, output, run start/stop, minimize info 1770   
2.234.5 Restrictions 1770   
2.234.6 Related commands 1770   
2.234.7 Default 1771   
2.235 fix tgnvt/drude command . 1771   
2.236 fix tgnpt/drude command 1771   
2.236.1 Syntax . 1771   
2.236.2 Examples 1772   
2.236.3 Description 1772   
2.236.4 Restart, fix_modify, output, run start/stop, minimize info 1774   
2.236.5 Restrictions 1774   
2.236.6 Related commands 1775   
2.236.7 Default 1775   
2.237 fix thermal/conductivity command 1775   
2.237.1 Syntax . 1775   
2.237.2 Examples 1775   
2.237.3 Description 1775   
2.237.4 Restart, fix_modify, output, run start/stop, minimize info 1776   
2.237.5 Restrictions 1777   
2.237.6 Related commands 1777   
2.237.7 Default 1777   
2.238 fix ti/spring command . 1777   
2.238.1 Syntax . 1777   
2.238.2 Example . 1777   
2.238.3 Description 1778   
2.238.4 Restart, fix_modify, output, run start/stop, minimize info 1779   
2.238.5 Related commands 1779   
2.238.6 Restrictions 1779   
2.238.7 Default 1779   
2.239 fix tmd command 1779   
2.239.1 Syntax . 1779   
2.239.2 Examples 1780   
2.239.3 Description 1780   
2.239.4 Restart, fix_modify, output, run start/stop, minimize info 1781   
2.239.5 Restrictions 1781   
2.239.6 Related commands 1781   
2.239.7 Default 1781   
2.240 fix ttm command 1781   
2.241 fix ttm/grid command . 1781   
2.242 fix ttm/mod command . 1781   
2.242.1 Syntax . 1781   
2.242.2 Examples 1782   
2.242.3 Description 1782   
2.242.4 Restart, fix_modify, output, run start/stop, minimize info 1786   
2.242.5 Restrictions 1786   
2.242.6 Related commands 1786   
2.242.7 Default 1786  

# 2.243 fix tune/kspace command 1787  

2.243.1 Syntax . 1787   
2.243.2 Examples 1787   
2.243.3 Description 1787   
2.243.4 Restrictions 1788   
2.243.5 Related commands 1788   
2.243.6 Default 1788   
2.244 fix vector command . 1788   
2.244.1 Syntax . 1788   
2.244.2 Examples 1788   
2.244.3 Description 1789   
2.244.4 Restart, fix_modify, output, run start/stop, minimize info 1790   
2.244.5 Restrictions 1790   
2.244.6 Related commands 1790   
2.244.7 Defaults 1790   
2.245 fix viscosity command 1790   
2.245.1 Syntax 1790   
2.245.2 Examples 1791   
2.245.3 Description 1791   
2.245.4 Restart, fix_modify, output, run start/stop, minimize info 1792   
2.245.5 Restrictions 1792   
2.245.6 Related commands 1792   
2.245.7 Default 1793   
2.246 fix viscous command 1793   
2.246.1 Syntax . 1793   
2.246.2 Examples 1793   
2.246.3 Description 1793   
2.246.4 Restart, fix_modify, output, run start/stop, minimize info 1794   
2.246.5 Restrictions 1794   
2.246.6 Related commands 1794   
2.246.7 Default 1794   
2.247 fix viscous/sphere command 1794   
2.247.1 Syntax . 1794   
2.247.2 Examples 1795   
2.247.3 Description 1795   
2.247.4 Restart, fix_modify, output, run start/stop, minimize info 1795   
2.247.5 Restrictions 1796   
2.247.6 Related commands 1796   
2.247.7 Default 1796   
2.248 fix wall/lj93 command 1796   
2.249 fix wall/lj126 command . 1796   
2.250 fix wall/lj1043 command 1796   
2.251 fix wall/colloid command 1796   
2.252 fix wall/harmonic command 1796   
2.253 fix wall/lepton command 1796   
2.254 fix wall/morse command 1796   
2.255 fix wall/table command 1796   
2.255.1 Syntax . 1796   
2.255.2 Examples 1798   
2.255.3 Description 1798   
2.255.4 Lepton expression syntax and features 1801   
2.255.5 Table file format . 1802   
2.255.6 Restart, fix_modify, output, run start/stop, minimize info 1803   
2.255.7 Restrictions 1803   
2.255.8 Related commands 1804   
2.255.9 Default 1804   
2.256 fix wall/body/polygon command 1804   
2.256.1 Syntax . 1804   
2.256.2 Examples 1804   
2.256.3 Description 1804   
2.256.4 Restart, fix_modify, output, run start/stop, minimize info 1805   
2.256.5 Restrictions 1805   
2.256.6 Related commands 1805   
2.256.7 Default 1805   
2.257 fix wall/body/polyhedron command 1805   
2.257.1 Syntax . 1805   
2.257.2 Examples 1806   
2.257.3 Description 1806   
2.257.4 Restart, fix_modify, output, run start/stop, minimize info 1806   
2.257.5 Restrictions 1806   
2.257.6 Related commands 1807   
2.257.7 Default 1807   
2.258 fix wall/ees command . 1807   
2.259 fix wall/region/ees command 1807   
2.259.1 Syntax . . 1807   
2.259.2 Examples 1807   
2.259.3 Description 1807   
2.259.4 Restart, fix_modify, output, run start/stop, minimize info 1809   
2.259.5 Restrictions 1809   
2.259.6 Related commands 1809   
2.259.7 Default 1809   
2.260 fix wall/flow command 1809   
2.260.1 Syntax . 1809   
2.260.2 Examples 1810   
2.260.3 Description 1810   
2.260.4 Restart, fix_modify, output, run start/stop, minimize info 1811   
2.260.5 Restrictions 1811   
2.260.6 Related commands 1811   
2.260.7 Default 1812   
2.261 fix wall/gran command 1812   
2.261.1 Syntax . 1812   
2.261.2 Examples 1813   
2.261.3 Description 1813   
2.261.4 Restart, fix_modify, output, run start/stop, minimize info 1815   
2.261.5 Restrictions 1815   
2.261.6 Related commands 1815   
2.261.7 Default 1816   
2.262 fix wall/gran/region command 1816   
2.262.1 Syntax . 1816   
2.262.2 Examples 1816   
2.262.3 Description 1817   
2.262.4 Restart, fix_modify, output, run start/stop, minimize info 1819   
2.262.5 Restrictions 1819   
2.262.6 Related commands 1819   
2.262.7 Default 1820   
.263 fix wall/piston command 1820   
2.263.1 Syntax . 1820   
2.263.2 Examples 1820  

# 2.263.3 Description 1820  

2.263.4 Restart, fix_modify, output, run start/stop, minimize info 1821   
2.263.5 Restrictions . 1821   
2.263.6 Related commands 1821   
2.263.7 Default 1821   
2.264 fix wall/reflect command 1821   
2.264.1 Syntax . 1821   
2.264.2 Examples . 1822   
2.264.3 Description 1822   
2.264.4 Restart, fix_modify, output, run start/stop, minimize info 1823   
2.264.5 Restrictions 1823   
2.264.6 Related commands 1824   
2.264.7 Default 1824   
.265 fix wall/reflect/stochastic command 1824   
2.265.1 Syntax . 1824   
2.265.2 Examples 1824   
2.265.3 Description 1825   
2.265.4 Restrictions 1825   
2.265.5 Related commands 1825   
2.265.6 Default 1825   
2.266 fix wall/region command 1826   
2.266.1 Syntax . 1826   
2.266.2 Examples 1826   
2.266.3 Description 1826   
2.266.4 Restart, fix_modify, output, run start/stop, minimize info 1828   
2.266.5 Restrictions 1829   
2.266.6 Related commands 1829   
2.266.7 Default 1829   
2.267 fix wall/srd command 1829   
2.267.1 Syntax 1829   
2.267.2 Examples 1830   
2.267.3 Description 1830   
2.267.4 Restart, fix_modify, output, run start/stop, minimize info 1831   
2.267.5 Restrictions 1832   
2.267.6 Related commands 1832   
2.267.7 Default 1832   
2.268 fix widom command 1832   
2.268.1 Syntax 1832   
2.268.2 Examples 1832   
2.268.3 Description 1832   
2.268.4 Restart, fix_modify, output, run start/stop, minimize info 1834   
2.268.5 Restrictions . 1834   
2.268.6 Related commands 1834   
2.268.7 Default 1834  

# 3 Compute Styles 1837  

# 3.1 compute ackland/atom command 1837  

3.1.1 Syntax . 1837   
3.1.2 Examples 1837   
3.1.3 Description 1837   
3.1.4 Output info . 1838   
3.1.5 Restrictions . 1838   
3.1.6 Related commands 1838   
3.1.7 Default 1838   
3.2 compute adf command 1838   
3.2.1 Syntax . 1838   
3.2.2 Examples 1839   
3.2.3 Description 1839   
3.2.4 Output info 1840   
3.2.5 Restrictions 1841   
3.2.6 Related commands 1841   
3.2.7 Default 1841   
compute angle command 1841   
3.3.1 Syntax . 1841   
3.3.2 Examples 1841   
3.3.3 Description 1841   
3.3.4 Output info 1842   
3.3.5 Restrictions 1842   
3.3.6 Related commands 1842   
3.3.7 Default 1842   
compute angle/local command 1842   
3.4.1 Syntax . 1842   
3.4.2 Examples 1842   
3.4.3 Description 1843   
3.4.4 Output info 1844   
3.4.5 Restrictions . . 1844   
3.4.6 Related commands 1844   
3.4.7 Default 1844   
compute angmom/chunk command . 1844   
3.5.1 Syntax . 1844   
3.5.2 Examples 1844   
3.5.3 Description 1844   
3.5.4 Output info 1845   
3.5.5 Restrictions 1845   
3.5.6 Related commands 1845   
3.5.7 Default 1845   
compute ave/sphere/atom command 1845   
3.6.1 Syntax . 1845   
3.6.2 Examples 1846   
3.6.3 Description 1846   
3.6.4 Output info 1846   
3.6.5 Restrictions 1847   
3.6.6 Related commands 1847   
3.6.7 Default 1847   
compute basal/atom command 1847   
3.7.1 Syntax . 1847   
3.7.2 Examples 1847   
3.7.3 Description 1847   
3.7.4 Output info 1847   
3.7.5 Restrictions 1848   
3.7.6 Related commands 1848   
3.7.7 Default 1848   
compute body/local command 1848   
3.8.1 Syntax . 1848   
3.8.2 Examples . . 1848   
3.8.3 Description 1848   
3.8.4 Output info 1849   
3.8.5 Restrictions 1849  

# 3.8.6 Related commands 1849  

3.8.7 Default 1849   
compute bond command 1849   
3.9.1 Syntax . 1849   
3.9.2 Examples 1849   
3.9.3 Description 1850   
3.9.4 Output info 1850   
3.9.5 Restrictions 1850   
3.9.6 Related commands 1850   
3.9.7 Default 1850   
0 compute bond/local command 1850   
3.10.1 Syntax . 1850   
3.10.2 Examples 1851   
3.10.3 Description 1851   
3.10.4 Output info 1853   
3.10.5 Restrictions 1853   
3.10.6 Related commands 1853   
3.10.7 Default 1853   
compute born/matrix command 1853   
3.11.1 Syntax 1853   
3.11.2 Examples 1853   
3.11.3 Description 1854   
3.11.4 Restrictions 1855   
3.11.5 Default 1856   
2 compute centro/atom command 1856   
3.12.1 Syntax . 1856   
3.12.2 Examples 1856   
3.12.3 Description 1856   
3.12.4 Output info 1857   
3.12.5 Restrictions 1858   
3.12.6 Related commands 1858   
3.12.7 Default 1858   
3 compute chunk/atom command . 1858   
3.13.1 Syntax . 1858   
3.13.2 Examples 1859   
3.13.3 Description 1859   
3.13.4 Output info 1865   
3.13.5 Restrictions 1866   
3.13.6 Related commands 1866   
3.13.7 Default 1866   
14 compute chunk/spread/atom command 1866   
3.14.1 Syntax . 1866   
3.14.2 Examples 1867   
3.14.3 Description 1867   
3.14.4 Output info 1869   
3.14.5 Restrictions . . 1869   
3.14.6 Related commands 1869   
3.14.7 Default 1869   
3.15 compute cluster/atom command 1869   
3.16 compute fragment/atom command 1869   
3.17 compute aggregate/atom command . 1869   
3.17.1 Syntax . 1869   
3.17.2 Examples 1870   
3.17.3 Description 1870   
3.17.4 Output info 1871   
3.17.5 Restrictions 1871   
3.17.6 Related commands 1871   
3.17.7 Default 1871   
compute cna/atom command 1871   
3.18.1 Syntax . 1871   
3.18.2 Examples 1871   
3.18.3 Description 1871   
3.18.4 Output info 1872   
3.18.5 Restrictions 1872   
3.18.6 Related commands 1872   
3.18.7 Default 1872   
19 compute cnp/atom command 1872   
3.19.1 Syntax . 1872   
3.19.2 Examples 1873   
3.19.3 Description . 1873   
3.19.4 Output info 1874   
3.19.5 Restrictions 1874   
3.19.6 Related commands 1874   
3.19.7 Default 1874   
20 compute com command . 1874   
3.20.1 Syntax 1874   
3.20.2 Examples 1874   
3.20.3 Description 1874   
3.20.4 Output info 1875   
3.20.5 Restrictions 1875   
3.20.6 Related commands 1875   
3.20.7 Default 1875   
compute com/chunk command 1875   
3.21.1 Syntax . 1875   
3.21.2 Examples 1875   
3.21.3 Description 1875   
3.21.4 Output info 1876   
3.21.5 Restrictions 1876   
3.21.6 Related commands 1876   
3.21.7 Default 1876   
compute composition/atom command 1876   
3.22.1 Syntax . 1876   
3.22.2 Examples 1877   
3.22.3 Description 1877   
3.22.4 Output info 1878   
3.22.5 Restrictions 1878   
3.22.6 Related commands 1878   
3.22.7 Default 1878   
.23 compute contact/atom command 1878   
3.23.1 Syntax . 1878   
3.23.2 Examples 1878   
3.23.3 Description 1878   
3.23.4 Output info 1879   
3.23.5 Restrictions 1879   
3.23.6 Related commands 1879   
3.23.7 Default 1879   
.24 compute coord/atom command 1879   
3.24.1 Syntax 1879  

#  

3.24.2 Examples 1879   
3.24.3 Description 1880   
3.24.4 Output info 1881   
3.24.5 Restrictions 1881   
3.24.6 Related commands 1881   
3.24.7 Default 1881   
5 compute count/type command 1881   
3.25.1 Syntax . 1881   
3.25.2 Examples 1881   
3.25.3 Description 1882   
3.25.4 Output info 1883   
3.25.5 Restrictions 1883   
3.25.6 Related commands 1883   
3.25.7 Default 1883   
6 compute damage/atom command 1883   
3.26.1 Syntax . 1883   
3.26.2 Examples 1883   
3.26.3 Description 1883   
3.26.4 Output info 1884   
3.26.5 Restrictions . . 1884   
3.26.6 Related commands 1884   
3.26.7 Default 1884   
27 compute dihedral command 1884   
3.27.1 Syntax . 1884   
3.27.2 Examples 1884   
3.27.3 Description 1884   
3.27.4 Output info 1884   
3.27.5 Restrictions 1885   
3.27.6 Related commands 1885   
3.27.7 Default 1885   
8 compute dihedral/local command . 1885   
3.28.1 Syntax . 1885   
3.28.2 Examples 1885   
3.28.3 Description 1885   
3.28.4 Output info 1886   
3.28.5 Restrictions 1886   
3.28.6 Related commands 1886   
3.28.7 Default 1887   
9 compute dilatation/atom command . 1887   
3.29.1 Syntax . . 1887   
3.29.2 Examples 1887   
3.29.3 Description 1887   
3.29.4 Output info 1887   
3.29.5 Restrictions . . 1887   
3.29.6 Related commands 1887   
3.29.7 Default 1887   
3.30 compute dipole command . 1888   
.31 compute dipole/tip4p command 1888   
3.31.1 Syntax . 1888   
3.31.2 Examples 1888   
3.31.3 Description 1888   
3.31.4 Output info 1888   
3.31.5 Restrictions 1888   
3.31.6 Related commands 1889   
3.31.7 Default 1889   
compute dipole/chunk command 1889   
compute dipole/tip4p/chunk command 1889   
3.33.1 Syntax . 1889   
3.33.2 Examples 1889   
3.33.3 Description 1889   
3.33.4 Output info 1890   
3.33.5 Restrictions 1890   
3.33.6 Related commands 1890   
3.33.7 Default 1890   
.34 compute displace/atom command 1890   
3.34.1 Syntax . 1890   
3.34.2 Examples 1891   
3.34.3 Description 1891   
3.34.4 Output info 1892   
3.34.5 Restrictions 1892   
3.34.6 Related commands 1892   
3.34.7 Default 1892   
compute dpd command 1892   
3.35.1 Syntax . 1892   
3.35.2 Examples 1892   
3.35.3 Description 1893   
3.35.4 Output info 1893   
3.35.5 Restrictions 1893   
3.35.6 Related commands 1893   
3.35.7 Default 1893   
compute dpd/atom command . 1894   
3.36.1 Syntax . 1894   
3.36.2 Examples 1894   
3.36.3 Description 1894   
3.36.4 Output info 1894   
3.36.5 Restrictions 1894   
3.36.6 Related commands 1894   
3.36.7 Default 1894   
.37 compute edpd/temp/atom command 1894   
3.37.1 Syntax . . 1894   
3.37.2 Examples 1895   
3.37.3 Description 1895   
3.37.4 Output info 1895   
3.37.5 Restrictions 1895   
3.37.6 Related commands 1895   
3.37.7 Default 1895   
38 compute efield/atom command 1895   
3.38.1 Syntax . 1895   
3.38.2 Examples 1896   
3.38.3 Description 1896   
3.38.4 Output info 1896   
3.38.5 Restrictions 1896   
3.38.6 Related commands 1896   
3.38.7 Default 1896   
compute efield/wolf/atom command 1896   
3.39.1 Syntax . . 1896   
3.39.2 Examples 1897   
3.39.3 Description 1897   
3.39.4 Output info 1897   
3.39.5 Restrictions 1898   
3.39.6 Related commands 1898   
3.39.7 Default 1898   
compute entropy/atom command 1898   
3.40.1 Syntax . 1898   
3.40.2 Examples 1898   
3.40.3 Description 1898   
3.40.4 Output info 1899   
3.40.5 Restrictions 1899   
3.40.6 Related commands 1899   
3.40.7 Default 1900   
41 compute erotate/asphere command 1900   
3.41.1 Syntax . 1900   
3.41.2 Examples 1900   
3.41.3 Description . 1900   
3.41.4 Output info 1900   
3.41.5 Restrictions . . 1900   
3.41.6 Related commands 1901   
3.41.7 Default 1901   
compute erotate/rigid command 1901   
3.42.1 Syntax . 1901   
3.42.2 Examples 1901   
3.42.3 Description 1901   
3.42.4 Output info 1901   
3.42.5 Restrictions 1901   
3.42.6 Related commands 1901   
3.42.7 Default 1902   
compute erotate/sphere command 1902   
3.43.1 Syntax . 1902   
3.43.2 Examples 1902   
3.43.3 Description 1902   
3.43.4 Output info 1902   
3.43.5 Restrictions 1903   
3.43.6 Related commands 1903   
3.43.7 Default 1903   
compute erotate/sphere/atom command 1903   
3.44.1 Syntax . 1903   
3.44.2 Examples 1903   
3.44.3 Description 1903   
3.44.4 Output info 1903   
3.44.5 Restrictions 1904   
3.44.6 Related commands 1904   
3.44.7 Default 1904   
.45 compute event/displace command 1904   
3.45.1 Syntax . 1904   
3.45.2 Examples 1904   
3.45.3 Description 1904   
3.45.4 Output info 1904   
3.45.5 Restrictions 1905   
3.45.6 Related commands 1905   
3.45.7 Default 1905   
.46 compute fabric command . 1905  

# 3.46.1 Syntax 1905  

3.46.2 Examples 1905   
3.46.3 Description 1905   
3.46.4 Output info 1907   
3.46.5 Restrictions 1907   
3.46.6 Related commands . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1907   
3.46.7 Default 1907   
7 compute fep command 1907   
3.47.1 Syntax . 1907   
3.47.2 Examples 1908   
3.47.3 Description 1908   
3.47.4 Output info 1910   
3.47.5 Restrictions 1910   
3.47.6 Related commands 1911   
3.47.7 Default 1911   
8 compute fep/ta command 1911   
3.48.1 Syntax . 1911   
3.48.2 Examples 1911   
3.48.3 Description . 1911   
3.48.4 Output info 1912   
3.48.5 Restrictions . . 1912   
3.48.6 Related commands 1912   
3.48.7 Default 1912   
9 compute gaussian/grid/local command 1912   
3.49.1 Syntax . 1912   
3.49.2 Examples 1913   
3.49.3 Description 1913   
3.49.4 Output info 1913   
3.49.5 Restrictions 1913   
3.49.6 Related commands 1913   
0 compute global/atom command 1914   
3.50.1 Syntax . . 1914   
3.50.2 Examples 1914   
3.50.3 Description 1914   
3.50.4 Output info 1916   
3.50.5 Restrictions 1916   
3.50.6 Related commands 1916   
3.50.7 Default 1917   
compute group/group command 1917   
3.51.1 Syntax . 1917   
3.51.2 Examples 1917   
3.51.3 Description 1917   
3.51.4 Output info 1918   
3.51.5 Restrictions 1918   
3.51.6 Related commands 1919   
3.51.7 Default 1919   
.52 compute gyration command 1919   
3.52.1 Syntax . 1919   
3.52.2 Examples 1919   
3.52.3 Description 1919   
3.52.4 Output info 1920   
3.52.5 Restrictions 1920   
3.52.6 Related commands 1920   
3.52.7 Default 1920   
3.53 compute gyration/chunk command . 1920   
3.53.1 Syntax . 1920   
3.53.2 Examples 1920   
3.53.3 Description 1920   
3.53.4 Output info 1921   
3.53.5 Restrictions 1921   
3.53.6 Related commands 1921   
3.53.7 Default 1922   
54 compute gyration/shape command 1922   
3.54.1 Syntax . 1922   
3.54.2 Examples 1922   
3.54.3 Description 1922   
3.54.4 Output info 1923   
3.54.5 Restrictions 1923   
3.54.6 Related commands 1923   
3.54.7 Default 1923   
.55 compute gyration/shape/chunk command 1923   
3.55.1 Syntax . 1923   
3.55.2 Examples 1923   
3.55.3 Description 1923   
3.55.4 Output info 1924   
3.55.5 Restrictions 1924   
3.55.6 Related commands 1924   
3.55.7 Default 1924   
compute heat/flux command 1924   
3.56.1 Syntax . 1924   
3.56.2 Examples 1925   
3.56.3 Description 1925   
3.56.4 Output info 1926   
3.56.5 Restrictions 1927   
3.56.6 Related commands 1927   
3.56.7 Default 1927   
compute hexorder/atom command 1928   
3.57.1 Syntax . 1928   
3.57.2 Examples 1928   
3.57.3 Description 1929   
3.57.4 Output info 1929   
3.57.5 Restrictions 1929   
3.57.6 Related commands 1930   
3.57.7 Default 1930   
58 compute hma command . 1930   
3.58.1 Syntax . 1930   
3.58.2 Examples 1930   
3.58.3 Description 1930   
3.58.4 Output info 1932   
3.58.5 Restrictions 1932   
3.58.6 Related commands 1932   
3.58.7 Default 1932   
59 compute improper command . 1933   
3.59.1 Syntax . 1933   
3.59.2 Examples 1933   
3.59.3 Description 1933   
3.59.4 Output info 1933   
3.59.5 Restrictions 1933   
3.59.6 Related commands 1933   
3.59.7 Default 1933   
compute improper/local command 1933   
3.60.1 Syntax . 1933   
3.60.2 Examples 1934   
3.60.3 Description 1934   
3.60.4 Output info 1934   
3.60.5 Restrictions 1934   
3.60.6 Related commands 1934   
3.60.7 Default 1934   
compute inertia/chunk command 1935   
3.61.1 Syntax . 1935   
3.61.2 Examples 1935   
3.61.3 Description 1935   
3.61.4 Output info 1935   
3.61.5 Restrictions . . 1936   
3.61.6 Related commands 1936   
3.61.7 Default 1936   
62 compute ke command . 1936   
3.62.1 Syntax . 1936   
3.62.2 Examples 1936   
3.62.3 Description 1936   
3.62.4 Output info 1936   
3.62.5 Restrictions 1936   
3.62.6 Related commands 1937   
3.62.7 Default 1937   
63 compute ke/atom command . 1937   
3.63.1 Syntax . . 1937   
3.63.2 Examples 1937   
3.63.3 Description 1937   
3.63.4 Output info 1937   
3.63.5 Restrictions 1937   
3.63.6 Related commands 1937   
3.63.7 Default 1937   
compute ke/atom/eff command 1937   
3.64.1 Syntax . 1937   
3.64.2 Examples 1938   
3.64.3 Description 1938   
3.64.4 Output info 1938   
3.64.5 Restrictions 1938   
3.64.6 Related commands 1938   
3.64.7 Default 1939   
compute ke/eff command 1939   
3.65.1 Syntax . 1939   
3.65.2 Examples 1939   
3.65.3 Description 1939   
3.65.4 Output info 1939   
3.65.5 Restrictions 1940   
3.65.6 Related commands 1940   
3.65.7 Default 1940   
6 compute ke/rigid command . 1940   
3.66.1 Syntax . 1940   
3.66.2 Examples 1940   
3.66.3 Description 1940   
3.66.4 Output info 1940   
3.66.5 Restrictions 1940   
3.66.6 Related commands 1941   
3.66.7 Default 1941   
7 compute mliap command . 1941   
3.67.1 Syntax . 1941   
3.67.2 Examples 1941   
3.67.3 Description 1941   
3.67.4 Output info 1943   
3.67.5 Restrictions 1943   
3.67.6 Related commands 1943   
3.67.7 Default 1943   
8 compute momentum command . 1943   
3.68.1 Syntax . 1943   
3.68.2 Examples 1943   
3.68.3 Description 1943   
3.68.4 Output info 1944   
3.68.5 Restrictions 1944   
3.68.6 Related commands 1944   
3.68.7 Default 1944   
9 compute msd command . 1944   
3.69.1 Syntax . 1944   
3.69.2 Examples 1944   
3.69.3 Description 1944   
3.69.4 Output info 1945   
3.69.5 Restrictions 1945   
3.69.6 Related commands 1945   
3.69.7 Default 1945   
0 compute msd/chunk command 1946   
3.70.1 Syntax . 1946   
3.70.2 Examples 1946   
3.70.3 Description 1946   
3.70.4 Output info 1947   
3.70.5 Restrictions 1947   
3.70.6 Related commands 1947   
3.70.7 Default 1947   
71 compute msd/nongauss command 1947   
3.71.1 Syntax . 1947   
3.71.2 Examples 1948   
3.71.3 Description 1948   
3.71.4 Output info 1948   
3.71.5 Restrictions 1948   
3.71.6 Related commands 1948   
3.71.7 Default 1948   
2 compute nbond/atom command 1949   
3.72.1 Syntax . 1949   
3.72.2 Examples 1949   
3.72.3 Description . 1949   
3.72.4 Output info 1949   
3.72.5 Restrictions 1949   
3.72.6 Related commands 1949   
3.72.7 Default 1949   
3 compute omega/chunk command . 1949   
3.73.1 Syntax . 1949   
3.73.2 Examples 1950   
3.73.3 Description 1950   
3.73.4 Output info 1950   
3.73.5 Restrictions 1950   
3.73.6 Related commands 1951   
3.73.7 Default 1951   
compute orientorder/atom command 1951   
3.74.1 Syntax . 1951   
3.74.2 Examples 1951   
3.74.3 Description 1951   
3.74.4 Output info 1953   
3.74.5 Restrictions 1953   
3.74.6 Related commands 1953   
3.74.7 Default 1953   
compute pace command 1954   
3.75.1 Syntax . 1954   
3.75.2 Examples 1954   
3.75.3 Description 1954   
3.75.4 Output info 1956   
3.75.5 Restrictions 1956   
3.75.6 Related commands 1956   
3.75.7 Default 1957   
compute pair command 1957   
3.76.1 Syntax 1957   
3.76.2 Examples 1957   
3.76.3 Description 1957   
3.76.4 Output info 1958   
3.76.5 Restrictions 1958   
3.76.6 Related commands 1958   
3.76.7 Default 1958   
compute pair/local command 1958   
3.77.1 Syntax . 1958   
3.77.2 Examples 1959   
3.77.3 Description 1959   
3.77.4 Output info 1960   
3.77.5 Restrictions 1960   
3.77.6 Related commands 1960   
3.77.7 Default 1960   
8 compute pe command . 1960   
3.78.1 Syntax . 1960   
3.78.2 Examples 1961   
3.78.3 Description 1961   
3.78.4 Output info 1961   
3.78.5 Restrictions 1961   
3.78.6 Related commands 1961   
3.78.7 Default 1962   
.79 compute pe/atom command . 1962   
3.79.1 Syntax . 1962   
3.79.2 Examples 1962   
3.79.3 Description 1962   
3.79.4 Output info 1963   
3.79.5 Restrictions 1963   
3.79.6 Related commands 1963   
3.79.7 Default 1963   
3.80 compute plasticity/atom command 1963  

# 3.80.1 Syntax . 1963  

3.80.2 Examples 1963   
3.80.3 Description 1963   
3.80.4 Output info 1964   
3.80.5 Restrictions 1964   
3.80.6 Related commands 1964   
3.80.7 Default 1964   
3.81 compute pod/atom command . 1964   
3.82 compute podd/atom command 1964   
3.83 compute pod/local command . 1964   
3.84 compute pod/global command 1964   
3.84.1 Syntax . 1964   
3.84.2 Examples 1965   
3.84.3 Description . . 1965   
3.84.4 Output info 1965   
3.84.5 Restrictions 1965   
3.84.6 Related commands 1966   
3.84.7 Default 1966   
compute pressure command 1966   
3.85.1 Syntax . 1966   
3.85.2 Examples 1966   
3.85.3 Description 1966   
3.85.4 Output info 1967   
3.85.5 Restrictions 1968   
3.85.6 Related commands 1968   
3.85.7 Default 1968   
compute pressure/alchemy command . 1968   
3.86.1 Syntax . 1968   
3.86.2 Examples 1968   
3.86.3 Description 1968   
3.86.4 Output info 1968   
3.86.5 Restrictions 1969   
3.86.6 Related commands 1969   
3.86.7 Default 1969   
7 compute pressure/uef command 1969   
3.87.1 Syntax . 1969   
3.87.2 Examples 1969   
3.87.3 Description 1969   
3.87.4 Restrictions 1969   
3.87.5 Related commands 1969   
3.87.6 Default 1970   
compute property/atom command 1970   
3.88.1 Syntax . 1970   
3.88.2 Examples 1971   
3.88.3 Description 1971   
3.88.4 Output info 1972   
3.88.5 Restrictions 1972   
3.88.6 Related commands 1972   
3.88.7 Default 1972   
9 compute property/chunk command . 1972   
3.89.1 Syntax . 1972   
3.89.2 Examples 1973   
3.89.3 Description 1973   
3.89.4 Output info 1974   
3.89.5 Restrictions 1974   
3.89.6 Related commands 1974   
3.89.7 Default 1974   
90 compute property/grid command . 1974   
3.90.1 Syntax . 1974   
3.90.2 Examples 1974   
3.90.3 Description 1975   
3.90.4 Output info 1975   
3.90.5 Restrictions . . 1975   
3.90.6 Related commands 1975   
3.90.7 Default 1975   
91 compute property/local command 1976   
3.91.1 Syntax . 1976   
3.91.2 Examples 1977   
3.91.3 Description 1977   
3.91.4 Output info 1978   
3.91.5 Restrictions 1978   
3.91.6 Related commands 1978   
3.91.7 Default 1978   
92 compute ptm/atom command . 1978   
3.92.1 Syntax . 1978   
3.92.2 Examples 1978   
3.92.3 Description 1978   
3.92.4 Output info 1979   
3.92.5 Restrictions 1980   
3.92.6 Related commands 1980   
3.92.7 Default 1980   
93 compute rattlers/atom command 1980   
3.93.1 Syntax . 1980   
3.93.2 Examples 1980   
3.93.3 Description 1980   
3.93.4 Output info 1981   
3.93.5 Restrictions 1981   
3.93.6 Related commands 1981   
3.93.7 Default 1981   
.94 compute rdf command 1981   
3.94.1 Syntax . 1981   
3.94.2 Examples 1982   
3.94.3 Description 1982   
3.94.4 Output info 1983   
3.94.5 Restrictions 1983   
3.94.6 Related commands 1984   
3.94.7 Default 1984   
95 compute reaxff/atom command . 1984   
3.95.1 Syntax . 1984   
3.95.2 Examples 1984   
3.95.3 Description 1985   
3.95.4 Output info 1985   
3.95.5 Restrictions 1985   
3.95.6 Related commands 1985   
3.95.7 Default 1986   
3.96 compute reduce command 1986   
.97 compute reduce/region command . 1986   
3.97.1 Syntax . 1986   
3.97.2 Examples 1986   
3.97.3 Description 1987   
3.97.4 Output info 1988   
3.97.5 Restrictions 1989   
3.97.6 Related commands 1989   
3.97.7 Default 1989   
.98 compute reduce/chunk command . 1989   
3.98.1 Syntax . 1989   
3.98.2 Examples 1989   
3.98.3 Description 1989   
3.98.4 Output info 1991   
3.98.5 Restrictions 1991   
3.98.6 Related commands 1991   
3.98.7 Default 1991   
.99 compute rheo/property/atom command . 1991   
3.99.1 Syntax . 1991   
3.99.2 Examples 1992   
3.99.3 Description 1992   
3.99.4 Output info 1993   
3.99.5 Restrictions 1993   
3.99.6 Related commands 1993   
3.99.7 Default 1993   
.100 compute rigid/local command 1993   
3.100.1 Syntax . 1993   
3.100.2 Examples 1994   
3.100.3 Description 1994   
3.100.4 Output info 1995   
3.100.5 Restrictions 1995   
3.100.6 Related commands 1995   
3.100.7 Default 1996   
3.101 compute saed command 1996   
3.101.1 Syntax . 1996   
3.101.2 Examples 1996   
3.101.3 Description 1996   
3.101.4 Output info 1999   
3.101.5 Restrictions 1999   
3.101.6 Related commands 1999   
3.101.7 Default 1999   
.102 compute slcsa/atom command 1999   
3.102.1 Syntax . 1999   
3.102.2 Examples 2000   
3.102.3 Description 2000   
3.102.4 Output info 2001   
3.102.5 Restrictions 2001   
3.102.6 Related commands 2001   
3.102.7 Default 2001   
.103 compute slice command 2001   
3.103.1 Syntax . 2001   
3.103.2 Examples 2002   
3.103.3 Description 2002   
3.103.4 Output info 2002   
3.103.5 Restrictions 2003   
3.103.6 Related commands 2003   
3.103.7 Default 2003   
104 compute smd/contact/radius command . 2003   
3.104.1 Syntax . 2003   
3.104.2 Examples 2003   
3.104.3 Description 2003   
3.104.4 Output info 2003   
3.104.5 Restrictions 2003   
3.104.6 Related commands 2003   
3.104.7 Default 2004   
105 compute smd/damage command 2004   
3.105.1 Syntax . 2004   
3.105.2 Examples 2004   
3.105.3 Description 2004   
3.105.4 Restrictions 2004   
3.105.5 Related commands 2004   
3.105.6 Default 2004   
3.106 compute smd/hourglass/error command 2004   
3.106.1 Syntax . 2004   
3.106.2 Examples 2005   
3.106.3 Description 2005   
3.106.4 Restrictions 2005   
3.106.5 Related commands 2005   
3.106.6 Default 2005   
compute smd/internal/energy command 2005   
3.107.1 Syntax . 2005   
3.107.2 Examples 2005   
3.107.3 Description 2005   
3.107.4 Output Info 2006   
3.107.5 Restrictions 2006   
3.107.6 Related commands 2006   
3.107.7 Default 2006   
compute smd/plastic/strain command 2006   
3.108.1 Syntax . 2006   
3.108.2 Examples 2006   
3.108.3 Description 2006   
3.108.4 Restrictions 2006   
3.108.5 Related commands 2007   
3.108.6 Default 2007   
109 compute smd/plastic/strain/rate command 2007   
3.109.1 Syntax . 2007   
3.109.2 Examples 2007   
3.109.3 Description 2007   
3.109.4 Restrictions 2007   
3.109.5 Related commands 2007   
3.109.6 Default 2007   
.110 compute smd/rho command 2007   
3.110.1 Syntax . 2007   
3.110.2 Examples 2008   
3.110.3 Description 2008   
3.110.4 Output info 2008   
3.110.5 Restrictions 2008   
3.110.6 Related commands 2008   
3.110.7 Default 2008   
compute smd/tlsph/defgrad command 2008   
3.111.1 Syntax . 2008  

# 3.111.2 Examples 2008  

3.111.3 Description 2009   
3.111.4 Output info 2009   
3.111.5 Restrictions 2009   
3.111.6 Related commands 2009   
3.111.7 Default 2009   
.112 compute smd/tlsph/dt command 2009   
3.112.1 Syntax . 2009   
3.112.2 Examples 2009   
3.112.3 Description 2009   
3.112.4 Output info 2010   
3.112.5 Restrictions 2010   
3.112.6 Related commands 2010   
3.112.7 Default 2010   
compute smd/tlsph/num/neighs command 2010   
3.113.1 Syntax . 2010   
3.113.2 Examples 2010   
3.113.3 Description 2010   
3.113.4 Output info 2010   
3.113.5 Restrictions 2010   
3.113.6 Related commands 2011   
3.113.7 Default 2011   
.114 compute smd/tlsph/shape command 2011   
3.114.1 Syntax . 2011   
3.114.2 Examples 2011   
3.114.3 Description 2011   
3.114.4 Output info 2011   
3.114.5 Restrictions . . 2011   
3.114.6 Related commands 2011   
3.114.7 Default 2011   
115 compute smd/tlsph/strain command 2012   
3.115.1 Syntax . 2012   
3.115.2 Examples 2012   
3.115.3 Description 2012   
3.115.4 Output info 2012   
3.115.5 Restrictions 2012   
3.115.6 Related commands 2012   
3.115.7 Default 2012   
.116 compute smd/tlsph/strain/rate command 2012   
3.116.1 Syntax . 2012   
3.116.2 Examples 2013   
3.116.3 Description 2013   
3.116.4 Output info 2013   
3.116.5 Restrictions 2013   
3.116.6 Related commands 2013   
3.116.7 Default 2013   
.117 compute smd/tlsph/stress command 2013   
3.117.1 Syntax 2013   
3.117.2 Examples 2013   
3.117.3 Description 2014   
3.117.4 Output info 2014   
3.117.5 Restrictions 2014   
3.117.6 Related commands 2014   
3.117.7 Default 2014   
.118 compute smd/triangle/vertices command . 2014   
3.118.1 Syntax . 2014   
3.118.2 Examples 2014   
3.118.3 Description 2014   
3.118.4 Output info 2015   
3.118.5 Restrictions 2015   
3.118.6 Related commands 2015   
3.118.7 Default 2015   
.119 compute smd/ulsph/effm command . 2015   
3.119.1 Syntax . 2015   
3.119.2 Examples 2015   
3.119.3 Description 2015   
3.119.4 Output info 2015   
3.119.5 Restrictions 2016   
3.119.6 Related commands 2016   
3.119.7 Default 2016   
.120 compute smd/ulsph/num/neighs command 2016   
3.120.1 Syntax . 2016   
3.120.2 Examples 2016   
3.120.3 Description 2016   
3.120.4 Output info 2016   
3.120.5 Restrictions 2016   
3.120.6 Related commands 2016   
3.120.7 Default 2017   
121 compute smd/ulsph/strain command 2017   
3.121.1 Syntax . 2017   
3.121.2 Examples 2017   
3.121.3 Description 2017   
3.121.4 Output info 2017   
3.121.5 Restrictions 2017   
3.121.6 Related commands 2017   
3.121.7 Default 2017   
compute smd/ulsph/strain/rate command . 2017   
3.122.1 Syntax . 2017   
3.122.2 Examples 2018   
3.122.3 Description 2018   
3.122.4 Output info 2018   
3.122.5 Restrictions 2018   
3.122.6 Related commands 2018   
3.122.7 Default 2018   
.123 compute smd/ulsph/stress command 2018   
3.123.1 Syntax . 2018   
3.123.2 Examples 2018   
3.123.3 Description 2019   
3.123.4 Output info 2019   
3.123.5 Restrictions 2019   
3.123.6 Related commands 2019   
3.123.7 Default 2019   
.124 compute smd/vol command . 2019   
3.124.1 Syntax . 2019   
3.124.2 Examples 2019   
3.124.3 Description 2019   
3.124.4 Output info 2020   
3.124.5 Restrictions 2020   
3.124.6 Related commands 2020   
3.124.7 Default 2020   
.125 compute sna/atom command 2020   
.126 compute snad/atom command 2020   
.127 compute snav/atom command 2020   
.128 compute snap command 2020   
.129 compute sna/grid command . 2020   
.130 compute sna/grid/kk command 2020   
compute sna/grid/local command . 2020   
3.131.1 Syntax . 2020   
3.131.2 Examples 2022   
3.131.3 Description 2022   
3.131.4 Output info 2026   
3.131.5 Restrictions 2028   
3.131.6 Related commands 2028   
3.131.7 Default 2028   
3.132 compute sph/e/atom command 2028   
3.132.1 Syntax . 2028   
3.132.2 Examples 2028   
3.132.3 Description 2028   
3.132.4 Output info 2029   
3.132.5 Restrictions 2029   
3.132.6 Related commands 2029   
3.132.7 Default 2029   
.133 compute sph/rho/atom command . 2029   
3.133.1 Syntax . 2029   
3.133.2 Examples 2029   
3.133.3 Description 2029   
3.133.4 Output info 2030   
3.133.5 Restrictions 2030   
3.133.6 Related commands 2030   
3.133.7 Default 2030   
.134 compute sph/t/atom command 2030   
3.134.1 Syntax . 2030   
3.134.2 Examples 2030   
3.134.3 Description 2030   
3.134.4 Output info 2031   
3.134.5 Restrictions 2031   
3.134.6 Related commands 2031   
3.134.7 Default 2031   
.135 compute spin command . 2031   
3.135.1 Syntax . 2031   
3.135.2 Examples 2031   
3.135.3 Description 2031   
3.135.4 Output info 2032   
3.135.5 Restrictions 2032   
3.135.6 Default 2032   
3.136 compute stress/atom command 2032   
.137 compute centroid/stress/atom command 2032   
3.137.1 Syntax . 2032   
3.137.2 Examples 2033   
3.137.3 Description 2033   
3.137.4 Output info 2035   
3.137.5 Restrictions 2035  

# lxxviii  

# 3.137.6 Related commands 2036  

# 3.137.7 Default 2036  

3.138 compute stress/cartesian command 2036   
3.138.1 Syntax . 2036   
3.138.2 Examples 2036   
3.138.3 Description 2036   
3.138.4 Output info 2037   
3.138.5 Restrictions 2037   
3.138.6 Related commands 2037   
3.139 compute stress/cylinder command 2037   
3.140 compute stress/spherical command 2037   
3.140.1 Syntax . 2037   
3.140.2 Examples 2038   
3.140.3 Description 2038   
3.140.4 Output info 2038   
3.140.5 Restrictions 2039   
3.140.6 Related commands 2039   
3.140.7 Default 2039   
compute stress/mop command 2039   
3.142 compute stress/mop/profile command 2039   
3.142.1 Syntax . 2039   
3.142.2 Examples 2039   
3.142.3 Description 2040   
3.142.4 Output info 2040   
3.142.5 Restrictions 2040   
3.142.6 Related commands 2041   
3.142.7 Default 2041   
3.143 compute force/tally command 2041   
3.144 compute heat/flux/tally command 2041   
3.145 compute heat/flux/virial/tally command 2041   
3.146 compute pe/tally command 2041   
3.147 compute pe/mol/tally command 2041   
3.148 compute stress/tally command 2041   
3.148.1 Syntax . 2041   
3.148.2 Examples 2041   
3.148.3 Description 2042   
3.148.4 Output info 2043   
3.148.5 Restrictions 2043   
3.148.6 Related commands 2044   
3.148.7 Default 2044   
compute tdpd/cc/atom command 2044   
3.149.1 Syntax . 2044   
3.149.2 Examples 2044   
3.149.3 Description 2044   
3.149.4 Output info 2044   
3.149.5 Restrictions 2044   
3.149.6 Related commands 2044   
3.149.7 Default 2045   
3.150 compute temp command 2045   
3.150.1 Syntax . 2045   
3.150.2 Examples 2045   
3.150.3 Description 2045   
3.150.4 Output info 2046   
3.150.5 Restrictions 2046   
3.150.6 Related commands 2046   
3.150.7 Default 2046   
compute temp/asphere command . 2046   
3.151.1 Syntax . . 2046   
3.151.2 Examples 2047   
3.151.3 Description 2047   
3.151.4 Output info 2048   
3.151.5 Restrictions 2048   
3.151.6 Related commands 2048   
3.151.7 Default 2048   
.152 compute temp/body command 2049   
3.152.1 Syntax . 2049   
3.152.2 Examples 2049   
3.152.3 Description 2049   
3.152.4 Output info 2050   
3.152.5 Restrictions 2050   
3.152.6 Related commands 2050   
3.152.7 Default 2050   
.153 compute temp/chunk command . 2050   
3.153.1 Syntax . 2050   
3.153.2 Examples 2051   
3.153.3 Description 2051   
3.153.4 Output info 2053   
3.153.5 Restrictions 2053   
3.153.6 Related commands 2054   
3.153.7 Default 2054   
.154 compute temp/com command . 2054   
3.154.1 Syntax . 2054   
3.154.2 Examples 2054   
3.154.3 Description 2054   
3.154.4 Output info 2055   
3.154.5 Restrictions 2055   
3.154.6 Related commands 2055   
3.154.7 Default 2055   
.155 compute temp/cs command . 2055   
3.155.1 Syntax . 2055   
3.155.2 Examples 2055   
3.155.3 Description 2055   
3.155.4 Output info 2056   
3.155.5 Restrictions 2056   
3.155.6 Related commands 2056   
3.155.7 Default 2056   
56 compute temp/deform command 2057   
3.156.1 Syntax . 2057   
3.156.2 Examples 2057   
3.156.3 Description 2057   
3.156.4 Output info 2058   
3.156.5 Restrictions 2058   
3.156.6 Related commands 2059   
3.156.7 Default 2059   
compute temp/deform/eff command 2059   
3.157.1 Syntax . 2059   
3.157.2 Examples 2059   
3.157.3 Description 2059   
3.157.4 Output info 2059   
3.157.5 Restrictions 2059   
3.157.6 Related commands 2060   
3.157.7 Default 2060   
.158 compute temp/drude command . 2060   
3.158.1 Syntax 2060   
3.158.2 Examples 2060   
3.158.3 Description 2060   
3.158.4 Output info 2060   
3.158.5 Restrictions 2061   
3.158.6 Related commands 2061   
3.158.7 Default 2061   
.159 compute temp/eff command 2061   
3.159.1 Syntax . 2061   
3.159.2 Examples 2061   
3.159.3 Description 2061   
3.159.4 Output info 2062   
3.159.5 Restrictions 2062   
3.159.6 Related commands 2062   
3.159.7 Default 2062   
.160 compute temp/partial command 2062   
3.160.1 Syntax . 2062   
3.160.2 Examples 2063   
3.160.3 Description 2063   
3.160.4 Output info 2063   
3.160.5 Restrictions 2063   
3.160.6 Related commands 2064   
3.160.7 Default 2064   
3.161 compute temp/profile command 2064   
3.161.1 Syntax . 2064   
3.161.2 Examples 2064   
3.161.3 Description 2064   
3.161.4 Output info 2066   
3.161.5 Restrictions 2066   
3.161.6 Related commands 2066   
3.161.7 Default 2066   
.162 compute temp/ramp command 2066   
3.162.1 Syntax . 2066   
3.162.2 Examples 2067   
3.162.3 Description 2067   
3.162.4 Output info 2067   
3.162.5 Restrictions 2068   
3.162.6 Related commands 2068   
3.162.7 Default 2068   
.163 compute temp/region command 2068   
3.163.1 Syntax . 2068   
3.163.2 Examples 2068   
3.163.3 Description 2068   
3.163.4 Output info 2069   
3.163.5 Restrictions 2069   
3.163.6 Related commands 2069   
3.163.7 Default 2069   
.164 compute temp/region/eff command . 2069   
3.164.1 Syntax . 2069   
3.164.2 Examples 2070   
3.164.3 Description 2070   
3.164.4 Output info 2070   
3.164.5 Restrictions 2070   
3.164.6 Related commands 2070   
3.164.7 Default 2070   
3.165 compute temp/rotate command . 2070   
3.165.1 Syntax . 2070   
3.165.2 Examples 2070   
3.165.3 Description 2071   
3.165.4 Output info 2071   
3.165.5 Restrictions 2071   
3.165.6 Related commands 2071   
3.165.7 Default 2072   
3.166 compute temp/sphere command 2072   
3.166.1 Syntax . 2072   
3.166.2 Examples 2072   
3.166.3 Description 2072   
3.166.4 Output info 2073   
3.166.5 Restrictions 2073   
3.166.6 Related commands 2074   
3.166.7 Default 2074   
3.167 compute temp/uef command 2074   
3.167.1 Syntax . 2074   
3.167.2 Examples 2074   
3.167.3 Description 2074   
3.167.4 Restrictions 2074   
3.167.5 Related commands 2074   
3.167.6 Default 2074   
3.168 compute ti command 2074   
3.168.1 Syntax . 2074   
3.168.2 Examples 2075   
3.168.3 Description 2075   
3.168.4 Output info 2076   
3.168.5 Restrictions 2076   
3.168.6 Related commands 2076   
3.168.7 Default 2076   
3.169 compute torque/chunk command 2076   
3.169.1 Syntax 2076   
3.169.2 Examples 2076   
3.169.3 Description 2077   
3.169.4 Output info 2077   
3.169.5 Restrictions 2077   
3.169.6 Related commands 2077   
3.169.7 Default 2077   
3.170 compute vacf command . 2078   
3.170.1 Syntax 2078   
3.170.2 Examples 2078   
3.170.3 Description 2078   
3.170.4 Output info 2078   
3.170.5 Restrictions 2078   
3.170.6 Related commands 2079   
3.170.7 Default 2079   
3.171 compute vcm/chunk command 2079  

#  

3.171.1 Syntax 2079   
3.171.2 Examples 2079   
3.171.3 Description 2079   
3.171.4 Output info 2079   
3.171.5 Restrictions 2080   
3.171.6 Related commands 2080   
3.171.7 Default 2080   
.172 compute viscosity/cos command 2080   
3.172.1 Syntax . 2080   
3.172.2 Examples 2080   
3.172.3 Description 2080   
3.172.4 Output info 2081   
3.172.5 Restrictions 2081   
3.172.6 Related commands 2082   
3.172.7 Default 2082   
3.173 compute voronoi/atom command . 2082   
3.173.1 Syntax 2082   
3.173.2 Examples 2082   
3.173.3 Description 2082   
3.173.4 Output info 2084   
3.173.5 Restrictions 2084   
3.173.6 Related commands 2085   
3.173.7 Default 2085   
3.174 compute xrd command 2085   
3.174.1 Syntax . 2085   
3.174.2 Examples 2085   
3.174.3 Description 2085   
3.174.4 Output info 2088   
3.174.5 Restrictions 2088   
3.174.6 Related commands 2088   
3.174.7 Default 2088  

# 4 Pair Styles 2089  

# 4.1 pair_style adp command 2089  

4.1.1 Syntax . 2089   
4.1.2 Examples 2089   
4.1.3 Description . . . 2089   
4.1.4 Mixing, shift, table, tail correction, restart, rRESPA info 2091   
4.1.5 Restrictions . . 2091   
4.1.6 Related commands 2091   
4.1.7 Default 2091   
pair_style agni command 2091   
4.2.1 Syntax . . 2091   
4.2.2 Examples 2092   
4.2.3 Description . . . 2092   
4.2.4 Mixing, shift, table, tail correction, restart, rRESPA info 2093   
4.2.5 Restrictions . 2093   
4.2.6 Related commands 2093   
4.2.7 Default 2093   
pair_style aip/water/2dm command . 2093   
4.3.1 Syntax . . 2093   
4.3.2 Examples . 2093   
4.3.3 Description 2094   
4.3.4 Mixing, shift, table, tail correction, restart, rRESPA info 2095   
4.3.5 Restrictions 2095   
4.3.6 Related commands 2096   
4.3.7 Default 2096   
pair_style airebo command 2096   
pair_style airebo/morse command 2096   
pair_style rebo command 2096   
4.6.1 Syntax . 2096   
4.6.2 Examples 2096   
4.6.3 Description . . . . 2097   
4.6.4 Mixing, shift, table, tail correction, restart, rRESPA info 2099   
4.6.5 Restrictions 2099   
4.6.6 Related commands 2099   
4.6.7 Default 2099   
pair_style amoeba command 2099   
pair_style hippo command 2099   
4.8.1 Syntax . 2099   
4.8.2 Examples 2100   
4.8.3 Additional info 2100   
4.8.4 Description . . 2100   
4.8.5 Mixing, shift, table, tail correction, restart, rRESPA info 2102   
4.8.6 Restrictions 2102   
4.8.7 Related commands 2103   
4.8.8 Default 2103   
pair_style atm command 2103   
4.9.1 Syntax . 2103   
4.9.2 Examples 2104   
4.9.3 Description 2104   
4.9.4 Mixing, shift, table, tail correction, restart, rRESPA info 2105   
4.9.5 Restrictions 2106   
4.9.6 Related commands 2106   
4.9.7 Default 2106   
pair_style awpmd/cut command 2106   
4.10.1 Syntax . 2106   
4.10.2 Examples 2106   
4.10.3 Description . . . 2106   
4.10.4 Mixing, shift, table, tail correction, restart, rRESPA info 2107   
4.10.5 Restrictions . 2107   
4.10.6 Related commands 2107   
4.10.7 Default 2107   
pair_style beck command . 2108   
4.11.1 Syntax . 2108   
4.11.2 Examples 2108   
4.11.3 Description 2108   
4.11.4 Mixing, shift, table, tail correction, restart, rRESPA info 2109   
4.11.5 Restrictions . 2109   
4.11.6 Related commands 2109   
4.11.7 Default 2109   
2 pair_style body/nparticle command . 2109   
4.12.1 Syntax . 2109   
4.12.2 Examples 2109   
4.12.3 Description . . . 2109   
4.12.4 Mixing, shift, table, tail correction, restart, rRESPA info 2110   
4.12.5 Restrictions 2110   
4.12.6 Related commands 2111  

# lxxxiv  

# 4.12.7 Default 2111  

4.13 pair_style body/rounded/polygon command 2111   
4.13.1 Syntax . 2111   
4.13.2 Examples 2111   
4.13.3 Description 2111   
4.13.4 Mixing, shift, table, tail correction, restart, rRESPA info 2113   
4.13.5 Restrictions . . . . 2113   
4.13.6 Related commands 2113   
4.13.7 Default 2113   
4.14 pair_style body/rounded/polyhedron command 2113   
4.14.1 Syntax . 2113   
4.14.2 Examples 2114   
4.14.3 Description 2114   
4.14.4 Mixing, shift, table, tail correction, restart, rRESPA info 2116   
4.14.5 Restrictions 2116   
4.14.6 Related commands 2116   
4.14.7 Default 2116   
4.15 pair_style bop command 2116   
4.15.1 Syntax . 2116   
4.15.2 Examples 2116   
4.15.3 Description 2116   
4.15.4 Mixing, shift, table, tail correction, restart, rRESPA info 2121   
4.15.5 Restrictions 2121   
4.15.6 Related commands 2121   
4.15.7 Default 2121   
4.16 pair_style born command 2122   
4.17 pair_style born/coul/long command 2122   
4.18 pair_style born/coul/msm command 2122   
4.19 pair_style born/coul/wolf command 2122   
4.20 pair_style born/coul/dsf command 2122   
4.20.1 Syntax . 2122   
4.20.2 Examples 2122   
4.20.3 Description 2123   
4.20.4 Mixing, shift, table, tail correction, restart, rRESPA info 2124   
4.20.5 Restrictions 2124   
4.20.6 Related commands 2124   
4.20.7 Default 2125   
4.21 pair_style born/gauss command 2125   
4.21.1 Syntax . 2125   
4.21.2 Examples 2125   
4.21.3 Description 2125   
4.21.4 Mixing, shift, table, tail correction, restart, rRESPA info 2125   
4.21.5 Restrictions 2126   
4.21.6 Related commands 2126   
4.21.7 Default 2126   
4.22 pair_style bpm/spring command 2126   
4.22.1 Syntax . 2126   
4.22.2 Examples 2126   
4.22.3 Description 2126   
4.22.4 Mixing, shift, table, tail correction, restart, rRESPA info 2127   
4.22.5 Restrictions 2127   
4.22.6 Related commands 2128   
4.22.7 Default 2128   
4.23 pair_style brownian command 2128  

4.24 pair_style brownian/poly command . 2128   
4.24.1 Syntax . 2128   
4.24.2 Examples 2128   
4.24.3 Description 2128   
4.24.4 Mixing, shift, table, tail correction, restart, rRESPA info 2129   
4.24.5 Restrictions 2129   
4.24.6 Related commands 2130   
4.24.7 Default 2130   
4.25 pair_style buck command . 2130   
4.26 pair_style buck/coul/cut command 2130   
4.27 pair_style buck/coul/long command 2130   
4.28 pair_style buck/coul/msm command 2130   
4.28.1 Syntax . 2130   
4.28.2 Examples 2130   
4.28.3 Description 2131   
4.28.4 Mixing, shift, table, tail correction, restart, rRESPA info 2132   
4.28.5 Restrictions 2132   
4.28.6 Related commands 2132   
4.28.7 Default 2132   
4.29 pair_style buck6d/coul/gauss/dsf command 2133   
4.30 pair_style buck6d/coul/gauss/long command . 2133   
4.30.1 Syntax . . 2133   
4.30.2 Examples 2133   
4.30.3 Description . . 2133   
4.30.4 Mixing, shift, table, tail correction, restart, rRESPA info 2134   
4.30.5 Restrictions 2134   
4.30.6 Related commands 2134   
4.30.7 Default 2134   
4.31 pair_style buck/long/coul/long command . 2135   
4.31.1 Syntax . 2135   
4.31.2 Examples 2135   
4.31.3 Description 2135   
4.31.4 Mixing, shift, table, tail correction, restart, rRESPA info 2136   
4.31.5 Restrictions 2137   
4.31.6 Related commands 2137   
4.31.7 Default 2137   
4.32 pair_style lj/charmm/coul/charmm command 2137   
4.33 pair_style lj/charmm/coul/charmm/implicit command 2137   
4.34 pair_style lj/charmm/coul/long command 2137   
4.35 pair_style lj/charmm/coul/msm command 2137   
4.36 pair_style lj/charmmfsw/coul/charmmfsh command 2137   
4.37 pair_style lj/charmmfsw/coul/long command 2137   
4.37.1 Syntax . 2137   
4.37.2 Examples 2138   
4.37.3 Description 2138   
4.37.4 Mixing, shift, table, tail correction, restart, rRESPA info 2140   
4.37.5 Restrictions 2140   
4.37.6 Related commands 2140   
4.37.7 Default 2141   
4.38 pair_style lj/class2 command 2141   
4.39 pair_style lj/class2/coul/cut command 2141   
4.40 pair_style lj/class2/coul/long command 2141   
4.40.1 Syntax . 2141   
4.40.2 Examples 2141  

# lxxxvi  

# 4.40.3 Description 2142  

4.40.6 Related commands 2143  

4.40.7 Default 2143  

# _style colloid command  

4.41.2 Examples 2144   
4.41.3 Description 2144   
4.41.4 Mixing, shift, table, tail correction, restart, rRESPA info 2146   
4.41.5 Restrictions 2146   
4.41.6 Related commands 2146   
4.41.7 Default 2146   
4.42 pair_style comb command 2146   
4.43 pair_style comb3 command . 2146   
4.43.1 Syntax . 2146   
4.43.2 Examples 2147   
4.43.3 Description 2147   
4.43.4 Mixing, shift, table, tail correction, restart, rRESPA info 2148   
4.43.5 Restrictions . 2149   
4.43.6 Related commands 2149   
4.43.7 Default 2149   
4.44 pair_style cosine/squared command 2149   
4.44.1 Syntax . 2149   
4.44.2 Examples 2149   
4.44.3 Description . . . . 2150   
4.44.4 Mixing, shift, table, tail correction, restart, rRESPA info 2151   
4.44.5 Restrictions 2151   
4.44.6 Related commands 2151   
4.44.7 Default 2151   
4.45 pair_style coul/cut command 2151   
4.46 pair_style coul/cut/global command 2151   
4.47 pair_style coul/ctip command . 2151   
4.48 pair_style coul/debye command 2151   
4.49 pair_style coul/dsf command 2151   
4.50 pair_style coul/exclude command . 2151   
4.51 pair_style coul/long command 2151   
4.52 pair_style coul/msm command 2152   
4.53 pair_style coul/streitz command 2152   
4.54 pair_style coul/wolf command 2152   
4.55 pair_style tip4p/cut command . 2152   
4.56 pair_style tip4p/long command 2152   
4.56.1 Syntax . 2152   
4.56.2 Examples 2152   
4.56.3 Description 2153   
4.56.4 Mixing, shift, table, tail correction, restart, rRESPA info 2156   
4.56.5 Restrictions 2156   
4.56.6 Related commands 2157   
4.56.7 Default 2157   
4.57 pair_style coul/diel command . 2157   
4.57.1 Syntax . 2157   
4.57.2 Examples 2157   
4.57.3 Description 2157   
4.57.4 Mixing, shift, table, tail correction, restart, rRESPA info 2158   
4.57.5 Restrictions 2158   
4.57.6 Related commands 2158   
4.57.7 Default 2158   
4.58 pair_style coul/shield command 2159   
4.58.1 Syntax . 2159   
4.58.2 Examples 2159   
4.58.3 Description 2159   
4.58.4 Mixing, shift, table, tail correction, restart, rRESPA info 2159   
4.58.5 Restrictions 2160   
4.58.6 Related commands 2160   
4.58.7 Default 2160   
4.59 pair_style coul/slater command . 2160   
4.60 pair_style coul/slater/cut command . 2160   
4.61 pair_style coul/slater/long command 2160   
4.61.1 Syntax . 2160   
4.61.2 Examples 2160   
4.61.3 Description 2160   
4.61.4 Mixing, shift, table, tail correction, restart, rRESPA info 2161   
4.61.5 Restrictions 2161   
4.61.6 Related commands 2161   
4.61.7 Default 2162   
4.62 pair_style coul/tt command 2162   
4.62.1 Syntax . 2162   
4.62.2 Examples 2162   
4.62.3 Description 2162   
4.62.4 Mixing, shift, table, tail correction, restart, rRESPA info 2163   
4.62.5 Restrictions 2163   
4.62.6 Related commands 2163   
4.62.7 Default 2163   
4.63 pair_style born/coul/dsf/cs command . 2163   
4.64 pair_style born/coul/long/cs command 2163   
4.65 pair_style born/coul/wolf/cs command 2163   
4.66 pair_style buck/coul/long/cs command . 2164   
4.67 pair_style coul/long/cs command . 2164   
4.68 pair_style coul/wolf/cs command . 2164   
4.69 pair_style lj/cut/coul/long/cs command . 2164   
4.70 pair_style lj/class2/coul/long/cs command 2164   
4.70.1 Syntax . 2164   
4.70.2 Examples 2164   
4.70.3 Description 2165   
4.70.4 Mixing, shift, table, tail correction, restart, rRESPA info 2166   
4.70.5 Restrictions 2166   
4.70.6 Related commands 2166   
4.70.7 Default 2166   
4.71 pair_style coul/cut/dielectric command . 2166   
4.72 pair_style coul/long/dielectric command 2166   
4.73 pair_style lj/cut/coul/cut/dielectric command 2166   
4.74 pair_style lj/cut/coul/debye/dielectric command 2167   
4.75 pair_style lj/cut/coul/long/dielectric command . 2167   
4.76 pair_style lj/cut/coul/msm/dielectric command . 2167   
4.77 pair_style lj/long/coul/long/dielectric command 2167   
4.77.1 Syntax . 2167   
4.77.2 Examples 2167   
4.77.3 Description 2167  

# lxxxviii  

4.77.4 Mixing, shift, table, tail correction, restart, rRESPA info 2168   
4.77.5 Restrictions 2168   
4.77.6 Related commands 2168   
4.77.7 Default 2168   
4.78 pair_style lj/cut/dipole/cut command . 2168   
4.79 pair_style lj/sf/dipole/sf command 2168   
4.80 pair_style lj/cut/dipole/long command 2168   
4.81 pair_style lj/long/dipole/long command 2169   
4.81.1 Syntax . 2169   
4.81.2 Examples 2169   
4.81.3 Description 2169   
4.81.4 Mixing, shift, table, tail correction, restart, rRESPA info 2173   
4.81.5 Restrictions 2173   
4.81.6 Related commands 2174   
4.81.7 Default 2174   
4.82 pair_style dispersion/d3 command 2174   
4.82.1 Syntax . 2174   
4.82.2 Examples 2174   
4.82.3 Description 2174   
4.82.4 Coefficients . 2175   
4.82.5 Mixing, shift, table, tail correction, restart, rRESPA info 2175   
4.82.6 Restrictions 2176   
4.82.7 Related commands 2176   
4.82.8 Default 2176   
4.83 pair_style dpd command 2176   
4.84 pair_style dpd/tstat command 2176   
4.84.1 Syntax . 2176   
4.84.2 Examples 2176   
4.84.3 Description 2177   
4.84.4 Mixing, shift, table, tail correction, restart, rRESPA info 2178   
4.84.5 Restrictions 2179   
4.84.6 Related commands 2179   
4.84.7 Default 2179   
4.85 pair_style dpd/coul/slater/long command . 2179   
4.85.1 Syntax . 2179   
4.85.2 Examples 2179   
4.85.3 Description 2180   
4.85.4 Mixing, shift, table, tail correction, restart, rRESPA info 2181   
4.85.5 Restrictions 2181   
4.85.6 Related commands 2182   
4.85.7 Default 2182   
4.86 pair_style dpd/ext command 2182   
4.87 pair_style dpd/ext/tstat command . 2182   
4.87.1 Syntax . 2182   
4.87.2 Examples 2182   
4.87.3 Description 2182   
4.87.4 Restrictions 2185   
4.87.5 Related commands 2185   
4.88 pair_style dpd/fdt command 2185   
4.89 pair_style dpd/fdt/energy command 2185   
4.89.1 Syntax . 2185   
4.89.2 Examples 2185   
4.89.3 Description 2186   
4.89.4 Restrictions 2187   
4.89.5 Related commands 2187   
4.89.6 Default 2187   
4.90 pair_style drip command 2188   
4.90.1 Syntax . 2188   
4.90.2 Examples 2188   
4.90.3 Description 2188   
4.90.4 Mixing, shift, table, tail correction, restart, rRESPA info 2189   
4.90.5 Restrictions 2189   
4.90.6 Related commands 2189   
4.91 pair_style dsmc command 2189   
4.91.1 Syntax . 2189   
4.91.2 Examples 2190   
4.91.3 Description 2190   
4.91.4 Mixing, shift, table, tail correction, restart, rRESPA info 2191   
4.91.5 Restrictions 2191   
4.91.6 Related commands 2191   
4.91.7 Default 2191   
4.92 pair_style e3b command 2191   
4.92.1 Syntax . 2191   
4.92.2 Examples 2192   
4.92.3 Description 2192   
4.92.4 Mixing, shift, table, tail correction, restart, rRESPA info 2194   
4.92.5 Restrictions 2194   
4.92.6 Related commands 2194   
4.92.7 Default 2194   
4.93 pair_style eam command 2194   
4.94 pair_style eam/alloy command 2194   
4.95 pair_style eam/cd command 2194   
4.96 pair_style eam/cd/old command 2194   
4.97 pair_style eam/fs command . 2194   
4.98 pair_style eam/he command 2194   
4.98.1 Syntax . 2195   
4.98.2 Examples 2195   
4.98.3 Description 2195   
4.98.4 Mixing, shift, table, tail correction, restart, rRESPA info 2200   
4.98.5 Restrictions 2200   
4.98.6 Related commands 2201   
4.98.7 Default 2201   
4.99 pair_style edip command . 2201   
4.100 pair_style edip/multi command . 2201   
4.100.1 Syntax . 2201   
4.100.2 Examples 2201   
4.100.3 Description 2201   
4.100.4 Mixing, shift, table, tail correction, restart, rRESPA info 2203   
4.100.5 Restrictions 2204   
4.100.6 Related commands 2204   
4.100.7 Default 2204   
4.101 pair_style eff/cut command 2204   
4.101.1 Syntax . 2204   
4.101.2 Examples 2204   
4.101.3 Description 2204   
4.101.4 Mixing, shift, table, tail correction, restart, rRESPA info 2207   
4.101.5 Restrictions 2207   
4.101.6 Related commands 2208   
4.101.7 Default 2208   
4.102 pair_style eim command 2208   
4.102.1 Syntax . 2208   
4.102.2 Examples 2208   
4.102.3 Description 2208   
4.102.4 Restrictions 2210   
4.102.5 Related commands 2210   
4.102.6 Default 2210   
4.103 pair_style exp6/rx command 2210   
4.103.1 Syntax . 2211   
4.103.2 Examples 2211   
4.103.3 Description 2211   
4.103.4 Mixing, shift, table, tail correction, restart, rRESPA info 2213   
4.103.5 Restrictions 2213   
4.103.6 Related commands 2213   
4.103.7 Default 2213   
4.104 pair_style extep command 2213   
4.104.1 Syntax . 2213   
4.104.2 Examples 2213   
4.104.3 Description 2213   
4.104.4 Restrictions 2214   
4.104.5 Related commands 2214   
4.104.6 Default 2214   
4.105 pair_style lj/cut/soft command 2214   
4.106 pair_style lj/cut/coul/cut/soft command 2214   
4.107 pair_style lj/cut/coul/long/soft command 2214   
4.108 pair_style lj/cut/tip4p/long/soft command 2214   
4.109 pair_style lj/charmm/coul/long/soft command 2214   
4.110 pair_style lj/class2/soft command . 2214   
4.111 pair_style lj/class2/coul/cut/soft command 2214   
4.112 pair_style lj/class2/coul/long/soft command 2214   
4.113 pair_style coul/cut/soft command . 2214   
4.114 pair_style coul/long/soft command 2215   
4.115 pair_style tip4p/long/soft command 2215   
4.116 pair_style morse/soft command . 2215   
4.116.1 Syntax . 2215   
4.116.2 Examples 2216   
4.116.3 Description 2217   
4.116.4 Mixing, shift, table, tail correction, restart, rRESPA info 2220   
4.116.5 Restrictions 2220   
4.116.6 Related commands 2221   
4.116.7 Default 2221   
4.117 pair_style gauss command 2221   
4.118 pair_style gauss/cut command 2221   
4.118.1 Syntax . 2221   
4.118.2 Examples 2221   
4.118.3 Description 2221   
4.118.4 Mixing, shift, table, tail correction, restart, rRESPA info 2222   
4.118.5 Restrictions 2223   
4.118.6 Related commands 2223   
4.118.7 Default 2223   
4.119 pair_style gayberne command 2223   
4.119.1 Syntax 2224   
4.119.2 Examples 2224   
4.119.3 Description 2224   
4.119.4 Mixing, shift, table, tail correction, restart, rRESPA info 2226   
4.119.5 Restrictions 2226   
4.119.6 Related commands 2226   
4.119.7 Default 2226   
4.120 pair_style gran/hooke command 2226   
4.121 pair_style gran/hooke/history command 2227   
4.122 pair_style gran/hertz/history command 2227   
4.122.1 Syntax 2227   
4.122.2 Examples 2227   
4.122.3 Description 2227   
4.122.4 Mixing, shift, table, tail correction, restart, rRESPA info 2230   
4.122.5 Restrictions 2230   
4.122.6 Related commands 2230   
4.122.7 Default 2230   
4.123 pair_style granular command . 2230   
4.123.1 Syntax . 2230   
4.123.2 Examples 2231   
4.123.3 Description 2231   
4.123.4 Mixing, shift, table, tail correction, restart, rRESPA info 2241   
4.123.5 Restrictions 2242   
4.123.6 Related commands 2242   
4.123.7 Default 2242   
4.123.8 References . 2243   
4.124 pair_style lj/gromacs command . 2244   
4.125 pair_style lj/gromacs/coul/gromacs command 2244   
4.125.1 Syntax . 2244   
4.125.2 Examples 2244   
4.125.3 Description 2244   
4.125.4 Mixing, shift, table, tail correction, restart, rRESPA info 2245   
4.125.5 Restrictions 2246   
4.125.6 Related commands 2246   
4.125.7 Default 2246   
4.126 pair_style gw command . 2246   
4.127 pair_style gw/zbl command . 2246   
4.127.1 Syntax . 2246   
4.127.2 Examples 2246   
4.127.3 Description 2246   
4.127.4 Mixing, shift, table, tail correction, restart, rRESPA info 2247   
4.127.5 Restrictions 2247   
4.127.6 Related commands 2247   
4.127.7 Default 2247   
4.128 pair_style harmonic/cut command 2248   
4.128.1 Syntax . 2248   
4.128.2 Examples 2248   
4.128.3 Description 2248   
4.128.4 Mixing, shift, table, tail correction, restart, rRESPA info 2248   
4.128.5 Restrictions 2249   
4.128.6 Related commands 2249   
4.128.7 Default 2249   
4.129 pair_style hbond/dreiding/lj command 2249   
4.130 pair_style hbond/dreiding/lj/angleoffset command 2249   
4.131 pair_style hbond/dreiding/morse command 2249   
4.132 pair_style hbond/dreiding/morse/angleoffset command 2249   
4.132.1 Syntax . 2249   
4.132.2 Examples 2250   
4.132.3 Description 2250   
4.132.4 Mixing, shift, table, tail correction, restart, rRESPA info 2253   
4.132.5 Restrictions 2254   
4.132.6 Related commands 2254   
4.132.7 Default 2254   
4.133 pair_style hdnnp command 2254   
4.133.1 Syntax . 2254   
4.133.2 Examples . 2254   
4.133.3 Description 2255   
4.133.4 Mixing, shift, table, tail correction, restart, rRESPA info 2256   
4.133.5 Restrictions 2256   
4.134 pair_style hybrid command . 2257   
4.135 pair_style hybrid/molecular command 2257   
4.136 pair_style hybrid/overlay command . 2257   
4.137 pair_style hybrid/scaled command 2257   
4.137.1 Syntax . 2257   
4.137.2 Examples 2257   
4.137.3 Description 2258   
4.137.4 Mixing, shift, table, tail correction, restart, rRESPA info 2263   
4.137.5 Restrictions 2263   
4.137.6 Related commands 2264   
4.137.7 Default 2264   
4.138 pair_style ilp/graphene/hbn command 2264   
4.138.1 Syntax . 2264   
4.138.2 Examples 2264   
4.138.3 Description 2264   
4.138.4 Mixing, shift, table, tail correction, restart, rRESPA info 2266   
4.138.5 Restrictions 2266   
4.138.6 Related commands 2266   
4.138.7 Default 2266   
4.139 pair_style ilp/tmd command 2267   
4.139.1 Syntax 2267   
4.139.2 Examples 2267   
4.139.3 Description 2267   
4.139.4 Mixing, shift, table, tail correction, restart, rRESPA info 2268   
4.139.5 Restrictions 2269   
4.139.6 Related commands 2269   
4.139.7 Default 2269   
4.140 pair_style kim command 2269   
4.140.1 Syntax . 2269   
4.140.2 Examples 2269   
4.140.3 Description 2269   
4.140.4 Mixing, shift, table, tail correction, restart, rRESPA info 2270   
4.140.5 Restrictions 2270   
4.140.6 Related commands 2270   
4.140.7 Default 2270   
4.141 pair_style kolmogorov/crespi/full command 2271   
4.141.1 Syntax . 2271   
4.141.2 Examples 2271   
4.141.3 Description . 2271   
4.141.4 Mixing, shift, table, tail correction, restart, rRESPA info 2272   
4.141.5 Restrictions 2272  

# 4.141.6 Related commands 2272  

# 4.141.7 Default 2273  

42 pair_style kolmogorov/crespi/z command 2273  

4.142.3 Description 2273   
4.142.4 Restrictions 2274   
4.142.5 Related commands 2274   
4.142.6 Default 2274   
4.143 pair_style lcbop command 2274   
4.143.1 Syntax . 2274   
4.143.2 Examples . 2274   
4.143.3 Description 2274   
4.143.4 Mixing, shift, table, tail correction, restart, rRESPA info 2275   
4.143.5 Restrictions 2275   
4.143.6 Related commands 2275   
4.143.7 Default 2275   
4.144 pair_style lebedeva/z command . 2275   
4.144.1 Syntax . 2275   
4.144.2 Examples 2275   
4.144.3 Description 2276   
4.144.4 Restrictions 2276   
4.144.5 Related commands 2276   
4.144.6 Default 2276   
4.145 pair_style lepton command 2277   
4.145.1 Syntax . 2277   
4.145.2 Examples . 2277   
4.145.3 Description 2277   
4.145.4 Lepton expression syntax and features 2278   
4.145.5 Mixing, shift, table, tail correction, restart, rRESPA info 2280   
4.145.6 Restrictions 2280   
4.145.7 Related commands 2280   
4.145.8 Default 2280   
4.146 pair_style line/lj command 2280   
4.146.1 Syntax . 2280   
4.146.2 Examples 2280   
4.146.3 Description 2281   
4.146.4 Mixing, shift, table, tail correction, restart, rRESPA info 2282   
4.146.5 Restrictions 2282   
4.146.6 Related commands 2282   
4.146.7 Default 2282   
4.147 pair_style list command . 2282   
4.147.1 Syntax . 2282   
4.147.2 Examples 2282   
4.147.3 Description 2283   
4.147.4 Mixing, shift, table, tail correction, restart, rRESPA info 2284   
4.147.5 Restrictions 2284   
4.147.6 Related commands 2284   
4.147.7 Default 2284   
4.148 pair_style lj/cut command . 2285   
4.148.1 Syntax . 2285   
4.148.2 Examples 2285   
4.148.3 Description 2285   
4.148.4 Coefficients 2285   
4.148.5 Mixing, shift, table, tail correction, restart, rRESPA info 2286   
4.148.6 Related commands 2286   
4.148.7 Default 2286   
4.149 pair_style lj96/cut command 2287   
4.149.1 Syntax . 2287   
4.149.2 Examples 2287   
4.149.3 Description 2287   
4.149.4 Mixing, shift, table, tail correction, restart, rRESPA info 2288   
4.149.5 Restrictions 2288   
4.149.6 Related commands 2288   
4.149.7 Default 2288   
4.150 pair_style lj/cubic command 2288   
4.150.1 Syntax . 2288   
4.150.2 Examples 2288   
4.150.3 Description 2288   
4.150.4 Mixing, shift, table, tail correction, restart, rRESPA info . . . . . . . 2289   
4.150.5 Restrictions 2290   
4.150.6 Related commands 2290   
4.150.7 Default 2290   
4.151 pair_style lj/cut/coul/cut command 2290   
4.152 pair_style lj/cut/coul/debye command 2290   
4.153 pair_style lj/cut/coul/dsf command 2290   
4.154 pair_style lj/cut/coul/long command 2290   
4.155 pair_style lj/cut/coul/msm command 2290   
4.156 pair_style lj/cut/coul/wolf command 2290   
4.156.1 Syntax . 2290   
4.156.2 Examples 2291   
4.156.3 Description 2292   
4.156.4 Coefficients 2293   
4.156.5 Mixing, shift, table, tail correction, restart, rRESPA info 2293   
4.156.6 Restrictions 2294   
4.156.7 Related commands 2294   
4.156.8 Default 2294   
4.157 pair_style lj/cut/sphere command . 2294   
4.157.1 Syntax . 2294   
4.157.2 Examples 2294   
4.157.3 Description 2294   
4.157.4 Coefficients 2296   
4.157.5 Mixing, shift, table, tail correction, restart, rRESPA info 2296   
4.157.6 Restrictions 2296   
4.157.7 Related commands 2297   
4.157.8 Default 2297   
4.158 pair_style lj/cut/tip4p/cut command 2297   
4.159 pair_style lj/cut/tip4p/long command . 2297   
4.159.1 Syntax . 2297   
4.159.2 Examples 2297   
4.159.3 Description 2298   
4.159.4 Coefficients 2299   
4.159.5 Mixing, shift, table, tail correction, restart, rRESPA info 2299   
4.159.6 Restrictions 2300   
4.159.7 Related commands 2300   
4.159.8 Default 2300   
4.160 pair_style lj/expand command 2300   
4.161 pair_style lj/expand/coul/long command 2300   
4.161.1 Syntax . 2300   
4.161.2 Examples 2300   
4.161.3 Description 2301   
4.161.4 Mixing, shift, table, tail correction, restart, rRESPA info 2301   
4.161.5 Restrictions 2302   
4.161.6 Related commands 2302   
4.161.7 Default 2302   
4.162 pair_style lj/expand/sphere command 2302   
4.162.1 Syntax . 2302   
4.162.2 Examples 2302   
4.162.3 Description 2302   
4.162.4 Coefficients 2303   
4.162.5 Mixing, shift, table, tail correction, restart, rRESPA info 2304   
4.162.6 Restrictions 2304   
4.162.7 Related commands 2304   
4.162.8 Default 2304   
4.163 pair_style lj/long/coul/long command 2305   
4.164 pair_style lj/long/tip4p/long command 2305   
4.164.1 Syntax . . . 2305   
4.164.2 Examples 2305   
4.164.3 Description 2306   
4.164.4 Mixing, shift, table, tail correction, restart, rRESPA info 2307   
4.164.5 Restrictions 2308   
4.164.6 Related commands 2308   
4.164.7 Default 2308   
4.165 pair_style lj/relres command 2308   
4.165.1 Syntax . 2308   
4.165.2 Examples 2308   
4.165.3 Description 2309   
4.165.4 Mixing, shift, table, tail correction, restart, rRESPA info 2311   
4.165.5 Restrictions 2312   
4.165.6 Related commands 2312   
4.165.7 Default 2312   
4.166 pair_style lj/smooth command 2312   
4.166.1 Syntax . 2312   
4.166.2 Examples 2312   
4.166.3 Description 2312   
4.166.4 Mixing, shift, table, tail correction, restart, rRESPA info 2313   
4.166.5 Restrictions 2314   
4.166.6 Related commands 2314   
4.166.7 Default 2314   
4.167 pair_style lj/smooth/linear command . 2314   
4.167.1 Syntax . 2314   
4.167.2 Examples 2314   
4.167.3 Description 2314   
4.167.4 Mixing, shift, table, tail correction, restart, rRESPA info 2315   
4.167.5 Restrictions 2315   
4.167.6 Related commands 2315   
4.167.7 Default 2315   
4.168 pair_style lj/switch3/coulgauss/long command . 2315   
4.169 pair_style mm3/switch3/coulgauss/long command . 2315   
4.169.1 Syntax . 2315   
4.169.2 Examples 2316   
4.169.3 Description 2316   
4.169.4 Mixing, shift, table, tail correction, restart, rRESPA info 2317   
4.169.5 Restrictions 2317   
4.169.6 Related commands 2317   
4.169.7 Default 2317   
4.170 pair_style local/density command 2317   
4.170.1 Syntax . 2317   
4.170.2 Examples 2318   
4.170.3 Description 2318   
4.170.4 Mixing, shift, table, tail correction, restart, rRESPA info 2320   
4.170.5 Restrictions 2320   
4.170.6 Related commands 2320   
4.170.7 Default 2320   
4.171 pair_style lubricate command . 2321   
4.172 pair_style lubricate/poly command 2321   
4.172.1 Syntax . 2321   
4.172.2 Examples 2321   
4.172.3 Description . . 2321   
4.172.4 Mixing, shift, table, tail correction, restart, rRESPA info 2323   
4.172.5 Restrictions 2323   
4.172.6 Related commands 2323   
4.172.7 Default 2324   
4.173 pair_style lubricateU command . 2324   
4.174 pair_style lubricateU/poly command . 2324   
4.174.1 Syntax . 2324   
4.174.2 Examples 2324   
4.174.3 Description 2324   
4.174.4 Mixing, shift, table, tail correction, restart, rRESPA info 2326   
4.174.5 Restrictions 2326   
4.174.6 Related commands 2326   
4.174.7 Default 2327   
4.175 pair_style lj/mdf command 2327   
4.176 pair_style buck/mdf command 2327   
4.177 pair_style lennard/mdf command . 2327   
4.177.1 Syntax . 2327   
4.177.2 Examples 2327   
4.177.3 Description 2327   
4.177.4 Mixing, shift, table, tail correction, restart, rRESPA info 2329   
4.177.5 Restrictions 2329   
4.177.6 Related commands 2329   
4.177.7 Default 2329   
4.178 pair_style meam command 2329   
4.179 pair_style meam/ms command 2329   
4.179.1 Syntax . 2329   
4.179.2 Examples 2329   
4.179.3 Description 2330   
4.179.4 Mixing, shift, table, tail correction, restart, rRESPA info 2335   
4.179.5 Restrictions 2335   
4.179.6 Related commands 2335   
4.179.7 Default 2335   
4.180 pair_style meam/spline command 2336   
4.180.1 Syntax . 2336   
4.180.2 Examples 2336   
4.180.3 Description 2336   
4.180.4 Mixing, shift, table, tail correction, restart, rRESPA info 2337   
4.180.5 Restrictions 2337   
4.180.6 Related commands 2338   
4.180.7 Default 2338   
4.181 pair_style meam/sw/spline command . 2338   
4.181.1 Syntax . 2338   
4.181.2 Examples 2338   
4.181.3 Description 2338   
4.181.4 Mixing, shift, table, tail correction, restart, rRESPA info 2339   
4.181.5 Restrictions 2339   
4.181.6 Related commands 2339   
4.181.7 Default 2340   
4.182 pair_style mesocnt command 2340   
4.183 pair_style mesocnt/viscous command 2340   
4.183.1 Syntax . . 2340   
4.183.2 Examples 2340   
4.183.3 Description 2340   
4.183.4 Mixing, shift, table, tail correction, restart, rRESPA info 2342   
4.183.5 Restrictions 2342   
4.183.6 Related commands 2343   
4.183.7 Default 2343   
4.184 pair_style edpd command . 2343   
4.185 pair_style mdpd command 2343   
4.186 pair_style mdpd/rhosum command 2343   
4.187 pair_style tdpd command 2343   
4.187.1 Syntax . . 2343   
4.187.2 Examples 2344   
4.187.3 Description 2344   
4.187.4 Example scripts . . 2347   
4.187.5 Mixing, shift, table, tail correction, restart, rRESPA info . . . . . . . . 2349   
4.187.6 Restrictions 2349   
4.187.7 Related commands 2349   
4.187.8 Default 2349   
4.188 pair_style mgpt command . 2349   
4.188.1 Syntax . 2349   
4.188.2 Examples 2349   
4.188.3 Description 2349   
4.188.4 Mixing, shift, table, tail correction, restart, rRESPA info . . . . . . . 2351   
4.188.5 Restrictions 2351   
4.188.6 Related commands 2351   
4.188.7 Default 2351   
4.189 pair_style mie/cut command 2352   
4.189.1 Syntax . 2352   
4.189.2 Examples 2352   
4.189.3 Description 2352   
4.189.4 Mixing, shift, table, tail correction, restart, rRESPA info 2353   
4.189.5 Restrictions 2353   
4.189.6 Related commands 2353   
4.189.7 Default 2353   
4.190 pair_style mliap command 2353   
4.190.1 Syntax . 2354   
4.190.2 Examples 2354   
4.190.3 Description 2354   
4.190.4 Mixing, shift, table, tail correction, restart, rRESPA info 2357   
4.190.5 Restrictions 2357   
4.190.6 Related commands 2357   
4.190.7 Default 2357   
4.191 pair_style momb command 2358   
4.191.1 Syntax . 2358   
4.191.2 Examples 2358   
4.191.3 Description 2358   
4.191.4 Restrictions 2358   
4.191.5 Related commands 2359   
4.191.6 Default 2359   
4.192 pair_style morse command 2359   
4.193 pair_style morse/smooth/linear command 2359   
4.193.1 Syntax . 2359   
4.193.2 Examples 2359   
4.193.3 Description 2359   
4.193.4 Mixing, shift, table, tail correction, restart, rRESPA info 2360   
4.193.5 Restrictions 2361   
4.193.6 Related commands 2361   
4.193.7 Default 2361   
4.194 pair_style multi/lucy command 2361   
4.194.1 Syntax . 2361   
4.194.2 Examples 2361   
4.194.3 Description 2361   
4.194.4 Mixing, shift, table, tail correction, restart, rRESPA info 2363   
4.194.5 Restrictions 2363   
4.194.6 Related commands 2363   
4.194.7 Default 2363   
4.195 pair_style multi/lucy/rx command 2363   
4.195.1 Syntax . 2364   
4.195.2 Examples 2364   
4.195.3 Description 2364   
4.195.4 Mixing, shift, table, tail correction, restart, rRESPA info 2366   
4.195.5 Restrictions 2366   
4.195.6 Related commands 2366   
4.195.7 Default 2367   
4.196 pair_style nb3b/harmonic command 2367   
4.197 pair_style nb3b/screened command . 2367   
4.197.1 Syntax 2367   
4.197.2 Examples 2367   
4.197.3 Description 2367   
4.197.4 Restrictions 2368   
4.197.5 Related commands 2368   
4.197.6 Default 2368   
4.198 pair_style nm/cut command . 2368   
4.199 pair_style nm/cut/split command 2369   
4.200 pair_style nm/cut/coul/cut command 2369   
4.201 pair_style nm/cut/coul/long command 2369   
4.201.1 Syntax . 2369   
4.201.2 Examples 2369   
4.201.3 Description 2369   
4.201.4 Mixing, shift, table, tail correction, restart, rRESPA info 2370   
4.201.5 Restrictions 2371   
4.201.6 Related commands 2371   
4.201.7 Default 2371   
4.202 pair_style none command . 2371   
4.202.1 Syntax . 2371   
4.202.2 Examples 2371   
4.202.3 Description 2371   
4.202.4 Restrictions 2372   
4.202.5 Related commands 2372   
4.202.6 Default 2372   
4.203 pair_style oxdna/excv command 2372   
4.204 pair_style oxdna/stk command 2372   
4.205 pair_style oxdna/hbond command 2372   
4.206 pair_style oxdna/xstk command 2372   
4.207 pair_style oxdna/coaxstk command . 2372   
4.207.1 Syntax . 2372   
4.207.2 Examples 2373   
4.207.3 Description 2374   
4.207.4 Potential file reading 2375   
4.207.5 Restrictions 2375   
4.207.6 Related commands 2375   
4.207.7 Default 2375   
4.208 pair_style oxdna2/excv command . 2376   
4.209 pair_style oxdna2/stk command 2376   
4.210 pair_style oxdna2/hbond command . 2376   
4.211 pair_style oxdna2/xstk command . 2376   
4.212 pair_style oxdna2/coaxstk command 2376   
4.213 pair_style oxdna2/dh command . 2376   
4.213.1 Syntax . 2376   
4.213.2 Examples 2376   
4.213.3 Description 2378   
4.213.4 Potential file reading 2379   
4.213.5 Restrictions 2379   
4.213.6 Related commands 2379   
4.213.7 Default 2380   
4.214 pair_style oxrna2/excv command . 2380   
4.215 pair_style oxrna2/stk command . 2380   
4.216 pair_style oxrna2/hbond command 2380   
4.217 pair_style oxrna2/xstk command 2380   
4.218 pair_style oxrna2/coaxstk command 2380   
4.219 pair_style oxrna2/dh command 2380   
4.219.1 Syntax . 2380   
4.219.2 Examples 2381   
4.219.3 Description 2382   
4.219.4 Potential file reading 2383   
4.219.5 Restrictions 2384   
4.219.6 Related commands 2384   
4.219.7 Default 2384   
4.220 pair_style pace command . 2384   
4.221 pair_style pace/extrapolation command 2384   
4.221.1 Syntax . 2384   
4.221.2 Examples 2384   
4.221.3 Description 2385   
4.221.4 Extrapolation grade 2385   
4.221.5 Core repulsion 2386   
4.221.6 Mixing, shift, table, tail correction, restart, rRESPA info 2386   
4.221.7 Restrictions 2387   
4.221.8 Related commands 2387   
4.221.9 Default 2387   
4.222 pair_style pedone command 2387   
4.222.1 Syntax . 2387   
4.222.2 Examples 2387   
4.222.3 Description 2387   
4.222.4 Mixing, shift, table, tail correction, restart, rRESPA info 2388   
4.222.5 Restrictions 2388   
4.222.6 Related commands 2389   
4.222.7 Default 2389   
4.223 pair_style peri/pmb command 2389   
4.224 pair_style peri/lps command 2389   
4.225 pair_style peri/ves command 2389   
4.226 pair_style peri/eps command 2389   
4.226.1 Syntax . 2389   
4.226.2 Examples 2389   
4.226.3 Description 2389   
4.226.4 Mixing, shift, table, tail correction, restart, rRESPA info 2391   
4.226.5 Restrictions 2391   
4.226.6 Related commands 2391   
4.226.7 Default 2392   
4.227 pair_style pod command 2392   
4.227.1 Syntax . 2392   
4.227.2 Examples 2392   
4.227.3 Description 2392   
4.227.4 Mixing, shift, table, tail correction, restart, rRESPA info 2393   
4.227.5 Restrictions 2393   
4.227.6 Related commands 2393   
4.227.7 Default 2393   
4.228 pair_style polymorphic command 2394   
4.228.1 Syntax . 2394   
4.228.2 Examples 2394   
4.228.3 Description 2394   
4.228.4 Mixing, shift, table, tail correction, restart, rRESPA info 2398   
4.228.5 Restrictions 2398   
4.228.6 Related commands 2398   
4.229 pair_style python command . 2399   
4.229.1 Syntax . 2399   
4.229.2 Examples 2399   
4.229.3 Description 2399   
4.229.4 Mixing, shift, table, tail correction, restart, rRESPA info 2402   
4.229.5 Restrictions 2403   
4.229.6 Related commands 2403   
4.229.7 Default 2403   
4.230 pair_style quip command 2403   
4.230.1 Syntax . 2403   
4.230.2 Examples 2403   
4.230.3 Description 2403   
4.230.4 Mixing, shift, table, tail correction, restart, rRESPA info 2404   
4.230.5 Restrictions 2404   
4.230.6 Related commands 2404   
4.231 pair_style rann command 2404   
4.231.1 Syntax . 2404   
4.231.2 Examples 2404   
4.231.3 Description 2404   
4.231.4 Potential file syntax 2405   
4.231.5 Formulation 2408   
4.231.6 Restrictions 2410   
4.231.7 Defaults 2410   
4.232 pair_style reaxff command 2410   
4.232.1 Syntax . 2410   
4.232.2 Examples 2411   
4.232.3 Description 2411   
4.232.4 Control file 2414   
4.232.5 Mixing, shift, table, tail correction, restart, rRESPA info 2415   
4.232.6 Restrictions 2415   
4.232.7 Related commands 2416   
4.232.8 Default 2416   
4.233 pair_style rebomos command . 2416   
4.233.1 Syntax . 2416   
4.233.2 Examples 2416   
4.233.3 Description 2416   
4.233.4 Mixing, shift, table, tail correction, restart, rRESPA info 2417   
4.233.5 Restrictions 2417   
4.233.6 Related commands 2418   
4.233.7 Default 2418   
4.234 pair_style resquared command 2418   
4.234.1 Syntax . 2418   
4.234.2 Examples 2418   
4.234.3 Description 2418   
4.234.4 Mixing, shift, table, tail correction, restart, rRESPA info 2420   
4.234.5 Restrictions 2420   
4.234.6 Related commands 2420   
4.234.7 Default 2421   
4.235 pair_style rheo command . 2421   
4.235.1 Syntax . 2421   
4.235.2 Examples 2421   
4.235.3 Description 2421   
4.235.4 Mixing, shift, table, tail correction, restart, rRESPA info 2422   
4.235.5 Restrictions 2422   
4.235.6 Related commands 2422   
4.235.7 Default 2422   
4.236 pair_style rheo/solid command 2422   
4.236.1 Syntax . 2422   
4.236.2 Examples 2422   
4.236.3 Description 2422   
4.236.4 Mixing, shift, table, tail correction, restart, rRESPA info 2423   
4.236.5 Restrictions 2423   
4.236.6 Related commands 2423   
4.236.7 Default 2423   
4.237 pair_style saip/metal command 2423   
4.237.1 Syntax . 2423   
4.237.2 Examples 2424   
4.237.3 Description 2424   
4.237.4 Mixing, shift, table, tail correction, restart, rRESPA info 2425   
4.237.5 Restrictions 2425   
4.237.6 Related commands 2425   
4.237.7 Default 2426   
4.238 pair_style sdpd/taitwater/isothermal command . . . . 2426  

# 4.238.1 Syntax 2426  

4.238.2 Examples 2426   
4.238.3 Description 2426   
4.238.4 Mixing, shift, table, tail correction, restart, rRESPA info 2427   
4.238.5 Restrictions 2427   
4.238.6 Related commands 2427   
4.238.7 Default 2427   
4.239 pair_style smatb command 2427   
4.240 pair_style smatb/single command . 2427   
4.240.1 Syntax . 2427   
4.240.2 Examples 2428   
4.240.3 Description 2428   
4.240.4 Coefficients 2428   
4.240.5 Mixing info 2429   
4.240.6 Restrictions 2429   
4.240.7 Related commands 2429   
4.240.8 Default 2429   
pair_style smd/hertz command 2429   
4.241.1 Syntax . 2429   
4.241.2 Examples 2429   
4.241.3 Description 2429   
4.241.4 Mixing, shift, table, tail correction, restart, rRESPA info 2430   
4.241.5 Restrictions 2430   
4.241.6 Related commands 2430   
4.241.7 Default 2430   
4.242 pair_style smd/tlsph command 2430   
4.242.1 Syntax 2430   
4.242.2 Examples 2430   
4.242.3 Description 2430   
4.242.4 Mixing, shift, table, tail correction, restart, rRESPA info 2431   
4.242.5 Restrictions 2431   
4.242.6 Related commands 2431   
4.242.7 Default 2431   
4.243 pair_style smd/tri_surface command 2431   
4.243.1 Syntax . 2431   
4.243.2 Examples 2431   
4.243.3 Description 2431   
4.243.4 Mixing, shift, table, tail correction, restart, rRESPA info 2431   
4.243.5 Restrictions 2432   
4.243.6 Related commands 2432   
4.243.7 Default 2432   
4.244 pair_style smd/ulsph command . 2432   
4.244.1 Syntax 2432   
4.244.2 Examples 2432   
4.244.3 Description 2432   
4.244.4 Mixing, shift, table, tail correction, restart, rRESPA info 2433   
4.244.5 Restrictions 2433   
4.244.6 Related commands 2433   
4.244.7 Default 2433   
4.245 pair_style smtbq command 2433   
4.245.1 Syntax . 2433   
4.245.2 Examples 2433   
4.245.3 Description 2433   
4.245.4 Mixing, shift, table, tail correction, restart, rRESPA info 2437   
4.245.5 Restrictions 2437   
4.245.6 Citing this work 2437   
4.246 pair_style snap command 2437   
4.246.1 Syntax . 2437   
4.246.2 Examples 2437   
4.246.3 Description 2438   
4.246.4 Mixing, shift, table, tail correction, restart, rRESPA info 2440   
4.246.5 Restrictions 2441   
4.246.6 Related commands 2441   
4.246.7 Default 2441   
4.247 pair_style soft command 2441   
4.247.1 Syntax . 2441   
4.247.2 Examples 2441   
4.247.3 Description 2442   
4.247.4 Mixing, shift, table, tail correction, restart, rRESPA info 2443   
4.247.5 Restrictions 2443   
4.247.6 Related commands 2443   
4.247.7 Default 2443   
4.248 pair_style sph/heatconduction command 2443   
4.248.1 Syntax . 2443   
4.248.2 Examples 2443   
4.248.3 Description 2443   
4.248.4 Mixing, shift, table, tail correction, restart, rRESPA info 2444   
4.248.5 Restrictions 2444   
4.248.6 Related commands 2444   
4.248.7 Default 2444   
4.249 pair_style sph/idealgas command . 2444   
4.249.1 Syntax . 2444   
4.249.2 Examples 2445   
4.249.3 Description 2445   
4.249.4 Mixing, shift, table, tail correction, restart, rRESPA info 2445   
4.249.5 Restrictions 2445   
4.249.6 Related commands 2445   
4.249.7 Default 2445   
4.250 pair_style sph/lj command 2446   
4.250.1 Syntax . 2446   
4.250.2 Examples 2446   
4.250.3 Description 2446   
4.250.4 Mixing, shift, table, tail correction, restart, rRESPA info 2447   
4.250.5 Restrictions 2447   
4.250.6 Related commands 2447   
4.250.7 Default 2447   
4.251 pair_style sph/rhosum command 2447   
4.251.1 Syntax . 2447   
4.251.2 Examples 2447   
4.251.3 Description 2447   
4.251.4 Mixing, shift, table, tail correction, restart, rRESPA info 2448   
4.251.5 Restrictions 2448   
4.251.6 Related commands 2448   
4.251.7 Default 2448   
4.252 pair_style sph/taitwater command 2448   
4.252.1 Syntax . 2448   
4.252.2 Examples 2448   
4.252.3 Description 2448   
4.252.4 Mixing, shift, table, tail correction, restart, rRESPA info 2449   
4.252.5 Restrictions 2449   
4.252.6 Related commands 2449   
4.252.7 Default 2450   
4.253 pair_style sph/taitwater/morris command 2450   
4.253.1 Syntax . 2450   
4.253.2 Examples 2450   
4.253.3 Description 2450   
4.253.4 Mixing, shift, table, tail correction, restart, rRESPA info 2450   
4.253.5 Restrictions 2451   
4.253.6 Related commands 2451   
4.253.7 Default 2451   
4.254 pair_style lj/spica command 2451   
4.255 pair_style lj/spica/coul/long command 2451   
4.256 pair_style lj/spica/coul/msm command 2451   
4.256.1 Syntax . 2451   
4.256.2 Examples 2451   
4.256.3 Description 2452   
4.256.4 Mixing, shift, table, tail correction, restart, rRESPA info 2453   
4.256.5 Restrictions 2453   
4.256.6 Related commands 2453   
4.256.7 Default 2453   
4.257 pair_style spin/dipole/cut command 2454   
4.258 pair_style spin/dipole/long command . 2454   
4.258.1 Syntax . 2454   
4.258.2 Examples 2454   
4.258.3 Description 2454   
4.258.4 Restrictions 2455   
4.258.5 Related commands 2455   
4.258.6 Default 2455   
4.259 pair_style spin/dmi command . 2455   
4.259.1 Syntax . 2455   
4.259.2 Examples 2455   
4.259.3 Description 2455   
4.259.4 Restrictions 2456   
4.259.5 Related commands 2456   
4.259.6 Default 2456   
4.260 pair_style spin/exchange command . 2456   
4.261 pair_style spin/exchange/biquadratic command 2456   
4.261.1 Syntax . 2456   
4.261.2 Examples 2456   
4.261.3 Description 2457   
4.261.4 Restrictions 2458   
4.261.5 Related commands 2459   
4.261.6 Default 2459   
4.262 pair_style spin/magelec command 2459   
4.262.1 Syntax 2459   
4.262.2 Examples 2459   
4.262.3 Description 2459   
4.262.4 Restrictions 2460   
4.262.5 Related commands 2460   
4.262.6 Default 2460   
4.263 pair_style spin/neel command 2460   
4.263.1 Syntax . 2460   
4.263.2 Examples 2460   
4.263.3 Description 2460   
4.263.4 Restrictions 2461   
4.263.5 Related commands 2461   
4.263.6 Default 2461   
4.264 pair_style srp command . 2461   
4.265 pair_style srp/react command . 2461   
4.265.1 Syntax . 2461   
4.265.2 Examples 2462   
4.265.3 Mixing, shift, table, tail correction, restart, rRESPA info 2463   
4.265.4 Restrictions 2464   
4.265.5 Related commands 2464   
4.265.6 Default 2464   
4.266 pair_style sw command 2464   
4.267 pair_style sw/mod command 2464   
4.267.1 Syntax . 2464   
4.267.2 Examples 2464   
4.267.3 Description 2465   
4.267.4 Mixing, shift, table, tail correction, restart, rRESPA info 2468   
4.267.5 Restrictions 2468   
4.267.6 Related commands 2468   
4.267.7 Default 2468   
4.268 pair_style sw/angle/table command . 2469   
4.268.1 Syntax 2469   
4.268.2 Examples 2469   
4.268.3 Description 2469   
4.268.4 Mixing, shift, table, tail correction, restart, rRESPA info 2472   
4.268.5 Restrictions 2472   
4.268.6 Related commands 2472   
4.269 pair_style table command . 2472   
4.269.1 Syntax . 2472   
4.269.2 Examples 2473   
4.269.3 Description 2473   
4.269.4 Mixing, shift, table, tail correction, restart, rRESPA info 2475   
4.269.5 Restrictions 2476   
4.269.6 Related commands 2476   
4.269.7 Default 2476   
4.270 pair_style table/rx command 2476   
4.270.1 Syntax . 2476   
4.270.2 Examples 2476   
4.270.3 Description 2476   
4.270.4 Mixing, shift, table, tail correction, restart, rRESPA info 2479   
4.270.5 Restrictions 2479   
4.270.6 Related commands 2479   
4.270.7 Default 2479   
4.271 pair_style tersoff command 2479   
4.272 pair_style tersoff/table command 2479   
4.272.1 Syntax 2480   
4.272.2 Examples 2480   
4.272.3 Description 2480   
4.272.4 Mixing, shift, table, tail correction, restart, rRESPA info 2483   
4.272.5 Restrictions 2483   
4.272.6 Related commands 2484   
4.272.7 Default 2484   
4.273 pair_style tersoff/mod command 2484   
4.274 pair_style tersoff/mod/c command 2484   
4.274.1 Syntax . 2484   
4.274.2 Examples 2484   
4.274.3 Description 2484   
4.274.4 Mixing, shift, table, tail correction, restart, rRESPA info 2487   
4.274.5 Restrictions 2487   
4.274.6 Related commands 2487   
4.274.7 Default 2487   
4.275 pair_style tersoff/zbl command . 2487   
4.275.1 Syntax . 2488   
4.275.2 Examples 2488   
4.275.3 Description 2488   
4.275.4 Mixing, shift, table, tail correction, restart, rRESPA info 2491   
4.275.5 Restrictions 2491   
4.275.6 Related commands 2492   
4.275.7 Default 2492   
4.276 pair_style thole command . 2492   
4.277 pair_style lj/cut/thole/long command . 2492   
4.277.1 Syntax . 2492   
4.277.2 Examples 2492   
4.277.3 Description 2492   
4.277.4 Mixing, shift, table, tail correction, restart, rRESPA info 2494   
4.277.5 Restrictions 2494   
4.277.6 Related commands 2494   
4.277.7 Default 2494   
4.278 pair_style threebody/table command 2494   
4.278.1 Syntax . 2494   
4.278.2 Examples 2495   
4.278.3 Description 2495   
4.278.4 Mixing, shift, table, tail correction, restart, rRESPA info 2497   
4.278.5 Restrictions 2497   
4.278.6 Related commands 2498   
4.279 pair_style tracker command 2498   
4.279.1 Syntax . 2498   
4.279.2 Examples 2498   
4.279.3 Description 2499   
4.279.4 Mixing, shift, table, tail correction, restart, rRESPA info 2499   
4.279.5 Restrictions 2500   
4.279.6 Related commands 2500   
4.279.7 Default 2500   
4.280 pair_style tri/lj command 2500   
4.280.1 Syntax . 2500   
4.280.2 Examples 2500   
4.280.3 Description 2500   
4.280.4 Mixing, shift, table, tail correction, restart, rRESPA info 2501   
4.280.5 Restrictions 2501   
4.280.6 Related commands 2501   
4.280.7 Default 2501   
4.281 pair_style uf3 command 2501   
4.281.1 Syntax . 2502   
4.281.2 Examples 2502   
4.281.3 Description 2502   
4.281.4 Mixing, shift, table, tail correction, restart, rRESPA info 2504   
4.281.5 Restrictions 2504   
4.281.6 Related commands 2504   
4.281.7 Default 2504   
4.282 pair_style ufm command 2505   
4.282.1 Syntax . 2505   
4.282.2 Examples 2505   
4.282.3 Description 2505   
4.282.4 Mixing, shift, table, tail correction, restart, rRESPA info 2506   
4.282.5 Restrictions 2506   
4.282.6 Related commands 2506   
4.282.7 Default 2506   
4.283 pair_style vashishta command 2507   
4.284 pair_style vashishta/table command 2507   
4.284.1 Syntax . 2507   
4.284.2 Examples 2507   
4.284.3 Description 2507   
4.284.4 Mixing, shift, table, tail correction, restart, rRESPA info 2509   
4.284.5 Restrictions 2510   
4.284.6 Related commands 2510   
4.284.7 Default 2510   
4.285 pair_style wf/cut command 2510   
4.285.1 Syntax . 2510   
4.285.2 Examples 2510   
4.285.3 Description 2510   
4.285.4 Restrictions 2511   
4.285.5 Related commands 2512   
4.286 pair_style ylz command . 2512   
4.286.1 Syntax . 2512   
4.286.2 Examples 2512   
4.286.3 Description 2512   
4.286.4 Mixing, shift, table, tail correction, restart, rRESPA info 2513   
4.286.5 Restrictions 2513   
4.286.6 Related commands 2514   
4.286.7 Default 2514   
4.287 pair_style yukawa command 2514   
4.287.1 Syntax . 2514   
4.287.2 Examples 2514   
4.287.3 Description 2514   
4.287.4 Mixing, shift, table, tail correction, restart, rRESPA info 2515   
4.287.5 Restrictions 2515   
4.287.6 Related commands 2515   
4.287.7 Default 2515   
4.288 pair_style yukawa/colloid command 2515   
4.288.1 Syntax . 2515   
4.288.2 Examples 2516   
4.288.3 Description 2516   
4.288.4 Mixing, shift, table, tail correction, restart, rRESPA info 2517   
4.288.5 Restrictions 2517   
4.288.6 Related commands 2517   
4.288.7 Default 2517   
4.289 pair_style zbl command . 2518   
4.289.1 Syntax . 2518   
4.289.2 Examples 2518   
4.289.3 Description 2518   
4.289.4 Mixing, shift, table, tail correction, restart, rRESPA info 2519   
4.289.5 Restrictions . 2519   
4.289.6 Related commands 2519   
4.289.7 Default 2519   
4.290 pair_style zero command 2520   
4.290.1 Syntax . 2520   
4.290.2 Examples 2520   
4.290.3 Description 2520   
4.290.4 Mixing, shift, table, tail correction, restart, rRESPA info 2520   
4.290.5 Restrictions 2521   
4.290.6 Related commands 2521   
4.290.7 Default 2521  

# 5 Bond Styles 2523  

# 5.1 bond_style bpm/rotational command . . . 2523  

5.1.1 Syntax . 2523   
5.1.2 Examples 2523   
5.1.3 Description . . 2524   
5.1.4 Restart and other info 2525   
5.1.5 Restrictions . 2526   
5.1.6 Related commands 2526   
5.1.7 Default 2526   
bond_style bpm/spring command . 2526   
5.2.1 Syntax . 2526   
5.2.2 Examples . 2527   
5.2.3 Description . . 2527   
5.2.4 Restart and other info 2529   
5.2.5 Restrictions 2529   
5.2.6 Related commands 2529   
5.2.7 Default 2529   
bond_style class2 command 2530   
5.3.1 Syntax . . 2530   
5.3.2 Examples 2530   
5.3.3 Description 2530   
5.3.4 Restrictions 2530   
5.3.5 Related commands 2531   
5.3.6 Default 2531   
5.4 bond_style fene command 2531   
bond_style fene/nm command 2531   
5.5.1 Syntax . 2531   
5.5.2 Examples 2531   
5.5.3 Description 2531   
5.5.4 Restrictions 2532   
5.5.5 Related commands 2532   
5.5.6 Default 2532   
.6 bond_style fene/expand command 2532   
5.6.1 Syntax . 2533   
5.6.2 Examples 2533   
5.6.3 Description 2533   
5.6.4 Restrictions 2533   
5.6.5 Related commands 2534   
5.6.6 Default 2534   
5.7 bond_style gaussian command 2534   
5.7.1 Syntax 2534  

5.7.2 Examples 2534   
5.7.3 Description 2534   
5.7.4 Restrictions 2534   
5.7.5 Related commands 2535   
5.7.6 Default 2535   
bond_style gromos command . 2535   
5.8.1 Syntax . 2535   
5.8.2 Examples 2535   
5.8.3 Description 2535   
5.8.4 Restrictions 2536   
5.8.5 Related commands 2536   
5.8.6 Default 2536   
bond_style harmonic command . 2536   
5.9.1 Syntax 2536   
5.9.2 Examples 2536   
5.9.3 Description 2536   
5.9.4 Restrictions 2537   
5.9.5 Related commands 2537   
5.9.6 Default 2537   
0 bond_style harmonic/restrain command 2537   
5.10.1 Syntax . 2537   
5.10.2 Examples 2537   
5.10.3 Description 2537   
5.10.4 Restart info 2537   
5.10.5 Restrictions 2537   
5.10.6 Related commands 2538   
5.10.7 Default 2538   
bond_style harmonic/shift command 2538   
5.11.1 Syntax . 2538   
5.11.2 Examples 2538   
5.11.3 Description 2538   
5.11.4 Restrictions 2539   
5.11.5 Related commands 2539   
5.11.6 Default 2539   
12 bond_style harmonic/shift/cut command 2539   
5.12.1 Syntax . 2539   
5.12.2 Examples 2539   
5.12.3 Description 2539   
5.12.4 Restrictions 2540   
5.12.5 Related commands 2540   
5.12.6 Default 2540   
bond_style hybrid command 2540   
5.13.1 Syntax . 2540   
5.13.2 Examples 2540   
5.13.3 Description . . 2540   
5.13.4 Restrictions 2541   
5.13.5 Related commands 2541   
5.13.6 Default 2541   
bond_style lepton command 2541   
5.14.1 Syntax . 2541   
5.14.2 Examples . . 2542   
5.14.3 Description 2542   
5.14.4 Lepton expression syntax and features 2542   
5.14.5 Restrictions 2544   
5.14.6 Related commands 2544   
5.14.7 Default 2544   
15 bond_style mesocnt command 2544   
5.15.1 Syntax . 2544   
5.15.2 Examples 2544   
5.15.3 Description 2544   
5.15.4 Restrictions 2545   
5.15.5 Related commands 2545   
5.15.6 Default 2545   
.16 bond_style mm3 command 2545   
5.16.1 Syntax . 2545   
5.16.2 Examples 2545   
5.16.3 Description 2545   
5.16.4 Restrictions 2545   
5.16.5 Related commands 2546   
5.16.6 Default 2546   
.17 bond_style morse command 2546   
5.17.1 Syntax . 2546   
5.17.2 Examples 2546   
5.17.3 Description 2546   
5.17.4 Restrictions 2547   
5.17.5 Related commands 2547   
5.17.6 Default 2547   
.18 bond_style none command 2547   
5.18.1 Syntax . 2547   
5.18.2 Examples 2547   
5.18.3 Description 2547   
5.18.4 Restrictions 2547   
5.18.5 Related commands 2547   
5.18.6 Default 2547   
.19 bond_style nonlinear command 2547   
5.19.1 Syntax . 2547   
5.19.2 Examples 2548   
5.19.3 Description 2548   
5.19.4 Restrictions 2548   
5.19.5 Related commands 2548   
5.19.6 Default 2548   
5.20 bond_style oxdna/fene command 2549   
5.21 bond_style oxdna2/fene command 2549   
.22 bond_style oxrna2/fene command 2549   
5.22.1 Syntax . 2549   
5.22.2 Examples 2549   
5.22.3 Description 2550   
5.22.4 Potential file reading 2551   
5.22.5 Restrictions 2551   
5.22.6 Related commands 2551   
5.22.7 Default 2551   
.23 bond_style quartic command 2551   
5.23.1 Syntax 2552   
5.23.2 Examples 2552   
5.23.3 Description 2552   
5.23.4 Restrictions 2553   
5.23.5 Related commands 2553   
5.23.6 Default 2553  

# 5.24 bond_style rheo/shell command 2553  

5.24.1 Syntax . 2553   
5.24.2 Examples 2554   
5.24.3 Description . . 2554   
5.24.4 Restart and other info 2555   
5.24.5 Restrictions 2555   
5.24.6 Related commands 2555   
5.24.7 Default 2555   
5.25 bond_style special command 2555   
5.25.1 Syntax . 2555   
5.25.2 Examples 2556   
5.25.3 Description 2556   
5.25.4 Restrictions 2556   
5.25.5 Related commands 2557   
5.25.6 Default 2557   
.26 bond_style table command 2557   
5.26.1 Syntax . 2557   
5.26.2 Examples 2557   
5.26.3 Description 2557   
5.26.4 Restart info 2559   
5.26.5 Restrictions 2559   
5.26.6 Related commands 2559   
5.26.7 Default 2559   
5.27 bond_style zero command 2559   
5.27.1 Syntax . 2559   
5.27.2 Examples 2559   
5.27.3 Description 2559   
5.27.4 Restrictions 2560   
5.27.5 Related commands 2560   
5.27.6 Default 2560  

# Angle Styles 2561  

# 6.1 angle_style amoeba command 2561  

6.1.1 Syntax . 2561   
6.1.2 Examples 2561   
6.1.3 Description 2561   
6.1.4 Restrictions 2562   
6.1.5 Related commands 2562   
6.1.6 Default 2563   
6.2 angle_style charmm command 2563   
6.2.1 Syntax . 2563   
6.2.2 Examples 2563   
6.2.3 Description 2563   
6.2.4 Restrictions 2564   
6.2.5 Related commands 2564   
6.2.6 Default 2564   
6.3 angle_style class2 command 2564   
6.4 angle_style class2/p6 command 2564   
6.4.1 Syntax . 2564   
6.4.2 Examples 2564   
6.4.3 Description 2564   
6.4.4 Restrictions 2566   
6.4.5 Related commands 2566   
6.4.6 Default 2566   
6.5 angle_style cosine command 2566   
6.5.1 Syntax . 2566   
6.5.2 Examples 2566   
6.5.3 Description 2566   
6.5.4 Restrictions 2567   
6.5.5 Related commands 2567   
6.5.6 Default 2567   
angle_style cosine/buck6d command . 2567   
6.6.1 Syntax . 2567   
6.6.2 Examples 2567   
6.6.3 Description 2567   
6.6.4 Restrictions 2568   
6.6.5 Related commands 2568   
6.6.6 Default 2568   
angle_style cosine/delta command 2568   
6.7.1 Syntax . 2568   
6.7.2 Examples 2568   
6.7.3 Description 2568   
6.7.4 Restrictions 2569   
6.7.5 Related commands 2569   
6.7.6 Default 2569   
angle_style cosine/periodic command 2569   
6.8.1 Syntax . 2569   
6.8.2 Examples 2569   
6.8.3 Description 2569   
6.8.4 Restrictions 2570   
6.8.5 Related commands 2570   
6.8.6 Default 2570   
angle_style cosine/shift command 2570   
6.9.1 Syntax . . 2570   
6.9.2 Examples 2570   
6.9.3 Description 2571   
6.9.4 Restrictions 2571   
6.9.5 Related commands 2571   
6.9.6 Default 2571   
angle_style cosine/shift/exp command 2571   
6.10.1 Syntax . 2571   
6.10.2 Examples 2571   
6.10.3 Description 2572   
6.10.4 Restrictions 2572   
6.10.5 Related commands 2572   
6.10.6 Default 2572   
1 angle_style cosine/squared command . 2573   
6.11.1 Syntax . 2573   
6.11.2 Examples 2573   
6.11.3 Description 2573   
6.11.4 Restrictions 2573   
6.11.5 Related commands 2574   
6.11.6 Default 2574   
12 angle_style cosine/squared/restricted command 2574   
6.12.1 Syntax . 2574   
6.12.2 Examples 2574   
6.12.3 Description 2574   
6.12.4 Restrictions 2575   
6.12.5 Related commands 2575   
6.12.6 Default 2575   
angle_style cross command . 2575   
6.13.1 Syntax . 2575   
6.13.2 Examples 2575   
6.13.3 Description 2575   
6.13.4 Restrictions 2576   
6.13.5 Related commands 2576   
6.13.6 Default 2576   
4 angle_style dipole command 2576   
6.14.1 Syntax . 2576   
6.14.2 Examples 2576   
6.14.3 Description 2576   
6.14.4 Restrictions 2577   
6.14.5 Related commands 2577   
6.14.6 Default 2577   
angle_style fourier command . 2578   
6.15.1 Syntax . 2578   
6.15.2 Examples 2578   
6.15.3 Description 2578   
6.15.4 Restrictions 2578   
6.15.5 Related commands 2578   
6.15.6 Default 2579   
angle_style fourier/simple command 2579   
6.16.1 Syntax . 2579   
6.16.2 Examples 2579   
6.16.3 Description 2579   
6.16.4 Restrictions 2579   
6.16.5 Related commands 2580   
6.16.6 Default 2580   
17 angle_style gaussian command 2580   
6.17.1 Syntax . 2580   
6.17.2 Examples 2580   
6.17.3 Description 2580   
6.17.4 Restrictions 2580   
6.17.5 Related commands 2581   
6.17.6 Default 2581   
8 angle_style harmonic command 2581   
6.18.1 Syntax . 2581   
6.18.2 Examples 2581   
6.18.3 Description 2581   
6.18.4 Restrictions 2582   
6.18.5 Related commands 2582   
6.18.6 Default 2582   
.19 angle_style hybrid command 2582   
6.19.1 Syntax . 2582   
6.19.2 Examples 2582   
6.19.3 Description 2582   
6.19.4 Restrictions 2583   
6.19.5 Related commands 2583   
6.19.6 Default 2583   
angle_style lepton command 2583   
6.20.1 Syntax . 2583   
6.20.2 Examples 2584   
6.20.3 Description 2584   
6.20.4 Lepton expression syntax and features 2584   
6.20.5 Restrictions . . 2586   
6.20.6 Related commands 2586   
6.20.7 Default 2586   
6.21 angle_style mesocnt command 2586   
6.21.1 Syntax . 2586   
6.21.2 Examples 2586   
6.21.3 Description 2586   
6.21.4 Restrictions 2587   
6.21.5 Related commands 2588   
6.21.6 Default 2588   
6.22 angle_style mm3 command . 2588   
6.22.1 Syntax . 2588   
6.22.2 Examples 2588   
6.22.3 Description 2588   
6.22.4 Restrictions 2588   
6.22.5 Related commands 2588   
6.22.6 Default 2588   
6.23 angle_style mwlc command . 2589   
6.23.1 Syntax . 2589   
6.23.2 Examples 2589   
6.23.3 Description 2589   
6.23.4 Restrictions 2589   
6.23.5 Related commands 2589   
6.23.6 Default 2590   
6.24 angle_style none command 2590   
6.24.1 Syntax . 2590   
6.24.2 Examples 2590   
6.24.3 Description 2590   
6.24.4 Restrictions 2590   
6.24.5 Related commands 2590   
6.24.6 Default 2590   
6.25 angle_style quartic command . 2590   
6.25.1 Syntax . 2590   
6.25.2 Examples 2590   
6.25.3 Description 2591   
6.25.4 Restrictions 2591   
6.25.5 Related commands 2591   
6.25.6 Default 2591   
6.26 angle_style spica command . 2591   
6.26.1 Syntax . 2591   
6.26.2 Examples 2592   
6.26.3 Description 2592   
6.26.4 Restrictions 2592   
6.26.5 Related commands 2592   
6.26.6 Default 2593   
6.27 angle_style table command 2593   
6.27.1 Syntax . 2593   
6.27.2 Examples 2593   
6.27.3 Description . . . 2593   
6.27.4 Restart, fix_modify, output, run start/stop, minimize info 2595   
6.27.5 Restrictions 2595   
6.27.6 Related commands 2595  

# 6.27.7 Default 2595  

# angle_style zero command 2595  

6.28.1 Syntax . 2595   
6.28.2 Examples 2595   
6.28.3 Description 2595   
6.28.4 Restrictions 2596   
6.28.5 Related commands 2596   
6.28.6 Default 2596   
7 Dihedral Styles 2597   
7.1 dihedral_style charmm command . 2597   
7.2 dihedral_style charmmfsw command . 2597   
7.2.1 Syntax . 2597   
7.2.2 Examples 2597   
7.2.3 Description 2597   
7.2.4 Restrictions 2599   
7.2.5 Related commands 2599   
7.2.6 Default 2599   
dihedral_style class2 command 2599   
7.3.1 Syntax . 2599   
7.3.2 Examples 2599   
7.3.3 Description 2600   
7.3.4 Restrictions 2602   
7.3.5 Related commands 2602   
7.3.6 Default 2602   
dihedral_style cosine/shift/exp command . 2602   
7.4.1 Syntax . 2602   
7.4.2 Examples 2602   
7.4.3 Description 2602   
7.4.4 Restrictions 2603   
7.4.5 Related commands 2603   
7.4.6 Default 2603   
dihedral_style cosine/squared/restricted command 2603   
7.5.1 Syntax . 2603   
7.5.2 Examples 2603   
7.5.3 Description 2603   
7.5.4 Restrictions 2604   
7.5.5 Related commands 2604   
7.5.6 Default 2604   
dihedral_style fourier command 2604   
7.6.1 Syntax 2604   
7.6.2 Examples 2604   
7.6.3 Description 2604   
7.6.4 Restrictions 2605   
7.6.5 Related commands 2605   
7.6.6 Default 2605   
dihedral_style harmonic command 2605   
7.7.1 Syntax . 2605   
7.7.2 Examples 2605   
7.7.3 Description 2606   
7.7.4 Restrictions 2606   
7.7.5 Related commands 2606   
7.7.6 Default 2606   
dihedral_style helix command 2606   
7.8.1 Syntax . 2607   
7.8.2 Examples 2607   
7.8.3 Description 2607   
7.8.4 Restrictions 2607   
7.8.5 Related commands 2607   
7.8.6 Default 2608   
dihedral_style hybrid command 2608   
7.9.1 Syntax . . 2608   
7.9.2 Examples 2608   
7.9.3 Description 2608   
7.9.4 Restrictions 2609   
7.9.5 Related commands 2609   
7.9.6 Default 2609   
0 dihedral_style lepton command . 2609   
7.10.1 Syntax . 2609   
7.10.2 Examples 2609   
7.10.3 Description . . . . 2610   
7.10.4 Lepton expression syntax and features 2610   
7.10.5 Restrictions 2611   
7.10.6 Related commands 2611   
7.10.7 Default 2611   
dihedral_style multi/harmonic command . 2611   
7.11.1 Syntax . 2612   
7.11.2 Examples 2612   
7.11.3 Description 2612   
7.11.4 Restrictions 2612   
7.11.5 Related commands 2612   
7.11.6 Default 2612   
12 dihedral_style nharmonic command 2613   
7.12.1 Syntax . 2613   
7.12.2 Examples 2613   
7.12.3 Description 2613   
7.12.4 Restrictions 2613   
7.12.5 Related commands 2613   
7.12.6 Default 2614   
.13 dihedral_style none command 2614   
7.13.1 Syntax . . . 2614   
7.13.2 Examples 2614   
7.13.3 Description 2614   
7.13.4 Restrictions 2614   
7.13.5 Related commands 2614   
7.13.6 Default 2614   
14 dihedral_style opls command . 2614   
7.14.1 Syntax . 2614   
7.14.2 Examples 2614   
7.14.3 Description 2615   
7.14.4 Restrictions 2615   
7.14.5 Related commands 2615   
7.14.6 Default 2615   
.15 dihedral_style quadratic command 2615   
7.15.1 Syntax . 2616   
7.15.2 Examples 2616   
7.15.3 Description 2616   
7.15.4 Restrictions 2616  

#  

7.15.5 Related commands 2616   
7.15.6 Default 2616   
7.16 dihedral_style spherical command 2617   
7.16.1 Syntax . 2617   
7.16.2 Examples . . 2617   
7.16.3 Description 2617   
7.16.4 Restrictions 2618   
7.16.5 Related commands 2618   
7.16.6 Default 2618   
7.17 dihedral_style table command 2618   
dihedral_style table/cut command 2618   
7.18.1 Syntax . . 2618   
7.18.2 Examples 2619   
7.18.3 Description . . . 2619   
7.18.4 Restart, fix_modify, output, run start/stop, minimize info 2621   
7.18.5 Restrictions . . 2622   
7.18.6 Related commands 2622   
7.18.7 Default 2622   
7.19 dihedral_style zero command . 2622   
7.19.1 Syntax . 2622   
7.19.2 Examples 2622   
7.19.3 Description 2622   
7.19.4 Restrictions 2622   
7.19.5 Related commands 2622   
7.19.6 Default 2623  

# 8 Improper Styles  

# 2625  

# 8.1 improper_style amoeba command 2625  

8.1.1 Syntax . 2625   
8.1.2 Examples 2625   
8.1.3 Description 2625   
8.1.4 Restrictions 2625   
8.1.5 Related commands 2626   
8.1.6 Default 2626   
improper_style class2 command 2626   
8.2.1 Syntax . . 2626   
8.2.2 Examples . 2626   
8.2.3 Description . 2626   
8.2.4 Restrictions 2627   
8.2.5 Related commands 2627   
8.2.6 Default 2627   
improper_style cossq command 2628   
8.3.1 Syntax . . 2628   
8.3.2 Examples 2628   
8.3.3 Description 2628   
8.3.4 Restrictions 2628   
8.3.5 Related commands 2629   
8.3.6 Default 2629   
improper_style cvff command 2629   
8.4.1 Syntax . 2629   
8.4.2 Examples 2629   
8.4.3 Description 2629   
8.4.4 Restrictions 2630   
8.4.5 Related commands 2630   
8.4.6 Default 2630   
improper_style distance command 2630   
8.5.1 Syntax . 2630   
8.5.2 Examples 2630   
8.5.3 Description 2630   
8.5.4 Restrictions 2631   
8.5.5 Related commands 2631   
8.5.6 Default 2631   
improper_style distharm command . 2631   
8.6.1 Syntax . 2631   
8.6.2 Examples 2632   
8.6.3 Description 2632   
8.6.4 Restrictions 2632   
8.6.5 Related commands 2632   
8.6.6 Default 2632   
improper_style fourier command 2632   
8.7.1 Syntax . 2632   
8.7.2 Examples 2632   
8.7.3 Description 2633   
8.7.4 Restrictions 2634   
8.7.5 Related commands 2634   
8.7.6 Default 2634   
improper_style harmonic command 2634   
8.8.1 Syntax . 2634   
8.8.2 Examples 2634   
8.8.3 Description 2634   
8.8.4 Restrictions 2635   
8.8.5 Related commands 2635   
8.8.6 Default 2635   
improper_style hybrid command 2635   
8.9.1 Syntax . 2635   
8.9.2 Examples 2635   
8.9.3 Description 2635   
8.9.4 Restrictions 2636   
8.9.5 Related commands 2636   
8.9.6 Default 2636   
improper_style inversion/harmonic command 2637   
8.10.1 Syntax . 2637   
8.10.2 Examples 2637   
8.10.3 Description 2637   
8.10.4 Restrictions 2638   
8.10.5 Related commands 2638   
8.10.6 Default 2638   
improper_style none command 2638   
8.11.1 Syntax . 2638   
8.11.2 Examples 2638   
8.11.3 Description 2638   
8.11.4 Restrictions 2638   
8.11.5 Related commands 2638   
8.11.6 Default 2638   
12 improper_style ring command 2638   
8.12.1 Syntax . 2638   
8.12.2 Examples 2639   
8.12.3 Description . . 2639  

#  

8.12.4 Restrictions 2639   
8.12.5 Related commands 2640   
improper_style sqdistharm command . 2640   
8.13.1 Syntax . 2640   
8.13.2 Examples . . . 2640   
8.13.3 Description 2640   
8.13.4 Restrictions 2640   
8.13.5 Related commands 2640   
8.13.6 Default 2640   
improper_style umbrella command 2640   
8.14.1 Syntax . . 2641   
8.14.2 Examples 2641   
8.14.3 Description 2641   
8.14.4 Restrictions 2642   
8.14.5 Related commands 2642   
8.14.6 Default 2642   
15 improper_style zero command 2642   
8.15.1 Syntax . 2642   
8.15.2 Examples 2642   
8.15.3 Description 2642   
8.15.4 Restrictions 2643   
8.15.5 Related commands 2643   
8.15.6 Default 2643  

# 9 Dump Styles 2645  

# 9.1 dump command 2645  

9.2 dump vtk command 2645   
9.3 dump h5md command 2645   
9.4 dump molfile command 2645   
9.5 dump netcdf command 2645   
9.6 dump image command 2645   
9.7 dump movie command 2645   
9.8 dump atom/adios command 2645   
9.9 dump custom/adios command 2645   
9.10 dump cfg/uef command . 2645   
9.10.1 Syntax . 2645   
9.10.2 Examples 2647   
9.10.3 Description 2648   
9.10.4 Restrictions 2657   
9.10.5 Related commands 2658   
9.10.6 Default 2658   
9.11 dump atom/adios command 2658   
9.12 dump custom/adios command 2658   
9.12.1 Syntax . 2658   
9.12.2 Examples 2658   
9.12.3 Description 2658   
9.12.4 Restrictions 2659   
9.12.5 Related commands 2659   
9.13 dump cfg/uef command 2659   
9.13.1 Syntax . 2659   
9.13.2 Examples 2659   
9.13.3 Description 2659   
9.13.4 Restrictions 2659   
9.13.5 Related commands 2660   
9.13.6 Default 2660   
9.14 dump h5md command 2660   
9.14.1 Syntax . 2660   
9.14.2 Examples 2660   
9.14.3 Description 2660   
9.14.4 Restrictions 2661   
9.14.5 Related commands 2661   
9.15 dump image command 2661   
9.16 dump movie command 2661   
9.16.1 Syntax . 2662   
9.17 dump_modify options for dump image/movie 2663   
9.17.1 Syntax . 2663   
9.17.2 Examples . . 2664   
9.17.3 Description 2664   
9.17.4 Image Quality Settings . . 2670   
9.17.5 Dump_modify keywords for dump image and dump movie 2671   
9.17.6 Restrictions 2675   
9.17.7 Related commands 2675   
9.17.8 Default 2675   
9.18 dump_modify command 2678   
9.19 dump_modify command for image/movie options 2678   
9.19.1 Syntax . 2678   
9.19.2 Examples 2679   
9.19.3 Description 2680   
9.19.4 Restrictions 2689   
9.19.5 Related commands 2689   
9.19.6 Default 2690   
9.20 dump molfile command . 2690   
9.20.1 Syntax . 2690   
9.20.2 Examples 2691   
9.20.3 Description 2691   
9.20.4 Restrictions 2692   
9.20.5 Related commands 2692   
9.20.6 Default 2692   
9.21 dump netcdf command 2692   
9.22 dump netcdf/mpiio command . 2692   
9.22.1 Syntax . 2692   
9.22.2 Examples 2693   
9.22.3 Description 2693   
9.22.4 Restrictions 2693   
9.22.5 Related commands 2693   
9.23 dump vtk command . 2693   
9.23.1 Syntax . 2693   
9.23.2 Examples 2694   
9.23.3 Description . . 2694   
9.23.4 Restrictions 2695   
9.23.5 Related commands 2696   
9.23.6 Default 2696  

# 10 fix_modify AtC commands 2697  

# 10.1 fix_modify AtC add_molecule command . 2697  

10.1.1 Syntax . . 2697   
10.1.2 Examples 2697   
10.1.3 Description 2697  

#  

10.1.4 Restrictions 2697   
10.1.5 Related AtC commands . 2697   
10.1.6 Default 2698   
10.2 fix_modify AtC add_species command . . 2698   
10.2.1 Syntax . 2698   
10.2.2 Examples 2698   
10.2.3 Description 2698   
10.2.4 Restrictions 2698   
10.2.5 Related AtC commands 2698   
10.2.6 Default 2698   
fix_modify AtC atom_element_map command 2698   
10.3.1 Syntax . 2698   
10.3.2 Examples 2699   
10.3.3 Description 2699   
10.3.4 Restrictions 2699   
10.3.5 Related AtC commands 2699   
10.3.6 Default 2699   
0.4 fix_modify AtC atom_weight command 2699   
10.4.1 Syntax . 2699   
10.4.2 Examples 2700   
10.4.3 Description 2700   
10.4.4 Restrictions 2700   
10.4.5 Related AtC commands . 2700   
10.4.6 Default 2700   
10.5 fix_modify AtC atomic_charge command 2700   
10.5.1 Syntax . 2700   
10.5.2 Examples 2700   
10.5.3 Description 2700   
10.5.4 Restrictions 2700   
10.5.5 Related AtC commands 2700   
10.5.6 Default 2701   
10.6 fix_modify AtC boundary_dynamics command 2701   
10.6.1 Syntax . 2701   
10.6.2 Description 2701   
10.6.3 Restrictions 2701   
10.6.4 Related AtC commands 2701   
10.6.5 Default 2701   
10.7 fix_modify AtC boundary_faceset command . 2701   
10.7.1 Syntax . 2701   
10.7.2 Examples 2701   
10.7.3 Description 2702   
10.7.4 Restrictions 2702   
10.7.5 Related AtC commands . 2702   
10.7.6 Default 2702   
fix_modify AtC boundary type command 2702   
10.8.1 Syntax . 2702   
10.8.2 Examples 2702   
10.8.3 Description 2702   
10.8.4 Restrictions 2702   
10.8.5 Related AtC commands . 2702   
10.8.6 Default 2703   
10.9 fix_modify AtC consistent_fe_initialization command . 2703   
10.9.1 Syntax . 2703   
10.9.2 Examples 2703   
10.9.3 Description 2703   
10.9.4 Restrictions 2703   
10.9.5 Related AtC commands 2703   
10.9.6 Default 2703   
10.10 fix_modify AtC control localized_lambda command 2703   
10.10.1 Syntax . 2703   
10.10.2 Examples 2703   
10.10.3 Description 2704   
10.10.4 Restrictions 2704   
10.10.5 Related AtC commands . . 2704   
10.10.6 Default 2704   
fix_modify AtC control momentum command 2704   
10.11.1 Syntax . 2704   
10.11.2 Examples 2704   
10.11.3 Description 2705   
10.11.4 Restrictions 2705   
10.11.5 Related AtC commands . 2705   
10.11.6 Default 2705   
10.12 fix_modify AtC control thermal command 2705   
10.12.1 Syntax . 2705   
10.12.2 Examples 2706   
10.12.3 Description 2706   
10.12.4 Restrictions 2706   
10.12.5 Related AtC commands . 2706   
10.12.6 Default 2706   
fix_modify AtC decomposition command 2707   
10.13.1 Syntax . 2707   
10.13.2 Examples 2707   
10.13.3 Description 2707   
10.13.4 Restrictions 2707   
10.13.5 Related AtC commands 2707   
10.13.6 Default 2707   
10.14 fix_modify AtC extrinsic electron_integration command 2707   
10.14.1 Syntax . 2707   
10.14.2 Examples 2707   
10.14.3 Description 2708   
10.14.4 Restrictions 2708   
10.14.5 Related AtC commands 2708   
10.14.6 Default 2708   
fix_modify AtC equilibrium_start command 2708   
10.15.1 Syntax . 2708   
10.15.2 Examples 2708   
10.15.3 Description 2708   
10.15.4 Restrictions 2708   
10.15.5 Related AtC commands . . 2708   
10.15.6 Default 2708   
10.16 fix_modify AtC extrinsic exchange command 2709   
10.16.1 Syntax . 2709   
10.16.2 Examples 2709   
10.16.3 Description 2709   
10.16.4 Restrictions 2709   
10.16.5 Related AtC commands 2709   
10.16.6 Default 2709   
10.17 fix_modify AtC fe_md_boundary command 2709   
10.17.1 Syntax . 2709   
10.17.2 Examples 2709   
10.17.3 Description 2709   
10.17.4 Restrictions 2710   
10.17.5 Related AtC commands . 2710   
10.17.6 Default 2710   
10.18 fix_modify AtC filter scale command 2710   
10.18.1 Syntax . 2710   
10.18.2 Examples 2710   
10.18.3 Description 2710   
10.18.4 Restrictions 2710   
10.18.5 Related AtC commands . 2710   
10.18.6 Default 2710   
10.19 fix_modify AtC filter type command . 2711   
10.19.1 Syntax . 2711   
10.19.2 Examples 2711   
10.19.3 Description 2711   
10.19.4 Restrictions 2711   
10.19.5 Related AtC commands . 2711   
10.19.6 Default 2711   
10.20 fix_modify AtC fix command . 2711   
10.20.1 Syntax . 2711   
10.20.2 Examples 2711   
10.20.3 Description 2712   
10.20.4 Restrictions 2712   
10.20.5 Related AtC commands . . . . . 2712   
10.20.6 Default 2712   
10.21 fix_modify AtC fix_flux command . 2712   
10.21.1 Syntax . 2712   
10.21.2 Examples 2712   
10.21.3 Description 2712   
10.21.4 Restrictions 2712   
10.21.5 Related AtC commands . 2712   
10.21.6 Default 2713   
10.22 fix_modify AtC computes command 2713   
10.22.1 Syntax . 2713   
10.22.2 Examples 2713   
10.22.3 Description 2713   
10.22.4 Restrictions 2713   
10.22.5 Related AtC commands . 2713   
10.22.6 Default 2713   
10.23 fix_modify AtC fields command 2714   
10.23.1 Syntax . 2714   
10.23.2 Examples 2714   
10.23.3 Description 2715   
10.23.4 Restrictions 2715   
10.23.5 Related AtC commands . 2715   
10.23.6 Default 2715   
10.23.7 References . 2715   
10.24 fix_modify AtC gradients command 2715   
10.24.1 Syntax . 2715   
10.24.2 Examples 2716   
10.24.3 Description 2716   
10.24.4 Restrictions 2716  

# 10.24.5 Related AtC commands . 2716  

10.24.6 Default 2716   
10.24.7 References . 2717   
10.25 fix_modify AtC kernel command . 2717   
10.25.1 Syntax . 2717   
10.25.2 Examples 2717   
10.25.3 Description 2717   
10.25.4 Restrictions 2717   
10.25.5 Related AtC commands 2717   
10.25.6 Default 2718   
10.26 fix_modify AtC on_the_fly command 2718   
10.26.1 Syntax . 2718   
10.26.2 Examples 2718   
10.26.3 Description 2718   
10.26.4 Restrictions 2718   
10.26.5 Related AtC commands . 2718   
10.26.6 Default 2718   
10.27 fix_modify AtC rates command 2718   
10.27.1 Syntax . 2718   
10.27.2 Examples 2719   
10.27.3 Description 2719   
10.27.4 Restrictions 2719   
10.27.5 Related AtC commands 2720   
10.27.6 Default 2720   
10.27.7 References 2720   
10.28 fix_modify AtC initial command 2720   
10.28.1 Syntax . 2720   
10.28.2 Examples 2720   
10.28.3 Description 2720   
10.28.4 Restrictions 2720   
10.28.5 Related AtC commands . 2720   
10.28.6 Default 2720   
10.29 fix_modify AtC internal_element_set command 2721   
10.29.1 Syntax . 2721   
10.29.2 Examples 2721   
10.29.3 Description 2721   
10.29.4 Restrictions 2721   
10.29.5 Related AtC commands . 2721   
10.29.6 Default 2721   
10.30 fix_modify AtC internal_quadrature command . 2721   
10.30.1 Syntax . 2721   
10.30.2 Examples 2722   
10.30.3 Description 2722   
10.30.4 Related AtC commands 2722   
10.30.5 Default 2722   
10.31 fix_modify AtC kernel_bandwidth command 2722   
10.31.1 Syntax . 2722   
10.31.2 Examples 2722   
10.31.3 Description 2722   
10.31.4 Restrictions 2722   
10.31.5 Related AtC commands 2722   
10.31.6 Default 2723   
10.32 fix_modify AtC control lumped_lambda_solve command . 2723   
10.32.1 Syntax . 2723   
10.32.2 Examples 2723   
10.32.3 Description 2723   
10.32.4 Restrictions 2723   
10.32.5 Related AtC commands 2723   
10.32.6 Default 2723   
10.33 fix_modify AtC control mask_direction command . 2723   
10.33.1 Syntax . 2723   
10.33.2 Examples 2723   
10.33.3 Description 2724   
10.33.4 Restrictions 2724   
10.33.5 Related AtC commands . 2724   
10.34 fix_modify AtC mass_matrix command 2724   
10.34.1 Syntax . 2724   
10.34.2 Examples 2724   
10.34.3 Description 2724   
10.34.4 Restrictions 2724   
10.34.5 Related AtC commands 2724   
10.34.6 Default 2724   
10.35 fix_modify AtC material command . 2724   
10.35.1 Syntax . 2724   
10.35.2 Examples 2725   
10.35.3 Description 2725   
10.35.4 Restrictions 2725   
10.35.5 Related AtC commands . 2725   
10.35.6 Default 2725   
10.36 fix_modify AtC mesh add_to_nodeset command 2725   
10.36.1 Syntax . 2725   
10.36.2 Examples 2725   
10.36.3 Description 2725   
10.36.4 Restrictions 2725   
10.36.5 Related AtC commands . 2726   
10.36.6 Default 2726   
10.37 fix_modify AtC mesh create command . 2726   
10.37.1 Syntax . 2726   
10.37.2 Examples 2726   
10.37.3 Description 2726   
10.37.4 Restrictions 2726   
10.37.5 Related AtC commands . 2726   
10.37.6 Default 2726   
10.38 fix_modify AtC mesh create_elementset command 2726   
10.38.1 Syntax . 2726   
10.38.2 Examples 2727   
10.38.3 Description 2727   
10.38.4 Restrictions 2727   
10.38.5 Related AtC commands . 2727   
10.38.6 Default 2727   
10.39 fix_modify AtC mesh create_faceset box command 2727   
10.39.1 Syntax . 2727   
10.39.2 Examples 2728   
10.39.3 Description 2728   
10.39.4 Restrictions 2728   
10.39.5 Related AtC commands . 2728   
10.39.6 Default 2728   
10.40 fix_modify AtC mesh create_faceset plane command 2728   
10.40.1 Syntax . 2728   
10.40.2 Examples 2728   
10.40.3 Description 2728   
10.40.4 Restrictions 2728   
10.40.5 Related AtC commands . . 2729   
10.40.6 Default 2729   
fix_modify AtC mesh create_nodeset command . . . . 2729   
10.41.1 Syntax . 2729   
10.41.2 Examples 2729   
10.41.3 Description 2729   
10.41.4 Restrictions 2729   
10.41.5 Related AtC commands . . . 2729   
10.41.6 Default 2729   
.42 fix_modify AtC mesh delete_elements command . . . 2729   
10.42.1 Syntax . 2729   
10.42.2 Examples 2730   
10.42.3 Description 2730   
10.42.4 Restrictions 2730   
10.42.5 Related AtC commands . . 2730   
10.42.6 Default 2730   
.43 fix_modify AtC mesh nodeset_to_elementset command . . . . . . . . . . . . . . . . 2730   
10.43.1 Syntax . 2730   
10.43.2 Examples 2730   
10.43.3 Description 2730   
10.43.4 Restrictions 2731   
10.43.5 Related AtC commands . 2731   
10.43.6 Default 2731   
.44 fix_modify AtC mesh output command 2731   
10.44.1 Syntax . 2731   
10.44.2 Examples 2731   
10.44.3 Description . . 2731   
10.44.4 Restrictions 2731   
10.44.5 Related AtC commands . . . . 2731   
10.44.6 Default 2731   
.45 fix_modify AtC mesh quadrature command 2731   
10.45.1 Syntax . . 2731   
10.45.2 Examples . . 2732   
10.45.3 Description . . 2732   
10.45.4 Restrictions 2732   
10.45.5 Related AtC commands 2732   
10.45.6 Default 2732   
.46 fix_modify AtC mesh read command . 2732   
10.46.1 Syntax . 2732   
10.46.2 Examples 2732   
10.46.3 Description 2732   
10.46.4 Restrictions 2733   
10.46.5 Related AtC commands 2733   
10.46.6 Default 2733   
.47 fix_modify AtC mesh write command 2733   
10.47.1 Syntax . 2733   
10.47.2 Examples . . 2733   
10.47.3 Description 2733   
10.47.4 Restrictions . . 2733   
10.47.5 Related AtC commands 2733   
10.47.6 Default 2733   
10.48 fix_modify AtC output command . 2734   
10.48.1 Syntax . 2734   
10.48.2 Examples 2734   
10.48.3 Description 2734   
10.48.4 Restrictions 2734   
10.48.5 Related AtC commands . 2734   
10.48.6 Default 2734   
10.49 fix_modify AtC output boundary_integral command 2735   
10.49.1 Syntax . 2735   
10.49.2 Examples 2735   
10.49.3 Description 2735   
10.49.4 Restrictions 2735   
10.49.5 Related AtC commands . 2735   
10.49.6 Default 2735   
10.50 fix_modify AtC output contour_integral command 2735   
10.50.1 Syntax . 2735   
10.50.2 Examples 2736   
10.50.3 Description 2736   
10.50.4 Restrictions . 2736   
10.50.5 Related AtC commands 2736   
10.50.6 Default 2736   
10.51 fix_modify AtC output nodeset command 2736   
10.51.1 Syntax . 2736   
10.51.2 Examples 2736   
10.51.3 Description 2736   
10.51.4 Restrictions 2736   
10.51.5 Related AtC commands . 2736   
10.51.6 Default 2737   
10.52 fix_modify AtC output volume_integral command . 2737   
10.52.1 Syntax . 2737   
10.52.2 Examples 2737   
10.52.3 Description 2737   
10.52.4 Restrictions 2737   
10.52.5 Related AtC commands . 2737   
10.52.6 Default 2737   
10.53 fix_modify AtC pair_interactions command 2737   
10.54 fix_modify AtC bond_interactions command 2737   
10.54.1 Syntax . 2737   
10.54.2 Examples 2738   
10.54.3 Description 2738   
10.54.4 Restrictions 2738   
10.54.5 Related AtC commands . 2738   
10.54.6 Default 2738   
10.55 fix_modify AtC poisson_solver command 2738   
10.55.1 Syntax . 2738   
10.55.2 Examples 2738   
10.55.3 Description 2738   
10.55.4 Restrictions 2738   
10.55.5 Related AtC commands . 2738   
10.55.6 Default 2739   
10.56 fix_modify AtC read_restart command . 2739   
10.56.1 Syntax . 2739   
10.56.2 Examples 2739   
10.56.3 Description 2739   
10.56.4 Restrictions 2739   
10.56.5 Related AtC commands 2739   
10.56.6 Default 2739   
10.57 fix_modify AtC remove_molecule command . 2739   
10.57.1 Syntax . 2739   
10.57.2 Examples 2740   
10.57.3 Description 2740   
10.57.4 Restrictions 2740   
10.57.5 Related AtC commands . 2740   
10.57.6 Default 2740   
10.58 fix_modify AtC remove_source command 2740   
10.58.1 Syntax . 2740   
10.58.2 Examples 2740   
10.58.3 Description 2740   
10.58.4 Restrictions 2740   
10.58.5 Related AtC commands 2741   
10.58.6 Default 2741   
10.59 fix_modify AtC remove_species command . 2741   
10.59.1 Syntax . 2741   
10.59.2 Examples 2741   
10.59.3 Description 2741   
10.59.4 Restrictions 2741   
10.59.5 Related AtC commands 2741   
10.59.6 Default 2741   
10.60 fix_modify AtC reset_atomic_reference_positions command 2741   
10.60.1 Syntax . 2741   
10.60.2 Examples 2742   
10.60.3 Description 2742   
10.60.4 Restrictions 2742   
10.60.5 Related AtC commands . 2742   
10.60.6 Default 2742   
10.61 fix_modify AtC reset_time command 2742   
10.61.1 Syntax . 2742   
10.61.2 Examples 2742   
10.61.3 Description 2742   
10.61.4 Restrictions 2742   
10.61.5 Related AtC commands 2742   
10.61.6 Default 2742   
10.62 fix_modify AtC sample_frequency command 2743   
10.62.1 Syntax . 2743   
10.62.2 Examples 2743   
10.62.3 Description 2743   
10.62.4 Restrictions 2743   
10.62.5 Related AtC commands 2743   
10.62.6 Default 2743   
10.63 fix_modify AtC set reference_potential_energy command . 2743   
10.63.1 Syntax . 2743   
10.63.2 Examples 2743   
10.63.3 Description 2744   
10.63.4 Restrictions 2744   
10.63.5 Related AtC commands . 2744   
10.63.6 Default 2744   
10.64 fix_modify AtC source command . 2744   
10.64.1 Syntax . 2744   
10.64.2 Examples 2744   
10.64.3 Description 2744   
10.64.4 Restrictions 2744   
10.64.5 Related AtC commands . 2744   
10.64.6 Default 2745   
10.65 fix_modify AtC source_integration command 2745   
10.65.1 Syntax . 2745   
10.65.2 Examples 2745   
10.65.3 Description 2745   
10.65.4 Restrictions 2745   
10.65.5 Related AtC commands 2745   
10.65.6 Default 2745   
10.66 fix_modify AtC temperature_definition command . 2745   
10.66.1 Syntax . . 2745   
10.66.2 Examples 2745   
10.66.3 Description 2746   
10.66.4 Restrictions 2746   
10.66.5 Related AtC commands . 2746   
10.66.6 Default 2746   
10.67 fix_modify AtC filter command 2746   
10.67.1 Syntax . 2746   
10.67.2 Examples 2746   
10.67.3 Description 2746   
10.67.4 Restrictions 2746   
10.67.5 Related AtC commands . . 2746   
10.67.6 Default 2747   
10.68 fix_modify AtC time_integration command 2747   
10.68.1 Syntax 2747   
10.68.2 Examples 2747   
10.68.3 Description 2747   
10.68.4 Restrictions 2747   
10.68.5 Related AtC commands . 2748   
10.68.6 Default 2748   
10.69 fix_modify AtC track_displacement command . 2748   
10.69.1 Syntax . 2748   
10.69.2 Examples 2748   
10.69.3 Description 2748   
10.69.4 Restrictions 2748   
10.69.5 Related AtC commands . 2748   
10.69.6 Default 2748   
10.70 fix_modify AtC unfix command 2748   
10.70.1 Syntax . 2748   
10.70.2 Examples 2749   
10.70.3 Description 2749   
10.70.4 Restrictions 2749   
10.70.5 Related AtC commands . 2749   
10.70.6 Default 2749   
10.71 fix_modify AtC unfix_flux command . 2749   
10.71.1 Syntax . 2749   
10.71.2 Examples 2749   
10.71.3 Description 2749   
10.71.4 Restrictions 2749   
10.71.5 Related AtC commands . 2749   
10.71.6 Default 2750   
10.72 fix_modify AtC write_atom_weights command 2750   
10.72.1 Syntax . 2750   
10.72.2 Examples 2750   
10.72.3 Description 2750   
10.72.4 Restrictions 2750   
10.72.5 Related AtC commands 2750   
10.72.6 Default 2750   
10.73 fix_modify AtC write_restart command 2750   
10.73.1 Syntax . . 2750   
10.73.2 Examples . 2750   
10.73.3 Description 2751   
10.73.4 Restrictions 2751   
10.73.5 Related AtC commands 2751   
10.73.6 Default 2751  

# 1 Bibliography 2753  

IV Indices and tables 2783  

Index 2785  

# Part  

# About LAMMPS and this manual  

LAMMPS stands for Large-scale Atomic/Molecular Massively Parallel Simulator.  

LAMMPS is a classical molecular dynamics simulation code focusing on materials modeling. It was designed to run efficiently on parallel computers and to be easy to extend and modify. Originally developed at Sandia National Laboratories, a US Department of Energy facility, LAMMPS now includes contributions from many research groups and individuals from many institutions. Most of the funding for LAMMPS has come from the US Department of Energy (DOE). LAMMPS is open-source software distributed under the terms of the GNU Public License Version 2 (GPLv2).  

The LAMMPS website has a variety of information about the code. It includes links to an online version of this manual, an online forum where users can post questions and discuss LAMMPS, and a GitHub site where all LAMMPS development is coordinated.  

The content for this manual is part of the LAMMPS distribution in its doc directory.  

• The version of the manual on the LAMMPS website corresponds to the latest LAMMPS feature release. It is available at: https://docs.lammps.org/.   
• A version of the manual corresponding to the latest LAMMPS stable release (state of the stable branch on GitHub) is available online at: https://docs.lammps.org/stable/   
• A version of the manual with the features most recently added to LAMMPS (state of the develop branch on GitHub) is available at: https://docs.lammps.org/latest/  

If needed, you can build a copy on your local machine of the manual (HTML pages or PDF file) for the version of LAMMPS you have downloaded. Follow the steps on the Build the LAMMPS documentation page.  

The manual is organized into three parts:  

1. The User Guide with information about how to obtain, configure, compile, install, and use LAMMPS, 2. the Programmer Guide with information about how to use the LAMMPS library interface from different programming languages, how to modify and extend LAMMPS, the program design, internal programming interfaces, and code design conventions,  

3. the Command Reference with detailed descriptions of all input script commands available in LAMMPS.  

# Part I  

# User Guide  

# INTRODUCTION  

These pages provide a brief introduction to LAMMPS.  

# 1.1 Overview of LAMMPS  

LAMMPS is a classical molecular dynamics (MD) code that models ensembles of particles in a liquid, solid, or gaseous state. It can model atomic, polymeric, biological, solid-state (metals, ceramics, oxides), granular, coarse-grained, or macroscopic systems using a variety of interatomic potentials (force fields) and boundary conditions. It can model 2d or 3d systems with sizes ranging from only a few particles up to billions.  

LAMMPS can be built and run on single laptop or desktop machines, but is designed for parallel computers. It will run in serial and on any parallel machine that supports the MPI message-passing library. This includes shared-memory multicore, multi-CPU servers and distributed-memory clusters and supercomputers. Parts of LAMMPS also support OpenMP multi-threading, vectorization, and GPU acceleration.  

LAMMPS is written in $\mathrm{C}{+}{+}$ and requires a compiler that is at least compatible with the $\mathrm{C}{+}{+}{-}11$ standard. Earlier versions were written in F77, F90, and $\mathrm{C}\mathrm{+}\mathrm{+}\mathrm{-}98\$ . See the History page of the website for details. All versions can be downloaded as source code from the LAMMPS website.  

LAMMPS is designed to be easy to modify or extend with new capabilities, such as new force fields, atom types, boundary conditions, or diagnostics. See the Modifying & extending LAMMPS section of for more details.  

In the most general sense, LAMMPS integrates Newton’s equations of motion for a collection of interacting particles. A single particle can be an atom or molecule or electron, a coarse-grained cluster of atoms, or a mesoscopic or macroscopic clump of material. The interaction models that LAMMPS includes are mostly short-ranged in nature; some long-range models are included as well.  

LAMMPS uses neighbor lists to keep track of nearby particles. The lists are optimized for systems with particles that are repulsive at short distances, so that the local density of particles never becomes too large. This is in contrast to methods used for modeling plasma or gravitational bodies (like galaxy formation).  

On parallel machines, LAMMPS uses spatial-decomposition techniques with MPI parallelization to partition the simulation domain into subdomains of equal computational cost, one of which is assigned to each processor. Processors communicate and store “ghost” atom information for atoms that border their subdomain. Multi-threading parallelization and GPU acceleration with particle-decomposition can be used in addition.  

# 1.2 What does a LAMMPS version mean  

The LAMMPS “version” is the date when it was released, such as 1 May 2014. LAMMPS is updated continuously, and we aim to keep it working correctly and reliably at all times. Also, several variants of static code analysis are run regularly to maintain or improve the overall code quality, consistency, and compliance with programming standards, best practices and style conventions. You can follow its development in a public git repository on GitHub.  

Each version of LAMMPS contains all the documented features up to and including its version date. For recently added features, we add markers to the documentation at which specific LAMMPS version a feature or keyword was added or significantly changed.  

# 1.2.1 Identifying the Version  

The version date is printed to the screen and log file every time you run LAMMPS. There also is an indication, if a LAMMPS binary was compiled from version with modifications after a release. It is also visible in the file src/version.h and in the LAMMPS directory name created when you unpack a downloaded tarball. And it is on the first page of the manual.  

• If you browse the HTML pages of the online version of the LAMMPS manual, they will by default describe the most current feature release version of LAMMPS. In the navigation bar on the bottom left, there is the option to view instead the documentation for the most recent stable version or the documentation corresponding to the state of the development branch.   
• If you browse the HTML pages included in your downloaded tarball, they describe the version you have, which may be older than the online version.  

# 1.2.2 LAMMPS releases, branches, and tags  

![](images/2454e4116a3b7623334c48a42277dc03720e03a2395e4b94b8c408215c9868e3.jpg)  
Fig. 1: Relations between releases, main branches, and tags in the LAMMPS git repository  

# Development  

Modifications of the LAMMPS source code (like bug fixes, code refactoring, updates to existing features, or addition of new features) are organized into pull requests. Pull requests will be merged into the develop branch of the git repository after they pass automated testing and code review by the LAMMPS developers.  

# Feature Releases  

When a sufficient number of new features and updates have accumulated and the LAMMPS version on the develop branch passes an extended set of automated tests, we release it as a feature release, which are currently made every 4 to 8 weeks. The release branch of the git repository is updated with every such feature release and a tag in the format patch_1May2014 is added. A summary of the most important changes of these releases for the current year are posted on this website page. More detailed release notes are available on GitHub.  

# Stable Releases  

About once a year, we release a stable release version of LAMMPS. This is done after a “stabilization period” where we apply only bug fixes and small, non-intrusive changes to the develop branch but no new features. At the same time, the code is subjected to more detailed and thorough manual testing than the default automated testing. After such a stable release, both the release and the stable branches are updated and two tags are applied, a patch_1May2014 format and a stable_1May2014 format tag.  

# Stable Release Updates  

Between stable releases, we collect bug fixes and updates back-ported from the develop branch in a branch called maintenance. From the maintenance branch we make occasional stable update releases and update the stable branch accordingly. The first update to the stable_1May2014 release would be tagged as stable_1May2014_update1. These updates contain no new features.  

# 1.3 LAMMPS features  

LAMMPS is a classical molecular dynamics (MD) code with these general classes of functionality:  

1. General features   
2. Particle and model types   
3. Interatomic potentials (force fields)   
4. Atom creation   
5. Ensembles, constraints, and boundary conditions   
6. Integrators   
7. Diagnostics   
8. Output   
9. Multi-replica models   
10. Pre- and post-processing   
11. Specialized features (beyond MD itself)  

# 1.3.1 General features  

• runs on a single processor or in parallel   
• distributed memory message-passing parallelism (MPI)   
• shared memory multi-threading parallelism (OpenMP)   
• spatial decomposition of simulation domain for MPI parallelism   
• particle decomposition inside spatial decomposition for OpenMP and GPU parallelism   
• GPLv2 licensed open-source distribution   
• highly portable $\mathrm{C}{+}{+}{-}11$ (optional packages may require $\mathrm{C}{+}{+}17$ )   
• modular code with most functionality in optional packages   
• only depends on MPI library for basic parallel functionality, MPI stub for serial compilation   
• other libraries are optional and only required for specific packages   
• GPU (CUDA, OpenCL, HIP, SYCL), Intel Xeon Phi, and OpenMP support for many code features   
• easy to extend with new features and functionality   
• runs from an input script   
• syntax for defining and using variables and formulas   
• syntax for looping over runs and breaking out of loops  

# 1.3. LAMMPS features  

• run one or multiple simulations simultaneously (in parallel) from one script   
• build as library, invoke LAMMPS through library interface (from C, $\mathrm{C}{+}{+}$ , Fortran) or provided Python wrapper or SWIG based wrappers   
• couple with other codes: LAMMPS calls other code, other code calls LAMMPS, umbrella code calls both, MDI coupling interface   
• call out to Python for computing forces, time integration, or other tasks   
• plugin interface for loading external features at runtime   
• large integrated collection of tests  

# 1.3.2 Particle and model types  

(See atom style command)  

• atoms   
• coarse-grained particles (e.g. bead-spring polymers)   
• united-atom polymers or organic molecules   
• all-atom polymers, organic molecules, proteins, DNA   
• metals   
• metal oxides   
• granular materials   
• coarse-grained mesoscale models   
• finite-size spherical and ellipsoidal particles   
• finite-size line segment (2d) and triangle (3d) particles   
• finite-size rounded polygons (2d) and polyhedra (3d) particles   
point dipole particles   
particles with magnetic spin   
• rigid collections of n particles   
• hybrid combinations of these  

# 1.3.3 Interatomic potentials (force fields)  

(See pair style, bond style, angle style, dihedral style, improper style, kspace style commands)  

• pairwise potentials: Lennard-Jones, Buckingham, Morse, Born-Mayer-Huggins, Yukawa, soft, Class II (COMPASS), hydrogen bond, harmonic, gaussian, tabulated, scripted   
• charged pairwise potentials: Coulombic, point-dipole   
• many-body potentials: EAM, Finnis/Sinclair, MEAM, MEAM+SW, EIM, EDIP, ADP, Stillinger-Weber, Tersoff, REBO, AIREBO, ReaxFF, COMB, Streitz-Mintmire, 3-body polymorphic, BOP, Vashishta   
• machine learning potentials: ACE, AGNI, GAP, Behler-Parrinello (N2P2), POD, RANN, SNAP   
• interfaces to ML potentials distributed by external groups: ANI, ChIMES, DeepPot, HIPNN, MTP   
• long-range interactions for charge, point-dipoles, and LJ dispersion: Ewald, Wolf, PPPM (similar to particlemesh Ewald), MSM, ScaFaCoS   
• polarization models: QEq, core/shell model, Drude dipole model   
• charge equilibration (QEq via dynamic, point, shielded, Slater methods)   
• coarse-grained potentials: DPD, GayBerne, REsquared, colloidal, DLVO, oxDNA / oxRNA, SPICA   
• mesoscopic potentials: granular, Peridynamics, SPH, mesoscopic tubular potential (MESONT)   
• semi-empirical potentials: multi-ion generalized pseudopotential theory (MGPT), second moment tight binding $^+$ QEq (SMTB-Q)   
• electron force field (eFF, AWPMD)   
• bond potentials: harmonic, FENE, Morse, nonlinear, Class II (COMPASS), quartic (breakable), tabulated, scripted   
• angle potentials: harmonic, CHARMM, cosine, cosine/squared, cosine/periodic, Class II (COMPASS), tabulated, scripted   
• dihedral potentials: harmonic, CHARMM, multi-harmonic, helix, Class II (COMPASS), OPLS, tabulated, scripted   
• improper potentials: harmonic, cvff, umbrella, Class II (COMPASS), tabulated   
• polymer potentials: all-atom, united-atom, bead-spring, breakable   
• water potentials: TIP3P, TIP4P, SPC, SPC/E and variants   
• interlayer potentials for graphene and analogues, hetero-junctions   
• metal-organic framework potentials (QuickFF, MO-FF)   
• implicit solvent potentials: hydrodynamic lubrication, Debye   
• force-field compatibility with CHARMM, AMBER, DREIDING, OPLS, GROMACS, Class II (COMPASS), UFF, ClayFF, DREIDING, AMOEBA, INTERFACE   
• access to the OpenKIM Repository of potentials via the kim command   
• hybrid potentials: multiple pair, bond, angle, dihedral, improper potentials can be used in one simulation   
• overlaid potentials: superposition of multiple pair potentials (including many-body) with optional scale factor  

# 1.3.4 Atom creation  

(See read_data, lattice, create_atoms, delete_atoms, displace_atoms, replicate commands)  

• read in atom coordinates from files   
• create atoms on one or more lattices (e.g. grain boundaries)   
• delete geometric or logical groups of atoms (e.g. voids)   
• replicate existing atoms multiple times   
• displace atoms  

# 1.3.5 Ensembles, constraints, and boundary conditions  

(See fix command)  

• 2d or 3d systems • orthogonal or non-orthogonal (triclinic symmetry) simulation domains • constant NVE, NVT, NPT, NPH, Parrinello/Rahman integrators • thermostatting options for groups and geometric regions of atoms • pressure control via Nose/Hoover or Berendsen barostatting in 1 to 3 dimensions  

# 1.3. LAMMPS features  

• simulation box deformation (tensile and shear)   
• harmonic (umbrella) constraint forces   
• rigid body constraints   
• SHAKE / RATTLE bond and angle constraints   
• motion constraints to manifold surfaces   
• Monte Carlo bond breaking, formation, swapping, template based reaction modeling   
• atom/molecule insertion and deletion   
• walls of various kinds, static and moving   
• non-equilibrium molecular dynamics (NEMD)   
• variety of additional boundary conditions and constraints  

# 1.3.6 Integrators  

(See run, run_style, minimize commands)  

• velocity-Verlet integrator   
• Brownian dynamics   
• rigid body integration   
• energy minimization via conjugate gradient, steepest descent relaxation, or damped dynamics (FIRE, Quickmin)   
• rRESPA hierarchical timestepping   
• fixed or adaptive time step   
• rerun command for post-processing of dump files  

# 1.3.7 Diagnostics  

• see various flavors of the $f\alpha$ and compute commands • introspection command for system, simulation, and compile time settings and configurations  

# 1.3.8 Output  

(dump, restart commands)  

• log file of thermodynamic info   
• text dump files of atom coordinates, velocities, other per-atom quantities   
• dump output on fixed and variable intervals, based timestep or simulated time   
• binary restart files   
• parallel I/O of dump and restart files   
• per-atom quantities (energy, stress, centro-symmetry parameter, CNA, etc.)   
• user-defined system-wide (log file) or per-atom (dump file) calculations   
• custom partitioning (chunks) for binning, and static or dynamic grouping of atoms for analysis   
• spatial, time, and per-chunk averaging of per-atom quantities   
• time averaging and histogramming of system-wide quantities  

• atom snapshots in native, XYZ, XTC, DCD, CFG, NetCDF, HDF5, ADIOS2, YAML formats • on-the-fly compression of output and decompression of read in files  

# 1.3.9 Multi-replica models  

• nudged elastic band   
• hyperdynamics   
parallel replica dynamics   
• temperature accelerated dynamics   
parallel tempering   
path-integral MD: first variant, second variant   
• multi-walker collective variables with Colvars and Plumed  

# 1.3.10 Pre- and post-processing  

• A handful of pre- and post-processing tools are packaged with LAMMPS, some of which can convert input and output files to/from formats used by other codes; see the Tools page.  

• Our group has also written and released a separate toolkit called Pizza.py which provides tools for doing setup, analysis, plotting, and visualization for LAMMPS simulations. Pizza.py is written in Python and is available for download from the Pizza.py WWW site.  

# 1.3.11 Specialized features  

LAMMPS can be built with optional packages which implement a variety of additional capabilities. See the Optional Packages page for details.  

These are LAMMPS capabilities which you may not think of as typical classical MD options:  

• static and dynamic load-balancing, optional with recursive bisectioning decomposition   
• generalized aspherical particles   
• stochastic rotation dynamics (SRD)   
• real-time visualization and interactive MD, built-in renderer for images and movies   
• calculate virtual diffraction patterns   
• calculate finite temperature phonon dispersion and the dynamical matrix of minimized structures   
• atom-to-continuum coupling with finite elements   
• coupled rigid body integration via the POEMS library   
• QM/MM coupling   
• Monte Carlo via GCMC and tfMC and atom swapping   
• path-integral molecular dynamics (PIMD) and this as well   
• Direct Simulation Monte Carlo for low-density fluids   
• Peridynamics modeling   
• Lattice Boltzmann fluid   
• targeted and steered molecular dynamics   
• two-temperature electron model  

# 1.4 LAMMPS non-features  

LAMMPS is designed to be a fast, parallel engine for molecular dynamics (MD) simulations. It provides only a modest amount of functionality for setting up simulations and analyzing their output.  

Originally, LAMMPS was not conceived and designed for:  

• being run through a GUI   
• building molecular systems, or building molecular topologies   
• assign force-field coefficients automagically   
• perform sophisticated analysis of your MD simulation   
• visualize your MD simulation interactively   
• plot your output data  

Over the years many of these limitations have been reduced or removed. In part through features added to LAMMPS and in part through external tools that either closely interface with LAMMPS or extend LAMMPS.  

Here are suggestions on how to perform these tasks:  

• GUI: LAMMPS can be built as a library and a Python module that wraps the library interface is provided. Thus, GUI interfaces can be written in Python or $\mathrm{C}/\mathrm{C}++$ that run LAMMPS and visualize or plot its output. Examples of this are provided in the python directory and described on the Python doc page. Since version 2 August 2023 a LAMMPS-GUI tool is included in LAMMPS. Also, there are several external wrappers or GUI front ends that are mentioned on the Pre-/post-processing tools page of the LAMMPS homepage.   
• Builder: Several pre-processing tools are packaged with LAMMPS. Some of them convert input files in formats produced by other MD codes such as CHARMM, AMBER, or Insight into LAMMPS input formats. Some of them are simple programs that will build simple molecular systems, such as linear bead-spring polymer chains. The moltemplate program is a true molecular builder that will generate complex molecular models. See the Tools page for details on tools packaged with LAMMPS. The Pre-/post-processing tools page of the LAMMPS homepage describes a variety of third party tools for this task. Furthermore, some internal LAMMPS commands allow reconstructing, or selectively adding topology information, as well as provide the option to insert molecule templates instead of atoms for building bulk molecular systems.   
• Force-field assignment: The conversion tools described in the previous bullet for CHARMM, AMBER, and Insight will also assign force field coefficients in the LAMMPS format, assuming you provide CHARMM, AMBER, or BIOVIA (formerly Accelrys) force field files. The tools ParmEd and InterMol are particularly powerful and flexible in converting force field and topology data between various MD simulation programs.   
• Simulation analysis: If you want to perform analysis on-the-fly as your simulation runs, see the compute and fix doc pages, which list commands that can be used in a LAMMPS input script. Also see the Modify page for info on how to add your own analysis code or algorithms to LAMMPS. For post-processing, LAMMPS output such as dump file snapshots can be converted into formats used by other MD or post-processing codes. To some degree, that conversion can be done directly inside LAMMPS by interfacing to the VMD molfile plugins. The rerun command also allows post-processing of existing trajectories, and through being able to read a variety of file formats, this can also be used for analyzing trajectories from other MD codes. Some post-processing tools packaged with LAMMPS will do these conversions. Scripts provided in the tools/python directory can extract and massage data in dump files to make it easier to import into other programs. See the Tools page for details on these various options.  

The Pre-/post-processing page on the LAMMPS homepage lists some external packages for analysis of MD simulation data, including data produced by LAMMPS.  

• Visualization: LAMMPS can produce NETPBM, JPG, or PNG format snapshot images on-the-fly via its dump image command and pass them to an external program, FFmpeg, to generate movies from them. The LAMMPSGUI tool has an Snapshot Image Viewer which uses dump image and allows to modify the visualization settings interactively. It also has a Slide Show feature where images created by dump image are collected during a simulation and can be animated interactively or exported to a movie with FFmpeg.  

For high-quality, interactive visualization, there are many excellent and free tools available. See the Visualization Tools page of the LAMMPS website for visualization packages that can process LAMMPS output data.  

• Plotting: See the next bullet about Pizza.py as well as the Python page for examples of plotting LAMMPS output. Scripts provided with the python tool in the tools directory will extract and process data in log and dump files to make it easier to analyze and plot. See the Tools doc page for more discussion of the various tools.  

The LAMMPS-GUI tool has an Chart Viewer where thermodynamic data computed by LAMMPS is collected during the simulation and plotted immediately.  

• Pizza.py: Our group has also written a separate toolkit called Pizza.py which can do certain kinds of setup, analysis, plotting, and visualization (via OpenGL) for LAMMPS simulations. It thus provides some functionality for several of the above bullets. Pizza.py is written in Python and is available for download from this page.  

# 1.5 LAMMPS portability and compatibility  

The primary form of distributing LAMMPS is through highly portable source code. But also several ways of obtaining LAMMPS as precompiled packages or through automated build mechanisms exist. Most of LAMMPS is written in $\mathrm{C}{+}{+}$ , some support tools are written in Fortran or Python or MATLAB.  

# 1.5.1 Programming language standards  

Most of the $\mathrm{C}{+}{+}$ code currently requires a compiler compatible with the $\mathrm{C}{+}{+}11$ standard, the KOKKOS package currently requires $\mathrm{C}{+}{+}17$ . Most of the Python code is written to be compatible with Python 3.5 or later or Python 2.7. Some Python scripts require Python 3 and a few others still need to be ported from Python 2 to Python 3.  

# 1.5.2 Build systems  

LAMMPS can be compiled from source code using a (traditional) build system based on shell scripts, a few shell utilities (grep, sed, cat, tr) and the GNU make program. This requires running within a Bourne shell $(/\mathrm{bin}/\mathrm{sh})$ . Alternatively, a build system with different back ends can be created using CMake. CMake must be at least version 3.16.  

# 1.5.3 Operating systems  

The primary development platform for LAMMPS is Linux. Thus, the chances for LAMMPS to compile without problems are the best on Linux machines. Also, compilation and correct execution on macOS and Windows (using Microsoft Visual $\mathrm{C}{+}{+}$ ) is checked automatically for the largest part of the source code. Some (optional) features are not compatible with all operating systems, either through limitations of the corresponding LAMMPS source code or through incompatibilities of source code or build system of required external libraries or packages.  

Executables for Windows may be created natively using either Cygwin or Visual Studio or with a Linux to Windows MinGW cross-compiler.  

Additionally, FreeBSD and Solaris have been tested successfully to run LAMMPS and produce results consistent with those on Linux.  