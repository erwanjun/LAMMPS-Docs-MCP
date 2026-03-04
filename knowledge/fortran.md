---
title: "Fortran Interface"
category: "library"
tags: ["fortran", "API"]
---
# The :f`LIBLAMMPS` Fortran Module

The :f`LIBLAMMPS` module provides an interface to call LAMMPS from
Fortran.  It is based on the LAMMPS C library interface and requires a
fully Fortran 2003-compatible compiler to be compiled.  It is designed
to be self-contained and not require any support functions written in C,
C++, or Fortran other than those in the C library interface and the
LAMMPS Fortran module itself.

While C libraries have a defined binary interface (ABI) and can thus be
used from multiple compiler versions from different vendors as long as
they are compatible with the hosting operating system, the same is not
true for Fortran programs.  Thus, the LAMMPS Fortran module needs to be
compiled alongside the code using it from the source code in
`fortran/lammps.f90` *and* with the same compiler used to build the
rest of the Fortran code that interfaces to LAMMPS.  When linking, you
also need to [link to the LAMMPS library](Build_link).  A typical
command for a simple program using the Fortran interface would be:

```bash
mpifort -o testlib.x lammps.f90 testlib.f90 -L. -llammps
```
Please note that the MPI compiler wrapper is only required when the
calling the library *from* an MPI-parallelized program.  Otherwise,
using the plain Fortran compiler (gfortran, ifort, flang, etc.) will
suffice, since there are no direct references to MPI library features,
definitions and subroutine calls; MPI communicators are referred to by
their integer index representation as required by the Fortran MPI
interface.  It may be necessary to link to additional libraries,
depending on how LAMMPS was configured and whether the LAMMPS library
[was compiled as a static or dynamic library](Build_link).

If the LAMMPS library itself has been compiled with MPI support, the
resulting executable will be able to run LAMMPS in parallel with
`mpirun`, `mpiexec`, or equivalent.  This may be either on the
"world" communicator or a sub-communicator created by the calling
Fortran code.  If, on the other hand, the LAMMPS library has been
compiled **without** MPI support, each LAMMPS instance will run
independently using just one processor.

Please also note that the order of the source files matters: the
`lammps.f90` file needs to be compiled first, since it provides the
**f`LIBLAMMPS` module that would need to be imported by the calling
Fortran code in order to uses the Fortran interface.
A working example can be found together with equivalent examples in C and
C++ in the `examples/COUPLE/simple` folder of the LAMMPS distribution.


> **Admonition:**  Fortran compiler compatibility**
> A fully Fortran 2003 compatible Fortran compiler is required.
> This means that currently only GNU Fortran 9 and later are
> compatible and thus the default compilers of Red Hat or CentOS 7
> and Ubuntu 18.04 LTS and not compatible.  Either newer compilers
> need to be installed or the Linux updated.

----------

# Creating or deleting a LAMMPS object

With the Fortran interface, the creation of a :cpp`LAMMPS
<LAMMPS_NS::LAMMPS>` instance is included in the constructor for
creating the :f`lammps` derived type.  To import the definition of
that type and its type-bound procedures, you need to add a `USE LIBLAMMPS`
statement.  Internally, it will call either
:cpp`lammps_open_fortran` or :cpp`lammps_open_no_mpi` from
the C library API to create the class instance.  All arguments are
optional and :cpp`lammps_mpi_init` will be called automatically
if it is needed.  Similarly, optional calls to
:cpp`lammps_mpi_finalize`, :cpp`lammps_kokkos_finalize`,
:cpp`lammps_python_finalize`, and :cpp`lammps_plugin_finalize`
are integrated into the :f`close` function and triggered with the
optional logical argument set to `.TRUE.`. Here is a simple example:

```fortran
PROGRAM testlib
  USE LIBLAMMPS                 ! include the LAMMPS library interface
  IMPLICIT NONE
  TYPE(lammps) :: lmp           ! derived type to hold LAMMPS instance
  CHARACTER(LEN=12), PARAMETER :: args(3) = &
      [ CHARACTER(LEN=12) :: 'liblammps', '-log', 'none' ]

  ! create a LAMMPS instance (and initialize MPI)
  lmp = lammps(args)
  ! get and print numerical version code
  PRINT*, 'LAMMPS Version: ', lmp%version()
  ! delete LAMMPS instance (and shutdown MPI)
  CALL lmp%close(.TRUE.)
END PROGRAM testlib
```
It is also possible to pass command-line flags from Fortran to C/C++ and
thus make the resulting executable behave similarly to the standalone
executable (it will ignore the `-in/-i` flag, though).  This allows
using the command-line to configure accelerator and suffix settings,
configure screen and logfile output, or to set index style variables
from the command-line and more.  Here is a correspondingly adapted
version of the previous example:

```fortran
PROGRAM testlib2
  USE LIBLAMMPS                 ! include the LAMMPS library interface
  IMPLICIT NONE
  TYPE(lammps) :: lmp           ! derived type to hold LAMMPS instance
  CHARACTER(LEN=128), ALLOCATABLE :: command_args(:)
  INTEGER :: i, argc

  ! copy command-line flags to `command_args()`
  argc = COMMAND_ARGUMENT_COUNT()
  ALLOCATE(command_args(0:argc))
  DO i=0, argc
    CALL GET_COMMAND_ARGUMENT(i, command_args(i))
  END DO

  ! create a LAMMPS instance (and initialize MPI)
  lmp = lammps(command_args)
  ! get and print numerical version code
  PRINT*, 'Program name:   ', command_args(0)
  PRINT*, 'LAMMPS Version: ', lmp%version()
  ! delete LAMMPS instance (and shuts down MPI)
  CALL lmp%close(.TRUE.)
  DEALLOCATE(command_args)
END PROGRAM testlib2
## ```

# Executing LAMMPS commands

Once a LAMMPS instance is created, it is possible to "drive" the LAMMPS
simulation by telling LAMMPS to read commands from a file or to pass
individual or multiple commands from strings or lists of strings.  This
is done similarly to how it is implemented in the [C library
interface](Library_execute). Before handing off the calls to the
C library interface, the corresponding Fortran versions of the calls
(:f`file`, :f`command`, :f`commands_list`, and
:f`commands_string`) have to make copies of the strings passed as
arguments so that they can be modified to be compatible with the
requirements of strings in C without affecting the original strings.
Those copies are automatically deleted after the functions return.
Below is a small demonstration of the uses of the different functions.

```fortran
PROGRAM testcmd
  USE LIBLAMMPS
  TYPE(lammps) :: lmp
  CHARACTER(LEN=512) :: cmds
  CHARACTER(LEN=40), ALLOCATABLE :: cmdlist(:)
  CHARACTER(LEN=10) :: trimmed
  INTEGER :: i

  lmp = lammps()
  CALL lmp%file('in.melt')
  CALL lmp%command('variable zpos index 1.0')
  ! define 10 groups of 10 atoms each
  ALLOCATE(cmdlist(10))
  DO i=1, 10
    WRITE(trimmed,'(I10)') 10*i
    WRITE(cmdlist(i),'(A,I1,A,I10,A,A)')       &
        'group g', i-1, ' id ', 10*(i-1)+1, ':', ADJUSTL(trimmed)
  END DO
  CALL lmp%commands_list(cmdlist)
  ! run multiple commands from multi-line string
  cmds = 'clear' // NEW_LINE('A') //                       &
      'region  box block 0 2 0 2 0 2' // NEW_LINE('A') //  &
      'create_box 1 box' // NEW_LINE('A') //               &
      'create_atoms 1 single 1.0 1.0 ${zpos}'
  CALL lmp%commands_string(cmds)
  CALL lmp%close(.TRUE.)
END PROGRAM testcmd
## ```

# Accessing system properties

The C library interface allows the [extraction of different kinds
of information](Library_properties) about the active simulation
instance and also---in some cases---to apply modifications to it, and the
Fortran interface provides access to the same data using Fortran-style,
C-interoperable data types.  In some cases, the Fortran library interface makes
pointers to internal LAMMPS data structures accessible; when accessing them
through the library interfaces, special care is needed to avoid data corruption
and crashes.  Please see the documentation of the individual type-bound
procedures for details.

Below is an example demonstrating some of the possible uses.

```fortran
PROGRAM testprop
  USE LIBLAMMPS
  USE, INTRINSIC :: ISO_C_BINDING, ONLY : c_double, c_int64_t, c_int
  USE, INTRINSIC :: ISO_FORTRAN_ENV, ONLY : OUTPUT_UNIT
  TYPE(lammps) :: lmp
  INTEGER(KIND=c_int64_t), POINTER :: natoms, ntimestep, bval
  REAL(KIND=c_double), POINTER :: dt, dval
  INTEGER(KIND=c_int), POINTER :: nfield, typ, ival
  INTEGER(KIND=c_int) :: i
  CHARACTER(LEN=11) :: key
  REAL(KIND=c_double) :: pe, ke

  lmp = lammps()
  CALL lmp%file('in.sysinit')
  natoms = lmp%extract_global('natoms')
  WRITE(OUTPUT_UNIT,'(A,I0,A)') 'Running a simulation with ', natoms, ' atoms'
  WRITE(OUTPUT_UNIT,'(I0,A,I0,A,I0,A)') lmp%extract_setting('nlocal'), &
      ' local and ', lmp%extract_setting('nghost'), ' ghost atoms. ', &
      lmp%extract_setting('ntypes'), ' atom types'

  CALL lmp%command('run 2 post no')

  ntimestep = lmp%last_thermo('step', 0)
  nfield = lmp%last_thermo('num', 0)
  WRITE(OUTPUT_UNIT,'(A,I0,A,I0)') 'Last thermo output on step: ', ntimestep, &
      ',  number of fields: ', nfield
  DO i=1, nfield
      key = lmp%last_thermo('keyword',i)
      typ = lmp%last_thermo('type',i)
      IF (typ == lmp%dtype%i32) THEN
          ival = lmp%last_thermo('data',i)
          WRITE(OUTPUT_UNIT,*) key, ':', ival
      ELSE IF (typ == lmp%dtype%i64) THEN
          bval = lmp%last_thermo('data',i)
          WRITE(OUTPUT_UNIT,*) key, ':', bval
      ELSE IF (typ == lmp%dtype%r64) THEN
          dval = lmp%last_thermo('data',i)
          WRITE(OUTPUT_UNIT,*) key, ':', dval
      END IF
  END DO

  dt = lmp%extract_global('dt')
  ntimestep = lmp%extract_global('ntimestep')
  WRITE(OUTPUT_UNIT,'(A,I0,A,F4.1,A)') 'At step: ', ntimestep, &
      '  Changing timestep from', dt, ' to 0.5'
  dt = 0.5_c_double
  CALL lmp%command('run 2 post no')

  WRITE(OUTPUT_UNIT,'(A,I0)') 'At step: ', ntimestep
  pe = lmp%get_thermo('pe')
  ke = lmp%get_thermo('ke')
  WRITE(OUTPUT_UNIT,*) 'PE = ', pe
  WRITE(OUTPUT_UNIT,*) 'KE = ', ke

  CALL lmp%close(.TRUE.)
END PROGRAM testprop
## ```

# The :f`LIBLAMMPS` module API

Below are the detailed descriptions of definitions and interfaces
of the contents of the :f`LIBLAMMPS` Fortran interface to LAMMPS.

--------

### Procedures Bound to the :f`lammps` Derived Type

--------

--------

--------

--------

--------

--------

--------

--------

--------


> **Note**
> Note that a frequent use case of this function is to extract only one or
> more of the options rather than all seven. For example, assuming "lmp"
> represents a properly-initialized LAMMPS instance, the following code will
> extract the periodic box settings into the variable "periodic":
> 
> .. code-block:: fortran
> 
>    ! code to start up
>    LOGICAL :: periodic(3)
>    ! code to initialize LAMMPS / run things / etc.
>    CALL lmp%extract_box(pflags = periodic)

--------

--------

--------

--------

--------

--------

--------

--------

--------


> **Note**
> LAMMPS cannot easily check if it is valid to access the data
> referenced by the variables (e.g., computes, fixes, or thermodynamic
> info), so it may fail with an error.  The caller has to make certain
> that the data are extracted only when it is safe to evaluate the variable
> and thus an error and crash are avoided.

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------

--------
