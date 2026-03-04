---
title: "Optional Packages"
category: "packages"
tags: ["packages", "optional"]
---
# Optional packages

This section gives an overview of the optional packages included in the
LAMMPS distribution that extend LAMMPS' functionality.  Packages are
groups of files that enable a specific set of features.  For example,
force fields for molecular systems or rigid-body constraints are in
packages.  You can see the list of all packages and "make" commands to
manage them by typing "make package" from within the src directory of
the LAMMPS distribution.  The list of packages that are included in a
specific LAMMPS executable can be displayed by [running LAMMPS with
the "-h" flag.](Run_options)

The [Build package](Build_package) page gives general info on how
to install and uninstall packages as part of the LAMMPS build process.


> **Admonition: External packages**
> In addition to packages included with LAMMPS there also are packages
> that are distributed independently and separate from LAMMPS.  Some of
> them are part of a modified fork of the LAMMPS repository, others are
> add-on files that have to be integrated into the LAMMPS distribution
> first.  The LAMMPS developers have in most cases no direct knowledge
> of those packages and which new commands and modifications to LAMMPS
> they contain.  Since LAMMPS is [open source under the GPL-v2
> license](Intro_opensource), there is no requirement to tell us about
> it or integrated them back into LAMMPS.  Thus you have to contact the
> developers of those individual packages in case of questions or
> problems.
> 
> As the LAMMPS internal code structure is sometimes changing, those
> external packages may need to be updated to remain compatible with
> the latest LAMMPS versions.  The LAMMPS Programmer's Guide part
> contains a section with [notes for updating code written for
> older LAMMPS versions](Developer_updating) which explains
> significant changes and how to update the corresponding code.

Below is the list of packages that are included in the LAMMPS
distribution.  The link for each package name gives more details.

Packages are supported by either the LAMMPS developers or the
contributing authors. They should all be written in a syntax and style
consistent with the rest of LAMMPS.

The "Examples" column is a subdirectory in the examples directory of the
distribution which has one or more input scripts that use the package.
E.g. `peptide` refers to the `examples/peptide` directory; `PACKAGES/atc` refers
to the `examples/PACKAGES/atc` directory.  The "Lib" column indicates`
whether an extra library is needed to build and use the package:

* no  = no library
* sys = system library: you likely have it on your machine
* int = internal library: provided with LAMMPS, but you may need to build it
* ext = external library: you will need to download and install it on your machine


| Package | Description | Doc page | Examples | Lib |
| --- | --- | --- | --- | --- |
| [ADIOS](#PKG-ADIOS) | dump output via ADIOS | [dump adios](dump_adios) | `PACKAGES/adios` | ext |
| [AMOEBA](#PKG-AMOEBA) | AMOEBA and HIPPO force fields | [AMOEBA and HIPPO howto](Howto_amoeba) | amoeba | no |
| [APIP](#PKG-APIP) | adaptive-precision interatomic potentials | [Howto APIP](Howto_apip) | `PACKAGES/apip` | ext |
| [ASPHERE](#PKG-ASPHERE) | aspherical particle models | [Howto spherical](Howto_spherical) | ellipse | no |
| [BOCS](#PKG-BOCS) | BOCS bottom up coarse graining | [fix bocs](fix_bocs) | `PACKAGES/bocs` | no |
| [BODY](#PKG-BODY) | body-style particles | [Howto body](Howto_body) | body | no |
| [BPM](#PKG-BPM) | bonded particle models | [Howto bpm](Howto_bpm) | bpm | no |
| [BROWNIAN](#PKG-BROWNIAN) | Brownian dynamics, self-propelled particles | [fix brownian](fix_brownian), [fix propel/self](fix_propel_self) | `PACKAGES/brownian` | no |
| [CG-DNA](#PKG-CG-DNA) | coarse-grained DNA force fields | `src/CG-DNA/README` | `PACKAGES/cgdna` | no |
| [CG-SPICA](#PKG-CG-SPICA) | SPICA (SDK) coarse-graining model | [pair_style lj/spica](pair_spica) | `PACKAGES/cgspica` | no |
| [CLASS2](#PKG-CLASS2) | class 2 force fields | [pair_style lj/class2](pair_class2) | n/a | no |
| [COLLOID](#PKG-COLLOID) | colloidal particles | [atom_style colloid](atom_style) | colloid | no |
| [COLVARS](#PKG-COLVARS) | [Colvars collective variables library](https://colvars.github.io/) | [fix colvars](fix_colvars) | `PACKAGES/colvars` | int |
| [COMPRESS](#PKG-COMPRESS) | I/O compression | [dump \*/gz](dump) | n/a | sys |
| [CORESHELL](#PKG-CORESHELL) | adiabatic core/shell model | [Howto coreshell](Howto_coreshell) | coreshell | no |
| [DIELECTRIC](#PKG-DIELECTRIC) | dielectric boundary solvers and force styles | [compute efield/atom](compute_efield_atom) | `PACKAGES/dielectric` | no |
| [DIFFRACTION](#PKG-DIFFRACTION) | virtual x-ray and electron diffraction | [compute xrd](compute_xrd) | `PACKAGES/diffraction` | no |
| [DIPOLE](#PKG-DIPOLE) | point dipole particles | [pair_style lj/.../dipole](pair_dipole) | dipole | no |
| [DPD-BASIC](#PKG-DPD-BASIC) | basic DPD models | [pair_styles dpd](pair_dpd) [dpd/ext](pair_dpd_ext) | `PACKAGES/dpd-basic` | no |
| [DPD-MESO](#PKG-DPD-MESO) | mesoscale DPD models | [pair_style edpd](pair_mesodpd) | `PACKAGES/dpd-meso` | no |
| [DPD-REACT](#PKG-DPD-REACT) | reactive dissipative particle dynamics | `src/DPD-REACT/README` | `PACKAGES/dpd-react` | no |
| [DPD-SMOOTH](#PKG-DPD-SMOOTH) | smoothed dissipative particle dynamics | `src/DPD-SMOOTH/README` | `PACKAGES/dpd-smooth` | no |
| [DRUDE](#PKG-DRUDE) | Drude oscillators | [Howto drude](Howto_drude) | `PACKAGES/drude` | no |
| [EFF](#PKG-EFF) | electron force field | [pair_style eff/cut](pair_eff) | `PACKAGES/eff` | no |
| [ELECTRODE](#PKG-ELECTRODE) | electrode charges to match potential | [fix electrode/conp](fix_electrode) | `PACKAGES/electrode` | no |
| [EXTRA-COMMAND](#PKG-EXTRA-COMMAND) | additional command styles | [general commands](Commands_all) | n/a | no |
| [EXTRA-COMPUTE](#PKG-EXTRA-COMPUTE) | additional compute styles | [compute](compute) | n/a | no |
| [EXTRA-DUMP](#PKG-EXTRA-DUMP) | additional dump styles | [dump](dump) | n/a | no |
| [EXTRA-FIX](#PKG-EXTRA-FIX) | additional fix styles | [fix](fix) | n/a | no |
| [EXTRA-MOLECULE](#PKG-EXTRA-MOLECULE) | additional molecular styles | [molecular styles](Commands_bond) | n/a | no |
| [EXTRA-PAIR](#PKG-EXTRA-PAIR) | additional pair styles | [pair_style](pair_style) | n/a | no |
| [FEP](#PKG-FEP) | free energy perturbation | [compute fep](compute_fep) | `PACKAGES/fep` | no |
| [GPU](#PKG-GPU) | GPU-enabled styles | [Section gpu](Speed_gpu) | [Benchmarks](https://www.lammps.org/bench.html) | int |
| [GRANULAR](#PKG-GRANULAR) | granular systems | [Howto granular](Howto_granular) | pour | no |
| [GRAPHICS](#PKG-GRAPHICS) | generate graphics output | [Howto_viz](Howto_viz) | n/a | no |
| [H5MD](#PKG-H5MD) | dump output via HDF5 | [dump h5md](dump_h5md) | n/a | ext |
| [INTEL](#PKG-INTEL) | optimized Intel CPU and KNL styles | [Speed intel](Speed_intel) | [Benchmarks](https://www.lammps.org/bench.html) | no |
| [INTERLAYER](#PKG-INTERLAYER) | Inter-layer pair potentials | [several pair styles](Commands_pair) | `PACKAGES/interlayer` | no |
| [KIM](#PKG-KIM) | OpenKIM wrapper | [pair_style kim](pair_kim) | kim | ext |
| [KOKKOS](#PKG-KOKKOS) | Kokkos-enabled styles | [Speed kokkos](Speed_kokkos) | [Benchmarks](https://www.lammps.org/bench.html) | no |
| [KSPACE](#PKG-KSPACE) | long-range Coulombic solvers | [kspace_style](kspace_style) | peptide | no |
| [LATBOLTZ](#PKG-LATBOLTZ) | Lattice Boltzmann fluid | [fix lb/fluid](fix_lb_fluid) | `PACKAGES/latboltz` | no |
| [LEPTON](#PKG-LEPTON) | evaluate strings as potential function | [pair_style lepton](pair_lepton) | `PACKAGES/lepton` | int |
| [MACHDYN](#PKG-MACHDYN) | smoothed Mach dynamics | [SMD User Guide](PDF/MACHDYN_LAMMPS_userguide.pdf) | `PACKAGES/machdyn` | ext |
| [MANIFOLD](#PKG-MANIFOLD) | motion on 2d surfaces | [fix manifoldforce](fix_manifoldforce) | `PACKAGES/manifold` | no |
| [MANYBODY](#PKG-MANYBODY) | many-body potentials | [pair_style tersoff](pair_tersoff) | shear | no |
| [MBX](#PKG-MBX) | [MBX MB-nrg potential library](https://mbxsimulations.com/) | [pair_mbx](pair_mbx) | `PACKAGES/mbx` | no |
| [MC](#PKG-MC) | Monte Carlo options | [fix gcmc](fix_gcmc) | n/a | no |
| [MDI](#PKG-MDI) | client-server code coupling | [MDI Howto](Howto_mdi) | `PACKAGES/mdi` | ext |
| [MEAM](#PKG-MEAM) | modified EAM potential (C++) | [pair_style meam](pair_meam) | meam | no |
| [MESONT](#PKG-MESONT) | mesoscopic tubular potential model | pair styles [mesocnt](pair_mesocnt) | `PACKAGES/mesont` | no |
| [MGPT](#PKG-MGPT) | fast MGPT multi-ion potentials | [pair_style mgpt](pair_mgpt) | `PACKAGES/mgpt` | no |
| [MISC](#PKG-MISC) | miscellaneous single-file commands | n/a | no | no |
| [ML-HDNNP](#PKG-ML-HDNNP) | High-dimensional neural network potentials | [pair_style hdnnp](pair_hdnnp) | `PACKAGES/hdnnp` | ext |
| [ML-IAP](#PKG-ML-IAP) | multiple machine learning potentials | [pair_style mliap](pair_mliap) | mliap | no |
| [ML-PACE](#PKG-ML-PACE) | Atomic Cluster Expansion potential | [pair pace](pair_pace) | `PACKAGES/pace` | ext |
| [ML-POD](#PKG-ML-POD) | Proper orthogonal decomposition potentials | [pair pod](pair_pod) | pod | ext |
| [ML-QUIP](#PKG-ML-QUIP) | QUIP/libatoms interface | [pair_style quip](pair_quip) | `PACKAGES/quip` | ext |
| [ML-RANN](#PKG-ML-RANN) | Pair style for RANN potentials | [pair rann](pair_rann) | `PACKAGES/rann` | no |
| [ML-SNAP](#PKG-ML-SNAP) | quantum-fitted potential | [pair_style snap](pair_snap) | snap | no |
| [ML-UF3](#PKG-ML-UF3) | quantum-fitted ultra fast potentials | [pair_style uf3](pair_uf3) | `PACKAGES/uf3` | no |
| [MOFFF](#PKG-MOFFF) | styles for [MOF-FF](MOFplus_) force field | [pair_style buck6d/coul/gauss](pair_buck6d_coul_gauss) | `PACKAGES/mofff` | no |
| [MOLECULE](#PKG-MOLECULE) | molecular system force fields | [Howto bioFF](Howto_bioFF) | peptide | no |
| [MOLFILE](#PKG-MOLFILE) | [VMD](VMD_) molfile plug-ins | [dump molfile](dump_molfile) | n/a | ext |
| [NETCDF](#PKG-NETCDF) | dump output via NetCDF | [dump netcdf](dump_netcdf) | n/a | ext |
| [OPENMP](#PKG-OPENMP) | OpenMP-enabled styles | [Speed omp](Speed_omp) | [Benchmarks](https://www.lammps.org/bench.html) | no |
| [OPT](#PKG-OPT) | optimized pair styles | [Speed opt](Speed_opt) | [Benchmarks](https://www.lammps.org/bench.html) | no |
| [ORIENT](#PKG-ORIENT) | fixes for orientation depended forces | [fix orient/*](fix_orient) | `PACKAGES/orient_eco` | no |
| [PERI](#PKG-PERI) | Peridynamics models | [pair_style peri](pair_peri) | peri | no |
| [PHONON](#PKG-PHONON) | phonon dynamical matrix | [fix phonon](fix_phonon) | `PACKAGES/phonon` | no |
| [PLUGIN](#PKG-PLUGIN) | Plugin loader command | [plugin](plugin) | plugins | no |
| [PLUMED](#PKG-PLUMED) | [PLUMED free energy library](https://www.plumed.org) | [fix plumed](fix_plumed) | `PACKAGES/plumed` | ext |
| [PTM](#PKG-PTM) | Polyhedral Template Matching | [compute ptm/atom](compute_ptm_atom) | n/a | no |
| [PYTHON](#PKG-PYTHON) | embed Python code in an input script | [python](python) | python | sys |
| [QEQ](#PKG-QEQ) | QEq charge equilibration | [fix qeq](fix_qeq) | qeq | no |
| [QMMM](#PKG-QMMM) | QM/MM coupling | [fix qmmm](fix_qmmm) | `PACKAGES/qmmm` | ext |
| [QTB](#PKG-QTB) | quantum nuclear effects | [fix qtb](fix_qtb) [fix qbmsst](fix_qbmsst) | qtb | no |
| [RHEO](#PKG-RHEO) | reproducing hydrodynamics and elastic objects | [Howto rheo](Howto_rheo) | rheo | no |
| [REACTION](#PKG-REACTION) | chemical reactions in classical MD | [fix bond/react](fix_bond_react) | `PACKAGES/reaction` | no |
| [REAXFF](#PKG-REAXFF) | ReaxFF potential (C/C++) | [pair_style reaxff](pair_reaxff) | reax | no |
| [REPLICA](#PKG-REPLICA) | multi-replica methods | [Howto replica](Howto_replica) | tad | no |
| [RIGID](#PKG-RIGID) | rigid bodies and constraints | [fix rigid](fix_rigid) | rigid | no |
| [SCAFACOS](#PKG-SCAFACOS) | wrapper for ScaFaCoS Kspace solver | [kspace_style scafacos](kspace_style) | `PACKAGES/scafacos` | ext |
| [SHOCK](#PKG-SHOCK) | shock loading methods | [fix msst](fix_msst) | n/a | no |
| [SMTBQ](#PKG-SMTBQ) | second moment tight binding potentials | pair styles [smtbq](pair_smtbq), [smatb](pair_smatb) | `PACKAGES/smtbq` | no |
| [SPH](#PKG-SPH) | smoothed particle hydrodynamics | [SPH User Guide](PDF/SPH_LAMMPS_userguide.pdf) | `PACKAGES/sph` | no |
| [SPIN](#PKG-SPIN) | magnetic atomic spin dynamics | [Howto spins](Howto_spins) | SPIN | no |
| [SRD](#PKG-SRD) | stochastic rotation dynamics | [fix srd](fix_srd) | srd | no |
| [TALLY](#PKG-TALLY) | pairwise tally computes | [compute XXX/tally](compute_tally) | `PACKAGES/tally` | no |
| [UEF](#PKG-UEF) | extensional flow | [fix nvt/uef](fix_nh_uef) | `PACKAGES/uef` | no |
| [VORONOI](#PKG-VORONOI) | Voronoi tesselation | [compute voronoi/atom](compute_voronoi_atom) | n/a | ext |
| [VTK](#PKG-VTK) | dump output via VTK | [compute vtk](dump_vtk) | n/a | ext |
| [YAFF](#PKG-YAFF) | additional styles implemented in YAFF | [angle_style cross](angle_cross) | `PACKAGES/yaff`` | no |
