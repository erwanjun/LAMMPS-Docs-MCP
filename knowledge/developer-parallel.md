---
title: "Parallel algorithms"
category: "developer"
tags: ["developer", "programming", "parallel"]
---
# Parallel algorithms

LAMMPS is designed to enable running simulations in parallel using the
MPI parallel communication standard with distributed data via domain
decomposition.  The parallelization aims to be efficient, and resulting
in good strong scaling (= good speedup for the same system) and good
weak scaling (= the computational cost of enlarging the system is
proportional to the system size).  Additional parallelization using GPUs
or OpenMP can also be applied within the subdomain assigned to an MPI
process.  For clarity, most of the following illustrations show the 2d
simulation case. The underlying algorithms in those cases, however,
apply to both 2d and 3d cases equally well.


> **Note**
> The text and most of the figures in this chapter were adapted
> for the manual from the section on parallel algorithms in the
> [new LAMMPS paper](#lammps_paper).
