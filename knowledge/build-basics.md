---
title: "Basic build options"
category: "build"
tags: ["build", "installation", "cmake", "basics"]
---
# Basic build options

The following topics are covered on this page, for building with both
CMake and make:

* [Serial vs parallel build](#serial)
* [Choice of compiler and compile/link options](#compile)
* [Build the LAMMPS executable and library](#exe)
* [Including and removing debug support](#debug)
* [Install LAMMPS after a build](#install)

----------


## Serial vs parallel build

LAMMPS is written to use the ubiquitous [MPI (Message Passing Interface)](https://en.wikipedia.org/wiki/Message_Passing_Interface) library API
for distributed memory parallel computation.  You need to have such a
library installed for building and running LAMMPS in parallel using a
domain decomposition parallelization.  It is compatible with the MPI
standard version 2.x and later.  LAMMPS can also be built into a
"serial" executable for use with a single processor using the bundled
MPI STUBS library.

Independent of the distributed memory MPI parallelization, parts of
LAMMPS are also written with support for shared memory parallelization
using the [OpenMP](https://en.wikipedia.org/wiki/OpenMP) threading
standard. A more detailed discussion of that is below.

### MPI and OpenMP support in LAMMPS

If you are installing MPI yourself to build a parallel LAMMPS
executable, we recommend either MPICH or OpenMPI, which are regularly
used and tested with LAMMPS by the LAMMPS developers.  MPICH can be
downloaded from the [MPICH home page](https://www.mpich.org), and
OpenMPI can be downloaded correspondingly from the [OpenMPI home page](https://www.open-mpi.org).  Other MPI packages should also work.  No
specific vendor provided and standard compliant MPI library is currently
known to be incompatible with LAMMPS.  If you are running on a large
parallel machine, your system admins or the vendor should have already
installed a version of MPI, which is likely to be faster than a
self-installed MPICH or OpenMPI, so you should study the provided
documentation to find out how to build and link with it.

The majority of OpenMP (threading) support in LAMMPS is provided by the
`OPENMP` package; see the [Speed_omp](Speed_omp)
page for details. The `INTEL` package also includes OpenMP
threading (it is compatible with `OPENMP` and will usually fall
back on styles from that package, if a `INTEL` does not exist)
and adds vectorization support when compiled with compatible compilers,
in particular the Intel compilers on top of OpenMP. Also, the `KOKKOS`
package can be compiled to include OpenMP threading.

In addition, there are a few commands in LAMMPS that have native OpenMP
support included as well.  These are commands in the `ML-SNAP`,
`DIFFRACTION`, and `DPD-REACT` packages.  Furthermore, some packages
support OpenMP threading indirectly through the libraries they interface
to: e.g. `KSPACE`, and `COLVARS`.  See the [Packages details](Packages_details) page for more info on these packages, and the pages
for their respective commands for OpenMP threading info.

For CMake, if you use `BUILD_OMP=yes`, you can use these packages
and turn on their native OpenMP support and turn on their native OpenMP
support at run time, by setting the `OMP_NUM_THREADS` environment
variable before you launch LAMMPS.

For building via conventional make, the `CCFLAGS` and `LINKFLAGS`
variables in Makefile.machine need to include the compiler flag that
enables OpenMP. For the GNU compilers or Clang, it is `-fopenmp`.
For (recent) Intel compilers, it is `-qopenmp`.  If you are using a
different compiler, please refer to its documentation.


### OpenMP Compiler compatibility

Some compilers do not fully support the `default(none)` directive and
others (e.g. GCC version 9 and beyond, Clang version 10 and later) may
implement strict OpenMP 4.0 and later semantics, which are incompatible
with the OpenMP 3.1 semantics used in LAMMPS for maximal compatibility
with compiler versions in use.  If compilation with OpenMP enabled fails
because of your compiler requiring strict OpenMP 4.0 semantics, you can
change the behavior by adding `-D LAMMPS_OMP_COMPAT=4` to the
`LMP_INC` variable in your makefile, or add it to the command-line flags
while configuring with CMake.  LAMMPS will auto-detect a suitable setting
for most GNU, Clang, and Intel compilers.

----------


## Choice of compiler and compile/link options

The choice of compiler and compiler flags can be important for maximum
performance.  Vendor provided compilers for a specific hardware can
produce faster code than open-source compilers like the GNU compilers.
On the most common x86 hardware, the most popular C++ compilers are
quite similar in their ability to optimize regular C/C++ source code at
high optimization levels.  When using the `INTEL` package, there is a
distinct advantage in using the [Intel C++ compiler](intel_) due to
much improved vectorization through SSE and AVX instructions on
compatible hardware.  The source code in that package conditionally
includes compiler specific directives to enable these high degrees of
vectorization.  This may change over time as equivalent vectorization
directives are included into the OpenMP standard and other compilers
adopt them.


On parallel clusters or supercomputers which use "environment modules"
for their compile/link environments, you can often access different
compilers by simply loading the appropriate module before building
LAMMPS.

----------


## Build the LAMMPS executable and library

LAMMPS is always built as a library of C++ classes plus an executable.
The executable is a simple `main()` function that sets up MPI and then
creates a LAMMPS class instance from the LAMMPS library, which
will then process commands provided via a file or from the console
input.  The LAMMPS library can also be called from another application
or a scripting language.  See the [Howto couple](Howto_couple) doc
page for more info on coupling LAMMPS to other codes.  See the
[Python](Python_head) page for more info on wrapping and
running LAMMPS from Python via its library interface.

### Additional information

Note that for creating a shared library, all the libraries it depends on
must be compiled to be compatible with shared libraries.  This should be
the case for libraries included with LAMMPS, such as the dummy MPI
library in `src/STUBS` or any package libraries in the `lib`
directory, since they are always built in a shared library compatible
way using the `-fPIC` compiler switch.  However, if an auxiliary
library (like MPI or FFTW) does not exist as a compatible format, the
shared library linking step may generate an error.  This means you will
need to install a compatible version of the auxiliary library.  The
build instructions for that library should tell you how to do this.

As an example, here is how to build and install the [MPICH library](mpich_), a popular open-source version of MPI, as a shared library
in the default /usr/local/lib location:


```bash
./configure --enable-shared
make
make install
```
You may need to use `sudo make install` in place of the last line if
you do not have write privileges for `/usr/local/lib` or use the
`--prefix` configuration option to select an installation folder,
where you do have write access.  The end result should be the file
`/usr/local/lib/libmpich.so`.  On many Linux installations, the folder
`${HOME}/.local` is an alternative to using `/usr/local` and does
not require superuser or sudo access.  In that case the configuration
step becomes:

```bash
./configure --enable-shared --prefix=${HOME}/.local
```
Avoiding the use of "sudo" for custom software installation (i.e. from
source and not through a package manager tool provided by the OS) is
generally recommended to ensure the integrity of the system software
installation.

----------


## Including or removing debug support

By default the compilation settings will include the `-g` flag which
instructs the compiler to include debug information (e.g. which line of
source code a particular instruction correspond to).  This can be
extremely useful in case LAMMPS crashes and can help to provide crucial
information in [tracking down the origin of a crash](Errors_debug)
and help the LAMMPS developers fix bugs in the source code.  However,
this increases the storage requirements for object files, libraries, and
the executable 3-5 fold.

If this is a concern, you can change the compilation settings or remove
the debug information from the LAMMPS executable:

- **Traditional make**: edit your `Makefile.<machine>` to remove the
  `-g` flag from the `CCFLAGS` and `LINKFLAGS` definitions
- **CMake**: use `-D CMAKE_BUILD_TYPE=Release` or explicitly reset
  the applicable compiler flags (best done using the text mode or
  graphical user interface).
- **Remove debug info**: If you are only concerned about the executable
  being too large, you can use the `strip` tool (e.g. `strip
  lmp_serial`) to remove the debug information from the executable file.
  Do not strip libraries or object files, as that will render them unusable.

----------


## Build LAMMPS tools

Some tools described in [Auxiliary tools](Tools) can be built directly
using CMake or Make.

----------


## Install LAMMPS after a build

After building LAMMPS, you may wish to copy the LAMMPS executable or
library, along with other LAMMPS files (library header, doc files), to a
globally visible place on your system, for others to access.  Note that
you may need super-user privileges (e.g. sudo) if the directory you want
to copy files to is protected.
