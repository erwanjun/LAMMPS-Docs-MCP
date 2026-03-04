---
title: "Python: module"
category: "python"
tags: ["python", "API", "module"]
---
# The `lammps` Python module

The LAMMPS Python interface is implemented as a module called :py`lammps`
which is defined in the `lammps` package in the `python` folder of the
LAMMPS source code distribution.  After compilation of LAMMPS, the module can
be installed into a Python system folder or a user folder with `make
install-python`.  Components of the module can then loaded into a Python
session with the `import` command.


> **Warning**
> Alternative interfaces such as :py`PyLammps <lammps.PyLammps>` and
> :py`IPyLammps <lammps.IPyLammps>` classes have been deprecated and
> will be removed in a future version of LAMMPS.


> **Admonition: Version check**
> The :py`lammps` module stores the version number of the LAMMPS
> version it is installed from.  When initializing the
> :py`lammps <lammps.lammps>` class, this version is checked to
> be the same as the result from :py`lammps.version`, the version
> of the LAMMPS shared library that the module interfaces to.  If the
> they are not the same an AttributeError exception is raised since a
> mismatch of versions (e.g.  due to incorrect use of the
> `LD_LIBRARY_PATH` or `PYTHONPATH` environment variables can lead
> to crashes or data corruption and otherwise incorrect behavior.

----------

## The `lammps` class API

The :py`lammps <lammps.lammps>` class is the core of the LAMMPS
Python interface.  It is a wrapper around the [LAMMPS C library
API](#lammps_c_api) using the [Python ctypes module](https://docs.python.org/3/library/ctypes.html) and a shared library
compiled from the LAMMPS sources code.  The individual methods in this
class try to closely follow the corresponding C functions.  The handle
argument that needs to be passed to the C functions is stored internally
in the class and automatically added when calling the C library
functions. Below is a detailed documentation of the API.

----------

## Additional components of the `lammps` module

The :py`lammps` module additionally contains several constants
and the :py`NeighList <lammps.NeighList>` class:


### Data Types


### Style Constants


### Type Constants


### Variable Type Constants

### Classes representing internal objects
