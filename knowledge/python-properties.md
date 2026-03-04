---
title: "System properties"
category: "python"
tags: ["python", "API", "properties"]
---
# System properties

Similar to what is described in [Library_properties](Library_properties), the instances of
**py`lammps <lammps.lammps>` can be used to extract different kinds
of information about the active LAMMPS instance and also to modify some of it.

In some cases the data returned is a direct reference to the original data
inside LAMMPS cast to `ctypes` pointers. Where possible, the wrappers will
determine the `ctypes` data type and cast pointers accordingly. If
`numpy` is installed arrays can also be extracted as numpy arrays, which
will access the C arrays directly and have the correct dimensions to protect
against invalid accesses.


> **Warning**
> When accessing per-atom data,
> please note that this data is the per-processor local data and indexed
> accordingly. These arrays can change sizes and order at every neighbor list
> rebuild and atom sort event as atoms are migrating between subdomains.

```python
from lammps import lammps

lmp = lammps()
lmp.file("in.sysinit")

natoms = lmp.get_natoms()
print(f"running simulation with {natoms} atoms")

lmp.command("run 1000 post no");

for i in range(10):** 
   lmp.command("run 100 pre no post no")
   pe = lmp.get_thermo("pe")
   ke = lmp.get_thermo("ke")
   print(f"PE = {pe}\nKE = {ke}")

lmp.close()
```
**Methods**:

* :py`version() <lammps.lammps.version()>`: return the numerical version id, e.g. LAMMPS 2 Sep 2015 -> 20150902
* :py`get_thermo() <lammps.lammps.get_thermo()>`: return current value of a thermo keyword
* :py`last_thermo() <lammps.lammps.last_thermo()>`: return a dictionary of the last thermodynamic output
* :py`get_natoms() <lammps.lammps.get_natoms()>`: total # of atoms as int
* :py`reset_box() <lammps.lammps.reset_box()>`: reset the simulation box size
* :py`extract_setting() <lammps.lammps.extract_setting()>`: return a global setting
* :py`extract_global() <lammps.lammps.extract_global()>`: extract a global quantity
* :py`extract_box() <lammps.lammps.extract_box()>`: extract box info
* :py`create_atoms() <lammps.lammps.create_atoms()>`: create N atoms with IDs, types, x, v, and image flags

**Properties**:

* :py`last_thermo_step <lammps.lammps.last_thermo_step>`: the last timestep thermodynamic output was computed
