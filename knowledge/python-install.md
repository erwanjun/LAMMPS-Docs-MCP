---
title: "Python: install"
category: "python"
tags: ["python", "API", "install"]
---
# Installation

The LAMMPS Python module enables calling the [LAMMPS C library API](#lammps_c_api) from Python by dynamically loading functions in the
LAMMPS shared library through the Python [ctypes](ctypes_)
module.  Because of the dynamic loading, it is required that LAMMPS is
compiled in ["shared" mode](#exe).

*Changed in version 2Apr2025*
LAMMPS currently only supports Python version 3.6 or later.

Two components are necessary for Python to be able to invoke LAMMPS code:

* The LAMMPS Python Package (`lammps`) from the `python` folder
* The LAMMPS Shared Library (`liblammps.so`, `liblammps.dylib` or
  `liblammps.dll`) from the folder where you compiled LAMMPS.


## Installing the LAMMPS Python Module and Shared Library

Making LAMMPS usable within Python and vice versa requires putting the
LAMMPS Python package (`lammps`) into a location where the Python
interpreter can find it and installing the LAMMPS shared library into a
folder that the dynamic loader searches or inside of the installed
`lammps` package folder.  There are multiple ways to achieve this.

#. Install both components into a Python `site-packages` folder, either
   system-wide or in the corresponding user-specific folder. This way no
   additional environment variables need to be set, but the shared
   library is otherwise not accessible.

#. Do an installation into a virtual environment.

#. Leave the files where they are in the source/development tree and
   adjust some environment variables.

In case you run into an "externally-managed-environment" error when
trying to install the LAMMPS Python module, please refer to
[corresponding paragraph](#externally_managed) in the Python HOWTO
page to learn about options for handling this error.

To verify if LAMMPS can be successfully started from Python, start the
Python interpreter, load the `lammps` Python module and create a
LAMMPS instance.  This should not generate an error message and produce
output similar to the following:

```bash
$ python
Python 3.8.5 (default, Sep  5 2020, 10:50:12)
[GCC 10.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import lammps
>>> lmp = lammps.lammps()
LAMMPS (18 Sep 2020)
using 1 OpenMP thread(s) per MPI task
>>>
```

> **Note**
> Unless you opted for "In place use", you will have to rerun the installation
> any time you recompile LAMMPS to ensure the latest Python package and shared
> library are installed and used.


> **Note**
> If you want Python to be able to load different versions of the
> LAMMPS shared library with different settings, you will need to
> manually copy the files under different names
> (e.g. `liblammps_mpi.so` or `liblammps_gpu.so`) into the
> appropriate folder as indicated above. You can then select the
> desired library through the *name* argument of the LAMMPS object
> constructor (see [python_create_lammps](#python_create_lammps)).


## Extending Python to run in parallel

If you wish to run LAMMPS in parallel from Python, you need to extend
your Python with an interface to MPI.  This also allows you to
make MPI calls directly from Python in your script, if you desire.

We have tested this with [MPI for Python](https://mpi4py.readthedocs.io/)
(aka mpi4py) and you will find installation instruction for it below.

Installation of mpi4py (version 4.0.1 as of Feb 2025) can be done as
follows:

- Via `pip` into a local user folder with:

```bash
python3 -m pip install --user mpi4py
```
- Via `dnf` into a system folder for RedHat/Fedora systems:

```bash
# for use with OpenMPI
sudo dnf install python3-mpi4py-openmpi
# for use with MPICH
sudo dnf install python3-mpi4py-mpich
```
- Via `pip` into a virtual environment (see above):

```bash
$ source $HOME/myenv/activate
(myenv)$ python -m pip install mpi4py
```
- Via `pip` into a system folder (not recommended):

```bash
sudo python3 -m pip install mpi4py
```
For more detailed installation instructions and additional options,
please see the [mpi4py installation](https://mpi4py.readthedocs.io/en/stable/install.html) page.


To use `mpi4py` and LAMMPS in parallel from Python, you **must** make
certain that **both** are using the **same** implementation and version
of MPI library.  If you only have one MPI library installed on your
system this is not an issue, but it can be if you have multiple MPI
installations (e.g. on an HPC cluster to be selected through environment
modules).  Your LAMMPS build is explicit about which MPI it is using,
since it is either detected during CMake configuration or in the
traditional make build system you specify the details in your low-level
`src/MAKE/Makefile.foo` file. The installation process of `mpi4py`
uses the `mpicc` command to find information about the MPI it uses to
build against.  And it tries to load "libmpi.so" from the
`LD_LIBRARY_PATH`.  This may or may not find the MPI library that
LAMMPS is using.  If you have problems running both mpi4py and LAMMPS
together, this is an issue you may need to address, e.g. by loading the
module for different MPI installation so that mpi4py finds the right
one.

If you have successfully installed mpi4py, you should be able to run
Python and type

```python
from mpi4py import MPI
```
without error.  You should also be able to run Python in parallel
on a simple test script

```bash
mpirun -np 4 python3 test.py
```
where `test.py` contains the lines

```python
from mpi4py import MPI
comm = MPI.COMM_WORLD
print("Proc %d out of %d procs" % (comm.Get_rank(),comm.Get_size()))
```
and see one line of output for each processor you run on.  Please note
that the order of the lines is not deterministic

```bash
$ mpirun -np 4 python3 test.py
Proc 0 out of 4 procs
Proc 1 out of 4 procs
Proc 2 out of 4 procs
Proc 3 out of 4 procs
```
