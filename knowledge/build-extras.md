---
title: "Packages with extra build options"
category: "build"
tags: ["build", "installation", "cmake", "extras"]
---
# Packages with extra build options

When building with some packages, additional steps may be required,
in addition to


| CMake build | Traditional make |
| --- | --- |
| .. code-block:: bash cmake -D PKG_NAME=yes | .. code-block:: bash make yes-name |

as described on the [Build_package](Build_package) page.

For a CMake build there may be additional optional or required
variables to set.

*Changed in version 10Sep2025*
The traditional build system with GNU make no longer supports packages
that require extra steps in the `lammps/lib` directory.

This is the list of packages that may require additional steps.

* [ADIOS](#adios)
* [APIP](#apip)
* [COLVARS](#colvar)
* [COMPRESS](#compress)
* [ELECTRODE](#electrode)
* [GRAPHICS](#graphics)
* [GPU](#gpu)
* [H5MD](#h5md)
* [INTEL](#intel)
* [KIM](#kim)
* [KOKKOS](#kokkos)
* [LEPTON](#lepton)
* [MACHDYN](#machdyn)
* [MBX](#mbx)
* [MDI](#mdi)
* [MISC](#misc)
* [ML-HDNNP](#ml-hdnnp)
* [ML-IAP](#mliap)
* [ML-PACE](#ml-pace)
* [ML-POD](#ml-pod)
* [ML-QUIP](#ml-quip)
* [MOLFILE](#molfile)
* [NETCDF](#netcdf)
* [OPENMP](#openmp)
* [OPT](#opt)
* [PLUMED](#plumed)
* [PYTHON](#python)
* [QMMM](#qmmm)
* [RHEO](#rheo)
* [SCAFACOS](#scafacos)
* [VORONOI](#voronoi)
* [VTK](#vtk)
----------


## COMPRESS package

To build with this package you must have the [zlib compression library](https://zlib.net) available on your system to build dump styles with
a `/gz` suffix.  There are also styles using the
[Zstandard](https://facebook.github.io/zstd/) library which have a
'/zstd' suffix.  The zstd library version must be at least 1.4.  Older
versions use an incompatible API and thus LAMMPS will fail to compile.

----------


## GRAPHICS package

*Added in version 11Feb2026*

The [dump image](dump_image) command has options to output JPEG or
PNG image files in addition to the default PPM format, and the [fix
graphics/labels](fix_graphics_labels) can read images in JPEG or PNG
format in addition to PPM format files.  Likewise, the [dump movie](dump_image) command outputs movie files in a variety of movie formats.
Using these additional options requires the following settings:

Using `ffmpeg` to output movie files requires that your machine
supports the "popen" function in the standard runtime library.


> **Note**
> On some clusters with high-speed networks, using the fork()
> library call (required by popen()) can interfere with the fast
> communication library and lead to simulations using ffmpeg to hang or
> crash.

----------


## GPU package

To build with this package, you must choose options for precision and
which GPU hardware to build for. The GPU package currently supports
three different types of back ends: OpenCL, CUDA and HIP.

### CMake build

```bash
-D GPU_API=value             # value = opencl (default) or cuda or hip
-D GPU_PREC=value            # precision setting
                             # value = double or mixed (default) or single
-D GPU_ARCH=value            # primary GPU hardware choice for GPU_API=cuda
                             # value = sm_XX (see below, default is sm_75)
-D GPU_DEBUG=value           # enable debug code in the GPU package library,
                             # mostly useful for developers
                             # value = yes or no (default)
-D HIP_PATH=value            # value = path to HIP installation. Must be set if
                             # GPU_API=HIP
-D HIP_ARCH=value            # primary GPU hardware choice for GPU_API=hip
                             # value depends on selected HIP_PLATFORM
                             # default is 'gfx906' for HIP_PLATFORM=amd and 'sm_75' for
                             # HIP_PLATFORM=nvcc
-D HIP_USE_DEVICE_SORT=value # enables GPU sorting
                             # value = yes (default) or no
-D CUDPP_OPT=value           # use GPU binning with CUDA (should be off for modern GPUs)
                             # enables CUDA Performance Primitives, must be "no" for
                             # CUDA_MPS_SUPPORT=yes
                             # value = yes or no (default)
-D CUDA_MPS_SUPPORT=value    # enables some tweaks required to run with active
                             # nvidia-cuda-mps daemon
                             # value = yes or no (default)
-D CUDA_BUILD_MULTIARCH=value  # enables building CUDA kernels for all supported GPU
                               # architectures
                               # value = yes (default) or no
-D USE_STATIC_OPENCL_LOADER=value  # downloads/includes OpenCL ICD loader library,
                                   # no local OpenCL headers/libs needed
                                   # value = yes (default) or no
```
The GPU package supports 3 precision modes: single, double, and mixed, with
the latter being the default.  In the double precision mode, atom positions,
forces and energies are stored, computed and accumulated in double precision.
In the mixed precision mode, forces and energies are accumulated in double precision
while atom coordinates are stored and arithmetic operations are performed
in single precision. In the single precision mode, all are stored, executed
and accumulated in single precision.

To specify the precision mode (output to the screen before LAMMPS runs for
verification), set `GPU_PREC` to one of `single`, `double`, or `mixed`.

Some accelerators or OpenCL implementations only support single precision.
This mode should be used with care and appropriate validation as the errors
can scale with system size in this implementation. This can be useful for
accelerating test runs when setting up a simulation for production runs on
another machine. In the case where only single precision is supported, either
LAMMPS must be compiled with `-DFFT_SINGLE` to use PPPM with GPU acceleration
or GPU acceleration should be disabled for PPPM (e.g. suffix off or `pair/only`
as described in the LAMMPS documentation).

`GPU_ARCH` settings for different GPU hardware is as follows:

* `sm_30` for Kepler (supported since CUDA 5 and until CUDA 10.x)
* `sm_35` or `sm_37` for Kepler (supported since CUDA 5 and until CUDA 11.x)
* `sm_50` or `sm_52` for Maxwell (supported since CUDA 6)
* `sm_60` or `sm_61` for Pascal (supported since CUDA 8)
* `sm_70` for Volta (supported since CUDA 9)
* `sm_75` for Turing (supported since CUDA 10)
* `sm_80` or `sm_86` for Ampere (supported since CUDA 11, `sm_86` since CUDA 11.1)
* `sm_89` for Lovelace (supported since CUDA 11.8)
* `sm_90` or `sm_90a` for Hopper (supported since CUDA 12.0)
* `sm_100` or `sm_103` for Blackwell B100/B200/B300 (supported since CUDA 12.8)
* `sm_120` for Blackwell B20x/B40 (supported since CUDA 12.8)
* `sm_121` for Blackwell (supported since CUDA 12.9)

A more detailed list can be found, for example,
at [Wikipedia's CUDA article](https://en.wikipedia.org/wiki/CUDA#GPUs_supported)

CMake can detect which version of the CUDA toolkit is used and thus will
try to include support for **all** major GPU architectures supported by
this toolkit.  Thus the `GPU_ARCH` setting is merely an optimization, to
have code for the preferred GPU architecture directly included rather
than having to wait for the JIT compiler of the CUDA driver to translate
it.  This behavior can be turned off (e.g. to speed up compilation) by
setting `CUDA_ENABLE_MULTIARCH` to `no`.

When compiling for CUDA or HIP with CUDA, version 8.0 or later of the
CUDA toolkit is required and a GPU architecture of Kepler or later,
which must *also* be supported by the CUDA toolkit in use **and** the
CUDA driver in use.  When compiling for OpenCL, OpenCL version 1.2 or
later is required and the GPU must be supported by the GPU driver and
OpenCL runtime bundled with the driver.

Please note that the GPU library accesses the CUDA driver library
directly, so it needs to be linked with the CUDA driver library
(`libcuda.so`) that ships with the Nvidia driver.  If you are
compiling LAMMPS on the head node of a GPU cluster, this library may not
be installed, so you may need to copy it over from one of the compute
nodes (best into this directory).  Recent versions of the CUDA toolkit
starting from CUDA 9 provide a dummy `libcuda.so` library (typically
under `$(CUDA_HOME)/lib64/stubs`), that can be used for linking.  If
you are compiling LAMMPS with the `-D BUILD_SHARED_LIBS=ON` setting,
you may get to see `ld: warning: libcuda.so.1, needed by
liblammps.so.0, not found`.  This may be worked around by also setting:
`-DCMAKE_EXE_LINKER_FLAGS=-Wl,--unresolved-symbols=ignore-in-shared-libs`.

To support the CUDA multi-process server (MPS) you can set the define
`-DCUDA_MPS_SUPPORT`.  Please note that in this case you must **not**
use the CUDA performance primitives and thus set the variable
`CUDPP_OPT` to empty.

If you are compiling for OpenCL, the default setting is to download,
build, and link with a static OpenCL ICD loader library and standard
OpenCL headers.  This way no local OpenCL development headers or library
needs to be present and only OpenCL compatible drivers need to be
installed to use OpenCL.  If this is not desired, you can set
`USE_STATIC_OPENCL_LOADER` to `no`.

If `GERYON_NUMA_FISSION` is defined at build time (`-DGPU_DEBUG=no`),
LAMMPS will consider separate NUMA nodes on GPUs or accelerators as
separate devices.  For example, a 2-socket CPU would appear as two separate
devices for OpenCL (and LAMMPS would require two MPI processes to use both
sockets with the GPU library - each with its own device ID as output by
ocl_get_devices).  OpenCL version 1.2 or later is required.

If you are compiling with HIP, note that before running CMake you will
have to set appropriate environment variables. Some variables such as
``HCC_AMDGPU_TARGET`[(for ROCm](= 4.0) or `CUDA_PATH` are
necessary for `hipcc` and the linker to work correctly.

When compiling for HIP ROCm, GPU sorting with `-D
HIP_USE_DEVICE_SORT=on` requires installing the `hipcub` library
(https://github.com/ROCmSoftwarePlatform/hipCUB).  The HIP CUDA-backend
additionally requires CUB (https://nvidia.github.io/cccl/cub/).  Setting
`-DDOWNLOAD_CUB=yes` will download and compile CUB.

The GPU library has some multi-thread support using OpenMP.  If LAMMPS
is built with `-D BUILD_OMP=on` this will also be enabled.

For a debug build, set `GPU_DEBUG` to be `yes`.

*Added in version 3Aug2022*
Using the CHIP-SPV implementation of HIP is supported. It allows one to
run HIP code on Intel GPUs via the OpenCL or Level Zero back ends. To use
CHIP-SPV, you must set `-DHIP_USE_DEVICE_SORT=OFF` in your CMake
command-line as CHIP-SPV does not yet support hipCUB. As of Summer 2022,
the use of HIP for Intel GPUs is experimental. You should only use this
option in preparations to run on Aurora system at Argonne.

----------


## KIM package

To build with this package, the KIM library with API v2 must be downloaded
and built on your system. It must include the KIM models that you want to
use with LAMMPS.

If you would like to use the [kim query](kim_commands)
command, you also need to have libcurl installed with the matching
development headers and the curl-config tool.

If you would like to use the [kim property](kim_commands)
command, you need to build LAMMPS with the PYTHON package installed
and linked to Python 3.6 or later. See the [PYTHON package build info](#python)
for more details on this. After successfully building LAMMPS with Python, you
also need to install the `kim-property` Python package, which can be easily
done using *pip* as `pip install kim-property`, or from the *conda-forge*
channel as `conda install kim-property` if LAMMPS is built in Conda. More
detailed information is available at:
`kim-property installation <https://github.com/openkim/kim-property#installing-kim-property).

In addition to installing the KIM API, it is also necessary to install the
library of KIM models (interatomic potentials).
See [Obtaining KIM Models](https://openkim.org/doc/usage/obtaining-models) to
learn how to install a pre-build binary of the OpenKIM Repository of Models.
See the list of all KIM models here: https://openkim.org/browse/models

(Also note that when downloading and installing from source
the KIM API library with all its models, may take a long time (tens of
minutes to hours) to build.  Of course you only need to do that once.)

### Debugging OpenKIM web queries in LAMMPS

If `LMP_DEBUG_CURL` is set, the libcurl verbose mode will be turned
on, and any libcurl calls within the KIM web query display a lot of
information about libcurl operations.  You hardly ever want this set in
production use, you will almost always want this when you debug or
report problems.

The libcurl library performs peer SSL certificate verification by
default.  This verification is done using a CA certificate store that
the SSL library can use to make sure the peer's server certificate is
valid.  If SSL reports an error ("certificate verify failed") during the
handshake and thus refuses further communicate with that server, you can
set `LMP_NO_SSL_CHECK` to override that behavior.  When LAMMPS is
compiled with `LMP_NO_SSL_CHECK` set, libcurl does not verify the peer
and connection attempts will succeed regardless of the names in the
certificate. This option is insecure.  As an alternative, you can
specify your own CA cert path by setting the environment variable
`CURL_CA_BUNDLE` to the path of your choice.  A call to the KIM web
query would get this value from the environment variable.


### KIM Extra unit tests (CMake only)

During development, testing, or debugging, if
[unit testing](Build_development) is enabled in LAMMPS, one can also
enable extra tests on [KIM commands](kim_commands) by setting the
`KIM_EXTRA_UNITTESTS` to `yes` (or `on`).

Enabling the extra unit tests have some requirements,

* It requires to have internet access.
* It requires to have libcurl installed with the matching development headers
  and the curl-config tool.
* It requires to build LAMMPS with the PYTHON package installed and linked to
  Python 3.6 or later. See the [PYTHON package build info](#python) for
  more details on this.
* It requires to have `kim-property` Python package installed, which can be
  easily done using *pip* as `pip install kim-property`, or from the
  *conda-forge* channel as `conda install kim-property` if LAMMPS is built in
  Conda. More detailed information is available at:
  [kim-property installation](https://github.com/openkim/kim-property#installing-kim-property).
* It is also necessary to install the following KIM models:

  * `EAM_Dynamo_MendelevAckland_2007v3_Zr__MO_004835508849_000`
  * `EAM_Dynamo_ErcolessiAdams_1994_Al__MO_123629422045_005`
  * `LennardJones612_UniversalShifted__MO_959249795837_003`

  See [Obtaining KIM Models](https://openkim.org/doc/usage/obtaining-models)
  to learn how to install a pre-built binary of the OpenKIM Repository of
  Models or see
  [Installing KIM Models](https://openkim.org/doc/usage/obtaining-models/#installing_models)
  to learn how to install the specific KIM models.

----------


## KOKKOS package

Using the KOKKOS package requires choosing several settings.  You have
to select whether you want to compile with parallelization on the host
and whether you want to include offloading of calculations to a device
(e.g. a GPU).  The default setting is to have no host parallelization
and no device offloading.  In addition, you can select the hardware
architecture to select the instruction set.  Since most hardware is
backward compatible, you may choose settings for an older architecture
to have an executable that will run on this and newer architectures.


> **Note**
> If you run Kokkos on a different GPU architecture than what LAMMPS
> was compiled with, there will be a delay during device initialization
> while the just-in-time compiler is recompiling all GPU kernels for
> the new hardware.  This is, however, only supported for GPUs of the
> **same** major hardware version and different minor hardware versions,
> e.g. 5.0 and 5.2 but not 5.2 and 6.0.  LAMMPS will abort with an
> error message indicating a mismatch, if the major version differs.

The settings discussed below have been tested with LAMMPS and are
confirmed to work.  Kokkos is an active project with ongoing improvements
and projects working on including support for additional architectures.
More information on Kokkos can be found on the
[Kokkos GitHub project](https://github.com/kokkos).

### Available Architecture settings

These are the possible choices for the Kokkos architecture ID.
They must be specified in uppercase.


| **Arch-ID** | **HOST or GPU** | **Description** |
| --- | --- | --- |
| NATIVE | HOST | Local machine |
| AMDAVX | HOST | AMD chip |
| ARMV80 | HOST | ARMv8.0 Compatible CPU |
| ARMV81 | HOST | ARMv8.1 Compatible CPU |
| ARMV84 | HOST | ARMv8.4 Compatible CPU |
| ARMV84_SVE | HOST | Generic ARMv8.4 with SVE support (-march=armv8.4-a+sve) |
| ARMV8_THUNDERX | HOST | ARMv8 Cavium ThunderX CPU |
| ARMV8_THUNDERX2 | HOST | ARMv8 Cavium ThunderX2 CPU |
| A64FX | HOST | ARMv8.2 with SVE Support |
| ARMV9_GRACE | HOST | ARMv9 NVIDIA Grace CPU |
| SNB | HOST | Intel Sandy/Ivy Bridge CPUs |
| HSW | HOST | Intel Haswell CPUs |
| BDW | HOST | Intel Broadwell Xeon E-class CPUs |
| ICL | HOST | Intel Ice Lake Client CPUs (AVX512) |
| ICX | HOST | Intel Ice Lake Xeon Server CPUs (AVX512) |
| SKL | HOST | Intel Skylake Client CPUs |
| SKX | HOST | Intel Skylake Xeon Server CPUs (AVX512) |
| KNC | HOST | Intel Knights Corner Xeon Phi |
| KNL | HOST | Intel Knights Landing Xeon Phi |
| SPR | HOST | Intel Sapphire Rapids Xeon Server CPUs (AVX512) |
| POWER8 | HOST | IBM POWER8 CPUs |
| POWER9 | HOST | IBM POWER9 CPUs |
| ZEN | HOST | AMD Zen architecture |
| ZEN2 | HOST | AMD Zen2 architecture |
| ZEN3 | HOST | AMD Zen3 architecture |
| ZEN4 | HOST | AMD Zen4 architecture |
| ZEN5 | HOST | AMD Zen5 architecture |
| RISCV_SG2042 | HOST | SG2042 (RISC-V) CPUs |
| RISCV_RVA22V | HOST | RVA22V (RISC-V) CPUs |
| RISCV_U74MC | HOST | U74MC (RISC-V) CPUs |
| KEPLER30 | GPU | NVIDIA Kepler generation CC 3.0 |
| KEPLER32 | GPU | NVIDIA Kepler generation CC 3.2 |
| KEPLER35 | GPU | NVIDIA Kepler generation CC 3.5 |
| KEPLER37 | GPU | NVIDIA Kepler generation CC 3.7 |
| MAXWELL50 | GPU | NVIDIA Maxwell generation CC 5.0 |
| MAXWELL52 | GPU | NVIDIA Maxwell generation CC 5.2 |
| MAXWELL53 | GPU | NVIDIA Maxwell generation CC 5.3 |
| PASCAL60 | GPU | NVIDIA Pascal generation CC 6.0 |
| PASCAL61 | GPU | NVIDIA Pascal generation CC 6.1 |
| VOLTA70 | GPU | NVIDIA Volta generation CC 7.0 |
| VOLTA72 | GPU | NVIDIA Volta generation CC 7.2 |
| TURING75 | GPU | NVIDIA Turing generation CC 7.5 |
| AMPERE80 | GPU | NVIDIA Ampere generation CC 8.0 |
| AMPERE86 | GPU | NVIDIA Ampere generation CC 8.6 |
| AMPERE87 | GPU | NVIDIA Ampere generation CC 8.7 |
| ADA89 | GPU | NVIDIA Ada generation CC 8.9 |
| HOPPER90 | GPU | NVIDIA Hopper generation CC 9.0 |
| BLACKWELL100 | GPU | NVIDIA Blackwell generation CC 10.0 |
| BLACKWELL120 | GPU | NVIDIA Blackwell generation CC 12.0 |
| AMD_GFX906 | GPU | AMD GPU MI50/60 |
| AMD_GFX908 | GPU | AMD GPU MI100 |
| AMD_GFX90A | GPU | AMD GPU MI200 |
| AMD_GFX940 | GPU | AMD GPU MI300 |
| AMD_GFX942 | GPU | AMD GPU MI300 |
| AMD_GFX942_APU | GPU | AMD APU MI300A |
| AMD_GFX1030 | GPU | AMD GPU V620/W6800 |
| AMD_GFX1100 | GPU | AMD GPU RX7900XTX |
| AMD_GFX1103 | GPU | AMD APU Phoenix |
| INTEL_GEN | GPU | SPIR64-based devices, e.g. Intel GPUs, using JIT |
| INTEL_DG1 | GPU | Intel Iris XeMAX GPU |
| INTEL_GEN9 | GPU | Intel GPU Gen9 |
| INTEL_GEN11 | GPU | Intel GPU Gen11 |
| INTEL_GEN12LP | GPU | Intel GPU Gen12LP |
| INTEL_XEHP | GPU | Intel GPU Xe-HP |
| INTEL_PVC | GPU | Intel GPU Ponte Vecchio |
| INTEL_DG2 | GPU | Intel GPU DG2 |

This list was last updated for version 4.7.1 of the Kokkos library.

### Advanced KOKKOS compilation settings

There are other allowed options when building with the KOKKOS package
that can improve performance or assist in debugging or profiling. Below
are some examples that may be useful in combination with LAMMPS.  For
the full list (which keeps changing as the Kokkos package itself evolves),
please consult the Kokkos library documentation.

As alternative to using multi-threading via OpenMP
(`-DKokkos_ENABLE_OPENMP=on`) it is also possible to use Posix threads
directly (`-DKokkos_ENABLE_PTHREAD=on`).  While binding of threads to
individual or groups of CPU cores is managed in OpenMP with environment
variables, you need assistance from either the "hwloc" or "libnuma"
library for the Pthread thread parallelization option. To enable use
with CMake: `-DKokkos_ENABLE_HWLOC=on` or
`-DKokkos_ENABLE_LIBNUMA=on`.

The CMake option `-DKokkos_ENABLE_LIBRT=on` enables the use of a more
accurate timer mechanism on many Unix-like platforms for internal
profiling.

The CMake option `-DKokkos_ENABLE_DEBUG=on` enables printing of
run-time debugging information that can be useful. It also enables
runtime bounds checking on Kokkos data structures.  As to be expected,
enabling this option will negatively impact the performance and thus is
only recommended when developing a Kokkos-enabled style in LAMMPS.

The CMake option `-DKokkos_ENABLE_CUDA_UVM=on` enables the use of CUDA
"Unified Virtual Memory" (UVM) in Kokkos.  UVM allows to transparently
use RAM on the host to supplement the memory used on the GPU (with some
performance penalty) and thus enables running larger problems that would
otherwise not fit into the RAM on the GPU.

The CMake option `-D KOKKOS_PREC=value` sets the floating point
precision of the calculations, where `value` can be one of: `double`
(FP64, default) or `mixed` (FP64 for accumulation of forces, energy,
and virial, FP32 otherwise) or `single` (FP32).  When using reduced
precision (single or mixed), the simulation should be carefully checked
to ensure it is stable and that energy is acceptably conserved.

The CMake option `-D KOKKOS_LAYOUT=value` sets the array layout of
Kokkos views (e.g. forces, velocities, etc.) on GPUs, where `value`
can be one of: `legacy` (mostly LayoutRight, default) or `default`
(mostly LayoutLeft).  Using the default layout (LayoutLeft) can give
speedup on GPUs for some models, but a slowdown for others. LayoutRight
is always used for positions on GPUs since it has been found to be
faster, and when compiling exclusively for CPUs.

----------


## LEPTON package

To build with this package, you must build the Lepton library which is
included in the LAMMPS source distribution in the `lib/lepton` folder.

----------


## MACHDYN package

To build with this package, you must download the Eigen3 library.
Eigen3 is a template library, so you do not need to build it.

----------


## ML-IAP package

Building the ML-IAP package requires including the [ML-SNAP](#PKG-ML-SNAP) package.  There will be an error message if this requirement
is not satisfied.  Using the *mliappy* model also requires enabling
Python support, which in turn requires to include the [PYTHON](#PKG-PYTHON) package **and** requires to have the [cython](https://cython.org) software installed and with it a working
`cythonize` command.  This feature requires compiling LAMMPS with
Python version 3.6 or later.

----------


## OPT package

----------


## PYTHON package

Building with the PYTHON package requires you have a the Python
development headers and library available on your system, which
needs to be Python version 3.6 or later.  See `lib/python/README`
for additional details.

----------


## VORONOI package

To build with this package, you must download and build the
[Voro++ library](https://math.lbl.gov/voro++/) or install a
binary package provided by your operating system.

----------


## ADIOS package

The ADIOS package requires the [ADIOS I/O library](https://github.com/ornladios/ADIOS2), version 2.3.1 or newer. Make
sure that you have ADIOS built either with or without MPI to match if
you build LAMMPS with or without MPI.  ADIOS compilation settings for
LAMMPS are automatically detected, if the PATH and LD_LIBRARY_PATH
environment variables have been updated for the local ADIOS installation
and the instructions below are followed for the respective build
systems.

----------


## APIP package

The APIP package depends on the library of the
[ML-PACE](#ml-pace) package.
The code for the library can be found
at: [https://github.com/ICAMS/lammps-user-pace/](https://github.com/ICAMS/lammps-user-pace/)

----------


## COLVARS package

This package enables the use of the [Colvars](https://colvars.github.io/)
module included in the LAMMPS source distribution.


----------


## ELECTRODE package

This package depends on the KSPACE package.

----------


## MBX package

*Added in version 11Feb2026*
This package requires the MBX library that can be downloaded and built
either before LAMMPS is built or as part of the LAMMPS compilation.  The
code for the library can be found at:
[https://github.com/paesanilab/MBX/](https://github.com/paesanilab/MBX/)

Instead of including the MBX package directly into LAMMPS, it is also
possible to skip this step and build the MBX package as a plugin using
the CMake script files in the `examples/PACKAGE/mbx/plugin` folder and
then load this plugin at runtime with the [plugin command](plugin).

----------


## ML-PACE package

This package requires a library that can be downloaded and built
in lib/pace or somewhere else, which must be done before building
LAMMPS with this package. The code for the library can be found
at: [https://github.com/ICAMS/lammps-user-pace/](https://github.com/ICAMS/lammps-user-pace/)

Instead of including the ML-PACE package directly into LAMMPS, it
is also possible to skip this step and build the ML-PACE package as
a plugin using the CMake script files in the `examples/PACKAGE/pace/plugin`
folder and then load this plugin at runtime with the [plugin command](plugin).

----------


## ML-POD package

----------


## ML-QUIP package

To build with this package, you must download and build the QUIP
library.  It can be obtained from GitHub.  For support of GAP
potentials, additional files with specific licensing conditions need
to be downloaded and configured.  The automatic download will from
within CMake will download the non-commercial use version.

----------


## PLUMED package


Before building LAMMPS with this package, you must first build PLUMED.
PLUMED can be built as part of the LAMMPS build or installed separately
from LAMMPS using the generic [PLUMED installation instructions](plumedinstall_).
The PLUMED package has been tested to work with Plumed versions
2.4.x, to 2.9.x and will error out, when trying to run calculations
with a different version of the Plumed kernel.

PLUMED can be linked into MD codes in three different modes: static,
shared, and runtime.  With the "static" mode, all the code that PLUMED
requires is linked statically into LAMMPS. LAMMPS is then fully
independent from the PLUMED installation, but you have to rebuild/relink
it in order to update the PLUMED code inside it.  With the "shared"
linkage mode, LAMMPS is linked to a shared library that contains the
PLUMED code.  This library should preferably be installed in a globally
accessible location. When PLUMED is linked in this way the same library
can be used by multiple MD packages.  Furthermore, the PLUMED library
LAMMPS uses can be updated without the need for a recompile of LAMMPS
for as long as the shared PLUMED library is ABI-compatible.

The third linkage mode is "runtime" which allows the user to specify
which PLUMED kernel should be used at runtime by using the PLUMED_KERNEL
environment variable. This variable should point to the location of the
libplumedKernel.so dynamical shared object, which is then loaded at
runtime. This mode of linking is particularly convenient for doing
PLUMED development and comparing multiple PLUMED versions as these sorts
of comparisons can be done without recompiling the hosting MD code. All
three linkage modes are supported by LAMMPS on selected operating
systems (e.g. Linux) and using either CMake or traditional make
build. The "static" mode should be the most portable, while the
"runtime" mode support in LAMMPS makes the most assumptions about
operating system and compiler environment. If one mode does not work,
try a different one, switch to a different build system, consider a
global PLUMED installation or consider downloading PLUMED during the
LAMMPS build.

Instead of including the PLUMED package directly into LAMMPS, it
is also possible to skip this step and build the PLUMED package as
a plugin using the CMake script files in the `examples/PACKAGE/plumed/plugin`
folder and then load this plugin at runtime with the [plugin command](plugin).

----------


## H5MD package

To build with this package you must have the HDF5 software package
installed on your system, which should include the h5cc compiler and
the HDF5 library.

----------


## ML-HDNNP package

To build with the ML-HDNNP package it is required to download and build the
external [n2p2](https://github.com/CompPhysVienna/n2p2) library `v2.1.4`
(or higher). The LAMMPS build process offers an automatic download and
compilation of *n2p2* or allows you to choose the installation directory of
*n2p2* manually. Please see the boxes below for the CMake and traditional build
system for detailed information.

In case of a manual installation of *n2p2* you only need to build the *n2p2* core
library `libnnp` and interface library `libnnpif`. When using GCC it should
suffice to execute `make libnnpif` in the *n2p2* `src` directory. For more
details please see `lib/hdnnp/README` and the [n2p2 build documentation](https://compphysvienna.github.io/n2p2/topics/build.html).

----------


## INTEL package

To build with this package, you must choose which hardware you want to
build for, either x86 CPUs or Intel KNLs in offload mode.  You should
also typically [install the OPENMP package](#openmp), as it can be
used in tandem with the INTEL package to good effect, as explained
on the [Speed_intel](Speed_intel) page.

When using Intel compilers version 16.0 or later is required.  You can
also use the GNU or Clang compilers and they will provide performance
improvements over regular styles and OPENMP styles, but less so than
with the Intel compilers.  Please also note, that some compilers have
been found to apply memory alignment constraints incompletely or
incorrectly and thus can cause segmentation faults in otherwise correct
code when using features from the INTEL package.


In Long-range thread mode (LRT) a modified verlet style is used, that
operates the Kspace calculation in a separate thread concurrently to
other calculations. This has to be enabled in the [package intel](package) command at runtime. With the setting "threads" it used the
pthreads library, while "c++17" will use the built-in thread support
of C++17 compilers. The option "none" skips compilation of this
feature. The default is to use "threads" if pthreads is available and
otherwise "none".

Best performance is achieved with Intel hardware, Intel compilers, as
well as the Intel TBB and MKL libraries. However, the code also
compiles, links, and runs with other compilers / hardware and without
TBB and MKL.

----------


## MDI package

----------


## MISC package

The [fix imd](fix_imd) style in this package can be run either
synchronously (communication with IMD clients is done in the main
process) or asynchronously (the fix spawns a separate thread that can
communicate with IMD clients concurrently to the LAMMPS execution).

----------


## MOLFILE package

----------


## NETCDF package

To build with this package you must have the NetCDF library installed
on your system.

----------


## OPENMP package


> **Admonition: Adding OpenMP support on macOS**
> Apple offers the [Xcode package and IDE
>](https://developer.apple.com/xcode/) for compiling software on
> macOS, so you have likely installed it to compile LAMMPS.  Their
> compiler is based on [Clang](https://clang.llvm.org/), but while it
> is capable of processing OpenMP directives, the necessary header
> files and OpenMP runtime library are missing.  The [R developers
>](https://www.r-project.org/) have figured out a way to build those
> in a compatible fashion. One can download them from
> [https://mac.r-project.org/openmp/
>](https://mac.r-project.org/openmp/).  Simply adding those files as
> instructed enables the Xcode C++ compiler to compile LAMMPS with `-D
> BUILD_OMP=yes`.

----------


## QMMM package

For using LAMMPS to do QM/MM simulations via the QMMM package you
need to build LAMMPS as a library.  A LAMMPS executable with [fix
qmmm](fix_qmmm) included can be built, but will not be able to do a
QM/MM simulation on as such.  You must also build a QM code - currently
only Quantum ESPRESSO (QE) is supported - and create a new executable
which links LAMMPS and the QM code together.  Details are given in the
`lib/qmmm/README` file.  It is also recommended to read the
instructions for [linking with LAMMPS as a library](Build_link)
for background information.  This requires compatible Quantum Espresso
and LAMMPS versions.  The current interface and makefiles have last been
verified to work in February 2020 with Quantum Espresso versions 6.3 to
6.5.

----------


## RHEO package

This package depends on the BPM package.

----------


## SCAFACOS package

To build with this package, you must download and build the
[ScaFaCoS Coulomb solver library](http://www.scafacos.de/)

----------


## VTK package

To build with this package you must have the VTK library installed on
your system.
