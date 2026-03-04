---
title: "Optional build settings"
category: "build"
tags: ["build", "installation", "cmake", "settings"]
---
# Optional build settings

LAMMPS can be built with several optional settings.  Each subsection
explains how to do this for building both with CMake and make.

* `C++17 standard compliance`_ when building all of LAMMPS
* `FFT library`_ for use with the [kspace_style pppm](kspace_style) command
* `Size of LAMMPS integer types and size limits`_
* `Read or write compressed files`_
* `Support for downloading files from the input`_
* `Prevent download of large potential files`_
* `Memory allocation alignment`_
* `Workaround for long long integers`_
* `Exception handling when using LAMMPS as a library`_ to capture errors

----------


## C++17 standard compliance

*Changed in version 10Sep2025*
A C++17 standard compatible compiler is currently the minimum
requirement for compiling LAMMPS.  LAMMPS version 22 July 2025 is the
last version compatible with the C++11 standard for the core code and
most packages. Most currently used C++ compilers are compatible with
C++17, but some older ones may need extra flags to enable C++17
compliance.

```make
CCFLAGS = -g -O3 -std=c++17
```
Individual packages may require compliance with a later C++ standard
like C++20.  These requirements will be documented with the
[individual packages](Packages_details).

----------


## FFT library

When the KSPACE package is included in a LAMMPS build, the
[kspace_style pppm](kspace_style) command performs 3d FFTs which
require use of an FFT library to compute 1d FFTs.  The KISS FFT
library is included with LAMMPS, but other libraries can be faster.
LAMMPS can use them if they are available on your system.

*Added in version 7Feb2024*
Alternatively, LAMMPS can use the [heFFTe](https://icl-utk-edu.github.io/heffte/) library for the MPI
communication algorithms, which comes with many optimizations for
special cases, e.g. leveraging available 2D and 3D FFTs in the back end
libraries and better pipelining for packing and communication.

The [KISS FFT library](https://github.com/mborgerding/kissfft) is
included in the LAMMPS distribution.  It is portable across all
platforms.  Depending on the size of the FFTs and the number of
processors used, the other libraries listed here can be faster.

However, note that long-range Coulombics are only a portion of the
per-timestep CPU cost, FFTs are only a portion of long-range Coulombics,
and 1d FFTs are only a portion of the FFT cost (parallel communication
can be costly).  A breakdown of these timings is printed to the screen
at the end of a run when using the [kspace_style pppm](kspace_style) command. The [Screen and logfile output](Run_output) page gives more details.  A more detailed (and time
consuming) report of the FFT performance is generated with the
[kspace_modify fftbench yes](kspace_modify) command.

FFTW is a fast, portable FFT library that should also work on any
platform and can be faster than the KISS FFT library.  You can download
it from [www.fftw.org](https://www.fftw.org).  LAMMPS requires version
3.X; the legacy version 2.1.X is no longer supported.

Building FFTW for your box should be as simple as `./configure; make;
make install`.  The install command typically requires root privileges
(e.g. invoke it via sudo), unless you specify a local directory with
the `--prefix` option of configure.  Type `./configure --help` to see
various options.

The Intel MKL math library is part of the Intel compiler suite.  It
can be used with the Intel or GNU compiler (see the `FFT_LIB` setting
above).

The NVIDIA Performance Libraries (NVPL) FFT library is optimized for NVIDIA
Grace Armv9.0 architecture. You can download it from https://docs.nvidia.com/nvpl/

The cuFFT and hipFFT FFT libraries are packaged with NVIDIA's CUDA and
AMD's HIP installations, respectively. These FFT libraries require the
Kokkos acceleration package to be enabled and the Kokkos back end to be
GPU-resident (i.e., HIP or CUDA). Similarly, GPU offload of FFTs on
Intel GPUs with oneMKL currently requires the Kokkos acceleration
package to be enabled with the SYCL back end.

Performing 3d FFTs in parallel can be time-consuming due to data access
and required communication.  This cost can be reduced by performing
single-precision FFTs instead of double precision.  Single precision
means the real and imaginary parts of a complex datum are 4-byte floats.
Double precision means they are 8-byte doubles.  Note that Fourier
transform and related PPPM operations are somewhat less sensitive to
floating point truncation errors, and thus the resulting error is
generally less than the difference in precision. Using the
`-DFFT_SINGLE` setting trades off a little accuracy for reduced memory
use and parallel communication costs for transposing 3d FFT data.

When using `-DFFT_SINGLE` with FFTW3, you may need to ensure that
the FFTW3 installation includes support for single-precision.

When compiler FFTW3 from source, you can do the following, which should
produce the additional libraries `libfftw3f.a` and/or `libfftw3f.so`.

```bash
make clean
./configure --enable-single; make; make install
```
Performing 3d FFTs requires communication to transpose the 3d FFT
grid.  The data packing/unpacking for this can be done in one of 3
modes (ARRAY, POINTER, MEMCPY) as set by the `FFT_PACK` syntax above.
Depending on the machine, the size of the FFT grid, the number of
processors used, one option may be slightly faster.  The default is
ARRAY mode.

When using `-DFFT_HEFFTE` CMake will first look for an existing
install with hints provided by `-DHeffte_ROOT`, as recommended by the
CMake standard and note that the name is case sensitive. If CMake cannot
find a heFFTe installation with the correct back end (e.g., FFTW or
MKL), it will attempt to download and build the library automatically.
In this case, LAMMPS CMake will also accept all heFFTe specific
variables listed in the [heFFTe documentation](https://icl-utk-edu.github.io/heffte/md_doxygen_installation.html)
and those variables will be passed into the heFFTe build.

----------


## Size of LAMMPS integer types and size limits

LAMMPS uses a few custom integer data types, which can be defined as
either 4-byte (= 32-bit) or 8-byte (= 64-bit) integers at compile time.
This has an impact on the size of a system that can be simulated, or how
large counters can become before "rolling over".  The default setting of
"smallbig" is almost always adequate.

### LAMMPS system size restrictions


| * - | smallbig | bigbig |
| --- | --- | --- |
| Total atom count | $2^{63}$ atoms (= $9.223 \cdot 10^{18}$) | $2^{63}$ atoms (= $9.223 \cdot 10^{18}$) |
| Total timesteps | $2^{63}$ steps (= $9.223 \cdot 10^{18}$) | $2^{63}$ steps (= $9.223 \cdot 10^{18}$) |
| Atom ID values | $1 \le i \le 2^{31} (= 2.147 \cdot 10^9)$ | $1 \le i \le 2^{63} (= 9.223 \cdot 10^{18})$ |
| Image flag values | $-512 \le i \le 511$ | $- 1\,048\,576 \le i \le 1\,048\,575$ |

The "bigbig" setting increases the size of image flags and atom IDs over
the default "smallbig" setting.

These are limits for the core of the LAMMPS code, specific features or
some styles may impose additional limits.  Also, there are limitations
when using the library interface where some functions with known issues
have been replaced by dummy calls printing a corresponding error message
rather than crashing randomly or corrupting data.

Atom IDs are not required for atomic systems which do not store bond
topology information, though IDs are enabled by default.  The
[atom_modify id no](atom_modify) command will turn them off.  Atom
IDs are required for molecular systems with bond topology (bonds,
angles, dihedrals, etc).  Similarly, some force or compute or fix styles
require atom IDs.  Thus, if you model a molecular system or use one of
those styles with more than 2 billion atoms, you need the "bigbig"
setting.

Regardless of the total system size limits, the maximum number of atoms
per MPI rank (local + ghost atoms) is limited to 2 billion for atomic
systems and 500 million for systems with bonds (the additional
restriction is due to using the 2 upper bits of the local atom index
in neighbor lists for storing special bonds info).

Image flags store 3 values per atom in a single integer, which count the
number of times an atom has moved through the periodic box in each
dimension.  See the [dump](dump) manual page for a discussion.  If
an atom moves through the periodic box more than this limit, the value
will "roll over", e.g. from 511 to -512, which can cause diagnostics
like the mean-squared displacement, as calculated by the [compute
msd](compute_msd) command, to be faulty.

Also note that the GPU package requires its lib/gpu library to be
compiled with the same size setting, or the link will fail.  A CMake
build does this automatically.  When building with make, the setting
in whichever `lib/gpu/Makefile` is used must be the same as above.

----------


## Read or write compressed files

*Changed in version 11Feb2026*

If this option is enabled, large files can be read or written with
compression by `gzip` or similar tools by several LAMMPS commands,
including [read_data](read_data), [write_data](write_data),
[rerun](rerun), [dump](dump), and [write_dump](write_dump).  Supported compression tools and algorithms are currently
`gzip`, `bzip2`, `zstd`, `xz`, `lz4`, `lzma` (via xz),
`brotli`, and `7-zip (via 7z)`.  LAMMPS checks at runtime, which
compression commands are available and adjusts the check for supported
suffixes accordingly.  The list of available compression formats and
suffixes is shown when running LAMMPS with the [-help or -h
command_line flag](Run_options).

This option requires that your operating system fully supports the
"popen()" function in the standard runtime library and that a `gzip`
or other executable can be found by LAMMPS in the standard search path
during a run.


> **Note**
> On clusters with high-speed networks, using the "fork()" library call
> (required by "popen()") can interfere with the fast communication
> library and lead to simulations using compressed output or input to
> hang or crash. For selected operations, compressed file I/O is also
> available using a compression library instead, which is what the
> [COMPRESS package](#PKG-COMPRESS) provides.

--------------------------------------------------


## Support for downloading files from the input

*Added in version 29Aug2024*
The [geturl command](geturl) command uses the [the libcurl library](https://curl.se/libcurl/) to download files.  This requires that
LAMMPS is compiled accordingly which needs the following settings:

----------


## Prevent download of large potential files

*Added in version 8Feb2023*
LAMMPS bundles a selection of potential files in the `potentials`
folder as examples of how those kinds of potential files look like and
for use with the provided input examples in the `examples` tree.  To
keep the size of the distributed LAMMPS source package small, very large
potential files (> 5 MBytes) are not bundled, but only downloaded on
demand when the [corresponding package](Packages) is
installed.  This automatic download can be prevented when [building
LAMMPS with CMake](Build_cmake) by adding the setting `-D
DOWNLOAD_POTENTIALS=off` when configuring.

----------


## Memory allocation alignment

This setting enables the use of the `posix_memalign()` call instead of
`malloc()` when LAMMPS allocates large chunks of memory.  Vector
instructions on CPUs may become more efficient, if dynamically allocated
memory is aligned on larger-than-default byte boundaries.  On most
current operating systems, the `malloc()` implementation returns
pointers that are aligned to 16-byte boundaries. Using SSE vector
instructions efficiently, however, requires memory blocks being aligned
on 64-byte boundaries.

----------


## Workaround for long long integers

If your system or MPI version does not recognize "long long" data
types, the following setting will be needed.  It converts "long long"
to a "long" data type, which should be the desired 8-byte integer on
those systems:

----------


## Exception handling when using LAMMPS as a library

LAMMPS errors do not kill the calling code, but throw an exception.  In
the C-library interface, the call stack is unwound and control returns
to the caller, e.g. to Python or a code that is coupled to LAMMPS. The
error status can then be queried.  When using C++ directly, the calling
code has to be set up to *catch* exceptions thrown from within LAMMPS.


> **Note**
> When LAMMPS is running in parallel, it is not always possible to
> cleanly recover from an exception since not all parallel ranks may
> throw an exception and thus other MPI ranks may get stuck waiting for
> messages from the ones with errors.
