---
title: "Dump Modify Command"
description: "Detailed dump_modify options for controlling output format, frequency, and content"
category: "command"
tags: ["dump", "output", "trajectory", "format", "dump_modify"]
commands: ["dump_modify"]
---
# 9.18 dump_modify command  

# 9.19 dump_modify command for image/movie options  

# 9.19.1 Syntax  

dump_modify dump-ID keyword values ...  

• dump- $\mathrm{{\cdot}I D=I D}$ of dump to modify one or more keyword/value pairs may be appended   
• these keywords apply to various dump styles   
• keyword $=$ append or at or balance or buffer or colname or delay or element or every or every/time or fileper or first or flush or format or header or image or label or maxfiles or nfile or pad or pbc or precision or re refresh or scale or sfactor or skip or sort or tfactor or thermo or thresh or time or triclinic/general or t units or unwrap   
append $\mathrm{arg}=\mathrm{yes}$ or no   
at $\mathrm{arg}=\mathrm{N}$ $\mathrm{N}=$ index of frame written upon first dump   
balance $\mathrm{arg}=\mathrm{yes}$ or no   
buffer $\mathrm{arg}=\mathrm{yes}$ or no   
colname values $=$ ID string, or default string = new column header name ID = integer from 1 to N, or integer from -1 to -N, where $\Nu=\#$ of quantities being output or a custom dump keyword or reference to compute, fix, property or variable.   
delay arg = Dstep Dstep = delay output until this timestep   
element args = E1 E2 ... EN, where N = # of atom types   
E1,...,EN = element name (e.g., C or Fe or Ga)   
every arg = N   
N = dump on timesteps which are a multiple of N   
N can be a variable (see below)   
every/time arg = Delta   
Delta = dump once every Delta interval of simulation time (time units) Delta can be a variable (see below)   
fileper $\mathrm{arg}=\mathrm{Np}$   
Np = write one file for every this many processors   
first $\mathrm{arg}=\mathrm{yes}$ or no   
flush $\mathrm{arg}=\mathrm{yes}$ or no   
format args = line string, int string, float string, ID string, or none string = C-style format string   
ID = integer from 1 to N, or integer from -1 to -N, where N = # of quantities being output or a custom dump keyword or reference to compute, fix, property or variable.   
header $\mathrm{arg}=\mathrm{yes}$ or no   
yes to write the header no to not write the header   
image arg = yes or no   
label arg = string   
string = character string (e.g., BONDS) to use in header of dump local file   
maxfiles $\mathrm{arg}=\mathrm{Fmax}$ $\mathrm{Fmax}=\mathrm{keep}$ only the most recent Fmax snapshots (one snapshot per file)   
nfile $\mathrm{arg}=\mathrm{Nf}$ Nf = write this many files, one from each of Nf processors pad $\mathrm{arg}=\mathrm{Nchar}=\#$ of characters to convert timestep to pbc $\mathrm{arg}=\mathrm{yes}$ or no $-$ remap atoms via periodic boundary conditions precision arg = power-of-10 value from 10 to 1000000 region arg = region-ID or "none" refresh arg = c_ID = compute ID that supports a refresh operation scale $\mathrm{arg}=\mathrm{yes}$ or no sfactor arg = coordinate scaling factor $\mathrm{\check{\Gamma}}>0.0\$ ) skip arg = v_name v_name = variable with name which evaluates to non-zero (skip) or 0 sort arg = off or id or N or -N off = no sorting of per-atom lines within a snapshot id = sort per-atom lines by atom ID N = sort per-atom lines in ascending order by the Nth column -N = sort per-atom lines in descending order by the Nth column tfactor arg = time scaling factor ( $>0.0$ ) thermo arg = yes or no thresh args $-$ attribute operator value attribute = same attributes (x,fy,etotal,sxx,etc) used by dump custom style operator = " $<$ " or " $<$ <=" or " $>$ " or " $>$ =" or "==" or "!=" or "|^" value $-$ numeric value to compare to, or LAST these 3 args can be replaced by the word "none" to turn off thresholding time $\mathrm{arg}=\mathrm{yes}$ or no triclinic/general $\mathrm{arg}=\mathrm{yes}$ or no types value $=$ numeric or labels units $\mathrm{arg}=\mathrm{yes}$ or no unwrap $\mathrm{arg}=\mathrm{yes}$ or no   
• these keywords apply only to the image and movie styles   
• keyword $=$ acolor or adiam or amap or backcolor or bcolor or bdiam or boxcolor or color or bitrate or framerate see the dump image doc page for details   
• these keywords apply only to the $/g z$ and /zstd dump styles   
• keyword $=$ compression_level compression_level args $=$ level level $=$ integer specifying the compression level that should be used (see below for supported levels)   
• these keywords apply only to the /zstd dump styles   
• keyword $=$ checksum checksum $\mathrm{args}=\mathrm{yes}$ or no (add checksum at end of zst file)   
• these keywords apply only to the vtk\* dump style   
• keyword $=$ binary binary $\mathrm{args}=\mathrm{yes}$ or no (select between binary and text mode VTK files)  

# 9.19.2 Examples  

dump_modify 1 format line $\mathfrak{N}\%\mathrm{d}\%\%20.15\mathrm{g}\%\mathrm{g}\%\mathrm{g}^{11}$ scale yes dump_modify 1 format float $\mathrm{\%20.15g}$ scale yes dump_modify myDump image yes scale no flush yes dump_modify 1 region mySphere thresh $\mathrm{~x~}<0.0$ thresh fx $>=3.2$  

(continues on next page)  

<html><body><table><tr><td></td><td>(continued from previouspage)</td></tr><tr><td>dump_1 modify 1 xtcdump precision 10000 sfactor 0.1</td><td></td></tr><tr><td>dump_ modify every 1000 nfile 20</td><td></td></tr><tr><td>dump_modify every v_myVar</td><td></td></tr></table></body></html>  

# 9.19.3 Description  

Modify the parameters of a previously defined dump command. Not all parameters are relevant to all dump styles.  

Unless otherwise noted, the following keywords apply to all the various dump styles, including the dump image and dump movie styles.  

The append keyword applies to all dump styles except cfg and xtc and dcd. It also applies only to text output files, not to binary or gzipped or image/movie files. If specified as yes, then dump snapshots are appended to the end of an existing dump file. If specified as no, then a new dump file will be created which will overwrite an existing file with the same name.  

The at keyword only applies to the netcdf dump style. It can only be used if the append yes keyword is also used. The $N$ argument is the index of which frame to append to. A negative value can be specified for $N$ , which means a frame counted from the end of the file. The at keyword can only be used if the dump_modify command is before the first command that causes dump snapshots to be output (e.g., a run or minimize command). Once the dump file has been opened, this keyword has no further effect.  

The buffer keyword applies only to dump styles atom, cfg, custom, local, and xyz. It also applies only to text output files, not to binary or gzipped files. If specified as yes, which is the default, then each processor writes its output into an internal text buffer, which is then sent to the processor(s) which perform file writes, and written by those processors(s) as one large chunk of text. If specified as no, each processor sends its per-atom data in binary format to the processor(s) which perform file wirtes, and those processor(s) format and write it line by line into the output file.  

The buffering mode is typically faster since each processor does the relatively expensive task of formatting the output for its own atoms. However it requires about twice the memory (per processor) for the extra buffering.  

Added in version 4May2022.  

The colname keyword can be used to change the default header keyword for dump styles: atom, custom, cfg, and local and their compressed, ADIOS variants. The setting for ID string replaces the default text with the provided string. $I D$ can be a positive integer when it represents the column number counting from the left, a negative integer when it represents the column number from the right (i.e. -1 is the last column/keyword), or a custom dump keyword (or compute, fix, property, or variable reference) and then it replaces the string for that specific keyword. For atom dump styles only the keywords “id”, “type”, “x”, “y”, “z”, “ix”, “iy”, “iz” can be accessed via string regardless of whether scaled or unwrapped coordinates were enabled or disabled, and it always assumes 8 columns for indexing regardless of whether image flags are enabled or not. For dump style cfg only changes to the “auxiliary” keywords (6th or later keyword) will become visible.  

The colname keyword can be used multiple times. If multiple colname settings refer to the same keyword, the last setting has precedence. A setting of default clears all previous settings, reverting all values to their default names. Using the scale or image keyword will also reset all header keywords to their default values.  

The delay keyword applies to all dump styles. No snapshots will be output until the specified Dstep timestep or later. Specifying $D s t e p<0$ is the same as turning off the delay setting. This is a way to turn off unwanted output early in a simulation, for example, during an equilibration phase.  

The element keyword applies only to the dump cfg, xyz, and image styles. It associates element names (e.g., H, C, Fe) with LAMMPS atom types. See the list of element names at the bottom of this page.  

In the case of dump cfg, this allows the AtomEye visualization package to read the dump file and render atoms with the appropriate size and color.  

In the case of dump image, the output images will follow the same AtomEye convention. An element name is specified for each atom type (1 to Ntype) in the simulation. The same element name can be given to multiple atom types.  

In the case of xyz format dumps, there are no restrictions to what label can be used as an element name. Any white-space separated text will be accepted.  

The every keyword can be used with any dump style except the dcd and xtc styles. It specifies that the output of dump snapshots will now be performed on timesteps which are a multiple of a new $N$ value, This overrides the dump frequency originally specified by the dump command.  

The every keyword can be specified in one of two ways. It can be a numeric value in which case it must be $>0$ . Or it can be an equal-style variable, which should be specified as v_name, where name is the variable name.  

In this case, the variable is evaluated at the beginning of a run to determine the next timestep at which a dump snapshot will be written out. On that timestep the variable will be evaluated again to determine the next timestep, etc. Thus the variable should return timestep values. See the stagger() and logfreq() and stride() math functions for equal-style variables, as examples of useful functions to use in this context. Other similar math functions could easily be added as options for equal-style variables. Also see the next() function, which allows use of a file-style variable which reads successive values from a file, each time the variable is evaluated. Used with the every keyword, if the file contains a list of ascending timesteps, you can output snapshots whenever you wish.  

Note that when using the variable option with the every keyword, you need to use the first option if you want an initial snapshot written to the dump file. The every keyword cannot be used with the dump dcd style.  

For example, the following commands will write snapshots at timesteps 0,10,20,30,100,200,300,1000,2000,etc:  

<html><body><table><tr><td>variable</td><td>equal logfreq(10,3,10)</td></tr><tr><td>dump</td><td>1 all 1 atom 100 tmp.dump</td></tr><tr><td>dump modify</td><td>every v_s first yes</td></tr></table></body></html>  

The following commands would write snapshots at the timesteps listed in file tmp.times:  

<html><body><table><tr><td>variable</td><td>f file tmp.times</td></tr><tr><td>variable</td><td>S equal next(f)</td></tr><tr><td>dump</td><td>1 all atom 100 tmp.dump</td></tr><tr><td>dump_modify</td><td>1 every v_s</td></tr></table></body></html>  

# Note  

When using a file-style variable with the every keyword, the file of timesteps must list a first timestep that is beyond the current timestep (e.g., it cannot be 0). And it must list one or more timesteps beyond the length of the run you perform. This is because the dump command will generate an error if the next timestep it reads from the file is not a value greater than the current timestep. Thus if you wanted output on steps 0,15,100 of a 100-timestep run, the file should contain the values 15,100,101 and you should also use the dump_modify first command. Any final value $>$ 100 could be used in place of 101.  

Added in version 7Jan2022.  

The every/time keyword can be used with any dump style except the dcd and xtc styles. It changes the frequency of dump snapshots from being based on the current timestep to being determined by elapsed simulation time, i.e. in time units of the units command, and specifies Delta for the interval between snapshots. This can be useful when the timestep size varies during a simulation run, e.g. by use of the fix dt/reset command. The default is to perform output on timesteps which a multiples of specified timestep value $N$ ; see the every keyword.  

The every/time keyword can be used with any dump style except the dcd and xtc styles. It does two things. It specifies that the interval between dump snapshots will be set in simulation time (i.e. in time units of the units command). This can be useful when the timestep size varies during a simulation run (e.g., by use of the fix dt/reset command). The default is to specify the interval in timesteps; see the every keyword. The every/time command also sets the interval value.  

![](images/2bd4543a9003fd5203439e345e25d0917b8a71c964e05b62de5b3d6e9d6b69fd.jpg)  

# Note  

If you wish dump styles atom, custom, local, or xyz to include the simulation time as a field in the header portion of each snapshot, you also need to use the dump_modify time keyword with a setting of yes. See its documentation below.  

Note that since snapshots are output on simulation steps, each snapshot will be written on the first timestep whose associated simulation time is $>=$ the exact snapshot time value.  

As with the every option, the Delta value can be specified in one of two ways. It can be a numeric value in which case it must be $>0.0$ . Or it can be an equal-style variable, which should be specified as v_name, where name is the variable name.  

In this case, the variable is evaluated at the beginning of a run to determine the next simulation time at which a dump snapshot will be written out. On that timestep the variable will be evaluated again to determine the next simulation time, etc. Thus the variable should return values in time units. Note the current timestep or simulation time can be used in an equal-style variables since they are both thermodynamic keywords. Also see the next() function, which allows use of a file-style variable which reads successive values from a file, each time the variable is evaluated. Used with the every/time keyword, if the file contains a list of ascending simulation times, you can output snapshots whenever you wish.  

Note that when using the variable option with the every/time keyword, you need to use the first option if you want an initial snapshot written to the dump file. The every/time keyword cannot be used with the dump dcd style.  

For example, the following commands will write snapshots at successive simulation times which grow by a factor of 1.5 with each interval. The dt value used in the variable is to avoid a zero result when the initial simulation time is 0.0.  

<html><body><table><tr><td>variable</td><td>increase equal 1.5*(time+dt)</td></tr><tr><td>dump</td><td>1 all 1 atom 100 tmp.dump</td></tr><tr><td>dump modify</td><td>every time v_increase first yes</td></tr></table></body></html>  

The following commands would write snapshots at the times listed in file tmp.times:  

variable f file tmp.times variable s equal next(f) dump 1 all atom 100 tmp.dump dump_modify 1 every/time v_s  

# Note  

When using a file-style variable with the every/time keyword, the file of timesteps must list a first time that is beyond the time associated with the current timestep (e.g., it cannot be 0.0). And it must list one or more times beyond the length of the run you perform. This is because the dump command will generate an error if the next time it reads from the file is not a value greater than the current time. Thus if you wanted output at times 0,15,100 of a run of length 100 in simulation time, the file should contain the values 15,100,101 and you should also use the dump_modify first command. Any final value $>100$ could be used in place of 101.  

The first keyword determines whether a dump snapshot is written on the very first timestep after the dump command is invoked. This will always occur if the current timestep is a multiple of $\$103$ , the frequency specified in the dump command or dump_modify every command, including timestep 0. It will also always occur if the current simulation time is a multiple of Delta, the time interval specified in the dump_modify every/time command.  

But if this is not the case, a dump snapshot will only be written if the setting of this keyword is yes. If it is no, which is the default, then it will not be written.  

Note that if the argument to the dump_modify every dump_modify every/time commands is a variable and not a numeric value, then specifying first yes is the only way to write a dump snapshot on the first timestep after the dump command is invoked.  

The flush keyword determines whether a flush operation is invoked after a dump snapshot is written to the dump file. A flush ensures the output in that file is current (no buffering by the OS), even if LAMMPS halts before the simulation completes. Flushes cannot be performed with dump style xtc.  

The format keyword can be used to change the default numeric format output by the text-based dump styles: atom, local, custom, $c f g$ , and xyz styles. Only the line or none options can be used with the atom and xyz styles.  

All the specified format strings are C-style formats, such as used by the $\mathrm{C}/\mathrm{C}{+}+$ printf() command. The line keyword takes a single argument which is the format string for an entire line of output for each atom (do not include a trailing “n”), with $N$ fields, which you must enclose in quotes if there is more than one field. The int and float keywords take a single format argument and are applied to all integer or floating-point quantities output. The setting for M string also takes a single format argument which is used for the Mth value output in each line (e.g., the fifth column is output in high precision by “format $5~\%20.15\mathrm{g}^{3})$ .  

![](images/7aac4bb5ffa9aa0d6100ad66272df0dd5d8b961e66650bd58e29ee1a751afccf.jpg)  

# Note  

When using the line keyword for the cfg style, the first two fields (atom ID and type) are not actually written into the CFG file, however you must include formats for them in the format string.  

The format keyword can be used multiple times. The precedence is that for each value in a line of output, the $M$ format (if specified) is used, else the int or float setting (if specified) is used, else the line setting (if specified) for that value is used, else the default setting is used. A setting of none clears all previous settings, reverting all values to their default format.  

# Note  

Atom and molecule IDs are stored internally as 4-byte or 8-byte signed integers, depending on how LAMMPS was compiled. When specifying the format int option you can use a “%d”-style format identifier in the format string and LAMMPS will convert this to the corresponding 8-byte form if it is needed when outputting those values. However, when specifying the line option or format M string option for those values, you should specify a format string appropriate for an 8-byte signed integer (e.g., one with “%ld”) if LAMMPS was compiled with the -DLAMMPS_BIGBIG option for 8-byte IDs.  

![](images/d4437baba42521687fe4dd27d84f346d14523333f9a4ab9282b086eef2207153.jpg)  

# Note  

Any value written to a text-based dump file that is a per-atom quantity calculated by a compute or $f\boldsymbol{{x}}$ is stored internally as a floating-point value. If the value is actually an integer and you wish it to appear in the text dump file as a (large) integer, then you need to use an appropriate format. For example, these commands:  

compute 1 all property/local batom1 batom2 dump 1 all local 100 tmp.bonds index c_1[1] c_1[2] dump_modify 1 format line "%d %0.0f %0.0f"  

will output the two atom IDs for atoms in each bond as integers. If the dump_modify command were omitted, they would appear as floating-point values, assuming they were large integers (more than six digits). The “index” keyword should use the $\mathrm{^{66}\mathrm{\nabla\mathrm{}}\mathrm{\nabla\mathrm{}}}$ format since it is not generated by a compute or fix, and is stored internally as an integer.  

The fileper keyword is documented below with the nfile keyword.  

The header keyword toggles whether the dump file will include a header. Excluding a header will reduce the size of the dump file for data produced by pair tracker or bpm bond styles which may not require the information typically written to the header.  

The image keyword applies only to the dump atom style. If the image value is yes, three flags are appended to each atom’s coords which are the absolute box image of the atom in each dimension. For example, an $x$ image flag of $^{-2}$ with a normalized coord of 0.5 means the atom is in the center of the box, but has passed through the box boundary twice and is really two box lengths to the left of its current coordinate. Note that for dump style custom these various values can be printed in the dump file by using the appropriate atom attributes in the dump command itself. Using this keyword will reset all custom header names set with dump_modify colname to their respective default values.  

The label keyword applies only to the dump local style. When it writes local information, such as bond or angle topology to a dump file, it will use the specified label to format the header. By default this includes two lines:  

ITEM: NUMBER OF ENTRIES ITEM: ENTRIES ...  

The word “ENTRIES” will be replaced with the string specified (e.g., BONDS or ANGLES).  

The maxfiles keyword can only be used when a ‘\*’ wildcard is included in the dump file name (i.e., when writing a new file(s) for each snapshot). The specified Fmax is how many snapshots will be kept. Once this number is reached, the file(s) containing the oldest snapshot is deleted before a new dump file is written. If the specified Fmax $\leq0$ , then all files are retained.  

This can be useful for debugging, especially if you do not know on what timestep something bad will happen (e.g., when LAMMPS will exit with an error). You can dump every time step and limit the number of dump files produced, even if you run for thousands of steps.  

The nfile or fileper keywords can be used in conjunction with the $\mathbf{\hat{\mu}}^{\epsilon}\mathbf{C}\mathbf{\eta}_{0}^{\eta}$ wildcard character in the specified dump file name, for all dump styles except the dcd, image, movie, xtc, and xyz styles (for which $^{\leftarrow6}\%^{,5}$ is not allowed). As explained on the dump command doc page, the $^{66}\%$ ” character causes the dump file to be written in pieces, one piece for each of $P$ processors. By default, $P$ is the number of processors the simulation is running on. The nfile or fileper keyword can be used to set $P$ to a smaller value, which can be more efficient when running on a large number of processors.  

The nfile keyword sets $P$ to the specified $N_{f}$ value. For example, if $N_{f}=4$ , and the simulation is running on 100 processors, four files will be written by processors 0, 25, 50, and 75. Each will collect information from itself and the next 24 processors and write it to a dump file.  

For the fileper keyword, the specified value of $N_{p}$ means write one file for every $N_{p}$ processors. For example, if $N_{p}=4$ , every fourth processor (0, 4, 8, 12, etc.) will collect information from itself and the next three processors and write it to a dump file.  

The pad keyword only applies when the dump filename is specified with a wildcard “\*” character which becomes the timestep. If pad is 0, which is the default, the timestep is converted into a string of unpadded length (e.g., 100 or 12000 or 2000000). When pad is specified with Nchar $>0$ , the string is padded with leading zeroes so they are all the same length $=N c h a r$ . For example, pad 7 would yield 0000100, 0012000, 2000000. This can be useful so that post-processing programs can easily read the files in ascending timestep order.  

The pbc keyword applies to all the dump styles. As explained on the dump doc page, atom coordinates in a dump file may be slightly outside the simulation box. This is because periodic boundary conditions are enforced only on timesteps when neighbor lists are rebuilt, which will not typically coincide with the timesteps dump snapshots are written. If the setting of this keyword is set to yes, then all atoms will be remapped to the periodic box before the snapshot is written, then restored to their original position. If it is set to no they will not be. The no setting is the default because it requires no extra computation.  

The precision keyword only applies to the dump xtc style. A specified value of $N$ means that coordinates are stored to $1/N$ nanometer accuracy (e.g., for $N=1000$ , the coordinates are written to $1/1000$ nanometer accuracy).  

The refresh keyword only applies to the dump custom, cfg, image, and movie styles. It allows an “incremental” dump file to be written, by refreshing a compute that is used as a threshold for determining which atoms are included in a dump snapshot. The specified $c_{-}I D$ gives the ID of the compute. It is prefixed by $\mathrm{~\"~c~}_{-}\mathrm{~,~}$ to indicate a compute, which is the only current option. At some point, other options may be added (e.g., fixes or variables).  

![](images/4a0c800e44e7860a23824939bfac7e79f3aa8b48cff8b3e7e729297f5d5a3fe2.jpg)  

# Note  

This keyword can only be specified once for a dump. Refreshes of multiple computes cannot yet be performed.  

The definition and motivation of an incremental dump file is as follows. Instead of outputting all atoms at each snapshot (with some associated values), you may only wish to output the subset of atoms with a value that has changed in some way compared to the value the last time that atom was output. In some scenarios this can result in a dramatically smaller dump file. If desired, by post-processing the sequence of snapshots, the values for all atoms at all timesteps can be inferred.  

A concrete example is a simulation of atom diffusion in a solid, represented as atoms on a lattice. Diffusive hops are rare. Imagine that when a hop occurs an atom moves more than a distance Dhop. For any snapshot we only want to output atoms that have hopped since the last snapshot. This can be accomplished with something the following commands:  

<html><body><table><tr><td>variable</td><td>Dhop e equal 0.6</td></tr><tr><td>variable</td><td>check atom "c_ dsp[4] >V Dhop'</td></tr><tr><td>compute</td><td>dsp all displace atom refresh check</td></tr><tr><td>dump</td><td>1 all custom 20 t tmp.dump id type x y Z</td></tr><tr><td>dump. modify</td><td>1 append I yes thresh c_( dsp[4] ${Dhop} refresh c_( dsp</td></tr></table></body></html>  

The compute displace/atom command calculates the displacement of each atom from its reference position. The “4” index is the scalar displacement; 1, 2, and 3 are the xyz components of the displacement. The dump_modify thresh command will cause only atoms that have displaced more than $\mathrm{~\bar{~}0.6\AA~}$ to be output on a given snapshot (assuming metal units). However, note that when an atom is output, we also need to update the reference position for that atom to its new coordinates. So that it will not be output in every snapshot thereafter. That reference position is stored by compute displace/atom. So the dump_modify refresh option triggers a call to compute displace/atom at the end of every dump to perform that update. The refresh check option shown as part of the compute displace/atom command enables the compute to respond to the call from the dump command, and update the appropriate reference positions. This is done be defining an atom-style variable, check in this example, which calculates a Boolean value (0 or 1) for each atom, based on the same criterion used by dump_modify thresh.  

See the compute displace/atom command for more details, including an example of how to produce output that includes an initial snapshot with the reference position of all atoms.  

Note that only computes with a refresh option will work with dump_modify refresh. See individual compute doc pages for details. Currently, only compute displace/atom supports this option. Others may be added at some point. If you use a compute that does not support refresh operations, LAMMPS will not complain; dump_modify refresh will simply do nothing.  

The region keyword only applies to the dump custom, cfg, image, and movie styles. If specified, only atoms in the region will be written to the dump file or included in the image/movie. Only one region can be applied as a filter (the last one specified). See the region command for more details. Note that a region can be defined as the “inside” or “outside” of a geometric shape, and it can be the “union” or “intersection” of a series of simpler regions.  

The scale keyword applies only to the dump atom style. A scale value of yes means atom coords are written in normalized units from 0.0 to 1.0 in each box dimension. If the simulation box is triclinic (tilted), then all atom coords will still be between 0.0 and 1.0. A value of no means they are written in absolute distance units (e.g., $\textrm{\AA}$ or $\sigma$ ). Using this keyword will reset all custom header names set with dump_modify colname to their respective default values.  

The sfactor and tfactor keywords only apply to the dump xtc style. They allow customization of the unit conversion factors used when writing to XTC files. By default, they are initialized for whatever units style is being used, to write out coordinates in nanometers and time in picoseconds. For example, for real units, LAMMPS defines sfactor $=0.1$ and tfactor $=0.001$ , since the $\textrm{\AA}$ and fs used by real units are $0.1\mathrm{nm}$ and 0.001 ps, respectively. If you are using a units system with distance and time units far from nm and ps, you may wish to write XTC files with different units, since the compression algorithm used in XTC files is most effective when the typical magnitude of position data is between 10.0 and 0.1.  

Added in version 15Sep2022.  

The skip keyword can be used with all dump styles. It allows a dump snapshot to be skipped (not written to the dump file), if a condition is met. The condition is computed by an equal-style variable, which should be specified as v_name, where name is the variable name. If the variable evaluation returns a non-zero value, then the dump snapshot is skipped. If it returns zero, the dump proceeds as usual. Note that equal-style variable can contain Boolean operators which effectively evaluate as a true (non-zero) or false (zero) result.  

The skip keyword can be useful for debugging purposes, e.g. to dump only on a particular timestep. Or to limit output to conditions of interest, e.g. only when the force on some atom exceeds a threshold value.  

The sort keyword determines whether lines of per-atom output in a snapshot are sorted or not. A sort value of off means they will typically be written in indeterminate order, either in serial or parallel. This is the case even in serial if the atom_modify sort option is turned on, which it is by default, to improve performance. A sort value of id means sort the output by atom ID. A sort value of $N$ or $-N$ means sort the output by the value in the Nth column of per-atom info in either ascending or descending order.  

The dump local style cannot be sorted by atom ID, since there are typically multiple lines of output per atom. Some dump styles, such as dcd and $x t c$ , require sorting by atom ID to format the output file correctly. If multiple processors are writing the dump file, via the $^{66}\%^{!}$ ” wildcard in the dump filename and the nfile or fileper keywords are set to non-default values (i.e., the number of dump file pieces is not equal to the number of procs), then sorting cannot be performed.  

In a parallel run, the per-processor dump file pieces can have significant imbalance in number of lines of per-atom info. The balance keyword determines whether the number of lines in each processor snapshot are balanced to be nearly the same. A balance value of no means no balancing will be done, while yes means balancing will be performed. This balancing preserves dump sorting order. For a serial run, this option is ignored since the output is already balanced.  

#  Note  

Unless it is required by the dump style, sorting dump file output requires extra overhead in terms of CPU and communication cost, as well as memory, versus unsorted output.  

The thermo keyword only applies the dump styles netcdf and yaml. It triggers writing of thermo information to the dump file alongside per-atom data. The values included in the dump file are cached values from the last thermo output and include the exact same the values as specified by the thermo_style command. Because these are cached values, they are only up-to-date when dump output is on a timestep that also has thermo output. Dump style yaml will skip thermo output on incompatible steps.  

The thresh keyword only applies to the dump custom, cfg, image, and movie styles. Multiple thresholds can be specified. Specifying none turns off all threshold criteria. If thresholds are specified, only atoms whose attributes meet all the threshold criteria are written to the dump file or included in the image. The possible attributes that can be tested for are the same as those that can be specified in the dump custom command, with the exception of the element attribute, since it is not a numeric value. Note that a different attributes can be used than those output by the dump custom command. For example, you can output the coordinates and stress of atoms whose energy is above some threshold.  

If an atom-style variable is used as the attribute, then it can produce continuous numeric values or effective Boolean 0/1 values, which may be useful for the comparison operator. Boolean values can be generated by variable formulas that use comparison or Boolean math operators or special functions like gmask() and rmask() and grmask(). See the variable command page for details.  

The specified value must be a simple numeric value or the word LAST. If LAST is used, it refers to the value of the attribute the last time the dump command was invoked to produce a snapshot. This is a way to only dump atoms whose attribute has changed (or not changed). Three examples follow.  

dump_modify ... thresh ix != LAST  

This will dump atoms which have crossed the periodic $x$ boundary of the simulation box since the last dump. (Note that atoms that crossed once and then crossed back between the two dump timesteps would not be included.)  

region foo sphere 10 20 10 15 variable inregion atom rmask(foo) dump_modify ... thresh v_inregion |^ LAST  

This will dump atoms which crossed the boundary of the spherical region since the last dump.  

<html><body><table><tr><td>variable charge atom "(q > 0.5) Il (q < -0.5)' dump_1 modify y ... thresh v_charge LAST</td><td></td></tr></table></body></html>  

This will dump atoms whose charge has changed from an absolute value less than $\frac12$ to greater than $\frac12$ (or vice versa) since the last dump (e.g., due to reactions and subsequent charge equilibration in a reactive force field).  

The choice of operators listed above are the usual comparison operators. The XOR operation (exclusive or) is also included as $\mathbf{\tilde{\rho}}^{\scriptscriptstyle6\scriptscriptstyle6}|\Lambda^{\prime\rangle}$ . In this context, XOR means that if either the attribute or value is 0.0 and the other is non-zero, then the result is “true” and the threshold criterion is met. Otherwise it is not met.  

# $\Theta$ Note  

For style custom, the triclinic/general keyword can alter dump output for general triclinic simulation boxes and their atoms. See the dump command for details of how this changes the format of dump file snapshots. The thresh keyword may access per-atom attributes either directly or indirectly through a compute or variable. If the attribute is an atom coordinate or a per-atom vector (such as velocity, force, or dipole moment), its value will NOT be a general triclinic (rotated) value. Rather it will be a restricted triclinic value.  

The time keyword only applies to the dump atom, custom, local, and xyz styles (and their COMPRESS package versions atom/gz, custom/gz and local/gz). For the first three styles, if set to yes, each frame will will contain two extra lines before the “ITEM: TIMESTEP” entry:  

ITEM: TIME <elapsed time>  

For the xyz style, the simulation time is included on the same line as the timestep value.  

This will output the current elapsed simulation time in current time units equivalent to the thermo keyword time. This is to simplify post-processing of trajectories using a variable time step (e.g., when using fix dt/reset). The default setting is no.  

The types keyword applies only to the dump xyz style. If this keyword is used with a value of numeric, then numeric atom types are printed in the xyz file (default). If the value labels is specified, then type labels are printed for atom types.  

The triclinic/general keyword only applies to the dump atom and custom styles. It can only be used with a value of yes if the simulation box was created as a general triclinic box. See the Howto_triclinic doc page for a detailed explanation of orthogonal, restricted triclinic, and general triclinic simulation boxes.  

If this keyword is used with a value of yes, the box information at the beginning of each snapshot will include information about the 3 arbitrary edge vectors A, B, C that define the general triclinic box as well as their origin. The format is described on the dump doc page.  

The coordinates of each atom will likewise be output as values in (or near) the general triclinic box. Likewise, per-atom vector quantities such as velocity, omega, dipole moment, etc will have orientations consistent with the general triclinic box, meaning they will be rotated relative to the standard xyz coordinate axes. See the dump doc page for a full list of which dump attributes this affects.  

The units keyword only applies to the dump atom, custom, and local styles (and their COMPRESS package versions atom/gz, custom/gz and local/gz). If set to yes, each individual dump file will contain two extra lines at the very beginning with:  

ITEM: UNITS <units style>  

This will output the current selected units style to the dump file and thus allows visualization and post-processing tools to determine the choice of units of the data in the dump file. The default setting is no.  

The unwrap keyword only applies to the dump dcd and xtc styles. If set to yes, coordinates will be written “unwrapped” by the image flags for each atom. Unwrapped means that if the atom has passed through a periodic boundary one or more times, the value is printed for what the coordinate would be if it had not been wrapped back into the periodic box. Note that these coordinates may thus be far outside the box size stored with the snapshot.  

The COMPRESS package offers both GZ and Zstd compression variants of styles atom, custom, local, cfg, and xyz. When using these styles the compression level can be controlled by the compression_level keyword. File names with these styles have to end in either .gz or .zst.  

GZ supports compression levels from $^{-1}$ (default), 0 (no compression), and 1 to 9, 9 being the best compression. The COMPRESS /gz styles use 9 as default compression level.  

Zstd offers a wider range of compression levels, including negative levels that sacrifice compression for performance. 0 is the default, positive levels are 1 to 22, with 22 being the most expensive compression. Zstd promises higher compression/decompression speeds for similar compression ratios. For more details see https://facebook.github.io/zstd/.  

In addition, Zstd compressed files can include a checksum of the entire contents. The Zstd enabled dump styles enable this feature by default and it can be disabled with the checksum keyword.  

The VTK package offers writing dump files in VTK file formats that can be read by a variety of visualization tools based on the VTK library. These VTK files follow naming conventions that collide with the LAMMPS convention to append “.bin” to a file name in order to switch to a binary output. Thus for vtk style dumps the dump_modify command supports the keyword binary which selects between generating text mode and binary style VTK files.  

# 9.19.4 Restrictions  

Not all dump_modify options can be applied to all dump styles. Details are in the discussions of the individual options.  

# 9.19.5 Related commands  

dump, dump image, undump  

# 9.19.6 Default  

The option defaults are  

• append $=$ no   
• balance $=$ no   
• buffer $=$ yes for dump styles atom, custom, loca, and xyz   
• element $\begin{array}{r}{{\bf\Omega}={}^{\leftrightarrow}{\bf C}^{\leftrightarrow}}\end{array}$ for every atom type   
• every $=$ whatever it was set to via the dump command   
• fileper $=\#$ of processors   
• first $\mathbf{\mu}=\mathbf{n}\mathbf{O}$   
• flush $=$ yes   
• format $=\mathrm{^{q}/c d}$ and $\%{\bf g}$ for each integer or floating point value   
• image $=$ no   
• label $=$ ENTRIES   
• maxfiles $=-1$   
• nfile $=1$   
• pad = 0   
• pbc = no   
• precision $=1000$   
• region $=$ none   
• scale $=$ yes   
• sort $=$ off for dump styles atom, custom, cfg, and local   
• $\mathrm{sort}=\mathrm{id}$ for dump styles dcd, xtc, and xyz   
• thresh $=$ none   
• time $=$ no   
• triclinic/general $=$ no   
• types $=$ numeric   
• units $=$ no   
• unwrap $=$ no   
• compression_level $=9$ (gz variants)   
• compression_level $=0$ (zstd variants)   
• checksum $=$ yes (zstd variants)  

# 9.20 dump molfile command  

# 9.20.1 Syntax  

dump ID group-ID molfile N file format path  

• $\mathrm{ID}=$ user-assigned name for the dump   
• group- $\mathrm{{\cdot}I D=I D}$ of the group of atoms to be imaged   
• molfile $=$ style of dump command (other styles atom or cfg or dcd or xtc or xyz or local or custom are discussed on the dump doc page)   
• $\Nu=$ dump every this many timesteps   
• file $=$ name of file to write to   
• format $=$ file format to be used   
• path $=$ file path with plugins (optional)  

# 9.20.2 Examples  

dump mf1 all molfile 10 melt1.xml hoomd  
dump mf2 all molfile 10 melt2-\*.pdb pdb .  
dump mf3 all molfile 50 melt3.xyz xyz .:/home/akohlmey/vmd/plugins/LINUX/molfile  

# 9.20.3 Description  

Dump a snapshot of atom coordinates and selected additional quantities to one or more files every N timesteps in one of several formats. Only information for atoms in the specified group is dumped. This specific dump style uses molfile plugins that are bundled with the VMD molecular visualization and analysis program.  

Unless the filename contains a \* character, the output will be written to one single file with the specified format. Otherwise there will be one file per snapshot and the \* will be replaced by the time step number when the snapshot is written.  

![](images/6a741a04d9f96683c882cf5d9c48e0a20febc22c578c998fe1725e078e4f5f44.jpg)  

# Note  

Because periodic boundary conditions are enforced only on timesteps when neighbor lists are rebuilt, the coordinates of an atom written to a dump file may be slightly outside the simulation box.  

The molfile plugin API has a few restrictions that have to be honored by this dump style: the number of atoms must not change, the atoms must be sorted, outside of the coordinates no change in atom properties (like type, mass, charge) will be recorded.  

The format keyword determines what format is used to write out the dump. For this to work, LAMMPS must be able to find and load a compatible molfile plugin that supports this format. Settings made via the dump_modify command can alter per atom properties like element names.  

The path keyword determines which in directories. This is a “path” like other search paths, i.e. it can contain multiple directories separated by a colon (or semicolon on Windows). This keyword is optional and default to “.”, the current directory.  

The unwrap option of the dump_modify command allows coordinates to be written “unwrapped” by the image flags for each atom. Unwrapped means that if the atom has passed through a periodic boundary one or more times, the value is printed for what the coordinate would be if it had not been wrapped back into the periodic box. Note that these coordinates may thus be far outside the box size stored with the snapshot.  

Dumps are performed on timesteps that are a multiple of N (including timestep 0) and on the last timestep of a minimization if the minimization converges. Note that this means a dump will not be performed on the initial timestep after the dump command is invoked, if the current timestep is not a multiple of N. This behavior can be changed via the dump_modify first command, which can be useful if the dump command is invoked after a minimization ended on an arbitrary timestep. N can be changed between runs by using the dump_modify every command. The dump_modify every command also allows a variable to be used to determine the sequence of timesteps on which dump files are written.  

# 9.20.4 Restrictions  

The molfile dump style is part of the MOLFILE package. It is only enabled if LAMMPS was built with that package.   
See the Build package page for more info.  

Molfile plugins provide a consistent programming interface to read and write file formats commonly used in molecular simulations. The MOLFILE package only provides the interface code, not the plugins. These can be obtained from a VMD installation which has to match the platform that you are using to compile LAMMPS for. By adding plugins to VMD, support for new file formats can be added to LAMMPS (or VMD or other programs that use them) without having to re-compile the application itself. The plugins are installed in the directory: <VMDHOME $\mathbf{\mathcal{S}}$ /plugins/<VMDARCH>/molfile  

#  Note  

while the programming interface (API) to the plugins is backward compatible, the binary interface (ABI) has been changing over time, so it is necessary to compile this package with the plugin header files from VMD that match the binary plugins. These header files in the directory: <VMDHOME $\mathbf{\mathcal{S}}$ /plugins/include For convenience, the package ships with a set of header files that are compatible with VMD 1.9 and 1.9.1 (June 2012)  

# 9.20.5 Related commands  

dump, dump_modify, undump  

# 9.20.6 Default  

The default path is “.”. All other properties have to be specified.  

# 9.21 dump netcdf command  

# 9.22 dump netcdf/mpiio command  

# 9.22.1 Syntax  

dump ID group-ID netcdf N file args dump ID group-ID netcdf/mpiio N file args  

• $\mathrm{ID}=$ user-assigned name for the dump   
• group- $\cdot\mathrm{ID}=\mathrm{ID}$ of the group of atoms to be imaged   
• netcdf or netcdf/mpiio $=$ style of dump command (other styles atom or cfg or dcd or xtc or xyz or local or custom are discussed on the dump doc page)   
• $\Nu=$ dump every this many timesteps  

• file $=$ name of file to write dump info to • args $=$ list of atom attributes, same as for dump_style custom  

# 9.22.2 Examples  

dump 1 all netcdf 100 traj.nc type x y z vx vy vz dump_modify 1 append yes at -1 thermo yes dump 1 all netcdf/mpiio 1000 traj.nc id type x y z dump 1 all netcdf 1000 traj.\*.nc id type x y z  

# 9.22.3 Description  

Dump a snapshot of atom coordinates every N timesteps in Amber-style NetCDF file format. NetCDF files are binary, portable and self-describing. This dump style will write only one file on the root node. The dump style netcdf uses the standard NetCDF library. All data is collected on one processor and then written to the dump file. Dump style netcdf/mpiio uses the parallel NetCDF library and MPI-IO to write to the dump file in parallel; it has better performance on a larger number of processors. Note that style netcdf outputs all atoms sorted by atom tag while style netcdf/mpiio outputs atoms in order of their MPI rank.  

NetCDF files can be directly visualized via the following tools:  

• Ovito (https://www.ovito.org/). Ovito supports the AMBER convention and all extensions of this dump style.   
• VMD (https://www.ks.uiuc.edu/Research/vmd/).  

In addition to per-atom data, thermo data can be included in the dump file. The data included in the dump file is identical to the data specified by thermo_style.  

# 9.22.4 Restrictions  

The netcdf and netcdf/mpiio dump styles are part of the NETCDF package. They are only enabled if LAMMPS was built with that package. See the Build package page for more info.  

The netcdf and netcdf/mpiio dump styles currently cannot dump string properties or properties from variables.  

# 9.22.5 Related commands  

dump, dump_modify, undump  

# 9.23 dump vtk command  

# 9.23.1 Syntax  

dump ID group-ID vtk N file args  

• $\mathrm{ID}=$ user-assigned name for the dump   
• group- $\cdot\mathrm{ID}=\mathrm{ID}$ of the group of atoms to be dumped   
• vtk $=$ style of dump command (other styles such as atom or cfg or dcd or xtc or xyz or local or custom are discussed on the dump doc page)   
• $\Nu=$ dump every this many timesteps  

# 9.23. dump vtk command  

• file $=$ name of file to write dump info to • args $=$ same as arguments for dump_style custom  

# 9.23.2 Examples  

dump dmpvtk all vtk 100 dump\*.myforce.vtk id type vx fx dump dmpvtp flow vtk 100 dump\*. $\%$ .displace.vtp id type c_myD[1] c_myD[2] c_myD[3] v_ke  

# 9.23.3 Description  

Dump a snapshot of atom quantities to one or more files every $N$ timesteps in a format readable by the VTK visualization toolkit or other visualization tools that use it, such as ParaView. The time steps on which dump output is written can also be controlled by a variable; see the dump_modify every command for details.  

This dump style is similar to dump_style custom but uses the VTK library to write data to VTK simple legacy or XML format, depending on the filename extension specified for the dump file. This can be either \*.vtk for the legacy format or \*.vtp and \*.vtu, respectively, for XML format; see the VTK homepage for a detailed description of these formats. Since this naming convention conflicts with the way binary output is usually specified (see below), the dump_modify binary command allows setting of a binary option for this dump style explicitly.  

Only information for atoms in the specified group is dumped. The dump_modify thresh and region commands can also alter what atoms are included; see details below.  

As described below, special characters $(^{5}{\mathrm{::}}^{,}{\mathrm{:}}^{,}{\mathrm{:}}^{,}{\mathrm{:}}^{,}{\mathrm{:}}^{,}{\mathrm{:}}$ in the filename determine the kind of output.  

![](images/6ae4b49a3039aa07e806407091775cbb67d7c2a47079b62da103b68282883fc9.jpg)  

# Warning  

Because periodic boundary conditions are enforced only on timesteps when neighbor lists are rebuilt, the coordinates of an atom written to a dump file may be slightly outside the simulation box.  

![](images/f2d095d0699c92d01ba32e4c2b5d793a0a84eadeda86e91354c031ad8544fd36.jpg)  

# Warning  

Unless the dump_modify sort option is invoked, the lines of atom information written to dump files will be in an indeterminate order for each snapshot. This is even true when running on a single processor, if the atom_modify sort option is on, which it is by default. In this case atoms are re-ordered periodically during a simulation, due to spatial sorting. It is also true when running in parallel, because data for a single snapshot is collected from multiple processors, each of which owns a subset of the atoms.  

For the vtk style, sorting is off by default. See the dump_modify page for details.  

The dimensions of the simulation box are written to a separate file for each snapshot (either in legacy VTK or XML format depending on the format of the main dump file) with the suffix _boundingBox appended to the given dump filename.  

For an orthogonal simulation box this information is saved as a rectilinear grid (legacy .vtk or .vtr XML format).  

Triclinic simulation boxes (non-orthogonal) are saved as hexahedrons in either legacy .vtk or .vtu XML format.  

Style vtk allows you to specify a list of atom attributes to be written to the dump file for each atom. The list of possible attributes is the same as for the dump_style custom command; see its documentation page for a listing and an explanation of each attribute.  

![](images/a05b1dc0b0e478ee17f0d5e09d9d5a243da9fa64517173dae42ef73d77457f44.jpg)  

# Note  

Since position data is required to write VTK files the atom attributes “x y z” do not have to be specified explicitly; they will be included in the dump file regardless. Also, in contrast to the custom style, the specified $\nu t k$ attributes are rearranged to ensure correct ordering of vector components (except for computes and fixes - these have to be given in the right order) and duplicate entries are removed.  

The VTK format uses a single snapshot of the system per file, thus a wildcard “\*” must be included in the filename, as discussed below. Otherwise the dump files will get overwritten with the new snapshot each time.  

Dumps are performed on timesteps that are a multiple of $\mathbf{N}$ (including timestep 0) and on the last timestep of a minimization if the minimization converges. Note that this means a dump will not be performed on the initial timestep after the dump command is invoked, if the current timestep is not a multiple of N. This behavior can be changed via the dump_modify first command, which can also be useful if the dump command is invoked after a minimization ended on an arbitrary timestep. N can be changed between runs by using the dump_modify every command. The dump_modify every command also allows a variable to be used to determine the sequence of timesteps on which dump files are written. In this mode a dump on the first timestep of a run will also not be written unless the dump_modify first command is used.  

Dump filenames can contain two wildcard characters. If a “\*” character appears in the filename, then one file per snapshot is written and the “\*” character is replaced with the timestep value. For example, tmp.dump\*.vtk becomes tmp.dump0.vtk, tmp.dump10000.vtk, tmp.dump20000.vtk, etc. Note that the dump_modify pad command can be used to ensure all timestep numbers are the same length (e.g. 00010), which can make it easier to read a series of dump files in order with some post-processing tools.  

If a $^{66}\%^{!}$ ” character appears in the filename, then each of P processors writes a portion of the dump file, and the “%” character is replaced with the processor ID from 0 to P-1 preceded by an underscore character. For example, tmp.dump%.vtp becomes tmp.dump_0.vtp, tmp.dump_1.vtp, . . . tmp.dump_P-1.vtp, etc. This creates smaller files and can be a fast mode of output on parallel machines that support parallel I/O for output.  

By default, $\mathrm{P}=$ the number of processors meaning one file per processor, but P can be set to a smaller value via the nfile or fileper keywords of the dump_modify command. These options can be the most efficient way of writing out dump files when running on large numbers of processors.  

For the legacy VTK format $^{\circ}\%^{:}$ ” is ignored and $\mathrm{P}=1$ , i.e., only processor 0 does write files.  

Note that using the “\*” and $^{\mathrm{a}_{0}}$ ” characters together can produce a large number of small dump files!  

If dump_modify binary is used, the dump file (or files, if “\*” or $^{\leftarrow6}\%^{,5}$ is also used) is written in binary format. A binary dump file will be about the same size as a text version, but will typically write out much faster.  

# 9.23.4 Restrictions  

The vtk style does not support writing of gzipped dump files.  

The vtk dump style is part of the VTK package. It is only enabled if LAMMPS was built with that package. See the Build package page for more info.  

To use this dump style, you also must link to the VTK library. See the info in lib/vtk/README and ensure the Makefile.lammps file in that directory is appropriate for your machine.  

The vtk dump style supports neither buffering or custom format strings.  

# 9.23. dump vtk command  

# 9.23.5 Related commands  

dump, dump image, dump_modify, undump  

# 9.23.6 Default  

By default, files are written in ASCII format. If the file extension is not one of .vtk, .vtp or .vtu, the legacy VTK file format is used.  

# FIX_MODIFY ATC COMMANDS  

# 10.1 fix_modify AtC add_molecule command  

# 10.1.1 Syntax  

fix_modify <AtC fixID> add_molecule <small|large> <tag> <group-ID>  

• AtC fixID $=$ ID of fix atc instance   
• add_molecule $=$ name of the AtC sub-command   
• small or large $=$ can be small if molecule size $<$ cutoff radius, must be large otherwise   
• tag $=$ tag for tracking a molecule   
• group- $.I D=$ LAMMPS defined group-ID  

# 10.1.2 Examples  

group WATERGROUP type 1 2 fix_modify AtC add_molecule small water WATERGROUP  

# 10.1.3 Description  

Associates a tag with all molecules corresponding to a specified group.  

# 10.1.4 Restrictions  

None.  

# 10.1.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC add_species • fix_modify AtC remove_species • fix_modify AtC remove_molecule  

# 10.1.6 Default  

None.  

# 10.2 fix_modify AtC add_species command  

# 10.2.1 Syntax  

fix_modify <AtC fixID> add_species <tag> <group|type> <ID>  

• AtC fixID $=\mathrm{ID}$ of fix atc instance   
• add_species $=$ name of the AtC sub-command   
• tag $=$ tag for tracking a species   
group or type $=$ LAMMPS defined group or type of atoms   
• $\mathrm{ID}=$ name of group or type number  

# 10.2.2 Examples  

fix_modify AtC add_species gold type 1 group GOLDGROUP type 1 fix_modify AtC add_species gold group GOLDGROUP  

# 10.2.3 Description  

Associates a tag with all atoms of a specified type or within a specified group.  

# 10.2.4 Restrictions  

None.  

# 10.2.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC add_molecule • fix_modify AtC remove_species • fix_modify AtC remove_molecule  

# 10.2.6 Default  

None.  

# 10.3 fix_modify AtC atom_element_map command  

# 10.3.1 Syntax  

fix_modify <AtC fixID> atom_element_map <eulerian|lagrangian> [<frequency>]  

• AtC fixID $=$ ID of fix atc instance • atom_element_map $=$ name of the AtC sub-command  

• eulerian or lagrangian $=$ frame of reference   
• frequency $=$ frequency of updating atom-to-continuum maps based on the current configuration - (only for eulerian)  

# 10.3.2 Examples  

fix_modify AtC atom_element_map eulerian 100  

# 10.3.3 Description  

Changes frame of reference from eulerian to lagrangian or vice versa and sets the frequency for which the map from atoms to elements is reformed and all the attendant data is recalculated.  

# 10.3.4 Restrictions  

Cannot change map type after initialization.  

# 10.3.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.3.6 Default  

lagrangian  

# 10.4 fix_modify AtC atom_weight command  

# 10.4.1 Syntax  

fix_modify <AtC fixID $>$ atom_weight <method> <args>  

• AtC fixID $=$ ID of fix atc instance   
• atom_weight $=$ name of the AtC sub-command   
• method $=$ constant or lattice or element or region or group or read_in – constant <group-ID> <value>: atoms in specified group are assigned the constant value given – lattice: volume per atom for specified lattice type (e.g. fcc) and parameter – element: element volume divided among atoms within element – region: volume per atom determined based on the atom count in the MD regions and their volumes. Note: meaningful only if atoms completely fill all the regions. – group: volume per atom determined based on the atom count in a group and its volume – node: (undocumented) – node_element: (undocumented) – read_in<filename>: list of values for atoms are read-in from specified file  

# 10.4.2 Examples  

fix_modify AtC atom_weight constant myatoms 11.8 fix_modify AtC atom_weight lattice fix_modify AtC atom_weight read-in atm_wt_file.txt  

# 10.4.3 Description  

Command for assigning the value of atomic weights used for atomic integration in atom-continuum coupled simulations.  

# 10.4.4 Restrictions  

The use of the lattice option requires a lattice type and parameter is already specified.  

# 10.4.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.4.6 Default  

lattice  

# 10.5 fix_modify AtC atomic_charge command  

# 10.5.1 Syntax  

fix_modify <AtC fixID> <include|omit> atomic_charge  

• AtC fixID $=$ ID of fix atc instance   
• include or omit $=$ switch to activate/deactivate inclusion of intrinsic atomic charge in ATC   
• atomic_charge $=$ name of the AtC sub-command  

# 10.5.2 Examples  

fix_modify AtC include atomic_charge  

# 10.5.3 Description  

Determines whether AtC tracks the total charge as a finite element field.  

# 10.5.4 Restrictions  

Required for: electrostatics  

# 10.5.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.5.6 Default  

If the atom charge is defined, default is on, otherwise default is off.  

# 10.6 fix_modify AtC boundary_dynamics command  

# 10.6.1 Syntax  

fix_modify <AtC fixID> boundary_dynamics <on|damped_harmonic|prescribed|coupled|none>  

• AtC fixID $=$ ID of fix atc instance • boundary_dynamics $=$ name of the AtC sub-command • on or damped_harmonic prescribed coupled none  

# 10.6.2 Description  

Sets different schemes for controlling boundary atoms. on will integrate the boundary atoms using the velocity-verlet algorithm. damped_harmonic uses a mass/spring/dashpot for the boundary atoms with added arguments of the damping and spring constants followed by the ratio of the boundary type mass to the desired mass. prescribed forces the boundary atoms to follow the finite element displacement. coupled does the same.  

# 10.6.3 Restrictions  

Boundary atoms must be specified. When using swaps between internal and boundary atoms, the initial configuration must have already correctly partitioned the two.  

# 10.6.4 Related AtC commands  

• fix_modify AtC command overview  

# 10.6.5 Default  

prescribed on  

# 10.7 fix_modify AtC boundary_faceset command  

# 10.7.1 Syntax  

fix_modify <AtC fixID> boundary_faceset <is|add> <faceset_name> • AtC fixID $=$ ID of fix atc instance • boundary_faceset $=$ name of the AtC sub-command • is or add $=$ select whether to select or add a faceset • faceset_name $=$ name of the faceset  

# 10.7.2 Examples  

fix_modify AtC boundary_faceset is obndy  

# 10.7.3 Description  

This command species the faceset name when using a faceset to compute the MD/FE boundary fluxes. The faceset must already exist.  

# 10.7.4 Restrictions  

This is only valid when fe_md_boundary is set to faceset.  

# 10.7.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC fe_md_boundary • fix_modify AtC mesh create_faceset box • fix_modify AtC mesh create_faceset plane  

# 10.7.6 Default  

None.  

# 10.8 fix_modify AtC boundary type command  

# 10.8.1 Syntax  

fix_modify <AtC fixID> boundary type $<$ <atom-type-id>  

• AtC fixID $=$ ID of fix atc instance   
• boundary type $=$ name of the AtC sub-command   
• atom-type-id $=$ type id for atoms that represent a fictitious boundary internal to the FE mesh  

# 10.8.2 Examples  

fix_modify AtC boundary type ghost_atoms  

# 10.8.3 Description  

Command to define the atoms that represent the fictitious boundary internal to the FE mesh. For fully overlapped MD/FE domains with periodic boundary conditions no boundary atoms should be defined.  

# 10.8.4 Restrictions  

None.  

# 10.8.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.8.6 Default  

None.  

# 10.9 fix_modify AtC consistent_fe_initialization command  

# 10.9.1 Syntax  

fix_modify <AtC fixID> consistent_fe_initialization <on|off>  

• AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance   
• consistent_fe_initialization $=$ name of the AtC sub-command   
• on or off $=$ switch to activate/deactivate the initial setting of the FE intrinsic field to match the projected MD field  

# 10.9.2 Examples  

fix_modify AtC consistent_fe_initialization on  

# 10.9.3 Description  

Determines whether AtC initializes FE intrinsic fields (e.g., temperature) to match the projected MD values. This is particularly useful for fully overlapping simulations.  

# 10.9.4 Restrictions  

Can be used with: thermal, two_temperature. Cannot be used with time filtering on. Does not include boundary nodes.  

# 10.9.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.9.6 Default  

Default is off  

# 10.10 fix_modify AtC control localized_lambda command  

# 10.10.1 Syntax  

fix_modify <AtC fixID> control localized_lambda <on|off>  

• AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance • control localized_lambda $=$ name of the AtC sub-command • on or $o f f=$ Toggles state of localization algorithm  

# 10.10.2 Examples  

<html><body><table><tr><td>ix modify AtC control localized_lambda on</td></tr></table></body></html>  

# 10.10.3 Description  

Turns the localization algorithms on or off for control algorithms to restrict the influence of FE coupling or boundary conditions to a region near the boundary of the MD region. Control algorithms will not affect atoms in elements not possessing faces on the boundary of the region. Flux-based control is localized via row-sum lumping while quantity control is done by solving a truncated matrix equation.  

# 10.10.4 Restrictions  

None.  

# 10.10.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.10.6 Default  

off  

# 10.11 fix_modify AtC control momentum command  

# 10.11.1 Syntax  

fix_modify <AtC fixID $>$ control $<$ <physics_type> <solution_parameter> <value>   
fix_modify AtC control momentum none   
fix_modify AtC control momentum rescale <frequency>   
fix_modify AtC control momentum glc_displacement   
fix_modify AtC control momentum glc_velocity   
fix_modify AtC control momentum hoover   
fix_modify AtC control momentum flux [faceset face_set_id, interpolate]   
• AtC fixID $=$ ID of fix atc instance   
• control $=$ name of the AtC sub-command   
• physics_type $=$ thermal or momentum   
• solution_parameter $=$ max_iterations or tolerance   
• value $=$ solution_parameter value   
• momentum option $=n o n e$ or rescale or glc_displacement or glc_velocity hoover or flux   
• frequency $=$ time step frequency for applying displacement and velocity rescaling   
• faceset_id $=$ id of boundary face set (optional, only for faceset)  

# 10.11.2 Examples  

fix_modify AtC control momentum none fix_modify AtC control momentum flux faceset bndy_faces fix_modify AtC control momentum glc_velocity  

# 10.11.3 Description  

The general version of control sets the numerical parameters for the matrix solvers used in the specified control algorithm. Many solution approaches require iterative solvers, and these methods enable users to provide the maximum number of iterations and the relative tolerance.  

The control momentum version sets the momentum exchange mechanism from the finite elements to the atoms, managed through a control algorithm. rescale computes a scale factor for each atom to match the finite element temperature. hoover is a Gaussian least-constraint isokinetic thermostat enforces that the nodal restricted atomic temperature matches the finite element temperature. flux is a similar mode, but rather adds energy to the atoms based on conservation of energy.  

correction_max_iterations sets the maximum number of iterations to compute the second order in time correction term for lambda with the fractional step method. The method uses the same tolerance as the controller’s matrix solver.  

# 10.11.4 Restrictions  

Only for be used with the specific controllers thermal or momentum. They are ignored if a lumped solution is requested. control momentum is only for be used with specific transfers: elastic rescale not valid with time filtering activated  

# 10.11.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC control thermal  

# 10.11.6 Default  

• max_iterations is the number of rows in the matrix.   
• tolerance is 1.0e-10.  

# 10.12 fix_modify AtC control thermal command  

# 10.12.1 Syntax  

fix_modify $<$ <AtC fixID $>$ control $<$ <physics_type> $<$ <solution_parameter> <value> fix_modify $<$ AtC fixID $>$ control thermal $<$ control_type> <optional_args> fix_modify $<$ AtC fixID $>$ control thermal rescale $<$ frequency> fix_modify $<$ AtC fixID $>$ control thermal flux $<$ <boundary_integration_type> <faceset_id> fix_modify $<$ AtC fixID $>$ control thermal correction_max_iterations <max_iterations>  

• AtC fixID $=$ ID of fix atc instance   
• control $=$ name of the AtC sub-command   
• physics_type $=$ thermal or momentum   
• solution_parameter $=$ max_iterations or tolerance   
• value $=$ solution_parameter value   
• thermal control_type $=$ none or rescale or hoover or flux   
• frequency $=$ time step frequency for applying velocity rescaling   
• boundary_integration_type $=$ faceset or interpolate (optional)   
• faceset_id $\mathrm{.=id}$ of boundary face set (optional, only for faceset)  

• correction_max_iterations $=$ maximum number of iterations that will be used by iterative matrix solvers for thermal physics type  

# 10.12.2 Examples  

<html><body><table><tr><td>fix modify AtC control thermal none</td></tr><tr><td>fix modify AtC control thermal rescale 10</td></tr><tr><td>fix modify AtC control thermal hoover</td></tr><tr><td>fix modify AtC control thermal flux</td></tr><tr><td>fix modify AtC control thermal fux faceset bndy. faces</td></tr><tr><td>fix modify AtC control thermal correction max iterations 10</td></tr></table></body></html>  

# 10.12.3 Description  

The general version of control sets the numerical parameters for the matrix solvers used in the specified control algorithm. Many solution approaches require iterative solvers, and these methods enable users to provide the maximum number of iterations and the relative tolerance.  

The control thermal version sets the energy exchange mechanism from the finite elements to the atoms, managed through a control algorithm. rescale computes a scale factor for each atom to match the finite element temperature. hoover is a Gaussian least-constraint isokinetic thermostat enforces that the nodal restricted atomic temperature matches the finite element temperature. flux is a similar mode, but rather adds energy to the atoms based on conservation of energy. hoover and flux allow the prescription of sources or fixed temperatures on the atoms.  

correction_max_iterations sets the maximum number of iterations to compute the second order in time correction term for lambda with the fractional step method. The method uses the same tolerance as the controller’s matrix solver.  

# 10.12.4 Restrictions  

Only for be used with the specific controllers thermal or momentum. They are ignored if a lumped solution is requested.  

control thermal is only for be used with specific transfers: thermal (rescale, hoover, flux), two_temperature $(\#u x)$ . rescale not valid with time filtering activated  

correction_max_iterations is only for use with thermal physics using the fractional step method.  

# 10.12.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC control momentum  

# 10.12.6 Default  

• max_iterations is the number of rows in the matrix. • tolerance is 1.0e-10.   
• rescale frequency is 1   
• flux boundary_integration_type is interpolate   
• correction_max_iterations is 20  

# 10.13 fix_modify AtC decomposition command  

# 10.13.1 Syntax  

fix_modify <AtC fixID> decomposition <type>  

• AtC fixID $=$ ID of fix atc instance • decomposition $=$ name of the AtC sub-command type $=$ replicated_memory or distributed_memory  

# 10.13.2 Examples  

<html><body><table><tr><td>fix_modify AtC decomposition distributed memory</td></tr></table></body></html>  

# 10.13.3 Description  

Command for assigning the distribution of work and memory for parallel runs. With replicated_memory the nodal information is replicated on each processor, and with distributed_memory only the owned nodal information kept on each processor. The replicated_memory option is most appropriate for simulations were the number of nodes is much smaller than the number of atoms.  

# 10.13.4 Restrictions  

None.  

# 10.13.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.13.6 Default  

replicated_memory  

# 10.14 fix_modify AtC extrinsic electron_integration command  

# 10.14.1 Syntax  

fix_modify <AtC fixID $>$ extrinsic electron_integration <integration_type $>$ [<num_subcycle_steps>]  

• AtC fixID $=$ ID of fix atc instance   
• extrinsic electron_integration $=$ name of the AtC sub-command   
• integration_type $=$ explicit or implicit or steady   
• num_subcycle_steps $=$ number of subcycle steps for the electron time integration (optional)  

# 10.14.2 Examples  

<html><body><table><tr><td>fix_modify AtC extrinsic electron_integration implicit</td><td></td></tr><tr><td>fix_1 _modify AtC extrinsic electron</td><td>integration explicit 100</td></tr></table></body></html>  

# 10.14.3 Description  

Switches between integration schemes for the electron temperature. The number of subcycling steps used to integrate the electron temperature for one LAMMPS timestep can be manually adjusted to capture fast electron dynamics.  

# 10.14.4 Restrictions  

For use only with the two_temperature type of the AtC fix (see fix atc command)  

# 10.14.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.14.6 Default  

implicit and subcycle_steps $=1$  

# 10.15 fix_modify AtC equilibrium_start command  

# 10.15.1 Syntax  

fix_modify <AtC fixID> equilibrium_start <on|off>  

• AtC fixID $=$ ID of fix atc instance • equilibrium_start $=$ name of the AtC sub-command exponential or step or no_filter $=$ select type of filter  

# 10.15.2 Examples  

fix_modify AtC equilibrium_start on  

# 10.15.3 Description  

Starts filtered calculations assuming they start in equilibrium, i.e. perfect finite element force balance.  

# 10.15.4 Restrictions  

Only for use with these specific transfers: thermal, two_temperature  

# 10.15.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC filter • fix_modify AtC filter scale  

# 10.15.6 Default  

None.  

# 10.16 fix_modify AtC extrinsic exchange command  

# 10.16.1 Syntax  

fix_modify <AtC fixID> extrinsic exchange ${\it\Omega}_{\mathrm{\Lambda}}\mathrm{on|\mathrm{off}>\Lambda}$  

• AtC fixID $=$ ID of fix atc instance • extrinsic exchange $=$ name of the AtC sub-command • on or $o f f=$ set state of energy exchange  

# 10.16.2 Examples  

fix_modify AtC extrinsic exchange on  

# 10.16.3 Description  

Switches energy exchange between the MD system and the electron system on or off  

# 10.16.4 Restrictions  

For use only with the two_temperature type of the AtC fix (see fix atc command)  

# 10.16.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.16.6 Default  

on  

# 10.17 fix_modify AtC fe_md_boundary command  

# 10.17.1 Syntax  

fix_modify <AtC fixID> fe_md_boundary <faceset|interpolate|no_boundary>  

• AtC fixID $=$ ID of fix atc instance • fe_md_boundary $=$ name of the AtC sub-command • faceset or interpolate or no_boundary  

# 10.17.2 Examples  

# 10.17.4 Restrictions  

If faceset is used, all the AtC non-boundary atoms must lie within and completely fill the domain enclosed by the faceset.  

# 10.17.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh create_faceset box • fix_modify AtC mesh create_faceset plane  

# 10.17.6 Default  

interpolate  

# 10.18 fix_modify AtC filter scale command  

# 10.18.1 Syntax  

fix_modify <AtC fixID> filter scale <scale>  

• AtC fixID $=$ ID of fix atc instance • filter scale $=$ name of the AtC sub-command • scale $=$ characteristic times scale of the filter  

# 10.18.2 Examples  

fix_modify AtC filter scale 10.0  

# 10.18.3 Description  

Sets the time scale for MD dynamics filter to construct a more appropriate continuous field.  

# 10.18.4 Restrictions  

Only for use with these specific transfers: thermal, two_temperature  

# 10.18.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC filter • fix_modify AtC filter type  

# 10.18.6 Default  

0.0  

# 10.19 fix_modify AtC filter type command  

# 10.19.1 Syntax  

fix_modify <AtC fixID> filter type <exponential|step|no_filter>  

• AtC fixID $=$ ID of fix atc instance • filter type $=$ name of the AtC sub-command • exponential or step or no_filter $=$ select type of filter  

# 10.19.2 Examples  

fix_modify AtC filter type exponential  

# 10.19.3 Description  

Specifies the type of time filter used.  

# 10.19.4 Restrictions  

Only for use with these specific transfers: thermal, two_temperature  

# 10.19.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC filter • fix_modify AtC filter scale  

# 10.19.6 Default  

None.  

# 10.20 fix_modify AtC fix command  

# 10.20.1 Syntax  

fix_modify <AtC fixID> fix <field> <nodeset> <constant|function>  

• AtC fixID $=$ ID of fix atc instance   
• fix $=$ name of the AtC sub-command   
• field $=$ field kind name valid for type of physics: temperature or electron_temperature   
• nodeset $=$ name of set of nodes to apply boundary condition   
• constant or function $=$ value or name of function followed by its parameters  

# 10.20.2 Examples  

fix_modify AtC fix temperature groupNAME 10. fix_modify AtC fix temperature groupNAME 0 0 0 10.0 0 0 1.0  

# 10.19. fix_modify AtC filter type command  

# 10.20.3 Description  

Creates a constraint on the values of the specified field at specified nodes.  

# 10.20.4 Restrictions  

The keyword all is reserved and thus not available as nodeset name.  

# 10.20.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC unfix  

# 10.20.6 Default  

None.  

# 10.21 fix_modify AtC fix_flux command  

# 10.21.1 Syntax  

fix_modify <AtC fixID> fix_flux <field> <face_set> <value|function>  

• AtC fixID $=$ ID of fix atc instance   
• fix_flux $=$ name of the AtC sub-command   
• field $=$ field kind name valid for type of physics: temperature or electron_temperature   
• face_set $=$ name of set of element faces   
• value or function $=$ value or name of function followed by its parameters  

# 10.21.2 Examples  

fix_modify AtC fix_flux temperature faceSet 10.0  

# 10.21.3 Description  

Command for fixing normal fluxes e.g. heat_flux. This command only prescribes the normal component of the physical flux, e.g. heat (energy) flux. The units are in AtC units, i.e. derived from the LAMMPS length, time, and mass scales.  

# 10.21.4 Restrictions  

Only normal fluxes (Neumann data) can be prescribed.  

# 10.21.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC unfix_flux  

# 10.21.6 Default  

None.  

# 10.22 fix_modify AtC computes command  

# 10.22.1 Syntax  

fix_modify <AtC fixID> computes <add|delete> <per-atom compute-ID> <volume|number>  

• AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance   
• computes $=$ name of the AtC sub-command   
• add or delete $=$ add or delete the calculation of an equivalent continuum field for the specified per-atom compute as volume or number density quantity   
• per-atom compute- $\mathrm{\cdotID}=\mathrm{ID}$ of a per-atom compute; fields can be calculated for all per-atom computes available in LAMMPS   
• volume or number $=$ select whether the created field is a per-unit-volume quantity or a per-atom quantity as weighted by kernel functions  

# 10.22.2 Examples  

compute virial all stress/atom fix_modify AtC computes add virial volume fix_modify AtC computes delete virial compute centrosymmetry all centro/atom fix_modify AtC computes add centrosymmetry number  

# 10.22.3 Description  

Calculates continuum fields corresponding to specified per-atom computes created by LAMMPS.  

# 10.22.4 Restrictions  

Must be used with fix atc hardy. The per-atom compute must be specified before the corresponding continuum field can be requested.  

# 10.22.5 Related AtC commands  

• fix_modify AtC command overview   
• fix_modify AtC fields   
• compute  

# 10.22.6 Default  

None.  

# 10.23 fix_modify AtC fields command  

# 10.23.1 Syntax  

fix_modify <AtC fixID $>$ fields <all|none> fix_modify <AtC fixID $>$ fields <add|delete> <list_of_fields>  

• AtC fixID $=$ ID of fix atc instance • fields $=$ name of the AtC sub-command • all or none $=$ output all or no fields • add or delete $=$ add or delete the listed output fields • list_of_fields $=$ one or more of the fields listed below:  

– density $:$ mass per unit volume   
– displacement : displacement vector   
– momentum : momentum per unit volume   
– velocity : defined by momentum divided by density   
– projected_velocity $:$ simple kernel estimation of atomic velocities   
– temperature : temperature derived from the relative atomic kinetic energy   
– kinetic_temperature : temperature derived from the full kinetic energy   
– number_density $:$ simple kernel estimation of number of atoms per unit volume   
– stress : Cauchy stress tensor for eulerian analysis (atom_element_map), or first Piola-Kirchhoff stress tensor for lagrangian analysis   
– transformed_stress : first Piola-Kirchhoff stress tensor for eulerian analysis (atom_element_map), or Cauchy stress tensor for lagrangian analysis   
– heat_flux $:$ spatial heat flux vector for eulerian, or referential heat flux vector for lagrangian   
– potential_energy $:$ potential energy per unit volume   
– kinetic_energy $:$ kinetic energy per unit volume   
– thermal_energy $:$ thermal energy (kinetic energy - continuum kinetic energy) per unit volume   
– internal_energy : total internal energy (potential $^+$ thermal) per unit volume   
– energy $:$ total energy (potential $^+$ kinetic) per unit volume   
– number_density $:$ number of atoms per unit volume   
– eshelby_stress $:$ configurational stress (energy-momentum) tensor defined by (Eshelby)   
– vacancy_concentration $:$ volume fraction of vacancy content   
– type_concentration $:$ volume fraction of a specific atom type  

# 10.23.2 Examples  

fix_modify AtC fields add velocity temperature  

# 10.23.3 Description  

Allows modification of the fields calculated and output by the AtC transfer class. The commands are cumulative, e.g.:  

<html><body><table><tr><td>fix_modify AtC fields none</td></tr><tr><td>fix_modify AtC fields add velocity temperature</td></tr></table></body></html>  

will only output the velocity and temperature fields.  

# 10.23.4 Restrictions  

Must be used with fix atc hardy. Currently, the stress and heat flux formulas are only correct for central force potentials, e.g. Lennard-Jones and EAM but not Stillinger-Weber.  

# 10.23.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC gradients • fix_modify AtC rates • fix_modify AtC computes  

# 10.23.6 Default  

By default, no fields are output.  

# 10.23.7 References  

(Eshelby) J.D. Eshelby, Philos. Trans. Royal Soc. London A, Math. Phys. Sci., Vol. 244, No. 877 (1951) pp. 87-112; J. Elasticity, Vol. 5, Nos. 3-4 (1975) pp. 321-335]  

# 10.24 fix_modify AtC gradients command  

# 10.24.1 Syntax  

fix_modify <AtC fixID> gradients <add|delete> <list_of_fields>  

• AtC fixID $=$ ID of fix atc instance   
• gradients $=$ name of the AtC sub-command   
• add or delete $=$ select whether to add or delete calculation of gradients for the listed output fields   
• list_of_fields $=$ one or more of the fields listed below:   
– density $:$ mass per unit volume   
– displacement : displacement vector   
– momentum : momentum per unit volume   
– velocity $:$ defined by momentum divided by density   
– projected_velocity $:$ simple kernel estimation of atomic velocities   
– temperature : temperature derived from the relative atomic kinetic energy   
– kinetic_temperature $:$ temperature derived from the full kinetic energy   
– number_density $:$ simple kernel estimation of number of atoms per unit volume   
– stress : Cauchy stress tensor for eulerian analysis (atom_element_map), or first Piola-Kirchhoff stress tensor for lagrangian analysis   
– transformed_stress : first Piola-Kirchhoff stress tensor for eulerian analysis (atom_element_map), or Cauchy stress tensor for lagrangian analysis   
– heat_flux : spatial heat flux vector for eulerian, or referential heat flux vector for lagrangian   
– potential_energy $:$ potential energy per unit volume   
– kinetic_energy $:$ kinetic energy per unit volume   
– thermal_energy $:$ thermal energy (kinetic energy - continuum kinetic energy) per unit volume   
– internal_energy $:$ total internal energy (potential $^+$ thermal) per unit volume   
– energy $:$ total energy (potential $^+$ kinetic) per unit volume   
– number_density $:$ number of atoms per unit volume   
– eshelby_stress $:$ configurational stress (energy-momentum) tensor defined by (Eshelby)   
– vacancy_concentration $:$ volume fraction of vacancy content   
– type_concentration $:$ volume fraction of a specific atom type  

# 10.24.2 Examples  

<html><body><table><tr><td>fix_modify AtC gradients add temperature velocity stress fix_modify y AtC gradients delete velocity</td></tr></table></body></html>  

# 10.24.3 Description  

Requests calculation and output of gradients of the fields from the AtC transfer class. These gradients will be with regard to spatial or material coordinate for Eulerian or Lagrangian analysis, respectively, as specified by fix_modify AtC atom_element_map  

# 10.24.4 Restrictions  

Must be used with fix atc hardy.  

# 10.24.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC atom_element_map • fix_modify AtC fields   
• fix_modify AtC rates  

# 10.24.6 Default  

None.  

# 10.24.7 References  

(Eshelby) J.D. Eshelby, Philos. Trans. Royal Soc. London A, Math. Phys. Sci., Vol. 244, No. 877 (1951) pp. 87-112; J. Elasticity, Vol. 5, Nos. 3-4 (1975) pp. 321-335]  

# 10.25 fix_modify AtC kernel command  

# 10.25.1 Syntax  

fix_modify <AtC fixID> kernel <type> <parameters>  

• AtC fixID $=$ ID of fix atc instance   
• kernel $=$ name of the AtC sub-command   
• $\mathrm{type}=s t e p$ or cell or cubic_bar or cubic_cylinder or cubic_sphere or quartic_bar or quartic_cylinder or quartic_sphere  

• the following parameter(s) are required for each kernel:  

– step : <radius> – cell : <hx> <hy> <hz> or <h> – cubic_bar : <half_width> – cubic_cylinder : <radius> – cubic_sphere : <radius> – quartic_bar : <half_width> – quartic_cylinder : <radius> – quartic_sphere : <radius>  

# 10.25.2 Examples  

fix_modify AtC kernel cell 1.0 1.0 1.0   
fix_modify AtC kernel quartic_sphere 10.0  

# 10.25.3 Description  

Sets the localization kernel type and parameters for fix atc hardy.  

# 10.25.4 Restrictions  

Must be used with fix atc hardy. For bar kernel types, half-width oriented along x-direction. For cylinder kernel types, cylindrical axis is assumed to be in z-direction.  

# 10.25.5 Related AtC commands  

• fix_modify AtC command overview   
• fix_modify AtC fields   
• fix_modify AtC gradients   
• fix_modify AtC rates   
• fix_modify AtC computes  

# 10.25.6 Default  

None.  

# 10.26 fix_modify AtC on_the_fly command  

# 10.26.1 Syntax  

fix_modify <AtC fixID> on_the_fly <bond|kernel> <on|off>  

• AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance   
• on_the_fly $=$ name of the AtC sub-command   
• bond or kernel $=$ specifies on-the-fly calculation of bond or kernel matrix elements   
• on or $o f f=$ activate or discontinue on-the-fly mode  

# 10.26.2 Examples  

<html><body><table><tr><td>fix_modify AtC on_the_fy bond on</td></tr><tr><td>fix_modify 1 AtC on_the_fly kernel</td></tr><tr><td></td></tr><tr><td>fix_modify AtC on_the_fly kernel off</td></tr></table></body></html>  

# 10.26.3 Description  

Overrides normal mode of pre-calculating and storing bond pair-to-node a nd kernel atom-to-node matrices. If activated, it will calculate elements of these matrices during repeated calls of field computations (i.e. “on-the-fly”) and not store them for future use. The on flag is optional - if omitted, on_the_fly will be activated for the specified matrix. Can be deactivated using the off flag.  

# 10.26.4 Restrictions  

Must be used with fix atc hardy.  

# 10.26.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.26.6 Default  

By default, on-the-fly calculation is not active (i.e. off). However, THE code does a memory allocation check to determine if it can store all needed bond and kernel matrix elements. If this allocation fails, on-the-fly will be activated.  

# 10.27 fix_modify AtC rates command  

# 10.27.1 Syntax  

fix_modify <AtC fixID> rates <add|delete> <list_of_fields>  

• AtC fixID $=$ ID of fix atc instance   
• rates $=$ name of the AtC sub-command   
• add or delete $=$ select whether to add or delete calculation of rates for the listed output fields  

• list_of_fields $=$ one or more of the fields listed below:  

– density $:$ mass per unit volume   
– displacement : displacement vector   
– momentum $:$ momentum per unit volume   
– velocity : defined by momentum divided by density   
– projected_velocity $:$ simple kernel estimation of atomic velocities   
– temperature $:$ temperature derived from the relative atomic kinetic energy   
– kinetic_temperature : temperature derived from the full kinetic energy   
– number_density $:$ simple kernel estimation of number of atoms per unit volume   
– stress : Cauchy stress tensor for eulerian analysis (atom_element_map), or first Piola-Kirchhoff stress tensor for lagrangian analysis   
– transformed_stress : first Piola-Kirchhoff stress tensor for eulerian analysis (atom_element_map), or Cauchy stress tensor for lagrangian analysis   
– heat_flux $:$ spatial heat flux vector for eulerian, or referential heat flux vector for lagrangian   
– potential_energy $:$ potential energy per unit volume   
– kinetic_energy $:$ kinetic energy per unit volume   
– thermal_energy $:$ thermal energy (kinetic energy - continuum kinetic energy) per unit volume   
– internal_energy $:$ total internal energy (potential $^+$ thermal) per unit volume   
– energy $:$ total energy (potential $^+$ kinetic) per unit volume   
– number_density $:$ number of atoms per unit volume   
– eshelby_stress $:$ configurational stress (energy-momentum) tensor defined by (Eshelby)   
– vacancy_concentration $:$ volume fraction of vacancy content   
– type_concentration $:$ volume fraction of a specific atom type  

# 10.27.2 Examples  

<html><body><table><tr><td>fix _modify AtC rates add temperature velocity stress fix_modify AtC rates delete stress</td></tr></table></body></html>  

# 10.27.3 Description  

Requests calculation and output of rates (time derivatives) of the fields from the AtC transfer class. For Eulerian analysis (see fix_modify AtC atom_element_map) these rates are the partial time derivatives of the nodal fields, not the full (material) time derivatives.  

# 10.27.4 Restrictions  

Must be used with fix atc hardy.  

# 10.27.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC atom_element_map • fix_modify AtC fields   
• fix_modify AtC fields  

# 10.27.6 Default  

None.  

# 10.27.7 References  

(Eshelby) J.D. Eshelby, Philos. Trans. Royal Soc. London A, Math. Phys. Sci., Vol. 244, No. 877 (1951) pp. 87-112; J. Elasticity, Vol. 5, Nos. 3-4 (1975) pp. 321-335]  

# 10.28 fix_modify AtC initial command  

# 10.28.1 Syntax  

fix_modify <AtC fixID> initial <field> <nodeset> <constant|function>  

• AtC fixID $=$ ID of fix atc instance   
• initial $=$ name of the AtC sub-command   
• field $=$ field kind name valid for type of physics: temperature or electron_temperature   
• nodeset $=$ name of set of nodes to apply initial condition   
• constant or function $=$ value or name of function followed by its parameters  

# 10.28.2 Examples  

fix_modify AtC initial temperature groupNAME 10.  

# 10.28.3 Description  

Sets the initial values for the specified field at the specified nodes.  

# 10.28.4 Restrictions  

The keyword all is reserved and thus not available as nodeset name.  

# 10.28.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.28.6 Default  

None.  

# 10.29 fix_modify AtC internal_element_set command  

# 10.29.1 Syntax  

fix_modify <AtC fixID> internal_element_set <element_set_name>  

• AtC fixID $=$ ID of fix atc instance • internal_element_set $=$ name of the AtC sub-command • element_set_name $=$ name of element set defining internal region, or off  

# 10.29.2 Examples  

<html><body><table><tr><td>fix_modify AtC internal_element _set myElementSet fix_modify 1 AtC internal_elementset off</td></tr></table></body></html>  

# 10.29.3 Description  

Enables AtC to base the region for internal atoms to be an element set. If no ghost atoms are used, all the AtC atoms must be constrained to remain in this element set by the user, e.g., with walls. If boundary atoms are used in conjunction with Eulerian atom maps AtC will partition all atoms of a boundary or internal type to be of type internal if they are in the internal region or to be of type boundary otherwise.  

# 10.29.4 Restrictions  

If boundary atoms are used in conjunction with Eulerian atom maps, the Eulerian reset frequency must be an integer multiple of the Lammps reneighbor frequency.  

# 10.29.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC atom_element_map • fix_modify AtC boundary type  

# 10.29.6 Default  

off  

# 10.30 fix_modify AtC internal_quadrature command  

# 10.30.1 Syntax  

fix_modify <AtC fixID> internal_quadrature <on|off> [region] • AtC fixID $=$ ID of fix atc instance • internal_quadrature $=$ name of the AtC sub-command • on or of $=$ select whether internal quadrature is enabled or not region $=$ treat finite elements as within MD region (optional)  

# 10.30.2 Examples  

# 10.30.3 Description  

Command to use or not use atomic quadrature on internal elements fully filled with atoms. By turning the internal quadrature off these elements do not contribute to the governing PDE and the fields at the internal nodes follow the weighted averages of the atomic data.  

Optional region tag specifies which finite element nodes will be treated as being within the MD region. This option is only valid with internal_quadrature off.  

# 10.30.4 Related AtC commands  

• fix_modify AtC command overview  

# 10.30.5 Default  

on.  

# 10.31 fix_modify AtC kernel_bandwidth command  

# 10.31.1 Syntax  

fix_modify <AtC fixID> kernel_bandwidth <value>  

• AtC fixID $=$ ID of fix atc instance • kernel_bandwidth $=$ name of the AtC sub-command • value $=$ new bandwidth value  

# 10.31.2 Examples  

# 10.31.6 Default  

Number of sample locations.  

# 10.32 fix_modify AtC control lumped_lambda_solve command  

# 10.32.1 Syntax  

fix_modify <AtC fixID> control lumped_lambda_solve <on|off>  

• AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance • control lumped_lambda_solve $=$ name of the AtC sub-command • on or off $=$ Toggles state of lumped matrix  

# 10.32.2 Examples  

<html><body><table><tr><td>ix modify AtC control lumped_lambda_solve on</td></tr></table></body></html>  

# 10.32.3 Description  

Command select whether to use or not use lumped matrix for lambda solve.  

# 10.32.4 Restrictions  

None.  

# 10.32.5 Related AtC commands  

• fix_modify AtC command overview  

10.32.6 Default off  

# 10.33 fix_modify AtC control mask_direction command  

# 10.33.1 Syntax  

fix_modify <AtC fixID $>$ control mask_direction <direction> <on|off>  

• AtC fixID $=\mathrm{ID}$ of fix atc instance   
control mask_direction $=$ name of the AtC sub-command   
• direction $=$ select direction   
on or off $=$ Toggles state  

# 10.33.2 Examples  

fix_modify AtC control mask_direction 0 on  

# 10.33.3 Description  

Command to mask out certain dimensions from the atomic regulator  

# 10.33.4 Restrictions  

None.  

# 10.33.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.34 fix_modify AtC mass_matrix command  

# 10.34.1 Syntax  

fix_modify <AtC fixID> mass_matrix <fe|md_fe>  

• AtC fixID $=$ ID of fix atc instance   
• mass_matrix $=$ name of the AtC sub-command   
• fe or md_fe $=$ activate/deactivate using the FE mass matrix in the MD region  

# 10.34.2 Examples  

# 10.34.3 Description  

Determines whether AtC uses the FE mass matrix based on Gaussian quadrature or based on atomic quadrature in the MD region. This is useful for fully overlapping simulations to improve efficiency.  

# 10.34.4 Restrictions  

Should not be used unless the FE region is contained within the MD region, otherwise the method will be unstable and inaccurate.  

# 10.34.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.34.6 Default  

md_fe  

# 10.35 fix_modify AtC material command  

# 10.35.1 Syntax  

fix_modify <AtC fixID> material <elementset_name> <material_id>  

• AtC fixID $=$ ID of fix atc instance material $=$ name of the AtC sub-command  

• elementset_name $=$ name of the elementset • material_id $=\mathrm{ID}$ of the material  

# 10.35.2 Examples  

# 10.35.3 Description  

Sets the material model in elementset_name to be of type material_id.  

# 10.35.4 Restrictions  

The element set must already be created and the material must be specified in the material file given the the atc fix on construction  

# 10.35.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.35.6 Default  

All elements default to the first material in the material file.  

# 10.36 fix_modify AtC mesh add_to_nodeset command  

# 10.36.1 Syntax  

fix_modify <AtC fixID $>$ mesh add_to_nodeset <id> <xmin> <xmax> <ymin> <ymax> <zmin> <zmax>  

• AtC fixID $=$ ID of fix atc instance   
• mesh create_nodeset $=$ name of the AtC sub-command   
• $\operatorname{id}=\operatorname{id}$ to assign to the collection of FE nodes   
• <xmin> <xmax> <ymin> <ymax> <zmin> <zmax> $=$ coordinates of the bounding box that contains the desired nodes to be added  

# 10.36.2 Examples  

fix_modify AtC mesh add_to_nodeset lbc -12.1 -11.9 -12 12 -12 12  

# 10.36.3 Description  

Command to add nodes to an already existing FE nodeset.  

# 10.36.4 Restrictions  

None  

# 10.36.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh create_nodeset  

# 10.36.6 Default  

Coordinates are assumed to be in lattice units.  

# 10.37 fix_modify AtC mesh create command  

# 10.37.1 Syntax  

fix_modify <AtC fixID> mesh create <nx> <ny> <nz> <region-ID> <f|p> <f|p> <f|p> • AtC fixID $=\mathrm{ID}$ of fix atc instance • mesh create $=$ name of the AtC sub-command • nx ny $\mathbf{n}\mathbf{Z}=$ number of elements in x-, y-, and z-direction • region- $\mathrm{{\cdot}I D=I D}$ of region that is to be meshed • f or $\mathrm{p}=$ periodicity flags for x-, y-, and z-direction  

# 10.37.2 Examples  

<html><body><table><tr><td>fix modify AtC mesh create 10 1 1 feRegion p p p</td></tr></table></body></html>  

# 10.37.3 Description  

Creates a uniform mesh in a rectangular region.  

# 10.37.4 Restrictions  

Creates only uniform rectangular grids in a rectangular region  

# 10.37.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh quadrature  

# 10.37.6 Default  

When created, the mesh defaults to gauss2 (2-point Gaussian) quadrature. Use the fix_modify AtC mesh quadrature command to change the quadrature style.  

# 10.38 fix_modify AtC mesh create_elementset command  

# 10.38.1 Syntax  

fix_modify <AtC fixID $>$ mesh create_elementset <id> <xmin> <xmax> <ymin> <ymax> <zmin> <zmax>  

• AtC fixID $=\mathrm{ID}$ of fix atc instance   
• mesh create_elementset $=$ name of the AtC sub-command   
• $\operatorname{id}=\operatorname{id}$ to assign to the collection of FE nodes   
• <xmin> <xmax> <ymin> <ymax> <zmin> <zmax> $=$ coordinates of the bounding box that contains only the desired elements  

# 10.38.2 Examples  

fix_modify AtC mesh create_elementset middle -4.1 4.1 -100 100 -100 1100  

# 10.38.3 Description  

Command to assign an id to a set of FE elements to be used subsequently in defining material and mesh-based operations.  

# 10.38.4 Restrictions  

Only viable for rectangular grids.  

# 10.38.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh delete_elements • fix_modify AtC mesh nodeset_to_elementset  

# 10.38.6 Default  

Coordinates are assumed to be in lattice units.  

# 10.39 fix_modify AtC mesh create_faceset box command  

# 10.39.1 Syntax  

fix_modify <AtC fixID $>$ mesh create_faceset <id> box <xmin> <xmax> <ymin> <ymax> <zmin> <zmax> <in|out $>$ [units]  

• AtC fixID $=$ ID of fix atc instance   
• mesh create_faceset $=$ name of the AtC sub-command   
• $\operatorname{id}=\operatorname{id}$ to assign to the collection of FE faces   
• box $=$ use bounding box to define FE faces   
• <xmin> <xmax> <ymin> <ymax> <zmin> <zmax> $=$ coordinates of the bounding box that is coincident with the desired FE faces   
• <in|out> $=$ “in” gives inner faces to the box, “out” gives the outer faces to the box   
• units $=$ option to specify real as opposed to lattice units  

# 10.39.2 Examples  

fix_modify AtC mesh create_faceset obndy box -4.0 4.0 -12 12 -12 12 out  

# 10.39.3 Description  

Command to assign an id to a set of FE faces.  

# 10.39.4 Restrictions  

Only viable for rectangular grids.  

# 10.39.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh create_faceset plane  

# 10.39.6 Default  

The default options are units $=$ lattice and the use of outer faces.  

# 10.40 fix_modify AtC mesh create_faceset plane command  

# 10.40.1 Syntax  

fix_modify <AtC fixID $>$ mesh create_faceset ${<}\mathrm{id}>$ plane $<\bf X|\bf y|\bf z><\mathrm{vall}><\bf x|\bf y|\bf z><\mathrm{lval}2><\mathrm{uval}2><\mathrm{uval}2><\mathrm{u}$ ,→[units]  

• AtC fixID $=\mathrm{ID}$ of fix atc instance   
• mesh create_faceset $=$ name of the AtC sub-command   
• $\operatorname{id}=\operatorname{id}$ to assign to the collection of FE faces   
• plane $=$ use plane to define faceset   
• <val1>,<lval2>,<uval2> $=$ plane is specified as the x|y|z $\v{S}=\v{S}$ val1 plane bounded by the segments x|y|z $=$ [lval2,uval2]   
• units $=$ option to specify real as opposed to lattice units  

# 10.40.2 Examples  

fix_modify AtC mesh create_faceset xyplane plane y 0 x -4 0  

# 10.40.3 Description  

Command to assign an id to a set of FE faces.  

# 10.40.4 Restrictions  

Only viable for rectangular grids.  

# 10.40.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh create_faceset box  

# 10.40.6 Default  

The default options are units $=$ lattice.  

# 10.41 fix_modify AtC mesh create_nodeset command  

# 10.41.1 Syntax  

fix_modify <AtC fixID $>$ mesh create_nodeset <id> <xmin> <xmax> <ymin> <ymax> <zmin> →<zmax>  

• AtC fixID $=$ ID of fix atc instance   
• mesh create_nodeset $=$ name of the AtC sub-command   
• id $=$ id to assign to the collection of FE nodes   
• <xmin> <xmax> <ymin> <ymax> <zmin> <zmax> $=$ coordinates of the bounding box that contains only the desired nodes  

# 10.41.2 Examples  

fix_modify AtC mesh create_nodeset lbc -12.1 -11.9 -12 12 -12 12  

# 10.41.3 Description  

Command to assign an id to a set of FE nodes to be used subsequently in defining boundary conditions.  

# 10.41.4 Restrictions  

None  

# 10.41.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh add_to_nodeset  

# 10.41.6 Default  

Coordinates are assumed to be in lattice units.  

# 10.42 fix_modify AtC mesh delete_elements command  

# 10.42.1 Syntax  

fix_modify <AtC fixID $>$ mesh delete_elements ${\mathrm{<id>}}$  

• AtC fixID $=$ ID of fix atc instance  

• mesh create_elementset $=$ name of the AtC sub-command • $\operatorname{id}=\operatorname{id}$ of the element set  

# 10.42.2 Examples  

fix_modify AtC mesh delete_elements gap  

# 10.42.3 Description  

Deletes a group of elements from the mesh.  

# 10.42.4 Restrictions  

None.  

# 10.42.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh create_elementset • fix_modify AtC mesh nodeset_to_elementset  

# 10.42.6 Default  

None.  

# 10.43 fix_modify AtC mesh nodeset_to_elementset command  

# 10.43.1 Syntax  

fix_modify <AtC fixID $>$ mesh nodeset_to_elementset <nodeset_id> <elementset_id> <max/min> • AtC fixID $=$ ID of fix atc instance • mesh nodeset_to_elementset $=$ name of the AtC sub-command • nodeset_id $=$ id of desired nodeset from which to create the elementset • elementset_id $=$ id to assign to the collection of FE elements • <max/min> $=$ flag to choose either the maximal or minimal elementset  

# 10.43.2 Examples  

fix_modify AtC mesh nodeset_to_elementset myNodeset myElementset min  

# 10.43.3 Description  

Command to create an elementset from an existing nodeset. Either the minimal element set of elements with all nodes in the set, or maximal element set with all elements with at least one node in the set, can be created.  

# 10.43.4 Restrictions  

None.  

# 10.43.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh create_elementset • fix_modify AtC mesh delete_elements  

# 10.43.6 Default  

Unless specified, the maximal element set is created.  

# 10.44 fix_modify AtC mesh output command  

# 10.44.1 Syntax  

fix_modify <AtC fixID $>$ mesh output <file_prefix>  

• AtC fixID $=$ ID of fix atc instance • mesh output $=$ name of the AtC sub-command • file_prefix $=$ prefix of various generated output files  

# 10.44.2 Examples  

fix_modify AtC mesh output meshData  

# 10.44.3 Description  

Command to output mesh and associated data: nodesets, facesets, and elementsets. This data is only output once upon initialization since currently the mesh is static. Creates binary (EnSight, “gold” format) output of mesh data.  

# 10.44.4 Restrictions  

None.  

# 10.44.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.44.6 Default  

None.  

# 10.45 fix_modify AtC mesh quadrature command  

# 10.45.1 Syntax  

fix_modify <AtC fixID> mesh quatrature <quad>  

# 10.44. fix_modify AtC mesh output command  

# LAMMPS Documentation, Release 4Feb2025  

• AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance • mesh quadrature $=$ name of the AtC sub-command • quad $=$ nodal or gauss1 or gauss2 or gauss3 or face  

# 10.45.2 Examples  

# 10.45.3 Description  

(Re-)assigns the quadrature style for an existing mesh. When a mesh is created its quadrature method defaults to gauss2.   
Use this call to change it after the fact.  

# 10.45.4 Restrictions  

None.  

# 10.45.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh create  

# 10.45.6 Default  

None.  

# 10.46 fix_modify AtC mesh read command  

# 10.46.1 Syntax  

fix_modify <AtC fixID> mesh read $\mathrm{<f|p>\mathrm{<f|p>\mathrm{<f|p>\mathrm{~}}}}$ • AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance • mesh read $=$ name of the AtC sub-command • filename $=$ name of the file containing the mesh to be read • f or $\mathrm{p}=$ periodicity flags for x-, y-, and z-direction (optional)  

# 10.46.2 Examples  

<html><body><table><tr><td>fix_modify AtC mesh read myComponent.mesh p p p</td></tr><tr><td>fix_modify 1 AtC mesh read myOtherComponent.exo</td></tr><tr><td></td></tr><tr><td></td></tr></table></body></html>  

# 10.46.3 Description  

Reads a mesh from a text or exodus file, and assigns periodic boundary conditions if needed.  

# 10.46.4 Restrictions  

None  

# 10.46.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh create • fix_modify AtC mesh write  

# 10.46.6 Default  

Periodicity flags are set to false (f) by default.  

# 10.47 fix_modify AtC mesh write command  

# 10.47.1 Syntax  

fix_modify <AtC fixID $>$ mesh write <f|p> <f|p> <f|p>  

• AtC fixID $=$ ID of fix atc instance • mesh write $=$ name of the AtC sub-command • filename $=$ name of the file containing the mesh to be write  

# 10.47.2 Examples  

fix_modify AtC mesh write myMesh.mesh  

# 10.47.3 Description  

Writes a mesh to a text file.  

# 10.47.4 Restrictions  

None  

# 10.47.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC mesh create • fix_modify AtC mesh read  

# 10.47.6 Default  

None.  

# 10.48 fix_modify AtC output command  

# 10.48.1 Syntax  

fix_modify <AtC fixID $>$ output <filename_prefix> <frequency $>$ [text|full_text|binary|vector   
$\hookrightarrow$ components|tensor_components]   
fix_modify $<$ AtC fixID $>$ output index [step|time]  

• AtC fixID $=$ ID of fix atc instance • output or output index $=$ name of the AtC sub-command • filename_prefix $=$ prefix for data files (for output) • frequency $=$ frequency of output in timesteps (for output)  

• optional keywords for output:  

– text $=$ creates text output of index, step and nodal variable values for unique nodes   
– full_text $=$ creates text output index, nodal id, step, nodal coordinates and nodal variable values for unique and image nodes   
– binary $=$ creates binary EnSight output   
– vector_components $=$ outputs vectors as scalar components   
– tensor_components $=$ outputs tensor as scalar components (for use with ParaView)  

• step or time $=$ index output by step or by time (for output index)  

# 10.48.2 Examples  

fix_modify AtC output heatFE 100   
fix_modify AtC output hardyFE 1 text tensor_components   
fix_modify AtC output hardyFE 10 text binary tensor_components   
fix_modify AtC output index step  

# 10.48.3 Description  

Creates text and/or binary (EnSight, “gold” format) output of nodal/mesh data which is transfer/physics specific. Output indexing by step or time is possible.  

# 10.48.4 Restrictions  

None.  

# 10.48.5 Related AtC commands  

• fix_modify AtC command overview • fix atc command  

# 10.48.6 Default  

No default format. Output indexed by time.  

# 10.49 fix_modify AtC output boundary_integral command  

# 10.49.1 Syntax  

fix_modify <AtC fixID> output boundary_integral $<$ <fieldname> faceset [name]  

• AtC fixID $=$ ID of fix atc instance   
• output boundary_integral $=$ name of the AtC sub-command   
• fieldname $=$ name of hardy field   
• faceset $=$ required keyword   
• name $=$ name of faceset  

# 10.49.2 Examples  

fix_modify AtC output boundary_integral stress faceset loop1  

# 10.49.3 Description  

Calculates a surface integral of the given field dotted with the outward normal of the faces and puts output in the “GLOBALS” file.  

# 10.49.4 Restrictions  

Must be used with the hardy/field type of fix atc  

# 10.49.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.49.6 Default  

None.  

# 10.50 fix_modify AtC output contour_integral command  

# 10.50.1 Syntax  

fix_modify <AtC fixID> output contour_integral $<$ fieldname> faceset <name> [axis [x|y|z]]  

• AtC fixID $=$ ID of fix atc instance   
• output contour_integral $=$ name of the AtC sub-command   
• fieldname $=$ name of hardy field   
• faceset $=$ required keyword   
• name $=$ name of faceset axis $x$ or axis $y$ or axis $z=$ (optional)  

# 10.50.2 Examples  

fix_modify AtC output contour_integral stress faceset loop1  

# 10.50.3 Description  

Calculates a surface integral of the given field dotted with the outward normal of the faces and puts output in the “GLOBALS” file.  

# 10.50.4 Restrictions  

Must be used with the hardy/field type of fix atc  

# 10.50.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.50.6 Default  

None.  

# 10.51 fix_modify AtC output nodeset command  

# 10.51.1 Syntax  

fix_modify <AtC fixID> output nodeset $<$ <nodeset_name> <operation>  

• AtC fixID $=$ ID of fix atc instance   
• output nodeset $=$ name of the AtC sub-command   
• nodeset_name $=$ name of nodeset to be operated on   
operation $=$ sum – $s u m=$ creates nodal sum over nodes in specified nodeset  

# 10.51.2 Examples  

fix_modify AtC output nodeset nset1 sum  

# 10.51.3 Description  

Performs operation over the nodes belonging to specified nodeset and outputs resulting variable values to GLOBALS file.  

# 10.51.4 Restrictions  

None.  

# 10.51.5 Related AtC commands  

• fix_modify AtC command overview • fix atc command  

# 10.51.6 Default  

None.  

# 10.52 fix_modify AtC output volume_integral command  

# 10.52.1 Syntax  

fix_modify <AtC fixID> output volume_integral <elementset_name> <field> • AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance • output volume_integral $=$ name of the AtC sub-command • elementset_name $=$ name of elementset to be integrated over • fieldname $=$ name of field to integrate  

# 10.52.2 Examples  

fix_modify AtC output volume_integral eset1 mass_density  

# 10.52.3 Description  

Performs volume integration of specified field over elementset and outputs resulting variable values to GLOBALS file.  

# 10.52.4 Restrictions  

None.  

# 10.52.5 Related AtC commands  

• fix_modify AtC command overview • fix atc command  

# 10.52.6 Default  

None.  

# 10.53 fix_modify AtC pair_interactions command  

# 10.54 fix_modify AtC bond_interactions command  

# 10.54.1 Syntax  

fix_modify <AtC fixID $>$ pair_interactions <on|off> fix_modify <AtC fixID $>$ bond_interactions <on|off>  

• AtC fixID $=$ ID of fix atc instance   
• pair_interactions or bond_interactions $=$ name of the AtC sub-command   
• on or off $=$ activate or deactivate  

# 10.54.2 Examples  

<html><body><table><tr><td>fix_modify AtC pair _interactions off</td></tr><tr><td>fix x_modify AtC bond_interactions on</td></tr></table></body></html>  

# 10.54.3 Description  

Include bonds and/or pairs in stress and heat flux computations.  

# 10.54.4 Restrictions  

None.  

# 10.54.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.54.6 Default  

pair_interactions: on, bond_interactions: off  

# 10.55 fix_modify AtC poisson_solver command  

# 10.55.1 Syntax  

fix_modify <AtC fixID $>$ poisson_solver mesh create <nx> <ny> <nz> <region-ID> <f|p> $<$ <f|p> →<f|p>  

• AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance • poisson_solver $=$ name of the AtC sub-command • nx ny $n z=$ number of elements in x, y, and z • region-id $=$ id of region to be meshed • $f$ or $p=$ periodicity flags for x, y, and z  

# 10.55.2 Examples  

fix_modify AtC poisson_solver mesh create 10 1 1 feRegion p p p  

# 10.55.3 Description  

Creates a uniform mesh in a rectangular region.  

# 10.55.4 Restrictions  

Creates only uniform rectangular grids in rectangular regions.  

# 10.55.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.55.6 Default  

None.  

# 10.56 fix_modify AtC read_restart command  

# 10.56.1 Syntax  

fix_modify <AtC fixID> read_restart <file_name>  

• AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance • read_restart $=$ name of the AtC sub-command • file_name $=$ name of AtC restart file  

# 10.56.2 Examples  

fix_modify AtC read_restart restart.mydata.AtC  

# 10.56.3 Description  

Reads the current state of the AtC fields from a named text-based restart file.  

# 10.56.4 Restrictions  

The restart file only contains fields and their time derivatives. The reference positions of the atoms and the commands that initialize the fix are not saved e.g. an identical mesh containing the same atoms will have to be recreated.  

# 10.56.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC write_restart  

# 10.56.6 Default  

None.  

# 10.57 fix_modify AtC remove_molecule command  

# 10.57.1 Syntax  

fix_modify <AtC fixID $>$ remove_molecule <tag>  

• AtC fixID $=$ ID of fix atc instance • remove_molecule $=$ name of the AtC sub-command • tag $=$ tag for tracking a molecule  

# 10.57.2 Examples  

fix_modify AtC remove_molecule water  

# 10.57.3 Description  

Removes tag designated for tracking a specified set of molecules.  

# 10.57.4 Restrictions  

None.  

# 10.57.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC add_species • fix_modify AtC add_molecule • fix_modify AtC remove_species  

# 10.57.6 Default  

None.  

# 10.58 fix_modify AtC remove_source command  

# 10.58.1 Syntax  

modify <AtC fixID> remove_source <field> <element_set>  

• AtC fixID $=$ ID of fix atc instance   
• remove_source $=$ name of the AtC sub-command   
• field $=$ field kind name valid for type of physics: temperature or electron_temperature   
• element_set $=$ name of set of elements  

# 10.58.2 Examples  

fix_modify AtC remove_source temperature groupNAME  

# 10.58.3 Description  

Remove a domain source.  

# 10.58.4 Restrictions  

The keyword all is reserved and thus not available as element_set name.  

# 10.58.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC source  

# 10.58.6 Default  

None.  

# 10.59 fix_modify AtC remove_species command  

# 10.59.1 Syntax  

fix_modify <AtC fixID> remove_species <tag>  

• AtC fixID $=$ ID of fix atc instance • remove_species $=$ name of the AtC sub-command • tag $=$ tag for tracking a species  

# 10.59.2 Examples  

fix_modify AtC remove_species gold  

# 10.59.3 Description  

Removes tag designated for tracking a specified species.  

# 10.59.4 Restrictions  

None.  

# 10.59.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC add_species • fix_modify AtC add_molecule • fix_modify AtC remove_molecule  

# 10.59.6 Default  

None.  

# 10.60 fix_modify AtC reset_atomic_reference_positions command  

# 10.60.1 Syntax  

fix_modify <AtC fixID $>$ reset_atomic_reference_positions  

• AtC fixID $=$ ID of fix atc instance • reset_atomic_reference_positions $=$ name of the AtC sub-command  

# 10.59. fix_modify AtC remove_species command  

# 10.60.2 Examples  

fix_modify AtC reset_atomic_reference_positions  

# 10.60.3 Description  

Resets the atomic positions ATC uses to perform point to field operations. In can be used to use perfect lattice sites in ATC but a thermalized or deformed lattice in LAMMPS.  

# 10.60.4 Restrictions  

None.  

# 10.60.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.60.6 Default  

None  

# 10.61 fix_modify AtC reset_time command  

# 10.61.1 Syntax  

fix_modify <AtC fixID> reset_time <value>  

• AtC fixID $=$ ID of fix atc instance • reset_time $=$ name of the AtC sub-command • value $=$ new time value  

# 10.61.2 Examples  

# 10.62 fix_modify AtC sample_frequency command  

# 10.62.1 Syntax  

fix_modify <AtC fixID> sample_frequency <freq>  

• AtC fixID $=$ ID of fix atc instance • sample_frequency $=$ name of the AtC sub-command • freq $=$ frequency to sample fields in number of steps  

# 10.62.2 Examples  

fix_modify AtC sample_frequency 10  

# 10.62.3 Description  

Specifies a frequency at which fields are computed for the case where time filters are being applied.  

# 10.62.4 Restrictions  

Must be used with fix atc hardy and is only relevant when time filters are being used.  

# 10.62.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.62.6 Default  

None.  

# 10.63 fix_modify AtC set reference_potential_energy command  

# 10.63.1 Syntax  

fix_modify <AtC fixID> set reference_potential_energy [<value|filename>] • AtC fixID $=$ ID of fix atc instance • set reference_potential_energy $=$ name of the AtC sub-command • value $=$ optional user specified zero point for PE in native LAMMPS energy units • filename $=$ optional user specified string for file of nodal PE values to be read-in  

# 10.63.2 Examples  

fix_modify AtC set reference_potential_energy fix_modify AtC set reference_potential_energy -0.05 fix_modify AtC set reference_potential_energy myPEvalues  

# 10.63.3 Description  

Used to set various quantities for the post-processing algorithms. It sets the zero point for the potential energy density using the value provided for all nodes, or from the current configuration of the lattice if no value is provided, or values provided within the specified filename.  

# 10.63.4 Restrictions  

Must be used with fix atc hardy or fix atc field.  

# 10.63.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.63.6 Default  

Defaults to the LAMMPS zero point i.e. isolated atoms.  

# 10.64 fix_modify AtC source command  

# 10.64.1 Syntax  

fix_modify <AtC fixID> source <field> <element_set> <value|function>  

• AtC fixID $=$ ID of fix atc instance   
• source $=$ name of the AtC sub-command   
• field $=$ field kind name valid for type of physics: temperature or electron_temperature   
• element_set $=$ name of set of elements   
• value or function $=$ value or name of function followed by its parameters  

# 10.64.2 Examples  

fix_modify AtC source temperature middle temporal_ramp 10.0 0.0  

# 10.64.3 Description  

Add domain sources to the mesh. The units are consistent with LAMMPS’s units for mass, length and time and are defined by the PDE being solved, e.g. for thermal transfer the balance equation is for energy and source is energy per time.  

# 10.64.4 Restrictions  

The keyword all is reserved and thus not available as element_set name.  

# 10.64.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC remove_source  

# 10.64.6 Default  

None.  

# 10.65 fix_modify AtC source_integration command  

# 10.65.1 Syntax  

fix_modify <AtC fixID> source_integration <fe|atom>  

• AtC fixID $\v{U}=\mathrm{ID}$ of fix atc instance • source_integration $=$ name of the AtC sub-command • fe or atom $=$ (undocumented)  

# 10.65.2 Examples  

fix_modify AtC source_integration atom  

# 10.65.3 Description  

(undocumented)  

# 10.65.4 Restrictions  

None.  

# 10.65.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.65.6 Default  

Default is fe  

# 10.66 fix_modify AtC temperature_definition command  

# 10.66.1 Syntax  

fix_modify <AtC fixID $>$ temperature_definition <kinetic|total>  

• AtC fixID $=$ ID of fix atc instance   
• temperature_definition $=$ name of the AtC sub-command   
• kinetic or total $=$ (undocumented)  

# 10.66.2 Examples  

fix_modify AtC temperature_definition kinetic  

# 10.66.3 Description  

Change the definition for the atomic temperature used to create the finite element temperature. The kinetic option is based only on the kinetic energy of the atoms while the total option uses the total energy (kinetic $^+$ potential) of an atom.  

# 10.66.4 Restrictions  

This command is only valid when using thermal coupling. Also, while not a formal restriction, the user should ensure that associating a potential energy with each atom makes physical sense for the total option to be meaningful.  

# 10.66.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.66.6 Default  

kinetic  

# 10.67 fix_modify AtC filter command  

# 10.67.1 Syntax  

fix_modify <AtC fixID> filter <on|off|equilibrate>  

• AtC fixID $=$ ID of fix atc instance • filter $=$ name of the AtC sub-command • on or off or equilibrate $=$ Select state of filter  

# 10.67.2 Examples  

# 10.67.6 Default  

off  

# 10.68 fix_modify AtC time_integration command  

# 10.68.1 Syntax  

fix_modify <AtC fixID> time_integration <descriptor>  

• AtC fixID $=$ ID of fix atc instance • time_integration $=$ name of the AtC sub-command • descriptor $=$ gear or fractional_step or verlet  

# 10.68.2 Examples  

<html><body><table><tr><td>fix_modify AtC time_integration fractional_s step</td></tr></table></body></html>  

# 10.68.3 Description  

Command to select the thermal or momentum time integration.  

Options for thermal time integration:  

gear atomic velocity update with second order Verlet, nodal temperature update with third or fourth order Gear, thermostats based on controlling power  

# fractional_step  

atomic velocity update with second order Verlet, mixed nodal temperature update, 3/4 Gear for continuum and 2 Verlet for atomic contributions, thermostats based on controlling discrete energy changes  

Options for momentum time integration:  

verlet atomic velocity update with second order Verlet, nodal temperature update with second order Verlet, kinetostats based on controlling force  

# fractional_step  

atomic velocity update with second order Verlet, mixed nodal momentum update, second order Verlet for continuum and exact second order Verlet for atomic contributions, kinetostats based on controlling discrete momentum changes  

gear  

atomic velocity update with second order Verlet, nodal temperature update with third or fourth order Gear, kinetostats based on controlling power.  

# 10.68.4 Restrictions  

None.  

# 10.68.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.68.6 Default  

None.  

# 10.69 fix_modify AtC track_displacement command  

# 10.69.1 Syntax  

fix_modify <AtC fixID $>$ track_displacement <on|off>  

• AtC fixID $=$ ID of fix atc instance   
• track_displacement $=$ name of the AtC sub-command   
• on or off $=$ (undocumented)  

# 10.69.2 Examples  

# 10.69.3 Description  

Determines whether displacement is tracked or not. For solids problems this is a useful quantity, but for fluids it is not relevant.  

# 10.69.4 Restrictions  

Some constitutive models require the displacement field.  

# 10.69.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.69.6 Default  

on  

# 10.70 fix_modify AtC unfix command  

# 10.70.1 Syntax  

fix_modify <AtC fixID> unfix <field> <nodeset>  

• AtC fixID $=$ ID of fix atc instance   
• unfix $=$ name of the AtC sub-command   
• field $=$ field kind name valid for type of physics: temperature or electron_temperature   
• nodeset $=$ name of set of nodes to apply boundary condition  

# 10.70.2 Examples  

fix_modify AtC unfix temperature groupNAME  

# 10.70.3 Description  

Removes constraint on field values for specified nodes.  

# 10.70.4 Restrictions  

The keyword all is reserved and thus not available as nodeset name.  

# 10.70.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC fix  

# 10.70.6 Default  

None.  

# 10.71 fix_modify AtC unfix_flux command  

# 10.71.1 Syntax  

fix_modify <AtC fixID> unfix_flux <field> <face_set> <value|function>  

• AtC fixID $=$ ID of fix atc instance   
• unfix_flux $=$ name of the AtC sub-command   
• field $=$ field kind name valid for type of physics: temperature or electron_temperature   
• face_set $=$ name of set of element faces  

# 10.71.2 Examples  

fix_modify AtC unfix_flux temperature faceSet  

# 10.71.3 Description  

Command for removing prescribed normal fluxes e.g. heat_flux, stress.  

# 10.71.4 Restrictions  

None.  

# 10.71.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC fix_flux  

# 10.71.6 Default  

None.  

# 10.72 fix_modify AtC write_atom_weights command  

# 10.72.1 Syntax  

fix_modify <AtC fixID> write_atom_weights $<$ <filename> <frequency> • AtC fixID $=$ ID of fix atc instance • write_atom_weights $=$ name of the AtC sub-command • filename $=$ name of file that atomic weights are written to • frequency $=$ how often writes will occur  

# 10.72.2 Examples  

fix_modify AtC write_atom_weights atm_wt_file.txt 10  

# 10.72.3 Description  

Command for writing the values of atomic weights to a specified file.  

# 10.72.4 Restrictions  

None.  

# 10.72.5 Related AtC commands  

• fix_modify AtC command overview  

# 10.72.6 Default  

None  

# 10.73 fix_modify AtC write_restart command  

# 10.73.1 Syntax  

fix_modify <AtC fixID> write_restart <file_name>  

• AtC fixID $=$ ID of fix atc instance • write_restart $=$ name of the AtC sub-command • file_name $=$ name of AtC restart file  

# 10.73.2 Examples  

fix_modify AtC write_restart restart.mydata.AtC  

# 10.73.3 Description  

Dumps the current state of the fields to a named text-based restart file. This done when the command is invoked and not repeated, unlike the otherwise similar LAMMPS command.  

# 10.73.4 Restrictions  

None.  

# 10.73.5 Related AtC commands  

• fix_modify AtC command overview • fix_modify AtC read_restart  

# 10.73.6 Default  

None.  

# BIBLIOGRAPHY  

(Abascal1) Abascal, Sanz, Fernandez, Vega, J Chem Phys, 122, 234511 (2005)   
(Abascal2) Abascal, J Chem Phys, 123, 234505 (2005)   
(Ackland) Ackland, Jones, Phys Rev B, 73, 054104 (2006).   
(Ackland1) Ackland, Condensed Matter (2005).   
(Ackland2) Ackland, Mendelev, Srolovitz, Han and Barashev, Journal of Physics: Condensed Matter, 16, S2629 (2004).   
(Addington) Addington, Long, Gubbins, J Chem Phys, 149, 084109 (2018).   
(Adhikari et al.) Adhikari, R., Stratford, K., Cates, M. E., and Wagner, A. J., Fluctuating lattice Boltzmann, Europhys. Lett. 71 (2005) 473-479.   
(Afshar) Afshar, F. Schmid, A. Pishevar, S. Worley, Comput Phys Comm, 184, 1119-1128 (2013).   
(Agnolin and Roux 2007) Agnolin, I. & Roux, J-N. (2007). Internal states of model isotropic granular packings. I. Assembling process, geometry, and contact networks. Phys. Rev. E, 76, 061302.   
(Ahrens-Iwers2022) Ahrens-Iwers et al., J. Chem. Phys. 157, 084801 (2022).   
(Ahrens-Iwers) Ahrens-Iwers and Meissner, J. Chem. Phys. 155, 104104 (2021).   
(Aktulga) Aktulga, Fogarty, Pandit, Grama, Parallel Computing, 38, 245-259 (2012).   
(Albe) J. Nord, K. Albe, P. Erhart, and K. Nordlund, J. Phys.: Condens. Matter, 15, 5649(2003).   
(Albe1) K. Albe, K. Nordlund, J. Nord, and A. Kuronen, Phys. Rev. B, 66, 035205 (2002).   
(Allen) Allen and Germano, Mol Phys 104, 3225-3235 (2006).   
LAMMPS Documentation, Release 4Feb2025   
(AllenTildesley) Allen and Tildesley, Computer Simulation of Liquids, Oxford University Press (1987)   
(Allinger) Allinger, Yuh, Lii, JACS, 111(23), 8551-8566 (1989),   
(Andersen) H. Andersen, J of Comp Phys, 52, 24-34 (1983).   
(Anderson) Anderson, Mukherjee, Critchley, Ziegler, and Lipton “POEMS: Parallelizable Open-source Efficient Multibody Software “, Engineering With Computers (2006).   
(Appshaw) Appshaw, Seddon, Hanna, Soft. Matter,18, 1747(2022).   
(Avendano) C. Avendano, T. Lafitte, A. Galindo, C. S. Adjiman, G. Jackson, E. Muller, J Phys Chem B, 115, 11154 (2011).   
(Axilrod) Axilrod and Teller, J Chem Phys, 11, 299 (1943); Muto, Nippon Sugaku-Buturigakkwaishi 17, 629 (1943).   
(Babadi) Babadi, Ejtehadi, Everaers, J Comp Phys, 219, 770-779 (2006).   
(Babadi2) Babadi and Ejtehadi, EPL, 77 (2007) 23002.   
(Baczewski) A.D. Baczewski and S.D. Bond, J. Chem. Phys. 139, 044107 (2013).   
(Bal) K. M Bal and E. C. Neyts, J. Chem. Phys. 141, 204104 (2014).   
(Ball) Ball and Melrose, Physica A, 247, 444-472 (1997).   
(Ballenegger) Ballenegger, Arnold, Cerda, J Chem Phys, 131, 094107 (2009).   
(Barrat) Barrat and Rodney, J. Stat. Phys, 144, 679 (2011).   
(Barrett) Barrett, Tschopp, El Kadiri, Scripta Mat. 66, p.666 (2012).   
(Barros) Barros, Sinkovits, Luijten, J. Chem. Phys, 140, 064903 (2014)   
(Bartok) Bartok, Payne, Risi, Csanyi, Phys Rev Lett, 104, 136403 (2010).   
(Bartok2010) Bartok, Payne, Risi, Csanyi, Phys Rev Lett, 104, 136403 (2010).   
(Bartok2013) Bartok, Kondor, Csanyi, Phys Rev B, 87, 184115 (2013).   
(Bartok_PhD) A Bartok-Partay, PhD Thesis, University of Cambridge, (2010).   
(Baskes) Baskes, Phys Rev B, 46, 2727-2742 (1992). LAMMPS Documentation, Release 4Feb2   
(Baskes2) Baskes, Phys Rev B, 75, 094113 (2007).   
(Beck) Beck, Molecular Physics, 14, 311 (1968).   
(Becton) Becton, Averett, Wang, Biomech. Model. Mechanobiology, 18, 425-433(2019).   
(Behler and Parrinello 2007) Behler, J.; Parrinello, M. Phys. Rev. Lett. 2007, 98 (14), 146401.   
(Bennet) Bennet, J Comput Phys, 22, 245 (1976)   
(Berardi) Berardi, Fava, Zannoni, Chem Phys Lett, 297, 8-14 (1998). Berardi, Muccioli, Zannoni, J Chem Phys, 024905 (2008).   
(Berendsen) Berendsen, Postma, van Gunsteren, DiNola, Haak, J Chem Phys, 81, 3684 (1984).   
(Berendsen2) Berendsen, Grigera, Straatsma, J Phys Chem, 91, 6269-6271 (1987).   
(Bessarab) Bessarab, Uzdin, Jonsson, Comp Phys Comm, 196, 335-347 (2015).   
(Beutler) Beutler, Mark, van Schaik, Gerber, van Gunsteren, Chem Phys Lett, 222, 529 (1994).   
(Bird) G. A. Bird, “Molecular Gas Dynamics and the Direct Simulation of Gas Flows” (1994).   
(Bitzek) Bitzek, Koskinen, Gahler, Moseler, Gumbsch, Phys Rev Lett, 97, 170201 (2006).   
(Bolintineanu1) Bolintineanu, Lechman, Plimpton, Grest, Phys Rev E, 86, 066703 (2012).   
(Bolintineanu2) Bolintineanu, Grest, Lechman, Pierce, Plimpton, Schunk, Comp Particle Mechanics, 1, 321-356 (2014).   
(Bomont) Bomont, Bretonnet, J. Chem. Phys. 124, 054504 (2006).   
(Bond) Bond and Leimkuhler, SIAM J Sci Comput, 30, p 134 (2007).   
(Boone) Boone, Babaei, Wilmer, J Chem Theory Comput, 15, 5579–5587 (2019).   
(BoreschKarplus) Boresch and Karplus, J Phys Chem A, 103, 103 (1999).   
(Botu1) V. Botu and R. Ramprasad, Int. J. Quant. Chem., 115(16), 1074 (2015).   
(Botu2) V. Botu and R. Ramprasad, Phys. Rev. B, 92(9), 094306 (2015).   
(Botu3) V. Botu, R. Batra, J. Chapman and R. Ramprasad, https://arxiv.org/abs/1610.02098 (2016).   
(Branicio2009) Branicio, Rino, Gan and Tsuzuki, J. Phys Condensed Matter 21 (2009) 095002   
(Brennan) Brennan, J Chem Phys Lett, 5, 2144-2149 (2014).   
(Brenner) Brenner, Shenderova, Harrison, Stuart, Ni, Sinnott, J Physics: Condensed Matter, 14, 783-802 (2002).   
(Brilliantov) Brilliantov, Spahn, Hertzsch, Poschel, Phys Rev E, 53, p 5382-5392 (1996).   
(Brooks) Brooks, Brooks, MacKerell Jr., J Comput Chem, 30, 1545 (2009).   
(Brooks) Brooks, et al, J Comput Chem, 30, 1545 (2009).   
(Brown) Brown et al. International Tables for Crystallography Volume C: Mathematical and Chemical Tables, 554- (2004).   
(Buck) Buck, Bouguet-Bonnet, Pastor, MacKerell Jr., Biophys J, 90, L36 (2006).   
(Bulacu) Bulacu, Goga, Zhao, Rossi, Monticelli, Periole, Tieleman, Marrink, J Chem Theory Comput, 9, 3282-3292   
(Bussi) G. Bussi, T. Zykova-Timan, M. Parrinello, J Chem Phys, 130, 074101 (2009).   
(Bussi1) Bussi, Donadio and Parrinello, J. Chem. Phys. 126, 014101(2007)   
(Bussi2) Bussi and Parrinello, Phys. Rev. E 75, 056707 (2007)   
(COMB_1) J. Yu, S. B. Sinnott, S. R. Phillpot, Phys Rev B, 75, 085311 (2007),   
(COMB_2) T.-R. Shan, B. D. Devine, T. W. Kemper, S. B. Sinnott, and S. R. Phillpot, Phys. Rev. B 81, 125328 (2010)   
(COMB3) T. Liang, T.-R. Shan, Y.-T. Cheng, B. D. Devine, M. Noordhoek, Y. Li, Z. Lu, S. R. Phillpot, and S. B. Sinno Mat. Sci. & Eng: R 74, 255-279 (2013).   
(Calhoun) A. Calhoun, M. Pavese, G. Voth, Chem Phys Letters, 262, 415 (1996).   
(Campana) C. Campana and M. H. Muser, Phys. Rev. B [74], 075420 (2006).   
(Cao1) J. Cao and B. Berne, J Chem Phys, 99, 2902 (1993).   
(Cao2) J. Cao and G. Voth, J Chem Phys, 100, 5093 (1994).   
(Caro) A Caro, DA Crowson, M Caro; Phys Rev Lett, 95, 075702 (2005)   
(CasP) CasP webpage: http://www.casp-program.org/   
(Cawkwell2012) A. M. N. Niklasson, M. J. Cawkwell, Phys. Rev. B, 86 (17), 174308 (2012).   
(Cercignani) C. Cercignani and M. Lampis. Trans. Theory Stat. Phys. 1, 2, 101 (1971).   
(Cerda) Cerda, Ballenegger, Lenz, Holm, J Chem Phys 129, 234104 (2008)   
(Ceriotti) M. Ceriotti, M. Parrinello, T. Markland, D. Manolopoulos, J. Chem. Phys. 133, 124104 (2010).   
(Ceriotti1) Ceriotti, Bussi and Parrinello, J Chem Theory Comput 6, 1170-80 (2010)   
(Ceriotti2) Ceriotti, Bussi and Parrinello, Phys Rev Lett 103, 030603 (2009)   
(Cerutti) Cerutti, Duke, Darden, Lybrand, Journal of Chemical Theory and Computation 5, 2322 (2009)   
(Chen) J Chen, D Tzou and J Beraun, Int. J. Heat Mass Transfer, 49, 307-316 (2006).   
(Chenoweth_2008) Chenoweth, van Duin and Goddard, Journal of Physical Chemistry A, 112, 1040-1053 (2008).   
(Clarke) Clarke and Smith, J Chem Phys, 84, 2290 (1986).   
(Clavier) G. Clavier, N. Desbiens, E. Bourasseau, V. Lachet, N. Brusselle-Dupend and B. Rousseau, Mol Sim, 43, 1413 (2017).   
(Clemmer) Clemmer and Robbins, Phys. Rev. Lett. (2022).   
(Clemmer1) Clemmer, Monti, Lechman, Soft Matter, 20, 1702 (2024).   
(Clemmer2) Clemmer, Pierce, O’Connor, Nevins, Jones, Lechman, Tencer, Appl. Math. Model., 130, 310-326 (2024).   
(Coleman) Coleman, Spearot, Capolungo, MSMSE, 21, 055020 (2013).   
(Colliex) Colliex et al. International Tables for Crystallography Volume C: Mathematical and Chemical Tables, 249-429 (2004).   
(Cooke) “Cooke, Kremer and Deserno, Phys. Rev. E, 72, 011506 (2005)”   
(Cornell) Cornell, Cieplak, Bayly, Gould, Merz, Ferguson, Spellmeyer, Fox, Caldwell, Kollman, JACS 117, 5179-5197 (1995).   
(Cundall, 1987) Cundall, P. A. Distinct Element Models of Rock and Soil  

# (Curk1)  

T. Curk, J. Yuan, and E. Luijten, JCP 156 (2022). (Curk2) T. Curk and E. Luijten, PRL 126 (2021)  

(Cusentino) Cusentino, Wood, Thompson, J Phys Chem A, 124, 5456, (2020)   
(Daivis and Todd) Daivis and Todd, J Chem Phys, 124, 194103 (2006).   
(Daivis and Todd) Daivis and Todd, Nonequilibrium Molecular Dynamics (book), Cambridge University Press, https://doi.org/10. 1017/9781139017848, (2017).   
(Dammak) Dammak, Chalopin, Laroche, Hayoun, and Greffet, Phys Rev Lett, 103, 190601 (2009).   
(Darden) Darden, York, Pedersen, J Chem Phys, 98, 10089 (1993).   
(Davidchack) R.L Davidchack, T.E. Ouldridge, and M.V. Tretyakov. J. Chem. Phys. 142, 144114 (2015).   
(Daw1) Daw, Baskes, Phys Rev Lett, 50, 1285 (1983). Daw, Baskes, Phys Rev B, 29, 6443 (1984).   
(Daw2) M. S. Daw, and M. I. Baskes, Phys. Rev. B, 29, 6443 (1984).   
(de Buyl) de Buyl, Colberg and Hofling, Comp. Phys. Comm. 185(6), 1546-1553 (2014) -   
(Deissenbeck) Deissenbeck et al., Phys. Rev. Letters 126, 136803 (2021).   
(de Koning) de Koning and Antonelli, Phys Rev E, 53, 465 (1996).   
(DeVane) Shinoda, DeVane, Klein, Soft Matter, 4, 2453-2462 (2008).   
(Deserno) Deserno and Holm, J Chem Phys, 109, 7694 (1998).   
(Destree) M. Destree, F. Laupretre, A. Lyulin, and J.-P. Ryckaert, J Chem Phys, 112, 9632 (2000).   
(Dickel) Dickel, Francis, and Barrett, Computational Materials Science 171 (2020): 109157.   
(Dietz) Dietz and Hoy, J. Chem Phys, 156, 014103 (2022).   
(Dobson) Dobson, J Chem Phys, 141, 184103 (2014).   
(Drautz) Drautz, Phys Rev B, 99, 014104 (2019).   
(Duffy) D M Duffy and A M Rutherford, J. Phys.: Condens. Matter, 19, 016207-016218 (2007). LAMMPS Documentation, Release 4Feb2025   
(Dufils) Dufils et al., Phys. Rev. Letters 123, 195501 (2019).   
(Dullweber) Dullweber, Leimkuhler and McLachlan, J Chem Phys, 107, 5840 (1997).   
(Dunn1) Dunn and Noid, J Chem Phys, 143, 243148 (2015).   
(Dunn2) Dunn, Lebold, DeLyser, Rudzinski, and Noid, J. Phys. Chem. B, 122, 3363 (2018).   
(Dunweg) Dunweg and Paul, Int J of Modern Physics C, 2, 817-27 (1991).   
(EcheverriRestrepo) Echeverri Restrepo, Andric, Comput Mater Sci, 218, 111978 (2023).   
(EDIP) J F Justo et al, Phys Rev B 58, 2539 (1998).   
(Eike) Eike and Maginn, Journal of Chemical Physics, 124, 164503 (2006).   
(Elliott) Elliott, Tadmor and Bernstein, https://openkim.org/kim-api (2011) doi: https://doi.org/10.25950/FF8F563A   
(Ellis) Ellis, Fiedler, Popoola, Modine, Stephens, Thompson, Cangi, Rajamanickam, Phys Rev B, 104, 035120, (2021)   
(Emmrich) Emmrich, Weckner, Commun. Math. Sci., 5, 851-864 (2007),   
(Elstner) M. Elstner, D. Poresag, G. Jungnickel, J. Elsner, M. Haugk, T. Frauenheim, S. Suhai, and G. Seifert, Phys. Rev. B, 58, 7260 (1998).   
(Erdmann) U. Erdmann , W. Ebeling, L. Schimansky-Geier, and F. Schweitzer, Eur. Phys. J. B 15, 105-113, 2000.   
(Eshelby) J.D. Eshelby, Philos. Trans. Royal Soc. London A, Math. Phys. Sci., Vol. 244, No. 877 (1951) pp. 87-112; J. Elasticity, Vol. 5, Nos. 3-4 (1975) pp. 321-335]   
(Espanol and Revenga) Espanol, Revenga, Physical Review E, 67, 026705 (2003).   
(Espanol1997) Espanol, Europhys Lett, 40(6): 631-636 (1997). DOI:10.1209/epl/i1997-00515-8   
(Evans and Morriss) Evans and Morriss, Phys Rev A, 30, 1528 (1984).   
(Evans) Evans and Morriss, Phys. Rev. Lett. 56, 2172 (1986).   
(Everaers) Everaers and Ejtehadi, Phys Rev E, 67, 041710 (2003).   
(Faken) Faken, Jonsson, Comput Mater Sci, 2, 279 (1994).   
(Falk) Falk and Langer PRE, 57, 7192 (1998).   
(Fath) Fath, Hochbruck, Singh, J Comp Phys, 333, 180-198 (2017).   
(Feng1) 26. Feng, . . . , and W. Ouyang, J. Phys. Chem. C. 127(18), 8704-8713 (2023).   
(Feng2) 26. Feng, . . . , and W. Ouyang, Langmuir 39(50), 18198-18207 (2023).   
(Fennell) C. J. Fennell, J. D. Gezelter, J Chem Phys, 124, 234104 (2006).   
(Feynman) R. Feynman and A. Hibbs, Chapter 7, Quantum Mechanics and Path Integrals, McGraw-Hill, New York (1   
(Fichthorn) Fichthorn, Balankura, Qi, CrystEngComm, 18(29), 5410-5417 (2016).   
(Fily) Y. Fily and M.C. Marchetti, Phys. Rev. Lett. 108, 235702, 2012. Default   
(Fincham) Fincham, Mackrodt and Mitchell, J Phys Condensed Matter, 6, 393-404 (1994).   
(Finnis1) Finnis, Sinclair, Philosophical Magazine A, 50, 45 (1984).   
(Finnis2) M. W. Finnis, A. T. Paxton, M. Methfessel, and M. van Schilfgarde, Phys. Rev. Lett., 81, 5149 (1998).   
(Fiorin) Fiorin, Klein, Henin, Mol. Phys., DOI:10.1080/00268976.2013.813594   
(Fox) Fox, O’Keefe, Tabbernor, Acta Crystallogr. A, 45, 786-93 (1989).   
(Fraige) F. Y. Fraige, P. A. Langston, A. J. Matchett, J. Dodds, Particuology, 6, 455 (2008).   
(Freitas) Freitas, Asta, and de Koning, Computational Materials Science, 112, 333 (2016).   
(Frenkel) Frenkel and Smit, Understanding Molecular Simulation, Academic Press, London, 2002.   
(Fu) Fu, Peng, Yuan, Kfoury, Young, Comput. Phys. Commun, 210, 193-203(2017).   
(Gao) Gao and Weber, Nuclear Instruments and Methods in Physics Research B 191 (2012) 504.   
(Gingrich) Gingrich, MSc thesis <https://gingrich.chem.northwestern.edu/papers/ThesiswCorrections.pdf>\` (2010).   
(Gissinger2017) Gissinger, Jensen and Wise, Polymer, 128, 211-217 (2017).   
(Gissinger2020) Gissinger, Jensen and Wise, Macromolecules, 53, 22, 9953-9961 (2020).   
(Gissinger) Jacob R. Gissinger, Scott R. Zavada, Joseph G. Smith, Josh Kemppainen, Ivan Gallegos, Gregory M. Ode Emilie J. Siochi, and Kristopher E. Wise, Carbon, 202, 336-347 (2023).  

# (Gissinger2024)  

R. Gissinger, I. Nikiforov, Y. Afshar, B. Waters, M. Choi, D. S. Karls, A. Stukowski, W. Im, Kohlmeyer, and E. B. Tadmor, J Phys Chem B, 128, 3282-3297 (2024).   
(Gloor) Gloor, J Chem Phys, 123, 134703 (2005)   
(Glosli) Glosli, unpublished, 2005. Streitz, Glosli, Patel, Chan, Yates, de Supinski, Sexton and Gunnels Physics: Conference Series, 46, 254 (2006).   
(Goff) Goff, Zhang, Negre, Rohskopf, Niklasson, Journal of Chemical Theory and Computation 19, no. 1   
(Goldman1) Goldman, Reed and Fried, J. Chem. Phys. 131, 204103 (2009)   
(Goldman2) Goldman, Srinivasan, Hamel, Fried, Gaus, and Elstner, J. Phys. Chem. C, 117, 7885 (2013).   
(Grime) Grime and Voth, to appear in J Chem Theory & Computation (2014).   
(Grimme) Grimme, J Comput Chem, 27(15), 1787-1799 (2006).   
(Gronbech-Jensen1) Gronbech Jensen and Gronbech-Jensen, Mol Phys, 117, 2511 (2019)   
(Gronbech-Jensen2) Gronbech-Jensen and Farago, Mol Phys, 111, 983 (2013)   
(Gronbech-Jensen3) Hayre, and Farago, Comp Phys Comm, 185, 524 (2014)   
(Groot) Groot and Warren, J Chem Phys, 107: 4423-4435 (1997). DOI:10.1063/1.474784   
(Guenole) Guenole, Noehring, Vaid, Houlle, Xie, Prakash, Bitzek, Comput Mater Sci, 175, 109584 (2020).   
(Gullet) Gullet, Wagner, Slepoy, SANDIA Report 2003-8782 (2003). DOI:10.2172/918395   
(Guo) Guo and Thirumalai, Journal of Molecular Biology, 263, 323-43 (1996).   
(Gupta) Gupta ,Phys Rev. B, 23, 6265-6270 (1981).   
(Hardy) David Hardy thesis: Multilevel Summation for the Fast Evaluation of Forces for the Simulation of B University of Illinois at Urbana-Champaign, (2006).   
(Hardy2) Hardy, Stone, Schulten, Parallel Computing, 35, 164-177 (2009).   
(Hecht) Hecht, Harting, Ihle, Herrmann, Phys Rev E, 72, 011408 (2005).   
(Henkelman1) Henkelman and Jonsson, J Chem Phys, 113, 9978-9985 (2000).   
LAMMPS Documentation, Release 4Feb2025   
(Henkelman2) Henkelman, Uberuaga, Jonsson, J Chem Phys, 113, 9901-9904 (2000).   
(Henkes) Henkes, S, Fily, Y., and Marchetti, M. C. Phys. Rev. E, 84, 040301(R), 2011.   
(Henrich) O. Henrich, Y. A. Gutierrez-Fosado, T. Curk, T. E. Ouldridge, Eur. Phys. J. E 41, 57 (2018)   
(Herman) M. F. Herman, E. J. Bruskin, B. J. Berne, J Chem Phys, 76, 5150 (1982).   
(Hess) Hess, B. The Journal of Chemical Physics 2002, 116 (1), 209-217.   
(Heyes) Heyes, Phys Rev B, 49, 755 (1994).   
(Hijazi) M. Hijazi, D. M. Wilkins, M. Ceriotti, J. Chem. Phys. 148, 184109 (2018)   
(Hockney) Hockney and Eastwood, Computer Simulation Using Particles, Adam Hilger, NY (1989).   
(Holian) Holian and Ravelo, Phys Rev B, 51, 11275 (1995).   
(Hone) T. Hone, P. Rossky, G. Voth, J Chem Phys, 124, 154103 (2006).   
(Hoover) Hoover, Phys Rev A, 31, 1695 (1985).   
(Huang) Huang, Zhang, Yuan, Gao, Zhang, Nano Lett. 13, 4546(2013).   
(Huang2014) X. Huang, “Exploring critical-state behavior using DEM”, Doctoral dissertation, Imperial College. (2014). https://doi.org/10.25560/25316   
(Hu) Hu, and Adams J. Comp. Physics, 213, 844-861 (2006).   
(Hu) Hu, J. Chem. Theory Comput. 10, 5254 (2014).   
(Hummer) Hummer, Gronbech-Jensen, Neumann, J Chem Phys, 109, 2791 (1998)   
(Hunt) Hunt, Mol Simul, 42, 347 (2016).   
(Ikeshoji) Ikeshoji and Hafskjold, Molecular Physics, 81, 251-261 (1994).   
(Ikeshoji2) Ikeshoji, Hafskjold, Furuholt, Mol Sim, 29, 101-109, (2003).   
(Ilie) Ilie, Briels, den Otter, Journal of Chemical Physics, 142, 114103 (2015).   
(In ‘t Veld) In ‘t Veld, Ismail, Grest, J Chem Phys (accepted) (2007).  

(IPI) https://ipi-code.org/ <https://ipi-code.org/>   
(IPI-CPC) Ceriotti, More and Manolopoulos, Comp Phys Comm, 185, 1019-1026 (2014).   
(Isele-Holder) Isele-Holder, Mitchell, Ismail, J Chem Phys, 137, 174107 (2012).   
(Isele-Holder2) Isele-Holder, Mitchell, Hammond, Kohlmeyer, Ismail, J Chem Theory Comput 9, 5412 (2013).   
(Ismail) Ismail, Tsige, In ‘t Veld, Grest, Molecular Physics (accepted) (2007).   
(Ivanov) Ivanov, Uzdin, Jonsson. arXiv preprint arXiv:1904.02669, (2019).   
(Izrailev) Izrailev, Stepaniants, Isralewitz, Kosztin, Lu, Molnar, Wriggers, Schulten. Computational Molecular Dynamics: Challenges, Methods, Ideas, volume 4 of Lecture Notes in Computational Science and   
(Izvekov) Izvekov, Voth, J Chem Phys 123, 134105 (2005).   
(Jadhao) Jadhao, Solis, Olvera de la Cruz, J Chem Phys, 138, 054119 (2013)   
(Janssens) Janssens, Olmsted, Holm, Foiles, Plimpton, Derlet, Nature Materials, 5, 124-127 (2006).   
(Jaramillo-Botero) Jaramillo-Botero, Su, Qi, Goddard, Large-scale, Long-term Non-adiabatic Electron Molecular Dynamics for Describing Material Properties and Phenomena in Extreme Environments, J Comp   
(Jarzynski) Jarzynski, Phys. Rev. Lett. 78, 2690 (1997)   
(Jiang) Jiang, Hardy, Phillips, MacKerell, Schulten, and Roux, J Phys Chem Lett, 2, 87-92 (2011).   
(Jiang1) Jiang, Hardy, Phillips, MacKerell, Schulten, and Roux, J Phys Chem Lett, 2, 87-92 (2011).   
(Jiang2) J.-W. Jiang, Nanotechnology 26, 315706 (2015).   
(Jiang3) J.-W. Jiang, Acta Mech. Solida. Sin 32, 17 (2019).   
(Johnson et al, 1971) Johnson, K. L., Kendall, K., & Roberts, A. D. (1971). Surface energy and the contact of elastic solids. Proc. R. Soc. Lond. A, 324(1558), 301-313.   
(Jones) Jones, RE; Templeton, JA; Wagner, GJ; Olmsted, D; Modine, JA, “Electron transport enhanced molecular dynamics for metals and semi-metals.” International Journal for Numerical Methods in Engineering (2010), 83:940.   
(Jonsson) Jonsson, Mills and Jacobsen, in Classical and Quantum Dynamics in Condensed Phase Simulations, edited by Berne, Ciccotti, and Coker World Scientific, Singapore, 1998, p 385.   
LAMMPS Documentation, Release 4Feb2025   
(Jorgensen) Jorgensen, Chandrasekhar, Madura, Impey, Klein, J Chem Phys, 79, 926 (1983).   
(Jusufi) Jusufi, Hynninen, and Panagiotopoulos, J Phys Chem B, 112, 13783 (2008).   
(Kamberaj) Kamberaj, Low, Neal, J Chem Phys, 122, 224114 (2005).   
(Katsura) H. Katsura, N. Nagaosa, A.V. Balatsky. Phys. Rev. Lett., 95(5), 057205. (2005)   
(Kelchner) Kelchner, Plimpton, Hamilton, Phys Rev B, 58, 11085 (1998).   
(Khrapak) Khrapak, Chaudhuri, and Morfill, J Chem Phys, 134, 054120 (2011).   
(Kim) Kim, Keyes, Straub, J Chem. Phys, 132, 224107 (2010).   
(Klapp) Klapp, Schoen, J Chem Phys, 117, 8050 (2002).   
(Kolafa) Kolafa and Perram, Molecular Simulation, 9, 351 (1992).   
(Kolmogorov) A. N. Kolmogorov, V. H. Crespi, Phys. Rev. B 71, 235415 (2005).   
(Kong) L.T. Kong, G. Bartels, C. Campana, C. Denniston, and Martin H. Muser, Computer Physics Communications [180](6):1004-1010 (2009).   
(Kong2011) L.T. Kong, Computer Physics Communications [182](10):2201-2207, (2011).   
(Kremer) Kremer, Grest, J Chem Phys, 92, 5057 (1990).   
(Kuhn and Bagi, 2005) Kuhn, M. R., & Bagi, K. (2004). Contact rolling and deformation in granular media. International journal of solids and structures, 41(21), 5793-5820.   
(Kumagai) T. Kumagai, S. Izumi, S. Hara, S. Sakai, Comp. Mat. Science, 39, 457 (2007).   
(Kumar) Kumar and Higdon, Phys Rev E, 82, 051401 (2010).   
(Kumar) Kumar and Skinner, J. Phys. Chem. B, 112, 8311 (2008)   
(Lafourcade) Lafourcade, Maillet, Denoual, Duval, Allera, Goryaeva, and Marinica, Comp. Mat. Science, 230, 112534 (2023)   
(Lamoureux and Roux) G. Lamoureux, B. Roux, J. Chem. Phys 119, 3025 (2003)   
(Lamoureux) Lamoureux and Roux, J Chem Phys, 119, 3025-3039 (2003).   
(Landsgesell)  

J. Landsgesell, P. Hebbeker, O. Rud, R. Lunkad, P. Kosovan, and C. Holm, Macromolecules 53, 3007-3020 (2020).  

# (Larentzos1)  

J.P. Larentzos, J.K. Brennan, J.D. Moore, M. Lisal and W.D. Mattson, Comput. Phys. Commun., 185, 1987-1998 (2014).   
(Larentzos2) J.P. Larentzos, J.K. Brennan, J.D. Moore, and W.D. Mattson, ARL-TR-6863, U.S. Army Research Laboratory, Aberdeen Proving Ground, MD (2014).   
(Larsen) Larsen, Schmidt, Schiotz, Modelling Simul Mater Sci Eng, 24, 055007 (2016).   
(Lebedeva1) I. V. Lebedeva, A. A. Knizhnik, A. M. Popov, Y. E. Lozovik, B. V. Potapkin, Phys. Rev. B, 84, 245437 (2011)   
(Lebedeva2) I. V. Lebedeva, A. A. Knizhnik, A. M. Popov, Y. E. Lozovik, B. V. Potapkin, Physica E: 44, 949-954 (2012)   
(Lechman) Lechman, et al, in preparation (2010).   
(Lee) Lee, Baskes, Phys. Rev. B, 62, 8564-8567 (2000).   
(Lee2) Lee, Baskes, Kim, Cho. Phys. Rev. B, 64, 184102 (2001).   
(Lee2020) C.W. Lee, et al. (2020) Physical Review B, 102(2), 024107.   
(Lenart) Lenart , Jusufi, and Panagiotopoulos, J Chem Phys, 126, 044509 (2007).   
(Lenosky) Lenosky, Sadigh, Alonso, Bulatov, de la Rubia, Kim, Voter, Kress, Modelling Simulation Materials Science Engineering, 8, 825 (2000).   
(Leven1) I. Leven, I. Azuri, L. Kronik and O. Hod, J. Chem. Phys. 140, 104106 (2014).   
(Leven2) I. Leven et al, J. Chem.Theory Comput. 12, 2896-905 (2016).   
(Li2013_POF) Li, Hu, Wang, Ma, Zhou, Phys Fluids, 25: 072103 (2013). DOI:10.1063/1.4812366.   
(Li2014_JCP) Li, Tang, Lei, Caswell, Karniadakis, J Comput Phys, 265: 113-127 (2014). DOI:10.1016/j.jcp.2014.02.003.   
(Li2015_CC) Li, Tang, Li, Karniadakis, Chem Commun, 51: 11038-11040 (2015). DOI:10.1039/C5CC01684C.   
(Li2015_JCP) Li, Yazdani, Tartakovsky, Karniadakis, J Chem Phys, 143: 014101 (2015). DOI:10.1063/1.4923254.   
(Liang) Liang, Phillpot, Sinnott Phys. Rev. B79 245110, (2009), Erratum: Phys. Rev. B85 199903(E), (2012)   
(Lisal) M. Lisal, J.K. Brennan, J. Bonet Avalos, J. Chem. Phys., 135, 204105 (2011).  

(Liu1) L. Liu, Y. Liu, S. V. Zybin, H. Sun and W. A. Goddard, Journal of Physical Chemistry A, 115, 11016-11022 (2011).  

(Liu2) Liu, Bryantsev, Diallo, Goddard III, J. Am. Chem. Soc 131 (8) 2798 (2009)   
(Los and Fasolino) J. H. Los and A. Fasolino, Phys. Rev. B 68, 024107 (2003).   
(Los2017) J. H. Los et al. “Extended Tersoff potential for boron nitride: Energetics and elastic properties of pristine and defective h-BN”, Phys. Rev. B 96 (184108), 2017.   
(Luding, 2008) Luding, S. (2008). Cohesive, frictional powders: contact models for tension. Granular matter, 10(4), 235.   
(Lysogorskiy) Lysogorskiy, van der Oord, Bochkarev, Menon, Rinaldi, Hammerschmidt, Mrovec, Thompson, Csanyi, Ortner, Drautz, npj Comp Mat, 7, 97 (2021).   
(Lysogorskiy21) Lysogorskiy, van der Oord, Bochkarev, Menon, Rinaldi, Hammerschmidt, Mrovec, Thompson, Csanyi, Ortner, Drautz, npj Comp Mat, 7, 97 (2021).   
(Lysogorskiy23) Lysogorskiy, Bochkarev, Mrovec, Drautz, Phys Rev Mater, 7, 043801 (2023) / arXiv:2212.08716 (2022).   
(Maaravi) T. Maaravi et al, J. Phys. Chem. C 121, 22826-22835 (2017).   
(MacKerell) MacKerell, Bashford, Bellott, Dunbrack, Evanseck, Field, Fischer, Gao, Guo, Ha, et al, J Phys Chem B, 102, 3586 (1998).   
(Mackay and Denniston) Mackay, F. E., and Denniston, C., Coupling MD particles to a lattice-Boltzmann fluid through the use of conservative forces, J. Comput. Phys. 237 (2013) 289-298.   
(Mackay et al.) Mackay, F. E., Ollila, S.T.T., and Denniston, C., Hydrodynamic Forces Implemented into LAMMPS through a lattice-Boltzmann fluid, Computer Physics Communications 184 (2013) 2021-2031.   
(Magda) Magda, Tirrell, Davis, J Chem Phys, 83, 1888-1901 (1985); erratum in JCP 84, 2901 (1986).   
(Maginn) Kelkar, Rafferty, Maginn, Siepmann, Fluid Phase Equilibria, 260, 218-231 (2007).   
(Mahoney) Mahoney, Jorgensen, J Chem Phys 112, 8910 (2000)   
(Malolepsza) Malolepsza, Secor, Keyes, J Phys Chem B 119 (42), 13379-13384 (2015).   
(Mandadapu) Mandadapu, KK; Templeton, JA; Lee, JW, “Polarization as a field variable from molecular dynamics simulations.” Journal of Chemical Physics (2013), 139:054115. Please refer to the standard finite element (FE) texts, e.g. T.J.R Hughes “ The finite element method “, Dover 2003, for the basics of FE simulation.   
(Mandelli_1) D. Mandelli, W. Ouyang, M. Urbakh, and O. Hod, ACS Nano 13(7), 7603-7609 (2019).   
(Maras) Maras, Trushin, Stukowski, Ala-Nissila, Jonsson, Comp Phys Comm, 205, 13-21 (2016).   
(Marrink) Marrink, de Vries, Mark, J Phys Chem B, 108, 750-760 (2004).   
(Marshall, 2009) Marshall, J. S. (2009). Discrete-element modeling of particulate aerosol flows. Journal of Compu Physics, 228(5), 1541-1561.   
(Martyna1992) Martyna, Klein, Tuckerman, J Chem Phys, 97, 2635 (1992); Martyna, Tuckerman, Tobias, Klein, Mol P 1117.   
(Martyna1994) Martyna, Tobias and Klein, J Chem Phys, 101, 4177 (1994).   
(Martyna2) G. Martyna, A. Hughes, M. Tuckerman, J. Chem. Phys. 110, 3275 (1999).   
(Mason) J. K. Mason, Acta Cryst A65, 259 (2009).   
(Mattice) Mattice, Suter, Conformational Theory of Large Molecules, Wiley, New York, 1994.   
(Maxwell) J.C. Maxwell, Philos. Tans. Royal Soc. London, 157: 49-88 (1867).   
(Mayergoyz) I.D. Mayergoyz, G. Bertotti, C. Serpico (2009). Elsevier (2009)   
(Mayo) Mayo, Olfason, Goddard III, J Phys Chem, 94, 8897-8909 (1990).   
(Mees) M. J. Mees, G. Pourtois, E. C. Neyts, B. J. Thijsse, and A. Stesmans, Phys. Rev. B 85, 134301 (2012).   
(Mei) Mei, Davenport, Fernando, Phys Rev B, 43 4653 (1991)   
(Melchor) Gonzalez-Melchor, Mayoral, Velazquez, and Alejandre, J Chem Phys, 125, 224107 (2006).   
(Meloni) Meloni, Rosati and Colombo, J Chem Phys, 126, 121102 (2007).   
(Meremianin) Meremianin, J. Phys. A, 39, 3099 (2006).   
(Mezei) Mezei, J Chem Phys, 86, 7084 (1987)   
(Mickel) W. Mickel, S. C. Kapfer, G. E. Schroeder-Turkand, K. Mecke, J. Chem. Phys. 138, 044501 (2013).   
(Mie) G. Mie, Ann Phys, 316, 657 (1903).   
(Milano) G. Milano, S. Goudeau, F. Mueller-Plathe, J. Polym. Sci. B Polym. Phys. 43, 871 (2005).   
(Miller1) T. F. Miller III, M. Eleftheriou, P. Pattnaik, A. Ndirango, G. J. Martyna, J. Chem. Phys., 116, 8649-8659 (2002).   
(Miller2) Miller, Tadmor, Gibson, Bernstein and Pavia, J Chem Phys, 144, 184107 (2016).   
(Minary) Minary, Martyna, and Tuckerman, J Chem Phys, 18, 2510 (2003).   
(Mindlin and Deresiewicz, 1953) Mindlin, R.D., & Deresiewicz, H (1953). Elastic Spheres in Contact under Varying Oblique Force. J. Appl. Mech., ASME 20, 327-344.   
(Mindlin, 1949) Mindlin, R. D. (1949). Compliance of elastic bodies in contact. J. Appl. Mech., ASME 16, 259-268.   
(Miron) R. A. Miron and K. A. Fichthorn, J Chem Phys, 119, 6210 (2003).   
(Mishin) Mishin, Mehl, and Papaconstantopoulos, Acta Mater, 53, 4029 (2005).   
(Mitchell and Fincham) Mitchell, Fincham, J Phys Condensed Matter, 5, 1031-1038 (1993).   
(Mitchell2011) Mitchell. A non-local, ordinary-state-based viscoelasticity model for peridynamics. Sandia National Lab Report, 8064:1-28 (2011).   
(Mitchell2011a) Mitchell. A Nonlocal, Ordinary, State-Based Plasticity Model for Peridynamics. Sandia National Lab Report, 3166:1-34 (2011).   
(Miyazaki) Miyazaki, Okazaki, Shinoda, J Chem Theory Comput, 16, 782-793 (2020).   
(Mniszewski) S. M. Mniszewski, M. J. Cawkwell, M. E. Wall, J. Mohd-Yusof, N. Bock, T. C. Germann, and A. M. N. Niklasson, J. Chem. Theory Comput., 11, 4644 (2015).   
(Monaghan) Monaghan and Gingold, Journal of Computational Physics, 52, 374-389 (1983).   
(Monti) Monti, Clemmer, Srivastava, Silbert, Grest, and Lechman, Phys. Rev. E, (2022).   
(Moore) Moore, J Chem Phys, 144, 104501 (2016).   
(Mori) Y. Mori, Y. Okamoto, J. Phys. Soc. Jpn., 7, 074003 (2010).   
(Moriarty1) Moriarty, Physical Review B, 38, 3199 (1988).   
(Moriarty2) Moriarty, Physical Review B, 42, 1609 (1990). Moriarty, Physical Review B 49, 12431 (1994).   
(Moriarty3) Moriarty, Benedict, Glosli, Hood, Orlikowski, Patel, Soderlind, Streitz, Tang, and Yang, Journal of Materials Research, 21, 563 (2006).   
(Morris) Morris, Fox, Zhu, J Comp Physics, 136, 214-226 (1997).   
(Moustafa) Sabry G. Moustafa, Andrew J. Schultz, and David A. Kofke, Phys. Rev. E [92], 043303 (20   
(Muller-Plathe1) Muller-Plathe, J Chem Phys, 106, 6082 (1997).   
(Muller-Plathe2) Muller-Plathe, Phys Rev E, 59, 4894-4898 (1999).   
(Murdick) D.A. Murdick, X.W. Zhou, H.N.G. Wadley, D. Nguyen-Manh, R. Drautz, and D.G. Pettifo 45206 (2006).   
(Murty) M.V.R. Murty, H.A. Atwater, Phys Rev B, 51, 4889 (1995).   
(Nakano) A. Nakano, Computer Physics Communications, 104, 59-69 (1997).   
(Neelov) Neelov, Holm, J Chem Phys 132, 234103 (2010)   
(Nelson) Nelson, Halperin, Phys Rev B, 19, 2457 (1979).   
(Nettleton) Nettleton and Green, J Chem Phys, 29, 6 (1958).   
(Neyts) E. C. Neyts and A. Bogaerts, Theor. Chem. Acc. 132, 1320 (2013).   
(Nguyen2023) Nguyen, Physical Review B, 107(14), 144103, (2023).   
(Nguyen2024) Nguyen, Journal of Computational Physics, 113102, (2024).   
(Nguyen and Rohskopf) Nguyen and Rohskopf, Journal of Computational Physics, 480, 112030, (2023).   
(Nguyen and Sema) Nguyen and Sema, https://arxiv.org/abs/2405.00306, (2024).   
(NguyenTD) Nguyen, Li, Bagchi, Solis, Olvera de la Cruz, Comput Phys Commun 241, 80-19 (2019)   
(Nicholson and Rutledge) Nicholson and Rutledge, J Chem Phys, 145, 244903 (2016).   
(Niklasson2002) A. M. N. Niklasson, Phys. Rev. B, 66, 155115 (2002).   
(Niklasson2008) A. M. N. Niklasson, Phys. Rev. Lett., 100, 123004 (2008).   
(Niklasson2014) A. M. N. Niklasson and M. Cawkwell, J. Chem. Phys., 141, 164123, (2014).   
(Niklasson2017) A. M. N. Niklasson, J. Chem. Phys., 147, 054103 (2017).   
(Nitol) Nitol, Dickel, and Barrett, Computational Materials Science 188 (2021): 110207.   
(Noid) Noid, Chu, Ayton, Krishna, Izvekov, Voth, Das, Andersen, J Chem Phys 128, 134105 (2008).   
(Nordlund95) Nordlund, Kai. Computational materials science 3.4 (1995): 448-456.   
(Nordlund98) Nordlund, Kai, et al. Physical Review B 57.13 (1998): 7556.   
(Norman) G E Norman, S V Starikov, V V Stegailov et al., Contrib. Plasma Phys., 53, 129-139 (2013).   
(Noskov) Noskov, Lamoureux and Roux, J Phys Chem B, 109, 6705 (2005).   
(Nurdin) Nurdin and Schotte Phys Rev E, 61(4), 3579 (2000)   
(O’Connor) O’Connor et al., J. Chem. Phys. 142, 024903 (2015).   
(O’Hearn) O’Hearn, Alperen, Aktulga, SIAM J. Sci. Comput., 42(1), C1–C22 (2020).   
(Okabe) T. Okabe, M. Kawata, Y. Okamoto, M. Masuhiro, Chem. Phys. Lett., 335, 435-439 (2001).   
(Ollila et al.) Ollila, S.T.T., Denniston, C., Karttunen, M., and Ala-Nissila, T., Fluctuating lattice-Boltzmann model for complex fluids, J. Chem. Phys. 134 (2011) 064902.   
(Omelyan) Omelyan, Mryglod, and Folk. Phys. Rev. Lett. 86(5), 898. (2001).   
(OPLS-AA96) Jorgensen, Maxwell, Tirado-Rives, J Am Chem Soc, 118(45), 11225-11236 (1996).   
(Oppelstrup) Oppelstrup, unpublished, 2015. Oppelstrup and Moriarty, to be published.   
(Orsi) Orsi & Essex, The ELBA force field for coarse-grain modeling of lipid membranes, PloS ONE 6(12): e28637, 2011.   
(Otis R. Walton) Walton, O.R., Personal Communication   
(Ouldridge) T.E. Ouldridge, A.A. Louis, J.P.K. Doye, J. Chem. Phys. 134, 085101 (2011).   
(Ouldridge-DPhil) T.E. Ouldridge, Coarse-grained modelling of DNA and DNA self-assembly, DPhil. University of Oxford (2011).   
(Ouyang1) W. Ouyang, D. Mandelli, M. Urbakh and O. Hod, Nano Lett. 18, 6009-6016 (2018).   
(Ouyang2) W. Ouyang et al., J. Chem. Theory Comput. 16(1), 666-676 (2020).   
(Ouyang_1) W. Ouyang et al., J. Chem. Theory Comput. 16(1), 666-676 (2020).   
(Ouyang6) W. Ouyang, O. Hod, and R. Guerra, J. Chem. Theory Comput. 17, 7215 (2021).   
(Ouyang7) W. Ouyang, et al., J. Chem. Theory Comput. 17, 7237 (2021).   
(Palkar) Palkar V, Kuksenok O, J. Phys. Chem. B, 126 (1), 336-346, 2022   
(Paquay) Paquay and Kusters, Biophys. J., 110, 6, (2016). preprint available at arXiv:1411.3019.   
(Park) Park, Schulten, J. Chem. Phys. 120 (13), 5946 (2004)   
(Parks) Parks, Lehoucq, Plimpton, Silling, Comp Phys Comm, 179(11), 777-783 (2008).   
(Parrinello) Parrinello and Rahman, J Appl Phys, 52, 7182 (1981).   
(PASS) PASS webpage: https://www.sdu.dk/en/DPASS   
(Paula Leite2016) Paula Leite , Freitas, Azevedo, and de Koning, J Chem Phys, 126, 044509 (2016).   
(Paula Leite2017) Paula Leite, Santos-Florez, and de Koning, Phys Rev E, 96, 32115 (2017).   
(Pavlov1) D Pavlov, V Galigerov, D Kolotinskii, V Nikolskiy, V Stegailov, International Journal of High Performance Computing Applications, 38, 34-49 (2024).   
(Pavlov2) Pavlov, Galigerov, Kolotinskii, Nikolskiy, Stegailov, “GPU-based Molecular Dynamics of Fluid Flows: Reaching for Turbulence”, Int. J. High Perf. Comp. Appl., (2024)   
(Pearlman) Pearlman, J Chem Phys, 98, 1487 (1994)   
(Pedersen) Pedersen, J. Chem. Phys., 139, 104102 (2013).   
(Pedone) A. Pedone, G. Malavasi, M. C. Menziani, A. N. Cormack, and U. Segre, J. Phys. Chem. B, 110, 11780 (2006)   
(Peng) Peng, Ren, Dudarev, Whelan, Acta Crystallogr. A, 52, 257-76 (1996).   
(Perram) Perram and Rasmussen, Phys Rev E, 54, 6565-6572 (1996).   
(Petersen) Petersen, J Chem Phys, 103, 3668 (1995).   
(Petersen) Petersen, Lechman, Plimpton, Grest, in’ t Veld, Schunk, J Chem Phys, 132, 174106 (2010).   
(Pettifor_1) D.G. Pettifor and I.I. Oleinik, Phys. Rev. B, 59, 8487 (1999).   
(Pettifor_2) D.G. Pettifor and I.I. Oleinik, Phys. Rev. Lett., 84, 4124 (2000).   
(Pettifor_3) D.G. Pettifor and I.I. Oleinik, Phys. Rev. B, 65, 172103 (2002).   
(PFC) PFC Particle Flow Code 6.0 Documentation. Itasca Consulting Group.   
(Phillips) C. L. Phillips, J. A. Anderson, S. C. Glotzer, Comput Phys Comm, 230, 7191-7201 (2011).   
(Piaggi) Piaggi and Parrinello, J Chem Phys, 147, 114112 (2017).   
(Pisarev) V V Pisarev and S V Starikov, J. Phys.: Condens. Matter, 26, 475401 (2014).   
(Plimpton) Plimpton and Knight, JPDC, 147, 184-195 (2021).   
(PLUMED) G.A. Tribello, M. Bonomi, D. Branduardi, C. Camilloni and G. Bussi, Comp. Phys. Comm 185, 604 (2014)   
(Pollock) Pollock and Glosli, Comp Phys Comm, 95, 93 (1996).   
(Ponder) Ponder, Wu, Ren, Pande, Chodera, Schnieders, Haque, Mobley, Lambrecht, DiStasio Jr, M. Head-Gordon, Clark, Johnson, T. Head-Gordon, J Phys Chem B, 114, 2549-2564 (2010).   
(Popov1) A.M. Popov, I. V. Lebedeva, A. A. Knizhnik, Y. E. Lozovik and B. V. Potapkin, Chem. Phys. Lett. 536, 82-86 (2012).   
(Price1) Price and Brooks, J Chem Phys, 121, 10096 (2004).   
(Price2) Price, Stone and Alderton, Mol Phys, 52, 987 (1984).   
(QEq/Fire) T.-R. Shan, A. P. Thompson, S. J. Plimpton, in preparation   
(Qi) Qi and Reed, J. Phys. Chem. A 116, 10451 (2012).   
(Ramirez) J. Ramirez, S.K. Sukumaran, B. Vorselaars and A.E. Likhtman, J. Chem. Phys. 133, 154103 (2010).   
(Rappe) Rappe and Goddard III, Journal of Physical Chemistry, 95, 3358-3363 (1991).   
(Ravelo) Ravelo, Holian, Germann and Lomdahl, Phys Rev B, 70, 014103 (2004).   
(ReaxFF) A. C. T. van Duin, S. Dasgupta, F. Lorant, W. A. Goddard III, J Physical Chemistry, 105, 9396-9049 (2001)   
(Rector) Rector, Van Swol, Henderson, Molecular Physics, 82, 1009 (1994).   
(Ree) Ree, Journal of Chemical Physics, 73, 5401 (1980).   
(Reed) Reed, Fried, and Joannopoulos, Phys. Rev. Lett., 90, 235503 (2003).   
(Reed2) Reed, J. Phys. Chem. C, 116, 2205 (2012).   
(Rick) S. W. Rick, S. J. Stuart, B. J. Berne, J Chem Phys 101, 16141 (1994).   
(Rick2) S. W. Rick, S. J. Stuart, B. J. Berne, J Chem Phys 101, 6141   
(Roberts) R. Roberts (2019) “Evenly Distributing Points in a Triangle.” Extreme Learning. http://extremelearn au/evenly-distributing-points-in-a-triangle/   
(Rohart) Rohart and Thiaville, Physical Review B, 88(18), 184422. (2013).   
(Rosenberger) Rosenberger, Sanyal, Shell and van der Vegt, Journal of Chemical Physics, 2019, 151 (4), 044111.   
(Rubensson) E. H. Rubensson, A. M. N. Niklasson, SIAM J. Sci. Comput. 36 (2), 147-170, (2014).   
(Rutherford) A M Rutherford and D M Duffy, J. Phys.: Condens. Matter, 19, 496201-496210 (2007).   
(Ryckaert) J.-P. Ryckaert, G. Ciccotti and H. J. C. Berendsen, J of Comp Phys, 23, 327-341 (1977).   
(SMTB-Q_1) N. Salles, O. Politano, E. Amzallag, R. Tetot, Comput. Mater. Sci. 111 (2016) 181-189   
(SMTB-Q_2) E. Maras, N. Salles, R. Tetot, T. Ala-Nissila, H. Jonsson, J. Phys. Chem. C 2015, 119, 10391-10399   
(SMTB-Q_3) R. Tetot, N. Salles, S. Landron, E. Amzallag, Surface Science 616, 19-8722 28 (2013)   
(SRIM) SRIM webpage: http://www.srim.org/   
(SW) F. H. Stillinger, and T. A. Weber, Phys. Rev. B, 31, 5262 (1985).   
(SWM4-NDP) Lamoureux, Harder, Vorobyov, Roux, MacKerell, Chem Phys Let, 418, 245-249 (2006)   
(Sadigh) B Sadigh, P Erhart, A Stukowski, A Caro, E Martinez, and L Zepeda-Ruiz, Phys. Rev. B, 85, 184203   
(Sadigh1) B. Sadigh, P. Erhart, A. Stukowski, A. Caro, E. Martinez, and L. Zepeda-Ruiz, Phys. Rev. B 85, (2012)   
(Sadigh2) B. Sadigh and P. Erhart, Phys. Rev. B 86, 134204 (2012)   
(Safran) Safran, Statistical Thermodynamics of Surfaces, Interfaces, And Membranes, Westview Press, ISBN: 978- 0813340791 (2003).   
(Salanne) Salanne, Rotenberg, Jahn, Vuilleumier, Simon, Christian and Madden, Theor Chem Acc, 131, 1143 (2012).   
(Salerno) Salerno, Bernstein, J Chem Theory Comput, –, —- (2018).   
(Sanyal1) Sanyal and Shell, Journal of Chemical Physics, 2016, 145 (3), 034109.   
(Sanyal2) Sanyal and Shell, Journal of Physical Chemistry B, 122 (21), 5678-5693.   
(Scalfi) Scalfi et al., J. Chem. Phys., 153, 174704 (2020).   
(Schelling) Patrick K. Schelling, Comp. Mat. Science, 44, 274 (2008).   
(Scherer1) C. Scherer and D. Andrienko, Phys. Chem. Chem. Phys. 20, 22387-22394 (2018).   
(Scherer2) C. Scherer, R. Scheid, D. Andrienko, and T. Bereau, J. Chem. Theor. Comp. 16, 3194-3204 (2020).   
(Schlitter1) Schlitter, Swegat, Mulders, “Distance-type reaction coordinates for modelling activated processes”, J Molecular Modeling, 7, 171-177 (2001).   
(Schlitter2) Schlitter and Klahn, “The free energy of a reaction coordinate at multiple constraints: a concise formulation”, Molecular Physics, 101, 3439-3443 (2003).   
(Schmid) S. Bureekaew, S. Amirjalayer, M. Tafipolsky, C. Spickermann, T.K. Roy and R. Schmid, Phys. Status Solidi B, 6, 1128 (2013).   
(Schneider) Schneider and Stoll, Phys Rev B, 17, 1302 (1978).   
(Schratt & Mohles) Schratt, Mohles. Comp. Mat. Sci. 182 (2020) 109774   
(Schroeder) Schroeder and Steinhauser, J Chem Phys, 133, 154511 (2010).   
(Seleson 2010) Seleson, Parks, Int J Mult Comp Eng 9(6), pp. 689-706, 2011.   
(Semaev) Semaev, Cryptography and Lattices, 181 (2001).   
(Seo) Seo, Shinoda, J Chem Theory Comput, 15, 762-774 (2019).   
(Sheppard) Sheppard, Terrell, Henkelman, J Chem Phys, 128, 134106 (2008). See ref 1 in this paper for original reference to Qmin in Jonsson, Mills, Jacobsen.   
(Shi) Shi, Xia, Zhang, Best, Wu, Ponder, Ren, J Chem Theory Comp, 9, 4046, 2013.   
(Shinoda) Shinoda, DeVane, Klein, Mol Sim, 33, 27 (2007).   
(Shinoda) Shinoda, Shiga, and Mikami, Phys Rev B, 69, 134103 (2004).   
(Shire) Shire, Hanley and Stratford, Comp. Part. Mech., (2020).   
(Sides) Sides, Grest, Stevens, Plimpton, J Polymer Science B, 42, 199-208 (2004).   
(Siepmann) Siepmann and Sprik, J. Chem. Phys. 102, 511 (1995).   
(Silbert) Silbert, Ertas, Grest, Halsey, Levine, Plimpton, Phys Rev E, 64, p 051302 (2001).   
(Silbert, 2001) Silbert, L. E., Ertas, D., Grest, G. S., Halsey, T. C., Levine, D., & Plimpton, S. J. (2001). Granular flow down inclined plane: Bagnold scaling and rheology. Physical Review E,   
(Silling 2000) Silling, J Mech Phys Solids, 48, 175-209 (2000).   
(Silling 2005) Silling Askari, Computer and Structures, 83, 1526-1535 (2005).   
(Silling 2007) Silling, Epton, Weckner, Xu, Askari, J Elasticity, 88, 151-184 (2007).   
(Singh) Singh and Warner, Acta Mater, 58, 5797-5805 (2010),   
(Singraber, Behler and Dellago 2019) Singraber, A.; Behler, J.; Dellago, C. J., Chem. Theory Comput. 2019, 15 (3), 1827-1840   
(Singraber et al 2019) Singraber, A.; Morawietz, T.; Behler, J.; Dellago, C., J. Chem. Theory Comput. 2019, 15 (5), 3075-3092.   
(Sirk1) Sirk TW, Sliozberg YR, Brennan JK, Lisal M, Andzelm JW, J Chem Phys, 136 (13) 134903, 2012.   
(Sirk2) Sirk, Moore, Brown, J Chem Phys, 138, 064505 (2013).   
(Skomski) Skomski, R. (2008). Simple models of magnetism. Oxford University Press.   
(Snodin) B.E. Snodin, F. Randisi, M. Mosayebi, et al., J. Chem. Phys. 142, 234901 (2015).   
(Son) Son, McDaniel, Cui and Yethiraj, J Phys Chem Lett, 10, 7523 (2019).   
(Srivastava) Zhigilei, Wei, Srivastava, Phys. Rev. B 71, 165417 (2005).   
(Steinbach) Steinbach, Brooks, J Comput Chem, 15, 667 (1994).   
(Steinhardt) P. Steinhardt, D. Nelson, and M. Ronchetti, Phys. Rev. B 28, 784 (1983).   
(Steward) Stewart, Spearot, Modelling Simul. Mater. Sci. Eng. 21, 045003, (2013).   
(Stewart2018) J.A. Stewart, et al. (2018) Journal of Applied Physics, 123(16), 165902.   
(Stiles) Stiles , Hubbard, and Kayser, J Chem Phys, 77, 6189 (1982).   
(Stillinger) Stillinger, Weber, Phys. Rev. B 31, 5262 (1985).   
(Stoddard) Stoddard and Ford, Phys Rev A, 8, 1504 (1973).   
(Streitz) F. H. Streitz, J. W. Mintmire, Phys Rev B, 50, 11996-12003 (1994).   
(Strong) Strong and Eaves, J. Phys. Chem. B 121, 189 (2017).   
(Stuart) Stuart, Tutein, Harrison, J Chem Phys, 112, 6472-6486 (2000).   
(Stukowski) Stukowski, Sadigh, Erhart, Caro; Modeling Simulation Materials Science & Engineering, 7, 075005 (2009).   
(Su) Su and Goddard, Excited Electron Dynamics Modeling of Warm Dense Matter, Phys Rev Lett, 99:185003 (2007).   
(Sulc1) P. Sulc, F. Romano, T. E. Ouldridge, et al., J. Chem. Phys. 140, 235102 (2014).   
(Sulc2) P. Sulc, F. Romano, T.E. Ouldridge, L. Rovigatti, J.P.K. Doye, A.A. Louis, J. Chem. Phys. 137, 135101 (2012).   
(Sun) Sun, J. Phys. Chem. B, 102, 7338-7364 (1998).   
(Surblys2019) Surblys, Matsubara, Kikugawa, Ohara, Phys Rev E, 99, 051301(R) (2019).   
(Surblys2021) Surblys, Matsubara, Kikugawa, Ohara, J Appl Phys 130, 215104 (2021).   
(Sutmann) Sutmann, Arnold, Fahrenberger, et. al., Physical review / E 88(6), 063308 (2013)   
(Sutmann) G. Sutmann. ScaFaCoS - a Scalable library of Fast Coulomb Solvers for particle Systems. In Bajaj, Zavattieri, Koslowski, Siegmund, Proceedings of the Society of Engineering Science 51st Annual Technical Meeting. 2014.   
(Swinburne) Swinburne and Marinica, Physical Review Letters, 120, 1 (2018)   
(Tadmor) Tadmor, Elliott, Sethna, Miller and Becker, JOM, 63, 17 (2011). doi: https://doi.org/10.1007/ s11837-011-0102-6   
(Tainter 2011) Tainter, Pieniazek, Lin, and Skinner, J. Chem. Phys., 134, 184501 (2011)   
(Tainter 2015) Tainter, Shi, and Skinner, 11, 2268 (2015)   
(Tang and Toennies) J Chem Phys, 80, 3726 (1984).   
(Tee) Tee and Searles, J. Chem. Phys. 156, 184101 (2022).  

# (Templeton2010)  

Templeton, JA; Jones, RE; Wagner, GJ, “Application of a field-based method to spatially varying thermal trans  

port problems in molecular dynamics.” Modelling and Simulation in Materials Science and Engineering (2010), 18:085007.   
(Templeton2011) Templeton, JA; Jones, RE; Lee, JW; Zimmerman, JA; Wong, BM, “A long-range electric field solver for molecular dynamics based on atomistic-to-continuum modeling.” Journal of Chemical Theory and Computation (2011), 7:1736.   
(tenWolde) P. R. ten Wolde, M. J. Ruiz-Montero, D. Frenkel, J. Chem. Phys. 104, 9932 (1996).   
(Tersoff_1) J. Tersoff, Phys Rev B, 37, 6991 (1988).   
(Tersoff_2) J. Tersoff, Phys Rev B, 38, 9902 (1988).   
(Tersoff_3) J. Tersoff, Phys Rev B, 39, 5566 (1989); errata (PRB 41, 3248)   
(Theodorou) Theodorou, Suter, Macromolecules, 18, 1206 (1985).   
(Thole) Chem Phys, 59, 341 (1981).   
(Thompson1) Thompson, Plimpton, Mattson, J Chem Phys, 131, 154107 (2009).   
(Thompson2) Thompson, Swiler, Trott, Foiles, Tucker, J Comp Phys, 285, 316 (2015).   
(Thornton et al, 2013) Thornton, C., Cummins, S. J., & Cleary, P. W. (2013). An investigation of the comparative behavior of alternative contact force models during inelastic collisions. Powder hornton, 1991) Thornton, C. (1991). Interparticle sliding in the presence of adhesion. J. Phys. D: Appl. Phys. 24 1942   
(To) Q.D. To, V.H. Vu, G. Lauriat, and C. Leonard. J. Math. Phys. 56, 103101 (2015).   
(Todd) B. D. Todd, Denis J. Evans, and Peter J. Daivis: “Pressure tensor for inhomogeneous fluids”, Phys. Rev. E 52, 1627 (1995).   
(Toukmaji) Toukmaji, Sagui, Board, and Darden, J Chem Phys, 113, 10913 (2000).  

(Toxvaerd) Toxvaerd, Dyre, J Chem Phys, 134, 081102 (2011).  

(Tranchida) Tranchida, Plimpton, Thibaudeau and Thompson, Journal of Computational Physics, 372, 406-425, (2018).   
(Tribello) G.A. Tribello, M. Bonomi, D. Branduardi, C. Camilloni and G. Bussi, Comp. Phys. Comm 185, 604 (2014)   
(Tsuji et al, 1992) Tsuji, Y., Tanaka, T., & Ishida, T. (1992). Lagrangian numerical simulation of plug flow of cohesionless particles in a horizontal pipe. Powder technology, 71(3),   
(Tsuzuki) Tsuzuki, Branicio, Rino, Comput Phys Comm, 177, 518 (2007).   
(Tuckerman1) M. Tuckerman and B. Berne, J Chem Phys, 99, 2796 (1993).   
(Tuckerman2) Tuckerman, Alejandre, Lopez-Rendon, Jochim, and Martyna, J Phys A: Math Gen, 39, 5629 (2006).   
(Tuckerman3) Tuckerman, Berne and Martyna, J Chem Phys, 97, p 1990 (1992).   
(Tuckerman4) Tuckerman, Mundy, Balasubramanian, Klein, J Chem Phys, 106, 5615 (1997).   
(Tyagi) Tyagi, Suzen, Sega, Barbosa, Kantorovich, Holm, J Chem Phys, 132, 154112 (2010)   
(Ulomek) Ulomek, Brien, Foiles, Mohles, Modelling Simul. Mater. Sci. Eng. 23 (2015) 025007   
(Vaiwala) Vaiwala, Jadhav, and Thaokar, J Chem Phys, 146, 124904 (2017).   
(Valone) Valone, Baskes, Martin, Phys. Rev. B, 73, 214209 (2006).   
(vanWijk) M. M. van Wijk, A. Schuring, M. I. Katsnelson, and A. Fasolino, Physical Review Letters, 113, 135504 (2014)   
(Van Workum) K. Van Workum et al., J. Chem. Phys. 125 144506 (2006)   
(Vargas and McCarthy 2001) Vargas, W.L. and McCarthy, J.J. (2001).   
(Varshalovich) Varshalovich, Moskalev, Khersonskii, Quantum Theory of Angular Momentum, World Scientific, Singapore (1987).   
(Vashishta1990) P. Vashishta, R. K. Kalia, J. P. Rino, Phys. Rev. B 41, 12197 (1990).   
(Vashishta2007) P. Vashishta, R. K. Kalia, A. Nakano, J. P. Rino. J. Appl. Phys. 101, 103515 (2007).   
(Veld) In ‘t Veld, Ismail, Grest, J Chem Phys, 127, 144711 (2007).   
(Verstraelen) Verstraelen, Ayers, Speybroeck, Waroquier, J. Chem. Phys. 138, 074108 (2013).   
(Volkov1) Volkov and Zhigilei, J Phys Chem C, 114, 5513 (2010).   
(Volkov2) Volkov, Simov and Zhigilei, APS Meeting Abstracts, Q31.013 (2008).   
(Voter1998) Voter, Phys Rev B, 57, 13985 (1998).   
(Voter2000) Sorensen and Voter, J Chem Phys, 112, 9599 (2000)   
(Voter2002) Voter, Montalenti, Germann, Annual Review of Materials Research 32, 321 (2002).   
(Voter2013) S. Y. Kim, D. Perez, A. F. Voter, J Chem Phys, 139, 144110 (2013).   
(Wagner) Wagner, GJ; Jones, RE; Templeton, JA; Parks, MA, “An atomistic-to-continuum coupling method for heat transfer in solids.” Special Issue of Computer Methods and Applied Mechanics (2008) 197:3351.   
(Wang et al, 2015) Wang, Y., Alonso-Marroquin, F., & Guo, W. W. (2015). Rolling and sliding in 3-D discrete element models. Particuology, 23, 49-55.   
(Wang2020) X. Wang, S. Ramirez-Hinestrosa, J. Dobnikar, and D. Frenkel, Phys. Chem. Chem. Phys. 22, 10624 (2020).   
(Wang1) J. Wang, H. S. Yu, P. A. Langston, F. Y. Fraige, Granular Matter, 13, 1 (2011).   
(Wang2) J. Wang, and A. Rockett, Phys. Rev. B, 43, 12571 (1991).   
(Wang3) Wang and Holm, J Chem Phys, 115, 6277 (2001).   
(Wang4) Wang, Van Hove, Ross, Baskes, J. Chem. Phys., 121, 5410 (2004).   
(Ward) D.K. Ward, X.W. Zhou, B.M. Wong, F.P. Doty, and J.A. Zimmerman, Phys. Rev. B, 85,115206 (2012).   
(Warren) Warren, Phys Rev E, 68, 066702 (2003).   
(Watkins) Watkins and Jorgensen, J Phys Chem A, 105, 4118-4125 (2001).   
(Weeks) Weeks, Chandler and Andersen, J. Chem. Phys., 54, 5237 (1971)   
(WeinanE) E, Ren, Vanden-Eijnden, Phys Rev B, 66, 052301 (2002).   
(Wen) M. Wen, S. Carr, S. Fang, E. Kaxiras, and E. B. Tadmor, Phys. Rev. B, 98, 235404 (2018)   
(Wennberg) Wennberg, Murtola, Hess, Lindahl, J Chem Theory Comput, 9, 3527 (2013).  

(Wicaksono1) Wicaksono, Sinclair, Militzer, Computational Materials Science, 117, 397-405 (2016).  

Wicaksono2) Wicaksono, figshare, https://doi.org/10.6084/m9.figshare.1488628.v1 (2015).  

(Winkler) Winkler, Wysocki, and Gompper, Soft Matter, 11, 6680 (2015).  

(Wirnsberger) Wirnsberger, Frenkel, and Dellago, J Chem Phys, 143, 124104 (2015).   
(Wolf) D. Wolf, P. Keblinski, S. R. Phillpot, J. Eggebrecht, J Chem Phys, 110, 8254 (1999).   
(Wolff) Wolff and Rudd, Comp Phys Comm, 120, 200-32 (1999).   
(Wood) Wood and Thompson, J Chem Phys, 148, 241721, (2018)   
(Xie23) Xie, S.R., Rupp, M. & Hennig, R.G. Ultra-fast interpretable machine-learning potentials. npj Comput Mater 9, 162 (2023). https://doi.org/10.1038/s41524-023-01092-7   
(Yade-DEM) V. Smilauer et al. (2021), Yade Documentation 3rd ed.   
(Yanxon2020) Yanxon, Zagaceta, Tang, Matteson, Zhu, Mach. Learn.: Sci. Technol. 2, 027001 (2020).   
(Yeh) Yeh and Berkowitz, J Chem Phys, 111, 3155 (1999).   
(Yuan2010a) Yuan, Huang, Li, Lykotrafitis, Zhang, Phys. Rev. E, 82, 011905(2010).   
(Yuan2010b) Yuan, Huang, Zhang, Soft. Matter, 6, 4571(2010).   
(Zagaceta2020) Zagaceta, Yanxon, Zhu, J Appl Phys, 128, 045113 (2020).   
(ZBL) J.F. Ziegler, J.P. Biersack, U. Littmark, ‘Stopping and Ranges of Ions in Matter’ Vol 1, 1985, Pergamon Press.   
(Zhang1) Zhang and Makse, Phys Rev E, 72, p 011301 (2005).   
(Zhang2) Zhang and Trinkle, Computational Materials Science, 124, 204-210 (2016).   
(Zhang3) Zhang, Glotzer, Nanoletters, 4, 1407-1413 (2004).   
(Zhang4) Zhang, J Chem Phys, 106, 6102 (1997).   
(Zhang5) Zhang, Lussetti, de Souza, Muller-Plathe, J Phys Chem B, 109, 15060-15067 (2005).   
(Zhigilei1) Volkov and Zhigilei, ACS Nano 4, 6187 (2010).   
(Zhigilei2) Volkov, Simov, Zhigilei, ASME paper IMECE2008, 68021 (2008).   
(Zhigilei3) Volkov, Zhigilei, J. Phys. Chem. C 114, 5513 (2010).   
(Zhigilei4) Wittmaack, Banna, Volkov, Zhigilei, Carbon 130, 69 (2018).   
(Zhigilei5) Wittmaack, Volkov, Zhigilei, Compos. Sci. Technol. 166, 66 (2018).   
(Zhigilei6) Wittmaack, Volkov, Zhigilei, Carbon 143, 587 (2019).   
(Zhigilei7) Volkov, Zhigilei, Phys. Rev. Lett. 104, 215902 (2010).   
(Zhigilei8) Volkov, Shiga, Nicholson, Shiomi, Zhigilei, J. Appl. Phys. 111, 053501 (2012).   
(Zhigilei9) Volkov, Zhigilei, Appl. Phys. Lett. 101, 043113 (2012).   
(Zhigilei10) Jacobs, Nicholson, Zemer, Volkov, Zhigilei, Phys. Rev. B 86, 165414 (2012).   
(Zhou1) Zhou, Saidi, Fichthorn, J Phys Chem C, 118(6), 3366-3374 (2014).   
(Zhou3) X. W. Zhou, M. E. Foster, R. E. Jones, P. Yang, H. Fan, and F. P. Doty, J. Mater. Sci. Res., 4, 15 (2015).   
(Zhou4) X. W. Zhou, M. E. Foster, J. A. Ronevich, and C. W. San Marchi, J. Comp. Chem., 41, 1299 (2020).   
(Zhu) Zhu, Tajkhorshid, and Schulten, Biophys. J. 83, 154 (2002).   
(Ziegler) J.F. Ziegler, J. P. Biersack and U. Littmark, “The Stopping and Range of Ions in Matter”, Volume 1, Perga 1985.   
(Zimmerman2004) Zimmerman, JA; Webb, EB; Hoyt, JJ;. Jones, RE; Klein, PA; Bammann, DJ, “Calculation of stress in atom simulation.” Special Issue of Modelling and Simulation in Materials Science and Engineering (2004),12:S   
(Zimmerman2010) Zimmerman, JA; Jones, RE; Templeton, JA, “A material frame approach for evaluating continuum variabl atomistic simulations.” Journal of Computational Physics (2010), 229:2364.   
(electronic stopping) Wikipedia - Electronic Stopping Power: https://en.wikipedia.org/wiki/Stopping_power_%28particle_ radiation%29  

# Part IV  

# Indices and tables  

# Symbols  

LMP_STYLE_CONST ( $C{+}{+}$ enum), 593 _LMP_TYPE_CONST ( $C{+}{+}$ enum), 593 _LMP_VAR_CONST ( $(C++$ enum), 594 version _ (in module lammps), 696  

# A  

accelerator_config (lammps.lammps property), 710   
addstep_compute() (fortran subroutine), 649   
addstep_compute_all() (fortran subroutine), 649   
angle_coeff, 901   
angle_style, 902   
angle_style amoeba, 2561   
angle_style charmm, 2563   
angle_style charmm/intel, 2563   
angle_style charmm/kk, 2563   
angle_style charmm/omp, 2563   
angle_style class2, 2564   
angle_style class2/kk, 2564   
angle_style class2/omp, 2564   
angle_style class2/p6, 2564   
angle_style cosine, 2566   
angle_style cosine/buck6d, 2567   
angle_style cosine/delta, 2568   
angle_style cosine/delta/omp, 2568   
angle_style cosine/kk, 2566   
angle_style cosine/omp, 2566   
angle_style cosine/periodic, 2569   
angle_style cosine/periodic/omp, 2569   
angle_style cosine/shift, 2570   
angle_style cosine/shift/exp, 2571   
angle_style cosine/shift/exp/omp, 2571   
angle_style cosine/shift/omp, 2570   
angle_style cosine/squared, 2572   
angle_style cosine/squared/omp, 2572   
angle_style cosine/squared/restricted, 2574   
angle_style cosine/squared/restricted/omp, 2574   
angle_style cross, 2575   
angle_style dipole, 2576   
angle_style dipole/omp, 2576   
angle_style fourier, 2577   
angle_style fourier/omp, 2577   
angle_style fourier/simple, 2579   
angle_style fourier/simple/omp, 2579   
angle_style gaussian, 2580   
angle_style harmonic, 2581   
angle_style harmonic/intel, 2581   
angle_style harmonic/kk, 2581   
angle_style harmonic/omp, 2581   
angle_style hybrid, 2582   
angle_style hybrid/kk, 2582   
angle_style lepton, 2583   
angle_style lepton/omp, 2583   
angle_style mesocnt, 2586   
angle_style mm3, 2588   
angle_style mwlc, 2588   
angle_style none, 2590   
angle_style quartic, 2590   
angle_style quartic/omp, 2590   
angle_style spica, 2591   
angle_style spica/kk, 2591   
angle_style spica/omp, 2591   
angle_style table, 2593   
angle_style table/omp, 2593   
angle_style zero, 2595   
angle_write, 904   
ArgInfo ( $C{+}{+}$ class), 874   
ArgInfo::ArgInfo ( $C{+}{+}$ function), 876   
ArgInfo::ArgTypes ( $C{+}{+}$ enum), 874   
ArgInfo::ArgTypes::BIN1D ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::BIN2D ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::BIN3D ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::BINCYLINDER ( $C{+}{+}$ enumerator), 876   
ArgInfo::ArgTypes::BINSPHERE ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::COMPUTE ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::DENSITY_MASS ( $(C++$ enumerator), 875   
ArgInfo::ArgTypes::DENSITY_NUMBER $(C++$ enumerator), 875   
ArgInfo::ArgTypes::DNAME ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::ERROR ( $C{+}{+}$ enumerator), 874   
ArgInfo::ArgTypes::F ( $(C++$ enumerator), 875   
ArgInfo::ArgTypes::FIX ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::INAME ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::KEYWORD $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::MASS $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::MOLECULE ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::NONE ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::TEMPERATURE ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::TYPE ( $C{+}{+}$ enumerator), 875   
ArgInfo::ArgTypes::UNKNOWN ( $(C++$ enumerator), 875   
ArgInfo::ArgTypes::V $(C++$ enumerator), 875   
ArgInfo::ArgTypes::VARIABLE ( $(C++$ enumerator), 875   
ArgInfo::ArgTypes::X ( $C{+}{+}$ enumerator), 875   
ArgInfo::copy_name $(C++$ function), 877   
ArgInfo::get_dim ( $C{+}{+}$ function), 876   
ArgInfo::get_index1 ( $(C++$ function), 876   
ArgInfo::get_index2 ( $(C++$ function), 876   
ArgInfo::get_name ( $(C++$ function), 876   
ArgInfo::get_type $(C++$ function), 876   
Atom ( $C{+}{+}$ class), 837   
Atom::add_custom ( $C{+}{+}$ function), 839   
Atom::Atom ( $(C++$ function), 838   
Atom::extract ( $(C++$ function), 839   
Atom::extract_datatype ( $C{+}{+}$ function), 841   
Atom::extract_size $C{+}{+}$ function), 841   
Atom::find_custom ( $(C++$ function), 838   
Atom::find_custom_ghost $(C++$ function), 838   
Atom::PerAtom ( $C{+}{+}$ struct), 841   
Atom::remove_custom ( $C{+}{+}$ function), 839   
atom_modify, 905   
atom_style, 908   
available_ids() (lammps.lammps method), 711   
available_plugins() (lammps.lammps method), 711   
available_styles() (lammps.lammps method), 711  

# B  

balance, 914   
bond_coeff, 921   
bond_style, 922   
bond_style bpm/rotational, 2523   
bond_style bpm/spring, 2526   
bond_style class2, 2529   
bond_style class2/kk, 2529   
bond_style class2/omp, 2529   
bond_style fene, 2531   
bond_style fene/expand, 2532   
bond _style fene/expand/omp, 2532   
bond style fene/intel, 2531   
bond_style fene/kk, 2531   
bond style fene/nm, 2531   
bond _style fene/omp, 2531   
bond _style gaussian, 2534   
bond _style gromos, 2535   
bond style gromos/omp, 2535   
bond_style harmonic, 2536   
bond_style harmonic/intel, 2536   
bond_style harmonic/kk, 2536   
bond_style harmonic/omp, 2536   
bond_style harmonic/restrain, 2537   
bond_style harmonic/shift, 2538   
bond_style harmonic/shift/cut, 2539   
bond_style harmonic/shift/cut/omp, 2539   
bond_style harmonic/shift/omp, 2538   
bond_style hybrid, 2540   
bond_style hybrid/kk, 2540   
bond_style lepton, 2541   
bond_style lepton/omp, 2541   
bond_style mesocnt, 2544   
bond_style mm3, 2545   
bond_style morse, 2546   
bond_style morse/omp, 2546   
bond_style none, 2547   
bond_style nonlinear, 2547   
bond_style nonlinear/omp, 2547   
bond_style oxdna/fene, 2548   
bond_style oxdna2/fene, 2548   
bond style oxrna2/fene, 2548   
bond style quartic, 2551   
bond_style quartic/omp, 2551   
bond_style rheo/shell, 2553   
bond_style special, 2555   
bond_style table, 2557   
bond_style table/omp, 2557   
bond_style zero, 2559   
bond_write, 925   
boundary, 926  

# C  

change_box, 927   
clear, 932   
clearstep_compute() (fortran subroutine), 648   
close() (fortran subroutine), 634   
close() (lammps.lammps method), 697   
cmd (lammps.lammps property), 697   
comm_modify, 933   
comm_style, 935   
command() (fortran subroutine), 634   
command() (lammps.lammps method), 699   
commands_list() (fortran subroutine), 634   
commands_list() (lammps.lammps method), 699   
commands_string() (fortran subroutine), 635   
commands_string() (lammps.lammps method), 699   
compute, 936   
compute ackland/atom, 1837   
compute adf, 1838   
compute aggregate/atom, 1869   
compute angle, 1841   
compute angle/local, 1842   
compute angmom/chunk, 1844   
compute ave/sphere/atom, 1845   
compute ave/sphere/atom/kk, 1845   
compute basal/atom, 1847   
compute body/local, 1848   
compute bond, 1849   
compute bond/local, 1850   
compute born/matrix, 1853   
compute centro/atom, 1856   
compute centroid/stress/atom, 2032   
compute chunk/atom, 1858   
compute chunk/spread/atom, 1866   
compute cluster/atom, 1869   
compute cna/atom, 1871   
compute cnp/atom, 1872   
compute com, 1874   
compute com/chunk, 1875   
compute composition/atom, 1876   
compute composition/atom/kk, 1876   
compute contact/atom, 1878   
compute coord/atom, 1879   
compute coord/atom/kk, 1879   
compute count/type, 1881   
compute damage/atom, 1883   
compute dihedral, 1884   
compute dihedral/local, 1885   
compute dilatation/atom, 1887   
compute dipole, 1887   
compute dipole/chunk, 1889   
compute dipole/tip4p, 1887   
compute dipole/tip4p/chunk, 1889   
compute displace/atom, 1890   
compute dpd, 1892   
compute dpd/atom, 1893   
compute edpd/temp/atom, 1894   
compute efield/atom, 1895   
compute efield/wolf/atom, 1896   
compute entropy/atom, 1898   
compute erotate/asphere, 1900   
compute erotate/rigid, 1901   
compute erotate/sphere, 1902   
compute erotate/sphere/atom, 1903   
compute erotate/sphere/kk, 1902   
compute event/displace, 1904   
compute fabric, 1905   
compute fep, 1907   
compute fep/ta, 1911   
compute force/tally, 2041   
compute fragment/atom, 1869   
compute gaussian/grid/local, 1912   
compute gaussian/grid/local/kk, 1912   
compute global/atom, 1914   
compute group/group, 1917   
compute gyration, 1919   
compute gyration/chunk, 1920   
compute gyration/shape, 1922   
compute gyration/shape/chunk, 1923   
compute heat/flux, 1924   
compute heat/flux/tally, 2041   
compute heat/flux/virial/tally, 2041   
compute hexorder/atom, 1928   
compute hma, 1930   
compute improper, 1932   
compute improper/local, 1933   
compute inertia/chunk, 1934   
compute ke, 1936   
compute ke/atom, 1937   
compute ke/atom/eff, 1937   
compute ke/eff, 1939   
compute ke/rigid, 1940   
compute mliap, 1941   
compute momentum, 1943   
compute msd, 1944   
compute msd/chunk, 1945   
compute msd/nongauss, 1947   
compute nbond/atom, 1948   
compute omega/chunk, 1949   
compute orientorder/atom, 1951   
compute orientorder/atom/kk, 1951   
compute pace, 1953   
compute pair, 1957   
compute pair/local, 1958   
compute pe, 1960   
compute pe/atom, 1962   
compute pe/mol/tally, 2041   
compute pe/tally, 2041   
compute plasticity/atom, 1963   
compute pod/atom, 1964   
compute pod/global, 1964   
compute pod/local, 1964   
compute podd/atom, 1964   
compute pressure, 1966   
compute pressure/alchemy, 1968   
compute pressure/uef, 1969   
compute property/atom, 1970   
compute property/chunk, 1972   
compute property/grid, 1974   
compute property/local, 1975   
compute ptm/atom, 1978   
compute rattlers/atom, 1980   
compute rdf, 1981   
compute reaxff/atom, 1984   
compute reaxff/atom/kk, 1984   
compute reduce, 1986   
compute reduce/chunk, 1989   
compute reduce/region, 1986   
compute rheo/property/atom, 1991   
compute rigid/local, 1993   
compute saed, 1996   
compute slcsa/atom, 1999   
compute slice, 2001   
compute smd/contact/radius, 2003   
compute smd/damage, 2004   
compute smd/hourglass/error, 2004   
compute smd/internal/energy, 2005   
compute smd/plastic/strain, 2006   
compute smd/plastic/strain/rate, 2007   
compute smd/rho, 2007   
compute smd/tlsph/defgrad, 2008   
compute smd/tlsph/dt, 2009   
compute smd/tlsph/num/neighs, 2010   
compute smd/tlsph/shape, 2011   
compute smd/tlsph/strain, 2011   
compute smd/tlsph/strain/rate, 201   
compute smd/tlsph/stress, 2013   
compute smd/triangle/vertices, 201   
compute smd/ulsph/effm, 2015   
compute smd/ulsph/num/neighs, 20   
compute smd/ulsph/strain, 2017   
compute smd/ulsph/strain/rate, 20   
compute smd/ulsph/stress, 2018   
compute smd/vol, 2019   
compute sna/atom, 2020   
compute sna/grid, 2020   
compute sna/grid/kk, 2020   
compute sna/grid/local, 2020   
compute sna/grid/local/kk, 2020   
compute snad/atom, 2020   
compute snap, 2020   
compute snav/atom, 2020   
compute sph/e/atom, 2028   
compute sph/rho/atom, 2029   
compute sph/t/atom, 2030   
compute spin, 2031   
compute stress/atom, 2032   
compute stress/cartesian, 2036   
compute stress/cylinder, 2037   
compute stress/mop, 2039   
compute stress/mop/profile, 2039   
compute stress/spherical, 2037   
compute stress/tally, 2041   
compute tdpd/cc/atom, 2044   
compute temp, 2045   
compute temp/asphere, 2046   
compute temp/body, 2048   
compute temp/chunk, 2050   
compute temp/com, 2054   
compute temp/cs, 2055   
compute temp/deform, 2056   
compute temp/deform/eff, 2059   
compute temp/deform/kk, 2056   
compute temp/drude, 2060   
compute temp/eff, 2061   
compute temp/kk, 2045   
compute temp/partial, 2062   
compute temp/profile, 2064   
compute temp/ramp, 2066   
compute temp/region, 2068   
compute temp/region/eff, 2069   
compute temp/rotate, 2070   
compute temp/sphere, 2072   
compute temp/uef, 2074   
compute ti, 2074   
compute torque/chunk, 2076   
compute vacf, 2077   
compute vcm/chunk, 2079   
compute viscosity/cos, 2080   
compute voronoi/atom, 2082   
compute xrd, 2085   
compute_modify, 944   
config_accelerator() (fortran function), 664   
config_has_exceptions() (fortran function), 663   
config_has_ffmpeg_support() (fortran function), 663   
config_has_gzip_support() (fortran function), 662   
config_has_jpeg_support() (fortran function), 662   
config_has_mpi_support() (fortran function), 661   
config_has_package() (fortran function), 663   
config_has_png_support() (fortran function), 662   
config_package_count() (fortran function), 663   
config_package_name() (fortran subroutine), 664   
create_atoms, 945   
create_atoms() (fortran subroutine), 658   
create_atoms() (lammps.lammps method), 707   
create_bonds, 953   
create_box, 956  

# D  

decode_image_flags() (fortran subroutine), 669   
decode_image_flags() (lammps.lammps method), 7   
delete_atoms, 959   
delete_bonds, 962   
dielectric, 964   
dihedral_coeff, 965   
dihedral_style, 966   
dihedral_style charmm, 2597   
dihedral_style charmm/intel, 2597   
dihedral_style charmm/kk, 2597   
dihedral_style charmm/omp, 2597   
dihedral_style charmmfsw, 2597   
dihedral_style charmmfsw/kk, 2597   
dihedral_style class2, 2599   
dihedral_style class2/kk, 2599   
dihedral_style class2/omp, 2599   
dihedral_style cosine/shift/exp, 2602   
dihedral_style cosine/shift/exp/omp, 2602   
dihedral_style cosine/squared/restricted, 2603   
dihedral_style fourier, 2604   
dihedral_style fourier/intel, 2604   
dihedral_style fourier/omp, 2604   
dihedral_style harmonic, 2605   
dihedral_style harmonic/intel, 2605   
dihedral_style harmonic/kk, 2605   
dihedral_style harmonic/omp, 2605   
dihedral_style helix, 2606   
dihedral_style helix/omp, 2606   
dihedral_style hybrid, 2608   
dihedral_style hybrid/kk, 2608   
dihedral_style lepton, 2609   
dihedral_style lepton/omp, 2609   
dihedral_style multi/harmonic, 2611   
dihedral_style multi/harmonic/omp, 2611   
dihedral_style nharmonic, 2612   
dihedral_style nharmonic/omp, 2612   
dihedral_style none, 2614   
dihedral_style opls, 2614   
dihedral_style opls/intel, 2614   
dihedral_style opls/kk, 2614   
dihedral_style opls/omp, 2614   
dihedral_style quadratic, 2615   
dihedral_style quadratic/omp, 2615   
dihedral_style spherical, 2616   
dihedral_style table, 2618   
dihedral_style table/cut, 2618   
dihedral_style table/omp, 2618   
dihedral_style zero, 2622   
dihedral_write, 968   
dimension, 970   
displace_atoms, 970   
dump, 2645   
dump atom, 2645   
dump atom/adios, 2658   
dump atom/gz, 2645   
dump atom/zstd, 2645   
dump cfg, 2645   
dump cfg/gz, 2645   
dump cfg/uef, 2659   
dump cfg/zstd, 2645   
dump custom, 2645   
dump custom/adios, 2658   
dump custom/gz, 2645   
dump custom/zstd, 2645   
dump dcd, 2645   
dump grid, 2645   
dump grid/vtk, 2645   
dump h5md, 2660   
dump image, 2661   
dump local, 2645   
dump local/gz, 2645   
dump local/zstd, 2645   
dump molfile, 2690   
dump movie, 2661   
dump netcdf, 2692   
dump netcdf/mpiio, 2692   
dump vtk, 2693   
dump xtc, 2645   
dump xyz, 2645   
dump xyz/gz, 2645   
dump xyz/zstd, 2645   
dump yaml, 2645   
dump_modify, 2678   
dynamical_matrix, 972   
dynamical_matrix/kk, 972  

# E  

echo, 974  

encode_image_flags() (fortran function), 668   
encode_image_flags() (lammps.lammps method), 707   
error() (fortran subroutine), 634   
error() (lammps.lammps method), 698   
eval() (fortran function), 648   
eval() (lammps.lammps method), 705   
expand() (lammps.lammps method), 698   
extract_atom() (fortran function), 641   
extract_atom() (lammps.lammps method), 703   
extract_atom() (lammps.numpy_wrapper.numpy_wrapper method), 716   
extract_atom_datatype() (lammps.lammps method), 702   
extract_atom_size() (lammps.lammps method), 702   
extract_box() (fortran subroutine), 637   
extract_box() (lammps.lammps method), 699   
extract_compute() (fortran function), 642   
extract_compute() (lammps.lammps method), 703   
extract_compute() (lammps.numpy_wrapper.numpy_wrapper method), 717   
extract_fix() (fortran function), 644   
extract_fix() (lammps.lammps method), 704   
extract_fix() (lammps.numpy_wrapper.numpy_wrapper method), 717   
extract_global() (fortran function), 639   
extract_global() (lammps.lammps method), 701   
extract_global_datatype() (lammps.lammps method), 701   
extract_pair() (lammps.lammps method), 701   
extract_pair_dimension() (lammps.lammps method), 701   
extract_setting() (fortran function), 639   
extract_setting() (lammps.lammps method), 700   
extract_variable() (fortran function), 646   
extract_variable() (lammps.lammps method), 704   
extract_variable() (lammps.numpy_wrapper.numpy_wrapper method), 718  

# F  

file() (fortran subroutine), 634   
file() (lammps.lammps method), 699   
finalize() (lammps.lammps method), 698   
find() (lammps.NeighList method), 722   
find() (lammps.numpy_wrapper.NumPyNeighList method), 723   
find_compute_neighlist() (fortran function), 660   
find_compute_neighlist() (lammps.lammps method), 716   
find_fix_neighlist() (fortran function), 660   
find_fix_neighlist() (lammps.lammps method), 715   
find_pair_neighlist() (fortran function), 659   
find_pair_neighlist() (lammps.lammps method), 715   
fitpod, 987   
fix, 974   
fix accelerate/cos, 1277   
fix acks2/reaxff, 1278   
fix acks2/reaxff/kk, 1278   
fix adapt, 1280   
fix adapt/fep, 1286   
fix add/heat, 1291   
fix addforce, 1292   
fix addtorque, 1294   
fix alchemy, 1296   
fix amoeba/pitorsion, 1300   
fix append/atoms, 1302   
fix atc, 1304   
fix atom/swap, 1309   
fix ave/atom, 1312   
fix ave/chunk, 1314   
fix ave/correlate, 1321   
fix ave/correlate/long, 1326   
fix ave/grid, 1328   
fix ave/histo, 1335   
fix ave/histo/weight, 1335   
fix ave/time, 1340   
fix aveforce, 1345   
fix balance, 1346   
fix bocs, 1352   
fix bond/break, 1354   
fix bond/create, 1356   
fix bond/create/angle, 1356   
fix bond/react, 1360   
fix bond/swap, 1370   
fix box/relax, 1373   
fix brownian, 1378   
fix brownian/asphere, 1378   
fix brownian/sphere, 1378   
fix charge/regulation, 1381   
fix cmap, 1385   
fix cmap/kk, 1385   
fix colvars, 1387   
fix colvars/kk, 1387   
fix controller, 1390   
fix damping/cundall, 1393   
fix deform, 1395   
fix deform/kk, 1395   
fix deform/pressure, 1403   
fix deposit, 1408   
fix dpd/energy, 1413   
fix dpd/energy/kk, 1413   
fix drag, 1416   
fix drude, 1417   
fix drude/transform/direct, 1418   
fix drude/transform/inverse, 1418   
fix dt/reset, 1420   
fix dt/reset/kk, 1420   
fix edpd/source, 1414   
fix efield, 1422   
fix efield/kk, 1422   
fix efield/lepton, 1425   
fix efield/tip4p, 1422   
fix ehex, 1428   
fix electrode/conp, 1431   
fix electrode/conp/intel, 1431   
fix electrode/conq, 1431   
fix electrode/conq/intel, 1431   
fix electrode/thermo, 1431   
fix electrode/thermo/intel,   
fix electron/stopping, 1437   
fix electron/stopping/fit, 14   
fix enforce2d, 1439   
fix enforce2d/kk, 1439   
fix eos/cv, 1440   
fix eos/table, 1441   
fix eos/table/rx, 1443   
fix eos/table/rx/kk, 1443   
fix evaporate, 1446   
fix external, 1447   
fix ffl, 1450   
fix filter/corotate, 1451   
fix flow/gauss, 1453   
fix freeze, 1455   
fix freeze/kk, 1455   
fix gcmc, 1456   
fix gld, 1462   
fix gle, 1464   
fix gravity, 1466   
fix gravity/kk, 1466   
fix gravity/omp, 1466   
fix grem, 1468   
fix halt, 1470   
fix heat, 1472   
fix heat/flow, 1474   
fix hyper/global, 1475   
fix hyper/local, 1479   
fix imd, 1486   
fix indent, 1488   
fix ipi, 1492   
fix langevin, 1493   
fix langevin/drude, 1497   
fix langevin/eff, 1501   
fix langevin/kk, 1493   
fix langevin/spin, 1503   
fix lb/fluid, 1504   
fix lb/momentum, 1510   
fix lb/viscous, 1511   
fix lineforce, 1512   
fix manifoldforce, 1513   
fix mdi/qm, 1514   
fix mdi/qmmm, 1518   
fix meso/move, 1521   
fix mol/swap, 1524   
fix momentum, 1527   
fix momentum/chunk, 1527   
fix momentum/kk, 1527   
fix move, 1529   
fix msst, 1532   
fix mvv/dpd, 1535   
fix mvv/edpd, 1535   
fix mvv/tdpd, 1535   
fix neb/spin, 1540   
fix nonaffine/displacement, 155   
fix nph, 1541   
fix nph/asphere, 1557   
fix nph/asphere/omp, 1557   
fix nph/body, 1559   
fix nph/eff, 1550   
fix nph/kk, 1541   
fix nph/omp, 1541   
fix nph/sphere, 1561   
fix nph/sphere/omp, 1561   
fix nphug, 1563   
fix nphug/omp, 1563   
fix npt, 1541   
fix npt/asphere, 1566   
fix npt/asphere/omp, 1566   
fix npt/body, 1568   
fix npt/cauchy, 1570   
fix npt/eff, 1550   
fix npt/gpu, 1541   
fix npt/intel, 1541   
fix npt/kk, 1541   
fix npt/omp, 1541   
fix npt/sphere, 1578   
fix npt/sphere/omp, 1578   
fix npt/uef, 1552   
fix numdiff, 1580   
fix numdiff/virial, 1581   
fix nve, 1583   
fix nve/asphere, 1584   
fix nve/asphere/gpu, 1584   
fix nve/asphere/intel, 1584   
fix nve/asphere/noforce, 1585   
fix nve/awpmd, 1586   
fix nve/body, 1587   
fix nve/bpm/sphere, 1588   
fix nve/dot, 1589   
fix nve/dotc/langevin, 1590   
fix nve/eff, 1592   
fix nve/gpu, 1583   
fix nve/intel, 1583   
fix nve/kk, 1583   
fix nve/limit, 1593   
fix nve/limit/kk, 1593   
fix nve/line, 1594   
fix nve/manifold/rattle, 1595   
fix nve/noforce, 1596   
fix nve/omp, 1583   
fix nve/sphere, 1597   
fix nve/sphere/kk, 1597   
fix nve/sphere/omp, 1597   
fix nve/spin, 1599   
fix nve/tri, 1600   
fix nvk, 1601   
fix nvt, 1541   
fix nvt/asphere, 1602   
fix nvt/asphere/omp, 1602   
fix nvt/body, 1604   
fix nvt/eff, 1550   
fix nvt/gpu, 1541   
fix nvt/intel, 1541   
fix nvt/kk, 1541   
fix nvt/manifold/rattle, 1606   
fix nvt/omp, 1541   
fix nvt/sllod, 1607   
fix nvt/sllod/eff, 1609   
fix nvt/sllod/intel, 1607   
fix nvt/sllod/kk, 1607   
fix nvt/sllod/omp, 1607   
fix nvt/sphere, 1611   
fix nvt/sphere/omp, 1611   
fix nvt/uef, 1552   
fix oneway, 1613   
fix orient/bcc, 1614   
fix orient/eco, 1617   
fix orient/fcc, 1614   
fix pafi, 1619   
fix pair, 1621   
fix phonon, 1622   
fix pimd/langevin, 1625   
fix pimd/nvt, 1625   
fix planeforce, 1632   
fix plumed, 1633   
fix poems, 1635   
fix polarize/bem/gmres, 1637   
fix polarize/bem/icc, 1637   
fix polarize/functional, 1637   
fix pour, 1640   
fix precession/spin, 1644   
fix press/berendsen, 1646   
fix press/langevin, 1649   
fix print, 1653   
fix propel/self, 1655   
fix property/atom, 1657   
fix property/atom/kk, 1657   
fix python/invoke, 1661   
fix python/move, 1663   
fix qbmsst, 1664   
fix qeq/comb, 1672   
fix qeq/comb/omp, 1672   
fix qeq/ctip, 1668   
fix qeq/dynamic, 1668   
fix qeq/fire, 1668   
fix qeq/point, 1668   
fix qeq/reaxff, 1674   
fix qeq/reaxff/kk, 1674   
fix qeq/reaxff/omp, 1674   
fix qeq/slater, 1668   
fix qmmm, 1676   
fix qtb, 1677   
fix qtpie/reaxff, 1679   
fix rattle, 1729   
fix reaxff/bonds, 1682   
fix reaxff/bonds/kk, 1682   
fix reaxff/species, 1683   
fix reaxff/species/kk, 1683   
fix recenter, 1687   
fix recenter/kk, 1687   
fix restrain, 1689   
fix rheo, 1693   
fix rheo/oxidation, 1696   
fix rheo/pressure, 1697   
fix rheo/thermal, 1698   
fix rheo/viscosity, 1700   
fix rhok, 1701   
fix rigid, 1703   
fix rigid/meso, 1714   
fix rigid/nph, 1703   
fix rigid/nph/omp, 1703   
fix rigid/nph/small, 1703   
fix rigid/npt, 1703   
fix rigid/npt/omp, 1703   
fix rigid/npt/small, 1703   
fix rigid/nve, 1703   
fix rigid/nve/omp, 1703   
fix rigid/nve/small, 1703   
fix rigid/nvt, 1703   
fix rigid/nvt/omp, 1703   
fix rigid/nvt/small, 1703   
fix rigid/omp, 1703   
fix rigid/small, 1703   
fix rigid/small/omp, 1703   
fix rx, 1719   
fix rx/kk, 1719   
fix saed/vtk, 1722   
fix setforce, 1725   
fix setforce/kk, 1725   
fix setforce/spin, 1725   
fix sgcmc, 1727   
fix shake, 1729   
fix shake/kk, 1729   
fix shardlow, 1733   
fix shardlow/kk, 1733   
fix smd, 1735   
fix smd/adjust_dt, 1737   
fix smd/integrate_tlsph, 17   
fix smd/integrate_ulsph, 17   
fix smd/move_tri_surf, 174   
fix smd/setvel, 1741   
fix smd/wall_surface, 1742   
nx spn,   
fix sph/stationary, 1744   
fix spring, 1745   
fix spring/chunk, 1747   
fix spring/rg, 1749   
fix spring/self, 1750   
fix spring/self/kk, 1750   
fix srd, 1752   
fix store/force, 1757   
fix store/state, 1758   
fix tdpd/source, 1414   
fix temp/berendsen, 1760   
fix temp/berendsen/kk, 1760   
fix temp/csld, 1763   
fix temp/csvr, 1763   
fix temp/rescale, 1765   
fix temp/rescale/eff, 1768   
fix temp/rescale/kk, 1765   
fix tfmc, 1769   
fix tgnpt/drude, 1771   
fix tgnvt/drude, 1771   
fix thermal/conductivity, 1775   
fix ti/spring, 1777   
fix tmd, 1779   
fix ttm, 1781   
fix ttm/grid, 1781   
fix ttm/mod, 1781   
fix tune/kspace, 1787   
fix vector, 1788   
fix viscosity, 1790   
fix viscous, 1793   
fix viscous/kk, 1793   
fix viscous/sphere, 1794   
fix wall/body/polygon, 1804   
fix wall/body/polyhedron, 1805   
fix wall/colloid, 1796   
fix wall/ees, 1807   
fix wall/flow, 1809   
fix wall/flow/kk, 1809   
fix wall/gran, 1812   
fix wall/gran/kk, 1812   
fix wall/gran/region, 1816   
fix wall/harmonic, 1796   
fix wall/lepton, 1796   
fix wall/lj1043, 1796   
fix wall/lj126, 1796   
fix wall/lj93, 1796   
fix wall/lj93/kk, 1796   
fix wall/morse, 1796   
fix wall/piston, 1820   
fix wall/reflect, 1821   
fix wall/reflect/kk, 1821   
fix wall/reflect/stochastic, 1824   
fix wall/region, 1825   
fix wall/region/ees, 1807   
fix wall/region/kk, 1825   
fix wall/srd, 1829   
fix wall/table, 1796   
fix widom, 1832   
fix_external_get_force() (fortran function), 671   
fix_external_get_force() (lammps.lammps method), 712   
fix_external_get_force() (lammps.numpy_wrapper.numpy_wrapper method), 719   
fix_external_set_energy_global() (fortran subroutine), 671   
fix_external_set_energy_global() (lammps.lammps method), 712   
fix_external_set_energy_peratom() (fortran subroutine), 672   
fix_external_set_energy_peratom() (lammps.lammps method), 713   
fix_external_set_energy_peratom() (lammps.numpy_wrapper.numpy_wrapper method), 719   
fix_external_set_vector() (fortran subroutine), 673   
fix_external_set_vector() (lammps.lammps method), 714   
fix_external_set_vector_length() (fortran subroutine), 673   
fix_external_set_vector_length() (lammps.lammps method), 714   
fix_external_set_virial_global() (fortran subroutine), 672   
fix_external_set_virial_global() (lammps.lammps method), 713   
fix_external_set_virial_peratom() (lammps.lammps method), 713   
fix_external_set_virial_peratom() (lammps.numpy_wrapper.numpy_wrapper method), 720   
fix_modify, 984   
fix_modify AtC add_molecule, 2697   
fix_modify AtC add_species, 2698   
fix_modify AtC atom_element_map, 2698   
fix_modify AtC atom_weight, 2699   
fix_modify AtC atomic_charge, 2700   
fix_modify AtC boundary type, 2702   
fix_modify AtC boundary_dynamics, 2701   
fix_modify AtC boundary_faceset, 2701   
fix_modify AtC computes, 2713   
fix_modify AtC consistent_fe_initialization, 2703   
fix_modify AtC control localized_lambda, 2703   
fix_modify AtC control lumped_lambda_solve, 2723   
fix_modify AtC control mask_direction, 2723   
fix_modify AtC control momentum, 2704   
fix_modify AtC control thermal, 2705   
fix_modify AtC decomposition, 2706   
fix_modify AtC equilibrium_start, 2708   
fix_modify AtC extrinsic electron_integration, 2707   
fix_modify AtC extrinsic exchange, 2708   
fix_modify AtC fe_md_boundary, 2709   
fix_modify AtC fields, 2713   
fix_modify AtC filter, 2746   
fix_modify AtC filter scale, 2710   
fix_modify AtC filter type, 2710   
fix_modify AtC fix, 2711   
fix_modify AtC fix_flux, 2712   
fix_modify AtC gradients, 2715   
fix_modify AtC initial, 2720   
fix_modify AtC internal_element_set, 2720   
fix_modify AtC internal_quadrature, 2721   
fix_modify AtC kernel, 2717   
fix_modify AtC kernel_bandwidth, 2722   
fix_modify AtC mass_matrix, 2724   
fix_modify AtC material, 2724   
fix_modify AtC mesh add_to_nodeset, 2725   
fix_modify AtC mesh create, 2726   
fix_modify AtC mesh create_elementset, 2726   
fix_modify AtC mesh create_faceset box, 2727   
fix_modify AtC mesh create_faceset plane, 2728   
fix_modify AtC mesh create_nodeset, 2729   
fix_modify AtC mesh delete_elements, 2729   
fix_modify AtC mesh nodeset_to_elementset, 2730   
fix_modify AtC mesh output, 2731   
fix_modify AtC mesh quadrature, 2731   
fix_modify AtC mesh read, 2732   
fix_modify AtC mesh write, 2733   
fix_modify AtC on_the_fly, 2718   
fix_modify AtC output, 2733   
fix_modify AtC output boundary_integral, 2734   
fix_modify AtC output contour_integral, 2735   
fix_modify AtC output nodeset, 2736   
fix_modify AtC output volume_integral, 2737   
fix_modify AtC pair_interactions, 2737   
fix_modify AtC poisson_solver, 2738   
fix_modify AtC rates, 2718   
fix_modify AtC read_restart, 2739   
fix_modify AtC remove_molecule, 2739   
fix_modify AtC remove_source, 2740   
fix_modify AtC remove_species, 2741   
fix_modify AtC reset_atomic_reference_positions, 2741   
fix_modify AtC reset_time, 2742   
fix_modify AtC sample_frequency, 2742   
fix_modify AtC set reference_potential_energy, 2743   
fix_modify AtC source, 2744   
fix_modify AtC source_integration, 2745   
fix_modify AtC temperature_definition, 2745   
fix_modify AtC time_integration, 2747   
fix_modify AtC track_displacement, 2748   
fix_modify AtC unfix, 2748   
fix_modify AtC unfix_flux, 2749   
fix_modify AtC write_atom_weights, 2750   
fix_modify AtC write_restart, 2750   
flush_buffers() (fortran subroutine), 674   
flush_buffers() (lammps.lammps method), 705   
force_timeout() (fortran subroutine), 674   
force_timeout() (lammps.lammps method), 708  

# G  

gather() (fortran subroutine), 654   
gather_angles() (fortran subroutine), 653   
gather_angles() (lammps.lammps method), 706   
gather_angles() (lammps.numpy_wrapper.numpy_wrapper method), 718   
gather_atoms() (fortran subroutine), 649   
gather_atoms_concat() (fortran subroutine), 650   
gather_atoms_subset() (fortran subroutine), 651   
gather_bonds() (fortran subroutine), 652   
gather_bonds() (lammps.lammps method), 706   
gather_bonds() (lammps.numpy_wrapper.numpy_wrapper method), 718   
gather_concat() (fortran subroutine), 656   
gather_dihedrals() (fortran subroutine), 654   
gather_dihedrals() (lammps.lammps method), 706   
gather_dihedrals() (lammps.numpy_wrapper.numpy_wrapper method), 718   
gather_impropers() (fortran subroutine), 655   
gather_impropers() (lammps.lammps method), 706   
gather_impropers() (lammps.numpy_wrapper.numpy_wrapper method), 719   
gather_subset() (fortran subroutine), 656   
get() (lammps.NeighList method), 722   
get() (lammps.numpy_wrapper.NumPyNeighList method), 723   
get_gpu_device_info() (fortran subroutine), 665   
get_gpu_device_info() (lammps.lammps method), 710   
get_last_error_message() (fortran subroutine), 675   
get_mpi_comm() (fortran function), 638   
get_mpi_comm() (lammps.lammps method), 698   
get_natoms() (fortran function), 635   
get_natoms() (lammps.lammps method), 699   
get_neighlist() (lammps.lammps method), 714   
get_neighlist() (lammps.numpy_wrapper.numpy_wrapper method), 720   
get_neighlist_element_neighbors() (lammps.lammps method), 715   
get_neighlist_element_neighbors() (lammps.numpy_wrapper.numpy_wrapper method), 720   
get_neighlist_size() (lammps.lammps method), 715   
get_os_info() (fortran subroutine), 661   
get_os_info() (lammps.lammps method), 698   
get_thermo() (fortran function), 635   
get_thermo() (lammps.lammps method), 700   
geturl, 991   
group, 992   
group2ndx, 996  

# H  

has_curl_support (lammps.lammps property), 709   
has_error() (fortran function), 675   
has_exceptions (lammps.lammps property), 708   
has_ffmpeg_support (lammps.lammps property), 709   
has_gpu_device (lammps.lammps property), 710   
has_gpu_device() (fortran function), 665   
has_gzip_support (lammps.lammps property), 708   
has_id() (fortran function), 666   
has_id() (lammps.lammps method), 711   
has_jpeg_support (lammps.lammps property), 709   
has_mpi_support (lammps.lammps property), 708   
has_package() (lammps.lammps method), 709   
has_png_support (lammps.lammps property), 709   
has_style() (fortran function), 665   
has_style() (lammps.lammps method), 710   
hyper, 998  

I   
id_count() (fortran function), 667   
id_name() (fortran subroutine), 667   
if, 1000  

image() (lammps.ipython.wrapper method), 721   
improper_coeff, 1003   
improper_style, 1005   
improper_style amoeba, 2625   
improper_style class2, 2626   
improper_style class2/kk, 2626   
improper_style class2/omp, 2626   
improper_style cossq, 2627   
improper_style cossq/omp, 2627   
improper_style cvff, 2629   
improper_style cvff/intel, 2629   
improper_style cvff/omp, 2629   
improper_style distance, 2630   
improper_style distharm, 2631   
improper_style fourier, 2632   
improper_style fourier/omp, 2632   
improper_style harmonic, 2634   
improper_style harmonic/intel, 2634   
improper_style harmonic/kk, 2634   
improper_style harmonic/omp, 2634   
improper_style hybrid, 2635   
improper_style hybrid/kk, 2635   
improper_style inversion/harmonic, 2636   
improper_style none, 2638   
improper_style ring, 2638   
improper_style ring/omp, 2638   
improper_style sqdistharm, 2640   
improper_style umbrella, 2640   
improper_style umbrella/omp, 2640   
improper_style zero, 2642   
include, 1006   
info, 1007   
Input $(C++$ class), 842   
Input::file ( $(C++$ function), 842   
Input::Input ( $(C++$ function), 842   
Input::one ( $(C++$ function), 842   
installed_packages (lammps.lammps property), 710   
installed_packages() (fortran subroutine), 664   
InvalidFloatException ( $(C++$ class), 873   
InvalidFloatException::InvalidFloatException ( $C{+}{+}$ function), 874   
InvalidIntegerException ( $C{+}{+}$ class), 873   
InvalidIntegerException::InvalidIntegerException ( $(C++$ function), 873   
ipython (lammps.lammps property), 697   
is_running (lammps.lammps property), 708   
is_running() (fortran function), 674  

# J  

jump, 1009  

# K  

kim_commands, 1011   
kspace_modify, 1030   
kspace_style ewald, 1037   
kspace_style ewald/dipole, 1037   
kspace_style ewald/dipole/spin, 1037   
kspace_style ewald/disp, 1037   
kspace_style ewald/disp/dipole, 1037   
kspace_style ewald/electrode, 1037   
kspace_style ewald/omp, 1037   
kspace_style msm, 1037   
kspace_style msm/cg, 1037   
kspace_style msm/cg/omp, 1037   
kspace_style msm/dielectric, 1037   
kspace_style msm/omp, 1037   
kspace_style pppm, 1037   
kspace_style pppm/cg, 1037   
kspace_style pppm/cg/omp, 1037   
kspace_style pppm/dielectric, 1037   
kspace_style pppm/dipole, 1037   
kspace_style pppm/dipole/spin, 1037   
kspace_style pppm/disp, 1037   
kspace_style pppm/disp/dielectric, 1037   
kspace_style pppm/disp/intel, 1037   
kspace_style pppm/disp/omp, 1037   
kspace_style pppm/disp/tip4p, 1037   
kspace_style pppm/disp/tip4p/omp, 1037   
kspace_style pppm/electrode, 1037   
kspace_style pppm/electrode/intel, 1037   
kspace_style pppm/gpu, 1037   
kspace_style pppm/intel, 1037   
kspace_style pppm/kk, 1037   
kspace_style pppm/omp, 1037   
kspace_style pppm/stagger, 1037   
kspace_style pppm/tip4p, 1037   
kspace_style pppm/tip4p/omp, 1037   
kspace_style scafacos, 1037  

# L  

label, 1044   
labelmap, 1045   
lammps   
module, 695   
LAMMPS $(C++$ class), 836   
lammps (class in lammps), 696   
lammps (fortran type), 630   
lammps() (fortran function), 633   
lammps.formats   
module, 724   
LAMMPS::\~LAMMPS ( $C{+}{+}$ function), 837   
LAMMPS::argv_pointers ( $(C++$ function), 837   
LAMMPS::is_installed_pkg ( $C{+}{+}$ function), 837   
LAMMPS::LAMMPS ( $C{+}{+}$ function), 836   
LAMMPS::match_style ( $(C++$ function), 836   
LAMMPS::non_pair_suffix ( $(C++$ function), 836   
lammps_addstep_compute ( $C{+}{+}$ function), 592   
lammps_addstep_compute_all $(C++$ function), 592   
lammps_clearstep_compute ( $C{+}{+}$ function), 591   
lammps_close $(C++$ function), 567   
lammps_command ( $C{+}{+}$ function), 570   
lammps_commands_list ( $(C++$ function), 570   
lammps_commands_string ( $(C++$ function), 571   
lammps_config_accelerator ( $(C++$ function), 614   
lammps_config_has_exceptions $(C++$ function), 613   
lammps_config_has_ffmpeg_support ( $(C++$ function), 613   
lammps_config_has_gzip_support $C{+}{+}$ function), 612   
lammps_config_has_jpeg_support ( $(C++$ function), 613   
lammps_config_has_mpi_support $C{+}{+}$ function), 612   
lammps_config_has_package (C++ function), 614   
lammps_config_has_png_support ( $(C++$ function), 613   
lammps_config_package_count ( $C{+}{+}$ function), 614   
lammps_config_package_name ( $(C++$ function), 614   
lammps_create_atoms ( $\bar{C}{+}{+}$ function), 607   
lammps_decode_image_flags ( $(C++$ function), 618   
lammps_encode_image_flags ( $(C++$ function), 618   
lammps_error ( $C$ ++ function), 568   
lammps_eval ( $C{+}{+}$ function), 591   
lammps_expand ( $C{+}{+}$ function), 571   
lammps_extract_atom $(C++$ function), 584   
lammps_extract_atom_datatype ( $C{+}{+}$ function), 583   
lammps_extract_atom_size ( $(C++$ function), 584   
lammps_extract_box ( $C{+}{+}$ function), 575   
lammps_extract_compute ( $C{+}{+}$ function), 585   
lammps_extract_fix ( $C{+}{+}$ function), 586   
lammps_extract_global $(C++$ function), 579   
lammps_extract_global_datatype ( $C{+}{+}$ function), 578   
lammps_extract_pair $(C++$ function), 583   
lammps_extract_pair_dimension ( $C{+}{+}$ function), 582   
lammps_extract_setting ( $C{+}{+}$ function), 576   
lammps_extract_variable (C++ function), 588   
lammps_extract_variable_datatype ( $C{+}{+}$ function), 588   
lammps_file (C++ function), 570   
lammps_find_compute_neighlist (C++ function), 608   
lammps_find_fix_neighlist (C++ function), 609   
lammps_find_pair_neighlist (C++ function), 609   
lammps_fix_external_get_force (C++ function), 619   
lammps_fix_external_set_energy_global ( $C{+}{+}$ function), 620   
lammps_fix_external_set_energy_peratom ( $C{+}{+}$ function), 621   
lammps_fix_external_set_vector ( $C$ ++ function), 623   
lammps_fix_external_set_vector_length (C++ function), 622   
lammps_fix_external_set_virial_global (C++ function), 621   
lammps_fix_external_set_virial_peratom ( $C{+}{+}$ function), 622   
lammps_flush_buffers $(C++$ function), 623   
lammps_force_timeout ( $(C++$ function), 624   
lammps_free $\overline{{C}}++$ function), 623   
lammps_gather ( $C{+}{+}$ function), 604   
lammps_gather_angles ( $C{+}{+}$ function), 600   
lammps_gather_atoms ( $C{+}{+}$ function), 595   
lammps_gather_atoms_concat ( $C{+}{+}$ function), 596   
lammps_gather_atoms_subset $(C++$ function), 596   
lammps_gather_bonds ( $(C++$ function), 598   
lammps_gather_concat $(C++$ function), 605   
lammps_gather_dihedrals $(C++$ function), 601   
lammps_gather_impropers ( $C{+}{+}$ function), 602   
lammps_gather_subset ( $(C++$ function), 605   
lammps_get_gpu_device_info ( $(C++$ function), 615   
lammps_get_last_error_message ( $C{+}{+}$ function), 624   
lammps_get_mpi_comm $(C++$ function), 576   
lammps_get_natoms ( $C{+}{+}$ function), 573   
lammps_get_os_info (C++ function), 612   
lammps_get_thermo (C++ function), 573   
lammps_has_error (C++ function), 624   
lammps_has_gpu_device ( $(C++$ function), 615   
lammps_has_id ( $C{+}{+}$ function), 616   
lammps_has_style (C++ function), 615   
lammps_id_count (C++ function), 617   
lammps_id_name (C++ function), 617   
lammps_is_running (C++ function), 624   
lammps_kokkos_finalize ( $(C++$ function), 568   
lammps_last_thermo $(C++$ function), 574   
lammps_map_atom ( $(C++$ function), 583   
lammps_memory_usage ( $C{+}{+}$ function), 575   
lammps_mpi_finalize ( $(C++$ function), 567   
lammps_mpi_init ( $(C++$ function), 567   
lammps_neighlist_element_neighbors ( $(C++$ function), 610   
lammps_neighlist_num_elements ( $C{+}{+}$ function), 610   
lammps_open ( $C{+}{+}$ function), 565   
lammps_open_fortran ( $C{+}{+}$ function), 567   
lammps_open_no_mpi ( $C{+}{+}$ function), 566   
lammps_python_api_version ( $(C++$ function), 625   
lammps_python_finalize ( $C{+}{+}$ function), 568   
lammps_reset_box ( $C{+}{+}$ function), 575   
lammps_scatter $C{+}{+}$ function), 606   
lammps_scatter_atoms ( $C{+}{+}$ function), 597   
lammps_scatter_atoms_subset ( $C{+}{+}$ function), 598   
lammps_scatter_subset $(C++$ function), 607   
lammps_set_fix_external_callback ( $(C++$ function), 619   
lammps_set_internal_variable ( $C{+}{+}$ function), 590   
lammps_set_string_variable ( $(C++$ function), 590   
lammps_set_variable ( $(C++$ function), 589   
lammps_style (fortran type), 633   
lammps_style_count ( $C{+}{+}$ function), 616   
lammps_style_name ( $(C++$ function), 616   
lammps_type (fortran type), 633   
lammps_variable_info ( $(C++$ function), 591   
lammps_version $(C++$ function), 612   
last_thermo() (fortran function), 635   
last_thermo() (lammps.lammps method), 700   
last_thermo_step (lammps.lammps property), 700   
lattice, 1046   
LIBLAMMPS (module), 630   
LMP_SIZE_COLS ( $C{+}{+}$ enumerator), 594   
LMP_SIZE_ROWS ( $C{+}{+}$ enumerator), 594   
LMP_SIZE_VECTOR ( $C{+}{+}$ enumerator), 594   
LMP_STYLE_ATOM ( $C{+}{+}$ enumerator), 593   
LMP_STYLE_GLOBAL ( $C{+}{+}$ enumerator), 593   
LMP_STYLE_LOCAL ( $(C++$ enumerator), 593   
LMP TYPE _ARRAY ( $C{+}{+}$ enumerator), 594   
LMP TYPE SCALAR $(C++$ enumerator), 594   
LMP TYPE_VECTOR ( $(C++$ enumerator), 594   
LMP VAR ATOM ( $C{+}{+}$ enumerator), 594   
LMP VAR EQUAL ( $(C++$ enumerator), 594   
LMP VAR STRING ( $(C++$ enumerator), 594   
LMP VAR VECTOR ( $C{+}{+}$ enumerator), 594   
log, 1051   
M   
map_atom() (lammps.lammps method), 702   
mass, 1051   
MathEigen::jacobi3 $(C++$ function), 885, 886   
MathSpecial::cube $C{+}{+}$ function), 868   
MathSpecial::exp2_x86 $(C++$ function), 867   
MathSpecial::expmsq ( $(C++$ function), 868   
MathSpecial::factorial ( $C{+}{+}$ function), 867   
MathSpecial::fm_exp ( $C{+}{+}$ function), 867   
MathSpecial::my_erfcx ( $(C++$ function), 868   
MathSpecial::powint ( $C{+}{+}$ function), 868   
MathSpecial::powsign ( $C{+}{+}$ function), 868   
MathSpecial::powsinxx ( $(C++$ function), 868   
MathSpecial::square ( $(C++$ function), 868   
mdi, 1053   
memory_usage() (fortran subroutine), 638   
min_modify, 1058   
min_style, 1061   
min_style spin, 1060   
minimize, 1064   
minimize/kk, 1064   
module   
lammps, 695   
lammps.formats, 724   
molecule, 1069   
multitype::_LMP_DATATYPE_CONST ( $C{+}{+}$ enum), 592   
multitype::_LMP_DATATYPE_CONST::LAMMPS_DOUBLE ( $C{+}{+}$ enumerator), 593   
multitype::_LMP_DATATYPE_CONST::LAMMPS_DOUBLE_2D $(C++$ enumerator), 593   
multitype::_LMP_DATATYPE_CONST::LAMMPS_INT ( $C{+}{+}$ enumerator), 593   
multitype::_LMP_DATATYPE_CONST::LAMMPS_INT64 $(C++$ enumerator), 593   
multitype::_LMP_DATATYPE_CONST::LAMMPS_INT64_2D ( $C{+}{+}$ enumerator), 593   
multitype::_LMP_DATATYPE_CONST::LAMMPS_INT_2D ( $C{+}{+}$ enumerator), 593   
multitype::_LMP_DATATYPE_CONST::LAMMPS_NONE ( $(C++$ enumerator), 593   
multitype::_LMP_DATATYPE_CONST::LAMMPS_STRING ( $C{+}{+}$ enumerator), 593   
MyPage $(C++$ class), 882   
MyPage::get ( $C{+}{+}$ function), 883   
MyPage::init ( $(C++$ function), 883   
MyPage::MyPage ( $(C++$ function), 883   
MyPage::reset ( $(C++$ function), 883   
MyPage::size ( $(C++$ function), 883   
MyPage::status $(C++$ function), 884   
MyPage::vget ( $(C++$ function), 883   
MyPage::vgot $(C++$ function), 883   
MyPoolChunk ( $(C++$ class), 884   
MyPoolChunk::\~MyPoolChunk $(C++$ function), 884   
MyPoolChunk::get ( $(C++$ function), 884   
MyPoolChunk::MyPoolChunk $(C++$ function), 884   
MyPoolChunk::put $(C++$ function), 885   
MyPoolChunk::size ( $C{+}{+}$ function), 885   
MyPoolChunk::status ( $(C++$ function), 885  

# N  

ndx2group, 996   
neb, 1078   
neb/spin, 1084   
neigh_modify, 1089   
neighbor, 1093   
NeighList (class in lammps), 722   
neighlist_element_neighbors() (fortran subroutine), 661   
neighlist_num_elements() (fortran function), 660   
newton, 1094   
next, 1095   
numpy (lammps.lammps property), 696   
numpy_wrapper (class in lammps.numpy_wrapper), 716   
NumPyNeighList (class in lammps.numpy_wrapper), 723  

# P  

package, 1097   
pair_coeff, 1107   
pair_modify, 1109   
pair_style, 1114   
pair_style adp, 2089   
pair_style adp/kk, 2089   
pair_style adp/omp, 2089   
pair_style agni, 2091   
pair_style agni/omp, 2091   
pair_style aip/water/2dm, 2093   
pair_style aip/water/2dm/opt, 2093   
pair_style airebo, 2096   
pair_style airebo/intel, 2096   
pair_style airebo/morse, 2096   
pair_style airebo/morse/intel, 2096   
$-$   
pair_style airebo/morse/omp, 2096   
pair_style airebo/omp, 2096   
pair_style amoeba, 2099   
pair_style amoeba/gpu, 2099   
pair_style atm, 2103   
pair_style awpmd/cut, 2106   
pair_style beck, 2107   
pair_style beck/gpu, 2107   
pair_style beck/omp, 2107   
pair_style body/nparticle, 2109   
pair_style body/rounded/polygon, 2111   
pair_style body/rounded/polyhedron, 2113   
pair_style bop, 2116   
pair_style born, 2122   
pair_style born/coul/dsf, 2122   
pair_style born/coul/dsf/cs, 2163   
pair_style born/coul/long, 2122   
pair_style born/coul/long/cs, 2163   
pair_style born/coul/long/cs/gpu, 2163   
pair_style born/coul/long/gpu, 2122   
pair_style born/coul/long/omp, 2122   
pair_style born/coul/msm, 2122   
pair_style born/coul/msm/omp, 2122   
pair_style born/coul/wolf, 2122   
pair_style born/coul/wolf/cs, 2163   
pair_style born/coul/wolf/cs/gpu, 2163   
pair_style born/coul/wolf/gpu, 2122   
pair_style born/coul/wolf/omp, 2122   
pair_style born/gauss, 2125   
pair_style born/gpu, 2122   
pair_style born/omp, 2122   
pair_style bpm/spring, 2126   
pair_style brownian, 2128   
pair_style brownian/kk, 2128   
pair_style brownian/omp, 2128   
pair_style brownian/poly, 2128   
pair_style brownian/poly/omp, 2128   
pair_style buck, 2130   
pair_style buck/coul/cut, 2130   
pair_style buck/coul/cut/gpu, 2130   
pair_style buck/coul/cut/intel, 2130   
pair_style buck/coul/cut/kk, 2130   
pair_style buck/coul/cut/omp, 2130   
pair_style buck/coul/long, 2130   
pair_style buck/coul/long/cs, 2163   
pair_style buck/coul/long/gpu, 2130   
pair_style buck/coul/long/intel, 2130   
pair_style buck/coul/long/kk, 2130   
pair_style buck/coul/long/omp, 2130   
pair_style buck/coul/msm, 2130   
pair_style buck/coul/msm/omp, 2130   
pair_style buck/gpu, 2130   
pair_style buck/intel, 2130   
pair_style buck/kk, 2130   
pair_style buck/long/coul/long, 2134   
pair_style buck/long/coul/long/omp, 2134   
pair_style buck/mdf, 2327   
pair_style buck/omp, 2130   
pair_style buck6d/coul/gauss/dsf, 2132   
pair_style buck6d/coul/gauss/long, 2132   
pair_style colloid, 2143   
pair_style colloid/gpu, 2143   
pair_style colloid/omp, 2143   
pair_style comb, 2146   
pair_style comb/omp, 2146   
pair_style comb3, 2146   
pair_style cosine/squared, 2149   
pair_style coul/ctip, 2151   
pair_style coul/cut, 2151   
pair_style coul/cut/dielectric, 2166   
pair_style coul/cut/global, 2151   
pa   
pair_style coul/cut/gpu, 2151   
pair_style coul/cut/kk, 2151   
pair_style coul/cut/omp, 2151   
pair_style coul/cut/soft, 2214   
pair_style coul/cut/soft/omp, 2214   
pair_style coul/debye, 2151   
pair_style coul/debye/gpu, 2151   
pair_style coul/debye/kk, 2151   
pair_style coul/debye/omp, 2151   
pair_style coul/diel, 2157   
pair_style coul/diel/omp, 2157   
pair_style coul/dsf, 2151   
pair_style coul/dsf/gpu, 2151   
pair_style coul/dsf/kk, 2151   
pair_style coul/dsf/omp, 2151   
pair_style coul/exclude, 2151   
pair_style coul/long, 2151   
pair_style coul/long/cs, 2163   
pair_style coul/long/cs/gpu, 2163   
pair_style coul/long/dielectric, 2166   
pair_style coul/long/gpu, 2151   
pair_style coul/long/kk, 2151   
pair_style coul/long/omp, 2151   
pair_style coul/long/soft, 2214   
pair_style coul/long/soft/omp, 2214   
pair_style coul/msm, 2151   
pair_style coul/msm/omp, 2151   
pair_style coul/shield, 2158   
pair_style coul/slater, 2160   
pair_style coul/slater/cut, 2160   
pair_style coul/slater/long, 2160   
pair_style coul/slater/long/gpu, 2160   
pair_style coul/streitz, 2151   
pair_style coul/tt, 2162   
pair_style coul/wolf, 2151   
pair_style coul/wolf/cs, 2163   
pair_style coul/wolf/kk, 2151   
pair_style coul/wolf/omp, 2151   
pair_style dispersion/d3, 2174   
pair_style dpd, 2176   
pair_style dpd/coul/slater/long, 2179   
pair_style dpd/coul/slater/long/gpu, 2179   
pair_style dpd/ext, 2182   
pair_style dpd/ext/kk, 2182   
pair_style dpd/ext/omp, 2182   
pair_style dpd/ext/tstat, 2182   
pair_style dpd/ext/tstat/kk, 2182   
pair_style dpd/ext/tstat/omp, 2182   
pair_style dpd/fdt, 2185   
pair_style dpd/fdt/energy, 2185   
pair_style dpd/fdt/energy/kk, 2185   
pair_style dpd/gpu, 2176   
pair_style dpd/intel, 2176   
pair upu/K   
pair_style dpd/omp, 2176   
pair_style dpd/tstat, 2176   
pair_style dpd/tstat/gpu, 2176   
pair_style dpd/tstat/kk, 2176   
pair_style dpd/tstat/omp, 2176   
pair_style drip, 2187   
pair_style dsmc, 2189   
pair_style e3b, 2191   
pair_style eam, 2194   
pair_style eam/alloy, 2194   
pair_style eam/alloy/gpu, 2194   
pair_style eam/alloy/intel, 2194   
pair_style eam/alloy/kk, 2194   
pair_style eam/alloy/omp, 2194   
pair_style eam/alloy/opt, 2194   
pair_style eam/cd, 2194   
pair_style eam/cd/old, 2194   
pair_style eam/fs, 2194   
pair_style eam/fs/gpu, 2194   
pair_style eam/fs/intel, 2194   
pair_style eam/fs/kk, 2194   
pair_style eam/fs/omp, 2194   
pair_style eam/fs/opt, 2194   
pair_style eam/gpu, 2194   
pair_style eam/he, 2194   
pair_style eam/intel, 2194   
pair_style eam/kk, 2194   
pair_style eam/omp, 2194   
pair_style eam/opt, 2194   
pair_style edip, 2201   
pair_style edip/multi, 2201   
pair_style edip/omp, 2201   
pair_style edpd, 2343   
pair_style edpd/gpu, 2343   
pair_style eff/cut, 2204   
pair_style eim, 2208   
pair_style eim/omp, 2208   
pair_style exp6/rx, 2210   
pair_style exp6/rx/kk, 2210   
pair_style extep, 2213   
pair_style gauss, 2221   
pair_style gauss/cut, 2221   
pair_style gauss/cut/omp, 2221   
pair_style gauss/gpu, 2221   
pair_style gauss/omp, 2221   
pair_style gayberne, 2223   
pair style gayberne/gpu, 2223   
pair_style gayberne/intel, 2223   
pair_style gayberne/omp, 2223   
pair_style gran/hertz/history, 2226   
pair_style gran/hertz/history/omp, 2   
pair_style gran/hooke, 2226   
pair_style gran/hooke/history, 2226   
pair_style gran/hooke/history/kk, 2226   
pair_style gran/hooke/history/omp, 2226   
pair_style gran/hooke/omp, 2226   
pair_style granular, 2230   
pair_style gw, 2246   
pair_style gw/zbl, 2246   
pair_style harmonic/cut, 2247   
pair_style harmonic/cut/omp, 2247   
pair_style hbond/dreiding/lj, 2249   
pair_style hbond/dreiding/lj/angleoffset, 2249   
pair_style hbond/dreiding/lj/angleoffset/omp, 2249   
pair_style hbond/dreiding/lj/omp, 2249   
pair_style hbond/dreiding/morse, 2249   
pair_style hbond/dreiding/morse/angleoffset, 2249   
pair_style hbond/dreiding/morse/angleoffset/omp, 2249   
pair_style hbond/dreiding/morse/omp, 2249   
pair_style hdnnp, 2254   
pair_style hippo, 2099   
pair_style hippo/gpu, 2099   
pair_style hybrid, 2257   
pair_style hybrid/kk, 2257   
pair_style hybrid/molecular, 2257   
pair_style hybrid/molecular/omp, 2257   
pair_style hybrid/omp, 2257   
pair_style hybrid/overlay, 2257   
pair_style hybrid/overlay/kk, 2257   
pair_style hybrid/overlay/omp, 2257   
pair_style hybrid/scaled, 2257   
pair_style hybrid/scaled/omp, 2257   
pair_style ilp/graphene/hbn, 2264   
pair_style ilp/graphene/hbn/opt, 2264   
pair_style ilp/tmd, 2266   
pair_style ilp/tmd/opt, 2266   
pair_style kim, 2269   
pair_style kolmogorov/crespi/full, 2270   
pair_style kolmogorov/crespi/z, 2273   
pair_style lcbop, 2274   
pair_style lebedeva/z, 2275   
pair_style lennard/mdf, 2327   
pair_style lepton, 2276   
pair_style lepton/coul, 2276   
pair_style lepton/coul/omp, 2276   
pair_style lepton/omp, 2276   
pair_style lepton/sphere, 2276   
pair_style lepton/sphere/omp, 2276   
pair_style line/lj, 2280   
pair_style list, 2282   
pair_style lj/charmm/coul/charmm, 2137   
pair_style lj/charmm/coul/charmm/gpu, 2137   
pair_style lj/charmm/coul/charmm/implicit, 2137   
pair_style lj/charmm/coul/charmm/implicit/kk, 2137   
pair_style lj/charmm/coul/charmm/implicit/omp, 2137   
pair_style lj/charmm/coul/charmm/intel, 2137   
pair_style lj/charmm/coul/charmm/kk, 2137   
pair_style lj/charmm/coul/charmm/omp, 2137   
pair_style lj/charmm/coul/long, 2137   
pair_style lj/charmm/coul/long/gpu, 2137   
pair_style lj/charmm/coul/long/intel, 2137   
pair_style lj/charmm/coul/long/kk, 2137   
pair_style lj/charmm/coul/long/omp, 2137   
pair $-$ style lj/charmm/coul/long/opt, 2137   
pair_style lj/charmm/coul/long/soft, 2214   
pair_style lj/charmm/coul/long/soft/omp, 2214   
pair_style lj/charmm/coul/msm, 2137   
pair_style lj/charmm/coul/msm/omp, 2137   
pair_style lj/charmmfsw/coul/charmmfsh, 2137   
pair_style lj/charmmfsw/coul/long, 2137   
pair_style lj/charmmfsw/coul/long/kk, 2137   
pair_style lj/class2, 2141   
pair_style lj/class2/coul/cut, 2141   
pair_style lj/class2/coul/cut/kk, 2141   
pair_style lj/class2/coul/cut/omp, 2141   
pair_style lj/class2/coul/cut/soft, 2214   
pair_style lj/class2/coul/long, 2141   
pair_style lj/class2/coul/long/cs, 2163   
pair_style lj/class2/coul/long/gpu, 2141   
pair_style lj/class2/coul/long/kk, 2141   
pair_style lj/class2/coul/long/omp, 2141   
pair_style lj/class2/coul/long/soft, 2214   
pair_style lj/class2/gpu, 2141   
pair_style lj/class2/kk, 2141   
pair_style lj/class2/omp, 2141   
pair_style lj/class2/soft, 2214   
pair_style lj/cubic, 2288   
pair_style lj/cubic/gpu, 2288   
pair_style lj/cubic/omp, 2288   
pair_style lj/cut, 2284   
pair_style lj/cut/coul/cut, 2290   
pair_style lj/cut/coul/cut/dielectric, 2166   
pair_style lj/cut/coul/cut/dielectric/omp, 2166   
pair_style lj/cut/coul/cut/gpu, 2290   
pair_style lj/cut/coul/cut/kk, 2290   
pair_style lj/cut/coul/cut/omp, 2290   
pair_style lj/cut/coul/cut/soft, 2214   
pair_style lj/cut/coul/cut/soft/gpu, 2214   
pair_style lj/cut/coul/cut/soft/omp, 2214   
pair_style lj/cut/coul/debye, 2290   
pair_style lj/cut/coul/debye/dielectric, 2166   
pair_style lj/cut/coul/debye/dielectric/omp, 2166   
pair_style lj/cut/coul/debye/gpu, 2290   
pair_style lj/cut/coul/debye/kk, 2290   
pair_style lj/cut/coul/debye/omp, 2290   
pair_style lj/cut/coul/dsf, 2290   
pair_style lj/cut/coul/dsf/gpu, 2290   
pair_style lj/cut/coul/dsf/kk, 2290   
pair_style lj/cut/coul/dsf/omp, 2290   
pair_style lj/cut/coul/long, 2290   
pair_style lj/cut/coul/long/cs, 2163   
pair_style lj/cut/coul/long/dielectric, 2166   
pair_style lj/cut/coul/long/dielectric/omp, 216   
pair_style lj/cut/coul/long/gpu, 2290   
pair_style lj/cut/coul/long/intel, 2290   
pair_style lj/cut/coul/long/kk, 2290   
pair_style lj/cut/coul/long/omp, 2290   
pair_style lj/cut/coul/long/opt, 2290   
pair_style lj/cut/coul/long/soft, 2214   
pair_style lj/cut/coul/long/soft/gpu, 2214   
pair_style lj/cut/coul/long/soft/omp, 2214   
pair_style lj/cut/coul/msm, 2290   
pair_style lj/cut/coul/msm/dielectric, 2166   
pair_style lj/cut/coul/msm/gpu, 2290   
pair_style lj/cut/coul/msm/omp, 2290   
pair_style lj/cut/coul/wolf, 2290   
pair_style lj/cut/coul/wolf/omp, 2290   
pair_style lj/cut/dipole/cut, 2168   
pair_style lj/cut/dipole/cut/gpu, 2168   
pair_style lj/cut/dipole/cut/kk, 2168   
pair_style lj/cut/dipole/cut/omp, 2168   
pair_style lj/cut/dipole/long, 2168   
pair_style lj/cut/dipole/long/gpu, 2168   
pair_style lj/cut/gpu, 2284   
pair_style lj/cut/intel, 2284   
pair_style lj/cut/kk, 2284   
pair_style lj/cut/omp, 2284   
pair_style lj/cut/opt, 2284   
pair_style lj/cut/soft, 2214   
pair_style lj/cut/soft/omp, 2214   
pair_style lj/cut/sphere, 2294   
pair_style lj/cut/sphere/omp, 2294   
pair_style lj/cut/thole/long, 2492   
pair_style lj/cut/thole/long/omp, 2492   
pair_style lj/cut/tip4p/cut, 2297   
pair_style lj/cut/tip4p/cut/omp, 2297   
pair_style lj/cut/tip4p/long, 2297   
pair_style lj/cut/tip4p/long/gpu, 2297   
pair_style lj/cut/tip4p/long/omp, 2297   
pair_style lj/cut/tip4p/long/opt, 2297   
pair_style lj/cut/tip4p/long/soft, 2214   
pair_style lj/cut/tip4p/long/soft/omp, 2214   
pair_style lj/expand, 2300   
pair_style lj/expand/coul/long, 2300   
pair_style lj/expand/coul/long/gpu, 2300   
pair_style lj/expand/coul/long/kk, 2300   
pair_style lj/expand/gpu, 2300   
pair_style lj/expand/kk, 2300   
pair_style lj/expand/omp, 2300   
pair_style lj/expand/sphere, 2302   
pair_style lj/expand/sphere/omp, 2302   
pair_style lj/gromacs, 2243   
pair_style lj/gromacs/coul/gromacs, 2243   
pair_style lj/gromacs/coul/gromacs/kk, 2243   
pair_style lj/gromacs/coul/gromacs/omp, 2243   
pair_style lj/gromacs/gpu, 2243   
pair_style lj/gromacs/kk, 2243   
pair_style lj/gromacs/omp, 2243   
pair_style lj/long/coul/long, 2304   
pair_style lj/long/coul/long/dielectric, 2166   
pair_style lj/long/coul/long/intel, 2304   
pair_style lj/long/coul/long/omp, 2304   
pair_style lj/long/coul/long/opt, 2304   
pair_style lj/long/dipole/long, 2168   
pair_style lj/long/tip4p/long, 2304   
pair_style lj/long/tip4p/long/omp, 2304   
pair_style lj/mdf, 2327   
pair_style lj/relres, 2308   
pair_style lj/relres/omp, 2308   
pair_style lj/sf/dipole/sf, 2168   
pair_style lj/sf/dipole/sf/gpu, 2168   
pair_style lj/sf/dipole/sf/omp, 2168   
pair_style lj/smooth, 2312   
pair_style lj/smooth/gpu, 2312   
pair_style lj/smooth/linear, 2314   
pair_style lj/smooth/linear/omp, 2314   
pair_style lj/smooth/omp, 2312   
pair_style lj/spica, 2451   
pair_style lj/spica/coul/long, 2451   
pair_style lj/spica/coul/long/gpu, 2451   
pair_style lj/spica/coul/long/kk, 2451   
pair_style lj/spica/coul/long/omp, 2451   
pair_style lj/spica/coul/msm, 2451   
pair_style lj/spica/coul/msm/omp, 2451   
pair_style lj/spica/gpu, 2451   
pair_style lj/spica/kk, 2451   
pair_style lj/spica/omp, 2451   
pair_style lj/switch3/coulgauss/long, 2315   
pair_style lj96/cut, 2286   
pair_style lj96/cut/gpu, 2286   
pair_style lj96/cut/omp, 2286   
pair_style local/density, 2317   
pair_style lubricate, 2321   
pair_style lubricate/omp, 2321   
pair_style lubricate/poly, 2321   
pair_style lubricate/poly/omp, 2321   
pair_style lubricateU, 2324   
pair_style lubricateU/poly, 2324   
pair_style mdpd, 2343   
pair_style mdpd/gpu, 2343   
pair_style mdpd/rhosum, 2343   
pair_style meam, 2329   
pair style meam/kk, 2329   
pair_style meam/ms, 2329   
pair_style meam/ms/kk, 2329   
pair_style meam/spline, 2335   
pair_style meam/spline/omp, 2335   
pair_style meam/sw/spline, 2338   
pair_style mesocnt, 2340   
pair_style mesocnt/viscous, 2340   
pair_style mgpt, 2349   
pair_style mie/cut, 2352   
pair_style mie/cut/gpu, 2352   
pair_style mliap, 2353   
pair_style mliap/kk, 2353   
pair style mm3/switch3/coulgauss/long, 2315   
pair_style momb, 2358   
pair_style morse, 2359   
pair_style morse/gpu, 2359   
pair_style morse/kk, 2359   
pair_style morse/omp, 2359   
pair_style morse/opt, 2359   
pair_style morse/smooth/linear, 2359   
pair_style morse/smooth/linear/omp, 2359   
pair_style morse/soft, 2214   
pair_style multi/lucy, 2361   
pair_style multi/lucy/rx, 2363   
pair_style multi/lucy/rx/kk, 2363   
pair_style nb3b/harmonic, 2367   
pair_style nb3b/screened, 2367   
pair_style nm/cut, 2368   
pair_style nm/cut/coul/cut, 2368   
pair_style nm/cut/coul/cut/omp, 2368   
pair_style nm/cut/coul/long, 2368   
pair_style nm/cut/coul/long/omp, 2368   
pair_style nm/cut/omp, 2368   
pair_style nm/cut/split, 2368   
pair_style none, 2371   
pair_style oxdna/coaxstk, 2372   
pair_style oxdna/excv, 2372   
pair_style oxdna/hbond, 2372   
pair_style oxdna/stk, 2372   
pair_style oxdna/xstk, 2372   
pair_style oxdna2/coaxstk, 2376   
pair_style oxdna2/dh, 2376   
pair_style oxdna2/excv, 2376   
pair_style oxdna2/hbond, 2376   
pair_style oxdna2/stk, 2376   
pair_style oxdna2/xstk, 2376   
pair_style oxrna2/coaxstk, 2380   
pair_style oxrna2/dh, 2380   
pair_style oxrna2/excv, 2380   
pair_style oxrna2/hbond, 2380   
pair_style oxrna2/stk, 2380   
pair_style oxrna2/xstk, 2380   
pair_style pace, 2384   
pair_style pace/extrapolation, 2384   
pair_style pace/extrapolation/kk, 2384   
pair_style pace/kk, 2384   
pair_style pedone, 2387   
pair_style pedone/omp, 2387   
pair_style peri/eps, 2389   
pair_style peri/lps, 2389   
pair_style peri/lps/omp, 2389   
pair_style peri/pmb, 2389   
pair_style peri/pmb/omp, 2389   
pair_style peri/ves, 2389   
pair_style pod, 2392   
pair_style pod/kk, 2392   
pair_style polymorphic, 2394   
pair_style python, 2398   
pair_style quip, 2403   
pair_style rann, 2404   
pair_style reaxff, 2410   
pair_style reaxff/kk, 2410   
pair_style reaxff/omp, 2410   
pair_style rebo, 2096   
pair_style rebo/intel, 2096   
pair_style rebo/omp, 2096   
pair_style rebomos, 2416   
pair_style rebomos/omp, 2416   
pair_style resquared, 2418   
pair_style resquared/gpu, 2418   
pair_style resquared/omp, 2418   
pair_style rheo, 2421   
pair_style rheo/solid, 2422   
pair_style saip/metal, 2423   
pair_style saip/metal/opt, 2423   
pair_style sdpd/taitwater/isothermal, 2426   
pair_style smatb, 2427   
pair_style smatb/single, 2427   
pair_style smd/hertz, 2429   
pair_style smd/tlsph, 2430   
pair_style smd/tri_surface, 2431   
pair_style smd/ulsph, 2432   
pair_style smtbq, 2433   
pair_style snap, 2437   
pair_style snap/intel, 2437   
pair_style snap/kk, 2437   
pair_style soft, 2441   
pair_style soft/gpu, 2441   
pair_style soft/kk, 2441   
pair_style soft/omp, 2441   
pair_style sph/heatconduction, 2443   
pair_style sph/heatconduction/gpu, 2443   
pair_style sph/idealgas, 2444   
pair_style sph/lj, 2445   
pair_style sph/lj/gpu, 2445   
pair_style sph/rhosum, 2447   
pair_style sph/taitwater, 2448   
pair_style sph/taitwater/gpu, 2448   
pair_style sph/taitwater/morris, 2450   
pair_style spin/dipole/cut, 2453   
pair_style spin/dipole/long, 2453   
pair_style spin/dmi, 2455   
pair_style spin/exchange, 2456   
pair_style spin/exchange/biquadratic, 2456   
pair   
pair_style spin/neel, 2460   
pair_style srp, 2461   
pair_style srp/react, 2461   
pair_style sw, 2464   
pair_style sw/angle/table, 2468   
pair_style sw/gpu, 2464   
pair_style sw/intel, 2464   
pair_style sw/kk, 2464   
pair_style sw/mod, 2464   
pair_style sw/mod/omp, 2464   
pair_style sw/omp, 2464   
pair_style table, 2472   
pair_style table/gpu, 2472   
pair_style table/kk, 2472   
pair_style table/omp, 2472   
pair_style table/rx, 2476   
pair_style table/rx/kk, 2476   
pair_style tdpd, 2343   
pair_style tersoff, 2479   
pair_style tersoff/gpu, 2479   
pair_style tersoff/intel, 2479   
pair_style tersoff/kk, 2479   
pair_style tersoff/mod, 2484   
pair_style tersoff/mod/c, 2484   
pair_style tersoff/mod/c/omp, 2484   
pair_style tersoff/mod/gpu, 2484   
pair_style tersoff/mod/kk, 2484   
pair_style tersoff/mod/omp, 2484   
pair_style tersoff/omp, 2479   
pair_style tersoff/table, 2479   
pair_style tersoff/table/omp, 2479   
pair_style tersoff/zbl, 2487   
pair_style tersoff/zbl/gpu, 2487   
pair_style tersoff/zbl/kk, 2487   
pair_style tersoff/zbl/omp, 2487   
pair_style thole, 2492   
pair_style threebody/table, 2494   
pair_style tip4p/cut, 2151   
pair_style tip4p/cut/omp, 2151   
pair_style tip4p/long, 2151   
pair_style tip4p/long/omp, 2151   
pair_style tip4p/long/soft, 2214   
pair_style tip4p/long/soft/omp, 2214   
pair_style tracker, 2498   
pair_style tri/lj, 2500   
pair_style uf3, 2501   
pair $-$ style uf3/kk, 2501   
pair_style ufm, 2504   
pair_style ufm/gpu, 2504   
pair_style ufm/omp, 2504   
pair_style ufm/opt, 2504   
pair_style vashishta, 2506   
pair_style vashishta/gpu, 2506   
pair_style vashishta/kk, 2506   
pair_style vashishta/omp, 2506   
pair_style vashishta/table, 2506   
pair_style vashishta/table/omp, 2506   
pair_style wf/cut, 2510   
pair_style ylz, 2512   
pair $-$ style yukawa, 2514   
pair_style yukawa/colloid, 2515   
pair_style yukawa/colloid/gpu, 2515   
pair_style yukawa/colloid/kk, 2515   
pair_style yukawa/colloid/omp, 2515   
pair_style yukawa/gpu, 2514   
pair_style yukawa/kk, 2514   
pair_style yukawa/omp, 2514   
pair_style zbl, 2517   
pair_style zbl/gpu, 2517   
pair_style zbl/kk, 2517   
pair_style zbl/omp, 2517   
pair_style zero, 2519   
pair_write, 1123   
partition, 1125   
platform::chdir ( $C{+}{+}$ function), 846   
platform::compiler_info ( $C{+}{+}$ function), 843   
platform::compress_info ( $(C++$ function), 844   
platform::compressed_read $C{+}{+}$ function), 850   
platform::compressed_write ( $(C++$ function), 850   
platform::cputime ( $(C++$ function), 843   
platform::current_directory ( $(C++$ function), 846   
platform::cxx_standard $(C++$ function), 843   
platform::disk_free $C{+}{+}$ function), 845   
platform::dlclose ( $C{+}{+}$ function), 849   
platform::dlerror ( $C{+}{+}$ function), 849   
platform::dlopen $(C++$ function), 849   
platform::dlsym ( $(C++$ function), 849   
platform::END_OF_FILE ( $C{+}{+}$ member), 847   
platform::file_is_readable ( $(C++$ function), 845   
platform::filepathsep ( $C{+}{+}$ member), 844   
platform::find_exe_path ( $C{+}{+}$ function), 848   
platform::fseek $(C++$ function), 847   
platform::ftell ( $C{+}{+}$ function), 847   
platform::ftruncate ( $C{+}{+}$ function), 847   
platform::guesspath ( $(C++$ function), 844   
platform::has_compress_extension $(C++$ function), 849   
platform::is_console ( $(C++$ function), 845   
platform::list_directory ( $C{+}{+}$ function), 846   
platform::list_pathenv ( $C{+}{+}$ function), 848   
platform::mkdir ( $(C++$ function), 846   
platform::mpi_info ( $C{+}{+}$ function), 844   
platform::mpi_vendor ( $C{+}{+}$ function), 844   
platform::openmp_standard ( $C{+}{+}$ function), 844   
platform::os_info $(C++$ function), 843   
platform::path_basename ( $(C++$ function), 845   
platform::path_is_directory $(C++$ function), 846   
platform::path_join $(C++$ function), 845   
platform::pathvarsep ( $C{+}{+}$ member), 844   
platform::pclose ( $(C++$ function), 848   
platform::popen ( $C{+}{+}$ function), 847   
platform::putenv ( $C{+}{+}$ function), 848   
platform::rmdir ( $C{+}{+}$ function), 846   
platform::unlink ( $C{+}{+}$ function), 847   
platform::unsetenv ( $C{+}{+}$ function), 848   
platform::usleep ( $C{+}{+}$ function), 843   
platform::walltime ( $(C++$ function), 843   
plugin, 1126   
plugin_count() (fortran function), 667   
plugin_name() (fortran subroutine), 667   
Pointers ( $(C++$ class), 837   
PotentialFileReader ( $C{+}{+}$ class), 879   
PotentialFileReader::\~PotentialFileReader ( $C{+}{+}$ function), 880   
PotentialFileReader::ignore_comments ( $(C++$ function), 880   
PotentialFileReader::next_bigint ( $C{+}{+}$ function), 881   
PotentialFileReader::next_double ( $C{+}{+}$ function), 881   
PotentialFileReader::next_dvector $(C++$ function), 880   
PotentialFileReader::next_int ( $C{+}{+}$ function), 881   
PotentialFileReader::next_line ( $C{+}{+}$ function), 880   
PotentialFileReader::next_string ( $C{+}{+}$ function), 881   
PotentialFileReader::next_tagint ( $(C++$ function), 881   
PotentialFileReader::next_values ( $C{+}{+}$ function), 880   
PotentialFileReader::PotentialFileReader ( $C{+}{+}$ function), 880   
PotentialFileReader::rewind ( $C{+}{+}$ function), 880   
PotentialFileReader::skip_line ( $(C++$ function), 880   
prd, 1127   
print, 1131   
processors, 1133   
python, 1137  

# Q  

quit, 1145  

# R  

read_data, 1146   
read_dump, 1168   
read_restart, 1174   
region, 1177   
replicate, 1183   
rerun, 1185   
reset atoms, 1188   
reset box() (fortran subroutine), 638   
reset box() (lammps.lammps method), 699   
reset_timestep, 1191   
restart, 1192   
run, 1194   
run_style, 1197  

S scatter() (fortran subroutine), 657 scatter_atoms() (fortran subroutine), 651 scatter_atoms_subset() (fortran subroutine), 652  

# Index  

scatter_subset() (fortran subroutine), 658   
set, 1202   
set_fix_external_callback() (fortran subroutine), 669   
set_fix_external_callback() (lammps.lammps method), 712   
set_fix_external_set_virial_peratom() (fortran subroutine), 673   
set_internal_variable() (fortran subroutine), 648   
set_internal_variable() (lammps.lammps method), 705   
set_string_variable() (fortran subroutine), 648   
set_string_variable() (lammps.lammps method), 705   
set_variable() (fortran subroutine), 647   
set_variable() (lammps.lammps method), 705   
shell, 1209   
size (lammps.NeighList property), 722   
special_bonds, 1211   
style_count() (fortran function), 666   
style_name() (fortran subroutine), 666   
suffix, 1215  

# T  

tad, 1216   
temper, 1220   
temper/grem, 1222   
temper/npt, 1224   
TextFileReader (C++ class), 878   
TextFileReader::\~TextFileReader ( $C{+}{+}$ function), 878   
TextFileReader::ignore_comments ( $C{+}{+}$ member), 879   
TextFileReader::next_dvector ( $C{+}{+}$ function), 879   
TextFileReader::next_line ( $C{+}{+}$ function), 879   
TextFileReader::next_values ( $C{+}{+}$ function), 879   
TextFileReader::rewind $C{+}{+}$ function), 878   
TextFileReader::set_bufsize $(C++$ function), 878   
TextFileReader::skip_line ( $(C++$ function), 879   
TextFileReader::TextFileReader ( $(C++$ function), 878   
thermo, 1225   
thermo_modify, 1226   
thermo_style, 1229   
third_order, 1236   
third_order/kk, 1236   
timer, 1237   
timestep, 1239   
Tokenizer ( $C{+}{+}$ class), 870   
Tokenizer::as_vector ( $C{+}{+}$ function), 871   
Tokenizer::contains $(C++$ function), 871   
Tokenizer::count ( $C{+}{+}$ function), 871   
Tokenizer::has_next ( $(C++$ function), 870   
Tokenizer::matches ( $C{+}{+}$ function), 871   
Tokenizer::next ( $(C++$ function), 871   
Tokenizer::reset $(C++$ function), 870   
Tokenizer::skip ( $C{+}{+}$ function), 870   
Tokenizer::Tokenizer $(C++$ function), 870   
TokenizerException ( $C{+}{+}$ class), 871   
TokenizerException::TokenizerException ( $(C++$ function), 87   
TokenizerException::what ( $(C++$ function), 872  

# U  

ubuf ( $C{+}{+}$ union), 886   
ubuf::d ( $C{+}{+}$ member), 887   
ubuf::i ( $C{+}{+}$ member), 887   
ubuf::ubuf ( $(C++$ function), 886   
uncompute, 1240   
undump, 1241   
unfix, 1241   
units, 1242   
utils::binary_search $(C++$ function), 866   
utils::bnumeric ( $C{+}{+}$ function), 853   
utils::bounds ( $(C++$ function), 861   
utils::bounds_typelabel ( $(C++$ function), 862   
utils::check_packages_for_style ( $C{+}{+}$ function), 865   
utils::count_words ( $(C++$ function), 857   
utils::current_date ( $(C++$ function), 866   
utils::date2num ( $C{+}{+}$ function), 866   
utils::errorurl ( $C{+}{+}$ function), 864   
utils::expand_args $(C++$ function), 862   
utils::expand_type ( $C{+}{+}$ function), 863   
utils::fgets_trunc ( $C{+}{+}$ function), 851   
utils::flush_buffers ( $C{+}{+}$ function), 865   
utils::get_conversion_factor ( $C{+}{+}$ function), 861   
utils::get_potential_date ( $C{+}{+}$ function), 860   
utils::get_potential_file_path ( $(C++$ function), 860   
utils::get_potential_units ( $(C++$ function), 860   
utils::get_supported_conversions ( $(C++$ function), 860   
utils::getsyserror $(C++$ function), 865   
utils::has_utf8 ( $C{+}{+}$ function), 856   
utils::inumeric ( $(C++$ function), 852, 853   
utils::is_double ( $(C++$ function), 859   
utils::is_id ( $C{+}{+}$ function), 860   
utils::is_integer ( $(C++$ function), 859   
utils::is_type ( $C{+}{+}$ function), 860   
utils::join_words ( $C{+}{+}$ function), 858   
utils::logical $(C++$ function), 854   
utils::logmesg $(C++$ function), 864   
utils::lowercase $(C++$ function), 855   
utils::merge_sort $(C++$ function), 866   
utils::missing_cmd_args ( $(C++$ function), 864   
utils::numeric ( $C{+}{+}$ function), 852   
utils::open_potential ( $(C++$ function), 861   
utils::parse_grid_id ( $C{+}{+}$ function), 863   
utils::point_to_error ( $(C++$ function), 865   
utils::print ( $(C++$ function), 864   
utils::read_lines_from_file $C{+}{+}$ function), 851   
utils::sfgets ( $(C++$ function), 850   
utils::sfread ( $(C++$ function), 851   
utils::split_lines ( $(C++$ function), 858   
utils::split_words ( $(C++$ function), 858   
utils::star_subst ( $(C++$ function), 856   
utils::strcompress $(C++$ function), 856   
utils::strdup ( $(C++$ function), 855   
utils::strfind ( $(C++$ function), 859   
utils::strip_style_suffix $(C++$ function), 856   
utils::strmatch ( $C{+}{+}$ function), 859   
utils::strsame ( $(C++$ function), 858   
utils::timespec2seconds ( $C{+}{+}$ function), 866   
utils::tnumeric $(C++$ function), 854   
utils::trim ( $C{+}{+}$ function), 855   
utils::trim_and_count_words $C{+}{+}$ function), 857   
utils::trim_comment ( $\bar{C}{+}{+}$ function), 855   
utils::uppercase ( $C{+}{+}$ function), 855   
utils::utf8_subst ( $(C++$ function), 857  

#  

ValueTokenizer ( $C{+}{+}$ class), 872   
ValueTokenizer::contains ( $(C++$ function), 873   
ValueTokenizer::count ( $(C++$ function), 873   
ValueTokenizer::has_next $(C++$ function), 873   
ValueTokenizer::matches $(C++$ function), 873   
ValueTokenizer::next_bigint ( $(C++$ function), 872   
ValueTokenizer::next_double ( $(C++$ function), 873   
ValueTokenizer::next_int ( $C{+}{+}$ function), 872   
ValueTokenizer::next_string ( $C{+}{+}$ function), 872   
ValueTokenizer::next_tagint ( $C{+}{+}$ function), 872   
ValueTokenizer::skip $(C++$ function), 873   
ValueTokenizer::ValueTokenizer ( $(C++$ function), 872   
variable, 1246   
velocity, 1267   
version() (fortran function), 661   
version() (lammps.lammps method), 698   
video() (lammps.ipython.wrapper method), 721  

# W  

wrapper (class in lammps.ipython), 720   
write_coeff, 1270   
write_data, 1271   
write_dump, 1273   
write_restart, 1275  