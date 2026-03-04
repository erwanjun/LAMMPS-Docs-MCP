---
title: "Creating or deleting a LAMMPS object"
category: "python"
tags: ["python", "API", "create"]
---
# Creating or deleting a LAMMPS object

With the Python interface the creation of a :cpp`LAMMPS
<LAMMPS_NS::LAMMPS>` instance is included in the constructor for the
:py`lammps <lammps.lammps>` class. Internally it will call either
:cpp`lammps_open` or :cpp`lammps_open_no_mpi` from the C library
API to create the class instance.

All arguments are optional.  The *name* argument allows loading a
LAMMPS shared library that is named `liblammps_machine.so` instead of
the default name of `liblammps.so`.  In most cases the latter will be
installed or used.  The *ptr* argument is for use of the
:py`lammps` module from inside a LAMMPS instance, e.g. with the
[python](python) command, where a pointer to the already existing
:cpp`LAMMPS <LAMMPS_NS::LAMMPS>` class instance can be passed
to the Python class and used instead of creating a new instance.  The
*comm* argument may be used in combination with the [mpi4py](mpi4py_url_)
module to pass an MPI communicator to LAMMPS and thus it is possible
to run the Python module like the library interface on a subset of the
MPI ranks after splitting the communicator.


Here is a simple example using the LAMMPS Python interface:

```python
from lammps import lammps

# NOTE: argv[0] is set by the lammps class constructor
args = ["-log", "none"]

# create LAMMPS instance
lmp = lammps(cmdargs=args)

# get and print numerical version code
print("LAMMPS Version: ", lmp.version())

# explicitly close and delete LAMMPS instance (optional)
lmp.close()
```
Same as with the [C library API](#lammps_c_api), this will use the
`MPI_COMM_WORLD` communicator for the MPI library that LAMMPS was
compiled with.

The :py`lmp.close() <lammps.lammps.close()>` call is
optional since the LAMMPS class instance will also be deleted
automatically during the :py`lammps <lammps.lammps>` class
destructor.  Instead of :py`lmp.close() <lammps.lammps.close()>`
it is also possible to call :py`lmp.finalize() <lammps.lammps.finalize()>`;
this will destruct the LAMMPS instance, but also finalized and release
the MPI and/or Kokkos environment if enabled and active.

Note that you can create multiple LAMMPS objects in your Python
script, and coordinate and run multiple simulations, e.g.

```python
from lammps import lammps
lmp1 = lammps()
lmp2 = lammps()
lmp1.file("in.file1")
lmp2.file("in.file2")
```
