---
title: "Utility functions"
category: "library"
tags: ["library", "C-API", "utility"]
---
# Utility functions

To simplify some tasks, the library interface contains these utility
functions.  They do not directly call the LAMMPS library.

- :cpp`lammps_encode_image_flags`
- :cpp`lammps_decode_image_flags`
- :cpp`lammps_set_fix_external_callback`
- :cpp`lammps_fix_external_get_force`
- :cpp`lammps_fix_external_set_energy_global`
- :cpp`lammps_fix_external_set_energy_peratom`
- :cpp`lammps_fix_external_set_virial_global`
- :cpp`lammps_fix_external_set_virial_peratom`
- :cpp`lammps_fix_external_set_vector_length`
- :cpp`lammps_fix_external_set_vector`
- :cpp`lammps_flush_buffers`
- :cpp`lammps_free`
- :cpp`lammps_is_running`
- :cpp`lammps_force_timeout`
- :cpp`lammps_has_error`
- :cpp`lammps_get_last_error_message`
- :cpp`lammps_set_show_error`
- :cpp`lammps_python_api_version`

The :cpp`lammps_free` function is a clean-up function to free
memory that the library had allocated previously via other function
calls.  Look for notes in the descriptions of the individual commands
where such memory buffers were allocated that require the use of
:cpp`lammps_free`.

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
