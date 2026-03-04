---
title: "Package details"
category: "packages"
tags: ["packages", "optional"]
---
# Package details

Here is a brief description of all packages in LAMMPS.  It lists authors
(if applicable) and summarizes the package contents.  It has specific
instructions on how to install the package, including, if necessary,
info on how to download or build any extra library it requires.  It also
gives links to documentation, example scripts, and pictures/movies (if
available) that illustrate use of the package.

The majority of packages can be included in a LAMMPS build with a single
setting (`-D PKG_<NAME>=on` for CMake) or command (`make yes-<name>`
for make).  See the [Build package](Build_package) page for more
info.  A few packages may require additional steps; this is indicated in
the descriptions below.  The [Build extras](Build_extras) page
gives those details.


> **Note**
> To see the complete list of commands a package adds to LAMMPS,
> you can examine the files in its src directory, e.g. `ls
> src/GRANULAR`.  Files with names that start with fix, compute, atom,
> pair, bond, angle, etc correspond to commands with the same style name
> as contained in the file name.

* [ADIOS](#PKG-ADIOS)
* [AMOEBA](#PKG-AMOEBA)
* [APIP](#PKG-APIP)
* [ASPHERE](#PKG-ASPHERE)
* [BOCS](#PKG-BOCS)
* [BODY](#PKG-BODY)
* [BPM](#PKG-BPM)
* [BROWNIAN](#PKG-BROWNIAN)
* [CG-DNA](#PKG-CG-DNA)
* [CG-SPICA](#PKG-CG-SPICA)
* [CLASS2](#PKG-CLASS2)
* [COLLOID](#PKG-COLLOID)
* [COLVARS](#PKG-COLVARS)
* [COMPRESS](#PKG-COMPRESS)
* [CORESHELL](#PKG-CORESHELL)
* [DIELECTRIC](#PKG-DIELECTRIC)
* [DIFFRACTION](#PKG-DIFFRACTION)
* [DIPOLE](#PKG-DIPOLE)
* [DPD-BASIC](#PKG-DPD-BASIC)
* [DPD-MESO](#PKG-DPD-MESO)
* [DPD-REACT](#PKG-DPD-REACT)
* [DPD-SMOOTH](#PKG-DPD-SMOOTH)
* [DRUDE](#PKG-DRUDE)
* [EFF](#PKG-EFF)
* [ELECTRODE](#PKG-ELECTRODE)
* [EXTRA-COMMAND](#PKG-EXTRA-COMMAND)
* [EXTRA-COMPUTE](#PKG-EXTRA-COMPUTE)
* [EXTRA-DUMP](#PKG-EXTRA-DUMP)
* [EXTRA-FIX](#PKG-EXTRA-FIX)
* [EXTRA-MOLECULE](#PKG-EXTRA-MOLECULE)
* [EXTRA-PAIR](#PKG-EXTRA-PAIR)
* [FEP](#PKG-FEP)
* [GPU](#PKG-GPU)
* [GRAPHICS](#PKG-GRAPHICS)
* [GRANULAR](#PKG-GRANULAR)
* [H5MD](#PKG-H5MD)
* [INTEL](#PKG-INTEL)
* [INTERLAYER](#PKG-INTERLAYER)
* [KIM](#PKG-KIM)
* [KOKKOS](#PKG-KOKKOS)
* [KSPACE](#PKG-KSPACE)
* [LATBOLTZ](#PKG-LATBOLTZ)
* [LEPTON](#PKG-LEPTON)
* [MACHDYN](#PKG-MACHDYN)
* [MANIFOLD](#PKG-MANIFOLD)
* [MANYBODY](#PKG-MANYBODY)
* [MBX](#PKG-MBX)
* [MC](#PKG-MC)
* [MDI](#PKG-MDI)
* [MEAM](#PKG-MEAM)
* [MESONT](#PKG-MESONT)
* [MGPT](#PKG-MGPT)
* [MISC](#PKG-MISC)
* [ML-HDNNP](#PKG-ML-HDNNP)
* [ML-IAP](#PKG-ML-IAP)
* [ML-PACE](#PKG-ML-PACE)
* [ML-POD](#PKG-ML-POD)
* [ML-QUIP](#PKG-ML-QUIP)
* [ML-RANN](#PKG-ML-RANN)
* [ML-SNAP](#PKG-ML-SNAP)
* [ML-UF3](#PKG-ML-UF3)
* [MOFFF](#PKG-MOFFF)
* [MOLECULE](#PKG-MOLECULE)
* [MOLFILE](#PKG-MOLFILE)
* [NETCDF](#PKG-NETCDF)
* [OPENMP](#PKG-OPENMP)
* [OPT](#PKG-OPT)
* [ORIENT](#PKG-ORIENT)
* [PERI](#PKG-PERI)
* [PHONON](#PKG-PHONON)
* [PLUGIN](#PKG-PLUGIN)
* [PLUMED](#PKG-PLUMED)
* [PTM](#PKG-PTM)
* [PYTHON](#PKG-PYTHON)
* [QEQ](#PKG-QEQ)
* [QMMM](#PKG-QMMM)
* [QTB](#PKG-QTB)
* [RHEO](#PKG-RHEO)
* [REACTION](#PKG-REACTION)
* [REAXFF](#PKG-REAXFF)
* [REPLICA](#PKG-REPLICA)
* [RIGID](#PKG-RIGID)
* [SCAFACOS](#PKG-SCAFACOS)
* [SHOCK](#PKG-SHOCK)
* [SMTBQ](#PKG-SMTBQ)
* [SPH](#PKG-SPH)
* [SPIN](#PKG-SPIN)
* [SRD](#PKG-SRD)
* [TALLY](#PKG-TALLY)
* [UEF](#PKG-UEF)
* [VORONOI](#PKG-VORONOI)
* [VTK](#PKG-VTK)
* [YAFF](#PKG-YAFF)
----------


## ADIOS package

**Contents:**

ADIOS is a high-performance I/O library. This package implements the
[dump atom/adios](dump_adios), [dump custom/adios](dump_adios) and
[read_dump ... format adios](read_dump)
commands to write and read data using the ADIOS library.

**Authors:** Norbert Podhorszki (ORNL) from the ADIOS developer team.

*Added in version 28Feb2019*
**Install:**

This package has [specific installation instructions](#adios) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/ADIOS`: filenames -> commands
* `src/ADIOS/README`
* `examples/PACKAGES/adios`
* https://github.com/ornladios/ADIOS2
* [dump atom/adios](dump_adios)
* [dump custom/adios](dump_adios)
* [read_dump](read_dump)

----------


## AMOEBA package

**Contents:**

Implementation of the AMOEBA and HIPPO polarized force fields
originally developed by Jay Ponder's group at the U Washington at St
Louis.  The LAMMPS implementation is based on Fortran 90 code
provided by the Ponder group in their
[Tinker MD software](https://dasher.wustl.edu/tinker/).

**Authors:** Josh Rackers and Steve Plimpton (Sandia), Trung Nguyen (U
 Chicago)

**Supporting info:**

* `src/AMOEBA`: filenames -> commands
* [AMOEBA and HIPPO howto](Howto_amoeba)
* [pair_style amoeba](pair_amoeba)
* [pair_style hippo](pair_amoeba)
* [atom_style amoeba](atom_style)
* [angle_style amoeba](angle_amoeba)
* [improper_style amoeba](improper_amoeba)
* [fix amoeba/bitorsion](fix_amoeba_bitorsion)
* [fix amoeba/pitorsion](fix_amoeba_pitorsion)
* tools/tinker/tinker2lmp.py
* `examples/amoeba`

----------


## APIP package

**Contents:**

This package provides adaptive-precision interatomic potentials (APIP) as
described in:

D. Immel, R. Drautz and G. Sutmann, "Adaptive-precision potentials for
large-scale atomistic simulations", J. Chem. Phys. 162, 114119 (2025)
[link](immel2025_doi_)

D. Immel, R. Drautz and G. Sutmann, "Conservative adaptive-precision
interatomic potentials", arXiv:2512.07693
[link](immel2026_doi_)

Adaptive-precision means, that a fast interatomic potential, such as EAM,
is coupled to a precise interatomic potential, such as ACE.
This package provides the required pair_styles and fixes to run an efficient,
energy-conserving adaptive-precision simulation.

In the context of this package, precision refers to the accuracy of an interatomic
potential.


**Authors:**

This package was written by David Immel^1,
Ralf Drautz^2 and Godehard Sutmann^1^2.

 ^1: Forschungszentrum Juelich, Juelich, Germany

 ^2: Ruhr-University Bochum, Bochum, Germany

**Install:**

The APIP package requires also the installation of ML-PACE, which has
[specific installation instructions](#ml-pace) on the
[Build extras](Build_extras) page.

**Supporting info:**

* `src/APIP`: filenames -> commands
* [Howto APIP](Howto_apip)
* `examples/PACKAGES/apip`
* [fix atom_weight/apip](fix_atom_weight_apip)
* [fix lambda/apip](fix_lambda_apip)
* [fix lambda/la/csp/apip](fix_lambda_la_csp_apip)
* [fix lambda_thermostat/apip](fix_lambda_thermostat_apip)
* [pair_style eam/apip](pair_eam_apip)
* [pair_style lambda/zone/apip](pair_lambda_zone_apip)
* [pair_style lambda/input/apip](pair_lambda_input_apip)
* [pair_style pace/apip](pair_pace_apip)

----------


## ASPHERE package

**Contents:**

Computes, time-integration fixes, and pair styles for aspherical
particle models including ellipsoids, 2d lines, and 3d triangles.

**Supporting info:**

* `src/ASPHERE`: filenames -> commands
* [Howto spherical](Howto_spherical)
* [pair_style gayberne](pair_gayberne)
* [pair_style resquared](pair_resquared)
* [pair_style ylz](pair_ylz)
* [doc/PDF/pair_gayberne_extra.pdf](PDF/pair_gayberne_extra.pdf)
* [doc/PDF/pair_resquared_extra.pdf](PDF/pair_resquared_extra.pdf)
* `examples/ASPHERE`
* `examples/ellipse`
* https://www.lammps.org/movies.html#line
* https://www.lammps.org/movies.html#tri

----------


## BOCS package

**Contents:**

This package provides [fix bocs](fix_bocs), a modified version
of [fix npt](fix_nh) which includes the pressure correction to
the barostat as outlined in:

N. J. H. Dunn and W. G. Noid, "Bottom-up coarse-grained models that
accurately describe the structure, pressure, and compressibility of
molecular liquids", J. Chem. Phys. 143, 243148 (2015).

**Authors:** Nicholas J. H. Dunn and Michael R. DeLyser (The
Pennsylvania State University)

**Supporting info:**

The BOCS package for LAMMPS is part of the BOCS software package:
[https://github.com/noid-group/BOCS](https://github.com/noid-group/BOCS)

See the following reference for information about the entire package:

Dunn, NJH; Lebold, KM; DeLyser, MR; Rudzinski, JF; Noid, WG.
"BOCS: Bottom-Up Open-Source Coarse-Graining Software."
J. Phys. Chem. B. 122, 13, 3363-3377 (2018).

Example inputs are in the `examples/PACKAGES/bocs` folder.

----------


## BODY package

**Contents:**

Body-style particles with internal structure.  Computes,
time-integration fixes, pair styles, as well as the body styles
themselves.  See the [Howto body](Howto_body) page for an
overview.

**Supporting info:**

* `src/BODY` filenames -> commands
* [Howto_body](Howto_body)
* [atom_style body](atom_style)
* [fix nve/body](fix_nve_body)
* [pair_style body/nparticle](pair_body_nparticle)
* `examples/body`

----------


## BPM package

**Contents:**

Pair styles, bond styles, fixes, and computes for bonded particle
models for mesoscale simulations of solids and fracture.  See the
[Howto bpm](Howto_bpm) page for an overview.

**Authors:** Joel T. Clemmer (Sandia National Labs)

*Added in version 4May2022*
**Supporting info:**

* `src/BPM`: filenames -> commands
* [Howto_bpm](Howto_bpm)
* [atom_style bpm/sphere](atom_style)
* [bond_style bpm/rotational](bond_bpm_rotational)
* [bond_style bpm/spring](bond_bpm_spring)
* [compute nbond/atom](compute_nbond_atom)
* [fix nve/bpm/sphere](fix_nve_bpm_sphere)
* [pair_style bpm/spring](pair_bpm_spring)
* https://www.lammps.org/movies.html#bpmpackage
* `examples/bpm`

----------


## BROWNIAN package

**Contents:**

This package provides [fix brownian, fix brownian/sphere, and
fix brownian/asphere](fix_brownian) as well as
[fix propel/self](fix_propel_self) which allow to do Brownian
Dynamics time integration of point, spherical and aspherical particles
and also support self-propelled particles.

**Authors:** Sam Cameron (University of Bristol), Arthur Straube (Zuse Institute Berlin),
Stefan Paquay (while at Brandeis University) (initial version of fix propel/self)

*Added in version 14May2021*
Example inputs are in the `examples/PACKAGES/brownian` folder.

----------


## CG-DNA package

**Contents:**

Several pair styles, bond styles, and integration fixes for coarse-grained
modelling of single- and double-stranded DNA and RNA based on the oxDNA and
oxRNA model of Doye, Louis and Ouldridge. The package includes Langevin-type
rigid-body integrators with improved stability.

**Author:** Oliver Henrich (University of Strathclyde, Glasgow).

**Install:**

The CG-DNA package requires that also the [MOLECULE](#PKG-MOLECULE)
and [ASPHERE](#PKG-ASPHERE) packages are installed.

**Supporting info:**

* `src/CG-DNA`: filenames -> commands
* `src/CG-DNA/README`
* [pair_style oxdna/\*](pair_oxdna)
* [pair_style oxdna2/\*](pair_oxdna2)
* [pair_style oxrna2/\*](pair_oxrna2)
* [bond_style oxdna/\*](bond_oxdna)
* [bond_style oxdna2/\*](bond_oxdna)
* [bond_style oxrna2/\*](bond_oxdna)
* [fix nve/dotc/langevin](fix_nve_dotc_langevin)
* `examples/PACKAGES/cgdna`

----------


## CG-SPICA package

**Contents:**

Several pair styles and an angle style which implement the
coarse-grained SPICA (formerly called SDK) model which enables
simulation of biological or soft material systems.

**Original Author:** Axel Kohlmeyer (Temple U).

**Maintainers:** Yusuke Miyazaki and Wataru Shinoda (Okayama U).

**Supporting info:**

* `src/CG-SPICA`: filenames -> commands
* `src/CG-SPICA/README`
* [pair_style lj/spica/\*](pair_spica)
* [angle_style spica](angle_spica)
* `examples/PACKAGES/cgspica`
* https://www.lammps.org/pictures.html#cg
* https://www.spica-ff.org/

----------


## CLASS2 package

**Contents:**

Bond, angle, dihedral, improper, and pair styles for the COMPASS
CLASS2 molecular force field.

**Supporting info:**

* `src/CLASS2`: filenames -> commands
* [bond_style class2](bond_class2)
* [angle_style class2](angle_class2)
* [dihedral_style class2](dihedral_class2)
* [improper_style class2](improper_class2)
* [pair_style lj/class2](pair_class2)

----------


## COLLOID package

**Contents:**

Coarse-grained finite-size colloidal particles.  Pair styles and fix
wall styles for colloidal interactions.  Includes the Fast Lubrication
Dynamics (FLD) method for hydrodynamic interactions, which is a
simplified approximation to Stokesian dynamics.

**Authors:** This package includes Fast Lubrication Dynamics pair styles
which were created by Amit Kumar and Michael Bybee from Jonathan
Higdon's group at UIUC.

**Supporting info:**

* `src/COLLOID`: filenames -> commands
* [fix wall/colloid](fix_wall)
* [pair_style colloid](pair_colloid)
* [pair_style yukawa/colloid](pair_yukawa_colloid)
* [pair_style brownian](pair_brownian)
* [pair_style lubricate](pair_lubricate)
* [pair_style lubricateU](pair_lubricateU)
* `examples/colloid`
* `examples/srd`

----------


## COLVARS package

**Contents:**

Colvars stands for collective variables, which can be used to implement
various enhanced sampling methods, including Adaptive Biasing Force,
Metadynamics, Steered MD, Umbrella Sampling and Restraints.  A [fix
colvars](fix_colvars) command is implemented which wraps a COLVARS
library, which implements these methods.  simulations.

**Authors:** The COLVARS library is written and maintained by Giacomo
Fiorin (NIH, Bethesda, MD, USA) and Jerome Henin (CNRS, Paris, France),
originally for the NAMD MD code, but with portability in mind.  Axel
Kohlmeyer (Temple U) provided the interface to LAMMPS.

**Install:**

This package has [specific installation instructions](#colvar) on
the [Build extras](Build_extras) page.

**Supporting info:**

* `src/COLVARS`: filenames -> commands
* https://colvars.github.io/master/colvars-refman-lammps.html
* [doc/PDF/colvars-refman-lammps.pdf](PDF/colvars-refman-lammps.pdf)
* `src/COLVARS/README`
* `lib/colvars/README`
* [fix colvars](fix_colvars)
* [group2ndx](group2ndx)
* [ndx2group](group2ndx)
* `examples/PACKAGES/colvars`

----------


## COMPRESS package

**Contents:**

Compressed output of dump files via the zlib compression library,
using dump styles with a "gz" in their style name.

To use this package you must have the zlib compression library
available on your system.

**Author:** Axel Kohlmeyer (Temple U).

**Install:**

This package has [specific installation instructions](#compress) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/COMPRESS`: filenames -> commands
* `src/COMPRESS/README`
* `lib/compress/README`
* [dump atom/gz](dump)
* [dump cfg/gz](dump)
* [dump custom/gz](dump)
* [dump xyz/gz](dump)

----------


## CORESHELL package

**Contents:**

Compute and pair styles that implement the adiabatic core/shell model
for polarizability.  The pair styles augment Born, Buckingham, and
Lennard-Jones styles with core/shell capabilities.  The [compute
temp/cs](compute_temp_cs) command calculates the temperature of a
system with core/shell particles.  See the [Howto coreshell](Howto_coreshell) page for an overview of how to use this package.

**Author:** Hendrik Heenen (Technical U of Munich).

**Supporting info:**

* `src/CORESHELL`: filenames -> commands
* [Howto coreshell](Howto_coreshell)
* [Howto polarizable](Howto_polarizable)
* [compute temp/cs](compute_temp_cs)
* [pair_style born/coul/long/cs](pair_cs)
* [pair_style buck/coul/long/cs](pair_cs)
* [pair_style lj/cut/coul/long/cs](pair_lj)
* `examples/coreshell`

----------


## DIELECTRIC package

**Contents:**

An atom style, multiple pair styles, several fixes, Kspace styles and a
compute for simulating systems using boundary element solvers for
computing the induced charges at the interface between two media with
different dielectric constants.

**Install:**

To use this package, also the [KSPACE](#PKG-KSPACE) and
[EXTRA-PAIR](#PKG-EXTRA-PAIR) packages need to be installed.

**Author:** Trung Nguyen and Monica Olvera de la Cruz (Northwestern U)

*Added in version 2Jul2021*
**Supporting info:**

* `src/DIELECTRIC`: filenames -> commands
* [atom_style dielectric](atom_style)
* [pair_style coul/cut/dielectric](pair_dielectric)
* [pair_style coul/long/dielectric](pair_dielectric)
* [pair_style lj/cut/coul/cut/dielectric](pair_dielectric)
* [pair_style lj/cut/coul/debye/dielectric](pair_dielectric)
* [pair_style lj/cut/coul/long/dielectric](pair_dielectric)
* [pair_style lj/cut/coul/msm/dielectric](pair_dielectric)
* [pair_style pppm/dielectric](kspace_style)
* [pair_style pppm/disp/dielectric](kspace_style)
* [pair_style msm/dielectric](kspace_style)
* [fix_style polarize/bem/icc](fix_polarize)
* [fix_style polarize/bem/gmres](fix_polarize)
* [fix_style polarize/functional](fix_polarize)
* [compute efield/atom](compute_efield_atom)
* `examples/PACKAGES/dielectric`

----------


## DIFFRACTION package

**Contents:**

Two computes and a fix for calculating x-ray and electron diffraction
intensities based on kinematic diffraction theory.

**Author:** Shawn Coleman while at the U Arkansas.

**Supporting info:**

* `src/DIFFRACTION`: filenames -> commands
* [compute saed](compute_saed)
* [compute xrd](compute_xrd)
* [fix saed/vtk](fix_saed_vtk)
* `examples/PACKAGES/diffraction`

----------


## DIPOLE package

**Contents:**

An atom style and several pair styles for point dipole models with
short-range or long-range interactions.

**Supporting info:**

* `src/DIPOLE`: filenames -> commands
* [atom_style dipole](atom_style)
* [pair_style lj/cut/dipole/cut](pair_dipole)
* [pair_style lj/cut/dipole/long](pair_dipole)
* [pair_style lj/long/dipole/long](pair_dipole)
* [angle_style dipole](angle_dipole)
* `examples/dipole`

----------


## DPD-BASIC package

**Contents:**

Pair styles for the basic dissipative particle dynamics (DPD) method
and DPD thermostatting.

Pair style [dpd/coul/slater/long](pair_dpd_coul_slater_long) also
includes smeared charges for coulomb interactions and thus requires the
[KSPACE](#PKG-KSPACE) package to be installed to handle the long-range
Coulomb part of the interactions.

**Authors:** Kurt Smith (U Pittsburgh), Martin Svoboda, Martin Lisal (ICPF and UJEP), Eddy Barraud (IFPEN)

**Supporting info:**

* `src/DPD-BASIC`: filenames -> commands
* [pair_style dpd](pair_dpd)
* [pair_style dpd/tstat](pair_dpd)
* [pair_style dpd/ext](pair_dpd_ext)
* [pair_style dpd/ext/tstat](pair_dpd_ext)
* [pair_style dpd/coul/slater/long](pair_dpd_coul_slater_long)
* `examples/PACKAGES/dpd-basic`

----------


## DPD-MESO package

**Contents:**

Several extensions of the dissipative particle dynamics (DPD)
method.  Specifically, energy-conserving DPD (eDPD) that can model
non-isothermal processes, many-body DPD (mDPD) for simulating
vapor-liquid coexistence, and transport DPD (tDPD) for modeling
advection-diffusion-reaction systems. The equations of motion of these
DPD extensions are integrated through a modified velocity-Verlet (MVV)
algorithm.

**Author:** Zhen Li (Department of Mechanical Engineering, Clemson University)

**Supporting info:**

* `src/DPD-MESO`: filenames -> commands
* `src/DPD-MESO/README`
* [atom_style edpd](atom_style)
* [pair_style edpd](pair_mesodpd)
* [pair_style mdpd](pair_mesodpd)
* [pair_style tdpd](pair_mesodpd)
* [fix mvv/dpd](fix_mvv_dpd)
* `examples/PACKAGES/mesodpd`

----------


## DPD-REACT package

**Contents:**

DPD stands for dissipative particle dynamics.  This package implements
coarse-grained DPD-based models for energetic, reactive molecular
crystalline materials.  It includes many pair styles specific to these
systems, including for reactive DPD, where each particle has internal
state for multiple species and a coupled set of chemical reaction ODEs
are integrated each timestep.  Highly accurate time integrators for
isothermal, isoenergetic, isobaric and isenthalpic conditions are
included.  These enable long timesteps via the Shardlow splitting
algorithm.

**Authors:** Jim Larentzos (ARL), Tim Mattox (Engility Corp), and John
Brennan (ARL).

**Supporting info:**

* `src/DPD-REACT`: filenames -> commands
* `src/DPD-REACT/README`
* [compute dpd](compute_dpd)
* [compute dpd/atom](compute_dpd_atom)
* [fix eos/cv](fix_eos_table)
* [fix eos/table](fix_eos_table)
* [fix eos/table/rx](fix_eos_table_rx)
* [fix shardlow](fix_shardlow)
* [fix rx](fix_rx)
* [pair_style table/rx](pair_table_rx)
* [pair_style dpd/fdt](pair_dpd_fdt)
* [pair_style dpd/fdt/energy](pair_dpd_fdt)
* [pair_style exp6/rx](pair_exp6_rx)
* [pair_style multi/lucy](pair_multi_lucy)
* [pair_style multi/lucy/rx](pair_multi_lucy_rx)
* `examples/PACKAGES/dpd-react`

----------


## DPD-SMOOTH package

**Contents:**

A pair style for smoothed dissipative particle dynamics (SDPD), which
is an extension of smoothed particle hydrodynamics (SPH) to mesoscale
where thermal fluctuations are important (see the
[SPH package](#PKG-SPH)).
Also two fixes for moving and rigid body integration of SPH/SDPD particles
(particles of atom_style meso).

**Author:** Morteza Jalalvand (Institute for Advanced Studies in Basic
Sciences, Iran).

**Supporting info:**

* `src/DPD-SMOOTH`: filenames -> commands
* `src/DPD-SMOOTH/README`
* [pair_style sdpd/taitwater/isothermal](pair_sdpd_taitwater_isothermal)
* [fix meso/move](fix_meso_move)
* [fix rigid/meso](fix_rigid_meso)
* `examples/PACKAGES/dpd-smooth`

----------


## DRUDE package

**Contents:**

Fixes, pair styles, and a compute to simulate thermalized Drude
oscillators as a model of polarization.  See the [Howto drude](Howto_drude) and [Howto drude2](Howto_drude2) pages
for an overview of how to use the package.  There are auxiliary tools
for using this package in tools/drude.

**Authors:** Alain Dequidt (U Clermont Auvergne), Julien
Devemy (CNRS), and Agilio Padua (ENS de Lyon).

**Supporting info:**

* `src/DRUDE`: filenames -> commands
* [Howto drude](Howto_drude)
* [Howto drude2](Howto_drude2)
* [Howto polarizable](Howto_polarizable)
* `src/DRUDE/README`
* [fix drude](fix_drude)
* [fix drude/transform/\*](fix_drude_transform)
* [compute temp/drude](compute_temp_drude)
* [pair_style thole](pair_thole)
* [pair_style lj/cut/thole/long](pair_thole)
* `examples/PACKAGES/drude`
* tools/drude

----------


## EFF package

**Contents:**

EFF stands for electron force field which allows a classical MD code
to model electrons as particles of variable radius.  This package
contains atom, pair, fix and compute styles which implement the eFF as
described in A. Jaramillo-Botero, J. Su, Q. An, and W.A. Goddard III,
JCC, 2010.  The eFF potential was first introduced by Su and Goddard,
in 2007.  There are auxiliary tools for using this package in
tools/eff; see its README file.

**Author:** Andres Jaramillo-Botero (CalTech).

**Supporting info:**

* `src/EFF`: filenames -> commands
* `src/EFF/README`
* [atom_style electron](atom_style)
* [fix nve/eff](fix_nve_eff)
* [fix nvt/eff](fix_nh_eff)
* [fix npt/eff](fix_nh_eff)
* [fix langevin/eff](fix_langevin_eff)
* [compute temp/eff](compute_temp_eff)
* [pair_style eff/cut](pair_eff)
* [pair_style eff/inline](pair_eff)
* `examples/PACKAGES/eff`
* tools/eff/README
* tools/eff
* https://www.lammps.org/movies.html#eff

-------------------


## ELECTRODE package

**Contents:**

The ELECTRODE package allows the user to enforce a constant potential method for
groups of atoms that interact with the remaining atoms as electrolyte.

**Authors:** The ELECTRODE package is written and maintained by Ludwig
Ahrens-Iwers (TUHH, Hamburg, Germany), Shern Tee (UQ, Brisbane, Australia) and
Robert Meissner (Helmholtz-Zentrum Hereon, Geesthacht and TUHH, Hamburg, Germany).

*Added in version 4May2022*
**Install:**

This package has [specific installation instructions](#electrode) on the
[Build extras](Build_extras) page.

**Supporting info:**

* [fix electrode/conp](fix_electrode)
* [fix electrode/conq](fix_electrode)
* [fix electrode/thermo](fix_electrode)

----------


## EXTRA-COMMAND package

**Contents:**

Additional command styles that are less commonly used.

**Supporting info:**

* `src/EXTRA-COMMAND`: filenames -> commands
* [general commands](Commands_all)

----------


## EXTRA-COMPUTE package

**Contents:**

Additional compute styles that are less commonly used.

**Supporting info:**

* `src/EXTRA-COMPUTE`: filenames -> commands
* [compute](compute)

----------


## EXTRA-DUMP package

**Contents:**

Additional dump styles that are less commonly used.

**Supporting info:**

* `src/EXTRA-DUMP`: filenames -> commands
* [dump](dump)

----------


## EXTRA-FIX package

**Contents:**

Additional fix styles that are less commonly used.

**Supporting info:**

* `src/EXTRA-FIX`: filenames -> commands
* [fix](fix)

----------


## EXTRA-MOLECULE package

**Contents:**

Additional bond, angle, dihedral, and improper styles that are less commonly used.

**Install:**

To use this package, also the [MOLECULE](#PKG-MOLECULE) package needs to be installed.

**Supporting info:**

* `src/EXTRA-MOLECULE`: filenames -> commands
* [molecular styles](Commands_bond)

----------


## EXTRA-PAIR package

**Contents:**

Additional pair styles that are less commonly used.

**Supporting info:**

* `src/EXTRA-PAIR`: filenames -> commands
* [pair_style](pair_style)
* `examples/PACKAGES/dispersion`

----------


## FEP package

**Contents:**

FEP stands for free energy perturbation.  This package provides methods
for performing FEP simulations by using a [fix adapt/fep](fix_adapt_fep) command with soft-core pair potentials, which have a
"soft" in their style name.  There are auxiliary tools for using this
package in `tools/fep`; see its `README` file.

**Author:** Agilio Padua (ENS de Lyon)

**Supporting info:**

* `src/FEP`: filenames -> commands
* `src/FEP/README`
* [fix adapt/fep](fix_adapt_fep)
* [compute fep](compute_fep)
* [pair_style \*/soft](pair_fep_soft)
* `examples/PACKAGES/fep`
* tools/fep/README
* tools/fep

----------


## GPU package

**Contents:**

Dozens of pair styles and a version of the PPPM long-range Coulombic
solver optimized for GPUs.  All such styles have a "gpu" as a suffix
in their style name. The GPU code can be compiled with either CUDA or
OpenCL, however the OpenCL variants are no longer actively maintained
and only the CUDA versions are regularly tested.  The
[Speed_gpu](Speed_gpu) page gives details of what hardware and GPU
software is required on your system, and details on how to build and
use this package.  Its styles can be invoked at run time via the `-sf
gpu` or `-suffix gpu` [command-line switches](Run_options).  See
also the [KOKKOS](#PKG-KOKKOS) package, which has GPU-enabled styles.

**Authors:** Mike Brown (Intel) while at Sandia and ORNL and Trung Nguyen
(Northwestern U) while at ORNL and later. AMD HIP support by Evgeny
Kuznetsov, Vladimir Stegailov, and Vsevolod Nikolskiy (HSE University).

**Install:**

This package has [specific installation instructions](#gpu) on the
[Build extras](Build_extras) page.

**Supporting info:**

* `src/GPU`: filenames -> commands
* `src/GPU/README`
* `lib/gpu/README`
* [Accelerator packages](Speed_packages)
* [GPU package](Speed_gpu)
* [Section 4.2 -sf gpu](Run_options)
* [Section 4.2 -pk gpu](Run_options)
* [package gpu](package)
* [Commands](Commands_all) pages ([pair](Commands_pair), [kspace](Commands_kspace))
  for styles followed by (g)
* [Benchmarks page](https://www.lammps.org/bench.html) of website

----------


## GRAPHICS package

**Contents:**

Dump styles [image and movie](dump_image), supporting classes for
rendering images and fonts, several fixes for adding graphics objects to
visualizations, and the region2vmd command for exporting visualizations
of regions scripted graphics in VMD.

**Supporting info:**

* `src/GRAPHICS`: filenames -> commands
* [Howto_viz](Howto_viz)
* [dump image](dump_image)
* [dump movie](dump_image)
* [fix graphics/arrows](fix_graphics_arrows)
* [fix graphics/isosurface](fix_graphics_isosurface)
* [fix graphics/labels](fix_graphics_labels),
* [fix graphics/lines](fix_graphics_lines),
* [fix graphics/objects](fix_graphics_objects),
* [fix graphics/periodic](fix_graphics_periodic),
* [region2vmd](region2vmd)
* https://www.youtube.com/watch?v=9HEsGaOsdik
* https://www.youtube.com/watch?v=f4hfPs7aCmI
* https://www.youtube.com/shorts/1QEjIITapwQ
* https://www.youtube.com/shorts/OYn_VVodnIg
* https://www.youtube.com/shorts/4Cm5p0SfgNU

----------


## GRANULAR package

**Contents:**

Pair styles and fixes for finite-size granular particles, which
interact with each other and boundaries via frictional and dissipative
potentials.

**Supporting info:**

* `src/GRANULAR`: filenames -> commands
* [Howto granular](Howto_granular)
* [fix pour](fix_pour)
* [fix wall/gran](fix_wall_gran)
* [pair_style gran/hooke](pair_gran)
* [pair_style gran/hertz/history](pair_gran)
* `examples/granregion`
* `examples/pour`
* bench/in.chute
* https://www.lammps.org/pictures.html#jamming
* https://www.lammps.org/movies.html#hopper
* https://www.lammps.org/movies.html#dem
* https://www.lammps.org/movies.html#brazil
* https://www.lammps.org/movies.html#granregion

----------


## H5MD package

**Contents:**

H5MD stands for HDF5 for MD.  [HDF5](HDF5_) is a portable, binary,
self-describing file format, used by many scientific simulations.
H5MD is a format for molecular simulations, built on top of HDF5.
This package implements a [dump h5md](dump_h5md) command to output
LAMMPS snapshots in this format.


To use this package you must have the HDF5 library available on your
system.

**Author:** Pierre de Buyl (KU Leuven) created both the package and the
H5MD format.

**Install:**

This package has [specific installation instructions](#h5md) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/H5MD`: filenames -> commands
* `src/H5MD/README`
* `lib/h5md/README`
* [dump h5md](dump_h5md)

----------


## INTEL package

**Contents:**

Dozens of pair, fix, bond, angle, dihedral, improper, and kspace styles
which are optimized for Intel CPUs and KNLs (Knights Landing).  All of
them have an "intel" in their style name.  The [INTEL package](Speed_intel) page gives details of what hardware and compilers are
required on your system, and how to build and use this package.  Its
styles can be invoked at run time via the `-sf intel` or `-suffix intel`
[command-line switches](Run_options).  Also see the [KOKKOS](#PKG-KOKKOS), [OPT](#PKG-OPT), and [OPENMP](#PKG-OPENMP)
packages, which have styles optimized for CPUs and KNLs.

You need to have an Intel compiler, version 14 or higher to take full
advantage of this package. While compilation with GNU compilers is
supported, performance will be sub-optimal.


> **Note**
> the INTEL package contains styles that require using the
> -restrict flag, when compiling with Intel compilers.

**Author:** Mike Brown (Intel).

**Install:**

This package has [specific installation instructions](#intel) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/INTEL`: filenames -> commands
* `src/INTEL/README`
* [Accelerator packages](Speed_packages)
* [INTEL package](Speed_intel)
* [Section 4.2 -sf intel](Run_options)
* [Section 4.2 -pk intel](Run_options)
* [package intel](package)
* Search the [commands](Commands_all) pages ([fix](Commands_fix), [compute](Commands_compute),
  [pair](Commands_pair), [bond, angle, dihedral, improper](Commands_bond), [kspace](Commands_kspace)) for styles followed by (i)
* `src/INTEL/TEST`
* [Benchmarks page](https://www.lammps.org/bench.html) of website

----------


## INTERLAYER package

**Contents:**

A collection of pair styles specifically to be used for modeling layered
materials, most commonly graphene sheets (or equivalents).

**Supporting info:**

* `src/INTERLAYER`: filenames -> commands
* [Pair style](Commands_pair) page
* `examples/PACKAGES/interlayer`

----------


## KIM package

**Contents:**

This package contains a command with a set of sub-commands that serve as a
wrapper on the
[Open Knowledgebase of Interatomic Models (OpenKIM)](https://openkim.org)
repository of interatomic models (IMs) enabling compatible ones to be used in
LAMMPS simulations.


This includes [kim init](kim_commands), and
[kim interactions](kim_commands) commands to select, initialize and
instantiate the IM, a [kim query](kim_commands) command to perform web
queries for material property predictions of OpenKIM IMs, a
[kim param](kim_commands) command to access KIM Model Parameters from
LAMMPS, and a [kim property](kim_commands) command to write material
properties computed in LAMMPS to standard KIM property instance format.

Support for KIM IMs that conform to the
[KIM Application Programming Interface (API)](https://openkim.org/kim-api/)
is provided by the [pair_style kim](pair_kim) command.


> **Note**
> The command *pair_style kim* is called by *kim interactions* and is not
> recommended to be directly used in input scripts.

To use this package you must have the KIM API library available on your
system. The KIM API is available for download on the
[OpenKIM website](https://openkim.org/kim-api/).
When installing LAMMPS from binary, the kim-api package
is a dependency that is automatically downloaded and installed.

Information about the KIM project can be found at its website:
[https://openkim.org](https://openkim.org).
The KIM project is led by Ellad Tadmor and Ryan Elliott (U Minnesota)
and is funded by the [National Science Foundation](https://www.nsf.gov/).

**Authors:** Ryan Elliott (U Minnesota) is the main developer for the KIM
API and the *pair_style kim* command. Yaser Afshar (U Minnesota),
Axel Kohlmeyer (Temple U), Ellad Tadmor (U Minnesota), and
Daniel Karls (U Minnesota) contributed to the
[kim command](kim_commands) interface in close collaboration with
Ryan Elliott.

**Install:**

This package has [specific installation instructions](#kim) on the
[Build extras](Build_extras) page.

**Supporting info:**

* [kim command](kim_commands)
* [pair_style kim](pair_kim)
* `src/KIM`: filenames -> commands
* `src/KIM/README`
* `lib/kim/README`
* `examples/kim`

----------


## KOKKOS package

**Contents:**

Dozens of atom, pair, bond, angle, dihedral, improper, fix, compute
styles adapted to compile using the Kokkos library which can convert
them to OpenMP or CUDA code so that they run efficiently on multicore
CPUs, KNLs, or GPUs.  All the styles have a "kk" as a suffix in their
style name.  The [KOKKOS package](Speed_kokkos) page gives details
of what hardware and software is required on your system, and how to
build and use this package.  Its styles can be invoked at run time via
the `-sf kk` or `-suffix kk` [command-line switches](Run_options).
Also see the [GPU](#PKG-GPU), [OPT](#PKG-OPT), [INTEL](#PKG-INTEL), and [OPENMP](#PKG-OPENMP) packages, which have styles
optimized for CPUs, KNLs, and GPUs.

You must have a C++20 compatible compiler to use this package.  KOKKOS
makes extensive use of advanced C++ features, which can expose compiler
bugs, especially when compiling for maximum performance at high
optimization levels.  Please see the file `lib/kokkos/README` for a
list of compilers and their respective platforms, that are known to
work.

**Authors:** The KOKKOS package was created primarily by Christian Trott
and Stan Moore (Sandia), with contributions from other folks as well.
It uses the open-source [Kokkos library](https://github.com/kokkos)
which was developed by Carter Edwards, Christian Trott, and others at
Sandia, and which is included in the LAMMPS distribution in
`lib/kokkos`.

**Install:**

This package has [specific installation instructions](#kokkos) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/KOKKOS`: filenames -> commands
* `src/KOKKOS/README`
* `lib/kokkos/README`
* [Accelerator packages](Speed_packages)
* [KOKKOS package](Speed_kokkos)
* [Section 4.2 -k on ...](Run_options)
* [Section 4.2 -sf kk](Run_options)
* [Section 4.2 -pk kokkos](Run_options)
* [package kokkos](package)
* Search the [commands](Commands_all) pages ([fix](Commands_fix), [compute](Commands_compute),
  [pair](Commands_pair), [bond, angle, dihedral, improper](Commands_bond),
  [kspace](Commands_kspace)) for styles followed by (k)
* [Benchmarks page](https://www.lammps.org/bench.html) of website

----------


## KSPACE package

**Contents:**

A variety of long-range Coulombic solvers, as well as pair styles which
compute the corresponding short-range pairwise Coulombic interactions.
These include Ewald, particle-particle particle-mesh (PPPM), and
multilevel summation method (MSM) solvers.

**Install:**

Building with this package requires a 1d FFT library be present on your
system for use by the PPPM solvers.  This can be the KISS FFT library
provided with LAMMPS, third party libraries like FFTW, or a
vendor-supplied FFT library.  See the [Build settings](Build_settings) page for details on how to select different FFT
options for your LAMMPS build.

**Supporting info:**

* `src/KSPACE`: filenames -> commands
* [kspace_style](kspace_style)
* [doc/PDF/kspace.pdf](PDF/kspace.pdf)
* [Howto tip3p](Howto_tip3p)
* [Howto tip4p](Howto_tip4p)
* [Howto spc](Howto_spc)
* [pair_style coul](pair_coul)
* Search the [pair style](Commands_pair) page for styles with "long" or "msm" in name
* `examples/peptide`
* bench/in.rhodo

----------


## LATBOLTZ package

**Contents:**

Fixes which implement a background Lattice-Boltzmann (LB) fluid, which
can be used to model MD particles influenced by hydrodynamic forces.

**Authors:** Frances Mackay and Colin Denniston (University of Western
Ontario).

**Install:**

The LATBOLTZ package requires that LAMMPS is build in [MPI parallel mode](#serial).

**Supporting info:**

* `src/LATBOLTZ`: filenames -> commands
* `src/LATBOLTZ/README`
* [fix lb/fluid](fix_lb_fluid)
* [fix lb/momentum](fix_lb_momentum)
* [fix lb/viscous](fix_lb_viscous)
* `examples/PACKAGES/latboltz`

----------


## LEPTON package

**Contents:**

Styles for pair, bond, and angle forces that evaluate the potential
function from a string using the [Lepton mathematical expression parser](https://simtk.org/projects/lepton).  Lepton is a C++ library that is
bundled with [OpenMM](https://openmm.org/) and can be used for
parsing, evaluating, differentiating, and analyzing mathematical
expressions.  This is a more lightweight and efficient alternative for
evaluating custom potential function to an embedded Python interpreter
as used in the [PYTHON package](#PKG-PYTHON).  On the other hand,
since the potentials are evaluated form analytical expressions, they are
more precise than what can be done with [tabulated potentials](#tabulate).

**Authors:** Axel Kohlmeyer (Temple U).  Lepton itself is developed
by Peter Eastman at Stanford University.

*Added in version 8Feb2023*
**Install:**

This package has [specific installation instructions](#lepton) on
the [Build extras](Build_extras) page.

**Supporting info:**

* `src/LEPTON`: filenames -> commands
* `lib/lepton/README`.md
* [pair_style lepton](pair_lepton)
* [bond_style lepton](bond_lepton)
* [angle_style lepton](angle_lepton)
* [dihedral_style lepton](dihedral_lepton)

----------


## MACHDYN package

**Contents:**

An atom style, fixes, computes, and several pair styles which
implements smoothed Mach dynamics (SMD) for solids, which is a model
related to smoothed particle hydrodynamics (SPH) for liquids (see the
[SPH package](#PKG-SPH)).

This package solves solids mechanics problems via a state of the art
stabilized meshless method with hourglass control.  It can specify
hydrostatic interactions independently from material strength models,
i.e. pressure and deviatoric stresses are separated.  It provides many
material models (Johnson-Cook, plasticity with hardening,
Mie-Grueneisen, Polynomial EOS) and allows new material models to be
added.  It implements rigid boundary conditions (walls) which can be
specified as surface geometries from \*.STL files.

**Author:** Georg Ganzenmuller (Fraunhofer-Institute for High-Speed
Dynamics, Ernst Mach Institute, Germany).

**Install:**

This package has [specific installation instructions](#machdyn) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/MACHDYN`: filenames -> commands
* `src/MACHDYN/README`
* [doc/PDF/MACHDYN_LAMMPS_userguide.pdf](PDF/MACHDYN_LAMMPS_userguide.pdf)
* `examples/PACKAGES/machdyn`

----------


## MANIFOLD package

**Contents:**

Several fixes and a "manifold" class which enable simulations of
particles constrained to a manifold (a 2D surface within the 3D
simulation box).  This is done by applying the RATTLE constraint
algorithm to formulate single-particle constraint functions
g(xi,yi,zi) = 0 and their derivative (i.e. the normal of the manifold)
n = grad(g).

**Author:** Stefan Paquay (until 2017: Eindhoven University of
Technology (TU/e), The Netherlands; since 2017: Brandeis University,
Waltham, MA, USA)

**Supporting info:**

* `src/MANIFOLD`: filenames -> commands
* `src/MANIFOLD/README`
* [Howto manifold](Howto_manifold)
* [fix manifoldforce](fix_manifoldforce)
* [fix nve/manifold/rattle](fix_nve_manifold_rattle)
* [fix nvt/manifold/rattle](fix_nvt_manifold_rattle)
* `examples/PACKAGES/manifold`
* https://www.lammps.org/movies.html#manifold

----------


## MANYBODY package

**Contents:**

A variety of many-body and bond-order potentials.  These include
(AI)REBO, BOP, EAM, EIM, Stillinger-Weber, and Tersoff potentials.

**Supporting info:**

* `src/MANYBODY`: filenames -> commands
* [Pair style](Commands_pair) page
* `examples/comb`
* `examples/eim`
* `examples/nb3d`
* `examples/shear`
* `examples/streitz`
* `examples/vashishta`
* bench/in.eam

----------


## MBX Package

**Contents**

The pair_style mbx command implements the MBX library for
MB-pol and MB-nrg data-driven many-body potential energy functions. MBX
is called using [pair_style mbx](pair_mbx) command, which
allow for MB-nrg potentials such as MB-pol to be used in LAMMPS.
For more information on MBX, see the [MBX library](https://mbxsimulations.com) website.

**Authors:** The [MBX library](https://mbxsimulations.com) is developed
by the Paesani group at the University of California, San Diego. Major contributors
include: Marc Riera, Christopher Knight, Ethan Bull-Vulpe, and Henry Agnew.

*Added in version 11Feb2026*
**Install:**

This package has [specific installation instructions](#mbx) on the
[Build extras](Build_extras) page.

**Supporting info:**

* `src/MBX`: filenames -> commands
* [pair_style mbx](pair_mbx)
* https://mbxsimulations.com/

----------


## MC package

**Contents:**

Several fixes and a pair style that have Monte Carlo (MC) or MC-like
attributes.  These include fixes for creating, breaking, and swapping
bonds, for performing atomic swaps, and performing grand canonical
MC (GCMC), semi-grand canonical MC (SGCMC), or similar processes in
conjunction with molecular dynamics (MD).

**Supporting info:**

* `src/MC`: filenames -> commands
* [fix atom/swap](fix_atom_swap)
* [fix bond/break](fix_bond_break)
* [fix bond/create](fix_bond_create)
* [fix bond/create/angle](fix_bond_create)
* [fix bond/swap](fix_bond_swap)
* [fix charge/regulation](fix_charge_regulation)
* [fix gcmc](fix_gcmc)
* [fix hmc](fix_hmc)
* [fix mol/swap](fix_mol_swap)
* [fix neighbo/swap](fix_neighbor_swap)
* [fix sgcmc](fix_sgcmc)
* [fix tfmc](fix_tfmc)
* [fix widom](fix_widom)
* [pair_style dsmc](pair_dsmc)
* https://www.lammps.org/movies.html#gcmc

----------


## MDI package

**Contents:**

A LAMMPS command and fixes to allow client-server coupling of LAMMPS
to other atomic or molecular simulation codes or materials modeling
workflows via the [MolSSI Driver Interface
(MDI) library](https://molssi-mdi.github.io/MDI_Library/).

**Author:** Taylor Barnes - MolSSI, taylor.a.barnes at gmail.com

*Added in version 14May2021*
**Install:**

This package has [specific installation instructions](#mdi) on
the [Build extras](Build_extras) page.

**Supporting info:**

* `src/MDI/README`
* `lib/mdi/README`
* [Howto MDI](Howto_mdi)
* [mdi](mdi)
* [fix mdi/qm](fix_mdi_qm)
* `examples/PACKAGES/mdi`

----------


## MEAM package

**Contents:**

A pair style for the modified embedded atom (MEAM) potential
translated from the Fortran version in the (obsolete) MEAM package
to plain C++. The MEAM fully replaces the MEAM package, which
has been removed from LAMMPS after the 12 December 2018 version.

**Author:** Sebastian Huetter, (Otto-von-Guericke University Magdeburg)
based on the Fortran version of Greg Wagner (Northwestern U) while at
Sandia.

**Supporting info:**

* `src/MEAM`: filenames -> commands
* `src/MEAM/README`
* [pair_style meam](pair_meam)
* `examples/meam`

----------


## MESONT package

**Contents:**

MESONT is a LAMMPS package for simulation of nanomechanics of nanotubes
(NTs).  The model is based on a coarse-grained representation of NTs as
"flexible cylinders" consisting of a variable number of
segments. Internal interactions within a NT and the van der Waals
interaction between the tubes are described by a mesoscopic force field
designed and parameterized based on the results of atomic-level
molecular dynamics simulations. The description of the force field is
provided in the papers listed in `src/MESONT/README`.

This package used to have two independent implementations of this model:
the original implementation using a Fortran library written by the
developers of the model and a second implementation written in C++ by
Philipp Kloza (U Cambridge).  Since the C++ implementation offers the
same features as the original implementation with the addition of
friction, is typically faster, and easier to compile/install, the
Fortran library based implementation has since been obsoleted and
removed from the distribution. You have to download and compile
an older version of LAMMPS if you want to use those.

**Download of potential files:**

The potential files for these pair styles are *very* large and thus are
not included in the regular downloaded packages of LAMMPS or the git
repositories.  Instead, they will be automatically downloaded from a web
server when the package is installed for the first time.

**Authors of the obsoleted *mesont* styles:**

Maxim V. Shugaev (University of Virginia), Alexey N. Volkov (University
of Alabama), Leonid V. Zhigilei (University of Virginia)


> **Deprecated: 8Feb2023**

**Author of the C++ styles:**
Philipp Kloza (U Cambridge)

*Added in version 15Jun2020*
**Supporting info:**

* `src/MESONT`: filenames -> commands
* `src/MESONT/README`
* [bond_style mesocnt](bond_mesocnt)
* [angle_style mesocnt](angle_mesocnt)
* [pair_style mesocnt](pair_mesocnt)
* `examples/PACKAGES/mesont`

----------


## MGPT package

**Contents:**

A pair style which provides a fast implementation of the quantum-based
MGPT multi-ion potentials.  The MGPT or model GPT method derives from
first-principles DFT-based generalized pseudopotential theory (GPT)
through a series of systematic approximations valid for mid-period
transition metals with nearly half-filled d bands.  The MGPT method
was originally developed by John Moriarty at LLNL.  The pair style in
this package calculates forces and energies using an optimized
matrix-MGPT algorithm due to Tomas Oppelstrup at LLNL.

**Authors:** Tomas Oppelstrup and John Moriarty (LLNL).

**Supporting info:**

* `src/MGPT`: filenames -> commands
* `src/MGPT/README`
* [pair_style mgpt](pair_mgpt)
* `examples/PACKAGES/mgpt`

----------


## MISC package

**Contents:**

A variety of compute, fix, pair, bond styles with specialized
capabilities that don't align with other packages.  Do a directory
listing, `ls src/MISC`, to see the list of commands.


> **Note**
> the MISC package contains styles that require using the
> -restrict flag, when compiling with Intel compilers.

**Supporting info:**

* `src/MISC`: filenames -> commands
* [bond_style special](bond_special)
* [compute viscosity/cos](compute_viscosity_cos)
* [fix accelerate/cos](fix_accelerate_cos)
* [fix imd](fix_imd)
* [fix ipi](fix_ipi)
* [pair_style agni](pair_agni)
* [pair_style list](pair_list)
* [pair_style srp](pair_srp)
* [pair_style tracker](pair_tracker)

----------


## ML-HDNNP package

**Contents:**

A [pair_style hdnnp](pair_hdnnp) command which allows to use
high-dimensional neural network potentials (HDNNPs), a form of machine learning
potentials. HDNNPs must be carefully trained prior to their application in a
molecular dynamics simulation.


To use this package you must have the [n2p2](n2p2_) library installed and
compiled on your system.

**Author:** Andreas Singraber

*Added in version 27May2021*
**Install:**

This package has [specific installation instructions](#ml-hdnnp) on the
[Build extras](Build_extras) page.

**Supporting info:**

* `src/ML-HDNNP`: filenames -> commands
* `src/ML-HDNNP/README`
* `lib/hdnnp/README`
* [pair_style hdnnp](pair_hdnnp)
* `examples/PACKAGES/hdnnp`

----------


## ML-IAP package

**Contents:**

A general interface for machine-learning interatomic potentials, including PyTorch.

**Install:**

To use this package, also the [ML-SNAP](#PKG-ML-SNAP) package needs
to be installed.  To make the *mliappy* model available, also the
[PYTHON](#PKG-PYTHON) package needs to be installed, the version
of Python must be 3.6 or later, and the [cython](https://cython.org/) software
must be installed.

**Author:** Aidan Thompson (Sandia), Nicholas Lubbers (LANL).

*Added in version 30Jun2020*
**Supporting info:**

* `src/ML-IAP`: filenames -> commands
* `src/ML-IAP/README.md`
* [pair_style mliap](pair_mliap)
* [compute_style mliap](compute_mliap)
* `examples/mliap` (see README)

When built with the *mliappy* model this package includes an extension for
coupling with Python models, including PyTorch. In this case, the Python
interpreter linked to LAMMPS will need the `cython` and `numpy` modules
installed.  The provided examples build models with PyTorch, which would
therefore also needs to be installed to run those examples.

----------


## ML-PACE package

**Contents:**

A pair style for the Atomic Cluster Expansion potential (ACE).
ACE is a methodology for deriving a highly accurate classical potential
fit to a large archive of quantum mechanical (DFT) data. The ML-PACE
package provides an efficient implementation for running simulations
with ACE potentials.

**Authors:**

This package was written by Yury Lysogorskiy^1,
Cas van der Oord^2, Anton Bochkarev^1,
Sarath Menon^1, Matteo Rinaldi^1, Thomas Hammerschmidt^1, Matous Mrovec^1,
Aidan Thompson^3, Gabor Csanyi^2, Christoph Ortner^4, Ralf Drautz^1.

 ^1: Ruhr-University Bochum, Bochum, Germany

 ^2: University of Cambridge, Cambridge, United Kingdom

 ^3: Sandia National Laboratories, Albuquerque, New Mexico, USA

 ^4: University of British Columbia, Vancouver, BC, Canada

*Added in version 14May2021*
**Install:**

This package has [specific installation instructions](#ml-pace) on the
[Build extras](Build_extras) page.  This package may also be compiled
as a plugin to avoid licensing conflicts when distributing binaries.

**Supporting info:**

* `src/ML-PACE`: filenames -> commands
* [pair_style pace](pair_pace)
* `examples/PACKAGES/pace`

----------


## ML-POD package

**Contents:**

A pair style and fitpod style for Proper Orthogonal Descriptors
(POD). POD is a methodology for deriving descriptors based on the proper
orthogonal decomposition. The ML-POD package provides an efficient
implementation for running simulations with POD potentials, along with
fitting the potentials natively in LAMMPS.

**Authors:**

Ngoc Cuong Nguyen (MIT), Andrew Rohskopf (Sandia)

*Added in version 22Dec2022*
**Install:**

This package has [specific installation instructions](#ml-pod) on the
[Build extras](Build_extras) page.

**Supporting info:**

* `src/ML-POD`: filenames -> commands
* [pair_style pod](pair_pod)
* [command_style fitpod](fitpod_command)
* `examples/PACKAGES/pod`

----------


## ML-QUIP package

**Contents:**

A [pair_style quip](pair_quip) command which wraps the [QUIP
libAtoms library](quip_), which includes a variety of interatomic
potentials, including Gaussian Approximation Potential (GAP) models
developed by the Cambridge University group.


To use this package you must have the QUIP libAtoms library available
on your system.

**Author:** Albert Bartok (Cambridge University)

**Install:**

This package has [specific installation instructions](#ml-quip) on the
[Build extras](Build_extras) page.

**Supporting info:**

* `src/ML-QUIP`: filenames -> commands
* `src/ML-QUIP/README`
* [pair_style quip](pair_quip)
* `examples/PACKAGES/quip`

----------


## ML-RANN package

**Contents:**

A pair style for using rapid atomistic neural network (RANN) potentials.
These neural network potentials work by first generating a series of symmetry
functions from the neighbor list and then using these values as the input layer
of a neural network.

**Authors:**

This package was written by Christopher Barrett
with contributions by Doyl Dickel, Mississippi State University.

*Added in version 27May2021*
**Supporting info:**

* `src/ML-RANN`: filenames -> commands
* [pair_style rann](pair_rann)
* `examples/PACKAGES/rann`

----------


## ML-SNAP package

**Contents:**

A pair style for the spectral neighbor analysis potential (SNAP).
SNAP is methodology for deriving a highly accurate classical potential
fit to a large archive of quantum mechanical (DFT) data. Also several
computes which analyze attributes of the potential.

**Author:** Aidan Thompson (Sandia).

**Supporting info:**

* `src/ML-SNAP`: filenames -> commands
* [pair_style snap](pair_snap)
* [compute sna/atom](compute_sna_atom)
* [compute sna/grid](compute_sna_atom)
* [compute sna/grid/local](compute_sna_atom)
* [compute snad/atom](compute_sna_atom)
* [compute snav/atom](compute_sna_atom)
* `examples/snap`

----------


## ML-UF3 package

**Contents:**

A pair style for the ultra-fast force field potentials (UF3). UF3 is a
methodology for deriving a highly accurate classical potential which is
fast to evaluate and is fitted to a large archives of quantum mechanical
(DFT) data.  The use of b-spline basis set in UF3 enables the rapid
evaluation of 2-body and 3-body interactions.

**Authors:** Ajinkya C Hire (University of Florida),
Hendrik Krass (University of Constance),
Matthias Rupp (Luxembourg Institute of Science and Technology),
Richard Hennig (University of Florida)

**Supporting info:**

* `src/ML-UF3`: filenames -> commands
* [pair_style uf3](pair_uf3)
* `examples/uf3`
* https://github.com/uf3/uf3


## MOFFF package

**Contents:**

Pair, angle and improper styles needed to employ the MOF-FF
force field by Schmid and coworkers with LAMMPS.
MOF-FF is a first principles derived force field with the primary aim
to simulate MOFs and related porous framework materials, using spherical
Gaussian charges. It is described in S. Bureekaew et al., Phys. Stat. Sol. B
2013, 250, 1128-1141.
For the usage of MOF-FF see the example in the example directory as
well as the [MOF+](MOFplus_) website.


**Author:** Hendrik Heenen (Technical U of Munich),
Rochus Schmid (Ruhr-University Bochum).

**Supporting info:**

* `src/MOFFF`: filenames -> commands
* `src/MOFFF/README`
* [pair_style buck6d/coul/gauss](pair_buck6d_coul_gauss)
* [angle_style class2](angle_class2)
* [angle_style cosine/buck6d](angle_cosine_buck6d)
* [improper_style inversion/harmonic](improper_inversion_harmonic)
* `examples/PACKAGES/mofff`

----------


## MOLECULE package

**Contents:**

A large number of atom, pair, bond, angle, dihedral, improper styles
that are used to model molecular systems with fixed covalent bonds.
The pair styles include the Dreiding (hydrogen-bonding) and CHARMM
force fields, and a TIP4P water model.

**Supporting info:**

* `src/MOLECULE`: filenames -> commands
* [atom_style](atom_style)
* [bond_style](bond_style)
* [angle_style](angle_style)
* [dihedral_style](dihedral_style)
* [improper_style](improper_style)
* [pair_style hbond/dreiding/lj](pair_hbond_dreiding)
* [pair_style lj/charmm/coul/charmm](pair_charmm)
* [Howto bioFF](Howto_bioFF)
* `examples/cmap`
* `examples/dreiding`
* `examples/micelle,`
* `examples/peptide`
* bench/in.chain
* bench/in.rhodo

----------


## MOLFILE package

**Contents:**

A [dump molfile](dump_molfile) command which uses molfile plugins
that are bundled with the [VMD](vmd-home_)
molecular visualization and analysis program, to enable LAMMPS to dump
snapshots in formats compatible with various molecular simulation
tools.

To use this package you must have the desired VMD plugins available on
your system.

Note that this package only provides the interface code, not the
plugins themselves, which will be accessed when requesting a specific
plugin via the [dump molfile](dump_molfile) command.  Plugins can
be obtained from a VMD installation which has to match the platform
that you are using to compile LAMMPS for. By adding plugins to VMD,
support for new file formats can be added to LAMMPS (or VMD or other
programs that use them) without having to re-compile the application
itself.  More information about the VMD molfile plugins can be found
at
[https://www.ks.uiuc.edu/Research/vmd/plugins/molfile](https://www.ks.uiuc.edu/Research/vmd/plugins/molfile/).

**Author:** Axel Kohlmeyer (Temple U).

**Install:**

This package has [specific installation instructions](#molfile) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/MOLFILE`: filenames -> commands
* `src/MOLFILE/README`
* `lib/molfile/README`
* [dump molfile](dump_molfile)

----------


## NETCDF package

**Contents:**

Dump styles for writing NetCDF formatted dump files.  NetCDF is a
portable, binary, self-describing file format developed on top of
HDF5. The file contents follow the AMBER NetCDF trajectory conventions
(https://ambermd.org/netcdf/nctraj.xhtml), but include extensions.

To use this package you must have the NetCDF library available on your
system.

Note that NetCDF files can be directly visualized with the following
tools:

* [Ovito](ovito_) (Ovito supports the AMBER convention and the extensions mentioned above)
* [VMD](vmd-home_)


**Author:** Lars Pastewka (Karlsruhe Institute of Technology).

**Install:**

This package has [specific installation instructions](#netcdf) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/NETCDF`: filenames -> commands
* `src/NETCDF/README`
* `lib/netcdf/README`
* [dump netcdf](dump_netcdf)

----------


## OPENMP package

**Contents:**

Hundreds of pair, fix, compute, bond, angle, dihedral, improper, and
kspace styles which are altered to enable threading on many-core CPUs
via OpenMP directives.  All of them have an "omp" in their style name.
The [OPENMP package](Speed_omp) page gives details of what hardware
and compilers are required on your system, and how to build and use
this package.  Its styles can be invoked at run time via the `-sf omp`
or `-suffix omp` [command-line switches](Run_options).  Also see
the [KOKKOS](#PKG-KOKKOS), [OPT](#PKG-OPT), and [INTEL](#PKG-INTEL)
packages, which have styles optimized for CPUs.

**Author:** Axel Kohlmeyer (Temple U).


> **Note**
> To enable multi-threading support the compile flag `-fopenmp`
> and the link flag `-fopenmp` (for GNU compilers, you have to look up
> the equivalent flags for other compilers) must be used to build LAMMPS.
> When using Intel compilers, also the `-restrict` flag is required.
> The OPENMP package can be compiled without enabling OpenMP; then
> all code will be compiled as serial and the only improvement over the
> regular styles are some data access optimization. These flags should
> be added to the CCFLAGS and LINKFLAGS lines of your Makefile.machine.
> See `src/MAKE/OPTIONS/Makefile`.omp for an example.

Once you have an appropriate Makefile.machine, you can
install/uninstall the package and build LAMMPS in the usual manner:

**Install:**

This package has [specific installation instructions](#openmp) on
the [Build extras](Build_extras) page.

**Supporting info:**

* `src/OPENMP`: filenames -> commands
* `src/OPENMP/README`
* [Accelerator packages](Speed_packages)
* [OPENMP package](Speed_omp)
* [Command-line option -suffix/-sf omp](Run_options)
* [Command-line option -package/-pk omp](Run_options)
* [package omp](package)
* Search the [commands](Commands_all) pages ([fix](Commands_fix), [compute](Commands_compute),
  [pair](Commands_pair), [bond, angle, dihedral, improper](Commands_bond),
  [kspace](Commands_kspace)) for styles followed by (o)
* [Benchmarks page](https://www.lammps.org/bench.html) of website

----------


## OPT package

**Contents:**

A handful of pair styles which are optimized for improved CPU
performance on single or multiple cores.  These include EAM, LJ,
CHARMM, and Morse potentials.  The styles have an "opt" suffix in
their style name.  The [OPT package](Speed_opt) page gives
details of how to build and use this package.  Its styles can be
invoked at run time via the `-sf opt` or `-suffix opt` [command-line switches](Run_options).  See also the [KOKKOS](#PKG-KOKKOS),
[INTEL](#PKG-INTEL), and [OPENMP](#PKG-OPENMP) packages, which
have styles optimized for CPU performance.

**Authors:** James Fischer (High Performance Technologies), David Richie,
and Vincent Natoli (Stone Ridge Technology).

**Install:**

This package has [specific installation instructions](#opt) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/OPT`: filenames -> commands
* [Accelerator packages](Speed_packages)
* [OPT package](Speed_opt)
* [Section 4.2 -sf opt](Run_options)
* Search the [pair style](Commands_pair) page for styles followed by (t)
* [Benchmarks page](https://www.lammps.org/bench.html) of website


## ORIENT package

**Contents:**

A few fixes that apply orientation dependent forces for studying
grain boundary migration.

**Supporting info:**

* `src/ORIENT`: filenames -> commands
* [fix orient/bcc](fix_orient)
* [fix orient/fcc](fix_orient)
* [fix orient/eco](fix_orient_eco)

----------


## PERI package

**Contents:**

An atom style, several pair styles which implement different
Peridynamics materials models, and several computes which calculate
diagnostics.  Peridynamics is a particle-based meshless continuum
model.

**Authors:** The original package was created by Mike Parks (Sandia).
Additional Peridynamics models were added by Rezwanur Rahman and John
Foster (UTSA).

**Supporting info:**

* `src/PERI`: filenames -> commands
* [Peridynamics Howto](Howto_peri)
* [doc/PDF/PDLammps_overview.pdf](PDF/PDLammps_overview.pdf)
* [doc/PDF/PDLammps_EPS.pdf](PDF/PDLammps_EPS.pdf)
* [doc/PDF/PDLammps_VES.pdf](PDF/PDLammps_VES.pdf)
* [atom_style peri](atom_style)
* [pair_style peri/\*](pair_peri)
* [compute damage/atom](compute_damage_atom)
* [compute plasticity/atom](compute_plasticity_atom)
* `examples/peri`
* https://www.lammps.org/movies.html#impact

----------


## PHONON package

**Contents:**

A [fix phonon](fix_phonon) command that calculates dynamical
matrices, which can then be used to compute phonon dispersion
relations, directly from molecular dynamics simulations.
And a [dynamical_matrix](dynamical_matrix) as well as a
[third_order](third_order) command to compute the dynamical matrix
and third order tensor from finite differences.

**Install:**

The fix phonon command also requires that the [KSPACE](#PKG-KSPACE)
package is installed.


**Authors:** Ling-Ti Kong (Shanghai Jiao Tong University) for "fix phonon"
and Charlie Sievers (UC Davis) for "dynamical_matrix" and "third_order"

**Supporting info:**

* `src/PHONON`: filenames -> commands
* `src/PHONON/README`
* [fix phonon](fix_phonon)
* [dynamical_matrix](dynamical_matrix)
* [third_order](third_order)
* `examples/PACKAGES/phonon`

----------


## PLUGIN package

**Contents:**

A [plugin](plugin) command that can load and unload several
kind of styles in LAMMPS from shared object files at runtime without
having to recompile and relink LAMMPS.

When the environment variable `LAMMPS_PLUGIN_PATH` is set, then LAMMPS
will search the directory (or directories) listed in this path for files
with names that end in `plugin.so` (e.g. `helloplugin.so`) and will
try to load the contained plugins automatically at start-up.

**Authors:** Axel Kohlmeyer (Temple U)

*Added in version 8Apr2021*
**Supporting info:**

* `src/PLUGIN`: filenames -> commands
* [plugin command](plugin)
* [Information on writing plugins](Developer_plugins)
* `examples/plugin`

----------


## PLUMED package

**Contents:**

The fix plumed command allows you to use the PLUMED free energy plugin
for molecular dynamics to analyze and bias your LAMMPS trajectory on
the fly.  The PLUMED library is called from within the LAMMPS input
script by using the [fix plumed](fix_plumed) command.

**Authors:** The [PLUMED library](https://www.plumed.org) is written
and maintained by Massimilliano Bonomi, Giovanni Bussi, Carlo Camiloni,
and Gareth Tribello.

**Install:**

This package has [specific installation instructions](#plumed) on the
[Build extras](Build_extras) page.  This package may also be compiled
as a plugin to avoid licensing conflicts when distributing binaries.

**Supporting info:**

* `src/PLUMED/README`
* `lib/plumed/README`
* [fix plumed](fix_plumed)
* `examples/PACKAGES/plumed`

----------


## PTM package

**Contents:**

A [compute ptm/atom](compute_ptm_atom) command that calculates
local structure characterization using the Polyhedral Template
Matching methodology.

**Author:** Peter Mahler Larsen (MIT).

**Supporting info:**

* `src/PTM`: filenames not starting with ptm\_ -> commands
* `src/PTM`: filenames starting with ptm\_ -> supporting code
* `src/PTM/LICENSE`
* [compute ptm/atom](compute_ptm_atom)

----------


## PYTHON package

**Contents:**

A [python](python) command which allow you to execute Python code
from a LAMMPS input script.  The code can be in a separate file or
embedded in the input script itself.  See the [Python call](Python_call) page for an overview of using Python from LAMMPS in this
manner and all the [Python](Python_head) manual pages for other
ways to use LAMMPS and Python together.


> **Note**
> Building with the PYTHON package assumes you have a Python development
> environment (headers and libraries) available on your system, which needs
> to be Python version 3.6 or later.

**Install:**

This package has [specific installation instructions](#python) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/PYTHON`: filenames -> commands
* [Python call](Python_head)
* `lib/python/README`
* `examples/python`

----------


## QEQ package

**Contents:**

Several fixes for performing charge equilibration (QEq) via different
algorithms.  These can be used with pair styles that perform QEq as
part of their formulation.

**Supporting info:**

* `src/QEQ`: filenames -> commands
* [fix qeq/\*](fix_qeq)
* `examples/qeq`
* `examples/streitz`

----------


## QMMM package

**Contents:**

A [fix qmmm](fix_qmmm) command which allows LAMMPS to be used as
the MM code in a QM/MM simulation.  This is currently only available
in combination with the [Quantum ESPRESSO](espresso_) package.


To use this package you must have Quantum ESPRESSO (QE) available on
your system and include its coupling library in the compilation and
then compile LAMMPS as a library.  For QM/MM calculations you then
build a custom binary with MPI support, that sets up 3 partitions with
MPI sub-communicators (for inter- and intra-partition communication)
and then calls the corresponding library interfaces on each partition
(2x LAMMPS and 1x QE).

The current implementation supports an ONIOM style mechanical coupling
and a multi-pole based electrostatic coupling to the Quantum ESPRESSO
plane wave DFT package.  The QM/MM interface has been written in a
manner that coupling to other QM codes should be possible without
changes to LAMMPS itself.

**Authors:** Axel Kohlmeyer (Temple U). Mariella Ippolito and Carlo Cavazzoni (CINECA, Italy)

**Install:**

This package has [specific installation instructions](#qmmm)
on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/QMMM`: filenames -> commands
* `src/QMMM/README`
* `lib/qmmm/README`
* [fix phonon](fix_phonon)
* `lib/qmmm/example-ec/README`
* `lib/qmmm/example-mc/README`

----------


## QTB package

**Contents:**

Two fixes which provide a self-consistent quantum treatment of
vibrational modes in a classical molecular dynamics simulation.  By
coupling the MD simulation to a colored thermostat, it introduces zero
point energy into the system, altering the energy power spectrum and
the heat capacity to account for their quantum nature. This is useful
when modeling systems at temperatures lower than their classical
limits or when temperatures ramp across the classical limits in a
simulation.

**Author:** Yuan Shen (Stanford U).

**Supporting info:**

* `src/QTB`: filenames -> commands
* `src/QTB/README`
* [fix qtb](fix_qtb)
* [fix qbmsst](fix_qbmsst)
* `examples/PACKAGES/qtb`

----------


## REACTION package

**Contents:**

This package implements the REACTER protocol, which allows for complex
bond topology changes (reactions) during a running MD simulation when
using classical force fields. Topology changes are defined in pre- and
post-reaction molecule templates and can include creation and deletion
of bonds, angles, dihedrals, impropers, atom types, bond types, angle
types, dihedral types, improper types, and/or atomic charges. Other
options currently available include reaction constraints (e.g., angle
and Arrhenius constraints), deletion of reaction byproducts or other
small molecules, creation of new atoms or molecules bonded to existing
atoms, and using LAMMPS variables for input parameters.

**Author:** Jacob R. Gissinger (NASA Langley Research Center).

**Supporting info:**

* `src/REACTION`: filenames -> commands
* `src/REACTION/README`
* [fix bond/react](fix_bond_react)
* `examples/PACKAGES/reaction`
* [2017 LAMMPS Workshop](https://www.lammps.org/workshops/Aug17/pdf/gissinger.pdf)
* [2019 LAMMPS Workshop](https://www.lammps.org/workshops/Aug19/talk_gissinger.pdf)
* [2021 LAMMPS Workshop](https://www.lammps.org/workshops/Aug21/talk/jacob-gissinger/)
* [REACTER website (reacter.org)](https://www.reacter.org/)

----------


## REAXFF package

**Contents:**

A pair style which implements the ReaxFF potential in C/C++.  ReaxFF
is a universal reactive force field.  See the `src/REAXFF/README` file
for more info on differences between the two packages.  Also two fixes
for monitoring molecules as bonds are created and destroyed.

**Author:** Hasan Metin Aktulga (MSU) while at Purdue University.

**Supporting info:**

* `src/REAXFF`: filenames -> commands
* `src/REAXFF/README`
* [pair_style reaxff](pair_reaxff)
* [fix reaxff/bonds](fix_reaxff_bonds)
* [fix reaxff/species](fix_reaxff_species)
* `examples/reaxff`

----------


## REPLICA package

**Contents:**

A collection of multi-replica methods which can be used when running
multiple LAMMPS simulations (replicas).  See the [Howto replica](Howto_replica) page for an overview of how to run
multi-replica simulations in LAMMPS.  Methods in the package include
nudged elastic band (NEB), parallel replica dynamics (PRD),
temperature accelerated dynamics (TAD), parallel tempering, and a
verlet/split algorithm for performing long-range Coulombics on one set
of processors, and the remainder of the force field calculation on
another set.

**Supporting info:**

* `src/REPLICA`: filenames -> commands
* [Howto replica](Howto_replica)
* [neb](neb)
* [prd](prd)
* [tad](tad)
* [temper](temper),
* [temper/npt](temper_npt),
* [temper/grem](temper_grem),
* [run_style verlet/split](run_style)
* `examples/neb`
* `examples/prd`
* `examples/tad`
* `examples/PACKAGES/grem`

----------


## RHEO package

**Contents:**

Pair styles, bond styles, fixes, and computes for reproducing
hydrodynamics and elastic objects. See the [Howto rheo](Howto_rheo) page for an overview.

**Install:**

This package has [specific installation instructions](#rheo) on the [Build extras](Build_extras) page.

**Authors:** Joel T. Clemmer (Sandia National Labs),
Thomas C. O'Connor (Carnegie Mellon University)

*Added in version 29Aug2024*
**Supporting info:**

* `src/RHEO` filenames -> commands
* [Howto_rheo](Howto_rheo)
* [atom_style rheo](atom_style)
* [atom_style rheo/thermal](atom_style)
* [bond_style rheo/shell](bond_rheo_shell)
* [compute rheo/property/atom](compute_rheo_property_atom)
* [fix rheo](fix_rheo)
* [fix rheo/oxidation](fix_rheo_oxidation)
* [fix rheo/pressure](fix_rheo_pressure)
* [fix rheo/thermal](fix_rheo_thermal)
* [fix rheo/viscosity](fix_rheo_viscosity)
* [pair_style rheo](pair_rheo)
* [pair_style rheo/solid](pair_rheo_solid)
* https://www.lammps.org/movies.html#rheopackage
* `examples/rheo`

----------


## RIGID package

**Contents:**

Fixes which enforce rigid constraints on collections of atoms or
particles.  This includes SHAKE and RATTLE, as well as various
rigid-body integrators for a few large bodies or many small bodies.
Also several computes which calculate properties of rigid bodies.

**Supporting info:**

* `src/RIGID`: filenames -> commands
* [compute erotate/rigid](compute_erotate_rigid)
* [fix shake](fix_shake)
* [fix rattle](fix_shake)
* [fix rigid/\*](fix_rigid)
* `examples/ASPHERE`
* `examples/rigid`
* bench/in.rhodo
* https://www.lammps.org/movies.html#box
* https://www.lammps.org/movies.html#star

----------


## SCAFACOS package

**Contents:**

A KSpace style which wraps the [ScaFaCoS Coulomb solver library](http://www.scafacos.de/) to compute long-range Coulombic
interactions.

To use this package you must have the ScaFaCoS library available on
your system.

**Author:** Rene Halver (JSC) wrote the scafacos LAMMPS command.

ScaFaCoS itself was developed by a consortium of German research
facilities with a BMBF (German Ministry of Science and Education)
funded project in 2009-2012. Participants of the consortium were the
Universities of Bonn, Chemnitz, Stuttgart, and Wuppertal as well as
the Forschungszentrum Juelich.

**Install:**

This package has [specific installation instructions](#scafacos) on the [Build extras](Build_extras) page.
The SCAFACOS package requires that LAMMPS is build in [MPI parallel mode](#serial).

**Supporting info:**

* `src/SCAFACOS`: filenames -> commands
* `src/SCAFACOS/README`
* [kspace_style scafacos](kspace_style)
* [kspace_modify](kspace_modify)
* `examples/PACKAGES/scafacos`

----------


## SHOCK package

**Contents:**

Fixes for running impact simulations where a shock-wave passes through
a material.

**Supporting info:**

* `src/SHOCK`: filenames -> commands
* [fix append/atoms](fix_append_atoms)
* [fix msst](fix_msst)
* [fix nphug](fix_nphug)
* [fix wall/piston](fix_wall_piston)
* `examples/hugoniostat`
* `examples/msst`

----------


## SMTBQ package

**Contents:**

Pair styles which implement Second Moment Tight Binding models.
One with QEq charge equilibration (SMTBQ) for the description of
ionocovalent bonds in oxides, and two more as plain SMATB models.

**Authors:** SMTBQ: Nicolas Salles, Emile Maras, Olivier Politano, and Robert
Tetot (LAAS-CNRS, France);
SMATB: Daniele Rapetti (Politecnico di Torino)

**Supporting info:**

* `src/SMTBQ`: filenames -> commands
* `src/SMTBQ/README`
* [pair_style smtbq](pair_smtbq)
* [pair_style smatb](pair_smatb), [pair_style smatb/single](pair_smatb)
* `examples/PACKAGES/smtbq`

----------


## SPH package

**Contents:**

An atom style, fixes, computes, and several pair styles which
implements smoothed particle hydrodynamics (SPH) for liquids.  See the
related [MACHDYN package](#PKG-MACHDYN) package for smooth Mach dynamics
(SMD) for solids.

This package contains ideal gas, Lennard-Jones equation of states, Tait,
and full support for complete (i.e. internal-energy dependent) equations
of state.  It allows for plain or Monaghans XSPH integration of the
equations of motion.  It has options for density continuity or density
summation to propagate the density field.  It has [set](set)
command options to set the internal energy and density of particles from
the input script and allows the same quantities to be output with
thermodynamic output or to dump files via the [compute
property/atom](compute_property_atom) command.

**Author:** Georg Ganzenmuller (Fraunhofer-Institute for High-Speed
Dynamics, Ernst Mach Institute, Germany).

**Supporting info:**

* `src/SPH`: filenames -> commands
* `src/SPH/README`
* [doc/PDF/SPH_LAMMPS_userguide.pdf](PDF/SPH_LAMMPS_userguide.pdf)
* `examples/PACKAGES/sph`
* https://www.lammps.org/movies.html#sph


> **Note**
> Please note that the SPH PDF guide file has not been updated for
> many years and thus does not reflect the current *syntax* of the
> SPH package commands. For that please refer to the LAMMPS manual.


> **Note**
> Please also note, that the [RHEO package](#PKG-RHEO) offers
> similar functionality in a more modern and flexible implementation.

----------


## SPIN package

**Contents:**

Model atomic magnetic spins classically, coupled to atoms moving in
the usual manner via MD.  Various pair, fix, and compute styles.

**Author:** Julien Tranchida (Sandia).

**Supporting info:**

* `src/SPIN`: filenames -> commands
* [Howto spins](Howto_spins)
* [pair_style spin/dipole/cut](pair_spin_dipole)
* [pair_style spin/dipole/long](pair_spin_dipole)
* [pair_style spin/dmi](pair_spin_dmi)
* [pair_style spin/exchange](pair_spin_exchange)
* [pair_style spin/exchange/biquadratic](pair_spin_exchange)
* [pair_style spin/magelec](pair_spin_magelec)
* [pair_style spin/neel](pair_spin_neel)
* [fix nve/spin](fix_nve_spin)
* [fix langevin/spin](fix_langevin_spin)
* [fix precession/spin](fix_precession_spin)
* [compute spin](compute_spin)
* [neb/spin](neb_spin)
* `examples/SPIN`

----------


## SRD package

**Contents:**

A pair of fixes which implement the Stochastic Rotation Dynamics (SRD)
method for coarse-graining of a solvent, typically around large
colloidal particles.

**Supporting info:**

* `src/SRD`: filenames -> commands
* [fix srd](fix_srd)
* [fix wall/srd](fix_wall_srd)
* `examples/srd`
* `examples/ASPHERE`
* https://www.lammps.org/movies.html#tri
* https://www.lammps.org/movies.html#line
* https://www.lammps.org/movies.html#poly

----------


## TALLY package

**Contents:**

Several compute styles that can be called when pairwise interactions
are calculated to tally information (forces, heat flux, energy,
stress, etc) about individual interactions.

**Author:** Axel Kohlmeyer (Temple U).

**Supporting info:**

* `src/TALLY`: filenames -> commands
* `src/TALLY/README`
* [compute \*/tally](compute_tally)
* `examples/PACKAGES/tally`

----------


## UEF package

**Contents:**

A fix style for the integration of the equations of motion under
extensional flow with proper boundary conditions, as well as several
supporting compute styles and an output option.

**Author:** David Nicholson (MIT).

**Supporting info:**

* `src/UEF`: filenames -> commands
* `src/UEF/README`
* [fix nvt/uef](fix_nh_uef)
* [fix npt/uef](fix_nh_uef)
* [compute pressure/uef](compute_pressure_uef)
* [compute temp/uef](compute_temp_uef)
* [dump cfg/uef](dump_cfg_uef)
* `examples/uef`

----------


## VORONOI package

**Contents:**

A compute command which calculates the Voronoi tesselation of a
collection of atoms by wrapping the [Voro++ library](https://math.lbl.gov/voro++/).  This can be used to calculate the
local volume or each atoms or its near neighbors.

To use this package you must have the Voro++ library available on your
system.

**Author:** Daniel Schwen (INL) while at LANL.  The open-source Voro++
library was written by Chris Rycroft (Harvard U) while at UC Berkeley
and LBNL.

**Install:**

This package has [specific installation instructions](#voronoi) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/VORONOI`: filenames -> commands
* `src/VORONOI/README`
* `lib/voronoi/README`
* [compute voronoi/atom](compute_voronoi_atom)
* `examples/voronoi`

----------


## VTK package

**Contents:**

A [dump vtk](dump_vtk) command which outputs snapshot info in the
[VTK format](vtk_), enabling visualization by [Paraview](paraview_) or
other visualization packages.


To use this package you must have VTK library available on your
system.

**Authors:** Richard Berger (JKU) and Daniel Queteschiner (DCS Computing).

**Install:**

This package has [specific installation instructions](#vtk) on the [Build extras](Build_extras) page.

**Supporting info:**

* `src/VTK`: filenames -> commands
* `src/VTK/README`
* `lib/vtk/README`
* [dump vtk](dump_vtk)

----------


## YAFF package

**Contents:**

Some potentials that are also implemented in the Yet Another Force Field ([YAFF](yaff_)) code.
The expressions and their use are discussed in the following papers

* Vanduyfhuys et al., J. Comput. Chem., 36 (13), 1015-1027 (2015) [link](vanduyfhuys2015_)
* Vanduyfhuys et al., J. Comput. Chem., 39 (16), 999-1011 (2018) [link](vanduyfhuys2018_)

which discuss the [QuickFF](quickff_) methodology.


**Author:** Steven Vandenbrande.

*Added in version 1Feb2019*
**Supporting info:**

* `src/YAFF/README`
* [angle_style cross](angle_cross)
* [angle_style mm3](angle_mm3)
* [bond_style mm3](bond_mm3)
* [improper_style distharm](improper_distharm)
* [improper_style sqdistharm](improper_sqdistharm)
* [pair_style mm3/switch3/coulgauss/long](pair_lj_switch3_coulgauss_long)
* [pair_style lj/switch3/coulgauss/long](pair_lj_switch3_coulgauss_long)
* `examples/PACKAGES/yaff`
