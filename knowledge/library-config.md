---
title: "Configuration information"
category: "library"
tags: ["library", "C-API", "config"]
---
# Configuration information

This section documents the following functions:

- :cpp`lammps_version`
- :cpp`lammps_get_os_info`
- :cpp`lammps_config_has_mpi_support`
- :cpp`lammps_config_has_omp_support`
- :cpp`lammps_config_has_gzip_support`
- :cpp`lammps_config_has_png_support`
- :cpp`lammps_config_has_jpeg_support`
- :cpp`lammps_config_has_ffmpeg_support`
- :cpp`lammps_config_has_exceptions`
- :cpp`lammps_config_has_package`
- :cpp`lammps_config_package_count`
- :cpp`lammps_config_package_name`
- :cpp`lammps_config_accelerator`
- :cpp`lammps_has_gpu_device`
- :cpp`lammps_gpu_device_info`
- :cpp`lammps_has_style`
- :cpp`lammps_style_count`
- :cpp`lammps_style_name`
- :cpp`lammps_has_id`
- :cpp`lammps_id_count`
- :cpp`lammps_id_name`

--------------------

These library functions can be used to query the LAMMPS library for
compile time settings and included packages and styles.  This enables
programs that use the library interface to determine whether the
linked LAMMPS library is compatible with the requirements of the
application without crashing during the LAMMPS functions (e.g. due to
missing pair styles from packages) or to choose between different
options (e.g. whether to use `lj/cut`, `lj/cut/opt`,
`lj/cut/omp` or `lj/cut/intel`).  Most of the functions can be
called directly without first creating a LAMMPS instance.  While
crashes within LAMMPS may be recovered from by enabling
[exceptions](#exceptions), avoiding them proactively is a safer
approach.

```c
**caption:**  Example for using configuration settings functions

#include "library.h"
#include <stdio.h>

int main(int argc, char **argv)
{
  void *handle;

  handle = lammps_open_no_mpi(0, NULL, NULL);
  lammps_file(handle, "in.missing");
  if (lammps_has_error(handle)) {
    char errmsg[256];
    int errtype;
    errtype = lammps_get_last_error_message(handle, errmsg, 256);
    fprintf(stderr, "LAMMPS failed with error: %s\n", errmsg);
    return 1;
  }
  /* write compressed dump file depending on available of options */
  if (lammps_has_style(handle, "dump", "atom/zstd")) {
    lammps_command(handle, "dump d1 all atom/zstd 100 dump.zst");
  } else if (lammps_has_style(handle, "dump", "atom/gz")) {
    lammps_command(handle, "dump d1 all atom/gz 100 dump.gz");
  } else if (lammps_config_has_gzip_support()) {
    lammps_command(handle, "dump d1 all atom 100 dump.gz");
  } else {
    lammps_command(handle, "dump d1 all atom 100 dump");
  }
  lammps_close(handle);
  return 0;
}
```
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

-----------------------

-----------------------

-----------------------

-----------------------

-----------------------
