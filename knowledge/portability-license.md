---
title: "Portability, License, and Installation"
description: "Compiler compatibility, open source license, installation on Linux/macOS/Windows"
category: "general"
tags: ["installation", "compilation", "license", "platform"]
commands: []
---
# 1.5.4 Compilers  

The most commonly used compilers are the GNU compilers, but also Clang and the Intel compilers have been successfully used on Linux, macOS, and Windows. Also, the Nvidia HPC SDK (formerly PGI compilers) will compile LAMMPS (tested on Linux).  

# 1.5.5 CPU architectures  

The primary CPU architecture for running LAMMPS is 64-bit $\mathrm{x}86$ , but also 32-bit $\mathrm{x}86$ , and 64-bit ARM and PowerPC (64-bit, Little Endian) are regularly tested.  

# 1.5.6 Portability compliance  

Only a subset of the LAMMPS source code is fully compliant to all of the above mentioned standards. This is rather typical for projects like LAMMPS that largely depend on contributions from the user community. Not all contributors are trained as programmers and not all of them have access to multiple platforms for testing. As part of the continuous integration process, however, all contributions are automatically tested to compile, link, and pass some runtime tests on a selection of Linux flavors, macOS, and Windows, and on Linux with different compilers. Thus portability issues are often found before a pull request is merged. Other platforms may be checked occasionally or when portability bugs are reported.  

# 1.6 LAMMPS open-source license  

# 1.6.1 GPL version of LAMMPS  

LAMMPS is an open-source code, available free-of-charge, and distributed under the terms of the GNU Public License Version 2 (GPLv2), which means you can use or modify the code however you wish for your own purposes, but have to adhere to certain rules when redistributing it - specifically in binary form - or are distributing software derived from it or that includes parts of it.  

LAMMPS comes with no warranty of any kind.  

As each source file states in its header, it is a copyrighted code, and thus not in the public domain. For more information about open-source software and open-source distribution, see www.gnu.org or www.opensource.org. The legal text of the GPL as it applies to LAMMPS is in the LICENSE file included in the LAMMPS distribution.  

Here is a more specific summary of what the GPL means for LAMMPS users:  

(1) Anyone is free to use, copy, modify, or extend LAMMPS in any way they choose, including for commercial purposes.  

(2) If you distribute a modified version of LAMMPS, it must remain open-source, meaning you are required to distribute all of it under the terms of the GPLv2. You should clearly annotate such a modified code as a derivative version of LAMMPS. This is best done by changing the name (example: LIGGGHTS is such a modified and extended version of LAMMPS).  

(3) If you release any code that includes or uses LAMMPS source code, then it must also be open-sourced, meaning you distribute it under the terms of the GPLv2. You may write code that interfaces LAMMPS to a differently licensed library. In that case the code that provides the interface must be licensed GPLv2, but not necessarily that library unless you are distributing binaries that require the library to run.  

(4) If you give LAMMPS files to someone else, the GPLv2 LICENSE file and source file headers (including the copyright and GPLv2 notices) should remain part of the code.  

# 1.6.2 LGPL version of LAMMPS  

We occasionally make stable LAMMPS releases available under the GNU Lesser Public License v2.1. This is on request only and with non-LGPL compliant files removed. This allows uses linking non-GPL compatible software with the (otherwise unmodified) LAMMPS library or loading it dynamically at runtime. Any modifications to the LAMMPS code however, even with the LGPL licensed version, must still be made available under the same open source terms as LAMMPS itself.  

# 1.7 Authors of LAMMPS  

The current core LAMMPS developers are listed here (grouped by seniority and sorted alphabetically by last name). You can email an individual developer with code related questions for their area of expertise, or send an email to all of them at this address: “developers at lammps.org”. General questions about LAMMPS should be posted in the LAMMPS forum on MatSci.  

<html><body><table><tr><td>Name</td><td>Affiliation</td><td>Email</td><td>Areas of expertise</td></tr><tr><td>Axel Kohlmeyer</td><td>Temple U</td><td>akohlmey at gmail.com</td><td>OpenMP,library interfaces,LAMMPS-GUI, GitHub. MatSci forum, code maintenance, testing, releases</td></tr><tr><td>Steve Plimpton</td><td>SNL (retired)</td><td>sjplimp at gmail.com</td><td>original author, MD kernels, parallel algorithms & scalability, code structure and design</td></tr><tr><td>Aidan Thompson</td><td>SNL</td><td>athomps at sandia.gov</td><td>manybody potentials, machine learned potentials, materials science, statistical mechanics</td></tr><tr><td>Richard Berger</td><td>LANL</td><td>richard.berger at outlook.com</td><td>Python, HPC, DevOps</td></tr><tr><td>Germain Clavier</td><td>U Caen</td><td>germain.clavier at unicaen.fr</td><td>organic molecules, polymers, mechanical properties, surfaces,integrators,coarse-graining</td></tr><tr><td>Joel Clemmer</td><td>SNL</td><td>jtclemm at sandia.gov</td><td>granular systems fuid/solid mechanics</td></tr><tr><td>Jacob R. Gissinger</td><td>StevensInstitute of Technology</td><td>jgissing at stevens.edu</td><td>reactive molecular dynamics, macro-molecular sys- tems, type labels</td></tr><tr><td>James Goff</td><td>SNL</td><td>jmgoff at sandia.gov</td><td>machine learned potentials, QEq solvers, Python</td></tr><tr><td>Meg McCarthy</td><td>SNL</td><td>megmcca at sandia.gov</td><td>alloys, micro-structure,machine learned potentials</td></tr><tr><td>Stan Moore</td><td>SNL</td><td>stamoor at sandia.gov</td><td>Kokkos, KSpace solvers, ReaxFF</td></tr><tr><td>Trung Nguyen</td><td>U Chicago</td><td>ndactrung at gmail.com</td><td>soft matter, GPU package, DIELECTRIC package, regression testing</td></tr></table></body></html>  

Past developers include Paul Crozier and Mark Stevens, both at SNL, and Ray Shan, now at Materials Design.  

The Authors page of the LAMMPS website has a comprehensive list of all the individuals who have contributed code for a new feature or command or tool to LAMMPS.  

The following folks deserve special recognition. Many of the packages they have written are unique for an MD code and LAMMPS would not be as general-purpose as it is without their expertise and efforts.  

• Metin Aktulga (MSU), REAXFF package for $\mathrm{C/C++}$ version of ReaxFF • Mike Brown (Intel), GPU and INTEL packages • Colin Denniston (U Western Ontario), LATBOLTZ package • Georg Ganzenmuller (EMI), MACHDYN and SPH packages • Andres Jaramillo-Botero (Caltech), EFF package for electron force field • Reese Jones (Sandia) and colleagues, ATC package for atom/continuum coupling  

• Christoph Kloss (DCS Computing), LIGGGHTS code for granular materials, built on top of LAMMPS   
• Rudra Mukherjee (JPL), POEMS package for articulated rigid body motion   
• Trung Ngyuen (U Chicago), GPU, RIGID, BODY, and DIELECTRIC packages   
• Mike Parks (Sandia), PERI package for Peridynamics   
• Roy Pollock (LLNL), Ewald and PPPM solvers   
• Julien Tranchida (CEA Cadarache), SPIN package   
• Christian Trott (Sandia), CUDA and KOKKOS packages   
• Ilya Valuev (JIHT), AWPMD package for wave packet MD   
• Greg Wagner (Northwestern U), MEAM package for MEAM potential  

As discussed on the History page of the website, LAMMPS originated as a cooperative project between DOE labs and industrial partners. Folks involved in the design and testing of the original version of LAMMPS were the following:  

• John Carpenter (Mayo Clinic, formerly at Cray Research)   
• Terry Stouch (Lexicon Pharmaceuticals, formerly at Bristol Myers Squibb)   
• Steve Lustig (Dupont)   
• Jim Belak and Roy Pollock (LLNL)  

# 1.8 Citing LAMMPS  

# 1.8.1 Core Algorithms  

The paper mentioned below is the best overview of LAMMPS, but there are also publications describing particular models or algorithms implemented in LAMMPS or complementary software that is has interfaces to. Please see below for how to cite contributions to LAMMPS.  

The latest canonical publication that describes the basic features, the source code design, the program structure, the spatial decomposition approach, the neighbor finding, basic communications algorithms, and how users and developers have contributed to LAMMPS is:  

LAMMPS - A flexible simulation tool for particle-based materials modeling at the atomic, meso, and continuum scales, Comp. Phys. Comm. 271, 108171 (2022)  

So a project using LAMMPS or a derivative application that uses LAMMPS as a simulation engine should cite this paper. The paper is expected to be published in its final form under the same DOI in the first half of 2022. Please also give the URL of the LAMMPS website in your paper, namely https://www.lammps.org.  

The original publication describing the parallel algorithms used in the initial versions of LAMMPS is:  

S. Plimpton, Fast Parallel Algorithms for Short-Range Molecular Dynamics, J Comp Phys, 117, 1-19 (1995).  

# 1.8.2 DOI for the LAMMPS source code  

The LAMMPS developers use the Zenodo service at CERN to create digital object identifiers (DOI) for stable releases of the LAMMPS source code. There are two types of DOIs for the LAMMPS source code.  

The canonical DOI for all versions of LAMMPS, which will always point to the latest stable release version, is:  

• DOI: 10.5281/zenodo.3726416  

In addition there are DOIs generated for individual stable releases:  

• 3 March 2020 version: DOI:10.5281/zenodo.3726417   
• 29 October 2020 version: DOI:10.5281/zenodo.4157471   
• 29 September 2021 version: DOI:10.5281/zenodo.6386596   
• 23 June 2022 version: DOI:10.5281/zenodo.10806836   
• 2 August 2023 version: DOI:10.5281/zenodo.10806852  

# 1.8.3 Home page  

The LAMMPS website at https://www.lammps.org/ is the canonical location for information about LAMMPS and its features.  

# 1.8.4 Citing contributions  

LAMMPS has many features that use either previously published methods and algorithms or novel features. It also includes potential parameter files for specific models. Where available, a reminder about references for optional features used in a specific run is printed to the screen and log file. Style and output location can be selected with the -cite command-line switch. Additional references are given in the documentation of the corresponding commands or in the Howto tutorials. Please make certain, that you provide the proper acknowledgments and citations in any published works using LAMMPS.  

# 1.9 Additional website links  

The LAMMPS website has a variety of additional info about LAMMPS, beyond what is in this manual. Some other useful resources available online are listed below.  

• LAMMPS source code repository on GitHub   
• LAMMPS forum on matsci.org   
• Recent bug fixes and new features   
• Download info   
• Glossary of terms relevant to LAMMPS   
• LAMMPS highlights with images   
• LAMMPS highlights with movies   
• Workshops   
• Tutorials   
• Pre- and post-processing tools for LAMMPS   
• Other software usable with LAMMPS   
• Viz tools usable with LAMMPS   
• Benchmark performance   
• Publications that have cited LAMMPS   
• Authors of LAMMPS   
• History of LAMMPS development   
• Funding for LAMMPS  

# INSTALL LAMMPS  

You can download LAMMPS as an executable or as source code.  

When downloading the LAMMPS source code, you also have to build LAMMPS. But you have more flexibility as to what features to include or exclude in the build. When you download and install pre-compiled LAMMPS executables, you are limited to install which version of LAMMPS is available and which features are included of these builds. If you plan to modify or extend LAMMPS, then you must build LAMMPS from the source code.  

![](images/6f3dbe9d75e8aa55ed06ff2c0d6700a4407fbaf84910c4c6e390c5c62c7d9ba8.jpg)  

# Note  

If you have questions about the pre-compiled LAMMPS executables, you need to contact the people preparing those executables. The LAMMPS developers have no control over their choices of how they configure and build their packages and when they update them.  

# 2.1 Download an executable for Linux  

Binaries are available for different versions of Linux:  

• Pre-built static Linux x86_64 executables   
• Pre-built Ubuntu and Debian Linux executables   
• Pre-built Fedora Linux executables   
• Pre-built EPEL Linux executables (RHEL, CentOS)   
• Pre-built OpenSuse Linux executables   
• Gentoo Linux executable   
• Arch Linux build-script  

# Note  

If you have questions about these pre-compiled LAMMPS executables, you need to contact the people preparing those packages. The LAMMPS developers have no control over how they configure and build their packages and when they update them. They may only provide packages for stable release versions and not always update the packages in a timely fashion after a new LAMMPS release is made.  

# 2.1.1 Pre-built static Linux x86_64 executables  

Pre-built LAMMPS executables for Linux, that are statically linked and compiled for 64-bit $\mathrm{x}86$ CPUs $\mathrm{\check{x}}86\_64$ or AMD64) are available for download at https://download.lammps.org/static/. Because of that static linkage (and unlike the Linux distribution specific packages listed below), they do not depend on any installed software and thus should run on any 64-bit $\mathrm{x}86$ machine with any Linux version.  

These executable include most of the available packages and multi-thread parallelization (via INTEL, KOKKOS, or OPENMP package). They are not compatible with MPI. Several of the LAMMPS tools executables (e.g. msi2lmp) are included as well. Because of the static linkage, there is no liblammps.so library file and thus also the LAMMPS python module, which depends on it, is not included.  

The compressed tar archives available for download have names following the pattern lammps-linux-x86_64- $\scriptscriptstyle<$ <version $>$ .tar.gz and will all unpack into a lammps-static folder. The executables are then in the lammps-static/bin/ folder. Since they do not depend on any other software, they may be freely moved or copied around.  

# 2.1.2 Pre-built Ubuntu and Debian Linux executables  

A pre-built LAMMPS executable, suitable for running on the latest Ubuntu and Debian Linux versions, can be downloaded as a Debian package. This allows you to install LAMMPS with a single command, and stay (mostly) up-to-date with the current stable version of LAMMPS by simply updating your operating system.  

To install LAMMPS do the following once:  

This downloads an executable named lmp to your box and multiple packages with supporting data, examples and libraries as well as any missing dependencies. For example, the LAMMPS binary in this package is built with the KIM package enabled, which results in the above command also installing the kim-api binaries when LAMMPS is installed, unless they were installed already. In order to use potentials from openkim.org, you can also install the openkim-models package:  

# 2.1.3 Pre-built Fedora Linux executables  

Pre-built LAMMPS packages for stable releases are available in the Fedora Linux distribution since Fedora version 28. The packages can be installed via the dnf package manager. There are 3 basic varieties (lammps $=$ no MPI, lammpsmpich $=$ MPICH MPI library, lammps-openmpi $=$ OpenMPI MPI library) and for each support for linking to the C library interface (lammps-devel, lammps-mpich-devel, lammps-openmpi-devel), the header for compiling programs using the C library interface (lammps-headers), and the LAMMPS python module for Python 3. All packages can be installed at the same time and the name of the LAMMPS executable is lmp and lmp_openmpi or lmp_mpich respectively. By default, lmp will refer to the serial executable, unless one of the MPI environment modules is loaded (module load mpi/mpich-x86_64 or module load mpi/openmpi-x86_64). Then the corresponding parallel LAMMPS executable can be used. The same mechanism applies when loading the LAMMPS python module.  

To install LAMMPS with OpenMPI and run an input in.lj with 2 CPUs do:  

<html><body><table><tr><td>dnf install lammps-openmpi</td></tr><tr><td>module load mpi/openmpi-x86. 64</td></tr><tr><td>mpirun -np 2 lmp -in in.lj</td></tr><tr><td></td></tr></table></body></html>  

The dnf install command is needed only once. In case of a new LAMMPS stable release, dnf update will automatically update to the newer version as soon as the RPM files are built and uploaded to the download mirrors. The module load command is needed once per (shell) session or shell terminal instance, unless it is automatically loaded from the shell profile.  

The LAMMPS binary is built with the KIM package which results in the above command also installing the kim-api binaries when LAMMPS is installed. In order to use potentials from openkim.org, you can install the openkim-models package  

dnf install openkim-models  

Please use lmp -help to see which compilation options, packages, and styles are included in the binary.  

Thanks to Christoph Junghans (LANL) for making LAMMPS available in Fedora.  

# 2.1.4 Pre-built EPEL Linux executable  

Pre-built LAMMPS (and KIM) packages for stable releases are available in the Extra Packages for Enterprise Linux (EPEL) repository for use with Red Hat Enterprise Linux (RHEL) or CentOS version 7.x and compatible Linux distributions. Names of packages, executable, and content are the same as described above for Fedora Linux. But RHEL/CentOS 7.x uses the yum package manager instead of dnf in Fedora 28.  

Please use lmp -help to see which compilation options, packages, and styles are included in the binary.  

Thanks to Christoph Junghans (LANL) for making LAMMPS available in EPEL.  

# 2.1.5 Pre-built OpenSuse Linux executable  

A pre-built LAMMPS package for stable releases is available in OpenSuse as of Leap 15.0. You can install the package with:  

Please use lmp -help to see which compilation options, packages, and styles are included in the binary.  

The LAMMPS binary is built with the KIM package which results in the above command also installing the kim-api binaries when LAMMPS is installed. In order to use potentials from openkim.org, you can install the openkim-models package  

Thanks to Christoph Junghans (LANL) for making LAMMPS available in OpenSuse.  

# 2.1.6 Gentoo Linux executable  

LAMMPS is part of Gentoo’s main package tree and can be installed by typing:  

Note that in Gentoo the LAMMPS source code is downloaded and the package is then compiled and installed on your machine.  

Certain LAMMPS packages can be enabled via USE flags, type  

for details.  

Thanks to Nicolas Bock and Christoph Junghans (LANL) for setting up this Gentoo capability.  

# 2.1.7 Archlinux build-script  

LAMMPS is available via Arch’s unofficial Arch User repository (AUR). There are three scripts available, named lammps, lammps-beta and lammps-git. They respectively package the stable, feature, and git releases.  

To install, you will need to have the git package installed. You may use any of the above names in-place of lammps.  

git clone https://aur.archlinux.org/lammps.git   
cd lammps   
makepkg -s   
makepkg -i  

To update LAMMPS, you may repeat the above, or change into the cloned directory, and execute the following, after which, if there are any changes, you may use makepkg as above.  

# 2.2 Download an executable for macOS  

LAMMPS can be downloaded, built, and configured for macOS with Homebrew. (Alternatively, see the installation instructions for downloading an executable via Conda.) The following LAMMPS packages are unavailable at this time because of additional requirements not yet met: GPU, KOKKOS, MSCG, POEMS, VORONOI.  

After installing Homebrew, you can install LAMMPS on your system with the following commands:  

This will install the executables “lammps_serial” and “lammps_mpi”, as well as the LAMMPS “doc”, “potentials”, “tools”, “bench”, and “examples” directories.  

Once LAMMPS is installed, you can test the installation with the Lennard-Jones benchmark file:  

The LAMMPS binary is built with the KIM package, which results in Homebrew also installing the kim-api binaries when LAMMPS is installed. In order to use potentials from openkim.org, you can install the openkim-models package  

If you have problems with the installation, you can post issues to this link.  

Thanks to Derek Thomas (derekt at cello.t.u-tokyo.ac.jp) for setting up the Homebrew capability.  

# 2.3 Download an executable for Windows  

Pre-compiled Windows installers which install LAMMPS executables on a Windows system can be downloaded from this site:  

https://packages.lammps.org/windows.html  

Note that each installer package has a date in its name, which corresponds to the LAMMPS version of the same date. Installers for current and older versions of LAMMPS are available. 32-bit and 64-bit installers are available, and each installer contains both a serial and parallel executable. The installer website also explains how to install the Windows MPI package (MPICH2 from Argonne National Labs), needed to run in parallel with MPI.  

The LAMMPS binaries contain all optional packages included in the source distribution except: ADIOS, H5MD, KIM, ML-PACE, ML-QUIP, MSCG, NETCDF, QMMM, SCAFACOS, and VTK. The serial version also does not include the LATBOLTZ package. The PYTHON package is only available in the Python installers that bundle a Python runtime. The GPU package is compiled for OpenCL with mixed precision kernels.  

The LAMMPS library is compiled as a shared library and the LAMMPS Python module is installed, so that it is possible to load LAMMPS into a Python interpreter.  

The installer site also has instructions on how to run LAMMPS under Windows, once it is installed, in both serial and parallel.  

When you download the installer package, you run it on your Windows machine. It will then prompt you with a dialog, where you can choose the installation directory, unpack and copy several executables, potential files, documentation PDFs, selected example files, etc. It will then update a few system settings (e.g. PATH, LAMMPS_POTENTIALS) and add an entry into the Start Menu (with references to the documentation, LAMMPS homepage and more). From that menu, there is also a link to an uninstaller that removes the files and undoes the environment manipulations.  

Note that to update to a newer version of LAMMPS, you should typically uninstall the version you currently have, download a new installer, and go through the installation procedure described above. I.e. the same procedure for installing/updating most Windows programs. You can install multiple versions of LAMMPS (in different directories), but only the executable for the last-installed package will be found automatically, so this should only be done for debugging purposes.  

# 2.4 Download an executable for Linux or macOS via Conda  

Pre-compiled LAMMPS binaries are available for macOS and Linux via the Conda package management system.  

First, one must set up the Conda package manager on your system. Follow the instructions to install Miniconda, then create a conda environment (named my-lammps-env or whatever you prefer) for your LAMMPS install:  

<html><body><table><tr><td>conda config --add channels conda-forge</td></tr><tr><td>conda create -n my-lammps-env</td></tr><tr><td></td></tr></table></body></html>  

Then, you can install LAMMPS on your system with the following command:  

<html><body><table><tr><td>conda activate my-lammps-env conda install lammps</td></tr></table></body></html>  

The LAMMPS binary is built with the KIM package, which results in Conda also installing the kim-api binaries when LAMMPS is installed. In order to use potentials from openkim.org, you can install the openkim-models package  

conda install openkim-models  

If you have problems with the installation, you can post issues to this link. Thanks to Jan Janssen (Max-Planck-Institut fuer Eisenforschung) for setting up the Conda capability.  

![](images/7c00f02d22805627f8e8eccec350c14285a8bce9d6946853daa586f76f2d2be0.jpg)  

# Note  

If you have questions about these pre-compiled LAMMPS executables, you need to contact the people preparing those packages. The LAMMPS developers have no control over their choices of how they configure and build their packages and when they update them.  

# 2.5 Download source and documentation as a tarball  

You can download a current LAMMPS tarball from the download page of the LAMMPS website or from GitHub (see below).  

You have two choices of tarballs, either the most recent stable release or the most recent feature release. Stable releases occur a few times per year, and undergo more testing before release. Also, between stable releases bug fixes from the feature releases are back-ported and the tarball occasionally updated. Feature releases occur every 4 to 8 weeks. The new contents in all feature releases are listed on the bug and feature page of the LAMMPS homepage.  

Tarballs of older LAMMPS versions can also be downloaded from this page.  

Tarballs downloaded from the LAMMPS homepage include the pre-translated LAMMPS documentation (HTML and PDF files) corresponding to that version.  

Once you have a tarball, uncompress and untar it with the following command:  

tar -xzvf lammps\*.tar.gz  

This will create a LAMMPS directory with the version date in its name, e.g. lammps-28Mar23.  

You can also download a compressed tar or zip archives from the “Assets” sections of the LAMMPS GitHub releases site. The file name will be lammps-<version>.zip which can be unzipped with the following command, to create a lammps-<version> directory:  

This version corresponds to the selected LAMMPS feature or stable release (as indicated by the matching git tag) and will only contain the source code and no pre-built documentation.  

# 2.6 Download the LAMMPS source with git  

LAMMPS development is coordinated through the “LAMMPS GitHub site”. If you clone the LAMMPS repository onto your local machine, it has several advantages:  

• You can stay current with changes to LAMMPS with a single git command.   
• You can create your own development branches to add code to LAMMPS.   
• You can submit your new features back to GitHub for inclusion in LAMMPS. For that, you should first create your own fork on GitHub, though.  

You must have git installed on your system to use the commands explained below to communicate with the git servers on GitHub. For people still using subversion (svn), GitHub also provides limited support for subversion clients.  

# Note  

As of October 2016, the official home of public LAMMPS development is on GitHub. The previously advertised LAMMPS git repositories on git.lammps.org and bitbucket.org are now offline or deprecated.  

You can follow the LAMMPS development on 4 different git branches:  

• develop $:$ this branch follows the ongoing development and is updated with every merge commit of a pull request   
• release [this branch is updated with every “feature release”;] updates are always “fast-forward” merges from develop   
• maintenance $:$ this branch collects back-ported bug fixes from the develop branch to the stable branch. It is used to update the stable branch for “stable update releases”.   
• stable $:$ this branch is updated from the release branch with every “stable release” version and also has selected bug fixes with every “update release” when the maintenance branch is merged into it  

To access the git repositories on your box, use the clone command to create a local copy of the LAMMPS repository with a command like:  

git clone -b release https://github.com/lammps/lammps.git mylammps where “mylammps” is the name of the directory you wish to create on your machine and “release” is one of the 3 branches listed above. (Note that you actually download all 3 branches; you can switch between them at any time using “git checkout <branch name>”.)  

# Saving time and disk space when using git clone  

The complete git history of the LAMMPS project is quite large because it contains the entire commit history of the project since fall 2006, which includes the time when LAMMPS was managed with subversion. This includes a few commits that have added and removed some large files (mostly by accident). If you do not need access to the entire commit history (most people don’t), you can speed up the “cloning” process and reduce local disk space requirements by using the --depth git command-line flag. That will create a “shallow clone” of the repository, which contains only a subset of the git history. Using a depth of 1000 is usually sufficient to include the head commits of the develop, the release, and the maintenance branches. To include the head commit of the stable branch you may need a depth of up to 10000. If you later need more of the git history, you can always convert the shallow clone into a “full clone”.  

Once the command completes, your directory will contain the same files as if you unpacked a current LAMMPS tarball, with the exception, that the HTML documentation files are not included. They can be generated from the content provided in doc/src by typing make html from the doc directory.  

After initial cloning, as bug fixes and new features are added to LAMMPS you can stay up-to-date by typing the following git commands from within the “mylammps” directory:  

git checkout release # not needed if you always stay in this branch   
git checkout stable # use one of these 4 checkout commands   
git checkout develop # to choose the branch to follow   
git checkout maintenance   
git pull  

Doing a “pull” will not change any files you have added to the LAMMPS directory structure. It will also not change any existing LAMMPS files you have edited, unless those files have changed in the repository. In that case, git will attempt to merge the changes from the repository file with your version of the file and tell you if there are any conflicts. See the git documentation for details.  

If you want to access a particular previous release version of LAMMPS, you can instead “check out” any version with a published tag. See the output of git tag -l for the list of tags. The git command to do this is as follows.  

git checkout tagID  

Stable versions and what tagID to use for a particular stable version are discussed on this page. Note that this command will print some warnings, because in order to get back to the latest revision and to be able to update with git pull again, you will need to do git checkout release (or check out any other desired branch) first.  

Once you have updated your local files with a git pull (or git checkout), you still need to re-build LAMMPS if any source files have changed. How to do this depends on the build system you are using.  

<html><body><table><tr><td>CMakebuild</td></tr><tr><td>Change to your build folder and type:</td></tr><tr><td>cmake --build.</td></tr><tr><td>CMake should auto-detect whether it needs to re-run the CMake configuration step and otherwise redo the build for all files that have been changed or files that depend on changed files. In case some build</td></tr><tr><td>options have been changed or renamed, you may have to update those by running:</td></tr><tr><td></td></tr><tr><td>cmake.</td></tr><tr><td></td></tr></table></body></html>  

# Traditional make  

Switch to the src directory and type:  

make purge # remove any deprecated src files make package-update # sync package files with src files make foo # re-build for your machine (mpi, serial, etc)  

to enforce consistency of the source between the src folder and package directories. This is OK to do even if you don’t use any packages. The make purge command removes any deprecated src files if they were removed by the update from a package subdirectory.  

![](images/d7bc2df262474b3611c29897bd2245060de1ec7d08ff101751d47fcd0add1406.jpg)  

# Warning  

If you wish to edit/change a src file that is from a package, you should edit the version of the file inside the package subdirectory with src, then re-install the package. The version in the source directory is merely a copy and will be wiped out if you type “make package-update”.  

![](images/bd6d2e111a6fa1d66f2ac802e9374681ed8f534b08ff1d529da3808664b3e3d9.jpg)  

# Git protocols  

The servers at github.com support the “https” access protocol for anonymous, read-only access. If you have a suitably configured GitHub account, you may also use SSH protocol with the URL git@github.com:lammps/ lammps.git.  

The LAMMPS GitHub project is currently overseen by Axel Kohlmeyer (Temple U, akohlmey at gmail.com).  

These are the files and subdirectories in the LAMMPS distribution:  

<html><body><table><tr><td>README</td><td>Short description of the LAMMPS package</td></tr><tr><td>LICENSE</td><td>GNU General Public License (GPL)</td></tr><tr><td>SECURITY.md</td><td>Security policy for the LAMMPS package</td></tr><tr><td>bench</td><td>benchmark inputs</td></tr><tr><td>cmake</td><td>CMake build files</td></tr><tr><td>doc</td><td>documentation and tools to build the manual</td></tr><tr><td>examples</td><td>exampleinput files</td></tr><tr><td>fortran</td><td>Fortran module for LAMMPS library interface</td></tr><tr><td>lib</td><td>additional provided or external libraries</td></tr><tr><td>potentials</td><td>selected interatomic potential files</td></tr><tr><td>python</td><td>Pythonmodulefor LAMMPSlibraryinterface</td></tr><tr><td>src</td><td>LAMMPSsourcefiles</td></tr><tr><td>tools</td><td>pre- and post-processing tools</td></tr><tr><td>unittest</td><td>source code and inputs for testing LAMMPS</td></tr></table></body></html>  

You will have all of these if you downloaded the LAMMPS source code. You will have only some of them if you downloaded executables, as explained on the pages listed above.  

# BUILD LAMMPS  

LAMMPS is built as a library and an executable from source code using a build environment generated by CMake (Unix Makefiles, Ninja, Xcode, Visual Studio, KDevelop, CodeBlocks and more depending on the platform). Using CMake is the preferred way to build LAMMPS. In addition, LAMMPS can be compiled using the legacy build system based on traditional makefiles for use with GNU make (which may require manual editing). Support for the legacy build system is slowly being phased out and may not be available for all optional features.  

As an alternative, you can download a package with pre-built executables or automated build trees, as described in the Install section of the manual.  

# 3.1 Build LAMMPS with CMake  

This page describes how to use CMake in general to build LAMMPS. Details for specific compile time settings and options to enable and configure add-on packages are discussed with those packages. Links to those pages on the Build overview page.  

The following text assumes some familiarity with CMake and focuses on using the command-line tool cmake and what settings are supported for building LAMMPS. A more detailed tutorial on how to use CMake itself, the text mode or graphical user interface, to change the generated output files for different build tools and development environments is on a separate page.  

![](images/6ca101f94c8670e47a0c8e9e81007e58c105deb0cf92eba53dcdf4d724709547.jpg)  

# Note  

LAMMPS currently requires that CMake version 3.20 or later is available.  

![](images/ac6cacb023a00a3e9571a62c0fa1c865eeb6d1b2785c36e4facc697d171a6453.jpg)  

# Warning  

You must not mix the traditional make based LAMMPS build procedure with using CMake. No packages may be installed or a build been previously attempted in the LAMMPS source directory by using make <machine>. CMake will detect if this is the case and generate an error. To remove conflicting files from the src you can use the command make no-all purge which will uninstall all packages and delete all auto-generated files.  

# 3.1.1 Advantages of using CMake  

CMake is the preferred way of compiling LAMMPS in contrast to the legacy build system based on GNU make and through (manually customized) makefiles. Using CMake has multiple advantages that are specifically helpful for people with limited experience in compiling software or for people that want to modify or extend LAMMPS.  

• CMake can detect available hardware, tools, features, and libraries and adapt the LAMMPS default build configuration accordingly.  

• CMake can generate files for different build tools and integrated development environments (IDE).   
• CMake supports customization of settings with a command-line, text mode, or graphical user interface. No manual editing of files, knowledge of file formats or complex command-line syntax is required.   
• All enabled components are compiled in a single build operation.   
• Automated dependency tracking for all files and configuration options.   
• Support for true out-of-source compilation. Multiple configurations and settings with different choices of   
LAMMPS packages, settings, or compilers can be configured and built concurrently from the same source tree.   
• Simplified packaging of LAMMPS for Linux distributions, environment modules, or automated build tools like Homebrew.   
• Integration of automated unit and regression testing (the LAMMPS side of this is still under active development).  

# 3.1.2 Getting started  

Building LAMMPS with CMake is a two-step process. In the first step, you use CMake to generate a build environment in a new directory. For that purpose you can use either the command-line utility cmake (or cmake3), the text-mode UI utility ccmake (or ccmake3) or the graphical utility cmake-gui, or use them interchangeably. The second step is then the compilation and linking of all objects, libraries, and executables using the selected build tool. Here is a minimal example using the command-line version of CMake to build LAMMPS with no add-on packages enabled and no customization:  

<html><body><table><tr><td>cd lammps</td><td>change eto the LAMMPSc distribution directory</td></tr><tr><td>mkdir build; cd build</td><td>create and use a build directory</td></tr><tr><td>cmake .. cmake</td><td>configuration reading CMake scripts from cmake</td></tr><tr><td>cmake e --build</td><td>compilation (or type make")</td></tr></table></body></html>  

This will create and change into a folder called build, then run the configuration step to generate build files for the default build command and then launch that build command to compile LAMMPS. During the configuration step CMake will try to detect whether support for MPI, OpenMP, FFTW, gzip, JPEG, PNG, and ffmpeg are available and enable the corresponding configuration settings. The progress of this configuration can be followed on the screen and a summary of selected options and settings will be printed at the end. The cmake --build . command will launch the compilation, which, if successful, will ultimately produce a library liblammps.a and the LAMMPS executable lmp inside the build folder.  

Compilation can take a long time, since LAMMPS is a large project with many features. If your machine has multiple CPU cores (most do these days), you can speed this up by compiling sources in parallel with make $-\mathrm{j}\mathrm{~N~}$ (with N being the maximum number of concurrently executed tasks). Installation of the ccache $\mathrm{\check{\rho}}=$ Compiler Cache) software may speed up repeated compilation even more, e.g. during code development, especially when repeatedly switching between branches.  

After the initial build, whenever you edit LAMMPS source files, enable or disable packages, change compiler flags or build options, you must re-compile and relink the LAMMPS executable with cmake --build . (or make). If the compilation fails for some reason, try running cmake . and then compile again. The included dependency tracking should make certain that only the necessary subset of files is re-compiled. You can also delete compiled objects, libraries, and executables with cmake --build . --target clean (or make clean).  

After compilation, you may optionally install the LAMMPS executable into your system with:  

make install # optional, copy compiled files into installation location  

This will install the LAMMPS executable and library, some tools (if configured) and additional files like LAMMPS API headers, manpages, potential and force field files. The location of the installation tree defaults to $\Phi\{\mathrm{HOME}\},$ /.local.  

# 3.1.3 Configuration and build options  

The CMake commands have one mandatory argument: a folder containing a file called CMakeLists.txt (for LAMMPS it is located in the cmake folder) or a build folder containing a file called CMakeCache.txt, which is generated at the end of the CMake configuration step. The cache file contains all current CMake settings.  

To modify settings, enable or disable features, you need to set variables with either the -D command-line flag (-D VARIABLE1_NAME $=$ value) or change them in the text mode of the graphical user interface. The -D flag can be used several times in one command.  

For your convenience, we provide CMake presets that combine multiple settings to enable optional LAMMPS packages or use a different compiler tool chain. Those are loaded with the -C flag (-C ../cmake/presets/basic.cmake). This step would only be needed once, as the settings from the preset files are stored in the CMakeCache.txt file. It is also possible to customize the build by adding one or more -D flags to the CMake command.  

Generating files for alternate build tools (e.g. Ninja) and project files for IDEs like Eclipse, CodeBlocks, or Kate can be selected using the -G command-line flag. A list of available generator settings for your specific CMake version is given when running cmake --help.  

# 3.1.4 Multi-configuration build systems  

Throughout this manual, it is mostly assumed that LAMMPS is being built on a Unix-like operating system with “make” as the underlying “builder”, since this is the most common case. In this case the build “configuration” is chose using -D CMAKE_BUILD_TYPE $=<$ <configuration $>$ with $<$ <configuration $>$ being one of “Release”, “Debug”, “RelWithDebInfo”, or “MinSizeRel”. Some build tools, however, can also use or even require having a so-called multiconfiguration build system setup. For a multi-configuration build, the built type (or configuration) is selected at compile time using the same build files. E.g. with:  

cmake --build build-multi --config Release  

In that case the resulting binaries are not in the build folder directly but in subdirectories corresponding to the build type (i.e. Release in the example from above). Similarly, for running unit tests the configuration is selected with the -C flag:  

Most Linux distributions offer pre-compiled cmake packages through their package management system. If you do not have CMake or a recent enough version (Note: for CentOS 7.x you need to enable the EPEL repository), you can download the latest version from https://cmake.org/download/. Instructions on how to install it on various platforms can be found on this page.  

# 3.2 Build LAMMPS with make  

Building LAMMPS with traditional makefiles requires that you have a Makefile. $<$ machine $>$ file appropriate for your system in either the src/MAKE, src/MAKE/MACHINES, src/MAKE/OPTIONS, or src/MAKE/MINE directory (see below). It can include various options for customizing your LAMMPS build with a number of global compilation options and features.  

This build system is slowly being phased out and may not support all optional features and packages in LAMMPS. It is recommended to switch to the CMake based build system.  

# 3.2.1 Requirements  

Those makefiles are written for and tested with GNU make and may not be compatible with other make programs. In most cases, if the “make” program is not GNU make, then there will be a GNU make program available under the name “gmake”. If GNU make or a compatible make is not available, you may have to first install it or switch to building with CMake. The makefiles of the traditional make based build process and the scripts they are calling expect a few additional tools to be available and functioning.  

• A working $\mathrm{C/C++}$ compiler toolchain supporting the $\mathrm{C}{+}{+}11$ standard; on Linux, these are often the GNU compilers. Some older compiler versions require adding flags like -std $=\mathbf{c}++11$ to enable the $\mathrm{C}{+}{+}11$ mode.   
• A Bourne shell compatible “Unix” shell program (frequently this is bash)   
• A few shell utilities: ls, mv, ln, rm, grep, sed, tr, cat, touch, diff, dirname   
• Python (optional, required for make lib- $\mathrm{<pkg>}$ in the src folder). Python scripts are currently tested with python 2.7 and 3.6 to 3.11. The procedure for building the documentation requires Python 3.5 or later.  

# 3.2.2 Getting started  

To include LAMMPS packages (i.e. optional commands and styles) you must enable (or “install”) them first, as discussed on the Build package page. If a package requires (provided or external) libraries, you must configure and build those libraries before building LAMMPS itself and especially before enabling such a package with make yes- $<$ <package $>$ . Building LAMMPS with CMake can automate much of this for many types of machines, especially workstations, desktops, and laptops, so we suggest you try it first when building LAMMPS in those cases.  

The commands below perform a default LAMMPS build, producing the LAMMPS executable lmp_serial and lmp_mpi in lammps/src:  

<html><body><table><tr><td>cd lammps/src</td><td>c  # change to main LAMMPS source folder</td></tr><tr><td>make serial</td><td># build a serial LAMMPS executable using GNU g++</td></tr><tr><td>make mpi build a parallel LAMMPS</td><td>SexecutablewithMPI</td></tr><tr><td></td><td></td></tr><tr><td>make</td><td>see a variety of make options</td></tr></table></body></html>  

Compilation can take a long time, since LAMMPS is a large project with many features. If your machine has multiple CPU cores (most do these days), you can speed this up by compiling sources in parallel with make $-\mathrm{j}\mathrm{~N~}$ (with $\mathbf{N}$ being the maximum number of concurrently executed tasks). Installation of the ccache $\mathbf{\check{\rho}}=$ Compiler Cache) software may speed up repeated compilation even more, e.g. during code development, especially when repeatedly switching between branches.  

After the initial build, whenever you edit LAMMPS source files, or add or remove new files to the source directory (e.g. by installing or uninstalling packages), you must re-compile and relink the LAMMPS executable with the same make <machine $>$ command. The makefile’s dependency tracking should ensure that only the necessary subset of files is re-compiled. If you change settings in the makefile, you have to recompile everything. To delete all objects, you can use make clean- $\scriptscriptstyle<$ <machine $>$ .  

# Note  

Before the actual compilation starts, LAMMPS will perform several steps to collect information from the configuration and setup that is then embedded into the executable. When you build LAMMPS for the first time, it will also compile a tool to quickly determine a list of dependencies. Those are required for the make program to correctly detect, which files need to be recompiled or relinked after changes were made to the sources.  

# 3.2.3 Customized builds and alternate makefiles  

The src/MAKE directory tree contains the Makefile. $<$ machine $\mid>$ files included in the LAMMPS distribution. Typing make example uses Makefile.example from one of those folders, if available. The make serial and make mpi lines above, for example, use src/MAKE/Makefile.serial and src/MAKE/Makefile.mpi, respectively. Other makefiles are in these directories:  

<html><body><table><tr><td>OPTIONS</td><td> Makefiles which enable specific options</td></tr><tr><td>MACHINES</td><td>Makefiles for specific machines</td></tr><tr><td>MINE</td><td>customized Makefiles you create (you may need to create this folder)</td></tr></table></body></html>  

Simply typing make lists all the available Makefile. $<$ machine $>$ files with a single line description toward the end of the output. A file with the same name can appear in multiple folders (not a good idea). The order the directories are searched is as follows: src/MAKE/MINE, src/MAKE, src/MAKE/OPTIONS, src/MAKE/MACHINES. This gives preference to a customized file you put in src/MAKE/MINE. If you create your own custom makefile under a new name, please edit the first line with the description and machine name, so you will not confuse yourself, when looking at the machine summary.  

Makefiles you may wish to try out, include those listed below (some require a package first be installed). Many of these include specific compiler flags for optimized performance. Please note, however, that some of these customized machine Makefile are contributed by users, and thus may have modifications specific to the systems of those users. Since compilers, OS configurations, and LAMMPS itself keep changing, their settings may become outdated, too:  

make mac # build serial LAMMPS on macOS make mac_mpi # build parallel LAMMPS on macOS make intel_cpu # build with the INTEL package optimized for CPUs make knl # build with the INTEL package optimized for KNLs make opt # build with the OPT package optimized for CPUs make omp # build with the OPENMP package optimized for OpenMP make kokkos_omp # build with the KOKKOS package for OpenMP make kokkos_cuda_mpi # build with the KOKKOS package for GPUs make kokkos_phi # build with the KOKKOS package for KNLs  

# 3.3 Link LAMMPS as a library to another code  

LAMMPS is designed as a library of $\mathrm{C}{+}{+}$ objects that can be integrated into other applications, including Python scripts. The files src/library.cpp and src/library.h define a C-style API for using LAMMPS as a library. See the Library interface to LAMMPS page for a description of the interface and how to use it for your needs.  

The Basic build options page explains how to build LAMMPS as either a shared or static library. This results in a file in the compilation folder called liblammps.a or liblammps_<name>.a in case of building a static library. In case of a  

shared library, the name is the same only that the suffix is going to be either .so or .dylib or .dll instead of .a depending on the OS. In some cases, the .so file may be a symbolic link to a file with the suffix .so.0 (or some other number).  

![](images/950e4b1ea4f504f362ea341b3ffe4348ba008680164df6b1afd9a6e5da54c187.jpg)  

# Note  

Care should be taken to use the same MPI library for the calling code and the LAMMPS library, unless LAMMPS is to be compiled without (real) MPI support using the included STUBS MPI library.  

# 3.3.1 Link with LAMMPS as a static library  

The calling application can link to LAMMPS as a static library with compilation and link commands, as in the examples shown below. These are examples for a code written in C in the file caller.c. The benefit of linking to a static library is, that the resulting executable is independent of that library since all required executable code from the library is copied into the calling executable.  

# CMake build  

This assumes that LAMMPS has been configured without setting a LAMMPS_MACHINE name, installed with make install, and the PKG_CONFIG_PATH environment variable has been updated to include the liblammps.pc file installed into the configured destination folder. The commands to compile and link a coupled executable are then:  

mpicc -c -O \$(pkg-config --cflags liblammps) caller.c mpicxx -o caller caller.o - $-\$1$ (pkg-config --libs liblammps)  

# Traditional make  

This assumes that LAMMPS has been compiled in the folder $\S\{\mathrm{HOME}\}$ /lammps/src with “make mpi”. The commands to compile and link a coupled executable are then:  

mpicc -c -O -I\${HOME}/lammps/src caller.c mpicxx -o caller caller.o -L\${HOME}/lammps/src -llammps_mpi  

The -I argument is the path to the location of the library.h header file containing the interface to the LAMMPS C-style library interface. The -L argument is the path to where the liblammps_mpi. a file is located. The -llammps_mpi argument is shorthand for telling the compiler to link the file liblammps_mpi.a. If LAMMPS has been built as a shared library, then the linker will use liblammps_mpi.so instead. If both files are available, the linker will usually prefer the shared library. In case of a shared library, you may need to update the LD_LIBRARY_PATH environment variable or running the caller executable will fail since it cannot find the shared library at runtime.  

However, it is only as simple as shown above for the case of a plain LAMMPS library without any optional packages that depend on libraries (bundled or external) or when using a shared library. Otherwise, you need to include all flags, libraries, and paths for the coupled executable, that are also required to link the LAMMPS executable.  

# CMake build  

When using CMake, additional libraries with sources in the lib folder are built, but not included in liblammps.a and (currently) not installed with make install and not included in the pkgconfig configuration file. They can be found in the top level build folder, but you have to determine the necessary  

link flags manually. It is therefore recommended to either use the traditional make procedure to build and link with a static library or build and link with a shared library instead.  

# Traditional make  

After you have compiled a static LAMMPS library using the conventional build system for example with “make mode $=$ static serial”. And you also have installed the POEMS package after building its bundled library in lib/poems. Then the commands to build and link the coupled executable change to:  

gcc -c -O -I\${HOME}/lammps/src -caller.c  
$\mathrm{g}{+}+$ -o caller caller.o -L\${HOME}/lammps/lib/poems-L\${HOME}/lammps/src/STUBS -L\${HOME}/lammps/src-llammps_serial -lpoems -lmpi_stubs  

Note, that you need to link with $\mathrm{g}{+}+$ instead of gcc even if you have written your code in C, since LAMMPS itself is $\mathrm{C}{+}{+}$ code. You can display the currently applied settings for building LAMMPS for the “serial” machine target by using the command:  

<html><body><table><tr><td>make mode=print serial</td></tr></table></body></html>  

Which should output something like:  

# Compiler:   
CXX=g++   
# Linker:   
LD=g++   
# Compilation:   
CXXFLAGS=-g -O3 -DLAMMPS_GZIP -DLAMMPS_MEMALIGN=64 -I\${HOME}   
,→compile/lammps/lib/poems -I\${HOME}/compile/lammps/src/STUBS   
# Linking:   
LDFLAGS=-g -O   
# Libraries:   
LDLIBS $=$ -L\${HOME}/compile/lammps/src -llammps_serial -L\${HOME}/compile/   
,→lammps/lib/poems -L\${HOME}/compile/lammps/src/STUBS -lpoems -lmpi_stubs  

From this you can gather the necessary paths and flags. With makefiles for other machine configurations you need to do the equivalent and replace “serial” with the corresponding “machine” name of the makefile.  

# 3.3.2 Link with LAMMPS as a shared library  

When linking to LAMMPS built as a shared library, the situation becomes much simpler, as all dependent libraries and objects are either included in the shared library or registered as a dependent library in the shared library file. Thus, those libraries need not be specified when linking the calling executable. Only the -I flags are needed. So the example case from above of the serial version static LAMMPS library with the POEMS package installed becomes:  

# CMake build  

The commands with a shared LAMMPS library compiled with the CMake build process are the same as for the static library.  

mpicc -c -O \$(pkg-config --cflags liblammps) caller.c mpicxx -o caller caller.o -\$(pkg-config --libs liblammps)  

# Traditional make  

The commands with a shared LAMMPS library compiled with the traditional make build using make mode $:=$ shared serial becomes:  

gcc -c -O -I\${HOME}/lammps/src -caller.c $\mathrm{g}{+}+$ -o caller caller.o -L\${HOME}/lammps/src -llammps_serial  

# Locating liblammps.so at runtime  

Unlike with a static link, now the liblammps.so file is required at runtime and needs to be in a folder, where the shared linker program of the operating system can find it. This would be either a folder like /usr/local/lib64 or $\Phi\{\mathrm{HOME}\}/\$ .local/lib64 or a folder pointed to by the LD_LIBRARY_PATH environment variable. You can type  

# printenv LD_LIBRARY_PATH  

to see what directories are in that list.  

Or you can add the LAMMPS src directory or the directory you performed a CMake style build in to your LD_LIBRARY_PATH environment variable, so that the current version of the shared library is always available to programs that use it.  

For the Bourne or Korn shells (/bin/sh, /bin/ksh, /bin/bash etc.), you would add something like this to your $\Phi\{\mathrm{HOME}\}/\$ .profile file:  

For the csh or tcsh shells, you would equivalently add something like this to your $\Phi\{\mathrm{HOME}\},$ /.cshrc file:  

setenv LD_LIBRARY_PATH \${LD_LIBRARY_PATH}:\${HOME}/lammps/src  

You can verify whether all required shared libraries are found with the ldd tool. Example:  

_LIBRARY_PATH=/home/user/lammps/src ldd caller   
linux-vdso.so.1 (0x00007ffe729e0000)   
liblammps.so $=>$ /home/user/lammps/src/liblammps.so (0x00007fc91bb9e000)   
libstdc $++.80.6=>$ /lib64/libstdc++.so.6 (0x00007fc91b984000)   
libm.so. $6=>$ /lib64/libm.so.6 (0x00007fc91b83e000)   
libgcc_s.so. $1=>$ /lib64/libgcc_s.so.1 (0x00007fc91b824000)   
libc.so. $6=>$ /lib64/libc.so.6 (0x00007fc91b65b000)   
/lib64/ld-linux-x86-64.so.2 (0x00007fc91c094000)  

If a required library is missing, you would get a ‘not found’ entry:  

# ldd caller  

linux-vdso.so.1 (0x00007ffd672fe000)   
liblammps.so $=>$ not found   
libstdc++.so.6 => /usr/lib64/libstdc++.so.6 (0x00007fb7c7e86000)   
libm.so.6 => /usr/lib64/libm.so.6 (0x00007fb7c7d40000)   
libgcc_s.so. $1=>$ /usr/lib64/libgcc_s.so.1 (0x00007fb7c7d26000)  

(continues on next page)  

(continued from previous page)  

libc.so.6 => /usr/lib64/libc.so.6 (0x00007fb7c7b5d000) /lib64/ld-linux-x86-64.so.2 (0x00007fb7c80a2000)  

# 3.4 Basic build options  

The following topics are covered on this page, for building with both CMake and make:  

• Serial vs parallel build • Choice of compiler and compile/link options • Build the LAMMPS executable and library • Including and removing debug support • Install LAMMPS after a build  

# 3.4.1 Serial vs parallel build  

LAMMPS is written to use the ubiquitous MPI (Message Passing Interface) library API for distributed memory parallel computation. You need to have such a library installed for building and running LAMMPS in parallel using a domain decomposition parallelization. It is compatible with the MPI standard version 2.x and later. LAMMPS can also be built into a “serial” executable for use with a single processor using the bundled MPI STUBS library.  

Independent of the distributed memory MPI parallelization, parts of LAMMPS are also written with support for shared memory parallelization using the OpenMP threading standard. A more detailed discussion of that is below.  

# CMake build  

-D BUILD_MPI=value # yes or no, default is yes if CMake finds MPI   
-D BUILD_OMP=value # yes or no, default is yes if a compatible # compiler is detected   
-D LAMMPS_MACHINE=name # name = mpi, serial, mybox, titan, laptop, etc # no default value  

The executable created by CMake (after running make) is named lmp unless the LAMMPS_MACHINE option is set. When setting LAMMPS_MACHINE ${\bf\Pi}={\bf\Pi}^{-}.$ name, the executable will be called lmp_name. Using BUILD_MPI $=$ no will enforce building a serial executable using the MPI STUBS library.  

![](images/c4381b3ff2ad5b89d80725e36c8bd4dcfbbd0c2f9f69f0823d1862ae593b2dfa.jpg)  

# Traditional make  

The build with traditional makefiles has to be done inside the source folder src.  

make mpi # parallel build, produces lmp_mpi using Makefile.mpi make serial # serial build, produces lmp_serial using Makefile/serial make mybox # uses Makefile.mybox to produce lmp_mybox  

Any make machine command will look up the make settings from a file Makefile.machine in the folder src/MAKE or one of its subdirectories MINE, MACHINES, or OPTIONS, create a folder Obj_machine with all objects and generated files and an executable called lmp_machine. The standard parallel build with make mpi assumes a standard MPI installation with MPI compiler wrappers where all necessary compiler and linker flags to get access and link with the suitable MPI headers and libraries are set by the wrapper programs. For other cases or the serial build, you have to adjust the make file variables MPI_INC, MPI_PATH, MPI_LIB as well as CC and LINK. To enable OpenMP threading usually a compiler specific flag needs to be added to the compile and link commands. For the GNU compilers, this is -fopenmp, which can be added to the CC and LINK makefile variables.  

For the serial build the following make variables are set (see src/MAKE/Makefile.serial):  

CC = g++   
LINK = g++   
MPI_INC = -I../STUBS MPI_PATH = -L../STUBS MPI_LIB $=$ -lmpi_stubs  

You also need to build the STUBS library for your platform before making LAMMPS itself. A make serial build does this for you automatically, otherwise, type make mpi-stubs from the src directory, or make from the src/STUBS dir. If the build fails, you may need to edit the STUBS/Makefile for your platform. The stubs library does not provide MPI/IO functions required by some LAMMPS packages, e.g. LATBOLTZ, and thus is not compatible with those packages.  

#  Note  

The file src/STUBS/mpi.cpp provides a CPU timer function called MPI_Wtime() that calls gettimeofday(). If your operating system does not support gettimeofday(), you will need to insert code to call another timer. Note that the ANSI-standard function clock() rolls over after an hour or so, and is therefore insufficient for timing long LAMMPS simulations.  

# MPI and OpenMP support in LAMMPS  

If you are installing MPI yourself to build a parallel LAMMPS executable, we recommend either MPICH or OpenMPI, which are regularly used and tested with LAMMPS by the LAMMPS developers. MPICH can be downloaded from the MPICH home page, and OpenMPI can be downloaded correspondingly from the OpenMPI home page. Other MPI packages should also work. No specific vendor provided and standard compliant MPI library is currently known to be incompatible with LAMMPS. If you are running on a large parallel machine, your system admins or the vendor should have already installed a version of MPI, which is likely to be faster than a self-installed MPICH or OpenMPI, so you should study the provided documentation to find out how to build and link with it.  

The majority of OpenMP (threading) support in LAMMPS is provided by the OPENMP package; see the OPENMP package page for details. The INTEL package also includes OpenMP threading (it is compatible with OPENMP and will usually fall back on styles from that package, if a INTEL does not exist) and adds vectorization support when compiled with compatible compilers, in particular the Intel compilers on top of OpenMP. Also, the KOKKOS package can be compiled to include OpenMP threading.  

In addition, there are a few commands in LAMMPS that have native OpenMP support included as well. These are commands in the ML-SNAP, DIFFRACTION, and DPD-REACT packages. Furthermore, some packages support OpenMP threading indirectly through the libraries they interface to: e.g. KSPACE, and COLVARS. See the Packages details page for more info on these packages, and the pages for their respective commands for OpenMP threading info.  

For CMake, if you use BUILD_OMP $=$ yes, you can use these packages and turn on their native OpenMP support and turn on their native OpenMP support at run time, by setting the OMP_NUM_THREADS environment variable before you launch LAMMPS.  

For building via conventional make, the CCFLAGS and LINKFLAGS variables in Makefile.machine need to include the compiler flag that enables OpenMP. For the GNU compilers or Clang, it is -fopenmp. For (recent) Intel compilers, it is -qopenmp. If you are using a different compiler, please refer to its documentation.  

# OpenMP Compiler compatibility  

Some compilers do not fully support the default(none) directive and others (e.g. GCC version 9 and beyond, Clang version 10 and later) may implement strict OpenMP 4.0 and later semantics, which are incompatible with the OpenMP 3.1 semantics used in LAMMPS for maximal compatibility with compiler versions in use. If compilation with OpenMP enabled fails because of your compiler requiring strict OpenMP 4.0 semantics, you can change the behavior by adding -D LAMMPS_OMP_COMPAT $\scriptstyle=4$ to the LMP_INC variable in your makefile, or add it to the command-line flags while configuring with CMake. LAMMPS will auto-detect a suitable setting for most GNU, Clang, and Intel compilers.  

# 3.4.2 Choice of compiler and compile/link options  

The choice of compiler and compiler flags can be important for maximum performance. Vendor provided compilers for a specific hardware can produce faster code than open-source compilers like the GNU compilers. On the most common $\mathrm{x}86$ hardware, the most popular $\mathrm{C}{+}{+}$ compilers are quite similar in their ability to optimize regular $\mathrm{C}/\mathrm{C}{+}+$ source code at high optimization levels. When using the INTEL package, there is a distinct advantage in using the Intel $\mathrm{C}{+}{+}$ compiler due to much improved vectorization through SSE and AVX instructions on compatible hardware. The source code in that package conditionally includes compiler specific directives to enable these high degrees of vectorization. This may change over time as equivalent vectorization directives are included into the OpenMP standard and other compilers adopt them.  

On parallel clusters or supercomputers which use “environment modules” for their compile/link environments, you can often access different compilers by simply loading the appropriate module before building LAMMPS.  

# CMake build  

By default CMake will use the compiler it finds according to its internal preferences, and it will add optimization flags appropriate to that compiler and any accelerator packages you have included in the build. CMake will check if the detected or selected compiler is compatible with the $\mathrm{C}{+}{+}$ support requirements of LAMMPS and stop with an error, if this is not the case. A $\mathrm{C}{+}{+}11$ compatible compiler is currently required, but a transition to require $\mathrm{C}{+}{+}17$ is in progress and planned to be completed in Summer 2025. Currently, setting -DLAMMPS_CXX11 $=$ yes is required when configuring with CMake while using a $\mathrm{C}{+}{+}11$ compatible compiler that does not support $\mathrm{C}{+}{+}17$ , otherwise setting -DCMAKE_CXX_STANDARD ${\mathrm{=}}17$ is preferred.  

You can tell CMake to look for a specific compiler with setting CMake variables (listed below) during configuration. For a few common choices, there are also presets in the cmake/presets folder. For convenience, there is a CMAKE_TUNE_FLAGS variable that can be set to apply global compiler options (applied to compilation only), to be used for adding compiler or host specific optimization flags in addition to the “flags” variables listed below. You may also specify the corresponding CMAKE_\*_FLAGS variables individually, if you want to experiment with alternate optimization flags. You should specify all 3 compilers, so that the (few) LAMMPS source files written in C or Fortran are built with a compiler consistent with the one used for the $\mathrm{C}{+}{+}$ files:  

<html><body><table><tr><td>-D CMAKE CXX COMPILER=name -D CMAKE CC COMPILER=name</td></tr><tr><td>name of C compiler CMAKE Fortran COMPILER=name</td></tr><tr><td>name of Fortran compiler put compiler in C++17 mode</td></tr><tr><td>CMAKE CXX STANDARD=17</td></tr><tr><td>LAMMPS CXX11=yes enforce compilation in C++11 mode</td></tr><tr><td>CXX FLAGS=string flags to use with n C++ compiler</td></tr><tr><td>FLAGS=string flags to use with n C compiler FLAGS=string fags to use with Fortran compiler</td></tr></table></body></html>  

A few example command lines are:  

# Building with GNU Compilers:   
cmake -DCMAKE_C_COMPILER $\underline{{\underline{{\mathbf{\Pi}}}}}$ gcc -DCMAKE_CXX_COMPILER ${\mathrm{=g++}}$ \ -DCMAKE_Fortran_COMPILER $\underline{{\underline{{\mathbf{\Pi}}}}}$ gfortran ../cmake   
# Building with Intel Classic Compilers:   
cmake -DCMAKE_C_COMPILER=icc -DCMAKE_CXX_COMPILER=icpc \ -DCMAKE_Fortran_COMPILER $\underline{{\underline{{\mathbf{\Pi}}}}}$ ifort ../cmake   
# Building with Intel oneAPI Compilers:   
cmake -DCMAKE_C_COMPILER=icx -DCMAKE_CXX_COMPILER=icpx -DCMAKE_Fortran_COMPILER=ifx ../cmake   
# Building with LLVM/Clang Compilers:   
cmake -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ \ -DCMAKE_Fortran $-$ COMPILER=flang ../cmake   
# Building with PGI/Nvidia Compilers:   
cmake -DCMAKE_C_COMPILER=pgcc -DCMAKE_CXX_COMPILER=pgc++ \ -DCMAKE_Fortran_COMPILER $\underline{{\underline{{\mathbf{\Pi}}}}}$ pgfortran ../cmake   
# Building with the NVHPC Compilers:   
cmake -DCMAKE_C_COMPILER $,=$ nvc -DCMAKE_CXX_COMPILER $\underline{{\underline{{\mathbf{\Pi}}}}}$ nvc++ \ -DCMAKE_Fortran_COMPILER=nvfortran ../cmake  

For compiling with the Clang/LLVM compilers a CMake preset is provided that can be loaded with -C ../cmake/presets/clang.cmake. Similarly, -C ../cmake/presets/intel.cmake should switch the compiler toolchain to the legacy Intel compilers, -C ../cmake/presets/oneapi.cmake will switch to the LLVM based oneAPI Intel compilers, -C ../cmake/presets/pgi.cmake will switch the compiler to the PGI compilers, and -C ../cmake/presets/nvhpc.cmake will switch to the NVHPC compilers.  

Furthermore, you can set CMAKE_TUNE_FLAGS to specifically add compiler flags to tune for optimal performance on given hosts. This variable is empty by default.  

#  Note  

When the cmake command completes, it prints a summary to the screen which compilers it is using and what flags and settings will be used for the compilation. Note that if the top-level compiler is mpicxx, it is simply a wrapper on a real compiler. The underlying compiler info is what CMake will try to determine and report. You should check to confirm you are using the compiler and optimization flags you want.  

# $\Theta$ Makefile.machine settings for traditional make  

The “compiler/linker settings” section of a Makefile.machine lists compiler and linker settings for your $\mathrm{C}{+}{+}$ compiler, including optimization flags. For a parallel build it is recommended to use mpicxx or mpiCC, since these compiler wrappers will include a variety of settings appropriate for your MPI installation and thus avoiding the guesswork of finding the right flags.  

Parallel build (see src/MAKE/Makefile.mpi):  

CC = mpicxx CCFLAGS = -g -O3 LINK = mpicxx LINKFLAGS = -g -O  

Serial build with GNU gcc (see src/MAKE/Makefile.serial):  

CC = g++ CCFLAGS = -g -O3 LINK = g++ LINKFLAGS = -g -O  

#  Note  

If compilation stops with a message like the following:  

g++ -g -O3 -DLAMMPS_GZIP -DLAMMPS_MEMALIGN=64 -I../STUBS -c ..   
$\hookrightarrow$ /main.cpp   
In file included from ../pointers.h:24:0, from ../input.h:17, from ../main.cpp:16:   
../lmptype.h:34:2: error: #error LAMMPS requires a C++11 (or later) compliant␣   
$\hookrightarrow$ compiler. Enable C++11 compatibility or upgrade the compiler.  

then you have either an unsupported (old) compiler or you have to turn on $\overline{{\mathrm{C}++11}}$ mode. The latter applies to GCC 4.8.x shipped with RHEL 7.x and CentOS 7.x or GCC 5.4.x shipped with Ubuntu16.04. For those compilers, you need to add the -std $=\mathrm{c}++11$ flag. If there is no compiler that supports this flag (or equivalent), you would have to install a newer compiler that supports $\mathrm{C}{+}{+}11$ ; either as a binary package or through compiling from source.  

While a $\mathrm{C}{+}{+}11$ compatible compiler is currently sufficient to compile LAMMPS, a transition to require $\mathrm{C}{+}{+}17$ is in progress and planned to be completed in Summer 2025. Currently, setting -DLAMMPS_CXX11 in the $\mathrm{LMP\_INC}=\mathrm{li}$ ne in the machine makefile is required when using a $\mathrm{C}{+}{+}11$ compatible compiler that does not support $\mathrm{C}{+}{+}17$ . Otherwise, to enable $\mathrm{C}{+}{+}17$ support (if not enabled by default) using a compiler flag like -std $=\mathrm{c}++17$ in CCFLAGS may needed.  

If you build LAMMPS with any Accelerator packages included, there may be specific compiler or linker flags that are either required or recommended to enable required features and to achieve optimal performance. You need to include these in the CCFLAGS and LINKFLAGS settings above. For details, see the documentation for the individual packages listed on the Accelerator packages page. Or examine these files in the src/MAKE/OPTIONS directory. They correspond to each of the 5 accelerator packages and their hardware variants:  

Makefile.opt # OPT package   
Makefile.omp # OPENMP package   
Makefile.intel_cpu # INTEL package for CPUs   
Makefile.intel_coprocessor # INTEL package for KNLs   
Makefile.gpu # GPU package   
Makefile.kokkos_cuda_mpi # KOKKOS package for GPUs   
Makefile.kokkos_omp # KOKKOS package for CPUs (OpenMP)   
Makefile.kokkos_phi # KOKKOS package for KNLs (OpenMP)  

# 3.4.3 Build the LAMMPS executable and library  

LAMMPS is always built as a library of $\mathrm{C}{+}{+}$ classes plus an executable. The executable is a simple main() function that sets up MPI and then creates a LAMMPS class instance from the LAMMPS library, which will then process commands provided via a file or from the console input. The LAMMPS library can also be called from another application or a scripting language. See the Howto couple doc page for more info on coupling LAMMPS to other codes. See the Python page for more info on wrapping and running LAMMPS from Python via its library interface.  

![](images/3eecaa69d8084b4f59744d4f4351ed90702ba0dfd0842c0a6f4ef8ce56b6974e.jpg)  

# CMake build  

For CMake builds, you can select through setting CMake variables between building a shared or a static LAMMPS library and what kind of suffix is added to them (in case you want to concurrently install multiple variants of binaries with different settings). If none are set, defaults are applied.  

-D BUILD_SHARED_LIBS $=$ value # yes or no (default)   
-D LAMMPS_MACHINE=name # name $=$ mpi, serial, mybox, titan, laptop, etc # no default value  

The compilation will always produce a LAMMPS library and an executable linked to it. By default, this will be a static library named liblammps.a and an executable named lmp Setting BUILD_SHARED_LIBS $=$ yes will instead produce a shared library called liblammps.so (or liblammps.dylib or liblammps.dll depending on the platform) If LAMMPS_MACHINE ${}={}$ name is set in addition, the name of the generated libraries will be changed to either liblammps_name.a or liblammps_name.so, respectively and the executable will be called lmp_name.  

# Traditional make  

With the traditional makefile based build process, the choice of the generated executable or library depends on the “mode” setting. Several options are available and mode $\leftharpoondown$ static is the default.  

make machine # build LAMMPS executable lmp_machine   
make mode=static machine # same as "make machine"   
make mode=shared machine # build LAMMPS shared lib liblammps_machine.so # instead  

The “static” build will generate a static library called liblammps_machine.a and an executable named lmp_machine, while the “shared” build will generate a shared library liblammps_machine.so instead and lmp_machine will be linked to it. The build step will also create generic soft links, named liblammps.a and liblammps.so, which point to the specific liblammps_machine.a/so files.  

# Additional information  

Note that for creating a shared library, all the libraries it depends on must be compiled to be compatible with shared libraries. This should be the case for libraries included with LAMMPS, such as the dummy MPI library in src/STUBS or any package libraries in the lib directory, since they are always built in a shared library compatible way using the -fPIC compiler switch. However, if an auxiliary library (like MPI or FFTW) does not exist as a compatible format, the shared library linking step may generate an error. This means you will need to install a compatible version of the auxiliary library. The build instructions for that library should tell you how to do this.  

As an example, here is how to build and install the MPICH library, a popular open-source version of MPI, as a shared library in the default /usr/local/lib location:  

./configure --enable-shared   
make   
make install  

You may need to use sudo make install in place of the last line if you do not have write privileges for $/\mathrm{usr/local/\Omega}$ lib or use the --prefix configuration option to select an installation folder, where you do have write access. The end result should be the file /usr/local/lib/libmpich.so. On many Linux installations, the folder $\Phi\{\mathrm{HOME}\},$ /.local is an alternative to using /usr/local and does not require superuser or sudo access. In that case the configuration step becomes:  

./configure --enable-shared --prefix=\${HOME}/.local  

Avoiding the use of “sudo” for custom software installation (i.e. from source and not through a package manager tool provided by the OS) is generally recommended to ensure the integrity of the system software installation.  

# 3.4.4 Including or removing debug support  

By default the compilation settings will include the -g flag which instructs the compiler to include debug information (e.g. which line of source code a particular instruction correspond to). This can be extremely useful in case LAMMPS crashes and can help to provide crucial information in tracking down the origin of a crash and help the LAMMPS developers fix bugs in the source code. However, this increases the storage requirements for object files, libraries, and the executable 3-5 fold.  

If this is a concern, you can change the compilation settings or remove the debug information from the LAMMPS executable:  

• Traditional make: edit your Makefile. $<$ <machine $>$ to remove the -g flag from the CCFLAGS and LINKFLAGS definitions   
• CMake: use -D CMAKE_BUILD_TYPE $\vDash$ Release or explicitly reset the applicable compiler flags (best done using the text mode or graphical user interface).   
• Remove debug info: If you are only concerned about the executable being too large, you can use the strip tool (e.g. strip lmp_serial) to remove the debug information from the executable file. Do not strip libraries or object files, as that will render them unusable.  

# 3.4.5 Build LAMMPS tools  

Some tools described in Auxiliary tools can be built directly using CMake or Make.  

# CMake build  

-D BUILD_TOOLS=value # yes or no (default). Build binary2txt, # chain.x, micelle2d.x, msi2lmp, phana, # stl_bin2txt   
-D BUILD_LAMMPS_GUI=value # yes or no (default). Build LAMMPS-GUI   
-D BUILD_WHAM=value # yes (default). Download and build WHAM; # only available for BUILD_LAMMPS_GUI=yes  

The generated binaries will also become part of the LAMMPS installation (see below).  

# Traditional make  

cd lammps/tools make all make binary2txt make chain make micelle2d # build all binaries of tools # build only binary2txt tool # build only chain tool # build only micelle2d tool  

#  Note  

Building the LAMMPS-GUI requires building LAMMPS with CMake.  

# 3.4.6 Install LAMMPS after a build  

After building LAMMPS, you may wish to copy the LAMMPS executable or library, along with other LAMMPS files (library header, doc files), to a globally visible place on your system, for others to access. Note that you may need super-user privileges (e.g. sudo) if the directory you want to copy files to is protected.  

<html><body><table><tr><td>CMakebuild</td></tr><tr><td>cmake -D CMAKE_INSTALL_PREFIX=path [options ...] ../cmake make # perform make after CMake command make install # perform the installation into prefix</td></tr><tr><td>During the installation process CMake will by default remove any runtime path settings for loading shared libraries. Because of this you may have to set or modify the LD_LIBRARY _PATH (or DYLD _LIBRARY _PATH) environment variable, if you are installing LAMMPS into a non-system location and/or are linking to libraries in a non-system location that depend on such runtime path settings. As an alternative, you may set the CMake variable LAMMPS _INSTALL_RPATH to on and then the runtime paths for any linked shared libraries and the library installation folder for the LAMMPS library will be embedded and thus the requirement to set environment variables is avoided. The off setting is usually preferred for packaged binaries or when setting up environment modules, the</td></tr></table></body></html>  

# $\Theta$ Traditional make  

There is no “install” option in the src/Makefile for LAMMPS. If you wish to do this you will need to first build LAMMPS, then manually copy the desired LAMMPS files to the appropriate system directories.  

# 3.5 Optional build settings  

LAMMPS can be built with several optional settings. Each subsection explains how to do this for building both with CMake and make.  

• $C{+}{+}I I$ standard compliance when building all of LAMMPS   
• FFT library for use with the kspace_style pppm command   
• Size of LAMMPS integer types and size limits   
• Read or write compressed files   
• Output of JPEG, PNG, and movie files via the dump image or dump movie commands   
• Support for downloading files   
• Memory allocation alignment   
• Workaround for long long integers   
• Exception handling when using LAMMPS as a library to capture errors   
• Trigger selected floating-point exceptions  

# 3.5.1 $\tt c++11$ standard compliance  

A $\mathrm{C}{+}{+}11$ standard compatible compiler is a requirement for compiling LAMMPS. LAMMPS version 3 March 2020 is the last version compatible with the previous $\mathrm{C}++98$ standard for the core code and most packages. Most currently used $\mathrm{C}{+}{+}$ compilers are compatible with $\mathrm{C}{+}{+}11$ , but some older ones may need extra flags to enable $\mathrm{C}{+}{+}11$ compliance. Example for GNU $\mathrm{c}++4.8.\mathrm{x}$ :  

-D FFT_PACK $\underline{{\underline{{\mathbf{\Pi}}}}}$ value # array (default) or pointer or memcpy -D FFT_USE_HEFFTE=value # yes or no (default), yes links to heFFTe  

#  Note  

When the Kokkos variant of a package is compiled and selected at run time, the FFT library selected by the FFT_KOKKOS variable applies. Otherwise, the FFT library selected by the FFT variable applies. The same FFT settings apply to both. FFT_KOKKOS must be compatible with the Kokkos back end - for example, when using the CUDA back end of Kokkos, you must use either CUFFT or KISS.  

Usually these settings are all that is needed. If FFTW3 is selected, then CMake will try to detect, if threaded FFTW libraries are available and enable them by default. This setting is independent of whether OpenMP threads are enabled and a package like KOKKOS or OPENMP is used. If CMake cannot detect the FFT library, you can set these variables to assist:  

-D FFTW3_INCLUDE_DIR $\mathbf{\Omega}_{,}=$ path # path to FFTW3 include files   
-D FFTW3_LIBRARY $\cong$ path # path to FFTW3 libraries   
-D FFTW3_OMP_LIBRARY $\cong$ path # path to FFTW3 OpenMP wrapper libraries   
-D FFT_FFTW_THREADS $=$ on # enable using OpenMP threaded FFTW3 libraries   
-D MKL_INCLUDE_DIR=path # ditto for Intel MKL library   
-D FFT_MKL_THREADS=on # enable using threaded FFTs with MKL libraries   
-D MKL_LIBRARY $\cong$ path # path to MKL libraries   
-D FFT_HEFFTE_BACKEND $^{1-}$ value # FFTW or MKL or empty/undefined for the␣   
,→stock  

# heFFTe back end -D Heffte_ROOT=path # path to an existing heFFTe installation -D nvpl_fft_INCLUDE_DIR $\underline{{\underline{{\mathbf{\Pi}}}}}$ path # path to NVPL FFT include files -D nvpl_fft_LIBRARY_DIR $\cdot^{=}$ path # path to NVPL FFT libraries  

#  Note  

heFFTe comes with a builtin $\circeq$ stock) back end for FFTs, i.e. a default internal FFT implementation; however, this stock back end is intended for testing purposes only and is not optimized for production runs.  

# $\Theta$ Traditional make  

To change the FFT library to be used and its options, you have to edit your machine Makefile. Below are examples how the makefile variables could be changed.  

FFT_INC $=$ -DFFT_<NAME $>$ # where <NAME $>$ is KISS (default), FFTW3, # FFTW (same as FFTW3), NVPL, or MKL   
FFT_INC $=$ -DFFT_KOKKOS_ $<$ NAME $\textgreater$ # where $<$ <NAME> is KISS (default),␣   
,→FFTW3, # FFTW (same as FFTW3), NVPL, MKL, CUFFT, # HIPFFT, or MKL_GPU   
FFT_INC $=$ -DFFT_SINGLE # do not specify for double precision   
FFT_INC = -DFFT_FFTW_THREADS # enable using threaded FFTW3 libraries   
FFT_INC = -DFFT_MKL_THREADS # enable using threaded FFTs with MKL␣   
,→libraries   
FFT_INC = -DFFT_PACK_ARRAY # or -DFFT_PACK_POINTER or -DFFT_   
$\hookrightarrow$ PACK_MEMCPY # default is FFT_PACK_ARRAY if not specified   
FFT_INC = -I/usr/local/include   
FFT_PATH = -L/usr/local/lib   
# hipFFT either precision   
FFT_LIB = -lhipfft $-$   
# cuFFT either precision   
FFT_LIB = -lcufft   
# MKL_GPU either precision   
FFT_LIB = -lmkl_sycl_dft -lmkl_intel_ilp64 -lmkl_tbb_thread -lmkl_core -ltbb   
# FFTW3 double precision   
FFT_LIB = -lfftw3 $-$   
# FFTW3 double precision with threads (needs -DFFT_FFTW_THREADS)   
FFT_LIB = -lfftw3 -lfftw3_omp   
# FFTW3 single precision   
FFT_LIB = -lfftw3 -lfftw3f $-$   
# serial MKL with Intel compiler   
FFT_LIB = -lmkl_intel_lp64 -lmkl_sequential -lmkl_core $-$   
# serial MKL with GNU compiler   
FFT_LIB = -lmkl_gf_lp64 -lmkl_sequential -lmkl_core $-$   
# threaded MKL with Intel compiler   
FFT_LIB = -lmkl_intel_lp64 -lmkl_intel_thread -lmkl_core $-$   
# threaded MKL with GNU compiler   
FFT_LIB = -lmkl_gf_lp64 -lmkl_gnu_thread -lmkl_core   
# MKL with automatic runtime selection of interface libs   
FFT_LIB $=$ -lmkl_rt   
# threaded NVPL FFT   
FFT_LIB $=$ -lnvpl_fftw   
As with CMake, you do not need to set paths in FFT_INC or FFT_PATH, if the compiler can  

find the FFT header and library files in its default search path. You must specify FFT_LIB with the appropriate FFT libraries to include in the link.  

Traditional make can also link to heFFTe using an existing installation  

include $<$ <path-to-heffte-installation $>$ /share/heffte/HeffteMakefile.in   
FFT_INC $=$ -DFFT_HEFFTE -DFFT_HEFFTE_FFTW \$(heffte_include)   
FFT_PATH =   
FFT_LIB = \$(heffte_link) \$(heffte_libs)  

The heFFTe install path will contain HeffteMakefile.in. which will define the heffte include variables needed to link to heFFTe from an external project using traditional make. The -DFFT_HEFFTE is required to switch to using heFFTe, while the optional -DFFT_HEFFTE_FFTW selects the desired heFFTe back end, e.g., -DFFT_HEFFTE_FFTW or -DFFT_HEFFTE_MKL, omitting the variable will default to the stock back end. The heFFTe stock back end is intended to be used for testing and debugging, but is not performance optimized for large scale production runs.  

The KISS FFT library is included in the LAMMPS distribution. It is portable across all platforms. Depending on the size of the FFTs and the number of processors used, the other libraries listed here can be faster.  

However, note that long-range Coulombics are only a portion of the per-timestep CPU cost, FFTs are only a portion of long-range Coulombics, and 1d FFTs are only a portion of the FFT cost (parallel communication can be costly). A breakdown of these timings is printed to the screen at the end of a run when using the kspace_style pppm command. The Screen and logfile output page gives more details. A more detailed (and time consuming) report of the FFT performance is generated with the kspace_modify fftbench yes command.  

FFTW is a fast, portable FFT library that should also work on any platform and can be faster than the KISS FFT library. You can download it from www.fftw.org. LAMMPS requires version 3.X; the legacy version 2.1.X is no longer supported.  

Building FFTW for your box should be as simple as ./configure; make; make install. The install command typically requires root privileges (e.g. invoke it via sudo), unless you specify a local directory with the --prefix option of configure. Type ./configure --help to see various options.  

The Intel MKL math library is part of the Intel compiler suite. It can be used with the Intel or GNU compiler (see the FFT_LIB setting above).  

The NVIDIA Performance Libraries (NVPL) FFT library is optimized for NVIDIA Grace Armv9.0 architecture. You can download it from https://docs.nvidia.com/nvpl/  

The cuFFT and hipFFT FFT libraries are packaged with NVIDIA’s CUDA and AMD’s HIP installations, respectively. These FFT libraries require the Kokkos acceleration package to be enabled and the Kokkos back end to be GPUresident (i.e., HIP or CUDA). Similarly, GPU offload of FFTs on Intel GPUs with oneMKL currently requires the Kokkos acceleration package to be enabled with the SYCL back end.  

Performing 3d FFTs in parallel can be time-consuming due to data access and required communication. This cost can be reduced by performing single-precision FFTs instead of double precision. Single precision means the real and imaginary parts of a complex datum are 4-byte floats. Double precision means they are 8-byte doubles. Note that Fourier transform and related PPPM operations are somewhat less sensitive to floating point truncation errors, and thus the resulting error is generally less than the difference in precision. Using the -DFFT_SINGLE setting trades off a little accuracy for reduced memory use and parallel communication costs for transposing 3d FFT data.  

When using -DFFT_SINGLE with FFTW3, you may need to ensure that the FFTW3 installation includes support for single-precision.  

When compiler FFTW3 from source, you can do the following, which should produce the additional libraries libfftw3f.   
a and/or libfftw3f.so.  

<html><body><table><tr><td>make clean</td></tr><tr><td>/configure --enable-single; make; make install</td></tr></table></body></html>  

Performing 3d FFTs requires communication to transpose the 3d FFT grid. The data packing/unpacking for this can be done in one of 3 modes (ARRAY, POINTER, MEMCPY) as set by the FFT_PACK syntax above. Depending on the machine, the size of the FFT grid, the number of processors used, one option may be slightly faster. The default is ARRAY mode.  

When using -DFFT_HEFFTE CMake will first look for an existing install with hints provided by -DHeffte_ROOT, as recommended by the CMake standard and note that the name is case sensitive. If CMake cannot find a heFFTe installation with the correct back end (e.g., FFTW or MKL), it will attempt to download and build the library automatically.  

In this case, LAMMPS CMake will also accept all heFFTe specific variables listed in the heFFTe documentation and those variables will be passed into the heFFTe build.  

# 3.5.3 Size of LAMMPS integer types and size limits  

LAMMPS uses a few custom integer data types, which can be defined as either 4-byte $(=32$ -bit) or 8-byte $(=64$ -bit) integers at compile time. This has an impact on the size of a system that can be simulated, or how large counters can become before “rolling over”. The default setting of “smallbig” is almost always adequate.  

![](images/ab017d42c99caa228e1b8c697331f1ec8b7dde56f54ffa0c6c882027b25be4be.jpg)  

# CMake build  

With CMake the choice of integer types is made via setting a variable during configuration.  

-D LAMMPS_SIZES $_{1\overline{{\longrightarrow}}}$ value # smallbig (default) or bigbig or smallsmall  

If the variable is not set explicitly, “smallbig” is used.  

# Traditional build  

If you want a setting different from the default, you need to edit the LMP_INC variable setting your machine Makefile.  

LMP_INC = -DLAMMPS_SMALLBIG # or -DLAMMPS_BIGBIG or -DLAMMPS , SMALLSMALL  

The default setting is -DLAMMPS_SMALLBIG if nothing is specified  

# LAMMPS system size restrictions  

<html><body><table><tr><td></td><td>smallbig</td><td>bigbig</td><td>smallsmall</td></tr><tr><td>Totalatomcount</td><td>263 atoms s (=9.223· 1018)</td><td>263 atoms s (=9.223·1018)</td><td>231 atoms (= 2.147 · 109)</td></tr><tr><td>Total timesteps</td><td>263 steps (= 9.223 · 1018)</td><td>263 steps (= 9.223 · 1018)</td><td>231 steps (= 2.147·109)</td></tr><tr><td>AtomIDvalues</td><td>1 ≤ i ≤ 231(= 2.147· 109)</td><td>1 ≤ i ≤ 263(= 9.223 · 1018)</td><td>1 ≤ i ≤ 231(= 2.147 · 109)</td></tr><tr><td>Image flag values</td><td>-512≤i≤511</td><td>-1048576≤i≤1048575</td><td>-512≤i≤511</td></tr></table></body></html>  

The “bigbig” setting increases the size of image flags and atom IDs over “smallbig” and the “smallsmall” setting is only needed if your machine does not support 64-bit integers or incurs performance penalties when using them.  

These are limits for the core of the LAMMPS code, specific features or some styles may impose additional limits. The ATC package cannot be compiled with the “bigbig” setting. Also, there are limitations when using the library interface where some functions with known issues have been replaced by dummy calls printing a corresponding error message rather than crashing randomly or corrupting data.  

Atom IDs are not required for atomic systems which do not store bond topology information, though IDs are enabled by default. The atom_modify id no command will turn them off. Atom IDs are required for molecular systems with bond topology (bonds, angles, dihedrals, etc). Similarly, some force or compute or fix styles require atom IDs. Thus, if you model a molecular system or use one of those styles with more than 2 billion atoms, you need the “bigbig” setting.  

Regardless of the total system size limits, the maximum number of atoms per MPI rank (local $^+$ ghost atoms) is limited to 2 billion for atomic systems and 500 million for systems with bonds (the additional restriction is due to using the 2 upper bits of the local atom index in neighbor lists for storing special bonds info).  

Image flags store 3 values per atom in a single integer, which count the number of times an atom has moved through the periodic box in each dimension. See the dump manual page for a discussion. If an atom moves through the periodic box more than this limit, the value will “roll over”, e.g. from 511 to -512, which can cause diagnostics like the mean-squared displacement, as calculated by the compute msd command, to be faulty.  

Also note that the GPU package requires its lib/gpu library to be compiled with the same size setting, or the link will fail. A CMake build does this automatically. When building with make, the setting in whichever lib/gpu/Makefile is used must be the same as above.  

# 3.5.4 Output of JPEG, PNG, and movie files  

The dump image command has options to output JPEG or PNG image files. Likewise, the dump movie command outputs movie files in a variety of movie formats. Using these options requires the following settings:  

# CMake build  

-D WITH_JPEG=value # yes or no # default $=$ yes if CMake finds JPEG development files, else no   
-D WITH_PNG=value # yes or no # default = yes if CMake finds PNG and ZLIB development files, # else no   
-D WITH_FFMPEG=value # yes or no # default = yes if CMake can find ffmpeg, else no  

Usually these settings are all that is needed. If CMake cannot find the graphics header, library, executable files, you can set these variables:  

-D JPEG_INCLUDE_DIR $\underline{{\underline{{\mathbf{\Pi}}}}}$ path # path to jpeglib.h header file -D JPEG_LIBRARY $\cong$ path # path to libjpeg.a (.so) file -D PNG_INCLUDE_DIR=path # path to png.h header file -D PNG_LIBRARY=path # path to libpng.a (.so) file -D ZLIB_INCLUDE_DIR=path # path to zlib.h header file -D ZLIB_LIBRARY=path # path to libz.a (.so) file -D FFMPEG_EXECUTABLE=path # path to ffmpeg executable  

# $\mathfrak{G}$ Traditional make  

LMP_INC = -DLAMMPS_JPEG -DLAMMPS_PNG -DLAMMPS_FFMPEG $<$ other␣ ,→LMP_INC settings>  

JPG_INC = -I/usr/local/include # path to jpeglib.h, png.h, zlib.h headers # if make cannot find them   
JPG_PATH = -L/usr/lib # paths to libjpeg.a, libpng.a, libz.a (.so) # files if make cannot find them   
JPG_LIB = -ljpeg -lpng -lz # library names  

As with CMake, you do not need to set JPG_INC or JPG_PATH, if make can find the graphics header and library files in their default system locations. You must specify JPG_LIB with a list of graphics libraries to include in the link. You must make certain that the ffmpeg executable (or ffmpeg.exe on Windows) is in a directory where LAMMPS can find it at runtime; that is usually a directory list in your PATH environment variable.  

Using ffmpeg to output movie files requires that your machine supports the “popen” function in the standard runtime library.  

![](images/786235c0188ffaf12c24bfda6f2acacf60c79878743d45d7ca57153d7be825da.jpg)  

# Note  

On some clusters with high-speed networks, using the fork() library call (required by popen()) can interfere with the fast communication library and lead to simulations using ffmpeg to hang or crash.  

# 3.5.5 Read or write compressed files  

If this option is enabled, large files can be read or written with compression by gzip or similar tools by several LAMMPS commands, including read_data, rerun, and dump. Supported compression tools and algorithms are currently gzip, bzip2, zstd, xz, lz4, and lzma (via xz).  

![](images/4a8891277078309d5327d4ca9dca4c96362178bbc01e95a41bfe1606a8afb745.jpg)  

# CMake build  

-D WITH_GZIP $=$ value # yes or no # default is yes if CMake can find the gzip program  

# Traditional make  

LMP_INC = -DLAMMPS_GZIP <other LMP_INC settings>  

This option requires that your operating system fully supports the “popen()” function in the standard runtime library and that a gzip or other executable can be found by LAMMPS in the standard search path during a run.  

# Note  

On clusters with high-speed networks, using the “fork()” library call (required by “popen()”) can interfere with the fast communication library and lead to simulations using compressed output or input to hang or crash. For selected operations, compressed file I/O is also available using a compression library instead, which is what the COMPRESS package enables.  

# 3.5.6 Support for downloading files  

Added in version $29\mathrm{Aug}2024$ .  

The geturl command command uses the the libcurl library to download files. This requires that LAMMPS is compiled accordingly which needs the following settings:  

# CMake build  

-D WITH_CURL=value # yes or no # default = yes if CMake finds CURL development files, else no  

Usually these settings are all that is needed. If CMake cannot find the graphics header, library, executable files, you can set these variables:  

-D CURL_INCLUDE_DIR=path # path to folder which contains curl.h header file -D CURL_LIBRARY=path # path to libcurls.a (.so) file  

# $\mathfrak{G}$ Traditional make  

LMP_INC = -DLAMMPS_CURL <other LMP_INC settings>  

CURL_INC = -I/usr/local/include # path to curl folder with curl.h CURL_PATH = -L/usr/lib # paths to libcurl.a(.so) if make cannot find it CURL_LIB = -lcurl # library names  

As with CMake, you do not need to set CURL_INC or CURL_PATH, if make can find the libcurl header and library files in their default system locations. You must specify CURL_LIB with a paths or linker flags to link to libcurl.  

# 3.5.7 Memory allocation alignment  

This setting enables the use of the posix_memalign() call instead of malloc() when LAMMPS allocates large chunks of memory. Vector instructions on CPUs may become more efficient, if dynamically allocated memory is aligned on larger-than-default byte boundaries. On most current operating systems, the malloc() implementation returns pointers that are aligned to 16-byte boundaries. Using SSE vector instructions efficiently, however, requires memory blocks being aligned on 64-byte boundaries.  

# CMake build  

-D LAMMPS_MEMALIGN=value # 0, 8, 16, 32, 64 (default)  

Use a LAMMPS_MEMALIGN value of 0 to disable using posix_memalign() and revert to using the malloc() C-library function instead. When compiling LAMMPS for Windows systems, malloc() will always be used and this setting is ignored.  

# Traditional make  

LMP_INC = -DLAMMPS_MEMALIGN $\cong$ value # 8, 16, 32, 64  

Do not set -DLAMMPS_MEMALIGN, if you want to have memory allocated with the malloc() function call instead. -DLAMMPS_MEMALIGN cannot be used on Windows, as Windows different function calls with different semantics for allocating aligned memory, that are not compatible with how LAMMPS manages its dynamical memory.  

# 3.5.8 Workaround for long long integers  

If your system or MPI version does not recognize “long long” data types, the following setting will be needed. It converts “long long” to a “long” data type, which should be the desired 8-byte integer on those systems:  

# CMake build  

-D LAMMPS_LONGLONG_TO_LONG=value # yes or no (default)  

# Traditional make  

LMP_INC = -DLAMMPS_LONGLONG_TO_LONG <other LMP_INC settings>  

# 3.5.9 Exception handling when using LAMMPS as a library  

LAMMPS errors do not kill the calling code, but throw an exception. In the C-library interface, the call stack is unwound and control returns to the caller, e.g. to Python or a code that is coupled to LAMMPS. The error status can then be queried. When using $\mathrm{C}{+}{+}$ directly, the calling code has to be set up to catch exceptions thrown from within LAMMPS.  

![](images/6bb0a917ef17e1441d6d631a1996446ae4e710401cbc2b7c331b08d02765b824.jpg)  

# Note  

When LAMMPS is running in parallel, it is not always possible to cleanly recover from an exception since not all parallel ranks may throw an exception and thus other MPI ranks may get stuck waiting for messages from the ones with errors.  

# 3.5.10 Trigger selected floating-point exceptions  

Many kinds of CPUs have the capability to detect when a calculation results in an invalid math operation, like a division by zero or calling the square root with a negative argument. The default behavior on most operating systems is to continue and have values for NaN $\circeq$ not a number) or Inf $\mathbf{\check{\rho}}=$ infinity). This allows software to detect and recover from such conditions. This behavior can be changed, however, often through use of compiler flags. On Linux systems (or more general on systems using the GNU C library), these so-called floating-point traps can also be selectively enabled through library calls. LAMMPS supports that by setting the -DLAMMPS_TRAP_FPE pre-processor define. As it is done in the main() function, this applies only to the standalone executable, not the library.  

# CMake build  

-D CMAKE_TUNE_FLAGS=-DLAMMPS_TRAP_FPE  

# Traditional make  

LMP_INC $=$ -DLAMMPS_TRAP_FPE <other LMP_INC settings>  

After compilation with this flag set, the LAMMPS executable will stop and produce a core dump when a division by zero, overflow, illegal math function argument or other invalid floating point operation is encountered.  

# 3.6 Include packages in build  

In LAMMPS, a package is a group of files that enable a specific set of features. For example, force fields for molecular systems or rigid-body constraints are in packages. In the src directory, each package is a subdirectory with the package name in capital letters.  

An overview of packages is given on the Packages doc page. Brief overviews of each package are on the Packages details page.  

When building LAMMPS, you can choose to include or exclude each package. Generally, there is no need to include a package if you never plan to use its features.  

If you get a run-time error that a LAMMPS command or style is “unknown”, it is often because the command is contained in a package, and your build did not include that package. If the command or style is available in a package included in the LAMMPS distribution, the error message will indicate which package would be needed. Running LAMMPS with the -h command-line switch will print all optional commands and packages that were enabled when building that executable.  

For the majority of packages, if you follow the single step below to include it, you can then build LAMMPS exactly the same as you would without any packages installed. A few packages may require additional steps, as explained on the Build extras page.  

These links take you to the extra instructions for those select packages:  

<html><body><table><tr><td>ADIOS</td><td>ATC</td><td>AWPMD</td><td>COLVARS</td><td>COMPRESS</td><td>ELECTRODE</td></tr><tr><td>GPU</td><td>H5MD</td><td>INTEL</td><td>KIM</td><td>KOKKOS</td><td>LEPTON</td></tr><tr><td>MACHDYN</td><td>MDI</td><td>MISC</td><td>ML-HDNNP</td><td>ML-IAP</td><td>ML-PACE</td></tr><tr><td>ML-POD</td><td>ML-QUIP</td><td>MOLFILE</td><td>NETCDF</td><td>OPENMP</td><td>OPT</td></tr><tr><td>PLUMED</td><td>POEMS</td><td>PYTHON</td><td>QMMM</td><td>RHEO</td><td>SCAFACOS</td></tr><tr><td>VORONOI</td><td>VTK</td><td></td><td></td><td></td><td></td></tr></table></body></html>  

The mechanism for including packages is simple but different for CMake versus make.  

# CMake build  

-D PKG_NAME=value # yes or no (default)  

Examples:  

-D PKG_MANYBODY=yes -D PKG_INTEL=yes  

All packages are included the same way. See the shortcut section below for how to install many packages at once with CMake.  

![](images/9b8a9abec94227776a152f7600bda9900ae599866198809ca8c884d24234e05e.jpg)  

# Note  

If you switch between building with CMake and make builds, no packages in the src directory can be installed when you invoke cmake. CMake will give an error if that is not the case, indicating how you can uninstall all packages in the src dir.  

# $\mathfrak{G}$ Traditional make  

cd lammps/src  

make ps # check which packages are currently installed   
make yes-name # install a package with name   
make no-name # uninstall a package with name   
make mpi # build LAMMPS with whatever packages are now installed  

# Examples:  

<html><body><table><tr><td>make no-rigid</td></tr><tr><td></td></tr><tr><td>make yes-intel</td></tr></table></body></html>  

All packages are included the same way. See the shortcut section below for how to install many packages at once with make.  

![](images/1a096b80492f88ba747080064dd73e6ee37786ae457f865de6ac42fcb259d6c7.jpg)  

# Note  

You must always re-build LAMMPS (via make) after installing or uninstalling a package, for the action to take effect. The included dependency tracking will make certain only files that are required to be rebuilt are recompiled.  

# Note  

You cannot install or uninstall packages and build LAMMPS in a single make command with multiple targets, e.g. make yes-colloid mpi. This is because the make procedure creates a list of source files that will be out-of-date for the build if the package configuration changes within the same command. You can include or exclude multiple packages in a single make command, e.g. make yes-colloid no-manybody.  

# 3.6.1 Information for both build systems  

Almost all packages can be included or excluded in a LAMMPS build, independent of the other packages. However, some packages include files derived from files in other packages. LAMMPS checks for this and does the right thing. Individual files are only included if their dependencies are already included. Likewise, if a package is excluded, other files dependent on that package are also excluded.  

# Note  

By default no packages are installed. Prior to August 2018, however, if you downloaded a tarball, 3 packages (KSPACE, MANYBODY, MOLECULE) were pre-installed via the traditional make procedure in the src directory. That is no longer the case, so that CMake will build as-is without needing to uninstall those packages.  

# 3.6.2 CMake presets for installing many packages  

Instead of specifying all the CMake options via the command-line, CMake allows initializing its settings cache using script files. These are regular CMake files which can manipulate and set CMake variables (which represent selected options), and can also contain control flow constructs for more complex operations.  

LAMMPS includes several of these files to define configuration “presets”, similar to the options that exist for the Make based system. Using these files, you can enable/disable portions of the available packages in LAMMPS. If you need a custom preset, you can make a copy of one of them and modify it to suit your needs.  

# enable just a few core packages cmake -C ../cmake/presets/basic.cmake [OPTIONS] ../cmake  

# enable most packages cmake -C ../cmake/presets/most.cmake [OPTIONS] ../cmak  

# enable packages which download sources or potential files cmake -C ../cmake/presets/download.cmake [OPTIONS] ../cmake  

# disable packages that do require extra libraries or tools cmake -C ../cmake/presets/nolib.cmake [OPTIONS] ../cmake  

# change settings to use the Clang compilers by default cmake -C ../cmake/presets/clang.cmake [OPTIONS] ../cmake  

# change settings to use the GNU compilers by default cmake -C ../cmake/presets/gcc.cmake [OPTIONS] ../cmake  

# change settings to use the Intel compilers by default cmake -C ../cmake/presets/intel.cmake [OPTIONS] ../cmake  

# change settings to use the PGI compilers by default cmake -C ../cmake/presets/pgi.cmake [OPTIONS] ../cmake  

# enable all packages cmake -C ../cmake/presets/all_on.cmake [OPTIONS] ../cmake  

# disable all packages cmake -C ../cmake/presets/all_off.cmake [OPTIONS] ../cmake  

# compile with MinGW cross-compilers mingw64-cmake -C ../cmake/presets/mingw-cross.cmake [OPTIONS] ../cmake  

# compile serial multi-arch binaries on macOS cmake -C ../cmake/presets/macos-multiarch.cmake [OPTIONS] ../cmake  

Presets that have names starting with “windows” are specifically for compiling LAMMPS natively on Windows and presets that have names starting with “kokkos” are specifically for selecting configurations for compiling LAMMPS with KOKKOS.  

![](images/03d971c393658bb6ebb249169e0625de3d8fb263e1ddc5bec685ba17d4df5de4.jpg)  

# Note  

Running cmake this way manipulates the CMake settings cache in your current build directory. You can combine multiple presets and options in a single cmake run, or change settings incrementally by running cmake with new flags. If you use a present for selecting a set of compilers, it will reset all settings from previous CMake runs.  

# Example  

# build LAMMPS with most commonly used packages, but then remove # those requiring additional library or tools, but still enable   
# GPU package and configure it for using CUDA. You can run.   
mkdir build   
cd build   
cmake -C ../cmake/presets/most.cmake -C ../cmake/presets/nolib.cmake -D PKG_GPU=on -D GPU_API=cuda ../cmake  

# to add another package, say BODY to the previous configuration you can run: cmake -D PKG_BODY=on .  

# to reset the package selection from above to the default of no packages # but leaving all other settings untouched. You can run: cmake -C ../cmake/presets/all_off.cmake .  

# 3.6.3 Make shortcuts for installing many packages  

The following commands are useful for managing package source files and their installation when building LAMMPS via traditional make. Just type make in lammps/src to see a one-line summary.  

These commands install/uninstall sets of packages:  

<html><body><table><tr><td>make yes-all</td><td>install all packages</td></tr><tr><td>make no-all</td><td># check for changes and uninstall all packages</td></tr><tr><td>make no-installed</td><td># only check and uninstall installed packages</td></tr><tr><td>make yes-basic</td><td>install a few commonly used packages'</td></tr><tr><td>make no-basic</td><td>remove a few commonly used packages</td></tr><tr><td>make yes-most</td><td>install most packages w/o libs'</td></tr><tr><td>make no-most</td><td>remove most packages w/o libs'</td></tr><tr><td>make yes-lib</td><td> install packages that require extra libraries</td></tr><tr><td>make no-lib</td><td>uninstall packages that require extra libraries</td></tr><tr><td>make yes-ext</td><td>install packages that require external libraries</td></tr><tr><td>make no-ext</td><td>uninstall packages that require external libraries</td></tr></table></body></html>  

which install/uninstall various sets of packages. Typing make package will list all the these commands.  

# Note  

Installing or uninstalling a package for the make based build process works by simply copying files back and forth between the main source directory src and the subdirectories with the package name (e.g. src/KSPACE, src/ATC), so that the files are included or excluded when LAMMPS is built. Only source files in the src folder will be compiled.  

The following make commands help manage files that exist in both the src directory and in package subdirectories. You do not normally need to use these commands unless you are editing LAMMPS files or are updating LAMMPS via git.  

Type make package-status or make ps to show which packages are currently installed. For those that are installed, it will list any files that are different in the src directory and package subdirectory.  

Type make package-installed or make pi to show which packages are currently installed, without listing the status of packages that are not installed.  

Type make package-update or make pu to overwrite src files with files from the package subdirectories if the package is installed. It should be used after the checkout has been updated or changed with git, this will only update the files in the package subdirectories, but not the copies in the src folder.  

Type make package-overwrite to overwrite files in the package subdirectories with src files.  

Type make package-diff to list all differences between pairs of files in both the source directory and the package directory.  

# 3.7 Packages with extra build options  

When building with some packages, additional steps may be required, in addition to  

<html><body><table><tr><td>CMake build</td><td>Traditional make</td></tr><tr><td></td><td></td></tr><tr><td>cmake -D1 PKG NAME=yes</td><td>make yes-name</td></tr></table></body></html>  

as described on the Build_package page.  

For a CMake build there may be additional optional or required variables to set. For a build with make, a provided library under the lammps/lib directory may need to be built first. Or an external library may need to exist on your system or be downloaded and built. You may need to tell LAMMPS where it is found on your system.  

This is the list of packages that may require additional steps.  

<html><body><table><tr><td>ADIOS</td><td>ATC</td><td>AWPMD</td><td>COLVARS</td><td>COMPRESS</td><td>ELECTRODE</td></tr><tr><td>GPU</td><td>H5MD</td><td>INTEL</td><td>KIM</td><td>KOKKOS</td><td>LEPTON</td></tr><tr><td>MACHDYN</td><td>MDI</td><td>MISC</td><td>ML-HDNNP</td><td>ML-IAP</td><td>ML-PACE</td></tr><tr><td>ML-POD</td><td>ML-QUIP</td><td>MOLFILE</td><td>NETCDF</td><td>OPENMP</td><td>OPT</td></tr><tr><td>PLUMED</td><td>POEMS</td><td>PYTHON</td><td>QMMM</td><td>RHEO</td><td>SCAFACOS</td></tr><tr><td>VORONOI</td><td colspan="5">VTK</td></tr></table></body></html>  

# 3.7.1 COMPRESS package  

To build with this package you must have the zlib compression library available on your system to build dump styles with a /gz suffix. There are also styles using the Zstandard library which have a ‘/zstd’ suffix. The zstd library version must be at least 1.4. Older versions use an incompatible API and thus LAMMPS will fail to compile.  

![](images/5375847a2b3c5c430c391d1aa2170d50f4715f780707f6ed8ab560b2527ab7f2.jpg)  

# CMake build  

If CMake cannot find the zlib library or include files, you can set these variables:  

-D ZLIB_INCLUDE_DIR=path # path to zlib.h header file -D ZLIB_LIBRARY $\cong$ path # path to libz.a (.so) file  

Support for Zstandard compression is auto-detected and for that CMake depends on the pkg-config tool to identify the necessary flags to compile with this library, so the corresponding libzstandard. pc file must be in a folder where pkg-config can find it, which may require adding it to the PKG_CONFIG_PATH environment variable.  

# Traditional make  

To include support for Zstandard compression, -DLAMMPS_ZSTD must be added to the compiler flags. If make cannot find the libraries, you can edit the file lib/compress/Makefile.lammps to specify the paths and library names. This must be done before the package is installed.  

# 3.7.2 GPU package  

To build with this package, you must choose options for precision and which GPU hardware to build for. The GPU package currently supports three different types of back ends: OpenCL, CUDA and HIP.  

# CMake build  

-D GPU_API=value # value = opencl (default) or cuda or hip   
-D GPU_PREC=value # precision setting # value = double or mixed (default) or single   
-D GPU_ARCH=value # primary GPU hardware choice for GPU_API=cuda # value = sm_XX (see below, default is sm_50)   
-D GPU_DEBUG=value # enable debug code in the GPU package library, # mostly useful for developers # value $-$ yes or no (default)   
-D HIP_PATH=value # value = path to HIP installation. Must be set if # GPU_API=HIP   
-D HIP_ARCH=value $-$ # primary GPU hardware choice for GPU $^-$ API=hip # value depends on selected HIP_PLATFORM # default is 'gfx906' for HIP_PLATFORM=amd and 'sm_50' for # HIP_PLATFORM=nvcc   
-D HIP_USE_DEVICE_SORT=value # enables GPU sorting # value = yes (default) or no   
-D CUDPP_OPT=value # use GPU binning with CUDA (should be off for modern GPUs) $-$ # enables CUDA Performance Primitives, must be "no" for # CUDA_MPS_SUPPORT=yes # value = yes or no (default)   
-D CUDA_MPS_SUPPORT=value # enables some tweaks required to run with active # nvidia-cuda-mps daemon # value = yes or no (default)   
-D CUDA_BUILD_MULTIARCH=value # enables building CUDA kernels for all supported GPU # architectures # value $=$ yes (default) or no   
-D USE_STATIC_OPENCL_LOADER=value # downloads/includes OpenCL ICD loader library, # no local OpenCL headers/libs needed # value = yes (default) or no  

GPU_ARCH settings for different GPU hardware is as follows:  

• sm_30 for Kepler (supported since CUDA 5 and until CUDA 10.x)   
• sm_35 or sm_37 for Kepler (supported since CUDA 5 and until CUDA 11.x)   
• sm_50 or sm_52 for Maxwell (supported since CUDA 6)   
• sm_60 or sm_61 for Pascal (supported since CUDA 8)   
• $\mathrm{sm\_70}$ for Volta (supported since CUDA 9)   
• $\mathrm{sm\_75}$ for Turing (supported since CUDA 10)   
• sm_80 or sm_86 for Ampere (supported since CUDA 11, sm_86 since CUDA 11.1)   
• sm_89 for Lovelace (supported since CUDA 11.8)   
• $\mathrm{sm}\_90$ for Hopper (supported since CUDA 12.0)  

A more detailed list can be found, for example, at Wikipedia’s CUDA article  

CMake can detect which version of the CUDA toolkit is used and thus will try to include support for all major GPU architectures supported by this toolkit. Thus the GPU_ARCH setting is merely an optimization, to have code for the preferred GPU architecture directly included rather than having to wait for the JIT compiler of the CUDA driver to translate it. This behavior can be turned off (e.g. to speed up compilation) by setting CUDA_ENABLE_MULTIARCH to no.  

When compiling for CUDA or HIP with CUDA, version 8.0 or later of the CUDA toolkit is required and a GPU architecture of Kepler or later, which must also be supported by the CUDA toolkit in use and the CUDA driver in use. When compiling for OpenCL, OpenCL version 1.2 or later is required and the GPU must be supported by the GPU driver and OpenCL runtime bundled with the driver.  

When building with CMake, you must NOT build the GPU library in lib/gpu using the traditional build procedure. CMake will detect files generated by that process and will terminate with an error and a suggestion for how to remove them.  

If you are compiling for OpenCL, the default setting is to download, build, and link with a static OpenCL ICD loader library and standard OpenCL headers. This way no local OpenCL development headers or library needs to be present and only OpenCL compatible drivers need to be installed to use OpenCL. If this is not desired, you can set USE_STATIC_OPENCL_LOADER to no.  

The GPU library has some multi-thread support using OpenMP. If LAMMPS is built with -D BUILD_OMP $\stackrel{.}{=}$ on this will also be enabled.  

If you are compiling with HIP, note that before running CMake you will have to set appropriate environment variables. Some variables such as HCC_AMDGPU_TARGET (for $\mathrm{ROCm}<=4.0)$ or CUDA_PATH are necessary for hipcc and the linker to work correctly.  

Added in version 3Aug2022.  

Using the CHIP-SPV implementation of HIP is supported. It allows one to run HIP code on Intel GPUs via the OpenCL or Level Zero back ends. To use CHIP-SPV, you must set -DHIP_USE_DEVICE_SORT $\cong$ OFF in your CMake command-line as CHIP-SPV does not yet support hipCUB. As of Summer 2022, the use of HIP for Intel GPUs is experimental. You should only use this option in preparations to run on Aurora system at Argonne.  

# AMDGPU target (ROCm <= 4.0)   
export HIP_PLATFORM $\underline{{\underline{{\mathbf{\Pi}}}}}$ hcc   
export HIP_PATH $\equiv$ /path/to/HIP/install   
export HCC_AMDGPU_TARGET $\cong$ gfx906   
cmake -D PKG_GPU=on -D GPU_API=HIP -D HIP_ARCH $=$ gfx906 -D CMAKE_CXX $\hookrightarrow$ COMPILER $\cdot^{=}$ hipcc ..   
make -j 4 # AMDGPU target (ROCm >= 4.1)   
export HIP_PLATFORM=amd   
export HIP_PATH=/path/to/HIP/install   
cmake -D PKG_GPU=on -D GPU_API=HIP -D HIP_ARCH=gfx906 -D CMAKE_CXX $\hookrightarrow$ COMPILER=hipcc ..   
make -j 4 # CUDA target (not recommended, use GPU_API=cuda)   
# !!! DO NOT set CMAKE_CXX_COMPILER !!!   
export HIP_PLATFORM $\underline{{\underline{{\mathbf{\Pi}}}}}$ nvcc   
export HIP_PATH=/path/to/HIP/install   
export CUDA_PATH=/usr/local/cuda   
cmake -D PKG_GPU=on -D GPU_API=HIP -D HIP_ARCH $\equiv$ sm_70 .. make -j 4 # SPIR-V target (Intel GPUs)   
export HIP_PLATFORM $\underline{{\underline{{\mathbf{\Pi}}}}}$ spirv   
export HIP_PATH $\equiv$ /path/to/HIP/install   
export CMAKE_CXX_COMPILER=<hipcc/clang++> cmake -D PKG_GPU $\cong$ on -D GPU_API $\equiv$ HIP ..   
make -j 4  

# Traditional make  

Before building LAMMPS, you must build the GPU library in lib/gpu. You can do this manually if you prefer; follow the instructions in lib/gpu/README. Note that the GPU library uses MPI calls, so you must use the same MPI library (or the STUBS library) settings as the main LAMMPS code. This also applies to the -DLAMMPS_BIGBIG, -DLAMMPS_SMALLBIG, or -DLAMMPS_SMALLSMALL settings in whichever Makefile you use.  

You can also build the library in one step from the lammps/src dir, using a command like these, which simply invokes the lib/gpu/Install.py script with the specified args:  

# print help message make lib-gpu  

# build GPU library with default Makefile.linux make lib-gpu args="-b"  

# create new Makefile.xk7.single, altered for single-precision make lib-gpu args $=^{11}$ -m xk7 -p single -o xk7.single"  

# build GPU library with mixed precision and P100 using other settings in Makefile.mpi make lib-gpu args $=^{11}$ -m mpi -a sm_60 -p mixed -b"  

Note that this procedure starts with a Makefile.machine in lib/gpu, as specified by the -m switch. For your convenience, machine makefiles for “mpi” and “serial” are provided, which have the same settings as the corresponding machine makefiles in the main LAMMPS source folder. In addition you can alter 4 important settings in the Makefile.machine you start from via the corresponding -c, -a, -p, -e switches (as in the examples above), and also save a copy of the new Makefile if desired:  

• CUDA_ ${\mathrm{HOME}}=$ where NVIDIA CUDA software is installed on your system • CUDA_ $\mathrm{ARCH}=\mathrm{sm\_XX}$ , what GPU hardware you have, same as CMake GPU_ARCH above • CUDA_PRECISION $=$ precision (double, mixed, single) • EXTRAMAKE $=$ which Makefile.lammps.\* file to copy to Makefile.lammps  

The file Makefile.cuda is set up to include support for multiple GPU architectures as supported by the CUDA toolkit in use. This is done through using the --gencode flag, which can be used multiple times and thus support all GPU architectures supported by your CUDA compiler.  

To enable GPU binning via CUDA performance primitives set the Makefile variable CUDPP_OPT $=$ -DUSE_CUDPP -Icudpp_mini. This should not be used with most modern GPUs.  

To support the CUDA multiprocessor server you can set the define -DCUDA_MPS_SUPPORT. Please note that in this case you must not use the CUDA performance primitives and thus set the variable CUDPP_OPT to empty.  

The GPU library has some multi-thread support using OpenMP. You need to add the compiler flag that enables OpenMP to the CUDR_OPTS Makefile variable.  

If the library build is successful, 3 files should be created: lib/gpu/libgpu.a, lib/gpu/nvc_get_devices, and lib/ gpu/Makefile.lammps. The latter has settings that enable LAMMPS to link with CUDA libraries. If the settings in Makefile.lammps for your machine are not correct, the LAMMPS build will fail, and lib/gpu/Makefile.lammps may need to be edited.  

![](images/24ce5def3828fec9319e4d3cc4a5d3bc3787b120a67525e030734e6c36d31a98.jpg)  

# Note  

If you re-build the GPU library in lib/gpu, you should always uninstall the GPU package in lammps/src, then re-install it and re-build LAMMPS. This is because the compilation of files in the GPU package uses the library settings from the lib/gpu/Makefile.machine used to build the GPU library.  

# 3.7.3 KIM package  

To build with this package, the KIM library with API v2 must be downloaded and built on your system. It must include the KIM models that you want to use with LAMMPS.  

If you would like to use the kim query command, you also need to have libcurl installed with the matching development headers and the curl-config tool.  

If you would like to use the kim property command, you need to build LAMMPS with the PYTHON package installed and linked to Python 3.6 or later. See the PYTHON package build info for more details on this. After successfully building LAMMPS with Python, you also need to install the kim-property Python package, which can be easily done using pip as pip install kim-property, or from the conda-forge channel as conda install kim-property if LAMMPS is built in Conda. More detailed information is available at: kim-property installation.  

In addition to installing the KIM API, it is also necessary to install the library of KIM models (interatomic potentials). See Obtaining KIM Models to learn how to install a pre-build binary of the OpenKIM Repository of Models. See the list of all KIM models here: https://openkim.org/browse/models  

(Also note that when downloading and installing from source the KIM API library with all its models, may take a long time (tens of minutes to hours) to build. Of course you only need to do that once.)  

# CMake build  

-D DOWNLOAD_KIM=value # download OpenKIM API v2 for build # value = no (default) or yes   
-D LMP_DEBUG_CURL=value # set libcurl verbose mode on/off # value = off (default) or on   
-D LMP_NO_SSL_CHECK=value # tell libcurl to not verify the peer # value = no (default) or yes   
-D KIM_EXTRA_UNITTESTS=value # enables extra unit tests # value = no (default) or yes  

If DOWNLOAD_KIM is set to yes (or on), the KIM API library will be downloaded and built inside the CMake build directory. If the KIM library is already installed on your system (in a location where CMake cannot find it), you may need to set the PKG_CONFIG_PATH environment variable so that libkim-api can be found, or run the command source kim-api-activate.  

Extra unit tests can only be available if they are explicitly requested (KIM_EXTRA_UNITTESTS is set to yes (or on)) and the prerequisites are met. See KIM Extra unit tests for more details on this.  

# Traditional make  

You can download and build the KIM library manually if you prefer; follow the instructions in lib/ kim/README. You can also do this in one step from the lammps/src directory, using a command like these, which simply invokes the lib/kim/Install.py script with the specified args.  

# print help message make lib-kim  

# (re-)install KIM API lib with only example models make lib-kim args="-b"  

# ditto plus one model make lib-kim args="-b -a Glue_Ercolessi_Adams_Al__MO_324507536345_001"  

# install KIM API lib with all models make lib-kim args="-b -a everything"  

# add one model or model driver make lib-kim args="-n -a EAM_Dynamo_Ackland_W__MO_141627196590_002" $-$ $-$ $--$ # use an existing KIM API installation at the provided location make lib-kim args="-p <prefix>"  

# ditto but add one model or driver   
make lib-kim args="-p <prefix> -a EAM_Dynamo_Ackland_W__MO_141627196590 $\therefore002^{\mathfrak{N}}$  

When using the -b option, the KIM library is built using its native cmake build system. The lib/kim/ Install.py script supports a CMAKE environment variable if the cmake executable is named other than cmake on your system. Additional environment variables may be set with the make command for use by cmake. For example, to use the cmake3 executable and tell it to use the GNU version 11 compilers called $\mathrm{g}+\mathrm{-}11$ , gcc-11 and gfortran-11 to build KIM, one could use the following command.  

# (re-)install KIM API lib using cmake3 and gnu v11 compilers # with only example models CMAKE $\Longleftarrow$ cmake3 CXX=g++-11 CC $=$ gcc-11 FC $=$ gfortran-11 make lib-kim args="-b"  

Settings for debugging OpenKIM web queries discussed below need to be applied by adding them to the LMP_INC variable through editing the Makefile.machine you are using. For example:  

LMP_INC = -DLMP_NO_SSL_CHECK  

# Debugging OpenKIM web queries in LAMMPS  

If LMP_DEBUG_CURL is set, the libcurl verbose mode will be turned on, and any libcurl calls within the KIM web query display a lot of information about libcurl operations. You hardly ever want this set in production use, you will almost always want this when you debug or report problems.  

The libcurl library performs peer SSL certificate verification by default. This verification is done using a CA certificate store that the SSL library can use to make sure the peer’s server certificate is valid. If SSL reports an error (“certificate verify failed”) during the handshake and thus refuses further communicate with that server, you can set LMP_NO_SSL_CHECK to override that behavior. When LAMMPS is compiled with LMP_NO_SSL_CHECK set, libcurl does not verify the peer and connection attempts will succeed regardless of the names in the certificate. This option is insecure. As an alternative, you can specify your own CA cert path by setting the environment variable CURL_CA_BUNDLE to the path of your choice. A call to the KIM web query would get this value from the environment variable.  

# KIM Extra unit tests (CMake only)  

During development, testing, or debugging, if unit testing is enabled in LAMMPS, one can also enable extra tests on KIM commands by setting the KIM_EXTRA_UNITTESTS to yes (or on).  

Enabling the extra unit tests have some requirements,  

• It requires to have internet access.   
• It requires to have libcurl installed with the matching development headers and the curl-config tool.   
• It requires to build LAMMPS with the PYTHON package installed and linked to Python 3.6 or later. See the PYTHON package build info for more details on this.   
• It requires to have kim-property Python package installed, which can be easily done using pip as pip install kim-property, or from the conda-forge channel as conda install kim-property if LAMMPS is built in Conda. More detailed information is available at: kim-property installation.  

• It is also necessary to install the following KIM models:  

– EAM_Dynamo_MendelevAckland_2007v3_Zr__MO_004835508849_000   
– EAM_Dynamo_ErcolessiAdams_1994_Al__MO_123629422045_005   
– LennardJones612_UniversalShifted__MO_959249795837_003  

See Obtaining KIM Models to learn how to install a pre-built binary of the OpenKIM Repository of Models or see Installing KIM Models to learn how to install the specific KIM models.  

# 3.7.4 KOKKOS package  

Using the KOKKOS package requires choosing several settings. You have to select whether you want to compile with parallelization on the host and whether you want to include offloading of calculations to a device (e.g. a GPU). The default setting is to have no host parallelization and no device offloading. In addition, you can select the hardware architecture to select the instruction set. Since most hardware is backward compatible, you may choose settings for an older architecture to have an executable that will run on this and newer architectures.  

# Note  

If you run Kokkos on a different GPU architecture than what LAMMPS was compiled with, there will be a delay during device initialization while the just-in-time compiler is recompiling all GPU kernels for the new hardware. This is, however, only supported for GPUs of the same major hardware version and different minor hardware versions, e.g. 5.0 and 5.2 but not 5.2 and 6.0. LAMMPS will abort with an error message indicating a mismatch, if that happens.  

The settings discussed below have been tested with LAMMPS and are confirmed to work. Kokkos is an active project with ongoing improvements and projects working on including support for additional architectures. More information on Kokkos can be found on the Kokkos GitHub project.  

# Available Architecture settings  

These are the possible choices for the Kokkos architecture ID. They must be specified in uppercase.  

<html><body><table><tr><td>Arch-ID</td><td>HOST or GPU</td><td>Description</td></tr><tr><td>NATIVE</td><td>HOST</td><td>Local machine</td></tr><tr><td>AMDAVX</td><td>HOST</td><td>AMD chip</td></tr><tr><td>ARMV80</td><td>HOST</td><td>ARMv8.0 CompatibleCPU</td></tr><tr><td>ARMV81</td><td>HOST</td><td>ARMv8.1 Compatible CPU</td></tr><tr><td>ARMV8_THUNDERX</td><td>HOST</td><td>ARMv8 Cavium ThunderX CPU</td></tr><tr><td>ARMV8_THUNDERX2</td><td>HOST</td><td>ARMv8 Cavium ThunderX2 CPU</td></tr><tr><td>A64FX</td><td>HOST</td><td>ARMv8.2with SVE Support</td></tr><tr><td>ARMV9_GRACE</td><td>HOST</td><td>ARMv9 NVIDIA GraceCPU</td></tr><tr><td>SNB</td><td>HOST</td><td>Intel Sandy/Ivy Bridge CPUs</td></tr><tr><td>HSW</td><td>HOST</td><td>Intel Haswell CPUs</td></tr><tr><td>BDW</td><td>HOST</td><td>Intel Broadwell Xeon E-class CPUs</td></tr><tr><td>ICL</td><td>HOST</td><td>Intel Ice Lake Client CPUs (AVX512)</td></tr><tr><td>ICX</td><td>HOST</td><td>Intel Ice Lake Xeon Server CPUs (AVX512)</td></tr><tr><td>SKL</td><td>HOST</td><td>Intel Skylake Client CPUs</td></tr><tr><td>SKX</td><td>HOST</td><td>Intel Skylake Xeon Server CPUs (AVX512)</td></tr><tr><td>KNC</td><td>HOST</td><td>Intel Knights Corner Xeon Phi</td></tr><tr><td>KNL</td><td>HOST</td><td>Intel Knights Landing Xeon Phi</td></tr><tr><td>SPR</td><td>HOST</td><td>Intel Sapphire Rapids Xeon Server CPUs (AVX512)</td></tr><tr><td>POWER8</td><td>HOST</td><td>IBMPOWER8CPUs</td></tr><tr><td>POWER9</td><td>HOST</td><td>IBM POWER9 CPUs</td></tr><tr><td>ZEN</td><td>HOST</td><td>AMD Zen architecture</td></tr><tr><td>ZEN2</td><td>HOST</td><td>AMD Zen2 architecture</td></tr><tr><td>ZEN3</td><td>HOST</td><td>AMDZen3 architecture</td></tr><tr><td>RISCV_SG2042</td><td>HOST</td><td>SG2042 (RISC-V) CPUs</td></tr><tr><td>RISCV_RVA22V</td><td>HOST</td><td>RVA22V (RISC-V)CPUs</td></tr><tr><td>KEPLER30</td><td>GPU</td><td>NVIDIA Kepler generation CC 3.0</td></tr><tr><td>KEPLER32</td><td>GPU</td><td>NVIDIA Kepler generation CC 3.2</td></tr><tr><td>KEPLER35</td><td>GPU</td><td>NVIDIA Kepler generation CC 3.5</td></tr><tr><td>KEPLER37</td><td>GPU</td><td>NVIDIA Kepler generation CC 3.7</td></tr><tr><td>MAXWELL50</td><td>GPU</td><td>NVIDIA Maxwell generation CC 5.0</td></tr><tr><td>MAXWELL52</td><td>GPU</td><td>NVIDIA Maxwell generation CC 5.2</td></tr><tr><td>MAXWELL53</td><td>GPU</td><td>NVIDIA Maxwell generation CC 5.3</td></tr><tr><td>PASCAL60</td><td>GPU</td><td>NVIDIA Pascal generation CC 6.0</td></tr><tr><td>PASCAL61</td><td>GPU</td><td>NVIDIA Pascal generation CC 6.1</td></tr><tr><td>VOLTA70</td><td>GPU</td><td>NVIDIA Volta generation CC 7.0</td></tr><tr><td>VOLTA72</td><td>GPU</td><td>NVIDIA Volta generation CC 7.2</td></tr><tr><td>TURING75</td><td>GPU</td><td>NVIDIA Turing generation CC 7.5</td></tr><tr><td>AMPERE80</td><td>GPU</td><td>NVIDIA Ampere generation CC 8.0</td></tr><tr><td>AMPERE86</td><td>GPU</td><td>NVIDIA Ampere generation CC 8.6</td></tr><tr><td>ADA89</td><td>GPU</td><td>NVIDIA Ada generation CC 8.9</td></tr><tr><td>HOPPER90</td><td>GPU</td><td>NVIDIA Hopper generation CC 9.0</td></tr><tr><td>AMD_GFX906</td><td>GPU</td><td>AMD GPUMI50/60</td></tr><tr><td>AMD_GFX908</td><td>GPU</td><td>AMD GPU MI100</td></tr><tr><td>AMD_GFX90A</td><td>GPU</td><td>AMD GPU MI200</td></tr><tr><td>AMD_GFX940</td><td>GPU</td><td>AMD GPU MI300</td></tr><tr><td>AMD_GFX942</td><td>GPU</td><td>AMD GPUMI300</td></tr><tr><td>AMD_GFX942_APU</td><td>GPU</td><td>AMDAPUMI300A</td></tr><tr><td>AMD_GFX1030</td><td>GPU</td><td>AMDGPUV620/W6800</td></tr></table></body></html>

continues on next page  

Table 1 – continued from previous page   


<html><body><table><tr><td>AMDGFX1100</td><td>GPU AMDGPURX7900XTX</td></tr><tr><td>AMD_GFX1103</td><td>GPU AMDAPUPhoenix</td></tr><tr><td>INTEL_GEN GPU</td><td>SPIR64-based devices, e.g. Intel GPUs, using JIT</td></tr><tr><td>INTELDG1</td><td>GPU IntelIrisXeMAXGPU</td></tr><tr><td>INTELGEN9 GPU</td><td>Intel GPU Gen9</td></tr><tr><td>INTELGEN11 GPU</td><td>Intel GPU Gen11</td></tr><tr><td>INTELGEN12LP</td><td>GPU IntelGPUGen12LP</td></tr><tr><td>INTEL_XEHP GPU</td><td>Intel GPUXe-HP</td></tr><tr><td>INTEL_PVC</td><td>GPU IntelGPUPonteVecchio</td></tr></table></body></html>  

This list was last updated for version 4.5.1 of the Kokkos library.  

# Basic CMake build settings  

For multicore CPUs using OpenMP, set these 2 variables.  

-D Kokkos_ARCH_HOSTARCH $\underline{{\underline{{\mathbf{\Pi}}}}}$ yes # HOSTARCH $=$ HOST from list above   
-D Kokkos_ENABLE_OPENMP $\underline{{\underline{{\mathbf{\delta\pi}}}}}$ yes   
-D BUILD_OMP=yes  

Please note that enabling OpenMP for KOKKOS requires that OpenMP is also enabled for the rest of LAMMPS.  

For Intel KNLs using OpenMP, set these variables:  

-D Kokkos _ARCH_KNL=yes -D Kokkos_ENABLE_OPENMP=yes  

For NVIDIA GPUs using CUDA, set these variables:  

-D Kokkos_ARCH_HOSTARCH=yes # HOSTARCH = HOST from list above -D Kokkos_ARCH_GPUARCH=yes # GPUARCH = GPU from list above -D Kokkos_ENABLE_CUDA=yes   
-D Kokkos_ENABLE_OPENMP=yes  

This will also enable executing FFTs on the GPU, either via the internal KISSFFT library, or - by preference - with the cuFFT library bundled with the CUDA toolkit, depending on whether CMake can identify its location.  

For AMD or NVIDIA GPUs using HIP, set these variables:  

-D Kokkos_ARCH_HOSTARCH=yes # HOSTARCH = HOST from list above -D Kokkos_ARCH_GPUARCH=yes # GPUARCH = GPU from list above -D Kokkos_ENABLE_HIP=yes   
-D Kokkos_ENABLE_OPENMP=yes  

This will enable FFTs on the GPU, either by the internal KISSFFT library or with the hipFFT wrapper library, which will call out to the platform-appropriate vendor library: rocFFT on AMD GPUs or cuFFT on NVIDIA GPUs.  

For Intel GPUs using SYCL, set these variables:  

-D Kokkos_ARCH_HOSTARCH $\underline{{\underline{{\mathbf{\Pi}}}}}$ yes # HOSTARCH = HOST from list above   
-D Kokkos_ARCH_GPUARCH=yes # GPUARCH = GPU from list above   
-D Kokkos_ENABLE_SYCL=yes   
-D Kokkos_ENABLE_OPENMP=yes   
-D FFT_KOKKOS=MKL_GPU  

This will enable FFTs on the GPU using the oneMKL library.  

To simplify compilation, six preset files are included in the cmake/presets folder, kokkos-serial. cmake, kokkos-openmp.cmake, kokkos-cuda.cmake, kokkos-hip.cmake, kokkos-sycl-nvidia. cmake, and kokkos-sycl-intel.cmake. They will enable the KOKKOS package and enable some hardware choices. For GPU support those preset files must be customized to match the hardware used. So to compile with CUDA device parallelization with some common packages enabled, you can do the following:  

mkdir build-kokkos-cuda   
cd build-kokkos-cuda   
cmake -C ../cmake/presets/basic.cmake -C ../cmake/presets/kokkos-cuda.cmake ../cmake   
cmake --build .  

# Basic traditional make settings  

Choose which hardware to support in Makefile.machine via KOKKOS_DEVICES and KOKKOS_ARCH settings. See the src/MAKE/OPTIONS/Makefile.kokkos\* files for examples.  

For multicore CPUs using OpenMP:  

<html><body><table><tr><td>KOKKOS DEVICES = OpenMP</td></tr><tr><td>KOKKOSARCH=HOSTARCH HOSTARCH = HOST from list above</td></tr></table></body></html>  

For Intel KNLs using OpenMP:  

KOKKOS_DEVICES = OpenMP KOKKOS_ARCH = KNL  

For NVIDIA GPUs using CUDA:  

KOKKOS_DEVICES = Cuda   
KOKKOS_ARCH = HOSTARCH,GPUARCH # HOSTARCH = HOST from list above␣   
,→that is  

# hosting the GPU # GPUARCH = GPU from list above KOKKOS_CUDA_OPTIONS = "enable_lambda" FFT_INC $=$ -DFFT_CUFFT # enable use of cuFFT (optional) FFT_LIB $=$ -lcufft # link to cuFFT library  

For GPUs, you also need the following lines in your Makefile.machine before the CC line is defined. They tell mpicxx to use an nvcc compiler wrapper, which will use nvcc for compiling CUDA files and a $\mathrm{C}{+}{+}$ compiler for non-Kokkos, non-CUDA files.  

# For OpenMPI   
KOKKOS_ABSOLUTE_ $\mathrm{PATH}=\S(\mathrm{s}$ hell cd \$(KOKKOS_PATH); pwd)   
export OMPI_CXX = \$(KOKKOS_ABSOLUTE_PATH)/config/nvcc_wrapper   
CC $=$ mpicxx  

# For MPICH and derivatives KOKKOS_ABSOLUTE_PATH $=\S$ (shell cd \$(KOKKOS_PATH); pwd) CC = mpicxx -cxx=\$(KOKKOS_ABSOLUTE_PATH)/config/nvcc_wrap  

For AMD or NVIDIA GPUs using HIP:  

![](images/5a40c83d5bf42a9be4dbbe8707378e288f7828003fcf14480bcf720c50c80e87.jpg)  

# Advanced KOKKOS compilation settings  

There are other allowed options when building with the KOKKOS package that can improve performance or assist in debugging or profiling. Below are some examples that may be useful in combination with LAMMPS. For the full list (which keeps changing as the Kokkos package itself evolves), please consult the Kokkos library documentation.  

As alternative to using multi-threading via OpenMP (-DKokkos_ENABLE_OPENMP $\stackrel{.}{=}$ on or KOKKOS_DEVICES $=$ OpenMP) it is also possible to use Posix threads directly (-DKokkos_ENABLE_PTHREAD $^{1=}$ on or KOKKOS_DEVICES $=$ Pthread). While binding of threads to individual or groups of CPU cores is managed in OpenMP with environment variables, you need assistance from either the “hwloc” or “libnuma” library for the Pthread thread parallelization option. To enable use with CMake: -DKokkos_ENABLE_HWLOC $!=$ on or -DKokkos_ENABLE_LIBNUMA ${\underline{{=}}}\mathrm{{on}}$ ; and with conventional make: KOKKOS_USE_TPLS $\leftharpoondown$ hwloc or KOKKOS_USE_TPLS $\leftharpoondown$ libnuma.  

The CMake option -DKokkos_ENABLE_LIBRT $\stackrel{\cdot}{=}$ on or the makefile setting KOKKOS_USE_TPLS $=$ librt enables the use of a more accurate timer mechanism on many Unix-like platforms for internal profiling.  

The CMake option -DKokkos_ENABLE_DEBUG $=$ on or the makefile setting KOKKOS_DEBUG $\Longleftarrow$ yes enables printing of run-time debugging information that can be useful. It also enables runtime bounds checking on Kokkos data structures. As to be expected, enabling this option will negatively impact the performance and thus is only recommended when developing a Kokkos-enabled style in LAMMPS.  

The CMake option -DKokkos_ENABLE_CUDA_UVM $\underline{{\underline{{\mathbf{\Pi}}}}}$ on or the makefile setting KOKKOS_CUDA_OPTIONS $=$ enable_lambda,force_uvm enables the use of CUDA “Unified Virtual Memory” (UVM) in Kokkos. UVM allows to transparently use RAM on the host to supplement the memory used on the GPU (with some performance penalty) and thus enables running larger problems that would otherwise not fit into the RAM on the GPU.  

Please note, that the LAMMPS KOKKOS package must always be compiled with the enable_lambda option when using GPUs. The CMake configuration will thus always enable it.  

# 3.7.5 LEPTON package  

To build with this package, you must build the Lepton library which is included in the LAMMPS source distribution in the lib/lepton folder.  

# CMake build  

This is the recommended build procedure for using Lepton in LAMMPS. No additional settings are normally needed besides -D PKG_LEPTON $\cong$ yes.  

On $\mathrm{x}86$ hardware the Lepton library will also include a just-in-time compiler for faster execution. This is auto detected but can be explicitly disabled by setting -D LEPTON_ENABLE_JIT $\stackrel{\cdot}{=}$ no (or enabled by setting it to yes).  

# Traditional make  

Before building LAMMPS, one must build the Lepton library in lib/lepton.  

This can be done manually in the same folder by using or adapting one of the provided Makefiles: for example, Makefile.serial for the GNU $\mathrm{C}{+}{+}$ compiler, or Makefile.mpi for the MPI compiler wrapper. The Lepton library is written in $\mathrm{C}{+}{+}{-}11$ and thus the $\mathrm{C}{+}{+}$ compiler may need to be instructed to enable support for that.  

In general, it is safer to use build setting consistent with the rest of LAMMPS. This is best carried out from the LAMMPS src directory using a command like these, which simply invokes the lib/lepton Install.py script with the specified args:  

$\#$ print help message make lib-lepton  

# build with GNU $\mathrm{g}{+}{+}$ compiler (settings as with "make serial") make lib-lepton args $=^{11}$ -m serial"  

# build with default MPI compiler (settings as with "make mpi") make lib-lepton args $=^{11}$ -m mpi"  

The “machine” argument of the -m flag is used to find a Makefile.machine to use as build recipe.  

The build should produce a build folder and the library lib/lepton/liblmplepton.a  

# 3.7.6 MACHDYN package  

To build with this package, you must download the Eigen3 library. Eigen3 is a template library, so you do not need to build it.  

<html><body><table><tr><td>CMakebuild</td></tr><tr><td>-D] DOWNLOAD EIGEN3 download Eigen3,value no default or yes D EIGEN3 INCLUDE DIR=path path to Eigen library (only r needed if a</td></tr><tr><td>custom location IfDOWNLOAD EIGEN3 is set, the Eigen3 library will be downloaded and inside the CMake build</td></tr></table></body></html>  

directory. If the Eigen3 library is already on your system (in a location where CMake cannot find it), set EIGEN3_INCLUDE_DIR to the directory the Eigen3 include file is in.  

# Traditional make  

You can download the Eigen3 library manually if you prefer; follow the instructions in lib/machdyn/ README. You can also do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib/machdyn/Install.py script with the specified args:  

# print help message make lib-machdyn  

# download to lib/machdyn/eigen3 make lib-machdyn args="-b"  

# use existing Eigen installation in /usr/include/eigen3 make lib-machdyn args $=^{11}$ -p /usr/include/eigen3"  

Note that a symbolic (soft) link named includelink is created in lib/machdyn to point to the Eigen dir.   
When LAMMPS builds it will use this link. You should not need to edit the lib/machdyn/Makefile.   
lammps file.  

# 3.7.7 ML-IAP package  

Building the ML-IAP package requires including the ML-SNAP package. There will be an error message if this requirement is not satisfied. Using the mliappy model also requires enabling Python support, which in turn requires to include the PYTHON package and requires to have the cython software installed and with it a working cythonize command. This feature requires compiling LAMMPS with Python version 3.6 or later.  

# CMake build  

-D MLIAP_ENABLE_PYTHON=value # enable mliappy model (default is autodetect)  

Without this setting, CMake will check whether it can find a suitable Python version and the cythonize command and choose the default accordingly. During the build procedure the provided .pyx file(s) will be automatically translated to $\mathrm{C}{+}{+}$ code and compiled. Please do not run cythonize manually in the src/ML-IAP folder, as that can lead to compilation errors if Python support is not enabled. If you did it by accident, please remove the generated .cpp and .h files.  

# $\Theta$ Traditional make  

The build uses the lib/python/Makefile.mliap_python file in the compile/link process to add a rule to update the files generated by the cythonize command in case the corresponding .pyx file(s) were modified. You may need to modify lib/python/Makefile.lammps if the LAMMPS build fails.  

To enable building the ML-IAP package with Python support enabled, you need to add -DMLIAP_PYTHON to the LMP_INC variable in your machine makefile. You may have to manually run the cythonize command on .pyx file(s) in the src folder, if this is not automatically done  

during installing the ML-IAP package. Please do not run cythonize in the src/ML-IAP folder, as that can lead to compilation errors if Python support is not enabled. If you did this by accident, please remove the generated .cpp and .h files.  

# 3.7.8 OPT package  

# CMake build  

No additional settings are needed besides -D PKG_OPT=yes  

![](images/4626a210003a018d1c21cc0d7a82ebfc82214c1f5cb33562490310807f21ecaa.jpg)  

# Traditional make  

The compiler flag -restrict must be used to build LAMMPS with the OPT package when using Intel compilers. It should be added to the CCFLAGS line of your Makefile.machine. See src/MAKE OPTIONS/Makefile.opt for an example.  

# 3.7.9 POEMS package  

![](images/d8e116ab7bee693d5feb5022ce2379877de7f257c94c91680a0f1af978bd9957.jpg)  

# CMake build  

No additional settings are needed besides -D PKG_OPT $\underline{{\underline{{\mathbf{\Pi}}}}}$ yes  

# Traditional make  

Before building LAMMPS, you must build the POEMS library in lib/poems. You can do this manually if you prefer; follow the instructions in lib/poems/README. You can also do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib/poems/Install.py script with the specified args:  

# print help message make lib-poems  

# build with GNU $\mathrm{g}{+}{+}$ compiler (settings as with "make serial") make lib-poems args $|=^{11}$ -m serial"  

# build with default MPI C++ compiler (settings as with "make mpi") make lib-poems args $=^{11}$ -m mpi"  

# build with Intel Classic compiler make lib-poems args $=^{11}$ -m icc"  

The build should produce two files: lib/poems/libpoems.a and lib/poems/Makefile.lammps. The latter is copied from an existing Makefile.lammps.\* and has settings needed to build LAMMPS with the POEMS library (though typically the settings are just blank). If necessary, you can edit/create a new lib/poems/Makefile.machine file for your system, which should define an EXTRAMAKE variable to specify a corresponding Makefile.lammps.machine file.  

# 3.7.10 PYTHON package  

Building with the PYTHON package requires you have a the Python development headers and library available on your system, which needs to be a Python 2.7 version or a Python 3.x version. Since support for Python 2.x has ended, using Python 3.x is strongly recommended. See lib/python/README for additional details.  

![](images/900f88608dd72c7278ece09bd9a4572791b6e8396f57b455489c073deb661370.jpg)  

# CMake build  

-D Python_EXECUTABLE=path # path to Python executable to use  

Without this setting, CMake will guess the default Python version on your system. To use a different Python version, you can either create a virtualenv, activate it and then run cmake. Or you can set the Python_EXECUTABLE variable to specify which Python interpreter should be used. Note note that you will also need to have the development headers installed for this version, e.g. python2-devel.  

# Traditional make  

The build uses the lib/python/Makefile.lammps file in the compile/link process to find Python. You should only need to create a new Makefile.lammps.\* file (and copy it to Makefile.lammps) if the LAMMPS build fails.  

# 3.7.11 VORONOI package  

To build with this package, you must download and build the Voro $^{++}$ library or install a binary package provided by your operating system.  

# CMake build  

-D DOWNLOAD_VORO=value # download Voro++ for build # value = no (default) or yes   
-D VORO_LIBRARY=path # Voro++ library file # (only needed if at custom location)   
-D VORO_INCLUDE_DIR=path # Voro++ include directory # (only needed if at custom location)  

If DOWNLOAD_VORO is set, the $\mathrm{Voro++}$ library will be downloaded and built inside the CMake build directory. If the $\mathrm{Voro++}$ library is already on your system (in a location CMake cannot find it), VORO_LIBRARY is the filename (plus path) of the $\mathrm{Voro++}$ library file, not the directory the library file is in. VORO_INCLUDE_DIR is the directory the $\mathrm{Voro}{+}+$ include file is in.  

# Traditional make  

You can download and build the $\mathrm{Voro}{+}+$ library manually if you prefer; follow the instructions in lib/ voronoi/README. You can also do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib/voronoi/Install.py script with the specified args:  

# print help message make lib-voronoi  

# download and build the default version in lib/voronoi/voro++-<version> make lib-voronoi arg $|=^{11}$ -b"  

# use existing Voro $^{++}$ installation in \$HOME/voro++ make lib-voronoi args="-p \$HOME/voro $^{++}$ "  

# download and build the 0.4.6 version in lib/voronoi/voro++-0.4.6 make lib-voronoi arg $|=^{11}$ -b -v voro++0.4.6"  

Note that two symbolic (soft) links, includelink and liblink, are created in lib/voronoi to point to the $\mathrm{Voro++}$ source dir. When LAMMPS builds in src it will use these links. You should not need to edit the lib/voronoi/Makefile.lammps file.  

# 3.7.12 ADIOS package  

The ADIOS package requires the ADIOS I/O library, version 2.3.1 or newer. Make sure that you have ADIOS built either with or without MPI to match if you build LAMMPS with or without MPI. ADIOS compilation settings for LAMMPS are automatically detected, if the PATH and LD_LIBRARY_PATH environment variables have been updated for the local ADIOS installation and the instructions below are followed for the respective build systems.  

# CMake build  

-D ADIOS2_DIR=path # path is where ADIOS 2.x is installed -D PKG_ADIOS=yes  

# Traditional make  

Turn on the ADIOS package before building LAMMPS. If the ADIOS 2.x software is installed in PATH, there is nothing else to do:  

![](images/ffb344a54cf54de0825d3e8e3d277fe51c735075210c12da7f58f417491eaef2.jpg)  

otherwise, set ADIOS2_DIR environment variable when turning on the package:  

ADIOS2_DIR=path make yes-adios # path is where ADIOS 2.x is installed  

# 3.7.13 ATC package  

The ATC package requires the MANYBODY package also be installed.  

# CMake build  

No additional settings are needed besides -D PKG_ATC $=$ yes and -D PKG_MANYBODY $\cong$ yes.  

![](images/f427eb651c82663950bb6ff58222dfe012bab7fadbe309b7f430bacc81598b54.jpg)  

# Traditional make  

Before building LAMMPS, you must build the ATC library in lib/atc. You can do this manually if you prefer; follow the instructions in lib/atc/README. You can also do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib/atc/Install.py script with the specified args:  

# print help message make lib-atc  

# build with GNU $\mathrm{g}{+}{+}$ compiler and MPI STUBS (settings as with "make serial") make lib-atc args $=^{11}$ -m serial"  

# build with default MPI compiler (settings as with "make mpi") make lib-atc args="-m mpi"  

# build with Intel Classic compiler make lib-atc args="-m icc"  

The build should produce two files: lib/atc/libatc.a and lib/atc/Makefile.lammps. The latter is copied from an existing Makefile.lammps.\* and has settings needed to build LAMMPS with the ATC library. If necessary, you can edit/create a new lib/atc/Makefile.machine file for your system, which should define an EXTRAMAKE variable to specify a corresponding Makefile.lammps. $<$ <machine> file.  

Note that the Makefile.lammps file has settings for the BLAS and LAPACK linear algebra libraries. As explained in lib/atc/README these can either exist on your system, or you can use the files provided in lib/linalg. In the latter case you also need to build the library in lib/linalg with a command like these:  

# print help message make lib-linalg  

# build with GNU C++ compiler (settings as with "make serial") make lib-linalg args $|=^{11}$ -m serial"  

# build with default MPI C++ compiler (settings as with "make mpi") make lib-linalg args="-m mpi"  

# build with GNU Fortran compiler make lib-linalg args="-m g++"  

# 3.7.14 AWPMD package  

# CMake build  

No additional settings are needed besides -D PKG_AQPMD $=$ yes.  

# Traditional make  

Before building LAMMPS, you must build the AWPMD library in lib/awpmd. You can do this manually if you prefer; follow the instructions in lib/awpmd/README. You can also do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib/awpmd/Install.py script with the specified args:  

# print help message make lib-awpmd  

# build with GNU $\mathrm{g}{+}{+}$ compiler and MPI STUBS (settings as with "make serial") make lib-awpmd args $=^{11}$ -m serial"  

# build with default MPI compiler (settings as with "make mpi") make lib-awpmd args="-m mpi"  

# build with Intel Classic compiler make lib-awpmd args $=^{11}$ -m icc"  

The build should produce two files: lib/awpmd/libawpmd.a and lib/awpmd/Makefile.lammps. The latter is copied from an existing Makefile.lammps.\* and has settings needed to build LAMMPS with the AWPMD library. If necessary, you can edit/create a new lib/awpmd/Makefile.machine file for your system, which should define an EXTRAMAKE variable to specify a corresponding Makefile. lammps. $<$ machine> file.  

Note that the Makefile.lammps file has settings for the BLAS and LAPACK linear algebra libraries. As explained in lib/awpmd/README these can either exist on your system, or you can use the files provided in lib/linalg. In the latter case you also need to build the library in lib/linalg with a command like these:  

# print help message make lib-linalg  

# build with GNU $\mathrm{C}++$ compiler (settings as with "make serial") make lib-linalg args="-m serial"  

# build with default MPI C++ compiler (settings as with "make mpi") make lib-linalg args="-m mpi"  

# build with GNU C++ compiler make lib-linalg args="-m g++"  

# 3.7.15 COLVARS package  

This package enables the use of the Colvars module included in the LAMMPS source distribution.  

# CMake build  

This is the recommended build procedure for using Colvars in LAMMPS. No additional settings are normally needed besides -D PKG_COLVARS $=$ yes.  

# Traditional make  

As with other libraries distributed with LAMMPS, the Colvars library needs to be built before building the LAMMPS program with the COLVARS package enabled.  

From the LAMMPS src directory, this is most easily and safely done via one of the following commands, which implicitly rely on the lib/colvars/Install.py script with optional arguments:  

# print help message make lib-colvars  

# build with GNU $\mathrm{g}{+}{+}$ compiler (settings as with "make serial") make lib-colvars args $=^{11}$ -m serial"  

# build with default MPI compiler (settings as with "make mpi") make lib-colvars args $=^{11}$ -m mpi"  

# build with GNU $\mathrm{g}{+}{+}$ compiler and colvars debugging enabled make lib-colvars args $=^{11}$ -m g++-debug"  

The “machine” argument of the “-m” flag is used to find a Makefile.machine file to use as build recipe. If such recipe does not already exist in lib/colvars, suitable settings will be auto-generated consistent with those used in the core LAMMPS makefiles.  

Changed in version 8Feb2023.  

Please note that Colvars uses the Lepton library, which is now included with the LEPTON package; if you use anything other than the make lib-colvars command, please make sure to build Lepton beforehand.  

Optional flags may be specified as environment variables:  

# Build with debug code (much slower) COLVARS_DEBUG $=$ yes make lib-colvars args $=^{11}$ -m machine"  

# Build without Lepton (included otherwise) COLVARS_LEPTON=no make lib-colvars args $|=^{11}$ -m machine"  

The build should produce two files: the library lib/colvars/libcolvars.a and the specification file lib/ colvars/Makefile.lammps. The latter is auto-generated, and normally does not need to be edited.  

# 3.7.16 ELECTRODE package  

This package depends on the KSPACE package.  

# CMake build  

-D PKG_ELECTRODE=yes # enable the package itself -D PKG_KSPACE=yes # the ELECTRODE package requires KSPACE -D USE_INTERNAL_LINALG=value #  

Features in the ELECTRODE package are dependent on code in the KSPACE package so the latter one must be enabled.  

The ELECTRODE package also requires LAPACK (and BLAS) and CMake can identify their locations and pass that info to the ELECTRODE build script. But on some systems this may cause problems when linking or the dependency is not desired. Try enabling USE_INTERNAL_LINALG in those cases to use the bundled linear algebra library and work around the limitation.  

# $\Theta$ Traditional make  

Before building LAMMPS, you must configure the ELECTRODE support libraries and settings in lib/ electrode. You can do this manually, if you prefer, or do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib/electrode/Install.py script with the specified args:  

# print help message make lib-electrode  

# build with GNU $\mathrm{g}{+}{+}$ compiler and MPI STUBS (settings as with "make serial") make lib-electrode args $=^{11}$ -m serial"  

# build with default MPI compiler (settings as with "make mpi") make lib-electrode args $=^{11}$ -m mpi"  

Note that the Makefile.lammps file has settings for the BLAS and LAPACK linear algebra libraries. These can either exist on your system, or you can use the files provided in lib/linalg. In the latter case you also need to build the library in lib/linalg with a command like these:  

$\#$ print help message make lib-linalg  

# build with GNU C++ compiler (settings as with "make serial") make lib-linalg args $=^{11}$ -m serial"  

# build with default MPI C++ compiler (settings as with "make mpi") make lib-linalg args="-m mpi"  

# build with GNU C++ compiler make lib-linalg args="-m g++"  

The package itself is activated with make yes-KSPACE and make yes-ELECTRODE  

# 3.7.17 ML-PACE package  

This package requires a library that can be downloaded and built in lib/pace or somewhere else, which must be done before building LAMMPS with this package. The code for the library can be found at: https://github.com/ICAMS/ lammps-user-pace/  

Instead of including the ML-PACE package directly into LAMMPS, it is also possible to skip this step and build the ML-PACE package as a plugin using the CMake script files in the examples/PACKAGE/pace/plugin folder and then load this plugin at runtime with the plugin command.  

![](images/7d6d11f9b5fea3660808aa0e483592d3c33e20106775a9d4f7d4769e77b9bab6.jpg)  

# CMake build  

By default the library will be downloaded from the git repository and built automatically when the ML-PACE package is enabled with -D PKG_ML-PACE $=$ yes. The location for the sources may be customized by setting the variable PACELIB_URL when configuring with CMake (e.g. to use a local archive on machines without internet access). Since CMake checks the validity of the archive with md5sum you may also need to set PACELIB_MD5 if you provide a different library version than what is downloaded automatically.  

# $\Theta$ Traditional make  

You can download and build the ML-PACE library in one step from the lammps/src dir, using these commands, which invoke the lib/pace/Install.py script.  

# print help message make lib-pace  

# download and build the default version in lib/pace make lib-pace args $=^{11}{-}\mathrm{b}^{\prime}$  

You should not need to edit the lib/pace/Makefile.lammps file.  

# 3.7.18 ML-POD package  

# CMake build  

No additional settings are needed besides -D PKG_ML-POD $^{1}=$ yes.  

#  Traditional make  

Before building LAMMPS, you must configure the ML-POD support settings in lib/mlpod. You can do this manually, if you prefer, or do it in one step from the lammps/src dir, using a command like the following, which simply invoke the lib/mlpod/Install.py script with the specified args:  

# print help message make lib-mlpod  

# build with GNU $\mathrm{g}{+}{+}$ compiler and MPI STUBS (settings as with "make serial") make lib-mlpod args $=^{11}$ -m serial"  

# build with default MPI compiler (settings as with "make mpi") make lib-mlpod args $=^{11}$ -m mpi"  

# same as above but use the bundled linalg lib make lib-mlpod args $=^{11}$ -m mpi -e linalg"  

Note that the Makefile.lammps file has settings to use the BLAS and LAPACK linear algebra libraries. These can either exist on your system, or you can use the files provided in lib/linalg. In the latter case you also need to build the library in lib/linalg with a command like these:  

# print help message make lib-linalg  

# build with GNU $\mathrm{C}++$ compiler (settings as with "make serial") make lib-linalg args="-m serial"  

# build with default MPI C++ compiler (settings as with "make mpi") make lib-linalg args $|=^{11}$ -m mpi"  

# build with GNU C++ compiler make lib-linalg args $|=^{11}$ -m g++"  

The package itself is activated with make yes-ML-POD.  

# 3.7.19 ML-QUIP package  

To build with this package, you must download and build the QUIP library. It can be obtained from GitHub. For support of GAP potentials, additional files with specific licensing conditions need to be downloaded and configured. The automatic download will from within CMake will download the non-commercial use version.  

# CMake build  

-D DOWNLOAD_QUIP=value # download QUIP library for build # value = no (default) or yes   
-D QUIP_LIBRARY=path # path to libquip.a # (only needed if a custom location)   
-D USE_INTERNAL_LINALG=value # Use the internal linear algebra library # instead of LAPACK # value = no (default) or yes  

CMake will try to download and build the QUIP library from GitHub, if it is not found on the local machine. This requires to have git installed. It will use the same compilers and flags as used for compiling LAMMPS. Currently this is only supported for the GNU and the Intel compilers. Set the QUIP_LIBRARY variable if you want to use a previously compiled and installed QUIP library and CMake cannot find it.  

The QUIP library requires LAPACK (and BLAS) and CMake can identify their locations and pass that info to the QUIP build script. But on some systems this triggers a (current) limitation of CMake and the configuration will fail. Try enabling USE_INTERNAL_LINALG in those cases to use the bundled linear algebra library and work around the limitation.  

# Traditional make  

The download/build procedure for the QUIP library, described in lib/quip/README file requires setting two environment variables, QUIP_ROOT and QUIP_ARCH. These are accessed by the lib/quip/Makefile.lammps file which is used when you compile and link LAMMPS with this package. You should only need to edit Makefile.lammps if the LAMMPS build can not use its settings to successfully build on your system.  

# 3.7.20 PLUMED package  

Before building LAMMPS with this package, you must first build PLUMED. PLUMED can be built as part of the LAMMPS build or installed separately from LAMMPS using the generic PLUMED installation instructions. The PLUMED package has been tested to work with Plumed versions 2.4.x, 2.5.x, and 2.6.x and will error out, when trying to run calculations with a different version of the Plumed kernel.  

PLUMED can be linked into MD codes in three different modes: static, shared, and runtime. With the “static” mode, all the code that PLUMED requires is linked statically into LAMMPS. LAMMPS is then fully independent from the PLUMED installation, but you have to rebuild/relink it in order to update the PLUMED code inside it. With the “shared” linkage mode, LAMMPS is linked to a shared library that contains the PLUMED code. This library should preferably be installed in a globally accessible location. When PLUMED is linked in this way the same library can be used by multiple MD packages. Furthermore, the PLUMED library LAMMPS uses can be updated without the need for a recompile of LAMMPS for as long as the shared PLUMED library is ABI-compatible.  

The third linkage mode is “runtime” which allows the user to specify which PLUMED kernel should be used at runtime by using the PLUMED_KERNEL environment variable. This variable should point to the location of the libplumedKernel.so dynamical shared object, which is then loaded at runtime. This mode of linking is particularly convenient for doing PLUMED development and comparing multiple PLUMED versions as these sorts of comparisons can be done without recompiling the hosting MD code. All three linkage modes are supported by LAMMPS on selected operating systems (e.g. Linux) and using either CMake or traditional make build. The “static” mode should be the most portable, while the “runtime” mode support in LAMMPS makes the most assumptions about operating system and compiler environment. If one mode does not work, try a different one, switch to a different build system, consider a global PLUMED installation or consider downloading PLUMED during the LAMMPS build.  

Instead of including the PLUMED package directly into LAMMPS, it is also possible to skip this step and build the PLUMED package as a plugin using the CMake script files in the examples/PACKAGE/plumed/plugin folder and then load this plugin at runtime with the plugin command.  

# CMake build  

When the -D PKG_PLUMED $^{1=}$ yes flag is included in the cmake command you must ensure that the GNU Scientific Library (GSL) <https://www.gnu.org/software $\it{\Delta}q_{\it S}U>$ is installed in locations that are accessible in your environment. There are then two additional variables that control the manner in which PLUMED is obtained and linked into LAMMPS.  

-D DOWNLOAD_PLUMED $=$ value # download PLUMED for build # value = no (default) or yes   
-D PLUMED_MODE=value # Linkage mode for PLUMED # value = static (default), shared, # or runtime  

If DOWNLOAD_PLUMED is set to yes, the PLUMED library will be downloaded (the version of PLUMED that will be downloaded is hard-coded to a vetted version of PLUMED, usually a recent stable release version) and built inside the CMake build directory. If DOWNLOAD_PLUMED is set to “no” (the default), CMake will try to detect and link to an installed version of PLUMED. For this to work, the PLUMED library has to be installed into a location where the pkg-config tool can find it or the PKG_CONFIG_PATH environment variable has to be set up accordingly. PLUMED should be installed in such a location if you compile it using the default make; make install commands.  

The PLUMED_MODE setting determines the linkage mode for the PLUMED library. The allowed values for this flag are “static” (default), “shared”, or “runtime”. If you want to switch the linkage mode, just re-run CMake with a different setting. For a discussion of PLUMED linkage modes, please see above. When DOWNLOAD_PLUMED is enabled the static linkage mode is recommended.  

# Traditional make  

PLUMED needs to be installed before the PLUMED package is installed so that LAMMPS can find the right settings when compiling and linking the LAMMPS executable. You can either download and build PLUMED inside the LAMMPS plumed library folder or use a previously installed PLUMED library and point LAMMPS to its location. You also have to choose the linkage mode: “static” (default), “shared” or “runtime”. For a discussion of PLUMED linkage modes, please see above.  

Download/compilation/configuration of the plumed library can be done from the src folder through the following make args:  

# print help message make lib-plumed  

# download and build PLUMED in lib/plumed/plumed2 make lib-plumed args $=^{11}$ -b"  

# use existing PLUMED installation in \$HOME/.local make lib-plumed args $=^{11}$ -p \$HOME/.local"  

# use existing PLUMED installation in /usr/local and # use shared linkage mode make lib-plumed args $=^{11}$ -p /usr/local -m shared"  

Note that two symbolic (soft) links, includelink and liblink are created in lib/plumed that point to the location of the PLUMED build to use. A new file lib/plumed/Makefile.lammps is also created with settings suitable for LAMMPS to compile and link PLUMED using the desired linkage mode. After this step is completed, you can install the PLUMED package and compile LAMMPS in the usual manner:  

make yes-plumed make machine  

Once this compilation completes you should be able to run LAMMPS in the usual way. For shared linkage mode, libplumed.so must be found by the LAMMPS executable, which on many operating systems means, you have to set the LD_LIBRARY_PATH environment variable accordingly.  

Support for the different linkage modes in LAMMPS varies for different operating systems, using the static linkage is expected to be the most portable, and thus set to be the default.  

If you want to change the linkage mode, you have to re-run make lib-plumed with the desired settings and do a re-install if the PLUMED package with make yes-plumed to update the required makefile settings with the changes in the lib/plumed folder.  

# 3.7.21 H5MD package  

To build with this package you must have the HDF5 software package installed on your system, which should include the h5cc compiler and the HDF5 library.  

# CMake build  

No additional settings are needed besides -D PKG_H5MD $^{1=}$ yes.  

This should auto-detect the H5MD library on your system. Several advanced CMake H5MD options exist if you need to specify where it is installed. Use the ccmake (terminal window) or cmake-gui (graphical) tools to see these options and set them interactively from their user interfaces.  

# Traditional make  

Before building LAMMPS, you must build the CH5MD library in lib/h5md. You can do this manually if you prefer; follow the instructions in lib/h5md/README. You can also do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib/h5md/Install.py script with the specified args:  

make lib-h5md # print help message make lib-h5md args $=^{11}$ -m h5cc" # build with h5cc compiler  

The build should produce two files: lib/h5md/libch5md.a and lib/h5md/Makefile.lammps. The latter is copied from an existing Makefile.lammps.\* and has settings needed to build LAMMPS with the system HDF5 library. If necessary, you can edit/create a new lib/h5md/Makefile.machine file for your system, which should define an EXTRAMAKE variable to specify a corresponding Makefile. lammps. $<$ machine $>$ file.  

# 3.7.22 ML-HDNNP package  

To build with the ML-HDNNP package it is required to download and build the external $\mathrm{n}2\mathrm{p}2$ library v2.1.4 (or higher). The LAMMPS build process offers an automatic download and compilation of $n2p2$ or allows you to choose the installation directory of $n2p2$ manually. Please see the boxes below for the CMake and traditional build system for detailed information.  

In case of a manual installation of $n2p2$ you only need to build the $n2p2$ core library libnnp and interface library libnnpif. When using GCC it should suffice to execute make libnnpif in the $n2p2$ src directory. For more details please see lib/hdnnp/README and the $\mathrm{n}2\mathrm{p}2$ build documentation.  

<html><body><table><tr><td>CMakebuild</td></tr><tr><td>-DDOWNLOADN2P2=value # download n2p2 for build value = no (default) or yes -DN2P2_DIR=path # n2p2 base directory # (only needed if a custom location)</td></tr><tr><td>If DOWNLOAD _N2P2 is set, the n2p2 library will be downloaded and built inside the CMake build directory. If the n2p2 library is already on your system (in a location CMake cannot find it), set the N2P2_DIR to path where n2p2 is located. If n2p2 is located directly in lib/hdnnp/n2p2 it will be automaticallyfoundbyCMake.</td></tr></table></body></html>  

# Traditional make  

You can download and build the $n2p2$ library manually if you prefer; follow the instructions in lib/ hdnnp/README. You can also do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib/hdnnp/Install.py script with the specified args:  

# print help message make lib-hdnnp  

# download and build in lib/hdnnp/n2p2-... make lib-hdnnp args="-b"  

# download and build specific version make lib-hdnnp args $=^{11}$ -b -v 2.1.4"  

# use the existing n2p2 installation in /usr/local/n2p2 make lib-hdnnp args $=^{11}$ -p /usr/local/n2p2"  

Note that three symbolic (soft) links, includelink, liblink and Makefile.lammps, will be created in lib/hdnnp to point to n2p2/include, n2p2/lib and n2p2/lib/Makefile.lammps-extra, respectively. When LAMMPS is built in src it will use these links.  

# 3.7.23 INTEL package  

To build with this package, you must choose which hardware you want to build for, either $\mathrm{x}86$ CPUs or Intel KNLs in offload mode. You should also typically install the OPENMP package, as it can be used in tandem with the INTEL package to good effect, as explained on the INTEL package page.  

When using Intel compilers version 16.0 or later is required. You can also use the GNU or Clang compilers and they will provide performance improvements over regular styles and OPENMP styles, but less so than with the Intel compilers. Please also note, that some compilers have been found to apply memory alignment constraints incompletely or incorrectly and thus can cause segmentation faults in otherwise correct code when using features from the INTEL package.  

# CMake build  

-D INTEL_ARCH=value # value = cpu (default) or knl -D INTEL_LRT_MODE=value # value $=$ threads, none, or c++11  

# $\Theta$ Traditional make  

Choose which hardware to compile for in Makefile.machine via the following settings. See src/ MAKE/OPTIONS/Makefile.intel_cpu\* and Makefile.knl files for examples. and src/INTEL/ README for additional information.  

# For CPUs:  

OPTFLAGS $=$ -xHost -O2 -fp-model fast $\mathrm{=}2$ -no-prec-div -qoverride-limits -qopt-zmm  
$\hookrightarrow$ usage=high   
CCFLAGS $=$ -g -qopenmp -DLAMMPS_MEMALIGN=64 -no-offload -fno-alias -ansi  
$\hookrightarrow$ alias -restrict \$(OPTFLAGS)   
LINKFLAGS = -g -qopenmp \$(OPTFLAGS)   
LIB = -ltbbmalloc  

# For KNLs:  

OPTFLAGS = -xMIC-AVX512 -O2 -fp-model fast $\mathrm{=}2$ -no-prec-div -qoverride-limits   
CCFLAGS $=$ -g -qopenmp -DLAMMPS_MEMALIGN=64 -no-offload -fno-alias -ansi  
$\hookrightarrow$ alias -restrict \$(OPTFLAGS)   
LINKFLAGS = -g -qopenmp \$(OPTFLAGS)   
LIB = -ltbbmalloc  

In Long-range thread mode (LRT) a modified verlet style is used, that operates the Kspace calculation in a separate thread concurrently to other calculations. This has to be enabled in the package intel command at runtime. With the setting “threads” it used the pthreads library, while $^{66}\mathrm{c}{+}{+}11^{\mathrm{}}{}^{\mathrm{}}$ will use the built-in thread support of $\mathrm{C}{+}{+}11$ compilers. The option “none” skips compilation of this feature. The default is to use “threads” if pthreads is available and otherwise “none”.  

Best performance is achieved with Intel hardware, Intel compilers, as well as the Intel TBB and MKL libraries. However, the code also compiles, links, and runs with other compilers / hardware and without TBB and MKL.  

# 3.7.24 MDI package  

# CMake build  

-D DOWNLOAD_MDI=value # download MDI Library for build # value = no (default) or yes  

# Traditional make  

Before building LAMMPS, you must build the MDI Library in lib/mdi. You can do this by executing a command like one of the following from the lib/mdi directory:  

python Install.py -m gcc # build using gcc compiler python Install.py -m icc # build using icc compiler  

The build should produce two files: lib/mdi/includelink/mdi.h and lib/mdi/liblink/libmdi.so.  

# 3.7.25 MISC package  

The fix imd style in this package can be run either synchronously (communication with IMD clients is done in the main process) or asynchronously (the fix spawns a separate thread that can communicate with IMD clients concurrently to the LAMMPS execution).  

![](images/228a2308c685437713efd4601d3008260d3e6e0e454b0e22b0fdb8038003fb82.jpg)  

# CMake build  

-D LAMMPS_ASYNC_IMD $=$ value # Run IMD server asynchronously # value = no (default) or yes  

# Traditional make  

To enable asynchronous mode the -DLAMMPS_ASYNC_IMD define needs to be added to the LMP_INC variable in the Makefile.machine you are using. For example:  

LMP_INC = -DLAMMPS_ASYNC_IMD -DLAMMPS_MEMALIGN=64  

# 3.7.26 MOLFILE package  

# CMake build  

-D MOLFILE_INCLUDE_DIR=path # (optional) path where VMD molfile # plugin headers are installed   
-D PKG_MOLFILE=yes  

Using -D PKG_MOLFILE ${}={}$ yes enables the package, and setting -D MOLFILE_INCLUDE_DIR allows to provide a custom location for the molfile plugin header files. These should match the ABI of the plugin files used, and thus one typically sets them to include folder of the local VMD installation in use. LAMMPS ships with a couple of default header files that correspond to a popular VMD version, usually the latest release.  

# Traditional make  

The lib/molfile/Makefile.lammps file has a setting for a dynamic loading library libdl.a that is typically present on all systems. It is required for LAMMPS to link with this package. If the setting is not valid for your system, you will need to edit the Makefile.lammps file. See lib/molfile/README and lib/molfile/Makefile.lammps for details. It is also possible to configure a different folder with the VMD molfile plugin header files. LAMMPS ships with a couple of default headers, but these are not compatible with all VMD versions, so it is often best to change this setting to the location of the same include files of the local VMD installation in use.  

# 3.7.27 NETCDF package  

To build with this package you must have the NetCDF library installed on your system.  

# CMake build  

No additional settings are needed besides -D PKG_NETCDF $\underline{{\underline{{\mathbf{\Pi}}}}}$ yes.  

This should auto-detect the NETCDF library if it is installed on your system at standard locations. Several advanced CMake NETCDF options exist if you need to specify where it was installed. Use the ccmake (terminal window) or cmake-gui (graphical) tools to see these options and set them interactively from their user interfaces.  

![](images/e597eede19f7c570dda36a5a76260bbdba60b22432e9bd0cb35983a4121675fa.jpg)  

# Traditional make  

The lib/netcdf/Makefile.lammps file has settings for NetCDF include and library files which LAMMPS needs to build with this package. If the settings are not valid for your system, you will need to edit the Makefile.lammps file. See lib/netcdf/README for details.  

# 3.7.28 OPENMP package  

![](images/2e6ed58345e5d0aca7ae18da84cbd74a0e9b629d3eb72a0403c1c530ca0d73f9.jpg)  

# CMake build  

No additional settings are required besides -D PKG_OPENMP $\stackrel{.}{=}$ yes. If CMake detects OpenMP compiler support, the OPENMP code will be compiled with multi-threading support enabled, otherwise as optimized serial code.  

# $\Theta$ Traditional make  

To enable multi-threading support in the OPENMP package (and other styles supporting OpenMP) the following compile and link flags must be added to your Makefile.machine file. See src/MAKE OPTIONS/Makefile.omp for an example.  

<html><body><table><tr><td>CCFLAGS: -fopenmp</td><td># for GNU and Clang Compilers</td></tr><tr><td>CCFLAGS: -qopenmp -restrict</td><td># for Intel compilers on Linux</td></tr><tr><td>LINKFLAGS: -fopenmp</td><td># for GNU and Clang Compilers</td></tr><tr><td>LINKFLAGS: -qopenmp</td><td># for Intel compilers on Linux</td></tr></table></body></html>  

For other platforms and compilers, please consult the documentation about OpenMP support for your compiler.  

# Adding OpenMP support on macOS  

Apple offers the Xcode package and IDE for compiling software on macOS, so you have likely installed it to compile LAMMPS. Their compiler is based on Clang, but while it is capable of processing OpenMP directives, the necessary header files and OpenMP runtime library are missing. The R developers have figured out a way to build those in a compatible fashion. One can download them from https://mac.r-project.org/openmp/. Simply adding those files as instructed enables the Xcode $\mathrm{C}{+}{+}$ compiler to compile LAMMPS with -D BUILD_OMP $=$ yes.  

# 3.7.29 QMMM package  

For using LAMMPS to do QM/MM simulations via the QMMM package you need to build LAMMPS as a library. A LAMMPS executable with fix qmmm included can be built, but will not be able to do a QM/MM simulation on as such. You must also build a QM code - currently only Quantum ESPRESSO (QE) is supported - and create a new executable which links LAMMPS and the QM code together. Details are given in the lib/qmmm/README file. It is also recommended to read the instructions for linking with LAMMPS as a library for background information. This requires compatible Quantum Espresso and LAMMPS versions. The current interface and makefiles have last been verified to work in February 2020 with Quantum Espresso versions 6.3 to 6.5.  

![](images/7910fd1a8a19813cbbcbaabff71263920854f70750b0356405926543dda0a918.jpg)  

# CMake build  

When using CMake, building a LAMMPS library is required and it is recommended to build a shared library, since any libraries built from the sources in the lib folder (including the essential libqmmm.a) are not included in the static LAMMPS library and (currently) not installed, while their code is included in the shared LAMMPS library. Thus a typical command to configure building LAMMPS for QMMM would be:  

make -C ../cmake/presets/basic.cmake -D PKG_QMMM=yes -D BUILD_LIB $=$ yes -DBUILD_SHARED_LIBS=yes ../cmake  

After completing the LAMMPS build and also configuring and compiling Quantum ESPRESSO with external library support (via “make couple”), go back to the lib/qmmm folder and follow the instructions on the README file to build the combined LAMMPS/QE QM/MM executable (pwqmmm.x) in the lib/qmmm folder.  

# Traditional make  

Before building LAMMPS, you must build the QMMM library in lib/qmmm. You can do this manually if you prefer; follow the first two steps explained in lib/qmmm/README. You can also do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib qmmm/Install.py script with the specified args:  

# print help message make lib-qmmm  

# build with GNU Fortran compiler (settings as in "make serial") make lib-qmmm args $=^{11}$ -m serial"  

# build with default MPI compiler (settings as in "make mpi") make lib-qmmm args="-m mpi"  

# build with GNU Fortran compiler make lib-qmmm args $=^{11}$ -m gfortran"  

The build should produce two files: lib/qmmm/libqmmm.a and lib/qmmm/Makefile.lammps. The latter is copied from an existing Makefile.lammps.\* and has settings needed to build LAMMPS with the QMMM library (though typically the settings are just blank). If necessary, you can edit/create a new lib/qmmm/Makefile. $<$ machine $>$ file for your system, which should define an EXTRAMAKE variable to specify a corresponding Makefile.lammps. $<$ <machine $>$ file.  

You can then install QMMM package and build LAMMPS in the usual manner. After completing the LAMMPS build and compiling Quantum ESPRESSO with external library support (via make couple), go back to the lib/qmmm folder and follow the instructions in the README file to build the combined LAMMPS/QE QM/MM executable (pwqmmm.x) in the lib/qmmm folder.  

# 3.7.30 RHEO package  

This package depends on the BPM package.  

# CMake build  

-D PKG_RHEO=yes # enable the package itself -D PKG_BPM=yes # the RHEO package requires BPM -D USE_INTERNAL_LINALG=value # prefer internal LAPACK if true  

Some features in the RHEO package are dependent on code in the BPM package so the latter one must be enabled as well.  

The RHEO package also requires LAPACK (and BLAS) and CMake can identify their locations and pass that info to the RHEO build script. But on some systems this may cause problems when linking or the dependency is not desired. By using the setting -D USE_INTERNAL_LINALG $=$ yes when running the CMake configuration, you will select compiling and linking the bundled linear algebra library and work around the limitations.  

# $\Theta$ Traditional make  

The RHEO package requires LAPACK (and BLAS) which can be either a system provided library or the bundled “linalg” library. This is a subset of LAPACK translated to $\mathrm{C}{+}{+}$ . For that, one of the provided Makefile.lammps. ${\mathrm{<config>}}$ files needs to be copied to Makefile.lammps and edited as needed. The default file uses the bundled “linalg” library, which can be built by make lib-linalg args $=^{1}{-}\mathrm{m}$ serial' in the src folder.  

# 3.7.31 SCAFACOS package  

To build with this package, you must download and build the ScaFaCoS Coulomb solver library  

# CMake build  

-D DOWNLOAD_SCAFACOS=value # download ScaFaCoS for build, value $=\mathrm{no}$ ␣   
$\hookrightarrow$ (default) or yes   
-D SCAFACOS_LIBRARY=path # ScaFaCos library file (only needed if at custom␣   
,→location)   
-D SCAFACOS_INCLUDE_DIR=path # ScaFaCoS include directory (only needed if at␣   
$\hookrightarrow$ custom location)  

If DOWNLOAD_SCAFACOS is set, the ScaFaCoS library will be downloaded and built inside the CMake build directory. If the ScaFaCoS library is already on your system (in a location CMake cannot find it), SCAFACOS_LIBRARY is the filename (plus path) of the ScaFaCoS library file, not the directory the library file is in. SCAFACOS_INCLUDE_DIR is the directory the ScaFaCoS include file is in.  

# Traditional make  

You can download and build the ScaFaCoS library manually if you prefer; follow the instructions in lib/scafacos/README. You can also do it in one step from the lammps/src dir, using a command like these, which simply invokes the lib/scafacos/Install.py script with the specified args:  

# print help message make lib-scafacos  

# download and build in lib/scafacos/scafacos-<version> make lib-scafacos args $\L:=\L^{11}$ -b"  

# use existing ScaFaCoS installation in \$HOME/scafacos make lib-scafacos args $=^{11}$ -p \$HOME/scafacos  

Note that two symbolic (soft) links, includelink and liblink, are created in lib/scafacos to point to the ScaFaCoS src dir. When LAMMPS builds in src it will use these links. You should not need to edit the lib/scafacos/Makefile.lammps file.  

# 3.7.32 VTK package  

To build with this package you must have the VTK library installed on your system.  

# CMake build  

No additional settings are needed besides -D PKG_VTK $=$ yes.  

This should auto-detect the VTK library if it is installed on your system at standard locations. Several advanced VTK options exist if you need to specify where it was installed. Use the ccmake (terminal window) or cmake-gui (graphical) tools to see these options and set them interactively from their user interfaces.  

![](images/6799e86415ca7aaaf1d1298dc16afc017709bee0a827c08c6a2cd1da5a3d78e0.jpg)  

# Traditional make  

The lib/vtk/Makefile.lammps file has settings for accessing VTK files and its library, which LAMMPS needs to build with this package. If the settings are not valid for your system, check if one of the other lib/vtk/Makefile.lammps.\* files is compatible and copy it to Makefile.lammps. If none of the provided files work, you will need to edit the Makefile.lammps file. See lib/vtk/README for details.  

# 3.8 Build the LAMMPS documentation  

Depending on how you obtained LAMMPS and whether you have built the manual yourself, this directory has a number of subdirectories and files. Here is a list with descriptions:  

<html><body><table><tr><td>README</td><td># brief info about the documentation</td><td></td></tr><tr><td>src</td><td>content files for LAMMPS documentation</td><td></td></tr><tr><td>html</td><td></td><td>HTML version of the LAMMPS manual (see html/Manual.html)</td></tr><tr><td>utils</td><td> tools and settings for building the documentation</td><td></td></tr><tr><td>lammps.1</td><td>man page for the lammps command</td><td></td></tr><tr><td>msi2lmp.1</td><td>man page for the msi2lmp command</td><td></td></tr><tr><td>Manual.pdf</td><td> large PDF version of entire manual</td><td></td></tr><tr><td>LAMMPS.epub</td><td># Manual in ePUB e-book format</td><td></td></tr><tr><td>LAMMPS.mobi</td><td> Manual in MOBI e-book format</td><td></td></tr></table></body></html>  

<html><body><table><tr><td></td><td>(continuedfrompreviouspage)</td></tr><tr><td>docenv virtualenv folder for processing</td><td>:the manual sources</td></tr><tr><td>doctrees — temporary</td><td>data from processing g the manual</td></tr><tr><td>doxygen doxygen configuration and o</td><td>output</td></tr><tr><td>gitignore list of files and folders to be ignored</td><td>1 by git</td></tr><tr><td>doxygen-warn.log # logfile with warnings</td><td>from running c doxygen</td></tr><tr><td>github-development-workflow.md</td><td>notes on t the LAMMPS development workflow</td></tr></table></body></html>  

If you downloaded LAMMPS as a tarball from the LAMMPS website, the html folder and the PDF files should be included.  

If you downloaded LAMMPS from the public git repository, then the HTML and PDF files are not included. You can build the HTML or PDF files yourself, by typing make html or make pdf in the doc folder. This requires various tools and files. Some of them have to be installed (see below). For the rest the build process will attempt to download and install them into a python virtual environment and local folders.  

A current version of the manual (latest feature release, that is the state of the release branch) is is available online at: https://docs.lammps.org/. A version of the manual corresponding to the ongoing development (that is the state of the develop branch) is available online at: https://docs.lammps.org/latest/ A version of the manual corresponding to the latest stable LAMMPS release (that is the state of the stable branch) is available online at: https://docs.lammps.org/ stable/  

# 3.8.1 Build using GNU make  

The LAMMPS manual is written in reStructuredText format which can be translated to different output format using the Sphinx document generator tool. It also incorporates programmer documentation extracted from the LAMMPS $\mathrm{C}{+}{+}$ sources through the Doxygen program. Currently the translation to HTML, PDF (via LaTeX), ePUB (for many e-book readers) and MOBI (for Amazon Kindle readers) are supported. For that to work a Python interpreter version 3.8 or later, the doxygen tools and internet access to download additional files and tools are required. This download is usually only required once or after the documentation folder is returned to a pristine state with make clean-all.  

For the documentation build a python virtual environment is set up in the folder doc/docenv and various python packages are installed into that virtual environment via the pip tool. For rendering embedded LaTeX code also the MathJax JavaScript engine needs to be downloaded. If you need to pass additional options to the pip commands to work (e.g. to use a web proxy or to point to additional SSL certificates) you can set them via the PIP_OPTIONS environment variable or uncomment and edit the PIP_OPTIONS setting at beginning of the makefile.  

The actual translation is then done via make commands in the doc folder. The following make commands are available:  

<html><body><table><tr><td>make html</td><td># generate HTML in html dir using Sphinx</td><td></td><td></td></tr><tr><td>make pdf</td><td># generate PDF as Manual.pdf using Sphinx and PDFLaTeX</td><td></td><td></td></tr><tr><td>make epub</td><td># generate LAMMPS.epub in ePUB format using Sphinx</td><td></td><td></td></tr><tr><td>make mobi</td><td># generate LAMMPS.mobi in MOBI format using ebook-convert</td><td></td><td></td></tr><tr><td>make fasthtml</td><td></td><td></td><td></td></tr><tr><td></td><td># generate approximate HTML in fasthtml dir using Sphinx</td><td># some Sphinx extensions do not work correctly with this</td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>make clean</td><td></td><td># remove intermediate RST files created by HTML build</td><td></td></tr><tr><td>make clean-all</td><td></td><td># remove entire build folder and any cached data</td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>make anchor_check # check for duplicate anchor labels</td><td></td><td></td><td></td></tr><tr><td>make style check # check for complete and consistent style lists</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td>make package _check # check for complete and consistent package lists</td><td></td></tr><tr><td>make link check</td><td></td><td></td><td></td></tr><tr><td></td><td># check for broken or outdated URLs</td><td></td><td></td></tr><tr><td>make spelling</td><td># spell-check the manual</td><td></td><td></td></tr></table></body></html>  

# 3.8.2 Build using CMake  

It is also possible to create the HTML version (and only the HTML version) of the manual within the CMake build directory. The reason for this option is to include the installation of the HTML manual pages into the “install” step when installing LAMMPS after the CMake build via cmake --build . --target install. The documentation build is included in the default build target, but can also be requested independently with cmake --build . --target doc. If you need to pass additional options to the pip commands to work (e.g. to use a web proxy or to point to additional SSL certificates) you can set them via the PIP_OPTIONS environment variable.  

-D BUILD_DOC=value # yes or no (default)  

# 3.8.3 Prerequisites for HTML  

To run the HTML documentation build toolchain, python 3, git, doxygen, and virtualenv have to be installed locally. Here are instructions for common setups:  

# Ubuntu  

sudo apt-get install git doxygen  

![](images/ac2924bdc3ca3c8896e392f9cd4111926deb33ad7400da4da2f356b79a9b49dd.jpg)  

# RHEL or CentOS (Version 7.x)  

sudo yum install git doxygen  

# Fedora or RHEL/CentOS (8.x or later)  

sudo dnf install git doxygen  

![](images/8c6f531634c64cfb6d2e1c3ce3878f9b78099987857e24e9c82ffc35d101113d.jpg)  

# macOS  

Python 3  

If Python 3 is not available on your macOS system, you can download the latest Python 3 macOS package from https://www.python.org and install it. This will install both Python 3 and pip3.  

# 3.8.4 Prerequisites for PDF  

In addition to the tools needed for building the HTML format manual, a working LaTeX installation with support for PDFLaTeX and a selection of LaTeX styles/packages are required. To run the PDFLaTeX translation the latexmk script needs to be installed as well.  

# 3.8.5 Prerequisites for ePUB and MOBI  

In addition to the tools needed for building the HTML format manual, a working LaTeX installation with a few addon LaTeX packages as well as the dvipng tool are required to convert embedded math expressions transparently into embedded images.  

For converting the generated ePUB file to a MOBI format file (for e-book readers, like Kindle, that cannot read ePUB), you also need to have the ebook-convert tool from the “calibre” software installed. https://calibre-ebook.com/ Typing make mobi will first create the ePUB file and then convert it. On the Kindle readers in particular, you also have support for PDF files, so you could download and view the PDF version as an alternative.  

# 3.8.6 Instructions for Developers  

When adding new styles or options to the LAMMPS code, corresponding documentation is required and either existing files in the src folder need to be updated or new files added. These files are written in reStructuredText markup for translation with the Sphinx tool.  

Before contributing any documentation, please check that both the HTML and the PDF format documentation can translate without errors. During testing the html translation, you may use the make fasthtml command which does an approximate translation (i.e. not all Sphinx features and extensions will work), but runs very fast because it will only translate files that have been changed since the last make fasthtml command.  

lease also check the output to the console for any warnings or problems. There will be multiple tests run automatically:  

• A test for correctness of all anchor labels and their references   
• A test that all LAMMPS packages $\circeq$ folders with sources in lammps/src) are documented and listed. A typical warning shows the name of the folder with the suspected new package code and the documentation files where they need to be listed:  

Found 88 packages Package NEWPACKAGE missing in Packages_list.rst Package NEWPACKAGE missing in Packages_details.rst • A test that only standard, printable ASCII text characters are used. This runs the command env $\mathrm{LC\_ALL=C}$ grep -n $![\hat{\mathbf{\mu}}-\widetilde{\mathbf{\mu}}]!$ src/\*.rst and thus prints all offending lines with filename and line number prepended to the screen. Special characters like Greek letters $(\alpha\sigma\varepsilon)$ , super- or subscripts $(x^{2}\cup_{L J})$ , mathematical expressions $\cdot\frac{1}{2}\mathbf{N}$ $x\to\infty,$ , or the Angstrom symbol $(\mathrm{\AA})$ should be typeset with embedded LaTeX (like this :math:\`\alpha \sigma \epsilon\`, :math: $\mathrm{~x~}^{\frown}2$ \mathrm $\{\mathrm{E}\}\_\mathrm{\{LJ\}}$ \`, :math: $\mathrm{\backslashfrac\{1\}\{2\}~\mathrm{mathrm}\{N\}}$ $\mathrm{{\sfx}}\backslash\mathrm{to}\backslash\mathrm{infty}^{\mathrm{\setminus}}$ , or :math:\`\AA\`).  

• Embedded LaTeX is rendered in HTML output with MathJax and in PDF output by passing the embedded text to LaTeX. Some care has to be taken, though, since there are limitations which macros and features can be used in either mode, so it is recommended to always check whether any new or changed documentation does translate and render correctly with either output.  

• A test whether all styles are documented and listed in their respective overview pages. A typical output with warnings looks like this:  

Parsed style names w/o suffixes from $\mathrm{C}++$ tree in ../src:  

Angle styles: 21 Atom styles: 24   
Body styles: 3 Bond styles: 17   
Command styles: 41 Compute styles: 143   
Dihedral styles: 16 Dump styles: 26   
Fix styles: 223 Improper styles: 13   
Integrate styles: 4 Kspace styles: 15   
Minimize styles: 9 Pair styles: 234   
Reader styles: 4 Region styles: 8  

(continues on next page)  

<html><body><table><tr><td>(continuedfrompreviouspage)</td></tr><tr><td>Compute style entry newcomp is missing or incomplete in 1 Commands compute.rst</td></tr><tr><td>Compute style entry newcomp is missing or incomplete in compute.rst</td></tr><tr><td>Fix style entry newfix is missing or incomplete in Commands _fix.rst</td></tr><tr><td></td></tr><tr><td>Fix style entry newfix is missing or incomplete in fix.rst</td></tr><tr><td>Pair style entry new is missing or incomplete in Commands. s_pair.rst</td></tr><tr><td>Pair style entry new is missing or incomplete in pair _style.rst</td></tr></table></body></html>  

In addition, there is the option to run a spellcheck on the entire manual with make spelling. This requires a library called enchant. To avoid printing out false positives (e.g. keywords, names, abbreviations) those can be added to the file lammps/doc/utils/sphinx-config/false_positives.txt.  

# 3.9 Notes for building LAMMPS on Windows  

• General remarks   
• Running Linux on Windows   
• Using GNU GCC ported to Windows   
• Using Visual Studio   
• Using Intel oneAPI compilers and libraries   
• Using a cross-compiler  

# 3.9.1 General remarks  

LAMMPS is developed and tested primarily on Linux machines. The vast majority of HPC clusters and supercomputers today run on Linux as well. While portability to other platforms is desired, it is not always achieved. That is sometimes due to non-portable code in LAMMPS itself, but more often due to portability limitations of external libraries and tools required to build a specific feature or package. The LAMMPS developers are dependent on LAMMPS users giving feedback and providing assistance in resolving portability issues. This is particularly true for compiling LAMMPS on Windows, since this platform has significant differences in some low-level functionality. As of LAMMPS version 14 December 2021, large parts of LAMMPS can be compiled natively with the Microsoft Visual $\mathrm{C}{+}{+}$ Compilers. As of LAMMPS version 31 May 2022, also the Intel oneAPI compilers can compile large parts of LAMMPS natively on Windows. This is mostly facilitated by using the Platform abstraction functions in the platform namespace and CMake.  

Before trying to build LAMMPS on Windows yourself, please consider the pre-compiled Windows installer package and see if they are sufficient for your needs.  

# 3.9.2 Running Linux on Windows  

If it is necessary for you to compile LAMMPS on a Windows machine (e.g. because it is your main desktop), please also consider using a virtual machine software and compile and run LAMMPS in a Linux virtual machine, or - if you have a sufficiently up-to-date Windows 10 or Windows 11 installation - consider using the Windows subsystem for Linux. This optional Windows feature allows you to run the bash shell of a Linux system (Ubuntu by default) from within Windows and from there on, you can pretty much use that shell like you are running on a regular Ubuntu Linux machine (e.g. installing software via apt-get and more). For more details on that, please see this tutorial.  

# 3.9.3 Using a GNU GCC ported to Windows  

One option for compiling LAMMPS on Windows natively is to install a Bash shell, Unix shell utilities, Perl, Python, GNU make, and a GNU compiler ported to Windows. The Cygwin package provides a unix/linux interface to low-level Windows functions, so LAMMPS can be compiled on Windows. The necessary (minor) modifications to LAMMPS are included, but may not always up-to-date for recently added functionality and the corresponding new code. A machine makefile for using cygwin for the old build system is provided. Using CMake for this mode of compilation is untested and not likely to work.  

When compiling for Windows do not set the -DLAMMPS_MEMALIGN define in the LMP_INC makefile variable and add -lwsock32 -lpsapi to the linker flags in LIB makefile variable. Try adding -static-libgcc or -static or both to the linker flags when your resulting LAMMPS Windows executable complains about missing .dll files. The CMake configuration should set this up automatically, but is untested.  

In case of problems, you are recommended to contact somebody with experience in using Cygwin. If you do come across portability problems requiring changes to the LAMMPS source code, or figure out corrections yourself, please report them on the LAMMPS forum at MatSci, or file them as an issue or pull request on the LAMMPS GitHub project.  

# 3.9.4 Using Microsoft Visual Studio  

Following the integration of the platform namespace into the LAMMPS code base, portability of LAMMPS for native compilation on Windows using Visual Studio has been significantly improved. This has been tested with Visual Studio 2019 (aka version 16) and Visual Studio 2022 (aka version 17). We strongly recommend using Visual Studio 2022 version 17.1 or later. Not all features and packages in LAMMPS are currently supported out of the box, but a preset cmake/presets/windows.cmake is provided that contains the packages that have been compiled successfully so far. You must use the CMake based build procedure, since there is no support for GNU make or the Unix shell utilities required for the GNU make build procedure.  

It is possible to use both the integrated CMake support of the Visual Studio IDE or use an external CMake installation (e.g. downloaded from cmake.org) to create build files and compile LAMMPS from the command-line.  

Compilation via command-line and unit tests are checked automatically for the LAMMPS development branch through GitHub Actions.  

![](images/8169435521a143e59b013ea64ed250bacc9168a44e9db47227ecce7e297da2a7.jpg)  

# Note  

Versions of Visual Studio before version 17.1 may scan the entire LAMMPS source tree and likely miss the correct master CMakeLists.txt and get confused since there are multiple files of that name in different folders but none in top level folder.  

Please note, that for either approach CMake will create a so-called “multi-configuration” build environment, and the commands for building and testing LAMMPS must be adjusted accordingly.  

The LAMMPS cmake folder contains a CMakeSettings.json file with build configurations for MSVC compilers and the MS provided Clang compiler package in Debug and Release mode.  

To support running in parallel you can compile with OpenMP enabled using the OPENMP package or install Microsoft MPI (including the SDK) and compile LAMMPS with MPI enabled.  

![](images/6b0cf792ce563ecd20b736c08a92c268ee67ff155ba914aedae93e942c7601cb.jpg)  

# Note  

This is work in progress and you should contact the LAMMPS developers via GitHub or the LAMMPS forum at MatSci, if you have questions or LAMMPS specific problems.  

# 3.9.5 Using Intel oneAPI Compilers and Libraries  

Added in version 31May2022.  

After installing the Intel oneAPI base toolkit and the HPC toolkit, it is also possible to compile large parts of LAMMPS natively on Windows using Intel compilers. The HPC toolkit provides two sets of $\mathrm{C}/\mathrm{C}{+}+$ and Fortran compilers: the so-called “classic” compilers (icl.exe and ifort.exe) and newer, LLVM based compilers (icx.exe and ifx.exe). In addition to the compilers and their dependent modules, also the thread building blocks (TBB) and the math kernel library (MKL) need to be installed. Two presets (cmake/presets/windows-intel-llvm.cmake and cmake/presets/ windows-intel-classic.cmake) are provided for selecting the LLVM based or classic compilers, respectively. The preset cmake/presets/windows.cmake enables compatible packages that are not dependent on additional features or libraries. You must use the CMake based build procedure and use Ninja as build tool. For compiling from the command prompt, thus both CMake and Ninja-build binaries must be installed. It is also possible to use Visual Studio, if it is started (devenv.exe) from a command prompt that has the Intel oneAPI compilers enabled. The Visual Studio settings file in the cmake folder contains configurations for both compiler variants in debug and release settings. Those will use the CMake and Ninja binaries bundled with Visual Studio, thus a separate installation is not required.  

# Known Limitations  

In addition to portability issues with several packages and external libraries, the classic Intel compilers are currently not able to compile the googletest libraries and thus enabling the -DENABLE_TESTING option will result in compilation failure. The LLVM based compilers are compatible.  

# Note  

This is work in progress and you should contact the LAMMPS developers via GitHub or the LAMMPS forum at MatSci, if you have questions or LAMMPS specific problems.  

# 3.9.6 Using a cross-compiler  

If you need to provide custom LAMMPS binaries for Windows, but do not need to do the compilation on Windows, please consider using a Linux to Windows cross-compiler. This is how currently the Windows binary packages are created by the LAMMPS developers. Because of that, this is probably the currently best tested and supported way to build LAMMPS executables for Windows. A CMake preset selecting all packages compatible with this cross-compilation build is provided. The GPU package can only be compiled with OpenCL support. To compile with MPI support, a precompiled library and the corresponding header files are required. When building with CMake the matching package will be downloaded automatically, but MPI support has to be explicitly enabled with -DBUILD_MPI $\equiv$ on.  

Please keep in mind, though, that this only applies to compiling LAMMPS. Whether the resulting binaries do work correctly is rarely tested by the LAMMPS developers. We instead rely on the feedback of the users of these pre-compiled LAMMPS packages for Windows. We will try to resolve issues to the best of our abilities if we become aware of them. However this is subject to time constraints and focus on HPC platforms.  

# 3.10 Notes for saving disk space when building LAMMPS from source  

LAMMPS is a large software project with a large number of source files, extensive documentation, and a large collection of example files. When downloading LAMMPS by cloning the git repository from GitHub this will by default also download the entire commit history since September 2006. Compiling LAMMPS will add the storage requirements of the compiled object files and libraries to the tally.  

In a user account on an HPC cluster with filesystem quotas or in other environments with restricted disk space capacity it may be needed to reduce the storage requirements. Here are some suggestions:  

• Create a so-called shallow repository by cloning only the last commit instead of the full project history by using git clone git@github.com:lammps/lammps --depth $=1$ --branch $=$ develop. This reduces the downloaded size to about half. With --depth $=1$ it is not possible to check out different versions/branches of LAMMPS, using --depth $=1000$ will make multiple recent versions available at little extra storage needs (the entire git history had nearly 30,000 commits in fall 2021).   
• Download a tar archive from either the download section on the LAMMPS homepage or from the LAMMPS releases page on GitHub these will not contain the git history at all.   
• Build LAMMPS without the debug flag (remove -g from the machine makefile or use -DCMAKE_BUILD_TYPE $\stackrel{!}{=}$ Release) or use the strip command on the LAMMPS executable when no more debugging would be needed. The strip command may also be applied to the LAMMPS shared library. The static library may be deleted entirely.   
• Delete compiled object files and libraries after copying the LAMMPS executable to a permanent location. When using the traditional build process, one may use make clean- $<$ machine $>$ or make clean-all to delete object files in the src folder. For CMake based builds, one may use make clean or just delete the entire build folder.   
• The folders containing the documentation tree (doc), the examples (examples) are not needed to build and run LAMMPS and can be safely deleted. Some files in the potentials folder are large and may be deleted, if not needed. The largest of those files (occupying about 120 MBytes combined) will only be downloaded on demand, when the corresponding package is installed.   
• When using the CMake build procedure, the compilation can be done on a (local) scratch storage that will not count toward the quota. A local scratch file system may offer the additional benefit of speeding up creating object files and linking with libraries compared to a networked file system. Also with CMake (and unlike with the traditional make) it is possible to compile LAMMPS executables with different settings and packages included from the same source tree since all the configuration information is stored in the build folder. So it is not necessary to have multiple copies of LAMMPS.  

# 3.11 Development build options  

The build procedures in LAMMPS offers a few extra options which are useful during development, testing or debugging.  

# 3.11.1 Monitor compilation flags (CMake only)  

Sometimes it is necessary to verify the complete sequence of compilation flags generated by the CMake build. To enable a more verbose output during compilation you can use the following option.  

-D CMAKE_VERBOSE_MAKEFILE=value # value = no (default) or yes  

Another way of doing this without reconfiguration is calling make with variable VERBOSE set to 1:  

make VERBOSE=1  

# 3.11.2 Enable static code analysis with clang-tidy (CMake only)  

The clang-tidy tool is a static code analysis tool to diagnose (and potentially fix) typical programming errors or coding style violations. It has a modular framework of tests that can be adjusted to help identifying problems before they become bugs and also assist in modernizing large code bases (like LAMMPS). It can be enabled for all $\mathrm{C}{+}{+}$ code with the following CMake flag  

# 3.11. Development build options  

With this flag enabled all source files will be processed twice, first to be compiled and then to be analyzed. Please note that the analysis can be significantly more time-consuming than the compilation itself.  

# 3.11.3 Report missing and unneeded ‘#include’ statements (CMake only)  

The conventions for how and when to use and order include statements in LAMMPS are documented in LAMMPS programming style. To assist with following these conventions one can use the Include What You Use tool. This tool is still under development and for large and complex projects like LAMMPS there are some false positives, so suggested changes need to be verified manually. It is recommended to use at least version 0.16, which has much fewer incorrect reports than earlier versions. To install the IWYU toolkit, you need to have the clang compiler and its development package installed. Download the IWYU version that matches the version of the clang compiler, configure, build, and install it.  

The necessary steps to generate the report can be enabled via a CMake variable during CMake configuration.  

-D ENABLE_IWYU=value # value = no (default) or yes  

This will check if the required binary (include-what-you-use or iwyu) and python script script (iwyu-tool or iwyu_tool or iwyu_tool.py) can be found in the path. The analysis can then be started with:  

This may first run some compilation, as the analysis is dependent on recording all commands required to do the compilation.  

# 3.11.4 Address, Leak, Undefined Behavior, and Thread Sanitizer Support (CMake only)  

Compilers such as GCC and Clang support generating instrumented binaries which use different sanitizer libraries to detect problems in the code during run-time. They can detect issues like:  

• memory leaks • undefined behavior • data races  

Please note that this kind of instrumentation usually comes with a performance hit (but much less than using tools like Valgrind with a more low level approach). To enable these features, additional compiler flags need to be added to the compilation and linking stages. This is done through setting the ENABLE_SANITIZER variable during configuration. Examples:  

-D ENABLE_SANITIZER $\_$ none # no sanitizer active (default)   
-D ENABLE_SANITIZER $\_$ address # enable address sanitizer / memory leak checker   
-D ENABLE_SANITIZER=hwaddress # enable hardware assisted address sanitizer / memory leak␣   
$\hookrightarrow$ checker   
-D ENABLE_SANITIZER=leak # enable memory leak checker (only)   
-D ENABLE_SANITIZER $\_$ undefined # enable undefined behavior sanitizer   
-D ENABLE_SANITIZER=thread # enable thread sanitizer  

# 3.11.5 Code Coverage and Unit Testing (CMake only)  

The LAMMPS code is subject to multiple levels of automated testing during development:  

• Integration testing (i.e. whether the code compiles on various platforms and with a variety of compilers and settings),   
• Unit testing (i.e. whether certain functions or classes of the code produce the expected results for given inputs),   
• Run testing (i.e. whether selected input decks can run to completion without crashing for multiple configurations),   
• Regression testing (i.e. whether selected input examples reproduce the same results over a given number of steps and operations within a given error margin).  

The status of this automated testing can be viewed on https://ci.lammps.org.  

The scripts and inputs for integration, run, and legacy regression testing are maintained in a separate repository of the LAMMPS project on GitHub. A few tests are also run as GitHub Actions and their configuration files are in the .github/workflows/ folder of the LAMMPS git tree.  

Regression tests can also be performed locally with the regression tester tool. The tool checks if a given LAMMPS binary run with selected input examples produces thermo output that is consistent with the provided log files. The script can be run in one pass over all available input files, but it can also first create multiple lists of inputs or folders that can then be run with multiple workers concurrently to speed things up. Another mode allows to do a quick check of inputs that contain commands that have changes in the current checkout branch relative to a git branch. This works similar to the two pass mode, but will select only shorter runs and no more than 100 inputs that are chosen randomly. This ensures that this test runs significantly faster compared to the full test run. These test runs can also be performed with instrumented LAMMPS binaries (see previous section).  

The unit testing facility is integrated into the CMake build process of the LAMMPS source code distribution itself. It can be enabled by setting -D ENABLE_TESTING $\Longleftarrow$ on during the CMake configuration step. It requires the YAML library and matching development headers to compile (if those are not found locally a recent version of that library will be downloaded and compiled along with LAMMPS and the test programs) and will download and compile a specific version of the GoogleTest $\mathrm{C}{+}{+}$ test framework that is used to implement the tests. Those unit tests may be combined with memory access and leak checking with valgrind (see below for how to enable it). In that case, running so-called death tests will create a lot of false positives and thus they can be disabled by configuring compilation with the additional setting -D SKIP_DEATH_TESTS $=$ on.  

# $\Theta$ Software version and LAMMPS configuration requirements  

The compiler and library version requirements for the testing framework are more strict than for the main part of LAMMPS. For example the default GNU $\mathrm{C}{+}{+}$ and Fortran compilers of RHEL/CentOS 7.x (version 4.8.x) are not sufficient. The CMake configuration will try to detect incompatible versions and either skip incompatible tests or stop with an error. Also the number of available tests will depend on installed LAMMPS packages, development environment, operating system, and configuration settings.  

After compilation is complete, the unit testing is started in the build folder using the ctest command, which is part of the CMake software. The output of this command will be looking something like this:  

# \$ ctest  

Test project /home/akohlmey/compile/lammps/build-testing Start 1: RunLammps   
1/563 Test #1: RunLammps Passed 0.28 sec Start 2: HelpMessage   
2/563 Test #2: HelpMessage ... Passed 0.06 sec Start 3: InvalidFlag   
3/563 Test #3: InvalidFlag Passed 0.06 sec  

(continues on next page)  

# 3.11. Development build options  

(continued from previous page)  

<html><body><table><tr><td>Start 4: Tokenizer</td><td>Passed</td></tr><tr><td>4/563 Test #4: Tokenizer</td></tr><tr><td>Start 5: MemPool 5/563 Test #5: MemPool Passed 0.05 sec</td></tr><tr><td>Start 6: ArgUtils</td></tr><tr><td>6/563 Test #6: ArgUtils Passed 0.05 sec [..] </td></tr><tr><td>Start 561: ImproperStyle:zero</td></tr><tr><td>561/563 Test #561: ImproperStyle:zero Passed 0.07 sec Start 562: TestMliapPyUnified</td></tr><tr><td>562/563 Test #562: TestMliapPyUnified Passed 0.16 sec Start 563: TestPairList</td></tr><tr><td>563/563 Test #563: TestPairList Passed 0.06 sec</td></tr><tr><td></td></tr><tr><td>100% tests passed, 0 tests failed out of 563</td></tr><tr><td>Label Time Summary:</td></tr><tr><td>generated 0.85 sec*proc (3 tests)</td></tr><tr><td>noWindows 4.16 sec*proc (2 tests)</td></tr><tr><td>slow 78.33 sec*proc (67 tests) unstable</td></tr><tr><td>28.23 sec*proc (34 tests)</td></tr><tr><td>Total Test time (real) = 132.34 sec</td></tr></table></body></html>  

The ctest command has many options, the most important ones are:  

<html><body><table><tr><td>Option</td><td>Function</td></tr><tr><td>-V</td><td>verbose output: display output of individual test runs</td></tr><tr><td>-j <num></td><td>parallel run: run <num> tests in parallel</td></tr><tr><td>-R <regex></td><td>run subset of tests matching the regular expression <regex></td></tr><tr><td>-E <regex></td><td>excludesubset of tests matching theregular expression<regex></td></tr><tr><td>-L <regex></td><td>run subset of tests with a label matching the regular expression <regex></td></tr><tr><td>-LE<regex></td><td>exclude subset of tests with a label matching the regular expression <regex></td></tr><tr><td>-N</td><td>dry-run: display list of tests without running them</td></tr><tr><td>-T memcheck</td><td>run tests with valgrind memory checker (if available)</td></tr></table></body></html>  

In its full implementation, the unit test framework will consist of multiple kinds of tests implemented in different programming languages $\left(\mathbf{C}++\mathbf{\alpha}\right)$ , C, Python, Fortran) and testing different aspects of the LAMMPS software and its features. The tests will adapt to the compilation settings of LAMMPS, so that tests will be skipped if prerequisite features are not available in LAMMPS.  

# $\Theta$ Work in Progress  

The unit test framework was added in spring 2020 and is under active development. The coverage is not complete and will be expanded over time. Preference is given to parts of the code base that are easy to test or commonly used.  

Tests as shown by the ctest program are commands defined in the CMakeLists.txt files in the unittest directory tree. A few tests simply execute LAMMPS with specific command-line flags and check the output to the screen for expected content. A large number of unit tests are special tests programs using the GoogleTest framework and linked to the LAMMPS library that test individual functions or create a LAMMPS class instance, execute one or more commands and check data inside the LAMMPS class hierarchy. There are also tests for the C-library, Fortran, and Python module interfaces to LAMMPS. The Python tests use the Python “unittest” module in a similar fashion than the others use GoogleTest. These special test programs are structured to perform multiple individual tests internally and each of those contains several checks (aka assertions) for internal data being changed as expected.  

Tests for force computing or modifying styles (e.g. styles for non-bonded and bonded interactions and selected fixes) are run by using a more generic test program that reads its input from files in YAML format. The YAML file provides the information on how to customized the test program to test a specific style and - if needed - with specific settings. To add a test for another, similar style (e.g. a new pair style) it is usually sufficient to add a suitable YAML file. Detailed instructions for adding tests are provided in the Programmer Guide part of the manual. A description of what happens during the tests is given below.  

# Unit tests for force styles  

A large part of LAMMPS are different “styles” for computing non-bonded and bonded interactions selected through the pair_style command, bond_style command, angle_style command, dihedral_style command, improper_style command, and kspace_style command. Since these all share common interfaces, it is possible to write generic test programs that will call those common interfaces for small test systems with less than 100 atoms and compare the results with prerecorded reference results. A test run is then a a collection multiple individual test runs each with many comparisons to reference results based on template input files, individual command settings, relative error margins, and reference data stored in a YAML format file with .yaml suffix. Currently the programs test_pair_style, test_bond_style, test_angle_style, test_dihedral_style, and test_improper_style are implemented. They will compare forces, energies and (global) stress for all atoms after a run 0 calculation and after a few steps of MD with fix nve, each in multiple variants with different settings and also for multiple accelerated styles. If a prerequisite style or package is missing, the individual tests are skipped. All force style tests will be executed on a single MPI process, so using the CMake option -D BUILD_MPI $\equiv$ off can significantly speed up testing, since this will skip the MPI initialization for each test run. Below is an example command and output:  

<html><body><table><tr><td></td><td>Running 6 tests from 1 test suite.</td></tr><tr><td></td><td> Global test environment set-up.</td></tr><tr><td>RUN</td><td>6 tests from PairStyle</td></tr><tr><td></td><td>1 PairStyle.plain</td></tr><tr><td></td><td>OK ] PairStyle.plain (24 ms)</td></tr><tr><td>RUN</td><td>] PairStyle.omp</td></tr><tr><td>RUN</td><td>OK | PairStyle.omp (18 ms)</td></tr><tr><td></td><td>] PairStyle.intel</td></tr><tr><td>RUN</td><td>OK 1 PairStyle.intel (6 ms)</td></tr><tr><td></td><td>1 PairStyle.opt</td></tr><tr><td>RUN</td><td>SKIPPED ] PairStyle.opt (O ms) PairStyle.single</td></tr><tr><td></td><td>OK ] PairStyle.single (7 ms)</td></tr><tr><td>RUN</td><td>PairStyle.extract</td></tr><tr><td></td><td>OK ] PairStyle.extract (6 ms)</td></tr><tr><td></td><td>6 tests from PairStyle (62 ms total)</td></tr><tr><td> Global test environment tear-down</td><td></td></tr><tr><td></td><td>] 6 tests from 1 test suite ran. (63 ms total)</td></tr><tr><td>PASSED | 5 tests.</td><td></td></tr><tr><td></td><td>SKIPPED | 1 test, listed below:</td></tr><tr><td></td><td>SKIPPED | PairStyle.opt</td></tr></table></body></html>  

In this particular case, 5 out of 6 sets of tests were conducted, the tests for the lj/cut/opt pair style was skipped, since the tests executable did not include it. To learn what individual tests are performed, you (currently) need to read the source code. You can use code coverage recording (see next section) to confirm how well the tests cover the code paths  

in the individual source files.  

The force style test programs have a common set of options:  

<html><body><table><tr><td>Option</td><td>Function</td></tr><tr><td>-g<newfile></td><td>regeneratereference data in new YAMLfile</td></tr><tr><td>-u</td><td>update reference data in the original YAML file</td></tr><tr><td>-S</td><td>printerrorstatisticsfor each groupofcomparisons</td></tr><tr><td>-V</td><td>verbose output: also print the executed LAMMPS commands</td></tr></table></body></html>  

The ctest tool has no mechanism to directly pass flags to the individual test programs, but a workaround has been implemented where these flags can be set in an environment variable TEST_ARGS. Example:  

env TEST_ARGS=-s ctest -V -R BondStyle  

To add a test for a style that is not yet covered, it is usually best to copy a YAML file for a similar style to a new file, edit the details of the style (how to call it, how to set its coefficients) and then run test command with either the - $\cdot\mathrm{g}$ and the replace the initial test file with the regenerated one or the -u option. The -u option will destroy the original file, if the generation run does not complete, so using -g is recommended unless the YAML file is fully tested and working.  

Some of the force style tests are rather slow to run and some are very sensitive to small differences like CPU architecture, compiler toolchain, compiler optimization. Those tests are flagged with a “slow” and/or “unstable” label, and thus those tests can be selectively excluded with the -LE flag or selected with the -L flag.  

# Recommendations and notes for YAML files  

• The reference results should be recorded without any code optimization or related compiler flags enabled.  

• The epsilon parameter defines the relative precision with which the reference results must be met. The test geometries often have high and low energy parts and thus a significant impact from floating-point math truncation errors is to be expected. Some functional forms and potentials are more noisy than others, so this parameter needs to be adjusted. Typically a value around 1.0e-13 can be used, but it may need to be as large as 1.0e-8 in some cases.   
• The tests for pair styles from OPT, OPENMP and INTEL are performed with automatically rescaled epsilon to account for additional loss of precision from code optimizations and different summation orders.   
• When compiling with (aggressive) compiler optimization, some tests are likely to fail. It is recommended to inspect the individual tests in detail to decide, whether the specific error for a specific property is acceptable (it often is), or this may be an indication of mis-compiled code (or an undesired large loss of precision due to significant reordering of operations and thus less error cancellation).  

# Unit tests for timestepping related fixes  

A substantial subset of $f\boldsymbol{{x}}$ styles are invoked regularly during MD timestepping and manipulate per-atom properties like positions, velocities, and forces. For those fix styles, testing can be done in a very similar fashion as for force fields and thus there is a test program test_fix_timestep that shares a lot of code, properties, and command-line flags with the force field style testers described in the previous section.  

This tester will set up a small molecular system run with verlet run style for 4 MD steps, then write a binary restart and continue for another 4 MD steps. At this point coordinates and velocities are recorded and compared to reference data. Then the system is cleared, restarted and running the second 4 MD steps again and the data is compared to the same reference. That is followed by another restart after which per atom type masses are replaced with per-atom masses and the second 4 MD steps are repeated again and compared to the same reference. Also global scalar and vector data of the fix is recorded and compared. If the fix is a thermostat and thus the internal property t_target can be extracted, then this is compared to the reference data. The tests are repeated with the respa run style.  

If the fix has a multi-threaded version in the OPENMP package, then the entire set of tests is repeated for that version as well.  

For this to work, some additional conditions have to be met by the YAML format test inputs.  

• The fix to be tested (and only this fix), should be listed in the prerequisites: section   
• The fix to be tested must be specified in the post_commands: section with the fix-ID test. This section may contain other commands and other fixes (e.g. an instance of fix nve for testing a thermostat or force manipulation fix)   
• For fixes that can tally contributions to the global virial, the line fix_modify test virial yes should be included in the post_commands: section of the test input.   
• For thermostat fixes the target temperature should be ramped from an arbitrary value (e.g. 50K) to a pre-defined target temperature entered as $\$\{\mathrm{t\_target}\}$ .   
• For fixes that have thermostatting support included, but do not have it enabled in the input (e.g. fix rigid with default settings), the post_commands: section should contain the line variable t_target delete to disable the target temperature ramp check to avoid false positives.  

# Use custom linker for faster link times when ENABLE_TESTING is active  

When compiling LAMMPS with enabled tests, most test executables will need to be linked against the LAMMPS library. Since this can be a very large library with many $\mathrm{C}{+}{+}$ objects when many packages are enabled, link times can become very long on machines that use the GNU BFD linker (e.g. Linux systems). Alternatives like the mold linker, the lld linker of the LLVM project, or the gold linker available with GNU binutils can speed up this step substantially (in this order). CMake will by default test if any of the three can be enabled and use it when ENABLE_TESTING is active. It can also be selected manually through the CMAKE_CUSTOM_LINKER CMake variable. Allowed values are mold, lld, gold, bfd, or default. The default option will use the system default linker otherwise, the linker is chosen explicitly. This option is only available for the GNU or Clang $\mathrm{C}{+}{+}$ compilers.  

# Tests for other components and utility functions  

Additional tests that validate utility functions or specific components of LAMMPS are implemented as standalone executable which may, or may not require creating a suitable LAMMPS instance. These tests are more specific and do not require YAML format input files. To add a test, either an existing source file needs to be extended or a new file added, which in turn requires additions to the CMakeLists.txt file in the source folder.  

# Collect and visualize code coverage metrics  

You can also collect code coverage metrics while running LAMMPS or the tests by enabling code coverage support during the CMake configuration:  

-D ENABLE_COVERAGE=on # enable coverage measurements (off by default)  

This will instrument all object files to write information about which lines of code were accessed during execution in files next to the corresponding object files. These can be post-processed to visually show the degree of coverage and which code paths are accessed and which are not taken. When working on unit tests (see above), this can be extremely helpful to determine which parts of the code are not executed and thus what kind of tests are still missing. The coverage data is cumulative, i.e. new data is added with each new run.  

Enabling code coverage will also add the following build targets to generate coverage reports after running the LAMMPS executable or the unit tests:  

make gen_coverage_html # generate coverage report in HTML format make gen_coverage_xml # generate coverage report in XML format  

(continues on next page)  

# 3.11. Development build options  

(continued from previous page)  

make clean_coverage_html # delete folder with HTML format coverage report make reset_coverage # delete all collected coverage data and HTML output  

These reports require GCOVR to be installed. The easiest way to do this to install it via pip:  

pip install git+https://github.com/gcovr/gcovr.git  

After post-processing with gen_coverage_html the results are in a folder coverage_html and can be viewed with a web browser. The images below illustrate how the data is presented.  

![](images/b0c75449f7ddc08e7989f40240588e4774651f5dbedd9d5057af6e4e1e427db1.jpg)  
Fig. 1: Top of the overview page  

![](images/49da17a25bb104b7fa092fe25cdfcd446ac5c1590ebc00c0aea5d4655444c788.jpg)  
Fig. 2: Styles with good coverage  

![](images/2090e5d6c2ced4cb165f36ccbbd271f21877e533b8439af8fce759bf4c83e7a3.jpg)  
Fig. 3: Top of individual source page  

![](images/d1e4c8a036deda8f7d9bffbbeeafc4fd430940aff810dad6590cd51276913eec.jpg)  
Fig. 4: Source page with branches  

# 3.11.6 Coding style utilities  

To aid with enforcing some of the coding style conventions in LAMMPS some additional build targets have been added.   
These require Python 3.5 or later and will only work properly on Unix-like operating and file systems.  

The following options are available.  

<html><body><table><tr><td>make check-whitespace make fix-whitespace make check-homepage make fix-homepage make check-errordocs make fix-errordocs remove error docs in header files make check-permissions search for files with permissions issues make fix-permissions correct permissions issues in files make check-docs search for several issues in the manual make check-version # list files with pending release version tags make check # run all check targets from above</td><td>search for files with whitespace issues correct whitespace issues in files search for files with old LAMMPS homepage URLs correct LAMMPS homepage URLs in files search for deprecated error docs in header files</td></tr></table></body></html>  

These should help to make source and documentation files conforming to some the coding style preferences of the LAMMPS developers.  

# 3.11.7 Clang-format support  

For the code in the unittest and src trees we are transitioning to use the clang-format tool to assist with having a consistent source code formatting style. The clang-format command bundled with Clang version 8.0 or later is required. The configuration is in files called .clang-format in the respective folders. Since the modifications from clang-format can be significant and - especially for “legacy style code” - they are not always improving readability, a large number of files currently have a // clang-format off at the top, which will disable the processing. As of fall 2021 all files have been either “protected” this way or are enabled for full or partial clang-format processing. Over time, the “protected” files will be refactored and updated so that clang-format may be applied to them as well.  

It is recommended for all newly contributed files to use the clang-format processing while writing the code or do the coding style processing (including the scripts mentioned in the previous paragraph)  

If clang-format is available, files can be updated individually with commands like the following:  

<html><body><table><tr><td>clang-format -i some file.cpp</td></tr></table></body></html>  

The following target are available for both, GNU make and CMake:  

make format-src # apply clang-format to all files in src and the package folders make format-tests # apply clang-format to all files in the unittest tree  

# 3.11.8 GitHub command-line interface  

GitHub has developed a command-line tool to interact with the GitHub website via a command called gh. This is extremely convenient when working with a Git repository hosted on GitHub (like LAMMPS). It is thus highly recommended to install it when doing LAMMPS development. To use gh you must be within a git checkout of a repository and you must obtain an authentication token to connect your checkout with a GitHub user. This is done with the command: gh auth login where you then have to follow the prompts. Here are some examples:  

<html><body><table><tr><td>Command</td><td>Description</td></tr><tr><td>gh pr list</td><td>List currently open pull requests</td></tr><tr><td>gh pr checks 404</td><td>Shows the status of all checks for pull request #404</td></tr><tr><td>gh pr view 404</td><td>Shows the description and recent comments for pull request #404</td></tr><tr><td>gh co 404</td><td>Check out the branch from pull request #404; set up for pushing changes</td></tr><tr><td>gh issue list</td><td>List currently open issues</td></tr><tr><td>gh issue view 430 )--comments</td><td>Shows the description and all comments for issue #430</td></tr></table></body></html>  

The capabilities of the gh command are continually expanding, so for more details please see the documentation at https://cli.github.com/manual/ or use gh --help or gh $<$ command $>$ --help for embedded help.  

# RUN LAMMPS  

These pages explain how to run LAMMPS once you have installed an executable or downloaded the source code and built an executable. The Commands doc page describes how input scripts are structured and the commands they can contain.  

# 4.1 Basics of running LAMMPS  

LAMMPS is run from the command-line, reading commands from a file via the -in command-line flag, or from standard input. Using the -in in.file variant is recommended (see note below). The name of the LAMMPS executable is either lmp or lmp_<machine> with <machine> being the machine string used when compiling LAMMPS. This is required when compiling LAMMPS with the traditional build system (e.g. with make mpi), but optional when using CMake to configure and build LAMMPS:  

<html><body><table><tr><td>lmp_serial -in in.file</td><td></td></tr><tr><td>lmp serial < in.file</td><td></td></tr><tr><td>lmp -in in.file</td><td></td></tr><tr><td>lmp ）< in.file</td><td></td></tr><tr><td>/path/to/lammps/src/lmp_ )serial -i in.file</td><td></td></tr><tr><td>mpirun -np ) 4 lmp_mpi -in in.file</td><td></td></tr><tr><td>mpiexec -np 0 4 lmp -in in.file mpirun -np 0 8 /path/to/lammps/src/lmp_mpi -in in.file</td><td></td></tr><tr><td>mpiexec -n 16 /usr/local/bin/lmp -in in.file</td><td></td></tr></table></body></html>  

You normally run the LAMMPS command in the directory where your input script is located. That is also where output files are produced by default, unless you provide specific other paths in your input script or on the command-line. As in some of the examples above, the LAMMPS executable itself can be placed elsewhere.  

![](images/36da8de46491735b619cbcc5f10853d0a0dba63403bc654acb8215df6b8243e6.jpg)  

# Note  

The redirection operator “<” will not always work when running in parallel with mpirun or mpiexec; for those systems the -in form is required.  

As LAMMPS runs it prints info to the screen and a logfile named log.lammps. More info about output is given on the screen and logfile output page.  

If LAMMPS encounters errors in the input script or while running a simulation it will print an ERROR message and stop or a WARNING message and continue. See the Common Problems page for a discussion of the various kinds of errors LAMMPS can or can’t detect, a list of all ERROR and WARNING messages, and what to do about them.  

LAMMPS can run the same problem on any number of processors, including a single processor. In theory you should get identical answers on any number of processors and on any machine. In practice, numerical round-off due to using floating-point math can cause slight differences and an eventual divergence of molecular dynamics trajectories. See the Errors common page for discussion of this.  

LAMMPS can run as large a problem as will fit in the physical memory of one or more processors. If you run out of memory, you must run on more processors or define a smaller problem. The amount of memory needed and how well it can be distributed across processors may vary based on the models and settings and commands used.  

If you run LAMMPS in parallel via mpirun, you should be aware of the processors command, which controls how MPI tasks are mapped to the simulation box, as well as mpirun options that control how MPI tasks are assigned to physical cores of the node(s) of the machine you are running on. These settings can improve performance, though the defaults are often adequate.  

For example, it is often important to bind MPI tasks (processes) to physical cores (processor affinity), so that the operating system does not migrate them during a simulation. If this is not the default behavior on your machine, the mpirun option --bind-to core (OpenMPI) or -bind-to core (MPICH) can be used.  

If the LAMMPS command(s) you are using support multi-threading, you can set the number of threads per MPI task via the environment variable OMP_NUM_THREADS, before you launch LAMMPS:  

<html><body><table><tr><td>export OMP NUM THREADS=2 bash</td></tr><tr><td>setenvOMP NUM THREADS 2 井 csh or tcsh</td></tr></table></body></html>  

This can also be done via the package command or via the -pk command-line switch which invokes the package command. See the package command or Speed doc pages for more details about which accelerator packages and which commands support multi-threading.  

You can experiment with running LAMMPS using any of the input scripts provided in the examples or bench directory.   
Input scripts are named in.\* and sample outputs are named log.\*.P where P is the number of processors it was run on.  

Some of the examples or benchmarks require LAMMPS to be built with optional packages.  

# 4.2 Command-line options  

At run time, LAMMPS recognizes several optional command-line switches which may be used in any order. Either the full word or a one or two letter abbreviation can be used:  

• -e or -echo   
• -h or -help   
• -i or -in   
• -k or -kokkos   
• -l or -log   
• -mdi   
• -m or -mpicolor • -c or -cite   
• -nc or -nocite   
• -nb or -nonbuf • -pk or -package -p or -partition   
• -pl or -plog   
-ps or -pscreen   
-ro or -reorder   
-r2data or -restart2data   
• -r2dump or -restart2dump   
• -r2info or -restart2info   
• -sc or -screen   
• -sr or skiprun   
• -sf or -suffix   
• -v or -var  

For example, the lmp_mpi executable might be launched as follows:  

<html><body><table><tr><td>mpirun -np 16 lmp_mpi -v f tmp.out -1 my.log -sc none -i in.alloy mpirun -np 0 16 lmp_mpi -var f tmp.out -log my.log -screen none -in in.alloy</td></tr></table></body></html>  

# -echo style  

Set the style of command echoing. The style can be none or screen or log or both. Depending on the style, each command read from the input script will be echoed to the screen and/or logfile. This can be useful to figure out which line of your script is causing an input error. The default value is log. The echo style can also be set by using the echo command in the input script itself.  

# -help  

Print a brief help summary and a list of options compiled into this executable for each LAMMPS style (atom_style, fix, compute, pair_style, bond_style, etc). This can tell you if the command you want to use was included via the appropriate package at compile time. LAMMPS will print the info and immediately exit if this switch is used.  

# -in file  

Specify a file to use as an input script. This is an optional but recommended switch when running LAMMPS in onepartition mode. If it is not specified, LAMMPS reads its script from standard input, typically from a script via I/O redirection; e.g. lmp_linux $<$ in.run. With many MPI implementations I/O redirection also works in parallel, but using the -in flag will always work.  

Note that this is a required switch when running LAMMPS in multi-partition mode, since multiple processors cannot all read from stdin concurrently. The file name may be “none” for starting multi-partition calculations without reading an initial input file from the library interface.  

# -kokkos on/off keyword/value . . .  

Explicitly enable or disable KOKKOS support, as provided by the KOKKOS package. Even if LAMMPS is built with this package, as described in the the KOKKOS package page, this switch must be set to enable running with KOKKOSenabled styles the package provides. If the switch is not set (the default), LAMMPS will operate as if the KOKKOS package were not installed; i.e. you can run standard LAMMPS or with the GPU or OPENMP packages, for testing or benchmarking purposes.  

# 4.2. Command-line options  

Additional optional keyword/value pairs can be specified which determine how Kokkos will use the underlying hardware on your platform. These settings apply to each MPI task you launch via the mpirun or mpiexec command. You may choose to run one or more MPI tasks per physical node. Note that if you are running on a desktop machine, you typically have one physical node. On a cluster or supercomputer there may be dozens or 1000s of physical nodes.  

Either the full word or an abbreviation can be used for the keywords. Note that the keywords do not use a leading minus sign. I.e. the keyword is “t”, not “-t”. Also note that each of the keywords has a default setting. Examples of when to use these options and what settings to use on different platforms is given on the KOKKOS package doc page.  

• d or device • g or gpus • t or threads  

This option is only relevant if you built LAMMPS with CUDA $\rightharpoonup$ yes, you have more than one GPU per node, and if you are running with only one MPI task per node. The Nd setting is the ID of the GPU on the node to run on. By default $\mathbf{Nd}=0$ . If you have multiple GPUs per node, they have consecutive IDs numbered as 0,1,2,etc. This setting allows you to launch multiple independent jobs on the node, each with a single MPI task per node, and assign each job to run on a different GPU.  

This option is only relevant if you built LAMMPS with CUDA $\varepsilon$ yes, you have more than one GPU per node, and you are running with multiple MPI tasks per node (up to one per GPU). The $\mathrm{Ng}$ setting is how many GPUs you will use. The Ns setting is optional. If set, it is the ID of a GPU to skip when assigning MPI tasks to GPUs. This may be useful if your desktop system reserves one GPU to drive the screen and the rest are intended for computational work like running LAMMPS. By default $\mathrm{Ng}=1$ and Ns is not set.  

Depending on which flavor of MPI you are running, LAMMPS will look for one of these 4 environment variables  

SLURM_LOCALID (various MPI variants compiled with SLURM support)   
MPT_LRANK (HPE MPI)   
MV2_COMM_WORLD_LOCAL_RANK (Mvapich)   
OMPI_COMM_WORLD_LOCAL_RANK (OpenMPI)  

which are initialized by the srun, mpirun, or mpiexec commands. The environment variable setting for each MPI rank is used to assign a unique GPU ID to the MPI task.  

threads Nt  

This option assigns Nt number of threads to each MPI task for performing work when Kokkos is executing in OpenMP or pthreads mode. The default is $\mathrm{Nt}=1$ , which essentially runs in MPI-only mode. If there are Np MPI tasks per physical node, you generally want $\mathrm{{Np}^{*}\mathrm{{Nt}=}}$ the number of physical cores per node, to use your available hardware optimally. This also sets the number of threads used by the host when LAMMPS is compiled with CUDA $\rightharpoonup$ yes.  

Deprecated since version $22\mathrm{Dec}2022$ .  

Support for the “numa” or “n” option was removed as its functionality was ignored in Kokkos for some time already.  

# -log file  

Specify a log file for LAMMPS to write status information to. In one-partition mode, if the switch is not used, LAMMPS writes to the file log.lammps. If this switch is used, LAMMPS writes to the specified file. In multi-partition mode, if the switch is not used, a log.lammps file is created with high-level status information. Each partition also writes to a log.lammps.N file where N is the partition ID. If the switch is specified in multi-partition mode, the high-level logfile is named “file” and each partition also logs information to a file.N. For both one-partition and multi-partition mode, if the specified file is “none”, then no log files are created. Using a log command in the input script will override this setting. Option -plog will override the name of the partition log files file.N.  

# -mdi ‘multiple flags’  

This flag is only recognized and used when LAMMPS has support for the MolSSI Driver Interface (MDI) included as part of the MDI package. This flag is specific to the MDI library and controls how LAMMPS interacts with MDI. There are usually multiple flags that have to follow it and those have to be placed in quotation marks. For more information about how to launch LAMMPS in MDI client/server mode please refer to the MDI Howto.  

# -mpicolor color  

If used, this must be the first command-line argument after the LAMMPS executable name. It is only used when LAMMPS is launched by an mpirun command which also launches another executable(s) at the same time. (The other executable could be LAMMPS as well.) The color is an integer value which should be different for each executable (another application may set this value in a different way). LAMMPS and the other executable(s) perform an MPI_Comm_split() with their own colors to shrink the MPI_COMM_WORLD communication to be the subset of processors they are actually running on.  

# -cite style or file name  

Select how and where to output a reminder about citing contributions to the LAMMPS code that were used during the run. Available keywords for styles are “both”, “none”, “screen”, or “log”. Any other keyword will be considered a file name to write the detailed citation info to instead of logfile or screen. Default is the “log” style where there is a short summary in the screen output and detailed citations in BibTeX format in the logfile. The option “both” selects the detailed output for both, “none”, the short output for both, and “screen” will write the detailed info to the screen and the short version to the log file. If a dedicated citation info file is requested, the screen and log file output will be in the short format (same as with “none”).  

See the citation page for more details on how to correctly reference and cite LAMMPS.  

# -nocite  

Disable generating a citation reminder (see above) at all.  

# -nonbuf  

Added in version 15Sep2022.  

Turn off buffering for screen and logfile output. For performance reasons, output to the screen and logfile is usually buffered, i.e. output is only written to a file if its buffer - typically 4096 bytes - has been filled. When LAMMPS crashes for some reason, however, that can mean that there is important output missing. With this flag the buffering can be turned off (only for screen and logfile output) and any output will be committed immediately. Note that when running in parallel with MPI, the screen output may still be buffered by the MPI library and this cannot be changed by LAMMPS. This flag should only be used for debugging and not for production simulations as the performance impact can be significant, especially for large parallel runs.  

Invoke the package command with style and args. The syntax is the same as if the command appeared at the top of the input script. For example -package gpu 2 or -pk gpu 2 is the same as package gpu 2 in the input script. The possible styles and args are documented on the package doc page. This switch can be used multiple times, e.g. to set options for the INTEL and OPENMP packages which can be used together.  

Along with the -suffix command-line switch, this is a convenient mechanism for invoking accelerator packages and their options without having to edit an input script.  

# -partition 8x2 4 5 . . .  

Invoke LAMMPS in multi-partition mode. When LAMMPS is run on $\mathrm{\bfP}$ processors and this switch is not used, LAMMPS runs in one partition, i.e. all P processors run a single simulation. If this switch is used, the P processors are split into separate partitions and each partition runs its own simulation. The arguments to the switch specify the number of processors in each partition. Arguments of the form MxN mean M partitions, each with N processors. Arguments of the form N mean a single partition with N processors. The sum of processors in all partitions must equal P. Thus the command -partition $8\mathrm{x2}\mathrm{~4~5~}$ has 10 partitions and runs on a total of 25 processors.  

Running with multiple partitions can be useful for running multi-replica simulations, where each replica runs on one or a few processors. Note that with MPI installed on a machine (e.g. your desktop), you can run on more (virtual) processors than you have physical processors.  

To run multiple independent simulations from one input script, using multiple partitions, see the Howto multiple page.   
World- and universe-style variables are useful in this context.  

# -plog file  

Specify the base name for the partition log files, so partition N writes log information to file.N. If file is none, then no partition log files are created. This overrides the filename specified in the -log command-line option. This option is useful when working with large numbers of partitions, allowing the partition log files to be suppressed (-plog none) or placed in a subdirectory (-plog replica_files/log.lammps) If this option is not used the log file for partition $\mathbf{N}$ is log.lammps.N or whatever is specified by the -log command-line option.  

# -pscreen file  

Specify the base name for the partition screen file, so partition N writes screen information to file.N. If file is “none”, then no partition screen files are created. This overrides the filename specified in the -screen command-line option. This option is useful when working with large numbers of partitions, allowing the partition screen files to be suppressed (-pscreen none) or placed in a subdirectory (-pscreen replica_files/screen). If this option is not used the screen file for partition N is screen.N or whatever is specified by the -screen command-line option.  

# -reorder  

This option has 2 forms:  

<html><body><table><tr><td>-reorder nth N</td></tr><tr><td>-reorder custom filename</td></tr></table></body></html>  

Reorder the processors in the MPI communicator used to instantiate LAMMPS, in one of several ways. The original MPI communicator ranks all P processors from 0 to P-1. The mapping of these ranks to physical processors is done by MPI before LAMMPS begins. It may be useful in some cases to alter the rank order. E.g. to ensure that cores within each node are ranked in a desired order. Or when using the run_style verlet/split command with 2 partitions to ensure that a specific Kspace processor (in the second partition) is matched up with a specific set of processors in the first partition. See the General tips page for more details.  

If the keyword nth is used with a setting $N_{:}$ , then it means every Nth processor will be moved to the end of the ranking. This is useful when using the run_style verlet/split command with 2 partitions via the -partition command-line switch. The first set of processors will be in the first partition, the second set in the second partition. The -reorder command-line switch can alter this so that the first N procs in the first partition and one proc in the second partition will be ordered consecutively, e.g. as the cores on one physical node. This can boost performance. For example, if you use -reorder nth 4 and -partition 9 3 and you are running on 12 processors, the processors will be reordered from  

to  

so that the processors in each partition will be  

<html><body><table><tr><td>0124568910 3711</td></tr></table></body></html>  

See the “processors” command for how to ensure processors from each partition could then be grouped optimally for quad-core nodes.  

If the keyword is custom, then a file that specifies a permutation of the processor ranks is also specified. The format of the reorder file is as follows. Any number of initial blank or comment lines (starting with a “#” character) can be present. These should be followed by P lines of the form:  

where $\mathrm{\bfP}$ is the number of processors LAMMPS was launched with. Note that if running in multi-partition mode (see the -partition switch above) P is the total number of processors in all partitions. The I and J values describe a permutation of the $\mathrm{\bfP}$ processors. Every I and J should be values from 0 to P-1 inclusive. In the set of $\mathrm{~P~I~}$ values, every proc ID should appear exactly once. Ditto for the set of P J values. A single I,J pairing means that the physical processor with rank I in the original MPI communicator will have rank J in the reordered communicator.  

Note that rank ordering can also be specified by many MPI implementations, either by environment variables that specify how to order physical processors, or by config files that specify what physical processors to assign to each MPI rank. The -reorder switch simply gives you a portable way to do this without relying on MPI itself. See the processors file command for how to output info on the final assignment of physical processors to the LAMMPS simulation domain.  

# -restart2data restartfile datafile keyword value . . .  

Convert the restart file into a data file and immediately exit. This is the same operation as if the following 2-line input script were run:  

<html><body><table><tr><td>read restart restartfile write_data datafile keyword value</td></tr></table></body></html>  

The specified restartfile and/or datafile name may contain the wild-card character “\*”. The restartfile name may also contain the wild-card character $^{\circ\circ}/\circ^{}$ . The meaning of these characters is explained on the read_restart and write_data doc pages. The use of $^{66}\%^{}$ ” means that a parallel restart file can be read. Note that a filename such as file.\* may need to be enclosed in quotes or the “\*” character prefixed with a backslash (”") to avoid shell expansion of the “\*” character.  

The syntax following restartfile, namely  

is identical to the arguments of the write_data command. See its documentation page for details. This includes its optional keyword/value settings.  

# -restart2dump restartfile group-ID dumpstyle dumpfile arg1 arg2 . . .  

Convert the restart file into a dump file and immediately exit. This is the same operation as if the following 2-line input script were run:  

read_restart restartfile write_dump group-ID dumpstyle dumpfile arg1 arg2 ...  

Note that the specified restartfile and dumpfile names may contain wild-card characters (”\*” or $\mathbf{\hat{\mu}}^{\epsilon}\mathbf{C}\mathbf{\eta}_{0}^{\eta}$ ) as explained on the read_restart and write_dump doc pages. The use of $^{\circ}\%^{,}$ ” means that a parallel restart file and/or parallel dump file can be read and/or written. Note that a filename such as file.\* may need to be enclosed in quotes or the “\*” character prefixed with a backslash (”") to avoid shell expansion of the “\*” character.  

The syntax following restartfile, namely group-ID dumpstyle dumpfile arg1 arg2 ...  

is identical to the arguments of the write_dump command. See its documentation page for details. This includes what per-atom fields are written to the dump file and optional dump_modify settings, including ones that affect how parallel dump files are written, e.g. the nfile and fileper keywords. See the dump_modify page for details.  

# -restart2info restartfile keyword . . .  

Added in version 29Aug2024.  

Write out some info about the restart file and and immediately exit. This is the same operation as if the following 2-line input script were run:  

# -skiprun  

Insert the command timer timeout 0 every 1 at the beginning of an input file or after a clear command. This has the effect that the entire LAMMPS input script is processed without executing actual run or minimize and similar commands (their main loops are skipped). This can be helpful and convenient to test input scripts of long running calculations for correctness to avoid having them crash after a long time due to a typo or syntax error in the middle or at the end.  

# -suffix style args  

Use variants of various styles if they exist. The specified style can be gpu, intel, kk, omp, opt, or hybrid. These refer to optional packages that LAMMPS can be built with, as described in Accelerate performance. The “gpu” style corresponds to the GPU package, the “intel” style to the INTEL package, the “kk” style to the KOKKOS package, the “opt” style to the OPT package, and the “omp” style to the OPENMP package. The hybrid style is the only style that accepts arguments. It allows for two packages to be specified. The first package specified is the default and will be used if it is available. If no style is available for the first package, the style for the second package will be used if available. For example, -suffix hybrid intel omp will use styles from the INTEL package if they are installed and available, but styles for the OPENMP package otherwise.  

Along with the -package command-line switch, this is a convenient mechanism for invoking accelerator packages and their options without having to edit an input script.  

As an example, all of the packages provide a pair_style lj/cut variant, with style names lj/cut/gpu, lj/cut/intel, lj/cut/kk, lj/cut/omp, and lj/cut/opt. A variant style can be specified explicitly in your input script, e.g. pair_style lj/cut/gpu. If the -suffix switch is used the specified suffix (gpu,intel,kk,omp,opt) is automatically appended whenever your input script command creates a new atom style, pair style, fix, compute, or run style. If the variant version does not exist, the standard version is created.  

For the GPU package, using this command-line switch also invokes the default GPU settings, as if the command “package gpu 1” were used at the top of your input script. These settings can be changed by using the -package gpu command-line switch or the package gpu command in your script.  

For the INTEL package, using this command-line switch also invokes the default INTEL settings, as if the command “package intel 1” were used at the top of your input script. These settings can be changed by using the -package intel command-line switch or the package intel command in your script. If the OPENMP package is also installed, the hybrid style with “intel omp” arguments can be used to make the omp suffix a second choice, if a requested style is not available in the INTEL package. It will also invoke the default OPENMP settings, as if the command “package omp $0^{\circ}$ were used at the top of your input script. These settings can be changed by using the -package omp command-line switch or the package omp command in your script.  

For the KOKKOS package, using this command-line switch also invokes the default KOKKOS settings, as if the command “package kokkos” were used at the top of your input script. These settings can be changed by using the -package kokkos command-line switch or the package kokkos command in your script.  

For the OMP package, using this command-line switch also invokes the default OMP settings, as if the command “package omp $0^{\cdot\cdot}$ were used at the top of your input script. These settings can be changed by using the -package omp command-line switch or the package omp command in your script.  

The suffix command can also be used within an input script to set a suffix, or to turn off or back on any suffix setting made via the command-line.  

# -var name value1 value2 . . .  

Specify a variable that will be defined for substitution purposes when the input script is read. This switch can be used multiple times to define multiple variables. “Name” is the variable name which can be a single character (referenced as $\$1$ in the input script) or a full string (referenced as $\$\{\mathrm{abc}\}$ ). An index-style variable will be created and populated with the subsequent values, e.g. a set of filenames. Using this command-line option is equivalent to putting the line “variable name index value1 value2 . . . ” at the beginning of the input script. Defining an index variable as a commandline argument overrides any setting for the same index variable in the input script, since index variables cannot be re-defined.  

See the variable command for more info on defining index and other kinds of variables and the Parsing rules page for more info on using variables in input scripts.  

![](images/71f5dda5622b8a8766f5ce2f02b756dc4dfba64b8d71cf79c933057764f76d7f.jpg)  

# Note  

Currently, the command-line parser looks for arguments that start with “-” to indicate new switches. Thus you cannot specify multiple variable values if any of them start with a “-”, e.g. a negative numeric value. It is OK if the first value1 starts with a “-”, since it is automatically skipped.  

# 4.3 Screen and logfile output  

As LAMMPS reads an input script, it prints information to both the screen and a log file about significant actions it takes to setup a simulation. When the simulation is ready to begin, LAMMPS performs various initializations, and prints info about the run it is about to perform, including the amount of memory (in MBytes per processor) that the simulation requires. It also prints details of the initial thermodynamic state of the system. During the run itself, thermodynamic information is printed periodically, every few timesteps. When the run concludes, LAMMPS prints the final thermodynamic state and a total run time for the simulation. It also appends statistics about the CPU time and storage requirements for the simulation. An example set of statistics is shown here:  

Loop time of 0.942801 on 4 procs for 300 steps with 2004 atoms  

Performance: 54.985 ns/day, 0.436 hours/ns, 318.201 timesteps/s, 637.674 katom-step/s $195.2\%$ CPU use with 2 MPI tasks x 2 OpenMP threads  

ection | min time | avg time | max time |%varavg| %total  

MPI task timing breakdown:   


<html><body><table><tr><td>Pair Bond</td><td>0.61419</td><td>0.62872</td><td>0.64325</td><td>1.86 66.69 0.1 0.31</td></tr><tr><td>Kspace Neigh Comm</td><td>0.0028608 0.12652 0.10242</td><td>0.0028899 0.14048 0.10242</td><td>0.002919 0.15444 0.10242 0.027593 0.028434</td><td>3.71 14.90 0.0 10.86 0.5 2.93</td></tr></table></body></html>  

Nlocal: 1002 ave 1006 max 998 min   
Histogram: 1 0 0 0 0 0 0 0 0 1   
Nghost: 8670.5 ave 8691 max 8650 min   
Histogram: 1 0 0 0 0 0 0 0 0 1   
Neighs: 354010 ave 357257 max 350763 min   
Histogram: 1 0 0 0 0 0 0 0 0 1  

Total # of neighbors = 708020   
Ave neighs/atom = 353.30339   
Ave special neighs/atom = 2.3403194   
Neighbor list builds = 26   
Dangerous builds = 0  

The first section provides a global loop timing summary. The loop time is the total wall-clock time for the MD steps of the simulation run, excluding the time for initialization and setup (i.e. the parts that may be skipped with run N pre no). The Performance line is provided for convenience to help predict how long it will take to run a desired physical simulation and to have numbers useful for performance comparison between different simulation settings or system sizes. The CPU use line provides the CPU utilization per MPI task; it should be close to $100\%$ times the number of OpenMP threads (or 1 if not using OpenMP). Lower numbers correspond to delays due to file I/O or insufficient thread utilization from parts of the code that have not been multi-threaded.  

The MPI task section gives the breakdown of the CPU run time (in seconds) into major categories:  

• Pair $=$ non-bonded force computations   
• Bond $=$ bonded interactions: bonds, angles, dihedrals, impropers   
• Kspace $=$ long-range interactions: Ewald, PPPM, MSM   
• Neigh $=$ neighbor list construction   
• $C o m m=$ inter-processor communication of atoms and their properties   
• Output $=$ output of thermodynamic info and dump files   
• Modify $=$ fixes and computes invoked by fixes   
• Other $=$ all the remaining time  

For each category, there is a breakdown of the least, average and most amount of wall time any processor spent on this category of computation. The $^{\circ\circ}\%$ varavg” is the percentage by which the max or min varies from the average. This is an indication of load imbalance. A percentage close to 0 is perfect load balance. A large percentage is imbalance. The final “%total” column is the percentage of the total loop time is spent in this category.  

When using the timer full setting, an additional column is added that also prints the CPU utilization in percent. In addition, when using timer full and the package omp command are active, a similar timing summary of time spent in threaded regions to monitor thread utilization and load balance is provided. A new Thread timings section is also added, which lists the time spent in reducing the per-thread data elements to the storage for non-threaded computation. These thread timings are measured for the first MPI rank only and thus, because the breakdown for MPI tasks can change from MPI rank to MPI rank, this breakdown can be very different for individual ranks. Here is an example output for this section:  

<html><body><table><tr><td colspan="4">Thread timings breakdown (MPIrank 0): Total threaded time 0.6846 6 / 90.6% Section min time avg time max time [%varavg %total</td></tr><tr><td>Pair 0.5127</td><td>0.5147</td><td>0.5167</td><td>0.3 75.18</td></tr><tr><td>Bond</td><td>0.0043139</td><td>0.0046779 0.0050418</td><td>0.5( 0.68</td></tr><tr><td>Kspace</td><td>0.070572</td><td>0.074541 0.07851</td><td>1.510.89</td></tr><tr><td>Neigh</td><td>0.084778</td><td>0.086969</td><td>0.089161 0.7 12.70</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>Reduce</td><td>0.0036485</td><td>0.003737</td><td>0.0038254 0.1 0.55</td></tr></table></body></html>  

The third section above lists the number of owned atoms (Nlocal), ghost atoms (Nghost), and pairwise neighbors stored per processor. The max and min values give the spread of these values across processors with a 10-bin histogram showing the distribution. The total number of histogram counts is equal to the number of processors.  

The last section gives aggregate statistics (across all processors) for pairwise neighbors and special neighbors that LAMMPS keeps track of (see the special_bonds command). This section will not always contain data, for example when there has not been a neighbor rebuild, or the neighbor list was constructed on the GPU or when a hybrid pair style was used and LAMMPS cannot determine a suitable (base) neighbor list to draw the statistics from.  

The number of times neighbor lists were rebuilt is tallied, as is the number of potentially dangerous rebuilds. If atom movement triggered neighbor list rebuilding (see the neigh_modify command), then dangerous reneighborings are those that were triggered on the first timestep atom movement was checked for. If this count is non-zero you may wish to reduce the delay factor to ensure no force interactions are missed by atoms moving beyond the neighbor skin distance before a rebuild takes place.  

If an energy minimization was performed via the minimize command, additional information is printed, e.g.  

<html><body><table><tr><td>Minimization stats:</td></tr><tr><td>Stopping criterion = linesearch alpha is zero</td></tr><tr><td>Energy initial, next-to-last, final =</td></tr><tr><td>-6372.3765206 -8328.46998942 -8328.46998942</td></tr><tr><td>Force two-norm initial, final = 1059.36 5.36874</td></tr><tr><td>Force max component initial, final = 58.6026 1.46872</td></tr><tr><td>Final line search alpha, max atom move = 2.7842e-10 4.0892e-10 Iterations, force evaluations = 701 1516</td></tr></table></body></html>  

The first line prints the criterion that determined minimization was converged. The next line lists the initial and final energy, as well as the energy on the next-to-last iteration. The next 2 lines give a measure of the gradient of the energy (force on all atoms). The 2-norm is the “length” of this 3N-component force vector; the largest component (x, y, or z) of force (infinity-norm) is also given. Then information is provided about the line search and statistics on how many iterations and force-evaluations the minimizer required. Multiple force evaluations are typically done at each iteration to perform a 1d line minimization in the search direction. See the minimize page for more details.  

If a kspace_style long-range Coulombics solver that performs FFTs was used during the run (PPPM, Ewald), then additional information is printed, e.g.  

<html><body><table><tr><td>FFTtime (% of Kspce) = 0.200313 (8.34477)</td></tr><tr><td></td></tr><tr><td>FFT Gfps 3d 1d-only = 2.31074 9.19989</td></tr><tr><td></td></tr></table></body></html>  

The first line is the time spent doing 3d FFTs (several per timestep) and the fraction it represents of the total KSpace time (listed above). Each 3d FFT requires computation (3 sets of 1d FFTs) and communication (transposes). The total flops performed is 5Nlog_2(N), where N is the number of points in the 3d grid. The FFTs are timed with and without the communication and a Gflop rate is computed. The 3d rate is with communication; the 1d rate is without (just the 1d FFTs). Thus you can estimate what fraction of your FFT time was spent in communication, roughly $75\%$ in the example above.  

# 4.4 Error message output  

Depending on the error function arguments when it is called in the source code, there will be one to four lines of error output.  

# 4.4.1 A single line  

The line starts with “ERROR: “, followed by the error message and information about the location in the source where the error function was called in parenthesis on the right (here: line 131 of the file src/fix_print.cpp). Example:  

ERROR: Fix print timestep variable nevery returned a bad timestep: 9900 (src/fix_print.cpp:131)  

# 4.4.2 Two lines  

In addition to the single line output, also the last line of the input will be repeated. If a command is spread over multiple lines in the input using the continuation character $\cdot\&{}$ , then the error will print the entire concatenated line. For readability all whitespace is compressed to single blanks. Example:  

ERROR: Unrecognized fix style 'printf' (src/modify.cpp:924) Last input line: fix 0 all printf v_nevery "Step: \$(step) \${step}"  

# 4.4.3 Three lines  

In addition to the two line output from above, a third line is added that uses caret character markers ‘^’ to indicate which “word” in the input failed. Example:  

ERROR: Illegal fix print nevery value -100; must be $>0$ (src/fix_print.cpp:41) Last input line: fix 0 all print -100 "Step: \$(step) \${stepx}"  

# 4.4.4 Four lines  

The three line output is expanded to four lines, if the the input is modified through input pre-processing, e.g. when substituting variables. Now the last command is printed once in the original form and a second time after substitutions are applied. The caret character markers ‘^’ are applied to the second version. Example:  

ERROR: Illegal fix print nevery value -100; must be $>0$ (src/fix_print.cpp:41) Last input line: fix 0 all print $\mathbb{\mathbb{S}}\{\mathrm{nevery}\}$ 'Step: \$(step) \${step}' $\-->$ parsed line: fix 0 all print -100 "Step: $\P(\mathrm{step})\P\{\mathrm{step}\}^{\prime}$ "  

# 4.5 Running LAMMPS on Windows  

To run a serial (non-MPI) executable, follow these steps:  

• Install a LAMMPS installer package from https://packages.lammps.org/windows.html • Open the “Command Prompt” or “Terminal” app. • Change to the directory where you have your input script, (e.g. by typing: cd “Documents”). • At the command prompt, type “lmp -in in.file.lmp”, where in.file.lmp is the name of your LAMMPS input script.  

Note that the serial executable includes support for multi-threading parallelization from the styles in the OPENMP and KOKKOS packages. To run with 4 threads, you can type this:  

lmp -in in.lj.lmp -pk omp 4 -sf omp lmp -in in.lj.lmp -k on t 4 -sf kk  

Alternately, you can also install a package with LAMMPS-GUI included and open the LAMMPS-GUI app (the package includes the command-line version of LAMMPS as well) and open the input file in the GUI and run it from there. For details on LAMMPS-GUI, see Using LAMMPS-GUI.  

For the MS-MPI executables, which allow you to run LAMMPS under Windows in parallel using MPI rather than multi-threading, follow these steps.  

Download and install the MS-MPI runtime package msmpisetup.exe from https://www.microsoft.com/en-us/ download/details.aspx?id=105289 (Note that the msmpisdk.msi is only required for compilation of LAMMPS from source on Windows using Microsoft Visual Studio). After installation of MS-MPI perform a reboot.  

Then you can run the executable in serial like in the example above or in parallel using MPI with one of the following commands:  

<html><body><table><tr><td>mpiexec -localonly 4 lmp -in in.file.lmp</td></tr></table></body></html>  

where in.file.lmp is the name of your LAMMPS input script. For the latter case, you may be prompted to enter the password that you set during installation of the MPI library software.  

In this mode, output may not immediately show up on the screen, so if your input script takes a long time to execute, you may need to be patient before the output shows up.  

Note that the parallel executable also includes OpenMP multi-threading through both the OPENMP and the KOKKOS package, which can be combined with MPI using something like:  

mpiexec -localonly 2 lmp -in in.lj.lmp -pk omp 2 -sf omp mpiexec -localonly 2 lmp -in in.lj.lmp -kokkos on t 2 -sf kk  

MPI parallelization will work for all functionality in LAMMPS and in many cases the MPI parallelization is more efficient than multi-threading since LAMMPS was designed from ground up for MPI parallelization using domain decomposition. Multi-threading is only available for selected styles and implemented on top of the MPI parallelization. Multi-threading is most useful for systems with large load imbalances when using domain decomposition and a smaller number of threads $(<=8)$ ).  

# COMMANDS  

These pages describe how a LAMMPS input script is formatted and the commands in it are used to define a LAMMPS simulation.  

# 5.1 LAMMPS input scripts  

LAMMPS executes calculations by reading commands from a input script (text file), one line at a time. When the input script ends, LAMMPS exits. This is different from programs that read and process the entire input before starting a calculation.  

Each command causes LAMMPS to take some immediate action without regard for any commands that may be processed later. Commands may set an internal variable, read in a file, or run a simulation. These actions can be grouped into three categories:  

a) commands that change a global setting (examples: timestep, newton, echo, log, thermo, restart),   
b) commands that add, modify, remove, or replace “styles” that are executed during a “run” (examples: pair_style, fix, compute, dump, thermo_style, pair_modify), and   
c) commands that execute a “run” or perform some other computation or operation (examples: print, run, minimize, temper, write_dump, rerun, read_data, read_restart)  

Commands in category a) have default settings, which means you only need to use the command if you wish to change the defaults.  

In many cases, the ordering of commands in an input script is not important, but can have consequences when the global state is changed between commands in the c) category. The following rules apply:  

(1) LAMMPS does not read your entire input script and then perform a simulation with all the settings. Rather, the input script is read one line at a time and each command takes effect when it is read. Thus this sequence of commands:  

<html><body><table><tr><td>timestep 0.5</td></tr><tr><td></td></tr><tr><td>run 100</td></tr><tr><td>run 100</td></tr></table></body></html>  

does something different than this sequence:  

<html><body><table><tr><td>run 100</td><td></td></tr><tr><td>timestep 0.5</td><td></td></tr><tr><td>run 100</td><td></td></tr></table></body></html>  

In the first case, the specified timestep (0.5 fs) is used for two simulations of 100 timesteps each. In the second case, the default timestep (1.0 fs) is used for the first 100 step simulation and a 0.5 fs timestep is used for the second one.  

(2) Some commands are only valid when they follow other commands. For example you cannot set the temperature of a group of atoms until atoms have been defined and a group command is used to define which atoms belong to the group.  

(3) Sometimes command B will use values that can be set by command A. This means command A must precede command B in the input script if it is to have the desired effect. For example, the read_data command initializes the system by setting up the simulation box and assigning atoms to processors. If default values are not desired, the processors and boundary commands need to be used before read_data to tell LAMMPS how to map processors to the simulation box.  

Many input script errors are detected by LAMMPS and an ERROR or WARNING message is printed. The Errors page gives more information on what errors mean. The documentation for each command lists restrictions on how the command can be used.  

You can use the -skiprun command-line flag to have LAMMPS skip the execution of any run, minimize, or similar commands to check the entire input for correct syntax to avoid crashes on typos or syntax errors in long runs.  

# 5.2 Parsing rules for input scripts  

Each non-blank line in the input script is treated as a command. LAMMPS commands are case sensitive. Command names are lower-case, as are specified command arguments. Upper case letters may be used in file names or user-chosen ID strings.  

Here are 6 rules for how each line in the input script is parsed by LAMMPS:  

1. If the last printable character on the line is a “&” character, the command is assumed to continue on the next line. The next line is concatenated to the previous line by removing the “&” character and line break. This allows long commands to be continued across two or more lines. See the discussion of triple quotes in $\epsilon$ for how to continue a command across multiple line without using “&” characters.   
2. All characters from the first “#” character onward are treated as comment and discarded. The exception to this rule is described in 6. Note that a comment after a trailing “&” character will prevent the command from continuing on the next line. Also note that for multi-line commands a single leading “#” will comment out the entire command.  

# this is a comment timestep 1.0 # this is also a comment  

3. The line is searched repeatedly for $\$1$ characters, which indicate variables that are replaced with a text string. The exception to this rule is described in $\it6$ .  

If the $\$1$ is followed by text in curly brackets $\ddots$ , then the variable name is the text inside the curly brackets. If no curly brackets follow the $\$1$ , then the variable name is the single character immediately following the $\$1$ . Thus $\Phi\{\mathrm{myTemp}\}$ and $\$\mathrm{x}$ refer to variables named “myTemp” and $\mathbf{\hat{\Sigma}}^{\leftarrow}\mathbf{{X}}^{\bullet}$ , while $\$\mathrm{xx}$ will be interpreted as a variable named “x” followed by an “x” character.  

How the variable is converted to a text string depends on what style of variable it is; see the variable page for details. It can be a variable that stores multiple text strings, and return one of them. The returned text string can be multiple “words” (space separated) which will then be interpreted as multiple arguments in the input command. The variable can also store a numeric formula which will be evaluated and its numeric result returned as a string.  

As a special case, if the $\$1$ is followed by parenthesis “()”, then the text inside the parenthesis is treated as an “immediate” variable and evaluated as an equal-style variable. This is a way to use numeric formulas in an input script without having to assign them to variable names. For example, these 3 input script lines:  

<html><body><table><tr><td>variable X equal (xlo+xhi) /2+sqrt(v area</td></tr><tr><td>region 1 block $X 2 INF INF EDGE EDGE</td></tr><tr><td></td></tr><tr><td>variableX delete</td></tr></table></body></html>  

can be replaced by:  

region 1 block \$((xlo+xhi)/2+sqrt(v_area)) 2 INF INF EDGE EDGE so that you do not have to define (or discard) a temporary variable, “X” in this case.  

Additionally, the entire “immediate” variable expression may be followed by a colon, followed by a C-style format string, e.g. : $\%\mathrm{f}$ or : $\%.10\mathrm{g}$ . The format string must be appropriate for a double-precision floating-point value. The format string is used to output the result of the variable expression evaluation. If a format string is not specified, a high-precision $\%.20\mathrm{g}$ is used as the default format.  

This can be useful for formatting print output to a desired precision:  

Note that neither the curly-bracket or immediate form of variables can contain nested $\$1$ characters for other variables to substitute for. Thus you may NOT do this:  

<html><body><table><tr><td>variable</td><td>a equal 2</td></tr><tr><td>variable</td><td>b2 equal 4</td></tr><tr><td>print</td><td>"B2 = ${b$a}"</td></tr></table></body></html>  

Nor can you specify an expression like $\$(\Phi\mathrm{x}-1.0)$ for an immediate variable, but you could use $\$1.0$ , since the latter is valid syntax for an equal-style variable.  

See the variable command for more details of how strings are assigned to variables and evaluated, and how they can be used in input script commands.  

4. The line is broken into “words” separated by white-space (tabs, spaces). Note that words can thus contain letters, digits, underscores, or punctuation characters.  

5. The first word is the command name. All successive words in the line are arguments.  

6. If you want text with spaces to be treated as a single argument, it can be enclosed in either single (’) or double (”) or triple (“””) quotes. A long single argument enclosed in single or double quotes can span multiple lines if the “&” character is used, as described in 1 above. When the lines are concatenated together by LAMMPS (and the “&” characters and line breaks removed), the combined text will become a single line. If you want multiple lines of an argument to retain their line breaks, the text can be enclosed in triple quotes, in which case “&” characters are not needed and do not function as line continuation character. For example:  

print "Volume = \$v"   
print $^{1}\mathrm{Volume}=\S\mathbf{v}^{1}$   
if $"\S\{\mathrm{steps}\}>1000"$ then quit   
variable a string "red green blue $\&$ purple orange cyan"   
print """   
System volume $\mathit{\Omega}=\Phi\mathrm{v\Omega}$   
System temperature = \$t   
"""  

In each of these cases, the single, double, or triple quotes are removed and the enclosed text stored internally as a single argument.  

See the dump modify format, print, $i f$ , and python commands for examples.  

A “#” or $\mathbf{\mu}^{\scriptscriptstyle6\scriptscriptstyle6}\Phi^{\prime}$ character that is between quotes will not be treated as a comment indicator in 2 or substituted for as a variable in 3.  

#  Note  

If the argument is itself a command that requires a quoted argument (e.g. using a print command as part of an $i f$ or run every command), then single, double, or triple quotes can be nested in the usual manner. See the doc pages for those commands for examples. Only one of level of nesting is allowed, but that should be sufficient for most use cases.  

# ASCII versus UTF-8  

LAMMPS expects and processes 7-bit ASCII format text internally. Many modern environments use UTF-8 encoding, which is a superset of the 7-bit ASCII character table and thus mostly compatible. However, there are several non-ASCII characters that can look very similar to their ASCII equivalents or are invisible (so they look like a blank), but are encoded differently. Web browsers, PDF viewers, document editors are known to sometimes replace one with the other for a better looking output. However, that can lead to problems, for instance, when using cut-n-paste of input file examples from web pages, or when using a document editor (not a dedicated plain text editor) for writing LAMMPS inputs. LAMMPS will try to detect this and substitute the non-ASCII characters with their ASCII equivalents where known. There also is going to be a warning printed, if this occurs. It is recommended to avoid such characters altogether in LAMMPS input, data and potential files. The replacement tables are likely incomplete and dependent on users reporting problems processing correctly looking input containing UTF-8 encoded non-ASCII characters.  

# 5.3 Input script structure  

This page describes the structure of a typical LAMMPS input script. The examples directory in the LAMMPS distribution contains many sample input scripts; it is discussed on the Examples doc page.  

A LAMMPS input script typically has 4 parts:  

1. Initialization   
2. System definition   
3. Simulation settings   
4. Run a simulation  

The last 2 parts can be repeated as many times as desired. I.e. run a simulation, change some settings, run some more, etc. Each of the 4 parts is now described in more detail. Remember that almost all commands need only be used if a non-default value is desired.  

# 5.3.1 Initialization  

Set parameters that need to be defined before atoms are created or read-in from a file.  

The relevant commands are units, dimension, newton, processors, boundary, atom_style, atom_modify.  

If force-field parameters appear in the files that will be read, these commands tell LAMMPS what kinds of force fields are being used: pair_style, bond_style, angle_style, dihedral_style, improper_style.  

# 5.3.2 System definition  

There are 3 ways to define the simulation cell and reserve space for force field info and fill it with atoms in LAMMPS. Read them in from (1) a data file or (2) a restart file via the read_data or read_restart commands, respectively. These files can also contain molecular topology information. Or (3) create a simulation cell and fill it with atoms on a lattice (with no molecular topology), using these commands: lattice, region, create_box, create_atoms or read_dump.  

The entire set of atoms can be duplicated to make a larger simulation using the replicate command.  

# 5.3.3 Simulation settings  

Once atoms and molecular topology are defined, a variety of settings can be specified: force field coefficients, simulation parameters, output options, and more.  

Force field coefficients are set by these commands (they can also be set in the read-in files): pair_coeff , bond_coeff , angle_coeff , dihedral_coeff , improper_coeff , kspace_style, dielectric, special_bonds.  

Various simulation parameters are set by these commands: neighbor, neigh_modify, group, timestep, reset_timestep, run_style, min_style, min_modify.  

Fixes impose a variety of boundary conditions, time integration, and diagnostic options. The fix command comes in many flavors.  

Various computations can be specified for execution during a simulation using the compute, compute_modify, and variable commands.  

Output options are set by the thermo, dump, and restart commands.  

# 5.3.4 Run a simulation  

A molecular dynamics simulation is run using the run command. Energy minimization (molecular statics) is performed using the minimize command. A parallel tempering (replica-exchange) simulation can be run using the temper command.  

# 5.4 Commands by category  

This page lists most of the LAMMPS commands, grouped by category. The General commands page lists all general commands alphabetically. Style options for entries like fix, compute, pair etc. have their own pages where they are listed alphabetically.  

# 5.4.1 Initialization  

<html><body><table><tr><td>newton</td><td>package</td><td>processors</td><td>suffix</td><td>units</td></tr></table></body></html>  

# 5.4.2 Setup simulation box  

<html><body><table><tr><td>boundary</td><td>change_ box</td><td>create_ box</td><td>dimension</td></tr><tr><td>lattice</td><td></td><td></td><td></td></tr></table></body></html>  

# 5.4.3 Setup atoms  

<html><body><table><tr><td>atom_modify</td><td>atom_style</td><td>balance</td><td>createatoms</td></tr><tr><td>create_bonds</td><td>delete_atoms</td><td>delete_bonds</td><td>displace_atoms</td></tr><tr><td>group</td><td>mass</td><td>molecule</td><td>read_ data</td></tr><tr><td>read_dump</td><td>restart</td><td>replicate</td><td>set</td></tr><tr><td>velocity</td><td></td><td></td><td></td></tr></table></body></html>  

# 5.4.4 Force fields  

<html><body><table><tr><td>angle_coeff</td><td>angle_style</td><td>bond_coeff</td><td>bond_style</td></tr><tr><td>bond_write</td><td>dielectric</td><td>dihedral_coeff</td><td>dihedral_style</td></tr><tr><td>improper_coeff</td><td>improper_style</td><td>kspace_modify</td><td>kspace_style</td></tr><tr><td>pair_coeff</td><td>pair_modify</td><td>pair_style</td><td>pair_write</td></tr><tr><td>special_bonds</td><td></td><td></td><td></td></tr></table></body></html>  

# 5.4.5 Settings  

<html><body><table><tr><td>modify comm</td><td>style comm</td><td>info</td><td>min modify</td></tr><tr><td>min_style</td><td>neigh modify</td><td>neighbor</td><td>partition</td></tr><tr><td>reset timestep</td><td>run _style</td><td>timer</td><td>timestep</td></tr></table></body></html>  

# 5.4.6 Operations within timestepping (fixes) and diagnostics (computes)  

compute compute_modify fix fix_modify uncompute unfix  

# 5.4.7 Output  

<html><body><table><tr><td>dump image</td><td>dumpmovie</td><td>dump</td><td>dump_modify</td></tr><tr><td>restart</td><td>thermo</td><td>thermo_modify</td><td>thermo_style</td></tr><tr><td>undump</td><td>write_coeff</td><td>write_data</td><td>write_c dump</td></tr><tr><td>write_restart</td><td></td><td></td><td></td></tr></table></body></html>  

# 5.4.8 Actions  

<html><body><table><tr><td>minimize</td><td>neb</td><td>neb_spin</td><td>prd</td><td>rerun</td><td>run</td></tr><tr><td>tad</td><td>temper</td><td></td><td></td><td></td><td></td></tr></table></body></html>  

# 5.4.9 Input script control  

<html><body><table><tr><td>clear</td><td>echo</td><td>if</td><td>include</td><td>info</td><td>jump</td><td></td></tr><tr><td>log</td><td>next</td><td>print</td><td>python</td><td>1nb</td><td>shell</td><td>variable</td></tr></table></body></html>  

# 5.5 General commands  

An alphabetic list of general LAMMPS commands.  

<html><body><table><tr><td>angle_coeff</td><td>angle_style</td><td>angle_write</td><td>atom_modify</td><td>atom_style</td><td>balance</td></tr><tr><td>bond_coeff</td><td>bond_style</td><td>bond_write</td><td>boundary</td><td>change_box</td><td>clear</td></tr><tr><td>comm_modify</td><td>comm_style</td><td>compute</td><td>compute_modify</td><td>create_atoms</td><td>create_bonds</td></tr><tr><td>create_box</td><td>delete_atoms</td><td>delete_bonds</td><td>dielectric</td><td>dihedral_coeff</td><td>dihedral_style</td></tr><tr><td>dihedral_write</td><td>dimension</td><td>displace_atoms</td><td>dump</td><td>dump_modify</td><td>echo</td></tr><tr><td>fix</td><td>fix_modify</td><td>geturl</td><td>group</td><td>if</td><td>improper_coeff</td></tr><tr><td>improper_style</td><td>include</td><td>info</td><td>jump</td><td>kspace_modify</td><td>kspace_style</td></tr><tr><td>label</td><td>labelmap</td><td>lattice</td><td>log</td><td>mass</td><td>minimize</td></tr><tr><td>min_modify</td><td>min_style</td><td>molecule</td><td>neigh_modify</td><td>neighbor</td><td>newton</td></tr><tr><td>next</td><td>package</td><td>pair_coeff</td><td>pair_modify</td><td>pair_style</td><td>pair_write</td></tr><tr><td>partition</td><td>print</td><td>processors</td><td>quit</td><td>read_data</td><td>read_dump</td></tr><tr><td>read_restart</td><td>region</td><td>replicate</td><td>rerun</td><td>reset_atoms</td><td>reset_timestep</td></tr><tr><td>restart</td><td>run</td><td>run_style</td><td>set</td><td>shell</td><td>special_bonds</td></tr><tr><td>suffix</td><td>thermo</td><td>thermo_modify</td><td>thermo_style</td><td>timer</td><td>timestep</td></tr><tr><td>uncompute</td><td>undump</td><td>unfix</td><td>units</td><td>variable</td><td>velocity</td></tr><tr><td>write_coeff</td><td>write_data</td><td>write_dump</td><td>write_restart</td><td></td><td></td></tr></table></body></html>  

Additional general LAMMPS commands provided by packages. A few commands have accelerated versions. This is indicated by an additional letter in parenthesis: $\mathbf{k}=\mathrm{KOKKOS}$ .  

<html><body><table><tr><td>dynamical_matrix (k)</td><td>group2ndx</td><td>hyper</td><td>kim</td><td>fitpod</td><td>mdi</td></tr><tr><td>ndx2group</td><td>neb</td><td>neb/spin</td><td>plugin</td><td>prd</td><td>python</td></tr><tr><td>pp1</td><td>temper</td><td>temper/grem</td><td>temper/npt</td><td>third_order (k)</td><td></td></tr></table></body></html>  

# 5.6 Fix styles  

An alphabetic list of all LAMMPS fix commands. Some styles have accelerated versions. This is indicated by additiona letters in parenthesis: $\mathbf{\boldsymbol{g}}=\mathbf{\mathrm{GPU}}$ , $\mathrm{i}=\mathrm{INTEL}$ , $\mathbf{k}=\mathrm{KOKKOS}$ , $\mathbf{o}=$ OPENMP, $\mathbf{t}=\mathrm{OPT}$ .  

<html><body><table><tr><td>accelerate/cos</td><td>acks2/reaxff (k)</td><td>adapt</td><td>adapt/fep</td></tr><tr><td>addforce</td><td>add/heat</td><td>addtorque</td><td>alchemy</td></tr><tr><td>amoeba/bitorsion</td><td>amoeba/pitorsion</td><td>append/atoms</td><td></td></tr><tr><td>atom/swap</td><td>avelatom</td><td>ave/chunk</td><td>avelcorrelate</td></tr><tr><td>ave/correlate/long</td><td>ave/grid</td><td>ave/histo</td><td>ave/histo/weight</td></tr><tr><td>ave/time</td><td>aveforce</td><td>balance</td><td>bocs</td></tr><tr><td>bond/break</td><td>bond/create</td><td>bond/createlangle</td><td>bond/react</td></tr><tr><td>bond/swap</td><td>box/relax</td><td>brownian</td><td>brownian/asphere</td></tr><tr><td>brownian/sphere</td><td>charge/regulation</td><td>cmap (k)</td><td>colvars</td></tr><tr><td>controller</td><td>damping/cundall</td><td>deform (k)</td><td>deform/pressure</td></tr><tr><td>deposit</td><td>dpd/energy (k)</td><td>drag</td><td>drude</td></tr><tr><td>drude/transform/direct</td><td>drude/transform/inverse</td><td>dt/reset (k)</td><td>edpd/source</td></tr><tr><td>efield (k)</td><td>efieldllepton</td><td>efield/tip4p</td><td>ehex</td></tr><tr><td>electrode/conp (i)</td><td>electrode/conq (i)</td><td>electrode/thermo (i)</td><td>electron/stopping</td></tr><tr><td>electron/stopping/fit</td><td>enforce2d (k)</td><td>eos/cv</td><td>eos/table</td></tr><tr><td>eos/table/rx (k)</td><td>evaporate</td><td>external</td><td></td></tr><tr><td>filter/corotate</td><td>flow/gauss</td><td>freeze (k)</td><td>gcmc</td></tr></table></body></html>

continues on next page  

Table 1 – continued from previous page   


<html><body><table><tr><td>gld</td><td>gle</td><td>gravity (ko)</td><td>grem</td></tr><tr><td>halt</td><td>heat</td><td>heat/flow</td><td>hyper/global</td></tr><tr><td>hyper/local</td><td>imd</td><td>indent</td><td>ipi</td></tr><tr><td>langevin (k)</td><td>langevin/drude</td><td>langevin/eff</td><td>langevin/spin</td></tr><tr><td>lb/fuid</td><td>lb/momentum</td><td>lb/viscous</td><td>lineforce</td></tr><tr><td>manifoldforce</td><td>mdilqm</td><td>mdilqmmm</td><td>meso/move</td></tr><tr><td>mol/swap</td><td>momentum (k)</td><td>momentum/chunk</td><td>move</td></tr><tr><td>msst</td><td>mvv/dpd</td><td>mvv/edpd</td><td>mvv/tdpd</td></tr><tr><td>neb</td><td>neb/spin</td><td>nonaffine/displacement</td><td>nph (ko)</td></tr><tr><td>nph/asphere (o)</td><td>nph/body</td><td>nph/eff</td><td>nph/sphere (o)</td></tr><tr><td>nphug</td><td>npt (giko)</td><td>npt/asphere (o)</td><td>npt/body</td></tr><tr><td>npt/cauchy</td><td>nptleff</td><td>npt/sphere (o)</td><td>npt/uef</td></tr><tr><td>numdiff</td><td>numdiff/virial</td><td>nve (giko)</td><td>nve/asphere (gi)</td></tr><tr><td>nve/asphere/noforce</td><td>nvelawpmd</td><td>nve/body</td><td>nve/dot</td></tr><tr><td>nve/dotc/langevin</td><td>nveleff</td><td>nve/limit (k)</td><td>nve/line</td></tr><tr><td>nve/manifold/rattle</td><td>nve/noforce</td><td>nve/sphere (ko)</td><td>nve/bpm/sphere</td></tr><tr><td>nve/spin</td><td>nve/tri</td><td>nvk</td><td>nvt (giko)</td></tr><tr><td>nvt/asphere (o)</td><td>nvt/body</td><td>nvt/leff</td><td>nvt/manifold/rattle</td></tr><tr><td>nvt/sllod (iko)</td><td>nvt/sllodleff</td><td>nvt/sphere (o)</td><td>nvt/uef</td></tr><tr><td>oneway</td><td>orient/bcc</td><td>orientfcc</td><td>orient/eco</td></tr><tr><td>pafi</td><td>pair</td><td>phonon</td><td>pimd/langevin</td></tr><tr><td>pimd/nvt</td><td>planeforce</td><td>plumed</td><td>poems</td></tr><tr><td>polarize/bem/gmres</td><td>polarize/bem/icc</td><td>polarize/functional</td><td>pour</td></tr><tr><td>precession/spin</td><td>press/berendsen</td><td>press/langevin</td><td>print</td></tr><tr><td>propel/self</td><td>property/atom (k)</td><td>pythonlinvoke</td><td>python/move</td></tr><tr><td>qbmsst</td><td>qeq/comb (o)</td><td>qeq/ctip</td><td>qeq/dynamic</td></tr><tr><td>qeq/fire</td><td>qeq/point</td><td>qeq/reaxff(ko)</td><td>qeq/shielded</td></tr><tr><td>qeq/slater</td><td>qmmm</td><td>q1b</td><td>qtpie/reaxff</td></tr><tr><td>rattle</td><td>reaxff/bonds (k)</td><td>reaxff/species (k)</td><td>recenter (k)</td></tr><tr><td>restrain</td><td>rheo</td><td>rheo/oxidation</td><td>rheo/pressure</td></tr><tr><td>rheo/thermal</td><td>rheo/viscosity</td><td>rhok</td><td>rigid (0)</td></tr><tr><td>rigid/meso</td><td>rigid/nph (o)</td><td>rigid/nph/small</td><td>rigid/npt (0)</td></tr><tr><td>rigid/npt/small</td><td>rigid/nve (o)</td><td>rigid/nve/small</td><td>rigid/nvt (o)</td></tr><tr><td>rigid/nvt/small</td><td>rigid/small (o)</td><td>rx (k)</td><td>saed/vtk</td></tr><tr><td>setforce (k)</td><td>setforce/spin</td><td>sgcmc</td><td>shake (k)</td></tr><tr><td>shardlow (k)</td><td>smd</td><td>smd/adjust_dt</td><td>smd/integrate_tlsph</td></tr><tr><td>smd/integrate_ulsph</td><td>smd/move_tri_surf</td><td>smd/setvel</td><td>smd/wall_surface</td></tr><tr><td>sph</td><td>sph/stationary</td><td>spring</td><td>spring/chunk</td></tr><tr><td>spring/rg</td><td>spring/self (k)</td><td>srd</td><td>storelforce</td></tr><tr><td>store/state</td><td>tdpd/source</td><td>temp/berendsen(k)</td><td>temp/csld</td></tr><tr><td>temp/csvr</td><td>temp/rescale (k)</td><td>temp/rescaleleff</td><td>tfmc</td></tr><tr><td>tgnpt/drude</td><td>tgnvt/drude</td><td>thermal/conductivity</td><td>ti/spring</td></tr><tr><td>tmd</td><td>ttm</td><td>ttm/grid</td><td>ttm/mod</td></tr><tr><td>tune/kspace</td><td>vector</td><td>viscosity</td><td>viscous (k)</td></tr><tr><td>viscous/sphere</td><td>wall/body/polygon</td><td>wall/body/polyhedron</td><td>wall/colloid</td></tr><tr><td>wall/ees</td><td>wall/flow (k)</td><td>wall/gran (k)</td><td>wall/gran/region</td></tr><tr><td>wall/harmonic</td><td>wall/lj1043</td><td>wall/lj126</td><td>wall/lj93 (k)</td></tr><tr><td>wall/lepton</td><td>wall/morse</td><td>wall/piston</td><td>wall/reflect (k)</td></tr><tr><td>wall/refect/stochastic</td><td>wall/region (k)</td><td>wall/region/ees</td><td>wall/srd</td></tr><tr><td>wall/table</td><td>widom</td><td></td><td></td></tr></table></body></html>  

# 5.7 Compute styles  

An alphabetic list of all LAMMPS compute commands. Some styles have accelerated versions. This is indicated by additional letters in parenthesis: $\mathbf{g}=\mathbf{GPU}$ , $\mathrm{i}=\mathrm{INTEL}$ , $\mathbf{k}=\mathrm{KOKKOS}$ , $\mathbf{o}=$ OPENMP, $\mathbf{t}=\mathrm{OPT}$ .  

<html><body><table><tr><td>ackland/atom</td><td>adf</td><td>aggregatelatom</td><td>angle</td></tr><tr><td>angle/local</td><td>angmom/chunk</td><td>ave/sphere/atom(k)</td><td>basal/atom</td></tr><tr><td>body/local</td><td>bond</td><td>bondlocal</td><td>born/matrix</td></tr><tr><td>centrolatom</td><td>centroid/stress/atom</td><td>chunk/atom</td><td>chunk/spread/atom</td></tr><tr><td>cluster/atom</td><td>cna/atom</td><td>cnp/atom</td><td>com</td></tr><tr><td>com/chunk</td><td>contact/atom</td><td>coord/atom (k)</td><td>count/type</td></tr><tr><td>damage/atom</td><td>dihedral</td><td>dihedral/local</td><td>dilatation/atom</td></tr><tr><td>dipole</td><td>dipole/chunk</td><td>dipole/tip4p</td><td>dipole/tip4p/chunk</td></tr><tr><td>displace/atom</td><td>dpd</td><td>dpd/atom</td><td>edpd/temp/atom</td></tr><tr><td>efieldlatom</td><td>efield/wolflatom</td><td>entropy/atom</td><td>erotate/asphere</td></tr><tr><td>erotate/rigid</td><td>erotate/sphere (k)</td><td>erotate/sphere/atom</td><td>event/displace</td></tr><tr><td>fabric</td><td>fep</td><td>fep/ta</td><td>force/tally</td></tr><tr><td>fragment/atom</td><td>gaussian/grid/local (k)</td><td>global/atom</td><td>group/group</td></tr><tr><td>gyration</td><td>gyration/chunk</td><td>gyration/shape</td><td>gyration/shape/chunk</td></tr><tr><td>heat/flux</td><td>heat/fux/tally</td><td>heat/fux/virial/tally</td><td>hexorder/atom</td></tr><tr><td>hma</td><td>improper</td><td>improper/local</td><td>inertia/chunk</td></tr><tr><td>ke</td><td>kelatom</td><td>kelatomleff</td><td>keleff</td></tr><tr><td>ke/rigid</td><td>composition/atom(k)</td><td>mliap</td><td>momentum</td></tr><tr><td>msd</td><td>msd/chunk</td><td>msd/nongauss</td><td>nbond/atom</td></tr><tr><td>omega/chunk</td><td>orientorder/atom(k)</td><td>pace</td><td>pair</td></tr><tr><td>pair/local</td><td>pe</td><td>pelatom</td><td>pe/moltally</td></tr><tr><td>pe/tally</td><td>plasticity/atom</td><td>pod/atom</td><td>podd/atom</td></tr><tr><td>pod/local</td><td>pod/global</td><td>pressure</td><td>pressurelalchemy</td></tr><tr><td>pressure/uef</td><td>property/atom</td><td>property/chunk</td><td>property/grid</td></tr><tr><td>property/local</td><td>ptm/atom</td><td>rattlers/atom</td><td>rdf</td></tr><tr><td>reaxff/atom (k)</td><td>reduce</td><td>reduce/chunk</td><td>reduce/region</td></tr><tr><td>rheo/property/atom</td><td>rigid/local</td><td>saed</td><td>slcsalatom</td></tr><tr><td>slice</td><td>smd/contact/radius</td><td>smd/damage</td><td>smd/hourglass/error</td></tr><tr><td>smd/internal/energy</td><td>smd/plastic/strain</td><td>smd/plastic/strain/rate</td><td>smd/rho</td></tr><tr><td>smd/tlsph/defgrad</td><td>smd/tlsph/dt</td><td>smd/tlsph/num/neighs</td><td>smd/tlsph/shape</td></tr><tr><td>smd/tlsph/strain</td><td>smd/tlsph/strain/rate</td><td>smd/tlsph/stress</td><td>smd/triangle/vertices</td></tr><tr><td>smd/ulsph/effm</td><td>smd/ulsph/num/neighs</td><td>smd/ulsph/strain</td><td>smd/ulsph/strain/rate</td></tr><tr><td>smd/ulsph/stress</td><td>smd/vol</td><td>snap</td><td>sna/atom</td></tr><tr><td>sna/grid (k)</td><td>sna/grid/local (k)</td><td>snadlatom</td><td>snav/atom</td></tr><tr><td>sph/elatom</td><td>sph/rho/atom</td><td>sph/tlatom</td><td>spin</td></tr><tr><td>stress/atom</td><td>stress/cartesian</td><td>stress/cylinder</td><td>stress/mop</td></tr><tr><td>stress/mop/profile</td><td>stress/spherical</td><td>stress/tally</td><td>tdpd/cc/atom</td></tr><tr><td>temp (k)</td><td>temp/asphere</td><td>temp/body</td><td>temp/chunk</td></tr><tr><td>temp/com</td><td>temp/cs</td><td>temp/deform (k)</td><td>temp/deformleff</td></tr><tr><td>temp/drude</td><td>templeff</td><td>temp/partial</td><td>temp/profile</td></tr><tr><td>temp/ramp</td><td>temp/region</td><td>temp/region/eff</td><td>temp/rotate</td></tr><tr><td>temp/sphere</td><td>temp/uef</td><td>ti</td><td>torque/chunk</td></tr><tr><td>vacf</td><td>vcm/chunk</td><td>viscosity/cos</td><td>voronoi/atom</td></tr><tr><td>pux</td><td></td><td></td><td></td></tr></table></body></html>  

# 5.8 Pair styles  

All LAMMPS pair_style commands. Some styles have accelerated versions. This is indicated by additional letters in parenthesis: $\mathbf{\boldsymbol{g}}=\mathbf{\mathrm{GPU}}$ , $\mathrm{i}=\mathrm{INTEL}$ , $\mathbf{k}=\mathrm{KOKKOS}$ , $\mathbf{o}=$ OPENMP, $\mathbf{t}=\mathrm{OPT}$ .  

<html><body><table><tr><td>none</td><td>zero</td><td>hybrid (ko)</td></tr><tr><td>hybrid/molecular (o)</td><td>hybrid/overlay (ko)</td><td>hybrid/scaled (o)</td></tr><tr><td>kim</td><td>list</td><td>tracker</td></tr><tr><td>adp (ko)</td><td>agni (o)</td><td>aip/water/2dm(t)</td></tr><tr><td>airebo (io)</td><td>airebo/morse (io)</td><td>amoeba (g)</td></tr><tr><td>atm</td><td>awpmd/cut</td><td>beck (go)</td></tr><tr><td>body/nparticle</td><td>body/rounded/polygon</td><td>body/rounded/polyhedron</td></tr><tr><td>bop</td><td>born (go)</td><td>born/coul/dsf</td></tr><tr><td>born/coul/dsf/cs</td><td>born/coul/long (go)</td><td>born/coul/long/cs (g)</td></tr><tr><td>born/coul/msm (o)</td><td>born/coul/wolf (go)</td><td>born/coul/wolf/cs (g)</td></tr><tr><td>born/gauss</td><td>bpm/spring</td><td>brownian (ko)</td></tr><tr><td>brownian/poly (o)</td><td>buck (giko)</td><td>buck/coul/cut (giko)</td></tr><tr><td>buck/coul/long (giko)</td><td>buck/coul/long/cs</td><td>buck/coul/msm(o)</td></tr><tr><td>buck/long/coul/long(o)</td><td>buck/mdf</td><td>buck6d/coul/gauss/dsf</td></tr><tr><td>buck6d/coul/gauss/long</td><td>colloid (go)</td><td>comb (o)</td></tr><tr><td>comb3</td><td>cosine/squared</td><td>coul/ctip</td></tr><tr><td>coul/cut (gko)</td><td>coul/cut/dielectric</td><td>coul/cut/global (o)</td></tr><tr><td>(0) hfos/1no/nos</td><td>coul/debye (gko)</td><td>coul/diel (o)</td></tr><tr><td>coul/dsf (gko)</td><td>coul/exclude</td><td>coul/long (gko)</td></tr><tr><td>coul/long/cs (g)</td><td>coul/long/dielectric</td><td>coul/long/soft (o)</td></tr><tr><td>coul/msm (o)</td><td>coul/slater/cut</td><td>coul/slater/long (g)</td></tr><tr><td>coul/shield</td><td>coul/streitz</td><td>coul/tt</td></tr><tr><td>coul/wolf (ko)</td><td>coul/wolfl/cs</td><td>dispersion/d3</td></tr><tr><td>dpd (giko)</td><td>dpd/coul/slater/long (g)</td><td>dpd/ext (ko)</td></tr><tr><td>dpd/ext/tstat (ko)</td><td>dpd/fdt</td><td>dpd/fdt/energy (k)</td></tr><tr><td>dpd/tstat (gko)</td><td>dsmc</td><td>e3b</td></tr><tr><td>drip</td><td>eam (gikot)</td><td>eam/alloy (gikot)</td></tr><tr><td>eam/cd</td><td>eam/cdlold</td><td>eam/fs (gikot)</td></tr><tr><td>eam/he</td><td>edip (0)</td><td>edip/multi</td></tr><tr><td>edpd (g)</td><td>eff/cut</td><td>eim (0)</td></tr><tr><td>exp6/rx (k)</td><td>extep</td><td>gauss (go)</td></tr><tr><td>gauss/cut (o)</td><td>gayberne (gio)</td><td>gran/hertz/history (o)</td></tr><tr><td>gran/hooke (o)</td><td>gran/hooke/history (ko)</td><td>granular</td></tr><tr><td>gw</td><td>gw/zbl</td><td>harmonic/cut (o)</td></tr><tr><td>hbond/dreiding/lj (o)</td><td>hbond/dreiding/jlangleoffset(o)</td><td>hbond/dreiding/morse(o)</td></tr><tr><td>hbond/dreiding/morse/angleoffset(o)</td><td></td><td>hippo (g)</td></tr><tr><td>ilp/graphene/hbn(t)</td><td>hdnnp ilp/tmd (t)</td><td>kolmogorov/crespi/full</td></tr><tr><td>kolmogorov/crespi/z</td><td>lcbop</td><td>lebedeva/z</td></tr><tr><td></td><td>lepton (o)</td><td>lepton/coul (o)</td></tr><tr><td>lennard/mdf lepton/sphere(o)</td><td>line/lj</td><td></td></tr><tr><td></td><td></td><td>lj/charmm/coul/charmm(giko)</td></tr><tr><td>lj/charmm/coul/charmm/implicit(ko) lj/charmm/coul/msm(o)</td><td>lj/charmm/coul/long(gikot) lj/charmmfsw/coul/charmmfsh</td><td>lj/charmm/coul/long/soft(o)</td></tr><tr><td>lj/class2(gko)</td><td>lj/class2/cou/cut(ko)</td><td>lj/charmmfsw/coul/long(k)</td></tr><tr><td>lj/class2/coul/long (gko)</td><td>lj/class2/coul/long/cs</td><td>lj/class2/coul/cut/soft lj/class2/coul/long/soft</td></tr><tr><td>lj/class2/soft</td><td>lj/cubic (go)</td><td>lj/cut (gikot)</td></tr><tr><td></td><td>lj/cut/coul/cut/dielectric (o)</td><td>lj/cut/coul/cut/soft (go)</td></tr><tr><td>lj/cut/coul/cut (gko)</td><td></td><td></td></tr></table></body></html>

continues on next page  

# 5.8. Pair styles  

Table 3 – continued from previous page   


<html><body><table><tr><td>lj/cut/coul/debye (gko)</td><td>lj/cut/coul/debye/dielectric(o)</td><td>lj/cut/coul/dsf(gko)</td></tr><tr><td>lj/cut/coul/long(gikot)</td><td>ljlcut/coul/long/cs</td><td>lj/cut/coul/long/dielectric(o)</td></tr><tr><td>lj/cut/coul/long/soft (go)</td><td>lj/cut/coul/msm(go)</td><td>lj/cut/coul/msm/dielectric</td></tr><tr><td>ljlcut/coul/wolf (o)</td><td>lj/cut/dipole/cut (gko)</td><td>lj/cut/dipole/long (g)</td></tr><tr><td>lj/cut/dipole/sf(go)</td><td>lj/cut/soft (o)</td><td>lj/cut/sphere(o)</td></tr><tr><td>lj/cut/thole/long (o)</td><td>lj/cut/tip4p/cut (o)</td><td>lj/cut/tip4p/long (got)</td></tr><tr><td>lj/cut/tip4p/long/soft(o)</td><td>lj/expand (gko)</td><td>lj/expand/coul/long (gk)</td></tr><tr><td>ljlexpand/sphere(o)</td><td>lj/gromacs (gko)</td><td>lj/gromacs/coul/gromacs (ko)</td></tr><tr><td>ljlong/coul/long (iot)</td><td>ljlong/coul/long/dielectric</td><td>lj/long/dipole/long</td></tr><tr><td>lj/long/tip4p/long (o)</td><td>lj/mdf</td><td>lj/relres (o)</td></tr><tr><td>lj/spica (gko)</td><td>lj/spica/coul/long (gko)</td><td>lj/spica/coul/msm(o)</td></tr><tr><td>lj/sf/dipole/sf (go)</td><td>lj/smooth (go)</td><td>lj/smooth/linear(o)</td></tr><tr><td>lj/switch3/coulgauss/long</td><td>lj96/cut (go)</td><td>local/density</td></tr><tr><td>lubricate (o)</td><td>lubricate/poly (o)</td><td>lubricateU</td></tr><tr><td>lubricateU/poly</td><td>mdpd (g)</td><td>mdpd/rhosum</td></tr><tr><td>meam (k)</td><td>meam/ms (k)</td><td>meam/spline (o)</td></tr><tr><td>meam/sw/spline</td><td>mesocnt</td><td>mesocnt/viscous</td></tr><tr><td>mgpt</td><td>mie/cut (g)</td><td>mliap (k)</td></tr><tr><td>mm3/switch3/coulgauss/long</td><td>momb</td><td>morse (gkot)</td></tr><tr><td>morse/smooth/linear(o)</td><td>morse/soft</td><td>multi/lucy</td></tr><tr><td>multi/lucy/rx (k)</td><td>nb3b/harmonic</td><td>nb3b/screened</td></tr><tr><td>nm/cut (o)</td><td>nm/cut/coul/cut(o)</td><td>nm/cut/coul/long (o)</td></tr><tr><td>nm/cut/split</td><td>oxdna/coaxstk</td><td>oxdna/excv</td></tr><tr><td>oxdna/hbond</td><td>oxdna/stk</td><td>oxdna/xstk</td></tr><tr><td>oxdna2/coaxstk</td><td>oxdna2/dh</td><td>oxdna2/excv</td></tr><tr><td>oxdna2/hbond</td><td>oxdna2/stk</td><td>oxdna2/xstk</td></tr><tr><td>oxrna2/excv</td><td>oxrna2/hbond</td><td>oxrna2/dh</td></tr><tr><td>oxrna2/stk</td><td>oxrna2/xstk</td><td>oxrna2/coaxstk</td></tr><tr><td>pace (k)</td><td>pace/extrapolation (k)</td><td>pedone (o)</td></tr><tr><td>pod (k)</td><td>perileps</td><td>peri/lps (o)</td></tr><tr><td>peri/pmb (o)</td><td>peri/ves</td><td>polymorphic</td></tr><tr><td>python</td><td>quip</td><td>rann</td></tr><tr><td>reaxff(ko)</td><td>rebo (io)</td><td>rebomos (o)</td></tr><tr><td>resquared (go)</td><td>rheo</td><td>rheo/solid</td></tr><tr><td>saip/metal (t)</td><td></td><td>smatb</td></tr><tr><td>smatb/single</td><td>sdpd/taitwater/isothermal smd/hertz.</td><td></td></tr><tr><td>smd/tri_surface</td><td>smd/ulsph</td><td>smd/tlsph smtbq</td></tr><tr><td>snap (ik)</td><td>soft (gko)</td><td>sph/heatconduction (g)</td></tr><tr><td>sphlidealgas</td><td>sph/lj (g)</td><td></td></tr><tr><td></td><td></td><td>sph/rhosum</td></tr><tr><td>sph/taitwater (g)</td><td>sph/taitwater/morris</td><td>spin/dipole/cut</td></tr><tr><td>spin/dipole/long</td><td>spin/dmi</td><td>spin/exchange</td></tr><tr><td>spin/exchange/biquadratic</td><td>spin/magelec</td><td>spin/neel</td></tr><tr><td>srp</td><td>srp/react</td><td>sw (giko)</td></tr><tr><td>sw/angle/table</td><td>sw/mod (o)</td><td>table (gko)</td></tr><tr><td>table/rx (k)</td><td>tdpd</td><td>tersoff (giko)</td></tr><tr><td>tersoff/mod (gko)</td><td>tersoff/mod/c (o)</td><td>tersoff/table (o)</td></tr><tr><td>tersoff/zbl (gko)</td><td>thole</td><td>threebody/table</td></tr><tr><td>tip4p/cut (o)</td><td>tip4p/long (o)</td><td>tip4p/long/soft (o)</td></tr><tr><td>tri/lj</td><td>ufm (got)</td><td>uf3 (k)</td></tr><tr><td>vashishta (gko)</td><td>vashishta/table (o)</td><td>wf/cut</td></tr><tr><td>ylz.</td><td>yukawa (gko)</td><td>yukawa/colloid(gko)</td></tr></table></body></html>

continues on next page  

Table 3 – continued from previous page   


<html><body><table><tr><td>zbl (gko)</td></tr></table></body></html>  

# 5.9 Bond styles  

All LAMMPS bond_style commands. Some styles have accelerated versions. This is indicated by additional letters in parenthesis: $\mathbf{\boldsymbol{g}}=\mathbf{\mathrm{GPU}}$ , $\mathrm{i}=\mathrm{INTEL}$ , $\mathbf{k}=\mathrm{KOKKOS}$ , $\mathbf{o}=$ OPENMP, $\mathbf{t}=\mathrm{OPT}$ .  

<html><body><table><tr><td>none</td><td>zero</td><td>hybrid (k)</td><td></td><td></td></tr><tr><td>bpm/rotational</td><td>bpm/spring</td><td>class2(ko)</td><td>fene (iko)</td><td>fenelexpand (o)</td></tr><tr><td>fene/nm</td><td>issneg</td><td>gromos (o)</td><td>harmonic(iko)</td><td>harmonic/restrain</td></tr><tr><td>harmonic/shift (o)</td><td>harmonic/shift/cut (o)</td><td>lepton (o)</td><td>mesocnt</td><td>mm3</td></tr><tr><td>morse (o)</td><td>nonlinear (o)</td><td>oxdna/fene</td><td>oxdna2/fene</td><td>oxrna2/fene</td></tr><tr><td>quartic (o)</td><td>rheo/shell</td><td>special</td><td>(0) 1qp1</td><td></td></tr></table></body></html>  

# 5.10 Angle styles  

All LAMMPS angle_style commands. Some styles have accelerated versions. This is indicated by additional letters in parenthesis: $\mathbf{\boldsymbol{g}}=\mathbf{\mathrm{GPU}}$ , $\mathrm{i}=\mathrm{INTEL}$ , $\mathbf{k}=\mathrm{KOKKOS}$ , $\mathbf{o}=$ OPENMP, $\mathbf{t}=\mathrm{OPT}$ .  

<html><body><table><tr><td>none</td><td>zero</td><td>hybrid (k)</td><td></td><td></td></tr><tr><td>amoeba</td><td>charmm (iko)</td><td>class2 (ko)</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td>class2/p6</td><td>cosine (ko)</td></tr><tr><td>cosine/buck6d</td><td>cosine/delta(o)</td><td>cosine/periodic(o)</td><td>cosine/shift (o)</td><td>cosine/shift/exp(o)</td></tr><tr><td>cosine/squared (o)</td><td>cosine/squared/restricted(o)</td><td>cross</td><td>dipole (o)</td><td>fourier (o)</td></tr><tr><td>fourier/simple(o) mm3</td><td>gaussian mwlc</td><td>harmonic (iko) quartic (o)</td><td>lepton (o) spica (ko)</td><td>mesocnt table (o)</td></tr></table></body></html>  

# 5.11 Dihedral styles  

All LAMMPS dihedral_style commands. Some styles have accelerated versions. This is indicated by additional letters in parenthesis: $\mathbf{g}=\mathbf{GPU}$ , $\mathrm{i}=\mathrm{INTEL}$ , $\mathbf{k}=\mathrm{KOKKOS}$ , $\mathbf{o}=$ OPENMP, $\mathbf{t}=\mathrm{OPT}$ .  

<html><body><table><tr><td>none zero</td><td></td><td>hybrid (k)</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>charmm (iko)</td><td>charmmfsw (k) harmonic(iko)</td><td>class2 (ko)</td><td>cosine/shift/exp (o) lepton (o)</td><td>cosine/squared/restricted multi/harmonic (o)</td></tr><tr><td>fourier (io) nharmonic (o)</td><td></td><td>helix (o)</td><td>spherical</td><td>table (o)</td></tr><tr><td>tablelcut</td><td>opls (iko)</td><td>quadratic (o)</td><td></td><td></td></tr></table></body></html>  

# 5.12 Improper styles  

All LAMMPS improper_style commands. Some styles have accelerated versions. This is indicated by additional letters in parenthesis: $\mathbf{g}=\mathbf{GPU}$ , $\mathrm{i}=\mathrm{INTEL}$ , $\mathbf{k}=\mathrm{KOKKOS}$ , $\mathbf{o}=$ OPENMP, $\mathbf{t}=\mathbf{OPT}$ .  

# 5.9. Bond styles  

<html><body><table><tr><td>none zero</td><td>hybrid (k)</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>amoeba</td><td>class2 (ko)</td><td>cossq (0)</td><td>cvff (io)</td><td>distance</td></tr><tr><td>distharm</td><td>fourier r (o)</td><td>harmonic(iko)</td><td>inversion/harmonic</td><td>ring (o)</td></tr><tr><td>sqdistharm</td><td>umbrella (o)</td><td></td><td></td><td></td></tr></table></body></html>  

# 5.13 KSpace styles  

All LAMMPS kspace_style solvers. Some styles have accelerated versions. This is indicated by additional letters in parenthesis: $\mathbf{\boldsymbol{g}}=\mathbf{\mathrm{GPU}}$ , $\mathrm{i}=\mathrm{INTEL}$ , $\mathbf{k}=\mathrm{KOKKOS}$ , $\mathbf{o}=$ OPENMP, $\mathbf{t}=\mathrm{OPT}$ .  

<html><body><table><tr><td>ewald (o)</td><td>ewald/disp</td><td>ewald/disp/dipole</td><td>ewald/dipole</td><td>ewald/dipole/spin</td></tr><tr><td>ewald/electrode</td><td>msm (0)</td><td>msm/cg (o)</td><td>msm/dielectric</td><td>pppm (giko)</td></tr><tr><td>pppm/cg (o)</td><td>pppm/dipole</td><td>pppm/dipole/spin</td><td>pppm/dielectric</td><td>pppm/disp(io)</td></tr><tr><td>pppm/disp/tip4p(o)</td><td>pppm/disp/dielectric</td><td>pppm/stagger</td><td>pppm/tip4p(o)</td><td>pppm/dielectric</td></tr><tr><td>pppm/electrode e (i)</td><td>scafacos</td><td></td><td></td><td></td></tr></table></body></html>  

# 5.14 Dump styles  

An alphabetic list of all LAMMPS dump commands.  

<html><body><table><tr><td>atom</td><td>atom/adios</td><td>atom/gz</td><td>atom/zstd</td><td>cfg</td><td>cfg/gz</td></tr><tr><td>cfg/uef</td><td>cfg/zstd</td><td>custom</td><td>custom/adios</td><td>custom/gz</td><td>custom/zstd</td></tr><tr><td></td><td>grid</td><td>grid/vtk</td><td>h5md</td><td>image</td><td></td></tr><tr><td>local/gz</td><td>local/zstd</td><td>molfile</td><td>movie</td><td>netcdf</td><td>netcdf/mpiio</td></tr><tr><td>vtk</td><td>xtc</td><td>xyz</td><td>xyz/gz</td><td>p1s2/ZKx</td><td></td></tr></table></body></html>  

# 5.15 Removed commands and packages  

# Contents  

• Removed commands and packages  

– LAMMPS shell   
– i-PI tool   
– USER-REAXC package   
– MPIIO package   
– MSCG package   
– LATTE package   
– Minimize style fire/old   
– Pair style mesont/tpm, compute style mesont, atom style mesont   
– Box command   
– Reset_ids, reset_atom_ids, reset_mol_ids commands   
– MESSAGE package   
– REAX package   
– MEAM package   
– USER-CUDA package   
– Fix ave/spatial and fix ave/spatial/sphere   
restart2data tool  

This page lists LAMMPS commands and packages that have been removed from the distribution and provides suggestions for alternatives or replacements. LAMMPS has special dummy styles implemented, that will stop LAMMPS and print a suitable error message in most cases, when a style/command is used that has been removed or will replace the command with the direct alternative (if available) and print a warning.  

# 5.15.1 LAMMPS shell  

Changed in version 29Aug2024.  

The LAMMPS shell has been removed from the LAMMPS distribution. Users are encouraged to use the LAMMPSGUI tool instead.  

# 5.15.2 i-PI tool  

Changed in version 27Jun2024.  

The i-PI tool has been removed from the LAMMPS distribution. Instead, instructions to install i-PI from PyPI via pip are provided.  

# 5.15.3 USER-REAXC package  

Deprecated since version 7Feb2024.  

The USER-REAXC package has been renamed to REAXFF. In the process also the pair style and related fixes were renamed to use the “reaxff” string instead of “reax/c”. For a while LAMMPS was maintaining backward compatibility by providing aliases for the styles. These have been removed, so using “reaxff” is now required.  

# 5.15.4 MPIIO package  

Deprecated since version 21Nov2023.  

The MPIIO package has been removed from LAMMPS since it was unmaintained for many years and thus not updated to incorporate required changes that had been applied to the corresponding non-MPIIO commands. As a consequence the MPIIO commands had become unreliable and sometimes crashing LAMMPS or corrupting data. Similar functionality is available through the ADIOS package and the NETCDF package. Also, the dump_modify nfile or dump_modify fileper keywords may be used for an efficient way of writing out dump files when running on large numbers of processors. Similarly, the “nfile” and “fileper” keywords exist for restarts: see restart, read_restart, write_restart.  

# 5.15.5 MSCG package  

Deprecated since version 21Nov2023.  

The MSCG package has been removed from LAMMPS since it was unmaintained for many years and instead superseded by the OpenMSCG software of the Voth group at the University of Chicago, which can be used independent from LAMMPS.  

# 5.15.6 LATTE package  

Deprecated since version 15Jun2023.  

The LATTE package with the fix latte command was removed from LAMMPS. This functionality has been superseded by fix mdi/qm and fix mdi/qmmm from the MDI package. These fixes are compatible with several quantum software packages, including LATTE. See the examples/QUANTUM dir and the MDI coupling HOWTO page. MDI supports running LAMMPS with LATTE as a plugin library (similar to the way fix latte worked), as well as on a different set of MPI processors.  

# 5.15.7 Minimize style fire/old  

Deprecated since version 8Feb2023.  

Minimize style fire/old has been removed. Its functionality can be reproduced with style fire with specific options.   
Please see the min_modify command documentation for details.  

# 5.15.8 Pair style mesont/tpm, compute style mesont, atom style mesont  

Deprecated since version 8Feb2023.  

Pair style mesont/tpm, compute style mesont, and atom style mesont have been removed from the MESONT package.   
The same functionality is available through pair style mesocnt, bond style mesocnt and angle style mesocnt.  

# 5.15.9 Box command  

Deprecated since version 22Dec2022.  

The box command has been removed and the LAMMPS code changed so it won’t be needed. If present, LAMMPS will ignore the command and print a warning.  

# 5.15.10 Reset_ids, reset_atom_ids, reset_mol_ids commands  

Deprecated since version 22Dec2022.  

The reset_ids, reset_atom_ids, and reset_mol_ids commands have been folded into the reset_atoms command. If present, LAMMPS will replace the commands accordingly and print a warning.  

# 5.15.11 MESSAGE package  

Deprecated since version 4May2022.  

The MESSAGE package has been removed since it was superseded by the MDI package. MDI implements the same functionality and in a more general way with direct support for more applications.  

# 5.15.12 REAX package  

Deprecated since version 4Jan2019.  

The REAX package has been removed since it was superseded by the REAXFF package. The REAXFF package has been tested to yield equivalent results to the REAX package, offers better performance, supports OpenMP multithreading via OPENMP, and GPU and threading parallelization through KOKKOS. The new pair styles are not syntax compatible with the removed reax pair style, so input files will have to be adapted. The REAXFF package was originally called USER-REAXC.  

# 5.15.13 MEAM package  

Deprecated since version $4\mathrm{Jan}2019$ .  

The MEAM package in Fortran has been replaced by a $\mathrm{C}{+}{+}$ implementation. The code in the MEAM package is a translation of the Fortran code of MEAM into $\mathrm{C}{+}{+}$ , which removes several restrictions (e.g. there can be multiple instances in hybrid pair styles) and allows for some optimizations leading to better performance. The pair style meam has the exact same syntax. For a transition period the $\mathrm{C}{+}{+}$ version of MEAM was called USER-MEAMC so it could coexist with the Fortran version.  

# 5.15.14 USER-CUDA package  

Deprecated since version 31May2016.  

The USER-CUDA package had been removed, since it had been unmaintained for a long time and had known bugs and problems. Significant parts of the design were transferred to the KOKKOS package, which has similar performance characteristics on NVIDIA GPUs. Both, the KOKKOS and the GPU package are maintained and allow running LAMMPS with GPU acceleration.  

# 5.15.15 Fix ave/spatial and fix ave/spatial/sphere  

Deprecated since version 11Dec2015.  

The fixes ave/spatial and ave/spatial/sphere have been removed from LAMMPS since they were superseded by the more general and extensible “chunk infrastructure”. Here the system is partitioned in one of many possible ways through the compute chunk/atom command and then averaging is done using fix ave/chunk. Please refer to the chunk HOWTO section for an overview.  

# 5.15.16 restart2data tool  

Deprecated since version 23Nov2013.  

The functionality of the restart2data tool has been folded into the LAMMPS executable directly instead of having a separate tool. A combination of the commands read_restart and write_data can be used to the same effect. For added convenience this conversion can also be triggered by command-line flags  

# OPTIONAL PACKAGES  

This section gives an overview of the optional packages that extend LAMMPS functionality. Packages are groups of files that enable a specific set of features. For example, force fields for molecular systems or rigid-body constraints are in packages. You can see the list of all packages and “make” commands to manage them by typing “make package” from within the src directory of the LAMMPS distribution. The Build package page gives general info on how to install and uninstall packages as part of the LAMMPS build process.  

# 6.1 Available Packages  

This is the list of packages included in LAMMPS. The link for each package name gives more details.  

Packages are supported by either the LAMMPS developers or the contributing authors and written in a syntax and style consistent with the rest of LAMMPS.  

The “Examples” column is a subdirectory in the examples directory of the distribution which has one or more input scripts that use the package. E.g. peptide refers to the examples/peptide directory; PACKAGES/atc refers to the examples/PACKAGES/atc directory. The “Lib” column indicates\`\` whether an extra library is needed to build and use the package:  

• no $=$ no library   
• sys $=$ system library: you likely have it on your machine   
• int $=$ internal library: provided with LAMMPS, but you may need to build it • ext $=$ external library: you will need to download and install it on your machine  

<html><body><table><tr><td>Package</td><td>Description</td><td>Doc page</td><td>Examples</td><td>Lib</td></tr><tr><td>ADIOS</td><td>dump output via ADIOS</td><td>dump adios</td><td>PACKAGES/adios</td><td>ext</td></tr><tr><td>AMOEBA</td><td>AMOEBA and HIPPO force fields</td><td>AMOEBAandHIPPOhowto</td><td>amoeba</td><td>no</td></tr><tr><td>ASPHERE</td><td>aspherical particle models</td><td>Howto spherical</td><td>ellipse</td><td>no</td></tr><tr><td>ATC</td><td>Atom-to- Continuum coupling</td><td>fix atc</td><td>PACKAGES/atc</td><td>int</td></tr><tr><td>AWPMD BOCS</td><td>wave packet MD</td><td>pair_styleawpmd/cut</td><td>PACKAGES/awpmd</td><td>int</td></tr><tr><td></td><td>BOCS bottom up coarse graining</td><td>fix bocs</td><td>PACKAGES/bocs</td><td>no</td></tr><tr><td>BODY</td><td>body-style particles</td><td>Howto body</td><td>body</td><td>no</td></tr><tr><td>BPM</td><td>bonded particle models</td><td>Howtobpm</td><td>bpm</td><td>no</td></tr></table></body></html>

continues on next page  

Table 1 – continued from previous page   


<html><body><table><tr><td>Package</td><td>Description</td><td>Doc page</td><td>Examples</td><td>Lib</td></tr><tr><td>BROWNIAN</td><td>Brownian dynamics,. self-propelled parti- cles</td><td>fix brownian, fix propel/self</td><td>PACKAGES/brownian</td><td>no</td></tr><tr><td>CG-DNA</td><td>coarse-grained DNA force fields</td><td>src/CG-DNA/README</td><td>PACKAGES/cgdna</td><td>no</td></tr><tr><td>CG-SPICA</td><td>SPICA (SDK) coarse-graining model</td><td>pair_style lj/spica</td><td>PACKAGES /cgspica</td><td>no</td></tr><tr><td>CLASS2</td><td>class 2 force fields</td><td>pair_style lj/class2</td><td>n/a</td><td>no</td></tr><tr><td>COLLOID COLVARS</td><td>colloidal particles</td><td>atom_style colloid</td><td>colloid</td><td>no</td></tr><tr><td></td><td>Colvars collective</td><td>fix colvars</td><td>PACKAGES/colvars</td><td>int</td></tr><tr><td>COMPRESS</td><td>variables library 1/0 compression</td><td>dump */gz</td><td>n/a</td><td>sys</td></tr><tr><td>CORESHELL</td><td>adiabatic core/shell model</td><td>Howto coreshell</td><td>coreshell</td><td>no</td></tr><tr><td>DIELECTRIC</td><td>dielectric  boundary solvers and force</td><td>compute efieldlatom</td><td>PACKAGES/dielectric</td><td>no</td></tr><tr><td>DIFFRACTION</td><td>styles virtual x-ray and electron diffraction</td><td>computexrd</td><td>PACKAGES/diffraction</td><td>no</td></tr><tr><td>DIPOLE</td><td>point dipole parti- cles</td><td>pair_style ljl.../dipole</td><td>dipole</td><td>no</td></tr><tr><td>DPD-BASIC</td><td>basic DPD models</td><td>pair_styles dpd dpd/ext</td><td>PACKAGES/dpd-basic</td><td>no</td></tr><tr><td>DPD-MESO</td><td>mesoscale DPD models</td><td>pair_style edpd</td><td>PACKAGES/dpd-meso</td><td>no</td></tr><tr><td>DPD-REACT</td><td>reactive dissipative particle dynamics</td><td>src/DPD-REACT/README</td><td>PACKAGES/dpd-react</td><td>no</td></tr><tr><td>DPD-SMOOTH</td><td>smoothed dissi- pative particle</td><td>src/DPD-SMOOTH/ README</td><td>PACKAGES dpd-smooth</td><td>no</td></tr><tr><td>DRUDE</td><td>dynamics Drude oscillators</td><td>Howto drude</td><td>PACKAGES/drude</td><td></td></tr><tr><td>EFF ELECTRODE</td><td>electron force field</td><td>pair_style eff/cut</td><td>PACKAGES/eff</td><td>no no</td></tr><tr><td></td><td>electrode charges to match potential</td><td>fixelectrode/conp</td><td>PACKAGES/electrode</td><td>no</td></tr><tr><td>EXTRA-</td><td>additional command</td><td>generalcommands</td><td>n/a</td><td>no</td></tr><tr><td>COMMAND EXTRA-COMPUTE</td><td>styles additional compute</td><td>compute</td><td>n/a</td><td></td></tr><tr><td></td><td>styles</td><td></td><td></td><td>no</td></tr><tr><td>EXTRA-DUMP</td><td>additional dump styles</td><td>dump</td><td>n/a</td><td>no</td></tr><tr><td>EXTRA-FIX EXTRA-</td><td>additional fix styles additional molecular</td><td>fix molecularstyles</td><td>n/a n/a</td><td>no</td></tr><tr><td>MOLECULE</td><td>styles</td><td></td><td></td><td>no</td></tr><tr><td>EXTRA-PAIR</td><td>additional pair styles</td><td>pair_style</td><td>n/a</td><td>no</td></tr><tr><td>FEP</td><td>free energy pertur- bation</td><td>compute fep</td><td>PACKAGES/fep</td><td>no</td></tr><tr><td>GPU</td><td>GPU-enabled styles</td><td>Section gpu</td><td>Benchmarks</td><td>int</td></tr><tr><td>GRANULAR H5MD</td><td>granular systems dump</td><td>Howto granular</td><td>pour</td><td>no</td></tr><tr><td></td><td>）output via HDF5</td><td>dumph5md</td><td>n/a</td><td>ext</td></tr></table></body></html>

continues on next page  

Table 1 – continued from previous page   


<html><body><table><tr><td>Package</td><td>Description</td><td>page Doc page</td><td>Examples</td><td>Lib</td></tr><tr><td>INTEL</td><td>optimized Intel CPU</td><td>Speed intel</td><td>Benchmarks</td><td>no</td></tr><tr><td>INTERLAYER</td><td>and KNL styles Inter-layer pair po-</td><td>several pairstyles</td><td>PACKAGES/interlayer</td><td>no</td></tr><tr><td>KIM</td><td>tentials OpenKIM wrapper</td><td>pair_style kim</td><td>kim</td><td>ext</td></tr><tr><td>S</td><td>Kokkos-enabled styles</td><td>Speed kokkos</td><td>Benchmarks</td><td>no</td></tr><tr><td>KSPACE</td><td>long-range Coulom- bic solvers</td><td>kspace_style</td><td>peptide</td><td>no</td></tr><tr><td>LATBOLTZ</td><td>Lattice Boltzmann fuid</td><td>fix lb/fuid</td><td>PACKAGES/latboltz</td><td>no</td></tr><tr><td>LEPTON</td><td>evaluate strings as potential function</td><td>pair_style lepton</td><td>PACKAGES /lepton</td><td>int</td></tr><tr><td>MACHDYN</td><td>smoothed Mach dy- namics</td><td>SMD User Guide</td><td>PACKAGES/machdyn</td><td></td></tr><tr><td>MANIFOLD</td><td>motion 1 on  2d sur- fix manifoldforce faces</td><td></td><td>PACKAGES/manifold</td><td>no</td></tr><tr><td>MANYBODY</td><td>many-body poten- tials</td><td>pair_style tersoff</td><td>shear</td><td>no</td></tr><tr><td>MC MDI</td><td>Monte Carlo options client-server code</td><td>fix gcmc</td><td>n/a</td><td>no</td></tr><tr><td></td><td>coupling</td><td>MDIHowto</td><td>PACKAGES/mdi</td><td>ext</td></tr><tr><td>MEAM</td><td>modified EAM po- tential (C++)</td><td>pair_style meam</td><td>meam</td><td>no</td></tr><tr><td>MESONT</td><td>mesoscopic  tubular potential model</td><td>pair styles mesocnt</td><td>PACKAGES/mesont</td><td>no</td></tr><tr><td>MGPT</td><td>fast MGPT multi- ion potentials</td><td>pair_style mgpt</td><td>PACKAGES/mgpt</td><td>no</td></tr><tr><td>MISC</td><td>miscellaneous single-file com- mands</td><td>n/a</td><td>no</td><td>no</td></tr><tr><td>ML-HDNNP</td><td>High-dimensional neural network potentials</td><td>pair_style hdnnp</td><td>PACKAGES /hdnnp</td><td></td></tr><tr><td>ML-IAP</td><td>multiple machine learning potentials</td><td>pair_style mliap</td><td>mliap</td><td>no</td></tr><tr><td>ML-PACE</td><td>Atomic Cluster Ex- pansion potential</td><td>pair pace</td><td>PACKAGES/pace</td><td>ext</td></tr><tr><td>ML-POD</td><td>Proper （ orthogonal decomposition</td><td>pair pod</td><td>pod</td><td>ext</td></tr><tr><td>ML-QUIP</td><td>potentials QUIP/libatoms interface</td><td>pair_style quip</td><td>PACKAGES /quip</td><td>ext</td></tr><tr><td>ML-RANN</td><td>Pair style for RANN potentials</td><td>pair rann</td><td>PACKAGES/rann</td><td>no</td></tr><tr><td>ML-SNAP</td><td>quantum-fitted potential</td><td>pair_style snap</td><td>snap</td><td>no</td></tr><tr><td>ML-UF3</td><td>quantum-fitted ultra fast potentials</td><td>pair_style uf3</td><td>PACKAGES/uf3</td><td>no</td></tr></table></body></html>

continues on next page  

Table 1 – continued from previous page   


<html><body><table><tr><td>Package</td><td>Description</td><td>Doc page</td><td>Examples</td><td>Lib</td></tr><tr><td>MOFFF</td><td>styles for MOF-FF force field</td><td>pair_stylebuck6d/coul/gauss</td><td>PACKAGES/mofff</td><td>no</td></tr><tr><td>MOLECULE</td><td>molecular system force fields</td><td>Howto bioFF</td><td>peptide</td><td>no</td></tr><tr><td>MOLFILE</td><td>VMD molfile plug- ins</td><td>dump molfile</td><td>n/a</td><td>ext</td></tr><tr><td>NETCDF</td><td>dump output via NetCDF</td><td>dump netcdf</td><td>n/a</td><td>ext</td></tr><tr><td>OPENMP</td><td>OpenMP-enabled styles</td><td>Speed omp</td><td>Benchmarks</td><td>no</td></tr><tr><td>OPT ORIENT</td><td>optimized pair styles</td><td>Speed opt</td><td>Benchmarks</td><td>no</td></tr><tr><td></td><td>fixes for orientation depended forces</td><td>fix orient/*</td><td>PACKAGES orient_eco</td><td>no</td></tr><tr><td>PERI</td><td>Peridynamics mod- els</td><td>pair_style peri</td><td>peri</td><td>no</td></tr><tr><td>PHONON</td><td>phonon dynamical matrix</td><td>fix phonon</td><td>PACKAGES/phonon</td><td>no</td></tr><tr><td>PLUGIN</td><td>Plugin loader com- mand</td><td>plugin</td><td>plugins</td><td>no</td></tr><tr><td>PLUMED</td><td>PLUMED free en- ergy library</td><td>fix plumed</td><td>PACKAGES/plumed</td><td>ext</td></tr><tr><td>POEMS</td><td>coupled rigid body motion</td><td> fix poems</td><td>rigid</td><td>int</td></tr><tr><td>PTM</td><td>Polyhedral Template Matching</td><td>compute ptm/atom</td><td>n/a</td><td>no</td></tr><tr><td>PYTHON</td><td>embed Python code in an input script</td><td>python</td><td>python</td><td>sys</td></tr><tr><td>QEQ</td><td>QEq charge equili- bration</td><td>fix qeq</td><td>bab</td><td>no</td></tr><tr><td>QMMM QTB</td><td>QM/MM coupling quantum nuclear ef-</td><td>fixqmmm fix qtbfix qbmsst</td><td>PACKAGES/qmmm qtb</td><td>ext</td></tr><tr><td></td><td>fects</td><td></td><td></td><td>no</td></tr><tr><td>RHEO</td><td>reproducing  hydro- dynamics and elastic objects</td><td>Howto rheo</td><td>rheo</td><td>no</td></tr><tr><td>REACTION</td><td>chemical reactions in classical MD</td><td>fix bond/react</td><td>PACKAGES/reaction</td><td>no</td></tr><tr><td>REAXFF</td><td>ReaxFF potential (C/C++)</td><td>pair_style reaxff</td><td>reax</td><td>no</td></tr><tr><td>REPLICA</td><td>multi-replica  meth- ods</td><td>Howtoreplica</td><td>tad</td><td>no</td></tr><tr><td>RIGID</td><td>rigid bodies and constraints</td><td>fix rigid</td><td>rigid</td><td>no</td></tr><tr><td>SCAFACOS</td><td>wrapper for ScaFa- CoS Kspace solver</td><td>kspace_style scafacos</td><td>PACKAGES/scafacos</td><td>ext</td></tr><tr><td>SHOCK</td><td>shock loading meth- ods</td><td>fix msst</td><td>n/a</td><td>no</td></tr><tr><td>SMTBQ</td><td>second moment tight binding poten- tials</td><td>pair styles smtbq, smatb</td><td>PACKAGES/smtbq</td><td>no</td></tr></table></body></html>

continues on next page  

Table 1 – continued from previous page   


<html><body><table><tr><td>Package</td><td>Description</td><td>Doc page</td><td>Examples</td><td>Lib</td></tr><tr><td>SPH</td><td>smoothed particle hydrodynamics</td><td>SPH User Guide</td><td>PACKAGES/sph</td><td>no</td></tr><tr><td>SPIN</td><td>magnetic atomic spin dynamics</td><td>Howto spins</td><td>SPIN</td><td>no</td></tr><tr><td>SRD</td><td>stochastic rotation dynamics</td><td>fix srd</td><td>srd</td><td>no</td></tr><tr><td>TALLY</td><td>pairwise tally com- putes</td><td>computeXxx/tally</td><td>PACKAGES /tally</td><td>no</td></tr><tr><td>UEF VORONOI</td><td>extensional flow</td><td>fixnvt/uef</td><td>PACKAGES/uef</td><td>no</td></tr><tr><td>VTK</td><td>Voronoi tesselation dump output via</td><td>computevoronoi/atom compute vtk</td><td>n/a n/a</td><td>ext</td></tr><tr><td></td><td>VTK</td><td></td><td></td><td>ext</td></tr><tr><td>YAFF</td><td>additional styles im- plemented inYAFF</td><td>angle_style cross</td><td>PACKAGES/yaff</td><td>no</td></tr></table></body></html>  

# 6.2 Package details  

Here is a brief description of all packages in LAMMPS. It lists authors (if applicable) and summarizes the package contents. It has specific instructions on how to install the package, including, if necessary, info on how to download or build any extra library it requires. It also gives links to documentation, example scripts, and pictures/movies (if available) that illustrate use of the package.  

The majority of packages can be included in a LAMMPS build with a single setting (-D PKG_ $<$ <NAME> $>=$ on for CMake) or command (make yes- $<$ <name $>$ for make). See the Build package page for more info. A few packages may require additional steps; this is indicated in the descriptions below. The Build extras page gives those details.  

# Note  

To see the complete list of commands a package adds to LAMMPS, you can examine the files in its src directory, e.g. ls src/GRANULAR. Files with names that start with fix, compute, atom, pair, bond, angle, etc correspond to commands with the same style name as contained in the file name.  

<html><body><table><tr><td>ADIOS</td><td>AMOEBA</td><td>ASPHERE</td><td>ATC</td><td>AWPMD</td><td>BOCS</td></tr><tr><td>BODY</td><td>BPM</td><td>BROWNIAN</td><td>CG-DNA</td><td>CG-SPICA</td><td>CLASS2</td></tr><tr><td>COLLOID</td><td>COLVARS</td><td>COMPRESS</td><td>CORESHELL</td><td>DIELECTRIC</td><td>DIFFRAC- TION</td></tr><tr><td>DIPOLE</td><td>DPD-BASIC</td><td>DPD-MESO</td><td>DPD-REACT</td><td>DPD- SMOOTH</td><td>DRUDE</td></tr><tr><td rowspan="2">EFF</td><td>ELEC-</td><td>EXTRA-</td><td>EXTRA-</td><td>EXTRA-</td><td rowspan="2">EXTRA-FIX</td></tr><tr><td>TRODE</td><td>COMMAND</td><td>COMPUTE</td><td>DUMP</td></tr><tr><td>EXTRA-</td><td>EXTRA-</td><td>FEP</td><td>GPU</td><td>GRANULAR</td><td>H5MD</td></tr><tr><td>MOLECULE INTEL</td><td>PAIR INTER-</td><td>KIM</td><td>KOKKOS</td><td>KSPACE</td><td>LATBOLTZ</td></tr><tr><td></td><td>LAYER</td><td></td><td></td><td></td><td></td></tr><tr><td>LEPTON MEAM</td><td>MACHDYN</td><td>MANIFOLD</td><td>MANYBODY</td><td>MC</td><td>MDI</td></tr><tr><td></td><td>MESONT</td><td>MGPT</td><td>MISC</td><td>ML-HDNNP</td><td>ML-IAP</td></tr><tr><td>ML-PACE</td><td>ML-POD</td><td>ML-QUIP</td><td>ML-RANN</td><td>ML-SNAP</td><td>ML-UF3</td></tr><tr><td>MOFFF</td><td>MOLECULE</td><td>MOLFILE</td><td>NETCDF</td><td>OPENMP</td><td>OPT</td></tr><tr><td>ORIENT</td><td>PERI</td><td>PHONON</td><td>PLUGIN</td><td>PLUMED</td><td>POEMS</td></tr><tr><td>PTM</td><td>PYTHON</td><td>QEQ</td><td>QMMM</td><td>QTB</td><td>RHEO</td></tr><tr><td>REACTION</td><td>REAXFF</td><td>REPLICA</td><td>RIGID</td><td>SCAFACOS</td><td>SHOCK</td></tr><tr><td>SMTBQ</td><td>SPH</td><td>SPIN</td><td>SRD</td><td>TALLY</td><td>UEF</td></tr><tr><td>VORONOI</td><td>VTK</td><td>YAFF</td><td></td><td></td><td></td></tr></table></body></html>  

# 6.2.1 ADIOS package  

# Contents:  

ADIOS is a high-performance I/O library. This package implements the dump atom/adios, dump custom/adios and read_dump . . . format adios commands to write and read data using the ADIOS library.  

Authors: Norbert Podhorszki (ORNL) from the ADIOS developer team.  

Added in version 28Feb2019.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/ADIOS: filenames $\mathrm{->}$ commands   
• src/ADIOS/README   
• examples/PACKAGES/adios   
• https://github.com/ornladios/ADIOS2   
• dump atom/adios   
• dump custom/adios   
• read_dump  

# 6.2.2 AMOEBA package  

# Contents:  

Implementation of the AMOEBA and HIPPO polarized force fields originally developed by Jay Ponder’s group at the U Washington at St Louis. The LAMMPS implementation is based on Fortran 90 code provided by the Ponder group in their Tinker MD software.  

Authors: Josh Rackers and Steve Plimpton (Sandia), Trung Nguyen (U Chicago)  

# Supporting info:  

• src/AMOEBA: filenames -> commands   
• AMOEBA and HIPPO howto   
• pair_style amoeba   
• pair_style hippo   
• atom_style amoeba   
• angle_style amoeba   
• improper_style amoeba   
• fix amoeba/bitorsion   
• fix amoeba/pitorsion   
• tools/tinker/tinker2lmp.py   
• examples/amoeba  

# 6.2.3 ASPHERE package  

# Contents:  

Computes, time-integration fixes, and pair styles for aspherical particle models including ellipsoids, 2d lines, and 3d triangles.  

# Supporting info:  

• src/ASPHERE: filenames $\mathrm{->}$ commands   
• Howto spherical   
• pair_style gayberne   
• pair_style resquared   
• pair_style ylz   
• doc/PDF/pair_gayberne_extra.pdf   
• doc/PDF/pair_resquared_extra.pdf   
• examples/ASPHERE   
• examples/ellipse   
• https://www.lammps.org/movies.html#line   
• https://www.lammps.org/movies.html#tri  

# 6.2. Package details  

# 6.2.4 ATC package  

# Contents:  

ATC stands for atoms-to-continuum. This package implements a fix atc command to either couple molecular dynamics with continuum finite element equations or perform on-the-fly conversion of atomic information to continuum fields.  

Authors: Reese Jones, Jeremy Templeton, Jon Zimmerman (Sandia).  

# Install:  

This package has specific installation instructions on the Build extras page. The ATC package requires that also the MANYBODY package is installed.  

# Supporting info:  

• src/ATC: filenames $->$ commands   
• src/ATC/README   
• fix atc   
• examples/PACKAGES/atc   
• https://www.lammps.org/pictures.html#atc  

# 6.2.5 AWPMD package  

# Contents:  

AWPMD stands for Antisymmetrized Wave Packet Molecular Dynamics. This package implements an atom, pair, and fix style which allows electrons to be treated as explicit particles in a classical molecular dynamics model.  

Author: Ilya Valuev (JIHT, Russia).  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/AWPMD: filenames $->$ commands • src/AWPMD/README • pair_style awpmd/cut examples/PACKAGES/awpmd  

# 6.2.6 BOCS package  

# Contents:  

This package provides fix bocs, a modified version of fix npt which includes the pressure correction to the barostat as outlined in:  

N. J. H. Dunn and W. G. Noid, “Bottom-up coarse-grained models that accurately describe the structure, pressure, and compressibility of molecular liquids”, J. Chem. Phys. 143, 243148 (2015).  

Authors: Nicholas J. H. Dunn and Michael R. DeLyser (The Pennsylvania State University)  

Supporting info:  

The BOCS package for LAMMPS is part of the BOCS software package: https://github.com/noid-group/BOCS See the following reference for information about the entire package:  

Dunn, NJH; Lebold, KM; DeLyser, MR; Rudzinski, JF; Noid, WG. “BOCS: Bottom-Up Open-Source Coarse-Graining Software.” J. Phys. Chem. B. 122, 13, 3363-3377 (2018).  

Example inputs are in the examples/PACKAGES/bocs folder.  

# 6.2.7 BODY package  

# Contents:  

Body-style particles with internal structure. Computes, time-integration fixes, pair styles, as well as the body styles themselves. See the Howto body page for an overview.  

# Supporting info:  

• src/BODY filenames $->$ commands   
• Howto_body   
• atom_style body   
• fix nve/body   
• pair_style body/nparticle   
• examples/body  

# 6.2.8 BPM package  

# Contents:  

Pair styles, bond styles, fixes, and computes for bonded particle models for mesoscale simulations of solids and fracture.   
See the Howto bpm page for an overview.  

Authors: Joel T. Clemmer (Sandia National Labs) Added in version 4May2022.  

# Supporting info:  

• src/BPM: filenames $\mathrm{->}$ commands   
• Howto_bpm   
• atom_style bpm/sphere   
• bond_style bpm/rotational   
• bond_style bpm/spring   
compute nbond/atom   
• fix nve/bpm/sphere   
• pair_style bpm/spring   
• https://www.lammps.org/movies.html#bpmpackage   
• examples/bpm  

# 6.2. Package details  

# 6.2.9 BROWNIAN package  

# Contents:  

This package provides fix brownian, fix brownian/sphere, and fix brownian/asphere as well as fix propel/self which allow to do Brownian Dynamics time integration of point, spherical and aspherical particles and also support selfpropelled particles.  

Authors: Sam Cameron (University of Bristol), Stefan Paquay (while at Brandeis University) (initial version of fix propel/self)  

Added in version 14May2021.  

Example inputs are in the examples/PACKAGES/brownian folder.  

# 6.2.10 CG-DNA package  

# Contents:  

Several pair styles, bond styles, and integration fixes for coarse-grained modelling of single- and double-stranded DNA and RNA based on the oxDNA and oxRNA model of Doye, Louis and Ouldridge. The package includes Langevin-type rigid-body integrators with improved stability.  

Author: Oliver Henrich (University of Strathclyde, Glasgow).  

# Install:  

The CG-DNA package requires that also the MOLECULE and ASPHERE packages are installed.  

# Supporting info:  

• src/CG-DNA: filenames -> commands   
• src/CG-DNA/README   
• pair_style oxdna/\*   
• pair_style oxdna2/\*   
• pair_style oxrna2/\*   
• bond_style oxdna/\*   
• bond_style oxdna2/\*   
• bond_style oxrna2/\*   
• fix nve/dotc/langevin   
• examples/PACKAGES/cgdna  

# 6.2.11 CG-SPICA package  

# Contents:  

Several pair styles and an angle style which implement the coarse-grained SPICA (formerly called SDK) model which enables simulation of biological or soft material systems.  

Original Author: Axel Kohlmeyer (Temple U).  

Maintainers: Yusuke Miyazaki and Wataru Shinoda (Okayama U).  

Supporting info:  

• src/CG-SPICA: filenames $\mathrm{->}$ commands   
• src/CG-SPICA/README   
• pair_style lj/spica/\*   
• angle_style spica   
• examples/PACKAGES/cgspica   
• https://www.lammps.org/pictures.html#cg   
• https://www.spica-ff.org/  

# 6.2.12 CLASS2 package  

# Contents:  

Bond, angle, dihedral, improper, and pair styles for the COMPASS CLASS2 molecular force field.  

# Supporting info:  

• src/CLASS2: filenames $\mathbf{->}$ commands   
• bond_style class2   
• angle_style class2   
• dihedral_style class2   
• improper_style class2   
• pair_style lj/class2  

# 6.2.13 COLLOID package  

# Contents:  

Coarse-grained finite-size colloidal particles. Pair styles and fix wall styles for colloidal interactions. Includes the Fast Lubrication Dynamics (FLD) method for hydrodynamic interactions, which is a simplified approximation to Stokesian dynamics.  

Authors: This package includes Fast Lubrication Dynamics pair styles which were created by Amit Kumar and Michael Bybee from Jonathan Higdon’s group at UIUC.  

# Supporting info:  

• src/COLLOID: filenames $\mathrm{->}$ commands   
• fix wall/colloid   
• pair_style colloid   
• pair_style yukawa/colloid   
• pair_style brownian   
pair_style lubricate   
pair_style lubricateU   
examples/colloid   
• examples/srd  

# 6.2. Package details  

# 6.2.14 COLVARS package  

# Contents:  

Colvars stands for collective variables, which can be used to implement various enhanced sampling methods, including Adaptive Biasing Force, Metadynamics, Steered MD, Umbrella Sampling and Restraints. A fix colvars command is implemented which wraps a COLVARS library, which implements these methods. simulations.  

Authors: The COLVARS library is written and maintained by Giacomo Fiorin (NIH, Bethesda, MD, USA) and Jerome Henin (CNRS, Paris, France), originally for the NAMD MD code, but with portability in mind. Axel Kohlmeyer (Temple U) provided the interface to LAMMPS.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/COLVARS: filenames $\mathbf{->}$ commands   
• doc/PDF/colvars-refman-lammps.pdf   
• src/COLVARS/README   
• lib/colvars/README   
• fix colvars   
• group2ndx   
• ndx2group   
examples/PACKAGES/colvars  

# 6.2.15 COMPRESS package  

# Contents:  

Compressed output of dump files via the zlib compression library, using dump styles with a “gz” in their style name.   
To use this package you must have the zlib compression library available on your system.  

Author: Axel Kohlmeyer (Temple U).  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• src/COMPRESS: filenames $\mathrm{->}$ commands   
• src/COMPRESS/README   
• lib/compress/README   
• dump atom/gz   
• dump cfg/gz   
• dump custom/gz   
• dump xyz/gz  

# 6.2.16 CORESHELL package  

# Contents:  

Compute and pair styles that implement the adiabatic core/shell model for polarizability. The pair styles augment Born, Buckingham, and Lennard-Jones styles with core/shell capabilities. The compute temp/cs command calculates the temperature of a system with core/shell particles. See the Howto coreshell page for an overview of how to use this package.  

Author: Hendrik Heenen (Technical U of Munich).  

# Supporting info:  

• src/CORESHELL: filenames $->$ commands   
• Howto coreshell   
• Howto polarizable   
• compute temp/cs   
• pair_style born/coul/long/cs   
• pair_style buck/coul/long/cs   
• pair_style lj/cut/coul/long/cs   
• examples/coreshell  

# 6.2.17 DIELECTRIC package  

# Contents:  

An atom style, multiple pair styles, several fixes, Kspace styles and a compute for simulating systems using boundary element solvers for computing the induced charges at the interface between two media with different dielectric constants.  

# Install:  

To use this package, also the KSPACE and EXTRA-PAIR packages need to be installed.  

Author: Trung Nguyen and Monica Olvera de la Cruz (Northwestern U) Added in version 2Jul2021.  

# Supporting info:  

• src/DIELECTRIC: filenames $->$ commands   
• atom_style dielectric   
• pair_style coul/cut/dielectric   
• pair_style coul/long/dielectric   
• pair_style lj/cut/coul/cut/dielectric   
• pair_style lj/cut/coul/debye/dielectric   
pair_style lj/cut/coul/long/dielectric   
pair_style lj/cut/coul/msm/dielectric   
pair_style pppm/dielectric  

# 6.2. Package details  

# LAMMPS Documentation, Release 4Feb2025  

• pair_style pppm/disp/dielectric • pair_style msm/dielectric • fix_style polarize/bem/icc • fix_style polarize/bem/gmres • fix_style polarize/functional • compute efield/atom • examples/PACKAGES/dielectric  

# 6.2.18 DIFFRACTION package  

# Contents:  

Two computes and a fix for calculating x-ray and electron diffraction intensities based on kinematic diffraction theory.  

Author: Shawn Coleman while at the U Arkansas.  

# Supporting info:  

• src/DIFFRACTION: filenames $\mathrm{->}$ commands   
compute saed   
• compute xrd   
• fix saed/vtk examples/PACKAGES/diffraction  

# 6.2.19 DIPOLE package  

# Contents:  

An atom style and several pair styles for point dipole models with short-range or long-range interactions.  

# Supporting info:  

• src/DIPOLE: filenames $\mathrm{->}$ commands   
• atom_style dipole   
• pair_style lj/cut/dipole/cut   
• pair_style lj/cut/dipole/long   
• pair_style lj/long/dipole/long   
• angle_style dipole   
• examples/dipole  

# 6.2.20 DPD-BASIC package  

# Contents:  

Pair styles for the basic dissipative particle dynamics (DPD) method and DPD thermostatting.  

Pair style dpd/coul/slater/long also includes smeared charges for coulomb interactions and thus requires the KSPACE package to be installed to handle the long-range Coulomb part of the interactions.  

Authors: Kurt Smith (U Pittsburgh), Martin Svoboda, Martin Lisal (ICPF and UJEP), Eddy Barraud (IFPEN)  

# Supporting info:  

• src/DPD-BASIC: filenames $\mathbf{->}$ commands   
• pair_style dpd   
• pair_style dpd/tstat   
• pair_style dpd/ext   
• pair_style dpd/ext/tstat   
pair_style dpd/coul/slater/long   
examples/PACKAGES/dpd-basic  

# 6.2.21 DPD-MESO package  

# Contents:  

Several extensions of the dissipative particle dynamics (DPD) method. Specifically, energy-conserving DPD (eDPD) that can model non-isothermal processes, many-body DPD (mDPD) for simulating vapor-liquid coexistence, and transport DPD (tDPD) for modeling advection-diffusion-reaction systems. The equations of motion of these DPD extensions are integrated through a modified velocity-Verlet (MVV) algorithm.  

Author: Zhen Li (Department of Mechanical Engineering, Clemson University)  

# Supporting info:  

• src/DPD-MESO: filenames $->$ commands   
• src/DPD-MESO/README   
• atom_style edpd   
• pair_style edpd   
• pair_style mdpd   
• pair_style tdpd   
• fix mvv/dpd   
• examples/PACKAGES/mesodpd   
• https://www.lammps.org/movies.html#mesodpd  

# 6.2.22 DPD-REACT package  

# Contents:  

DPD stands for dissipative particle dynamics. This package implements coarse-grained DPD-based models for energetic, reactive molecular crystalline materials. It includes many pair styles specific to these systems, including for reactive DPD, where each particle has internal state for multiple species and a coupled set of chemical reaction ODEs are integrated each timestep. Highly accurate time integrators for isothermal, isoenergetic, isobaric and isenthalpic conditions are included. These enable long timesteps via the Shardlow splitting algorithm.  

Authors: Jim Larentzos (ARL), Tim Mattox (Engility Corp), and John Brennan (ARL).  

# Supporting info:  

• src/DPD-REACT: filenames $->$ command   
• src/DPD-REACT/README   
• compute dpd   
• compute dpd/atom   
• fix eos/cv   
• fix eos/table   
• fix eos/table/rx   
• fix shardlow   
• fix rx   
• pair_style table/rx   
• pair_style dpd/fdt   
• pair_style dpd/fdt/energy   
• pair_style exp6/rx   
• pair_style multi/lucy pair_style multi/lucy/rx   
examples/PACKAGES/dpd-react  

# 6.2.23 DPD-SMOOTH package  

# Contents:  

A pair style for smoothed dissipative particle dynamics (SDPD), which is an extension of smoothed particle hydrodynamics (SPH) to mesoscale where thermal fluctuations are important (see the SPH package). Also two fixes for moving and rigid body integration of SPH/SDPD particles (particles of atom_style meso).  

Author: Morteza Jalalvand (Institute for Advanced Studies in Basic Sciences, Iran).  

# Supporting info:  

• src/DPD-SMOOTH: filenames $\mathrm{->}$ commands • src/DPD-SMOOTH/README • pair_style sdpd/taitwater/isothermal • fix meso/move  

• fix rigid/meso examples/PACKAGES/dpd-smooth  

# 6.2.24 DRUDE package  

# Contents:  

Fixes, pair styles, and a compute to simulate thermalized Drude oscillators as a model of polarization. See the Howto drude and Howto drude2 pages for an overview of how to use the package. There are auxiliary tools for using this package in tools/drude.  

Authors: Alain Dequidt (U Clermont Auvergne), Julien Devemy (CNRS), and Agilio Padua (ENS de Lyon).  

# Supporting info:  

• src/DRUDE: filenames $->$ commands   
• Howto drude   
• Howto drude2   
• Howto polarizable   
• src/DRUDE/README   
• fix drude   
• fix drude/transform/\*   
• compute temp/drude   
• pair_style thole   
• pair_style lj/cut/thole/long   
• examples/PACKAGES/drude   
• tools/drude  

# 6.2.25 EFF package  

# Contents:  

EFF stands for electron force field which allows a classical MD code to model electrons as particles of variable radius. This package contains atom, pair, fix and compute styles which implement the eFF as described in A. Jaramillo-Botero, J. Su, Q. An, and W.A. Goddard III, JCC, 2010. The eFF potential was first introduced by Su and Goddard, in 2007. There are auxiliary tools for using this package in tools/eff; see its README file.  

Author: Andres Jaramillo-Botero (CalTech).  

# Supporting info:  

• src/EFF: filenames $\mathbf{->}$ commands   
• src/EFF/README   
• atom_style electron   
• fix nve/eff   
• fix nvt/eff  

# 6.2. Package details  

# LAMMPS Documentation, Release 4Feb2025  

• fix npt/eff   
• fix langevin/eff   
• compute temp/eff   
• pair_style eff/cut   
• pair_style eff/inline   
• examples/PACKAGES/eff   
• tools/eff/README   
• tools/eff   
• https://www.lammps.org/movies.html#eff  

# 6.2.26 ELECTRODE package  

# Contents:  

The ELECTRODE package allows the user to enforce a constant potential method for groups of atoms that interact with the remaining atoms as electrolyte.  

Authors: The ELECTRODE package is written and maintained by Ludwig Ahrens-Iwers (TUHH, Hamburg, Germany), Shern Tee (UQ, Brisbane, Australia) and Robert Meissner (Helmholtz-Zentrum Hereon, Geesthacht and TUHH, Hamburg, Germany).  

Added in version 4May2022.  

# Install:  

This package has specific installation instructions on the Build extras page.  

# Supporting info:  

• fix electrode/conp • fix electrode/conq • fix electrode/thermo  

# 6.2.27 EXTRA-COMMAND package  

# Contents:  

Additional command styles that are less commonly used.  

# Supporting info:  

• src/EXTRA-COMMAND: filenames $\mathrm{->}$ commands • general commands  

# 6.2.28 EXTRA-COMPUTE package  

# Contents:  

Additional compute styles that are less commonly used.  

# Supporting info:  

• src/EXTRA-COMPUTE: filenames $->$ commands • compute  

# 6.2.29 EXTRA-DUMP package  

# Contents:  

Additional dump styles that are less commonly used.  

# Supporting info:  

• src/EXTRA-DUMP: filenames $\mathbf{->}$ commands • dump  

# 6.2.30 EXTRA-FIX package  

# Contents:  

Additional fix styles that are less commonly used.  

# Supporting info:  

• src/EXTRA-FIX: filenames $\mathrm{->}$ commands • fix  

# 6.2.31 EXTRA-MOLECULE package  

# Contents:  

Additional bond, angle, dihedral, and improper styles that are less commonly used.  

# Install:  

To use this package, also the MOLECULE package needs to be installed.  

# Supporting info:  

• src/EXTRA-MOLECULE: filenames $\mathrm{->}$ commands • molecular styles  

# 6.2. Package details  

# 6.2.32 EXTRA-PAIR package  

# Contents:  

Additional pair styles that are less commonly used.  

# Supporting info:  

• src/EXTRA-PAIR: filenames $->$ commands • pair_style • examples/PACKAGES/dispersion  

# 6.2.33 FEP package  

# Contents:  

FEP stands for free energy perturbation. This package provides methods for performing FEP simulations by using a fix adapt/fep command with soft-core pair potentials, which have a “soft” in their style name. There are auxiliary tools for using this package in tools/fep; see its README file.  

Author: Agilio Padua (ENS de Lyon)  

# Supporting info:  

• src/FEP: filenames $\mathrm{->}$ commands   
• src/FEP/README   
• fix adapt/fep   
• compute fep   
pair_style \*/soft   
• examples/PACKAGES/fep   
• tools/fep/README   
• tools/fep  

# 6.2.34 GPU package  

# Contents:  

Dozens of pair styles and a version of the PPPM long-range Coulombic solver optimized for GPUs. All such styles have a “gpu” as a suffix in their style name. The GPU code can be compiled with either CUDA or OpenCL, however the OpenCL variants are no longer actively maintained and only the CUDA versions are regularly tested. The GPU package page gives details of what hardware and GPU software is required on your system, and details on how to build and use this package. Its styles can be invoked at run time via the -sf gpu or -suffix gpu command-line switches. See also the KOKKOS package, which has GPU-enabled styles.  

Authors: Mike Brown (Intel) while at Sandia and ORNL and Trung Nguyen (Northwestern U) while at ORNL and later. AMD HIP support by Evgeny Kuznetsov, Vladimir Stegailov, and Vsevolod Nikolskiy (HSE University).  

# Install:  

This package has specific installation instructions on the Build extras page.  

Supporting info:  

• src/GPU: filenames $->$ commands   
• src/GPU/README   
• lib/gpu/README   
• Accelerator packages   
• GPU package   
• Section 2.6 -sf gpu   
• Section 2.6 -pk gpu   
• package gpu   
• Commands pages (pair, kspace) for styles followed by (g)   
• Benchmarks page of website  

# 6.2.35 GRANULAR package  

# Contents:  

Pair styles and fixes for finite-size granular particles, which interact with each other and boundaries via frictional and dissipative potentials.  

# Supporting info:  

• src/GRANULAR: filenames $\mathrm{->}$ commands   
• Howto granular   
• fix pour   
• fix wall/gran   
• pair_style gran/hooke   
• pair_style gran/hertz/history   
• examples/granregion   
• examples/pour   
• bench/in.chute   
• https://www.lammps.org/pictures.html#jamming   
• https://www.lammps.org/movies.html#hopper   
• https://www.lammps.org/movies.html#dem   
• https://www.lammps.org/movies.html#brazil   
• https://www.lammps.org/movies.html#granregion  