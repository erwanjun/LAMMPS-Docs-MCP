---
title: "Configuration information"
category: "python"
tags: ["python", "API", "config"]
---
# Configuration information

The following methods can be used to query the LAMMPS library
about compile time settings and included packages and styles.

```python
**caption:**  Example for using configuration settings functions

from lammps import lammps

lmp = lammps()

try:
    lmp.file("in.missing")
except Exception as e:
    print("LAMMPS failed with error:", e)

# write compressed dump file depending on available of options

if lmp.has_style("dump", "atom/zstd"):
    lmp.command("dump d1 all atom/zstd 100 dump.zst")
elif lmp.has_style("dump", "atom/gz"):
    lmp.command("dump d1 all atom/gz 100 dump.gz")
elif lmp.has_gzip_support():
    lmp.command("dump d1 all atom 100 dump.gz")
else:
    lmp.command("dump d1 all atom 100 dump")
## ```

**Methods:**

* :py`lammps.has_mpi_support <lammps.lammps.has_mpi_support>`
* :py`lammps.has_exceptions <lammps.lammps.has_exceptions>`
* :py`lammps.has_gzip_support <lammps.lammps.has_gzip_support>`
* :py`lammps.has_png_support <lammps.lammps.has_png_support>`
* :py`lammps.has_jpeg_support <lammps.lammps.has_jpeg_support>`
* :py`lammps.has_ffmpeg_support <lammps.lammps.has_ffmpeg_support>`

* :py`lammps.installed_packages <lammps.lammps.installed_packages>`

* :py`lammps.get_accelerator_config <lammps.lammps.accelerator_config>`

* :py`lammps.has_style() <lammps.lammps.has_style()>`
* :py`lammps.available_styles() <lammps.lammps.available_styles()>`
