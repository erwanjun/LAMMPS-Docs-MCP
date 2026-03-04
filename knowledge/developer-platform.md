---
title: "Platform abstraction functions"
category: "developer"
tags: ["developer", "programming", "platform"]
---
# Platform abstraction functions

The `platform` sub-namespace inside the `LAMMPS_NS` namespace
provides a collection of wrapper and convenience functions and utilities
that perform common tasks for which platform specific code would be
required or for which a more high-level abstraction would be convenient
and reduce duplicated code.  This reduces redundant implementations and
encourages consistent behavior and thus has some overlap with the
["utils" sub-namespace](Developer_utils).

## Time functions

## Platform information functions

## File and path functions and global constants

Since we are requiring C++17 to compile LAMMPS, you can also make use of
the functionality of the [C++ filesystem library](https://cppreference.com/w/cpp/filesystem.html).  The following
functions are in part convenience functions or emulate the behavior of
similar Python functions or Unix shell commands.  Please note that the
you need to use the `string()` member function of the
[std::filesystem::path class](https://cppreference.com/w/cpp/filesystem/path.html) to get access
to the path as a C++ string class instance.

## Standard I/O function wrappers

## Environment variable functions

## Dynamically loaded object or library functions

## Compressed file I/O functions
