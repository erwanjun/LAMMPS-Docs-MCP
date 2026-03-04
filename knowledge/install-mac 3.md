---
title: "Download an executable for macOS"
category: "install"
tags: ["install", "mac"]
---
# Download an executable for macOS

LAMMPS can be downloaded, built, and configured for macOS with [Homebrew](homebrew_).  (Alternatively, see the installation instructions for
[downloading an executable via Conda](Install_conda).)  The
following LAMMPS packages are unavailable at this time because of
additional requirements not yet met: GPU, KOKKOS.

After installing Homebrew, you can install LAMMPS on your system with
the following commands:

```bash
brew install lammps
```
This will install the executables "lammps_serial" and "lammps_mpi", as
well as the LAMMPS "doc", "potentials", "tools", "bench", and "examples"
directories.

Once LAMMPS is installed, you can test the installation with the
Lennard-Jones benchmark file:

```bash
brew test lammps -v
```
The LAMMPS binary is built with the [KIM package](#kim), which
results in Homebrew also installing the `kim-api` binaries when LAMMPS
is installed.  In order to use potentials from [openkim.org](openkim_), you can install the `openkim-models` package

```bash
brew install openkim-models
```
If you have problems with the installation, you can post issues to
[this link](https://github.com/Homebrew/homebrew-core/issues).


Thanks to Derek Thomas (derekt at cello.t.u-tokyo.ac.jp) for setting
up the Homebrew capability.
