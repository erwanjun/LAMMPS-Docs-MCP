---
title: "Scatter/gather operations"
category: "library"
tags: ["library", "C-API", "scatter"]
---
# Scatter/gather operations

This section has functions which gather per-atom data from one or more
processors into a contiguous global list ordered by atom ID.  The same
list is returned to all calling processors.  It also contains
functions which scatter per-atom data from a contiguous global list
across the processors that own those atom IDs.  It also has a
create_atoms() function which can create new atoms by scattering them
appropriately to owning processors in the LAMMPS spatial
decomposition.

It documents the following functions:

- :cpp`lammps_gather_atoms`
- :cpp`lammps_gather_atoms_concat`
- :cpp`lammps_gather_atoms_subset`
- :cpp`lammps_scatter_atoms`
- :cpp`lammps_scatter_atoms_subset`
- :cpp`lammps_gather_bonds`
- :cpp`lammps_gather_angles`
- :cpp`lammps_gather_dihedrals`
- :cpp`lammps_gather_impropers`
- :cpp`lammps_gather`
- :cpp`lammps_gather_concat`
- :cpp`lammps_gather_subset`
- :cpp`lammps_scatter`
- :cpp`lammps_scatter_subset`
- :cpp`lammps_create_atoms`
- :cpp`lammps_create_molecule`

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------
